import {CATAPULT_MECHANISM} from './arcade-cartoon-bodies.js';
// The source asset is anchored at the operator. Runtime stations/rooms are
// anchored at the chassis centre; translate every related attachment together.
const {min,max}=CATAPULT_MECHANISM.chassisBounds;
export const CATAPULT_CENTER_OFFSET=Object.freeze({x:-(min[0]+max[0])/2,z:-(min[2]+max[2])/2});
export const CENTERED_RELEASE_SOCKET=Object.freeze({...CATAPULT_MECHANISM.releaseSocket,x:CATAPULT_MECHANISM.releaseSocket.x+CATAPULT_CENTER_OFFSET.x,z:CATAPULT_MECHANISM.releaseSocket.z+CATAPULT_CENTER_OFFSET.z});
export function catapultAssetPoint(station,point={x:0,z:0}){const n=Math.hypot(station.aimX,station.aimZ)||1,ax=station.aimX/n,az=station.aimZ/n,x=CATAPULT_CENTER_OFFSET.x+(point.x||0),z=CATAPULT_CENTER_OFFSET.z+(point.z||0);return {x:station.x+az*x+ax*z,z:station.z-ax*x+az*z};}
