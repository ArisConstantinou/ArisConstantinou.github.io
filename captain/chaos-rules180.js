// Deterministic arcade rules, shared by input, combat and regression tests.
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const ATTACKS={
  1:{name:'Γρήγορο χαστούκι',icon:'🖐',duration:.36,contact:.13,damage:9,cost:6,reach:1.8,force:.34,score:12},
  2:{name:'Βαρύ χαστούκι',icon:'✋',duration:.70,contact:.31,damage:22,cost:17,reach:1.95,force:.78,score:22},
  3:{name:'Γροθιά',icon:'👊',duration:.52,contact:.20,damage:18,cost:12,reach:1.85,force:.48,score:18},
  4:{name:'Κλωτσιά',icon:'🦶',duration:.79,contact:.34,damage:27,cost:22,reach:2.15,force:1.0,score:26},
  5:{name:'Φτύσιμο',icon:'💦',duration:.65,contact:.22,damage:0,cost:3,reach:2.5,force:0,score:5}
};
export function attackKey(code){const m=/^(?:Digit|Numpad)([1-9])$/.exec(code);return m?Number(m[1]):null;}
export function absorb(intox,pending,dt){const amount=Math.min(pending,dt*4.2);return {intox:clamp(intox+amount-dt*.13,0,100),pending:Math.max(0,pending-amount)};}
export function segmentBlocked(a,b,walls,r=0){
 for(const w of walls){if(w.disabled)continue;let lo=0,hi=1;for(const axis of ['x','z']){const d=b[axis]-a[axis],min=w[axis]-w[axis==='x'?'w':'d']/2-r,max=w[axis]+w[axis==='x'?'w':'d']/2+r;if(Math.abs(d)<1e-7){if(a[axis]<min||a[axis]>max){lo=2;break;}}else{let p=(min-a[axis])/d,q=(max-a[axis])/d;if(p>q)[p,q]=[q,p];lo=Math.max(lo,p);hi=Math.min(hi,q);}}if(lo<=hi&&hi>.001&&lo<.999)return true;
 }return false;
}
// Substepped swept circle movement: solids slide, thin panes cannot be tunneled.
export function moveCircle(p,dx,dz,walls,bounds,r=.3){
 const steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.12));let hits=0;
 for(let i=0;i<steps;i++)for(const axis of ['x','z']){
  const old=p[axis];p[axis]+= (axis==='x'?dx:dz)/steps;
  p[axis]=clamp(p[axis],bounds[axis+'0']+r,bounds[axis+'1']-r);
  for(const w of walls){if(w.disabled)continue;const cx=clamp(p.x,w.x-w.w/2,w.x+w.w/2),cz=clamp(p.z,w.z-w.d/2,w.z+w.d/2);if((p.x-cx)**2+(p.z-cz)**2<r*r){p[axis]=old;hits++;break;}}
 }return hits;
}
export function inStrike(p,target,yaw,reach,cone=.7){const dx=target.x-p.x,dz=target.z-p.z,d=Math.hypot(dx,dz);return d<reach+.28&&d>.05&&(Math.sin(yaw)*dx+Math.cos(yaw)*dz)/d>cone;}
