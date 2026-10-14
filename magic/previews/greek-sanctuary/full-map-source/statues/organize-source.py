import bpy,os
f=os.path.join(os.path.dirname(os.path.abspath(__file__)),'greek-statues.blend');bpy.ops.wm.open_mainfile(filepath=f)
for id in ['caryatid','venus','artemision']:
 o=bpy.data.objects[id+' · runtime'];o.hide_set(id!='caryatid');o.hide_render=id!='caryatid'
bpy.context.scene['README']='Each statue has named original-scan and game-ready/fracture collections. Models share a normalized origin for export. Caryatid alone is visible initially; switch runtime object visibility to inspect Venus or Artemision. Original files and license/hash records are retained under originals/.'
bpy.ops.wm.save_as_mainfile(filepath=f)
