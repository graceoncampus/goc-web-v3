import { AmplifyProjectInfo, AmplifyUserPoolGroupStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyUserPoolGroupStackTemplate, amplifyProjectInfo: AmplifyProjectInfo) {
  // Cognito preserves an old role when an update omits RoleArn. Bind gamma's
  // copies to the default authenticated role used by these production groups.
  if (amplifyProjectInfo.envName === 'gamma') {
    for (const name of ['Admin', 'ATeam']) {
      const group = Object.values(resources.userPoolGroup || {}).find(group => group.groupName === name);
      if (!group) throw new Error(`Missing gamma group: ${name}`);
      group.addPropertyOverride('RoleArn', { Ref: 'AuthRoleArn' });
      group.addPropertyDeletionOverride('Precedence');
      group.addPropertyDeletionOverride('Description');
    }
  }
}
