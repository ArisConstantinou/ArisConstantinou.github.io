# FROG 4.3.16

- Three game-style frogs grip the actual menu-button edges, following the final user-approved reference: green and coral on the round buttons, purple catching a fly from Settings. Transparent artwork leaves the buttons interactive.
- Independent persistent frog colours for the player and both rivals, with matching actor indicators.
- Layered wet shooting and impact cues, quiet nearby rival shots, and immediate volume changes.
- Illustrated Q kick and C camera controls beside WASD; camera artwork on the view switch.
- A short kick-input buffer prevents a quick press disappearing between simulation steps or during a brief hit reaction. Automatic target selection skips a protected rival when another valid target is nearby.
- The contextual kick keeps a stable side of its target and displays a readable dizziness countdown. Touch kick stays in its fixed location while unavailable.

Range, height dodges, cover, cooldowns, saves, map geometry and the automatic update infrastructure are retained.

Verification: 1,256 source tests; production build; desktop, portrait and landscape browser checks; saved colours, keyboard/touch controls and synthetic PCM sound checks. Headless render-completion timings are engineering evidence, not a physical-phone FPS result.

The transparent overlays are `public/art/menu-frogs-top.png` and `public/art/menu-frog-settings.png`. Artwork provenance and extraction prompts are recorded in `qa/menu-artwork.json`. The final supplied image supersedes the earlier numeric concept selection.
