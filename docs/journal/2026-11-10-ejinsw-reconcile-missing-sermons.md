# Reconcile missing sermons

The date cutoff skipped recordings uploaded after newer sermons. The importer now compares normalized audio URLs across the complete table and feed, and can report candidates without writing. Existing sermon metadata remains untouched. Updated the importer and architecture documentation; no frontend or infrastructure changes are required.

A read-only dry run against production found seven missing recordings: September 25, October 2, and five from April–May 2026. Against gamma it found those seven and October 9. These results depend on the current feed. Node syntax validation passed. Gamma scheduling remains disabled, so deployment alone does not populate its table; a deliberate invocation is needed. Production was read only. Review deployment status before releasing elsewhere.

A subsequent gamma deployment attempt was stopped before pushing: remote gamma advanced to b16dbe9 with event image upload infrastructure, and its Hosting job 11 failed because the Hosting role lacks s3:PutBucketOwnershipControls. CloudFormation reported UPDATE_ROLLBACK_COMPLETE. Retrying a gamma push would also retry that unrelated deployment. The sermon commit remains local; no gamma import was run. Resolve the separate gamma deployment failure before integrating and deploying this change.

Rebased the sermon commit onto remote gamma b16dbe9 without conflicts, preserving the event upload changes. Git whitespace checks and Node syntax validation passed. Gamma Hosting job 11 remains failed; the rebased commit is local and has not triggered another deployment.

Fetched the latest gamma and rebased the local sermon commit onto 63885bf without conflicts. Hosting job 12 failed its stack-state preflight; the gamma stack remains UPDATE_ROLLBACK_COMPLETE from job 11. No deployment or data changes were made. Git diff whitespace validation passed. The sermon commit remains local until the gamma deployment issue is resolved.

Gamma Hosting job 13 succeeded after the rollback preflight fix; the root stack reached UPDATE_COMPLETE. Rebased onto 0b2f335, reran syntax and whitespace checks, and repeated the gamma dry run: eight missing feed recordings, with no writes. The scheduled importer remains disabled in gamma.

On November 11, the deployed gamma importer was invoked against the verified gamma table and added eight recordings. A second dry run found zero remaining; the public gamma list returned all eight with no further page token. Gamma Hosting job 14 succeeded and the gamma stack was UPDATE_COMPLETE. Production's schedule remains enabled. The production release candidate contains only the importer and its documentation, based on the exact commit used by successful main Hosting job 180; the separate event-image and admin changes are excluded.
