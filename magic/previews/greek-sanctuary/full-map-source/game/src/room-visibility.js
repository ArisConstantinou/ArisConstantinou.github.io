import {Box3,Color,Vector4,Material,DynamicDrawUsage} from 'three';
import {corridors} from './castle-layout.js';
import {createRoomZones} from './room-zones.js';
import {createRoomMinimap} from './room-minimap.js';
import {roomSources} from '../../static-wall-batches.js';
import {applyRoomFogShader,roomFogShaderKind} from './room-fog-shader.js';
import {hiddenRoomBranches,renderWithoutBranches} from './room-render-prune.js';
export function createRoomVisibility({renderer,scene,world}){
 const realZones=world.zones.map(z=>({id:z.name,label:z.label,secret:z.secret,x:z.xMin,z:z.zMin,w:z.xMax-z.xMin,d:z.zMax-z.zMin}));
 const policy=createRoomZones(realZones.filter(z=>!z.secret),corridors,realZones.filter(z=>z.secret)),minimap=createRoomMinimap(policy);
 const original=renderer.renderBufferDirect,originalRender=renderer.render,originalCompile=renderer.compileAsync,oldBackground=scene.background,black=new Color(0x000000),boxes=new WeakMap(),patched=new Map(),scratch=new Box3(),entityRoots=new WeakMap(),owners=new WeakMap();
 const uniforms={roomFogRects:{value:Array.from({length:8},()=>new Vector4())},roomFogCount:{value:0}};
 let enabled=true,pruning=true,branches=[],pruneSignature='',rects=[],zone=null,signature='',previous=null;const stats={tested:0,culled:0,hiddenStatic:0};
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
   if(enabled)applyRoomFogShader(shader,uniforms,{sprite:material.isSpriteMaterial,custom});
  };
  material.customProgramCacheKey=function(){return(cacheKey??key.call(this))+(enabled?':room-fog-3:':':room-original-3:')+(custom||'builtin');};
  const released=()=>{material.onBeforeCompile=compile;material.customProgramCacheKey=key;material.removeEventListener('dispose',released);patched.delete(material);};
  material.addEventListener('dispose',released);material.needsUpdate=true;patched.set(material,{compile,key,released});
 }
 function guarded(camera,root,geometry,material,object,group){
  // EffectComposer renders separate fullscreen meshes/scenes. Their screen
  // coordinates are not castle coordinates; keep every post-process pass.
  // Three's shadow renderer passes null as the scene, so keep that game pass.
  if(root&&root!==scene)return original.call(this,camera,root,geometry,material,object,group);
  if(enabled&&rects.length){stats.tested++;if(!overlaps(boxFor(object))){stats.culled++;return;}}
  patch(material,root===scene);return original.call(this,camera,root,geometry,material,object,group);
 }
 const prepare=root=>root.traverse(o=>{let inScene=false;for(let p=o;p;p=p.parent)if(p===scene){inScene=true;break;}for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[])patch(m,inScene);});
 function compileReady(root,...args){prepare(root);return originalCompile.call(this,root,...args);}
 function renderReady(root,...args){return enabled&&pruning&&root===scene?renderWithoutBranches(branches,()=>originalRender.call(this,root,...args)):originalRender.call(this,root,...args);}
 renderer.render=renderReady;
 renderer.renderBufferDirect=guarded;if(originalCompile)renderer.compileAsync=compileReady;
 prepare(scene);
 const policyFilter=(torch,focus)=>!enabled||policy.torchAllowed(torch,focus);
 world.setRoomTorchFilter(policyFilter);
 function applyStatic(){stats.hiddenStatic=0;for(const o of roomSources(world.root)){o.userData.roomFogVisible=!enabled||overlaps(boxFor(o));if(!o.userData.roomFogVisible)stats.hiddenStatic++;}}
 return {
  update(subject,yaw=0,entities=[]){
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
   minimap.update(p,yaw,zone);
  },
  setEnabled(value){if(enabled===!!value)return;enabled=!!value;signature='';uniforms.roomFogCount.value=enabled?rects.length:0;for(const m of patched.keys())m.needsUpdate=true;applyStatic();},
  setPruning(value){pruning=!!value;},
  entityVisible(entity){return !enabled||!rects.length||overlaps(entityBox(entity));},
  reset(){previous=null;signature='';pruneSignature='';minimap.reset();},
  snapshot:()=>({enabled,pruning,prunedBranches:branches.length,room:zone?.id,rects:rects.map(r=>({id:r.id,x:r.x,z:r.z,w:r.w,d:r.d})),...stats,minimap:minimap.snapshot()}),
  dispose(){if(renderer.render===renderReady)renderer.render=originalRender;if(renderer.renderBufferDirect===guarded)renderer.renderBufferDirect=original;if(renderer.compileAsync===compileReady)renderer.compileAsync=originalCompile;for(const [m,{compile,key,released}]of patched){m.removeEventListener('dispose',released);m.onBeforeCompile=compile;m.customProgramCacheKey=key;m.needsUpdate=true;}patched.clear();for(const o of roomSources(world.root))delete o.userData.roomFogVisible;world.setRoomTorchFilter(null);for(const t of world.torches)delete t.roomVisible;scene.background=oldBackground;minimap.dispose();}
 };
}
