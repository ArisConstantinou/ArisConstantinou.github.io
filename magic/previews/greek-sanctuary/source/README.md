# MAGIC — Greek gate sample source

This directory records the exact source used for this isolated preview. The primary release is unchanged.

## Editable 3D source

- greek-sanctuary-kit.blend: Blender 5.1.2 authoring scene, separate objects/collections for column, entablature, bronze leaf, cypress leaf, moving slab, single/double retaining trays, weight and aspis.
- build-kit.py: reproducible authoring/export script. Run from the project root; output is _source/public/greek-sanctuary.
- assets/doric-column-original.glb: original Innerscene CC0 model, preserved byte-for-byte; provenance.json records its hash and license page.
- Runtime exports are in ../greek-sanctuary/. glTF 2.0, Y-up, metres, static meshes. Door pivots sit at the bottom hinge; leaves remain separate.
- Runtime gate clearance: 5.2 m wide x 4.25 m high; secret opening: 1.65 m x 2.9 m. Source leaf height 3.54 m is scaled explicitly in greek-environment.js.
- Physical bodies are separate boxes, updated with the doors and both navigation grids; source meshes are not merged across moving parts.

## Game code

Three.js 0.180.0, cannon-es 0.20.0, Vite 7.1.7, fixed strict port 5173. Copy source into a local project with its public/models, public/environment-b, public/greek-sanctuary, public/icons and public/licenses folders taken from the sibling preview folders. npm ci; npm run dev -- --base=/previews/greek-sanctuary/. The Greek sample is enabled only under that URL path and has its own save key.

Tests: npm test (200 passing). The project also retains browser interaction, route, native mouse/touch and before/after benchmark reports in report.json. Mobile evidence is desktop Chrome emulation, not a physical phone.

The frozen character source and exports come from the existing approved project preview, preserving their original licenses. New custom source and assets are provided as part of this project; the CC0 claim applies only to the attributed third-party CC0 assets.

Pressure tray update: double plinth 3.32 x 1.72 m, single plinth 1.72 x 1.72 m. Low 0.36 m retaining rails and a central divider keep the two weight sockets separate. The double unit is west of the central approach, which remains clear for HEARTH. Physics/nav fixtures are authored in pressureTray() in greek-puzzle-rules.js. A weight must be released and supported to count.

## Castle rollout
Greek architecture covers all fourteen rooms. Edit roomColours, dressGreekRooms, greekWall and greekFloor in src/greek-environment.js. Rounded stone components share instanced geometry in 18 m tiles; meshes and pivots from the original editable kit remain intact. src/greek-progression.js selects boss/engine pressure gates, three fire shortcuts and three single secret gates; it places reachable supplies outside world fixtures and the engine. Every possible engine room is verified using actual physics and navigation, without burning a gate first. New single secret openings are 2.1 m wide with matching wall returns; main corridor clear width is 3.75 m and clear height 4.25 m. All new gameplay is scoped to the Greek preview route.
