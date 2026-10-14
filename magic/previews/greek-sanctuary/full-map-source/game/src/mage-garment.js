import * as THREE from 'three';

function segmentDistance(p,a,b){
  const x=b.x-a.x,y=b.y-a.y,z=b.z-a.z;
  const t=THREE.MathUtils.clamp(((p.x-a.x)*x+(p.y-a.y)*y+(p.z-a.z)*z)/(x*x+y*y+z*z),0,1);
  return Math.hypot(p.x-a.x-t*x,p.y-a.y-t*y,p.z-a.z-t*z);
}

/** Keep the authored skirt controls outside the actual IK legs. A fixed set
 * of source-surface probes and existing bones adds no geometry/simulation.
 * The authored pose is restored before every mixer evaluation.
 */
export function createMageGarment(group,model,bones){
  const panels=Array.from({length:8},(_,i)=>({bone:bones['skirt_'+i],tip:bones['skirt_tip_'+i],authored:new THREE.Quaternion(),axis:new THREE.Vector3(),offset:0}));
  if(panels.some(p=>!p.bone||!p.tip))throw Error('Mage requires its eight paired skirt controls');
  const limbs=[];for(const side of ['l','r'])for(const [upper,lower,radius] of [['upperleg','lowerleg',.099],['lowerleg','foot',.104]])limbs.push({a:bones[upper+side],b:bones[lower+side],radius,head:new THREE.Vector3(),tail:new THREE.Vector3(),restHead:new THREE.Vector3(),restTail:new THREE.Vector3()});
  const skins=[];model.traverse(o=>{if(o.isSkinnedMesh&&o.userData.redesignLod===1)skins.push(o)});
  if(!skins.length)throw Error('Mage garment requires the normal surface for shared probes');
  const reference=skins[0].skeleton;
  for(const l of limbs){const a=reference.bones.indexOf(l.a),b=reference.bones.indexOf(l.b);if(a<0||b<0)throw Error('Mage garment requires measured leg joints');l.restHead.setFromMatrixPosition(reference.boneInverses[a].clone().invert());l.restTail.setFromMatrixPosition(reference.boneInverses[b].clone().invert())}
  const point=new THREE.Vector3(),head=new THREE.Vector3(),tail=new THREE.Vector3(),radial=new THREE.Vector3(),down=new THREE.Vector3();const parent=new THREE.Quaternion(),delta=new THREE.Quaternion();
  const owners=new Map(),skinStates=new Map();
  function ownerFor(mesh){
    if(!owners.has(mesh)){
      if(mesh.geometry.morphAttributes.position?.length)throw Error('Mage cloth probes require the authored unmorphed surface');
      if(!skinStates.has(mesh.skeleton))skinStates.set(mesh.skeleton,{skeleton:mesh.skeleton,matrices:mesh.skeleton.bones.map(()=>new THREE.Matrix4())});
      owners.set(mesh,{mesh,skin:skinStates.get(mesh.skeleton),placement:new THREE.Matrix4()});
    }
    return owners.get(mesh);
  }
  function makeProbes(surfaces,close=false){const bins=new Map();
  for(const mesh of surfaces){const positions=mesh.geometry.attributes.position,indices=mesh.geometry.attributes.skinIndex,weights=mesh.geometry.attributes.skinWeight;
    for(let i=0;i<positions.count;i++){
      const influence=new Float32Array(8);let total=0;
      for(let j=0;j<4;j++){const name=mesh.skeleton.bones[indices.getComponent(i,j)]?.name,match=/^skirt_(?:tip_)?(\d+)$/.exec(name||'');if(match){influence[+match[1]]+=weights.getComponent(i,j);total+=weights.getComponent(i,j)}}
      if(total<.25)continue;point.fromBufferAttribute(positions,i).applyMatrix4(mesh.bindMatrix);if(point.y>=.82)continue;
      let panel=0;for(let n=1;n<8;n++)if(influence[n]>influence[panel])panel=n;
      const angle=Math.atan2(point.x,point.z),key=panel+':'+Math.floor(point.y/(close ? .04 : .08))+':'+Math.floor(angle/(close ? .06 : .12))+':'+Math.floor(Math.hypot(point.x,point.z)/(close ? .04 : 1)),strength=influence[panel];
      if(!bins.has(key)||strength>bins.get(key).strength)bins.set(key,{owner:ownerFor(mesh),indices:Array.from({length:4},(_,j)=>indices.getComponent(i,j)),weights:Array.from({length:4},(_,j)=>weights.getComponent(i,j)),influence,strength,rest:point.clone(),clearance:limbs.map(l=>Math.min(l.radius,segmentDistance(point,l.restHead,l.restTail)))});
    }
  }
  return [...bins.values()];}
  let probes=makeProbes(skins),probeOwners=[...new Set(probes.map(p=>p.owner))],probeSkins=[...new Set(probeOwners.map(o=>o.skin))],usingClose=false;const severity=new Float64Array(8);let applied=false,maximum=0,iterations=0;
  function beforeAnimation(){if(applied){for(const p of panels)p.bone.quaternion.copy(p.authored);applied=false}}
  function measure(){
    // Evaluate each joint matrix once per pose, as the GPU skinning palette
    // does. getVertexPosition otherwise rebuilds four full matrices for every
    // probe, even when thousands of probes use the same eight cloth joints.
    for(const state of probeSkins)for(let n=0;n<state.matrices.length;n++)state.matrices[n].multiplyMatrices(state.skeleton.bones[n].matrixWorld,state.skeleton.boneInverses[n]);
    for(const owner of probeOwners)owner.placement.multiplyMatrices(owner.mesh.matrixWorld,owner.mesh.bindMatrixInverse);
    severity.fill(0);maximum=0;
    for(const probe of probes){let x=0,y=0,z=0;const r=probe.rest;for(let j=0;j<4;j++){const w=probe.weights[j];if(!w)continue;const m=probe.owner.skin.matrices[probe.indices[j]].elements;x+=(m[0]*r.x+m[4]*r.y+m[8]*r.z+m[12])*w;y+=(m[1]*r.x+m[5]*r.y+m[9]*r.z+m[13])*w;z+=(m[2]*r.x+m[6]*r.y+m[10]*r.z+m[14])*w}point.set(x,y,z).applyMatrix4(probe.owner.placement);let penetration=0;for(let n=0;n<limbs.length;n++)penetration=Math.max(penetration,(probe.clearance[n]+.006)*group.scale.y-segmentDistance(point,limbs[n].head,limbs[n].tail));maximum=Math.max(maximum,penetration);if(penetration>.0015*group.scale.y)for(let n=0;n<8;n++)severity[n]=Math.max(severity[n],penetration*probe.influence[n])}
  }
  function apply(p){p.bone.quaternion.copy(p.authored);delta.setFromAxisAngle(p.axis,p.offset);p.bone.quaternion.premultiply(delta);p.bone.updateMatrixWorld(true)}
  function update(dt,{disabled=false}={}){
    if(disabled){for(const p of panels)p.offset=0;return}
    if(!usingClose&&group.userData.closeRigLoaded){const close=[];model.traverse(o=>{if(o.isSkinnedMesh&&o.userData.redesignLod===0&&/Continuous|coat/i.test(o.name))close.push(o)});if(close.length){probes=makeProbes(close,true);probeOwners=[...new Set(probes.map(p=>p.owner))];probeSkins=[...new Set(probeOwners.map(o=>o.skin))];usingClose=true}}
    model.updateMatrixWorld(true);
    for(const l of limbs){l.a.getWorldPosition(l.head);l.b.getWorldPosition(l.tail)}
    // All eight roots intentionally share one belt pivot. Their individual
    // root-to-tip directions define each panel radial; pivot-to-hips does not.
    for(const p of panels){p.authored.copy(p.bone.quaternion);p.bone.getWorldPosition(head);p.tip.getWorldPosition(tail);radial.copy(tail).sub(head);radial.y=0;radial.normalize();down.copy(tail).sub(head).normalize();p.axis.crossVectors(down,radial).normalize();p.bone.parent.getWorldQuaternion(parent).invert();p.axis.applyQuaternion(parent);p.offset=Math.max(0,p.offset-Math.max(0,dt)*.5);apply(p)}
    for(iterations=0;iterations<18;iterations++){measure();if(maximum<=.002*group.scale.y)break;let changed=false;for(let n=0;n<8;n++)if(severity[n]>.0003*group.scale.y&&panels[n].offset<.8){panels[n].offset=Math.min(.8,panels[n].offset+.035);apply(panels[n]);changed=true}if(!changed)break}
    if(iterations===18)measure();applied=true;
  }
  function reset(){beforeAnimation();for(const p of panels)p.offset=0;maximum=0}
  return{beforeAnimation,update,reset,snapshot:()=>({probes:probes.length,usingClose,maximum,iterations,offsets:panels.map(p=>p.offset)})};
}
