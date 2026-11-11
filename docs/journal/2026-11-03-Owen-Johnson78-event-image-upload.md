# Event image uploads from event forms

## Purpose

Implement the engineer's requested Upload image control above the existing editable Image URL field. Support event publishing work while leaving image choice, publication permission, content, and event saving with ATeam.

## Changes and reasoning

- Added shared `EventImageField` to regular-event creation, recurring-event creation, and the shared edit dialog. Successful uploads populate imageLink; manual entry remains available. Status/error messages, 10-MiB/type validation, upload/save locking, and stale-result/cancellation handling are included.
- Extended the IAM-authenticated adminUserManagement API with POST /event-image-upload. Its Lambda performs live ATeam authorization using the existing environment pool lookup. All existing user/group routes retain live Admin authorization. Added malformed JSON handling and generic client-facing unexpected errors with full diagnostic logging.
- Added an environment-isolated S3 bucket in the existing function template, anonymous read only for public/event-images/, Lambda PutObject only for that prefix, SSE-S3, HTTPS enforcement, CORS, and retention on deletion/replacement. The signer uses UUID keys and a five-minute POST policy restricting content type and byte length. Photo bytes go directly to S3, not through Lambda.
- Kept existing manual photo links and the manually created 2026–2027 bucket untouched. New uploads use the managed per-environment bucket to isolate gamma. No database/schema changes. Uploaded images can remain orphaned after cancelling or replacing an event; cleanup is deliberately manual.
- Added explicit AWS SDK dependencies and Lambda Node 22 runtime preparation. Frontend dependencies are unchanged. Updated feature, page, architecture, and admin API documentation.

## Verification

- `node --test amplify/backend/function/adminUserManagement/event-image-upload.test.cjs`: all six tests passed, covering authorization, wrong-pool/guest/revoked-group denial, preservation of admin boundaries, invalid bodies, upload limits, signing policy, storage policy, and actual installed-SDK offline signing with dummy credentials.
- `node node_modules/typescript/bin/tsc --noEmit`: passed.
- `yarn build`: passed; Vite reports its existing large-chunk advisory.
- Local Vite harness using the actual shared component and mock signing/storage: successful multipart upload fills the URL; save and URL controls disable during upload; manual URL editing works; simulated HTTP 500 preserves that URL and restores saving; closing/reopening during upload prevents a stale URL update. No AWS requests were used by this harness.
- Screenshot saved outside the repository as the chat's output preview. The harness and dummy image stay outside the repository.

## Environment impact and follow-up

Local branch: feature/gamma-update. No commit, push, merge, cloud mutation, AWS upload, or deployment was performed. The local generated aws-exports.js still references production dev; it was not edited or used for live testing. Git gamma and backend gamma are separate bindings.

Review backend changes and deploy through the gamma pipeline before live testing. Pull gamma-generated configuration only after preserving the reviewed source changes; confirm Cognito/API/bucket bindings target gamma. Validate real ATeam upload, public image rendering, regular/recurring create/edit/save, revoked/non-ATeam denial, and admin regression behavior. Check public-access policy compatibility and intended browser CORS origins. Production release requires its own reviewed main workflow; agents must not make manual production changes. No approval to publish or deploy was inferred from the implementation request.
