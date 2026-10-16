import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {siegeSurface} from './game/src/siege-environment.js';
import {ROOM_ARCHITECTURE,architectureProfile,architectureAt,activeArchitecture} from './architecture-plan.js';

// Shared photographed CC0 stone maps. Physical-scale projection avoids stretched
// texture on differently sized wall pieces; every window and moulding stays
// inside the same section's visibility group.
const materials=new Map(),unit=new T.BoxGeometry(1,1,1);
function material(key,color,stone=false){
 if(materials.has(key))return materials.get(key);
 const m=new T.MeshStandardMaterial({color,roughness:.91});
 if(stone){const surface=siegeSurface('castle_wall_slates');if(surface){m.map=surface.map;
  m.onBeforeCompile=s=>{
   s.vertexShader='varying vec3 regionalP; varying vec3 regionalN;\n'+s.vertexShader;
   s.vertexShader=s.vertexShader.replace('#include <worldpos_vertex>','#include <worldpos_vertex>\n regionalP=(modelMatrix*vec4(transformed,1.)).xyz;regionalN=normalize(mat3(modelMatrix)*objectNormal);');
   s.fragmentShader='varying vec3 regionalP; varying vec3 regionalN;\n'+s.fragmentShader;
   s.fragmentShader=s.fragmentShader.replace('#include <map_fragment>',`vec3 w=pow(abs(regionalN),vec3(6.));w/=max(.001,w.x+w.y+w.z);vec3 tex=texture2D(map,regionalP.zy/2.8).rgb*w.x+texture2D(map,regionalP.xz/2.8).rgb*w.y+texture2D(map,regionalP.xy/2.8).rgb*w.z;diffuseColor.rgb*=mix(vec3(.72),tex*1.5,.66);`);
  };m.customProgramCacheKey=()=> 'regional-stone-v1';m.userData.worldBakedBatch=true;
 }}materials.set(key,m);return m;
}
function palette(style){const gothic=style==='gothic',house=style==='greek-house',tomb=style==='greek-tomb';return {
 core:material(gothic?'gothic-stone':house?'house-plaster':tomb?'tomb-stone':'hellenic-stone',gothic?0x9b978b:house?0xd2c3a2:tomb?0x969d8a:0xc3c0a5,!house),
 trim:material(gothic?'sandstone':'limestone',gothic?0xc0b294:0xd7cdb0,true),
 dark:material('embrasure',0x192728),accent:material(gothic?'gothic-iron':'earth-pigment',gothic?0x424b4b:0x665b48),
 wood:material('aged-shutter',0x60503c),clay:material('fired-eaves',0x9a6245),glass:material('weathered-glass',0x4d6565)
 };}
function box(g,x,y,z,w,h,d,m){if(w<=0||h<=0||d<=0)return;const o=new T.Mesh(unit,m);o.position.set(x,y,z);o.scale.set(w,h,d);g.add(o);return o;}
function cylinder(g,x,y,z,r,h,m){const o=new T.Mesh(new T.CylinderGeometry(r,r,h,12),m);o.position.set(x,y,z);g.add(o);return o;}
function merge(g){
 g.updateMatrixWorld(true);const bins=new Map();g.traverse(o=>{if(!o.isMesh)return;const a=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();a.applyMatrix4(o.matrixWorld);if(!bins.has(o.material))bins.set(o.material,[]);bins.get(o.material).push(a);});
 const result=new T.Group();result.name=g.name;result.userData={...g.userData};
 for(const [mat,geos]of bins){const geo=mergeGeometries(geos,false);if(!geo)throw Error('Regional geometry attributes mismatch');const mesh=new T.Mesh(geo,mat);mesh.castShadow=mesh.receiveShadow=true;result.add(mesh);for(const a of geos)a.dispose();}return result;
}
function pointed(r,spring,rise){const p=new T.Shape();p.moveTo(-r,0);p.lineTo(r,0);p.lineTo(r,spring);p.quadraticCurveTo(r*.84,spring+rise*.58,0,spring+rise);p.quadraticCurveTo(-r*.84,spring+rise*.58,-r,spring);p.closePath();return p;}
function arch(g,x,y,z,r,spring,rise,depth,m,ring=.0){
 const s=pointed(r,spring,rise);if(ring){const h=pointed(r-ring,spring-ring,rise-ring);s.holes.push(h);}
 const geo=new T.ExtrudeGeometry(s,{depth,bevelEnabled:false,curveSegments:16});const o=new T.Mesh(geo,m);o.position.set(x,y,z);g.add(o);return o;
}
function gothicWindow(g,x,height,side,p){
 const base=height>8?3.25:2.2,r=.95,spring=Math.min(2.65,height-base-1.7),rise=1.42;
 const f=new T.Group();f.position.set(x,base,side*.425);if(side<0)f.rotation.y=Math.PI;
 arch(f,0,0,.015,r,spring,rise,.035,p.dark);
 arch(f,0,-.16,.07,r+.26,spring+.16,rise+.14,.20,p.trim,.20);
 arch(f,0,.01,.29,r+.04,spring,rise,.08,p.accent,.065);
 for(const sign of [-1,1]){arch(f,sign*.43,.12,.06,.36,spring-.29,.65,.035,p.glass);arch(f,sign*.43,.12,.16,.40,spring-.29,.65,.065,p.trim,.065);}
 // Cusped head, continuous central mullion and deep splayed sill.
 box(f,0,(spring+.45)/2,.25,.105,spring+.45,.17,p.trim);
 const rose=new T.Mesh(new T.TorusGeometry(.23,.052,8,24),p.trim);rose.position.set(0,spring+.71,.27);f.add(rose);
 box(f,0,-.10,.13,2.5,.20,.55,p.trim);box(f,0,spring*.55,.16,1.8,.055,.08,p.accent);g.add(f);
}
function greekWindow(g,x,height,side,p,style){
 const fort=style==='greek-fort',house=style==='greek-house',base=height>8?5.35:2.05,w=fort?.58:house?.94:1.32,h=fort?1.42:1.62;
 const f=new T.Group();f.position.set(x,base,side*.43);if(side<0)f.rotation.y=Math.PI;
 box(f,0,h/2,.02,w,h,.08,p.dark);
 for(const s of [-1,1])box(f,s*(w/2+.10),h/2,.16,.2,h+.35,.35,p.trim);
 box(f,0,-.11,.14,w+.5,.19,.46,p.trim);box(f,0,h+.12,.12,w+.6,.23,.4,p.trim);
 if(house){for(const s of [-1,1]){box(f,s*w*.24,h/2,.18,w*.43,h-.08,.10,p.wood);for(const yy of [.3,1.15])box(f,s*w*.24,yy,.255,w*.43,.09,.055,p.accent);}box(f,0,h+.31,.12,w+.85,.09,.48,p.clay);}
 else for(let dx=-w/2+.16;dx<w/2;dx+=.27)box(f,dx,h/2,.17,.045,h,.07,p.accent);
 g.add(f);
}
export function regionalWall(root,x,z,length,height,alongX,room,floorY=0){
 if(length<.02)return true;const profile=architectureProfile(room),p=palette(profile.style),g=new T.Group();
 g.name=profile.style+' masonry · '+room;box(g,0,height/2,0,length,height,.8,p.core);
 for(const [y,h,d]of [[.13,.26,.96],[height-.30,.18,.90],[height-.10,.16,1.06]])box(g,0,y,0,length,h,d,p.trim);
 if(height>2){
  // Fine, offset ashlar beds give the core real depth at gameplay distance.
  const course=profile.style==='gothic'?.49:.62;
  for(let yy=.42,row=0;yy<Math.min(height-1,2.8);yy+=course,row++)for(let a=-length/2;a<length/2-.05;a+=1.36){const w=Math.min(1.33,length/2-a);for(const side of [-1,1])box(g,a+w/2,yy,side*.412,w,course-.028,.032,p.core);}
  const count=Math.floor(length/4.6);
  for(let i=0;i<count;i++){const a=-length/2+(i+.5)*length/count;for(const side of [-1,1]){
   if(profile.style==='gothic')gothicWindow(g,a,height,side,p);
   else if(profile.style!=='greek-tomb')greekWindow(g,a,height,side,p,profile.style);
  }}
  if(profile.style==='gothic')for(const a of [-length/2+.18,length/2-.18])for(const side of [-1,1]){
   for(const dx of [-.16,0,.16])cylinder(g,a+dx,height/2,side*.52,.085,height-.3,p.trim);
   box(g,a,.3,side*.52,.59,.6,.5,p.trim);box(g,a,height-.65,side*.5,.67,.25,.58,p.trim);
  }
  if(profile.style==='greek-house')for(let a=-length/2+.2;a<length/2;a+=.42)for(const side of [-1,1])box(g,a,height+.04,side*.38,.39,.16,.50,p.clay);
  if(['greek-stoa','greek-andron','greek-temple'].includes(profile.style))for(const side of [-1,1]){
   box(g,0,height-.55,side*.445,length,.22,.07,p.accent);
   for(let a=-length/2+.2;a<length/2;a+=.84)box(g,a,height-.29,side*.49,.12,.18,.12,p.trim);
  }
 }
 g.rotation.y=alongX?0:Math.PI/2;g.position.set(x,floorY,z);g.userData.fullMapWall={x,z,length,height,alongX,floorY};g.userData.architecture={room,style:profile.style};root.add(merge(g));return true;
}
export function regionalColumn(root,x,z,h){
 const room=architectureAt(x,z);if(!room||architectureProfile(room.id).style!=='gothic')return false;
 const p=palette('gothic'),g=new T.Group();g.name='Gothic clustered pier';
 box(g,x,.11,z,.68,.22,.68,p.trim);cylinder(g,x,h/2,z,.21,h-.24,p.core);
 for(const [dx,dz]of [[-.22,0],[.22,0],[0,-.22],[0,.22]])cylinder(g,x+dx,h/2,z+dz,.095,h-.3,p.trim);
 box(g,x,h-.15,z,.65,.17,.65,p.trim);g.userData.fullMapWallDecoration={x,z,floorY:0,type:'column'};root.add(merge(g));return true;
}
export function regionalReturn(root,x,z,length,height,room,floorY){
 regionalWall(root,x,z,length,height,true,room,floorY);
 const part=root.children.at(-1);delete part.userData.fullMapWall;part.userData.keepTransforms=true;
}
export function installRegionalArchitecture(world){
 const pieces=activeArchitecture();world.fullMap.architecture={rooms:ROOM_ARCHITECTURE,pieces:pieces.map(r=>({...r})),styles:[...new Set(pieces.filter(r=>!r.architectureWing&&r.id!=='bridge').map(r=>architectureProfile(r.id).style))]};
 // Roofs are omitted by the game's existing room cutaway convention. A loose
 // arch line would imply a complete vault without supplying its load path.
}
