import {convertDrawing} from './drawing-geometry.mjs';
self.onmessage=e=>{try{const t=performance.now();self.postMessage({result:convertDrawing(e.data.scene,e.data.options),ms:performance.now()-t});}catch(error){self.postMessage({error:error.message});}};
