import * as T from 'three';
/** Correct linear-light materials; all textures made locally, no external fetches. */
export function finishLook(scene,renderer,ship,world){
 const c=document.createElement('canvas');c.width=512;c.height=256;let ctx=c.getContext('2d');const sky=ctx.createLinearGradient(0,0,0,256);sky.addColorStop(0,'#89abb9');sky.addColorStop(.47,'#e9d9b9');sky.addColorStop(.6,'#738687');sky.addColorStop(1,'#172c36');ctx.fillStyle=sky;ctx.fillRect(0,0,512,256);
 const env=new T.CanvasTexture(c);env.mapping=T.EquirectangularReflectionMapping;env.colorSpace=T.SRGBColorSpace;const pmrem=new T.PMREMGenerator(renderer);const target=pmrem.fromEquirectangular(env);scene.environment=target.texture;scene.environmentIntensity=.32;env.dispose();pmrem.dispose();
 function tex(kind){const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');let n=1789;const rand=()=>{n=(1664525*n+1013904223)>>>0;return n/4294967296;};
  g.fillStyle=kind==='wood'?'#cfb795':'#ddd8ca';g.fillRect(0,0,256,256);
  if(kind==='wood'){for(let i=0;i<700;i++){const x=rand()*256,y=rand()*256;g.strokeStyle='rgba(73,39,17,'+(rand()*.14)+')';g.beginPath();g.moveTo(x,y);g.bezierCurveTo(x+3,y+12,x-3,y+32,x+1,y+90);g.stroke();}for(let x=0;x<256;x+=64){g.fillStyle='#514237';g.fillRect(x,0,1,256);}}
  else{for(let i=0;i<9000;i++){g.fillStyle='rgba(0,0,0,'+(rand()*.15)+')';g.fillRect(rand()*256,rand()*256,1,2);}}
  const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(kind==='wood'?2:4,kind==='wood'?2:4);t.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());return t;
 }
 const wood=tex('wood'),cloth=tex('cloth');const seen=new Set();ship.group.traverse(o=>{if(!o.isMesh)return;o.receiveShadow=true;for(const m of Array.isArray(o.material)?o.material:[o.material]){if(seen.has(m)||!m.isMeshStandardMaterial)continue;seen.add(m);m.envMapIntensity=.36;if(m===world.M.wood){m.map=wood;m.color.setHex(0x987354);m.roughness=.57;}if(m===world.M.cloth){m.map=cloth;m.color.setHex(0x245f61);m.roughness=.92;}m.needsUpdate=true;}});
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
 return {dispose:()=>{target.dispose();wood.dispose();cloth.dispose();}};
}
