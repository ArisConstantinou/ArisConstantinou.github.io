"""Update only the existing editable HEARTH rig's locomotion/impact actions.
Preserve the original geometry, UVs, materials and weights. Lengthen the actual
thigh/shin and their attached armour after the user's leg-proportion correction.
Blender 5.1.2; runtime world-foot IK remains editable in locomotion.js.
"""
import bpy, math, pathlib, json
from mathutils import Vector, Quaternion, Matrix
BASE=pathlib.Path(__file__).resolve().parents[2]
SOURCE=BASE/'source/hearth-bulwark/hearth-bulwark.blend'
OUT=BASE/'_source/public/models/hearth-bulwark/hearth-bulwark.glb'
bpy.ops.wm.open_mainfile(filepath=str(SOURCE))
rig=next(o for o in bpy.data.objects if o.type=='ARMATURE')
if not rig.get('leg_extension'):
 # A persistent, idempotent rest-rig change. Feet stay at the original ground
 # plane; knee rises .20m and hip/upper suit rises .40m. Rigid weights survive.
 for o in bpy.data.objects:
  if o.type!='MESH':continue
  names={g.index:g.name for g in o.vertex_groups}
  for v in o.data.vertices:
   name=names[max(v.groups,key=lambda g:g.weight).group] if v.groups else ''
   z=v.co.z
   if name.startswith('foot_'):continue
   if name.startswith('thigh_'):v.co.z=1.0+(z-.8)*1.4
   elif name.startswith('shin_'):v.co.z=.24+(z-.24)*(.76/.56)
   elif name=='ladder':v.co.z=.04+(z-.04)*(2.8/2.4)
   else:v.co.z+=.4
  o.data.update()
 bpy.context.view_layer.objects.active=rig;bpy.ops.object.mode_set(mode='EDIT')
 for b in rig.data.edit_bones:
  if b.name.startswith('foot_') or b.name=='ladder':continue
  if b.name.startswith('thigh_'):b.head.z+=.4;b.tail.z+=.2
  elif b.name.startswith('shin_'):b.head.z+=.2
  else:b.head.z+=.4;b.tail.z+=.4
 bpy.ops.object.mode_set(mode='OBJECT');bpy.context.view_layer.update()
 # Preserve the planted kneeling soles in the existing sleep/wake/depletion
 # clips despite the longer links. Keep every authored rotation and timing.
 for action in list(bpy.data.actions):
  if action.name not in ['Sleep','Wake','Deplete']:continue
  rig.animation_data.action=action
  for frame in range(round(action.frame_range[0]),round(action.frame_range[1])+1):
   bpy.context.scene.frame_set(frame);bpy.context.view_layer.update()
   p=rig.pose.bones['foot_L'].head.copy();rootbone=rig.pose.bones['root']
   rootbone.location+=rootbone.bone.matrix_local.to_quaternion().inverted()@Vector((0,-p.y,.24-p.z))
   rootbone.keyframe_insert('location',frame=frame,group='root')
 rig['leg_extension']=.4
X,Y,Z=Vector((1,0,0)),Vector((0,1,0)),Vector((0,0,1))
# Rest-axis changes must not roll the kneeling heel through the floor. Bake
# the existing sleep/wake/deplete foot orientations in armature space, keeping
# their authored leg bends and the already compensated ankle trajectories.
for action in list(bpy.data.actions):
 if action.name not in ['Sleep','Wake','Deplete']:continue
 rig.animation_data.action=action
 for frame in range(round(action.frame_range[0]),round(action.frame_range[1])+1):
  bpy.context.scene.frame_set(frame);bpy.context.view_layer.update()
  for s in ['L','R']:
   foot=rig.pose.bones['foot_'+s]
   foot.matrix=Matrix.Translation(foot.head)@foot.bone.matrix_local.to_quaternion().to_matrix().to_4x4()
   foot.keyframe_insert('rotation_quaternion',frame=frame,group=foot.name)
def reset():
 for b in rig.pose.bones:b.rotation_mode='QUATERNION';b.rotation_quaternion=Quaternion();b.location=(0,0,0);b.scale=(1,1,1)
def rotate(name,axis,angle):
 b=rig.pose.bones[name];b.rotation_quaternion=b.rotation_quaternion@Quaternion(b.bone.matrix_local.to_quaternion().inverted()@axis,angle)
def root(x=0,z=0):
 b=rig.pose.bones['root'];b.location=b.bone.matrix_local.to_quaternion().inverted()@Vector((x,0,z))
def open_cockpit():
 for s,l in [(1,'L'),(-1,'R')]:rotate('front_door_'+l,Z,s*1.65)
def solve_leg(side,target):
 upper,lower,foot=[rig.pose.bones[n+'_'+side] for n in ['thigh','shin','foot']]
 bpy.context.view_layer.update();a,b,c=upper.head.copy(),lower.head.copy(),foot.head.copy();l1=(b-a).length;l2=(c-b).length
 direction=target-a;d=min(direction.length,l1+l2-.00001);direction.normalize();along=(l1*l1-l2*l2+d*d)/(2*d)
 bend=Y-direction*Y.dot(direction);bend.normalize();knee=a+direction*along+bend*math.sqrt(max(0,l1*l1-along*along))
 q=(b-a).rotation_difference(knee-a);upper.matrix=Matrix.Translation(a)@(q@upper.matrix.to_quaternion()).to_matrix().to_4x4();bpy.context.view_layer.update()
 b,c=lower.head.copy(),foot.head.copy();q=(c-b).rotation_difference(target-b);lower.matrix=Matrix.Translation(b)@(q@lower.matrix.to_quaternion()).to_matrix().to_4x4();bpy.context.view_layer.update()
 foot.matrix=Matrix.Translation(foot.head)@foot.bone.matrix_local.to_quaternion().to_matrix().to_4x4()
def smooth(t):
 t=max(0,min(1,t));return t*t*(3-2*t)
def pose(clip,t,d):
 reset();open_cockpit()
 if clip=='Walk':
  phase=t/d;root(z=-.055-.012*(1-math.cos(phase*math.pi*4)))
  rotate('torso',Y,.03*math.sin(phase*math.pi*2));rotate('torso',X,.035)
  for i,(s,l) in enumerate([(1,'L'),(-1,'R')]):
   p=(phase+i*.5)%1
   if p<.52:forward=.4264-.82*p/.52;lift=0
   else:u=(p-.52)/.48;forward=-.3936+.82*smooth(u);lift=.29*math.sin(math.pi*u)
   solve_leg(l,Vector((s*.64,forward,.24+lift)));rotate('upper_'+l,X,-.12*math.sin(phase*math.pi*2+i*math.pi))
 elif clip=='Stomp':
  rise=smooth((t-.12)/.28);plunge=max(0,min(1,(t-.48)/.14))**3;recovery=smooth((t-.72)/.5)
  lift=.72*rise*(1-plunge);brace=.12*math.sin(math.pi*min(1,t/.62))*(1-recovery)
  root(x=.10*(1-recovery),z=-brace);rotate('torso',Y,-.07*(1-recovery));rotate('torso',X,.05*rise-.10*plunge*(1-recovery))
  solve_leg('L',Vector((.64,0,.24)));solve_leg('R',Vector((-.64,.09*rise*(1-recovery),.24+lift)))
  rotate('upper_L',X,-.16*rise*(1-recovery));rotate('upper_R',X,.18*rise*(1-recovery))
for name,duration in [('Walk',1.4),('Stomp',1.28)]:
 old=bpy.data.actions.get(name)
 if old:
  if rig.animation_data.action==old:rig.animation_data.action=None
  bpy.data.actions.remove(old)
 action=bpy.data.actions.new(name);action.use_fake_user=True;rig.animation_data.action=action
 for frame in range(1,round(duration*30)+2):
  pose(name,min(duration,(frame-1)/30),duration)
  for bone in rig.pose.bones:bone.keyframe_insert('rotation_quaternion',frame=frame,group=bone.name);bone.keyframe_insert('location',frame=frame,group=bone.name)
 action['duration_seconds']=duration
rig.animation_data.action=bpy.data.actions['Idle'];bpy.context.scene.frame_set(1)
bpy.ops.object.select_all(action='DESELECT')
for o in bpy.data.objects:
 if o.type in ['ARMATURE','MESH']:o.select_set(True)
bpy.context.view_layer.objects.active=rig
bpy.ops.wm.save_as_mainfile(filepath=str(SOURCE))
bpy.ops.export_scene.gltf(filepath=str(OUT),export_format='GLB',use_selection=True,export_yup=True,export_animations=True,export_animation_mode='ACTIONS',export_anim_single_armature=True,export_frame_range=False,export_force_sampling=True,export_anim_slide_to_zero=True,export_skins=True,export_materials='EXPORT',export_extras=True)
raw=OUT.read_bytes();g=json.loads(raw[20:20+int.from_bytes(raw[12:16],'little')]);names=[a['name'] for a in g['animations']]
assert 'Stomp' in names and 'Walk' in names and len(names)==10,names
print('LOCOMOTION_EXPORT',json.dumps({'animations':names,'bones':len(g['skins'][0]['joints']),'bytes':len(raw)}))
