// Downloaded GLTF props have nested scene/group nodes. The ritual transfers
// an actual mesh, while retaining its parent and local transform for cancel.
export function assemblyMesh(root){let mesh;root.traverse(o=>{if(!mesh&&o.isMesh&&o.geometry)mesh=o;});if(!mesh)throw Error('Ritual stone has no drawable mesh');return mesh;}
