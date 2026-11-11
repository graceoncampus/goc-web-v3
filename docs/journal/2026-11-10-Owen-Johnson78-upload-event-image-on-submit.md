# Upload event images on submit

The team lead requested that selecting a file never upload it. Regular and recurring event forms and the shared edit form now keep selected files locally and upload directly to S3 only on create or save. Manual URLs still work. Upload failures stop the event save. If the event save fails after the upload, a retry reuses the returned URL.

The signing endpoint, S3 configuration, and event schema did not change. The change is prepared in the gamma checkout; no IAM policy or cloud resource was changed. The existing gamma IAM review and deployment are still required to test real uploads.

Verification: compiled the changed frontend files, rebuilt the offline preview, and exercised selection and cancellation without a network request, a manual URL, upload failure and retry, and URL reuse after success with mocked storage. The isolated checkout could not install all frontend packages from the offline cache, so a full Vite build remains for Hosting.
