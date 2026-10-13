import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const root=path.resolve(fileURLToPath(new URL('..',import.meta.url))),source=path.join(root,'_source');
const primary='C:/Users/arz0r/Documents/ChatGPT/Magic/_source',before=process.argv.includes('--before'),label=before?'before':'preview',base='01352e5fa929e1ae28951444686903e8f190d9c9';
const output=path.join(source,'.cache',`latest-locomotion-${label}`),destination=path.join(primary,'.cache',`latest-locomotion-${label}`);
const originals=new Map();
if(before){
 const files=execFileSync('git',['ls-tree','-r','--name-only',base,'_source/src'],{cwd:root,encoding:'utf8'}).trim().split('\n');
 for(const f of files)originals.set(path.join(root,f).replaceAll('\\','/'),execFileSync('git',['show',`${base}:${f}`],{cwd:root,encoding:'utf8',maxBuffer:4*1024*1024}));
}
const {build}=await import(pathToFileURL(path.join(source,'node_modules/vite/dist/node/index.js')));
await build({root:source,configFile:path.join(source,'vite.config.js'),publicDir:before?path.join(primary,'public'):path.join(source,'public'),plugins:[{
 name:'isolated-unit-locomotion',load:id=>originals.get(id.replaceAll('\\','/')),transform(code,id){if(id.replaceAll('\\','/').endsWith('/src/main.js'))return code.replace("'magic-integrated-preview-v1'",`'magic-unit-animation-${label}-v1'`);}
}],build:{outDir:output,emptyOutDir:true}});
const html=await fs.readFile(path.join(output,'index.html'),'utf8');await fs.writeFile(path.join(output,'index.htm'),html);await fs.mkdir(destination,{recursive:true});await fs.cp(output,destination,{recursive:true});
const main=html.match(/src="\.\/([^\"]+\.js)"/)[1],metadata={label,root,base,url:`http://127.0.0.1:5173/.cache/latest-locomotion-${label}/index.htm?hearthQA=1`,main,sha256:createHash('sha256').update(await fs.readFile(path.join(output,main))).digest('hex'),save:`magic-unit-animation-${label}-v1`};
await fs.mkdir(path.join(root,'output/locomotion'),{recursive:true});await fs.writeFile(path.join(root,`output/locomotion/build-${label}.json`),JSON.stringify(metadata,null,2));console.log(JSON.stringify(metadata));
