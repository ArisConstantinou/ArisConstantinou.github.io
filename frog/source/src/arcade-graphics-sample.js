import {leafRoofGeometry,cacheRoofFaces,crownLeaves} from './arcade-reference-scene.js';
import * as THREE from 'three';

// Reversible authored scene sample; original model/collision data remain available.
function texture(size,paint,{colour=true,repeat=1}={}){
 const data=new Uint8Array(size*size*4);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){const v=paint(x/size,y/size,x,y),i=(y*size+x)*4;data[i]=v[0];data[i+1]=v[1];data[i+2]=v[2];data[i+3]=255;}
 const t=new THREE.DataTexture(data,size,size,THREE.RGBAFormat);if(colour)t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.setScalar(repeat);t.generateMipmaps=true;t.minFilter=THREE.LinearMipmapLinearFilter;t.magFilter=THREE.LinearFilter;t.needsUpdate=true;return t;
}
const hash=(x,y)=>{let n=Math.imul(x^0x3a5f19,y^0x74b31d);n=Math.imul(n^(n>>>13),0x5bd1e995);return ((n^(n>>>15))>>>0)/4294967295;};
export function outdoorLight(renderer){
 const w=128,h=64,data=new Float32Array(w*h*4),sun=new THREE.Vector3(-.42,.82,.36).normalize(),sky=new THREE.Color('#b5d9eb'),horizon=new THREE.Color('#e7e4bf'),ground=new THREE.Color('#546d39'),c=new THREE.Color(),d=new THREE.Vector3();
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const a=(x+.5)/w*Math.PI*2,b=(y+.5)/h*Math.PI,up=Math.cos(b);d.set(Math.sin(b)*Math.sin(a),up,Math.sin(b)*Math.cos(a));c.copy(up>0?horizon:ground);if(up>0)c.lerp(sky,Math.pow(up,.6));else c.multiplyScalar(.55+.45*(1+up));const key=Math.exp((d.dot(sun)-1)*100)*1.0;c.r+=key;c.g+=key*.86;c.b+=key*.62;const i=(y*w+x)*4;data[i]=c.r;data[i+1]=c.g;data[i+2]=c.b;data[i+3]=1;}
 const input=new THREE.DataTexture(data,w,h,THREE.RGBAFormat,THREE.FloatType);input.mapping=THREE.EquirectangularReflectionMapping;input.colorSpace=THREE.LinearSRGBColorSpace;input.needsUpdate=true;
 const generator=new THREE.PMREMGenerator(renderer),target=generator.fromEquirectangular(input);generator.dispose();input.dispose();return target;
}
export function installGraphicsSample(game){
 const undo=[],ownedMaterials=[],ownedTextures=[],ownedGeometries=[],materialMap=new Map();
 const set=(o,k,v)=>{const old=o[k];undo.push(()=>o[k]=old);o[k]=v;return v;};
 const light=outdoorLight(game.renderer),keep=t=>(ownedTextures.push(t),t);

 const wood=keep(texture(256,(u,v,x,y)=>{const grain=Math.sin(v*680+Math.sin(u*16)*2.2)+.5*Math.sin(v*1430+u*12),pore=hash(x,y),edge=Math.abs(v*4-Math.round(v*4)),seam=edge<.009?-.38:0,g=228+grain*7+(pore-.5)*12+seam*150;return [g,g*.99,g*.96];}));
 const leaf=keep(texture(256,(u,v,x,y)=>{const mid=Math.abs(u-.5),vein=Math.abs(((v*9+mid*2)%1)-.5),g=244-(mid<.008?24:0)-(vein<.025?18:0)+(hash(x,y)-.5)*5;return [g,g,g*.98];}));
 function standard(source,kind){
  if(materialMap.has(source))return materialMap.get(source);
  const map=kind==='wood'?wood:kind==='roof'?leaf:null;
  const m=(kind==='wood'?new THREE.MeshToonMaterial({color:source.color,map,vertexColors:source.vertexColors,transparent:source.transparent,opacity:source.opacity,depthWrite:source.depthWrite,side:source.side}):new THREE.MeshStandardMaterial({color:source.color,vertexColors:source.vertexColors,map,roughness:kind==='roof'?.62:.84,metalness:0,transparent:source.transparent,opacity:source.opacity,depthWrite:source.depthWrite,side:source.side,flatShading:source.flatShading===true}));
  if(map){m.map=map;m.bumpMap=map;m.bumpScale=kind==='roof'?.008:.008;}
  m.name=(source.name||kind)+'-surface-sample';materialMap.set(source,m);ownedMaterials.push(m);return m;
 }
 const bases=game.basesView,woodSources=new Set([bases.materials.wood,bases.materials.lightWood,bases.materials.darkWood]);
 for(const enclosure of bases.enclosures.values())woodSources.add(enclosure.woodMaterial);
 for(const visual of bases.bases.values()){
  for(const m of visual.stockMaterials.slice(0,2))woodSources.add(m);
  if(visual.ramp){const g=visual.ramp.geometry,p=g.attributes.position,uv=new Float32Array(p.count*2);g.computeBoundingBox();const b=g.boundingBox;for(let i=0;i<p.count;i++){uv[i*2]=(p.getX(i)-b.min.x)/Math.max(.01,b.max.x-b.min.x);uv[i*2+1]=(p.getZ(i)-b.min.z)/Math.max(.01,b.max.z-b.min.z);}const old=g.getAttribute('uv');g.setAttribute('uv',new THREE.BufferAttribute(uv,2));undo.push(()=>{if(old)g.setAttribute('uv',old);else g.deleteAttribute('uv');});set(visual.ramp,'material',standard(visual.ramp.material,'wood'));}

  const roof=visual.roof,b=visual.definition,sideways=b.side==='east'||b.side==='west';
  const geometry=leafRoofGeometry((sideways?b.halfDepth:b.halfWidth)+.32,(sideways?b.halfWidth:b.halfDepth)+.32,{sideways,backing:roof.geometry});ownedGeometries.push(geometry);set(roof,'geometry',geometry);
  const faces=cacheRoofFaces(roof);set(visual,'roofTriangles',faces.triangles);set(visual,'roofBounds',faces.bounds);
  const m=standard(visual.roofMaterial,'roof');m.color.set('#ffffff');m.vertexColors=true;set(roof,'material',m);set(visual,'roofMaterial',m);
 }
 bases.group.traverse(o=>{if(!o.isMesh)return;if(Array.isArray(o.material)){set(o,'material',o.material.map(m=>woodSources.has(m)?standard(m,'wood'):m));}else if(woodSources.has(o.material))set(o,'material',standard(o.material,'wood'));});
 for(const enclosure of bases.enclosures.values())set(enclosure,'woodMaterial',materialMap.get(enclosure.woodMaterial)||enclosure.woodMaterial);
 for(const visual of bases.bases.values())set(visual,'stockMaterials',visual.stockMaterials.map(m=>materialMap.get(m)||m));

 for(const [index,grove] of bases.groves.entries()){
  const crown=grove.group.getObjectByName('grove-leaf-crown'),g=crownLeaves(grove.definition,index,(x,z)=>game.ground(x,z),crown.geometry);ownedGeometries.push(g);set(crown,'geometry',g);
  const mat=new THREE.MeshStandardMaterial({color:'#ffffff',vertexColors:true,roughness:.82,side:THREE.DoubleSide,transparent:true,opacity:grove.material.opacity});ownedMaterials.push(mat);set(crown,'material',mat);set(grove,'material',mat);
 }
 const road=game.battlegroundView.roadMesh;if(road){const m=road.material.clone();ownedMaterials.push(m);m.bumpMap=m.map;m.bumpScale=.012;m.roughness=1;m.needsUpdate=true;set(road,'material',m);}
 const dots=Array.from({length:72},(_,i)=>({u:hash(i+72,13),v:hash(i+35,29),r:.006+hash(i+8,3)*.009}));
 const speckles=keep(texture(256,(u,v,x,y)=>{let shade=245+(hash(x,y)-.5)*9;for(const dot of dots){const dx=Math.min(Math.abs(u-dot.u),1-Math.abs(u-dot.u)),dy=Math.min(Math.abs(v-dot.v),1-Math.abs(v-dot.v)),d=Math.hypot(dx,dy)/dot.r;if(d<1)shade=Math.min(shade,60+160*Math.max(0,(d-.72)/.28));}return [shade,shade,shade];}));
 const configured=new WeakSet(),actorStates=new WeakMap();
 function configureActor(model){if(configured.has(model))return;configured.add(model);for(const name of ['frog-weighted-surface','articulated-eyes']){const mesh=model.group.getObjectByName(name);if(!mesh)continue;const m=mesh.material;actorStates.set(m,{map:m.map,bumpMap:m.bumpMap,envMap:m.envMap,envMapIntensity:m.envMapIntensity,roughness:m.roughness,bumpScale:m.bumpScale,clearcoat:m.clearcoat,clearcoatRoughness:m.clearcoatRoughness});m.envMap=light.texture;m.envMapIntensity=name==='articulated-eyes'?.4:.32;m.roughness=name==='articulated-eyes'?.16:.45;if(name!=='articulated-eyes'){m.map=speckles;m.bumpMap=speckles;m.bumpScale=.0015;m.clearcoat=.35;m.clearcoatRoughness=.28;}m.needsUpdate=true;}}
 for(const model of game.models)configureActor(model);
 return {configureActor,inspect:()=>({mode:'reference-scene-sample',gameplayBoundsPreserved:true,authoredGeometry:['leaf roofs','layered tree foliage','frog face and toe pads'],actorEnvironment:'original outdoor PMREM',materials:ownedMaterials.length,textures:ownedTextures.length+1}),dispose(){for(const model of game.models)model.group.traverse(o=>{const state=actorStates.get(o.material);if(state){Object.assign(o.material,state);o.material.needsUpdate=true;}});for(const f of undo.reverse())f();for(const m of ownedMaterials)m.dispose();for(const t of ownedTextures)t.dispose();for(const g of ownedGeometries)g.dispose();light.dispose();}};
}
