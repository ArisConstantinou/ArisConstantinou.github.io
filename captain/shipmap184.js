import * as T from 'three';
import {DECKS,DESTINATIONS,STAIRS,zoneAt,deckWidth} from './shipwalk184.js';
export function installShipMap({ship,root,hud,getPosition,getSolids,navigator,onToggle}){
 const toggleButton=document.createElement('button');toggleButton.id='shipMapButton184';toggleButton.hidden=true;toggleButton.innerHTML='<span>⌖</span><b>ΧΑΡΤΗΣ</b><small></small>';root.append(toggleButton);
 const panel=document.createElement('section');panel.id='shipMap184';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-label','Χάρτης πλοίου');panel.innerHTML='<div class="shipmap-card"><header><span>MS AURORA · ΕΞΕΡΕΥΝΗΣΗ</span><button id="closeShipMap184" aria-label="Κλείσιμο χάρτη">✕</button></header><h2>Πού θέλεις να πας;</h2><p>Διάλεξε προορισμό. Τα φωτεινά σημάδια δείχνουν τη διαδρομή — δεν γίνεται τηλεμεταφορά.</p><div id="shipmapDestinations184"></div><small id="shipmapRouteStatus184"></small><footer>Έξι καταστρώματα · Σκάλες εμπρός και πίσω · 8 επισκέψιμες καμπίνες</footer></div>';document.getElementById('game').append(panel);
 const status=panel.querySelector('#shipmapRouteStatus184'),list=panel.querySelector('#shipmapDestinations184');let visible=false,opened=false,target=null,points=[],lastUpdate=-99,lastPath=-99;
 const trail=new T.InstancedMesh(new T.CircleGeometry(.12,9),new T.MeshBasicMaterial({color:0x7de3d0,transparent:true,opacity:.8,depthWrite:false,side:T.DoubleSide}),160);trail.name='Route guidance';trail.count=0;trail.frustumCulled=false;ship.group.add(trail);const temp=new T.Object3D();
 for(const d of DECKS){const section=document.createElement('div');section.className='shipmap-deck';section.innerHTML='<h3>'+d.name+'</h3>';for(const goal of DESTINATIONS.filter(g=>Math.abs(g.y-d.y)<.2)){const b=document.createElement('button');b.textContent=goal.name;b.dataset.destination=goal.id;b.onclick=()=>{const p=getPosition();points=navigator.path(p,goal,getSolids());if(!points.length){status.textContent='Πλησίασε λίγο το κέντρο του διαδρόμου και δοκίμασε ξανά.';return;}target=goal;lastPath=-99;close();};section.append(b);}list.append(section);}
 function open(){if(!visible)return;opened=true;panel.hidden=false;status.textContent='Το παιχνίδι είναι σε παύση όσο κοιτάς τον χάρτη.';onToggle(true);}
 function close(){opened=false;panel.hidden=true;onToggle(false);}
 toggleButton.onclick=()=>opened?close():open();panel.querySelector('#closeShipMap184').onclick=close;
 panel.addEventListener('keydown',e=>{if(e.code==='Escape'){e.preventDefault();e.stopPropagation();close();}});
 function sync(v){visible=!!v;toggleButton.hidden=!visible;if(!visible){trail.count=0;if(opened){opened=false;panel.hidden=true;}}}
 function update(time){if(!visible)return;const p=getPosition();toggleButton.querySelector('small').textContent=zoneAt(p);if(time-lastUpdate<.35)return;lastUpdate=time;
  if(!target){trail.count=0;return;}if(Math.hypot(p.x-target.x,p.z-target.z)<1.8&&Math.abs(p.y-target.y)<.7){target=null;points=[];trail.count=0;return;}
  if(time-lastPath>3){points=navigator.path(p,target,getSolids());lastPath=time;}
  let count=0;for(const q of points){if(count>=160)break;if(Math.abs(q.y-p.y)>3.4)continue;temp.position.set(q.x,q.y+.08,q.z);temp.rotation.set(-Math.PI/2,0,0);temp.scale.setScalar(1);temp.updateMatrix();trail.setMatrixAt(count++,temp.matrix);}trail.count=count;trail.instanceMatrix.needsUpdate=true;toggleButton.querySelector('b').textContent=target?'ΠΡΟΣ '+target.name:'ΧΑΡΤΗΣ';
 }
 function reset(){opened=false;panel.hidden=true;target=null;points=[];trail.count=0;toggleButton.querySelector('b').textContent='ΧΑΡΤΗΣ';sync(false);lastPath=lastUpdate=-99;}
 return {sync,update,reset,toggle:()=>opened?close():open(),get open(){return opened;},inspect:()=>({open:opened,target:target?.id,points:points.length})};
}
