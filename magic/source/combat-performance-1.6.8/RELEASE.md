# MAGIC 1.6.8 — enemy approach CPU work

The iPhone startup fix in1.6.7 is retained. This patch reduces repeated work when enemies approach: navigation checks only spatially relevant floor/obstacle candidates with the original exact predicates, and the contact animation solver updates needed joint chains instead of repeatedly traversing complete rigs. All models, materials, lighting, animations, enemy populations and mobile texture settings are retained.

Navigation equivalence checks cover6080 queries and all18039 nodes, including obstacle removal. The actual four character rigs match11640 bone matrices exactly across walking, running, attacking, airborne, death and stun inputs. The monument test loader resolves the new module without changing assertions.

Measured Windows Chrome CPU4x portrait proxy: sustained CPU mean128.10→98.35ms and first-approach mean143.65→130.21ms. This is not an actual iPhone measurement. The dedicated route-query comparison was26.26→5.27ms over240 calls.

Desktop timing varied heavily across unpinned runs, including a failing ABBA comparison. A bounded follow-up used the same Windows-enumerated performance-core set for owned temporary test renderers only: sustained CPU mean9.31→9.07ms and P9512.3→11.5ms. Initial approach P9518.1→20.6ms and mean14.14→14.98ms; max50.5→46.1ms. Do not interpret these as a general PC FPS improvement. Original observations and limitations remain in PERFORMANCE.json and local test receipts.

The user confirmed that1.6.7 loads and plays on the physical iPhone14ProMax/Chrome, but reported strong FPS drops when enemies first approach. Physical-device confirmation of this new patch remains pending. Previous1.6.7 commit and hashed runtime assets remain available; no new assets, dependencies or ports are introduced.
