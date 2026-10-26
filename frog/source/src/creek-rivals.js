/** Natural territories, local tactics and continuing wildlife.
 * Success changes a place permanently; migration follows simulation time and
 * habitat changes, never the player's level or the moment an enemy is beaten.
 */
import {COLORS,PREDATORS,clamp,eat} from './rules.js';
import {WORLD_BOUNDARY} from './world-config.js';
import {RECRUIT_RANGE,RECRUIT_PREVIEW_RANGE,passiveRecruitTarget} from './squad-rules.js';
import {orderFlank} from './tactics.js';
import {dayState} from './rules.js';
import {normalizeCreekSociety} from './creek-society-state.js';
import {clearRefugePosition} from './refuge.js';

const distance=(a,b)=>Math.hypot((a?.x||0)-(b?.x||0),(a?.z||0)-(b?.z||0));
const living=f=>f&&!f.dead&&f.hp>0;
const friendly=f=>f&&(f.team==='player'||f.team==='ally');
const names=['Οι Ριζοφύλακες','Οι Βάτραχοι των Βότσαλων','Οι Σκιές των Καλαμιών','Οι Χάλκινες Όχθες','Οι Νυχτοβάτες'];
const roles=['scout','hunter','bruiser','caller'];
const bounded=p=>({x:clamp(p.x,-WORLD_BOUNDARY+5,WORLD_BOUNDARY-5),z:clamp(p.z,-WORLD_BOUNDARY+5,WORLD_BOUNDARY-5)});
const safeNumber=(v,fallback=0)=>Number.isFinite(v)?v:fallback;

export {normalizeCreekSociety} from './creek-society-state.js';

export function creekFriendlyTerritory(c){
  return !!c&&!c.destroyed&&(c.team==='ally'||['coexist','yielded','respect'].includes(c.creekRelation));
}

export function creekHostility(game,a,b){
  if(!a||!b||a===b||a.dead||b.dead||a.team==='neutral'||b.team==='neutral'||a.team!=='player'&&a.surrendered||b.team!=='player'&&b.surrendered)return false;
  if(friendly(a)&&friendly(b))return false;
  const enemy=friendly(a)?b:friendly(b)?a:null;
  if(enemy&&game.camps?.some(c=>c.id===enemy.home&&creekFriendlyTerritory(c)))return false;
  return (a.team==='player'?'ally':a.team)!==(b.team==='player'?'ally':b.team);
}

export const creekRivalMethods={
  seedCreekPopulation(save){
    const sites=(this.world.creekTerritories?.length?this.world.creekTerritories:this.world.campSites.filter(s=>s.team==='enemy')).slice(0,3);
    sites.forEach((site,i)=>{
      const c=this.addCamp({id:site.id||'creek-territory-'+i,x:site.x,z:site.z,yaw:site.yaw||0,name:names[i],team:'enemy'+i,
        originalEnemy:true,originalTeam:'enemy'+i,rivalIndex:i,natural:true,creekRelation:'hostile',creekApproach:['share','respect','coexist'][i],
        tier:1,hp:250,maxHp:250,morale:100,stock:{food:8,reeds:0},buildings:{}});
      for(let j=0;j<4+i*2;j++)this.spawnRival(c,{leader:j===0,guard:true});
    });
    const spawn=this.world.creekSpawn||{x:0,z:0};
    const points=this.world.creekCompanions||[{x:spawn.x+7,z:spawn.z+5},{x:spawn.x-12,z:spawn.z+10},{x:spawn.x+23,z:spawn.z-12},{x:spawn.x-19,z:spawn.z-18}];
    points.forEach((point,i)=>this.spawnFrog({...point,team:'neutral',role:roles[i%roles.length],name:['Νούφαρο','Βρύο','Βότσαλο','Σφύριγμα'][i%4],level:1,firstRecruit:i===0&&(this.realms?.active||0)===0}));
    if(save?.newRealm)for(const f of save.frogs||[])this.spawnFrog(f);
  },

  initCreekSociety(save){
    this.creekSociety=normalizeCreekSociety(save?.creekSociety,this.elapsed);
    for(const c of this.camps){
      c.natural=true;c.gateHp=0;c.underConstruction=false;c.constructionProgress=1;
      c.buildings={};c.specialization=null;c.creekRelation??=c.team==='ally'?'yielded':'hostile';
      c.creekApproach??=['share','respect','coexist'][(c.rivalIndex||0)%3];
      if(c.team==='ally'&&/Κάστρο|Οχυρό/.test(c.name))c.name=c.name.replace(/Κάστρο|Οχυρό/g,'Καταφύγιο');
      this.world.updateShelter?.(c.mesh,creekFriendlyTerritory(c)?{...c,team:'ally'}:c);
    }
    if(!this.creekSociety.initialized){
      const types=['heron','snake','fish'];
      for(const type of types){
        if(this.predators.some(p=>p.type===type))continue;
        const point=this.creekPredatorLocation(type);
        if(point)this.spawnCreekWildlife(type,point,'resident');
      }
      this.creekSociety.initialized=true;
    }
    this.creekSocietyCheckAt=0;this.nextRaid=Infinity;
    for(const f of this.frogs){
      if(f.equipment&&(f.equipment.armor||f.equipment.weapon||f.equipment.crest))f.legacyEquipment??={...f.equipment};
      f.equipment={armor:null,weapon:null,crest:false};f.model?.setEquipment?.(f.equipment);
      f.crowned=false;f.model?.setCrowned?.(false);f.trainingPaid=false;f.trainingCamp=null;
      if(f.order==='training')f.order='follow';
    }
  },

  creekPredatorLocation(type,{migration=false}={}){
    const anchor=this.world.predatorAnchors?.[type]||{x:type==='snake'?-45:45,z:type==='fish'?30:12};
    const candidates=[anchor];
    for(const r of [16,32,48])for(let i=0;i<12;i++){const a=i*Math.PI/6+(this.creekSociety?.sequence||0)*.83;candidates.push(bounded({x:anchor.x+Math.sin(a)*r,z:anchor.z+Math.cos(a)*r}));}
    const nest=this.creekNestState?.(),allies=this.allies();
    return candidates.find(point=>{
      const surface=this.world.getSurface(point.x,point.z);
      const wet=surface.type==='water';
      const clear=clearRefugePosition(this.world.creekRefuges||[],{...point,y:surface.height,team:'predator',type,scale:PREDATORS[type].scale});
      return (type!=='fish'||wet)&&distance(point,this.player)>(migration?52:24)
        &&!allies.some(f=>distance(point,f)<18)
        &&(!nest||distance(point,nest)>18)&&distance(clear,point)<.01;
    })||null;
  },

  spawnCreekWildlife(type,point,role='roam'){
    const state=this.creekSociety,sequence=++state.sequence,base=PREDATORS[type];
    const scale=1+Math.min(.6,(this.realms?.active||0)*.06);
    const p=this.spawnPredator({type,...point,id:'creek-'+(this.realms?.active||0)+'-'+type+'-'+sequence,
      hp:Math.round(base.hp*scale),maxHp:Math.round(base.hp*scale),realmEvent:true,eventRole:role==='resident'?'guardian':'roam',
      eventSequence:sequence,realmIndex:this.realms?.active||0,campaignTracked:false,territoryRadius:30,damage:base.damage,
      grace:this.elapsed+15});
    p.grace=this.elapsed+15;p.respawnAt=Infinity;
    return p;
  },

  updateCreekSociety(dt){
    if(!this.creekSociety)return;
    const phase=this.creekPhaseState||this.creekSnapshot?.().phase||{};
    for(const h of this.world.hotspots||[]){
      const activity=safeNumber(h.regenMultiplier,safeNumber(h.ecology?.activity,1));
      h.flies=Math.min(h.maxFlies,h.flies+dt*(h.rich?.38:.15)*activity*(dayState(this.elapsed).night?.8:1));
    }
    if(this.elapsed<(this.creekSocietyCheckAt||0))return;
    this.creekSocietyCheckAt=this.elapsed+1;
    const state=this.creekSociety;
    if(state.phaseStamp!==phase.stamp){
      const previous=state.phaseStamp;state.phaseStamp=phase.stamp||'';
      if(previous)for(const p of this.predators){
        if(p.dead||!['patrol','dormant'].includes(p.phase))continue;
        const point=this.creekPredatorLocation(p.type,{migration:true});
        if(point)p.anchor={...point}; // Walk there through the existing predator AI.
      }
    }
    if(this.elapsed>=state.nextMigrationAt-30&&!state.warned&&this.predators.filter(living).length<4){
      state.warned=true;
      state.nextMigrationAt=Math.max(state.nextMigrationAt,this.elapsed+30);
      this.ui.toast?.({id:'creek-migration-warning',icon:'eye',label:'Κίνηση πέρα από τις καλαμιές',detail:'Νέα ίχνη στην άκρη του νερού. Παρατήρησε πριν πλησιάσεις.',tone:'info'});
    }
    if(this.elapsed>=state.nextMigrationAt&&!this.player.dead){
      if(this.predators.filter(living).length<4){
        const type=['snake','heron','fish'][state.sequence%3],point=this.creekPredatorLocation(type,{migration:true});
        if(point){this.spawnCreekWildlife(type,point,'roam');state.nextMigrationAt=this.elapsed+420+(state.sequence%3)*60;state.warned=false;}
        else state.nextMigrationAt=this.elapsed+30;
      }else{state.nextMigrationAt=this.elapsed+180;state.warned=false;}
    }
    if(this.elapsed>=state.nextRivalAt){
      // New groups enter unused habitat; an established agreement is never reset.
      const sites=(this.world.campSites||[]).filter(s=>s.team==='enemy'&&!this.camps.some(c=>distance(s,c)<24)&&distance(s,this.player)>60);
      const site=sites[(state.sequence+this.camps.length)%Math.max(1,sites.length)];
      if(site&&this.camps.filter(c=>!c.destroyed&&!creekFriendlyTerritory(c)).length<3){
        const rank=this.camps.filter(c=>c.originalEnemy).length,team='enemy'+rank;
        const c=this.addCamp({...site,id:'creek-arrival-'+rank,team,originalTeam:team,originalEnemy:true,rivalIndex:rank,
          name:names[rank%names.length],natural:true,creekRelation:'hostile',creekApproach:['share','respect','coexist'][rank%3],
          tier:1,hp:250,maxHp:250,buildings:{},stock:{food:8,reeds:0}});
        for(let i=0;i<5;i++)this.spawnRival(c,{leader:i===0,guard:true});
        this.ui.toast?.({icon:'group',label:'Μια ομάδα μετακινήθηκε στο ρυάκι',detail:'Νέα κοάσματα ακούγονται στις εξωτερικές όχθες. Οι υπάρχουσες συμφωνίες σου διατηρούνται.',tone:'info'});
      }
      state.nextRivalAt=this.elapsed+600;
    }
    for(const f of this.frogs){
      if(f.team==='ally'&&f.surrendered&&(f.creekRecoveryAt||Infinity)<=this.elapsed){
        f.surrendered=false;f.morale=45;f.order='retreat';f.guard=false;f.intent=null;f.brain=0;delete f.creekRecoveryAt;
      }
      if(f.team==='ally'&&f.order==='guard'&&!f.home&&f.creekOrderPoint)f.guard=true;
    }
    const corpses=this.frogs.filter(f=>f!==this.player&&f.dead&&(f.deadTime||0)>10);
    if(corpses.length){for(const f of corpses){this.scene?.remove?.(f.model?.group);f.model?.dispose?.();this.selectedIds?.delete(f.id);}this.frogs=this.frogs.filter(f=>!corpses.includes(f));}
  },

  creekTerritoryOffer(c){
    if(!c||c.destroyed)return {allowed:false,reason:'Η ομάδα δεν βρίσκεται εδώ.',cost:{food:0}};
    if(creekFriendlyTerritory(c))return {allowed:false,reason:'Έχεις ασφαλές πέρασμα ανάμεσα σε αυτή την ομάδα.',cost:{food:0}};
    const residents=this.frogs.filter(f=>f.home===c.id&&living(f)&&f.team!=='neutral');
    const leader=residents.find(f=>f.leader),count=this.allies().filter(f=>distance(f,c)<24).length;
    if(!leader||leader.surrendered||leader.hp<leader.maxHp*.3&&leader.morale<25)return {allowed:true,approach:'contest',reason:'Ο αρχηγός υποχωρεί · E για αποδοχή',cost:{food:0}};
    const type=c.creekApproach||'share';
    if(type==='share'){
      const food=8,ready=this.resources.food>=food;
      return {allowed:ready,approach:'share',reason:ready?'Μοιράσου τροφή για συνύπαρξη':'8 τροφή για να μοιραστείτε την όχθη',cost:{food}};
    }
    if(type==='respect'){
      const ready=count>=3||leader.morale<45;
      return {allowed:ready,approach:'respect',reason:ready?'Η ομάδα αναγνωρίζει την παρουσία σου':'Πλησίασε με 3 συντρόφους ή αποδυνάμωσε το θάρρος του αρχηγού με κοάσματα',cost:{food:0}};
    }
    const localThreat=this.predators.find(p=>!p.dead&&distance(p,c)<35);
    const ready=this.stats.predatorsRepelled>0||this.stats.predatorsKilled>0||localThreat?.phase==='flee';
    return {allowed:ready,approach:'coexist',reason:ready?'Ο κοινός κίνδυνος έφερε εμπιστοσύνη':'Απώθησε έναν θηρευτή ή αντιμετώπισε τον αρχηγό',cost:{food:0}};
  },

  resolveCreekTerritory(c,approach='contest'){
    if(!c||creekFriendlyTerritory(c))return false;
    const offer=this.creekTerritoryOffer(c);
    if(!offer.allowed||approach!==offer.approach){this.ui.toast?.(offer.reason,'warning');return false;}
    if(approach==='share'){if(this.resources.food<8)return false;this.resources.food-=8;}
    c.creekRelation=approach==='contest'?'yielded':approach==='respect'?'respect':'coexist';
    c.capturedOnce=true;c.destroyed=false;c.morale=65;c.creekResolvedAt=this.elapsed;
    c.creekVictory=approach;c.hp=Math.max(1,c.hp);this.stats.campsCaptured++;
    if(approach==='contest'){
      c.team='ally';
      for(const f of this.frogs.filter(f=>f.home===c.id&&living(f))){
        f.team='neutral';f.surrendered=false;f.guard=false;f.order='follow';f.morale=45;
        f.intent=null;f.brain=0;f.combatTarget=null;f.recruitment=null;
        f.model?.setOutline?.(COLORS.neutral,true);
      }
    }else for(const f of this.frogs.filter(f=>f.home===c.id)){f.intent=null;f.brain=0;f.combatTarget=null;f.combatUntil=0;}
    for(const f of this.frogs)if(f.orderTarget?.home===c.id||f.orderTarget===c||f.intent?.target?.home===c.id){
      f.order='follow';f.orderTarget=null;f.intent=null;f.brain=0;f.combatTarget=null;
    }
    this.targetCommand=null;this.command='follow';this.creekSociety.agreements++;
    this.gainXP?.(35);this.recordCreekAction?.('territory');this.world.updateShelter?.(c.mesh,{...c,team:'ally'});
    this.ui.toast?.({icon:'group',label:approach==='contest'?'Ο αρχηγός παραχώρησε το πέρασμα':'Συνύπαρξη στην όχθη',
      detail:c.name+' · Η σχέση διατηρείται. Τα υπόλοιπα ζώα συνεχίζουν να χρησιμοποιούν την περιοχή.',tone:'success'});
    this.save?.();return true;
  },

  creekRivalIntent(f){
    if(!f.team?.startsWith('enemy'))return null;
    const home=this.camps.find(c=>c.id===f.home),friendlyArea=creekFriendlyTerritory(home);
    const shelter=this.creekRefugeIntent?.(f,{predatorsOnly:true});if(shelter)return shelter;
    if(f.fear>0&&f.fearFrom){const a=Math.atan2(f.x-f.fearFrom.x,f.z-f.fearFrom.z);return {kind:'move',target:bounded({x:f.x+Math.sin(a)*5,z:f.z+Math.cos(a)*5})};}
    const predator=this.predators.filter(p=>living(p)&&!['patrol','flee','dormant'].includes(p.phase)&&distance(f,p)<14).sort((a,b)=>distance(a,f)-distance(b,f))[0];
    if(predator)return f.hp<f.maxHp*.45?{kind:'move',target:bounded({x:f.x+(f.x-predator.x),z:f.z+(f.z-predator.z)})}:{kind:'attack',target:predator};
    if(f.combatTarget&&living(f.combatTarget)&&this.hostile(f,f.combatTarget)&&(f.combatUntil||0)>this.elapsed&&distance(f,f.combatTarget)<22)return {kind:'attack',target:f.combatTarget};
    if(home&&!friendlyArea){
      const rivals=this.frogs.filter(e=>living(e)&&this.hostile(f,e)&&distance(e,home)<12
        &&(!friendly(e)||this.elapsed>this.graceUntil)&&!(e.creekConcealed&&distance(e,f)>4));
      if(rivals.length)return {kind:'attack',target:rivals.sort((a,b)=>distance(a,f)-distance(b,f))[0]};
    }
    if(f.stomach<68||f.hp<f.maxHp*.9){
      const food=this.world.hotspots.filter(h=>h.flies>=1&&distance(h,home||f)<18).sort((a,b)=>distance(a,f)-distance(b,f))[0];
      if(food)return {kind:'eat',target:food};
    }
    if(home){const angle=this.elapsed*.025+f.seed*2.3;return {kind:'move',target:{x:home.x+Math.sin(angle)*7,z:home.z+Math.cos(angle)*7}};}
    return {kind:'move',target:{x:f.x,z:f.z}};
  },

  creekGroupCommand(command,selection=null){
    const supported=['scout','distract','protect','retreat','guard'];
    if(!supported.includes(command))return null;
    const selected=selection?new Set(selection):null,squad=this.allies().filter(f=>!selected||selected.has(f.id));
    if(!squad.length){this.ui.toast?.('Επίλεξε συντρόφους για αυτή την εντολή.','info');return false;}
    const target=this.aimTarget?.kind==='actor'&&(this.aimTarget.entity.team==='predator'||this.hostile(this.player,this.aimTarget.entity))?this.aimTarget.entity:this.hunt;
    if(command==='distract'&&(!target||target.dead)){this.ui.toast?.('Σημάδεψε ένα πλάσμα για αντιπερισπασμό.','info');return false;}
    const yaw=this.aimYaw??this.cameraYaw??this.player.yaw;
    const point=command==='guard'?{x:this.player.x,z:this.player.z}:bounded({x:this.player.x+Math.sin(yaw)*18,z:this.player.z+Math.cos(yaw)*18});
    squad.forEach((f,i)=>{
      this.rallyAlly?.(f);f.order=command;f.guard=command==='guard';f.home=null;
      f.creekOrderPoint={x:point.x+Math.sin(i*2.4)*2,z:point.z+Math.cos(i*2.4)*2};
      f.creekOrderUntil=this.elapsed+(command==='distract'?12:command==='scout'?25:3600);
      f.creekTargetId=target?.id||null;f.intent=null;f.brain=0;f.combatTarget=null;f.combatUntil=0;f.tacticalPath=[];
    });
    if(!selected)this.command=command;
    const labels={scout:'Ανίχνευση μπροστά',distract:'Αντιπερισπασμός',protect:'Μείνετε κοντά και προστατεύστε',retreat:'Υποχώρηση',guard:'Προσέξτε αυτό το σημείο'};
    this.ui.toast?.({icon:command==='scout'?'eye':command==='distract'?'roar':'group',label:labels[command],value:squad.length,tone:'info'});
    this.audio.play?.('croak');this.updateUI?.(dayState(this.elapsed));this.save?.();return true;
  },

  creekTacticalIntent(f){
    if(f.team!=='ally'||!['scout','distract','protect','retreat','guard'].includes(f.order))return null;
    const p=this.player,point=f.creekOrderPoint||p;
    const threats=[...this.predators.filter(t=>living(t)&&!['patrol','dormant','flee'].includes(t.phase)),...this.frogs.filter(t=>this.hostile(f,t))];
    const danger=threats.filter(t=>distance(t,f)<10).sort((a,b)=>distance(a,f)-distance(b,f))[0];
    if(f.order==='retreat'){
      const shelter=this.creekRefugeIntent?.(f,{force:true});if(shelter)return shelter;
      if(distance(f,p)<4&&!danger)return {kind:'move',formation:true,target:p};
      if(danger){
        const dx=f.x-danger.x,dz=f.z-danger.z,d=Math.max(.1,Math.hypot(dx,dz)),ux=dx/d,uz=dz/d;
        f.creekRetreatSide??=(f.seed||0)%2?1:-1;
        return {kind:'move',formation:true,target:bounded({x:f.x+ux*5-uz*7*f.creekRetreatSide,z:f.z+uz*5+ux*7*f.creekRetreatSide})};
      }
      return {kind:'move',formation:true,target:{x:p.x,z:p.z}};
    }
    if(f.order==='protect'){
      const target=threats.find(t=>distance(t,p)<7);
      if(target)return {kind:'attack',target,support:true};
      return {kind:'move',formation:true,target:{x:p.x+Math.sin(f.seed)*2.7,z:p.z+Math.cos(f.seed)*2.7}};
    }
    if(f.order==='distract'){
      const target=[...this.predators,...this.frogs].find(t=>t.id===f.creekTargetId&&living(t));
      if(!target||this.elapsed>f.creekOrderUntil||f.hp<f.maxHp*.4){f.order='retreat';return this.creekTacticalIntent(f);}
      const d=distance(target,f);
      if(d<14&&f.roarCD<=0){
        f.roarCD=8;f.roarAnim=1.25;this.audio.play?.('croak');
        if(target.team==='predator'){target.target=f;target.targetId=f.id;target.phase='stalk';target.phaseTime=0;target.grace=0;}
        else{target.combatTarget=f;target.combatUntil=this.elapsed+12;target.brain=0;}
      }
      if(d<9)return {kind:'move',support:true,target:bounded({x:f.x+(f.x-target.x)*1.5,z:f.z+(f.z-target.z)*1.5})};
      return {kind:'move',target:{x:target.x+(f.x-target.x)/Math.max(1,d)*10,z:target.z+(f.z-target.z)/Math.max(1,d)*10}};
    }
    if(f.order==='scout'){
      if(danger){if(this.elapsed>(f.creekWarningAt||0)){f.creekWarningAt=this.elapsed+12;this.ui.toast?.({icon:'eye',label:f.name+' εντόπισε κίνδυνο',detail:'Ο ανιχνευτής επιστρέφει προς την ομάδα.',tone:'warning'});}f.order='retreat';return this.creekTacticalIntent(f);}
      if(this.elapsed>f.creekOrderUntil){f.order='follow';return {kind:'move',formation:true,target:p};}
      return {kind:'move',target:point};
    }
    if(danger&&distance(danger,point)<10)return {kind:'attack',target:danger};
    return {kind:'move',target:point};
  },

  creekContext(){
    const p=this.player,conversation=this.visibleRecruitmentTarget?.();
    if(conversation)return this.recruitmentContext(conversation);
    const aimed=this.aimTarget,actor=aimed?.kind==='actor'?aimed.entity:null;
    if(actor&&this.frogs.includes(actor)&&actor!==p&&living(actor)&&distance(actor,p)<RECRUIT_PREVIEW_RANGE){
      if(actor.team==='neutral'||actor.surrendered&&actor.team!=='ally')return this.recruitmentContext(actor);
      if(actor.team==='ally'&&actor.surrendered)return {type:'rally',entity:actor,available:distance(actor,p)<RECRUIT_RANGE,actionLabel:'Βοήθησε',actionIcon:'regroup',hint:'E · Βοήθησε τον σύντροφο να επιστρέψει'};
      if(actor.leader&&actor.team.startsWith('enemy')){const c=this.camps.find(c=>c.id===actor.home);if(c){const offer=this.creekTerritoryOffer(c);return {type:'persuade-camp',entity:c,available:offer.allowed&&distance(actor,p)<RECRUIT_RANGE,cost:offer.cost,reason:offer.reason,actionLabel:'Προσέγγιση',actionIcon:'group',hint:'E · '+offer.reason};}}
    }
    const special=this.creekInteractionContext?.();
    if(special)return special;
    const recruit=passiveRecruitTarget(p,this.frogs,this.camps,{yaw:this.aimYaw??this.cameraYaw??p.yaw});
    if(recruit)return this.recruitmentContext(recruit);
    const swarms=this.world.hotspots.filter(h=>distance(h,p)<8).sort((a,b)=>distance(a,p)-distance(b,p));
    const swarm=aimed?.kind==='flies'&&swarms.includes(aimed.entity)?aimed.entity:swarms.find(h=>h.flies>=1);
    if(swarm){
      const cooldown=Math.max(0,(p.gatherReadyAt||0)-this.elapsed),available=swarm.flies>=1&&!cooldown;
      return {type:'gather',entity:swarm,available,cooldown,cooldownDuration:4,progress:1-cooldown/4,
        reason:cooldown?'Περίμενε '+Math.ceil(cooldown)+'″':'Τροφή για την εξόρμηση',actionLabel:'Τροφή',actionIcon:'forage',hint:'E · Τροφή για μεταφορά · Αριστερό κλικ · Πιάσε και φάε'};
    }
    const c=this.camps.filter(c=>!c.destroyed&&!creekFriendlyTerritory(c)&&distance(c,p)<14).sort((a,b)=>distance(a,p)-distance(b,p))[0];
    if(c){const offer=this.creekTerritoryOffer(c);return {type:'persuade-camp',entity:c,available:offer.allowed,cost:offer.cost,reason:offer.reason,actionLabel:'Προσέγγιση',actionIcon:'group',hint:'E · '+offer.reason};}
    if(actor?.team==='ally'&&distance(actor,p)<RECRUIT_RANGE)return {type:'ally',entity:actor,available:true,actionLabel:'Ομάδα',actionIcon:'group',hint:'E · Επιλογή συντρόφου · Tab · Τακτικές'};
    return {type:'none',available:false,reason:'Παρατήρησε το ρυάκι',actionLabel:'Παρατήρησε',actionIcon:'eye',hint:'Ακολούθησε κινήσεις και ήχους · V · Ανακαλύψεις'};
  },

  consumeCreekFood(){
    if(this.player.stomach>=95){this.ui.toast?.('Το στομάχι σου είναι γεμάτο.');return false;}
    if(this.resources.food<3){this.ui.toast?.('Χρειάζεσαι 3 τροφή από σμήνη για ένα γεύμα.','warning');return false;}
    this.resources.food-=3;eat(this.player,28);this.audio.play?.('eat');this.save?.();return true;
  }
};
