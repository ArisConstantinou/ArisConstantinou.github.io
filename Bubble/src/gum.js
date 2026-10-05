/* Bubble 0.3: damped elastic constraints and collision-driven impulses.
 * Physics owns velocity, never teleports an actor to an anchor.
 * All times are simulation seconds; callers move each actor exactly once. */
import {add,sub,mul,dot,len,norm,dist,clamp,node,segment} from './engine.js';
const COLOR=0xb66aff, UP=[0,1,0];
export function closestOnSegment(p,a,b){const d=sub(b,a),l2=dot(d,d);return l2<1e-8?a.slice():add(a,mul(d,clamp(dot(sub(p,a),d)/l2,0,1)));}
export function springForce(a,b,va,vb,rest,k=24,damping=5){const d=sub(b,a),l=len(d);if(l<1e-5||l<=rest)return [0,0,0];const n=mul(d,1/l);return mul(n,clamp(k*(l-rest)+damping*dot(sub(vb,va),n),0,65));}
export function launchVelocity(a,b,position,facing,stretch=1){const span=sub(b,a);let axis=norm([-span[2],0,span[0]]);if(len(axis)<.01)axis=norm([facing[0],0,facing[2]]);if(dot(axis,facing)<0)axis=mul(axis,-1);const q=closestOnSegment(position,a,b),extension=clamp(dist(position,q),1.5,5);const speed=clamp(Math.sqrt(14*extension*extension)*stretch,9,18);return [axis[0]*speed,7.8,axis[2]*speed];}
const velocity=a=>[a.gumV?.[0]||0,a.vy||0,a.gumV?.[2]||0];
export class GumSystem{
 constructor(world,options){this.world=world;this.o=options;this.links=[];this.pending=null;this.mode='sling';this.clock=0;this.slamCooldown=0;this.bounceCooldown=0;this.lastAction='Στόχευσε δύο επιφάνειες για SLING';}
 reset(){this.links=[];this.pending=null;this.clock=0;this.slamCooldown=0;this.bounceCooldown=0;this.lastAction='Στόχευσε δύο επιφάνειες για SLING';}
 player(){return this.o.player();}
 actors(){return [this.player(),...this.o.actors()];}
 actor(id){return this.actors().find(a=>a.id===id&&a.state!=='captured'&&!a.pin);}
 endpoint(ref){return ref.kind==='actor'?(this.actor(ref.id)?add(this.actor(ref.id).p,[0,1.2,0]):null):ref.p.slice();}
 say(s){this.lastAction=s;this.o.notify?.(s,2.4);}
 setMode(m){this.mode=m;this.pending=null;this.say(m==='sling'?'SLING · δύο διαφορετικές επιφάνειες, χωρίς τηλεμεταφορά.':'LINK · εχθρός → τοίχος ή δεύτερος εχθρός.');}
 cancel(){this.pending=null;this.links=[];this.say('Τα ελαστικά δεσίματα κόπηκαν.');}
 impulse(a,v){a.gumV??=[0,0,0];a.gumV[0]=clamp(a.gumV[0]+v[0],-22,22);a.gumV[2]=clamp(a.gumV[2]+v[2],-22,22);if(v[1]){a.vy=clamp((a.vy||0)+v[1],-24,15);a.grounded=false;}}
 select(ref,facing){
  if(!ref){this.say('Δεν υπάρχει έγκυρος στόχος. Στόχευσε κοντινό τοίχο ή έδαφος.');return false;}
  if(this.mode==='sling'&&ref.kind!=='surface'){this.say('Το SLING θέλει δύο επιφάνειες. Επίλεξε LINK για εχθρούς.');return false;}
  const p=this.endpoint(ref);if(!p){this.say('Ο ιππότης έχει ήδη στερεωθεί. Ολοκλήρωσε τη σύλληψη με βολές.');return false;}
  if(dist(add(this.player().p,[0,1.2,0]),p)>28*this.o.stretch()){this.say('Το anchor είναι εκτός εμβέλειας.');return false;}
  if(!this.pending){this.pending={ref,born:this.clock};this.say('ANCHOR 1/2 · σημάδεψε διαφορετικό σημείο και πάτα ξανά.');return true;}
  const a=this.endpoint(this.pending.ref),b=p;
  if(!a){this.pending=null;return false;}
  if((ref.kind==='actor'&&this.pending.ref.kind==='actor'&&ref.id===this.pending.ref.id)||dist(a,b)<1.2){this.say('Τα δύο anchors πρέπει να απέχουν τουλάχιστον 1,2 m.');return false;}
  if(dist(a,b)>18*this.o.stretch()){this.say('Το δεύτερο anchor είναι πολύ μακριά. Το πρώτο παραμένει επιλεγμένο.');return false;}
  const surface=this.pending.ref.kind==='surface'&&ref.kind==='surface';
  const link={a:this.pending.ref,b:ref,rest:dist(a,b)*(surface?1:.62),born:this.clock,life:surface?60:24,pull:false,phase:0};
  this.links.push(link);if(this.links.length>6)this.links.shift();this.pending=null;
  if(surface){
   const q=closestOnSegment(this.player().p,a,b);
   if(dist(this.player().p,q)<11&&Math.abs(q[1]-this.player().p[1])<5){this.impulse(this.player(),launchVelocity(a,b,this.player().p,facing,this.o.stretch()));this.bounceCooldown=1;link.kick=.45;this.say('SLING! Το νήμα μένει ενεργό για BOUNCE.');}
   else this.say('Νήμα BOUNCE έτοιμο. Πλησίασε το νήμα για αναπήδηση.');
  }else this.say('LINK! Το ελαστικό νήμα τραβά τους στόχους. PULL ή SLAM για συνέχεια.');
  return true;
 }
 pull(target){
  const existing=this.links.find(l=>l.pull);if(existing){this.links=this.links.filter(l=>!l.pull);this.say('PULL απελευθερώθηκε.');return true;}
  if(!target||target.id<0||target.id===99||target.state==='captured'||target.pin){this.say('PULL · στόχευσε έναν ορατό ιππότη.');return false;}
  const a=add(this.player().p,[0,1.2,0]),b=add(target.p,[0,1.2,0]);
  if(dist(a,b)>18*this.o.stretch()||this.world.ray(a,norm(sub(b,a)),Math.max(0,dist(a,b)-.7))){this.say('Ο στόχος είναι μακριά ή πίσω από τοίχο.');return false;}
  this.links.push({a:{kind:'actor',id:-1},b:{kind:'actor',id:target.id},rest:2.5,born:this.clock,life:14,pull:true});if(this.links.length>6)this.links.shift();this.say('PULL ενεργό · κινήσου για να τεντώσεις το νήμα.');return true;
 }
 controls(a){return this.links.some(l=>(l.a.kind==='actor'&&l.a.id===a.id)||(l.b.kind==='actor'&&l.b.id===a.id))||Math.hypot(a.gumV?.[0]||0,a.gumV?.[2]||0)>.03||a.slamAt>this.clock;}
 slam(facing){
  if(this.slamCooldown>0){this.say('SLAM διαθέσιμο σε '+this.slamCooldown.toFixed(1)+'s.');return false;}
  const targets=[...new Set(this.links.flatMap(l=>[l.a,l.b]).filter(r=>r.kind==='actor'&&r.id>=0).map(r=>r.id))].map(id=>this.actor(id)).filter(Boolean);
  if(!targets.length){this.say('Πρώτα δέσε έναν εχθρό με LINK ή PULL.');return false;}
  for(const a of targets){const dir=norm([facing[0],0,facing[2]]),hit=this.world.ray(add(a.p,[0,1,0]),dir,10,true);a.slamArmed=true;a.slamUntil=this.clock+1.5;
   if(hit&&Math.abs(hit.n[1])<.25){a.gumV=[dir[0]*19,0,dir[2]*19];a.vy=2;a.grounded=false;}
   else{a.vy=6;a.grounded=false;a.slamAt=this.clock+.24;a.gumV=[dir[0]*2,0,dir[2]*2];}
  }
  this.links=this.links.filter(l=>![l.a,l.b].some(r=>r.kind==='actor'&&targets.some(a=>a.id===r.id)));
  this.slamCooldown=3;this.say('SLAM!');return true;
 }
 step(dt){
  this.clock+=dt;this.slamCooldown=Math.max(0,this.slamCooldown-dt);this.bounceCooldown=Math.max(0,this.bounceCooldown-dt);
  if(this.pending&&(!this.endpoint(this.pending.ref)||this.clock-this.pending.born>18)){this.pending=null;this.say('Το πρώτο anchor έληξε.');}
  this.links=this.links.filter(l=>{const a=this.endpoint(l.a),b=this.endpoint(l.b);return a&&b&&this.clock-l.born<l.life&&dist(a,b)<35*this.o.stretch();});
  for(const l of this.links){const a=this.endpoint(l.a),b=this.endpoint(l.b),aa=l.a.kind==='actor'?this.actor(l.a.id):null,bb=l.b.kind==='actor'?this.actor(l.b.id):null;
   if(aa||bb){const force=springForce(a,b,aa?velocity(aa):[0,0,0],bb?velocity(bb):[0,0,0],l.rest,24*this.o.stretch(),5);
    if(aa&&!l.pull)this.impulse(aa,mul(force,dt));if(bb)this.impulse(bb,mul(force,-dt));
   }else if(this.bounceCooldown===0){const p=this.player(),q=closestOnSegment(add(p.p,[0,.18,0]),a,b);if(dist(add(p.p,[0,.18,0]),q)<.8&&p.vy<=.5){this.impulse(p,[0,9.5-p.vy,0]);this.bounceCooldown=.85;l.kick=.5;this.say('BOUNCE!');}}
   l.kick=Math.max(0,(l.kick||0)-dt);
  }
  for(const a of this.actors()){if(a.slamAt&&this.clock>=a.slamAt){a.vy=-19;a.slamAt=0;}if(a.slamUntil<this.clock)a.slamArmed=false;}
 }
 move(a,dx,dz,dt){
  const v=a.gumV||[0,0,0],before=a.p.slice(),oldVy=a.vy,wasGrounded=a.grounded;
  const mx=dx+v[0]*dt,mz=dz+v[2]*dt;this.world.move(a,mx,mz,dt);
  const blockedX=Math.abs((a.p[0]-before[0])-mx)>.015,blockedZ=Math.abs((a.p[2]-before[2])-mz)>.015,impactSpeed=Math.hypot(blockedX?v[0]:0,blockedZ?v[2]:0);
  if(a.slamArmed&&((impactSpeed>5)||(!wasGrounded&&a.grounded&&oldVy<-5))){a.slamArmed=false;this.o.impact?.(a,Math.max(impactSpeed,-oldVy),[blockedX?-Math.sign(mx):0,a.grounded?1:0,blockedZ?-Math.sign(mz):0]);}
  const decay=Math.exp(-(a.grounded?5:1.3)*dt);a.gumV=[blockedX?0:v[0]*decay,0,blockedZ?0:v[2]*decay];
  if(a.grounded){a.lastWall=null;a.viewY=a.p[1];}if(a.p.some(n=>!Number.isFinite(n))){a.p=before;a.vy=0;a.gumV=[0,0,0];}
 }
 jump(a,facing){
  if(a.grounded){a.vy=7.7;a.grounded=false;a.lastJump=this.clock;return 'jump';}
  if(this.clock-(a.lastJump??-10)<.18||a.stamina<8)return false;
  let hit=null;for(let i=0;i<12;i++){const ang=i*Math.PI/6,d=[Math.sin(ang),0,Math.cos(ang)],h=this.world.ray(add(a.p,[0,.95,0]),d,.92,true);if(h&&Math.abs(h.n[1])<.25&&h.box!==a.lastWall&&(!hit||h.t<hit.t))hit=h;}
  if(!hit)return false;a.lastWall=hit.box;a.lastJump=this.clock;a.gumV=[hit.n[0]*8,0,hit.n[2]*8];a.vy=8.8;a.grounded=false;return 'wall';
 }
 draw(time,out){
  if(this.pending){const p=this.endpoint(this.pending.ref);if(p){out.push(node('sphere',p,[.25,.25,.25],0xffd77e,[0,0,0],[.15,.8,0,0]));out.push(segment('cylinder',p,add(p,[0,.8,0]),.045,0xffd77e));}}
  for(const l of this.links){const a=this.endpoint(l.a),b=this.endpoint(l.b);if(!a||!b)continue;const length=dist(a,b),stretch=Math.max(1,length/Math.max(.1,l.rest));let prev=a;
   for(let i=1;i<=12;i++){const t=i/12,q=add(a,mul(sub(b,a),t));q[1]-=Math.sin(Math.PI*t)*Math.min(.5,length*.035)/stretch;q[1]+=Math.sin(Math.PI*t)*Math.sin(time*22)*(l.kick||0)*.7;out.push(segment('cylinder',prev,q,.065/Math.sqrt(stretch),COLOR,[.14,.25,0,0]));prev=q;}
   for(const p of[a,b])out.push(node('sphere',p,[.18,.18,.18],0xd7abff,[0,0,0],[.12,.65,0,0]));
  }
 }
}
