import * as THREE from './vendor/three.module.js';

// Authored 0 A.D. performance data, retargeted offline to each human rig.
// The compact bundle contains rotations, grounded root motion and palm grips;
// locomotion is sampled by metres travelled rather than a shared wall clock.
const metadataURL=new URL('./assets/models/human-motion.json',import.meta.url);
const clamp=THREE.MathUtils.clamp,mod=(x,n)=>(x%n+n)%n;
const finite=(x,f=0)=>Number.isFinite(x)?x:f;
const seedPhase=n=>mod((n+1)*.618033988749895,1);

export async function loadHumanMotion(){
 const response=await fetch(metadataURL);if(!response.ok)throw new Error('Human motion metadata '+response.status);
 const metadata=await response.json();if(metadata.schema!==1||!Array.isArray(metadata.tracks))throw new Error('Unsupported human motion bundle');
 const binaryResponse=await fetch(new URL(metadata.binary,metadataURL));if(!binaryResponse.ok)throw new Error('Human motion data '+binaryResponse.status);
 const buffer=await binaryResponse.arrayBuffer();if(buffer.byteLength!==metadata.bytes)throw new Error('Incomplete human motion data');
 const view=new DataView(buffer),models=new Map();
 function read(offset,count,encoding){const size=encoding==='snorm16'?2:4;if(!Number.isInteger(offset)||offset<0||offset+count*size>buffer.byteLength)throw new Error('Invalid human motion range');const values=new Float32Array(count);for(let i=0;i<count;i++)values[i]=encoding==='snorm16'?view.getInt16(offset+i*2,true)/32767:encoding==='uint32'?view.getUint32(offset+i*4,true):view.getFloat32(offset+i*4,true);return values;}
 for(const [id,source]of Object.entries(metadata.models)){
  const clips=new Map();for(const[name,spec]of Object.entries(source.clips)){
   if(!Number.isFinite(spec.duration)||spec.duration<=0||spec.count<2||spec.offsets.length!==metadata.tracks.length)throw new Error('Invalid human clip '+name);
   const times=Float32Array.from({length:spec.count},(_,i)=>i*spec.duration/(spec.count-1));
   const tracks=metadata.tracks.map((track,i)=>{const values=read(spec.offsets[i],spec.count*track.size,track.encoding);if(track.size===4){for(let n=0;n<values.length;n+=4){const length=Math.hypot(values[n],values[n+1],values[n+2],values[n+3])||1;for(let k=0;k<4;k++)values[n+k]/=length;}return new THREE.QuaternionKeyframeTrack(track.name,times,values);}return new THREE.VectorKeyframeTrack(track.name,times,values);});
   clips.set(name,{...spec,clip:new THREE.AnimationClip(name,spec.duration,tracks)});
  }
  const morphs=source.morphs.map(m=>({...m,indices:read(m.indices,m.count,'uint32'),positions:read(m.positions,m.count*3,'float32'),normalIndices:read(m.normalIndices,m.normalCount,'uint32'),normals:read(m.normals,m.normalCount*3,'float32')}));
  models.set(id,{...source,morphs,clips});
 }
 return{models,bytes:buffer.byteLength,license:metadata.license,source:'0 A.D. / Wildfire Games'};
}

export function installHumanMorphs(scene,data){
 scene.traverse(mesh=>{if(!mesh.isSkinnedMesh)return;const original=mesh.geometry;if(original.attributes.position.count!==data.vertexCount)throw new Error('Human grip topology does not match '+mesh.name);
  const geometry=original.clone();geometry.morphTargetsRelative=true;geometry.morphAttributes.position=[];geometry.morphAttributes.normal=[];
  for(const morph of data.morphs){const positions=new Float32Array(data.vertexCount*3),normals=new Float32Array(data.vertexCount*3);for(let i=0;i<morph.count;i++)positions.set(morph.positions.subarray(i*3,i*3+3),morph.indices[i]*3);for(let i=0;i<morph.normalCount;i++)normals.set(morph.normals.subarray(i*3,i*3+3),morph.normalIndices[i]*3);const p=new THREE.BufferAttribute(positions,3),n=new THREE.BufferAttribute(normals,3);p.name=n.name=morph.name;geometry.morphAttributes.position.push(p);geometry.morphAttributes.normal.push(n);}
  mesh.geometry=geometry;mesh.updateMorphTargets();mesh.morphTargetInfluences.fill(.3);mesh.userData.humanGripMorphs=true;
 });
}

export function createHumanAnimator(object,data,{variant=0,role='civilian',assetId='',info={}}={}){
 const bones={},skins=[];object.traverse(node=>{if(node.isBone)bones[node.name.toLowerCase()]=node;if(node.isSkinnedMesh)skins.push(node);});
 const bone=name=>bones[name.toLowerCase()];
 const sockets={};for(const[name,parentName]of [['Weapon','RightHand'],['Bow','LeftHand'],['Shield','LeftHand']]){const socket=new THREE.Group();socket.name='HumanGrip'+name;bone(parentName)?.add(socket);sockets[name.toLowerCase()]=socket;}
 const mixer=new THREE.AnimationMixer(object),actions=new Map(),weights=new Map(),seed=seedPhase(variant),footPoint=new THREE.Vector3(),local=new THREE.Vector3(),worldRotation=new THREE.Quaternion(),socketRotation=new THREE.Quaternion();
 const sourceScale=object.userData.normalized?.scale.x||1;
 let current='',lastTime=null,lastDistance=0,travel=0,previousWorld=null,gaitOffset=seed,previousStride=0,initialized=false,lastPoseTime=0,activeRole=role,lastWork=null,lastTool=null,lastAttackTime=null,lastAttackDuration=0,footLift=0,bowDraw=0;
 object.userData.softwareDynamic=true;
 function actionFor(name){let action=actions.get(name);if(!action){const clip=data.clips.get(name)?.clip;if(!clip)return null;action=mixer.clipAction(clip);actions.set(name,action);}return action;}
 function play(name,time,weight){const action=actionFor(name);if(!action)return;action.enabled=true;action.paused=true;action.setLoop(THREE.LoopRepeat,Infinity);if(!action.isScheduled())action.play();action.time=clamp(time,0,data.clips.get(name).duration-1e-7);action.setEffectiveWeight(weight);weights.set(name,weight);}
 function ground(){const normalized=object.userData.normalized;if(normalized)normalized.position.y=0;object.updateMatrixWorld(true);let min=Infinity;for(const skin of skins){skin.skeleton.update();for(const i of data.footProbes){skin.getVertexPosition(i,footPoint).applyMatrix4(skin.matrixWorld);object.worldToLocal(footPoint);min=Math.min(min,footPoint.y);}}footLift=activeRole==='cavalry'?0:Math.max(0,-min);if(normalized&&Number.isFinite(footLift)&&footLift>0){normalized.position.y=footLift;object.updateMatrixWorld(true);for(const skin of skins)skin.skeleton.update();}}
 function grips(dt,instant=false){let left=.3,right=.3;if(activeRole==='archer'){left=1;right=current.includes('attack')?.68:.45;}else if(activeRole!=='civilian'){left=right=1;}else if(lastTool||lastWork){right=1;left=['wood','stone','iron','food'].includes(lastTool||lastWork)?.88:.4;}const amount=instant?1:1-Math.exp(-Math.max(0,dt)/.08);for(const skin of skins){skin.morphTargetInfluences[0]+=(left-skin.morphTargetInfluences[0])*amount;skin.morphTargetInfluences[1]+=(right-skin.morphTargetInfluences[1])*amount;}}
 function socketPose(name,position,quaternion){const node=sockets[({right:'weapon',left:'bow'})[name]||name]||bone(name);if(!node)return false;node.getWorldPosition(local);position.copy(object.worldToLocal(local));node.getWorldQuaternion(socketRotation);object.getWorldQuaternion(worldRotation);quaternion.copy(worldRotation.invert().multiply(socketRotation));return true;}
 function sample(name,time,{work=null,tool=work,grip=true}={}){const spec=data.clips.get(name);if(!spec)return false;mixer.stopAllAction();weights.clear();current=name;activeRole=spec.role==='rider'?'cavalry':spec.role;lastWork=work||spec.work;lastTool=tool;play(name,mod(time,spec.duration),1);lastPoseTime=mod(time,spec.duration);mixer.update(0);if(grip)grips(0,true);ground();return true;}
 function update({time=0,dt,phase,distance,speed=0,walking=false,attacking=false,work=null,tool=work,actionTime,actionDuration=1,mountPhase,role:nextRole=role}={}){
  time=finite(time);const step=Math.max(0,finite(dt,lastTime===null?1/60:time-lastTime)),travelled=Number.isFinite(distance)?distance:null;
  if(initialized&&step===0&&lastTime===time&&(travelled===null||travelled===lastDistance)){object.updateMatrixWorld(true);return;}
  activeRole=nextRole;lastWork=work;lastTool=tool;lastAttackTime=Number.isFinite(actionTime)?actionTime:null;lastAttackDuration=Math.max(.1,finite(actionDuration,1));
  let movement=0;if(travelled!==null){movement=Math.max(0,travelled-lastDistance);if(initialized&&travelled<lastDistance)movement=0;lastDistance=travelled;}else if(previousWorld)movement=Math.hypot(object.position.x-previousWorld.x,object.position.z-previousWorld.z);
  previousWorld={x:object.position.x,z:object.position.z};if(movement<Math.max(.75,step*18))travel+=movement;
  const actualSpeed=step>0?movement/step:finite(speed),moving=walking&&(actualSpeed>.035||!initialized&&speed>.035),prefix=activeRole==='cavalry'?'rider':activeRole==='civilian'?'':activeRole;
  const workName=work==='iron'?'stone':work;
  const recovering=!moving&&current.includes('attack')&&lastAttackTime!==null&&lastAttackTime<lastAttackDuration*.25;
  let next;if(moving){const running=actualSpeed>(current.includes('run')?2.3:2.65);next=prefix?(prefix+'_'+(running&&data.clips.has(prefix+'_run')?'run':'walk')):running?'jog':tool?(tool==='food'?'food_walk':'tool_walk'):'walk';}else if(attacking||recovering)next=(prefix||'sword')+'_attack'+(activeRole==='sword'&&variant%2?'_b':'');else if(workName&&data.clips.has(workName))next=workName;else next=prefix?prefix+'_idle':tool?(tool==='food'?'food_idle':'tool_idle'):'idle';
  if(!data.clips.has(next))next='idle';const spec=data.clips.get(next);let sampleTime;
  if(moving){const stride=Math.max(.3,spec.stride*sourceScale);if(current!==next&&previousStride>0){const previousPhase=mod(travel/previousStride+gaitOffset,1);gaitOffset=previousPhase-travel/stride;}previousStride=stride;sampleTime=(activeRole==='cavalry'&&Number.isFinite(mountPhase)?mod(mountPhase,1):mod(travel/stride+gaitOffset,1))*spec.duration;}
  else if(next.includes('attack')){sampleTime=Number.isFinite(actionTime)?mod((spec.impact||spec.duration*.4)+actionTime/lastAttackDuration*spec.duration,spec.duration):mod(time+seed*spec.duration,spec.duration);}
  else sampleTime=mod(time*(.93+seed*.14)+seed*spec.duration,spec.duration);
  current=next;lastPoseTime=sampleTime;const blend=initialized?1-Math.exp(-step/.12):1;const all=new Set([...weights.keys(),next]);
  for(const name of all){const before=weights.get(name)||0,weight=before+((name===next?1:0)-before)*blend;if(weight<.0005&&name!==next){actions.get(name)?.stop();weights.delete(name);continue;}const oldTime=actions.get(name)?.time||0;play(name,name===next?sampleTime:mod(oldTime+step,data.clips.get(name).duration),weight);}
  mixer.update(0);grips(step,!initialized);ground();const normalizedPhase=sampleTime/spec.duration,impact=(spec.impact||0)/spec.duration;
  bowDraw=activeRole==='archer'&&next.includes('attack')?clamp((normalizedPhase-(impact-.3))/.27,0,1)*(normalizedPhase<=impact?1:Math.max(0,1-(normalizedPhase-impact)/.035)):0;
  lastTime=time;initialized=true;
 }
 sample(role==='civilian'?'idle':role==='cavalry'?'rider_idle':role+'_idle',seed*2);
 return{object,assetId,info:{...info,motionClips:data.clips.size},socketPose,poseClip:sample,
  socket(name,target){const b=bone(({left:'LeftHand',right:'RightHand',hips:'Hips',head:'Head',leftFoot:'LeftFoot',rightFoot:'RightFoot'})[name]||name);if(!b)return target.set(0,0,0);b.getWorldPosition(local);return target.copy(object.worldToLocal(local));},
  update,motionState(){return{clip:current,time:lastPoseTime,phase:lastPoseTime/(data.clips.get(current)?.duration||1),blend:[...weights].map(([clip,weight])=>({clip,weight})),stride:previousStride,travel,work:lastWork,tool:lastTool,actionTime:lastAttackTime,actionDuration:lastAttackDuration,footLift,bowDraw,grips:skins[0]?.morphTargetInfluences.slice()||[],source:'0 A.D. authored clips, retargeted'};},
  dispose(){mixer.stopAllAction();mixer.uncacheRoot(object);object.removeFromParent();}
 };
}
