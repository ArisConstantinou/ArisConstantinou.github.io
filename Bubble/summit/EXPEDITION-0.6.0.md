# Bubble Skyward — Expedition 0.6.0

Play: https://arisconstantinou.github.io/Bubble/?v=0.6.0

This update addresses Aris's reports that landing stops the playable loop, the interface does not explain what to do, and shooting gives little or no understandable impact. It updates the actual published Summit 0.5.4; it does not substitute the separately supplied 1.0 draft. The previous castle, its local character save, assets/licences and every non-Bubble project remain intact.

## Land, resupply, make another bubble

Land inside the next site's large illuminated circle. The required stop is registered automatically once the living character is grounded near the site's height and inside its capture radius; no unexplained seal button is required. The current goal then changes to supplies, not the following mountain.

Each landing site now has a central golden-trimmed supply crate and a physical sign. The golden marker shows the next supply point and its distance. Approach within 6 m and press F, or the existing mobile loot control. The crate supplies one complete recipe: 3 resin, 2 fibre and 1 lift gas, plus ammunition and healing. A visible counter reports ready gum sets. Individual material types are still used internally, without forcing the player to infer the recipe from three disconnected quantities. Crates have separate collection state for each racer, so an AI cannot remove the player's essential set. Repeat collection does not duplicate a set. Enemy drops now also contain a complete set.

After collection, the current task says to open the gum with B / TΣIXΛEΣ. This still opens the direct-manipulation scene: choose a coloured piece, hold it in the character's hand, drag it to the lips, then pull the small bubble outwards to grow it. It does not replace that interaction with a recipe wizard. No set available: the message points to the supply cache. A roof overhead: the instruction identifies insufficient clearance and points toward open ground.

The four-leg route still requires the three intermediate landings. The first AI reaching the final plateau no longer abruptly aborts the player's unfinished journey: its arrival is recorded, while the player can continue and finish with a rank.

## What a hit now means

The previous top-view aim assistance could select targets at 150–170 m although the player's projectile stopped at 90 m. The new assistance uses the projectile's 90 m reach and physical visibility. Direct pointer rays select the visible silhouette; nearby assistance can lead a moving opponent. FPS still uses its actual aim ray. Neither mode grants damage through terrain, structures or another first-contact object.

The balloon hit centre now follows the same yaw, banking and mouth-offset transform as the rendered envelope. The clothed body uses overlapping hit volumes, rather than three separated tiny targets. A ray starting inside a hit volume reports immediate contact. A check between the body and muzzle prevents a muzzle already beyond a close wall from firing through it. The body volumes remain approximate, not per-triangle anatomical collision.

Every confirmed projectile contact adds coloured attached gum and a short reaction. A membrane hit visibly deforms the envelope; a body hit staggers a grounded opponent. The aim marker flashes only on an actual hit. The interface reports added mass and lost membrane integrity or health. A target panel displays its health, membrane percentage, attached gum and downward speed when falling. These numbers come from the same target state used by the simulation, not invented effects.

Normal / charged hits add 2.5 / 10 kg and cost 8 / 24 membrane integrity on an envelope. The charged shot costs 16 ammunition units. The update increases the weight's sinking contribution and adds a short downward impulse (0.85 / 2.8 m/s) while retaining the stronger balloon recipes introduced in 0.5.2. A few ordinary shots do not automatically destroy every balloon. Visible trails and short splatter particles make hit versus miss easier to distinguish. Coloured patches attach to the actual struck surface. Walls still stop shots, and enemy fire remains local under the retained 38 m garrison / 50 m racer engagement rules.

## Goals and challenges

A single current-task card explains the immediate action: fly, land, collect a full set, or make the next bubble. The route strip tracks completed stops. On the ground, irrelevant envelope readouts are hidden; when a supply cache is the immediate goal, the distance readout explicitly says supplies. Flight speed, ascent, descent and landing distance remain visible during flight.

K / the question-mark guide opens an in-game explanation of the whole route, gum preparation, landing, resupply, shooting and every binding. The single-player simulation pauses while it is open. Desktop keeps keyboard and mouse indicators where space permits; touch keeps independent movement and inner-aim/outer-fire controls near the thumbs.

Eight optional green wind rings add small flying challenges. A real crossing through a ring gives up to 8 seconds of membrane life and 8 ammunition, once per ring; full supplies remain capped. Skipping them is permitted. The user can engage or avoid local guards, collect extra caches and drops, and continue the race after rival finishes. This is an initial set of route decisions, not a complete authored campaign or a claim that boredom has been objectively solved.

## Visual and performance work — not an AAA claim

Existing ground and rock normal maps are now used with the appropriate non-colour texture interpretation. Surface colour variation, exposure and lighting were adjusted, the on-foot camera is closer, and landing supplies are marked in the 3D scene. Forest instances are partitioned into spatial chunks with bounds and a device-dependent view distance instead of a single map-wide batch. Tree collision remains independent of visibility. These are improvements to the existing assets, not replacement photorealistic mountains or new motion-capture humans.

Human models, hands, facial motion and architecture still have prototype limitations. Collision is game-oriented and approximate; chewing gum is not a fully simulated soft body. The scene has not been performance-certified on a physical iPhone or Safari. No accounts, analytics, advertising or multiplayer were introduced. A live run is still in memory only; refreshing begins a new run, without clearing the archived castle's character save.

## Controls

WASD / arrows move. Space ascends or jumps, X descends, release brakes toward neutral. Shift runs on the ground; Q/E lean/strafe. Left mouse holds normal shooting; right mouse holds/releases a charged shot. R reloads, B opens physical gum preparation, F collects, H cleans on the ground, C switches FPS/top view, M maps, Escape pauses, K opens the guide. Ctrl/Command/Alt remain browser controls, not flight modifiers.

Mobile: move with the left thumb, aim inside the right disc and shoot in its outer ring. Hold the separate ascent/descent controls; release returns to neutral. Use the existing TΣIXΛEΣ and loot controls for the contextual ground steps. The central mobile task banner is guidance, not another required third-finger button.

## Verification and reproduction

`tests/qa060.py` and `tests/harness060.py` exercise the real production renderer and simulation. The offline harness changes only asset/import locations to local blob URLs. Use Python Playwright, Chromium and Xvfb: `xvfb-run -a python3 Bubble/summit/tests/qa060.py`. Optional environment variables: SUMMIT_ROOT (the Bubble folder), SUMMIT_REPORTS and CHROMIUM.

The regression suite covers the four flight legs in one continuous run, all three resupplies, four gum-to-mouth/inflation launches, ordered landing capture, duplicate protection, actual banked envelope hit geometry, normal and charged impacts, attached patches and state readouts, range limits, a muzzle-adjacent wall, X descent and modifier isolation, guide pause/resume, earned ring crossings and touch layouts. Flight steering is scripted using the normal body/world simulation; preparation gestures and supply actions use native mouse/key events. Controlled combat scenes are used for precise assertions and screenshots. These tests do not substitute for a player's judgement of fun or visual quality.

Final outcomes and environment are recorded in `tests/verified-0.6.0.json`, with source hashes in `tests/source-0.6.0.json`. Older versioned reports apply to those older versions. Browser execution uses Chromium/SwiftShader under Linux/Xvfb with emulated touch, not a physical phone or Safari. A separate continuous mobile-render run retained its WebGL context across viewport changes. Asset licences remain in assets/HUMAN-ASSET-LICENSE.txt, assets/SURFACE-LICENSE.txt and vendor/LICENSE.txt.
