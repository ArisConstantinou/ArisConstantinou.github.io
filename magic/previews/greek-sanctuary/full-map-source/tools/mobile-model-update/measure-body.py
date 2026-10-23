import bpy,json,os,re
from pathlib import Path
from mathutils import Vector
root=Path(os.environ['CODEX_GENERATED_OUTPUT']);inventory=json.loads((root/'tests/mobile-model-update/native-inventory.json').read_text());result={}
for kind in ['archer','iron-warden']:
 bpy.ops.wm.open_mainfile(filepath=inventory[kind]['source']);scene=bpy.context.scene;rig=next(o for o in scene.objects if o.type=='ARMATURE');rig.animation_data.action=bpy.data.actions['Idle'];rig.animation_data.action_slot=rig.animation_data.action.slots[0];rig.data.pose_position='POSE';scene.frame_set(1);bpy.context.view_layer.update();points=[]
 for o in scene.objects:
  if o.type!='MESH' or o.hide_render or not o.visible_get() or re.search('poleaxe|crossbow|wood_core|loaded_bolt|trigger',o.name,re.I):continue
  e=o.evaluated_get(bpy.context.evaluated_depsgraph_get());points.extend(e.matrix_world@Vector(c) for c in e.bound_box)
 result[kind]={'minY':min(p.z for p in points),'maxY':max(p.z for p in points)}
(root/'tests/mobile-model-update/body-bounds.json').write_text(json.dumps(result,indent=2));print(json.dumps(result))
