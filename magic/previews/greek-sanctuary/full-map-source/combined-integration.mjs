export function combinedIntegration({replace}){return {name:'magic-completed-tasks-integration',transform(input,id){const name=id.replaceAll('\\','/');let code=input.replaceAll('\r\n','\n');
 if(name.endsWith('/src/greek-environment.js')){
  code=replace(code,"typeof location!=='undefined'&&location.pathname.includes('/previews/greek-sanctuary/')","typeof location!=='undefined'",'The approved full Greek/Gothic map is the main game');
 }else if(name.endsWith('/src/main.js')){
  code="import {createItemShadows} from './item-shadows.js';\nlet itemShadows;\n"+code;
  code=replace(code,'setupPhysics();goliathNav=','itemShadows=createItemShadows(scene);setupPhysics();goliathNav=','Install completed single placement-shadow layer');
  code=replace(code,'function syncVisuals(dt){','function syncVisuals(dt){\n  itemShadows?.update(entities,held,worldMap,greekPuzzles);','Held and airborne items share one shadow with restored original caster flags');
  code=replace(code,'inspect:()=>({entities:','inspect:()=>({itemShadows:itemShadows.snapshot(),entities:','Expose shadow evidence');
  code=replace(code,"const candidate=FIRE_PREVIEW||lootCandidate||location.pathname.includes('/.cache/goliath-')||location.pathname.includes('/.cache/latest-');","const candidate=location.pathname.includes('/previews/')||location.pathname.includes('/.cache/')||location.pathname.includes('/performance-check/after/mobile-idle-20261019/');",'Main root keeps its production save and worker boundary');
  const saveLine=code.split('\n').find(l=>l.startsWith('const save = new ProfileStore('));if(!saveLine)throw Error('Missing profile construction');
  code=replace(code,saveLine,"const save = new ProfileStore(storage,location.pathname.includes('/performance-check/after/mobile-idle-20261019/')?'magic-mobile-idle-20261019':candidate?'magic-combined-preview-v1':'magic-exiled-v1',[]), sound = new MagicAudio(save.profile.muted);",'Preserve existing main progress and isolate preview progress');
  code=replace(code,'ensureReleaseWorker(navigator.serviceWorker,document.baseURI,packageInfo.version)','ensureReleaseWorker(navigator.serviceWorker,new URL(\'./\',location.href).href,packageInfo.version)','Worker owns the actual application URL while assets reuse the frozen shared namespace');
  code=replace(code,"onResume:()=>{if(phase==='paused'){phase='playing';ui.showPause(false);sound.start();}},","onResume:()=>{if(phase==='paused')togglePause();},",'Resume uses the same audio state transition');
  code=replace(code,'sound.start();populate();','sound.setPaused(false);sound.start();populate();','Starting a run restores audio');
  code=replace(code,"hearth.engine.heart.firing=false;phase='paused';ui.showPause(true);","hearth.engine.heart.firing=false;phase='paused';sound.setPaused(true);ui.showPause(true);",'Pause silences actual audio output');
  code=replace(code,"else if(phase==='paused'){phase='playing';ui.showPause(false);sound.start();}","else if(phase==='paused'){phase='playing';sound.setPaused(false);ui.showPause(false);sound.start();}",'Continue restores audio without changing mute preference');
  code=replace(code,'if(document.hidden)sound.setFlamethrower(false);','if(document.hidden){sound.setPaused(true);sound.setFlamethrower(false);}','Hidden-page audio suspension');
  code=replace(code,"sound.setFlamethrower(phase==='playing'&&!document.hidden","sound.setPaused(phase==='paused'||phase==='inventory'||document.hidden);\n    sound.setFlamethrower(phase==='playing'&&!document.hidden",'Frame audio state remains consistent through inventory and tab changes');
 }else return null;return {code,map:null};}};}
