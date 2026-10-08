import * as THREE from './vendor/three.module.js';

// Local photographic PBR surfaces; small architectural details are generated once.
const seeded = seed => () => {seed = Math.imul(seed ^ seed >>> 15, 1 | seed); seed ^= seed + Math.imul(seed ^ seed >>> 7, 61 | seed); return ((seed ^ seed >>> 14) >>> 0) / 4294967296;};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function canvasTexture(size,draw,repeat=1){const c=document.createElement('canvas');c.width=c.height=size;const g=c.getContext('2d');draw(g,size,seeded(912713));const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(repeat,repeat);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;}
function grain(g,n,r,amount=26){const d=g.getImageData(0,0,n,n);for(let i=0;i<d.data.length;i+=4){const q=(r()-.5)*amount;d.data[i]=clamp(d.data[i]+q,0,255);d.data[i+1]=clamp(d.data[i+1]+q,0,255);d.data[i+2]=clamp(d.data[i+2]+q,0,255);}g.putImageData(d,0,0);}
export function createMaterials(){
 const stone=canvasTexture(1024,(g,n,r)=>{g.fillStyle='#49463e';g.fillRect(0,0,n,n);const rows=18,h=n/rows;for(let y=-1;y<rows+1;y++){let x=y%2?-47:-6;while(x<n){const w=58+r()*42, shade=135+r()*49;g.fillStyle=`rgb(${shade|0},${(shade*.94)|0},${(shade*.81)|0})`;g.beginPath();g.moveTo(x+3,y*h+3+r()*2);g.lineTo(x+w-3,y*h+2);g.lineTo(x+w-2,(y+1)*h-4);g.lineTo(x+2,(y+1)*h-3);g.closePath();g.fill();g.strokeStyle='rgba(232,218,183,.27)';g.lineWidth=2;g.beginPath();g.moveTo(x+4,(y+1)*h-6);g.lineTo(x+4,y*h+5);g.lineTo(x+w-6,y*h+5);g.stroke();if(r()>.7){g.strokeStyle='rgba(49,51,42,.33)';g.lineWidth=1;g.beginPath();g.moveTo(x+w*.35,y*h+4);g.lineTo(x+w*.45,y*h+h*.58);g.lineTo(x+w*.34,(y+1)*h-4);g.stroke();}x+=w;}}grain(g,n,r,20);for(let i=0;i<30;i++){const grad=g.createRadialGradient(r()*n,r()*n,5,r()*n,r()*n,160);grad.addColorStop(0,'rgba(44,50,24,.06)');grad.addColorStop(1,'rgba(44,50,24,0)');g.fillStyle=grad;g.fillRect(0,0,n,n);}});
 const plaster=canvasTexture(256,(g,n,r)=>{g.fillStyle='#bfb095';g.fillRect(0,0,n,n);grain(g,n,r,33);for(let i=0;i<400;i++){g.fillStyle=r()>.5?'rgba(50,44,31,.11)':'rgba(230,224,193,.15)';g.fillRect(r()*n,r()*n,1+r()*9,1+r()*5);}});
 const wood=canvasTexture(512,(g,n,r)=>{g.fillStyle='#6e4c30';g.fillRect(0,0,n,n);for(let x=0;x<n;x+=42){g.fillStyle=`rgba(24,14,9,${.2+r()*.16})`;g.fillRect(x,0,3,n);g.fillStyle='rgba(208,160,89,.15)';g.fillRect(x+4,0,2,n);}for(let i=0;i<1500;i++){const x=r()*n;g.strokeStyle=`rgba(${r()>.4?'32,21,10':'197,159,101'},${.1+r()*.22})`;g.lineWidth=.4+r()*1.5;g.beginPath();g.moveTo(x,r()*n);g.bezierCurveTo(x+6,90,x-5,290,x+3,n);g.stroke();}grain(g,n,r,12);});
 const roof=canvasTexture(512,(g,n,r)=>{g.fillStyle='#614137';g.fillRect(0,0,n,n);const w=43,h=35;for(let y=-1;y<16;y++)for(let x=-1;x<13;x++){const a=84+r()*40;g.fillStyle=`rgb(${a|0},${(a*.66)|0},${(a*.51)|0})`;g.fillRect(x*w+(y%2)*w/2+2,y*h+1,w-3,h-2);g.fillStyle='rgba(225,170,108,.14)';g.fillRect(x*w+(y%2)*w/2+2,y*h+1,w-3,3);g.fillStyle='rgba(25,19,17,.28)';g.fillRect(x*w+(y%2)*w/2+2,(y+1)*h-3,w-3,2);}grain(g,n,r,13);});
 const ground=canvasTexture(512,(g,n,r)=>{g.fillStyle='#928769';g.fillRect(0,0,n,n);grain(g,n,r,54);for(let i=0;i<12000;i++){g.fillStyle=r()>.5?'rgba(26,33,14,.14)':'rgba(211,197,160,.19)';const x=r()*n,y=r()*n;g.fillRect(x,y,.3+r()*2,.3+r()*2);}},36);
 const standard=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.88,metalness:0,...extra});
 const m={
 stone:standard('#c5bca3',{map:stone,bumpMap:stone,bumpScale:.17}),
 paleStone:standard('#dfcfac',{map:stone,bumpMap:stone,bumpScale:.15}),
 darkStone:standard('#837c69',{map:stone,bumpMap:stone,bumpScale:.2}),
 plaster:standard('#f0dcc0',{map:plaster,bumpMap:plaster,bumpScale:.05}),
 ochre:standard('#bc9e70',{map:plaster,bumpMap:plaster,bumpScale:.05}),
 wood:standard('#d4af77',{map:wood,bumpMap:wood,bumpScale:.13}),
 darkWood:standard('#6b5037',{map:wood,bumpMap:wood,bumpScale:.09}),
 roof:standard('#bc9180',{map:roof,bumpMap:roof,bumpScale:.11}),
 darkRoof:standard('#62615b',{map:roof,bumpMap:roof,bumpScale:.1}),
 ground:standard('#ffffff',{map:ground,vertexColors:true,bumpMap:ground,bumpScale:.28}),
 dirt:standard('#ab9874',{map:ground}),
 road:standard('#b2a384',{map:ground,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-2}),
 rock:standard('#878577',{map:plaster,flatShading:false}),
 foliage:standard('#3b512e',{roughness:1}),foliageLight:standard('#677145',{roughness:1}),trunk:standard('#59452f'),
 water:new THREE.MeshPhysicalMaterial({color:'#315d60',roughness:.3,metalness:.05,transparent:true,opacity:.87,clearcoat:.48,clearcoatRoughness:.25,side:THREE.DoubleSide}),
 foam:new THREE.MeshBasicMaterial({color:'#d4e4d5',transparent:true,opacity:.22,depthWrite:false}),
 iron:standard('#747c7c',{metalness:.67,roughness:.47}),darkIron:standard('#333b3b',{metalness:.62,roughness:.57}),
 cloth:standard('#475b50'),leather:standard('#5a4332'),skin:standard('#bfa082',{roughness:.91}),boots:standard('#332f28'),
 wheat:standard('#c9b16e',{side:THREE.DoubleSide}),cropStem:standard('#838153',{side:THREE.DoubleSide}),cropLeaf:standard('#a79f60',{side:THREE.DoubleSide}),straw:standard('#a5915c'),sacking:standard('#b5a482',{map:plaster,bumpMap:plaster,bumpScale:.035}),ironOre:standard('#574d42',{metalness:.18}),
 window:new THREE.MeshStandardMaterial({color:'#252b27',roughness:.8}),
 embers:new THREE.MeshBasicMaterial({color:'#ec8d32',transparent:true,opacity:.85}),
 flagPlayer:standard('#427b9d',{side:THREE.DoubleSide}),flagRed:standard('#813b34',{side:THREE.DoubleSide}),flagGold:standard('#ba9652',{side:THREE.DoubleSide}),flagNeutral:standard('#918b73',{side:THREE.DoubleSide})
 };m.flags={player:m.flagPlayer,red:m.flagRed,gold:m.flagGold,neutral:m.flagNeutral};
 const loader=new THREE.TextureLoader();
 const photo=(name,color=false,repeat=1)=>{const t=loader.load(new URL(`./assets/medieval/${name}_1k.jpg`,import.meta.url).href);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(repeat,repeat);t.anisotropy=8;if(color)t.colorSpace=THREE.SRGBColorSpace;return t;};
 const stonePhoto=photo('castle_wall_color',true),stoneNormal=photo('castle_wall_normal'),stoneRough=photo('castle_wall_roughness');
 for(const mat of [m.stone,m.paleStone,m.darkStone]){mat.map=stonePhoto;mat.bumpMap=null;mat.normalMap=stoneNormal;mat.normalScale=new THREE.Vector2(.52,.52);mat.roughnessMap=stoneRough;mat.roughness=1;}
 m.ground.map=photo('earth_color',true,230);m.ground.bumpMap=null;m.ground.normalMap=photo('earth_normal',false,230);m.ground.normalScale=new THREE.Vector2(.36,.36);m.ground.roughnessMap=photo('earth_roughness',false,230);m.ground.roughness=1;
 const soilColor=photo('soil_color',true),soilNormal=photo('soil_normal'),soilRough=photo('soil_roughness'),rockColor=photo('terrain_rock_color',true),rockNormal=photo('terrain_rock_normal'),rockRough=photo('terrain_rock_roughness');
 m.dirt.map=soilColor;m.dirt.color.set('#c5b595');m.dirt.normalMap=soilNormal;m.dirt.normalScale=new THREE.Vector2(.35,.35);m.dirt.roughnessMap=soilRough;m.dirt.roughness=1;
 m.rock.map=rockColor;m.rock.color.set('#c5c1ad');m.rock.normalMap=rockNormal;m.rock.normalScale=new THREE.Vector2(.45,.45);m.rock.roughnessMap=rockRough;m.rock.roughness=1;
 m.road.map=soilColor.clone();m.road.map.repeat.set(3,28);m.road.color.set('#d3be94');m.road.roughness=1;
 installTerrainMaterial(m.ground,{soilColor,soilNormal,soilRough,rockColor,rockNormal,rockRough});
 const timber=photo('timber_color',true),timberNormal=photo('timber_normal'),timberRough=photo('timber_roughness');for(const mat of [m.wood,m.darkWood]){mat.map=timber;mat.bumpMap=null;mat.normalMap=timberNormal;mat.normalScale=new THREE.Vector2(.42,.42);mat.roughnessMap=timberRough;mat.roughness=1;}
 m.dispose=()=>{const tex=new Set;for(const v of Object.values(m)){if(v?.isMaterial){for(const k of ['map','bumpMap','normalMap','roughnessMap'])if(v[k])tex.add(v[k]);v.dispose();}}for(const t of tex)t.dispose();};return m;
}

// The existing landscape geometry carries its surface masks. Photos keep their
// grain at walking scale while a second grass sample breaks repeated patches.
function installTerrainMaterial(material,maps){
 material.userData.terrainMaterial=true;material.customProgramCacheKey=()=> 'feouda-terrain-pbr-v1';
 material.onBeforeCompile=shader=>{
  for(const[key,value]of Object.entries(maps))shader.uniforms[key]={value};
  shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nattribute vec4 terrainBlend;\nvarying vec4 vTerrainBlend;\nvarying vec2 vTerrainUv;').replace('#include <begin_vertex>','#include <begin_vertex>\nvTerrainBlend = terrainBlend;\nvTerrainUv = vec2(position.x, -position.z);');
  shader.fragmentShader=shader.fragmentShader.replace('#include <common>',`#include <common>
varying vec4 vTerrainBlend;
varying vec2 vTerrainUv;
uniform sampler2D soilColor;
uniform sampler2D soilNormal;
uniform sampler2D soilRough;
uniform sampler2D rockColor;
uniform sampler2D rockNormal;
uniform sampler2D rockRough;`);
  shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`
vec2 grassUv = vTerrainUv * .19;
vec2 soilUv = vTerrainUv * .52;
vec2 rockUv = vTerrainUv * .032;
vec3 grassSample = mix(texture2D(map,grassUv).rgb,texture2D(map,mat2(.8,-.6,.6,.8)*grassUv*.63+vec2(.27,.41)).rgb,.27);
grassSample *= mix(vec3(.80,.88,.70),vec3(1.06,.94,.74),vTerrainBlend.w*.56);
vec3 surfaceSample = mix(grassSample,texture2D(soilColor,soilUv).rgb*vec3(1.12,1.06,.96),vTerrainBlend.x);
surfaceSample = mix(surfaceSample,texture2D(rockColor,rockUv).rgb,vTerrainBlend.y);
surfaceSample *= mix(vec3(1.),vec3(.71,.78,.64),vTerrainBlend.z*.66);
diffuseColor.rgb *= surfaceSample;`);
  // Software rendering still uses the full color attribute as a biome palette.
  // WebGL uses the actual photos, with restrained macro variation above.
  shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>','diffuseColor.rgb *= .96 + vTerrainBlend.w*.08;');
  shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>',`
#ifdef USE_NORMALMAP_TANGENTSPACE
vec3 mapN = mix(texture2D(normalMap,grassUv).xyz,texture2D(soilNormal,soilUv).xyz,vTerrainBlend.x);
mapN = mix(mapN,texture2D(rockNormal,rockUv).xyz,vTerrainBlend.y)*2.0-1.0;
mapN.xy *= normalScale;
normal = normalize(tbn*mapN);
#endif`);
  shader.fragmentShader=shader.fragmentShader.replace('#include <roughnessmap_fragment>',`
float roughnessFactor = mix(texture2D(roughnessMap,grassUv).g,texture2D(soilRough,soilUv).g,vTerrainBlend.x);
roughnessFactor = clamp(mix(roughnessFactor,texture2D(rockRough,rockUv).g,vTerrainBlend.y)*roughness,.72,1.);`);
 };
}
