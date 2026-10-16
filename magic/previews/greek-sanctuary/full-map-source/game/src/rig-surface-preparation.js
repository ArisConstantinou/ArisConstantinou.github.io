// Keep detail hidden until its original textures and both colour-target shader
// variants are ready. Upload one unique texture between animation frames.
import {Sphere,Vector3} from 'three';
import {createBatchedTextureUploader} from './batched-texture-upload.js';
import {prepareEncodedTexture} from './texture-memory.js';
export function createRigSurfacePreparer({renderer,scene,camera,renderTargets=[],boundBatch=4096,nextFrame=()=>new Promise(requestAnimationFrame)}) {
  const textures=new Set();let pending=Promise.resolve();
  const upload=createBatchedTextureUploader({renderer,nextFrame});
  async function prepare(object){
    // The renderer also computes a skinned sphere for depth sorting when
    // frustum culling is disabled. Doing every detailed vertex on its first
    // visible frame caused another CPU hitch. Measure the original surface
    // in bounded batches, retaining the sphere on all immutable clones.
    object.updateMatrixWorld(true);
    const skins=[];object.traverse(o=>{if(o.isSkinnedMesh&&o.boundingSphere===null)skins.push(o)});
    const point=new Vector3();
    for(const mesh of skins){const sphere=new Sphere().makeEmpty(),count=mesh.geometry.attributes.position.count;
      for(let first=0;first<count;first+=boundBatch){await nextFrame();for(let i=first;i<Math.min(count,first+boundBatch);i++){mesh.getVertexPosition(i,point);sphere.expandByPoint(point)}}
      mesh.boundingSphere=sphere;
    }
    const maps=new Set();object.traverse(o=>{if(!o.isMesh)return;for(const m of Array.isArray(o.material)?o.material:[o.material])for(const value of Object.values(m||{}))if(value?.isTexture)maps.add(value)});
    for(const texture of maps)if(!textures.has(texture)){await prepareEncodedTexture(renderer,texture,upload);textures.add(texture)}
    if(renderer.compileAsync){
      const target=renderer.getRenderTarget();
      const variants=[null,...renderTargets].filter((t,i,a)=>a.indexOf(t)===i);
      for(const variant of variants){
        let compiling;
        try{renderer.setRenderTarget(variant);compiling=renderer.compileAsync(object,camera,scene)}
        finally{renderer.setRenderTarget(target)}
        await compiling;
      }
    }
  }
  return object=>{const job=pending.then(()=>prepare(object));pending=job.catch(()=>{});return job};
}
let prepare=async()=>{};
export function configureRigSurfacePreparation(options){prepare=createRigSurfacePreparer(options)}
export function prepareRigSurface(object){return prepare(object)}
