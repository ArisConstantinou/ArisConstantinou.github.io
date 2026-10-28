import pathlib, subprocess, hashlib, re, json, shutil
root=pathlib.Path.cwd();tools=pathlib.Path(__file__).resolve().parent
assert subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()=='42b90b5c3b96a2079bc152d37da757acdfa9f024'
assert not subprocess.check_output(['git','status','--porcelain'],text=True).strip()
expected={'arcade.js':'6b0386fbab6aed9af2775950ef2ac7cc77a0533e','creatures.js':'d40e8ed74603ff44cbb809e25f132c8a24c5f80a','arcade-model.js':'fcdae333da92edd53851d68b65293b93be526aac'}
for name,sha in expected.items():
 p=root/'frog/source/src'/name;data=p.read_bytes();assert hashlib.sha1(('blob '+str(len(data))+'\0').encode()+data).hexdigest()==sha,name
p=root/'frog/source/src/arcade.js';s=p.read_text()
def sub(old,new):
 global s
 assert s.count(old)==1,old
 s=s.replace(old,new)
def line(pattern,new):
 global s
 s,n=re.subn(pattern,lambda m:new,s,flags=re.M);assert n==1,pattern
sub("import * as THREE from 'three';","import * as THREE from 'three';\nimport {keyboardMovement,localHopDirection,shouldFaceView} from './arcade-control-policy.js';")
line(r'^  this.lastMovement=screenToWorld\(.*;$','  this.lastMovement=keyboardMovement(this.keys,this.move,this.viewMode,this.cameraYaw);')
line(r'^   const pixels=!p.catapultId.*\n   if\(pixels\).*$', '   // Mouse displacement turns the camera. Do not also aim through its old\n   // absolute screen position: this used to apply two different aim systems.\n   this.centerAim();')
sub("this.viewMode==='chase3d'&&(this.pointerLocked()||!this.mouseControl)?{centered:true}","this.viewMode==='chase3d'?{centered:true}")
sub("const anchor=this.viewMode==='chase3d'&&this.pointerLocked()?{x:this.w/2,y:this.h/2}","const anchor=this.viewMode==='chase3d'?{x:this.w/2,y:this.h/2}")
line(r'^  const faceAim=.*;$','  const faceAim=shouldFaceView(this.viewMode,{mounted:!!p.catapultId,locked:!!this.currentTargetLock,pointerAiming:this.mouse.valid,touchAiming:touchAim});')
sub("  canvas.addEventListener('pointermove',e=>{","  // Native locked mouse movement is owned by one document mouse listener.\n  // Pointer events continue to own free-pointer, touch and catapult input.\n  addEventListener('mousemove',e=>{\n   if(!this.running||this.layoutEditing||!this.pointerLocked()||this.viewMode!=='chase3d'||this.state.actors[0].catapultId)return;\n   this.mouseControl=true;this.turnLook(e.movementX,e.movementY);\n  });\n  canvas.addEventListener('pointermove',e=>{")
sub('    if(this.pointerLocked())this.turnLook(e.movementX,e.movementY);','    if(this.pointerLocked())return; // handled once by the native mouse listener')
sub(' turnFreeMouse(event){const next=',' turnFreeMouse(event){this.mouseControl=true;const next=')
sub('speed:Math.hypot(a.hopX,a.hopZ),building:','speed:Math.hypot(a.hopX,a.hopZ),locomotion:localHopDirection(a.hopX,a.hopZ,m.group.rotation.y),building:')
line(r'^   if\(a.hop>0\)\{const direction=.*$', '   // The rig now poses all four limbs in the actual hop direction; do not\n   // add a second hip roll here (it would pull planted feet off their targets).')
p.write_text(s)
p=root/'frog/source/src/creatures.js';s=p.read_text()
sub("import * as THREE from 'three';","import * as THREE from 'three';\nimport {hopDirection,solveDirectionalLimb} from './arcade-control-policy.js';")
sub('function plantLimb(root, middle, end, firstRest, secondRest, dy, dz) {','function plantLimb(root, middle, end, firstRest, secondRest, dy, dz, dx = 0) {\n  if (Math.abs(dx) > 1e-7) {\n    const pose = solveDirectionalLimb(firstRest, secondRest, {x: dx, y: dy, z: dz});\n    root.quaternion.fromArray(pose.root); middle.quaternion.fromArray(pose.middle); end.quaternion.fromArray(pose.end);\n    return;\n  }')
sub("        const progress=clamp(pose.progress||0),air=pose.phase==='air',gather=pose.phase==='gather'?progress:0;","        const hopMove=hopDirection(state.locomotion);\n        const progress=clamp(pose.progress||0),air=pose.phase==='air',gather=pose.phase==='gather'?progress:0;")
sub('        pivot.rotation.x = swim ? -.12 : (gather+launchRecover)*.07-(air?Math.sin(progress*Math.PI)*.12:0)+reach*.08*(1-settle);','        pivot.rotation.x = swim ? -.12 : ((gather+launchRecover)*.07-(air?Math.sin(progress*Math.PI)*.12:0)+reach*.08*(1-settle))*hopMove.z;\n        pivot.rotation.z = !swim&&air ? -Math.sin(progress*Math.PI)*.1*hopMove.x : 0;')
sub('restPositions[ids[`knee${side}`]],restPositions[ids[`ankle${side}`]],hindY,hindZ);','restPositions[ids[`knee${side}`]],restPositions[ids[`ankle${side}`]],hindY,hindZ*hopMove.z,hindZ*hopMove.x);')
sub('restPositions[ids[`elbow${side}`]],restPositions[ids[`wrist${side}`]],foreY,foreZ);','restPositions[ids[`elbow${side}`]],restPositions[ids[`wrist${side}`]],foreY,foreZ*hopMove.z,foreZ*hopMove.x);')
sub('            bones[`foot${side}`].rotation.x=-thrust*.14;','            bones[`foot${side}`].rotation.x=-thrust*.14*hopMove.z;\n            bones[`foot${side}`].rotation.z=thrust*.14*hopMove.x;')
p.write_text(s)
for rel in ['src/arcade-model.js','index.html']:
 p=root/'frog/source'/rel;p.write_text(p.read_text().replace('4.3.14','4.3.15'))
for rel in ['package.json','package-lock.json']:
 p=root/'frog/source'/rel;data=json.loads(p.read_text());assert data['version']=='4.3.14';data['version']='4.3.15'
 if 'packages' in data:data['packages']['']['version']='4.3.15'
 p.write_text(json.dumps(data,indent=2)+'\n')
shutil.copyfile(tools/'arcade-control-policy.js',root/'frog/source/src/arcade-control-policy.js')
shutil.copyfile(tools/'arcade-control-policy.test.mjs',root/'frog/source/tests/arcade-control-policy.test.mjs')
shutil.copyfile(tools/'controls.py',root/'frog/source/qa/arcade-controls-4315.py')
print('Applied source-verified FROG 4.3.15 controls patch. Main is unchanged.')
