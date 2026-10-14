# Migrate remaining Cognito accounts into gamma

## Purpose and authorization

The engineer requested migration of the remaining backend accounts after confirming that the earlier DynamoDB/S3 copy excluded Cognito. Preserve production backend dev and unused prod read-only. Copy human-assigned memberships without changing ministry access decisions. GitHub identity ejinsw was verified in the branch-hosting task earlier today.

## Preflight findings and approach

AWS profile goc identifies IAM user ElijahWon in account 271755560601, region us-west-2. A private, read-only directory snapshot found 38 enabled production accounts: 33 confirmed with verified email and five unconfirmed with unverified email. Gamma has no accounts. Source and destination groups match; source memberships total 22 (Admin 5, ATeam 6, RidesTeam 11). Neither pool has MFA users or Lambda triggers. Gamma lacks source custom fields address and grad_year.

Prepared `amplify/backend/auth/gocwebv3265a1135/override.ts` to declare the two fields only in gamma. The [design](../features/gamma-cognito-migration.md) records the account-copy procedure, privacy rules, new subject IDs, password-reset requirement, and pending-account status limitation. The helper must suppress invitation delivery, reject collisions, preserve verification flags, and stop on a cloud mutation failure. No production authentication or password operation is allowed.

The old isolated SDK directory lacked a complete boto3 installation; its inventory attempt failed before any AWS call. The replacement helper uses the installed AWS CLI and completed the read-only snapshot. Missing local parameters/override file reads also required no AWS write. Source/destination profile records remain outside the repository and are not included here.

## Verification and environment impact

The override compiled successfully and a focused check proved it did nothing for dev/prod. Amplify status showed only auth as an update. A deployed-template comparison found the planned schema additions and a generated description difference. Automatic approval review then rejected the proposed Amplify push because the schema additions are irreversible and the guards did not prove the full deployment excluded other uncommitted work. The push was not executed; no account or schema mutation occurred.

The engineer subsequently cancelled Cognito migration and requested completion of the other backend data. Removed the undeployed auth override and its generated output; retained this journal, the abandoned design, and private read-only snapshots for an accurate record. Gamma's unchanged stack timestamp, empty account directory, and absent custom attributes were checked after cancellation. No Git push or frontend deployment was performed for this migration. It is cancelled, not pending or completed.

## Recovery and follow-up

No accounts or passwords were created, and no migration cleanup in AWS is needed. Retain the private read-only snapshots. Any future Cognito migration requires a new engineer request and reviewed deployment scope. Any destructive gamma operation needs fresh engineer verification under AGENTS.md. The original account-copy proposal is documented above only as history.
