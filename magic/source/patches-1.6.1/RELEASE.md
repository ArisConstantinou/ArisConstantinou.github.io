# MAGIC 1.6.1 — current-map unit patches

The Mage now uses continuous planted/swing transitions during travel, with the full map's camera-relative heading preserved. Updated fingers retain the original detailed Mage surface. The Wraith uses its articulated 88-joint source rig, independent chain constraints, source-timed ChainSweep/Binding contacts and distance skins. Summoners create the rigged Stone minion with authored spawn/claw timing and streamed distance surfaces.

Summon placement now evaluates actual support height, standing headroom, occupied vertical ranges and 3D sight. The old 2D search could complete a channel without producing minions on the full map. Enemy limits, existing map, door attacks, progress key and other gameplay remain intact. The unfinished Archer/Gargoyle/Goliath/Iron Warden source redesigns are excluded from this patch.

Editable current source: [connected full map](../../previews/greek-sanctuary/full-map-source/README.md). Previous main MAGIC release:985bdb0 (1.6.0). Original frozen exports and old hashed runtime assets remain hosted for recovery. No private blend/reference/account files are published.

Local verification:237 game unit cases and47 map cases; native movement/reversals, actual Stone summoning, both real Wraith attack hit times/damage, E boarding, both held-LMB outlets, release, pause/resume and touch movement. The prescribed gameplay skill client uses only an explicit readiness wait before its unchanged input/capture loop, because the stock5second click deadline precedes this map's ready state. Actual screenshots and runtime text were inspected.

Windows Chrome / Core Ultra9 285K / RTX5080,1440x900,69 live actors, sequential ABBA: rAF p95 before25.1ms/after25.0ms; CPU p95 23.7/22.6ms; separately measured CPU+GPU-finish p95 23.4/22.6ms. Portrait viewport rAF p95 25.0/24.9ms on this desktop GPU. These are local scene measurements, not physical-phone, Internet cold-load or universal60FPS proof. Existing large bundle warning retained.

The93-file initial offline cache is343,536,125bytes versus365,989,975bytes in1.6.0. New close surfaces cache on first use; source, unused exports and private previews are excluded. CACHE-MANIFEST.json records exact runtime bytes. Public deployment/offline checks follow the immutable main commit.
