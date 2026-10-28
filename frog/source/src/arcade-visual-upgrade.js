import * as THREE from 'three';
import {BATTLEGROUND_PALETTE} from './arcade-battleground.js';

const clamp=THREE.MathUtils.clamp;

// Arcade presentation is deliberately separate from the shared creek world.
// These changes never move a vertex, collider, route or gameplay object.
function meadowTexture(){
 const side=128,data=new Uint8Array(side*side*4);
 let seed=91407;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 for(let y=0;y<side;y++)for(let x=0;x<side;x++){
  const i=(y*side+x)*4,broad=Math.sin(x*Math.PI/16)*Math.cos(y*Math.PI/32),grain=random(),value=216+broad*9+(grain-.5)*22;
  data[i]=Math.round(value*.97);data[i+1]=Math.round(value);data[i+2]=Math.round(value*.91);data[i+3]=255;
 }
 const texture=new THREE.DataTexture(data,side,side,THREE.RGBAFormat);texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(72,72);texture.generateMipmaps=true;texture.minFilter=THREE.LinearMipmapLinearFilter;texture.magFilter=THREE.LinearFilter;texture.needsUpdate=true;return texture;
}

function skyMaterial(){
 return new THREE.ShaderMaterial({
  side:THREE.BackSide,depthWrite:false,depthTest:false,toneMapped:false,
  uniforms:{zenith:{value:new THREE.Color('#78b8c1')},horizon:{value:new THREE.Color('#d4dec1')},glow:{value:new THREE.Color('#f4e6b9')}},
  vertexShader:'varying vec3 skyDirection; void main(){ skyDirection = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
  fragmentShader:`uniform vec3 zenith; uniform vec3 horizon; uniform vec3 glow; varying vec3 skyDirection;
   void main(){
    vec3 direction=normalize(skyDirection);
    float height=smoothstep(-.08,.65,direction.y);
    vec3 color=mix(horizon,zenith,height);
    float sun=pow(max(0.0,dot(direction,normalize(vec3(-.48,.72,.3)))),18.0);
    color=mix(color,glow,sun*.35);
    float cloud=sin(direction.x*8.0+direction.z*5.0)+sin(direction.x*17.0-direction.z*11.0)*.35;
    float cloudBand=smoothstep(.1,.2,direction.y)*(1.0-smoothstep(.42,.62,direction.y));
    color=mix(color,horizon,smoothstep(.68,1.2,cloud)*cloudBand*.22);
    gl_FragColor=vec4(color,1.0);
    #include <colorspace_fragment>
   }`,
 });
}

/** Install once after the arena, bases and battleground have been constructed.
 * Call update after world.update: the shared world refreshes its sun tint there.
 * Only one sky draw call is added; surface depth comes from baked vertex color,
 * so low quality needs no shadow map, postprocessing or extra render pass. */
export function installArcadeVisualUpgrade(game){
 const undo=[],materials=[],geometries=[],textures=[];
 const replace=(object,key,value)=>{const previous=object[key];undo.push(()=>{object[key]=previous;});object[key]=value;return value;};
 const materialFor=mesh=>{const original=mesh.material,material=original.clone();material.onBeforeCompile=original.onBeforeCompile;material.customProgramCacheKey=original.customProgramCacheKey;materials.push(material);replace(mesh,'material',material);return material;};
 const paint=(mesh,shade)=>{
  if(!mesh?.geometry)return;
  const geometry=mesh.geometry,position=geometry.getAttribute('position'),normal=geometry.getAttribute('normal'),previous=geometry.getAttribute('color'),colors=new Float32Array(position.count*3),color=new THREE.Color();
  geometry.computeBoundingBox();const bounds=geometry.boundingBox,height=Math.max(.01,bounds.max.y-bounds.min.y);
  for(let i=0;i<position.count;i++){
   shade(color,{x:position.getX(i),y:position.getY(i),z:position.getZ(i),up:normal?.getY(i)||0,height:(position.getY(i)-bounds.min.y)/height,index:i,previous});color.toArray(colors,i*3);
  }
  geometry.setAttribute('color',new THREE.BufferAttribute(colors,3));undo.push(()=>{if(previous)geometry.setAttribute('color',previous);else geometry.deleteAttribute('color');});
 };

 replace(game.scene,'background',new THREE.Color(BATTLEGROUND_PALETTE.sky));
 if(game.scene.fog){replace(game.scene.fog,'color',new THREE.Color(BATTLEGROUND_PALETTE.fog));replace(game.scene.fog,'density',.009);}
 if(game.renderer)replace(game.renderer,'toneMappingExposure',1.12);
 for(const light of game.scene.children)if(light.isHemisphereLight){replace(light,'color',new THREE.Color('#d9eee6'));replace(light,'groundColor',new THREE.Color('#61734b'));replace(light,'intensity',2.15);}
 if(game.sun){replace(game.sun,'color',new THREE.Color('#fff0cc'));replace(game.sun,'intensity',2.75);}

 const skyGeometry=new THREE.SphereGeometry(180,24,12),skyMat=skyMaterial(),sky=new THREE.Mesh(skyGeometry,skyMat);sky.name='Απαλός ουρανός του βάλτου';sky.renderOrder=-1000;sky.frustumCulled=false;sky.userData.decorativeOnly=true;game.scene.add(sky);geometries.push(skyGeometry);materials.push(skyMat);undo.push(()=>sky.removeFromParent());

 const groves=game.basesView?.groves||[],rocks=game.obstacleMeshes||[],shadeSources=[
  ...rocks.map(mesh=>({x:mesh.position.x,z:mesh.position.z,radius:mesh.geometry.parameters?.radius||1,amount:.29})),
  ...groves.map(({definition})=>({x:definition.x,z:definition.z,radius:definition.radius*.9,amount:.2})),
 ];
 const contactShade=(x,z)=>{
  let value=1;
  for(const source of shadeSources){
   const dx=(x-source.x-source.radius*.2)/(source.radius*1.28),dz=(z-source.z+source.radius*.14)/(source.radius*1.08),distance=dx*dx+dz*dz;
   if(distance<4)value*=1-source.amount*Math.exp(-distance*1.65);
  }
  return Math.max(.62,value);
 };
 const terrain=game.world?.group?.getObjectByName('Creek bed and island banks');
 if(terrain){
  const texture=meadowTexture();textures.push(texture);const material=materialFor(terrain);material.map=texture;material.roughness=1;material.needsUpdate=true;
  paint(terrain,(color,{x,z,index,previous})=>{
   color.fromBufferAttribute(previous,index);
   const meadow=.97+.08*Math.sin(x*.31+Math.sin(z*.23))+.035*Math.cos(x*.73-z*.59);
   color.multiplyScalar(meadow*contactShade(x,z));
  });
 }
 const road=game.battlegroundView?.roadMesh;
 if(road)paint(road,(color,{x,z,index,previous})=>color.fromBufferAttribute(previous,index).multiplyScalar(contactShade(x,z)));

 const leafLow=new THREE.Color('#315c42'),leafHigh=new THREE.Color('#a0b95c'),rockLow=new THREE.Color('#49635b'),rockHigh=new THREE.Color('#9da990'),moss=new THREE.Color('#7e984d'),woodLow=new THREE.Color('#5c5040'),woodHigh=new THREE.Color('#a08a5b');
 for(const [index,grove] of groves.entries()){
  const crown=grove.group.getObjectByName('grove-leaf-crown');
  if(crown){
   const material=materialFor(crown);replace(grove,'material',material);material.color.set('#ffffff');material.vertexColors=true;material.needsUpdate=true;
   paint(crown,(color,p)=>{const variation=.06*Math.sin(p.x*3.9+p.z*2.6+index);color.copy(leafLow).lerp(leafHigh,clamp(.12+p.height*.72+variation,0,1)).multiplyScalar(.95+.06*Math.cos(index*1.8));});
  }
  const understory=grove.group.getObjectByName('slow-moving-underbrush');
  if(understory){const material=materialFor(understory);material.color.set('#ffffff');material.vertexColors=true;material.needsUpdate=true;paint(understory,(color,p)=>color.copy(leafLow).lerp(leafHigh,.13+p.height*.45));}
  const trunk=grove.group.getObjectByName('grove-trunks');
  if(trunk){const material=materialFor(trunk);material.color.set('#ffffff');material.vertexColors=true;material.needsUpdate=true;paint(trunk,(color,p)=>color.copy(woodLow).lerp(woodHigh,.2+p.height*.52+.08*Math.sin(p.x*18+p.z*13)));}
 }
 if(rocks.length){
  const material=materialFor(rocks[0]);material.color.set('#ffffff');material.vertexColors=true;material.flatShading=true;material.roughness=1;material.needsUpdate=true;
  for(const [index,rock] of rocks.entries()){
   if(index)replace(rock,'material',material);
   paint(rock,(color,p)=>{const variation=.035*Math.sin((p.x+rock.position.x)*11+(p.z+rock.position.z)*7);color.copy(rockLow).lerp(rockHigh,clamp(.18+p.height*.72+variation,0,1));color.lerp(moss,Math.max(0,p.up)*Math.max(0,p.height-.35)*.65);});
  }
 }

 const water=game.world?.water,uniforms=water?.material?.uniforms;
 if(uniforms){
  if(uniforms.sunColor){const previous=uniforms.sunColor.value.clone();undo.push(()=>uniforms.sunColor.value.copy(previous));}
  // Keep the real reflected scene but soften its stark white glare. The Water
  // shader is pinned by this project's Three.js version; no depth/alpha change.
  const material=water.material,fragment=material.fragmentShader
   .replace('vec3( 1.5, 1.0, 1.5 )','vec3( 0.75, 1.0, 0.75 )')
   .replace('100.0, 2.0, 0.5','80.0, 0.55, 0.42')
   .replace('float rf0 = 0.3;','float rf0 = 0.14;')
   .replace('vec3 outgoingLight = albedo;','vec3 outgoingLight = mix( albedo, waterColor * 1.28, 0.24 );');
  replace(material,'fragmentShader',fragment);material.needsUpdate=true;
  if(uniforms.distortionScale)replace(uniforms.distortionScale,'value',1.35);
  if(uniforms.size)replace(uniforms.size,'value',3.4);
 }
 const waterSun=new THREE.Color('#e8d9b4').multiplyScalar(.82);
 let disposed=false;
 return {
  update(){if(!disposed&&uniforms?.sunColor)uniforms.sunColor.value.copy(waterSun);},
  dispose(){if(disposed)return;disposed=true;for(const restore of undo.reverse())restore();for(const geometry of geometries)geometry.dispose();for(const material of materials)material.dispose();for(const texture of textures)texture.dispose();if(water)water.material.needsUpdate=true;},
 };
}
