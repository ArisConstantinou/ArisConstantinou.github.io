# FROG 4.3.22

Space launches a large jump; a second press in the air boosts height and range. Shift with movement launches a forceful directional frog leap. Mobile has movable, saved Jump x2, Dash and contextual downward-volley buttons, with simultaneous movement and aiming.

Hindlegs and feet extend backward during takeoff and flight; forelimbs reach and hindlegs recover before contact. The existing skinned rig uses three-dimensional two-bone IK. Phase reference: Li et al., 2021, high-speed frog jumping observations, DOI 10.1002/ece3.7589.

Height-aware contacts allow clearing rocks and frogs, landing on sloped roofs and catapults, and entering an available own catapult. Press Q during flight to queue three flies from the mouth at the apex/descent: one vertical and two diagonal. The volley requires and consumes three flies. Ground Q retains its kick action.

The coordinated menu update uses authored six-frame face artwork, the purple mouth correction, blinks, tongue/flies and a paced 14-second loop. Original artwork and existing saves remain supported.

Validation includes the full source test suite, focused physics/IK/roof/ammo checks, native desktop keyboard and multi-touch Chromium interactions in portrait and landscape, gameplay video/frame review, the standard web-game client, comparable rendering measurements, and public updater/save/hash checks. Browser touch emulation and desktop GPU timing do not establish performance on a physical phone.
