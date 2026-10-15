const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const script = path.resolve(__dirname, 'hosting-stack-info.js');
const stackName = 'amplify-gocwebv3-gamma-a0479';
const stackId = `arn:aws:cloudformation:us-west-2:271755560601:stack/${stackName}/example`;

function run(change = {}, variables = {}) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'goc-hosting-test-'));
  try {
    const responses = {
      'sts get-caller-identity': { Account: '271755560601' },
      'amplify get-branch': { branch: { backendEnvironmentArn: 'arn:aws:amplify:us-west-2:271755560601:apps/d1afaiv4wnjkx7/backendenvironments/gamma' } },
      'amplify get-backend-environment': { backendEnvironment: { environmentName: 'gamma', stackName } },
      'cloudformation describe-stacks': { Stacks: [{ StackName: stackName, StackId: stackId, StackStatus: 'UPDATE_COMPLETE', Outputs: [
        { OutputKey: 'StackName', OutputValue: stackName }, { OutputKey: 'StackId', OutputValue: stackId }, { OutputKey: 'Region', OutputValue: 'us-west-2' },
      ] }] },
      ...change,
    };
    fs.writeFileSync(path.join(cwd, 'responses.json'), JSON.stringify(responses));
    fs.writeFileSync(path.join(cwd, 'aws'), `#!/bin/sh\nexec '${process.execPath}' '${path.join(cwd, 'aws.js')}' "$@"\n`, { mode: 0o700 });
    fs.writeFileSync(path.join(cwd, 'aws.js'), `const fs = require('node:fs'); const key=process.argv.slice(2,4).join(' '); const data=JSON.parse(fs.readFileSync(${JSON.stringify(path.join(cwd, 'responses.json'))},'utf8')); if (!Object.hasOwn(data,key)) throw new Error('Unexpected AWS operation: '+key); process.stdout.write(JSON.stringify(data[key]));`);
    return spawnSync(process.execPath, [script, 'gamma'], {
      cwd, encoding: 'utf8', env: { ...process.env, PATH: cwd, AWS_BRANCH: 'gamma', AWS_APP_ID: 'd1afaiv4wnjkx7', ...variables },
    });
  } finally {
    fs.rmSync(cwd, { recursive: true, force: true });
  }
}

test('exports verified gamma stack information using read-only operations', () => {
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).awscloudformation.StackId, stackId);
});
for (const [name, change, variables] of [
  ['wrong account', { 'sts get-caller-identity': { Account: '000000000000' } }],
  ['production Hosting binding', { 'amplify get-branch': { branch: { backendEnvironmentArn: 'arn:aws:amplify:us-west-2:271755560601:apps/d1afaiv4wnjkx7/backendenvironments/dev' } } }],
  ['production stack', { 'amplify get-backend-environment': { backendEnvironment: { environmentName: 'gamma', stackName: 'amplify-gocwebv3-dev-150706' } } }],
  ['foreign stack identity', { 'cloudformation describe-stacks': { Stacks: [{ StackName: stackName, StackId: stackId.replace('271755560601','000000000000'), StackStatus: 'UPDATE_COMPLETE' }] } }],
  ['incomplete stack update', { 'cloudformation describe-stacks': { Stacks: [{ StackName: stackName, StackId: stackId, StackStatus: 'UPDATE_IN_PROGRESS' }] } }],
  ['missing stack outputs', { 'cloudformation describe-stacks': { Stacks: [{ StackName: stackName, StackId: stackId, StackStatus: 'UPDATE_COMPLETE', Outputs: [] }] } }],
  ['wrong app', {}, { AWS_APP_ID: 'other' }],
  ['main branch with gamma target', {}, { AWS_BRANCH: 'main' }],
  ['missing branch', {}, { AWS_BRANCH: '' }],
]) {
  test(`rejects ${name} without exporting metadata`, () => {
    const result = run(change, variables);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /STOP:/);
    assert.equal(result.stdout, '');
  });
}
