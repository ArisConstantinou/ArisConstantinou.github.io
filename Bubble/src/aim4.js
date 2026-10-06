/* Mobile targeting: aim is independent from locomotion and from the trigger.
 * Assist selects a point, never assigns a hit or bypasses world collision. */
import {add,sub,mul,norm,len,dot,dist,clamp,cross} from './engine.js';
import {regionPoint} from './knights4.js?v=0.4.1';

export function aimState(g){
 return g.touchAim??=( {yaw:g.player.yaw,range:7,target:null,point:null,hasIntent:false} );
}
function available(g,a){
 return a&&(!a.captured||g.tool==='strand')&&dist(g.player.p,a.p)<19&&Math.abs(g.player.p[1]-a.p[1])<5;
}
function pointOnTarget(g,a,origin){
 if(a===g.boss){
  if(a.state==='captured')return null;const p=add(a.p,[0,2,0]),d=sub(p,origin);
  return g.world.ray(origin,norm(d),Math.max(0,len(d)-1.6))?null:{p,region:'boss'};
 }
 return regionPoint(a,g.zoneName,origin,g.world,g.time);
}
function mayTarget(g){return g.tool==='splat'||g.tool==='strand'||(g.tool==='flow'&&g.form==='mass');}
function finishAim(g,pointAt,target,region){
 const origin=add(g.player.p,[0,1.50,0]),delta=sub(pointAt,origin),distance=len(delta);
 let dir=norm(delta),surface=g.world.ray(origin,dir,Math.min(30,distance+.12));
 // If the muzzle cannot see it, the wall/cover is the aim endpoint instead.
 if(surface&&surface.t<distance-.23){pointAt=surface.p;target=null;region=null;}
 if(target)aimState(g).point=null;
 g.aim={point:pointAt,dir:norm(sub(pointAt,origin)),actor:target&&target!==g.boss?target:null,region,surface,boss:target===g.boss};
 const d=sub(pointAt,g.player.p);if(Math.hypot(d[0],d[2])>.01)g.player.yaw=Math.atan2(d[0],d[2]);
}
export function updateMobileAim(g){
 const p=g.player,state=aimState(g),origin=add(p.p,[0,1.5,0]);
 const input=g.input.aim,magnitude=len(input),manual=magnitude>.055;
 if(manual){
  const cameraForward=norm(sub(g.camera.target,g.camera.eye));
  const right=norm(cross(cameraForward,[0,1,0])),forward=norm([cameraForward[0],0,cameraForward[2]]);
  const d=norm(add(mul(right,input[0]),mul(forward,-input[1])));
  state.yaw=Math.atan2(d[0],d[2]);state.range=2.2+10.8*clamp(magnitude,0,1);
  state.hasIntent=true;state.point=null;
 }else if(!state.hasIntent)state.yaw=p.yaw;
 const direction=[Math.sin(state.yaw),0,Math.cos(state.yaw)];
 let selected=null,selectedPoint=null;
 if(mayTarget(g)){
  const all=[...g.knights,...(g.boss?[g.boss]:[])];
  const current=all.find(a=>a.id===state.target);
  if(available(g,current)){
   const toward=norm([current.p[0]-p.p[0],0,current.p[2]-p.p[2]]);
   // Retain a deliberate lock while strafing. Strong manual steering releases it.
   if(!manual||dot(toward,direction)>.72){
    const q=pointOnTarget(g,current,origin);if(q){selected=current;selectedPoint=q;}
   }
  }
  if(!selected&&manual){
   let best=Infinity;
   for(const a of all){
    if(!available(g,a))continue;
    const flat=norm([a.p[0]-p.p[0],0,a.p[2]-p.p[2]]),alignment=dot(flat,direction);
    if(alignment<.82)continue;
    const q=pointOnTarget(g,a,origin);if(!q)continue;
    const score=(1-alignment)*30+dist(a.p,p.p)*.12;
    if(score<best){best=score;selected=a;selectedPoint=q;}
   }
  }
 }
 if(selected){
  state.target=selected.id;state.hasIntent=true;
  finishAim(g,selectedPoint.p,selected,selectedPoint.region);
  // Clear a lock hidden by a newly created obstruction; it cannot track through it.
  if(!g.aim.actor&&!g.aim.boss)state.target=null;
  return;
 }
 state.target=null;
 if(state.point){finishAim(g,state.point,null,null);return;}
 // No target: the reticle is on the chosen ground distance, not 13m away at a
 // fixed, almost-horizontal angle. FLOW can now place small nearby patches.
 const range=g.tool==='flow'||g.tool==='erase'?Math.min(9,state.range):state.range;
 const desired=add(p.p,mul(direction,range));
 const support=g.world.support(desired[0],desired[2],p.p[1]+.25,.25);
 desired[1]=support&&Math.abs(support.h-p.p[1])<3?support.h+.025:p.p[1]+.025;
 finishAim(g,desired,null,null);
}
export function tapMobileAim(g,x,y){
 if(!g.playing()||g.cameraMode!=='top')return false;
 g.setCamera();const state=aimState(g),origin=add(g.player.p,[0,1.5,0]);
 let best=null,bestPoint=null,bestDistance=35;
 if(mayTarget(g))for(const a of [...g.knights,...(g.boss?[g.boss]:[])]){
  if(!available(g,a))continue;
  const q=pointOnTarget(g,a,origin);if(!q)continue;
  // Tap a generous on-screen silhouette, rather than a tiny moving joint.
  const screen=g.project(add(a.p,[0,a===g.boss?2:1.25,0]));if(!screen.visible)continue;
  const distance=Math.hypot(screen.x-x,screen.y-y);
  if(distance<bestDistance){bestDistance=distance;best=a;bestPoint=q;}
 }
 state.hasIntent=true;
 if(best){
  state.target=best.id;state.point=null;
  state.yaw=Math.atan2(best.p[0]-g.player.p[0],best.p[2]-g.player.p[2]);
  finishAim(g,bestPoint.p,best,bestPoint.region);return true;
 }
 // Match the top-down cutaway but still resolve the final shot from the muzzle.
 const ray=g.screenRay(x,y);if(ray.d[1]<-.01){const enter=(g.groundY+2.35-ray.o[1])/ray.d[1];if(enter>0)ray.o=add(ray.o,mul(ray.d,enter));}
 const surface=g.world.ray(ray.o,ray.d,80);
 let at=surface?.p;
 if(!at&&ray.d[1]<-.01){const t=(g.player.p[1]-ray.o[1])/ray.d[1];if(t>0)at=add(ray.o,mul(ray.d,t));}
 if(!at)return false;
 const d=sub(at,g.player.p);if(Math.hypot(d[0],d[2])<.9)return false;
 state.target=null;state.point=at.slice();state.yaw=Math.atan2(d[0],d[2]);state.range=clamp(Math.hypot(d[0],d[2]),2.2,18);
 finishAim(g,at,null,null);return true;
}
