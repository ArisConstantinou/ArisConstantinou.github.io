import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// Authored editable leaf surfaces: tapered outline, raised midrib and curled
// edges, rather than a flattened primitive. All foliage in a crown shares a draw.
export function sculptedLeaf({length=1,width=.4,curl=.06,ridge=.07,segments=8,across=6,color='#8eb54c'}={}){
 const p=[],uv=[],colors=[],indices=[],c=new THREE.Color(color);
 for(let i=0;i<=segments;i++)for(let j=0;j<=across;j++){
  const t=i/segments,s=j/across*2-1,profile=(t>.88?(.8-(t-.88)/.12*.65):(.8+.2*Math.sin(Math.PI*t)));
  p.push(s*width*profile,ridge*(1-Math.abs(s))*Math.sin(Math.PI*t)+curl*t*t-.025*s*s,t*length);
  uv.push(j/across,t);const shade=.77+.23*(1-Math.abs(s))+.05*Math.sin(t*37+Math.abs(s)*8);
  colors.push(c.r*shade,c.g*shade,c.b*shade);
 }
 for(let i=0;i<segments;i++)for(let j=0;j<across;j++){const a=i*(across+1)+j,b=a+1,d=a+across+1,e=d+1;indices.push(a,d,b,b,d,e);}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.setIndex(indices);g.computeVertexNormals();g.computeBoundingSphere();return g;
}
function withColor(g,color='#ffffff'){
 const c=new THREE.Color(color),a=new Float32Array(g.attributes.position.count*3);for(let i=0;i<a.length;i+=3)c.toArray(a,i);g.setAttribute('color',new THREE.BufferAttribute(a,3));
 if(!g.attributes.uv)g.setAttribute('uv',new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count*2),2));return g;
}
export function leafRoofGeometry(w,d,{sideways=false,backing=null}={}){
 const pieces=[];if(backing){const g=withColor(backing.clone(),'#638541');if(sideways)g.rotateY(-Math.PI/2);pieces.push(g);}
 // Two overlapping courses on each slope; broad scalloped leaves at the eaves.
 const columns=Math.max(6,Math.ceil(d*2/.84)),step=d*2/columns,slope=Math.atan2(1.43,w),slopeLength=Math.hypot(w,1.43);
 for(const side of [-1,1])for(let row=0;row<2;row++)for(let col=0;col<columns;col++){
  const leaf=sculptedLeaf({length:slopeLength*.62,width:step*.57,ridge:.055,curl:.025,color:row?'#aacb62':'#89b94d'});
  // Local +Z runs down the roof; local +X runs along its ridge.
  const start=row*.46,transform=new THREE.Matrix4().makeBasis(new THREE.Vector3(0,0,-side),new THREE.Vector3(side*Math.sin(slope),Math.cos(slope),0),new THREE.Vector3(side*Math.cos(slope),-Math.sin(slope),0));
  leaf.applyMatrix4(transform);leaf.translate(side*w*start,4.05-1.43*start+.07+(1-row)*.035,-d+(col+.5)*step);pieces.push(leaf);
 }
 const result=mergeGeometries(pieces);for(const p of pieces)p.dispose();if(sideways)result.rotateY(Math.PI/2);result.computeBoundingBox();result.computeBoundingSphere();return result;
}
export function cacheRoofFaces(roof){
 roof.updateWorldMatrix(true,false);const triangles=[],bounds=new THREE.Box3(),p=roof.geometry.attributes.position,ix=roof.geometry.index;
 for(let i=0;i<ix.count;i+=3){const t=new THREE.Triangle();t.a.fromBufferAttribute(p,ix.getX(i)).applyMatrix4(roof.matrixWorld);t.b.fromBufferAttribute(p,ix.getX(i+1)).applyMatrix4(roof.matrixWorld);t.c.fromBufferAttribute(p,ix.getX(i+2)).applyMatrix4(roof.matrixWorld);triangles.push(t);bounds.expandByPoint(t.a).expandByPoint(t.b).expandByPoint(t.c);}
 return {triangles,bounds};
}
export function crownLeaves(definition,index,ground,backing){
 const parts=[backing.clone()];
 for(let i=0;i<3;i++){
  const a=i*Math.PI*2/3+index*.7,x=definition.x+Math.cos(a)*definition.radius*.43,z=definition.z+Math.sin(a)*definition.radius*.43,y=ground(x,z)+3.3+(i%2)*.5;
  for(let row=0;row<3;row++)for(let k=0;k<10;k++){
   const angle=k*Math.PI/5+row*.29+i*.13,len=1.25+row*.12;
   const g=sculptedLeaf({length:len,width:.46,ridge:.13,curl:-.15,segments:6,across:4,color:row===2?'#b1ca62':row===1?'#8eb047':'#658f40'});
   g.rotateX(-.17+row*.14);g.rotateY(angle);g.translate(x+Math.sin(angle)*.23,y+row*.38,z+Math.cos(angle)*.23);parts.push(g);
  }
 }
 const compatible=parts.map(g=>g.index?g.toNonIndexed():g),result=mergeGeometries(compatible);for(const g of new Set([...parts,...compatible]))g.dispose();result.computeBoundingSphere();return result;
}
