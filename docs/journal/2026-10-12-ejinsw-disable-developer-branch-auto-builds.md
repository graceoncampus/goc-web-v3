# Disable automatic builds for developer branches

## Purpose and authorization

The engineer requested automatic CI/CD only for gamma development integration, with developers still able to build/deploy their own branches manually. Preserve existing main production behavior. The clarification explicitly rejects branch restrictions on manual deployment; this task changes Hosting triggers only, not branch-to-backend mapping or build scripts. GitHub username ejinsw was verified earlier today.

## Scope and reasoning

Read-only preflight identified six connected branches in Amplify app d1afaiv4wnjkx7, profile goc, account 271755560601, us-west-2. All six have automatic builds enabled. Developer branches build, dev, feature/events, and feature/recurring-events reference backend gamma. Git gamma also uses gamma; Git main uses production backend dev. Automatic branch creation is already disabled.

Disable enableAutoBuild only on those four developer Hosting branches using `aws amplify update-branch --app-id d1afaiv4wnjkx7 --branch-name <branch> --no-enable-auto-build --profile goc --region us-west-2`. Preserve main and gamma settings, backend associations, build specifications, domains, and existing deployments. A developer can request a manual build through Amplify Hosting or start-job; this task triggers no build or backend deployment. New developer branches must be connected with automatic builds disabled as documented in AGENTS.md and onboarding.

## Verification and impact

Private baseline snapshots cover branch settings, shared app configuration, both domain associations, and production/unused backend stack timestamps. All four update-branch calls succeeded. Read-back confirms automatic builds are false on build, dev, feature/events, and feature/recurring-events, and remain true on gamma and main. All other branch properties and job IDs match their baseline apart from expected update timestamps. Shared app build/IAM/default settings, both domain associations, and dev/prod backend stack statuses/timestamps are unchanged. Pull-request previews are already disabled on all six branches, so no preview configuration change was needed.

No frontend, ministry workflow, infrastructure definition, amplify.yml, deployment script, or hook was changed. No build was triggered, cancelled, or deployed. Updated AGENTS.md, architecture, onboarding, and the gamma feature record with the agreed automatic/manual trigger policy. Existing uncommitted work remains preserved; no Git commit or push was performed. `git diff --check` passed. The Hosting trigger update is complete.

## Recovery and follow-up

The trigger changes are reversible by enabling automatic builds on a specific developer branch if separately authorized. Do not change shared app defaults, enable automatic branch creation, alter production main, or delete branch deployments. Manual deployments continue to require verifying gamma targets and obtaining explicit engineer verification for every destructive gamma operation.
