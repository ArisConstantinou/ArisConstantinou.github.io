// Compile the actual run's materials after population, for the colour target
// this quality uses. The menu's actors are disposed when a new run starts.
export async function prepareRunShaders({renderer,scene,camera,quality,composer,objects=[],pointLightVariants=false,nextFrame=()=>new Promise(requestAnimationFrame)}) {
  if(!renderer.compileAsync)return;
  // Distant actors are deliberately detached by syncVisuals, not only hidden.
  // Compile those actual objects against the scene's lights/environment while
  // preserving their parent, visibility and every gameplay transform.
  const roots=[scene,...new Set(objects.filter(object=>{
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
  const counts=pointLightVariants?Array.from({length:lights.length+1},(_,i)=>i):[null];
  for(const variant of variants)for(const lightCount of counts){
    const previous=renderer.getRenderTarget(),pending=[];
    const saved=lights.map(light=>({intensity:light.intensity,color:light.color.clone()}));
    try{
      lights.forEach((light,i)=>{light.intensity=i<lightCount?1:0;if(i<lightCount)light.color.setRGB(1,1,1);});
      renderer.setRenderTarget(variant);for(const root of roots)pending.push(renderer.compileAsync(root,camera,root===scene?undefined:scene));
    }
    finally{renderer.setRenderTarget(previous);lights.forEach((light,i)=>{light.intensity=saved[i].intensity;light.color.copy(saved[i].color);});}
    await Promise.all(pending);
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
  return {programs:programs.size,pointLightCounts:counts.filter(count=>count!==null)};
}
