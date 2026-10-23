import {ENCOUNTER} from './single-room-combat-rules.js';

// Explicit diagnostic presets: each boss comparison retains the same twelve
// regular enemies. Reloading the document gives each run a fresh WebGL context.
export const ISOLATION_PRESETS=Object.freeze([
 {id:'baseline6',label:'1 · 6 εχθροί · BOSSES OFF (παλιά βάση)'},
 {id:'regular12',label:'2 · 12 εχθροί · BOSSES OFF'},
 {id:'warden',label:'3 · 12 εχθροί + Warden μόνο'},
 {id:'colossus',label:'4 · 12 εχθροί + Colossus μόνο'},
 {id:'gargoyle',label:'5 · 12 εχθροί + Gargoyle μόνο'},
 {id:'wraith',label:'6 · 12 εχθροί + Wraith μόνο'},
 {id:'all',label:'7 · 12 εχθροί + ΟΛΟΙ οι bosses'},
 {id:'render-off',label:'8 · Όλοι · εμφάνιση bosses OFF / AI ON'},
 {id:'ai-off',label:'9 · Όλοι · AI bosses OFF / εμφάνιση ON'},
]);
const BASELINE=[[-3,15,'guard'],[3,15,'guard'],[-5,10,'archer'],[5,10,'heavy'],[-8,14,'guard'],[8,14,'archer']].map(([x,z,kind])=>({x,z,kind,legacyNavSpawn:true}));
export function isolationPreset(id){return ISOLATION_PRESETS.find(p=>p.id===id)||ISOLATION_PRESETS[0];}
export function isolationEncounter(id){
 id=isolationPreset(id).id;
 return (id==='baseline6'?BASELINE:ENCOUNTER.filter(e=>e.kind!=='boss'||['all','render-off','ai-off'].includes(id)||(e.bossType||'warden')===id)).map(e=>({...e}));
}
export function isolationConfig(id){
 const preset=isolationPreset(id),enemies=isolationEncounter(preset.id),bossTypes=enemies.filter(e=>e.kind==='boss').map(e=>e.bossType||'warden');
 return {isolation:preset.id,isolationLabel:preset.label,enemyCount:enemies.length,regularEnemyCount:enemies.length-bossTypes.length,bossCount:bossTypes.length,bossTypes,bossRendering:preset.id!=='render-off',bossAI:preset.id!=='ai-off',bossSummoning:bossTypes.length>0&&preset.id!=='ai-off',bossAnimations:true,freshDocument:true};
}
export function holdIsolatedEnemy(e,id){return isolationPreset(id).id==='ai-off'&&e.kind==='boss';}
export function applyBossRenderIsolation(entities,id){
 if(isolationPreset(id).id!=='render-off')return;
 // Called AFTER animation updates. Keep bodies, AI, animations and targeting;
 // suppress only the boss model draw. Health bars/attack effects remain visible.
 for(const e of entities)if(e.kind==='boss'&&!e.removed)e.mesh.visible=false;
}
