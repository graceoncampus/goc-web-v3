# Create isolated gamma backend

- Engineer: `ejinsw`, verified from the public GitHub API (`login=ejinsw`, `name=Elijah Won`) on October 9, 2026.
- Purpose: provide a development copy while `dev` remains production and read-only; preserve the website's ministry service and human control over rides.
- Authorization: create gamma and update the repository. The engineer subsequently allowed gamma deployment retries while prohibiting changes that could break dev. Destructive manual repairs remain excluded.

## Changes and reasoning

Recovered the live AppSync resolver and table definitions into the shared Amplify Gen 1 backend. Legacy resources are conditional gamma additions. Prepared separate Cognito groups, scoped user-admin pool permissions, scoped sermon imports, and disabled gamma schedules/driver emails. Added branch guards, Hosting scripts, and a one-time verified DynamoDB/S3 copy script. No frontend page or ministry content changes were needed.

Gamma bootstrap creation succeeded earlier. Full deployment failed twice because S3's API field names differ from CloudFormation: encryption requires `ServerSideEncryptionByDefault`, and CORS requires `ExposedHeaders`. Corrected both. AWS automatically rolled back new gamma resources and retained empty sermons buckets. Preserved those buckets; subsequent creation uses a distinct gamma bucket name. No manual deletions or production writes were issued.

The repository changes include `CustomResources.json`, function templates and code, Cognito definitions/overrides, the sermons storage override, `amplify.yml`, hooks, scripts, and infrastructure documentation. Generated Amplify dependency/type files accompany the resource definitions. Preserve unrelated engineer changes, including the newly supplied guidance and onboarding documents.

## Verification and operational status

CloudFormation syntax validation passed. Custom-resource properties passed checks against live AWS resource-type schemas. Override TypeScript compilation passed. Branch mapping returned `dev` for main and `gamma` for another branch; the pre-push guard correctly rejected main with local gamma. Deployment plans listed creates only in gamma.

Gamma deployment succeeded. Amplify status reports no pending changes. All 189 DynamoDB items across eight tables were copied and compared against the saved snapshot. S3 sync skipped the six zero-byte folder markers; an explicit resume mode verified the existing tables without rewriting them, copied the missing objects with CopyObject, and verified inventories and bytes. Both bucket CORS/encryption configurations match their sources. Six application list queries succeeded through gamma AppSync.

The initial group override omitted RoleArn, but Cognito kept the existing generated assignments during update. A subsequent in-place update explicitly binds gamma Admin/ATeam to gamma's authenticated role, preserving source effective permissions without group recreation. Their precedence is unset; RidesTeam retains precedence 1 and its independent role. No data resources were replaced. IAM policy simulation allows gamma sermon/user-admin writes while denying the corresponding production targets. Ride API environment bindings and the disabled sermon schedule were verified.

All four existing non-main Hosting branches now reference gamma. Their branch-specific build specification skips backend deployment on old checkouts and enables the repository deployment script once committed. Main and app-global configuration are unchanged. Hosting job 3 stalled on interactive Admin UI authentication; it was cancelled without deployment. Explicit headless provider configuration uses Hosting's IAM role. A shell simulation confirmed all headless flags reach one command. Job 4 failed because the selected Node environment lacked Yarn; the attempted cancellation correctly refused because the job had already failed. Job 5 was cancelled before deployment. Yarn 1.22.22 is now installed explicitly after Node selection, and job 6 is running. Its backend phase must continue to skip old definitions. Local frontend build passed and its bundle references gamma API, Cognito, and S3 rather than production.

Jobs 6 and 7 reached the headless pull but Amplify's general credential mode reported the app missing. Explicit AWS CLI account and GetApp checks passed in the same build, and IAM simulation confirmed the existing Hosting role allows Amplify reads. Its policy was left unchanged. Job 8 uses an explicit private `gamma-ci` credential profile inside the ephemeral container, populated from its existing temporary role credentials through AWS CLI credential export or the AWS SDK provider chain. Credentials are not printed, sent to the browser, or committed; profile files have mode 0600. This changes no local engineer AWS profile or IAM permissions. The YAML-rendered shell and Node scripts passed syntax checks.

A separate `gamma.graceoncampus.org` domain association and certificate were created successfully; Amplify added only gamma hostname and certificate-validation records. The domain association is AVAILABLE. The existing root/www association remains AVAILABLE with the same main mappings.

Hosting job 8 succeeded in BUILD, DEPLOY, and VERIFY. The temporary profile resolved the pull failure, and both operations and TypeScript client files were generated successfully. `https://gamma.graceoncampus.org/` returns HTTPS 200. The JavaScript actually served there contains the gamma API endpoint, user pool, and sermons bucket; production API/pool identifiers are absent. `/events`, `/sermons`, `/login`, and `/admin` return the SPA shell with status 200. These route checks establish hosting/routing, not authenticated admin behavior; gamma accounts and group grants are separate setup steps. No frontend source changes were made or published from the local working tree; Hosting built the remote dev branch.

The setup is complete. Repository definitions, guard scripts, and pipeline files remain uncommitted for engineer review. Existing non-main branches use the guarded bootstrap until the new deployment script is committed. Publishing/merging those files or triggering main was not performed.

Dev's root stack last-update timestamp remains `2026-10-07T03:56:30.983000+00:00`; the unused prod root remains CREATE_COMPLETE. No writes were issued to either backend. The initial domain-creation automatic approval review timed out before execution; a permitted single retry succeeded. No outstanding approval rejection remains.

The final audit also compared the shared app build specification and IAM service role with the initial private snapshot; both match. Main still uses dev, its branch build override remains unset, and its active job ID is unchanged from the initial snapshot. Production root/www mappings are unchanged, and the production root URL returns HTTPS 200. `git diff --check` passed.

## Recovery and follow-up

Preserve retained buckets and private source snapshots under `/private/tmp`. No rollback cleanup is authorized through this journal. Destructive gamma changes require a separate explanation and engineer verification under AGENTS.md. Cognito passwords cannot be cloned; new gamma website accounts must be created independently. All non-main branches share gamma, so future deployments must be coordinated.
