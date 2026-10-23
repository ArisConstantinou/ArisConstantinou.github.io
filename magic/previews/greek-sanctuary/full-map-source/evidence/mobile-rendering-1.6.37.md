# Mobile rendering 1.6.37

The full battle on the connected iPhone improved from 20.10 to 34.64 FPS in the latest measurement. Stable 60 FPS is NOT achieved.

## Applied changes

- Mobile uses SMAA instead of native multisample antialiasing, with the original 494 x 856 drawing buffer, models, textures, animation, lights and effects.
- Opaque meshes fully inside a room use their original material shader without redundant room-mask work. Conservative posed skin bounds decide eligibility. Boundary, displaced, unsupported/custom and transparent objects retain the existing masked path. All textures are shared; material changes and disposal propagate to the derived material.
- Both interior and boundary shader variants are prepared during loading. The mobile scene is actually drawn into its existing offscreen target for the 5/7/11-light variants and Wraith fade, then an asynchronous GPU fence waits for completion. Light, fade and render-target state are restored before yielding.
- Default encounter: 12 regular enemies plus Warden, Colossus, Gargoyle and Wraith, including normal summons.
- No new feature-OFF control. The unpublished regular-model-OFF draft was removed. The previous diagnostic's shadow freeze and single-courtyard scope remain explicitly reported.

## Physical device evidence

Connected iPhone 14 Pro Max, iOS 27.0.1, Chrome iOS. Same initial roster, viewport, quality and drawing-buffer resolution. Natural combat paths, summons and thermal state are not perfectly controlled; intermediate results are not guarantees.

| Build stage | Combat FPS | Combat P95 | Worst combat frame |
| --- | ---: | ---: | ---: |
| Published 1.6.36 baseline | 20.10 | 60 ms | See JSON evidence |
| SMAA first candidate | 37.87 | 43 ms | 1226 ms |
| SMAA + room-interior shaders | 42.34 | 40 ms | 782 ms |
| Fused output + GPU preparation (rejected) | 27.61 | 44 ms | 171 ms |
| Final: separate OutputPass + GPU preparation | 34.64 | 42 ms | 126 ms |

The final battle killed all four bosses and 15 other enemies, including three summons; no runtime errors. Idle 57.68 FPS, settle 40.31 FPS. Original game save and latest benchmark were restored exactly; temporary inspector connections closed and the public menu restored.

The fused SMAA/output experiment is absent from the delivered code. The attempted vertex-cache reorder was also discarded before integration because the original indices were already close to their unique-vertex lower bound.

## Validation and limits

481 source tests passed, including conservative interior limits, material state/disposal, and GPU-fence failure cleanup. Earlier functional/visual checks passed before the user instructed that all further game checks be on the physical phone; those PC checks are not FPS evidence. The final build was played on the physical iPhone and its engine SHA is pinned in the adjacent evidence JSON. No game runs on PC were performed after that instruction.

The benchmark still uses its existing courtyard fixture and reports frame submission cadence, not display scanout. More work is required for stable 60 FPS; this release must not be described as solving that target.
