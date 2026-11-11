import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Checkbox,
  Flex,
  HStack,
  Input,
  Spinner,
  Table,
  Text,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { fetchAuthSession } from "aws-amplify/auth";
import { ApiError, get, post } from "aws-amplify/api";
import { NavbarActiveKey } from "@/components/Navbar";
import { InputGroup } from "@/components/ui/input-group";
import { toaster } from "@/components/ui/toaster";
import { BannerTemplate } from "@/layouts/BannerTemplate";

const API_NAME = "adminUserManagement";
const ADMIN_GROUP = "Admin";

type User = {
  username: string;
  email: string;
  name: string;
  familyName: string;
  groups: string[];
  enabled: boolean;
  status: string;
};

type Access = "checking" | "admin" | "denied" | "signedOut";

const toError = (reason: unknown, fallback: string) =>
  reason instanceof Error ? reason : new Error(fallback, { cause: reason });

// Prefer the Lambda's `{ error }` body over Amplify's generic HTTP message.
const describeError = (error: Error) => {
  if (error instanceof ApiError && error.response?.body) {
    try {
      const body = JSON.parse(error.response.body);
      if (typeof body?.error === "string") return body.error;
    } catch {
      // Non-JSON body; fall through to the error message.
    }
  }
  return error.message;
};

const fetchUsers = async () => {
  const response = await get({ apiName: API_NAME, path: "/users" }).response;
  const data = (await response.body.json()) as { users?: unknown };
  if (!Array.isArray(data?.users)) {
    throw new Error("Invalid /users response");
  }
  return data.users as User[];
};

const fetchGroups = async () => {
  const response = await get({ apiName: API_NAME, path: "/groups" }).response;
  const data = (await response.body.json()) as { groups?: unknown };
  if (!Array.isArray(data?.groups)) {
    throw new Error("Invalid /groups response");
  }
  return data.groups as string[];
};

const changeMembership = async (
  path: "/add-to-group" | "/remove-from-group",
  username: string,
  groupName: string,
) => {
  await post({
    apiName: API_NAME,
    path,
    options: { body: { username, groupName } },
  }).response;
};

export const AdminPage = () => {
  return (
    <BannerTemplate
      title="Admin"
      activeKey={NavbarActiveKey.LOGIN}
      imageSrc="/images/landing3.jpg"
      alt="Admin page banner"
    >
      <AdminBody />
    </BannerTemplate>
  );
};

const AdminBody = () => {
  const navigate = useNavigate();
  const [access, setAccess] = useState<Access>("checking");
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [groupsError, setGroupsError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUsername, setEditingUsername] = useState<string | null>(null);
  const [draftGroups, setDraftGroups] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Navigation only; the Lambda enforces Admin membership on every request.
  useEffect(() => {
    const checkAccess = async () => {
      try {
        const session = await fetchAuthSession();
        if (!session.tokens) {
          setAccess("signedOut");
          return;
        }
        const groups = session.tokens.idToken?.payload["cognito:groups"];
        setAccess(
          Array.isArray(groups) && groups.includes(ADMIN_GROUP)
            ? "admin"
            : "denied",
        );
      } catch (reason) {
        console.error(
          "Admin access check failed",
          toError(reason, "Admin access check failed"),
        );
        setAccess("signedOut");
      }
    };
    checkAccess();
  }, []);

  useEffect(() => {
    if (access !== "denied" && access !== "signedOut") return;
    const timer = setTimeout(
      () => navigate(access === "denied" ? "/" : "/login"),
      2000,
    );
    return () => clearTimeout(timer);
  }, [access, navigate]);

  const loadUsers = async () => {
    setUsersLoading(true);
    setUsersError(null);
    try {
      setUsers(await fetchUsers());
    } catch (reason) {
      const error = toError(reason, "Failed to load users");
      console.error("Failed to load users", error);
      setUsersError(describeError(error));
    } finally {
      setUsersLoading(false);
    }
  };

  const loadGroups = async () => {
    setGroupsLoading(true);
    setGroupsError(null);
    try {
      setAvailableGroups(await fetchGroups());
    } catch (reason) {
      const error = toError(reason, "Failed to load groups");
      console.error("Failed to load groups", error);
      setGroupsError(describeError(error));
    } finally {
      setGroupsLoading(false);
    }
  };

  useEffect(() => {
    if (access === "admin") {
      loadUsers();
      loadGroups();
    }
  }, [access]);

  const startEdit = (user: User) => {
    setEditingUsername(user.username);
    setDraftGroups(user.groups);
    setSaveError(null);
  };

  const cancelEdit = () => {
    setEditingUsername(null);
    setDraftGroups([]);
  };

  const toggleDraftGroup = (group: string) => {
    setDraftGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group],
    );
  };

  const pendingChanges = (user: User) => ({
    toAdd: draftGroups.filter((group) => !user.groups.includes(group)),
    toRemove: user.groups.filter((group) => !draftGroups.includes(group)),
  });

  const saveGroups = async (user: User) => {
    const { toAdd, toRemove } = pendingChanges(user);
    const changes = [
      ...toAdd.map((group) => ["/add-to-group", group] as const),
      ...toRemove.map((group) => ["/remove-from-group", group] as const),
    ];
    setSaving(true);
    setSaveError(null);
    let applied = 0;
    let action = "";
    try {
      for (const [path, group] of changes) {
        action = `${path === "/add-to-group" ? "add to" : "remove from"} ${group}`;
        await changeMembership(path, user.username, group);
        applied++;
      }
      toaster.create({
        title: `Updated groups for ${user.username}`,
        type: "success",
      });
    } catch (reason) {
      const error = toError(reason, "Group change failed");
      console.error(`Failed to ${action} for ${user.username}`, error);
      setSaveError(
        `Could not ${action} for ${user.username}: ${describeError(error)}.` +
          (applied ? ` ${applied} earlier change(s) were saved.` : ""),
      );
    } finally {
      cancelEdit();
      setSaving(false);
      // Partial saves are possible, so always show what Cognito now holds.
      await loadUsers();
    }
  };

  if (access !== "admin") {
    return (
      <VStack paddingY="6rem" paddingX="1rem" gap="1rem" textAlign="center">
        {access === "checking" ? (
          <>
            <Spinner size="xl" />
            <Text>Checking access...</Text>
          </>
        ) : (
          <>
            <Text fontSize="2xl" fontWeight="bold" color="red.600">
              {access === "denied" ? "Access denied" : "Please log in"}
            </Text>
            <Text>
              {access === "denied"
                ? "You do not have permission to view this page."
                : "You need to be logged in as an admin to view this page."}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Redirecting...
            </Text>
          </>
        )}
      </VStack>
    );
  }

  const query = searchQuery.trim().toLowerCase();
  const filteredUsers = users.filter((user) =>
    [user.email, user.name, user.familyName, user.username, ...user.groups]
      .join(" ")
      .toLowerCase()
      .includes(query),
  );

  return (
    <VStack
      gap="1rem"
      width="100%"
      maxWidth="60rem"
      marginX="auto"
      paddingX="1rem"
      paddingY="2rem"
      align="stretch"
    >
      <Text fontSize="xl" fontWeight="bold">
        User management
      </Text>
      <Text fontSize="sm" color="gray.600">
        Grant or remove ministry tool access. Admin membership is managed by the
        web team and cannot be changed here.
      </Text>

      <InputGroup width="100%" startElement={<LuSearch />}>
        <Input
          placeholder="Search by name, email, or group..."
          aria-label="Search users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          bg="white"
          borderColor="gray.300"
        />
      </InputGroup>

      {groupsError && (
        <Text fontSize="sm" color="orange.700">
          Group options failed to load: {groupsError}
        </Text>
      )}
      {saveError && (
        <Text fontSize="sm" color="red.600" role="alert">
          {saveError}
        </Text>
      )}

      {usersLoading && users.length === 0 ? (
        <Flex justify="center" paddingY="3rem">
          <Spinner size="lg" />
        </Flex>
      ) : usersError ? (
        <VStack paddingY="2rem">
          <Text color="red.600" role="alert">
            Could not load users: {usersError}
          </Text>
          <Button size="sm" variant="outline" onClick={loadUsers}>
            Retry
          </Button>
        </VStack>
      ) : filteredUsers.length === 0 ? (
        <Text textAlign="center" color="gray.600" paddingY="2rem">
          {users.length === 0 ? "No users found" : "No matching users"}
        </Text>
      ) : (
        <Table.ScrollArea
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="md"
          bg="white"
        >
          <Table.Root size="sm" minWidth="44rem">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Email</Table.ColumnHeader>
                <Table.ColumnHeader>Groups</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader>
                  <VisuallyHidden>Actions</VisuallyHidden>
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredUsers.map((user) => {
                const editing = editingUsername === user.username;
                const { toAdd, toRemove } = pendingChanges(user);
                const lockedGroups = user.groups.filter(
                  (group) => !availableGroups.includes(group),
                );
                return (
                  <Table.Row key={user.username}>
                    <Table.Cell whiteSpace="nowrap">
                      {user.name} {user.familyName}
                    </Table.Cell>
                    <Table.Cell whiteSpace="nowrap">{user.email}</Table.Cell>
                    <Table.Cell>
                      {editing ? (
                        <Flex gap="0.75rem" flexWrap="wrap" align="center">
                          {lockedGroups.map((group) => (
                            <GroupBadge key={group} group={group} />
                          ))}
                          {availableGroups.map((group) => (
                            <Checkbox.Root
                              key={group}
                              checked={draftGroups.includes(group)}
                              onCheckedChange={() => toggleDraftGroup(group)}
                              disabled={saving}
                              colorPalette="blue"
                              size="sm"
                            >
                              <Checkbox.HiddenInput />
                              <Checkbox.Control />
                              <Checkbox.Label>{group}</Checkbox.Label>
                            </Checkbox.Root>
                          ))}
                        </Flex>
                      ) : (
                        <Flex gap="0.25rem" flexWrap="wrap">
                          {user.groups.length > 0 ? (
                            user.groups.map((group) => (
                              <GroupBadge key={group} group={group} />
                            ))
                          ) : (
                            <Text fontSize="sm" color="gray.500">
                              None
                            </Text>
                          )}
                        </Flex>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Badge
                        colorPalette={user.enabled ? "green" : "gray"}
                        size="sm"
                      >
                        {user.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell textAlign="end" whiteSpace="nowrap">
                      {editing ? (
                        <HStack gap="0.5rem" justify="end">
                          <Button
                            size="xs"
                            colorPalette="blue"
                            onClick={() => saveGroups(user)}
                            loading={saving}
                            disabled={!toAdd.length && !toRemove.length}
                          >
                            Save
                          </Button>
                          <Button
                            size="xs"
                            variant="outline"
                            onClick={cancelEdit}
                            disabled={saving}
                          >
                            Cancel
                          </Button>
                        </HStack>
                      ) : (
                        <Button
                          size="xs"
                          variant="outline"
                          onClick={() => startEdit(user)}
                          disabled={
                            editingUsername !== null ||
                            saving ||
                            groupsLoading ||
                            availableGroups.length === 0
                          }
                          aria-label={`Edit groups for ${user.username}`}
                        >
                          Edit
                        </Button>
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      )}

      <Text fontSize="sm" color="gray.600">
        {query
          ? `Showing ${filteredUsers.length} of ${users.length} users`
          : `Total users: ${users.length}`}
      </Text>
    </VStack>
  );
};

const GroupBadge = ({ group }: { group: string }) => (
  <Badge colorPalette={group === ADMIN_GROUP ? "red" : "blue"} size="sm">
    {group}
  </Badge>
);

export default AdminPage;
