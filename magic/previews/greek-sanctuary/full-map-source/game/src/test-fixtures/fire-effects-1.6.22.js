import * as THREE from 'three';
import {createStoredFire} from '../stored-fire.js';
// One fixed instanced pool covers every burnable object and actor in this map.
const CAPACITY=512;
const vertex=`attribute float flameSeed;varying vec2 vUv;varying float seed;void main(){vUv=uv;seed=flameSeed;gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.);}`;
const fragment=`
uniform float time;varying vec2 vUv;varying float seed;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.)),f.x),f.y);}
void main(){
 float y=vUv.y,n=noise(vec2(vUv.x*5.+seed,y*5.-time*3.5))+.45*noise(vec2(vUv.x*12.+seed,y*12.-time*7.));
 float bend=sin(y*8.-time*4.+seed)*y*.12+(n-.65)*y*.19;
 float x=abs(vUv.x-.5+bend),width=.38*pow(max(0.,1.-y),.8);
 float alpha=(1.-smoothstep(width-.055,width+.025,x))*(1.-smoothstep(.65+n*.19,.88+n*.08,y))*smoothstep(0.,.08,y);
 float hot=clamp(1.-x/max(width,.02)-y*.72,0.,1.);
 vec3 c=mix(vec3(1.,.12,.012),vec3(1.,.68,.06),smoothstep(.1,.7,hot));c=mix(c,vec3(1.,.94,.62),smoothstep(.72,1.,hot));
 gl_FragColor=vec4(c*1.6,alpha*.9);
}`;
export function createFireEffects(scene){
 let enabled=true,count=0;
 const stored=createStoredFire(scene);
 const geometry=new THREE.PlaneGeometry(1,1);
 geometry.setAttribute('flameSeed',new THREE.InstancedBufferAttribute(Float32Array.from({length:CAPACITY},(_,i)=>i*2.71),1));
 const material=new THREE.ShaderMaterial({uniforms:{time:{value:0}},vertexShader:vertex,fragmentShader:fragment,transparent:true,depthWrite:false,side:THREE.DoubleSide,toneMapped:false});
 const flames=new THREE.InstancedMesh(geometry,material,CAPACITY);flames.instanceMatrix.setUsage(THREE.DynamicDrawUsage);flames.frustumCulled=false;flames.renderOrder=2;flames.count=0;scene.add(flames);
 const light=new THREE.PointLight(0xff8a24,0,5,2);scene.add(light);
 const marker=new THREE.Mesh(new THREE.RingGeometry(.32,.37,40),new THREE.MeshBasicMaterial({color:0xffbf60,side:THREE.DoubleSide,transparent:true,opacity:.8,depthWrite:false,toneMapped:false}));marker.rotation.x=-Math.PI/2;marker.visible=false;scene.add(marker);
 const matrix=new THREE.Matrix4(),offset=new THREE.Vector3(),scale=new THREE.Vector3();
 function plane(p,camera,width,height){
  if(count>=CAPACITY)throw new Error('Fire effect capacity exceeded');
  scale.set(width,height,1);matrix.compose(p,camera.quaternion,scale);flames.setMatrixAt(count++,matrix);
 }
 function update({spell,player,entities,surfaces,time,camera,playing,source}){
  count=0;light.intensity=0;marker.visible=false;stored.clear();flames.visible=enabled&&playing;
  if(!enabled||!playing||!player){flames.count=0;return;}
  material.uniforms.time.value=time;
  if(source){marker.visible=true;marker.position.set(source.position.x,.05,source.position.z-.35);}
  stored.update(spell,player,time);
  if(stored.visible){
   light.position.copy(stored.position);light.color.setHex(0xff6b16);light.distance=2.5;light.intensity=1.7;
  }
  let nearest=Infinity;
  for(const e of [...entities,...surfaces])if(!e.removed&&e.burnUntil>time){
   const pos=e.body?.position||e.position,ext=e.ext,wood=e.flammable;
   const n=wood?8:5,width=wood?.6:.8,height=wood?1.05:Math.max(1.25,(e.cy||1)*1.35);
   for(let i=0;i<n;i++){
    const a=i*Math.PI/4;
    if(wood){
     offset.set(Math.cos(a)*(ext?.x||.4)*.85,Math.min(ext?.y||.4,.5),Math.sin(a)*(ext?.z||.4)*.85);
     if(e.kind==='shield')offset.set((i-3.5)*.05,.04,-.13);
     if(e.body)offset.applyQuaternion(e.body.quaternion);
    }else offset.set(Math.cos(a)*.2,(i%3)*height*.17-.45,Math.sin(a)*.2);
    offset.add(pos);offset.y+=height*.5;plane(offset,camera,width,height);
   }
   const d=Math.hypot(pos.x-player.body.position.x,pos.z-player.body.position.z);
   if(d<nearest){nearest=d;light.position.copy(pos);light.color.setHex(0xff8a24);light.distance=5;light.intensity=5.5+Math.sin(time*17)*.5;}
  }
  flames.count=count;flames.instanceMatrix.needsUpdate=true;
 }
 function clear(){count=0;flames.count=0;light.intensity=0;marker.visible=false;stored.clear();}
 return{update,clear,setEnabled(value){enabled=!!value;if(!enabled)clear();},counts:()=>({flamePlanes:count,capacity:CAPACITY,drawCalls:(count?1:0)+(stored.visible?3:0),lights:1,stored:stored.snapshot()})};
}
