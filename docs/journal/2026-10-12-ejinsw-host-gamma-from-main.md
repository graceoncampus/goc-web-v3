# Host gamma from a branch based on main

## Purpose and authorization

The engineer requested a new Git `gamma` branch based on `main` and moving `gamma.graceoncampus.org` to that Hosting branch. This gives development a clear branch name while preserving production availability. This operation changes only gamma Hosting and the new Git branch; production backend `dev`, unused backend `prod`, Git `main`, and root/www Hosting remain read-only.

## Implementation and reasoning

Remote `main` was verified at `2b31b1f89775bc78e4d9fcd1582f93c1b863a947`. Its checked-in `amplify.yml` explicitly pulls production `dev`, so the new branch requires a focused build-configuration commit before building. The commit uses the previously verified gamma bootstrap as its root `amplify.yml`: pull existing gamma configuration, generate GraphQL files, and build the frontend. No backend deployment script is present in this checkout, so the bootstrap skips backend deployment. No frontend page source or ministry workflow changes are needed.

Use a temporary Git index to prepare the commit from main without switching the current `dev` checkout or including existing uncommitted work. Create the new Hosting branch with automatic builds disabled and the existing gamma backend association. Push only `gamma`, run a Hosting build, verify the served backend bindings, then move the existing gamma-only domain association. Preserve the old Git/Hosting `dev` branch for recovery. Enable automatic builds on gamma after verification.

## Verification and environment impact

Preflight verified AWS profile `goc`, account `271755560601`, IAM user `ElijahWon`, region `us-west-2`, no existing remote gamma branch, and automatic branch creation disabled. Private snapshots record app settings, main and dev Hosting settings, both domain associations, and all three backend stack statuses/timestamps. GitHub identifies `ejinsw` as Elijah Won.

Configuration commit `931a0d3488fdced50a1ec1898cf1173812987d0c` is a direct child of the verified main commit and changes only root `amplify.yml` and this journal. Hosting gamma job 1 succeeded in BUILD, DEPLOY, and VERIFY; its logs explicitly confirm backend deployment was skipped. The new branch URL and custom domain both serve `/assets/index-Ci_2WRkf.js` with bundle SHA-256 `ff5e574f7b8633c807d9bb227a405a24c2f8c410e3cf2c5e9360d98382093fe6`. The served bundle contains the gamma API, Cognito pool, and sermons bucket; production API/pool bindings are absent. Events, sermons, login, and admin routes return HTTP 200. These checks verify routing and configuration, not authenticated account/admin behavior.

The gamma-only domain update is AVAILABLE with UPDATE_COMPLETE and maps to Hosting branch `gamma`. Production baseline comparisons before and after cutover passed: app build/IAM configuration, main and old dev Hosting configuration, root/www domain association, all three backend stack statuses/timestamps, and remote main commit were unchanged; production HTTPS returned 200. No table, bucket, Cognito, Lambda, AppSync, or CloudFormation mutation was executed. Any future backend deployment or destructive operation requires its own review under AGENTS.md.

## Recovery and follow-up

The old dev Hosting deployment remains available as a recovery target; changing the domain back would require engineer authorization. Do not remove either branch or existing resources. Automatic builds are enabled only after this verification journal is published, avoiding an unnecessary build for its documentation-only update. The local working checkout stays on Git dev, preserving the engineer's unrelated uncommitted backend and documentation work. Only the focused gamma configuration and this new journal are published to Git gamma; no main merge, production build, or backend-definition publication is included.

Final local confirmation: the documentation-only journal commit `4498029` was pushed while automatic builds were disabled, then gamma automatic builds were enabled. Hosting still reports successful job 1 as its latest deployment. Production baseline comparisons passed again after enabling builds. Architecture, onboarding, feature documentation, and AGENTS.md guidance were updated locally; their existing uncommitted content was not published with the focused gamma branch changes.
