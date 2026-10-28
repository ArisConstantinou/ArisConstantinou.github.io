#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
const BASE_COMMIT='42b90b5c3b96a2079bc152d37da757acdfa9f024';
const here=path.dirname(fileURLToPath(import.meta.url));
const gitHash=text=>createHash('sha1').update(`blob ${Buffer.byteLength(text)}\0`).update(text).digest('hex');
const change=(find,replace,label)=>({find,replace,label});
const replacements={
 'frog/source/src/arcade.js':[
  change("import * as THREE from 'three';", "import * as THREE from 'three';\nimport {keyboardMovement,localHopDirection,shouldFaceView} from './arcade-control-policy.js';", 'explicit input policy'),
  change("  this.lastMovement=screenToWorld(this.move.x+(this.keys.has('KeyD')||this.keys.has('ArrowRight')?1:0)-(this.keys.has('KeyA')||this.keys.has('ArrowLeft')?1:0),this.move.z+(this.keys.has('KeyS')||this.keys.has('ArrowDown')?1:0)-(this.keys.has('KeyW')||this.keys.has('ArrowUp')?1:0),this.camera.position,this.focus);", "  this.lastMovement=keyboardMovement(this.keys,this.move,this.viewMode,this.cameraYaw);", 'fixed overview axes and yaw-relative chase axes'),
  change("   const pixels=!p.catapultId&&this.mouseControl&&!this.pointerLocked()?pointerPixels(this.freeMousePoint,this.renderer.domElement.getBoundingClientRect(),this.w,this.h):null;\n   if(pixels){this.mouse.x=pixels.x;this.mouse.y=pixels.y;this.mouse.valid=true;}else this.centerAim();", "   // Mouse displacement turns the camera; do not also aim through the old\n   // absolute pointer position, which would introduce a second aim system.\n   this.centerAim();", 'one center ray in third person'),
  change("this.viewMode==='chase3d'&&(this.pointerLocked()||!this.mouseControl)?{centered:true}","this.viewMode==='chase3d'?{centered:true}",'centered reticle'),
  change("const anchor=this.viewMode==='chase3d'&&this.pointerLocked()?{x:this.w/2,y:this.h/2}","const anchor=this.viewMode==='chase3d'?{x:this.w/2,y:this.h/2}",'lock acquisition uses reticle'),
  change("  const faceAim=!p.catapultId&&(!!this.currentTargetLock||this.viewMode==='overview'&&(this.mouse.valid||touchAim));", "  const faceAim=shouldFaceView(this.viewMode,{mounted:!!p.catapultId,locked:!!this.currentTargetLock,pointerAiming:this.mouse.valid,touchAiming:touchAim});", 'body follows third-person view'),
  change("  canvas.addEventListener('pointermove',e=>{", "  // Process captured mouse displacement once. Pointer events still handle\n  // free mouse, touch and catapult input.\n  addEventListener('mousemove',e=>{\n   if(!this.running||this.layoutEditing||!this.pointerLocked()||this.viewMode!=='chase3d'||this.state.actors[0].catapultId)return;\n   this.mouseControl=true;this.turnLook(e.movementX,e.movementY);\n  });\n  canvas.addEventListener('pointermove',e=>{", 'native locked mouse listener'),
  change("    if(this.pointerLocked())this.turnLook(e.movementX,e.movementY);", "    if(this.pointerLocked())return; // native mousemove owns the turn", 'no duplicate pointer displacement'),
  change(" turnFreeMouse(event){const next=", " turnFreeMouse(event){this.mouseControl=true;const next=", 'mouse after touch'),
  change("speed:Math.hypot(a.hopX,a.hopZ),building:", "speed:Math.hypot(a.hopX,a.hopZ),locomotion:localHopDirection(a.hopX,a.hopZ,m.group.rotation.y),building:", 'directional feet'),
  change("   if(a.hop>0){const direction=Math.atan2(a.hopX,a.hopZ)-m.group.rotation.y,strength=Math.min(1,Math.hypot(a.hopX,a.hopZ)/8.8)*Math.sin((1-a.hop/RULES.hopDuration)*Math.PI);m.bones.spine.rotation.z-=Math.sin(direction)*strength*.1;for(const side of [-1,1])m.bones[`hip${side}`].rotation.z-=Math.sin(direction)*strength*.14;}", "   // Directional limb IK already includes lateral lean. No extra hip roll:\n   // that would pull planted feet away from their solved targets.", 'remove duplicate lean'),
 ],
 'frog/source/src/creatures.js':[
  change("import * as THREE from 'three';", "import * as THREE from 'three';\nimport {hopDirection,solveDirectionalLimb} from './arcade-control-policy.js';", 'gait helpers'),
  change("function plantLimb(root, middle, end, firstRest, secondRest, dy, dz) {", "function plantLimb(root, middle, end, firstRest, secondRest, dy, dz, dx = 0) {\n  if (Math.abs(dx) > 1e-7) {\n    const pose = solveDirectionalLimb(firstRest, secondRest, {x: dx, y: dy, z: dz});\n    root.quaternion.fromArray(pose.root); middle.quaternion.fromArray(pose.middle); end.quaternion.fromArray(pose.end);\n    return;\n  }", 'lateral limb IK'),
  change("        const progress=clamp(pose.progress||0),air=pose.phase==='air',gather=pose.phase==='gather'?progress:0;", "        const hopMove=hopDirection(state.locomotion);\n        const progress=clamp(pose.progress||0),air=pose.phase==='air',gather=pose.phase==='gather'?progress:0;", 'local hop bearing'),
  change("        pivot.rotation.x = swim ? -.12 : (gather+launchRecover)*.07-(air?Math.sin(progress*Math.PI)*.12:0)+reach*.08*(1-settle);", "        pivot.rotation.x = swim ? -.12 : ((gather+launchRecover)*.07-(air?Math.sin(progress*Math.PI)*.12:0)+reach*.08*(1-settle))*hopMove.z;\n        pivot.rotation.z = !swim&&air ? -Math.sin(progress*Math.PI)*.1*hopMove.x : 0;", 'forward and lateral lean'),
  change("restPositions[ids[`knee${side}`]],restPositions[ids[`ankle${side}`]],hindY,hindZ);", "restPositions[ids[`knee${side}`]],restPositions[ids[`ankle${side}`]],hindY,hindZ*hopMove.z,hindZ*hopMove.x);", 'directional hind feet'),
  change("restPositions[ids[`elbow${side}`]],restPositions[ids[`wrist${side}`]],foreY,foreZ);", "restPositions[ids[`elbow${side}`]],restPositions[ids[`wrist${side}`]],foreY,foreZ*hopMove.z,foreZ*hopMove.x);", 'directional front feet'),
  change("            bones[`foot${side}`].rotation.x=-thrust*.14;", "            bones[`foot${side}`].rotation.x=-thrust*.14*hopMove.z;\n            bones[`foot${side}`].rotation.z=thrust*.14*hopMove.x;", 'directional toes'),
 ],
 'frog/source/src/arcade-model.js':[
  change("export const ARCADE_VERSION = '4.3.14';", "export const ARCADE_VERSION = '4.3.15';", 'release version'),
 ],
};
const expectedBlobs={
 'frog/source/src/arcade.js':'6b0386fbab6aed9af2775950ef2ac7cc77a0533e',
 'frog/source/src/creatures.js':'d40e8ed74603ff44cbb809e25f132c8a24c5f80a',
 'frog/source/src/arcade-model.js':'fcdae333da92edd53851d68b65293b93be526aac',
};
function applyReplacements(source,changes){
 for(const {find,replace,label} of changes){
  const count=source.split(find).length-1;if(count!==1)throw new Error(`${label}: expected one source span, found ${count}. No files written.`);
  source=source.replace(find,replace);
 }
 return source;
}
async function main(){
 const args=process.argv.slice(2),at=args.indexOf('--repo');if(at<0||!args[at+1])throw new Error('Usage: node apply.mjs --repo /repository [--check]');
 const root=path.resolve(args[at+1]),git=(...args)=>execFileSync('git',['-C',root,...args],{encoding:'utf8'}).trim();
 if(git('rev-parse','HEAD')!==BASE_COMMIT)throw new Error('Wrong base commit; review/rebase instead of overwriting newer work.');
 if(git('status','--porcelain'))throw new Error('Worktree must be clean.');
 const pending=new Map();
 for(const [file,changes] of Object.entries(replacements)){
  const source=await fs.readFile(path.join(root,file),'utf8');
  if(gitHash(source)!==expectedBlobs[file])throw new Error(`Unexpected base blob: ${file}`);
  pending.set(file,applyReplacements(source,changes));
 }
 for(const file of ['frog/source/package.json','frog/source/package-lock.json']){
  const data=JSON.parse(await fs.readFile(path.join(root,file),'utf8'));if(data.version!=='4.3.14')throw new Error(`Unexpected version: ${file}`);data.version='4.3.15';
  if(file.endsWith('package-lock.json')){if(data.packages?.['']?.version!=='4.3.14')throw new Error('Unexpected root lockfile version');data.packages[''].version='4.3.15';}
  pending.set(file,JSON.stringify(data,null,2)+'\n');
 }
 for(const file of ['frog/source/src/arcade-control-policy.js','frog/source/tests/arcade-control-policy.test.mjs']){
  try{await fs.access(path.join(root,file));throw new Error(`Destination exists: ${file}`);}catch(error){if(error.code!=='ENOENT')throw error;}
  pending.set(file,await fs.readFile(path.join(here,file),'utf8'));
 }
 console.log(`Validated ${pending.size} files against ${BASE_COMMIT}`);
 if(args.includes('--check'))return;
 for(const [file,source] of pending){await fs.mkdir(path.dirname(path.join(root,file)),{recursive:true});await fs.writeFile(path.join(root,file),source);}
 console.log('Applied source patch. Requires full tests, production build and native-input browser validation before publication.');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
