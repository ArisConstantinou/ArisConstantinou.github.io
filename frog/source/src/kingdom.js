/** Application integration for the persistent kingdom, its people and its guide. */
import * as THREE from 'three';
import {createWorld} from './world.js';
import {SAVE_KEY,SAVE_VERSION,BUILDINGS,COLORS,dayState,validateSave} from './rules.js';
import {WORLD_REVISION,SHELTER_RADIUS} from './world-config.js';
import {gatePoint,gateMaxHealth,clearFortPosition} from './fortification.js';
import {acceptRecruitmentQuest} from './recruitment.js';
import {createTacticalGroups,saveTacticalGroup,selectTacticalGroup,tacticalSnapshot,orderFlank} from './tactics.js';
import {initRealmEconomy,updateRealmEconomy,economySave,realmEconomySnapshot,setCampSpecialization,craftEquipment,cancelRealmJob,constructionOffer} from './realm-economy.js';
import {createRealmState,realmDescriptor,realmSnapshot,splitRealmParty,completeRealmTravel,serializePredators,restoreRealmPredators,realmBackgroundSupply,realmBackgroundSnapshot,tickRealmEvents} from './realms.js';
import {tutorialProgress,guideCard} from './field-guide.js';
import {loadPersistentSave,persistSave,mostRecentSave} from './save-store.js';
import {updateConstructionSites,constructionWorkRate,constructionQueued,disposeConstructionSites} from './construction.js';
import {clearCombatFeedback} from './combat-feedback.js';
import {recruitmentBubbleTarget,recruitmentBubbleAnchor} from './recruitment-bubble.js';

export const ACTOR_SAVE_FIELDS=['id','name','team','role','tier','level','hp','maxHp','stomach','maxStomach','xp','x','z','yaw','morale','home','guard','leader','surrendered','order','skinColor','trained','trainingProgress','trainingCamp','trainingPaid','returnOrder','raidTarget','loot','surrenderTimer','persuadeCD','crowned','equipment','recruitment','firstRecruit','recruitXpAwarded','tacticalPath','tacticalTargetId'];
const CAMP_FIELDS=['id','x','z','name','team','yaw','buildingPlacements','tier','hp','maxHp','gateHp','stock','buildings','originalEnemy','originalTeam','rivalIndex','capturedOnce','destroyRewarded','rebuildTimer','persuadeCD','destroyed','lootTaken','supplyMigrated','morale','spawnTimer','mealCount','mealDay','specialization','legacySlots','underConstruction','constructionProgress'];
const clean=(object,fields)=>Object.fromEntries(fields.filter(k=>object[k]!==undefined).map(k=>[k,object[k]]));
const clone=value=>JSON.parse(JSON.stringify(value));
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const completed=c=>c.team==='ally'&&!c.destroyed&&!c.underConstruction&&c.hp>0;

export const kingdomMethods={
  prepareKingdomWorld(save){
    disposeConstructionSites(this);clearCombatFeedback(this);
    this.realms=createRealmState(save?.realms,{elapsed:save?.elapsed||0});
    const descriptor=realmDescriptor(this.realms.active);
    if(this.world.seed!==undefined&&this.world.seed!==descriptor.seed){this.world.dispose?.();this.world=createWorld(this.scene,this.renderer,{seed:descriptor.seed,regionIndex:descriptor.index});}
  },
  initKingdom(save){
    this.realms??=createRealmState(save?.realms,{elapsed:this.elapsed});
    initRealmEconomy(this,save);this.tacticalGroups=createTacticalGroups(save?.tacticalGroups);
    const source=save?.guide||{};
    this.guide={version:1,seen:[...new Set((source.seen||[]).filter(id=>guideCard(id)))],hinted:[...new Set((source.hinted||[]).filter(id=>guideCard(id)))],pending:[],distance:Math.max(0,Number(source.distance)||0),groupsSaved:Math.max(0,Number(source.groupsSaved)||0),tutorialDismissed:!!source.tutorialDismissed,nextPauseAt:this.elapsed+5};
    this.guideLastPosition={x:this.player.x,z:this.player.z};this.closeRecruitment();this._guidePause=null;this.nextGuideCheck=0;
    this.pendingRespawn=!!save?.pendingRespawn;this.won=false;
    if(save?.predators?.length)restoreRealmPredators(this,save.predators);
    updateConstructionSites(this,0);
  },
  async loadCampaignSave(){
    try{
      const persistent=validateSave(await loadPersistentSave()),chosen=mostRecentSave(this.saved,persistent);
      if(!this.started){this.saved=chosen;this.ui.showTitle(!!chosen);}
    }catch{ /* The complete local fallback, when present, stays usable. */ }
  },
  createSaveData(){
    return {version:SAVE_VERSION,worldRevision:WORLD_REVISION,balanceRevision:this.balanceRevision??1,pendingRivalRecoveryCampId:this.pendingRivalRecoveryCampId||null,nextRaid:this.nextRaid,graceUntil:this.graceUntil,elapsed:this.elapsed,savedAt:Date.now(),pendingRespawn:!!this.player.dead,resources:{...this.resources},stats:{...this.stats},campaign:this.campaign,realms:this.realms,economy:economySave(this),guide:this.guide,tacticalGroups:this.tacticalGroups,player:clean(this.player,ACTOR_SAVE_FIELDS),frogs:this.frogs.filter(f=>f!==this.player&&!f.dead).map(f=>clean(f,ACTOR_SAVE_FIELDS)),camps:this.camps.map(c=>clean(c,CAMP_FIELDS)),predators:serializePredators(this),hotspots:this.world.hotspots.map(h=>({id:h.id,flies:h.flies})),idCounter:this.idCounter,won:false};
  },
  save(){
    if(!this.started)return false;
    const data=this.createSaveData();let localOK=false;
    try{const encoded=JSON.stringify(data);if(encoded.length<3_900_000){localStorage.setItem(SAVE_KEY,encoded);localOK=true;this.savedAt=data.savedAt;}else if(typeof indexedDB==='undefined')throw new Error('Η αποθήκευση χρειάζεται IndexedDB');}catch{}
    this.saved=data;
    persistSave(data).then(ok=>{if(ok){this.savedAt=data.savedAt;this.saveWarn=false;}else if(!localOK)this.reportSaveFailure();}).catch(()=>{if(!localOK)this.reportSaveFailure();});
    return localOK||typeof indexedDB!=='undefined';
  },
  reportSaveFailure(){if(this.saveWarn)return;this.saveWarn=true;this.ui.toast('Δεν αποθηκεύτηκε η εκστρατεία. Ο χώρος του browser είναι γεμάτος ή η αποθήκευση είναι απενεργοποιημένη.','warning');},
  allKingdomCamps(){
    return [...this.camps.map(c=>({...c,id:`${this.realms?.active??0}:${c.id}`})),...Object.entries(this.realms?.regions||{}).filter(([id])=>Number(id)!==this.realms.active).flatMap(([id,r])=>(r.snapshot?.camps||[]).map(c=>({...c,id:`${id}:${c.id}`})))];
  },
  kingdomState(){
    const economy=realmEconomySnapshot(this),background=realmBackgroundSnapshot(this),p=this.player;
    const recruitment=this.recruitmentSnapshot(recruitmentBubbleTarget(this));
    return {realmEconomy:{...economy,background},realm:realmSnapshot(this),recruitment,tacticalGroups:tacticalSnapshot(this),guide:{...this.guide,tutorial:tutorialProgress({distance:this.guide?.distance,gatheredFood:this.stats.gatheredFood,gatheredReeds:this.stats.gatheredReeds,recruited:this.stats.recruited,shelters:this.allKingdomCamps().filter(completed).length,groupsSaved:this.guide?.groupsSaved,crafted:this.stats.crafted})},kingdomPopulation:this.allies().length+background.armyCount+(p.dead?0:1),kingdomGuards:this.allies().filter(f=>f.guard).length+background.guards};
  },
  updateKingdom(dt){
    updateRealmEconomy(this,dt);realmBackgroundSupply(this,dt);
    if(this.guide){const p=this.player,last=this.guideLastPosition;this.guide.distance+=last?Math.min(1,distance(p,last)):0;this.guideLastPosition={x:p.x,z:p.z};}
    if(this.pendingRespawn){this.pendingRespawn=false;this.respawn();}
    if(this.elapsed<(this.nextGuideCheck||0))return;this.nextGuideCheck=this.elapsed+.7;
    this.discoverNearbyGuides();
    // Discoveries update the optional concept drawer; they never interrupt play.
    if(this.guide?.pending.length)this.guide.pending.length=0;
  },
  isGuideSafe(){return !this.player.grabbedBy&&!this.predators.some(p=>!p.dead&&distance(p,this.player)<30)&&!this.frogs.some(f=>!f.dead&&!f.surrendered&&f.team.startsWith('enemy')&&distance(f,this.player)<25);},
  discoverGuide(id){
    if(!this.guide||!guideCard(id)||this.guide.seen.includes(id)||this.guide.hinted.includes(id))return;
    this.guide.hinted.push(id);this.ui.showGuideHint?.(id);
  },
  discoverNearbyGuides(){
    if(!this.started||this.ui.panel)return;
    const ctx=this.context();if(ctx.type==='recruit')this.discoverGuide(ctx.entity.team==='neutral'?'neutral':'surrender');
    if(this.world.hotspots.some(h=>distance(h,this.player)<9))this.discoverGuide('flies');
    if(this.frogs.some(f=>f.team.startsWith('enemy')&&!f.dead&&distance(f,this.player)<25))this.discoverGuide('enemies');
    for(const p of this.predators)if(!p.dead&&p.phase!=='dormant'&&distance(p,this.player)<40)this.discoverGuide(p.boss?'bosses':p.type);
    if(this.resources.pearls>0)this.discoverGuide('pearls');
  },
  showRecruitment(f){
    if(!f||this.paused||!recruitmentBubbleTarget(this,f.id))return false;
    this.activeRecruitId=f.id;this.interactionFocus={entity:f,until:this.elapsed+3};
    this.updateUI(dayState(this.elapsed));this.ui.showRecruitmentBubble?.(this.recruitmentSnapshot(f));
    this.ignoreUnlockUntil=performance.now()+700;this.input.left=false;this.input.right=false;this.input.clearMouseMotion?.();this.input.unlock?.();
    this.updateRecruitmentBubble();return true;
  },
  recruitmentSnapshot(f){
    if(!f||f.dead||f.team!=='neutral')return null;
    const ctx=this.recruitmentContext(f),offer=ctx.offer;
    return {targetId:f.id,name:f.name,role:f.role,level:f.level,portrait:this.portraits?.[f.id],requirements:offer.requirements,cost:offer.cost,canRecruit:ctx.available&&!this.paused,reason:ctx.reason,instant:offer.instant,helpAvailable:offer.requirements.some(r=>r.id==='help'&&!r.done&&!r.accepted),helpAccepted:offer.quest?.accepted,quest:offer.quest};
  },
  visibleRecruitmentTarget(){
    const bubble=this.ui.refs?.recruitmentBubble;
    if(!bubble||bubble.hidden||!this.started||this.paused||this.ended||this.ui.isBlocking?.()||this.buildPlacement?.active)return null;
    return recruitmentBubbleTarget(this);
  },
  closeRecruitment(){
    if(this.interactionFocus?.entity?.id===this.activeRecruitId)this.interactionFocus=null;
    this.activeRecruitId=null;this.ui.closeRecruitmentBubble?.();return true;
  },
  updateRecruitmentBubble(){
    if(!this.activeRecruitId)return;
    const frog=recruitmentBubbleTarget(this);
    if(!frog||!this.started||this.ended||this.buildPlacement?.active){this.closeRecruitment();return;}
    // Explicit Pause temporarily hides the conversation without resuming or losing it.
    if(this.paused||this.ui.isBlocking?.()){this.ui.updateRecruitmentAnchor?.({targetId:frog.id,x:0,y:0,visible:false});return;}
    if(!this.camera)return;
    const anchor=recruitmentBubbleAnchor(this,frog,this.labels?.width||globalThis.innerWidth||0,this.labels?.height||globalThis.innerHeight||0);
    if(!anchor.visible){this.closeRecruitment();return;}
    this.ui.updateRecruitmentAnchor?.(anchor);
  },
  interactRecruitment(f){
    if(!f||this.paused||!recruitmentBubbleTarget(this,f.id))return false;
    if(this.activeRecruitId!==f.id)return this.showRecruitment(f);
    const snapshot=this.recruitmentSnapshot(f);
    if(snapshot.helpAvailable)return this.handleKingdomAction('recruit-help',{id:f.id});
    if(snapshot.canRecruit)return this.handleKingdomAction('recruit-target',{id:f.id});
    this.updateUI(dayState(this.elapsed));this.ui.showRecruitmentBubble?.(snapshot);return true;
  },
  constructionWorkRate(job){return constructionWorkRate(this,job);},
  onConstructionQueued(job){constructionQueued(this,job);this.discoverGuide('build');if(job.type!=='shelter')this.discoverGuide(job.type==='palisade'?'walls':job.type);},
  createConstructionSite(job){
    const place=job.placement,ruin=place.ruinId&&this.camps.find(c=>c.id===place.ruinId&&c.destroyed);
    let camp;
    if(ruin){camp=ruin;Object.assign(camp,{team:'ally',destroyed:false,underConstruction:true,constructionProgress:0,hp:140,maxHp:140,gateHp:0,buildings:{},buildingPlacements:{},stock:{food:0,reeds:0},spawnTimer:0,supplyMigrated:true});this.world.updateShelter(camp.mesh,{...camp,storage:this.campStorage(camp)});}
    else camp=this.addCamp({id:`camp-${++this.idCounter}`,name:`Κάστρο ${this.realms?.active+1||1} · ${this.camps.filter(completed).length+1}`,x:place.x,z:place.z,yaw:place.yaw||0,team:'ally',hp:140,maxHp:140,gateHp:0,tier:1,underConstruction:true,constructionProgress:0,originalEnemy:false,buildings:{}});
    return camp;
  },
  completeConstruction(job){
    const c=this.camps.find(c=>c.id===(job.siteId||job.campId));if(!c||c.destroyed||c.team!=='ally')return false;
    const type=job.type;
    if(type==='shelter'){
      if(!c.underConstruction)return false;c.underConstruction=false;c.constructionProgress=1;c.maxHp=350;c.hp=350;c.gateHp=gateMaxHealth(c);this.stats.campsBuilt++;
      for(const f of this.allies())if(!f.home)f.home=c.id;
    }else if(type==='upgrade'){
      if(c.tier>=3)return false;const gateBefore=gateMaxHealth(c);c.tier++;c.maxHp+=150;c.hp=Math.min(c.maxHp,c.hp+180);c.gateHp=Math.min(gateMaxHealth(c),(c.gateHp||0)+gateMaxHealth(c)-gateBefore);
    }else if(type==='repair'){c.hp=Math.min(c.maxHp,c.hp+150);c.gateHp=Math.min(gateMaxHealth(c),(c.gateHp||0)+120);}
    else{
      if(c.buildings[type])return false;c.buildings[type]=true;if(job.placement?.local){c.buildingPlacements??={};c.buildingPlacements[type]={...job.placement.local};}
      if(type==='nursery')c.spawnTimer=0;
      if(type==='palisade'){c.maxHp+=180;c.hp+=180;c.gateHp=Math.min(gateMaxHealth(c),(c.gateHp||0)+140);delete c.buildingPlacements?.palisade;}
    }
    this.world.updateShelter(c.mesh,{...c,storage:this.campStorage(c)});
    for(const f of this.frogs)if(!f.dead&&distance(f,c)<SHELTER_RADIUS+4){Object.assign(f,clearFortPosition(c,f));if(f.grounded)f.y=this.world.sampleHeight(f.x,f.z);}
    this.ui.toast(`${BUILDINGS[type].name}: ολοκληρώθηκε στο ${c.name}.`,'success');this.audio.play?.('build');return true;
  },
  travelToRealm(targetIndex){
    const source=this.createSaveData(),party=splitRealmParty(this),travellers=party.travelers.map(f=>clean(f,ACTOR_SAVE_FIELDS));
    const result=completeRealmTravel(this,targetIndex,{sourceSnapshot:source,travelingIds:party.travelerIds});
    if(!result.ok){this.ui.toast(result.reason,'warning');return false;}
    const destination=result.snapshot,realms=clone(this.realms),player=clean(this.player,ACTOR_SAVE_FIELDS),resources={...this.resources};
    const homes=destination?.camps?.filter(completed)||[],safe=homes[0]?gatePoint(homes[0],-5.5):{x:0,z:0};
    Object.assign(player,safe);player.home=null;
    const frogs=[...(destination?.frogs||[]),...travellers.map((f,i)=>({...f,x:safe.x+Math.sin(i*2.4)*(3+Math.sqrt(i)),z:safe.z+Math.cos(i*2.4)*(3+Math.sqrt(i)),guard:false,order:'follow',home:homes[0]?.id||null,tacticalPath:[],tacticalTargetId:null}))];
    const loading={...(destination||{}),newRealm:!destination,version:SAVE_VERSION,worldRevision:WORLD_REVISION,realms,player,frogs,resources,stats:{...this.stats},campaign:this.campaign,guide:this.guide,tacticalGroups:this.tacticalGroups,idCounter:this.idCounter,elapsed:this.elapsed,balanceRevision:1,nextRaid:this.elapsed+90,graceUntil:this.elapsed+45};
    this.ui.closePanels();this.resetWorld(loading);this.started=true;this.paused=false;this.ended=false;this.player.invulnerable=7;this.input.clear();this.input.lock();this.discoverGuide('frontier');this.save();
    this.ui.toast({icon:'map',label:result.descriptor.name,detail:'Οι προηγούμενες περιοχές, οι φρουρές και τα εργοτάξιά σου διατηρούνται.',tone:'success'});return true;
  },
  respawn(){
    const p=this.player;
    if(p.grabbedBy){p.grabbedBy.grabbed=null;p.grabbedBy.target=null;p.grabbedBy=null;}
    const homes=this.ownedCamps().filter(c=>this.campSafe(c));
    const choices=[...homes.map(c=>gatePoint(c,-5.5)),{x:0,z:0},...this.world.campSites.filter(c=>c.team==='neutral')];
    const danger=point=>Math.min(100,...this.frogs.filter(f=>!f.dead&&!f.surrendered&&f.team.startsWith('enemy')).map(f=>distance(point,f)),...this.predators.filter(f=>!f.dead).map(f=>distance(point,f)));
    const point=choices.find(c=>danger(c)>28)||choices.sort((a,b)=>danger(b)-danger(a))[0]||{x:0,z:0};
    clearCombatFeedback(this);Object.assign(p,{dead:false,hp:p.maxHp*.7,stomach:Math.max(45,p.stomach),stamina:100,vx:0,vz:0,vy:0,grounded:true,invulnerable:10,stun:0,surrendered:false,charge:-1,...point});p.y=this.world.sampleHeight(p.x,p.z);
    this.graceUntil=this.elapsed+20;this.hunt=null;this.deathTimer=0;this.ended=false;this.guideLastPosition={x:p.x,z:p.z};p.model.setOutline(COLORS.player,true);this.updateCamera(.1,true);
    this.ui.toast('Επέστρεψες σε ασφαλές σημείο. Οι απώλειες στρατιωτών και εδαφών παραμένουν.','warning');this.discoverGuide('respawn');this.save();
  },
  handleKingdomAction(action,payload={}){
    if(action==='recruit-close'){
      this.closeRecruitment();if(this.canLockGameplayPointer())this.input.lock?.();return true;
    }
    if(action==='recruit-inspect'){
      const context=this.context(),frog=payload.id?this.frogs.find(f=>f.id===String(payload.id)):context.type==='recruit'?context.entity:null;
      if(frog?.team==='neutral')this.showRecruitment(frog);return true;
    }
    if(action==='guide-open'){
      if(payload.id&&this.guide&&!this.guide.seen.includes(payload.id))this.guide.seen.push(payload.id);
      this.ignoreUnlockUntil=performance.now()+700;this.input.clear?.();this.input.unlock?.();return true;
    }
    if(action==='guide-close'){
      // Live guides do not own pause state; only an explicit Pause/Resume does.
      this._guidePause=null;if(payload.returnMenu==='pause')this.paused=true;
      if(this.guide)this.guide.nextPauseAt=this.elapsed+35;
      if(this.canLockGameplayPointer()&&!payload.returnPanel)this.input.lock?.();this.audio?.setPaused?.(this.paused);this.save();return true;
    }
    if(action==='tutorial-dismiss'){if(this.guide)this.guide.tutorialDismissed=true;this.save();return true;}
    if(action==='craft-target-player'){this.selectedIds.clear();this.updateUI(dayState(this.elapsed));this.ui.renderPanel?.(true);return true;}
    if(action==='recruit-target'||action==='recruit-help'){
      if(this.paused)return true;
      this.updateRecruitmentBubble();
      const id=String(payload.id||payload.targetId||this.activeRecruitId),frog=recruitmentBubbleTarget(this,id);
      if(!frog||frog.id!==this.activeRecruitId){if(!recruitmentBubbleTarget(this))this.closeRecruitment();return true;}
      if(action==='recruit-help'){if(acceptRecruitmentQuest(this,frog))this.ui.toast('Η αποστολή ξεκίνησε. Η νέα πρόοδος θα μετρηθεί από τώρα.','info');}
      else if(this.recruit(frog)){if(this.canLockGameplayPointer())this.input.lock?.();}
      this.updateUI(dayState(this.elapsed));if(this.activeRecruitId)this.ui.showRecruitmentBubble?.(this.recruitmentSnapshot(frog));this.save();return true;
    }
    if(action==='camp-specialization'){if(setCampSpecialization(this,payload.campId,payload.specialization))this.discoverGuide('specialization');}
    else if(action==='craft-equipment'){if(craftEquipment(this,payload))this.discoverGuide('craft');}
    else if(action==='cancel-job')cancelRealmJob(this,payload.jobId);
    else if(action==='realm-travel')return this.travelToRealm(payload.targetIndex??payload.index??payload.realmIndex),true;
    else if(action==='save-group'){
      if(saveTacticalGroup(this,payload.groupId)){if(this.guide)this.guide.groupsSaved++;this.ui.toast('Η επιλεγμένη ομάδα αποθηκεύτηκε. Χρησιμοποίησε 4, 5 ή 6 για επιλογή.','success');this.discoverGuide('groups');}
      else this.ui.toast('Επίλεξε πρώτα τους βατράχους που θέλεις στην ομάδα.','warning');
    }else if(action==='select-group')selectTacticalGroup(this,payload.groupId);
    else if(action==='group-command'){
      const group=this.tacticalGroups?.find(g=>g.id===String(payload.groupId));const ids=group?.ids||[...this.selectedIds];
      if(payload.command==='flank-left'||payload.command==='flank-right'){if(!orderFlank(this,ids,payload.command.endsWith('left')?'left':'right'))this.ui.toast('Επίλεξε ομάδα και στόχευσε αντίπαλο ή πλησίασε εχθρικό κάστρο.','warning');else this.discoverGuide('flank');}
      else this.gangCommand(payload.command,ids);
    }else return false;
    this.updateUI(dayState(this.elapsed));this.ui.renderPanel?.(true);this.save();return true;
  }
};
