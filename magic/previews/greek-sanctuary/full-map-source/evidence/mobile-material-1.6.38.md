# Mobile material profile 1.6.38

Physical device only: iPhone14ProMax / iPhone15,3, iOS27.0.1, Chrome iOS. Game buffer494x856; visible viewport430x745. No PC gameplay or desktop FPS acceptance.

## Applied candidate

- Temporary mobile Lambert vertex lighting, environment IBL OFF and normal/bump maps OFF. Metallic/roughness specular shading is omitted in this mobile approximation. User explicitly authorized diagnostic disabling and fixes.
- Original mesh geometry, colour/AO/emissive textures, point lights, HEARTH fire, smoke, animations, attacks, summons and physics retained. Original roughness/metalness textures remain in assets and the full reference shader; Lambert does not use their specular lighting.
- Shared256KiB R8 three-dimensional noise lattice replaces repeated noise hashes in both jets and smoke. Smooth interpolation, volume shape/depth, damage and32mobile ray samples retained. Noise tiles every64units and lattice values use one byte.
- Material profile applies before shader compilation and also to late material clones. Source textures are not deleted or disposed by the profile.
- Full material/fire reference on mobile: `?mobileIBL=1&mobileNormals=1&fireNoise=procedural` (append other benchmark parameters when comparing). Desktop uses the full material/fire profile.
- Benchmark JSON reports actual environment presence and normal-mapped material count. Export name remains `magic-benchmark.json`.
- The existing courtyard fixture freezes shadow generation after initial frames. This remains a diagnostic limitation, not a full-world shadow solution.

## Cause isolation

IBL OFF alone: real full battle31.11FPS/P9541ms/max181ms;19 kills including all four bosses. It failed the courtyard gate and was not published alone.

IBL OFF, exactly the same frozen combat pose after six seconds of real fighting:

| Control | FPS | P95 ms |
| --- | ---: | ---: |
| Baseline |32.47|33|
| Fire shaders omitted |34.53|32|
| Point lights omitted |59.92|18|
| Normal/bump maps omitted |59.94|19|
| Fire and lights omitted |58.89|19|
| Restored baseline |32.20|33|

Frozen rendering identifies a shading interaction; it is not a real-combat acceptance result. Point lights and fire stay enabled in the candidate. Global mediump was rejected because the canvas was black. Precomputed tangents and partial BRDF precision did not improve valid rendering; neither was integrated.

## Validation

Canonical build passed. Source suite:454 game tests and34 outer tests passed. A phone validation caught27 visible normal-mapped materials in the first implementation: cached interior clones copied original maps back after preparation. The corrected profile handles visible sources before copying and rechecks late materials at drawing; regression tests cover both paths. The incomplete candidate was not published.

Final candidate physical full fight: idle59.48FPS; combat48.33FPS/P9530ms/max176ms/13frames over50ms; settle57.77FPS. All four bosses killed, original12regular+4boss roster, native summons and attacks, no errors.110 valid Lambert programs and6 noise programs, zero link failures;0visible normal-mapped materials and4visible active point lights at the final inspection. The actual engine bytes were retrieved from WebKit and SHA-256 matched the canonical build: `fc4632ffa2532cf9ab45200679e8e02577cdc1903890816cad089ce89df2fa72`. Exact save/benchmark restoration and closed connections verified.

This is one visual full battle and an intermediate improvement over the last public full battle34.64FPS. Natural fight paths vary. The screenshot capture is included in measured intervals. It is NOT sustained60FPS acceptance. The courtyard gate still requires two clean complete battles with mean>=59FPS/P95<=20ms/no combat frames>50ms. Full-world progression has not started; the goal remains active.

Private raw evidence and exact save backups remain in the canonical generated tests folder. Public evidence omits saved game data and USB connection details.
