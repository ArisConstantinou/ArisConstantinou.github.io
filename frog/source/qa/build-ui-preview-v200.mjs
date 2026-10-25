import {build} from 'esbuild';
import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
await build({absWorkingDir:root,entryPoints:['qa/preview-v200-entry.js'],bundle:true,format:'iife',platform:'browser',target:['chrome110'],outfile:'qa/preview-v200.js',minify:true,logLevel:'info'});
const [html,js,css]=await Promise.all(['preview-v200.html','preview-v200.js','preview-v200.css'].map(name=>readFile(new URL(name,import.meta.url),'utf8')));
if(/@import|url\(\s*["']?https?:\/\//.test(css))throw new Error('The inline preview must not load external styles or fonts.');
const inline=html
  .replace('<base href="../">','<base href="../public/">')
  .replace('<link rel="stylesheet" href="./qa/preview-v200.css">',()=>'<style>'+css.replaceAll('</style','<\\/style')+'</style>')
  .replace('<script type="module" src="./qa/preview-v200.js"></script>',()=>'<script>'+js.replaceAll('</script','<\\/script')+'</script>');
await writeFile(new URL('preview-inline-v200.html',import.meta.url),inline);
