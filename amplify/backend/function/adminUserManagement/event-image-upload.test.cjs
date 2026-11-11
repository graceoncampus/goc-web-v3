const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const {
  createEventImageUpload,
  MAX_IMAGE_BYTES,
} = require("./src/event-image-upload");

const pool = "us-west-2_test";
const sub = "11111111-1111-1111-1111-111111111111";
const provider = (id = pool) =>
  `cognito-idp.us-west-2.amazonaws.com/${id},cognito-idp.us-west-2.amazonaws.com/${id}:CognitoSignIn:${sub}`;

function handlerFor(
  groups,
  signer = async () => ({ imageUrl: "https://example.test/photo.jpg" }),
) {
  class ListUsersCommand {
    constructor(input) {
      this.input = input;
    }
  }
  class AdminListGroupsForUserCommand {
    constructor(input) {
      this.input = input;
    }
  }
  class ListGroupsCommand {
    constructor(input) {
      this.input = input;
    }
  }
  class CognitoIdentityProviderClient {
    async send(command) {
      if (command instanceof ListUsersCommand)
        return { Users: [{ Username: "test-user", Attributes: [] }] };
      if (command instanceof AdminListGroupsForUserCommand)
        return { Groups: groups.map((GroupName) => ({ GroupName })) };
      return { Groups: [] };
    }
  }
  const sandbox = {
    exports: {},
    process: { env: { AUTH_GOCWEBV3265A1135_USERPOOLID: pool } },
    console: { log() {}, warn() {}, error() {} },
    require(name) {
      if (name === "./event-image-upload")
        return { createEventImageUpload: signer };
      if (name === "@aws-sdk/client-cognito-identity-provider")
        return {
          CognitoIdentityProviderClient,
          ListUsersCommand,
          AdminListGroupsForUserCommand,
          ListGroupsCommand,
        };
      throw new Error(`Unexpected import ${name}`);
    },
  };
  vm.runInNewContext(
    fs.readFileSync(path.join(__dirname, "src/index.js"), "utf8"),
    sandbox,
  );
  return sandbox.exports.handler;
}

function event(
  route = "/event-image-upload",
  method = "POST",
  authProvider = provider(),
) {
  return {
    path: route,
    httpMethod: method,
    requestContext: {
      identity: { cognitoAuthenticationProvider: authProvider },
    },
    body: JSON.stringify({ contentType: "image/jpeg", size: 100 }),
  };
}

test("upload signing requires live ATeam membership and the correct Cognito pool", async () => {
  assert.equal((await handlerFor(["ATeam"])(event())).statusCode, 200);
  for (const groups of [[], ["Admin"], ["RidesTeam"]]) {
    assert.equal((await handlerFor(groups)(event())).statusCode, 403);
  }
  assert.equal(
    (await handlerFor(["ATeam"])(event(undefined, undefined, ""))).statusCode,
    403,
  );
  assert.equal(
    (
      await handlerFor(["ATeam"])(
        event(undefined, undefined, provider("us-west-2_other")),
      )
    ).statusCode,
    403,
  );
});

test("upload permission does not grant user administration", async () => {
  for (const [route, method] of [
    ["/users", "GET"],
    ["/groups", "GET"],
    ["/add-to-group", "POST"],
    ["/remove-from-group", "POST"],
  ]) {
    assert.equal(
      (await handlerFor(["ATeam"])(event(route, method))).statusCode,
      403,
    );
  }
  assert.equal(
    (await handlerFor(["Admin"])(event("/groups", "GET"))).statusCode,
    200,
  );
  const protectedChange = event("/add-to-group");
  protectedChange.body = JSON.stringify({
    username: "test-user",
    groupName: "Admin",
  });
  assert.equal((await handlerFor(["Admin"])(protectedChange)).statusCode, 403);
});

test("malformed bodies fail clearly and internal errors stay private", async () => {
  const invalid = event();
  invalid.body = "{";
  assert.equal((await handlerFor(["ATeam"])(invalid)).statusCode, 400);
  invalid.body = "null";
  assert.equal((await handlerFor(["ATeam"])(invalid)).statusCode, 400);
  const failed = await handlerFor(["ATeam"], async () => {
    throw new Error("private diagnostic");
  })(event());
  assert.equal(failed.statusCode, 500);
  assert.ok(!failed.body.includes("private diagnostic"));
});

test("signer constrains type, size, lifetime, unique key and permanent URL", async () => {
  process.env.EVENT_IMAGES_BUCKET = "gamma-event-images-test";
  process.env.REGION = "us-west-2";
  const keys = new Set();
  for (const [contentType, extension] of [
    ["image/jpeg", "jpg"],
    ["image/png", "png"],
    ["image/webp", "webp"],
    ["image/gif", "gif"],
  ]) {
    const result = await createEventImageUpload(
      { contentType, size: MAX_IMAGE_BYTES },
      {},
      async (_client, options) => {
        assert.equal(options.Bucket, "gamma-event-images-test");
        assert.equal(options.Expires, 300);
        assert.match(
          options.Key,
          new RegExp(`^public/event-images/[a-f0-9-]+\\.${extension}$`),
        );
        assert.equal(options.Fields["Content-Type"], contentType);
        assert.ok(
          options.Conditions.some(
            (c) =>
              c[0] === "content-length-range" &&
              c[1] === 1 &&
              c[2] === MAX_IMAGE_BYTES,
          ),
        );
        keys.add(options.Key);
        return {
          url: "https://gamma-event-images-test.s3.us-west-2.amazonaws.com",
          fields: { key: options.Key },
        };
      },
    );
    assert.equal(
      result.imageUrl,
      `https://gamma-event-images-test.s3.us-west-2.amazonaws.com/${result.fields.key}`,
    );
  }
  assert.equal(keys.size, 4);
  const neverSign = async () => {
    assert.fail("Invalid uploads must not be signed");
  };
  for (const body of [
    { contentType: "image/svg+xml", size: 1 },
    { contentType: "text/html", size: 1 },
    { contentType: "__proto__", size: 1 },
    { contentType: "image/png", size: 0 },
    { contentType: "image/png", size: MAX_IMAGE_BYTES + 1 },
    { contentType: "image/png", size: 1.5 },
  ]) {
    await assert.rejects(createEventImageUpload(body, {}, neverSign), {
      statusCode: 400,
    });
  }
});

test("storage policy grants public read and scoped Lambda writes only", () => {
  const template = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "adminUserManagement-cloudformation-template.json"),
    ),
  );
  assert.equal(template.Resources.EventImagesBucket.DeletionPolicy, "Retain");
  assert.equal(
    template.Resources.EventImagesBucketPolicy.Properties.PolicyDocument
      .Statement[0].Action,
    "s3:GetObject",
  );
  const write =
    template.Resources.EventImageUploadPolicy.Properties.PolicyDocument
      .Statement[0];
  assert.equal(write.Action, "s3:PutObject");
  assert.equal(
    write.Resource["Fn::Sub"],
    "${EventImagesBucket.Arn}/public/event-images/*",
  );
});

test("installed SDK produces a signed POST with the required exact fields", async () => {
  const sdkRequire = require("node:module").createRequire(
    path.join(__dirname, "src/package.json"),
  );
  const { S3Client } = sdkRequire("@aws-sdk/client-s3");
  const { createPresignedPost } = sdkRequire("@aws-sdk/s3-presigned-post");
  const result = await createEventImageUpload(
    { contentType: "image/png", size: 100 },
    {},
    (_client, options) =>
      createPresignedPost(
        new S3Client({
          region: "us-west-2",
          credentials: {
            accessKeyId: "TESTACCESSKEY",
            secretAccessKey: "test-secret-for-offline-signing-only",
          },
        }),
        options,
      ),
  );
  const policy = JSON.parse(
    Buffer.from(result.fields.Policy, "base64").toString(),
  );
  assert.ok(result.fields["X-Amz-Signature"]);
  assert.ok(
    policy.conditions.some((condition) => condition.key === result.fields.key),
  );
  assert.ok(
    policy.conditions.some(
      (condition) => condition["Content-Type"] === "image/png",
    ),
  );
  assert.ok(
    policy.conditions.some(
      (condition) =>
        condition[0] === "content-length-range" &&
        condition[2] === MAX_IMAGE_BYTES,
    ),
  );
});
