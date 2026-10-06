import {convertDrawing} from './drawing-geometry.mjs';
import {rasterWalls} from './raster-drawing.mjs';
self.onmessage=e=>{try{
 const t=performance.now(),{scene,options={}}=e.data;
 if(options.mode==='analyse'){self.postMessage({result:rasterWalls(scene,options),ms:performance.now()-t});return;}
 let input=scene;
 if(scene.raster&&options.layers.includes('Τοίχοι από εικόνα')){
  const cache=scene.rasterCache,analysis=cache&&cache.threshold===options.rasterThreshold&&cache.cm===options.cmPerSourceUnit?cache:rasterWalls(scene,options);
  if(analysis.paths.length<4)throw Error('Δεν αναγνωρίστηκαν αρκετοί τοίχοι στην εικόνα. Διάλεξε την περιοχή του κτιρίου ή άλλαξε την ευαισθησία.');
  input={...scene,sourceMode:'raster',raster:undefined,preview:undefined,paths:[...analysis.paths,...scene.paths.filter(p=>options.layers.includes(p.layer))]};
 }
 const result=convertDrawing(input,options);if(input.sourceMode==='raster'&&!result.stats.rooms)result.warnings.push('Δεν βρέθηκαν κλειστοί χώροι. Οι αναγνωρισμένοι τοίχοι είναι επεξεργάσιμοι· συμπλήρωσε τα κενά ή πρόσθεσε χώρους.');
 self.postMessage({result,ms:performance.now()-t});
}catch(error){self.postMessage({error:error.message});}};
