import * as THREE from 'three';
import { Water } from 'three/addons/objects/Water.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

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

export function createWorld(scene, renderer, options={}) {
  const seed=options.seed??731,random=rng(seed),group=new THREE.Group();group.name='The living creek';scene.add(group);
  const platforms=[],hotspots=[],shelters=new Set(),disposables=[],buckets=new Map(),bucketSize=6;
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
    {id:'oldwillow',x:-38,z:96,radius:7.5,team:'enemy',name:'Old Willow Court'},
    {id:'quietbend',x:29,z:32,radius:6.8,team:'neutral',name:'Quiet Bend'},
    {id:'foxglove',x:-39,z:2,radius:6.8,team:'neutral',name:'Foxglove Island'}
  ];
  function bedHeight(x,z) {
    const channel=Math.sin(z*.032)*15+Math.sin(z*.073)*5,dist=Math.abs(x-channel);
    let h=-2.2+noise(x,z)*.47+smooth(44,71,dist)*6;
    h+=smooth(105,132,Math.abs(z))*4.8;
    for(const site of campSites){const dx=(x-site.x),dz=(z-site.z),d=Math.hypot(dx,dz);const edge=site.radius*(1+.06*Math.sin(Math.atan2(dz,dx)*5+site.x));
      if(d<edge+3.8){const island=.39+noise(x*1.7,z*1.7)*.07-smooth(edge*.65,edge+3.8,d)*2.8;h=Math.max(h,island);}}
    return h;
  }
  const terrainGeo=new THREE.PlaneGeometry(270,270,180,180);terrainGeo.rotateX(-Math.PI/2);
  const tp=terrainGeo.attributes.position,tcolors=new Float32Array(tp.count*3),earth=color('#8b8a62'),wet=color('#43533b'),deep=color('#52634e');
  for(let i=0;i<tp.count;i++){const x=tp.getX(i),z=tp.getZ(i),h=bedHeight(x,z);tp.setY(i,h);const c=deep.clone().lerp(wet,smooth(-1.7,.05,h)).lerp(earth,smooth(.02,2,h));c.multiplyScalar(.88+noise(x*2,z*2)*.18);c.toArray(tcolors,i*3);}
  terrainGeo.setAttribute('color',new THREE.BufferAttribute(tcolors,3));terrainGeo.computeVertexNormals();
  mossMap.repeat.set(44,44);const terrain=new THREE.Mesh(terrainGeo,materials.terrain);terrain.receiveShadow=true;group.add(terrain);
  // Separate moss texture scale for rock outcrops, so the bed can tile densely.
  const rockMoss=stoneTexture(seed+9,true);disposables.push(rockMoss);materials.mossRock.map=rockMoss;materials.compost.map=rockMoss;materials.darkFruit.map=rockMoss;

  const waterGeo=new THREE.PlaneGeometry(266,266,88,88);
  const water=new Water(waterGeo,{textureWidth:512,textureHeight:512,waterNormals:normals,sunDirection:new THREE.Vector3(.6,.8,-.3),sunColor:0xffe9bd,waterColor:0x2e625b,distortionScale:2.5,alpha:.91,fog:true});
  water.name='Reflecting creek';water.rotation.x=-Math.PI/2;water.position.y=-.035;water.material.transparent=true;water.material.depthWrite=false;water.renderOrder=-2;
  water.material.uniforms.size.value=4.8;group.add(water);
  const waterBase=waterGeo.attributes.position.array.slice();

  // Distant silhouettes have textured bark, tangled roots and thousands of
  // individually curved reed blades, rather than a uniform wall around a box.
  const bankRootGeos=[],rootGroup=new THREE.Group(),treeLeaves=[];rootGroup.name='Willow trunks and tangled roots';group.add(rootGroup);
  for(let side of [-1,1])for(let i=0;i<15;i++){
    const z=-122+i*17+(random()-.5)*7,x=side*(59+random()*15)+Math.sin(z*.032)*15,y=bedHeight(x,z);
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
  const willowLeaves=new THREE.InstancedMesh(willowLeaf,materials.plant,treeLeaves.length);willowLeaves.name='Hanging willow foliage';treeLeaves.forEach((p,i)=>{object.position.set(p.x,p.y,p.z);object.rotation.set((random()-.5)*.8,p.angle,(random()-.5)*.7);object.scale.setScalar(p.scale);object.updateMatrix();willowLeaves.setMatrixAt(i,object.matrix);});group.add(willowLeaves);

  function insertPlatform(p){platforms.push(p);const x0=Math.floor((p.x-p.radius)/bucketSize),x1=Math.floor((p.x+p.radius)/bucketSize),z0=Math.floor((p.z-p.radius)/bucketSize),z1=Math.floor((p.z+p.radius)/bucketSize);for(let x=x0;x<=x1;x++)for(let z=z0;z<=z1;z++){const key=x+':'+z;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(p);}return p;}
  const lilyData=[],rockData=[[],[],[]];
  function addLily(x,z,radius=1.35+random()*.9){const p=insertPlatform({id:'p'+platforms.length,type:'lily',x,z,y:.105,radius:radius*.91,visualRadius:radius,angle:random()*TAU,phase:random()*TAU});lilyData.push(p);return p;}
  function addRock(x,z,radius=1.3+random()*1.3,height=.65+random()*.65){const variant=Math.floor(random()*3),p=insertPlatform({id:'p'+platforms.length,type:'rock',x,z,y:height*.76-.05,radius:radius*.72,visualRadius:radius,scaleY:height,angle:random()*TAU,variant});rockData[variant].push(p);return p;}
  addLily(0,0,3.1);addLily(3.7,1,2.3);addRock(-3.9,2.2,2.5,.9);
  function path(a,b){const distance=Math.hypot(b.x-a.x,b.z-a.z),steps=Math.ceil(distance/3.65);for(let i=1;i<steps;i++){const t=i/steps,x=a.x+(b.x-a.x)*t+Math.sin(t*Math.PI*3)*1.25,z=a.z+(b.z-a.z)*t;if(bedHeight(x,z)>-.1)continue;if(random()<.18)addRock(x,z,1.8+random()*.7,.65+random()*.55);else addLily(x,z,1.65+random()*.65);}}
  const origin={x:0,z:0};path(origin,campSites[0]);for(const site of campSites)path(origin,site);for(let i=1;i<campSites.length;i++)path(campSites[i-1],campSites[i]);
  for(let i=0;i<670;i++){
    const z=(random()-.5)*218,x=(random()-.5)*108+Math.sin(z*.032)*10;
    if(bedHeight(x,z)>-.18)continue;
    const neighbours=buckets.get(Math.floor(x/bucketSize)+':'+Math.floor(z/bucketSize))||[];
    if(neighbours.some(p=>Math.hypot(p.x-x,p.z-z)<p.radius+1))continue;
    if(random()<.15)addRock(x,z,1.1+random()*2.3,.55+random()*1.2);else addLily(x,z,1.1+random()*1.1);
  }
  for(const site of campSites)insertPlatform({id:'island-'+site.id,type:'land',x:site.x,z:site.z,y:.39,radius:site.radius*.8});
  const lilyMesh=new THREE.InstancedMesh(lilyGeo,materials.leaf,lilyData.length);lilyMesh.name='Veined water lily leaves';lilyMesh.castShadow=true;lilyMesh.receiveShadow=true;lilyMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  lilyData.forEach((p,i)=>{object.position.set(p.x,p.y,p.z);object.rotation.set((random()-.5)*.04,p.angle,(random()-.5)*.035);object.scale.set(p.visualRadius,1,p.visualRadius*(.89+random()*.18));object.updateMatrix();lilyMesh.setMatrixAt(i,object.matrix);lilyMesh.setColorAt(i,color(['#b6cf8a','#88ac67','#749d59','#c0cc7e','#729958'][Math.floor(random()*5)]));});group.add(lilyMesh);
  rockData.forEach((data,j)=>{const mesh=new THREE.InstancedMesh(rockGeos[j],j===1?materials.mossRock:materials.rock,data.length);mesh.name='Weathered waterline outcrops';mesh.castShadow=true;mesh.receiveShadow=true;data.forEach((p,i)=>{object.position.set(p.x,-.05,p.z);object.rotation.set(0,p.angle,0);object.scale.set(p.visualRadius,p.scaleY,p.visualRadius);object.updateMatrix();mesh.setMatrixAt(i,object.matrix);mesh.setColorAt(i,color('#ffffff').multiplyScalar(.7+random()*.4));});group.add(mesh);});

  // Pads with white flowers add scale and landmarks along the waterway.
  const petalGeo=new THREE.BufferGeometry(),petalP=[],petalUV=[],petalI=[];
  for(let i=0;i<=9;i++){const t=i/9,w=Math.sin(t*Math.PI)*.16;for(const s of [-1,1]){petalP.push(s*w,.13*Math.sin(t*Math.PI)+.23*t*t,t*.65);petalUV.push(s*.5+.5,t);}}
  for(let i=0;i<9;i++){const a=i*2;petalI.push(a,a+1,a+2,a+1,a+3,a+2);}petalGeo.setAttribute('position',new THREE.Float32BufferAttribute(petalP,3));petalGeo.setAttribute('uv',new THREE.Float32BufferAttribute(petalUV,2));petalGeo.setIndex(petalI);petalGeo.computeVertexNormals();
  const petalMat=new THREE.MeshStandardMaterial({color:'#f4e5d5',roughness:.48,side:THREE.DoubleSide});
  const flowerPads=lilyData.filter((_,i)=>i%23===5),petals=new THREE.InstancedMesh(petalGeo,petalMat,flowerPads.length*13);let pi=0;
  for(const p of flowerPads)for(let j=0;j<13;j++){object.position.set(p.x+.24,p.y+.045,p.z);object.rotation.set(j>7?.1:0,j/8*TAU,j>7?.1:0);object.scale.setScalar(j>7?.67:1);object.updateMatrix();petals.setMatrixAt(pi++,object.matrix);}group.add(petals);

  const vegetation=[];
  for(let i=0;i<21500;i++){
    const x=(random()-.5)*254,z=(random()-.5)*254,h=bedHeight(x,z);if(h<-.52||h>3.2)continue;
    if(campSites.some(s=>Math.hypot(s.x-x,s.z-z)<s.radius*.68))continue;
    if(Math.hypot(x,z)<8)continue;
    vegetation.push({x,z,y:h,scale:.65+random()*2.2,angle:random()*TAU});
  }
  const reedGeo=bladeGeometry(44),reedMesh=new THREE.InstancedMesh(reedGeo,materials.plant,vegetation.length);
  reedMesh.name='Curved river reeds';reedMesh.receiveShadow=true;
  vegetation.forEach((p,i)=>{object.position.set(p.x,p.y,p.z);object.rotation.set(0,p.angle,0);object.scale.set(.65+p.scale*.25,p.scale,.65+p.scale*.25);object.updateMatrix();reedMesh.setMatrixAt(i,object.matrix);reedMesh.setColorAt(i,color('#ffffff').multiplyScalar(.75+random()*.5));});group.add(reedMesh);
  const cattails=vegetation.filter((p,i)=>p.y<.5&&i%5===0),catGeo=cattailGeometry(),catMesh=new THREE.InstancedMesh(catGeo,materials.plant,cattails.length);
  cattails.forEach((p,i)=>{object.position.set(p.x+.12,p.y,p.z);object.rotation.set(0,p.angle,0);object.scale.setScalar(.7+p.scale*.4);object.updateMatrix();catMesh.setMatrixAt(i,object.matrix);});group.add(catMesh);
  // Subtle vertex wind keeps the whole wetland alive, without per-blade JS.
  const windUniform={value:0};materials.plant.onBeforeCompile=shader=>{shader.uniforms.uCreekTime=windUniform;shader.vertexShader='uniform float uCreekTime;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n transformed.x += sin(uCreekTime * 1.1 + position.y * 2.3 + instanceMatrix[3].x * .13 + instanceMatrix[3].z * .17) * pow(max(position.y, 0.0), 1.6) * .035;');};
  materials.plant.customProgramCacheKey=()=> 'creek-wind-1';

  function surface(x,z){let h=bedHeight(x,z),type=h>-.1?'land':'water',chosen=null;if(h<=-.1)h=-.25;const near=buckets.get(Math.floor(x/bucketSize)+':'+Math.floor(z/bucketSize))||[];
    for(const p of near){if(p.type==='land')continue;const d=Math.hypot(x-p.x,z-p.z);if(d<=p.radius){let ph=p.y;if(p.type==='rock')ph-=smooth(p.radius*.62,p.radius,d)*.14*p.scaleY;if(ph>h){h=ph;type=p.type;chosen=p;}}}
    return {height:h,type,platform:chosen};}
  function sampleHeight(x,z){return surface(x,z).height;}

  // Organic fly lures: fallen fruit, leaf litter and waterlogged wood.
  const spotSpecs=[{x:4.5,z:-4,rich:false},{x:-10,z:12,rich:true},{x:15,z:-20,rich:false},{x:-25,z:-23,rich:true},{x:26,z:-47,rich:true},{x:-17,z:40,rich:true},{x:27,z:69,rich:true},{x:-4,z:-81,rich:true},{x:-34,z:86,rich:true},{x:23,z:26,rich:false},{x:-33,z:7,rich:false},{x:4,z:51,rich:false},{x:9,z:-59,rich:false},{x:-12,z:76,rich:false},{x:39,z:-4,rich:false},{x:-42,z:-59,rich:true}];
  const fruitInstances=[],compostGeos=[],litterGroup=new THREE.Group();group.add(litterGroup);
  for(let i=0;i<spotSpecs.length;i++){
    const s=spotSpecs[i],base=bedHeight(s.x,s.z);if(base<-.15)addRock(s.x,s.z,s.rich?3.2:2.2,.62);
    const h=sampleHeight(s.x,s.z),spot={id:'flies-'+i,x:s.x,z:s.z,y:h+.25,flies:s.rich?240:100,maxFlies:s.rich?240:100,rich:s.rich};hotspots.push(spot);
    const mound=new THREE.Mesh(rockGeos[i%3],materials.compost);mound.position.set(s.x,h+.05,s.z);mound.scale.set(s.rich?1.7:1.05,.28,s.rich?1.25:.75);mound.rotation.y=random()*TAU;group.add(mound);
    for(let j=0;j<(s.rich?12:6);j++){const a=random()*TAU,r=random()*(s.rich?1.5:.85);fruitInstances.push({x:s.x+Math.cos(a)*r,y:h+.12+random()*.16,z:s.z+Math.sin(a)*r,scale:.12+random()*.18,rot:random()*TAU});}
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
  const flyMat=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.45,side:THREE.DoubleSide}),fliesMesh=new THREE.InstancedMesh(flyGeometry(),flyMat,flies.length);fliesMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);fliesMesh.frustumCulled=false;fliesMesh.name='Fly swarms';group.add(fliesMesh);

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
  function impact(position,tint='#e9cb87',strength=1){particles(position,strength,tint,false);if(surface(position.x,position.z).type==='water')addRipple({x:position.x,y:.01,z:position.z},strength,tint);}

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
  function teamColor(team){if(typeof team==='string'&&team.startsWith('enemy')){const shades=['#cf7554','#c8a456','#a57db4','#69a3a4','#c38c55','#8d809d'],index=parseInt(team.replace(/\D/g,''),10)||0;return shades[index%shades.length];}return teamColors[team]||teamColors.neutral;}
  function makeBanner(team,owned){const g=new THREE.Group(),pole=tube([[0,0,0],[.04,1.6,0],[-.03,3.1,.02]],.047,materials.bark,7);owned.push(pole.geometry);g.add(pole);
    const geo=new THREE.BufferGeometry(),p=[0,2.93,0,.9,2.8,.09,1.13,2.12,.02,.6,2.25,-.03,0,2.18,0],uv=[0,1,1,1,1,0,.5,.1,0,0];geo.setAttribute('position',new THREE.Float32BufferAttribute(p,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex([0,1,3,1,2,3,0,3,4]);geo.computeVertexNormals();const mat=new THREE.MeshStandardMaterial({color:teamColor(team),roughness:.8,side:THREE.DoubleSide,map:leafMap});const flag=new THREE.Mesh(geo,mat);flag.castShadow=true;g.add(flag);g.userData.flag=flag;owned.push(geo,mat);return g;}
  function createShelter(data){
    const s=new THREE.Group();s.name='Shelter '+(data.id??'');s.position.set(data.x,sampleHeight(data.x,data.z),data.z);s.userData.id=data.id;s.userData.owned=[];const owned=s.userData.owned;
    const core=buildHut(1,teamColors[data.team],owned);core.position.set(-.55,.04,-.5);s.add(core);s.userData.core=core;
    const banner=makeBanner(data.team,owned);banner.position.set(1.8,0,1.1);s.add(banner);s.userData.banner=banner;
    const extra=new THREE.Group();extra.name='Additional sleeping leaves';const hut2=buildHut(.62,teamColors[data.team],owned);hut2.position.set(-3,.01,.2);hut2.rotation.y=-.5;extra.add(hut2);s.add(extra);s.userData.extra=extra;
    const nursery=new THREE.Group();nursery.name='Hatchery';const nestHut=buildHut(.52,teamColors[data.team],owned);nestHut.position.set(3.05,0,-1.8);nestHut.rotation.y=.7;nursery.add(nestHut);
    // A woven circular nursery with damp leaves below its smaller canopy.
    for(let ring=0;ring<5;ring++){const pts=[];for(let i=0;i<=24;i++){const a=i/24*TAU;pts.push([3.05+Math.cos(a)*.74,.06+ring*.065,-1.7+Math.sin(a)*.63]);}const nest=tube(pts,.035,materials.reed,25);owned.push(nest.geometry);nursery.add(nest);}mergeStaticParts(nursery,owned);s.add(nursery);s.userData.nursery=nursery;
    const storage=new THREE.Group();storage.name='Leaf-wrapped food cache';storage.position.set(-2.8,.04,2.2);const foodMesh=new THREE.InstancedMesh(fruitGeo,materials.fruit,15);
    for(let i=0;i<15;i++){object.position.set((i%4)*.32-.5,Math.floor(i/8)*.25+.15,Math.floor(i/4)%2*.35);object.scale.setScalar(.22+(i%3)*.025);object.rotation.set(i*.7,i*.4,0);object.updateMatrix();foodMesh.setMatrixAt(i,object.matrix);foodMesh.setColorAt(i,color(i%3?'#b7b06c':'#6d673f'));}storage.add(foodMesh);
    for(let j=0;j<3;j++){const log=tube([[-.85,.05,-.3+j*.45],[0,.02,-.3+j*.45],[.85,.08,-.3+j*.45]],.075,materials.bark,5);owned.push(log.geometry);storage.add(log);}const cover=new THREE.Mesh(leafGeometry(1,.8,.23),materials.leaf);cover.position.set(0,.5,.1);cover.rotation.z=.17;owned.push(cover.geometry);storage.add(cover);mergeStaticParts(storage,owned);s.add(storage);s.userData.storage=storage;s.userData.foodMesh=foodMesh;s.userData.storageCover=cover;
    const watch=new THREE.Group();watch.name='Lookout perch';watch.position.set(3.1,0,2.5);
    for(let k=0;k<3;k++){const a=k/3*TAU,post=tube([[Math.cos(a)*.7,-.1,Math.sin(a)*.7],[Math.cos(a)*.44,1.4,Math.sin(a)*.44],[Math.cos(a)*.35,2.65,Math.sin(a)*.35]],.085,materials.bark,7);owned.push(post.geometry);watch.add(post);}
    for(let k=0;k<8;k++){const z=-.6+k*.17,beam=tube([[-.7,2.35,z],[0,2.32,z],[.7,2.36,z]],.06,materials.reed,4);owned.push(beam.geometry);watch.add(beam);}
    const canopy=new THREE.Mesh(leafGeometry(1.1,.9,.08),materials.leaf);canopy.position.y=3.15;canopy.rotation.x=.17;owned.push(canopy.geometry);watch.add(canopy);
    for(let k=0;k<6;k++){const rung=tube([[-.25,k*.34,.63],[.25,k*.34,.63]],.035,materials.reed,2);owned.push(rung.geometry);watch.add(rung);}mergeStaticParts(watch,owned);s.add(watch);s.userData.watchtower=watch;
    const palisade=new THREE.Group();palisade.name='Root-and-reed defences';const fenceGeos=[];
    for(let i=0;i<54;i++){const a=i/54*TAU;if(Math.abs(Math.sin(a))<.19)continue;const x=Math.cos(a)*5.2,z=Math.sin(a)*4.5,h=.65+(i%5)*.12;const stake=tube([[x,-.07,z],[x*1.008,h*.6,z*1.008],[x*1.025,h,z*1.025]],.055,materials.bark,3);fenceGeos.push(stake.geometry);}
    const merged=mergeGeometries(fenceGeos,false);for(const g of fenceGeos)g.dispose();const fence=new THREE.Mesh(merged,materials.bark);fence.castShadow=true;owned.push(merged);palisade.add(fence);s.add(palisade);s.userData.palisade=palisade;
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
    const light=new THREE.PointLight('#ffd098',1.8,12,2);light.position.set(0,2.3,1.8);s.add(light);s.userData.light=light;
    group.add(s);shelters.add(s);updateShelter(s,data);return s;
  }
  function updateShelter(s,data={}){if(!s)return;
    const previous=s.userData.visualState||{},state={...previous,...data},tier=Math.max(1,state.tier??1),b=state.buildings||{},health=clamp((state.hp??state.maxHp??100)/(state.maxHp??100),0,1),destroyed=!!state.destroyed||health<=0;
    const team=state.team??previous.team??'neutral';
    // Retain only render data, never the gameplay mesh reference or a cycle.
    s.userData.visualState={team,tier,hp:state.hp,maxHp:state.maxHp,buildings:{...b},storage:state.storage,resources:state.resources,lootTaken:!!state.lootTaken,destroyed};
    s.userData.team=team;s.userData.tier=tier;s.userData.health=health;s.userData.destroyed=destroyed;
    s.userData.banner.userData.flag.material.color.set(teamColor(team));
    const hasStore=!!(b.storage??b.store??false);
    s.userData.core.visible=!destroyed;s.userData.extra.visible=!destroyed&&tier>=2;s.userData.ruin.visible=destroyed;
    s.userData.nursery.visible=!destroyed&&!!(b.nursery||b.hatchery||b.spawn||b.breeding);
    s.userData.watchtower.visible=!destroyed&&!!(b.watchtower||b.tower||b.guards);
    s.userData.palisade.visible=!destroyed&&!!(b.palisade||b.walls||b.wall||b.defense);
    s.userData.core.rotation.z=destroyed?0:(1-health)*.09;s.userData.core.userData.roof.scale.y=destroyed?1:.78+.22*health;
    let amount=typeof state.storage==='number'?state.storage:(state.storage?.food??state.resources??0);if(!Number.isFinite(amount))amount=0;amount=Math.max(0,amount);
    const hasLoot=amount>0&&!state.lootTaken;
    s.userData.storage.visible=hasStore&&(!destroyed||hasLoot);s.userData.storage.rotation.z=destroyed?-.08:0;
    s.userData.foodMesh.count=destroyed&&!hasLoot?0:Math.min(15,Math.ceil(amount/8));
    s.userData.storageCover.position.set(destroyed?-.65:0,destroyed?.1:.5,destroyed?.52:.1);s.userData.storageCover.rotation.set(destroyed?.28:0,0,destroyed?-.32:.17);
    s.userData.looseLoot.visible=destroyed&&hasLoot&&!hasStore;s.userData.looseLoot.count=Math.min(8,Math.ceil(amount/5));
    s.userData.banner.position.y=destroyed?.035:0;s.userData.banner.rotation.set(destroyed?.08:0,destroyed?.35:0,destroyed?1.49:health<.25?.22:0);
    s.userData.lamp.visible=!destroyed;if(destroyed)s.userData.light.visible=false;
  }
  function removeShelter(s){if(!s)return;group.remove(s);shelters.delete(s);s.traverse(o=>{if(o.isInstancedMesh)o.dispose();});for(const d of s.userData.owned||[])d.dispose?.();}

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
    if(frame%2===0){for(let i=0;i<flies.length;i++){const f=flies[i],s=hotspots[f.spot],available=clamp(s.flies/s.maxFlies,0,1),limit=(s.rich?65:30)*available;
      if(f.rank>=limit){object.position.set(s.x,-10,s.z);object.scale.setScalar(.001);}else{const a=time*f.speed+f.phase;object.position.set(s.x+Math.sin(a)*f.r+Math.sin(a*2.9)*.13,s.y+f.height+Math.sin(a*1.7+f.phase2)*.26,s.z+Math.cos(a*.83+f.phase2)*f.r);object.scale.setScalar(.55+.3*Math.sin(f.phase2)**2);object.rotation.set(Math.sin(a*3)*.25,-a,Math.sin(a*12)*.25);}object.updateMatrix();fliesMesh.setMatrixAt(i,object.matrix);}fliesMesh.instanceMatrix.needsUpdate=true;}
    // Nearby leaves flex gently; geometry and physics retain the same support
    // height so a player's footing never drifts under a stationary character.
    if(frame%5===0&&playerPos){lilyData.forEach((p,i)=>{if(Math.hypot(playerPos.x-p.x,playerPos.z-p.z)>48)return;object.position.set(p.x,p.y+Math.sin(time*.9+p.phase)*.018,p.z);object.rotation.set(Math.sin(time*.61+p.phase)*.015,p.angle,Math.cos(time*.8+p.phase)*.015);object.scale.set(p.visualRadius,1,p.visualRadius);object.updateMatrix();lilyMesh.setMatrixAt(i,object.matrix);});lilyMesh.instanceMatrix.needsUpdate=true;}
    const closeLights=[...shelters].filter(s=>!s.userData.destroyed).sort((a,b)=>playerPos?a.position.distanceToSquared(playerPos)-b.position.distanceToSquared(playerPos):0).slice(0,3);
    for(const s of shelters){s.userData.light.visible=closeLights.includes(s);s.userData.light.intensity=.25+(1-dayFactor)*3;s.userData.lamp.material.emissiveIntensity=.3+(1-dayFactor)*1.3;s.userData.banner.userData.flag.rotation.y=Math.sin(time*1.4+s.position.x)*.06;}
  }
  function dispose(){scene.remove(group);const geos=new Set(),mats=new Set();group.traverse(o=>{if(o.isInstancedMesh)o.dispose();if(o.geometry)geos.add(o.geometry);if(o.material){if(Array.isArray(o.material))o.material.forEach(m=>mats.add(m));else mats.add(o.material);}});for(const g of geos)g.dispose();for(const m of mats)m.dispose();for(const t of disposables)t.dispose();water.material.uniforms.mirrorSampler?.value?.dispose?.();shelters.clear();}
  return {group,platforms,hotspots,campSites,sampleHeight,getSurface:surface,update,splash,impact,createShelter,updateShelter,removeShelter,dispose,water};
}
