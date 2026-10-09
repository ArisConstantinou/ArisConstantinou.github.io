"""Final gameplay consistency fixes and deterministic controller test timing."""
from pathlib import Path
P=Path('captain')
p=P/'main180.js';s=p.read_text().replace('if(!chaos?.enabled)',"if(!chaos?.enabled||chaos.mode==='helm')");p.write_text(s)
p=P/'chaos180.js';s=p.read_text()
s=s.replace("mode='helm';area.root.visible=false;", "mode='helm';for(const [group,visible] of savedVisible)group.visible=visible;area.root.visible=false;")
s=s.replace("segmentBlocked(p,player,area.walls.filter(w=>!w.vent))", "segmentBlocked(p,player,area.walls)")
s=s.replace("const ws=walls(),p=V(a.x,0,a.z)", "const ws=walls().concat(crouch?area.walls.filter(w=>w.vent):[]),p=V(a.x,0,a.z)")
s=s.replace("version:'1.8.0',mode,elapsed", "version:'1.8.0',restoredOnboard:mode==='helm'?getPeople().getSpeakers().filter(p=>p.group.visible).length:0,mode,elapsed")
s=s.replace("lastSip=-10;finished=false;statistics=", "lastSip=-10;finished=false;lastVocal=-100;shoutAt=0;sipAnim=0;statistics=")
p.write_text(s)
p=P/'performer180.js';s=p.read_text().replace("const h=Math.sin(Math.PI*Math.min(1,n/.55));", "const h=attack.t<=attack.contact?Math.sin(attack.t/attack.contact*Math.PI/2):Math.cos(Math.min(1,(attack.t-attack.contact)/(attack.duration-attack.contact))*Math.PI/2);");p.write_text(s)
p=P/'chaos180.css';p.write_text(p.read_text()+"\n#hud.chaos-roaming #camera{display:none}\n")
# Input is still delivered through browser key events. Advance the real game
# controller in fixed 60 Hz steps, rather than requiring a CPU-rendered WebGL
# test runner to sustain real time. Live RAF touch is tested separately.
p=P/'tools/qa180.py';s=p.read_text()
s=s.replace("t=p.evaluate('window.__lastCall.getState().story.elapsed')+seconds\n p.wait_for_function('(t)=>window.__lastCall.getState().story.elapsed>=t',arg=t,timeout=90000)", "p.evaluate('(n)=>{const c=window.__lastCall.test.story();for(let i=0;i<Math.ceil(n*60);i++)c.tick(1/60);}',seconds)\n p.wait_for_timeout(120)")
s=s.replace("report={'checks':[]", "report={'timing':'Deterministic 60 Hz controller substeps; native browser key events; actual rendered snapshots. Live RAF touch verified separately.','checks':[]")
s=s.replace("p.keyboard.press('Numpad'+str(key));advance(p,.40 if key<3 else .43)", "p.keyboard.press('Numpad'+str(key));advance(p,.17 if key==1 else .36 if key==4 else .40)")
s=s.replace("  for i in range(1,8):actor(p,i,x=3+(i%2),z=4-(i//2)*.8,stun=80,status='wander',attack=0)", "  p.evaluate(\"()=>{for(let i=1;i<8;i++)window.__lastCall.test.story().test.actor(i,{x:3+i%2,z:4-Math.floor(i/2)*.8,stun:80,status:'wander',attack:0});}\")
s=s.replace("check('Reclaiming bridge restores original helm',story(p)['mode']=='helm')", "check('Reclaiming bridge restores original helm',story(p)['mode']=='helm' and story(p)['restoredOnboard']>0)")
p.write_text(s)
print('Contact frames, guard sight, crew handoff and deterministic input checks ready.')
