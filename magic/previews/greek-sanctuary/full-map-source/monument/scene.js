import {indexedClone} from '../indexed-geometry.js';
import {registerShadowPositionMaterial}from'../game/src/shadow-position-contract.js';
import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {siegeSurface} from '../game/src/siege-environment.js';
import {createGreekGate} from '../game/src/greek-environment.js';
import {TEMPLE,MONUMENT_REGIONS,crepidomaPatches,templeEncounter} from './plan.js';

let palette;
function materials(){if(palette)return palette;
 const maps=siegeSurface('monastery_stone_floor');
 const stone=new T.MeshStandardMaterial({color:0xd1c5aa,roughness:.87,map:maps.map});
 stone.onBeforeCompile=s=>{s.vertexShader='varying vec3 templeP; varying vec3 templeN;\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <worldpos_vertex>',`#include <worldpos_vertex>
 vec4 templePosition=vec4(transformed,1.);vec3 templeNormal=objectNormal;
 #ifdef USE_INSTANCING
 templePosition=instanceMatrix*templePosition;templeNormal=mat3(instanceMatrix)*templeNormal;
 #endif
 templeP=(modelMatrix*templePosition).xyz;templeN=normalize(mat3(modelMatrix)*templeNormal);`);s.fragmentShader='varying vec3 templeP;varying vec3 templeN;\n'+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('#include <map_fragment>',`vec3 weights=pow(abs(templeN),vec3(6.));weights/=max(.001,weights.x+weights.y+weights.z);vec3 grain=texture2D(map,templeP.zy/3.6).rgb*weights.x+texture2D(map,templeP.xz/3.6).rgb*weights.y+texture2D(map,templeP.xy/3.6).rgb*weights.z;float value=dot(grain,vec3(.2126,.7152,.0722));diffuseColor.rgb*=.65+.82*value;`);};stone.customProgramCacheKey=()=> 'temple-physical-stone-v2';
 palette={stone,edge:stone.clone(),pavement:stone.clone(),dark:new T.MeshStandardMaterial({color:0x8c8d7c,roughness:.95}),bronze:new T.MeshStandardMaterial({color:0x81704b,roughness:.68,metalness:.6})};palette.edge.color.setHex(0xe2d6bd);palette.edge.onBeforeCompile=stone.onBeforeCompile;palette.edge.customProgramCacheKey=stone.customProgramCacheKey;
 palette.pavement.onBeforeCompile=s=>{stone.onBeforeCompile(s);s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
 if(abs(templeN.y)>.8){vec2 tile=vec2(templeP.x/1.4+mod(floor(templeP.z/1.1),2.)*.5,templeP.z/1.1);vec2 edgeDist=min(fract(tile),1.-fract(tile))*vec2(1.4,1.1);float seam=1.-smoothstep(.008,.022,min(edgeDist.x,edgeDist.y));float patina=fract(sin(dot(floor(tile),vec2(12.9898,78.233)))*43758.5453);diffuseColor.rgb*=mix(.95,1.04,patina)*(1.-seam*.27);}`);};palette.pavement.customProgramCacheKey=()=> 'temple-pavement-v2';for(const m of [stone,palette.edge,palette.pavement])registerShadowPositionMaterial(m);return palette;
}
export function monumentPavement(){return materials().pavement;}
const boxGeometry=new T.BoxGeometry(1,1,1);
function box(g,x,y,z,w,h,d,mat){const o=new T.Mesh(boxGeometry,mat);o.position.set(x,y,z);o.scale.set(w,h,d);g.add(o);return o;}
function baked(g){g.updateMatrixWorld(true);const bins=new Map();g.traverse(o=>{if(!o.isMesh)return;const geo=indexedClone(o.geometry);geo.applyMatrix4(o.matrixWorld);if(!bins.has(o.material))bins.set(o.material,[]);bins.get(o.material).push(geo);});const result=new T.Group();result.name=g.name;result.userData={...g.userData};for(const [m,geos]of bins){const geo=mergeGeometries(geos,false);if(!geo)throw Error('Temple geometry merge failed');const mesh=new T.Mesh(geo,m);mesh.castShadow=mesh.receiveShadow=true;result.add(mesh);geos.forEach(g=>g.dispose());}return result;}
function shaftDrum(radius,y0,h,fullH,broken=false){
 const p=[],uv=[],normals=[],idx=[],n=120,rows=2;
 for(let j=0;j<=rows;j++)for(let i=0;i<=n;i++){const a=i/n*Math.PI*2,v=(y0+j*h/rows)/fullH,r=radius*(1-.22*v)+radius*.045*Math.sin(Math.PI*v)-radius*.035*(1+Math.cos(a*20)),chip=broken&&j===rows?.095*(Math.sin(a*7+.3)+.45*Math.sin(a*13)):0;p.push(r*Math.cos(a),j*h/rows+chip,r*Math.sin(a));uv.push(i/n*radius*2*Math.PI/3.6,(y0+j*h/rows)/3.6);const drA=radius*.7*Math.sin(a*20),drY=radius/fullH*(-.22+.045*Math.PI*Math.cos(Math.PI*v)),normal=new T.Vector3(r*Math.cos(a)+drA*Math.sin(a),-r*drY,r*Math.sin(a)-drA*Math.cos(a)).normalize();normals.push(normal.x,normal.y,normal.z);}
 for(let j=0;j<rows;j++)for(let i=0;i<n;i++){const a=j*(n+1)+i,b=a+n+1;idx.push(a,b,a+1,b,b+1,a+1);}
 // Cap rims are separate vertices: sharing them with the shaft creates a
 // bevel-shaped normal at every drum joint, making the column look stacked.
 for(const [row,reverse]of [[0,true],[rows,false]]){const c=p.length/3,sign=reverse?-1:1;p.push(0,row*h/rows,0);uv.push(.5,.5);normals.push(0,sign,0);const rim=p.length/3;for(let i=0;i<=n;i++){const at=(row*(n+1)+i)*3;p.push(...p.slice(at,at+3));uv.push(.5+p[at]/radius/2,.5+p[at+2]/radius/2);normals.push(0,sign,0);}for(let i=0;i<n;i++){const a=rim+i;idx.push(...(reverse?[c,a+1,a]:[c,a,a+1]));}}
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(p,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setAttribute('normal',new T.Float32BufferAttribute(normals,3));geo.setIndex(idx);return geo;
}
export function installMonument(world,architecture){
 const {stone,edge,pavement,dark,bronze}=materials(),root=new T.Group();root.name='Parthenon-inspired monumental ruin · connected Sanctum';world.root.add(root);
 const info={...TEMPLE,columns:[],steps:[],wallSections:[],entablatures:[],adaptation:'Ruin inspired by the historical8x17plan; central routes widened for HEARTH. Not an exact archaeological reconstruction.',statueBay:{xMin:18.5,xMax:31.5,zMin:-110,zMax:-96,floorY:1.2}};world.fullMap.monument=info;Object.assign(world.fullMap.architecture.rooms,MONUMENT_REGIONS);
 function solid(x,y,z,w,h,d,tag='temple-masonry',extra={}){const b={x,y,z,w,h,d,tag,...extra};world.colliders.push(b);return b;}
 function section(g,x,z,length,height,alongX,floorY=1.2){g.userData.fullMapWall={x,z,length,height,alongX,floorY};root.add(baked(g));}
 // Six genuine risers, shared support identity: no hidden ramp or level jump.
 const tiers=Array.from({length:6},(_,i)=>{const g=new T.Group();g.name='Temple crepidoma tier '+(i+1);return g;});
 for(const f of crepidomaPatches()){box(tiers[f.tier],f.x,f.y,f.z,f.w,f.h,f.d,pavement);world.floors.push(f);info.steps.push({...f});}tiers.forEach(g=>root.add(baked(g)));
 function column(x,z,{height=10.2,radius=.94,status='standing',role='peristyle'}={}){
  const g=new T.Group();g.name='Doric20-flute '+status+' shaft · '+x.toFixed(2)+','+z.toFixed(2);const shaftH=status==='standing'?height-.63:height,fullShaft=status==='standing'?shaftH:9.57;
  for(let y=0;y<shaftH-.01;y+=.87){const h=Math.min(.858,shaftH-y),o=new T.Mesh(shaftDrum(radius,y,h,fullShaft,status==='broken'&&y+.87>=shaftH),stone);o.position.set(x,1.2+y,z);g.add(o);}
  solid(x,1.2+shaftH/2,z,radius*2,shaftH,radius*2,'temple-shaft',{cylinderRadius:radius});
  if(status==='standing'){
   const cap=new T.Mesh(new T.LatheGeometry([[.70,0],[.71,.06],[.74,.10],[.81,.22],[.91,.34],[1.00,.43]].map(([r,y])=>new T.Vector2(r*radius/.94,y)),48),edge);cap.position.set(x,1.2+shaftH,z);g.add(cap);box(g,x,1.2+height-.10,z,radius*2.2,.2,radius*2.2,edge);solid(x,1.2+height-.12,z,radius*2.2,.24,radius*2.2,'temple-abacus');
  }
  section(g,x,z,radius*2.2,height,true);info.columns.push({x,z,height,radius,status,role});return {x,z,height,status};
 }
 const xs=[-13.65,-10.15,-6.65,-2.9,2.9,6.65,10.15,13.65].map(x=>25+x),z0=-135.2,z1=-69.3,rows=[];
 // Historical positions remain legible through broken drums and missing bays.
 for(const [face,z]of [['north',z0],['south',z1]]){const row=[];for(let i=0;i<8;i++){const broken=face==='south'&&[2,6].includes(i)||face==='north'&&i===5,missing=face==='south'&&i===6;if(missing){info.columns.push({x:xs[i],z,status:'missing',role:'peristyle'});row.push(null);continue;}row.push(column(xs[i],z,{height:broken?3.8:10.2,status:broken?'broken':'standing'}));}rows.push({points:row,alongX:true});}
 for(const [side,x]of [['west',xs[0]],['east',xs[7]]]){const row=[{x,z:z0,height:10.2,status:'standing'}];for(let i=1;i<16;i++){const z=z0+(z1-z0)*i/16,missing=side==='west'?[5,6,8,9].includes(i):[6,7,8].includes(i),broken=[4,10,13].includes(i);if(missing){info.columns.push({x,z,status:'missing',role:'peristyle'});row.push(null);}else row.push(column(x,z,{height:broken?2.8+(i%3)*.8:10.2,status:broken?'broken':'standing'}));}row.push({x,z:z1,height:10.2,status:'standing'});rows.push({points:row,alongX:false});}
 function entablature(a,b,alongX){const length=Math.hypot(a.x-b.x,a.z-b.z),g=new T.Group(),x=(a.x+b.x)/2,z=(a.z+b.z)/2;g.name='Broken-line Doric architrave, triglyphs and cornice';
  box(g,0,11.68,0,length+.12,.56,1.65,stone);box(g,0,12.02,0,length+.2,.12,1.82,edge);box(g,0,12.43,0,length+.12,.70,1.58,stone);box(g,0,12.87,0,length+.42,.18,2.0,edge);box(g,0,13.04,0,length+.56,.16,2.16,edge);
  const n=Math.max(2,Math.round(length/1.35));for(let i=0;i<n;i++){const xx=-length/2+(i+.5)*length/n;for(const side of [-1,1]){box(g,xx,12.43,side*.815,.45,.67,.09,dark);for(const dx of [-.16,0,.16])box(g,xx+dx,12.43,side*.88,.09,.66,.13,edge);box(g,xx,12.01,side*.9,.6,.08,.18,edge);for(let k=0;k<6;k++){const peg=new T.Mesh(new T.CylinderGeometry(.03,.045,.08,6),edge);peg.position.set(xx-.23+k*.092,11.93,side*.93);g.add(peg);}}}
  g.position.set(x,0,z);g.rotation.y=alongX?0:Math.PI/2;section(g,x,z,length+.55,1.85,alongX,11.4);solid(x,12.24,z,alongX?length+.55:2.16,1.85,alongX?2.16:length+.55,'temple-entablature');info.entablatures.push({x,z,length,alongX});
 }
 for(const row of rows)for(let i=1;i<row.points.length;i++){const a=row.points[i-1],b=row.points[i];if(a?.status==='standing'&&b?.status==='standing')entablature(a,b,row.alongX);}
 // Six-column porticoes and the inner U-shaped naos arrangement.
 for(const z of [-130.3,-78.5])for(const [i,dx]of [-9.4,-6.1,-2.8,2.8,6.1,9.4].entries()){if(z===-78.5&&i===1)continue;column(25+dx,z,{height:8.8,radius:.63,status:'standing',role:'portico'});}
 for(const x of [17.1,32.9])for(let i=0;i<9;i++){if(i===3||i===4)continue;column(x,-84-i*3.35,{height:i===6?2.4:5.8,radius:.49,status:i===6?'broken':'standing',role:'naos'});}
 for(const x of [20,25,30])column(x,-114,{height:5.8,radius:.49,role:'naos-back'});
 function cellaWall(x,z,length,alongX,height){const g=new T.Group();g.name='Cella ashlar remnant';for(let y=0,row=0;y<height;y+=.46,row++){let at=-length/2;while(at<length/2-.01){const w=Math.min(row%2&&at===-length/2?.7:1.4,length/2-at);box(g,alongX?x+at+w/2:x,1.2+y+.218,alongX?z:z+at+w/2,alongX?w-.018:.8,.436,alongX?.8:w-.018,row%4?stone:edge);at+=w;}}section(g,x,z,length,height,alongX);solid(x,1.2+height/2,z,alongX?length:.8,height,alongX?.8:length,'temple-cella');info.wallSections.push({x,z,length,alongX,height});}
 for(const x of [14.35,35.65])for(const [z,len,h]of [[-125.3,9.2,6.0],[-116.6,7.7,4.6],[-88,14.2,5.5]])cellaWall(x,z,len,false,h);
 for(const z of [-129.9,-80.5,-118.0])for(const sign of [-1,1])cellaWall(25+sign*6.7,z,7.8,true,z===-118?4.6:5.7);
 // Fallen architectural members stay away from the entry and central combat lane.
 const debris=new T.Group();debris.name='Displaced column drums and masonry';
 for(const [i,[x,z]]of [[8,-111],[41.4,-106],[8.3,-94],[39.9,-90],[15.6,-100],[34.3,-96]].entries()){
  const radius=.73,h=.82,geo=shaftDrum(radius,0,h,9.57,true);geo.translate(0,-h/2,0);const o=new T.Mesh(geo,stone);o.rotation.z=Math.PI/2;o.rotation.y=i*.31;o.position.set(x,1.2+radius,z);debris.add(o);o.updateMatrixWorld(true);const bounds=new T.Box3().setFromObject(o),size=bounds.getSize(new T.Vector3()),at=bounds.getCenter(new T.Vector3());solid(at.x,at.y,at.z,size.x,size.y,size.z,'temple-fallen-drum');for(let k=0;k<3;k++)box(debris,x+(k-1)*.45,1.32,z+1.1+(k%2)*.35,.55,.24,.42,edge);
 }
 root.add(baked(debris));
 // A tangible votive altar and room equipment, not an empty colonnade.
 const altar=new T.Group();altar.name='Temple votive altar';for(const [y,w,h,d]of [[.13,3.4,.26,2.5],[.63,2.8,.74,1.9],[1.08,3.6,.18,2.7]])box(altar,25,1.2+y,-108.5,w,h,d,edge);root.add(baked(altar));solid(25,1.8,-108.5,3.6,1.2,2.7,'temple-altar');
 for(const [x,z]of [[16.2,-84],[33.8,-124]])world.props.push({kind:'urn',x,z,floorY:1.2,w:.85,h:1.3,d:.85,mass:5,health:70});
 const portal=new T.Group();portal.name='Sanctum to temple · full portal';portal.userData.fullMapWall={x:25,z:-55.8,length:7,height:8.2,alongX:true,floorY:0};world.root.add(portal);
 box(portal,25,6.5,-55.8,7,3.4,.8,stone);solid(25,6.5,-55.8,7,3.4,.8,'temple-portal-header');
 const gate=createGreekGate(world.root,world.colliders,{id:'parthenon-entry',kind:'pressure',x:25,z:-55.8,floorY:0,width:5.6,height:4.8,wallWidth:7,plates:[{x:28,z:-50.1},{x:29.6,z:-50.1}],homes:[{x:20.8,z:-49.2},{x:23,z:-48.5}]},world.occluders);portal.add(gate.frame,gate.doors);architecture.gates.push(gate);
 world.doorways.push({x:25,z:-55.8,rooms:['sanctum','parthenon']});
 world.fullMap.elevatedLoot.push({id:'parthenon-rear-offering',loot:{x:25,y:1.2,z:-125.8},item:{kind:'ring',level:3,roll:2,count:1}});
}
export function populateMonument(world,entities){const {boss,guards}=templeEncounter(entities,world.zones),placements=[];
 if(boss?.bossType)boss.room={name:'sanctum',xMin:15.9,xMax:34.1,zMin:-115.6,zMax:-81.6,floorY:1.2};
 for(const [e,x,z]of [[boss,25,-101.5],[guards[0],21,-87.5],[guards[1],29,-94]]){if(!e)continue;e.body.position.set(x,1.2+e.cy+.08,z);e.body.velocity.set(0,0,0);e.body.aabbNeedsUpdate=true;e.spawn={x,y:1.2,z};e.lastSafe={...e.spawn};e.path=[];e.pathTick=0;placements.push({kind:e.kind,bossType:e.bossType,x,z,floorY:1.2});}world.fullMap.monument.encounter=placements;
}
