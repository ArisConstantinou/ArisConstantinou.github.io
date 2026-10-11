import * as T from 'three';
import {shipSign} from './signs190.js';
/** Cabin doors are physical props. Open leaves remain collidable inside each cabin. */
export function createCabinDoors({world,getState,onMessage,onLock=()=>{}}){
 const doors=[];
 const wood=new T.MeshStandardMaterial({color:0x93664b,roughness:.65});
 const trim=new T.MeshStandardMaterial({color:0xcdb580,metalness:.4,roughness:.35});
 function box(parent,w,h,d,mat,x,y,z){const q=new T.Mesh(new T.BoxGeometry(w,h,d),mat);q.position.set(x,y,z);parent.add(q);return q;}
 for(const side of [-1,1])for(let i=0;i<4;i++){
  const z=-9.5+i*7,x=side*2.3,number=201+i+(side>0?4:0);
  const p=world.addProp('cabinDoor',x,z,{y:13.12,w:.12,d:1.7,h:2.14,hp:42,grab:false,label:'ΚΑΜΠΙΝΑ '+number});
  p.cabin=true;p.number=number;p.side=side;p.open=true;p.locked=false;p.cabinCenter={x:side*5.4,y:13.12,z};
  const leaf=new T.Group();leaf.position.z=-.82;p.group.add(leaf);p.leaf=leaf;
  box(leaf,.10,2.10,1.64,wood,0,1.05,.82);
  for(const yy of [.23,1.84])box(leaf,.112,.06,1.45,trim,0,yy,.82);
  for(const xx of [-.072,.072])box(leaf,.09,.04,.19,trim,xx,1.0,1.35);
  const sign=shipSign(String(number),{width:.42,height:.15});sign.rotation.y=Math.PI/2;sign.position.set(-side*.065,1.68,.82);leaf.add(sign);
  doors.push(p);
 }
 function pose(p){p.leaf.rotation.y=p.open?p.side*Math.PI/2:0;p.x=p.home.x+(p.open?p.side*.82:0);p.z=p.home.z-(p.open?.82:0);p.w=p.open?1.68:.14;p.d=p.open?.14:1.68;p.active=!p.broken;p.label='ΚΑΜΠΙΝΑ '+p.number+(p.locked?' · ΚΛΕΙΔΩΜΕΝΗ':p.open?' · ΑΝΟΙΧΤΗ':' · ΚΛΕΙΣΤΗ');}
 function use(p){if(!p?.cabin||p.broken)return false;const drunk=getState().intox>=25;
  if(p.locked){p.locked=false;p.open=true;onMessage('Η καμπίνα '+p.number+' ξεκλείδωσε.');}
  else if(p.open){p.open=false;p.locked=drunk;onMessage(drunk?'Κλείδωσες την καμπίνα '+p.number+'. Μπορείς να την ανοίξεις ξανά ή να σπάσεις την πόρτα.':'Η πόρτα της καμπίνας έκλεισε.');if(drunk)onLock(p);}
  else{p.open=true;onMessage('Η πόρτα άνοιξε.');}
  pose(p);return true;
 }
 function reset(){for(const p of doors){p.open=true;p.locked=false;pose(p);}}
 function contains(p,n){const q=n.actor.group.position;return Math.abs(q.y-13.12)<.8&&p.side*q.x>2.6&&Math.abs(q.z-p.home.z)<3.25;}
 reset();
 return {doors,use,reset,contains,inspect:()=>doors.map(p=>({id:p.id,number:p.number,open:p.open,locked:p.locked,broken:p.broken,x:p.x,z:p.z}))};
}
