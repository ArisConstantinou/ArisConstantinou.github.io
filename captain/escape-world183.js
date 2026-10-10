import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {createActor} from './actors183.js?v=183';
import {WALLS,FURNITURE,HOTSPOTS,ITEMS,ROUTES,HATCH,STORE_DOOR} from './escape-model181.js?v=181';
export function createEscapeWorld(ship,people){
 const root=new T.Group();root.name='MS Aurora · Deck 04 · detention and service corridor';root.position.set(0,4.5,17);ship.group.add(root);root.visible=false;
 const staticRoot=new T.Group();root.add(staticRoot);
 const mat=(color,more={})=>new T.MeshStandardMaterial({color,roughness:.8,...more});
 const M={floor:mat(0x344b52),wall:mat(0xabc2c0),edge:mat(0x183240),wood:mat(0x71513a),metal:mat(0x4a6470,{metalness:.55,roughness:.32}),linen:mat(0xd5d8c7),dark:mat(0x172631),gold:mat(0xd5ab57,{metalness:.4}),blue:mat(0x315b74),glass:mat(0x29687a,{metalness:.5,roughness:.2}),light:mat(0x91d7cb,{emissive:0x69c8ba,emissiveIntensity:.5})};
 function mesh(g,m,parent=staticRoot,x=0,y=0,z=0){const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
 const box=(w,h,d,m,x,y,z,parent=staticRoot)=>mesh(new T.BoxGeometry(w,h,d),m,parent,x,y,z);
 const cyl=(r,h,m,x,y,z,parent=staticRoot)=>mesh(new T.CylinderGeometry(r,r,h,16),m,parent,x,y,z);
 function label(text,x,z,w=3,color='#c3ddd7'){
  const c=document.createElement('canvas');c.width=640;c.height=128;const q=c.getContext('2d');q.clearRect(0,0,640,128);q.fillStyle=color;q.font='bold 42px sans-serif';q.textAlign='center';q.fillText(text,320,70);const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;const a=mesh(new T.PlaneGeometry(w,w*.2),new T.MeshBasicMaterial({map:tx,transparent:true,depthWrite:false}),staticRoot,x,.028,z);a.rotation.x=-Math.PI/2;
 }
 box(14,.18,26,M.floor,0,-.12,13);
 for(let z=.7;z<26;z+=1.25){box(13.8,.012,.015,M.edge,0,.003,z);}
 for(let x=-6.5;x<7;x+=1.3){box(.012,.012,25.8,M.edge,x,.003,13);}
 // Shoulder-height cutaways reveal the interior without a roof hiding the player.
 for(const b of WALLS){box(b.w,1.18,b.d,M.wall,b.x,.59,b.z);box(b.w+.035,.07,b.d+.035,M.edge,b.x,1.2,b.z);box(b.w+.02,.07,b.d+.02,M.metal,b.x,.05,b.z);}
 for(let z=2;z<25;z+=3){box(.055,.018,.8,M.light,-1.55,.025,z);box(.055,.018,.8,M.light,1.55,.025,z);}
 label('ΚΕΛΙ 04',-4.5,25.4,2.8);label('ΠΛΥΝΤΗΡΙΑ',-4.5,14.8,3.2);label('ΑΠΟΘΗΚΗ',-4.5,12.7,3.1);label('ΑΣΦΑΛΕΙΑ',4.5,12.8,3.2);label('ΠΛΗΡΩΜΑ',4.6,24.1,3);label('↑ ΚΑΤΑΣΤΡΩΜΑ',0,3.5,3.4,'#e1c483');
 // Bunk, pillow and blanket.
 box(2.1,.18,1.05,M.metal,-5.5,.4,24.4);box(2.0,.18,1,M.linen,-5.5,.56,24.4);box(.42,.15,.8,M.linen,-6.12,.72,24.4);box(1.25,.04,1.02,M.blue,-5.1,.67,24.4);
 for(const x of [-6.3,-4.7])for(const z of [24.02,24.77])cyl(.035,.42,M.metal,x,.21,z);
 box(.8,.12,.65,M.linen,-6.45,.8,21.65);cyl(.10,.22,M.metal,-6.45,.96,21.58);
 // Laundry machines and folded linen; all have corresponding collision bounds.
 box(1.2,1.1,1.2,M.linen,-5.7,.55,17.7);
 const window=mesh(new T.CylinderGeometry(.34,.34,.04,24),M.glass,staticRoot,-5.7,.53,18.32);window.rotation.x=Math.PI/2;
 box(.75,.09,.08,M.dark,-5.7,.94,18.33);
 for(let k=0;k<4;k++)box(.8,.17,.8,k%2?M.linen:M.blue,-3.1,.15+k*.21,18.8);
 // Security desk, chair, display and paperwork.
 box(2,.12,.85,M.wood,5,.85,8.9);for(const x of [4.2,5.8])for(const z of [8.6,9.2])box(.07,.83,.07,M.metal,x,.41,z);
 box(.65,.38,.055,M.dark,5.42,1.12,8.68);box(.57,.29,.015,M.light,5.42,1.12,8.72);box(.52,.015,.28,M.linen,4.5,.92,8.9);
 cyl(.2,.06,M.metal,5.4,.93,8.68);
 box(.65,.12,.65,M.blue,5,.48,7.9);box(.65,.72,.1,M.blue,5,.85,7.63);
 for(const f of FURNITURE.filter(f=>['store','locker'].includes(f.id))){for(let i=0;i<4;i++)box(f.w,.07,f.d,M.metal,f.x,.18+i*.39,f.z);for(const z of [f.z-f.d/2,f.z+f.d/2])box(.05,1.55,.05,M.metal,f.x,.78,z);for(let i=0;i<5;i++)box(.40,.20,.24,i%2?M.linen:M.blue,f.x,.36+(i%3)*.38,f.z+(i-2)*.3);}
 box(1.2,.09,.7,M.metal,4.9,.65,17.6);box(1.1,.07,.6,M.wood,4.9,.19,17.6);for(const x of [4.4,5.4])for(const z of [17.35,17.85])cyl(.075,.1,M.dark,x,.10,z);
 // Exit steps are visible beneath the story transition.
 for(let i=0;i<5;i++)box(1.45,.10+i*.12,.28,M.metal,0,(.1+i*.12)/2,1.8-i*.27);
 const doors={};
 for(const [id,b]of [['hatch',HATCH],['storeDoor',STORE_DOOR]]){const g=new T.Group();g.position.set(b.x,0,b.z);root.add(g);doors[id]=g;if(id==='hatch'){box(2,.08,.8,M.metal,0,1.36,0,g);box(.07,1.36,.65,M.gold,-.94,.68,0,g);box(.07,1.36,.65,M.gold,.94,.68,0,g);for(let x=-.8;x<.9;x+=.2)box(.028,1.3,.09,M.metal,x,.65,0,g);}else{box(.1,1.15,1.9,M.blue,0,.57,0,g);box(.13,.17,.08,M.gold,-.09,.7,.55,g);}}
 const props=[];
 for(const it of ITEMS){const g=new T.Group();g.position.set(it.x,.06,it.z);root.add(g);if(it.id==='bottle-empty'){mesh(new T.CylinderGeometry(.08,.09,.25,12),M.glass,g,0,.125,0);cyl(.035,.12,M.metal,0,.31,0,g);}else{cyl(.105,.21,M.metal,0,.11,0,g);const handle=mesh(new T.TorusGeometry(.08,.018,6,12),M.metal,g,.10,.13,0);handle.rotation.y=Math.PI/2;}props.push({...it,group:g,available:true,flying:false});}
 const markers={};
 for(const h of HOTSPOTS){const ring=mesh(new T.RingGeometry(.31,.37,32),new T.MeshBasicMaterial({color:h.id==='whisky'?0xe1b963:0x88cbbd,transparent:true,opacity:.75,side:T.DoubleSide}),root,h.x,.035,h.z);ring.rotation.x=-Math.PI/2;markers[h.id]=ring;}
 const card=box(.21,.025,.14,M.gold,5,.94,9.32,root);
 const whisky=new T.Group();whisky.position.set(-5.2,.3,8.1);root.add(whisky);mesh(new T.CylinderGeometry(.105,.12,.40,14),mat(0x855728,{transparent:true,opacity:.95}),whisky,0,.2,0);cyl(.045,.18,M.gold,0,.48,0,whisky);box(.18,.18,.025,M.linen,0,.23,.112,whisky);
 const player=createActor(people.getCharacterTemplate('captain'),root,{id:100});
 const guards=ROUTES.map((g,i)=>{const actor=createActor(people.getCharacterTemplate(g.role),root,{id:110+i,guard:g.role.startsWith('security')});const cone=new T.Mesh(new T.BufferGeometry(),new T.MeshBasicMaterial({color:0xd5ac55,transparent:true,opacity:.14,side:T.DoubleSide,depthWrite:false}));root.add(cone);return {...g,actor,cone};});
 const target=mesh(new T.RingGeometry(.21,.26,32),new T.MeshBasicMaterial({color:0xf1d08a,side:T.DoubleSide}),root,0,.045,0);target.rotation.x=-Math.PI/2;target.visible=false;
 // Batch static environmental geometry only. Models and animated doors stay separate.
 const groups=new Map();for(const o of [...staticRoot.children])if(o.isMesh&&!o.material.transparent){if(!groups.has(o.material))groups.set(o.material,[]);groups.get(o.material).push(o);}
 for(const [m,os]of groups){if(os.length<2)continue;const parts=os.map(o=>{o.updateMatrix();return o.geometry.clone().applyMatrix4(o.matrix);});const g=mergeGeometries(parts,false);if(g){mesh(g,m);for(const o of os){staticRoot.remove(o);o.geometry.dispose();}}parts.forEach(g=>g.dispose());}
 return {root,player,guards,props,doors,markers,card,whisky,target,M,mesh};
}
