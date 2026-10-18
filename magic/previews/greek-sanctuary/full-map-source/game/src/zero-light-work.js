// Three r180 keeps point-light slots stable when an effect's intensity is zero.
// Its stock loop still evaluates attenuation and the full BRDF for those slots.
// Keep every light and shader variant; skip only a provably zero contribution.
export function guardZeroContributionLights(chunks) {
  const tag = '// MAGIC: uniform zero point-light contribution';
  const source = chunks.lights_fragment_begin;
  if (source.includes(tag)) return false;
  const first = source.indexOf('getPointLightInfo( pointLight, geometryPosition, directLight );');
  const end = source.indexOf('#if ( NUM_SPOT_LIGHTS', first);
  const call = 'RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );';
  const at = source.indexOf(call, first);
  if (first < 0 || end < 0 || at < first || at >= end) {
    throw new Error('Unsupported Three point-light shader; check the pinned chunk before building.');
  }
  // Uniform across a draw, avoiding divergent branches at light-volume edges.
  // Leave every active-light calculation byte-for-byte identical to Three.
  chunks.lights_fragment_begin = source.slice(0, first) + tag + '\n\t\tif ( pointLight.color != vec3( 0.0 ) ) {\n\t\t' + source.slice(first,at + call.length) + '\n\t\t}' + source.slice(at + call.length);
  return true;
}
