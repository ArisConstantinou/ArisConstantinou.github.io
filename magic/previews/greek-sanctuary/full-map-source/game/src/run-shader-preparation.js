// Compile the actual run's materials after population, for the colour target
// this quality uses. The menu's actors are disposed when a new run starts.
export async function prepareRunShaders({renderer,scene,camera,quality,composer,objects=[],nextFrame=()=>new Promise(requestAnimationFrame)}) {
  if(!renderer.compileAsync)return;
  // Distant actors are deliberately detached by syncVisuals, not only hidden.
  // Compile those actual objects against the scene's lights/environment while
  // preserving their parent, visibility and every gameplay transform.
  const roots=[scene,...new Set(objects.filter(object=>{
    for(let p=object;p;p=p.parent)if(p===scene)return false;
    return true;
  }))];
  const variants=quality==='high'&&composer?[composer.readBuffer]:[null];
  for(const variant of variants){
    const previous=renderer.getRenderTarget(),pending=[];
    try{renderer.setRenderTarget(variant);for(const root of roots)pending.push(renderer.compileAsync(root,camera,root===scene?undefined:scene));}
    finally{renderer.setRenderTarget(previous);}
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
}
