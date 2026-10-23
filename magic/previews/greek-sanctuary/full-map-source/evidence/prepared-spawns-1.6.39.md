# Prepared summons 1.6.39 candidate

Protected public base:1.6.38/f081e0d8f22368228a91ac16d4d77658f3991661. No PC gameplay; physical iPhone only.

## Observed issue

The1.6.38 physical full battle has a gameplay57ms/render43ms sample at25270ms. The native Warden summons count rises from0to3 at25411ms. The visuals were created/cloned/prepared on demand inside that attack. This identifies a concrete first-use stall to address; it does not explain the entire remaining mean-frame cost.

## Change

- During Start loading, prepare three visuals each for archer, heavy and stone-minion when a Warden is present.
- Await original assets, prepare picking data/skinned bounds/textures, then include those real meshes in the existing actual GPU warm draws. Remove all nine from the scene before starting the encounter.
- Native actor creation takes an unused prepared visual when one is available. Stats, physics bodies, attack/summon times, damage, AI and number of enemies remain native.
- Each visual is handed off once and remains owned/disposed by that actor. No recycling across cached entity ownership. Unused prepared visuals are disposed before the next population. The reserve is bounded to nine; later exhaustion uses the original factory and is reported explicitly. Report configuration reads a fresh snapshot so misses cannot remain hidden behind the last successful take.
- JSON reports built/remaining/hit/miss counts. All original12regular+4bosses and native summons remain required by phone validation.
- No new visual feature disabled. Lambert diffuse shading is per fragment in pinned Three r180; the previous vertex-lighting description was incorrect and is corrected in the source evidence.

Existing mobile trade-offs remain declared: IBL/normal maps/metallic specular shading OFF; diagnostic shadow generation frozen after initial frames.494x856 drawing buffer retained; lower resolution alone did not solve the target.

## Verification

New source regression tests cover awaited readiness, real-parent preparation, one-time ownership handoff, and failure cleanup. Phone full-battle results must be added before publication. Stable60FPS and full-world completion remain unproven.

First six-visual reserve control: three full fights completed, all four bosses killed each time; first summon gameplay maxima11/2/14ms instead of57ms. The third fight had nine summoned units and exhausted six prepared visuals, reproducing a later44ms gameplay/44ms render stall. Its old configuration snapshot incorrectly still displayed zero misses. Neither that limited reserve nor its stale telemetry was published. The corrected candidate uses nine visuals and a live snapshot provider; both must be checked again.

Final nine-visual reserve: all three complete native fights passed, all four bosses killed; one diagnostic fight exercised nine summons and nine prepared hits, zero misses. Both clean fights exercised three summons, all prepared, zero misses. Initial roster remains12regular+4bosses. No errors or model suppression; source engine SHA-256 `819fa8542c5734a4294ce2549776f60799f67e6959db8ca2deaf9c5e79280619` matches the phone response and canonical build. Source suite457game+34outer tests passed.

| Run | Combat FPS | P95 ms | Max ms | Frames >50ms | Summon gameplay max ms | Summon render max ms |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Visual/native profile (diagnostic) |43.18|33|165|3|14|14|
| Clean1 |44.12|32|75|2|12|8|
| Clean2 |42.66|33|54|1|13|11|

The first run includes screenshot, Timeline and system-wide native Instruments counters; its FPS is not an uninstrumented acceptance result. Clean runs contain none of that profiling. Natural combat paths/wave counts differ, so no mean-FPS improvement is claimed against the single1.6.38 battle48.33FPS. This publishes a specific first-use stall reduction only. The60FPS/full-world gate is NOT passed.

Exact localStorage/IndexedDB saved game/benchmark restoration, public1.6.38 menu and closed connections verified after testing. Raw phone data/backups remain private in the fixed generated folder.

Diagnostic profile: device-wide GPU utilization about60–66% after the first partial sample, not app-specific GPU time; WebKit Composite wall-time mean10.14ms, not a direct GPU elapsed query. DOM layout/paint entries were small. One actual native draw inventory measured approximately754k triangles, including182k HEARTH and41k mage. These observations guide the next rendering change; they do not establish a single remaining root cause.
