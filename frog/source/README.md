# FROG 4.3.15 — complete source

This is the complete functional source corresponding to the bundled production
release, not an unapplied patch. All runtime source modules, procedural models,
public assets, tests and the dependency lockfile are included.

## Build

Use Node.js 22. Dependencies are pinned in `package-lock.json`.

```sh
npm ci
node --test --test-concurrency=2 tests/*.test.mjs
npm run build
npm run dev
```

The first command downloads development dependencies; the already-built game
in `../frog/` and `../PLAY-OFFLINE.html` needs neither Node nor npm installation.

Build output is `dist/` with relative asset URLs. Copy its contents to the
hosting folder, not the source tree. No GitHub automation is required.

## Changes in 4.3.15

`arcade-control-policy.js` owns screen-relative overview movement and yaw-relative
third-person movement, deliberate body facing, and the directional hop helpers.
`arcade.js` uses one native pointer input stream and one centered aiming ray in
third person. `creatures.js` poses limbs along actual local travel rather than
playing the same forward hop for every movement direction.

Third-person and overview are the current arcade views. Existing timing,
collision geometry, guards, catapults and optional target lock are retained.

## Provenance and verification

Base runtime: `42b90b5c3b96a2079bc152d37da757acdfa9f024` (4.3.14).
Controls and final input refinement: QA branch commit
`330ce1a855a1ef7fb9dc1e8f59ca38e2faea09dc`.
The production bundle is byte-identical to the tested
`index-BVE6SbSc.js` with SHA-256
`8fad5991101c11b6275fd9c7a1d633c0f734f63952054c67c8eb86be80488180`.

The full test suite was rerun for this package: 1251 passed, none failed/skipped.
See `../verification/` for build logs, exact reports and test limitations.
Files in `qa/` from earlier versions remain historical regression fixtures;
their hard-coded version checks are not claims about the current package.
`tests/arcade-control-policy.test.mjs` contains the additional movement tests.
No failed GitHub publication workflow is included in this distribution.

See `THIRD_PARTY_NOTICES.txt`. No new license is assigned to the user's original
project code or artwork by this package.
