/** LAST CALL's civilian cast. Original skinned anatomy and animations: Quaternius CC0.
 * Clothes are fitted to the human mesh, with separate skin/cloth materials.
 * No Soldier or Michelle mesh is used by this release. */
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {clone as cloneSkeleton} from 'three/addons/utils/SkeletonUtils.js';

const NAMES={pelvis:'Hips',spine_01:'Spine',spine_02:'Spine1',spine_03:'Spine2',neck_01:'Neck',Head:'Head'};
for(const [suffix,side] of [['l','Left'],['r','Right']]){
 for(const [from,to] of Object.entries({clavicle:'Shoulder',upperarm:'Arm',lowerarm:'ForeArm',hand:'Hand',thigh:'UpLeg',calf:'Leg',foot:'Foot',ball:'ToeBase',ball_leaf:'Toe_End'}))NAMES[from+'_'+suffix]=side+to;
 for(const finger of ['thumb','index','middle','ring','pinky'])for(let i=1;i<=4;i++)NAMES[finger+'_0'+i+(i===4?'_leaf':'')+'_'+suffix]=side+'Hand'+finger[0].toUpperCase()+finger.slice(1)+i;
}
export const normalBone=n=>n.replace(/mixamorig/ig,'').replace(/[^a-z0-9]/ig,'').toLowerCase();
const profiles={
 captain:{name:'ΚΑΠΕΤΑΝΙΟΣ',role:'captain',gender:'male',height:1.83,shirt:0xf0eee5,pants:0x16283c,shoes:0x151b23,hair:'Hair_Buzzed',hairColor:0x747071,beard:true,long:true,width:1.04,skin:1.24},
 securityM:{name:'ΑΣΦΑΛΕΙΑ ΠΛΟΙΟΥ',role:'security',gender:'male',height:1.82,shirt:0x19314b,pants:0x18202b,shoes:0x14171b,hair:'Hair_Buzzed',hairColor:0x282322,long:false,width:1.01,skin:1.05},
 securityF:{name:'ΑΣΦΑΛΕΙΑ ΠΛΟΙΟΥ',role:'security',gender:'female',height:1.75,shirt:0x19314b,pants:0x18202b,shoes:0x14171b,hair:'Hair_Buns',hairColor:0x241d17,long:false,width:1.03,skin:1.12},
 guestM0:{name:'ΑΝΤΩΝΗΣ · ΕΠΙΒΑΤΗΣ',role:'passenger',gender:'male',height:1.80,shirt:0x5595a4,pants:0xd0bea1,shoes:0x493527,hair:'Hair_SimpleParted',hairColor:0x5c3926,long:false,width:1.02,skin:1.25},
 guestF0:{name:'ΕΛΕΝΗ · ΕΠΙΒΑΤΗΣ',role:'passenger',gender:'female',height:1.70,shirt:0xa64249,pants:0x263d58,shoes:0xf0e6d7,hair:'Hair_Long',hairColor:0x543420,long:false,width:1.02,skin:1.20},
 guestM1:{name:'ΜΑΡΙΟΣ · ΕΠΙΒΑΤΗΣ',role:'passenger',gender:'male',height:1.76,shirt:0xe1bd76,pants:0x284254,shoes:0xe4dac9,hair:'Hair_Buzzed',hairColor:0x30221a,beard:true,long:false,width:1.10,skin:.85},
 guestF1:{name:'ΜΑΡΙΑ · ΕΠΙΒΑΤΗΣ',role:'passenger',gender:'female',height:1.66,shirt:0xede6cc,pants:0x5b7575,shoes:0x6d4635,hair:'Hair_Buns',hairColor:0x271d18,long:true,width:1.08,skin:.83},
 guestM2:{name:'ΠΕΤΡΟΣ · ΕΠΙΒΑΤΗΣ',role:'passenger',gender:'male',height:1.74,shirt:0xeee7d8,pants:0x645b50,shoes:0x5a3521,hair:'Hair_SimpleParted',hairColor:0x92908b,long:true,width:1.13,skin:1.18},
 guestF2:{name:'ΣΟΦΙΑ · ΕΠΙΒΑΤΗΣ',role:'passenger',gender:'female',height:1.72,shirt:0x315e64,pants:0xccb895,shoes:0x593929,hair:'Hair_Long',hairColor:0xa58343,long:true,width:.99,skin:1.28},
 guestM3:{name:'ΝΙΚΟΣ · ΕΠΙΒΑΤΗΣ',role:'passenger',gender:'male',height:1.86,shirt:0x385e83,pants:0x8d958c,shoes:0x172639,hair:'Hair_Buzzed',hairColor:0x3b261a,long:false,width:.94,skin:.9},
 guestF3:{name:'ΑΝΝΑ · ΕΠΙΒΑΤΗΣ',role:'passenger',gender:'female',height:1.68,shirt:0x9684a0,pants:0x40475a,shoes:0xded9cf,hair:'Hair_Buns',hairColor:0x8a8480,long:false,width:1.10,skin:1.14},
 bartender:{name:'ΜΠΑΡΜΑΝ · ΠΛΗΡΩΜΑ',role:'staff',gender:'male',height:1.78,shirt:0xf0efde,pants:0x1c2632,shoes:0x171b20,hair:'Hair_SimpleParted',hairColor:0x3c281d,long:true,width:.99,skin:1.13},
 steward:{name:'ΣΤΕΦΑΝΟΣ · ΠΛΗΡΩΜΑ',role:'staff',gender:'male',height:1.81,shirt:0xecf1ed,pants:0x143347,shoes:0x171b20,hair:'Hair_Buzzed',hairColor:0x35271d,long:false,width:1,skin:.98},
 stewardess:{name:'ΙΩΑΝΝΑ · ΠΛΗΡΩΜΑ',role:'staff',gender:'female',height:1.70,shirt:0xedeede,pants:0x153648,shoes:0x171b20,hair:'Hair_Buns',hairColor:0x46372a,long:false,width:1,skin:1.08}
};
export const DECK_ROSTER=['guestM0','guestF0','guestM1','guestF1','guestM2','guestF2','guestM3','bartender'];
const VOYAGE_ROSTER=['steward','guestM0','guestF0','guestM1','guestF1','stewardess','guestM2','guestF2','guestM3','guestF3','guestM0','guestF0','steward','guestM1','guestF1','guestM2','guestF2','bartender','guestM3','guestF3','guestM0','guestF0','guestM2','guestF2'];
let promise;
const clothCache=new Map();
function cloth(color){
 if(clothCache.has(color))return clothCache.get(color);
 const c=document.createElement('canvas');c.width=c.height=64;const ctx=c.getContext('2d');ctx.fillStyle='#eeeeee';ctx.fillRect(0,0,64,64);
 ctx.strokeStyle='#d6d6d6';ctx.lineWidth=.5;for(let i=0;i<64;i+=2){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,64);ctx.stroke();ctx.beginPath();ctx.moveTo(0,i);ctx.lineTo(64,i);ctx.stroke();}
 const map=new T.CanvasTexture(c);map.wrapS=map.wrapT=T.RepeatWrapping;map.repeat.set(5,5);map.colorSpace=T.SRGBColorSpace;
 const mat=new T.MeshStandardMaterial({color,map,roughness:.94,metalness:0});clothCache.set(color,mat);return mat;
}
function renameRig(asset){
 asset.scene.traverse(o=>{if(o.isBone&&NAMES[o.name])o.name=NAMES[o.name];});
 for(const clip of asset.animations)for(const tr of clip.tracks){const k=tr.name.lastIndexOf('.'),bone=tr.name.slice(0,k);if(NAMES[bone])tr.name=NAMES[bone]+tr.name.slice(k);}
}
function simpleMesh(g,m,parent,name,pos){const o=new T.Mesh(g,m);o.name=name;o.position.set(...pos);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
function makePatch(text,width,height,bg='#142b43',fg='#eee3ae'){
 const c=document.createElement('canvas');c.width=512;c.height=192;const x=c.getContext('2d');x.fillStyle=bg;x.fillRect(0,0,512,192);x.strokeStyle=fg;x.lineWidth=8;x.strokeRect(7,7,498,178);x.fillStyle=fg;x.textAlign='center';x.textBaseline='middle';x.font='bold 68px Arial';x.fillText(text,256,99,468);const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;return new T.Mesh(new T.PlaneGeometry(width,height),new T.MeshStandardMaterial({map:tx,roughness:.85,side:T.DoubleSide}));
}
const garmentCache=new Map();
function garmentGeometry(source,female,longSleeve){
 const key=(female?'female':'male')+(longSleeve?'long':'short');if(garmentCache.has(key))return garmentCache.get(key);
 const g=source.clone(),pos=g.attributes.position,idx=g.index,hem=female?.929:.974,neck=female?1.494:1.548,cuff=longSleeve?(female?.645:.729):(female?.425:.473);
 const classify=(x,y,z)=>y<=.095?3:y<=hem?2:((y>neck&&Math.abs(x)<.205)||Math.abs(x)>cuff)?0:1;
 const points=new Map(),canonical=[],copies=new Map();
 for(let i=0;i<pos.count;i++){const key=[pos.getX(i),pos.getY(i),pos.getZ(i)].map(v=>Math.round(v*1e5)).join(',');if(!points.has(key))points.set(key,i);const root=points.get(key);canonical[i]=root;if(!copies.has(root))copies.set(root,[]);copies.get(root).push(i);}
 const adjacency=Array.from({length:pos.count},()=>new Set());
 for(let i=0;i<idx.count;i+=3){const a=canonical[idx.getX(i)],b=canonical[idx.getX(i+1)],c=canonical[idx.getX(i+2)];adjacency[a].add(b).add(c);adjacency[b].add(a).add(c);adjacency[c].add(a).add(b);}
 const original=pos.array.slice();
 // Relax cloth regions in the original, animation-friendly topology. Do not
 // project the torso onto a cylinder: that would drag armpits into the chest.
 for(let pass=0;pass<10;pass++){
  const before=pos.array.slice();
  for(const [i,duplicates]of copies){
   const x=original[i*3],y=original[i*3+1],z=original[i*3+2],m=classify(x,y,z);if(m!==1)continue;
   const edge=Math.min(Math.abs(y-hem),Math.abs(y-neck),Math.abs(Math.abs(x)-cuff));const influence=T.MathUtils.clamp(edge/.05,0,1)*.48;
   if(influence<.01)continue;const ns=adjacency[i];if(!ns.size)continue;
   for(let k=0;k<3;k++){let value=0;for(const n of ns)value+=before[n*3+k];const val=T.MathUtils.lerp(before[i*3+k],value/ns.size,influence);for(const d of duplicates)pos.array[d*3+k]=val;}
  }
 }
 g.computeVertexNormals();const normal=g.attributes.normal;
 for(const [i,duplicates]of copies){
  const x=original[3*i],y=original[3*i+1],z=original[3*i+2],m=classify(x,y,z);if(m===0||m===3)continue;
  const seam=Math.min(Math.abs(y-hem),Math.abs(y-neck),Math.abs(Math.abs(x)-cuff));const offset=T.MathUtils.clamp(seam/.04,0,1)*(m===1?.010:.008);
  const x1=pos.getX(i)+normal.getX(i)*offset,y1=pos.getY(i)+normal.getY(i)*offset,z1=pos.getZ(i)+normal.getZ(i)*offset;
  for(const d of duplicates)pos.setXYZ(d,x1,y1,z1);
 }
 g.computeVertexNormals();
 // Clip triangles at actual sewing boundaries. This retains smooth cuffs and
 // a straight shirt hem instead of painting a jagged zigzag across triangles.
 const planes=[[1,.095],[1,hem],[1,neck],[0,cuff],[0,-cuff],[0,.205],[0,-.205]];
 function vertex(i){return {position:[pos.getX(i),pos.getY(i),pos.getZ(i)],normal:[g.attributes.normal.getX(i),g.attributes.normal.getY(i),g.attributes.normal.getZ(i)],uv:[g.attributes.uv.getX(i),g.attributes.uv.getY(i)],skinIndex:Array.from({length:4},(_,k)=>g.attributes.skinIndex.getComponent(i,k)),skinWeight:Array.from({length:4},(_,k)=>g.attributes.skinWeight.getComponent(i,k))};}
 function interpolate(a,b,t){const v={};for(const k of ['position','normal','uv'])v[k]=a[k].map((n,i)=>T.MathUtils.lerp(n,b[k][i],t));const weights=new Map();for(const [p,w]of [[a,1-t],[b,t]])for(let k=0;k<4;k++)weights.set(p.skinIndex[k],(weights.get(p.skinIndex[k])||0)+p.skinWeight[k]*w);const sorted=[...weights].sort((a,b)=>b[1]-a[1]).slice(0,4),sum=sorted.reduce((s,p)=>s+p[1],0)||1;v.skinIndex=sorted.map(p=>p[0]);v.skinWeight=sorted.map(p=>p[1]/sum);while(v.skinIndex.length<4){v.skinIndex.push(0);v.skinWeight.push(0);}return v;}
 function split(poly,axis,cut){const neg=[],pos=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],av=a.position[axis]-cut,bv=b.position[axis]-cut;if(av<=1e-7)neg.push(a);if(av>=-1e-7)pos.push(a);if(av*bv<-1e-12){const v=interpolate(a,b,-av/(bv-av));neg.push(v);pos.push(v);}}return [neg,pos].filter(p=>p.length>=3);}
 const buckets=[[],[],[],[]];
 for(let i=0;i<idx.count;i+=3){let polys=[[vertex(idx.getX(i)),vertex(idx.getX(i+1)),vertex(idx.getX(i+2))]];
  for(const [axis,cut]of planes){polys=polys.flatMap(poly=>{const values=poly.map(p=>p.position[axis]);return Math.min(...values)<cut-1e-6&&Math.max(...values)>cut+1e-6?split(poly,axis,cut):[poly];});}
  for(const poly of polys){const center=[0,0,0];for(const v of poly)for(let k=0;k<3;k++)center[k]+=v.position[k]/poly.length;const m=classify(...center);for(let k=1;k<poly.length-1;k++)buckets[m].push(poly[0],poly[k],poly[k+1]);}
 }
 const out=new T.BufferGeometry(),data={position:[],normal:[],uv:[],skinIndex:[],skinWeight:[]};let start=0;
 buckets.forEach((vertices,m)=>{for(const v of vertices)for(const k of Object.keys(data))data[k].push(...v[k]);out.addGroup(start,vertices.length,m);start+=vertices.length;});
 for(const [k,a]of Object.entries(data))out.setAttribute(k,k==='skinIndex'?new T.Uint16BufferAttribute(a,4):new T.Float32BufferAttribute(a,k==='uv'?2:k==='skinWeight'?4:3));
 out.setIndex(Array.from({length:start},(_,i)=>i));out.computeBoundingBox();out.computeBoundingSphere();garmentCache.set(key,out);return out;
}
function dress(model,profile){
 const bones=new Map();model.traverse(o=>{if(o.isBone)bones.set(normalBone(o.name),o);});
 const brows=model.getObjectByName('Eyebrows');if(brows?.isMesh){brows.material=brows.material.clone();brows.material.color.set(profile.hairColor);brows.material.roughness=.95;}
 const body=model.getObjectByName(profile.gender==='male'?'SuperHero_Male':'Superhero_Female');
 if(!body?.isSkinnedMesh)throw Error('Missing civilian skinned body');
 const female=profile.gender==='female',hem=female?.929:.974;
 body.geometry=garmentGeometry(body.geometry,female,profile.long);
 const skin=body.material.clone();skin.name='Human skin';skin.color.setRGB(profile.skin,profile.skin*.97,profile.skin*.94);skin.roughness=.82;skin.metalness=0;skin.normalScale.set(.4,.4);skin.vertexColors=false;
 const shirt=cloth(profile.shirt).clone();shirt.side=T.DoubleSide;shirt.name=profile.role==='captain'?'Captain white uniform':'Civilian fabric shirt';const pants=cloth(profile.pants).clone();pants.name='Fabric trousers';
 const shoe=new T.MeshStandardMaterial({color:profile.shoes,roughness:.8});shoe.name='Leather shoes';
 body.material=[skin,shirt,pants,shoe];
 for(const child of model.children)child.name=child.name||'civilian';
 model.updateMatrixWorld(true);
 const attach=(bone,child)=>{model.add(child);model.updateMatrixWorld(true);bones.get(bone).attach(child);child.userData.accessory=true;child.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});return child;};
 const navy=new T.MeshStandardMaterial({color:0x101f31,roughness:.84}),gold=new T.MeshStandardMaterial({color:0xd1a04e,roughness:.4,metalness:.5}),white=cloth(0xf2efe4),buttonMat=new T.MeshStandardMaterial({color:0xdad4bc,roughness:.5,metalness:.25});
 const collar=new T.Group();collar.name='Shirt collar';
 simpleMesh(new T.CylinderGeometry(.061,.075,.035,24,1,true),shirt,collar,'Folded collar',[0,female?1.480:1.528,.015]);
 attach('spine2',collar);
 const front=new T.Group();front.name='Shirt details';
 for(let y=1.12;y<1.445;y+=.066)simpleMesh(new T.SphereGeometry(.006,7,5),buttonMat,front,'Shirt button',[0,y+(female?-.025:0),.157]);
 attach('spine2',front);
 const belt=new T.Group();belt.name='Waist belt';const torus=new T.Mesh(new T.TorusGeometry(.157,.012,5,40),navy);torus.rotation.x=Math.PI/2;torus.scale.y=.7;torus.position.set(0,hem+.002,0);belt.add(torus);simpleMesh(new T.BoxGeometry(.045,.029,.014),gold,belt,'Belt buckle',[0,hem,.137]);attach('hips',belt);
 for(const side of ['left','right']){
  const foot=bones.get(side+'foot'),wp=foot.getWorldPosition(new T.Vector3());const shoes=new T.Group();shoes.name='Civilian shoe';
  const upper=simpleMesh(new T.SphereGeometry(1,20,12),shoe,shoes,'Leather shoe upper',[wp.x,.068,.046]);upper.scale.set(female?.060:.069,.058,.132);
  const sole=simpleMesh(new T.CylinderGeometry(1,1,.022,24),navy,shoes,'Shoe sole',[wp.x,.016,.046]);sole.scale.set(female?.064:.073,1,.137);attach(side+'foot',shoes);shoes.userData.fpsVisible=true;
 }
 if(profile.role==='captain'){
  const cap=new T.Group();cap.name='Captain peaked cap';
  simpleMesh(new T.CylinderGeometry(.101,.1,.033,32),navy,cap,'Navy cap band',[0,1.801,-.012]);
  const crown=simpleMesh(new T.CylinderGeometry(.116,.10,.063,40),white,cap,'White cap crown',[0,1.846,-.019]);crown.scale.z=.92;
  const visor=simpleMesh(new T.SphereGeometry(1,24,12),navy,cap,'Peaked visor',[0,1.800,.084]);visor.scale.set(.111,.009,.087);
  const emblem=makePatch('LC',.052,.036);emblem.position.set(0,1.815,.091);cap.add(emblem);cap.position.y=-.050;attach('head',cap);
  for(const side of ['left','right']){
   const arm=bones.get(side+'arm'),sh=arm.getWorldPosition(new T.Vector3()),ep=new T.Group();ep.name='Captain shoulderboard';
   simpleMesh(new T.BoxGeometry(.12,.018,.06),navy,ep,'Navy epaulette',[sh.x,sh.y+.027,sh.z]);
   for(let k=0;k<4;k++)simpleMesh(new T.BoxGeometry(.013,.021,.063),gold,ep,'Gold rank stripe',[sh.x-.038+k*.025,sh.y+.030,sh.z]);attach(side+'arm',ep);
   const wristBone=bones.get(side+'hand'),cuff=new T.Group();cuff.name='Captain four gold cuff stripes';
   const cuffCloth=new T.Mesh(new T.CylinderGeometry(.047,.054,.086,24),white);cuffCloth.position.y=-.043;cuff.add(cuffCloth);for(let k=0;k<4;k++){const ring=new T.Mesh(new T.TorusGeometry(.049+k*.0012,.0025,5,28),gold);ring.rotation.x=Math.PI/2;ring.position.y=-.023-k*.015;cuff.add(ring);}wristBone.add(cuff);cuff.userData.accessory=true;cuff.userData.fpsVisible=true;
  }
  const tieShape=new T.Shape();tieShape.moveTo(-.01,1.50);tieShape.lineTo(.01,1.50);tieShape.lineTo(.023,1.30);tieShape.lineTo(0,1.27);tieShape.lineTo(-.023,1.30);tieShape.closePath();const tie=new T.Mesh(new T.ShapeGeometry(tieShape),navy);tie.position.z=.152;tie.name='Captain tie';attach('spine2',tie);
 }
 if(profile.role==='security'){
  const patch=makePatch('SECURITY',.27,.073);patch.position.set(0,female?1.315:1.36,.171);patch.name='Ship security identification';attach('spine2',patch);
  const radio=new T.Group();radio.name='Security radio';simpleMesh(new T.BoxGeometry(.05,.09,.03),navy,radio,'Radio handset',[-.135,hem+.045,.11]);simpleMesh(new T.CylinderGeometry(.003,.003,.095,6),navy,radio,'Radio aerial',[-.14,hem+.13,.11]);attach('hips',radio);
 }
 if(profile.role==='staff'){
  const patch=makePatch('AURORA',.135,.051,'#eae7d5','#253b4b');patch.position.set(-.11,female?1.31:1.36,.162);patch.name='Crew name badge';attach('spine2',patch);
  if(profile.name.startsWith('ΜΠΑΡΜΑΝ')){const apron=simpleMesh(new T.BoxGeometry(.25,.33,.022),navy,model,'Bartender apron',[0,.86,.158]);attach('hips',apron);}
 }
 model.userData.profile={...profile};model.userData.rig='civilian172';return bones;
}
export async function loadCharacters(){
 if(promise)return promise;
 promise=(async()=>{
  const loader=new GLTFLoader(),dir=new URL('./assets/civilian172/',import.meta.url);
  const files=['male','female','Hair_Buzzed','Hair_SimpleParted','Hair_Long','Hair_Buns','Hair_Beard'];const items=await Promise.all(files.map(n=>loader.loadAsync(new URL(n+'.glb',dir).href)));const assets=Object.fromEntries(files.map((n,i)=>[n,items[i]]));
  renameRig(assets.male);renameRig(assets.female);
  const templates=new Map();
  function template(id){
   if(!profiles[id])throw Error('Unknown civilian role '+id);if(templates.has(id))return templates.get(id);
   const profile=profiles[id],asset=assets[profile.gender],raw=cloneSkeleton(asset.scene);raw.name='Civilian '+profile.name;const bones=dress(raw,profile);
   function attachHair(name,beard=false){const part=assets[name];if(!part)return;const h=part.scene.clone(true);h.name=name;h.traverse(o=>{if(o.isMesh){o.material=o.material.clone();o.material.color.set(profile.hairColor).multiplyScalar(1.7);o.material.normalScale?.set(.3,.3);o.material.roughness=.95;o.material.side=T.DoubleSide;o.castShadow=true;}});
    if(profile.gender==='female'&&name!=='Hair_Long'&&name!=='Hair_Buns')h.position.y=-.041;
    raw.add(h);raw.updateMatrixWorld(true);bones.get('head').attach(h);h.userData.accessory=true;
   }
   attachHair(profile.hair);if(profile.beard)attachHair('Hair_Beard',true);
   raw.scale.set(profile.height/1.82*profile.width,profile.height/1.82,profile.height/1.82);raw.position.y=.009*raw.scale.y;
   const clips={};for(const [name,source] of Object.entries({idle:'Idle_Loop',walk:'Walk_Loop',run:'Jog_Fwd_Loop',punch:'Punch_Jab',cross:'Punch_Cross',hit:'Hit_Head',sit:'Sitting_Idle_Loop',consume:'Consume'})){
    const c=asset.animations.find(a=>a.name===source)?.clone();if(!c)continue;c.name=name;
    c.tracks=c.tracks.filter(t=>!t.name.endsWith('.scale'));
    for(const tr of c.tracks)if(tr.name==='root.position'){for(let i=0;i<tr.values.length;i+=3){tr.values[i]=tr.values[0];tr.values[i+2]=tr.values[2];}}
    clips[name]=c;
   }
   raw.traverse(o=>{if(o.isMesh){o.frustumCulled=false;o.castShadow=true;o.receiveShadow=true;}});
   const result={model:raw,clips,height:profile.height,profile:{id,...profile},rig:'civilian172'};templates.set(id,result);return result;
  }
  return {template,deck:()=>DECK_ROSTER.map(template),voyage:i=>template(VOYAGE_ROSTER[i%VOYAGE_ROSTER.length]),profiles:()=>Object.entries(profiles).map(([id,p])=>({id,...p}))};
 })();return promise;
}
