// Compile the actual run's materials after population, for the colour target
// this quality uses. The menu's actors are disposed when a new run starts.
export async function prepareRunShaders({renderer,scene,camera,quality,composer,objects=[],effectObjects=[],fadeObjects=[],pointLightVariants=false,lightCountPolicy=null,warmDraw=false,nextFrame=()=>new Promise(requestAnimationFrame)}) {
  if(!renderer.compileAsync)return;
  // Distant actors are deliberately detached by syncVisuals, not only hidden.
  // Compile those actual objects against the scene's lights/environment while
  // preserving their parent, visibility and every gameplay transform.
  const roots=[scene,...new Set([...objects,...effectObjects].filter(object=>{
    for(let p=object;p;p=p.parent)if(p===scene)return false;
    return true;
  }))];
  const variants=quality==='high'&&composer?[composer.readBuffer]:[null];
  // The diagnostic room omits exactly-zero lights. Fire can change their count,
  // which changes NUM_POINT_LIGHTS and therefore the program cache key. Prepare
  // every possible count while loading, restoring lights before any await/frame.
  // This is opt-in: normal full-world preparation keeps its stable light slots.
  const lights=[];
  if(pointLightVariants)scene.traverseVisible(object=>{if(object.isPointLight&&object.children.length===0)lights.push(object);});
  const counts=pointLightVariants?(lightCountPolicy?.preparationCounts(lights.length)??Array.from({length:lights.length+1},(_,i)=>i)):[null];
  const fadeMaterials=new Map();
  for(const object of fadeObjects)object.traverse(node=>{for(const material of Array.isArray(node.material)?node.material:node.material?[node.material]:[])if(!fadeMaterials.has(material))fadeMaterials.set(material,material.transparent);});
  // Wraith death changes the opaque program key. Prepare that exact fade
  // variant for each light bucket without exposing it in the loading scene.
  for(const fade of fadeMaterials.size?[false,true]:[false])for(const variant of variants)for(const lightCount of counts){
    const previous=renderer.getRenderTarget(),pending=[];
    const saved=lights.map(light=>({intensity:light.intensity,color:light.color.clone()}));
    try{
      if(fade)for(const material of fadeMaterials.keys())material.transparent=true;
      lights.forEach((light,i)=>{light.intensity=i<lightCount?1:0;if(i<lightCount)light.color.setRGB(1,1,1);});
      renderer.setRenderTarget(variant);for(const root of roots)pending.push(renderer.compileAsync(root,camera,root===scene?undefined:scene));
    }
    finally{renderer.setRenderTarget(previous);lights.forEach((light,i)=>{light.intensity=saved[i].intensity;light.color.copy(saved[i].color);});if(fade)for(const [material,transparent]of fadeMaterials){material.transparent=transparent;material.needsUpdate=true;}}
    await Promise.all(pending);
    if(warmDraw&&variant){
      // Metal can defer pipeline creation until the first actual draw despite
      // successful WebGL linking. Submit the real scene into its existing colour
      // target during loading and wait asynchronously for completion.
      try{
        if(fade)for(const material of fadeMaterials.keys())material.transparent=true;
        lights.forEach((light,i)=>{light.intensity=i<lightCount?1:0;if(i<lightCount)light.color.setRGB(1,1,1);});
        renderer.setRenderTarget(variant);renderer.info.reset();renderer.render(scene,camera);
      }finally{
        renderer.setRenderTarget(previous);lights.forEach((light,i)=>{light.intensity=saved[i].intensity;light.color.copy(saved[i].color);});
        if(fade)for(const [material,transparent]of fadeMaterials){material.transparent=transparent;material.needsUpdate=true;}
      }
      const gl=renderer.getContext(),fence=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE,0),started=performance.now();
      if(!fence)throw Error('Could not prepare GPU pipelines');
      try{gl.flush();while(true){const status=gl.clientWaitSync(fence,0,0);if(status===gl.ALREADY_SIGNALED||status===gl.CONDITION_SATISFIED)break;if(status===gl.WAIT_FAILED||performance.now()-started>20000)throw Error('GPU pipeline preparation failed');await nextFrame();}}
      finally{gl.deleteSync(fence);}
    }
  }
  // Three r180's compileAsync only polls program.isReady(). Its first-use
  // getUniforms/getAttributes still performs driver reflection (including the
  // original shader error checks). Do that work while loading, not on the
  // first visible Wraith/guard/masonry frame. This adapter is pinned to r180;
  // it neither draws hidden actors nor changes shaders or material properties.
  if(!renderer.properties?.get)return;
  const programs=new Set();
  for(const root of roots)root.traverse(object=>{
    for(const material of Array.isArray(object.material)?object.material:object.material?[object.material]:[]){
      const cached=renderer.properties.get(material).programs;
      if(cached)for(const program of cached.values())programs.add(program);
    }
  });
  let count=0;
  for(const program of programs){
    if(count++%4===0)await nextFrame();
    program.getUniforms();program.getAttributes();
  }
  return {gpuDrawsPrepared:!!warmDraw,programs:programs.size,pointLightCounts:counts.filter(count=>count!==null)};
}
