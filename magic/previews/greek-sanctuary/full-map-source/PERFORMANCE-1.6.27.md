# Magic 1.6.27 source candidate: rendering and diagnostics

This is a source-only candidate. It is not a published game release, a verified 200 FPS desktop result, or a verified sustained 60 FPS iPhone result.

## Changes

- Skip only the colour draw of a skinned mesh whose conservative current bone bounds lie completely outside the room mask, including the full fog transition fringe. Keep shadow rendering, actor simulation, animations, models and materials.
- Reuse unchanged rigid prop matrices, reduce repeated targeted joint traversal and shadow bookkeeping allocations, and reuse the HUD number formatter. Preserve moving, reparented and animated paths.
- Capture the reported sustained 60 to 39-40 FPS transition. Previously, automatic diagnostic capture required FPS below 36. It now requires three consecutive windows below 45 after a high-cadence window. Short stalls and background gaps remain excluded. Cause is explicitly unconfirmed.
- Support one externally selected generated build root and keep preview saves separate from the public game.

## Evidence and limitations

- 388 game tests and 31 integration/root tests pass; production build passes. The installed gameplay client completed two iterations in playing state without browser errors; its final screenshot was inspected.
- The new 39/40 FPS regression test failed before the threshold correction and passes afterwards. Brief 40 FPS recovery, background gaps and existing 28 FPS capture tests pass.
- Sixteen fixed-pose colour comparisons across mobile layout and desktop, eight scenes each, retain identical pixel bytes with actual 4x MSAA and the same freshly rendered shadow map. Holding shadows fixed is a colour-test control, not a runtime quality change.
- Initial courtyard skinned-colour culling removes eight draws and 57,699 submitted triangles in the measured pose. Actual live desktop/mobile-layout ABBA sampling measured approximately 12% lower GPU time for that idle case; it does not establish phone FPS.
- Six-enemy live combat stayed functional, but changing draw counts across the sequential windows prevent a causal combat speedup claim.
- A separate interior no-room-mask shader experiment increased desktop GPU time from approximately 1.08 to 1.33 ms and was removed. Its failed comparisons and experimental sources remain local; it is not part of this candidate.
- The device report is iPhone 14 Pro Max, Chrome, public GitHub build. The device is currently unavailable. The delayed idle decline and sustained combat 60 FPS remain unresolved. Do not infer thermal throttling, a browser cap or completed performance acceptance.
- Archer, Iron Warden and Gargoyle reference designs were approved separately; their unfinished model sources are not included here.

No graphics-quality settings, geometry assets, textures or permanent ambient audio were changed by this candidate.
