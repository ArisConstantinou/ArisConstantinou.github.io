import * as T from 'three';
import {SAVE_KEY,validSave,heatStep,guardLimit} from './rules.js';
import {floorAt,zoneAt} from '../captain/shipwalk184.js';
/** An independent, open-ended mode. No story checkpoint or jail transitions. */
export function createMayhemSystems({ship,world,root,hud,camera,getState,getPlayer,getVoyage,party,solids,lineClear,spawnGuard,canPlay,onMessage,onRecover}){
 let time=0,quiet=0,lastSave=0,seen=false,tiltUntil=0,tiltReady=0,tiltSign=1,scoreFlush=0,scorePending=0,lastKind='',grace=5;
 let best=0;try{best=Number(localStorage.getItem(SAVE_KEY+'-best'))||0;}catch{}
 const smoke=[],sparks=[];
 const el=document.createElement('section');el.id='mayhemHUD';el.innerHTML=`<header class="mode-head"><div class="mode-brand">LAST CALL <b>MAYHEM</b><small>ΕΛΕΥΘΕΡΟ ΧΑΟΣ</small></div><div class="mode-score"><small>ΧΑΟΣ</small><strong id="mhScore">0</strong><span id="mhCombo"></span></div></header><div class="mode-location"><i></i><span id="mhLocation"></span></div><div id="mhWanted"><span id="mhHeatLabel">ΚΑΝΕΝΑΣ ΣΥΝΑΓΕΡΜΟΣ</span><div id="mhHeat"><i></i><i></i><i></i><i></i></div><small id="mhEscape"></small></div><div id="mhMeters"><div><label>ΖΩΗ <b id="mhHP">100</b></label><i><em id="mhHPFill"></em></i></div><div><label>ΜΕΘΗ <b id="mhDrunk">40%</b></label><i><em id="mhDrunkFill"></em></i></div><div><label>ΑΝΤΟΧΗ <b id="mhStamina">100</b></label><i><em id="mhStaminaFill"></em></i></div></div><div id="mhFeed" aria-live="polite"></div><div id="mhTelegraph"></div><button id="mhTilt" aria-label="Απότομη μανούβρα"><kbd>T</kbd><span>↶</span><b>ΜΑΝΟΥΒΡΑ</b><small>ΚΛΙΣΗ ΠΛΟΙΟΥ</small></button><div id="mhDown" hidden><small>ΠΑΡΕ ΜΙΑ ΑΝΑΣΑ</small><h2>Η βάρδια<br>δεν τελείωσε.</h2><p>Η ζημιά και η βαθμολογία σου μένουν. Συνεχίζεις στο ίδιο πλοίο, χωρίς κελί.</p><button id="mhRecover">ΣΗΚΩ ΚΑΙ ΣΥΝΕΧΙΣΕ →</button></div>`;root.append(el);
 const $=id=>el.querySelector('#'+id);$('mhTilt').onclick=tilt;$('mhRecover').onclick=()=>{onRecover();$('mhDown').hidden=true;quiet=0;grace=7;};
 const c=document.createElement('canvas');c.width=c.height=64;const ctx=c.getContext('2d'),g=ctx.createRadialGradient(32,32,1,32,32,31);g.addColorStop(0,'rgba(235,240,231,.9)');g.addColorStop(.5,'rgba(218,232,220,.32)');g.addColorStop(1,'rgba(218,232,220,0)');ctx.fillStyle=g;ctx.fillRect(0,0,64,64);const smokeTexture=new T.CanvasTexture(c);
 const outline=new T.BoxHelper(undefined,0xf0ba69);outline.material.transparent=true;outline.material.opacity=.75;outline.visible=false;ship.group.add(outline);
 function feedback(text){const n=document.createElement('div');n.textContent=text;$('mhFeed').append(n);while($('mhFeed').children.length>3)$('mhFeed').firstChild.remove();setTimeout(()=>n.remove(),2400);}
 function event(amount,kind,position){scorePending+=amount;lastKind=kind;scoreFlush=.18;if(kind.startsWith('destroy')){feedback(kind.includes('window')?'ΠΕΡΑΣΜΑ ΑΝΟΙΧΤΟ':'ΑΛΛΗ ΜΙΑ ΖΗΜΙΑ');burst(position||getPlayer(),kind.includes('window')?0xd1f1e6:0xe2c699);} }
 function burst(at,color=0xf0c891){for(let i=0;i<8;i++){const q=new T.Mesh(new T.SphereGeometry(.018,4,3),new T.MeshBasicMaterial({color}));q.position.set(at.x,at.y+1,at.z);ship.group.add(q);sparks.push({q,v:new T.Vector3((Math.random()-.5)*3,Math.random()*2,(Math.random()-.5)*3),life:.35});}}
 function smokeBlocks(a,b){const vx=b.x-a.x,vz=b.z-a.z,den=vx*vx+vz*vz;return smoke.some(c=>{if(c.life<.6||Math.abs(c.y-a.y)>2)return false;const t=den?Math.max(0,Math.min(1,((c.x-a.x)*vx+(c.z-a.z)*vz)/den)):0;return Math.hypot(c.x-a.x-vx*t,c.z-a.z-vz*t)<c.r;});}
 function spray(at,dir){if(!canPlay())return false;if(time<(spray.next||0))return false;spray.next=time+1.5;const center={x:at.x+dir.x*2.5,y:at.y,z:at.z+dir.z*2.5,r:2.1,life:5,sprites:[]};
  for(let i=0;i<12;i++){const q=new T.Sprite(new T.SpriteMaterial({map:smokeTexture,color:0xdce8e0,transparent:true,opacity:.35,depthWrite:false}));q.position.set(center.x+(Math.random()-.5)*2,at.y+.5+Math.random()*1.7,center.z+(Math.random()-.5)*2);q.scale.setScalar(.6+Math.random());ship.group.add(q);center.sprites.push(q);}
  smoke.push(center);for(const n of party){if(n.health<=0||Math.abs(n.actor.group.position.y-at.y)>1.5)continue;if(n.actor.group.position.distanceTo(new T.Vector3(center.x,at.y,center.z))<4){n.state='search';n.goal.copy(n.actor.group.position);n.lastSeen=n.goal.clone();n.attack=null;n.stagger=1.5;n.searchUntil=time+5;n.confusedUntil=time+5;}}
  feedback('ΣΥΝΝΕΦΟ ΚΑΛΥΨΗΣ · ΚΙΝΗΣΟΥ');return true;
 }
 function tilt(){const s=getState(),p=getPlayer();if(!s.foot||s.downed||!canPlay()||time<tiltReady)return false;tiltUntil=time+2;tiltReady=time+13;tiltSign*=-1;
  for(const o of world.props){if(o.broken||o.active===false||!['chair','cart','table','bottle','vase'].includes(o.type)||Math.abs(o.group.position.y-p.y)>2.3)continue;o.active=true;o.moving=true;o.throwFloor=floorAt(o.group.position.x,o.group.position.z,p.y)??p.y;o.hitIds.clear();o.velocity.x+=tiltSign*5.5;o.velocity.y+=1.2;o.velocity.z+=(Math.random()-.5)*1.5;}
  for(const n of party)if(n.health>0&&Math.abs(n.actor.group.position.y-p.y)<.9){n.stagger=Math.max(n.stagger,1.5);n.flinch=.8;n.attack=null;}
  feedback('ΑΠΟΤΟΜΗ ΜΑΝΟΥΒΡΑ!');return true;
 }
 function update(dt,target){time=getState().time;grace=Math.max(0,grace-dt);scoreFlush-=dt;
  if(scorePending&&scoreFlush<=0){feedback('+'+scorePending+'  '+(lastKind.includes('destroy')?'ΚΑΤΑΣΤΡΟΦΗ':lastKind.includes('throw')?'ΡΙΨΗ':lastKind.includes('impact')?'ΣΥΓΚΡΟΥΣΗ':'ΧΑΟΣ'));scorePending=0;}
  for(let i=sparks.length-1;i>=0;i--){const f=sparks[i];f.life-=dt;f.v.y-=7*dt;f.q.position.addScaledVector(f.v,dt);if(f.life<=0){ship.group.remove(f.q);f.q.geometry.dispose();f.q.material.dispose();sparks.splice(i,1);}}
  for(let i=smoke.length-1;i>=0;i--){const f=smoke[i];f.life-=dt;for(const q of f.sprites){q.position.y+=dt*.09;q.scale.multiplyScalar(1+dt*.12);q.material.opacity=Math.min(.36,f.life*.10);}if(f.life<=0){for(const q of f.sprites){ship.group.remove(q);q.material.dispose();}smoke.splice(i,1);}}
  outline.visible=target?.type==='prop'&&!target.item.broken&&!getState().downed;
  if(outline.visible){outline.setFromObject(target.item.group);outline.parent?.updateWorldMatrix(true,false);outline.matrixAutoUpdate=false;outline.matrix.copy(ship.group.matrixWorld).invert();}
  if(time-lastSave>3){save();lastSave=time;}
 }
 function security(dt){const s=getState(),p=getPlayer();if(s.downed)return;seen=party.some(n=>n.guard&&n.health>0&&Math.abs(n.actor.group.position.y-p.y)<1.4&&n.actor.group.position.distanceTo(p)<17&&lineClear(p,n.actor.group.position)&&!smokeBlocks(p,n.actor.group.position)&&(n.confusedUntil||0)<time);
  const recent=s.time-s.lastHit<4;quiet=seen||recent?0:quiet+dt;s.heat=heatStep(s.heat,dt,{seen,recent,quiet});s.capture=0;
  if(recent&&s.heat>=22&&s.alarmAt===null)s.alarmAt=s.time+8;
  const active=party.filter(n=>n.guard),wanted=guardLimit(s.heat);
  if(s.alarmAt!==null&&s.time>=s.alarmAt&&active.length<wanted){spawnGuard();s.phase='security';root.dataset.phase='security';}
  for(const n of active){if(n.health<=0)continue;const q=n.actor.group.position;
   const canSee=grace<=0&&Math.abs(q.y-p.y)<1.4&&q.distanceTo(p)<17&&lineClear(p,q)&&!smokeBlocks(p,q)&&(n.confusedUntil||0)<time;
   if(canSee&&s.heat>8){n.state='fight';n.lastSeen=p.clone();n.searchUntil=time+8;}
   else if(s.heat<=2){n.state='idle';n.attack=null;n.nav=null;n.goal.copy(n.home);}
   else{n.state='search';n.attack=null;if(!n.lastSeen)n.lastSeen=n.home.clone();n.goal.copy(n.lastSeen);if(time>(n.searchUntil||0)){n.goal.copy(n.home);}}
  }
  if(s.heat<=.1&&s.alarmAt!==null){s.alarmAt=null;s.securityAt=null;s.phase='deck';root.dataset.phase='deck';feedback('ΤΟΥΣ ΞΕΦΥΓΕΣ · ΤΟ ΧΑΟΣ ΜΕΝΕΙ');}
 }
 function sync(){const s=getState(),v=getVoyage(),p=getPlayer();$('mhScore').textContent=s.chaos.toLocaleString('el-GR');$('mhCombo').textContent=s.time-s.lastHit<4.4&&s.combos?'ΣΥΝΔΥΑΣΜΟΣ ×1.3':'';$('mhLocation').textContent=zoneAt(p);
  for(const [a,value]of [['HP',s.health],['Stamina',s.stamina],['Drunk',v.intox]]){$('mh'+a).textContent=Math.round(value)+(a==='Drunk'?'%':'');$('mh'+a+'Fill').style.width=Math.max(0,Math.min(100,value))+'%';}
  $('mhHeatLabel').textContent=s.heat<1?'ΚΑΝΕΝΑΣ ΣΥΝΑΓΕΡΜΟΣ':seen?'ΣΕ ΒΛΕΠΟΥΝ':quiet>4?'ΧΑΝΟΥΝ ΤΑ ΙΧΝΗ ΣΟΥ':'ΣΕ ΑΝΑΖΗΤΟΥΝ';$('mhHeat').querySelectorAll('i').forEach((e,i)=>e.classList.toggle('on',s.heat>i*25));$('mhEscape').textContent=s.heat>0&&!seen?'Εκτός οπτικού πεδίου · '+Math.floor(quiet)+'″':'';
  const attack=party.find(n=>n.attack&&!n.attack.landed&&n.actor.group.position.distanceTo(p)<3.5);$('mhTelegraph').textContent=attack?'ΕΡΧΕΤΑΙ ΧΤΥΠΗΜΑ · ΜΠΛΟΚ / ΑΠΟΜΑΚΡΥΝΣΟΥ':'';$('mhTilt').disabled=time<tiltReady||!s.foot||s.downed;$('mhTilt').querySelector('small').textContent=time<tiltReady?Math.ceil(tiltReady-time)+'″':'ΚΛΙΣΗ ΠΛΟΙΟΥ';
 }
 function down(){getState().downed=true;$('mhDown').hidden=false;for(const n of party){n.attack=null;if(n.guard)n.state='search';}save();}
 function save(){const s=getState();if(!s.foot&&!s.started)return;best=Math.max(best,Number.isFinite(s.chaos)?s.chaos:0);try{localStorage.setItem(SAVE_KEY,JSON.stringify({version:1,score:s.chaos,hits:s.hits,thrown:s.thrown,broken:world.props.filter(o=>o.broken).map(o=>o.id),position:{x:getPlayer().x,y:getPlayer().y,z:getPlayer().z},drunk:getVoyage().intox,best}));localStorage.setItem(SAVE_KEY+'-best',String(best));}catch{}}
 function restore(){let data;try{data=JSON.parse(localStorage.getItem(SAVE_KEY));}catch{}if(!validSave(data))return false;const s=getState();s.chaos=data.score;s.hits=data.hits||0;s.thrown=data.thrown||0;for(const o of world.props)if(data.broken.includes(o.id)){world.fracture(o);}s.broken=world.props.filter(o=>o.broken).length;getVoyage().intox=Math.max(35,Math.min(90,data.drunk||40));
  const p=data.position;if(p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&Number.isFinite(p.z)&&floorAt(p.x,p.z,p.y)!==null&&Math.abs(floorAt(p.x,p.z,p.y)-p.y)<.5)getPlayer().set(p.x,p.y,p.z);return true;
 }
 function poseProp(o,angle){
  if(!o.mayhemPivot){o.mayhemDims={w:o.w,h:o.h,d:o.d};const q=new T.Group(),children=[...o.group.children];q.position.y=o.h/2;for(const child of children){child.position.y-=o.h/2;q.add(child);}o.group.add(q);o.mayhemPivot=q;}
  const b=o.mayhemDims,si=Math.abs(Math.sin(angle)),co=Math.abs(Math.cos(angle));o.mayhemPivot.rotation.z=angle;o.mayhemPivot.position.y=(si*b.w+co*b.h)/2;o.w=co*b.w+si*b.h;o.h=si*b.w+co*b.h;
 }
 function reset(){spray.next=0;for(const f of smoke){for(const q of f.sprites){ship.group.remove(q);q.material.dispose();}}smoke.length=0;for(const f of sparks){ship.group.remove(f.q);f.q.geometry.dispose();f.q.material.dispose();}sparks.length=0;for(const o of world.props)if(o.mayhemPivot)poseProp(o,0);quiet=0;seen=false;tiltUntil=tiltReady=0;time=0;grace=5;lastSave=0;scorePending=0;$('mhDown').hidden=true;outline.visible=false;$('mhFeed').innerHTML='';}
 return {poseProp,update,security,sync,event,spray,smokeBlocks,tilt,down,save,restore,reset,grace:()=>grace,get extraRoll(){return time<tiltUntil?Math.sin((2-tiltUntil+time)*Math.PI/2)*.035*tiltSign:0;},inspect:()=>({mode:'mayhem',seen,quiet,smoke:smoke.length,best,saveKey:SAVE_KEY,tiltReady:Math.max(0,tiltReady-time)})};
}
