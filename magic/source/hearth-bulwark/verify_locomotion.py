"""Reopen editable source and import its real GLB in Blender 5.1.2.
Inspect leg bind lengths, rigid weights, action durations and grounded soles.
"""
import bpy,pathlib,json,math,hashlib
BASE=pathlib.Path(__file__).resolve().parents[2];OUT=BASE/'output/locomotion/asset';OUT.mkdir(parents=True,exist_ok=True)
src=BASE/'source/hearth-bulwark/hearth-bulwark.blend';glb=BASE/'_source/public/models/hearth-bulwark/hearth-bulwark.glb'
report={'checks':[],'source':str(src),'export':str(glb),'blender':bpy.app.version_string}
def check(name,passed,data=None):
 report['checks'].append({'name':name,'passed':bool(passed),'data':data})
def inspect(label):
 rig=next(o for o in bpy.data.objects if o.type=='ARMATURE');legs={s:[rig.data.bones[n+'_'+s].length for n in ['thigh','shin']] for s in ['L','R']};check(label+' has visibly longer thigh and shin',all(v[0]>.70 and v[1]>.75 for v in legs.values()),legs)
 check(label+' retains 30 joints',len(rig.data.bones)==30)
 invalid=0;vertices=0;invalid_objects=[]
 for o in bpy.data.objects:
  if o.type!='MESH':continue
  # glTF's Blender importer creates an unskinned Icosphere custom bone
  # display widget. Only real deforming meshes require normalized weights.
  if not any(m.type=='ARMATURE' for m in o.modifiers):continue
  vertices+=len(o.data.vertices)
  bad=[]
  for v in o.data.vertices:
   if abs(sum(g.weight for g in v.groups)-1)>.001:invalid+=1;bad.append({'vertex':v.index,'sum':sum(g.weight for g in v.groups)})
  if bad:invalid_objects.append({'object':o.name,'groups':[g.name for g in o.vertex_groups],'bad':bad[:4],'count':len(bad)})
 check(label+' keeps normalized weights',invalid==0,{'vertices':vertices,'invalid':invalid,'objects':invalid_objects})
 # Imported action names may include the rig prefix; preserve clip identity.
 actions={a.name.split('|')[-1]:a for a in bpy.data.actions};check(label+' includes all 10 actions',set(['Sleep','Wake','Idle','Walk','Board','Fire','Throw','Deplete','Exit','Stomp']).issubset(actions),list(actions))
 if label=='source':
  for name in ['Sleep','Wake','Deplete']:
   a=actions[name];rig.animation_data.action=a;ys=[]
   for frame in range(round(a.frame_range[0]),round(a.frame_range[1])+1):
    bpy.context.scene.frame_set(frame);bpy.context.view_layer.update();ys.append([rig.pose.bones['foot_'+s].head.z for s in ['L','R']])
   check(name+' kneeling ankles stay at ground height after rest-rig extension',max(abs(y-.24) for row in ys for y in row)<.015,{'min':min(y for row in ys for y in row),'max':max(y for row in ys for y in row)})
 return {'legs':legs,'vertices':vertices}
bpy.ops.wm.open_mainfile(filepath=str(src));report['sourceRig']=inspect('source')
bpy.ops.wm.read_factory_settings(use_empty=True);bpy.ops.import_scene.gltf(filepath=str(glb));report['importedRig']=inspect('reimport')
raw=glb.read_bytes();g=json.loads(raw[20:20+int.from_bytes(raw[12:16],'little')]);check('GLB has no external buffers',all('uri' not in b for b in g['buffers']));check('GLB packs its material maps',all('bufferView' in i for i in g['images']));report['sha256']={'blend':hashlib.sha256(src.read_bytes()).hexdigest(),'glb':hashlib.sha256(raw).hexdigest()}
report['bosses']=[]
for kind,count,names in [('colossus',15,['Idle','Walk','Slam','Sweep','Stagger','Death']),('gargoyle',23,['Idle','Walk','Hover','Dive','Claw','Stagger','Death'])]:
 for imported in [False,True]:
  source=BASE/'source/bosses'/f'{kind}.blend';export=BASE/'_source/public/models/bosses'/f'{kind}.glb'
  if imported:bpy.ops.wm.read_factory_settings(use_empty=True);bpy.ops.import_scene.gltf(filepath=str(export))
  else:bpy.ops.wm.open_mainfile(filepath=str(source))
  arm=next(o for o in bpy.data.objects if o.type=='ARMATURE');actions=[a.name.split('|')[-1] for a in bpy.data.actions]
  label=kind+(' reimport' if imported else ' source')
  check(label+' preserves joints and actions',len(arm.data.bones)==count and set(names).issubset(actions),{'bones':len(arm.data.bones),'actions':actions})
  bad=0
  for o in bpy.data.objects:
   if o.type=='MESH' and any(m.type=='ARMATURE' for m in o.modifiers):
    bad+=sum(abs(sum(g.weight for g in v.groups)-1)>.001 for v in o.data.vertices)
  check(label+' has normalized skin weights',bad==0,{'invalid':bad})
  if kind=='gargoyle':check(label+' has separate wing shoulder and tip joints',all(arm.data.bones['tip_'+s].parent.name=='wing_'+s and arm.data.bones['wing_'+s].parent.name=='spine' for s in ['L','R']))
 report['bosses'].append({'kind':kind,'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'exportSha256':hashlib.sha256(export.read_bytes()).hexdigest()})
(OUT/'blender-reimport.json').write_text(json.dumps(report,indent=2));print('ASSET_CHECK',json.dumps(report));assert all(c['passed'] for c in report['checks'])
