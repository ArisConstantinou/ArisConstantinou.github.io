# MAGIC — Greek gate sample source

This directory records the exact source used for this isolated preview. The primary release is unchanged.

## Editable 3D source

- greek-sanctuary-kit.blend: Blender 5.1.2 authoring scene, separate objects/collections for column, entablature, bronze leaf, cypress leaf, slab, weight and aspis.
- build-kit.py: reproducible authoring/export script. Run from the project root; output is _source/public/greek-sanctuary.
- assets/doric-column-original.glb: original Innerscene CC0 model, preserved byte-for-byte; provenance.json records its hash and license page.
- Runtime exports are in ../greek-sanctuary/. glTF 2.0, Y-up, metres, static meshes. Door pivots sit at the bottom hinge; leaves remain separate.
- Runtime gate clearance: 5.2 m wide x 4.25 m high; secret opening: 1.65 m x 2.9 m. Source leaf height 3.54 m is scaled explicitly in greek-environment.js.
- Physical bodies are separate boxes, updated with the doors and both navigation grids; source meshes are not merged across moving parts.

## Game code

Three.js 0.180.0, cannon-es 0.20.0, Vite 7.1.7, fixed strict port 5173. Copy source into a local project with its public/models, public/environment-b, public/greek-sanctuary, public/icons and public/licenses folders taken from the sibling preview folders. npm ci; npm run dev -- --base=/previews/greek-sanctuary/. The Greek sample is enabled only under that URL path and has its own save key.

Tests: npm test (198 passing). The project also retains browser interaction, route, native mouse/touch and before/after benchmark reports in report.json. Mobile evidence is desktop Chrome emulation, not a physical phone.

The frozen character source and exports come from the existing approved project preview, preserving their original licenses. New custom source and assets are provided as part of this project; the CC0 claim applies only to the attributed third-party CC0 assets.
