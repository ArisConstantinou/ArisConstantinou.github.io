from pathlib import Path
import json
r=Path(__file__).resolve().parents[1]
def rep(s,a,b):
 if a not in s:raise RuntimeError('Missing '+a[:150])
 return s.replace(a,b)
# Hollow, physically enterable accommodation instead of solid extrusion blocks.
s=(r/'ship170.js').read_text();s="import {STAIRS} from './shipwalk184.js';\n"+s
for a,b in [
 ('deckShape(-45, 46, 9.25, 9.85, 2.85, M.white);','deckShape(-45, 46, 9.25, 9.96, .10, M.teak);'),
 ('deckShape(-43.8, 41.6, 9.0, 12.95, 2.5, M.white);','deckShape(-43.8, 41.6, 9.0, 12.96, .10, M.teak);'),
 ('deckShape(-36.8, 35.0, 8.55, 15.72, 2.5, M.white);','deckShape(-36.8, 35.0, 8.55, 15.70, .10, M.teak);'),
 ('deckShape(-28.0, 28.0, 7.85, 18.5, 2.5, M.white);','deckShape(-28.0, 28.0, 7.85, 18.44, .10, M.teak);'),
 ('deckShape(-18, 23.5, 6.4, 21.35, 2.25, M.windows);','// Walkable panoramic salon; its glass walls are authored in roam-world184.'),
 ('box(tier.outer - tier.inner + .13, 1.95, .055, M.cool, side * (tier.outer + tier.inner) * .5, tier.y + 1.0, z + 1.85);','// Continuous balcony promenade: no impassable divider between cabins.'),
 ('box(15.5, 3.58, .23, M.cool, 0, 20.22, 31.05);','box(6.5,3.58,.23,M.cool,-4.5,20.22,31.05); box(6.5,3.58,.23,M.cool,4.5,20.22,31.05);')]:s=rep(s,a,b)
s=rep(s,"    shape.closePath();\n    const geometry", """    shape.closePath();
    // Cut actual stair wells in every relevant floor/ceiling plate.
    if(h<.4)for(const st of STAIRS){
      if(Math.abs((y+h)-st.high)>.42)continue;
      const x0=st.x-st.w/2-.07,x1=st.x+st.w/2+.07,za=st.z0-.06,zb=st.z1-.02;
      if(za<=z0+.12||zb>=z1-.12||Math.max(Math.abs(x0),Math.abs(x1))>=Math.min(w(za),w(zb))-.14)continue;
      const hole=new THREE.Path();hole.moveTo(x0,-za);hole.lineTo(x0,-zb);hole.lineTo(x1,-zb);hole.lineTo(x1,-za);hole.closePath();shape.holes.push(hole);
    }
    const geometry""")
(r/'ship184.js').write_text(s)
# Deck props factory remains the existing real gameplay prop system.
s=(r/'chaos-world173.js').read_text();s=rep(s,'return {root,solids,props,M,spit,','return {root,solids,props,M,addProp:prop,spit,');(r/'chaos-world184.js').write_text(s)
# New story controller, keeping touch183 and whisky183 unchanged.
s=(r/'chaos183.js').read_text()
s="import {createRoamWorld} from './roam-world184.js';\nimport {installShipMap} from './shipmap184.js';\nimport {floorAt,moveCharacter,zoneAt,DESTINATIONS} from './shipwalk184.js';\nimport {BALANCE,damageAmount} from './combat184.js';\n"+s
s=rep(s,"from './security173.js?v=173b'","from './security184.js?v=184'")
s=rep(s,"from './chaos-world173.js?v=173b'","from './chaos-world184.js?v=184'")
s=rep(s,'addChaos,floorAt,moveCharacter,lineBox','addChaos,lineBox')
s=rep(s,'onDrinkLine,mildMotion})','onDrinkLine,mildMotion,onMapPause})')
s=rep(s," const movementHints=installMovementHints", " const roam=createRoamWorld(ship,world);let civilianCount=8;\n const movementHints=installMovementHints")
s=rep(s,'let nearGuards=0,cellCaptain=null,arrestPose=null;',"let nearGuards=0,cellCaptain=null,arrestPose=null,nextAttackAt=0,lastDamageAt=-99,hitUntil=-99;const visitedAreas=new Set();")
s=rep(s," function available(){", " const shipMap=installShipMap({ship,root,hud,getPosition:()=>p,getSolids:solids,navigator,onToggle:value=>{mouse.release();resetInput();onMapPause?.(value);}});\n function available(){")
s=rep(s," function solids(){return [...bridgeSolids,", " function solids(){return [...bridgeSolids,...roam.solids,")
s=s.replace('party.splice(8)','party.splice(civilianCount)')
s=rep(s,"const id=8+guardSerial++","const id=civilianCount+guardSerial++")
s=s.replace('guardSerial>=6','guardSerial>=4')
s=rep(s,"function setPhase(phase){s.phase=phase;", "function setPhase(phase){s.phase=phase;shipMap.sync(s.foot&&!escape.active&&!['arrested','cell','escape'].includes(phase));")
s=rep(s,"  ready=true;\n }", """  const extra=[[-10.7,10.1,23],[10.7,10.1,-12],[0,10.1,-62],[4.9,10.1,6],[-4.8,10.1,-6],[-6,13.12,-48],[6,13.12,-59],[0,13.12,2],[0,15.83,11],[0,15.83,-5],[0,18.57,-31],[0,21.35,11],[0,6.65,8],[0,6.65,-9]];
  extra.forEach(([x,y,z],i)=>{const id=party.length,template=getPeople().getDeckTemplates()[i%8],actor=createActor(template,world.root,{id});actor.group.position.set(x,y,z);party.push({id,actor,x,y,z,radius:.29,home:new T.Vector3(x,y,z),goal:new T.Vector3(x,y,z),health:55,guard:false,brave:i%3===0,state:'idle',wait:3+i*.4,speed:0,attack:null,cooldown:2+i*.2,stagger:0,down:0,flinch:0,bubble:null,bubbleUntil:0,hits:0});});
  civilianCount=party.length;ready=true;
 }""")
# NPC movement is no longer clamped to z>52; idle destinations remain on their own deck.
s=rep(s,"n.goal.set(clamp(n.home.x+(Math.random()-.5)*2,-5.8,5.8),10.1,clamp(n.home.z+(Math.random()-.5)*3,53,61));", "n.goal.set(n.home.x+(Math.random()-.5)*1.1,n.home.y,n.home.z+(Math.random()-.5)*1.5);")
s=s.replace("if(!n.guard&&q.z<52)q.z=52;",'')
s=rep(s,"function down(e){if(mouse.key(e))return true;", "function down(e){if(e.code==='KeyM'&&s.foot&&!escape.active&&!e.repeat){shipMap.toggle();return true;}if(mouse.key(e))return true;")
# Damage tuning: only a single attacker starts a windup at a time.
s=rep(s,"const obstacleList=solids();\n  for(const n of party){", "const obstacleList=solids();\n  for(const n of party){")
s=rep(s,"n.actor.group.rotation.z=0;n.state=n.guard?'fight':'flee';", "n.actor.group.rotation.z=0;n.state=n.guard?'fight':'flee';")
s=rep(s,"n.down=8;n.state='down';","n.down=n.guard?BALANCE.guardWake:12;n.state='down';")
s=rep(s,"n.speed=n.guard?2.45:1.6;","n.speed=n.guard?BALANCE.guardSpeed:1.45;")
s=rep(s,"if(sameFloor&&distance<1.75&&lineClear(p,q)&&n.cooldown<=0&&!n.attack){n.attack={kind:'punch',t:0,landed:false};n.cooldown=(n.guard?1.25:1.9)+(n.id%4)*.12;}","if(sameFloor&&distance<1.75&&lineClear(p,q)&&n.cooldown<=0&&!n.attack&&s.time>=nextAttackAt&&!party.some(o=>o.attack)){n.attack={kind:'punch',t:0,landed:false};nextAttackAt=s.time+BALANCE.globalAttackGap;n.cooldown=(n.guard?BALANCE.guardCooldown:BALANCE.civilianCooldown)+(n.id%4)*.2;}")
s=rep(s,"n.attack.t>.25","n.attack.t>BALANCE.windup")
s=rep(s,"if(s.foot&&contact<1.82&&Math.abs(p.y-q.y)<.8&&lineClear(p,q)){", "if(s.foot&&contact<1.75&&Math.abs(p.y-q.y)<.8&&lineClear(p,q)&&s.time>=hitUntil){")
s=rep(s,"s.health=clamp(s.health-(blocked?2:n.guard?12:9),0,100);if(blocked)s.stamina=Math.max(0,s.stamina-8);", "s.health=clamp(s.health-damageAmount(n.guard,blocked),0,100);lastDamageAt=s.time;hitUntil=s.time+BALANCE.hitGrace;if(blocked)s.stamina=Math.max(0,s.stamina-5);")
s=rep(s,"if(n.attack.t>.68)n.attack=null;", "if(n.attack.t>BALANCE.attackDuration)n.attack=null;")
s=rep(s,"n.actor.tick(dt,{speed:n.speed,attack:n.attack,", "n.actor.group.visible=distance<55&&Math.abs(q.y-p.y)<5;\n   n.actor.tick(dt,{speed:n.speed,attack:n.attack?{...n.attack,t:n.attack.t*(.23/BALANCE.windup)}:null,")
# Give controls time to escape an encirclement. Healthy running exceeds guard pace.
s=rep(s,"speed=(keys.has('ShiftLeft')?3.5:2.7)*(1-drunk*.28)*(s.block?.55:1)", "speed=((keys.has('ShiftLeft')||keys.has('ShiftRight')||(movementHints.scheme==='touch'&&Math.hypot(stick.x,stick.y)>.88))?4.35:2.85)*(1-drunk*.10)*(s.block?.68:1)")
s=rep(s,"<1.72&&lineClear", "<1.43&&lineClear")
s=rep(s,"   updateSecurity(dt);", """   updateSecurity(dt);
   const threat=party.some(n=>n.health>0&&(n.guard||n.state==='fight')&&Math.abs(n.actor.group.position.y-p.y)<1&&Math.hypot(n.actor.group.position.x-p.x,n.actor.group.position.z-p.z)<5.5);
   if(s.time-lastDamageAt>BALANCE.healDelay&&!threat&&s.health>0)s.health=clamp(s.health+dt*BALANCE.healRate,0,100);
   shipMap.update(s.time);visitedAreas.add(zoneAt(p));
""")
# Throwables land on the current ship deck, not on the old bar floor.
s=rep(s,"if(o.group.position.y<10.14){o.group.position.y=10.14;", "const ground=floorAt(o.group.position.x,o.group.position.z,o.throwFloor??p.y);if(ground!==null&&o.group.position.y<ground+.04){o.group.position.y=ground+.04;")
s=s.replace("Math.abs(b.y-10.1)<2","Math.abs(b.y-(o.throwFloor??p.y))<2")
s=s.replace("o.group.position.z>69||o.group.position.z<46","o.group.position.z>73||o.group.position.z<-68")
s=s.replace("o.y=10.1;","o.y=ground??p.y;")
s=rep(s,"function throwObject(){", "function throwObject(){if(held)held.throwFloor=p.y;")
# Include return/exploration metadata and truthful map.
s=rep(s,"function hudUpdate(){let goal=", "function hudUpdate(){shipMap.sync(s.foot&&!escape.active&&!['arrested','cell','escape'].includes(s.phase));let goal=")
s=rep(s,"  if(s.returning){$('chapterGoal')", "  if(s.foot&&!s.returning&&s.phase==='deck')$('chapterDetail').textContent='Εξερεύνησε το πλοίο · ΧΑΡΤΗΣ για διαδρομή.';\n  if(s.foot&&s.time-lastDamageAt>BALANCE.healDelay&&s.health<100)$('vitalLifeNote').textContent='Ανάκαμψη εκτός μάχης';\n  if(s.foot&&party.some(n=>n.attack&&n.attack.t<BALANCE.windup&&Math.hypot(n.actor.group.position.x-p.x,n.actor.group.position.z-p.z)<3))$('chapterDetail').textContent='Έρχεται χτύπημα — απομακρύνσου ή κράτα ΜΠΛΟΚ.';\n  if(s.returning){$('chapterGoal')")
s=rep(s,"function reset(){touchControl?.reset();", "function reset(){shipMap.reset();nextAttackAt=0;lastDamageAt=-99;hitUntil=-99;visitedAreas.clear();touchControl?.reset();")
s=rep(s,"inspect:()=>({touch:", "inspect:()=>({roaming:{...roam.inspect(),zone:zoneAt(p),visited:[...visitedAreas],mapOpen:shipMap.open},balance:BALANCE,touch:")
s=rep(s,"test:{escape:", "test:{routeTo:(id)=>navigator.path(p,DESTINATIONS.find(d=>d.id===id),solids()),setPosition3:(x,y,z,yawValue=0)=>{const h=floorAt(x,z,y);if(h!==null&&Math.abs(h-y)<.7){p.set(x,h,z);yaw=yawValue;}},escape:")
s=rep(s,"const y=floorAt(x,z);","const y=floorAt(x,z,p.y);")
(r/'chaos184.js').write_text(s)
s=(r/'main183.js').read_text().replace("./chaos183.js?v=183","./chaos184.js?v=184").replace("./ship170.js?v=171","./ship184.js?v=184")
s=rep(s,"onRestart:startGame,onDrinkLine:","onRestart:startGame,onMapPause:value=>setPaused(value),onDrinkLine:")
s=s.replace("version:'1.8.3'","version:'1.8.4'").replace('v1.8.3 · TOUCH','v1.8.4 · SHIP').replace('v1.8.3','v1.8.4')
(r/'main184.js').write_text(s)
s=(r/'index.html').read_text().replace('content="1.8.3"','content="1.8.4"').replace('main183.js?v=183','main184.js?v=184').replace('</head>','<link rel="stylesheet" href="./shipmap184.css?v=184">\n</head>')
(r/'index.html').write_text(s)
s=(r/'sw.js').read_text().replace('last-call-1.8.3','last-call-1.8.4').replace('const CORE=[','const CORE=["main184.js","chaos184.js","ship184.js","shipwalk184.js","combat184.js","security184.js","roam-world184.js","chaos-world184.js","shipmap184.js","shipmap184.css",')
(r/'sw.js').write_text(s)
(r/'release.json').write_text(json.dumps({'version':'1.8.4','changes':['Guard damage 12 to 4, coordinated windups, hit grace and slower custody','Six connected traversable decks, fore and aft stairs, eight cabin interiors, bow-to-stern routes','World map route guidance, faster sprint and out-of-combat recovery'],'preserved':['Touch183 relative look and fixed radial actions','Whisky183 hand-attached bottle; one-sip escape','Desktop mouse/WASD and jail checkpoints']},indent=2)+'\n')
