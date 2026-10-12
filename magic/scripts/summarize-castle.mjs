import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const read=async p=>JSON.parse(await fs.readFile(path.join(root,p),'utf8'));
const physics=await read('output/playwright/castle-physics-delivery.json');
const compiled=await read('output/playwright/castle-mobile-final/report.json');
const source=await read('output/playwright/castle-source-preview/report.json');
const offline=await read('output/playwright/castle-offline/report.json');
const hearth=await read('output/playwright/castle-hearth-final/report.json');
const performance=await read('output/playwright/castle-performance-final-worker/report.json');
assert.ok([physics.summary.passed,compiled.passed,source.passed,offline.passed,hearth.passed,performance.passed].every(Boolean));
const unitLog=await fs.readFile(path.join(root,'output/playwright/castle-unit-worker-sap.log'),'utf8');assert.ok(unitLog.includes('pass 111')&&unitLog.includes('fail 0'));
const comparison=[];
for(const scene of ['idle','battle','held'])for(const rate of [1,4]){
 const before=performance.samples.find(s=>s.scene===scene&&s.rate===rate&&s.revision==='before'),after=performance.samples.find(s=>s.scene===scene&&s.rate===rate&&s.revision==='after');
 assert.ok(before&&after);const regression=after.fps<before.fps*.8||after.p95>before.p95*1.2;assert.equal(regression,false,scene+' performance regression');
 const sample=s=>({fps:s.fps,p95Ms:s.p95,maxMs:s.max,over50ms:s.over50,drawCalls:s.render.calls,triangles:s.render.triangles});comparison.push({scene,cpuThrottle:rate,before:sample(before),after:sample(after),regression});
}
const sw=await fs.readFile(path.join(root,'sw.js'),'utf8'),precache=JSON.parse(sw.match(/const PRECACHE = (\[[\s\S]*?\]);?/)[1]),files=[];
for(const file of [...precache,'sw.js']){const bytes=await fs.readFile(path.join(root,file));files.push({file,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});}
assert.equal(files.length,22);assert.ok(files.some(f=>f.sha256===hearth.files.find(f=>f.file.startsWith('engine/')).sha256),'HEARTH checked the final runtime');
const report={version:'1.4.2',status:'Validated candidate; promotion approval and physical phone verification pending',date:new Date().toISOString(),baseCommit:'088be53',branch:'codex/mobile-performance-castle',publicBase:'1.4.1',port:5173,preview:'http://127.0.0.1:5173/.cache/mobile-game/',
 changes:['Safe courtyard: zero initial, reinforcement or summoned enemy spawns; HEARTH starts in another room','14 main rooms are 25 percent wider and deeper; connected corridors and bridge adjusted','Three 3x4 metre alcoves with level 3 equipment, collected once per run','Local instance bounds, compatible batches, idle actor sleep with combat wake-up, invisible rig detachment, native collision reset, ordered broadphase bounds and SAP worker'],
 tests:{unit:111,physics:physics.summary,secretTraversal:physics.secretTraversals.map(({id,passed,seconds})=>({id,passed,seconds})),safeCourtyardWave:physics.mission.safeCourtyardWave,safeCourtyardSummon:physics.mission.safeCourtyardSummon,compiledUI:compiled.cases.length,actualSourcePreview:source.cases.length,restarts:source.restarts.length,offline:offline.checks.length,offlineCachedFiles:offline.cache.files.length,nativeSuitFire:hearth.piloted.firing,browserErrors:compiled.errors.length+source.errors.length+offline.errors.length+hearth.errors.length},
 performance:{cpu:performance.cpu,conditions:performance.conditions,sceneDifferences:'Native idle and held scenes use each release spawn position; expanded map and safe-spawn redistribution are part of the change. Battle fixture puts three active guards near the wizard in the hall. No enemy stun in performance runs. Earlier ABBA repeats retained in output/playwright/castle-performance-stress-142 and castle-performance-broadphase.',comparison},
 runtime:files,
 evidence:{before:'output/playwright/castle-performance-final-worker/before-start.png',after:'output/playwright/castle-performance-final-worker/after-start.png',rooms:'output/playwright/castle-source-preview/wide-library.png',secrets:'output/playwright/castle-source-preview/library-secret.png',offline:'output/playwright/castle-offline/offline-aim.png'},
 limitations:['Physical phone FPS, load time, touch latency, CPU/GPU utilization and RAM/VRAM are not measured','4x CPU throttle is a desktop surrogate, not a device benchmark','Draw calls increase with local instance bounds; submitted triangles fall and measured CPU frame times improve','Public cache migration and final deployment checks require approved publication','Live inventory / 3D wizard and unified suit keys remain separate pending work'],usage:'Task-attributable weekly usage and credits unavailable; no installations, agents or paid tools'};
await fs.writeFile(path.join(root,'source/mobile-performance-castle/VERIFICATION.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({version:report.version,tests:report.tests,comparison,files:files.length},null,2));
