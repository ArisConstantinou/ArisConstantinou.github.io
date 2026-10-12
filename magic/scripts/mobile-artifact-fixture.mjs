import fs from 'node:fs/promises';
import path from 'node:path';

// Vite rewrites built worker URLs and adds source maps. Serve the saved release
// bytes only inside the owned QA browser to test the publishable artifact.
export async function installArtifactFixture(context, root, prefix) {
  const sw = await fs.readFile(path.join(root, 'sw.js'), 'utf8');
  const allowed = new Set([...JSON.parse(sw.match(/const PRECACHE = (\[[\s\S]*?\]);?/)[1]), 'sw.js']);
  const mime = {'.js':'text/javascript', '.html':'text/html', '.css':'text/css', '.json':'application/json', '.webmanifest':'application/manifest+json', '.glb':'model/gltf-binary', '.svg':'image/svg+xml', '.png':'image/png'};
  await context.route('**' + prefix + '**', async route => {
    const relative = decodeURIComponent(new URL(route.request().url()).pathname.slice(prefix.length)) || 'index.html';
    if (!allowed.has(relative)) return route.abort();
    await route.fulfill({body:await fs.readFile(path.join(root, relative)), contentType:mime[path.extname(relative)] || 'application/octet-stream'});
  });
}
