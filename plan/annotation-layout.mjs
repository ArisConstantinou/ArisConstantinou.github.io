import {worldRings,polygonBounds,contains} from './geometry.mjs';
const NS='http://www.w3.org/2000/svg';
function transformedBox(box,m){
 const points=[[box.x,box.y],[box.x+box.width,box.y],[box.x+box.width,box.y+box.height],[box.x,box.y+box.height]].map(([x,y])=>({x:m.a*x+m.c*y+m.e,y:m.b*x+m.d*y+m.f}));
 const b=polygonBounds([points]);return {x:b.x,y:b.y,w:b.w,h:b.h};
}
function matrix(group,svg){
 const transform=element=>{let m=svg.createSVGMatrix();const list=element.transform?.baseVal;for(let n=0;n<(list?.numberOfItems??0);n++)m=m.multiply(list.getItem(n).matrix);return m;};
 const own=transform(group),parent=transform(group.parentElement);return {parent,all:parent.multiply(own)};
}
function spatialIndex(cell){
 const cells=new Map();
 function keys(b){const out=[];for(let x=Math.floor(b.x/cell);x<=Math.floor((b.x+b.w)/cell);x++)for(let y=Math.floor(b.y/cell);y<=Math.floor((b.y+b.h)/cell);y++)out.push(x+','+y);return out;}
 return {add(b){for(const key of keys(b)){if(!cells.has(key))cells.set(key,[]);cells.get(key).push(b);}},query(b){const found=new Set();for(const key of keys(b))for(const a of cells.get(key)||[])if(a.x<b.x+b.w&&b.x<a.x+a.w&&a.y<b.y+b.h&&b.y<a.y+a.h)found.add(a);return [...found];},hits(b){return this.query(b).length>0;}};
}
const moved=(b,dx,dy,pad=0)=>({x:b.x+dx-pad,y:b.y+dy-pad,w:b.w+pad*2,h:b.h+pad*2});
const segmentBox=(a,b,pad=0)=>({x:Math.min(a.x,b.x)-pad,y:Math.min(a.y,b.y)-pad,w:Math.abs(a.x-b.x)+pad*2,h:Math.abs(a.y-b.y)+pad*2});
// Continuous segment tests catch crossings even when both endpoints miss the text.
function crosses(a,b,rect){
 let lo=0,hi=1;const dx=b.x-a.x,dy=b.y-a.y;
 for(const [p,q] of [[-dx,a.x-rect.x],[dx,rect.x+rect.w-a.x],[-dy,a.y-rect.y],[dy,rect.y+rect.h-a.y]]){
  if(Math.abs(p)<1e-9){if(q<=0)return false;}else{const t=q/p;if(p<0)lo=Math.max(lo,t);else hi=Math.min(hi,t);if(lo>=hi)return false;}
 }
 return hi>0&&lo<1;
}
function insideRoom(rings,b){
 if(![[0,0],[1,0],[1,1],[0,1]].every(([x,y])=>contains(rings,{x:b.x+x*b.w,y:b.y+y*b.h})))return false;
 // Corners alone miss holes and concave edges passing through a caption.
 return rings.every(r=>r.every((p,n)=>!crosses(p,r[(n+1)%r.length],b)));
}
function place(record,dx,dy,factor=1){
 const {group,m,box}=record,p=m.parent,det=p.a*p.d-p.b*p.c;if(!det)return;
 const localX=(p.d*dx-p.c*dy)/det,localY=(-p.b*dx+p.a*dy)/det;
 const cx=box.x+box.w/2,cy=box.y+box.h/2,centre=m.all.inverse(),x=centre.a*cx+centre.c*cy+centre.e,y=centre.b*cx+centre.d*cy+centre.f;
 group.setAttribute('transform',`translate(${localX} ${localY}) ${group.getAttribute('transform')||''} translate(${x} ${y}) scale(${factor}) translate(${-x} ${-y})`);
 group.dataset.autoLocalX=String(localX);group.dataset.autoLocalY=String(localY);group.dataset.fitScale=String(factor);
}
export function layoutAnnotations(svg,groups,boxes,items,scale){
 const itemMap=new Map(items.map(i=>[i.id,i])),index=spatialIndex(64*scale),lineIndex=spatialIndex(64*scale),records=[];
 const rooms=items.filter(i=>i.type==='room').map(item=>{const rings=worldRings(item);return {item,rings,box:polygonBounds(rings)};});
 groups.forEach((group,n)=>{
  const owner=group.dataset.owner||group.parentElement.dataset.owner,item=itemMap.get(owner),m=matrix(group,svg),box=transformedBox(boxes[n],m.all),dimension=group.classList.contains('dimension-caption'),number=group.dataset.boundText==='number';
  const fixed=group.dataset.manual==='true'||item?.locked||['text','note','marker','route'].includes(item?.type);
  const record={group,owner,item,m,box,dimension,number,fixed};if(item?.type==='room'&&!dimension){record.rings=worldRings(item);record.room=polygonBounds(record.rings);record.fixed=false;record.neighbours=rooms.filter(r=>r.item.id!==item.id&&r.item.w*r.item.h<item.w*item.h&&r.box.x<record.room.x+record.room.w&&r.box.x+r.box.w>record.room.x&&r.box.y<record.room.y+record.room.h&&r.box.y+r.box.h>record.room.y);}records.push(record);
 });
 const gap=4*scale;
 for(const r of records.filter(r=>r.fixed&&!r.dimension))index.add(moved(r.box,0,0,gap));
 const pending=records.filter(r=>!r.fixed&&!r.dimension).sort((a,b)=>(b.number?2:1)-(a.number?2:1));
 for(const record of pending){
  const b=record.box;let choice;
  const owned=box=>insideRoom(record.rings,box)&&!record.neighbours.some(r=>{
   if(r.box.x>=box.x+box.w||r.box.x+r.box.w<=box.x||r.box.y>=box.y+box.h||r.box.y+r.box.h<=box.y)return false;
   if([[0,0],[1,0],[1,1],[0,1],[.5,.5]].some(([x,y])=>contains(r.rings,{x:box.x+x*box.w,y:box.y+y*box.h})))return true;
   return r.rings.some(ring=>ring.some((p,n)=>(p.x>box.x&&p.x<box.x+box.w&&p.y>box.y&&p.y<box.y+box.h)||crosses(p,ring[(n+1)%ring.length],box)));
  });
  if(record.room){
   const r=record.room;
   // Honor stored offsets whenever they fit; automatic names prefer centre.
   for(let factor=1;factor>=.035&&!choice;factor*=.86){
    const resized={x:b.x+b.w*(1-factor)/2,y:b.y+b.h*(1-factor)/2,w:b.w*factor,h:b.h*factor},padding=Math.min(gap,r.w*.025,r.h*.025),candidates=[];
    if(record.number||record.group.dataset.manual==='true')candidates.push({dx:0,dy:0});
    for(const y of [.5,.65,.35,.8,.2,.9,.1])for(const x of [.5,.35,.65,.2,.8,.1,.9])candidates.push({dx:r.x+r.w*x-resized.x-resized.w/2,dy:r.y+r.h*y-resized.y-resized.h/2});
    for(const p of candidates){const box=moved(resized,p.dx,p.dy,padding);if(owned(box)&&!index.hits(box)){choice={...p,factor,box};break;}}
   }
   if(!choice){const factor=.02,resized={x:b.x+b.w*(1-factor)/2,y:b.y+b.h*(1-factor)/2,w:b.w*factor,h:b.h*factor};for(let y=1;y<40&&!choice;y++)for(let x=1;x<40;x++){const dx=r.x+r.w*x/40-resized.x-resized.w/2,dy=r.y+r.h*y/40-resized.y-resized.h/2,box=moved(resized,dx,dy);if(owned(box)&&!index.hits(box)){choice={dx,dy,factor,box};break;}}}
  }else{
   for(let radius=0;radius<=1024&&!choice;radius+=8)for(const [x,y] of [[0,-1],[0,1],[-1,0],[1,0],[-1,-1],[1,-1],[-1,1],[1,1]]){const dx=x*radius*scale,dy=y*radius*scale,box=moved(b,dx,dy,gap);if(!index.hits(box)){choice={dx,dy,factor:1,box};break;}}
  }
  if(choice){place(record,choice.dx,choice.dy,choice.factor);index.add(choice.box);}
 }
 const lines=svg.querySelector('[data-annotation-layer="lines"]'),intersectsText=segments=>segments.some(([a,b])=>index.query(segmentBox(a,b,.01*scale)).some(rect=>crosses(a,b,rect))),intersectsLine=box=>lineIndex.query(box).some(entry=>crosses(entry.a,entry.b,box));
 for(const record of records.filter(r=>r.dimension).sort((a,b)=>Number(a.group.dataset.building==='true')-Number(b.group.dataset.building==='true'))){
  const g=record.group,parse=key=>{const [x,y]=g.dataset[key].split(',').map(Number);return {x,y};},a=parse('start'),b=parse('end'),normal=parse('normal'),box=record.box;let choice,fallback;
  for(let distance=g.dataset.building==='true'?46:22;distance<=1024&&!choice;distance+=16)for(const sign of [1,-1]){
   const n={x:normal.x*sign,y:normal.y*sign},d=distance*scale,point=(p,amount)=>({x:p.x+n.x*amount,y:p.y+n.y*amount}),p=point(a,d),q=point(b,d),tick=4*scale;
   const margin=Math.abs(n.x)*box.w/2+Math.abs(n.y)*box.h/2+5*scale,cx=(p.x+q.x)/2+n.x*margin,cy=(p.y+q.y)/2+n.y*margin,dx=cx-box.x-box.w/2,dy=cy-box.y-box.h/2,caption=moved(box,dx,dy,gap);
   const tx=(q.x-p.x)/Math.max(.001,Math.hypot(q.x-p.x,q.y-p.y)),ty=(q.y-p.y)/Math.max(.001,Math.hypot(q.x-p.x,q.y-p.y)),slash=v=>[{x:v.x-(tx+n.x)*tick,y:v.y-(ty+n.y)*tick},{x:v.x+(tx+n.x)*tick,y:v.y+(ty+n.y)*tick}],main=[[p,q],slash(p),slash(q)],extensions=[[point(a,3*scale),point(a,d+tick)],[point(b,3*scale),point(b,d+tick)]];
   if(index.hits(caption)||intersectsLine(caption)||intersectsText(main))continue;
   const candidate={dx,dy,caption,main,extensions};fallback??=candidate;if(!intersectsText(extensions)){choice=candidate;break;}
  }
  choice??=fallback;if(!choice)continue;place(record,choice.dx,choice.dy);index.add(choice.caption);const segments=[...choice.main];
  for(const [a,b] of choice.extensions){
   // Standard drafting breaks in extension lines protect text when no straight lane clears it.
   const obstacles=index.query(segmentBox(a,b,.01*scale)).filter(rect=>crosses(a,b,rect)),length=Math.hypot(b.x-a.x,b.y-a.y),dx=(b.x-a.x)/length,dy=(b.y-a.y)/length,intervals=[];
   for(const r of obstacles){const corners=[[r.x,r.y],[r.x+r.w,r.y],[r.x,r.y+r.h],[r.x+r.w,r.y+r.h]],ts=corners.map(([x,y])=>(x-a.x)*dx+(y-a.y)*dy);intervals.push([Math.max(0,Math.min(...ts)-scale),Math.min(length,Math.max(...ts)+scale)]);}
   intervals.sort((x,y)=>x[0]-y[0]);let start=0;for(const [lo,hi] of intervals){if(lo>start)segments.push([{x:a.x+dx*start,y:a.y+dy*start},{x:a.x+dx*lo,y:a.y+dy*lo}]);start=Math.max(start,hi);}if(start<length)segments.push([{x:a.x+dx*start,y:a.y+dy*start},b]);
  }
  const path=svg.ownerDocument.createElementNS(NS,'path');path.setAttribute('class','dimension-line');path.dataset.owner=record.owner;path.setAttribute('d',segments.map(([a,b])=>`M ${a.x} ${a.y} L ${b.x} ${b.y}`).join(' '));path.setAttribute('fill','none');path.setAttribute('stroke','#b54840');path.setAttribute('stroke-width','1');path.setAttribute('vector-effect','non-scaling-stroke');lines?.append(path);
  for(const [a,b] of segments)lineIndex.add({...segmentBox(a,b,.01*scale),a,b});
 }
}
