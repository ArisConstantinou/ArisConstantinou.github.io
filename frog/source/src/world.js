import * as THREE from 'three';
import { Water } from 'three/addons/objects/Water.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { EXTRA_HUT_FOOTPRINT } from './placement-rules.js';
import { WORLD_SCALE, WORLD_RADIUS, WORLD_BOUNDARY, WORLD_REVISION, SHELTER_SCALE, SHELTER_LAYOUT_SCALE, SHELTER_RADIUS, CASTLE_GROUND_RADIUS, ISLAND_TERRACE_RADIUS, CASTLE_BANK_BLEND } from './world-config.js';
import { FORT_RADIUS, GATE_WIDTH, WALL_HEIGHT, WALL_THICKNESS } from './fortification.js';
export { SHELTER_SCALE, SHELTER_RADIUS } from './world-config.js';

// Everything here is authored geometry. The water is a planar reflection with a
// moving normal field; leaves, cliffs and vegetation deliberately avoid flat
// discs, unmodified spheres, and stock low-poly terrain.
const TAU = Math.PI * 2;
const clamp = THREE.MathUtils.clamp;
const smooth = (a,b,t) => { t=clamp((t-a)/(b-a),0,1); return t*t*(3-2*t); };
function rng(seed) { return () => { seed|=0; seed=(seed+0x6D2B79F5)|0; let t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
const noise = (x,z) => Math.sin(x*.213+Math.sin(z*.137)*1.9)*.48 + Math.sin(z*.329-x*.079)*.27 + Math.cos(x*.741+z*.533)*.13;
const color = x => new THREE.Color(x);
const object = new THREE.Object3D();
const up = new THREE.Vector3(0,1,0);

function canvasTexture(size, paint, repeats=1) {
  const canvas=document.createElement('canvas'); canvas.width=canvas.height=size;
  paint(canvas.getContext('2d'),size);
  const texture=new THREE.CanvasTexture(canvas); texture.colorSpace=THREE.SRGBColorSpace;
  texture.wrapS=texture.wrapT=THREE.RepeatWrapping; texture.repeat.set(repeats,repeats);
  texture.anisotropy=4; return texture;
}
function stoneTexture(seed, moss=false) {
  const random=rng(seed);
  return canvasTexture(256,(ctx,s)=>{
    ctx.fillStyle=moss?'#6c7155':'#8b8978';ctx.fillRect(0,0,s,s);
    for(let i=0;i<15000;i++) { const x=random()*s,y=random()*s,v=45+random()*110;
      ctx.fillStyle=moss?`rgba(${v*.8},${v},${v*.61},${.12+random()*.28})`:`rgba(${v*1.06},${v},${v*.85},${.15+random()*.3})`;
      ctx.fillRect(x,y,.5+random()*3,.5+random()*3);
    }
    ctx.lineWidth=.7;
    for(let j=0;j<26;j++) { ctx.strokeStyle=`rgba(31,36,28,${.06+random()*.15})`;ctx.beginPath(); let y=random()*s;ctx.moveTo(0,y);
      for(let x=0;x<s;x+=10){y+=(random()-.5)*9;ctx.lineTo(x,y);}ctx.stroke(); }
  },1);
}
function leafTexture(seed) {
  const random=rng(seed);
  return canvasTexture(512,(ctx,s)=>{
    const grad=ctx.createRadialGradient(s*.5,s*.5,4,s*.5,s*.5,s*.54);
    grad.addColorStop(0,'#588a39');grad.addColorStop(.6,'#6ca04a');grad.addColorStop(1,'#345d27');ctx.fillStyle=grad;ctx.fillRect(0,0,s,s);
    for(let i=0;i<9000;i++){ctx.fillStyle=random()>.5?'rgba(185,214,109,.08)':'rgba(18,58,20,.06)';ctx.fillRect(random()*s,random()*s,random()*4+1,random()*4+1);}
    for(let a=.18;a<TAU-.18;a+=.31){
      const x=s*.5+Math.cos(a)*s*.49,y=s*.5+Math.sin(a)*s*.49;
      ctx.strokeStyle='rgba(191,204,117,.42)';ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(s*.5,s*.5);ctx.quadraticCurveTo(s*.5+Math.cos(a+.08)*s*.28,s*.5+Math.sin(a+.08)*s*.28,x,y);ctx.stroke();
      for(let q=.2;q<.9;q+=.15){for(const sign of [-1,1]){ctx.strokeStyle='rgba(186,211,124,.19)';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(s*.5+Math.cos(a)*s*q*.5,s*.5+Math.sin(a)*s*q*.5);ctx.lineTo(s*.5+Math.cos(a+sign*.12)*s*(q+.1)*.5,s*.5+Math.sin(a+sign*.12)*s*(q+.1)*.5);ctx.stroke();}}
    }
    for(let i=0;i<13;i++){const a=random()*TAU,r=random()*s*.45;ctx.fillStyle='rgba(42,56,17,.16)';ctx.beginPath();ctx.ellipse(s*.5+Math.cos(a)*r,s*.5+Math.sin(a)*r,random()*5+2,random()*3+1,a,0,TAU);ctx.fill();}
  });
}
function waterNormals(seed) {
  const random=rng(seed),s=256,c=document.createElement('canvas');c.width=c.height=s;
  const ctx=c.getContext('2d'),im=ctx.createImageData(s,s);
  for(let y=0;y<s;y++) for(let x=0;x<s;x++) {
    const i=(y*s+x)*4,a=x*TAU/s,b=y*TAU/s;
    const dx=Math.cos(a*9+b*7)*.27+Math.cos(a*17-b*11)*.14+Math.sin(a*31+b*19)*.07;
    const dz=Math.sin(a*7+b*13)*.27+Math.sin(a*19-b*9)*.13+Math.cos(a*29+b*23)*.08;
    im.data[i]=128+dx*110;im.data[i+1]=128+dz*110;im.data[i+2]=245;im.data[i+3]=255;
  }
  ctx.putImageData(im,0,0);const tex=new THREE.CanvasTexture(c);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.colorSpace=THREE.NoColorSpace;return tex;
}
function paintGeometry(geometry, base, variation=.1, seed=1) {
  const random=rng(seed),p=geometry.attributes.position,c=new Float32Array(p.count*3),col=color(base);
  for(let i=0;i<p.count;i++){const f=1+(random()-.5)*variation;c[i*3]=col.r*f;c[i*3+1]=col.g*f;c[i*3+2]=col.b*f;}
  geometry.setAttribute('color',new THREE.BufferAttribute(c,3));return geometry;
}
function tube(points,radius,mat,segments=12,taper=0) {
  const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));
  const geometry=new THREE.TubeGeometry(curve,segments,radius,5,false);
  if(taper){const p=geometry.attributes.position;for(let i=0;i<=segments;i++){const c=curve.getPointAt(i/segments),factor=1-taper*i/segments;for(let j=0;j<=5;j++){const at=i*6+j;p.setXYZ(at,c.x+(p.getX(at)-c.x)*factor,c.y+(p.getY(at)-c.y)*factor,c.z+(p.getZ(at)-c.z)*factor);}}geometry.computeVertexNormals();}
  return new THREE.Mesh(geometry,mat);
}
function mergeStaticParts(target,owned=[],exclude=new Set()) {
  target.updateMatrixWorld(true);const inverse=new THREE.Matrix4().copy(target.matrixWorld).invert(),sets=new Map();
  target.traverse(mesh=>{if(!mesh.isMesh||mesh.isInstancedMesh||exclude.has(mesh)||Array.isArray(mesh.material))return;const key=mesh.material.uuid;if(!sets.has(key))sets.set(key,{material:mesh.material,meshes:[]});sets.get(key).meshes.push(mesh);});
  for(const {material,meshes} of sets.values()){
    if(meshes.length<2)continue;
    const geometries=meshes.map(m=>m.geometry.clone().applyMatrix4(new THREE.Matrix4().multiplyMatrices(inverse,m.matrixWorld)));
    const combined=mergeGeometries(geometries,false);for(const g of geometries)g.dispose();
    if(!combined)continue;const merged=new THREE.Mesh(combined,material);merged.castShadow=meshes.some(m=>m.castShadow);merged.receiveShadow=true;owned.push(combined);
    for(const m of meshes){m.removeFromParent();const at=owned.indexOf(m.geometry);if(at>=0){owned.splice(at,1);m.geometry.dispose();}}
    target.add(merged);
  }
}
function leafGeometry(width=1,length=1,bend=.08) {
  const vertices=[],uvs=[],indices=[],rings=3,segs=40;
  for(let r=0;r<=rings;r++) for(let s=0;s<=segs;s++) {
    const f=r/rings,a=.22+s/segs*(TAU-.44),ruffle=1+.027*Math.sin(a*7)+.016*Math.cos(a*13);
    const x=Math.cos(a)*f*ruffle,z=Math.sin(a)*f*ruffle;
    vertices.push(x*width,bend*(f*f)+.014*Math.sin(a*4)*f*f,z*length);uvs.push(x*.48+.5,z*.48+.5);
  }
  for(let r=0;r<rings;r++)for(let s=0;s<segs;s++){const a=r*(segs+1)+s,b=a+segs+1;indices.push(a,a+1,b,b,a+1,b+1);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();return g;
}
function rockGeometry(seed) {
  const random=rng(seed),n=28,levels=[[-.47,.57],[-.2,.91],[.15,1],[.52,.86],[.71,.61],[.76,.08]],p=[],uv=[],idx=[];
  const bends=Array.from({length:n+1},(_,i)=>.87+.12*Math.sin(i*1.51+seed)+random()*.12);bends[n]=bends[0];
  for(let l=0;l<levels.length;l++)for(let i=0;i<=n;i++){
    const a=i/n*TAU,r=levels[l][1]*bends[i],j=(Math.sin(a*5+seed)+Math.sin(a*9-seed))*.045;
    p.push(Math.cos(a)*r,levels[l][0]+j*(l===5?.15:1),Math.sin(a)*r*.86);uv.push(Math.cos(a)*r*.5+.5,Math.sin(a)*r*.5+.5);
  }
  for(let l=0;l<levels.length-1;l++)for(let i=0;i<n;i++){const a=l*(n+1)+i,b=a+n+1;idx.push(a,b,a+1,a+1,b,b+1);}
  const center=p.length/3;p.push(0,.764,0);uv.push(.5,.5);for(let i=0;i<n;i++)idx.push(center,(levels.length-1)*(n+1)+i+1,(levels.length-1)*(n+1)+i);
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g;
}
function bladeGeometry(seed) {
  const random=rng(seed),p=[],uv=[],idx=[],cols=[];
  for(let blade=0;blade<5;blade++){
    const ang=random()*TAU,len=.55+random()*.7,bend=.1+random()*.35,w=.022+random()*.035,c=color(blade%2?'#819c42':'#526f33'),start=p.length/3;
    for(let i=0;i<=7;i++){const t=i/7,midX=Math.cos(ang)*bend*t*t,midZ=Math.sin(ang)*bend*t*t,width=w*Math.sin(Math.PI*(t*.94+.04));
      for(const side of [-1,1]){p.push(midX+Math.cos(ang+Math.PI/2)*width*side,t*len,midZ+Math.sin(ang+Math.PI/2)*width*side);uv.push(side*.5+.5,t);cols.push(c.r*(.65+t*.35),c.g*(.65+t*.35),c.b*(.65+t*.35));}
    }
    for(let i=0;i<7;i++){const a=start+i*2;idx.push(a,a+1,a+2,a+1,a+3,a+2);}
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));g.setIndex(idx);g.computeVertexNormals();return g;
}
function cattailGeometry() {
  const stem=new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(),new THREE.Vector3(.03,.8,.015),new THREE.Vector3(.1,1.8,.04)]),9,.013,5,false);
  paintGeometry(stem,'#64754a',.15,8);
  const head=new THREE.SphereGeometry(1,7,7);head.scale(.065,.25,.065);head.translate(.1,1.61,.04);paintGeometry(head,'#5d3f27',.3,5);
  const blades=bladeGeometry(92);blades.scale(.8,1.45,.8);
  const merged=mergeGeometries([stem,head,blades],false);stem.dispose();head.dispose();blades.dispose();return merged;
}
function fruitGeometry(seed) {
  const g=new THREE.SphereGeometry(1,13,9),p=g.attributes.position;
  for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),r=1+.06*Math.sin(x*12+seed)*Math.sin(z*13-y*7);p.setXYZ(i,x*r,y*.83*r,z*r);}
  g.computeVertexNormals();return g;
}
function flyGeometry() {
  const p=[],c=[],idx=[];
  function tri(a,b,d,col){const n=p.length/3;p.push(...a,...b,...d);const cc=color(col);for(let j=0;j<3;j++)c.push(cc.r,cc.g,cc.b);idx.push(n,n+1,n+2);}
  tri([0,.025,-.1],[-.045,0,0],[0,.04,.09],'#16201b');tri([0,.025,-.1],[0,.04,.09],[.045,0,0],'#293327');
  tri([0,0,0],[-.17,.025,-.035],[-.12,.015,.07],'#a0b3b0');tri([0,0,0],[.12,.015,.07],[.17,.025,-.035],'#a0b3b0');
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('color',new THREE.Float32BufferAttribute(c,3));g.setIndex(idx);g.computeVertexNormals();return g;
}

/** Keep every authored instance, but give the renderer local bounds to cull. */
function spatialBatch(geometry,material,records,name,{castShadow=false,receiveShadow=false,dynamic=false}={}){
  // Coarse cells avoid turning vegetation culling into hundreds of tiny draws.
  const group=new THREE.Group();group.name=name;const cells=new Map(),slots=[],meshes=[],dirty=new Set(),span=128;
  records.forEach((record,index)=>{const key=Math.floor(record.x/span)+':'+Math.floor(record.z/span);if(!cells.has(key))cells.set(key,[]);cells.get(key).push(index);});
  for(const [key,indices] of cells){
    const mesh=new THREE.InstancedMesh(geometry,material,indices.length);mesh.name=name+' · '+key;mesh.castShadow=castShadow;mesh.receiveShadow=receiveShadow;
    mesh.userData.spatialChunk=true;mesh.userData.chunkSpan=span;if(dynamic)mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    indices.forEach((source,index)=>{slots[source]={mesh,index};});group.add(mesh);meshes.push(mesh);
  }
  return {group,meshes,count:records.length,
    setMatrixAt(index,matrix){const slot=slots[index];slot.mesh.setMatrixAt(slot.index,matrix);dirty.add(slot.mesh);},
    setColorAt(index,tint){const slot=slots[index];slot.mesh.setColorAt(slot.index,tint);},
    finish(){for(const mesh of meshes){mesh.computeBoundingBox();mesh.computeBoundingSphere();mesh.boundingSphere.radius+=.75;mesh.instanceMatrix.needsUpdate=true;if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true;}dirty.clear();},
    flush(){for(const mesh of dirty)mesh.instanceMatrix.needsUpdate=true;dirty.clear();}
  };
}

export function createWorld(scene, renderer, options={}) {
  const seed=options.seed??731,random=rng(seed),group=new THREE.Group();group.name='The living creek';scene.add(group);
  const platforms=[],hotspots=[],shelters=new Set(),castleTerraces=new Map(),buildingPreviews=new Set(),disposables=[],buckets=new Map(),bucketSize=6;let buildArea=null;
  const renderStats={reflectionRenders:0,reflectionSkips:0,flyMatricesUpdated:0,spatialChunks:0,terrainUpdates:0};
  const skyColor=new THREE.Color('#8aaab0'),fogColor=new THREE.Color('#819e91');
  if(!scene.fog)scene.fog=new THREE.FogExp2(fogColor,.0042);
  const stoneMap=stoneTexture(seed),mossMap=stoneTexture(seed+9,true),leafMap=leafTexture(seed),normals=waterNormals(seed);
  disposables.push(stoneMap,mossMap,leafMap,normals);
  const materials={
    terrain:new THREE.MeshStandardMaterial({color:0xffffff,vertexColors:true,map:mossMap,roughness:1}),
    leaf:new THREE.MeshStandardMaterial({color:'#b5d28f',map:leafMap,roughness:.44,metalness:.025,side:THREE.DoubleSide}),
    rock:new THREE.MeshStandardMaterial({color:'#a4a292',map:stoneMap,roughness:.89}),
    mossRock:new THREE.MeshStandardMaterial({color:'#89976c',map:mossMap,roughness:.94}),
    plant:new THREE.MeshStandardMaterial({color:0xffffff,vertexColors:true,roughness:.87,side:THREE.DoubleSide}),
    bark:new THREE.MeshStandardMaterial({color:'#65513a',map:stoneMap,roughness:.94}),
    reed:new THREE.MeshStandardMaterial({color:'#b4a676',map:stoneMap,roughness:.83}),
    compost:new THREE.MeshStandardMaterial({color:'#57422e',map:mossMap,roughness:1}),
    fruit:new THREE.MeshStandardMaterial({color:'#b38539',map:stoneMap,roughness:.75}),
    darkFruit:new THREE.MeshStandardMaterial({color:'#685831',map:mossMap,roughness:.95}),
  };
  const rockGeos=[rockGeometry(7),rockGeometry(35),rockGeometry(89)],lilyGeo=leafGeometry(),fruitGeo=fruitGeometry(19);
  const campSites=[
    {id:'home',x:8,z:8,radius:7.4,team:'neutral',name:'Willow Haven'},
    {id:'mudfang',x:-31,z:-30,radius:7,team:'enemy',name:'Mudfang Den'},
    {id:'redreed',x:31,z:-56,radius:7.6,team:'enemy',name:'Red Reed Stronghold'},
    {id:'mossjaw',x:-24,z:49,radius:7.1,team:'enemy',name:'Mossjaw Hollow'},
    {id:'blackpool',x:34,z:79,radius:8,team:'enemy',name:'Blackwater Nest'},
    {id:'thornback',x:-8,z:-91,radius:8,team:'enemy',name:'Thornback Root'},
    {id:'oldwillow',x:-38,z:96,radius:7.5,team:'neutral',name:'Αυλή της Γέρικης Ιτιάς'},
    {id:'quietbend',x:29,z:32,radius:6.8,team:'neutral',name:'Quiet Bend'},
    {id:'foxglove',x:-39,z:2,radius:6.8,team:'neutral',name:'Foxglove Island'},
    {id:'reedcrossing',x:3,z:-45,radius:6.8,team:'neutral',name:'Πέρασμα των Καλαμιών'},
    {id:'longreed',x:-4,z:67,radius:6.8,team:'neutral',name:'Νησίδα των Ανέμων'},
    {id:'eastshallows',x:58,z:35,radius:6.8,team:'neutral',name:'Ανατολικές Αβαθείς'}
  ];
  // Room for a real communal camp, its walkable courtyard and purchased wings.
  // The soft irregular shore still leaves a water route between neighbouring sites.
  const islandLevels={home:.65,mudfang:2.7,redreed:4.1,mossjaw:1.8,blackpool:5.2,thornback:7.1,oldwillow:2.9,quietbend:1.2,foxglove:2.1,reedcrossing:1.7,longreed:2.5,eastshallows:3.4};
  for(const site of campSites){site.x*=WORLD_SCALE;site.z*=WORLD_SCALE;site.radius=Math.max(36,site.radius*(site.id==='thornback'?5.8:4.9));site.elevation=islandLevels[site.id];}
  campSites.find(s=>s.id==='thornback').stronghold=true;
  const mapRegions=[
    {id:'haven',name:'Απάνεμη Όχθη',x:0,z:12,radius:30,tint:'#77965d'},
    {id:'reedways',name:'Περάσματα των Καλαμιών',x:2,z:-50,radius:45,tint:'#a99d64'},
    {id:'westernroots',name:'Δυτικές Ρίζες',x:-34,z:22,radius:37,tint:'#657f67'},
    {id:'blackwater',name:'Βαθύ Νερό',x:10,z:75,radius:34,tint:'#496f79'}
  ].map(r=>({...r,x:r.x*WORLD_SCALE,z:r.z*WORLD_SCALE,radius:r.radius*WORLD_SCALE}));
  const predatorAnchors={
    heron:{x:34*WORLD_SCALE,z:14*WORLD_SCALE},
    snake:{x:-38*WORLD_SCALE,z:-22*WORLD_SCALE},
    fish:{x:12*WORLD_SCALE,z:48*WORLD_SCALE}
  };
  const bossAnchors={
    heron:{x:43*WORLD_SCALE,z:-73*WORLD_SCALE},
    snake:{x:-39*WORLD_SCALE,z:70*WORLD_SCALE},
    fish:{x:11*WORLD_SCALE,z:94*WORLD_SCALE}
  };
  function bedHeight(x,z) {
    const nx=x/WORLD_SCALE,nz=z/WORLD_SCALE;
    const channel=Math.sin(nz*.032)*15+Math.sin(nz*.073)*5,dist=Math.abs(nx-channel);
    let h=-2.2+noise(x,z)*.47+smooth(44,71,dist)*6;
    // Rolling bank ridges and island terraces create visible elevation. Their
    // slopes stay continuous, so the same sampled surface drives walking.
    h+=smooth(47,72,dist)*(1.5+3.3*Math.sin(nz*.036+.7)**2);
    h+=smooth(105,132,Math.abs(nz))*4.8;
    let clearing=null,clearingWeight=0;
    for(const site of campSites){const dx=(x-site.x),dz=(z-site.z),d=Math.hypot(dx,dz);const edge=site.radius*(1+.05*Math.sin(Math.atan2(dz,dx)*5+site.x));
      if(d<edge+7){const terrace=ISLAND_TERRACE_RADIUS,island=site.elevation-smooth(terrace,edge+7,d)*(site.elevation+2.8);h=Math.max(h,island);const weight=1-smooth(terrace,terrace+8,d);if(weight>clearingWeight){clearing=site;clearingWeight=weight;}}}
    // Cut a buildable terrace into a neighbouring ridge, then blend it back
    // over a broad ramp. A bank must never protrude through a shelter floor.
    if(clearing)h=h*(1-clearingWeight)+clearing.elevation*clearingWeight;
    // Saved and freely placed castles may not sit on an authored island centre.
    // Their actual footprint receives the same real earth terrace as the model,
    // so a valid land centre can never leave the perimeter hanging in the air.
    let castle=null,castleWeight=0,nearest=Infinity;
    for(const terrace of castleTerraces.values()){
      const d=Math.hypot(x-terrace.x,z-terrace.z),weight=1-smooth(CASTLE_GROUND_RADIUS,CASTLE_GROUND_RADIUS+CASTLE_BANK_BLEND,d);
      if(weight>castleWeight||(weight===castleWeight&&weight>0&&d<nearest)){castle=terrace;castleWeight=weight;nearest=d;}
    }
    if(castle){const supported=h*(1-castleWeight)+castle.elevation*castleWeight;h=castleWeight===1?castle.elevation:Math.max(h,supported);}
    return h;
  }
  const terrainGeo=new THREE.PlaneGeometry(270*WORLD_SCALE,270*WORLD_SCALE,216,216);terrainGeo.rotateX(-Math.PI/2);
  const tp=terrainGeo.attributes.position,tcolors=new Float32Array(tp.count*3),earth=color('#8b8a62'),wet=color('#43533b'),deep=color('#52634e');
  for(let i=0;i<tp.count;i++){const x=tp.getX(i),z=tp.getZ(i),h=bedHeight(x,z);tp.setY(i,h);const c=deep.clone().lerp(wet,smooth(-1.7,.05,h)).lerp(earth,smooth(.02,2,h));c.multiplyScalar(.88+noise(x*2,z*2)*.18);c.toArray(tcolors,i*3);}
  terrainGeo.setAttribute('color',new THREE.BufferAttribute(tcolors,3));terrainGeo.computeVertexNormals();
  mossMap.repeat.set(44*WORLD_SCALE,44*WORLD_SCALE);const terrain=new THREE.Mesh(terrainGeo,materials.terrain);terrain.receiveShadow=true;terrain.name='Creek bed and island banks';group.add(terrain);
  // Walk the actual triangles, including rebuilt banks. Sampling a separate
  // analytic curve made frogs float or sink where the coarse grid slopes.
  const terrainHalf=135*WORLD_SCALE,terrainStep=270*WORLD_SCALE/216,terrainStride=217;
  function terrainHeight(x,z){
    const gx=THREE.MathUtils.clamp((x+terrainHalf)/terrainStep,0,216),gz=THREE.MathUtils.clamp((z+terrainHalf)/terrainStep,0,216),ix=Math.min(215,Math.floor(gx)),iz=Math.min(215,Math.floor(gz)),u=gx-ix,v=gz-iz,a=iz*terrainStride+ix,b=a+terrainStride;
    const h00=tp.getY(a),h10=tp.getY(a+1),h01=tp.getY(b),h11=tp.getY(b+1);
    return u+v<=1?h00+u*(h10-h00)+v*(h01-h00):h11+(1-u)*(h01-h11)+(1-v)*(h10-h11);
  }
  function refreshTerrain(terrace){
    const reach=CASTLE_GROUND_RADIUS+CASTLE_BANK_BLEND+terrainStep*2;
    for(let i=0;i<tp.count;i++){
      const x=tp.getX(i),z=tp.getZ(i);if(Math.abs(x-terrace.x)>reach||Math.abs(z-terrace.z)>reach)continue;
      const h=bedHeight(x,z);tp.setY(i,h);const c=deep.clone().lerp(wet,smooth(-1.7,.05,h)).lerp(earth,smooth(.02,2,h));c.multiplyScalar(.88+noise(x*2,z*2)*.18);c.toArray(tcolors,i*3);
    }
    tp.needsUpdate=true;terrainGeo.attributes.color.needsUpdate=true;terrainGeo.computeVertexNormals();terrainGeo.computeBoundingBox();terrainGeo.computeBoundingSphere();renderStats.terrainUpdates++;
  }
  // Separate moss texture scale for rock outcrops, so the bed can tile densely.
  const rockMoss=stoneTexture(seed+9,true);disposables.push(rockMoss);materials.mossRock.map=rockMoss;materials.compost.map=rockMoss;materials.darkFruit.map=rockMoss;

  const waterGeo=new THREE.PlaneGeometry(266*WORLD_SCALE,266*WORLD_SCALE,88,88);
  const water=new Water(waterGeo,{textureWidth:512,textureHeight:512,waterNormals:normals,sunDirection:new THREE.Vector3(.6,.8,-.3),sunColor:0xffe9bd,waterColor:0x2e625b,distortionScale:2.5,alpha:.91,fog:true});
  water.name='Reflecting creek';water.rotation.x=-Math.PI/2;water.position.y=-.035;water.material.transparent=true;water.material.depthWrite=false;water.renderOrder=-2;
  water.material.uniforms.size.value=4.8;group.add(water);
  // Water otherwise renders the complete scene a second time on every frame.
  // Normals, lighting and ripples still animate each frame; the reflection is
  // refreshed on alternate frames without removing creatures from the mirror.
  const renderReflection=water.onBeforeRender;let reflectionFrame=0;
  water.onBeforeRender=function(activeRenderer,activeScene,camera){
    water.material.uniforms.eye.value.setFromMatrixPosition(camera.matrixWorld);
    if(reflectionFrame++%2){renderStats.reflectionSkips++;return;}
    renderStats.reflectionRenders++;renderReflection.call(this,activeRenderer,activeScene,camera);
  };
  const waterBase=waterGeo.attributes.position.array.slice();

  // Distant silhouettes have textured bark, tangled roots and thousands of
  // individually curved reed blades, rather than a uniform wall around a box.
  const bankRootGeos=[],rootGroup=new THREE.Group(),treeLeaves=[];rootGroup.name='Willow trunks and tangled roots';group.add(rootGroup);
  for(let side of [-1,1])for(let i=0;i<15;i++){
    const z=(-122+i*17+(random()-.5)*7)*WORLD_SCALE,x=(side*(59+random()*15)+Math.sin(z/WORLD_SCALE*.032)*15)*WORLD_SCALE,y=bedHeight(x,z);
    if(y<.2)continue;
    const trunk=new THREE.Group();trunk.position.set(x,y,z);const height=9+random()*14,lean=(random()-.5)*3;
    const main=tube([[0,-.8,0],[.25,height*.3,0],[lean,height*.72,.6],[lean*.8,height,1]],.68+random()*.65,materials.bark,13,.72);main.castShadow=true;trunk.add(main);bankRootGeos.push(main.geometry);
    for(let r=0;r<5;r++){const a=r/5*TAU+random(),len=3+random()*4;const root=tube([[0,.7,0],[Math.cos(a)*len*.45,.1,Math.sin(a)*len*.45],[Math.cos(a)*len,-.4,Math.sin(a)*len]],.15+random()*.2,materials.bark,9,.82);root.castShadow=true;trunk.add(root);bankRootGeos.push(root.geometry);}
    for(let b=0;b<4;b++){const a=random()*TAU,start=height*(.5+random()*.3),len=3+random()*6,branch=tube([[lean*.4,start,0],[Math.cos(a)*len*.45,start+2,Math.sin(a)*len*.45],[Math.cos(a)*len,start+3,Math.sin(a)*len]],.16+random()*.2,materials.bark,10,.83);trunk.add(branch);bankRootGeos.push(branch.geometry);
      for(let l=0;l<70;l++){const r=Math.sqrt(random())*4,ang=random()*TAU;treeLeaves.push({x:x+Math.cos(a)*len+Math.cos(ang)*r,y:y+start+3+(random()-.5)*3-Math.abs(r)*.25,z:z+Math.sin(a)*len+Math.sin(ang)*r,angle:random()*TAU,scale:.65+random()*.6});}}
    rootGroup.add(trunk);
  }
  mergeStaticParts(rootGroup,bankRootGeos);
  const willowLeaf=new THREE.BufferGeometry();willowLeaf.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,-.12,-.32,.035,0,-.38,.06,.12,-.32,.035,-.1,-.64,.02,0,-.76,.04,.1,-.64,.02,0,-1.05,0],3));willowLeaf.setAttribute('uv',new THREE.Float32BufferAttribute([.5,0,0,.3,.5,.35,1,.3,0,.6,.5,.7,1,.6,.5,1],2));willowLeaf.setIndex([0,1,2,0,2,3,1,4,2,2,4,5,2,5,6,2,6,3,4,7,5,5,7,6]);willowLeaf.computeVertexNormals();paintGeometry(willowLeaf,'#69834d',.25,seed);
  const willowLeaves=spatialBatch(willowLeaf,materials.plant,treeLeaves,'Hanging willow foliage');treeLeaves.forEach((p,i)=>{object.position.set(p.x,p.y,p.z);object.rotation.set((random()-.5)*.8,p.angle,(random()-.5)*.7);object.scale.setScalar(p.scale);object.updateMatrix();willowLeaves.setMatrixAt(i,object.matrix);});willowLeaves.finish();group.add(willowLeaves.group);renderStats.spatialChunks+=willowLeaves.meshes.length;

  function insertPlatform(p){platforms.push(p);const x0=Math.floor((p.x-p.radius)/bucketSize),x1=Math.floor((p.x+p.radius)/bucketSize),z0=Math.floor((p.z-p.radius)/bucketSize),z1=Math.floor((p.z+p.radius)/bucketSize);for(let x=x0;x<=x1;x++)for(let z=z0;z<=z1;z++){const key=x+':'+z;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(p);}return p;}
  const lilyData=[],rockData=[[],[],[]];
  function addLily(x,z,radius=1.35+random()*.9){const p=insertPlatform({id:'p'+platforms.length,type:'lily',x,z,y:.105,radius:radius*.91,visualRadius:radius,angle:random()*TAU,phase:random()*TAU});lilyData.push(p);return p;}
  function addRock(x,z,radius=1.3+random()*1.3,height=.65+random()*.65){const variant=Math.floor(random()*3),p=insertPlatform({id:'p'+platforms.length,type:'rock',x,z,y:height*.76-.05,radius:radius*.72,visualRadius:radius,scaleY:height,angle:random()*TAU,variant});rockData[variant].push(p);return p;}
  addLily(0,0,3.1);addLily(3.7,1,2.3);addRock(-3.9,2.2,2.5,.9);
  function path(a,b){const distance=Math.hypot(b.x-a.x,b.z-a.z),steps=Math.ceil(distance/3.65);for(let i=1;i<steps;i++){const t=i/steps,x=a.x+(b.x-a.x)*t+Math.sin(t*Math.PI*3)*1.25,z=a.z+(b.z-a.z)*t;if(bedHeight(x,z)>-.1)continue;if(random()<.18)addRock(x,z,1.8+random()*.7,.65+random()*.55);else addLily(x,z,1.65+random()*.65);}}
  // Two crossing routes join the factions, with neutral staging islands between
  // them. Distances grow, but jump spacing and individual leaves stay frog-sized.
  const origin={id:'origin',x:0,z:0},siteById=new Map(campSites.map(s=>[s.id,s]));siteById.set('origin',origin);
  const routePairs=[['origin','home'],['origin','foxglove'],['home','mudfang'],['home','quietbend'],['mudfang','reedcrossing'],['reedcrossing','redreed'],['reedcrossing','thornback'],['foxglove','mossjaw'],['quietbend','mossjaw'],['quietbend','eastshallows'],['mossjaw','longreed'],['longreed','blackpool'],['longreed','oldwillow'],['eastshallows','blackpool'],['redreed','thornback']];
  const routes=routePairs.map(([a,b])=>({from:a,to:b,start:siteById.get(a),end:siteById.get(b)}));
  for(const route of routes)path(route.start,route.end);
  for(let i=0;i<1180;i++){
    const z=(random()-.5)*218*WORLD_SCALE,x=((random()-.5)*108+Math.sin(z/WORLD_SCALE*.032)*10)*WORLD_SCALE;
    if(bedHeight(x,z)>-.18)continue;
    const neighbours=buckets.get(Math.floor(x/bucketSize)+':'+Math.floor(z/bucketSize))||[];
    if(neighbours.some(p=>Math.hypot(p.x-x,p.z-z)<p.radius+1))continue;
    if(random()<.15)addRock(x,z,1.1+random()*2.3,.55+random()*1.2);else addLily(x,z,1.1+random()*1.1);
  }
  for(const site of campSites)insertPlatform({id:'island-'+site.id,type:'land',x:site.x,z:site.z,y:site.elevation,radius:site.radius*.8});
  const lilyMesh=spatialBatch(lilyGeo,materials.leaf,lilyData,'Veined water lily leaves',{castShadow:true,receiveShadow:true,dynamic:true});
  lilyData.forEach((p,i)=>{object.position.set(p.x,p.y,p.z);object.rotation.set((random()-.5)*.04,p.angle,(random()-.5)*.035);object.scale.set(p.visualRadius,1,p.visualRadius*(.89+random()*.18));object.updateMatrix();lilyMesh.setMatrixAt(i,object.matrix);lilyMesh.setColorAt(i,color(['#b6cf8a','#88ac67','#749d59','#c0cc7e','#729958'][Math.floor(random()*5)]));});lilyMesh.finish();group.add(lilyMesh.group);renderStats.spatialChunks+=lilyMesh.meshes.length;
  rockData.forEach((data,j)=>{const batch=spatialBatch(rockGeos[j],j===1?materials.mossRock:materials.rock,data,'Weathered waterline outcrops',{castShadow:true,receiveShadow:true});data.forEach((p,i)=>{object.position.set(p.x,-.05,p.z);object.rotation.set(0,p.angle,0);object.scale.set(p.visualRadius,p.scaleY,p.visualRadius);object.updateMatrix();batch.setMatrixAt(i,object.matrix);batch.setColorAt(i,color('#ffffff').multiplyScalar(.7+random()*.4));});batch.finish();group.add(batch.group);renderStats.spatialChunks+=batch.meshes.length;});

  // Pads with white flowers add scale and landmarks along the waterway.
  const petalGeo=new THREE.BufferGeometry(),petalP=[],petalUV=[],petalI=[];
  for(let i=0;i<=9;i++){const t=i/9,w=Math.sin(t*Math.PI)*.16;for(const s of [-1,1]){petalP.push(s*w,.13*Math.sin(t*Math.PI)+.23*t*t,t*.65);petalUV.push(s*.5+.5,t);}}
  for(let i=0;i<9;i++){const a=i*2;petalI.push(a,a+1,a+2,a+1,a+3,a+2);}petalGeo.setAttribute('position',new THREE.Float32BufferAttribute(petalP,3));petalGeo.setAttribute('uv',new THREE.Float32BufferAttribute(petalUV,2));petalGeo.setIndex(petalI);petalGeo.computeVertexNormals();
  const petalMat=new THREE.MeshStandardMaterial({color:'#f4e5d5',roughness:.48,side:THREE.DoubleSide});
  const flowerPads=lilyData.filter((_,i)=>i%23===5),petals=new THREE.InstancedMesh(petalGeo,petalMat,flowerPads.length*13);let pi=0;
  for(const p of flowerPads)for(let j=0;j<13;j++){object.position.set(p.x+.24,p.y+.045,p.z);object.rotation.set(j>7?.1:0,j/8*TAU,j>7?.1:0);object.scale.setScalar(j>7?.67:1);object.updateMatrix();petals.setMatrixAt(pi++,object.matrix);}group.add(petals);

  const vegetation=[];
  for(let i=0;i<26000;i++){
    const x=(random()-.5)*254*WORLD_SCALE,z=(random()-.5)*254*WORLD_SCALE,h=bedHeight(x,z);if(h<-.52||h>3.2)continue;
    if(campSites.some(s=>Math.hypot(s.x-x,s.z-z)<s.radius*.68))continue;
    if(Math.hypot(x,z)<8)continue;
    vegetation.push({x,z,y:h,scale:.65+random()*2.2,angle:random()*TAU});
  }
  const reedGeo=bladeGeometry(44),reedMesh=spatialBatch(reedGeo,materials.plant,vegetation,'Curved river reeds',{receiveShadow:true});
  vegetation.forEach((p,i)=>{object.position.set(p.x,p.y,p.z);object.rotation.set(0,p.angle,0);object.scale.set(.65+p.scale*.25,p.scale,.65+p.scale*.25);object.updateMatrix();reedMesh.setMatrixAt(i,object.matrix);reedMesh.setColorAt(i,color('#ffffff').multiplyScalar(.75+random()*.5));});reedMesh.finish();group.add(reedMesh.group);renderStats.spatialChunks+=reedMesh.meshes.length;
  const cattails=vegetation.filter((p,i)=>p.y<.5&&i%5===0),catGeo=cattailGeometry(),catMesh=spatialBatch(catGeo,materials.plant,cattails,'Cattail patches');
  cattails.forEach((p,i)=>{object.position.set(p.x+.12,p.y,p.z);object.rotation.set(0,p.angle,0);object.scale.setScalar(.7+p.scale*.4);object.updateMatrix();catMesh.setMatrixAt(i,object.matrix);});catMesh.finish();group.add(catMesh.group);renderStats.spatialChunks+=catMesh.meshes.length;
  // Subtle vertex wind keeps the whole wetland alive, without per-blade JS.
  const windUniform={value:0};materials.plant.onBeforeCompile=shader=>{shader.uniforms.uCreekTime=windUniform;shader.vertexShader='uniform float uCreekTime;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n transformed.x += sin(uCreekTime * 1.1 + position.y * 2.3 + instanceMatrix[3].x * .13 + instanceMatrix[3].z * .17) * pow(max(position.y, 0.0), 1.6) * .035;');};
  materials.plant.customProgramCacheKey=()=> 'creek-wind-1';

  function surface(x,z){let h=terrainHeight(x,z),type=h>-.1?'land':'water',chosen=null;if(h<=-.1)h=-.25;const near=buckets.get(Math.floor(x/bucketSize)+':'+Math.floor(z/bucketSize))||[];
    for(const p of near){if(p.type==='land')continue;const d=Math.hypot(x-p.x,z-p.z);if(d<=p.radius){let ph=p.y;if(p.type==='rock')ph-=smooth(p.radius*.62,p.radius,d)*.14*p.scaleY;if(ph>h){h=ph;type=p.type==='shelter'?'land':p.type;chosen=p;}}}
    return {height:h,type,platform:chosen};}
  function sampleHeight(x,z){return surface(x,z).height;}

  // Organic fly lures: fallen fruit, leaf litter and waterlogged wood.
  // Original hotspot ids remain stable for saves. New contested lures are
  // appended, and the starter lure stays within a few hops of the spawn pad.
  const spotSpecs=[{x:4.5/WORLD_SCALE,z:-4/WORLD_SCALE,rich:false},{x:-10,z:12,rich:true},{x:15,z:-20,rich:false},{x:-25,z:-23,rich:true},{x:26,z:-47,rich:true},{x:-17,z:40,rich:true},{x:27,z:69,rich:true},{x:-4,z:-81,rich:true},{x:-34,z:86,rich:true},{x:23,z:26,rich:false},{x:-33,z:7,rich:false},{x:4,z:51,rich:false},{x:9,z:-59,rich:false},{x:-12,z:76,rich:false},{x:39,z:-4,rich:false},{x:-42,z:-59,rich:true},{x:7,z:-39,rich:true},{x:0,z:63,rich:true},{x:53,z:33,rich:true},{x:-24,z:17,rich:false},{x:17,z:-70,rich:false},{x:18,z:90,rich:true}].map(s=>({...s,x:s.x*WORLD_SCALE,z:s.z*WORLD_SCALE}));
  const fruitInstances=[],spotMounds=[],compostGeos=[],litterGroup=new THREE.Group();group.add(litterGroup);
  for(let i=0;i<spotSpecs.length;i++){
    const s=spotSpecs[i],base=bedHeight(s.x,s.z);if(base<-.15)addRock(s.x,s.z,s.rich?3.2:2.2,.62);
    const h=sampleHeight(s.x,s.z),spot={id:'flies-'+i,x:s.x,z:s.z,y:h+.25,flies:s.rich?240:100,maxFlies:s.rich?240:100,rich:s.rich};hotspots.push(spot);
    const mound=new THREE.Mesh(rockGeos[i%3],materials.compost);mound.position.set(s.x,h+.05,s.z);mound.scale.set(s.rich?1.7:1.05,.28,s.rich?1.25:.75);mound.rotation.y=random()*TAU;group.add(mound);spotMounds.push(mound);
    for(let j=0;j<(s.rich?12:6);j++){const a=random()*TAU,r=random()*(s.rich?1.5:.85),offset=.12+random()*.16;fruitInstances.push({spot:i,groundOffset:offset,x:s.x+Math.cos(a)*r,y:h+offset,z:s.z+Math.sin(a)*r,scale:.12+random()*.18,rot:random()*TAU});}
    for(let j=0;j<3;j++){const a=random()*TAU,len=.7+random()*.8;const branch=tube([[0,0,0],[len*.5,.02,.06],[len,.04,.14]],.035,materials.bark,4);branch.position.set(s.x+(random()-.5)*1.6,h+.1,s.z+(random()-.5)*1.6);branch.rotation.y=a;litterGroup.add(branch);compostGeos.push(branch.geometry);}
  }
  mergeStaticParts(litterGroup,compostGeos);
  // Lure platforms are added after the main instanced rock pass, deliberately
  // represented separately so root gameplay receives the same support surface.
  // All late additions have no render flag yet; existing arrays already have
  // their initial matrices, so explicitly render the lure's support stones.
  for(const s of spotSpecs)if(bedHeight(s.x,s.z)<-.15){const p=rockData.flat().find(p=>Math.abs(p.x-s.x)<.01&&Math.abs(p.z-s.z)<.01);if(p){const m=new THREE.Mesh(rockGeos[p.variant],materials.mossRock);m.position.set(p.x,-.05,p.z);m.rotation.y=p.angle;m.scale.set(p.visualRadius,p.scaleY,p.visualRadius);m.castShadow=true;m.receiveShadow=true;group.add(m);}}
  const fruitMesh=new THREE.InstancedMesh(fruitGeo,materials.fruit,fruitInstances.length);fruitInstances.forEach((p,i)=>{object.position.set(p.x,p.y,p.z);object.rotation.set(.3,p.rot,.2);object.scale.setScalar(p.scale);object.updateMatrix();fruitMesh.setMatrixAt(i,object.matrix);fruitMesh.setColorAt(i,color(['#cb9d59','#6d7341','#aa7044','#c5ad62'][i%4]));});group.add(fruitMesh);
  const flies=[];for(let j=0;j<hotspots.length;j++)for(let i=0;i<(hotspots[j].rich?65:30);i++)flies.push({spot:j,phase:random()*TAU,phase2:random()*TAU,r:.25+random()*(hotspots[j].rich?2.3:1.35),height:.45+random()*1.9,speed:.65+random()*1.7,rank:i});
  const fliesBySpot=hotspots.map(()=>[]);for(const fly of flies)fliesBySpot[fly.spot].push(fly);
  const flyMat=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.45,side:THREE.DoubleSide}),fliesMesh=new THREE.InstancedMesh(flyGeometry(),flyMat,flies.length);fliesMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);fliesMesh.frustumCulled=false;fliesMesh.name='Fly swarms';fliesMesh.count=0;group.add(fliesMesh);

  // A single instanced ripple draw and one point cloud cover every splash.
  const rippleCount=64,rippleBase=new THREE.PlaneGeometry(2,2),rippleGeo=new THREE.InstancedBufferGeometry();rippleBase.rotateX(-Math.PI/2);rippleGeo.index=rippleBase.index;rippleGeo.attributes.position=rippleBase.attributes.position;rippleGeo.attributes.uv=rippleBase.attributes.uv;
  const centers=new Float32Array(rippleCount*3),starts=new Float32Array(rippleCount).fill(-100),sizes=new Float32Array(rippleCount),rippleColors=new Float32Array(rippleCount*3);
  rippleGeo.setAttribute('aCenter',new THREE.InstancedBufferAttribute(centers,3));rippleGeo.setAttribute('aStart',new THREE.InstancedBufferAttribute(starts,1));rippleGeo.setAttribute('aSize',new THREE.InstancedBufferAttribute(sizes,1));rippleGeo.setAttribute('aTint',new THREE.InstancedBufferAttribute(rippleColors,3));rippleGeo.instanceCount=rippleCount;
  const rippleMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,uniforms:{uTime:{value:0}},vertexShader:`attribute vec3 aCenter; attribute float aStart; attribute float aSize; attribute vec3 aTint; uniform float uTime; varying vec2 vUv; varying float vLife; varying vec3 vTint; void main(){vUv=uv; vLife=(uTime-aStart)/2.4; vTint=aTint; vec3 p=position*aSize*(.35+clamp(vLife,0.,1.)*3.8)+aCenter; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,fragmentShader:`varying vec2 vUv;varying float vLife;varying vec3 vTint;void main(){if(vLife<0.||vLife>1.)discard;float r=length(vUv-.5)*2.;float band=exp(-pow((r-.82)/(.026+vLife*.018),2.))* .58+exp(-pow((r-.64)/.026,2.))*.22;float a=band*pow(1.-vLife,1.6);gl_FragColor=vec4(vTint,a);}`});
  const rippleMesh=new THREE.Mesh(rippleGeo,rippleMat);rippleMesh.frustumCulled=false;rippleMesh.renderOrder=2;group.add(rippleMesh);let rippleCursor=0,now=0;
  const dropCount=1100,dropPos=new Float32Array(dropCount*3),dropColor=new Float32Array(dropCount*3),dropSize=new Float32Array(dropCount),dropAlpha=new Float32Array(dropCount),drops=Array.from({length:dropCount},()=>({life:0,max:1,vx:0,vy:0,vz:0,water:true}));let dropCursor=0;
  const dropGeo=new THREE.BufferGeometry();dropGeo.setAttribute('position',new THREE.BufferAttribute(dropPos,3).setUsage(THREE.DynamicDrawUsage));dropGeo.setAttribute('aColor',new THREE.BufferAttribute(dropColor,3).setUsage(THREE.DynamicDrawUsage));dropGeo.setAttribute('aSize',new THREE.BufferAttribute(dropSize,1).setUsage(THREE.DynamicDrawUsage));dropGeo.setAttribute('aAlpha',new THREE.BufferAttribute(dropAlpha,1).setUsage(THREE.DynamicDrawUsage));
  const dropMat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,uniforms:{uScale:{value:500}},vertexShader:`attribute vec3 aColor;attribute float aSize;attribute float aAlpha;uniform float uScale;varying vec3 vColor;varying float vAlpha;void main(){vColor=aColor;vAlpha=aAlpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*uScale/max(.1,-mv.z),1.,35.);}`,fragmentShader:`varying vec3 vColor;varying float vAlpha;void main(){vec2 p=gl_PointCoord-.5;float d=length(p)*2.;if(d>1.)discard;float shade=.6+.4*max(0.,1.-length(p-vec2(-.12,.12))*2.);gl_FragColor=vec4(vColor*shade,smoothstep(1.,.55,d)*vAlpha);}`});
  const dropMesh=new THREE.Points(dropGeo,dropMat);dropMesh.frustumCulled=false;dropMesh.renderOrder=3;group.add(dropMesh);
  function addRipple(position,strength,tint){const i=rippleCursor++%rippleCount;centers.set([position.x,Math.max(-.005,(position.y??0)+.025),position.z],i*3);starts[i]=now;sizes[i]=.7+strength*.7;const c=color(tint??'#c2e1d5');c.toArray(rippleColors,i*3);for(const a of ['aCenter','aStart','aSize','aTint'])rippleGeo.attributes[a].needsUpdate=true;}
  function particles(position,strength,tint,isWater){const n=Math.min(90,Math.round(18+strength*21)),c=color(tint??(isWater?'#b2d7ce':'#d5bc80'));
    for(let i=0;i<n;i++){const id=dropCursor++%dropCount,d=drops[id],a=random()*TAU,s=(.6+random()*2.7)*Math.sqrt(strength);d.life=d.max=.5+random()*.8;d.vx=Math.cos(a)*s;d.vz=Math.sin(a)*s;d.vy=(1.5+random()*4)*Math.sqrt(strength);d.water=isWater;dropPos.set([position.x+(random()-.5)*.3,(position.y??0)+.12,position.z+(random()-.5)*.3],id*3);c.clone().multiplyScalar(.85+random()*.3).toArray(dropColor,id*3);dropSize[id]=(.045+random()*.085)*(isWater?1:.8);dropAlpha[id]=.9;}
    dropGeo.attributes.aColor.needsUpdate=true;dropGeo.attributes.aSize.needsUpdate=true;}
  function splash(position,strength=1,tint){strength=clamp(strength,.1,4);addRipple({x:position.x,y:.01,z:position.z},strength,tint);particles({x:position.x,y:.03,z:position.z},strength,tint,true);}
  function impact(position,tint='#e9cb87',strength=1){particles(position,strength,tint,false);}

  function roofGeometry(width,length,height,seedValue=1){const p=[],uv=[],idx=[],cols=[],r=rng(seedValue);const rows=16,columns=20;
    for(let z=0;z<=rows;z++)for(let x=0;x<=columns;x++){const u=x/columns*2-1,v=z/rows,y=.5+Math.sqrt(Math.max(0,1-u*u))*height+.06*Math.sin(v*23+u*5),xx=u*width*(.97+.025*Math.sin(v*19));p.push(xx,y,(v-.5)*length);uv.push(x/columns,z/rows);const c=color('#809549').multiplyScalar(.85+r()*.23);c.toArray(cols,cols.length);}
    for(let z=0;z<rows;z++)for(let x=0;x<columns;x++){const a=z*(columns+1)+x,b=a+columns+1;idx.push(a,b,a+1,b,b+1,a+1);}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));g.setIndex(idx);g.computeVertexNormals();return g;}
  function buildHut(scale,teamColor,owned){const g=new THREE.Group();const roofMat=new THREE.MeshStandardMaterial({color:'#a6bf76',map:leafMap,vertexColors:true,roughness:.78,side:THREE.DoubleSide});owned.push(roofMat);const roofGeo=roofGeometry(1.75,3.8,1.95,seed+Math.round(scale*7));owned.push(roofGeo);const roof=new THREE.Mesh(roofGeo,roofMat);roof.castShadow=true;roof.receiveShadow=true;g.add(roof);
    // Fibrous seam lines make the broad canopy read as overlapping leaves.
    for(let j=0;j<8;j++){const z=-1.85+j*.53,points=[];for(let k=0;k<=12;k++){const a=k/12*Math.PI;points.push([Math.cos(a)*1.75,.5+Math.sin(a)*1.96+.025,z+.025*Math.sin(a*4)]);}const rib=tube(points,.038,materials.reed,18);owned.push(rib.geometry);g.add(rib);}
    for(let side of [-1,1])for(let j=0;j<5;j++){const z=-1.6+j*.8;const pole=tube([[side*1.68,-.08,z],[side*1.7,.45,z],[side*1.38,1.5,z]],.052,materials.bark,5);owned.push(pole.geometry);g.add(pole);}
    for(let row=0;row<7;row++){const h=.16+row*.12,beam=tube([[-1.65,h,-1.8],[0,h+.025,-1.88],[1.65,h,-1.8]],.036,materials.reed,8);owned.push(beam.geometry);g.add(beam);}
    mergeStaticParts(g,owned,new Set([roof]));g.scale.setScalar(scale);g.userData.roof=roof;return g;}
  const teamColors={player:'#8ecf75',friendly:'#8ecf75',ally:'#8ecf75',enemy:'#cf7554',neutral:'#ceb785'};
  function teamColor(team){if(typeof team==='string'&&team.startsWith('enemy')){const shades=['#e8aa70','#d8786b','#b9ad81','#a9a0d4','#8dc2b8'],index=parseInt(team.replace(/\D/g,''),10)||0;return shades[index%shades.length];}return teamColors[team]||teamColors.neutral;}
  const bannerMaps=new Map();
  function bannerTexture(team){
    if(bannerMaps.has(team))return bannerMaps.get(team);
    const friendly=['player','ally','friendly'].includes(team),neutral=team==='neutral',variant=(parseInt(String(team).replace(/\D/g,''),10)||0)%5;
    const map=canvasTexture(256,(ctx,s)=>{
      ctx.fillStyle='#eee9cb';ctx.fillRect(0,0,s,s);
      for(let i=0;i<256;i+=4){ctx.fillStyle=i%8?'#ded9bd':'#f3eed3';ctx.fillRect(i,0,1,s);ctx.fillRect(0,i,s,1);}
      ctx.save();ctx.translate(38,23);ctx.scale(2.8,2.8);ctx.fillStyle=friendly?'#194333':neutral?'#494633':'#472c29';ctx.strokeStyle='#fff2c9';ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(32,3);ctx.lineTo(59,14);ctx.lineTo(56,44);ctx.quadraticCurveTo(53,55,32,68);ctx.quadraticCurveTo(11,55,8,44);ctx.lineTo(5,14);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.lineWidth=3.2;ctx.lineCap='round';ctx.lineJoin='round';
      const line=points=>{ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.stroke();};
      if(friendly){ctx.beginPath();ctx.moveTo(43,20);ctx.bezierCurveTo(28,17,18,26,21,38);ctx.bezierCurveTo(24,48,35,47,40,37);ctx.bezierCurveTo(43,30,40,24,43,20);ctx.stroke();line([[20,51],[37,27]]);line([[28,40],[23,32]]);line([[32,35],[39,34]]);}
      else if(neutral){line([[24,27],[32,19],[40,27]]);line([[32,19],[32,49]]);line([[23,40],[32,49],[41,40]]);}
      else if(variant===0){line([[20,19],[27,31],[22,44]]);line([[44,19],[37,31],[42,44]]);line([[28,46],[36,46]]);}
      else if(variant===1){line([[22,18],[18,36],[32,49],[46,36],[42,18]]);line([[25,30],[32,36],[39,30]]);}
      else if(variant===2){for(const [x,y] of [[21,20],[32,15],[43,20]]){line([[x,y],[x,49]]);line([[x-4,y+6],[x+4,y+6]]);}}
      else if(variant===3){ctx.beginPath();ctx.moveTo(44,17);ctx.bezierCurveTo(15,9,11,48,32,52);ctx.bezierCurveTo(39,53,44,50,47,45);ctx.bezierCurveTo(29,43,26,26,44,17);ctx.stroke();}
      else line([[18,24],[25,30],[32,17],[39,30],[46,24],[41,46],[23,46],[18,24]]);
      ctx.restore();
    });map.wrapS=map.wrapT=THREE.ClampToEdgeWrapping;bannerMaps.set(team,map);disposables.push(map);return map;
  }
  function buildFoundation(s,owned,yaw=0){
    const foundation=new THREE.Group();foundation.name='Woven reed courtyard and rooted foundations';
    const radius=5.68;
    // The irregular edges and crossed, curved timbers read as a constructed
    // platform. The upper weave is also the gameplay support surface.
    for(let i=0;i<43;i++){
      const z=-5.58+i*.266,span=Math.sqrt(Math.max(0,radius*radius-z*z))*(.97+.02*Math.sin(i*1.7));
      const plank=tube([[-span,-.045,z],[-span*.25,-.035,z+.022],[span*.4,-.04,z-.018],[span,-.045,z+.015]],.077,materials.bark,7);plank.receiveShadow=true;owned.push(plank.geometry);foundation.add(plank);
    }
    for(let i=0;i<25;i++){
      const x=-5.4+i*.45,span=Math.sqrt(Math.max(0,radius*radius-x*x))*.98;
      const tie=tube([[x,.018,-span],[x+.025,.028,0],[x-.018,.02,span]],.027,materials.reed,10);owned.push(tie.geometry);foundation.add(tie);
    }
    for(let i=0;i<16;i++){
      const a=i/16*TAU,x=Math.cos(a)*5.1,z=Math.sin(a)*5.1;
      const ground=(terrainHeight(s.position.x+(x*Math.cos(yaw)+z*Math.sin(yaw))*SHELTER_SCALE,s.position.z+(z*Math.cos(yaw)-x*Math.sin(yaw))*SHELTER_SCALE)-s.position.y)/SHELTER_SCALE;
      const post=tube([[x,Math.min(-.18,ground-.15),z],[x+.03,-.35,z-.02],[x,-.08,z]],.095,materials.bark,5);owned.push(post.geometry);foundation.add(post);
    }
    mergeStaticParts(foundation,owned);s.add(foundation);s.userData.foundation=foundation;
  }
  function makeBanner(team,owned){const g=new THREE.Group(),pole=tube([[0,0,0],[.04,1.6,0],[-.03,3.1,.02]],.047,materials.bark,7);owned.push(pole.geometry);g.add(pole);
    const geo=new THREE.BufferGeometry(),p=[0,2.93,0,.9,2.8,.09,1.13,2.12,.02,.6,2.25,-.03,0,2.18,0],uv=[0,1,1,1,1,0,.5,.1,0,0];geo.setAttribute('position',new THREE.Float32BufferAttribute(p,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex([0,1,3,1,2,3,0,3,4]);geo.computeVertexNormals();const mat=new THREE.MeshStandardMaterial({color:teamColor(team),roughness:.8,side:THREE.DoubleSide,map:bannerTexture(team)});const flag=new THREE.Mesh(geo,mat);flag.castShadow=true;g.add(flag);g.userData.flag=flag;g.userData.emblemTeam=team;owned.push(geo,mat);return g;}

  // Every settlement is an enclosed castle from its first construction. The
  // purchased palisade reinforces the entire perimeter, never one wall panel.
  function buildFortifications(s,data,owned){
    const radius=FORT_RADIUS,gateWidth=GATE_WIDTH,wallHeight=WALL_HEIGHT,floor=.11;
    const fort=new THREE.Group();fort.name='Enclosed creek castle';s.add(fort);
    const upgrade=new THREE.Group();upgrade.name='Reinforced castle perimeter';s.add(upgrade);
    const arcStart=Math.asin((gateWidth/2+.25)/radius),segments=44,step=(TAU-arcStart*2)/segments,baseBoxes=[],armorBoxes=[];
    const ringWidth=2*(radius+.65)*Math.tan(step/2)+.08;
    for(let i=0;i<segments;i++){
      const a=arcStart+step*(i+.5),x=Math.sin(a)*radius,z=Math.cos(a)*radius;
      baseBoxes.push({x,z,y:floor+wallHeight/2,w:ringWidth,h:wallHeight,d:WALL_THICKNESS,ry:a});
      for(const offset of [-.29,.29]){
        const b=a+step*offset;baseBoxes.push({x:Math.sin(b)*radius,z:Math.cos(b)*radius,y:floor+wallHeight+.37,w:.76,h:.74,d:1.2,ry:b});
      }
      armorBoxes.push({x:Math.sin(a)*(radius+.64),z:Math.cos(a)*(radius+.64),y:floor+1.65,w:ringWidth*.7,h:3.1,d:.5,ry:a});
      armorBoxes.push({x:Math.sin(a)*(radius+.4),z:Math.cos(a)*(radius+.4),y:floor+3.5,w:ringWidth*1.01,h:.28,d:.9,ry:a});
    }
    const towerAngles=[Math.PI/4,Math.PI*3/4,Math.PI*5/4,Math.PI*7/4],towerData=[];
    for(const a of towerAngles){
      const tx=Math.sin(a)*(radius+.15),tz=Math.cos(a)*(radius+.15);towerData.push({x:tx,z:tz});
      for(let j=0;j<10;j++){
        const b=j/10*TAU;baseBoxes.push({x:tx+Math.sin(b)*1.42,z:tz+Math.cos(b)*1.42,y:floor+6.15,w:.6,h:.85,d:.66,ry:b});
      }
    }
    // Gate posts sit entirely outside the 6.8 m clear opening. A low lintel
    // leaves room for frogs; the two doors hinge outward when the gate opens.
    for(const side of [-1,1]){
      baseBoxes.push({x:side*(gateWidth/2+.62),z:radius,y:floor+2.8,w:1.24,h:5.6,d:2.0});
      baseBoxes.push({x:side*(gateWidth/2+.62),z:radius,y:floor+5.95,w:1.6,h:.7,d:2.35});
      armorBoxes.push({x:side*(gateWidth/2+.62),z:radius+1.05,y:floor+2.4,w:1.32,h:4.8,d:.25});
    }
    baseBoxes.push({x:0,z:radius,y:floor+4.85,w:gateWidth+1.2,h:.78,d:1.75});
    const boxes=(parent,name,specs,material)=>{
      const geo=new THREE.BoxGeometry(1,1,1),mesh=new THREE.InstancedMesh(geo,material,specs.length);owned.push(geo);mesh.name=name;mesh.castShadow=true;mesh.receiveShadow=true;
      specs.forEach((p,i)=>{object.position.set((p.x||0)/SHELTER_SCALE,(p.y||0)/SHELTER_SCALE,(p.z||0)/SHELTER_SCALE);object.rotation.set(p.rx||0,p.ry||0,p.rz||0);object.scale.set(p.w/SHELTER_SCALE,p.h/SHELTER_SCALE,p.d/SHELTER_SCALE);object.updateMatrix();mesh.setMatrixAt(i,object.matrix);});parent.add(mesh);return mesh;
    };
    const walls=boxes(fort,'Continuous moss-stone walls and crenellations',baseBoxes,materials.mossRock);
    boxes(upgrade,'Whole-ring stone buttresses and gate reinforcement',armorBoxes,materials.rock);
    const towerGeo=new THREE.CylinderGeometry(1,1.12,1,12,1),towers=new THREE.InstancedMesh(towerGeo,materials.mossRock,4);owned.push(towerGeo);towers.name='Four castle defence towers';towers.castShadow=true;towers.receiveShadow=true;
    towerData.forEach((p,i)=>{object.position.set(p.x/SHELTER_SCALE,(floor+2.9)/SHELTER_SCALE,p.z/SHELTER_SCALE);object.rotation.set(0,towerAngles[i],0);object.scale.set(1.65/SHELTER_SCALE,5.8/SHELTER_SCALE,1.65/SHELTER_SCALE);object.updateMatrix();towers.setMatrixAt(i,object.matrix);});fort.add(towers);
    const towerLeafGeo=leafGeometry(1,1,.28),towerLeaves=new THREE.InstancedMesh(towerLeafGeo,materials.leaf,4);owned.push(towerLeafGeo);towerLeaves.name='Folded leaf tower roofs';towerLeaves.castShadow=true;
    towerData.forEach((p,i)=>{object.position.set(p.x/SHELTER_SCALE,(floor+6.68)/SHELTER_SCALE,p.z/SHELTER_SCALE);object.rotation.set(0,towerAngles[i],0);object.scale.set(2.0/SHELTER_SCALE,2.4/SHELTER_SCALE,2.0/SHELTER_SCALE);object.updateMatrix();towerLeaves.setMatrixAt(i,object.matrix);});fort.add(towerLeaves);
    const gate=new THREE.Group();gate.name='Working south castle gate';gate.position.set(0,floor/SHELTER_SCALE,radius/SHELTER_SCALE);fort.add(gate);
    const leaves=[];
    for(const side of [-1,1]){
      const hinge=new THREE.Group();hinge.position.x=side*gateWidth/(2*SHELTER_SCALE);hinge.name=side<0?'Left hinged gate':'Right hinged gate';gate.add(hinge);
      const leafBoxes=[],braceBoxes=[],half=gateWidth/2;
      for(let i=0;i<7;i++)leafBoxes.push({x:-side*((i+.5)*half/7),y:wallHeight/2,z:0,w:half/7+.025,h:wallHeight-.08,d:.36});
      for(const y of [.65,1.9,3.2])braceBoxes.push({x:-side*half/2,y,z:.23,w:half-.1,h:.22,d:.2});
      boxes(hinge,'Bound timber gate leaf',leafBoxes,materials.bark);boxes(hinge,'Gate cross braces',braceBoxes,materials.reed);leaves.push(hinge);
    }
    const fallen=new THREE.Group();fallen.name='Breached gate fallen slabs';gate.add(fallen);
    boxes(fallen,'Broken gate timber',[
      {x:-1.45,y:.18,z:1.5,w:2.8,h:.3,d:3.5,ry:.18},
      {x:1.6,y:.23,z:.9,w:2.7,h:.35,d:3.2,ry:-.24}
    ],materials.bark);
    const crestGeo=new THREE.PlaneGeometry(1.7/SHELTER_SCALE,1.9/SHELTER_SCALE),crestMat=new THREE.MeshStandardMaterial({map:bannerTexture(data.team),color:teamColor(data.team),side:THREE.DoubleSide,roughness:.85});owned.push(crestGeo,crestMat);
    const crest=new THREE.Mesh(crestGeo,crestMat);crest.name='Castle gate clan crest';crest.position.set(0,(floor+5.2)/SHELTER_SCALE,(radius+1.02)/SHELTER_SCALE);fort.add(crest);
    s.userData.fortification=fort;s.userData.palisade=upgrade;s.userData.gate=gate;s.userData.gateLeaves=leaves;s.userData.fallenGate=fallen;s.userData.gateCrest=crest;s.userData.fortWalls=walls;s.userData.fortTowers=towers;
    s.userData.fortificationGeometry={radius,gateWidth,wallHeight,gateDirection:{x:0,z:1},towerCount:4};
    return fort;
  }

  function buildKeep(owned){
    const keep=buildHut(1,teamColors.ally,owned);keep.name='Stone keep beneath woven leaf roof';
    keep.userData.groundWalls=[];
    const body=new THREE.Group();body.name='Enclosed central keep';
    const block=(x,y,z,w,h,d,mat=materials.mossRock)=>{const geo=new THREE.BoxGeometry(w,h,d),mesh=new THREE.Mesh(geo,mat);owned.push(geo);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;body.add(mesh);if(y-h/2<.03)keep.userData.groundWalls.push({minX:x-w/2,maxX:x+w/2,minZ:z-d/2,maxZ:z+d/2,height:y+h/2});};
    block(-1.6,.68,0,.26,1.36,3.45);block(1.6,.68,0,.26,1.36,3.45);block(0,.68,-1.65,3.05,1.36,.25);
    for(const side of [-1,1])block(side*1.14,.68,1.64,.9,1.36,.26);
    block(0,1.22,1.64,1.45,.28,.27);
    // Short corner turrets sit inside the existing reserved main-keep footprint.
    for(const x of [-1.23,1.23])for(const z of [-1.34,1.34]){
      block(x,1.36,z,.58,2.72,.58);
      for(const dx of [-.2,.2])for(const dz of [-.2,.2])block(x+dx,2.83,z+dz,.19,.3,.19,materials.rock);
    }
    mergeStaticParts(body,owned);keep.add(body);return keep;
  }
  function refreshGroundDecor(terrace){
    const reach=CASTLE_GROUND_RADIUS+CASTLE_BANK_BLEND+3,near=p=>Math.hypot(p.x-terrace.x,p.z-terrace.z)<reach;
    const inCourtyard=p=>[...castleTerraces.values()].some(t=>Math.hypot(p.x-t.x,p.z-t.z)<CASTLE_GROUND_RADIUS-2);
    vegetation.forEach((p,i)=>{if(!near(p))return;object.position.set(p.x,terrainHeight(p.x,p.z),p.z);object.rotation.set(0,p.angle,0);object.scale.set(.65+p.scale*.25,p.scale,.65+p.scale*.25);if(inCourtyard(p))object.scale.setScalar(0);object.updateMatrix();reedMesh.setMatrixAt(i,object.matrix);});reedMesh.finish();
    cattails.forEach((p,i)=>{if(!near(p))return;object.position.set(p.x+.12,terrainHeight(p.x,p.z),p.z);object.rotation.set(0,p.angle,0);object.scale.setScalar(inCourtyard(p)?0:.7+p.scale*.4);object.updateMatrix();catMesh.setMatrixAt(i,object.matrix);});catMesh.finish();
    hotspots.forEach((spot,i)=>{if(!near(spot))return;spot.y=surface(spot.x,spot.z).height+.25;spotMounds[i].position.y=spot.y-.2;spotMounds[i].updateMatrix();});
    fruitInstances.forEach((p,i)=>{if(!near(p))return;object.position.set(p.x,hotspots[p.spot].y-.25+p.groundOffset,p.z);object.rotation.set(.3,p.rot,.2);object.scale.setScalar(p.scale);object.updateMatrix();fruitMesh.setMatrixAt(i,object.matrix);});fruitMesh.instanceMatrix.needsUpdate=true;fruitMesh.computeBoundingBox();fruitMesh.computeBoundingSphere();
  }
  function shelterLandHeight(x,z){
    for(const terrace of castleTerraces.values())if(Math.hypot(terrace.x-x,terrace.z-z)<.01)return terrace.elevation;
    const authored=campSites.find(site=>Math.hypot(site.x-x,site.z-z)<.01);
    let elevation=authored?Math.fround(authored.elevation):Math.max(.35,sampleHeight(x,z));
    if(!authored){
      // Place the floor above every triangle in the footprint, including a
      // neighbouring slope, then fill the bank beneath it. This never relies
      // on an invisible support disc below otherwise floating walls.
      const reach=CASTLE_GROUND_RADIUS+terrainStep,minX=Math.max(0,Math.floor((x-reach+terrainHalf)/terrainStep)),maxX=Math.min(216,Math.ceil((x+reach+terrainHalf)/terrainStep)),minZ=Math.max(0,Math.floor((z-reach+terrainHalf)/terrainStep)),maxZ=Math.min(216,Math.ceil((z+reach+terrainHalf)/terrainStep));
      for(let row=minZ;row<=maxZ;row++)for(let col=minX;col<=maxX;col++){const i=row*terrainStride+col;if(Math.hypot(tp.getX(i)-x,tp.getZ(i)-z)<=reach)elevation=Math.max(elevation,tp.getY(i));}
    }
    return elevation;
  }
  function addCastleLand(data){
    const elevation=shelterLandHeight(data.x,data.z);
    const terrace={id:data.id,x:data.x,z:data.z,elevation};castleTerraces.set(data.id,terrace);refreshTerrain(terrace);refreshGroundDecor(terrace);return terrace;
  }
  function createShelter(data,buildOptions={}){
    const preview=!!buildOptions.preview;
    const terrace=preview?null:addCastleLand(data);
    const s=new THREE.Group();s.name='Shelter '+(data.id??'');s.position.set(data.x,terrace?.elevation??0,data.z);s.scale.setScalar(SHELTER_SCALE);s.userData.id=data.id;s.userData.radius=SHELTER_RADIUS;s.userData.owned=[];s.userData.terrain=terrace;const owned=s.userData.owned;
    buildFoundation(s,owned,Number.isFinite(data.yaw)?data.yaw:0);
    if(!preview){s.userData.support=insertPlatform({id:'shelter-'+data.id,type:'shelter',x:data.x,z:data.z,y:s.position.y+.11,radius:SHELTER_RADIUS-.2});s.userData.landmark=insertPlatform({id:'castle-land-'+data.id,type:'land',x:data.x,z:data.z,y:s.position.y,radius:CASTLE_GROUND_RADIUS+CASTLE_BANK_BLEND*.45});}
    buildFortifications(s,data,owned);
    const core=buildKeep(owned);core.position.set(-.55,.04,-.5);s.add(core);s.userData.core=core;
    s.userData.keepCollision={rects:core.userData.groundWalls.map(r=>({minX:(r.minX+core.position.x)*SHELTER_SCALE,maxX:(r.maxX+core.position.x)*SHELTER_SCALE,minZ:(r.minZ+core.position.z)*SHELTER_SCALE,maxZ:(r.maxZ+core.position.z)*SHELTER_SCALE,height:(r.height+core.position.y)*SHELTER_SCALE})),door:{x:core.position.x*SHELTER_SCALE,z:(core.position.z+1.64)*SHELTER_SCALE}};
    const banner=makeBanner(data.team,owned);banner.position.set(1.8,0,1.1);s.add(banner);s.userData.banner=banner;
    const extra=new THREE.Group();extra.name='Additional sleeping leaves';const hut2=buildHut(.62,teamColors[data.team],owned);hut2.position.set(-3,.01,.2);hut2.rotation.y=-.5;extra.add(hut2);s.add(extra);s.userData.extra=extra;
    const nursery=new THREE.Group();nursery.name='Hatchery';const nestHut=buildHut(.52,teamColors[data.team],owned);nestHut.position.set(3.05,0,-1.8);nestHut.rotation.y=.7;nursery.add(nestHut);
    // A woven circular nursery with damp leaves below its smaller canopy.
    for(let ring=0;ring<5;ring++){const pts=[];for(let i=0;i<=24;i++){const a=i/24*TAU;pts.push([3.05+Math.cos(a)*.74,.06+ring*.065,-1.7+Math.sin(a)*.63]);}const nest=tube(pts,.035,materials.reed,25);owned.push(nest.geometry);nursery.add(nest);}mergeStaticParts(nursery,owned);s.add(nursery);s.userData.nursery=nursery;
    const training=new THREE.Group();training.name='Leaf training yard and woven sparring dummies';training.position.set(-2.9,.07,-3.2);
    for(let i=0;i<3;i++){
      const x=-.82+i*.8,z=i%2?-.2:.2;
      const pad=new THREE.Mesh(leafGeometry(.46,.65,.04),materials.leaf);pad.position.set(x,.025,z+.6);pad.rotation.y=(i-1)*.35;owned.push(pad.geometry);training.add(pad);
      for(const dx of [-.21,.21]){const leg=tube([[x+dx,-.02,z-.25],[x+dx*.3,.48,z-.3],[x,.96,z-.25]],.035,materials.bark,5);owned.push(leg.geometry);training.add(leg);}
      const cross=tube([[x-.4,.64,z-.2],[x,.72,z-.28],[x+.4,.64,z-.2]],.041,materials.reed,6);owned.push(cross.geometry);training.add(cross);
      // Folded, overlapping practice leaves wrap a wooden body. Paired reed
      // loops suggest a frog head without pretending the target is a live frog.
      for(let j=0;j<3;j++){const wrap=new THREE.Mesh(leafGeometry(.23,.37,.15),materials.leaf);wrap.position.set(x+(j-1)*.06,.59,z-.19);wrap.rotation.set(Math.PI/2,(j-1)*.25,(j-1)*.3);owned.push(wrap.geometry);training.add(wrap);}
      for(const dx of [-.12,.12]){const loop=tube([[x+dx,.89,z-.22],[x+dx*1.45,1.09,z-.22],[x+dx*.5,1.07,z-.19],[x+dx,.89,z-.22]],.025,materials.reed,10);owned.push(loop.geometry);training.add(loop);}
    }
    for(const x of [-1.2,1.2]){const post=tube([[x,-.04,-.65],[x*.98,.75,-.68],[x,.98,-.65]],.04,materials.bark,5);owned.push(post.geometry);training.add(post);}
    for(let j=0;j<2;j++){const rail=tube([[-1.2,.45+j*.28,-.65],[0,.38+j*.28,-.7],[1.2,.45+j*.28,-.65]],.025,materials.reed,10);owned.push(rail.geometry);training.add(rail);}
    mergeStaticParts(training,owned);s.add(training);s.userData.training=training;
    s.userData.trainingPoint=new THREE.Vector3(data.x-2.9*SHELTER_SCALE,s.position.y+.12,data.z-2.5*SHELTER_SCALE);
    const storage=new THREE.Group();storage.name='Leaf-wrapped food cache';storage.position.set(-2.8,.04,2.2);const foodMesh=new THREE.InstancedMesh(fruitGeo,materials.fruit,15);
    for(let i=0;i<15;i++){object.position.set((i%4)*.32-.5,Math.floor(i/8)*.25+.15,Math.floor(i/4)%2*.35);object.scale.setScalar(.22+(i%3)*.025);object.rotation.set(i*.7,i*.4,0);object.updateMatrix();foodMesh.setMatrixAt(i,object.matrix);foodMesh.setColorAt(i,color(i%3?'#b7b06c':'#6d673f'));}storage.add(foodMesh);
    for(let j=0;j<3;j++){const log=tube([[-.85,.05,-.3+j*.45],[0,.02,-.3+j*.45],[.85,.08,-.3+j*.45]],.075,materials.bark,5);owned.push(log.geometry);storage.add(log);}const cover=new THREE.Mesh(leafGeometry(1,.8,.23),materials.leaf);cover.position.set(0,.5,.1);cover.rotation.z=.17;owned.push(cover.geometry);storage.add(cover);mergeStaticParts(storage,owned);s.add(storage);s.userData.storage=storage;s.userData.foodMesh=foodMesh;s.userData.storageCover=cover;
    const watch=new THREE.Group();watch.name='Lookout perch';watch.position.set(3.1,0,2.5);
    for(let k=0;k<3;k++){const a=k/3*TAU,post=tube([[Math.cos(a)*.7,-.1,Math.sin(a)*.7],[Math.cos(a)*.44,1.4,Math.sin(a)*.44],[Math.cos(a)*.35,2.65,Math.sin(a)*.35]],.085,materials.bark,7);owned.push(post.geometry);watch.add(post);}
    for(let k=0;k<8;k++){const z=-.6+k*.17,beam=tube([[-.7,2.35,z],[0,2.32,z],[.7,2.36,z]],.06,materials.reed,4);owned.push(beam.geometry);watch.add(beam);}
    const canopy=new THREE.Mesh(leafGeometry(1.1,.9,.08),materials.leaf);canopy.position.y=3.15;canopy.rotation.x=.17;owned.push(canopy.geometry);watch.add(canopy);
    for(let k=0;k<6;k++){const rung=tube([[-.25,k*.34,.63],[.25,k*.34,.63]],.035,materials.reed,2);owned.push(rung.geometry);watch.add(rung);}mergeStaticParts(watch,owned);s.add(watch);s.userData.watchtower=watch;
    const stones=new THREE.InstancedMesh(rockGeos[1],materials.mossRock,25);for(let i=0;i<25;i++){const a=i/25*TAU;object.position.set(Math.cos(a)*2.15,-.12,Math.sin(a)*2.35-.5);object.rotation.set(0,a,0);object.scale.set(.25,.25,.25);object.updateMatrix();stones.setMatrixAt(i,object.matrix);}s.add(stones);
    // Ruins are a separate low silhouette: torn roofing, snapped ribs and the
    // fallen banner. The original meshes stay intact for an exact rebuild.
    const ruin=new THREE.Group();ruin.name='Collapsed shelter remains';const fallenMat=new THREE.MeshStandardMaterial({color:'#839061',map:leafMap,roughness:.94,side:THREE.DoubleSide});owned.push(fallenMat);
    for(let i=0;i<6;i++){
      const g=roofGeometry(.62+(i%3)*.16,1.35+(i%2)*.55,.14+(i%3)*.05,seed+i*19),leaf=new THREE.Mesh(g,fallenMat);
      leaf.position.set(-1.3+(i%3)*.85,-.46+(i%2)*.04,-1.5+Math.floor(i/3)*1.7);leaf.rotation.set((i%2-.5)*.24,i*1.71,(i%3-1)*.13);leaf.castShadow=true;owned.push(g);ruin.add(leaf);
    }
    for(let i=0;i<22;i++){
      const a=i*2.399,len=.65+(i%5)*.27,x=Math.cos(a)*(i<14?1.2:3.4),z=Math.sin(a)*(i<14?1.6:2.8)-.3;
      const beam=tube([[x,.055,z],[x+Math.cos(a+.7)*len*.6,.11+(i%3)*.07,z+Math.sin(a+.7)*len*.6],[x+Math.cos(a+.7)*len,.04+(i%4)*.06,z+Math.sin(a+.7)*len]],i%2?.045:.065,i%2?materials.reed:materials.bark,4);
      beam.castShadow=true;owned.push(beam.geometry);ruin.add(beam);
    }
    mergeStaticParts(ruin,owned);s.add(ruin);s.userData.ruin=ruin;
    const looseLoot=new THREE.InstancedMesh(fruitGeo,materials.fruit,8);looseLoot.name='Supplies exposed in the ruins';
    for(let i=0;i<8;i++){object.position.set(-.5+(i%4)*.29,.12+Math.floor(i/4)*.08,1.35+Math.floor(i/4)*.31);object.rotation.set(i*.43,i*1.31,.2);object.scale.setScalar(.16+(i%3)*.025);object.updateMatrix();looseLoot.setMatrixAt(i,object.matrix);looseLoot.setColorAt(i,color(i%2?'#a99958':'#d9a253'));}s.add(looseLoot);s.userData.looseLoot=looseLoot;
    const lampMat=new THREE.MeshStandardMaterial({color:'#edc371',emissive:'#e5a64c',emissiveIntensity:.7,roughness:.7});owned.push(lampMat);const lamp=new THREE.Mesh(fruitGeo,lampMat);lamp.position.set(1.7,.55,1.1);lamp.scale.set(.15,.22,.15);s.add(lamp);s.userData.lamp=lamp;
    // A small warm point light makes camp silhouettes readable after sunset.
    const light=new THREE.PointLight('#ffd098',1.8,25,2);light.position.set(0,2.3,1.8);s.add(light);s.userData.light=light;
    // Every placeable pivot is the real rendered XZ centre. Offsetting the old
    // subgroup underneath it preserves the exact geometry of legacy layouts.
    s.updateMatrixWorld(true);s.userData.buildingGroups={};s.userData.defaultPlacements={};
    for(const [type,key] of Object.entries({store:'storage',nursery:'nursery',watchtower:'watchtower',training:'training'})){
      const body=s.userData[key],bounds=new THREE.Box3().setFromObject(body),centre=s.worldToLocal(bounds.getCenter(new THREE.Vector3())),pivot=new THREE.Group();
      pivot.name=body.name+' placement';pivot.position.set(centre.x,body.position.y,centre.z);s.add(pivot);body.position.sub(pivot.position);pivot.add(body);s.userData[key]=pivot;
      s.userData.buildingGroups[type]=pivot;s.userData.defaultPlacements[type]={x:centre.x*SHELTER_SCALE,z:centre.z*SHELTER_SCALE,yaw:0};
    }
    s.updateMatrixWorld(true);const coreBounds=new THREE.Box3().setFromObject(core),coreCentre=s.worldToLocal(coreBounds.getCenter(new THREE.Vector3())),coreSize=coreBounds.getSize(new THREE.Vector3());
    s.userData.coreFootprint={x:coreCentre.x*SHELTER_SCALE,z:coreCentre.z*SHELTER_SCALE,width:coreSize.x,depth:coreSize.z};
    if(!preview){group.add(s);shelters.add(s);}updateShelter(s,data);
    const movingMeshes=new Set([s.userData.core.userData.roof,s.userData.storageCover,s.userData.banner.userData.flag]);
    s.traverse(o=>{if(o.isMesh&&!movingMeshes.has(o)){o.updateMatrix();o.matrixAutoUpdate=false;}});
    return s;
  }
  function updateShelter(s,data={}){if(!s)return;
    const previous=s.userData.visualState||{},state={...previous,...data},tier=Math.max(1,state.tier??1),b=state.buildings||{},health=clamp((state.hp??state.maxHp??100)/(state.maxHp??100),0,1),destroyed=!!state.destroyed||health<=0;
    const team=state.team??previous.team??'neutral';
    // Retain only render data, never the gameplay mesh reference or a cycle.
    const placements={};for(const [type,p] of Object.entries(state.buildingPlacements||{}))if(s.userData.buildingGroups[type]&&p&&Number.isFinite(p.x)&&Number.isFinite(p.z)&&Number.isFinite(p.yaw??0))placements[type]={x:p.x,z:p.z,yaw:p.yaw??0};
    s.userData.visualState={team,tier,hp:state.hp,maxHp:state.maxHp,buildings:{...b},buildingPlacements:placements,yaw:Number.isFinite(state.yaw)?state.yaw:0,storage:state.storage,resources:state.resources,lootTaken:!!state.lootTaken,gateHp:state.gateHp,gateOpen:!!state.gateOpen,destroyed};
    s.rotation.y=s.userData.visualState.yaw;
    for(const [type,node] of Object.entries(s.userData.buildingGroups)){const p=placements[type]||s.userData.defaultPlacements[type];node.position.x=p.x/SHELTER_SCALE;node.position.z=p.z/SHELTER_SCALE;node.rotation.y=p.yaw;}
    const training=s.userData.buildingGroups.training;s.updateMatrixWorld(true);s.userData.trainingPoint.copy(training.getWorldPosition(new THREE.Vector3()));s.userData.trainingPoint.y=s.position.y+.12;
    s.userData.team=team;s.userData.tier=tier;s.userData.health=health;s.userData.destroyed=destroyed;
    s.userData.banner.userData.flag.material.color.set(teamColor(team));
    if(s.userData.banner.userData.emblemTeam!==team){s.userData.banner.userData.flag.material.map=bannerTexture(team);s.userData.banner.userData.flag.material.needsUpdate=true;s.userData.banner.userData.emblemTeam=team;}
    s.userData.gateCrest.material.color.set(teamColor(team));s.userData.gateCrest.material.map=bannerTexture(team);
    const hasStore=!!(b.storage??b.store??false);
    s.userData.core.visible=!destroyed;s.userData.extra.visible=!destroyed&&tier>=2;s.userData.ruin.visible=destroyed;
    s.userData.nursery.visible=!destroyed&&!!(b.nursery||b.hatchery||b.spawn||b.breeding);
    s.userData.training.visible=!destroyed&&!!(b.training||b.trainingGround||b.drill);
    s.userData.watchtower.visible=!destroyed&&!!(b.watchtower||b.tower||b.guards);
    const hasPalisade=!destroyed&&!!(b.palisade||b.walls||b.wall||b.defense);
    s.userData.fortification.visible=!destroyed;s.userData.palisade.visible=hasPalisade;
    const breached=Number.isFinite(state.gateHp)&&state.gateHp<=0;
    s.userData.gate.userData.breached=breached;s.userData.gate.userData.open=!!state.gateOpen;
    s.userData.fallenGate.visible=breached;
    for(let i=0;i<2;i++){const leaf=s.userData.gateLeaves[i];leaf.visible=!breached;leaf.rotation.y=state.gateOpen?(i===0?-1:1)*Math.PI*.52:0;}
    s.userData.core.rotation.z=destroyed?0:(1-health)*.09;s.userData.core.userData.roof.scale.y=destroyed?1:.78+.22*health;
    let amount=typeof state.storage==='number'?state.storage:(state.storage?.food??state.resources??0);if(!Number.isFinite(amount))amount=0;amount=Math.max(0,amount);
    const hasLoot=amount>0&&!state.lootTaken;
    s.userData.storage.visible=hasStore&&(!destroyed||hasLoot);s.userData.storage.rotation.z=destroyed?-.08:0;
    s.userData.foodMesh.count=destroyed&&!hasLoot?0:Math.min(15,Math.ceil(amount/8));
    s.userData.storageCover.position.set(destroyed?-.65:0,destroyed?.1:.5,destroyed?.52:.1);s.userData.storageCover.rotation.set(destroyed?.28:0,0,destroyed?-.32:.17);
    s.userData.looseLoot.visible=destroyed&&hasLoot&&!hasStore;s.userData.looseLoot.count=Math.min(8,Math.ceil(amount/5));
    s.userData.banner.position.y=destroyed?.035:0;s.userData.banner.rotation.set(destroyed?.08:0,destroyed?.35:0,destroyed?1.49:health<.25?.22:0);
    s.userData.lamp.visible=!destroyed;if(destroyed)s.userData.light.visible=false;
    s.userData.collisionRevision=(s.userData.collisionRevision||0)+1;
  }
  function removeShelter(s){if(!s)return;if(buildArea?.userData.camp===s)hideBuildArea();group.remove(s);shelters.delete(s);for(const support of [s.userData.support,s.userData.landmark])if(support){const at=platforms.indexOf(support);if(at>=0)platforms.splice(at,1);for(const list of buckets.values()){const i=list.indexOf(support);if(i>=0)list.splice(i,1);}}const terrace=s.userData.terrain;if(terrace){castleTerraces.delete(terrace.id);refreshTerrain(terrace);refreshGroundDecor(terrace);}s.traverse(o=>{if(o.isInstancedMesh)o.dispose();});for(const d of s.userData.owned||[])d.dispose?.();}

  /** Real construction geometry, built once per placement session, with no support/collision registration. */
  function createBuildingPreview(type){
    if(!['shelter','store','nursery','watchtower','training'].includes(type))return null;
    const preview=createShelter({id:'construction-preview',x:0,z:0,team:'ally',tier:1,hp:350,maxHp:350,buildings:{},storage:{food:80}},{preview:true});
    preview.name='Construction preview: '+type;preview.userData.previewType=type;preview.userData.previewMaterials=[];
    if(type!=='shelter'){
      const selected=preview.userData.buildingGroups[type];
      for(const child of preview.children)child.visible=child===selected;
      selected.visible=true;selected.position.x=selected.position.z=0;selected.rotation.y=0;
    }
    const materialCopies=new Map();
    preview.traverse(object=>{
      if(object.isLight){object.visible=false;return;}
      if(!object.isMesh)return;object.castShadow=false;object.receiveShadow=false;object.renderOrder=8;
      const copy=source=>{
        if(materialCopies.has(source))return materialCopies.get(source);
        const material=source.clone();material.transparent=true;material.opacity=.46;material.depthWrite=false;material.polygonOffset=true;material.polygonOffsetFactor=-1;material.polygonOffsetUnits=-1;
        materialCopies.set(source,material);preview.userData.previewMaterials.push(material);preview.userData.owned.push(material);return material;
      };
      object.material=Array.isArray(object.material)?object.material.map(copy):copy(object.material);
    });
    buildingPreviews.add(preview);group.add(preview);setBuildingPreview(preview,{x:0,y:0,z:0,yaw:0,valid:false});preview.visible=false;return preview;
  }
  function setBuildingPreview(preview,{x,y,z,yaw=0,valid=false}={}){
    if(!preview?.userData.previewType)return;
    if(Number.isFinite(x))preview.position.x=x;if(Number.isFinite(y))preview.position.y=y;if(Number.isFinite(z))preview.position.z=z;
    preview.rotation.y=Number.isFinite(yaw)?yaw:0;preview.visible=true;
    if(preview.userData.previewValid!==!!valid){
      preview.userData.previewValid=!!valid;
      for(const material of preview.userData.previewMaterials){material.color?.set(valid?'#69ed89':'#ef665b');material.emissive?.set(valid?'#266c37':'#782d27');if('emissiveIntensity' in material)material.emissiveIntensity=.4;}
    }
  }
  function removeBuildingPreview(preview){if(!preview||!buildingPreviews.has(preview))return;buildingPreviews.delete(preview);preview.removeFromParent();removeShelter(preview);}
  function hideBuildArea(){
    if(!buildArea)return;buildArea.removeFromParent();const geometry=new Set(),material=new Set();
    buildArea.traverse(o=>{if(o.geometry)geometry.add(o.geometry);if(o.material)material.add(o.material);});for(const g of geometry)g.dispose();for(const m of material)m.dispose();buildArea=null;
  }
  /** A temporary courtyard grid and reserved hut footprints, shown only while building. */
  function showBuildArea(camp){
    const s=camp?.mesh||camp;if(!s?.isObject3D){hideBuildArea();return null;}if(buildArea?.userData.camp===s)return buildArea;hideBuildArea();
    buildArea=new THREE.Group();buildArea.name='Construction courtyard guide';buildArea.userData.camp=s;const r=(SHELTER_RADIUS-.2)/SHELTER_SCALE,y=.075;
    const line=(points,tint,opacity,loop=false)=>{
      const geometry=new THREE.BufferGeometry().setFromPoints(points),material=new THREE.LineBasicMaterial({color:tint,transparent:true,opacity,depthWrite:false});
      const object=loop?new THREE.LineLoop(geometry,material):new THREE.LineSegments(geometry,material);object.renderOrder=6;buildArea.add(object);return object;
    };
    const perimeter=[];for(let i=0;i<96;i++){const a=i/96*TAU;perimeter.push(new THREE.Vector3(Math.cos(a)*r,y,Math.sin(a)*r));}line(perimeter,'#9fe5af',.78,true);
    const grid=[];for(let k=-7;k<=7;k++){const n=k*.7;if(Math.abs(n)>=r)continue;const span=Math.sqrt(r*r-n*n);grid.push(new THREE.Vector3(n,y,-span),new THREE.Vector3(n,y,span),new THREE.Vector3(-span,y,n),new THREE.Vector3(span,y,n));}line(grid,'#b7ddbc',.22);
    const footprint=(f,name)=>{
      const cx=f.x/SHELTER_SCALE,cz=f.z/SHELTER_SCALE,hw=f.width/(2*SHELTER_SCALE)+.025,hd=f.depth/(2*SHELTER_SCALE)+.025,c=Math.cos(f.yaw||0),a=Math.sin(f.yaw||0),top=y+.012;
      const point=(x,z)=>new THREE.Vector3(cx+x*c+z*a,top,cz+z*c-x*a);
      line([point(-hw,-hd),point(hw,-hd),point(hw,hd),point(-hw,hd)],'#ec8a72',.8,true).name=name+' outline';
      const hatch=[];for(let n=-hw-hd;n<=hw+hd;n+=.42){const ends=[];for(const x of [-hw,hw]){const z=n-x;if(z>=-hd&&z<=hd)ends.push(point(x,z));}for(const z of [-hd,hd]){const x=n-z;if(x>-hw&&x<hw)ends.push(point(x,z));}if(ends.length===2)hatch.push(...ends);}line(hatch,'#d9806c',.35).name=name+' hatch';
    };
    footprint(s.userData.coreFootprint||{x:-1.1825*SHELTER_LAYOUT_SCALE,z:-1.0664*SHELTER_LAYOUT_SCALE,width:7.68*SHELTER_LAYOUT_SCALE,depth:8.25*SHELTER_LAYOUT_SCALE},'Main hut exclusion');
    // Reserve the future sleeping wing from the first placement, so new
    // construction cannot permanently block a later shelter upgrade.
    footprint(EXTRA_HUT_FOOTPRINT,'Sleeping hut reservation');
    s.add(buildArea);return buildArea;
  }

  let frame=0;
  const dayWater=color('#2c6258'),nightWater=color('#0c2b32'),daySun=color('#fff0cb'),nightSun=color('#7aa5cb');
  function update(dt,time,dayFactor=1,playerPos){now=time;frame++;dayFactor=clamp(dayFactor,0,1);windUniform.value=time;
    water.material.uniforms.time.value=time*.45;water.material.uniforms.waterColor.value.copy(nightWater).lerp(dayWater,dayFactor);water.material.uniforms.sunColor.value.copy(nightSun).lerp(daySun,dayFactor);
    water.material.uniforms.sunDirection.value.set(.35+.25*Math.sin(time*.008),.45+dayFactor*.4,-.45).normalize();
    if(frame%3===0){const p=waterGeo.attributes.position;for(let i=0;i<p.count;i++){const x=waterBase[i*3],y=waterBase[i*3+1];p.setZ(i,Math.sin(x*.33+y*.21+time*.91)*.025+Math.sin(x*.14-y*.38-time*.72)*.018);}p.needsUpdate=true;}
    rippleMat.uniforms.uTime.value=time;
    let changed=false;for(let i=0;i<dropCount;i++){const d=drops[i];if(d.life<=0)continue;d.life-=dt;d.vy-=9.2*dt;dropPos[i*3]+=d.vx*dt;dropPos[i*3+1]+=d.vy*dt;dropPos[i*3+2]+=d.vz*dt;dropAlpha[i]=Math.max(0,d.life/d.max)*.88;
      if(dropPos[i*3+1]<-.03||d.life<=0){d.life=0;dropAlpha[i]=0;}changed=true;}
    if(changed){dropGeo.attributes.position.needsUpdate=true;dropGeo.attributes.aAlpha.needsUpdate=true;}
    if(frame%2===0){let visible=0;
      for(let spot=0;spot<hotspots.length;spot++){const s=hotspots[spot];if(playerPos&&(s.x-playerPos.x)**2+(s.z-playerPos.z)**2>90**2)continue;
        const limit=(s.rich?65:30)*clamp(s.flies/s.maxFlies,0,1);
        for(const f of fliesBySpot[spot]){if(f.rank>=limit)continue;const a=time*f.speed+f.phase;object.position.set(s.x+Math.sin(a)*f.r+Math.sin(a*2.9)*.13,s.y+f.height+Math.sin(a*1.7+f.phase2)*.26,s.z+Math.cos(a*.83+f.phase2)*f.r);object.scale.setScalar(.55+.3*Math.sin(f.phase2)**2);object.rotation.set(Math.sin(a*3)*.25,-a,Math.sin(a*12)*.25);object.updateMatrix();fliesMesh.setMatrixAt(visible++,object.matrix);}
      }
      fliesMesh.count=visible;renderStats.flyMatricesUpdated=visible;
      if(visible){fliesMesh.instanceMatrix.clearUpdateRanges();fliesMesh.instanceMatrix.addUpdateRange(0,visible*16);fliesMesh.instanceMatrix.needsUpdate=true;}
    }
    // Nearby leaves flex gently; geometry and physics retain the same support
    // height so a player's footing never drifts under a stationary character.
    if(frame%5===0&&playerPos){lilyData.forEach((p,i)=>{if(Math.hypot(playerPos.x-p.x,playerPos.z-p.z)>48)return;object.position.set(p.x,p.y+Math.sin(time*.9+p.phase)*.018,p.z);object.rotation.set(Math.sin(time*.61+p.phase)*.015,p.angle,Math.cos(time*.8+p.phase)*.015);object.scale.set(p.visualRadius,1,p.visualRadius);object.updateMatrix();lilyMesh.setMatrixAt(i,object.matrix);});lilyMesh.flush();}
    const closeLights=[...shelters].filter(s=>!s.userData.destroyed).sort((a,b)=>playerPos?a.position.distanceToSquared(playerPos)-b.position.distanceToSquared(playerPos):0).slice(0,3);
    for(const s of shelters){s.userData.light.visible=closeLights.includes(s);s.userData.light.intensity=.25+(1-dayFactor)*3;s.userData.lamp.material.emissiveIntensity=.3+(1-dayFactor)*1.3;s.userData.banner.userData.flag.rotation.y=Math.sin(time*1.4+s.position.x)*.06;}
  }
  function dispose(){hideBuildArea();for(const preview of [...buildingPreviews])removeBuildingPreview(preview);scene.remove(group);const geos=new Set(),mats=new Set();group.traverse(o=>{if(o.isInstancedMesh)o.dispose();if(o.geometry)geos.add(o.geometry);if(o.material){if(Array.isArray(o.material))o.material.forEach(m=>mats.add(m));else mats.add(o.material);}});for(const g of geos)g.dispose();for(const m of mats)m.dispose();for(const t of disposables)t.dispose();water.material.uniforms.mirrorSampler?.value?.dispose?.();shelters.clear();}
  // Authored terrain and vegetation never move as objects. Dynamic motion uses
  // instance buffers/shaders; castles added later retain their movable pivots.
  group.traverse(o=>{o.updateMatrix();o.matrixAutoUpdate=false;});group.updateMatrixWorld(true);
  return {group,platforms,hotspots,campSites,mapRegions,routes,predatorAnchors,bossAnchors,renderStats,radius:WORLD_RADIUS,boundary:WORLD_BOUNDARY,revision:WORLD_REVISION,sampleHeight,getTerrainHeight:terrainHeight,getSurface:surface,shelterLandHeight,update,splash,impact,createShelter,updateShelter,removeShelter,createBuildingPreview,setBuildingPreview,removeBuildingPreview,showBuildArea,hideBuildArea,dispose,water,shelterRadius:SHELTER_RADIUS,shelterScale:SHELTER_SCALE};
}

