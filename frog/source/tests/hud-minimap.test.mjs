import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';

const bundled=await build({entryPoints:[fileURLToPath(new URL('../src/ui.js',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm',loader:{'.css':'empty'},logLevel:'silent'});
const {GameUI}=await import('data:text/javascript;base64,'+Buffer.from(bundled.outputFiles[0].text+'\n//# sourceURL=frog-minimap-headless.mjs').toString('base64'));

function fixture(){
  const ui=Object.create(GameUI.prototype),actions=[],draws=[],labels=[];
  let translation=[0,0];const stack=[];
  const context=new Proxy({
    save(){stack.push([...translation]);},restore(){translation=stack.pop()||[0,0];},
    translate(x,y){translation=[translation[0]+x,translation[1]+y];},
    drawImage(image,x,y,w,h){draws.push({type:image.type,x:translation[0]+x,y:translation[1]+y,w,h});},
    fillText(text){labels.push(text);}
  },{get:(target,key)=>target[key]??(()=>{})});
  const canvas={width:440,height:440,getContext:()=>context};
  Object.assign(ui,{state:{},refs:{mapBosses:{hidden:true,innerHTML:''}},callbacks:{onAction:(action,data)=>actions.push({action,data})},mapCreatureImage:type=>({type,complete:true,naturalWidth:64}),emblemImage:()=>({complete:false})});
  return {ui,canvas,draws,labels,actions};
}

test('map is visible in the gameplay HUD and clicking it expands without a separate map-reveal step',()=>{
  const {ui,actions}=fixture(),html=ui.markup();
  const canvas=html.match(/<canvas[^>]*data-ref="minimap"[^>]*>/)?.[0];
  assert.ok(canvas);assert.doesNotMatch(canvas,/\bhidden\b/);assert.match(canvas,/width="440"/);
  assert.match(html,/class="fg-map-button fg-live-minimap" data-action="open-map"/);
  const target={dataset:{action:'open-map'},closest(){return this;}};
  ui.click({target,stopPropagation(){}});
  assert.deepEqual(actions,[{action:'panel-open',data:{name:'map'}}]);
});

test('live boss markers use species icons, track movement across the expanded lake and disappear on death',()=>{
  const {ui,canvas,draws}=fixture();
  const boss={id:'snake-boss',type:'snake',x:140,z:-120,hp:800,boss:true,phase:'stalk'};
  const world={radius:190,player:{x:0,z:0},predators:[boss,{type:'fish',x:10,z:10,hp:700,boss:true,phase:'dormant'},{type:'heron',hp:0,boss:true},{type:'fish',hp:100,boss:true,dead:true},{type:'heron',hp:500,boss:false}]};
  ui.drawMap(canvas,world);
  assert.equal(draws.length,1);assert.equal(draws[0].type,'snake');
  const first={...draws[0]};assert.ok(first.x>0&&first.x+first.w<canvas.width);assert.ok(first.y>0&&first.y+first.h<canvas.height);
  boss.x-=30;boss.z+=20;draws.length=0;ui.drawMap(canvas,world);
  assert.equal(draws.length,1);
  const scale=(440-96)/(190*2);
  assert.ok(Math.abs(draws[0].x-first.x+30*scale)<1e-8);
  assert.ok(Math.abs(draws[0].y-first.y-20*scale)<1e-8);
  boss.x=188;boss.z=-188;draws.length=0;ui.drawMap(canvas,world);
  assert.ok(draws[0].x>0&&draws[0].x+draws[0].w<canvas.width);
  assert.ok(draws[0].y>0&&draws[0].y+draws[0].h<canvas.height);
  boss.hp=0;draws.length=0;ui.drawMap(canvas,world);assert.equal(draws.length,0);
});

test('boss status appears at spawn, excludes dormant threats, and the large map identifies each species',()=>{
  const {ui,canvas,draws,labels}=fixture();
  const world={predators:[{id:'b1',type:'heron',hp:600,boss:true,phase:'dormant'}]};
  ui.updateMapBosses(world);assert.equal(ui.refs.mapBosses.hidden,true);
  world.predators[0].phase='stalk';ui.updateMapBosses(world);
  assert.equal(ui.refs.mapBosses.hidden,false);assert.match(ui.refs.mapBosses.innerHTML,/Ενεργός αρχηγός: Ερωδιός/);
  world.predators.push({id:'b2',type:'snake',hp:400,boss:true},{id:'b3',type:'fish',hp:800,boss:true});
  ui.drawMap({...canvas,width:1024,height:720},world,true);
  assert.deepEqual(draws.map(d=>d.type),['heron','snake','fish']);
  for(const name of ['Αρχηγός · Ερωδιός','Αρχηγός · Νερόφιδο','Αρχηγός · Αρπακτικό ψάρι'])assert.ok(labels.includes(name));
  for(const p of world.predators)p.dead=true;
  ui.updateMapBosses(world);assert.equal(ui.refs.mapBosses.hidden,true);assert.equal(ui.refs.mapBosses.innerHTML,'');
});

test('building choices explain their benefit and a full yard before purchase, with honest housing counts',()=>{
  const {ui}=fixture();ui.portraits={};ui.portraitCache=new Map();ui.rosterFilter='all';
  ui.state={capacity:8,allies:[{id:'a1',hp:100,maxHp:100,role:'hunter'}],resources:{food:80,reeds:90},currentCamp:{id:'home',name:'Αρχική βάση',team:'ally',hp:350,maxHp:350,buildings:{store:true,nursery:true},slotsUsed:2,slotsTotal:2},buildOptions:[{type:'training',name:'Εκπαίδευση',description:'Ενισχύει τους υπάρχοντες μαχητές.',cost:{food:18,reeds:24},enabled:false,reason:'Γεμάτη αυλή · αναβάθμισε τη βάση.'}]};
  const build=ui.buildMarkup(),roster=ui.rosterMarkup();
  assert.match(build,/fg-building-slots is-full/);assert.match(build,/<b>2 \/ 2<\/b>/);
  assert.match(build,/fg-building-description">Ενισχύει τους υπάρχοντες μαχητές/);
  assert.match(build,/fg-building-reason">Γεμάτη αυλή · αναβάθμισε τη βάση/);
  assert.match(roster,/Σύμμαχοι \/ θέσεις στέγασης/);assert.match(roster,/<b>1<\/b><small>\/ 8<\/small>/);
  assert.doesNotMatch(build+roster,/απεριόριστ/);
});
