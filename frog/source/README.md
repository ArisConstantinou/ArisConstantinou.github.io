# Βαλτομαχίες 4.4.18 — complete game source

4.4.18 resolves the objective illustration relative to the game document, so GitHub Pages subdirectory deployment uses /frog/art instead of the site root. Original illustration bytes are unchanged. See RELEASE-4.4.18.md.

4.4.17 limits Heavy first/total jump rise to1.25/1.85m, including aimed rock leaps. A one-time whole-character menu entrance replaces the old limb loops:300ms delay, side arrivals, and Heavy bottom arrival with rim grip, two efforts and pull-up. Settings/pause do not replay it; reduced motion stays static. In-game ledge climb remains inactive pending anatomical/visual repair. Original models and assets are unchanged. See RELEASE-4.4.17.md.

4.4.14 makes wall destinations follow mouse/touch input, adds readable constant-width trajectory guides, limits normal/double-jump height and uses the compact match clock for warmup. Existing scenery contacts and low rock access are retained. See RELEASE-4.4.14.md.

4.4.11 makes editor actions work directly on touch release after dragging, even when the browser suppresses click synthesis. See RELEASE-4.4.11.md.

4.4.10 adds a paused full HUD/control layout editor in Settings, stable mobile jumps for all three classes and uncluttered default positions. The approved standalone creator signature has complete edges and loads as a small lossless WebP. See RELEASE-4.4.10.md.

4.4.7 clarifies double-tap/click continuation, keeps selection actions visible, enables native card scrolling and prevents obsolete startup models. See RELEASE-4.4.7.md for validation.

4.4.6 adds optional water reflections and temporary comparison links; On preserves the original appearance. See RELEASE-4.4.6.md for PC measurements and the remaining physical-phone check.

4.4.2 adds actual distant indices and pose-safe culling for the existing frogs and houses. Close/KO/wall-held models remain original; see RELEASE-4.4.2.md for validation and physical-device limits.

4.4.1 reuses the unchanged paused canvas while preserving menu animation and normal live play. See RELEASE-4.4.1.md; live-game/mobile performance work remains ongoing.

Joint release of the three coordinated game workstreams.

- Three new selectable, articulated characters, distinct capacities/speeds and ground/air attacks; native menu and gameplay animation.
- New rigged rock catapult, real operator grips, delayed physical projectile release and chassis collision.
- Imported house and nature assets. House facade, floor, doorway and roof match gameplay surfaces. Actual weighted toe pads plant against the wall.
- Settings: manual wall hold, touch destination/range and confirmation; automatic closest reachable object. Strong ballistic push, local body pitch follows ascent/descent without a flip.
- Illustrated title Βαλτομαχίες / Μια ιδέα του Άρη, pausable objective reader and mobile layouts.
- GPU-compressed model textures, pooled/shared rendering data and live FPS/frame-time counter. Versioned model requests, existing automatic updater and save/settings keys retained.

Validation: 12 real new-body wall/contact/cardinal-flight cases; 6 live DOM touch manual/auto approach/contact/launch/landing recordings, all three classes; full source suite, updater/build, desktop and both mobile viewports. The original phone baseline was human-reported60FPS/p9518ms on iPhone14ProMax/Chrome. New performance comparisons use an RTX5080 desktop with mobile viewport emulation, not a physical phone. A2x frame-rate improvement is not established.

Editable Blender/source assets and original receipts remain in the canonical local assets-source folders. Public source includes runtime assets/provenance/decoder licenses; caches, credentials, test videos and huge raw Blender/original downloads are excluded.


## Build and preview

Pinned dependencies: Three.js0.180.0 and Vite6.3.6, package-lock.json included.
Use npm ci, npm test, npm run build. The project uses its fixed port4175
with strictPort. Canonical local builds/tests must run through StorageGuard.
The standalone built game uses relative URLs and needs an HTTP server.
Source tests under tests/ and older qa fixtures retain historical version strings;
these are not the current release version. See THIRD_PARTY_NOTICES.txt and
public/art/cartoon/assets.json for imported/generated model provenance.


4.4.15 fixes only the skinny menu kick: correct rest knee bend plane, shin-relative ankle orientation and a narrow menu-only weight transition. The original game models and4.4.14 gameplay are preserved. See RELEASE-4.4.15.md.


4.4.16 audits and repairs all menu leg rest planes and localized fused-skin contacts. Deliberate rock leaps land and perch until a fresh jump; outer mesh perches survive save/load. See RELEASE-4.4.16.md.
