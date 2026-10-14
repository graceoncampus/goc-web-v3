# Review Amplify publication to main

## Request and production boundary

The engineer requested pushing the Amplify work into Git main. Main's automatic Hosting build uses production backend dev. Read-only checks with profile goc verified account 271755560601 and IAM user ElijahWon, the remote main tip 2b31b1f, automatic main builds enabled, and active production job 177. GitHub username ejinsw was verified in the earlier setup work.

Publishing the proposed local amplify.yml would enable production backend deployment where main currently builds only the frontend. Live production's root stack has no managed admin API/function stacks, and adminUserManagement-dev does not exist. The candidate backend definitions would add these and API invocation permissions if actually deployed. The admin API's authenticated-role policy and server authorization also need review before enabling it in production. No CloudFormation change set, production mutation, or deployment was executed during this review.

## Reviewable publication scope

Prepare a main-based commit containing the 31 selected Amplify files and supporting guidance/documentation. Use a temporary Git index so existing dev checkout and uncommitted work are preserved. Include the gamma conditional legacy resources, scoped function bindings/policies, gamma overrides, branch/environment hooks and scripts, and required admin API/function definitions. Preserve main's existing frontend-only amplify.yml exactly in this safe candidate; the proposed backend-deploying local version remains unpublished. Preserve main's project configuration and sermon dependency manifests rather than copying unrelated differences inherited from Git dev. No frontend source, root package/lockfile, or generated client configuration is included.

The safe candidate publishes infrastructure definitions without applying them to production. Hosting would continue its existing frontend build/pull behavior. This does not activate backend CI/CD on main or gamma; gamma retains its separately published bootstrap until a reviewed merge/deployment. The engineer must choose whether this preserved-pipeline scope satisfies the publication request before the main push.

## Validation and findings

Changed JSON parses successfully. JavaScript and Bash syntax checks passed. Seed-helper Python syntax passed without executing it. Target-selection checks map main to backend dev and all tested non-main branches to gamma, and reject a missing AWS_BRANCH before deployment. Override TypeScript compilation passed. The selection excludes local environment metadata, deployment artifacts, private snapshots, credentials, node_modules, and the cancelled Cognito override.

Prepared 43 files on local branch review/amplify-main-publication with a direct main parent. Byte comparisons prove the safe candidate preserves main's amplify.yml, frontend src tree, root package/lockfile, project configuration, and sermon dependency manifests. Secret-pattern scanning found no access keys or private key blocks in the selected files. git diff --check passed. Further route review confirmed main lacks the gallery/admin pages found in Git dev and includes a recurring-events redirect. Corrected website/onboarding documentation so publishing infrastructure definitions does not imply those frontend pages are available. The earlier SPA HTTP 200 route checks establish fallback hosting only.

Production root/template/function reads are saved privately outside the repository. The only reviewed publication artifact will be a local Git commit/branch; no main push or production build has occurred yet. Record its final commit and reviewed scope once prepared, then any publishing/build outcome after authorization.

## Follow-up

Enabling the proposed backend-deploying build file requires separate production infrastructure and authorization review. Do not trigger that pipeline merely to obtain a plan. Under AGENTS.md, agents cannot perform manual or destructive dev changes or bypass that restriction with automation. Backend schema changes, replacements, resource deletion, IAM changes, and the new admin capability require particular scrutiny. No destructive operation is proposed in the safe publication candidate.
