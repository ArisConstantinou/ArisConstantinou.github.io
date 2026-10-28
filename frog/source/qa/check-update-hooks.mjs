import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
assert.match(html, /<script\b[^>]*data-frog-updater[^>]*src=["']\.\/update\.js["']/,
  'Keep the automatic updater hook in source/index.html');
for (const file of ['update.js', 'update-worker.js']) {
  assert.ok(readFileSync(new URL('../public/' + file, import.meta.url)).length > 0,
    'Keep the automatic update infrastructure in future releases');
}
console.log('Automatic update hooks: verified');
