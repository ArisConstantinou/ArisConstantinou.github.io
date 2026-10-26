import test from 'node:test';
import assert from 'node:assert/strict';
import {installCameraButton} from '../src/arcade-camera-button.js';
function fixture(){const button={};let count=0,t=0;const game={running:true,$:()=>button,toggleView:()=>count++};installCameraButton(game,()=>t);return {button,game,get count(){return count;},set time(v){t=v;}};}
test('touch toggles immediately and synthetic click cannot undo it',()=>{const f=fixture();f.button.onpointerdown({pointerType:'touch',preventDefault(){}});assert.equal(f.count,1);f.time=150;f.button.onclick({detail:1});assert.equal(f.count,1);f.button.onpointerdown({pointerType:'touch',preventDefault(){}});assert.equal(f.count,2);});
test('mouse and keyboard each toggle once',()=>{const f=fixture();f.button.onpointerdown({pointerType:'mouse'});assert.equal(f.count,0);f.button.onclick({detail:1});f.button.onclick({detail:0});assert.equal(f.count,2);});
test('paused or finished match does not accept hidden camera taps',()=>{const f=fixture();f.game.running=false;f.button.onpointerdown({pointerType:'touch',preventDefault(){}});f.button.onclick({detail:0});assert.equal(f.count,0);});
