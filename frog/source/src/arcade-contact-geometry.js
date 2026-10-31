import{BufferGeometry,BufferAttribute}from'three';
const types={Uint8Array,Uint16Array,Uint32Array,Float32Array};
// A small weight/topology delta preserves the approved original mesh and UVs.
// No texture, original GLB, or editable source is replaced.
export function encodeContactGeometry(original,derived){
 const blocks=[],arrays={},centers={},count=derived.attributes.position.count;let size=0;
 const append=(name,array,itemSize)=>{size=Math.ceil(size/4)*4;arrays[name]={type:array.constructor.name,offset:size,length:array.length,itemSize};blocks.push({offset:size,array});size+=array.byteLength;};
 append('sourceVertex',new Uint32Array(derived.userData.sourceIndices),1);
 append('index',derived.index.array,1);
 for(const key of['skinIndex','skinWeight'])append(key,derived.attributes[key].array,4);
 append('contactCap',new Uint8Array(derived.attributes.contactCap.array),1);
 for(let i=0;i<count;i++)if(derived.userData.sourceIndices[i]<0){const attrs={};for(const[name,attr]of Object.entries(derived.attributes))if(!['skinIndex','skinWeight','contactCap'].includes(name))attrs[name]=Array.from({length:attr.itemSize},(_,k)=>attr.getComponent(i,k));centers[i]=attrs;}
 const data=new ArrayBuffer(Math.ceil(size/4)*4);for(const{offset,array}of blocks)new Uint8Array(data,offset,array.byteLength).set(new Uint8Array(array.buffer,array.byteOffset,array.byteLength));
 const samples=Array.from({length:32},(_,i)=>Math.floor(i/31*(original.attributes.position.count-1))).map(i=>[i,...[0,1,2].map(k=>original.attributes.position.getComponent(i,k))]);
 return{meta:{format:1,sourceVertices:original.attributes.position.count,sourceTriangles:original.index.count/3,count,arrays,centers,samples,capUV:derived.userData.capUV||[]},data};
}
export function decodeContactGeometry(original,meta,data){
 if(meta.format!==1||original.attributes.position.count!==meta.sourceVertices||original.index.count/3!==meta.sourceTriangles)throw Error('Contact geometry source mismatch');
 for(const[i,...point]of meta.samples)for(let k=0;k<3;k++)if(Math.abs(original.attributes.position.getComponent(i,k)-point[k])>1e-7)throw Error('Contact geometry source fingerprint mismatch');
 const array=name=>{const a=meta.arrays[name],Type=types[a.type];if(!Type)throw Error('Unknown contact attribute type');return new Type(data,a.offset,a.length);},source=array('sourceVertex'),geometry=new BufferGeometry();
 for(const[name,attr]of Object.entries(original.attributes)){
  if(name==='skinIndex'||name==='skinWeight')continue;
  const values=new Float32Array(meta.count*attr.itemSize);
  for(let i=0;i<meta.count;i++)for(let k=0;k<attr.itemSize;k++)values[i*attr.itemSize+k]=source[i]===0xffffffff?meta.centers[i][name][k]:attr.getComponent(source[i],k);
  geometry.setAttribute(name,new BufferAttribute(values,attr.itemSize));
 }
 for(const name of['skinIndex','skinWeight','contactCap'])geometry.setAttribute(name,new BufferAttribute(array(name),meta.arrays[name].itemSize));
 for(const[name,Type]of[['baseSkinIndex',Uint16Array],['baseSkinWeight',Float32Array]]){
  const attr=original.attributes[name==='baseSkinIndex'?'skinIndex':'skinWeight'],values=new Type(meta.count*4);
  for(let i=0;i<meta.count;i++)for(let k=0;k<4;k++)values[i*4+k]=source[i]===0xffffffff?meta.centers[i][name][k]:attr.getComponent(source[i],k);
  geometry.setAttribute(name,new BufferAttribute(values,4));
 }
 geometry.setIndex(new BufferAttribute(array('index'),1));for(const[i,u,v]of meta.capUV||[]){if(geometry.attributes.contactCap.getX(i)!==1)throw Error('Original UV override refused');geometry.attributes.uv.setXY(i,u,v);}geometry.computeBoundingBox();geometry.computeBoundingSphere();return geometry;
}
