"""Menu-only smoothing of the narrow left hindlimb/body binding transition."""
import numpy as np

def smooth_left_leg_boundary(body):
    prefixes=('hip-1','knee-1','ankle-1','foot-1','toe-1_')
    names={g.index:g.name for g in body.vertex_groups}
    bones=[g.name for g in body.vertex_groups if g.name.startswith(prefixes)]
    columns={name:i for i,name in enumerate(bones)}
    coords=np.array([v.co[:] for v in body.data.vertices])
    edges=np.array([e.vertices[:] for e in body.data.edges])
    lengths=np.linalg.norm(coords[edges[:,0]]-coords[edges[:,1]],axis=1)
    weights=np.zeros((len(coords),len(bones)));original=[];arms=[];right=[]
    for vertex in body.data.vertices:
        values={names[g.group]:g.weight for g in vertex.groups};original.append(values)
        for name,value in values.items():
            if name in columns:weights[vertex.index,columns[name]]=value
        arms.append(sum(v for n,v in values.items() if n.startswith(('shoulder','elbow','wrist','finger'))))
        right.append(sum(v for n,v in values.items() if n.startswith(('hip1','knee1','ankle1','foot1','toe1_'))))
    owned=weights.sum(axis=1);region=owned>1e-6
    for _ in range(3):
        touching=region[edges[:,0]]|region[edges[:,1]];region[edges[touching].ravel()]=True
    # Keep fully bound limb surfaces, forelimbs, and the planted opposite leg fixed.
    active=region&(owned<.97)&(np.array(arms)<1e-7)&(np.array(right)<.5)
    source=np.concatenate([edges[:,0],edges[:,1]])
    neighbor=np.concatenate([edges[:,1],edges[:,0]])
    conductance=np.concatenate([1/np.maximum(lengths,.003)]*2)
    total=np.bincount(source,weights=conductance,minlength=len(coords))
    for _ in range(100):
        average=np.column_stack([np.bincount(source,weights=weights[neighbor,k]*conductance,minlength=len(coords))/total for k in range(len(bones))])
        weights[active]=.5*weights[active]+.5*average[active]
    for index in np.where(active)[0]:
        index=int(index);new=weights[index];new_total=float(new.sum());other=1-float(owned[index])
        assert other>0
        for group in body.vertex_groups:group.remove([index])
        for name,value in original[index].items():
            if name not in columns:body.vertex_groups[name].add([index],value*(1-new_total)/other,'REPLACE')
        for name,column in columns.items():
            if new[column]>1e-8:body.vertex_groups[name].add([index],float(new[column]),'REPLACE')
    return {'vertices':int(active.sum()),'iterations':100,'bind_geometry_unchanged':True,'forelimb_and_planted_leg_anchors_preserved':True}
