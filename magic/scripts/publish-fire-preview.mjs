// Publish only into an ignored subdirectory of the existing server's root.
// This does not modify its source, normal build, server, port or saves.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const source=path.resolve('_source/.release');
const serverRoot=String.raw`C:\Users\arz0r\Documents\ChatGPT\Magic\_source`;
const target=path.join(serverRoot,'.cache/fire-sample');
if(!target.startsWith(path.join(serverRoot,'.cache')+path.sep))throw new Error('Invalid preview destination');
// Keep preview files outside public/: Vite copies every public file into builds.
// Preserve the temporary static-serving experiment in the ignored cache.
const staticExperiment=path.join(serverRoot,'public/.cache/fire-sample');
const archive=path.join(serverRoot,'.cache/fire-sample-static-audit');
if(await fs.stat(staticExperiment).catch(()=>null)){
 if(await fs.stat(archive).catch(()=>null))throw new Error('Static audit archive already exists');
 await fs.cp(staticExperiment,archive,{recursive:true});
 const preserveThenRemove=async(relative='')=>{
  for(const entry of await fs.readdir(path.join(staticExperiment,relative),{withFileTypes:true})){
   if(entry.isSymbolicLink())throw new Error('Unexpected symlink in owned staging directory');
   const next=path.join(relative,entry.name),original=path.join(staticExperiment,next);
   if(entry.isDirectory()){await preserveThenRemove(next);await fs.rmdir(original);}
   else{
    const a=await fs.readFile(original),b=await fs.readFile(path.join(archive,next));
    if(!a.equals(b))throw new Error('Archive mismatch: '+next);
    await fs.unlink(original);
   }
  }
 };
 await preserveThenRemove();
 await fs.rmdir(staticExperiment);
 await fs.rmdir(path.dirname(staticExperiment));
}
await fs.mkdir(target,{recursive:true});
await fs.cp(source,target,{recursive:true});
const html=await fs.readFile(path.join(target,'index.html'),'utf8');
const main=html.match(/src="\.\/([^\"]+\.js)"/)[1];
console.log(JSON.stringify({url:'http://127.0.0.1:5173/.cache/fire-sample/index.html',main,sha256:createHash('sha256').update(await fs.readFile(path.join(target,main))).digest('hex')}));
