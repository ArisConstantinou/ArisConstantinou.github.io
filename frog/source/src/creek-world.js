import * as THREE from 'three';
import {createRefugeDescriptor} from './refuge.js';

/** Frog-scale geography shared by the rendered land and exploration systems. */
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const smooth=(a,b,n)=>{const t=clamp((n-a)/(b-a),0,1);return t*t*(3-2*t);};

export const CREEK_WATER_BASE=-.035;
/** The shoulder camera stays above water while the frog dives. Reveal the
 * submerged geometry through the real water shader instead of hiding it. */
export function creekWaterOpacity(playerY,waterLevel){
  if(!Number.isFinite(playerY)||!Number.isFinite(waterLevel))return .91;
  const diveDepth=Math.max(0,waterLevel-.215-playerY);
  return .91-.63*smooth(.1,.6,diveDepth);
}
export const CREEK_FOCUS=Object.freeze({
  pond:{id:'pond',x:0,z:0,radius:8,label:'Λιμνούλα των νούφαρων',description:'Μύγες, ανθισμένα φύλλα και χαμηλές διαδρομές πάνω από το νερό.',hint:'Παρατήρησε πού μαζεύονται οι μύγες.',findPoint:{x:6.5,z:3}},
  creek:{id:'creek',x:8,z:-24,radius:7,label:'Το στενό ρυάκι',description:'Το ρεύμα αλλάζει τις διαδρομές και μεταφέρει την τροφή.',hint:'Ακολούθησε την κίνηση του νερού.',findPoint:{x:4,z:-29}},
  bank:{id:'bank',x:27,z:8,radius:7,label:'Η όχθη με τα βότσαλα',description:'Ψηλά βράχια, κρυψώνες και εκτεθειμένα περάσματα.',hint:'Οι καλαμιές κρύβουν μια δεύτερη προσέγγιση.',findPoint:{x:30,z:6}},
  roots:{id:'roots',x:24,z:-16,radius:5,label:'Το πέρασμα στις ρίζες',description:'Ένα φυσικό άνοιγμα που αποκαλύπτεται όταν χαμηλώνει το νερό.',hint:'Μικρά έντομα χάνονται κάτω από τις καμπύλες ρίζες.',findPoint:{x:31,z:-16}}
});

export function createCreekGeography(layout){
  const point=p=>({...p,...layout.toWorld(p.x,p.z)});
  return {
    landmarks:Object.values(CREEK_FOCUS).map(p=>({...point(p),findPoint:point(p.findPoint)})),
    nest:point({id:'creek-nest',x:17,z:16,radius:4,label:'Κοιλότητα κάτω από τις ρίζες'}),
    refuges:[{id:'willow-crevice',x:-20,z:7,label:'Κρυψώνα της πεσμένης ιτιάς'},{id:'bank-crevice',x:34,z:-9,label:'Κοιλότητα της πετρώδους όχθης'}].map(p=>({...point(p),yaw:Math.atan2(-p.x,-p.z)+layout.yaw})),
    cover:[{id:'nest-reeds',x:14,z:20,radius:3.1},{id:'root-reeds',x:18,z:-7,radius:3},{id:'bank-reeds',x:29,z:11,radius:3.3},{id:'creek-reeds',x:18,z:-22,radius:3}].map(point)
  };
}

export function creekChannelX(z){return 6+Math.sin(z*.035)*9;}

/** Continuous land, including a real low-water opening rather than a UI gate. */
export function creekBedHeight(x,z,noise=0,sites=[]){
  const distance=Math.abs(x-creekChannelX(z));
  let h=-1.9+smooth(6,17,distance)*3.5+noise*.22;
  h+=smooth(20,55,distance)*(.4+Math.sin(z*.04+.6)**2*1.2);
  const pond=1-smooth(11,20,Math.hypot(x*.95,z*.8));
  h=h*(1-pond)+(-2.65+noise*.2)*pond;
  for(const site of sites){
    const d=Math.hypot(x-site.x,z-site.z),r=site.radius;
    const edge=r*(1+.045*Math.sin(Math.atan2(z-site.z,x-site.x)*5+(site.shorePhase||0)));
    const weight=1-smooth(edge*.46,edge+5,d);
    if(weight>0)h=Math.max(h,h*(1-weight)+site.elevation*weight);
  }
  // A gently sloped shelf under the arch is flooded at normal/high water and
  // dry at low water. The passage joins the main creek to the eastern bank.
  const passage=(1-smooth(1.9,4.7,Math.abs(z+16)))*smooth(9,14,x)*(1-smooth(31,36,x));
  h=h*(1-passage)+Math.min(h,-.18+noise*.025)*passage;
  h+=smooth(190,235,Math.max(Math.abs(x),Math.abs(z)))*4;
  return h;
}

export function creekCurrent(layout,x,z,flow=.45){
  const p=layout.toSource(x,z),distance=Math.abs(p.x-creekChannelX(p.z));
  const strength=clamp(Number(flow)||0,0,1.5)*(1-smooth(5,17,distance))*(.55+.45*smooth(5,23,Math.abs(p.z)));
  if(strength<=0)return {x:0,z:0,strength:0};
  const dx=.315*Math.cos(p.z*.035),len=Math.hypot(dx,1),origin=layout.toWorld(0,0),direction=layout.toWorld(dx/len,1/len);
  return {x:(direction.x-origin.x)*strength,z:(direction.z-origin.z)*strength,strength};
}

/** Authored physical landmarks and visible cover, with no construction props. */
export function createCreekDecor({group,layout,terrainHeight,surface,insertPlatform,materials,rockGeos,tube,leafGeometry,bladeGeometry,geography}){
  const decor=new THREE.Group();decor.name='Natural creek discoveries';group.add(decor);
  const grips=[],object=new THREE.Object3D(),points=new Map(),pointGeometry=new THREE.SphereGeometry(1,11,7);
  const shellMaterial=new THREE.MeshStandardMaterial({color:'#e0c58b',roughness:.68});
  const seedMaterial=new THREE.MeshStandardMaterial({color:'#698d9d',roughness:.65});
  const findLeafGeometry=leafGeometry(.55,.38,.11),findLeafMaterial=materials.leaf.clone();
  findLeafMaterial.color.set('#adc68a');
  const sourcePoint=(x,z,y)=>{const p=layout.toWorld(x,z);return [p.x,y,p.z];};
  const roots=geography.landmarks.find(p=>p.id==='roots'),rootFloor=terrainHeight(roots.x,roots.z);
  for(const offset of [-.48,.45]){
    const arch=tube([[0,-.1,-4.1],[-.3,2.3,-2.6],[.2,3.7,0],[.35,2.5,2.7],[0,-.1,4.2]].map(p=>sourcePoint(24+p[0]+offset,-16+p[2],rootFloor+p[1])),.48,materials.bark,24,.14);
    arch.name='Passable willow root arch';arch.castShadow=true;arch.receiveShadow=true;decor.add(arch);
  }
  for(const side of [-1,1])for(let i=0;i<4;i++){
    const z=-16+side*(3.4+i*.45),x=24+(i-1.5)*1.1,from=layout.toWorld(x,z),to=layout.toWorld(x-4.5,z+side*1.5);
    const root=tube([[from.x,terrainHeight(from.x,from.z)+.8,from.z],[(from.x+to.x)/2,terrainHeight(to.x,to.z)+.45,(from.z+to.z)/2],[to.x,terrainHeight(to.x,to.z)-.05,to.z]],.1+i*.025,materials.bark,12,.75);
    root.castShadow=true;decor.add(root);
  }
  const perchSources=[{id:'creek-stone',x:4,z:-29,r:1.8,height:3.5},{id:'root-approach',x:18,z:-7,r:1.65,height:1.65},{id:'root-perch',x:24,z:-11,r:1.7,height:2},{id:'bank-perch',x:30,z:6,r:2,height:2.05},{id:'nest-perch',x:19,z:20,r:1.8,height:1.7},{id:'pond-perch',x:-5,z:8,r:1.7,height:3.5}];
  const gripMaterial=new THREE.MeshStandardMaterial({color:'#c4d9ad',roughness:.82});
  for(const [i,source] of perchSources.entries()){
    const p=layout.toWorld(source.x,source.z),floor=terrainHeight(p.x,p.z),scaleY=source.height;
    const mesh=new THREE.Mesh(rockGeos[i%rockGeos.length],materials.mossRock);mesh.name='Moss-covered grip outcrop';
    mesh.position.set(p.x,floor,p.z);mesh.scale.set(source.r,scaleY,source.r);mesh.rotation.y=i*1.93;mesh.castShadow=true;mesh.receiveShadow=true;decor.add(mesh);
    const support=insertPlatform({id:source.id,type:'rock',...p,y:floor+scaleY*.76,radius:source.r*.72,visualRadius:source.r,scaleY});
    const tip=new THREE.Mesh(pointGeometry,gripMaterial);tip.name='Pale natural grip';tip.position.set(p.x,support.y+.045,p.z);tip.scale.set(.22,.07,.22);decor.add(tip);
    grips.push({id:source.id,...p,y:support.y+.13,radius:support.radius});
  }
  const coverGeometry=bladeGeometry(123),coverMesh=new THREE.InstancedMesh(coverGeometry,materials.plant,geography.cover.length*84);
  coverMesh.name='Dense camouflage reed pockets';let coverIndex=0;
  for(const [j,pocket] of geography.cover.entries())for(let i=0;i<84;i++){
    const angle=i*2.399+j*.7,r=Math.sqrt((i+.4)/84)*pocket.radius,x=pocket.x+Math.cos(angle)*r,z=pocket.z+Math.sin(angle)*r;
    object.position.set(x,terrainHeight(x,z),z);object.rotation.set(0,angle,0);object.scale.set(1.2,1.65+(i%5)*.18,1.2);object.updateMatrix();coverMesh.setMatrixAt(coverIndex++,object.matrix);
  }
  coverMesh.receiveShadow=true;coverMesh.computeBoundingSphere();decor.add(coverMesh);
  function makePoint(id,data,dropped){
    const node=new THREE.Group();node.name=dropped?'Lost food and natural keepsakes':'Natural discovery';
    const leaf=new THREE.Mesh(findLeafGeometry,findLeafMaterial);leaf.rotation.y=(points.size*2.4)%6.28;leaf.receiveShadow=true;node.add(leaf);
    for(let i=0;i<(dropped?3:1);i++){
      const item=new THREE.Mesh(pointGeometry,data.kind==='keepsake'||data.keepsakesCount?shellMaterial:seedMaterial);
      item.position.set((i-1)*.15,.15+(i%2)*.035,.015);item.scale.set(.22,.15,.18);item.rotation.set(.2,i*.9,.1);item.castShadow=true;node.add(item);
    }
    node.userData.creekPoint={...data};decor.add(node);points.set(id,node);return node;
  }
  function sync(snapshot,waterLevel){
    const keep=new Set();
    for(const [dropped,list] of [[false,snapshot.finds||[]],[true,snapshot.dropped||[]]])for(const data of list){
      if(!Number.isFinite(data.x)||!Number.isFinite(data.z)||data.collected||data.visible===false)continue;
      const id=(dropped?'drop:':'find:')+data.id;keep.add(id);const node=points.get(id)||makePoint(id,data,dropped);
      node.userData.creekPoint={...data};node.visible=true;node.position.set(data.x,Math.max(surface(data.x,data.z).height,waterLevel)+.07,data.z);node.updateMatrix();
    }
    for(const [id,node] of points)if(!keep.has(id)){node.removeFromParent();points.delete(id);}
  }
  function update(waterLevel,time){
    for(const node of points.values()){
      const p=node.userData.creekPoint,land=surface(p.x,p.z),floating=land.type==='water';
      node.position.y=Math.max(land.height,waterLevel)+.07+(floating?Math.sin(time*1.5+p.x)*.025:0);
      node.rotation.z=floating?Math.sin(time*.8+p.z)*.045:0;node.updateMatrix();
    }
  }
  return {group:decor,grips,sync,update,resources:[pointGeometry,shellMaterial,seedMaterial,findLeafGeometry,findLeafMaterial,gripMaterial,coverGeometry]};
}

function refugeStoneGeometry(solid){
  const outline=solid.outline||[{x:solid.minX,z:solid.minZ},{x:solid.maxX,z:solid.minZ},{x:solid.maxX,z:solid.maxZ},{x:solid.minX,z:solid.maxZ}],n=outline.length,positions=[],indices=[];
  for(const y of [solid.minY,solid.maxY])for(const p of outline)positions.push(p.x,y,p.z);
  for(let i=1;i<n-1;i++){indices.push(0,i,i+1,n,n+i+1,n+i);}
  for(let i=0;i<n;i++){const next=(i+1)%n;indices.push(i,n+i,next,next,n+i,n+next);}
  const indexed=new THREE.BufferGeometry();indexed.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));indexed.setIndex(indices);
  const geometry=indexed.toNonIndexed();indexed.dispose();geometry.computeVertexNormals();
  const p=geometry.attributes.position,normals=geometry.attributes.normal,uv=[];
  for(let i=0;i<p.count;i++){const top=Math.abs(normals.getY(i))>.5;uv.push((top?p.getX(i):Math.abs(normals.getX(i))>.5?p.getZ(i):p.getX(i))*.35,(top?p.getZ(i):p.getY(i))*.35);}
  geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));return geometry;
}

export function createNaturalShelter(data,{terrainHeight,materials,rockGeos,tube,leafGeometry,mergeStaticParts,teamColor}){
  const refuge=createRefugeDescriptor(data,{terrainHeight}),s=new THREE.Group();s.name='Natural refuge '+(data.id||'');s.position.set(data.x,refuge.floorY,data.z);s.rotation.y=refuge.yaw;
  const owned=[],leafMaterial=materials.leaf.clone(),interiorMaterial=materials.rock.clone();interiorMaterial.color.set('#71816a');owned.push(leafMaterial,interiorMaterial);
  const shell=new THREE.Group();shell.name='Opaque rock and root cavity';s.add(shell);
  const roof=new THREE.Group();roof.name='Overhanging refuge slab';shell.add(roof);
  // These opaque meshes are generated directly from the physics solids. The
  // darker recessed baffle gives a protected chamber behind the visible mouth.
  for(const solid of refuge.solids){
    const geometry=refugeStoneGeometry(solid),material=solid.id==='root-baffle'?materials.bark:solid.id==='floor'?interiorMaterial:materials.mossRock;
    const mesh=new THREE.Mesh(geometry,material);mesh.name='Refuge solid · '+solid.id;mesh.userData.refugeSolid=solid;
    mesh.position.y=-refuge.floorY;mesh.castShadow=true;mesh.receiveShadow=true;owned.push(geometry);(solid.id==='roof'?roof:shell).add(mesh);
  }
  const ramp=refuge.ramp,positions=[],indices=[];
  for(let row=0;row<=ramp.rows;row++)for(let col=0;col<=ramp.cols;col++){
    const index=row*(ramp.cols+1)+col;positions.push(ramp.minX+(ramp.maxX-ramp.minX)*col/ramp.cols,ramp.heights[index]-refuge.floorY,ramp.minZ+(ramp.maxZ-ramp.minZ)*row/ramp.rows);
  }
  for(let row=0;row<ramp.rows;row++)for(let col=0;col<ramp.cols;col++){const a=row*(ramp.cols+1)+col,b=a+1,c=a+ramp.cols+1,d=c+1;indices.push(a,c,b,b,c,d);}
  const boundary=[];for(let col=0;col<=ramp.cols;col++)boundary.push(col);for(let row=1;row<=ramp.rows;row++)boundary.push(row*(ramp.cols+1)+ramp.cols);for(let col=ramp.cols-1;col>=0;col--)boundary.push(ramp.rows*(ramp.cols+1)+col);for(let row=ramp.rows-1;row>0;row--)boundary.push(row*(ramp.cols+1));
  for(let i=0;i<boundary.length;i++){const a=boundary[i],b=boundary[(i+1)%boundary.length],c=positions.length/3,d=c+1;positions.push(positions[a*3],ramp.bottoms[a]-refuge.floorY,positions[a*3+2],positions[b*3],ramp.bottoms[b]-refuge.floorY,positions[b*3+2]);indices.push(a,b,c,b,d,c);}
  const rampGeometry=new THREE.BufferGeometry();rampGeometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));rampGeometry.setAttribute('uv',new THREE.Float32BufferAttribute(Array.from({length:positions.length/3},(_,i)=>[positions[i*3]*.35,positions[i*3+2]*.35]).flat(),2));rampGeometry.setIndex(indices);rampGeometry.computeVertexNormals();owned.push(rampGeometry);
  const rampMesh=new THREE.Mesh(rampGeometry,materials.mossRock);rampMesh.name='Terrain-joined natural refuge ledge';rampMesh.castShadow=true;rampMesh.receiveShadow=true;shell.add(rampMesh);
  // Thick roots wrap the slab and broken rock faces; no posts, woven roof or
  // construction pieces. Root decoration stays out of the traversable mouth.
  for(const sign of [-1,1])for(let i=0;i<3;i++){
    const x=sign*(3.6-i*.12),z=-2.4+i*2.3,root=tube([[x,refuge.floorBottom-refuge.floorY,z+.55],[x+sign*.08,.55,z+.35],[x-sign*.12,1.8,z],[x-sign*.45,2.6,z-.2]],.16+i*.045,materials.bark,15,.48);
    root.castShadow=true;owned.push(root.geometry);shell.add(root);
  }
  for(let i=0;i<5;i++){
    const z=-2.3+i*1.3,root=tube([[-3.5,3.03,z],[-1.6,3.12,z-.2],[.5,3.1,z+.1],[3.4,3.04,z+.35]],.075+(i%2)*.045,materials.bark,18,.35);root.castShadow=true;owned.push(root.geometry);roof.add(root);
  }
  // Jagged leaf litter breaks the silhouette of the naturally fallen slab;
  // its top-only skin follows the roof in a local top-down camera cutaway.
  const growth=[];
  for(let level=0;level<4;level++){
    const layer=new THREE.Group();layer.name='Natural life '+level;growth.push(layer);roof.add(layer);
    for(let i=0;i<8+level*3;i++){
      const angle=i*2.399+level*.7,x=Math.cos(angle)*(2.1+(i%3)*.48),z=.35+Math.sin(angle)*(2.1+(i%4)*.2);
      const leaf=new THREE.Mesh(leafGeometry(.65+(i%3)*.15,.85,.12),leafMaterial);owned.push(leaf.geometry);
      leaf.position.set(x,3.07+(i%3)*.025,z);leaf.rotation.set((i%3-1)*.08,angle,(i%2-.5)*.1);leaf.castShadow=true;leaf.receiveShadow=true;layer.add(leaf);
    }
    mergeStaticParts(layer,owned);
  }
  const litter=new THREE.Group();litter.name='Dry leaves inside the root hollow';shell.add(litter);
  for(let i=0;i<8;i++){const leaf=new THREE.Mesh(leafGeometry(.3,.48,.045),leafMaterial);owned.push(leaf.geometry);leaf.position.set(Math.sin(i*2.4)*2,.025,-1.1+Math.cos(i*2.4)*.7);leaf.rotation.y=i*1.7;leaf.receiveShadow=true;litter.add(leaf);}mergeStaticParts(litter,owned);
  refuge.mesh=s;
  s.userData={id:data.id,natural:true,radius:refuge.radius,owned,growth,leafMaterial,terrain:null,keepCollision:{rects:[]},trainingPoint:s.position.clone(),support:{x:data.x,z:data.z,y:refuge.floorY,type:'land',radius:0},team:data.team,refuge,refugeSolids:shell,refugeRoof:roof};
  updateNaturalShelter(s,data,teamColor);return s;
}

export function updateNaturalShelter(s,data={},teamColor){
  const old=s.userData.visualState||{},state={...old,...data},level=clamp(Math.floor(Number(state.nestLevel??state.level??state.tier??1)||0),0,3);
  s.userData.visualState={team:state.team??'neutral',tier:state.tier??1,nestLevel:level,safe:state.safe!==false,hp:state.hp,maxHp:state.maxHp,destroyed:!!state.destroyed};
  s.userData.team=s.userData.visualState.team;s.userData.level=level;s.userData.destroyed=!!state.destroyed;
  if(s.userData.refuge)s.userData.refuge.team=s.userData.team;
  s.userData.leafMaterial.color.set(teamColor(s.userData.team)).lerp(new THREE.Color('#72964b'),.7);
  s.userData.growth.forEach((g,i)=>{g.visible=i<=level;});
  s.userData.collisionRevision=(s.userData.collisionRevision||0)+1;
  return s;
}
