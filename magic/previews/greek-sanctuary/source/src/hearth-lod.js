import * as THREE from 'three';

// Rendered-pixel thresholds and hysteresis keep detail proportional to its
// visible size without rapid swaps at a camera boundary.
export function hearthLodLevel(pixels,current=1,highReady=false){
 if(highReady&&(pixels>360||(current===0&&pixels>300)))return 0;
 if(pixels<90||(current===2&&pixels<115))return 2;
 return 1;
}
export function createHearthLod(model,{loadHigh,prepareMesh}){
 const levels=new Map([[0,[]],[1,[]],[2,[]]]),bones={};
 model.traverse(o=>{if(o.isBone)bones[o.name]=o;if(o.isMesh){let n=o;while(n&&!n.userData.hearthLod)n=n.parent;const level=n?.userData.hearthLod;if(level)levels.get(level)?.push(o);}});
 if(!levels.get(1).length)return {update(){},dispose(){},get level(){return 0;}};
 let current=1,requested=false,ready=false,disposed=false,error=null;
 const center=new THREE.Vector3(),eye=new THREE.Vector3(),screen=new THREE.Vector2();
 function select(level){for(const [index,meshes] of levels)for(const mesh of meshes)mesh.visible=index===level;current=level;model.userData.hearthLod=level;}
 select(1);
 function request(){
  if(requested||disposed)return;requested=true;
  loadHigh().then(gltf=>{
   if(disposed)return;
   const sourceMeshes=[];gltf.scene.traverse(o=>{if(o.isSkinnedMesh)sourceMeshes.push(o);});
   // Reuse the named animated bones, including runtime IK and waist yaw.
   const skeletons=new Map();
   for(const source of sourceMeshes){
    const key=source.skeleton.bones.map(b=>b.name).join('|');let skeleton=skeletons.get(key);
    if(!skeleton){
     const mapped=source.skeleton.bones.map(b=>bones[b.name]);
     if(mapped.some(b=>!b))throw new Error('HEARTH close surface skeleton mismatch');
     skeleton=new THREE.Skeleton(mapped,source.skeleton.boneInverses.map(m=>m.clone()));skeletons.set(key,skeleton);
    }
    const mesh=source.clone(false);mesh.name=source.name+'_close';mesh.bind(skeleton,source.bindMatrix.clone());prepareMesh(mesh);model.add(mesh);levels.get(0).push(mesh);
   }
   ready=levels.get(0).length>0;model.userData.hearthHighReady=ready;
  }).catch(e=>{error=e.message;model.userData.hearthLodError=error;console.warn('HEARTH close detail unavailable:',e);});
 }
 function update(camera,renderer){
  if(disposed)return;
  model.getWorldPosition(center);center.y+=1.7;
  const distance=camera.getWorldPosition(eye).distanceTo(center);
  renderer.getDrawingBufferSize(screen);
  const pixels=camera.isOrthographicCamera?3.4*screen.y*camera.zoom/(camera.top-camera.bottom):3.4*screen.y*camera.projectionMatrix.elements[5]/(2*Math.max(.1,distance));
  if(pixels>280)request();
  select(hearthLodLevel(pixels,current,ready));model.userData.hearthProjectedPixels=pixels;
 }
 return {update,dispose(){disposed=true;},get level(){return current;},get ready(){return ready;},get error(){return error;}};
}
