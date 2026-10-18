/** Bit-exact vertex sharing. Triangle order, winding and every attribute bit
 * are retained. No quantization, tolerance, edge collapse or LOD is used. */
export function indexExactGeometry(g){
 const attrs=Object.values(g.attributes),n=g.attributes.position?.count;
 if(!n||attrs.some(a=>a.isInterleavedBufferAttribute||a.isInstancedBufferAttribute||a.count!==n)||Object.keys(g.morphAttributes).length)return null;
 const views=Object.entries(g.attributes).map(([name,a])=>{const size=a.itemSize*a.array.BYTES_PER_ELEMENT;return {name,a,size,bytes:new Uint8Array(a.array.buffer,a.array.byteOffset,a.array.byteLength)};});
 let capacity=1;while(capacity<n*2)capacity*=2;
 const table=new Int32Array(capacity);table.fill(-1);const remap=new Uint32Array(n),unique=new Uint32Array(n);let count=0;
 const equal=(a,b)=>{for(const v of views)for(let k=0;k<v.size;k++)if(v.bytes[a*v.size+k]!==v.bytes[b*v.size+k])return false;return true;};
 for(let i=0;i<n;i++){
  let hash=2166136261;for(const v of views)for(let k=0;k<v.size;k++)hash=Math.imul(hash^v.bytes[i*v.size+k],16777619);
  let slot=hash&(capacity-1);while(table[slot]!==-1&&!equal(i,table[slot]))slot=(slot+1)&(capacity-1);
  if(table[slot]===-1){table[slot]=i;unique[count]=i;remap[i]=count++;}else remap[i]=remap[table[slot]];
 }
 if(count===n)return {before:n,after:n};
 for(const v of views){const array=new v.a.array.constructor(count*v.a.itemSize),bytes=new Uint8Array(array.buffer);for(let i=0;i<count;i++)bytes.set(v.bytes.subarray(unique[i]*v.size,(unique[i]+1)*v.size),i*v.size);const a=new v.a.constructor(array,v.a.itemSize,v.a.normalized);a.name=v.a.name;a.setUsage(v.a.usage);a.gpuType=v.a.gpuType;g.setAttribute(v.name,a);}
 // setIndex selects Uint16/Uint32 by maximum value; index element order stays.
 const oldIndex=g.index,old=oldIndex?.array,indices=Array.from({length:old?.length??n},(_,i)=>remap[old?old[i]:i]);
 // Existing multi-draw byte offsets rely on the original index element width.
 g.setIndex(oldIndex?new oldIndex.constructor(new old.constructor(indices),1):indices);
 return {before:n,after:count};
}
