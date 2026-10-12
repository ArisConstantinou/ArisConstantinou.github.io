"""Authored clay/iron siege suit, rigid skeletal joints, metres. Blender 5.1.2.
Reuse the project's geometry/export utilities; no external mesh or paid generator.
"""
import pathlib, runpy, math, json
import bpy
from mathutils import Vector

BASE=pathlib.Path(__file__).resolve().parents[2]
api=runpy.run_path(str(BASE/'source/bosses/build_bosses.py'))
g=api['mesh'].__globals__
SRC=BASE/'source/hearth-bulwark'; OUT=BASE/'_source/public/models/hearth-bulwark'
OUT.mkdir(parents=True,exist_ok=True)
g.update(SRC=SRC,OUT=OUT,FPS=30)
mesh,plate,rod,ring,loft,curved,material=[g[x] for x in ['mesh','plate','rod','ring','loft','curved','material']]

bones=[('root',(0,0,1.3),(0,0,1.55),None),('torso',(0,0,1.55),(0,0,2.4),'root'),
 ('pilot',(0,0,2.32),(0,0,2.55),'torso'),('heart',(0,.51,1.84),(0,.7,1.84),'torso'),
 ('inlet',(0,.62,1.28),(0,.8,1.28),'torso'),('rear_door',(0,-.58,2.45),(0,-.58,2.75),'torso'),
 ('ladder',(0,-.67,.05),(0,-.67,.3),'root')]
for s,l in [(1,'L'),(-1,'R')]:
 bones += [(f'upper_{l}',(s*1.0,0,3.05),(s*1.37,0,2.37),'torso'),
  (f'lower_{l}',(s*1.37,0,2.37),(s*1.43,.08,1.64),f'upper_{l}'),
  (f'hand_{l}',(s*1.43,.08,1.64),(s*1.43,.08,1.25),f'lower_{l}'),
  (f'thigh_{l}',(s*.55,0,1.3),(s*.64,0,.8),'root'),
  (f'shin_{l}',(s*.64,0,.8),(s*.64,0,.24),f'thigh_{l}'),
  (f'foot_{l}',(s*.64,0,.24),(s*.64,.5,.24),f'shin_{l}'),
  (f'front_door_{l}',(s*.69,.56,2.55),(s*.69,.56,2.9),'torso')]
 for j in range(4): bones.append((f'finger_{l}{j}',(s*1.43+(j-1.5)*.135,.18,1.52),(s*1.43+(j-1.5)*.135,.33,1.3),f'hand_{l}'))
bones += [('nozzle',(-1.43,-.21,1.6),(-1.43,-.21,1.28),'lower_R')]
rig=g['new_rig']('HEARTH BULWARK',bones);g.update(rig=rig,parts=[])
clay=material('Refractory ochre clay',(.47,.34,.22));edge=material('Clay chipped bevel',(.62,.48,.33))
# Shared locally authored fired-clay maps, with pores and shallow mineral grain.
base,normal,rough=g['surface_maps']('stone')
for mat in [clay,edge]:
 nodes=mat.node_tree.nodes;links=mat.node_tree.links;p=nodes.get('Principled BSDF')
 tex=nodes.new('ShaderNodeTexImage');tex.image=base
 tint=nodes.new('ShaderNodeMix');tint.data_type='RGBA';tint.blend_type='MULTIPLY';tint.inputs[0].default_value=1;tint.inputs[7].default_value=mat.diffuse_color
 links.new(tex.outputs['Color'],tint.inputs[6]);links.new(tint.outputs[2],p.inputs['Base Color'])
 tex=nodes.new('ShaderNodeTexImage');tex.image=normal;n=nodes.new('ShaderNodeNormalMap');n.inputs['Strength'].default_value=.6;links.new(tex.outputs['Color'],n.inputs['Color']);links.new(n.outputs['Normal'],p.inputs['Normal'])
 tex=nodes.new('ShaderNodeTexImage');tex.image=rough;links.new(tex.outputs['Color'],p.inputs['Roughness'])
iron=material('Hammered iron straps',(.12,.14,.15),.72);bronze=material('Sooted brass inlet',(.34,.22,.09),.67)
dark=material('Cold kiln interior',(.035,.028,.021));leather=material('Pilot leather seat',(.15,.085,.037))
glow=material('Heart embers',(.95,.18,.015),0,0)

# Deliberately modelled panels: broken corners, separate straps, rivets and joints.
def panel(name,c,size,bone):
 o=plate(name,c,size,clay,bone,bevel=.14)
 x,y,z=c;w,d,h=size
 for zz in [-.38,.38]:plate(name+' iron strap '+str(zz),(x,y+d*.49,z+h*zz),(w*.94,.045,.07),iron,bone,bevel=.08)
 for xx in [-.38,.38]:
  for zz in [-.37,.37]:rod(name+' rivet',(x+w*xx,y+d*.49,z+h*zz),(x+w*xx,y+d*.54+.018,z+h*zz),.027,bronze,bone,n=8)
 # Visible carved fracture on the plate face rather than uniformly smooth boxes.
 g['engraving'](name+' fired crack',[(x-w*.13,y+d*.516,z+h*.23),(x+w*.025,y+d*.52,z+h*.07),(x-w*.07,y+d*.518,z-h*.03)],.006,dark,bone)
 return o

plate('Pelvis forging',(0,0,1.25),(1.1,.79,.42),iron,'root')
for s,l in [(1,'L'),(-1,'R')]:
 panel('Hip armour '+l,(s*.63,.08,1.37),(.58,.84,.51),'root')
 panel('Cockpit side '+l,(s*.71,0,3.0),(.24,1.15,1.55),'torso')
 panel('Chest cheek '+l,(s*.59,.29,2.22),(.57,.65,.46),'torso')
 panel('Shoulder '+l,(s*1.0,-.015,3.02),(.74,1.08,.82),'upper_'+l)
 rod('Shoulder axle '+l,(s*.85,0,3.06),(s*1.26,0,3.06),.25,iron,'upper_'+l,n=16)
 ring('Shoulder brass rim '+l,(s*1.25,0,3.06),.23,.035,bronze,'upper_'+l,orient='X')
 panel('Upper arm '+l,(s*1.28,0,2.64),(.52,.64,.45),'upper_'+l)
 rod('Elbow axle '+l,(s*1.15,0,2.37),(s*1.57,0,2.37),.21,iron,'lower_'+l,n=16)
 loft('Octagonal fired-clay forearm '+l,[(1.62,.28,.32,s*1.43,.02),(1.71,.34,.39,s*1.43,.02),(2.22,.34,.39,s*1.43,.02),(2.30,.28,.32,s*1.43,.02)],clay,'lower_'+l,n=8)
 for dz in [-.23,.23]:ring('Forearm binding '+l+str(dz),(s*1.43,.02,1.97+dz),.34,.025,iron,'lower_'+l,stretch=1.13)
 panel('Backhand '+l,(s*1.43,-.04,1.48),(.60,.43,.35),'hand_'+l)
 for j in range(4):
  x=s*1.43+(j-1.5)*.135
  rod('Finger pin '+l+str(j),(x-.058,.18,1.52),(x+.058,.18,1.52),.065,iron,'finger_'+l+str(j),n=8)
  plate('Finger first '+l+str(j),(x,.25,1.39),(.115,.20,.24),iron,'finger_'+l+str(j))
  plate('Finger tip '+l+str(j),(x,.31,1.25),(.12,.18,.16),bronze,'finger_'+l+str(j))
 plate('Thumb '+l,(s*1.43-s*.36,.2,1.45),(.16,.29,.23),iron,'hand_'+l)
 rod('Hip bearing '+l,(s*.43,0,1.30),(s*.75,0,1.30),.21,iron,'thigh_'+l,n=12)
 panel('Thigh '+l,(s*.60,0,1.03),(.66,.81,.42),'thigh_'+l)
 rod('Knee axle '+l,(s*.39,0,.80),(s*.89,0,.8),.18,iron,'shin_'+l,n=12)
 panel('Shin '+l,(s*.64,.06,.52),(.76,.86,.51),'shin_'+l)
 plate('Wide planted heel '+l,(s*.64,-.01,.17),(.86,1.05,.31),iron,'foot_'+l)
 panel('Toe plate '+l,(s*.64,.40,.18),(.78,.48,.26),'foot_'+l)
 panel('Cockpit front door '+l,(s*.50,.61,3.02),(.48,.13,1.03),'front_door_'+l)
 rod('Front door hinge '+l,(s*.69,.6,2.58),(s*.69,.6,3.54),.04,bronze,'front_door_'+l,n=8)

# Cabin is a hollow frame with thermal floor, real pilot space and rear entrance.
plate('Insulating cockpit floor',(0,-.01,2.4),(1.5,1.22,.18),edge,'torso')
plate('Cockpit top beam',(0,0,3.79),(1.65,1.26,.21),iron,'torso')
for s in [-1,1]:plate('Top clay lintel '+str(s),(s*.53,.01,3.81),(.5,1.3,.20),edge,'torso')
plate('Pilot seat',(0,-.12,2.6),(.67,.48,.16),leather,'torso')
plate('Pilot backrest',(0,-.39,2.87),(.64,.13,.55),leather,'torso')
for s in [-1,1]:rod('Pilot handle '+str(s),(s*.29,.22,2.65),(s*.29,.22,2.96),.039,bronze,'torso',n=8)
panel('Hinged rear boarding gate',(0,-.64,2.93),(1.16,.15,1.0),'rear_door')
for s in [-1,1]:rod('Ladder side '+str(s),(s*.35,-1.32,.04),(s*.35,-.76,2.44),.055,iron,'ladder',n=8)
for i in range(8):
 z=.16+i*.29;y=-1.3+.56*z/2.44
 plate('Ladder tread '+str(i),(0,y,z),(.70,.20,.06),bronze,'ladder')

# A physically hollow hexagonal kiln heart; heat is below the insulated pilot deck.
heart=[(-.42,1.62),(-.47,1.99),(-.28,2.23),(.28,2.23),(.47,1.99),(.42,1.62),(0,1.4)]
vs=[(x,.38,z) for x,z in heart];mesh('Dark recessed hearth chamber',vs,[tuple(range(len(vs)))],dark,'torso')
plate('Solid firebox backstop',(0,.30,1.85),(.83,.16,.78),dark,'torso')
for i,(x,z) in enumerate(heart):
 x2,z2=heart[(i+1)%len(heart)]
 rod('Heart forged surround '+str(i),(x,.63,z),(x2,.63,z2),.069,bronze,'torso',n=8)
 rod('Heart clay lining '+str(i),(x*.88,.54,1.84+(z-1.84)*.88),(x2*.88,.54,1.84+(z2-1.84)*.88),.048,edge,'torso',n=6)
rod('Heart cross guard',(-.40,.67,1.83),(.4,.67,1.83),.041,iron,'torso',n=8)
rod('Heart vertical guard',(0,.67,1.48),(0,.67,2.16),.041,iron,'torso',n=8)
for i in range(7):g['gem']('Banked ember '+str(i),((i-3)*.08,.45,1.62+math.sin(i*3)*.02),(.052,.05,.04),glow,'torso')
ring('Charge inlet',(0,.65,1.28),.15,.04,bronze,'torso',orient='Y')
rod('Inlet bore',(0,.46,1.28),(0,.63,1.28),.12,dark,'torso',n=16)

# Outlet lives on the underside of the right forearm, behind the free hand.
rod('Refractory forearm fire sleeve',(-1.43,-.24,2.15),(-1.43,-.24,1.32),.13,clay,'lower_R',n=16)
ring('Forearm outlet lip',(-1.43,-.24,1.33),.13,.038,bronze,'lower_R')
rod('Deep dark nozzle bore',(-1.43,-.24,1.35),(-1.43,-.24,1.31),.099,dark,'lower_R',n=16)
curved('Flexible woven fire conduit',[(-.65,-.46,1.84),(-1.0,-.40,2.1),(-1.28,-.24,2.35),(-1.43,-.24,2.16)],[.075]*4,iron,'upper_R',n=8)

rot=g['rotate'];root=g['move_root'];ramp=g['ramp'];pulse=g['pulse']
def kneel(q):
 bend=.8*q;shin=-1.35*q
 # FK compensation fixes both flat feet at ground throughout the kneel.
 root(y=-.5*math.sin(bend)-.56*math.sin(bend+shin),z=-.5*(1-math.cos(bend))-.56*(1-math.cos(bend+shin)))
 delta=Vector((0,.5*math.sin(bend)+.56*math.sin(bend+shin),.5*(1-math.cos(bend))+.56*(1-math.cos(bend+shin))))
 b=rig.pose.bones['ladder'];b.location=b.bone.matrix_local.to_quaternion().inverted()@delta
 for l in ['L','R']:
  rot('thigh_'+l,g['X'],bend);rot('shin_'+l,g['X'],shin);rot('foot_'+l,g['X'],-bend-shin)
  rot('upper_'+l,g['X'],.16*q)
def pose(clip,t,d):
 p=t*2*math.pi/d
 if clip=='Sleep':kneel(1)
 elif clip=='Wake':kneel(1-ramp(t,.15,1.8))
 elif clip=='Deplete':kneel(ramp(t,.15,1.8))
 elif clip in ['Idle','Walk']:
  rot('torso',g['Z'],.013*math.sin(p))
  if clip=='Walk':
   for s,l in [(1,'L'),(-1,'R')]:
    a=math.sin(p+(0 if s==1 else math.pi));rot('thigh_'+l,g['X'],a*.25);rot('shin_'+l,g['X'],-max(0,a)*.42);rot('foot_'+l,g['X'],-a*.25+max(0,a)*.42)
    rot('upper_'+l,g['X'],-a*.10)
   root(z=.026*(1-math.cos(p*2)))
 elif clip in ['Fire','Throw']:
  q=1 if clip=='Fire' else pulse(t,0,d)
  rot('upper_R' if clip=='Fire' else 'upper_L',g['X'],(1.12 if clip=='Fire' else 1.40)*q)
  rot('lower_R' if clip=='Fire' else 'lower_L',g['X'],.12*q)
  for j in range(4):rot(('finger_R' if clip=='Fire' else 'finger_L')+str(j),g['X'],.25*q)
  if clip=='Throw':rot('torso',g['Z'],.14*math.sin(math.pi*t/d))
 elif clip in ['Board','Exit']:
  q=pulse(t,0,d)
  rot('rear_door',g['X'],-1.25*q)
  for s,l in [(1,'L'),(-1,'R')]:rot('front_door_'+l,g['Z'],-s*.95*q)
 # Open cockpit leaves the magician's head and hat clearly visible when occupied.
 if clip in ['Idle','Walk','Fire','Throw']:
  for s,l in [(1,'L'),(-1,'R')]:rot('front_door_'+l,g['Z'],s*1.65)

import bmesh
for part in g['parts']:
 bm=bmesh.new();bm.from_mesh(part.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(part.data);bm.free()
data=g['save_export']('hearth-bulwark',{'Sleep':2,'Wake':2.1,'Idle':2.4,'Walk':1.4,'Board':2.4,'Fire':.8,'Throw':.85,'Deplete':2.1,'Exit':2.4},pose)
(SRC/'asset-validation.json').write_text(json.dumps(data,indent=2))
