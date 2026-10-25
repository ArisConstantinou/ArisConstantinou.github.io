const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const count=value=>Math.max(0,Math.floor(Number(value)||0));
const clip=(value,min,max)=>Math.max(min,Math.min(max,value));

/** A short, actionable contract; the controller still validates every action. */
export function recruitmentCardMarkup(recruitment={},paused=false){
  const r=recruitment,id=escape(r.targetId??r.id),requirements=r.requirements||[];
  const canHelp=!r.helpAccepted&&(r.helpAvailable||requirements.some(q=>q.id==='help'&&!q.done&&!q.accepted));
  const ready=Boolean(r.canRecruit),action=canHelp?'recruit-help':'recruit-target';
  const labels={food:'Τροφή',renown:'Κύρος αρχηγού',base:'Ασφαλές κάστρο',help:{gatheredFood:'Μάζεψε τροφή',gatheredReeds:'Μάζεψε υλικά',kills:'Νίκησε αντιπάλους'}[r.quest?.kind]||'Βοήθεια'};
  const food=count(r.cost?.food),actionLabel=canHelp?'Ανάλαβε βοήθεια':ready?`Ένταξη · ${food?food+' τροφή':'δωρεάν'}`:'Εκκρεμούν απαιτήσεις';
  return `<header class="fg-recruit-mini-heading"><div><strong>${escape(r.name||'Βάτραχος')}</strong><small>Απαιτήσεις ένταξης${r.level?' · Επ. '+count(r.level):''}</small></div><button data-action="recruit-close" aria-label="Κλείσιμο απαιτήσεων" title="Κλείσιμο · Esc">×</button></header>
    <ul class="fg-recruit-mini-requirements">${requirements.map(req=>{
      const met=Boolean(req.done??req.met);
      const note=req.waived?'Καλύπτεται από το κύρος σου':req.id==='help'&&!req.accepted?'Μετά την αποδοχή της βοήθειας':'';
      return `<li class="${met?'is-met':'is-pending'}"><span class="fg-recruit-mini-check" aria-label="${met?'Έτοιμο':'Εκκρεμεί'}">${met?'✓':'○'}</span><span><strong>${escape(labels[req.id]||req.label||req.id)}</strong>${note?`<small>${escape(note)}</small>`:''}</span><b>${req.waived?'✓':req.target!=null?count(req.current)+' / '+count(req.target):met?'✓':'—'}</b></li>`;
    }).join('')||'<li class="is-met"><span class="fg-recruit-mini-check">✓</span><span>Έτοιμος για ένταξη</span></li>'}</ul>
    <footer class="fg-recruit-mini-footer"><button data-action="${action}" data-id="${id}" ${paused||(!canHelp&&!ready)?'disabled':''}><span>${escape(actionLabel)}</span>${canHelp||ready?'<kbd>E</kbd>':''}</button></footer>`;
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

/** Find a clear rectangle beside the actor, shrinking into a scrollable card on small screens. */
export function placeRecruitmentCard({anchor,viewport,size={width:248,height:224},occupied=[],margin=10,gap=10}){
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
  const preferredWidth=Math.min(248,Number(size.width)||248),preferredHeight=Math.min(270,Number(size.height)||224);
  const minWidth=Math.min(190,bounds.width),minHeight=Math.min(112,bounds.height);
  const candidates=[];
  for(const space of spaces){
    if(space.width<minWidth||space.height<minHeight)continue;
    const w=Math.min(preferredWidth,space.width),h=Math.min(preferredHeight,space.height);
    const positions=[{x:anchor.x-w-20,y:anchor.y-h+26},{x:anchor.x+20,y:anchor.y-h+26},{x:anchor.x-w/2,y:anchor.y-h-24},{x:anchor.x-w/2,y:anchor.y+24}];
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
