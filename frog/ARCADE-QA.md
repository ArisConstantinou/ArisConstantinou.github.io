# FROG 4.0.0 — verification

Automated tests: **718 passed / 718 total**, 0 failed, 0 skipped. This includes 699 existing project checks and 19 new arcade-rule tests. Verified from workflow run 40289510326, job 121460987889 (Node test summary at 2026-10-26T08:03:02Z).

Production Vite build: succeeded.

## Real Chromium WebGL and input checks

- Opening menu has Play/Resume and Settings only
- Actual WebGL world and original skinned frog models initialize
- Keyboard tongue catches visible flies and fills ammo
- Live count and percentage reflect collected ammunition
- Mouse aiming and shooting consume fly ammunition
- Pause freezes simulation and suspends sound
- Contextual Q kick executes a nearby dizzy rival
- Reload resumes arcade progress using its separate save
- Win screen requires all rivals KO and offers replay
- Portrait mobile HUD fits without page scrolling
- Two simultaneous fingers move and aim; inner aim does not fire
- Entering outer ring fires without lifting the movement finger
- Touch release stops firing and moving
- Mobile kick button performs the same contextual KO
- Touch controls recover after pause and orientation change
- Landscape touch targets remain inside viewport
- No uncaught browser runtime errors

Screenshots and machine-readable results: `qa/arcade/`.

## Limitations

- Mobile controls tested in Chromium touch emulation, not on a physical iPhone or Android.
- Software-rendered browser test is not a measurement of hardware FPS.
- These checks cover the agreed small arcade prototype, not a campaign, multiplayer or long-term progression system.

## Build dependency note

The existing pinned development dependencies reported one high-severity npm audit finding during installation. This run did not perform a dependency upgrade or establish its exploitability. The delivered game is a static production build; do not treat the passing gameplay checks as a security audit.
