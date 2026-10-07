"""Build clothed, deform-rigged fictional residents from MakeHuman CC0 assets.
This tool is not the browser runtime. No historical costume accuracy is claimed.
"""
import os, sys, json, subprocess, importlib, zipfile
from pathlib import Path
import bpy
ROOT=Path('/tmp/chronicle-assets')
OUT=Path(os.environ.get('GITHUB_WORKSPACE','.'))/'out'
OUT.mkdir(parents=True,exist_ok=True)
# Modern MPFB is a Blender extension; its namespace must be registered as such.
source=ROOT/'mpfb2/src/mpfb'
archive=ROOT/'mpfb-local.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
    for p in source.rglob('*'):
        if p.is_file() and '__pycache__' not in p.parts:
            z.write(p,p.relative_to(source))
bpy.ops.extensions.package_install_files(filepath=str(archive),enable_on_install=True,repo='user_default')
base=next((name for name in sys.modules if name.startswith('bl_ext.') and name.endswith('.mpfb')),None)
if not base: raise RuntimeError('MPFB extension was not enabled')
HumanService=importlib.import_module(base+'.services.humanservice').HumanService
TargetService=importlib.import_module(base+'.services.targetservice').TargetService
HumanObjectProperties=importlib.import_module(base+'.entities.objectproperties').HumanObjectProperties
ASSETS=ROOT/'system'
def asset(name,ext):
    candidates=list(ASSETS.rglob(name+ext))
    if not candidates: candidates=[p for p in ASSETS.rglob('*'+ext) if name.lower() in p.stem.lower()]
    if not candidates: raise FileNotFoundError(name+ext)
    return str(candidates[0])
manifest={'prototype':True,'license':'CC0-1.0','source':'MakeHuman Community system assets / MPFB','sourceCodeCommit':subprocess.check_output(['git','-C',str(ROOT/'mpfb2'),'rev-parse','HEAD'],text=True).strip(),'historicalCostumeVerified':False,'characters':[]}
configs=[dict(id='villager_man',gender=1.0,age=.64,weight=.52,muscle=.44,height=.52,skin='middleage_caucasian_male',hair='short02',clothes='male_casualsuit01',shoes='shoes01'),dict(id='villager_woman',gender=0.0,age=.55,weight=.48,muscle=.35,height=.48,skin='middleage_caucasian_female',hair='bob01',clothes='female_elegantsuit01',shoes='shoes02')]
for config in configs:
    bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
    macro=TargetService.get_default_macro_info_dict()
    print('DEFAULT MACRO',macro,flush=True)
    for key in ('gender','age','weight','muscle','height'):
        if key in macro:macro[key]=config[key]
    if 'race' in macro:macro['race']={'caucasian':1.0,'asian':0.0,'african':0.0}
    body=HumanService.create_human(scale=.1,feet_on_ground=True,macro_detail_dict=macro)
    body.name=config['id']+'_skin'
    for key in ('gender','age','weight','muscle','height'):
        try:HumanObjectProperties.set_value(key,config[key],entity_reference=body)
        except Exception:pass
    TargetService.reapply_macro_details(body)
    rig=HumanService.add_builtin_rig(body,'game_engine',import_weights=True)
    if rig is None:raise RuntimeError('Missing game_engine rig')
    rig.name=config['id']+'_armature'
    used=[]
    path=asset(config['skin'],'.mhmat')
    HumanService.set_character_skin(path,body,skin_type='GAMEENGINE',material_instances=True);used.append(path)
    for name,kind in [(config['clothes'],'Clothes'),(config['shoes'],'Clothes'),('low-poly','Eyes'),(config['hair'],'Hair'),('eyebrow001','Eyebrows')]:
        path=asset(name,'.mhclo');print('EQUIP',path,flush=True)
        HumanService.add_mhclo_asset(path,body,asset_type=kind,subdiv_levels=0,material_type='GAMEENGINE',set_up_rigging=True,interpolate_weights=True);used.append(path)
    bpy.context.view_layer.update()
    rig.data.pose_position='REST'
    for ob in list(bpy.context.scene.objects):
        if ob.type!='MESH':continue
        for mod in ob.modifiers:
            if mod.type=='ARMATURE':mod.show_viewport=False;mod.show_render=False
        bpy.context.view_layer.update();deps=bpy.context.evaluated_depsgraph_get()
        evaluated=ob.evaluated_get(deps)
        mesh=bpy.data.meshes.new_from_object(evaluated,preserve_all_data_layers=True,depsgraph=deps)
        ob.data=mesh
        for mod in list(ob.modifiers):
            if mod.type!='ARMATURE':ob.modifiers.remove(mod)
            else:mod.show_viewport=True;mod.show_render=True
        for polygon in mesh.polygons:polygon.use_smooth=True
    rig.data.pose_position='POSE'
    for image in bpy.data.images:
        if image.source!='FILE' or not image.has_data:continue
        w,h=image.size;limit=2048 if 'skin' in image.name.lower() or 'diffuse' in image.name.lower() else 1024
        if max(w,h)>limit:
            scale=limit/max(w,h);image.scale(max(1,int(w*scale)),max(1,int(h*scale)))
        try:image.pack()
        except Exception:pass
    for ob in bpy.context.scene.objects:
        if ob.type!='MESH':continue
        for slot in ob.material_slots:
            m=slot.material
            if not m or not m.use_nodes:continue
            p=next((n for n in m.node_tree.nodes if n.type=='BSDF_PRINCIPLED'),None)
            if p:p.inputs['Roughness'].default_value=.78;p.inputs['Metallic'].default_value=0
            if any(k in ob.name.lower() for k in ('hair','short02','bob01','eyebrow')):m.use_backface_culling=False
    meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
    skeleton=[{'name':b.name,'head':list(b.head_local),'tail':list(b.tail_local),'parent':b.parent.name if b.parent else None,'matrix':[list(r) for r in b.matrix_local]} for b in rig.data.bones]
    (OUT/(config['id']+'_skeleton.json')).write_text(json.dumps(skeleton,indent=2))
    bpy.ops.object.select_all(action='SELECT');bpy.context.view_layer.objects.active=rig
    filepath=OUT/(config['id']+'.glb')
    bpy.ops.export_scene.gltf(filepath=str(filepath),export_format='GLB',use_selection=True,export_animations=False,export_skins=True,export_morph=False,export_apply=False,export_yup=True,export_texcoords=True,export_normals=True,export_materials='EXPORT')
    assert filepath.stat().st_size>100000,'Unexpectedly small model'
    manifest['characters'].append({'id':config['id'],'bytes':filepath.stat().st_size,'bones':len(skeleton),'vertices':sum(len(o.data.vertices) for o in meshes),'assets':used})
    print('EXPORTED',filepath,filepath.stat().st_size,flush=True)
(OUT/'human-assets-manifest.json').write_text(json.dumps(manifest,indent=2))
(OUT/'HUMAN-ASSET-LICENSE.txt').write_text('Human meshes, skin, clothing, hair and eyes are derived from MakeHuman Community system assets released under CC0 1.0 Universal.\nhttps://static.makehumancommunity.org/assets/assetpacks/makehuman_system_assets.html\nGenerator: https://github.com/makehumancommunity/mpfb2\nGenerator code is GPL; output assets are CC0 under the asset exception. Generator is not part of the game runtime.\nThese are fictional demonstration residents. They do not represent identified people or verified historical clothing of Moutoullas.\n')
print('HUMAN BUILD COMPLETE',flush=True)
