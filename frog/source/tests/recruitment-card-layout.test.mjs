import test from 'node:test';
import assert from 'node:assert/strict';
import {placeRecruitmentCard} from '../src/recruitment-card.js';

const box=(x,y,width,height)=>({left:x,top:y,right:x+width,bottom:y+height,width,height});
const overlaps=(a,b)=>a.left<b.right&&a.left+a.width>b.left&&a.top<b.bottom&&a.top+a.height>b.top;
function verify(position,viewport,occupied){
  assert.equal(position.visible,true);
  assert.ok(position.left>=0&&position.top>=0);
  assert.ok(position.left+position.width<=viewport.width&&position.top+position.height<=viewport.height);
  for(const obstacle of occupied)assert.equal(overlaps(position,obstacle),false,JSON.stringify({position,obstacle}));
}

test('requirements stay beside the actor and clear status, large minimap and the eight-action bar',()=>{
  const viewport={width:1920,height:1080},occupied=[box(16,16,240,205),box(16,229,240,44),box(1640,16,264,418),box(620,978,680,86)];
  const anchor={x:1160,y:660,visible:true};
  const p=placeRecruitmentCard({anchor,viewport,occupied});verify(p,viewport,occupied);
  assert.equal(p.side,'left');assert.ok(Math.abs(anchor.x-(p.left+p.width))<35);assert.ok(p.top+p.height<anchor.y+40);
});

test('screen-edge frogs get a fully readable card without clipping or crossing a docked management panel',()=>{
  const viewport={width:1280,height:720},occupied=[box(12,12,224,210),box(1020,12,248,310),box(12,234,480,390),box(294,630,692,78)];
  for(const anchor of [{x:1268,y:530,visible:true},{x:524,y:430,visible:true},{x:980,y:45,visible:true}]){
    const p=placeRecruitmentCard({anchor,viewport,occupied});verify(p,viewport,occupied);
  }
});

test('portrait and short landscape badges fit without shrinking content or adding a scroll area',()=>{
  const cases=[
    {viewport:{width:390,height:844},occupied:[box(10,10,175,200),box(205,10,175,310),box(10,692,370,142)],anchor:{x:290,y:545,visible:true}},
    {viewport:{width:960,height:540},occupied:[box(8,8,220,175),box(728,8,224,270),box(185,466,590,66)],anchor:{x:570,y:355,visible:true}},
    {viewport:{width:667,height:375},occupied:[box(8,8,185,160),box(474,8,185,185),box(8,303,651,64)],anchor:{x:350,y:245,visible:true}},
  ];
  for(const item of cases)for(const size of [{width:176,height:48},{width:196,height:96}]){
    const p=placeRecruitmentCard({...item,size});verify(p,item.viewport,item.occupied);
    assert.equal(p.width,size.width);assert.equal(p.height,size.height,'the complete badge must remain readable');
  }
});

test('offscreen, invalid and fully occupied viewports do not place a misleading card over the HUD',()=>{
  const viewport={width:390,height:844};
  assert.equal(placeRecruitmentCard({anchor:{x:200,y:400,visible:false},viewport}).visible,false);
  assert.equal(placeRecruitmentCard({anchor:{x:NaN,y:400,visible:true},viewport}).visible,false);
  assert.equal(placeRecruitmentCard({anchor:{x:200,y:400,visible:true},viewport,occupied:[box(0,0,390,844)]}).visible,false);
});
