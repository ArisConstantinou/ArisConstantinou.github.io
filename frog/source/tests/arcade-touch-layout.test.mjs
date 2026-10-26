import test from 'node:test';
import assert from 'node:assert/strict';
import {solveTouchLayout} from '../src/arcade-touch-layout.js';

function scenario(width,height){
 const portrait=height>=width,stick=portrait?Math.min(148,Math.max(116,width*.35)):Math.min(136,Math.max(108,height*.3));
 const controls={move:{width:stick,height:stick},aim:{width:stick,height:stick},fire:{width:portrait?76:72,height:portrait?76:72}};
 const blocked=[
  {left:12,top:12,right:width-(portrait?12:132),bottom:86},
  {left:width-(portrait?122:112),top:portrait?112:10,right:width-12,bottom:portrait?222:110},
  {left:width-(portrait?122:112),top:portrait?228:116,right:width-12,bottom:portrait?272:160},
  {left:width/2-26,top:height-66,right:width/2+26,bottom:height-18},
 ];
 return {width,height,controls,blocked};
}
function assertUsable(input,result){
 const boxes=[];
 for(const [key,p] of Object.entries(result.positions)){
  const size=input.controls[key],box={left:p.x-size.width/2,right:p.x+size.width/2,top:p.y-size.height/2,bottom:p.y+size.height/2};
  assert.ok(box.left>=result.bounds.left-.01&&box.top>=result.bounds.top-.01&&box.right<=result.bounds.right+.01&&box.bottom<=result.bounds.bottom+.01,`${key} must fit safe bounds`);
  for(const other of [...input.blocked,...boxes])assert.ok(box.right<=other.left||box.left>=other.right||box.bottom<=other.top||box.top>=other.bottom,`${key} overlaps HUD or another control`);
  boxes.push(box);
 }
}
for(const [width,height] of [[360,640],[390,844],[640,360],[844,390]]){
 test(`controls remain separately reachable at ${width}×${height}`,()=>{
  const input=scenario(width,height),result=solveTouchLayout(input);assertUsable(input,result);
  const preferred=Object.fromEntries(Object.entries(result.positions).map(([key,p])=>[key,{x:p.x/width,y:p.y/height}]));
  assert.deepEqual(solveTouchLayout({...input,preferred}).positions,result.positions,'saved normalized positions round-trip without shifting');
 });
 test(`conflicting saved placements are repaired at ${width}×${height}`,()=>{
  const input={...scenario(width,height),preferred:{move:{x:.95,y:0},aim:{x:.95,y:0},fire:{x:.95,y:0}}};
  assertUsable(input,solveTouchLayout(input));
 });
}
test('landscape camera cutout and gesture bar margins survive a resize',()=>{
 const input={...scenario(844,390),insets:{left:44,right:34,top:12,bottom:21},preferred:{move:{x:0,y:1},aim:{x:1,y:1},fire:{x:1,y:1}}};
 const result=solveTouchLayout(input);assertUsable(input,result);
 assert.ok(result.bounds.left>=52&&result.bounds.right<=802&&result.bounds.bottom<=361);
});
test('invalid stored coordinates cannot put controls outside the viewport',()=>{
 const input={...scenario(360,640),preferred:{move:{x:NaN,y:NaN},aim:{x:Infinity,y:-Infinity},fire:{x:-10,y:20}}};
 assertUsable(input,solveTouchLayout(input));
});
