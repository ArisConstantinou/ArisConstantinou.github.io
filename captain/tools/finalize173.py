from pathlib import Path
import re
p=Path('captain/chaos173.js');s=p.read_text()
s=re.sub(r"\$\('chaosUse'\)\.textContent=.*?;",'',s,count=1)
s=s.replace('target=closestTarget(2.7)','target=closestTarget(2.5)')
a=" $('chaosBlock').addEventListener('pointerdown',e=>{if(!available())return;e.preventDefault();e.currentTarget.setPointerCapture(e.pointerId);s.block=true;});for(const k of ['pointerup','pointercancel','lostpointercapture'])$('chaosBlock').addEventListener(k,()=>s.block=false);"
b=""" const blockButton=$('chaosBlock');let blockPointer=null;
 blockButton.addEventListener('pointerdown',e=>{if(!available()||blockPointer!==null)return;e.preventDefault();blockPointer=e.pointerId;blockButton.setPointerCapture(e.pointerId);s.block=true;});
 for(const k of ['pointerup','pointercancel','lostpointercapture'])blockButton.addEventListener(k,e=>{if(e.pointerId!==blockPointer||(e.type==='lostpointercapture'&&e.target!==blockButton))return;blockPointer=null;s.block=false;});"""
if a in s:s=s.replace(a,b,1)
else:assert b in s,'Unexpected block listener'
s=s.replace("movePointer=null;lookPointer=null;", "movePointer=null;blockPointer=null;lookPointer=null;") if "movePointer=null;blockPointer=null;lookPointer=null;" not in s else s
s=s.replace("pad.addEventListener('pointerdown',e=>{if(!available())return;", "pad.addEventListener('pointerdown',e=>{if(!available()||movePointer!==null)return;")
s=s.replace("pad.addEventListener(k,e=>{if(e.pointerId===movePointer){", "pad.addEventListener(k,e=>{if(e.type==='lostpointercapture'&&e.target!==pad)return;if(e.pointerId===movePointer){")
if 'block:s.block,stick:{...stick},sips:' not in s:s=s.replace('sips:s.sips,','block:s.block,stick:{...stick},sips:s.sips,')
s=re.sub(r'\?v=173\b','?v=173b',s)
p.write_text(s)
p=Path('captain/security173.js');s=p.read_text().replace("let stamp=''","let stamp=null").replace("stamp='';nodes=[]","stamp=null;nodes=[]");p.write_text(s)
p=Path('captain/ui173.js');s=p.read_text()
a="function adapt(){const touch=movement.scheme==='touch';"
b="""function adapt(){const touch=movement.scheme==='touch';
  const help=document.getElementById('helpPanel');
  if(help&&help.dataset.scheme173!==movement.scheme){
   if(!help.dataset.desktop173)help.dataset.desktop173=help.innerHTML;
   help.innerHTML=touch?'<p><b>ΣΤΟ ΚΑΤΑΣΤΡΩΜΑ:</b> Κίνηση με το αριστερό χειριστήριο. Σύρε στην ελεύθερη δεξιά πλευρά για να κοιτάξεις γύρω. Τα τέσσερα μεγάλα κουμπιά δεξιά είναι τα χτυπήματα.</p><p><b>ΑΛΛΗΛΕΠΙΔΡΑΣΗ:</b> Πλησίασε και κοίτα τον στόχο. Το φωτισμένο κουμπί δείχνει ΜΙΛΑ, ΠΑΡΕ, ΠΙΕ ή ΠΕΤΑ ανάλογα με το τι μπορείς να κάνεις. Κράτησε το ΜΠΛΟΚ για άμυνα, ακόμη και ενώ κινείσαι.</p><p><b>ΣΥΛΛΗΨΗ:</b> Η μπάρα ανεβαίνει όταν σε ακινητοποιούν κοντινοί φύλακες και μειώνεται όταν ξεφεύγεις. Στο 100% σε μεταφέρουν στο κελί. Η stealth απόδραση δεν περιλαμβάνεται ακόμη.</p><p><b>ΣΤΗ ΓΕΦΥΡΑ:</b> Πιάσε το ίδιο το τιμόνι και γύρισέ το κυκλικά. Σύρε τον δεξιό μοχλό πάνω για πρόσω, στη μέση για κράτει και κάτω για ανάποδα. Οι ενέργειες έχουν δικά τους κουμπιά αφής.</p><p>Η ήπια κάμερα περιορίζει τη ζάλη χωρίς να αλλάζει τη μέθη.</p>':help.dataset.desktop173;
   help.dataset.scheme173=movement.scheme;
  }"""
if 'scheme173' not in s:s=s.replace(a,b,1)
s=s.replace("s.alarmAt!==null?'Έρχεται ασφάλεια'", "s.alarmAt!==null?'Ασφάλεια σε '+Math.max(0,Math.ceil(s.alarmAt-s.time))+'″'")
p.write_text(s)
for name in ['main173.js','index.html']:
 p=Path('captain',name);p.write_text(re.sub(r'\?v=173\b','?v=173b',p.read_text()))
p=Path('captain/sw.js');p.write_text(p.read_text().replace("'last-call-1.7.3'","'last-call-1.7.3b'"))
p=Path('captain/tools/qa173.py');s=p.read_text()
s=s.replace("if not ok:raise AssertionError((name,detail))", "if not ok:\n  try:report['state']=state(p);snap(p,'failure')\n  except Exception:pass\n  raise AssertionError((name,detail))")
s=s.replace("pos(p,0,56,0);pad=", "pos(p,3,40,0);pad=")
s=s.replace("p.evaluate('window.__lastCall.test.chapter.model.block')", "state(p)['chapter']['block']")
a="before=state(p)['chapter']['position'];cd.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y-25,'id':0},{'x':bx,'y':by,'id':1}]});advance(p,.2)"
b="""before=state(p)['chapter']['position']
    # Start on the child knob and child shield, then drag: regression for bubbling lostpointercapture.
    shield=p.locator('#chaosBlock span').bounding_box();bx=shield['x']+shield['width']/2;by=shield['y']+shield['height']/2
    cd.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y,'id':0},{'x':bx,'y':by,'id':1}]});p.wait_for_timeout(120)
    cd.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':x,'y':y-25,'id':0},{'x':bx,'y':by,'id':1}]});advance(p,.2)"""
if a in s:s=s.replace(a,b,1)
s=s.replace("    incident(p,True);custody", """    for cycle in range(4):
     cd.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y,'id':0},{'x':bx,'y':by,'id':1}]});p.wait_for_timeout(70)
     advance(p,.1);ck('Nested touch capture cycle '+str(cycle),state(p)['chapter']['block'])
     cd.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[{'x':bx,'y':by,'id':1}]});advance(p,.1)
     ck('Releasing movement preserves block '+str(cycle),state(p)['chapter']['block'])
     cd.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});advance(p,.1)
     ck('Releasing the block finger ends block '+str(cycle),not state(p)['chapter']['block'])
    incident(p,True);custody""") if 'Nested touch capture cycle' not in s else s
p.write_text(s)
