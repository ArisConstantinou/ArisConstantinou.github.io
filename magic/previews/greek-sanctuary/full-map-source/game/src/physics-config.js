import {ArrayCollisionMatrix,SAPBroadphase,Body} from 'cannon-es';

class FastCollisionMatrix extends ArrayCollisionMatrix {
  reset() { this.matrix.fill(0); }
}

export class CastleBroadphase extends SAPBroadphase {
  collisionPairs(world,p1,p2) {
    if(this.dirty){this.sortList();this.dirty=false;}
    const axis=['x','y','z'][this.axisIndex],bodies=this.axisList;
    // Cannon rejects every static/sleeping pair. Jump directly to the next
    // awake body for those rows, retaining the exact original pair order.
    // No solver, contact, substep, sleeping threshold or collision is changed.
    if(!this.nextAwake||this.nextAwake.length<bodies.length+1)this.nextAwake=new Uint32Array(bodies.length+1);
    const next=this.nextAwake;next[bodies.length]=bodies.length;
    for(let i=bodies.length-1;i>=0;i--){const b=bodies[i];next[i]=(b.type&Body.STATIC)!==0||b.sleepState===Body.SLEEPING?next[i+1]:i;}
    for(let i=0;i<bodies.length;i++){
      const a=bodies[i],upper=a.aabb.upperBound[axis];
      const inactive=(a.type&Body.STATIC)!==0||a.sleepState===Body.SLEEPING;
      for(let j=inactive?next[i+1]:i+1;j<bodies.length;j=inactive?next[j+1]:j+1){
        const b=bodies[j];
        // sortList orders exact AABB lower bounds. Once they pass this upper
        // bound, no later shape can touch a, including compound bodies. This
        // also stops static/sleeping pairs that Cannon otherwise scans to N.
        if(b.aabb.lowerBound[axis]>upper+1e-8)break;
        if(!this.needBroadphaseCollision(a,b))continue;
        if(!SAPBroadphase.checkBounds(a,b,this.axisIndex))break;
        this.intersectionTest(a,b,p1,p2);
      }
    }
  }
}

export function fastCollisionTracking(world) {
  world.collisionMatrix=new FastCollisionMatrix();
  world.collisionMatrixPrevious=new FastCollisionMatrix();
}
