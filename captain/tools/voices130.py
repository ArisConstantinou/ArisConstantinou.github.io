"""Generate original stock synthetic voices, not imitations of performers.
No YouTube audio, copied dialogue, credentials or runtime speech service.
"""
import asyncio,json,pathlib
import edge_tts
OUT=pathlib.Path('captain/assets/voices130')
LINES={
'rock':('Βράχια μπροστά! Στρίψε! Στρίψε!','crew'),
'ice':('Παγόβουνο! Όλοι κρατηθείτε!','crew'),
'brace':('Κρατηθείτε! Τώρα!','crew'),
'rail':('Μακριά από τα κάγκελα!','crew'),
'panic':('Όχι, όχι, όχι! Θα πέσουμε πάνω!','passenger'),
'jackets':('Φέρτε τα σωσίβια!','passenger'),
'water':('Βοήθεια! Εδώ! Είμαι εδώ!','passenger'),
'safe':('Το περάσαμε... Το περάσαμε!','passenger'),
'rescued':('Τον έχουμε! Είναι ασφαλής!','crew'),
'captain1':('Εεε... Μια γουλίτσα μόνο.','captain'),
'captain2':('Καλά πάμε... Εγώ το έχω.','captain'),
'captain3':('Μισό... γιατί βλέπω δύο παγόβουνα;','captain'),
'captain4':('Ποιος πάρκαρε νησί μπροστά μας;','captain'),
'captain5':('Εγώ δεν κουνιέμαι... η καρέκλα φταίει!','captain'),
'captain6':('Στρίβει; Στρίβει; Ε, στρίβει!','captain'),
'reply':('Το είδα! Το είδα... περίπου.','captain'),
'calm':('Παιδιά, κρατηθείτε. Είμαστε μαζί σας.','crew'),
'hum':('Μμμμ... λα, λα λα... λα...','captain')}
async def main():
 OUT.mkdir(parents=True,exist_ok=True)
 sem=asyncio.Semaphore(3)
 async def one(key,line,role):
  async with sem:
   voice='el-GR-AthinaNeural' if role=='passenger' else 'el-GR-NestorasNeural'
   rate='-12%' if role=='captain' else '+5%' if role=='passenger' else '+3%'
   pitch='-5Hz' if role=='captain' else '+0Hz'
   dest=OUT/(key+'.mp3')
   for attempt in range(2):
    try:
     await asyncio.wait_for(edge_tts.Communicate(line,voice,rate=rate,pitch=pitch).save(str(dest)),45)
     assert dest.stat().st_size>1500
     return key,{'file':key+'.mp3','text':line,'role':role,'voice':voice}
    except Exception:
     if attempt:raise
     await asyncio.sleep(2)
 result=dict(await asyncio.gather(*(one(k,*v) for k,v in LINES.items())))
 (OUT/'manifest.json').write_text(json.dumps({'version':'1.3.0','origin':'Original fictional game dialogue; stock neural synthetic voices; no performer cloning or borrowed video audio.','clips':result},ensure_ascii=False,indent=2))
 (OUT/'README.txt').write_text('Original LAST CALL fictional dialogue. Pre-rendered stock Greek neural TTS using edge-tts. Synthetic voices, not recordings of actors, not voice cloning, and not audio from the supplied A.M.A.N reference. The hum clip is synthetic vocalization, not an actor singing. Runtime is fully static.\n')
 print('Generated',len(result),'clips')
asyncio.run(main())
