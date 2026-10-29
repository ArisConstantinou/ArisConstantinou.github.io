// Articulated 2D characters: planted hands stay in the original artwork while
// textured jaws, eyelids, tongue geometry and individual fly wings animate.
const NS='http://www.w3.org/2000/svg',W=1774,H=887;
const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
function pulse(t,start,rise,hold,fall){return t<start?0:t<start+rise?smooth((t-start)/rise):t<start+rise+hold?1:1-smooth((t-start-rise-hold)/fall);}
const blink=(t,at)=>pulse(t,at,.07,.035,.11);
export function tonguePoint(amount){const t=clamp(amount),u=1-t;return {x:u*u*u*885+3*u*u*t*1110+3*u*t*t*1310+t*t*t*1540,y:u*u*u*515+3*u*u*t*505+3*u*t*t*255+t*t*t*185};}
export function tongueRibbon(amount){
 if(amount<=.001)return '';
 const left=[],right=[];for(let i=0;i<=18;i++){const t=amount*i/18,p=tonguePoint(t),a=tonguePoint(Math.max(0,t-.003)),b=tonguePoint(Math.min(1,t+.003)),d=Math.hypot(b.x-a.x,b.y-a.y)||1,width=11+12*smooth(i/18),nx=-(b.y-a.y)/d,ny=(b.x-a.x)/d;left.push(`${(p.x+nx*width).toFixed(2)},${(p.y+ny*width).toFixed(2)}`);right.push(`${(p.x-nx*width).toFixed(2)},${(p.y-ny*width).toFixed(2)}`);}
 return `M${left.join(' L')} Q${tonguePoint(amount).x+13},${tonguePoint(amount).y-6} ${right.at(-1)} L${right.reverse().slice(1).join(' L')} Z`;
}
const SHOTS=[{at:.94,life:.72,from:'green'},{at:1.62,life:.72,from:'green'},{at:4.4,life:.8,from:'orange'}];
export function menuPose(seconds,reduced=false){
 const time=reduced?0:Math.max(0,seconds),t=time%7.2,flight=t<1.45,extending=t>=1.45&&t<1.85,caught=t>=1.85&&t<2.05,retracting=t>=2.05&&t<2.7;
 const tongue=extending?smooth((t-1.45)/.4):caught?1:retracting?1-smooth((t-2.05)/.65):0,tip=tonguePoint(tongue),swallow=pulse(t,2.7,.12,.12,.35);
 const prey=flight?{x:1850-310*smooth(t/1.45),y:185-75*(1-smooth(t/1.45))+Math.sin(t*7)*9}:extending?{x:1540,y:185}:tip;
 const projectiles=SHOTS.map(shot=>{const p=(t-shot.at)/shot.life,visible=p>=0&&p<1,forward=shot.from==='green';return {...shot,progress:clamp(p),visible,x:forward?690+400*clamp(p):1090-400*clamp(p),y:(forward?350:377)+(forward?27:-27)*clamp(p)-65*Math.sin(Math.PI*clamp(p))};});
 const greenShot=Math.max(pulse(t,.72,.18,.16,.22),pulse(t,1.4,.18,.16,.22)),orangeShot=pulse(t,4.15,.21,.16,.26),orangeHit=Math.max(pulse(t,1.66,.06,.06,.28),pulse(t,2.34,.06,.06,.28)),greenHit=pulse(t,5.2,.06,.06,.3);
 return {time,t,phase:flight?'fly-approach':extending?'tongue-extend':caught?'catch':retracting?'tongue-retract':swallow>0?'swallow':'rest',tongue,tip,prey:{...prey,visible:t<2.62,attached:caught||retracting},swallow,greenJaw:greenShot,orangeJaw:Math.max(orangeShot,orangeHit*.6),purpleJaw:Math.max(pulse(t,1.25,.2,1.1,.35),swallow*.3),greenBlink:Math.max(blink(t,.3),blink(t,3.1),greenHit),orangeBlink:Math.max(blink(t,.62),orangeHit,blink(t,5.7)),purpleBlink:Math.max(blink(t,.7),blink(t,2.85),blink(t,5.4)),projectiles,wing:reduced?0:Math.sin(time*Math.PI*24),throat:Math.sin(time*2.1)};
}
function gradients(id){return `<defs>
 <linearGradient id="${id}-mouth" x2="0" y2="1"><stop stop-color="#190d14"/><stop offset=".6" stop-color="#542131"/><stop offset="1" stop-color="#9e3e50"/></linearGradient>
 <linearGradient id="${id}-tongue" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#ffbfd2"/><stop offset=".3" stop-color="#ff86ae"/><stop offset=".72" stop-color="#ed5d97"/><stop offset="1" stop-color="#ba3368"/></linearGradient>
 ${[['green','#d8ff76','#75bc22','#367519'],['orange','#ffc775','#ef7540','#a43b27'],['purple','#efbcff','#c66aeb','#763796']].map(([name,light,mid,dark])=>`<linearGradient id="${id}-${name}-lid" x2=".2" y2="1"><stop stop-color="${light}"/><stop offset=".5" stop-color="${mid}"/><stop offset="1" stop-color="${dark}"/></linearGradient>`).join('')}
 <radialGradient id="${id}-fly-body" cx=".3" cy=".25"><stop stop-color="#b3d8a7"/><stop offset=".25" stop-color="#668e66"/><stop offset=".65" stop-color="#254e42"/><stop offset="1" stop-color="#102a26"/></radialGradient>
 <linearGradient id="${id}-wing" x2=".5" y2="1"><stop stop-color="#fff" stop-opacity=".96"/><stop offset="1" stop-color="#c6e2e7" stop-opacity=".72"/></linearGradient>
 </defs>`;}
function fly(id,index){return `<g data-fly="${index}"><g class="fly-legs" fill="none" stroke="#422e26" stroke-width="3.2" stroke-linecap="round"><path d="M-17 4-33 15-36 31M-18 17-30 31-25 40M17 4 33 15 36 31M18 17 30 31 25 40"/></g><ellipse cx="0" cy="13" rx="24" ry="30" fill="url(#${id}-fly-body)" stroke="#142f28" stroke-width="2"/><path d="M-19 15Q0 23 19 15M-17 28Q0 34 17 28" fill="none" stroke="#244137" stroke-width="2"/><ellipse cx="0" cy="-14" rx="19" ry="18" fill="#344b3b"/><ellipse cx="-13" cy="-18" rx="8" ry="10" fill="#734c35"/><ellipse cx="13" cy="-18" rx="8" ry="10" fill="#734c35"/><circle cx="-15" cy="-21" r="2.5" fill="#f7de9e"/><circle cx="11" cy="-21" r="2.5" fill="#f7de9e"/>
 ${[-1,1].map(side=>`<g data-wing="${side}"><path d="M0-6C${side*26}-40 ${side*67}-52 ${side*65}-31C${side*64}-13 ${side*21} 0 0-6Z" fill="url(#${id}-wing)" stroke="#7a9f9c" stroke-width="1.6"/><path d="M0-6 ${side*54}-33M${side*21}-18 ${side*36}-36M${side*32}-23 ${side*53}-19" fill="none" stroke="#a9c0bc" stroke-width="1"/></g>`).join('')}<path d="M-6-30-11-39M6-30 11-39" stroke="#3c362a" stroke-width="2.5" fill="none"/></g>`;}
function eyelids(id,colour,eyes){return eyes.map(([x,y,rx,ry],i)=>`<defs><clipPath id="${id}-${colour}-eye-${i}"><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/></clipPath></defs><path data-lid="${colour}" data-eye="${[x,y,rx,ry]}" clip-path="url(#${id}-${colour}-eye-${i})" fill="url(#${id}-${colour}-lid)" stroke="${colour==='purple'?'#6c3878':colour==='orange'?'#ad4b24':'#558423'}" stroke-width="3"/>`).join('');}
function artwork(src,extra=''){return `<image href="${src}" width="${W}" height="${H}" ${extra}/>`;}
const JAWS={green:'M440 365Q543 411 688 346L674 409Q594 461 492 430Z',orange:'M1027 355Q1110 412 1264 400L1280 425Q1172 472 1072 425Z',purple:'M690 540Q756 581 844 558Q937 542 981 501L989 543Q945 600 851 605Q750 610 695 570Z'};
function createRig(doc,original,kind){
 const id='frog-menu-'+kind,src=original.getAttribute('src'),svg=doc.createElementNS(NS,'svg');svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.setAttribute('aria-hidden','true');svg.setAttribute('class',original.className+' menu-frog-animation');svg.setAttribute('data-rig',kind);svg.setAttribute('hidden','');svg.style.overflow='visible';
 const jawDefs=Object.entries(JAWS).filter(([key])=>kind==='top'?key!=='purple':key==='purple').map(([key,d])=>`<clipPath id="${id}-${key}-jaw"><path d="${d}"/></clipPath>`).join('');
 const mask=kind==='top'?`<rect width="${W}" height="${H}" fill="white"/>${['green','orange'].map(key=>`<path d="${JAWS[key]}" fill="black"/>`).join('')}`:`<path d="M0 245H950L1004 386 1006 443 978 480 1005 535H1130V887H0Z" fill="white"/><path d="M850 505Q927 496 1003 473L1008 516Q925 530 850 533Z" fill="black"/><path d="${JAWS.purple}" fill="black"/>`;
 svg.innerHTML=gradients(id)+`<defs>${jawDefs}<mask id="${id}-body" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}">${mask}</mask></defs>`+
 (kind==='top'?['green','orange'].map(key=>`<path d="${JAWS[key]}" fill="url(#${id}-mouth)"/>`).join(''):`<path d="${JAWS.purple}" fill="url(#${id}-mouth)"/><path d="M850 505Q927 496 978 488L984 514Q925 530 850 533Z" fill="url(#${id}-mouth)"/>`)+artwork(src,`mask="url(#${id}-body)"`)+
 (kind==='top'?['green','orange'].map(key=>`<g data-jaw="${key}">${artwork(src,`clip-path="url(#${id}-${key}-jaw)"`)}</g>`).join(''):`<g data-tongue><path data-tongue-shape fill="url(#${id}-tongue)" stroke="#b13f76" stroke-width="2"/><path data-tongue-shine fill="none" stroke="#ffe4ec" stroke-width="4.5" stroke-linecap="round" opacity=".65"/></g><g data-jaw="purple">${artwork(src,`clip-path="url(#${id}-purple-jaw)"`)}</g>`)+
 (kind==='top'?eyelids(id,'green',[[529,298,57,57],[670,198,34,42]])+eyelids(id,'orange',[[1204,307,58,50],[1082,234,32,40]])+SHOTS.map((_,i)=>fly(id,i)).join(''):eyelids(id,'purple',[[771,425,60,65],[900,307,35,43]])+fly(id,'prey'));
 original.after(svg);
 return {svg,original,kind,id,jaws:[...svg.querySelectorAll('[data-jaw]')],lids:[...svg.querySelectorAll('[data-lid]')],flies:[...svg.querySelectorAll('[data-fly]')]};
}
function drawFly(node,fly,pose,scale=1){
 node.style.display=fly.visible?'':'none';if(!fly.visible)return;
 node.setAttribute('transform',`translate(${fly.x.toFixed(2)} ${fly.y.toFixed(2)}) scale(${scale})`);
 for(const wing of node.querySelectorAll('[data-wing]')){const side=Number(wing.dataset.wing),flap=fly.attached?pose.wing*.5:pose.wing;wing.setAttribute('transform',`rotate(${side*(8+flap*24)} 0 -6) translate(0 -6) scale(1 ${.58+.42*flap}) translate(0 6)`);}
}
function drawRig(rig,pose){
 for(const jaw of rig.jaws){const key=jaw.dataset.jaw,open=pose[key+'Jaw'],hinge=key==='green'?[449,367]:key==='orange'?[1260,403]:[700,550],angle=key==='purple'?open*6+pose.swallow*1.8:(key==='green'?1:-1)*(open*7+pose.throat*.15);jaw.setAttribute('transform',`rotate(${angle.toFixed(3)} ${hinge[0]} ${hinge[1]})`);}
 for(const lid of rig.lids){const [x,y,rx,ry]=lid.dataset.eye.split(',').map(Number),b=pose[lid.dataset.lid+'Blink'],edge=y-ry+2*ry*b;lid.setAttribute('d',b<.001?'':`M${x-rx} ${y-ry}H${x+rx}V${edge}Q${x} ${edge+9*(1-b)} ${x-rx} ${edge}Z`);}
 if(rig.kind==='purple'){
  rig.svg.querySelector('[data-tongue-shape]').setAttribute('d',tongueRibbon(pose.tongue));const middle=tonguePoint(pose.tongue*.52),tip=pose.tip;rig.svg.querySelector('[data-tongue-shine]').setAttribute('d',pose.tongue>.02?`M890 508Q${middle.x} ${middle.y-8} ${tip.x-7} ${tip.y-7}`:'');drawFly(rig.flies[0],pose.prey,pose,.9);
 }else rig.flies.forEach((node,i)=>drawFly(node,pose.projectiles[i],pose,.65));
 rig.svg.dataset.phase=pose.phase;
}
export function installMenuAnimation(game){
 const originals=[game.ui.querySelector('img.menu-frogs-top'),game.ui.querySelector('img.menu-frogs-settings')];if(originals.some(i=>!i))return {update(){},inspect:()=>({ready:false})};
 const doc=game.ui.ownerDocument,rigs=[createRig(doc,originals[0],'top'),createRig(doc,originals[1],'purple')],motion=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)');let time=0,accumulator=0,ready=false,visible=false,painted=0,pose=menuPose(0);
 function draw(t,force=false){pose=menuPose(t,!force&&motion?.matches);for(const rig of rigs)drawRig(rig,pose);painted++;}
 Promise.all(originals.map(image=>image.decode())).then(()=>{for(const rig of rigs){rig.original.hidden=true;rig.original.classList.remove(rig.kind==='top'?'menu-frogs-top':'menu-frogs-settings');rig.svg.removeAttribute('hidden');rig.svg.dataset.ready='true';}ready=true;draw(0);}).catch(()=>{for(const rig of rigs)rig.svg.remove();});
 return {
  update(dt){visible=!doc.hidden&&!game.$('arcade-menu').hidden&&!game.$('menu-main').hidden&&game.$('settings-panel').hidden&&game.mode!=='result';if(!ready||!visible)return;if(motion?.matches){if(pose.time!==0)draw(0);return;}time+=Math.min(.05,Math.max(0,dt));accumulator+=dt;if(accumulator<1/30)return;accumulator%=1/30;draw(time);},
  seek(t){time=Math.max(0,t);accumulator=0;if(ready)draw(time,true);return pose;},
  inspect(){return {ready,visible,reducedMotion:!!motion?.matches,painted,...pose};},
 };
}
