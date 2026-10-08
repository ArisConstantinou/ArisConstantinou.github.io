# Bubble Skyward — Summit 0.5.4

Play: https://arisconstantinou.github.io/Bubble/?v=0.5.4

## Keyboard hotfix 0.5.4

Desktop descent is now **X**; ascent/jump remains **Space**. Hold X together with WASD to descend and steer without holding Ctrl. Release X to return to neutral vertical input. Ctrl, Command and Alt shortcuts are not interpreted as game actions; they also cancel held desktop input to prevent stuck movement or an unintended shot. Browser/OS shortcuts themselves remain under browser/OS control. Touch altitude and ring aiming are unchanged. See [current controls and verification](KEYBOARD-0.5.4.md).

## Pick the gum, not a recipe button (retained from 0.5.3)

This release replaces the old three-button preparation wizard with a close-up 3D scene using the player's existing skinned human character and a portable table of six gum pieces. The hand, gum and mouth are visible together. Preparation uses a front-facing close-up, not first-person hands; the flying/ground game still has FPS and top view.

Click/touch a gum to take it in the hand. Hold and drag that piece to the character's lips and release. Moving it around first lets you inspect it or put it back on the table. The arm is posed with two-bone inverse kinematics, and the existing thumb/index finger bones follow a grasp target; the candy stays with the hand, not as a floating screen icon.

After insertion there is a short automatic chewing animation, using a local lower-face morph and a small head motion. This is not a separate command button, manual control of individual chewing cycles, or a recording of the real player's mouth. No microphone or camera is requested.

When the small bubble appears at the lips, touch/click it and drag outwards to grow it. A timer alone does not inflate or launch. Releasing a partial bubble leaves it partially inflated; grab again to continue. Releasing a fully grown bubble launches into the existing mountain game.

B / the mobile TΣIXΛEΣ control opens this scene again on the ground. Escape / the close control cancels it. Start, navigation and close controls still exist, but there are no mix, insert, chew or inflate action buttons inside preparation. The entire single-player race pauses during preparation, and the screen says so.

## Six flavours, with visible colour

| Gum | Colour | Existing flight profile |
|---|---|---|
| ΜΟΥΡΟ / berry | Purple | Strong: 95 s, 210 integrity |
| ΜΕΝΤΑ / mint | Green | Light: 120 s, 135 integrity |
| ΦΡΑΟΥΛΑ / strawberry | Pink | Balanced: 105 s, 160 integrity |
| ΠΟΡΤΟΚΑΛΙ / orange | Orange | Strong: 95 s, 210 integrity |
| ΠΑΓΟΜΕΝΗ ΜΕΝΤΑ / ice mint | Cyan | Balanced: 105 s, 160 integrity |
| ΛΕΜΟΝΙ / lemon | Yellow | Light: 120 s, 135 integrity |

Drag one piece onto another on the table to combine up to three. The pieces merge into one larger piece, with a blended colour and averaged profile properties, not cumulative unlimited bonuses. Then pick up the mixture and place it in the mouth in the same way.

The selected or mixed colour is carried into the airborne balloon, the character's gun reservoir, the FPS reservoir, the player's fired gum and its world-impact marks. It is not just the colour of a menu selection. Existing generic attached-weight patches on enemies retain their earlier visual system.

One flight recipe (3 resin, 2 fibre, 1 lift gas) is reserved on mouth insertion, not on every pick-up or every selected colour. Cancelling before launch refunds that reservation once. The three-piece mix does not silently charge three recipes. Existing material collection and flight progression are unchanged.

## Kept from the published 0.5.2

The actual physics.js, world.js, combat052.js, feedback052.js, style.css and hotfix052.css files are byte-for-byte unchanged. The keyboard portion of input.js has the 0.5.4 browser-safe change above; its touch routing is unchanged. The flight controller, hold/release ascent/descent, stronger envelopes, local AI acquisition and finite projectile travel are not replaced by the alternate 1.0 draft. Preparation input is isolated from the normal two-thumb router and does not inject movement or shots when returning to play.

Read [the retained flight and combat notes](FLIGHT-0.5.2.md) for speeds, range limits, balloon endurance, recovery, controls and asset licences. The original castle, character save and all non-Bubble repository projects remain untouched.

## Earlier 0.5.3 verification and limitations

Actual local runs passed 44/44 direct-manipulation browser checks, 13/13 mix/profile checks, the retained 32/32 flight/combat rule checks and 43/43 flight/browser regression checks: 132 assertions in total. The former recipe-button steps in the browser regression were replaced with the actual gum-to-mouth and bubble-pull gestures. Tests cover all six flavour launches, mixing, partial inflation, cost/refund, FPS shot colour, real human bone use, cancelled touches, event isolation, all four flight legs and desktop/touch layouts. The final 44-check suite was repeated after the last camera-framing adjustment.

Browser tests used the production logic and real renderer with only imports/resource locations rebased to local blob URLs. Environment: Chromium with SwiftShader under Linux/Xvfb; synthetic pointer/touch events, not a physical iPhone or Safari. Viewports included 1440x900, 430x932, 430x744, 375x667 and 932x430. A separate continuous-render mobile check retained an active WebGL context with no page exceptions. These checks do not establish real-device frame rate or polished animation quality.

The grasp and face motion are game approximations, not motion capture, full soft-body chewing gum, per-finger collision or anatomical chewing simulation. The selected bubble is made with a drag gesture, not actual blowing into a microphone. Asset licences are unchanged in assets/HUMAN-ASSET-LICENSE.txt, assets/SURFACE-LICENSE.txt and vendor/LICENSE.txt.

The runtime source blob hashes and test summary are recorded in tests/hands-0.5.3.json. Old versioned reports describe the older revisions, not the new interaction.
