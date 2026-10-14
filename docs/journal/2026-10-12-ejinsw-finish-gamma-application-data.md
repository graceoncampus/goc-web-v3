# Finish non-Cognito gamma migration

## Purpose and authorization

The engineer cancelled Cognito migration and requested completion of the remaining backend data. Keep production dev and unused prod read-only; leave Cognito accounts/schema unchanged. Preserve existing gamma data and stop rather than deleting, replacing, or overwriting resources to repair a migration. GitHub username ejinsw was verified earlier today.

## Actions and reasoning

Removed only the undeployed auth override introduced for the cancelled task and its generated output. Marked its design and journal as cancelled. Automatic approval review blocked that task's proposed Amplify push before execution because schema additions are irreversible and full deployment scope was not proven. No cloud Cognito migration or schema change occurred.

Audit all eight live production AppSync DynamoDB data sources and both application S3 buckets against gamma. Compare fresh private snapshots by keys and contents, validate schemas and destination bindings, and distinguish missing source records from conflicting existing gamma records. Check API/function environment isolation and preserve intentionally disabled gamma email delivery and scheduled imports. No source writes or destructive gamma reconciliation is authorized.

## Verification and impact

Profile goc resolves to account 271755560601, IAM user ElijahWon, region us-west-2. Fresh scans found exact item matches in seven tables. Production RideTable now contains 26 records absent from gamma; gamma retains two older records absent from current production. Both buckets match in inventory, object bytes, metadata, tags, CORS, and encryption. All GraphQL type definitions and 30 root resolvers match, gamma function bindings are isolated, the sermon schedule is disabled, driver email remains suppressed, and gamma branch hosting returns HTTPS 200.

Prepared and executed a private helper scoped to `dynamodb put-item` on `RideTable-gamma` only, using `attribute_not_exists(#pk)` with partition key id. It validates goc account, non-main branch, gamma environment, table ARN and AppSync mapping, absence of streams, and unchanged source/destination snapshots. All 26 missing rows were copied and compared against the saved source records; both existing rows were preserved. Source RideTable was re-scanned and remained unchanged. Gamma now contains 28 rides and 215 total database items; the fresh production snapshot contains 26 rides and 213 items. No overwrite, delete, Cognito operation, or Amplify push was included. Source records and keys are stored only in mode-0600 temporary files outside the repository; progress output contains counts only.

The copy command was `python3 /var/folders/2_/mhljdhjn483fhx4_2htftl640000gn/T/goc-gamma-data-audit-xxldnrlp/copy-missing-rides.py`. Its only cloud mutations were 26 DynamoDB PutItem calls with TableName RideTable-gamma and condition attribute_not_exists(#pk). It wrote a private progress checkpoint after each successful item and verified the final destination equals the union of its original rows and the source snapshot. Retain the private audit directory; rerunning the helper would fail its initial empty-gap/baseline checks rather than overwrite items. No repository script or deployment pipeline was introduced.

An initial audit assertion counted AppSync's NONE data source as a database; the read-only inventory was corrected to filter the eight DynamoDB sources. This did not touch any AWS resource. Amplify status confirms no pending resource changes after removal of the cancelled Cognito override.

Final checks passed: dev, prod, and gamma root stack statuses and update timestamps match the pre-copy baseline; production Hosting remains main/dev with active job 177 and root/www mappings to main; production HTTPS returns 200. Gamma Cognito still contains no accounts or custom attributes. The auth override source and compiled output are absent. `git diff --check` and focused documentation whitespace checks passed. Architecture, onboarding, and the gamma feature/design records were updated locally; no Git commit, push, or frontend build was performed for this task. The non-Cognito application-data copy is complete with the two retained gamma-only rides as its intentional difference.

## Follow-up

Retain independent gamma Cognito settings and existing accounts. Production data copying is a one-time snapshot, not continuing synchronization. Deployment artifacts, historical logs, passwords, external Google Sheets, and unrelated AWS resources are outside the application database/bucket migration. Explain any conflict and prepare a concrete recovery/reconciliation plan before requesting approval for a destructive gamma operation.
