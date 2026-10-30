"""Menu-only authored actions. Original character.blend and game GLBs are read-only inputs."""
import bpy,sys,json,math,hashlib
from pathlib import Path
from mathutils import Vector,Quaternion
import numpy as np
r=Path('E:/CodexGenerated/Frog/staging');args=sys.argv[sys.argv.index('--')+1:];mode=args[0];asset=args[1]
assert mode in ['sample','render'] and asset in ['heavy','skinny','medium']
work=r/'work/menu-performances';out=r/'tests/menu-performances';work.mkdir(exist_ok=True);out.mkdir(exist_ok=True)
folder=Path(json.loads((r/f'work/assets-source/cartoon/{asset}-submission.json').read_text())['project_dir'])
source=folder/'character.blend';source_hash=hashlib.sha256(source.read_bytes()).hexdigest()
bpy.ops.wm.open_mainfile(filepath=str(source));bpy.context.preferences.filepaths.save_version=0;bpy.context.preferences.filepaths.temporary_directory=str(r/'work/tmp')
scene=bpy.context.scene;rig=bpy.data.objects[asset.title()+'_Rig'];rig.animation_data.action=None
body=max((o for o in scene.objects if o.type=='MESH' and any(m.type=='ARMATURE' and m.object==rig for m in o.modifiers)),key=lambda o:len(o.data.vertices))
P={b.name:b.head_local.copy()for b in rig.data.bones};Q={b.name:b.matrix_local.to_quaternion()for b in rig.data.bones};R={b.name:(Q[b.parent.name].inverted()@Q[b.name]if b.parent else Q[b.name])for b in rig.data.bones}
def v(p):return Vector((p[0],-p[2],p[1]))
def smooth(x):x=max(0,min(1,x));return x*x*(3-2*x)
def track(t,keys):
 for (a,x),(b,y)in zip(keys,keys[1:]):
  if t<=b:return x+(y-x)*smooth((t-a)/(b-a))
 return keys[-1][1]
def turn(n,axis,angle):rig.pose.bones[n].rotation_quaternion=Q[n].inverted()@Quaternion(v(axis),angle)@Q[n]
def reset():
 for p in rig.pose.bones:p.rotation_mode='QUATERNION';p.location=(0,0,0);p.rotation_quaternion=(1,0,0,0);p.scale=(1,1,1)
 for name in ['lidL','lidR']:
  if name in Q:turn(name,(1,0,0),-math.pi)
def setq(pb,q):
 parent=pb.parent.matrix.to_quaternion()if pb.parent else Quaternion()
 pb.rotation_quaternion=R[pb.name].inverted()@parent.inverted()@q
def solve(a,b,c,target,pole):
 upper,middle,end=[rig.pose.bones[n]for n in [a,b,c]];bpy.context.view_layer.update();start=upper.head.copy();d=target-start
 l1=(P[b]-P[a]).length;l2=(P[c]-P[b]).length;length=max(abs(l1-l2)+1e-5,min(d.length,(l1+l2)*.9999));direction=d.normalized();actual=start+direction*length
 bend=pole-start;bend-=direction*bend.dot(direction)
 if bend.length<1e-6:bend=Vector((1,0,0))
 bend.normalize();along=(l1*l1-l2*l2+length*length)/(2*length);joint=start+direction*along+bend*math.sqrt(max(0,l1*l1-along*along))
 for pb,rest,desired in [(upper,P[b]-P[a],joint-start),(middle,P[c]-P[b],actual-joint)]:
  setq(pb,rest.normalized().rotation_difference(desired.normalized())@Q[pb.name]);bpy.context.view_layer.update()
 # The kicking ankle follows the shin; forcing world-rest orientation folds its skin.
 if asset=='skinny' and c=='ankle-1':end.rotation_quaternion=(1,0,0,0)
 else:setq(end,Q[c])
 bpy.context.view_layer.update()
 return (end.head-actual).length
def family(n):
 if n.startswith(('shoulder','elbow','wrist','finger')):return 'arm'
 if n.startswith(('hip','knee','ankle','foot','toe')):return 'leg'
 return 'body'
names={g.index:g.name for g in body.vertex_groups}
def weights(vertex):return {names[g.group]:g.weight for g in vertex.groups}
def evaluated():
 bpy.context.view_layer.update();obj=body.evaluated_get(bpy.context.evaluated_depsgraph_get());mesh=obj.to_mesh();co=np.array([x.co[:]for x in mesh.vertices]);obj.to_mesh_clear();return co
reset();rest=evaluated();leg_indices=[x.index for x in body.data.vertices if sum(w for n,w in weights(x).items()if family(n)=='leg')>.55]
def arm_probe():
 reset();turn('elbow-1',(1,0,0),.65);turn('elbow1',(1,0,0),-.4);posed=evaluated();d=np.linalg.norm(posed[leg_indices]-rest[leg_indices],axis=1);return {'max':float(d.max()),'p95':float(np.percentile(d,95)),'vertices':len(d)}
before=arm_probe();changed=0
for vertex in body.data.vertices:
 ws=weights(vertex);arm=sum(w for n,w in ws.items()if family(n)=='arm');leg=sum(w for n,w in ws.items()if family(n)=='leg')
 if min(arm,leg)<=1e-7:continue
 # Forelimbs and hindlimbs have no shared joint. Surface proximity must not blend them.
 remove='arm'if leg>=arm else 'leg';ws={n:w for n,w in ws.items()if family(n)!=remove};total=sum(ws.values())
 for group in body.vertex_groups:group.remove([vertex.index])
 for n,w in ws.items():body.vertex_groups[n].add([vertex.index],w/total,'REPLACE')
 changed+=1
menu_leg_fix={}
if asset=='skinny':
 sys.path.insert(0,str(Path(__file__).resolve().parent))
 from skinny_menu_rigfix import smooth_left_leg_boundary
 menu_leg_fix=smooth_left_leg_boundary(body)
after=arm_probe();reset();rest=evaluated()
assert after['max']<1e-5,after
duration={'heavy':4.8,'skinny':4.8,'medium':5.4}[asset];fps=20;frames=round(duration*fps)
# Three readable, fully modelled fly projectiles, independent wing hinges.
flies=[]
def material(name,color,rough=.5,metal=0):
 m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True;p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Roughness'].default_value=rough;p.inputs['Metallic'].default_value=metal;return m
def ellipsoid(name,parent,loc,scale,mat):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=16,ring_count=8,location=(0,0,0));o=bpy.context.object;o.name=name;o.parent=parent;o.location=loc;o.scale=scale;o.data.materials.append(mat)
 for p in o.data.polygons:p.use_smooth=True
 return o
def curve(name,parent,points,mat,width):
 data=bpy.data.curves.new(name,'CURVE');data.dimensions='3D';data.bevel_depth=width;data.bevel_resolution=2;s=data.splines.new('POLY');s.points.add(len(points)-1)
 for p,co in zip(s.points,points):p.co=(*co,1)
 ob=bpy.data.objects.new(name,data);scene.collection.objects.link(ob);ob.parent=parent;data.materials.append(mat);return ob
if asset=='medium':
 shell=material('Menu fly iridescent carapace',(.025,.095,.068),.32,.28);eye=material('Menu fly amber eye',(.42,.095,.025),.3);wing=material('Menu fly pearl wings',(.64,.81,.83),.34);dark=material('Menu fly legs',(.025,.033,.02),.7)
 for i in range(3):
  root=bpy.data.objects.new(f'MenuFly_{i}',None);scene.collection.objects.link(root);ellipsoid('Segmented abdomen',root,(0,.012,0),(.019,.034,.022),shell);ellipsoid('Thorax',root,(0,-.021,.004),(.024,.022,.025),shell);ellipsoid('Head',root,(0,-.044,.005),(.022,.017,.022),dark)
  for side in [-1,1]:
   ellipsoid('Compound amber eye',root,(side*.017,-.05,.009),(.012,.012,.015),eye)
   for j in range(3):curve('Jointed fly leg',root,[(side*.015,-.018+j*.018,-.01),(side*.04,-.03+j*.022,-.023),(side*.053,-.02+j*.025,-.038)],dark,.0015)
  wings=[]
  for side in [-1,1]:
   hinge=bpy.data.objects.new('Independent wing hinge',None);scene.collection.objects.link(hinge);hinge.parent=root;hinge.location=(side*.01,-.018,.015)
   o=ellipsoid('Pearl flight wing',hinge,(side*.034,.008,.005),(.044,.022,.0025),wing);o.rotation_euler.z=side*-.3
   curve('Wing vein',hinge,[(0,0,.009),(side*.045,.004,.009),(side*.07,.009,.009)],dark,.0005);wings.append((hinge,side))
  flies.append((root,wings))
support_names=['ankle1','wrist-1'] if asset=='skinny' else ['ankle-1','ankle1']
metrics=[]
def pose(t):
 reset();hands={s:P['wrist'+str(s)].copy()for s in [-1,1]};feet={s:P['ankle'+str(s)].copy()for s in [-1,1]};wrist_turn={-1:0,1:0}
 if asset=='heavy':
  wind=track(t,[(0,0),(.55,0),(1.15,1),(1.5,.5),(1.68,0),(2,0),(2.9,0),(4.8,0)])
  hit=track(t,[(0,0),(1.5,0),(1.67,1),(1.75,1),(2.12,0),(4.8,0)])
  lift=track(t,[(0,0),(.55,0),(1.2,1),(1.75,1),(2.8,0),(4.8,0)])
  contact=track(t,[(0,0),(1.35,0),(1.67,1),(1.85,1),(2.18,.35),(2.8,0),(4.8,0)])
  turn('spine',(1,0,0),-.08*wind+.055*hit);turn('head',(1,0,0),.11*wind-.05*hit)
  rig.pose.bones['pelvis'].location=Q['pelvis'].inverted()@v((0,-.030*wind-.015*hit,-.012*hit))
  for s in [-1,1]:
   raised=P['wrist'+str(s)]+v((s*.055,.24,-.09));target=v((s*.27,.40,.60))
   hands[s]=P['wrist'+str(s)].lerp(raised,lift).lerp(target,contact);wrist_turn[s]=-.55*contact
  ripple=math.sin(max(0,t-1.67)*22)*math.exp(-max(0,t-1.67)*5)if t>1.67 else 0
  rig.pose.bones['belly'].scale=(1+.038*hit+.012*ripple,1+.025*hit,1-.055*hit+.012*ripple)
  turn('jaw',(1,0,0),.055*hit)
 elif asset=='skinny':
  shift=track(t,[(0,0),(.55,0),(1.1,1),(2.1,1),(2.8,0),(4.8,0)]);chamber=track(t,[(0,0),(.85,0),(1.3,1),(1.48,1),(1.7,0),(2,0),(2.27,1),(2.8,0),(4.8,0)])
  kick=track(t,[(0,0),(1.45,0),(1.72,1),(1.94,1),(2.28,0),(4.8,0)])
  rig.pose.bones['pelvis'].location=Q['pelvis'].inverted()@v((.025*shift,-.035*shift,.015*shift));turn('spine',(0,1,0),-.04*shift);turn('head',(0,1,0),.10*shift)
  bpy.context.view_layer.update();hip=rig.pose.bones['hip-1'].head.copy();length=(P['knee-1']-P['hip-1']).length+(P['ankle-1']-P['knee-1']).length
  raised=P['ankle-1']+v((.13,.23,.08));extended=hip+v((-.30,.36,.88)).normalized()*length*.94
  feet[-1]=P['ankle-1'].lerp(raised,chamber).lerp(extended,kick)
  hands[1]+=v((.07*shift,.10*shift,-.06*shift));turn('jaw',(1,0,0),.04*kick)
 else:
  inhale=track(t,[(0,0),(.65,0),(1.25,1),(1.58,1),(1.75,.4),(2.35,.1),(3.25,0),(5.4,0)])
  shots=[1.62,1.80,1.98];recoil=sum(max(0,1-(t-a)/.22)*smooth((t-a)/.04)if 0<=t-a<.22 else 0 for a in shots)
  rig.pose.bones['pelvis'].location=Q['pelvis'].inverted()@v((0,.018*inhale,-.02*recoil));turn('spine',(1,0,0),-.06*inhale-.075*recoil);turn('head',(1,0,0),-.08*inhale+.09*recoil)
  turn('jaw',(1,0,0),.19*max(recoil,inhale*.45));rig.pose.bones['throat'].scale=(1+.13*inhale,1+.11*inhale,1+.16*inhale);rig.pose.bones['belly'].scale=(1+.035*inhale,1+.04*inhale,1+.055*inhale)
  for s in [-1,1]:hands[s]+=v((s*.018*inhale,.018*inhale,-.018*recoil))
  bpy.context.view_layer.update();mouth=rig.pose.bones['mouth'].head.copy()
  for i,(root,wings)in enumerate(flies):
   age=t-shots[i];visible=0<=age<.72;root.scale=(1,1,1)if visible else (.00001,)*3
   p=max(0,age)/.72;root.location=mouth+v((.10+p*(.55+i*.055),.015+math.sin(p*math.pi)*.15,.04+p*.48));root.rotation_euler=(.2,0,-1.0)
   for hinge,side in wings:hinge.rotation_euler.y=side*(.15+math.sin(age*math.tau*35)*.8)
 errors=[]
 for s in [-1,1]:
  pole=P['knee'+str(s)]+v((s*.3,0,-.1))
  if asset=='skinny' and s==-1:
   bpy.context.view_layer.update();pole=P['knee-1']+(rig.pose.bones['hip-1'].head-P['hip-1'])
  errors.append(solve('hip'+str(s),'knee'+str(s),'ankle'+str(s),feet[s],pole))
  errors.append(solve('shoulder'+str(s),'elbow'+str(s),'wrist'+str(s),hands[s],P['elbow'+str(s)]+v((s*.2,-.04,0))))
  if wrist_turn[s]:setq(rig.pose.bones['wrist'+str(s)],Quaternion(v((1,0,0)),wrist_turn[s])@Q['wrist'+str(s)])
  # Spread fingers on belly impact; support toes remain constant.
  for i in range(1,5):
   n='finger'+str(s)+'_'+str(i)
   if n in Q:turn(n,(1,0,0),.025)
   if n+'_tip'in Q:turn(n+'_tip',(1,0,0),.04)
 blink=max(0,1-abs(t-.32)/.09)
 for n in ['lidL','lidR']:
  if n in Q:turn(n,(1,0,0),-math.pi*(1-blink))
 bpy.context.view_layer.update();support={n:(rig.pose.bones[n].head-P[n]).length for n in support_names};metrics.append({'time':t,'support_error':support,'solver_error':max(errors)})
 return {'hands':{str(s):list(hands[s])for s in [-1,1]},'feet':{str(s):list(feet[s])for s in [-1,1]}}
scene.render.engine='CYCLES';scene.cycles.samples=12;scene.cycles.use_denoising=True
try:
 prefs=bpy.context.preferences.addons['cycles'].preferences;prefs.compute_device_type='OPTIX';prefs.get_devices()
 for device in prefs.devices:device.use=device.type!='CPU'
 if any(device.type!='CPU'for device in prefs.devices):scene.cycles.device='GPU'
except Exception as exc:print('CPU fallback',repr(exc),flush=True)
scene.render.film_transparent=True;scene.render.resolution_x=448;scene.render.resolution_y=448;scene.render.resolution_percentage=100;scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGBA';scene.render.fps=fps
scene.camera.location=(1.2,-5,1.9);scene.camera.rotation_euler=(Vector((0,0,.5))-scene.camera.location).to_track_quat('-Z','Y').to_euler();scene.camera.data.ortho_scale=2.05 if asset=='heavy'else 1.85
action=bpy.data.actions.new('MenuAbilityPerformance');action.use_fake_user=True;rig.animation_data.action=action;scene.frame_start=1;scene.frame_end=frames
states=[]
for frame in range(frames+1):
 t=min(duration,frame/fps);scene.frame_set(frame+1);states.append(pose(t))
 for pb in rig.pose.bones:
  for key in ['location','rotation_quaternion','scale']:pb.keyframe_insert(key,frame=frame+1,group=pb.name)
 for root,wings in flies:
  root.keyframe_insert('location',frame=frame+1);root.keyframe_insert('scale',frame=frame+1);root.keyframe_insert('rotation_euler',frame=frame+1)
  for hinge,_ in wings:hinge.keyframe_insert('rotation_euler',frame=frame+1)
scene.frame_end=frames+1
report={'menu_leg_fix':menu_leg_fix,'id':asset,'duration':duration,'fps':fps,'frames':frames,'source':str(source),'source_sha256':source_hash,'menu_only':True,'cross_limb_weight_fixes':changed,'arm_only_hindlimb_displacement_before':before,'arm_only_hindlimb_displacement_after':after,'support_max':{n:max(m['support_error'][n]for m in metrics)for n in support_names},'solver_max':max(m['solver_error']for m in metrics),'states':states,'metrics':metrics,'device':scene.cycles.device}
# Exact matching rest pose across wrap. All displaced limbs are restored before the quiet tail.
(out/f'{asset}-author.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
assert states[0]==states[-1],(states[0],states[-1])
assert max(report['support_max'].values())<.001,report['support_max']
scene.frame_set(1);bpy.ops.wm.save_as_mainfile(filepath=str(work/(asset+'.blend')),compress=True)
times={'heavy':[0,1.15,1.67,2.25,3.1],'skinny':[0,1.28,1.8,2.3,3.1],'medium':[0,1.35,1.86,2.5,3.4]}[asset]
if mode=='sample':
 for i,t in enumerate(times):scene.frame_set(round(t*fps)+1);scene.render.filepath=str(out/f'{asset}-sample-{i}.png');bpy.ops.render.render(write_still=True)
else:
 dest=r/'work/cartoon-menu-frames'/asset;dest.mkdir(exist_ok=True)
 for frame in range(frames):
  scene.frame_set(frame+1);scene.render.filepath=str(dest/f'{frame:03d}.png');bpy.ops.render.render(write_still=True)
report['source_unchanged']=hashlib.sha256(source.read_bytes()).hexdigest()==source_hash;assert report['source_unchanged']
(out/f'{asset}-author.json').write_text(json.dumps(report,indent=2),encoding='utf-8');print('AUTHORED',asset,json.dumps({k:report[k]for k in ['duration','frames','cross_limb_weight_fixes','arm_only_hindlimb_displacement_before','arm_only_hindlimb_displacement_after','support_max','device']}),flush=True)
