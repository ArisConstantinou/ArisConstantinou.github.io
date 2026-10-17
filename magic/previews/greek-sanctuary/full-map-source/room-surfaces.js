import * as T from 'three';
import {loadTextureAsset} from './game/src/asset-loading.js';
import {usesMobileTextures} from './game/src/asset-profile.js';
import {downsampleNormalPixels} from './room-texture-pixels.js';

// Original, deterministic textures; museum photographs are references only.
// Keep the original six-metre tiling, desktop resolution and floor/collider.
// Mobile uses the already-approved smaller texture profile below.
export const ROOM_SURFACES={
 courtyard:{pattern:'flags',tone:[155,148,129],joints:[83,81,70],roughness:.91,label:'Weathered outdoor limestone flags',seed:11},
 hall:{pattern:'pebbles',tone:[167,156,132],joints:[77,74,65],roughness:.84,label:'Cream and charcoal pebble pavement',seed:23},
 crypt:{pattern:'flags',tone:[99,105,91],joints:[52,57,48],roughness:.92,label:'Dark funerary limestone',weather:'damp',seed:37},
 armoury:{pattern:'coursed',tone:[119,125,123],joints:[61,66,64],roughness:.89,label:'Worn dark slate working-stone courses',seed:41},
 barracks:{pattern:'clay',tone:[158,107,78],joints:[89,78,61],roughness:.93,label:'Worn terracotta sleeping-quarters pavement',seed:53},
 prison:{pattern:'flags',tone:[134,128,111],joints:[84,80,68],roughness:.96,label:'Dusty coarse limestone',weather:'dust',seed:67},
 ritual:{pattern:'pebbles',tone:[145,122,104],joints:[67,63,56],roughness:.87,label:'Red and cream ritual pebble pavement',seed:79},
 library:{pattern:'coursed',tone:[165,152,122],joints:[96,90,72],roughness:.85,label:'Dark slate reading-room courses',seed:83},
 forge:{pattern:'clay',tone:[132,87,61],joints:[59,56,46],roughness:.96,label:'Fired-clay workshop pavement with local soot',weather:'soot',seed:97},
 catacombs:{pattern:'coursed',tone:[106,103,88],joints:[59,59,48],roughness:.97,label:'Moist dark slate burial-passage flags',weather:'damp',seed:101},
 sanctum:{pattern:'marble',tone:[177,175,153],joints:[104,109,96],roughness:.68,label:'Honed pale marble with grey-green veins',seed:113},
 gallery:{pattern:'pebbles',tone:[176,166,143],joints:[77,73,62],roughness:.81,label:'Light and dark geometric pebble mosaic',seed:127},
 watchtower:{pattern:'flags',tone:[123,133,135],joints:[66,75,76],roughness:.93,label:'Exposed blue-grey stone paving',seed:139},
 gatehouse:{pattern:'clay',tone:[146,113,83],joints:[79,73,59],roughness:.94,label:'Ochre bonded-clay guardhouse paving',seed:149}
};
const size=1024,tileMetres=6;
const readySurfaces=new Map();
// Compound rooms call makeRoomSurface for every floor piece. Painting depends
// only on this immutable profile, not the piece's dimensions. Share the source
// pixels/GPU upload while each texture retains its own UV repeat and material.
const paintedSurfaces=new Map();
function paintedSurface(profile){
 if(!paintedSurfaces.has(profile)){
  const painted=paint(profile),resolution=usesMobileTextures()?512:size;
  let canvas=painted.canvas,normals=painted.normals;
  if(resolution<size){
   canvas=document.createElement('canvas');canvas.width=canvas.height=resolution;
   const context=canvas.getContext('2d');context.imageSmoothingEnabled=true;context.imageSmoothingQuality='high';
   context.drawImage(painted.canvas,0,0,resolution,resolution);
   normals=downsampleNormalPixels(normals,size,resolution);
   painted.canvas.width=painted.canvas.height=1;
  }
  const map=new T.CanvasTexture(canvas);
  map.colorSpace=T.SRGBColorSpace;
  const normalMap=new T.DataTexture(normals,resolution,resolution,T.RGBAFormat);
  normalMap.flipY=false;normalMap.magFilter=T.LinearFilter;
  normalMap.minFilter=T.LinearMipmapLinearFilter;normalMap.generateMipmaps=true;
  paintedSurfaces.set(profile,{map,normalMap});
 }
 return paintedSurfaces.get(profile);
}
export async function loadRoomSurfaceAssets(){
 const loader=new T.TextureLoader();
 const rows=await Promise.all(['diff','normal','arm'].map(async name=>{
  const url=new URL('threshold-materials/slate_floor/'+name+'.jpg',document.baseURI).href;
   const t=await loadTextureAsset(loader,url);
   t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=8;if(name==='diff')t.colorSpace=T.SRGBColorSpace;return [name,t];
 }));readySurfaces.set('slate',Object.fromEntries(rows));
}
const rgba=(c,delta=0)=>`rgb(${c.map(v=>Math.max(0,Math.min(255,Math.round(v+delta)))).join(',')})`;
function paint(p){
 const canvas=document.createElement('canvas'),height=document.createElement('canvas');canvas.width=height.width=canvas.height=height.height=size;
 const c=canvas.getContext('2d'),h=height.getContext('2d',{willReadFrequently:true});
 let state=p.seed;const rand=()=>((state=(1664525*state+1013904223)>>>0)/4294967296);
 c.fillStyle=rgba(p.joints);c.fillRect(0,0,size,size);h.fillStyle='#353535';h.fillRect(0,0,size,size);
 function stone(x,y,w,d,tone,irregular=false){
  const jitter=()=>irregular?(rand()-.5)*4:0,points=[[x+3+jitter(),y+3+jitter()],[x+w-3+jitter(),y+3+jitter()],[x+w-3+jitter(),y+d-3+jitter()],[x+3+jitter(),y+d-3+jitter()]];
  for(const ctx of [c,h]){ctx.beginPath();points.forEach(([xx,yy],i)=>i?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy));ctx.closePath();ctx.fillStyle=ctx===c?rgba(tone,rand()*13-6):'#dedede';ctx.fill();ctx.strokeStyle=ctx===c?rgba(tone,-12):'#a8a8a8';ctx.lineWidth=2;ctx.stroke();}
  // Quiet mineral variation and rubbed edges; no luminous modern tile joints.
  if(rand()<.35){c.beginPath();c.moveTo(x+w*.2,y+d*.13);c.bezierCurveTo(x+w*.6,y+d*.4,x+w*.3,y+d*.6,x+w*.8,y+d*.81);c.strokeStyle=rgba(tone,-19);c.globalAlpha=.19;c.lineWidth=.7;c.stroke();c.globalAlpha=1;}
 }
 if(p.pattern==='pebbles'){
  const step=11;
  for(let row=-1;row<95;row++)for(let col=-1;col<95;col++){
   const x=col*step+(row%2)*5.5+(rand()-.5)*2,y=row*step+(rand()-.5)*2;
   const band=p.seed===127?Math.abs(((x+y)/135)%2-1)<.20:p.seed===79?Math.abs((x-y)/160%2)<.15:false;
   const dark=band||rand()<.09,tone=dark?p.joints:p.tone,rx=4.5+rand(),ry=3.7+rand(),angle=rand()*Math.PI;
   for(const ctx of [c,h]){ctx.beginPath();ctx.ellipse(x,y,rx,ry,angle,0,Math.PI*2);ctx.fillStyle=ctx===c?rgba(tone,rand()*18-9):'#dddddd';ctx.fill();}
  }
 }else{
  const rows=p.pattern==='clay'?12:p.pattern==='coursed'?8:6,dy=size/rows;
  for(let row=0;row<rows;row++){
   const cols=p.pattern==='clay'?8:p.pattern==='marble'?4:row%2?5:4,dx=size/cols,offset=row%2?dx/2:0;
   // A half block wraps at the texture edge with the same shape and colour.
   for(let col=-1;col<cols;col++){
    const x=col*dx+offset,variation=Math.round(rand()*14-7),tone=p.tone.map(v=>v+variation);
    stone(x,row*dy,dx,dy,tone,p.pattern==='flags');
    if(x<0)stone(x+size,row*dy,dx,dy,tone,p.pattern==='flags');
   }
  }
  if(p.pattern==='marble')for(let i=0;i<13;i++){
   const y=rand()*size;c.beginPath();c.moveTo(0,y);c.bezierCurveTo(size*.3,y-90,size*.65,y+90,size,y+30);c.strokeStyle='rgba(76,96,89,.17)';c.lineWidth=1+rand()*2;c.stroke();
  }
 }
 // Fine original grain supplements the already licensed photographic stone.
 const pixels=c.getImageData(0,0,size,size),levels=h.getImageData(0,0,size,size).data;
 for(let i=0;i<pixels.data.length;i+=4){const grain=(rand()-.5)*7;for(let j=0;j<3;j++)pixels.data[i+j]+=grain;levels[i]=Math.max(0,Math.min(255,levels[i]+(rand()-.5)*4));}
 c.putImageData(pixels,0,0);
 const normals=new Uint8Array(size*size*4),sample=(x,y)=>levels[(((y+size)%size)*size+(x+size)%size)*4]/255;
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  // Canvas rows run down; tangent-space V runs up after the image upload.
  const dx=(sample(x-1,y)-sample(x+1,y))*1.6,dy=(sample(x,y+1)-sample(x,y-1))*1.6,len=Math.hypot(dx,dy,1),i=((size-1-y)*size+x)*4;
  normals[i]=(dx/len*.5+.5)*255;normals[i+1]=(dy/len*.5+.5)*255;normals[i+2]=(1/len*.5+.5)*255;normals[i+3]=255;
 }
 return {canvas,normals};
}
export function makeRoomSurface(room,photographicStone){
 const p=ROOM_SURFACES[room.id];if(!p||typeof document==='undefined')return null;
 const scanned=p.pattern==='flags'?photographicStone:p.pattern==='coursed'?readySurfaces.get('slate'):null;
 const tile=scanned?3.6:tileMetres;let map,normalMap,arm;
 if(scanned){map=(scanned.diff||scanned.map).clone();normalMap=scanned.normal?.clone()||scanned.normalMap.clone();arm=(scanned.arm||null)?.clone();}
 else{const painted=paintedSurface(p);map=painted.map.clone();normalMap=painted.normalMap.clone();}
 for(const t of [map,normalMap,arm].filter(Boolean)){t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(room.w/tile,room.d/tile);t.anisotropy=8;t.needsUpdate=true;}
 const mat=new T.MeshStandardMaterial({map,normalMap,normalScale:new T.Vector2(scanned?.32:p.pattern==='pebbles'?.2:.45,scanned?.32:p.pattern==='pebbles'?.2:.45),roughnessMap:arm,roughness:p.roughness,color:0xffffff});
 mat.textureDependencies=photographicStone?.map?[photographicStone.map]:[];
 mat.name=room.id+' · '+p.label;mat.userData.roomSurface={id:room.id,pattern:p.pattern,label:p.label,weather:p.weather||'worn',resolution:map.image.width,tileMetres:tile,seed:p.seed,photographic:scanned?(p.pattern==='flags'?'monastery_stone_floor':'slate_floor'):null};
 mat.onBeforeCompile=s=>{
  s.uniforms.roomDimensions={value:new T.Vector2(room.w,room.d)};
  const source=photographicStone?.map;if(source)s.uniforms.roomStoneGrain={value:source};
  s.fragmentShader='uniform vec2 roomDimensions;\n'+(source?'uniform sampler2D roomStoneGrain;\n':'')+s.fragmentShader;
  s.fragmentShader=s.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
   vec2 roomAt=vec2(vMapUv.x*${tile.toFixed(1)},roomDimensions.y-vMapUv.y*${tile.toFixed(1)});
   float edgeDistance=min(min(roomAt.x,roomDimensions.x-roomAt.x),min(roomAt.y,roomDimensions.y-roomAt.y));
   diffuseColor.rgb*=mix(.88,1.,smoothstep(.0,.75,edgeDistance));
   ${scanned?`float luminance=dot(diffuseColor.rgb,vec3(.2126,.7152,.0722));diffuseColor.rgb=mix(diffuseColor.rgb,vec3(luminance),.93)*vec3(${p.tone.map(v=>(v/145*1.65).toFixed(4)).join(',')});`:source?'vec3 grain=texture2D(roomStoneGrain,vMapUv*.73).rgb;diffuseColor.rgb*=.68+.65*dot(grain,vec3(.2126,.7152,.0722));':''}
   ${p.weather==='soot'?`float soot=1.-smoothstep(.8,3.3,distance(roomAt,vec2(2.1,roomDimensions.y*.5-2.)));diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*vec3(.38,.40,.42),soot*.72);`:''}
   ${p.weather==='damp'?`float damp=1.-smoothstep(.15,1.6,edgeDistance);diffuseColor.rgb*=mix(vec3(1.),vec3(.76,.80,.72),damp*.55);`:''}
   ${p.weather==='dust'?`diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.28,.255,.20),.09*(1.-smoothstep(.0,2.,edgeDistance)));`:''}
  `);
 };
 mat.customProgramCacheKey=()=>`room-surface-v2-${room.id}-${!!photographicStone?.map}`;
 return mat;
}
