import {recruitmentOffer} from './squad-rules.js';

const number=(v,d=0)=>Number.isFinite(Number(v))?Number(v):d;
const limit=(v,a,b)=>Math.max(a,Math.min(b,number(v)));
const hash=text=>[...String(text)].reduce((n,c)=>Math.imul(n^c.charCodeAt(0),16777619)>>>0,2166136261);
const labels={food:'Τροφή για την ένταξη',help:'Μικρή αποστολή βοήθειας',renown:'Κύρος αρχηγού',base:'Ασφαλές ολοκληρωμένο κάστρο'};
const questTypes=['gatheredFood','gatheredReeds','kills'];

export function normalizeRecruitment(value){
  if(!value||value.version!==1)return null;
  const requirements=[...new Set((value.requirements||[]).filter(k=>Object.hasOwn(labels,k)))];
  const q=value.quest||{};
  return {version:1,requirements,encounterLevel:limit(value.encounterLevel,1,99),unitLevel:limit(value.unitLevel,1,99),food:Math.round(limit(value.food,4,120)),rank:Math.round(limit(value.rank,1,99)),quest:{kind:questTypes.includes(q.kind)?q.kind:'gatheredFood',target:Math.round(limit(q.target,1,40)),accepted:!!q.accepted,baseline:limit(q.baseline,0,1e9)}};
}

/** Terms are rolled once from identity and encounter level, then saved. */
export function ensureRecruitment(game,frog){
  if(frog.recruitment)return frog.recruitment;
  const level=game.player?.level||1,unitLevel=frog.level||1,seed=hash(`${frog.id}:${level}`),first=!!frog.firstRecruit;
  const requirements=['food'],pool=['help','renown','base'];
  if(first)requirements.push('help');
  else {
    const count=1+(unitLevel>=4?1:0)+(unitLevel>=9?1:0);
    for(let i=0;i<count;i++)requirements.push(pool[(seed+i)%pool.length]);
  }
  const kind=first?'gatheredFood':questTypes[(seed>>>5)%questTypes.length];
  frog.recruitment={version:1,requirements,encounterLevel:level,unitLevel,food:first?8:8+unitLevel*3+(seed%5),rank:Math.max(1,unitLevel+(seed%3)),quest:{kind,target:kind==='kills'?1+Math.floor(unitLevel/4):first?6:6+Math.min(20,unitLevel*2),accepted:false,baseline:0}};
  return frog.recruitment;
}

export function acceptRecruitmentQuest(game,frog){
  if(!frog||frog.dead||frog.team!=='neutral')return false;
  const profile=ensureRecruitment(game,frog);
  if(!profile.requirements.includes('help')||profile.quest.accepted)return false;
  profile.quest.accepted=true;profile.quest.baseline=number(game.stats?.[profile.quest.kind]);
  return true;
}

export function realmRecruitmentOffer(game,frog,camp=null){
  const original=recruitmentOffer(frog,camp);
  if(!original.eligible||!game.campaign?.endless||frog.team!=='neutral')return {...original,requirements:[],ready:original.eligible,instant:original.guaranteed&&original.cost.food===0};
  const profile=ensureRecruitment(game,frog),level=game.player?.level||1,advantage=level-profile.unitLevel;
  const instant=advantage>=10,discount=limit(Math.max(0,advantage)/10,0,1);
  const cost={food:instant?0:Math.ceil(profile.food*(1-discount))};
  const safeBases=(game.ownedCamps?.()||[]).filter(c=>!c.underConstruction&&(game.campSafe?.(c)??true));
  const quest=profile.quest,questProgress=quest.accepted?Math.max(0,number(game.stats?.[quest.kind])-quest.baseline):0;
  const questLabel=quest.kind==='kills'?`Νίκησε ${quest.target} αντιπάλους για να τον βοηθήσεις`:quest.kind==='gatheredReeds'?`Συγκέντρωσε ${quest.target} νέα υλικά μετά την αποδοχή`:`Συγκέντρωσε ${quest.target} νέα τροφή μετά την αποδοχή`;
  const requirements=profile.requirements.map(id=>{
    const waived=instant||(id!=='food'&&advantage>=6);
    const target=id==='food'?cost.food:id==='renown'?profile.rank:id==='base'?1:quest.target;
    const current=id==='food'?Math.floor(number(game.resources?.food)):id==='renown'?level:id==='base'?safeBases.length:questProgress;
    const done=waived||(id==='help'?quest.accepted&&current>=target:current>=target);
    return {id,label:id==='help'?questLabel:labels[id],current,target,done,waived,accepted:id==='help'?quest.accepted:undefined,detail:waived?'Η φήμη σου καλύπτει την απαίτηση':id==='help'&&!quest.accepted?'Αποδέξου πρώτα την αποστολή':`${Math.min(current,target)} / ${target}`};
  });
  const ready=requirements.every(r=>r.done),pending=requirements.find(r=>!r.done);
  return {eligible:true,guaranteed:true,cost,requirements,ready,instant,discount,reason:instant?'Το κύρος σου αρκεί — άμεση δωρεάν ένταξη':ready?`${cost.food} τροφή · οι όροι εκπληρώθηκαν`:pending?.label||'Όροι στρατολόγησης',quest:{...quest,progress:questProgress,label:questLabel},unitLevel:profile.unitLevel};
}
