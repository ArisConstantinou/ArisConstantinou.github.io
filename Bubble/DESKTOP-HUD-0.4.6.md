# Bubble desktop HUD 0.4.6

Play: https://arisconstantinou.github.io/Bubble/?v=0.4.6

This release adds the requested realistic keyboard display on the left and mouse display on the right. All 27 assigned keycaps are represented: WASD, arrow keys, Shift, Ctrl, Space, T, E, R (reload), F, X, Alt, B, G, V, C, I, Escape and 1-4. Shared left/right modifiers stay lit until both are released. Mouse left/right/middle indicators support simultaneous button presses. Middle click is an indicator only, not a new game binding.

The panels are read-only, click-through displays. They do not generate movement, shots or tool actions. They clear on focus loss, page hiding and game menus. They remain hidden in touch mode, preserving the approved inner-aim/outer-fire joystick ring and independent thumb controls. Existing text-selection/copy/paste restrictions remain unchanged. No typing history, storage or network telemetry is added.

This is an additive UI release over the currently deployed 0.4.4 gameplay core, not an overwrite using the older draft ZIP. The game-engine files, Controls implementation, map, physics, opponents and character save format are unchanged. The page title/version identifies the HUD release as 0.4.6; the engine diagnostic/version remains 0.4.4. All changes are scoped to Bubble/; the latest Plan Editor update is preserved.

Verification completed locally: 50/50 checks using Chromium/SwiftShader on Linux and the actual production source. Tests cover all assigned visual bindings, diagonal movement without shots, mouse button chords, manual charge, focus loss, menus, FPS, click-through behavior, no selection, and layout at 1730x865, 1600x900, 1280x800, 1024x768, 900x500 and 430x744. Touch visibility was checked at 430x744 and 932x430 with emulated touch, not a physical iPhone or Safari. The uploaded source blob hashes were matched to the locally tested files before commit.

Refresh the page; do not clear site data, which would remove the locally saved character.
