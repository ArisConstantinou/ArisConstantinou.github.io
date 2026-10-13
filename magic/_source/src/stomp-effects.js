import * as THREE from 'three';

/** Bounded impact pool: fractured floor scars, airborne stone chips and opaque
 * dusty billows. Effects start at the right sole's actual contact, never at windup.
 */
export function createStompEffects(scene) {
  const group=new THREE.Group();group.name='HEARTH stomp impacts';scene.add(group);
  const crackVertices=[];
  let seed=917;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/4294967296);
  function segment(a,b,width){const dx=b[0]-a[0],dz=b[1]-a[1],n=Math.hypot(dx,dz),x=-dz/n*width,z=dx/n*width;
    crackVertices.push(a[0]+x,0,a[1]+z,a[0]-x,0,a[1]-z,b[0]+x,0,b[1]+z,b[0]+x,0,b[1]+z,a[0]-x,0,a[1]-z,b[0]-x,0,b[1]-z);}
  for(let branch=0;branch<11;branch++){
    const angle=branch*Math.PI*2/11,extent=.95+random()*.95;let last=[Math.sin(angle)*.16,Math.cos(angle)*.16];
    for(let i=1;i<=5;i++){const r=i*extent/5,a=angle+(random()-.5)*.30,next=[Math.sin(a)*r,Math.cos(a)*r];segment(last,next,.026*(1-i/7));
      if(i===3){const a2=a+(random()<.5?-1:1)*.62;segment(next,[next[0]+Math.sin(a2)*.55,next[1]+Math.cos(a2)*.55],.012);}last=next;}
  }
  const crackGeo=new THREE.BufferGeometry();crackGeo.setAttribute('position',new THREE.Float32BufferAttribute(crackVertices,3));crackGeo.computeVertexNormals();
  const crackMat=new THREE.MeshBasicMaterial({color:0x181b1d,side:THREE.DoubleSide,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2});
  const scars=new THREE.InstancedMesh(crackGeo,crackMat,8);scars.frustumCulled=false;group.add(scars);
  const stoneGeo=new THREE.DodecahedronGeometry(1,0),stoneMat=new THREE.MeshStandardMaterial({color:0x85868a,roughness:.92});
  const chips=new THREE.InstancedMesh(stoneGeo,stoneMat,64);chips.castShadow=chips.receiveShadow=true;chips.frustumCulled=false;group.add(chips);
  const dustGeo=new THREE.PlaneGeometry(1,1),opacity=new THREE.InstancedBufferAttribute(new Float32Array(48),1);
  dustGeo.setAttribute('impactOpacity',opacity);
  const dustMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,uniforms:{time:{value:0}},
    vertexShader:'attribute float impactOpacity;varying vec2 vUv;varying float vOpacity;void main(){vUv=uv;vOpacity=impactOpacity;gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.);}',
    fragmentShader:`uniform float time;varying vec2 vUv;varying float vOpacity;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
      void main(){vec2 p=vUv-.5;float n=noise(vUv*5.+time*.12)+.4*noise(vUv*13.-time*.08);float shape=1.-smoothstep(.26,.54,length(p)+.075*(n-.7));float alpha=shape*vOpacity*(.58+.25*n);vec3 c=mix(vec3(.24,.235,.21),vec3(.48,.45,.39),clamp(n*.7,0.,1.));gl_FragColor=vec4(c,alpha);}`});
  const dust=new THREE.InstancedMesh(dustGeo,dustMat,48);dust.frustumCulled=false;dust.renderOrder=3;group.add(dust);
  const empty=()=>({age:100,duration:0,p:new THREE.Vector3(),v:new THREE.Vector3(),q:new THREE.Quaternion(),size:0});
  const stones=Array.from({length:64},empty),clouds=Array.from({length:48},empty),marks=Array.from({length:8},empty);
  const matrix=new THREE.Matrix4(),rotation=new THREE.Quaternion(),axis=new THREE.Vector3(1,.4,.6).normalize(),scale=new THREE.Vector3();
  let stoneCursor=0,dustCursor=0,scarCursor=0,time=0,impacts=0;
  function hide(mesh,index){matrix.makeScale(0,0,0);mesh.setMatrixAt(index,matrix);}
  function impact(point){
    impacts++;const mark=marks[scarCursor++%marks.length];mark.age=0;mark.duration=Infinity;mark.p.copy(point);mark.p.y+=.009;mark.q.setFromAxisAngle(new THREE.Vector3(0,1,0),random()*Math.PI*2);mark.size=1;
    for(let i=0;i<24;i++){
      const s=stones[stoneCursor++%stones.length],a=random()*Math.PI*2,r=.15+random()*.45;s.p.copy(point);s.p.x+=Math.sin(a)*r;s.p.z+=Math.cos(a)*r;s.p.y+=.06;
      const force=1.3+random()*3;s.v.set(Math.sin(a)*force,1.7+random()*3.5,Math.cos(a)*force);s.q.setFromAxisAngle(axis,random()*6);s.age=0;s.duration=2.1+random()*.8;s.size=.055+random()*.13;
    }
    for(let i=0;i<22;i++){
      const s=clouds[dustCursor++%clouds.length],a=random()*Math.PI*2,r=random()*.7;s.p.copy(point);s.p.x+=Math.sin(a)*r;s.p.z+=Math.cos(a)*r;s.p.y+=.12;
      const force=.6+random()*1.6;s.v.set(Math.sin(a)*force,.35+random()*.85,Math.cos(a)*force);s.age=0;s.duration=1.6+random()*1.9;s.size=.6+random()*.7;
    }
    update(0);
  }
  function update(dt,camera){
    time+=dt;dustMat.uniforms.time.value=time;
    for(let i=0;i<marks.length;i++){const s=marks[i];s.age+=dt;if(s.age>=s.duration){hide(scars,i);continue;}scale.setScalar(s.size);matrix.compose(s.p,s.q,scale);scars.setMatrixAt(i,matrix);}
    for(let i=0;i<stones.length;i++){
      const s=stones[i];s.age+=dt;if(s.age>=s.duration){hide(chips,i);continue;}s.v.y-=9.8*dt;s.p.addScaledVector(s.v,dt);
      if(s.p.y<.045){s.p.y=.045;if(s.v.y<0)s.v.y=-s.v.y*.23;s.v.x*=Math.exp(-dt*7);s.v.z*=Math.exp(-dt*7);}
      rotation.setFromAxisAngle(axis,dt*7);s.q.premultiply(rotation);scale.set(s.size,s.size*.58,s.size*.9).multiplyScalar(Math.min(1,(s.duration-s.age)*2));matrix.compose(s.p,s.q,scale);chips.setMatrixAt(i,matrix);
    }
    for(let i=0;i<clouds.length;i++){
      const s=clouds[i];s.age+=dt;if(s.age>=s.duration){opacity.array[i]=0;hide(dust,i);continue;}s.p.addScaledVector(s.v,dt);s.v.multiplyScalar(Math.exp(-dt*.7));
      if(camera)s.q.copy(camera.quaternion);scale.setScalar(s.size*(.45+Math.sqrt(s.age)*1.3));matrix.compose(s.p,s.q,scale);dust.setMatrixAt(i,matrix);opacity.array[i]=Math.min(1,s.age/.05)*Math.pow(1-s.age/s.duration,1.4)*.64;
    }
    scars.instanceMatrix.needsUpdate=chips.instanceMatrix.needsUpdate=dust.instanceMatrix.needsUpdate=opacity.needsUpdate=true;
    scars.visible=marks.some(s=>s.age<s.duration);chips.visible=stones.some(s=>s.age<s.duration);dust.visible=clouds.some(s=>s.age<s.duration);group.visible=scars.visible||chips.visible||dust.visible;
  }
  function clear(){for(const pool of [marks,stones,clouds])for(const s of pool){s.age=100;s.duration=0;}update(0);impacts=0;}
  clear();
  return {impact,update,clear,snapshot:()=>({impacts,scars:marks.filter(s=>s.age<s.duration).length,debris:stones.filter(s=>s.age<s.duration).length,dust:clouds.filter(s=>s.age<s.duration).length,age:time}),dispose(){group.removeFromParent();for(const mesh of [scars,chips,dust]){mesh.geometry.dispose();mesh.material.dispose();mesh.dispose();}}};
}
