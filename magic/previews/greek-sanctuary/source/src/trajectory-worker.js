import {ThrowTrajectory,TrajectorySnapshotWorld} from './trajectory.js';
let source,predictor;
self.onmessage=({data})=>{
  try{
    if(!source){source=new TrajectorySnapshotWorld(data.snapshot);predictor=new ThrowTrajectory(source.world);}
    source.apply(data.snapshot);
    const preview=predictor.predict(source.bodies.get(data.bodyId),data.velocity,data.grip,data.damageMultiplier??1);
    self.postMessage({bodyId:data.bodyId,origin:data.origin,velocity:data.velocity,preview});
  }catch(error){self.postMessage({bodyId:data.bodyId,error:error.message});}
};
