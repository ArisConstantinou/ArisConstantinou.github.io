import {worldRings,polygonBounds,contains} from './geometry.mjs';

// Layout is a render-only offset. Stored user positions and geometry never change.
function transformedBox(box,m){
 const points=[[box.x,box.y],[box.x+box.width,box.y],[box.x+box.width,box.y+box.height],[box.x,box.y+box.height]].map(([x,y])=>({x:m.a*x+m.c*y+m.e,y:m.b*x+m.d*y+m.f}));
 const b=polygonBounds([points]);return {x:b.x,y:b.y,w:b.w,h:b.h};
}
function matrix(group,svg){
 const transform=element=>{let m=svg.createSVGMatrix();const list=element.transform?.baseVal;for(let n=0;n<(list?.numberOfItems??0);n++)m=m.multiply(list.getItem(n).matrix);return m;};
 const own=transform(group),parent=transform(group.parentElement);
 return {parent,all:parent.multiply(own)};
}
function spatialIndex(cell){
 const cells=new Map();
 function keys(b){const out=[];for(let x=Math.floor(b.x/cell);x<=Math.floor((b.x+b.w)/cell);x++)for(let y=Math.floor(b.y/cell);y<=Math.floor((b.y+b.h)/cell);y++)out.push(x+','+y);return out;}
 return {add(b){for(const key of keys(b)){if(!cells.has(key))cells.set(key,[]);cells.get(key).push(b);}},hits(b){return keys(b).some(key=>(cells.get(key)||[]).some(a=>a.x<b.x+b.w&&b.x<a.x+a.w&&a.y<b.y+b.h&&b.y<a.y+a.h));}};
}
const moved=(b,dx,dy,pad)=>({x:b.x+dx-pad,y:b.y+dy-pad,w:b.w+pad*2,h:b.h+pad*2});

export function layoutAnnotations(svg,groups,boxes,items,scale){
 const itemMap=new Map(items.map(item=>[item.id,item])),index=spatialIndex(64*scale),records=[];
 // All measurements are done before transforms/leader lines are written.
 groups.forEach((group,n)=>{
  const owner=group.dataset.owner||group.parentElement.dataset.owner,item=itemMap.get(owner),m=matrix(group,svg),box=transformedBox(boxes[n],m.all);
  const dimension=group.classList.contains('dimension-caption'),number=group.dataset.boundText==='number';
  const manual=group.dataset.manual==='true'||item?.locked||['text','note','marker','route'].includes(item?.type);
  const record={group,owner,item,m,box,dimension,number,fixed:manual};
  if(item?.type==='room'&&!manual&&!dimension&&!number){record.rings=worldRings(item);record.room=polygonBounds(record.rings);}
  records.push(record);
 });
 const gap=2*scale;
 const v=svg.viewBox.baseVal,scene=polygonBounds(items.map(worldRings).flat());
 const fitScene=scene.x>=v.x&&scene.y>=v.y&&scene.x+scene.w<=v.x+v.width&&scene.y+scene.h<=v.y+v.height;
 const onScreen=b=>!fitScene||(b.x>=v.x+gap&&b.y>=v.y+gap&&b.x+b.w<=v.x+v.width-gap&&b.y+b.h<=v.y+v.height-gap);
 if(svg.id==='canvas'&&fitScene){const inverse=svg.getScreenCTM()?.inverse();if(inverse)for(const el of svg.parentElement.querySelectorAll('.canvas-tools,.draw-tools')){const b=el.getBoundingClientRect();if(b.width&&b.height)index.add(transformedBox({x:b.x,y:b.y,width:b.width,height:b.height},inverse));}}
 for(const record of records.filter(r=>r.fixed))index.add(moved(record.box,0,0,gap));
 const priority=r=>r.number?3:r.dimension?2:1;
 const pending=records.filter(r=>!r.fixed).sort((a,b)=>priority(b)-priority(a));
 function inRoom(record,b){
  if(!record.rings)return false;
  return [[0,0],[.5,0],[1,0],[0,.5],[.5,.5],[1,.5],[0,1],[.5,1],[1,1]].every(([x,y])=>contains(record.rings,{x:b.x+b.w*x,y:b.y+b.h*y}));
 }
 for(const record of pending){
  const b=record.box;
  function* candidates(){
   if(record.room){const r=record.room;for(const y of [.5,.35,.65,.2,.8])for(const x of [.5,.35,.65,.2,.8]){const dx=r.x+r.w*x-b.x-b.w/2,dy=r.y+r.h*y-b.y-b.h/2;if(inRoom(record,moved(b,dx,dy,gap)))yield {dx,dy};}}
   yield {dx:0,dy:0};
   const directions=record.dimension&&b.h>b.w?[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]:[[0,-1],[0,1],[-1,0],[1,0],[-1,-1],[1,-1],[-1,1],[1,1]];
   for(let radius=8;radius<=96;radius+=8)for(const [x,y] of directions)yield {dx:x*radius*scale,dy:y*radius*scale};
  }
  const free=(dx,dy)=>{const box=moved(b,dx,dy,gap);return onScreen(box)&&!index.hits(box);};
  let choice;for(const p of candidates())if(free(p.dx,p.dy)){choice=p;break;}
  if(!choice){
   // Large captions use nearby callouts instead of truncation or tiny type.
   for(let radius=112;radius<=2048&&!choice;radius+=16){const d=radius*scale;for(const [x,y] of [[0,-1],[0,1],[-1,0],[1,0],[-1,-1],[1,-1],[-1,1],[1,1]]){const dx=x*d,dy=y*d;if(free(dx,dy)){choice={dx,dy};break;}}}
  }
  choice??={dx:0,dy:0};record.choice=choice;index.add(moved(b,choice.dx,choice.dy,gap));
 }
 const lineLayer=svg.querySelector('[data-annotation-layer="lines"]');
 for(const record of pending){
  const {dx,dy}=record.choice;if(Math.abs(dx)+Math.abs(dy)<.01)continue;
  const p=record.m.parent,det=p.a*p.d-p.b*p.c;
  if(!det)continue;
  const localX=(p.d*dx-p.c*dy)/det,localY=(-p.b*dx+p.a*dy)/det,original=record.group.getAttribute('transform')||'';
  record.group.setAttribute('transform',`translate(${localX} ${localY}) ${original}`);
  record.group.dataset.autoLocalX=String(localX);record.group.dataset.autoLocalY=String(localY);
  const box=moved(record.box,dx,dy,0),outside=record.room&&!inRoom(record,box);
  if(((record.dimension||record.number)&&Math.hypot(dx,dy)>12*scale)||outside){
   const x=record.box.x+record.box.w/2,y=record.box.y+record.box.h/2,endX=box.x+box.w/2,endY=box.y+box.h/2;
   const line=svg.ownerDocument.createElementNS('http://www.w3.org/2000/svg','path');
   line.setAttribute('d',`M ${x} ${y} L ${endX} ${endY}`);line.setAttribute('fill','none');line.setAttribute('stroke',record.dimension?'#b54840':'#718388');line.setAttribute('stroke-width',String(.75*scale));line.setAttribute('class','annotation-leader');line.setAttribute('pointer-events','none');lineLayer?.append(line);
  }
 }
}
