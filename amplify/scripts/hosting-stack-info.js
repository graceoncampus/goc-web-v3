#!/usr/bin/env node
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');

const target = process.argv[2];
const branch = process.env.AWS_BRANCH;
const app = process.env.AWS_APP_ID;
const expected = branch === 'main' ? 'dev' : 'gamma';
if (!branch || target !== expected || app !== 'd1afaiv4wnjkx7') {
  throw new Error('STOP: unexpected Hosting app, branch, or backend environment');
}
const aws = (...args) => JSON.parse(execFileSync('aws', [
  ...args, '--region', 'us-west-2', '--output', 'json',
], { encoding: 'utf8', env: { ...process.env, AWS_PAGER: '' } }));
const identity = aws('sts', 'get-caller-identity');
if (identity.Account !== '271755560601') throw new Error('STOP: unexpected AWS account');
const binding = aws('amplify', 'get-branch', '--app-id', app, '--branch-name', branch).branch;
if (binding.backendEnvironmentArn !== `arn:aws:amplify:us-west-2:271755560601:apps/${app}/backendenvironments/${target}`) {
  throw new Error('STOP: Hosting branch backend association does not match the selected environment');
}
const backend = aws('amplify', 'get-backend-environment', '--app-id', app, '--environment-name', target).backendEnvironment;
const stackName = target === 'dev' ? 'amplify-gocwebv3-dev-150706' : 'amplify-gocwebv3-gamma-a0479';
if (backend.environmentName !== target || backend.stackName !== stackName) {
  throw new Error('STOP: Amplify backend references an unexpected stack');
}
const stack = aws('cloudformation', 'describe-stacks', '--stack-name', stackName).Stacks[0];
if (stack.StackName !== stackName || !stack.StackId.startsWith(`arn:aws:cloudformation:us-west-2:271755560601:stack/${stackName}/`)
  || !['CREATE_COMPLETE', 'UPDATE_COMPLETE'].includes(stack.StackStatus)) {
  throw new Error('STOP: unexpected stack identity or incomplete deployment');
}
const provider = Object.fromEntries(stack.Outputs.map(output => [output.OutputKey, output.OutputValue]));
if (provider.StackName !== stackName || provider.StackId !== stack.StackId || provider.Region !== 'us-west-2') {
  throw new Error('STOP: stack outputs do not match the existing backend');
}
fs.mkdirSync('amplify/.config', { recursive: true });
fs.writeFileSync('amplify/.config/local-hosting-stack-info.json', JSON.stringify({
  branch, environment: target, verifiedAt: Date.now(), awscloudformation: provider,
}), { mode: 0o600 });
console.error(`Verified Hosting backend: branch=${branch}, environment=${target}, stack=${stackName}, account=${identity.Account}`);
process.stdout.write(JSON.stringify({ awscloudformation: provider }));
