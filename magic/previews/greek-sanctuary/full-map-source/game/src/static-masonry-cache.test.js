import test from 'node:test';import assert from 'node:assert/strict';
import {registerStaticMasonryBatch,staticMasonryRevision} from './static-masonry-cache.js';
function fixture(){const visible=[true,true],ids=[0,1],batch={isBatchedMesh:true,matrixAutoUpdate:false,matrixWorldAutoUpdate:false,geometry:{},instanceCount:2,_availableInstanceIds:[],_matricesTexture:{version:4},onBeforeRender(){},onBeforeShadow(){},getVisibleAt:i=>visible[i],getGeometryIdAt:i=>ids[i]};registerStaticMasonryBatch(batch);return{batch,visible,ids};}
test('registered immutable batches report every visibility and geometry selection change',()=>{const {batch,visible,ids}=fixture(),before=staticMasonryRevision(batch);assert(before);visible[0]=false;assert.notDeepEqual(staticMasonryRevision(batch),before);const second=staticMasonryRevision(batch);ids[1]=0;assert.notDeepEqual(staticMasonryRevision(batch),second);});
test('unknown callbacks, matrices, topology and transform ownership fall back to live rendering',()=>{
 for(const mutate of [b=>b._matricesTexture.version++,b=>b._matricesTexture={},b=>b.geometry={},b=>b.instanceCount++,b=>b._availableInstanceIds.push(0),b=>b.onBeforeRender=()=>{},b=>b.onBeforeShadow=()=>{},b=>b.matrixAutoUpdate=true,b=>b.matrixWorldAutoUpdate=true]){const {batch}=fixture();mutate(batch);assert.equal(staticMasonryRevision(batch),null);}
 assert.equal(staticMasonryRevision({isBatchedMesh:true}),null);
});
