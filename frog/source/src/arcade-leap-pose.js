import {Vector3,Quaternion} from 'three';
// Research: Li et al.2021, doi:10.1002/ece3.7589, Fig.2.
// The prolonged extension is deliberately timed for the game's larger leaps.
const cache=new WeakMap(),clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),smooth=v=>{v=clamp(v);return v*v*(3-2*v);};
function chain(model,names){
 const [root,middle,end,tip]=names.map(n=>model.bones[n]),first=middle.position.clone(),second=end.position.clone();
 return {root,middle,end,tip,first,second,third:tip?.position.clone(),l1:first.length(),l2:second.length(),previous:[root.quaternion.clone(),middle.quaternion.clone(),end.quaternion.clone()],target:new Vector3(),direction:new Vector3(),pole:new Vector3(),knee:new Vector3(),lower:new Vector3(),rootQ:new Quaternion(),worldLower:new Quaternion(),middleQ:new Quaternion(),endQ:new Quaternion(),parentQ:new Quaternion(),goal:[new Quaternion(),new Quaternion(),new Quaternion()]};
}
function solve(c,target,pole,footDirection){
 const distance=clamp(target.length(),Math.abs(c.l1-c.l2)+1e-5,(c.l1+c.l2)*.995);
 c.direction.copy(target).normalize();c.pole.copy(pole).addScaledVector(c.direction,-pole.dot(c.direction)).normalize();
 const along=(c.l1*c.l1-c.l2*c.l2+distance*distance)/(2*distance),bend=Math.sqrt(Math.max(0,c.l1*c.l1-along*along));
 c.knee.copy(c.direction).multiplyScalar(along).addScaledVector(c.pole,bend);
 c.lower.copy(c.direction).multiplyScalar(distance).sub(c.knee);
 c.rootQ.setFromUnitVectors(c.target.copy(c.first).normalize(),c.direction.copy(c.knee).normalize());
 c.worldLower.setFromUnitVectors(c.target.copy(c.second).normalize(),c.direction.copy(c.lower).normalize());
 c.middleQ.copy(c.rootQ).invert().multiply(c.worldLower);
 c.parentQ.copy(c.rootQ).multiply(c.middleQ);
 if(c.third&&footDirection)c.endQ.setFromUnitVectors(c.target.copy(c.third).normalize(),c.direction.copy(footDirection).normalize());
 else c.endQ.identity();
 c.endQ.premultiply(c.parentQ.invert());
}
export function applyLeapPose(model,flight,dt=1/60,hopProgress=null){
 const strong=!!flight||Number.isFinite(hopProgress);
 if(!strong){cache.delete(model);return;}
 let c=cache.get(model);if(!c){c={hind:[],fore:[],target:new Vector3(),pole:new Vector3(),foot:new Vector3()};for(const side of [-1,1]){c.hind.push(chain(model,['hip'+side,'knee'+side,'ankle'+side,'foot'+side]));c.fore.push(chain(model,['shoulder'+side,'elbow'+side,'wrist'+side]));}cache.set(model,c);}
 const progress=Number.isFinite(hopProgress)&&!flight?clamp(hopProgress):clamp(Number.isFinite(flight.poseProgress)?flight.poseProgress:.5-flight.vy/(2*Math.max(1,flight.launchVelocity))),extension=smooth(progress/.04)*(1-smooth((progress-.73)/.25)),prepare=smooth((progress-.60)/.35),blend=1-Math.exp(-Math.max(0,dt)*40);
 for(let i=0;i<2;i++){
  const side=i===0?-1:1,h=c.hind[i],arm=c.fore[i],length=h.l1+h.l2;
  c.target.set(side*.09,-.18,-1).normalize().multiplyScalar(length*.99);c.pole.set(side,0,.08);c.foot.set(side*.02,-.035,-1);
  solve(h,c.target,c.pole,c.foot);
  const joints=[h.root,h.middle,h.end],targets=[h.rootQ,h.middleQ,h.endQ];
  for(let j=0;j<3;j++){h.goal[j].copy(joints[j].quaternion).slerp(targets[j],extension);h.previous[j].slerp(h.goal[j],blend);joints[j].quaternion.copy(h.previous[j]);}
  if(h.tip)h.tip.rotation.x*=1-extension;
  // Arms lift on departure, then reach forward/down for first ground contact.
  c.target.copy(arm.first).add(arm.second);c.target.y+=.09*(1-prepare)-.10*prepare;c.target.z+=-.10*(1-prepare)+.24*prepare;c.pole.set(side,-.4,0);
  solve(arm,c.target,c.pole,null);
  for(const [bone,q] of [[arm.root,arm.rootQ],[arm.middle,arm.middleQ],[arm.end,arm.endQ]])bone.quaternion.slerp(q,Math.max(extension,prepare*.7));
 }
}
