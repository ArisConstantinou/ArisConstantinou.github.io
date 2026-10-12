import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const root=path.resolve('.'),directory=path.join(root,'source/bosses');
const assets=JSON.parse(await fs.readFile(path.join(directory,'asset-validation.json'),'utf8'));
const hash=data=>createHash('sha256').update(data).digest('hex');
const models=[];
for(const [type,metadata] of Object.entries(assets)){
 const bytes=await fs.readFile(path.join(root,'_source/public/models/bosses',type+'.glb'));
 models.push({type,file:'models/bosses/'+type+'.glb',sha256:hash(bytes),bytes:bytes.length,source:'source/bosses/'+type+'.blend',sourceSha256:hash(await fs.readFile(path.join(directory,type+'.blend'))),...metadata});
}
const provenance={date:'2026-10-11',authorization:['User approved all three concepts: implement them','All three in every run; random room assignment, each in its own room','Increase actual model resolution and detail'],tools:{blender:'5.1.2',three:'0.180.0',cannon:'0.20.0',vite:'7.1.7'},sourceType:'Original project-authored geometry, rigs, actions and procedural surface maps; approved AI-generated concept references. No third-party model downloads.',models};
await fs.writeFile(path.join(directory,'provenance.json'),JSON.stringify(provenance,null,2)+'\n');
const creditPath=path.join(root,'_source/public/assets-credit.json');const credit=JSON.parse(await fs.readFile(creditPath,'utf8'));
credit.originalBosses={sourceType:provenance.sourceType,source:'source/bosses/README.md',models:models.map(({type,file,sha256,bytes,bones,triangles,clips})=>({type,file,sha256,bytes,bones,triangles,clips}))};
await fs.writeFile(creditPath,JSON.stringify(credit,null,2)+'\n');
console.log(JSON.stringify({models:models.map(({type,bytes,sha256})=>({type,bytes,sha256}))}));
