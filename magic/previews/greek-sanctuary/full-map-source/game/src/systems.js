import {freshLoot,hydrateLoot,BAG_LIMIT,SLOTS,KINDS,isPotion,salvageValue} from './loot.js';
export const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
export const distance = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
export function segmentBox(a, b, box, margin = 0) {
  let near = 0, far = 1;
  for (const axis of ['x', 'z']) {
    const extent = (axis === 'x' ? box.w : box.d) * .5 + margin;
    const lo = box[axis] - extent, hi = box[axis] + extent;
    const origin = a[axis], direction = b[axis] - origin;
    if (Math.abs(direction) < 1e-8) { if (origin < lo || origin > hi) return null; }
    else {
      let t0 = (lo - origin) / direction, t1 = (hi - origin) / direction;
      if (t0 > t1) [t0, t1] = [t1, t0];
      near = Math.max(near, t0); far = Math.min(far, t1);
      if (near > far) return null;
    }
  }
  return near;
}
export function lineClear(a, b, obstacles, margin = 0) {
  return !obstacles.some(box => segmentBox(a, b, box, margin) !== null);
}
export function pointSegmentDistance(p, a, b) {
  const dx = b.x - a.x, dz = b.z - a.z;
  const d = dx * dx + dz * dz;
  const t = d ? clamp(((p.x - a.x) * dx + (p.z - a.z) * dz) / d, 0, 1) : 0;
  return Math.hypot(p.x - a.x - dx * t, p.z - a.z - dz * t);
}
export function ballisticVelocity(from, to, speed = 19, gravity = 20) {
  const dx = to.x - from.x, dz = to.z - from.z;
  const length = Math.hypot(dx, dz);
  const time = Math.max(.001, length / Math.max(.01,speed));
  return {x: dx / time, z: dz / time,
    y: (to.y - from.y + .5 * gravity * time * time) / time};
}

export class NavigationGrid {
  constructor(floors, obstacles, cellSize = .85, radius = .48) {
    this.floors = floors;
    this.obstacles = obstacles.filter(b => b.y - b.h / 2 < 1.8 && b.y + b.h / 2 > .4);
    this.cell = cellSize; this.radius = radius;
    this.minX = Math.min(...floors.map(b => b.x - b.w / 2)) - 1;
    this.minZ = Math.min(...floors.map(b => b.z - b.d / 2)) - 1;
    this.w = Math.ceil((Math.max(...floors.map(b => b.x + b.w / 2)) - this.minX + 1) / cellSize);
    this.h = Math.ceil((Math.max(...floors.map(b => b.z + b.d / 2)) - this.minZ + 1) / cellSize);
    this.walk = new Uint8Array(this.w * this.h);
    for (let z = 0; z < this.h; z++) for (let x = 0; x < this.w; x++) {
      const p = this.point(x + z * this.w);
      if (this.isFree(p.x, p.z)) this.walk[x + z * this.w] = 1;
    }
  }
  setObstacles(obstacles) {
    this.obstacles=obstacles.filter(b=>b.y-b.h/2<1.8&&b.y+b.h/2>.4);
    this.walk.fill(0);
    for(let i=0;i<this.walk.length;i++){const p=this.point(i);if(this.isFree(p.x,p.z))this.walk[i]=1;}
  }
  onFloor(x, z) {
    return this.floors.some(b => x >= b.x - b.w/2 - .001 && x <= b.x + b.w/2 + .001 &&
      z >= b.z - b.d/2 - .001 && z <= b.z + b.d/2 + .001);
  }
  isFree(x, z) {
    if (!this.onFloor(x,z)) return false;
    return !this.obstacles.some(b => Math.abs(x - b.x) < b.w/2 + this.radius &&
      Math.abs(z - b.z) < b.d/2 + this.radius);
  }
  point(i) {
    return {x: this.minX + (i % this.w + .5) * this.cell,
      z: this.minZ + (Math.floor(i / this.w) + .5) * this.cell};
  }
  index(x, z) {
    const gx = Math.floor((x - this.minX)/this.cell), gz = Math.floor((z-this.minZ)/this.cell);
    if (gx < 0 || gx >= this.w || gz < 0 || gz >= this.h) return -1;
    return gx + gz * this.w;
  }
  nearest(x,z) {
    const start = this.index(x,z);
    if (start >= 0 && this.walk[start]) return start;
    let best=-1, ds=Infinity;
    for (let r=1;r<=4;r++) for(let a=-r;a<=r;a++) for(let b=-r;b<=r;b++) {
      const i=this.index(x+a*this.cell,z+b*this.cell);
      if(i>=0&&this.walk[i]) {const p=this.point(i),d=(p.x-x)**2+(p.z-z)**2;if(d<ds){ds=d;best=i;}}
    }
    return best;
  }
  clearRoute(a,b) {
    if(!lineClear(a,b,this.obstacles,this.radius))return false;
    const steps=Math.max(1,Math.ceil(distance(a,b)/this.cell));
    for(let i=0;i<=steps;i++){const t=i/steps;if(!this.onFloor(a.x+(b.x-a.x)*t,a.z+(b.z-a.z)*t))return false;}
    return true;
  }
  path(a,b) {
    if (this.clearRoute(a,b) && this.isFree(b.x,b.z)) return [{x:b.x,z:b.z}];
    const start=this.nearest(a.x,a.z),goal=this.nearest(b.x,b.z);
    if(start<0||goal<0) return [];
    const open=[start], g=new Map([[start,0]]), parent=new Map(),closed=new Set();
    const gp=this.point(goal);
    let count=0;
    while(open.length && count++ < this.walk.length) {
      let bi=0,bf=Infinity;
      for(let k=0;k<open.length;k++){const p=this.point(open[k]);const f=g.get(open[k])+Math.hypot(p.x-gp.x,p.z-gp.z);if(f<bf){bf=f;bi=k;}}
      const current=open.splice(bi,1)[0];
      if(current===goal){
        const output=[];let c=goal;
        while(c!==start){output.push(this.point(c));c=parent.get(c);if(c===undefined)return [];}
        output.reverse();if(this.isFree(b.x,b.z)&&this.clearRoute(output.at(-1)||a,b))output.push({x:b.x,z:b.z});return output;
      }
      closed.add(current);
      const cx=current%this.w,cz=Math.floor(current/this.w);
      for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++){
        if(!dx&&!dz)continue;
        const nx=cx+dx,nz=cz+dz;
        if(nx<0||nx>=this.w||nz<0||nz>=this.h)continue;
        const ni=nx+nz*this.w;
        if(!this.walk[ni]||closed.has(ni))continue;
        if(dx&&dz&&(!this.walk[cx+dx+cz*this.w]||!this.walk[cx+(cz+dz)*this.w]))continue;
        const cost=g.get(current)+this.cell*(dx&&dz?Math.SQRT2:1);
        if(cost<(g.get(ni)??Infinity)){g.set(ni,cost);parent.set(ni,current);if(!open.includes(ni))open.push(ni);}
      }
    }
    return [];
  }
}

const FRESH = () => ({version:1,shards:0,best:0,wins:0,runs:0,upgrades:{},muted:false,loot:freshLoot()});
function savedInteger(value, max) {
  const number = typeof value === 'number' || typeof value === 'string' ? Number(value) : NaN;
  return Number.isFinite(number) ? clamp(Math.floor(number), 0, max) : 0;
}
export const UPGRADE_SPECS = [
  {id:'grip',title:'Σιδερένια θέληση',description:'Αυξάνει την ταχύτητα και τη ζημιά των ρίψεων ανά βαθμίδα.',cost:6,max:3},
  {id:'focus',title:'Απύθμενη πηγή',description:'+20 ενέργεια και ταχύτερη ανάκτηση ανά βαθμίδα.',cost:5,max:3},
  {id:'vitality',title:'Δεσμός ζωής',description:'+25 μέγιστη ζωή σε κάθε επόμενη αποστολή.',cost:6,max:3},
  {id:'pulse',title:'Ρήγμα',description:'Μεγαλύτερη ακτίνα και περισσότερη ζημιά στο ωστικό κύμα.',cost:7,max:3},
  {id:'reach',title:'Μακρινό χέρι',description:'+1.5 μέτρα εμβέλεια τηλεκίνησης ανά βαθμίδα.',cost:5,max:2},
  {id:'dash',title:'Βήμα της σκιάς',description:'Το άλμα σκιάς επανέρχεται πιο γρήγορα.',cost:6,max:2},
];
export class ProfileStore {
  constructor(storage, key = 'magic-exiled-v1', seedKeys = []) {
    this.key=key;
    this.storage=storage;this.available=!!storage;this.profile=FRESH();
    let serialized,raw,inherited=false;
    try {
      serialized=storage?.getItem(this.key);
      if(!serialized)for(const sourceKey of seedKeys){
        const source=storage?.getItem(sourceKey);let candidate;try{candidate=JSON.parse(source||'null');}catch{continue;}
        if(candidate?.version===1){serialized=source;inherited=true;break;}
      }
    }
    catch {this.available=false;return;}
    // A damaged save does not imply that the browser denied storage access.
    try {raw=JSON.parse(serialized||'null');}
    catch {return;}
    if(raw&&raw.version===1){
      for(const key of ['shards','best','wins','runs'])this.profile[key]=savedInteger(raw[key],999999);
      this.profile.muted=!!raw.muted;
      this.profile.loot=hydrateLoot(raw.loot);
      for(const s of UPGRADE_SPECS)this.profile.upgrades[s.id]=savedInteger(raw.upgrades?.[s.id],s.max);
      if(inherited)this.save();
    }
  }
  save(){try{if(!this.storage){this.available=false;return false;}this.storage.setItem(this.key,JSON.stringify(this.profile));this.available=true;return true;}catch{this.available=false;return false;}}
  acquire(raw){
    if(!raw||!Object.hasOwn(KINDS,raw.kind))return false;
    const loot=this.profile.loot,level=Math.max(1,Math.min(5,Math.floor(raw.level)||1));
    const stack=isPotion(raw)?loot.items.find(i=>i.kind===raw.kind&&i.level===level&&i.count<99):null;
    if(stack)stack.count++;
    else{if(loot.items.length>=BAG_LIMIT)return false;loot.items.push({id:loot.nextId++,kind:raw.kind,level,roll:Math.max(0,Math.min(2,Math.floor(raw.roll)||0)),count:1});}
    this.save();return true;
  }
  equip(id){const item=this.profile.loot.items.find(i=>i.id===id);if(!item||!Object.hasOwn(SLOTS,item.kind))return false;this.profile.loot.equipped[item.kind]=id;this.save();return true;}
  unequip(slot){if(!Object.hasOwn(SLOTS,slot))return false;delete this.profile.loot.equipped[slot];this.save();return true;}
  salvage(id){const loot=this.profile.loot,item=loot.items.find(i=>i.id===id);if(!item||isPotion(item)||Object.values(loot.equipped).includes(id))return false;
    loot.items=loot.items.filter(i=>i.id!==id);this.profile.shards+=salvageValue(item);this.save();return true;}
  consume(id){const loot=this.profile.loot,item=loot.items.find(i=>i.id===id);if(!isPotion(item))return false;if(--item.count<=0)loot.items=loot.items.filter(i=>i.id!==id);this.save();return true;}
  upgrades(){return UPGRADE_SPECS.map(s=>({...s,level:this.profile.upgrades[s.id]||0,cost:s.cost+4*(this.profile.upgrades[s.id]||0)}));}
  buy(id){const u=this.upgrades().find(s=>s.id===id);if(!u||u.level>=u.max||this.profile.shards<u.cost)return false;
    this.profile.shards-=u.cost;this.profile.upgrades[id]=u.level+1;this.save();return true;}
  finish({won,kills,time,shards}){
    const awarded=Math.max(0,Math.floor(shards*(won?1:.5)))+(won?8:0);
    const score=Math.max(0,Math.round(kills*150+(won?3000:0)+shards*75+(won?Math.max(0,900-time)*3:0)));
    this.profile.shards+=awarded;this.profile.runs++;if(won)this.profile.wins++;
    const best=score>this.profile.best;this.profile.best=Math.max(this.profile.best,score);this.save();
    return {won,kills,time,shards:awarded,score,best};
  }
}
