// Offline raster analysis. Only neutral wall paths leave the import worker.
import {drawingBounds,convertDrawing,cleanText} from './drawing-geometry.mjs';
import {contains,worldRings,signedArea,polygonBounds} from './geometry.mjs';

const radians=Math.PI/180;
function orientation(scene){
 const bins=new Float64Array(180),directions=[],span=Math.max(scene.bounds.w,scene.bounds.h);
 for(const p of scene.paths)if(p.stroke&&!p.curved)for(let n=1;n<p.points.length;n++){
  const a=p.points[n-1],b=p.points[n],length=Math.hypot(b.x-a.x,b.y-a.y),mx=(a.x+b.x)/2,my=(a.y+b.y)/2;
  // Sheet borders and the title table are annotations, not architectural axes.
  if(length<span*.025||length>span*.7||mx<scene.bounds.w*.05||mx>scene.bounds.w*.95||my<scene.bounds.h*.05||my>scene.bounds.h*.75)continue;
  const angle=((Math.atan2(b.y-a.y,b.x-a.x)/radians+225)%90)-45;bins[Math.min(179,Math.round((angle+45)*2))]+=length;directions.push({angle,length});
 }
 let best=0;for(let n=1;n<180;n++)if(bins[n]>bins[best])best=n;
 let sum=0,weight=0;for(const d of directions)if(Math.abs(d.angle-(best/2-45))<1){sum+=d.angle*d.length;weight+=d.length;}
 if(weight)return sum/weight;
 // Image-only PDFs still need an orientation; perpendicular ink projections
 // find the two architectural axes without a font/OCR service.
 const image=scene.raster,points=[];if(!image)return 0;
 for(let y=Math.floor(image.height*.08);y<image.height*.8;y+=3)for(let x=Math.floor(image.width*.08);x<image.width*.92;x+=3)if(image.data[y*image.width+x]<150)points.push([x,y]);
 let strongest=-1,result=0;const size=Math.ceil(Math.hypot(image.width,image.height))*2+2,offset=size/2;
 for(let angle=-45;angle<45;angle+=.5){const c=Math.cos(angle*radians),s=Math.sin(angle*radians),h=new Uint32Array(size),v=new Uint32Array(size);for(const [x,y]of points){h[Math.round(-x*s+y*c+offset)]++;v[Math.round(x*c+y*s+offset)]++;}let score=0;for(let n=0;n<size;n++)score+=h[n]*h[n]+v[n]*v[n];if(score>strongest){strongest=score;result=angle;}}
 return result;
}

function lineRuns(mask,width,height,vertical,minLength){
 const across=vertical?width:height,along=vertical?height:width,lines=[];
 const value=(x,y)=>mask[y*width+x];
 for(let q=2;q<across-2;q++){
  let start=-1,last=-1,gaps=0;
  const emit=()=>{if(start>=0&&last-start>=minLength)lines.push({axis:vertical?'v':'h',q,start,end:last+1,width:1});start=-1;last=-1;gaps=0;};
  for(let p=1;p<along-1;p++){
   const count=vertical?value(q-1,p)+value(q,p)+value(q+1,p):value(p,q-1)+value(p,q)+value(p,q+1);
   if(count>=1){if(start<0)start=p;last=p;gaps=0;}else if(start>=0&&++gaps>2)emit();
  }emit();
 }
 // Adjacent scan rows describe the same ink stroke.
 const strokes=[];
 for(const l of lines){let hit;for(let n=strokes.length-1;n>=0;n--){const s=strokes[n];if(l.q-s.lastQ>2)break;const overlap=Math.min(l.end,s.end)-Math.max(l.start,s.start);if(overlap>Math.max(l.end-l.start,s.end-s.start)*.7){hit=s;break;}}
  if(hit){hit.q=(hit.q*hit.rows+l.q)/(hit.rows+1);hit.rows++;hit.lastQ=l.q;hit.width=hit.lastQ-hit.firstQ+1;hit.start=Math.min(hit.start,l.start);hit.end=Math.max(hit.end,l.end);}else strokes.push({...l,rows:1,firstQ:l.q,lastQ:l.q});
 }
 return strokes;
}

function analyseInk(scene,options={}){
 const image=scene.raster;if(!image)return {paths:[],regions:[]};
 const started=performance.now(),threshold=Math.max(40,Math.min(230,Number(options.rasterThreshold)||210));
 const angle=orientation(scene)*radians,c=Math.cos(angle),s=Math.sin(angle),scale=image.width/scene.bounds.w;
 const corners=[[0,0],[image.width,0],[0,image.height],[image.width,image.height]].map(([x,y])=>({x:x*c+y*s,y:-x*s+y*c}));
 const x0=Math.floor(Math.min(...corners.map(p=>p.x))),y0=Math.floor(Math.min(...corners.map(p=>p.y))),width=Math.ceil(Math.max(...corners.map(p=>p.x))-x0),height=Math.ceil(Math.max(...corners.map(p=>p.y))-y0),mask=new Uint8Array(width*height);
 const crop=options.crop||scene.bounds;
 for(let y=1;y<height-1;y++)for(let x=1;x<width-1;x++){
  const u=x+x0,v=y+y0,sx=Math.round(u*c-v*s),sy=Math.round(u*s+v*c),px=sx/scale,py=sy/scale;
  if(sx>=0&&sy>=0&&sx<image.width&&sy<image.height&&px>=crop.x&&px<=crop.x+crop.w&&py>=crop.y&&py<=crop.y+crop.h)mask[y*width+x]=image.data[sy*image.width+sx]<threshold?1:0;
 }
 const minLength=Math.max(16,Math.round(image.width*.012)),annotationLines=[];
 // In a mixed PDF the dimensions may be vector strokes over the raster plan.
 // Exclude those known strokes, rather than promoting them to building walls.
 for(const p of image.imagesOnly?[]:scene.paths)if(p.stroke&&!p.curved)for(let n=1;n<p.points.length;n++){
  const aligned=v=>({x:(v.x*c+v.y*s)*scale-x0,y:(-v.x*s+v.y*c)*scale-y0}),a=aligned(p.points[n-1]),b=aligned(p.points[n]);
  if(Math.abs(a.y-b.y)<2&&Math.abs(a.x-b.x)>minLength)annotationLines.push({axis:'h',q:(a.y+b.y)/2,start:Math.min(a.x,b.x),end:Math.max(a.x,b.x)});
  if(Math.abs(a.x-b.x)<2&&Math.abs(a.y-b.y)>minLength)annotationLines.push({axis:'v',q:(a.x+b.x)/2,start:Math.min(a.y,b.y),end:Math.max(a.y,b.y)});
 }
 const lines=[...lineRuns(mask,width,height,false,minLength),...lineRuns(mask,width,height,true,minLength)].filter(l=>!annotationLines.some(a=>a.axis===l.axis&&Math.abs(a.q-l.q)<3.5&&Math.min(a.end,l.end)-Math.max(a.start,l.start)>(l.end-l.start)*.3));
 const cm=Number(options.cmPerSourceUnit)||0,minThickness=cm?(Number(options.minWallCm)||8)/cm*scale:4,maxThickness=cm?50/cm*scale:Math.max(10,image.width*.018),walls=[];
 const sample=(l,q,p)=>l.axis==='h'?mask[Math.round(q)*width+Math.round(p)]:mask[Math.round(p)*width+Math.round(q)];
 for(let n=0;n<lines.length;n++){
  const a=lines[n];let best;
  for(let m=n+1;m<lines.length;m++){
   const b=lines[m];if(a.axis!==b.axis)continue;const gap=b.q-a.q;if(gap<minThickness||gap>maxThickness)continue;
   const start=Math.max(a.start,b.start),end=Math.min(a.end,b.end),length=end-start;if(length<minLength||length<gap*3||length<Math.min(a.end-a.start,b.end-b.start)*.6)continue;
   let ink=0,total=0,active=0,columns=0;for(let p=start+3;p<end-3;p+=3){let columnInk=0;for(let q=a.q+2;q<b.q-1;q++){const value=sample(a,q,p)||0;ink+=value;columnInk+=value;total++;}columns++;if(columnInk)active++;}
   const density=total?ink/total:0;if(density<.04||active/Math.max(1,columns)<.55)continue;
   let rows=0,activeRows=0;for(let q=a.q+2;q<b.q-1;q++){let count=0;for(let p=start+3;p<end-3;p+=3)count+=sample(a,q,p)||0;rows++;if(count>columns*.03)activeRows++;}if(activeRows/Math.max(1,rows)<.55)continue;
   const score=length*(.5+Math.min(density,.5))/Math.sqrt(gap);if(!best||score>best.score)best={m,b,start,end,gap,density,score};
  }
  if(best){const {b,start,end,gap,density}=best;walls.push({axis:a.axis,q:(a.q+b.q)/2,start,end,width:gap,density});}
 }
 // Solid scans have one filled stroke instead of two separate boundaries.
 // Seed only intersecting long, thick strokes; an isolated footer is not a wall.
 const solid=lines.filter(l=>l.width-2>=Math.max(4,minThickness)&&l.end-l.start>minLength*2);
 for(const l of solid)if(!walls.some(w=>w.axis===l.axis&&Math.abs(w.q-l.q)<w.width&&Math.min(w.end,l.end)-Math.max(w.start,l.start)>(l.end-l.start)*.4)&&solid.some(w=>{if(w.axis===l.axis)return false;const h=w.axis==='h'?w:l,v=w.axis==='v'?w:l,pad=Math.max(w.width,l.width);return v.q>=h.start-pad&&v.q<=h.end+pad&&h.q>=v.start-pad&&h.q<=v.end+pad;}))walls.push({...l,width:Math.max(l.width-2,minThickness),density:1});
 // A solid ink wall can have no distinct second boundary. Retain such strokes
 // when they join an established wall, rather than isolated furniture lines.
 for(const l of lines)if(l.width>=4&&l.end-l.start>minLength*2){
  const covered=walls.some(w=>w.axis===l.axis&&Math.abs(w.q-l.q)<w.width&&Math.min(w.end,l.end)-Math.max(w.start,l.start)>(l.end-l.start)*.4);
  if(covered)continue;
  const connected=walls.some(w=>{const pad=Math.max(w.width,8);if(w.axis===l.axis)return Math.abs(w.q-l.q)<pad&&Math.max(w.start,l.start)-Math.min(w.end,l.end)<maxThickness*3;const h=w.axis==='h'?w:l,v=w.axis==='v'?w:l;return v.q>=h.start-pad&&v.q<=h.end+pad&&h.q>=v.start-pad&&h.q<=v.end+pad;});
  if(connected)walls.push({...l,width:Math.max(l.width-2,minThickness),density:1});
 }
 // An unfilled outline has little ink between its boundaries. Retain long
 // contours and short adjoining returns instead of requiring a solid wall fill.
 const toSource=(x,y)=>({x:((x+x0)*c-(y+y0)*s)/scale,y:((x+x0)*s+(y+y0)*c)/scale});
 // Furniture inside an already closed wall enclosure must not divide that room.
 let enclosed=[];
 if(walls.length){const unit=cm||1000/Math.max(scene.bounds.w,scene.bounds.h),seedPaths=walls.map(w=>({points:w.axis==='h'?[toSource(w.start,w.q),toSource(w.end,w.q)]:[toSource(w.q,w.start),toSource(w.q,w.end)],layer:'Τοίχοι από εικόνα',kind:'wallCenter',lineWidth:w.width/scale,eligible:true,recommended:true,stroke:'#167a78'}));
  const seed=convertDrawing({...scene,sourceMode:'raster',paths:seedPaths},{layers:['Τοίχοι από εικόνα'],crop:scene.bounds,cmPerSourceUnit:cm,closeGapM:options.closeGapM??2.5});
  enclosed=seed.plan.items.filter(i=>i.type==='room').map(i=>worldRings(i).map(r=>r.map(p=>({x:(p.x-100)/unit+scene.bounds.x,y:(p.y-100)/unit+scene.bounds.y}))));
 }
 const outside=l=>{const midpoint=toSource(l.axis==='h'?(l.start+l.end)/2:l.q,l.axis==='h'?l.q:(l.start+l.end)/2);return !enclosed.some(r=>contains(r,midpoint));};
 const longContour=Math.max(minLength*3,cm?200/cm*scale:image.width*.065),contours=lines.filter(l=>options.contours&&l.end-l.start>=longContour&&outside(l));
 const touches=(a,b)=>{const pad=Math.max(4,Math.min(a.width||1,b.width||1));if(a.axis===b.axis)return Math.abs(a.q-b.q)<pad&&Math.max(a.start,b.start)-Math.min(a.end,b.end)<pad;const h=a.axis==='h'?a:b,v=a.axis==='v'?a:b;return v.q>=h.start-pad&&v.q<=h.end+pad&&h.q>=v.start-pad&&h.q<=v.end+pad&&(a.axis==='h'?Math.min(Math.abs(v.q-h.start),Math.abs(v.q-h.end)):Math.min(Math.abs(h.q-v.start),Math.abs(h.q-v.end)))<pad;};
 const returns=[...lineRuns(mask,width,height,false,Math.max(10,Math.round(image.width*.005))),...lineRuns(mask,width,height,true,Math.max(10,Math.round(image.width*.005)))];
 for(let pass=0;options.contours&&pass<3;pass++){const anchors=contours.slice();for(const l of returns)if(!contours.includes(l)&&outside(l)&&anchors.some(w=>touches(l,w)))contours.push(l);}
 for(const l of contours)if(!walls.some(w=>w.axis===l.axis&&Math.abs(w.q-l.q)<Math.max(w.width,l.width)&&Math.min(w.end,l.end)-Math.max(w.start,l.start)>(l.end-l.start)*.5))walls.push({...l,width:cm?14/cm*scale:Math.max(4,l.width-2),density:0,contour:true});
 // Remove duplicate pairs before identifying the drawing's connected wall groups.
 const unique=[];for(const w of walls){const hit=unique.find(v=>v.axis===w.axis&&Math.abs(v.q-w.q)<Math.min(v.width,w.width)*.5&&Math.min(v.end,w.end)-Math.max(v.start,w.start)>Math.min(v.end-v.start,w.end-w.start)*.7);if(hit){hit.start=Math.min(hit.start,w.start);hit.end=Math.max(hit.end,w.end);}else unique.push(w);}
 const point=(x,y)=>({x:((x+x0)*c-(y+y0)*s)/scale,y:((x+x0)*s+(y+y0)*c)/scale});
 const paths=unique.map(w=>({points:w.axis==='h'?[point(w.start,w.q),point(w.end,w.q)]:[point(w.q,w.start),point(w.q,w.end)],layer:'Τοίχοι από εικόνα',stroke:'#167a78',fill:null,closed:false,eligible:true,recommended:true,kind:w.contour?'floorBoundary':'wallCenter',lineWidth:w.width/scale}));
 // Connected wall groups exclude sheet borders, isolated symbols and title blocks.
 const parent=paths.map((_,n)=>n),root=n=>{while(parent[n]!==n){parent[n]=parent[parent[n]];n=parent[n];}return n;};
 const reach=cm?140/cm*scale:image.width*.03;
 for(let n=0;n<unique.length;n++)for(let m=n+1;m<unique.length;m++){
  const a=unique[n],b=unique[m];let connected=false;
  if(a.axis===b.axis)connected=Math.abs(a.q-b.q)<Math.max(a.width,b.width)&&Math.max(a.start,b.start)-Math.min(a.end,b.end)<reach;
  else {const h=a.axis==='h'?a:b,v=a.axis==='v'?a:b,pad=Math.max(h.width,v.width)*.7+3;connected=v.q>=h.start-pad&&v.q<=h.end+pad&&h.q>=v.start-pad&&h.q<=v.end+pad;}
  if(connected)parent[root(m)]=root(n);
 }
 const groups=new Map();for(let n=0;n<paths.length;n++){const key=root(n);if(!groups.has(key))groups.set(key,[]);groups.get(key).push(paths[n]);}
 const regions=[...groups.values()].map(ps=>({...drawingBounds(ps),paths:ps,score:ps.reduce((sum,p)=>sum+Math.hypot(p.points[1].x-p.points[0].x,p.points[1].y-p.points[0].y),0)})).filter(r=>r.score>scene.bounds.w*.04).sort((a,b)=>b.score-a.score);
 const merged=[];for(const r of regions){const pad=scene.bounds.w*.07,hits=merged.filter(v=>r.x<=v.x+v.w+pad&&r.x+r.w>=v.x-pad&&r.y<=v.y+v.h+pad&&r.y+r.h>=v.y-pad),ps=[...r.paths,...hits.flatMap(v=>v.paths)];for(const hit of hits)merged.splice(merged.indexOf(hit),1);merged.push({...drawingBounds(ps),paths:ps,score:r.score+hits.reduce((sum,v)=>sum+v.score,0)});}
 merged.sort((a,b)=>b.score-a.score);
 const kept=paths.filter(p=>{const a=p.points[0],b=p.points[1],x=(a.x+b.x)/2,y=(a.y+b.y)/2;return merged.some(r=>x>=r.x-8&&x<=r.x+r.w+8&&y>=r.y-8&&y<=r.y+r.h+8);});
 const leafLines=cm?lines.filter(l=>l.width<=Math.max(4,minThickness*.5)&&(l.end-l.start)/scale*cm>=60&&(l.end-l.start)/scale*cm<=125).map(l=>({points:l.axis==='h'?[point(l.start,l.q),point(l.end,l.q)]:[point(l.q,l.start),point(l.q,l.end)]})):[];
 const edgeLines=lines.map(l=>({points:l.axis==='h'?[point(l.start,l.q),point(l.end,l.q)]:[point(l.q,l.start),point(l.q,l.end)],lineWidth:l.width/scale}));
 return {paths:kept,leafLines,edgeLines,regions:merged.map(r=>{const ps=kept.filter(p=>{const a=p.points[0],b=p.points[1],x=(a.x+b.x)/2,y=(a.y+b.y)/2;return x>=r.x-8&&x<=r.x+r.w+8&&y>=r.y-8&&y<=r.y+r.h+8;}),b=drawingBounds(ps),pad=8/scale;return {x:Math.max(0,b.x-pad),y:Math.max(0,b.y-pad),w:b.w+pad*2,h:b.h+pad*2};}),angle:angle/radians,ms:performance.now()-started,lines:lines.length};
}

export function rasterWalls(scene,options={}){
 const start=performance.now(),walls=analyseInk(scene,options),outlines=analyseInk(scene,{...options,contours:true,rasterThreshold:Math.min(150,Number(options.rasterThreshold)||210)});
 return {...walls,paths:[...walls.paths,...outlines.paths.filter(p=>p.kind==='floorBoundary')],wallPaths:walls.paths,surfacePaths:outlines.paths,regions:outlines.regions.length?outlines.regions:walls.regions,ms:performance.now()-start};
}

// Confirm a continuous door swing and leaf next to a wall contact. Radial
// contrast rejects hatch/grid strokes that accidentally cross a sampled arc.
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export function rasterDoors(scene,analysis,cm,accept=()=>true){
 const image=scene.raster;if(!image||!cm)return [];
 const scale=image.width/scene.bounds.w,ends=(analysis.wallPaths||[]).flatMap(p=>p.points),doors=[];
 const nearest=p=>Math.min(...ends.map(q=>distance(p,q)))*cm;
 const ink=p=>{const x=Math.round(p.x*scale),y=Math.round(p.y*scale);for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const qx=x+dx,qy=y+dy;if(qx>=0&&qy>=0&&qx<image.width&&qy<image.height&&image.data[qy*image.width+qx]<170)return true;}return false;};
 const angle=analysis.angle*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle),candidates=[...ends,...(analysis.leafLines||[]).flatMap(p=>p.points).filter(p=>{return (analysis.wallPaths||[]).some(l=>{const [a,b]=l.points,dx=b.x-a.x,dy=b.y-a.y,len2=dx*dx+dy*dy,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/len2));return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy)*cm<25;});})],anchors=candidates.filter((p,n)=>accept(p)&&!candidates.slice(0,n).some(q=>distance(p,q)*cm<10)).slice(0,220);
 for(const start of anchors)for(const [dx,dy]of [[c,s],[-c,-s],[-s,c],[s,-c]])for(const physicalRadius of [70,80,90,100,110])for(const hand of [1,-1]){
  const len=physicalRadius/cm;let best;
  // Preserve the hinge when the opposite swing is supported by the image.
  const cx=-dy*hand,cy=dx*hand;
  for(const shift of [-12,-6,0,6,12])for(const normal of [-18,-12,-6,0,6,12,18])for(const radiusShift of [-6,0,6]){
   const hinge={x:start.x+dx*shift/cm+cx*normal/cm,y:start.y+dy*shift/cm+cy*normal/cm},radius=len+radiusShift/cm;
   const latch={x:hinge.x+cx*radius,y:hinge.y+cy*radius};if(nearest(latch)>100)continue;
   let arc=0,leaf=0,closed=0,neighbor=0;
   for(let n=1;n<=15;n++){
    const t=n/16*Math.PI/2;
    const delta=2.5/(radius*scale);arc+=[t-delta,t,t+delta].every(v=>ink({x:hinge.x+radius*(dx*Math.cos(v)+cx*Math.sin(v)),y:hinge.y+radius*(dy*Math.cos(v)+cy*Math.sin(v))}))?1:0;
    for(const dr of [-12,12])neighbor+=ink({x:hinge.x+(radius+dr/cm)*(dx*Math.cos(t)+cx*Math.sin(t)),y:hinge.y+(radius+dr/cm)*(dy*Math.cos(t)+cy*Math.sin(t))})?1:0;
    leaf+=ink({x:hinge.x+dx*radius*n/16,y:hinge.y+dy*radius*n/16})?1:0;
    closed+=ink({x:hinge.x+cx*radius*n/16,y:hinge.y+cy*radius*n/16})?1:0;
   }
   let jamb=0;for(const [jx,jy]of [[dx,dy],[cx,cy]])for(const side of [-1,1]){let count=0;for(let n=2;n<12;n++)count+=ink({x:latch.x+jx*n*2/cm*side,y:latch.y+jy*n*2/cm*side})?1:0;jamb=Math.max(jamb,count);}
   if(arc<13||leaf<13||closed>9||neighbor>12||jamb<6)continue;
   const score=arc+leaf-closed*.2-(Math.abs(shift)+Math.abs(normal)+Math.abs(radiusShift))*.01;
   if(!best||score>best.score)best={points:hand===1?[hinge,latch]:[latch,hinge],score,hingeRight:hand===-1,hinge};
  }
  if(best)doors.push({points:best.points,score:best.score,hinge:best.hinge,hingeRight:best.hingeRight,kind:'doorOpening',layer:'Τοίχοι από εικόνα',lineWidth:14/cm,eligible:true,recommended:true,stroke:'#3686b4'});
 }
 const unique=[];for(const d of doors.sort((a,b)=>b.score-a.score))if(!unique.some(other=>distance(other.hinge,d.hinge)*cm<35))unique.push(d);return unique;
}

// A confirmed doorway can meet an unfilled partition. Require two parallel
// boundaries at the doorway contact rather than extending an arbitrary line.
export function doorPartitions(analysis,doors,cm){
 const result=[];if(!cm)return result;
 for(const door of doors){
  const [a,b]=door.points,len=distance(a,b),ux=(b.x-a.x)/len,uy=(b.y-a.y)/len;
  const project=p=>((p.x-a.x)*ux+(p.y-a.y)*uy),normal=p=>-(p.x-a.x)*uy+(p.y-a.y)*ux;
  const lines=(analysis.edgeLines||[]).filter(l=>{const [p,q]=l.points,d=distance(p,q);return d&&Math.abs((q.x-p.x)*uy-(q.y-p.y)*ux)<d*.002;}).map(l=>{const ts=l.points.map(project).sort((a,b)=>a-b);return {start:ts[0],end:ts[1],q:normal(l.points[0])};});
  for(let n=0;n<lines.length;n++)for(let m=n+1;m<lines.length;m++){
   const p=lines[n],q=lines[m],width=Math.abs(p.q-q.q),offset=(p.q+q.q)/2,start=Math.max(p.start,q.start),end=Math.min(p.end,q.end);
   if(width*cm<6||width*cm>25||Math.abs(offset)*cm>20||(end-start)*cm<60)continue;
   if(start<len/2&&end>len/2)continue;
   if(Math.min(Math.abs(start),Math.abs(end),Math.abs(start-len),Math.abs(end-len))*cm>30)continue;
   const at=t=>({x:a.x+ux*t-uy*offset,y:a.y+uy*t+ux*offset}),points=[at(start),at(end)];
   if(!result.some(l=>Math.min(distance(l.points[0],points[0]),distance(l.points[1],points[0]))*cm<20))result.push({points,kind:'wallCenter',lineWidth:width,layer:door.layer,stroke:'#167a78',eligible:true,recommended:true});
  }
 }
 return result;
}

// Keep wall topology separate from unfilled surface outlines. Joining the two
// graphs can extend furniture strokes through an otherwise closed room.

const area=rings=>Math.abs(rings.reduce((sum,r)=>sum+signedArea(r),0));
function overlap(rings,others){
 const b=polygonBounds(rings);let inside=0,shared=0;
 for(let y=0;y<24;y++)for(let x=0;x<24;x++){
  const p={x:b.x+b.w*(x+.5)/24,y:b.y+b.h*(y+.5)/24};
  if(contains(rings,p)){inside++;if(others.some(r=>contains(r,p)))shared++;}
 }
 return shared/Math.max(1,inside);
}
function edgeDistance(rings,p){
 let best=Infinity;
 for(const ring of rings)for(let n=0;n<ring.length;n++){
  const a=ring[n],b=ring[(n+1)%ring.length],dx=b.x-a.x,dy=b.y-a.y,len2=dx*dx+dy*dy;
  const t=len2?Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/len2)):0;
  best=Math.min(best,Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy));
 }
 return best;
}
function alignRoom(item,angle){
 const rings=worldRings(item),r=angle*Math.PI/180,c=Math.cos(r),s=Math.sin(r);
 const local=rings.map(r=>r.map(p=>({x:p.x*c+p.y*s,y:-p.x*s+p.y*c}))),b=polygonBounds(local);
 const cx=(b.x+b.w/2)*c-(b.y+b.h/2)*s,cy=(b.x+b.w/2)*s+(b.y+b.h/2)*c;
 return {...item,x:cx-b.w/2,y:cy-b.h/2,w:b.w,h:b.h,rotation:angle,outline:local.map(r=>r.map(p=>({x:(p.x-b.x)/b.w,y:(p.y-b.y)/b.h})))};
}

// Room names anchor a contour search. Unlike closing arbitrary gaps in the
// whole sheet, each accepted side needs ink support beside that same label.
function labelledContours(scene,analysis,cm,crop,existing=[]){
 if(!cm)return [];
 const angle=(analysis.angle||0)*Math.PI/180,c=Math.cos(angle),s=Math.sin(angle);
 const local=p=>({x:p.x*c+p.y*s,y:-p.x*s+p.y*c});
 const source=p=>({x:p.x*c-p.y*s,y:p.x*s+p.y*c});
 const lines=(analysis.edgeLines||[]).map(l=>{const [a,b]=l.points.map(local),horizontal=Math.abs(a.y-b.y)<Math.abs(a.x-b.x);return {axis:horizontal?'h':'v',q:horizontal?(a.y+b.y)/2:(a.x+b.x)/2,start:horizontal?Math.min(a.x,b.x):Math.min(a.y,b.y),end:horizontal?Math.max(a.x,b.x):Math.max(a.y,b.y),door:l.kind==='doorOpening'};}).filter(l=>(l.end-l.start)*cm>35);
 const support=(axis,q,start,end)=>{
  const tolerance=lines.some(l=>l.door&&l.axis===axis&&Math.abs(l.q-q)*cm<20&&l.end>start&&l.start<end)?20:8;
  const spans=lines.filter(l=>l.axis===axis&&Math.abs(l.q-q)*cm<tolerance).map(l=>[Math.max(start,l.start),Math.min(end,l.end)]).filter(([a,b])=>b>a).sort((a,b)=>a[0]-b[0]);
  let covered=0,last=-Infinity;for(const [a,b]of spans){covered+=Math.max(0,b-Math.max(a,last));last=Math.max(last,b);}return covered/(end-start);
 };
 const result=[];
 for(const text of scene.texts||[]){
  const label=cleanText(text.text),outside=/ΒΕΡΑΝΤ|ΒΑΛΚΟΝ|TERRACE|BALCON/i.test(label),service=/ΓΡΑΦ|ΞΕΝ|ΑΠΟΘ|ΝΤΟΥΣ|ΤΟΥΑΛ|ΥΠΝ|BEDROOM|STORE|BATH|OFFICE/i.test(label);
  if(!outside&&!service||!outside&&existing.includes(label)||text.x<crop.x||text.y<crop.y||text.x>crop.x+crop.w||text.y>crop.y+crop.h)continue;
  const boundary=l=>outside||l.door||lines.some(other=>other!==l&&other.axis===l.axis&&Math.abs(other.q-l.q)*cm>=6&&Math.abs(other.q-l.q)*cm<=50&&Math.min(l.end,other.end)-Math.max(l.start,other.start)>(l.end-l.start)*.75);
  const p=local(text),near=(axis,before)=>{
   const q=axis==='h'?p.y:p.x,t=axis==='h'?p.x:p.y,values=lines.filter(l=>boundary(l)&&l.axis===axis&&(before?l.q<q:l.q>q)&&(l.end>=t-10/cm&&l.start<=t+10/cm)&&Math.abs(l.q-q)*cm<1600).map(l=>l.q).sort((a,b)=>Math.abs(a-q)-Math.abs(b-q));
   return values.filter((v,n)=>!values.slice(0,n).some(w=>Math.abs(v-w)*cm<5)).slice(0,9);
  };
  let best;
  for(const left of near('v',true))for(const right of near('v',false))for(const top of near('h',true))for(const bottom of near('h',false)){
   const w=(right-left)*cm,h=(bottom-top)*cm,area=w*h/10000;
   const sleeping=/ΓΡΑΦ|ΞΕΝ|ΥΠΝ|BEDROOM|OFFICE/i.test(label);
   if(w<(sleeping?200:90)||h<(sleeping?200:90)||area<(sleeping?6:1)||area>200||!outside&&Math.max(w,h)/Math.min(w,h)>3)continue;
   const edges=[support('h',top,left,right),support('h',bottom,left,right),support('v',left,top,bottom),support('v',right,top,bottom)];
   if(edges.some(v=>v<.62)||edges.reduce((a,b)=>a+b,0)<3.15)continue;
   // Another service name inside means the contour has not split the rooms.
   if((scene.texts||[]).some(t=>t!==text&&/ΓΡΑΦ|ΞΕΝ|ΑΠΟΘ|ΝΤΟΥΣ|ΤΟΥΑΛ|ΥΠΝ|ΒΕΡΑΝΤ/i.test(t.text)&&(()=>{const q=local(t);return q.x>left&&q.x<right&&q.y>top&&q.y<bottom;})()))continue;
   const score=edges.reduce((a,b)=>a+b,0)-Math.log(area)*.1;
   if(!best||score>best.score)best={label,outside,score,points:[{x:left,y:top},{x:right,y:top},{x:right,y:bottom},{x:left,y:bottom}].map(source)};
  }
  if(best)result.push(best);
 }
 return result;
}

function supportedWindows(scene,analysis,rooms,openings,crop,unit){
 const raw=(analysis.edgeLines||[]).map(l=>l.points.map(p=>({x:(p.x-crop.x)*unit+100,y:(p.y-crop.y)*unit+100}))),windows=[];
 for(const room of rooms)for(const ring of worldRings(room))for(let n=0;n<ring.length;n++){
  const a=ring[n],b=ring[(n+1)%ring.length],length=Math.hypot(b.x-a.x,b.y-a.y);if(length<100)continue;
  const dx=(b.x-a.x)/length,dy=(b.y-a.y)/length,project=p=>(p.x-a.x)*dx+(p.y-a.y)*dy,normal=p=>-(p.x-a.x)*dy+(p.y-a.y)*dx;
  const lines=raw.filter(([p,q])=>Math.abs(normal(p)-normal(q))<2&&Math.abs(normal(p))<40).map(([p,q])=>({q:(normal(p)+normal(q))/2,start:Math.min(project(p),project(q)),end:Math.max(project(p),project(q))}));
  const candidates=[];
  for(const l of lines){
   const start=Math.max(8,l.start),end=Math.min(length-8,l.end),w=end-start;
   if(w<50||w>420||w>length*.85||Math.abs(l.q)>12)continue;
   const parallel=lines.filter(other=>Math.min(end,other.end)-Math.max(start,other.start)>w*.8).map(o=>o.q).sort((a,b)=>a-b),distinct=parallel.filter((v,i)=>!i||v-parallel[i-1]>4);
   if(distinct.length<3||distinct.at(-1)-distinct[0]<8)continue;
   const center={x:a.x+dx*(start+end)/2,y:a.y+dy*(start+end)/2};
   const bothSides=[-20,20].every(offset=>rooms.some(room=>contains(worldRings(room),{x:center.x-dy*offset,y:center.y+dx*offset})));if(bothSides)continue;
   // A glazing symbol has several continuous parallel bands at the opening,
   // not merely a cabinet edge beside a solid wall or stair.
   if(scene.raster){const image=scene.raster,scale=image.width/scene.bounds.w;let bands=0;
    for(let offset=-10;offset<=10;offset+=2){let count=0;for(let n=1;n<=40;n++){const t=start+(end-start)*n/41,x=((a.x+dx*t-dy*offset-100)/unit+crop.x)*scale,y=((a.y+dy*t+dx*offset-100)/unit+crop.y)*scale;count+=image.data[Math.round(y)*image.width+Math.round(x)]<170?1:0;}if(count>=22)bands++;}if(bands<2)continue;
   }
   if(openings.some(o=>Math.hypot(o.x+o.w/2-center.x,o.y+o.h/2-center.y)<(w+o.w)/2+10))continue;
   candidates.push({start,end,w,center});
  }
  const accepted=[];
  for(const p of candidates.sort((a,b)=>b.w-a.w))if(!accepted.some(q=>Math.min(p.end,q.end)-Math.max(p.start,q.start)>Math.min(p.w,q.w)*.3))accepted.push(p);
  for(const p of accepted){const item={id:'import-window-'+windows.length,type:'window',x:p.center.x-p.w/2,y:p.center.y-7,w:p.w,h:14,rotation:Math.atan2(dy,dx)*180/Math.PI,label:'Παράθυρο · έλεγχος',number:'',color:'#8dc9dc',floor:'imported',heightCm:120,hidden:false,locked:false};if(!windows.some(w=>Math.hypot(w.x+w.w/2-p.center.x,w.y+w.h/2-p.center.y)<30))windows.push(item);}
 }
 const unique=[];for(const item of windows.sort((a,b)=>b.w-a.w)){
  const a={x:item.x+item.w/2,y:item.y+item.h/2},angle=item.rotation*Math.PI/180,dx=Math.cos(angle),dy=Math.sin(angle);
  if(!unique.some(other=>{const b={x:other.x+other.w/2,y:other.y+other.h/2},r=(other.rotation-item.rotation)*Math.PI/180;return Math.abs(Math.sin(r))<.01&&Math.abs(-(b.x-a.x)*dy+(b.y-a.y)*dx)<20&&Math.abs((b.x-a.x)*dx+(b.y-a.y)*dy)<(item.w+other.w)/2-Math.min(item.w,other.w)*.3;}))unique.push(item);
 }
 return unique;
}

export function convertRasterDrawing(scene,analysis,options={}){
 const crop=options.crop||scene.bounds,unit=Number(options.cmPerSourceUnit)||1000/Math.max(crop.w,crop.h);
 const convert=(paths,physical=false)=>convertDrawing({...scene,sourceMode:'raster',paths,raster:undefined,preview:undefined},{...options,rasterPhysical:physical});
 let primary;
 try{primary=convert(analysis.wallPaths||analysis.paths.filter(p=>p.kind!=='floorBoundary'),true);}
 catch(error){if(!/Δεν αναγνωρίστηκαν/.test(error.message))throw error;}
 const seed=(primary?.plan.items||[]).filter(i=>i.type==='room').map(worldRings);
 const doorPaths=seed.length?rasterDoors(scene,analysis,Number(options.cmPerSourceUnit),p=>{const q={x:(p.x-crop.x)*unit+100,y:(p.y-crop.y)*unit+100};return seed.some(r=>contains(r,q)||edgeDistance(r,q)<35);}):[];
 if(doorPaths.length){
  const partitions=doorPartitions(analysis,doorPaths,Number(options.cmPerSourceUnit));
  const original=(analysis.wallPaths||[]).filter(l=>!partitions.some(p=>{const [a,b]=p.points,dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy),[u,v]=l.points,project=p=>((p.x-a.x)*dx+(p.y-a.y)*dy)/len,ts=[project(u),project(v)].sort((a,b)=>a-b),overlap=Math.min(len,ts[1])-Math.max(0,ts[0]);return overlap>Math.min(len,Math.hypot(v.x-u.x,v.y-u.y))*.6&&l.lineWidth*unit<=20&&Math.abs((v.x-u.x)*dy-(v.y-u.y)*dx)<len*Math.hypot(v.x-u.x,v.y-u.y)*.002&&Math.abs((u.x-a.x)*dy-(u.y-a.y)*dx)/len*unit<40;}));
  primary=convert([...original,...partitions,...doorPaths],true);
 }
 const allRooms=(primary?.plan.items||[]).filter(i=>i.type==='room'),named=allRooms.filter(i=>!/^Χώρος \d+$/.test(i.label)).map(worldRings);
 let rooms=allRooms.filter(i=>!named.length||!/^Χώρος \d+$/.test(i.label)||worldRings(i)[0].some(p=>named.some(r=>contains(r,p)||edgeDistance(r,p)<20)));
 const contours=labelledContours(scene,{...analysis,edgeLines:[...(analysis.edgeLines||[]),...doorPaths]},Number(options.cmPerSourceUnit),crop,rooms.map(i=>i.label)),contourItems=contours.map((contour,n)=>{
  const ring=contour.points.map(p=>({x:(p.x-crop.x)*unit+100,y:(p.y-crop.y)*unit+100})),b=polygonBounds([ring]);
  return {id:'import-contour-'+n,type:'room',...b,rotation:0,outline:[ring.map(p=>({x:(p.x-b.x)/b.w,y:(p.y-b.y)/b.h}))],label:contour.label,number:'',color:contour.outside?'#eee4cf':'#e3ece9',floor:'imported',heightCm:(Number(options.heightM)||2.8)*100,hidden:false,locked:false,...(contour.outside?{floorOnly:true}:{})};
 });
 for(const item of contourItems.filter(i=>!i.floorOnly)){
  rooms=rooms.filter(i=>i.label!==item.label||overlap(worldRings(item),[worldRings(i)])<.5);rooms.push(item);
 }
 const enclosures=rooms.map(worldRings);
 let surfaces;
 try{surfaces=convert(analysis.surfacePaths||analysis.paths);}
 catch(error){if(!/Δεν αναγνωρίστηκαν/.test(error.message))throw error;}
 const outdoor=contourItems.filter(i=>i.floorOnly);
 const extra=(surfaces?.plan.items||[]).filter(i=>i.type==='room'&&area(worldRings(i))>=120000&&overlap(worldRings(i),enclosures)<.08&&overlap(worldRings(i),outdoor.map(worldRings))<.4).concat(outdoor);
 for(const [n,item]of extra.entries()){
  item.floorOnly=true;item.color='#eee4cf';
  if(/^Χώρος \d+$/.test(item.label))item.label='Περίγραμμα δαπέδου '+(n+1);
 }
 const walls=(primary?.plan.items||[]).filter(i=>{
  if(i.type!=='wall'||!enclosures.length)return false;
  const p={x:i.x+i.w/2,y:i.y+i.h/2},ends=worldRings(i)[0];
  if(enclosures.some(r=>contains(r,p))&&Math.min(...enclosures.map(r=>edgeDistance(r,p)))>35)return false;
  return ends.some(p=>enclosures.some(r=>edgeDistance(r,p)<35));
 });
 const openings=(primary?.plan.items||[]).filter(i=>['door','window'].includes(i.type));
 // A smaller real room remains editable. Its floor cuts a hole in a containing
 // floor instead of overlapping it or being removed as if it were furniture.
 for(const item of rooms){
  const outer=worldRings(item)[0],children=rooms.filter(child=>child!==item&&area(worldRings(child))<area([outer])&&worldRings(child)[0].every(p=>contains([outer],p)));
  const direct=children.filter(child=>!children.some(parent=>parent!==child&&area(worldRings(parent))>area(worldRings(child))&&worldRings(child)[0].every(p=>contains(worldRings(parent),p))));
  if(direct.length&&direct.length<8){const b={x:item.x,y:item.y,w:item.w,h:item.h};item.outline=[item.outline[0],...direct.map(child=>worldRings(child)[0].map(p=>({x:(p.x-b.x)/b.w,y:(p.y-b.y)/b.h})))];item.label=item.label.split(' / ').filter(label=>!direct.some(child=>child.label===label)).join(' / ');}
 }
 const windows=supportedWindows(scene,analysis,rooms,openings,crop,unit);openings.push(...windows);
 const items=[...rooms,...extra].map(i=>alignRoom(i,analysis.angle||0)).concat(walls,openings);
 if(!items.length)throw Error('Δεν βρέθηκε αξιόπιστο περίγραμμα κτιρίου. Επίλεξε άλλη περιοχή ή χρησιμοποίησε το αρχικό DWG/DXF.');
 const result=primary||surfaces,resultPlan=result.plan;
 resultPlan.items=items;
 const title=scene.pageChoices?.[scene.pageNumber-1]?.name||scene.texts?.map(t=>cleanText(t.text)).find(t=>/ΚΑΤΟΨΗ.*(?:ΥΠΟΓΕΙ|ΙΣΟΓΕΙ|ΟΡΟΦ)/i.test(t))||'';
 resultPlan.floors[0].name=/ΥΠΟΓΕΙ/i.test(title)?'Υπόγειο':/ΙΣΟΓΕΙ/i.test(title)?'Ισόγειο':/ΟΡΟΦ/i.test(title)?'Όροφος':'Εισαγόμενη κάτοψη';
 const warnings=[...result.warnings];
 if(extra.length)warnings.push(extra.length+' περιγράμματα δαπέδου αναγνωρίστηκαν χωρίς επιβεβαιωμένους τοίχους. Εμφανίζονται με διακεκομμένη γραμμή και δεν αποκτούν αυτόματα τοίχους στη 3D όψη.');
 if(windows.length)warnings.push(windows.length+' πιθανά παράθυρα από παράλληλες γραμμές. Επιβεβαίωσε θέση και πλάτος στην κοινή προβολή, ειδικά κοντά σε έπιπλα.');
 const missing=(scene.texts||[]).filter(t=>/ΓΡΑΦ|ΞΕΝ|ΚΟΥΖ|ΣΑΛΟΝ|ΤΡΑΠΕΖΑΡ|ΑΠΟΘ|ΥΠΝ|ΝΤΟΥΣ|ΤΟΥΑΛ|ΒΕΡΑΝΤ|ΧΩΡ/i.test(t.text)&&t.x>=crop.x&&t.y>=crop.y&&t.x<=crop.x+crop.w&&t.y<=crop.y+crop.h&&!items.filter(i=>i.type==='room').some(i=>contains(worldRings(i),{x:(t.x-crop.x)*unit+100,y:(t.y-crop.y)*unit+100})));
 if(missing.length)warnings.push('Δεν βρέθηκε πλήρες περίγραμμα για: '+[...new Set(missing.map(t=>cleanText(t.text)))].join(', ')+'. Η μετατροπή της εικόνας παραμένει μερική.');
 resultPlan.notes=warnings.join('\n');
 return {plan:resultPlan,warnings,stats:{rooms:rooms.length,surfaces:extra.length,walls:walls.length,doors:openings.filter(i=>i.type==='door').length,windows:openings.filter(i=>i.type==='window').length,sourcePaths:analysis.paths.length},quality:{partial:missing.length>0||extra.length>0,missing:missing.map(t=>cleanText(t.text))}};
}
