"""Small, readable fixes from direct-wheel browser testing."""
from pathlib import Path
P=Path('captain')
p=P/'tools/qa140.py';s=p.read_text()
# CDP touchEnd ends the gesture. A partial removal is a touchMove with the
# remaining active points, per the Input.dispatchTouchEvent protocol.
s=s.replace("touch('touchEnd',[(1,x,y)]);frames();check('Releasing lever retains wheel and power',state()['controls']['steering'] and state()['throttle']<-.3)","touch('touchMove',[(1,x,y)]);frames();check('Releasing lever retains wheel and power',state()['controls']['steering'] and not state()['controls']['lever'] and state()['throttle']<-.3,state()['controls'])")
s=s.replace("report['passed']=False;report['exception']=traceback.format_exc();print(report['exception'],flush=True)","report['passed']=False;report['exception']=traceback.format_exc();print(report['exception'],flush=True)\n  try:report['failureState']=state()\n  except:pass")
p.write_text(s)
p=P/'helm140.js';s=p.read_text()
if 'displayRudder' not in s:
 s=s.replace('anchor=null,layout=null,usedWheel=false;','anchor=null,layout=null,usedWheel=false,displayRudder=null,visualTime=performance.now();')
 s=s.replace('const id=steering.id;steering=null;showTurn(0);','const id=steering.id;if(steering.kind===\'wheel\')displayRudder=turn;steering=null;showTurn(0);')
 s=s.replace('showTurn(getState().rudder||0);usedWheel=true;', 'showTurn(displayRudder??(getState().rudder||0));usedWheel=true;')
 s=s.replace('function reset(){stopSteer();const id=leverPointer;','function reset(){stopSteer();displayRudder=null;const id=leverPointer;')
 s=s.replace("anchor=a;const s=getState();syncLever(s.throttle);", "anchor=a;const s=getState(),now=performance.now(),dt=Math.min(.08,Math.max(0,(now-visualTime)/1000));visualTime=now;\n  if(steering?.kind==='wheel')displayRudder=turn;else if(displayRudder!==null){displayRudder+=(s.rudder-displayRudder)*(1-Math.exp(-dt*4));if(Math.abs(displayRudder-s.rudder)<.001)displayRudder=null;}\n  syncLever(s.throttle);")
 s=s.replace("get visualRudder(){return steering?.kind==='wheel'?turn:null;}","get visualRudder(){return steering?.kind==='wheel'?turn:displayRudder;}")
 p.write_text(s)
print('Partial-finger release test uses active contact set; wheel release interpolates smoothly.')
