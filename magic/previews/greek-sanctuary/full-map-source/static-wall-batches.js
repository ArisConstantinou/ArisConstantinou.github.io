const fogSources=new WeakMap();
export const roomSources=root=>fogSources.get(root)||[];
function registerRoomSource(root,source){let list=fogSources.get(root);if(!list){list=[];fogSources.set(root,list);}list.push(source);}
import {BatchedMesh,Matrix4,Material,Frustum,Sphere,Mesh,BufferGeometry,BufferAttribute,DynamicDrawUsage} from 'three';
import {indexExactGeometry} from './exact-index.js';
import {registerStaticMasonryBatch} from './game/src/static-masonry-cache.js';

/** World-baked vertices need no per-vertex batching matrix/indirection lookup.
 * Keep Three's original per-instance culling and triangle order, then submit
 * exactly those indices. Independent camera streams upload only on changes. */
export function compactIdentityBatch(batch){
 if(!batch.geometry.index||batch.material.wireframe)return null;
 const identity=new Matrix4(),matrix=new Matrix4();
 for(let id=0;id<batch.instanceCount;id++){batch.getMatrixAt(id,matrix);if(!matrix.equals(identity))return null;}
 const geometry=new BufferGeometry();
 for(const [name,a]of Object.entries(batch.geometry.attributes))geometry.setAttribute(name,a);
 geometry.boundingBox=batch.geometry.boundingBox;geometry.boundingSphere=batch.geometry.boundingSphere;
 const mesh=new Mesh(geometry,batch.material),source=batch.geometry.index,streams=new WeakMap();
 mesh.userData.staticIndexStreams=[];
 mesh.name='Static masonry compact indices';mesh.castShadow=batch.castShadow;mesh.receiveShadow=batch.receiveShadow;
 mesh.matrix.copy(batch.matrix);mesh.matrixWorld.copy(batch.matrixWorld);mesh.matrixAutoUpdate=false;mesh.matrixWorldAutoUpdate=false;
 function prepare(renderer,scene,camera){
  batch.onBeforeRender(renderer,scene,camera,batch.geometry,batch.material);
  let stream=streams.get(camera);
  if(!stream){stream={index:new BufferAttribute(new source.array.constructor(source.count),1).setUsage(DynamicDrawUsage),ids:new Uint32Array(batch.instanceCount),length:-1,count:0};streams.set(camera,stream);mesh.userData.staticIndexStreams.push(stream.index);}
  const ids=batch._indirectTexture.image.data,n=batch._multiDrawCount;let changed=stream.length!==n;
  for(let i=0;!changed&&i<n;i++)changed=stream.ids[i]!==ids[i];
  if(changed){let offset=0;
   for(let i=0;i<n;i++){const start=batch._multiDrawStarts[i]/source.array.BYTES_PER_ELEMENT,count=batch._multiDrawCounts[i];stream.index.array.set(source.array.subarray(start,start+count),offset);offset+=count;stream.ids[i]=ids[i];}
   stream.length=n;stream.count=offset;stream.index.clearUpdateRanges();if(offset)stream.index.addUpdateRange(0,offset);stream.index.needsUpdate=true;
  }
  geometry.setIndex(stream.index);geometry.setDrawRange(0,stream.count);
 }
 mesh.onBeforeRender=prepare;mesh.onBeforeShadow=(renderer,object,camera,shadowCamera)=>prepare(renderer,null,shadowCamera);
 return mesh;
}

/** Pinned Three0.180 draw-list adapter. Immutable masonry needs its bounds
 * transformed once, not once per instance in every colour/shadow pass. */
export function cacheStaticBatchBounds(batch){
 const entries=[],matrix=new Matrix4(),frustum=new Frustum();
 const bytes=batch.geometry.index?.array.BYTES_PER_ELEMENT||1;
 for(let id=0;id<batch.instanceCount;id++){
  const geometry=batch.getGeometryIdAt(id),range=batch.getGeometryRangeAt(geometry);
  batch.getMatrixAt(id,matrix);entries.push({id,start:range.start*bytes,count:range.count,sphere:batch.getBoundingSphereAt(geometry,new Sphere()).applyMatrix4(matrix)});
 }
 const original=batch.onBeforeRender;
 batch.onBeforeRender=function(renderer,scene,camera,geometry,material){
  if(camera.isArrayCamera||this.sortObjects)return original.call(this,renderer,scene,camera,geometry,material);
  frustum.setFromProjectionMatrix(matrix.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse).multiply(this.matrixWorld),camera.coordinateSystem,camera.reversedDepth);
  const indirect=this._indirectTexture.image.data;let count=0,changed=this._visibilityChanged;
  for(const e of entries)if(this.getVisibleAt(e.id)&&(!this.perObjectFrustumCulled||frustum.intersectsSphere(e.sphere))){
   changed=changed||indirect[count]!==e.id;this._multiDrawStarts[count]=e.start;this._multiDrawCounts[count]=e.count;indirect[count++]=e.id;
  }
  if(changed||count!==this._multiDrawCount)this._indirectTexture.needsUpdate=true;
  this._multiDrawCount=count;this._visibilityChanged=false;
 };
 return batch;
}

/** Batch immutable masonry using the original geometry, material and matrices.
 * Originals remain on query layer31 for exact existing cutaway/aim raycasts.
 * Each source retains independent visibility, including its parent cutaway.
 * Animated doors, transparent surfaces and custom shaders keep their old path.
 */
export function batchStaticWalls(root,meshes){
 root.updateMatrixWorld(true);
 // The caller supplies immutable architecture only. Custom-shader sections
 // that cannot batch are still static, as are their structural parents.
 for(const mesh of meshes)for(let node=mesh;node;node=node===root?null:node.parent){node.matrixAutoUpdate=false;node.matrixWorldAutoUpdate=false;}
 const groups=new Map(),matrix=new Matrix4(),identity=new Matrix4();
 for(const mesh of meshes){
  const m=mesh.material,g=mesh.geometry;
  if(!m||Array.isArray(m)||m.transparent||(m.onBeforeCompile!==Material.prototype.onBeforeCompile&&!(m.userData.worldBakedBatch&&!mesh.isInstancedMesh&&mesh.matrixWorld.equals(identity)))||mesh.isSkinnedMesh||mesh.instanceColor||Object.keys(g.morphAttributes).length||g.drawRange.start!==0||Number.isFinite(g.drawRange.count))continue;
  const layout=Object.entries(g.attributes).map(([k,a])=>`${k}:${a.itemSize}:${a.normalized}:${a.array.constructor.name}`).sort().join(',');
  const key=`${m.uuid}:${!!g.index}:${+mesh.castShadow}:${+mesh.receiveShadow}:${layout}`;
  if(!groups.has(key))groups.set(key,[]);groups.get(key).push(mesh);
 }
 const bindings=[],batches=[],indexed=new Set(),visibilityChains=new Map();
 for(const sources of groups.values()){
  if(sources.length<3)continue;
  const geometries=[...new Set(sources.map(m=>m.geometry))],count=sources.reduce((n,m)=>n+(m.isInstancedMesh?m.count:1),0);
  // All supported sources have the same index layout; preserve that layout.
  // Sharing bit-identical indexed vertices reduces buffers without changing
  // triangle topology, UV/normal seams, raycast face numbers or silhouettes.
  for(const g of geometries)if(g.index&&!indexed.has(g)){indexExactGeometry(g);indexed.add(g);}
  const batch=new BatchedMesh(count,geometries.reduce((n,g)=>n+g.attributes.position.count,0),geometries.reduce((n,g)=>n+(g.index?.count||0),0),sources[0].material);
  batch.name='Static masonry batch';batch.castShadow=sources[0].castShadow;batch.receiveShadow=sources[0].receiveShadow;batch.sortObjects=false;
  const ids=new Map(geometries.map(g=>[g,batch.addGeometry(g)]));
  // Query meshes retain their local indices, bounds and exact vertex values,
  // but can reference the already packed attribute bytes instead of keeping
  // another complete copy of the castle in CPU/unified memory.
  for(const g of geometries){const range=batch.getGeometryRangeAt(ids.get(g));
   for(const [name,a]of Object.entries(g.attributes)){const packed=batch.geometry.attributes[name],start=range.vertexStart*a.itemSize,array=packed.array.subarray(start,start+range.vertexCount*a.itemSize),shared=new BufferAttribute(array,a.itemSize,a.normalized);shared.name=a.name;shared.setUsage(a.usage);shared.gpuType=a.gpuType;g.setAttribute(name,shared);}
  }
  for(const source of sources){const instanceIds=[];
   for(let i=0;i<(source.isInstancedMesh?source.count:1);i++){
    if(source.isInstancedMesh){source.getMatrixAt(i,matrix);matrix.premultiply(source.matrixWorld);}else matrix.copy(source.matrixWorld);
    const id=batch.addInstance(ids.get(source.geometry));batch.setMatrixAt(id,matrix);instanceIds.push(id);
   }
   source.layers.set(31);source.traverse(o=>{o.updateMatrix();o.matrixAutoUpdate=false;o.matrixWorldAutoUpdate=false;});
   visibilityChains.set(source,Array.from((function*(){for(let node=source;node;node=node.parent)yield node;})()));
   registerRoomSource(root,source);bindings.push({source,batch,ids:instanceIds,shown:null});
  }
  // Stored matrices above are world-space; the castle root is identity.
  root.add(batch);batch.matrixAutoUpdate=false;batch.matrixWorldAutoUpdate=false;batch.computeBoundingBox();batch.computeBoundingSphere();cacheStaticBatchBounds(batch);registerStaticMasonryBatch(batch);batches.push(batch);
  const compact=compactIdentityBatch(batch);if(compact){batch.visible=false;root.add(compact);}
 }
 // Query objects retain exact geometry and frozen world matrices. Their original
 // ownership chain controls visibility without walking them again in every render pass.
 for(const {source}of bindings)if(!source.children.length)source.removeFromParent();
 function isVisible(source){const chain=visibilityChains.get(source);if(chain)return chain.every(node=>node.visible&&node.userData.roomFogVisible!==false);for(let node=source;node;node=node.parent)if(!node.visible)return false;return true;}
 function update(){for(const b of bindings){const shown=isVisible(b.source);if(shown===b.shown)continue;b.shown=shown;for(const id of b.ids)b.batch.setVisibleAt(id,shown);}}
 update();return {update,isVisible,meshes:bindings.length,groups:batches.length,instances:bindings.reduce((n,b)=>n+b.ids.length,0)};
}
