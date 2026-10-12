import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const runtime=path.resolve(process.argv.slice(2).find(a=>!a.startsWith('--'))||path.join(process.env.USERPROFILE,'Documents/ChatGPT/Magic/_source'));
if(JSON.parse(await fs.readFile(path.join(runtime,'package.json'),'utf8')).name!=='magic-the-exiled')throw new Error('Existing MAGIC runtime required');
const mode=process.argv.includes('--build')?'build':'game';
const target=path.join(runtime,'.cache','mobile-'+mode);
await fs.mkdir(target,{recursive:true});
if(mode==='game'){
  await fs.cp(path.join(root,'_source/src'),path.join(target,'src'),{recursive:true});
  await fs.cp(path.join(root,'_source/public'),target,{recursive:true});
  await fs.copyFile(path.join(root,'_source/index.html'),path.join(target,'index.html'));
  await fs.copyFile(path.join(root,'_source/package.json'),path.join(target,'package.json'));
}else {
  await fs.cp(path.join(root,'_source/.release'),target,{recursive:true});
  await fs.copyFile(path.join(root,'_source/.release/index.html'),path.join(target,'index.htm'));
}
console.log('http://127.0.0.1:5173/.cache/mobile-'+mode+'/'+(mode==='build'?'index.htm':''));
