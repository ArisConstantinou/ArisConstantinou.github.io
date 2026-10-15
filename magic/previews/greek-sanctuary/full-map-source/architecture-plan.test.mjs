import test from 'node:test';import assert from 'node:assert/strict';
import {existingRooms,newRooms,corridors,secretAreas} from './game/src/castle-layout.js';
import {fitSecretArea} from './clearance.js';
import {architecturePieces,architectureProfile,architecturalHeight,pressureTransitReservations,architecturalSupplyAreas,architecturalSupplyRange,architecturalWingReservations} from './architecture-plan.js';
import {supportedFootprint} from './game/src/walkable-support.js';
import fs from 'node:fs';import path from 'node:path';import {architectureIntegration} from './architecture-integration.mjs';
const originals=[...existingRooms,...newRooms,...corridors,...secretAreas.map(fitSecretArea)],pieces=architecturePieces(originals),wings=pieces.filter(r=>r.architectureWing);
test('all twelve real wings join their parent floor without touching another destination or shortcut',()=>{
 assert.equal(wings.length,12);assert.equal(new Set(wings.map(r=>r.id)).size,10);
 for(const w of wings){const peers=pieces.filter(r=>r!==w&&r.id===w.id);assert.ok(peers.some(r=>(Math.abs(w.x-r.x-r.w)<.001||Math.abs(w.x+w.w-r.x)<.001)&&Math.min(w.z+w.d,r.z+r.d)-Math.max(w.z,r.z)>3.8||(Math.abs(w.z-r.z-r.d)<.001||Math.abs(w.z+w.d-r.z)<.001)&&Math.min(w.x+w.w,r.x+r.w)-Math.max(w.x,r.x)>3.8),w.role);}
 assert.deepEqual(pieces.filter(r=>!r.architectureWing),originals);
});
test('compound floors support an engine footprint in every new wing, without filling rectangular bounding-box gaps',()=>{
 const floors=pieces.map(r=>({x:r.x+r.w/2,y:-.3,z:r.z+r.d/2,w:r.w,h:.6,d:r.d}));
 for(const w of wings)assert.equal(supportedFootprint(floors,{x:w.x+w.w/2,y:0,z:w.z+w.d/2},1.22),true,w.role);
 assert.equal(supportedFootprint(floors,{x:-65,y:0,z:5.5},.43),false,'library outside corner remains outside the floor');
 assert.equal(supportedFootprint(floors,{x:68,y:0,z:-9},.43),false,'stepped gallery exedra retains its outside corner');
});
test('secret headroom and low parapets remain measured independently from tall regional walls',()=>{
 assert.equal(architecturalHeight('library-secret',4.25),4.25);assert.equal(architecturalHeight('courtyard',1.05),1.05);
 assert.equal(architecturalHeight('library',3.65),10);assert.equal(architectureProfile('barracks').style,'greek-house');
});
test('watchtower pressure planning reserves both engine side routes without adding physics obstacles',()=>{
 const p=pressureTransitReservations({approach:'watchtower',floorY:0}),aisles=p.filter(r=>r.tag==='architecture-clear-transit'),mouth=p.find(r=>r.tag==='architecture-stair-approach');assert.equal(aisles.length,2);assert.ok(aisles.every(r=>r.w>=3.8&&r.d>=10));assert.equal(mouth.x,51.25);assert.ok(mouth.w>=6.4&&mouth.z<-20);
 assert.deepEqual(pressureTransitReservations({approach:'watchtower',floorY:6}),[]);
 assert.deepEqual(pressureTransitReservations({approach:'ritual',floorY:0}),[]);
});
test('every new wing reserves a continuous engine-width furniture-free entry and interior route',()=>{
 const r=architecturalWingReservations();assert.equal(r.length,12);assert.equal(new Set(r.map(v=>v.role)).size,12);
 for(const w of wings){const lane=r.find(v=>v.role===w.role);assert.ok(lane&&lane.w>=3.8&&lane.d>=3.8);assert.ok(Math.abs(w.x+w.w/2-lane.x)<=lane.w/2&&Math.abs(w.z+w.d/2-lane.z)<=lane.d/2,w.role);}
});
test('pressure planning searches real room pieces without inventing a filled bounding rectangle',()=>{
 const g={approach:'watchtower',x:36.25,z:-23.125},room=newRooms.find(r=>r.id==='watchtower'),areas=architecturalSupplyAreas(g,room);
 assert.equal(areas.length,3);assert.ok(areas.every(a=>a.id==='watchtower'));assert.ok(architecturalSupplyRange(g,areas)>35);
 assert.equal(architecturalSupplyRange({approach:'prison'},areas),10);assert.deepEqual(architecturalSupplyAreas({...g,floorY:6},room),[room]);
});
test('compound room zones preserve unique HEARTH spawn candidates and protect every starting courtyard patch',async()=>{
 const plugin=architectureIntegration({dir:path.resolve('source/greek-environment/full-map'),replace:(s,a,b)=>{assert.equal(s.split(a).length,2);return s.replace(a,b);}}),code=plugin.transform(fs.readFileSync('game/src/spawn-rules.js','utf8'),'/src/spawn-rules.js').code;
 const rules=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64')),zones=pieces.filter(r=>!corridors.includes(r)).map(r=>({name:r.id,secret:r.id.endsWith('-secret'),architectureWing:r.architectureWing,xMin:r.x,xMax:r.x+r.w,zMin:r.z,zMax:r.z+r.d})),spawn={x:0,z:22};
 const allowed=rules.hearthSpawnRooms(zones,spawn);assert.equal(allowed.length,13);assert.equal(new Set(allowed.map(r=>r.name)).size,13);
 assert.equal(rules.enemySpawnAllowed({x:18,z:21},zones,spawn),false,'new courtyard stoa is protected');
 assert.equal(rules.enemySpawnAllowed({x:23,z:21},zones,spawn),true,'outside gap has not become a rectangular safe zone');
});
