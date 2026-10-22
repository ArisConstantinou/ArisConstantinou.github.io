# HEARTH access candidate 1.6.28

HEARTH previously selected any non-starting, non-secret room after checking only its local footprint. It could be placed beyond an engine-only fire gate or in a pocket without a wizard route. The candidate selects neighbouring rooms and validates a supported wizard route while keeping fire gates blocked. Wizard-solvable pressure gates are allowed only for this placement validation; gameplay gates, puzzles and collision remain active.

The minimap identifies the unoccupied engine with a gold H marker, room and distance. The marker stays on the map edge when distant, hides while piloting, and does not redraw the map during stationary idle. Touch controls are positioned below the expanded map in both orientations.

Verification: one new room-selection regression failed before and passed after.397 game tests and31 root tests pass. Twelve controlled runtime resets changed from6 inaccessible engine positions to12/12 supported neighbouring-room positions. Portrait, landscape and desktop layout checks pass without map/control overlap or horizontal overflow. Installed gameplay client completed two iterations; screenshots inspected. The last functional client briefly overlapped a newly launched peer Shipping job; no FPS or throughput claim uses that run.

Physical candidate review is pending: USB is connected, but the latest inspector probe found no active Magic page. Source-only candidate; no release promotion from these results. The previous actual live1.6.27 sustained39FPS idle result remains unresolved. New Archer, Iron Warden and Gargoyle construction and integration also remain unfinished.

No graphics settings, assets, enemy counts or animation quality were reduced. No new paid generation, dependency installation or model source change.
