// Neutral drawing geometry: no file decoder, network, or dependency on a CAD library.
import {contains,signedArea,polygonBounds} from './geometry.mjs';
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export const cleanText=s=>String(s||'').replace(/\\P/g,' ').replace(/\\[a-zA-Z][^;]*;/g,'').replace(/[{}]/g,'').trim().slice(0,240);
export function drawingBounds(paths){let left=Infinity,top=Infinity,right=-Infinity,bottom=-Infinity;for(const path of paths)for(const p of path.points){left=Math.min(left,p.x);top=Math.min(top,p.y);right=Math.max(right,p.x);bottom=Math.max(bottom,p.y);}return left===Infinity?{x:0,y:0,w:1,h:1}:{x:left,y:top,w:right-left,h:bottom-top};}
export function drawingRegions(scene){
 // Architectural drawings often contain several floors next to each other in model space.
 const paths=scene.paths.filter(p=>p.recommended),b=drawingBounds(paths),gap=Math.max(b.w,b.h)/100;
 const regions=[];
 for(const p of paths){const q=drawingBounds([p]);if(q.w+q.h<gap*.1)continue;let hits=regions.filter(r=>q.x<=r.x+r.w+gap&&q.x+q.w>=r.x-gap&&q.y<=r.y+r.h+gap&&q.y+q.h>=r.y-gap);const all=[q,...hits],x=Math.min(...all.map(r=>r.x)),y=Math.min(...all.map(r=>r.y)),right=Math.max(...all.map(r=>r.x+r.w)),bottom=Math.max(...all.map(r=>r.y+r.h));for(const r of hits)regions.splice(regions.indexOf(r),1);regions.push({x,y,w:right-x,h:bottom-y});}
 return regions.filter(r=>r.w>gap&&r.h>gap).sort((a,b)=>b.w*b.h-a.w*a.h).slice(0,40);
}
const segmentKey=(a,b,tol)=>[a,b].map(p=>Math.round(p.x/tol)+','+Math.round(p.y/tol)).sort().join('|');
function simplify(ring,tol){let p=ring;for(let k=0;k<3;k++){const next=p.filter((v,n)=>{const a=p[(n+p.length-1)%p.length],b=p[(n+1)%p.length];return Math.abs((v.x-a.x)*(b.y-a.y)-(v.y-a.y)*(b.x-a.x))>tol*Math.max(distance(a,b),tol);});if(next.length<3)break;p=next;}return p;}
function faces(lines,tol,minArea){
 const segments=lines.map(l=>({...l,ts:[0,1]}));
 for(let n=0;n<segments.length;n++)for(let m=n+1;m<segments.length;m++){
  const e=segments[n],f=segments[m],rx=e.b.x-e.a.x,ry=e.b.y-e.a.y,sx=f.b.x-f.a.x,sy=f.b.y-f.a.y,den=rx*sy-ry*sx;
  if(Math.abs(den)<1e-10){if(Math.abs((f.a.x-e.a.x)*ry-(f.a.y-e.a.y)*rx)>tol*Math.hypot(rx,ry)*.01)continue;for(const [line,other]of [[e,f],[f,e]]){const dx=line.b.x-line.a.x,dy=line.b.y-line.a.y,len2=dx*dx+dy*dy;for(const p of [other.a,other.b]){const t=((p.x-line.a.x)*dx+(p.y-line.a.y)*dy)/len2;if(t>0&&t<1)line.ts.push(t);}}continue;}
  const qx=f.a.x-e.a.x,qy=f.a.y-e.a.y,t=(qx*sy-qy*sx)/den,u=(qx*ry-qy*rx)/den;if(t>=0&&t<=1&&u>=0&&u<=1){e.ts.push(t);f.ts.push(u);}
 }
 const nodes=[],buckets=new Map(),edges=new Map(),node=p=>{
  const x=Math.round(p.x/tol),y=Math.round(p.y/tol);let nearest,best=tol;
  for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++)for(const hit of buckets.get((x+dx)+','+(y+dy))||[]){const d=distance(hit,p);if(d<=best){nearest=hit;best=d;}}
  if(nearest)return nearest;
  const key=x+','+y,value={key:String(nodes.length),x:p.x,y:p.y,out:[]};nodes.push(value);if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(value);return value;
 };
 for(const e of segments){const ts=e.ts.sort((a,b)=>a-b).filter((t,n,a)=>!n||t-a[n-1]>1e-7);for(let n=1;n<ts.length;n++){const at=t=>({x:e.a.x+(e.b.x-e.a.x)*t,y:e.a.y+(e.b.y-e.a.y)*t}),a=node(at(ts[n-1])),b=node(at(ts[n]));if(a===b)continue;const key=[a.key,b.key].sort().join('|');if(edges.has(key))continue;edges.set(key,true);const forward={a,b,visited:false},back={a:b,b:a,visited:false};forward.twin=back;back.twin=forward;a.out.push(forward);b.out.push(back);}}
 for(const p of nodes)p.out.sort((e,f)=>Math.atan2(e.b.y-p.y,e.b.x-p.x)-Math.atan2(f.b.y-p.y,f.b.x-p.x));
 const rooms=[];for(const p of nodes)for(const start of p.out){if(start.visited)continue;let edge=start,ring=[],closed=false;for(let n=0;n<1000;n++){if(edge.visited)break;edge.visited=true;ring.push({x:edge.a.x,y:edge.a.y});const out=edge.b.out,index=out.indexOf(edge.twin);edge=out[(index+out.length-1)%out.length];if(edge===start){closed=true;break;}}if(closed&&ring.length>=3&&ring.length<=800&&signedArea(ring)>minArea){ring=simplify(ring,tol*.15);const b=polygonBounds([ring]);if(Math.min(b.w,b.h)>tol*4&&Math.max(b.w,b.h)/Math.min(b.w,b.h)<40)rooms.push(ring);}}
 return rooms;
}
export function convertDrawing(scene,options={}){
 const layers=new Set(options.layers||scene.layers.filter(l=>l.recommended).map(l=>l.name)),crop=options.crop||scene.bounds;
 const inside=p=>p.x>=crop.x&&p.y>=crop.y&&p.x<=crop.x+crop.w&&p.y<=crop.y+crop.h;
 const chosen=scene.paths.filter(p=>p.eligible!==false&&layers.has(p.layer)&&p.points.every(inside)),span=Math.max(crop.w,crop.h),cm=Number(options.cmPerSourceUnit)||0,unit=cm?cm:1000/span;
 const tol=cm?(scene.sourceMode==='raster'?6:2)/cm:span/1500,minWall=cm?.05*100/cm:span/3000,maxThickness=cm?50/cm:span/55,windows=[],doorEdges=[];
 let segments=[];
 for(const path of chosen){
  if(path.curved)continue;const p=path.points,b=drawingBounds([path]),small=Math.min(b.w,b.h),large=Math.max(b.w,b.h);
  if(path.kind==='window'||(/door.?window/i.test(path.layer)&&path.closed&&p.length<=6&&large>small*8&&small<maxThickness*.3)){const a=b.w>b.h?{x:b.x,y:b.y+b.h/2}:{x:b.x+b.w/2,y:b.y},z=b.w>b.h?{x:b.x+b.w,y:a.y}:{x:a.x,y:b.y+b.h};windows.push({a,b:z,thickness:Math.max(small,tol)});continue;}
  if(path.kind==='doorOpening')doorEdges.push({a:p[0],b:p[1],hingeRight:path.hingeRight});
  const add=(a,b)=>{if(distance(a,b)>=minWall)segments.push({a,b,thickness:['wallCenter','floorBoundary','doorOpening'].includes(path.kind)?path.lineWidth:cm?14/cm:span/200,centerline:['wallCenter','floorBoundary'].includes(path.kind),contour:['floorBoundary','doorOpening'].includes(path.kind),opening:/door.?window/i.test(path.layer)||path.stroke==='#2776bb',boundaryOnly:scene.kind==='pdf'&&path.stroke&&(/^#9/.test(path.stroke)||path.stroke==='#2776bb')&&!path.fill});};
  for(let n=1;n<p.length;n++)add(p[n-1],p[n]);if(path.closed&&distance(p[0],p.at(-1))>tol)add(p.at(-1),p[0]);
 }
 if(segments.length>4000)throw Error('Το σχέδιο έχει πολλές γραμμές. Διάλεξε μία κάτοψη και μόνο τα αρχιτεκτονικά layers.');
 const unique=new Map();for(const e of segments)unique.set(segmentKey(e.a,e.b,tol*.05),e);segments=[...unique.values()];
 // Pair parallel wall boundaries. Preserve their actual thickness and centre line.
 const paired=new Set(),walls=[];
 for(let n=0;n<segments.length;n++){
  if(paired.has(n))continue;const a=segments[n];if(a.centerline){walls.push(a);continue;}const dx=a.b.x-a.a.x,dy=a.b.y-a.a.y,len=distance(a.a,a.b);let best;
  for(let m=n+1;m<segments.length;m++){if(paired.has(m))continue;const b=segments[m],bx=b.b.x-b.a.x,by=b.b.y-b.a.y,bl=distance(b.a,b.b);if(Math.abs(dx*by-dy*bx)>len*bl*.003)continue;const gap=Math.abs((b.a.x-a.a.x)*dy-(b.a.y-a.a.y)*dx)/len;if(gap<tol*.2||gap>maxThickness)continue;const project=p=>((p.x-a.a.x)*dx+(p.y-a.a.y)*dy)/len,start=Math.max(0,Math.min(project(b.a),project(b.b))),end=Math.min(len,Math.max(project(b.a),project(b.b)));if(end-start<Math.min(len,bl)*.65||end-start<gap*2)continue;if(!best||gap<best.gap)best={m,b,gap,start,end};}
  if(best){const {b,gap,start,end,m}=best,offset=((b.a.x-a.a.x)*(-dy/len)+(b.a.y-a.a.y)*dx/len)/2,at=t=>({x:a.a.x+dx/len*t-dy/len*offset,y:a.a.y+dy/len*t+dx/len*offset});if(a.opening&&b.opening&&cm&&gap*cm<25&&(end-start)*cm>120)windows.push({a:at(start),b:at(end),thickness:gap});else walls.push({a:at(start),b:at(end),thickness:gap});paired.add(n);paired.add(m);}else if(!a.boundaryOnly&&len>maxThickness*.6)walls.push(a);
 }
 // Raster pieces of the same wall can sit on opposite ink edges. Align their
 // centre lines within the measured thickness before joining openings.
 if(scene.sourceMode==='raster'){
  const groups=[];
  for(const wall of walls){const dx=wall.b.x-wall.a.x,dy=wall.b.y-wall.a.y,length=Math.hypot(dx,dy),ux=dx/length,uy=dy/length;
   let group=groups.find(g=>Math.abs(g.ux*uy-g.uy*ux)<.002&&Math.abs((wall.a.x-g.a.x)*(-g.uy)+(wall.a.y-g.a.y)*g.ux)<Math.max(g.thickness,wall.thickness)*.7+tol);
   if(!group){group={ux,uy,a:wall.a,thickness:wall.thickness,members:[]};groups.push(group);}group.members.push(wall);
  }
  for(const g of groups){let weighted=0,total=0;for(const w of g.members){const len=distance(w.a,w.b);weighted+=(-g.uy*w.a.x+g.ux*w.a.y)*len;total+=len;}const q=weighted/total;for(const w of g.members){const delta=q-(-g.uy*w.a.x+g.ux*w.a.y);w.a={x:w.a.x-g.uy*delta,y:w.a.y+g.ux*delta};w.b={x:w.b.x-g.uy*delta,y:w.b.y+g.ux*delta};}}
 }
 // Close collinear door/window gaps and extend wall ends to meet corners.
 const bridges=[];
 for(let n=0;n<walls.length;n++)for(let m=n+1;m<walls.length;m++){
  const a=walls[n],b=walls[m],dx=a.b.x-a.a.x,dy=a.b.y-a.a.y,len=distance(a.a,a.b),sx=b.b.x-b.a.x,sy=b.b.y-b.a.y,bl=distance(b.a,b.b),den=dx*sy-dy*sx;
  if(Math.abs(den)<len*bl*.002){if(Math.abs((b.a.x-a.a.x)*dy-(b.a.y-a.a.y)*dx)/len>tol*2)continue;const ends=[[a.a,b.a],[a.a,b.b],[a.b,b.a],[a.b,b.b]].sort((p,q)=>distance(...p)-distance(...q)),[p,q]=ends[0],gap=distance(p,q),limit=cm?(Number(options.closeGapM??8)*100)/cm:span/3;if(gap>tol&&gap<limit)bridges.push({a:p,b:q,thickness:Math.min(a.thickness,b.thickness),opening:true});continue;}
  const qx=b.a.x-a.a.x,qy=b.a.y-a.a.y,t=(qx*sy-qy*sx)/den,u=(qx*dy-qy*dx)/den,reach=Math.max(Math.max(a.thickness,b.thickness)*1.2+tol,scene.sourceMode==='raster'&&cm?100/cm:0);if(t>=-reach/len&&t<=1+reach/len&&u>=-reach/bl&&u<=1+reach/bl){const p={x:a.a.x+dx*t,y:a.a.y+dy*t};if(t<0)a.a=p;else if(t>1)a.b=p;if(u<0)b.a=p;else if(u>1)b.b=p;}
 }
 const all=[...walls,...bridges,...windows];let rings=faces(all,tol,cm?(options.rasterPhysical?Math.min(Number(options.minRoomM2)||2,.7):(Number(options.minRoomM2)||2))*10000/(cm*cm):span*span*.0005);
 // A table inside a floor enclosure is not a second room. Raster contours
 // can form nested loops even when they are disconnected from the wall graph.
 if(scene.sourceMode==='raster')rings=rings.filter(r=>!rings.some(other=>other!==r&&signedArea(other)>signedArea(r)&&r.every(p=>contains([other],p))));
 if(rings.length>250)throw Error('Αναγνωρίστηκαν πολλοί κλειστοί βρόχοι. Περιορίσε τα layers ή την περιοχή.');
 const offset={x:crop.x,y:crop.y},point=p=>({x:(p.x-offset.x)*unit+100,y:(p.y-offset.y)*unit+100}),id=()=>crypto.randomUUID(),heightCm=Math.max(20,Math.min(10000,(Number(options.heightM)||2.8)*100)),items=[];

 let omittedShapes=0;
 if(scene.sourceMode==='raster'){
 const normalized=t=>/[Α-Ω]/i.test(t)?t.replace(/[ABEHIKMNOPTXY]/g,c=>({A:'Α',B:'Β',E:'Ε',H:'Η',I:'Ι',K:'Κ',M:'Μ',N:'Ν',O:'Ο',P:'Ρ',T:'Τ',X:'Χ',Y:'Υ'}[c])):t;
 const roomName=t=>/ΓΡΑΦ|ΞΕΝ|ΚΟΥΖ|ΣΑΛΟΝ|ΤΡΑΠΕΖΑΡ|ΑΠΟΘ|ΥΠΝ|ΝΤΟΥΣ|ΤΟΥΑΛ|ΒΕΡΑΝΤ|ΧΩΡ|ΡΑΜΠΑ|\b(?:WC|BED|KITCHEN|LIVING|BATH|OFFICE|STORE|ROOM|DINING|GARAGE)/i.test(normalized(t.text));
 const labels=(scene.texts||[]).filter(t=>inside(t)&&roomName(t)),names=new Map(),area=r=>signedArea(r)*unit*unit/10000;
 for(const t of labels){const small=/ΝΤΟΥΣ|ΤΟΥΑΛ|ΑΠΟΘ|WC|BATH|STORE/.test(normalized(t.text));const ring=rings.filter(r=>contains([r],t)&&area(r)>=((small||options.rasterPhysical)?.7:8)).sort((a,b)=>area(a)-area(b))[0];if(ring){if(!names.has(ring))names.set(ring,[]);names.get(ring).push(normalized(t.text));}}
 rings=rings.filter(r=>{if(names.has(r))return true;const nested=rings.some(o=>o!==r&&area(o)>area(r)&&r.every(v=>contains([o],v)));if(options.skipSmallUnlabelled!==false&&(!options.rasterPhysical&&(nested||labels.length>=2&&area(r)<12)||area(r)<(Number(options.minRoomM2)||2))){omittedShapes++;return false;}return true;});
 for(const ring of rings){const ps=ring.map(point),b=polygonBounds([ps]);if(b.w<8||b.h<8)continue;const label=[...new Set(names.get(ring)||[])].join(' / ')||'Χώρος '+(items.length+1);items.push({id:id(),type:'room',...b,rotation:0,label,number:'',color:'#e2e9ee',floor:'imported',locked:false,hidden:false,heightCm,outline:[ps.map(p=>({x:(p.x-b.x)/b.w,y:(p.y-b.y)/b.h}))]});}
 }else{
 const roomName=t=>/ΓΡΑΦ|ΞΕΝ|ΚΟΥΖ|ΣΑΛΟΝ|ΤΡΑΠΕΖΑΡ|ΑΠΟΘ|ΥΠΝ|ΝΤΟΥΣ|ΤΟΥΑΛ|ΒΕΡΑΝΤ|ΧΩΡ|\b(?:WC|BED|KITCHEN|LIVING|BATH|OFFICE|STORE|ROOM|DINING|GARAGE)/i.test(t.text),hasRoomNames=scene.texts?.filter(roomName).length>=2;
 for(const ring of rings){const ps=ring.map(point),b=polygonBounds([ps]);if(b.w<8||b.h<8)continue;const label=scene.texts?.find(t=>inside(t)&&contains([ring],t)&&roomName(t))||scene.texts?.find(t=>inside(t)&&contains([ring],t)&&!/^\d|^[HKM]\d|1:/.test(t.text));if(scene.sourceMode==='raster'&&cm>0&&options.skipSmallUnlabelled!==false&&hasRoomNames&&(!label||!roomName(label))&&signedArea(ring)*cm*cm<120000){omittedShapes++;continue;}items.push({id:id(),type:'room',...b,rotation:0,label:label?.text||'Χώρος '+(items.length+1),number:'',color:'#e2e9ee',floor:'imported',locked:false,hidden:false,heightCm,outline:[ps.map(p=>({x:(p.x-b.x)/b.w,y:(p.y-b.y)/b.h}))]});}
 }
 // Keep walls that are not already represented by an editable room perimeter.
 const covered=e=>rings.some(r=>r.some((a,n)=>{const b=r[(n+1)%r.length],dx=b.x-a.x,dy=b.y-a.y,len=distance(a,b),at=p=>((p.x-a.x)*dx+(p.y-a.y)*dy)/(len*len);return len&&[e.a,e.b].every(p=>Math.abs((p.x-a.x)*dy-(p.y-a.y)*dx)/len<tol*3&&at(p)>=-.02&&at(p)<=1.02);}));
 for(const e of walls.filter(e=>!e.contour&&!covered(e))){const a=point(e.a),b=point(e.b),w=distance(a,b),h=Math.max(8,e.thickness*unit);if(w<8)continue;items.push({id:id(),type:'wall',x:(a.x+b.x)/2-w/2,y:(a.y+b.y)/2-h/2,w,h,rotation:Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI,label:'',number:'',color:'#52626b',floor:'imported',locked:false,hidden:false,heightCm});}
 for(const e of doorEdges){const a=point(e.a),b=point(e.b),w=distance(a,b),angle=Math.atan2(b.y-a.y,b.x-a.x),cx=(a.x+b.x)/2+Math.sin(angle)*w/2,cy=(a.y+b.y)/2-Math.cos(angle)*w/2;items.push({id:id(),type:'door',x:cx-w/2,y:cy-w/2,w,h:w,rotation:angle*180/Math.PI,label:'Πόρτα',number:'',color:'#3686b4',floor:'imported',locked:false,hidden:false,heightCm:Math.min(210,heightCm),...(e.hingeRight?{hingeRight:true}:{})});}
 // Door swings provide an explicit architectural opening, rather than a guessed symbol.
 for(const arc of scene.arcs||[]){if(!layers.has(arc.layer)||!inside(arc.center))continue;const sweep=(arc.end-arc.start+Math.PI*2)%(Math.PI*2);if(sweep<1.2||sweep>1.95)continue;const starts=[arc.start,arc.end].map(angle=>({a:arc.center,b:{x:arc.center.x+Math.cos(angle)*arc.radius,y:arc.center.y+Math.sin(angle)*arc.radius}}));const nearest=starts.map(e=>({e,score:Math.min(...all.map(l=>Math.min(distance(l.a,e.b),distance(l.b,e.b))))})).sort((a,b)=>a.score-b.score)[0]?.e;if(!nearest)continue;const a=point(nearest.a),b=point(nearest.b),w=distance(a,b);if(w<8)continue;const angle=Math.atan2(b.y-a.y,b.x-a.x),cx=(a.x+b.x)/2+Math.sin(angle)*w/2,cy=(a.y+b.y)/2-Math.cos(angle)*w/2;items.push({id:id(),type:'door',x:cx-w/2,y:cy-w/2,w,h:w,rotation:angle*180/Math.PI,label:'Πόρτα',number:'',color:'#3686b4',floor:'imported',locked:false,hidden:false,heightCm:Math.min(210,heightCm)});}
 const windowKeys=new Set();for(const e of windows){const a=point(e.a),b=point(e.b),w=distance(a,b),key=segmentKey(a,b,3);if(w<8||windowKeys.has(key))continue;windowKeys.add(key);const h=Math.max(8,e.thickness*unit);items.push({id:id(),type:'window',x:(a.x+b.x)/2-w/2,y:(a.y+b.y)/2-h/2,w,h,rotation:Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI,label:'Παράθυρο',number:'',color:'#90b5c4',floor:'imported',locked:false,hidden:false,heightCm:120});}
 if(!items.length)throw Error('Δεν αναγνωρίστηκαν αρχιτεκτονικά στοιχεία στην περιοχή. Διάλεξε άλλα layers ή μεγαλύτερη περιοχή.');
 if(items.length>1000)throw Error('Πάνω από 1.000 στοιχεία. Περιορίσε την περιοχή πριν από την εισαγωγή.');
 const warnings=[...(scene.warnings||[]),'Η αναγνώριση χώρων είναι προσέγγιση. Κενά έως '+(options.closeGapM??8)+' m γεφυρώνονται για κλειστούς βρόχους· έλεγξε την προεπισκόπηση.','Ύψος '+heightCm/100+' m από τη ρύθμιση εισαγωγής, όχι από τη 2D κάτοψη.'];if(!cm)warnings.push('Χωρίς πραγματική κλίμακα. Όρισε γνωστή διάσταση μετά την εισαγωγή.');if(scene.scaleDenominator)warnings.push('Κλίμακα 1:'+scene.scaleDenominator+' από το PDF. Επιβεβαίωσε μία γνωστή διάσταση.');if(omittedShapes)warnings.push('Παραλείφθηκαν '+omittedShapes+' μικρά κλειστά σχήματα χωρίς όνομα χώρου, για αποφυγή επίπλων. Μπορείς να απενεργοποιήσεις το φίλτρο.');
 return {plan:{schema:'nk-plan-builder/v1',title:options.title||'Εισαγόμενη κάτοψη',floors:[{id:'imported',name:'Εισαγόμενο επίπεδο'}],activeFloor:'imported',items,notes:warnings.join('\n'),...(cm?{measurement:{cmPerUnit:cm/unit,unit:'m',showBuilding:false}}:{})},stats:{rooms:items.filter(i=>i.type==='room').length,walls:items.filter(i=>i.type==='wall').length,doors:items.filter(i=>i.type==='door').length,windows:items.filter(i=>i.type==='window').length,sourcePaths:chosen.length},warnings};
}
