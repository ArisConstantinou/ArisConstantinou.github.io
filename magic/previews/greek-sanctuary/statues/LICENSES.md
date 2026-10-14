# Greek statue replicas

- Erechtheion Caryatid, British Museum — Daniel Pett. [Source](https://sketchfab.com/3d-models/erechtheion-caryatid-british-museum-7181dd88d9424838882a4629d886177e), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Original user-supplied GLB retained byte-for-byte.
- Venus de Milo #StatuesTexturingChallenge — SMK, National Gallery of Denmark; optimized by Shaderbytes. [Source](https://sketchfab.com/3d-models/venus-de-milo-statuestexturingchallenge-smk-2983d92ac4e744f485492580ca7629f2), [CC0](https://creativecommons.org/publicdomain/zero/1.0/). Exact user-supplied GLB retained byte-for-byte.
- Zeus or Poseidon from the Artemision — SMK, National Gallery of Denmark. [Model](https://sketchfab.com/3d-models/zeus-or-poseidon-from-the-artemision-d4876aa609304682945145debedfc77e), [official museum record](https://api.smk.dk/api/v1/art?object_number=KAS2100), [CC0](https://creativecommons.org/publicdomain/zero/1.0/). Binary STL from the museum.

Project adaptations: metre-scale normalization; silhouette-preserving runtime decimation for Caryatid and Artemision; source UV/material preservation and 2K surface maps; Draco compression; closed irregular fracture cells with fresh stone interiors; collision proxies. Visible sculptures retain their documented missing parts. The Artemision sculpture is presented as a marble replica; the ancient original is bronze. These are museum-scan derivatives, not newly generated statues. See originals/*provenance.json for hashes.

Editable source: greek-statues.blend (Blender 5.1.2), prepare.py, compress.py. Blender Z-up, exported glTF Y-up. Static meshes; physical fracture animation occurs in the Three.js/Cannon-es runtime. No Unreal validation claimed.

Three.js 0.180.0 uses MIT licensing. Bundled Google Draco glTF decoder uses Apache License 2.0; see DRACO-LICENSE.txt.
