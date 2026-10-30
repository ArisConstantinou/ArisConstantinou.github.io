// Pausing freezes simulation and all3D animation. Keep the last canvas while
// independent DOM menus remain animated; redraw when a real scene input changes.
export function createIdleSceneGate(){
 let previous=null,repeats=0;
 return {
  invalidate(){previous=null;repeats=0;},
  needsRender(game){
   if(game.running||game.mode!=='pause'||game.layoutEditing||game.assetsLoading){previous=null;repeats=0;return true;}
   const r=game.renderer,c=game.camera;
   const key=JSON.stringify([game.mode,r.domElement.width,r.domElement.height,r.getPixelRatio(),c.matrixWorld.elements,c.projectionMatrix.elements,game.settings,r.info.memory.geometries,r.info.memory.textures,r.info.programs?.length||0]);
   if(key!==previous){previous=key;repeats=0;return true;}
   // Two settled frames cover the existing alternate-frame water reflection.
   return repeats++<1;
  },
 };
}
