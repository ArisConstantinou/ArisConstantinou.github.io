# Mobile Heavy distance surface — 1.6.44 verified milestone

Protected public base: 1.6.43 / b97eb2421e8539a221ec0cb663d3d3eaca4eb9db. One canonical build and fixed native evidence directories. Full-world60FPS goal remains OPEN.

## Changed

- Actual mobile devices load one build-pinned index table, bundled with the engine. No first-battle sidecar network request.
- Heavy gains optional LOD3: enter below51CSS pixels, leave above69. Original LOD0/1/2 and their thresholds remain available; desktop and `heavyFar=off` retain the original path.
- 21889 → 5276 triangles per distant Heavy (75.9% reduction). Original positions, UVs, normals, joint indices/weights, materials, textures,67bones and7clips are shared unchanged. No extra actor bone palette.
- Validate every index/attribute hash before attaching any mesh, then prepare picking/shaders before combat. Fail safely to the original model, recording the actual integration error in benchmark JSON. The native acceptance check rejects that fallback.
- JSON now records each Heavy's installed recipe, actual LOD, projected size, triangles and integration error throughout the battle.

## Evidence and limits

- 524 local CPU tests passed; no PC gameplay/render/FPS test. Actual original rig:28numeric clip poses, maximum bounds loss within2.5% of posed extent; this numeric check alone is not visual proof.
- Physical iPhone14ProMax, iOS27.0.1, ChromeiOS; native render494×856. Candidate bytes were read back through WebKit and matched the canonical engine SHA256.
- Native full fights, same initial roster12regular+4bosses and random seed10837: original43.1292FPS/P9530ms with25kills/9summons; new48.7639FPS/P9527ms/max79ms with19kills/3summons. All4bosses defeated, zero reported errors, exact original storage restored after both. **Summon workloads differ: no causal meanFPS gain or sustained60FPS claim.**
- All native Heavy samples selected LOD3 in the optimized fight. Separate original/new native images use the same65CSS-pixel character, camera and frozen live idle/walk/chop pose, front/side. All12images inspected: hood/body/cloak/axe retained; small pixel/normal/texture interpolation differences visible. Near model is unchanged. Earlier visual-only follow-up images obscured by the benchmark results overlay are rejected.
- Saves and existing benchmark restored exactly; final phone returned to the protected public menu. Source-linked evidence is in the stable `tests/phone/heavy-index-lod` directory, including original-before.json, optimized.json, visual-review.json and comparison.json.

## Retained diagnostic compromises

Lambert diffuse, omitted IBL/normal/bump/specular, original shadow-generation freeze remain. All enemies/bosses/summons, AI, animation, physics, point lights, fire and smoke remain active. No new feature disabled by44.

## Reproduction

Build input: derived/heavy-index-lod.json, SHA25621f55dd3f7c3efe1b3af8b3150ddf8701f7767dc8645df8bf0aaa95f6f1e5e5c. Integration build.mjs resolves the virtual module from this file, or the explicitly supplied MAGIC_HEAVY_INDEX_DATA path. Runtime validates decoded original attributes and indices before use.

Index table generated using the explicitly approved Meshoptimizer v1.3 MIT simplifier, weighted normals/UVs and posed positions. Official source: https://github.com/zeux/meshoptimizer/tree/v1.3 . No simplifier runtime/global install or new paid dependency is shipped.

Next required gate: identify remaining full-combat cost; obtain two complete>=59FPS/P95<=20ms fights without>50ms stalls and accept dynamic shadows before extending to room2. This release is a verified geometry/resource improvement only.
