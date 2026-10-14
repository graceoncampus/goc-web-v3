# Independent gamma backend

## Purpose and agreement

Provide a development environment for verifying ministry website changes without affecting members using production, which is currently named `dev`. The engineer authorized creating gamma and updating this repository, while keeping dev/prod resources read-only. Later authorization allows retrying gamma deployment failures; operations that could affect production must not proceed. No separate repository clone is required.

## Behavior and implementation

The repository's Amplify Gen 1 definitions are authoritative. `main` maps to dev for reviewed ordinary releases; every other branch maps to shared gamma. The pre-push hook rejects a branch/environment mismatch. Hosting's backend script requires an explicit `AWS_BRANCH` and supplies the selected environment to `amplifyPush`. Preparing these files does not authorize publishing them or triggering production deployment.

Automatic Hosting builds are limited to Git `main` and `gamma`. Existing developer branches have automatic builds disabled, but may still build/deploy manually against gamma. Automatic branch creation is disabled; new developer branches must also be connected with automatic builds off. Trigger settings live in Hosting and do not require changing `amplify.yml` or forbidding non-main branches in deployment scripts. [Operational record](../journal/2026-10-12-ejinsw-disable-developer-branch-auto-builds.md).

Gamma provisions separate AppSync, DynamoDB, Cognito, API Gateway, Lambda, IAM, and S3 resources. The recovered live GraphQL resolvers preserve existing query and mutation behavior. Legacy DynamoDB tables and the assets bucket are conditional gamma resources. The recurring-event table remains managed through its existing template. Resource names differ where AWS requires uniqueness; logical resource names remain shared in the repository.

Gamma's sermon importer targets its own table, and its recurring schedule is disabled. Its rides integration reads manually prepared Sheets but suppresses outgoing driver emails. Admin user management receives the gamma pool ID with an IAM policy scoped to that pool. Groups are independent; no production memberships or passwords are migrated by the data-copy script. Admin and ATeam explicitly use gamma's default authenticated role because removing the old role property did not clear the live Cognito assignment. This preserves effective source permissions without group recreation.

There are no frontend page changes. Generated local client configuration points to gamma. Existing non-main Hosting branches now reference gamma; the remote `dev` branch is deployed at `https://gamma.graceoncampus.org/`. Its served client configuration and HTTPS routing were verified after successful Hosting job 8. Existing production Hosting configuration and domain mappings remain intact. Backend/pipeline repository changes are still uncommitted for review.

On October 12 Git `gamma` was created from `main` with a focused root build configuration that pulls the existing gamma backend without deploying backend changes. Hosting job 1 succeeded, and `gamma.graceoncampus.org` now targets Git `gamma`; the exact served bundle and gamma resource bindings were verified. The old Git/Hosting `dev` branch is retained. See the [branch migration journal](../journal/2026-10-12-ejinsw-host-gamma-from-main.md) for the final result.

## Data and verification

The one-time copy includes eight DynamoDB tables and both application S3 buckets, excluding deployment artifacts and unrelated buckets. Destination checks establish account, environment, independent API/table names, matching keys, and empty targets before writes. Source scans are consistent per request; there is no cross-table transaction or production write freeze, so this is a snapshot copy rather than ongoing synchronization. Every destination is compared with its source snapshot; S3 bytes are also compared.

An October 12 refresh verified exact matches in seven tables and both buckets, including S3 object bytes, metadata, tags, CORS, and encryption. Production had 26 current rides absent from gamma; conditional PutItem calls added them to RideTable-gamma without overwriting its two older records. Gamma now has 215 items versus 213 in the current source snapshot; every source item is represented, and the two gamma-only rides were intentionally preserved. No deletion or overwrite was needed. Cognito migration was explicitly cancelled; its undeployed override was removed, and no users or schema changes were applied. The [refresh journal](../journal/2026-10-12-ejinsw-finish-gamma-application-data.md) records the verification. The initial seed script's saved-snapshot resume mode will correctly reject the refreshed RideTable because it no longer equals the October 9 snapshot.

On October 14 Git gamma was rebased onto main 06af751 with its build specification preserved and deployment suppressed using [skip-cd]. Main's recovered backend definitions and helper scripts are now in gamma's source. Because deploy-backend.sh is present, an unskipped gamma build can execute a backend deployment; this rebase performs no cloud deployment and does not validate that future pipeline. Review its plan before a manual build or subsequent push without the skip marker. [Rebase record](../journal/2026-10-14-ejinsw-rebase-gamma-onto-main.md).

Validate template syntax, TypeScript overrides, branch guards, deployed target bindings, schedules, and email suppression. Verify actual copy counts and frontend builds. Keep source resources read-only. Retain artifacts from failures instead of deleting resources to repair deployment. Record the final operational state and any pending steps in the deployment journal.
