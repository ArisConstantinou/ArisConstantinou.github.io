import * as THREE from 'three';

// Authored room identities. Geometry remains in metres and the original
// traversable floor/door layout is preserved by world.js.
export const ROOM_ART={
 courtyard:{floor:'garden',tone:0xc3c4a5,accent:0x70834e,name:'Cloister garden'},
 hall:{floor:'marble',tone:0xc3c1ae,accent:0x7a2b3f,name:'Hall of the crimson crown'},
 crypt:{floor:'tomb',tone:0x9c9fae,accent:0x696887,name:'Royal sepulchre'},
 armoury:{floor:'slate',tone:0x9caebe,accent:0x69859a,name:'Steel armoury'},
 barracks:{floor:'oak',tone:0xc4aa81,accent:0x56745d,name:'Oak barracks'},
 prison:{floor:'damp',tone:0x9fa798,accent:0x666e66,name:'Iron cells'},
 ritual:{floor:'obsidian',tone:0xa9a0b8,accent:0x8463aa,name:'Obsidian ritual chamber'},
 library:{floor:'parquet',tone:0xc7ac80,accent:0x43766d,name:'The oak archive'},
 forge:{floor:'iron',tone:0xb5a69a,accent:0xd18448,name:'Ember foundry'},
 catacombs:{floor:'cobble',tone:0xa9a18b,accent:0x9b8764,name:'Ossuary vaults'},
 sanctum:{floor:'ivory',tone:0xe0d9bd,accent:0x568778,name:'Ivory sanctum'},
 gallery:{floor:'mosaic',tone:0xc4b5a2,accent:0x954953,name:'Gallery of houses'},
 watchtower:{floor:'slate',tone:0xa0b1ba,accent:0x496e86,name:'The celestial watch'},
 gatehouse:{floor:'sandstone',tone:0xc7b99c,accent:0x8d4b34,name:'The iron gate'},
 bridge:{floor:'sandstone',tone:0xa8aaa0,accent:0x7a817d,name:'Bridge'},
};
export function roomArt(id){return ROOM_ART[id]||ROOM_ART[id.replace('-secret','')]||ROOM_ART.bridge;}
export function wallArt(id='bridge'){
 const styles={
  courtyard:{name:'cloister-limestone',stone:0x969b83,trim:0xc7c5a9,base:0x535f4c,course:.62,block:1.6,variation:.28},
  hall:{name:'royal-ashlar',stone:0xa39b8c,trim:0xd4c7a7,base:0x635b59,course:.65,block:1.75,variation:.12},
  crypt:{name:'carved-funerary-stone',stone:0x797984,trim:0xafa7a3,base:0x434451,course:.82,block:1.45,variation:.25},
  library:{name:'oak-and-sandstone',stone:0xa39176,trim:0xd0b389,base:0x554637,course:.45,block:1.05,variation:.21,wood:true},
  barracks:{name:'timbered-masonry',stone:0x8b8d7c,trim:0xb6ae90,base:0x564d3e,course:.47,block:1.2,variation:.23,wood:true},
  armoury:{name:'steel-braced-ashlar',stone:0x70838f,trim:0xaebdb9,base:0x414e55,course:.65,block:1.55,variation:.15,iron:true},
  forge:{name:'slag-and-iron',stone:0x6f6560,trim:0xaaa08a,base:0x37383a,course:.56,block:1.25,variation:.28,iron:true},
  prison:{name:'massive-basalt',stone:0x747f76,trim:0xa3ad9b,base:0x414b43,course:.92,block:1.7,variation:.3,iron:true},
  catacombs:{name:'old-limestone',stone:0x9e9079,trim:0xc4b797,base:0x605a4d,course:.68,block:1.1,variation:.36},
  ritual:{name:'obsidian-piers',stone:0x665978,trim:0xa698ae,base:0x363342,course:.85,block:1.75,variation:.17},
  sanctum:{name:'ivory-gothic',stone:0xb5b9a7,trim:0xe1d5b5,base:0x687f76,course:.78,block:1.9,variation:.11},
  gallery:{name:'rose-ashlar',stone:0xa29493,trim:0xcebaab,base:0x685459,course:.62,block:1.7,variation:.13},
  watchtower:{name:'blue-fortress-stone',stone:0x7b8d9a,trim:0xaebdc3,base:0x45545e,course:.7,block:1.5,variation:.24,iron:true},
  gatehouse:{name:'ironbound-sandstone',stone:0xac977c,trim:0xd5c29e,base:0x645545,course:.76,block:1.8,variation:.23,iron:true},
  bridge:{name:'fortress-parapet',stone:0x889488,trim:0xbac1a9,base:0x4f5b51,course:.55,block:1.5,variation:.21},
 };
 return styles[id.replace('-secret','')]||styles.bridge;
}
function random(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)|0;return(seed>>>0)/4294967296;};}
const css=n=>'#'+n.toString(16).padStart(6,'0');

function floorTexture(style){
 const c=document.createElement('canvas');c.width=c.height=512;const g=c.getContext('2d');
 const rand=random([...style].reduce((a,s)=>a+s.charCodeAt(0),197));
 const palettes={garden:['#7a8270','#929581','#aaa990','#8e957f'],marble:['#b9b8a8','#535e64'],ivory:['#d3ccb7','#93a397'],tomb:['#626574','#767684','#85818a'],slate:['#506472','#6a7c84'],damp:['#56615d','#69716a','#797d70'],obsidian:['#3d3e53','#505064','#5e566e'],cobble:['#786f5e','#918672','#6d7266','#a09580'],iron:['#555451','#6b6358'],sandstone:['#9e947f','#b4a58a','#8f907e'],mosaic:['#b7a589','#687f79','#7c4c53'],oak:['#82613e','#a47b4b','#765738','#93754e'],parquet:['#84613b','#a17b4c','#b08a58','#6e5032']};
 const pal=palettes[style];g.fillStyle=style==='garden'?'#56604b':style==='cobble'?'#575649':'#343938';g.fillRect(0,0,512,512);
 const plank=style==='oak'||style==='parquet';
 const tile=(x,y,w,h,color)=>{g.fillStyle=color;g.fillRect(x+2,y+2,w-4,h-4);g.strokeStyle='rgba(240,230,203,.18)';g.lineWidth=1.5;g.beginPath();g.moveTo(x+3,y+h-3);g.lineTo(x+3,y+3);g.lineTo(x+w-3,y+3);g.stroke();};
 if(plank){
  if(style==='parquet'){g.save();g.translate(256,256);g.rotate(Math.PI/4);g.translate(-256,-256);}
  const h=style==='parquet'?32:64;
  for(let y=-512;y<1024;y+=h)for(let x=-512;x<1024;x+=128){const xx=x+((y/h)%2)*64;tile(xx,y,128,h,pal[Math.floor(rand()*pal.length)]);
   for(let k=0;k<5;k++){g.strokeStyle=k%2?'#402f252f':'#d4ad7333';g.lineWidth=.8;g.beginPath();for(let p=0;p<9;p++){const px=xx+p*16,py=y+5+k*(h-8)/5+Math.sin(p*.9+k)*1.3;if(!p)g.moveTo(px,py);else g.lineTo(px,py);}g.stroke();}
   for(const px of [xx+8,xx+120]){g.fillStyle='#322d29';g.fillRect(px,y+6,2,2);g.fillRect(px,y+h-8,2,2);}
  }
  if(style==='parquet')g.restore();
 }else if(style==='cobble'){
  for(let row=0;row<8;row++)for(let col=-1;col<8;col++){
   const x=col*76+(row%2)*38,y=row*64;g.fillStyle=pal[Math.floor(rand()*pal.length)];g.beginPath();g.moveTo(x+8,y+3);g.lineTo(x+68,y+3);g.lineTo(x+74,y+15);g.lineTo(x+71,y+57);g.lineTo(x+9,y+61);g.lineTo(x+2,y+49);g.lineTo(x+2,y+14);g.closePath();g.fill();g.strokeStyle='#b5aa8a55';g.stroke();
  }
 }else if(style==='ivory'){
  g.fillStyle='#668077';g.fillRect(0,0,512,512);
  for(let row=0;row<4;row++)for(let col=0;col<4;col++){
   const x=col*128,y=row*128;g.fillStyle=(row+col)%2?'#c8c4b2':'#d7ceba';g.beginPath();g.moveTo(x+25,y+3);g.lineTo(x+103,y+3);g.lineTo(x+125,y+25);g.lineTo(x+125,y+103);g.lineTo(x+103,y+125);g.lineTo(x+25,y+125);g.lineTo(x+3,y+103);g.lineTo(x+3,y+25);g.closePath();g.fill();g.strokeStyle='#ded8c899';g.lineWidth=2;g.stroke();
   g.strokeStyle='#7d8d821f';g.beginPath();g.moveTo(x+6,y+44);g.bezierCurveTo(x+53,y+10,x+49,y+105,x+120,y+80);g.stroke();
  }
 }else if(['garden','tomb','sandstone','damp'].includes(style)){
  const h=style==='tomb'?128:64,w=style==='tomb'?256:128;
  for(let row=0;row<512/h;row++)for(let col=-1;col<512/w;col++){
   const x=col*w+(row%2)*w/2,y=row*h;tile(x,y,w,h,pal[Math.floor(rand()*pal.length)]);
   if(rand()>.35){g.strokeStyle='#30372e3f';g.lineWidth=1;g.beginPath();g.moveTo(x+w*.6,y+3);g.lineTo(x+w*.57,y+h*.28);g.lineTo(x+w*.64,y+h*.56);g.lineTo(x+w*.59,y+h*.75);g.stroke();}
   if(style==='garden')for(let i=0;i<12;i++){g.fillStyle='#52654844';g.fillRect(x+rand()*w,y+h-4-rand()*5,2+rand()*4,1+rand()*3);}
  }
 }else{
  const count=style==='iron'?2:style==='mosaic'?8:4,step=512/count;
  for(let row=0;row<count;row++)for(let col=0;col<count;col++){
   const check=['marble','ivory','mosaic','slate'].includes(style),color=pal[check?(row+col)%pal.length:Math.floor(rand()*pal.length)];
   tile(col*step,row*step,step,step,color);
   if(style==='iron'){
    for(const ox of [12,step-12])for(const oy of [12,step-12]){g.fillStyle='#2b2925';g.beginPath();g.arc(col*step+ox,row*step+oy,4,0,Math.PI*2);g.fill();g.fillStyle='#a09782';g.fillRect(col*step+ox-2,row*step+oy-3,3,2);}
    g.strokeStyle='#a39c8038';g.lineWidth=2;for(let y=28;y<step-20;y+=18)for(let x=28;x<step-20;x+=22){g.beginPath();g.moveTo(col*step+x-4,row*step+y);g.lineTo(col*step+x+4,row*step+y+6);g.stroke();}
   }
   if(style==='marble'||style==='ivory'){
    g.save();g.beginPath();g.rect(col*step+3,row*step+3,step-6,step-6);g.clip();
    for(let v=0;v<3;v++){g.strokeStyle=v%2?'#e3dfcd44':'#36494a38';g.lineWidth=v+1;g.beginPath();for(let x=0;x<step;x+=5){const y=row*step+v*step/3+x*.48+Math.sin(x*.05+v)*7;if(!x)g.moveTo(col*step+x,y);else g.lineTo(col*step+x,y);}g.stroke();}g.restore();
   }
   if(['garden','tomb','damp','sandstone','obsidian'].includes(style)&&rand()>.35){g.strokeStyle=style==='garden'?'#394c354d':'#171f263f';g.lineWidth=1.2;g.beginPath();let x=col*step+step*.3,y=row*step+3;g.moveTo(x,y);for(let k=0;k<6;k++){x+=(rand()-.5)*20;y+=step/7;g.lineTo(x,y);}g.stroke();}
  }
 }
 const image=g.getImageData(0,0,512,512);for(let i=0;i<image.data.length;i+=4){const n=(rand()-.5)*13;for(let k=0;k<3;k++)image.data[i+k]=Math.max(0,Math.min(255,image.data[i+k]+n));}g.putImageData(image,0,0);
 const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.anisotropy=4;return texture;
}

export function createCastleArt(root){
 const textures=new Map(),materials=new Set();
 function surface(room){
  const art=roomArt(room.id),style=art.floor;
  // Headless physics callers still construct the identical floor geometry.
  // Browser rendering owns Canvas textures; no DOM shim is needed for physics.
  let map=null;
  if(typeof document!=='undefined'){
   if(!textures.has(style))textures.set(style,floorTexture(style));
   map=textures.get(style).clone();map.needsUpdate=true;map.repeat.set(room.w/5.12,room.d/5.12);
  }
  const smooth=['marble','ivory','obsidian','mosaic'].includes(style),iron=style==='iron';
  const mat=new THREE.MeshStandardMaterial({map,color:art.tone,roughness:smooth?.48:iron?.65:.94,metalness:iron?.55:smooth?.12:0,bumpMap:map,bumpScale:iron?.024:smooth?.014:.026});materials.add(mat);
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(room.w,room.d),mat);mesh.rotation.x=-Math.PI/2;mesh.position.set(room.x+room.w/2,.007,room.z+room.d/2);mesh.receiveShadow=true;mesh.name='Room floor · '+art.name;mesh.userData.room=room.id;mesh.userData.surface=style;root.add(mesh);
 }
 return {surface,dispose(){for(const m of materials){m.map?.dispose();m.dispose();}for(const t of textures.values())t.dispose();}};
}

// All sculptural details are built into existing walls/furniture footprints.
// Low garden beds are the only added solid footprints, explicitly collidable.
export function dressCastle({root,rooms,boundary,box,cylinder,add,geo,materials,matrixAt,collider}){
 const PI=Math.PI,TAU=PI*2;
 const trim=(x,y,z,w,h,d,c=0xbda371,mat='paleGold',ry=0,key='gothic-trim')=>box(x,y,z,w,h,d,c,mat,ry,key);
 const ring=(x,z,r,w,color)=>{const m=new THREE.Mesh(new THREE.RingGeometry(r-w,r,64),new THREE.MeshStandardMaterial({color,metalness:.4,roughness:.6,side:THREE.DoubleSide}));m.rotation.x=-PI/2;m.position.set(x,.024,z);m.receiveShadow=true;root.add(m);};
 function carpet(room,color,width=4){
  const x=room.x+room.w/2,z=room.z+room.d/2,d=room.d-3;
  trim(x,.018,z,width,.012,d,color,'textile',0,'floor-inlay');
  for(const s of [-1,1]){trim(x+s*(width/2-.13),.027,z,.07,.008,d-.2,0xc5a269,'textile',0,'floor-inlay');trim(x,.027,z+s*(d/2-.18),width-.2,.008,.08,0xc5a269,'textile',0,'floor-inlay');}
  for(let zz=room.z+2.3;zz<room.z+room.d-2;zz+=1.8){trim(x,.028,zz,.28,.008,.28,0xbda071,'textile',PI/4,'floor-inlay');for(const s of [-1,1])trim(x+s*(width/2-.38),.029,zz,.12,.008,.48,0xb59c6f,'textile',s*PI/4,'floor-inlay');}
 }
 const frameShape=new THREE.Shape();frameShape.moveTo(-.7,0);frameShape.lineTo(.7,0);frameShape.lineTo(.7,1.4);frameShape.quadraticCurveTo(.68,1.9,0,2.6);frameShape.quadraticCurveTo(-.68,1.9,-.7,1.4);frameShape.closePath();
 const hole=new THREE.Path();hole.moveTo(-.5,.16);hole.lineTo(-.5,1.38);hole.quadraticCurveTo(-.45,1.83,0,2.29);hole.quadraticCurveTo(.45,1.83,.5,1.38);hole.lineTo(.5,.16);hole.closePath();frameShape.holes.push(hole);
 const frameGeo=new THREE.ExtrudeGeometry(frameShape,{depth:.16,bevelEnabled:false,curveSegments:8});
 const glassShape=new THREE.Shape();glassShape.moveTo(-.5,.16);glassShape.lineTo(.5,.16);glassShape.lineTo(.5,1.38);glassShape.quadraticCurveTo(.45,1.83,0,2.29);glassShape.quadraticCurveTo(-.45,1.83,-.5,1.38);glassShape.closePath();
 const glassGeo=new THREE.ShapeGeometry(glassShape,8);
 for(const room of rooms){
  if(room.id==='bridge')continue;
  const art=roomArt(room.id),cx=room.x+room.w/2,cz=room.z+room.d/2;
  if(['hall','library','gallery','gatehouse'].includes(room.id))carpet(room,art.accent,room.id==='hall'?4.6:3.2);
  if(['sanctum','ritual','watchtower'].includes(room.id)){
   ring(cx,cz,4.1,.13,art.accent);ring(cx,cz,3.8,.035,0xbdad7a);ring(cx,cz,1.1,.065,0xbdad7a);
   for(let i=0;i<12;i++){const a=i*TAU/12;trim(cx+Math.sin(a)*2.25,.025,cz+Math.cos(a)*2.25,.07,.012,2.5,0xaa9870,'bronze',a,'floor-inlay');add('gothic-inlay-star',geo.oct,materials.bronze,matrixAt(cx+Math.sin(a)*3.45,.02,cz+Math.cos(a)*3.45,.22,.012,.45,0,a),0xb0a782);}
  }
  // Window tracery and room-specific wall treatments follow actual continuous
  // boundary segments, never a doorway or a secret entrance.
  for(const edge of boundary.filter(e=>e.room===room.id&&e.hi-e.lo>5.5)){
   const along=edge.axis==='x',side=edge.normal,ry=along?(side<0?0:PI):(side<0?PI/2:-PI/2),len=edge.hi-edge.lo;
   if(room.id==='courtyard'&&along)continue;
   const pos=t=>along?{x:t,z:edge.at+side*.03}:{x:edge.at+side*.03,z:t};
   const panel=pos((edge.lo+edge.hi)/2);
   trim(panel.x,.55,panel.z,along?len-.4:.16,.5,along?.16:len-.4,art.floor==='parquet'||art.floor==='oak'?0x806243:art.tone,['parquet','oak'].includes(art.floor)?'darkWood':'cutStone',0,'gothic-dado');
   const count=Math.max(1,Math.floor(len/5));
   for(let j=0;j<count;j++){
    const p=pos(edge.lo+(j+.5)*len/count);
    if(['prison','catacombs'].includes(room.id)){
     trim(p.x,1.7,p.z,1.65,1.5,.18,0x242c30,'base',ry,'gothic-niche');
     for(let k=-2;k<=2;k++){
      const local=new THREE.Vector3(k*.27,0,.14).applyAxisAngle(new THREE.Vector3(0,1,0),ry);
      if(room.id==='prison')trim(p.x+local.x,1.7,p.z+local.z,.045,1.48,.055,0x88968e,'metal',ry,'gothic-bars');
      else for(const y of [1.3,1.8,2.2]){
       add('gothic-skulls',geo.orb,materials.cutStone,matrixAt(p.x+local.x,y,p.z+local.z,.105,.125,.09,0,ry),0xd9cbae);
       const nose=new THREE.Vector3(k*.27,0,.23).applyAxisAngle(new THREE.Vector3(0,1,0),ry);trim(p.x+nose.x,y,p.z+nose.z,.105,.05,.02,0x282724,'base',ry,'gothic-skull-eyes');
      }
     }
     for(const h of [1,2.4])trim(p.x,h,p.z,1.85,.14,.35,0x8d9287,'cutStone',ry,'gothic-niche');
    }else if(room.id==='library'){
     const local=(u,v)=>new THREE.Vector3(u,0,v).applyAxisAngle(new THREE.Vector3(0,1,0),ry).add(new THREE.Vector3(p.x,0,p.z));
     trim(p.x,1.65,p.z,3.4,2.6,.16,0x584435,'darkWood',ry,'gothic-bookcase-back');
     for(const y of [.43,1.05,1.67,2.29,2.94])trim(p.x,y,p.z,3.65,.12,.5,0xa3824d,'darkWood',ry,'gothic-bookcase-shelf');
     for(const side of [-1,1]){const q=local(side*1.72,0);trim(q.x,1.68,q.z,.15,2.75,.5,0x95723e,'darkWood',ry,'gothic-bookcase-frame');}
     for(let row=0;row<4;row++)for(let k=0;k<14;k++){
      const q=local(-1.48+k*.23,.15),h=.34+(k%3)*.045;
      trim(q.x,.5+row*.62+h/2,q.z,.15,h,.29,[0x753d4d,0x3c6262,0xa28b55,0x536789][(k+row)%4],'textile',ry,'gothic-book-spines');
     }
    }else if(room.id==='gallery'||room.id==='armoury'){
     trim(p.x,1.92,p.z,1.5,2.22,.16,0xc3a36b,'bronze',ry,'gothic-display-frame');
     const front=new THREE.Vector3(0,0,.12).applyAxisAngle(new THREE.Vector3(0,1,0),ry);
     trim(p.x+front.x,1.92,p.z+front.z,1.28,1.99,.08,room.id==='gallery'?[0x722f42,0x3c6262,0x716246][j%3]:0x354857,'textile',ry,'gothic-display-velvet');
     add('gothic-heraldry',geo.oct,materials.bronze,matrixAt(p.x+front.x*2,1.94,p.z+front.z*2,.42,.62,.1,0,ry),0xd4b878);
     trim(p.x+front.x*2,1.9,p.z+front.z*2,.07,1.35,.08,0xe1c78e,'paleGold',ry,'gothic-heraldry-stem');
    }else{
     add('gothic-lancet-frame',frameGeo,materials.cutStone,matrixAt(p.x,.85,p.z,1,1,1,0,ry),art.tone);
     add('gothic-lancet-glass',glassGeo,materials.glass,matrixAt(p.x,.85,p.z,1,1,1,0,ry),art.accent);
     const front=new THREE.Vector3(0,0,.17).applyAxisAngle(new THREE.Vector3(0,1,0),ry);
     trim(p.x+front.x,1.9,p.z+front.z,.055,1.8,.065,0xc3ad83,'bronze',ry,'gothic-tracery');
     for(const h of [1.45,2.05])trim(p.x+front.x,h,p.z+front.z,1.01,.045,.065,0xc3ad83,'bronze',ry,'gothic-tracery');
    }
   }
  }
  if(room.id==='courtyard'){
   for(const s of [-1,1])for(const zz of [room.z+4,room.z+room.d-4]){
    const x=cx+s*(room.w/2-.85),z=zz;
    // Match the raised stone rim and exceed the navigation grid's low-step threshold.
    collider(x,.26,z,1.43,.52,4.03,'gothic-planter');trim(x,.1,z,1.35,.2,4,0xa7ab96,'cutStone');trim(x,.31,z,1.1,.24,3.75,0x334b35,'base');
    for(const ss of [-1,1])trim(x+ss*.65,.31,z,.13,.42,4.03,0xc3c1a6,'cutStone');
    for(let i=0;i<13;i++){const angle=i*2.39,xx=x+Math.sin(angle)*.32,zz=z-1.6+i*.26;add('gothic-garden-leaves',geo.rock,materials.garden,matrixAt(xx,.48+(i%3)*.06,zz,.29,.19,.27,0,angle),[0x456447,0x6d8050,0x79865d][i%3]);if(i%3===0)add('gothic-garden-flowers',geo.orb,materials.textile,matrixAt(xx,.7,zz,.08,.075,.085),0xb6a7c3);}
    // Ivy climbs the actual side walls, leaving the combat floor clear.
    for(let i=0;i<21;i++){const yy=.7+i*.1,zz=z+Math.sin(i*.6)*.5,xx=cx+s*(room.w/2-.04);add('gothic-ivy',geo.rock,materials.garden,matrixAt(xx,yy,zz,.13,.22,.32,0,i*.7),[0x466345,0x687c48,0x7d8756][i%3]);}
   }
  }
  if(['sanctum','ritual'].includes(room.id))for(const s of [-1,1]){
   const x=cx+s*(room.w/2-2.1),z=room.z+2;
   for(const y of [.55,1.6,2.6])cylinder(x,y,z,.46,.11,0xb7a778,'bronze','gothic-column-bands');
   add('gothic-column-capital',geo.oct,materials.glass,matrixAt(x,3.83,z,.31,.58,.31),art.accent);
  }
  if(room.id==='watchtower')for(const s of [-1,1]){
   const x=cx+s*(room.w/2-.55),z=room.z+room.d-2.2;
   trim(x,1.15,z,.35,1.8,2.2,0x687885,'metal');for(let i=0;i<5;i++)trim(x,1.3,z-.8+i*.4,.5,.08,.13,0xa8b1ac,'metal');
  }
 }
 return {rooms:rooms.filter(r=>r.id!=='bridge').map(r=>({id:r.id,...roomArt(r.id),wall:wallArt(r.id).name}))};
}
