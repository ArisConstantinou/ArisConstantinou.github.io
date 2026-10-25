import {WORLD_SCALE,WORLD_REVISION,SHELTER_LAYOUT_SCALE} from './world-config.js';

/** Expand an old save once, retaining armies, camp ownership and local layouts. */
export function migrateWorldSave(save) {
  if ((save.worldRevision || 1) >= WORLD_REVISION) return save;
  const camps=save.camps.filter(c=>c&&Number.isFinite(c.x)&&Number.isFinite(c.z));
  const oldCenters=camps.map(c=>({id:c.id,x:c.x,z:c.z}));
  for (const actor of [save.player,...save.frogs]) {
    if(!actor||!Number.isFinite(actor.x)||!Number.isFinite(actor.z))continue;
    const nearby=oldCenters.filter(c=>Math.hypot(c.x-actor.x,c.z-actor.z)<18)
      .sort((a,b)=>Math.hypot(a.x-actor.x,a.z-actor.z)-Math.hypot(b.x-actor.x,b.z-actor.z))[0];
    if(nearby){actor.x=nearby.x*WORLD_SCALE+(actor.x-nearby.x)*SHELTER_LAYOUT_SCALE;actor.z=nearby.z*WORLD_SCALE+(actor.z-nearby.z)*SHELTER_LAYOUT_SCALE;}
    else {actor.x*=WORLD_SCALE;actor.z*=WORLD_SCALE;}
  }
  let rivalIndex=0;
  for(const camp of camps){
    if(camp.originalEnemy){camp.rivalIndex??=rivalIndex;camp.originalTeam??=camp.team?.startsWith('enemy')?camp.team:`enemy${rivalIndex}`;rivalIndex++;}
    camp.x*=WORLD_SCALE;camp.z*=WORLD_SCALE;
    for(const placement of Object.values(camp.buildingPlacements||{})){
      if(placement&&Number.isFinite(placement.x)&&Number.isFinite(placement.z)){placement.x*=SHELTER_LAYOUT_SCALE;placement.z*=SHELTER_LAYOUT_SCALE;}
    }
  }
  for(const camp of camps)if(camp.buildingPlacements)delete camp.buildingPlacements.palisade;
  save.worldRevision=WORLD_REVISION;
  return save;
}
