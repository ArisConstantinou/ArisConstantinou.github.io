import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';

// Only DOM/GPU infrastructure is adapted. Geometry, materials, raycasts, data,
// scene construction, and all methods under test are the real application code.
// Canvas drawing and WebGL shader compilation/rendering are NOT validated here.
class ElementStub extends EventTarget {
  constructor(tag='canvas') { super(); this.tagName=tag.toUpperCase(); this.style={}; this.width=256; this.height=256; }
  setAttribute() {}
  remove() {}
  setPointerCapture() {}
  releasePointerCapture() {}
  getBoundingClientRect(){ return {left:0,top:0,width:1200,height:800}; }
  getContext(){return {createImageData:(w,h)=>({width:w,height:h,data:new Uint8ClampedArray(w*h*4)}),putImageData(){},drawImage(){},fillRect(){},fillText(){},clearRect(){},save(){},restore(){},scale(){},translate(){},beginPath(){},moveTo(){},lineTo(){},stroke(){}};}
  toDataURL(){return 'data:image/png;base64,';}
  set src(value){ this._src=value; } // Avoid simulating successful image decoding.
  get src(){return this._src;}
}
globalThis.document={createElement:tag=>new ElementStub(tag),createElementNS:(_ns,tag)=>new ElementStub(tag)};
globalThis.window=new EventTarget();
globalThis.devicePixelRatio=1;
globalThis.matchMedia=()=>({matches:false});
globalThis.requestAnimationFrame=callback=>{callback(0);return 1;};
if(!globalThis.CustomEvent)globalThis.CustomEvent=class CustomEvent extends Event{constructor(type,options={}){super(type);this.detail=options.detail;}};
const THREE=await import('three');
const {WorldEngine}=await import('../engine.js');
const {ASSETS,createAsset}=await import('../assets.js');
const {MATERIALS}=await import('../materials.js');

function fixture(starter=false){
  const world=new EventTarget();Object.setPrototypeOf(world,WorldEngine.prototype);
  Object.assign(world,{container:{clientWidth:1200,clientHeight:800},tool:'select',assetId:'cottage',materialId:'plaster',brush:{size:5,strength:.55,mode:'raise'},buildOptions:{height:3.2,width:.3,rotation:0,elevation:0,snap:true},objects:new Map(),selectedId:null,history:[],historyIndex:-1,nextId:1,living:true,timeOfDay:'day',roofsVisible:true,gridVisible:false,pointers:new Map(),keys:new Set(),walkInput:{x:0,z:0},raycaster:new THREE.Raycaster(),ndc:new THREE.Vector2(),_mobile:false,_dirtyStroke:false,_sculptElapsed:0});
  world.scene=new THREE.Scene();world.scene.background=new THREE.Color('#dfe9e6');world.scene.fog=new THREE.Fog('#dfe9e6',85,210);world.camera=new THREE.PerspectiveCamera(38,1.5,.08,350);
  world.renderer={capabilities:{getMaxAnisotropy:()=>4},domElement:new ElementStub(),toneMappingExposure:1,shadowMap:{}};
  world.controls={target:new THREE.Vector3(0,1,0),enabled:true,update(){world.camera.lookAt(this.target);world.camera.updateMatrixWorld(true);}};
  world._createLighting();world._createTerrain();world._createHelpers();world.home(false);if(starter)world._populateStarter();world._recordHistory('Test initial world');world.scene.updateMatrixWorld(true);return world;
}
const results=[];
function check(name,fn){const started=performance.now();try{const detail=fn();results.push({name,status:'PASS',milliseconds:Math.round(performance.now()-started),...(detail?{detail}:{})});console.log('PASS',name);}catch(error){results.push({name,status:'FAIL',message:error.stack});console.log('FAIL',name,error.stack);}}
const almost=(a,b,tolerance=1e-4)=>assert.ok(Math.abs(a-b)<=tolerance,`${a} differs from ${b}`);
const meshList=root=>{const list=[];root.traverse(node=>{if(node.isMesh)list.push(node);});return list;};
const stats=root=>{let triangles=0,meshes=0;root.traverse(node=>{if(node.isMesh){meshes++;triangles+=(node.geometry.index?.count??node.geometry.attributes.position.count)/3;}});return {meshes,triangles};};

check('Actual asset geometry: 12 rising stair treads, open houses, roof tags',()=>{
  const stairs=createAsset('stairs');stairs.updateMatrixWorld(true);const ray=new THREE.Raycaster();const heights=[];
  for(let i=0;i<12;i++){ray.set(new THREE.Vector3(0,10,2-4*(i+.5)/12),new THREE.Vector3(0,-1,0));const hits=ray.intersectObject(stairs,true);assert.ok(hits.length);const y=hits[0].point.y;almost(y,(i+1)*.25,.012);heights.push(+y.toFixed(3));}
  for(const id of ['cottage','townhouse','cafe','villa','apartment']){const root=createAsset(id);assert.equal(root.userData.enterable,true);assert.ok(Number.isFinite(root.userData.interiorSpawn.y));assert.ok(meshList(root).some(m=>m.userData.isRoof));assert.ok(stats(root).triangles>1000);}
  return {stairTreadHeights:heights};
});

check('Placement transforms, enterable spawn, roof toggle and exit restoration',()=>{
  const world=fixture();world.assetId='cottage';world.setBuildOptions({rotation:90,elevation:1.25});const y=world.sampleHeight(-8,5);world._placeAsset(new THREE.Vector3(-8,y,5));
  assert.equal(world.objects.size,1);const entry=world.objects.get(world.selectedId);almost(entry.root.position.y,y+1.25);almost(entry.root.rotation.y,Math.PI/2);assert.equal(entry.record.enterable,true);
  const roofs=meshList(entry.root).filter(m=>m.userData.isRoof);assert.ok(roofs.length>0);world.toggleRoofs(false);assert.ok(roofs.every(m=>!m.visible));world.toggleRoofs(true);
  const prior=world.camera.position.clone();entry.root.updateMatrixWorld(true);const s=entry.root.userData.interiorSpawn,expected=entry.root.localToWorld(new THREE.Vector3(s.x,s.y,s.z));
  assert.equal(world.enterSelected(),true);assert.equal(world.tool,'explore');assert.ok(world.camera.position.distanceTo(expected)<1e-5);assert.equal(world.roofsVisible,false);world.exitExplore();assert.equal(world.tool,'select');assert.ok(world.camera.position.distanceTo(prior)<1e-5);assert.equal(world.roofsVisible,true);
});

check('Sculpt modifies actual terrain and undo/redo restores heights',()=>{
  const world=fixture();const before=world.sampleHeight(0,0);world.setTool('sculpt');world.setBrush({size:6,strength:.8,mode:'raise'});world._heightBeforeStroke=new Map();world._applyBrush(new THREE.Vector3(0,before,0),.4);world._finishStroke();const raised=world.sampleHeight(0,0);assert.ok(raised>before+.8);assert.equal(world.undo(),true);almost(world.sampleHeight(0,0),before);assert.equal(world.redo(),true);almost(world.sampleHeight(0,0),raised);return {before,raised};
});

let persisted;
check('Terrain PBR layer painting survives save/load with normalized weights',()=>{
  const world=fixture();world.setTool('paint');world.setMaterial('brick');world.setBrush({size:5,strength:.8});world._applyBrush(new THREE.Vector3(0,world.sampleHeight(0,0),0),.5);world._finishStroke();
  const center=56*113+56;const index=MATERIALS.findIndex(m=>m.id==='brick');const weight=world._terrainLayers[Math.floor(index/4)].array[center*4+index%4];assert.ok(weight>.99);let sum=0;for(const layer of world._terrainLayers)for(let c=0;c<4;c++)sum+=layer.array[center*4+c];almost(sum,1,1e-5);
  const saved=world.serialize();assert.equal(saved.terrain.layers.length,4);world.load(saved);almost(world._terrainLayers[0].array[center*4+index],weight);assert.deepEqual(world.serialize().terrain,saved.terrain);persisted=world.serialize();return {centerBrickWeight:weight,layerCount:saved.terrain.layers.length};
});

check('Object surface painting and transform persist exactly through reload',()=>{
  const world=fixture();world._placeAsset(new THREE.Vector3(2,world.sampleHeight(2,3),3));world.updateSelected({rotation:45,scale:1.2,name:'Custom home'});const entry=world.objects.get(world.selectedId);const surface=meshList(entry.root).find(m=>m.userData.paintable&&!m.userData.isRoof);assert.ok(surface);const index=surface.userData.surfaceIndex;
  world.setTool('paint');world.setMaterial('brick');world._paintObject({object:surface});world._finishStroke();const saved=world.serialize();assert.equal(saved.objects[0].paintedParts[index],'brick');world.load(saved);const restored=[...world.objects.values()][0];const restoredSurface=meshList(restored.root).find(m=>m.userData.surfaceIndex===index);assert.equal(restoredSurface.material.name,'brick');assert.ok(restoredSurface.material.displacementScale>0);assert.deepEqual(world.serialize().objects,saved.objects);persisted=saved;
});

check('Delete, undo and redo restore complete object records',()=>{
  const world=fixture();world.assetId='bench';world._placeAsset(new THREE.Vector3(3,world.sampleHeight(3,4),4));const original=structuredClone(world.getSelected());world.deleteSelected();assert.equal(world.objects.size,0);assert.equal(world.undo(),true);assert.equal(world.objects.size,1);assert.deepEqual(world.getObjects()[0],original);assert.equal(world.redo(),true);assert.equal(world.objects.size,0);
});

check('Malformed imports are rejected before clearing the current world',()=>{
  const world=fixture();world.load(persisted);const before=JSON.stringify(world.serialize());const samples=[];
  let bad=structuredClone(persisted);bad.objects.push({id:'bad-road',assetId:'road',position:{x:0,y:0,z:0},primitive:{kind:'road',width:4}});samples.push(bad);
  bad=structuredClone(persisted);bad.objects.push({id:'bad-road',assetId:'road',position:{x:0,y:0,z:0},primitive:{kind:'road',points:[[1,2],[NaN,4]],width:4}});samples.push(bad);
  bad=structuredClone(persisted);bad.objects.push(structuredClone(bad.objects[0]));samples.push(bad);
  bad=structuredClone(persisted);bad.terrain.layers[0]=null;samples.push(bad);
  bad=structuredClone(persisted);bad.terrain.heights[0]=NaN;samples.push(bad);
  bad=structuredClone(persisted);bad.camera.position=[0,NaN,5];samples.push(bad);
  for(const sample of samples){assert.throws(()=>world.load(sample));assert.equal(JSON.stringify(world.serialize()),before);}
  return {rejectedCases:samples.length};
});

check('Drawn walls and floors contain real subdivided relief geometry',()=>{
  const world=fixture();world.setMaterial('brick');world.setTool('wall');world._strokeStart=new THREE.Vector3(0,.25,0);world._strokeEnd=new THREE.Vector3(0,.25,6);world._strokePoints=[[0,0],[0,6]];world._commitDrawn();const wall=world.objects.get(world.selectedId);assert.equal(wall.record.primitive.kind,'wall');const face=meshList(wall.root).find(m=>m.userData.paintable);assert.ok(face.geometry.attributes.position.count>100);assert.ok(face.material.displacementScale>0);assert.equal(wall.record.primitive.height,3.2);
  world.setTool('floor');world._strokeStart=new THREE.Vector3(0,.25,0);world._strokeEnd=new THREE.Vector3(6,.25,5);world._strokePoints=[[0,0],[6,5]];world._commitDrawn();const floor=world.objects.get(world.selectedId);assert.equal(floor.record.primitive.width,6);assert.equal(floor.record.primitive.depth,5);assert.ok(meshList(floor.root)[0].geometry.attributes.position.count>100);
});

check('Road winding faces up; traffic follows real transformed roads; empty worlds have no actors',()=>{
  const world=fixture();assert.equal(world.actors?.length??0,0);const rec=world._pathRecord([[12,18],[20,18],[26,24]],4);const root=world._insertRecord(rec);world._recordHistory('Custom route');assert.ok(world.actors.length>0);const normal=root.children[0].geometry.getAttribute('normal');let minY=1;for(let i=0;i<normal.count;i++)minY=Math.min(minY,normal.getY(i));assert.ok(minY>.5);
  world._updateActors(0);assert.ok(world.actors.every(a=>a.mesh.position.z>14));const first=world.actors[0].mesh.position.clone();world._updateActors(5);assert.ok(world.actors[0].mesh.position.distanceTo(first)>.1);
  world.select(rec.id);world.updateSelected({rotation:75,scale:1.2});world._updateActors(3);
  for(const actor of world.actors){let closest=Infinity;for(let i=0;i<=300;i++){const p=actor.route.curve.getPointAt(i/300);closest=Math.min(closest,Math.hypot(p.x-actor.mesh.position.x,p.z-actor.mesh.position.z));}assert.ok(closest<actor.route.width/2+1.2,`actor was ${closest} from route`);}
  world.deleteSelected();assert.equal(world.actors.length,0);const empty=world.serialize();world.load(empty);assert.equal(world.actors.length,0);return {minimumUpwardNormalY:minY};
});

check('Road surface paint survives terrain resettling and serialization',()=>{
  const world=fixture();const rec=world._pathRecord([[-8,0],[8,0]],4);world._insertRecord(rec);world._recordHistory('Road');let road=world.objects.get(rec.id);world.setTool('paint');world.setMaterial('stone');world._paintObject({object:road.root.children[0]});world._finishStroke();const index=road.root.children[0].userData.surfaceIndex;
  world.setTool('sculpt');world._heightBeforeStroke=new Map([[rec.id,0]]);world._applyBrush(new THREE.Vector3(0,world.sampleHeight(0,0),0),.2);world._finishStroke();road=world.objects.get(rec.id);const surface=meshList(road.root).find(m=>m.userData.surfaceIndex===index);assert.equal(surface.material.name,'stone');const saved=world.serialize();world.load(saved);assert.equal(world.objects.get(rec.id).root.children[0].material.name,'stone');
});

check('Walk mode actually ascends furnished-house stairs to the next floor',()=>{
  const details=[];
  for(const assetId of ['townhouse','apartment']){
    const world=fixture();world.assetId=assetId;world._placeAsset(new THREE.Vector3(0,world.sampleHeight(0,0),0));const entry=world.objects.get(world.selectedId);world.enterSelected();world.scene.updateMatrixWorld(true);
    const stairs=entry.root.userData.staircase,levels=entry.root.userData.floorHeights;assert.ok(stairs);world._yaw=0;world.camera.position.set(stairs.x,entry.root.position.y+levels[0]+1.72,2);world.setWalkInput({x:0,z:-1});
    let steps=0;for(;steps<240&&world.camera.position.z>stairs.endZ-.2;steps++)world._updateExplore(1/60);
    const expected=entry.root.position.y+levels[1]+1.72;details.push({assetId,frames:steps,actual:world.camera.position.toArray(),expectedEyeY:expected});
    assert.ok(world.camera.position.z<stairs.endZ-.1,`${assetId} blocked at z=${world.camera.position.z}, eyeY=${world.camera.position.y}; expected stair end ${stairs.endZ}`);
    assert.ok(world.camera.position.y>expected-.3,`${assetId} did not reach upstairs floor: eyeY=${world.camera.position.y}, expected ${expected}`);
  }
  return details;
});

check('Apartment navigation crosses landings, climbs both flights and descends',()=>{
  const world=fixture();world.assetId='apartment';world._placeAsset(new THREE.Vector3(0,world.sampleHeight(0,0),0));const entry=world.objects.get(world.selectedId);world.enterSelected();world.scene.updateMatrixWorld(true);const stairs=entry.root.userData.staircase,levels=entry.root.userData.floorHeights;
  world._yaw=0;world.camera.position.set(stairs.x,entry.root.position.y+levels[0]+1.72,2);world._walkFootY=entry.root.position.y+levels[0];
  const walkTo=(x,z)=>{for(let frame=0;frame<400;frame++){const dx=x-world.camera.position.x,dz=z-world.camera.position.z,dist=Math.hypot(dx,dz);if(dist<.035){world.setWalkInput({x:0,z:0});return;}world.setWalkInput({x:dx/dist,z:dz/dist});world._updateExplore(Math.min(1/60,dist/4.1));}throw new Error(`Movement blocked approaching [${x},${z}]: ${world.camera.position.toArray()}`);};
  walkTo(stairs.x,-1.96);walkTo(stairs.x+1.05,-1.96);walkTo(stairs.x+1.05,2);walkTo(stairs.x,2);walkTo(stairs.x,-1.96);
  for(let i=0;i<30;i++)world._updateExplore(1/60);const highestEye=world.camera.position.y;almost(highestEye,entry.root.position.y+levels[2]+1.72,.025);
  walkTo(stairs.x,2);for(let i=0;i<30;i++)world._updateExplore(1/60);almost(world.camera.position.y,entry.root.position.y+levels[1]+1.72,.025);
  return {reachedFloor:3,highestEyeY:highestEye,descendedEyeY:world.camera.position.y};
});

check('Starter-world geometry inventory (not a measured GPU frame rate)',()=>{
  const world=fixture(true);let meshes=0,triangles=0,visibleMeshes=0;world.scene.traverse(node=>{if(node.isMesh){meshes++;triangles+=(node.geometry.index?.count??node.geometry.attributes.position.count)/3;if(world._isVisible(node))visibleMeshes++;}});assert.ok(world.objects.size>=30);assert.ok(world.actors.length>0);return {editableObjects:world.objects.size,actors:world.actors.length,meshes,visibleMeshes,triangles,terrainVertices:world.terrain.geometry.attributes.position.count,vertexMaterialWeights:world._terrainLayers.length*world._terrainLayers[0].array.length};
});

const files=['engine.js','assets.js','materials.js'];
const report={generatedAt:new Date().toISOString(),method:'Node integration tests using real Three.js geometry, materials, CPU raycasts, scene graph and engine model methods; constructor replaced by explicit renderer/DOM infrastructure fixture.',limitations:['No WebGL context exists in the browser environment.','No shader compile, pixel rendering, frame rate, GPU memory, or mobile browser gesture claims are made.','Canvas draw and image decoding are infrastructure adapters; texture files were separately validated.'],sourceHashes:Object.fromEntries(files.map(name=>[name,crypto.createHash('sha256').update(fs.readFileSync(new URL('../'+name, import.meta.url))).digest('hex')])),results,passed:results.filter(r=>r.status==='PASS').length,failed:results.filter(r=>r.status==='FAIL').length};
fs.writeFileSync(new URL('../verification/headless.json', import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({passed:report.passed,failed:report.failed,inventory:results.find(r=>r.name.startsWith('Starter-world'))?.detail},null,2));
if(report.failed)process.exitCode=1;
