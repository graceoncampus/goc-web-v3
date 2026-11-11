# Event image upload

## Purpose and ministry responsibilities

Help ATeam publish accurate event information by uploading an event image within the event form. ATeam still chooses the photo, checks permission to publish it, writes event details, and decides when to save or publish. This automates file transfer only; it does not replace ministry judgment or select photos.

## Design

Add an Upload image control above the editable Image URL field in regular-event creation, recurring-event creation, and the shared edit dialog. Accept JPEG, PNG, WebP, and GIF, up to 10 MiB. Upload immediately after selection; fill the URL only after S3 acknowledges success. Keep the old URL on failure. Disable saving while uploading and ignore late results after a form is closed. Show upload progress/status and actionable errors.

The browser requests a five-minute presigned POST from the IAM-authenticated adminUserManagement API at POST /event-image-upload. The Lambda checks live ATeam membership using the environment's Cognito pool. Existing user/group administration routes still require Admin. Lambda signs a unique public/event-images/<uuid>.<extension> key with an exact content type and a 1-byte–10-MiB policy range. Image bytes travel directly from the browser to S3; AWS credentials are never embedded in frontend source.

Use a dedicated bucket owned by the existing adminUserManagement function stack, isolated by CloudFormation stack/environment. This avoids granting writes to the manually managed 2026–2027 bucket, changing sermon storage, or accidentally sending gamma uploads to production. Existing image links continue to work; this feature does not migrate them. The bucket permits anonymous reads only under public/event-images/, uses SSE-S3, disables ACLs, requires HTTPS, and retains images if the stack is removed or replaced. Only the Lambda role receives PutObject on that prefix. Browser CORS permits the site origins and local development. Account-level public-access restrictions must permit the reviewed bucket policy before deployment.

## Operational behavior

No database/schema change is required: existing imageLink fields store the permanent HTTPS object URL. Uploaded photos are public and may exist before the event is saved. Cancelling, replacing, or deleting an event does not delete images; orphan cleanup and retention decisions remain manual. Metadata/type restrictions are not malware scanning or server-side image decoding. No SVG/HTML uploads are offered. The signing API is an extension of an existing Lambda/API to reuse its live group authorization; administration routes retain their current authorization.

## Validation and release

The function template moves from Node 18 to Node 22, matching the site's Node 22 toolchain and supporting the explicitly bundled AWS SDK dependencies. Review this runtime update together with both admin and upload workflows on gamma. The frontend adds no dependencies.

Run focused local authorization/upload-policy tests, TypeScript checks, and a Vite build. Verify success, size/type rejection, upload failure, URL editing, and cancellation locally with mocked AWS responses. After reviewed gamma backend deployment and an Amplify pull targeting gamma, verify actual ATeam upload, anonymous image rendering, rejected non-ATeam access, create/edit/save, and gamma bucket isolation. Generated aws-exports.js must target gamma before live testing. A frontend-only deployment cannot enable the new endpoint/bucket. Do not deploy, push, or modify production as part of implementation. New backend resources and public-read policy need review through the existing branch/environment pipeline.
