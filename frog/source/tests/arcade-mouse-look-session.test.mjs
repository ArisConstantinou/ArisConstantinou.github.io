import test from 'node:test';
import assert from 'node:assert/strict';
import {createMouseLookSession} from '../src/arcade-mouse-look-session.js';

const deferred=()=>{let resolve,reject;const promise=new Promise((yes,no)=>{resolve=yes;reject=no;});return {promise,resolve,reject};};
const settle=async()=>{await Promise.resolve();await Promise.resolve();};

function fixture(request=()=>undefined){
 const document=new EventTarget(),canvas={},timers=new Map(),events=[];
 let running=true,timerId=0,requests=0,exits=0;
 document.pointerLockElement=null;
 document.exitPointerLock=()=>{exits++;};
 if(request!==null)canvas.requestPointerLock=()=>{requests++;return request();};
 const session=createMouseLookSession({canvas,document,active:()=>running,
  onLock:()=>events.push('lock'),onUnexpectedUnlock:()=>{events.push('unexpected');running=false;},
  onFallback:error=>events.push({fallback:error.message}),
  setTimer:(fn,ms)=>{const id=++timerId;timers.set(id,{fn,ms});return id;},clearTimer:id=>timers.delete(id),
 });
 const grant=()=>{document.pointerLockElement=canvas;document.dispatchEvent(new Event('pointerlockchange'));};
 const unlock=()=>{document.pointerLockElement=null;document.dispatchEvent(new Event('pointerlockchange'));};
 return {session,document,canvas,events,timers,grant,unlock,
  get running(){return running;},set running(value){running=value;},get requests(){return requests;},get exits(){return exits;},
  timeout(){const queued=[...timers];timers.clear();for(const [,{fn}] of queued)fn();},
 };
}

test('absent, throwing and rejected Pointer Lock keep the round running with usable fallback',async()=>{
 for(const request of [null,()=>{throw new Error('Not supported');},()=>Promise.reject(new Error('Escape cooldown'))]){
  const f=fixture(request);f.session.request();await settle();
  assert.equal(f.running,true,'input permission must not control whether a round can run');
  assert.equal(f.session.pending,false);assert.equal(f.session.locked,false);
  assert.equal(f.events.length,1);assert.ok(f.events[0].fallback);assert.equal(f.timers.size,0);
  f.session.dispose();
 }
});

test('a legacy browser success uses native lock events and ignores duplicate notifications',()=>{
 const f=fixture();assert.equal(f.session.request(),true);assert.equal(f.session.pending,true);
 assert.equal(f.requests,1);f.session.request();assert.equal(f.requests,1,'only one request can be in flight');
 f.grant();assert.equal(f.session.pending,false);assert.equal(f.session.locked,true);assert.equal(f.timers.size,0);
 assert.deepEqual(f.events,['lock']);f.grant();assert.deepEqual(f.events,['lock']);
 f.session.request();assert.equal(f.requests,1);f.session.dispose();
});

test('promise completion observes a successful native lock before its change event arrives',async()=>{
 const waiting=deferred(),f=fixture(()=>waiting.promise);f.session.request();
 f.document.pointerLockElement=f.canvas;waiting.resolve();await settle();
 assert.equal(f.session.locked,true);assert.equal(f.session.pending,false);assert.equal(f.timers.size,0);
 assert.deepEqual(f.events,['lock']);f.document.dispatchEvent(new Event('pointerlockchange'));
 assert.deepEqual(f.events,['lock']);f.session.dispose();
});

test('legacy pointerlockerror enters fallback once and permits a later successful retry',()=>{
 const f=fixture();f.session.request();f.document.dispatchEvent(new Event('pointerlockerror'));
 assert.equal(f.running,true);assert.equal(f.session.pending,false);assert.equal(f.events.length,1);
 f.document.dispatchEvent(new Event('pointerlockerror'));assert.equal(f.events.length,1);
 f.session.request();assert.equal(f.requests,2);f.grant();assert.equal(f.session.locked,true);
 assert.deepEqual(f.events.slice(1),['lock']);f.session.dispose();
});

test('a silently ignored request times out and a later attempt can acquire the mouse',()=>{
 const f=fixture();f.session.request();assert.equal([...f.timers.values()][0].ms,1500);
 f.timeout();assert.equal(f.session.pending,false);assert.equal(f.running,true);
 assert.match(f.events[0].fallback,/timed out/);
 f.session.request();assert.equal(f.requests,2);f.grant();f.timeout();
 assert.equal(f.session.locked,true);assert.equal(f.events.length,2);f.session.dispose();
});

test('a stale rejected promise and its global error cannot cancel a newer request',async()=>{
 const first=deferred(),second=deferred(),queue=[first,second],f=fixture(()=>queue.shift().promise);
 f.session.request();f.session.release();f.session.request();
 assert.equal(f.requests,2);assert.equal(f.session.pending,true);
 // Promise-capable browsers emit an untagged error event as well. The token-
 // bound promise owns failure handling so an old event cannot identify a retry.
 f.document.dispatchEvent(new Event('pointerlockerror'));first.reject(new Error('Old denial'));await settle();
 assert.equal(f.session.pending,true);assert.equal(f.running,true);assert.deepEqual(f.events,[]);
 f.grant();second.resolve();await settle();
 assert.equal(f.session.locked,true);assert.equal(f.session.pending,false);assert.deepEqual(f.events,['lock']);
 f.session.dispose();
});

test('a current rejected promise handles its error once even if a native error event also fires',async()=>{
 const waiting=deferred(),f=fixture(()=>waiting.promise);f.session.request();
 f.document.dispatchEvent(new Event('pointerlockerror'));assert.equal(f.session.pending,true);
 waiting.reject(new Error('Not allowed'));await settle();
 assert.equal(f.session.pending,false);assert.equal(f.running,true);assert.deepEqual(f.events,[{fallback:'Not allowed'}]);
 f.document.dispatchEvent(new Event('pointerlockerror'));f.timeout();assert.equal(f.events.length,1);f.session.dispose();
});

test('intentional release cannot pause a newly resumed round when native exit arrives late',()=>{
 const f=fixture();f.session.request();f.grant();f.running=false;f.session.release();
 assert.equal(f.exits,1);f.running=true;f.session.request();
 assert.equal(f.requests,1,'native exit is still pending; no redundant acquisition is sent');
 f.unlock();assert.equal(f.running,true);assert.deepEqual(f.events,['lock']);
 f.session.request();f.grant();assert.equal(f.running,true);assert.deepEqual(f.events,['lock','lock']);
 f.session.dispose();
});

test('a queued intentional unlock does not clear the next request while it is pending',()=>{
 const f=fixture();f.session.request();f.grant();f.session.release();
 // Native state changes before its queued event reaches JavaScript.
 f.document.pointerLockElement=null;f.session.request();assert.equal(f.session.pending,true);
 f.document.dispatchEvent(new Event('pointerlockchange'));
 assert.equal(f.session.pending,true);assert.equal(f.running,true);
 f.grant();assert.equal(f.session.locked,true);assert.deepEqual(f.events,['lock','lock']);f.session.dispose();
});

test('a real unexpected native unlock invokes the pause callback exactly once',()=>{
 const f=fixture();f.session.request();f.grant();f.unlock();
 assert.equal(f.running,false);assert.deepEqual(f.events,['lock','unexpected']);
 f.unlock();assert.deepEqual(f.events,['lock','unexpected']);assert.equal(f.session.pending,false);f.session.dispose();
});

test('a late grant after pause is released without restarting or invoking lock callbacks',async()=>{
 const waiting=deferred(),f=fixture(()=>waiting.promise);f.session.request();
 f.running=false;f.session.release();f.grant();waiting.resolve();await settle();
 assert.equal(f.exits,1);assert.deepEqual(f.events,[]);assert.equal(f.session.pending,false);
 f.unlock();assert.equal(f.running,false);assert.deepEqual(f.events,[]);f.session.dispose();
});

test('no request runs while inactive and disposal cancels timers, callbacks and listeners',async()=>{
 const waiting=deferred(),f=fixture(()=>waiting.promise);f.running=false;
 assert.equal(f.session.request(),false);assert.equal(f.requests,0);
 f.running=true;f.session.request();f.session.dispose();f.session.dispose();
 waiting.reject(new Error('Too late'));await settle();f.timeout();f.grant();f.unlock();
 assert.equal(f.session.pending,false);assert.equal(f.timers.size,0);assert.deepEqual(f.events,[]);
 assert.equal(f.session.request(),false);assert.equal(f.requests,1);
});
