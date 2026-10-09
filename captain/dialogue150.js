import * as THREE from 'three';
// Original fictional dialogue, not borrowed audio or performer imitation.
const LINES={rock:['Βράχια μπροστά! Στρίψε! Στρίψε!','crew'],ice:['Παγόβουνο! Όλοι κρατηθείτε!','crew'],brace:['Κρατηθείτε! Τώρα!','crew'],rail:['Μακριά από τα κάγκελα!','crew'],panic:['Όχι, όχι, όχι! Θα πέσουμε πάνω!','passenger'],jackets:['Φέρτε τα σωσίβια!','passenger'],water:['Βοήθεια! Εδώ! Είμαι εδώ!','passenger'],safe:['Το περάσαμε… Το περάσαμε!','passenger'],rescued:['Τον έχουμε! Είναι ασφαλής!','crew'],captain1:['Εεε… Μια γουλίτσα μόνο.','captain'],captain2:['Καλά πάμε… Εγώ το έχω.','captain'],captain3:['Μισό… γιατί βλέπω δύο παγόβουνα;','captain'],captain4:['Ποιος πάρκαρε νησί μπροστά μας;','captain'],captain5:['Εγώ δεν κουνιέμαι… η καρέκλα φταίει!','captain'],captain6:['Στρίβει; Στρίβει; Ε, στρίβει!','captain'],reply:['Το είδα! Το είδα… περίπου.','captain'],calm:['Παιδιά, κρατηθείτε. Είμαστε μαζί σας.','crew'],hum:['♪ Μμμ… λα, λα λα… ♪','captain']};
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function createDialogue({hud,audio,camera,ship,getPeople,getView}){
 const root=document.createElement('div');root.id='dialogue130';root.setAttribute('aria-live','polite');hud.append(root);
 const bubbles=[],pending=[],recent=new Map(),history=[];const v=new THREE.Vector3(),direction=new THREE.Vector3(),ray=new THREE.Raycaster();
 let lastWarning=-100,lastPanic=-100,lastCaptain=-100,lastDanger=null,nextMumble=24,serial=0;
 function point(speaker){return speaker?speaker.group.localToWorld(new THREE.Vector3(0,speaker.height+.23,0)):ship.group.localToWorld(ship.bridgeCameraPosition.clone());}
 function projectPoint(speaker){return point(speaker).project(camera);}
 function visible(speaker){const p=projectPoint(speaker);return p.z>0&&p.z<1&&Math.abs(p.x)<.92&&p.y<.75&&p.y>-.86;}
 function choose(role,requested){const all=(getPeople()?.getSpeakers()||[]).filter(p=>p.status!=='lost');if(requested!==undefined)return all.find(p=>p.id===requested)||null;const deck=all.filter(p=>['onboard','rescued'].includes(p.status)),candidates=deck.filter(p=>role==='crew'?p.crew:!p.crew),onscreen=candidates.filter(visible),pool=onscreen.length?onscreen:candidates.length?candidates:deck;return pool.length?pool[(serial++)%pool.length]:null;}
 function say(id,s,requested,priority=1){
  const line=LINES[id];if(!line)return false;const [text,role]=line,time=s.time;
  if(time-(recent.get(id)??-100)<(id==='brace'?6:12))return false;
  const speaker=role==='captain'?null:choose(role,requested);if(role!=='captain'&&!speaker)return false;
  recent.set(id,time);if(role==='captain')lastCaptain=time;
  const p=speaker?projectPoint(speaker):{x:0},played=audio.voice(id,{priority,pan:Number.isFinite(p.x)?clamp(p.x,-.6,.6):0}),duration=played||3.5;
  const element=document.createElement('div');element.className='person-bubble';element.dataset.role=role;
  const label=document.createElement('small'),words=document.createElement('span');const name=role==='captain'?'ΚΑΠΕΤΑΝΙΟΣ':speaker.crew?'ΠΛΗΡΩΜΑ '+(speaker.id+1):'ΕΠΙΒΑΤΗΣ '+(speaker.id+1);
  label.textContent=name;words.textContent=text;element.append(label,words);root.append(element);
  bubbles.push({element,label,name,speaker,role,until:time+Math.max(3.4,Math.min(6,duration+.4)),nextOcclusion:0,occluded:false});while(bubbles.length>2)bubbles.shift().element.remove();
  getPeople()?.react(speaker?.id,'warning',Math.min(5,duration));history.push({id,time,person:speaker?.id??'captain',clip:!!played,priority});if(history.length>40)history.shift();project(time);return true;
 }
 function queue(id,time,person,priority=1){pending.push({id,time,person,priority});if(pending.length>5)pending.shift();}
 function drink(s){if(s.time-lastCaptain<8)return;const options=s.intox<30?['captain1']:s.intox<57?['captain2','captain6']:s.intox<82?['captain3','captain5']:['captain4','captain6','hum'];queue(options[(s.drinks-1)%options.length],s.time+.7,undefined,0);nextMumble=s.time+22;}
 function reset(){for(const b of bubbles)b.element.remove();bubbles.length=0;pending.length=0;recent.clear();lastWarning=lastPanic=lastCaptain=-100;lastDanger=null;nextMumble=24;audio.stopVoice();}
 function update(s,dt){
  const danger=s.danger;
  if(danger&&danger.risk>.04){const changed=lastDanger!==danger.id;if((changed||s.time-lastWarning>11)&&s.time-lastWarning>5){say(danger.type==='ice'?'ice':'rock',s,undefined,2);lastWarning=s.time;queue(danger.risk>.65?'panic':'rail',s.time+3.8,undefined,1);if(s.intox>55&&danger.tti>8)queue('reply',s.time+7,undefined,0);}if(danger.tti<3&&s.time-lastPanic>6){say('brace',s,undefined,3);lastPanic=s.time;}lastDanger=danger.id;}
  else if(lastDanger!==null){if(s.time-lastWarning>4)queue('safe',s.time+.5,undefined,1);lastDanger=null;}
  if(s.panic>63&&s.time-lastPanic>15&&!danger){say('jackets',s,undefined,1);lastPanic=s.time;}
  for(let i=pending.length-1;i>=0;i--){const p=pending[i];if(s.time>=p.time){pending.splice(i,1);if(p.priority>0||!danger||danger.tti>6)say(p.id,s,p.person,p.priority);}}
  if(s.intox>75&&s.time>nextMumble&&!danger){say(s.drinks%2?'hum':'captain5',s,undefined,0);nextMumble=s.time+28;}
 }
 function project(time){
  for(let i=bubbles.length-1;i>=0;i--){const b=bubbles[i];if(time>b.until){b.element.remove();bubbles.splice(i,1);continue;}
   const w=hud.clientWidth,h=hud.clientHeight,worldPoint=point(b.speaker),p=v.copy(worldPoint).project(camera),front=p.z>0&&p.z<1,onscreen=front&&Math.abs(p.x)<.94&&Math.abs(p.y)<.9;
   if(b.speaker&&onscreen&&time>b.nextOcclusion){b.nextOcclusion=time+.45;direction.copy(worldPoint).sub(camera.position);const length=direction.length();direction.normalize();ray.set(camera.position,direction);ray.far=Math.max(0,length-.7);b.occluded=ray.intersectObject(ship.exterior,true).length>0;}
   const anchored=b.speaker&&onscreen&&!b.occluded;b.element.classList.toggle('offscreen',!anchored);b.element.dataset.person=b.speaker?.id??'captain';b.element.dataset.anchored=String(!!anchored);b.label.textContent=b.name+(b.speaker&&!anchored?' · ΕΚΤΟΣ ΚΑΔΡΟΥ':'');
   if(anchored){const px=(p.x*.5+.5)*w,py=(-p.y*.5+.5)*h,x=clamp(px,105,w-105),y=clamp(py-10,85,h-75);b.element.style.left=x+'px';b.element.style.top=y+'px';b.element.style.setProperty('--tip',clamp(50+(px-x)/1.8,8,92)+'%');}
   else{b.element.style.left=w*.5+'px';b.element.style.top=(h*.5-i*78)+'px';}
  }
 }
 return {say,drink,reset,update,project,impact:s=>say('brace',s,undefined,3),overboard:(s,id)=>say('water',s,id,3),calm:s=>say('calm',s,undefined,2),rescued:s=>say('rescued',s,undefined,2),inspect:()=>({bubbles:bubbles.length,pending:pending.length,history:history.slice(-8)})};
}
