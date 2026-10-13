"""Re-author Walk and Gargoyle's Hover/Dive on the existing approved rigs.
No geometry, material, UV, weight or bind-pose changes; combat timings stay.
Distance/contact phase and grounded legs are controlled by locomotion.js.
"""
import bpy, math, pathlib, sys, json
BASE=pathlib.Path(__file__).resolve().parents[2]
sys.path.insert(0,str(BASE/'source/bosses'))
import build_bosses as author
from mathutils import Vector
X,Y,Z=Vector((1,0,0)),Vector((0,1,0)),Vector((0,0,1))
for kind,duration in [('colossus',1.4),('gargoyle',1.1)]:
 src=BASE/'source/bosses'/f'{kind}.blend'
 bpy.ops.wm.open_mainfile(filepath=str(src))
 rig=next(o for o in bpy.data.objects if o.type=='ARMATURE');author.rig=rig
 old=bpy.data.actions.get('Walk')
 if old:
  if rig.animation_data.action==old:rig.animation_data.action=None
  bpy.data.actions.remove(old)
 action=bpy.data.actions.new('Walk');action.use_fake_user=True
 rig.animation_data.action=action
 for frame in range(1,round(duration*30)+2):
  t=min(duration,(frame-1)/30);phase=t*2*math.pi/duration
  author.reset_pose()
  (author.pose_colossus if kind=='colossus' else author.pose_gargoyle)('Walk',t,duration)
  # Opposite arm and leg advance together. Elbow follow-through makes the
  # forearm articulate instead of translating as an unchanged rigid pose.
  # Cosine places the backward arm at the same phase as the forward plant.
  for side,offset in [('L',0),('R',math.pi)]:
   a=math.cos(phase+offset);p=rig.pose.bones['upper_'+side]
   p.rotation_quaternion.identity()
   author.rotate('upper_'+side,X,(.08 if kind=='gargoyle' else 0)-a*(.38 if kind=='gargoyle' else .30))
   author.rotate('lower_'+side,X,-(.12+.10*max(0,-a)))
   author.rotate('hand_'+side,X,.06*math.sin(phase+offset-.35))
  author.rotate('spine',Y,.04*math.cos(phase))
  author.rotate('spine',Z,.055*math.sin(phase))
  author.rotate('head',Z,-.035*math.sin(phase))
  for b in rig.pose.bones:
   b.keyframe_insert('rotation_quaternion',frame=frame,group=b.name)
   b.keyframe_insert('location',frame=frame,group=b.name)
 action['duration_seconds']=duration
 if kind=='gargoyle':
  def smooth(t,a,b):
   u=max(0,min(1,(t-a)/(b-a)));return u*u*(3-2*u)
  for name,seconds in [('Hover',1.2),('Dive',2.8)]:
   old=bpy.data.actions.get(name)
   if old:bpy.data.actions.remove(old)
   action=bpy.data.actions.new(name);action.use_fake_user=True;rig.animation_data.action=action
   for frame in range(1,round(seconds*30)+2):
    t=min(seconds,(frame-1)/30);author.reset_pose()
    if name=='Hover':
     p=(t/seconds)%1;phase=p*2*math.pi
     # Fast, broad power stroke; slower feathered return. Secondary wing
     # joints follow with a delay instead of flapping as one rigid board.
     flap=-.70+1.40*smooth(p,0,.36)-1.40*smooth(p,.36,1)
     author.move_root(z=.035*math.sin(phase-.35))
     author.rotate('root',X,-.40);author.rotate('spine',X,-.20);author.rotate('head',X,.28)
     for s,l in [(1,'L'),(-1,'R')]:
      author.rotate('wing_'+l,Y,s*flap);author.rotate('tip_'+l,Y,s*.23*math.sin(phase-.65))
      author.rotate('wing_'+l,Z,s*.055*math.sin(phase-.3))
      author.rotate('thigh_'+l,X,.80);author.rotate('shin_'+l,X,-1.60);author.rotate('foot_'+l,X,.55)
      author.rotate('upper_'+l,X,.95+.05*math.sin(phase));author.rotate('lower_'+l,X,1.10)
      author.rotate('hand_'+l,X,-.45+.07*math.sin(phase-.6))
    else:
     lift=smooth(t,0,.65);plunge=smooth(t,.75,1.55);recover=smooth(t,1.95,2.8)
     fold=lift*(1-smooth(t,.95,1.4));brace=.52*plunge*(1-recover)
     # Galio's official Hero's Entrance is the user's motion reference:
     # compact ascent, wing braking, low load-bearing impact, held recovery.
     author.move_root(z=-.16*plunge*(1-recover))
     author.rotate('root',X,-.25*lift*(1-smooth(t,1.1,1.55)))
     author.rotate('spine',X,-.55*lift*(1-recover))
     for s,l in [(1,'L'),(-1,'R')]:
      author.rotate('wing_'+l,Y,s*(-.50*lift+.65*plunge)*(1-recover))
      author.rotate('wing_'+l,Z,-s*.7*plunge*(1-recover));author.rotate('tip_'+l,Z,-s*.4*plunge*(1-recover))
      author.rotate('thigh_'+l,X,.80*fold+brace);author.rotate('shin_'+l,X,-1.60*fold-1.8*brace);author.rotate('foot_'+l,X,.55*fold+.8*brace)
      author.rotate('upper_'+l,X,.95*lift*(1-plunge)*(1-recover)+1.0*plunge*(1-recover));author.rotate('lower_'+l,X,1.10*lift*(1-plunge)*(1-recover)+.2*plunge*(1-recover))
    for i in range(4):author.rotate('tail'+str(i),Z,.10*math.sin(t*2*math.pi/1.2-i*.55));author.rotate('tail'+str(i),X,.06*math.sin(t*2*math.pi/1.2-i*.4))
    for b in rig.pose.bones:
     b.keyframe_insert('rotation_quaternion',frame=frame,group=b.name);b.keyframe_insert('location',frame=frame,group=b.name)
   action['duration_seconds']=seconds
 rig.animation_data.action=bpy.data.actions['Idle'];bpy.context.scene.frame_set(1)
 bpy.ops.object.select_all(action='DESELECT')
 for o in bpy.data.objects:
  if o.type in ['ARMATURE','MESH']:o.select_set(True)
 bpy.context.view_layer.objects.active=rig
 bpy.ops.wm.save_as_mainfile(filepath=str(src))
 dst=BASE/'_source/public/models/bosses'/f'{kind}.glb'
 bpy.ops.export_scene.gltf(filepath=str(dst),export_format='GLB',use_selection=True,export_yup=True,export_animations=True,export_animation_mode='ACTIONS',export_anim_single_armature=True,export_frame_range=False,export_force_sampling=True,export_anim_slide_to_zero=True,export_skins=True,export_materials='EXPORT',export_extras=True)
 raw=dst.read_bytes();g=json.loads(raw[20:20+int.from_bytes(raw[12:16],'little')])
 assert len(g['animations'])==(6 if kind=='colossus' else 7)
 print('BOSS_WALK_EXPORT',json.dumps({'kind':kind,'bones':len(rig.data.bones),'actions':[a['name'] for a in g['animations']],'bytes':len(raw)}))
