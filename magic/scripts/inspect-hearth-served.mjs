import fs from 'node:fs/promises';
const html=await fs.readFile('_source/.release/index.html','utf8'),main=html.match(/src="\.\/([^\"]+\.js)"/)[1];
const a=await fs.readFile('_source/.release/'+main,'utf8'),r=await fetch('http://127.0.0.1:5173/.cache/hearth-bulwark/'+main),b=await r.text();let i=0;while(i<a.length&&a[i]===b[i])i++;
console.log(JSON.stringify({status:r.status,file:main,localBytes:a.length,servedBytes:b.length,firstMismatch:i,local:a.slice(Math.max(0,i-160),i+200),served:b.slice(Math.max(0,i-160),i+200),tail:b.slice(-150)}));
