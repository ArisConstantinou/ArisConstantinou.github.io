# Mobile combat resource reuse — 1.6.36

## Latest physical report

The supplied 1.6.35 baseline6 report contains six enemies and no bosses: idle53.3618FPS, combat45.6748FPS, settle58.2781FPS. Combat P95 is41ms, maximum224ms, six frames exceed50ms and one exceeds100ms. All six enemies died, with zero errors. Five-second windows:57.75,59.76,42.58,27.34,52.60,59.72,57.48FPS. The selected scene is lighter than the prior all-boss20.06FPS workload, but it has not reproduced the older1.6.32six-enemy59.26FPS run. Different workload/device conditions prevent attributing the entire gain or remaining regression to one model.

Measured combat CPU sections total about4.41ms on average versus21.89ms mean frame interval. The224ms interval records7ms across CPU sections. GPU timing is unavailable. This report cannot establish a GPU, thermal, browser scheduling or driver root cause.

## Implemented changes

- Scenario-specific asset selection: baseline6/regular12 load mage/guard/archer/heavy and HEARTH, without Warden, Colossus, Gargoyle, Wraith or stone-minion startup loads. Individual-boss presets load their actual boss and summon dependencies. All-boss remains supported. JSON records loadedAssetPlan.
- Damage sprites and expanding rings now retain and reuse meshes/materials between appearances. Ring geometry is shared. Idle retention is bounded to16rings and23sprites; concurrent rings are never silently dropped. Opacity, color, transforms and textures reset on reuse. Expired labels release their texture references; inactive pooled materials point to a tiny placeholder, so evicted textures are not retained by dead labels.
- Detached pooled effect representatives are passed to the existing asynchronous shader preparation before play. This prepares their shader keys and retains ownership between effects. It does not claim that every game shader/upload is prewarmed or that phone frame stalls are solved.
- Saved-report loading now accepts current schema3, preserving old schema1/2 support. Previously schema3 was saved but excluded when reopening the game.
- LIST/JSON history contains the latest phone result and these changes. Default remains six enemies/bosses OFF; enemy HP, AI, physics, animation and visual detail are unchanged.

## Evidence and limits

Two targeted regressions failed before correction: expired ring material disposal and schema3 report reload. They pass after correction.481unit checks, production build and installed game-client checks passed. Nine scenario checks cover asset requests and dependencies, six-enemy and all-boss battle completion, rendering/AI OFF and saved-report restoration. Canonical evidence: tests/combat-resource-reuse. Desktop Chrome/mobile asset profile is functional evidence; a physical-phone FPS improvement is still unverified.

Commit/publication details and latest post-publication results are retained in the project progress.md and the stable publication receipt. No original GLB, rig, animation, texture or backup was deleted.
