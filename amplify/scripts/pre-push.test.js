const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const hook = path.resolve(__dirname, '../hooks/pre-push.js');
const stack = 'amplify-gocwebv3-gamma-a0479';

function run({ branch = 'gamma', selected = 'gamma', headless, local, provider = { StackName: stack }, meta, hosting, input } = {}) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'goc-hook-test-'));
  try {
    fs.mkdirSync(path.join(cwd, 'amplify/scripts'), { recursive: true });
    fs.writeFileSync(path.join(cwd, 'amplify/scripts/prepare-environment.js'), "require('node:fs').writeFileSync('prepared', process.argv[2]);");
    if (hosting) {
      fs.mkdirSync(path.join(cwd, 'amplify/.config'), { recursive: true });
      fs.writeFileSync(path.join(cwd, 'amplify/.config/local-hosting-stack-info.json'), JSON.stringify(hosting));
    }
    if (local) {
      fs.mkdirSync(path.join(cwd, 'amplify/.config'), { recursive: true });
      fs.writeFileSync(path.join(cwd, 'amplify/.config/local-env-info.json'), JSON.stringify(local));
    }
    if (meta) {
      fs.mkdirSync(path.join(cwd, 'amplify/backend'));
      fs.writeFileSync(path.join(cwd, 'amplify/backend/amplify-meta.json'), JSON.stringify({ providers: { awscloudformation: meta } }));
    }
    const env = { ...process.env, AWS_BRANCH: branch };
    delete env.STACKINFO;
    if (provider) env.STACKINFO = JSON.stringify({ awscloudformation: provider });
    const result = spawnSync(process.execPath, [hook], {
      cwd, env, encoding: 'utf8',
      input: input ?? JSON.stringify({ data: { amplify: {
        environment: selected === null ? {} : { envName: selected }, argv: headless ? ['init', '--amplify', JSON.stringify(headless)] : ['push'],
      } } }),
    });
    return { ...result, prepared: fs.existsSync(path.join(cwd, 'prepared')) ? fs.readFileSync(path.join(cwd, 'prepared'), 'utf8') : undefined };
  } finally {
    fs.rmSync(cwd, { recursive: true, force: true });
  }
}

test('Hosting initialization validates actual headless environment and cached stack without local files', () => {
  const result = run({ selected: null, headless: { envName: 'gamma' } });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.prepared, 'gamma');
});
test('Hosting verified snapshot survives helpers that discard STACKINFO', () => {
  const result = run({ provider: null, hosting: { branch: 'gamma', environment: 'gamma', verifiedAt: Date.now(), awscloudformation: { StackName: stack } } });
  assert.equal(result.status, 0, result.stderr);
});
test('initialized local metadata works without Hosting stack cache', () => {
  const result = run({ local: { envName: 'gamma' }, meta: { StackName: stack }, provider: null });
  assert.equal(result.status, 0, result.stderr);
});
test('manual developer branches still target shared gamma', () => {
  const result = run({ branch: 'feature/example' });
  assert.equal(result.status, 0, result.stderr);
});
for (const [name, options] of Object.entries({
  'selected production environment': { selected: 'dev' },
  'headless production environment': { headless: { envName: 'dev' } },
  'stale local production environment': { local: { envName: 'dev' } },
  'production stack': { provider: { StackName: 'amplify-gocwebv3-dev-150706' } },
  'foreign account stack ARN': { provider: { StackName: stack, StackId: `arn:aws:cloudformation:us-west-2:000000000000:stack/${stack}/example` } },
  'stale production metadata': { meta: { StackName: 'amplify-gocwebv3-dev-150706' } },
  'stale Hosting snapshot': { provider: null, hosting: { branch: 'gamma', environment: 'gamma', verifiedAt: 1, awscloudformation: { StackName: stack } } },
  'wrong Hosting branch': { hosting: { branch: 'main', environment: 'gamma', verifiedAt: Date.now(), awscloudformation: { StackName: stack } } },
  'wrong region': { provider: { StackName: stack, Region: 'us-east-1' } },
  'missing stack metadata': { provider: null },
  'missing selected environment': { selected: null },
  'malformed hook input': { input: '{' },
  'main with gamma selected': { branch: 'main' },
})) {
  test(`rejects ${name} before preparing definitions`, () => {
    const result = run(options);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Error/);
    assert.equal(result.prepared, undefined);
  });
}
