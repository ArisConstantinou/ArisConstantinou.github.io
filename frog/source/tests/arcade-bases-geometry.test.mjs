import test from 'node:test';
import assert from 'node:assert/strict';
import {BASES,CATAPULT_SITES,CATAPULT_ENCLOSURES,ENCLOSURES,WALLS,TREES,resolveWallMove,wallContact,hasWallSight,coverAt,terrainSpeed,navigateTo,insideHome,createHouseFloors,houseFloorAt} from '../src/arcade-bases.js';
import {OBSTACLES} from '../src/arcade-model.js';

const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const insideWall=(p,w,radius=.78)=>Math.abs(p.x-w.x)<w.hw+radius-1e-4&&Math.abs(p.z-w.z)<w.hd+radius-1e-4;

test('three stocked homes and three catapult compounds have one genuine opening each',()=>{
  assert.equal(BASES.length,3);assert.equal(ENCLOSURES.length,6);
  assert.deepEqual(BASES.map(base=>base.owner),['player','rival-1','rival-2']);
  for(const base of BASES){
    assert.ok(distance(base.spawn,base.stock)<3.2);
    assert.ok(Math.hypot(base.spawn.x,base.spawn.z)<24);
    assert.ok(WALLS.every(wall=>!insideWall(base.spawn,wall)));
    assert.ok(hasWallSight(base.spawn,base.stock));
  }
  for(const yard of ENCLOSURES){
    const walls=WALLS.filter(w=>w.enclosureId===yard.id);assert.equal(walls.length,5);
    assert.equal(walls.filter(w=>w.id.includes(`${yard.side}-`)).length,2,'only the entrance wall is split');
    assert.equal(wallContact(yard.x,yard.z,yard.approach.x,yard.approach.z,.78),null,'the exact rendered entrance passes a frog');
    const opposite={x:yard.x+(yard.x-yard.gate.x)*2,z:yard.z+(yard.z-yard.gate.z)*2};
    assert.notEqual(wallContact(yard.x,yard.z,opposite.x,opposite.z,.78),null,'the back wall is solid');
  }
});

test('walking through a gate works in both directions without teleporting to the stock',()=>{
  for(const base of BASES){
    let p={x:base.x,z:base.z};const target=base.approach;
    for(let i=0;i<90&&distance(p,target)>.12;i++){
      const length=distance(p,target),n={x:(target.x-p.x)/length,z:(target.z-p.z)/length};
      const next=resolveWallMove(p,n.x*.08,n.z*.08);
      assert.ok(distance(p,next)<=.081);p=next;
    }
    assert.ok(distance(p,target)<.15);
    const end=resolveWallMove(p,base.x-p.x,base.z-p.z);assert.ok(distance(end,base)<.01);
  }
});

test('a high impulse cannot tunnel through the wall and movement can slide along it',()=>{
  const p={x:0,z:20.5};
  const stopped=resolveWallMove(p,12,0);assert.ok(stopped.x<2.2);assert.ok(stopped.x>2.0);assert.equal(stopped.z,p.z);
  const slide=resolveWallMove({x:2.1,z:19.5},2,1.2);assert.ok(slide.x<2.16);assert.ok(slide.z>20.6);
  assert.ok(WALLS.every(w=>!insideWall(stopped,w)&&!insideWall(slide,w)));
});

test('wall contact uses the first impact and blocks shooting and collection through side walls',()=>{
  const base=BASES[1],outside={x:-18,z:7};
  const t=wallContact(base.stock.x,base.stock.z,outside.x,outside.z,.1);assert.ok(t>0&&t<1);
  assert.equal(hasWallSight(base.stock,outside),false);
  assert.equal(hasWallSight(base.stock,base.approach),true);
  assert.equal(wallContact(0,0,0,-2),null);
});

test('an older save embedded in a new fence is moved only to a nearby clear side',()=>{
  const wall=WALLS.find(w=>w.id==='base-player-east-whole'),p={x:wall.x,z:wall.z};
  const migrated=resolveWallMove(p,0,0);assert.ok(distance(p,migrated)<1.1);assert.ok(WALLS.every(w=>!insideWall(migrated,w)));
});

test('all owners can route from every home to every reserve and catapult through the openings',()=>{
  for(const base of BASES)for(const target of [...BASES.map(item=>item.stock),...CATAPULT_SITES]){
    const actor={...base.spawn};let reached=false;
    for(let frame=0;frame<1700;frame++){
      const direction=navigateTo(actor,target),next=resolveWallMove(actor,direction.x*.08,direction.z*.08);
      assert.ok(Math.hypot(direction.x,direction.z)<=1.0001);assert.ok(distance(actor,next)<.081);
      assert.ok(WALLS.every(wall=>!insideWall(next,wall)),`route intersects ${base.owner}'s wall`);
      Object.assign(actor,next);
      if(distance(actor,target)<(target.id?2.4:.25)){reached=true;break;}
    }
    assert.ok(reached,`${base.owner} could not reach ${target.id||JSON.stringify(target)}`);
  }
});

test('side catapult yards leave every home exit open and the player can continue straight into the arena',()=>{
  for(const base of BASES){
    const dx=Math.sin(base.spawnHeading),dz=Math.cos(base.spawnHeading),station=CATAPULT_SITES.find(c=>c.owner===base.owner);
    assert.ok(Math.abs((station.x-base.x)*-dz+(station.z-base.z)*dx)>5.8,'station is well to the side of the home doorway');
    const length=base.owner==='player'?base.gate.z:4;
    let point={...base.gate};
    for(let travelled=0;travelled<length-.01;travelled+=.1){
      const next=resolveWallMove(point,dx*.1,dz*.1);
      assert.ok(Math.hypot(next.x-point.x-dx*.1,next.z-point.z-dz*.1)<1e-6,'leaving home must not meet another mandatory gate');
      assert.ok(OBSTACLES.every(o=>Math.hypot(next.x-o.x,next.z-o.z)>o.r+.78));
      assert.ok(CATAPULT_SITES.every(c=>Math.hypot(next.x-c.x,next.z-c.z)>.95+.78));
      point=next;
    }
  }
  const direction=navigateTo({x:0,z:14},{x:0,z:10});
  assert.ok(Math.abs(direction.x)<1e-8);assert.equal(direction.z,-1,'old station must not leave a ghost collider on the direct route');
});

test('relocated yards are equally reachable from homes and clear houses, trees, rocks and arena edges',()=>{
  const distances=BASES.map(base=>distance(base,CATAPULT_SITES.find(c=>c.owner===base.owner)));
  assert.ok(Math.max(...distances)-Math.min(...distances)<.1);
  assert.equal(CATAPULT_SITES[1].x,-CATAPULT_SITES[2].x);assert.equal(CATAPULT_SITES[1].z,CATAPULT_SITES[2].z);
  for(const yard of CATAPULT_ENCLOSURES){
    const hw=yard.halfWidth+.18,hd=yard.halfDepth+.18;
    for(const sx of [-1,1])for(const sz of [-1,1])assert.ok(Math.hypot(yard.x+sx*hw,yard.z+sz*hd)<24);
    for(const other of ENCLOSURES.filter(c=>c.id!==yard.id))assert.ok(Math.abs(yard.x-other.x)>hw+other.halfWidth+.18||Math.abs(yard.z-other.z)>hd+other.halfDepth+.18);
    for(const obstacle of [...TREES.map(t=>({...t,r:t.radius})),...OBSTACLES]){
      const gap=Math.hypot(Math.max(0,Math.abs(yard.x-obstacle.x)-hw),Math.max(0,Math.abs(yard.z-obstacle.z)-hd));
      assert.ok(gap>obstacle.r,`${yard.id} overlaps a tree patch or rock`);
    }
    assert.ok(hasWallSight(yard.approach,yard,.78));
    assert.ok(WALLS.every(w=>!insideWall(yard.approach,w)));
  }
});

test('a cached route adapts when a frog is respawned at a different home',()=>{
  const actor={...BASES[0].spawn},target=BASES[2].stock;
  for(let i=0;i<20;i++){const d=navigateTo(actor,target);Object.assign(actor,resolveWallMove(actor,d.x*.1,d.z*.1));}
  Object.assign(actor,BASES[1].spawn);
  for(let i=0;i<1500&&distance(actor,target)>.25;i++){const d=navigateTo(actor,target);Object.assign(actor,resolveWallMove(actor,d.x*.1,d.z*.1));}
  assert.ok(distance(actor,target)<.25);
});

test('a frog shoved against a wall can still navigate out through its gate',()=>{
  const actor={x:2.14999,z:20.5},target={x:7,z:0};
  for(let i=0;i<1100&&distance(actor,target)>.25;i++){const d=navigateTo(actor,target);Object.assign(actor,resolveWallMove(actor,d.x*.08,d.z*.08));}
  assert.ok(distance(actor,target)<.25);
});

test('tree cover and slowdown share the exact visible patch footprints',()=>{
  for(const tree of TREES){
    assert.equal(coverAt(tree),tree);assert.equal(terrainSpeed(tree),.55);
    assert.equal(coverAt({x:tree.x+tree.radius+.01,z:tree.z}),null);
  }
  assert.equal(coverAt(BASES[0].stock),null);assert.equal(terrainSpeed(BASES[0].stock),1);
});

test('every whole spawning frog is inside its actual house, clear of the store and facing its door',()=>{
  for(const base of BASES){
    assert.equal(insideHome(base,base.spawn,.78),true);
    assert.ok(distance(base.spawn,base.stock)>1.7,'body must not intersect the stock basket');
    assert.ok(distance(base.spawn,base.stock)<3.2,'spawn must still auto-refill');
    const heading=Math.atan2(base.gate.x-base.spawn.x,base.gate.z-base.spawn.z);
    assert.ok(Math.abs(Math.atan2(Math.sin(heading-base.spawnHeading),Math.cos(heading-base.spawnHeading)))<1e-8);
  }
});

test('shared house floors level natural slopes and their entrance ramps have no height seams',()=>{
  const natural=(x,z)=>.08*x+.05*z,floors=createHouseFloors(natural);
  for(const [index,floor] of floors.entries()){
    const base=BASES[index];assert.equal(houseFloorAt(base.spawn.x,base.spawn.z,floors),floor.height);
    assert.equal(houseFloorAt(base.stock.x,base.stock.z,floors),floor.height);
    for(const signX of [-1,1])for(const signZ of [-1,1])assert.ok(floor.height>natural(base.x+signX*floor.halfWidth,base.z+signZ*floor.halfDepth));
    const r=floor.ramp;
    assert.ok(Math.abs(houseFloorAt(r.x,r.z,floors)-floor.height)<1e-9);
    for(let row=0;row<=r.rows;row++)for(let col=0;col<=r.cols;col++){
      const along=row/r.rows*r.length,across=(col/r.cols*2-1)*r.halfWidth,x=r.x+r.dx*along+r.rightX*across,z=r.z+r.dz*along+r.rightZ*across;
      const y=houseFloorAt(x,z,floors);assert.ok(y!==null&&Math.abs(y-r.heights[row*(r.cols+1)+col])<1e-7,'visible ramp and actor surface must match');
    }
  }
  assert.equal(houseFloorAt(0,0,floors),null);
});
