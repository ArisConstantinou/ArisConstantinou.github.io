# FROG 4.3.13 battleground, guards, camera and aiming feedback

## Decision

The rear 3D view uses direct shooter controls. Mouse movement changes the viewing and aiming direction together. Left click fires at the same time. WASD movement is relative to the current rendered view. The camera follows the player's position automatically and preserves the viewing direction until the player supplies look input.

The old Automatic/Manual camera modes are retired. A/D and backward movement do not rotate the camera. Firing and aiming do not disable look input. Mobile controls support continuous turning from a held right-stick deflection and, after a deliberate horizontal world swipe, from holding the reached screen edge. These are intentional look inputs; movement and target acquisition do not introduce camera rotation.

## Battleground expansion in 4.3.12

`arcade-battleground.js` is the shared source for the larger arena, its districts, connecting paths and added resources. The arena radius grows from 25 to 38 world units; the movement boundary grows from 24 to 37. Existing frog bodies, bases, doorways, walls, storage points, catapult yards and machine dimensions retain their physical scale and positions. Movement speeds, projectile speed and lifetime, catapult range, objective timers and bot combat tuning also stay unchanged. The additional space therefore creates longer optional routes rather than extending weapon reach or changing the original base approaches.

| District | Center `(x, z)` | Role |
| --- | --- | --- |
| Κεντρικό πέρασμα / central crossing | `(0, 3)` | Existing central meeting area and direct base connections. |
| Καλαμιώνας / reed beds | `(-20, -24)` | Northwest connector between the western flank, northern pond and inner approach. |
| Λίμνη νούφαρων / lily pond | `(1, -29)` | Northern destination with a new resource patch and approaches from both outer flanks. |
| Δάσος ριζών / root woodland | `(-29, 1)` | Western resource destination with additional vegetation cover. |
| Πέτρινες αναβαθμίδες / stone terraces | `(29, 1)` | Raised eastern resource destination with northern and southern connections. |
| Ανθισμένη όχθη / flower bank | `(8, 29)` | Southern resource destination joining the outer western and eastern routes. |

Five district centers lie beyond the old arena radius. Thirteen authored paths connect the districts and original base approaches. Their heights blend smoothly with the surrounding natural terrain, and district/path tints make the layout readable. The arcade world uses `battlegroundHeight` and `battlegroundTint`, keeps route corridors clear of random vegetation, and disables exploration-specific discovery decoration. The ordinary exploration world keeps its own decoration. Base and catapult floor shaping still uses the existing geometry.

Nine outer rocks and five outer cover groves are appended to the existing collision/cover lists. Movement, free-space checks, navigation and artillery landing bounds use the shared movement radius. The navigation solver sees the new physical obstacles. Its authored route ribbons are visual connections across traversable ground, not forced rails or an independent navigation system.

Four new resource patches at the root woodland, lily pond, stone terraces and flower bank bring the total to ten patches with twelve flies each. Original patch IDs `swarm-0` through `swarm-5` and fly IDs 0–71 remain stable; new patches and fly IDs are appended. New rounds contain 120 flies. Loading accepts both the legacy 72-fly array and the current 120-fly array. Valid saved positions, phases and replenishment timers of existing flies are preserved, and a legacy save receives 48 freshly initialized flies in the new outer patches. Actor ammunition, storage state and round progress continue through the existing loader; the carrying limit is 90 in 4.3.13, with existing magazines preserved on resume.

The minimap uses the full arena radius for its projection and grid. Tinted district shapes and route ribbons sit underneath the existing functional markers, so storage warnings, opponents, fly availability and cover remain readable. The existing footer shows `battlegroundAreaAt(player.x, player.z)?.name` inside a district, with the normal legend as its fallback. This adds orientation without increasing the HUD footprint or placing extra district labels over gameplay.

## Research and its limits

The closest reference is **Plants vs. Zombies: Garden Warfare 2 / Battle for Neighborville**, because it combines cartoon third-person characters, projectile combat, faction bases, and defensive objectives.

| Primary source | Documented behavior | What FROG takes from it |
| --- | --- | --- |
| [EA: Battle for Neighborville PC manual](https://www.ea.com/able/resources/pvz/pvz-battle-for-neighborville/pc/manual) | WASD moves; the mouse turns the camera/character; left click fires; right click zooms or activates a secondary weapon. | Ordinary looking and firing must operate together. Looking does not require holding the right button. |
| [EA: Battle for Neighborville controls](https://www.ea.com/able/resources/pvz/pvz-battle-for-neighborville/pc/controls) | Separate strafe and look actions; horizontal and vertical look; adjustable look and aiming sensitivity. | Strafing preserves the chosen view. View sensitivity belongs in settings. |
| [EA: Garden Warfare 2 PC manual, pages 3 and 5](https://eaassets-a.akamaihd.net/eahelp/manuals/pvz-garden-warfare-2-manual_PC_na.pdf) | The same desktop mapping; the HUD example shows a central aiming reference and the character below it. | The central camera ray supplies a stable requested direction. FROG displays the actual mouth-trace endpoint when a near obstruction creates parallax. |
| [Epic: camera types and gameplay controls](https://www.fortnite.com/news/new-camera-types-gameplay-controls-and-map-options) | Standard Fortnite third-person movement is tied to the camera direction. Independent movement is a different control configuration. | Holding W follows an intentional mouse turn; A/D remain camera-relative strafing. |
| [Nintendo: Splatoon 2 basic battle controls](https://support-jp.nintendo.com/app/answers/detail/a_id/34693) | Left stick moves; right stick looks; gyro aims, or right stick when gyro is off; ZR fires; Y resets the camera. | Movement and view/aim have distinct input channels, and firing coexists with looking. This source describes Splatoon 2 specifically. |
| [Krafton: PUBG Mobile controls](https://pubgmobile.helpshift.com/hc/en/3-pubg-mobile/faq/37-what-are-the-controls/) | Left-side movement and dragging empty screen space to change the view in both axes. | Touch look changes view and aim together. |
| [Activision: Call of Duty Mobile Boot Camp, 2019](https://blog.activision.com/call-of-duty/2019-09/Call-of-Duty-Mobile-Boot-Camp-Part-1-Getting-Started-in-the-Game) | Simple Mode fires automatically when the player aims at a target. | Offer automatic fire as a mobile preference so two thumbs can concentrate on movement and aim. |
| [Epic: Fortnite mobile guide, 2020](https://www.fortnite.com/news/getting-started---fortnite-for-mobile) | Auto Fire is one of the mobile fire modes, recommended in that guide for new mobile players. | Make automatic fire optional while retaining deliberate manual firing and practice. |

These manuals establish controls and visible composition. They do not disclose the games' private collision algorithms, automatic recentering logic, smoothing constants, or input implementations. The FROG rules below are design decisions informed by those references.

For camera placement, [Unity's Third Person Follow documentation](https://github.com/Unity-Technologies/com.unity.cinemachine/blob/main/com.unity.cinemachine/Documentation~/CinemachineThirdPersonFollow.md) explains separate tracking/aim targets and collision handling that changes placement while retaining useful aiming. [Epic's Orbit Camera documentation](https://dev.epicgames.com/documentation/fortnite/using-orbit-camera-devices-in-fortnite-creative) likewise treats following, optional angular recentering, pitch limits, and obstruction handling as separate controls. These are implementation references, not claims about a specific game's default behavior.

## Desktop behavior

- New Round or Continue starts gameplay immediately. On foot, it requests native mouse look as an enhancement; mouse deltas rotate the view directly, including while either mouse button is held. A resumed mouse-controlled catapult uses the free aiming cursor described below.
- Left click fires repeatedly while held. Looking works with either button released or held. The right-button indicator adds no secondary attack, zoom or other gameplay ability.
- The rear camera's center ray chooses the requested world aim point. The projectile travels from the frog's mouth toward that point, preserving parallax and collision checks. The one visible crosshair stays at the input location: screen center under pointer lock, or the tracked free cursor. The first contact changes its feedback only.
- W/S move forward/backward in the rendered camera's horizontal basis. A/D strafe. The basis updates immediately when the player looks elsewhere.
- Mouse displacement determines angular displacement, independently of frame rate. A stationary mouse leaves yaw and pitch unchanged.
- Escape pauses and releases the pointer. Unexpected pointer-lock loss also pauses. Continue attempts to reacquire control through a new activation, without making gameplay depend on the browser accepting it.
- C switches to the existing overview and releases the pointer for free cursor aiming. Returning to the rear view reacquires mouse look through the initiating key/click while on foot. A mounted catapult keeps its free aiming cursor in either view.

The browser input mechanism follows [MDN's Pointer Lock API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API). Relative movement remains available while the visible cursor is hidden, independent of button state and screen boundaries. Menu activations never queue shots.

Pointer Lock can be denied, absent, or briefly unavailable after Escape. These cases must not reverse the menu action by calling pause. While unlocked, pointer movement provides bounded direct look inside the viewport and left click still fires. A world click also retries native capture without withholding its shot. During valid on-foot aiming the game canvas hides the native pointer and draws the same single crosshair; menus, interactive UI and mounted catapult targeting retain their normal pointer behavior. Continuous turning beyond the viewport requires native capture. No camera angle changes or automatic view switches are introduced.

The request session uses generation-bound promise handling, legacy event handling and a bounded timeout. An intentional release is recorded before asynchronous browser events arrive, so an old unlock cannot pause a newly resumed round. A late grant while gameplay is inactive is released. Real unexpected loss of an established lock still pauses and clears held inputs.

## Stable crosshair and overview aiming in 4.3.13

The overview has a planar default: an empty-space cursor ray selects a bearing on the standing firing plane, and flies follow terrain at their normal firing height, exactly like the directional stick. A direct visible actor hit instead selects the true 3D body point, including source/target hop height and a mounted operator. Chase and catapult aiming retain their separate existing contracts. This is a direction rule, not enlarged hit volumes or hidden horizontal aim assistance.

The preview samples the same launch and flight evaluation as a real projectile. It supplies feedback and diagnostics, never crosshair placement. White arms mean a clear path, green arms with a center dot mean a frog or hostile beetle body contact, and orange arms with a small X mean a physical obstruction. Green is not confirmation of damage.

The overview mouse crosshair uses the exact pointer coordinates in the label canvas's CSS-pixel space, with no smoothing or edge clamping. It stays on those pixels during walking, hops, camera settling, firing and contact-kind changes. Pointer-locked rear view and touch rear view use the viewport center; unlocked rear mouse view uses the tracked cursor for both its aim ray and marker. Overview touch uses a point eight world units along the chosen bearing, at standing muzzle height, so variable collision depth and hop height cannot reposition it. Only that directional marker can get an offscreen edge chevron.

`arcade-reticle.js` keeps `anchor`, `anchorWorld` and `anchorProjection` separate from the physical `endpoint` and `projection`. `arcade-mouse-aim.js` maps client input through the actual canvas rectangle. Visible frog and hostile beetle contacts retain their real 3D hit point; empty overview space stays directional. No on-foot guide line, extra cursor, impact ring or target snapping is introduced. Mounted catapults retain their separate landing cursor and ballistic arc.

## Storage beetles, ammunition and road junctions in 4.3.13

Each storage has one owner-friendly beetle in `state.guards`, separate from frog actors and victory conditions. Shared body geometry is radius 0.46 and height 0.62, with center Y 0.31 above the common ground sampler. The defender patrols locally, acquires only visible hostile frogs in range, warns for 0.95 seconds, and commits to a fixed-bearing 3.2-unit charge. Walls, rocks and a 5.1-unit leash restrict it. One charge can deal at most one hit; height, spawn shields and ordinary hit protection still apply. The renderer uses the model's exact charge lane for its warning.

Four hits disable a beetle for 20 seconds. Enemy fly shots, kicks and artillery use the same hit path; its owner's shots pass through it and cannot harm it. Destroying the storage removes its guard. Bot targeting includes hostile guards and resolves the defender before a nearby raid; existing reaction, windup and spread rules still apply. Save/load preserves health and disabled time. Legacy saves gain the three appropriate guards, and resuming an active attack requires a fresh warning.

Capacity, starting ammunition and respawn ammunition are 90 for every frog. Bot refill thresholds follow the same capacity: below 9 to return, at least 72 to resume. Existing saves keep their carried ammo and can refill to 90.

All thirteen roads are drawn as one shared triangulated union. Junctions cannot contain one mesh per overlapping branch. World-space color and texture are continuous across their shared vertices, conservative local draping clears the real terrain, and wooden decks/ramps are subtracted from the road surface. There are no per-route vertical offsets. `tests/arcade-road-junctions.test.mjs` checks single coverage, duplicate-route invariance and platform exclusions.

## Desktop indicators and contextual actions in 4.3.12

The WASD display sits at the far left and the mouse diagram at the far right. Each active movement key changes to bright green; arrow-key equivalents light the corresponding WASD key. Left and right mouse buttons light independently, including chords and releasing one while the other remains held. These are passive input indicators. Pause, blur, cancellation and inactive gameplay clear their pressed appearance. The former bottom help strip and the Click/Esc text labels are gone. The pause icon and Escape shortcut remain.

Catapult entry/exit is shown beside the usable own machine, with its icon and an E badge on desktop. The enemy storage action explicitly reads **ΚΑΤΑΣΤΡΟΦΗ**, shows the uninterrupted eight-second hold requirement and displays remaining time and progress while held. The existing E priority and ownership/range checks remain in force. These world actions find free screen space around the existing HUD and touch pads; they do not move the saved sticks.

Each visible dizzy opponent has its own kick icon and three follow-up pips reflecting `finishHits`. The caption becomes KO only when one follow-up hit remains. Range, body height, line of sight, target protection, player incapacity and kick recovery determine availability. An out-of-range icon is disabled and says to approach. Clicking or tapping the icon requests that exact target; a missing or invalid target does not fall back to another frog. The ordinary physical kick still checks contact at impact and adds one hit. Dizzy duration remains 4.5 seconds and three additional hits are still required after the initial six-hit threshold.

Q keeps the normal nearest eligible kick selection. Its badge appears only on the ready dizzy target that this unqualified Q action would actually select, and is hidden on mobile. Another dizzy target can still be selected directly through its own icon. The fixed mobile kick button remains available for an ordinary defensive kick against a nearby opponent that is not dizzy. No new instant finisher, movement toward a clicked target or enlarged kick reach is introduced.

## Bot attack fairness (retained from 4.3.11)

Newly acquired or changed targets require 0.35–0.60 seconds of reaction, followed by a visible 0.40–0.55 second windup. A world aim point is sampled once at windup start; neither target motion nor target height is tracked during that commitment. Aim is recalculated only from the bot's current mouth to that frozen point, so the bot's own strafe or hop does not invalidate its shot. Horizontal error is uniformly sampled within ±0.14 radians, with an additional ±0.04-radian allowance while moving, and a small ±0.09-unit vertical error. There is no velocity prediction. This preserves close-range danger while making lateral dodges and medium-range misses meaningful.

Bots fire two-shot bursts, with 0.25–0.40 seconds recovery before the next windup and 1.15–1.60 seconds rest after a burst. Recovery survives loss of sight. Target change, loss of sight, impact and incapacitation cancel pending aim; fresh acquisition is required to resume. All countdowns use simulation seconds, including the movement-decision timer. A still-visible target is retained to avoid frame-by-frame switching between near-equal distances. Both rivals use the same policy and can attack each other. Projectile speed, collision rules and ammunition remain shared with the player.

## Frog body direction

### Contact geometry (retained from 4.3.11)

Ammo never changes the frog's collision size. A shared horizontal body radius of 0.64 drives swept movement, scenery clearance and separation between active frogs. Projectile traces instead use fixed rounded volumes following the visible torso, head, eye ridges and low legs, expanded only by the fly's 0.1 radius. Ground height, hop height, the mounted offset and the currently rendered body yaw are included. Camera targeting, preview, manual shots and automatic fire all use these same projectile contacts.

Walls have rounded clearance corners. Walls, rocks, stationary machines and the arena rim participate in one sweep, preserving tangent movement and immediate movement away from a contact. Navigation uses the same solids with a small additional clearance and rechecks cached route segments after displacement. Close kicks require matching body height and recheck contact when the foot lands. NPCs aim at the actual target body height, including mounted operators.

The objective uses 12-second respawns and an 8-second uninterrupted sabotage for every owner. The one-second spawn shield ends on a successful offensive action and is separate from the short post-hit immunity. A small shield symbol shows its lifetime; automatic fire does not spend ammunition on it. Respawning into an occupied home chooses a nearby clear interior position, avoiding an automatic displacement/interruption of the attacker.

The player body follows the simulation's last movement heading during ordinary hopping, independently of the camera and the input-anchored crosshair. Left, right, backward and diagonal movement therefore turn the frog toward travel. The heading remains through landing gaps and after movement release; zero hop velocity does not snap it back toward the crosshair.

Deliberate manual fire, eligible automatic fire, the complete shot interval, kicks and mounted catapults use aim-facing so the visible mouth/body agrees with the attack direction. Storage sabotage uses the simulation's storage-facing heading. KO, elimination, dizzy and knock-up retain the current visual yaw for their existing reaction poses. NPC combat aiming and windup remain intact.

The facing choice does not rotate logical aiming, movement axes or camera yaw. Models receive their initial facing when created, then interpolate toward the chosen yaw through the shortest angular path. Projectile body volumes follow that rendered yaw. Passive looking alone does not force the player's body away from its movement heading.

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

The actual source-to-muzzle/projectile trace must agree with current target visibility. For rear-view center-ray input and world point aiming, the camera ray must identify the same opponent. Overview directional-stick input derives a fresh camera-to-target visibility ray rather than using a stale cursor point. The resolver uses this frame's input direction and the model's existing body volume, lifetime, terrain, walls and rocks. It never redirects aim or enlarges the target. Visible decorative roofs and opaque stock baskets additionally block acquisition without new projectile physics. Projectiles retain flight time and can be dodged. The simulation owns firing cooldown and ammo use. Automatic-fire state is shown on the joystick; the shared crosshair color continues to describe the projectile contact.

Automatic fire yields during preparation, inactive/finished rounds, layout editing, incapacitation, empty ammo, sabotage, kicks, and catapult use. Invulnerable targets do not trigger it. Explicit manual shots retain the existing practice rules. Pausing, blur, resizing, visibility loss and firing-mode changes clear held intent. Automatic evaluation runs after buffered taps and catapult actions so a short special-action tap takes priority.

In overview, the right stick controls the shot direction and world touch selects the point under the finger; neither changes the selected view. Movement-stick updates preserve the selected aim. Catapults retain deliberate manual stone firing: the integrated fly button becomes the stone button while mounted. The player can select direction and power with the outer ring, release it, and press the center button to use that selection. A held button does not repeatedly launch stones. Control positions persist in both firing modes and both orientations.

## Touch-control placement

The movement pad and integrated aim/fire pad are two movable groups. Legacy standalone-fire coordinates are retained in storage but do not create a third draggable control or reserve space. Positions remain normalized viewport centers, saved independently for portrait and landscape.

Placement permits the full safe viewport, including passive HUD, map and status areas. Fixed interactive HUD buttons and the other pad constrain placement. The world-context catapult/storage actions and dynamic frog kick buttons are excluded from stick obstacles; their own placement avoids the saved pads. Circular pad collision frees transparent square corners; unobstructed movement follows the pointer without snapping to a grid. Physical safe insets and measured caption overflow keep controls and captions on screen.

Only the deliberately dragged pad overwrites its saved preference. Temporary displacement to keep a fixed defensive-kick button or the editor's Reset button reachable does not replace that preference. Reset is reserved immediately when the edit UI appears and released when it closes. Moving, showing or hiding world-context actions cannot displace a pad. Context-driven refresh waits until held gameplay control/look input ends, so a pad does not move under an active finger. The passive edit hint does not intercept touches; its Reset button remains interactive.

## Position, visibility and preferences

- Default pitch is 0.12 radians downward, providing useful forward combat reach for the center camera ray. The crosshair stays at the input anchor and the trace determines its feedback. The selected pitch can range from -0.65 to 1.15 radians.
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
4. The camera ray chooses the requested aim. The crosshair remains at the mouse pixels or locked-view center through movement and contact changes; only trace feedback changes. Touch overview uses a fixed bearing distance with an edge chevron only when necessary. Both views share feedback colors and shapes, with no on-foot guide or second cursor.
5. Real upward and downward shots remain possible; camera placement does not enter terrain or fill the view with the local body.
6. Escape, pointer-lock loss, Continue and overview transitions leave no stuck input.
7. Both mobile modes retain the right joystick with a usable center fire button. An outer-ring start aims without manual fire, including when dragged across the center. A center start fires and aims with one pointer while the other moves. Manual allows empty-space and preparation practice; Automatic works with held joystick/world aim and independent release/cancel behavior. Empty space, cover, preparation and sabotage never trigger automatic fire. Catapult fire remains deliberate and retains an outer-ring aim selection for the next center-button press.
8. Camera settings preview safely while paused and survive reload.
9. Firing-mode selection survives reload, New and Resume. Switching mode clears held input and does not reset progress or camera preferences.
10. The settings panel scrolls vertically with a real single-finger swipe in short landscape viewports. Its Back button remains reachable without automation-assisted scrolling; game pan and pinch protection remain active outside this scoped panel scroll.
11. A held right-stick deflection continues turning through more than one revolution with no new pointermove events. Neutral/release stops it. Intentional outward world swipes continue at the side edge and stop on inward motion/release; edge taps and vertical swipes never start the continuation.
12. Pads can be moved into formerly forbidden passive-HUD areas while real buttons remain accessible. The center fire button moves with the aim pad. Portrait and landscape preferences survive reload and temporary contextual/editor displacement without unexpected overwriting.

13. A mouse-controlled catapult has a usable free aiming cursor in both views; mouse movement selects the landing target without rotating the camera. Mount unlock does not pause, fresh clicks launch stones, and dismount restores normal on-foot look without stuck firing.

14. WASD and both mouse-button indicators show independent pressed states and clear on release/blur/pause. The far-left and far-right indicators do not add actions or intercept gameplay. The pause icon and Escape still work without the old bottom help labels.
15. A dizzy target's icon tracks its own three follow-up pips, is disabled when unreachable or unavailable, and requests exactly that target. Q is shown only on its actual default ready target. Mobile retains the fixed defensive kick for nearby opponents that are not dizzy.
16. Catapult entry/exit and the clearly labelled eight-second storage hold remain attached to their world context, with useful progress and accessibility labels. Their movement and visibility changes leave saved touch-pad positions unchanged.
17. The new outer districts are reachable beyond the old movement radius through real stepped movement and navigation. Shared bounds, unchanged body/structure scale and connected authored paths agree with the rendered map.
18. Legacy 72-fly saves retain their existing patch depletion and round progress while receiving the four new patches; current 120-fly saves round-trip without dropping resources. The radar shows the expanded boundary, routes and current district in its existing footprint.

Unit tests cover math, boom placement, camera/fire settings, tap buffering, menu activations, native mouse-look request lifecycle, automatic-fire eligibility, fresh directional visibility, continuous look input, visual body-facing and touch-control layout. The original camera acceptance harness is `qa/arcade-435.mjs`; menu/capture failure regression coverage is `qa/arcade-436.mjs`. Historical mobile auto-fire and selectable-firing-mode coverage remains in `qa/arcade-437.mjs` and `qa/arcade-438.mjs`. Integrated-fire, continuous-turning and flexible-placement coverage remains in `qa/arcade-439.mjs`. Movement-facing and mounted-mouse coverage is `qa/arcade-4310.mjs`. Contact, objective timing, spawn protection and historical overview feedback coverage is `qa/arcade-4311.mjs`; seeded combat tests measure real first-shot hits and sidestep avoidance. The 4.3.12 UI harness remains as historical coverage. Current release harnesses are `qa/arcade-4313-aim.mjs`, `qa/arcade-4313-guards.mjs` and `qa/arcade-battleground.mjs`, supported by focused reticle, guard, auto-fire, junction, input, targeted-kick and layout tests. `tests/arcade-battleground.test.mjs` checks the outer routes with actual movement/navigation, unchanged dimensions, shared boundary use, radar coverage and both save formats. These use browser input with deterministic simulation fixtures. Mobile coverage is emulated and does not claim physical iPhone/Safari testing.
