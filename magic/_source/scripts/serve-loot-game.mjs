import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const source=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const target=path.resolve(process.argv[2]||'');
if(!process.argv[2]||JSON.parse(await fs.readFile(path.join(target,'package.json'),'utf8')).name!=='magic-the-exiled')throw new Error('Existing MAGIC runtime required');
for(const mode of process.argv.includes('--source-only')?['game']:['game','build']){
 const destination=path.join(target,'.cache',(process.env.MAGIC_PREVIEW_NAME||'loot')+'-'+mode);await fs.mkdir(destination,{recursive:true});
 if(mode==='game'){
  await fs.cp(path.join(source,'src'),path.join(destination,'src'),{recursive:true});
  await fs.cp(path.join(source,'public'),destination,{recursive:true});
  await fs.copyFile(path.join(source,'index.html'),path.join(destination,'index.html'));
 }else await fs.cp(path.join(source,'.release'),destination,{recursive:true});
}
console.log('http://127.0.0.1:5173/.cache/loot-game/');
