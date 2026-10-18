// CPU-only broad phase for full-detail animated picking. Conservative bone
// bounds shortlist original triangles; Three still calculates exact hits/UVs.
// Weak caches share immutable geometry across clones without retaining actors.
const sharedCache={trees:new WeakMap(),contexts:new WeakMap(),epoch:0};
export function createTrianglePicker(roots,{prepare=true,visibleOnly=false,cache=sharedCache}={}){
 const {trees,contexts}=cache,wrapped=[],stats={builds:0,buildMs:0,queries:0,nodeTests:0,sourceTriangles:0,candidateTriangles:0,skinBounds:0};let enabled=true;
 function eligible(o){return o.isMesh&&!o.isInstancedMesh&&!o.isBatchedMesh&&!Object.hasOwn(o,'raycast')&&!Object.hasOwn(o,'getVertexPosition')&&!o.geometry.morphAttributes.position&&o.geometry.attributes.position?.itemSize===3&&o.geometry.attributes.position.count>=96;}
 function signature(g){
  return ['position','skinIndex','skinWeight'].flatMap(name=>{
   const a=g.attributes[name];return[a,a?.array,a?.version,a?.count,a?.itemSize,a?.normalized,a?.data,a?.data?.version];
  }).concat([g.index,g.index?.array,g.index?.version,g.index?.count]);
 }
 function* treeSteps(g){
  const sig=signature(g),old=trees.get(g);if(old&&old.sig.every((v,i)=>v===sig[i]))return old;
  const start=performance.now(),p=g.attributes.position,index=g.index,count=Math.floor((index?.count??p.count)/3);
  if(!g.boundingBox)g.computeBoundingBox();if(!g.boundingSphere)g.computeBoundingSphere();
  const bounds=new Float64Array(count*6),centers=new Float64Array(count*3),ids=Array.from({length:count},(_,i)=>i);
  for(let i=0;i<count;i++){
   if(i%512===0)yield;
   const b=i*6;bounds[b]=bounds[b+1]=bounds[b+2]=Infinity;bounds[b+3]=bounds[b+4]=bounds[b+5]=-Infinity;
   for(let j=0;j<3;j++){const id=index?index.getX(i*3+j):i*3+j,x=p.getX(id),y=p.getY(id),z=p.getZ(id);bounds[b]=Math.min(bounds[b],x);bounds[b+1]=Math.min(bounds[b+1],y);bounds[b+2]=Math.min(bounds[b+2],z);bounds[b+3]=Math.max(bounds[b+3],x);bounds[b+4]=Math.max(bounds[b+4],y);bounds[b+5]=Math.max(bounds[b+5],z);}
   for(let a=0;a<3;a++)centers[i*3+a]=(bounds[b+a]+bounds[b+a+3])*.5;
  }
  let skinValid=!!g.attributes.skinIndex&&!!g.attributes.skinWeight;
  function boneBounds(n,list){
   if(!skinValid)return n;const boxes=new Map();let lo=Infinity,hi=-Infinity;
   if(n.ids){
    for(const tri of list)for(let j=0;j<3;j++){
     const id=index?index.getX(tri*3+j):tri*3+j;let sum=0;
     for(let k=0;k<4;k++){
      const weight=g.attributes.skinWeight.getComponent(id,k),bone=g.attributes.skinIndex.getComponent(id,k);
      if(!Number.isFinite(weight)||weight<0||!Number.isInteger(bone)||bone<0){skinValid=false;return n;}
      sum+=weight;if(!weight)continue;let box=boxes.get(bone);if(!box){box=g.boundingBox.clone().makeEmpty();boxes.set(bone,box);}const x=p.getX(id),y=p.getY(id),z=p.getZ(id);box.min.x=Math.min(box.min.x,x);box.min.y=Math.min(box.min.y,y);box.min.z=Math.min(box.min.z,z);box.max.x=Math.max(box.max.x,x);box.max.y=Math.max(box.max.y,y);box.max.z=Math.max(box.max.z,z);
     }lo=Math.min(lo,sum);hi=Math.max(hi,sum);
    }
   }else{
    for(const child of[n.left,n.right]){lo=Math.min(lo,child.weightLo);hi=Math.max(hi,child.weightHi);for(const[bone,box]of child.boneBoxes){const old=boxes.get(bone);if(old)old.union(box);else boxes.set(bone,box.clone());}}
   }
   n.boneBoxes=boxes;n.weightLo=lo;n.weightHi=hi;return n;
  }
  function* node(list){
   yield;
   const box=g.boundingBox.clone().makeEmpty();for(const id of list){const b=id*6;box.min.x=Math.min(box.min.x,bounds[b]);box.min.y=Math.min(box.min.y,bounds[b+1]);box.min.z=Math.min(box.min.z,bounds[b+2]);box.max.x=Math.max(box.max.x,bounds[b+3]);box.max.y=Math.max(box.max.y,bounds[b+4]);box.max.z=Math.max(box.max.z,bounds[b+5]);}
   const span=[box.max.x-box.min.x,box.max.y-box.min.y,box.max.z-box.min.z],axis=span.indexOf(Math.max(...span)),margin=1e-9*Math.max(1,Math.abs(box.min.x),Math.abs(box.min.y),Math.abs(box.min.z),Math.abs(box.max.x),Math.abs(box.max.y),Math.abs(box.max.z));box.expandByScalar(margin);
   if(list.length<=16)return boneBounds({box,ids:list},list);list.sort((a,b)=>centers[a*3+axis]-centers[b*3+axis]||a-b);const mid=list.length>>1;return boneBounds({box,left:yield* node(list.slice(0,mid)),right:yield* node(list.slice(mid))},list);
  }
  const entry={sig,root:yield* node(ids),count,proxy:Object.create(g),array:new Uint32Array(0),faceMap:[],index,skinValid};entry.skinValid=skinValid;
  trees.set(g,entry);stats.builds++;stats.buildMs+=performance.now()-start;return entry;
 }
 function tree(g){const steps=treeSteps(g);let step;do{step=steps.next();}while(!step.done);return step.value;}
 async function warm(root,nextFrame){
  const geometries=new Set();root.traverse(o=>{if(eligible(o))geometries.add(o.geometry)});
  for(const geometry of geometries){
   const steps=treeSteps(geometry);let deadline=performance.now()+4,step;
   do{step=steps.next();if(!step.done&&performance.now()>=deadline){await nextFrame();deadline=performance.now()+4;}}while(!step.done);
  }
 }
 function pose(mesh,t){
  let c=contexts.get(mesh);if(!c){c={matrices:[],scratch:t.root.box.clone()};contexts.set(mesh,c);}c.epoch=++cache.epoch;c.mesh=mesh;
  for(const bone of t.root.boneBoxes.keys()){
   if(!mesh.skeleton.bones[bone]||!mesh.skeleton.boneInverses[bone])return null;
   const m=c.matrices[bone]??=mesh.bindMatrix.clone();m.multiplyMatrices(mesh.skeleton.bones[bone].matrixWorld,mesh.skeleton.boneInverses[bone]);m.premultiply(mesh.bindMatrixInverse).multiply(mesh.bindMatrix);
  }
  return c;
 }
 function posedBox(n,c){
  if(n.poseEpoch===c.epoch)return n.poseBox;n.poseEpoch=c.epoch;const box=n.poseBox??=n.box.clone();box.makeEmpty();
  for(const[bone,b]of n.boneBoxes)box.union(c.scratch.copy(b).applyMatrix4(c.matrices[bone]));
  const translation=c.mesh.bindMatrixInverse.elements;
  if(box.isEmpty())box.min.set(translation[12],translation[13],translation[14]),box.max.copy(box.min);
  else for(const[key,j]of[['x',12],['y',13],['z',14]]){
   const a=box.min[key]-translation[j],b=box.max[key]-translation[j],values=[a*n.weightLo,a*n.weightHi,b*n.weightLo,b*n.weightHi];box.min[key]=Math.min(...values)+translation[j];box.max[key]=Math.max(...values)+translation[j];
  }
  box.expandByScalar(1e-8*Math.max(1,Math.abs(box.min.x),Math.abs(box.min.y),Math.abs(box.min.z),Math.abs(box.max.x),Math.abs(box.max.y),Math.abs(box.max.z)));return box;
 }
 function install(o){
  if(!eligible(o))return;if(prepare)tree(o.geometry);const original=o.raycast,originalSphere=o.computeBoundingSphere,sphereOwn=Object.hasOwn(o,'computeBoundingSphere');
  if(o.isSkinnedMesh)o.computeBoundingSphere=function(){if(!enabled)return originalSphere.call(this);const t=tree(this.geometry);if(!t.skinValid)return originalSphere.call(this);const c=pose(this,t);if(!c)return originalSphere.call(this);this.boundingSphere??=this.geometry.boundingSphere.clone();posedBox(t.root,c).getBoundingSphere(this.boundingSphere);stats.skinBounds++;};
  o.raycast=function(raycaster,hits){
   if(!enabled)return original.call(this,raycaster,hits);
   const g=this.geometry,start=g.drawRange.start,end=Math.min(g.index?.count??g.attributes.position.count,start+g.drawRange.count);
   if(start%3||Number.isFinite(end)&&end%3||g.groups.some(x=>x.start%3||x.count%3))return original.call(this,raycaster,hits);
   const t=tree(g);if(this.isSkinnedMesh&&!t.skinValid)return original.call(this,raycaster,hits);const c=this.isSkinnedMesh?pose(this,t):null;if(this.isSkinnedMesh&&!c)return original.call(this,raycaster,hits);
   const ray=raycaster.ray.clone().applyMatrix4(this.matrixWorld.clone().invert()),candidates=[];
   function visit(n){stats.nodeTests++;if(!ray.intersectsBox(c?posedBox(n,c):n.box))return;if(n.ids)candidates.push(...n.ids);else{visit(n.left);visit(n.right);}}
   visit(t.root);stats.queries++;stats.sourceTriangles+=t.count;if(!candidates.length)return;
   candidates.sort((a,b)=>a-b);const selected=candidates.filter(id=>id*3>=start&&id*3<end),groups=[];t.faceMap.length=0;
   const sourceGroups=Array.isArray(this.material)?g.groups:[{start:0,count:Infinity,materialIndex:0}];
   for(const group of sourceGroups){const groupStart=t.faceMap.length*3;for(const id of selected)if(id*3>=group.start&&id*3<group.start+group.count)t.faceMap.push(id);groups.push({start:groupStart,count:t.faceMap.length*3-groupStart,materialIndex:group.materialIndex});}
   if(!t.faceMap.length)return;if(t.array.length<t.faceMap.length*3)t.array=new Uint32Array(t.faceMap.length*3);
   for(let i=0;i<t.faceMap.length;i++)for(let j=0;j<3;j++){const offset=t.faceMap[i]*3+j;t.array[i*3+j]=t.index?t.index.getX(offset):offset;}
   t.proxy.index={array:t.array,count:t.faceMap.length*3,getX(i){return t.array[i];}};
   t.proxy.groups=Array.isArray(this.material)?groups:[];t.proxy.drawRange={start:0,count:t.faceMap.length*3};
   t.proxy.boundingBox=c?posedBox(t.root,c):t.root.box;t.proxy.boundingSphere=g.boundingSphere;
   const first=hits.length,oldBox=this.boundingBox;stats.candidateTriangles+=t.faceMap.length;this.geometry=t.proxy;
   if(c){this.boundingBox=t.proxy.boundingBox;this.boundingSphere??=g.boundingSphere.clone();this.boundingBox.getBoundingSphere(this.boundingSphere);}
   try{original.call(this,raycaster,hits);for(let i=first;i<hits.length;i++)hits[i].faceIndex=t.faceMap[hits[i].faceIndex];}
   finally{this.geometry=g;if(c)this.boundingBox=oldBox;}
  };
  wrapped.push([o,original,originalSphere,sphereOwn]);
 }
 for(const root of roots)root[visibleOnly?'traverseVisible':'traverse'](install);
 return {stats,warm,setEnabled(value){enabled=!!value;},dispose(){for(const[o,original,sphere,sphereOwn]of wrapped){delete o.raycast;if(o.isSkinnedMesh){if(sphereOwn)o.computeBoundingSphere=sphere;else delete o.computeBoundingSphere;}}}};
}

export function prepareObjectPicking(root){
 const picker=createTrianglePicker([root]);picker.dispose();
}

// Streamed close-detail surfaces are prepared in short jobs before installation.
export async function prepareObjectPickingAsync(root,nextFrame=()=>new Promise(requestAnimationFrame)){
 const picker=createTrianglePicker([],{prepare:false});
 try{await picker.warm(root,nextFrame);}finally{picker.dispose();}
}
