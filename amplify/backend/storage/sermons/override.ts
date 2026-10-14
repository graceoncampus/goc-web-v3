import {
  AmplifyProjectInfo,
  AmplifyS3ResourceTemplate,
} from '@aws-amplify/cli-extensibility-helper';

export function override(
  resources: AmplifyS3ResourceTemplate,
  projectInfo: AmplifyProjectInfo,
) {
  if (projectInfo.envName === 'gamma') {
    // Earlier attempts retained empty buckets during rollback. Preserve them.
    resources.s3Bucket.bucketName = 'gocwebv3-sermons-v2-271755560601-gamma';
  }
}
