// Balance policy only. Final body envelopes come from verified posed model metadata.
const freeze=value=>Object.freeze(value);
export const CHARACTER_CLASSES=freeze({
 heavy:freeze({id:'heavy',capacity:135,move:.76,jump:.78,agility:.78,groundAttack:'bellySlap',airAttack:'bodySlam',normalDamage:2,doubleDamage:3}),
 skinny:freeze({id:'skinny',capacity:90,move:1.24,jump:1.12,agility:1.24,groundAttack:'kick',airAttack:'airKick',normalDamage:2,doubleDamage:4}),
 medium:freeze({id:'medium',capacity:90,move:1,jump:1,agility:1,groundAttack:'kick',airAttack:'flyBurst',normalDamage:1,doubleDamage:1}),
});
export const CHARACTER_IDS=freeze(Object.keys(CHARACTER_CLASSES));
export const normalizeCharacter=id=>CHARACTER_IDS.includes(id)?id:'medium';
export const characterProfile=actor=>CHARACTER_CLASSES[normalizeCharacter(typeof actor==='string'?actor:actor?.characterClass)];
export const ammunitionCapacity=actor=>characterProfile(actor).capacity;
export function assignRoundCharacters(state,selection){
 const selected=normalizeCharacter(selection),remaining=CHARACTER_IDS.filter(id=>id!==selected);
 for(const [index,actor] of state.actors.entries()){
  actor.characterClass=actor.id==='player'?selected:remaining.shift()||CHARACTER_IDS[index%3];
  actor.ammo=ammunitionCapacity(actor);actor.load=1;
 }
 return state;
}
export function aerialAttack(actor){
 const flight=actor?.flight;
 if(!flight||['wallHold','wallJump','surfaceHop','fall'].includes(flight.kind))return null;
 const profile=characterProfile(actor),double=flight.jumps>=2;
 if(profile.id==='heavy')return {kind:'bodySlam',damage:double?profile.doubleDamage:profile.normalDamage,ammo:0,double};
 if(profile.id==='skinny')return {kind:'airKick',damage:double?profile.doubleDamage:profile.normalDamage,ammo:0,double};
 // Existing saves without a class keep the established three-fly air volley.
 const radial=actor.characterClass==='medium'&&double;
 return {kind:radial?'radialFlyBurst':'threeFlyBurst',count:radial?8:3,ammo:radial?8:3,double};
}
export function flyBurstDirections(actor,spread=.48){
 const plan=aerialAttack(actor);if(!plan||!['radialFlyBurst','threeFlyBurst'].includes(plan.kind))return [];
 const x=Number(actor.aimX)||0,z=Number(actor.aimZ)||0,yaw=Math.hypot(x,z)>1e-8?Math.atan2(x,z):0;
 const offsets=plan.kind==='radialFlyBurst'?Array.from({length:8},(_,i)=>i*Math.PI/4):[-spread,0,spread];
 return offsets.map(offset=>({x:Math.sin(yaw+offset),z:Math.cos(yaw+offset)}));
}

export function ensureRoundCharacters(state){
 const used=new Set(state.actors.map(a=>a.characterClass).filter(id=>CHARACTER_IDS.includes(id)));
 for(const actor of state.actors)if(!CHARACTER_IDS.includes(actor.characterClass)){actor.characterClass=CHARACTER_IDS.find(id=>!used.has(id))||'medium';used.add(actor.characterClass);}
 return state;
}
