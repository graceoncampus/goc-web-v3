import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  VStack,
  Text,
  Table,
  Badge,
  Flex,
  Spinner,
  Input,
  Checkbox,
} from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { LuSearch } from "react-icons/lu";
import { NavbarActiveKey } from "@/components/Navbar";
import { LoginTemplate } from "@/layouts/LoginTemplate";
import { fetchAuthSession } from "aws-amplify/auth";
import { get, post } from "aws-amplify/api";

type User = {
  username: string;
  email: string;
  name: string;
  familyName: string;
  groups: string[];
  enabled: boolean;
  status: string;
};

export const AdminPage = () => {
  return (
    <LoginTemplate activeKey={NavbarActiveKey.LOGIN}>
      <AdminBody />
    </LoginTemplate>
  );
};

const AdminBody = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [groupsError, setGroupsError] = useState<string | null>(null);
  const [editingUsername, setEditingUsername] = useState<string | null>(null);
  const [draftGroups, setDraftGroups] = useState<string[]>([]);
  const [saveInProgress, setSaveInProgress] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.email.toLowerCase().includes(query) ||
      user.name.toLowerCase().includes(query) ||
      user.familyName.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query) ||
      user.groups.some((group) => group.toLowerCase().includes(query))
    );
  });

  // Check if user is admin
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const session = await fetchAuthSession();
        const groups = session.tokens?.idToken?.payload["cognito:groups"];
        const hasAdminRole = Array.isArray(groups) && groups.includes("Admin");
        setIsAdmin(hasAdminRole);

        if (!hasAdminRole) {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        setIsAdmin(false);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [navigate]);

  // Fetch users from Lambda
  const fetchUsers = async () => {
    setUsersLoading(true);
    setError(null);
    try {
      const response = await get({
        apiName: "adminUserManagement",
        path: "/users",
      }).response;

      const data = await response.body.json();
      console.log("Fetched users:", data);

      if (data && (data as any).users) {
        setUsers((data as any).users);
      }
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.message || "Failed to fetch users");
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchGroups = async () => {
    setGroupsLoading(true);
    setGroupsError(null);
    try {
      const response = await get({
        apiName: "adminUserManagement",
        path: "/groups",
      }).response;

      const data = await response.body.json();
      if (data && Array.isArray((data as any).groups)) {
        setAvailableGroups((data as any).groups);
      } else {
        setAvailableGroups([]);
      }
    } catch (err: any) {
      console.error("Error fetching groups:", err);
      setGroupsError(err.message || "Failed to fetch available groups");
    } finally {
      setGroupsLoading(false);
    }
  };

  const handleEditRow = (user: User) => {
    if (editingUsername !== null || groupsLoading || saveInProgress) {
      return;
    }
    setEditingUsername(user.username);
    setDraftGroups(user.groups);
    setSaveError(null);
  };

  const handleCancelEdit = () => {
    setEditingUsername(null);
    setDraftGroups([]);
    setSaveError(null);
  };

  const toggleDraftGroup = (group: string) => {
    setDraftGroups((prev) =>
      prev.includes(group)
        ? prev.filter((draftGroup) => draftGroup !== group)
        : [...prev, group]
    );
  };

  const hasDraftChanges = (user: User) => {
    const originalGroups = new Set(user.groups);
    const nextGroups = new Set(draftGroups);

    if (originalGroups.size !== nextGroups.size) {
      return true;
    }

    return [...nextGroups].some((group) => !originalGroups.has(group));
  };

  const handleSaveGroups = async (user: User) => {
    setSaveInProgress(true);
    setSaveError(null);
    try {
      const originalGroups = new Set(user.groups);
      const nextGroups = new Set(draftGroups);

      const toAdd = [...nextGroups].filter((group) => !originalGroups.has(group));
      const toRemove = [...originalGroups].filter(
        (group) => !nextGroups.has(group)
      );

      for (const groupName of toAdd) {
        await post({
          apiName: "adminUserManagement",
          path: "/add-to-group",
          options: { body: { username: user.username, groupName } },
        }).response;
      }

      for (const groupName of toRemove) {
        await post({
          apiName: "adminUserManagement",
          path: "/remove-from-group",
          options: { body: { username: user.username, groupName } },
        }).response;
      }

      await fetchUsers();
      handleCancelEdit();
    } catch (err: any) {
      console.error("Error saving group changes:", err);
      setSaveError(err.message || "Failed to save group changes");
    } finally {
      setSaveInProgress(false);
    }
  };

  useEffect(() => {
    if (!editingUsername) {
      return;
    }

    const handlePointerOutsideEditor = (event: MouseEvent) => {
      if (saveInProgress) {
        return;
      }

      const editingUser = users.find((user) => user.username === editingUsername);
      if (!editingUser) {
        return;
      }

      const target = event.target as Element | null;
      const editorSelector = `[data-groups-editor="${editingUsername}"]`;
      if (target?.closest(editorSelector)) {
        return;
      }

      if (!hasDraftChanges(editingUser)) {
        handleCancelEdit();
        return;
      }

      void handleSaveGroups(editingUser);
    };

    document.addEventListener("mousedown", handlePointerOutsideEditor);
    return () => {
      document.removeEventListener("mousedown", handlePointerOutsideEditor);
    };
  }, [editingUsername, draftGroups, saveInProgress, users]);

  // Fetch users and groups when admin access is confirmed
  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchGroups();
    }
  }, [isAdmin]);

  if (loading) {
    return (
      <Box
        width="750px"
        height="400px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack gap="2rem" align="center">
          <Spinner size="xl" />
          <Text>Checking access...</Text>
        </VStack>
      </Box>
    );
  }

  if (!isAdmin) {
    return (
      <Box
        width="750px"
        height="400px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack gap="2rem" align="center">
          <Heading as="h2" fontSize="2xl" color="red.500">
            Access Denied
          </Heading>
          <Text>You do not have permission to view this page.</Text>
          <Text fontSize="sm" color="gray.500">
            Redirecting...
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <Box width="750px" height="450px">
      <VStack gap="1rem" align="center" height="100%">
        <Heading as="h2" fontSize="2xl">
          ADMIN - USER MANAGEMENT
        </Heading>

        {/* Search Bar */}
        <InputGroup width="100%" startElement={<LuSearch />}>
          <Input
            placeholder="Search by name, email, or group..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="white"
            borderColor="gray.300"
          />
        </InputGroup>
        {groupsError ? (
          <Text width="100%" fontSize="sm" color="orange.600" textAlign="left">
            Group options failed to load: {groupsError}
          </Text>
        ) : null}
        {saveError ? (
          <Text width="100%" fontSize="sm" color="red.500" textAlign="left">
            Save failed: {saveError}
          </Text>
        ) : null}

        <Box
          width="100%"
          flex="1"
          padding="1rem"
          borderRadius="md"
          border="1px solid"
          borderColor="gray.200"
          bg="white"
          overflow="auto"
        >
          {usersLoading ? (
            <Flex justify="center" align="center" height="100%">
              <Spinner size="lg" />
            </Flex>
          ) : error ? (
            <Text color="red.500" textAlign="center">
              Error: {error}
            </Text>
          ) : filteredUsers.length === 0 ? (
            <Text textAlign="center" color="gray.500">
              {users.length === 0 ? "No users found" : "No matching users"}
            </Text>
          ) : (
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Email</Table.ColumnHeader>
                  <Table.ColumnHeader>Groups</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredUsers.map((user) => (
                  <Table.Row key={user.username}>
                    <Table.Cell whiteSpace="nowrap">
                      {user.name} {user.familyName}
                    </Table.Cell>
                    <Table.Cell whiteSpace="nowrap">{user.email}</Table.Cell>
                    <Table.Cell
                      data-groups-editor={user.username}
                      cursor={
                        editingUsername === user.username ||
                        (editingUsername !== null && editingUsername !== user.username)
                          ? "default"
                          : "pointer"
                      }
                      onClick={() => handleEditRow(user)}
                    >
                      {editingUsername === user.username ? (
                        <Flex gap={2} flexWrap="wrap">
                          {groupsLoading ? (
                            <Spinner size="sm" />
                          ) : availableGroups.length > 0 ? (
                            availableGroups.map((group) => {
                              const selected = draftGroups.includes(group);
                              return (
                                <Checkbox.Root
                                  key={group}
                                  checked={selected}
                                  onCheckedChange={() => toggleDraftGroup(group)}
                                  disabled={saveInProgress}
                                  colorPalette={group === "Admin" ? "red" : "blue"}
                                >
                                  <Checkbox.HiddenInput />
                                  <Checkbox.Control />
                                  <Checkbox.Label fontSize="sm">{group}</Checkbox.Label>
                                </Checkbox.Root>
                              );
                            })
                          ) : (
                            <Text fontSize="sm" color="gray.400">
                              No editable groups available
                            </Text>
                          )}
                        </Flex>
                      ) : (
                        <Flex gap={1} flexWrap="wrap">
                          {user.groups.length > 0 ? (
                            user.groups.map((group) => (
                              <Badge
                                key={group}
                                colorPalette={group === "Admin" ? "red" : "blue"}
                                size="sm"
                              >
                                {group}
                              </Badge>
                            ))
                          ) : (
                            <Text fontSize="sm" color="gray.400">
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
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          )}
        </Box>

        <Text fontSize="sm" color="gray.500">
          {searchQuery
            ? `Showing ${filteredUsers.length} of ${users.length} users`
            : `Total users: ${users.length}`}
        </Text>
      </VStack>
    </Box>
  );
};

export default AdminPage;
