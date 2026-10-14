#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const target = process.argv[2];
if (!['dev', 'gamma'].includes(target)) {
  throw new Error('An explicit dev or gamma environment is required');
}
const backend = path.resolve(__dirname, '../backend');
const precedencePath = path.join(backend, 'auth/userPoolGroups/user-pool-group-precedence.json');
const authPath = path.join(backend, 'auth/gocwebv3265a1135/cli-inputs.json');
const auth = JSON.parse(fs.readFileSync(authPath, 'utf8'));

// Admin and ATeam already exist outside CloudFormation in production. Gamma
// manages their independent copies; production continues managing RidesTeam.
const groups = target === 'dev'
  ? [{ groupName: 'RidesTeam', precedence: 1 }]
  : [
      { groupName: 'RidesTeam', precedence: 1 },
      { groupName: 'Admin', precedence: 2 },
      { groupName: 'ATeam', precedence: 3 },
    ];
auth.cognitoConfig.userPoolGroupList = groups.map(group => group.groupName);
fs.writeFileSync(precedencePath, JSON.stringify(groups, null, 2) + '\n');
fs.writeFileSync(authPath, JSON.stringify(auth, null, 2) + '\n');
console.log(`Prepared Cognito definitions for ${target}`);
