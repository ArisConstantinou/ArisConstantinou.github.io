"""Smooth only the fused forelimb/hindlimb skin seam; retain hands and toe pads."""
import numpy as np
def smooth_contact_seam(body,rig,asset):
 side='-1'if asset=='heavy'else'1';groups=list(body.vertex_groups);names=[g.name for g in groups];coords=np.array([v.co[:]for v in body.data.vertices]);edges=np.array([e.vertices[:]for e in body.data.edges]);weights=np.zeros((len(coords),len(names)))
 for v in body.data.vertices:
  for g in v.groups:weights[v.index,g.group]=g.weight
 def owned(prefixes):return weights[:,[i for i,n in enumerate(names)if n.startswith(prefixes)]].sum(axis=1)
 leg=owned(('hip'+side,'knee'+side,'ankle'+side,'foot'+side,'toe'+side+'_'));arm=owned(('shoulder'+side,'elbow'+side,'wrist'+side,'finger'+side+'_'));pads=owned(('ankle'+side,'foot'+side,'toe'+side+'_'));hands=owned(('wrist'+side,'finger'+side+'_'))
 ankle=np.array(rig.data.bones['ankle'+side].head_local);foot=np.array(rig.data.bones['foot'+side].head_local);distance=np.minimum(np.linalg.norm(coords-ankle,axis=1),np.linalg.norm(coords-foot,axis=1));cross=((leg[edges[:,0]]>.5)&(arm[edges[:,1]]>.5))|((arm[edges[:,0]]>.5)&(leg[edges[:,1]]>.5));cross&=(distance[edges[:,0]]<.19)&(distance[edges[:,1]]<.19)
 region=np.zeros(len(coords),dtype=bool);region[edges[cross].ravel()]=True
 for _ in range(7):
  touching=region[edges[:,0]]|region[edges[:,1]];region[edges[touching].ravel()]=True
 active=region&(distance<.29)&(pads<.97)&(hands<.97)&((coords[:,0]<-.3)if side=='-1'else(coords[:,0]>.2))
 lengths=np.linalg.norm(coords[edges[:,0]]-coords[edges[:,1]],axis=1);source=np.concatenate([edges[:,0],edges[:,1]]);neighbor=np.concatenate([edges[:,1],edges[:,0]]);conductance=np.tile(1/np.maximum(lengths,.003),2);total=np.bincount(source,weights=conductance,minlength=len(coords));columns=np.where(weights[region].sum(axis=0)>1e-8)[0]
 for _ in range(150):
  for k in columns:
   avg=np.bincount(source,weights=weights[neighbor,k]*conductance,minlength=len(coords))/total;weights[active,k]=.5*weights[active,k]+.5*avg[active]
 weights[active]/=weights[active].sum(axis=1,keepdims=True)
 for index in np.where(active)[0]:
  index=int(index)
  for group in groups:group.remove([index])
  for k in columns:
   if weights[index,k]>1e-8:groups[int(k)].add([index],float(weights[index,k]),'REPLACE')
 return {'asset':asset,'side':side,'seam_edges':int(cross.sum()),'vertices':int(active.sum()),'toe_pads_and_palms_preserved':True,'bind_geometry_unchanged':True}
