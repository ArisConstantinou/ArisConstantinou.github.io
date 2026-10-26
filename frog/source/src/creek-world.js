import * as THREE from 'three';

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
    nest:point({id:'creek-nest',x:17,z:16,radius:4,label:'Καταφύγιο κάτω από τα φύλλα'}),
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

export function createNaturalShelter(data,{terrainHeight,materials,rockGeos,tube,leafGeometry,mergeStaticParts,teamColor}){
  const s=new THREE.Group();s.name='Natural refuge '+(data.id||'');s.position.set(data.x,terrainHeight(data.x,data.z),data.z);
  const owned=[],leafMaterial=materials.leaf.clone();owned.push(leafMaterial);
  const foliage=new THREE.Group();foliage.name='Fallen leaves and living roots';s.add(foliage);
  const growth=[];
  for(let level=0;level<4;level++){
    const layer=new THREE.Group();layer.name='Natural life '+level;growth.push(layer);foliage.add(layer);
    for(let i=0;i<5+level*2;i++){
      const angle=i*2.399+level*.7,r=1.1+level*.48+(i%3)*.3,x=Math.cos(angle)*r,z=Math.sin(angle)*r;
      const leaf=new THREE.Mesh(leafGeometry(.6+(i%3)*.13,.85,.12),leafMaterial);owned.push(leaf.geometry);
      leaf.position.set(x,.08+(i%3)*.08,z);leaf.rotation.set((i%3-1)*.16,angle,(i%2-.5)*.18);leaf.receiveShadow=true;layer.add(leaf);
    }
    if(level>0)for(let i=0;i<3;i++){
      const angle=i*2.1+level,r=2.2+level*.3,x=Math.cos(angle)*r,z=Math.sin(angle)*r;
      const plant=tube([[x,0,z],[x*.96,.6+level*.15,z],[x*.9,.9+level*.2,z+.12]],.025,materials.reed,8,.5);owned.push(plant.geometry);layer.add(plant);
    }
    mergeStaticParts(layer,owned);
  }
  for(const sign of [-1,1]){
    const root=tube([[sign*3,-.12,1],[sign*2.2,.7,.5],[sign*1.6,1.5,-.2],[sign*.7,1.9,-1.1],[0,1.65,-1.6]],.23,materials.bark,16,.35);root.castShadow=true;owned.push(root.geometry);s.add(root);
  }
  const fallen=new THREE.Mesh(leafGeometry(2.25,1.7,.32),leafMaterial);owned.push(fallen.geometry);fallen.position.set(.1,1.42,-.55);fallen.rotation.set(-.16,.18,.12);fallen.castShadow=true;s.add(fallen);
  const stones=new THREE.InstancedMesh(rockGeos[1],materials.mossRock,7),object=new THREE.Object3D();
  for(let i=0;i<7;i++){const a=i*.81+.4;object.position.set(Math.cos(a)*(2.7+(i%2)*.3),-.03,Math.sin(a)*2.3);object.scale.set(.4+(i%3)*.1,.35,.4);object.rotation.set(0,a,0);object.updateMatrix();stones.setMatrixAt(i,object.matrix);}stones.receiveShadow=true;s.add(stones);
  s.userData={id:data.id,natural:true,radius:4,owned,growth,leafMaterial,terrain:null,keepCollision:{rects:[]},trainingPoint:s.position.clone(),support:{x:data.x,z:data.z,y:s.position.y,type:'land',radius:0},team:data.team};
  updateNaturalShelter(s,data,teamColor);return s;
}

export function updateNaturalShelter(s,data={},teamColor){
  const old=s.userData.visualState||{},state={...old,...data},level=clamp(Math.floor(Number(state.nestLevel??state.level??state.tier??1)||0),0,3);
  s.userData.visualState={team:state.team??'neutral',tier:state.tier??1,nestLevel:level,safe:state.safe!==false,hp:state.hp,maxHp:state.maxHp,destroyed:!!state.destroyed};
  s.userData.team=s.userData.visualState.team;s.userData.level=level;s.userData.destroyed=!!state.destroyed;
  s.userData.leafMaterial.color.set(teamColor(s.userData.team)).lerp(new THREE.Color('#72964b'),.7);
  s.userData.growth.forEach((g,i)=>{g.visible=i<=level;});
  s.userData.collisionRevision=(s.userData.collisionRevision||0)+1;
  return s;
}
