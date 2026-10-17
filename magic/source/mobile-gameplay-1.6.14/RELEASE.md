# MAGIC1.6.14 — mobile interaction, stairs and benchmark HUD

Benchmark recording controls sit at the bottom left. On touch screens they clear the joystick; on desktop the movement legend moves above them. Powers and contextual actions remain unobstructed. Ordinary gameplay shows a measured FPS counter inside its health/header row. It counts actual presented frames against wall time, including stalls.

Touch dragging offsets the held object and landing reticle from the finger, suppresses the overlapping held-item banner/context action while dragging, and makes the landing reticle use the same world anchor as the carried object. Native touch tests place a real pressure weight, activate its slab on release, combine movement and dragging, and clean cancellation. Existing browser gesture/selection protection and unlimited benchmark health remain.

Library, gallery and watchtower share0.32m treads,0.20m risers and5.4m width, moved to their approved room sides. Watchtower has a clear entrance foyer. Cutaways hide a whole flight from underneath and restore it immediately when occupied. Landing furniture and the library upper divider leave a real arrival turn. Wizard and HEARTH ascend, turn across each upper landing, return and descend through actual Cannon contacts. No room/wing connection or exterior wall was replaced. All117 puzzle supply plans remain clear of overhead floors.

HEARTH shoulder collision shapes now rotate with its visible chassis. East/west doors no longer stop the suit before its existing1.45m strike reach. Native kick and punch tests open closed doors on both axes with contact errors below0.001m.

Validation:347 unit/integration tests,23 browser feature/layout checks including actual desktop and both mobile orientations,6 native touch checks,6 physical stair sequences,117 supply plans, and2 native gameplay-client iterations. Browser resources/processes close after checks. Public release hashes, runtime and offline behavior are verified after publication.

Performance limitation: the physical iPhone16–22FPS problem remains OPEN. Desktop GPU measurements at mobile viewport resolution are regression evidence only. No graphics quality, lighting, resolution, models, enemy count or asset profile was lowered. A finite-light shader experiment produced no consistent GPU gain and was removed. This release fixes interaction/layout/collision defects and adds visibility into FPS; it does not claim the iPhone rendering bottleneck is solved.

Rollback: the complete1.6.13 release and bundles are retained. Publish only through the approved Pages main publisher after candidate verification.
