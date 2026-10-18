import test from 'node:test';import assert from 'node:assert/strict';
import {ShaderChunk,REVISION} from 'three';
import {guardZeroContributionLights} from './zero-light-work.js';

test('pinned point-light loop skips only zero BRDF contributions and leaves all light slots intact',()=>{
 assert.equal(REVISION,'180');
 const original=ShaderChunk.lights_fragment_begin,chunks={lights_fragment_begin:original};
 assert(guardZeroContributionLights(chunks));
 const changed=chunks.lights_fragment_begin;
 const point=changed.slice(changed.indexOf('PointLight pointLight;'),changed.indexOf('#if ( NUM_SPOT_LIGHTS'));
 assert.match(point,/if \( pointLight\.color != vec3\( 0\.0 \) \) \{\s*getPointLightInfo[\s\S]+RE_Direct/);
 assert.match(point,/i < NUM_POINT_LIGHTS/);
 assert.equal(changed.replace('// MAGIC: uniform zero point-light contribution\n\t\tif ( pointLight.color != vec3( 0.0 ) ) {\n\t\t','').replace('material, reflectedLight );\n\t\t}','material, reflectedLight );'),original);
 assert.equal(changed.slice(changed.indexOf('#if ( NUM_SPOT_LIGHTS')),original.slice(original.indexOf('#if ( NUM_SPOT_LIGHTS')));
 assert.equal(guardZeroContributionLights(chunks),false);assert.equal(chunks.lights_fragment_begin,changed);
});

test('unsupported engine changes fail before modifying the chunk',()=>{
 for(const source of ['void main() {}',ShaderChunk.lights_fragment_begin.replace('getPointLightInfo( pointLight, geometryPosition, directLight );','changed();')]){
  const chunks={lights_fragment_begin:source};assert.throws(()=>guardZeroContributionLights(chunks),/Unsupported Three/);assert.equal(chunks.lights_fragment_begin,source);
 }
});
