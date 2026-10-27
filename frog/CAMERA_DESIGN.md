# FROG camera and aiming design

## Decision

The rear 3D view uses direct shooter controls. Mouse movement changes the viewing and aiming direction together. Left click fires at the same time. WASD movement is relative to the current rendered view. The camera follows the player's position automatically and preserves the viewing direction until the player supplies look input.

The old Automatic/Manual modes are retired. A/D and backward movement do not rotate the camera. Firing and aiming do not disable look input. The unpublished screen-edge turning experiment was replaced by this consistent control model.

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
| [Activision: Call of Duty Mobile Boot Camp, 2019](https://blog.activision.com/call-of-duty/2019-09/Call-of-Duty-Mobile-Boot-Camp-Part-1-Getting-Started-in-the-Game) | Simple Mode fires automatically when the player aims at a target. | FROG mobile uses the two thumbs for movement and aim; normal fly fire is automatic. |
| [Epic: Fortnite mobile guide, 2020](https://www.fortnite.com/news/getting-started---fortnite-for-mobile) | Auto Fire is one of the mobile fire modes, recommended in that guide for new mobile players. | Remove the need to press a separate normal-fire control while aiming. |

These manuals establish controls and visible composition. They do not disclose the games' private collision algorithms, automatic recentering logic, smoothing constants, or input implementations. The FROG rules below are design decisions informed by those references.

For camera placement, [Unity's Third Person Follow documentation](https://github.com/Unity-Technologies/com.unity.cinemachine/blob/main/com.unity.cinemachine/Documentation~/CinemachineThirdPersonFollow.md) explains separate tracking/aim targets and collision handling that changes placement while retaining useful aiming. [Epic's Orbit Camera documentation](https://dev.epicgames.com/documentation/fortnite/using-orbit-camera-devices-in-fortnite-creative) likewise treats following, optional angular recentering, pitch limits, and obstruction handling as separate controls. These are implementation references, not claims about a specific game's default behavior.

## Desktop behavior

- New Round or Continue starts gameplay immediately and requests native mouse look as an enhancement. Mouse deltas rotate the view directly, including while either mouse button is held.
- Left click fires repeatedly while held. Right click is not a prerequisite for rotating.
- The rear-view crosshair stays at screen center. Its camera ray chooses the world aim point; the projectile travels from the frog's mouth toward that point, preserving parallax and collision checks.
- W/S move forward/backward in the rendered camera's horizontal basis. A/D strafe. The basis updates immediately when the player looks elsewhere.
- Mouse displacement determines angular displacement, independently of frame rate. A stationary mouse leaves yaw and pitch unchanged.
- Escape pauses and releases the pointer. Unexpected pointer-lock loss also pauses. Continue attempts to reacquire control through a new activation, without making gameplay depend on the browser accepting it.
- C switches to the existing overview and releases the pointer for free cursor aiming. Returning to the rear view reacquires mouse look through the initiating key/click.

The browser input mechanism follows [MDN's Pointer Lock API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API). Relative movement remains available while the visible cursor is hidden, independent of button state and screen boundaries. Menu activations never queue shots.

Pointer Lock can be denied, absent, or briefly unavailable after Escape. These cases must not reverse the menu action by calling pause. While unlocked, pointer movement provides bounded direct look inside the viewport and left click still fires. A world click also retries native capture without withholding its shot. The cursor remains visible in this fallback; continuous turning beyond the viewport requires native capture. No camera angle changes or automatic view switches are introduced.

The request session uses generation-bound promise handling, legacy event handling and a bounded timeout. An intentional release is recorded before asynchronous browser events arrive, so an old unlock cannot pause a newly resumed round. A late grant while gameplay is inactive is released. Real unexpected loss of an established lock still pauses and clears held inputs.

## Round menu

New Round and Continue are equal halves of one shared visual control, implemented as two native buttons in an accessible group. New Round resets the simulation; Continue restores the paused or saved unfinished round. Continue is disabled only when no unfinished round exists. Touch and pen activate on release inside the selected half, preserve their original pointer identity, and suppress the following compatibility click. Mouse and keyboard retain native click activation.

## Touch behavior

The left stick moves in the current view's horizontal basis. The right thumb drags the world to change yaw and pitch together with aim. Ordinary mobile combat has no separate fire button or right look joystick. A passive hint identifies the aiming area and confirms automatic fire; it never intercepts touch events.

Normal fly fire is automatic only while a touch/pen aiming pointer is held on the world and the reticle has a valid opponent in range. Lifting/canceling that pointer stops fire independently of the movement pointer. Touch contact, rather than a global device flag, enables auto-fire, so mouse input on a touch-capable laptop retains manual firing. An unmoving aim finger keeps the chosen viewing direction.

The camera ray and the actual source-to-muzzle/projectile trace must agree on the opponent. The resolver uses this frame's input direction and the model's existing body volume, lifetime, terrain, walls and rock collision. It never redirects aim or enlarges the target. Visible decorative roofs and opaque stock baskets additionally block acquisition, without introducing new projectile physics. Projectiles retain their flight time and can be dodged. The simulation owns the unchanged firing cooldown and ammo use.

Auto-fire yields during preparation, inactive/finished rounds, layout editing, incapacitation, empty ammo, sabotage, kicks, and catapult use. Invulnerable targets do not consume ammo. Pausing, blur, resizing, and visibility loss clear held intent. An old touch cannot resume firing after those transitions.

In overview, the aiming thumb selects the world point under its contact and can drag to update it. The movement thumb preserves that aim; touching the world does not change the selected view. Catapults retain deliberate manual stone firing and show their aim/fire controls only while mounted. Temporarily hidden controls preserve their saved positions without reserving layout space.

## Position, visibility and preferences

- Default pitch is 0.12 radians downward, providing useful forward combat reach for a centered reticle. The selected pitch can range from -0.65 to 1.15 radians.
- Position following is smoothed. Yaw and pitch respond to deliberate input; there is no movement-derived rotation, delayed angular recentering, or screen-edge turning.
- The desired camera boom is checked against terrain, raised walking floors and the full visible lily fringe after focus smoothing. The separate lily camera surface accounts for leaf curvature, tilt and bob without altering walking collision. The boom shortens before an obstruction while preserving the requested view direction.
- The local frog model and its collection tongue are hidden only when a shortened boom puts the eye inside or immediately beside that body. This does not alter the actor, projectile origins, or collision rules.
- Existing roof cutaway and enclosure visibility behavior remains in use. A storage basket also fades when it lies between the camera and the frog, preserving visibility at the lower initial viewing angle. Its reserve flies and objective marker stay visible.
- Zoom, FOV and view sensitivity persist. Reset restores their defaults and preserves the selected viewing angle. Legacy automatic/manual settings do not control the new camera.

## Acceptance criteria

The meaningful check is the combined action, not merely whether an isolated camera function changes a number:

1. Actual mouse input turns horizontally and vertically while left click continues firing.
2. Strafing, backing up, idle time and held fire do not introduce yaw/pitch changes by themselves.
3. Holding W while turning intentionally changes travel direction immediately.
4. The rendered center ray, chosen aim point and newly fired projectile agree in the same frame.
5. Real upward and downward shots remain possible; camera placement does not enter terrain or fill the view with the local body.
6. Escape, pointer-lock loss, Continue and overview transitions leave no stuck input.
7. Two touch contacts perform movement and world aiming together, with eligible automatic fly fire and independent release/cancel behavior. Empty space, cover, preparation and sabotage never auto-fire. Catapult fire remains deliberate.
8. Camera settings preview safely while paused and survive reload.

Unit tests cover the math, boom placement, settings, tap buffer, menu activations, native mouse-look request lifecycle, auto-fire eligibility and visible touch-control layout. The original camera acceptance harness is `qa/arcade-435.mjs`; menu/capture failure regression coverage is `qa/arcade-436.mjs`. The mobile auto-fire harness is `qa/arcade-437.mjs`, using actual browser touch input and deterministic simulation fixtures. Mobile coverage is emulated and does not claim physical iPhone/Safari testing.
