import {insideRoomInterior,createInteriorMaterialCache} from './room-interior-materials.js';
import {Box3,Color,Vector4,Material,DynamicDrawUsage} from 'three';
import {corridors} from './castle-layout.js';
import {createRoomZones} from './room-zones.js';
import {createRoomMinimap} from './room-minimap.js';
import {roomSources} from '../../static-wall-batches.js';
import {applyRoomFogShader,roomFogShaderKind} from './room-fog-shader.js';
import {hiddenRoomBranches,renderWithoutBranches} from './room-render-prune.js';
import {createSkinnedRoomBounds,skinOverlapsRooms,hasFragmentOnlySkinCallback} from './skinned-room-bounds.js';
export function createRoomVisibility({renderer,scene,world}){
 const realZones=world.zones.map(z=>({id:z.name,label:z.label,secret:z.secret,x:z.xMin,z:z.zMin,w:z.xMax-z.xMin,d:z.zMax-z.zMin}));
 const policy=createRoomZones(realZones.filter(z=>!z.secret),corridors,realZones.filter(z=>z.secret)),minimap=createRoomMinimap(policy);
 const original=renderer.renderBufferDirect,originalRender=renderer.render,originalCompile=renderer.compileAsync,oldBackground=scene.background,black=new Color(0x000000),boxes=new WeakMap(),patched=new Map(),scratch=new Box3(),entityRoots=new WeakMap(),owners=new WeakMap();
 const uniforms={roomFogRects:{value:Array.from({length:8},()=>new Vector4())},roomFogCount:{value:0},roomFogShortCircuit:{value:true}};
 const interiors=createInteriorMaterialCache();
 const skinBounds=createSkinnedRoomBounds();let renderFrame=0,skinCulling=true,fragmentSkinCulling=true,fragmentMaskCentroid=true;
 let interiorMaterials=true;let enabled=true,pruning=true,branches=[],pruneSignature='',rects=[],zone=null,signature='',previous=null;const stats={tested:0,culled:0,hiddenStatic:0,skinCulled:0,fragmentSkinCulled:0,interiorDraws:0};
 function entityBox(entity){const p=entity.body.position,r=Math.max(6,(entity.radius||1)*3);scratch.min.set(p.x-r,-100,p.z-r);scratch.max.set(p.x+r,100,p.z+r);return scratch;}
 function boxFor(o){
  if(o.isBatchedMesh||!o.geometry?.attributes.position)return null;
  if(o.isSkinnedMesh){let entity=owners.get(o);if(!entity){for(let p=o;p&&!entity;p=p.parent)entity=entityRoots.get(p);if(entity)owners.set(o,entity);}return entity?entityBox(entity):null;}
  // Dynamic fire/particle pools deliberately opt out of geometry-bound culling:
  // an initial zero count has empty bounds, and subsequent instances move. The
  // room shader masks each live instance instead of trusting those stale boxes.
  if(o.frustumCulled===false||o.isInstancedMesh&&o.instanceMatrix.usage===DynamicDrawUsage)return null;
  let box=boxes.get(o);if(box&&o.matrixAutoUpdate===false&&o.matrixWorldAutoUpdate===false)return box;
  if(o.isInstancedMesh){if(!o.boundingBox)o.computeBoundingBox();scratch.copy(o.boundingBox);}else{if(!o.geometry.boundingBox)o.geometry.computeBoundingBox();scratch.copy(o.geometry.boundingBox);}
  scratch.applyMatrix4(o.matrixWorld);if(!box){box=new Box3();boxes.set(o,box);}return box.copy(scratch);
 }
 const overlapsRects=(box,regions)=>!box||regions.some(r=>box.max.x>=r.x-1.3&&box.min.x<=r.x+r.w+1.3&&box.max.z>=r.z-1.3&&box.min.z<=r.z+r.d+1.3),overlaps=box=>overlapsRects(box,rects);
 function patch(material,allowCustom=false){
  if(patched.has(material)||material.isRawShaderMaterial)return;
  const custom=material.isShaderMaterial?roomFogShaderKind(material):null;
  if(material.isShaderMaterial&&(!allowCustom||!custom))return;
  const compile=material.onBeforeCompile,key=material.customProgramCacheKey,cacheKey=key===Material.prototype.customProgramCacheKey?compile.toString():null;
  material.onBeforeCompile=function(shader,...args){
   compile.call(this,shader,...args);
   if(enabled)applyRoomFogShader(shader,uniforms,{sprite:material.isSpriteMaterial,custom,centroid:fragmentMaskCentroid&&hasFragmentOnlySkinCallback(material,compile)});
  };
  material.customProgramCacheKey=function(){return(cacheKey??key.call(this))+(enabled?':room-fog-3:':':room-original-3:')+(custom||'builtin')+(fragmentMaskCentroid&&hasFragmentOnlySkinCallback(material,compile)?':skin-centroid-1':'');};
  const released=()=>{material.onBeforeCompile=compile;material.customProgramCacheKey=key;material.removeEventListener('dispose',released);patched.delete(material);};
  material.addEventListener('dispose',released);material.needsUpdate=true;patched.set(material,{compile,key,baseKey:cacheKey??key.call(material),released,wrapper:material.onBeforeCompile});
 }
 function guarded(camera,root,geometry,material,object,group){
  // EffectComposer renders separate fullscreen meshes/scenes. Their screen
  // coordinates are not castle coordinates; keep every post-process pass.
  // Three's shadow renderer passes null as the scene, so keep that game pass.
  if(root&&root!==scene)return original.call(this,camera,root,geometry,material,object,group);
  const coarse=enabled&&rects.length?boxFor(object):null;
  if(enabled&&rects.length){stats.tested++;if(!overlaps(coarse)){stats.culled++;return;}}
  // Colour only: fully room-masked skins cannot contribute any visible pixel.
  // Keep the existing shadow path; a hidden actor can still cast a visible shadow.
  const entry=patched.get(material),nativeSkin=entry?.compile===Material.prototype.onBeforeCompile,fragmentSkin=entry&&fragmentSkinCulling&&fragmentMaskCentroid&&hasFragmentOnlySkinCallback(material,entry.compile);
  if(enabled&&skinCulling&&rects.length&&root===scene&&object.isSkinnedMesh&&!material.isShaderMaterial&&!material.displacementMap&&entry?.wrapper===material.onBeforeCompile&&(nativeSkin||fragmentSkin)
    &&!rects.some(r=>coarse&&coarse.min.x>=r.x&&coarse.max.x<=r.x+r.w&&coarse.min.z>=r.z&&coarse.max.z<=r.z+r.d)){
   const bound=skinBounds.boxFor(object,renderFrame);if(bound&&!skinOverlapsRooms(bound,rects)){stats.skinCulled++;if(fragmentSkin&&!nativeSkin)stats.fragmentSkinCulled++;return;}
  }
  patch(material,root===scene);
  const insideEntry=patched.get(material);
  if(interiorMaterials&&enabled&&rects.length&&root===scene&&eligible(object,material,insideEntry)){
   const bound=object.isSkinnedMesh?skinBounds.boxFor(object,renderFrame):boxFor(object);
   if(insideRoomInterior(bound,rects)){stats.interiorDraws++;material=interiors.get(material,insideEntry.compile,insideEntry.baseKey,renderFrame);}
  }
  return original.call(this,camera,root,geometry,material,object,group);
 }
 const prepare=root=>root.traverse(o=>{let inScene=false;for(let p=o;p;p=p.parent)if(p===scene){inScene=true;break;}for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[])patch(m,inScene);});
 function eligible(object,material,entry){return object.isMesh&&!object.isBatchedMesh&&!material.isShaderMaterial&&!material.transparent&&!material.displacementMap&&!Object.keys(object.geometry.morphAttributes||{}).length&&entry&&(entry.compile===Material.prototype.onBeforeCompile||hasFragmentOnlySkinCallback(material,entry.compile));}
 async function compileReady(root,...args){
  prepare(root);root.updateMatrixWorld(true);root.traverse(o=>{if(o.isSkinnedMesh)skinBounds.boxFor(o,renderFrame);});const normal=originalCompile.call(this,root,...args),saved=[];
  // Compile both exact variants against the same lights and output target while
  // loading. Restore actual materials synchronously, before yielding a frame.
  root.traverse(o=>{if(Array.isArray(o.material)||!o.material)return;const m=o.material,e=patched.get(m);if(eligible(o,m,e)){saved.push([o,m]);o.material=interiors.get(m,e.compile,e.baseKey,renderFrame);}});
  let inside;
  try{inside=originalCompile.call(this,root,...args);}finally{for(const [o,m]of saved)o.material=m;}
  await Promise.all([normal,inside]);
  // Do driver reflection here rather than on the first combat draw.
  for(const [,m]of saved){const e=patched.get(m),clone=interiors.get(m,e.compile,e.baseKey,renderFrame),programs=renderer.properties?.get(clone).programs;if(programs)for(const program of programs.values()){program.getUniforms();program.getAttributes();}}
 }
 function renderReady(root,...args){if(root===scene)renderFrame++;return enabled&&pruning&&root===scene?renderWithoutBranches(branches,()=>originalRender.call(this,root,...args)):originalRender.call(this,root,...args);}
 renderer.render=renderReady;
 renderer.renderBufferDirect=guarded;if(originalCompile)renderer.compileAsync=compileReady;
 prepare(scene);
 const policyFilter=(torch,focus)=>!enabled||policy.torchAllowed(torch,focus);
 world.setRoomTorchFilter(policyFilter);
 function applyStatic(){stats.hiddenStatic=0;for(const o of roomSources(world.root)){o.userData.roomFogVisible=!enabled||overlaps(boxFor(o));if(!o.userData.roomFogVisible)stats.hiddenStatic++;}}
 return {
  get revision(){return signature+':'+enabled;},
  update(subject,yaw=0,entities=[],engine=null){
   for(const e of entities)if(e.mesh)entityRoots.set(e.mesh,e);
   const p=subject.body.position,view=policy.view(p,previous);zone=view.zone;previous=zone.id;rects=view.rects;
   const next=rects.map(r=>[r.id,r.x,r.z,r.w,r.d].join(',')).join('|');
   if(next!==signature){signature=next;for(let i=0;i<rects.length;i++){const r=rects[i];uniforms.roomFogRects.value[i].set(r.x-.5,r.z-.5,r.x+r.w+.5,r.z+r.d+.5);}applyStatic();}
   // Moving corridor shoulders change continuously. Use their full adjoining
   // rooms for this coarse traversal mask; the exact late mask still clips
   // each draw. Rebuild the scene branches only when entering another zone.
   if(pruneSignature!==zone.id){pruneSignature=zone.id;const coarse=zone.passage?[zone,...policy.rooms.filter(r=>r.id===zone.from||r.id===zone.to)]:rects;branches=hiddenRoomBranches(scene,boxFor,box=>overlapsRects(box,coarse));}
   uniforms.roomFogCount.value=enabled?rects.length:0;scene.background=enabled?black:oldBackground;
   for(const t of world.torches)t.roomVisible=!enabled||overlaps({min:{x:t.position.x,z:t.position.z},max:{x:t.position.x,z:t.position.z}});
   minimap.update(p,yaw,zone,engine);
  },
  setEnabled(value){if(enabled===!!value)return;enabled=!!value;signature='';uniforms.roomFogCount.value=enabled?rects.length:0;for(const m of patched.keys())m.needsUpdate=true;applyStatic();},
  setInteriorMaterials(value){interiorMaterials=!!value;},
  setPruning(value){pruning=!!value;},
  setSkinCulling(value){skinCulling=!!value;},
  setFragmentSkinCulling(value){fragmentSkinCulling=!!value;},
  setFragmentMaskCentroid(value){if(fragmentMaskCentroid===!!value)return;fragmentMaskCentroid=!!value;for(const [material,entry]of patched)if(hasFragmentOnlySkinCallback(material,entry.compile))material.needsUpdate=true;},
  setMaskShortCircuit(value){uniforms.roomFogShortCircuit.value=!!value;},
  entityVisible(entity){return !enabled||!rects.length||overlaps(entityBox(entity));},
  reset(){previous=null;signature='';pruneSignature='';minimap.reset();},
  snapshot:()=>({enabled,pruning,interiorMaterials,fragmentSkinCulling,fragmentMaskCentroid,maskShortCircuit:uniforms.roomFogShortCircuit.value,prunedBranches:branches.length,room:zone?.id,rects:rects.map(r=>({id:r.id,x:r.x,z:r.z,w:r.w,d:r.d})),...stats,minimap:minimap.snapshot()}),
  dispose(){if(renderer.render===renderReady)renderer.render=originalRender;if(renderer.renderBufferDirect===guarded)renderer.renderBufferDirect=original;if(renderer.compileAsync===compileReady)renderer.compileAsync=originalCompile;for(const [m,{compile,key,released}]of patched){m.removeEventListener('dispose',released);m.onBeforeCompile=compile;m.customProgramCacheKey=key;m.needsUpdate=true;}patched.clear();interiors.dispose();for(const o of roomSources(world.root))delete o.userData.roomFogVisible;world.setRoomTorchFilter(null);for(const t of world.torches)delete t.roomVisible;scene.background=oldBackground;minimap.dispose();}
 };
}
