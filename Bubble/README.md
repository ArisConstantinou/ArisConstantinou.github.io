# Bubble — The Sticky Siege 0.3.0

A playable 3D bubblegum castle siege for Aris Constantinou. Greek interface, desktop and touch controls. Updated 5 October 2026.

## Play / repository

Published at https://arisconstantinou.github.io/Bubble/ . Source belongs only in `Bubble/` on `main` in `ArisConstantinou/ArisConstantinou.github.io`. There is no separate Bubble repository. Version 0.3.0 is visible on the opening screen and in the Armory. Versioned URLs prevent the old game module from being reused with the new UI.

## Controls

Desktop: WASD / arrows move, mouse aims, left mouse fires, C switches top-down / first person, Space jumps, Shift sprints, R refills, Esc pauses. Click the FPS canvas to capture the mouse.

Mobile: left joystick moves; right joystick aims and fires. JUMP, FIRE, reload and camera have separate buttons. Double-tap the left joystick to jump. Drag the right side of the FPS scene to look. Portrait and landscape have a persistent ability bar and visible LV, XP, Gold, Dust, skill points, HP, stamina and ammunition.

**Elastic gum:** MODE / T changes SLING and LINK. E or the SLING/LINK button places an anchor. Q / PULL tethers an aimed knight to the player. F / SLAM throws linked knights into a nearby wall or slams them onto the ground. X / CUT releases temporary strands. I / BAG opens equipment and skills; FORGE opens the crafting panel without consuming anything.

SLING needs two different surface points, at least 1.2 m apart and within the current stretch range. On mobile, aim manually with the right stick before each anchor; AUTO does not redirect surface anchors. With no wall in that direction, a ground point ahead is used. A nearby completed strand launches the player with velocity from their current position: no teleport to its midpoint. The strand remains as a bounce line. LINK attaches a knight to a surface or a second knight. A golden marker shows the pending first anchor. Invalid second points preserve the first; it expires after 18 simulation seconds. At most six active temporary strands are retained. Static bounce lines last 60 seconds, enemy links 24, and PULL 14. SLAM has a three-second cooldown. Temporary strands end when their knight is captured or enters the wall-pinning capture state.

For a wall jump, jump normally, approach a wall while airborne, then press jump again. Repeated jumps on the same wall require landing first. Horizontal impulses use collision substeps; head clearance stops upward travel through supported ceilings. Top-down cutaway height is tied to the grounded level, not the jump apex.

AUTO chooses a visible nearby target with limited hysteresis rather than permanently holding the previous opponent. A closer enemy behind can take priority in top-down. The right joystick overrides AUTO. FPS assistance uses a forward cone and does not spin the camera behind the player.

## Capture / boss

Ten armoured knights have health, stamina and different gum colours. Player gum is purple. Low stamina causes dizziness. Zero health does not delete a knight: finish the capture. Near a wall, five anchor hits complete permanent pinning. In open space, circle the knight and coat all eight directional sectors. Repeated frontal hits cannot finish the back.

The tank holds 180 shots, refills in 1.7 seconds from unlimited reserve, and is visible on the FPS weapon with a changing liquid level and three-digit display. Captures restore up to 80 gum, 12 HP and 20 stamina. Every second capture drops a random full-ammo, 12-second speed, or 12-second regeneration power-up.

After ten captures ARACHNE-09 enters the courtyard: eight articulated mechanical legs, green toxic gum, spread shots, damaging floor puddles, a second phase and a dizzy damage window. It drops three Legendary items on defeat. The victory flow collects outstanding loot subject to inventory capacity, unlocks the next siege and preserves the character. Higher siege tiers increase enemy health, damage and reward scaling in the existing castle. They are not newly authored maps.

## Character / Forge

Capture XP grants levels and one skill point per level. Spend points on Gum Power (+8% per point), Elastic (+8% range/force before the stretch cap), or Vitality (+10 maximum HP). Equipment slots are Gumcaster, Armor and Charm; rarities are Common, Magic, Rare, Epic and Legendary. Tap a card to equip. Nearby loot is attracted to the player when unobstructed. Inventory capacity is 120 items.

Forge unlocks at level 2 or after completing a siege. Select the item to improve and the exact sacrifice. The preview shows the power increase, lost item, and cost: two Dust plus Gold, increasing with previous upgrades. Equipped or locked gear cannot be sacrificed. Auto Forge is explicitly opt-in; once on a level-up event or siege completion it may improve the equipped Gumcaster using weaker, unequipped, unlocked Common/Magic/Rare gear. It never automatically sacrifices Epic or Legendary gear. All weapons remain Bubble Gumcasters; other weapon categories are not included.

Local storage saves character level, XP, skills, gear, materials, Auto Forge preference and unlocked siege tiers. It does **not** save a live match's position, enemy captures or temporary strands. Reloading starts a fresh siege with the saved character. Saves are local to the browser/origin, not an account or cloud backup. Clearing site data removes them. Invalid save data and unavailable storage are handled without crashing; the Armory shows storage status.

## Implementation

Native WebGL2 instancing and original procedural models, shaders and materials. No external runtime JavaScript, models, textures, fonts or audio downloads. Sounds use Web Audio. The existing castle, enterable houses, battlements, stairs, underground vault, armoured actors and spider are preserved.

`src/engine.js`: renderer and math. `world.js`: geometry, colliders, floor/ceiling support and navigation. `actors.js`: models and weapon display. `combat.js`: directional capture rules. `gum.js`: damped elastic constraints, inertia, wall jump, bounce and collision-triggered slam. `progression.js`: validated character data, skills and safe crafting. `game.js`: integration, AI, aiming, input and HUD. `systems.css`: responsive ability and Armory layout layered over the original styling.

Gum uses spring constraints and procedural strand geometry, not fluid simulation. Static colliders approximate the rendered architecture. The graphics remain procedural/stylised, not Unreal photorealism. Surface splats are bounded at 220 desktop / 140 touch, actor impact blobs at 22; permanent coating sectors remain separate. Toxic puddles expire after nine seconds. No multiplayer or service-worker cache is included.

## Run / verify

Serve this directory with `python3 -m http.server 8080`, then open http://localhost:8080 . `npm test` runs 17 original logic checks and 28 new systems checks. `python3 tests/bundle.py` creates `Bubble.html`, the standalone HTML containing the same modules and styles. Serve the modular project for the normal deployment.

For browser tests, install Python Playwright and a Chromium executable, then run `xvfb-run -a python3 tests/browser.py`. `CHROMIUM` can override `/usr/bin/chromium`; `BUBBLE_TEST_OUTPUT` can select the output directory. The harness loads the exact offline source bundle, controls requestAnimationFrame deterministically, and steps the production update loop. It uses the real WebGL renderer, not a canvas mock. Screenshots are actual game output.

Version 0.3.0 verification: **45 deterministic checks and 51 browser integration checks passed**. The browser run covered 1280×800 desktop and 430×932, 932×430, 375×667 touch viewports. Reports include exact checks and environment. `mobile-results.json` is a subset of `browser-results.json`, not additional checks. Tests used Chromium/SwiftShader and emulated touch, **not a physical iPhone or Safari**. Hardware frame rate, Safari-specific behaviour and long-session balance still need real-device playtesting. Debug controls exist only with `?test=1` or the explicit test bundle.
