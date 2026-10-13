import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const candidate = '419f3a4b3396acf69e44891bd3320cf4ccd999f1';
const baseline = '01352e5fa929e1ae28951444686903e8f190d9c9';
const directory = 'output/unit-animation-integration';
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const json = async file => JSON.parse(await fs.readFile(file, 'utf8'));
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
const reference = await json('source/UNIT-ANIMATION-VERIFICATION.json');
const report = {
  date: new Date().toISOString(),
  status: 'Verified approved integration into local primary',
  approval: 'User replied ok to the explicit request to integrate the reviewed candidate into primary',
  primary: { path: process.cwd(), branch: git('branch', '--show-current'), integratedFrom: candidate },
  recovery: { commit: baseline, compiledBackup: `${directory}/previous-build` },
  url: 'http://127.0.0.1:5173/',
  preview: reference.preview,
  port: 5173,
  checks: [],
  build: [],
  evidence: [],
  performance: { ...reference.performance, basis: 'Retained candidate ABBA measurements; runtime source and all 22 delivered file hashes unchanged. Not a new performance benchmark.' },
  limits: reference.limits,
  weeklyTaskUsage: 'unavailable',
  taskCredits: 'unavailable',
  publication: 'Local primary integration only. Public deployment not performed; primary has no Git remote.',
};
const check = (pass, label, data) => report.checks.push({ pass: !!pass, label, data });

git('merge-base', '--is-ancestor', candidate, 'HEAD');
git('cat-file', '-e', `${baseline}^{commit}`);
check(report.primary.branch === 'codex/trajectory-collision', 'Approved primary branch and recoverable baseline');
check(!git('diff', candidate, '--', '_source/src', '_source/public', '_source/package.json', '_source/package-lock.json', '_source/vite.config.js', 'engine', 'models', 'index.html', 'sw.js', 'source/bosses', 'source/hearth-bulwark'), 'Runtime, dependencies and editable assets unchanged from reviewed candidate');
check(git('status', '--short').split('\n').includes('?? concepts/'), 'Protected unrelated concepts remain untracked');
check(!git('remote', '-v'), 'No primary Git remote or public push');
const listener = JSON.parse(execFileSync('pwsh', ['-NoProfile', '-Command', 'Get-NetTCPConnection -LocalPort 5173 -State Listen | Select-Object LocalAddress, LocalPort, OwningProcess | ConvertTo-Json -Compress'], { encoding: 'utf8' }));
report.listener = listener;
check(listener.LocalAddress === '127.0.0.1' && listener.LocalPort === 5173 && listener.OwningProcess === 14872, 'Existing strict listener preserved without restart');

for (const file of reference.build) {
  const canonical = await fs.readFile(file.file);
  const built = await fs.readFile(path.join('_source/.release', file.file));
  const response = await fetch(new URL(file.file === 'index.html' ? 'index.htm' : file.file, report.preview));
  const served = Buffer.from(await response.arrayBuffer());
  check(response.ok && [canonical, built, served].every(bytes => sha(bytes) === file.sha256), `${file.file}: approved/build/delivery/served hashes match`);
  report.build.push(file);
}
const unitLog = await fs.readFile(`${directory}/unit-tests.log`, 'utf8');
check(/tests 125/.test(unitLog) && /pass 125/.test(unitLog) && /fail 0/.test(unitLog), '125 primary unit tests pass');
const physicsLog = await fs.readFile(`${directory}/physics.log`, 'utf8');
const physics = JSON.parse(physicsLog.slice(physicsLog.indexOf('{')));
check(physics.summary.passed && physics.summary.failures === 0 && physics.summary.successfulBallisticCases === 16, 'Primary physics, mission and 16 ballistic cases pass', physics.summary);
const controls = await json(`${directory}/controls/report.json`);
const native = controls.viewports.flatMap(viewport => viewport.checks);
check(controls.url === `${report.url}?hearthQA=1` && !controls.failure && !controls.errors.length && native.length === 48 && native.every(test => test.pass), '48 native keyboard/touch controls on actual primary, including right-leg stomp');
const flight = await json(`${directory}/flight/report.json`);
check(flight.url === `${report.url}?hearthQA=1` && !flight.failure && !flight.errors.length && flight.checks.length === 11 && flight.checks.every(test => test.pass), '11 production Gargoyle flight, landing and disruption checks on actual primary');
const lifecycle = await json(`${directory}/lifecycle/lifecycle-report.json`);
check(!lifecycle.failure && !lifecycle.errors.length && lifecycle.checks.length === 7 && lifecycle.checks.every(test => test.pass), '7 mounted restart/death lifecycle checks on actual primary');
for (const iteration of [0, 1]) {
  const state = await json(`${directory}/skill/state-${iteration}.json`);
  check(state.phase === 'playing' && state.candidate === false, `Installed game-skill iteration ${iteration}: normal primary gameplay`);
}
check(!(await fs.readdir(`${directory}/skill`)).some(file => file.startsWith('errors-')), 'Installed game-skill browser reports no errors');
for (const name of ['controls', 'flight', 'lifecycle', 'skill']) {
  const browser = await json(`${directory}/${name}/browser-lifecycle.json`);
  check(browser.closed && browser.remainingPids.length === 0 && !browser.cleanupErrors.length, `${name}: all owned browsers closed normally`);
}
for (const file of [
  'unit-tests.log', 'physics.log', 'build.log',
  'controls/report.json', 'controls/desktop-stomp.png', 'controls/portrait-stomp.png', 'controls/landscape-stomp.png',
  'flight/report.json', 'flight/cruise.png', 'flight/gargoyle-flight.webm',
  'lifecycle/lifecycle-report.json', 'skill/state-0.json', 'skill/state-1.json', 'skill/shot-0.png', 'skill/shot-1.png',
]) {
  const content = await fs.readFile(path.join(directory, file));
  report.evidence.push({ file: `${directory}/${file}`, bytes: content.length, sha256: sha(content) });
}
report.summary = { checks: report.checks.length, failures: report.checks.filter(test => !test.pass).length, files: report.build.length, nativeControls: native.length, flightChecks: flight.checks.length, lifecycleChecks: lifecycle.checks.length };
if (process.argv.includes('--record')) {
  await fs.writeFile('source/UNIT-ANIMATION-INTEGRATION.json', JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify(report.summary));
if (report.summary.failures) process.exitCode = 1;
