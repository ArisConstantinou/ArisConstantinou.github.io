# Latest working MAGIC patches on main

The user requested committing and publishing all latest working patches. Reinspection found the verified runtime and editable sources already published as MAGIC 1.6.3, commit `05ac0b4a07708fe9a0a9307db5f367ce3048a7c8`. No runtime code or artwork needed replacement.

Fresh verification: all 128 current canonical JavaScript/CSS sources match main; 23 exact public file hashes match the release. 253 game tests and 15 map tests pass. Two installed gameplay-client iterations load the actual public game; a separate native real-time check proves movement, pause and resume with no uncaught errors or remaining owned browser processes. No rebuild was needed for byte-identical runtime assets.

The main commit for this request records those results. It does not claim newly changed runtime behavior. Previous release validation and performance measurements remain applicable to the identical runtime. Physical-phone crash stability and the previously observed intermittent WebKit timeout remain unresolved.

Unfinished Archer, Iron Warden and other source-model experiments remain preserved locally and are not promoted as finished game assets. The complete model redesign goal remains active at 87.0%; this publication task is separate. No new paid generation, agents, installs, dependency changes or port changes. Task-attributed weekly usage is unavailable.

Play: https://arisconstantinou.github.io/magic/?v=1.6.3
