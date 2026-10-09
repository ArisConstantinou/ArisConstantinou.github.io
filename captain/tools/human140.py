"""Download CC0 nonverbal vocal recordings from public creator previews."""
from pathlib import Path
import urllib.request,re,json,subprocess,hashlib
out=Path('captain/assets/human140');out.mkdir(parents=True,exist_ok=True)
sources={'scream':('Archeos',261419,'WomanScream.wav'),'hiccup':('Hephaestus',250140,'Adult Male Hiccup')}
manifest={}
for key,(author,sid,title) in sources.items():
 url=f'https://freesound.org/people/{author}/sounds/{sid}/';page=None;last=None
 for address in [url,url.replace('://freesound.org','://beta.freesound.org')]:
  try:
   req=urllib.request.Request(address,headers={'User-Agent':'Mozilla/5.0'})
   page=urllib.request.urlopen(req,timeout=25).read().decode();break
  except Exception as e:last=e
 if not page:raise RuntimeError(f'Cannot verify source {url}: {last}')
 assert 'creativecommons.org/publicdomain/zero/' in page or 'Creative Commons 0' in page,'CC0 license not found'
 page=page.replace('\\/','/')
 matches=re.findall(r'https://(?:cdn\.)?freesound.org/(?:data/)?previews/[^\s"\'<>]+?\.mp3',page)
 matches=[u for u in matches if '/'+str(sid)+'_' in u]
 if not matches:raise RuntimeError(f'No public preview for {url}')
 audio=next((u for u in matches if '-hq.mp3' in u),matches[0]);data=urllib.request.urlopen(audio,timeout=25).read();assert len(data)>500
 tmp=out/(key+'-source.mp3');tmp.write_bytes(data)
 subprocess.run(['ffmpeg','-y','-v','error','-i',str(tmp),'-t','3','-af','loudnorm=I=-19:TP=-3:LRA=7','-ac','1','-ar','44100','-codec:a','libmp3lame','-b:a','128k',str(out/(key+'.mp3'))],check=True);tmp.unlink()
 manifest[key]={'title':title,'author':author,'source':url,'preview':audio,'license':'CC0 1.0','origin':'human nonverbal recording','processing':'mono; loudness normalized; maximum 3 seconds','sha256':hashlib.sha256((out/(key+'.mp3')).read_bytes()).hexdigest()}
 print('Downloaded human recording:',key,flush=True)
(out/'SOURCES.json').write_text(json.dumps(manifest,indent=2))
(out/'README.txt').write_text('CC0 human nonverbal vocal recordings from Freesound. See SOURCES.json for authors and URLs. These recordings do not contain Greek dialogue. No voice synthesis or cloning.\n')
