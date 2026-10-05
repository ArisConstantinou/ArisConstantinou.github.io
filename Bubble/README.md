# Bubble — The Sticky Siege

Playable original 3D bubblegum capture game for Aris Constantinou. Greek interface, desktop and touch controls. Release 0.1, 5 October 2026.

## Play

Published in the `Bubble/` folder of `ArisConstantinou/ArisConstantinou.github.io`, at https://arisconstantinou.github.io/Bubble/ . This is not a separate repository named Bubble.

Desktop: WASD / arrows to move, mouse to aim, left mouse button to fire, C to switch top-down / first person, Space to jump, Shift to sprint, R to refill, Esc to pause. In first person, click the canvas to capture the pointer.

Mobile: left joystick moves; right joystick aims and fires. Separate jump, fire, refill and camera buttons. Double-tap the left joystick to jump. Drag the right side of the scene for free look in first person. Landscape provides the most room; portrait is supported. Choose light graphics in the opening menu on slower devices.

## Capture rules

Ten armoured knights have independent health, stamina and gum colours. Player gum is purple. Depleting stamina causes dizziness. Health reaching zero keeps the enemy dizzy until captured rather than removing the model.

A dizzy knight near a wall can be pinned by shooting toward that wall. Five anchor hits complete a permanent wall capture. In open space there are eight independent directional coating sectors; circle the knight and cover every sector. Repeated hits from the front cannot finish the back. The opaque gum cocoon stays in the world.

The tank holds 180 shots. Refilling takes 1.7 seconds and draws from unlimited reserve. Capturing a knight adds 80 gum, 12 armour and 20 stamina, capped at their maxima. The first-person weapon has a visible liquid reservoir, moving fill level and an actual three-digit ammo display on the mesh.

After ten captures ARACHNE-09 spawns in the main courtyard: an eight-legged robotic spider with green toxic gum, dripping tanks, spread shots, damaging floor puddles, a second phase and a dizzy vulnerability window. Defeating it reaches the victory screen.

## World and implementation

An original procedural stylised castle with thousands of individually varied bevelled stones, asymmetrical towers, gatehouse, three enterable houses, a keep, upper battlements and an underground dungeon. Stairs connect the levels without teleporting. Collision boxes and floor/ramp surfaces drive movement, navigation and swept projectile tests. Top-down cutaways reveal interiors and the underground level.

Native WebGL2 instancing, original shaders, soft shadow mapping and procedural materials. No external JavaScript libraries, models, textures, fonts, APIs, CDNs or audio downloads. Sounds are synthesised with Web Audio. The project is small because geometry and sound are generated in code, not because a separate asset download is missing.

`src/engine.js`: rendering, math and geometry. `world.js`: castle, collision and navigation. `actors.js`: armour, weapons, gum and spider. `combat.js`: independently tested capture rules. `game.js`: game loop, AI, input, sound and HUD. `index.html` and `style.css`: Greek responsive interface.

## Run and test

Serve this folder with `python3 -m http.server 8080` and open http://localhost:8080 . Run `npm test` or `node tests/logic.mjs` for the 17 deterministic checks. `python3 tests/bundle.py` creates the fully standalone `Bubble.html` with the same source embedded, for local use without module-file requests.

Browser test scripts use Python Playwright and Chromium. The supplied reports record 18 desktop integration checks and 9 touch/UI checks. The double-tap timing handler is tested with rapid synthetic pointer events; joystick movement, jump, firing and camera use touch emulation. Screenshots in the downloadable project were rendered by the real game, not concept images.

## Scope and limits

This is a playable first release with procedural stylised graphics, not photorealistic Unreal assets or a full fluid simulation. Gum is animated geometry. Surface splats persist but are bounded for mobile memory: newest 220 on desktop / 140 on touch; character impact blobs are capped at 22, separately from permanent coating sectors and wall anchors. Puddles expire after nine seconds. Only three nearby knights attack simultaneously for balance.

Testing used desktop Chromium with software WebGL2 and emulated touch viewports, not a physical iPhone. Hardware performance, Safari-specific behaviour and long-session balance still need real-device playtesting. Requires a browser with WebGL2. No multiplayer, account system, save-game or service-worker cache is included. Debug hooks exist only when opened with `?test=1`.
