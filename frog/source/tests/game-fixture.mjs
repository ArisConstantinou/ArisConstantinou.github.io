import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import * as THREE from 'three';
import {createCampaign} from '../src/campaign.js';

const root=path.dirname(fileURLToPath(new URL('../package.json',import.meta.url)));
const noop=()=>{};
const bundled=await build({
  entryPoints:[path.join(root,'src/game.js')],bundle:true,write:false,platform:'node',format:'esm',loader:{'.css':'empty'},logLevel:'silent',
  plugins:[{name:'headless-model-boundary',setup(builder){
    builder.onLoad({filter:/[/\\]src[/\\]creatures\.js$/},()=>({loader:'js',resolveDir:root,contents:
      "import * as THREE from 'three'; export function createCreature(){ const group=new THREE.Group(); return {group, stats:{bones:16,vertices:500},setOutline(){},setTier(){},animate(){},update(){},dispose(){}}; }"}));
  }}]
});
export const {FrogGame}=await import('data:text/javascript;base64,'+Buffer.from(bundled.outputFiles[0].text+'\n//# sourceURL=frog-game-headless.mjs').toString('base64'));

export function actor(overrides={}){
  return {id:'actor',name:'Test frog',team:'ally',role:'scout',x:0,y:.35,z:0,yaw:0,hp:100,maxHp:100,stomach:100,maxStomach:100,level:1,tier:1,xp:0,morale:100,dead:false,surrendered:false,grounded:true,swimming:false,vx:0,vz:0,vy:0,speed:0,jump:0,jumpTime:0,attackCD:0,specialCD:99,roarCD:99,invulnerable:0,stun:0,eatCD:0,fear:0,brain:10,guard:false,home:null,seed:1,thinkOffset:.2,order:'follow',trained:false,trainingPaid:false,trainingProgress:0,trainingCamp:null,returnOrder:'follow',model:{setOutline:noop,setTier:noop,group:new THREE.Group()},...overrides};
}
export function camp(overrides={}){
  return {id:'camp',name:'Test camp',team:'enemy0',x:1,z:1,hp:350,maxHp:350,tier:1,stock:{food:30,reeds:40},buildings:{},morale:100,destroyed:false,originalEnemy:true,spawnTimer:0,mealCount:0,mealDay:0,mesh:{},...overrides};
}
export function fixture(){
  const game=Object.create(FrogGame.prototype),player=actor({id:'player',team:'player',hp:120,maxHp:120,stamina:100,maxStamina:100});
  const messages=[],storage=new Map();
  Object.assign(game,{
    player,frogs:[player],predators:[],camps:[],resources:{food:100,reeds:100},elapsed:1000,graceUntil:0,command:'follow',targetCommand:null,random:()=>.5,idCounter:0,nextRaid:Infinity,stats:game.emptyStats(),
    campaign:createCampaign(),campaignCheckAt:0,selectedIds:new Set(),portraitQueue:[],started:true,paused:false,ended:false,won:false,savedAt:null,
    scene:new THREE.Scene(),cameraFocus:new THREE.Vector3(),cameraYaw:0,frameTime:0,
    world:{hotspots:[],campSites:[],sampleHeight:()=>.35,getSurface:()=>({height:.35,type:'land',platform:null}),splash:noop,impact:noop,updateShelter:noop,createShelter:()=>({}),removeShelter:noop},
    ui:{toast:(...args)=>messages.push(args),renderPanel:noop,update:noop,showVictory:noop,showEnd:noop,showEnding:noop,showPause:noop,setPortrait:noop,portraits:{},closePanels:noop},
    audio:{play:noop},vfx:{number:noop,tongue:noop,cue:noop,strike:noop,clear:noop},
    input:{clear:noop,unlock:noop,lock:noop,mouse:{x:0,y:0},hit:()=>false,down:()=>false},
    save:()=>true,updateUI:noop,updateCamera:noop,updateFrogPortrait:noop,
  });
  return {game,player,messages,storage};
}
export function installStorage(t,storage){
  const original=globalThis.localStorage;
  globalThis.localStorage={getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,String(value)),removeItem:key=>storage.delete(key)};
  t.after(()=>{if(original===undefined)delete globalThis.localStorage;else globalThis.localStorage=original;});
}

