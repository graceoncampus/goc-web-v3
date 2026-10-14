#!/usr/bin/env node
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');

const branch = process.env.AWS_BRANCH
  || execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim();
if (!branch) throw new Error('Cannot determine the deployment branch');
const target = branch === 'main' ? 'dev' : 'gamma';
const local = JSON.parse(fs.readFileSync('amplify/.config/local-env-info.json', 'utf8'));
if (local.envName !== target) {
  throw new Error(`STOP: ${branch} must deploy to ${target}, not ${local.envName}`);
}
const meta = JSON.parse(fs.readFileSync('amplify/backend/amplify-meta.json', 'utf8'));
const provider = meta.providers?.awscloudformation;
if (!provider?.StackName?.startsWith(`amplify-gocwebv3-${target}-`)) {
  throw new Error(`STOP: provider stack does not match ${target}`);
}
execFileSync(process.execPath, ['amplify/scripts/prepare-environment.js', target], {
  stdio: 'inherit',
});
