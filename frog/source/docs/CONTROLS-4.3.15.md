# FROG 4.3.15 — movement and camera correction

- Top-down: W is screen-up, S screen-down, A screen-left and D screen-right. The input basis is fixed and cannot inherit an old chase yaw, body aim, camera-follow lag or camera shake.
- Third-person: mouse-look turns the camera and the frog's aiming stance together without requiring a shot. WASD remains view-relative, with lateral strafing and backward hopping; it never turns the camera automatically.
- Captured and uncaptured desktop mouse-look both aim through one centred crosshair. Top-down keeps the freely positioned pointer crosshair. Mounted catapult controls are unchanged.
- Hopping uses the actual travel vector converted into the rendered frog's local basis. Side hops plant the feet laterally with a two-bone 3D solve; backward hops reverse the propulsion and lean. Legacy forward hopping, combat poses, saves, ammo, difficulty and optional RMB locking are preserved.

Regression coverage includes native keyboard and mouse input in Chromium, all four overview aiming directions, chase rotation, denied Pointer Lock, C view changes, pause/resume/new round, the actual animated skeleton, and the existing gameplay regression suite. The browser report and representative images are published under `frog/qa/arcade-4315/` after the checks pass.

Reproduce from `frog/source` with Node 24:

```sh
npm ci
npm test
npm run build
npm install --no-save --package-lock=false playwright@1.56.1
npx playwright install chromium
python3 -m http.server 4178 --bind 127.0.0.1 --directory dist
# In another shell:
node qa/arcade-4315.mjs
```

Browser fixtures only position/freeze opponents and advance deterministic frames. They use production input listeners, simulation, camera, rig and rendering. Chromium software WebGL is not a claim of real-phone testing.
