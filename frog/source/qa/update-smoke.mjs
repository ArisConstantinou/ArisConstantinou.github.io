import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';

const here = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(here, '..');
const output = process.env.CODEX_TEST_OUTPUT || path.join(here, 'update-evidence');
fs.mkdirSync(output, {recursive:true});
const temp = path.join(output, 'tmp');
fs.mkdirSync(temp, {recursive:true});
const require = createRequire(import.meta.url);
const {chromium} = require(process.env.FROG_PLAYWRIGHT || process.argv[2] || 'playwright');
const {port} = JSON.parse(fs.readFileSync(path.join(here, 'update-runtime.json')));
const updater = fs.readFileSync(path.join(source, 'public/update.js'));
const worker = fs.readFileSync(path.join(source, 'public/update-worker.js'));
assert.match(fs.readFileSync(path.join(source, 'index.html'), 'utf8'), /data-frog-updater/);
if (process.env.CODEX_BUILD_OUTPUT) {
  assert.match(fs.readFileSync(path.join(process.env.CODEX_BUILD_OUTPUT, 'index.html'), 'utf8'), /data-frog-updater/);
  assert.deepEqual(fs.readFileSync(path.join(process.env.CODEX_BUILD_OUTPUT, 'update.js')), updater);
}
const checks = [];
let release = 1, version = '4.3.15', missing = false, badHTML = false, omitHook = false, staleNavigation = false;
let indexRequests = 0;
const server = http.createServer((req,res) => {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);
  const send = (type, body, status=200) => {
    res.writeHead(status, {'Content-Type':type, 'Cache-Control':'public, max-age=600'});
    res.end(body);
  };
  if (url.pathname === '/frog/update.js') return send('text/javascript', updater);
  if (url.pathname === '/frog/update-worker.js') return send('text/javascript', worker);
  if (url.pathname === '/frog/' || url.pathname === '/frog/index.html') {
    indexRequests++;
    if (badHTML) return send('text/html','<h1>Deployment unavailable</h1>',503);
    const served = staleNavigation && url.pathname === '/frog/' ? 7 : release;
    return send('text/html', `<!doctype html><html><head><meta name="frog-version" content="${version}"><title>fixture ${served}</title>${omitHook?'':'<script defer data-frog-updater src="./update.js"></script>'}<script type="module" src="./app-${served}.js"></script></head><body>Release ${served}</body></html>`);
  }
  if (/^\/frog\/app-\d+\.js$/.test(url.pathname)) {
    if (missing) return send('text/plain','not available',404);
    return send('text/javascript', `window.frogArcade={mode:'playing',persist(){if(window.saveWorks===false)return false;localStorage.setItem('frog-fixture-save','hp=42');return true;}}; window.fixtureReady=true;`);
  }
  if (url.pathname === '/other/') return send('text/html','<!doctype html><title>other project</title>other');
  return send('text/plain','missing',404);
});
await new Promise((resolve,reject) => server.once('error',reject).listen(port,'127.0.0.1',resolve));
let context;
const profile = path.join(output, 'browser-profile');
const ownedProcesses = () => {
  if (process.platform !== 'win32') return [];
  const escaped = profile.replaceAll("'", "''");
  const script = `@(Get-CimInstance Win32_Process -Filter "Name='chrome.exe' OR Name='chrome-headless-shell.exe'" | Where-Object { $_.CommandLine -like '*${escaped}*' } | Select-Object ProcessId,CreationDate,CommandLine) | ConvertTo-Json -Compress`;
  const result = execFileSync('powershell',['-NoProfile','-Command',script],{encoding:'utf8'}).trim();
  const processes = result ? JSON.parse(result) : [];
  return Array.isArray(processes) ? processes : [processes];
};
const report = {ok:false, checks, port};
try {
  context = await chromium.launchPersistentContext(profile, {
    headless:true, env:{...process.env, TMP:temp, TEMP:temp}, viewport:{width:1280,height:720}
  });
  report.ownedBrowserProcesses = ownedProcesses();
  if (process.platform === 'win32') assert.ok(report.ownedBrowserProcesses.length, 'Browser process ownership was not recorded');
  const page = context.pages()[0];
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  const normalURL = `http://127.0.0.1:${port}/frog/`;
  const ready = async n => {
    await page.waitForFunction(expected => document.title === `fixture ${expected}` && window.fixtureReady, n, {timeout:15000});
    assert.equal(page.url(),normalURL);
  };
  const focus = () => page.evaluate(() => window.dispatchEvent(new Event('focus')));
  await page.goto(normalURL);
  await ready(1);
  await page.evaluate(async () => {await navigator.serviceWorker.ready; if (!navigator.serviceWorker.controller) await new Promise(resolve => navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true})); localStorage.setItem('frog-unrelated-save','keep');});
  checks.push('Initial release installs a worker restricted to /frog/ at the ordinary URL');
  // A real interval detects a new bundle even when the displayed version is unchanged.
  release=2;
  await page.waitForFunction(() => document.title === 'fixture 2', null, {timeout:70000});
  await ready(2);
  assert.equal(await page.evaluate(()=>localStorage.getItem('frog-fixture-save')),'hp=42');
  assert.equal(await page.evaluate(()=>localStorage.getItem('frog-unrelated-save')),'keep');
  checks.push('A visible tab automatically updates within the 60-second interval, saves the round, and keeps its URL and unrelated storage');
  await page.evaluate(()=>window.saveWorks=false);
  release=3;version='4.3.16';
  await focus();
  await page.waitForTimeout(600);
  assert.equal(await page.title(),'fixture 2');
  await page.evaluate(()=>window.saveWorks=true);
  await focus();await ready(3);
  checks.push('Failed save defers the update; a successful save permits the next automatic check');
  release=4;missing=true;
  await focus();await page.waitForTimeout(600);
  assert.equal(await page.title(),'fixture 3');
  missing=false;await focus();await ready(4);
  checks.push('An unavailable release bundle cannot reload the game into a broken deployment');
  await context.setOffline(true);release=5;
  await focus();await page.waitForTimeout(300);
  assert.equal(await page.title(),'fixture 4');
  await context.setOffline(false);await focus();await ready(5);
  checks.push('Offline play stays loaded and reconnecting automatically installs the latest release');
  badHTML=true;
  await focus();await page.waitForTimeout(500);
  assert.equal(await page.title(),'fixture 5');badHTML=false;
  version='4.3.14';release=6;
  await focus();await page.waitForTimeout(500);
  assert.equal(await page.title(),'fixture 5');
  checks.push('HTTP failures and an older CDN version do not replace the running release');
  version='4.3.17';release=7;omitHook=true;
  const next=await context.newPage();
  await next.goto(normalURL);
  await next.waitForFunction(()=>document.title==='fixture 7' && window.__frogUpdates);
  assert.equal(await next.locator('meta[name="frog-version"]').getAttribute('content'),'4.3.17');
  await next.close();
  checks.push('An ordinary navigation bypasses cached HTML; the worker restores an omitted updater hook');
  const other=await context.newPage();await other.goto(`http://127.0.0.1:${port}/other/`);
  assert.equal(await other.evaluate(()=>!!navigator.serviceWorker.controller),false);
  assert.equal(await other.locator('[data-frog-updater]').count(),0);await other.close();
  checks.push('Other projects on the same origin are outside the worker scope');
  // The original page receives the latest release and then stays stable.
  await focus();await ready(7);
  let navigations=0;page.on('framenavigated',frame=>{if(frame===page.mainFrame())navigations++;});
  await Promise.all([focus(),focus(),focus()]);await page.waitForTimeout(600);
  assert.equal(navigations,0);assert.deepEqual(errors,[]);
  checks.push('Repeated checks of the current release cause no reload loop or uncaught page errors');
  release=8;staleNavigation=true;
  await focus();
  await page.waitForFunction(() => JSON.parse(sessionStorage.getItem('frog-update-attempt')||'null')?.count === 2);
  await page.waitForTimeout(1500);
  assert.equal(navigations,2);
  assert.equal(await page.title(),'fixture 7');
  await focus();await page.waitForTimeout(500);
  assert.equal(navigations,2);
  checks.push('A deliberately stale navigation is retried at most twice rather than entering an infinite reload loop');
  report.indexRequests=indexRequests;report.ok=true;
} catch(error) {
  report.error=error.stack;throw error;
} finally {
  if(context) await context.close();
  await new Promise(resolve=>server.close(resolve));
  report.remainingBrowserProcesses=ownedProcesses();
  fs.writeFileSync(path.join(output,'auto-update-report.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  assert.equal(report.remainingBrowserProcesses.length,0,'Owned browser processes remain');
}
