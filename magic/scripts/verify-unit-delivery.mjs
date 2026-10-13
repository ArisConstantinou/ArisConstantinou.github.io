import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const hash=b=>createHash('sha256').update(b).digest('hex');
const primary='C:/Users/arz0r/Documents/ChatGPT/Magic';
const release='_source/.release',url='http://127.0.0.1:5173/.cache/latest-locomotion-delivery/';
async function files(directory,prefix=''){const list=[];for(const e of await fs.readdir(directory,{withFileTypes:true})){const f=prefix+e.name;if(e.isDirectory())list.push(...await files(path.join(directory,e.name),f+'/'));else list.push(f);}return list.sort();}
const report={date:new Date().toISOString(),url,checks:[],files:[]};
const check=(pass,label,data)=>report.checks.push({pass:!!pass,label,data});
for(const f of await files(release)){const built=await fs.readFile(path.join(release,f)),canonical=await fs.readFile(f),response=await fetch(url+(f==='index.html'?'index.htm':f)),served=Buffer.from(await response.arrayBuffer());check(response.ok&&hash(built)===hash(canonical)&&hash(built)===hash(served),f+' canonical/build/served SHA256 match');report.files.push({file:f,bytes:built.length,sha256:hash(built)});}
for(const f of ['bosses/colossus.glb','bosses/gargoyle.glb','hearth-bulwark/hearth-bulwark.glb'])check(hash(await fs.readFile('_source/public/models/'+f))===hash(await fs.readFile('models/'+f)),f+' authoring export matches delivered asset');
const git=(...args)=>execFileSync('git',['-C',primary,...args],{encoding:'utf8'}).trim();report.primary={head:git('rev-parse','HEAD'),branch:git('branch','--show-current'),status:git('status','--short')};check(report.primary.head==='01352e5fa929e1ae28951444686903e8f190d9c9'&&report.primary.branch==='codex/trajectory-collision'&&report.primary.status==='?? concepts/','Protected primary commit/source and unrelated concepts preserved',report.primary);
await fs.mkdir('output/locomotion/delivery',{recursive:true});await fs.writeFile('output/locomotion/delivery/hashes.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({files:report.files.length,checks:report.checks.length,failures:report.checks.filter(c=>!c.pass)}));if(report.checks.some(c=>!c.pass))process.exitCode=1;
