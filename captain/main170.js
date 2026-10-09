import { createChaosChapter } from './chaos170.js?v=171';
import { installSoundPanel } from './sound-panel150.js?v=150';
import * as THREE from 'three';
import { createWorld } from './world.js?v=140';
import { createShip } from './ship170.js?v=171';
import { createPassengers } from './passengers170.js?v=171';
import { createAudio } from './audio170.js?v=171';
import { createHelm } from './helm140.js?v=140';
import { createDialogue } from './dialogue150.js?v=150';
import { newVoyage, advance, useAction, voyageScore, clamp, KNOTS } from './simulation.js?v=140';

const $=id=>document.getElementById(id);
const mobile=matchMedia('(pointer:coarse)').matches;
const readStore=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const saveStore=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
let mildMotion=readStore('lc-motion',matchMedia('(prefers-reduced-motion:reduce)').matches);
let soundEnabled=readStore('lc-sound',true), quality=readStore('lc-quality',0), difficulty=0;
let state=newVoyage(),playing=false,paused=false,ready=false,cameraMode=1,people=null;
let renderer,world,ship,fx,renderTarget,scene,camera,audio,helm,dialogue,chapter;
let renderedFrames=0,sceneDrawCalls=0,sceneTriangles=0;
let lastFrame=performance.now(),previewTime=0,toastTime=0,radioTime=18,lastHud=0,lastHelp=-20,lastStrike=0;
let drag=null,lookYaw=0,lookPitch=0,targetLookYaw=0,targetLookPitch=0,lastLook=0,accum=0;
const keys=new Set(),input={turn:0,throttle:.55},touchTurn={left:false,right:false};
const cameraPosition=new THREE.Vector3(),cameraTarget=new THREE.Vector3(),offset=new THREE.Vector3();
const up=new THREE.Vector3(0,1,0),projection=new THREE.Vector3(),shipPosition=new THREE.Vector3();
const radar=$('radar').getContext('2d');
const cameraLabels=['ΕΞΩ','ΓΕΦΥΡΑ','ΚΑΤΑΣΤΡΩΜΑ'];

function fatal(message){
  playing=false;paused=true;
  $('errorText').textContent=message;$('errorScreen').classList.remove('hidden');
  console.error(message);
}
function toast(message){$('toast').textContent=message;$('toast').classList.remove('hidden');toastTime=3.8;}
function radioMessage(message,speak=false,urgent=false){
  $('radioText').textContent=message;$('radio').style.opacity='1';radioTime=9;
  // Radio narration is visual only; character clips are scheduled separately.
}
function updateSettings(){
  $('introSound').textContent=`Ήχος: ${soundEnabled?'ΝΑΙ':'ΟΧΙ'}`;
  $('sound').style.opacity=soundEnabled?'1':'.45';$('sound').setAttribute('aria-label',soundEnabled?'Σίγαση ήχου':'Ενεργοποίηση ήχου');$('sound').querySelector('span').textContent=soundEnabled?'ΗΧΟΣ ✓':'ΣΙΓΑΣΗ';
  $('introMotion').innerHTML=`Κάμερα <b>${mildMotion?'ΗΠΙΑ':'ΚΙΝΗΜΑΤΟΓΡΑΦΙΚΗ'}</b> <span>↗</span>`;
  $('motionSetting').textContent=`Κάμερα: ${mildMotion?'ήπια':'κινηματογραφική'}`;
  $('qualitySetting').textContent=`Γραφικά: ${['αυτόματα','ελαφριά','λεπτομερή'][quality]}`;
  $('difficulty').innerHTML=`Φουρτούνα <b>${difficulty?'ΑΓΡΙΑ':'ΚΑΝΟΝΙΚΗ'}</b> <span>↗</span>`;
}
function pixelRatio(){return quality===1?.8:quality===2?Math.min(devicePixelRatio,1.7):mobile?Math.min(devicePixelRatio,1.05):Math.min(devicePixelRatio,1.5)}
function resize(){
  if(!renderer)return;
  const width=innerWidth,height=innerHeight;
  renderer.setPixelRatio(pixelRatio());renderer.setSize(width,height,false);
  camera.aspect=width/height;camera.updateProjectionMatrix();
  const size=renderer.getDrawingBufferSize(new THREE.Vector2());renderTarget.setSize(size.x,size.y);
  fx.material.uniforms.uResolution.value.copy(size);
}
function makePost(){
  const rt=new THREE.WebGLRenderTarget(1,1,{minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,type:renderer.extensions.has('EXT_color_buffer_float')?THREE.HalfFloatType:THREE.UnsignedByteType,depthBuffer:true,stencilBuffer:false});
  rt.samples=mobile?0:2;
  const postScene=new THREE.Scene(),postCamera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
  const material=new THREE.ShaderMaterial({depthTest:false,depthWrite:false,toneMapped:true,
    uniforms:{tScene:{value:rt.texture},uTime:{value:0},uIntox:{value:0},uImpact:{value:0},uResolution:{value:new THREE.Vector2(1,1)}},
    vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`,
    fragmentShader:`precision highp float;varying vec2 vUv;uniform sampler2D tScene;uniform float uTime,uIntox,uImpact;uniform vec2 uResolution;
      void main(){
        vec2 p=vUv-.5;float edge=dot(p,p);float d=uIntox*uIntox;
        vec2 uv=vUv+p*edge*d*.055;
        uv.x+=sin(vUv.y*9.+uTime*1.4)*.0045*d;
        uv.y+=sin(vUv.x*7.+uTime*.8)*.0025*d;
        uv=clamp(uv,vec2(.002),vec2(.998));
        vec2 chroma=p*(.013*d+.002*uImpact);
        vec3 color=texture2D(tScene,uv).rgb;
        vec3 split=vec3(texture2D(tScene,uv+chroma).r,color.g,texture2D(tScene,uv-chroma).b);
        vec3 ghost=texture2D(tScene,clamp(uv+vec2(.017*d*sin(uTime*.65),.009*d),.001,.999)).rgb;
        color=mix(split,ghost,d*.24);
        float vignette=1.-smoothstep(.08,.43,edge)*(.2+d*.24);
        color*=vignette;color+=vec3(.028,.012,.004)*uImpact;
        gl_FragColor=vec4(color,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`});
  const quad=new THREE.Mesh(new THREE.PlaneGeometry(2,2),material);postScene.add(quad);
  return {rt,material,scene:postScene,camera:postCamera};
}
function gameplayEvent(event){
  if(event.type==='collision'){
    audio?.collision();dialogue?.impact(state,event.obstacle);
    radioMessage(event.obstacle.type==='ice'?'Πρόσκρουση σε πάγο! Ζημιά στο κύτος. Κράτει και όπισθεν!':'Πρόσκρουση! Κράτει τις μηχανές και βάλε όπισθεν!',true,true);
    if(state.panic>68&&people){people.jumpOne();}
    if(navigator.vibrate)navigator.vibrate([75,45,110]);
  }
  if(event.type==='nearMiss')toast('Οριακή αποφυγή · +70 βαθμοί');
  if(event.type==='win'||event.type==='sink')queueMicrotask(()=>finish(event.type==='win'));
}
function passengerEvent(event){
  if(event.type==='jump'){
    dialogue?.overboard(state,event.id);
    state.panic=clamp(state.panic+2,0,100);
    if(state.time-lastHelp>2.5){radioMessage('Βοήθεια! Άνθρωπος στη θάλασσα! Μείωσε ταχύτητα και ρίξε σωσίβια.',true,true);lastHelp=state.time;}
  }
  if(event.type==='rescue'){state.panic=clamp(state.panic-3,0,100);}
  if(event.type==='lost')radioMessage('Χάσαμε οπτική επαφή. Το άτομο παραμένει με σωσίβιο εκτός εμβέλειας.');
}
function startGame(){
  if(!ready)return;
  audio.setEnabled(soundEnabled);const audioReady=audio.start();
  state=newVoyage(difficulty);input.throttle=.55;input.turn=0;keys.clear();touchTurn.left=touchTurn.right=false;
  helm?.reset();dialogue?.reset();chapter?.reset();setThrottle(.55);
  people.reset();ship.group.position.set(0,0,0);ship.group.rotation.set(0,0,0);ship.group.updateMatrixWorld(true);
  playing=true;paused=false;cameraMode=1;lookYaw=lookPitch=targetLookYaw=targetLookPitch=0;
  $('intro').classList.add('hidden');$('hud').classList.remove('hidden');$('pauseScreen').classList.add('hidden');$('resultScreen').classList.add('hidden');
  $('cameraName').textContent=cameraLabels[cameraMode];$('throttle').value=55;syncCameraControls();
  const briefing='Λιμάνι: 3,8 km βόρεια. Πρόσεχε το ραντάρ.';
  radioMessage(briefing);
  const thisVoyage=state;Promise.resolve(audioReady).then(()=>audio.loadVoices()).then(()=>{if(state===thisVoyage&&playing&&!paused&&soundEnabled)dialogue.say('calm',state,undefined,1);}).catch(()=>{});
  toast(mobile?'Πιάσε το ίδιο το τιμόνι και γύρισέ το κυκλικά. Μοχλός: πάνω / μέση / κάτω.':'A / D: τιμόνι · W / S: μηχανές · C: κάμερα · E: ουίσκι');
  lastFrame=performance.now();lastHelp=-20;lastHud=-1;lastLook=0;lastStrike=world.lightningStrike;accum=0;radioTime=5;
  updateCamera(1,true);
}
function finish(won){
  if(!playing)return;
  playing=false;paused=false;state.ended=true;state.won=won;helm?.reset();dialogue?.reset();
  const stats=people.getStats(),safe=stats.onboard+stats.rescued;
  state.score=voyageScore(state,stats);
  const best=Math.max(readStore('lc-best',0),state.score);saveStore('lc-best',best);
  $('resultKicker').textContent=won?'MS AURORA / ΑΣΦΑΛΕΣ ΛΙΜΑΝΙ':'MS AURORA / ΚΙΝΔΥΝΟΣ';
  $('resultTitle').textContent=won?'Φτάσαμε, καπετάνιε.':'Το κύτος δεν άντεξε.';
  $('resultDescription').textContent=won?`Έφτασες στο λιμάνι με ${safe} ανθρώπους ασφαλείς και ${Math.ceil(state.hull)}% αντοχή στο πλοίο. ${stats.rescued?`Περισυνέλεξες ${stats.rescued} από τη θάλασσα.`:''}`:`Η διαδρομή σταμάτησε στο ${Math.round(state.progress*100)}%. Το πλήρωμα καλεί βοήθεια. Στην επόμενη προσπάθεια μείωσε νωρίτερα ταχύτητα πριν από τα εμπόδια.`;
  $('resultScore').textContent=state.score.toLocaleString('el-GR');$('resultSafe').textContent=`${safe}/24`;
  $('resultDrinks').textContent=state.drinks;$('resultTime').textContent=formatTime(state.time);
  $('bestScore').textContent=`Καλύτερη επίδοση: ${best.toLocaleString('el-GR')} · Συγκρούσεις: ${state.collisions} · Εκτός εμβέλειας: ${stats.lost}`;
  $('resultScreen').classList.remove('hidden');$('warning').classList.add('hidden');
  audio?.speak(won?'Φτάσαμε! Το λιμάνι είναι ασφαλές.':'Mayday. Χρειαζόμαστε βοήθεια.',true);
}
function formatTime(t){return `${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,'0')}`;}
function setPaused(value){
  if(!playing)return;
  paused=value;chapter?.resetInput();keys.clear();touchTurn.left=touchTurn.right=false;helm?.reset();dialogue?.reset();drag=null;input.turn=0;
  $('pauseScreen').classList.toggle('hidden',!paused);
  if(!paused){lastFrame=performance.now();audio.start();}else audio.stop();
}
function setThrottle(v){input.throttle=clamp(Number.isFinite(v)?v:0,-.35,1);$('throttle').value=Math.round(input.throttle*100);helm?.syncLever(input.throttle);}
function syncCameraControls(){$('hud').classList.toggle('in-bridge',cameraMode===1);helm?.reset();drag=null;input.turn=0;}
function cycleCamera(){if(chapter?.foot)return;cameraMode=(cameraMode+1)%3;targetLookYaw=targetLookPitch=lookYaw=lookPitch=0;$('cameraName').textContent=cameraLabels[cameraMode];toast(['Εξωτερική κάμερα · σύρε για περιστροφή','Γέφυρα · το ποτήρι και το τιμόνι είναι μπροστά σου','Κατάστρωμα · οι επιβάτες είναι δίπλα σου'][cameraMode]);syncCameraControls();updateCamera(1,true);}
function action(name){
  if(!playing||paused)return;
  if(name==='drink'&&chapter?.enabled){chapter.requestDrink();return;}
  const result=useAction(state,name);
  if(!result.ok){if(result.message)toast(result.message);return;}
  if(name==='drink'){dialogue?.drink(state);}
  if(name==='horn'){audio.horn();toast('Κόρνα ομίχλης · κρατήστε τις θέσεις σας');}
  if(name==='announce'){dialogue?.calm(state);toast('Το πλήρωμα καθησυχάζει τους επιβάτες');}
  if(name==='rescue'){
    const rescued=people.rescueNear(ship.group.position,110);
    if(rescued){state.rescueCooldown=3;state.panic=clamp(state.panic-7,0,100);toast(`Περισυλλογή: ${rescued} ${rescued===1?'άτομο':'άτομα'} ασφαλή στο πλοίο!`);dialogue?.rescued(state);}
    else toast('Πλησίασε τα πορτοκαλί σημεία του ραντάρ σε απόσταση έως 110 m.');
  }
}
function updateCamera(dt,snap=false){
  if(playing&&chapter?.cameraUpdate(dt))return;
  const weight=snap?1:1-Math.exp(-dt*4.2);
  lookYaw=THREE.MathUtils.lerp(lookYaw,targetLookYaw,weight);lookPitch=THREE.MathUtils.lerp(lookPitch,targetLookPitch,weight);
  const intox=(state.intox/100)*(mildMotion?.22:1),time=playing?state.time:previewTime;
  const sway=Math.sin(time*1.17)*intox*.032+Math.sin(time*.67+1)*intox*intox*.023;
  if(!playing&&!state.ended){
    const angle=.035*Math.sin(previewTime*.06);
    const portrait=innerHeight>innerWidth;
    offset.set(portrait?-152:-139,portrait?65:57,portrait?185:158).applyAxisAngle(up,angle);
    cameraPosition.copy(ship.group.position).add(offset);
    cameraTarget.copy(ship.group.position).add(new THREE.Vector3(portrait?3:-29,portrait?15:7,portrait?9:-31));
    camera.up.set(0,1,0);camera.fov=portrait?54:49;
  } else if(cameraMode===0){
    const angle=state.heading+lookYaw;
    offset.set(57,48+lookPitch*43,-133).applyAxisAngle(up,angle);
    cameraPosition.copy(ship.group.position).add(offset);
    offset.set(0,10,43).applyAxisAngle(up,state.heading);cameraTarget.copy(ship.group.position).add(offset);
    camera.up.set(sway*.5,1,sway*.2);camera.fov=innerHeight>innerWidth?65:58;
  } else {
    const local=cameraMode===1?bridgeFraming():new THREE.Vector3(10.22,11.73,-22);
    offset.copy(local);offset.x+=Math.sin(time*1.24)*intox*.06;offset.y+=Math.sin(time*1.93)*intox*.045;
    cameraPosition.copy(offset);ship.group.localToWorld(cameraPosition);
    let baseYaw=cameraMode===2?.16:0;
    const direction=new THREE.Vector3(0,0,1).applyEuler(new THREE.Euler(lookPitch+(cameraMode===1?.028:0),lookYaw+baseYaw,0,'YXZ')).applyQuaternion(ship.group.quaternion);
    cameraTarget.copy(cameraPosition).addScaledVector(direction,100);
    camera.up.copy(up).applyQuaternion(ship.group.quaternion);camera.fov=(cameraMode===1?73:68)+intox*Math.sin(time*.8)*2;
  }
  if(cameraMode!==0&&(playing||state.ended))camera.position.copy(cameraPosition);
  else camera.position.lerp(cameraPosition,snap?1:1-Math.exp(-dt*3.8));
  camera.lookAt(cameraTarget);camera.rotateZ(sway);camera.updateProjectionMatrix();camera.updateMatrixWorld();
}

function bridgeFraming(){
 const w=innerWidth,h=innerHeight,focal=h*.5/Math.tan(THREE.MathUtils.degToRad(73*.5));
 const radius=Math.min(w*.23,h*.165,150),distance=focal*.55/radius;
 const targetX=w*(w<h?.43:.47),targetY=Math.min(h*.72,h-91-radius);
 const center=ship.wheel.position.clone().add(ship.bridgeGroup.position);
 return center.add(new THREE.Vector3((targetX-w*.5)*distance/focal,(targetY-h*.5)*distance/focal,-distance));
}
function wheelAnchor(){
 if(!ship?.wheel||!camera)return null;
 const c=ship.wheel.getWorldPosition(new THREE.Vector3()).project(camera),points=[];
 const x=(c.x*.5+.5)*innerWidth,y=(-c.y*.5+.5)*innerHeight;
 for(let i=0;i<24;i++){const a=i*Math.PI/12,p=new THREE.Vector3(Math.cos(a)*.55,Math.sin(a)*.55,0);ship.wheel.localToWorld(p);p.project(camera);points.push({x:(p.x*.5+.5)*innerWidth,y:(-.5*p.y+.5)*innerHeight});}
 const minX=Math.min(...points.map(p=>p.x)),maxX=Math.max(...points.map(p=>p.x)),minY=Math.min(...points.map(p=>p.y)),maxY=Math.max(...points.map(p=>p.y));
 return {x,y,minX,maxX,minY,maxY,points,radius:Math.max(maxX-minX,maxY-minY)/2,visible:c.z>0&&c.z<1&&x>0&&x<innerWidth&&y>40&&y<innerHeight-60};
}
const wheelRay=new THREE.Raycaster();
function pickWheel(event){
 if(cameraMode!==1)return null;const a=wheelAnchor();if(!a?.visible)return null;
 wheelRay.setFromCamera(new THREE.Vector2(event.clientX/innerWidth*2-1,1-event.clientY/innerHeight*2),camera);
 if(wheelRay.intersectObject(ship.wheel,true).length)return a;
 // The spaces between the spokes also belong to the wheel silhouette.
 let inside=false;const pts=a.points;
 for(let i=0,j=pts.length-1;i<pts.length;j=i++){
  const p=pts[i],q=pts[j];if((p.y>event.clientY)!==(q.y>event.clientY)&&event.clientX<(q.x-p.x)*(event.clientY-p.y)/(q.y-p.y)+p.x)inside=!inside;
 }
 return inside?a:null;
}
function drawRadar(stats){
  if(!radar)return;
  const w=320,c=160,r=136,range=650;
  radar.clearRect(0,0,w,w);radar.save();radar.translate(c,c);
  radar.fillStyle='rgba(5,25,34,.40)';radar.beginPath();radar.arc(0,0,r,0,Math.PI*2);radar.fill();
  radar.strokeStyle='rgba(120,180,191,.22)';radar.lineWidth=1;
  for(const a of [.33,.66,1]){radar.beginPath();radar.arc(0,0,r*a,0,Math.PI*2);radar.stroke();}
  radar.beginPath();radar.moveTo(-r,0);radar.lineTo(r,0);radar.moveTo(0,-r);radar.lineTo(0,r);radar.stroke();
  radar.strokeStyle='rgba(114,219,210,.24)';radar.setLineDash([3,8]);radar.beginPath();radar.moveTo(0,0);radar.lineTo(0,-r);radar.stroke();radar.setLineDash([]);
  const fx=Math.sin(state.heading),fz=Math.cos(state.heading);
  const plot=(x,z)=>{const dx=x-state.x,dz=z-state.z;return {x:-(dx*fz-dz*fx)*r/range,y:-(dx*fx+dz*fz)*r/range}};
  radar.save();radar.beginPath();radar.arc(0,0,r,0,Math.PI*2);radar.clip();
  const angle=state.time*.9;
  const gradient=radar.createConicGradient?radar.createConicGradient(angle,0,0):null;
  if(gradient){gradient.addColorStop(0,'rgba(132,229,198,0)');gradient.addColorStop(.86,'rgba(132,229,198,0)');gradient.addColorStop(1,'rgba(132,229,198,.12)');radar.fillStyle=gradient;radar.fillRect(-r,-r,r*2,r*2);}
  for(const o of world.obstacles){
    const p=plot(o.x,o.z),size=Math.max(3,o.radius*r/range);
    if(Math.hypot(p.x,p.y)>r+size)continue;
    radar.fillStyle=o.type==='ice'?'rgba(161,221,235,.52)':'rgba(240,169,101,.56)';
    radar.strokeStyle=o.type==='ice'?'#bce5e7':'#f1b775';radar.lineWidth=1;
    radar.beginPath();radar.arc(p.x,p.y,size,0,Math.PI*2);radar.fill();radar.stroke();
  }
  for(const p0 of stats.inWaterPositions||[]){const p=plot(p0.x,p0.z);radar.fillStyle='#ff7746';radar.beginPath();radar.arc(p.x,p.y,4+Math.sin(state.time*6),0,Math.PI*2);radar.fill();}
  const port=plot(world.safeHarbor.x,world.safeHarbor.z);
  radar.strokeStyle='#8be7ad';radar.lineWidth=2;radar.beginPath();radar.arc(port.x,port.y,world.safeHarbor.radius*r/range,0,Math.PI*2);radar.stroke();
  if(Math.hypot(port.x,port.y)>r-14){const a=Math.atan2(port.x,-port.y);radar.save();radar.rotate(a);radar.fillStyle='#97e5b7';radar.beginPath();radar.moveTo(0,-r+7);radar.lineTo(-4,-r+17);radar.lineTo(4,-r+17);radar.closePath();radar.fill();radar.restore();}
  radar.fillStyle='#f2eee1';radar.strokeStyle='#11252f';radar.lineWidth=2;radar.beginPath();radar.moveTo(0,-14);radar.lineTo(-4,-5);radar.lineTo(-4,11);radar.lineTo(4,11);radar.lineTo(4,-5);radar.closePath();radar.fill();radar.stroke();
  radar.restore();radar.font='10px sans-serif';radar.fillStyle='#a5ced5';radar.textAlign='center';radar.fillText('ΠΛΩΡΗ',0,-143);radar.restore();
}
function updateHud(){
  const stats=people.getStats();
  $('speed').textContent=(Math.abs(state.speed)*KNOTS).toFixed(1);
  $('heading').textContent=String((Math.round(-state.heading*180/Math.PI)%360+360)%360).padStart(3,'0')+'°';
  $('distance').innerHTML=state.distance>1000?(state.distance/1000).toFixed(2)+' <small>km</small>':Math.round(state.distance)+' <small>m</small>';
  $('routeProgress').style.width=(state.progress*100)+'%';
  $('hullValue').textContent=Math.ceil(state.hull)+'%';$('hullBar').style.width=state.hull+'%';$('hullBar').style.background=state.hull<35?'var(--red)':'var(--cyan)';
  $('drinkValue').textContent=Math.round(state.intox)+'%';$('drinkBar').style.width=state.intox+'%';
  $('panicValue').textContent=Math.round(state.panic)+'%';$('panicBar').style.width=state.panic+'%';
  $('onboard').textContent=stats.onboard+stats.rescued;$('overboard').textContent=stats.inWater;$('overboard').style.color=stats.inWater?'var(--amber)':'';
  $('rudderLabel').textContent=Math.round(state.rudder*35)+'°';$('helmDial').style.transform=`rotate(${state.rudder*105}deg)`;
  $('throttleLabel').textContent=Math.round(input.throttle*100)+'%';
  $('engineState').textContent=input.throttle<-.02?'ΟΠΙΣΘΕΝ':input.throttle<.02?'ΚΡΑΤΕΙ':input.throttle>.78?'ΠΡΟΣΩ ΟΛΟΤΑΧΩΣ':'ΠΡΟΣΩ';
  $('weather').textContent=`ΘΑΛΑΣΣΑ ${difficulty?8:6} · ${state.distance<520?'ΠΡΟΣΤΑΤΕΥΜΕΝΑ ΝΕΡΑ':'ΔΥΤΙΚΟΣ ΑΝΕΜΟΣ'}`;
  $('drinkCount').textContent=state.drinkCooldown>0?`${Math.ceil(state.drinkCooldown)} sec`:`E · ${state.drinks} ποτά`;
  $('announceTime').textContent=state.announceCooldown>0?`${Math.ceil(state.announceCooldown)} sec`:'Q · ηρεμία';
  $('rescueHint').textContent=stats.inWater?`${stats.inWater} άτομα στο νερό`:'R · έως 6 knots';
  $('rescue').classList.toggle('ready',stats.inWater>0&&Math.abs(state.speed)*KNOTS<=6);
  $('drink').style.opacity=state.drinkCooldown>0?'.65':'1';$('announce').style.opacity=state.announceCooldown>0?'.55':'1';
  const offCourse=Math.abs(state.x)>650||Math.cos(state.heading)<-.15;
  $('mission').textContent=state.distance<400?'Είσοδος λιμανιού · μείωσε κάτω από 12 knots':offCourse?'Στρίψε προς το πράσινο βέλος του ραντάρ':'Κράτα βόρεια πορεία · απόφυγε τα εμπόδια';
  if(state.nearest){
    $('warning').classList.remove('hidden');$('warningTitle').textContent=state.nearest.type==='ice'?'ΠΑΓΟΒΟΥΝΟ ΣΤΗΝ ΠΛΩΡΗ':'ΒΡΑΧΙΑ ΣΤΗΝ ΠΛΩΡΗ';
    $('warningDetail').textContent=`${Math.max(0,Math.round(state.nearest.clearance))} m · μείωσε ταχύτητα και στρίψε`;
  }else if(stats.inWater){$('warning').classList.remove('hidden');$('warningTitle').textContent='ΑΝΘΡΩΠΟΣ ΣΤΗ ΘΑΛΑΣΣΑ';$('warningDetail').textContent='Έως 6 knots · πλησίασε και πάτησε ΣΩΣΙΒΙΑ';}
  else $('warning').classList.add('hidden');
  drawRadar(stats);
  const marker=$('targetMarker');projection.set(world.safeHarbor.x,24,world.safeHarbor.z).project(camera);
  if(projection.z>0&&projection.z<1&&Math.abs(projection.x)<.8&&Math.abs(projection.y)<.65&&state.distance>240){marker.style.display='flex';marker.style.left=((projection.x*.5+.5)*100)+'%';marker.style.top=((-projection.y*.5+.5)*100)+'%';}
  else marker.style.display='none';
}
function setupControls(){
  $('start').addEventListener('click',()=>{chapter?.setEnabled(true);startGame();});$('classicVoyage').addEventListener('click',()=>{chapter?.setEnabled(false);startGame();});$('playAgain').addEventListener('click',startGame);$('restart').addEventListener('click',startGame);
  $('pause').addEventListener('click',()=>setPaused(true));$('resume').addEventListener('click',()=>setPaused(false));$('camera').addEventListener('click',cycleCamera);
  for(const name of ['drink','horn','announce','rescue'])$(name).addEventListener('click',()=>action(name));
  $('throttle').addEventListener('input',e=>setThrottle(Number(e.target.value)/100));
  $('throttleDown').addEventListener('click',()=>setThrottle(input.throttle-.15));$('throttleUp').addEventListener('click',()=>setThrottle(input.throttle+.15));
  $('engineAhead').addEventListener('click',()=>setThrottle(Math.max(.35,input.throttle+.25)));
  $('engineReverse').addEventListener('click',()=>setThrottle(Math.min(-.18,input.throttle-.2)));
  $('brake').addEventListener('click',()=>{setThrottle(0);toast('Μηχανές κράτει · το πλοίο επιβραδύνει σταδιακά');});
  const toggleAudio=()=>{soundEnabled=!soundEnabled;saveStore('lc-sound',soundEnabled);audio?.setEnabled(soundEnabled);if(soundEnabled)audio?.start();updateSettings();};
  $('sound').addEventListener('click',toggleAudio);$('introSound').addEventListener('click',toggleAudio);
  const toggleMotion=()=>{mildMotion=!mildMotion;saveStore('lc-motion',mildMotion);updateSettings();};
  $('introMotion').addEventListener('click',toggleMotion);$('motionSetting').addEventListener('click',toggleMotion);
  $('qualitySetting').addEventListener('click',()=>{quality=(quality+1)%3;saveStore('lc-quality',quality);updateSettings();resize();});
  $('difficulty').addEventListener('click',()=>{difficulty=1-difficulty;state.storm=difficulty?1:.73;updateSettings();});
  $('helpButton').addEventListener('click',()=>$('helpPanel').classList.toggle('hidden'));
  for(const side of ['left','right']){
    const button=$(side);
    button.addEventListener('pointerdown',event=>{event.preventDefault();button.setPointerCapture(event.pointerId);touchTurn[side]=true;button.classList.add('held');});
    for(const type of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(type,()=>{touchTurn[side]=false;button.classList.remove('held');});
  }
  window.addEventListener('keydown',event=>{
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(event.code))event.preventDefault();
    if(event.code==='Escape'){setPaused(!paused);return;}
    if(!playing||paused)return;
    if(chapter?.keyDown(event)){event.preventDefault();return;}
    keys.add(event.code);
    if(event.repeat)return;
    if(event.code==='KeyC')cycleCamera();if(event.code==='Space')setThrottle(0);
    const map={KeyE:'drink',KeyH:'horn',KeyQ:'announce',KeyR:'rescue'};if(map[event.code])action(map[event.code]);
  });
  window.addEventListener('keyup',event=>{keys.delete(event.code);chapter?.keyUp(event);});
  window.addEventListener('blur',()=>{keys.clear();touchTurn.left=touchTurn.right=false;if(playing)setPaused(true);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing)setPaused(true);});
  $('sea').addEventListener('pointerdown',event=>{
    if(!playing||paused)return;
    if(chapter?.pointerDown(event))return;
    if(helm?.beginWheel(event,$('sea'),pickWheel(event)))return;
    if(drag)return;drag={id:event.pointerId,x:event.clientX,y:event.clientY};$('sea').setPointerCapture(event.pointerId);
  });
  $('sea').addEventListener('pointermove',event=>{
    if(chapter?.pointerMove(event))return;
    if(helm?.moveWheel(event))return;
    if(!drag||drag.id!==event.pointerId)return;
    targetLookYaw=clamp(targetLookYaw-(event.clientX-drag.x)*.0046,cameraMode===0?-Math.PI:-1.3,cameraMode===0?Math.PI:1.3);
    targetLookPitch=clamp(targetLookPitch+(event.clientY-drag.y)*.0035,-.42,.48);
    drag.x=event.clientX;drag.y=event.clientY;lastLook=state.time;
  });
  for(const type of ['pointerup','pointercancel','lostpointercapture'])$('sea').addEventListener(type,event=>{chapter?.pointerUp(event);helm?.endWheel(event);if(drag?.id===event.pointerId)drag=null;});
  for(const type of ['contextmenu','selectstart','dragstart'])$('sea').addEventListener(type,e=>e.preventDefault());
  window.addEventListener('resize',resize);$('sea').addEventListener('webglcontextlost',event=>{event.preventDefault();setPaused(true);fatal('Η συσκευή διέκοψε τα 3D γραφικά. Κλείσε άλλες βαριές εφαρμογές και πάτησε «Δοκίμασε ξανά».');});
}
function frame(now){
  requestAnimationFrame(frame);
  if(!renderer||!world||!ship)return;
  const dt=window.__CHAOS_FREEZE__?0:Math.min((now-lastFrame)/1000,.05);lastFrame=now;
  if(paused){audio?.update({...state,playing:false});return;}
  if(playing){
    input.turn=chapter?.foot?0:helm?.turn ?? ((keys.has('KeyD')||keys.has('ArrowRight')||touchTurn.right)?1:0)-((keys.has('KeyA')||keys.has('ArrowLeft')||touchTurn.left)?1:0);
    if(!chapter?.foot&&(keys.has('KeyW')||keys.has('ArrowUp')))setThrottle(input.throttle+dt*.4);
    if(!chapter?.foot&&(keys.has('KeyS')||keys.has('ArrowDown')))setThrottle(input.throttle-dt*.4);
    if(chapter?.ownsShip){input.throttle=0;input.turn=0;}
    accum+=dt;
    while(accum>=1/60){advance(state,1/60,input,world.obstacles,world.sampleHeight,world.safeHarbor,gameplayEvent);accum-=1/60;}
    ship.group.position.set(state.x,state.y,state.z);ship.group.rotation.set(state.pitch,state.heading,state.roll,'YXZ');ship.group.updateMatrixWorld(true);
    world.update(state.time,dt,{shipPosition:ship.group.position,heading:state.heading,speed:state.speed,storm:state.storm});
    people?.update(state.time,dt,{panic:state.panic,danger:state.danger,roll:state.roll,speed:state.speed,shipPosition:ship.group.position,heading:state.heading,playing:true,waterHeight:world.sampleHeight});
    ship.update(state.time,dt,{...state,damage:100-state.hull,wheelDemand:helm?.visualRudder});
    chapter?.update(dt);
    if(!chapter?.foot&&!chapter?.pausedStory)dialogue?.update(state,dt);
    if(chapter?.enabled)for(const q of people.getSpeakers())q.group.visible=!chapter.foot&&!chapter.pausedStory;
    if(!drag&&!helm?.busy&&state.time-lastLook>6){targetLookYaw*=Math.exp(-dt*.32);targetLookPitch*=Math.exp(-dt*.32);}
    if(world.lightningStrike!==lastStrike){lastStrike=world.lightningStrike;audio?.thunder();}
    toastTime-=dt;if(toastTime<0)$('toast').classList.add('hidden');radioTime-=dt;$('radio').style.opacity=radioTime<0?'0':'1';
    if(state.time-lastHud>.1){updateHud();lastHud=state.time;}
    $('impact').style.opacity=String(state.impact*.65);
  }else{
    previewTime+=dt;
    if(!state.ended){
      ship.group.position.y=world.sampleHeight(0,0,previewTime)*.45;ship.group.rotation.set(Math.sin(previewTime*.41)*.018,0,Math.sin(previewTime*.52)*.028);
      ship.group.updateMatrixWorld(true);world.update(previewTime,dt,{shipPosition:ship.group.position,heading:0,speed:5,storm:difficulty?1:.73});
      people?.update(previewTime,dt,{playing:false,panic:0,roll:ship.group.rotation.z,speed:0,shipPosition:ship.group.position,waterHeight:world.sampleHeight});
      ship.update(previewTime,dt,{rudder:0,throttle:.55,damage:0,panic:0});
    }
  }
  updateCamera(dt);renderedFrames++;
  helm?.update(cameraMode,wheelAnchor());dialogue?.project(state.time);chapter?.project();
  audio?.update({...state,damage:100-state.hull,playing:playing&&!paused});
  fx.material.uniforms.uTime.value=playing?state.time:previewTime;
  fx.material.uniforms.uIntox.value=(state.intox/100)*(mildMotion?.22:1);fx.material.uniforms.uImpact.value=state.impact;
  renderer.setRenderTarget(renderTarget);renderer.render(scene,camera);sceneDrawCalls=renderer.info.render.calls;sceneTriangles=renderer.info.render.triangles;renderer.setRenderTarget(null);renderer.render(fx.scene,fx.camera);
}
async function init(){
  try{
    updateSettings();$('loadProgress').firstElementChild.style.width='25%';
    renderer=new THREE.WebGLRenderer({canvas:$('sea'),antialias:!mobile,alpha:false,powerPreference:'high-performance'});
    renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.14;
    renderer.shadowMap.enabled=!mobile;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    scene=new THREE.Scene();scene.background=new THREE.Color(0x718893);
    camera=new THREE.PerspectiveCamera(58,innerWidth/innerHeight,.1,24000);
    const skyLight=new THREE.HemisphereLight(0xb3d4eb,0x23313b,2.1);scene.add(skyLight);
    const moon=new THREE.DirectionalLight(0xc5d8e5,2.1);moon.position.set(-150,240,160);scene.add(moon);scene.add(moon.target);
    moon.castShadow=!mobile;moon.shadow.mapSize.set(1024,1024);moon.shadow.camera.left=-115;moon.shadow.camera.right=115;moon.shadow.camera.top=115;moon.shadow.camera.bottom=-115;moon.shadow.camera.near=1;moon.shadow.camera.far=650;moon.shadow.bias=-.0005;moon.shadow.normalBias=.12;
    const warm=new THREE.DirectionalLight(0xffc894,.5);warm.position.set(130,60,-240);scene.add(warm);
    world=createWorld(scene,{mobile});ship=createShip();scene.add(ship.group);
    fx=makePost();renderTarget=fx.rt;resize();audio=createAudio();audio.setEnabled(soundEnabled);setupControls();
    helm=createHelm({hud:$('hud'),setThrottle,getState:()=>({throttle:input.throttle,speed:state.speed,rudder:state.rudder}),canControl:()=>playing&&!paused,recenter:()=>{targetLookYaw=targetLookPitch=lookYaw=lookPitch=0;updateCamera(1,true);}});
    dialogue=createDialogue({hud:$('hud'),audio,camera,ship,getPeople:()=>people,getView:()=>cameraMode});
    chapter=createChaosChapter({ship,camera,hud:$('hud'),canvas:$('sea'),getPeople:()=>people,getState:()=>state,canPlay:()=>playing&&!paused,audio,onToast:toast,onResetHelm:()=>{helm.reset();keys.clear();drag=null;input.turn=0;cameraMode=1;},onRestart:startGame,onDrinkLine:()=>dialogue.drink(state),mildMotion:()=>mildMotion});
    installSoundPanel({audio,enable:()=>{soundEnabled=true;saveStore('lc-sound',true);audio.setEnabled(true);updateSettings();}});audio.preload();$('releaseBadge').textContent='v1.7.1 · CHAOS';
    $('loadProgress').firstElementChild.style.width='60%';$('loadStatus').textContent='Φόρτωση ανθρώπινων μοντέλων και κινήσεων…';
    updateCamera(1,true);requestAnimationFrame(frame);
    people=await createPassengers(ship.group,ship.deckZones,scene,{mobile,onEvent:passengerEvent});
    ready=true;$('start').disabled=false;$('startText').textContent='ΑΝΑΛΑΒΕ ΤΟ ΤΙΜΟΝΙ';$('loadProgress').firstElementChild.style.width='100%';
    $('loadStatus').textContent=mobile?'Έτοιμο. Παίζεται με αφή — δοκίμασε και οριζόντια οθόνη.':'Έτοιμο. Ταξίδι περίπου 6–8 λεπτών. Εσύ επιλέγεις πότε θα πιεις.';
    window.__lastCall={getState:()=>({version:'1.7.1',ready,playing,paused,camera:cameraLabels[cameraMode],frames:renderedFrames,time:state.time,hull:state.hull,intox:state.intox,panic:state.panic,speed:state.speed,rudder:state.rudder,throttle:input.throttle,turn:input.turn,heading:state.heading,x:state.x,z:state.z,collisions:state.collisions,danger:state.danger,distance:state.distance,people:people.getStats(),wheelAngle:ship.wheel.rotation.z,look:{yaw:lookYaw,pitch:lookPitch},controls:helm.inspect(),dialogue:dialogue.inspect(),voices:audio.voiceStatus(),chapter:chapter?.inspect(),drawCalls:sceneDrawCalls,triangles:sceneTriangles})};
    if(window.__CAPTAIN_TEST__||new URLSearchParams(location.search).has('test'))window.__lastCall.test={
      restart:startGame,chapter:chapter.test,
      setState:values=>{for(const k of ['x','z','heading','time','speed','intox','panic','hull'])if(Number.isFinite(values[k]))state[k]=values[k];},
      camera:mode=>{cameraMode=mode;$('cameraName').textContent=cameraLabels[cameraMode];syncCameraControls();targetLookYaw=targetLookPitch=lookYaw=lookPitch=0;updateCamera(1,true);},
      obstacles:()=>world.obstacles.map(o=>({x:o.x,z:o.z,radius:o.radius,id:o.id,type:o.type})),
      audio:()=>audio, say:id=>dialogue.say(id,state),anchor:wheelAnchor,look:(yaw,pitch=0)=>{targetLookYaw=lookYaw=yaw;targetLookPitch=lookPitch=pitch;lastLook=state.time;updateCamera(1,true);},
      step:seconds=>{for(let i=0;i<seconds*60;i++)advance(state,1/60,input,world.obstacles,world.sampleHeight,world.safeHarbor,gameplayEvent);}
    };
    if('serviceWorker'in navigator){navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'}).then(r=>r.update()).catch(()=>{});}
    // Keep the bounded shadow camera with the moving vessel without lighting the whole fjord.
    scene.onBeforeRender=()=>{moon.position.set(state.x-150,state.y+240,state.z+160);moon.target.position.set(state.x,state.y,state.z);moon.target.updateMatrixWorld();};
  }catch(error){fatal(`Δεν μπόρεσαν να φορτωθούν τα 3D γραφικά ή οι επιβάτες. ${error.message||error}. Χρειάζεται Safari, Chrome ή Edge με WebGL2.`);}
}
init();
