import test from 'node:test';import assert from 'node:assert/strict';
import {World,Body,Box,Sphere,Vec3,SAPBroadphase} from 'cannon-es';import {CastleBroadphase} from './physics-config.js';
class OriginalCastleBroadphase extends SAPBroadphase{
 collisionPairs(world,p1,p2){
  if(this.dirty){this.sortList();this.dirty=false;}
  const axis=['x','y','z'][this.axisIndex],bodies=this.axisList;
  for(let i=0;i<bodies.length;i++){const a=bodies[i],upper=a.aabb.upperBound[axis];
   for(let j=i+1;j<bodies.length;j++){const b=bodies[j];if(b.aabb.lowerBound[axis]>upper+1e-8)break;if(!this.needBroadphaseCollision(a,b))continue;if(!SAPBroadphase.checkBounds(a,b,this.axisIndex))break;this.intersectionTest(a,b,p1,p2);}
  }
 }
}
test('sleeping-row skips preserve exact broadphase pair order through wake, filters, removal and compound rotation',()=>{
 const world=new World({gravity:new Vec3(0,-20,0)}),bodies=[];
 for(let i=0;i<240;i++){
  const b=new Body({mass:i%9===0?3:0,shape:i%9===0?new Sphere(.45):new Box(new Vec3(.4,.3,.65)),position:new Vec3(i%20*.75,Math.floor(i/20)%3*.5,Math.floor(i/60)*1.4)});
  b.testId=i;if(i%9===0){b.addShape(new Sphere(.32),new Vec3(.25,1.2,0));b.quaternion.setFromEuler(0,i*.13,.15);if(i%18===0)b.sleep();}
  if(i%23===0){b.collisionFilterGroup=2;b.collisionFilterMask=2;}world.addBody(b);bodies.push(b);
 }
 const original=new OriginalCastleBroadphase(world),fast=new CastleBroadphase(world);
 for(let step=0;step<80;step++){
  if(step===20){bodies[0].wakeUp();bodies[0].velocity.set(3,4,0);}
  if(step===30)world.removeBody(bodies[36]);if(step===45){bodies[54].sleep();bodies[72].wakeUp();}
  const a=[],b=[],c=[],d=[];original.dirty=fast.dirty=true;original.collisionPairs(world,a,b);fast.collisionPairs(world,c,d);
  const ids=(x,y)=>x.map((body,i)=>[body.testId,y[i].testId]);assert.deepEqual(ids(c,d),ids(a,b),'step '+step);
  world.step(1/120);
 }
});
