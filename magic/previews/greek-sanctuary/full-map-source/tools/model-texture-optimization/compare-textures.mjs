import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {chromium} from 'file:///C:/Users/arz0r/.codex/skills/develop-web-game/node_modules/playwright/index.mjs';
const root=process.env.CODEX_GENERATED_OUTPUT,out=root+'/tests/mobile-model-optimization';
process.env.TEMP=process.env.TMP=root+'/work/temp';
const optimized=JSON.parse(await fs.readFile(out+'/texture-optimization.json','utf8'));
await fs.writeFile(out+'/pixel-comparison.json',JSON.stringify({status:'running'}));
execFileSync('powershell.exe',['-NoProfile','-Command','Get-CimInstance Win32_Process | Select-Object -First 1 -ExpandProperty ProcessId'],{windowsHide:true});
const context=await chromium.launchPersistentContext(root+'/work/browser',{channel:'chrome',headless:false,viewport:{width:430,height:745},deviceScaleFactor:3,isMobile:true,hasTouch:true,args:['--mute-audio','--disable-background-mode','--disable-crash-reporter','--disable-gpu-shader-disk-cache','--disk-cache-size=33554432']});
const page=context.pages()[0],errors=[];page.on('pageerror',e=>errors.push(e.message));
try{
 await page.goto('http://127.0.0.1:5173/performance-check/canonical/index.html?hearthQA=1');await page.bringToFront();
 await page.waitForFunction(()=>window.__MAGIC__?.snapshot().phase==='menu',null,{timeout:120000});
 await page.locator('#start-button').click();await page.waitForFunction(()=>__MAGIC_SINGLE_COMBAT__.running);await page.waitForTimeout(2000);
 await page.evaluate(()=>__HEARTH_QA__.render());
 const result=await page.evaluate(async optimized=>{
  const q=__HEARTH_QA__,renderer=q.renderer,gl=renderer.getContext(),swaps=[],created=[],bitmaps=[],cases=[];
  for(const optimizedModel of optimized){
   const bytes=await (await fetch('models/redesign/'+optimizedModel.kind+'-mobile-optimized-lods.glb')).arrayBuffer(),view=new DataView(bytes),n=view.getUint32(12,true),doc=JSON.parse(new TextDecoder().decode(new Uint8Array(bytes,20,n))),binary=28+n;
   const changes=new Map(optimizedModel.changes.map(c=>[c.image,c])),images=new Map(),textures=new Map();
   for(const e of q.entities){const kind=e.kind==='archer'?'archer':e.bossType;if(kind!==optimizedModel.kind)continue;
    const meshes=[];e.mesh.traverse(o=>{if(o.isMesh)meshes.push(o);});
    for(const o of meshes){const material=o.material,definition=doc.materials.find(m=>m.name===material.name);if(!definition)continue;
     const specs=[['map',definition.pbrMetallicRoughness?.baseColorTexture],['emissiveMap',definition.emissiveTexture],['normalMap',definition.normalTexture],['roughnessMap',definition.pbrMetallicRoughness?.metallicRoughnessTexture],['metalnessMap',definition.pbrMetallicRoughness?.metallicRoughnessTexture],['aoMap',definition.occlusionTexture]];
     for(const [key,info]of specs){if(!info||!material[key])continue;const im=doc.textures[info.index].source;if(!changes.has(im))continue;const old=material[key];let texture=textures.get(old);
      if(!texture){let bitmap=images.get(im);if(!bitmap){const image=doc.images[im],v=doc.bufferViews[image.bufferView];bitmap=await createImageBitmap(new Blob([new Uint8Array(bytes,binary+(v.byteOffset||0),v.byteLength)],{type:image.mimeType}),{imageOrientation:'none',colorSpaceConversion:'none',premultiplyAlpha:'none'});images.set(im,bitmap);bitmaps.push(bitmap);}
       texture=old.clone();texture.source=new old.source.constructor(bitmap);texture.source.dataReady=true;
       const transform=info.extensions?.KHR_texture_transform;if(transform){texture.offset.fromArray(transform.offset);texture.repeat.fromArray(transform.scale);}texture.needsUpdate=true;renderer.initTexture(texture);textures.set(old,texture);created.push(texture);
      }swaps.push({material,key,old,texture});
     }
    }
   }
  }
  function render(){renderer.info.reset();q.render();const pixels=new Uint8Array(gl.drawingBufferWidth*gl.drawingBufferHeight*4);gl.readPixels(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight,gl.RGBA,gl.UNSIGNED_BYTE,pixels);if(!pixels.some((v,i)=>i%4!==3&&v>32))throw Error('Empty comparison render');return pixels;}
  function diff(a,b){let changed=0,max=0,total=0;for(let i=0;i<a.length;i++){const d=Math.abs(a[i]-b[i]);if(d)changed++;max=Math.max(max,d);total+=d;}return{changedChannels:changed,maxChannelDifference:max,meanChannelDifference:total/a.length};}
  const set=enabled=>{for(const s of swaps)s.material[s.key]=enabled?s.texture:s.old;};
  const originalZoom=q.camera.zoom,originalPosition=q.camera.position.clone(),direction=q.camera.getWorldDirection(q.camera.position.clone());
  for(const [name,zoom,clip,time,level]of [['game-idle',1,null,0,2],['hover',2,'Hover',.55,1],['claw',3,'Claw',.9,1],['dive',2,'Dive',1.35,1],['death',2,'Death',1.2,2],['distant',.5,'Hover',.5,2]]){
   const garg=q.entities.find(e=>e.bossType==='gargoyle');
   if(clip){const center=garg.mesh.getWorldPosition(q.camera.position.clone());center.y+=1.5;q.camera.position.copy(center).addScaledVector(direction,-30);}else q.camera.position.copy(originalPosition);
   q.camera.zoom=originalZoom*zoom;q.camera.updateProjectionMatrix();q.camera.updateMatrixWorld(true);
   if(clip)garg.visual.update(0,{clip,time,camera:q.camera,dead:clip==='Death',flying:clip==='Hover'});
   for(const e of q.entities)e.mesh?.traverse(o=>{if(o.isMesh&&[1,2].includes(o.userData.redesignLod))o.visible=o.userData.redesignLod===level;});
   set(false);render();const before=render(),counts={...renderer.info.render};
   if(name==='claw')globalThis.__TEXTURE_COMPARE_BEFORE__=renderer.domElement.toDataURL('image/png');
   set(true);render();const after=render(),afterCounts={...renderer.info.render};
   if(name==='claw')globalThis.__TEXTURE_COMPARE_IMAGE__=renderer.domElement.toDataURL('image/png');
   set(false);const restored=render();cases.push({name,...diff(before,after),restore:diff(before,restored),callsBefore:counts.calls,callsAfter:afterCounts.calls,trianglesBefore:counts.triangles,trianglesAfter:afterCounts.triangles});
  }
  set(false);created.forEach(t=>t.dispose());bitmaps.forEach(b=>b.close());q.camera.zoom=originalZoom;q.camera.updateProjectionMatrix();
  return{swaps:swaps.length,cases};
 },optimized);
 const shot=await page.evaluate(()=>__TEXTURE_COMPARE_IMAGE__);await fs.writeFile(out+'/cropped-claw.png',Buffer.from(shot.split(',')[1],'base64'));
 const beforeShot=await page.evaluate(()=>__TEXTURE_COMPARE_BEFORE__);await fs.writeFile(out+'/original-claw.png',Buffer.from(beforeShot.split(',')[1],'base64'));
 await fs.writeFile(out+'/pixel-comparison.json',JSON.stringify({status:'measured',errors,...result},null,2));
 assert.deepEqual(errors,[]);assert(result.swaps>0);for(const c of result.cases){assert.equal(c.restore.changedChannels,0,'Restoration '+c.name);assert.equal(c.callsBefore,c.callsAfter);assert.equal(c.trianglesBefore,c.trianglesAfter);assert.equal(c.changedChannels,0,'Pixels '+c.name);}
 await fs.writeFile(out+'/pixel-comparison.json',JSON.stringify({status:'passed',errors,...result},null,2));console.log(JSON.stringify(result));
}finally{await context.close();await new Promise(r=>setTimeout(r,1500));}
