# MAGIC 1.4.0

Integrates the expanded castle, HEARTH BULWARK, permanent kill loot/equipment, Goliath, detailed bosses and persistent fire in one playable release.

14 rooms plus bridge; 64 regular enemies; four guardian encounters (Colossus, Gargoyle, Wraith, caster), shuffled across crypt, ritual, forge and sanctum. The engine uses a safe random room on each run. Its room name is visible in the HUD. C draws fire, E charges/boards/exits, V holds the flamethrower. I opens the 24-slot inventory; 1/2 consume potions. Hold R for two seconds near seven stones to assemble Goliath.

Validated: 103 unit tests; physics/mission and 16 ballistic cases; 80 loot/Goliath, 35 compiled inventory, 137 castle, 44 boss combat, 37 native HEARTH controls and 7 mounted lifecycle checks. Positions and combat targets in automated scenarios are controlled fixtures; they are not unaided full playthroughs.

Chrome desktop with RTX 5080: desktop/portrait/landscape checked. Boss-scene rAF samples were approximately 60 FPS with p95 16.8ms and no frames over 50ms. This is desktop hardware and does not establish physical phone performance. CPU/GPU utilization and RAM/VRAM were not measured.

Runtime: 22 files / 20.87 MiB, relative URLs for /magic/, complete offline precache including the throw worker and GLBs. Editable Blender sources/rigs/textures remain under source/bosses and source/hearth-bulwark.
