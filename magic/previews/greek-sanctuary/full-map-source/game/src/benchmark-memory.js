import {FloatType,HalfFloatType,UnsignedShortType,RedFormat,RGFormat,RGBFormat} from 'three';
export function estimateResources(renderer,scene,targets=[]){
  const handles=new Set(),textures=new Set(),arrays=new Set();let textureBytes=0,geometryPayloadBytes=0,renderTargetBytes=0;
  const texture=t=>{
    if(!t?.isTexture||textures.has(t))return;textures.add(t);
    const handle=renderer.properties.get(t).__webglTexture;if(!handle||handles.has(handle))return;handles.add(handle);
    const images=Array.isArray(t.image)?t.image:[t.image];
    const channels=t.format===RedFormat?1:t.format===RGFormat?2:t.format===RGBFormat?3:4;
    const component=t.type===FloatType?4:[HalfFloatType,UnsignedShortType].includes(t.type)?2:1;
    for(const im of images){if(!im)continue;let w=im.width||im.image?.width||0,h=im.height||im.image?.height||0;
      do{textureBytes+=w*h*(im.depth||1)*channels*component;if(!t.generateMipmaps)break;w=Math.floor(w/2);h=Math.floor(h/2);}while(w>=1&&h>=1);
    }
  };
  const attribute=a=>{const array=a?.isInterleavedBufferAttribute?a.data.array:a?.array,buffer=array?.buffer??array;if(buffer&&!arrays.has(buffer)){arrays.add(buffer);geometryPayloadBytes+=buffer.byteLength;}};
  scene.traverse(o=>{if(o.geometry){attribute(o.geometry.index);Object.values(o.geometry.attributes).forEach(attribute);for(const list of Object.values(o.geometry.morphAttributes))list.forEach(attribute);}for(const a of o.userData?.staticIndexStreams||[])attribute(a);attribute(o.instanceMatrix);attribute(o.instanceColor);if(o.skeleton)texture(o.skeleton.boneTexture);for(const m of (Array.isArray(o.material)?o.material:[o.material]))if(m)for(const t of Object.values(m))texture(t);});
  texture(scene.environment);texture(scene.background);
  for(const rt of new Set(targets.filter(Boolean))){texture(rt.texture);texture(rt.depthTexture);if(rt.depthBuffer&&!rt.depthTexture)renderTargetBytes+=rt.width*rt.height*4;if(rt.samples)renderTargetBytes+=rt.width*rt.height*8*rt.samples;}
  return {kind:'estimate',uploadedTextureBytes:textureBytes,loadedGeometryPayloadBytes:geometryPayloadBytes,renderTargetAuxiliaryBytes:renderTargetBytes,knownResourceBytes:textureBytes+geometryPayloadBytes+renderTargetBytes,rendererCounts:{...renderer.info.memory,programs:renderer.info.programs?.length||0},actualVramBytes:null,
    note:'Εκτίμηση πόρων: ανεβασμένες υφές και φορτωμένα buffers γεωμετρίας. Δεν είναι πραγματική VRAM. Δεν περιλαμβάνει driver, κώδικα shaders, όλα τα αντίγραφα ή το framebuffer του browser· γεωμετρία μπορεί να μην έχει ανέβει ακόμη.'};
}
