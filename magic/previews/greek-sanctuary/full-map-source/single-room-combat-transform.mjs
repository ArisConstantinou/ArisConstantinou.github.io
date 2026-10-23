import {createSingleRoomPlugin} from './single-room-transform.mjs';
import {fileURLToPath} from 'node:url';
const original=createSingleRoomPlugin({combat:true});
const controller=(process.env.MAGIC_SINGLE_ROOM_SOURCE?process.env.MAGIC_SINGLE_ROOM_SOURCE+'/game/src/single-room-combat.js':fileURLToPath(new URL('../../.source/combat-fps-20261021/source/game/src/single-room-combat.js',import.meta.url))).replaceAll('\\','/');
const replace=(s,a,b)=>{if(s.split(a).length!==2)throw Error('Combat fixture anchor: '+a);return s.replace(a,b);};
export const singleRoomCombatPlugin={name:'magic-live-single-room-combat',async transform(input,id){
 let code=original.transform(input,id)?.code??input;
 const name=id.replaceAll('\\','/');
 if(name.endsWith('/src/hearth-system.js')){
  code=replace(code,'dispose();const accessible=createHearthAccess(worldMap,getGates());','dispose();');
  code=replace(code,'const location=placeHearth(Math.random,(p,r)=>footprintClear(p,r)&&accessible(p),previousRoom,hearthSpawnRooms(worldMap.zones,worldMap.spawn,worldMap.doorways));previousRoom=location.room.name;',"const location={x:0,z:19,room:worldMap.zones.find(r=>r.name==='courtyard')};if(!location.room||!footprintClear(location,1.8))throw Error('Diagnostic HEARTH spawn has no clear support');previousRoom=location.room.name;");
 }
 if(name.endsWith('/src/spawn-rules.js'))code=replace(code,'export function hearthSpawnRooms(zones, spawn, doorways=null) {',"export function hearthSpawnRooms(zones, spawn, doorways=null) {return zones.filter(r=>r.name==='courtyard');");
 if(name.endsWith('/src/performance-test.js'))code=replace(code,"export const benchmarkMode=typeof location!=='undefined'&&new URL(location.href).searchParams.get('benchmark')==='1';",'export const benchmarkMode=false;');
 if(name.endsWith('/src/main.js')){
  code=`import {createSingleRoomCombat} from '${controller}';\n`+code;
  code=code.replaceAll('await prepareRunShaders({renderer,scene,camera,quality,composer,objects:', 'singleRoomCombat.prepared(await prepareRunShaders({renderer,scene,camera,quality,composer,pointLightVariants:activePointLights.snapshot().enabled,objects:').replaceAll("map(e=>e.mesh)});","map(e=>e.mesh)}));");
  code=replace(code,'if(benchmarkMode){const memory=new Map();','if(true){const memory=new Map();');
  code=replace(code,'if(!benchmarkMode)boot();',`const singleRoomCombat=createSingleRoomCombat(()=>({version:packageInfo.version,player,entities,actor,hearth,world:worldMap,nav,renderer,scene,physics,activePointLights,staticShadowCache,quality,sound,ui,aimPoint,aimDirection,phase,start:startPreparedRun,suspend:()=>{phase='benchmark-results';sound.setPaused(true);sound.setFlamethrower(false);},resources:()=>({...estimateResources(renderer,scene,[moon?.shadow.map,environmentTarget,composer?.renderTarget1,composer?.renderTarget2]),textureLifecycle:textureMemoryStats()})}));\nif(!benchmarkMode)boot();`);
  code=replace(code,'// Settle dynamic props before input begins.','singleRoomCombat.populate();\n  // Settle dynamic props before input begins.');
  code=replace(code,"phase='playing';ui.start();setPlayCamera();","phase='playing';ui.start();setPlayCamera();singleRoomCombat.begin();");
  code=replace(code,'function updateEnemy(e,dt){','function updateEnemy(e,dt){if(singleRoomCombat.holdEnemies)return;');
  code=replace(code,'chooseTarget(input);','singleRoomCombat.aim();chooseTarget(input);');
  code=replace(code,'updatePlayer(dt,input);','singleRoomCombat.control(input,dt);updatePlayer(dt,input);');
  code=replace(code,'e.hp=e.isPlayer&&benchmarkMode?e.maxHp:Math.max(0,e.hp-amount);','e.hp=e.isPlayer?e.maxHp:Math.max(0,e.hp-amount);singleRoomCombat.hit(e,amount);');
  code=replace(code,'if(!manual)performanceTest?.beginFrame(phase);','if(!manual)performanceTest?.beginFrame(phase);if(!manual)singleRoomCombat.beginFrame(phase);');
  code=code.replaceAll('performanceTest?.mark(','singleRoomCombat.mark(');
  code=replace(code,'performanceTest?.beginRender(renderer);','performanceTest?.beginRender(renderer);singleRoomCombat.beginRender();');
  code=replace(code,'performanceTest?.endFrame(renderer);','performanceTest?.endFrame(renderer);singleRoomCombat.endFrame();');
  code=replace(code,"ui.showMenu(save.profile);if(!candidate)void gameUpdates.check();","ui.showMenu(save.profile);singleRoomCombat.ready();if(!candidate)void gameUpdates.check();");
  code=replace(code,"onBenchmark:()=>{const url=new URL(location.href);url.searchParams.set('benchmark','1');location.assign(url.href);},","onBenchmark:()=>singleRoomCombat.show(),");
 }
 return code===input?null:{code,map:null};
}};
