# Engineer onboarding

Read [AGENTS.md](../AGENTS.md) first. `dev` is production; all local development must initially target `gamma`. These steps are performed by the engineer and existing maintainers, not by an agent granting access or modifying production.

## 1. Get GitHub access

Ask a maintainer to add your GitHub account to the GOC organization/repository with the appropriate web-team access. Confirm you can access `graceoncampus/goc-web-v3`, then clone it and create a non-main branch:

```sh
git clone https://github.com/graceoncampus/goc-web-v3.git
cd goc-web-v3
git switch -c onboarding/<your-github-username>
```

Set your Git author identity and record your GitHub username for journal filenames. `git config user.name` is a display name and may not be your GitHub username.

## 2. Get an IAM console login

Ask the AWS administrator to create your IAM user and provide the AWS account sign-in URL and approved permissions. Sign into the console and complete the team's password/MFA requirements. Confirm the correct account and region with a maintainer. Do not use the root account or another engineer's credentials.

## 3. Prepare local tools

Use Node.js `22.9.0` from `.nvmrc` and Yarn Classic `1.22.22` from `package.json`. Install the team's approved AWS CLI and **Amplify Gen 1 CLI** versions; the CLI version is not currently pinned in this repository, so obtain it from a maintainer before installation.

```sh
nvm install
nvm use
yarn install --frozen-lockfile
aws --version
amplify --version
```

Do not run `amplify init` or create a new backend; this project uses existing environments.

## 4. Configure `AWS_PROFILE=goc`

Create a named local AWS profile `goc` using the team's approved credentials obtained through your IAM access. A console password is not a CLI credential, and a session token alone is not a complete temporary credential set. Confirm the team's credential acquisition method with the AWS administrator.

For an administrator-approved access-key setup, configure it interactively:

```sh
aws configure --profile goc
export AWS_PROFILE=goc
aws sts get-caller-identity --profile goc
```

Enter your access key ID, secret access key, and team-confirmed region locally. Temporary credentials also require their associated session token, stored locally under the same profile, and must be renewed when expired. Do not paste credentials into chat, commit them, or include them in journal entries. Keep profile credentials outside the repository.

Confirm that the returned account and identity match the team's expectations before continuing. See AWS's [credential configuration guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) for supported profile and temporary credential formats.

## 5. Connect Amplify to `gamma`

The verified Amplify app ID is `d1afaiv4wnjkx7`, in `us-west-2`, account `271755560601`. Confirm your IAM identity matches this account. With a clean checkout on your non-main branch:

```sh
export AWS_PROFILE=goc
amplify pull --appId d1afaiv4wnjkx7 --envName gamma
amplify env list
amplify status
git status --short
```

Select AWS profile `goc` if prompted. Confirm that `gamma` is active and inspect any generated changes. Pull retrieves backend configuration and can change local files; preserve existing work first. Do not use restore/force options to overwrite local work. The [Amplify Gen 1 command reference](https://docs.amplify.aws/gen1/javascript/tools/cli/commands/) documents the pull workflow.

Generate client types/operations if needed, then start the frontend:

```sh
amplify codegen --maxDepth 4
yarn start
```

Vite serves the site at `http://localhost:3000`. Confirm generated client configuration targets `gamma`; do not assume the local frontend is isolated from AWS. Forms, email actions, and admin operations can affect real resources. Onboarding does not require `amplify push`, deployment, seeding, or deleting resources.

## 6. Create your website account and obtain `Admin` access

Create and verify an account in the gamma-connected website. IAM console access and website/Cognito accounts are separate identities.

Have an authorized maintainer grant your account membership in the case-sensitive **`Admin`** group through the correct environment's Cognito user pool. The `/admin` dashboard exists in Git dev but is not included in main or the gamma frontend built from main; do not assume the gamma hostname provides that dashboard. Once a reviewed frontend deployment includes it, an existing administrator can use it for supported group management. If your IAM permissions authorize it, you may perform the gamma Cognito step yourself with maintainer guidance. A new website account cannot grant itself admin access through the dashboard.

Sign out and back in to refresh group claims, then verify Admin membership using available gamma tools. Verify `/admin` only after the dashboard is included in that frontend deployment. Production membership is separate; any manual production grant must be performed personally by an authorized engineer, never an agent.

## Completion and remaining setup details

You should have repository access, your own IAM login, an authenticated `goc` profile, a non-main branch, Amplify and frontend configuration targeting `gamma`, and a verified website account in `Admin`.

Gamma is available at [gamma.graceoncampus.org](https://gamma.graceoncampus.org/), with its backend and served client resource bindings verified on October 9, 2026. Production table/S3 data was copied once; Cognito accounts and group memberships remain independent. Gamma's sermon schedule and driver emails are disabled for testing. See the [deployment journal](journal/2026-10-09-ejinsw-create-isolated-gamma-backend.md) for operational details and retained artifacts.

Since October 12, the shared development website is hosted from Git `gamma`, created from `main` with a focused gamma build configuration. Its backend remains the existing `gamma` environment. Git `main` retains production backend `dev`. Other non-main branches share gamma, but their checked-in build configuration must also target it: main's existing build file explicitly pulls production dev, and merely changing a Hosting backend association does not override a repository build file. The [branch migration journal](journal/2026-10-12-ejinsw-host-gamma-from-main.md) records the verified deployment and domain cutover.

Pushes to ordinary developer branches do not automatically build/deploy the site. Automatic Hosting builds are reserved for `main` and `gamma`; automatic branch creation is disabled. If a maintainer connects your developer branch to Hosting, request backend gamma and automatic builds off. You may then request a manual build after reviewing its gamma bindings and configuration. This does not grant permission to deploy production or execute destructive gamma changes. See [automatic/manual build guidance](architecture.md#automatic-and-manual-hosting-builds).

Application data was refreshed on October 12: all current production database records are represented in gamma, with its two older ride records preserved. Both application buckets match production. The engineer chose to skip Cognito migration, so gamma still requires independently created website accounts and group assignments; the proposed profile-schema migration was not deployed. See the [application-data refresh journal](journal/2026-10-12-ejinsw-finish-gamma-application-data.md). This is a snapshot copy, not ongoing synchronization.

The gamma setup used Amplify CLI `13.0.0`; obtain maintainer agreement before changing the team's CLI version. Maintainers still need to document credential acquisition/renewal, the engineer IAM policy, and any additional local environment variables. Do not guess these or copy secrets into the guide. Keep this guide updated whenever onboarding changes.
