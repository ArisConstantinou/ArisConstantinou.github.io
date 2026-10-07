(async()=>{ 'use strict';try {
const {GLTFLoader}=window.GLTF, SkeletonUtils=window.SkeletonUtils, BufferGeometryUtils=window.BufferGeometryUtils;

/* core.js */
/* Μουτουλλάς · Χρονικό ενός τόπου — v0.4.0
 * A procedural, replaceable prototype. No historical dates or geography are claimed.
 * Three.js r160, pinned. No server, analytics or account. Separate local save key.
 */
'use strict';
const $=id=>document.getElementById(id), clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const STORAGE='moutoullas-chronicle-prototype-v1';
const DEFAULT_ERAS=[
{id:'a',year:1880,title:'Στη σκιά του βουνού',population:240,stage:0,mission:'water'},
{id:'b',year:1900,title:'Η τέχνη στα χέρια',population:420,stage:1,mission:'craft'},
{id:'c',year:1930,title:'Οι καρποί της πλαγιάς',population:610,stage:2,mission:'harvest'},
{id:'d',year:1960,title:'Ένα βράδυ με φως',population:850,stage:3,mission:'light'},
{id:'e',year:1980,title:'Από αυλή σε αυλή',population:510,stage:4,mission:'water'},
{id:'f',year:2026,title:'Όσα αξίζει να μείνουν',population:150,stage:5,mission:'archive'}];
const QUESTS={
craft:{title:'Η πρώτη σου σκάφη',desc:'Το ξύλο περιμένει. Πάρε ένα κομμάτι, δούλεψέ το στο εργαστήρι και φέρε τη σκάφη στη βρύση.',steps:[['logs','Πάρε ξύλο από τη στοίβα','Πάρε ξύλο'],['workshop','Σκάλισε τη σκάφη στο εργαστήρι','Σκάλισε τη σκάφη'],['fountain','Παράδωσε τη σκάφη στη βρύση','Παράδωσε τη σκάφη']]},
water:{title:'Νερό για τη γειτονιά',desc:'Μια μικρή διαδρομή φροντίδας. Γέμισε το δοχείο και πήγαινε νερό στο εργαστήρι και στην επάνω αυλή.',steps:[['fountain','Γέμισε το δοχείο στη βρύση','Γέμισε το δοχείο'],['workshop','Πήγαινε νερό στο εργαστήρι','Πρόσφερε νερό'],['house','Πήγαινε στην επάνω αυλή','Παράδωσε το υπόλοιπο νερό']]},
harvest:{title:'Το καλάθι της πλαγιάς',desc:'Ακολούθησε το μονοπάτι προς τα δέντρα. Η σημερινή συγκομιδή γίνεται δώρο για τη γειτονιά.',steps:[['orchard','Μάζεψε καρπούς στο περιβόλι','Μάζεψε καρπούς'],['workshop','Ετοίμασε το καλάθι','Ετοίμασε το καλάθι'],['fountain','Μοίρασέ το στην πλατεία','Μοίρασε τους καρπούς']]},
light:{title:'Φώτα στο μονοπάτι',desc:'Δοκιμαστική αποστολή φωτισμού. Βρες τα δύο σημεία και δες τη γειτονιά να αλλάζει τη νύχτα. Δεν είναι ιστορική χρονολόγηση.',steps:[['workshop','Πάρε το φανάρι από το εργαστήρι','Πάρε το φανάρι'],['fountain','Άναψε το φως στην πλατεία','Άναψε το φως'],['house','Άναψε το φως στην επάνω αυλή','Φώτισε τη γειτονιά']]},
archive:{title:'Κράτα μια ιστορία',desc:'Οι τόποι θυμούνται μέσα από τους ανθρώπους. Μάζεψε τρία δοκιμαστικά τεκμήρια για το τετράδιο.',steps:[['house','Βρες το τεκμήριο της αυλής','Κατέγραψε την αυλή'],['fountain','Σημείωσε τη διαδρομή του νερού','Κατέγραψε τη βρύση'],['workshop','Φύλαξε την τέχνη του εργαστηρίου','Κατέγραψε την τέχνη']]}
};
let eras=structuredClone(DEFAULT_ERAS),progress={},eraIndex=1,camMode='map';
let stored={};try{stored=JSON.parse(localStorage.getItem(STORAGE)||'{}')}catch{}
function validateEras(data){
if(!Array.isArray(data)||data.length!==6)throw Error('Το αρχείο πρέπει να περιέχει τις 6 εποχές του πρωτοτύπου.');
return data.map((e,i)=>{if(!e||typeof e!=='object')throw Error('Μη έγκυρη εποχή.');const year=Number(e.year),pop=Number(e.population);if(!Number.isInteger(year)||year<1||year>3000||!Number.isInteger(pop)||pop<0||pop>100000)throw Error('Έτος: 1–3000. Πληθυσμός: 0–100.000. Χρειάζονται ακέραιοι αριθμοί.');if(typeof e.title!=='string'||!e.title.trim()||e.title.length>80)throw Error('Κάθε τίτλος χρειάζεται 1–80 χαρακτήρες.');return {...DEFAULT_ERAS[i],year,population:pop,title:e.title.trim()};});}
try{if(stored.eras)eras=validateEras(stored.eras);if(stored.progress&&typeof stored.progress==='object')for(const e of eras)progress[e.id]=clamp(parseInt(stored.progress[e.id])||0,0,3);eraIndex=clamp(parseInt(stored.eraIndex)||0,0,5);if(!('eraIndex'in stored))eraIndex=1;}catch{stored={};}
let night=false,film='color',saturation=100,contrast=100,muted=true,audioCtx=null,modal=null,transitioning=false;
let modeYaw=.72,pitch=.04,mapTilt=.65,mapRadius=95,thirdRadius=5.6;
let worldReady=false,nearest=null,autoPath=[],moving=false,walkTime=0,lastTime=0,frame=0;
const keys=new Set(),touch={x:0,y:0};
function save(){try{localStorage.setItem(STORAGE,JSON.stringify({version:1,demo:true,eras,progress,eraIndex}));}catch{toast('Δεν ήταν δυνατή η τοπική αποθήκευση. Η εξαγωγή JSON παραμένει διαθέσιμη.');}}
let toastTimer;function toast(text){$('toast').textContent=text;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3800);}
function soundNote(win=false){if(muted)return;try{audioCtx??=new(window.AudioContext||window.webkitAudioContext)();audioCtx.resume();[0,1,2].slice(0,win?3:1).forEach((n)=>{const o=audioCtx.createOscillator(),g=audioCtx.createGain(),t=audioCtx.currentTime+n*.13;o.type='sine';o.frequency.value=[330,440,550][n];g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.07,t+.025);g.gain.exponentialRampToValueAtTime(.001,t+.42);o.connect(g).connect(audioCtx.destination);o.start(t);o.stop(t+.45);});}catch{}}
function releaseInput(){keys.clear();touch.x=touch.y=0;autoPath=[];moving=false;$('joystick').querySelector('i').style.transform='';}
function openModal(id){releaseInput();if(document.pointerLockElement)document.exitPointerLock();modal=id;$(id).hidden=false;$('veil').hidden=false;if(id==='craft'){craftHits=0;craftPhase=0;craftCooldown=0;updateCraft();}$('visual-panel').hidden=true;const el=$(id).querySelector('button');el?.focus();}
function closePanel(id){$(id).hidden=true;if(modal===id){modal=null;$('veil').hidden=true;}$('scene').focus({preventScroll:true});}
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>closePanel(b.dataset.close));$('veil').onclick=()=>{if(modal)closePanel(modal)};
$('help-open').onclick=()=>openModal('help');$('edit-open').onclick=()=>{renderEditor();openModal('editor')};
$('visual-open').onclick=()=>{$('visual-panel').hidden=!$('visual-panel').hidden;keys.clear()};
$('journal-toggle').onclick=()=>{const c=$('journal').classList.toggle('collapsed');$('journal-toggle').textContent=c?'+':'−'};
$('sound').onclick=()=>{muted=!muted;$('sound').style.color=muted?'':'#f8dfa3';$('sound').setAttribute('aria-label',muted?'Ενεργοποίηση ήχου':'Σίγαση ήχου');soundNote(true);toast(muted?'Οι ήχοι είναι κλειστοί.':'Οι ήχοι ενεργειών ενεργοποιήθηκαν.');};
$('full').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{toast('Η πλήρης οθόνη δεν υποστηρίζεται σε αυτόν τον browser.')}};
function setFilm(f){film=f;saturation=f==='bw'?0:100;contrast=f==='bw'?108:100;syncVisual();}
function syncVisual(){const sepia=film==='sepia'?.65:0;$('world').style.filter=`saturate(${saturation/100}) sepia(${sepia}) contrast(${contrast/100})`;$('saturation').value=saturation;$('contrast').value=contrast;$('sat-out').value=saturation+'%';$('contrast-out').value=contrast+'%';document.querySelectorAll('[data-film]').forEach(b=>b.classList.toggle('selected',b.dataset.film===film));}
document.querySelectorAll('[data-film]').forEach(b=>b.onclick=()=>setFilm(b.dataset.film));
$('saturation').oninput=e=>{saturation=Number(e.target.value);film=saturation===0?'bw':film==='sepia'?'sepia':'color';syncVisual()};$('contrast').oninput=e=>{contrast=Number(e.target.value);syncVisual()};
$('day').onclick=()=>setNight(false);$('night').onclick=()=>setNight(true);$('reset-visual').onclick=()=>{setFilm('color');setNight(false)};
function renderEditor(){const root=$('editor-fields');root.replaceChildren();eras.forEach((e,i)=>{const row=document.createElement('div');row.className='editor-row';[['Έτος demo','year','number',e.year],['Τίτλος εποχής','title','text',e.title],['Κάτοικοι demo','population','number',e.population]].forEach(([label,key,type,value])=>{const l=document.createElement('label');l.textContent=label;const input=document.createElement('input');input.type=type;input.value=value;input.dataset.row=i;input.dataset.field=key;if(type==='number'){input.min=key==='year'?1:0;input.max=key==='year'?3000:100000;input.step=1}else input.maxLength=80;l.append(input);row.append(l)});root.append(row)});$('editor-error').textContent='';}
$('save-data').onclick=()=>{try{const arr=structuredClone(eras);$('editor-fields').querySelectorAll('input').forEach(i=>arr[Number(i.dataset.row)][i.dataset.field]=i.value);eras=validateEras(arr);save();refreshUI();closePanel('editor');toast('Οι εποχές ενημερώθηκαν. Η μηχανή και οι αποστολές παραμένουν στη θέση τους.')}catch(e){$('editor-error').textContent=e.message}};
$('export-data').onclick=()=>{const blob=new Blob([JSON.stringify({schema:'moutoullas-chronicle-v1',demo:true,notice:'Placeholder dates, counts and scenarios. Not historical evidence.',eras},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='moutoullas-demo-eras.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1500)};
$('import-data').onchange=async e=>{try{const file=e.target.files[0];if(!file)return;if(file.size>100000)throw Error('Το αρχείο είναι υπερβολικά μεγάλο. Όριο 100 KB.');const data=JSON.parse(await file.text());eras=validateEras(data.eras);save();renderEditor();refreshUI();toast('Το δοκιμαστικό αρχείο φορτώθηκε.');}catch(err){$('editor-error').textContent=err.message}e.target.value=''};
$('reset-data').onclick=()=>{if(!confirm('Επαναφορά των έξι δοκιμαστικών εποχών; Οι αποστολές σου διατηρούνται.'))return;eras=structuredClone(DEFAULT_ERAS);save();renderEditor();refreshUI()};
$('quest-replay').onclick=()=>{progress[eras[eraIndex].id]=0;save();refreshUI();toast('Η αποστολή ξεκίνησε ξανά.')};
function refreshUI(){const e=eras[eraIndex],q=QUESTS[e.mission],p=progress[e.id]||0;
$('years').replaceChildren();eras.forEach((era,i)=>{const b=document.createElement('button');b.className='year-stop'+(i===eraIndex?' selected':'');b.textContent=era.year;b.setAttribute('aria-label',`Δοκιμαστική εποχή ${era.year}: ${era.title}`);b.setAttribute('aria-pressed',String(i===eraIndex));const s=document.createElement('small');s.textContent='ΣΤΑΘΕΡΗ ΕΠΟΧΗ';b.append(s);b.onclick=()=>changeEra(i);$('years').append(b)});
$('era-year').textContent=e.year;$('era-title').textContent=e.title;$('era-desc').textContent=`${e.population} κάτοικοι στο σενάριο · ενδεικτικός αριθμός`;$('chapter-no').textContent=`ΠΡΑΞΗ ${String(eraIndex+1).padStart(2,'0')} · ΔΟΚΙΜΑΣΤΙΚΗ`;$('quest-title').textContent=p===3?'Μια μικρή ιστορία, δική σου.':q.title;$('quest-desc').textContent=p===3?'Η αποστολή ολοκληρώθηκε. Συνέχισε τη βόλτα σου ή επίλεξε μια άλλη εποχή. Το χωριό δεν αλλάζει χρόνο από μόνο του.':q.desc;
$('quest-steps').replaceChildren();q.steps.forEach((s,i)=>{const li=document.createElement('li');li.className=i<p?'done':i===p?'current':'';const b=document.createElement('b');b.textContent=i<p?'✓':i+1;const span=document.createElement('span');span.textContent=s[1];li.append(b,span);$('quest-steps').append(li)});$('quest-count').textContent=`${p} / 3`;$('quest-replay').hidden=p!==3;
if(worldReady){stages.forEach((g,i)=>g.visible=i<=e.stage);residents.forEach((r,i)=>r.group.visible=i<Math.min(residents.length,Math.max(3,Math.round(e.population/90))));stations.forEach(s=>s.button.classList.toggle('current',q.steps[p]?.[0]===s.id));setNight(night);if(blocked(player.position.x,player.position.z)){resetPlayer(false);}autoPath=[];}
}
async function changeEra(i){if(i===eraIndex||transitioning)return;transitioning=true;releaseInput();$('transition-year').textContent=eras[i].year;$('transition').classList.add('show');await new Promise(r=>setTimeout(r,320));eraIndex=i;refreshUI();save();soundNote();setTimeout(()=>{$('transition').classList.remove('show');transitioning=false},350);}


/* assets.js */
// No geometry substitutes: all human anatomy comes from rigged MakeHuman meshes.
// Local URLs in source build; embedded bytes in the self-contained edition.
function assetBuffer(name){const v=window.CHRONICLE_ASSETS?.[name];if(!v)return null;const raw=atob(v),bytes=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);return bytes.buffer;}
async function loadModel(name){const loader=new GLTFLoader();const embedded=assetBuffer(name);return embedded?new Promise((resolve,reject)=>loader.parse(embedded,'',resolve,reject)):loader.loadAsync('./assets/'+name);}

function makeFallbackTexture(kind='diff', base='#b9aa95', alt='#8c7a63'){
  const size=128, c=document.createElement('canvas'); c.width=c.height=size; const ctx=c.getContext('2d');
  if(kind==='rough') { ctx.fillStyle='#c8c8c8'; ctx.fillRect(0,0,size,size); }
  else if(kind==='nor_gl') { ctx.fillStyle='rgb(128,128,255)'; ctx.fillRect(0,0,size,size); }
  else {
    ctx.fillStyle=base; ctx.fillRect(0,0,size,size);
    for(let y=0;y<size;y+=8){ for(let x=0;x<size;x+=8){ const n=((x*13+y*17)%23)/23; ctx.fillStyle = n>.5?alt:base; ctx.globalAlpha=.18+n*.08; ctx.fillRect(x,y,8,8);} }
    ctx.globalAlpha=1;
  }
  const tex=new THREE.CanvasTexture(c); tex.wrapS=tex.wrapT=THREE.RepeatWrapping; tex.needsUpdate=true;
  tex.colorSpace=kind==='diff'?THREE.SRGBColorSpace:THREE.NoColorSpace; tex.anisotropy=4; return tex;
}
async function tryTexture(loader, name, channel, fbBase, fbAlt){
  const b64=window.CHRONICLE_ASSETS?.[name];
  const url=b64 ? 'data:image/jpeg;base64,'+b64 : './assets/'+name;
  try{
    const tex=await loader.loadAsync(url); tex.colorSpace=channel==='diff'?THREE.SRGBColorSpace:THREE.NoColorSpace; tex.wrapS=tex.wrapT=THREE.RepeatWrapping; tex.anisotropy=4; return tex;
  }catch(_){ return makeFallbackTexture(channel,fbBase,fbAlt); }
}
async function loadSurfaceTextures(){
  const loader=new THREE.TextureLoader(), out={};
  const palettes={stone_wall:['#c1b39b','#a79680'],plastered_wall_02:['#d9ceb8','#c2b59d'],wood_planks:['#8d775d','#6f5c46'],forest_ground_04:['#96a07a','#6f7d5a']};
  await Promise.all(['stone_wall','plastered_wall_02','wood_planks','forest_ground_04'].map(async id=>{out[id]={}; const [a,b]=palettes[id]; await Promise.all(['diff','nor_gl','rough'].map(async channel=>{ const name=id+'_'+channel+'.jpg'; out[id][channel]=await tryTexture(loader,name,channel,a,b); }));}));
  return out;
}

const HUMAN_ASSETS=await Promise.all([loadModel('villager_man.glb'),loadModel('villager_woman.glb')]);


/* terrain.js */
// --- Scene and procedural visual language ------------------------------------
if(!window.THREE)throw Error('Η μηχανή 3D δεν φορτώθηκε.');
const T=window.THREE,canvas=$('scene');let renderer;
try{renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});}catch(e){$('loading').innerHTML='<h2>Δεν άνοιξε το 3D.</h2><p>Χρειάζεται browser με WebGL και ενεργή επιτάχυνση γραφικών.</p>';throw e;}
const coarse=matchMedia('(pointer:coarse)').matches;
renderer.setPixelRatio(Math.min(devicePixelRatio,coarse?1.25:1.5));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
const scene=new T.Scene();scene.background=new T.Color('#bfcad0');scene.fog=new T.Fog('#bfcad0',120,350);
const camera=new T.PerspectiveCamera(48,innerWidth/innerHeight,.15,700);const hemi=new T.HemisphereLight('#e6eff2','#686f56',1.35);scene.add(hemi);
const sun=new T.DirectionalLight('#ffe4bf',2.3);sun.position.set(-65,105,50);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-92,right:92,top:92,bottom:-92,near:1,far:280});sun.shadow.normalBias=.045;sun.shadow.bias=-.00008;scene.add(sun);sun.target.position.set(0,15,0);scene.add(sun.target);
const stages=Array.from({length:6},()=>{const g=new T.Group();scene.add(g);return g});
let rngSeed=128807;function rand(){rngSeed=(Math.imul(rngSeed,1664525)+1013904223)|0;return (rngSeed>>>0)/4294967296}function range(a,b){return a+(b-a)*rand()}
const terrainPads=[];
function rawH(x,z){return 8+(55-z)*.24+Math.sin(x*.041)*4+Math.sin(z*.066)*2.8+Math.cos(x*.028+z*.035)*2.5-14*Math.exp(-Math.pow((x+70)/24,2));}
function H(x,z){let h=rawH(x,z),best=0,target=h;for(const p of terrainPads){const d=Math.max(Math.abs(x-p.x)-p.w,Math.abs(z-p.z)-p.d);const a=clamp(1-Math.max(0,d)/2.0,0,1);if(a>best){best=a;target=p.y;}}const a=best*best*(3-2*best);return h+(target-h)*a;}
function pathX(z){return 4*Math.sin(z*.078)+3*Math.cos(z*.037)}
const textureMap = await loadSurfaceTextures();
const mat=(color,extra={})=>new T.MeshStandardMaterial({color,roughness:.9,...extra});
const pbr=(id,color,normal=1)=>mat(color,{map:textureMap[id].diff,normalMap:textureMap[id].nor_gl,roughnessMap:textureMap[id].rough,normalScale:new T.Vector2(normal,normal)});
const M={
stone:pbr('stone_wall','#e2dcd0',.65),stone2:pbr('stone_wall','#d5d2bf',.65),
plaster:pbr('plastered_wall_02','#dbd0b8',.3),cream:pbr('plastered_wall_02','#e8ddc7',.3),
roof:pbr('plastered_wall_02','#965e43',.32),roof2:pbr('plastered_wall_02','#b18866',.32),
wood:pbr('wood_planks','#72604c',.45),woodLight:pbr('wood_planks','#ad9a75',.4),
shutter:pbr('wood_planks','#657e74',.3),shutter2:pbr('wood_planks','#8f795d',.3),
dark:mat('#172421'),iron:mat('#313936',{metalness:.38}),leaf:mat('#526446'),leaf2:mat('#75815b'),trunk:pbr('wood_planks','#857156',.65),
fruit:mat('#9b793d'),path:pbr('stone_wall','#dadcd5',.38),edge:mat('#888d77'),water:mat('#517f7f',{roughness:.16,metalness:.2,transparent:true,opacity:.87}),
window:mat('#273d39',{emissive:'#f5b46d',emissiveIntensity:0,roughness:.26,metalness:.18}),brass:mat('#b6985e',{metalness:.6,roughness:.42}),pipe:mat('#586e67')};
const G={box:new T.BoxGeometry(1,1,1),cylinder:new T.CylinderGeometry(1,1,1,7),cone:new T.ConeGeometry(1,1,7),sphere:new T.IcosahedronGeometry(1,1),roofSphere:new T.IcosahedronGeometry(1,0)};
const batches=new Map();const tmpObj=new T.Object3D();
function put(geo,material,x,y,z,sx=1,sy=1,sz=1,rx=0,ry=0,rz=0,stage=0){const key=stage+':'+geo.uuid+':'+material.uuid;let b=batches.get(key);if(!b){b={geo,material,stage,matrices:[]};batches.set(key,b)}tmpObj.position.set(x,y,z);tmpObj.scale.set(sx,sy,sz);tmpObj.rotation.set(rx,ry,rz);tmpObj.updateMatrix();b.matrices.push(tmpObj.matrix.clone());}
function box(m,x,y,z,w,h,d,stage=0,rx=0,ry=0,rz=0){put(G.box,m,x,y,z,w,h,d,rx,ry,rz,stage)}
function cyl(m,x,y,z,r,h,stage=0,rx=0,rz=0){put(G.cylinder,m,x,y,z,r,h,r,rx,0,rz,stage)}
// Terrain: real height differences; this is deliberately not a flat village grid.
const terrainGeo=new T.PlaneGeometry(370,350,220,208);terrainGeo.rotateX(-Math.PI/2);const pos=terrainGeo.attributes.position,col=[];
for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i),v=H(x,z);pos.setY(i,v);const n=(Math.sin(x*.26+z*.1)+Math.cos(z*.15-x*.19))*.026;const c=new T.Color('#b7cba3');c.offsetHSL(.006*Math.sin(x),-.025,n+(x<-40?-.035:0));col.push(c.r,c.g,c.b);}
for(let i=0;i<pos.count;i++)terrainGeo.attributes.uv.setXY(i,pos.getX(i)/6,pos.getZ(i)/6);
terrainGeo.setAttribute('color',new T.Float32BufferAttribute(col,3));terrainGeo.computeVertexNormals();const ground=new T.Mesh(terrainGeo,mat('#ffffff',{vertexColors:true,map:textureMap.forest_ground_04.diff,normalMap:textureMap.forest_ground_04.nor_gl,normalScale:new T.Vector2(.3,.3)}));ground.receiveShadow=true;scene.add(ground);
// Higher wooded ridges behind the playable slope.
// Continuous distant mountain ridges, not cones.
for(let k=0;k<3;k++){
 const ridge=new T.PlaneGeometry(640,180,120,36);ridge.rotateX(-Math.PI/2);
 const v=ridge.attributes.position;
 for(let i=0;i<v.count;i++){const x=v.getX(i),z=v.getZ(i)-170-k*85;const n=Math.sin(x*.021+k)*16+Math.sin(x*.054-k)*9+Math.cos(x*.009+k)*24;v.setXYZ(i,x,46+k*12+n-Math.abs(v.getZ(i))*.27,z);}
 ridge.computeVertexNormals();const mesh=new T.Mesh(ridge,mat(['#839b92','#97aca6','#acbbb8'][k]));scene.add(mesh);
}
function ribbon(points,width,material,lift=.07,group=scene){const arr=[],inds=[];for(let i=0;i<points.length;i++){const p=points[i],before=points[Math.max(0,i-1)],after=points[Math.min(points.length-1,i+1)],dx=after[0]-before[0],dz=after[1]-before[1],l=Math.hypot(dx,dz)||1;for(const sign of [-1,1]){const x=p[0]+dz/l*width/2*sign,z=p[1]-dx/l*width/2*sign;arr.push(x,H(x,z)+lift,z)}if(i<points.length-1){let a=i*2;inds.push(a,a+2,a+1,a+1,a+2,a+3)}}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(arr,3));geo.setIndex(inds);geo.setAttribute('uv',new T.Float32BufferAttribute(arr.flatMap((v,i)=>i%3===0?[v/1.6,arr[i+2]/1.6]:[]),2));geo.computeVertexNormals();const mesh=new T.Mesh(geo,material);mesh.receiveShadow=true;mesh.userData.groundRibbon=true;mesh.userData.groundLift=lift;group.add(mesh);return mesh;}
const mainPoints=[];for(let z=-78;z<91;z+=1.5)mainPoints.push([pathX(z),z]);ribbon(mainPoints,3.7,M.edge,.055);ribbon(mainPoints,3.6,M.path,.08);
const sideRows=[-47,-29,-10,10,28,46];
for(const z of sideRows){const a=[];for(let x=-48;x<=48;x+=1.5)a.push([x,z+Math.sin(x*.064)*2]);ribbon(a,2.7,M.path,.065);
}
// Stream at the foot of the western ravine.
const stream=[];for(let z=-95;z<115;z+=2)stream.push([-70+Math.sin(z*.055)*4,z]);ribbon(stream,4.5,M.water,.2);
const colliders=[];let houseCount=0;


/* architecture.js */
// Architectural kit: thick pierced walls, inset joinery, tiled pitched roofs,
// grounded masonry, structural balconies and solid exterior stair treads.
const architectureParts=new Map(),walkSurfaces=[],buildingRecords=[];
function collectGeometry(geo,material,stage=0){const key=stage+':'+material.uuid;if(!architectureParts.has(key))architectureParts.set(key,{material,stage,parts:[]});architectureParts.get(key).parts.push(geo.index?geo.toNonIndexed():geo);}
function uvMetres(geo,scale=1.6){const p=geo.attributes.position,n=geo.attributes.normal,u=new Float32Array(p.count*2);for(let i=0;i<p.count;i++){let x=p.getX(i),y=p.getY(i),z=p.getZ(i);if(Math.abs(n.getY(i))>.6){u[i*2]=x/scale;u[i*2+1]=z/scale;}else if(Math.abs(n.getX(i))>.6){u[i*2]=z/scale;u[i*2+1]=y/scale;}else{u[i*2]=x/scale;u[i*2+1]=y/scale;}}geo.setAttribute('uv',new T.BufferAttribute(u,2));return geo;}
function block(material,x,y,z,w,h,d,stage=0,ry=0){const g=new T.BoxGeometry(w,h,d);g.rotateY(ry);g.translate(x,y,z);uvMetres(g,material===M.wood||material===M.woodLight?.85:1.7);collectGeometry(g,material,stage);}
function beam(a,b,width,depth,material,stage=0){const va=new T.Vector3(...a),vb=new T.Vector3(...b),length=va.distanceTo(vb);if(length<.001)return;const g=new T.BoxGeometry(width,length,depth);g.applyQuaternion(new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),vb.sub(va).normalize()));g.translate((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2);uvMetres(g,.8);collectGeometry(g,material,stage);}
function piercedWall(cx,y,cz,width,height,angle,openings,material,stage){const shape=new T.Shape();shape.moveTo(-width/2,0);shape.lineTo(width/2,0);shape.lineTo(width/2,height);shape.lineTo(-width/2,height);shape.closePath();for(const o of openings){let x=o.x,w=o.w,b=Math.max(.008,o.bottom),t=Math.min(height-.05,o.bottom+o.h);if(t<=b||x-w/2<=-width/2+.08||x+w/2>=width/2-.08)continue;const hole=new T.Path();hole.moveTo(x-w/2,b);hole.lineTo(x-w/2,t);hole.lineTo(x+w/2,t);hole.lineTo(x+w/2,b);hole.closePath();shape.holes.push(hole);}const g=new T.ExtrudeGeometry(shape,{depth:.36,bevelEnabled:true,bevelSegments:1,bevelSize:.009,bevelThickness:.009,curveSegments:1,steps:1});g.translate(0,0,-.36);g.rotateY(angle);g.translate(cx,y,cz);uvMetres(g,1.8);collectGeometry(g,material,stage);}
function joinery(cx,y,cz,angle,opening,shutterMat,stage){const c=Math.cos(angle),s=Math.sin(angle);function local(m,x,yy,z,w,h,d){block(m,cx+c*x+s*z,y+yy,cz-s*x+c*z,w,h,d,stage,angle);}const {x,w,h,bottom:b}=opening;
const door=opening.door;
// An actual recessed frame in the opening. The aperture isn't painted on the wall.
for(const dx of [-w/2,w/2])local(M.woodLight,x+dx,b+h/2,-.13,.09,h+.08,.24);
for(const yy of [b,b+h])local(M.woodLight,x,yy,-.13,w+.1,.09,.24);
if(door){local(M.wood,x,b+h/2,-.27,w-.12,h-.1,.09);for(let k=0;k<5;k++)local(M.woodLight,x-w*.36+k*w*.18,b+h/2,-.212,.014,h-.2,.017);for(const yy of [b+.16,b+h-.16,b+h*.47])local(M.woodLight,x,yy,-.2,w-.17,.1,.025);local(M.iron,x+w*.28,b+h*.48,-.14,.045,.19,.08);}
else{local(M.window,x,b+h/2,-.3,w-.1,h-.1,.03);local(M.woodLight,x,b+h/2,-.19,.065,h-.1,.1);local(M.woodLight,x,b+h*.47,-.19,w-.1,.065,.1);
local(M.stone2,x,b-.07,.03,w+.3,.12,.58);
for(const sign of [-1,1]){const shutterX=x+sign*(w*.76+.03),sw=w*.43;local(shutterMat,shutterX,b+h/2,.035,sw,h+.06,.055);for(let k=0;k<10;k++)local(M.woodLight,shutterX,b+.065+k*(h-.07)/10,.071,sw-.08,.022,.04);for(const yy of [b+.1,b+h-.1])local(M.iron,shutterX,yy,.09,sw*.7,.035,.025);}}
// Deep lintel, not a floating decorative bar.
local(M.stone2,x,b+h+.12,0,w+.35,.2,.47);
}
function tileGeometry(){const p=[],uv=[],idx=[];const seg=8;for(let layer=0;layer<2;layer++)for(let end=0;end<2;end++)for(let k=0;k<=seg;k++){const t=k/seg;p.push((t-.5)*.25,Math.sin(t*Math.PI)*.065-layer*.014,end*.44);uv.push(t,end);}const stride=seg+1;for(let l=0;l<2;l++)for(let k=0;k<seg;k++){let a=l*stride*2+k,b=a+1,c=a+stride,d=c+1;if(l===0)idx.push(a,c,b,b,c,d);else idx.push(a,b,c,b,d,c);}for(let k=0;k<seg;k++){idx.push(k,k+1,k+stride*2,k+1,k+stride*2+1,k+stride*2);let a=stride+k;idx.push(a,a+stride*2,a+1,a+1,a+stride*2,a+stride*2+1);}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(p,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g;}
const roofTileGeo=tileGeometry();
function putMatrix(geo,material,matrix,stage){const key=stage+':'+geo.uuid+':'+material.uuid;if(!batches.has(key))batches.set(key,{geo,material,stage,matrices:[]});batches.get(key).matrices.push(matrix);}
function properRoof(x,y,z,w,d,stage,tileMaterial){const half=w/2+.45,rise=half*.52,slant=Math.hypot(half,rise),a=Math.atan2(rise,half);
for(const sign of [-1,1]){const g=new T.BoxGeometry(slant,.11,d+.8);g.rotateZ(-sign*a);g.translate(x+sign*half/2,y+rise/2,z);uvMetres(g,.8);collectGeometry(g,M.wood,stage);
for(let zz=-d/2-.35;zz<d/2+.4;zz+=.66)beam([x,y+rise-.08,z+zz],[x+sign*half,y-.08,z+zz],.12,.14,M.woodLight,stage);
const down=new T.Vector3(sign*Math.cos(a),-Math.sin(a),0),normal=new T.Vector3(sign*Math.sin(a),Math.cos(a),0),across=new T.Vector3(0,0,-sign),basis=new T.Matrix4().makeBasis(across,normal,down);
for(let row=0;row<slant;row+=.365)for(let zz=-d/2-.34;zz<d/2+.42;zz+=.235){const m=basis.clone();m.setPosition(x+down.x*row+normal.x*.08,y+rise+down.y*row+normal.y*.08,z+zz);putMatrix(roofTileGeo,tileMaterial,m,stage);}
beam([x+sign*half,y-.06,z-d/2-.4],[x+sign*half,y-.06,z+d/2+.4],.18,.17,M.woodLight,stage);}
const ridge=new T.CylinderGeometry(.15,.15,.5,12,1,true,0,Math.PI);ridge.rotateZ(Math.PI/2);ridge.rotateY(Math.PI/2);for(let zz=-d/2-.45;zz<d/2+.5;zz+=.46){const g=ridge.clone();g.translate(x,y+rise+.13,z+zz);collectGeometry(g,tileMaterial,stage);}
return rise;
}
function house(x,z,w,d,oldHeight,stage=0,kind='home'){
 const number=houseCount++,tall=oldHeight>5,fh=tall?5.55:3.0,front=z+d/2;
 const floor=rawH(x,z)+.35,minH=Math.min(rawH(x-w/2,z-d/2),rawH(x+w/2,z-d/2),rawH(x-w/2,front),rawH(x+w/2,front))-.8;
 terrainPads.push({x,z:z+.45,w:w/2+.7,d:d/2+1.0,y:floor-.18});
 const facade=tall?(number%3?M.plaster:M.cream):(number%2?M.stone:M.plaster),shut=number%3?M.shutter:M.shutter2;
 const balcony=tall&&(kind==='workshop'||number%3!==0),balW=w*.78,balD=1.35,balY=floor+2.72;
 buildingRecords.push({x,z,w,d,floor,height:fh,stage,kind,balcony});
 colliders.push({x,z,w:w/2+.36,d:d/2+.36,stage,top:floor+fh+w*.32});
 block(M.stone2,x,(floor+minH)/2,z,w+.15,floor-minH,d+.15,stage);
 block(M.stone2,x,floor-.04,z,w,.12,d,stage);
 const openings=[{x:0,bottom:0,w:kind==='workshop'?1.38:.99,h:2.07,door:true},...[-1,1].map(sign=>({x:sign*w*.31,bottom:.93,w:.85,h:1.04}))];
 if(tall){openings.push(...[-1,1].map(sign=>({x:sign*w*.3,bottom:3.5,w:.92,h:1.16})));if(balcony)openings.push({x:0,bottom:2.74,w:.92,h:2.03,door:true});}
 if(tall){for(const [b,h,m]of [[0,2.78,M.stone],[2.78,fh-2.78,facade]]){piercedWall(x,floor+b,front,w,h,0,openings.filter(o=>o.bottom>=b-.01&&o.bottom<b+h).map(o=>({...o,bottom:o.bottom-b})),m,stage);}block(M.wood,x,floor+2.79,front+.035,w+.04,.15,.15,stage);}
 else piercedWall(x,floor,front,w,fh,0,openings,facade,stage);
 openings.forEach(o=>joinery(x,floor,front,0,o,shut,stage));
 for(const sign of [-1,1]){const ox=x+sign*w/2,angle=sign*Math.PI/2,sideOpen=[];for(const yy of tall?[1.04,3.54]:[1.2])for(const xx of [-d*.26,d*.26])sideOpen.push({x:xx,bottom:yy,w:.85,h:1.0});piercedWall(ox,floor,z,d,fh,angle,sideOpen,facade,stage);sideOpen.forEach(o=>joinery(ox,floor,z,angle,o,shut,stage));}
 piercedWall(x,floor,z-d/2,w,fh,Math.PI,[],M.stone2,stage);
 block(M.wood,x,floor+fh-.1,z,w,.15,d,stage);
 if(tall)block(M.wood,x,floor+2.65,z,w-.6,.17,d-.6,stage);
 const rise=w*.26;for(const zz of [front,z-d/2]){const s=new T.Shape();s.moveTo(-w/2,0);s.lineTo(w/2,0);s.lineTo(0,rise);s.closePath();const g=new T.ExtrudeGeometry(s,{depth:.32,bevelEnabled:false});g.translate(x,floor+fh,zz===front?zz-.32:zz);uvMetres(g);collectGeometry(g,facade,stage);}
 const roofRise=properRoof(x,floor+fh,z,w,d,stage,number%3?M.roof:M.roof2);
 if(number%2===0){block(M.stone2,x+w*.22,floor+fh+roofRise*.65+.45,z-d*.24,.62,1.45,.6,stage);block(M.stone2,x+w*.22,floor+fh+roofRise*.65+1.17,z-d*.24,.82,.13,.8,stage);}
 // Exterior landing and risers: each step bears directly into the sloping ground.
 for(let i=0;i<3;i++){const zz=front+.25+i*.3,top=floor-i*.13,bot=H(x,zz)-.35;block(M.stone2,x,(top+bot)/2,zz,1.45,Math.max(.12,top-bot),.34,stage);walkSurfaces.push({x,z:zz,w:.74,d:.18,y:top,stage});}
 if(balcony){const bz=front+balD*.5;block(M.wood,x,balY,bz,balW,.19,balD+.2,stage);for(let j=0;j<balW;j+=.22)block(M.woodLight,x-balW/2+j,balY+.105,bz,.017,.02,balD+.16,stage);
 const posts=[x-balW/2+.08,x+balW/2-.08];for(const xx of posts){const zz=front+balD,base=H(xx,zz);block(M.stone2,xx,base+.1,zz,.35,.3,.35,stage);beam([xx,base+.2,zz],[xx,balY+1.01,zz],.14,.14,M.wood,stage);beam([xx,balY-.65,zz],[xx,balY-.1,zz-.58],.1,.1,M.woodLight,stage);}
 for(const yy of [balY+.3,balY+1.04])block(M.wood,x,yy,front+balD,balW,.085,.1,stage);for(let xx=-balW/2+.15;xx<balW/2;xx+=.24)block(M.woodLight,x+xx,balY+.65,front+balD,.046,.72,.046,stage);
 for(const sign of [-1,1]){block(M.wood,x+sign*balW/2,balY+1.04,bz,.09,.09,balD,stage);for(let zz=front+.14;zz<front+balD;zz+=.23)block(M.woodLight,x+sign*balW/2,balY+.65,zz,.047,.72,.047,stage);}
 }
 if(kind==='workshop'){
 const bx=x+1.7,bz=front+2.6,by=H(bx,bz);block(M.woodLight,bx,by+.84,bz,1.9,.16,.72,stage);for(const sx of [-.76,.76])for(const sz of [-.24,.24]){const gy=H(bx+sx,bz+sz);beam([bx+sx,gy,bz+sz],[bx+sx,by+.78,bz+sz],.1,.1,M.wood,stage);}beam([bx-.8,by+.28,bz],[bx+.8,by+.28,bz],.09,.09,M.wood,stage);
 const troughShape=new T.Shape();troughShape.moveTo(-.56,0);troughShape.quadraticCurveTo(-.65,.25,-.52,.31);troughShape.lineTo(.52,.31);troughShape.quadraticCurveTo(.65,.25,.56,0);troughShape.closePath();const hole=new T.Path();hole.moveTo(-.43,.1);hole.lineTo(.43,.1);hole.lineTo(.46,.24);hole.lineTo(-.46,.24);hole.closePath();troughShape.holes.push(hole);const tg=new T.ExtrudeGeometry(troughShape,{depth:.39,bevelEnabled:true,bevelSize:.035,bevelThickness:.035,bevelSegments:3});tg.translate(bx,by+.94,bz-.2);uvMetres(tg,.6);collectGeometry(tg,M.woodLight,stage);
 }
}


/* characters.js */
// Real skinned human surfaces, independently cloned 53-bone rigs.
// Runtime procedural posing operates on the skeleton, never detached box limbs.
const Yaxis=new T.Vector3(0,1,0),qScratch=new T.Quaternion(),vScratch=new T.Vector3();
let personCounter=0;
function makePerson(variant=0){const variantNumber=typeof variant==='number'?variant:0;const idx=variantNumber%2,source=HUMAN_ASSETS[idx],model=SkeletonUtils.clone(source.scene),group=new T.Group();group.add(model);scene.add(group);model.updateMatrixWorld(true);
const bounds=new T.Box3().setFromObject(model),height=bounds.max.y-bounds.min.y;const scale=(idx===0?1.76:1.64)/height;model.scale.setScalar(scale);model.position.y=-bounds.min.y*scale;model.updateMatrixWorld(true);
const bones={},rest={};model.traverse(o=>{if(o.isBone){bones[o.name]=o;rest[o.name]={q:o.quaternion.clone(),p:o.position.clone()};}if(o.isMesh){o.frustumCulled=false;o.castShadow=true;o.receiveShadow=true;const materials=Array.isArray(o.material)?o.material:[o.material];o.material=materials.map(m=>{m=m.clone();m.roughness=.78;m.metalness=0; if(/casualsuit|elegantsuit/i.test(m.name)){const palette=['#bdc5b7','#bdb5a7','#c2af96','#b1bab4','#c0c2c7','#c3b3b1']; m.color.multiply(new T.Color(palette[variantNumber%palette.length]));} if(/short02|bob01/.test(m.name) && variantNumber>3){m.color.set('#a59b8c');m.roughness=.93;}const alpha=/short02|bob01|eyebrow/.test(m.name);m.transparent=false;m.opacity=1;m.depthWrite=true;m.alphaTest=alpha?.45:0;m.side=alpha?T.DoubleSide:T.FrontSide;return m;});if(o.material.length===1)o.material=o.material[0];}});
const getPos=name=>group.worldToLocal(bones[name].getWorldPosition(new T.Vector3()));
const measures={};for(const side of ['l','r']){const hip=getPos('thigh_'+side),knee=getPos('calf_'+side),ankle=getPos('foot_'+side);measures[side]={hip,length1:hip.distanceTo(knee),length2:knee.distanceTo(ankle),ankleHeight:ankle.y};}
const p={group,model,bones,rest,measures,variant:idx,phase:personCounter++*.73,blend:0};poseHuman(p,0,false);return p;
}
function pointBone(p,name,direction){const bone=p.bones[name];if(!bone)return;bone.updateWorldMatrix(true,false);const current=bone.getWorldQuaternion(new T.Quaternion()),target=direction.clone().normalize().applyQuaternion(p.group.getWorldQuaternion(new T.Quaternion())),axis=Yaxis.clone().applyQuaternion(current);
const change=new T.Quaternion().setFromUnitVectors(axis,target),parent=bone.parent.getWorldQuaternion(new T.Quaternion()).invert();bone.quaternion.copy(parent.multiply(change).multiply(current));bone.updateWorldMatrix(false,true);}
function poseHuman(p,t,walking,dt=.016){const speedBlend=1-Math.exp(-Math.max(.001,dt)*10);p.blend+=(Number(walking)-p.blend)*speedBlend;const b=p.blend;p.idlePhase=(p.idlePhase||0)+dt;
for(const [name,bone]of Object.entries(p.bones)){bone.quaternion.copy(p.rest[name].q);bone.position.copy(p.rest[name].p);}
p.model.updateMatrixWorld(true);
// Relax shoulders and elbows. The hands and fingers remain continuous skinned meshes.
for(const [side,sign] of [['l',1],['r',-1]]){const phase=t*2*Math.PI+(sign<0?Math.PI:0),swing=Math.sin(phase)*.24*b;
pointBone(p,'upperarm_'+side,new T.Vector3(sign*.11,-1,-swing+.04));pointBone(p,'lowerarm_'+side,new T.Vector3(sign*.075,-1,-swing+.17));
const m=p.measures[side],hip=m.hip.clone(),cycle=((t+(sign<0?.5:0))%1+1)%1;let stride=0,lift=0;if(cycle<.62){stride=.4-(cycle/.62)*.8;}else{const u=(cycle-.62)/.38;stride=-.4+(.5-.5*Math.cos(u*Math.PI))*.8;lift=Math.sin(u*Math.PI)*.095;}stride*=b;lift*=b;
const footX=hip.x+sign*.014,groundOrigin=H(p.group.position.x,p.group.position.z),yaw=p.group.rotation.y,wx=p.group.position.x+footX*Math.cos(yaw)+stride*Math.sin(yaw),wz=p.group.position.z-footX*Math.sin(yaw)+stride*Math.cos(yaw),slope=clamp(H(wx,wz)-groundOrigin,-.12,.12);
const ankle=new T.Vector3(footX,m.ankleHeight+lift+slope+.006,stride+.01),dir=ankle.clone().sub(hip),distance=clamp(dir.length(),.2,m.length1+m.length2-.007);dir.normalize();const along=(m.length1*m.length1-m.length2*m.length2+distance*distance)/(2*distance),bend=Math.sqrt(Math.max(.0001,m.length1*m.length1-along*along));const forward=new T.Vector3(0,0,1).addScaledVector(dir,-dir.z).normalize();const knee=hip.clone().addScaledVector(dir,along).addScaledVector(forward,bend);
pointBone(p,'thigh_'+side,knee.clone().sub(hip));pointBone(p,'calf_'+side,ankle.clone().sub(knee));pointBone(p,'foot_'+side,new T.Vector3(0,-.41,1));
}
const spine=p.bones.spine_03;if(spine){spine.quaternion.multiply(qScratch.setFromAxisAngle(new T.Vector3(0,0,1),Math.sin(t*2*Math.PI)*.018*b+Math.sin(p.idlePhase*1.6)*.006));} const neck=p.bones.neck_01;if(neck){neck.quaternion.multiply(qScratch.setFromAxisAngle(Yaxis,Math.sin(p.idlePhase*.7+p.phase)*.03));}
p.model.updateMatrixWorld(true);
}
function walkingHeight(x,z){let y=H(x,z)+.08;for(const s of walkSurfaces)if(s.stage<=eras[eraIndex].stage&&Math.abs(x-s.x)<s.w&&Math.abs(z-s.z)<s.d)y=Math.max(y,s.y+.01);return y;}


/* village.js */
// The centre houses and work stations are stable; later model layers grow around them.
house(pathX(27)+10,27,6.5,6.7,5.8,0,'workshop');house(pathX(-31)+10,-31,6,7,6.2,0);
sideRows.forEach((z,r)=>{for(const side of [-1,1])for(let j=0;j<2;j++){const x=pathX(z)+side*(13+j*10)+range(-2,2),zz=z-5.1+range(-1,1);if((r===4&&side===1&&j===0)||(r===1&&side===1&&j===0))continue;const stage=j===0?0:(r+j)%4;house(x,zz,range(4.6,7),range(5.1,7.5),rand()>.43?range(5.3,6.8):range(3.2,4.2),stage);}});
house(-27,-64,8.5,12,4.5,0,'chapel');box(M.stone,-27,H(-27,-64)+6,-56.5,1.4,4,1.1);box(M.dark,-27,H(-27,-64)+6.6,-55.9,.7,1.15,.1);box(M.roof,-27,H(-27,-64)+8.12,-56.5,1.9,.22,1.6);box(M.wood,-27,H(-27,-64)+8.9,-56.5,.13,1.2,.13);box(M.wood,-27,H(-27,-64)+9.1,-56.5,.8,.13,.13);
// Wood pile on the main path.
const logPoint={x:pathX(43)-3.3,z:43};for(let row=0;row<2;row++)for(let i=0;i<4-row;i++){const x=logPoint.x-1+i*.34+row*.18,y=H(logPoint.x,43)+.18+row*.28;cyl(M.wood,x,y,43,.17,1.55,0,Math.PI/2);cyl(M.woodLight,x,y,43.79,.145,.024,0,Math.PI/2);}
// Fountain and an open stone trough.
const fx=pathX(5)-4.2,fz=5,fy=H(fx,fz);box(M.stone,fx,fy+.2,fz,5,.4,4);box(M.stone2,fx-1.5,fy+1.8,fz,1.4,3.3,2);box(M.cream,fx-1.5,fy+3.5,fz,1.8,.3,2.3);box(M.stone,fx+.4,fy+.53,fz,2.5,.4,1.8);for(const sign of [-1,1]){box(M.stone2,fx+.4,fy+.91,fz+sign*.8,2.6,.55,.2);box(M.stone2,fx+.4+sign*1.2,fy+.91,fz,.2,.55,1.8)}box(M.water,fx+.4,fy+.77,fz,2.3,.04,1.5);cyl(M.brass,fx-.66,fy+1.68,fz,.075,.6,0,0,Math.PI/2);
const streamDrip=new T.Mesh(new T.CylinderGeometry(.035,.045,.76,5),M.water);streamDrip.position.set(fx-.35,fy+1.23,fz);scene.add(streamDrip);
const twigGeo=new T.CylinderGeometry(.63,1,1,9,1),leafShape=new T.Shape();leafShape.moveTo(0,0);leafShape.quadraticCurveTo(.075,.075,0,.22);leafShape.quadraticCurveTo(-.075,.075,0,0);const leafGeo=new T.ShapeGeometry(leafShape,3);leafGeo.rotateX(-Math.PI/2);const lp=leafGeo.attributes.position;for(let i=0;i<lp.count;i++)lp.setY(i,Math.sin(-lp.getZ(i)/.22*Math.PI)*.025);leafGeo.computeVertexNormals();M.leaf.side=M.leaf2.side=T.DoubleSide;
function branch(ax,ay,az,bx,by,bz,r){const a=new T.Vector3(ax,ay,az),b=new T.Vector3(bx,by,bz),dir=b.clone().sub(a),m=new T.Matrix4().compose(a.add(b).multiplyScalar(.5),new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),dir.clone().normalize()),new T.Vector3(r,dir.length(),r));putMatrix(twigGeo,M.trunk,m,0);}
function tree(x,z,size=1,type='broad',fruit=false){const y=H(x,z),top=4.3*size;branch(x,y-.2,z,x+.11*size,y+top,z-.13*size,.16*size);for(let k=0;k<8;k++){const a=k*2.399+rand()*.4,level=top*(.53+k*.04),extent=(1.5+rand()*.6)*size,tx=x+Math.cos(a)*extent,tz=z+Math.sin(a)*extent,ty=y+level+size*.75;branch(x,y+level,z,tx,ty,tz,.066*size);for(let j=0;j<3;j++){const aa=a+(j-1)*.7,xx=tx+Math.cos(aa)*.68*size,zz=tz+Math.sin(aa)*.68*size,yy=ty+.2*size;branch(tx,ty,tz,xx,yy,zz,.026*size);for(let l=0;l<22;l++){const angle=rand()*6.283,r=Math.sqrt(rand())*.74*size,rx=xx+Math.cos(angle)*r,rz=zz+Math.sin(angle)*r,ry=yy+range(-.38,.45)*size,ss=range(1.1,2.1)*size;put(leafGeo,l%3?M.leaf:M.leaf2,rx,ry,rz,ss,ss,ss,range(-.7,.7),rand()*6.283,range(-.7,.7));}if(fruit&&j===1)put(G.sphere,M.fruit,xx,yy-.24,zz,.095,.11,.095);}}}
for(let row=0;row<3;row++)for(let col=0;col<4;col++)tree(-17-col*5,-18-row*5,.82,'fruit',true);
for(let i=0;i<80;i++){const x=range(-147,145),z=range(-155,112);if(x>-51&&x<54&&z>-71&&z<58)continue;tree(x,z,range(.85,1.95),rand()>.78?'broad':'pine')}
for(const [x,z]of [[-11,36],[-17,16],[12,-6],[-9,-48],[30,44],[42,-16]])tree(x,z,1.2,'broad');
// Low orchard fence and simple hand-built benches.
for(let z=-36;z<-14;z+=2.8){cyl(M.wood,-36,H(-36,z)+.65,z,.07,1.3);box(M.wood,-36,H(-36,z)+.8,z,.1,.1,2.8)}
for(const [x,z]of [[fx+3,7],[-10,26],[10,-16]]){const y=H(x,z);box(M.woodLight,x,y+.62,z,2.2,.17,.6);box(M.wood,x,y+1,z-.26,2.2,.75,.13);for(const xx of [-.8,.8])box(M.wood,x+xx,y+.28,z,.11,.6,.5)}
// Replaceable visual infrastructure layers. Their demo years do not claim arrival dates.
const poleXs=[];for(let z=-49;z<57;z+=26){const x=pathX(z)+4.6,y=H(x,z);cyl(M.wood,x,y+4,z,.13,8,3);box(M.wood,x,y+7.1,z,1.7,.12,.16,3);for(const xx of [-.6,.6])cyl(M.shutter,x+xx,y+7.4,z,.11,.3,3);poleXs.push([x,y+7.6,z]);}
for(let i=1;i<poleXs.length;i++)for(const s of [-.6,.6]){const a=poleXs[i-1],b=poleXs[i],pts=[];for(let n=0;n<=16;n++){const t=n/16;pts.push(new T.Vector3(a[0]*(1-t)+b[0]*t+s,a[1]*(1-t)+b[1]*t-Math.sin(t*Math.PI)*1.1,a[2]*(1-t)+b[2]*t))}const line=new T.Line(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color:'#44463d'}));stages[3].add(line)}
for(let z=-34;z<40;z+=3)box(M.pipe,pathX(z)+2.65,H(pathX(z)+2.65,z)+.15,z,.14,.13,3.05,4);
const lamps=[];for(const [x,z]of [[fx+2.5,5],[pathX(-31)+3,-31],[pathX(28)+3,28]]){const y=H(x,z);cyl(M.iron,x,y+2.8,z,.06,5.6,3);box(M.iron,x+.4,y+5.55,z,.85,.09,.09,3);const lm=mat('#d0b47c',{emissive:'#ffc365',emissiveIntensity:0});const bulb=new T.Mesh(new T.SphereGeometry(.2,8,6),lm);bulb.position.set(x+.75,y+5.45,z);stages[3].add(bulb);const light=new T.PointLight('#ffbd63',0,15,2);light.position.copy(bulb.position);stages[3].add(light);lamps.push({mat:lm,light});}

// Extra modules remain grounded in the actual sloping terrain used by this scene.
for(const [index,b] of buildingRecords.entries()){
 const {x,z,w,d,floor,stage}=b,front=z+d/2;
 if(b.balcony&&index%4===1){
  const sx=x+w/2+1.0,top=floor+2.72,n=16,tread=.28,start=front-1.3;
  for(let i=0;i<n;i++){const zz=start+i*tread,yy=top-(i+1)*.17,low=H(sx,zz)-.35;
   if(yy>low){block(M.stone2,sx,(yy+low)/2,zz,1.25,yy-low,tread+.02,stage);walkSurfaces.push({x:sx,z:zz,w:.62,d:tread/2,y:yy,stage});}
  }
  beam([sx+.65,top+.95,start],[sx+.65,top-n*.17+.95,start+n*tread],.07,.07,M.iron,stage);
  for(let i=0;i<=n;i+=4)beam([sx+.65,top-i*.17,start+i*tread],[sx+.65,top-i*.17+.95,start+i*tread],.035,.035,M.iron,stage);
 }
 if(index%3===0){
  const px=x-w*.35,pz=front+.8,py=H(px,pz);
  // Earthenware jars have continuous lathed profiles, not stacked spheres.
  const points=[[.13,0],[.2,.06],[.28,.24],[.27,.44],[.15,.56],[.14,.63],[.17,.65]].map(v=>new T.Vector2(...v));
  const jar=new T.LatheGeometry(points,18);jar.translate(px,py,pz);collectGeometry(jar,M.roof2,stage);
 }
}
// Fine grass blades at the edge of paths break up the clean geometric boundary.
const grassGeo=new T.BufferGeometry();grassGeo.setAttribute('position',new T.Float32BufferAttribute([-.018,0,0,.018,0,0,.01,.22,.035],3));grassGeo.computeVertexNormals();grassGeo.setAttribute('uv',new T.Float32BufferAttribute([0,0,1,0,.5,1],2));
const grassMat=mat('#7e8861',{side:T.DoubleSide});
for(let k=0;k<950;k++){const zz=range(-67,62),xx=pathX(zz)+(rand()>.5?1:-1)*range(2.02,2.9);if(colliders.some(c=>Math.abs(xx-c.x)<c.w+.8&&Math.abs(zz-c.z)<c.d+.5))continue;const size=range(.5,1.5);put(grassGeo,grassMat,xx,H(xx,zz)+.015,zz,size,size,size,0,range(0,6.28),range(-.3,.3));}

for(const b of batches.values()){const mesh=new T.InstancedMesh(b.geo,b.material,b.matrices.length);b.matrices.forEach((m,i)=>mesh.setMatrixAt(i,m));mesh.instanceMatrix.needsUpdate=true;mesh.castShadow=b.geo!==roofTileGeo&&b.geo!==leafGeo&&b.geo!==grassGeo;mesh.receiveShadow=b.geo!==leafGeo&&b.geo!==grassGeo;mesh.computeBoundingSphere();stages[b.stage].add(mesh)}

// Re-fit ground and every path after the terraced plots have been established.
for(let i=0;i<terrainGeo.attributes.position.count;i++){const p=terrainGeo.attributes.position;p.setY(i,H(p.getX(i),p.getZ(i)));}
terrainGeo.attributes.position.needsUpdate=true;terrainGeo.computeVertexNormals();terrainGeo.computeBoundingSphere();
scene.traverse(o=>{if(!o.userData.groundRibbon)return;const g=o.geometry,p=g.attributes.position;for(let i=0;i<p.count;i++)p.setY(i,H(p.getX(i),p.getZ(i))+(o.userData.groundLift||.08));p.needsUpdate=true;g.computeVertexNormals();g.computeBoundingSphere();});
// Static architecture is merged by material and era, preserving actual openings.
for(const entry of architectureParts.values()){const geometry=BufferGeometryUtils.mergeGeometries(entry.parts,false);if(!geometry)throw new Error("Architecture merge failed");const mesh=new T.Mesh(geometry,entry.material);mesh.castShadow=true;mesh.receiveShadow=true;stages[entry.stage].add(mesh);entry.parts.forEach(g=>g.dispose());}


/* play.js */
let player=makePerson(0);player.position=player.group.position;player.position.set(pathX(40),H(pathX(40),40),40);player.group.rotation.y=Math.PI-modeYaw;
const halo=new T.Mesh(new T.RingGeometry(.46,.61,32),new T.MeshBasicMaterial({color:'#e6c985',transparent:true,opacity:.8,side:T.DoubleSide}));halo.rotation.x=-Math.PI/2;scene.add(halo);
const residents=[];for(let i=0;i<8;i++){const r=makePerson(i);r.base=range(-45,45);r.phase=rand()*Math.PI*2;r.speed=range(.15,.23);r.elapsed=i*.47;residents.push(r)}
const stations=[{id:'logs',label:'Η στοίβα με τα ξύλα',short:'Ξυλεία',icon:'Ⅰ',x:pathX(43)-1.4,z:43}, {id:'workshop',label:'Το εργαστήρι',short:'Εργαστήρι',icon:'Ⅱ',x:pathX(27)+5.7,z:31.7}, {id:'fountain',label:'Η πέτρινη βρύση',short:'Βρύση',icon:'Ⅲ',x:fx+1.7,z:7.4}, {id:'orchard',label:'Το περιβόλι',short:'Περιβόλι',icon:'Ⅳ',x:-16,z:-14}, {id:'house',label:'Η επάνω αυλή',short:'Επάνω αυλή',icon:'Ⅴ',x:pathX(-31)+5.5,z:-26.1}];
stations.forEach(s=>{const b=document.createElement('button');b.className='place-marker';b.setAttribute('aria-label','Περπάτησε προς: '+s.label);const icon=document.createElement('b');icon.textContent=s.icon;const span=document.createElement('span');span.textContent=s.short;b.append(icon,span);b.onclick=()=>navigate(s.x,s.z);$('markers').append(b);s.button=b;});
const mapFocus=new T.Vector3(0,H(0,3),3),desiredPos=new T.Vector3(),desiredTarget=new T.Vector3(),viewDir=new T.Vector3(),raycaster=new T.Raycaster();let follow=false;
function setNight(v){night=v;$('day').classList.toggle('selected',!v);$('night').classList.toggle('selected',v);if(!scene)return;scene.background.set(v?'#243842':'#bfcad0');scene.fog.color.copy(scene.background);hemi.intensity=v?.65:1.75;hemi.color.set(v?'#8bafc9':'#e6eff2');sun.intensity=v?.38:2.7;sun.color.set(v?'#a6b6cb':'#ffe4bf');renderer.toneMappingExposure=v?1:1.05;M.window.emissiveIntensity=v?eras[eraIndex].stage>=3?1.1:.13:0;lamps.forEach(l=>{l.mat.emissiveIntensity=v?2.5:0;l.light.intensity=v?30:0});}
// --- Collision and small-grid A* pathfinding ---------------------------------
const step=2,originX=-54,originZ=-70,NX=57,NZ=68;
function blocked(x,z){if(x<-53||x>57||z<-69||z>63)return true;for(const c of colliders)if(c.stage<=eras[eraIndex].stage&&Math.abs(x-c.x)<c.w+.38&&Math.abs(z-c.z)<c.d+.38)return true;return false;}
function gridPoint(x,z){return [clamp(Math.round((x-originX)/step),0,NX-1),clamp(Math.round((z-originZ)/step),0,NZ-1)]}
function worldPoint(x,z){return [originX+x*step,originZ+z*step]}
function findFree(g){for(let r=0;r<10;r++)for(let a=-r;a<=r;a++)for(let b=-r;b<=r;b++){const x=g[0]+a,z=g[1]+b;if(x<0||z<0||x>=NX||z>=NZ)continue;const w=worldPoint(x,z);if(!blocked(...w))return[x,z]}return null;}
function findPath(tx,tz){const start=findFree(gridPoint(player.position.x,player.position.z)),end=findFree(gridPoint(tx,tz));if(!start||!end)return[];const id=(x,z)=>z*NX+x,S=id(...start),E=id(...end);const score=new Float32Array(NX*NZ).fill(Infinity),prev=new Int32Array(NX*NZ).fill(-1),closed=new Uint8Array(NX*NZ),open=[S];score[S]=0;
let found=false,loops=0;while(open.length&&loops++<4300){let best=0,bestF=Infinity;for(let i=0;i<open.length;i++){const n=open[i],x=n%NX,z=Math.floor(n/NX),f=score[n]+Math.hypot(x-end[0],z-end[1]);if(f<bestF){bestF=f;best=i}}const n=open.splice(best,1)[0];if(n===E){found=true;break}if(closed[n])continue;closed[n]=1;const x=n%NX,z=Math.floor(n/NX);
for(const[a,b]of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const xx=x+a,zz=z+b;if(xx<0||zz<0||xx>=NX||zz>=NZ)continue;const nn=id(xx,zz);if(closed[nn])continue;const wp=worldPoint(xx,zz);if(blocked(...wp))continue;if(a&&b&&(blocked(...worldPoint(x+a,z))||blocked(...worldPoint(x,z+b))))continue;const h=H(...wp),oldH=H(...worldPoint(x,z)),cost=(a&&b?1.414:1)+Math.abs(h-oldH)*.14,ng=score[n]+cost;if(ng<score[nn]){score[nn]=ng;prev[nn]=n;if(!open.includes(nn))open.push(nn)}}}
if(!found)return[];const path=[];let n=E;while(n!==S&&n!==-1){path.push(worldPoint(n%NX,Math.floor(n/NX)));n=prev[n]}return path.reverse();}
function navigate(x,z){if(modal||transitioning)return;autoPath=findPath(x,z);follow=true;if(!autoPath.length){if(Math.hypot(player.position.x-x,player.position.z-z)<4)toast('Είσαι ήδη κοντά. Πάτησε την ενέργεια.');else toast('Δεν βρέθηκε πέρασμα. Δοκίμασε πάνω στο μονοπάτι.')}else if(camMode==='first')toast('Περπατάς προς το σημείο. Με W A S D παίρνεις ξανά τον έλεγχο.');}
function resetPlayer(show=true){releaseInput();player.position.set(pathX(47),H(pathX(47),47),47);mapFocus.set(0,H(0,3),3);follow=false;modeYaw=.72;pitch=.04;player.group.rotation.y=Math.PI-modeYaw;if(show)toast('Επέστρεψες στην αρχή του μονοπατιού.');}
$('home-view').onclick=()=>resetPlayer();
function setCamera(mode){releaseInput();camMode=mode;document.body.classList.toggle('portrait-mode',mode==='portrait');if(mode==='portrait'){modeYaw=-player.group.rotation.y-.22;pitch=0;}canvas.style.cursor=mode==='map'?'grab':'crosshair';document.querySelectorAll('[data-camera]').forEach(b=>b.classList.toggle('selected',b.dataset.camera===mode));$('crosshair').hidden=mode!=='first';if(mode==='map'){mapFocus.set(player.position.x,H(player.position.x,player.position.z),player.position.z);mapRadius=78;follow=true;}player.group.visible=mode!=='first';camera.fov=mode==='first'?72:mode==='portrait'?36:48;camera.updateProjectionMatrix();}
document.querySelectorAll('[data-camera]').forEach(b=>b.onclick=()=>setCamera(b.dataset.camera));
function animatePerson(p,t,walking,dt){poseHuman(p,t,walking,dt);}
function stepPlayer(dt){moving=false;if(modal||transitioning||camMode==='portrait'){animatePerson(player,walkTime,false,dt);return;}const forward=(keys.has('KeyW')||keys.has('ArrowUp')?1:0)-(keys.has('KeyS')||keys.has('ArrowDown')?1:0)-touch.y,right=(keys.has('KeyD')||keys.has('ArrowRight')?1:0)-(keys.has('KeyA')||keys.has('ArrowLeft')?1:0)+touch.x;let dx=0,dz=0;
if(Math.abs(forward)+Math.abs(right)>.05){autoPath=[];dx=right*Math.cos(modeYaw)+forward*Math.sin(modeYaw);dz=right*Math.sin(modeYaw)-forward*Math.cos(modeYaw);follow=true;}
else if(autoPath.length){const p=autoPath[0];dx=p[0]-player.position.x;dz=p[1]-player.position.z;if(Math.hypot(dx,dz)<.27){autoPath.shift();return;}}
let l=Math.hypot(dx,dz);if(l>.025){dx/=Math.max(1,l);dz/=Math.max(1,l);const speed=(keys.has('ShiftLeft')||keys.has('ShiftRight')?2.9:1.45)*dt,px=player.position.x,pz=player.position.z;let nx=px+dx*speed,nz=pz+dz*speed;if(!blocked(nx,nz)){player.position.x=nx;player.position.z=nz;}else if(!blocked(nx,pz)){player.position.x=nx;}else if(!blocked(px,nz)){player.position.z=nz;}else{autoPath=[];}moving=Math.hypot(player.position.x-px,player.position.z-pz)>.0001;if(moving){player.group.rotation.y=Math.atan2(dx,dz);walkTime+=dt*((keys.has('ShiftLeft')||keys.has('ShiftRight'))?2.25:1.125);}}
player.position.y=walkingHeight(player.position.x,player.position.z);animatePerson(player,walkTime,moving,dt);}
// --- Quest interactions and timed crafting -----------------------------------
let craftPhase=0,craftHits=0,craftCooldown=0;
function questTarget(){const e=eras[eraIndex];return QUESTS[e.mission].steps[progress[e.id]||0]}
function updateNear(){let dist=Infinity;nearest=null;for(const s of stations){const d=Math.hypot(player.position.x-s.x,player.position.z-s.z);if(d<4&&d<dist){nearest=s;dist=d}}
$('interaction').hidden=!nearest||!!modal;if(nearest){$('near-name').textContent=nearest.label;const target=questTarget();$('action-label').textContent=target?.[0]===nearest.id?target[2]:'Παρατήρησε το σημείο';}}
function completeStep(){const e=eras[eraIndex];progress[e.id]=Math.min(3,(progress[e.id]||0)+1);const n=progress[e.id];save();refreshUI();soundNote(n===3);toast(n===3?'Η ιστορία ολοκληρώθηκε. Το τετράδιο κρατά την πρόοδό σου.':`Βήμα ${n} / 3 ολοκληρώθηκε. Το επόμενο σημείο φωτίζεται στον χάρτη.`);if(e.mission==='light'&&n>=2)setNight(true);}
const observe={logs:'Ένα σημείο πρώτης ύλης. Όταν το ζητά η αποστολή, εδώ παίρνεις το ξύλο σου.',workshop:'Το εργαστήρι είναι το σημείο κατασκευής. Στην αποστολή της σκάφης έχεις τρεις κινήσεις λαξεύματος.',fountain:'Η βρύση είναι σημείο συνάντησης και συλλογής νερού. Η θέση της εδώ είναι ενδεικτική.',orchard:'Περιβόλι σε ορεινή πλαγιά. Η αποστολή συγκομιδής ενεργοποιείται στη σχετική δοκιμαστική εποχή.',house:'Η επάνω αυλή. Προσωρινό μοντέλο, που αργότερα μπορεί να αντικατασταθεί με τεκμηριωμένο κτίριο.'};
function act(){if(modal||transitioning||!nearest)return;const target=questTarget();if(!target||target[0]!==nearest.id){toast(observe[nearest.id]);return}if(eras[eraIndex].mission==='craft'&&(progress[eras[eraIndex].id]||0)===1)openModal('craft');else completeStep();}
$('act').onclick=act;
function updateCraft(){$('craft-progress').textContent=`${craftHits} / 3 σωστές κινήσεις`;$('craft-feedback').textContent='Πάτησε όταν το σημάδι είναι στη χρυσή περιοχή.';}
function strike(){if(modal!=='craft'||craftCooldown>0)return;craftCooldown=.33;const p=(Math.sin(craftPhase)+1)/2;if(p>=.38&&p<=.63){craftHits++;soundNote();updateCraft();$('craft-feedback').textContent='Σωστή κίνηση. Το ξύλο παίρνει μορφή.';if(craftHits>=3){closePanel('craft');completeStep();}}else{$('craft-feedback').textContent='Λίγο έξω από τη ζώνη. Κράτα τον ρυθμό και ξαναδοκίμασε.';}}
$('chisel').onclick=strike;
// --- Desktop / touch input; no mobile sticks on mouse-only desktops ----------
window.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName))return;if(e.code==='Escape'){if(modal)closePanel(modal);else $('visual-panel').hidden=true;releaseInput();return}if(modal){if(e.code==='Space'&&modal==='craft'){e.preventDefault();if(!e.repeat)strike()}return}if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();keys.add(e.code);if(!e.repeat){if(e.code==='KeyE')act();if(e.code==='KeyP')setCamera(camMode==='portrait'?'third':'portrait');if(e.code==='Digit1')setCamera('map');if(e.code==='Digit2')setCamera('third');if(e.code==='Digit3')setCamera('first');if(e.code==='KeyC')setCamera(['map','third','first'][(['map','third','first'].indexOf(camMode)+1)%3]);if(e.code==='KeyB')setFilm(film==='bw'?'color':'bw');if(e.code==='KeyR')resetPlayer();}});
window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',releaseInput);document.addEventListener('visibilitychange',()=>{if(document.hidden)releaseInput()});canvas.addEventListener('contextmenu',e=>e.preventDefault());
let drag=null;
canvas.addEventListener('pointerdown',e=>{if(modal||transitioning)return;canvas.focus({preventScroll:true});drag={id:e.pointerId,x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,button:e.button};canvas.setPointerCapture(e.pointerId);});
canvas.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;drag.x=e.clientX;drag.y=e.clientY;if(Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)>4){modeYaw-=dx*.006;if(camMode==='map')mapTilt=clamp(mapTilt+dy*.004,.3,1.28);else pitch=clamp(pitch-dy*.004,-.85,.8);}});
canvas.addEventListener('pointerup',e=>{if(!drag||drag.id!==e.pointerId)return;const click=Math.hypot(e.clientX-drag.startX,e.clientY-drag.startY)<5&&drag.button===0;drag=null;if(click&&camMode==='map'){const r=canvas.getBoundingClientRect();raycaster.setFromCamera(new T.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),camera);const hit=raycaster.intersectObject(ground)[0];if(hit)navigate(hit.point.x,hit.point.z)}});
canvas.addEventListener('pointercancel',()=>drag=null);canvas.addEventListener('wheel',e=>{e.preventDefault();if(camMode==='map')mapRadius=clamp(mapRadius+e.deltaY*.035,28,143);else if(camMode==='third')thirdRadius=clamp(thirdRadius+e.deltaY*.012,3,16)},{passive:false});
let joyId=null;const joy=$('joystick');function updateJoy(e){const r=joy.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/(r.width*.38),y=(e.clientY-r.top-r.height/2)/(r.height*.38),l=Math.max(1,Math.hypot(x,y));touch.x=x/l;touch.y=y/l;joy.querySelector('i').style.transform=`translate(${touch.x*24}px,${touch.y*24}px)`;autoPath=[];}
joy.addEventListener('pointerdown',e=>{joyId=e.pointerId;joy.setPointerCapture(e.pointerId);updateJoy(e);e.preventDefault()});joy.addEventListener('pointermove',e=>{if(joyId===e.pointerId)updateJoy(e)});function endJoy(e){if(e.pointerId!==joyId)return;joyId=null;touch.x=touch.y=0;joy.querySelector('i').style.transform=''}joy.addEventListener('pointerup',endJoy);joy.addEventListener('pointercancel',endJoy);
// Focus stays in open dialogs; Escape always closes.
window.addEventListener('keydown',e=>{if(e.code!=='Tab'||!modal)return;const nodes=[...$(modal).querySelectorAll('button:not([disabled]),input:not([hidden]),[tabindex="0"]')];if(!nodes.length)return;const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
// --- Camera, markers and the render loop -------------------------------------
function updateCamera(dt){const p=player.position;let smoothing=1-Math.exp(-dt*7);
if(camMode==='map'){if(follow)mapFocus.lerp(new T.Vector3(p.x,p.y,p.z),1-Math.exp(-dt*1.5));desiredTarget.copy(mapFocus);const d=mapRadius*Math.cos(mapTilt);desiredPos.set(mapFocus.x-Math.sin(modeYaw)*d,mapFocus.y+mapRadius*Math.sin(mapTilt),mapFocus.z+Math.cos(modeYaw)*d);}
else if(camMode==='portrait'){desiredTarget.set(p.x,p.y+1.08,p.z);desiredPos.set(p.x-Math.sin(modeYaw)*4.3,p.y+1.28+pitch,p.z+Math.cos(modeYaw)*4.3);}
else if(camMode==='third'){desiredTarget.set(p.x,p.y+1.5,p.z);desiredPos.set(p.x-Math.sin(modeYaw)*thirdRadius,p.y+2.25+pitch*3,p.z+Math.cos(modeYaw)*thirdRadius);const direction=desiredPos.clone().sub(desiredTarget);for(let t=.16;t<=1;t+=.07){const q=desiredTarget.clone().addScaledVector(direction,t);if(colliders.some(c=>c.stage<=eras[eraIndex].stage&&Math.abs(q.x-c.x)<c.w&&Math.abs(q.z-c.z)<c.d&&q.y<c.top)){desiredPos.copy(desiredTarget).addScaledVector(direction,Math.max(.14,t-.1));break}}}
else{desiredPos.set(p.x,p.y+1.7+(moving?Math.sin(walkTime*12)*.025:0),p.z);desiredTarget.copy(desiredPos).add(new T.Vector3(Math.sin(modeYaw)*Math.cos(pitch),Math.sin(pitch),-Math.cos(modeYaw)*Math.cos(pitch)));smoothing=1;}
if(camMode==='portrait')desiredPos.y=Math.max(desiredPos.y,H(desiredPos.x,desiredPos.z)+1.2);
if(camMode!=='first'&&camMode!=='portrait')desiredPos.y=Math.max(desiredPos.y,H(desiredPos.x,desiredPos.z)+1.7);camera.position.lerp(desiredPos,smoothing);camera.lookAt(desiredTarget);halo.position.set(p.x,p.y+.03,p.z);halo.visible=camMode==='map';}
const projected=new T.Vector3();
function updateMarkers(){const w=canvas.clientWidth,h=canvas.clientHeight;stations.forEach(s=>{projected.set(s.x,H(s.x,s.z)+3,s.z).project(camera);const visible=camMode!=='portrait'&&projected.z>-1&&projected.z<1&&Math.abs(projected.x)<1.07&&Math.abs(projected.y)<1.08&&(camMode==='map'||Math.hypot(player.position.x-s.x,player.position.z-s.z)<44);s.button.hidden=!visible;if(visible){s.button.style.left=(projected.x*.5+.5)*w+'px';s.button.style.top=(-projected.y*.5+.5)*h+'px';}});$('position').textContent=nearest?nearest.short.toUpperCase():'ΣΤΟ ΜΟΝΟΠΑΤΙ';}
function resize(){const w=innerWidth,h=innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}window.addEventListener('resize',resize);resize();
// Touch starts with a folded notebook so both the village and controls remain usable.
if(coarse||innerWidth<760){$('journal').classList.add('collapsed');$('journal-toggle').textContent='+';}
worldReady=true;refreshUI();setCamera('third');thirdRadius=5.4;updateCamera(1);canvas.style.cursor='grab';
let performanceScale=false;
function tick(ms){const dt=Math.min((ms-(lastTime||ms))/1000,.06);lastTime=ms;frame++;stepPlayer(dt);if(modal==='craft'){craftPhase+=dt*(2.1+craftHits*.2);craftCooldown=Math.max(0,craftCooldown-dt);$('needle').style.left=((Math.sin(craftPhase)+1)/2*99)+'%';}
residents.forEach((r,i)=>{if(!r.group.visible)return;r.elapsed+=dt;const phase=r.elapsed*r.speed+r.phase,zz=r.base+Math.sin(phase)*5.5,xx=pathX(zz)+(i%2?1.45:-1.45),velocity=Math.cos(phase)*5.5*r.speed;r.group.position.set(xx,walkingHeight(xx,zz),zz);const heading=Math.atan2(pathX(zz+.05)-pathX(zz),.05)+(velocity>0?0:Math.PI); const delta=Math.atan2(Math.sin(heading-r.group.rotation.y),Math.cos(heading-r.group.rotation.y));r.group.rotation.y+=delta*Math.min(1,dt*3);r.walkPhase=(r.walkPhase||0)+Math.abs(velocity)*dt/1.289;animatePerson(r,r.walkPhase+i,Math.abs(velocity)>.18,dt);});
updateCamera(dt);if(frame%4===0){updateNear();updateMarkers()}renderer.render(scene,camera);if(frame===3)$('loading').hidden=true;requestAnimationFrame(tick);}
requestAnimationFrame(tick);
// Public, read-only diagnostics help test this prototype without guessing from a screenshot.
window.chronicle={getState:()=>({version:'0.4.0',era:structuredClone(eras[eraIndex]),progress:progress[eras[eraIndex].id]||0,camera:camMode,position:{x:player.position.x,y:player.position.y,z:player.position.z},night,film,nearest:nearest?.id||null,pathLength:autoPath.length,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles}),getStations:()=>stations.map(({id,x,z})=>({id,x,z})),getEraData:()=>structuredClone(eras),getVisualStats:()=>({humanModels:2,rigBones:53,residents:residents.length,buildings:buildingRecords.length}),setCamera,inspectWoman:()=>{const m=player.group;const woman=residents.find(r=>r.variant===1);m.position.copy(woman.group.position);setCamera('portrait');},_test:{player,residents,scene,camera,renderer,stations,buildingRecords,H,blocked,stepPlayer,setCamera,act,changeEra,navigate,pointBone,poseHuman,updateCamera,updateMarkers,updateNear,setNight}};
// A delayed welcome hint rather than an obstructive introductory screen.
setTimeout(()=>toast('Πάτησε ένα σημάδι για να περπατήσεις προς αυτό. Η αποστολή σου είναι στο τετράδιο.'),1000);

let avatarVariant=0;
$('avatar-next').onclick=()=>{const pos=player.position.clone(),rot=player.group.rotation.y;const old=player;avatarVariant=(avatarVariant+1)%6;player=makePerson(avatarVariant);player.position=player.group.position;player.position.copy(pos);player.group.rotation.y=rot;scene.remove(old.group);old.model.traverse(o=>{if(o.isMesh){(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose());}});chronicle._test.player=player;setCamera('portrait');$('avatar-name').textContent=avatarVariant%2?'Κάτοικος · Γυναίκα':'Κάτοικος · Άνδρας';};
$('portrait-close').onclick=()=>{modeYaw=Math.PI-player.group.rotation.y;setCamera('third');};
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();releaseInput();$('loading').hidden=false;$('loading').innerHTML='<h2>Η προβολή 3D διακόπηκε.</h2><p>Κάνε ανανέωση για επαναφορά. Η αποθηκευμένη πρόοδος διατηρείται.</p>';});

} catch(err){console.error(err);const p=document.getElementById('loading');p.hidden=false;p.replaceChildren();const h=document.createElement('h2');h.textContent='Δεν άνοιξε η προβολή 3D';const t=document.createElement('p');t.textContent=err.message+' · Κάνε ανανέωση της σελίδας.';p.append(h,t);}})();