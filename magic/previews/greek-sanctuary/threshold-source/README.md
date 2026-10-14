# MAGIC — Threshold sample A

The human selected the Malbork + Pierrefonds references with “Go a”, 14 October 2026. The sample's resulting art was subsequently rejected. Its controls and loading are maintained while work moves to the complete game map; it is not an accepted final appearance or the complete fourteen-room release.

Local: http://127.0.0.1:5173/previews/greek-sanctuary/threshold.html

Public destination: https://arisconstantinou.github.io/magic/previews/greek-sanctuary/threshold.html

## Editable source and import

- `layout.js`: deterministic parametric architecture, materials, circulation, physical floors, stairs and gates. Metres; Y up. Seed 613.
- `runtime.js`: isolated scene using the real mage, HEARTH controller/rig, pressure rules, retained trays, FireSpell and Cannon physics. No combat/AI/loot substitutes are presented as a finished game.
- `threshold.html`: native keyboard, pointer and touch controls and six architectural views. Camera-facing castle walls and roofs are cut away during play; physical walls remain. Architectural views show the actual enclosing shell.
- `exports/threshold-architecture.glb`: 360,980,720-byte local static architecture export; 225 mesh nodes, 2,718,502 vertices, no missing normals; successfully reimported with the pinned Three GLTFLoader. Not published as a GitHub blob. Materials/textures embedded at up to 2048px; the runtime continues loading the smaller original JPEG maps. Procedural fire and behavior remain in source. Wizard/HEARTH rigs remain their separate original assets.
- `build.mjs`: additive build into `../site/threshold.html`; existing game entry files are not overwritten. Run from the owned MAGIC worktree. Pinned dependencies: Three 0.180.0, Cannon 0.20.0, Vite 7.1.7; no package installation or version change.
- `baseline/`: exact shared-module state before this work. Two narrow shared changes: exported custom-frame gate constructor, and configurable HEARTH drive response (existing game default remains 9; sample stairs use 30). Existing source includes other owners' work and is not broadly committed.

## Architecture and fidelity

The Gothic side uses paired groin vaults, clustered stone piers, deep pointed windows with leaded lights, continuous door returns and a stair to a supported upper gallery. The Greek side changes paving, materials, proportions and building types: ochre limewashed barrel vault, thick masonry, exterior stair and terrace; the sanctuary retains eight by seventeen perimeter column positions with asymmetric losses, exposed cella and a fractured pediment. The roof is absent. Fallen drums are placed outside the main route.

The Greek house is a **vernacular reference**, not a claim that contemporary Santorini houses are Classical-period buildings. Pierrefonds likewise incorporates nineteenth-century restoration. The temple is adapted for gameplay, not an archaeological reconstruction: its central intercolumniation is widened by 1.4 m for HEARTH. Detailed historical pediment/metope sculpture, broader settlement variation and the full 70/30 stage remain outside this sample. Visual acceptance has not been assumed from successful functional tests.

References inspected in the local source-linked reference board:

- https://zamek.malbork.pl/wnetrze/letni-refektarz/
- https://www.chateau-pierrefonds.fr/decouvrir/la-cour-d-honneur
- https://www.chateau-pierrefonds.fr/decouvrir/histoire-du-chateau-de-pierrefonds
- https://santorini.gr/architecture-art-culture/
- https://santorini.gr/villages/
- https://www.ysma.gr/en/monuments/parthenon/

Research photos remain local and are not republished as licensed game assets.

## Assets, scope and provenance

Existing Poly Haven barrels, crates, shield, urn and floor surfaces, plus the editable Greek kit and current character/HEARTH models, are reused. Added material downloads are CC0 Poly Haven assets: white_plaster_02, marble_rock_03, slate_floor, old_sandstone_02. Full source URLs, authors, original hashes and byte counts are in `../site/threshold-materials/provenance.json`. The sandstone set was evaluated during development; retained download is not a separate paid asset. License: https://polyhaven.com/license . No Meshy/image generation, agents, purchases or paid downloads were used.

The double tray is one fenced unit with two distinct indestructible weights; a separate single tray opens the secret chamber. Existing gravity/contact rules decide occupation. HEARTH's real nozzle streams burn the wooden house door. Holding a weight never counts as pressing a slab. New telekinesis input lifts before carrying to clear the retaining rim.

## Verification

`verification/report.json`: 23 runtime checks pass, including native pointer placement, one weight insufficient, native C/E absorption/wake/boarding, physical ascent/descent, upper-floor exit/reboard, actual HEARTH flame, and traversal of the double door, temple, terrace, house and secret chamber. Route cases explicitly seed only their initial state; movement is simulated through the actual controller and Cannon gravity. Camera projection is synchronized before native pointer coordinates are computed.

27 focused unit tests passed (hearth-rules, greek-puzzle-rules, walkable-support). The prescribed develop-web-game client ran two native movement sequences; screenshots were inspected. `package-check/report.json`: five checks pass, including real browser touch input, 390px fit, GLB roundtrip and absence of collisions with shared published assets. All 72 loaded resources were inspected; existing shared files are byte-identical.

`benchmark/report.json`: sequential desktop Chrome tests on NVIDIA RTX 5080, DPR1, same hall/temple views before and after visual refinement, 35 warmup +150 measured frames. Refined frame p95 4.4–4.6 ms; JS update/render-submission p95 2.0–2.6 ms, zero frames above 33.3 ms. GPU time, native RAM/VRAM and physical-phone performance are not measured. New draw counters include shadow and postprocessing passes; old direct-render counters do not include every pass, so those counts are not a like-for-like draw-call comparison. A synthetic pointer-capture test in this benchmark failed because it invented a pointer ID; the separate native CDP touch test passed. The failed report is retained rather than hidden.

The GLB is intentionally a large editable archival export, not the web payload. Task-attributable usage and credits are unavailable. Last account checkpoint: weekly usage 27%, ordinary usage allowed; this is account-wide, not task cost.

## Remaining goal

The human prioritised the complete connected game map and selected an elevated perspective camera. Work continues in `../full-map`, within the real game rather than another isolated art sample. Final 70/30 art distribution, regional architecture, ruined temple and full integration remain required. Preserve the primary release, unit-redesign worktree, original assets and fixed port 5173.

## Loading correction (2026-10-14)
The reported static loading mask was reproduced: at 25 seconds unused stone textures were still pending; the original scene appeared only after roughly a minute. The sample now loads only the mage, required props/Greek gate pieces and three used material sets. The full game keeps the original loader defaults; no visible textures, geometry or rigs were reduced. A sample-only build transform excludes unused character declarations without changing the shared character source.

Cold-cache comparison at the same 2 MiB/s and 30ms latency: 125,251,283 -> 80,205,972 encoded bytes, 99 -> 67 requests; 63,245 -> 40,802 ms until playable. This is a controlled network comparison on PC, not a claim about every public connection. Loading now shows five actual completed asset groups plus lighting preparation. Failed files and the 90-second asset deadline offer an explicit retry. The 90-second stalled-request path was exercised with Playwright's virtual clock; native retry loaded the scene after both failure cases. Seven loading checks, four error/deadline/retry checks and 23 gameplay checks passed. Final public verification is recorded separately in the owned source folder. Large local GLB export remains unchanged.

## Camera-relative movement correction

Native W/A/S/D previously stayed on world X/Z after camera rotation. In the frozen before build, 25 of 34 checks fail, including all four keys at 90, 180 and 270 degrees for both mage and HEARTH. The corrected build passes all 34 identical cases, including actual right-drag camera rotation. `camera-movement.js` projects the live camera forward/right directions onto the horizontal ground plane and preserves analogue strength. Pointer aiming and physical collision stay in world coordinates. All 23 existing interaction checks and 215 source unit tests pass. Camera-facing facade geometry now has a separate cutaway group, so the castle exit no longer hides the moving character. This is a visibility change; physical wall returns and locked doors remain solid.
