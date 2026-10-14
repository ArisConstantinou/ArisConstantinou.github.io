// Retains the finite torch/transfer semantics of the accepted fire sample.
import {FireSpell,FIRE_RANGE,FIRE_COST,TRANSFER_TIME} from './fire.js';
export class AbsorbedFire extends FireSpell{
 constructor(torches){super(torches[0]);this.torches=torches;}
 reset(){super.reset();if(this.torches)for(const t of this.torches)t.lit=true;}
 source(player,clear,held){
  if(this.charged||held||player.mana<FIRE_COST)return null;
  return this.torches.filter(t=>t.lit&&Math.hypot(t.position.x-player.body.position.x,t.position.z-player.body.position.z)<=FIRE_RANGE&&clear(player.body.position,t.position)).sort((a,b)=>a.position.distanceTo(player.body.position)-b.position.distanceTo(player.body.position))[0]||null;
 }
 take(player,clear,held,time){const t=this.source(player,clear,held);if(!t)return false;this.torch=t;return super.take(player,clear,held,time);}
 ignite(item,time){
  if(!['crate','barrel','door'].includes(item?.kind))return false;
  if(!this.charged||time<this.readyAt||item.removed||item.burnUntil>time)return false;
  this.charged=false;item.burnUntil=time+8;item.fireSampleCrate=true;return true;
 }
}
