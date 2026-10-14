import * as T from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {siegeSurface,siegeProp,siegeTorchFlames} from '../../../_source/src/siege-environment.js';
import {createGreekGate} from '../../../_source/src/greek-environment.js';

// Metres, Y up. Editable, deterministic construction; no generated artwork.
// The reference buildings inform distinct construction systems, not a literal
// archaeological reconstruction. All circulation is sized for HEARTH.
export async function loadThresholdMaterials(){const loader=new T.TextureLoader(),surfaces={};await Promise.all(['white_plaster_02','marble_rock_03','slate_floor'].map(async id=>{const [map,normalMap,arm]=await Promise.all(['diff','normal','arm'].map(k=>loader.loadAsync(new URL('threshold-materials/'+id+'/'+k+'.jpg',document.baseURI).href)));for(const t of [map,normalMap,arm]){t.wrapS=t.wrapT=T.RepeatWrapping;t.anisotropy=8;}map.colorSpace=T.SRGBColorSpace;surfaces[id]={map,normalMap,arm};}));return surfaces;}
export function buildThreshold(surfaces){
 const root=new T.Group(),roof=new T.Group(),details=new T.Group();root.name='Threshold · Malbork to the ruined sanctuary';root.add(roof,details);
 const cutaway={front:new T.Group(),rear:new T.Group(),left:new T.Group(),right:new T.Group()};for(const [name,g]of Object.entries(cutaway)){g.name='Castle cutaway '+name;root.add(g);}let buildGroup=details;
 const colliders=[],floors=[],torches=[],stairs=[],destinations=[];
 const materials={},batches=new Map();let seed=613;
 const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const tex=(surface,key)=>{const t=(surfaces[surface]||siegeSurface(surface))[key].clone();t.repeat.set(1,1);return t;};
 function mat(name,color,surface=null){const m=new T.MeshStandardMaterial({name,color,roughness:.89,metalness:0});if(surface){m.map=tex(surface,'map');m.normalMap=tex(surface,'normalMap');m.normalScale.set(.48,.48);m.roughnessMap=tex(surface,'arm');m.aoMap=tex(surface,'arm');m.aoMapIntensity=.5;}materials[name]=m;return m;}
 const limestone=mat('Carved pale limestone',0xf5ecd5,'white_plaster_02'),stone=mat('Weathered ashlar',0xb7b6af,'white_plaster_02'),marble=mat('Warm aged marble',0xfff3d9,'white_plaster_02');
 marble.normalMap=tex('marble_rock_03','normalMap');marble.normalScale.set(.1,.1);limestone.normalScale.set(.22,.22);
 const plaster=mat('Ochre lime plaster',0xf5d49d,'white_plaster_02'),vaultMat=mat('Vault limewash',0xebe7dc,'white_plaster_02'),floorMat=mat('Worn slate paving',0xc4c9c9,'slate_floor'),courtMat=mat('Old limestone flags',0xd7d0b8,'monastery_stone_floor');
 floorMat.roughnessMap=null;floorMat.roughness=.87;
 const dark=mat('Deep joint mortar',0x3b403b),bronze=mat('Aged bronze',0x62533b),clay=mat('Terracotta',0x9b5b3d),earth=mat('Exposed earth',0x776e50),wood=mat('Oak',0x554332);bronze.metalness=.65;bronze.roughness=.46;
 const tintVariants=new Map();function tint(m,i){const key=m.uuid+':'+i;if(!tintVariants.has(key)){const c=m.clone();c.color.multiplyScalar(.87+i*.047);tintVariants.set(key,c);}return tintVariants.get(key);}
 function uvWorld(g){const p=g.attributes.position,n=g.attributes.normal,uv=[];for(let i=0;i<p.count;i++){const x=Math.abs(n.getX(i)),y=Math.abs(n.getY(i)),z=Math.abs(n.getZ(i));uv.push((y>x&&y>z?p.getX(i):x>z?p.getZ(i):p.getX(i))/3,(y>x&&y>z?p.getZ(i):p.getY(i))/3);}g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setAttribute('uv1',g.attributes.uv.clone());return g;}
 function mesh(g,m,x=0,y=0,z=0,rot=0,group=buildGroup){const o=new T.Mesh(g,m);o.position.set(x,y,z);o.rotation.y=rot;o.castShadow=o.receiveShadow=true;group.add(o);return o;}
 function box(x,y,z,w,h,d,m=stone,bevel=.035,group=buildGroup,angle=0){const g=bevel?new RoundedBoxGeometry(w,h,d,1,Math.min(bevel,h*.18,w*.18,d*.18)):new T.BoxGeometry(w,h,d);return mesh(uvWorld(g),m,x,y,z,angle,group);}
 function solid(x,y,z,w,h,d,tag='wall'){colliders.push({x,y,z,w,h,d,tag});}
 function floor(x,top,z,w,d,m=floorMat){box(x,top-.2,z,w,.4,d,m,.035);floors.push({x,y:top-.2,z,w,h:.4,d,tag:'floor'});}
 function wall(x,z,w,h,d,m=stone,base=0){box(x,base+h/2,z,w,h,d,m,.03);solid(x,base+h/2,z,w,h,d);}
 function courses(x,z,w,h,d,m=stone,base=0){box(x,base+h/2,z,w-.12,h-.03,d-.12,dark,.01);solid(x,base+h/2,z,w,h,d);for(let row=0;row<h/.6;row++){const yy=base+Math.min(h,(row+1)*.6),lo=base+row*.6;let a=-w/2;while(a<w/2-.02){const size=Math.min(w/2-a,1.25+rnd()*.8);box(x+a+size/2,(lo+yy)/2,z,size-.028,yy-lo-.025,d+.03,tint(m,Math.floor(rnd()*6)),.045);a+=size;}}}
 function rib(points,r=.11,m=limestone,group=roof){const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p)));return mesh(new T.TubeGeometry(curve,40,r,8,false),m,0,0,0,0,group);}
 const archY=(x,half,spring,rise)=>spring+rise*Math.pow(Math.max(0,1-Math.abs(x)/half),.62);
 function pointedFrame(x,z,width,spring,rise,m=limestone,group=buildGroup){for(const side of [-1,1])for(let j=0;j<3;j++){box(x+side*(width/2+j*.15),spring/2,z+j*.08,.14,spring,.38,m,.03,group);}
  for(let j=0;j<3;j++){const points=[];for(let k=0;k<=48;k++){const xx=-width/2-j*.15+(width+j*.3)*k/48;points.push([x+xx,archY(xx,width/2+j*.15,spring,rise+j*.11),z+j*.08]);}rib(points,.10-j*.015,m,group);}}
 function windowAt(side,z){const g=new T.Group();g.position.set(side*10.72,0,z);g.rotation.y=-side*Math.PI/2;buildGroup.add(g);pointedFrame(0,0,3.5,6.4,2.3,limestone,g);
  // Solid jamb returns fill the bay up to the shaped opening. The earlier
  // rectangle-only prototype left sky strips beside the pointed glass.
  for(const sign of [-1,1])box(sign*3.45,5.55,-.32,3.1,6.5,1.1,stone,.035,g);
  const sp=new T.Shape();sp.moveTo(-1.9,11.6);sp.lineTo(1.9,11.6);sp.lineTo(1.9,6.4);for(let i=0;i<=40;i++){const xx=1.9-i/40*3.8;sp.lineTo(xx,archY(xx,1.9,6.4,2.5));}sp.closePath();mesh(uvWorld(new T.ExtrudeGeometry(sp,{depth:1.1,bevelEnabled:false})),stone,0,0,-.85,0,g);
  const shape=new T.Shape();shape.moveTo(-1.67,2.4);shape.lineTo(1.67,2.4);shape.lineTo(1.67,6.4);for(let i=0;i<=32;i++){const x=1.67-i/32*3.34;shape.lineTo(x,archY(x,1.67,6.4,2.18));}shape.closePath();
  mesh(new T.ShapeGeometry(shape),new T.MeshStandardMaterial({color:0x678b91,emissive:0x365c6b,emissiveIntensity:.48,roughness:.25,metalness:.16,side:T.DoubleSide}),0,0,-.23,0,g);
  for(const x of [-.58,.58])box(x,4.5,.08,.1,4.2,.15,limestone,.02,g);for(const y of [3.4,5.2,6.3])box(0,y,.08,3.4,.10,.18,limestone,.02,g);
  for(const x of [-.57,.57]){const o=mesh(new T.TorusGeometry(.54,.06,8,40),limestone,x,7.0,.08,0,g);}box(0,2.32,.24,4,.2,1,limestone,.06,g);
  // Leaded diamond lights and small quatrefoils are geometry, not a painted
  // flat-blue window. Their pale glass belongs to the restored gallery reference.
  const lead=bronze.clone();lead.color.setHex(0x394343);for(const y of [2.9,3.8,4.7,5.6])for(const x of [-1.12,0,1.12]){const p=[[x,y-.43,.12],[x+.50,y,.12],[x,y+.43,.12],[x-.50,y,.12],[x,y-.43,.12]];rib(p,.022,lead,g);}
  for(const a of [0,Math.PI/2,Math.PI,Math.PI*1.5])mesh(new T.TorusGeometry(.22,.04,6,24),limestone,Math.cos(a)*.2,7.8+Math.sin(a)*.2,.13,0,g);
 }
 function column(x,z,base,height=10.2,broken=false){
  const r=.99,segments=100,rows=Math.max(5,Math.ceil(height/.28)),p=[],idx=[],uv=[];
  for(let j=0;j<=rows;j++){const v=j/rows;for(let i=0;i<=segments;i++){const a=i/segments*Math.PI*2,flute=.105*(.5+.5*Math.cos(a*20)),radius=r*(1-.18*v)+.035*Math.sin(v*Math.PI)-flute;const jag=broken&&j===rows?.32*Math.sin(a*3)+.18*Math.cos(a*7):0;p.push(Math.cos(a)*radius,base+v*height+jag,Math.sin(a)*radius);uv.push(i/segments*2,v*height/3);}}
  for(let j=0;j<rows;j++)for(let i=0;i<segments;i++){const a=j*(segments+1)+i,b=a+segments+1;idx.push(a,b,a+1,b,b+1,a+1);}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();mesh(g,tint(marble,3),x,0,z);
  // Fine drum seams and an actually broken top, rather than a shortened capital.
  for(let y=1.05;y<height-.15;y+=1.12){const rr=r*(1-.18*y/height)+.008;const ring=mesh(new T.TorusGeometry(rr,.013,4,100),stone,x,base+y,z);ring.rotation.x=Math.PI/2;}
   if(!broken){mesh(new T.CylinderGeometry(1.22,.82,.34,48),marble,x,base+height+.14,z);box(x,base+height+.40,z,2.5,.22,2.5,marble,.045);}else mesh(new T.CylinderGeometry(r*.77,r*.77,.035,50),stone,x,base+height-.25,z);
  solid(x,base+height/2,z,2,height,2,'column');
 }
 function steps({x,z,width,count,rise=.175,tread=.48,base=0,direction=-1,label}){for(let i=0;i<count;i++){const top=base+(i+1)*rise,zz=z+direction*(i+.5)*tread;box(x,top-.12,zz,width,.24,tread+.025,limestone,.02);floors.push({x,y:top-.12,z:zz,w:width,h:.24,d:tread+.02,tag:'stair'});}
  stairs.push({x,z,width,count,rise,tread,base,direction,label});
  // Solid cheek walls have a stepped profile and do not cross the treads.
  for(const side of [-1,1])for(let i=0;i<count;i++){const h=base+(i+1)*rise+.85;box(x+side*(width/2+.20),h/2,z+direction*(i+.5)*tread,.38,h,tread+.02,stone,.025);solid(x+side*(width/2+.2),h/2,z+direction*(i+.5)*tread,.38,h,tread+.02,'stair-cheek');}
 }
 // THE CASTLE. Three groin-vaulted bays, clustered piers and deep traceried windows.
 floor(0,0,15,22,30);buildGroup=cutaway.rear;courses(0,30,22,11,1.15);for(const side of [-1,1]){buildGroup=side<0?cutaway.left:cutaway.right;
  wall(side*11,15,1.1,2.3,30);wall(side*11,15,1.1,2.2,30,stone,8.8);
  for(const z of [0,10,20,30])courses(side*11,z,1.4,11,2.3);
  for(const z of [5,15,25])windowAt(side,z);solid(side*11,6.7,15,1.1,8.8,30,'window-wall');
  for(const z of [0,10,20,30]){for(const offset of [-.26,0,.26]){mesh(new T.CylinderGeometry(.19,.25,7,16),limestone,side*10.20,3.5,z+offset);box(side*10.2,.18,z+offset,.7,.36,.7,limestone);box(side*10.2,7,z+offset,.67,.32,.67,limestone);}box(side*10,1,z,1.25,.22,1.8,limestone);}
 }
 buildGroup=details;
 // A single row of thin structural piers separates two clear 9 m aisles.
 for(const z of [10,20]){for(let a=0;a<8;a++){const th=a/8*Math.PI*2;mesh(new T.CylinderGeometry(.17,.23,7,16),limestone,Math.cos(th)*.36,3.5,z+Math.sin(th)*.36);}box(0,.24,z,1.6,.48,1.6,limestone);box(0,7,z,1.45,.35,1.45,limestone);solid(0,3.7,z,1.3,7.4,1.3,'clustered-pier');}
 for(const xc of [-5.5,5.5])for(const zc of [5,15,25]){
  const p=[],uv=[],ix=[],n=22;for(let j=0;j<=n;j++)for(let i=0;i<=n;i++){const a=i/n*2-1,b=j/n*2-1,y=7+4.5*Math.sqrt(Math.max(0,1-Math.min(a*a,b*b)));p.push(xc+a*5.5,y,zc+b*5);uv.push(i/n*4,j/n*4);}for(let j=0;j<n;j++)for(let i=0;i<n;i++){const a=j*(n+1)+i,b=a+n+1;ix.push(a,a+1,b,b,a+1,b+1);}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(ix);g.computeVertexNormals();const vm=vaultMat.clone();vm.side=T.DoubleSide;mesh(g,vm,0,0,0,0,roof);
  for(const sign of [-1,1]){const pts=[];for(let i=0;i<=32;i++){const t=-1+i/16;pts.push([xc+t*5.5,7+4.5*Math.sqrt(Math.max(0,1-t*t))-.04,zc+sign*t*5]);}rib(pts,.13);}
  for(const zz of [zc-5,zc+5]){const pts=[];for(let i=0;i<=32;i++){const t=-1+i/16;pts.push([xc+t*5.5,7+4.5*Math.sqrt(Math.max(0,1-t*t)),zz]);}rib(pts,.15);}mesh(new T.SphereGeometry(.30,12,8),bronze,xc,11.42,zc,0,roof);
 }
 // Deep, continuous wall returns physically meet the double door.
 buildGroup=cutaway.front;
 for(const side of [-1,1])courses(side*7.35,0,7.3,11.6,1.6);wall(0,0,7.4,4,1.6,stone,7.6);pointedFrame(0,1.0,7.6,7.6,3.2);
 for(const side of [-1,1]){box(side*4.4,3.8,1,1.15,7.6,1.2,limestone);for(let j=0;j<4;j++)mesh(new T.CylinderGeometry(.11,.13,6.8,12),limestone,side*(4.01+j*.22),3.8,1.65);box(side*4.4,7.5,1,1.5,.35,1.55,limestone);}
 // Tracery in the tympanum (solid backed, no false passage around the leaves).
 for(const x of [-2.2,0,2.2])pointedFrame(x,1.04,1.7,7.8,1.6,limestone);box(0,.08,.25,7.4,.16,2.2,limestone);
 // Accessible side gallery; stairs are individual physical treads.
 buildGroup=details;
 steps({x:-7,z:3.5,width:5.5,count:24,direction:1,label:'Castle gallery'});floor(-7,4.2,22,6.4,13.9,floorMat);for(const z of [29]){wall(-7,z,6.4,1.15,.35,limestone,4.2);}wall(-3.8,22,.35,1.15,13.8,limestone,4.2);destinations.push({id:'gallery',point:[-7,4.2,21]});
 for(const z of [18,24,28]){box(-8.8,4.7,z,2.1,.15,.75,wood);for(const xx of [-9.6,-8])box(xx,4.45,z,.14,.5,.6,wood);}
 for(const z of [17,23,28]){mesh(new T.CylinderGeometry(.28,.36,3.95,16),limestone,-4.35,1.98,z);box(-4.35,3.95,z,1,.3,1,limestone);solid(-4.35,2,z,.72,4,.72,'gallery-support');box(-7,3.83,z,6.3,.38,.5,limestone);}
 for(const [a,b]of [[17,23],[23,28]]){const pts=[];for(let i=0;i<=30;i++){const t=i/30;pts.push([-4.35,2.65+1.35*Math.sin(t*Math.PI),a+(b-a)*t]);}rib(pts,.16,limestone,details);}
 // Greek courtyard and mineral terraces replace every surface beyond the door.
 floor(4,0,-21,66,42,courtMat);floor(0,0,-79,48,78,courtMat);wall(-29,-21,1.1,1.3,42,stone);wall(37,-21,1.1,1.3,42,stone);
 for(const x of [-24,24])wall(x,-80,.65,1.6,76,stone);wall(0,-118,48,1.6,.65,stone);wall(-26.5,-42,5,1.6,.65,stone);wall(30.5,-42,13,1.6,.65,stone);wall(-20,0,18,1.6,.65,stone);wall(24,0,26,1.6,.65,stone);
 // Cracked, individually laid border stones (a clear central circulation route).
 for(const x of [-12.2,12.2])for(let z=-4;z>-39;z-=1.25)box(x,.04,z,.48,.08,1.13,tint(marble,Math.floor(rnd()*6)),.035);
 for(const x of [-22,-17,18,24])for(let z=-4;z>-38;z-=3.6){if(x>17&&z<-8&&z>-27)continue;box(x,.018,z,1.9,.03,1.5,tint(courtMat,Math.floor(rnd()*6)),.01,details,rnd()*.15);}
 // Vernacular building: thick limewash, irregular stone reveals, barrel vault,
 // parapet, exterior stair. Its upper terrace is genuinely walkable.
 const hx=23,hz=-18;floor(hx,0,hz,12,15,courtMat);wall(hx+6,hz,1,5.1,15,plaster);wall(hx-6,hz,1,5.1,15,plaster);wall(hx,hz-7.5,12,5.1,1,plaster);
 for(const side of [-1,1])wall(hx+side*4.4,hz+7.5,3.2,5.1,1,plaster);wall(hx,hz+7.5,5.6,.4,1,plaster,4.7);
 for(const side of [-1,1])for(let y=.22;y<4.7;y+=.44)box(hx+side*2.95,y,hz+7.56,.46,.42,1.08,tint(limestone,Math.floor(rnd()*6)),.07);
 const curvePts=[];for(let i=0;i<=32;i++){const a=i/32*Math.PI;curvePts.push(new T.Vector2(Math.cos(a)*6.35,Math.sin(a)*2.8+5.1));}const shape=new T.Shape();shape.moveTo(-6.35,5.1);for(const v of curvePts.slice().reverse())shape.lineTo(v.x,v.y);shape.lineTo(6.35,4.9);shape.lineTo(-6.35,4.9);shape.closePath();const barrel=new T.ExtrudeGeometry(shape,{depth:15.8,bevelEnabled:false,curveSegments:32});mesh(uvWorld(barrel),plaster,hx,0,hz-7.9,0,roof);
 // The terrace is beside the vaulted house, not a floor through its roof.
 courses(23,-31.5,12,4.0,11.5,stone);floor(23,4.2,-31.5,12,11.5,courtMat);wall(17,-31.5,.45,1.15,11.5,limestone,4.2);wall(29,-33.7,.45,1.15,7,limestone,4.2);wall(23,-37.2,12,1.15,.45,limestone,4.2);
 steps({x:32.5,z:-14,width:5.4,count:24,direction:-1,label:'Greek terrace'});floor(30,4.2,-27,10,3.7,courtMat);destinations.push({id:'terrace',point:[23,4.2,-31]});
 for(const x of [20,26]){box(x,4.55,-32,2.4,.7,1.6,plaster,.17);box(x,4.96,-32,2.6,.12,1.8,limestone);}
 // Ruined Doric sanctuary: 8 by 17 positions, full monumental length, no roof.
 // Deliberately nonuniform survival and fractured entablature, not a pristine kit.
 for(let k=0;k<3;k++)floor(0,(k+1)*.4,-78.3,35-k*1.1,77-k*1.1,marble);
 steps({x:0,z:-36.2,width:25,count:6,rise:.2,tread:.65,direction:-1,label:'Temple crepis'});
 // Central intercolumniation is widened 1.4 m for the 3.14 m HEARTH arms.
 const xs=[-14.7,-10.5,-6.3,-2.8,2.8,6.3,10.5,14.7],zs=Array.from({length:17},(_,i)=>-44.7-i*4.2);
 const heights=new Map();for(let i=0;i<8;i++)for(let j=0;j<17;j++){if(i!==0&&i!==7&&j!==0&&j!==16)continue;const missing=(i===0&&[3,4,8,9,12].includes(j))||(j===0&&i===2)||(j===16&&[3,4].includes(i));if(missing)continue;const broken=(i===0&&[2,7,11,14].includes(j))||(j===0&&i===3)||(j===16&&i===5);const h=broken?2.3+((i*17+j*7)%6):10.2;column(xs[i],zs[j],1.2,h,broken);heights.set(i+','+j,h);}
 function ent(x,z,w,d){box(x,12.2,z,w,.68,d,marble,.05);box(x,12.63,z,w+.1,.22,d+.18,marble);for(let xx=-w/2+.3;xx<w/2;xx+=1.02){box(x+xx,13.07,z,.32,.66,d+.12,limestone,.025);for(let line=-1;line<=1;line++)box(x+xx+line*.075,13.07,z+d/2+.07,.025,.58,.035,stone,.006);}box(x,13.5,z,w+.32,.2,d+.4,marble);}
 for(const j of [0,16])for(let i=0;i<7;i++)if(heights.get(i+','+j)>10&&heights.get((i+1)+','+j)>10)ent((xs[i]+xs[i+1])/2,zs[j],xs[i+1]-xs[i]+.03,2.2);
 for(const i of [0,7])for(let j=0;j<16;j++)if(heights.get(i+','+j)>10&&heights.get(i+','+(j+1))>10){const g=new T.Group();details.add(g);const prev=details.children.length;box(xs[i],12.2,(zs[j]+zs[j+1])/2,2.2,.68,4.23,marble);box(xs[i],13.38,(zs[j]+zs[j+1])/2,2.55,.24,4.23,marble);for(let z=zs[j+1]+.3;z<zs[j];z+=1)box(xs[i],12.88,z,2.25,.62,.3,limestone);}
 // A remaining fragment of the east pediment, with a jagged fracture edge.
 const ped=new T.Shape();ped.moveTo(4,0);ped.lineTo(14.9,0);ped.lineTo(6.5,2.2);ped.lineTo(6.15,1.65);ped.lineTo(5.6,1.8);ped.lineTo(5.5,1.1);ped.lineTo(4.8,1.2);ped.lineTo(4.2,.7);ped.closePath();mesh(uvWorld(new T.ExtrudeGeometry(ped,{depth:1.4,bevelEnabled:true,bevelSize:.035,bevelThickness:.035,bevelSegments:1})),marble,0,13.6,-45.35);
 // Cella walls survive as staggered masonry; entrances and central aisle remain open.
 for(const side of [-1,1])for(let j=0;j<9;j++){const h=2.2+((j*7+(side+1)*3)%5)*1.02;courses(side*9,-58-j*4.5,1.0,h,4.5,marble,1.2);}wall(0,-102,16,2.8,.9,marble,1.2);destinations.push({id:'temple',point:[0,1.2,-90]});
 // Fallen drums and displaced blocks are at the sides, with matching collisions.
 for(let i=0;i<28;i++){const side=i%2?1:-1,x=side*(18.6+rnd()*3.4),z=-46-rnd()*65;if(i%3===0){const o=mesh(new T.CylinderGeometry(.85,.93,1.1,40),tint(marble,i%6),x,.92,z);o.rotation.z=Math.PI/2;o.rotation.y=rnd()*3;solid(x,.9,z,2,1.8,2,'fallen-drum');}else{const h=.35+rnd()*.5;box(x,h/2,z,1.2+rnd(),h,1.2,tint(marble,i%6),.09,details,rnd()*.8);solid(x,h/2,z,2.2,h,1.5,'rubble');}}
 // Sealed side chamber with a single pressure tray and broad HEARTH entry.
 floor(-21,0,-22,11,12,courtMat);wall(-26.5,-22,.8,5.5,12,plaster);wall(-21,-28,11,5.5,.8,plaster);wall(-21,-16,11,5.5,.8,plaster);for(const z of [-26.1,-17.9])wall(-15.5,z,.9,5.5,3.8,plaster);wall(-15.5,-22,.9,.9,4.6,plaster,4.6);destinations.push({id:'secret',point:[-21,0,-22]});
 const gates=[
  createGreekGate(root,colliders,{id:'threshold',kind:'pressure',customFrame:true,x:0,z:0,width:7.4,height:7.6,wallWidth:7.4,plates:[{x:3.6,z:5.8},{x:5.2,z:5.8}],homes:[{x:3.4,z:9},{x:5.6,z:9}]},[]),
  createGreekGate(root,colliders,{id:'house-fire',kind:'fire',customFrame:true,x:23,z:-10.5,width:5.6,height:4.7,wallWidth:5.6,plates:[],homes:[]},[]),
  createGreekGate(root,colliders,{id:'secret',kind:'pressure',customFrame:true,secret:true,x:-15.5,z:-22,rotation:Math.PI/2,width:4.6,height:4.6,wallWidth:4.6,plates:[{x:-12,z:-18}],homes:[{x:-9,z:-18}]},[])
 ];
 // Reuse licensed, textured props with physical footprints; no crates on paths.
 function prop(kind,x,y,z,w,h,d,angle=0){const p=siegeProp(kind,{w,h,d,mass:8,health:100,label:kind});p.mesh.position.set(x,y+p.halfExtents.y,z);p.mesh.rotation.y=angle;details.add(p.mesh);solid(x,y+p.halfExtents.y,z,p.halfExtents.x*2,p.halfExtents.y*2,p.halfExtents.z*2,'furniture');}
 for(const [x,z]of [[8.8,25],[8.8,23.2],[8.8,21.6]])prop('barrel',x,0,z,1.3,1.5,1.3,.2);
 prop('crate',8.8,0,28,1.8,1.4,1.5);prop('shield',10.1,.1,18,1.2,1.7,.8,-Math.PI/2);
 for(const [x,z]of [[18.5,-13],[27,-23],[-24,-26],[21,-34]])prop('urn',x,z<-30?4.2:0,z,1,1.5,1,.4);
 prop('crate',26,0,-22,1.7,1.4,1.6);prop('barrel',26,0,-24,1.1,1.6,1.1);
 // Uneven limewashed edges, exposed footings and old timber details distinguish
 // the house from a modern box. Small openings are deep, not painted decals.
 for(const side of [-1,1])for(let j=0;j<9;j++)box(hx+side*6.02,.25+rnd()*.13,hz-6+j*1.4,.18,.5,1.22,tint(stone,j%6),.05);
 for(const x of [19,27]){box(x,3,-9.94,1.55,1.75,.12,dark,.03);box(x,3,-9.85,1.3,1.48,.08,wood,.02);for(const xx of [-.48,0,.48])box(x+xx,3,-9.78,.1,1.5,.12,wood);box(x,2.05,-9.75,1.8,.2,.6,limestone,.06);}
 // Worn voussoirs over the house entry and a thick continuous lime surround.
 for(let i=0;i<13;i++){const a=i/13*Math.PI,b=(i+1)/13*Math.PI,sh=new T.Shape();sh.moveTo(Math.cos(a)*3.18,3.3+Math.sin(a)*1.9);for(let k=0;k<=3;k++){const t=a+(b-a)*k/3;sh.lineTo(Math.cos(t)*3.18,3.3+Math.sin(t)*1.9);}for(let k=3;k>=0;k--){const t=a+(b-a)*k/3;sh.lineTo(Math.cos(t)*2.80,3.3+Math.sin(t)*1.4);}sh.closePath();mesh(uvWorld(new T.ExtrudeGeometry(sh,{depth:.62,bevelEnabled:true,bevelSize:.035,bevelThickness:.025,bevelSegments:1})),tint(limestone,i%6),23,0,-10.2);}
 // Sparse bronze roof-edge clamps, surviving red pigment and capitals avoid
 // presenting the ruin as uniformly new, bare grey cylinders.
 for(let i=0;i<6;i++){box(14.7,13.53,-49-i*8.4,2.55,.04,.16,clay,.01);box(14.7,12.68,-49-i*8.4,2.22,.06,.55,clay,.01);}
 // Rock escarpment beneath the playable site, with distant Greek hills. This
 // does not replace the measured walkable floors or hide inaccessible edges.
 const landscape=new T.PlaneGeometry(580,580,90,90);landscape.rotateX(-Math.PI/2);landscape.translate(0,-.5,-62);const lp=landscape.attributes.position;
 for(let i=0;i<lp.count;i++){const x=lp.getX(i),z=lp.getZ(i),edge=Math.max(Math.abs(x)-42,Math.abs(z+50)-86,0),h=Math.sin(x*.022+z*.016)*9+Math.cos(z*.031-x*.019)*7+Math.sin(x*.071)*2;lp.setY(i,-.55+Math.min(1,edge/38)*(h-5));}landscape.computeVertexNormals();mesh(uvWorld(landscape),mat('Dry rocky landscape',0xb8ae8c,'marble_rock_03'));
 for(let i=0;i<20;i++){const x=(i%2?-1:1)*(44+rnd()*34),z=-30-rnd()*100,g=new T.DodecahedronGeometry(1,1);g.scale(2+rnd()*4,1+rnd()*3,2+rnd()*4);mesh(uvWorld(g),stone,x,-.2,z,rnd()*6);}
 for(const [x,z,y]of [[6.6,20,0],[8.7,12,0],[-10,-4,0],[-7,-30,0],[7,-30,0],[23,-34,4.2]]){
  box(x,y+.75,z,.52,1.5,.52,stone);mesh(new T.CylinderGeometry(.48,.23,.28,16),bronze,x,y+1.6,z);const t={id:'brazier-'+torches.length,position:new T.Vector3(x,y+1.8,z),lit:true,infinite:true};torches.push(t);solid(x,y+.85,z,.8,1.7,.8,'brazier');
 }
 const fire=siegeTorchFlames(root,torches);
 // Merge static stone by material and local region, preserving separately
 // inspectable ceilings and spatial culling. Imported animated assets untouched.
 function batch(group){group.updateMatrixWorld(true);const bins=new Map(),old=[];group.traverse(o=>{if(!o.isMesh||o.isSkinnedMesh||o.isInstancedMesh||Array.isArray(o.material)||o.userData.asset||o.geometry.attributes.skinIndex)return;let p=o.parent;while(p&&p!==group){if(p.userData.asset)return;p=p.parent;}const region=Math.floor(o.position.z/22),key=o.material.uuid+':'+region;if(!bins.has(key))bins.set(key,{m:o.material,gs:[]});const g=o.geometry.clone().applyMatrix4(o.matrixWorld);if(g.index){const n=g.toNonIndexed();g.dispose();bins.get(key).gs.push(n);}else bins.get(key).gs.push(g);old.push(o);});for(const o of old)o.removeFromParent();for(const b of bins.values()){const attrs=new Set(b.gs.flatMap(g=>Object.keys(g.attributes)));for(const g of b.gs)for(const a of attrs)if(!b.gs.every(g=>g.attributes[a]))g.deleteAttribute(a);const geometry=mergeGeometries(b.gs,false);b.gs.forEach(g=>g.dispose());if(geometry){const o=new T.Mesh(geometry,b.m);o.castShadow=o.receiveShadow=true;group.add(o);}}}
 batch(details);batch(roof);for(const g of Object.values(cutaway))batch(g);
 const zones=[{name:'entrance',label:'Αίθουσα των θόλων',xMin:-11,xMax:11,zMin:15,zMax:30},{name:'hall',label:'Η πύλη',xMin:-11,xMax:11,zMin:1,zMax:14},{name:'court',label:'Ελληνική αυλή',xMin:-29,xMax:37,zMin:-40,zMax:-1},{name:'temple',label:'Το ερειπωμένο ιερό',xMin:-24,xMax:24,zMin:-118,zMax:-40}];
 return {root,roof,cutaway,colliders,floors,stairs,destinations,gates,torches,zones,spawn:{x:5,z:21},materials,update:time=>fire.update(time)};
}
