// Refresh only the three edited units' provenance after semantic/reimport QA.
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const read=async p=>JSON.parse(await fs.readFile(p,'utf8'));
const write=async(p,v)=>fs.writeFile(p,JSON.stringify(v,null,2)+'\n');
const fileInfo=async file=>{const b=await fs.readFile(file);return{file,bytes:b.length,sha256:createHash('sha256').update(b).digest('hex')};};
const semantic=await read('output/locomotion/asset/semantic-preservation.json');
const reimport=await read('output/locomotion/asset/blender-reimport.json');
if(semantic.checks.some(c=>!c.pass)||reimport.checks.some(c=>!c.passed))throw new Error('Asset validation must pass before recording provenance');
for(const a of semantic.assets)if((await fileInfo(a.file)).sha256!==a.sha256)throw new Error('Stale semantic report: '+a.file);
const engine=semantic.assets.find(a=>a.file.includes('hearth-bulwark'));
const ep='source/hearth-bulwark/provenance.json',ev='source/hearth-bulwark/asset-validation.json';
const validation=await read(ev);Object.assign(validation,{bones:engine.bones,triangles:engine.triangles,bytes:engine.bytes,exportedClips:engine.clips});validation.clips.Stomp=1.28;await write(ev,validation);
const provenance=await read(ep);Object.assign(provenance,{branch:'codex/unit-locomotion',preview:'http://127.0.0.1:5173/.cache/latest-locomotion-delivery/index.htm',protectedBaseline:'01352e5fa929e1ae28951444686903e8f190d9c9',animationRevision:{date:'2026-10-12',approval:'OK,MAKE PURSUE GOAL; engine legs look too squashed',source:'source/hearth-bulwark/update_locomotion.py',thighMetres:reimport.sourceRig.legs.L[0],shinMetres:reimport.sourceRig.legs.L[1],upperBodyRiseMetres:.4,rightStompLiftMetres:.72,contactSeconds:.62,runtimeSeconds:1.28,exportedClips:engine.clips,verification:'source/UNIT-ANIMATION-VERIFICATION.json'}});provenance.clips.Stomp=1.28;
for(const record of provenance.files)Object.assign(record,await fileInfo(record.file));
for(const file of ['source/hearth-bulwark/update_locomotion.py','source/hearth-bulwark/verify_locomotion.py'])if(!provenance.files.some(f=>f.file===file))provenance.files.push(await fileInfo(file));
await write(ep,provenance);
const bp='source/bosses/provenance.json',bv='source/bosses/asset-validation.json',bossProvenance=await read(bp),bossValidation=await read(bv);
const approval='2026-10-12: Proper all-unit animation; Gargoyle mostly flies; Galio selected as movement reference';if(!bossProvenance.authorization.includes(approval))bossProvenance.authorization.push(approval);
bossProvenance.animationRevision={date:'2026-10-12',source:await fileInfo('source/bosses/update_locomotion.py'),changedActions:{colossus:['Walk'],gargoyle:['Walk','Hover','Dive']},reference:{page:'https://www.leagueoflegends.com/en-us/champions/galio/',ability:'Hero\u2019s Entrance',inspectedVideoSeconds:[2.6,3.65,4.15],use:'Compact airborne pose, broad wing stroke, low impact brace and planted recovery; original Gargoyle geometry retained'},verification:'source/UNIT-ANIMATION-VERIFICATION.json'};
for(const kind of ['colossus','gargoyle']){const a=semantic.assets.find(a=>a.file.endsWith('/'+kind+'.glb')),m=bossProvenance.models.find(m=>m.type===kind);Object.assign(m,{bytes:a.bytes,sha256:a.sha256,sourceSha256:(await fileInfo(m.source)).sha256,exportedClips:a.clips});Object.assign(bossValidation[kind],{bytes:a.bytes,exportedClips:a.clips});if(kind==='gargoyle'){m.clips.Hover=1.2;bossValidation[kind].clips.Hover=1.2;}}
await write(bv,bossValidation);await write(bp,bossProvenance);
console.log('Updated provenance for the three verified units; original concepts/maps and topology records retained.');
