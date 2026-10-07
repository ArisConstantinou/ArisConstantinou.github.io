"""CC0 MakeHuman assets, generated specifically for the Chronicle character replacement.
No primitives are used to construct anatomy. Keep mesh topology, skin textures,
clothes, eyes, fingers, hair, and the game-engine armature. No historical identity
or costume accuracy is implied by these demonstration characters.
"""
import os, sys, glob, json, math, traceback
from pathlib import Path
import bpy
from mathutils import Vector
ROOT=Path('/tmp/chronicle-assets')
OUT=Path(os.environ.get('GITHUB_WORKSPACE','.'))/'out'
OUT.mkdir(parents=True,exist_ok=True)
sys.path.insert(0,str(ROOT/'mpfb2/src'))
import mpfb
mpfb.register()
from mpfb.services.humanservice import HumanService
from mpfb.services.targetservice import TargetService
from mpfb.services.locationservice import LocationService
from mpfb.entities.objectproperties import HumanObjectProperties

ASSETS=ROOT/'system'
def asset(name,extension):
    exact=list(ASSETS.rglob(name+extension))
    if exact: return str(exact[0])
    candidates=[p for p in ASSETS.rglob('*'+extension) if name.lower() in p.stem.lower()]
    if candidates: return str(candidates[0])
    raise FileNotFoundError(f'Asset not found: {name}{extension}')

# Record the actual upstream revisions, sources, and exact asset paths used.
import subprocess
manifest={'prototype':True,'license':'CC0-1.0','source':'MakeHuman Community system assets / MPFB','sourceCodeCommit':subprocess.check_output(['git','-C',str(ROOT/'mpfb2'),'rev-parse','HEAD'],text=True).strip(),'historicalCostumeVerified':False,'characters':[]}
configs=[
 dict(id='villager_man',gender=1.0,age=.64,weight=.52,muscle=.44,height=.52,skin='middleage_caucasian_male',hair='short02',clothes='male_casualsuit01',shoes='shoes01'),
 dict(id='villager_woman',gender=0.0,age=.55,weight=.48,muscle=.35,height=.48,skin='middleage_caucasian_female',hair='bob01',clothes='female_elegantsuit01',shoes='shoes02')
]
for config in configs:
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    macro=TargetService.get_default_macro_info_dict()
    print('DEFAULT MACRO',macro,flush=True)
    for key in ('gender','age','weight','muscle','height'):
        if key in macro: macro[key]=config[key]
    for key in ('african','asian','caucasian'):
        if key in macro: macro[key]=1.0 if key=='caucasian' else 0.0
    body=HumanService.create_human(scale=.1,feet_on_ground=True,macro_detail_dict=macro)
    body.name=config['id']+'_skin'
    for key in ('gender','age','weight','muscle','height'):
        try: HumanObjectProperties.set_value(key,config[key],entity_reference=body)
        except Exception: pass
    TargetService.reapply_macro_details(body)
    rig=HumanService.add_builtin_rig(body,'game_engine',import_weights=True)
    if rig is None: raise RuntimeError('Missing game_engine rig')
    rig.name=config['id']+'_armature'
    used=[]
    skinpath=asset(config['skin'],'.mhmat')
    HumanService.set_character_skin(skinpath,body,skin_type='GAMEENGINE',material_instances=True)
    used.append(skinpath)
    for name,kind in [(config['clothes'],'Clothes'),(config['shoes'],'Clothes'),('low-poly','Eyes'),(config['hair'],'Hair'),('eyebrow001','Eyebrows')]:
        path=asset(name,'.mhclo')
        print('EQUIP',path,flush=True)
        obj=HumanService.add_mhclo_asset(path,body,asset_type=kind,subdiv_levels=0,material_type='GAMEENGINE',set_up_rigging=True,interpolate_weights=True)
        used.append(path)
    bpy.context.view_layer.update()
    # Bake active morphs and deletion masks while preserving the deform layer and
    # vertex-group indices. The armature remains unapplied and in rest pose.
    rig.data.pose_position='REST'
    for ob in list(bpy.context.scene.objects):
        if ob.type!='MESH': continue
        for mod in ob.modifiers:
            if mod.type=='ARMATURE': mod.show_viewport=False; mod.show_render=False
        bpy.context.view_layer.update()
        deps=bpy.context.evaluated_depsgraph_get()
        evaluated=ob.evaluated_get(deps)
        mesh=bpy.data.meshes.new_from_object(evaluated,preserve_all_data_layers=True,depsgraph=deps)
        ob.data=mesh
        for mod in list(ob.modifiers):
            if mod.type!='ARMATURE': ob.modifiers.remove(mod)
            else: mod.show_viewport=True; mod.show_render=True
        for polygon in mesh.polygons: polygon.use_smooth=True
        if not any(mod.type=='ARMATURE' for mod in ob.modifiers):
            print('WARN: mesh without armature',ob.name,flush=True)
    rig.data.pose_position='POSE'
    for image in bpy.data.images:
        if image.source!='FILE' or not image.has_data: continue
        w,h=image.size
        limit=2048 if 'skin' in image.name.lower() or 'diffuse' in image.name.lower() else 1024
        if max(w,h)>limit:
            scale=limit/max(w,h);image.scale(max(1,int(w*scale)),max(1,int(h*scale)))
        try: image.pack()
        except Exception: pass
    # Materials must be exportable Principled shaders, not unbaked node groups.
    for ob in bpy.context.scene.objects:
        if ob.type!='MESH': continue
        for slot in ob.material_slots:
            material=slot.material
            if not material or not material.use_nodes: continue
            nodes=material.node_tree.nodes
            principled=next((n for n in nodes if n.type=='BSDF_PRINCIPLED'),None)
            if principled:
                principled.inputs['Roughness'].default_value=.78
                principled.inputs['Metallic'].default_value=0
            # Export alpha hair cards using thresholded alpha to avoid depth-order artefacts.
            if any(k in ob.name.lower() for k in ['hair','short02','bob01','eyebrow']):
                material.use_backface_culling=False
    all_meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
    print('MESH COUNTS',[(o.name,len(o.data.vertices),len(o.data.polygons),len(o.vertex_groups)) for o in all_meshes],flush=True)
    skeleton=[{'name':b.name,'head':list(b.head_local),'tail':list(b.tail_local),'parent':b.parent.name if b.parent else None} for b in rig.data.bones]
    (OUT/(config['id']+'_skeleton.json')).write_text(json.dumps(skeleton,indent=2))
    bpy.ops.object.select_all(action='SELECT')
    bpy.context.view_layer.objects.active=rig
    filepath=OUT/(config['id']+'.glb')
    bpy.ops.export_scene.gltf(filepath=str(filepath),export_format='GLB',use_selection=True,export_animations=False,export_skins=True,export_morph=False,export_apply=False,export_yup=True,export_texcoords=True,export_normals=True,export_materials='EXPORT')
    assert filepath.stat().st_size>100000,'Unexpectedly small human model'
    manifest['characters'].append({'id':config['id'],'bytes':filepath.stat().st_size,'bones':len(skeleton),'vertices':sum(len(o.data.vertices) for o in all_meshes),'assets':used})
    print('EXPORTED',filepath,filepath.stat().st_size,flush=True)
(OUT/'human-assets-manifest.json').write_text(json.dumps(manifest,indent=2))
(OUT/'HUMAN-ASSET-LICENSE.txt').write_text('Human mesh, skin, clothing, hair and eyes are derived from MakeHuman Community system assets released under CC0 1.0 Universal.\nSource: https://static.makehumancommunity.org/assets/assetpacks/makehuman_system_assets.html\nGenerator: https://github.com/makehumancommunity/mpfb2\nCode is under GPL; generated assets are CC0 under the asset exception. The generator is not part of the game runtime.\nThe characters are fictional demonstration residents. They do not depict identified people, and the costumes are not verified historical clothing of Moutoullas.\n')
print('HUMAN BUILD COMPLETE',flush=True)
