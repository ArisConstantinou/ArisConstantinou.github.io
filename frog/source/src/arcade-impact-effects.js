import * as THREE from 'three';
import {landingSurfaces} from './arcade-air-movement.js';

const TAU=Math.PI*2,UP=new THREE.Vector3(0,1,0);
const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,value));
const validPoint=point=>Number.isFinite(point?.x)&&Number.isFinite(point?.z);
const TINTS=['#c4e4de','#83bcb4','#eaf4e4','#c9ae7a','#9d8357','#efdbb4'].map(color=>new THREE.Color(color));
export const IMPACT_LIMITS=Object.freeze({mobileDrops:96,desktopDrops:144,mobileRipples:6,desktopRipples:8});

const vertexShader=`
 varying vec2 vUv;
 varying vec3 vNormal;
 #include <fog_pars_vertex>
 void main(){
  vUv=uv;
  vNormal=normalize(mat3(modelMatrix)*normal);
  vec4 mvPosition=modelViewMatrix*vec4(position,1.0);
  gl_Position=projectionMatrix*mvPosition;
  #include <fog_vertex>
 }
`;
const fragmentShader=`
 uniform float uAge;
 uniform float uOpacity;
 uniform vec3 uWater;
 uniform vec3 uFoam;
 varying vec2 vUv;
 varying vec3 vNormal;
 #include <fog_pars_fragment>
 void main(){
  vec2 uv=vUv*2.0-1.0;
  float r=length(uv);
  float life=clamp(uAge,0.0,1.0);
  float angle=atan(uv.y,uv.x);
  float front=0.14+0.78*sqrt(life);
  float breakup=0.5+0.5*sin(angle*17.0+sin(angle*6.0)*1.4+life*7.0);
  float edge=abs(r-front-(breakup-0.5)*0.018);
  float band=1.0-smoothstep(0.020,0.055,edge);
  float inner=1.0-smoothstep(0.012,0.036,abs(r-max(0.0,front-0.16)));
  float fade=pow(1.0-life,1.4);
  float core=exp(-r*r*65.0)*exp(-life*24.0);
  float foam=band*(0.65+0.35*breakup)+inner*0.20;
  float alpha=(foam*fade+core*0.65)*uOpacity;
  if(alpha<0.012||r>1.0)discard;
  float light=0.76+0.24*max(0.0,dot(normalize(vNormal),normalize(vec3(-0.4,0.85,0.3))));
  vec3 color=mix(uWater,uFoam,clamp(foam+core,0.0,1.0))*light;
  gl_FragColor=vec4(color,alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
 }
`;

/** Short, scene-native water/foam contacts. No DOM, sprites or CSS overlays. */
export class ImpactEffects {
 constructor(game){
  this.game=game;this.scene=game.scene;this.time=0;this.seed=7919;this.cursor=0;this.rippleCursor=0;
  this.capacity=game.touch?IMPACT_LIMITS.mobileDrops:IMPACT_LIMITS.desktopDrops;
  this.particles=Array.from({length:this.capacity},()=>({life:0,total:1,x:0,y:0,z:0,vx:0,vy:0,vz:0,size:.08,color:0}));
  this.dummy=new THREE.Object3D();this.direction=new THREE.Vector3();
  this.dropGeometry=new THREE.SphereGeometry(1,7,5);
  this.dropMaterial=new THREE.MeshToonMaterial({color:'#ffffff',emissive:'#163a35',emissiveIntensity:.06,depthTest:true,depthWrite:true});
  this.droplets=new THREE.InstancedMesh(this.dropGeometry,this.dropMaterial,this.capacity);
  this.droplets.name='arcade-impact-droplets';this.droplets.instanceMatrix.setUsage(THREE.DynamicDrawUsage);this.droplets.frustumCulled=false;this.droplets.count=0;
  // Allocate instance colour once; every live droplet uses one of three foam tints.
  for(let i=0;i<this.capacity;i++)this.droplets.setColorAt(i,TINTS[0]);
  this.droplets.instanceColor.setUsage(THREE.DynamicDrawUsage);this.scene.add(this.droplets);
  const count=game.touch?IMPACT_LIMITS.mobileRipples:IMPACT_LIMITS.desktopRipples;
  this.ripples=Array.from({length:count},(_,i)=>{
   const geometry=new THREE.PlaneGeometry(2,2,8,8);geometry.rotateX(-Math.PI/2);
   const reference=geometry.attributes.position.array.slice();
   const material=new THREE.ShaderMaterial({vertexShader,fragmentShader,uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.fog,{uAge:{value:0},uOpacity:{value:.75},uWater:{value:new THREE.Color('#6aaba4')},uFoam:{value:new THREE.Color('#e8f2df')}}]),transparent:true,depthTest:true,depthWrite:false,side:THREE.DoubleSide,fog:true,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
   const mesh=new THREE.Mesh(geometry,material);mesh.name=`arcade-impact-ripple-${i}`;mesh.frustumCulled=false;mesh.visible=false;this.scene.add(mesh);
   return {mesh,reference,age:0,duration:1,active:false};
  });
 }
 ground(x,z){const height=this.game.ground(x,z);return Number.isFinite(height)?height:0;}
 random(){this.seed=(Math.imul(this.seed,1664525)+1013904223)>>>0;return this.seed/4294967296;}
 ripple(x,z,radius,duration,opacity=.75,surface=null,dry=false){
  const entry=this.ripples[this.rippleCursor++%this.ripples.length],position=entry.mesh.geometry.attributes.position;
  // Conform the complete disc once at spawn; the shader travels across that
  // surface, so the expanding ring does not float above slopes or cut into them.
  for(let i=0;i<position.count;i++){
   const px=x+entry.reference[i*3]*radius,pz=z+entry.reference[i*3+2]*radius;
   const support=surface?landingSurfaces(this.game.state,px,pz,(x,z)=>this.ground(x,z)).find(q=>q.id===surface):null;position.setXYZ(i,px,(support?.y??this.ground(px,pz))+.035,pz);
  }
  entry.mesh.material.uniforms.uWater.value.set(dry?'#8d7344':'#6aaba4');entry.mesh.material.uniforms.uFoam.value.set(dry?'#e6d1a0':'#e8f2df');position.needsUpdate=true;entry.mesh.geometry.computeVertexNormals();entry.mesh.material.uniforms.uAge.value=0;entry.mesh.material.uniforms.uOpacity.value=opacity;
  entry.age=0;entry.duration=duration;entry.active=true;entry.mesh.visible=true;
 }
 emit({x,y,z,count,power,spread=.12,dx=0,dz=0,lifetime=.55,tint=0,radial=false}){
  const directionLength=Math.hypot(dx,dz);if(directionLength>0){dx/=directionLength;dz/=directionLength;}
  for(let i=0;i<count;i++){
   const particle=this.particles[this.cursor++%this.capacity],angle=this.random()*TAU,speed=(.8+this.random()*1.7)*power;
   particle.x=x+(radial?Math.sin(angle)*spread*.5:(this.random()-.5)*spread);particle.y=y+this.random()*.07;particle.z=z+(radial?Math.cos(angle)*spread*.5:(this.random()-.5)*spread);
   particle.vx=Math.sin(angle)*speed+dx*power*.65;particle.vz=Math.cos(angle)*speed+dz*power*.65;particle.vy=(1.8+this.random()*2.2)*power;
   particle.total=lifetime*(.82+this.random()*.3);particle.life=particle.total;particle.size=(.045+this.random()*.045)*Math.sqrt(power);particle.color=tint+i%3;
  }
  this.drawDrops();
 }
 hit({x,z,dx=0,dz=0,height,heavy=false}={}){
  if(!validPoint({x,z}))return;
  const floor=this.ground(x,z),y=Number.isFinite(height)?Math.max(floor+.04,height):floor+.7;
  this.ripple(x,z,heavy?1.3:.72,heavy?.54:.4,heavy?.8:.64);
  this.emit({x,y,z,dx,dz,count:heavy?15:8,power:heavy?1.2:.72,spread:heavy?.22:.1,lifetime:heavy?.58:.43});
 }
 stone({x,z,radius=2.8}={}){
  if(!validPoint({x,z}))return;
  const size=clamp(Number.isFinite(radius)?radius:2.8,1,4);
  this.ripple(x,z,size,.74,.9);
  this.emit({x,y:this.ground(x,z)+.12,z,count:this.game.touch?28:34,power:1.8,spread:.55,lifetime:.76});
 }
 landing({x,z,strength=1}={}){
  if(!validPoint({x,z}))return;
  const power=clamp(Number.isFinite(strength)?strength:1,.35,1.8);
  this.ripple(x,z,.75+power*.42,.48,.68);
  this.emit({x,y:this.ground(x,z)+.08,z,count:Math.round(6+power*5),power:.6+power*.28,spread:.25,lifetime:.48});
 }
 heavyLanding({x,z,y,impactSpeed=12,surface=null}={}){
  if(!validPoint({x,z}))return;
  const water=!surface&&this.game.world?.getSurface(x,z)?.type==='water',strength=clamp(impactSpeed/12,.8,1.6),radius=(water?5.4:4.6)*Math.sqrt(strength),floor=Number.isFinite(y)?y:this.ground(x,z),count=this.game.touch?64:96;
  this.ripple(x,z,radius,1.05,.98,surface,!water);this.ripple(x,z,radius*.67,.78,.86,surface,!water);
  this.emit({x,y:floor+.12,z,count,power:(water?2.6:1.75)*Math.sqrt(strength),spread:water?2.1:2.7,lifetime:water?1.22:1.05,tint:water?0:3,radial:true});
  this.lastLanding={x,z,y:floor,water,radius,count,impactSpeed,surface};
 }
 drawDrops(){
  let count=0;
  for(const particle of this.particles){
   if(particle.life<=0)continue;
   const fade=clamp(particle.life/.13),scale=particle.size*fade;
   this.dummy.position.set(particle.x,particle.y,particle.z);this.direction.set(particle.vx,particle.vy,particle.vz);
   if(this.direction.lengthSq()>1e-6)this.dummy.quaternion.setFromUnitVectors(UP,this.direction.normalize());else this.dummy.quaternion.identity();
   this.dummy.scale.set(scale,scale*1.55,scale);this.dummy.updateMatrix();this.droplets.setMatrixAt(count,this.dummy.matrix);this.droplets.setColorAt(count,TINTS[particle.color]);count++;
  }
  this.droplets.count=count;this.droplets.instanceMatrix.needsUpdate=true;this.droplets.instanceColor.needsUpdate=true;
 }
 update(dt=0){
  const delta=clamp(Number.isFinite(dt)?dt:0,0,.1);if(delta===0)return;this.time+=delta;
  for(const particle of this.particles){
   if(particle.life<=0)continue;particle.life=Math.max(0,particle.life-delta);if(particle.life===0)continue;
   particle.x+=particle.vx*delta;particle.z+=particle.vz*delta;particle.y+=particle.vy*delta-7*delta*delta;particle.vy-=14*delta;
   const drag=Math.exp(-delta*1.2);particle.vx*=drag;particle.vz*=drag;
   const floor=this.ground(particle.x,particle.z)+.025;
   if(particle.y<floor){particle.y=floor;particle.vy=0;particle.vx*=.3;particle.vz*=.3;particle.life=Math.min(particle.life,.06);}
  }
  this.drawDrops();
  for(const ripple of this.ripples){if(!ripple.active)continue;ripple.age+=delta;ripple.mesh.material.uniforms.uAge.value=clamp(ripple.age/ripple.duration);if(ripple.age>=ripple.duration){ripple.active=false;ripple.mesh.visible=false;}}
 }
 clear(){for(const particle of this.particles)particle.life=0;this.droplets.count=0;for(const ripple of this.ripples){ripple.active=false;ripple.mesh.visible=false;ripple.age=0;}this.time=0;}
 dispose(){this.clear();this.droplets.removeFromParent();this.dropGeometry.dispose();this.dropMaterial.dispose();for(const ripple of this.ripples){ripple.mesh.removeFromParent();ripple.mesh.geometry.dispose();ripple.mesh.material.dispose();}}
}
