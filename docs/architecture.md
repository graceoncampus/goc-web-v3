# Architecture and deployment

## Application

The frontend uses React 19, TypeScript, Vite, Chakra UI, React Router, and MobX. `src/App.tsx` defines routes; `src/pages/` contains page implementations, `src/components/` shared UI, `src/layouts/` page templates, `src/store/` state, and `src/theme.ts` theme definitions. `src/graphql/` and API types are generated; use their generation workflow rather than editing generated output casually.

## Backend resource inventory

The initial inventory comes from checked-in definitions. The October 2026 gamma setup also audited live AWS resources using profile `goc`, account `271755560601`, region `us-west-2`; details follow below.

| Resource | Purpose |
| --- | --- |
| AppSync `gocbackendv3` | GraphQL access to events, recurring events, ministry teams, prayer requests, rides, and sermons; schema in `amplify/backend/api/gocbackendv3/schema.graphql`. |
| DynamoDB | Persistence behind backend workflows; `updateSermons` directly accesses the `Sermons` table. Full physical table and resolver inventory remains to be verified. |
| Cognito `gocwebv3265a1135` | Website authentication and identities. |
| Cognito `userPoolGroups` | `RidesTeam`, `Admin`, and `ATeam` memberships for ministry tools. |
| API Gateway `adminUserManagement` and Lambda of the same name | User and group administration. |
| API Gateway `updateRides` and Lambda of the same name | Ride coordination backend; includes Google Sheets and email-related code. |
| Lambda `updateSermons` | Imports sermon metadata from the GOC RSS feed into DynamoDB. |
| S3 `sermons` | Sermon storage; configured for authenticated access in `cli-inputs.json`, without a storage trigger. |

Do not infer that sermon imports use S3 merely because the storage resource exists. Describe actual code paths and verify deployed behavior separately.

## Deployment

Both backend and frontend use Amplify Gen 1. Gen 2 migration is future work requiring a design, environment/data migration plan, verification, and rollback strategy.

`dev` is finalized production and must remain available. Only `main` may deploy to it. Every non-main branch uses shared `gamma`. Agents must never execute manual or destructive production changes; an engineer must personally perform any necessary such actions. Every destructive gamma change requires explicit engineer verification for that operation. See [AGENTS.md](../AGENTS.md) for the full rules.

The current working-tree `amplify.yml` invokes `amplify/scripts/deploy-backend.sh`, which maps `AWS_BRANCH=main` to `dev` and all other branches to `gamma`. It fails when `AWS_BRANCH` is absent. Frontend phases use Yarn, generate GraphQL operations, build with Vite, and publish `dist`. These files are existing engineer changes at the time of this documentation; their presence does not establish that live Hosting is configured to use them.

`amplify/.config/project-config.json` still names `build` and Windows-style npm commands. Verify which configuration a workflow uses before changing it; do not silently reconcile configurations as part of unrelated work.

Before an authorized deployment, verify branch/environment mapping, review infrastructure changes and replacement/data-loss risks, validate relevant workflows, and establish recovery steps. Preparing code does not authorize an agent to publish or trigger production deployment.

### Automatic and manual Hosting builds

Automatic Git-push builds are reserved for `main` and `gamma`. Developer branches `build`, `dev`, `feature/events`, and `feature/recurring-events` use manual builds against the shared gamma backend; their Hosting `enableAutoBuild` setting is disabled. Automatic branch creation remains disabled. Connect any new developer branch with automatic builds disabled. Existing production main settings are unchanged.

The trigger policy is configured in Amplify Hosting, independently of `amplify.yml`, which still describes the commands for both automatic and manual builds. No branch guard forbids manual developer deployments. To manually deploy a connected developer branch, use Amplify Hosting's build control or `aws amplify start-job --app-id d1afaiv4wnjkx7 --branch-name <developer-branch> --job-type RELEASE --profile goc --region us-west-2`, after verifying its backend binding and reviewed build configuration target gamma. This operation is a deployment, not a read-only check. Destructive gamma changes require fresh engineer verification every time. See the [trigger-policy journal](journal/2026-10-12-ejinsw-disable-developer-branch-auto-builds.md).

## Verification and pending operational documentation

Use Node `22.9.0` and Yarn `1.22.22`. `yarn build` creates the Vite production bundle. `yarn test` is Vite preview, not an automated test suite. Lint uses TSLint with `--fix`; formatting also writes files. Avoid incidental changes from these commands.

Pending verified documentation: live Hosting branch configuration and URLs, complete deployed resource inventory, IAM policies, Lambda triggers/schedules, external integration credentials and rotation procedures, monitoring, backups, and rollback/recovery procedures. Never include secret values or private member data.

## Gamma setup audit, October 7, 2026

Amplify app `d1afaiv4wnjkx7` uses production backend stack `amplify-gocwebv3-dev-150706`. The unused `prod` stack has only its environment bootstrap resources. Gamma's separate root stack, `amplify-gocwebv3-gamma-a0479`, deployed successfully on October 9. Its API is `gbbpp2vlg5evpkal4acdraeweu`, and its independent user pool is `us-west-2_ppQ8GSVxo`.

The source AppSync API has eight DynamoDB data sources: `Events`, `MinistryTeamTable`, `MinistryTeams`, `PrayerRequestTable`, `RecurringEvent-oqva3hdzfnh2zgemolfaottlse-dev`, `RecurringEvents`, `RideTable`, and `Sermons`. They use on-demand billing with no secondary indexes; TTL and point-in-time recovery were disabled at audit time. Sermons uses `id` and `date` as its composite key; the others use `id`. Thirty live resolvers were recovered into the authoritative custom-resource template. Previously unmanaged legacy resources are declared only under the `IsGamma` condition, avoiding creation or adoption of those production resources.

Two application buckets are in scope: the legacy assets bucket `gocwebv3-storage-c7ea0908150706-dev` and the sermons bucket `gocwebv33659dcc621154f51904047ab480f9bae150706-dev`. Both contained only three folder-marker objects at audit time. Deployment artifacts and unrelated buckets are excluded from the application-data copy. The first gamma attempt retained an empty sermons bucket during automatic rollback. The storage override preserves it and gives the next gamma attempt its own bucket; production bucket naming is unchanged.

Gamma uses an independent Cognito pool, identity pool, clients, groups, APIs, and functions. `adminUserManagement` receives its own pool ID and a policy scoped to that pool. The source admin API's referenced Lambda was absent during audit. Gamma's sermon function targets `Sermons-gamma`; its scheduled rule is disabled. Driver email delivery is disabled in gamma unless explicitly enabled through `ENABLE_DRIVER_EMAIL=true`. The rides workflow continues reading engineer-prepared Google Sheets; it does not assign or organize cars. Gamma's Admin and ATeam groups explicitly reference its authenticated role; Cognito retained generated roles when updates omitted `RoleArn`, so this restores the effective default-role access used by the production groups without recreating them. Their precedence remains unset. Generated unused group roles remain preserved.

`seed-gamma.py` reads production data and writes only verified gamma targets. It requires empty destinations for an initial copy, snapshots source items privately, copies all eight tables, and compares every copied item and S3 object. Its explicit `--resume-from` mode verifies existing tables against the saved snapshot without rewriting them and copies only missing objects. CopyObject is required because S3 sync skips the existing zero-byte folder markers. It does not delete source data or perform cleanup on failure. Cognito users/passwords are not part of this table/bucket copy.

The October 9 snapshot contains 189 items: Events 10, MinistryTeamTable 12, MinistryTeams 13, PrayerRequestTable 0, recurring-event table 2, RecurringEvents 1, RideTable 2, Sermons 149. Both destination buckets contain the same three folder-marker objects as their sources; object bytes were verified. Six application list queries succeeded through gamma AppSync. IAM simulation confirmed the sermon importer and user-admin function allow their gamma targets and deny the corresponding production table/pool writes. Local override compilation and the Vite frontend build passed; the frontend bundle contains gamma bindings.

At audit time, live Hosting's app-level build specification pulled `dev`. Non-main branches `build`, `dev`, and `feature/recurring-events` referenced the dev backend; `feature/events` had no backend association. All four now reference gamma and use `amplify/scripts/gamma-hosting-build.yml`. Before the new backend script is committed, that specification skips backend deployment and pulls gamma using explicit headless settings and Hosting's IAM role. A plain `--yes` pull attempted an interactive Admin UI login. The CLI's general credential mode then failed despite successful AWS CLI account/app checks, so the bootstrap uses a private, temporary `gamma-ci` profile made from the container's existing role credentials. It does not change IAM permissions or engineer profiles. Once the script is present in the checkout, Hosting runs the reviewed repository backend definitions.

`main`, the app-global build settings, and the existing root/`www` custom-domain association remain unchanged. A separate association for `gamma.graceoncampus.org` targets the Hosting branch `dev`; Amplify created only gamma hostname and certificate-validation DNS records. Its certificate/domain association is AVAILABLE. Hosting job 8 succeeded, and `https://gamma.graceoncampus.org/` returns HTTPS 200 with gamma API, Cognito, and S3 bindings verified in the served JavaScript. Events, sermons, login, and admin SPA routes return 200; authenticated account/admin behavior requires a separate gamma account and group membership. CI explicitly installs Yarn 1.22.22 after Node selection. Repository branch-routing changes remain uncommitted; do not confuse this live gamma bootstrap with publishing the new main pipeline.

## Gamma website branch, October 12, 2026

The engineer requested Git `gamma` based on remote `main` at `2b31b1f89775bc78e4d9fcd1582f93c1b863a947`. Configuration commit `931a0d3` is its direct child because main's checked-in `amplify.yml` explicitly pulls production `dev`. Gamma's root build specification uses the verified gamma bootstrap, pulls the existing gamma backend, generates GraphQL files, and builds the frontend. No backend deployment script is included in this branch, so its build skips backend deployment. [Repository build specifications override console settings](https://docs.aws.amazon.com/amplify/latest/userguide/edit-build-settings.html); inspect the checked-in file before publishing changes.

The new Hosting branch `gamma` references backend `gamma`. Hosting job 1 succeeded, and the existing `gamma.graceoncampus.org` association now targets branch `gamma` with AVAILABLE/UPDATE_COMPLETE status. The domain serves the same verified bundle as the new branch URL, with gamma API, Cognito, and S3 bindings. The October 9 `dev` Hosting branch and deployment remain available. No backend resources or production settings were modified. See the [branch migration journal](journal/2026-10-12-ejinsw-host-gamma-from-main.md) for verification details. Other non-main branches continue sharing the same gamma backend; Git `main` still uses production backend `dev`.

Automatic builds are enabled for Git `gamma`. Its latest Git commit `4498029` only completes the verification journal; job 1 deployed configuration commit `931a0d3`, and their build specification and frontend source are identical. The local checkout remained on Git `dev` to preserve existing uncommitted work. Broader local backend, pipeline, and guidance changes were not included in either gamma commit.

## Application data refresh, October 12, 2026

Fresh read-only scans verified seven tables match production exactly. RideTable had 26 current production records missing from gamma and two older gamma-only records. All 26 were copied using conditional PutItem on RideTable-gamma with attribute_not_exists(id); both existing rows were preserved. Gamma contains 215 items: Events 10, MinistryTeamTable 12, MinistryTeams 13, PrayerRequestTable 0, recurring-event table 2, RecurringEvents 1, RideTable 28, and Sermons 149. The source snapshot has 213 items and 26 rides. This preserves every current source record without deleting historical gamma data.

Both application buckets still match with six total folder-marker objects, verified by bytes, metadata, tags, CORS, and encryption. GraphQL type definitions and all 30 root resolvers match; three gamma functions have isolated bindings, sermon scheduling is disabled, and driver emails remain suppressed. No Cognito migration was executed: the engineer cancelled it after automatic approval review rejected the proposed schema push. Its undeployed override was removed, and Amplify status shows no pending resource changes. Cognito user accounts and the existing schema remain independent. See the [refresh journal](journal/2026-10-12-ejinsw-finish-gamma-application-data.md). Deployment artifacts, historical logs, external Google Sheets, and unrelated buckets/resources are outside the application-data migration.

## Publishing backend definitions to main

Commit `03c0567` published the recovered backend definitions and helpers while preserving main's existing amplify.yml. The proposed local full backend/frontend build specification remains unpublished. Before this publication, production's root stack had no managed admin API/function stacks. The initial assumption that unchanged YAML made the push frontend-only was wrong: Hosting job 178 initiated a production backend CloudFormation update through its associated-environment workflow even though amplify.yml had no explicit backend phase. Cloud work stopped immediately on discovery and the engineer was notified. See the [incident record](journal/2026-10-14-ejinsw-review-amplify-publication-to-main.md#incident-unexpected-production-backend-deployment-work-stopped).

Subsequent read-only checks, authorized with the documentation publication request, show job 178 succeeded in BUILD/DEPLOY/VERIFY and the production root stack is UPDATE_COMPLETE, updated at `2026-10-14T15:48:48.764Z`. These statuses do not establish complete runtime validation or an audit of every resource change. No rollback, cleanup, or production configuration fix was attempted. Review the complete Hosting workflow and backend plan before another application/backend publication; do not infer safety only from the repository YAML.

For documentation-only publication that must not deploy, append `[skip-cd]` to the commit message as documented in [AWS build guidance](https://docs.aws.amazon.com/amplify/latest/userguide/edit-build-settings.html), then verify no new Hosting build or backend update occurred. This does not change the automatic-build setting for future application commits.

## Gamma rebase, October 14, 2026

Git gamma was rebased onto main at 06af751, retaining its existing amplify.yml and main's newer deployment journal. Its source now includes main's Amplify definitions, agent guidance, and documentation. The final publication commit uses [skip-cd], so this history update does not deploy the website or backend; the deployed gamma site remains job 1 until a separately reviewed build. See the [rebase journal](journal/2026-10-14-ejinsw-rebase-gamma-onto-main.md) for conflict resolution and verification.

The preserved gamma build specification conditionally runs amplify/scripts/deploy-backend.sh, which is now present from main. A future unskipped gamma build can therefore deploy backend gamma before building the frontend. Review the complete backend plan and CI credentials before triggering it; resource replacements/deletions require fresh engineer verification. Rebasing the branch is not evidence that this future backend pipeline has been tested.
