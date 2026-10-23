"""Derive the mobile creature from the retained sculpt and structural wing rig.
The original source is read-only. Joint landmarks are in its Blender metres;
ground contacts are solved in world space rather than guessed local Euler axes.
"""
import bpy,os,json,math,hashlib,sys,numpy as np
from pathlib import Path
from mathutils import Vector,Matrix,Quaternion
from importlib.machinery import SourceFileLoader
root=Path(os.environ['CODEX_GENERATED_OUTPUT']);out=root/'build/models/redesign';tests=root/'tests/mobile-model-update';work=root/'work/mobile-models';work.mkdir(parents=True,exist_ok=True)
prepare_surface=SourceFileLoader('native_materials',str(Path(__file__).with_name('native-materials.py'))).load_module().prepare_surface
src=Path(json.loads((tests/'native-inventory.json').read_text())['gargoyle']['source']);source_hash=hashlib.sha256(src.read_bytes()).hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(src));scene=bpy.context.scene;rig=bpy.data.objects['GARGOYLE_STRUCTURAL_WING_RIG'];bpy.context.preferences.filepaths.save_version=0
wing_action=bpy.data.actions['StructuralWingUnfold'];rig.animation_data.action=wing_action;rig.animation_data.action_slot=wing_action.slots[0]
wing_names=[b.name for b in rig.pose.bones if b.name!='body'];wing_poses=[]
for f in range(121):
 scene.frame_set(f);bpy.context.view_layer.update();wing_poses.append({n:rig.pose.bones[n].matrix_basis.copy() for n in wing_names})
rig.animation_data.action=None;rig.data.pose_position='REST';scene.frame_set(0);bpy.context.view_layer.update()
for track in list(rig.animation_data.nla_tracks):rig.animation_data.nla_tracks.remove(track)
originals=[o for o in scene.objects if o.type=='MESH' and not o.hide_render and o.visible_get()];parts=[];deps=bpy.context.evaluated_depsgraph_get()
for original in originals:
 obj=original.copy();obj.data=bpy.data.meshes.new_from_object(original.evaluated_get(deps),preserve_all_data_layers=True,depsgraph=deps);scene.collection.objects.link(obj)
 obj.data.transform(rig.matrix_world.inverted()@original.matrix_world)
 for m in list(obj.modifiers):obj.modifiers.remove(m)
 obj.parent=rig;obj.parent_type='OBJECT';obj.matrix_parent_inverse.identity();obj.matrix_basis.identity();obj.modifiers.new('Authored creature skin','ARMATURE').object=rig
 obj.hide_render=False;obj.hide_viewport=False;obj.hide_set(False);parts.append(obj)
 prepare_surface(obj)
for o in originals:o.hide_render=True;o.hide_set(True)
for o in bpy.context.selected_objects:o.select_set(False)
rig.hide_set(False);rig.select_set(True);bpy.context.view_layer.objects.active=rig;bpy.ops.object.mode_set(mode='EDIT')
landmarks={}
def bone(name,a,b,parent):
 e=rig.data.edit_bones.new(name);e.head=a;e.tail=b;e.parent=rig.data.edit_bones[parent];landmarks[name]={'head':list(a),'tail':list(b),'parent':parent};return e
bone('pelvis',(0,.06,1.24),(0,.04,1.45),'body')
bone('spine',(0,.04,1.45),(0,-.04,1.76),'pelvis')
bone('chest',(0,-.04,1.76),(0,-.24,2.13),'spine')
bone('neck',(0,-.24,2.13),(0,-.49,2.30),'chest')
bone('head',(0,-.49,2.30),(0,-.57,2.65),'neck')
for side,s in [('L',1),('R',-1)]:
 bone('upperarm_'+side,(s*.43,-.09,2.04),(s*.68,-.10,1.44),'chest')
 bone('forearm_'+side,(s*.68,-.10,1.44),(s*.82,-.34,.94),'upperarm_'+side)
 bone('hand_'+side,(s*.82,-.34,.94),(s*.79,-.47,.65),'forearm_'+side)
 bone('thigh_'+side,(s*.25,.06,1.24),(s*.46,-.39,.86),'pelvis')
 bone('shin_'+side,(s*.46,-.39,.86),(s*.58,.18,.36),'thigh_'+side)
 bone('foot_'+side,(s*.58,.18,.36),(s*.62,-.13,.12),'shin_'+side)
 bone('toes_'+side,(s*.62,-.13,.12),(s*.66,-.40,.075),'foot_'+side)
 rig.data.edit_bones['wingUpper.'+side].parent=rig.data.edit_bones['chest']
bpy.ops.object.mode_set(mode='OBJECT')
# Smooth bounded anatomical fields on the body only. Existing wing panels,
# knuckles and membrane weights are retained exactly, never proximity rebound.
body=next(o for o in parts if o.name.startswith('GARGOYLE_SOURCE_body'));points=np.array([v.co[:] for v in body.data.vertices]);names=list(landmarks)
dist=[]
for name in names:
 a=np.array(landmarks[name]['head']);b=np.array(landmarks[name]['tail']);ab=b-a;t=np.clip((points-a)@ab/np.dot(ab,ab),0,1);d=np.linalg.norm(points-a-t[:,None]*ab,axis=1)
 if name.endswith('_L'):d+=np.maximum(0,-points[:,0])*.9
 if name.endswith('_R'):d+=np.maximum(0,points[:,0])*.9
 dist.append(d)
dist=np.array(dist).T;nearest=np.argpartition(dist,4,axis=1)[:,:4];weights=1/(np.take_along_axis(dist,nearest,axis=1)+.035)**5;weights/=weights.sum(axis=1)[:,None]
body.vertex_groups.clear();groups=[body.vertex_groups.new(name=n) for n in names]
for i in range(len(points)):
 for j,w in zip(nearest[i],weights[i]):
  if w>.0001:groups[j].add([i],float(w),'REPLACE')
rest={n:rig.data.bones[n].matrix_local.copy() for n in rig.data.bones.keys()};rig.data.pose_position='POSE'
def rotate(name,axis,angle):
 p=rig.pose.bones[name];p.rotation_mode='QUATERNION';p.rotation_quaternion=p.rotation_quaternion@Quaternion(rest[name].to_3x3().inverted()@Vector(axis),angle)
def place(name,head,tail):
 p=rig.pose.bones[name];reference=rig.data.bones[name];turn=(reference.tail_local-reference.head_local).rotation_difference(tail-head)
 p.matrix=Matrix.Translation(head)@turn.to_matrix().to_4x4()@rest[name].to_quaternion().to_matrix().to_4x4();bpy.context.view_layer.update()
def leg(side,offset,lift):
 thigh=rig.pose.bones['thigh_'+side];hip=(rig.pose.bones['pelvis'].matrix@rest['pelvis'].inverted())@Vector(landmarks['thigh_'+side]['head'])
 ankle=Vector(landmarks['foot_'+side]['tail'])+Vector((0,offset,lift));hock=ankle+Vector(landmarks['foot_'+side]['head'])-Vector(landmarks['foot_'+side]['tail'])
 a=rig.data.bones['thigh_'+side].length;b=rig.data.bones['shin_'+side].length;delta=hock-hip;d=min(delta.length,a+b-.001);direction=delta.normalized()
 bend=Vector((0,-1,0));bend=(bend-direction*bend.dot(direction)).normalized();along=(a*a-b*b+d*d)/(2*d);knee=hip+direction*along+bend*math.sqrt(max(0,a*a-along*along))
 place('thigh_'+side,hip,knee);place('shin_'+side,knee,hock);place('foot_'+side,hock,ankle)
 toe=ankle+Vector(landmarks['toes_'+side]['tail'])-Vector(landmarks['toes_'+side]['head']);place('toes_'+side,ankle,toe)
def smooth(a,b,t):
 x=max(0,min(1,(t-a)/(b-a)));return x*x*(3-2*x)
def brace_arm(side,amount):
 p=rig.pose.bones['upperarm_'+side];shoulder=p.head.copy();wrist=rig.pose.bones['hand_'+side].head.lerp(Vector((.72 if side=='L' else -.72,-.72,.30)),amount)
 a=rig.data.bones['upperarm_'+side].length;b=rig.data.bones['forearm_'+side].length;delta=wrist-shoulder;direction=delta.normalized();d=max(abs(a-b)+.001,min(delta.length,a+b-.001));wrist=shoulder+direction*d
 bend=Vector((1 if side=='L' else -1,0,-.1));bend=(bend-direction*bend.dot(direction)).normalized();along=(a*a-b*b+d*d)/(2*d);elbow=shoulder+direction*along+bend*math.sqrt(max(0,a*a-along*along))
 place('upperarm_'+side,shoulder,elbow);place('forearm_'+side,elbow,wrist);place('hand_'+side,wrist,wrist+Vector((0,-.18,-.23)))
durations={'Idle':2.4,'Walk':1.1,'Hover':1.6,'Dive':2.8,'Claw':1.9,'Stagger':.65,'Death':3.0}
for action in list(bpy.data.actions):bpy.data.actions.remove(action)
scene.render.fps=30;scene.render.fps_base=1
for clip,duration in durations.items():
 action=bpy.data.actions.new(clip);action.use_fake_user=True;rig.animation_data.action=action
 for f in range(round(duration*30)+1):
  t=f/30;phase=t/duration*2*math.pi
  for p in rig.pose.bones:p.matrix_basis=Matrix.Identity(4);p.rotation_mode='QUATERNION'
  opening=0.;root_z=0.;pitch=0.;arm_swing=0.;walk=clip=='Walk'
  if clip=='Idle':pitch=.012*math.sin(phase);opening=.04+.03*math.sin(phase)
  elif clip=='Walk':pitch=.045;opening=.08;root_z=.035*math.cos(phase*2);arm_swing=.18*math.sin(phase)
  elif clip=='Hover':opening=.82+.16*math.cos(phase);root_z=.18+.05*math.sin(phase);pitch=.06
  elif clip=='Dive':
   launch=smooth(.15,.55,t);land=smooth(1.3,1.65,t);recovery=smooth(1.82,2.8,t)
   root_z=.55*launch*(1-land)-.6*land*(1-recovery);opening=.95*launch*(1-land)+.2*land*(1-recovery);pitch=.5*launch*(1-land)+.4*land*(1-recovery)
  elif clip=='Claw':
   wind=smooth(.05,.65,t);strike=smooth(.65,.95,t);recover=smooth(1.15,1.9,t);pitch=.12*strike*(1-recover);opening=.12*wind*(1-recover)
  elif clip=='Stagger':pitch=-.15*math.sin(math.pi*t/duration);opening=.12*math.sin(math.pi*t/duration)
  elif clip=='Death':
   fall=smooth(.1,1.4,t);root_z=-.8*fall;pitch=.15*fall;opening=.16*(1-fall);rotate('body',(1,0,0),1.25*fall)
  rig.pose.bones['body'].location=rest['body'].to_3x3().inverted()@Vector((0,0,root_z))
  rotate('spine',(1,0,0),pitch);rotate('head',(0,0,1),.018*math.sin(phase))
  sample=wing_poses[round(max(0,min(1,opening))*120)]
  for n in wing_names:rig.pose.bones[n].matrix_basis=sample[n]
  for side,s in [('L',1),('R',-1)]:
   rotate('upperarm_'+side,(1,0,0),arm_swing*s)
   if clip=='Hover':rotate('upperarm_'+side,(0,1,0),s*.12);rotate('forearm_'+side,(1,0,0),-.15)
   if clip=='Claw' and side=='R':
    wind=smooth(.05,.65,t);strike=smooth(.65,.95,t);recover=smooth(1.15,1.9,t)
    rotate('upperarm_R',(1,0,0),(-.45*wind+1.25*strike)*(1-recover));rotate('upperarm_R',(0,1,0),-.45*wind*(1-strike)+.1*strike*(1-recover));rotate('forearm_R',(1,0,0),.65*wind*(1-strike))
   if clip=='Dive':
    brace=smooth(.9,1.5,t)*(1-smooth(1.9,2.8,t));rotate('upperarm_'+side,(1,0,0),.45*brace);rotate('forearm_'+side,(1,0,0),.3*brace)
  bpy.context.view_layer.update()
  if clip=='Dive':
   amount=smooth(1.2,1.65,t)*(1-smooth(1.85,2.8,t))
   for side in ['L','R']:brace_arm(side,amount)
  if clip=='Death':
   for side in ['L','R']:brace_arm(side,smooth(.3,1.4,t))
  for side,s in [('L',1),('R',-1)]:
   if walk:
    q=(t/duration+(0 if side=='L' else .5))%1;off=.38*math.cos(q*2*math.pi);lift=.13*max(0,math.sin(q*2*math.pi));leg(side,off,lift)
   elif clip=='Hover':leg(side,.03,.13+root_z)
   elif clip=='Dive' and t<1.5:leg(side,.06,root_z)
   else:leg(side,0,0)
  if clip=='Death':
   fold=smooth(.1,1.4,t);rotate('neck',(1,0,0),.3*fold)
  for p in rig.pose.bones:
   p.keyframe_insert('location',frame=f);p.keyframe_insert('rotation_quaternion',frame=f);p.keyframe_insert('scale',frame=f)
 if action.slots:rig.animation_data.action_slot=action.slots[0]
 for layer in action.layers:
  for strip in layer.strips:
   for bag in strip.channelbags:
    for curve in bag.fcurves:
     for key in curve.keyframe_points:key.interpolation='LINEAR'
rig.animation_data.action=bpy.data.actions['Idle'];rig.animation_data.action_slot=rig.animation_data.action.slots[0];scene.frame_set(0)
for o in bpy.context.selected_objects:o.select_set(False)
for o in parts:o.select_set(True)
bpy.context.view_layer.objects.active=body;bpy.ops.object.join();master=bpy.context.object;master.name=master.data.name='gargoyle_close';master.data.calc_loop_triangles();full=len(master.data.loop_triangles)
rig.data.pose_position='REST';levels=[]
for level,budget in [(1,75000),(2,25000)]:
 o=master.copy();o.data=master.data.copy();scene.collection.objects.link(o);o.name=o.data.name='gargoyle_LOD'+str(level);o['redesignLod']=level
 for a in bpy.context.selected_objects:a.select_set(False)
 o.select_set(True);bpy.context.view_layer.objects.active=o;d=o.modifiers.new('Screen size silhouette','DECIMATE');d.ratio=min(1,budget/full);d.use_collapse_triangulate=True;bpy.ops.object.modifier_move_up(modifier=d.name);bpy.ops.object.modifier_apply(modifier=d.name);o.data.calc_loop_triangles();levels.append(o)
rig.data.pose_position='POSE'
for o in levels:o.hide_render=True;o.hide_set(True)
rig['status']='Mobile actor candidate; original wing geometry and sculpt retained; runtime review required.'
bpy.ops.wm.save_as_mainfile(filepath=str(work/'gargoyle.blend'),compress=True)
outputs=[]
for meshes,suffix,size in [([master],'close',2048),(levels,'lods',1024)]:
 for image in bpy.data.images:
  if image.size[0] and max(image.size)>size:
   ratio=size/max(image.size);image.scale(max(1,round(image.size[0]*ratio)),max(1,round(image.size[1]*ratio)))
 for o in scene.objects:o.select_set(False)
 for o in meshes:o.hide_set(False);o.hide_render=False;o.select_set(True)
 rig.select_set(True);bpy.context.view_layer.objects.active=rig;target=out/('gargoyle-mobile-'+suffix+'.glb')
 bpy.ops.export_scene.gltf(filepath=str(target),export_format='GLB',use_selection=True,export_extras=True,export_yup=True,export_animations=True,export_animation_mode='ACTIONS',export_anim_single_armature=True,export_force_sampling=True,export_frame_range=False,export_frame_step=1,export_skins=True,export_image_format='AUTO',export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=6,export_draco_position_quantization=16,export_draco_normal_quantization=12,export_draco_texcoord_quantization=16)
 outputs.append({'file':str(target),'bytes':target.stat().st_size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest()})
report={'status':'candidate_pending_runtime_review','source':str(src),'sourceSha256':source_hash,'editableSource':str(work/'gargoyle.blend'),'landmarks':landmarks,'bones':len(rig.data.bones),'actions':durations,'triangles':full,'lods':[len(o.data.loop_triangles) for o in levels],'outputs':outputs,'sourceUnchanged':source_hash==hashlib.sha256(src.read_bytes()).hexdigest()}
(tests/'gargoyle-export.json').write_text(json.dumps(report,indent=2));print(json.dumps(report))
