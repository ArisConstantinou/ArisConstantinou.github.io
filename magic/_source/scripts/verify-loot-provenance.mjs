import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=path.resolve('.'),release=path.join(root,'_source/.release'),output=path.join(root,'output/loot-combat/provenance.json');
const hash=b=>createHash('sha256').update(b).digest('hex');
async function files(directory,prefix=''){const list=[];for(const e of await fs.readdir(directory,{withFileTypes:true})){const name=prefix+e.name;if(e.isDirectory())list.push(...await files(path.join(directory,e.name),name+'/'));else list.push(name);}return list.sort();}
async function matches(url,file,expected,gitText=false){
 const text=/\.(html|js|css|json|webmanifest|txt|svg)$/.test(file);
 // Vite adds its client/source maps and turns direct CSS fetches into modules.
 // Decode its raw import to verify the exact served artifact source instead.
 const r=await fetch(url+file+(text?'?raw&import':''));let served=r.ok?Buffer.from(await r.arrayBuffer()):Buffer.alloc(0);
 if(text){const value=served.toString().match(/export default ("(?:[^"\\]|\\.)*");?/);if(value)served=Buffer.from(JSON.parse(value[1]));else throw new Error('Missing raw artifact import: '+file);}
 const eolNormalized=gitText&&text;
 if(eolNormalized){expected=Buffer.from(expected.toString().replace(/\r\n/g,'\n'));served=Buffer.from(served.toString().replace(/\r\n/g,'\n'));}
 return{file,status:r.status,method:text?'decoded Vite raw import':'direct HTTP bytes',eolNormalized,expected:hash(expected),served:hash(served),pass:r.ok&&hash(served)===hash(expected)};
}
const current=await files(release),stable=execFileSync('git',['ls-tree','-r','--name-only','9cec13c'],{encoding:'utf8'}).trim().split(/\r?\n/).filter(f=>/^(engine\/|models\/|icons\/|licenses\/|index\.html$|sw\.js$|manifest\.webmanifest$|assets-credit\.json$)/.test(f));
const report={date:new Date().toISOString(),candidate:[],protectedBaseline:[],base:'9cec13c'};
await fs.mkdir(path.dirname(output),{recursive:true});
for(const file of current)report.candidate.push(await matches('http://127.0.0.1:5173/.cache/loot-build/',file,await fs.readFile(path.join(release,file))));
for(const file of stable)report.protectedBaseline.push(await matches('http://127.0.0.1:5173/.cache/goliath-build/',file,execFileSync('git',['show','9cec13c:'+file],{maxBuffer:16*1024*1024}),true));
await fs.writeFile(output,JSON.stringify(report,null,2));const bad=[...report.candidate,...report.protectedBaseline].filter(x=>!x.pass);console.log(JSON.stringify({candidate:report.candidate.length,protectedBaseline:report.protectedBaseline.length,failures:bad}));if(bad.length)process.exitCode=1;
