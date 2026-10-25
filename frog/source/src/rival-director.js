/** Rival economies spend their own reserves and dispatch real, existing troops. */
export const RIVAL_RULES = Object.freeze({
  foodIncome: 0.14,
  reedIncome: 0.075,
  stockLimit: Object.freeze({food: 220, reeds: 180}),
  reinforcementCost: Object.freeze({food: 14, reeds: 6}),
  developmentInterval: 110,
  raidCooldown: 120,
  expansionDelay: 240,
  expansionDuration: 45,
  expansionCost: Object.freeze({food: 42, reeds: 48}),
  maximumLivingFrogs: 160
});

const finite = (value, fallback = 0) => Number.isFinite(value) ? value : fallback;
const nonnegative = value => Math.max(0, finite(value));
const distance = (a,b) => Math.hypot(a.x-b.x,a.z-b.z);
const active = c => !!c && !c.destroyed && finite(c.hp,1)>0;
const enemyCamp = c => active(c) && /^enemy\d*$/.test(c.team || '');
const living = f => !!f && !f.dead && finite(f.hp,1)>0 && !f.surrendered;
const tierOf = c => Math.max(1,Math.min(3,Math.floor(finite(c.tier,1))));
const reserveCount = c => tierOf(c)>1 ? 4 : 3;
const troopTarget = c => 6+2*tierOf(c);
const members = (game,c) => game.frogs.filter(f=>living(f)&&f.team===c.team&&f.home===c.id);
const availableAtHome = (game,c) => members(game,c).filter(f=>!f.raidTarget&&!f.grabbedBy&&!f.trainingPaid&&distance(f,c)<=28);
const stockOf = c => {
  c.stock ??= {food:0,reeds:0};
  c.stock.food=nonnegative(c.stock.food);c.stock.reeds=nonnegative(c.stock.reeds);
  return c.stock;
};
const canPay = (stock,cost) => stock.food>=cost.food&&stock.reeds>=cost.reeds;
function pay(stock,cost) {
  if(!canPay(stock,cost))return false;
  stock.food-=cost.food;stock.reeds-=cost.reeds;return true;
}
function threatened(game,c,radius=22) {
  return game.frogs.some(f=>living(f)&&f.team!=='neutral'&&f.team!==c.team&&distance(f,c)<radius)
    || (game.predators||[]).some(p=>living(p)&&!['patrol','dormant','dead','flee'].includes(p.phase)&&distance(p,c)<radius);
}
function updateShelter(game,c) {
  if(c.mesh)game.world?.updateShelter?.(c.mesh,{...c,storage:c.stock});
}
function releaseCompletedRaid(game,f) {
  if(!f.raidTarget)return;
  const target=game.camps.find(c=>c.id===f.raidTarget);
  if(active(target)&&target.team!==f.team&&target.team!=='neutral')return;
  f.raidTarget=null;f.guard=true;f.order='guard';f.returnOrder='guard';
  f.intent=null;f.orderTarget=null;f.combatTarget=null;f.brain=0;f.loot=0;
}

function developmentOffer(c) {
  if(c.hp<c.maxHp*.75)return {type:'repair',cost:{food:4,reeds:12}};
  if(!c.buildings.store)return {type:'store',cost:{food:16,reeds:24}};
  if(!c.buildings.watchtower)return {type:'watchtower',cost:{food:20,reeds:32}};
  if(!c.buildings.palisade)return {type:'palisade',cost:{food:14,reeds:38}};
  if(tierOf(c)<3)return {type:'upgrade',cost:{food:32*tierOf(c),reeds:44*tierOf(c)}};
  return null;
}

/** Owns enemy spawnTimer and rivalDevelopTimer; call once per economy tick. */
export function updateRivalCamp(game,c,dt) {
  const result={reinforced:false,developed:null};
  if(!enemyCamp(c)||!(finite(dt)>0))return result;
  c.buildings??={};const stock=stockOf(c),safe=!threatened(game,c);
  for(const f of members(game,c))releaseCompletedRaid(game,f);
  const interval=95-10*tierOf(c);
  c.spawnTimer=Math.min(interval,nonnegative(c.spawnTimer)+dt);
  c.rivalDevelopTimer=Math.min(RIVAL_RULES.developmentInterval,nonnegative(c.rivalDevelopTimer)+dt);
  if(!safe)return result;
  stock.food=Math.min(RIVAL_RULES.stockLimit.food,stock.food+dt*RIVAL_RULES.foodIncome);
  stock.reeds=Math.min(RIVAL_RULES.stockLimit.reeds,stock.reeds+dt*RIVAL_RULES.reedIncome);
  const own=members(game,c);
  if(c.spawnTimer>=interval&&own.length<troopTarget(c)
    &&game.frogs.filter(f=>!f.dead&&finite(f.hp,1)>0).length<RIVAL_RULES.maximumLivingFrogs
    &&pay(stock,RIVAL_RULES.reinforcementCost)) {
    c.spawnTimer=0;
    const roles=['bruiser','hunter','caller','scout'];
    game.spawnFrog({x:c.x+3,z:c.z,team:c.team,home:c.id,guard:true,order:'guard',
      role:roles[own.length%roles.length],tier:tierOf(c),level:tierOf(c)+1,stomach:80});
    result.reinforced=true;
  }
  if(c.rivalDevelopTimer>=RIVAL_RULES.developmentInterval&&members(game,c).length>=reserveCount(c)) {
    const offer=developmentOffer(c);
    // Keep one reinforcement in reserve before investing in additional buildings.
    const budget=offer&&{food:offer.cost.food+RIVAL_RULES.reinforcementCost.food,reeds:offer.cost.reeds+RIVAL_RULES.reinforcementCost.reeds};
    if(offer&&canPay(stock,budget)&&pay(stock,offer.cost)) {
      c.rivalDevelopTimer=0;
      if(offer.type==='repair')c.hp=Math.min(c.maxHp,c.hp+90);
      else if(offer.type==='upgrade') {
        c.tier=tierOf(c)+1;c.maxHp+=150;c.hp=Math.min(c.maxHp,c.hp+120);
      } else {
        c.buildings[offer.type]=true;
        if(offer.type==='palisade'){c.maxHp+=180;c.hp+=180;}
      }
      result.developed=offer.type;updateShelter(game,c);
    }
  }
  return result;
}

/** Returns the dispatched raid, or null. Never spawns or reuses active raiders. */
export function launchRivalRaid(game) {
  const now=nonnegative(game.elapsed),bases=game.ownedCamps().filter(active),pairs=[];
  if(!bases.length)return null;
  for(const source of game.camps.filter(enemyCamp)) {
    if(finite(source.rivalRaidReadyAt)>now||threatened(game,source))continue;
    const stationed=availableAtHome(game,source),keep=reserveCount(source);
    const troops=stationed.filter(f=>!f.leader);
    const amount=Math.min(3+tierOf(source),stationed.length-keep,troops.length);
    if(amount<2)continue;
    for(const target of bases) {
      const defenders=game.frogs.filter(f=>living(f)&&f.team==='ally'&&f.home===target.id&&f.guard&&distance(f,target)<=20).length;
      const incoming=game.frogs.filter(f=>living(f)&&f.raidTarget===target.id).length;
      const score=distance(source,target)+defenders*24+(target.buildings?.watchtower?14:0)
        +(defenders===0?-35:0)+incoming*30+(target.hp/Math.max(1,target.maxHp))*8;
      pairs.push({source,target,troops,amount,score});
    }
  }
  if(!pairs.length)return null;
  pairs.sort((a,b)=>a.score-b.score||String(a.source.id).localeCompare(String(b.source.id)));
  const {source,target,troops,amount}=pairs[0];
  troops.sort((a,b)=>(b.hp/Math.max(1,b.maxHp))-(a.hp/Math.max(1,a.maxHp))||String(a.id).localeCompare(String(b.id)));
  const raiders=troops.slice(0,amount);
  for(const f of raiders) {
    f.raidTarget=target.id;f.raidStartedAt=now;f.guard=false;f.order='attack';f.returnOrder='guard';
    f.intent=null;f.orderTarget=null;f.combatTarget=null;f.combatUntil=0;f.fear=0;f.brain=0;f.loot=0;
  }
  source.rivalRaidReadyAt=now+RIVAL_RULES.raidCooldown;
  target.underRaid=true;
  game.ui?.toast?.({id:`rival-raid-${source.id}-${Math.floor(now)}`,icon:'warning',secondaryIcon:'enemy',tone:'danger',value:raiders.length,
    label:'Εχθρική επιδρομή',detail:`${source.name}: ${raiders.length} βάτραχοι ξεκίνησαν προς το ${target.name}. Ανάθεσε φρουρά ή αναχαίτισέ τους.`});
  return {sourceId:source.id,targetId:target.id,raiderIds:raiders.map(f=>f.id)};
}

const occupiedSite = (game,site,owner=null) => game.camps.some(c=>distance(c,site)<32)
  ||game.camps.some(c=>c!==owner&&c.rivalExpansion&&distance(c.rivalExpansion,site)<32);
function expansionSite(game,c) {
  return (game.world?.campSites||[]).filter(site=>Number.isFinite(site.x)&&Number.isFinite(site.z)
    &&distance(c,site)<=140&&!occupiedSite(game,site,c)&&!threatened(game,{...site,team:c.team},26))
    .sort((a,b)=>distance(c,a)-distance(c,b))[0]||null;
}
function cancelExpansion(c,{refund=true}={}) {
  if(refund&&c.rivalExpansion) {
    const stock=stockOf(c);
    for(const key of ['food','reeds'])stock[key]=Math.min(RIVAL_RULES.stockLimit[key],stock[key]+RIVAL_RULES.expansionCost[key]);
  }
  c.rivalExpansion=null;c.rivalExpansionTimer=RIVAL_RULES.expansionDelay-60;
}

/** Each original stronghold can finance one outpost; its first guards physically travel from home. */
export function updateRivalExpansions(game,dt) {
  const built=[];
  if(!(finite(dt)>0))return built;
  for(const c of [...game.camps]) {
    if(c.rivalExpansion&&(!enemyCamp(c)||c.rivalExpansion.team!==c.team))cancelExpansion(c,{refund:false});
    if(!enemyCamp(c)||!c.originalEnemy||c.rivalOutpostBuilt)continue;
    if(game.camps.some(other=>other.rivalOrigin===c.id)){c.rivalOutpostBuilt=true;c.rivalExpansion=null;continue;}
    c.rivalExpansionTimer=Math.min(RIVAL_RULES.expansionDelay,nonnegative(c.rivalExpansionTimer)+dt);
    const pending=c.rivalExpansion;
    if(pending) {
      if(occupiedSite(game,pending,c)||threatened(game,{...pending,team:c.team},26)) {cancelExpansion(c);continue;}
      if(nonnegative(game.elapsed)<pending.readyAt||threatened(game,c))continue;
      const stationed=availableAtHome(game,c);
      if(stationed.length<reserveCount(c)+2)continue;
      const builders=stationed.filter(f=>!f.leader).slice(0,2);
      if(builders.length<2)continue;
      const id=`rival-outpost-${c.id}`;
      const outpost=game.addCamp({id,x:pending.x,z:pending.z,name:`Προφυλακή · ${c.name}`,team:c.team,
        tier:1,hp:300,maxHp:300,stock:{food:0,reeds:0},buildings:{},originalEnemy:false,rivalOrigin:c.id,
        spawnTimer:0,rivalDevelopTimer:0,rivalRaidReadyAt:nonnegative(game.elapsed)+RIVAL_RULES.raidCooldown});
      for(const f of builders) {
        f.home=outpost.id;f.guard=true;f.order='guard';f.returnOrder='guard';f.raidTarget=null;
        f.intent=null;f.orderTarget=null;f.combatTarget=null;f.brain=0;
      }
      c.rivalOutpostBuilt=true;c.rivalExpansion=null;built.push(outpost);
      game.ui?.toast?.({id:`rival-outpost-${c.id}`,icon:'enemy',secondaryIcon:'camp',tone:'warning',
        label:'Οι αντίπαλοι επεκτείνονται',detail:`${c.name}: χτίστηκε νέα προφυλακή στη λίμνη. Η αντίπαλη περιοχή δυναμώνει.`});
      continue;
    }
    if(c.rivalExpansionTimer<RIVAL_RULES.expansionDelay||threatened(game,c)||availableAtHome(game,c).length<reserveCount(c)+2)continue;
    const stock=stockOf(c),budget={food:RIVAL_RULES.expansionCost.food+RIVAL_RULES.reinforcementCost.food,reeds:RIVAL_RULES.expansionCost.reeds+RIVAL_RULES.reinforcementCost.reeds};
    if(!canPay(stock,budget))continue;
    const site=expansionSite(game,c);if(!site)continue;
    pay(stock,RIVAL_RULES.expansionCost);
    c.rivalExpansion={siteId:site.id||null,x:site.x,z:site.z,team:c.team,readyAt:nonnegative(game.elapsed)+RIVAL_RULES.expansionDuration};
    game.ui?.toast?.({id:`rival-expansion-${c.id}`,icon:'enemy',secondaryIcon:'build',tone:'warning',
      label:'Αντίπαλη επέκταση',detail:`${c.name}: ετοιμάζει προφυλακή. Μπορείς να εμποδίσεις την κατάληψη της νησίδας.`});
  }
  return built;
}
