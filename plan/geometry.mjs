// Polygon boundaries in world coordinates; holes use the even-odd fill rule.
const cross = (a, b) => a.x * b.y - a.y * b.x;
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
export function worldRings(item) {
  const rings = item.outline ?? [[{x:0,y:0},{x:1,y:0},{x:1,y:1},{x:0,y:1}]];
  const a = item.rotation * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
  return rings.map(ring => ring.map(p => {
    const x = (p.x - .5) * item.w, y = (p.y - .5) * item.h;
    return { x:item.x + item.w/2 + x*c - y*s, y:item.y + item.h/2 + x*s + y*c };
  }));
}
export function signedArea(ring) {
  return ring.reduce((sum,p,n) => sum + cross(p,ring[(n+1)%ring.length]),0)/2;
}
export function contains(rings, p) {
  let inside = false;
  for (const ring of rings) for (let n=0,j=ring.length-1;n<ring.length;j=n++) {
    const a=ring[n],b=ring[j];
    if ((a.y>p.y)!==(b.y>p.y) && p.x < (b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x) inside=!inside;
  }
  return inside;
}
export function polygonBounds(rings) {
  const points=rings.flat(), xs=points.map(p=>p.x), ys=points.map(p=>p.y);
  const x=Math.min(...xs),y=Math.min(...ys);
  return {x,y,w:Math.max(...xs)-x,h:Math.max(...ys)-y};
}
function splitAt(a,b,c,d,epsilon) {
  const r=sub(b,a),s=sub(d,c),q=sub(c,a),den=cross(r,s),length=Math.hypot(r.x,r.y);
  if(Math.abs(den)>epsilon*length) {
    const t=cross(q,s)/den,u=cross(q,r)/den;
    return t>=-1e-9&&t<=1+1e-9&&u>=-1e-9&&u<=1+1e-9 ? [Math.max(0,Math.min(1,t))] : [];
  }
  if(Math.abs(cross(q,r))>epsilon*length)return [];
  const norm=r.x*r.x+r.y*r.y;
  return [c,d].map(p=>((p.x-a.x)*r.x+(p.y-a.y)*r.y)/norm).filter(t=>t>=0&&t<=1);
}
export function unionAreas(items) {
  if(items.length<2)throw Error('Επίλεξε τουλάχιστον δύο χώρους.');
  const polygons=items.map(worldRings), all=polygons.flat(), extent=polygonBounds(all);
  const epsilon=Math.max(1e-7,Math.max(extent.w,extent.h)*1e-9);
  const edges=all.flatMap(r=>r.map((a,n)=>({a,b:r[(n+1)%r.length]}))).filter(e=>distance(e.a,e.b)>epsilon);
  if(edges.length>800)throw Error('Συγχώνευσε τους χώρους σε μικρότερες ομάδες (έως 800 κορυφές).');
  const inside=p=>polygons.some(r=>contains(r,p));
  const key=p=>`${Math.round(p.x/epsilon)},${Math.round(p.y/epsilon)}`;
  const boundary=new Map();
  for(const e of edges) {
    const ts=[0,1];for(const f of edges)if(f!==e)ts.push(...splitAt(e.a,e.b,f.a,f.b,epsilon));
    ts.sort((a,b)=>a-b);const values=ts.filter((t,n)=>!n||t-ts[n-1]>1e-10);
    const dx=e.b.x-e.a.x,dy=e.b.y-e.a.y,length=Math.hypot(dx,dy);
    for(let n=1;n<values.length;n++) {
      const t=values[n-1],u=values[n];if((u-t)*length<epsilon*2)continue;
      let a={x:e.a.x+t*dx,y:e.a.y+t*dy},b={x:e.a.x+u*dx,y:e.a.y+u*dy};
      const mid={x:(a.x+b.x)/2,y:(a.y+b.y)/2},offset=Math.min(epsilon*4,(u-t)*length/10);
      const left=inside({x:mid.x-dy/length*offset,y:mid.y+dx/length*offset});
      const right=inside({x:mid.x+dy/length*offset,y:mid.y-dx/length*offset});
      if(left===right)continue;if(!left)[a,b]=[b,a];
      boundary.set(key(a)+'>'+key(b),{a,b});
    }
  }
  const outgoing=new Map();for(const e of boundary.values()) {
    const k=key(e.a);if(outgoing.has(k))throw Error('Οι χώροι πρέπει να μοιράζονται πλευρά ή επιφάνεια, όχι μόνο γωνία.');outgoing.set(k,e);
  }
  const loops=[];
  while(outgoing.size) {
    const start=outgoing.keys().next().value,ring=[];let next=start;
    do {
      const e=outgoing.get(next);if(!e)throw Error('Το περίγραμμα δεν συνδέεται. Έλεγξε τις άκρες των χώρων.');
      outgoing.delete(next);ring.push(e.a);next=key(e.b);
    } while(next!==start);
    const simplified=ring.filter((p,n)=>{
      const prev=ring[(n+ring.length-1)%ring.length],after=ring[(n+1)%ring.length];
      return Math.abs(cross(sub(p,prev),sub(after,p)))>epsilon*(distance(p,prev)+distance(after,p));
    });
    if(simplified.length>=3)loops.push(simplified);
  }
  if(loops.filter(r=>signedArea(r)>0).length!==1)throw Error('Οι χώροι δεν εφάπτονται. Φέρε τους δίπλα ή επάνω στον άλλο πριν τη συγχώνευση.');
  const b=polygonBounds(loops);
  return {...b,outline:loops.map(r=>r.map(p=>({x:(p.x-b.x)/b.w,y:(p.y-b.y)/b.h})))};
}
export function validOutline(value) {
  if(!Array.isArray(value)||!value.length||value.length>50||value.reduce((n,r)=>n+(Array.isArray(r)?r.length:1001),0)>800)return false;
  return value.every(r=>Array.isArray(r)&&r.length>=3&&r.every(p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&p.x>=0&&p.x<=1&&p.y>=0&&p.y<=1)&&Math.abs(signedArea(r))>1e-9);
}
