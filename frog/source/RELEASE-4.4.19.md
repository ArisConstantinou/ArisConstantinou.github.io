# Βαλτομαχίες 4.4.19

When holding a wall in manual mode, a reachable destination could be outside the shoulder-camera view and the only guidance was a short mouse/stick hint. A visible Επιλογή σημείου button now opens a stable destination view. Point with the mouse or touch the scene, inspect the existing trajectory and landing marker, then press Εκτόξευση. Choosing a point cannot spend ammunition or launch accidentally. Πίσω restores the original view and retains the selected point. Saved camera mode, yaw and pitch remain unchanged. Existing stick aiming, automatic wall jumps and catapult controls remain supported.

The Heavy jump limits from4.4.17 and menu entrance from4.4.18 remain active. In-game anatomical struggle/pull-up is still incomplete and inactive; rejected isolated anatomy samples are excluded from this release. No original GLB, source Blender file, texture or other public asset is changed.

Validation:1539 source tests;9 native mouse/CDP-touch choose/cancel/reopen/launch/landing cases covering all3 classes at1280x800,430x932,932x430; existing manual/auto/catapult controls; matched desktop-GPU CPU/draw/memory checks. Mobile viewports are not physical-phone FPS certification.
