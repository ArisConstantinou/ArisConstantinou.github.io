import * as THREE from 'three';
import { getMaterial, MATERIALS } from './materials.js';

// Original, editable miniature-world assets. All measurements are in metres.
export const ASSETS = [
  { id:'cottage', name:'Courtyard cottage', category:'Buildings', description:'A furnished, open-door Mediterranean home.', width:6, depth:5, height:5.2 },
  { id:'townhouse', name:'Townhouse', category:'Buildings', description:'Two furnished storeys connected by a real staircase and balcony.', width:5, depth:5.5, height:9.1 },
  { id:'cafe', name:'Corner café', category:'Buildings', description:'Striped awning, terrace seating and an open interior.', width:6, depth:5, height:4.8 },
  { id:'villa', name:'Garden villa', category:'Buildings', description:'A bright modern home with a roof terrace and living room.', width:8, depth:6, height:4.2 },
  { id:'apartment', name:'City apartments', category:'Buildings', description:'Three furnished levels with connected stairs and accessible balconies.', width:6, depth:5, height:12.35 },
  { id:'wall', name:'Wall', category:'Structures', description:'A textured, solid wall for drawing your own rooms.', width:4, depth:.24, height:3 },
  { id:'floor', name:'Floor slab', category:'Structures', description:'A raised, textured floor or terrace.', width:4, depth:4, height:.16 },
  { id:'stairs', name:'Staircase', category:'Structures', description:'Twelve real steps with a side handrail.', width:2, depth:4, height:3 },
  { id:'roof', name:'Pitched roof', category:'Structures', description:'Terracotta roof with a raised ridge.', width:6.5, depth:5.5, height:1.5 },
  { id:'door', name:'Doorway', category:'Structures', description:'A framed, open doorway with a timber door.', width:1.4, depth:.65, height:2.6 },
  { id:'window', name:'Shuttered window', category:'Structures', description:'Inset glass, painted shutters and a stone sill.', width:1.8, depth:.3, height:1.6 },
  { id:'road', name:'Neighbourhood street', category:'Streets', description:'An asphalt road, lane markings and raised kerbs.', width:4, depth:8, height:.2 },
  { id:'sidewalk', name:'Stone pavement', category:'Streets', description:'A raised walkway with individual paving stones.', width:2, depth:8, height:.18 },
  { id:'fence', name:'Garden fence', category:'Streets', description:'Timber posts and rails for garden boundaries.', width:4, depth:.2, height:1.1 },
  { id:'lamp', name:'Street light', category:'Streets', description:'A warm lantern on a slender cast-metal column.', width:.7, depth:.7, height:3.8 },
  { id:'bench', name:'Park bench', category:'Streets', description:'Slatted oak seat and a metal frame.', width:2, depth:.75, height:1.05 },
  { id:'fountain', name:'Town fountain', category:'Streets', description:'A circular stone basin with flowing water.', width:3.6, depth:3.6, height:2.2 },
  { id:'tree', name:'Olive tree', category:'Nature', description:'A sculpted trunk and soft, silvery foliage.', width:3.4, depth:3.4, height:5.4 },
  { id:'pine', name:'Cypress', category:'Nature', description:'A tall evergreen for gardens and avenues.', width:1.8, depth:1.8, height:6.1 },
  { id:'palm', name:'Palm tree', category:'Nature', description:'An arched trunk with a crown of real fronds.', width:4.6, depth:4.6, height:6.2 },
  { id:'bush', name:'Garden shrub', category:'Nature', description:'A cluster of rounded, deep-green leaves.', width:1.6, depth:1.4, height:1.2 },
  { id:'flowerbed', name:'Flower bed', category:'Nature', description:'A raised stone planter with colourful flowers.', width:2.4, depth:1, height:.7 },
  { id:'rock', name:'Limestone rocks', category:'Nature', description:'A cluster of weathered limestone with irregular stone relief.', width:2.4, depth:1.8, height:1.5 },
  { id:'sofa', name:'Linen sofa', category:'Furniture', description:'Soft cushions, oak legs and a knitted throw.', width:2.2, depth:.9, height:.95 },
  { id:'bed', name:'Double bed', category:'Furniture', description:'A timber frame, linen duvet and two pillows.', width:1.7, depth:2.2, height:.95 },
  { id:'table', name:'Dining table', category:'Furniture', description:'A solid oak table with a small ceramic vase.', width:1.7, depth:1, height:1.0 },
  { id:'chair', name:'Dining chair', category:'Furniture', description:'A timber frame and upholstered seat.', width:.52, depth:.52, height:.95 },
  { id:'kitchen', name:'Kitchen counter', category:'Furniture', description:'Cabinets, a stone worktop, sink and hob.', width:2.8, depth:.65, height:1.0 },
  { id:'bookshelf', name:'Bookshelf', category:'Furniture', description:'Open oak shelves filled with colourful books.', width:1.2, depth:.35, height:1.9 },
  { id:'car', name:'Little city car', category:'Life', description:'A cheerful compact car, ready for the town.', width:1.5, depth:2.8, height:1.5 },
  { id:'person', name:'Neighbour', category:'Life', description:'A resident to give your streets a sense of life.', width:.5, depth:.4, height:1.65 },
];

const definitions = new Map(ASSETS.map(a => [a.id,a]));
const materialCache = new Map();
const geometryCache = new Map();
const scannedAlbedoMeans = {
  wood:[.2166,.1167,.0549],brick:[.1518,.0965,.0800],grass:[.1695,.1216,.0261],
  plaster:[.4939,.4403,.3683],stone:[.1756,.1481,.1064],cobble:[.1756,.1481,.1064],
};
const palette = {
  cream:'#eee4d3', trim:'#f9f2e5', teal:'#427e77', olive:'#839c68', leaf:'#6d8c5d',
  leafLight:'#9bab76', leafDark:'#537357', rose:'#c77d6a', blue:'#729aa8', dark:'#344d4b',
  slate:'#53615f', brass:'#b5a36b', linen:'#e8dbc3', mustard:'#cea66b', clay:'#b96d50',
};

function material(id, color, extra) {
  const key = `${id}|${color || ''}|${JSON.stringify(extra || {})}`;
  if (!materialCache.has(key)) {
    // Palette colours are target colours, not a second dark tint on top of the
    // photographed albedo. Preserve the scanned surface's natural variation.
    let tint;
    if(color){
      tint=new THREE.Color(color);
      const base=scannedAlbedoMeans[id]||new THREE.Color(MATERIALS.find(m=>m.id===id)?.color||'#ffffff').toArray();
      tint.setRGB(Math.min(3.5,tint.r/Math.max(.025,base[0])),Math.min(3.5,tint.g/Math.max(.025,base[1])),Math.min(3.5,tint.b/Math.max(.025,base[2])));
    }
    materialCache.set(key,getMaterial(id,{...(tint?{color:tint}:{}),...extra}));
  }
  return materialCache.get(key);
}

function geometry(key, build) {
  if (!geometryCache.has(key)) geometryCache.set(key,build());
  return geometryCache.get(key);
}

function mesh(group, shape, mat, x=0,y=0,z=0, options={}) {
  const item = new THREE.Mesh(shape,mat);
  item.position.set(x,y,z);
  item.castShadow = options.castShadow !== false;
  item.receiveShadow = true;
  item.userData = {...options};
  if(options.rx) item.rotation.x=options.rx;
  if(options.ry) item.rotation.y=options.ry;
  if(options.rz) item.rotation.z=options.rz;
  group.add(item);
  return item;
}

function box(group,w,h,d,mat,x=0,y=0,z=0,options={}) {
  const seg=options.subdivided?8:1;
  return mesh(group,geometry(`box:${w}:${h}:${d}:${seg}`,()=>new THREE.BoxGeometry(w,h,d,seg,seg,seg)),mat,x,y,z,options);
}

function roundedBox(group,w,h,d,mat,x=0,y=0,z=0,options={}) {
  const radius=Math.min(w,h,d)*.18;
  const shape=geometry(`rounded:${w}:${h}:${d}`,()=>{
    const path=new THREE.Shape(),left=-w/2+radius,right=w/2-radius,bottom=-h/2+radius,top=h/2-radius;
    path.moveTo(left,bottom-radius);path.lineTo(right,bottom-radius);path.quadraticCurveTo(right+radius,bottom-radius,right+radius,bottom);
    path.lineTo(right+radius,top);path.quadraticCurveTo(right+radius,top+radius,right,top+radius);
    path.lineTo(left,top+radius);path.quadraticCurveTo(left-radius,top+radius,left-radius,top);
    path.lineTo(left-radius,bottom);path.quadraticCurveTo(left-radius,bottom-radius,left,bottom-radius);
    const result=new THREE.ExtrudeGeometry(path,{depth:d-radius*.7,bevelEnabled:true,bevelThickness:radius*.35,bevelSize:radius*.25,bevelSegments:2,curveSegments:3,steps:1});
    result.translate(0,0,-(d-radius*.7)/2);return result;
  });
  return mesh(group,shape,mat,x,y,z,options);
}

function cushion(group,w,h,d,mat,x=0,y=0,z=0,options={}) {
  const shape=geometry(`cushion:${w}:${h}:${d}`,()=>{
    const g=new THREE.SphereGeometry(1,20,14),p=g.attributes.position,exponent=.43;
    const soft=(v,scale)=>Math.sign(v)*Math.pow(Math.abs(v),exponent)*scale/2;
    for(let i=0;i<p.count;i++)p.setXYZ(i,soft(p.getX(i),w),soft(p.getY(i),h),soft(p.getZ(i),d));
    g.computeVertexNormals();return g;
  });
  return mesh(group,shape,mat,x,y,z,options);
}

function foliage(group,r,mat,x,y,z,scale=[1,1,1],variant=0) {
  const shape=geometry(`foliage:${r}:${variant}`,()=>{
    const result=new THREE.SphereGeometry(r,14,10),positions=result.attributes.position;
    for(let i=0;i<positions.count;i++){
      const vx=positions.getX(i),vy=positions.getY(i),vz=positions.getZ(i);
      const variation=1+.075*Math.sin(vx*8+variant)*Math.cos(vy*9)*Math.sin(vz*7+.3)+.045*Math.cos(vx*13+vy*8+vz*11);
      positions.setXYZ(i,vx*variation,vy*variation,vz*variation);
    }
    result.computeVertexNormals();return result;
  });
  const item=mesh(group,shape,mat,x,y,z);item.scale.set(...scale);return item;
}

function cylinder(group,rt,rb,h,mat,x=0,y=0,z=0,options={}) {
  const n=options.segments||12;
  return mesh(group,geometry(`cyl:${rt}:${rb}:${h}:${n}`,()=>new THREE.CylinderGeometry(rt,rb,h,n)),mat,x,y,z,options);
}

function ball(group,r,mat,x=0,y=0,z=0,scale=[1,1,1],detail=1) {
  const item=mesh(group,geometry(`ico:${r}:${detail}`,()=>new THREE.IcosahedronGeometry(r,detail)),mat,x,y,z);
  item.scale.set(...scale);
  return item;
}

function beam(group,a,b,r,mat,options={}) {
  const from=new THREE.Vector3(...a),to=new THREE.Vector3(...b),mid=from.clone().add(to).multiplyScalar(.5);
  const item=cylinder(group,r,r,from.distanceTo(to),mat,mid.x,mid.y,mid.z,options);
  item.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),to.sub(from).normalize());
  return item;
}

function sub(group,x=0,y=0,z=0,rotation=0) {
  const result=new THREE.Group(); result.position.set(x,y,z); result.rotation.y=rotation; group.add(result); return result;
}

function wallWithOpenings(group,w,h,t,openings,mat) {
  let left=-w/2;
  const face={paintable:true,subdivided:true};
  for(const opening of [...openings].sort((a,b)=>a.x-b.x)) {
    const start=opening.x-opening.w/2,end=opening.x+opening.w/2;
    if(start>left+.005)box(group,start-left,h,t,mat,(start+left)/2,h/2,0,face);
    if(opening.y>0)box(group,opening.w,opening.y,t,mat,opening.x,opening.y/2,0,face);
    const top=opening.y+opening.h;
    if(h>top)box(group,opening.w,h-top,t,mat,opening.x,(h+top)/2,0,face);
    left=end;
  }
  if(w/2>left+.005)box(group,w/2-left,h,t,mat,(w/2+left)/2,h/2,0,face);
  // One continuous surface mapping across all the pieces around openings.
  for(const item of group.children){
    if(!item.isMesh)continue;
    item.geometry=item.geometry.clone();
    const p=item.geometry.attributes.position,n=item.geometry.attributes.normal,uv=item.geometry.attributes.uv;
    for(let i=0;i<p.count;i++)if(Math.abs(n.getZ(i))>.5)uv.setXY(i,(p.getX(i)+item.position.x+w/2)/2.5,(p.getY(i)+item.position.y)/2.5);
  }
}

function windowDetail(group,x,y,z,width=1.05,height=1.3,options={}) {
  const g=sub(group,x,y,z,options.rotation||0),frame=material('wood',palette.trim),shutter=material('wood',options.shutter||palette.teal);
  const glass=material('glass','#9bc7c4',{transparent:true,opacity:.53,roughness:.2,metalness:.12,emissive:'#b8a77d',emissiveIntensity:.08,side:THREE.DoubleSide});
  box(g,width-.1,height-.1,.035,glass,0,0,0,{isWindow:true,castShadow:false});
  box(g,.075,height+.1,.12,frame,-width/2,0,.055);
  box(g,.075,height+.1,.12,frame,width/2,0,.055);
  box(g,width+.12,.075,.12,frame,0,height/2,.055);
  box(g,width+.12,.075,.12,frame,0,-height/2,.055);
  box(g,.04,height,.07,frame,0,0,.09);
  box(g,width,.04,.07,frame,0,.05,.09);
  box(g,width+.3,.12,.3,material('stone',palette.trim),0,-height/2-.06,.06);
  if(options.shutters!==false)for(const side of [-1,1]){
    box(g,width*.31,height+.08,.09,shutter,side*(width*.69),0,.14,{paintable:true});
    for(let k=0;k<6;k++)box(g,width*.28,.025,.022,material('wood',palette.dark),side*(width*.69),-.5*height+.15+k*height*.15,.195);
  }
  return g;
}

function doorDetail(group,x,y,z,options={}) {
  const g=sub(group,x,y,z,options.rotation||0),w=options.width||1.04,h=options.height||2.3;
  const frame=material('stone',palette.trim),wood=material('wood',options.color||palette.teal);
  box(g,.13,h+.14,.28,frame,-w/2-.06,h/2,0);
  box(g,.13,h+.14,.28,frame,w/2+.06,h/2,0);
  box(g,w+.26,.16,.28,frame,0,h+.04,0);
  const pivot=sub(g,-w/2,0,-.08,options.closed?0:-1.28);
  box(pivot,w-.07,h-.05,.075,wood,(w-.07)/2,h/2,0,{paintable:true});
  box(pivot,w-.25,h*.41,.025,material('wood',palette.dark),w/2,h*.28,.045);
  box(pivot,w-.25,h*.35,.025,material('wood',palette.dark),w/2,h*.73,.045);
  ball(pivot,.043,material('metal',palette.brass),w-.17,h*.5,.1,[1,1,1],1);
  box(g,w+.3,.1,.55,material('stone'),0,.01,.12,{paintable:true});
  return g;
}

function pitchedRoof(group,w,d,baseY,rise=1.45,options={}) {
  const g=sub(group,0,baseY,0);g.userData.isRoof=true;
  const over=.32,half=w/2+over,angle=Math.atan2(rise,half),length=Math.hypot(half,rise),roofMat=material('roof',options.color||palette.clay);
  box(g,length,.18,d+over*2,roofMat,-half/2,rise/2,0,{rz:angle,isRoof:true,paintable:true,subdivided:true});
  box(g,length,.18,d+over*2,roofMat,half/2,rise/2,0,{rz:-angle,isRoof:true,paintable:true,subdivided:true});
  // Individually curved clay tiles: the ridges and overlapping rows are geometry,
  // so their relief remains visible in silhouette and casts real shadows.
  const tileLength=.58,tileRadius=.14,rows=Math.ceil(length/.48),columns=Math.ceil((d+over*2)/.28);
  const tileShape=geometry('terracotta-half-tile',()=>{
    const vertices=[],uvs=[],segments=8;
    const point=(end,j)=>{const theta=j/segments*Math.PI;return [end*tileLength,Math.sin(theta)*tileRadius,Math.cos(theta)*tileRadius];};
    for(let j=0;j<segments;j++){
      const p=[point(0,j),point(1,j),point(1,j+1),point(0,j),point(1,j+1),point(0,j+1)];
      p.forEach((v,k)=>{vertices.push(...v);uvs.push(k===0||k===3||k===5?0:1,(j+(k===2||k===4||k===5?1:0))/segments);});
    }
    const result=new THREE.BufferGeometry();result.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));result.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));result.computeVertexNormals();return result;
  });
  const tileMaterials=[roofMat,material('roof','#c47a58'),material('roof','#b16a50')];
  for(const side of [-1,1])for(let row=0;row<rows;row++)for(let column=0;column<columns;column++){
    const distance=row*.48-.02,z=-(d+over*2)/2+.14+column*.28;
    const tile=mesh(g,tileShape,tileMaterials[(row*7+column*3)%11===0?1:(row+column)%13===0?2:0],side*distance*Math.cos(angle),rise-distance*Math.sin(angle)+.11,z,{isRoof:true,paintable:true});
    tile.rotation.z=side===1?-angle:Math.PI+angle;
    if(side===-1){tile.rotation.x=Math.PI;}
  }
  cylinder(g,.13,.13,d+over*2+.08,roofMat,0,rise+.07,0,{rx:Math.PI/2,isRoof:true,segments:10});
  const tri=new THREE.Shape();tri.moveTo(-w/2,0);tri.lineTo(w/2,0);tri.lineTo(0,rise-.08);tri.closePath();
  const gable=new THREE.ExtrudeGeometry(tri,{depth:.16,bevelEnabled:false});
  for(const side of [-1,1])mesh(g,gable,material('plaster',options.wallColor||palette.cream),0,0,side*d/2-.08,{isRoof:true,paintable:true});
  for(const side of [-1,1])box(g,.1,.15,d+.72,material('wood',palette.trim),side*(w/2+.31),-.015,0,{isRoof:true});
  if(options.chimney!==false){
    box(g,.55,1.4,.65,material('brick',palette.rose),w*.27,rise+.15,-d*.22,{isRoof:true,paintable:true});
    box(g,.7,.16,.8,material('stone',palette.trim),w*.27,rise+.85,-d*.22,{isRoof:true});
    box(g,.38,.025,.48,material('metal','#48504a'),w*.27,rise+.94,-d*.22,{isRoof:true});
  }
  return g;
}

function rug(group,x,z,w=2.2,d=1.5) {
  box(group,w,.025,d,material('plaster','#b77e61'),x,.205,z);
  for(const end of [-1,1])box(group,w-.12,.03,.045,material('plaster','#eee0bf'),x,.224,z+end*d*.37);
}

function sofa(group,options={}) {
  const wood=material('wood','#8d7357'),cloth=material('plaster',options.color||palette.linen);
  for(const x of [-.85,.85])for(const z of [-.29,.29])cylinder(group,.035,.035,.2,wood,x,.1,z);
  roundedBox(group,2.15,.3,.85,cloth,0,.37,0,{paintable:true});
  roundedBox(group,2.15,.5,.18,cloth,0,.69,-.34,{paintable:true});
  for(const x of [-1,1])roundedBox(group,.18,.43,.83,cloth,x,.58,0,{paintable:true});
  for(const x of [-.49,.49]){
    cushion(group,.88,.15,.64,material('plaster','#f3e9d8'),x,.59,.055);
    cushion(group,.87,.36,.17,cloth,x,.76,-.235,{rx:-.13});
  }
  cushion(group,.38,.38,.16,material('plaster',palette.teal),-.65,.78,-.115,{rz:-.12,rx:-.15});
  cushion(group,.36,.36,.16,material('plaster',palette.mustard),.65,.78,-.115,{rz:.18,rx:-.15});
  const drape=geometry('linen-sofa-throw',()=>{
    const g=new THREE.PlaneGeometry(.42,.83,10,20);g.rotateX(-Math.PI/2);
    const p=g.attributes.position;
    for(let i=0;i<p.count;i++){
      const x=p.getX(i),rawZ=p.getZ(i)+.085,fold=.004*Math.sin(x*40+rawZ*3);
      let y=.682,z=rawZ;
      if(rawZ>.365){
        const t=(rawZ-.365)/.135;
        if(t<=.45){const angle=t/.45*Math.PI/2;z=.365+.1*Math.sin(angle);y=.682-.1*(1-Math.cos(angle));}
        else{z=.465;y=.582-(t-.45)/.55*.25;}
      }
      p.setXYZ(i,x,y+fold,z);
    }
    g.computeVertexNormals();return g;
  });
  mesh(group,drape,material('plaster','#a9b5a0',{side:THREE.DoubleSide}),.38,0,0);
}

function bed(group,options={}) {
  const wood=material('wood','#9d8061'),linen=material('plaster',options.color||palette.linen);
  box(group,1.7,.22,2.2,wood,0,.26,0,{paintable:true});
  for(const x of [-.7,.7])for(const z of [-.9,.9])box(group,.1,.2,.1,wood,x,.1,z);
  box(group,1.75,.84,.12,wood,0,.52,-1.06);
  roundedBox(group,1.59,.2,2.05,material('plaster','#f9f3e8'),0,.47,.015);
  roundedBox(group,1.62,.13,1.4,linen,0,.61,.3,{paintable:true});
  box(group,1.63,.06,.45,material('plaster',palette.teal),0,.69,.73);
  for(const x of [-.41,.41])cushion(group,.62,.15,.43,material('plaster','#faf6ed'),x,.64,-.71,{rz:x*.025});
}

function table(group,options={}) {
  const wood=material('wood',options.color||'#a88d68');
  box(group,1.7,.1,1,wood,0,.77,0,{paintable:true});
  for(const x of [-.67,.67])for(const z of [-.34,.34])box(group,.09,.75,.09,wood,x,.375,z);
  cylinder(group,.08,.11,.2,material('plaster',palette.trim),.25,.92,0);
  beam(group,[.25,1,0],[.23,1.2,.03],.013,material('grass',palette.leafDark));
  ball(group,.1,material('grass',palette.olive),.25,1.14,0,[1,.6,1]);
}

function chair(group,options={}) {
  const wood=material('wood','#9c805f');
  for(const x of [-.2,.2])for(const z of [-.2,.2])box(group,.05,.46,.05,wood,x,.23,z);
  box(group,.51,.07,.5,material('plaster',options.color||palette.linen),0,.48,0,{paintable:true});
  for(const x of [-.2,.2])box(group,.05,.43,.05,wood,x,.72,-.21);
  box(group,.47,.16,.05,wood,0,.85,-.21);
}

function kitchen(group) {
  const cabinet=material('wood',palette.teal),top=material('stone',palette.trim),metal=material('metal',palette.slate);
  box(group,2.8,.82,.61,cabinet,0,.45,0,{paintable:true});
  box(group,2.87,.09,.68,top,0,.905,0,{paintable:true});
  for(const x of [-1.05,-.35,.35,1.05]){
    box(group,.64,.68,.025,material('wood','#608e7d'),x,.48,.32);
    box(group,.18,.025,.04,metal,x,.67,.35);
  }
  box(group,.62,.012,.42,metal,-.72,.958,0);
  box(group,.49,.013,.3,material('glass','#95b7b1'),-.72,.966,.02);
  beam(group,[-.72,.96,-.2],[-.72,1.15,-.2],.025,metal);
  beam(group,[-.72,1.15,-.2],[-.72,1.15,-.06],.025,metal);
  box(group,.67,.025,.46,material('metal','#313b39'),.64,.97,0);
  for(const x of [.45,.83])for(const z of [-.12,.12])cylinder(group,.085,.085,.012,metal,x,.991,z);
}

function bookshelf(group) {
  const wood=material('wood','#a58b68');
  for(const x of [-.57,.57])box(group,.07,1.9,.35,wood,x,.95,0,{paintable:true});
  for(let level=0;level<5;level++)box(group,1.2,.055,.35,wood,0,.045+level*.455,0);
  box(group,1.13,1.85,.035,material('wood','#b19a7c'),0,.95,-.16);
  const colors=[palette.rose,palette.teal,palette.mustard,'#b6bda3','#7c91a1'];
  for(let row=0;row<4;row++)for(let i=0;i<7;i++){
    const height=.23+(i%3)*.04;
    box(group,.095,height,.22,material('plaster',colors[(i+row)%colors.length]),-.43+i*.14,.085+row*.455+height/2,0,{rz:i===6?.1:0});
  }
}

function furnitureInterior(group,w,d,kind='home') {
  const floorY=.18;
  const furniture=sub(group,0,floorY,0);
  if(kind==='cafe'){
    const k=sub(furniture,0,0,-d*.34);kitchen(k);
    for(const x of [-w*.28,w*.28]){
      const t=sub(furniture,x,0,.1);table(t);
      const c=sub(furniture,x,0,1);chair(c);
    }
    bookshelf(sub(furniture,-w*.38,0,-1.2,Math.PI/2));
  }else if(kind==='multi'){
    // The left side remains a clear route to the stairs; living space is right.
    kitchen(sub(furniture,.65,0,-d/2+.48));
    sofa(sub(furniture,w/2-.68,0,.05,-Math.PI/2),{color:palette.linen});
    rug(group,.4,.3,1.75,1.55);
    const coffee=sub(furniture,.42,0,.3);coffee.scale.set(.48,.55,.6);table(coffee);
    pottedPlant(sub(furniture,w/2-.45,0,d/2-.48));
  }else{
    sofa(sub(furniture,-w*.24,0,-d*.19,Math.PI/2),{color:palette.linen});
    rug(group,-w*.05,-d*.04,2.3,1.6);
    const coffee=sub(furniture,-w*.03,0,-d*.04);coffee.scale.set(.62,.58,.68);table(coffee);
    bed(sub(furniture,w*.24,0,-d*.23));
    kitchen(sub(furniture,-w*.22,0,d*.31,Math.PI));
    const plant=sub(furniture,w*.36,0,d*.3);pottedPlant(plant);
  }
}

function pottedPlant(group) {
  cylinder(group,.18,.13,.32,material('roof',palette.rose),0,.16,0);
  cylinder(group,.145,.145,.025,material('dirt'),0,.33,0);
  beam(group,[0,.32,0],[0,.85,0],.02,material('wood','#827354'));
  for(let i=0;i<5;i++){
    const a=i*2.4;const leaf=ball(group,.19,material('grass',i%2?palette.leaf:palette.olive),Math.cos(a)*.12,.55+i*.075,Math.sin(a)*.12,[1,.45,.7]);leaf.rotation.z=Math.sin(a)*.5;
  }
}

function interiorStair(group,x,baseY,rise,run,width=1.05) {
  const stair=sub(group,x,baseY,0),treads=13;
  const timber=material('wood','#c1a47c'),trim=material('wood','#d2ba92'),rail=material('metal',palette.dark);
  for(let i=0;i<treads;i++){
    const top=(i+1)*rise/treads,z=run/2-(i+.5)*run/treads;
    // Treads and risers follow the slope, leaving headroom below stacked flights.
    box(stair,width,.13,run/treads+.012,timber,0,top-.065,z,{paintable:true,isStair:true});
    box(stair,width,rise/treads,.045,timber,0,top-rise/(2*treads),z+run/(2*treads)-.02,{paintable:true,isStair:true});
    box(stair,width+.025,.035,run/treads+.025,trim,0,top-.0175,z+.008,{paintable:true,isStair:true});
  }
  for(const side of [-1,1])beam(stair,[side*(width/2-.08),.06,run/2-.08],[side*(width/2-.08),rise-.2,-run/2+.08],.065,timber);
  const right=width/2-.035;
  for(let i=0;i<5;i++){
    const t=i/4,z=run/2-.1-t*(run-.2),y=rise*(.05+t*.9);
    beam(stair,[right,y,z],[right,y+.86,z],.018,rail);
  }
  beam(stair,[right,1.02,run/2-.08],[right,rise+.84,-run/2+.08],.032,rail);
}

function upperFloor(group,w,d,topY,stairX,run,hasNextFloor) {
  const left=-w/2+.13,right=w/2-.13,back=-d/2+.13,front=d/2-.13;
  const openingLeft=stairX-.59,openingRight=stairX+.59,openingBack=-run/2-.02,openingFront=run/2+.02;
  const floor=material('wood','#c3aa82'),cornice=material('stone',palette.trim);
  const slab=(x1,x2,z1,z2)=>{
    if(x2-x1>.001&&z2-z1>.001)box(group,x2-x1,.15,z2-z1,floor,(x1+x2)/2,topY-.075,(z1+z2)/2,{paintable:true});
  };
  slab(left,openingLeft,back,front);
  slab(openingRight,right,back,front);
  slab(openingLeft,openingRight,back,openingBack);
  slab(openingLeft,openingRight,openingFront,front);
  // The outside cornice is a ring, not a ceiling across the stair opening.
  for(const side of [-1,1]){
    box(group,w+.18,.14,.17,cornice,0,topY-.07,side*d/2,{paintable:true});
    box(group,.17,.14,d+.18,cornice,side*w/2,topY-.07,0,{paintable:true});
  }
  const rail=material('metal',palette.dark),railingX=openingRight+.015;
  beam(group,[railingX,topY+.85,openingBack+.05],[railingX,topY+.85,openingFront-.05],.028,rail);
  for(let i=0;i<8;i++){
    const z=openingBack+.08+(openingFront-openingBack-.16)*i/7;
    beam(group,[railingX,topY,z],[railingX,topY+.85,z],.017,rail);
  }
  if(!hasNextFloor){
    beam(group,[openingLeft,topY+.85,openingFront],[openingRight,topY+.85,openingFront],.028,rail);
    for(let i=0;i<5;i++){
      const x=openingLeft+(openingRight-openingLeft)*i/4;
      beam(group,[x,topY,openingFront],[x,topY+.85,openingFront],.017,rail);
    }
  }
}

function upstairsInterior(group,w,d,topY,level) {
  const g=sub(group,0,topY,0);
  bed(sub(g,w/2-1.25,0,-d*.19),{color:level%2?palette.linen:'#b6c1b0'});
  bookshelf(sub(g,w/2-.34,0,.82,-Math.PI/2));
  const desk=sub(g,.7,0,d/2-.9);desk.scale.set(.65,.92,.65);table(desk);
  chair(sub(g,.7,0,d/2-1.55),{color:palette.teal});
  const bedside=sub(g,w/2-2.33,0,-d*.32);bedside.scale.set(.27,.65,.4);table(bedside);
  pottedPlant(sub(g,w/2-.38,0,d/2-.4));
  // A runner leaves the stair landing and central circulation clear.
  box(g,1.05,.018,1.4,material('plaster','#b68a72'),-.1,.012,.4);
}

function house(group,kind,options={}) {
  const info=definitions.get(kind),w=info.width,d=info.depth;
  const wallColor=options.color||(kind==='townhouse'?'#dbb69b':kind==='cafe'?'#d7d8bd':kind==='apartment'?'#c9957e':palette.cream);
  const wallMat=material(options.material||(kind==='apartment'?'brick':'plaster'),wallColor);
  const floorMat=material('wood','#c3aa82');
  const floors=kind==='townhouse'?2:kind==='apartment'?3:1,h=kind==='villa'?3.65:3.25;
  const stairX=-w/2+.78,stairRun=3.38;
  box(group,w+.36,.2,d+.36,material('stone','#d2c7af'),0,.1,0,{paintable:true});
  box(group,w-.25,.04,d-.25,floorMat,0,.21,0,{paintable:true});
  const front=sub(group,0,.2,d/2);
  wallWithOpenings(front,w,h,.23,[{x:-w*.31,w:1.05,y:1.05,h:1.3},{x:0,w:1.1,y:0,h:2.35},{x:w*.31,w:1.05,y:1.05,h:1.3}],wallMat);
  doorDetail(group,0,.2,d/2+.03,{color:kind==='cafe'?palette.rose:palette.teal,width:1.1,height:2.35});
  for(const x of [-w*.31,w*.31])windowDetail(group,x,1.9,d/2+.04,1.05,1.3,{shutter:kind==='townhouse'?'#809d9f':palette.teal});
  box(group,w,h,.23,wallMat,0,.2+h/2,-d/2,{paintable:true,subdivided:true});
  for(const side of [-1,1]){
    const g=sub(group,side*w/2,.2,0,side*Math.PI/2);
    wallWithOpenings(g,d,h,.23,[{x:0,w:1.4,y:1.05,h:1.3}],wallMat);
    windowDetail(g,0,1.7,.035,1.4,1.3,{shutters:false});
  }
  for(const side of [-1,1])box(group,.2,h,.16,material('stone',palette.trim),side*(w/2-.05),h/2+.2,d/2+.16);
  for(let level=1;level<floors;level++){
    const y=.2+level*h,floorTop=y+.03;
    upperFloor(group,w,d,floorTop,stairX,stairRun,level<floors-1);
    interiorStair(group,stairX,.23+(level-1)*h,h,stairRun);
    const gf=sub(group,0,y,d/2);
    wallWithOpenings(gf,w,h,.23,[{x:-w*.28,w:1.1,y:.8,h:1.65},{x:0,w:1.05,y:0,h:2.35},{x:w*.28,w:1.1,y:.8,h:1.65}],wallMat);
    doorDetail(group,0,y,d/2+.03,{color:palette.teal,width:1.05,height:2.35});
    for(const x of [-w*.28,w*.28])windowDetail(group,x,y+1.625,d/2+.04,1.1,1.65,{shutter:'#7f9d9b'});
    box(group,w,h,.23,wallMat,0,y+h/2,-d/2,{paintable:true});
    for(const side of [-1,1]){
      const sideWall=sub(group,side*w/2,y,0,side*Math.PI/2);
      wallWithOpenings(sideWall,d,h,.23,[{x:0,w:1.4,y:1.05,h:1.3}],wallMat);
      windowDetail(sideWall,0,1.7,.035,1.4,1.3,{shutters:false});
    }
    balcony(group,0,floorTop-.075,d/2+.6,w*.69,1.18);
    pottedPlant(sub(group,w*.27,floorTop,d/2+.81));
    upstairsInterior(group,w,d,floorTop,level);
  }
  if(kind==='villa'){
    const topY=h+.2;
    box(group,w+.5,.24,d+.5,material('concrete',palette.trim),0,topY,0,{isRoof:true,paintable:true});
    for(const side of [-1,1])box(group,.13,.5,d+.5,wallMat,side*(w/2+.15),topY+.35,0,{isRoof:true});
    box(group,w+.4,.5,.13,wallMat,0,topY+.35,-d/2-.15,{isRoof:true});
    box(group,w+1,.15,1.6,material('wood',palette.trim),0,2.88,d/2+.72,{isRoof:true});
    for(const side of [-1,1])box(group,.13,2.8,.13,material('wood',palette.trim),side*(w/2+.22),1.5,d/2+1.32);
    box(group,w+1,.16,1.9,material('stone','#ddd1b8'),0,.1,d/2+.75,{paintable:true});
  }else pitchedRoof(group,w,d,.2+h*floors,kind==='cafe'?1.15:1.45,{wallColor,chimney:kind!=='cafe'});
  furnitureInterior(group,w,d,kind==='cafe'?'cafe':floors>1?'multi':'home');
  if(kind==='cafe'){
    const awning=sub(group,0,2.75,d/2+.72);
    for(let i=0;i<12;i++)box(awning,(w-.3)/12,.07,1.45,material('plaster',i%2?palette.trim:palette.rose),-(w-.3)/2+(i+.5)*(w-.3)/12,0,0,{rx:.14});
    box(awning,w-.3,.25,.055,material('plaster',palette.rose),0,-.16,.72);
    const signMat=signMaterial('CAFÉ',palette.trim,palette.dark);
    box(group,1.7,.42,.07,signMat,0,2.82,d/2+.16);
    for(const x of [-2,2]){
      const t=sub(group,x,0,d/2+1.7);t.scale.set(.55,.85,.6);table(t);
      chair(sub(group,x+.58,0,d/2+1.7,-Math.PI/2));
      chair(sub(group,x-.58,0,d/2+1.7,Math.PI/2));
    }
  }else{
    pottedPlant(sub(group,-.95,.2,d/2+.43));
    pottedPlant(sub(group,.95,.2,d/2+.43));
  }
  group.userData.enterable=true;
  group.userData.floorHeights=Array.from({length:floors},(_,level)=>.23+level*h);
  group.userData.staircase=floors>1?{x:stairX,startZ:stairRun/2,endZ:-stairRun/2,width:1.05,steps:13,riser:h/13}:null;
  group.userData.interiorSpawn={x:0,y:1.9,z:d/2-1.1};
  group.userData.entrance={x:0,y:.2,z:d/2+.7};
}

function signMaterial(label,bg,fg) {
  const key=`sign:${label}:${bg}:${fg}`;
  if(materialCache.has(key))return materialCache.get(key);
  const c=document.createElement('canvas');c.width=512;c.height=128;
  const ctx=c.getContext('2d');ctx.fillStyle=bg;ctx.fillRect(0,0,512,128);ctx.fillStyle=fg;ctx.font='bold 68px Georgia, serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,256,67);
  const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;
  const m=new THREE.MeshStandardMaterial({map:texture,roughness:.8});materialCache.set(key,m);return m;
}

function balcony(group,x,y,z,w,d) {
  const g=sub(group,x,y,z),metal=material('metal',palette.slate);
  box(g,w,.15,d,material('stone',palette.trim));
  box(g,w,.05,.045,metal,0,.87,d/2);
  for(let i=0;i<=Math.ceil(w/.25);i++)box(g,.025,.78,.025,metal,-w/2+i*w/Math.ceil(w/.25),.45,d/2);
  for(const side of [-1,1])box(g,.04,.05,d,metal,side*w/2,.87,0);
}

function stairs(group,options={}) {
  const width=options.width||2,depth=options.depth||4,height=options.height||3,n=12;
  const mat=material(options.material||'stone',options.color||'#d5c9b4');
  for(let i=0;i<n;i++)box(group,width,height*(i+1)/n,depth/n,mat,0,height*(i+1)/(2*n),depth/2-depth*(i+.5)/n,{paintable:true,subdivided:true,isStair:true});
  const rail=material('metal',palette.slate);
  for(const side of [-1,1]){
    for(let i=0;i<5;i++){
      const z=depth/2-.15-i*(depth-.3)/4,y=height*(.1+i*.21);
      beam(group,[side*(width/2-.06),y,z],[side*(width/2-.06),y+.85,z],.025,rail);
    }
    beam(group,[side*(width/2-.06),1,depth/2-.1],[side*(width/2-.06),height+.85,-depth/2+.1],.045,rail);
  }
}

function road(group) {
  box(group,4,.09,8,material('asphalt','#777d75'),0,.045,0,{paintable:true});
  for(const side of [-1,1]){
    box(group,.15,.2,8,material('concrete','#d9d4c4'),side*1.93,.1,0);
    box(group,.035,.012,8,material('plaster','#eee7cf'),side*1.65,.097,0);
  }
  for(let i=0;i<4;i++)box(group,.085,.012,.8,material('plaster','#e9ddae'),0,.098,-3+i*2);
  box(group,.38,.015,.65,material('metal','#4a5049'),1.68,.105,2.5);
  for(let i=0;i<5;i++)box(group,.31,.016,.025,material('asphalt','#252e2a'),1.68,.12,2.25+i*.11);
}

function sidewalk(group) {
  box(group,2,.16,8,material('stone','#c7bda6'),0,.08,0,{paintable:true});
  const paver=material('stone','#e1d5bd');
  for(let x=0;x<3;x++)for(let z=0;z<12;z++)box(group,.625,.025,.625,paver,-.65+x*.65,.172,-3.575+z*.65);
}

function fence(group) {
  const wood=material('wood','#b5a184');
  for(let i=0;i<9;i++)box(group,.11,1.05,.11,wood,-2+i*.5,.525,0,{paintable:true});
  box(group,4.15,.12,.09,wood,0,.32,.08);box(group,4.15,.12,.09,wood,0,.8,.08);
}

function tree(group,options={}) {
  const trunk=material('wood','#8b7d61');
  cylinder(group,.16,.31,2.6,trunk,0,1.3,0,{segments:9});
  beam(group,[0,1.6,0],[-.85,3,-.35],.12,trunk);
  beam(group,[0,1.5,0],[.8,3.3,.2],.13,trunk);
  beam(group,[0,2,0],[.2,3.6,-.65],.1,trunk);
  for(let i=0;i<6;i++){
    const angle=i*2.4;
    beam(group,[Math.cos(angle)*.07,.32,Math.sin(angle)*.07],[Math.cos(angle)*.55,.04,Math.sin(angle)*.55],.07,trunk);
    beam(group,[Math.cos(angle)*.4,2.55,Math.sin(angle)*.4],[Math.cos(angle)*1.15,3.8+Math.sin(i)*.4,Math.sin(angle)*1.15],.055,trunk);
  }
  const clumps=[[-.85,3.35,-.1,1.15],[.8,3.6,.25,1.18],[.05,4.25,-.45,1.22],[.1,3.2,.8,1.13],[-.75,4.05,.6,.92],[.9,4.35,-.2,.85]];
  clumps.forEach(([x,y,z,r],i)=>foliage(group,r,material('grass',i%3===0?palette.leafLight:i%3===1?palette.olive:palette.leaf),x,y,z,[1,.86,1],i));
  for(let i=0;i<14;i++){
    const angle=i*2.4,radius=1.25+Math.sin(i*3)*.2;
    foliage(group,.38,material('grass',i%2?palette.leafLight:palette.olive),Math.cos(angle)*radius,3.6+Math.sin(i*.9)*.8,Math.sin(angle)*radius,[1,.8,1],i%3);
  }
}

function pine(group) {
  const trunk=material('wood','#927c5b');cylinder(group,.1,.2,2.1,trunk,0,1.05,0);
  for(let i=0;i<7;i++){
    const y=1.8+i*.58,rad=.73-i*.074;
    foliage(group,rad,material('grass',i%2?palette.leafDark:palette.leaf),Math.sin(i*1.4)*.06,y,Math.cos(i)*.04,[1,1.6,1],i%3);
    for(let j=0;j<3;j++){
      const angle=i+j*Math.PI*2/3;
      foliage(group,rad*.5,material('grass',j%2?palette.leaf:palette.leafDark),Math.cos(angle)*rad*.64,y-.15,Math.sin(angle)*rad*.64,[1,1.35,1],j);
    }
  }
}

function palm(group) {
  const trunk=material('wood','#ae9771');
  for(let i=0;i<8;i++){
    const h=.61,x=Math.sin(i*.16)*.33;
    cylinder(group,.19-i*.01,.23-i*.01,h,trunk,x,.3+i*.59,0,{segments:10,rz:-.055});
    cylinder(group,.235-i*.01,.24-i*.01,.065,material('wood','#907e5d'),x,.1+i*.59,0,{segments:10});
  }
  for(let i=0;i<9;i++){
    const a=i*Math.PI*2/9;
    const frond=sub(group,.29,4.85,0,a);
    beam(frond,[0,0,0],[1.1,.65,0],.04,material('grass',palette.leafDark));
    beam(frond,[1.1,.65,0],[2.25,-.14,0],.025,material('grass',palette.leafDark));
    for(let k=0;k<7;k++){
      const x=.25+k*.25,y=Math.sin((x/2.25)*Math.PI)*.6;
      const b=box(frond,.6,.025,.16,material('grass',i%2?palette.leaf:palette.olive),x,y,0,{ry:k%2?.25:-.25,rz:.15-(k/7)*.5});
      b.scale.z=2.6*(1-k/9);
    }
  }
  for(let i=0;i<3;i++)ball(group,.16,material('wood','#75654e'),.29+Math.cos(i*2.1)*.2,4.65,Math.sin(i*2.1)*.2);
}

function bush(group) {
  for(const [x,z,r] of [[-.45,0,.57],[.38,.16,.65],[0,-.35,.55]])foliage(group,r,material('grass',x<0?palette.leaf:palette.leafDark),x,r*.7,z,[1,.85,1],x<0?0:1);
}

function flowerbed(group) {
  const edge=material('stone','#bfb29a');
  box(group,2.4,.4,1,edge,0,.2,0,{paintable:true});
  box(group,2.2,.025,.8,material('dirt'),0,.412,0);
  const colors=['#d6a384','#bf7184','#e4cc8b'];
  for(let i=0;i<9;i++){
    const x=-.95+(i%5)*.46,z=i<5?-.19:.19,y=.57+(i%3)*.05;
    beam(group,[x,.4,z],[x,y,z],.014,material('grass',palette.leafDark));
    ball(group,.14,material('plaster',colors[i%3]),x,y,z,[1,.65,1]);
  }
}

function rock(group) {
  [[-.4,.57,0,.85],[.7,.3,.2,.5],[-.75,.25,.55,.4]].forEach(([x,y,z,r],i)=>{
    const shape=geometry(`weathered-boulder:${r}:${i}`,()=>{
      const result=new THREE.IcosahedronGeometry(r,2),p=result.attributes.position;
      for(let index=0;index<p.count;index++){
        const vx=p.getX(index),vy=p.getY(index),vz=p.getZ(index);
        const noise=1+.09*Math.sin(vx*13+vz*9+i)*Math.cos(vy*11)+.04*Math.sin(vx*23+vy*15);
        p.setXYZ(index,vx*noise,vy*noise,vz*noise);
      }
      result.computeVertexNormals();return result;
    });
    const b=mesh(group,shape,material('stone',i%2?'#b7b5a3':'#c9c4ae'),x,y,z,{paintable:true});b.scale.set(1,.9,.8);b.rotation.set(.2+i,.3,.1*i);
  });
}

function bench(group) {
  const wood=material('wood','#b59a6f'),metal=material('metal',palette.slate);
  for(const x of [-.75,.75]){
    box(group,.09,.48,.58,metal,x,.24,0);
    box(group,.08,.55,.07,metal,x,.68,-.28,{rx:-.13});
    box(group,.06,.04,.55,metal,x,.66,0);
  }
  for(let i=0;i<4;i++)box(group,2,.065,.13,wood,0,.48,-.22+i*.145,{paintable:true});
  for(let i=0;i<3;i++)box(group,2,.13,.055,wood,0,.67+i*.15,-.31-i*.018,{paintable:true});
}

function lamp(group) {
  const metal=material('metal',palette.dark);
  cylinder(group,.14,.22,.22,metal,0,.11,0);
  cylinder(group,.065,.11,3.15,metal,0,1.7,0);
  cylinder(group,.26,.18,.16,metal,0,3.26,0);
  const warm=material('glass','#fff0bd',{transparent:true,opacity:.78,emissive:'#ffd493',emissiveIntensity:.65});
  box(group,.34,.45,.34,warm,0,3.54,0,{isLight:true,castShadow:false});
  for(const x of [-.18,.18])for(const z of [-.18,.18])box(group,.025,.5,.025,metal,x,3.54,z);
  cylinder(group,.04,.34,.26,metal,0,3.9,0,{segments:4,ry:Math.PI/4});
  ball(group,.06,metal,0,4.06,0);
}

function fountain(group) {
  const stone=material('stone','#d8cebb');
  cylinder(group,1.75,1.9,.22,stone,0,.11,0,{segments:32});
  const ring=geometry('fountain-ring',()=>new THREE.TorusGeometry(1.58,.18,8,32));
  mesh(group,ring,stone,0,.43,0,{rx:Math.PI/2,paintable:true});
  const water=material('water','#77bfc0',{transparent:true,opacity:.74,roughness:.15,metalness:.18});
  cylinder(group,1.55,1.55,.035,water,0,.35,0,{segments:32,isWater:true,castShadow:false});
  cylinder(group,.2,.4,1.12,stone,0,.9,0);
  cylinder(group,.76,.36,.18,stone,0,1.48,0,{segments:24});
  cylinder(group,.67,.67,.025,water,0,1.58,0,{segments:24,isWater:true,castShadow:false});
  cylinder(group,.08,.16,.55,stone,0,1.83,0);
  ball(group,.12,water,0,2.15,0,[1,1.3,1]);
  for(let i=0;i<8;i++){
    const a=i*Math.PI/4,x=Math.cos(a),z=Math.sin(a);
    beam(group,[x*.65,1.54,z*.65],[x*.81,.42,z*.81],.016,water,{isWater:true,castShadow:false});
  }
}

function car(group,options={}) {
  const paint=material('metal',options.color||'#cb8a65',{roughness:.35,metalness:.22}),tire=material('asphalt','#333d38'),glass=material('glass','#90b9bd',{roughness:.13,metalness:.25});
  const sideBody=geometry('compact-car-profile',()=>{
    const shape=new THREE.Shape();shape.moveTo(-1.3,.42);shape.quadraticCurveTo(-1.46,.55,-1.3,.76);shape.lineTo(-.85,.85);shape.lineTo(.84,.85);shape.quadraticCurveTo(1.4,.83,1.4,.62);shape.lineTo(1.3,.42);shape.closePath();
    const g=new THREE.ExtrudeGeometry(shape,{depth:1.3,bevelEnabled:true,bevelSize:.07,bevelThickness:.04,bevelSegments:3,curveSegments:5});g.translate(0,0,-.65);g.rotateY(Math.PI/2);return g;
  });
  mesh(group,sideBody,paint,0,0,0,{paintable:true});
  const cabin=geometry('compact-car-cabin',()=>{
    const shape=new THREE.Shape();shape.moveTo(-.71,.84);shape.lineTo(-.47,1.39);shape.quadraticCurveTo(-.35,1.45,-.25,1.45);shape.lineTo(.67,1.45);shape.lineTo(.98,.85);shape.closePath();
    const g=new THREE.ExtrudeGeometry(shape,{depth:1.17,bevelEnabled:true,bevelSize:.045,bevelThickness:.035,bevelSegments:2,curveSegments:4});g.translate(0,0,-.585);g.rotateY(Math.PI/2);return g;
  });
  mesh(group,cabin,paint,0,0,0,{paintable:true});
  box(group,1.1,.44,.03,glass,0,1.155,.59,{rx:-.39,isWindow:true});
  box(group,1.08,.42,.03,glass,0,1.15,-.81,{rx:.46,isWindow:true});
  for(const side of [-1,1]){
    const windows=geometry('compact-car-side-windows',()=>{
      const shape=new THREE.Shape();shape.moveTo(-.58,.96);shape.lineTo(-.4,1.35);shape.lineTo(.6,1.35);shape.lineTo(.8,.96);shape.closePath();
      const g=new THREE.ShapeGeometry(shape);g.rotateY(Math.PI/2);return g;
    });
    mesh(group,windows,glass,side*.63,0,0,{isWindow:true});
    box(group,.025,.42,.065,paint,side*.635,1.15,-.08);
    box(group,.1,.05,.18,material('metal','#d8dbcf'),side*.67,.88,.18);
    roundedBox(group,.16,.12,.22,paint,side*.76,1.04,.52);
    beam(group,[side*.69,.48,-.13],[side*.69,.86,-.13],.008,material('metal','#a06d52'));
    for(const z of [-.84,.85]){
      cylinder(group,.3,.3,.16,tire,side*.72,.37,z,{rz:Math.PI/2,segments:16});
      cylinder(group,.15,.15,.165,material('metal','#c5c7b7'),side*.73,.37,z,{rz:Math.PI/2,segments:12});
      cylinder(group,.06,.06,.17,material('metal','#66716c'),side*.735,.37,z,{rz:Math.PI/2,segments:10});
    }
    roundedBox(group,.27,.15,.035,material('glass','#f3e7b9',{emissive:'#eed9a1',emissiveIntensity:.2}),side*.45,.65,1.36);
    roundedBox(group,.25,.14,.035,material('glass','#c67461'),side*.46,.65,-1.43);
  }
  roundedBox(group,1.05,.1,.07,material('metal','#c0c5b4'),0,.49,1.39);
  box(group,.5,.05,.03,tire,0,.63,1.4);
  box(group,.27,.09,.035,material('plaster','#efe7d3'),0,.5,1.43);
}

function person(group,options={}) {
  const skin=material('plaster',options.skin||'#c4a080'),shirt=material('plaster',options.color||palette.teal),pants=material('plaster','#4d5e62'),shoe=material('metal','#4c4f43');
  for(const side of [-1,1]){
    cylinder(group,.085,.07,.62,pants,side*.105,.4,0,{segments:8});
    roundedBox(group,.17,.1,.28,shoe,side*.105,.065,.055);
    beam(group,[side*.21,1.15,0],[side*.29,.77,.02],.07,shirt);
    ball(group,.069,skin,side*.29,.72,.02);
  }
  cylinder(group,.24,.2,.53,shirt,0,.98,0,{segments:8});
  box(group,.38,.035,.25,material('wood','#867159'),0,.73,0);
  box(group,.06,.055,.025,material('metal',palette.brass),0,.73,.138);
  for(const side of [-1,1])box(group,.1,.025,.11,material('plaster','#e4dfc7'),side*.067,1.25,.095,{rz:side*.3});
  for(let i=0;i<3;i++)ball(group,.012,material('plaster','#cbd4c4'),0,1.13-i*.1,.2,[1,1,.5],0);
  cylinder(group,.075,.075,.12,skin,0,1.31,0,{segments:8});
  ball(group,.185,skin,0,1.51,0,[.82,1,.86],1);
  ball(group,.182,material('wood','#675743'),0,1.6,-.015,[.85,.55,.86],1);
  for(const side of [-1,1]){
    ball(group,.023,material('metal','#49534c'),side*.055,1.53,.142,[.6,.7,.5],1);
    ball(group,.032,skin,side*.151,1.51,0,[.5,1,.7],1);
  }
  ball(group,.028,skin,0,1.49,.167,[.7,1,1],1);
}

// Merge static pieces by material and semantic role. A furnished house then needs
// about twenty draw calls while its roof and paintable wall surfaces stay editable.
function compact(group) {
  group.updateMatrixWorld(true);
  const batches=new Map(),old=[];
  group.traverse(node=>{
    if(!node.isMesh)return;
    let isRoof=!!node.userData.isRoof;for(let p=node.parent;p&&p!==group;p=p.parent)isRoof=isRoof||!!p.userData.isRoof;
    const roles={isRoof,paintable:!!node.userData.paintable,isWindow:!!node.userData.isWindow,isWater:!!node.userData.isWater,isLight:!!node.userData.isLight,isStair:!!node.userData.isStair};
    const key=node.material.uuid+JSON.stringify(roles)+node.castShadow;
    if(!batches.has(key))batches.set(key,{material:node.material,roles,castShadow:node.castShadow,parts:[]});
    const g=node.geometry.index?node.geometry.toNonIndexed():node.geometry.clone();
    g.applyMatrix4(node.matrixWorld);batches.get(key).parts.push(g);old.push(node);
  });
  group.clear();
  for(const batch of batches.values()){
    const count=batch.parts.reduce((sum,g)=>sum+g.attributes.position.count,0);
    const merged=new THREE.BufferGeometry();
    for(const [attr,size] of [['position',3],['normal',3],['uv',2]]){
      const array=new Float32Array(count*size);let offset=0;
      for(const part of batch.parts){const data=part.getAttribute(attr);if(data)array.set(data.array,offset);offset+=part.attributes.position.count*size;}
      merged.setAttribute(attr,new THREE.BufferAttribute(array,size));
    }
    merged.computeBoundingSphere();
    const item=new THREE.Mesh(merged,batch.material);item.castShadow=batch.castShadow;item.receiveShadow=true;item.userData=batch.roles;group.add(item);
    batch.parts.forEach(g=>g.dispose());
  }
  return group;
}

export function createAsset(id, options={}) {
  const key=definitions.has(id)?id:'cottage',definition=definitions.get(key),group=new THREE.Group();
  group.name=definition.name;
  group.userData={assetId:key,label:definition.name,width:definition.width,depth:definition.depth,height:definition.height};
  switch(key){
    case 'cottage':case 'townhouse':case 'cafe':case 'villa':case 'apartment':house(group,key,options);break;
    case 'wall':box(group,options.width||4,options.height||3,options.depth||.24,material(options.material||'brick',options.color),0,(options.height||3)/2,0,{paintable:true,subdivided:true});break;
    case 'floor':box(group,options.width||4,.16,options.depth||4,material(options.material||'stone',options.color),0,.08,0,{paintable:true,subdivided:true});break;
    case 'stairs':stairs(group,options);break;
    case 'roof':pitchedRoof(group,6,5,0,1.45,{chimney:false,...options});break;
    case 'door':doorDetail(group,0,0,0,options);break;
    case 'window':windowDetail(group,0,.8,0,1.05,1.3,options);break;
    case 'road':road(group);break;
    case 'sidewalk':sidewalk(group);break;
    case 'fence':fence(group);break;
    case 'tree':tree(group,options);break;
    case 'pine':pine(group);break;
    case 'palm':palm(group);break;
    case 'bush':bush(group);break;
    case 'flowerbed':flowerbed(group);break;
    case 'rock':rock(group);break;
    case 'bench':bench(group);break;
    case 'lamp':lamp(group);break;
    case 'fountain':fountain(group);break;
    case 'sofa':sofa(group,options);break;
    case 'bed':bed(group,options);break;
    case 'table':table(group,options);break;
    case 'chair':chair(group,options);break;
    case 'kitchen':kitchen(group);break;
    case 'bookshelf':bookshelf(group);break;
    case 'car':car(group,options);break;
    case 'person':person(group,options);break;
  }
  if(options.material&&!['wall','floor','stairs','cottage','townhouse','cafe','villa','apartment'].includes(key)){
    group.traverse(item=>{if(item.isMesh&&item.userData.paintable)item.material=material(options.material,options.color);});
  }
  if(options.compact!==false)compact(group);
  // Ground every finished model, including overhanging roots and curved tiles.
  group.updateMatrixWorld(true);
  const bounds=new THREE.Box3().setFromObject(group),offset=-bounds.min.y;
  if(Number.isFinite(offset)&&Math.abs(offset)>.00001){
    for(const child of group.children)child.position.y+=offset;
    if(group.userData.interiorSpawn)group.userData.interiorSpawn.y+=offset;
    if(group.userData.entrance)group.userData.entrance.y+=offset;
  }
  const size=bounds.getSize(new THREE.Vector3());
  group.userData.bounds={width:size.x,height:size.y,depth:size.z};
  return group;
}

