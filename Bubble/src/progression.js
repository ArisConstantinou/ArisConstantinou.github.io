/* Validated local character progression. No account or network required. */
export const SAVE_KEY='bubble-character-v3';
export const RARITIES=[{n:'COMMON',c:0xcbd5e1,m:1},{n:'MAGIC',c:0x6da8ff,m:1.12},{n:'RARE',c:0xffd45e,m:1.28},{n:'EPIC',c:0xc27cff,m:1.48},{n:'LEGENDARY',c:0xff9b42,m:1.78}];
const ITEM_NAMES={weapon:['Elastic Gumcaster','Siege Gumcaster','Twin-Anchor Nozzle'],armor:['Knight Shell','Sticky Plate','Bounce Guard'],charm:['Gumheart','Stretch Sigil','Forge Core']};
const integer=(v,min,max,fallback=min)=>Number.isFinite(v)?Math.min(max,Math.max(min,Math.floor(v))):fallback;
export function freshProfile(){return{version:3,level:1,xp:0,xpNext:100,gold:0,dust:0,tier:1,unlockedTier:1,skillPoints:0,skills:{power:0,elastic:0,vitality:0},autoForge:false,items:[],equipped:{weapon:null,armor:null,charm:null}};}
export function validateProfile(data){
 if(!data||data.version!==3)return null;const p=freshProfile();
 for(const k of['level','tier','unlockedTier'])p[k]=integer(data[k],1,100);
 p.xpNext=Math.round(100*Math.pow(1.32,p.level-1));p.xp=integer(data.xp,0,p.xpNext-1);p.gold=integer(data.gold,0,1e8);p.dust=integer(data.dust,0,1e6);p.skillPoints=integer(data.skillPoints,0,99);p.autoForge=data.autoForge===true;
 for(const k of Object.keys(p.skills))p.skills[k]=integer(data.skills?.[k],0,99);
 if(p.skillPoints+Object.values(p.skills).reduce((a,b)=>a+b,0)>p.level-1){p.skills={power:0,elastic:0,vitality:0};p.skillPoints=p.level-1;}
 const ids=new Set();for(const x of(Array.isArray(data.items)?data.items:[]).slice(0,120)){
  if(!x||!ITEM_NAMES[x.type]||typeof x.id!=='string'||ids.has(x.id)||x.id.length>80||!/^[a-zA-Z0-9-]+$/.test(x.id))continue;
  const power=integer(x.power,1,10000),type=x.type,rarity=integer(x.rarity,0,4);ids.add(x.id);
  p.items.push({id:x.id,type,name:ITEM_NAMES[type].includes(x.name)?x.name:ITEM_NAMES[type][0],rarity,power,upgrades:integer(x.upgrades,0,100),locked:x.locked===true,color:RARITIES[rarity].c,damage:type==='weapon'?power:0,armor:type==='armor'?power:0,stretch:type==='charm'?Math.round(power*.7):0});
 }
 for(const type of Object.keys(p.equipped)){const id=data.equipped?.[type];if(p.items.some(x=>x.id===id&&x.type===type))p.equipped[type]=id;}
 p.tier=Math.min(p.tier,p.unlockedTier);return p;
}
export class Progression{
 constructor(storage=null){this.storage=storage;this.profile=freshProfile();this.saved=false;this.storageFailed=false;try{const raw=storage?.getItem(SAVE_KEY);if(raw){const p=validateProfile(JSON.parse(raw));if(p){this.profile=p;this.saved=true;}}}catch{this.storageFailed=true;}}
 get p(){return this.profile;}
 save(){if(!this.storage)return false;try{this.storage.setItem(SAVE_KEY,JSON.stringify(this.p));this.saved=true;return true;}catch{this.storageFailed=true;return false;}}
 gear(type){return this.p.items.find(x=>x.id===this.p.equipped[type])||null;}
 stats(){return{maxHp:100+(this.gear('armor')?.armor||0)+10*this.p.skills.vitality,damage:(this.gear('weapon')?.damage||0),power:1+.08*this.p.skills.power,stretch:Math.min(2,1+(this.gear('charm')?.stretch||0)/100+.08*this.p.skills.elastic)};}
 xp(amount){this.p.xp+=Math.max(0,Math.floor(amount));let levels=0;while(this.p.xp>=this.p.xpNext&&this.p.level<100){this.p.xp-=this.p.xpNext;this.p.level++;this.p.skillPoints++;this.p.xpNext=Math.round(100*Math.pow(1.32,this.p.level-1));levels++;}this.save();return levels;}
 item(boss=false,rng=Math.random){const roll=rng(),rarity=boss?4:roll<.04?4:roll<.13?3:roll<.31?2:roll<.62?1:0,type=['weapon','armor','charm'][Math.min(2,Math.floor(rng()*3))],power=Math.round((5+this.p.level*2+this.p.tier+Math.floor(rng()*8))*RARITIES[rarity].m);return{id:Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,11),type,name:ITEM_NAMES[type][Math.min(2,Math.floor(rng()*3))],rarity,power,upgrades:0,locked:false,color:RARITIES[rarity].c,damage:type==='weapon'?power:0,armor:type==='armor'?power:0,stretch:type==='charm'?Math.round(power*.7):0};}
 pickup(item){if(this.p.items.length>=120)return false;this.p.items.push(item);this.p.gold+=8+item.rarity*5;this.p.dust+=2+item.rarity;this.save();return true;}
 equip(id){const x=this.p.items.find(x=>x.id===id);if(!x)return false;this.p.equipped[x.type]=x.id;this.save();return true;}
 spendSkill(k){if(!(k in this.p.skills)||this.p.skillPoints<1)return false;this.p.skillPoints--;this.p.skills[k]++;this.save();return true;}
 isEquipped(x){return Object.values(this.p.equipped).includes(x.id);}
 plan(baseId,feedId){const base=this.p.items.find(x=>x.id===baseId),feed=this.p.items.find(x=>x.id===feedId),cost=base?10+5*base.upgrades:10;
  let error='';if(this.p.level<2&&this.p.unlockedTier<2)error='Το Forge ξεκλειδώνει στο LV 2.';else if(!base||!feed||base===feed)error='Διάλεξε δύο διαφορετικά items.';else if(this.isEquipped(feed)||feed.locked)error='Το υλικό είναι EQUIPPED ή LOCKED.';else if(this.p.dust<2||this.p.gold<cost)error='Απαιτούνται 2 Dust και '+cost+' Gold.';
  return{base,feed,cost,dust:2,gain:feed?Math.max(2,Math.round(feed.power*.30)):0,error};
 }
 forge(baseId,feedId){const plan=this.plan(baseId,feedId);if(plan.error)return plan;const b=plan.base;b.power+=plan.gain;b.upgrades++;b.damage=b.type==='weapon'?b.power:0;b.armor=b.type==='armor'?b.power:0;b.stretch=b.type==='charm'?Math.round(b.power*.7):0;this.p.items=this.p.items.filter(x=>x.id!==plan.feed.id);this.p.gold-=plan.cost;this.p.dust-=2;this.save();return plan;}
 auto(){if(!this.p.autoForge)return null;const base=this.gear('weapon')||[...this.p.items].sort((a,b)=>b.power-a.power)[0];if(!base)return null;
  const feed=[...this.p.items].filter(x=>x.id!==base.id&&!this.isEquipped(x)&&!x.locked&&x.rarity<3&&x.power<base.power).sort((a,b)=>a.power-b.power)[0];if(!feed)return null;const plan=this.plan(base.id,feed.id);return plan.error?null:this.forge(base.id,feed.id);
 }
 complete(){this.p.unlockedTier=Math.max(this.p.unlockedTier,this.p.tier+1);this.save();}
}
