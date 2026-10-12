import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=String.raw`C:\Users\arz0r\Documents\ChatGPT\Magic`,prefix='/.cache/fire-main/';
const html=await fs.readFile('_source/.release/index.html','utf8'),file=html.match(/src="\.\/([^"]+\.js)"/)[1],local=await fs.readFile('_source/.release/'+file);
const servedHtml=await(await fetch('http://127.0.0.1:5173'+prefix+'index.html')).text();
const normaliseHtml=s=>s.replace(/<script type="module" src="\/@vite\/client"><\/script>/,'').replace(/>\s+</g,'><').trim();
assert.equal(normaliseHtml(servedHtml),normaliseHtml(html));
const response=await fetch('http://127.0.0.1:5173'+prefix+file);assert.equal(response.status,200);const served=await response.text();
const worker=local.toString().match(/new URL\("(trajectory-worker-[^"]+\.js)",import.meta.url\)/)[1];
const normalise=s=>s.replace(/\n\/\/# sourceMappingURL=data:application\/json;base64,[^\r\n]+\s*$/,'\n').replace(`new URL("${prefix}engine/${worker}", import.meta.url)`,`new URL("${worker}",import.meta.url)`).trimEnd();
assert.equal(normalise(served),normalise(local.toString()),'complete executable body after known Vite transformations');
const workerLocal=await fs.readFile('_source/.release/engine/'+worker);assert.equal(normalise(await(await fetch('http://127.0.0.1:5173'+prefix+'engine/'+worker)).text()),normalise(workerLocal.toString()));
assert.equal(await fs.stat(root+'/_source/public/.cache/fire-main').catch(()=>null),null);
const bossHashes={};for(const type of ['colossus','gargoyle','wraith']){const file=`models/bosses/${type}.glb`,bytes=await fs.readFile('_source/public/'+file);assert.deepEqual(await fs.readFile('_source/.release/'+file),bytes);assert.deepEqual(await fs.readFile(root+'/'+file),bytes);assert.deepEqual(Buffer.from(await(await fetch('http://127.0.0.1:5173/'+file)).arrayBuffer()),bytes);bossHashes[type]=createHash('sha256').update(bytes).digest('hex');}
const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const native=await read('output/playwright/fire-main-after/report.json'),controls=await read('output/playwright/fire-main-controls/report.json'),materials=await read('output/playwright/fire-main-materials/report.json'),performance=await read('output/playwright/fire-main-performance/report.json'),bosses=await read('output/bosses/runtime/verification.json'),bossLifecycle=await read('output/bosses/runtime/browser-lifecycle.json');
for(const report of [native,controls,materials,performance]){assert.equal(report.errors.length,0);assert.ok(report.cleanup.closed);assert.equal(report.cleanup.remainingPids.length,0);assert.ok(!report.failure);}
assert.equal(bosses.errors.length,0);assert.ok(!bosses.failure);assert.ok(bossLifecycle.closed);assert.equal(bossLifecycle.remainingPids.length,0);
assert.equal(native.cases.length,3);assert.ok(native.cases.every(c=>c.passed));assert.equal(controls.cases.reduce((n,c)=>n+c.aims.length,0),24);assert.ok(materials.checks.every(c=>c.passed));assert.ok(performance.passed);assert.ok(bosses.checks.every(c=>c.passed));
const result={version:'1.2.1',url:'http://127.0.0.1:5173/',preview:'http://127.0.0.1:5173'+prefix+'index.html',file,worker,sha256:createHash('sha256').update(local).digest('hex'),bossHashes,primaryHead:execFileSync('git',['-C',root,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),nativeViewports:3,aimDirections:24,materialChecks:materials.checks.length,bossChecks:bosses.checks.length,errors:[],limitations:['Vite adds a source map and rebases worker URLs; executable bodies match after these exact transformations','touch and mobile performance are PC emulation','CPU/GPU utilization and RAM/VRAM not measured']};
await fs.writeFile('output/fire-main-delivery.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
