from pathlib import Path
p=Path('captain/tools/qa173.py');s=p.read_text()
# CDP touchEnd must have no touchPoints. Updating the active list removes one pointer.
s=s.replace("{'type':'touchEnd','touchPoints':[{'x':bx,'y':by,'id':1}]}","{'type':'touchMove','touchPoints':[{'x':bx,'y':by,'id':1}]}")
s=s.replace("    for cycle in range(4):", """    p.evaluate(\"window.__touchAudit=[];for(const k of ['pointerdown','pointerup','pointercancel','gotpointercapture','lostpointercapture'])document.addEventListener(k,e=>{window.__touchAudit.push({event:e.type,id:e.pointerId,target:e.target.id||e.target.tagName,parent:e.target.parentElement?.id});if(window.__touchAudit.length>40)window.__touchAudit.shift();},true)\")
    for cycle in range(4):""") if 'window.__touchAudit=[]' not in s else s
s=s.replace("     advance(p,.1);ck('Nested touch capture cycle '", "     cd.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x,'y':y-25,'id':0},{'x':bx,'y':by,'id':1}]})\n     advance(p,.1);ck('Nested touch capture cycle '") if "     cd.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x,'y':y-25" not in s else s
s=s.replace("ck('Releasing movement preserves block '+str(cycle),state(p)['chapter']['block'])", "ck('Releasing movement preserves block '+str(cycle),state(p)['chapter']['block'] and abs(state(p)['chapter']['stick']['y'])<.01,{'events':p.evaluate('window.__touchAudit'),'block':state(p)['chapter']['block'],'stick':state(p)['chapter']['stick']})")
p.write_text(s)
