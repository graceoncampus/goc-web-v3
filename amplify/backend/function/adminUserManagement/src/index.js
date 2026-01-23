/* Amplify Params - DO NOT EDIT
  AUTH_GOCWEBV3_USERPOOLID
  ENV
  REGION
Amplify Params - DO NOT EDIT */

const {
  CognitoIdentityProviderClient,
  ListUsersCommand,
  ListGroupsCommand,
  AdminListGroupsForUserCommand,
  AdminAddUserToGroupCommand,
  AdminRemoveUserFromGroupCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const client = new CognitoIdentityProviderClient({
  region: process.env.REGION || "us-west-2",
});

// Use the Amplify-provided environment variable, or fall back to hardcoded value
const USER_POOL_ID =
  process.env.AUTH_GOCWEBV3_USERPOOLID || "us-west-2_rZ4wDVksQ";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

// Protected role that cannot be modified through this API
const PROTECTED_ROLE = "Admin";

exports.handler = async (event) => {
  console.log(`RECEIVED EVENT: ${JSON.stringify(event)}`);

  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({ message: "OK" }),
    };
  }

  const path = event.path || event.rawPath || "";
  const method = event.httpMethod || event.requestContext?.http?.method;

  try {
    // Parse body if present
    let body = {};
    if (event.body) {
      body =
        typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    }

    // Route handling
    if (path.includes("/users") && method === "GET") {
      return await listUsers();
    }

    if (path.includes("/groups") && method === "GET") {
      return await listGroups();
    }

    if (path.includes("/add-to-group") && method === "POST") {
      const { username, groupName } = body;
      if (!username || !groupName) {
        return {
          statusCode: 400,
          headers: cors,
          body: JSON.stringify({
            error: "Missing required fields: username, groupName",
          }),
        };
      }
      return await addUserToGroup(username, groupName);
    }

    if (path.includes("/remove-from-group") && method === "POST") {
      const { username, groupName } = body;
      if (!username || !groupName) {
        return {
          statusCode: 400,
          headers: cors,
          body: JSON.stringify({
            error: "Missing required fields: username, groupName",
          }),
        };
      }
      return await removeUserFromGroup(username, groupName);
    }

    return {
      statusCode: 404,
      headers: cors,
      body: JSON.stringify({ error: "Not found" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

// List all users with their groups
async function listUsers() {
  try {
    const listUsersCommand = new ListUsersCommand({
      UserPoolId: USER_POOL_ID,
      Limit: 60,
    });

    const usersResponse = await client.send(listUsersCommand);
    const users = [];

    for (const user of usersResponse.Users || []) {
      // Get groups for each user
      const groupsCommand = new AdminListGroupsForUserCommand({
        UserPoolId: USER_POOL_ID,
        Username: user.Username,
      });

      const groupsResponse = await client.send(groupsCommand);
      const groups = (groupsResponse.Groups || []).map((g) => g.GroupName);

      // Extract user attributes
      const attributes = {};
      for (const attr of user.Attributes || []) {
        attributes[attr.Name] = attr.Value;
      }

      users.push({
        username: user.Username,
        email: attributes.email || "",
        name: attributes.given_name || attributes.name || "",
        familyName: attributes.family_name || "",
        groups: groups,
        enabled: user.Enabled,
        status: user.UserStatus,
        created: user.UserCreateDate,
      });
    }

    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({ users }),
    };
  } catch (error) {
    console.error("Error listing users:", error);
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

// List all available groups (excluding Admin)
async function listGroups() {
  try {
    const command = new ListGroupsCommand({
      UserPoolId: USER_POOL_ID,
      Limit: 60,
    });

    const response = await client.send(command);
    const groups = (response.Groups || [])
      .map((g) => g.GroupName)
      .filter((name) => name !== PROTECTED_ROLE);

    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({ groups }),
    };
  } catch (error) {
    console.error("Error listing groups:", error);
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

// Add user to a group
async function addUserToGroup(username, groupName) {
  // Prevent adding to Admin group
  if (groupName === PROTECTED_ROLE) {
    return {
      statusCode: 403,
      headers: cors,
      body: JSON.stringify({
        error: `Cannot modify the ${PROTECTED_ROLE} role through this API`,
      }),
    };
  }

  try {
    const command = new AdminAddUserToGroupCommand({
      UserPoolId: USER_POOL_ID,
      Username: username,
      GroupName: groupName,
    });

    await client.send(command);

    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({
        message: `User ${username} added to group ${groupName}`,
      }),
    };
  } catch (error) {
    console.error("Error adding user to group:", error);
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

// Remove user from a group
async function removeUserFromGroup(username, groupName) {
  // Prevent removing from Admin group
  if (groupName === PROTECTED_ROLE) {
    return {
      statusCode: 403,
      headers: cors,
      body: JSON.stringify({
        error: `Cannot modify the ${PROTECTED_ROLE} role through this API`,
      }),
    };
  }

  try {
    const command = new AdminRemoveUserFromGroupCommand({
      UserPoolId: USER_POOL_ID,
      Username: username,
      GroupName: groupName,
    });

    await client.send(command);

    return {
      statusCode: 200,
      headers: cors,
      body: JSON.stringify({
        message: `User ${username} removed from group ${groupName}`,
      }),
    };
  } catch (error) {
    console.error("Error removing user from group:", error);
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
