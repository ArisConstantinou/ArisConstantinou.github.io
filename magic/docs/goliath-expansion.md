# MAGIC — Goliath and castle expansion

## Authorization and delivery state

The user requested a 10-stone cap, hold-R transformation of 7 stones into a bodyguard, more surrounding enemies, a larger connected castle, and boss channelled summoning. They explicitly selected physical enemy attraction/body blocking, and enlargement of the existing castle. They approved starting the independent concept with “ok”. During concept work they added two requirements: visible stone-by-stone assembly, and more rooms/enemies/bosses than the initial four-room addition.

The user approved the completed stone-assembly concept and expanded castle with the subsequent “ok”. The playable expansion is now implemented and verified in the isolated checkout. When the user asked why the boss looked like Goliath, they explicitly chose existing enemies with summoning effects. That supersedes the initial violet stone-minion proposal. The four bosses keep the existing heavy character style; only the player's bodyguard is Goliath. Main-checkout promotion and public deployment await final approval under AGENTS.md section 12.

## Protected base and preview

- Main checkout: `C:/Users/arz0r/Documents/ChatGPT/Magic`, branch `codex/trajectory-collision`, clean commit `30717d7`, MAGIC 1.1.2.
- Concept checkout: `C:/Users/arz0r/.codex/worktrees/magic-goliath-concept/Magic`, branch `codex/goliath-concept`, based on that exact commit.
- Permanent runtime: `http://127.0.0.1:5173/`, existing Vite PID 29964. No second listener or port change.
- Independent concept: `http://127.0.0.1:5173/.cache/goliath-concept/?assembly=1`. The labelled path is served by the same Vite process; copied concept files live only in the main checkout's ignored cache. It neither opens nor writes the game profile.
- No gameplay/source/runtime bundle changes in the main checkout, no downloads, installs, dependency changes, paid image/API work or agents. No remote configured; no public release or promotion.

## Phase 1: actual concept delivered

Editable Three.js source in `_source/concepts/goliath/`. `creature.js` imports the actual game's stone prefab geometry, grain/bump texture and material. Goliath is 3.40 m tall and has exactly seven main rock meshes: head, chest, pelvis, two arms and two legs. Mint inlaid runes and six magical joints distinguish the ally. The initial violet stone-minion proposal was rejected and its viewer card now displays the existing 1.85 m guard. The real mage GLB is a 1.85 m scale reference. Front/side/back/three-quarter views, walking and protective poses are functional.

The assembly demonstration lasts 6.13 seconds: seven actual ground stones travel consecutively into legs, pelvis, chest, arms and head. The same mesh identities remain visible throughout; each geometry morphs continuously from the source rock into the final body mass. Runes/joints illuminate after attachment. No fade disappearance, replacement mesh, instant Goliath spawn or flash conceals assembly. Pause/resume/replay and exact timeline scrubbing are available. This duration is a visual proposal, not yet a hold-R cooldown or production ritual duration. Ground positions in the concept are staged; production must start at the seven selected stones' actual positions.

The updated plan has 14 main rooms plus the original bridge, 64 ordinary enemies and 4 bosses. Original courtyard, hall and crypt remain. Eleven additions: armoury, barracks, prison, ritual chamber, library, forge, catacombs, sanctum, gallery, watchtower and guardhouse. Fifteen new corridors create alternate loops between wings instead of isolated dead ends. Boss sites: crypt, ritual chamber, forge, sanctum. Each room receives 4–6 ordinary enemies. Plan rectangle areas do not overlap: 883.8 m² original, 2,589 m² added, 3,472.8 m² proposed total (~3.93×). All new doors are 3 m wide. This proves schematic connectivity/area, not built collision geometry or physical navigation.

## Phase 2: implemented playable slice

- Cap simultaneously active player-conjured stones at 10, counting held stones; scenery rocks never consume slots. Destroyed/expired/consumed stones free slots.
- A short R tap retains stone creation. With at least 7 eligible stones, a hold starts a cancellable ritual (initial proposal: 2-second charge). Mobile uses hold on the existing stone button. Suppress keyboard-repeat stones. Cancellation/release, pause, focus loss and touch cancellation must consume none.
- Select exactly seven conjured stones, reserve their identities and start positions, check a safe final placement, assemble them visibly, then activate the completed Goliath. Never charge seven stones for a failed placement or consume scenery/enemies. Preserve original stone expiration outside the ritual.
- One physical bodyguard at a time; proposed 420 HP, 40-second duration. It follows the mage and blocks/draws nearby enemy attacks, rather than globally redirecting wizard damage. No additional damage spell. Validate doorway clearance, no trapping and recovery paths.
- All four bosses use a visible interruptible channel: 3 seconds to summon up to 3 existing guards/archers/heavies with violet effects, 18-second full cooldown, maximum 6 living minions per boss. Damage/stun/guard break cancels spawning and gives a 4-second retry delay. Crowding or the global enemy cap can reduce the actual safe spawn count.
- Keep all wizard damage, mana, speed, ability costs, cooldowns, upgrades and current collision-aware aiming unchanged except the requested stone cap.
- Verify counts 0/6/7/10, exact consumption, charge/assembly cancellation, held objects, one-companion limit, expiry/death/restart, keyboard/native emulated touch, shield/aim/swipe regressions, physical melee/arrows against the Goliath, boss interruption/completion and frame spikes. Promote no failing slice.

## Phase 3: implemented approved world expansion

Construct the accepted rooms with the existing castle style and actual navigable openings. Preserve relic/escape route and original material/art direction. Add mixed guards, archers/heavies and four existing-style bosses. Threat comes from more enemies, flanking, reinforcements and summoning, not wizard nerfs. Additional bosses reuse the available boss visual/character style; no unsupported new character asset is assumed.

The old initial proposal of 22 ordinary enemies + 1 boss and a global hostile cap of 32 is superseded by 64 + 4 across the larger castle. A tentative total living-hostile ceiling is 96 to allow four bosses' capped minions plus reinforcements. Nearby AI/pathfinding activation and encounter density need validation; 64 distributed enemies must not silently turn into a 32-enemy castle. No invisible spawning in walls, inaccessible floors or unannounced surrounding groups. Use room entrance warnings. Test crowding and worst-case boss/minion/companion interactions before deciding any performance tradeoff.

Final tests: every room/door/relic/escape route, all bosses/channels, safe spawns, complete mission, upgrades/saves, units/physics, real production build/worker, native desktop/portrait/landscape interaction, comparable before/after gameplay frame timing and long-session resource behavior. Emulated touch on an RTX 5080 PC does not prove phone performance or physical Safari input.

## Verification evidence for this concept

- 90 browser checks passed across 1440×1050 desktop, 390×844 portrait and 844×390 landscape: actual assets, 7 mesh identities, all assembly stages, smooth attachment thresholds, pause/resume/replay, restored standing pose, views/protection/walking, no page overflow, touch targets, unchanged renderer resource counts after repeated controls, no profile writes and healthy baseline root game 1.1.2. Zero browser errors.
- Three independent schematic checks passed: no overlapping floor rectangles, every corridor touches both named rooms with a >=3 m opening, all 14 rooms/bridge connected. These are layout checks, not a physics integration claim.
- Required develop-web-game client completed assembly end to end; captures show three parts, six parts, then seven parts. All screenshots visually inspected, including profile/back, protection, map and intermediate assembly frames.
- Final concept short frame benchmark: default Chrome ANGLE/D3D11 on RTX 5080, DPR 1, one browser/context at a time, 240 real rAF samples per pose/view size. Standing 239.98–240.02 FPS, assembly 240.00–240.05, walking 240.00; p95 4.3 ms throughout, maximum 4.5 ms; zero frames >50 ms. Rendered full cast: 92 calls / 12,455 triangles, 82 geometries / 9 textures. No quality downgrade was applied. This is the small concept, not an estimate of the expanded game's performance. CPU/GPU utilization, RAM/VRAM and long-session leaks were not measured.
- Initial failures exposed hidden-rune diagnostic bounds and a rapid terminal chest twist; bounds now include visible geometry, and arc/spin decelerate with the same smooth progress. The original continuity threshold was retained. Profile review also replaced raised rune tubes with facet-projected inlaid ribbons.
- Test browsers closed completely, with empty remaining PID lists. Shared main checkout stayed clean at 30717d7; the original 5173 listener stayed PID 29964.
- Evidence: `output/goliath-concept/verification/report.json`, `plan-report.json`, screenshots and browser lifecycle log; `output/goliath-concept/final-skill-smoke/` holds assembly state/captures. These generated outputs remain ignored.

## Reproduce

From this checkout, publish only the concept to the existing runtime:

```powershell
node _source/scripts/serve-goliath-concept.mjs C:/Users/arz0r/Documents/ChatGPT/Magic/_source
node scripts/verify-goliath-concept.mjs
node scripts/verify-goliath-concept.mjs --plan-only
node C:/Users/arz0r/.codex/skills/develop-web-game/scripts/web_game_playwright_client.js --url http://127.0.0.1:5173/.cache/goliath-concept/ --actions-file _source/concepts/goliath/assembly-actions.json --click-selector '#assemble-button' --iterations 3 --pause-ms 50 --screenshot-dir output/goliath-concept/final-skill-smoke
```

No new port/server/dependency installation is needed. Main game build/tests were not rerun because none of their sources, dependencies or generated runtime changed in this concept phase; a native root game smoke and git/listener verification checked isolation.

## Usage and next decision

Usage milestone 2026-10-11 17:57:39 Asia/Nicosia, get_usage_limits: 7% of shared weekly account window consumed, ordinary usage allowed. This is not 7% attributable to the task. Task-attributable usage and consumed credits: unavailable. No paid API/purchase/reset. Active model/reasoning not exposed; GPT-5.6 Sol high remains the previously proposed setting, not a verified applied switch. Full expanded implementation is a high-effort estimate including gameplay, physics/navigation and device/performance verification; the current authorized concept is a bounded first phase.

Current decision: review the verified playable candidate at `http://127.0.0.1:5173/.cache/goliath-build/`, then approve promotion into the protected main checkout if desired. No remote is configured here, so public deployment requires work in the actual Pages repository and separate authorization.

## Final playable verification — 1.2.0 candidate, 2026-10-11

- Source preview `/.cache/goliath-game/`; compiled preview `/.cache/goliath-build/`; one existing listener, PID 29964 / port 5173. Save namespace `magic-goliath-preview-v1`, production namespace `magic-exiled-v1`. Candidate service-worker registration disabled to protect the live cache. The main tracked checkout stayed clean at `30717d7`.
- 10 active conjured-stone slots count held stones. A 2-second native R / touch-button hold reserves the nearest seven visible reachable stones; 6.13-second sequential assembly transfers their original mesh UUIDs, world positions and rotations into the seven articulated parts. Consumption happens only after successful completion. Cancellation restores original geometry, material, velocity and expiry time. One ally, 420 HP / 40 seconds, actual physical body and navigation; no additional damage ability or global damage redirection.
- Actual enlarged world: 14 main rooms + bridge, 15 new connections, 3472.8 square metres (~3.93x original), 64 ordinary initial enemies + 4 bosses. Existing floor/wall/prop/character style, original relic boss and extraction retained. Entry warnings precede reinforcements by 2.5 seconds. Already-alert enemies keep pursuing across rooms; inactive distant actors avoid unnecessary work. Five nearest torch lights retain the existing budget.
- Unit tests: 64/64. Physics integration: zero failures, 16/16 ballistic cases, 3 floor-seam traversals, 3 wall containment cases, 2 actual physical pursuits, original theft/alarm/reinforcement/extraction mission passed. The focused physics harness isolates boss channels; all four channels are tested in the live browser.
- Live source browser: 134/134 checks over 1440x900 desktop, 390x844 portrait and 844x390 landscape. Includes all room/doorway routes for mage and Goliath, actual bodyguard doorway travel, stone cap, six-stone hold fallback, key repeat, native touch cancellation/blur handler, exact mesh transfer/7-consumption/8-leaves-1, pause and assembly restoration, physical melee and arrow interception, pulse immunity, expiry/death/restart, every boss's existing character types/interruption/completion/six-minion ceiling, last global hostile slot / 96 cap, original mission and isolated saves. Native pointer/finger regression: 24/24 aim directions, 36/36 preview/release directions, 21/21 other controls. Zero browser errors.
- Character rendering merges only compatible skins with identical material, bind matrices, local transform and bones; vertices/UVs/normals/weights and rigid accessories retained. Shared skeletons stay within each actor. All 24 comparisons (four real models x six animation poses) preserve deformed vertices within 0.00003 m and exact triangle counts. No asset, texture, animation or dependency downgrade. Before/after pose screenshots inspected.
- Compiled bundle: 19/19 native checks, all three viewports; 68 initial actors, version/profile isolation, stone input, actual compiled trajectory-worker replies and a complete seven-stone ritual using unmodified bundle/native R/mouse/movement/pulse/dash. Initial bridge attempt was correctly rejected without consumption; a later stationary attempt completed the ally but the unprotected mage died during assembly. The final protocol uses existing pulse/dash to keep playing; no health/AI change or test criterion relaxation. Main bundle `engine/index-DLYHom8f.js`, CSS `engine/index-BfrYhR8w.css`, worker `engine/trajectory-worker-BQJ33uYB.js`, 18 files / 3.54 MiB, cache `1b353280c3dee94e45aac0ab`. Generated HTML newlines normalized before hashing to remove the mixed Windows/Vite CR character found by the diff check. The pre-existing >500 kB warning remains.
- Required game-skill smoke: two movement/dash iterations, screenshots and text state passed. Owned browsers closed, empty remaining PID lists. Offline installation and physical iPhone/Safari were not tested.
- Source/documentation diff and script syntax checks clean. Five inherited whitespace lines in the generated Three.js shader strings are byte-identical to the protected baseline; they were not manually edited. Final required client rerun is recorded at `output/expansion/skill-final/`.
- Continuous real runtime assembly recorded at `output/expansion/assembly-video/goliath-assembly.webm`: normal clock/native R, frames with 1/3/5/7 attached parts then active ally. Test-only fixture places the seven real stones and stuns enemies to isolate animation; no shipping cheat hooks. No generated or retouched imagery.

### Performance and limits

Chrome ANGLE / D3D11, RTX 5080, 1440x900, DPR 1, high quality, one browser/context, 240 actual frame intervals per phase. Protected opening baseline ~240 FPS / p95 4.3 ms. Expanded opening 238 FPS, assembly 234, active Goliath 240, held trajectory 171; p95 4.3 / 4.3 / 4.3 / 12.5 ms. All 96 enemies deliberately gathered into view: 71.6 FPS, p95 16.8 ms, max 20.9 ms; alarm pursuit 71.3 FPS, p95 16.8 ms, max 25 ms. Zero frames >50 ms in all phases. Initial unoptimized stress was ~35-41 FPS; compatible-skin merging and suppression of invisible telegraphs removed the diagnosed overhead while geometry/animations stayed intact.

Full-composer render counters: opening 378 calls / 871292 cumulative triangles, stress 1386 calls / 1699646 cumulative triangles (includes shadow/post passes). Load 2305 ms in this local warm-asset run. Six complete ritual/restart cycles stabilized at 82 geometries, 42 textures, 380 physics bodies. This is a bounded resource check, not proof of no long-session leak. Absolute RAM/VRAM, GPU/CPU utilization, physical phone FPS and Safari input remain unmeasured. Native emulated touch runs on the PC GPU.

Evidence: `output/expansion/before.png`, `after-opening.png`, `game-report.json`, `aim-final/report.json`, `build/report.json`, `character-comparison/report.json`, `performance.json`, assembly video/frames and room/boss screenshots. Before/after opening use the same 1440x900 camera and fresh run; actor count/layout differ as requested and live timing is slightly different. No edited comparison frames.

Reproduction in this worktree:

```powershell
cd _source
npm test
npm run test:physics
npm run build
cd ..
node _source/scripts/serve-goliath-game.mjs C:/Users/arz0r/Documents/ChatGPT/Magic/_source
node scripts/verify-goliath-game.mjs
$env:MAGIC_TEST_URL = 'http://127.0.0.1:5173/.cache/goliath-game/'
$env:MAGIC_TEST_OUTPUT = 'output/expansion/aim-final'
node scripts/verify-aim.mjs --no-performance
node scripts/verify-goliath-build.mjs
node scripts/verify-character-optimization.mjs
node scripts/benchmark-goliath-game.mjs
node scripts/capture-goliath-assembly.mjs
```

Implementation usage milestone 2026-10-11 18:58:23 Asia/Nicosia, `get_usage_limits`: 8% of the shared weekly account window used, ordinary usage allowed. Task-attributable weekly use and consumed credits unavailable. No paid API, purchase, reset, installation or agents. Active model/reasoning was not exposed or changed. All implementation/tests remained within the approved isolated candidate; main promotion remains the final approval step.


## R hold repair - 1.2.1 candidate, 2026-10-11

The user reports that R tap creates a stone but holding R never shows charging. Diagnosis used owned Chrome on the exact candidate URL; the computer-use tool could not initialize its kernel, so the user's live in-app session was not inspected. A hold with seven nearby stones already worked in the old candidate. Confirmed failures were the same press creating the seventh stone never rechecking eligibility, and the HUD claiming readiness from total owned stones even when fewer than seven were nearby and visible.

A sustained press now rechecks after 150ms and continues directly into the original 2-second charge. With six eligible stones and insufficient mana, it waits for the original 16-mana cost and conjures only the seventh. Releasing that partial charge restores all seven without creating an eighth; an ordinary tap remains one stone. The HUD shows the actual nearby eligible count, and invalidation explains the distance/wall requirement. Stone reach/visibility/expiry, cap 10, assembly 6.13s, wizard statistics/costs/upgrades, other controls and encounter balance are retained.

Visual testing also found the completed Goliath could be ejected vertically by overlapping actors: its feet origin reached Y 10.69m and most of its body left the camera. The ungrabbable bodyguard now uses the physics engine's vertical motion constraint on the flat castle floors; mass, horizontal collisions/knockback and damage remain physical. A first zero-clearance attempt blocked at a coplanar floor seam. A 2cm clearance resolved that contact without editing floors, doors or navigation. The unchanged doorway criterion passes at X -21.29m, body-centre Y 1.67m, and the native combat scenarios retain Y 1.67 on all three viewports.

Verification:

- Before: 18 focused native input checks,9 ritual failures over desktop/portrait/landscape. Same press created seven but never charged, assembled or activated an ally. After: 34/34 source checks and 33/33 compiled checks, including short tap, seventh-stone sustained hold, cancellation/no extra eighth stone, mana regeneration, completed ally/actual seven consumption, and grounded bodyguard in combat. The source-only distant-stone fixture additionally verifies that seven remote stones show 0/7 eligible rather than readiness.
- Final full game 137/137 checks, 64/64 units, 0 physics failures: 16 ballistic cases, 3 floor seams,3 containment walls, 2 pursuits and the original relic/alarm/escape mission. Physical interception/melee protection, doorway follow, death/expiry and every boss channel/minion cap still pass. Compiled 19/19 additional checks include the actual hashed trajectory-worker response and full native seven-stone assembly.
- Aim regression originally returned 23/24 because one supposed empty northeast point intersected a guard; actual alignment was 0.9999887. Throws 36/36 and other controls 21/21 passed. Optional MAGIC_TEST_SEED reproduces the scene without changing shipping randomness or relaxing any criterion; the final seeded 7431 aim run passes 24/24. No game aiming code changed. Reports preserve the initial result and the final one.
- Required develop-web-game client completed two movement/dash iterations after the final source change. Gameplay captures and text state inspected. All final browser reports have zero errors and no remaining owned PIDs. Physical phone/Safari remains untested; touch emulation uses the PC GPU.
- Final build 18 files /3.54MiB: main engine/index-BFN79omF.js, existing CSS index-BfrYhR8w.css and worker trajectory-worker-BQJ33uYB.js, cache 9f7121e06457bc8f76c62434. Pinned dependencies unchanged; inherited >500kB warning retained. The five whitespace lines in generated Three.js shader strings exactly match d034d50 and are not manually edited.
- Short ABBA comparison:seed 7431,1440x900,DPR1,high quality,ten real stones and stunned NPCs,one owned Chrome context at a time,180 real frame intervals per sample,RTX 5080/ANGLE-D3D11. Before 143.52/154.83FPS; after 154.28/150.00FPS. p95 8.5-12.5ms,max 12.8ms,zero frames>50ms. No regression demonstrated within shared-PC variability. This measures the readiness-HUD scene, not physical phone performance or all crowded combat situations; the previous broader expansion measurements above remain a separate run.

Evidence is ignored under output/ritual-fix:threshold-before,after,build,visual-diagnostic,aim-after,aim-final,performance,skill and unit/physics logs. Before/after charge screenshots use the same seeded opening,1440x900 camera and native press timing; live enemy/toast timing can differ slightly. The completed-ally screenshots show the real runtime. No generated/retouched image or shipping cheat hook.

Reproduce after publishing the isolated candidate to the existing 5173 cache routes:

```powershell
node scripts/verify-ritual-hold.mjs
$env:MAGIC_RITUAL_URL='http://127.0.0.1:5173/.cache/goliath-build/'
$env:MAGIC_RITUAL_OUTPUT='output/ritual-fix/build'
node scripts/verify-ritual-hold.mjs
node scripts/verify-goliath-game.mjs
node scripts/verify-goliath-build.mjs
$env:MAGIC_TEST_URL='http://127.0.0.1:5173/.cache/goliath-game/'
$env:MAGIC_TEST_OUTPUT='output/ritual-fix/aim-final'
$env:MAGIC_TEST_SEED='7431'
node scripts/verify-aim.mjs --aim-only
node scripts/benchmark-ritual-hud.mjs
```

Last account usage measurement 2026-10-11 19:48:52 Asia/Nicosia, get_usage_limits: 9% of the shared weekly account window used, ordinary usage allowed. Task-attributable weekly use and consumed credits unavailable. No paid API, purchase, reset, installation or agents; active model/reasoning was not exposed or changed. Repair stays on isolated codex/goliath-concept; protected main 30717d7 and listener PID 29964/5173 remain unchanged. No remote configured,public deployment and main promotion still await approval. Reload the candidate page to load 1.2.1; the user's existing tab was not reset by these tests.
