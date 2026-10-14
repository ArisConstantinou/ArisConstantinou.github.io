# MAGIC connected-map candidate source

This snapshot reproduces the full-map preview while keeping the primary game and previous preview entries unchanged. The complete art objective remains in progress. See the adjacent full-map-evidence reports and the main README.

Pinned runtime: Three.js 0.180.0, Cannon-es 0.20.0, Vite 7.1.7. From this folder, install the locked game dependencies with `npm ci --prefix game` if absent, then run `node build.mjs`. No installation is performed by opening the preview. Run `node --test navigation.test.js` for layered navigation and `node --test game/src/*.test.js` for game rules.

The build emits site/full-map.htm and site/engine/*. Keep those beside the existing licensed models/, greek-sanctuary/, environment-b/ and icons/ directories in this preview; original models and license records are already provided in the adjacent asset directories. The build does not duplicate large models or include node_modules. Preserve strict port 5173.

Camera movement follows its bearing for mage and HEARTH. Complete obstructing wall sections and attached decoration are hidden, while physical collisions remain. Middle drag rotates the full game; the earlier threshold sample still uses right drag.

The present ground footprints are rectangular and the Greek/Gothic regional art, ruined Parthenon and broader upper-floor combat verification are still pending. This is a playable integration candidate, not a completed art release.
