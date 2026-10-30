import * as THREE from 'three';

export function normalizeWaterReflections(settings={}){return {waterReflections:settings.waterReflections!==false};}
export function reflectionOverride(search=''){const value=new URLSearchParams(search).get('reflections');return value==='off'?false:value==='on'?true:null;}

// The enabled path retains the exact original Water material and shader.
// The disabled material keeps waves, normal lighting, transparency and glints,
// and samples no stale mirror image from an earlier camera or moment.
export function createWaterReflectionControl(water,stats={}){
 const original=water.material,before=water.onBeforeRender,plain=original.clone();
 const sample='vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );';
 const albedo='vec3 albedo = mix( ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask(), ( vec3( 0.1 ) + reflectionSample * 0.9 + reflectionSample * specularLight ), reflectance);';
 if(!plain.fragmentShader.includes(sample)||!plain.fragmentShader.includes(albedo))throw Error('Unsupported water shader');
 plain.name='Creek water without scene reflections';plain.uniforms=original.uniforms;plain.fragmentShader=plain.fragmentShader.replace(sample,'').replace(albedo,'vec3 albedo = ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask() + specularLight * 0.12;');
 let enabled=true,refresh=false,disposed=false;
 function render(renderer,scene,camera){
  original.uniforms.eye.value.setFromMatrixPosition(camera.matrixWorld);
  if(!enabled){stats.reflectionDisabledSkips=(stats.reflectionDisabledSkips||0)+1;return;}
  if(refresh){refresh=false;before.call(this,renderer,scene,camera);before.call(this,renderer,scene,camera);}
  else before.call(this,renderer,scene,camera);
 }
 water.onBeforeRender=render;
 return {get enabled(){return enabled;},setEnabled(value){const next=value!==false;if(next===enabled)return;enabled=next;water.material=enabled?original:plain;refresh=enabled;},dispose(){if(disposed)return;disposed=true;water.material=original;if(water.onBeforeRender===render)water.onBeforeRender=before;plain.dispose();}};
}

export function installWaterReflectionSettings(game,{onChange=()=>{},search=location.search}={}){
 Object.assign(game.settings,normalizeWaterReflections(game.settings));let override=reflectionOverride(search);
 const control=createWaterReflectionControl(game.world.water,game.world.renderStats),doc=game.ui.ownerDocument,label=doc.createElement('label'),select=doc.createElement('select'),help=doc.createElement('small');
 label.htmlFor='water-reflections';label.append(doc.createTextNode('Αντανακλάσεις νερού '));select.id='water-reflections';select.innerHTML='<option value="on">Ενεργές</option><option value="off">Κλειστές · καλύτερη απόδοση</option>';select.style.minHeight='44px';select.style.fontSize='16px';select.setAttribute('aria-describedby','water-reflections-help');label.append(select);
 help.id='water-reflections-help';help.textContent='Κλείσ’ τες για λιγότερο φόρτο γραφικών. Τα κύματα και ο φωτισμός του νερού παραμένουν.';help.style.cssText='display:block;font-size:14px;line-height:1.4';
 const quality=game.$('quality');(quality.closest('label')||quality).after(label,help);
 function sync(){const enabled=override??game.settings.waterReflections;control.setEnabled(enabled);select.value=enabled?'on':'off';game.idleSceneGate?.invalidate();}
 const change=()=>{override=null;game.settings.waterReflections=select.value!=='off';sync();onChange({waterReflections:game.settings.waterReflections});};select.addEventListener('change',change);sync();
 const disposeWorld=game.world.dispose;game.world.dispose=function(...args){control.dispose();return disposeWorld.apply(this,args);};
 return {control,inspect(){return {enabled:control.enabled,temporaryOverride:override!==null};},dispose(){select.removeEventListener('change',change);label.remove();help.remove();control.dispose();game.world.dispose=disposeWorld;}};
}
