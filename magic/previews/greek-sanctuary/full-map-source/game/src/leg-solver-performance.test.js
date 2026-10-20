import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createLegSolver} from './locomotion.js';

// Frozen reference from .source/frame-stability-20261018/source/game/src/locomotion.js.
// Entire source SHA-256: d234942b966a45fe0ebb5dfc610dbad44420ad7d33a9584f8e82c630dfcd78a2.
const clamp = THREE.MathUtils.clamp;
function referenceLegSolver(upper, lower, foot) {
  if (!upper || !lower || !foot) throw new Error('Locomotion requires hip, knee and ankle bones.');
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), dir = new THREE.Vector3(), bend = new THREE.Vector3(), knee = new THREE.Vector3(), from = new THREE.Vector3(), to = new THREE.Vector3();
  const delta = new THREE.Quaternion(), world = new THREE.Quaternion(), parent = new THREE.Quaternion();
  function orient(bone, current, desired) {
    if (current.lengthSq() < 1e-10 || desired.lengthSq() < 1e-10) return;
    delta.setFromUnitVectors(current.normalize(), desired.normalize());
    bone.getWorldQuaternion(world).premultiply(delta);
    bone.parent.getWorldQuaternion(parent).invert(); bone.quaternion.copy(parent.multiply(world)).normalize();
    bone.updateWorldMatrix(true,false);
  }
  return { upper, lower, foot, solve(target, pole, footRotation) {
    upper.getWorldPosition(a); lower.getWorldPosition(b); foot.getWorldPosition(c);
    const l1 = a.distanceTo(b), l2 = b.distanceTo(c);
    dir.copy(target).sub(a); const wanted = dir.length(), d = clamp(wanted, Math.abs(l1 - l2) + .00001, l1 + l2 - .00001); dir.normalize();
    const along = (l1 * l1 - l2 * l2 + d * d) / (2 * d), height = Math.sqrt(Math.max(0, l1 * l1 - along * along));
    bend.copy(pole).addScaledVector(dir, -pole.dot(dir));
    if (bend.lengthSq() < .00001) bend.set(1, 0, 0).addScaledVector(dir, -dir.x);
    bend.normalize(); knee.copy(a).addScaledVector(dir, along).addScaledVector(bend, height);
    orient(upper, from.copy(b).sub(a), to.copy(knee).sub(a));
    lower.getWorldPosition(b); foot.getWorldPosition(c);
    orient(lower, from.copy(c).sub(b), to.copy(target).sub(b));
    if (footRotation) {
      foot.parent.getWorldQuaternion(parent).invert(); foot.quaternion.copy(parent.multiply(footRotation)).normalize(); foot.updateWorldMatrix(true,false);
    }
    foot.getWorldPosition(c);
    return c.distanceTo(target);
  } };
}

// Actual local GLB ancestor/joint definitions, retained here so the comparison
// does not depend on ignored build assets or load decoders in the test suite.
// sha256 identifies the original GLB, not just this extracted subset.
const fixtures = [
  {
    file: "redesign/mage-fingers-1-6-1-lods.glb",
    sha256: '8c434646174facb4729097469ac59bbaea39d625d31f2777b7a45e9b83ea46ff',
    nodes: [
      {"name":"wrist.l","parent":1,"translation":[-3.725290298461914e-9,0.18980251252651215,9.872019290924072e-8],"rotation":[-0.07638172060251236,-0.1844666302204132,0.14480459690093994,0.9691075682640076],"scale":[1,0.9999999403953552,1]},
      {"name":"lowerarm.l","parent":2,"translation":[-5.494803190231323e-8,0.2850000262260437,2.60770320892334e-8],"rotation":[0.01858062855899334,0.09349870681762695,-0.09278401732444763,0.991112470626831],"scale":[0.9999999403953552,0.9999999403953552,0.9999999403953552]},
      {"name":"upperarm.l","parent":6,"translation":[0.24500000476837158,0.09043194353580475,0.004697756841778755],"rotation":[-0.9109033346176147,-0.2995266318321228,-0.28242525458335876,0.027836937457323074],"scale":[0.9999995231628418,0.9999998211860657,1]},
      {"name":"wrist.r","parent":4,"translation":[3.725290298461914e-9,0.18980251252651215,9.872019290924072e-8],"rotation":[-0.07638172060251236,0.1844666302204132,-0.14480459690093994,0.9691075682640076],"scale":[1,0.9999999403953552,1]},
      {"name":"lowerarm.r","parent":5,"translation":[5.494803190231323e-8,0.2850000262260437,2.60770320892334e-8],"rotation":[0.01858062855899334,-0.09349870681762695,0.09278401732444763,0.991112470626831],"scale":[0.9999999403953552,0.9999999403953552,0.9999999403953552]},
      {"name":"upperarm.r","parent":6,"translation":[-0.24500000476837158,0.09043194353580475,0.004697756841778755],"rotation":[-0.9109033346176147,0.2995266318321228,0.28242525458335876,0.027836937457323074],"scale":[0.9999995231628418,0.9999998211860657,1]},
      {"name":"chest","parent":7,"translation":[0,0.1499999761581421,0],"rotation":[0.029373696073889732,0,0,0.9995684623718262]},
      {"name":"spine","parent":14,"translation":[0,0.12000000476837158,-0.07999999821186066]},
      {"name":"foot.l","parent":9,"translation":[1.6298145055770874e-8,0.4191647171974182,-3.725290298461914e-9],"rotation":[-0.5505435466766357,-0.1728290617465973,0.03982243314385414,0.8157488107681274],"scale":[1,0.9999999403953552,0.9999999403953552]},
      {"name":"lowerleg.l","parent":10,"translation":[1.0943040251731873e-8,0.352632999420166,9.313225746154785e-9],"rotation":[-0.01595756970345974,0.08662405610084534,-0.09707799553871155,0.9913715124130249]},
      {"name":"upperleg.l","parent":14,"translation":[0.125,-0.10000002384185791,-0.020000001415610313],"rotation":[-0.9975588917732239,-0.033809464424848557,-0.03380955383181572,0.050893981009721756],"scale":[1,0.9999998807907104,1]},
      {"name":"foot.r","parent":12,"translation":[-1.6298145055770874e-8,0.4191647171974182,-3.725290298461914e-9],"rotation":[-0.5505435466766357,0.1728290617465973,-0.03982243314385414,0.8157488107681274],"scale":[1,0.9999999403953552,0.9999999403953552]},
      {"name":"lowerleg.r","parent":13,"translation":[-1.0943040251731873e-8,0.352632999420166,9.313225746154785e-9],"rotation":[-0.01595756970345974,-0.08662405610084534,0.09707799553871155,0.9913715124130249]},
      {"name":"upperleg.r","parent":14,"translation":[-0.125,-0.10000002384185791,-0.020000001415610313],"rotation":[-0.9975588917732239,0.033809464424848557,0.03380955383181572,0.050893981009721756],"scale":[1,0.9999998807907104,1]},
      {"name":"hips","parent":15,"translation":[0,0.9800000190734863,0.07999999821186066]},
      {"name":"root","parent":16,"translation":[0,0,-0.03500000014901161]},
      {"name":"Mage fitted rig","parent":null},
    ],
  },
  {
    file: "redesign/guard-meshy-lods.glb",
    sha256: 'ab0aa7bbde752b95022f46f25d8213c85b0f09ec6baf16656b86bb6dcbb0f40a',
    nodes: [
      {"name":"wrist.l","parent":1,"translation":[2.8870999813079834e-8,0.09706713259220123,-9.313225746154785e-9],"rotation":[-0.4442463219165802,0.24247513711452484,-0.3014892339706421,0.8080564737319946],"scale":[0.9999999403953552,0.9999998211860657,1]},
      {"name":"lowerarm.l","parent":2,"translation":[4.330649971961975e-8,0.2674379348754883,2.421438694000244e-8],"rotation":[-0.13473857939243317,-0.05999546870589256,0.02514493279159069,0.9887435436248779]},
      {"name":"upperarm.l","parent":6,"translation":[0.2680000066757202,0.1605159342288971,0.00771930068731308],"rotation":[-0.9765350222587585,-0.1517266035079956,-0.14498646557331085,0.0483463853597641],"scale":[0.9999949336051941,0.9999992847442627,0.9999997615814209]},
      {"name":"wrist.r","parent":4,"translation":[-6.05359673500061e-8,0.23324470221996307,-2.60770320892334e-8],"rotation":[0.2968427240848541,-0.10072850435972214,0.029423119500279427,0.9491430521011353],"scale":[0.9999999403953552,0.9999999403953552,0.9999999403953552]},
      {"name":"lowerarm.r","parent":5,"translation":[-4.330649971961975e-8,0.2674379348754883,2.421438694000244e-8],"rotation":[-0.29036837816238403,0.11745494604110718,-0.04050479829311371,0.9488149881362915],"scale":[0.9999999403953552,1,1.0000001192092896]},
      {"name":"upperarm.r","parent":6,"translation":[-0.2680000066757202,0.1605159342288971,0.00771930068731308],"rotation":[-0.9765350222587585,0.1517266035079956,0.14498646557331085,0.0483463853597641],"scale":[0.9999949336051941,0.9999992847442627,0.9999997615814209]},
      {"name":"chest","parent":7,"translation":[0,0.2200000286102295,0],"rotation":[0.022709695622324944,0,0,0.9997420907020569]},
      {"name":"spine","parent":14,"translation":[0,0.15008334815502167,1.862645149230957e-9],"rotation":[0.016659725457429886,0,0,0.9998612403869629]},
      {"name":"foot.l","parent":9,"translation":[3.259629011154175e-8,0.43087464570999146,0],"rotation":[-0.49999919533729553,-0.12984703481197357,0.03533792495727539,0.8555067777633667],"scale":[1,1.0000001192092896,1]},
      {"name":"lowerleg.l","parent":10,"translation":[1.7695128917694092e-8,0.4057386815547943,1.862645149230957e-9],"rotation":[0.0020659728907048702,0.01154314074665308,-0.011357446201145649,0.999866783618927],"scale":[0.9999999403953552,0.9999998211860657,0.9999998807907104]},
      {"name":"upperleg.l","parent":14,"translation":[0.13500000536441803,-0.0028317836113274097,-0.06513049453496933],"rotation":[-0.9926722645759583,-0.08239029347896576,-0.08518273383378983,0.023612957447767258],"scale":[1.0000056028366089,1.0000001192092896,1.000000238418579]},
      {"name":"foot.r","parent":12,"translation":[3.306195139884949e-8,0.4282732307910919,6.05359673500061e-9],"rotation":[-0.49889180064201355,0.10673902928829193,-0.02904914692044258,0.8595754504203796],"scale":[1,1,1.0000001192092896]},
      {"name":"lowerleg.r","parent":13,"translation":[-9.778887033462524e-9,0.4033656716346741,-5.587935447692871e-9],"rotation":[0.001984300324693322,-0.013904452323913574,0.01376331690698862,0.9998066425323486],"scale":[0.9999999403953552,0.9999998807907104,0.9999999403953552]},
      {"name":"upperleg.r","parent":14,"translation":[-0.13500000536441803,-0.0028317836113274097,-0.06513049453496933],"rotation":[-0.9956200122833252,0.06337513774633408,0.06552380323410034,0.020761754363775253],"scale":[1.0000100135803223,1.000000238418579,1.0000005960464478]},
      {"name":"hips","parent":15,"translation":[0,0.9700000286102295,0.029999999329447746],"rotation":[-0.016659725457429886,0,0,0.9998612403869629]},
      {"name":"root","parent":16},
      {"name":"guard fitted rig","parent":null},
    ],
  },
  {
    file: "redesign/heavy-meshy-native-lods.glb",
    sha256: 'ef132a7274c238a5c5ba986ac50b5ad0a77019176a78b8d0080b632863c0ea36',
    nodes: [
      {"name":"wrist.l","parent":1,"translation":[-2.514570951461792e-8,0.26254332065582275,-7.450580596923828e-8],"rotation":[0.2316817343235016,0.17605257034301758,-0.06412076950073242,0.9545772075653076],"scale":[0.9999999403953552,0.9999999403953552,0.9999998807907104]},
      {"name":"lowerarm.l","parent":2,"translation":[-4.190951585769653e-8,0.27154362201690674,1.862645149230957e-9],"rotation":[-0.4381240904331207,-0.3895082175731659,0.1335907280445099,0.7990520596504211],"scale":[0.9999998807907104,0.9999998807907104,0.9999998211860657]},
      {"name":"upperarm.l","parent":6,"translation":[0.27300000190734863,0.1394706815481186,-0.013149496167898178],"rotation":[0.9364010691642761,0.24075956642627716,0.21139560639858246,0.14317774772644043],"scale":[1,0.9999998807907104,0.9999998807907104]},
      {"name":"wrist.r","parent":4,"translation":[0,0.2502877414226532,-7.450580596923828e-8],"rotation":[-0.025717679411172867,-0.3656599819660187,0.17926165461540222,0.912960410118103]},
      {"name":"lowerarm.r","parent":5,"translation":[2.1420419216156006e-8,0.3442903161048889,5.587935447692871e-9],"rotation":[-0.20916756987571716,0.44835609197616577,-0.3150252401828766,0.8099289536476135],"scale":[0.9999999403953552,1,1]},
      {"name":"upperarm.r","parent":6,"translation":[-0.27300000190734863,0.1394706815481186,-0.013149496167898178],"rotation":[0.9600905776023865,-0.18328216671943665,-0.16092820465564728,0.1368788629770279],"scale":[1.0000001192092896,1,1.0000001192092896]},
      {"name":"chest","parent":7,"translation":[0,0.19059108197689056,7.450580596923828e-9],"rotation":[0.025456521660089493,0,0,0.9996759295463562]},
      {"name":"spine","parent":14,"translation":[0,0.1300000548362732,0],"rotation":[0.039381805807352066,0,0,0.9992242455482483],"scale":[1,0.9999999403953552,1]},
      {"name":"foot.l","parent":9,"translation":[-2.60770320892334e-8,0.39538341760635376,6.51925802230835e-9],"rotation":[-0.5347199440002441,-0.1679110825061798,0.03101508878171444,0.8275980949401855],"scale":[0.9999999403953552,0.9999999403953552,1]},
      {"name":"lowerleg.l","parent":10,"translation":[1.862645149230957e-8,0.4502732455730438,-3.725290298461914e-9],"rotation":[-0.006209244020283222,0.023835645988583565,-0.026328809559345245,0.99934983253479],"scale":[1,0.9999998807907104,0.9999999403953552]},
      {"name":"upperleg.l","parent":14,"translation":[0.21899999678134918,0,-0.009000003337860107],"rotation":[-0.988801896572113,-0.10422588884830475,-0.10422585904598236,0.023339271545410156],"scale":[0.9999960064888,0.9999997615814209,0.9999999403953552]},
      {"name":"foot.r","parent":12,"translation":[2.60770320892334e-8,0.39538341760635376,6.51925802230835e-9],"rotation":[-0.5347199440002441,0.1679110825061798,-0.03101508878171444,0.8275980949401855],"scale":[0.9999999403953552,0.9999999403953552,1]},
      {"name":"lowerleg.r","parent":13,"translation":[-1.862645149230957e-8,0.4502732455730438,-3.725290298461914e-9],"rotation":[-0.006209244020283222,-0.023835645988583565,0.026328809559345245,0.99934983253479],"scale":[1,0.9999998807907104,0.9999999403953552]},
      {"name":"upperleg.r","parent":14,"translation":[-0.21899999678134918,0,-0.009000003337860107],"rotation":[-0.988801896572113,0.10422588884830475,0.10422585904598236,0.023339271545410156],"scale":[0.9999960064888,0.9999997615814209,0.9999999403953552]},
      {"name":"hips","parent":15,"translation":[0,0.9399999976158142,0.015000000596046448]},
      {"name":"root","parent":16,"translation":[0,0,-0.07000000029802322]},
      {"name":"Heavy fitted rig","parent":null},
    ],
  },
  {
    file: "archer.glb",
    sha256: '7a6702242d833c84f307005689d290553cb613508bea456c1e8b3087345a59f3',
    nodes: [
      {"name":"wrist.l","parent":1,"translation":[8.719291955117114e-9,0.26004382967948914,-1.5019517574099694e-10],"rotation":[-9.737839007373239e-11,-2.984370806036196e-10,0.02665809914469719,0.9996446967124939],"scale":[0.9999999403953552,0.9999999403953552,0.9999999403953552]},
      {"name":"lowerarm.l","parent":2,"translation":[-3.219664979070558e-9,0.24189729988574982,-1.1940561250867177e-7],"rotation":[1.6480538045371418e-9,-5.950362336193393e-8,-0.05528552085161209,0.9984706044197083],"scale":[1.000000238418579,0.9999998807907104,0.9999999403953552]},
      {"name":"upperarm.l","parent":6,"translation":[0.21200737357139587,0.13413214683532715,8.40246201505579e-8],"rotation":[-0.5141214728355408,-0.485467791557312,-0.4854677617549896,0.5141218900680542],"scale":[0.9999993443489075,0.9999993443489075,0.9999997615814209]},
      {"name":"wrist.r","parent":4,"translation":[-8.718383348593761e-9,0.26004382967948914,-1.5019517574099694e-10],"rotation":[-9.737839007373239e-11,2.984370806036196e-10,-0.02665809914469719,0.9996446967124939],"scale":[0.9999999403953552,0.9999999403953552,0.9999999403953552]},
      {"name":"lowerarm.r","parent":5,"translation":[-7.121856576697283e-11,0.2418973296880722,-1.1940561250867177e-7],"rotation":[1.6480535824925369e-9,5.950363046736129e-8,0.05528552085161209,0.9984706044197083],"scale":[1.000000238418579,0.9999998807907104,0.9999999403953552]},
      {"name":"upperarm.r","parent":6,"translation":[-0.21200737357139587,0.13413214683532715,8.40246201505579e-8],"rotation":[-0.514121413230896,0.48546773195266724,0.4854677617549896,0.514121949672699],"scale":[0.9999993443489075,0.9999993443489075,0.9999997615814209]},
      {"name":"chest","parent":7,"translation":[0,0.37498795986175537,0],"scale":[1,0.9999999403953552,1]},
      {"name":"spine","parent":14,"translation":[0,0.19197750091552734,0],"rotation":[0,7.105427357601002e-15,0,1]},
      {"name":"foot.l","parent":9,"translation":[1.8334092577454442e-10,0.14943702518939972,9.660811040035355e-10],"rotation":[-0.45523902773857117,1.6197017060903818e-8,-3.4356666844814754e-8,0.8903692960739136],"scale":[1,1.0000008344650269,0.9999987483024597]},
      {"name":"lowerleg.l","parent":10,"translation":[3.57975737941274e-9,0.22707749903202057,-6.140325137238278e-9],"rotation":[0.1062251403927803,6.865288071367104e-8,-7.377018818033321e-8,0.9943422079086304],"scale":[1,1.0000004768371582,1.0000001192092896]},
      {"name":"upperleg.l","parent":14,"translation":[0.17094506323337555,0.11358726024627686,1.392327231286572e-8],"rotation":[0.9998490810394287,-7.132765489359372e-8,-1.2042731256656225e-8,0.017373191192746162],"scale":[1,0.9999998211860657,1.0000011920928955]},
      {"name":"foot.r","parent":12,"translation":[-1.8333903839540255e-10,0.14943702518939972,9.660858779625414e-10],"rotation":[-0.45523902773857117,1.6598252727817453e-7,2.250776010015443e-9,0.8903692960739136],"scale":[1,1.0000008344650269,0.9999987483024597]},
      {"name":"lowerleg.r","parent":13,"translation":[-3.57975737941274e-9,0.22707749903202057,-6.140325137238278e-9],"rotation":[0.1062251403927803,-6.865289492452575e-8,7.377018818033321e-8,0.9943422079086304],"scale":[1,1.0000004768371582,1.0000001192092896]},
      {"name":"upperleg.r","parent":14,"translation":[-0.17094506323337555,0.11358726024627686,1.392327231286572e-8],"rotation":[0.9998490810394287,7.426573489510702e-8,-3.172628026959501e-8,0.017373191192746162],"scale":[1,0.9999998211860657,1.0000011920928955]},
      {"name":"hips","parent":15,"translation":[0,0.4056634306907654,0],"rotation":[0,-1.1920927533992653e-7,0,1]},
      {"name":"root","parent":16,"rotation":[0,1.1920927533992653e-7,0,1]},
      {"name":"Rig","parent":null},
    ],
  },
];

function fixture(definition) {
  const scene = new THREE.Scene(), actor = new THREE.Group(), nodes = definition.nodes.map(n => {
    const bone = new THREE.Bone();
    bone.name = n.name;
    if (n.matrix) new THREE.Matrix4().fromArray(n.matrix).decompose(bone.position, bone.quaternion, bone.scale);
    else {
      if (n.translation) bone.position.fromArray(n.translation);
      if (n.rotation) bone.quaternion.fromArray(n.rotation);
      if (n.scale) bone.scale.fromArray(n.scale);
    }
    return bone;
  });
  scene.name = 'scene'; actor.name = 'actor'; scene.add(actor);
  definition.nodes.forEach((n,i) => (n.parent === null ? actor : nodes[n.parent]).add(nodes[i]));
  scene.updateMatrixWorld(true);
  return scene;
}
const chains = ['l','r'].flatMap(side => [
  ['upperleg','lowerleg','foot'].map(name => name+'.'+side),
  ['upperarm','lowerarm','wrist'].map(name => name+'.'+side),
]);
function paired(definition) {
  const reference = fixture(definition), candidate = reference.clone(true);
  return {reference, candidate, solvers: chains.map(names => ({
    reference: referenceLegSolver(...names.map(name => reference.getObjectByName(name))),
    candidate: createLegSolver(...names.map(name => candidate.getObjectByName(name))),
  }))};
}
function assertExact(reference, candidate) {
  const expected = [], actual = [];
  for (const [root, result] of [[reference,expected],[candidate,actual]]) root.traverse(node => result.push({
    name:node.name, position:node.position.toArray(), quaternion:node.quaternion.toArray(),
    scale:node.scale.toArray(), matrix:node.matrix.toArray(), matrixWorld:node.matrixWorld.toArray(),
    matrixWorldNeedsUpdate:node.matrixWorldNeedsUpdate,
  }));
  assert.deepEqual(actual,expected);
}
function nodeVisits(solve) {
  const original = THREE.Object3D.prototype.updateWorldMatrix;
  let visits = 0;
  THREE.Object3D.prototype.updateWorldMatrix = function(...args) { visits++; return original.apply(this,args); };
  try { return {error:solve(), visits}; }
  finally { THREE.Object3D.prototype.updateWorldMatrix = original; }
}
function randomSource(seed) {
  return () => { seed = (Math.imul(seed,1664525)+1013904223)|0; return (seed>>>0)/4294967296; };
}

for (const definition of fixtures) test('exact reference poses for actual '+definition.file+' joint chains', () => {
  const pair = paired(definition), random = randomSource(42097);
  const target = new THREE.Vector3(), pole = new THREE.Vector3(), orientation = new THREE.Quaternion();
  const q = new THREE.Quaternion(), rest = new Map();
  pair.reference.traverse(node => rest.set(node.name,{position:node.position.clone(),quaternion:node.quaternion.clone()}));
  for (let frame=0; frame<80; frame++) {
    const position = [random()*4-2, random()*.2, random()*4-2], yaw = random()*6-3;
    // Change ancestors after previous matrices were produced. The fast path
    // must never reuse an earlier frame/other actor's transform.
    for (const root of [pair.reference,pair.candidate]) {
      root.position.set(frame*.003,0,-frame*.002);
      const actor = root.getObjectByName('actor');
      actor.position.fromArray(position); actor.rotation.set(.03*Math.sin(frame),yaw,.02*Math.cos(frame));
      actor.scale.set(.8+(frame%7)*.05,.8+(frame%5)*.07,.8+(frame%3)*.09);
    }
    pair.reference.traverse(node => {
      if (node.name==='scene'||node.name==='actor') return;
      const counterpart = pair.candidate.getObjectByName(node.name), original = rest.get(node.name);
      q.setFromEuler(new THREE.Euler((random()-.5)*.3,(random()-.5)*.3,(random()-.5)*.3));
      node.quaternion.copy(original.quaternion).multiply(q); counterpart.quaternion.copy(node.quaternion);
      node.position.copy(original.position); node.position.y += (random()-.5)*.002; counterpart.position.copy(node.position);
    });
    for (let i=0; i<pair.solvers.length; i++) {
      const solvers = pair.solvers[i];
      solvers.reference.foot.getWorldPosition(target);
      target.add(new THREE.Vector3((random()-.5)*.16,random()*.12,(random()-.5)*.16));
      pole.set(random()-.5,random()-.5,1);
      orientation.setFromEuler(new THREE.Euler(random()*.3,random()*2,random()*.2));
      const footRotation = (frame+i)%3 ? orientation : undefined;
      const expected = solvers.reference.solve(target,pole,footRotation);
      const actual = solvers.candidate.solve(target,pole,footRotation);
      assert.equal(actual,expected, 'target residual must be bit-exact');
      assertExact(pair.reference,pair.candidate);
    }
    // The renderer and picking still own their normal full traversal. All
    // descendants must remain exact once that unchanged path runs as well.
    pair.reference.updateMatrixWorld(true); pair.candidate.updateMatrixWorld(true);
    assertExact(pair.reference,pair.candidate);
  }
});

test('direct chain avoids repeated ancestor visits without caching across solves', t => {
  const pair = paired(fixtures[0]), target = new THREE.Vector3(.1,.2,.3), pole = new THREE.Vector3(0,0,1), rotation = new THREE.Quaternion();
  let referenceVisits=0, candidateVisits=0;
  for (let frame=0; frame<30; frame++) {
    for (const root of [pair.reference,pair.candidate]) root.position.set(frame*.05,frame*.01,-frame*.02);
    const expected=nodeVisits(() => pair.solvers[0].reference.solve(target,pole,rotation));
    const actual=nodeVisits(() => pair.solvers[0].candidate.solve(target,pole,rotation));
    assert.equal(actual.error,expected.error); assertExact(pair.reference,pair.candidate);
    referenceVisits+=expected.visits; candidateVisits+=actual.visits;
  }
  assert.ok(referenceVisits>2000, 'reference must exercise the real deep ancestor chain');
  assert.ok(candidateVisits<referenceVisits*.25, 'direct chain must remove at least 75% of world-matrix node visits');
  t.diagnostic('world-matrix node visits: reference '+referenceVisits+', direct '+candidateVisits);
});

test('reparented/intermediate joints retain the original fallback and can become direct again', () => {
  const pair=paired(fixtures[1]), names=chains[0], target=new THREE.Vector3(.2,.1,.15), pole=new THREE.Vector3(0,0,1), rotation=new THREE.Quaternion();
  // Solvers already exist: eligibility must follow the live hierarchy.
  for (const root of [pair.reference,pair.candidate]) {
    const bridge=new THREE.Bone(); bridge.name='intermediate'; bridge.rotation.set(.07,.03,-.02);
    root.getObjectByName(names[0]).add(bridge); bridge.add(root.getObjectByName(names[1]));
  }
  for (let frame=0; frame<12; frame++) {
    for (const root of [pair.reference,pair.candidate]) { root.position.x=frame*.03; root.getObjectByName('intermediate').rotation.z=frame*.01; }
    const expected=nodeVisits(() => pair.solvers[0].reference.solve(target,pole,rotation));
    const actual=nodeVisits(() => pair.solvers[0].candidate.solve(target,pole,rotation));
    assert.equal(actual.error,expected.error); assert.equal(actual.visits,expected.visits);
    assertExact(pair.reference,pair.candidate);
  }
  for (const root of [pair.reference,pair.candidate]) {
    root.getObjectByName(names[0]).add(root.getObjectByName(names[1]));
    root.getObjectByName('intermediate').removeFromParent();
  }
  const expected=nodeVisits(() => pair.solvers[0].reference.solve(target,pole));
  const actual=nodeVisits(() => pair.solvers[0].candidate.solve(target,pole));
  assert.equal(actual.error,expected.error); assert.ok(actual.visits<expected.visits*.25);
  assertExact(pair.reference,pair.candidate);
});
