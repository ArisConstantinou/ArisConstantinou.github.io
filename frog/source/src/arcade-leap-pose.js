import {Vector3,Quaternion} from 'three';
// Research: Li et al.2021, doi:10.1002/ece3.7589, Fig.2.
// The prolonged extension is deliberately timed for the game's larger leaps.
const cache=new WeakMap(),clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),smooth=v=>{v=clamp(v);return v*v*(3-2*v);};
function chain(model,names){
 const [root,middle,end,tip]=names.map(n=>model.bones[n]),first=middle.position.clone(),second=end.position.clone();
 const c={root,middle,end,tip,first,second,third:tip?.position.clone(),l1:first.length(),l2:second.length(),previous:[root.quaternion.clone(),middle.quaternion.clone(),end.quaternion.clone()],target:new Vector3(),direction:new Vector3(),pole:new Vector3(),knee:new Vector3(),lower:new Vector3(),rootQ:new Quaternion(),worldLower:new Quaternion(),middleQ:new Quaternion(),endQ:new Quaternion(),parentQ:new Quaternion(),goal:[new Quaternion(),new Quaternion(),new Quaternion()]};
 if(model.restPose)configureBindChain(c,model.restPose);
 return c;
}
// Bind vectors and requested targets share the chain root-parent frame.
// Keep the legacy path below unchanged when a model has no restPose metadata.
function bindEntry(restPose,bone){
 const entry=restPose[bone.name];if(!entry)throw new Error('Missing bind/rest transform for '+bone.name);
 const read=(value,n,label)=>{const a=value?.toArray?value.toArray():value?Array.from(value):null;if(!a||a.length!==n||!a.every(Number.isFinite))throw new Error('Invalid '+label+' for '+bone.name);return a;};
 const position=new Vector3().fromArray(read(entry.position,3,'bind position'));
 const quaternion=new Quaternion().fromArray(read(entry.quaternion,4,'bind quaternion'));if(quaternion.lengthSq()<1e-12)throw new Error('Zero bind quaternion for '+bone.name);quaternion.normalize();
 const scale=entry.scale?read(entry.scale,3,'bind scale'):[1,1,1];if(scale.some(v=>Math.abs(v-1)>1e-4))throw new Error('Normalize bind limb scales before IK: '+bone.name);
 return {position,quaternion};
}
function configureBindChain(c,restPose){
 const r=bindEntry(restPose,c.root),m=bindEntry(restPose,c.middle),e=bindEntry(restPose,c.end),t=c.tip?bindEntry(restPose,c.tip):null;
 c.restAware=true;c.bind={root:r.quaternion,middle:m.quaternion,end:e.quaternion,tip:t?.quaternion,middleWorld:r.quaternion.clone().multiply(m.quaternion),endWorld:r.quaternion.clone().multiply(m.quaternion).multiply(e.quaternion)};
 c.first.copy(m.position).applyQuaternion(c.bind.root);c.second.copy(e.position).applyQuaternion(c.bind.middleWorld);if(t)c.third.copy(t.position).applyQuaternion(c.bind.endWorld);
 c.l1=c.first.length();c.l2=c.second.length();if(c.l1<1e-8||c.l2<1e-8)throw new Error('Zero bind limb length');
 c.restNormal=new Vector3().crossVectors(c.first,c.second);
 if(c.restNormal.lengthSq()<1e-16){c.restNormal.set(0,0,1).applyQuaternion(c.bind.root).addScaledVector(c.direction.copy(c.first).normalize(),-c.restNormal.dot(c.direction));if(c.restNormal.lengthSq()<1e-16)c.restNormal.set(1,0,0).applyQuaternion(c.bind.root).projectOnPlane(c.direction);}
 c.restNormal.normalize();c.targetNormal=new Vector3();
 c.bindWork={axis:new Vector3(),from:new Vector3(),to:new Vector3(),cross:new Vector3(),swing:new Quaternion(),twist:new Quaternion()};
}
function orientBindAxis(c,restAxis,targetAxis,bindQuaternion,targetNormal,out){
 const w=c.bindWork;w.axis.copy(targetAxis).normalize();w.swing.setFromUnitVectors(w.from.copy(restAxis).normalize(),w.axis);out.copy(w.swing).multiply(bindQuaternion);
 w.from.copy(c.restNormal).applyQuaternion(w.swing).projectOnPlane(w.axis);w.to.copy(targetNormal).projectOnPlane(w.axis);
 if(w.from.lengthSq()>1e-16&&w.to.lengthSq()>1e-16){w.from.normalize();w.to.normalize();const angle=Math.atan2(w.cross.crossVectors(w.from,w.to).dot(w.axis),clamp(w.from.dot(w.to),-1,1));out.premultiply(w.twist.setFromAxisAngle(w.axis,angle));}
 return out.normalize();
}
function solveBindLimb(c,target,pole,footDirection){
 const total=c.l1+c.l2,requested=target.length(),distance=clamp(requested,Math.abs(c.l1-c.l2)+Math.max(1e-8,total*1e-7),total*(1-1e-7));
 c.direction.copy(target);if(c.direction.lengthSq()<1e-20)c.direction.copy(c.first).add(c.second);if(c.direction.lengthSq()<1e-20)c.direction.copy(c.first);c.direction.normalize();
 c.pole.copy(pole||c.first).projectOnPlane(c.direction);
 if(c.pole.lengthSq()<1e-16)c.pole.crossVectors(c.direction,c.restNormal);
 if(c.pole.lengthSq()<1e-16)c.pole.set(Math.abs(c.direction.x)<.8?1:0,Math.abs(c.direction.x)<.8?0:1,0).projectOnPlane(c.direction);
 c.pole.normalize();const along=(c.l1*c.l1-c.l2*c.l2+distance*distance)/(2*distance),bend=Math.sqrt(Math.max(0,c.l1*c.l1-along*along));
 c.knee.copy(c.direction).multiplyScalar(along).addScaledVector(c.pole,bend);c.lower.copy(c.direction).multiplyScalar(distance).sub(c.knee);c.targetNormal.crossVectors(c.knee,c.lower).normalize();
 orientBindAxis(c,c.first,c.knee,c.bind.root,c.targetNormal,c.rootQ);orientBindAxis(c,c.second,c.lower,c.bind.middleWorld,c.targetNormal,c.worldLower);
 c.middleQ.copy(c.rootQ).invert().multiply(c.worldLower).normalize();c.parentQ.copy(c.rootQ).multiply(c.middleQ);
 if(c.third&&footDirection&&footDirection.lengthSq()>1e-20)orientBindAxis(c,c.third,footDirection,c.bind.endWorld,c.targetNormal,c.endQ);else c.endQ.copy(c.bind.endWorld);
 c.endQ.premultiply(c.parentQ.invert()).normalize();c.reachDistance=distance;c.reachClamped=Math.abs(distance-requested)>1e-7;
}


function solve(c,target,pole,footDirection){
 if(c.restAware)return solveBindLimb(c,target,pole,footDirection);
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
 const progress=Number.isFinite(hopProgress)&&!flight?clamp(hopProgress):clamp(Number.isFinite(flight.poseProgress)?flight.poseProgress:.5-flight.vy/(2*Math.max(1,flight.launchVelocity))),extension=flight?.kind==='wallHold'?1:smooth(progress/.04)*(1-smooth((progress-.73)/.25)),prepare=smooth((progress-.60)/.35),blend=1-Math.exp(-Math.max(0,dt)*40);
 for(let i=0;i<2;i++){
  const side=i===0?-1:1,h=c.hind[i],arm=c.fore[i],length=h.l1+h.l2;
  if(flight?.kind==='wallHold')c.target.set(side*.03,.01,model.stats.imported?-.22:-.31);else c.target.set(side*.09,-.18,-1).normalize().multiplyScalar(length*.99);c.pole.set(side,0,.08);c.foot.set(side*.02,-.035,-1);
  solve(h,c.target,c.pole,c.foot);
  const joints=[h.root,h.middle,h.end],targets=[h.rootQ,h.middleQ,h.endQ];
  for(let j=0;j<3;j++){h.goal[j].copy(joints[j].quaternion).slerp(targets[j],extension);h.previous[j].slerp(h.goal[j],blend);joints[j].quaternion.copy(h.previous[j]);}
  if(h.tip){if(h.restAware)h.tip.quaternion.slerp(h.bind.tip,extension);else h.tip.rotation.x*=1-extension;}
  // Arms lift on departure, then reach forward/down for first ground contact.
  c.target.copy(arm.first).add(arm.second);c.target.y+=.09*(1-prepare)-.10*prepare;c.target.z+=-.10*(1-prepare)+.24*prepare;c.pole.set(side,-.4,0);
  solve(arm,c.target,c.pole,null);
  for(const [bone,q] of [[arm.root,arm.rootQ],[arm.middle,arm.middleQ],[arm.end,arm.endQ]])bone.quaternion.slerp(q,Math.max(extension,prepare*.7));
 }
}

export {chain as createLimbChain,solve as solveLimbChain};


