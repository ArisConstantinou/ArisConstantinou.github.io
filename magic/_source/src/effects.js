import * as THREE from 'three';
import {createStompEffects} from './stomp-effects.js';
const color=new THREE.Color();
export function createEffects(scene) {
  const stompEffects=createStompEffects(scene);
  const N=700,positions=new Float32Array(N*3),colors=new Float32Array(N*3),life=new Float32Array(N),size=new Float32Array(N);
  const velocity=new Float32Array(N*3),age=new Float32Array(N),duration=new Float32Array(N);
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(positions,3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('color',new THREE.BufferAttribute(colors,3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aLife',new THREE.BufferAttribute(life,1).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aSize',new THREE.BufferAttribute(size,1).setUsage(THREE.DynamicDrawUsage));
  const mat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,vertexColors:true,blending:THREE.AdditiveBlending,
    vertexShader:'attribute float aLife; attribute float aSize; varying vec3 vColor; varying float vLife; void main(){vColor=color;vLife=aLife; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);gl_PointSize=aSize*(0.3+0.7*aLife);}',
    fragmentShader:'varying vec3 vColor; varying float vLife; void main(){float d=length(gl_PointCoord-0.5)*2.0;float a=pow(max(0.0,1.0-d),1.8)*vLife;gl_FragColor=vec4(vColor*1.5,a);}'});
  const cloud=new THREE.Points(geo,mat);cloud.frustumCulled=false;scene.add(cloud);
  let cursor=0;const rings=[],texts=[];
  const tetherGeo=new THREE.BufferGeometry();tetherGeo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(28*3),3));
  const tether=new THREE.Line(tetherGeo,new THREE.LineBasicMaterial({color:0x77ffcf,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false}));
  tether.frustumCulled=false;tether.visible=false;scene.add(tether);
  function burst(p,hex=0x83ffda,count=20,force=3){
    color.set(hex);
    for(let j=0;j<count;j++){
      const i=cursor++%N,k=i*3;positions[k]=p.x;positions[k+1]=p.y;positions[k+2]=p.z;
      const a=Math.random()*Math.PI*2,r=Math.random()*force;
      velocity[k]=Math.cos(a)*r;velocity[k+1]=(Math.random()-.2)*force;velocity[k+2]=Math.sin(a)*r;
      colors[k]=color.r;colors[k+1]=color.g;colors[k+2]=color.b;duration[i]=.25+Math.random()*.75;age[i]=0;life[i]=1;size[i]=3+Math.random()*6;
    }
    geo.attributes.color.needsUpdate=geo.attributes.aSize.needsUpdate=true;
  }
  function ring(p,hex=0x7affa9,radius=3,duration=.45){
    const m=new THREE.Mesh(new THREE.RingGeometry(.91,1,64),
      new THREE.MeshBasicMaterial({color:hex,side:THREE.DoubleSide,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false}));
    m.rotation.x=-Math.PI/2;m.position.set(p.x,.08,p.z);m.scale.setScalar(.15);scene.add(m);rings.push({mesh:m,age:0,duration,radius});
  }
  function number(p,value,hex='#e6fff4'){
    if(texts.length>22)return;
    const c=document.createElement('canvas');c.width=256;c.height=112;const ctx=c.getContext('2d');
    ctx.font='700 66px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowColor='#071611';ctx.shadowBlur=10;ctx.lineWidth=5;ctx.strokeStyle='#071611';ctx.strokeText(String(value),128,55);ctx.fillStyle=hex;ctx.fillText(String(value),128,55);
    const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;
    const m=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,depthTest:false,transparent:true}));
    m.position.set(p.x,p.y+1.8,p.z);m.scale.set(2.1,.9,1);scene.add(m);texts.push({mesh:m,age:0});
  }
  function connect(from,to,time){
    tether.visible=!!from;
    if(!from)return;
    const data=tetherGeo.attributes.position.array;
    for(let i=0;i<28;i++){const t=i/27,arc=Math.sin(t*Math.PI);data[i*3]=from.x+(to.x-from.x)*t+Math.sin(time*16+t*20)*arc*.065;
      data[i*3+1]=from.y+(to.y-from.y)*t+arc*.32;data[i*3+2]=from.z+(to.z-from.z)*t+Math.cos(time*12+t*16)*arc*.065;}
    tetherGeo.attributes.position.needsUpdate=true;
  }
  function update(dt,camera,impactDt=dt){
    stompEffects.update(impactDt,camera);
    for(let i=0;i<N;i++){if(life[i]<=0)continue;age[i]+=dt;life[i]=Math.max(0,1-age[i]/duration[i]);const k=i*3;
      positions[k]+=velocity[k]*dt;positions[k+1]+=velocity[k+1]*dt;positions[k+2]+=velocity[k+2]*dt;velocity[k+1]-=3*dt;velocity[k]*=1-dt*.7;velocity[k+2]*=1-dt*.7;}
    geo.attributes.position.needsUpdate=geo.attributes.aLife.needsUpdate=true;
    for(let i=rings.length-1;i>=0;i--){const r=rings[i];r.age+=dt;const t=r.age/r.duration;r.mesh.scale.setScalar(.15+r.radius*Math.sqrt(Math.min(1,t)));r.mesh.material.opacity=.75*(1-t);if(t>=1){scene.remove(r.mesh);r.mesh.geometry.dispose();r.mesh.material.dispose();rings.splice(i,1);}}
    for(let i=texts.length-1;i>=0;i--){const t=texts[i];t.age+=dt;t.mesh.position.y+=dt*.85;t.mesh.material.opacity=Math.min(1,(1-t.age)*2);if(t.age>=1){scene.remove(t.mesh);t.mesh.material.map.dispose();t.mesh.material.dispose();texts.splice(i,1);}}
  }
  function clear(){stompEffects.clear();life.fill(0);tether.visible=false;for(const r of rings){scene.remove(r.mesh);r.mesh.geometry.dispose();r.mesh.material.dispose();}rings.length=0;for(const t of texts){scene.remove(t.mesh);t.mesh.material.map.dispose();t.mesh.material.dispose();}texts.length=0;}
  return {burst,ring,number,connect,update,clear,stomp:stompEffects.impact,stompSnapshot:stompEffects.snapshot};
}
