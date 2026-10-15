const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const script = path.resolve(__dirname, 'hosting-stack-info.js');
const stackName = 'amplify-gocwebv3-gamma-a0479';
const stackId = `arn:aws:cloudformation:us-west-2:271755560601:stack/${stackName}/example`;

function run(change = {}, variables = {}, wrapper = false) {
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
    if (wrapper) {
      fs.mkdirSync(path.join(cwd, 'bin'));
      fs.mkdirSync(path.join(cwd, 'amplify/scripts'), { recursive: true });
      for (const name of ['deploy-backend.sh', 'hosting-stack-info.js']) {
        fs.copyFileSync(path.join(__dirname, name), path.join(cwd, 'amplify/scripts', name));
      }
      fs.writeFileSync(path.join(cwd, 'amplify/scripts/prepare-environment.js'), '');
      fs.writeFileSync(path.join(cwd, 'amplify-mock.js'), `const fs=require('node:fs');const args=process.argv.slice(2);fs.appendFileSync('calls.jsonl',JSON.stringify(args)+'\\n');if(args[0]===process.env.FAILURE_COMMAND)process.exit(1);`);
      fs.writeFileSync(path.join(cwd, 'bin/amplify'), `#!/bin/sh\nexec '${process.execPath}' '${path.join(cwd, 'amplify-mock.js')}' "$@"\n`, { mode: 0o700 });
    }
    const result = spawnSync(wrapper ? '/bin/bash' : process.execPath, wrapper ? ['amplify/scripts/deploy-backend.sh'] : [script, 'gamma'], {
      cwd, encoding: 'utf8', env: { ...process.env, PATH: path.join(cwd, 'bin') + path.delimiter + cwd + path.delimiter + path.dirname(process.execPath), AWS_BRANCH: 'gamma', AWS_APP_ID: 'd1afaiv4wnjkx7', ...variables },
    });
    const log = path.join(cwd, 'calls.jsonl');
    result.calls = fs.existsSync(log) ? fs.readFileSync(log, 'utf8').trim().split('\n').map(JSON.parse) : [];
    return result;
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

test('wrapper imports verified existing metadata before init and push', () => {
  const result = run({}, {}, true);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(result.calls.map(args => args[0]), ['env', 'init', 'push']);
  const imported = result.calls[0];
  assert.equal(imported[1], 'import');
  assert.equal(JSON.parse(imported[imported.indexOf('--config') + 1]).awscloudformation.StackId, stackId);
  assert.equal(JSON.parse(result.calls[1][result.calls[1].indexOf('--amplify') + 1]).envName, 'gamma');
});
for (const command of ['env', 'init']) {
  test(`wrapper stops before push when ${command} fails`, () => {
    const result = run({}, { FAILURE_COMMAND: command }, true);
    assert.notEqual(result.status, 0);
    assert.equal(result.calls.some(args => args[0] === 'push'), false);
    assert.equal(result.calls.at(-1)[0], command);
  });
}
