import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as CANNON from 'cannon-es';
import {createStoneCreature} from './stone-creature.js';
import {distance,pointSegmentDistance} from './systems.js';
import {pathAroundProps} from './goliath-navigation.js';
test('the actual Goliath hit happens at the animated fist extension, once per strike',()=>{
 const source=fs.readFileSync(new URL('./main.js',import.meta.url),'utf8');
 const update=source.slice(source.indexOf('function updateGoliath('),source.indexOf('function conjure('));
 const creature=createStoneCreature(),body=new CANNON.Body({mass:38,position:new CANNON.Vec3(0,1.67,-2.2)});
 const ally={body,creature,expires:40,dead:false,radius:.95,path:[],pathTick:0,strikeTime:0,strikeCooldown:0,strikeSide:1,yaw:Math.PI,speed:4.6};
 const player={body:{position:new CANNON.Vec3(0,.88,0)}},enemy={category:'actor',body:{position:new CANNON.Vec3(0,.88,-4.2)},aggro:true,hp:500,stun:0};
 const hits=[],noop=()=>{},ctx={runTime:0,player,entities:[enemy],held:null,hearth:{engine:null},distance,pointSegmentDistance,pathAroundProps,aimDirection:{x:0,z:-1},visibleLine:()=>true,
  goliathNav:{path:(_,p)=>[p]},turnToward:(a,b,k)=>a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*Math.min(1,k),
  hurt:(e,n)=>{e.hp-=n;hits.push(ctx.runTime);},fx:{burst:noop,ring:noop},sound:{sound:noop},ui:{toast:noop}};
 vm.createContext(ctx);vm.runInContext(update+'\nglobalThis.tick=updateGoliath;',ctx);
 let fistAtHit;
 for(let i=0;i<70;i++){ctx.runTime+=1/60;const before=hits.length;ctx.tick(ally,1/60);creature.animate(1/60,{attack:ally.strikeTime,attackSide:ally.strikeSide});if(hits.length>before)fistAtHit=creature.parts.get('Left arm').root.rotation.x;}
 assert.equal(hits.length,1);assert.equal(enemy.hp,466);assert.ok(fistAtHit< -1.4,'damage must coincide with the forward strike, not its windup');creature.dispose();
});
