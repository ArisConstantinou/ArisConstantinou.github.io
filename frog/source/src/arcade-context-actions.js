import './arcade-context-actions.css';
import {RULES,kickAvailability,kickTarget,sabotageTarget} from './arcade-model.js';
import {BASES} from './arcade-bases.js';
import {nearbyCatapult} from './arcade-artillery.js';
import {FROG_BODY} from './arcade-actor-bounds.js';

const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const finite=(value,fallback=0)=>Number.isFinite(value)?value:fallback;
const box=(left,top,width,height)=>({left,top,right:left+width,bottom:top+height,width,height});
const overlaps=(a,b,gap=7)=>a.left<b.right+gap&&a.right>b.left-gap&&a.top<b.bottom+gap&&a.bottom>b.top-gap;
const finitePoint=p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.y);

// Reserve the visible body, including its low spread legs. A nearby button
// must never hide the frog it acts on, or the player's own body.
export function projectedActorRect(game,actor){
 const floor=game.ground(actor.x,actor.z)+finite(actor.height)+(actor.catapultId?FROG_BODY.mountedOffset:0),points=[];
 for(const dx of [-.95,.95])for(const dz of [-.95,.95])for(const dy of [-.05,FROG_BODY.height+.18]){
  const p=game.project(actor.x+dx,floor+dy,actor.z+dz);if(finitePoint(p)&&p.visible&&!p.behind)points.push(p);
 }
 if(!points.length)return null;
 const left=Math.max(0,Math.min(...points.map(p=>p.x))-4),right=Math.min(game.w,Math.max(...points.map(p=>p.x))+4),top=Math.max(0,Math.min(...points.map(p=>p.y))-4),bottom=Math.min(game.h,Math.max(...points.map(p=>p.y))+4);
 return right>left&&bottom>top?box(left,top,right-left,bottom-top):null;
}

// Find free space near the world anchor; the existing HUD/stick rectangles are
// obstacles, never objects that this layout is allowed to move.
export function placeContextAction({anchor,width,height,viewportWidth,viewportHeight,blocked=[],margin=8,previous=null}){
 const maxX=Math.max(margin,viewportWidth-width-margin),maxY=Math.max(margin,viewportHeight-height-margin);
 const clipped=p=>box(clamp(p.x,margin,maxX),clamp(p.y,margin,maxY),width,height);
 if(previous){const stable=clipped({x:previous.left+anchor.x-(previous.anchorX??anchor.x),y:previous.top+anchor.y-(previous.anchorY??anchor.y)});if(Math.hypot(stable.left+width/2-anchor.x,stable.top+height/2-anchor.y)<190&&!blocked.some(other=>overlaps(stable,other)))return stable;}
 const gap=24,candidates=[
  {x:anchor.x+gap,y:anchor.y-height/2},
  {x:anchor.x-gap-width,y:anchor.y-height/2},
  {x:anchor.x-width/2,y:anchor.y-gap-height},
  {x:anchor.x-width/2,y:anchor.y+gap},
  {x:anchor.x+gap,y:anchor.y-gap-height},
  {x:anchor.x-gap-width,y:anchor.y-gap-height},
 ];
 for(const obstacle of blocked){
  candidates.push({x:obstacle.left-width-8,y:anchor.y-height/2},{x:obstacle.right+8,y:anchor.y-height/2},{x:anchor.x-width/2,y:obstacle.top-height-8},{x:anchor.x-width/2,y:obstacle.bottom+8});
 }
 // Prefer the closest unobstructed side. A small local ring handles the space
 // between overlapping HUD obstacles without putting an action across the map.
 for(const radius of [56,80,112,144,184])for(let i=0;i<16;i++){
  const angle=i*Math.PI/8;candidates.push({x:anchor.x+Math.cos(angle)*radius-width/2,y:anchor.y+Math.sin(angle)*radius-height/2});
 }
 let best=null,score=Infinity;
 for(let i=0;i<candidates.length;i++){
  const rect=clipped(candidates[i]);if(blocked.some(other=>overlaps(rect,other)))continue;
  const distance=(rect.left+width/2-anchor.x)**2+(rect.top+height/2-anchor.y)**2+i*.01;
  if(distance<score){best=rect;score=distance;}
 }
 if(best)return best;
 // A cramped viewport may have no nearby slot. Search for the closest free
 // rectangle rather than covering a saved stick or making a button unreachable.
 for(let y=margin;y<=maxY;y+=16)for(let x=margin;x<=maxX;x+=16){
  const rect=clipped({x,y});if(blocked.some(other=>overlaps(rect,other)))continue;
  const distance=(rect.left+width/2-anchor.x)**2+(rect.top+height/2-anchor.y)**2;
  if(distance<score){best=rect;score=distance;}
 }
 return best;
}

export function contextualKickState(state,player,target){
 if(!player||!target||target.ko||target.eliminated||target.dizzyTime<=0)return {state:'unavailable',reason:'Δεν υπάρχει ζαλισμένος αντίπαλος εδώ',hint:'Περίμενε'};
 const readiness=kickAvailability(state,player,target.id),copy={
  ready:{reason:'Κλωτσιά στον συγκεκριμένο αντίπαλο από οποιαδήποτε κατεύθυνση',hint:''},
  range:{reason:'Πλησίασε τον αντίπαλο για κλωτσιά',hint:'Πλησίασε'},
  height:{reason:'Το διαφορετικό ύψος εμποδίζει την κλωτσιά',hint:'Άλλο ύψος'},
  wall:{reason:'Υπάρχει εμπόδιο ανάμεσά σας',hint:'Εμπόδιο'},
  protection:{reason:'Ο αντίπαλος προστατεύεται προσωρινά μετά την επιστροφή του',hint:'Προστασία'},
  cooldown:{reason:'Περίμενε να ετοιμαστεί η κλωτσιά',hint:`${Math.max(finite(player.kick),finite(player.kickCooldown)).toFixed(1)}″`},
  hit:{reason:'Περίμενε να τελειώσει το χτύπημα που δέχεσαι',hint:'Δέχεσαι χτύπημα'},
  mounted:{reason:'Κατέβα από τον καταπέλτη για κλωτσιά',hint:'Κατέβα'},
  incapacitated:{reason:'Περίμενε να ανακτήσεις τον έλεγχο του βατράχου',hint:'Περίμενε'},
 };
 return {state:readiness.state,...(copy[readiness.reason]||{reason:'Η κλωτσιά δεν είναι διαθέσιμη τώρα',hint:'Περίμενε'})};
}

export function installContextActions(game,{kickIcon=''}={}){
 const root=game.$('frog-actions');if(!root)return {update(){},clear(){},destroy(){}};
 const doc=root.ownerDocument,view=doc.defaultView,entries=new Map();let destroyed=false;
 const existing=[['catapult-button','catapult-status','catapult'],['sabotage-button','sabotage-status','sabotage']].map(([button,status,kind])=>({button:game.$(button),status:game.$(status),kind}));
 const active=()=>!destroyed&&game.running&&!game.layoutEditing&&game.state?.status==='playing'&&game.state.phase==='battle';
 const shown=element=>{
  if(!element||element.hidden||element.closest('[hidden]'))return false;
  const style=view.getComputedStyle(element);return style.display!=='none'&&style.visibility!=='hidden'&&style.visibility!=='collapse';
 };
 const screenPoint=(point,height=.6)=>{
  if(!point||!Number.isFinite(point.x)||!Number.isFinite(point.z))return null;
  const y=Number.isFinite(point.y)?point.y:game.ground(point.x,point.z)+height;
  const p=game.project(point.x,y,point.z);return finitePoint(p)&&p.visible&&p.x>=0&&p.x<=game.w&&p.y>=0&&p.y<=game.h?p:null;
 };
 const position=(element,rect)=>{
  element.style.setProperty('--context-x',`${Math.round(rect.left)}px`);element.style.setProperty('--context-y',`${Math.round(rect.top)}px`);element.style.visibility='visible';
 };
 const size=(element,width,height)=>{
  const rect=element.getBoundingClientRect();return {width:rect.width||width,height:rect.height||height};
 };
 const fixedRects=()=>{
  const rects=[];
  for(const element of doc.querySelectorAll('#arcade-hud > *, #minimap, #view-button, #round-status, #base-status, #dizzy-banner, #callout, #move-stick, #aim-stick, #layout-button, #kick-button, #keyboard-display, #mouse-display')){
   if(!shown(element))continue;const rect=element.getBoundingClientRect();if(rect.width>0&&rect.height>0)rects.push(box(rect.left,rect.top,rect.width,rect.height));
  }
  for(const [index,actor] of game.state.actors.entries()){
   if(actor.ko||actor.eliminated||game.models?.[index]?.group?.visible===false)continue;
   const rect=projectedActorRect(game,actor);if(rect)rects.push(rect);
  }
  return rects;
 };
 const makeEntry=id=>{
  const button=doc.createElement('button');button.type='button';button.className='frog-action world-context';button.dataset.targetId=id;button.hidden=true;
  button.innerHTML=`<span class="frog-action-stars" aria-hidden="true">✦ ✦</span><span class="frog-action-icon" aria-hidden="true">${kickIcon}</span><span class="frog-action-pips" aria-hidden="true">${Array.from({length:RULES.finishHits},()=>'<i class="finish-pip"></i>').join('')}</span><span class="frog-action-caption"></span><kbd class="frog-action-key" hidden>Q</kbd>`;
  const caption=button.querySelector('.frog-action-caption'),badge=button.querySelector('.frog-action-key'),pips=[...button.querySelectorAll('.finish-pip')];
  const timer=doc.createElement('span');timer.className='frog-action-time';button.append(timer);
  const activate=event=>{
   event.stopPropagation();if(event.type==='pointerdown')event.preventDefault();
   if(event.type==='click'&&event.detail!==0||event.type==='pointerdown'&&event.pointerType==='mouse'&&event.button!==0)return;
   const target=game.state.actors.find(actor=>actor.id===id),player=game.state.actors[0];
   if(!active()||button.hidden||button.disabled||contextualKickState(game.state,player,target).state!=='ready')return;
   game.pendingKickTargetId=id;
   game.queueKick?.(id);
  };
  button.addEventListener('pointerdown',activate);button.addEventListener('click',activate);root.append(button);
  const entry={button,caption,badge,pips,timer,rect:null,remove(){button.removeEventListener('pointerdown',activate);button.removeEventListener('click',activate);button.remove();}};
  entries.set(id,entry);return entry;
 };
 const clear=()=>{
  game.pendingKickTargetId=null;root.hidden=true;for(const entry of entries.values())entry.button.hidden=true;
  for(const pair of existing)for(const element of [pair.button,pair.status])if(element)element.style.visibility='hidden';
 };
 const update=()=>{
  if(!active()){clear();return;}
  root.hidden=false;const state=game.state,player=state.actors[0],nearest=kickTarget(state,player),blocked=fixedRects(),live=new Set();
  for(const actor of state.actors){
   if(actor.id===player.id)continue;live.add(actor.id);const entry=entries.get(actor.id)||makeEntry(actor.id),button=entry.button;
   const anchor=actor.dizzyTime>0&&!actor.ko&&!actor.eliminated?screenPoint({x:actor.x,z:actor.z},finite(actor.height)+.7):null;
    if(!anchor){button.hidden=true;entry.rect=null;continue;}
   const progress=clamp(Math.floor(finite(actor.finishHits)),0,RULES.finishHits),remaining=Math.max(1,RULES.finishHits-progress),readiness=contextualKickState(state,player,actor),ready=readiness.state==='ready';
   button.dataset.remaining=String(remaining);button.dataset.state=readiness.state;button.disabled=!ready;button.hidden=false;
    const timerText=`ΖΑΛΗ ${Math.max(0,actor.dizzyTime).toFixed(1)}″`;if(entry.timer.textContent!==timerText)entry.timer.textContent=timerText;
   const progressText=remaining===1?'Απομένει 1 χτύπημα για KO':`Απομένουν ${remaining} χτυπήματα για KO`,label=`${readiness.reason}. ${progressText}.`;
   button.setAttribute('aria-label',label);button.title=label;entry.caption.textContent=ready?(remaining===1?'KO':'ΚΛΩΤΣΙΑ'):readiness.hint;
   entry.badge.hidden=game.touch||!ready||nearest?.id!==actor.id;
   entry.pips.forEach((pip,index)=>pip.classList.toggle('is-filled',index<progress));
    const dimensions=size(button,88,103),rect=placeContextAction({anchor,...dimensions,viewportWidth:game.w,viewportHeight:game.h,blocked,previous:entry.rect});
    if(!rect){button.hidden=true;continue;}entry.rect={...rect,anchorX:anchor.x,anchorY:anchor.y};position(button,rect);blocked.push(rect);
  }
  for(const [id,entry] of entries)if(!live.has(id)){entry.remove();entries.delete(id);}
  for(const pair of existing){
   const {button,status,kind}=pair;if(!button)continue;
   const fallback=kind==='catapult'?(state.catapults?.find(machine=>machine.id===player.catapultId)||nearbyCatapult(state,player)):BASES.find(base=>base.id===sabotageTarget(state,player)?.id)?.stock;
   const supplied=kind==='catapult'?game.currentCatapultContext:game.currentSabotageContext,anchor=screenPoint(supplied===undefined?fallback:supplied,kind==='catapult'?1.1:.8);
   if(button.hidden||!anchor){button.style.visibility='hidden';if(status)status.style.visibility='hidden';continue;}
   const buttonSize=size(button,72,72),hasStatus=!!status&&!status.hidden,statusSize=hasStatus?size(status,170,38):{width:0,height:0};
   const width=Math.max(buttonSize.width,statusSize.width),height=buttonSize.height+(hasStatus?statusSize.height+6:0),rect=placeContextAction({anchor,width,height,viewportWidth:game.w,viewportHeight:game.h,blocked});
   if(!rect){button.style.visibility='hidden';if(status)status.style.visibility='hidden';continue;}
   position(button,box(rect.left+(width-buttonSize.width)/2,rect.top,buttonSize.width,buttonSize.height));
   if(hasStatus)position(status,box(rect.left+(width-statusSize.width)/2,rect.top+buttonSize.height+6,statusSize.width,statusSize.height));else if(status)status.style.visibility='hidden';
   blocked.push(rect);
  }
 };
 clear();
 return {update,clear,destroy(){if(destroyed)return;destroyed=true;clear();for(const entry of entries.values())entry.remove();entries.clear();for(const pair of existing)for(const element of [pair.button,pair.status])if(element){element.style.removeProperty('--context-x');element.style.removeProperty('--context-y');element.style.removeProperty('visibility');}}};
}
