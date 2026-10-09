import * as THREE from 'three';
// Original situational dialogue. Browser TTS is opt-in, never passed off as acting.
export function createReactions({hud,people,ship,audio,narration}) {
  const bubbles=[],queue=[];let nextWarning=0,lastDrink=-30,nextAmbient=18,lastThreat=null,lastTier=-1,serial=0;
  const projected=new THREE.Vector3(),pos=new THREE.Vector3();
  const banter=[
    ['Ωραία. Το ποτήρι το βρήκα. Το λιμάνι πού είναι;','Μισό ποτηράκι ήταν. Το άλλο μισό το πήρε το κύμα.'],
    ['Ήρεμα! Το έχω… κάπου το έχω.','Το πλοίο πάει ίσια. Εγώ απλώς κάθομαι λοξά.'],
    ['Μη φωνάζετε όλοι μαζί! Μπερδεύεται το τιμόνι.','Εκείνο το βουνό ήταν εδώ πριν πιούμε;'],
    ['Εγώ; Μεθυσμένος; Το κατάστρωμα παραπατάει!','♪ Λίγο κύμα, λίγο πάγο… πού το πήγα το καράβο; ♪'],
    ['Παιδιά… ποιο από τα δύο λιμάνια είναι το δικό μας;','♪ Πάμε πρίμα, πάμε πλώρη… αχ, μου έφυγε η πορεία! ♪']
  ];
  function clear(){for(const b of bubbles)b.el.remove();bubbles.length=0;queue.length=0;nextWarning=0;lastDrink=-30;nextAmbient=18;lastThreat=null;lastTier=-1;}
  function add(text,{captain=false,urgent=false,time=0,id=null}={}){
    const el=document.createElement('div');el.className='lc-dialogue';
    const title=document.createElement('b'),body=document.createElement('span');el.append(title,body);body.textContent=text;hud.append(el);
    bubbles.push({el,title,text,captain,urgent,id,until:time+(urgent?4.5:4),spoken:false});
    while(bubbles.length>2)bubbles.shift().el.remove();
    // Actual singing is not approximated by reading lyrics in a robotic voice.
    if(narration()&&!text.includes('♪'))audio?.speak(text,urgent);
  }
  function drink(s){
    const tier=Math.min(4,Math.floor(s.intox/22));
    if(s.time-lastDrink<14||tier===lastTier&&s.drinks%3!==0)return;
    const line=banter[tier][s.drinks%2];queue.push({at:s.time+1.3,text:line,captain:true});lastDrink=s.time;lastTier=tier;
  }
  function event(e,s){
    if(e.type==='collision'){queue.length=0;add('Κρατηθείτε! Χτυπήσαμε!',{urgent:true,time:s.time});nextWarning=s.time+6;}
    if(e.type==='jump'){add('Σωσίβιο! Εδώ κάτω!',{urgent:true,time:s.time,id:e.id});}
  }
  function update(s,dt,camera,mode){
    const threat=s.nearest,ttc=threat?.ttc??Infinity;
    if(threat&&ttc<24&&s.time>=nextWarning){
      const same=lastThreat===threat.id;
      const text=ttc<7?'Θα χτυπήσουμε! Όλοι κρατηθείτε!':threat.type==='ice'?'Πάγος μπροστά! Το βλέπετε;':'Βράχια! Γέφυρα, στρίψε!';
      add(text,{urgent:true,time:s.time});queue.push({at:s.time+1.5,text:ttc<7?'Πιάσε το χέρι μου!':'Το είδα! Φωνάξτε τους άλλους!',urgent:true});
      if(s.intox>48&&!same)queue.push({at:s.time+3.4,text:ttc<7?'Το βλέπω! Απλώς το βλέπω… διπλό.':'Εντάξει, το είδα. Γιατί έρχεται προς εμάς;',captain:true});
      people.alert?.(s.time,threat);lastThreat=threat.id;nextWarning=s.time+(ttc<7?7:12);
    }
    if(!threat&&s.panic>65&&s.time>nextAmbient){add('Κρατήσου από μέσα! Μακριά από τα κάγκελα!',{time:s.time,urgent:true});nextAmbient=s.time+16;}
    for(let i=queue.length-1;i>=0;i--){if(s.time>=queue[i].at){const q=queue.splice(i,1)[0];add(q.text,{...q,time:s.time});}}
    const speakers=bubbles.length?(people.getSpeakers?.()||[]):[],w=innerWidth,h=innerHeight;
    for(let i=bubbles.length-1;i>=0;i--){const b=bubbles[i];if(s.time>b.until){b.el.remove();bubbles.splice(i,1);continue;}
      let anchored=false;
      if(!b.captain&&mode!==1){
        let speaker=speakers.find(p=>p.id===b.id),best=-Infinity;
        if(!speaker){for(const p of speakers){projected.copy(p.position).project(camera);const score=-Math.abs(projected.x)*2-Math.abs(projected.y)*.4;
          if(projected.z>0&&projected.z<1&&Math.abs(projected.x)<.85&&projected.y>-.60&&projected.y<.50&&score>best&&!bubbles.some(o=>o!==b&&o.id===p.id)){best=score;speaker=p;}}
          if(speaker)b.id=speaker.id;
        }
        if(speaker){projected.copy(speaker.position).project(camera);
          if(projected.z>0&&projected.z<1&&Math.abs(projected.x)<.93&&Math.abs(projected.y)<.8){
            b.el.style.left=(projected.x*.5+.5)*w+'px';b.el.style.top=(-projected.y*.5+.5)*h-8+'px';anchored=true;
            b.title.textContent=speaker.crew?'ΠΛΗΡΩΜΑ':`ΕΠΙΒΑΤΗΣ ${speaker.id+1}`;
          }
        }
      }
      if(b.captain&&mode!==1){pos.set(0,23.2,44);ship.group.localToWorld(pos);projected.copy(pos).project(camera);
        if(projected.z>0&&projected.z<1&&Math.abs(projected.x)<.85&&Math.abs(projected.y)<.7){b.el.style.left=(projected.x*.5+.5)*w+'px';b.el.style.top=(-projected.y*.5+.5)*h+'px';anchored=true;}}
      if(!anchored){b.el.style.left='50%';b.el.style.top=(mode===1?h*.49:h*.54)-i*58+'px';b.title.textContent=b.captain?'ΚΑΠΕΤΑΝΙΟΣ · ΕΣΥ':'ΑΠΟ ΤΟ ΚΑΤΑΣΤΡΩΜΑ';}
      else if(b.captain)b.title.textContent='ΚΑΠΕΤΑΝΙΟΣ · ΓΕΦΥΡΑ';
      b.el.classList.toggle('lc-offscreen',!anchored);b.el.classList.toggle('lc-captain',b.captain);
    }
  }
  return {drink,event,update,clear,say:(text,s,options={})=>add(text,{...options,time:s.time}),get debug(){return bubbles.map(b=>({text:b.text,id:b.id,captain:b.captain,anchored:!b.el.classList.contains('lc-offscreen')}));}};
}
