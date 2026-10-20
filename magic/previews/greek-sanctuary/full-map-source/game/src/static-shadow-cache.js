// Pinned Three r180 PCF shadow-map reuse. Cache rigid world geometry and
// sleeping props; animate actors and awake physics props on every frame.
// A complete input comparison invalidates before the current shadow pass.
export function createStaticShadowCache({renderer,scene,world,getEntities,getRevision=()=>''}){
 const gl=renderer.getContext(),original={shadow:renderer.shadowMap.render,clear:renderer.clear,direct:renderer.renderBufferDirect};
 const stats={hits:0,builds:0,fallbacks:0,skippedDraws:0,staticCasters:0,blits:0,smallPassBypasses:0,staticDraws:0,staticTriangles:0};
 let enabled=true,cache=null,active=null,building=false,observing=false,observedDraws=0,observedTriangles=0,previous=[],previousView=[],stable=0,valid=false,staticSet=new Set(),disposed=false;
 const roots=new Set(),inputs=[],casters=[],dynamic=[];
 function same(a,b){if(a.length!==b.length)return false;for(let i=0;i<a.length;i++)if(a[i]!==b[i])return false;return true;}
 function discard(){cache?.dispose();cache=null;valid=false;stable=0;previous=[];previousView=[];}
 function rigid(o){
  if(!o.isMesh||o.isSkinnedMesh||o.isBatchedMesh||o.customDepthMaterial||o.morphTargetInfluences?.length||Object.keys(o.geometry.morphAttributes).length)return false;
  if(Object.hasOwn(o,'onBeforeShadow')&&!o.userData.staticIndexStreams)return false;
  if(Object.hasOwn(o,'onBeforeRender')&&!o.userData.staticIndexStreams)return false;
  if(o.isInstancedMesh&&o.instanceMatrix.usage===35048)return false;
  if(![o.material].flat().every(m=>m&&!m.isShaderMaterial&&!m.isRawShaderMaterial&&!m.displacementMap&&!m.alphaHash&&!(m.clipShadows&&m.clippingPlanes?.length)))return false;
  for(let n=o;n;n=n.parent)if(roots.has(n))return true;
  return false;
 }
 function append(o){
  const g=o.geometry;inputs.push(o,o.layers.mask,o.castShadow,g,g.index,g.index?.version,g.drawRange.start,g.drawRange.count,...o.matrixWorld.elements);
  for(const a of Object.values(g.attributes))inputs.push(a,a.version,a.data?.version);
  if(o.isInstancedMesh)inputs.push(o.count,o.instanceMatrix,o.instanceMatrix.version);
  for(const m of [o.material].flat()){
   inputs.push(m,m.version,m.visible,m.side,m.shadowSide,m.wireframe,m.wireframeLinewidth,m.alphaTest,m.alphaToCoverage,m.map,m.map?.version,m.alphaMap,m.alphaMap?.version,m.clipShadows);
   if(m.alphaTest>0)for(const t of [m.map,m.alphaMap])if(t)inputs.push(t.offset.x,t.offset.y,t.repeat.x,t.repeat.y,t.rotation,t.center.x,t.center.y,t.channel,t.wrapS,t.wrapT,...t.matrix.elements);
  }
  for(const group of g.groups)inputs.push(group.start,group.count,group.materialIndex);
 }
 function clear(...args){
  const value=original.clear.apply(this,args);
  if(active&&!building&&renderer.getRenderTarget()===active.shadow.map){
   const src=renderer.properties.get(cache).__webglFramebuffer,dst=renderer.properties.get(active.shadow.map).__webglFramebuffer;
   // Both targets come from the same Three render-target descriptor. Copy
   // hardware depth as well as packed depth colour, so a moving caster behind
   // a wall cannot overwrite its cached shadow.
   gl.bindFramebuffer(gl.READ_FRAMEBUFFER,src);
   gl.blitFramebuffer(0,0,cache.width,cache.height,0,0,cache.width,cache.height,gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT,gl.NEAREST);
   gl.bindFramebuffer(gl.READ_FRAMEBUFFER,dst);stats.blits++;
  }
  return value;
 }
 function direct(camera,root,geometry,material,object,group){
  if(active&&!building&&camera===active.shadow.camera&&staticSet.has(object)){stats.skippedDraws++;return;}
  if(observing&&staticSet.has(object)){
   const calls=renderer.info.render.calls,triangles=renderer.info.render.triangles;
   const value=original.direct.call(this,camera,root,geometry,material,object,group);
   observedDraws+=renderer.info.render.calls-calls;observedTriangles+=renderer.info.render.triangles-triangles;return value;
  }
  return original.direct.call(this,camera,root,geometry,material,object,group);
 }
 function observe(lights,root,camera){
  observing=true;observedDraws=observedTriangles=0;
  try{return original.shadow.call(renderer.shadowMap,lights,root,camera);}
  finally{observing=false;stats.staticDraws=observedDraws;stats.staticTriangles=observedTriangles;}
 }
 function shadow(lights,root,camera){
  if(building)return original.shadow.call(this,lights,root,camera);
  // EffectComposer has its own scenes. They must neither use nor invalidate
  // the castle's cached shadow inputs.
  if(root!==scene)return original.shadow.call(this,lights,root,camera);
  active=null;
  if(!enabled||!this.enabled||!this.autoUpdate||this.type!==2||lights.length!==1||!lights[0].isDirectionalLight||!lights[0].shadow.map||!lights[0].shadow.autoUpdate||lights[0].shadow.map.samples||renderer.clippingPlanes.length){stats.fallbacks++;valid=false;return original.shadow.call(this,lights,root,camera);}
  const light=lights[0],shadow=light.shadow;shadow.updateMatrices(light);
  const view=[this.type,camera.layers.mask,shadow.map,shadow.map.width,shadow.map.height,shadow.camera.layers.mask,getRevision(),...shadow.camera.projectionMatrix.elements,...shadow.camera.matrixWorldInverse.elements];
  // A following light changes every walking frame. Keep the ordinary pass
  // without scanning the castle or building a texture that cannot be reused.
  if(!same(view,previousView)){previousView=view;valid=false;stable=0;previous=[];stats.fallbacks++;return original.shadow.call(this,lights,root,camera);}
  roots.clear();roots.add(world.root);
  for(const e of getEntities())if(!e.removed&&e.category==='prop'&&e.mesh&&(e.anchored||e.body?.mass===0||e.body?.sleepState===2))roots.add(e.mesh);
  inputs.length=casters.length=dynamic.length=0;
  inputs.push(...view);
  scene.traverseVisible(o=>{
   if(!o.isMesh||!o.castShadow||!o.layers.test(camera.layers))return;
   if(!rigid(o)){dynamic.push(o);return;}
   if(o.userData.staticIndexStreams)o.onBeforeShadow(renderer,o,camera,shadow.camera);
   casters.push(o);append(o);
  });
  stats.staticCasters=casters.length;
  staticSet=new Set(casters);
  const changed=!same(inputs,previous)||this.needsUpdate||shadow.needsUpdate;
  if(changed){previous=inputs.slice();stable=0;valid=false;}
  if(!casters.length||!valid&&++stable<3){stats.fallbacks++;return observe(lights,root,camera);}
  // In the library/forge, the room mask can leave only 28 rigid shadow
  // triangles. A full-resolution framebuffer copy costs more than that work.
  // Eligibility comes from actual submitted work, after fog/frustum culling.
  if(!valid&&(stats.staticTriangles<10000||stats.staticDraws<3)){stats.smallPassBypasses++;return observe(lights,root,camera);}
  if(!valid){
   if(cache&&(cache.width!==shadow.map.width||cache.height!==shadow.map.height)){cache.dispose();cache=null;}
   cache??=shadow.map.clone();const target=shadow.map;
   building=true;
   try{for(const o of dynamic)o.castShadow=false;shadow.map=cache;original.shadow.call(this,lights,root,camera);valid=true;stats.builds++;}
   finally{shadow.map=target;for(const o of dynamic)o.castShadow=true;building=false;}
  }else stats.hits++;
  active=light;
  try{return original.shadow.call(this,lights,root,camera);}finally{active=null;}
 }
 const lost=()=>discard();renderer.domElement.addEventListener('webglcontextlost',lost);
 renderer.clear=clear;renderer.renderBufferDirect=direct;renderer.shadowMap.render=shadow;
 return {stats,setEnabled(value){if(enabled!==!!value){enabled=!!value;discard();}},dispose(){if(disposed)return;disposed=true;if(renderer.clear===clear)renderer.clear=original.clear;if(renderer.renderBufferDirect===direct)renderer.renderBufferDirect=original.direct;if(renderer.shadowMap.render===shadow)renderer.shadowMap.render=original.shadow;renderer.domElement.removeEventListener('webglcontextlost',lost);discard();}};
}
