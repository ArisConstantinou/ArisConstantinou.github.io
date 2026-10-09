import * as T from 'three';
import {GLTFLoader} from './vendor/loaders/GLTFLoader.js';
import {ROUTE,clamp,mix,rayBox} from './physics.js?v=0.6.0';
const A=new URL('./assets/',import.meta.url),up=new T.Vector3(0,1,0);
const hash=(x,z)=>{const v=Math.sin(x*127.1+z*311.7)*43758.5453123;return v-Math.floor(v);};
function noise(x,z){const ix=Math.floor(x),iz=Math.floor(z);let u=x-ix,v=z-iz;u=u*u*(3-2*u);v=v*v*(3-2*v);return mix(mix(hash(ix,iz),hash(ix+1,iz),u),mix(hash(ix,iz+1),hash(ix+1,iz+1),u),v);}
function fbm(x,z){let n=0,a=.54;for(let i=0;i<5;i++){n+=noise(x,z)*a;x=x*2.03+4;z=z*2.03+11;a*=.5;}return n;}
export class MountainWorld{
 constructor(scene){this.scene=scene;this.minX=-1400;this.maxX=1400;this.minZ=-1800;this.maxZ=1350;this.cell=10;this.nx=281;this.nz=316;this.heights=new Float32Array(this.nx*this.nz);this.boxes=[];this.buckets=new Map;this.chests=[];this.beacons=[];
 for(let z=0;z<this.nz;z++)for(let x=0;x<this.nx;x++)this.heights[z*this.nx+x]=this.rawHeight(this.minX+x*10,this.minZ+z*10);
 }
 rawHeight(x,z){
 const elevation=210+(.5-.5*Math.tanh((z+300)/1100))*120;
 const ridge=1-Math.abs(noise(x*.0025+11,z*.0025-4)*2-1);
 let h=70+fbm(x*.0016+30,z*.0016+24)*elevation+Math.pow(ridge,2.4)*190;
 h+=Math.pow(Math.abs(noise(x*.007,z*.007)*2-1),1.3)*35;
 for(const peak of [[-850,400,430,300],[730,850,450,350],[-620,-450,590,285],[660,-720,620,340],[-600,-1400,630,300],[950,-1500,740,350]])h+=peak[2]*Math.exp(-((x-peak[0])**2+(z-peak[1])**2)/(peak[3]**2));
 for(const p of ROUTE){const d=Math.hypot(x-p.x,z-p.z);const t=1-clamp((d-p.r)/165,0,1);const smooth=t*t*(3-2*t);h=mix(h,p.y,smooth);}
 return h;
 }
 height(x,z){const fx=clamp((x-this.minX)/10,0,this.nx-1.001),fz=clamp((z-this.minZ)/10,0,this.nz-1.001),i=Math.floor(fx),j=Math.floor(fz),u=fx-i,v=fz-j,k=j*this.nx+i,h0=this.heights[k],hx=this.heights[k+1],hz=this.heights[k+this.nx],hd=this.heights[k+this.nx+1];return u+v<=1?h0+(hx-h0)*u+(hz-h0)*v:hd+(hz-hd)*(1-u)+(hx-hd)*(1-v);}
 nearby(x,z,r=5){const result=new Set;for(let a=Math.floor((x-r)/64);a<=Math.floor((x+r)/64);a++)for(let b=Math.floor((z-r)/64);b<=Math.floor((z+r)/64);b++)for(const item of this.buckets.get(a+','+b)||[])result.add(item);return result;}
 collider(x,y,z,w,h,d,type='solid'){
 const b={min:{x:x-w/2,y,z:z-d/2},max:{x:x+w/2,y:y+h,z:z+d/2},type};this.boxes.push(b);
 for(let a=Math.floor(b.min.x/64);a<=Math.floor(b.max.x/64);a++)for(let c=Math.floor(b.min.z/64);c<=Math.floor(b.max.z/64);c++){const key=a+','+c;if(!this.buckets.has(key))this.buckets.set(key,[]);this.buckets.get(key).push(b);}return b;
 }
 blocked(x,y,z,r=.42,h=1.78){for(const b of this.nearby(x,z,r)){if(y+.05>=b.max.y||y+h<=b.min.y+.015)continue;const nx=clamp(x,b.min.x,b.max.x),nz=clamp(z,b.min.z,b.max.z);if((x-nx)**2+(z-nz)**2<r*r)return b;}return null;}
 support(x,y,z){let h=this.height(x,z);for(const b of this.nearby(x,z,.01))if(x>=b.min.x&&x<=b.max.x&&z>=b.min.z&&z<=b.max.z&&b.max.y<=y+.45)h=Math.max(h,b.max.y);return h;}
 ray(o,d,max=150){let nearest=max+1,type=null,box=null;
 const end={x:o.x+d.x*max,z:o.z+d.z*max},r=Math.hypot(end.x-o.x,end.z-o.z)*.5+1;
 for(const b of this.nearby((o.x+end.x)/2,(o.z+end.z)/2,r)){const t=rayBox(o,d,b,Math.min(max,nearest));if(t!==null&&t<nearest){nearest=t;type=b.type;box=b;}}
 let prev=0;for(let t=0;t<=Math.min(max,nearest)+.8;t+=.8){const tt=Math.min(t,Math.min(max,nearest)),x=o.x+d.x*tt,z=o.z+d.z*tt;if(o.y+d.y*tt<=this.height(x,z)){
  let lo=prev,hi=tt;for(let k=0;k<8;k++){const m=(lo+hi)/2;if(o.y+d.y*m<=this.height(o.x+d.x*m,o.z+d.z*m))hi=m;else lo=m;}if(hi<nearest){nearest=hi;type='terrain';box=null;}break;}prev=tt;}
 return nearest<=max?{t:nearest,type,box,p:new T.Vector3(o.x+d.x*nearest,o.y+d.y*nearest,o.z+d.z*nearest)}:null;
 }
 wind(x,y,z,time){const gust=Math.sin(time*.6+z*.006),band=Math.exp(-(((z+420)/150)**2));return {x:gust*(1.1+band*3.7),y:Math.sin(time*.4+x*.01)*.5-band*.35,z:Math.cos(time*.3+x*.004)*.65};}
 async build(progress=()=>{}){
  const loader=new T.TextureLoader,tex=async n=>{const t=await loader.loadAsync(new URL(n,A).href);t.wrapS=t.wrapT=T.RepeatWrapping;t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;return t;};
  const [ground,rock,wood,groundNormal,rockNormal]=await Promise.all([tex('ground.jpg'),tex('rock.jpg'),tex('wood.jpg'),tex('ground-normal.jpg'),tex('rock-normal.jpg')]);groundNormal.colorSpace=rockNormal.colorSpace=T.NoColorSpace;progress('Διαμόρφωση βουνών…');
  const pos=[],uv=[],indices=[];for(let j=0;j<this.nz;j++)for(let i=0;i<this.nx;i++){pos.push(this.minX+i*10,this.heights[j*this.nx+i],this.minZ+j*10);uv.push(i/2,j/2);if(i<this.nx-1&&j<this.nz-1){const a=j*this.nx+i;indices.push(a,a+this.nx,a+1,a+1,a+this.nx,a+this.nx+1);}}
  const geo=new T.BufferGeometry;geo.setAttribute('position',new T.Float32BufferAttribute(pos,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(indices);geo.computeVertexNormals();
  const material=new T.MeshStandardMaterial({color:0xffffff,roughness:.95,map:ground,normalMap:groundNormal,normalScale:new T.Vector2(.60,.60)});
  material.onBeforeCompile=s=>{s.uniforms.rockMap={value:rock};s.vertexShader='varying vec3 landPosition;varying vec3 landNormal;\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nlandPosition=position;landNormal=normal;');s.fragmentShader='varying vec3 landPosition;varying vec3 landNormal;uniform sampler2D rockMap;\n'+s.fragmentShader;
   s.fragmentShader=s.fragmentShader.replace('#include <map_fragment>',`vec3 n=normalize(landNormal);float cliff=1.0-smoothstep(.52,.87,n.y);float macro=.86+.10*sin(landPosition.x*.008+sin(landPosition.z*.011))+.06*cos(landPosition.z*.019);vec3 grass=texture2D(map,landPosition.xz*.055).rgb*vec3(.61,.93,.53)*macro;vec3 cliffX=texture2D(rockMap,landPosition.zy*.055).rgb;vec3 cliffZ=texture2D(rockMap,landPosition.xy*.055).rgb;vec3 stone=mix(cliffX,cliffZ,abs(n.z)/(abs(n.x)+abs(n.z)+.001));float snow=smoothstep(550.0,700.0,landPosition.y)*smoothstep(.5,.85,n.y);diffuseColor.rgb*=mix(mix(grass,stone*1.04,cliff),vec3(.89,.94,.98),snow);`);
  };
  this.terrain=new T.Mesh(geo,material);this.terrain.receiveShadow=true;this.scene.add(this.terrain);
  const lake=new T.Mesh(new T.PlaneGeometry(7000,7000),new T.MeshStandardMaterial({color:0x427e95,roughness:.24,metalness:.3}));lake.rotation.x=-Math.PI/2;lake.position.y=48;this.scene.add(lake);
  const rockMat=new T.MeshStandardMaterial({map:rock,normalMap:rockNormal,normalScale:new T.Vector2(.85,.85),color:0xa9aaa4,roughness:.93});const rockGeo=new T.IcosahedronGeometry(1,2);const rocks=new T.InstancedMesh(rockGeo,rockMat,260),dummy=new T.Object3D;
  let nr=0;for(let i=0;i<1100&&nr<260;i++){const x=mix(this.minX+40,this.maxX-40,hash(i,72)),z=mix(this.minZ+40,this.maxZ-40,hash(i,16));if(ROUTE.some(p=>Math.hypot(x-p.x,z-p.z)<p.r+8))continue;const y=this.height(x,z),s=1.4+hash(i,40)*6;dummy.position.set(x,y+s*.3,z);dummy.scale.set(s,s*.65,s*.85);dummy.rotation.set(hash(i,14)*.4,hash(i,2)*6,0);dummy.updateMatrix();rocks.setMatrixAt(nr++,dummy.matrix);this.collider(x,y,z,s*1.8,s*.90,s*1.6,'rock');}rocks.count=nr;rocks.castShadow=true;rocks.receiveShadow=true;this.scene.add(rocks);
  this.woodMaterial=new T.MeshStandardMaterial({map:wood,color:0xb6a285,roughness:.82});this.stoneMaterial=rockMat;
  for(let i=0;i<ROUTE.length;i++)this.outpost(ROUTE[i],i);
  progress('Φόρτωση δάσους…');const fir=await new GLTFLoader().loadAsync(new URL('fir.glb',A).href);fir.scene.updateMatrixWorld(true);const b=new T.Box3().setFromObject(fir.scene),s=20/(b.max.y-b.min.y);let placements=[];
  for(let i=0;i<10000&&placements.length<2200;i++){const x=mix(-1200,1200,hash(i,331)),z=mix(-1600,1200,hash(i,49)),y=this.height(x,z),slope=Math.hypot(this.height(x+5,z)-this.height(x-5,z),this.height(x,z+5)-this.height(x,z-5))/10;
   if(y>565||slope>1.2||ROUTE.some(p=>Math.hypot(x-p.x,z-p.z)<p.r+15))continue;placements.push({x,y,z,s:s*(.65+hash(i,220)*.8),angle:hash(i,901)*6});}
  // Split the forest into spatial batches: an enormous single instance bound
  // made every tree render even when behind the camera or several valleys away.
  const cells=new Map;for(const p of placements){const key=Math.floor(p.x/320)+','+Math.floor(p.z/320);if(!cells.has(key))cells.set(key,[]);cells.get(key).push(p);}
  this.treeChunks=[];
  fir.scene.traverse(o=>{if(!o.isMesh)return;const mat=o.material.clone();mat.alphaTest=.28;mat.alphaToCoverage=true;mat.transparent=false;mat.side=T.DoubleSide;mat.roughness=.95;
   for(const items of cells.values()){const inst=new T.InstancedMesh(o.geometry,mat,items.length);let x=0,z=0;for(let i=0;i<items.length;i++){const p=items[i];x+=p.x;z+=p.z;dummy.position.set(p.x,p.y-b.min.y*p.s,p.z);dummy.rotation.set(0,p.angle,0);dummy.scale.setScalar(p.s);dummy.updateMatrix();inst.setMatrixAt(i,dummy.matrix.clone().multiply(o.matrixWorld));}inst.computeBoundingSphere();inst.castShadow=true;inst.receiveShadow=true;this.scene.add(inst);this.treeChunks.push({mesh:inst,x:x/items.length,z:z/items.length});}
  });
  for(const p of placements)this.collider(p.x,p.y,p.z,.9,13,.9,'tree');
  // Route markings are ground meshes, not floating invisible collision planes.
  this.route=ROUTE;progress('Ο κόσμος είναι έτοιμος.');
 }
 box(x,y,z,w,h,d,mat,solid=true){const mesh=new T.Mesh(new T.BoxGeometry(w,h,d),mat);mesh.position.set(x,y+h/2,z);mesh.castShadow=mesh.receiveShadow=true;this.scene.add(mesh);if(solid)this.collider(x,y,z,w,h,d);return mesh;}
 outpost(p,index){
  const gold=new T.MeshStandardMaterial({color:0xe4cc8c,metalness:.65,roughness:.35});const ring=new T.Mesh(new T.RingGeometry(index===4?12:10,index===4?12.45:10.35,96),new T.MeshBasicMaterial({color:index===4?0xf9d38a:0xa1e9dd,side:T.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.set(p.x,p.y+.12,p.z);this.scene.add(ring);
  const beacon={x:p.x,y:p.y,z:p.z,index,mesh:[]};for(const dx of[-11,11]){this.box(p.x+dx,p.y,p.z,1.1,6,1.1,this.stoneMaterial);this.box(p.x+dx,p.y+6,p.z,1.7,.45,1.7,gold);}
  const crystal=new T.Mesh(new T.OctahedronGeometry(.8,1),new T.MeshStandardMaterial({color:0xacf8e4,emissive:0x429889,emissiveIntensity:.5,metalness:.3,roughness:.2}));crystal.position.set(p.x,p.y+3,p.z);this.scene.add(crystal);beacon.crystal=crystal;this.beacons.push(beacon);
  for(let i=0;i<3;i++){const x=p.x-23+i*23,z=p.z+22,y=this.height(x,z);const base=this.box(x,y,z,1.9,1.12,1.15,this.woodMaterial);const lid=this.box(x,y+1.12,z,2.0,.15,1.22,gold,false);this.chests.push({x,y,z,site:index,index:i,opened:false,base,lid});}
  if(index>0&&index<4){for(const s of[-1,1]){this.box(p.x+s*28,p.y,p.z-17,9,2.7,1.7,this.stoneMaterial);this.box(p.x+s*32,p.y,p.z-24,1.7,4.5,15,this.stoneMaterial);}
   // Open shelter with solid pillars and roof: no impossible walk-through house.
   for(const dx of[-5,5])for(const dz of[-4,4])this.box(p.x+dx,p.y,p.z-29+dz,.6,4.2,.6,this.woodMaterial);
   this.box(p.x,p.y+4.2,p.z-29,12,.55,10,this.woodMaterial);
  }
 }
 update(time,observer=null,range=1400){if(observer)for(const c of this.treeChunks||[])c.mesh.visible=Math.hypot(c.x-observer.x,c.z-observer.z)<range+230;for(const b of this.beacons){b.crystal.rotation.y=time*.6;b.crystal.position.y=ROUTE[b.index].y+3+Math.sin(time*2)*.14;}for(const c of this.chests)if(c.opened)c.lid.rotation.x=-.8;}
}
