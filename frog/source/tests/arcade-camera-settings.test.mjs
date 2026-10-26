import test from 'node:test';
import assert from 'node:assert/strict';
import {PerspectiveCamera,Scene,Vector3} from 'three';
import {cameraPose,CAMERA_ORBIT} from '../src/arcade-view-math.js';
import {normalizeCameraSettings,installCameraSettings} from '../src/arcade-camera-settings.js';

class Control extends EventTarget{constructor(){super();this.value='';this.textContent='';}}
function fixture(settings={}){
 const controls=Object.fromEntries(['camera-zoom','camera-zoom-value','camera-fov','camera-fov-value','camera-reset','camera-follow'].map(id=>[id,new Control()]));
 const game={settings:{volume:.4,quality:'low',...settings},state:{time:47,actors:[{x:3,z:5}]},elapsed:22,running:false,mode:'pause',viewMode:'chase3d',cameraYaw:.8,cameraPitch:.63,camera:new PerspectiveCamera(52,430/745,.1,250),focus:new Vector3(),cameraTarget:new Vector3(),scene:new Scene(),ground:()=>2,$:id=>controls[id],draws:[],labels:0,roofUpdates:[]};
 game.renderer={render:(scene,camera)=>{assert.equal(scene,game.scene);game.draws.push({fov:camera.fov,position:camera.position.toArray(),look:game.focus.toArray()});}};
 game.basesView={update:dt=>game.roofUpdates.push(dt)};game.drawLabels=()=>game.labels++;
 return {game,controls};
}
const distance=game=>game.camera.position.distanceTo(game.focus);

test('camera preferences restore valid persisted values and normalize corrupt or old settings without mutation',()=>{
 const source={cameraZoom:1.23,cameraFov:63.4,volume:.3,quality:'high'},copy={...source};
 assert.deepEqual(normalizeCameraSettings(source),{cameraZoom:1.25,cameraFov:63,cameraAutoRotate:true});assert.deepEqual(source,copy);
 for(const value of [undefined,null,{}, {volume:.7},{cameraZoom:NaN,cameraFov:Infinity},{cameraZoom:'',cameraFov:false}])assert.deepEqual(normalizeCameraSettings(value),{cameraZoom:1,cameraFov:52,cameraAutoRotate:true});
 assert.deepEqual(normalizeCameraSettings({cameraZoom:'1.5',cameraFov:'80'}),{cameraZoom:1.5,cameraFov:80,cameraAutoRotate:true});
 assert.deepEqual(normalizeCameraSettings({cameraZoom:-20,cameraFov:1000}),{cameraZoom:.7,cameraFov:80,cameraAutoRotate:true});
 assert.deepEqual(normalizeCameraSettings({cameraZoom:200,cameraFov:-10}),{cameraZoom:1.5,cameraFov:40,cameraAutoRotate:true});
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

test('settings bind without rendering or saving and display restored zoom/FOV',()=>{
 const {game,controls}=fixture({cameraZoom:1.3,cameraFov:67});let saves=0;const cleanup=installCameraSettings(game,{onChange:()=>saves++});
 assert.equal(controls['camera-zoom'].value,'130');assert.equal(controls['camera-zoom-value'].textContent,'130%');assert.equal(controls['camera-fov'].value,'67');assert.equal(controls['camera-fov-value'].textContent,'67°');
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
 assert.deepEqual(saved,[{cameraZoom:1.5,cameraFov:52,cameraAutoRotate:true},{cameraZoom:1.5,cameraFov:80,cameraAutoRotate:true}]);cleanup();
});

test('reset restores only zoom/FOV and preserves deliberate orbit, view, audio and graphics choices',()=>{
 const {game,controls}=fixture({cameraZoom:.7,cameraFov:80,cameraAutoRotate:true});game.viewMode='overview';let saved=0;const cleanup=installCameraSettings(game,{onChange:()=>saved++});
 controls['camera-reset'].dispatchEvent(new Event('click'));
 assert.deepEqual(game.settings,{volume:.4,quality:'low',cameraZoom:1,cameraFov:52,cameraAutoRotate:true});assert.equal(game.camera.fov,52);assert.equal(game.cameraYaw,.8);assert.equal(game.cameraPitch,.63);assert.equal(game.viewMode,'overview');
 assert.equal(controls['camera-zoom'].value,'100');assert.equal(controls['camera-zoom-value'].textContent,'100%');assert.equal(controls['camera-fov-value'].textContent,'52°');assert.equal(saved,1);
 const expected=cameraPose(game.state.actors[0],2,game.camera.aspect,'overview',{yaw:.8,pitch:.63,zoom:1});assert.deepEqual(game.camera.position.toArray(),expected.position);assert.deepEqual(game.focus.toArray(),expected.look);cleanup();
});

test('camera settings listeners can be removed without touching other native controls',()=>{
 const {game,controls}=fixture();let changes=0;const cleanup=installCameraSettings(game,{onChange:()=>changes++});cleanup();
 controls['camera-zoom'].value='150';controls['camera-zoom'].dispatchEvent(new Event('input'));controls['camera-reset'].dispatchEvent(new Event('click'));
 assert.equal(changes,0);assert.equal(game.draws.length,0);assert.equal(game.settings.cameraZoom,1);
});


test('automatic rotation is on for existing preferences and can be saved off without changing zoom/FOV',()=>{
 assert.equal(normalizeCameraSettings({cameraAutoRotate:false}).cameraAutoRotate,false);
 assert.equal(normalizeCameraSettings({cameraAutoRotate:'broken'}).cameraAutoRotate,true);
 const {game,controls}=fixture({cameraZoom:1.25,cameraFov:65});let resets=0;const saved=[];
 game.cameraFollow={reset:()=>resets++};const cleanup=installCameraSettings(game,{onChange:value=>saved.push(value)});
 assert.equal(controls['camera-follow'].value,'auto');controls['camera-follow'].value='manual';controls['camera-follow'].dispatchEvent(new Event('change'));
 assert.equal(game.settings.cameraAutoRotate,false);assert.equal(game.settings.cameraZoom,1.25);assert.equal(game.settings.cameraFov,65);assert.equal(resets,1);
 assert.deepEqual(saved,[{cameraZoom:1.25,cameraFov:65,cameraAutoRotate:false}]);
 controls['camera-reset'].dispatchEvent(new Event('click'));assert.equal(game.settings.cameraAutoRotate,false,'zoom/FOV reset preserves rotation preference');
 assert.equal(controls['camera-follow'].value,'manual');assert.equal(game.state.time,47);cleanup();
});
