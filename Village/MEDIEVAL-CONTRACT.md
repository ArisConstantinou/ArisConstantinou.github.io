# FEΟUDA 1280 shared implementation contract

Target: transform this existing GitHub Pages game into a playable medieval real-time strategy campaign, with actual Three.js 3D rendering, castles, armies, sieges, territory capture, villagers and resource economy. Greek UI; Cypriot pounds (CY£), fictional map in 1280. No Moutoullas branding. Preserve old browser save keys; use `feouda-1280-v1`. Version 2.4.1. Do not change or publish any `chronicle/` files. Root handles integration, versioning, PWA and publishing.

## Files / ownership
- Root owns `feouda-data.js`, UI `app.js`, `style.css`, `index.html`, PWA and staging. Root supplies vendored Three.js `vendor/three.module.js`.
- Engine agent owns `feouda-engine.js` and `tests/feouda.test.mjs` only.
- 3D agent owns `feouda-world.js` and additional `feouda-models.js` / `feouda-materials.js` if needed. Do not alter shared data silently.

## Data module
Exports `FACTIONS` dictionary; `REGIONS` array; `RESOURCE_NODES` array; `UNIT_TYPES`, `BUILDINGS`, `TECHS` dictionaries; `MAP`, `BRIDGES`; `heightAt(x,z)`, `riverX(z)`, `regionAt(x,z)`.
Each region: `{id,name,subtitle,owner,polygon:[[x,z]],x,z,kind:'castle'|'town'|'outpost',neighbors:[ids],fortHp}`. Faction keys `player`, `red`, `gold`, `neutral` with name/color/shortName/motto.
Nodes: `{id,type:'wood'|'stone'|'iron'|'food',regionId,x,z,amount,workers:0}`.
Unit definition: `{name,plural,description,role,men,hp,damage,range,speed,cooldown,armor,cost,trainTime,requires,bonus,structureBonus}`; keys spear,sword,archer,cavalry,ram,trebuchet. Use definitions reasonably; no changing API assumptions.

## Engine API
`createGame({storage,now?})` returns `{state,subscribe(fn),step(dtSeconds),command(action,payload),save(),exportSave(),importSave(text),reset(),setPaused(bool),setSpeed(1|2|4)}`. `step` receives real seconds, handles speed and substeps; never applies offline warfare. Commands return `{ok,message,...}`. `subscribe` returns unsubscribe. `state` is live getter. `exportSave` returns JSON string, import is transactional.

State fields required:
```
{schema:1,t,day,paused,speed,resources:{money,food,wood,stone,iron},population,housing,morale,prosperity,era,
 regions:{[id]:{id,owner,fortHp,maxFortHp,level,buildings:{[type]:level},capture:0}},
 nodes:[{id,type,regionId,x,z,amount,workers}],
 squads:[{id,owner,type,x,z,hp,maxHp,men,order:{type,x?,z?,targetId?,regionId?},stance,formation,attackClock?}],
 jobs:[{id,kind:'train'|'build'|'research',type,regionId,remaining,duration}],
 techs:{[id]:level},effects:[{id,type:'arrow'|'stone'|'hit'|'capture',x,z,tx?,tz?,age,life,owner?}],
 log:[{id,t,type,title,text}],missions:[{id,title,description,progress,target,done}],
 stats:{gathered,trained,captured,kills,lost,built}, ai:{nextRaid,truce:{red:0,gold:0}}, outcome:null|'victory'|'defeat'}
```
If useful extra fields are fine. Keep this read contract intact.
Commands:
- `assignWorkers {nodeId,delta}` conserves available civilian workforce and checks ownership.
- `train {type,regionId}` reserves resources/army capacity, queue, completion spawns squad.
- `build {type,regionId,x?,z?,rotation?,structureId?}` owned region only; a new normal building requires a confirmed map position. See the spatial construction contract below. Walls remain at the fortress.
- `research {type}` costs/time, tech applies battle/economy improvement.
- `order {ids:[friendly squad IDs],type:'move'|'attackMove'|'attack'|'capture'|'hold'|'retreat',x?,z?,targetId?,regionId?}`. Validate finite coordinates, reachable ground and own unit IDs. Attack may target hostile squad ID or region ID. `attackMove` retains its finite ground destination, engages encountered enemies, reacquires when appropriate and resumes the original route after combat. Preserve this order through save/import validation. Plan paths over one of two bridges when river banks differ. Capture requires frontier ownership adjacency and infantry after fortress breach. No remote instant damage/capture.
- `formation {ids,formation:'line'|'column'|'wedge'}` affects spacing/movement/combat.
- `stance {ids,stance:'aggressive'|'defensive'}` affects engagement/pursuit; hold defends current ground.
- `trade {resource,type:'buy'|'sell',amount}` costs checked.
- `truce {faction}` costs checked, duration 180s, visibly stops that faction raids, attacking cancels.
- `repair {regionId}` restores fort over a queued job; owned and resource checked.
No teleportation, fake outcome timers or all-state refresh each frame. AI sends real marching squads and fights. Keep defeated game recoverable through explicit new campaign reset (UI confirmation).

### Spatial construction and collision contract

The save key and schema remain `feouda-1280-v1` / schema 1. Each persistent plot appears in:

```js
state.structures = [{
  id, type, regionId, x, z, rotation, baseY, terrainMin,
  level, status: 'ready' | 'building' | 'upgrading',
  jobId: null | 'job-id', variant
}];
```

- `game.findBuildLocation(type, regionId, rotation=0)` returns a legal initial placement or `null`. It neither spends resources nor reserves the plot.
- `game.canCommand('build', {type,regionId})` returns the normal quote and `requiresPlacement:true` when the project is available and needs a new plot. An actual `command` without a position is rejected.
- Preview a plot with `{type,regionId,x,z,rotation}`. The returned `placement` contains normalized `x,z,rotation,width,depth,baseY,terrainMin`, with `ok/message` for validity. Invalid geometric previews retain placement geometry when their coordinates are finite. Rotation uses radians and the same Y-axis convention as Three.js.
- Confirm by calling `game.command('build', {type,regionId,x,z,rotation})`. Validation runs again at confirmation. Only this call pays the quote, reserves four workers, creates the persistent building site and invalidates intersecting army routes. Success also returns `jobId` and `structureId`.
- An existing building is upgraded with `{type,regionId,structureId}`. It remains on the same plot, changes to `upgrading`, and returns to `ready` on completion. An attempted change of position or rotation is rejected.
- A construction job stores `structureId,x,z,rotation,targetLevel`. Completion changes the same structure to `ready`; its position and foundation remain unchanged.
- `regions[id].buildings[type]` is the sum of completed levels of that type in the region. It retains the existing economy, scaled costs and maximum-level rules. A new plot adds one completed level; an upgrade adds one level to an existing plot.
- Buildings require the entire plot to be inside an owned region and the map, on suitable ground, away from water, bridge approaches, resources, roads, forts, other plots and live troops. Rotated-plot clearance is symmetric so a valid placement also validates on reload.
- Old saves without `structures` migrate their aggregate levels to existing placed buildings, preserving resources, time, progress and active job timers. An old completed level 3 becomes a level-3 existing building. Old unfinished work receives a legal plot and a linked job. New campaigns may split initial housing across separate plots. Saved plots and their job links are validated transactionally; malformed imports do not alter the running game.

The engine exports `BUILD_FOOTPRINTS` and its alias `BUILDING_FOOTPRINTS`. They give exact world-metre `width,depth,clearance,blocking` values. The renderer must normalize detailed models, temporary fallback models and scaffolds to the same footprint. Farms reserve their construction area but remain traversable by troops.

Physical geometry is shared through:

```js
worldObstacles(state);
isWorldPointWalkable(state, point, radius = .65);
isWorldSegmentWalkable(state, from, to, radius = .65);
UNIT_CLEARANCE;
FORT_POLYGONS;
```

The obstacle list contains rotated rectangles or circles, with source, region and part identifiers. It includes every ready building, construction site and upgrade, plus the actual curtain walls, portcullises, corner towers, keeps and interior houses. The original region's fortress shape remains fixed after a change of ownership. Wall chunks disappear at the renderer's exact health ratios; portcullises remain solid while the ratio exceeds .16. Standing towers and interior buildings remain solid after a breach. Castle hall and stable envelopes are fixed at 9.5 × 7.8 m centered at (-9, 3.1) and 6.4 × 6.6 m centered at (8.8, 4), relative to the fortress; the keep is 11.6 × 10.3 m centered at (0, -4).

Infantry and archer centres reserve .8 m, cavalry 1.6 m and siege chassis 4.8 m against solid geometry. Siege bridge clearance uses a 2.05 m half-width. A* edges, diagonal corners, path smoothing, every real movement segment and every crowd-separation push all use continuous collision checks. An obsolete path is stopped before penetration and rebuilt. A newly occupied destination moves to the nearest reachable free point. Repairing or reinforcing a wall waits if its restored geometry would enclose a soldier; pending jobs expose `blockedReason` for the UI.

The renderer also checks each visible formation member's point, anchor-to-offset segment and previous-to-next segment using the shared helpers. This prevents the outer soldiers of a formation from visually passing through a building when the squad centre is clear. Visible-member collision envelopes cover human bodies at .8 m and mounted cavalry inside the engine’s 1.6 m clearance. The authored horse and trebuchet keep their measured origin and full animated envelope; normalizing only an idle pose must not enlarge them beyond those limits.

`getNavigation()` preserves its existing methods and adds optional unit/radius arguments:

```js
isWalkable(point, unitOrRadius = .65);
findPath(from, to, unitOrRadius = .65);
clearSegment(from, to, unitOrRadius = .65);
nearestGround(point, unitOrRadius = .65);
getObstacles();
fortGate(regionId); // accessible approach outside the actual gate
```

Unit arguments may be a squad object, a unit type string or a numeric radius. The engine's own commands always use the selected unit's clearance. When loading an old save, unsafe old paths are cleared and any unit stored inside a newly solid building is moved to nearby legal ground before the campaign resumes; no elapsed time is simulated.

## Renderer API
`createBattlefield(canvas,{onSelect(selection,event),onGround(point,event),onContext(point,selection),onBoxSelect(ids,event),onPlacementHover(point),onPlacementPick(point),onReady?,onError?,onAssetStatus?})` returns:
`setState(state)`, `setSelection({kind:'region'|'node'|'structure'|'squad'|'army',id?,ids?})`, `setPlacement(preview)`, `clearPlacement()`, `focus({x,z}|regionId)`, `home()`, `zoom(delta)`, `setMapMode('terrain'|'political'|'resources')`, `setQuality('low'|'high')`, `setInsets({left,right,top,bottom})`, `setInputEnabled(bool)`, `getDebugState()`, `destroy()`.

`selection` callback payload is `{kind:'region'|'node'|'structure'|'squad',id}`. Ground point is `{x,z}`. Pointer events carry lightweight modifier/button data. `onBoxSelect` receives `{shiftKey,additive,doubleClick?}`. Desktop left click selects; left drag creates a selection rectangle; Shift adds rectangle hits or toggles a clicked squad. Double click or Ctrl-click on a friendly squad selects visible friendly squads of that type. Hit testing includes visible formation members while callback IDs remain squad IDs. Ground clicks issue orders only if a UI command mode is armed. Right click issues contextual orders; middle/right drag pans without also issuing an order. Wheel zooms, Q/E orbits and WASD pans, with the app intercepting A for attack targeting when an army is selected. Mobile retains one-finger pan, tap selection/order and pinch zoom. Construction mode routes ground input to its preview and confirmation callbacks. Disable world input during modals and release pointer/keyboard state cleanly on exit.
Renderer is real 3D terrain, shadows, stone material, detailed castle walls/gates/crenellations, timber trebuchets and rams, soldiers/horses/banners, visible missiles and battle dust, trees/resource clusters, distant hills/atmosphere. Show different fortresses/settlements, not identical clones. Keep targets aligned with data positions; troop feet at same heightAt ground; broken fortress walls visually change. Resource workers/settlement growth visible. Stable performant static caches/instancing. No pretend photographic AAA claims.

## Shared balance/experience
Initial player owns 3 of 9 regions, begins with a visible home castle and supporting village/quarry. 2 neutral frontier regions and 2 enemy factions with 2 regions each. 7 starting player squads including one ram so first actions meaningful. Food and wages matter, civilian development matters, actual scattered resources. Upgrades/campaign persist. Early raid warning before real incursion; RTS tactical pause and 1x/2x/4x. All generic labels Greek. Return clear disabled reasons to UI via commands. Tests should verify costs, queues, battle range, marching and siege/capture, AI, resources, persistence.

## Detailed model integration, version 2.3

The 19-entry local asset manifest includes an anatomical horse, a counterweight trebuchet and ten specialist buildings in addition to the existing humans, ram, modular fortress, thatched house and fir LODs. All models and textures are embedded or served from this repository.

- Preserve `normalization: 'authored'` for the horse and trebuchet. Their original origins, scales, sockets and full animation sweeps are measured against the engine clearance. Horse clips are Idle/Walk/Trot; trebuchet clips are Idle/Attack.
- A mounted human follows the horse's animated saddle position with an upright seated pose. Gait advances with traveled distance; it does not continue walking during tactical pause.
- Synchronize the trebuchet's authored sling release/reload with the game attack cycle. Projectiles originate at `prop_projectile`, use the original loaded stone geometry and retain the engine impact time.
- Specialist mapping: `siege` uses the blacksmith workshop, `lumberyard` the sawmill, `market` the trade hall, `infirmary` the stone chapel, and `well` the roofed stone well. The well is capped at 3.15 m high. Other dimensions fit inside existing reserved plots.
- Use precise geometry bounds for building fitting and grounding. A conservative AABB transformed through an authored rotation can incorrectly enlarge the bounding box and make the model float. Scaffolds and all four placement rotations must stay within the same plot and clearance contract.
- The sawmill preserves its authored Sawing clip and six-node wheel/crank/blade mechanism. Inland mills remain stationary; river-adjacent mills can animate without changing placement or economy rules.
- Credits and modifications are recorded in `horse-sources.json`, `trebuchet-sources.json`, and `buildings-sources.json`. The horse and trebuchet adaptations retain CC BY-SA 3.0; the five building assets are CC0.


## Distinct facilities, version 2.3

Five further local GLBs map directly to `barracks`, `stable`, `archery`, `quarry` and `mine`. Each model's full visible geometry is centered and grounded using precise vertex bounds, then uniformly fitted inside the existing plot with a 0.7 m total margin. Authored ground skirts and scattered props must not distort that fit or reduce doors and work areas to an implausible human scale.

- Preserve saved structure IDs, positions, rotations, levels, job links and all existing economy rules. New detailed art automatically replaces the visual model on those saved plots.
- The actual military and resource models and their placement ghosts must remain inside the same obstacle envelope as construction scaffolds and upgraded buildings.
- The courtyard stable retains its existing geometry inside the fixed 6.4×6.6 m envelope. The detailed open-map stable has a larger human-scale layout; do not shrink its doorways to fit that courtyard blocker.
- Compatibility rendering has five distinct simplified silhouettes: stone barracks, open stalls, target range, working quarry and timber mine entrance. Their geometry uses the same centering, grounding and fitting rules.
- Public source revisions, creators, licences and adaptations are recorded in `military-buildings-sources.json` and `specialist-sites-sources.json`. Every released GLB and provenance file is included in the versioned offline cache.

## RTS interaction and visual behavior, version 2.4

### Readable, actionable command interface

- Main navigation states the action and purpose in Greek. Resource amounts, army controls and construction cards must remain legible at the default UI size. Construction cards include a distinct image, practical benefit, complete resource costs, duration and availability. The separate detail action remains usable when construction is gated and shows the specific reason.
- Twelve building thumbnails in `assets/ui/buildings/` are rendered from the actual shipped GLBs. Each retains a local illustrated placeholder until its image loads and on image failure. Provenance is recorded in `assets/ui/buildings/sources.json`; these are model previews, not concept art or borrowed Age of Empires UI assets.
- Selecting a completed owned production building exposes only its matching training types: barracks → spear/sword, archery → archer, stable → cavalry, siege → ram/trebuchet. Validate the selected structure and existing economy gates again when the command is executed. Pending construction does not enable training.
- Reconcile dynamic UI nodes by stable keys. A timer/resource refresh must preserve the actual button, focus and pointer target, including image load state. Normal simulation updates must not replace the complete panel with new HTML every half-second.
- Preserve the map construction sequence: choose a card, preview legal ground, rotate with R by 90 degrees, confirm with the on-screen action or Enter, cancel with Escape. Preview never spends resources. Native keyboard activation of focused UI buttons remains intact. Placement input takes precedence over military hotkeys.

### Guidance and selection state

The collapsible `Τι κάνω τώρα;` guide opens when `feouda-guide-v24-seen` is absent, including for existing campaign saves. Steps link to relevant controls and highlight the next applicable action. Completion is recorded only after a successful positive worker assignment, confirmed new spatial construction, nonempty friendly army selection, successful `move`/`attackMove` order, or successful entry into the training queue. Clicking a guide button, opening a panel, arming a command or previewing a plot is not completion. Mobile task buttons collapse the guide before opening the relevant controls.

The app owns selection and control groups. Selection must visibly show the chosen squads, unit types, men, health and current orders. Shift-click toggles one squad; additive box selection merges IDs without duplicates. A mobile multiple-selection toggle supports equivalent tap behavior. Per-type selection buttons are available in the army interface.

Groups 1–9 use Ctrl/Meta + number to replace, Ctrl/Meta + Shift + number to append, number to recall and Shift + number to merge into the current selection. A second quick recall focuses the camera on the mean position of the surviving selected squads. On-screen group assignment works without a keyboard. Remove dead or invalid IDs before use. B opens construction and F focuses selected troops.

Groups and guide progress use `feouda-control-groups-v1` and `feouda-guide-v24-progress`; they are separate from schema-1 campaign exports and are cleared on campaign reset/import. This release does not convert squad simulation into individually controlled soldiers or give workers independent click-to-move orders.

### Animation, construction and terrain

- Human motion is supplied as local authored clips retargeted to the shipped human skeletons. `assets/models/human-motion.json` and its binary companion describe the runtime data and licence. Record source attribution and adaptations with the asset provenance; do not describe this as a new motion-capture session or as animation obtained from Age of Empires.
- Actual collision-checked displacement drives locomotion phase and facing. Blend transitions between rest, walking/running and action states. Combat motion follows the engine attack cycle; work poses match assigned tasks. Tactical pause must stop simulation-driven gait, work and combat. Keep visible formation members outside the shared obstacle geometry throughout turns and stops.
- Resource workers occupy stable task positions around their resource. Builders occupy stable positions outside the reserved plot and face their work. Resource assignment must not render workers circling the node while performing a walking loop. Decorative residents use legal, collision-checked route segments with stationary intervals.
- `feouda-environment.js` owns construction staging. Reveal fixed-scale slices of the completed architecture with foundations, supplies and scaffolding according to the real linked job progress. Never vertically squash or stretch the complete building to represent completion. Upgrades keep the existing completed model visible. Visual progress does not shrink or remove the reserved collision footprint, move the plot or change job cost/duration.
- Terrain blends meadow, soil, rock and woodland according to slope, elevation, settlements, resource areas, road shoulders and river banks. New local photographic soil/rock layers are documented in `assets/medieval/terrain-sources.json`. Distant foliage uses alpha-coverage-preserving mipmaps. These are rendering changes; resource quantities, region ownership and pathfinding remain engine responsibilities.

### Evidence and limits

[RTS-RESEARCH.md](RTS-RESEARCH.md) links the primary Age of Empires, Xbox, animation-director and technical-artist references used for these decisions. Apply interaction and presentation principles while retaining this game's own interface and licensed assets.

The DOM integration harness has passed 32 scenarios at desktop dimensions and 32 at mobile dimensions, using the actual app and simulation with a mocked renderer boundary. It verifies functional state transitions, construction costs and placement, selection/groups, contextual training, guide progress, image fallback, stable UI nodes and save/import flows. Engine tests separately cover movement, collision and battle behavior, including attack-move engagement and route resumption. These checks are not live WebGL rendering benchmarks. Do not claim AAA production quality, a certified frame rate, physical iOS testing or verified GPU performance without corresponding device evidence. The compatibility renderer remains a simpler representation of the same campaign.

Building explanations are revealed only by an explicit detail-button activation. Pointer hover and keyboard focus must not change the inspector or scroll the construction list. Repeating the detail action for the selected type must still bring its explanation into view.
