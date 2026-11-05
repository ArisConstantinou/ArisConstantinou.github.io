import * as THREE from 'three';
export const MOTION_MASS=Object.freeze({heavy:{gain:1,recover:.76,land:.24,cycle:4.8},medium:{gain:.82,recover:.72,land:.18,cycle:4.0},skinny:{gain:.94,recover:.68,land:.12,cycle:3.3}});
const smooth=x=>{x=THREE.MathUtils.clamp(x,0,1);return x*x*(3-2*x)};
function snapshot(scene){const rows=[];scene.traverse(o=>rows.push([o,o.position.clone(),o.quaternion.clone(),o.scale.clone(),o.morphTargetInfluences?.slice()]));return()=>{for(const[o,p,q,s,m]of rows){o.position.copy(p);o.quaternion.copy(q);o.scale.copy(s);if(m)o.morphTargetInfluences.splice(0,m.length,...m)}scene.updateMatrixWorld(true)}}
function sampler(scene,clip){const tracks=clip.tracks.map(t=>({binding:THREE.PropertyBinding.create(scene,t.name),value:t.createInterpolant()}));for(const t of tracks)t.binding.bind();return {sample(t){for(const c of tracks)c.binding.setValue(c.value.evaluate(t),0);scene.updateMatrixWorld(true)},dispose(){for(const t of tracks)t.binding.unbind()}}}
const bonesOf=scene=>{const map={};scene.traverse(o=>{if(o.isBone)map[o.name]=o});return map};
// Retarget world rotations relative to each model's actual idle pose. Bone
// positions/lengths and extra eyes/digits remain owned by the target skeleton.
export function retargetBodyClip(source,target,sourceClip,{sourceBase,targetBase,name=sourceClip.name,gain=1}={}){
 const restoreSource=snapshot(source.scene),restoreTarget=snapshot(target.scene),sb=bonesOf(source.scene),tb=bonesOf(target.scene),a=sampler(source.scene,sourceClip),baseA=sampler(source.scene,sourceBase),baseB=sampler(target.scene,targetBase);
 try{
  baseA.sample(0);baseB.sample(0);
  const sourceRig=sb.pelvis.parent,sourceBaseRigQ=sourceRig.getWorldQuaternion(new THREE.Quaternion()),sourceBasePelvis=sourceRig.worldToLocal(sb.pelvis.getWorldPosition(new THREE.Vector3())),targetPelvis=tb.pelvis.getWorldPosition(new THREE.Vector3()),parentPosition=tb.pelvis.parent.getWorldPosition(new THREE.Vector3());
  const baseWorld=Object.fromEntries(Object.entries(tb).map(([n,b])=>[n,b.getWorldQuaternion(new THREE.Quaternion())])),baseLocal=Object.fromEntries(Object.entries(tb).map(([n,b])=>[n,{q:b.quaternion.clone(),p:b.position.clone()}])),sourceWorld=Object.fromEntries(Object.entries(sb).map(([n,b])=>[n,b.getWorldQuaternion(new THREE.Quaternion())]));
  const height=b=>b.head.getWorldPosition(new THREE.Vector3()).distanceTo(b.pelvis.getWorldPosition(new THREE.Vector3())),ratio=height(tb)/Math.max(.01,height(sb)),ordered=[];target.scene.traverse(o=>{if(o.isBone)ordered.push(o)});
  const sourceBelly=sb.belly?.position.clone(),sourceBellyQ=sb.belly?.parent.getWorldQuaternion(new THREE.Quaternion()),targetBellyQ=tb.belly?.parent.getWorldQuaternion(new THREE.Quaternion()).invert();
  const count=Math.max(2,Math.ceil(sourceClip.duration*30)+1),times=Float32Array.from({length:count},(_,i)=>sourceClip.duration*i/(count-1)),values=Object.fromEntries(ordered.map(b=>[b.name,[]])),pelvisValues=[],bellyValues=[];
  for(const time of times){
   a.sample(time);if(sourceBelly&&tb.belly){const offset=sb.belly.position.clone().sub(sourceBelly).applyQuaternion(sourceBellyQ).applyQuaternion(targetBellyQ).multiplyScalar(ratio*gain);bellyValues.push(...baseLocal.belly.p.clone().add(offset).toArray());}const desired=new Map();
   for(const b of ordered){const parentQ=desired.get(b.parent)||b.parent.getWorldQuaternion(new THREE.Quaternion());let world;
    if(sb[b.name]){let delta=sb[b.name].getWorldQuaternion(new THREE.Quaternion()).multiply(sourceWorld[b.name].clone().invert());if(['pelvis','spine','belly','neck'].includes(b.name))delta=new THREE.Quaternion().slerp(delta,gain);world=delta.multiply(baseWorld[b.name]);}
    else world=parentQ.clone().multiply(baseLocal[b.name].q);
    desired.set(b,world);values[b.name].push(...parentQ.clone().invert().multiply(world).normalize().toArray());
   }
   const shift=sourceRig.worldToLocal(sb.pelvis.getWorldPosition(new THREE.Vector3())).sub(sourceBasePelvis).applyQuaternion(sourceBaseRigQ).multiplyScalar(ratio);
   const parentQ=desired.get(tb.pelvis.parent)||tb.pelvis.parent.getWorldQuaternion(new THREE.Quaternion());pelvisValues.push(...targetPelvis.clone().add(shift).sub(parentPosition).applyQuaternion(parentQ.clone().invert()).toArray());
  }
  const tracks=ordered.flatMap(b=>[new THREE.QuaternionKeyframeTrack(b.name+'.quaternion',times,values[b.name]),new THREE.VectorKeyframeTrack(b.name+'.position',[0,sourceClip.duration],[...baseLocal[b.name].p.toArray(),...baseLocal[b.name].p.toArray()])]);
  if(bellyValues.length)tracks.splice(tracks.findIndex(t=>t.name==='belly.position'),1,new THREE.VectorKeyframeTrack('belly.position',times,bellyValues));
  tracks.splice(tracks.findIndex(t=>t.name==='pelvis.position'),1,new THREE.VectorKeyframeTrack('pelvis.position',times,pelvisValues));return new THREE.AnimationClip(name,sourceClip.duration,tracks);
 }finally{a.dispose();baseA.dispose();baseB.dispose();restoreSource();restoreTarget()}
}
function plantedIdle(n1){const hop=n1.animations.find(c=>c.name==='Hop'),times=[0,.6,1.2,1.8,2.4];return new THREE.AnimationClip('Idle',2.4,hop.tracks.filter(t=>!t.name.startsWith('Fatty_N1_Rig.')).map(t=>{const size=t.getValueSize(),base=Array.from(t.createInterpolant().evaluate(0));if(t.name.endsWith('.morphTargetInfluences'))return new THREE.NumberKeyframeTrack(t.name,times,times.flatMap((_,i)=>base.map((v,k)=>k===0?[.4,.55,.4,.25,.4][i]:v)));return new t.constructor(t.name,[0,2.4],[...base,...base])}))}
export function prepareFullBodyAssets({n1,heavy,medium,skinny}){
 const n1Idle=plantedIdle(n1),n1Base=n1.animations.find(c=>c.name==='Hop'),originalN1={...n1,animations:[...n1.animations]},sourceBase=heavy.animations.find(c=>c.name==='Idle');
 const extras=heavy.animations.filter(c=>!['Idle','JumpProof','RuntimeReady'].includes(c.name)).map(c=>retargetBodyClip(heavy,n1,c,{sourceBase,targetBase:n1Base}));
 n1.animations=[...n1.animations.filter(c=>['Hop','Jump'].includes(c.name)).map(c=>new THREE.AnimationClip('FullBody'+c.name,c.duration,c.tracks.filter(t=>!t.name.startsWith('Fatty_N1_Rig.position')))),n1Idle,...extras];
 for(const alias of ['Walk','MenuPerformance']){const copy=n1Idle.clone();copy.name=alias;n1.animations.push(copy)}n1.userData={n1:true,motionMass:'heavy'};
 for(const[id,target]of Object.entries({medium,skinny})){const base=target.animations.find(c=>c.name==='Idle');for(const name of ['Hop','Jump'])target.animations.push(retargetBodyClip(originalN1,target,originalN1.animations.find(c=>c.name===name),{sourceBase:n1Base,targetBase:base,name:'FullBody'+name,gain:MOTION_MASS[id].gain}));target.userData={...target.userData,motionMass:id};}
 return{heavy:n1,medium,skinny};
}
export function fullBodyPhase(state,actor,id){const p=THREE.MathUtils.clamp(state.hop?.progress||0,0,1),mass=MOTION_MASS[id];if(state.hop?.phase==='land')return .66+.34*smooth(Math.pow(p,mass.land/.18));if(state.hop?.phase==='air'){const recovery=p+(.72-mass.recover)*Math.sin(Math.PI*p);return .24+.42*recovery}return null}
export function showcasePose(model,seconds,active=false){const mass=MOTION_MASS[model.stats.characterClass],period=mass.cycle,clock=seconds%period,duration=model.stats.characterClass==='heavy'?.9:model.stats.characterClass==='medium'?.78:.62;model.group.position.y=0;if(clock<duration){const t=clock/duration;model.sampleFullBody('Hop',t);const u=(t-.24)/.42;if(u>0&&u<1)model.group.position.y=(.025*(1-u)+.48*u*(1-u))*(model.stats.n1?1.45:1.8);return'Hop'}model.update(1/30,{speed:0,hop:{phase:'idle',progress:0}});return'Idle'}
