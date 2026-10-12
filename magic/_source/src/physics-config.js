import {ArrayCollisionMatrix,SAPBroadphase} from 'cannon-es';

class FastCollisionMatrix extends ArrayCollisionMatrix {
  reset() { this.matrix.fill(0); }
}

export class CastleBroadphase extends SAPBroadphase {
  collisionPairs(world,p1,p2) {
    if(this.dirty){this.sortList();this.dirty=false;}
    const axis=['x','y','z'][this.axisIndex],bodies=this.axisList;
    for(let i=0;i<bodies.length;i++){
      const a=bodies[i],upper=a.aabb.upperBound[axis];
      for(let j=i+1;j<bodies.length;j++){
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
