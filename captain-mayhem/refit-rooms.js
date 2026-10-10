import * as T from 'three';
import {DECKS,STAIRS,CORES,DESTINATIONS,zoneAt} from './refit-nav.js';
import {createMaterials,builder,label,batch} from './refit-assets.js';
export function createRoamWorld(ship,world){
 const root=new T.Group();root.name='AURORA / COMPLETE INTERIOR REFIT';world.root.add(root);const solids=[],props=[],staff=[],signs=[],fixtures=[],decks=[];const M=createMaterials();let B=builder(root),parent=root;
 const collision=(x,y,z,w,d,h=2.5)=>{const s={x,y,z,w,d,h,active:true};solids.push(s);return s;};
 function box(w,h,d,m,x,y,z){return B.box(w,h,d,m,x,y,z);}
 function round(w,h,d,r,m,x,y,z){return B.round(w,h,d,r,m,x,y,z);}
 function solid(x,y,z,w,d,h=2.5,m=M.ivory){box(w,h,d,m,x,y+h/2,z);return collision(x,y,z,w,d,h);}
 function sign(t,x,y,z,w=2.6,sub=''){const o=label(parent,t,x,y,z,w,sub);signs.push(o);return o;}
 function longWall(x,y,a,b,door,h=2.5){const gap=1.15;for(const [a1,b1]of [[a,door-gap],[door+gap,b]])if(b1>a1){solid(x,y,(a1+b1)/2,.15,b1-a1,h);box(.19,.12,b1-a1,M.navy,x,y+.09,(a1+b1)/2);box(.18,.05,b1-a1,M.brass,x,y+1.04,(a1+b1)/2);}box(.19,.23,gap*2,M.navy,x,y+h-.11,door);for(const z of [door-gap,door+gap])box(.19,h,.08,M.brass,x,y+h/2,z);}
 function crossWall(y,z,x0,x1,doorX=0,width=2.6,h=2.5){for(const [a,b]of [[x0,doorX-width/2],[doorX+width/2,x1]])if(b>a){solid((a+b)/2,y,z,b-a,.15,h);box(b-a,.12,.19,M.navy,(a+b)/2,y+.08,z);}box(width,.23,.20,M.navy,doorX,y+h-.11,z);}
 function lamp(x,y,z){box(1.45,.09,.35,M.navy,x,y,z);box(1.3,.023,.25,M.light,x,y-.055,z);fixtures.push(new T.Vector3(x,y-.2,z));}
 function table(x,y,z,w=1.45,d=.85){const p=world.addProp('table',x,z,{y,w,d,h:.83,hp:45,label:'ΤΡΑΠΕΖΙ'});props.push(p);const b=builder(p.group);b.round(w,.10,d,.12,M.teak,0,.80,0);for(const dx of [-w*.4,w*.4])for(const dz of [-d*.33,d*.33])b.rod([dx,.05,dz],[dx,.75,dz],.035,M.steel);return p;}
 function chair(x,y,z,angle=0){const p=world.addProp('chair',x,z,{y,w:.57,d:.57,h:1.02,hp:26,grab:true,label:'ΚΑΡΕΚΛΑ'});props.push(p);const b=builder(p.group);b.round(.54,.12,.52,.09,M.cloth,0,.46,0);b.round(.52,.47,.10,.04,M.cloth,0,.78,-.21);for(const xx of [-.21,.21])for(const zz of [-.2,.2])b.rod([xx,.02,zz],[xx,.43,zz],.023,M.steel);p.group.rotation.y=angle;return p;}
 function sofa(x,y,z,w=2.25){round(w,.44,.8,.16,M.cloth,x,y+.31,z);round(w,.64,.19,.09,M.cloth,x,y+.73,z-.34);for(const dx of [-w/2+.08,w/2-.08])round(.18,.55,.82,.06,M.cloth,x+dx,y+.49,z);for(let i=0;i<3;i++)round((w-.42)/3,.10,.64,.055,M.carpet,x-w*.3+i*w*.3,y+.57,z+.02);collision(x,y,z,w,.86,1.12);}
 function desk(x,y,z,w=3.8){round(w,1.02,.8,.18,M.teak,x,y+.51,z);round(w+.12,.10,1,.14,M.marble,x,y+1.08,z);box(w-.2,.09,.024,M.light,x,y+.27,z+.416);const mon=box(.57,.4,.045,M.screen,x,y+1.35,z-.18);mon.rotation.x=-.13;B.rod([x,y+1.09,z-.14],[x,y+1.20,z-.14],.035,M.steel);collision(x,y,z,w,.86,1.32);}
 function plant(x,y,z){round(.55,.55,.55,.15,M.ivory,x,y+.28,z);for(let i=0;i<5;i++){const a=i*2.4;B.rod([x,y+.52,z],[x+Math.cos(a)*.3,y+1.35+(i%2)*.2,z+Math.sin(a)*.3],.025,M.engine);const o=B.put(new T.SphereGeometry(1,8,6),M.engine,x+Math.cos(a)*.3,y+1.15+(i%2)*.2,z+Math.sin(a)*.3);o.scale.set(.13,.38,.10);o.rotation.z=Math.cos(a)*.6;}collision(x,y,z,.55,.55,1.5);}
 function shelves(x,y,z,side=1){solid(x,y,z,.50,2.5,1.85,M.teak);for(const yy of [.45,.95,1.45]){box(.56,.06,2.55,M.brass,x,y+yy,z);for(let i=0;i<6;i++){const zz=z-1+i*.38;round(.20,.20+.05*(i%3),.24,.03,[M.red,M.navy,M.ivory][i%3],x-side*.25,y+yy+.15,zz);}}}
 function bed(x,y,z){round(1.6,.32,2.18,.1,M.teak,x,y+.22,z);round(1.55,.23,2.1,.12,M.white,x,y+.5,z);round(1.51,.065,1.42,.06,M.cloth,x,y+.645,z+.29);round(1.0,.13,.46,.1,M.ivory,x,y+.68,z-.75);solid(x,y,z-.96,1.7,.14,1.15,M.teak);collision(x,y,z,1.65,2.2,.8);}
 function person(role,x,y,z,gender='male',face=0){staff.push({role,x,y,z,gender,face});}
 function surfaces(d,next){const insideW=d.y<10?8.45:d.id==='main'?9.15:d.id==='pool'?8.9:d.id==='dining'?8.45:d.id==='upper'?7.75:7.75;const a=d.y<10?d.z0:d.id==='main'?-44:d.id==='pool'?-41:d.id==='dining'?-35:d.id==='upper'?-27:-24;const b=d.y<10?d.z1:d.id==='main'?45:d.id==='pool'?39:d.id==='dining'?32:d.id==='upper'?30:24;
  const h=Math.min(2.52,(next?.y??d.y+2.9)-d.y-.2),holes=STAIRS.filter(st=>Math.abs(st.high-d.y)<.01||Math.abs(st.low-d.y)<.01);
  for(let z=a;z<b;z+=1){const dz=Math.min(1,b-z),zc=z+dz/2,intervals=[[-insideW,insideW]];for(const st of holes)if(zc>st.z0-.15&&zc<st.z1+.25){const l=st.x-st.w/2-.11,r=st.x+st.w/2+.11;for(let j=intervals.length-1;j>=0;j--){const [u,v]=intervals[j];if(r<=u||l>=v)continue;intervals.splice(j,1,...[[u,Math.max(u,l)],[Math.min(v,r),v]].filter(t=>t[1]-t[0]>.03));}}
   for(const [l,r]of intervals){box(r-l,.035,dz,d.y<6?M.metal:d.id==='main'?M.marble:d.id==='pool'?M.carpet:M.teak,(l+r)/2,d.y+.01,zc);box(r-l,.07,dz,M.ceiling,(l+r)/2,d.y+h+.05,zc);}
  }
  for(const side of [-1,1]){
   if(d.id==='engineering'){
    let start=a;for(const center of [-12,11]){const end=center-1.5;if(end>start)solid(side*insideW,d.y,(start+end)/2,.14,end-start,h);start=center+1.5;}if(b>start)solid(side*insideW,d.y,(start+b)/2,.14,b-start,h);
   }else for(let z=a;z<b;z+=3.6){const len=Math.min(3.6,b-z),zz=z+len/2;solid(side*insideW,d.y,zz,.15,len,.83);box(.14,.16,len,M.ivory,side*insideW,d.y+h-.08,zz);box(.08,h-.96,Math.max(.1,len-.25),M.glass,side*insideW,d.y+(h+.83)/2,zz);box(.16,h,.10,M.steel,side*insideW,d.y+h/2,z);collision(side*insideW,d.y,zz,.15,len,h);box(.18,.05,len,M.brass,side*insideW,d.y+.9,zz);}
  }
  crossWall(d.y,a,-insideW,insideW,0,2.8,h);crossWall(d.y,b,-insideW,insideW,0,2.8,h);
  for(let z=a+3;z<b-2;z+=7){lamp(0,d.y+h-.1,z);for(const side of [-1,1]){box(.06,.035,2,M.light,side*1.65,d.y+.04,z);if(z>-13&&z<16)lamp(side*5,d.y+h-.1,z);}}
  for(const side of [-1,1])for(let z=d.z0+1;z<d.z1-1;z+=2.5){if(d.y<10)continue;const zz=Math.min(z+2.5,d.z1-.1),x=side*(d.w-.06);if(d.id==='main')continue;B.rod([x,d.y+.05,z],[x,d.y+1.05,z],.035,M.steel);B.rod([x,d.y+1.05,z],[x,d.y+1.05,zz],.04,M.brass);collision(x,d.y,(z+zz)/2,.08,zz-z,1.07);}
  return {h,a,b,insideW};
 }
 for(let k=0;k<DECKS.length;k++){
  const d=DECKS[k];parent=new T.Group();parent.name='REFIT '+d.name;root.add(parent);decks.push(parent);B=builder(parent);const {h}=surfaces(d,DECKS[k+1]);
  for(const core of CORES){sign('ΣΚΑΛΕΣ  ↑ ↓',core.x,d.y+1.96,core.z1+1.1,1.8);sign(d.name.toUpperCase(),0,d.y+2.05,core.z1+1.5,3.6);}
  if(d.id==='engineering'){
   crossWall(d.y,0,-8.45,8.45,0,2.8,h);sign('ΜΗΧΑΝΟΣΤΑΣΙΟ',0,d.y+2.1,15,3.8,'01 / ΚΙΝΟΥΜΕΝΕΣ ΜΗΧΑΝΕΣ');
   for(const side of [-1,1]){for(let z=-29;z<30;z+=4){B.rod([side*7.8,d.y+2.1,z],[side*7.8,d.y+2.1,z+3.8],.12,M.engine);box(.30,.33,.10,M.steel,side*7.8,d.y+2.1,z+.2);}for(const zz of [-7,7]){desk(side*2.5,d.y,zz,1.1);sign(side<0?'PORT / ΠΡΟΩΣΗ':'STBD / ΠΡΟΩΣΗ',side*2.5,d.y+1.65,zz,.9);}}
   person('ΜΗΧΑΝΙΚΟΣ',-1.2,d.y,-4,'male',Math.PI);person('ΜΗΧΑΝΙΚΟΣ',1.2,d.y,12,'female');
  }else if(d.id==='technical'){
   sign('ΤΕΧΝΙΚΟ ΚΑΤΑΣΤΡΩΜΑ',0,d.y+2,12,3.7,'02 / ΠΛΥΝΤΗΡΙΑ • ΑΠΟΘΗΚΕΣ');
   for(const side of [-1,1])longWall(side*2.45,d.y,-13,16,4,h);
   for(const z of [-9,-5,-1,3,7]){round(1.2,1.22,.95,.08,M.ivory,-6.8,d.y+.61,z);const drum=B.put(new T.CylinderGeometry(.39,.39,.10,24),M.navy,-6.8,d.y+.58,z+.49);drum.rotation.x=Math.PI/2;collision(-6.8,d.y,z,1.2,1,1.25);}
   for(const z of [-10,-4,2,8,13])shelves(7.9,d.y,z,1);person('ΠΛΗΡΩΜΑ',-4.5,d.y,5,'female');person('ΑΠΟΘΗΚΑΡΙΟΣ',4.4,d.y,-5);
  }else if(d.id==='service'){
   for(const side of [-1,1])longWall(side*2.45,d.y,-13,16,6,h);
   sign('ΙΑΤΡΕΙΟ',4.8,d.y+2,7,2.1);sign('ΠΛΗΡΩΜΑ',-4.8,d.y+2,7,2.1);
   bed(6.4,d.y,2);desk(5.8,d.y,11,2.3);person('ΙΑΤΡΙΚΟ ΠΡΟΣΩΠΙΚΟ',5.8,d.y,12.1,'female',Math.PI);for(const z of [-7,5]){table(-5.3,d.y,z,2.5,1.1);chair(-5.3,d.y,z+1);chair(-5.3,d.y,z-1,Math.PI);}person('ΑΞΙΩΜΑΤΙΚΟΣ',-4,d.y,8);person('ΠΛΗΡΩΜΑ',-5,d.y,-5,'female');
  }else if(d.id==='main'){
   desk(-5.7,d.y,33,4.6);sign('ΠΛΗΡΟΦΟΡΙΕΣ',-5.7,d.y+2.05,34.6,3.6,'RECEPTION / MS AURORA');person('ΥΠΟΔΟΧΗ',-5.3,d.y,34.4,'female',Math.PI);person('ΕΞΥΠΗΡΕΤΗΣΗ',-6.7,d.y,34.4,'male',Math.PI);person('ΕΠΙΒΑΤΗΣ',-4.9,d.y,31.3);plant(7.7,d.y,32);plant(-7.8,d.y,29);sofa(5.2,d.y,34);table(5.2,d.y,32.3);person('ΕΠΙΒΑΤΗΣ',3.5,d.y,32,'female');
   for(const side of [-1,1])longWall(side*2.45,d.y,-13,16,6,h);
   crossWall(d.y,1,2.45,9.15,5.3,2.1,h);sign('AURORA / BOUTIQUE',5.7,d.y+2.1,12,3);sign('SEA GIFTS',5.7,d.y+2.1,-9,2.6);
   for(const z of [-9,-4,6,11])shelves(8.7,d.y,z,1);desk(5.2,d.y,13.4,2.6);person('ΚΑΤΑΣΤΗΜΑ',5.3,d.y,14.7,'female',Math.PI);desk(5.2,d.y,-10.2,2.6);person('ΚΑΤΑΣΤΗΜΑ',5.4,d.y,-11.5,'male');person('ΕΠΙΒΑΤΗΣ',6.6,d.y,4,'male');person('ΕΠΙΒΑΤΗΣ',5.2,d.y,-5,'female');
   for(const z of [-8,0,10]){sofa(-6,d.y,z);table(-6,d.y,z+1.6);}
   sign('ΣΑΛΟΝΙ ΕΠΙΒΑΤΩΝ',-5.5,d.y+2,5,3.6);person('ΕΠΙΒΑΤΗΣ',-4.6,d.y,2);person('ΣΕΡΒΙΤΟΡΟΣ',-4,d.y,11);plant(-8,d.y,14);
   sign('ΠΛΩΡΗ / SKY BAR',0,d.y+2,44,3);sign('ΠΡΥΜΝΗ / ΠΕΡΙΠΑΤΟΣ',0,d.y+2,-43,3.5);
  }else if(d.id==='pool'){
   for(const side of [-1,1])for(let i=0;i<4;i++){const a=-13+i*7,b=a+7,cz=(a+b)/2;longWall(side*2.45,d.y,a,b,cz,h);solid(side*5.65,d.y,a,6.25,.14,h);if(i===3)solid(side*5.65,d.y,b,6.25,.14,h);bed(side*6.2,d.y,cz);desk(side*3.9,d.y,a+.7,1.1);sign('ΚΑΜΠΙΝΑ '+(201+i+(side>0?4:0)),side*2.39,d.y+1.95,cz,1.3);}
   person('ΕΠΙΒΑΤΗΣ',0,d.y,4,'female');person('ΚΑΘΑΡΙΟΤΗΤΑ',0,d.y,-7);person('ΕΠΙΒΑΤΗΣ',6.2,d.y,-50,'male');person('ΠΛΗΡΩΜΑ ΠΙΣΙΝΑΣ',-6.2,d.y,-48,'female');sign('ΠΙΣΙΝΑ / POOL',0,d.y+2,-41,3);
  }else if(d.id==='dining'){
   sign('ΕΣΤΙΑΤΟΡΙΟ / AURORA',0,d.y+2,15,3.8);for(const side of [-1,1])for(const z of [3,9,14]){table(side*5.3,d.y,z,1.7,1);chair(side*5.3,d.y,z+.95);chair(side*5.3,d.y,z-.95,Math.PI);}
   person('ΣΕΡΒΙΤΟΡΟΣ',3.2,d.y,8);person('ΕΠΙΒΑΤΗΣ',6.2,d.y,11,'female');person('ΕΠΙΒΑΤΗΣ',-4.3,d.y,5);desk(-4.4,d.y,29,3);person('ΣΕΦ',-4.5,d.y,30.2,'male',Math.PI);
   sign('ΘΕΑΤΡΟ',0,d.y+2,-4,2.7);round(10,.22,2.3,.2,M.teak,0,d.y+.11,-14);collision(0,d.y,-14,10,2.3,.23);box(10,2.2,.12,M.red,0,d.y+1.1,-15.3);for(const side of [-1,1])for(const z of [-6,-9,-12])sofa(side*4.1,d.y,z,2.7);person('ΕΠΙΒΑΤΗΣ',0,d.y,-7,'female');
  }else if(d.id==='upper'){
   for(const side of [-1,1])longWall(side*2.4,d.y,-13,15,5,h);
   sign('ΠΑΙΧΝΙΔΙΑ / ARCADE',-4.8,d.y+2,7,3.2);for(const z of [-10,-6,-2,2]){solid(-6.8,d.y,z,.8,.65,1.2,M.navy);box(.7,.7,.1,M.screen,-6.8,d.y+1.55,z+.18);box(.7,.07,.45,M.brass,-6.8,d.y+1.0,z+.27);}person('ΕΠΙΒΑΤΗΣ',-5,d.y,-2);sign('ΠΑΝΟΡΑΜΙΚΟ ΜΠΑΡ',4.8,d.y+2,9,3.3);desk(4.7,d.y,12,3.7);person('ΜΠΑΡΜΑΝ',4.6,d.y,13.2,'male',Math.PI);sofa(4.7,d.y,-4);person('ΕΠΙΒΑΤΗΣ',4,d.y,3,'female');
   sign('ΓΕΦΥΡΑ / BRIDGE',0,d.y+2,29.5,3);
  }else{
   sign('ΠΑΝΟΡΑΜΙΚΟ ΣΑΛΟΝΙ',0,d.y+2,13,3.8);for(const side of [-1,1])for(const z of [-9,0,9]){sofa(side*4,d.y,z);table(side*4,d.y,z+1.5);}plant(-6.9,d.y,12);person('ΕΠΙΒΑΤΗΣ',-2,d.y,5,'female');person('ΕΠΙΒΑΤΗΣ',3,d.y,7);person('ΠΛΗΡΩΜΑ',0,d.y,12,'female');
  }
  batch(parent);
 }
 parent=new T.Group();parent.name='Sixteen connected stair flights';root.add(parent);B=builder(parent);
 for(const st of STAIRS){const count=Math.ceil((st.high-st.low)/.18),rise=(st.high-st.low)/count,run=(st.z1-st.z0)/count;
  for(let i=0;i<count;i++){const y=st.low+(i+1)*rise,z=st.z0+(i+.5)*run;box(st.w,rise+.025,run+.01,M.teak,st.x,y-rise/2-.018,z);box(st.w-.08,.02,.055,M.brass,st.x,y-.012,z-run*.42);}
  for(const side of [-1,1]){const x=st.x+side*(st.w/2+.04);B.rod([x,st.low-.07,st.z0],[x,st.high-.07,st.z1],.08,M.navy);B.rod([x,st.low+1.04,st.z0],[x,st.high+1.04,st.z1],.044,M.brass);for(let i=0;i<=10;i++){const t=i/10,z=st.z0+(st.z1-st.z0)*t,y=st.low+(st.high-st.low)*t;B.rod([x,y,z],[x,y+1.04,z],.027,M.steel);if(i<10)collision(x,y,z+(st.z1-st.z0)/20,.08,(st.z1-st.z0)/10,1.04);}}
 }
 batch(parent);solids.push({x:0,y:13.12,z:-49.5,w:8.45,d:14.8,h:.53,active:true});
 const lights=Array.from({length:3},()=>{const l=new T.PointLight(0xffe9c2,24,12,1.4);root.add(l);return l;});
 function update(p){const indoors=p.y<10||(Math.abs(p.x)<(p.y>20?7.5:8.6)&&p.z<30&&p.z>-42);const nearest=fixtures.filter(q=>q.y>p.y+1&&q.y<p.y+3.5).sort((a,b)=>a.distanceToSquared(p)-b.distanceToSquared(p));for(let i=0;i<lights.length;i++){lights[i].visible=indoors&&!!nearest[i];if(nearest[i])lights[i].position.copy(nearest[i]);}for(const sign of signs)sign.visible=Math.abs(sign.position.y-p.y)<4.2&&Math.hypot(sign.position.x-p.x,sign.position.z-p.z)<24;}
 return {root,solids,props,staff,materials:M,signs,fixtures,update,inspect:()=>({decks:DECKS.length,stairs:STAIRS.length,cabins:8,areas:DESTINATIONS.length,staff:staff.length,signs:signs.length,rooms:['Μηχανοστάσιο','Πλυντήρια','Αποθήκες','Ιατρείο','Χώρος πληρώματος','Υποδοχή','Πληροφορίες','Boutique','Sea Gifts','Σαλόνι','Καμπίνες','Πισίνα','Εστιατόριο','Θέατρο','Arcade','Πανοραμικό μπαρ','Γέφυρα','Πανοραμικό σαλόνι']})};
}
