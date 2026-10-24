import fs from 'node:fs';
import * as THREE from 'three';
import {createCreature} from '../src/creatures.js';
const output=[];
for(const type of ['frog','heron','snake','fish'])for(const pose of ['idle','attack']){
 const c=createCreature(type,{color:type==='frog'?0x5c8f35:undefined,role:'hunter',seed:1,tier:1});
 c.setOutline(0xffffff,false);
 const state=pose==='idle'?{time:1,speed:0}:{time:1,attack:{type:type==='frog'?'kick':'lunge',phase:.57},speed:0};
 c.update(.05,state);c.group.updateMatrixWorld(true);c.skeleton.update();
 const meshes=[];
 c.group.traverse(m=>{
  if(!m.isMesh||!m.visible||m.name==='animated-color-silhouette')return;
  const g=m.geometry,p=g.getAttribute('position'),co=g.getAttribute('color'),mask=g.getAttribute('skinTintMask');
  const position=[],color=[],v=new THREE.Vector3(),tint=m.material.userData?.tint;
  for(let i=0;i<p.count;i++){
   v.fromBufferAttribute(p,i);if(m.isSkinnedMesh)m.applyBoneTransform(i,v);v.applyMatrix4(m.matrixWorld);position.push(v.x,v.y,v.z);
   const c=new THREE.Color(co?.getX(i)??1,co?.getY(i)??1,co?.getZ(i)??1),weight=mask?.getX(i)||0;
   if(tint){c.r*=1+(tint.r-1)*weight;c.g*=1+(tint.g-1)*weight;c.b*=1+(tint.b-1)*weight;}
   c.multiply(m.material.color);color.push(c.r,c.g,c.b);
  }
  const diagnosticGeometry=new THREE.BufferGeometry();diagnosticGeometry.setAttribute('position',new THREE.Float32BufferAttribute(position,3));diagnosticGeometry.setIndex(g.index.clone());diagnosticGeometry.computeVertexNormals();
  meshes.push({name:m.name,position,color,index:Array.from(g.index.array),normal:Array.from(diagnosticGeometry.getAttribute('normal').array),doubleSide:m.material.side===THREE.DoubleSide});
  diagnosticGeometry.dispose();
 });
 output.push({type,pose,stats:c.stats,meshes});c.dispose();
}
fs.writeFileSync(new URL('./creature-geometry.json',import.meta.url),JSON.stringify(output));console.log('Exported',output.length,'actual posed meshes');

