import {convertDrawing} from './drawing-geometry.mjs';
import {rasterWalls,convertRasterDrawing} from './raster-drawing.mjs';
self.onmessage=e=>{try{
 const t=performance.now(),{scene,options={}}=e.data;
 if(options.mode==='analyse'){self.postMessage({result:rasterWalls(scene,options),ms:performance.now()-t});return;}
 let input=scene,analysis;
 if(scene.raster&&options.layers.includes('Τοίχοι από εικόνα')){
  // Analyse with the current recognition options; the initial region preview
  // was computed before those options were known and is not a conversion cache.
  analysis=rasterWalls(scene,{...options,crop:undefined});
  if(analysis.paths.length<4)throw Error('Δεν αναγνωρίστηκαν αρκετοί τοίχοι στην εικόνα. Διάλεξε την περιοχή του κτιρίου ή άλλαξε την ευαισθησία.');
  input={...scene,sourceMode:'raster',raster:undefined,preview:undefined,paths:[...analysis.paths,...scene.paths.filter(p=>options.layers.includes(p.layer))]};
 }
 let result=analysis?convertRasterDrawing(scene,analysis,options):convertDrawing(input,options),rasterThreshold=options.rasterThreshold;
 // Browser canvas antialiasing can make the same PDF strokes fainter. Retry
 // once only when the default sensitivity misses explicitly labelled spaces.
 if(analysis&&Number(options.rasterThreshold)===210&&result.quality?.missing.length){
  const retryOptions={...options,rasterThreshold:220},retryAnalysis=rasterWalls(scene,{...retryOptions,crop:undefined}),retry=convertRasterDrawing(scene,retryAnalysis,retryOptions);
  if(retry.quality.missing.length<result.quality.missing.length){result=retry;rasterThreshold=220;result.warnings.push('Η αυτόματη αναγνώριση αύξησε την ευαισθησία σε 220 για αχνές γραμμές χώρων. Έλεγξε τα περιγράμματα στο πρωτότυπο.');}
 }
 if(input.sourceMode==='raster'&&!result.stats.rooms&&!result.stats.surfaces)result.warnings.push('Δεν βρέθηκαν κλειστοί χώροι. Οι αναγνωρισμένοι τοίχοι είναι επεξεργάσιμοι· συμπλήρωσε τα κενά ή πρόσθεσε χώρους.');
 result.plan.notes=result.warnings.join('\n');self.postMessage({result,rasterThreshold,ms:performance.now()-t});
}catch(error){self.postMessage({error:error.message});}};
