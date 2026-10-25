import test from 'node:test';
import assert from 'node:assert/strict';
import {GameInput} from '../src/input.js';

test('holding U cannot retrigger the concept drawer after it clears held gameplay keys',t=>{
  const saved=Object.fromEntries(['addEventListener','document','HTMLElement','innerWidth','innerHeight'].map(key=>[key,globalThis[key]]));
  t.after(()=>{for(const [key,value] of Object.entries(saved))if(value===undefined)delete globalThis[key];else globalThis[key]=value;});
  const handlers={};globalThis.addEventListener=(type,fn)=>{handlers[type]=fn;};
  globalThis.document={addEventListener(){}};globalThis.HTMLElement=class {};globalThis.innerWidth=1280;globalThis.innerHeight=720;
  const input=new GameInput({addEventListener(){}},()=>{}),event={code:'KeyU',target:null,repeat:false,preventDefault(){}};
  handlers.keydown(event);assert.equal(input.hit('KeyU'),true);
  input.clear();handlers.keydown({...event,repeat:true});assert.equal(input.hit('KeyU'),false);
  handlers.keyup(event);handlers.keydown(event);assert.equal(input.hit('KeyU'),true);
  input.destroy();
});
