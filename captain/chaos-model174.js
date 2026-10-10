// Chapter 01 simulation. Metres/seconds. No real-world combat instruction.
export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export const ATTACKS={
 slap:{key:1,label:'ΓΡΗΓΟΡΟ ΧΑΣΤΟΥΚΙ',icon:'🖐',duration:.43,contact:.16,range:1.75,damage:10,stamina:7,push:.22,score:12},
 heavy:{key:2,label:'ΒΑΡΥ ΧΑΣΤΟΥΚΙ',icon:'✋',duration:.86,contact:.35,range:1.85,damage:22,stamina:19,push:.56,score:20},
 punch:{key:3,label:'ΓΡΟΘΙΑ',icon:'👊',duration:.64,contact:.23,range:1.82,damage:18,stamina:13,push:.40,score:16},
 kick:{key:4,label:'ΚΛΩΤΣΙΑ',icon:'🦶',duration:.95,contact:.38,range:2.18,damage:25,stamina:25,push:.88,score:23},
 spit:{key:5,label:'ΠΡΟΚΑΛΕΣΕ',icon:'💦',duration:.8,contact:.22,range:3,damage:0,stamina:3,push:0,score:7}
};
export const wrap=a=>Math.atan2(Math.sin(a),Math.cos(a));
export function makeChapterState(){return {phase:'helm',foot:false,sips:0,pendingAlcohol:0,stamina:100,health:100,chaos:0,heat:0,time:0,attack:null,block:false,alarmAt:null,arrestAt:null,hits:0,broken:0,thrown:0,combos:0,lastHit:-99,lastKind:null,visited:false,guardHits:0};}
export function beginAttack(s,kind){const a=ATTACKS[kind];if(!a||!s.foot||!['deck','security','assault'].includes(s.phase)||s.attack||s.stamina<a.stamina||s.block)return false;s.stamina-=a.stamina;s.attack={kind,t:0,landed:false};return true;}
export function tickAttack(s,dt,contact){if(!s.attack)return;const x=s.attack,a=ATTACKS[x.kind];x.t+=dt;if(!x.landed&&x.t>=a.contact){x.landed=true;contact(x.kind,a);}if(x.t>=a.duration)s.attack=null;}
export function sip(s,voyage){if(voyage.drinkCooldown>0)return {ok:false,message:'Περίμενε να τελειώσεις τη γουλιά.'};if(!s.foot&&s.sips>0&&s.phase!=='reclaimed')return {ok:false,message:'Μία γουλιά εδώ. Το επόμενο ποτό είναι κάτω, στο μπαρ.'};if(s.foot&&!s.visited)return {ok:false,message:'Κατέβα πρώτα στο κατάστρωμα των επιβατών.'};if(s.phase==='arrested'||s.phase==='cell')return {ok:false};s.sips++;s.pendingAlcohol=clamp(s.pendingAlcohol+(s.sips===1?9:23),0,140);voyage.drinks++;voyage.drinkCooldown=2.7;voyage.drinkAnim=1;return {ok:true};}
export function absorb(s,voyage,dt){const amount=Math.min(s.pendingAlcohol,dt*4.4);s.pendingAlcohol-=amount;voyage.intox=clamp(voyage.intox+amount,0,100);s.stamina=clamp(s.stamina+dt*(s.block?1.2:13),0,100);}
export function addChaos(s,amount,kind){const combo=s.time-s.lastHit<4.4&&kind!==s.lastKind;if(combo){amount=Math.round(amount*1.3);s.combos++;}s.chaos+=amount;s.heat=clamp(s.heat+Math.max(4,amount*.35),0,100);s.lastHit=s.time;s.lastKind=kind;if(s.alarmAt===null)s.alarmAt=s.time+50;return amount;}
// Continuous bridge -> starboard access -> outboard stair -> foredeck.
export function floorAt(x,z){
 if(x>=-9.65&&x<=10.45&&z>=31.9&&z<=46.4)return 18.43;
 if(x>=9.3&&x<=13.42&&z>=31.85&&z<=33.85)return 18.43;
 if(x>=11.78&&x<=13.42&&z>=33.75&&z<=49.32)return 18.43-clamp((z-33.85)/15.25,0,1)*8.33;
 if(x>=7.65&&x<=13.42&&z>=49.12&&z<=51.58)return 10.10;
 if(z>=50.8&&z<=63.1){const w=z<56?8.15:z<60?8.15-(z-56)*.5:6.15-(z-60)*.47;if(Math.abs(x)<=w)return 10.10;}
 return null;
}
export function onFloor(x,z,r=.24){const c=floorAt(x,z);if(c===null)return false;return [[r,0],[-r,0],[0,r],[0,-r]].every(([a,b])=>{const y=floorAt(x+a,z+b);return y!==null&&Math.abs(y-c)<.45;});}
export function circleBox(x,z,r,b){const px=clamp(x,b.x-b.w/2,b.x+b.w/2),pz=clamp(z,b.z-b.d/2,b.z+b.d/2);return (x-px)**2+(z-pz)**2<r*r;}
export function moveCharacter(p,dx,dz,solids=[],bodies=[],radius=.29){const n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.09));let moved=0;for(let i=0;i<n;i++){for(const axis of ['x','z']){const nx=p.x+(axis==='x'?dx/n:0),nz=p.z+(axis==='z'?dz/n:0),y=floorAt(nx,nz);if(y===null||Math.abs(y-p.y)>.65||!onFloor(nx,nz,radius))continue;if(solids.some(b=>b.active!==false&&Math.abs((b.y??y)-y)<2.2&&circleBox(nx,nz,radius,b)))continue;if(bodies.some(b=>b.active!==false&&Math.abs(b.y-y)<1.5&&(nx-b.x)**2+(nz-b.z)**2<(radius+(b.radius??.28))**2))continue;moved+=Math.abs(nx-p.x)+Math.abs(nz-p.z);p.x=nx;p.z=nz;p.y=y;}}return moved;}
export function lineBox(a,b,box){let lo=0,hi=1;for(const [axis,size] of [['x','w'],['z','d']]){const delta=b[axis]-a[axis],min=box[axis]-box[size]/2,max=box[axis]+box[size]/2;if(Math.abs(delta)<1e-8){if(a[axis]<min||a[axis]>max)return false;continue;}let t1=(min-a[axis])/delta,t2=(max-a[axis])/delta;if(t1>t2)[t1,t2]=[t2,t1];lo=Math.max(lo,t1);hi=Math.min(hi,t2);if(lo>hi)return false;}return hi>.02&&lo<.97;}
