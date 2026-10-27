# FROG 4.3.10 camera and aiming design

## Decision

The rear 3D view uses direct shooter controls. Mouse movement changes the viewing and aiming direction together. Left click fires at the same time. WASD movement is relative to the current rendered view. The camera follows the player's position automatically and preserves the viewing direction until the player supplies look input.

The old Automatic/Manual camera modes are retired. A/D and backward movement do not rotate the camera. Firing and aiming do not disable look input. Mobile controls support continuous turning from a held right-stick deflection and, after a deliberate horizontal world swipe, from holding the reached screen edge. These are intentional look inputs; movement and target acquisition do not introduce camera rotation.

## Research and its limits

The closest reference is **Plants vs. Zombies: Garden Warfare 2 / Battle for Neighborville**, because it combines cartoon third-person characters, projectile combat, faction bases, and defensive objectives.

| Primary source | Documented behavior | What FROG takes from it |
| --- | --- | --- |
| [EA: Battle for Neighborville PC manual](https://www.ea.com/able/resources/pvz/pvz-battle-for-neighborville/pc/manual) | WASD moves; the mouse turns the camera/character; left click fires; right click zooms or activates a secondary weapon. | Ordinary looking and firing must operate together. Looking does not require holding the right button. |
| [EA: Battle for Neighborville controls](https://www.ea.com/able/resources/pvz/pvz-battle-for-neighborville/pc/controls) | Separate strafe and look actions; horizontal and vertical look; adjustable look and aiming sensitivity. | Strafing preserves the chosen view. View sensitivity belongs in settings. |
| [EA: Garden Warfare 2 PC manual, pages 3 and 5](https://eaassets-a.akamaihd.net/eahelp/manuals/pvz-garden-warfare-2-manual_PC_na.pdf) | The same desktop mapping; the HUD example shows a central aiming reference and the character below it. | A stable central crosshair is compatible with freely changing the aiming direction. |
| [Epic: camera types and gameplay controls](https://www.fortnite.com/news/new-camera-types-gameplay-controls-and-map-options) | Standard Fortnite third-person movement is tied to the camera direction. Independent movement is a different control configuration. | Holding W follows an intentional mouse turn; A/D remain camera-relative strafing. |
| [Nintendo: Splatoon 2 basic battle controls](https://support-jp.nintendo.com/app/answers/detail/a_id/34693) | Left stick moves; right stick looks; gyro aims, or right stick when gyro is off; ZR fires; Y resets the camera. | Movement and view/aim have distinct input channels, and firing coexists with looking. This source describes Splatoon 2 specifically. |
| [Krafton: PUBG Mobile controls](https://pubgmobile.helpshift.com/hc/en/3-pubg-mobile/faq/37-what-are-the-controls/) | Left-side movement and dragging empty screen space to change the view in both axes. | Touch look changes view and aim together. |
| [Activision: Call of Duty Mobile Boot Camp, 2019](https://blog.activision.com/call-of-duty/2019-09/Call-of-Duty-Mobile-Boot-Camp-Part-1-Getting-Started-in-the-Game) | Simple Mode fires automatically when the player aims at a target. | Offer automatic fire as a mobile preference so two thumbs can concentrate on movement and aim. |
| [Epic: Fortnite mobile guide, 2020](https://www.fortnite.com/news/getting-started---fortnite-for-mobile) | Auto Fire is one of the mobile fire modes, recommended in that guide for new mobile players. | Make automatic fire optional while retaining deliberate manual firing and practice. |

These manuals establish controls and visible composition. They do not disclose the games' private collision algorithms, automatic recentering logic, smoothing constants, or input implementations. The FROG rules below are design decisions informed by those references.

For camera placement, [Unity's Third Person Follow documentation](https://github.com/Unity-Technologies/com.unity.cinemachine/blob/main/com.unity.cinemachine/Documentation~/CinemachineThirdPersonFollow.md) explains separate tracking/aim targets and collision handling that changes placement while retaining useful aiming. [Epic's Orbit Camera documentation](https://dev.epicgames.com/documentation/fortnite/using-orbit-camera-devices-in-fortnite-creative) likewise treats following, optional angular recentering, pitch limits, and obstruction handling as separate controls. These are implementation references, not claims about a specific game's default behavior.

## Desktop behavior

- New Round or Continue starts gameplay immediately. On foot, it requests native mouse look as an enhancement; mouse deltas rotate the view directly, including while either mouse button is held. A resumed mouse-controlled catapult uses the free aiming cursor described below.
- Left click fires repeatedly while held. Right click is not a prerequisite for rotating.
- The rear-view crosshair stays at screen center. Its camera ray chooses the world aim point; the projectile travels from the frog's mouth toward that point, preserving parallax and collision checks.
- W/S move forward/backward in the rendered camera's horizontal basis. A/D strafe. The basis updates immediately when the player looks elsewhere.
- Mouse displacement determines angular displacement, independently of frame rate. A stationary mouse leaves yaw and pitch unchanged.
- Escape pauses and releases the pointer. Unexpected pointer-lock loss also pauses. Continue attempts to reacquire control through a new activation, without making gameplay depend on the browser accepting it.
- C switches to the existing overview and releases the pointer for free cursor aiming. Returning to the rear view reacquires mouse look through the initiating key/click while on foot. A mounted catapult keeps its free aiming cursor in either view.

The browser input mechanism follows [MDN's Pointer Lock API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API). Relative movement remains available while the visible cursor is hidden, independent of button state and screen boundaries. Menu activations never queue shots.

Pointer Lock can be denied, absent, or briefly unavailable after Escape. These cases must not reverse the menu action by calling pause. While unlocked, pointer movement provides bounded direct look inside the viewport and left click still fires. A world click also retries native capture without withholding its shot. The cursor remains visible in this fallback; continuous turning beyond the viewport requires native capture. No camera angle changes or automatic view switches are introduced.

The request session uses generation-bound promise handling, legacy event handling and a bounded timeout. An intentional release is recorded before asynchronous browser events arrive, so an old unlock cannot pause a newly resumed round. A late grant while gameplay is inactive is released. Real unexpected loss of an established lock still pauses and clears held inputs.

## Frog body direction

The player body follows the simulation's last movement heading during ordinary hopping, independently of the camera and the persistent center reticle. Left, right, backward and diagonal movement therefore turn the frog toward travel. The heading remains through landing gaps and after movement release; zero hop velocity does not snap it back toward the reticle.

Deliberate manual fire, eligible automatic fire, the complete shot interval, kicks and mounted catapults use aim-facing so the visible mouth/body agrees with the attack direction. Storage sabotage uses the simulation's storage-facing heading. KO, elimination, dizzy and knock-up retain the current visual yaw for their existing reaction poses. NPC combat aiming and windup remain intact.

This is a rendering decision. It does not change logical aiming, aim vectors, movement axes, projectile traces or camera yaw. Models receive their initial facing when created, then interpolate toward the chosen yaw through the shortest angular path. Passive looking alone does not force the player's body away from its movement heading.

## Mouse aiming from a catapult

A mounted mouse-controlled catapult uses a free screen cursor to choose the stone landing direction and range in both chase and overview views. Mouse movement changes that target while camera yaw and pitch stay fixed. A fresh left click launches one stone toward the current selection; holding does not repeatedly launch stones.

Mounting intentionally releases native pointer lock without pausing. No new lock request is made while mounted. Relative mouse deltas update the aiming cursor during any delay before the browser delivers the unlock, so the transition remains usable. Pause and Resume retain the selected cursor position. Dismount clears held input and returns to ordinary on-foot mouse look; the next world click retries native capture if necessary, while the existing unlocked-look fallback remains available.

The fixed-camera cursor behavior applies to mouse control. Touch players retain the established joystick/world-drag catapult aiming and explicit central stone button.

## Round menu

New Round and Continue are equal halves of one shared visual control, implemented as two native buttons in an accessible group. New Round resets the simulation; Continue restores the paused or saved unfinished round. Continue is disabled only when no unfinished round exists. Touch and pen activate on release inside the selected half, preserve their original pointer identity, and suppress the following compatibility click. Mouse and keyboard retain native click activation.

## Touch behavior

The left stick moves in the current view's horizontal basis. The right joystick contains the manual fly-fire button in its moving center knob. Both remain visible in both firing modes. Starting a contact on the outer ring owns an aim-only gesture; crossing the center button during that gesture does not start manual fire. Starting on the center button latches manual fire for that same contact, and dragging it also aims. A center fire press has no initial look displacement, including an off-center press inside the button. Pointer capture preserves the contact while it moves beyond the pad. The joystick's passive badge shows the selected firing mode without intercepting touch input.

Right-stick deflection expresses angular speed in the rear view. It is evaluated every active frame, including frames with no new pointer movement. Holding a horizontal deflection therefore supports repeated full turns without lifting the finger. Deflection magnitude and the view-sensitivity preference control speed. Vertical deflection continues pitching within the existing safe pitch limits. Returning to the neutral zone or releasing/canceling the contact stops stick rotation. The fire button travels with the knob inside the pad, so movement, looking and deliberate fire work with two thumbs.

World dragging remains a direct horizontal/vertical look alternative. Touch/pen edge continuation is armed only by an intentional horizontal swipe of at least 8 CSS pixels. In a side strip 12% of viewport width, clamped to 40–72 CSS pixels, holding the outward gesture smoothly adds horizontal angular speed; merely touching the edge or moving vertically does not arm it. Inward movement of at least 6 CSS pixels cancels continuation at that edge, filtering stationary-finger noise. Release, cancellation, lost capture, pause, layout editing, blur, resizing and view changes clear it. Right-stick ownership takes precedence over world look. Edge continuation is inactive in overview and is never attached to desktop mouse input.

The mobile fire preference is Manual or Automatic, with Manual as the default for absent/invalid settings. Manual never acquires fire from an outer-ring look gesture alone: holding the center fire button shoots freely, including into empty space during preparation for practice. Dragging that held button also controls continuous view/aim. Automatic is opt-in and persisted separately from camera preferences. The center manual button remains available even with Automatic selected. Changing modes clears held input but preserves the round and camera.

Automatic fly fire requires a held touch/pen pointer on the right stick or world and a valid reachable opponent. An outer-ring gesture returned to the stick's center dead zone remains eligible without rotating or gaining manual fire. A fresh center-button contact still deliberately shoots without requiring a target. Lifting/canceling the aim pointer stops its automatic intent independently of the movement pointer. Pointer types are recorded per stick and cleared through lifecycle transitions, so mouse-only input on a touch-capable laptop retains manual firing.

The actual source-to-muzzle/projectile trace must agree with current target visibility. For centered rear view and world point aiming, the camera ray must identify the same opponent. Overview directional-stick input derives a fresh camera-to-target visibility ray rather than using a stale cursor point. The resolver uses this frame's input direction and the model's existing body volume, lifetime, terrain, walls and rocks. It never redirects aim or enlarges the target. Visible decorative roofs and opaque stock baskets additionally block acquisition without new projectile physics. Projectiles retain flight time and can be dodged. The simulation owns firing cooldown and ammo use.

Automatic fire yields during preparation, inactive/finished rounds, layout editing, incapacitation, empty ammo, sabotage, kicks, and catapult use. Invulnerable targets do not trigger it. Explicit manual shots retain the existing practice rules. Pausing, blur, resizing, visibility loss and firing-mode changes clear held intent. Automatic evaluation runs after buffered taps and catapult actions so a short special-action tap takes priority.

In overview, the right stick controls the shot direction and world touch selects the point under the finger; neither changes the selected view. Movement-stick updates preserve the selected aim. Catapults retain deliberate manual stone firing: the integrated fly button becomes the stone button while mounted. The player can select direction and power with the outer ring, release it, and press the center button to use that selection. A held button does not repeatedly launch stones. Control positions persist in both firing modes and both orientations.

## Touch-control placement

The movement pad and integrated aim/fire pad are two movable groups. Legacy standalone-fire coordinates are retained in storage but do not create a third draggable control or reserve space. Positions remain normalized viewport centers, saved independently for portrait and landscape.

Placement permits the full safe viewport, including passive HUD, map and status areas. Only actual interactive button rectangles and the other pad constrain placement. Circular pad collision frees transparent square corners; unobstructed movement follows the pointer without snapping to a grid. Physical safe insets and measured caption overflow keep controls and captions on screen.

Only the deliberately dragged pad overwrites its saved preference. Temporary displacement to keep a contextual button or the editor's Reset button reachable does not replace that preference. Reset is reserved immediately when the edit UI appears and released when it closes. Context-driven refresh waits until held gameplay control/look input ends, so a pad does not move under an active finger. The passive edit hint does not intercept touches; its Reset button remains interactive.

## Position, visibility and preferences

- Default pitch is 0.12 radians downward, providing useful forward combat reach for a centered reticle. The selected pitch can range from -0.65 to 1.15 radians.
- Position following is smoothed. Yaw and pitch respond to deliberate input, including held mobile stick deflection and the armed touch-only side-edge continuation described above. There is no movement-derived rotation or delayed angular recentering.
- The desired camera boom is checked against terrain, raised walking floors and the full visible lily fringe after focus smoothing. The separate lily camera surface accounts for leaf curvature, tilt and bob without altering walking collision. The boom shortens before an obstruction while preserving the requested view direction.
- The local frog model and its collection tongue are hidden only when a shortened boom puts the eye inside or immediately beside that body. This does not alter the actor, projectile origins, or collision rules.
- Existing roof cutaway and enclosure visibility behavior remains in use. A storage basket also fades when it lies between the camera and the frog, preserving visibility at the lower initial viewing angle. Its reserve flies and objective marker stay visible.
- Zoom, FOV and view sensitivity persist. Reset restores their defaults and preserves the selected viewing angle. Legacy automatic/manual settings do not control the new camera.

## Acceptance criteria

The meaningful check is the combined action, not merely whether an isolated camera function changes a number:

1. Actual mouse input turns horizontally and vertically while left click continues firing.
2. Left/right/backward movement, idle time and held fire do not introduce camera yaw/pitch changes by themselves. Ordinary player hops face movement, including after a camera turn; landing and release retain that heading. Deliberate fire, kicks and mounted operation face aim.
3. Holding W while turning intentionally changes travel direction immediately.
4. The rendered center ray, chosen aim point and newly fired projectile agree in the same frame.
5. Real upward and downward shots remain possible; camera placement does not enter terrain or fill the view with the local body.
6. Escape, pointer-lock loss, Continue and overview transitions leave no stuck input.
7. Both mobile modes retain the right joystick with a usable center fire button. An outer-ring start aims without manual fire, including when dragged across the center. A center start fires and aims with one pointer while the other moves. Manual allows empty-space and preparation practice; Automatic works with held joystick/world aim and independent release/cancel behavior. Empty space, cover, preparation and sabotage never trigger automatic fire. Catapult fire remains deliberate and retains an outer-ring aim selection for the next center-button press.
8. Camera settings preview safely while paused and survive reload.
9. Firing-mode selection survives reload, New and Resume. Switching mode clears held input and does not reset progress or camera preferences.
10. The settings panel scrolls vertically with a real single-finger swipe in short landscape viewports. Its Back button remains reachable without automation-assisted scrolling; game pan and pinch protection remain active outside this scoped panel scroll.
11. A held right-stick deflection continues turning through more than one revolution with no new pointermove events. Neutral/release stops it. Intentional outward world swipes continue at the side edge and stop on inward motion/release; edge taps and vertical swipes never start the continuation.
12. Pads can be moved into formerly forbidden passive-HUD areas while real buttons remain accessible. The center fire button moves with the aim pad. Portrait and landscape preferences survive reload and temporary contextual/editor displacement without unexpected overwriting.

13. A mouse-controlled catapult has a usable free aiming cursor in both views; mouse movement selects the landing target without rotating the camera. Mount unlock does not pause, fresh clicks launch stones, and dismount restores normal on-foot look without stuck firing.

Unit tests cover math, boom placement, camera/fire settings, tap buffering, menu activations, native mouse-look request lifecycle, automatic-fire eligibility, fresh directional visibility, continuous look input, visual body-facing and touch-control layout. The original camera acceptance harness is `qa/arcade-435.mjs`; menu/capture failure regression coverage is `qa/arcade-436.mjs`. Historical mobile auto-fire and selectable-firing-mode coverage remains in `qa/arcade-437.mjs` and `qa/arcade-438.mjs`. Integrated-fire, continuous-turning and flexible-placement coverage remains in `qa/arcade-439.mjs`. Current movement-facing and mounted-mouse coverage is `qa/arcade-4310.mjs`. These use browser input with deterministic simulation fixtures. Mobile coverage is emulated and does not claim physical iPhone/Safari testing.
