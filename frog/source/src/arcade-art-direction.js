import * as THREE from 'three';

// Shared by the world and the native menu rigs. All hues are sRGB inputs.
export const FROG_ART=Object.freeze({
 name:'leaf-and-honey',exposure:1.08,key:'#fff0c8',keyIntensity:3.0,
 skyFill:'#e3f2df',groundFill:'#71834b',fillIntensity:1.32,
 fog:'#c9ddbb',fogDensity:.0065,water:'#338f7e',waterSun:'#f5dfb0',
});

/** Colour/material treatment only. Mesh topology, placement, foliage fading,
 * collision and texture resolution are preserved. No additional render pass. */
export function styleImportedEnvironment(environment){
 const seen=new Set();let meshes=0;
 environment.traverse(mesh=>{
  if(!mesh.isMesh)return;meshes++;
  const name=(mesh.name+' '+(mesh.parent?.name||'')).toLowerCase();
  for(const material of Array.isArray(mesh.material)?mesh.material:[mesh.material]){
   if(!material||seen.has(material))continue;seen.add(material);
   const label=(name+' '+material.name).toLowerCase();
   if(!material.color)continue;
   const hsl=material.color.getHSL({});
   const leaves=/leave|grass|fern|cattail/.test(label)||hsl.h>.16&&hsl.h<.43&&hsl.s>.12;
   const stone=/rock/.test(label);
   material.roughness=leaves?.9:stone?.96:.86;
   material.metalness=0;material.envMapIntensity=leaves?.32:.42;
   // Preserve authored albedo/normal maps and their detail; gently warm neutral
   // wood/stone while making the existing plant greens less grey.
   if(leaves)material.color.offsetHSL(-.012,.075,.025);
   else if(stone)material.color.multiply(new THREE.Color('#dfebc9'));
   else material.color.multiply(new THREE.Color('#fff1d5'));
   material.userData.frogArtSurface=leaves?'leaf':stone?'moss-stone':'warm-natural';
  }
 });
 return {meshes,materials:seen.size,additionalDrawCalls:0,additionalTextures:0};
}

export function installFrogArtLighting(game){
 const fog=new THREE.Color(FROG_ART.fog),sky=new THREE.Color(FROG_ART.skyFill),ground=new THREE.Color(FROG_ART.groundFill),key=new THREE.Color(FROG_ART.key),water=new THREE.Color(FROG_ART.water),waterSun=new THREE.Color(FROG_ART.waterSun).multiplyScalar(.78);
 const fill=game.scene.children.filter(light=>light.isHemisphereLight);
 const update=()=>{
  game.renderer.toneMappingExposure=FROG_ART.exposure;
  for(const light of fill){light.color.copy(sky);light.groundColor.copy(ground);light.intensity=FROG_ART.fillIntensity;}
  game.sun.color.copy(key);game.sun.intensity=FROG_ART.keyIntensity;
  if(game.scene.fog){game.scene.fog.color.copy(fog);game.scene.fog.density=FROG_ART.fogDensity;}
  const uniforms=game.world?.water?.material?.uniforms;
  uniforms?.waterColor?.value.copy(water);uniforms?.sunColor?.value.copy(waterSun);
 };
 update();let surfaces=null;
 return {update,setSurfaces(value){surfaces=value;},inspect(){return {profile:FROG_ART.name,exposure:FROG_ART.exposure,extraLights:0,extraPasses:0,extraTextures:0,surfaces};}};
}
