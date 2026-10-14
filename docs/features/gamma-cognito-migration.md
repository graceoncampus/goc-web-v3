# Gamma Cognito account migration

## Status: cancelled on October 12, 2026

The engineer explicitly chose to skip Cognito migration and finish only the other backend data. No account or schema write was executed. Automatic approval review rejected the proposed Amplify push because the schema additions are irreversible and the full deployment scope was not proven. The undeployed gamma auth override and its generated output were removed. The design below records the abandoned proposal, not active configuration or permission to run it. Gamma accounts and its existing schema remain independent.

## Purpose and ministry boundaries

Copy the existing production account directory into gamma so engineers can verify member and admin workflows against representative profiles and existing, human-assigned groups. The engineer requested migration of the remaining accounts. Copy memberships as they are; do not decide who should receive ministry or admin access. No frontend page, ministry content, rides assignment, or notification automation is added.

## Infrastructure and account behavior

Profile `goc`, account `271755560601`, region `us-west-2`: source production pool `us-west-2_rZ4wDVksQ` is read-only; destination gamma pool `us-west-2_ppQ8GSVxo` is the only write target. Preserve independent gamma IAM roles and existing groups. Add the source's mutable custom `address` (String) and `grad_year` (Number) attributes through a gamma-only Amplify auth override. Reject deployment replacements or unrelated resource changes before execution.

The source snapshot has 38 enabled accounts: 33 CONFIRMED with verified email and five UNCONFIRMED with unverified email. There are 22 memberships across Admin, ATeam, and RidesTeam; unconfirmed accounts have no memberships. Gamma is empty, with no MFA or Lambda triggers. Preserve usernames, all writable profile attributes, verification flags, and memberships. New Cognito subject IDs and creation timestamps are unavoidable; retain a private mapping for verification.

Use AdminCreateUser with MessageAction SUPPRESS and no alias reassignment. For confirmed source accounts, initialize new gamma-only credentials with a unique random permanent password that is discarded, allowing the user to choose a separate gamma password through the existing reset page. Do not authenticate against production, reset production credentials, send invitations, or invoke password-reset delivery. Pending source accounts retain unverified email and stay in FORCE_CHANGE_PASSWORD in gamma; administrative creation cannot reproduce UNCONFIRMED status exactly, and they need separate gamma setup before use. Existing destination accounts must never be overwritten, reset, deleted, enabled, disabled, or silently merged.

Passwords, password hashes, sessions, remembered devices, and Cognito identity IDs are not exported. [AWS account migration guidance](https://docs.aws.amazon.com/solutions/latest/cognito-user-profiles-export-reference-architecture/guidance-components.html) documents new subject IDs and password/device limitations. [AdminCreateUser](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminCreateUser.html) supports suppressing invitation messages; [AdminSetUserPassword](https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminSetUserPassword.html) initializes confirmed gamma credentials. This is a one-time snapshot, not continuous synchronization.

## Validation, privacy, and recovery

Before any write, validate identity, Git branch, local Amplify environment, both pool bindings, schemas, empty destination, account states, source group membership, and absence of triggers/MFA. Save profiles and verification mappings only in mode-0600 temporary files outside the repository. Print aggregate counts and opaque operation identifiers, never member details or passwords. Log full failures privately and exit unsuccessfully on the first failed cloud mutation; retain partial results without cleanup, deletion, or overwriting. A resume needs separate review of the saved checkpoint.

Validate the override's gamma behavior and no-op production behavior, review the Amplify plan, and reject destructive changes. After copying, compare every profile and membership to the source snapshot, verify expected status and generated ID uniqueness, and re-read the production directory to confirm it was unchanged. Verify existing app/group roles and disabled gamma schedules remain intact. No real-user sign-in or password reset is tested because that would require credentials or send messages. Final counts and any exceptions belong in the deployment journal.
