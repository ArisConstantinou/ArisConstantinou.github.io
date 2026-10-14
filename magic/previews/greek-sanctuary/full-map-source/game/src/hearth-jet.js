import * as THREE from 'three';

// Reference: Newsflare wO4Z7zM3Aag, especially 1.75s and 11.75s.
// A narrow fuel stream opens into rolling fire; smoke carries momentum then rises.
// This is a bounded procedural volume, rather than a fluid simulation.
const noise3=`
float hash3(vec3 p){p=fract(p*.3183099+vec3(.13,.37,.71));p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float noise3(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(mix(hash3(i),hash3(i+vec3(1,0,0)),f.x),mix(hash3(i+vec3(0,1,0)),hash3(i+vec3(1,1,0)),f.x),f.y),
 mix(mix(hash3(i+vec3(0,0,1)),hash3(i+vec3(1,0,1)),f.x),mix(hash3(i+vec3(0,1,1)),hash3(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){return .57*noise3(p)+.29*noise3(p*2.03+7.1)+.14*noise3(p*4.11+13.7);}
`;
const volumeVertex=`varying vec3 localPosition;void main(){localPosition=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const volumeFragment=`
uniform float time,lengthM,lift,strength,steps,axialOffset;uniform vec3 boxSize,viewDirection;uniform mat4 inverseWorld;
uniform mat4 projectionMatrix,modelViewMatrix;
varying vec3 localPosition;
${noise3}
void main(){
 vec3 origin=(inverseWorld*vec4(cameraPosition,1.)).xyz;
 vec3 ray=normalize(localPosition-origin);
 // Parallel camera rays must remain parallel in an orthographic game view.
 // Starting two local box diagonals behind its exit face bounds the ray.
 if(isOrthographic){ray=normalize((inverseWorld*vec4(viewDirection,0.)).xyz);origin=localPosition-ray*2.;}
 vec3 safeRay=mix(vec3(-1.),vec3(1.),step(vec3(0.),ray))*max(abs(ray),vec3(.00001));
 vec3 lo=(-vec3(.5)-origin)/safeRay,hi=(vec3(.5)-origin)/safeRay;
 vec3 a=min(lo,hi),b=max(lo,hi);float enter=max(max(a.x,a.y),a.z),leave=min(min(b.x,b.y),b.z);
 enter=max(enter,0.);if(leave<=enter)discard;
 float stepSize=(leave-enter)/steps;
 float distanceM=length(ray*boxSize)*stepSize;
 float tailRadius=(.065+min(.61,lengthM*.09))*1.92;
 float roll=time*3.6;
 vec3 bulbCenter=vec3(.18*sin(roll),.12*cos(roll*.8),lengthM*.79+.12*sin(roll*.7));
 vec3 tongueCenter=vec3(-tailRadius*.34*cos(roll*.65),tailRadius*.22,lengthM*.87+.16*cos(roll*.9));
 vec3 color=vec3(0.);float opacity=0.,firstDepth=-1.;
 for(int i=0;i<48;i++){
  if(float(i)>=steps||opacity>.985)break;
  // Continuous midpoint samples avoid per-pixel random holes at silhouettes.
  float sampleDepth=enter+(float(i)+.5)*stepSize;
  vec3 p=(origin+ray*sampleDepth)*boxSize;
  float axial=p.z+axialOffset;
  float s=max(0.,axial/lengthM);
  if(axial<=0.)continue;
  // World-up lift is converted into the nozzle frame by the host.
  p.y+=lift*.5-lift*pow(s,1.65);
  float curl=sin(s*17.-time*8.2)*s;
  // Conservative support bounds skip empty air before expensive turbulence.
  // Both noise fields stay in [0,1]; their maximum displacement is known.
  vec2 bounded=p.xy+vec2(curl*.11,0.);
  vec2 uncertainty=vec2(.30,.32)*s;
  float radialLower=length(max(abs(bounded)-uncertainty,vec2(0.))/vec2(1.,.91));
  float radiusUpper=(.065+min(.61,lengthM*.09)*pow(min(s,1.),.88))*2.673;
  vec3 bulbLower=vec3(max(abs(bounded-bulbCenter.xy)-uncertainty,vec2(0.)),abs(axial-bulbCenter.z))/(tailRadius*vec3(1.,.94,.92));
  vec3 tongueLower=vec3(max(abs(bounded-tongueCenter.xy)-uncertainty,vec2(0.)),abs(axial-tongueCenter.z))/(tailRadius*vec3(.79,.77,.82));
  bool tailPossible=min(dot(bulbLower,bulbLower),dot(tongueLower,tongueLower))<1.3225;
  bool jetPossible=s<.92&&radialLower<radiusUpper;
  // The remaining Gaussian contribution is negligible across the
  // whole box compared with one displayed colour/alpha byte.
  bool corePossible=s<.72&&exp(-radialLower*radialLower/(.012+.03*s))>1.e-7;
  if(!jetPossible&&!tailPossible&&!corePossible)continue;
  vec3 advect=vec3(p.xy*3.6,s*9.-time*9.5);
  float rolling=fbm(advect+vec3(0.,time*.65,0.));
  float lobe=noise3(vec3(p.xy*2.1,s*5.5-time*3.8));
  p.x+=curl*.11+(lobe-.5)*s*.60;
  p.y+=(noise3(advect*.72+11.)-.5)*s*.64;
  float radius=.065+min(.61,lengthM*.09)*pow(min(s,1.),.88);
  radius*=.42+1.2*lobe;
  // Entrained air opens the fuel stream into a broad terminal fire plume.
  radius*=1.+.65*smoothstep(.38,.88,s);
  float r=length(p.xy/vec2(1.,.91));
  float envelope=1.-smoothstep(radius*.66,radius,r);
  float breakup=smoothstep(.43,.66,rolling+.12*(1.-s));
  float core=exp(-r*r/(.012+.03*s))*(1.-smoothstep(.15,.72,s));
  // The end is a rolling volume of burning fuel, not a cone sliced by one
  // axial fade plane. Overlapping irregular lobes keep its broad silhouette
  // while their outer density dissipates into the smoke.
  vec3 bulb=(vec3(p.xy,axial)-bulbCenter)/(tailRadius*vec3(1.,.94,.92));
  vec3 tongue=(vec3(p.xy,axial)-tongueCenter)/(tailRadius*vec3(.79,.77,.82));
  float billow=1.-smoothstep(.42,1.,min(length(bulb),length(tongue))+(rolling-.5)*.30);
  float jetFade=1.-smoothstep(.62,.92,s);
  float density=(envelope*breakup*1.05*jetFade+core*.45+billow*breakup*.92)*smoothstep(0.,.025,s)*strength;
  float temperature=clamp(.94-s*.36+(rolling-.5)*.5-r/max(radius,.01)*.19,0.,1.);
  vec3 emission=mix(vec3(1.,.055,.004),vec3(1.,.34,.018),smoothstep(.28,.58,temperature));
  emission=mix(emission,vec3(1.,.77,.16),smoothstep(.58,.83,temperature));
  emission=mix(emission,vec3(1.,.96,.66),smoothstep(.88,1.,temperature));
  float alpha=1.-exp(-density*distanceM*3.2);
  float previousOpacity=opacity;
  color+=(1.-opacity)*alpha*emission*1.25;opacity+=(1.-opacity)*alpha;
  if(opacity>.006&&firstDepth<0.){float fraction=clamp((.006-previousOpacity)/max(.000001,opacity-previousOpacity),0.,1.);firstDepth=max(enter,sampleDepth+(fraction-.5)*stepSize);}
 }
 if(opacity<.006)discard;
 // Test the visible fire against the castle, not the back wall of its box.
 vec4 fireDepth=projectionMatrix*modelViewMatrix*vec4(origin+ray*firstDepth,1.);
 gl_FragDepth=clamp(fireDepth.z/fireDepth.w*.5+.5,0.,1.);
 gl_FragColor=vec4(color/max(opacity,.001),opacity);
}`;
const smokeVertex=`attribute vec3 puff;varying vec2 vUv;varying vec3 vPuff;
void main(){vUv=uv;vPuff=puff;gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.);}`;
const smokeFragment=`varying vec2 vUv;varying vec3 vPuff;${noise3}
void main(){
 vec2 p=(vUv-.5)*2.;float age=vPuff.x,seed=vPuff.y;
 float n=fbm(vec3(p*2.3+seed,age*2.4+seed));
 vec2 curl=p+vec2(n-.5,noise3(vec3(p*2.+8.,seed+age))-.5)*.28;
 float shape=1.-smoothstep(.43,.97,length(curl));
 float fade=smoothstep(0.,.09,age)*(1.-smoothstep(.45,1.,age));
 float alpha=shape*smoothstep(.2,.72,n)*fade*vPuff.z;
 vec3 c=mix(vec3(.105,.105,.10),vec3(.35,.34,.32),n*.7+age*.3);
 // Brief warm underside from the flame, then cooling charcoal-grey smoke.
 c+=vec3(.26,.085,.009)*(1.-smoothstep(0.,.3,age))*(1.-vUv.y);
 if(alpha<.003)discard;gl_FragColor=vec4(c,alpha);
}`;

export function createHearthJet(scene,slot=0){
 const uniforms={time:{value:0},lengthM:{value:7},lift:{value:.6},strength:{value:0},steps:{value:48},axialOffset:{value:3.5},boxSize:{value:new THREE.Vector3()},viewDirection:{value:new THREE.Vector3()},inverseWorld:{value:new THREE.Matrix4()}};
 const material=new THREE.ShaderMaterial({uniforms,vertexShader:volumeVertex,fragmentShader:volumeFragment,transparent:true,depthWrite:false,side:THREE.BackSide,toneMapped:false});
 const volume=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material);volume.name='hearth-jet-volume';volume.visible=false;volume.renderOrder=3;scene.add(volume);
 const capacity=48,geometry=new THREE.PlaneGeometry(1,1);
 const puff=new THREE.InstancedBufferAttribute(new Float32Array(capacity*3),3);puff.setUsage(THREE.DynamicDrawUsage);geometry.setAttribute('puff',puff);
 const smokeMaterial=new THREE.ShaderMaterial({vertexShader:smokeVertex,fragmentShader:smokeFragment,transparent:true,depthWrite:false,side:THREE.DoubleSide,toneMapped:false});
 const smoke=new THREE.InstancedMesh(geometry,smokeMaterial,capacity);smoke.name='hearth-jet-smoke';smoke.instanceMatrix.setUsage(THREE.DynamicDrawUsage);smoke.frustumCulled=false;smoke.count=0;smoke.renderOrder=4;scene.add(smoke);
 const light=new THREE.PointLight(0xff8c29,0,11,2);light.name='hearth-jet-light';scene.add(light);
 const packets=Array.from({length:capacity},(_,i)=>({position:new THREE.Vector3(),velocity:new THREE.Vector3(),age:3,life:2.4,seed:i*2.39996,size:1}));
 const origin=new THREE.Vector3(),direction=new THREE.Vector3(),right=new THREE.Vector3(),up=new THREE.Vector3(),worldUp=new THREE.Vector3(0,1,0);
 const basis=new THREE.Matrix4(),matrix=new THREE.Matrix4(),scale=new THREE.Vector3();
 const sorted=[];let previousTime=null,engineIdentity=null,cursor=0,emission=0,strength=0,lastLength=7,active=0;
 function clear(){for(const p of packets)p.age=p.life;previousTime=null;engineIdentity=null;emission=0;strength=0;volume.visible=false;smoke.count=0;light.intensity=0;active=0;}
 function update(hearth,camera,time,quality='high'){
  camera.getWorldDirection(uniforms.viewDirection.value);
  if(hearth!==engineIdentity||previousTime!==null&&time<previousTime)clear();engineIdentity=hearth;
  const dt=previousTime===null?0:Math.min(.06,Math.max(0,time-previousTime));previousTime=time;
  const stream=hearth?.streams?.[slot];
  const legacy=slot===0&&hearth&&!hearth.streams;
  const firing=!!hearth?.heart.firing&&!!(stream||legacy);
  strength=THREE.MathUtils.damp(strength,firing?1:0,firing?22:28,dt);
  // Feed cuts immediately at the nozzle. Existing smoke keeps its own lifetime.
  volume.visible=firing&&strength>.001;
  uniforms.steps.value=quality==='high'?48:32;
  if(stream||legacy){
   if(stream){origin.copy(stream.origin);direction.copy(stream.direction);}
   else{origin.copy(hearth.visual.point('nozzle',.28));direction.copy(worldUp).transformDirection(hearth.visual.bones.nozzle.matrixWorld);direction.multiplyScalar(1/Math.max(.01,Math.hypot(direction.x,direction.z)));}
   // Gameplay range is measured horizontally; preserve exactly the same endpoint.
   lastLength=Math.max(.1,stream?.length??hearth.jetLength??7);const physicalLength=lastLength*direction.length();direction.normalize();
   right.crossVectors(worldUp,direction).normalize();if(right.lengthSq()<.01)right.set(1,0,0);up.crossVectors(direction,right).normalize();
   const lift=Math.min(1.8,lastLength*.25),diameter=1.1+Math.min(.61,lastLength*.09)*7.1;
   // Extra empty space contains moving terminal lobes in every camera angle.
   // lengthM and the gameplay ray stay unchanged; this is only a render bound.
   const renderLength=physicalLength+(.065+Math.min(.61,lastLength*.09))*2.5;
   basis.makeBasis(right,up,direction);volume.quaternion.setFromRotationMatrix(basis);
   volume.scale.set(diameter,diameter+lift,renderLength);
   volume.position.copy(origin).addScaledVector(direction,renderLength*.5).addScaledVector(up,lift*.5);
   volume.updateMatrixWorld(true);uniforms.inverseWorld.value.copy(volume.matrixWorld).invert();
   uniforms.boxSize.value.copy(volume.scale);uniforms.lengthM.value=physicalLength;uniforms.axialOffset.value=renderLength*.5;uniforms.lift.value=lift;uniforms.time.value=time;uniforms.strength.value=strength;
   light.position.copy(origin).addScaledVector(direction,Math.min(1.5,physicalLength*.3));
   light.intensity=firing?(8.5+noiseLight(time)*1.4)*strength:0;
   if(firing&&dt>0){
    emission+=dt*22;
    while(emission>=1){emission--;const p=packets[cursor++%capacity],s=.52+.30*(.5+.5*Math.sin(p.seed+cursor*.7));
     p.position.copy(origin).addScaledVector(direction,physicalLength*s).addScaledVector(up,lift*s*s+.13);
     p.position.addScaledVector(right,Math.sin(p.seed+time*3)*diameter*.10);
     p.velocity.copy(direction).multiplyScalar(.65).addScaledVector(worldUp,1.05+.25*Math.sin(p.seed));
     p.age=0;p.life=2.05+.4*(.5+.5*Math.sin(p.seed));p.size=.65+s*.65;
    }
   }
  }else light.intensity=0;
  sorted.length=0;
  for(const p of packets)if(p.age<p.life){
   p.age+=dt;if(p.age>=p.life)continue;
   p.velocity.x*=Math.exp(-dt*.9);p.velocity.z*=Math.exp(-dt*.9);p.velocity.y+=dt*.24;
   p.position.addScaledVector(p.velocity,dt);p.position.x+=Math.sin(time*1.7+p.seed)*dt*.15;p.position.z+=Math.cos(time*1.4+p.seed)*dt*.1;sorted.push(p);
  }
  // Normal alpha blending requires back-to-front ordering, including when aiming turns.
  sorted.sort((a,b)=>b.position.distanceToSquared(camera.position)-a.position.distanceToSquared(camera.position));active=sorted.length;
  for(let i=0;i<active;i++){const p=sorted[i],age=p.age/p.life,size=p.size*(.7+age*1.3);
   scale.set(size,size*1.17,1);matrix.compose(p.position,camera.quaternion,scale);smoke.setMatrixAt(i,matrix);puff.setXYZ(i,age,p.seed,.28);
  }
  smoke.count=active;smoke.instanceMatrix.needsUpdate=true;puff.needsUpdate=true;
 }
 function noiseLight(t){return Math.sin(t*17)*.45+Math.sin(t*29.3+1.7)*.3+Math.sin(t*7.1)*.25;}
 return{update,clear,counts:()=>({volume:volume.visible?1:0,smoke:active,capacity,steps:uniforms.steps.value,drawCalls:(volume.visible?1:0)+(active?1:0),lights:1,length:lastLength})};
}
