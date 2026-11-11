# Prepare event image uploads for gamma

## Purpose

Deploy the event upload form to gamma so ATeam can verify the direct S3 upload and the generated public image URL.

## Scope and checks

- GitHub gamma and the feature working tree were both based on c39ca9b. Prepared the upload changes in a separate checkout to preserve the original local work.
- Verified the AWS account, gamma Hosting branch, automatic builds, and gamma CloudFormation stack. The last successful Hosting job was 10 at c39ca9b; the stack was UPDATE_COMPLETE.
- Reviewed the backend diff: new event image bucket, restricted write policy, public image read policy, and authenticated upload route. Existing Lambda updates its runtime and configuration in place. No existing resources are intentionally deleted or replaced. The bucket has retention policies; do not remove its public-read policy or assume a code rollback preserves uploaded image links.
- Six upload tests and 17 pre-push guard tests passed. Some existing Hosting wrapper tests rely on POSIX executable fixtures and could not run correctly in native Windows. The Amplify build verifies the deployed workflow separately.

## Follow-up

Check the gamma Hosting job for this commit, verify gamma stack resources, and open Events with a gamma ATeam account. Upload a disposable photo approved for public viewing and open the generated link without authentication. Verify the event saves and renders. Production is outside this release.
