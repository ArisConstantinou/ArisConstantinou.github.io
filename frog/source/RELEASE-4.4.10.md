# Βαλτομαχίες 4.4.10

Mobile UI and Settings layout editing

- Stable movement/jump/dash/fire positions across all three classes. Default controls reserve space for the map and HUD instead of packing jump on top of the map. Inactive ground kick and persistent aiming instructions no longer clutter gameplay; contextual attacks remain available.
- Jump is visible for every frog, including while mounted. Mounting, KO and using both air jumps retain their existing availability limits.
- Settings → ΘΕΣΕΙΣ ΚΟΥΜΠΙΩΝ & UI opens the frozen real game. Drag control or HUD outlines, or select any item and use arrow keys. The toolbar can also be dragged aside. Save, Cancel/Escape and Reset current orientation are explicit.
- Includes movement/aim/fire/jump/dash/class attack, map, ammo, bases, timer, camera, goals, FPS, status/notice/KO indicators, context interactions and separate desktop keyboard/mouse indicators. Creator branding stays fixed at top left; actor/world name labels follow their world objects.
- Independent portrait, landscape and desktop profiles under frog-ui-layout-v2. Safe legacy preferences migrate without overwriting frog-touch-layout-v1. Custom positions remain freely movable and are only clamped to safe screen edges.
- Editing never starts/resumes a round, consumes ammo or rewrites the saved game. Continuous 3D rendering stops while editing. Saving/cancelling returns to Settings.
- The user approved a clean, standalone transparent signature edited with built-in image_gen from the original title artwork. It replaces the rejected CSS/SVG extraction. The2.08MB1536×1024 source PNG and exact prompt/provenance are retained in assets-source; the game loads a proportional384px lossless WebP with alpha, without cropping. Original title PNG and all3D assets remain unchanged. No Meshy purchase or API fallback was used.

Validation:1474 source tests; pinned production build/update-hook checks; six headless Chromium viewports, actual tap single/double jumps for all classes, HUD/control clearance, title and paused-round editor, drag/save/cancel/reset/Escape, exact round/save/camera freeze, orientation profiles and reload. Additional mounted and simulated aiming-layout hit tests cover touch contexts. Standard develop-web-game client and source/public screenshots inspected.

HUD-only before/after timing is recorded separately; it is not a phone FPS benchmark. Physical iPhone14ProMax/Chrome is unavailable, so this release does not certify physical FPS or a2x improvement.
