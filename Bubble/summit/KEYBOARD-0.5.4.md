# Summit 0.5.4 — browser-safe descent

Play: https://arisconstantinou.github.io/Bubble/?v=0.5.4

## Change

**Hold X to descend. Hold Space to ascend / jump.** Release to brake back toward neutral, using the existing 0.5.2 flight controller. WASD + X and diagonal movement + X require no Ctrl modifier. The HUD key, in-flight prompt and pause instructions now show X.

Ctrl, Command and Alt are not assigned to any Summit gameplay action. Their key events clear held desktop movement/firing/charge and are not interpreted as WASD, descent, reload, camera, map or collection commands. Browser and OS shortcuts themselves remain available: this is a control remap, not a promise that a web page can block Ctrl+W or other browser-reserved shortcuts. Existing document selection/clipboard restrictions remain.

Unmodified controls: WASD/arrows movement, Space ascent/jump, Q/E lean/strafe, Shift sprint, C camera, R reload, B physical gum preparation, F collect, H clean, M map, Escape pause. Normal and charged mouse shooting are unchanged. Gameplay keys are not handled in editable fields or during IME composition. Tab is no longer needlessly captured. Held keyboard inputs clear on focus loss.

Mobile press/release altitude and inner-aim/outer-fire ring routing are unchanged. The six-colour gum-to-mouth preparation, mixed colours, human models, physics, terrain, short-range AI and castle archive are unchanged. The separately delivered 1.0 draft is not used.

## Verification

A focused regression run passed **45/45 checks**. Native Chromium keyboard events covered X, X with every WASD direction, W+D+X, Space/X cancellation, release/braking, Shift, reload, camera, map, pause, preparation, Greek physical-key codes, focus loss and the new HUD binding. Synthetic Ctrl/Alt/Command key events verified gameplay isolation without intentionally closing/reloading the test tab or opening Chrome dialogs. Actual emulated multi-touch exercised retained movement/altitude independence and cancellation.

Environment: Chromium with SwiftShader under Linux/Xvfb. Production game logic is unchanged by the harness; only import and asset URLs are rebased to local blob URLs for offline rendering. These are not physical iPhone/Safari tests, and they do not certify every browser-reserved shortcut. See tests/keyboard-0.5.4.json for each result and the exact runtime source hashes.

Reproduce: `xvfb-run -a python3 Bubble/summit/tests/keyboard054.py` with Python Playwright and Chromium installed. `SUMMIT_ROOT`, `SUMMIT_REPORTS`, and `CHROMIUM` override defaults. tests/harness054.py supplies offline assets. Older versioned reports apply to those versions, not to this new mapping.

Official reference checked: Chrome keyboard shortcuts, https://support.google.com/chrome/answer/157179?hl=en (Ctrl+W closes a tab, Ctrl+S saves, Ctrl+D bookmarks). The fix avoids requiring those combinations for gameplay.
