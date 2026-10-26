import test from 'node:test';
import assert from 'node:assert/strict';
import {PerspectiveCamera,Scene,Vector3} from 'three';
import {cameraPose,CAMERA_ORBIT} from '../src/arcade-view-math.js';
import {normalizeCameraSettings,installCameraSettings} from '../src/arcade-camera-settings.js';

class Control extends EventTarget{constructor(){super();this.value='';this.textContent='';}}
function fixture(settings={}){
 const controls=Object.fromEntries(['camera-zoom','camera-zoom-value','camera-fov','camera-fov-value','camera-reset','camera-sensitivity','camera-sensitivity-value'].map(id=>[id,new Control()]));
 const game={settings:{volume:.4,quality:'low',...settings},state:{time:47,actors:[{x:3,z:5}]},elapsed:22,running:false,mode:'pause',viewMode:'chase3d',cameraYaw:.8,cameraPitch:.63,camera:new PerspectiveCamera(52,430/745,.1,250),focus:new Vector3(),cameraTarget:new Vector3(),scene:new Scene(),ground:()=>2,$:id=>controls[id],draws:[],labels:0,roofUpdates:[]};
 game.renderer={render:(scene,camera)=>{assert.equal(scene,game.scene);game.draws.push({fov:camera.fov,position:camera.position.toArray(),look:game.focus.toArray()});}};
 game.basesView={update:dt=>game.roofUpdates.push(dt)};game.drawLabels=()=>game.labels++;
 return {game,controls};
}
const distance=game=>game.camera.position.distanceTo(game.focus);

test('camera preferences restore valid persisted values and normalize corrupt or old settings without mutation',()=>{
 const source={cameraZoom:1.23,cameraFov:63.4,cameraSensitivity:1.23,volume:.3,quality:'high'},copy={...source};
 assert.deepEqual(normalizeCameraSettings(source),{cameraZoom:1.25,cameraFov:63,cameraSensitivity:1.25});assert.deepEqual(source,copy);
 for(const value of [undefined,null,{}, {volume:.7},{cameraZoom:NaN,cameraFov:Infinity,cameraSensitivity:NaN},{cameraZoom:'',cameraFov:false,cameraSensitivity:''}])assert.deepEqual(normalizeCameraSettings(value),{cameraZoom:1,cameraFov:52,cameraSensitivity:1});
 assert.deepEqual(normalizeCameraSettings({cameraZoom:'1.5',cameraFov:'80',cameraSensitivity:'1.5'}),{cameraZoom:1.5,cameraFov:80,cameraSensitivity:1.5});
 assert.deepEqual(normalizeCameraSettings({cameraZoom:-20,cameraFov:1000,cameraSensitivity:-100}),{cameraZoom:.7,cameraFov:80,cameraSensitivity:.25});
 assert.deepEqual(normalizeCameraSettings({cameraZoom:200,cameraFov:-10,cameraSensitivity:100}),{cameraZoom:1.5,cameraFov:40,cameraSensitivity:2});
});

test('zoom changes only distance around the same look point in rear and overview modes',()=>{
 for(const mode of ['chase3d','overview'])for(const aspect of [430/745,745/430,1.98]){
  const p={x:3,z:5},orbit={yaw:.7,pitch:CAMERA_ORBIT.pitch},base=cameraPose(p,2,aspect,mode,orbit);
  for(const zoom of [.7,1,1.5]){
   const changed=cameraPose(p,2,aspect,mode,{...orbit,zoom});assert.deepEqual(changed.look,base.look);
   for(let axis=0;axis<3;axis++)assert.ok(Math.abs((changed.position[axis]-changed.look[axis])*zoom-(base.position[axis]-base.look[axis]))<1e-10,'zoom preserves orientation while changing distance inversely');
  }
  assert.deepEqual(cameraPose(p,2,aspect,mode,{...orbit,zoom:NaN}),base);
  assert.deepEqual(cameraPose(p,2,aspect,mode,{...orbit,zoom:99}),cameraPose(p,2,aspect,mode,{...orbit,zoom:1.5}));
 }
});

test('settings bind without rendering or saving and display restored zoom, FOV and sensitivity',()=>{
 const {game,controls}=fixture({cameraZoom:1.3,cameraFov:67,cameraSensitivity:1.4});let saves=0;const cleanup=installCameraSettings(game,{onChange:()=>saves++});
 assert.equal(controls['camera-zoom'].value,'130');assert.equal(controls['camera-zoom-value'].textContent,'130%');assert.equal(controls['camera-fov'].value,'67');assert.equal(controls['camera-fov-value'].textContent,'67°');
 assert.equal(controls['camera-sensitivity'].value,'140');assert.equal(controls['camera-sensitivity-value'].textContent,'140%');
 assert.equal(controls['camera-sensitivity'].min,'25');assert.equal(controls['camera-sensitivity'].max,'200');assert.equal(controls['camera-sensitivity'].step,'5');
 assert.equal(controls['camera-follow'],undefined,'the old auto/manual selector is not required');
 assert.equal(game.draws.length,0);assert.equal(saves,0);cleanup();
});

test('native slider input changes the real paused camera immediately without advancing simulation',()=>{
 const {game,controls}=fixture(),saved=[];const cleanup=installCameraSettings(game,{onChange:value=>saved.push(value)});
 const initial=cameraPose(game.state.actors[0],2,game.camera.aspect,game.viewMode,{yaw:game.cameraYaw,pitch:game.cameraPitch}),range=new Vector3(...initial.position).distanceTo(new Vector3(...initial.look));
 controls['camera-zoom'].value='150';controls['camera-zoom'].dispatchEvent(new Event('input'));
 assert.equal(game.settings.cameraZoom,1.5);assert.ok(Math.abs(distance(game)-range/1.5)<1e-10);assert.equal(game.draws.length,1);assert.equal(game.cameraReady,true);
 const point=new Vector3(5,3,5),narrow=point.clone().project(game.camera),matrix=game.camera.projectionMatrix.clone();
 controls['camera-fov'].value='80';controls['camera-fov'].dispatchEvent(new Event('input'));const wide=point.clone().project(game.camera);
 assert.equal(game.camera.fov,80);assert.notDeepEqual(game.camera.projectionMatrix.elements,matrix.elements);assert.ok(Math.abs(wide.x)<Math.abs(narrow.x),'larger FOV really reveals a wider view');
 assert.equal(game.draws.length,2);assert.equal(game.labels,2);assert.deepEqual(game.roofUpdates,[0,0],'paused preview keeps roof cutaway valid without advancing it');
 assert.equal(game.state.time,47);assert.equal(game.elapsed,22);assert.equal(game.running,false);assert.equal(game.mode,'pause');
 assert.equal(game.cameraYaw,.8);assert.equal(game.cameraPitch,.63);assert.equal(controls['camera-fov-value'].textContent,'80°');
 assert.deepEqual(saved,[{cameraZoom:1.5,cameraFov:52,cameraSensitivity:1},{cameraZoom:1.5,cameraFov:80,cameraSensitivity:1}]);cleanup();
});

test('reset restores zoom, FOV and sensitivity while preserving deliberate orbit, view, audio and graphics choices',()=>{
 const {game,controls}=fixture({cameraZoom:.7,cameraFov:80,cameraSensitivity:1.75});game.viewMode='overview';let saved=0;const cleanup=installCameraSettings(game,{onChange:()=>saved++});
 controls['camera-reset'].dispatchEvent(new Event('click'));
 assert.deepEqual(game.settings,{volume:.4,quality:'low',cameraZoom:1,cameraFov:52,cameraSensitivity:1});assert.equal(game.camera.fov,52);assert.equal(game.cameraYaw,.8);assert.equal(game.cameraPitch,.63);assert.equal(game.viewMode,'overview');
 assert.equal(controls['camera-zoom'].value,'100');assert.equal(controls['camera-zoom-value'].textContent,'100%');assert.equal(controls['camera-fov-value'].textContent,'52°');assert.equal(saved,1);
 assert.equal(controls['camera-sensitivity'].value,'100');assert.equal(controls['camera-sensitivity-value'].textContent,'100%');
 const expected=cameraPose(game.state.actors[0],2,game.camera.aspect,'overview',{yaw:.8,pitch:.63,zoom:1});assert.deepEqual(game.camera.position.toArray(),expected.position);assert.deepEqual(game.focus.toArray(),expected.look);cleanup();
});

test('camera settings listeners can be removed without touching other native controls',()=>{
 const {game,controls}=fixture();let changes=0;const cleanup=installCameraSettings(game,{onChange:()=>changes++});cleanup();
 controls['camera-zoom'].value='150';controls['camera-zoom'].dispatchEvent(new Event('input'));controls['camera-reset'].dispatchEvent(new Event('click'));
 controls['camera-sensitivity'].value='200';controls['camera-sensitivity'].dispatchEvent(new Event('input'));
 assert.equal(changes,0);assert.equal(game.draws.length,0);assert.equal(game.settings.cameraZoom,1);assert.equal(game.settings.cameraSensitivity,1);
});

test('native sensitivity changes persist independently without changing view, zoom or FOV',()=>{
 const {game,controls}=fixture({cameraZoom:1.25,cameraFov:65});const saved=[];
 const cleanup=installCameraSettings(game,{onChange:value=>saved.push(value)});
 controls['camera-sensitivity'].value='175';controls['camera-sensitivity'].dispatchEvent(new Event('input'));
 assert.equal(game.settings.cameraSensitivity,1.75);assert.equal(game.settings.cameraZoom,1.25);assert.equal(game.settings.cameraFov,65);
 assert.equal(game.cameraYaw,.8);assert.equal(game.cameraPitch,.63);assert.equal(game.state.time,47);
 assert.equal(controls['camera-sensitivity-value'].textContent,'175%');
 assert.deepEqual(saved,[{cameraZoom:1.25,cameraFov:65,cameraSensitivity:1.75}]);
 assert.equal(normalizeCameraSettings(JSON.parse(JSON.stringify(game.settings))).cameraSensitivity,1.75,'the saved preference restores at the same multiplier');cleanup();
});

test('legacy auto/manual preferences cannot select or lock the direct mouse-look controller',()=>{
 for(const oldChoice of [true,false,'manual','broken']){
  const normalized=normalizeCameraSettings({cameraAutoRotate:oldChoice,cameraZoom:1.25,cameraFov:65});
  assert.deepEqual(normalized,{cameraZoom:1.25,cameraFov:65,cameraSensitivity:1});
  assert.ok(!Object.hasOwn(normalized,'cameraAutoRotate'));
  const {game,controls}=fixture({cameraAutoRotate:oldChoice,cameraZoom:1.25,cameraFov:65});const saved=[];
  const cleanup=installCameraSettings(game,{onChange:value=>saved.push(value)});
  assert.equal(controls['camera-follow'],undefined);
  assert.equal(game.settings.cameraSensitivity,1);
  controls['camera-sensitivity'].value='125';controls['camera-sensitivity'].dispatchEvent(new Event('input'));
  assert.deepEqual(saved,[{cameraZoom:1.25,cameraFov:65,cameraSensitivity:1.25}]);cleanup();
 }
});

test('paused settings preview uses live terrain-safe camera placement and refreshes roof visibility',()=>{
 const {game,controls}=fixture({cameraZoom:.7,cameraFov:52,cameraSensitivity:1});const calls=[];
 game.cameraPitch=-.5;game.cameraReady=true;
 game.updateCameraPose=dt=>{
  calls.push({dt,ready:game.cameraReady,zoom:game.settings.cameraZoom,pitch:game.cameraPitch});
  game.camera.position.set(3,2.35,4);game.focus.set(3,3.2,5);game.cameraTarget.copy(game.camera.position);game.camera.lookAt(game.focus);game.camera.updateMatrixWorld();game.cameraReady=true;
 };
 const cleanup=installCameraSettings(game);
 controls['camera-zoom'].value='150';controls['camera-zoom'].dispatchEvent(new Event('input'));
 assert.deepEqual(calls,[{dt:0,ready:false,zoom:1.5,pitch:-.5}]);
 assert.deepEqual(game.camera.position.toArray(),[3,2.35,4],'settings preserve the safe position chosen by the live camera implementation');
 assert.deepEqual(game.roofUpdates,[0]);assert.equal(game.draws.length,1);assert.equal(game.state.time,47);assert.equal(game.cameraPitch,-.5);cleanup();
});
