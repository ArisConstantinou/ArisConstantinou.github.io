import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Publish only this independent concept at a labelled path on MAGIC's existing
// server. No process launch, port choice, gameplay edits or save access.
const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const runtimeRoot = process.argv[2];
if (!runtimeRoot) throw new Error('Usage: node serve-goliath-concept.mjs <existing MAGIC _source root>');
const resolved = path.resolve(runtimeRoot);
const metadata = JSON.parse(fs.readFileSync(path.join(resolved, 'package.json'), 'utf8'));
if (metadata.name !== 'magic-the-exiled') throw new Error('Destination must be the existing MAGIC runtime.');
const destination = path.join(resolved, '.cache', 'goliath-concept');
fs.mkdirSync(destination, { recursive: true });
for (const filename of ['index.html', 'style.css', 'viewer.js', 'creature.js', 'layout.js']) {
  fs.copyFileSync(path.join(sourceRoot, 'concepts', 'goliath', filename), path.join(destination, filename));
}
console.log(JSON.stringify({ destination, url: 'http://127.0.0.1:5173/.cache/goliath-concept/', copiedFiles: 5 }));
