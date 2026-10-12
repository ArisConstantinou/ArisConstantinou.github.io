export const BAG_LIMIT=24;
export const LOOT_PATHS={
 staff:'M5 22 15 6M12 8l6 3M15 6l-3-3 4-2 5 4-2 4-4-3Z',
 robe:'M9 3h6l2 3 5 3-3 5-3-2 3 10H5l3-10-3 2-3-5 5-3 2-3ZM9 3l3 5 3-5M12 8v12',
 amulet:'M5 2c0 8 14 8 14 0M12 8l5 7-5 7-5-7 5-7ZM7 15h10',
 ring:'M8 8a8 8 0 1 0 8 0M8 3h8l2 3-6 6-6-6 2-3ZM8 3l4 9 4-9',
 health:'M9 2h6v5l4 4v9l-2 2H7l-2-2v-9l4-4V2ZM9 6h6M8 14h8M12 10v8',
 mana:'M9 2h6v5l4 4v9l-2 2H7l-2-2v-9l4-4V2ZM9 6h6M13 10l-3 5h4l-3 4'
};
export const TIERS=[null,{name:'Κοινό',color:'#aebbbf'},{name:'Ενισχυμένο',color:'#82d79b'},{name:'Σπάνιο',color:'#77baff'},{name:'Επικό',color:'#c79bff'},{name:'Θρυλικό',color:'#ffc46b'}];
export const SLOTS={staff:'Ράβδος',robe:'Μανδύας',amulet:'Φυλαχτό',ring:'Δαχτυλίδι'};
export const KINDS={...SLOTS,health:'Φίλτρο ζωής',mana:'Φίλτρο ενέργειας'};
export const STAT_LABELS={health:'Μέγιστη ζωή',mana:'Μέγιστη ενέργεια',damage:'Μαγική ζημιά',armor:'Μείωση ζημιάς',speed:'Ταχύτητα κίνησης',regen:'Ενέργεια / δευτ.',cooldown:'Μείωση αναμονής'};
export const isPotion=item=>item?.kind==='health'||item?.kind==='mana';
const integer=(n,min,max,fallback=min)=>typeof n==='number'&&Number.isFinite(n)?Math.max(min,Math.min(max,Math.floor(n))):fallback;
export function itemStats(item){
 if(!item)return {};const l=item.level,r=item.roll||0;
 if(item.kind==='staff')return {damage:.07*l,...(l>=2?{mana:4*l}:{}),...(l>=4?{regen:.5*l}:{}),...(r===1?{cooldown:.01*l}:r===2?{health:3*l}:{})};
 if(item.kind==='robe')return {health:18*l,...(l>=2?{armor:.02*l}:{}),...(l>=4?{mana:5*l}:{}),...(r===1?{regen:.3*l}:r===2?{speed:.008*l}:{})};
 if(item.kind==='amulet')return {mana:12*l,...(l>=2?{regen:.8*l}:{}),...(l>=4?{health:6*l}:{}),...(r===1?{damage:.015*l}:r===2?{cooldown:.008*l}:{})};
 if(item.kind==='ring')return {speed:.02*l,...(l>=2?{cooldown:.02*l}:{}),...(l>=4?{damage:.025*l}:{}),...(r===1?{health:4*l}:r===2?{mana:4*l}:{})};
 return {};
}
export const statText=(key,value)=>['damage','armor','speed','cooldown'].includes(key)?`${Math.round(value*100)}%`:`${Number(value.toFixed(1))}`;
export const itemName=item=>`${KINDS[item.kind]}${isPotion(item)?'':[' του εξόριστου',' των ρούνων',' της αυγής'][item.roll||0]}`;
export const salvageValue=item=>isPotion(item)?item.level:2+item.level*2;
export function freshLoot(){return {version:1,items:[],equipped:{},nextId:1};}
export function hydrateLoot(raw){
 const loot=freshLoot();if(raw?.version!==1)return loot;
 const ids=new Set();
 for(const item of Array.isArray(raw.items)?raw.items:[]){
  if(loot.items.length>=BAG_LIMIT)break;
  if(!item||!Object.hasOwn(KINDS,item.kind)||!Number.isInteger(item.id)||item.id<1||item.id>1e9||ids.has(item.id))continue;
  ids.add(item.id);loot.items.push({id:item.id,kind:item.kind,level:integer(item.level,1,5),roll:integer(item.roll,0,2),count:isPotion(item)?integer(item.count,1,99):1});
 }
 loot.nextId=Math.max(integer(raw.nextId,1,1e9),...loot.items.map(i=>i.id+1));
 for(const slot of Object.keys(SLOTS)){const item=loot.items.find(i=>i.id===raw.equipped?.[slot]&&i.kind===slot);if(item)loot.equipped[slot]=item.id;}
 return loot;
}
export function equipmentStats(loot){
 const totals={health:0,mana:0,damage:0,armor:0,speed:0,regen:0,cooldown:0};
 for(const [slot,id] of Object.entries(loot.equipped)){
  const item=loot.items.find(i=>i.id===id&&i.kind===slot);for(const [key,v] of Object.entries(itemStats(item)))totals[key]+=v;
 }
 totals.cooldown=Math.min(.3,totals.cooldown);totals.armor=Math.min(.3,totals.armor);return totals;
}
export function rollLoot(kind,random=Math.random){
 const levelRoll=random(),boss=kind==='boss',heavy=kind==='heavy';
 const level=boss?(levelRoll<.2?3:levelRoll<.8?4:5):heavy?(levelRoll<.5?2:levelRoll<.9?3:4):(levelRoll<.65?1:levelRoll<.93?2:3);
 const options=boss?Object.keys(SLOTS):['staff','robe','amulet','ring','health','mana','health','mana'];
 return {kind:options[Math.min(options.length-1,Math.floor(random()*options.length))],level,roll:Math.min(2,Math.floor(random()*3)),count:1};
}
