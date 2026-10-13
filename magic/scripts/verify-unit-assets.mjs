import fs from 'node:fs/promises';import path from 'node:path';import {createHash} from 'node:crypto';
const root=path.resolve('.'),base='C:/Users/arz0r/Documents/ChatGPT/Magic',out=path.join(root,'output/locomotion/asset');await fs.mkdir(out,{recursive:true});
const hash=b=>createHash('sha256').update(b).digest('hex');
async function load(file){const raw=await fs.readFile(file),n=raw.readUInt32LE(12),g=JSON.parse(raw.subarray(20,20+n)),bin=raw.subarray(28+n);return{raw,g,bin};}
const width={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT4:16},size={5121:1,5123:2,5125:4,5126:4},read={5121:'readUInt8',5123:'readUInt16LE',5125:'readUInt32LE',5126:'readFloatLE'};
function values(m,id){const a=m.g.accessors[id],v=m.g.bufferViews[a.bufferView],s=size[a.componentType],w=width[a.type],stride=v.byteStride||s*w,data=[];for(let i=0;i<a.count;i++)for(let j=0;j<w;j++)data.push(m.bin[read[a.componentType]]((v.byteOffset||0)+(a.byteOffset||0)+i*stride+j*s));return data;}
function channelMap(m,name){const a=m.g.animations.find(a=>a.name===name);return Object.fromEntries(a.channels.map(c=>{const s=a.samplers[c.sampler];return[m.g.nodes[c.target.node].name+'.'+c.target.path,hash(Buffer.from(JSON.stringify({i:values(m,s.input),o:values(m,s.output),interpolation:s.interpolation})))];}));}
const report={protectedPrimary:base,conditions:'Semantic GLB comparison against protected assets. HEARTH POSITION/NORMAL/bind transforms intentionally change with longer legs. Boss geometry unchanged; only named locomotion/flight clips change.',checks:[],assets:[]};
const check=(pass,label,data)=>report.checks.push({pass:!!pass,label,data});
for(const name of ['hearth-bulwark/hearth-bulwark','bosses/colossus','bosses/gargoyle']){
 const file=`_source/public/models/${name}.glb`,old=await load(path.join(base,file)),m=await load(path.join(root,file));
 const op=old.g.meshes.flatMap(m=>m.primitives),np=m.g.meshes.flatMap(m=>m.primitives);check(op.length===np.length,name+' preserves primitive/material partitions');
 let topology=true,uv=true,weights=true,geometry=true,finite=true,normalized=true,vertices=0,triangles=0;
 for(let i=0;i<np.length;i++){const a=op[i],b=np[i];topology&&=JSON.stringify(values(old,a.indices))===JSON.stringify(values(m,b.indices));triangles+=m.g.accessors[b.indices].count/3;vertices+=m.g.accessors[b.attributes.POSITION].count;
  for(const key of ['TEXCOORD_0','JOINTS_0','WEIGHTS_0']){const same=JSON.stringify(values(old,a.attributes[key]))===JSON.stringify(values(m,b.attributes[key]));if(key==='TEXCOORD_0')uv&&=same;else weights&&=same;}
  for(const key of ['POSITION','NORMAL']){const vals=values(m,b.attributes[key]);finite&&=vals.every(Number.isFinite);geometry&&=JSON.stringify(values(old,a.attributes[key]))===JSON.stringify(vals);}
  const w=values(m,b.attributes.WEIGHTS_0);for(let j=0;j<w.length;j+=4)normalized&&=Math.abs(w[j]+w[j+1]+w[j+2]+w[j+3]-1)<.001;
 }
 check(topology&&uv&&weights,name+' preserves indices UVs skin weights and joint mapping',{vertices,triangles});check(finite&&normalized,name+' finite normals/positions and normalized weights');
 if(name.startsWith('bosses'))check(geometry,name+' original mesh positions and normals preserved');
 check(JSON.stringify(old.g.materials)===JSON.stringify(m.g.materials),name+' preserves all PBR material properties');
 const imageHashes=x=>x.g.images.map(i=>{const v=x.g.bufferViews[i.bufferView];return hash(x.bin.subarray(v.byteOffset||0,(v.byteOffset||0)+v.byteLength));});check(JSON.stringify(imageHashes(old))===JSON.stringify(imageHashes(m)),name+' original packed textures preserved byte-for-byte');
 const oldJoints=old.g.skins[0].joints.map(i=>old.g.nodes[i].name),newJoints=m.g.skins[0].joints.map(i=>m.g.nodes[i].name);check(JSON.stringify(oldJoints)===JSON.stringify(newJoints),name+' preserves named bone hierarchy and skin joint order');
 if(name.startsWith('bosses'))for(const a of old.g.animations){if(['Walk',...(name.endsWith('gargoyle')?['Hover','Dive']:[])].includes(a.name))continue;check(JSON.stringify(channelMap(old,a.name))===JSON.stringify(channelMap(m,a.name)),name+' '+a.name+' original combat/idle/death channels preserved');}
 check(m.g.buffers.every(b=>!b.uri)&&m.g.images.every(i=>i.bufferView!==undefined),name+' standalone GLB has no external assets');
 report.assets.push({file,bytes:m.raw.length,sha256:hash(m.raw),bones:newJoints.length,vertices,triangles,clips:m.g.animations.map(a=>({name:a.name,duration:Math.max(...a.samplers.flatMap(s=>values(m,s.input)))}))});
}
await fs.writeFile(path.join(out,'semantic-preservation.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));if(report.checks.some(c=>!c.pass))process.exitCode=1;
