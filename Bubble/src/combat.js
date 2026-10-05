import {TAU,clamp,sub,norm,add,mul} from './engine.js';
export function sectorFor(a,source){let angle=Math.atan2(source[0]-a.p[0],source[2]-a.p[2])-a.yaw;return Math.floor(((angle+TAU+TAU/16)%TAU)/(TAU/8));}
export function hitKnight(a,source,world){if(a.state==='captured')return{captured:false,ignored:true};let before=a.state;a.hp=Math.max(0,a.hp-14);a.stamina=Math.max(0,a.stamina-26);a.hitFlash=.13;a.notice=16;
 if(a.stamina<=0||a.hp<=0||a.state==='dizzy'||a.state==='pinning'){if(a.state==='active')a.state='dizzy';a.dizzy=a.hp<=0?999:Math.min(15,Math.max(a.dizzy,11)+.8);
  if(!a.pin){let dir=norm([a.p[0]-source[0],0,a.p[2]-source[2]]),wall=world.ray(add(a.p,[0,1.12,0]),dir,2.45,true);if(wall&&Math.abs(wall.n[1])<.35){let p=add(wall.p,mul(wall.n,.73));p[1]=a.p[1];if(!world.blocked(p[0],p[2],p[1],.4)){a.p=p;a.pin={p:wall.p.slice(),n:wall.n.slice()};a.yaw=Math.atan2(wall.n[0],wall.n[2]);a.state='pinning';}}}
  if(a.pin){a.pinHits++;if(a.pinHits>=5){a.state='captured';a.hp=0;a.stamina=0;}}
  else{let sector=sectorFor(a,source);a.coverage[sector]=Math.min(1,a.coverage[sector]+.70);for(let j of[(sector+7)%8,(sector+1)%8])a.coverage[j]=Math.min(1,a.coverage[j]+.08);if(a.hp===0&&a.coverage.every(v=>v>=.999))a.state='captured';}
 }
 return{captured:a.state==='captured',justDizzy:before==='active'&&a.state!=='active',pinning:a.state==='pinning',sector:sectorFor(a,source)};
}
