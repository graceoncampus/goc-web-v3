# Admin user management

## Purpose and relationship to the mission

Let site admins see who has an account and grant or remove ministry tool access (`RidesTeam`, `ATeam`) without opening the AWS console. Serving teams get access from the people entrusted with the ministry, and nobody needs AWS credentials to do it.

## Features

- List every Cognito user with name, email, account status, and groups.
- List assignable groups (everything except `Admin`).
- Add a user to, or remove a user from, a non-`Admin` group.

## Human decisions preserved

Nothing is assigned automatically. An admin decides every membership change; the API only carries out that decision. `Admin` membership cannot be changed through this API, so granting admin remains a deliberate console action by an engineer.

## Infrastructure/backend details

- API Gateway `adminUserManagement` (REST, `AWS_IAM` auth) with `/users`, `/groups`, `/add-to-group`, `/remove-from-group`, each proxying to Lambda `adminUserManagement-<env>`.
- `APIGatewayAuthStack` lets the Cognito identity pool's authenticated role invoke the API. That only proves the caller is signed in.
- The Lambda therefore authorizes every administration request itself: it reads the caller's `sub` from `requestContext.identity.cognitoAuthenticationProvider`, requires the provider to be this environment's user pool, looks the user up, and requires live `Admin` membership. Others get 403. Checking live membership (not the token's groups claim) means a removed admin loses access immediately. The separately scoped `POST /event-image-upload` route requires live `ATeam` membership; it does not grant administration access. See [event image uploads](event-image-upload.md).
- The Lambda's user pool comes from `AUTH_GOCWEBV3265A1135_USERPOOLID`; its IAM policy is scoped to that pool. It fails at startup if the variable is missing.
- User and group lists paginate through Cognito, so all users are returned.
- Logs record method, path, request ID, caller `sub`, rejections, failures with stacks, and each membership change with target username and group. The raw event is not logged because it contains request signing headers and session tokens.
- The event-image upload change prepares `nodejs22.x` with explicitly bundled AWS SDK v3 Cognito/S3/signing dependencies. The October 27 deployed audit below predates this undeployed runtime change.

Deployed in both environments: gamma (`adminUserManagement-gamma`, API `vj4i5m1x2h`) and production `dev` (`adminUserManagement-dev`, API `bhoyeib3ye`), verified read-only on 2026-10-27.

## Frontend details

The `/admin` page and its login-menu link exist only on `feature/admin-user-management` and are not yet on `gamma` or `main`; they will be integrated in a separate UI branch. The page calls the API with Amplify `get`/`post` (`apiName: "adminUserManagement"`) and expects `{ users }` and `{ groups }` response bodies. Its client-side `Admin` check is for navigation only; the Lambda enforces access.

## Validation and deployment

Infrastructure changes ship through the gamma branch pipeline first. Verify on gamma that an `Admin` user can list users and change a non-`Admin` group, and that a signed-in non-admin receives 403. Production follows only through a reviewed `main` release.
