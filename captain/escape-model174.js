/** Chapter 02: deterministic walkable service deck, sight and noise. */
export const CELL=1, FLOOR=4.5;
export const tiles=new Map();
const key=(c,r)=>c+','+r;
function rect(c1,r1,c2,r2,zone){for(let c=c1;c<=c2;c++)for(let r=r1;r<=r2;r++)tiles.set(key(c,r),{c,r,zone});}
rect(7,5,11,9,'cell');
rect(9,10,9,13,'crawl');rect(6,13,9,14,'crawl');
rect(2,14,7,19,'laundry');rect(8,17,14,19,'hall');
rect(10,20,14,26,'store');rect(15,23,15,24,'crawl');
rect(16,3,18,26,'passage');rect(13,3,18,8,'locker');rect(17,2,17,2,'exit');
export const position=(c,r)=>({x:c-9,z:52-r});
export const cellAt=(x,z)=>tiles.get(key(Math.round(x+9),Math.round(52-z)))||null;
export const START=position(9,7), CHECKPOINT=position(2,19), CARD=position(11,25), BOTTLE=position(14,5), EXIT=position(17,2);
export const FURNITURE=[{x:-6,z:36,w:1.5,d:1.1},{x:-4,z:34,w:1.2,d:1.3},{x:2,z:30,w:1.2,d:1.1},{x:4,z:26.3,w:1.3,d:1.0}];
export function blocked(x,z,crawling=false,radius=.23,furniture=FURNITURE){
 for(const [dx,dz] of [[0,0],[radius,0],[-radius,0],[0,radius],[0,-radius]]){const t=cellAt(x+dx,z+dz);if(!t||t.zone==='crawl'&&!crawling)return true;}
 return furniture.some(b=>{const px=Math.max(b.x-b.w/2,Math.min(b.x+b.w/2,x)),pz=Math.max(b.z-b.d/2,Math.min(b.z+b.d/2,z));return (px-x)**2+(pz-z)**2<radius*radius;});
}
export function move(p,dx,dz,crawling=false,furniture=FURNITURE){const n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.075));let d=0;for(let i=0;i<n;i++)for(const a of ['x','z']){const x=p.x+(a==='x'?dx/n:0),z=p.z+(a==='z'?dz/n:0);if(!blocked(x,z,crawling,.23,furniture)){d+=Math.hypot(x-p.x,z-p.z);p.x=x;p.z=z;}}return d;}
export function clearSight(a,b){const d=Math.hypot(b.x-a.x,b.z-a.z),n=Math.max(1,Math.ceil(d/.14));for(let i=1;i<n;i++){const t=i/n,x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t,c=cellAt(x,z);if(!c||c.zone==='crawl')return false;if(FURNITURE.some(o=>Math.abs(x-o.x)<o.w/2&&Math.abs(z-o.z)<o.d/2))return false;}return true;}
export function canSee(n,p,crawling=false){const dx=p.x-n.x,dz=p.z-n.z,d=Math.hypot(dx,dz);if(d>(n.worker?4:5.6)*(crawling?.80:1)||cellAt(p.x,p.z)?.zone==='crawl')return false;return (d<.75||Math.abs(Math.atan2(Math.sin(Math.atan2(dx,dz)-n.yaw),Math.cos(Math.atan2(dx,dz)-n.yaw)))<.65)&&clearSight(n,p);}
export function detectionStep(current,dt,seen,crawling){return Math.max(0,Math.min(100,current+dt*(seen?(crawling?28:48)*seen:-29)));}
export function path(a,b,crawling=false){
 const ac=Math.round(a.x+9),ar=Math.round(52-a.z),bc=Math.round(b.x+9),br=Math.round(52-b.z),start=key(ac,ar),goal=key(bc,br),queue=[start],parents=new Map([[start,null]]);let i=0;
 while(i<queue.length){const k=queue[i++];if(k===goal)break;const [c,r]=k.split(',').map(Number);for(const [dc,dr]of [[0,1],[1,0],[0,-1],[-1,0]]){const next=key(c+dc,r+dr),p=position(c+dc,r+dr);if(!parents.has(next)&&!blocked(p.x,p.z,crawling,.22)){parents.set(next,k);queue.push(next);}}}
 if(!parents.has(goal))return [];const out=[];let k=goal;while(k&&k!==start){const [c,r]=k.split(',').map(Number);out.push(position(c,r));k=parents.get(k);}return out.reverse();
}
export function clampThrow(a,b,max=5.2){const dx=b.x-a.x,dz=b.z-a.z,d=Math.hypot(dx,dz)||1;let end={...a};for(let i=.15;i<=Math.min(d,max);i+=.15){const q={x:a.x+dx/d*i,z:a.z+dz/d*i};if(!cellAt(q.x,q.z)||cellAt(q.x,q.z)?.zone==='crawl')break;end=q;}return end;}
