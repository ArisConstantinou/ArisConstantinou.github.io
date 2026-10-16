import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RecoverableDracoLoader as DRACOLoader } from './recoverable-draco-loader.js';

/** Locally bundled decoder; the caller closes it after every load settles. */
export function createLocalRigLoader() {
  const decoder = new DRACOLoader()
    .setDecoderPath(new URL('models/draco/', document.baseURI).href)
    .setWorkerLimit(1);
  return { loader: new GLTFLoader().setDRACOLoader(decoder), disposeDecoder: () => decoder.dispose() };
}
