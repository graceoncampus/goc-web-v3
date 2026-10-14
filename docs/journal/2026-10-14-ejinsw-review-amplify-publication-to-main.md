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

## Authorized publication outcome

The engineer selected "Publish definitions; keep production pipeline unchanged" after reviewing the prepared scope. Final commit 03c0567d374cd21fac8e86d74f14adc23eb7fd09 contains 43 Amplify/guidance/documentation files and preserves main's frontend-only amplify.yml. A guarded ordinary Git push fast-forwarded remote main from 2b31b1f to that commit; local main was also fast-forwarded while the active dev checkout and uncommitted work remained intact. The proposed local amplify.yml is still unpublished. GitHub reported that the configured account bypassed its pull-request-required rule for this direct push; no branch protection setting was changed.

Main Hosting job 178 automatically started for the published commit. Build completion, served production bindings, and post-build backend stack comparisons are being checked. No backend deployment was requested or manually executed, and no CloudFormation change set was created. This outcome section is a local supplement to the published preparation record; it does not trigger another main build merely to record the build result.

## Incident: unexpected production backend deployment; work stopped

Hosting job 178 logged a backend environment association, pulled dev, and then initiated a production CloudFormation update despite the unchanged amplify.yml lacking an explicit backend phase. The captured log shows UPDATE_IN_PROGRESS for the production AppSync stack, GraphQL schema and API key, CREATE_IN_PROGRESS for an IAM role, and a Lambda update. The assumption that preserving the existing YAML made this publication frontend-only was incorrect. Treat this incident section as superseding the preparation record's frontend-only safety claim.

Immediately notified the engineer and stopped cloud work. No rollback, revert, resource deletion, cancellation, cleanup, or further deployment was attempted. The only remaining action was recording this incident locally; it is not pushed and does not start another build. The engineer must inspect Hosting main job 178 and production stack amplify-gocwebv3-dev-150706 personally. Cancelling a Hosting job alone may not stop CloudFormation already running. Completion, current availability, final resource changes, and recovery are unverified because work stopped at discovery.

Before any later production publication, explicitly inspect and validate Amplify's associated-environment/default backend workflow, not just the repository YAML. Publishing backend files into a production-connected main branch can deploy them through that workflow. Any fix or rollback must follow the AGENTS.md engineer-execution requirement for production; this journal grants no recovery authorization.

## Later read-only status check

The engineer acknowledged the result and requested publication of the agent documentation. Read-only checks then showed Hosting job 178 succeeded in BUILD, DEPLOY, and VERIFY; production root stack amplify-gocwebv3-dev-150706 reports UPDATE_COMPLETE with LastUpdatedTime 2026-10-14T15:48:48.764000+00:00. This establishes deployment completion, not full runtime validation or a complete resource-change audit. No rollback, resource repair, or further application deployment was attempted. The remaining incident/guidance documentation will be published with the documented Amplify [skip-cd] marker to prevent another automatic build.

## Follow-up

Enabling the proposed backend-deploying build file requires separate production infrastructure and authorization review. Do not trigger that pipeline merely to obtain a plan. Under AGENTS.md, agents cannot perform manual or destructive dev changes or bypass that restriction with automation. Backend schema changes, replacements, resource deletion, IAM changes, and the new admin capability require particular scrutiny. No destructive operation is proposed in the safe publication candidate.
