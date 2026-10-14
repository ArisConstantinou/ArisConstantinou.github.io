# MAGIC — Greek architecture and HEARTH traversal study

Editable source for the isolated architecture sample, not the complete combat game.

- sanctuary-layout.js: metres, Y up, temple, propylon, stoa, circular sanctuary, floors, stairs, physical colliders and 17 traversal routes.
- sanctuary.js: existing HEARTH rig, Cannon body, keyboard/touch input and furniture instancing.
- game/: exact transitive project modules used by the sample. Puzzle rules are a furniture module dependency; pressure puzzles are not enabled in this sample.
- RESEARCH.md: primary references, adaptations and remaining full-game work.

## Rebuild
Node 24.14.0, Three.js 0.180.0, cannon-es 0.20.0 and Vite 7.1.7. Dependencies are pinned by package-lock.json. With those dependencies available, run npm run build. Output is build/sanctuary-study.html and build/assets/. Place that output alongside the existing preview's models/, greek-sanctuary/, environment-b/, icons/ and architecture-research.html. These resources are reused without modification and intentionally not duplicated here. Use the project's existing server at 127.0.0.1:5173; do not start a second project server or change its port.

## Assets and rights
The existing HEARTH model/rig, Greek shield and Poly Haven antique ceramic vase retain their existing project provenance and licenses. No new Meshy generation, purchase or external asset download was used for this sample. Institutional plans/photos were research references only; they are not included or used as textures. Three.js and Cannon license files remain in ../../licenses/.

The architecture and furniture are editable parametric Three.js source. This is not a surveyed Parthenon reconstruction, and no Blender export or Unreal integration is claimed. Sculpted pediments/metopes and final material detailing remain outside this architectural sample.

## Verification and limits
34 physical routes passed in both directions, including all twelve stoa rooms, both stairs, temple chambers and the circular sanctuary. Keyboard and emulated touch, stair rest/reversal and both railings passed. Desktop and mobile viewport measurements are from Chrome on an RTX 5080 PC, not a physical phone. Reports are in ../../architecture-evidence/.

Full-game wizard boarding/dismount, layered navigation, combat, aiming, loot, shadows, pressure puzzles and universal secret-room clearance remain to be integrated and verified. The previous game entry remains unchanged.
