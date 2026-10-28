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

const USER_POOL_ID = process.env.AUTH_GOCWEBV3265A1135_USERPOOLID;
if (!USER_POOL_ID) throw new Error("Missing environment-specific Cognito user pool");

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

// Protected role that cannot be modified through this API
const PROTECTED_ROLE = "Admin";

// "<issuer>,<issuer>:CognitoSignIn:<sub>" from identity pool IAM auth
const AUTH_PROVIDER_PATTERN =
  /^cognito-idp\.[a-z0-9-]+\.amazonaws\.com\/([\w-]+),cognito-idp\.[a-z0-9-]+\.amazonaws\.com\/([\w-]+):CognitoSignIn:([0-9a-f-]{36})$/;

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const respond = (statusCode, body) => ({
  statusCode,
  headers: cors,
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return respond(200, { message: "OK" });
  }

  // Get path from various possible locations in the event
  const path =
    event.path ||
    event.rawPath ||
    event.resource ||
    event.requestContext?.resourcePath ||
    "";
  const method =
    event.httpMethod ||
    event.requestContext?.http?.method ||
    event.requestContext?.httpMethod ||
    "GET";
  const context = {
    method,
    path,
    requestId: event.requestContext?.requestId,
  };

  try {
    context.caller = await requireAdminCaller(event);
    console.log("Admin request", context);

    // Parse body if present
    let body = {};
    if (event.body) {
      body =
        typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    }

    // Route handling
    if (path.includes("/users") && method === "GET") {
      return respond(200, { users: await listUsers() });
    }

    if (path.includes("/groups") && method === "GET") {
      return respond(200, { groups: await listGroups() });
    }

    if (path.includes("/add-to-group") && method === "POST") {
      const { username, groupName } = requireMembershipFields(body);
      await addUserToGroup(username, groupName, context);
      return respond(200, {
        message: `User ${username} added to group ${groupName}`,
      });
    }

    if (path.includes("/remove-from-group") && method === "POST") {
      const { username, groupName } = requireMembershipFields(body);
      await removeUserFromGroup(username, groupName, context);
      return respond(200, {
        message: `User ${username} removed from group ${groupName}`,
      });
    }

    throw new HttpError(404, "Not found");
  } catch (error) {
    if (error instanceof HttpError) {
      console.warn("Admin request rejected", {
        ...context,
        statusCode: error.statusCode,
        reason: error.message,
      });
      return respond(error.statusCode, { error: error.message });
    }
    console.error("Admin request failed", context, error);
    return respond(500, { error: error.message });
  }
};

// API Gateway IAM auth only proves sign-in; group membership is checked live
// so a removed admin loses access before their token expires.
async function requireAdminCaller(event) {
  const provider =
    event.requestContext?.identity?.cognitoAuthenticationProvider || "";
  const match = AUTH_PROVIDER_PATTERN.exec(provider);
  if (!match || match[1] !== USER_POOL_ID || match[2] !== USER_POOL_ID) {
    throw new HttpError(403, "Admin access required");
  }
  const sub = match[3];

  const { Users = [] } = await client.send(
    new ListUsersCommand({
      UserPoolId: USER_POOL_ID,
      Filter: `sub = "${sub}"`,
      Limit: 1,
    }),
  );
  if (Users.length !== 1) {
    throw new HttpError(403, "Admin access required");
  }

  const groups = await listGroupsForUser(Users[0].Username);
  if (!groups.includes(PROTECTED_ROLE)) {
    throw new HttpError(403, "Admin access required");
  }
  return sub;
}

function requireMembershipFields(body) {
  const { username, groupName } = body;
  if (!username || !groupName) {
    throw new HttpError(400, "Missing required fields: username, groupName");
  }
  if (groupName === PROTECTED_ROLE) {
    throw new HttpError(
      403,
      `Cannot modify the ${PROTECTED_ROLE} role through this API`,
    );
  }
  return { username, groupName };
}

async function listGroupsForUser(username) {
  const groups = [];
  let NextToken;
  do {
    const response = await client.send(
      new AdminListGroupsForUserCommand({
        UserPoolId: USER_POOL_ID,
        Username: username,
        NextToken,
      }),
    );
    groups.push(...(response.Groups || []).map((g) => g.GroupName));
    NextToken = response.NextToken;
  } while (NextToken);
  return groups;
}

// List all users with their groups
async function listUsers() {
  const users = [];
  let PaginationToken;
  do {
    const response = await client.send(
      new ListUsersCommand({
        UserPoolId: USER_POOL_ID,
        Limit: 60,
        PaginationToken,
      }),
    );

    for (const user of response.Users || []) {
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
        groups: await listGroupsForUser(user.Username),
        enabled: user.Enabled,
        status: user.UserStatus,
        created: user.UserCreateDate,
      });
    }
    PaginationToken = response.PaginationToken;
  } while (PaginationToken);
  return users;
}

// List all available groups (excluding Admin)
async function listGroups() {
  const groups = [];
  let NextToken;
  do {
    const response = await client.send(
      new ListGroupsCommand({
        UserPoolId: USER_POOL_ID,
        Limit: 60,
        NextToken,
      }),
    );
    groups.push(...(response.Groups || []).map((g) => g.GroupName));
    NextToken = response.NextToken;
  } while (NextToken);
  return groups.filter((name) => name !== PROTECTED_ROLE);
}

async function addUserToGroup(username, groupName, context) {
  await client.send(
    new AdminAddUserToGroupCommand({
      UserPoolId: USER_POOL_ID,
      Username: username,
      GroupName: groupName,
    }),
  );
  console.log("Group membership added", { ...context, username, groupName });
}

async function removeUserFromGroup(username, groupName, context) {
  await client.send(
    new AdminRemoveUserFromGroupCommand({
      UserPoolId: USER_POOL_ID,
      Username: username,
      GroupName: groupName,
    }),
  );
  console.log("Group membership removed", { ...context, username, groupName });
}
