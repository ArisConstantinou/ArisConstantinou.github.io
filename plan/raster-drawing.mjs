// Offline raster analysis. Only neutral wall paths leave the import worker.
import {drawingBounds} from './drawing-geometry.mjs';

const radians=Math.PI/180;
function orientation(scene){
 const bins=new Float64Array(180),directions=[],span=Math.max(scene.bounds.w,scene.bounds.h);
 for(const p of scene.paths)if(p.stroke&&!p.curved)for(let n=1;n<p.points.length;n++){
  const a=p.points[n-1],b=p.points[n],length=Math.hypot(b.x-a.x,b.y-a.y);if(length<span*.025||length>span*.7)continue;
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

export function rasterWalls(scene,options={}){
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
 const solid=lines.filter(l=>l.width>=Math.max(4,minThickness)&&l.end-l.start>minLength*2);
 for(const l of solid)if(!walls.some(w=>w.axis===l.axis&&Math.abs(w.q-l.q)<w.width&&Math.min(w.end,l.end)-Math.max(w.start,l.start)>(l.end-l.start)*.4)&&solid.some(w=>{if(w.axis===l.axis)return false;const h=w.axis==='h'?w:l,v=w.axis==='v'?w:l,pad=Math.max(w.width,l.width);return v.q>=h.start-pad&&v.q<=h.end+pad&&h.q>=v.start-pad&&h.q<=v.end+pad;}))walls.push({...l,width:Math.max(l.width-2,minThickness),density:1});
 // A solid ink wall can have no distinct second boundary. Retain such strokes
 // when they join an established wall, rather than isolated furniture lines.
 for(const l of lines)if(l.width>=4&&l.end-l.start>minLength*2){
  const covered=walls.some(w=>w.axis===l.axis&&Math.abs(w.q-l.q)<w.width&&Math.min(w.end,l.end)-Math.max(w.start,l.start)>(l.end-l.start)*.4);
  if(covered)continue;
  const connected=walls.some(w=>{const pad=Math.max(w.width,8);if(w.axis===l.axis)return Math.abs(w.q-l.q)<pad&&Math.max(w.start,l.start)-Math.min(w.end,l.end)<maxThickness*3;const h=w.axis==='h'?w:l,v=w.axis==='v'?w:l;return v.q>=h.start-pad&&v.q<=h.end+pad&&h.q>=v.start-pad&&h.q<=v.end+pad;});
  if(connected)walls.push({...l,width:Math.max(l.width-2,minThickness),density:1});
 }
 // Remove duplicate pairs before identifying the drawing's connected wall groups.
 const unique=[];for(const w of walls){const hit=unique.find(v=>v.axis===w.axis&&Math.abs(v.q-w.q)<Math.min(v.width,w.width)*.5&&Math.min(v.end,w.end)-Math.max(v.start,w.start)>Math.min(v.end-v.start,w.end-w.start)*.7);if(hit){hit.start=Math.min(hit.start,w.start);hit.end=Math.max(hit.end,w.end);}else unique.push(w);}
 const point=(x,y)=>({x:((x+x0)*c-(y+y0)*s)/scale,y:((x+x0)*s+(y+y0)*c)/scale});
 const paths=unique.map(w=>({points:w.axis==='h'?[point(w.start,w.q),point(w.end,w.q)]:[point(w.q,w.start),point(w.q,w.end)],layer:'Τοίχοι από εικόνα',stroke:'#167a78',fill:null,closed:false,eligible:true,recommended:true,kind:'wallCenter',lineWidth:w.width/scale}));
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
 return {paths:kept,regions:merged.map(r=>{const ps=kept.filter(p=>{const a=p.points[0],b=p.points[1],x=(a.x+b.x)/2,y=(a.y+b.y)/2;return x>=r.x-8&&x<=r.x+r.w+8&&y>=r.y-8&&y<=r.y+r.h+8;}),b=drawingBounds(ps),pad=8/scale;return {x:Math.max(0,b.x-pad),y:Math.max(0,b.y-pad),w:b.w+pad*2,h:b.h+pad*2};}),angle:angle/radians,ms:performance.now()-started,lines:lines.length};
}
