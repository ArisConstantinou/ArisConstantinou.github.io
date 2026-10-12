import * as THREE from 'three';
import {createHearthJet} from './hearth-jet.js';
const vertex=`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const fragment=`
uniform float time; uniform float seed; varying vec2 vUv;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.)),f.x),f.y);}
void main(){
 vec2 uv=vUv;float y=uv.y;
 float n=noise(vec2(uv.x*5.+seed,y*5.-time*3.5))+ .45*noise(vec2(uv.x*12.+seed,y*12.-time*7.));
 float bend=sin(y*8.-time*4.+seed)*y*.12+(n-.65)*y*.19;
 float x=abs(uv.x-.5+bend);float width=.38*pow(max(0.,1.-y),.8);
 float shape=1.-smoothstep(width-.055,width+.025,x);
 float tongue=1.-smoothstep(.65+n*.19,.88+n*.08,y);
 float alpha=shape*tongue*smoothstep(0.,.08,y);
 float hot=clamp(1.-x/max(width,.02)-y*.72,0.,1.);
 vec3 c=mix(vec3(1.,.12,.012),vec3(1.,.68,.06),smoothstep(.1,.7,hot));
 c=mix(c,vec3(1.,.94,.62),smoothstep(.72,1.,hot));
 gl_FragColor=vec4(c*1.6,alpha*.9);
}`;
export function createFireEffects(scene){
 let enabled=true;
 const geometry=new THREE.PlaneGeometry(1,1),groups=[];
 function group(count){
  const root=new THREE.Group(),planes=[];scene.add(root);
  for(let i=0;i<count;i++){
   const material=new THREE.ShaderMaterial({uniforms:{time:{value:0},seed:{value:i*2.71}},vertexShader:vertex,fragmentShader:fragment,
    transparent:true,depthWrite:false,side:THREE.DoubleSide,toneMapped:false});
   const plane=new THREE.Mesh(geometry,material);plane.renderOrder=2;root.add(plane);planes.push(plane);
  }
  root.visible=false;const result={root,planes};groups.push(result);return result;
 }
 const carried=group(3),crate=group(8),guard=group(5);
 const light=new THREE.PointLight(0xff8a24,0,5,2);scene.add(light);
 const marker=new THREE.Mesh(new THREE.RingGeometry(.32,.37,40),new THREE.MeshBasicMaterial({color:0xffbf60,side:THREE.DoubleSide,transparent:true,opacity:.85,depthWrite:false,toneMapped:false}));
 marker.rotation.x=-Math.PI/2;marker.visible=false;scene.add(marker);
 const vector=new THREE.Vector3(),point=new THREE.Vector3(),anchor=new THREE.Vector3();
 function draw(g,position,camera,time,width,height){
  g.root.visible=true;g.root.position.copy(position);
  for(let i=0;i<g.planes.length;i++){
   const p=g.planes[i],a=i*2.39996,r=i?width*.3:0;
   p.position.set(Math.cos(a)*r,height*.38+(i%3)*height*.04,Math.sin(a)*r);
   p.scale.set(width*(i? .72:1),height*(.88+.12*Math.sin(i*5)),1);
   p.quaternion.copy(camera.quaternion);p.material.uniforms.time.value=time;
  }
 }
 function update({spell,player,item,enemy,time,visualTime,camera,playing}){
  for(const g of groups)g.root.visible=false;light.intensity=0;marker.visible=false;
  if(!enabled||!playing||!player)return;
  if(spell.torch.lit){marker.visible=true;marker.position.set(spell.torch.position.x,.05,spell.torch.position.z-.38);marker.material.opacity=.6+.2*Math.sin(visualTime*4);}
  anchor.set(player.body.position.x+.65,1.55,player.body.position.z-.25);
  if(spell.charged){
   const t=THREE.MathUtils.clamp((time-spell.takenAt)/.45,0,1);
   point.copy(spell.torch.position).lerp(anchor,t);point.y+=Math.sin(t*Math.PI)*.7;
   draw(carried,point,camera,visualTime,.34,.7);light.position.copy(point);light.intensity=3.5;
  }
  if(item&&!item.removed&&item.burnUntil>time){
   point.copy(item.body.position);draw(crate,point,camera,visualTime,.72,1.05);
   for(let i=0;i<crate.planes.length;i++){
    const a=i*Math.PI/4;vector.set(Math.cos(a)*.36,.36,Math.sin(a)*.36).applyQuaternion(item.body.quaternion);
    crate.planes[i].position.copy(vector);crate.planes[i].position.y+=.525;
   }
   light.position.copy(point);light.intensity=5.5+Math.sin(visualTime*17)*.5;
  }
  if(enemy&&!enemy.removed&&enemy.burnUntil>time){
   point.copy(enemy.body.position);point.y-=.5;draw(guard,point,camera,visualTime,.8,1.25);
  }
 }
 function clear(){for(const g of groups)g.root.visible=false;light.intensity=0;marker.visible=false;}
 return {update,clear,setEnabled:value=>{enabled=!!value;},counts:()=>({flamePlanes:groups.reduce((n,g)=>n+g.planes.length,0),lights:1})};
}

// Fixed-size battle-suit effect pool; no per-frame material or light allocation.
export function createHearthEffects(scene){
 const geometry=new THREE.PlaneGeometry(1,1),groups=[];
 function make(n){const root=new THREE.Group();scene.add(root);const planes=[];for(let i=0;i<n;i++){const m=new THREE.ShaderMaterial({uniforms:{time:{value:0},seed:{value:i*2.71}},vertexShader:vertex,fragmentShader:fragment,transparent:true,depthWrite:false,side:THREE.DoubleSide,toneMapped:false});const p=new THREE.Mesh(geometry,m);root.add(p);planes.push(p);}groups.push(root);return {root,planes};}
 const carried=make(3),heart=make(3),burns=Array.from({length:48},()=>make(3));
 const jet=createHearthJet(scene);
 const light=new THREE.PointLight(0xff7e20,0,7,2);scene.add(light);
 const point=new THREE.Vector3();
 function flame(g,p,w,h,camera,time){g.root.visible=true;g.root.position.copy(p);g.planes.forEach((o,i)=>{o.position.set(Math.sin(i*2.4)*w*.15,h*.45,Math.cos(i*2.4)*w*.15);o.scale.set(w,h,1);o.quaternion.copy(camera.quaternion);o.material.uniforms.time.value=time;});}
 function update({spell,player,hearth,entities,time,camera,quality}){
  groups.forEach(g=>g.visible=false);light.intensity=0;
  if(spell.charged){const t=THREE.MathUtils.clamp((time-spell.takenAt)/.45,0,1);point.set(player.body.position.x+.65,1.6,player.body.position.z).lerp(spell.torch.position,1-t);point.y+=Math.sin(Math.PI*t)*.6;flame(carried,point,.32,.63,camera,time);}
  if(hearth){const core=hearth.visual.point('heart');if(hearth.heart.fuel>0){flame(heart,core,.35,.67,camera,time);light.position.copy(core);light.intensity=4+Math.sin(time*13)*.4;}
   if(hearth.transfer){const t=THREE.MathUtils.clamp((time-hearth.transfer.time)/.65,0,1);point.copy(hearth.transfer.from).lerp(hearth.visual.point('inlet'),t);flame(carried,point,.22,.50,camera,time);}
  }
  jet.update(hearth,camera,time,quality);
  entities.filter(e=>!e.removed&&e.burnUntil>time).slice(0,burns.length).forEach((e,i)=>{point.copy(e.body.position);flame(burns[i],point,e.category==='actor'?.75:.8,e.category==='actor'?1.25:1,camera,time);});
 }
 function clear(){groups.forEach(g=>g.visible=false);light.intensity=0;jet.clear();}
 return {update,clear,counts:()=>({planes:150,lights:2,jet:jet.counts()})};
}
