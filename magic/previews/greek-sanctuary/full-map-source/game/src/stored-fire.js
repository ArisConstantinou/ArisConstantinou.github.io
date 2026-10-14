import * as THREE from 'three';
import {TRANSFER_TIME} from './fire.js';

const vertex=`
varying vec3 localP;varying vec3 viewNormal;varying vec3 viewPos;
void main(){
 localP=position;vec4 p=modelViewMatrix*vec4(position,1.);
 viewPos=p.xyz;viewNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*p;
}`;

// A solid ember, a soft shell and three bounded sparks; no flame billboards.
export function createStoredFire(scene){
 const group=new THREE.Group();group.name='Stored fire';group.visible=false;scene.add(group);
 const core=new THREE.Mesh(new THREE.SphereGeometry(.22,24,16),new THREE.ShaderMaterial({
  vertexShader:vertex,fragmentShader:`
  varying vec3 localP;varying vec3 viewNormal;varying vec3 viewPos;
  void main(){
   vec3 p=normalize(localP);
   float seam=sin(p.x*17.+sin(p.z*11.)*2.)*sin(p.y*15.+p.z*6.);
   float heat=smoothstep(-.2,.65,seam);
   float facing=max(0.,dot(normalize(viewNormal),normalize(-viewPos)));
   vec3 c=mix(vec3(.42,.025,.003),vec3(2.8,.65,.045),heat);
   c=mix(c,vec3(3.,1.7,.42),pow(facing,7.)*.6);gl_FragColor=vec4(c,1.);
  }`,toneMapped:false
 }));group.add(core);
 const glow=new THREE.Mesh(new THREE.SphereGeometry(.34,24,16),new THREE.ShaderMaterial({
  vertexShader:vertex,fragmentShader:`
  varying vec3 viewNormal;varying vec3 viewPos;
  void main(){
   float facing=max(0.,dot(normalize(viewNormal),normalize(-viewPos)));
   gl_FragColor=vec4(1.5,.28,.025,.24*pow(facing,1.8));
  }`,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false
 }));group.add(glow);
 const sparks=new THREE.InstancedMesh(new THREE.OctahedronGeometry(.038),new THREE.MeshBasicMaterial({color:0xffb74a,toneMapped:false}),3);
 sparks.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
 // The three moving sparks always stay within this fixed local bound.
 sparks.boundingSphere=new THREE.Sphere(new THREE.Vector3(),.5);group.add(sparks);
 const matrix=new THREE.Matrix4(),anchor=new THREE.Vector3();
 function update(spell,player,time){
  group.visible=!!spell.charged&&!player.dead;
  if(!group.visible)return;
  const base=player.mesh?.position||player.body.position;
  const size=player.mesh?.scale.x||1;
  const floor=player.mesh?base.y:base.y-(player.cy||0);
  anchor.set(base.x+.84*size,floor+(1.32+.035*Math.sin(time*2.3))*size,base.z-.04*size);
  const t=THREE.MathUtils.clamp((time-spell.takenAt)/TRANSFER_TIME,0,1),ease=t*t*(3-2*t);
  group.position.copy(spell.torch.position).lerp(anchor,ease);
  group.position.y+=Math.sin(t*Math.PI)*.7;
  group.scale.setScalar(size*(.96+.04*Math.sin(time*3)));
  core.rotation.set(time*.17,time*.43,time*.09);
  for(let i=0;i<3;i++){
   const a=time*(.8+i*.15)+i*Math.PI*2/3;
   matrix.makeTranslation(Math.cos(a)*.29,Math.sin(a*1.3+i)*.26,Math.sin(a)*.16);
   sparks.setMatrixAt(i,matrix);
  }
  sparks.instanceMatrix.needsUpdate=true;
 }
 return{update,clear(){group.visible=false;},get visible(){return group.visible;},get position(){return group.position;},
  snapshot:()=>({visible:group.visible,position:group.position.toArray(),sparks:group.visible?3:0,drawCalls:group.visible?3:0})};
}
