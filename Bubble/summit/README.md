# Bubble Skyward — Summit 0.5.1

Play: https://arisconstantinou.github.io/Bubble/?v=0.5.1

A new playable mountain-flight prototype for Aris, replacing the castle entry point without deleting the old game. This is **not a finished AAA release**. The previous castle remains at `../castle.html`, with its source and local character save untouched. Changes are confined to `Bubble/`; Village and Plan Editor are independent.

## Flight instruments

The main HUD shows **horizontal ground speed in km/h**, **ascent in m/s**, **descent in m/s**, and **horizontal distance to the centre of the NEXT required landing plateau**, switching from metres to kilometres above 1,000 m. This is not distance along a computed route or straight-line 3D distance. The active ascent/descent panel highlights; the opposite direction reads zero. Grounded height corrections do not register as climbing.

Readings use collision-limited body displacement divided by simulation time, not the keyboard command or a decorative animation. Additional displays show clearance over the terrain immediately below, signed height difference to the landing site, added gum mass, remaining balloon life, membrane integrity, nominal lift margin, ammunition and reload time. The target marker and map advance when an intermediate seal is collected.

## A complete first route

Mix a recipe in the preparation interface, chew, inflate and launch. The three preparation actions consume 3 resin / 2 fibre / 1 lift-gas unit once; cancelling returns reserved ingredients. The preparation interface is simplified, not a hand-simulated cooking system or a facial animation sequence.

Fly to Pine Ridge, Stone Gates and Frozen Saddle, collect each seal on foot, obtain materials from chests or defeated opponents, and craft another balloon. Finish by landing on the final plateau after all three seals. The balloon has finite endurance (56–66 seconds depending on recipe, with ascent consuming it faster); checkpoint order also prevents winning by flying directly to the last site. The first route contains four flight legs through a bounded 2,800 by 3,150 metre procedural terrain.

There is one player, six competing AI racers and nine locally stationed guards (groups of two, three and four). Racers can fight one another and the guards. Guards engage visible racers only inside their local territory/range, not the entire map. This is single-player with AI, **not network multiplayer**.

Normal gum hits add 7 kg; a charged hit adds 23 kg. Weight changes the flight acceleration and horizontal speed, while membrane hits also reduce integrity. Additional gum makes the same balloon descend faster; it is not just a status bar. An expired or burst balloon stops providing lift and the character falls. The physical constants, compressed supply and lift gas are fictional game rules, not real-world chewing-gum physics.

Heavy impacts can defeat a racer, which returns to its last checkpoint; player recovery adds a 25-second penalty. Defeated guards remain down. Chests can be looted once per character. This prototype provides recovery materials so an unlucky fall does not permanently strand the run.

## Controls

Desktop: WASD / arrows move; Space ascends while airborne and jumps on foot; Ctrl descends; Q/E lean/strafe; Shift sprints on foot. C switches FPS/top view. Left mouse holds normal shooting; right mouse holds then releases a charged shot. R reloads, B opens preparation, F collects nearby loot/seals, H removes attached gum on the ground, M opens the route map, Escape pauses. The mouse wheel adjusts the top-view camera distance. Desktop input indicators do not capture clicks or generate actions.

Mobile: left joystick moves only. The right inner disc aims without firing, and its outer ring fires without releasing the thumb. Each finger has independent ownership. Tap the ascent/descent button to maintain that command; tap the same button again to return to neutral. The separate charge, preparation, collect and clean controls are near the joysticks. The desktop input panels are hidden in touch mode. Text selection/context and clipboard actions inside the game document are suppressed; browser chrome is not controlled by the game.

## Geometry, people and limitations

People are textured, skinned GLB human models with 53-bone skeletons, clothing, hair and eyes. They are not assembled primitive boxes or spheres. Current motion is procedural skeletal posing rather than a library of polished motion-capture clips. A mouth-level gum connection supports the balloon visual. Gumcaster geometry and material reservoir are modelled in code.

The terrain uses a triangle mesh, with collision heights interpolated from the same triangle layout. Outpost structures, rocks and tree trunks have collision bounds. Body movement uses short substeps, collision checks and body separation; projectiles test the first world/character contact. Balloon-envelope obstruction is approximated. These are game-oriented collision bounds, not a guarantee of pixel-exact collisions for every leaf, hair strand or pose. Complex navigation, animation, materials and performance need further iteration. There is no full soft-body chewing-gum simulation or physically simulated architectural destruction.

The new run is in memory only. Refreshing starts a new race. It does not clear or migrate the old castle character save. No analytics, accounts, ads, service worker, remote runtime CDN or network telemetry is added.

## Assets and licences

Assets are self-hosted copies of already present repository assets. `assets/HUMAN-ASSET-LICENSE.txt` documents the MakeHuman CC0 human outputs; `assets/SURFACE-LICENSE.txt` documents the photographic surface sources. Ground/rock/wood textures and the modified fir-tree model originate from Poly Haven CC0 assets (`forest_ground_04`, `fir_tree_01` and the surfaces identified in the licence/source files). Three.js and its loaders/utilities retain the MIT licence in `vendor/LICENSE.txt`. The character assets are generic fictional people, not portraits of Aris or real identifiable subjects.

## Verification and reproduction

Serve the repository root with `python3 -m http.server 8080`, then open `/Bubble/`. No build step or npm runtime dependency is needed. WebGL2 and ES modules/import maps are required.

`tests/qa.py` and `tests/harness.py` are the offline integration harness. Install Python Playwright and Chromium, then run `xvfb-run -a python3 Bubble/summit/tests/qa.py` on Linux. `SUMMIT_ROOT`, `SUMMIT_REPORTS` and `CHROMIUM` can override paths. The harness loads the production logic and real renderer with only resource/import URLs rebased to local blob URLs. It does not mock the simulation. The debug interface is enabled only by `?test=1` or the explicit test flag.

Final source passed **42/42 integration checks**: numerical flight readings, weight-dependent descent, finite endurance, projectile/structure collision, mix/chew/inflate, ordered checkpoints, materials, valid finish, each of the four flight legs, FPS, map, pause and two-thumb controls. Layouts checked include 430×744, 430×932, 932×430 and 375×667. Full results and exact source hashes are in `tests/verified-0.5.1.json`. A separate continuous-render check produced the mobile flight screenshot without a lost WebGL context.

Tests used **Chromium 144 / SwiftShader under Xvfb**, including synthetic touch. They do **not** establish physical iPhone/Safari compatibility, frame rate or final game balance. Screenshots are captured from the actual renderer in controlled test scenes, not generated concept art.
