"""Retained museum scans -> editable normalized meshes, runtime LOD, solid cuts.
Run with Blender 5.1.2. No fabricated replacement anatomy or purchased assets.
"""
import bpy, bmesh, os, json, math
from mathutils import Vector, Matrix
ROOT=os.path.dirname(os.path.abspath(__file__))
OUT=ROOT+'/exports';os.makedirs(OUT,exist_ok=True);os.makedirs(ROOT+'/renders',exist_ok=True)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=24;scene.cycles.use_denoising=True
scene.render.resolution_x=600;scene.render.resolution_y=700;scene.render.resolution_percentage=100
scene.world.color=(.18,.18,.18);scene.view_settings.view_transform='AgX'
records=[];models=[]
def select(objects):
 bpy.ops.object.select_all(action='DESELECT')
 for o in objects:o.hide_set(False);o.select_set(True)
 bpy.context.view_layer.objects.active=objects[0]
def collection(name):
 c=bpy.data.collections.new(name);scene.collection.children.link(c);return c
def assign(o,c):
 for q in list(o.users_collection):q.objects.unlink(o)
 c.objects.link(o)
def stats(o):
 o.data.calc_loop_triangles();return {'vertices':len(o.data.vertices),'triangles':len(o.data.loop_triangles),'dimensions':list(o.dimensions),'materials':[m.name for m in o.data.materials],'uvLayers':len(o.data.uv_layers)}
def export(objects,file):
 select(objects);bpy.ops.export_scene.gltf(filepath=OUT+'/'+file,export_format='GLB',use_selection=True,export_texcoords=True,export_normals=True,export_materials='EXPORT',export_yup=True,export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=6)
for id,height,budget in [('caryatid',2.28,85000),('venus',2.035,25000),('artemision',2.09,65000)]:
 before=set(bpy.data.objects)
 if id=='artemision':bpy.ops.wm.stl_import(filepath=ROOT+'/originals/artemision.stl')
 else:bpy.ops.import_scene.gltf(filepath=ROOT+'/originals/'+id+'.glb')
 imported=[o for o in bpy.data.objects if o not in before];imported_names=[o.name for o in imported];meshes=[o for o in imported if o.type=='MESH']
 for o in meshes:
  matrix=o.matrix_world.copy();o.parent=None;o.matrix_world=matrix
 select(meshes);bpy.ops.object.join();original=bpy.context.object;original.name=id+' · retained scan geometry'
 for name in imported_names:
  o=bpy.data.objects.get(name)
  if o and o!=original:bpy.data.objects.remove(o,do_unlink=True)
 select([original]);bpy.ops.object.transform_apply(location=True,rotation=True,scale=True)
 bounds=[original.matrix_world@Vector(v) for v in original.bound_box];lo=Vector(tuple(min(v[i] for v in bounds) for i in range(3)));hi=Vector(tuple(max(v[i] for v in bounds) for i in range(3)))
 print('RAW_BOUNDS',id,list(lo),list(hi),flush=True)
 # glTF importer provides Z-up. Museum STL is likewise an upright scan.
 if hi.z-lo.z<max(hi.x-lo.x,hi.y-lo.y)*.65:raise RuntimeError('Inspect upright orientation before export: '+id)
 scale=height/(hi.z-lo.z);center=(lo+hi)*.5
 for v in original.data.vertices:v.co=(v.co-Vector((center.x,center.y,lo.z)))*scale
 original.data.update();bpy.context.view_layer.update()
 if id=='artemision':
  mat=bpy.data.materials.new('Marble replica of bronze Artemision original');mat.use_nodes=True;p=mat.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(.72,.70,.65,1);p.inputs['Metallic'].default_value=0;p.inputs['Roughness'].default_value=.6;original.data.materials.clear();original.data.materials.append(mat)
 for mat in original.data.materials:
  if mat.use_nodes:
   p=mat.node_tree.nodes.get('Principled BSDF')
   if p:p.inputs['Metallic'].default_value=0
 original_col=collection(id+' · original normalized scan');assign(original,original_col);original['provenance']='See originals/*provenance.json; original files retained byte-for-byte'
 high_stats=stats(original);runtime=original.copy();runtime.data=original.data.copy();runtime.name=id+' · runtime';runcol=collection(id+' · game-ready intact and fracture');runcol.objects.link(runtime)
 for i,mat in enumerate(list(runtime.data.materials)):runtime.data.materials[i]=mat.copy()
 if high_stats['triangles']>budget:
  select([runtime]);mod=runtime.modifiers.new('Silhouette-preserving runtime decimation','DECIMATE');mod.ratio=budget/high_stats['triangles'];mod.use_collapse_triangulate=True;bpy.ops.object.modifier_apply(modifier=mod.name)
 # Keep photographed marble surface maps; bound oversized scans to 2K maps.
 for mat in runtime.data.materials:
  if mat.use_nodes:
   for n in mat.node_tree.nodes:
    if n.type=='TEX_IMAGE' and n.image and max(n.image.size)>2048:
     im=n.image.copy();ratio=2048/max(im.size);im.scale(round(im.size[0]*ratio),round(im.size[1]*ratio));im.pack();n.image=im
 original.hide_set(True);original.hide_render=True
 export([runtime],id+'.glb')
 # Voronoi-like planar cells create irregular closed stone fragments while
 # preserving the source exterior. Deterministic seed sites, no UV rewrap.
 w,d,h=runtime.dimensions;sites=[Vector((x*w,y*d,z*h)) for x,y,z in [(-.18,-.16,.13),(.18,.16,.18),(-.2,.12,.4),(.22,-.12,.42),(-.22,-.13,.64),(.2,.13,.67),(0,-.05,.9),(-.42,0,.69),(.42,0,.7)]]
 fragments=[];inside=bpy.data.materials.new(id+' · fresh stone fracture');inside.diffuse_color=(.68,.65,.58,1);inside.use_nodes=True;p=inside.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(.68,.65,.58,1);p.inputs['Roughness'].default_value=.95
 for index,site in enumerate(sites):
  bm=bmesh.new();bm.from_mesh(runtime.data)
  for other in sites:
   if other==site:continue
   if not bm.verts:break
   normal=(other-site).normalized();mid=(site+other)*.5
   result=bmesh.ops.bisect_plane(bm,geom=list(bm.verts)+list(bm.edges)+list(bm.faces),dist=.00001,plane_co=mid,plane_no=normal,clear_outer=True)
   edges=[e for e in result['geom_cut'] if isinstance(e,bmesh.types.BMEdge) and e.is_boundary]
   if edges:
    capped=bmesh.ops.holes_fill(bm,edges=edges,sides=0)
    for face in capped.get('faces',[]):face.material_index=len(runtime.data.materials);face.smooth=False
  if len(bm.faces)<6:bm.free();continue
  bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));data=bpy.data.meshes.new(id+' fracture '+str(index));bm.to_mesh(data);bm.free()
  piece=bpy.data.objects.new(id+'__chunk_'+str(index),data);runcol.objects.link(piece)
  for mat in runtime.data.materials:data.materials.append(mat)
  data.materials.append(inside);fragments.append(piece);piece.hide_set(True);piece.hide_render=True
 export(fragments,id+'-fragments.glb')
 for piece in fragments:piece.hide_set(True);piece.hide_render=True
 select([runtime]);runtime.hide_render=False
 record={'id':id,'heightMetres':height,'original':high_stats,'runtime':stats(runtime),'fragments':[stats(p) for p in fragments],'runtimeExport':id+'.glb','fractureExport':id+'-fragments.glb'};records.append(record);models.append((id,original,runtime))
 runtime.hide_render=True;runtime.hide_set(True)
 print('PREPARED',json.dumps(record),flush=True)
scene.unit_settings.system='METRIC';scene.unit_settings.scale_length=1
# Neutral reference and corresponding runtime renders, same camera and lights.
for loc,energy,size in [((3,-4,5),650,4),((-3,-1,3),450,3),((1,3,4),550,3)]:
 bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.data.energy=energy;o.data.shape='DISK';o.data.size=size;o.rotation_euler=(Vector((0,0,1.1))-o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add();camera=bpy.context.object;scene.camera=camera;camera.data.type='ORTHO';camera.data.ortho_scale=2.85
for id,original,runtime in models:
 for angle,name in [(0,'front'),(math.pi/2,'side')]:
  camera.location=(math.sin(angle)*5,-math.cos(angle)*5,1.35);camera.rotation_euler=(Vector((0,0,1.12))-camera.location).to_track_quat('-Z','Y').to_euler()
  for object,label in [(original,'reference'),(runtime,'runtime')]:
   object.hide_set(False);object.hide_render=False;scene.render.filepath=ROOT+'/renders/'+id+'-'+name+'-'+label+'.png';bpy.ops.render.render(write_still=True);object.hide_render=True;object.hide_set(True)
for id,original,runtime in models:runtime.hide_set(id!='caryatid');runtime.hide_render=id!='caryatid'
for image in bpy.data.images:
 if image.source=='FILE' and not image.packed_file:
  try:image.pack()
  except:pass
bpy.ops.wm.save_as_mainfile(filepath=ROOT+'/greek-statues.blend')
with open(ROOT+'/preparation-report.json','w',encoding='utf8') as f:json.dump({'blender':bpy.app.version_string,'units':'metres; Blender Z-up, glTF Y-up','records':records},f,indent=2)
print('DONE',ROOT,flush=True)
