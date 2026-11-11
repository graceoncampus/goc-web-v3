# Harden admin user management API

## Purpose

The engineer is integrating `feature/admin-user-management`, starting with an infrastructure-only branch off `gamma`. Before the `/admin` page is exposed, the backend must stop trusting every signed-in user.

## Findings (read-only, profile `goc`, account 271755560601, IAM user `KellyJia`)

- The feature's backend is already on Git `gamma` and `main` and deployed in both environments. Deployed `index.js` matches `origin/gamma` (gamma) and `origin/main` (dev). Nothing from the feature branch's `amplify/` folder needs migrating; that copy is older (hardcoded production pool, wildcard pool policy, no ATeam) and would delete gamma's deploy guards if merged.
- Gamma: Lambda `adminUserManagement-gamma`, API `vj4i5m1x2h`. Dev: Lambda `adminUserManagement-dev`, API `bhoyeib3ye`. Both APIs use `AWS_IAM`, granted to the authenticated role, and the Lambda did no caller check, so any signed-in member could list all users' emails or add themselves to `RidesTeam`/`ATeam`.
- An unmanaged, untagged production API `AdminUserManagement` (`wo66rsqxed`, created 2026-02-05) has `GET /users` with no authorization, integrated with `adminUserManagement-dev`. The current Lambda's resource policy only allows `bhoyeib3ye`, so it cannot invoke it now, but Lambda logs show it invoked an earlier production function unauthenticated in February.
- The old handler logged full events. `/aws/lambda/adminUserManagement-dev` retains events from January–May 2026 containing request headers, including session tokens (now expired) and caller identifiers. They were summarized without printing tokens.

## Actions and files

- Branch `infra/admin-user-management` from `origin/gamma`.
- `amplify/backend/function/adminUserManagement/src/index.js`: require live `Admin` membership for every request using the identity-pool provider string; paginate users, groups, and per-user groups; log request context, rejections, failures with stacks, and membership changes instead of the raw event; route errors through one handler. Response shapes are unchanged.
- `docs/features/admin-user-management.md` (new) and `docs/architecture.md`.

No IAM, API, or template change: the Lambda already has `ListUsers` and `AdminListGroupsForUser` on its own pool.

## Verification

`node --check` passed. A local harness mocking the Cognito SDK confirmed 403 for unauthenticated, non-admin, foreign-pool, and malformed callers (and no mutation), 65 users returned across pages, `Admin` hidden and protected, 400/404 handling, 500 with a logged stack on SDK failure, membership changes logged, and session tokens absent from logs. The provider-string format was confirmed against real production events.

## Environment impact

None yet. Nothing committed, pushed, or deployed. Deploying to gamma replaces only the Lambda code (in-place update, non-destructive). Production changes only through a reviewed `main` release.

## Follow-up and manual steps

- After the gamma deploy, verify as an `Admin` user and as a signed-in non-admin (expect 403).
- Engineer action (production, agents may not do this): delete unmanaged API `wo66rsqxed`, e.g. `aws apigateway delete-rest-api --rest-api-id wo66rsqxed --profile goc --region us-west-2` after confirming nothing uses it.
- Engineer decision: whether to delete or shorten retention on old `adminUserManagement-dev` log streams that contain request headers.
- `adminUserManagement` and `updateRides` still run on deprecated `nodejs18.x`; plan a reviewed runtime upgrade before AWS blocks updates.
- UI integration follows on a separate branch from this one.
