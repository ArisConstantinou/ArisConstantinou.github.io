# FROG 4.1.0 — cartoon arcade readability

A solo frog catches flies with its tongue, inflates, spits them as ammunition, makes other frogs dizzy, and finishes them with a kick. No building, army management or new weapons were added.

## This release

- Default perspective 3D camera is low and offset to the side so the mouth, tongue and spit animation are visible. Aiming never rotates the camera automatically.
- C / camera button switches to an optional overhead view. Larger winged flies and screen markers are readable in both views.
- Movement and the mobile aiming stick are camera-relative. The outer aiming ring fires; the inner area only aims.
- Persistent radar shows the player, both colour-coded rivals, flies and solid obstacles.
- Brighter palette, simplified skin surface, exaggerated eyes, throat inflation and spit jaw animation. This is a first stylisation pass on the existing models, not a claim to match concept art exactly.
- New rounds wait indefinitely while the player learns to catch five flies. The first deliberate spit after that begins a five-second countdown. Rivals do not move or fire before battle, and practice projectiles cannot damage opponents.
- Rivals spawn away from the player and choose their nearest living opponent, including each other. They use collected fly ammunition and the same dizzy/kick rules.
- Existing arcade saves and knockouts are retained. Older saves receive a safe onboarding re-entry. The older strategy save is untouched.

## Controls

Desktop: WASD/arrows move, mouse aims, left click spits, E/right click catches flies, Q finishes a nearby dizzy rival, C switches camera, Escape pauses.

Mobile: left stick moves, right stick aims, its outer ring fires, tongue button catches flies, contextual kick button finishes a nearby dizzy rival. Portrait and landscape layouts include an always-visible minimap.

## Verification

The release workflow runs the full Node test suite, a production Vite build, and desktop/touch Chromium smoke tests. Results are recorded in `ARCADE-QA.md` and `qa/arcade-410/report.json` after a successful build. Browser emulation is not a physical-device or FPS certification.
