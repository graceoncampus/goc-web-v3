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
} from "@chakra-ui/react";
import { NavbarActiveKey } from "@/components/Navbar";
import { LoginTemplate } from "@/layouts/LoginTemplate";
import { fetchAuthSession } from "aws-amplify/auth";
import { get } from "aws-amplify/api";

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

  // Fetch users when admin access is confirmed
  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
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
    <Box width="750px" height="400px">
      <VStack gap="1rem" align="center" height="100%">
        <Heading as="h2" fontSize="2xl">
          ADMIN - USER MANAGEMENT
        </Heading>

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
          ) : users.length === 0 ? (
            <Text textAlign="center" color="gray.500">
              No users found
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
                {users.map((user) => (
                  <Table.Row key={user.username}>
                    <Table.Cell whiteSpace="nowrap">
                      {user.name} {user.familyName}
                    </Table.Cell>
                    <Table.Cell whiteSpace="nowrap">{user.email}</Table.Cell>
                    <Table.Cell>
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
          Total users: {users.length}
        </Text>
      </VStack>
    </Box>
  );
};

export default AdminPage;
