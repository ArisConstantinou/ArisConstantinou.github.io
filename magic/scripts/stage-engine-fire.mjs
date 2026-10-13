import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';

const root=path.resolve('.'), source=path.join(root,'_source');
const label=process.argv.includes('--before')?'before':'preview';
const output=path.join(source,'.cache',`engine-fire-${label}`);
const servedRoot='C:/Users/arz0r/Documents/ChatGPT/Magic/_source';
const destination=path.join(servedRoot,'.cache',`engine-fire-${label}`);
const baseline=new Map();
if(label==='before')for(const name of ['main.js','hearth-effects.js']){
 const {stdout}=await promisify(execFile)('git',['show',`6caca2f:_source/src/${name}`],{cwd:root,maxBuffer:2*1024*1024});
 baseline.set(path.join(source,'src',name).replaceAll('\\','/'),stdout);
}
const {build}=await import(pathToFileURL(path.join(source,'node_modules/vite/dist/node/index.js')));
await build({root:source,configFile:path.join(source,'vite.config.js'),plugins:[{
 name:'isolated-engine-fire-save',load(id){return baseline.get(id.replaceAll('\\','/'));},transform(code,id){
  if(id.replaceAll('\\','/').endsWith('/src/main.js'))return code.replace("'magic-integrated-preview-v1'","'magic-engine-fire-preview-v1'");
 }
}],build:{outDir:output,emptyOutDir:true}});
await fs.mkdir(destination,{recursive:true});
await fs.cp(output,destination,{recursive:true});
const html=await fs.readFile(path.join(output,'index.html'),'utf8');
// .htm is served as plain HTML: Vite does not inject the shared HMR client.
// This keeps another candidate's HMR errors out of this compiled preview.
await fs.writeFile(path.join(output,'index.htm'),html);
await fs.writeFile(path.join(destination,'index.htm'),html);
const main=html.match(/src="\.\/([^\"]+\.js)"/)[1];
const metadata={label,root,base:'6caca2f',url:`http://127.0.0.1:5173/.cache/engine-fire-${label}/index.htm`,main,
 sha256:createHash('sha256').update(await fs.readFile(path.join(output,main))).digest('hex'),save:'magic-engine-fire-preview-v1'};
await fs.mkdir(path.join(root,'output/playwright/engine-fire'),{recursive:true});
await fs.writeFile(path.join(root,'output/playwright/engine-fire',`build-${label}.json`),JSON.stringify(metadata,null,2));
console.log(JSON.stringify(metadata));
