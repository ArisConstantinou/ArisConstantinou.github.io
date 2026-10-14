"""Editable Greek fantasy kit. Metres, Z-up authoring, Y-up glTF export.
Original Innerscene column retained separately under assets, CC0.
No generated textures or paid asset services. Individual bevelled components
remain editable in the .blend; runtime meshes are merged by material only.
"""
import bpy, math, os, json
from mathutils import Vector
ROOT=os.path.abspath('source/greek-environment')
OUT=os.path.abspath('_source/public/greek-sanctuary')
os.makedirs(OUT,exist_ok=True)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
def material(name,color,metal=0,rough=.7):
 m=bpy.data.materials.new(name);m.diffuse_color=(*color,1);m.use_nodes=True
 p=m.node_tree.nodes.get('Principled BSDF');p.inputs['Base Color'].default_value=(*color,1);p.inputs['Metallic'].default_value=metal;p.inputs['Roughness'].default_value=rough
 return m
stone=material('Pentelic ivory limestone',(.65,.58,.43),0,.82)
light=material('Carved limestone edges',(.82,.75,.59),0,.77)
bronze=material('Oxidised bronze',(.24,.18,.085),.72,.45)
gold=material('Worn bronze highlights',(.56,.37,.13),.75,.42)
blue=material('Faded Aegean blue pigment',(.045,.12,.16),.15,.82)
red=material('Faded iron oxide red',(.22,.065,.04),0,.85)
wood=material('Seasoned cypress heartwood',(.24,.105,.043),0,.92)
dark=material('Recessed stone shadow',(.20,.22,.19),0,.95)
parts={};current=None
def register(o,name,mat):
 o.name=name;o.data.materials.clear();o.data.materials.append(mat);parts[current].append(o);return o
def box(name,loc,size,mat=stone,bevel=.018):
 bpy.ops.mesh.primitive_cube_add(size=1,location=loc);o=bpy.context.object;o.dimensions=size;bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 if bevel:
  mod=o.modifiers.new('Dressed edges','BEVEL');mod.width=bevel;mod.segments=2
  bpy.ops.object.modifier_apply(modifier=mod.name)
 return register(o,name,mat)
def uvell(name,loc,size,mat=light,angle=0):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=10,ring_count=6,location=loc);o=bpy.context.object;o.scale=size;o.rotation_euler[1]=angle
 bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
 for p in o.data.polygons:p.use_smooth=True
 return register(o,name,mat)
def disk(name,loc,radius,depth,mat=bronze):
 bpy.ops.mesh.primitive_cylinder_add(vertices=32,radius=radius,depth=depth,location=loc,rotation=(math.pi/2,0,0));return register(bpy.context.object,name,mat)
def laurel(cx,y,cz,r=.28,mat=gold):
 for side in [-1,1]:
  for i in range(7):
   a=(-1.1+i*.32)*side;x=cx+side*r*math.cos(a);z=cz+r*math.sin(a)
   uvell('Carved laurel leaf',(x,y,z),(.045,.027,.095),mat,side*(-.55+i*.21))
 disk('Sun disk',(cx,y+.008,cz),r*.31,.055,mat)
 for i in range(12):
  a=i*math.tau/12;o=box('Sun ray',(cx+math.sin(a)*r*.49,y,cz+math.cos(a)*r*.49),(.019,.025,.09),mat,.007);o.rotation_euler[1]=a
def meander(x,y,z,length,unit=.42,mat=blue):
 n=max(1,round(length/unit));u=length/n
 for i in range(n):
  a=x-length/2+i*u
  for xx,zz,w,h in [(0,0,1,.12),(.10,.10,.12,.74),(.10,.72,.75,.12),(.73,.32,.12,.45),(.37,.32,.39,.12),(.37,.32,.12,.22)]:
   box('Greek key relief',(a+(xx+w/2)*u,y,z+(zz+h/2)*u),(w*u,.022,h*u),mat,.003)
def start(name):
 global current;current=name;parts[name]=[]
start('column')
bpy.ops.import_scene.gltf(filepath=ROOT+'/assets/doric-column-original.glb')
for o in list(bpy.context.selected_objects):
 if o.type=='MESH':o.data.materials.clear();o.data.materials.append(light if 'accent' not in o.name else stone);parts[current].append(o)
start('entablature')
box('Architrave',(0,0,3.78),(7.4,1.1,.30),light)
box('Frieze bed',(0,0,4.18),(7.35,.94,.54),stone)
box('Upper cornice',(0,0,4.54),(7.65,1.22,.18),light)
box('Red taenia',(0,-.563,3.96),(7.4,.025,.06),red,.004)
box('Blue frieze ground',(0,-.481,4.21),(7.25,.02,.4),blue,.005)
for x in [-3.3,-2.2,-1.1,0,1.1,2.2,3.3]:
 for dx in [-.12,0,.12]:box('Triglyph rib',(x+dx,-.52,4.20),(.065,.10,.46),light,.008)
 for dx in [-.13,0,.13]:uvell('Gutta',(x+dx,-.54,3.91),(.035,.035,.035),light)
for x in [-2.75,-1.65,-.55,.55,1.65,2.75]:
 box('Metope field',(x,-.498,4.20),(.67,.045,.42),stone,.018);laurel(x,-.548,4.20,.16,light)
meander(0,-.623,4.50,7.35,.25,blue)
for name,bodymat in [('bronze-leaf',bronze),('wood-leaf',wood)]:
 start(name)
 # Hinge at origin, leaf opens into a wall pocket. Positive local X.
 for i in range(8):
  b=box('Door plank',(0.161+i*.322,0,1.77),(.313,.22,3.52),bodymat,.025)
  if name=='wood-leaf':
   for j in range(3):box('Cypress grain groove',(.045+i*.322+j*.08,-.118,1.77),(.009,.008,3.38),dark,.002)
 for y in [-.14,.14]:
  for x in [.12,2.455]:box('Vertical bronze stile',(x,y,1.77),(.12,.07,3.51),gold)
  for z in [.16,1.16,2.30,3.39]:box('Bronze strap',(1.287,y,z),(2.55,.07,.10),gold)
  for x in [.12,2.45]:
   for z in [.17,1.17,2.3,3.39]:uvell('Rivet',(x,y*1.3,z),(.035,.025,.035),gold)
  if name=='bronze-leaf':
   for z in [.68,1.75,2.83]:laurel(1.29,y*1.35,z,.33,gold)
 disk('Door pull escutcheon',(2.15,-.18,1.75),.12,.045,gold)
start('weight')
box('Sacred stone weight',(0,0,0),(.84,.84,.84),stone,.055)
for y in [-.425,.425]:
 box('Weight recessed field',(0,y,0),(.64,.025,.6),dark,.018);laurel(0,y*1.04,0,.21,light)
for z in [-.32,.32]:box('Bronze weight band',(0,0,z),(.87,.87,.065),bronze,.014)
start('plate')
box('Pressure plate surround',(0,0,-.035),(1.6,1.6,.10),bronze,.045)
box('Moving slab',(0,0,.012),(1.35,1.35,.07),stone,.055)
# Inlaid top key is authored flat by rotating a completed strip collection.
before=len(parts[current]);meander(0,-.56,0,1.12,.28,gold)
for o in parts[current][before:]:
 x,y,z=o.location;o.location=(x,-.50+z,.054);o.rotation_euler.x=math.pi/2
start('shield')
# Round Greek aspis, shallow dished profile with bronze boss and lambda crest.
disk('Aspis face',(0,0,0),.52,.10,bronze)
disk('Aspis inset',(0,-.061,0),.455,.035,red)
for i in range(32):
 a=i*math.tau/32;uvell('Aspis rim stud',(math.sin(a)*.49,-.065,math.cos(a)*.49),(.015,.015,.015),gold)
for side in [-1,1]:
 o=box('Lambda',(side*.105,-.092,.015),(.055,.025,.42),gold,.008);o.rotation_euler[1]=side*.48
# Separate asset collections and preserve a complete editable source.
for name,objects in parts.items():
 coll=bpy.data.collections.new(name);bpy.context.scene.collection.children.link(coll)
 for o in objects:
  for old in list(o.users_collection):old.objects.unlink(o)
  coll.objects.link(o)
bpy.ops.wm.save_as_mainfile(filepath=ROOT+'/greek-sanctuary-kit.blend')
report={}
for name,objects in parts.items():
 bpy.ops.object.select_all(action='DESELECT')
 # Make a disposable export scene: join per material, leaving .blend untouched.
 clones=[]
 for src in objects:
  o=src.copy();o.data=src.data.copy();bpy.context.collection.objects.link(o);o.matrix_world=src.matrix_world.copy();o.parent=None;clones.append(o)
 groups={}
 for o in clones:groups.setdefault(o.data.materials[0].name,[]).append(o)
 merged=[]
 for mat,group in groups.items():
  bpy.ops.object.select_all(action='DESELECT')
  for o in group:o.select_set(True)
  bpy.context.view_layer.objects.active=group[0];bpy.ops.object.join();merged.append(bpy.context.object)
 bpy.ops.object.select_all(action='DESELECT')
 for o in merged:o.select_set(True)
 bpy.ops.export_scene.gltf(filepath=OUT+'/'+name+'.glb',export_format='GLB',use_selection=True,export_yup=True,export_animations=False)
 report[name]={'bytes':os.path.getsize(OUT+'/'+name+'.glb'),'meshes':len(merged),'triangles':sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in merged)}
 for o in merged:bpy.data.objects.remove(o,do_unlink=True)
open(ROOT+'/kit-report.json','w').write(json.dumps(report,indent=2))
print(json.dumps(report))
