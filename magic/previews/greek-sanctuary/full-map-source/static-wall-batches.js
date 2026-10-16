import {BatchedMesh,Matrix4,Material,Frustum,Sphere} from 'three';

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
 const bindings=[],batches=[];
 for(const sources of groups.values()){
  if(sources.length<3)continue;
  const geometries=[...new Set(sources.map(m=>m.geometry))],count=sources.reduce((n,m)=>n+(m.isInstancedMesh?m.count:1),0);
  const batch=new BatchedMesh(count,geometries.reduce((n,g)=>n+g.attributes.position.count,0),geometries.reduce((n,g)=>n+(g.index?.count||0),0),sources[0].material);
  batch.name='Static masonry batch';batch.castShadow=sources[0].castShadow;batch.receiveShadow=sources[0].receiveShadow;batch.sortObjects=false;
  const ids=new Map(geometries.map(g=>[g,batch.addGeometry(g)]));
  for(const source of sources){const instanceIds=[];
   for(let i=0;i<(source.isInstancedMesh?source.count:1);i++){
    if(source.isInstancedMesh){source.getMatrixAt(i,matrix);matrix.premultiply(source.matrixWorld);}else matrix.copy(source.matrixWorld);
    const id=batch.addInstance(ids.get(source.geometry));batch.setMatrixAt(id,matrix);instanceIds.push(id);
   }
   source.layers.set(31);source.traverse(o=>{o.updateMatrix();o.matrixAutoUpdate=false;o.matrixWorldAutoUpdate=false;});
   bindings.push({source,batch,ids:instanceIds,shown:null});
  }
  // Stored matrices above are world-space; the castle root is identity.
  root.add(batch);batch.matrixAutoUpdate=false;batch.matrixWorldAutoUpdate=false;batch.computeBoundingBox();batch.computeBoundingSphere();cacheStaticBatchBounds(batch);batches.push(batch);
 }
 function update(){for(const b of bindings){let shown=true;for(let n=b.source;n&&shown;n=n.parent)shown=n.visible;if(shown===b.shown)continue;b.shown=shown;for(const id of b.ids)b.batch.setVisibleAt(id,shown);}}
 update();return {update,meshes:bindings.length,groups:batches.length,instances:bindings.reduce((n,b)=>n+b.ids.length,0)};
}
