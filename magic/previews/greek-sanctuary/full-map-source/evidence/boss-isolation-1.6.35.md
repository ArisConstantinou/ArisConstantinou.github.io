# Mobile boss isolation — 1.6.35

The physical iPhone 1.6.34 report still measures 20.06496348683453 combat FPS (idle 50.44985, settle 31.33159), with 19 kills including four bosses and three summons, and no runtime errors. Texture allocation fell by approximately 115 MiB, but sustained FPS did not recover. GPU timing is unavailable on that browser. This rules out claiming the texture correction resolved the slowdown; it does not identify a single boss or subsystem as the cause.

## Implemented diagnostic changes

Default: six original regular enemies, bosses OFF. The legacy six positions, archetypes and nearest-navigation-node spawn method are restored. Current model assets and texture correction remain, so this is a controlled composition baseline, not a byte-identical rollback to 1.6.32.

Nine explicit presets are available under “ΔΟΚΙΜΕΣ OFF / ΠΡΟΟΔΟΣ”: six regular enemies; twelve regular enemies; twelve plus Warden, Colossus, Gargoyle or Wraith individually; twelve plus all bosses; all sixteen with boss model rendering OFF; all sixteen with boss AI OFF. Single-boss comparisons preserve the same twelve regular enemy slots. Switching or restarting reloads the document and creates a fresh renderer/context instead of retaining the previous scene's GPU resources. No model files are deleted.

Rendering OFF hides only boss mesh roots immediately before rendering, after animation updates. Physics, AI, damage, animation updates, health bars and attack effects remain. Initial frozen shadows remain the same diagnostic option. AI OFF holds Warden and all three special bosses before their update dispatch; regular enemy AI, boss models/idle animations, physics, damage and automatic HEARTH combat remain. Held bosses cannot start attacks or summoning. Boss AI resumes normally in every other preset.

JSON contains the preset ID/name, actual composition, bossRendering, bossAI, bossSummoning, bossAnimations and roster. Export still uses magic-benchmark.json. Historical reports retain their own version/configuration and are not represented as measurements of a newly selected preset. The phone's download manager can still choose a numbered duplicate; the game cannot overwrite arbitrary phone files without the browser's permission/UI.

## Validation and limits

476 unit checks, canonical production build and two installed game-client iterations passed. All nine runtime cases, explicit rendering/AI guards, baseline and all-boss battle completion, fresh-document selection and fixed-name JSON export passed before publication. Desktop Chrome uses the mobile asset profile; its FPS is not physical iPhone evidence. Local checks support the GitHub mobile release; they do not require the user to access localhost.

The next physical report should first establish the six-enemy baseline. Then twelve without bosses separates crowd size from boss workload; each boss is compared against that same twelve. Rendering OFF and AI OFF are compared against the full all-boss preset, with consistent device/settings and cooldown between runs. Until those measurements arrive, the cause and sustained 60 FPS remain unverified.
