import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

// Local CC0 assets, recorded in environment-b/asset-provenance.json. A/B is
// restricted to the isolated preview; no network API or paid service at runtime.
export const siegeEnabled=typeof location!=='undefined'&&!new URL(location.href).searchParams.has('environmentBefore')&&new URL(location.href).searchParams.get('environment')!=='before';
const templates=new Map(),surfaces=new Map();
export const siegeSurface=id=>surfaces.get(id);
const base=()=>new URL((import.meta.env.BASE_URL||'./')+'environment-b/',document.baseURI).href;
export async function loadSiegeAssets(){
 if(!siegeEnabled)return;
 const loader=new GLTFLoader(),textures=new THREE.TextureLoader();
 await Promise.all(['wooden_crate_02','wooden_barrels_01','kite_shield','large_castle_door','stone_01','antique_ceramic_vase_01'].map(async id=>{
  const gltf=await loader.loadAsync(base()+id+'/'+id+(id==='stone_01'?'-runtime.glb':'.gltf'));
  gltf.scene.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true;for(const m of Array.isArray(o.material)?o.material:[o.material]){for(const key of ['map','normalMap','roughnessMap','metalnessMap','aoMap'])if(m[key])m[key].anisotropy=4;m.envMapIntensity=.45;}}});
  templates.set(id,gltf.scene);
 }));
 await Promise.all(['monastery_stone_floor','castle_wall_slates'].map(async id=>{
  const [map,normalMap,arm]=await Promise.all(['diff','normal','arm'].map(n=>textures.loadAsync(base()+id+'/'+n+'.jpg')));
  for(const tex of [map,normalMap,arm]){tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.anisotropy=8;}map.colorSpace=THREE.SRGBColorSpace;surfaces.set(id,{map,normalMap,arm});
 }));
}
export function siegeFloor(room){
 if(!siegeEnabled||!['courtyard','bridge'].includes(room.id)||!surfaces.size)return null;
 const maps=surfaces.get('monastery_stone_floor'),repeat=new THREE.Vector2(room.w/3.6,room.d/3.6),copy=t=>{const c=t.clone();c.repeat.copy(repeat);c.needsUpdate=true;return c;};
 const map=copy(maps.map),normalMap=copy(maps.normalMap),arm=copy(maps.arm);
 const mat=new THREE.MeshStandardMaterial({map,normalMap,normalScale:new THREE.Vector2(.45,.45),roughnessMap:arm,aoMap:arm,aoMapIntensity:.7,roughness:1,color:0xffffff,metalness:0});
 mat.onBeforeCompile=s=>{s.fragmentShader=s.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
  float stoneLuma=dot(diffuseColor.rgb,vec3(.2126,.7152,.0722));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(stoneLuma)*vec3(.97,1.,1.025),.82)*1.25;`);};mat.customProgramCacheKey=()=> 'siege-floor-v2';return mat;
}
export function dressSiegeMaterials(materials){
 if(!siegeEnabled||!surfaces.size)return;
 const stone=surfaces.get('castle_wall_slates');
 for(const key of ['masonry','cutStone','base']){
  const m=materials[key];m.map=stone.map;m.bumpMap=null;m.roughness=.94;m.metalness=0;
  // World-aligned tiling respects differently sized instanced blocks and keeps
  // a consistent physical texture scale on wall returns and arch voussoirs.
  m.onBeforeCompile=s=>{
   s.vertexShader='varying vec3 siegeWorld; varying vec3 siegeNormal;\n'+s.vertexShader;
   s.vertexShader=s.vertexShader.replace('#include <worldpos_vertex>',`#include <worldpos_vertex>
    vec4 siegePos=vec4(transformed,1.);vec3 siegeN=objectNormal;
    #ifdef USE_INSTANCING
     siegePos=instanceMatrix*siegePos;siegeN=mat3(instanceMatrix)*siegeN;
    #endif
    siegeWorld=(modelMatrix*siegePos).xyz;siegeNormal=normalize(mat3(modelMatrix)*siegeN);`);
   s.fragmentShader='varying vec3 siegeWorld; varying vec3 siegeNormal;\n'+s.fragmentShader;
   s.fragmentShader=s.fragmentShader.replace('#include <map_fragment>',`vec3 w=pow(abs(siegeNormal),vec3(6.));w/=max(w.x+w.y+w.z,.001);
    vec3 stone=texture2D(map,siegeWorld.zy/2.5).rgb*w.x+texture2D(map,siegeWorld.xz/2.5).rgb*w.y+texture2D(map,siegeWorld.xy/2.5).rgb*w.z;
    diffuseColor.rgb=mix(vec3(.65),diffuseColor.rgb,.22)*mix(vec3(.85),stone,.72)*1.6;
    diffuseColor.rgb*=mix(.70,1.,smoothstep(0.,1.2,siegeWorld.y));`);
  };
  m.customProgramCacheKey=()=>`siege-stone-v1-${key}`;m.needsUpdate=true;
 }
 materials.bronze.color.setHex(0x665342);materials.bronze.metalness=.65;materials.bronze.roughness=.66;
 materials.metal.roughness=.64;materials.metal.metalness=.65;
}
function selected(id,node){const scene=templates.get(id);if(!scene)return null;return (node?scene.getObjectByName(node):scene).clone(true);}
const propSources={crate:['wooden_crate_02'],barrel:['wooden_barrels_01','wooden_barrels_01_barrel01'],shield:['kite_shield'],door:['large_castle_door','large_castle_door_left'],stone:['stone_01'],urn:['antique_ceramic_vase_01']};
export function siegeProp(kind,spec){
 if(!siegeEnabled||!propSources[kind]||!templates.size)return null;
 const content=selected(...propSources[kind]),bounds=new THREE.Box3().setFromObject(content),size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3());
 const scale=Math.min(spec.w/size.x,spec.h/size.y,spec.d/size.z);
 content.position.sub(center);const mesh=new THREE.Group();mesh.add(content);mesh.scale.setScalar(scale);mesh.name='Poly Haven · '+kind;mesh.userData.asset=propSources[kind][0];
 let flammable=false;
 mesh.traverse(o=>{if(!o.isMesh)return;const apply=m=>{if(['stone','urn'].includes(kind)||/metal_trim|clamps|bolts/i.test(o.name))return m;flammable=true;const copy=m.clone();copy.userData.wood=true;copy.userData.baseColor=copy.color.clone();o.userData.ownedFireMaterial=true;return copy;};o.material=Array.isArray(o.material)?o.material.map(apply):apply(o.material);});
 mesh.userData.kind=kind;
 return {mesh,halfExtents:size.multiplyScalar(scale*.5),mass:spec.mass,health:spec.health,label:spec.label,flammable,woodFraction:kind==='shield'?.15:1};
}

const flameVertex=`attribute float flameSeed;varying vec2 uvFlame;varying float phase;
 void main(){uvFlame=uv;phase=flameSeed;vec4 origin=modelViewMatrix*instanceMatrix*vec4(0.,0.,0.,1.);vec2 size=vec2(length(instanceMatrix[0].xyz),length(instanceMatrix[1].xyz));origin.xy+=position.xy*size;gl_Position=projectionMatrix*origin;}`;
const flameFragment=`uniform float time;varying vec2 uvFlame;varying float phase;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.)),f.x),f.y);}
 void main(){float y=uvFlame.y,n=noise(vec2(uvFlame.x*7.+phase,y*5.-time*3.8))+.4*noise(vec2(uvFlame.x*14.,y*12.-time*7.+phase));float x=abs(uvFlame.x-.5+sin(y*8.-time*4.+phase)*y*.08+(n-.6)*y*.13);float width=.32*pow(1.-y,.8);float a=(1.-smoothstep(width-.05,width+.03,x))*(1.-smoothstep(.60+n*.24,.90+n*.06,y))*smoothstep(0.,.13,y);float hot=clamp(1.-x/max(width,.02)-y*.68,0.,1.);vec3 c=mix(vec3(1.,.10,.005),vec3(1.,.66,.06),smoothstep(.1,.7,hot));c=mix(c,vec3(1.,.94,.67),smoothstep(.70,1.,hot));gl_FragColor=vec4(c*1.8,a*.93);}`;
export function siegeTorchFlames(root,torches){
 if(!siegeEnabled)return null;
 const geometry=new THREE.PlaneGeometry(1,1);geometry.setAttribute('flameSeed',new THREE.InstancedBufferAttribute(Float32Array.from(torches,(_,i)=>i*2.71),1));
 const material=new THREE.ShaderMaterial({uniforms:{time:{value:0}},vertexShader:flameVertex,fragmentShader:flameFragment,transparent:true,depthWrite:false,side:THREE.DoubleSide,toneMapped:false});
 const mesh=new THREE.InstancedMesh(geometry,material,torches.length);mesh.name='Siege living fire';mesh.frustumCulled=false;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.renderOrder=2;root.add(mesh);
 const dummy=new THREE.Object3D();return {update(time){material.uniforms.time.value=time;for(const [i,t]of torches.entries()){const s=t.lit?(t.infinite?1.35:1):0;dummy.position.copy(t.position);dummy.position.y+=.16*s;dummy.scale.set(.67*s,.92*s,1);dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);}mesh.instanceMatrix.needsUpdate=true;},dispose(){geometry.dispose();material.dispose();}};
}

export function addSiegeDressing(world){
 if(!siegeEnabled||!templates.size)return;
 const group=new THREE.Group();group.name='After the siege · reusable salvage';world.root.add(group);
 // Low, broken staves remain inside existing solid wall/pylon margins; the
 // combat path stays clear. Sources retain the complete editable collection.
 const barrel=templates.get('wooden_barrels_01');
 for(const [j,p] of [[-13.65,17.8],[-13.5,18.4],[13.5,8.6],[13.65,9.1]].entries()){
  const part=barrel.getObjectByName('wooden_barrels_01_piece'+String(j+4).padStart(2,'0')).clone(true),b=new THREE.Box3().setFromObject(part),c=b.getCenter(new THREE.Vector3());part.position.sub(c);part.position.y+=b.getSize(new THREE.Vector3()).y/2+.014;
  const g=new THREE.Group();g.add(part);g.position.set(...[p[0],0,p[1]]);g.rotation.y=j*.9;group.add(g);
 }
}
