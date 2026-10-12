import {build} from '../_source/node_modules/vite/dist/node/index.js';
import fs from 'node:fs/promises';
await build({configFile:false,root:'_source',base:'./',build:{outDir:'.cache/hearth-viewer',emptyOutDir:true,rollupOptions:{input:'_source/hearth-viewer.html'}}});
await fs.cp('_source/.cache/hearth-viewer',String.raw`C:\Users\arz0r\Documents\ChatGPT\Magic\_source\.cache\hearth-viewer`,{recursive:true});
