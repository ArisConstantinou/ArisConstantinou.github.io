# Archer mobile distance surface — 1.6.45 verified milestone

Protected predecessor:1.6.44, e42d046fd26edae634e45705c3ec4d87a5ccfe52. The full-world60FPS goal remains OPEN; this is a courtyard geometry/performance milestone.

## Changed

- Mobile Archer gains optional LOD3 below51CSS pixels, returning to original LOD2 above69. Original close/normal/far assets and desktop path stay available. `archerFar=off` selects the original control.
- 19998 →5500triangles per distant Archer (72.5% reduction). Main body17746→3248; all9small parts (2252triangles total), including crossbow, strings, trigger and garment bindings, retain their original exact indices.
- Every original decoded vertex attribute, material, texture,92live bones and8clips is shared unchanged. Actor clones keep one shared live bone palette. Near model is unchanged.
- Atomic validation now rejects any missing source primitive and any changed full-size accessory index order. An invalid/stale recipe leaves the entire original model intact, with a benchmark-visible error. Native acceptance rejects fallback.
- Recipe is bundled in the engine; there is no first-fight network dependency. Per-Archer installed recipe, actual LOD, projected height, triangles and error are included in JSON timeline/configuration. Heavy44remains active.

## Physical iPhone evidence

iPhone14ProMax / iOS27.0.1 / ChromeiOS, native494×856buffer. Exact engine bytes were read from WebKit and matched SHA2562d2a62203f254efb950f3fefa5c1dffdd1e3d27b65370512650aefc4d23329d9. Same initial roster12regular+4bosses and random seed10837 for both complete fights.

| Native run | Combat meanFPS | P95 frame | Kills | Bosses | Summons |
|---|---:|---:|---:|---:|---:|
| Original Archer |48.7108|27ms|19|4|3|
| New distant Archer |52.5577|25ms|19|4|3|

Observed mean improvement7.9% in this pair. Counts match, but frame-dependent paths and kill times differ; not an exact fixed-frame causal comparison or a guarantee. Optimized combat maximum71ms and25–35s windows47–50FPS still FAIL sustained60FPS acceptance.

Steady initial idle geometry528752→470760triangles, matching the57992-triangle reduction across four Archers. All timed Archer samples selected3. All original Heavy recipe5276triangles and mounted-pilot LOD2 remained active. Zero reported game/shader errors; exact saved game and prior benchmark restored after each run.

16native images inspected at65CSS-pixel character height: original/new front/side, aiming idle, walking, ranged shot and reload. Every pair additionally asserts identical live skeleton, original attributes, bind matrix and world transform. Crossbow and small parts retained; small visible texture/normal interpolation differences remain on the reduced distant body. No missing anatomy or detached weapon observed. No claim of pixel-identical images or new close-model quality.

Native same-pose comparison: [original LOD2](archer-1.6.45-idle-lod2.png) / [new distant LOD3](archer-1.6.45-idle-lod3.png). These are unedited physical-phone captures, not PC renders.

525local CPU tests passed. Original actual rig passed32numeric poses across all8clips, within2.5% posed-bound extent loss. No PC gameplay or GPU image/FPS tests.

Stable evidence: `tests/phone/archer-index-lod/original-before.json`, `optimized.json`, `comparison.json`, `visual-review.json`; all16native PNGs use the same folder. CPU evidence: `tests/far-lod/archer-rig.json`, `archer-index-lod.json`, `archer-index-poses.json`.

## Retained / disabled / next

All enemies, bosses, native summons, AI, animation, physics, point lights, fire and smoke remain active. Existing Lambert diffuse, omitted IBL/normal/bump/specular and diagnostic shadow freeze remain; no new feature disabled by45.

Recipe SHA256aed8176b7bb2f321317ec5daddd42b19b695026f94b493a54cfdbbeacfb851ef; original GLB SHA2565a211d638fea6f993a7c94a8852fb1cdf57e2691c54bf67cc2b3d6ae87915ddb. Portable build uses derived/archer-index-lod.json or explicit MAGIC_ARCHER_INDEX_DATA. Same already-approved Meshoptimizer v1.3 MIT vendor; no new download/install/paid tool.

Next: remaining boss/world render work, long combat frames and dynamic-shadow acceptance. Require two full near60FPS fights before extending to room2; full-world traversal/combat remains the final objective.
