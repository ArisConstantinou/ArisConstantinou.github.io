# MAGIC connected-map candidate source

This snapshot reproduces the full-map preview while keeping the primary game and previous preview entries unchanged. The complete art objective remains in progress. See the adjacent full-map-evidence JSON reports. Older published PNG evidence remains archived; the new stair and statue comparison images are retained in the local deliverable.

Pinned runtime: Three.js 0.180.0, Cannon-es 0.20.0, Vite 7.1.7. From this folder, install the locked game dependencies with `npm ci --prefix game` if absent, then run `node build.mjs`. No installation is performed by opening the preview. Run `node --test navigation.test.js clearance.test.js collision-box.test.js` and `node --test game/src/*.test.js` for rules.

The build emits site/full-map.htm, site/engine/* and site/statues/*. It uses regenerated statues/exports when available, otherwise the six GLBs in the adjacent ../statues/models directory. Keep the existing licensed models/, greek-sanctuary/, environment-b/ and icons/ directories beside the emitted entry. This source snapshot excludes node_modules, the packed Blender source and original scans to keep the hosted artifact within its existing storage budget. The complete local deliverable retains those files and original hashes; Blender preparation/compression scripts and provenance are included here. Preserve strict port 5173.

Camera movement follows its bearing for mage and HEARTH. Complete obstructing wall sections and attached decoration are hidden. Stairs instead hide only obstructing three-tread sections with their matching cheeks and stringers. Physical walls, doors and stair treads remain solid. Middle drag rotates the full game; the earlier threshold sample still uses right drag. Secret entries are 3.8m wide and 4.25m high for the unchanged compound HEARTH body.

Caryatid, Venus and Artemision marble replicas occupy courtyard, gallery and sanctum respectively. Each has source-derived fracture geometry, collision damage, nine initial shards and native fragment pickup. Caryatid attribution and CC BY 4.0, Venus/Artemision CC0 provenance and Draco license accompany the runtime assets. See statues/LICENSES.md.

The present ground footprints are rectangular and the Greek/Gothic regional art, ruined Parthenon and broader upper-floor combat verification are still pending. This is a playable integration candidate, not a completed art release. Desktop browser checks do not establish physical-phone performance.
