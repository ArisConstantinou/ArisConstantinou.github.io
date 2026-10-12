import {lineClear} from './systems.js';
// Gameplay clocks freeze with pause. Drawing fire has no upkeep cost.
export function fireSight(a,b,obstacles){return lineClear(a,b,obstacles.filter(o=>o.y+o.h/2>1.15&&!(o.tag==='fire-pylon'&&b.y>o.y+o.h/2&&Math.abs(b.x-o.x)<o.w/2&&Math.abs(b.z-o.z)<o.d/2)),.02);}
export const FIRE_COST=3, FIRE_RANGE=5, TRANSFER_TIME=.45;
export const WOOD_BURN_TIME=45, CRATE_BURN_TIME=WOOD_BURN_TIME;
export const ACTOR_BURN_TIME=6, BURN_INTERVAL=.5, BURN_DAMAGE=2;
export class FireSpell {
  constructor(sources){this.sources=Array.isArray(sources)?sources:[sources];this.reset();}
  reset(){this.charged=false;this.readyAt=0;this.takenAt=null;this.torch=null;this.hit=null;for(const s of this.sources)s.lit=true;}
  sourceFor(player,clear,preferred){
    if(!player||player.mana<FIRE_COST)return null;
    const p=player.body.position;
    const sources=this.sources.filter(s=>s.lit&&Math.hypot(p.x-s.position.x,p.z-s.position.z)<=FIRE_RANGE&&clear(p,s.position));
    const aimed=preferred&&sources.filter(s=>Math.hypot(preferred.x-s.position.x,preferred.z-s.position.z)<1.8);
    return (aimed?.length?aimed:sources).sort((a,b)=>Math.hypot(p.x-a.position.x,p.z-a.position.z)-Math.hypot(p.x-b.position.x,p.z-b.position.z))[0]||null;
  }
  available(player,clear,_held,preferred){return !!this.sourceFor(player,clear,preferred);}
  take(player,clear,_held,time,preferred){
    const source=this.sourceFor(player,clear,preferred);if(!source)return false;
    player.mana-=FIRE_COST;if(!source.infinite)source.lit=false;
    this.torch=source;this.charged=true;this.takenAt=time;this.readyAt=time+TRANSFER_TIME;return true;
  }
  ignite(wood,time){return this.charged&&time>=this.readyAt&&igniteWood(wood,time);}
}
export function igniteWood(wood,time){
  if(!wood?.flammable||wood.removed||wood.woodExhausted||wood.burnUntil>time)return false;
  wood.burnUntil=time+WOOD_BURN_TIME;wood.burnLastTime=time;wood.woodFuel??=1;wood.body?.wakeUp();return true;
}
export function consumeWoodDamage(wood,time){
  if(wood.burnLastTime===undefined)return 0;
  const end=Math.min(time,wood.burnUntil),elapsed=Math.max(0,end-wood.burnLastTime);
  wood.burnLastTime=end;wood.woodFuel=Math.max(0,(wood.woodFuel??1)-elapsed/WOOD_BURN_TIME);
  wood.woodExhausted=wood.woodFuel<1e-8;
  return elapsed/WOOD_BURN_TIME*(wood.maxHp||0)*(wood.woodFraction??1);
}
export function igniteActor(actor,time){
  if(actor.burnUntil>time)return false;
  actor.burnUntil=time+ACTOR_BURN_TIME;actor.nextBurnTick=time+BURN_INTERVAL;return true;
}
export function consumeBurnDamage(actor,time){
  let amount=0;
  while(actor.nextBurnTick<=time+1e-9&&actor.nextBurnTick<=actor.burnUntil+1e-9){
    amount+=BURN_DAMAGE;actor.nextBurnTick+=BURN_INTERVAL;
  }
  return amount;
}
export function spreadFire(source,target,time){
  if(!(source?.burnUntil>time)||source.removed||target?.removed)return false;
  if(target?.flammable)return igniteWood(target,time);
  return target?.category==='actor'&&!target.isPlayer&&!target.ally&&!target.dead?igniteActor(target,time):false;
}
