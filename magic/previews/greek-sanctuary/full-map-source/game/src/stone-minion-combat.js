// Source-authored claw contact/recovery, shared by hostile AI and its rig.
export const STONE_MINION = Object.freeze({
  hp:65,speed:2.3,mass:4,height:1.4,cy:.66,radius:.30,label:'Πέτρινος υπηρέτης',
  spawnDuration:1.8,contact:.59,attackDuration:137/120,reach:1.12,damage:11,cooldown:1.3,
});
export function createStoneCombat(){return {phase:'spawn',time:0,side:1,nextSide:1,contactEmitted:false};}
export function beginStoneAttack(state){
  if(state.phase!=='idle')return false;
  state.phase='attack';state.time=0;state.side=state.nextSide;state.nextSide*=-1;state.contactEmitted=false;return true;
}
export function cancelStoneCombat(state){state.phase='idle';state.time=0;state.contactEmitted=false;}
export function advanceStoneCombat(state,dt){
  if(state.phase==='idle')return {active:false,contact:false};
  state.time+=Number.isFinite(dt)?Math.max(0,dt):0;
  const contact=state.phase==='attack'&&!state.contactEmitted&&state.time>=STONE_MINION.contact;
  if(contact)state.contactEmitted=true;
  const duration=state.phase==='spawn'?STONE_MINION.spawnDuration:STONE_MINION.attackDuration;
  if(state.time>=duration){state.phase='idle';state.time=0;}
  return {active:state.phase!=='idle',contact};
}
