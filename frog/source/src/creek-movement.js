import * as THREE from 'three';
import {clamp} from './rules.js';
import {WORLD_BOUNDARY} from './world-config.js';
import {beginFrogJump} from './frog-locomotion.js';
import {refugeLineClear} from './refuge.js';

export const creekMovementMethods={
  moveCreekDiver(f,dt){
    if(!this.creekMode||f!==this.player)return false;
    const mods=this.creekAbilityModifiers(),surface=this.world.getSurface(f.x,f.z);
    const held=!!(this.input.right||this.input.down('ControlLeft')||this.input.down('ControlRight'));
    f.breath=Number.isFinite(f.breath)?f.breath:100;
    if(!held&&f.breath>25)f.diveExhausted=false;
    const wants=mods.dive&&held&&!f.diveExhausted&&f.breath>0&&!f.grabbedBy;
    if(surface.type!=='water'||!wants&&!(f.diveDepth>.015)){
      f.diving=false;f.diveDepth=0;f.breath=Math.min(100,f.breath+dt*16);return false;
    }
    const wish=f.travelWish||{vx:0,vz:0};
    let nx=clamp(f.x+wish.vx*dt,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2),nz=clamp(f.z+wish.vz*dt,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2);
    let next=this.world.getSurface(nx,nz);
    if(next.type!=='water'){nx=f.x;nz=f.z;next=surface;}
    const current=this.world.currentAt?.(nx,nz)||{x:0,z:0};
    const cx=clamp(nx+(current.x||0)*dt*.5,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2),cz=clamp(nz+(current.z||0)*dt*.5,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2);
    if(this.world.getSurface(cx,cz).type==='water'){nx=cx;nz=cz;next=this.world.getSurface(nx,nz);}
    const floor=(this.world.getTerrainHeight||this.world.sampleHeight).call(this.world,nx,nz),maxDepth=Math.max(0,Math.min(1.5,next.height-floor-.12));
    const target=wants?maxDepth:0;
    f.diveDepth=Math.max(0,(f.diveDepth||0)+(target-(f.diveDepth||0))*Math.min(1,dt*5));
    f.diving=f.diveDepth>.16;f.swimming=true;f.grounded=true;f.vy=0;
    f.speed=Math.hypot(nx-f.x,nz-f.z)/Math.max(.001,dt);
    f.x=nx;f.z=nz;f.y=next.height-f.diveDepth;
    f.vx=wish.vx;f.vz=wish.vz;f.hop={phase:'swim',time:0};
    if(Math.hypot(wish.vx,wish.vz)>.1)f.yaw=Math.atan2(wish.vx,wish.vz);
    f.breath=clamp(f.breath+dt*(f.diving?-7:16),0,100);
    if(f.breath<=0)f.diveExhausted=true;
    return true;
  },

  creekTongueGrip(target){
    if(!this.creekMode||!this.creekAbilityModifiers().tongueRange||this.creekAbilityModifiers().tongueRange<=10||target?.kind!=='creek-grip')return false;
    const p=this.player,anchor=target.entity,dx=anchor.x-p.x,dz=anchor.z-p.z,distance=Math.hypot(dx,dz);
    if(p.dead||p.grabbedBy||p.attackCD>0||p.stamina<14||distance>14||distance<1)return false;
    if(!refugeLineClear(this.world.creekRefuges||[],p,anchor,{toHeight:0}))return false;
    const landing=this.world.getSurface(anchor.x,anchor.z).height,rise=Math.max(0,landing-p.y);
    if(rise>4.5)return false;
    const flight=Math.max(.7,distance/16,Math.sqrt((rise+.5)/10)+.3);
    const strength=(rise+10*flight*flight)/flight,speed=distance/flight;
    p.vx=dx/distance*speed;p.vz=dz/distance*speed;
    if(!beginFrogJump(p,strength,{redirect:true}))return false;
    p.attackCD=1.2;p.attackAnim=.5;p.attackDuration=.5;p.attackType='tongue';p.stamina-=14;p.charge=-1;
    p.diving=false;p.diveDepth=0;
    this.vfx.tongue(p,new THREE.Vector3(anchor.x,anchor.y,anchor.z));
    this.audio.play?.('jump');return true;
  }
};
