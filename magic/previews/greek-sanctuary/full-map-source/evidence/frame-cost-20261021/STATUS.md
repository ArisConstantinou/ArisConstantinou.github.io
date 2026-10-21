# MAGIC 1.6.25

Cached static shadow casters now skip redundant geometry preparation before Three's shadow pass. Animated casters and descendants retain their normal path, and flags restore on failure. Fire and item-shadow buffers upload only their active prefixes. No textures, geometry, lighting, shadow resolution, render resolution or gameplay settings were reduced.

The user selected the PC as the current performance target. RTX 5080, desktop Chrome, 2560x1440 High, uncapped: candidate idle 264-297 FPS; movement 260-268; five-enemy fire combat 194-221, averaging about 204 FPS. The accepted baseline already exceeded 200 FPS in idle and movement; the patch is not credited with all of that throughput. This does not guarantee a 200 FPS floor, physical display cadence or phone performance.

439 tests pass. Eight desktop frozen scenarios pass 72 exact repeated image comparisons. Original packed shadow maps and candidate maps are identical in 14 independent cases. Earlier mobile original/original colour readbacks varied and remain a failed strict mobile pixel gate, not a mobile performance claim. Native keyboard and touch gameplay, WebGL recovery, saved-profile preservation and offline 1.6.24-to-1.6.25 upgrade pass. The deliberate offline release check retains its expected network-only worker fetch error.

The two broader transform/prop-pruning probes were rejected and are absent. See VERIFICATION.json for measured scope and limitations.
