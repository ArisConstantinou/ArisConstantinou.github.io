// Published next to build.mjs and the two fixture transform modules.
// Run only inside the project's existing guard job and canonical output root.
import fs from 'node:fs/promises';import assert from 'node:assert/strict';import {fileURLToPath,pathToFileURL} from 'node:url';import path from 'node:path';
assert(process.env.CODEX_GENERATED_OUTPUT,'Use the project storage guard run --spec');
const dir=fileURLToPath(new URL('.',import.meta.url));process.chdir(dir);process.env.MAGIC_SINGLE_ROOM_SOURCE=dir;process.env.MAGIC_GENERATED_ROOT=process.env.CODEX_GENERATED_OUTPUT;process.argv.push('--monument');
let source=await fs.readFile('build.mjs','utf8');source=source.replaceAll(/import\('(\.\/[^']+)'\)/g,(_,rel)=>`import('${pathToFileURL(path.resolve(dir,rel)).href}')`);
const marker='plugins:[integration,...extra,combinedIntegration({replace})]';assert(source.includes(marker));
source=`import {singleRoomCombatPlugin} from '${new URL('./single-room-combat-transform.mjs',import.meta.url).href}';\n`+source.replace(marker,'plugins:[integration,...extra,combinedIntegration({replace}),singleRoomCombatPlugin]');
await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
