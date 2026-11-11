# Diagnose gamma event image deployment

Amplify job 11 for b16dbe9 failed to create EventImagesBucket because the Hosting role could not set Object Ownership. The function stack rolled back to the previous resources. IAM simulation also showed that the same role cannot read or set the bucket's Block Public Access configuration.

Removed the redundant explicit ownership and encryption settings from the new bucket. S3 defaults still disable ACLs and encrypt objects with SSE-S3. The prefix-scoped public read policy, public ACL blocking, and Lambda-only write policy remain. No live IAM changes, bucket deletion, or production changes were made.

Before retrying, an AWS maintainer should review the missing Block Public Access permissions for gamma event-image bucket names only. Verify the role and effective permissions, then deploy the corrected commit through gamma Hosting and verify the new bucket's ownership, encryption and policy before testing an ATeam upload.
