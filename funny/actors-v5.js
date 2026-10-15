/* The Reset Show / original articulated 2D puppets.
 * No portrait bitmaps or whole-character CSS rotations. The torso deforms,
 * the jaw/eyes/brows morph, and two-bone IK connects shoulders to moving hands.
 * Expressions are fictional acting, not recordings of either person.
 */
'use strict';
(()=>{
const $=id=>document.getElementById(id), TAU=Math.PI*2, clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)), mix=(a,b,t)=>a+(b-a)*t;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let motion=!reduced.matches, paused=false, last=0, clock=0, scene='idle', epoch=0, speaking={tibo:0,sam:0}, showSam='idle',showTibo=null;
const actors={};
function path(c,d,fill,stroke='#2c1c2b',w=2.4){const p=new Path2D(d);if(fill){c.fillStyle=fill;c.fill(p);}if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.lineJoin='round';c.lineCap='round';c.stroke(p);}}
function oval(c,x,y,rx,ry,fill,stroke=null,w=2){c.beginPath();c.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),0,0,TAU);c.fillStyle=fill;c.fill();if(stroke){c.strokeStyle=stroke;c.lineWidth=w;c.stroke();}}
function line(c,pts,color,w=2){c.beginPath();pts.forEach((p,i)=>i?c.lineTo(...p):c.moveTo(...p));c.strokeStyle=color;c.lineWidth=w;c.lineCap='round';c.lineJoin='round';c.stroke();}
function gradient(c,x0,y0,x1,y1,stops){const g=c.createLinearGradient(x0,y0,x1,y1);stops.forEach((v,i)=>g.addColorStop(i/(stops.length-1),v));return g;}
function mount(id){const el=$(id);el.querySelectorAll('img,.sam-body').forEach(e=>e.remove());const can=document.createElement('canvas');can.className='actor-rig';can.setAttribute('role','img');can.setAttribute('aria-label',id==='tibo'?'Articulated cartoon Tibo: independently animated eyes, mouth, arms and body':'Articulated cartoon Sam: clapping hands and finger-to-lips gesture');el.insertBefore(can,el.firstChild);const dpr=Math.min(2,devicePixelRatio||1);can.width=360*dpr;can.height=430*dpr;const c=can.getContext('2d');c.scale(dpr,dpr);actors[id]={el,can,c,pose:{bend:0,jaw:0,squint:0,brow:0,head:0,shrug:0,lean:0,clap:0,shh:0},joints:{}};}
mount('tibo');mount('sam');
function elbow(a,b,l1,l2,side){const dx=b.x-a.x,dy=b.y-a.y,d=clamp(Math.hypot(dx,dy),2,l1+l2-.1),k=(l1*l1-l2*l2+d*d)/(2*d),h=Math.sqrt(Math.max(0,l1*l1-k*k)),nx=dx/(Math.hypot(dx,dy)||1),ny=dy/(Math.hypot(dx,dy)||1);return{x:a.x+nx*k-ny*h*side,y:a.y+ny*k+nx*h*side};}
function hand(c,x,y,rot,gesture,skin){c.save();c.translate(x,y);c.rotate(rot);const sh='#c68870';
// Separately articulated index, curled fingers and thumb, not a mitten icon.
path(c,'M -12 12 Q -18 2 -13 -11 Q -8 -18 6 -13 Q 16 -10 14 5 L 10 16 Q -2 23 -12 12',skin);
if(gesture==='index'){path(c,'M -5 -6 L -6 -43 Q -6 -51 0 -51 Q 6 -51 5 -42 L 5 -7',skin);line(c,[[-3,-29],[3,-29]],sh,1.4);line(c,[[-3,-17],[4,-17]],sh,1.4);path(c,'M 6 -6 Q 19 -11 18 -3 L 17 7 Q 12 15 7 10',skin);line(c,[[8,-1],[15,0]],sh,1.5);}
else if(gesture==='palm'){for(let i=0;i<4;i++){const x=-11+i*7,len=[23,33,31,22][i];path(c,`M ${x} -6 L ${x-1} ${-len} Q ${x+2} ${-len-7} ${x+5} ${-len} L ${x+6} -4`,skin,'#543240',1.5);}line(c,[[-7,5],[5,1],[10,6]],sh,1.4);}
else {for(let i=0;i<3;i++)path(c,`M ${-12+i*8} -7 Q ${-11+i*8} -16 ${-5+i*8} -11 L ${-4+i*8} -3`,skin,'#724250',1.4);}
path(c,'M -11 11 Q -26 1 -20 -4 Q -16 -9 -8 4',skin,'#543240',1.8);oval(c,-1,7,8,8,'#ffd4ad66');c.restore();}
function arm(c,A,W,side,style,gesture,handrot,joints,label){const E=elbow(A,W,66,68,side);joints[label]={shoulder:{...A},elbow:{...E},wrist:{...W}};const dx=E.x-A.x,dy=E.y-A.y;c.save();c.translate(A.x,A.y);c.rotate(Math.atan2(dy,dx));path(c,'M 0 -20 Q 28 -23 65 -16 L 70 15 Q 38 25 0 21 Z',style.sleeve);path(c,'M 3 -13 Q 33 -17 61 -10 L 64 0 Q 25 -3 3 4Z',style.highlight,null);c.restore();
line(c,[[E.x,E.y],[W.x,W.y]],'#2c1c2b',32);line(c,[[E.x,E.y],[W.x,W.y]],style.long?style.sleeve:style.skin,27);line(c,[[E.x-3,E.y-2],[W.x-3,W.y-2]],style.long?style.highlight:'#f5bb95',7);
if(style.long){const a=Math.atan2(W.y-E.y,W.x-E.x);line(c,[[W.x+11*Math.sin(a),W.y-11*Math.cos(a)],[W.x-11*Math.sin(a),W.y+11*Math.cos(a)]],'#8399b6',3);}hand(c,W.x,W.y,handrot,gesture,style.skin);}
function face(c,id,p,t,talking){const sam=id==='sam',skin=sam?'#edbd9e':'#efb18b',chin=sam?79:70,w=sam?58:64,j=p.jaw;
c.save();c.translate(180+p.lean,169+p.head);c.rotate((sam?-.02:.025)+p.bend*.0012);
// Neck remains attached to the moving chin.
path(c,`M -26 42 L -29 96 Q 0 117 29 92 L 26 43`,gradient(c,-30,0,35,100,['#a86e5e',skin,'#b97f68']));line(c,[[-15,75],[2,87],[16,76]],'#c58c72',2);
oval(c,-w-1,5,15,23,skin,'#382534');oval(c,w+1,5,15,23,skin,'#382534');path(c,`M ${-w-1} -6 Q ${-w-17} 8 ${-w} 14`,null,'#ac7064',2);path(c,`M ${w} -5 Q ${w+13} 6 ${w} 14`,null,'#ac7064',2);
const dy=j*14;
path(c,`M ${-w} -45 C -62 -82 56 -83 ${w} -44 L ${w+1} 21 Q ${w-5} ${56+dy} 18 ${chin+dy} Q 0 ${chin+7+dy} -20 ${chin+dy} Q ${-w} ${55+dy} ${-w-2} 14 Z`,gradient(c,-57,-65,65,85,['#d79377','#ffd0a5','#e5a180']),'#332231',3);
path(c,`M 45 -48 Q 62 4 50 39 Q 36 ${65+dy} 5 ${chin+2+dy} Q 48 ${68+dy} 60 ${35+dy} L 65 -35 Z`,'#bb78604d',null);
path(c,'M -45 -31 Q -18 -63 18 -46 Q -3 -52 -13 -30Z','#ffe3bb55',null);
oval(c,-38,28,19,9,'#d87e7540');oval(c,37,28,19,9,'#d87e7540');
// Individually morphed lids and brows. Blink does not scale the portrait.
const blink=motion&&!paused&&((t+(sam?1.27:0))%4.8>4.65)?1:0;
const shut=clamp(p.squint+blink),eyeY=sam?-3:-2,look=sam?-2:-1;
for(const side of [-1,1]){const x=side*(sam?28:30),h=10*(1-shut);
if(h>1){oval(c,x,eyeY,16,h,'#fff9ea','#49313b',1.5);oval(c,x+look,eyeY+1,6,h*.9,sam?'#5791b4':'#765349');oval(c,x+look,eyeY+1,3.3,Math.min(6,h),'#172437');oval(c,x+look-2,eyeY-2,1.8,1.8,'#fff');}
else path(c,`M ${x-16} ${eyeY+2} Q ${x} ${eyeY-12} ${x+16} ${eyeY+2}`,null,'#553037',3.3);
path(c,`M ${x-19} ${eyeY+15} Q ${x} ${eyeY+20-8*shut} ${x+17} ${eyeY+12}`,null,'#b7786859',1.5);
const by=-23-p.brow*7+shut*3;path(c,`M ${x-17} ${by+side*2} Q ${x} ${by-7} ${x+17} ${by-side*2}`,null,sam?'#674431':'#3c2930',6);}
path(c,sam?'M -1 -6 L -9 25 Q -3 33 11 27 L 6 22':'M 0 -6 L -7 24 Q -1 30 14 24 L 6 20',null,'#b27364',2.5);line(c,[[1,-1],[1,18]],'#ffe0b7',3);oval(c,8,27,3,1.5,'#996054');
// Jaw, teeth, gums, tongue and lip contour: continuous mouth shape animation.
const mw=sam?25:30,top=43-j*6,bot=44+j*39;
const d=`M ${-mw} ${top} Q 0 ${top+12*(1-j)} ${mw} ${top-2} Q ${mw-2} ${bot+6} 0 ${bot+8} Q ${-mw+2} ${bot+6} ${-mw} ${top}Z`;
c.save();const mp=new Path2D(d);c.fillStyle='#542535';c.fill(mp);c.clip(mp);
path(c,`M -34 ${top+1} Q 0 ${top+12} 34 ${top-1} L 31 ${top+10} Q 0 ${top+21} -32 ${top+9}Z`,'#fff8e7',null);
for(let k=-2;k<=2;k++)line(c,[[k*8,top+6],[k*8,top+14]],'#c4ada54f',.8);
if(j>.18){oval(c,5,bot+4,19,10,'#cf7287');line(c,[[5,bot-2],[5,bot+4]],'#a24565',1.3);path(c,`M -24 ${bot+4} Q 0 ${bot-3} 24 ${bot+3} L 21 ${bot+10} L -23 ${bot+10}Z`,'#ffe8d2',null);}c.restore();path(c,d,null,'#633740',2);
path(c,`M -39 38 Q -44 47 -39 53 M 37 34 Q 45 44 40 52`,null,'#ba7b68',2);path(c,`M -14 ${chin-5+dy} Q 0 ${chin+dy} 15 ${chin-6+dy}`,null,'#bc8067',1.6);
if(sam){
path(c,'M -58 -8 L -66 -47 Q -75 -65 -63 -79 L -70 -100 L -45 -91 L -45 -111 L -26 -99 L -13 -122 L 2 -103 L 15 -121 L 28 -100 L 48 -111 L 46 -93 Q 77 -87 65 -48 L 57 -4 L 48 -27 L 49 -55 Q 19 -37 -4 -63 Q -24 -43 -48 -50 L -47 -15 Z',gradient(c,-60,-110,40,-28,['#a77c46','#563627','#322830']),'#322631',3);
path(c,'M -58 -78 L -48 -91 L -26 -86 L -19 -106 L -6 -87 L 14 -108 L 12 -83 L 43 -94 L 32 -68 Q 12 -53 -9 -78 Q -24 -61 -46 -65 Z','#ba8b4e6b',null);line(c,[[-32,-73],[-21,-84],[-18,-96]],'#d0a46f',2);line(c,[[27,-76],[42,-83],[45,-91]],'#c49b694f',3);
}else{
path(c,'M -61 -9 L -69 -37 Q -77 -59 -61 -80 Q -63 -94 -42 -95 Q -15 -123 26 -97 Q 61 -94 65 -68 Q 76 -49 62 -11 L 53 -4 L 47 -46 Q 19 -54 2 -67 Q -22 -45 -47 -49 L -50 -10 Z',gradient(c,-60,-95,50,-20,['#5e3f30','#32262b','#1d202a']),'#2b1e29',3);
path(c,'M -58 -71 Q -42 -94 -12 -97 Q 14 -98 39 -80 Q 7 -91 -13 -74 Q -27 -58 -53 -59Z','#8d61414d',null);line(c,[[-49,-76],[-24,-90],[1,-88]],'#b087596f',2);path(c,'M 7 -76 Q 36 -87 52 -61 M 19 -69 Q 40 -72 55 -47',null,'#79543e6b',2);}
if(p.squint>.5&&j>.5&&!sam){oval(c,-53,29,3.4,7.5,'#8adbf1');oval(c,55,37+Math.sin(t*7)*4,3,6,'#90dff5');}
c.restore();
return{x:180+p.lean,y:169+p.head+45};}
function paint(id,t,dt){const a=actors[id],c=a.c,p=a.pose,sam=id==='sam',elapsed=t-epoch;let kind=sam?scene:(showTibo||scene);
if(sam&&scene==='win')kind=showSam==='shh'?'shh':showSam==='talk'?'talk':'clap';
const beat=(Math.sin(elapsed*15)+1)/2,slow=(Math.sin(elapsed*2.1)+1)/2;
const isSpeak=speaking[id]>clock,rest={bend:0,jaw:.02,squint:0,brow:.2,head:0,shrug:0,lean:0,clap:0,shh:0};
if(kind==='win'){Object.assign(rest,{bend:Math.sin(elapsed*2)*14,head:-4-6*beat,jaw:.62+.36*beat,squint:.91,brow:.4,shrug:beat*5,lean:Math.sin(elapsed*2)*3});}
else if(kind==='clap'){Object.assign(rest,{jaw:.18+.19*beat,squint:.25,brow:.6,clap:(Math.sin(elapsed*8)+1)/2,head:-2*beat});}
else if(kind==='shh'){Object.assign(rest,{jaw:.12,squint:.08,brow:1,shh:1});}
else if(kind==='wrong'){Object.assign(rest,{brow:-1,jaw:.08+(isSpeak?.14*beat:0),head:Math.sin(elapsed*6)*1.5,lean:Math.sin(elapsed*6)*7,shrug:2});}
else if(kind==='thinking'){Object.assign(rest,{squint:.2,brow:.85,head:2,shh:sam?.7:0});}
else if(isSpeak||kind==='talk'){Object.assign(rest,{jaw:.08+.26*(Math.sin(elapsed*19)**2),brow:.4,head:-slow*2});}
const alpha=motion&&!paused?1-Math.exp(-dt*12):1;Object.keys(p).forEach(k=>p[k]=mix(p[k],rest[k],alpha));
c.clearRect(0,0,360,430);a.joints={};
const skin=sam?'#e8b79b':'#edaf89',style={skin,sleeve:sam?'#334a67':'#292733',highlight:sam?'#56718c':'#484050',long:sam};
const hip=376,shoulderY=281+p.bend*.45+p.shrug,torsoX=180+p.lean*.6;
// Fixed hips, flexing spine and shoulder line. Lower body never rotates as a card.
oval(c,180,407,109,11,'#040c2444');path(c,`M 112 351 Q 178 337 250 352 L 251 416 L 187 416 L 175 387 L 169 416 L 103 416Z`,sam?'#1c2f49':'#171c2d');
path(c,`M 111 ${shoulderY} Q 143 ${244+p.bend*.65} ${torsoX} ${255+p.bend*.5} Q 225 ${245+p.bend*.65} 254 ${shoulderY} Q 268 324 260 ${hip} Q 180 402 100 ${hip} Q 102 319 111 ${shoulderY}Z`,gradient(c,105,270,270,390,[style.highlight,style.sleeve,sam?'#1b2d45':'#171927']),'#282130',3);
path(c,`M 119 ${shoulderY+1} Q 139 307 128 356 L 110 371 Q 112 316 119 ${shoulderY+1}Z`,sam?'#728aa233':'#7d6a8533',null);
face(c,id,p,t,isSpeak);
// Collar joins the independently deforming neck to the body.
if(sam){path(c,`M 148 ${250+p.bend*.3} L 178 271 L 170 295 L 135 269 Z`,'#405b78');path(c,`M 208 ${249+p.bend*.3} L 181 272 L 195 296 L 221 268 Z`,'#3a5371');line(c,[[182,275],[185,394]],'#1c2d47',2);for(let y=302;y<390;y+=26)oval(c,185,y,1.8,1.8,'#92a1b6');}
else{path(c,`M 146 ${252+p.bend*.3} Q 180 ${280+p.bend*.2} 214 ${253+p.bend*.3}`,null,'#151923',7);path(c,`M 146 ${252+p.bend*.3} Q 180 ${278+p.bend*.2} 214 ${253+p.bend*.3}`,null,'#5b4b5d',2);c.font='700 10px monospace';c.fillStyle='#c9b8da';c.fillText('SOON™',203,313+p.bend*.2);}
for(const x of [129,240])path(c,`M ${x} 325 Q ${x-8} 350 ${x+7} 369`,null,sam?'#10233755':'#03082055',2);
let L={x:128,y:367},R={x:237,y:368},lg='rest',rg='rest',lr=-.5,rr=.5;
if(sam&&kind==='clap'){const sep=mix(-4,68,p.clap);L={x:180-sep,y:308-3*beat};R={x:180+sep,y:308-3*beat};lg=rg='palm';lr=.28;rr=-.28;}
else if(sam&&(kind==='shh'||kind==='thinking')){R={x:184+p.lean,y:169+p.head+92};rg='index';rr=-.035;L={x:120,y:362};}
else if(kind==='win'){L={x:172+p.lean,y:332+p.bend*.4};R={x:244,y:360-18*beat};lg='palm';rg='palm';lr=-1.5;rr=.35;}
else if(kind==='wrong'){L={x:88,y:313};R={x:268,y:303};lg=rg='palm';lr=-1.05;rr=1.05;}
else if(kind==='thinking'){R={x:204,y:236};rg='index';rr=-1.35;}
else if(kind==='talk'){R={x:248,y:308+8*slow};rg='index';rr=.7;}
// Wrist targets are smoothed before solving elbows, avoiding disconnected hands.
if(!a.wrists)a.wrists={L:{...L},R:{...R}};for(const [key,target] of [['L',L],['R',R]])for(const axis of ['x','y'])a.wrists[key][axis]=mix(a.wrists[key][axis],target[axis],alpha);
arm(c,{x:117+p.lean*.3,y:shoulderY+4},a.wrists.L,1,style,lg,lr,a.joints,'left');arm(c,{x:243+p.lean*.3,y:shoulderY+4},a.wrists.R,-1,style,rg,rr,a.joints,'right');
a.joints.mouth={x:180+p.lean,y:214+p.head,open:p.jaw};a.joints.eyeClosure=p.squint;a.joints.spineBend=p.bend;
if(sam&&kind==='clap'&&p.clap<.12){for(const side of [-1,1])line(c,[[180+side*27,271],[180+side*36,264]],'#ffde89',2.5);}
a.can.dataset.action=kind;a.can.dataset.jaw=p.jaw.toFixed(3);
}
function tick(now){const dt=Math.min(.05,(now-(last||now))/1000);last=now;if(!document.hidden){if(!paused&&motion)clock+=dt;paint('tibo',clock,dt);paint('sam',clock,dt);}requestAnimationFrame(tick);}
window.RESET_ACTORS={
 setScene(value){scene=value;epoch=clock;showSam=value==='win'?'clap':'idle';showTibo=null;},
 sam(value){showSam=value;},
 tibo(value){showTibo=value;},
 say(who,text){speaking[who]=clock+Math.max(1.2,Math.min(5,String(text).length*.027));},
 motion(on){motion=Boolean(on);},
 pause(on){paused=Boolean(on);},
 inspect(){return{scene,time:clock,motion,paused,actors:Object.fromEntries(Object.entries(actors).map(([k,a])=>[k,{action:a.can.dataset.action,pose:{...a.pose},joints:structuredClone(a.joints)}]))};}
};
const ob=new MutationObserver(()=>{if($('stage').dataset.mood!==scene)window.RESET_ACTORS.setScene($('stage').dataset.mood);});ob.observe($('stage'),{attributes:true,attributeFilter:['data-mood']});
requestAnimationFrame(tick);
})();
(()=>{const stage=document.getElementById('stage'),q=document.getElementById('questionCloud'),sam=document.getElementById('samCloud');
function layout(){const mobile=innerWidth<=520,h=q.offsetHeight;stage.style.height=(h+(mobile?372:465))+'px';sam.style.top=(h+(mobile?52:67))+'px';}
new ResizeObserver(layout).observe(q);addEventListener('resize',layout);layout();})();
