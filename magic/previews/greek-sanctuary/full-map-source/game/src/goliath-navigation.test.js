import test from 'node:test';
import assert from 'node:assert/strict';
import * as CANNON from 'cannon-es';
import {NavigationGrid,distance} from './systems.js';
import {pathAroundProps} from './goliath-navigation.js';
const grid=()=>new NavigationGrid([{x:0,z:0,w:30,d:20}],[],.85,1);
const barrel=(x,z)=>({category:'prop',body:new CANNON.Body({mass:5,position:new CANNON.Vec3(x,.6,z),shape:new CANNON.Box(new CANNON.Vec3(.6,.6,.6))})});
test('Goliath routes around multiple physical props without changing the castle grid',()=>{
 const nav=grid(),before=nav.walk.slice(),props=[barrel(-3,-.7),barrel(-1,1.2)],from={x:1,z:0},to={x:-10,z:0};
 const path=pathAroundProps(nav,from,to,props);
 assert.ok(path.length>2);assert.ok(distance(path.at(-1),to)<1);
 assert.ok(path.every(p=>props.every(e=>Math.abs(p.x-e.body.position.x)>=1.44||Math.abs(p.z-e.body.position.z)>=1.22)));
 assert.deepEqual(nav.walk,before);assert.equal(nav.obstacles.length,0);
});
test('a moved prop refreshes its bounds and an overlapping cell gets an escape waypoint',()=>{
 const nav=grid(),prop=barrel(8,8);prop.body.updateAABB();prop.body.position.set(-1,.6,0);prop.body.aabbNeedsUpdate=true;
 const from={x:0,z:0},path=pathAroundProps(nav,from,{x:-10,z:0},[prop]);
 assert.ok(path.length>=2);assert.ok(distance(path[0],from)<3);
 assert.ok(Math.abs(path[0].x+1)>=1.44||Math.abs(path[0].z)>=1.22);
 assert.ok(prop.body.aabb.lowerBound.x<0);
});
test('reserved or airborne props do not invent floor obstacles',()=>{
 const nav=grid(),prop=barrel(-1,0);prop.reserved=true;
 assert.deepEqual(pathAroundProps(nav,{x:0,z:0},{x:-10,z:0},[prop]),nav.path({x:0,z:0},{x:-10,z:0}));
 prop.reserved=false;prop.body.position.y=6;prop.body.aabbNeedsUpdate=true;
 assert.deepEqual(pathAroundProps(nav,{x:0,z:0},{x:-10,z:0},[prop]),nav.path({x:0,z:0},{x:-10,z:0}));
});
test('clutter sealing a passage preserves the physical push route rather than stopping',()=>{
 const nav=new NavigationGrid([{x:0,z:0,w:24,d:2}],[],.85,1),from={x:5,z:0},to={x:-8,z:0};
 const path=pathAroundProps(nav,from,to,[barrel(0,0)]);
 assert.deepEqual(path,nav.path(from,to));assert.ok(path.length);
});
