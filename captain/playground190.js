import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {shipSign} from './signs190.js';
/** Playable props, not decoration. Every solid is registered with the existing collision world. */
export function createShipPlayground({ship,world,onEvent=()=>{},onImpulse=()=>{},getPlayer=()=>null}){
 const M=world.M,entries=[],effects=[],jets=[];let time=0,used=0,cascades=0,context=null;
 const matte=c=>new T.MeshStandardMaterial({color:c,roughness:.56});const teal=matte(0x317275),cream=matte(0xe2dac7),red=matte(0xc35235),ink=matte(0x122431),gold=matte(0xc9a565);
 const blue=new T.MeshStandardMaterial({color:0x35a4bb,emissive:0x167b92,emissiveIntensity:.6});
 const foamMat=new T.MeshBasicMaterial({color:0xf2f6ed,transparent:true,opacity:.6,depthWrite:false});
 const dropMat=new T.MeshBasicMaterial({color:0x67ccdf,transparent:true,opacity:.7,depthWrite:false});
 const sphere=new T.SphereGeometry(.08,6,4);const generated=new T.Group();generated.name='Interactive ship effects';world.root.add(generated);
 function part(p,g,m,x=0,y=0,z=0){const o=new T.Mesh(g,m);o.position.set(x,y,z);p.add(o);o.receiveShadow=true;return o;}
 const box=(p,w,h,d,m,x=0,y=0,z=0)=>part(p,new T.BoxGeometry(w,h,d),m,x,y,z);
 function rod(p,x,y,z,h,r=.035,m=M.steel){return part(p,new T.CylinderGeometry(r,r,h,10),m,x,y,z);}
 function prop(id,type,x,y,z,w,d,h,hp=30,grab=false,label=id){const p=world.addProp(type,x,z,{y,w,d,h,hp,grab,label});p.id='play190-'+id;p.interactive=true;p.roomFloor=y;entries.push(p);if(!world.solids.includes(p))world.solids.push(p);return p;}
 function label(p,text,w=.9,y=.9,z=.4){const s=shipSign(text,{width:w,height:.16});s.position.set(0,y,z);p.group.add(s);}
 function wheel(p,x,z){const q=part(p,new T.TorusGeometry(.08,.024,6,12),ink,x,.09,z);q.rotation.y=Math.PI/2;}
 function bottle(id,x,y,z,can=false){const p=prop(id,can?'can':'bottle',x,y,z,.17,.17,can?.25:.42,8,true,can?'ΚΟΥΤΙ ΑΝΑΨΥΚΤΙΚΟΥ':'ΜΠΟΥΚΑΛΙ · ΠΑΡΕ / ΠΕΤΑ');rod(p.group,0,.13,0,.24,.073,can?red:M.orange);rod(p.group,0,.31,0,.13,.028,gold);box(p.group,.13,.10,.007,cream,0,.13,.073);return p;}
 function cart(id,x,y,z){const p=prop(id,'cart',x,y,z,1.2,.74,1.03,60,true,'ΚΑΡΟΤΣΙ · ΚΛΩΤΣΑ / ΠΕΤΑ');for(const h of [.22,.78])box(p.group,1.2,.07,.74,M.wood,0,h,0);for(const a of [-.48,.48])for(const b of [-.27,.27]){rod(p.group,a,.52,b,.9);wheel(p.group,a,b);}box(p.group,1.1,.06,.04,gold,0,1.05,-.33);for(let i=0;i<3;i++)rod(p.group,-.3+i*.3,.93,0,.19,.06,cream);return p;}
 function sofa(id,x,y,z){const p=prop(id,'sofa',x,y,z,2.25,.95,1,65,false,'ΚΑΝΑΠΕΣ · ΣΠΡΩΞΕ / ΣΠΑΣΕ');box(p.group,2.15,.22,.90,M.wood,0,.25,0);for(let i=0;i<3;i++){const q=part(p.group,new T.BoxGeometry(.67,.20,.77),teal,-.7+i*.7,.5,.02);box(p.group,.67,.48,.18,teal,-.7+i*.7,.76,-.37);}for(const x of [-1.04,1.04])box(p.group,.17,.54,.98,teal,x,.54,0);for(const x of [-.9,.9])for(const z of [-.3,.3])rod(p.group,x,.11,z,.18,.045,gold);return p;}
 // Grand piano: black keys, curved body, pedals and caster wheels. It actually rolls when shoved.
 const piano=prop('piano','piano',-5.6,10.1,-9,2.2,1.45,1.14,100,false,'ΠΙΑΝΟ · ΠΑΙΞΕ / ΚΛΩΤΣΑ');piano.useKind='piano';
 box(piano.group,2.2,.28,1.4,ink,0,.82,0);box(piano.group,2.23,.06,1.45,ink,0,1.03,-.03);box(piano.group,1.82,.08,.29,cream,0,.8,.82);
 for(let i=0;i<28;i++){box(piano.group,.012,.025,.28,ink,-.86+i*.064,.853,.83);if(i%7!==2&&i%7!==6)box(piano.group,.028,.042,.16,ink,-.84+i*.064,.874,.77);}
 for(const x of [-.92,.92])for(const z of [-.48,.48]){rod(piano.group,x,.36,z,.68,.065,ink);wheel(piano.group,x,z);}label(piano,'ΠΑΙΞΕ ΜΙΑ ΝΟΤΑ',1.15,1.13,.61);
 // Beverage machine: use dispenses loose cans; breaking it releases a shower of props.
 for(const [id,x,y,z]of [['lounge',-7.55,10.1,4],['restaurant',-7.05,15.83,22]]){
  const p=prop('soda-'+id,'machine',x,y,z,1.1,.8,1.96,42,false,'ΑΥΤΟΜΑΤΟΣ ΠΩΛΗΤΗΣ · ΕΚΤΟΞΕΥΣΗ');p.useKind='soda';box(p.group,1.10,1.9,.8,ink,0,.96,0);box(p.group,.83,1.28,.035,blue,-.05,1.15,.418);label(p,'AURORA SODA',.88,1.76,.446);for(let i=0;i<3;i++)rod(p.group,-.22+i*.23,1.23,.46,.23,.075,red);box(p.group,.12,.12,.08,gold,.43,1.12,.45);box(p.group,.7,.2,.05,ink,0,.28,.45);
  p.stock=Array.from({length:6},(_,i)=>{const q=bottle(id+'-can'+i,x,y+.4,z+.6,true);q.group.visible=false;q.active=false;q.stored=true;return q;});
 }
 // Main lounge bag trolley, TV and soft furnishings, all destructible.
 cart('main-cart',5.8,10.1,3);sofa('lounge-sofa',5.2,10.1,-10);
 for(const [id,x,y,z]of [['lounge',7.95,10.1,-4],['sky',-5.6,21.35,1]]){const p=prop('tv-'+id,'screen',x,y,z,.2,1.5,1.5,18,false,'ΟΘΟΝΗ · ΣΠΑΣΕ');box(p.group,.15,.98,1.55,ink,0,1.05,0);box(p.group,.03,.82,1.38,blue,-.09,1.05,0);rod(p.group,0,.3,0,.5,.06);box(p.group,.45,.07,.8,M.steel,0,.04,0);}
 // Luggage and shopping display cascades.
 for(const [id,x,y,z]of [['baggage',5.3,13.12,32],['shop',-5.6,10.1,36]]){
  const p=prop('rack-'+id,'rack',x,y,z,1.6,.65,1.7,32,false,'ΡΑΦΙ · ΑΝΑΤΡΟΠΗ');p.useKind='rack';for(const x of [-.74,.74])for(const z of [-.25,.25])rod(p.group,x,.82,z,1.65);for(const h of [.12,.77,1.42])box(p.group,1.6,.08,.65,M.wood,0,h,0);
  p.stock=[];for(let i=0;i<6;i++){const q=prop(id+'-case'+i,'luggage',x+(i%3-1)*.45,y+.2+Math.floor(i/3)*.73,z,.36,.44,.50,15,true,'ΒΑΛΙΤΣΑ · ΠΑΡΕ / ΠΕΤΑ');box(q.group,.36,.48,.42,i%2?red:teal,0,.26,0);box(q.group,.23,.05,.05,ink,0,.54,0);box(q.group,.025,.44,.025,gold,.12,.27,.223);p.stock.push(q);}
 }
 // Theatre desk: sound + rotating colored pools on the floor (not text-only).
 const mixer=prop('mixer','console',-6.9,15.83,-10,1.15,.8,1,30,false,'ΜΙΚΤΗΣ · ΠΑΡΤΙ');mixer.useKind='party';box(mixer.group,1.15,.3,.8,ink,0,.8,0);for(let i=0;i<6;i++){box(mixer.group,.04,.015,.3,M.steel,-.4+i*.15,.96,.08);box(mixer.group,.06,.035,.05,i%2?red:gold,-.4+i*.15,.99,.04);}label(mixer,'ΠΑΡΤΙ',.7,1.1,.4);
 for(const x of [-5.2,5.2]){const p=prop('speaker'+x,'speaker',x,15.83,-14,1,.8,1.6,40,true,'ΗΧΕΙΟ · ΠΑΡΕ / ΠΕΤΑ');box(p.group,1,1.55,.75,ink,0,.8,0);for(const yy of [.44,1.1]){const c=part(p.group,new T.TorusGeometry(.27,.045,8,18),M.steel,0,yy,.4);part(p.group,new T.CircleGeometry(.25,18),teal,0,yy,.403);}}
 // Buffet pass / plate stacks, dining chairs and service carts.
 const buffet=prop('buffet','table',-5.4,15.83,27,3.4,1,1.02,75,false,'ΜΠΟΥΦΕΣ · ΣΠΑΣΕ / ΣΠΡΩΞΕ');box(buffet.group,3.4,.88,1,M.wood,0,.46,0);box(buffet.group,3.5,.12,1.07,cream,0,.98,0);
 for(let i=0;i<5;i++){const q=prop('plates'+i,'vase',-6.6+i*.6,16.92,27,.35,.35,.14,8,true,'ΠΙΑΤΑ · ΠΕΤΑ');for(let j=0;j<4;j++)rod(q.group,0,.025+j*.025,0,.018,.17,cream);}
 cart('dining-cart',-5.1,15.83,17);cart('sky-cart',3.5,21.35,-4);
 for(const [id,x,y,z]of [['pool',-6.7,13.12,-44],['service',-6.4,6.65,27]]){
  const p=prop('jet-'+id,'valve',x,y,z,.5,.55,1.2,999,false,id==='pool'?'ΝΤΟΥΣ ΠΙΣΙΝΑΣ · ΝΕΡΟ':'ΒΑΛΒΙΔΑ ΠΛΥΝΤΗΡΙΩΝ · ΑΦΡΟΣ');p.useKind=id==='pool'?'water':'foam';rod(p.group,0,.56,0,1.12,.075);part(p.group,new T.TorusGeometry(.19,.035,8,16),red,0,.78,.12);const pipe=rod(p.group,0,1.17,.17,.36,.06);pipe.rotation.x=Math.PI/2;label(p,id==='pool'?'ΝΕΡΟ':'ΑΦΡΟΣ',.70,1.35,.2);
 }
 // Engine bay interactive pressure exhibit (fictional arcade mechanism).
 const valve=prop('engine-pressure','valve',-3.1,6.65,-2,.58,.52,1.22,999,false,'ΠΙΕΣΗ · ΠΑΤΗΣΕ');valve.useKind='steam';box(valve.group,.5,.78,.48,teal,0,.44,0);part(valve.group,new T.TorusGeometry(.2,.04,8,16),red,0,1.02,.2);label(valve,'ΠΙΕΣΗ',.7,1.3,.26);
 // Useful throwable supplies at both rails, including right beside the bridge access.
 for(const [side,z]of [[-1,4],[1,4],[-1,34],[1,34]])for(let i=0;i<3;i++){const p=bottle('rail-'+side+'-'+z+'-'+i,side*10.4,10.18,z+i*.6,true);p.resupply=true;}
 const original=world.fracture;world.fracture=p=>{const result=original(p);if(result&&p.useKind)activate(p,true);return result;};
 function sound(){try{context ||= new (window.AudioContext||window.webkitAudioContext)();context.resume();[262,330,392,523].forEach((f,i)=>{const o=context.createOscillator(),g=context.createGain();o.frequency.value=f;o.type='triangle';g.gain.setValueAtTime(0,context.currentTime+i*.11);g.gain.linearRampToValueAtTime(.045,context.currentTime+i*.11+.02);g.gain.exponentialRampToValueAtTime(.001,context.currentTime+i*.11+.35);o.connect(g).connect(context.destination);o.start(context.currentTime+i*.11);o.stop(context.currentTime+i*.11+.4);});}catch{}}
 function activate(p,broken=false){if(!p.useKind||(!broken&&time<(p.nextUse||0)))return false;p.nextUse=time+5;used++;onEvent(20,p.useKind,p.group.position);
  if(['soda','rack'].includes(p.useKind)){cascades++;for(const [i,q]of (p.stock||[]).entries()){if(q.broken)continue;q.stored=false;q.active=true;q.group.visible=true;q.moving=true;q.throwFloor=p.home.y;q.velocity.set((i%3-1)*2.3,2.5+(i%2),4.0);q.hitIds.clear();}}
  if(['water','foam','steam'].includes(p.useKind)){jets.push({p,t:4,next:0,kind:p.useKind});onImpulse(p.group.position,6,p.useKind);}
  if(p.useKind==='piano'||p.useKind==='party'){sound();jets.push({p,t:7,next:0,kind:'music'});onImpulse(p.group.position,5,'party');}
  return true;
 }
 function update(dt){time+=dt;const player=getPlayer();if(player)for(const o of entries)if(!o.overboard&&!o.moving){o.group.visible=!o.broken&&!o.stored&&Math.abs((o.home.y||0)-player.y)<4.7&&Math.hypot(o.group.position.x-player.x,o.group.position.z-player.z)<65;}for(let i=jets.length-1;i>=0;i--){const j=jets[i];j.t-=dt;j.next-=dt;if(j.next<=0&&effects.length<120){j.next=.10;const music=j.kind==='music';const q=new T.Mesh(music?new T.RingGeometry(.4,.8,20):sphere,music?new T.MeshBasicMaterial({color:[0xc97fae,0x64c8b2,0xe4bc60][Math.floor(time*3)%3],transparent:true,opacity:.42,depthWrite:false,side:T.DoubleSide}):(j.kind==='water'?dropMat:foamMat));const a=j.p.group.position;q.position.set(a.x,music?a.y+.05:a.y+1.15,a.z+(music?1.5:.2));if(music){q.rotation.x=-Math.PI/2;q.scale.setScalar(1.5);}
   generated.add(q);effects.push({q,t:music?1.4:1.8,v:new T.Vector3((Math.random()-.5)*.7,music?0:.8,music?0:2.8),music});}
   if(j.t<=0)jets.splice(i,1);}
  for(let i=effects.length-1;i>=0;i--){const f=effects[i];f.t-=dt;if(!f.music){f.v.y-=dt*1.5;f.q.position.addScaledVector(f.v,dt);f.q.scale.setScalar(1+Math.max(0,1.8-f.t)*2);}else f.q.scale.multiplyScalar(1+dt*.35);if(f.t<=0){generated.remove(f.q);if(f.music){f.q.geometry.dispose();f.q.material.dispose();}effects.splice(i,1);}}
 }
 function reset(){for(const p of entries){p.nextUse=0;if(p.stored||p.id.includes('-can')){p.stored=true;p.active=false;p.group.visible=false;}}while(effects.length){const f=effects.pop();generated.remove(f.q);}jets.length=0;used=cascades=time=0;}
 // Combine fine details per prop, keeping the prop itself independently movable/destructible.
 for(const p of entries){const batches=new Map();for(const o of [...p.group.children])if(o.isMesh){if(!batches.has(o.material))batches.set(o.material,[]);batches.get(o.material).push(o);}for(const [m,parts]of batches){if(parts.length<2)continue;const geos=parts.map(o=>{o.updateMatrix();return o.geometry.clone().applyMatrix4(o.matrix);});const g=mergeGeometries(geos,false);if(g){p.group.add(new T.Mesh(g,m));parts.forEach(o=>{p.group.remove(o);o.geometry.dispose();});}geos.forEach(g=>g.dispose());}}
 return {activate,update,reset,entries,inspect:()=>({props:entries.length,usable:entries.filter(p=>p.useKind).length,used,cascades,effects:effects.length})};
}
