import {pictogram} from './visuals.js';

const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const count=value=>Math.max(0,Math.floor(Number(value)||0));
const clip=(value,min,max)=>Math.max(min,Math.min(max,value));

const helpNames={gatheredFood:'Νέα τροφή',gatheredReeds:'Νέα υλικά',kills:'Αντίπαλοι'};
const requirementName=(req,r)=>({renown:'Κύρος',base:'Ασφαλές οχυρό',help:helpNames[r.quest?.kind]||'Βοήθεια'}[req.id]||req.label||req.id);
function pendingReason(r,requirements,canHelp){
  const help=requirements.find(q=>q.id==='help'&&!q.done&&!q.waived);
  if(canHelp)return 'E · Ανάλαβε τη βοήθεια';
  const food=requirements.find(q=>q.id==='food'&&!q.done&&!q.waived);
  if(food)return `Μάζεψε ακόμη ${Math.max(0,count(food.target)-count(food.current))} τροφή`;
  if(help){
    const remaining=Math.max(0,count(help.target)-count(help.current));
    return r.quest?.kind==='kills'?`Νίκησε ακόμη ${remaining} αντιπάλους`:r.quest?.kind==='gatheredReeds'?`Μάζεψε ακόμη ${remaining} νέα υλικά`:`Μάζεψε ακόμη ${remaining} νέα τροφή`;
  }
  const pending=requirements.find(q=>!q.done&&!q.waived);
  if(pending?.id==='renown')return `Φτάσε στο επίπεδο ${count(pending.target)}`;
  if(pending?.id==='base')return 'Ολοκλήρωσε ένα ασφαλές οχυρό';
  return pending?.label||r.reason||'Πλησίασε για ένταξη';
}

/** A food-cost badge, with only the still-pending conditions kept visible. */
export function recruitmentCardMarkup(recruitment={},paused=false){
  const r=recruitment,id=escape(r.targetId??r.id),requirements=r.requirements||[];
  const canHelp=!r.helpAccepted&&(r.helpAvailable||requirements.some(q=>q.id==='help'&&!q.done&&!q.accepted));
  const ready=Boolean(r.canRecruit),action=canHelp?'recruit-help':'recruit-target';
  const food=count(r.cost?.food??requirements.find(q=>q.id==='food')?.target),foodShort=requirements.some(q=>q.id==='food'&&!q.done&&!q.waived);
  const pending=requirements.filter(q=>q.id!=='food'&&!q.done&&!q.waived);
  const actionLabel=canHelp?'Βοήθεια':'Ένταξη',reason=ready?'':pendingReason(r,requirements,canHelp);
  return `<div class="fg-recruit-badge-row"><span class="fg-recruit-food${foodShort?' is-short':''}" role="img" aria-label="${escape(r.name||'Βάτραχος')} · Κόστος ένταξης: ${food} τροφή">${pictogram('fly')}<b>×${food}</b></span><button class="fg-recruit-badge-action" data-action="${action}" data-id="${id}" aria-label="${escape(actionLabel)} · ${escape(r.name||'Βάτραχος')} · E" ${paused||(!canHelp&&!ready)?'disabled':''}><kbd>E</kbd><span>${actionLabel}</span></button></div>${pending.length?`<div class="fg-recruit-conditions">${pending.map(req=>{
    const art=req.id==='help'?({gatheredFood:'forage',gatheredReeds:'reeds',kills:'attack'}[r.quest?.kind]||'recruit'):({renown:'crown',base:'fort'}[req.id]||'warning');
    const label=requirementName(req,r),progress=req.target!=null?`${Math.min(count(req.current),count(req.target))}/${count(req.target)}`:'—';
    return `<span class="fg-recruit-condition" aria-label="${escape(label)} · ${progress}">${pictogram(art)}<span>${escape(label)}</span><b>${progress}</b></span>`;
  }).join('')}</div>`:''}${reason?`<small class="fg-recruit-next">${escape(reason)}</small>`:''}`;
}

function rect(value){
  if(!value)return null;
  const x=Number(value.left??value.x),y=Number(value.top??value.y);
  const right=Number(value.right??x+Number(value.width)),bottom=Number(value.bottom??y+Number(value.height));
  return [x,y,right,bottom].every(Number.isFinite)&&right>x&&bottom>y?{left:x,top:y,right,bottom,width:right-x,height:bottom-y}:null;
}
function subtract(space,block){
  const left=Math.max(space.left,block.left),top=Math.max(space.top,block.top),right=Math.min(space.right,block.right),bottom=Math.min(space.bottom,block.bottom);
  if(right<=left||bottom<=top)return [space];
  return [
    {left:space.left,top:space.top,right:space.right,bottom:top},
    {left:space.left,top:bottom,right:space.right,bottom:space.bottom},
    {left:space.left,top,right:left,bottom},
    {left:right,top,right:space.right,bottom},
  ].map(rect).filter(Boolean);
}

/** Place the complete badge beside the actor. Never crop its costs or add scrolling. */
export function placeRecruitmentCard({anchor,viewport,size={width:176,height:48},occupied=[],margin=10,gap=10}){
  const width=Number(viewport?.width),height=Number(viewport?.height);
  if(!anchor?.visible||![anchor.x,anchor.y,width,height].every(Number.isFinite)||width<100||height<100)return {visible:false};
  const bounds=rect({left:margin,top:margin,right:width-margin,bottom:height-margin});
  if(!bounds)return {visible:false};
  let spaces=[bounds];
  for(const entry of occupied){
    const block=rect(entry);if(!block)continue;
    const expanded={left:block.left-gap,top:block.top-gap,right:block.right+gap,bottom:block.bottom+gap};
    spaces=spaces.flatMap(space=>subtract(space,expanded));
  }
  const preferredWidth=Number(size.width)||176,preferredHeight=Number(size.height)||48;
  const candidates=[];
  for(const space of spaces){
    if(space.width<preferredWidth||space.height<preferredHeight)continue;
    const w=preferredWidth,h=preferredHeight;
    const positions=[{x:anchor.x-w-20,y:anchor.y-h/2},{x:anchor.x+20,y:anchor.y-h/2},{x:anchor.x-w/2,y:anchor.y-h-24},{x:anchor.x-w/2,y:anchor.y+24}];
    for(let index=0;index<positions.length;index++){
      const p=positions[index],left=clip(p.x,space.left,space.right-w),top=clip(p.y,space.top,space.bottom-h);
      const dx=anchor.x-clip(anchor.x,left,left+w),dy=anchor.y-clip(anchor.y,top,top+h);
      // Keep the actual frog and its overhead health label visible.
      const coversAnchor=anchor.x>left-12&&anchor.x<left+w+12&&anchor.y>top-12&&anchor.y<top+h+12;
      const score=Math.hypot(dx,dy)+(preferredWidth-w)*2+(preferredHeight-h)*1.2+index*4+(coversAnchor?10000:0);
      candidates.push({visible:true,left:Math.round(left),top:Math.round(top),width:Math.floor(w),height:Math.floor(h),side:left+w<=anchor.x?'left':left>=anchor.x?'right':top+h<=anchor.y?'above':'below',score});
    }
  }
  candidates.sort((a,b)=>a.score-b.score);
  return candidates[0]||{visible:false};
}
