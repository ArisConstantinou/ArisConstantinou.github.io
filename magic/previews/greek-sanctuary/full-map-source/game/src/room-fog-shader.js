const marker='varying vec2 roomFogPosition;';
export function roomFogShaderKind(material){
 if(!material.isShaderMaterial)return null;
 if(['standard','instanceAnchor'].includes(material.userData?.roomFogVertex))return material.userData.roomFogVertex;
 // Opt in only a known, direct model/view projection. Displaced/custom vertex
 // paths need an explicit contract rather than guessed position bounds.
 return /gl_Position=projectionMatrix\*modelViewMatrix\*(?:instanceMatrix\*)?vec4\(position,1(?:\.0*)?\);/.test(material.vertexShader.replace(/\s+/g,''))?'standard':null;
}
export function applyRoomFogShader(shader,uniforms,{sprite=false,custom=null,centroid=false}={}){
 if(!custom&&(!shader.vertexShader.includes('#include <fog_vertex>')||!shader.fragmentShader.includes('#include <fog_fragment>')))return false;
 Object.assign(shader.uniforms,uniforms);
 // Temple pavement deliberately invokes the stone material's current callback.
 // Both materials receive room fog: a chained callback must inject it only once.
 if(shader.vertexShader.includes(marker))return false;
 const declaration=(centroid?'centroid ':'')+marker;
 shader.vertexShader=declaration+'\n'+shader.vertexShader;
 const vertex=sprite?'roomFogPosition=(modelMatrix*vec4(0.0,0.0,0.0,1.0)).xz;':`
  vec4 roomWorld=${custom==='instanceAnchor'?'vec4(0.0,0.0,0.0,1.0)':custom?'vec4(position,1.0)':'vec4(transformed,1.0)'};
  #ifdef USE_BATCHING
   roomWorld=batchingMatrix*roomWorld;
  #endif
  #ifdef USE_INSTANCING
   roomWorld=instanceMatrix*roomWorld;
  #endif
  roomFogPosition=(modelMatrix*roomWorld).xz;`;
 const main=/void\s+main\s*\(\s*\)\s*\{/;
 shader.vertexShader=custom?shader.vertexShader.replace(main,match=>match+'\n'+vertex):shader.vertexShader.replace('#include <fog_vertex>','#include <fog_vertex>\n'+vertex);
 shader.fragmentShader=declaration+'\nuniform vec4 roomFogRects[8];\nuniform int roomFogCount;\nuniform bool roomFogShortCircuit;\n'+shader.fragmentShader;
 const mask=`
  float roomFogMask=roomFogCount==0?1.0:0.0;
  for(int rf=0;rf<8;rf++){if(rf>=roomFogCount)break;vec4 b=roomFogRects[rf];vec2 d=min(roomFogPosition-b.xy,b.zw-roomFogPosition);roomFogMask=max(roomFogMask,smoothstep(-0.9,0.25,min(d.x,d.y)));if(roomFogShortCircuit&&roomFogMask==1.0)break;}
  if(roomFogMask<=0.0)discard;`;
 if(custom){shader.fragmentShader=shader.fragmentShader.replace(main,match=>match+mask);const end=shader.fragmentShader.lastIndexOf('}');shader.fragmentShader=shader.fragmentShader.slice(0,end)+'\ngl_FragColor.rgb*=roomFogMask;\n'+shader.fragmentShader.slice(end);}
 else{shader.fragmentShader=shader.fragmentShader.replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>'+mask);shader.fragmentShader=shader.fragmentShader.replace('#include <fog_fragment>','#include <fog_fragment>\ngl_FragColor.rgb*=roomFogMask;');}
 return true;
}
