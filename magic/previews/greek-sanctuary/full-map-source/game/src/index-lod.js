import {BufferGeometry,BufferAttribute}from'three';

const installed=new WeakMap();
export async function indexLodHash(bytes){
 const input=bytes instanceof Uint8Array?bytes:new Uint8Array(bytes.buffer,bytes.byteOffset,bytes.byteLength);
 return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',input)),v=>v.toString(16).padStart(2,'0')).join('');
}
export function indexBytes(indices){
 const bytes=new Uint8Array(indices.length*4),view=new DataView(bytes.buffer);
 for(let i=0;i<indices.length;i++)view.setUint32(i*4,indices[i],true);
 return bytes;
}
const check=(condition,message)=>{if(!condition)throw Error('Index LOD: '+message);};
function levelOf(mesh,root){for(let o=mesh;o;o=o.parent){if(o.userData.redesignLod!==undefined)return Number(o.userData.redesignLod);if(o===root)break;}return null;}

// Sidecars contain ONLY new indices into the original decoded vertex buffers.
// They never replace position/UV/normal/weight data, bones, materials or poses.
// Template assets own both geometries for the same lifetime; actors share them.
export async function attachIndexLod(root,data){
 check(data?.schema===1&&data.level===3&&typeof data.id==='string'&&/^[a-f0-9]{64}$/.test(data.id),'unsupported recipe');
 const previous=installed.get(root);if(previous){check(previous.id===data.id,'a different recipe is already installed');return previous;}
 check(Array.isArray(data.parts)&&data.parts.length>0&&data.parts.length<=16,'invalid part list');
 const sources=[];root.traverse(o=>{if(o.isSkinnedMesh&&levelOf(o,root)===2)sources.push(o);});
 const prepared=[],seen=new Set();
 for(const part of data.parts){
  const candidates=sources.filter(o=>!Array.isArray(o.material)&&o.material.name===part.material&&o.geometry.index?.count===part.sourceIndexCount&&o.geometry.attributes.position?.count===part.sourceVertexCount);
  check(candidates.length===1,'source primitive is ambiguous or absent');const source=candidates[0],g=source.geometry;
  check(!seen.has(source),'duplicate primitive');seen.add(source);
  check(!Object.keys(g.morphAttributes).length&&!g.groups.length&&g.drawRange.start===0&&g.drawRange.count>=g.index.count,'unsupported source draw');
  check(await indexLodHash(indexBytes(g.index.array))===part.sourceIndexSha256,'source index order changed');
  check(part.attributes&&Object.keys(part.attributes).length===Object.keys(g.attributes).length,'source attribute list changed');
  for(const [name,proof]of Object.entries(part.attributes)){
   const a=g.attributes[name];check(a&&!a.isInterleavedBufferAttribute&&a.itemSize===proof.size&&a.count===part.sourceVertexCount&&a.array.constructor.name===proof.type&&a.normalized===proof.normalized,'source attribute format changed: '+name);
   check(await indexLodHash(a.array)===proof.sha256,'source attribute bytes changed: '+name);
  }
  check(g.attributes.skinIndex&&g.attributes.skinWeight,'missing skin binding');
  check(Array.isArray(part.indices)&&part.indices.length>0&&part.indices.length%3===0&&part.indices.length<g.index.count,'invalid reduction');
  check(part.indices.every(v=>Number.isSafeInteger(v)&&v>=0&&v<part.sourceVertexCount),'invalid vertex reference');
  const indices=new Uint32Array(part.indices);check(await indexLodHash(indexBytes(indices))===part.indexSha256,'reduced index data changed');
  for(let i=0;i<indices.length;i+=3)check(indices[i]!==indices[i+1]&&indices[i+1]!==indices[i+2]&&indices[i]!==indices[i+2],'degenerate reduced face');
  prepared.push({source,indices});
 }
 // Commit only after EVERY part passes, leaving the original scene untouched
 // when a stale/corrupt sidecar fails. No first-use checks occur during combat.
 const meshes=[];
 for(const {source,indices}of prepared){
  const geometry=new BufferGeometry();for(const [name,a]of Object.entries(source.geometry.attributes))geometry.setAttribute(name,a);
  geometry.setIndex(new BufferAttribute(indices,1));geometry.boundingBox=source.geometry.boundingBox?.clone()??null;geometry.boundingSphere=source.geometry.boundingSphere?.clone()??null;
  const mesh=source.clone(false);mesh.name=source.name+'_mobile_lod3';mesh.geometry=geometry;mesh.userData.redesignLod=3;mesh.visible=false;source.parent.add(mesh);meshes.push(mesh);
 }
 const result={id:data.id,model:data.model,meshes,sourceTriangles:prepared.reduce((n,v)=>n+v.source.geometry.index.count/3,0),triangles:prepared.reduce((n,v)=>n+v.indices.length/3,0)};
 installed.set(root,result);root.userData.indexLod={id:data.id,model:data.model,level:3,parts:meshes.length,sourceTriangles:result.sourceTriangles,triangles:result.triangles};return result;
}
