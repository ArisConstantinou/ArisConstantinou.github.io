// Only the immutable masonry factory registers batches. Callback identity and
// original matrix storage are part of that contract; unknown batches stay live.
const registered=new WeakMap();
export function registerStaticMasonryBatch(batch){
 registered.set(batch,{geometry:batch.geometry,count:batch.instanceCount,matrices:batch._matricesTexture,version:batch._matricesTexture?.version,render:batch.onBeforeRender,shadow:batch.onBeforeShadow});
}
export function staticMasonryRevision(batch){
 const entry=registered.get(batch);
 if(!entry||!batch.isBatchedMesh||batch.matrixAutoUpdate||batch.matrixWorldAutoUpdate||batch.geometry!==entry.geometry||batch.instanceCount!==entry.count||batch._availableInstanceIds?.length||batch._matricesTexture!==entry.matrices||batch._matricesTexture?.version!==entry.version||batch.onBeforeRender!==entry.render||batch.onBeforeShadow!==entry.shadow)return null;
 const revision=[batch.perObjectFrustumCulled,batch.sortObjects,entry.matrices,entry.version];
 for(let i=0;i<entry.count;i++)revision.push(batch.getVisibleAt(i),batch.getGeometryIdAt(i));
 return revision;
}
