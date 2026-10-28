from pathlib import Path
root=Path('frog/source')
(root/'src/arcade-controls.js').write_text('''// Movement and looking are separate. In overview, screen-up is world -Z;
// in chase, use the intentional view yaw, never actor yaw, camera lag or shake.
const finite=(value,fallback=0)=>Number.isFinite(value)?value:fallback;
export function movementForView(x,y,view='overview',yaw=Math.PI){
 const sx=finite(x),sy=finite(y);
 if(view==='overview')return {x:sx,z:sy};
 const angle=finite(yaw,Math.PI),fx=Math.sin(angle),fz=Math.cos(angle);
 return {x:-fz*sx-fx*sy,z:fx*sx-fz*sy};
}

// The rig faces local +Z. Convert actual travel to its CURRENT rendered basis,
// including the short turn blend, so side/back hops cannot play a forward gait.
export function localHopDirection(vx,vz,yaw=0){
 const x=finite(vx),z=finite(vz),speed=Math.hypot(x,z);
 if(speed<1e-6)return {x:0,z:0};
 const angle=finite(yaw),sin=Math.sin(angle),cos=Math.cos(angle);
 return {x:(cos*x-sin*z)/speed,z:(sin*x+cos*z)/speed};
}
''')
p=root/'src/arcade.js';s=p.read_text()
def replace(old,new):
 global s
 assert s.count(old)==1, (old[:130],s.count(old))
 s=s.replace(old,new)
replace("import { actorVisualFacing } from './arcade-facing.js';", "import { actorVisualFacing } from './arcade-facing.js';\nimport { movementForView, localHopDirection } from './arcade-controls.js';")
replace("this.lastMovement=screenToWorld(this.move.x+(this.keys.has('KeyD')||this.keys.has('ArrowRight')?1:0)-(this.keys.has('KeyA')||this.keys.has('ArrowLeft')?1:0),this.move.z+(this.keys.has('KeyS')||this.keys.has('ArrowDown')?1:0)-(this.keys.has('KeyW')||this.keys.has('ArrowUp')?1:0),this.camera.position,this.focus);", "this.lastMovement=movementForView(this.move.x+(this.keys.has('KeyD')||this.keys.has('ArrowRight')?1:0)-(this.keys.has('KeyA')||this.keys.has('ArrowLeft')?1:0),this.move.z+(this.keys.has('KeyS')||this.keys.has('ArrowDown')?1:0)-(this.keys.has('KeyW')||this.keys.has('ArrowUp')?1:0),this.viewMode,this.cameraYaw);")
replace("   const pixels=!p.catapultId&&this.mouseControl&&!this.pointerLocked()?pointerPixels(this.freeMousePoint,this.renderer.domElement.getBoundingClientRect(),this.w,this.h):null;\n   if(pixels){this.mouse.x=pixels.x;this.mouse.y=pixels.y;this.mouse.valid=true;}else this.centerAim();", "   // Both captured and fallback mouse-look use ONE centre ray. Moving a free\n   // cursor and rotating that ray simultaneously double-steered the old aim.\n   this.centerAim();")
replace("const faceAim=!p.catapultId&&(!!this.currentTargetLock||this.viewMode==='overview'&&(this.mouse.valid||touchAim));", "const faceAim=!p.catapultId&&(this.viewMode==='chase3d'||!!this.currentTargetLock||this.viewMode==='overview'&&(this.mouse.valid||touchAim));")
replace("this.viewMode==='chase3d'&&(this.pointerLocked()||!this.mouseControl)?{centered:true}", "this.viewMode==='chase3d'?{centered:true}")
replace("a.hop>0?{phase:'air',progress:1-a.hop/RULES.hopDuration}", "a.hop>0?{phase:'air',progress:1-a.hop/RULES.hopDuration,direction:localHopDirection(a.hopX,a.hopZ,m.group.rotation.y)}")
replace("   if(a.hop>0){const direction=Math.atan2(a.hopX,a.hopZ)-m.group.rotation.y,strength=Math.min(1,Math.hypot(a.hopX,a.hopZ)/8.8)*Math.sin((1-a.hop/RULES.hopDuration)*Math.PI);m.bones.spine.rotation.z-=Math.sin(direction)*strength*.1;for(const side of [-1,1])m.bones[`hip${side}`].rotation.z-=Math.sin(direction)*strength*.14;}\n", "")
replace("   if(e.pointerType==='mouse'){\n    // A second mouse button", "   if(e.pointerType==='mouse'){\n    this.mouseControl=true;\n    // A second mouse button")
p.write_text(s)
p=root/'src/creatures.js';s=p.read_text()
replace("function plantLimb(root, middle, end, firstRest, secondRest, dy, dz) {", """function plantLimb(root, middle, end, firstRest, secondRest, dy, dz, dx=0) {
  // A side hop needs a genuine lateral foot target, not a forward extension
  // with a tilted torso. Preserve the original planar solution for all legacy
  // forward poses and attacks; solve a 3D two-bone chain only when necessary.
  if(Math.abs(dx)>1e-8){
    const l1=firstRest.length(),l2=secondRest.length();
    const target=firstRest.clone().add(secondRest).add(new THREE.Vector3(dx,dy,dz));
    const distance=clamp(target.length(),Math.abs(l1-l2)+.00001,l1+l2-.00001);
    const axis=target.normalize();
    const bend=firstRest.clone().addScaledVector(axis,-firstRest.dot(axis));
    if(bend.lengthSq()<1e-10)bend.set(0,0,1).addScaledVector(axis,-axis.z);
    if(bend.lengthSq()<1e-10)bend.set(1,0,0).addScaledVector(axis,-axis.x);
    bend.normalize();
    const along=(l1*l1+distance*distance-l2*l2)/(2*distance);
    const knee=axis.clone().multiplyScalar(along).addScaledVector(bend,Math.sqrt(Math.max(0,l1*l1-along*along)));
    root.quaternion.setFromUnitVectors(firstRest.clone().normalize(),knee.clone().normalize());
    const second=axis.multiplyScalar(distance).sub(knee).applyQuaternion(root.quaternion.clone().invert());
    middle.quaternion.setFromUnitVectors(secondRest.clone().normalize(),second.normalize());
    end.quaternion.copy(root.quaternion).multiply(middle.quaternion).invert();
    return;
  }""")
replace("        const progress=clamp(pose.progress||0),air=pose.phase==='air',gather=pose.phase==='gather'?progress:0;", """        const progress=clamp(pose.progress||0),air=pose.phase==='air',gather=pose.phase==='gather'?progress:0;
        const travel=pose.direction,travelLength=travel&&Number.isFinite(travel.x)&&Number.isFinite(travel.z)?Math.hypot(travel.x,travel.z):null;
        const direction=travelLength===null?{x:0,z:1}:travelLength>1e-6?{x:travel.x/travelLength,z:travel.z/travelLength}:{x:0,z:0};""")
replace("        pivot.rotation.x = swim ? -.12 : (gather+launchRecover)*.07-(air?Math.sin(progress*Math.PI)*.12:0)+reach*.08*(1-settle);", """        const lean=(gather+launchRecover)*.07-(air?Math.sin(progress*Math.PI)*.12:0)+reach*.08*(1-settle);
        pivot.rotation.x = swim ? -.12 : lean*direction.z;
        pivot.rotation.z = swim ? 0 : -lean*direction.x;""")
replace("restPositions[ids[`ankle${side}`]],hindY,hindZ);", "restPositions[ids[`ankle${side}`]],hindY,hindZ*direction.z,hindZ*direction.x*.65);")
replace("restPositions[ids[`wrist${side}`]],foreY,foreZ);", "restPositions[ids[`wrist${side}`]],foreY,foreZ*direction.z,foreZ*direction.x*.8);")
replace("            bones[`foot${side}`].rotation.x=-thrust*.14;", "            bones[`foot${side}`].rotation.x=-thrust*.14*direction.z;\n            bones[`foot${side}`].rotation.z=thrust*.10*direction.x;")
p.write_text(s)
for rel in ['src/arcade-model.js','package.json','package-lock.json','index.html']:
 p=root/rel;s=p.read_text();s=s.replace('4.3.14','4.3.15');p.write_text(s)
s=(root/'qa/arcade-4314.mjs').read_text().replace("const version='4.3.14'","const version='4.3.15'").replace('qa/results/arcade-4314','qa/results/arcade-4315')
s=s.replace('let context;',(root/'qa/controls4315-extra.js').read_text()+'\nlet context;')
s=s.replace("['high-quality visual review',highQualityReview]", "['direction controls',directionControls],['fallback mouse look',fallbackLook],['high-quality visual review',highQualityReview]")
(root/'qa/arcade-4315.mjs').write_text(s)
