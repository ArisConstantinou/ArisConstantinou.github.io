// Benchmark-only setup. Every timed action uses the normal game functions.
export function createBenchmarkFixtures(get){
 let input={moveX:0,moveZ:0},done=new Set(),origin=null;
 const once=(key,time,at,fn)=>{if(time>=at&&!done.has(key)){done.add(key);fn();}};
 function place(e,x,z){const {nav}=get(),node=nav.nodes[nav.nearest(x,z,0)];if(!node)throw Error('Benchmark position has no walkable support');e.body.position.set(node.x,node.y+e.cy+.05,node.z);e.body.velocity.setZero();e.body.aabbNeedsUpdate=true;e.body.wakeUp();e.spawn={...node};e.lastSafe={...node};return node;}
 function setup(type){
  const before=get();before.startRun();done=new Set();input={moveX:0,moveZ:0,pointerActive:false,firing:false,shielding:false};
  const c=get(),p=c.player;
  if(type==='free')return;
  for(const e of c.entities)if(e.category==='actor'&&!e.isPlayer)e.hp=e.maxHp=100000;
  if(type.startsWith('room:')){const room=c.world.zones.find(r=>r.name===type.split(':')[1]);if(!room)throw Error('Benchmark room missing');place(p,(room.xMin+room.xMax)/2,(room.zMin+room.zMax)/2);}
  if(['crowd','mage','engine'].includes(type)){
   place(p,0,type==='engine'?19:16);
   c.entities.filter(e=>e.category==='actor'&&!e.isPlayer&&!e.ally&&!e.dead&&!e.bossType).slice(0,type==='engine'?6:18).forEach((e,i)=>{place(e,-6+(i%6)*2.4,7+Math.floor(i/6)*2);e.aggro=true;e.room='courtyard';});
  }
  if(type==='engine'){
   const e=c.hearth.engine;e.body.position.set(0,1.24,16);e.body.velocity.setZero();e.body.aabbNeedsUpdate=true;e.location.room=c.world.zones.find(r=>r.name==='courtyard');e.heart.state='ready';e.heart.fuel=100;e.yaw=e.aimYaw=Math.PI;e.facing.reset(Math.PI);c.hearth.sync(0);
  }
  origin={x:p.body.position.x,z:p.body.position.z};c.setCamera();
 }
 function step(type,time){
  const c=get(),p=c.player;p.mana=p.maxMana;
  input={moveX:0,moveZ:0,pointerActive:false,firing:false,shielding:false};
  if(type==='turn'){const a=time*.22;c.camera.position.set(p.body.position.x+Math.sin(a)*19,18,p.body.position.z-2+Math.cos(a)*19);}
  if(type.startsWith('room:')){const target={x:origin.x+Math.sin(time*.7)*2,z:origin.z+Math.cos(time*.7)*2},dx=target.x-p.body.position.x,dz=target.z-p.body.position.z,n=Math.max(1,Math.hypot(dx,dz));input.moveX=dx/n;input.moveZ=dz/n;once('pulse',time,4,c.pulse);once('stone',time,6,c.conjure);}
  if(type==='mage'){
   once('stone',time,.5,()=>{const stone=c.conjure();if(stone)c.hold(stone);});
   input.shielding=time>=1&&time<2;
   once('throw',time,2.2,()=>c.throw({x:0,y:3,z:-18}));
   once('pulse',time,4,c.pulse);once('dash',time,6,()=>c.dash({moveX:1,moveZ:0}));
   once('stone2',time,8,()=>{const stone=c.conjure();if(stone)c.hold(stone);});
   once('throw2',time,10,()=>c.throw({x:-8,y:4,z:-18}));once('pulse2',time,12,c.pulse);
  }
  if(type==='engine'){
   once('board',time,.3,()=>c.hearth.interact(c.time));
   if(c.hearth.mounted){input.moveZ=time<7?-.65:time<10?.65:0;input.firing=time>=4&&time<14;}
   once('stomp',time,14,()=>{if(c.hearth.stomp())c.event('engine_stomp');});
   once('exit',time,18,()=>c.hearth.exit());
  }
 }
 return {setup,step,get input(){return input;}};
}
