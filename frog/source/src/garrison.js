import {defaultPlacement} from './placement-rules.js';

const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const living=f=>!!f&&!f.dead&&(f.hp??1)>0;
const active=c=>!!c&&!c.destroyed&&(c.hp??1)>0;
const defender=f=>f.guard||f.order==='guard'||(f.trainingPaid&&f.returnOrder==='guard');
const activePredator=p=>living(p)&&!['patrol','flee','dormant','dead'].includes(p.phase);

export const DEFENSE_RULES=Object.freeze({baseSlots:2,towerSlots:4,baseRange:22,towerRange:36,baseLeash:28,towerLeash:40,damageReduction:18,stationRadius:24});
const threatRange=(camp,staffed)=>camp.defenseThreatened?(camp.buildings?.watchtower?DEFENSE_RULES.towerLeash:DEFENSE_RULES.baseLeash):camp.buildings?.watchtower&&staffed?DEFENSE_RULES.towerRange:DEFENSE_RULES.baseRange;

export function campGuards(game,camp){
  return game.frogs.filter(f=>living(f)&&f.team===camp.team&&f.home===camp.id&&defender(f));
}

export function guardPresent(camp,f){
  if(!living(f)||!f.guard||f.grabbedBy)return false;
  if(distance(f,camp)<=DEFENSE_RULES.stationRadius)return true;
  const target=f.intent?.kind==='attack'?f.intent.target:null;
  const engaged=living(target)&&!target.surrendered&&target.team!==camp.team&&target.team!=='neutral'&&target.team!=='player'&&(target.team!=='predator'||activePredator(target));
  const leash=camp.buildings?.watchtower?DEFENSE_RULES.towerLeash:DEFENSE_RULES.baseLeash;
  return !!engaged&&distance(f,camp)<=leash&&distance(target,camp)<=leash;
}

export function guardAssignment(game,f){
  if(!living(f)||!f.guard||f.order==='training')return null;
  const camp=game.camps.find(c=>c.id===f.home&&active(c)&&c.team===f.team);
  if(!camp)return null;
  const tower=!!camp.buildings?.watchtower,slots=tower?DEFENSE_RULES.towerSlots:DEFENSE_RULES.baseSlots;
  const guards=campGuards(game,camp).sort((a,b)=>String(a.id).localeCompare(String(b.id)));
  const index=Math.max(0,guards.indexOf(f));
  const angle=index*Math.PI*(3-Math.sqrt(5))+(game.elapsed||0)*.09;
  const local=tower?(camp.buildingPlacements?.watchtower||defaultPlacement('watchtower')):{x:0,z:0,yaw:0};
  const yaw=camp.yaw||0,cs=Math.cos(yaw),sn=Math.sin(yaw);
  const anchor={x:camp.x+local.x*cs+local.z*sn,z:camp.z-local.x*sn+local.z*cs};
  const radius=tower?2.7+(index%2)*.75:6.5+(index%2)*1.1;
  return {camp,tower,slots,range:tower?DEFENSE_RULES.towerRange:DEFENSE_RULES.baseRange,leash:tower?DEFENSE_RULES.towerLeash:DEFENSE_RULES.baseLeash,
    point:{x:anchor.x+Math.sin(angle)*radius,z:anchor.z+Math.cos(angle)*radius}};
}

export function campThreats(game,camp,range){
  const frogs=game.frogs.filter(f=>living(f)&&!f.surrendered&&f.team!=='neutral'&&f.team!=='player'&&f.team!==camp.team&&distance(f,camp)<=range);
  const predators=(game.predators||[]).filter(p=>activePredator(p)&&distance(p,camp)<=range);
  return [...frogs,...predators];
}

export function defenseSnapshot(game){
  const allies=game.allies();
  const camps=game.ownedCamps().map(c=>{
    const guards=campGuards(game,c),watchtower=!!c.buildings?.watchtower;
    const range=watchtower?DEFENSE_RULES.towerRange:DEFENSE_RULES.baseRange;
    const stationed=guards.filter(f=>guardPresent(c,f)).length;
    const threats=campThreats(game,c,threatRange(c,stationed>0)).length;
    return {id:c.id,name:c.name,watchtower,slots:watchtower?DEFENSE_RULES.towerSlots:DEFENSE_RULES.baseSlots,assigned:guards.length,stationed,staffed:stationed>0,
      range,damageReduction:watchtower?DEFENSE_RULES.damageReduction:0,threats,status:threats?'under-attack':!guards.length?'empty':stationed?'guarded':'arriving',
      guards:guards.map(f=>({id:f.id,name:f.name,portrait:game.portraits?.[f.id],hp:f.hp,maxHp:f.maxHp,order:f.order,guard:f.guard,home:f.home,role:f.role,tier:f.tier,level:f.level,
        status:f.order==='training'?'training':f.intent?.kind==='attack'?'fighting':distance(f,c)<=DEFENSE_RULES.stationRadius?'stationed':'arriving'}))};
  });
  return {camps,traveling:allies.filter(f=>!defender(f)&&f.order!=='training').length,guardCount:allies.filter(defender).length,trainingCount:allies.filter(f=>f.order==='training').length};
}

export function normalizeGuardOrders(game){
  for(const f of game.allies()){
    if(!defender(f))continue;
    if(game.camps.some(c=>c.id===f.home&&c.team==='ally'&&active(c))){if(f.order==='guard')f.guard=true;if(f.guard&&f.order!=='training')f.order='guard';continue;}
    f.guard=false;f.returnOrder='follow';f.home=null;
    if(f.order==='guard')f.order='follow';
    f.intent=null;f.orderTarget=null;f.combatTarget=null;f.brain=0;
  }
}

function setDuty(game,f,camp){
  if(f.trainingPaid)game.cancelTraining(f);
  f.guard=!!camp;f.order=camp?'guard':'follow';f.returnOrder=f.order;
  if(camp)f.home=camp.id;
  f.intent=null;f.orderTarget=null;f.combatTarget=null;f.combatUntil=0;f.raidTarget=null;f.fear=0;f.brain=0;
}

export function commandGarrison(game,{campId,command,ids}){
  const camp=game.ownedCamps().find(c=>c.id===campId);
  if(!camp){game.ui.toast({icon:'camp',tone:'warning',label:'Επίλεξε καταφύγιο',detail:'Επίλεξε ενεργό συμμαχικό καταφύγιο.'});return false;}
  let squad=[];
  if(command==='recall')squad=campGuards(game,camp);
  else if(command==='assign-selected'){
    const selected=ids?new Set(ids):game.selectedIds||new Set();
    squad=game.allies().filter(f=>selected.has(f.id)&&!f.grabbedBy&&!(f.guard&&f.home===camp.id));
  }else if(command==='assign'){
    const ready=game.allies().filter(f=>!defender(f)&&!f.trainingPaid&&!f.grabbedBy).sort((a,b)=>distance(a,camp)-distance(b,camp));
    const slots=camp.buildings?.watchtower?DEFENSE_RULES.towerSlots:DEFENSE_RULES.baseSlots;
    const missing=Math.max(0,slots-campGuards(game,camp).length);
    squad=ready.slice(0,Math.min(missing,Math.max(0,ready.length-1)));
  }else return false;
  if(!squad.length){game.ui.toast({icon:command==='recall'?'regroup':'shield',tone:'info',label:command==='assign'?'Δεν χρειάζεται ανάθεση':command==='assign-selected'?'Επίλεξε βατράχους':'Καμία φρουρά εδώ',detail:command==='assign'?'Η φρουρά είναι στελεχωμένη ή δεν υπάρχουν ελεύθεροι σύμμαχοι. Η αυτόματη ανάθεση κρατά έναν μαζί σου.':command==='assign-selected'?'Επίλεξε διαθέσιμους βατράχους στη Συμμορία.':'Δεν υπάρχουν φρουροί για ανάκληση εδώ.'});return false;}
  for(const f of squad)setDuty(game,f,command==='recall'?null:camp);
  game.ui.toast({icon:command==='recall'?'regroup':'shield',value:squad.length,progress:1,tone:'success',label:command==='recall'?'Η φρουρά επιστρέφει':'Ανάθεση φρουράς',detail:command==='recall'?`${camp.name}: η φρουρά επιστρέφει μαζί σου.`:`${camp.name}: ${squad.length} βάτραχοι πηγαίνουν στη φρουρά.`});
  game.audio.play?.('croak');game.updateUI?.(game.buildDayState());game.ui.renderPanel?.(true);game.save();return true;
}

export function updateGarrisonAlerts(game){
  for(const camp of game.ownedCamps()){
    const guards=campGuards(game,camp).filter(f=>f.guard&&!f.grabbedBy);
    const staffed=guards.some(f=>guardPresent(camp,f));
    const range=threatRange(camp,staffed);
    const threats=campThreats(game,camp,range);
    const wasThreatened=!!camp.defenseThreatened;
    camp.defenseThreatened=threats.length>0;camp.underRaid=threats.some(f=>f.raidTarget===camp.id);
    if(camp.underRaid)camp.defenseRaidSeen=true;
    if(threats.length&&!wasThreatened){
      game.ui.toast({id:`defense-${camp.id}`,icon:staffed?'shield':'warning',secondaryIcon:'enemy',value:threats.length,progress:1,tone:'danger',label:staffed?'Η φρουρά εντόπισε εχθρούς':'Αφύλακτη βάση σε κίνδυνο',detail:`${camp.name}: ${staffed&&camp.buildings?.watchtower?'η σκοπιά εντόπισε εχθρούς':'εχθροί κοντά στη βάση'}. ${guards.length?'Η φρουρά αναλαμβάνει.':'Χρειάζεται φρουρά!'}`});
      if(staffed)game.audio.play?.('croak');
    }else if(!threats.length&&wasThreatened){
      game.ui.toast({id:`defense-${camp.id}`,icon:'shield',secondaryIcon:'check',value:guards.length,progress:1,tone:'success',label:'Η βάση είναι ασφαλής',detail:`${camp.name}: η απειλή απομακρύνθηκε. Η φρουρά επιστρέφει στα πόστα της.`});
      if(guards.length&&camp.defenseRaidSeen)game.stats.raidsDefended=(game.stats.raidsDefended||0)+1;
      camp.defenseRaidSeen=false;
    }
  }
}
