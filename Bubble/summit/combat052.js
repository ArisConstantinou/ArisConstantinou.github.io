/* Close-range AI rules. The same 3D caps are enforced at acquisition AND fire.
 * A projectile has a finite travelled distance, independent of target selection. */
import {ROUTE,distance} from './physics.js?v=0.5.2';
export const COMBAT=Object.freeze({guardRange:38,racerRange:50,guardHeight:24,racerHeight:30,guardTerritory:60,guardProjectile:45,racerProjectile:58,playerProjectile:90,reaction:1.15,warmup:12});
export const combatDistance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);
export function inCombatRange(a,b){
 if(!a?.alive||!b?.alive||a.id===b.id)return false;
 const guard=a.kind==='guard';
 if(guard&&b.kind!=='racer')return false;
 if(combatDistance(a,b)>(guard?COMBAT.guardRange:COMBAT.racerRange)||Math.abs(a.y-b.y)>(guard?COMBAT.guardHeight:COMBAT.racerHeight))return false;
 if(guard&&a.home&&(distance(b,a.home)>COMBAT.guardTerritory||distance(a,a.home)>36))return false;
 return true;
}
export function mayEngage(game,a,b){
 if(!game.raceStarted||game.elapsed<COMBAT.warmup||!inCombatRange(a,b))return false;
 // A shared take-off sanctuary, not player-only immunity. No spawn dogpile.
 if(distance(a,ROUTE[0])<85||distance(b,ROUTE[0])<85)return false;
 return game.visible(a,b);
}
export function trackThreat(game,a,dt){
 const targets=game.bodies.filter(b=>mayEngage(game,a,b));
 // First detection needs the front cone; after detection one can track a
// visible nearby target. Walls and the range cutoff always cancel tracking.
 const eligible=targets.filter(b=>{
  if(a.threatId===b.id)return true;const dx=b.x-a.x,dz=b.z-a.z,d=Math.hypot(dx,dz);
  return d<10||(dx*Math.sin(a.yaw)+dz*Math.cos(a.yaw))/(d||1)>.30;
 });
 eligible.sort((b,c)=>combatDistance(a,b)-combatDistance(a,c));
 const target=eligible.find(b=>b.id===a.threatId)||eligible[0];
 if(!target){a.threatId=null;a.threatTime=0;return null;}
 if(a.threatId!==target.id){a.threatId=target.id;a.threatTime=0;}
 a.threatTime=(a.threatTime||0)+dt;
 if(a.threatTime>=COMBAT.reaction&&a.cooldown<=0)game.fire(a,target,false);
 return target;
}
export function projectileRange(a){return a.id===0?COMBAT.playerProjectile:a.kind==='guard'?COMBAT.guardProjectile:COMBAT.racerProjectile;}
export function threatLabel(game){
 const p=game.player;if(!p?.alive)return 'ΕΠΙΣΤΡΟΦΗ ΣΤΟ ΣΗΜΕΙΟ ΠΡΟΣΓΕΙΩΣΗΣ';
 const aimed=game.bodies.filter(a=>a.id!==0&&a.threatId===0&&mayEngage(game,a,p)).sort((a,b)=>combatDistance(a,p)-combatDistance(b,p));
 if(!aimed.length)return 'ΚΑΜΙΑ ΚΟΝΤΙΝΗ ΑΠΕΙΛΗ';
 const a=aimed[0];return (a.threatTime<COMBAT.reaction?'? ΣΕ ΕΝΤΟΠΙΖΕΙ':'ΣΕ ΣΤΟΧΕΥΕΙ')+' · '+a.name+' · '+Math.round(combatDistance(a,p))+' m';
}
