/** Integration for exploration, living water, natural abilities and recoverable finds. */
import {CREEK_ABILITIES,normalizeCreekState,creekRegion,creekPhase,abilityStatus,unlockCreekAbilities,recordCreekMetric,remainingDropFood,dropCreekInventory,recoverCreekDrop,collectCreekFind,creekModifiers} from './creek-state.js';

const distance=(a,b)=>Math.hypot((a?.x||0)-(b?.x||0),(a?.z||0)-(b?.z||0));
const finite=(v,fallback=0)=>Number.isFinite(v)?v:fallback;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,finite(v,a)));
const living=f=>f&&!f.dead&&finite(f.hp,1)>0;
const fallbackLandmarks=[
  {id:'pond',label:'Η λιμνούλα με τα νούφαρα',description:'Πλωτά φύλλα και έντομα γύρω από το ρηχό νερό.',hint:'Τα έντομα κινούνται ανάμεσα στα πλατιά φύλλα.',x:0,z:0,radius:9},
  {id:'creek',label:'Το στενό ρυάκι',description:'Το ρεύμα ενώνει τη λιμνούλα με βαθύτερα νερά.',hint:'Ακολούθησε τον ήχο του τρεχούμενου νερού.',x:8,z:-24,radius:8},
  {id:'bank',label:'Η εκτεθειμένη όχθη',description:'Πέτρες, φυτά και σημεία παρατήρησης πάνω από το νερό.',hint:'Ψάξε πού συγκεντρώνονται τα έντομα πάνω από τις πέτρες.',x:27,z:8,radius:9},
  {id:'roots',label:'Το πέρασμα στις ρίζες',description:'Μια κρυφή διαδρομή που αλλάζει με τη στάθμη του νερού.',hint:'Παρατήρησε πού χάνονται τα μικρά ζώα ανάμεσα στις ρίζες.',x:24,z:-16,radius:5}
];
const findNames={pond:'Στίγματα πάνω σε ένα κέλυφος',creek:'Λείο βότσαλο του ρεύματος',bank:'Φτερό από την όχθη',roots:'Σπάνιο κέλυφος στις ρίζες'};
const roleTraits={scout:'Περίεργος · παρατηρεί τα περάσματα',hunter:'Υπομονετικός · βρίσκει τροφή',bruiser:'Τολμηρός · προστατεύει την ομάδα',caller:'Προσεκτικός · προειδοποιεί για κινδύνους'};
function notice(game,id,label,detail,icon='scout',tone='info'){
  game.ui?.toast?.({id,icon,label,detail,tone});
}
function activeRegion(game){return Math.max(0,Math.floor(finite(game.realms?.active)));}
function markUnlocks(game){
  for(const ability of unlockCreekAbilities(game.creek)){
    notice(game,`creek-ability-${ability.id}`,ability.label,`${ability.description} · ${ability.controls}`,ability.icon,'success');
    game.audio?.play?.('level');game._creekSavePending=true;
  }
}

export const creekMethods={
  initCreek(save=null){
    if(!this.creekMode)return;
    this.creek=normalizeCreekState(save?.creek,{elapsed:save?.elapsed||0,realmIndex:activeRegion(this)});
    const region=creekRegion(this.creek,activeRegion(this));region.visits++;
    this.creek.metrics.fliesCaught=Math.max(this.creek.metrics.fliesCaught,finite(this.stats?.flies));
    this.creek.metrics.companionsMax=Math.max(this.creek.metrics.companionsMax,this.allies?.().length||0);
    this._creekLastPosition={x:this.player.x,z:this.player.z};this._creekLastGrounded=this.player.grounded;
    this._creekLastFlies=finite(this.stats?.flies);this._creekWorldTimer=0;this._creekSavePending=false;
    this._creekDeathRecorded=!!save?.pendingRespawn;this._creekSaveAt=this.elapsed+8;
    this.creekPhaseState=creekPhase(this.creek.clock,activeRegion(this));
    this.world?.setCreekState?.(this.creekSnapshot());
  },
  creekSave(){return this.creekMode&&this.creek?normalizeCreekState(this.creek,{realmIndex:activeRegion(this)}):undefined;},
  creekLandmarks(){
    const source=this.world?.creekLandmarks;
    return (Array.isArray(source)&&source.length?source:fallbackLandmarks).map(row=>({...fallbackLandmarks.find(p=>p.id===row.id),...row}));
  },
  creekFinds(){
    if(!this.creekMode||!this.creek)return [];
    const index=activeRegion(this),region=creekRegion(this.creek,index);
    return this.creekLandmarks().map(place=>{
      const find={id:`creek-find-${index}-${place.id}`,landmark:place.id,label:findNames[place.id]||'Φυσικό εύρημα',kind:place.id==='roots'?'keepsakes':'finds',
        x:place.findPoint?.x??place.x,z:place.findPoint?.z??place.z};
      return {...find,collected:region.collectedIds.includes(find.id),visible:region.discovered.includes(place.id)};
    });
  },
  creekCoverAt(actor=this.player){
    if(!this.creekMode||!actor)return false;
    if(typeof this.world?.isCreekCover==='function')return !!this.world.isCreekCover(actor.x,actor.z);
    return this.creekLandmarks().some(l=>['bank','roots'].includes(l.id)&&distance(l,actor)<(l.radius||6));
  },
  creekNestState(){
    if(!this.creekMode||!this.creek)return null;
    const nest=this.world?.creekNest||{x:17,z:16},state=creekRegion(this.creek,activeRegion(this)).nest;
    const threats=[...(this.predators||[]).filter(p=>living(p)&&!['dead','dormant','flee'].includes(p.phase)),
      ...(this.frogs||[]).filter(f=>living(f)&&!f.surrendered&&String(f.team).startsWith('enemy')&&(typeof this.hostile!=='function'||this.hostile(this.player,f)))];
    const safe=!threats.some(f=>distance(f,nest)<(f.team==='predator'?22:15));
    return {...nest,level:state.level,safe,visited:state.visited,label:state.level>=3?'Ζωντανό καταφύγιο':state.level===2?'Φωλιά συντρόφων':state.level===1?'Ήσυχη φωλιά':'Φυσικό καταφύγιο',
      hint:safe?'Ένα μικρό ασφαλές σημείο για ανάπαυση.':'Κάτι κινείται κοντά στη φωλιά.',progress:Math.min(1,state.safeSeconds/240)};
  },
  creekSnapshot(){
    if(!this.creekMode||!this.creek)return null;
    const region=creekRegion(this.creek,activeRegion(this)),phase=creekPhase(this.creek.clock,activeRegion(this));
    const discoveries=this.creekLandmarks().map(place=>{
      const found=region.discovered.includes(place.id);
      return {...place,found,label:found?place.label:'Άγνωστο σημείο',description:found?place.description:place.hint};
    });
    const dropped=region.drops.map(d=>({id:d.id,x:d.x,z:d.z,food:remainingDropFood(d,this.creek.clock),findsCount:d.finds.length,keepsakesCount:d.keepsakes.length}));
    return {enabled:true,phase,discoveryCount:region.discovered.length,totalLandmarks:discoveries.length,discoveries,
      abilities:CREEK_ABILITIES.map(a=>abilityStatus(this.creek,a)),
      inventory:{food:Math.floor(finite(this.resources?.food)),finds:this.creek.inventory.finds.length,keepsakes:this.creek.inventory.keepsakes.length,
        findItems:this.creek.inventory.finds.map(x=>({...x})),keepsakeItems:this.creek.inventory.keepsakes.map(x=>({...x}))},
      nest:this.creekNestState(),dropped,finds:this.creekFinds(),concealed:!!this.player?.creekConcealed};
  },
  creekAbilityModifiers(){return creekModifiers(this.creekMode?this.creek:null);},
  recordCreekAction(kind,amount=1){
    if(!this.creekMode||!this.creek||this.player?.dead)return false;
    const key={chargedLeap:'chargedLeaps',croak:'croaks',command:'commands',bankLanding:'bankLandings'}[kind]||kind;
    if(!recordCreekMetric(this.creek,key,amount))return false;markUnlocks(this);return true;
  },
  updateCreek(dt){
    if(!this.creekMode||!this.creek||!this.started||this.paused||this.ended)return;
    const step=clamp(dt,0,1),p=this.player,region=creekRegion(this.creek,activeRegion(this));if(!step)return;
    this.creek.clock+=step;this.creekPhaseState=creekPhase(this.creek.clock,activeRegion(this));
    if(living(p)){
      const moved=this._creekLastPosition?Math.min(4,distance(p,this._creekLastPosition)):0;
      recordCreekMetric(this.creek,'distance',moved);this._creekLastPosition={x:p.x,z:p.z};
      if(p.swimming&&(p.speed>.15||moved>.02))recordCreekMetric(this.creek,'swimSeconds',step);
      const flies=finite(this.stats?.flies);if(flies>this._creekLastFlies)recordCreekMetric(this.creek,'fliesCaught',flies-this._creekLastFlies);this._creekLastFlies=flies;
      this.creek.metrics.companionsMax=Math.max(this.creek.metrics.companionsMax,this.allies?.().length||0);
      const places=this.creekLandmarks(),bank=places.find(l=>l.id==='bank');
      if(p.grounded&&!this._creekLastGrounded&&bank&&distance(bank,p)<(bank.radius||9))recordCreekMetric(this.creek,'bankLandings',1);
      this._creekLastGrounded=p.grounded;
      const observed=(this.predators||[]).some(f=>living(f)&&f.phase!=='dormant'&&distance(f,p)<32&&distance(f,p)>5);
      const covered=this.creekCoverAt(p),still=finite(p.speed)<.6&&moved<step*.9;
      if(observed&&covered&&still&&!p.grabbedBy&&!(p.attackCD>0))recordCreekMetric(this.creek,'observeSeconds',step);
      p.creekConcealed=this.creek.unlocked.includes('hide')&&covered&&still&&!!p.blocking&&!p.grabbedBy;
      for(const place of places){
        if(region.discovered.includes(place.id)||distance(p,place)>(place.radius||7))continue;
        region.discovered.push(place.id);this._creekSavePending=true;
        notice(this,`creek-discovery-${activeRegion(this)}-${place.id}`,place.label,place.description,'scout','success');
        this.gainXP?.(12);this.audio?.play?.('discover');
      }
      markUnlocks(this);
    }else p.creekConcealed=false;
    const nest=this.creekNestState(),nearNest=nest&&living(p)&&distance(p,nest)<8;
    if(nearNest&&!region.nest.visited){region.nest.visited=true;this._creekSavePending=true;}
    // Local wildlife develops a discovered safe refuge while the player explores.
    // Returning is useful for rest, but remaining here is never a growth task.
    if(nest?.safe&&region.nest.visited){
      region.nest.safeSeconds+=step;
      const level=region.nest.safeSeconds>=240?3:region.nest.safeSeconds>=90?2:region.nest.safeSeconds>=20?1:0;
      if(level>region.nest.level){region.nest.level=level;this._creekSavePending=true;notice(this,`creek-nest-${activeRegion(this)}-${level}`,'Η φωλιά ζωντανεύει','Η ησυχία προσελκύει μικρά ζώα. Οι όχθες έξω παραμένουν άγριες.','leaf','success');}
      if(nearNest&&p.speed<.8&&!p.grabbedBy)p.hp=Math.min(p.maxHp,p.hp+step*.9);
    }
    const phase=this.creekPhaseState;
    if(region.lastPhase!==phase.stamp){
      if(region.lastPhase!==null)notice(this,`creek-phase-${activeRegion(this)}-${phase.stamp}`,phase.label,phase.hint,'swim');
      region.lastPhase=phase.stamp;this._creekSavePending=true;
    }
    this._creekWorldTimer-=step;
    if(this._creekWorldTimer<=0){this._creekWorldTimer=.5;this.world?.setCreekState?.(this.creekSnapshot());}
    if(this._creekSavePending&&this.elapsed>=this._creekSaveAt){this._creekSavePending=false;this._creekSaveAt=this.elapsed+8;this.save?.();}
  },
  onCreekPlayerDefeat(){
    if(!this.creekMode||!this.creek||this._creekDeathRecorded)return null;
    this._creekDeathRecorded=true;
    const drop=dropCreekInventory(this.creek,activeRegion(this),this.player,finite(this.resources?.food));
    if(drop)this.resources.food=0;
    this.world?.setCreekState?.(this.creekSnapshot());
    if(drop)notice(this,`creek-dropped-${drop.id}`,'Τα ευρήματά σου έμειναν πίσω','Μπορείς να επιστρέψεις για να τα ανακτήσεις. Άλλα ζώα μπορεί να φάνε την τροφή.','forage','warning');
    return drop;
  },
  onCreekRespawn(){
    if(!this.creekMode||!this.creek)return;
    this._creekDeathRecorded=false;this._creekLastPosition={x:this.player.x,z:this.player.z};this._creekLastGrounded=this.player.grounded;
    this.player.creekConcealed=false;
  },
  creekInteractionContext(){
    if(!this.creekMode||!this.creek||!living(this.player))return null;
    const region=creekRegion(this.creek,activeRegion(this)),p=this.player;
    const drop=region.drops.filter(d=>distance(d,p)<=3.5).sort((a,b)=>distance(a,p)-distance(b,p))[0];
    if(drop)return {type:'creek-recover',entity:drop,available:true,actionLabel:'Ανάκτηση',actionIcon:'forage',hint:'E · Ανάκτησε την τροφή και τα ευρήματα που έμειναν εδώ',reason:'Τα σημαντικά ευρήματα παραμένουν ασφαλή'};
    const find=this.creekFinds().filter(f=>f.visible&&!f.collected&&distance(f,p)<=2.8).sort((a,b)=>distance(a,p)-distance(b,p))[0];
    if(find)return {type:'creek-find',entity:find,available:true,actionLabel:'Εύρημα',actionIcon:find.kind==='keepsakes'?'pearl':'scout',hint:`E · ${find.label}`,reason:'Αυτόματη ταξινόμηση στις ανακαλύψεις'};
    const nest=this.creekNestState();
    if(nest&&distance(p,nest)<5)return {type:'creek-nest',entity:nest,available:nest.safe,actionLabel:'Ανάπαυση',actionIcon:'leaf',reason:nest.hint,hint:nest.safe?'Η φωλιά σε ξεκουράζει όσο μένεις εδώ · E για τα ευρήματά σου':'Παρατήρησε την κίνηση γύρω από τη φωλιά πριν ξεκουραστείς'};
    return null;
  },
  creekInteract(ctx=this.creekInteractionContext()){
    if(!this.creekMode||!this.creek||!ctx||!['creek-find','creek-recover','creek-nest'].includes(ctx.type))return false;
    if(!living(this.player)||this.paused||!this.started||this.ended)return true;
    // Always resolve the live nearby target again; stale UI cannot collect from afar.
    const current=this.creekInteractionContext();if(!current||current.type!==ctx.type||current.entity?.id!==ctx.entity?.id)return true;
    if(ctx.type==='creek-find'){
      if(collectCreekFind(this.creek,activeRegion(this),current.entity)){
        notice(this,current.entity.id,current.entity.label,current.entity.kind==='keepsakes'?'Φυσικό ενθύμιο · ταξινομήθηκε αυτόματα':'Εύρημα · ταξινομήθηκε αυτόματα','scout','success');this.gainXP?.(8);this.audio?.play?.('eat');
      }
    }else if(ctx.type==='creek-recover'){
      const recovered=recoverCreekDrop(this.creek,activeRegion(this),current.entity.id);
      if(recovered){this.resources.food=finite(this.resources.food)+recovered.food;notice(this,`recovered-${current.entity.id}`,'Ανάκτηση ευρημάτων',`${recovered.food} τροφή · ${recovered.finds} ευρήματα · ${recovered.keepsakes} ενθύμια`,'forage','success');}
    }else {if(current.available)this.openPanel?.('exploration');else notice(this,'nest-threat','Κίνηση κοντά στη φωλιά',current.reason,'scout','warning');return true;}
    this.world?.setCreekState?.(this.creekSnapshot());this.save?.();return true;
  },
  handleCreekAction(action,payload={}){
    if(!this.creekMode||!this.creek)return false;
    if(action==='open-exploration'){this.openPanel?.('exploration');return true;}
    if(action==='creek-recover'||action==='creek-find'||action==='creek-nest'){const ctx=this.creekInteractionContext();if(ctx?.type===action&&(!payload.id||payload.id===ctx.entity?.id))this.creekInteract(ctx);return true;}
    return false;
  },
  creekObjective(){
    if(!this.creekMode||!this.creek)return '';
    const p=this.player,region=creekRegion(this.creek,activeRegion(this)),near=this.creekInteractionContext();
    if(near?.type==='creek-recover')return 'Τα ευρήματά σου βρίσκονται εδώ. Πάτησε E για να τα ανακτήσεις.';
    if(p.stomach<18)return 'Τα έντομα δείχνουν πού υπάρχει τροφή. Πιάσε μύγες με τη γλώσσα πριν συνεχίσεις.';
    const unseen=this.creekLandmarks().filter(l=>!region.discovered.includes(l.id)).sort((a,b)=>distance(a,p)-distance(b,p))[0];
    if(unseen)return unseen.hint;
    return creekPhase(this.creek.clock,activeRegion(this)).hint;
  },
  creekObjectives(){
    if(!this.creekMode||!this.creek)return [];
    const region=creekRegion(this.creek,activeRegion(this)),places=this.creekLandmarks();
    return [...places.map(l=>({id:`explore-${l.id}`,title:region.discovered.includes(l.id)?l.label:'Ακολούθησε τα σημάδια',hint:l.hint,icon:'scout',current:region.discovered.includes(l.id)?1:0,target:1,done:region.discovered.includes(l.id),optional:true})),
      {id:'living-creek',title:'Το ρυάκι συνεχίζει να αλλάζει',hint:creekPhase(this.creek.clock,activeRegion(this)).hint,icon:'swim',current:0,target:1,done:false,optional:true}];
  },
  creekRecruitmentOffer(frog,camp=null){
    const unavailable={eligible:false,guaranteed:false,cost:{food:0},requirements:[],ready:false,instant:false,reason:'Μη διαθέσιμος'};
    if(!this.creekMode||!this.creek||!living(frog)||['player','ally'].includes(frog.team))return unavailable;
    if(frog.surrendered||camp?.destroyed)return {eligible:true,guaranteed:true,cost:{food:0},requirements:[],ready:true,instant:true,reason:'Μπορεί να ακολουθήσει την ομάδα'};
    const neutral=frog.team==='neutral',first=!!frog.firstRecruit,metrics=this.creek.metrics,discovered=new Set(Object.values(this.creek.regions).flatMap(r=>r.discovered));
    const cost={food:neutral?(first?4:{scout:6,hunter:5,bruiser:8,caller:6}[frog.role]||6):6};
    const requirements=[{id:'food',label:'Τροφή για το κοινό ταξίδι',current:Math.floor(finite(this.resources?.food)),target:cost.food,done:finite(this.resources?.food)>=cost.food}];
    if(neutral){
      const terms=first?{id:'encounter',label:'Γνώρισε τη λιμνούλα',current:discovered.has('pond')?1:0,target:1}:
        frog.role==='scout'?{id:'explore',label:'Ανακάλυψε δύο διαφορετικά μέρη',current:discovered.size,target:2}:
        frog.role==='hunter'?{id:'hunt',label:'Πιάσε τρεις μύγες με τη γλώσσα',current:metrics.fliesCaught,target:3}:
        frog.role==='bruiser'?{id:'leap',label:'Δείξε τρία φορτισμένα άλματα',current:metrics.chargedLeaps,target:3}:
        {id:'observe',label:'Παρατήρησε έναν θηρευτή από την κάλυψη',current:metrics.observeSeconds,target:4};
      requirements.push({...terms,done:terms.current>=terms.target});
    }
    const ready=requirements.every(r=>r.done),pending=requirements.find(r=>!r.done);
    return {eligible:true,guaranteed:neutral,cost,requirements,ready,instant:false,reason:pending?.label||`${cost.food} τροφή · έτοιμος να ακολουθήσει`,personality:roleTraits[frog.role]||roleTraits.scout};
  },
  creekCompanionIntent(frog){
    if(!this.creekMode||!this.creek||!living(frog)||frog.team!=='ally'||frog.grabbedBy||frog.surrendered)return null;
    frog.creekTrait=roleTraits[frog.role]||roleTraits.scout;
    const p=this.player,explicit=['attack','flank','guard','scout','distract','protect','retreat'].includes(frog.order)||frog.guard;
    const closeThreats=(this.predators||[]).filter(t=>living(t)&&!['dead','dormant','flee'].includes(t.phase)&&distance(t,frog)<10);
    if(closeThreats.length&&frog.hp<frog.maxHp*.24&&!explicit){
      const danger=closeThreats.sort((a,b)=>distance(a,frog)-distance(b,frog))[0],dx=frog.x-danger.x,dz=frog.z-danger.z,len=Math.max(.1,Math.hypot(dx,dz));
      return {kind:'move',formation:true,target:{x:p.x+dx/len*3,z:p.z+dz/len*3},retreat:true};
    }
    if(explicit||closeThreats.length||distance(frog,p)>12)return null;
    if(frog.stomach<72||frog.hp<frog.maxHp*.85){
      const food=(this.world.hotspots||[]).filter(h=>h.flies>=1&&distance(h,frog)<8&&distance(h,p)<10).sort((a,b)=>distance(a,frog)-distance(b,frog))[0];
      if(food)return {kind:'eat',target:food};
    }
    return null;
  }
};
