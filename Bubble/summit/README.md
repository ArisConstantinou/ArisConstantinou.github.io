# Bubble Skyward — Summit 0.5.2

Play: https://arisconstantinou.github.io/Bubble/?v=0.5.2

Hotfix over the actually published Summit 0.5.1. The separately supplied 1.0 ZIP is not used. Map, humans, materials, castle archive and other repository projects remain unchanged.

## What was corrected

Mobile ascent/descent previously toggled on touch release, rather than working while held. They now start immediately on press, return to neutral on release, and remain independent of each other and both joysticks. Holding both produces neutral. Cancellation, menus and recovery clear held state and indicators. CTRL + A no longer blocks lateral movement while descending on desktop. Existing text-selection/clipboard restrictions and inner-aim/outer-fire ring remain.

Vertical flight now has a bounded velocity controller: an intact unloaded envelope approaches +6 m/s on ascent and -4.5 m/s on descent, with acceleration/braking capped at 12 m/s². Releasing brakes toward neutral instead of leaving an ascent/descent toggle active. Normal commanded descents below 9 m terrain clearance are limited toward -2.2 m/s for landing. Substantial extra gum still produces sinking and can overwhelm ascent. There is no invulnerability or automatic rescue for an overloaded or destroyed balloon. This remains fictional flight physics, not real chewing-gum buoyancy.

Balanced / light / strong recipes now last 105 / 120 / 95 seconds, with a 5% consumption increase while ascending. At exhaustion a 12-second visibly warned deflation reserve progressively increases sinking before the envelope disappears. It does not suddenly pop at the endurance countdown reaching zero. Required landing seals still prevent skipping straight to the finish.

Balanced / light / strong integrity is 160 / 135 / 210. A normal membrane hit costs 8 integrity (formerly 20 against 100 on balanced); a charged membrane hit costs 24. With no other damage, a balanced balloon therefore takes 20 normal membrane hits to burst, rather than 5. Attached mass per normal / charged hit is 2.5 / 10 kg. Small damage/load no longer cancels the entire lift reserve. HUD reserve and the controller use the same effective-lift formula.

Collision damage is velocity-dependent and cooldown-limited, not stacked once per axis/substep plus continuous rubbing damage. Merely touching an obstacle at rest does not drain integrity. Solid collision is retained, including the envelope meeting an overhead obstacle. Existing geometry uses approximate game collision volumes, not pixel-exact per-leaf or per-pose collision.

## AI is close-range, not map-wide

Guard target acquisition and firing are both limited to 38 m in 3D, a maximum 24 m height difference, and a 60 m home territory with a limited leash. Rival racers engage within 50 m and a 30 m height difference. Initial detection has a facing cone, line-of-sight check and 1.15-second reaction delay. Loss of range or line of sight clears tracking immediately. NPC shooting intervals are slower, slightly staggered, and have small aim variation rather than perfectly accurate instantaneous salvos.

Already-launched projectiles also have total travelled-distance limits: guard 45 m, rival 58 m, player 90 m. A projectile fired near the cutoff may still travel slightly farther; moving beyond acquisition range is not a magical shield from an existing nearby shot. Shots do not travel hundreds of metres after the shooter loses the target. A 12-second opening combat delay and 85 m starting sanctuary prevent an immediate spawn attack by the racers; the sanctuary is shared by AI racers, not exclusive to the player.

## Feedback and controls

New pilot status separates input command (ascend / descend / neutral) from measured vertical speed. It explains overload, collision, low endurance, emergency reserve and membrane failure. Nearby enemy targeting displays a question-mark warning, the enemy name and current 3D distance. Received hits display who fired and their current distance.

Desktop: WASD / arrows move, Space ascends or jumps, Ctrl descends, Q/E lean/strafe, Shift sprints, C switches FPS/top view, left mouse fires, right mouse holds/releases a charged shot. R reloads, B mixes, F collects, H cleans gum on the ground, M maps, Escape pauses. In touch mode HOLD ↑ or ↓; do not tap and wait for a toggle. Release returns to neutral. Other controls are unchanged.

Flight readouts retain horizontal speed in km/h, ascent/descent in m/s, clearance over terrain and horizontal distance to the centre of the next required landing. New races remain in memory; refreshing restarts the race and does not clear the old castle character save.

## Assets and verification

The existing self-hosted skinned human GLBs, fir meshes, photographic textures and Three.js runtime are unchanged. Licences remain in assets/HUMAN-ASSET-LICENSE.txt, assets/SURFACE-LICENSE.txt and vendor/LICENSE.txt. This hotfix does not claim new AAA graphics or motion-capture animation.

Actual local regression run: 32/32 numerical/control/combat-rule checks and 43/43 browser integration checks (75 total). Browser tests exercised real production modules and renderer with only import/resource URLs rebased to local blobs. They cover immediate multi-touch ascent/descent, release/cancel, independent motion/fire ring, CTRL+A, overload and HUD feedback, real NPC range/reaction, finite projectiles, all four landing legs, FPS and desktop/touch UI. Viewports: 1440x900, 430x744, 430x932, 932x430, 375x667. Continuous mobile rendering was also checked after viewport changes.

Environment: Chromium / SwiftShader under Xvfb, touch emulation. Not tested on physical iPhone/Safari; these results do not establish real-device frame rate or eliminate the need for playtesting. The older tests/verified-0.5.1.json describes the previous version, not the retuned values. Current source hashes and verification summary are in tests/hotfix-0.5.2.json.
