import test from 'node:test';
import assert from 'node:assert/strict';
import {Ray,Vector3,Box3,Triangle} from 'three';
import {newRound,projectileOrigin,setProjectileWorld,traceWorldRay} from '../src/arcade-model.js';
import {autoFireTargetVisible} from '../src/arcade-auto-fire-visibility.js';

function fixture(ground){
 const state=newRound();state.phase='battle';state.intro=0;
 Object.assign(state.actors[0],{x:0,z:8,height:0});
 Object.assign(state.actors[1],{x:0,z:0,height:0});
 Object.assign(state.actors[2],{ko:true});
 if(ground)setProjectileWorld(state,{ground});
 const target=state.actors[1],camera={position:new Vector3(0,8,12)},point=projectileOrigin(state,target);
 const ray=new Ray(camera.position.clone(),new Vector3(point.x,point.y,point.z).sub(camera.position).normalize());
 const game={state,camera,aim:{x:0,z:-1},mouse:{valid:true,targetId:target.id,target:point},mouseRay:{ray},basesView:{bases:new Map()}};
 return {game,target};
}
const directional=game=>autoFireTargetVisible(game,'rival-1',{directional:true});
function visual({roof=false,basket=false,opacity=1,z=6}={}){
 const a=new Vector3(-3,4,z-3),b=new Vector3(3,4,z-3),c=new Vector3(3,4,z+3),d=new Vector3(-3,4,z+3);
 return {roof:{visible:roof},roofMaterial:{opacity},roofTriangles:[new Triangle(a,b,c),new Triangle(a,c,d)],roofBounds:new Box3().setFromPoints([a,b,c,d]),cabin:{visible:basket},stockMaterials:[{opacity}],stockBounds:new Box3(new Vector3(-1,3,z-1),new Vector3(1,5,z+1))};
}

test('point aim requires the current valid matching camera target',()=>{
 const {game}=fixture();assert.equal(autoFireTargetVisible(game,'rival-1'),true);
 assert.equal(autoFireTargetVisible(game,'rival-2'),false);
 game.mouse.valid=false;assert.equal(autoFireTargetVisible(game,'rival-1'),false);
 game.mouse.valid=true;game.mouse.target=null;assert.equal(autoFireTargetVisible(game,'rival-1'),false);
 assert.equal(autoFireTargetVisible(game,null),false);
});

test('directional overview derives visibility from the current target and ignores stale cursor state',()=>{
 const {game,target}=fixture();
 game.mouse={valid:false,targetId:'rival-2',target:{x:999,y:999,z:999}};
 game.mouseRay.ray.set(new Vector3(100,100,100),new Vector3(1,0,0));
 assert.equal(directional(game),true);
 Object.assign(target,{x:4,z:1});
 assert.equal(directional(game),true,'target movement must derive a new ray rather than reuse a previous cursor or cached aim');
 target.ko=true;assert.equal(directional(game),false);
 target.ko=false;target.eliminated=true;assert.equal(directional(game),false);
 assert.equal(autoFireTargetVisible(game,'missing',{directional:true}),false);
 assert.equal(autoFireTargetVisible(game,'player',{directional:true}),false);
});

test('directional camera sight uses actual elevated and airborne body heights',()=>{
 const {game,target}=fixture((x,z)=>z<2?2:0);
 target.height=2;
 const staleFlatHit=traceWorldRay(game.state,game.camera.position,{x:0,y:-7.55,z:-12},15,{ignoreId:'player'});
 assert.notEqual(staleFlatHit?.targetId,target.id,'a stale ground-level ray cannot see this raised body');
 assert.equal(directional(game),true);
 target.catapultId='example-mounted';assert.equal(directional(game),true,'the elevated mounted-body offset is respected too');
});

test('directional sight rejects a real wall, a rock and a terrain ridge before the target',()=>{
 const wall=fixture();Object.assign(wall.game.state.actors[0],{x:2.2,z:15});Object.assign(wall.target,{x:2.2,z:20.5});wall.game.camera.position.set(2.2,1,14);
 assert.equal(directional(wall.game),false);
 const rock=fixture();Object.assign(rock.game.state.actors[0],{x:-8,z:8});Object.assign(rock.target,{x:-8,z:-5});rock.game.camera.position.set(-8,1,10);
 assert.equal(directional(rock.game),false);
 const ridge=fixture((x,z)=>z>5.1&&z<5.4?5:0);
 assert.equal(directional(ridge.game),false);
});

test('directional sight cannot acquire a farther target through another live body',()=>{
 const {game}=fixture();game.camera.position.set(0,.6,12);
 Object.assign(game.state.actors[2],{ko:false,x:0,z:4,height:0});
 assert.equal(directional(game),false);
 game.state.actors[2].ko=true;assert.equal(directional(game),true);
});

for(const direction of [false,true]){
 test(`${direction?'directional':'point'} visibility blocks opaque roofs and baskets but respects cutaways`,()=>{
  const {game}=fixture(),check=()=>autoFireTargetVisible(game,'rival-1',{directional:direction});
  const roof=visual({roof:true});game.basesView.bases.set('roof',roof);
  assert.equal(check(),false);roof.roof.visible=false;assert.equal(check(),true);
  roof.roof.visible=true;roof.roofMaterial.opacity=.5;assert.equal(check(),true);
  roof.roofMaterial.opacity=.51;assert.equal(check(),false);
  game.basesView.bases.clear();const basket=visual({basket:true});game.basesView.bases.set('basket',basket);
  assert.equal(check(),false);basket.stockMaterials[0].opacity=.5;assert.equal(check(),true);
  basket.stockMaterials[0].opacity=1;basket.cabin.visible=false;assert.equal(check(),true);
 });
 test(`${direction?'directional':'point'} scenery behind the target does not occlude it`,()=>{
  const {game}=fixture();game.basesView.bases.set('behind',visual({roof:true,basket:true,z:-10}));
  assert.equal(autoFireTargetVisible(game,'rival-1',{directional:direction}),true);
 });
}

test('visibility never mutates the simulation, camera, stored aim or cursor ray',()=>{
 const {game}=fixture();game.basesView.bases.set('clear',visual({roof:false,basket:false}));
 const snapshot=()=>({state:structuredClone(game.state),camera:game.camera.position.toArray(),aim:{...game.aim},mouse:structuredClone(game.mouse),ray:{origin:game.mouseRay.ray.origin.toArray(),direction:game.mouseRay.ray.direction.toArray()},visual:game.basesView.bases.get('clear').roofMaterial.opacity});
 const before=snapshot();
 for(let i=0;i<4;i++){assert.equal(autoFireTargetVisible(game,'rival-1'),true);assert.equal(directional(game),true);}
 assert.deepEqual(snapshot(),before);
});
