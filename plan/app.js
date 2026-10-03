import { worldRings, unionAreas, validOutline, polygonBounds } from './geometry.mjs';
import {heightCm,HEIGHT_TYPES,doorOnWall} from './architecture.mjs';
const $ = id => document.getElementById(id);
const KEY = 'nk-plan-builder-v1';
const TYPES = {
  room: { name:'Χώρος', icon:'▱', w:220, h:150, color:'#e2e9ee' },
  ramp: { name:'Ράμπα', icon:'≋', w:190, h:300, color:'#e9dfc5' },
  wall: { name:'Τοίχος', icon:'━', w:240, h:14, color:'#344955' },
  door: { name:'Πόρτα', icon:'⌒', w:80, h:80, color:'#3686b4' },
  window: { name:'Παράθυρο', icon:'⊞', w:100, h:15, color:'#90b5c4' },
  stairs: { name:'Σκάλα', icon:'▤', w:120, h:200, color:'#d7ded8' },
  ac: { name:'Μονάδα AC', icon:'▥', w:65, h:35, color:'#c8d4da' },
  route: { name:'Βέλος με σημεία', icon:'↗', w:180, h:180, color:'#cc761f' },
  marker: { name:'Αριθμός', icon:'①', w:46, h:46, color:'#176d92' },
  note: { name:'Σημείωση', icon:'☷', w:220, h:75, color:'#eef0d9' },
  text: { name:'Κείμενο', icon:'T', w:220, h:50, color:'#253e46' }
};
const uid = () => crypto.randomUUID();
const clone = value => JSON.parse(JSON.stringify(value));
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const round = n => Math.round(n * 10) / 10;
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const normalAngle = n => ((n + 180) % 360 + 360) % 360 - 180;
function makeItem(type,x,y,w,h,label,number='',color) { return { id:uid(),type,x,y,w:w??TYPES[type].w,h:h??TYPES[type].h,rotation:0,label:label??TYPES[type].name,number:String(number),color:color??TYPES[type].color,floor:'basement',locked:false,hidden:false,labelOffsetX:0,labelOffsetY:0,numberOffsetX:0,numberOffsetY:0 }; }
function starter() {
  return { schema:'nk-plan-builder/v1', title:'NK · Ράμπα & υπόγειο', schematic:true, units:'schematic-units', floors:[{id:'basement',name:'Υπόγειο'}], activeFloor:'basement', notes:'Ευθεία από τη ράμπα είναι αδιέξοδο. Στροφή αριστερά προς ταμείο και μπλε πόρτα. Διαστάσεις ενδεικτικές. Η σύνδεση της εσωτερικής σκάλας παραμένει προς διευκρίνιση.', items:[
    makeItem('room',260,220,740,180,'Χώρος φόρτωσης'),
    makeItem('room',100,200,155,250,'Αποθήκη','6','#dce9d7'),
    makeItem('room',310,400,340,145,'Ταμείο / ξύλινο χώρισμα','4','#efd5af'),
    makeItem('ramp',780,400,220,330,'Ράμπα','1'),
    makeItem('wall',780,204,220,16,'Τοίχος / αδιέξοδο','2'),
    makeItem('door',228,267,80,80,'Μπλε πόρτα','5'),
    makeItem('route',430,298,460,280,'Στροφή αριστερά','3'),
    makeItem('note',100,615,450,85,'7 · Εσωτερική σκάλα: θέση / σύνδεση προς διευκρίνιση. Δεν τοποθετείται αυθαίρετα.','', '#f5f5e7')
  ]};
}
function validate(raw) {
  if (!raw || raw.schema !== 'nk-plan-builder/v1' || !Array.isArray(raw.floors) || !raw.floors.length || raw.floors.length>30 || !Array.isArray(raw.items) || raw.items.length>1000) throw Error('Μη έγκυρο αρχείο NK Plan Builder.');
  const floorIds=new Set();
  const floors=raw.floors.map(f=>{if(typeof f.id!=='string'||!f.id||f.id.length>80||floorIds.has(f.id)||typeof f.name!=='string'||!f.name.trim()||f.name.length>100)throw Error('Μη έγκυρα επίπεδα.');floorIds.add(f.id);return {id:f.id,name:f.name};});
  const ids=new Set();
  const items=raw.items.map(i=>{
    if(!i || !TYPES[i.type] || typeof i.id!=='string' || !i.id || i.id.length>80 || ids.has(i.id) || !floorIds.has(i.floor)) throw Error('Μη έγκυρο τμήμα.');
    for(const k of ['x','y','w','h','rotation'])if(typeof i[k]!=='number'||!Number.isFinite(i[k])||Math.abs(i[k])>100000)throw Error('Μη έγκυρες διαστάσεις.');
    if(i.w<8||i.h<8||typeof i.label!=='string'||i.label.length>240||typeof i.number!=='string'||i.number.length>8||!/^#[a-f\d]{6}$/i.test(i.color))throw Error('Μη έγκυρες ιδιότητες.');
    const offsets={};for(const key of ['labelOffsetX','labelOffsetY','numberOffsetX','numberOffsetY']){const n=i[key]??0;if(typeof n!=='number'||!Number.isFinite(n)||Math.abs(n)>100000)throw Error('Μη έγκυρη θέση κειμένου.');offsets[key]=n;}
    if(i.labelFontSize!==undefined&&(typeof i.labelFontSize!=='number'||!Number.isFinite(i.labelFontSize)||i.labelFontSize<8||i.labelFontSize>200))throw Error('Μη έγκυρο μέγεθος κειμένου.');
    const route={};if(i.type==='route'){
      if(i.points!==undefined){if(!Array.isArray(i.points)||i.points.length<2||i.points.length>500||i.points.some(p=>!p||typeof p.x!=='number'||typeof p.y!=='number'||!Number.isFinite(p.x)||!Number.isFinite(p.y)||p.x<0||p.x>1||p.y<0||p.y>1))throw Error('Μη έγκυρα σημεία βέλους.');route.points=i.points.map(p=>({x:p.x,y:p.y}));}
      if(i.arrowHead!==undefined&&!['end','both','none'].includes(i.arrowHead))throw Error('Μη έγκυρη αιχμή βέλους.');
      if(i.strokeWidth!==undefined&&(typeof i.strokeWidth!=='number'||!Number.isFinite(i.strokeWidth)||i.strokeWidth<2||i.strokeWidth>24))throw Error('Μη έγκυρο πάχος βέλους.');
      if(i.routeStyle!==undefined&&!['polyline','freehand'].includes(i.routeStyle))throw Error('Μη έγκυρο σχέδιο βέλους.');
      for(const key of ['arrowHead','strokeWidth','routeStyle'])if(i[key]!==undefined)route[key]=i[key];
    }
    if(i.outline!==undefined&&(i.type!=='room'||!validOutline(i.outline)))throw Error('Μη έγκυρο περίγραμμα χώρου.');
    if(i.heightCm!==undefined&&(!Number.isFinite(i.heightCm)||i.heightCm<20||i.heightCm>10000))throw Error('Το ύψος πρέπει να είναι από 20 έως 10.000 cm.');
    if(i.attachment!==undefined&&(i.type!=='door'||typeof i.attachment.roomId!=='string'||i.attachment.roomId.length>80||!Number.isInteger(i.attachment.ring)||i.attachment.ring<0||i.attachment.ring>49||!Number.isInteger(i.attachment.edge)||i.attachment.edge<0||i.attachment.edge>799||!Number.isFinite(i.attachment.t)||i.attachment.t<0||i.attachment.t>1))throw Error('Μη έγκυρη σύνδεση πόρτας.');
    ids.add(i.id);return {id:i.id,type:i.type,x:i.x,y:i.y,w:i.w,h:i.h,rotation:normalAngle(i.rotation),label:i.label,number:i.number,color:i.color,floor:i.floor,locked:!!i.locked,hidden:!!i.hidden,...offsets,...route,...(i.labelFontSize!==undefined?{labelFontSize:i.labelFontSize}:{}),...(i.outline?{outline:clone(i.outline)}:{}),...(i.showDimensions?{showDimensions:true}:{}),...(i.heightCm!==undefined?{heightCm:i.heightCm}:{}),...(i.attachment?{attachment:clone(i.attachment)}:{})};
  });
  const measurement=raw.measurement;
  if(measurement&&(!Number.isFinite(measurement.cmPerUnit)||measurement.cmPerUnit<=0||measurement.cmPerUnit>1e7||!['m','cm'].includes(measurement.unit)))throw Error('Μη έγκυρη κλίμακα διαστάσεων.');
  return {schema:'nk-plan-builder/v1',title:typeof raw.title==='string'?raw.title.slice(0,100):'Κάτοψη',schematic:!measurement,units:measurement?measurement.unit:'schematic-units',floors,activeFloor:floorIds.has(raw.activeFloor)?raw.activeFloor:floors[0].id,notes:typeof raw.notes==='string'?raw.notes.slice(0,5000):'',items,...(measurement?{measurement:{cmPerUnit:measurement.cmPerUnit,unit:measurement.unit,showBuilding:!!measurement.showBuilding}}:{})};
}
let plan=starter(), restoreError='';
try { const cached=localStorage.getItem(KEY); if(cached)plan=validate(JSON.parse(cached)); } catch { restoreError='Το προηγούμενο σχέδιο δεν φορτώθηκε. Το αρχικό σχέδιο είναι διαθέσιμο.'; }
let threeView=null,is3D=false,threeLoading=false;
let selected=new Set(), selectedText=null, selectedVertex=null, draft=null, mode='select', grid=true, snap=true, space=false, multiSelect=false;
let view={x:0,y:0,w:1200,h:850}, baseWidth=1200, gesture=null;
let history=[JSON.stringify(plan)], historyIndex=0, saveTimer, toastTimer;
const visible=()=>plan.items.filter(i=>i.floor===plan.activeFloor&&!i.hidden);
const selection=()=>plan.items.filter(i=>selected.has(i.id));
const movable=()=>selection().filter(i=>!i.locked);
const serialize=()=>JSON.stringify(plan);
function notify(text,delay=4800){ $('toast').textContent=text;$('toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').hidden=true,delay); }
function autosave(){ $('save-status').textContent='Αποθήκευση…';clearTimeout(saveTimer);saveTimer=setTimeout(()=>{try{localStorage.setItem(KEY,serialize());$('save-status').textContent='Αποθηκεύτηκε τοπικά';}catch{$('save-status').textContent='Χρειάζεται εξαγωγή JSON';notify('Δεν υπάρχει διαθέσιμος χώρος στον browser. Χρησιμοποίησε εξαγωγή JSON.');}},200); }
function record(){try{detachMovedDoors(JSON.parse(history[historyIndex]));reconcileDoors();}catch(e){plan=JSON.parse(history[historyIndex]);notify(e.message);autosave();render();return;}const json=serialize();if(history[historyIndex]===json)return;history=history.slice(0,historyIndex+1);history.push(json);if(history.length>100)history.shift();historyIndex=history.length-1;autosave();}
function change(fn){const before=serialize();fn();try{detachMovedDoors(JSON.parse(before));reconcileDoors();}catch(e){plan=JSON.parse(before);notify(e.message);render();return;}record();render();}
function undo(){if(draft){setMode('select');return;}if(historyIndex>0){plan=JSON.parse(history[--historyIndex]);selected.clear();selectedText=null;selectedVertex=null;autosave();render();}}
function redo(){if(historyIndex<history.length-1){plan=JSON.parse(history[++historyIndex]);selected.clear();selectedText=null;selectedVertex=null;autosave();render();}}
function point(event){ const p=$('canvas').createSVGPoint();p.x=event.clientX;p.y=event.clientY;return p.matrixTransform($('canvas').getScreenCTM().inverse()); }
function snapTo(n){return snap?Math.round(n/10)*10:round(n);}
function rotateVector(x,y,degrees){const a=degrees*Math.PI/180;return {x:x*Math.cos(a)-y*Math.sin(a),y:x*Math.sin(a)+y*Math.cos(a)};}
// Points are stored relative to the item bounds. Existing L arrows remain editable.
function routePoints(i){return (i.points??[{x:1,y:1},{x:1,y:0},{x:0,y:0}]).map(p=>({x:(p.x-.5)*i.w,y:(p.y-.5)*i.h}));}
function setRoutePoints(i,points,original=i){
  const xs=points.map(p=>p.x),ys=points.map(p=>p.y),left=Math.min(...xs),top=Math.min(...ys),w=Math.max(8,Math.max(...xs)-left),h=Math.max(8,Math.max(...ys)-top);
  const offset=rotateVector(left+w/2,top+h/2,original.rotation);
  i.x=original.x+original.w/2+offset.x-w/2;i.y=original.y+original.h/2+offset.y-h/2;i.w=w;i.h=h;
  i.points=points.map(p=>({x:(p.x-left)/w,y:(p.y-top)/h}));
}
function arrowMarkup(points,color,width=7,head='end',hit=false){
  if(!points.length)return '';const d=points.map((p,n)=>`${n?'L':'M'} ${p.x} ${p.y}`).join(' ');
  let html=hit?`<path d="${d}" fill="none" stroke="transparent" stroke-width="20" vector-effect="non-scaling-stroke"/>`:'';
  html+=`<path class="route-line" d="${d}" stroke="${color}" stroke-width="${width}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  function tip(end,step){const p=points[end];let n=end+step;while(n>=0&&n<points.length&&Math.hypot(p.x-points[n].x,p.y-points[n].y)<.01)n+=step;if(n<0||n>=points.length)return '';const a=Math.atan2(p.y-points[n].y,p.x-points[n].x),length=Math.max(18,width*3.5),spread=length*.52,bx=p.x-Math.cos(a)*length,by=p.y-Math.sin(a)*length;return `<path class="route-head" d="M ${p.x} ${p.y} L ${bx-Math.sin(a)*spread} ${by+Math.cos(a)*spread} L ${bx+Math.sin(a)*spread} ${by-Math.cos(a)*spread} Z" fill="${color}"/>`;}
  if(head!=='none')html+=tip(points.length-1,-1);if(head==='both')html+=tip(0,1);return html;
}
function simplifyStroke(points,tolerance){
  if(points.length<3)return points;const keep=new Set([0,points.length-1]),stack=[[0,points.length-1]];
  while(stack.length){const [a,b]=stack.pop(),p=points[a],q=points[b],dx=q.x-p.x,dy=q.y-p.y,den=dx*dx+dy*dy;let far=-1,distance=tolerance*tolerance;
    for(let n=a+1;n<b;n++){const r=points[n],t=den?clamp(((r.x-p.x)*dx+(r.y-p.y)*dy)/den,0,1):0,d=(r.x-p.x-t*dx)**2+(r.y-p.y-t*dy)**2;if(d>distance){distance=d;far=n;}}
    if(far>=0){keep.add(far);stack.push([a,far],[far,b]);}
  }return [...keep].sort((a,b)=>a-b).map(n=>points[n]);
}
function finishDraft(){
  if(!draft)return;let points=draft.points;if(draft.kind==='freehand')points=simplifyStroke(points,view.w/$('canvas').getBoundingClientRect().width*1.5);
  if(points.length<2){draft=null;render();return;}if(plan.items.length>=1000){draft=null;setMode('select');return notify('Το όριο είναι 1.000 τμήματα ανά σχέδιο.');}
  const kind=draft.kind,i=makeItem('route',0,0,8,8,'');i.floor=plan.activeFloor;i.routeStyle=kind==='freehand'?'freehand':'polyline';i.arrowHead='end';i.strokeWidth=7;setRoutePoints(i,points,{x:-4,y:-4,w:8,h:8,rotation:0});
  draft=null;selectedVertex=null;mode='select';change(()=>{plan.items.push(i);selected=new Set([i.id]);selectedText=null;});syncModeButtons();
}
function cancelDraft(){draft=null;renderCanvas();}
function routeSelection(){const i=selection()[0];return selection().length===1&&i?.type==='route'?i:null;}
function addRouteBend(index,commit=true){const i=routeSelection();if(!i||i.locked)return false;if(routePoints(i).length>=500){notify('Μέχρι 500 σημεία ανά βέλος.');return false;}const edit=()=>{const points=routePoints(i);if(index===undefined){index=selectedVertex?.id===i.id?Math.min(selectedVertex.index,points.length-2):points.slice(1).reduce((best,p,n)=>Math.hypot(p.x-points[n].x,p.y-points[n].y)>Math.hypot(points[best+1].x-points[best].x,points[best+1].y-points[best].y)?n:best,0);}const a=points[index],b=points[index+1];points.splice(index+1,0,{x:(a.x+b.x)/2,y:(a.y+b.y)/2});setRoutePoints(i,points);selectedVertex={id:i.id,index:index+1};};if(commit)change(edit);else edit();return true;}
function removeRoutePoint(){const i=routeSelection();if(!i||i.locked||selectedVertex?.id!==i.id)return;if(routePoints(i).length<=2)return notify('Το βέλος χρειάζεται τουλάχιστον δύο σημεία.');change(()=>{const points=routePoints(i);points.splice(selectedVertex.index,1);setRoutePoints(i,points);selectedVertex=null;});}
function corners(item){const cx=item.x+item.w/2,cy=item.y+item.h/2;return [[-1,-1],[1,-1],[1,1],[-1,1]].map(([sx,sy])=>{const v=rotateVector(sx*item.w/2,sy*item.h/2,item.rotation);return {x:cx+v.x,y:cy+v.y};});}
function bounds(items){const c=items.flatMap(i=>i.outline?worldRings(i).flat():corners(i));if(!c.length)return {x:0,y:0,w:1200,h:850};const x=Math.min(...c.map(p=>p.x)),y=Math.min(...c.map(p=>p.y));return {x,y,w:Math.max(...c.map(p=>p.x))-x,h:Math.max(...c.map(p=>p.y))-y};}
function visualBounds(){const pts=[];for(const el of $('canvas').querySelectorAll('.plan-item,.building-dimensions')){const b=el.getBBox(),m=el.transform.baseVal.consolidate()?.matrix??$('canvas').createSVGMatrix();for(const [x,y] of [[b.x,b.y],[b.x+b.width,b.y],[b.x+b.width,b.y+b.height],[b.x,b.y+b.height]])pts.push({x:m.a*x+m.c*y+m.e,y:m.b*x+m.d*y+m.f});}if(!pts.length)return bounds([]);const x=Math.min(...pts.map(p=>p.x)),y=Math.min(...pts.map(p=>p.y));return {x,y,w:Math.max(...pts.map(p=>p.x))-x,h:Math.max(...pts.map(p=>p.y))-y};}
function fit(){if(is3D){threeView?.fit();return;}const b=visualBounds();const rect=$('canvas').getBoundingClientRect();const ratio=rect.width/Math.max(rect.height,1);let w=b.w+180,h=b.h+220;if(w/h<ratio)w=h*ratio;else h=w/ratio;view={x:b.x+b.w/2-w/2,y:b.y+b.h/2-h/2,w,h};baseWidth=w;renderCanvas();}
function zoom(factor,p){if(is3D){threeView?.zoom(factor);return;}const centre=p??{x:view.x+view.w/2,y:view.y+view.h/2};const newW=clamp(view.w*factor,120,50000),actual=newW/view.w;view={x:centre.x+(view.x-centre.x)*actual,y:centre.y+(view.y-centre.y)*actual,w:newW,h:view.h*actual};renderCanvas();}
function linesFor(text,w,font,maxLines=4){const limit=Math.max(7,Math.floor(w/(font*.58))),words=text.split(/\s+/),lines=[];let line='';for(const word of words){if(line && (line+' '+word).length>limit){lines.push(line);line=word;}else line+=(line?' ':'')+word;}if(line)lines.push(line);return lines.slice(0,maxLines);}
function boundText(item,field,markup){return `<g class="bound-text" data-bound-text="${field}" data-owner="${esc(item.id)}" role="button" aria-label="${field==='label'?'Κείμενο':'Αριθμός'}: ${esc(item[field])}" transform="translate(${item[field+'OffsetX']??0} ${item[field+'OffsetY']??0})" pointer-events="${mode==='text'?'all':'none'}">${markup}</g>`;}
function labelMarkup(item){if(item.type==='marker')return '';const w=item.w,h=item.h;let x=0,y=item.type==='room'?Math.min(h/4,30):0,font=clamp(Math.min(w/9,h/4),12,20),anchor='middle';if(item.type==='wall'||item.type==='window'){font=14;y=-h/2-11;}else if(item.type==='door'){font=14;y=h/2+23;}else if(item.type==='route'){font=16;x=w/2-18;y=-h/2+70;anchor='end';}else if(item.type==='ramp'){x=-w/2+17;anchor='start';}font=item.labelFontSize??font;const lines=linesFor(item.label,Math.max(w-35,100),font,item.type==='note'?5:3);const baseline=y-(lines.length-1)*font*.62;let out='';if(item.label){let text=`<text text-anchor="${anchor}" fill="${item.type==='text'?esc(item.color):'#253e46'}" font-size="${font}" font-family="Segoe UI,Arial,sans-serif">`;lines.forEach((line,i)=>text+=`<tspan x="${x}" y="${baseline+i*font*1.25}">${esc(line)}</tspan>`);out+=boundText(item,'label',text+'</text>');}if(item.number){const nx=item.type==='wall'?0:item.type==='route'?w/2:-w/2+25,ny=item.type==='wall'?-h/2-52:item.type==='route'?-h/2:-h/2+25;out+=boundText(item,'number',`<circle cx="${nx}" cy="${ny}" r="18" fill="#176d92" stroke="white" stroke-width="2"/><text x="${nx}" y="${ny+6}" text-anchor="middle" fill="white" font-family="Segoe UI,Arial,sans-serif" font-size="17">${esc(item.number)}</text>`);}return out;}
function itemMarkup(i){const w=i.w,h=i.h,x=-w/2,y=-h/2,c=esc(i.color);let body='';
  if(['room','ramp','stairs','note','ac'].includes(i.type))body=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${i.type==='note'?8:2}" fill="${c}" stroke="${i.type==='note'?'#cbcdb7':'#5d7380'}" stroke-width="${i.type==='note'?1:2.5}" vector-effect="non-scaling-stroke"/>`;
  if(i.type==='room'&&i.outline)body=`<path class="area-outline" d="${i.outline.map(r=>r.map((p,n)=>`${n?'L':'M'} ${(p.x-.5)*w} ${(p.y-.5)*h}`).join(' ')+' Z').join(' ')}" fill="${c}" fill-rule="evenodd" stroke="#5d7380" stroke-width="2.5" vector-effect="non-scaling-stroke"/>`;
  if(i.type==='ramp')for(let s=1;s<9;s++)body+=`<line x1="${x+3}" x2="${w/2-3}" y1="${y+s*h/9}" y2="${y+s*h/9}" stroke="#c2b592" stroke-width="1"/>`;
  if(i.type==='stairs')for(let s=1;s<12;s++)body+=`<line x1="${x}" x2="${w/2}" y1="${y+s*h/12}" y2="${y+s*h/12}" stroke="#829588" stroke-width="1.5"/>`;
  if(i.type==='ac')for(let s=1;s<7;s++)body+=`<line x1="${x+8}" x2="${w/2-8}" y1="${y+s*h/7}" y2="${y+s*h/7}" stroke="#718b97" stroke-width="1.5"/>`;
  if(i.type==='wall')body=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
  if(i.type==='window')body=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" stroke="#4b788c" stroke-width="2"/><line x1="${x}" x2="${w/2}" y1="0" y2="0" stroke="white" stroke-width="2"/>`;
  if(i.type==='door')body=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" opacity=".09"/><path d="M ${x} ${h/2} L ${x} ${y} M ${x} ${y} A ${w} ${h} 0 0 1 ${w/2} ${h/2}" fill="none" stroke="${c}" stroke-width="3"/><line x1="${x}" y1="${h/2}" x2="${w/2}" y2="${h/2}" stroke="${c}" stroke-width="5"/>`;
  if(i.type==='route')body=arrowMarkup(routePoints(i),c,i.strokeWidth??7,i.arrowHead??'end',true);
  if(i.type==='marker')body=`<ellipse rx="${w/2}" ry="${h/2}" fill="${c}" stroke="white" stroke-width="2"/>`+boundText(i,'number',`<text y="7" text-anchor="middle" fill="white" font-size="22" font-family="Segoe UI,Arial,sans-serif">${esc(i.number)}</text>`);
  if(i.type==='text')body=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="transparent"/>`;
  return `<g class="plan-item ${i.locked?'is-locked':''}" data-id="${esc(i.id)}" data-type="${i.type}" data-x="${i.x}" data-y="${i.y}" data-w="${w}" data-h="${h}" data-rotation="${i.rotation}" tabindex="0" role="button" aria-label="${esc(`${i.label}${i.number?' · '+i.number:''}`)}" transform="translate(${i.x+w/2} ${i.y+h/2}) rotate(${i.rotation})">${body}${labelMarkup(i)}${i.showDimensions&&plan.measurement?dimensionMarkup({x:-w/2,y:-h/2,w,h},false):''}</g>`;
}
function selectionMarkup(){if(selectedText)return '';const items=selection().filter(i=>i.floor===plan.activeFloor&&!i.hidden),s=view.w/$('canvas').getBoundingClientRect().width;if(!items.length)return '';if(items.length>1){const b=bounds(items);return `<rect x="${b.x-6*s}" y="${b.y-6*s}" width="${b.w+12*s}" height="${b.h+12*s}" fill="none" stroke="#137c71" stroke-width="1.5" stroke-dasharray="5 3" vector-effect="non-scaling-stroke" pointer-events="none"/>`;}
  const i=items[0],w=i.w,h=i.h;let html=`<g transform="translate(${i.x+w/2} ${i.y+h/2}) rotate(${i.rotation})"><rect x="${-w/2-4*s}" y="${-h/2-4*s}" width="${w+8*s}" height="${h+8*s}" fill="none" stroke="#137c71" stroke-width="1.5" vector-effect="non-scaling-stroke" pointer-events="none"/>`;
  if(!i.locked){const hit=innerWidth<=850?15:7;for(const [sx,sy] of [[-1,-1],[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1],[-1,0]]){const gap=i.type==='route'?20*s:0,px=sx*(w/2+gap),py=sy*(h/2+gap);html+=`<rect class="handle" data-handle="resize" data-sx="${sx}" data-sy="${sy}" x="${px-hit*s}" y="${py-hit*s}" width="${hit*2*s}" height="${hit*2*s}" fill="transparent"/><rect x="${px-5*s}" y="${py-5*s}" width="${10*s}" height="${10*s}" rx="${s}" fill="white" stroke="#137c71" stroke-width="1.5" vector-effect="non-scaling-stroke" pointer-events="none"/>`;}
  const rotateGap=i.type==='route'?58:38;html+=`<line x1="0" y1="${-h/2-7*s}" x2="0" y2="${-h/2-(rotateGap-6)*s}" stroke="#137c71" vector-effect="non-scaling-stroke" pointer-events="none"/><circle class="rotation-handle" data-handle="rotate" cx="0" cy="${-h/2-rotateGap*s}" r="${hit*s}" fill="transparent"/><circle cx="0" cy="${-h/2-rotateGap*s}" r="${7*s}" fill="white" stroke="#137c71" stroke-width="1.5" vector-effect="non-scaling-stroke" pointer-events="none"/>`;
  if(i.type==='route'){const pts=routePoints(i),radius=innerWidth<=850?18:10;
    pts.slice(1).forEach((p,n)=>{const a=pts[n];if(Math.hypot(p.x-a.x,p.y-a.y)/s<38)return;html+=`<g class="route-midpoint" data-route-midpoint="${n}"><circle cx="${(p.x+a.x)/2}" cy="${(p.y+a.y)/2}" r="${radius*s}" fill="transparent"/><circle cx="${(p.x+a.x)/2}" cy="${(p.y+a.y)/2}" r="${6*s}" fill="#e1f1ed" stroke="#137c71" vector-effect="non-scaling-stroke" pointer-events="none"/><text x="${(p.x+a.x)/2}" y="${(p.y+a.y)/2+4*s}" text-anchor="middle" font-size="${12*s}" fill="#137c71" pointer-events="none">+</text></g>`;});
    pts.forEach((p,n)=>html+=`<g class="route-node" data-route-point="${n}" role="button" aria-label="Σημείο βέλους ${n+1}"><circle cx="${p.x}" cy="${p.y}" r="${radius*s}" fill="transparent"/><circle cx="${p.x}" cy="${p.y}" r="${7*s}" fill="${selectedVertex?.id===i.id&&selectedVertex.index===n?'#137c71':'white'}" stroke="#137c71" stroke-width="2" vector-effect="non-scaling-stroke" pointer-events="none"/></g>`);
  }}return html+'</g>';
}
function renderCanvas(){const canvas=$('canvas');canvas.setAttribute('viewBox',`${view.x} ${view.y} ${view.w} ${view.h}`);canvas.classList.toggle('pan-mode',mode==='pan'||space);canvas.classList.toggle('text-mode',mode==='text');canvas.classList.toggle('draw-mode',mode==='route'||mode==='freehand');let html=`<defs><pattern id="grid-small" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 H 0 V 10" fill="none" stroke="#e0e7e7" stroke-width=".65"/></pattern><pattern id="grid-large" width="100" height="100" patternUnits="userSpaceOnUse"><rect width="100" height="100" fill="url(#grid-small)"/><path d="M 100 0 H 0 V 100" fill="none" stroke="#cbd8d8" stroke-width=".8"/></pattern></defs><rect data-background="true" x="-100000" y="-100000" width="200000" height="200000" fill="${grid?'url(#grid-large)':'#f2f5f5'}"/>`;html+=visible().map(itemMarkup).join('');html+=buildingDimensions();html+=selectionMarkup();
  if(draft){const pts=[...draft.points];if(draft.hover&&draft.kind==='points')pts.push(draft.hover);html+=`<g id="route-preview" pointer-events="none" opacity=".8">${arrowMarkup(pts,TYPES.route.color)}${draft.points.map(p=>`<circle cx="${p.x}" cy="${p.y}" r="${5*view.w/canvas.getBoundingClientRect().width}" fill="white" stroke="#cc761f" vector-effect="non-scaling-stroke"/>`).join('')}</g>`;}
  if(gesture?.type==='marquee'){const b=gesture.box;html+=`<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="#147b7218" stroke="#147b72" stroke-width="1" vector-effect="non-scaling-stroke" pointer-events="none"/>`;}canvas.innerHTML=html;if(selectedText){const group=[...canvas.querySelectorAll('.bound-text')].find(el=>el.dataset.owner===selectedText.id&&el.dataset.boundText===selectedText.field);if(group){const b=group.getBBox(),s=view.w/canvas.getBoundingClientRect().width;group.insertAdjacentHTML('beforeend',`<rect x="${b.x-5*s}" y="${b.y-5*s}" width="${b.width+10*s}" height="${b.height+10*s}" fill="none" stroke="#137c71" stroke-dasharray="4 3" stroke-width="1.5" vector-effect="non-scaling-stroke" pointer-events="none"/>`);}}
  $('zoom-label').textContent=Math.round(baseWidth/view.w*100)+'%';$('empty-tip').hidden=visible().length>0||!!draft;$('canvas-hint').textContent=mode==='route'?'Πάτησε αρχή, γωνίες και τέλος · Enter / Τέλος για ολοκλήρωση · Esc για ακύρωση':mode==='freehand'?'Σύρε για να σχεδιάσεις βέλος · αφήνοντας ολοκληρώνεται':mode==='text'?'Πάτησε ή σύρε οποιοδήποτε κείμενο · Delete αφαιρεί μόνο το κείμενο':routeSelection()?'Σύρε τους κύκλους για σημεία · + για νέα γωνία · Delete για επιλεγμένο σημείο':'Σύρε για μετακίνηση · γωνίες για μέγεθος · κύκλος για περιστροφή';
  $('draw-actions').hidden=!['route','freehand'].includes(mode);$('finish-route').disabled=!draft||draft.points.length<2;$('draw-instructions').hidden=!['route','freehand'].includes(mode);$('draw-instructions').textContent=mode==='route'?'Πάτησε αρχή, γωνίες, τέλος · μετά ✓ Τέλος':'Σύρε για σχεδίαση · άφησε για ολοκλήρωση';
}
function renderLayers(){const items=plan.items.filter(i=>i.floor===plan.activeFloor);$('item-count').textContent=items.length;$('layers').innerHTML=items.slice().reverse().map(i=>`<div class="layer ${selected.has(i.id)?'selected':''}"><button class="layer-main" data-layer="${esc(i.id)}" aria-label="Επιλογή ${esc(i.label||TYPES[i.type].name)}"><span class="layer-number">${esc(i.number||TYPES[i.type].icon)}</span><span class="layer-label">${esc(i.label||TYPES[i.type].name)}</span></button><button class="layer-icon" data-visibility="${esc(i.id)}" aria-label="${i.hidden?'Εμφάνιση':'Απόκρυψη'} ${esc(i.label)}">${i.hidden?'○':'◉'}</button><button class="layer-icon" data-lock-item="${esc(i.id)}" aria-label="${i.locked?'Ξεκλείδωμα':'Κλείδωμα'} ${esc(i.label)}">${i.locked?'▣':'▫'}</button></div>`).join('');}
function updateFields(){const i=selection()[0];if(!i)return;for(const [key,field] of Object.entries({label:'prop-label',number:'prop-number',color:'prop-color',x:'prop-x',y:'prop-y',w:'prop-w',h:'prop-h',rotation:'prop-rotation',floor:'prop-floor'}))if(document.activeElement!==$(field))$(field).value=i[key];$('route-properties').hidden=i.type!=='route';if(i.type==='route'){$('route-head').value=i.arrowHead??'end';$('route-width').value=i.strokeWidth??7;$('route-point-count').textContent=routePoints(i).length+' σημεία';for(const id of ['route-head','route-width','add-bend','reverse-route'])$(id).disabled=i.locked;$('remove-point').disabled=i.locked||selectedVertex?.id!==i.id||routePoints(i).length<=2;}}
function renderProperties(){const items=selection(),text=selectedText&&plan.items.find(i=>i.id===selectedText.id);$('nothing-selected').hidden=items.length>0;$('text-properties').hidden=!text;$('properties').hidden=items.length!==1||!!text;$('multi-properties').hidden=items.length<2||!!text;$('selection-summary').textContent=items.length?items.length===1?(items[0].label||TYPES[items[0].type].name):`${items.length} επιλεγμένα τμήματα`:'Κανένα τμήμα επιλεγμένο';if(text){const f=selectedText.field;$('text-type-title').textContent=f==='number'?'Αριθμός χώρου':'Κείμενο χώρου';$('text-content').maxLength=f==='number'?8:240;$('text-content').value=text[f];$('text-offset-x').value=text[f+'OffsetX']??0;$('text-offset-y').value=text[f+'OffsetY']??0;$('text-font-size').value=text.labelFontSize??20;$('text-font-size').disabled=f==='number'||text.locked;$('door-text-properties').hidden=text.type!=='door';$('door-text-angle').value=text.rotation;$('door-text-angle').disabled=text.locked;$('rotate-door-text').disabled=text.locked;for(const id of ['text-content','text-offset-x','text-offset-y','delete-text','reset-text-position'])$(id).disabled=text.locked;return;}if(items.length===1){const i=items[0];$('type-title').textContent=TYPES[i.type].name;$('prop-floor').innerHTML=plan.floors.map(f=>`<option value="${esc(f.id)}">${esc(f.name)}</option>`).join('');updateFields();$('lock').textContent=i.locked?'Ξεκλείδωμα':'Κλείδωμα';for(const id of ['prop-x','prop-y','prop-w','prop-h','prop-rotation','apply-scale','rotate-90'])$(id).disabled=i.locked;}$('multi-title').textContent=items.length+' τμήματα';}
function render(){const validIds=new Set(plan.items.filter(i=>!i.hidden&&i.floor===plan.activeFloor).map(i=>i.id));selected=new Set([...selected].filter(id=>validIds.has(id)));if(selectedText&&!validIds.has(selectedText.id))selectedText=null;$('plan-name').value=plan.title;$('floor-select').innerHTML=plan.floors.map(f=>`<option value="${esc(f.id)}">${esc(f.name)}</option>`).join('');$('floor-select').value=plan.activeFloor;$('undo').disabled=historyIndex===0;$('redo').disabled=historyIndex===history.length-1;renderCanvas();renderLayers();renderProperties();renderMeasurements();syncThree();}
function selectItem(id,additive=false){selectedText=null;selectedVertex=null;if(additive){if(selected.has(id))selected.delete(id);else selected.add(id);}else selected=new Set([id]);render();}
function addItem(type,centre){if(plan.items.length>=1000)return notify('Το όριο είναι 1.000 τμήματα ανά σχέδιο.');const p=centre??{x:view.x+view.w/2,y:view.y+view.h/2};const meta=TYPES[type];const i=makeItem(type,snapTo(p.x-meta.w/2),snapTo(p.y-meta.h/2));i.floor=plan.activeFloor;if(['room','ramp','stairs','marker'].includes(type)){const nums=plan.items.map(o=>Number(o.number)||0);i.number=String(Math.max(0,...nums)+1);}if(type==='text')i.labelFontSize=20;change(()=>{plan.items.push(i);selected=new Set([i.id]);selectedText=null;});}
function deleteText(){if(!selectedText)return;const i=plan.items.find(i=>i.id===selectedText.id);if(i.locked)return;change(()=>{i[selectedText.field]='';selectedText=null;});}
function removeSelected(){if(selectedText)return deleteText();if(selectedVertex&&routeSelection()?.id===selectedVertex.id)return removeRoutePoint();if(!selection().length)return;change(()=>{plan.items=plan.items.filter(i=>!selected.has(i.id));selected.clear();selectedVertex=null;});}
function duplicate(){if(selectedText){const i=plan.items.find(i=>i.id===selectedText.id),field=selectedText.field,newItem=makeItem('text',i.x+30,i.y+30,220,50,i[field]);newItem.floor=i.floor;newItem.labelFontSize=i.labelFontSize??20;change(()=>{plan.items.push(newItem);selected=new Set([newItem.id]);selectedText=null;});return;}const list=selection();if(!list.length)return;change(()=>{const copies=list.map(i=>({...clone(i),id:uid(),x:i.x+30,y:i.y+30,locked:false}));for(const copy of copies)delete copy.attachment;plan.items.push(...copies);selected=new Set(copies.map(i=>i.id));});}
function scaleSelected(factor){const items=movable();if(!items.length||!Number.isFinite(factor)||factor<.1||factor>10)return notify('Χρησιμοποίησε συντελεστή από 0,1 έως 10.');const b=bounds(items),cx=b.x+b.w/2,cy=b.y+b.h/2;if(items.some(i=>i.w*factor<8||i.h*factor<8||i.w*factor>100000||i.h*factor>100000))return notify('Οι διαστάσεις πρέπει να είναι από 8 έως 100.000 μονάδες.');change(()=>items.forEach(i=>{const icx=i.x+i.w/2,icy=i.y+i.h/2;i.w=round(i.w*factor);i.h=round(i.h*factor);i.x=round(cx+(icx-cx)*factor-i.w/2);i.y=round(cy+(icy-cy)*factor-i.h/2);}));}
function rotateSelected(){const items=movable();if(!items.length)return;const b=bounds(items),cx=b.x+b.w/2,cy=b.y+b.h/2;change(()=>items.forEach(i=>{const r=rotateVector(i.x+i.w/2-cx,i.y+i.h/2-cy,90);i.x=round(cx+r.x-i.w/2);i.y=round(cy+r.y-i.h/2);i.rotation=normalAngle(i.rotation+90);}));}
function reorder(front){const ids=new Set(selected);change(()=>{const group=plan.items.filter(i=>ids.has(i.id)),rest=plan.items.filter(i=>!ids.has(i.id));plan.items=front?[...rest,...group]:[...group,...rest];});}
const compactUI=matchMedia('(max-width:850px),(pointer:coarse)');
function updatePanelButtons(){document.querySelectorAll('[data-open-panel],[data-toggle-panel]').forEach(b=>b.setAttribute('aria-expanded',compactUI.matches?$(b.dataset.openPanel||b.dataset.togglePanel).classList.contains('open'):!document.querySelector('.workspace').classList.contains((b.dataset.openPanel||b.dataset.togglePanel)+'-collapsed')));}
function openPanel(id){if(compactUI.matches)document.querySelectorAll('.sidebar,.inspector').forEach(el=>el.classList.toggle('open',el.id===id&&!el.classList.contains('open')));else document.querySelector('.workspace').classList.toggle(id+'-collapsed');updatePanelButtons();}
function finishGesture(cancel=false){if(!gesture)return;const g=gesture;gesture=null;const canvas=$('canvas');if(canvas.hasPointerCapture(g.pointer))canvas.releasePointerCapture(g.pointer);if(g.type==='draw-freehand'){if(cancel)cancelDraft();else finishDraft();return;}if(cancel && g.before){plan=JSON.parse(g.before);render();return;}if(g.type==='marquee'){const b=g.box;if(!g.additive)selected.clear();for(const i of visible()){const ib=bounds([i]);if(ib.x>=b.x&&ib.y>=b.y&&ib.x+ib.w<=b.x+b.w&&ib.y+ib.h<=b.y+b.h)selected.add(i.id);}}else if(g.before)record();render();}
const touchPointers=new Map();let touchView=null,touchDraft=null;
function beginTouchView(){
  const points=[...touchPointers.values()].slice(0,2),mid={clientX:(points[0].x+points[1].x)/2,clientY:(points[0].y+points[1].y)/2},r=$('canvas').getBoundingClientRect();
  touchView={view:clone(view),anchor:point(mid),x:mid.clientX,y:mid.clientY,distance:Math.max(1,Math.hypot(points[1].x-points[0].x,points[1].y-points[0].y)),scale:Math.max(view.w/r.width,view.h/r.height)};
}
function endTouchPointer(e){
  touchPointers.delete(e.pointerId);if(!touchView)return false;
  if($('canvas').hasPointerCapture(e.pointerId))$('canvas').releasePointerCapture(e.pointerId);
  if(touchPointers.size>=2)beginTouchView();else if(!touchPointers.size){touchView=null;touchDraft=null;}
  return true;
}
$('canvas').addEventListener('pointerdown',e=>{
  if(e.button!==0&&e.button!==1)return;
  if(e.pointerType==='touch'){
    if(!touchPointers.size)touchDraft=clone(draft);touchPointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(touchPointers.size>=2){if(gesture)finishGesture(true);draft=clone(touchDraft);for(const id of touchPointers.keys())$('canvas').setPointerCapture(id);beginTouchView();renderCanvas();return;}
    if(touchView){$('canvas').setPointerCapture(e.pointerId);return;}
  }else e.preventDefault();
  if(gesture)finishGesture();const p=point(e);$('canvas').focus({preventScroll:true});$('canvas').setPointerCapture(e.pointerId);
  if(mode==='pan'||space||e.button===1){gesture={type:'pan',start:p,view:clone(view),clientX:e.clientX,clientY:e.clientY,pointer:e.pointerId};return;}
  if(mode==='route'){const q={x:snapTo(p.x),y:snapTo(p.y)};if(!draft)draft={kind:'points',points:[]};const last=draft.points.at(-1);if(!last||Math.hypot(q.x-last.x,q.y-last.y)>.01){if(draft.points.length>=500)return notify('Μέχρι 500 σημεία ανά βέλος. Πάτησε Τέλος.');draft.points.push(q);}draft.hover=null;renderCanvas();return;}
  if(mode==='freehand'){draft={kind:'freehand',points:[{x:p.x,y:p.y}]};gesture={type:'draw-freehand',pointer:e.pointerId};renderCanvas();return;}
  const routeHandle=e.target.closest('[data-route-point],[data-route-midpoint]');if(routeHandle){const i=routeSelection();if(!i||i.locked)return;const before=serialize();if(routeHandle.dataset.routeMidpoint!==undefined&&!addRouteBend(Number(routeHandle.dataset.routeMidpoint),false))return;const index=routeHandle.dataset.routePoint!==undefined?Number(routeHandle.dataset.routePoint):Number(routeHandle.dataset.routeMidpoint)+1;selectedVertex={id:i.id,index};gesture={type:'route-point',original:clone(i),points:routePoints(i),index,before,pointer:e.pointerId};renderProperties();renderCanvas();return;}
  const text=e.target.closest('[data-bound-text]');if(mode==='text'&&text){const i=plan.items.find(i=>i.id===text.dataset.owner);selected=new Set([i.id]);selectedText={id:i.id,field:text.dataset.boundText};render();if(!i.locked)gesture={type:'textmove',start:p,original:clone(i),field:selectedText.field,before:serialize(),pointer:e.pointerId};return;}
  const handle=e.target.closest('[data-handle]');if(handle){const i=selection()[0];if(!i||i.locked)return;const original=clone(i),cx=i.x+i.w/2,cy=i.y+i.h/2;gesture={type:handle.dataset.handle,start:p,original,before:serialize(),sx:Number(handle.dataset.sx),sy:Number(handle.dataset.sy),angle:Math.atan2(p.y-cy,p.x-cx)*180/Math.PI,pointer:e.pointerId};return;}
  const target=e.target.closest('[data-id]');if(target){const id=target.dataset.id;if(e.shiftKey||multiSelect){selectItem(id,true);return;}if(!selected.has(id))selectItem(id);const items=movable();if(items.length)gesture={type:'move',start:p,originals:clone(items),before:serialize(),pointer:e.pointerId};return;}
  if(e.pointerType==='touch'&&!multiSelect){gesture={type:'pan',start:p,view:clone(view),clientX:e.clientX,clientY:e.clientY,pointer:e.pointerId,blank:true,moved:false};return;}
  gesture={type:'marquee',start:p,box:{x:p.x,y:p.y,w:0,h:0},additive:e.shiftKey,pointer:e.pointerId};selectedText=null;if(!e.shiftKey)selected.clear();render();
});
$('canvas').addEventListener('pointermove',e=>{
  if(touchPointers.has(e.pointerId))touchPointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(touchView){
    if(touchPointers.size>=2){const [a,b]=[...touchPointers.values()],g=touchView,mx=(a.x+b.x)/2,my=(a.y+b.y)/2,factor=clamp(g.view.w*g.distance/Math.max(1,Math.hypot(b.x-a.x,b.y-a.y)),120,50000)/g.view.w;view={x:g.anchor.x+(g.view.x-g.anchor.x)*factor-(mx-g.x)*g.scale*factor,y:g.anchor.y+(g.view.y-g.anchor.y)*factor-(my-g.y)*g.scale*factor,w:g.view.w*factor,h:g.view.h*factor};renderCanvas();}return;
  }
  if(mode==='route'&&draft&&!gesture){const p=point(e);draft.hover={x:snapTo(p.x),y:snapTo(p.y)};renderCanvas();return;}
  if(!gesture||gesture.pointer!==e.pointerId)return;const g=gesture,p=point(e);if(g.type==='pan'){if(Math.hypot(e.clientX-g.clientX,e.clientY-g.clientY)>6)g.moved=true;const rect=$('canvas').getBoundingClientRect();const scale=g.view.w/rect.width;view.x=g.view.x-(e.clientX-g.clientX)*scale;view.y=g.view.y-(e.clientY-g.clientY)*scale;renderCanvas();return;}
  if(g.type==='draw-freehand'){const last=draft.points.at(-1),spacing=view.w/$('canvas').getBoundingClientRect().width*3;if(Math.hypot(p.x-last.x,p.y-last.y)>=spacing){if(draft.points.length<500)draft.points.push({x:p.x,y:p.y});else draft.points[draft.points.length-1]={x:p.x,y:p.y};}renderCanvas();return;}
  if(g.type==='route-point'){const o=g.original,i=plan.items.find(i=>i.id===o.id),local=rotateVector(p.x-o.x-o.w/2,p.y-o.y-o.h/2,-o.rotation),pts=clone(g.points);pts[g.index]={x:snapTo(local.x),y:snapTo(local.y)};setRoutePoints(i,pts,o);}
  if(g.type==='textmove'){const delta=rotateVector(p.x-g.start.x,p.y-g.start.y,-g.original.rotation),i=plan.items.find(i=>i.id===g.original.id);i[g.field+'OffsetX']=round((g.original[g.field+'OffsetX']??0)+snapTo(delta.x));i[g.field+'OffsetY']=round((g.original[g.field+'OffsetY']??0)+snapTo(delta.y));}
  if(g.type==='move'){const dx=snapTo(p.x-g.start.x),dy=snapTo(p.y-g.start.y);for(const old of g.originals){const i=plan.items.find(i=>i.id===old.id);i.x=round(old.x+dx);i.y=round(old.y+dy);}}
  if(g.type==='rotate'){const o=g.original,cx=o.x+o.w/2,cy=o.y+o.h/2;let angle=o.rotation+Math.atan2(p.y-cy,p.x-cx)*180/Math.PI-g.angle;if(e.shiftKey)angle=Math.round(angle/15)*15;plan.items.find(i=>i.id===o.id).rotation=round(normalAngle(angle));}
  if(g.type==='resize'){const o=g.original,i=plan.items.find(i=>i.id===o.id),delta=rotateVector(p.x-g.start.x,p.y-g.start.y,-o.rotation);let dw=g.sx?snapTo(delta.x)*g.sx:0,dh=g.sy?snapTo(delta.y)*g.sy:0;let w=clamp(o.w+dw,8,100000),h=clamp(o.h+dh,8,100000);if(e.shiftKey&&g.sx&&g.sy){const f=Math.abs(dw/o.w)>Math.abs(dh/o.h)?w/o.w:h/o.h;w=clamp(o.w*f,8,100000);h=clamp(o.h*f,8,100000);}const offset=rotateVector(g.sx*(w-o.w)/2,g.sy*(h-o.h)/2,o.rotation);i.w=round(w);i.h=round(h);i.x=round(o.x+o.w/2+offset.x-w/2);i.y=round(o.y+o.h/2+offset.y-h/2);}
  if(g.type==='marquee')g.box={x:Math.min(p.x,g.start.x),y:Math.min(p.y,g.start.y),w:Math.abs(p.x-g.start.x),h:Math.abs(p.y-g.start.y)};renderCanvas();updateFields();
});
$('canvas').addEventListener('pointerup',e=>{if(endTouchPointer(e))return;if(gesture?.pointer===e.pointerId){if(gesture.blank&&!gesture.moved){selected.clear();selectedText=null;}if(gesture.type==='draw-freehand'&&draft.points.length<500){const p=point(e),last=draft.points.at(-1);if(Math.hypot(p.x-last.x,p.y-last.y)>.01)draft.points.push({x:p.x,y:p.y});}finishGesture();}});
$('canvas').addEventListener('pointercancel',e=>{if(!endTouchPointer(e))finishGesture(true);});
$('canvas').addEventListener('lostpointercapture',()=>{if(gesture)finishGesture();});
$('canvas').addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY>0?1.12:1/1.12,point(e));},{passive:false});
$('canvas').addEventListener('dblclick',e=>{if(mode==='route'){finishDraft();return;}if(e.target.closest('[data-id]')){if(innerWidth<=850)openPanel('inspector');$(selectedText?'text-content':'prop-label').focus();}});
$('canvas').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const id=e.target.closest('[data-id]')?.dataset.id;if(id){e.preventDefault();selectItem(id);}}});
$('palette').innerHTML=Object.entries(TYPES).map(([type,t])=>`<button data-add="${type}" draggable="true" aria-label="Προσθήκη: ${t.name}"><span class="shape-icon" aria-hidden="true">${t.icon}</span><span>${t.name}</span></button>`).join('')+`<button data-draw-freehand aria-label="Προσθήκη: Ελεύθερο βέλος"><span class="shape-icon">✎</span><span>Ελεύθερο βέλος</span></button>`;
$('palette').addEventListener('click',e=>{const type=e.target.closest('[data-add]')?.dataset.add;if(type==='route'||e.target.closest('[data-draw-freehand]')){setMode(type==='route'?'route':'freehand');$('library').classList.remove('open');}else if(type)addItem(type);});
$('palette').addEventListener('dragstart',e=>{const type=e.target.closest('[data-add]')?.dataset.add;if(type){e.dataTransfer.setData('application/x-nk-section',type);e.dataTransfer.effectAllowed='copy';}});
$('canvas').addEventListener('dragover',e=>{if([...e.dataTransfer.types].includes('application/x-nk-section')){e.preventDefault();e.dataTransfer.dropEffect='copy';}});
$('canvas').addEventListener('drop',e=>{e.preventDefault();const type=e.dataTransfer.getData('application/x-nk-section');if(TYPES[type])addItem(type,point(e));});
$('layers').addEventListener('click',e=>{const select=e.target.closest('[data-layer]'),hide=e.target.closest('[data-visibility]'),lock=e.target.closest('[data-lock-item]');if(select){const i=plan.items.find(i=>i.id===select.dataset.layer);if(i.hidden)change(()=>i.hidden=false);selectItem(i.id,e.shiftKey||multiSelect);}if(hide)change(()=>{const i=plan.items.find(i=>i.id===hide.dataset.visibility);i.hidden=!i.hidden;});if(lock)change(()=>{const i=plan.items.find(i=>i.id===lock.dataset.lockItem);i.locked=!i.locked;});});
for(const [key,field] of Object.entries({label:'prop-label',number:'prop-number',color:'prop-color',x:'prop-x',y:'prop-y',w:'prop-w',h:'prop-h',rotation:'prop-rotation',floor:'prop-floor'}))$(field).addEventListener('change',()=>{const i=selection()[0];if(!i)return;let value=$(field).value;if(['x','y','w','h','rotation'].includes(key)){value=Number(value);if(!Number.isFinite(value)||Math.abs(value)>100000||(['w','h'].includes(key)&&value<8)){notify('Μη έγκυρη τιμή.');$(field).value=i[key];return;}if(i.locked)return;if(key==='rotation')value=normalAngle(value);}change(()=>i[key]=value);});
$('plan-name').addEventListener('change',()=>change(()=>plan.title=$('plan-name').value.trim()||'Κάτοψη'));
$('floor-select').addEventListener('change',()=>{const floor=$('floor-select').value;setMode('select');change(()=>{plan.activeFloor=floor;selected.clear();});fit();});
$('add-floor').addEventListener('click',()=>{const name=prompt('Όνομα νέου επιπέδου:',`Επίπεδο ${plan.floors.length+1}`);if(!name?.trim())return;if(plan.floors.length>=30)return notify('Μέχρι 30 επίπεδα ανά σχέδιο.');setMode('select');change(()=>{const f={id:uid(),name:name.trim().slice(0,100)};plan.floors.push(f);plan.activeFloor=f.id;selected.clear();});fit();});
function syncModeButtons(){for(const [id,value] of Object.entries({'select-tool':'select','text-tool':'text','pan-tool':'pan','route-tool':'route','freehand-tool':'freehand'}))$(id).setAttribute('aria-pressed',mode===value);}
function setMode(next){finishGesture(true);if(mode!==next)draft=null;mode=next;if(mode!=='text')selectedText=null;if(mode==='route'||mode==='freehand'){selected.clear();selectedVertex=null;}syncModeButtons();render();}
$('route-tool').onclick=()=>setMode('route');$('freehand-tool').onclick=()=>setMode('freehand');$('finish-route').onclick=finishDraft;$('cancel-route').onclick=()=>setMode('select');
$('add-bend').onclick=()=>addRouteBend();$('remove-point').onclick=removeRoutePoint;$('reverse-route').onclick=()=>{const i=routeSelection();if(i&&!i.locked)change(()=>{setRoutePoints(i,routePoints(i).reverse());selectedVertex=null;});};
$('route-head').onchange=()=>{const i=routeSelection();if(i&&!i.locked)change(()=>i.arrowHead=$('route-head').value);};$('route-width').onchange=()=>{const i=routeSelection(),n=Number($('route-width').value);if(i&&!i.locked&&Number.isFinite(n)&&n>=2&&n<=24)change(()=>i.strokeWidth=n);else renderProperties();};
$('door-text-angle').onchange=()=>{const i=selectedText&&plan.items.find(i=>i.id===selectedText.id),n=Number($('door-text-angle').value);if(i?.type==='door'&&!i.locked&&Number.isFinite(n)&&Math.abs(n)<=3600)change(()=>i.rotation=normalAngle(n));else renderProperties();};
$('rotate-door-text').onclick=()=>{const i=selectedText&&plan.items.find(i=>i.id===selectedText.id);if(i?.type==='door'&&!i.locked)change(()=>i.rotation=normalAngle(i.rotation+90));};
$('select-tool').onclick=()=>setMode('select');$('text-tool').onclick=()=>setMode('text');$('pan-tool').onclick=()=>setMode('pan');$('undo').onclick=undo;$('redo').onclick=redo;
$('grid-toggle').onclick=()=>{grid=!grid;$('grid-toggle').setAttribute('aria-pressed',grid);renderCanvas();};$('snap-toggle').onclick=()=>{snap=!snap;$('snap-toggle').setAttribute('aria-pressed',snap);};
$('zoom-in').onclick=()=>zoom(1/1.2);$('zoom-out').onclick=()=>zoom(1.2);$('fit').onclick=fit;
$('duplicate').onclick=duplicate;$('multi-duplicate').onclick=duplicate;$('delete').onclick=()=>{selectedVertex=null;removeSelected();};$('multi-delete').onclick=()=>{selectedVertex=null;removeSelected();};
$('rotate-90').onclick=rotateSelected;$('multi-rotate').onclick=rotateSelected;$('apply-scale').onclick=()=>scaleSelected(Number($('scale-factor').value));$('multi-scale').onclick=()=>scaleSelected(Number($('multi-scale-factor').value));
$('to-front').onclick=()=>reorder(true);$('to-back').onclick=()=>reorder(false);$('lock').onclick=()=>change(()=>{const i=selection()[0];if(i)i.locked=!i.locked;});
$('text-content').onchange=()=>{const i=selectedText&&plan.items.find(i=>i.id===selectedText.id);if(i&&!i.locked)change(()=>i[selectedText.field]=$('text-content').value);};
for(const axis of ['x','y'])$('text-offset-'+axis).onchange=()=>{const i=selectedText&&plan.items.find(i=>i.id===selectedText.id),value=Number($('text-offset-'+axis).value);if(!i||i.locked)return;if(!Number.isFinite(value)||Math.abs(value)>100000){notify('Μη έγκυρη θέση κειμένου.');renderProperties();return;}change(()=>i[selectedText.field+'Offset'+axis.toUpperCase()]=value);};
$('text-font-size').onchange=()=>{const i=selectedText&&plan.items.find(i=>i.id===selectedText.id),value=Number($('text-font-size').value);if(!i||i.locked||selectedText.field!=='label')return;if(!Number.isFinite(value)||value<8||value>200){notify('Το μέγεθος γραμμάτων είναι από 8 έως 200.');renderProperties();return;}change(()=>i.labelFontSize=value);};
$('delete-text').onclick=deleteText;$('reset-text-position').onclick=()=>{const i=selectedText&&plan.items.find(i=>i.id===selectedText.id);if(i&&!i.locked)change(()=>{i[selectedText.field+'OffsetX']=0;i[selectedText.field+'OffsetY']=0;});};$('select-text-owner').onclick=()=>setMode('select');
document.querySelectorAll('[data-open-panel],[data-toggle-panel]').forEach(b=>b.onclick=()=>openPanel(b.dataset.openPanel||b.dataset.togglePanel));document.querySelectorAll('[data-close-panel]').forEach(b=>b.onclick=()=>{b.closest('aside').classList.remove('open');updatePanelButtons();});
$('mobile-fit').onclick=fit;$('mobile-dimensions').onclick=()=>openDimensions();
$('open-document').onclick=()=>{$('document-name').value=plan.title;document.querySelector('.export-menu').open=false;$('document-dialog').showModal();};
$('close-document').onclick=()=>$('document-dialog').close();$('document-name').onchange=()=>change(()=>plan.title=$('document-name').value.trim()||'Κάτοψη');
$('document-add-floor').onclick=()=>{$('document-dialog').close();$('add-floor').click();};
const resizeViewport=()=>{document.documentElement.style.setProperty('--app-height',(window.visualViewport?.height||innerHeight)+'px');updatePanelButtons();};
window.visualViewport?.addEventListener('resize',resizeViewport);window.addEventListener('resize',resizeViewport);resizeViewport();
$('help').onclick=()=>$('help-dialog').showModal();$('close-help').onclick=()=>$('help-dialog').close();$('help-dialog').addEventListener('click',e=>{if(e.target===$('help-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
document.addEventListener('keydown',e=>{if(e.target.closest('input,select,textarea')||document.querySelector('dialog[open]'))return;const ctrl=e.ctrlKey||e.metaKey,k=e.key.toLowerCase();if(ctrl&&k==='z'){e.preventDefault();e.shiftKey?redo():undo();return;}if(ctrl&&k==='y'){e.preventDefault();redo();return;}if(ctrl&&k==='d'){e.preventDefault();duplicate();return;}if(ctrl&&k==='s'){e.preventDefault();openPlans();return;}if(e.key==='Enter'&&mode==='route'){e.preventDefault();finishDraft();return;}if(e.key==='Escape'){setMode('select');selected.clear();selectedText=null;selectedVertex=null;document.querySelectorAll('aside.open').forEach(a=>a.classList.remove('open'));render();}if(e.code==='Space'){e.preventDefault();space=true;renderCanvas();}if(k==='h')setMode('pan');if(k==='v')setMode('select');if(k==='t')setMode('text');if(k==='a'&&!ctrl)setMode('route');if(k==='p'&&!ctrl)setMode('freehand');if(draft&&(e.key==='Delete'||e.key==='Backspace')){e.preventDefault();draft.points.pop();renderCanvas();return;}if(e.key==='Delete'||e.key==='Backspace'){e.preventDefault();removeSelected();}if(e.key.startsWith('Arrow')&&movable().length){e.preventDefault();const step=e.shiftKey?10:1,dx=e.key==='ArrowLeft'?-step:e.key==='ArrowRight'?step:0,dy=e.key==='ArrowUp'?-step:e.key==='ArrowDown'?step:0;change(()=>{if(selectedText){const i=plan.items.find(i=>i.id===selectedText.id),d=rotateVector(dx,dy,-i.rotation);i[selectedText.field+'OffsetX']=(i[selectedText.field+'OffsetX']??0)+d.x;i[selectedText.field+'OffsetY']=(i[selectedText.field+'OffsetY']??0)+d.y;}else movable().forEach(i=>{i.x+=dx;i.y+=dy;});});}});
document.addEventListener('keyup',e=>{if(e.code==='Space'){space=false;renderCanvas();}});window.addEventListener('blur',()=>{space=false;finishGesture();});
// Activate touch controls on pointer release, including after an SVG drag.
// Ignore the subsequent compatibility click so toggle/actions execute once.
let touchControl=null,lastTouchControl=null;
document.addEventListener('pointerdown',e=>{lastTouchControl=null;if(e.pointerType!=='touch')return;const el=e.target.closest('button,summary');touchControl=el?{el,id:e.pointerId,x:e.clientX,y:e.clientY}:null;},true);
document.addEventListener('pointerup',e=>{if(e.pointerType!=='touch'||!touchControl)return;const c=touchControl;touchControl=null;if(c.id!==e.pointerId||e.target.closest('button,summary')!==c.el||Math.hypot(e.clientX-c.x,e.clientY-c.y)>10||c.el.disabled||!c.el.isConnected)return;lastTouchControl={el:c.el,at:performance.now()};e.preventDefault();c.el.click();},true);
document.addEventListener('pointercancel',()=>{touchControl=null;},true);
document.addEventListener('click',e=>{if(e.isTrusted&&e.detail>0&&lastTouchControl&&performance.now()-lastTouchControl.at<900){e.preventDefault();e.stopImmediatePropagation();}},true);
function fileStem(){return (plan.title||'κάτοψη').replace(/[\\/:*?"<>|]/g,'-').slice(0,80);}
function download(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);document.querySelector('.export-menu').open=false;}
function svgExport(){const items=visible(),b=visualBounds(),pad=100,width=Math.max(320,b.w+pad*2),height=Math.max(220,b.h+pad*2);return `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.ceil(width)}" height="${Math.ceil(height)}" viewBox="${b.x-pad} ${b.y-pad} ${width} ${height}"><rect x="${b.x-pad}" y="${b.y-pad}" width="${width}" height="${height}" fill="#f7f9f8"/><text x="${b.x-pad+24}" y="${b.y-pad+30}" font-family="Segoe UI,Arial,sans-serif" font-size="21" font-weight="600" fill="#233f46">${esc(plan.title)} · ${esc(plan.floors.find(f=>f.id===plan.activeFloor).name)}</text><text x="${b.x-pad+24}" y="${b.y-pad+53}" font-family="Segoe UI,Arial,sans-serif" font-size="13" fill="#718388">${plan.measurement?'Κλίμακα από διαστάσεις χρήστη · '+esc(plan.measurement.unit):'Σχηματική κάτοψη · διαστάσεις ενδεικτικές'}</text>${items.map(itemMarkup).join('')}${buildingDimensions(true)}</svg>`;}
$('export-json').onclick=()=>{finishDraft();download(new Blob([JSON.stringify({...plan,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'}),fileStem()+'.json');};
$('export-svg').onclick=()=>{finishDraft();download(new Blob([svgExport()],{type:'image/svg+xml'}),fileStem()+'.svg');};
$('export-png').onclick=async()=>{finishDraft();try{const svg=svgExport(),url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));try{const image=new Image();await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=reject;image.src=url;});const factor=Math.min(2,4096/image.width,4096/image.height);const canvas=document.createElement('canvas');canvas.width=Math.ceil(image.width*factor);canvas.height=Math.ceil(image.height*factor);canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw Error();download(blob,fileStem()+'.png');notify('Η εικόνα PNG είναι έτοιμη.');}finally{URL.revokeObjectURL(url);}}catch{notify('Η εξαγωγή PNG απέτυχε. Δοκίμασε SVG.');}};
$('import').onclick=()=>{$('file-input').click();document.querySelector('.export-menu').open=false;};
$('file-input').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{const header=new TextDecoder().decode(await file.slice(0,12).arrayBuffer());if(header.startsWith('%PDF')||/^AC10\d\d/.test(header)){const {openDrawingImport}=await import('./drawing-import.mjs');openDrawingImport(file,raw=>{const imported=validate(raw);setMode('select');change(()=>{plan=imported;selected.clear();selectedText=null;selectedVertex=null;});fit();notify('Η κάτοψη μετατράπηκε σε επεξεργάσιμα στοιχεία. Αναίρεση επαναφέρει το προηγούμενο σχέδιο.');});return;}if(file.size>2_000_000)throw Error('Το αρχείο JSON είναι πολύ μεγάλο.');const imported=validate(JSON.parse(await file.text()));setMode('select');change(()=>{plan=imported;selected.clear();selectedText=null;selectedVertex=null;});fit();notify('Το σχέδιο εισήχθη. Η προηγούμενη έκδοση επανέρχεται με Αναίρεση.');}catch(error){notify(error.message||'Δεν φορτώθηκε το αρχείο.');}finally{e.target.value='';}};
$('reset').onclick=()=>{if(!confirm('Νέο κενό σχέδιο; Το τρέχον επανέρχεται με Αναίρεση.'))return;setMode('select');change(()=>{plan={...starter(),title:'Νέα κάτοψη',notes:'',items:[]};selected.clear();});fit();document.querySelector('.export-menu').open=false;};
$('starter').onclick=()=>{if(!confirm('Επαναφορά της αρχικής κάτοψης; Το τρέχον επανέρχεται με Αναίρεση.'))return;setMode('select');change(()=>{plan=starter();selected.clear();});fit();document.querySelector('.export-menu').open=false;};
async function saveForCodex(){finishDraft();const button=$('save-codex');button.disabled=true;try{const response=await fetch('/api/save',{method:'POST',headers:{'Content-Type':'application/json'},body:serialize()}),result=await response.json();if(!response.ok)throw Error(result.error);$('save-status').textContent='Αποθηκεύτηκε για Codex';notify('Έτοιμο. Πες μου «διάβασε το αποθηκευμένο σχέδιο». Φάκελος: NK Plan Builder / Plans',6500);}catch(error){notify(error.message||'Δεν αποθηκεύτηκε. Χρησιμοποίησε εξαγωγή JSON.');}finally{button.disabled=false;}}
$('save-codex').onclick=saveForCodex;
$('save').onclick=openPlans;

const AREA_TYPES=['room','ramp','stairs','wall'];
const LIBRARY_KEY='nk-plan-library-v1';
let activeSavedId=null,lastSavedSelection=null;
const physicalValue=n=>n*plan.measurement.cmPerUnit/(plan.measurement.unit==='m'?100:1);
const formatDimension=n=>new Intl.NumberFormat('el-GR',{maximumFractionDigits:3}).format(physicalValue(n))+' '+plan.measurement.unit;
function buildingItems(){return plan.items.filter(i=>i.floor===plan.activeFloor&&AREA_TYPES.includes(i.type));}
function dimensionMarkup(b,building=false,exporting=false){
  if(!plan.measurement)return '';const screenScale=exporting?1:view.w/Math.max(1,$('canvas').getBoundingClientRect().width);
  const s=building?screenScale:Math.max(screenScale,.25),gap=building?46*s:22*s,font=12*s,tick=5*s;
  const top=b.y-gap,right=b.x+b.w+gap;
  return `<g class="${building?'building-dimensions':'section-dimension-lines'}" pointer-events="none" fill="#9c332e" stroke="#b54840" stroke-width="1.2" vector-effect="non-scaling-stroke"><path d="M ${b.x} ${b.y-3*s} V ${top-tick} M ${b.x+b.w} ${b.y-3*s} V ${top-tick} M ${b.x} ${top} H ${b.x+b.w} M ${b.x-tick} ${top+tick} l ${tick*2} ${-tick*2} M ${b.x+b.w-tick} ${top+tick} l ${tick*2} ${-tick*2} M ${b.x+b.w+3*s} ${b.y} H ${right+tick} M ${b.x+b.w+3*s} ${b.y+b.h} H ${right+tick} M ${right} ${b.y} V ${b.y+b.h} M ${right-tick} ${b.y+tick} l ${tick*2} ${-tick*2} M ${right-tick} ${b.y+b.h+tick} l ${tick*2} ${-tick*2}" fill="none"/><text x="${b.x+b.w/2}" y="${top-7*s}" text-anchor="middle" stroke="none" font-size="${font}" font-family="Segoe UI,Arial,sans-serif">${formatDimension(b.w)}</text><text x="${right+7*s}" y="${b.y+b.h/2}" stroke="none" font-size="${font}" font-family="Segoe UI,Arial,sans-serif" transform="rotate(90 ${right+7*s} ${b.y+b.h/2})" text-anchor="middle">${formatDimension(b.h)}</text></g>`;
}
function buildingDimensions(exporting=false){const items=buildingItems();return plan.measurement?.showBuilding&&items.length?dimensionMarkup(bounds(items),true,exporting):'';}
function renderMeasurements(){
  $('scale-badge').textContent=plan.measurement?`Διαστάσεις σε ${plan.measurement.unit} · κλίμακα χρήστη`:'Σχηματική · χωρίς κλίμακα';
  const i=selection()[0];$('section-dimensions').hidden=!i||['route','marker','text','note'].includes(i.type);
  refreshLiveDimensions();
  if(i){$('section-size').textContent=plan.measurement?`${formatDimension(i.w)} × ${formatDimension(i.h)}${HEIGHT_TYPES.includes(i.type)?' × '+new Intl.NumberFormat('el-GR',{maximumFractionDigits:3}).format(heightCm(i)/(plan.measurement.unit==='m'?100:1))+' '+plan.measurement.unit:''}`:'Όρισε πρώτα μια γνωστή διάσταση.';$('show-section-dimensions').checked=!!i.showDimensions;$('show-section-dimensions').disabled=i.locked||!plan.measurement;}
  const list=selection(),canMerge=list.length>1&&list.every(i=>i.type==='room'&&!i.locked);
  $('merge-areas').disabled=!canMerge;$('merge-hint').textContent=canMerge?'Η συγχώνευση κρατά το εξωτερικό περίγραμμα και αφαιρεί τις κοινές γραμμές. Το όνομα και ο αριθμός του πρώτου χώρου παραμένουν επεξεργάσιμα.':'Επίλεξε τουλάχιστον δύο ξεκλείδωτους χώρους στο ίδιο επίπεδο.';
}
$('multi-select-tool').onclick=()=>{multiSelect=!multiSelect;$('multi-select-tool').setAttribute('aria-pressed',multiSelect);setMode('select');notify(multiSelect?'Πάτησε κάθε χώρο που θέλεις να συγχωνεύσεις.':'Απλή επιλογή ενεργή.');};
$('merge-areas').onclick=()=>{
  const items=selection();if(items.length<2||items.some(i=>i.type!=='room'||i.locked))return;
  try {
    const geometry=unionAreas(items),first=items[0],oldCenter={x:first.x+first.w/2,y:first.y+first.h/2};
    const labelOffset=rotateVector(first.labelOffsetX??0,(first.labelOffsetY??0)+Math.min(first.h/4,30),first.rotation);
    const merged={...clone(first),...geometry,rotation:0,id:uid(),labelOffsetX:oldCenter.x+labelOffset.x-geometry.x-geometry.w/2,labelOffsetY:oldCenter.y+labelOffset.y-geometry.y-geometry.h/2-Math.min(geometry.h/4,30),numberOffsetX:0,numberOffsetY:0};
    const ids=new Set(items.map(i=>i.id)),index=plan.items.indexOf(first);
    change(()=>{plan.items=plan.items.filter(i=>!ids.has(i.id));plan.items.splice(index,0,merged);selected=new Set([merged.id]);selectedText=null;selectedVertex=null;});
    multiSelect=false;$('multi-select-tool').setAttribute('aria-pressed','false');notify('Οι χώροι συγχωνεύθηκαν. Η Αναίρεση επαναφέρει όλα τα αρχικά τμήματα.');
  }catch(e){notify(e.message);}
};
function dimensionTarget(){const i=selection()[0];return $('dimension-scope').value==='section'&&selection().length===1?{items:[i],b:{x:i.x,y:i.y,w:i.w,h:i.h},section:i}:{items:buildingItems(),b:bounds(buildingItems())};}
function refreshDimensionDialog(){
  const t=dimensionTarget(),m=plan.measurement;
  $('dimension-w').value=m?Number(physicalValue(t.b.w).toFixed(5)):'';$('dimension-h').value=m?Number(physicalValue(t.b.h).toFixed(5)):'';
  $('dimension-height-row').hidden=!t.section||!HEIGHT_TYPES.includes(t.section.type);$('dimension-z').value=t.section?heightCm(t.section)/(m?.unit==='cm'?1:100):'';
  $('dimension-unit').value=m?.unit??'m';$('apply-dimensions').disabled=!m||!t.items.length;
  $('calibrate-dimensions').disabled=!t.items.length;$('dimension-visible').disabled=!m;
  $('dimension-visible').checked=t.section?!!t.section.showDimensions:!!m?.showBuilding;
  $('dimension-description').textContent=m?`Πλάτος × μήκος ${t.section?'στο τοπικό περίγραμμα του τμήματος':'στο εξωτερικό περίγραμμα του ενεργού επιπέδου'}. Η εφαρμογή αλλάζει το μέγεθος.`:'Βάλε ένα γνωστό πλάτος και πάτησε «Ορισμός κλίμακας». Το σχήμα παραμένει ίδιο και όλες οι διαστάσεις χρησιμοποιούν την ίδια κλίμακα.';
  $('dimension-error').textContent='';
}
function openDimensions(scope='building'){
  const single=selection().length===1;$('dimension-scope').querySelector('[value=section]').disabled=!single;
  $('dimension-scope').value=scope==='section'&&single?'section':'building';refreshDimensionDialog();$('dimensions-dialog').showModal();
}
$('dimensions').onclick=()=>openDimensions();$('section-measure').onclick=()=>openDimensions('section');$('close-dimensions').onclick=()=>$('dimensions-dialog').close();
$('dimension-scope').onchange=refreshDimensionDialog;
$('dimension-unit').onchange=()=>{
  const unit=$('dimension-unit').value;
  if(plan.measurement){change(()=>{plan.measurement.unit=unit;plan.units=unit;});refreshDimensionDialog();}
};
$('calibrate-dimensions').onclick=()=>{
  const t=dimensionTarget(),w=Number($('dimension-w').value),unit=$('dimension-unit').value,scale=w*(unit==='m'?100:1)/t.b.w;
  if(!t.items.length||!Number.isFinite(scale)||scale<=0||scale>1e7){$('dimension-error').textContent='Συμπλήρωσε έγκυρο γνωστό πλάτος μεγαλύτερο από μηδέν.';return;}
  change(()=>{plan.measurement={cmPerUnit:scale,unit,showBuilding:plan.measurement?.showBuilding??true};plan.schematic=false;plan.units=unit;});refreshDimensionDialog();fit();notify('Η κοινή κλίμακα ορίστηκε.');
};
for(const axis of ['w','h'])$('dimension-'+axis).oninput=()=>{
  if(!$('dimension-ratio').checked)return;const b=dimensionTarget().b,n=Number($('dimension-'+axis).value);
  if(n>0)$('dimension-'+(axis==='w'?'h':'w')).value=Number((n*(axis==='w'?b.h/b.w:b.w/b.h)).toFixed(5));
};
$('apply-dimensions').onclick=()=>{
  if(!plan.measurement)return;const t=dimensionTarget(),factor=plan.measurement.unit==='m'?100:1;
  const w=Number($('dimension-w').value)*factor/plan.measurement.cmPerUnit,h=Number($('dimension-h').value)*factor/plan.measurement.cmPerUnit;
  const z=Number($('dimension-z').value)*factor;if(t.section&&HEIGHT_TYPES.includes(t.section.type)&&(!Number.isFinite(z)||z<20||z>10000)){$('dimension-error').textContent='Το ύψος πρέπει να είναι από 20 έως 10.000 cm.';return;}
  const sx=w/t.b.w,sy=h/t.b.h;
  if(!t.items.length||!Number.isFinite(sx)||!Number.isFinite(sy)||sx<=0||sy<=0||t.items.some(i=>i.locked)||t.items.some(i=>i.w*sx<8||i.h*sy<8||i.w*sx>100000||i.h*sy>100000)){$('dimension-error').textContent='Έλεγξε τις διαστάσεις και ξεκλείδωσε τα τμήματα που θα αλλάξουν.';return;}
  const targets=t.section?t.items:plan.items.filter(i=>i.floor===plan.activeFloor);
  if(targets.some(i=>i.locked)){$('dimension-error').textContent='Ξεκλείδωσε όλα τα τμήματα του επιπέδου πριν αλλάξεις το κτίριο.';return;}
  if(!t.section&&Math.abs(sx-sy)>1e-5&&targets.some(i=>Math.abs(i.rotation%90)>1e-5)){$('dimension-error').textContent='Για επίπεδο με λοξά τμήματα κράτησε την αναλογία ή ευθυγράμμισέ τα πρώτα.';return;}
  const proposed=targets.map(i=>({i,w:i.w*sx,h:i.h*sy,x:t.section?i.x:t.b.x+(i.x-t.b.x)*sx,y:t.section?i.y:t.b.y+(i.y-t.b.y)*sy}));
  if(proposed.some(p=>p.w<8||p.h<8||p.w>100000||p.h>100000||Math.abs(p.x)>100000||Math.abs(p.y)>100000)){$('dimension-error').textContent='Το μέγεθος ξεπερνά τα όρια του σχεδίου.';return;}
  change(()=>targets.forEach(i=>{
    if(t.section){i.w=w;i.h=h;if(HEIGHT_TYPES.includes(i.type))i.heightCm=z;return;}
    const cx=t.b.x+(i.x+i.w/2-t.b.x)*sx,cy=t.b.y+(i.y+i.h/2-t.b.y)*sy,quarter=Math.round(i.rotation/90)%2!==0;
    i.w*=quarter?sy:sx;i.h*=quarter?sx:sy;i.x=cx-i.w/2;i.y=cy-i.h/2;
    i.labelOffsetX=(i.labelOffsetX??0)*(quarter?sy:sx);i.labelOffsetY=(i.labelOffsetY??0)*(quarter?sx:sy);i.numberOffsetX=(i.numberOffsetX??0)*(quarter?sy:sx);i.numberOffsetY=(i.numberOffsetY??0)*(quarter?sx:sy);
  }));refreshDimensionDialog();fit();notify('Οι διαστάσεις εφαρμόστηκαν.');
};
$('dimension-visible').onchange=()=>{if(!plan.measurement)return;const t=dimensionTarget();if(t.section?.locked)return;change(()=>{if(t.section)t.section.showDimensions=$('dimension-visible').checked;else plan.measurement.showBuilding=$('dimension-visible').checked;});};
$('show-section-dimensions').onchange=()=>{const i=selection()[0];if(i&&!i.locked&&plan.measurement)change(()=>i.showDimensions=$('show-section-dimensions').checked);};
function readLibrary(){const saved=JSON.parse(localStorage.getItem(LIBRARY_KEY)||'[]');if(!Array.isArray(saved)||saved.length>100)throw Error('Η βιβλιοθήκη σχεδίων δεν διαβάζεται.');return saved;}
function refreshLibrary(selectId=activeSavedId??lastSavedSelection){
  try{const library=readLibrary();$('saved-plans').innerHTML=library.length?library.map(p=>`<option value="${esc(p.id)}">${esc(p.name)} · ${esc(new Date(p.savedAt).toLocaleDateString('el-GR'))}</option>`).join(''):'<option value="">Δεν υπάρχουν αποθηκευμένα σχέδια</option>';
    if(library.some(p=>p.id===selectId))$('saved-plans').value=selectId;for(const id of ['load-named-plan','delete-named-plan'])$(id).disabled=!library.length;
  }catch(e){$('plans-status').textContent=e.message;}
}
function openPlans(){finishDraft();$('save-codex').hidden=!(location.hostname==='127.0.0.1'&&location.port==='5381'&&navigator.onLine);$('save-plan-name').value=plan.title;$('plans-status').textContent='';refreshLibrary();$('plans-dialog').showModal();}
$('saved-plans').onchange=()=>lastSavedSelection=$('saved-plans').value;
$('open-plans').onclick=openPlans;$('close-plans').onclick=()=>$('plans-dialog').close();
$('save-named-plan').onclick=()=>{
  try{const name=$('save-plan-name').value.trim();if(!name)throw Error('Δώσε όνομα στο σχέδιο.');const library=readLibrary(),existing=library.find(p=>p.id===activeSavedId&&p.name===name);
    if(!existing&&library.length>=100)throw Error('Η βιβλιοθήκη έχει 100 σχέδια. Κράτησε JSON και αφαίρεσε ένα παλιό.');
    const entry={id:existing?.id??uid(),name,savedAt:new Date().toISOString(),plan:clone(plan)};
    const next=existing?library.map(p=>p.id===entry.id?entry:p):[...library,entry];localStorage.setItem(LIBRARY_KEY,JSON.stringify(next));activeSavedId=entry.id;lastSavedSelection=entry.id;refreshLibrary();$('plans-status').textContent='Το σχέδιο αποθηκεύτηκε σε αυτή τη συσκευή.';$('save-status').textContent='Αποθηκεύτηκε';
  }catch(e){$('plans-status').textContent=e.name==='QuotaExceededError'?'Η αποθήκευση γέμισε. Κράτησε το σχέδιο με «Λήψη JSON».':e.message;}
};
$('load-named-plan').onclick=()=>{
  try{const entry=readLibrary().find(p=>p.id===$('saved-plans').value);if(!entry)return;const loaded=validate(entry.plan);setMode('select');change(()=>{plan=loaded;selected.clear();selectedText=null;selectedVertex=null;activeSavedId=entry.id;lastSavedSelection=entry.id;});$('plans-dialog').close();fit();notify('Το σχέδιο φορτώθηκε. Η προηγούμενη κάτοψη επανέρχεται με Αναίρεση.');}catch(e){$('plans-status').textContent=e.message;}
};
$('delete-named-plan').onclick=()=>{
  try{const id=$('saved-plans').value;if(!id||!confirm('Διαγραφή αυτού του αποθηκευμένου σχεδίου; Η ανοιχτή κάτοψη παραμένει.'))return;localStorage.setItem(LIBRARY_KEY,JSON.stringify(readLibrary().filter(p=>p.id!==id)));if(activeSavedId===id)activeSavedId=null;if(lastSavedSelection===id)lastSavedSelection=null;refreshLibrary();$('plans-status').textContent='Το αποθηκευμένο σχέδιο διαγράφηκε.';}catch(e){$('plans-status').textContent=e.message;}
};
$('download-plan').onclick=()=>$('export-json').click();$('load-plan-file').onclick=()=>{$('plans-dialog').close();$('file-input').click();};
$('reset-plan').onclick=()=>{$('reset').click();$('plans-dialog').close();activeSavedId=null;};
$('save-codex').hidden=!(location.hostname==='127.0.0.1'&&location.port==='5381');
function activate3D(value){
  is3D=value;if(!value){$('three-door').setAttribute('aria-pressed',false);threeView?.setDoorMode(false);}$('canvas-shell').classList.toggle('view-3d',value);$('three-host').hidden=!value;$('three-tools').hidden=!value;$('three-guide').hidden=!value;$('view-toggle').setAttribute('aria-pressed',value);$('view-2d').setAttribute('aria-pressed',!value);threeView?.setActive(value);refreshLiveDimensions();
}
function reconcileDoors(){
  if(!plan.measurement)return;
  for(const door of plan.items.filter(i=>i.type==='door'&&i.attachment)){
    const room=plan.items.find(i=>i.id===door.attachment.roomId&&['room','ramp','stairs','wall'].includes(i.type)&&i.floor===door.floor);
    if(!room){delete door.attachment;continue;}
    const pose=doorOnWall(door,room,null,plan.measurement.cmPerUnit,door.attachment);
    if(!pose||heightCm(door)>heightCm(room))throw Error('Η πόρτα πρέπει να χωρά στο μήκος και στο ύψος του τοίχου.');
    Object.assign(door,pose);
  }
}
function detachMovedDoors(before){
  for(const door of plan.items.filter(i=>i.type==='door'&&i.attachment)){
    const old=before.items.find(i=>i.id===door.id);if(!old||old.w!==door.w||old.h!==door.h||JSON.stringify(old.attachment)!==JSON.stringify(door.attachment))continue;
    const room=plan.items.find(i=>i.id===door.attachment.roomId),oldRoom=before.items.find(i=>i.id===door.attachment.roomId);
    if(JSON.stringify(room)===JSON.stringify(oldRoom)&&(old.x!==door.x||old.y!==door.y||old.rotation!==door.rotation))delete door.attachment;
  }
}
function placeDoor3D(roomId,point){
  const room=plan.items.find(i=>i.id===roomId);if(!room||room.locked||!plan.measurement)return notify('Επίλεξε ξεκλείδωτο τοίχο χώρου με ορισμένη κλίμακα.');
  if(plan.items.length>=1000)return notify('Το όριο είναι 1.000 τμήματα ανά σχέδιο.');
  const scale=plan.measurement.cmPerUnit/100,w=90/plan.measurement.cmPerUnit,door=makeItem('door',0,0,w,w,'Πόρτα');door.floor=room.floor;door.heightCm=Math.min(210,heightCm(room));
  const pose=doorOnWall(door,room,{x:point.x/scale,y:point.y/scale},plan.measurement.cmPerUnit);if(!pose)return notify('Ο τοίχος χρειάζεται τουλάχιστον 94 cm για την αρχική πόρτα 90 cm.');
  Object.assign(door,pose);change(()=>{plan.items.push(door);selected=new Set([door.id]);});$('three-door').setAttribute('aria-pressed',false);threeView?.setDoorMode(false);notify('Η πόρτα μπήκε στον τοίχο. Σύρε την στην επιθυμητή θέση.');
}
function moveDoor3D(id,roomId,point){
  const door=plan.items.find(i=>i.id===id),room=plan.items.find(i=>i.id===roomId);if(!door||door.locked||!room||room.locked)return;
  const scale=plan.measurement.cmPerUnit/100,pose=doorOnWall(door,room,{x:point.x/scale,y:point.y/scale},plan.measurement.cmPerUnit);if(!pose||heightCm(door)>heightCm(room))return;
  Object.assign(door,pose);selected=new Set([id]);autosave();render();
}
$('three-door').onclick=()=>{if(!plan.measurement){openDimensions();notify('Βάλε μία γνωστή διάσταση για πόρτες πραγματικού μεγέθους.');return;}const value=$('three-door').getAttribute('aria-pressed')!=='true';$('three-door').setAttribute('aria-pressed',value);threeView?.setDoorMode(value);if(value)notify('Πάτησε επάνω σε έναν τοίχο για πόρτα 90 cm.');};
function syncThree(){if(is3D&&threeView){threeView.sync(plan.measurement?plan:{...plan,measurement:{cmPerUnit:1,unit:'m',showBuilding:false}},selected);$('zoom-label').textContent='3D';$('three-calibrate').hidden=!!plan.measurement;$('three-guide-text').textContent=plan.measurement?'1 δάχτυλο: '+($('three-top').getAttribute('aria-pressed')==='true'?'μετακίνηση':'περιστροφή')+' · 2: μετακίνηση / zoom':'Σχηματική 3D · χωρίς πραγματική κλίμακα';}}
function refreshLiveDimensions(){
  const i=selection().length===1?selection()[0]:null,physical=i&&HEIGHT_TYPES.includes(i.type),m=plan.measurement;
  $('three-selection').hidden=!is3D||!physical||!m;$('three-guide').hidden=!is3D||!!(physical&&m);$('section-live').hidden=!physical;
  if(!physical)return;const card=$('three-selection');if(card.dataset.item!==i.id){card.classList.remove('expanded');card.dataset.item=i.id;}const propertiesText=compactUI.matches?(card.classList.contains('expanded')?'Κλείσιμο':'Μεγέθη'):'Ρυθμίσεις';if($('three-properties').textContent!==propertiesText)$('three-properties').textContent=propertiesText;$('three-properties').setAttribute('aria-expanded',compactUI.matches?card.classList.contains('expanded'):'false');$('three-selection-name').textContent=[i.number,i.label||TYPES[i.type].name].filter(Boolean).join(' · ');
  const unit=m?.unit??'m',values={w:m?physicalValue(i.w):'',h:m?physicalValue(i.h):'',z:heightCm(i)/(unit==='m'?100:1)};
  for(const prefix of ['section','three']){
    for(const axis of ['w','h','z']){const field=$(prefix+'-'+axis);if(document.activeElement!==field)field.value=values[axis]===''?'':Number(values[axis].toFixed(unit==='m'?3:1));field.disabled=!!i.locked||!m;}
    $(prefix+'-unit').value=unit;$(prefix+'-unit').disabled=!!i.locked||!m;
  }
}
for(const prefix of ['section','three']){
  for(const axis of ['w','h','z']){
    const field=$(prefix+'-'+axis);
    field.oninput=()=>{
      const i=selection().length===1?selection()[0]:null,error=$(prefix+'-size-error');if(!i||i.locked||!plan.measurement)return;
      const n=Number(field.value),cm=n*(plan.measurement.unit==='m'?100:1),value=axis==='z'?cm:cm/plan.measurement.cmPerUnit;
      if(!field.value||!Number.isFinite(value)||(axis==='z'?(value<20||value>10000):(value<8||value>100000))){error.textContent=axis==='z'?'Ύψος: 20–10.000 cm.':'Η διάσταση ξεπερνά τα όρια του σχεδίου.';return;}
      const before=serialize();error.textContent='';if(axis==='z')i.heightCm=value;else i[axis]=value;try{reconcileDoors();}catch(e){plan=JSON.parse(before);error.textContent=e.message;return;}autosave();renderCanvas();refreshLiveDimensions();syncThree();
    };
    field.onchange=()=>{record();render();};field.onblur=()=>{record();refreshLiveDimensions();};
  }
  $(prefix+'-unit').onchange=()=>change(()=>{plan.measurement.unit=$(prefix+'-unit').value;plan.units=plan.measurement.unit;});
}
$('view-toggle').onclick=async()=>{
  if(threeLoading||is3D)return;
  threeLoading=true;$('view-toggle').disabled=true;
  try{finishDraft();setMode('select');if(!threeView){const {createPlan3D}=await import('./view3d.mjs');threeView=createPlan3D($('three-host'),{onDoorPlace:placeDoor3D,onDoorMove:moveDoor3D,onDoorMoveEnd:()=>{record();render();},onSelect:(id,add)=>{if(id)selectItem(id,add||multiSelect);else{selected.clear();render();}},onError:message=>{threeView?.dispose();threeView=null;activate3D(false);render();notify(message);}});}activate3D(true);syncThree();threeView.setAngle('angle');$('three-top').setAttribute('aria-pressed',false);$('three-angle').setAttribute('aria-pressed',true);}
  catch(e){activate3D(false);notify('Δεν άνοιξε η 3D όψη. Δοκίμασε browser με WebGL2. Το σχέδιό σου παραμένει διαθέσιμο στη 2D.');console.warn(e);}
  finally{threeLoading=false;$('view-toggle').disabled=false;}
};
$('view-2d').onclick=()=>{if(threeLoading||!is3D)return;activate3D(false);render();fit();};
$('three-calibrate').onclick=()=>openDimensions();
for(const angle of ['top','angle'])$('three-'+angle).onclick=()=>{threeView?.setAngle(angle);$('three-top').setAttribute('aria-pressed',angle==='top');$('three-angle').setAttribute('aria-pressed',angle==='angle');syncThree();};
$('three-ceilings').onclick=()=>{const show=$('three-ceilings').getAttribute('aria-pressed')!=='true';$('three-ceilings').setAttribute('aria-pressed',show);threeView?.setCeilings(show);};
$('three-clear').onclick=()=>{selected.clear();render();};$('three-properties').onclick=()=>{if(compactUI.matches){$('three-selection').classList.toggle('expanded');refreshLiveDimensions();}else{document.querySelector('.workspace').classList.remove('inspector-collapsed');updatePanelButtons();}};
new ResizeObserver(()=>{const r=$('canvas').getBoundingClientRect();if(r.width&&r.height){const centreY=view.y+view.h/2;view.h=view.w*r.height/r.width;view.y=centreY-view.h/2;renderCanvas();}}).observe($('canvas-shell'));
render();requestAnimationFrame(fit);autosave();if(restoreError)notify(restoreError);

let installPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('install-app').hidden=false;});
$('install-app').onclick=async()=>{if(installPrompt){await installPrompt.prompt();installPrompt=null;$('install-app').hidden=true;}};
window.addEventListener('appinstalled',()=>{$('install-app').hidden=true;});
async function setupOffline(){
  const status=$('offline-status');
  if(!('serviceWorker' in navigator)){status.textContent='Ο browser δεν υποστηρίζει offline εφαρμογή.';status.dataset.state='error';return;}
  try{
    const registration=await navigator.serviceWorker.register('./sw.js',{scope:'./'});
    const refresh=async()=>{
      const keys=await caches.keys(),ready=!!navigator.serviceWorker.controller&&!!registration.active&&keys.some(k=>k.startsWith('nk-plan-'));
      status.textContent=ready?(navigator.onLine?'Έτοιμο για offline':'Offline · εργασία στη συσκευή'):'Χρειάζεται πρώτη φόρτωση με σύνδεση';
    };
    let applyUpdate=false;
    const update=()=>{if(registration.waiting&&navigator.serviceWorker.controller){$('update-app').hidden=false;$('update-app').onclick=()=>{try{localStorage.setItem(KEY,serialize());}catch{notify('Κράτησε JSON πριν φορτώσεις νέα έκδοση.');return;}applyUpdate=true;registration.waiting.postMessage('ACTIVATE_UPDATE');};}};
    registration.addEventListener('updatefound',()=>{const worker=registration.installing;worker?.addEventListener('statechange',()=>{refresh();update();});});
    let reloading=false;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(applyUpdate&&!reloading){reloading=true;location.reload();}else refresh();});
    await navigator.serviceWorker.ready;await refresh();update();
    window.addEventListener('online',refresh);window.addEventListener('offline',refresh);
  }catch{status.textContent='Offline δεν είναι έτοιμο · άνοιξε με σύνδεση.';status.dataset.state='error';}
}
setupOffline();
