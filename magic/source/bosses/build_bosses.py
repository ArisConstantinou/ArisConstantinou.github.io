"""Editable, reproducible MAGIC boss geometry, skinning and authored clips.
Blender 5.1.2, metres/Z-up in source; GLB is Y-up/+Z forward. No external assets.
Run: blender --background --factory-startup --python source/bosses/build_bosses.py
"""
import bpy, math, json, pathlib, sys, numpy as np
from mathutils import Vector, Quaternion

BASE = pathlib.Path(__file__).resolve().parents[2]
OUT = BASE / '_source/public/models/bosses'
SRC = BASE / 'source/bosses'
OUT.mkdir(parents=True, exist_ok=True)
FPS = 30
X, Y, Z = Vector((1,0,0)), Vector((0,1,0)), Vector((0,0,1))
TEXTURES = {}

def surface_maps(kind):
    """Locally authored, tileable detail. Macro silhouettes stay in real geometry."""
    if kind in TEXTURES: return TEXTURES[kind]
    size=2048; yy,xx=np.mgrid[0:size,0:size].astype(np.float32)/size
    rng=np.random.default_rng(9471)
    def noise(cells):
        grid=rng.random((cells,cells),dtype=np.float32);ux=xx*cells;uy=yy*cells
        ix=ux.astype(np.int32);iy=uy.astype(np.int32);fx=ux-ix;fy=uy-iy
        fx=fx*fx*(3-2*fx);fy=fy*fy*(3-2*fy)
        return (grid[iy%cells,ix%cells]*(1-fx)+grid[iy%cells,(ix+1)%cells]*fx)*(1-fy)+(grid[(iy+1)%cells,ix%cells]*(1-fx)+grid[(iy+1)%cells,(ix+1)%cells]*fx)*fy-.5
    field=noise(12)*.075+noise(31)*.028;grain=noise(127)*.013+noise(251)*.005
    if kind=='stone':
        # Fracture lines interrupt the broad, chiselled mineral strata.
        h=.5+field*.15+grain*2
        tone=np.clip(.84+field*2+grain*3,.5,.98)
        rough=np.clip(.82+field,.7,.93)
    elif kind=='cloth':
        warp=np.sin(xx*2*math.pi*256)*np.sin(yy*2*math.pi*256)
        h=.5+warp*.017+field*.15
        tone=np.clip(.8+warp*.045+field,.62,.95);rough=np.full_like(xx,.94)
    else:
        pores=np.sin(2*math.pi*xx*61)*np.sin(2*math.pi*yy*73)
        vein=np.abs(np.sin(2*math.pi*(xx*13+yy*9+.045*np.sin(xx*2*math.pi*5))))
        h=.5+pores*.007-.016*np.exp(-vein*24)+field*.3
        tone=np.clip(.85+field*2+pores*.016-.05*np.exp(-vein*24),.63,.97)
        rough=np.clip(.69+field,.62,.79)
    directory=SRC/'textures';directory.mkdir(exist_ok=True)
    def write_image(suffix,values,res,noncolor=False):
        rgba=np.ones((res,res,4),np.float32);rgba[:,:,:3]=values
        im=bpy.data.images.new('MAGIC '+kind+' '+suffix,width=res,height=res,alpha=False)
        if noncolor:im.colorspace_settings.name='Non-Color'
        im.pixels.foreach_set(rgba.ravel());im.filepath_raw=str(directory/(kind+'-'+suffix+'.png'));im.file_format='PNG';im.save();im.pack()
        return im
    base=write_image('base-2048',np.repeat(tone[:,:,None],3,axis=2),size)
    low=h[::2,::2];dx=(np.roll(low,-1,axis=1)-np.roll(low,1,axis=1))*9;dy=(np.roll(low,-1,axis=0)-np.roll(low,1,axis=0))*9
    normal=np.stack((-dx,-dy,np.ones_like(dx)),axis=2);normal/=np.linalg.norm(normal,axis=2)[:,:,None]
    normal=write_image('normal-1024',normal*.5+.5,1024,True)
    rough=write_image('roughness-1024',np.repeat(rough[::2,::2,None],3,axis=2),1024,True)
    TEXTURES[kind]=(base,normal,rough);return TEXTURES[kind]

def material(name, color, metallic=0, emission=0):
    m = bpy.data.materials.new(name); m.diffuse_color = (*color,1); m.use_nodes=True
    p=m.node_tree.nodes.get('Principled BSDF'); p.inputs['Base Color'].default_value=(*color,1)
    p.inputs['Roughness'].default_value=.72; p.inputs['Metallic'].default_value=metallic
    p.inputs['Emission Color'].default_value=(*color,1); p.inputs['Emission Strength'].default_value=emission
    kind='stone' if 'stone' in name.lower() or 'slate' in name.lower() else 'cloth' if 'mantle' in name.lower() or 'cloak' in name.lower() else 'leather' if 'leather' in name.lower() else None
    if kind and not emission:
        base,normal,rough=surface_maps(kind);nodes=m.node_tree.nodes;links=m.node_tree.links
        tex=nodes.new('ShaderNodeTexImage');tex.image=base
        tint=nodes.new('ShaderNodeMix');tint.data_type='RGBA';tint.blend_type='MULTIPLY';tint.inputs[0].default_value=1;tint.inputs[7].default_value=(*color,1)
        links.new(tex.outputs['Color'],tint.inputs[6]);links.new(tint.outputs[2],p.inputs['Base Color'])
        texn=nodes.new('ShaderNodeTexImage');texn.image=normal;n=nodes.new('ShaderNodeNormalMap');n.inputs['Strength'].default_value=.65
        links.new(texn.outputs['Color'],n.inputs['Color']);links.new(n.outputs['Normal'],p.inputs['Normal'])
        texr=nodes.new('ShaderNodeTexImage');texr.image=rough;links.new(texr.outputs['Color'],p.inputs['Roughness'])
    m.use_backface_culling=kind not in ['cloth','leather']
    return m

def surface_topology(o):
    """Check the actual face winding; animation bounds cannot detect inside-out solids."""
    d=o.data;d.calc_loop_triangles()
    edges={}
    for poly in d.polygons:
        for a,b in zip(poly.vertices,(*poly.vertices[1:],poly.vertices[0])):
            count,direction=edges.get(tuple(sorted((a,b))),(0,0))
            edges[tuple(sorted((a,b)))]=(count+1,direction+(1 if a<b else -1))
    center=sum((v.co for v in d.vertices),Vector())/len(d.vertices)
    volume=0;degenerate=0
    for tri in d.loop_triangles:
        a,b,c=(d.vertices[i].co-center for i in tri.vertices)
        volume+=a.dot(b.cross(c))/6
        degenerate+=(b-a).cross(c-a).length_squared<1e-18
    return {'nonManifoldEdges':sum(count!=2 for count,direction in edges.values()),
            'inconsistentEdges':sum(direction!=0 for count,direction in edges.values()),
            'degenerateTriangles':degenerate,'signedVolume':volume}

def mesh(name, vertices, faces, mat, bone, weights=None, solid=False):
    d=bpy.data.meshes.new(name); d.from_pydata(vertices,[],faces); d.update()
    o=bpy.data.objects.new(name,d); bpy.context.collection.objects.link(o); o.data.materials.append(mat)
    # Stable world-sized UVs instead of hundreds of tiny packed islands.
    uv=d.uv_layers.new(name='Surface detail metres')
    for poly in d.polygons:
        axis=max(range(3),key=lambda i:abs(poly.normal[i]));axes=[i for i in range(3) if i!=axis]
        for loop in poly.loop_indices:
            p=d.vertices[d.loops[loop].vertex_index].co;uv.data[loop].uv=(p[axes[0]]*.8,p[axes[1]]*.8)
    if weights:
        for i, entries in enumerate(weights):
            for b,w in entries:
                g=o.vertex_groups.get(b) or o.vertex_groups.new(name=b); g.add([i],w,'REPLACE')
    else:
        o.vertex_groups.new(name=bone).add(list(range(len(vertices))),1,'REPLACE')
    mod=o.modifiers.new('Boss skeletal deformation','ARMATURE'); mod.object=rig
    o['solid_surface']=solid
    parts.append(o); return o

def loft(name, rings, mat, bone, n=8):
    vs=[]
    for z,rx,ry,cx,cy in rings:
        for i in range(n):
            a=2*math.pi*i/n+math.pi/8; vs.append((cx+rx*math.cos(a),cy+ry*math.sin(a),z))
    fs=[tuple(reversed(range(n)))]
    for k in range(len(rings)-1):
        for i in range(n): fs.append((k*n+i,k*n+(i+1)%n,(k+1)*n+(i+1)%n,(k+1)*n+i))
    fs.append(tuple((len(rings)-1)*n+i for i in range(n)))
    return mesh(name,vs,fs,mat,bone,solid=True)

def plate(name, center, size, mat, bone, bevel=.12, irregular=0):
    x,y,z=center; sx,sy,sz=size
    # Sculpted stone outlines have a taper, broken corners and asymmetric cuts.
    # Brass bearings and short mechanical brackets retain their manufactured outline.
    sculpted='stone' in mat.name.lower() or 'slate' in mat.name.lower()
    if sculpted:
        seed=sum(ord(c) for c in name)
        outline=[(-.34,-.5),(.27,-.47),(.48,-.28),(.46,.24),(.25,.5),(-.30,.46),(-.5,.18),(-.45,-.26)]
        outline=[(u*(1+.09*math.sin(seed+i*2.3)),v*(1+.09*math.cos(seed+i*1.7))) for i,(u,v) in enumerate(outline)]
        irregular=max(irregular,.07)
    else: outline=[(-.5+bevel,-.5),(.5-bevel,-.5),(.5,-.5+bevel),(.5,.5-bevel),(.5-bevel,.5),(-.5+bevel,.5),(-.5,.5-bevel),(-.5,-.5+bevel)]
    vs=[]
    for layer, factor in [(-.5,.83),(-.38,1),(.38,1),(.5,.83)]:
        for i,(u,v) in enumerate(outline):
            f=factor*(1+irregular*math.sin(i*2.8+layer))
            vs.append((x+u*sx*f,y+layer*sy,z+v*sz*f))
    fs=[tuple(reversed(range(8)))]
    for k in range(3):
        for i in range(8): fs.append((k*8+i,k*8+(i+1)%8,(k+1)*8+(i+1)%8,(k+1)*8+i))
    if sculpted:
        vs.append((x+.04*sx,y+.525*sy,z+.04*sz))
        fs.extend((24+i,24+(i+1)%8,32) for i in range(8))
    else: fs.append(tuple(range(24,32)))
    # The outline lies in XZ, whose positive winding points towards -Y.
    # Reverse the extrusion winding so front caps and bevels face outwards.
    fs=[tuple(reversed(face)) for face in fs]
    return mesh(name,vs,fs,mat,bone,solid=True)

def rod(name, a, b, radius, mat, bone, n=6, endradius=None):
    a,b=Vector(a),Vector(b); delta=b-a; rot=Z.rotation_difference(delta.normalized())
    vs=[]
    for p,r in [(a,radius),(b,endradius if endradius is not None else radius)]:
        for i in range(n): vs.append(tuple(p+rot@Vector((r*math.cos(i*2*math.pi/n),r*math.sin(i*2*math.pi/n),0))))
    fs=[tuple(reversed(range(n))),tuple(range(n,2*n))]
    for i in range(n): fs.append((i,(i+1)%n,(i+1)%n+n,i+n))
    return mesh(name,vs,fs,mat,bone,solid=True)

def gem(name, c, scale, mat, bone):
    x,y,z=c; sx,sy,sz=scale
    vs=[(x-sx,y,z),(x+sx,y,z),(x,y-sy,z),(x,y+sy,z),(x,y,z-sz),(x,y,z+sz)]
    fs=[(0,2,5),(2,1,5),(1,3,5),(3,0,5),(2,0,4),(1,2,4),(3,1,4),(0,3,4)]
    return mesh(name,vs,fs,mat,bone,solid=True)

def ring(name, center, radius, tube, mat, bone, orient='Z', stretch=1):
    vs=[]; n,m=24,6; center=Vector(center)
    rot={'Z':Quaternion(),'X':Quaternion(Y,math.pi/2),'Y':Quaternion(X,math.pi/2)}[orient]
    for i in range(n):
        a=i*2*math.pi/n
        for j in range(m):
            b=j*2*math.pi/m; p=Vector(((radius+tube*math.cos(b))*math.cos(a),(radius+tube*math.cos(b))*math.sin(a)*stretch,tube*math.sin(b)))
            vs.append(tuple(center+rot@p))
    fs=[]
    for i in range(n):
        for j in range(m): fs.append((i*m+j,((i+1)%n)*m+j,((i+1)%n)*m+(j+1)%m,i*m+(j+1)%m))
    o=mesh(name,vs,fs,mat,bone,solid=True)
    for p in o.data.polygons:p.use_smooth=True
    return o

def curved(name,points,radii,mat,bone,n=10):
    """Tapered anatomical or wrought parts, with an actual continuous surface."""
    vs=[];fs=[]
    for i,(point,r) in enumerate(zip(points,radii)):
        p=Vector(point);direction=Vector(points[min(len(points)-1,i+1)])-Vector(points[max(0,i-1)])
        rot=Z.rotation_difference(direction.normalized())
        for j in range(n):vs.append(tuple(p+rot@Vector((r*math.cos(j*2*math.pi/n),r*math.sin(j*2*math.pi/n),0))))
    fs=[tuple(reversed(range(n))),tuple((len(points)-1)*n+j for j in range(n))]
    for i in range(len(points)-1):
        for j in range(n):fs.append((i*n+j,i*n+(j+1)%n,(i+1)*n+(j+1)%n,(i+1)*n+j))
    return mesh(name,vs,fs,mat,bone,solid=True)

def engraving(name,points,width,mat,bone,surface=None):
    # Shallow incisions and inlaid runes are mesh strips, visible in exported GLB.
    if surface:
        dense=[]
        for a,b in zip(points,points[1:]):
            a,b=Vector(a),Vector(b);steps=max(1,math.ceil((b-a).length/.02))
            dense.extend(tuple(a.lerp(b,i/steps)) for i in range(steps))
        points=[*dense,points[-1]]
    vs=[];fs=[]
    for i,p in enumerate(points):
        prev=Vector(points[max(0,i-1)]);nxt=Vector(points[min(len(points)-1,i+1)]);delta=nxt-prev
        side=Vector((-delta.z,0,delta.x)).normalized()*width
        vs.extend([tuple(Vector(p)-side),tuple(Vector(p)+side)])
        if i:fs.append(((i-1)*2,(i-1)*2+1,i*2+1,i*2))
    if surface:
        bpy.context.view_layer.update()
        front=max(v.co.y for v in surface.data.vertices)+1
        projected=[]
        for x,y,z in vs:
            hit,point,normal,index=surface.ray_cast(Vector((x,front,z)),Vector((0,-1,0)))
            assert hit,(name,x,z)
            projected.append(tuple(point+normal*.004))
        vs=projected
    return mesh(name,vs,fs,mat,bone)

def rune(name,center,scale,mat,bone,surface=None):
    x,y,z=center
    for j,coords in enumerate([[(-.45,.15),(0,.65),(.45,.15),(0,-.55),(-.45,.15)],[(-.5,0),(.5,0)],[(0,-.55),(0,.65)]]):
        engraving(name+str(j),[(x+u*scale,y,z+v*scale) for u,v in coords],scale*.035,mat,bone,surface)

def wing_weights(o,label):
    for group in list(o.vertex_groups):o.vertex_groups.remove(group)
    a=o.vertex_groups.new(name='wing_'+label);b=o.vertex_groups.new(name='tip_'+label)
    for v in o.data.vertices:
        t=max(0,min(1,(abs(v.co.x)-1.12)/.38));a.add([v.index],1-t,'REPLACE');b.add([v.index],t,'REPLACE')

def new_rig(name, bones):
    bpy.ops.object.select_all(action='SELECT'); bpy.ops.object.delete(use_global=False)
    for a in list(bpy.data.actions): bpy.data.actions.remove(a)
    data=bpy.data.armatures.new(name+' skeleton'); r=bpy.data.objects.new(name+' rig',data)
    bpy.context.collection.objects.link(r); bpy.context.view_layer.objects.active=r; r.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT')
    for name,head,tail,parent in bones:
        b=data.edit_bones.new(name); b.head=head; b.tail=tail
        if parent: b.parent=data.edit_bones[parent]
    bpy.ops.object.mode_set(mode='OBJECT'); r.show_in_front=True
    return r

def humanoid_bones(height=3.4, ghost=False):
    bones=[('root',(0,0,1.35),(0,0,1.6),None),('spine',(0,0,1.6),(0,0,2.55),'root'),('head',(0,0,2.55),(0,0,height),'spine')]
    for s,label in [(1,'L'),(-1,'R')]:
        bones += [(f'upper_{label}',(s*1.0,0,2.55),(s*1.3,0,1.88),'spine'),(f'lower_{label}',(s*1.3,0,1.88),(s*1.4,.04,1.26),f'upper_{label}'),(f'hand_{label}',(s*1.4,.04,1.26),(s*1.4,.08,.82),f'lower_{label}')]
        if not ghost:
            bones += [(f'thigh_{label}',(s*.46,0,1.35),(s*.58,.04,.78),'root'),(f'shin_{label}',(s*.58,.04,.78),(s*.58,0,.25),f'thigh_{label}'),(f'foot_{label}',(s*.58,0,.25),(s*.58,.45,.12),f'shin_{label}')]
    return bones

def build_colossus():
    global rig,parts
    parts=[]; rig=new_rig('Rune Colossus',humanoid_bones())
    stone=material('Chiselled slate',(.25,.31,.36)); light=material('Stone edges',(.39,.44,.47)); dark=material('Stone crevices',(.095,.13,.15)); brass=material('Old brass',(.40,.28,.13),.65); glow=material('Rune teal',(.08,.73,.66),.15,1.15)
    plate('Pelvis central keystone',(0,-.04,1.4),(.85,.58,.42),stone,'root',irregular=.035)
    forearms={}
    for s,label in [(1,'L'),(-1,'R')]:
        plate('Pelvis side '+label,(s*.48,0,1.44),(.45,.6,.5),light,'root')
        plate('Chest flanking slab '+label,(s*.52,.02,2.24),(.78,.72,1.05),stone,'spine',irregular=.07)
        plate('Chest upper bevel '+label,(s*.41,.1,2.69),(.74,.78,.25),light,'spine')
        plate('Scapula '+label,(s*.48,-.46,2.34),(.85,.23,.84),light,'spine')
        plate('Shoulder segmented cap '+label,(s*1.0,-.015,2.59),(.7,.84,.63),light,f'upper_{label}',irregular=.035)
        plate('Upper arm slab '+label,(s*1.26,0,2.14),(.49,.55,.5),stone,f'upper_{label}')
        ring('Elbow brass bearing '+label,(s*1.3,0,1.89),.23,.055,brass,f'lower_{label}')
        gem('Elbow inner rune '+label,(s*1.3,0,1.88),(.19,.19,.18),glow,f'lower_{label}')
        forearms[label]=plate('Forearm armour '+label,(s*1.39,.02,1.51),(.59,.64,.58),stone,f'lower_{label}',irregular=.04)
        if label=='R': strike_plate=plate('Integrated strike slab',(s*1.41,.16,1.06),(.71,.75,.9),light,f'hand_{label}',irregular=.04)
        else:
            plate('Palm',(s*1.4,.04,1.02),(.47,.5,.36),stone,f'hand_{label}')
            for j in range(3): plate('Stone finger '+str(j),(s*1.4+(j-1)*.15,.28,.88),(.12,.25,.25),light,f'hand_{label}')
        plate('Thigh '+label,(s*.52,0,1.02),(.53,.63,.55),stone,f'thigh_{label}',irregular=.045)
        plate('Knee patella '+label,(s*.58,.29,.76),(.4,.21,.32),light,f'shin_{label}')
        ring('Knee bearing '+label,(s*.58,.015,.77),.19,.045,brass,f'shin_{label}',orient='X')
        plate('Shin '+label,(s*.58,0,.51),(.45,.55,.42),stone,f'shin_{label}')
        plate('Planted heel '+label,(s*.58,.07,.17),(.68,.86,.3),light,f'foot_{label}')
        for j in range(3): plate('Toe '+label+str(j),(s*.58+(j-1)*.19,.48,.13),(.17,.27,.23),stone,f'foot_{label}')
    plate('Chest recessed socket',(0,.13,2.26),(.7,.34,.82),dark,'spine')
    gem('Removable chest rune',(0,.44,2.24),(.25,.16,.41),glow,'spine')
    for s in [-1,1]: plate('Core bracket',(s*.3,.43,2.23),(.12,.16,.4),brass,'spine')
    rod('Neck bearing',(0,0,2.66),(0,0,2.86),.22,brass,'head')
    plate('Sculpted face',(0,.02,3.02),(.64,.56,.58),light,'head',irregular=.025)
    plate('Face recess',(0,.317,3.02),(.4,.055,.14),dark,'head')
    for s in [-1,1]: gem('Eyes',(s*.115,.355,3.035),(.065,.02,.035),glow,'head')
    plate('Nose bridge',(0,.34,2.96),(.12,.11,.14),stone,'head')
    for i in [-1,0,1]: plate('Crown battlement'+str(i),(i*.22,-.02,3.32),(.16,.41,.28),stone,'head')
    # Tool cuts, chipped surface seams and brass retaining studs.
    for s,l in [(1,'L'),(-1,'R')]:
        for j in range(4):
            z=2.01+j*.17;x=s*(.4+.03*(j%2))
            engraving('Chest chisel fracture '+l+str(j),[(x-.14,.39,z+.09),(x-.04,.411,z+.015),(x+.13,.395,z-.055)],.011,dark,'spine')
        rune('Forearm seal '+l,(s*1.39,.35,1.51),.28,glow,'lower_'+l,forearms[l])
        rune('Kneecap ward '+l,(s*.58,.404,.76),.16,brass,'shin_'+l)
        for z in [1.3,1.68]:
            for dx in [-.19,.19]:gem('Retaining stud '+l+str(z)+str(dx),(s*1.39+dx,.335,z),(.035,.025,.035),brass,'lower_'+l)
        # Deliberate relief replaces a uniformly cuboid face.
        plate('Cheekbone ridge '+l,(s*.24,.32,2.94),(.19,.14,.28),stone,'head',irregular=.1)
        engraving('Mask cut '+l,[(s*.22,.408,3.08),(s*.24,.405,2.95),(s*.16,.396,2.84)],.015,dark,'head')
        for j in range(3):
            rune('Rear shoulder glyph '+l+str(j),(s*(.33+j*.12),-.585,2.34),.12,brass,'spine')
    plate('Carved chin',(0,.31,2.80),(.36,.25,.17),stone,'head')
    engraving('Stone mouth', [(-.13,.449,2.86),(0,.466,2.84),(.13,.449,2.86)],.018,dark,'head')
    rune('Strike slab ancient seal',(-1.41,.548,1.05),.42,brass,'hand_R',strike_plate)
    for i in range(5):
        a=i*2*math.pi/5
        gem('Core socket tooth '+str(i),(.29*math.sin(a),.454,2.24+.41*math.cos(a)),(.045,.04,.055),brass,'spine')
    return rig

def build_gargoyle():
    global rig,parts
    parts=[]
    bones=[('root',(0,0,1.05),(0,0,1.3),None),('spine',(0,0,1.3),(0,.2,2.05),'root'),('head',(0,.2,2.05),(0,.4,2.7),'spine')]
    for s,l in [(1,'L'),(-1,'R')]:
        bones += [(f'upper_{l}',(s*.57,.17,1.88),(s*.78,.33,1.18),'spine'),(f'lower_{l}',(s*.78,.33,1.18),(s*.87,.65,.52),f'upper_{l}'),(f'hand_{l}',(s*.87,.65,.52),(s*.88,.81,.3),f'lower_{l}'),(f'thigh_{l}',(s*.35,-.05,1.1),(s*.55,.22,.65),'root'),(f'shin_{l}',(s*.55,.22,.65),(s*.62,-.02,.23),f'thigh_{l}'),(f'foot_{l}',(s*.62,-.02,.23),(s*.62,.5,.12),f'shin_{l}'),(f'wing_{l}',(s*.45,-.18,1.95),(s*1.25,-.25,2.62),'spine'),(f'tip_{l}',(s*1.25,-.25,2.62),(s*2.45,-.32,2.52),f'wing_{l}')]
    tail=[(0,-.3,1.15),(0,-.8,.8),(.15,-1.25,.5),(.28,-1.65,.65),(.3,-1.85,.86)]
    for i in range(4):bones.append(('tail'+str(i),tail[i],tail[i+1],'root' if i==0 else 'tail'+str(i-1)))
    rig=new_rig('Belfry Gargoyle',bones)
    stone=material('Violet sculpted slate',(.18,.16,.28));edge=material('Slate highlights',(.29,.27,.38));membrane=material('Terracotta wing leather',(.5,.245,.13));dark=material('Muzzle recess',(.045,.039,.065));brass=material('Bell bronze',(.46,.29,.085),.65);eyes=material('Amber eyes',(.95,.48,.08),0,1.25)
    loft('Sculpted torso',[(.99,.36,.28,0,-.06),(1.25,.47,.37,0,0),(1.65,.53,.34,0,.1),(1.96,.36,.28,0,.18),(2.10,.21,.2,0,.22)],stone,'spine')
    loft('Neck',[(1.98,.19,.19,0,.22),(2.27,.22,.2,0,.31)],edge,'head')
    loft('Bat skull',[(2.19,.22,.24,0,.34),(2.4,.30,.29,0,.39),(2.56,.21,.22,0,.31)],stone,'head')
    loft('Pointed muzzle',[(2.08,.025,.05,0,.91),(2.18,.13,.14,0,.78),(2.30,.22,.24,0,.67),(2.39,.16,.2,0,.59)],edge,'head',n=12)
    plate('Mouth slit',(0,.818,2.22),(.21,.045,.055),dark,'head')
    ring('Bell collar',(0,.23,2.1),.25,.05,brass,'spine')
    loft('Belfry bell',[(1.87,.12,.1,0,.49),(2.02,.09,.09,0,.49),(2.07,.035,.035,0,.49)],brass,'spine')
    for s,l in [(1,'L'),(-1,'R')]:
        gem('Deep orbital recess '+l,(s*.195,.617,2.405),(.11,.032,.076),dark,'head')
        gem('Amber eye '+l,(s*.195,.651,2.39),(.075,.023,.043),eyes,'head')
        curved('Aggressive brow '+l,[(s*.055,.6,2.46),(s*.18,.643,2.46),(s*.32,.52,2.5)],[.04,.075,.025],edge,'head')
        horn=[(s*.2,.24,2.52),(s*.32,.13,2.73),(s*.36,.2,2.92),(s*.30,.36,2.95)]
        curved('Swept horn '+l,horn,[.12,.09,.055,.004],edge,'head',n=12)
        curved('Backward pointed ear '+l,[(s*.26,.27,2.41),(s*.43,.12,2.53),(s*.52,-.035,2.58)],[.095,.085,.003],stone,'head')
        loft('Shoulder '+l,[(1.58,.22,.22,s*.57,.2),(1.88,.29,.27,s*.57,.15),(2.0,.17,.19,s*.57,.1)],edge,f'upper_{l}')
        curved('Anatomical upper arm '+l,[(s*.61,.2,1.77),(s*.67,.24,1.56),(s*.74,.29,1.37),(s*.78,.33,1.17)],[.18,.23,.145,.13],stone,f'upper_{l}',n=12)
        curved('Tapered forearm '+l,[(s*.78,.33,1.17),(s*.81,.41,.96),(s*.84,.53,.73),(s*.87,.64,.54)],[.14,.185,.12,.09],edge,f'lower_{l}',n=12)
        gem('Palm '+l,(s*.88,.71,.39),(.15,.18,.17),stone,f'hand_{l}')
        for j in [-1,0,1]:
            curved('Jointed grasping finger '+l+str(j),[(s*.88+j*.10,.76,.43),(s*.89+j*.12,.91,.36),(s*.9+j*.14,1.01,.24)],[.055,.052,.025],stone,f'hand_{l}')
            curved('Hooked talon '+l+str(j),[(s*.9+j*.14,1.01,.24),(s*.9+j*.14,1.065,.18),(s*.9+j*.14,1.03,.095)],[.035,.023,.002],edge,f'hand_{l}')
        curved('Opposing thumb '+l,[(s*.77,.72,.43),(s*.69,.89,.35),(s*.73,1.00,.24)],[.07,.05,.003],edge,f'hand_{l}')
        loft('Digitigrade thigh '+l,[(.65,.19,.22,s*.55,.22),(.94,.3,.29,s*.43,.09),(1.17,.24,.22,s*.35,-.05)],stone,f'thigh_{l}')
        rod('Slanted hind shin '+l,(s*.55,.22,.65),(s*.62,-.02,.23),.115,edge,f'shin_{l}',endradius=.085)
        loft('Hind foot '+l,[(.04,.20,.31,s*.62,.16),(.15,.24,.38,s*.62,.17),(.28,.12,.16,s*.62,0)],stone,f'foot_{l}')
        for j in [-1,0,1]:rod('Hind toe '+l+str(j),(s*.62+j*.12,.34,.12),(s*.62+j*.15,.66,.055),.065,edge,f'foot_{l}',endradius=.006)
        points=[(s*.48,-.21,1.97),(s*1.18,-.28,2.77),(s*2.27,-.36,2.72),(s*2.61,-.38,2.15),(s*2.12,-.29,1.35),(s*1.56,-.22,1.51),(s*.91,-.21,1.25)]
        wrist=Vector(points[1]);vs=[];fs=[];weights=[]
        # Radial ribs support curved membranes with concave trailing edges.
        ends=[Vector(points[i]) for i in [2,3,4,5,6,0]]
        for panel in range(5):
            start=len(vs);a,b=ends[panel],ends[panel+1]
            for radial in range(1,10):
                r=radial/9
                for angular in range(13):
                    u=angular/12;edgepoint=a.lerp(b,u);edgepoint=edgepoint.lerp(wrist,.20*math.sin(math.pi*u))
                    p=wrist.lerp(edgepoint,r);p.y+=.095*math.sin(math.pi*u)*math.sin(math.pi*r)+.014*math.sin(r*math.pi*18)*math.sin(math.pi*u)
                    vs.append(tuple(p));tip=max(0,min(1,(abs(p.x)-1.12)/.38));weights.append([(f'wing_{l}',1-tip),(f'tip_{l}',tip)])
            for r in range(8):
                for u in range(12):q=start+r*13+u;fs.append((q,q+1,q+14,q+13))
            # Wrist fan closes the central membrane, without zero-area triangles.
            center=len(vs);vs.append(tuple(wrist));weights.append([(f'wing_{l}',1)])
            for u in range(12):fs.append((center,start+u,start+u+1))
        wing=mesh('Curved scalloped wing '+l,vs,fs,membrane,f'wing_{l}',weights)
        for p in wing.data.polygons:p.use_smooth=True
        for i in [2,3,4,5,6]:
            mid=Vector(points[1]).lerp(Vector(points[i]),.48);mid.y-=.045
            wing_weights(curved('Wing finger rib '+l+str(i),[points[1],tuple(mid),points[i]],[.05,.04,.018],edge,f'wing_{l}'),l)
        wing_weights(rod('Wing upper spar '+l,points[0],points[1],.1,stone,f'wing_{l}',endradius=.075),l)
        wing_weights(rod('Wing outer spar '+l,points[1],points[2],.075,edge,f'tip_{l}',endradius=.04),l)
    for i in range(4):rod('Articulated tail '+str(i),tail[i],tail[i+1],.14*(1-i*.22),stone,'tail'+str(i),endradius=.14*(1-(i+1)*.22))
    gem('Tail arrow',tail[-1],(.11,.18,.15),edge,'tail3')
    # Sculpted muscle plates and broken slate ridges on both sides of the creature.
    for s,l in [(1,'L'),(-1,'R')]:
        for j in range(3):
            z=1.35+j*.18
            plate('Thoracic muscle relief '+l+str(j),(s*.25,.43,z),(.40,.17,.24),edge,'spine',irregular=.12)
            engraving('Torso mineral split '+l+str(j),[(s*.11,.52,z+.07),(s*.26,.528,z),(s*.37,.512,z-.07)],.008,dark,'spine')
        for j in range(3):gem('Shoulder stone crest '+l+str(j),(s*(.55+j*.07),-.08,1.91+j*.1),(.12,.17,.19),stone,'upper_'+l)
        for j in range(2):gem('Forearm ridge '+l+str(j),(s*.84,.37,1.0-j*.22),(.16,.10,.17),stone,'lower_'+l)
        for j in range(2):curved('Exposed muzzle tooth '+l+str(j),[(s*(.065+j*.065),.827,2.25),(s*(.07+j*.065),.85,2.17)],[.025,.002],edge,'head')
        engraving('Cheek sculpt line '+l,[(s*.24,.607,2.34),(s*.29,.55,2.3),(s*.23,.55,2.24)],.01,dark,'head')
    for j in range(5):gem('Dorsal slate spine '+str(j),(0,-.31,1.28+j*.15),(.1,.20,.16),edge,'spine')
    rune('Collar bell insignia',(0,.585,1.975),.075,dark,'spine')
    return rig

def build_wraith():
    global rig,parts
    parts=[];bones=humanoid_bones(3.2,ghost=True)
    for s,l in [(1,'L'),(-1,'R')]:
        for i in range(6):
            z=1.07-i*.11;bones.append((f'chain_{l}_{i}',(s*1.4,.15,z),(s*1.4,.15,z-.11),f'hand_{l}' if i==0 else f'chain_{l}_{i-1}'))
    rig=new_rig('Chain Wraith',bones)
    cloak=material('Moss charcoal mantle',(.075,.10,.08));fold=material('Cloak fold edges',(.16,.19,.145));dark=material('Hood inner shadow',(.008,.015,.013));iron=material('Cursed wrought iron',(.14,.15,.14),.65);brass=material('Ancient rune bronze',(.45,.32,.13),.65);glow=material('Spectral mint',(.16,.67,.43),0,.8)
    # Continuous deeply fluted cloth, with a ragged floating hem and gradual skinning.
    n=72;vs=[];weights=[];levels=18
    for k in range(levels):
        t=k/(levels-1);z=.4+t*2.08;rx=.40+.37*math.sin(math.pi*t*.9);ry=.24+.17*math.sin(math.pi*t*.9)
        for i in range(n):
            a=i*2*math.pi/n;zz=z+(.12*math.sin(i*.73)+.06*math.cos(i*1.61))*(1-t)**7
            foldwave=.075*math.cos(a*12+t*.6)+.025*math.cos(a*24-t*.8)
            vs.append(((rx+foldwave)*math.cos(a),(ry+foldwave*.7)*math.sin(a),zz))
            spine=ramp(z,1.25,2.1);weights.append([('root',1-spine),('spine',spine)])
    fs=[]
    for k in range(levels-1):
        for i in range(n):fs.append((k*n+i,k*n+(i+1)%n,(k+1)*n+(i+1)%n,(k+1)*n+i))
    mantle=mesh('Sculpted fluted mantle',vs,fs,cloak,'spine',weights)
    for p in mantle.data.polygons:p.use_smooth=True
    for i in range(12):
        a=i*2*math.pi/12;delta=.18
        vs=[(.58*math.cos(a-delta),.32*math.sin(a-delta),2.45),(.58*math.cos(a+delta),.32*math.sin(a+delta),2.45),(.76*math.cos(a),.45*math.sin(a),1.83),(.51*math.cos(a+delta),.32*math.sin(a+delta),.73),(.36*math.cos(a),.23*math.sin(a),.28+.10*math.sin(i*1.7)),(.51*math.cos(a-delta),.32*math.sin(a-delta),.73)]
        mesh('Overlapping ragged mantle panel '+str(i),vs,[(0,1,2),(1,3,2),(3,4,2),(4,5,2),(5,0,2)],fold if i%3 else cloak,'spine',[[('spine',1)],[('spine',1)],[('spine',1)],[('root',1)],[('root',1)],[('root',1)]])
    for i in [-1,0,1]:mesh('Spectral trailing wisp '+str(i),[(i*.23,.07,.62),(i*.23+.1,.09,.54),(i*.17-.025,.02,.32)],[(0,1,2)],glow,'root')
    # A peaked hood with an open face; the aperture is not a solid cone.
    vs=[(-.33,.15,2.49),(.33,.15,2.49),(-.29,.16,2.92),(.29,.16,2.92),(0,-.06,3.29),(-.31,-.25,2.51),(.31,-.25,2.51),(-.22,-.25,2.9),(.22,-.25,2.9)]
    mesh('Open peaked hood',vs,[(0,2,7,5),(1,6,8,3),(2,4,7),(3,8,4),(7,4,8),(5,7,8,6),(0,5,6,1)],cloak,'head')
    # Rolled hood aperture, layered crown ridges and visible embroidered edges.
    curved('Folded hood aperture',[(-.28,.19,2.49),(-.32,.195,2.68),(-.26,.19,2.94),(0,.03,3.24),(.26,.19,2.94),(.32,.195,2.68),(.28,.19,2.49)],[.055,.063,.065,.055,.065,.063,.055],fold,'head',n=12)
    for s in [-1,1]:
        curved('Hood seam '+str(s),[(s*.25,-.22,2.53),(s*.25,-.235,2.81),(s*.15,-.18,3.05),(0,-.06,3.29)],[.025,.035,.028,.007],fold,'head')
    mesh('Recessed shadow face',[(-.26,.135,2.5),(.26,.135,2.5),(.24,.135,2.86),(0,.06,3.12),(-.24,.135,2.86)],[(0,1,2,3,4)],dark,'head')
    for s in [-1,1]:gem('Mint eye',(s*.10,.162,2.8),(.04,.014,.027),glow,'head')
    ring('Vulnerable bronze collar',(0,0,2.45),.38,.075,brass,'spine')
    for s,l in [(1,'L'),(-1,'R')]:
        loft('Layered mantle shoulder '+l,[(2.19,.23,.22,s*.96,-.06),(2.41,.36,.29,s*.84,-.06),(2.62,.21,.18,s*.75,-.06)],cloak,'upper_'+l,n=12)
        rod('Spectral upper arm '+l,(s*1.03,0,2.47),(s*1.3,0,1.9),.14,cloak,'upper_'+l,endradius=.11)
        rod('Angular forearm '+l,(s*1.3,0,1.9),(s*1.4,.05,1.27),.12,fold,'lower_'+l,endradius=.08)
        ring('Iron wrist cuff '+l,(s*1.4,.05,1.28),.13,.045,brass,'hand_'+l)
        loft('Gaunt spectral hand '+l,[(.98,.09,.10,s*1.4,.08),(1.08,.13,.10,s*1.4,.08),(1.22,.085,.085,s*1.4,.06)],iron,'hand_'+l,n=12)
        for j in [-1,0,1,2]:curved('Curled ghost finger '+l+str(j),[(s*1.4+(j-.5)*.046,.13,1.09),(s*1.4+(j-.5)*.05,.22,1.01),(s*1.4+(j-.5)*.05,.19,.935)],[.022,.018,.009],iron,'hand_'+l)
        for i in range(12):ring('Continuous chain link '+l+str(i),(s*1.4,.15,1.07-i*.055),.043,.017,iron,f'chain_{l}_{min(5,i//2)}',orient='Y' if i%2==0 else 'X',stretch=1.42)
        loft('Heavy polygonal chain weight '+l,[(.105,.13,.13,s*1.4,.15),(.21,.25,.23,s*1.4,.15),(.44,.25,.23,s*1.4,.15),(.55,.13,.13,s*1.4,.15)],brass,'chain_'+l+'_5',n=6)
        for j in [-1,1]:rod('Weight cross binding '+l+str(j),(s*1.4-.13,.365,.33+j*.06),(s*1.4+.13,.365,.33+j*.06),.018,iron,'chain_'+l+'_5',n=4)
        gem('Weight rune '+l,(s*1.4,.386,.33),(.055,.012,.075),glow,'chain_'+l+'_5')
        rune('Weight etched seal '+l,(s*1.4,.387,.33),.19,glow,'chain_'+l+'_5')
        for j in range(6):
            a=j*math.pi/3
            gem('Weight bronze rivet '+l+str(j),(s*1.4+.205*math.sin(a),.36,.33+.13*math.cos(a)),(.023,.025,.025),iron,'chain_'+l+'_5')
        rune('Shoulder bronze ward '+l,(s*.84,.251,2.43),.26,brass,'upper_'+l)
        for j in range(4):
            z=1.57+j*.16
            engraving('Sleeve stitched band '+l+str(j),[(s*1.27,.112,z+.04),(s*1.39,.146,z),(s*1.48,.12,z-.03)],.008,brass,'lower_'+l)
    for j in range(8):
        a=j*math.pi/4
        gem('Collar rune set '+str(j),(.38*math.cos(a),.38*math.sin(a),2.46),(.028,.026,.052),glow,'spine')
    return rig

def pose_gargoyle(clip,t,d):
    if clip in ['Idle','Walk','Hover']:
        flap=math.sin(t*2*math.pi/d)
        for s,l in [(1,'L'),(-1,'R')]:rotate('wing_'+l,Y,s*(.18+.12*flap));rotate('tip_'+l,Y,s*.12*flap)
        if clip=='Hover':
            move_root(z=.6+.07*flap)
            for s,l in [(1,'L'),(-1,'R')]:rotate('wing_'+l,Y,s*.55*flap);rotate('thigh_'+l,X,-.25);rotate('shin_'+l,X,.35)
        if clip=='Walk':
            for s,l in [(1,'L'),(-1,'R')]:a=math.sin(t*2*math.pi/d+(0 if s==1 else math.pi));rotate('thigh_'+l,X,a*.29);rotate('shin_'+l,X,-max(0,a)*.35);rotate('foot_'+l,X,-a*.29+max(0,a)*.35);rotate('upper_'+l,X,.08-a*.18)
    elif clip=='Dive':
        rise=ramp(t,0,.72);descent=ramp(t,1.0,1.65);recover=ramp(t,1.9,d);move_root(z=.95*rise*(1-descent))
        lean=pulse(t,.72,1.65);rotate('spine',X,-.7*lean);rotate('head',X,-.2*lean)
        for s,l in [(1,'L'),(-1,'R')]:
            rotate('wing_'+l,Z,-s*.95*lean);rotate('tip_'+l,Z,-s*.55*lean)
            rotate('wing_'+l,Y,s*(-.55*pulse(t,0,.72)+.6*pulse(t,1.4,2.2)))
            rotate('upper_'+l,X,1.1*lean);rotate('thigh_'+l,X,.4*descent*(1-recover));rotate('shin_'+l,X,-.7*descent*(1-recover));rotate('foot_'+l,X,.3*descent*(1-recover))
    elif clip=='Claw':
        q=pulse(t,0,d);rotate('upper_R',X,1.25*q);rotate('lower_R',X,.5*q);rotate('spine',Z,.25*q)
    elif clip=='Stagger':rotate('spine',X,.3*pulse(t,0,d))
    elif clip=='Death':
        q=ramp(t,0,1.7);move_root(z=-.07*q);rotate('spine',X,-.72*q)
        for s,l in [(1,'L'),(-1,'R')]:rotate('wing_'+l,Z,-s*1.2*q);rotate('thigh_'+l,X,.5*q);rotate('shin_'+l,X,-.85*q);rotate('foot_'+l,X,.35*q);rotate('upper_'+l,X,1.05*q)
    phase=t*2*math.pi/d if clip in ['Idle','Walk','Hover'] else t*3
    for i in range(4):rotate('tail'+str(i),Z,.10*math.sin(phase-i*.55));rotate('tail'+str(i),X,.06*math.sin(phase-i*.4))

def pose_wraith(clip,t,d):
    loop=clip in ['Idle','Walk','Hover'];phase=t*2*math.pi/d if loop else t*2.5
    move_root(z=.045*math.sin(phase));rotate('head',Z,.03*math.sin(phase))
    if clip in ['Idle','Walk','Hover']:
        rotate('spine',Z,.035*math.sin(phase));
        for s,l in [(1,'L'),(-1,'R')]:rotate('upper_'+l,Y,s*.1);rotate('lower_'+l,X,.08*math.sin(phase+s))
    elif clip=='ChainSweep':
        wind=ramp(t,0,.6)*(1-ramp(t,.73,1.13));swing=pulse(t,.58,1.9)
        rotate('spine',Z,-.4*wind+.5*swing);rotate('upper_R',X,-.85*wind-.7*swing);rotate('upper_R',Y,.9*swing);rotate('lower_R',X,-.45*wind)
        for i in range(6):rotate(f'chain_R_{i}',X,-.19*math.sin(t*5-i*.45));rotate(f'chain_R_{i}',Y,-.14*swing)
    elif clip=='Binding':
        q=pulse(t,0,d);rotate('spine',X,.12*q)
        for s,l in [(1,'L'),(-1,'R')]:
            rotate('upper_'+l,Y,s*.8*q);rotate('upper_'+l,X,-.35*q)
            for i in range(6):rotate(f'chain_{l}_{i}',Y,s*.16*math.sin(t*4-i*.35)*q)
    elif clip=='Stagger':rotate('spine',X,.36*pulse(t,0,d));rotate('head',X,.15*pulse(t,0,d))
    elif clip=='Death':
        q=ramp(t,0,1.9);move_root(z=.10*q);rotate('spine',X,-.38*q);rotate('head',X,-.42*q)
        for s,l in [(1,'L'),(-1,'R')]:rotate('upper_'+l,Y,-s*.17*q);rotate('lower_'+l,X,-.1*q)
    for s,l in [(1,'L'),(-1,'R')]:
        for i in range(6):rotate(f'chain_{l}_{i}',X,.017*math.sin(phase-i*.4+s))

def pulse(t,a,b):
    if t<=a or t>=b:return 0
    return math.sin(math.pi*(t-a)/(b-a))

def ramp(t,a,b):
    q=max(0,min(1,(t-a)/(b-a)));return q*q*(3-2*q)

def rotate(bone, axis, angle):
    p=rig.pose.bones.get(bone)
    if p:
        local=p.bone.matrix_local.to_quaternion().inverted()@axis
        p.rotation_quaternion=p.rotation_quaternion@Quaternion(local,angle)

def reset_pose():
    for b in rig.pose.bones: b.rotation_mode='QUATERNION';b.rotation_quaternion=Quaternion();b.location=(0,0,0);b.scale=(1,1,1)

def move_root(x=0,y=0,z=0):
    b=rig.pose.bones['root'];b.location=b.bone.matrix_local.to_quaternion().inverted()@Vector((x,y,z))

def pose_colossus(clip,t,d):
    if clip in ['Idle','Walk']:
        phase=t*2*math.pi/d
        rotate('spine',X,.02*math.sin(phase)); rotate('head',Z,.035*math.sin(phase))
        if clip=='Walk':
            p=t*2*math.pi/d
            for s,label in [(1,'L'),(-1,'R')]:
                a=math.sin(p+(0 if s==1 else math.pi)); rotate('thigh_'+label,X,a*.26);rotate('shin_'+label,X,-max(0,a)*.45);rotate('foot_'+label,X,-a*.26+max(0,a)*.45)
                rotate('upper_'+label,X,-a*.1)
            move_root(z=.025*(1-math.cos(p*2)))
    elif clip in ['Slam','Sweep']:
        lift=ramp(t,0,.65)*(1-ramp(t,.78,1.0));recover=ramp(t,1.35,d)
        if clip=='Slam':
            impact=ramp(t,.72,.95)*(1-recover)
            rotate('upper_R',X,-2.35*lift+.92*impact);rotate('lower_R',X,-.35*lift)
            rotate('spine',X,.12*lift-.92*impact);rotate('upper_L',X,.15*lift+.45*impact)
            bend=.19*lift+.65*impact
        else:
            swing=ramp(t,.6,1.05);rotate('spine',Z,-.52*lift+1.0*swing*(1-recover));rotate('upper_R',Y,-.8*pulse(t,0,d));rotate('upper_R',X,-.85*pulse(t,0,d));bend=.2*pulse(t,0,d)
        drop=.57*(1-math.cos(bend))+.53*(1-math.cos(.8*bend))
        shift=.57*math.sin(bend)-.53*math.sin(.8*bend)
        move_root(y=-shift,z=-drop)
        for label in ['L','R']: rotate('thigh_'+label,X,bend);rotate('shin_'+label,X,-bend*1.8);rotate('foot_'+label,X,bend*.7)
    elif clip=='Stagger':rotate('spine',X,-.24*pulse(t,0,d));rotate('head',X,-.18*pulse(t,0,d))
    elif clip=='Death':
        q=ramp(t,0,1.3);bend=.6*q;move_root(y=-.57*math.sin(bend)+.53*math.sin(.5*q),z=-.57*(1-math.cos(bend))-.53*(1-math.cos(.5*q)));rotate('spine',X,-.85*q);rotate('head',X,-.3*q)
        for label in ['L','R']:rotate('thigh_'+label,X,bend);rotate('shin_'+label,X,-1.1*q);rotate('foot_'+label,X,.5*q);rotate('upper_'+label,X,.35*q)

def author(poses,clips):
    rig.animation_data_create(); actions=[]
    for name,duration in clips.items():
        a=bpy.data.actions.new(name);a.use_fake_user=True;rig.animation_data.action=a
        for frame in range(1,round(duration*FPS)+2):
            reset_pose();poses(name,min(duration,(frame-1)/FPS),duration)
            for b in rig.pose.bones:
                b.keyframe_insert('rotation_quaternion',frame=frame,group=b.name);b.keyframe_insert('location',frame=frame,group=b.name)
        a['duration_seconds']=duration;actions.append(a)
    rig.animation_data.action=actions[0];bpy.context.scene.frame_set(1)
    return actions

def save_export(name,clips,pose_fn):
    topology=[dict(part=o.name,**surface_topology(o)) for o in parts if o.get('solid_surface')]
    assert all(c['nonManifoldEdges']==0 and c['inconsistentEdges']==0 and c['degenerateTriangles']==0 and c['signedVolume']>0 for c in topology),topology
    actions=author(pose_fn,clips)
    bpy.ops.object.select_all(action='DESELECT')
    for o in parts:o.select_set(True)
    bpy.context.view_layer.objects.active=parts[0];bpy.ops.object.join();skin=bpy.context.object;skin.name=name+' skinned surfaces'
    skin.parent=rig
    # Parts keep metre-scaled UVs, shared detail maps and their original named weights.
    bpy.ops.object.select_all(action='DESELECT');skin.select_set(True);rig.select_set(True);bpy.context.view_layer.objects.active=rig
    scene=bpy.context.scene;scene.render.fps=FPS;scene.frame_start=1;scene.frame_end=round(max(clips.values())*FPS)+1
    rig['source_units']='metres';rig['game_forward']='+Y in Blender / -Z in glTF; runtime rotates model 180 degrees to +Z';rig['animations_in_place']=True
    bpy.ops.wm.save_as_mainfile(filepath=str(SRC/(name+'.blend')))
    bpy.ops.export_scene.gltf(filepath=str(OUT/(name+'.glb')),export_format='GLB',use_selection=True,export_yup=True,export_animations=True,export_animation_mode='ACTIONS',export_anim_single_armature=True,export_frame_range=False,export_force_sampling=True,export_anim_slide_to_zero=True,export_skins=True,export_materials='EXPORT',export_extras=True)
    # Inspect actual exported JSON, not exporter status alone.
    raw=(OUT/(name+'.glb')).read_bytes();n=int.from_bytes(raw[12:16],'little');g=json.loads(raw[20:20+n]);animations={a['name']:len(a['channels']) for a in g.get('animations',[])}
    assert set(animations)==set(clips),(name,animations)
    assert len(g.get('skins',[]))==1 and len(g['skins'][0]['joints'])==len(rig.data.bones)
    tris=sum(len(p.vertices)-2 for p in skin.data.polygons)
    print('BOSS_VALIDATION',json.dumps({'name':name,'bones':len(rig.data.bones),'triangles':tris,'clips':clips,'exportedAnimations':animations,'bytes':len(raw)}))
    used_images={n.image for mat in skin.data.materials for n in mat.node_tree.nodes if n.type=='TEX_IMAGE' and n.image}
    images=[{'name':im.name,'width':im.size[0],'height':im.size[1]} for im in sorted(used_images,key=lambda im:im.name)]
    assert all(len(v.groups)>0 and abs(sum(w.weight for w in v.groups)-1)<.001 for v in skin.data.vertices)
    assert all(math.isfinite(c) for v in skin.data.vertices for c in v.co)
    return {'bones':len(rig.data.bones),'triangles':tris,'clips':clips,'bytes':len(raw),'detailMaps':images,'exportedTextures':len(g.get('textures',[])),'materials':len(g.get('materials',[])),'solidSurfaceTopology':topology}

def main():
    build_colossus()
    data={'colossus':save_export('colossus',{'Idle':2,'Walk':1.4,'Slam':2.4,'Sweep':2.2,'Stagger':.65,'Death':2.6},pose_colossus)}
    build_gargoyle()
    data['gargoyle']=save_export('gargoyle',{'Idle':2,'Walk':1.1,'Hover':1.2,'Dive':2.8,'Claw':1.9,'Stagger':.65,'Death':2.8},pose_gargoyle)
    build_wraith()
    data['wraith']=save_export('wraith',{'Idle':2.4,'Walk':1.6,'Hover':2.4,'ChainSweep':2.4,'Binding':2.6,'Stagger':.7,'Death':3},pose_wraith)
    (SRC/'asset-validation.json').write_text(json.dumps(data,indent=2))

if __name__=='__main__':main()
