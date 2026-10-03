# LibreDWG Web 0.7.14

License: GPL-3.0. The complete license is in COPYING.

This unmodified browser decoder comes from @mlightcad/libredwg-web 0.7.14:
https://registry.npmjs.org/@mlightcad/libredwg-web/-/libredwg-web-0.7.14.tgz

Complete corresponding C/C++, JavaScript/TypeScript sources, build scripts and
configuration for this release are available without charge at:
https://github.com/mlightcad/libredwg-web/tree/v0.7.14
https://github.com/mlightcad/libredwg-web/archive/refs/tags/v0.7.14.tar.gz

The tag resolves to commit 1dd682f (release 0.7.14). Build instructions are in
bindings/javascript/README.md and bindings/javascript/package.json in that source.
The compiler-generated wasm JavaScript and WebAssembly binaries have not been modified.

Our separate adapter source is /plan/dwg-worker.mjs (GPL-3.0-or-later).
It exchanges a neutral drawing through worker messages. Files are decoded on the
user's device and are never uploaded. The worker is terminated after conversion
to release its WebAssembly memory. Decoder availability does not guarantee every
CAD custom object can be converted; conversion warnings are displayed for review.
