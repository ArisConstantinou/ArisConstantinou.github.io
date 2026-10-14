import bpy, os
ROOT=os.path.dirname(os.path.abspath(__file__))
bpy.ops.wm.open_mainfile(filepath=ROOT+'/greek-statues.blend')
for id in ['caryatid','venus','artemision']:
 for fragments in [False,True]:
  bpy.ops.object.select_all(action='DESELECT')
  objects=[o for o in bpy.data.objects if o.name.startswith(id+'__chunk_')] if fragments else [bpy.data.objects[id+' · runtime']]
  for o in objects:o.hide_set(False);o.select_set(True)
  bpy.context.view_layer.objects.active=objects[0]
  bpy.ops.export_scene.gltf(filepath=ROOT+'/exports/'+id+('-fragments' if fragments else '')+'.glb',export_format='GLB',use_selection=True,export_yup=True,export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=6)
  for o in objects:o.hide_set(True)
print('COMPRESSED_ALL_SIX',flush=True)
