#!/usr/bin/env node
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');

const branch = process.env.AWS_BRANCH
  || execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim();
if (!branch) throw new Error('Cannot determine the deployment branch');
const target = branch === 'main' ? 'dev' : 'gamma';
const parameters = JSON.parse(fs.readFileSync(0, 'utf8'));
const amplify = parameters.data?.amplify;
if (!amplify || parameters.error) throw new Error('STOP: invalid Amplify hook input');
const argv = amplify.argv || [];
const option = argv.indexOf('--amplify');
const headless = option < 0 ? undefined : JSON.parse(argv[option + 1]);
const localPath = 'amplify/.config/local-env-info.json';
const local = fs.existsSync(localPath) ? JSON.parse(fs.readFileSync(localPath, 'utf8')) : undefined;
const environments = [amplify.environment?.envName, headless?.envName, local?.envName]
  .filter(value => value !== undefined);
if (!environments.length || environments.some(name => name !== target)) {
  throw new Error(`STOP: ${branch} must deploy to ${target}; selected environments: ${environments.join(', ') || 'missing'}`);
}

// Hosting invokes this hook before init writes local metadata.
const metaPath = 'amplify/backend/amplify-meta.json';
const providers = [];
if (fs.existsSync(metaPath)) {
  providers.push(JSON.parse(fs.readFileSync(metaPath, 'utf8')).providers?.awscloudformation);
}
if (process.env.STACKINFO) {
  providers.push(JSON.parse(process.env.STACKINFO).awscloudformation);
}
const stack = target === 'dev' ? 'amplify-gocwebv3-dev-150706' : 'amplify-gocwebv3-gamma-a0479';
if (!providers.length || providers.some(provider => provider?.StackName !== stack)) {
  throw new Error(`STOP: deployment provider must reference ${stack}; local metadata=${fs.existsSync(metaPath)}, Hosting stack metadata=${Boolean(process.env.STACKINFO)}`);
}
for (const provider of providers) {
  if (provider.Region && provider.Region !== 'us-west-2') throw new Error('STOP: unexpected deployment region');
  if (provider.StackId && !provider.StackId.startsWith(`arn:aws:cloudformation:us-west-2:271755560601:stack/${stack}/`)) {
    throw new Error('STOP: unexpected deployment stack identity');
  }
}
console.log(`Verified deployment target: branch=${branch}, environment=${target}, stack=${stack}`);
execFileSync(process.execPath, ['amplify/scripts/prepare-environment.js', target], {
  stdio: 'inherit',
});
