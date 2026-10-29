// Briefly retain intentional presses across a simulation tick or a hit animation.
export class KickBuffer{
 constructor(){this.clear();}
 request(now,targetId){this.pending={targetId,expires:now+.28};}
 read(now,actor){if(!this.pending)return null;if(now>this.pending.expires||actor.ko||actor.eliminated||actor.dizzyTime>0||actor.catapultId||actor.kick>0){this.clear();return null;}return this.pending;}
 clear(){this.pending=null;}
}
