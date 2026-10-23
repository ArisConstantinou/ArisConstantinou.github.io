"""Export existing authored actors, with shared skin/material LODs for mobile.
Original .blend files and their full-resolution maps remain read-only.
"""
import bpy, json, os, hashlib, time
from pathlib import Path
import sys
sys.path.insert(0,str(Path(__file__).resolve().parent))
from importlib.machinery import SourceFileLoader
prepare_surface=SourceFileLoader('native_materials',str(Path(__file__).with_name('native-materials.py'))).load_module().prepare_surface
root=Path(os.environ['CODEX_GENERATED_OUTPUT']);out=root/'build/models/redesign';out.mkdir(parents=True,exist_ok=True)
tests=root/'tests/mobile-model-update';inventory=json.loads((tests/'native-inventory.json').read_text())
reports={}
for kind in ['archer','iron-warden']:
    src=Path(inventory[kind]['source']);bpy.ops.wm.open_mainfile(filepath=str(src));scene=bpy.context.scene
    scene.render.use_file_extension=True;bpy.context.preferences.filepaths.save_version=0
    rig=next(o for o in scene.objects if o.type=='ARMATURE');rig.data.pose_position='REST'
    rig.animation_data_create();rig.animation_data.action=None
    for track in list(rig.animation_data.nla_tracks):rig.animation_data.nla_tracks.remove(track)
    selected={name:name for name in ['Idle','Walking_A','Running_A','Death_B','Hit_A','2H_Ranged_Aiming','2H_Ranged_Shoot','Reload']} if kind=='archer' else {
      'Idle':'Idle','Walking_SourceGrounded':'Walking_A','Running_A':'Running_A','Death_GroundedCollapse':'Death_B','Hit_A':'Hit_A',
      'OverheadCleave_HelperClearance':'2H_Melee_Attack_Chop','PoleaxeSweep_Grounded_Bimanual_Adaptive':'PoleaxeSweep'}
    missing=set(selected)-set(bpy.data.actions.keys());assert not missing,missing
    for action in list(bpy.data.actions):
        if action.name not in selected:bpy.data.actions.remove(action)
    for old,new in selected.items():
        action=bpy.data.actions[old];action.name=new;action.use_fake_user=True
    if kind=='iron-warden':
        idle=bpy.data.actions['Idle'].copy();idle.name='2H_Melee_Idle';idle.use_fake_user=True
    scene.frame_set(1);bpy.context.view_layer.update()
    originals=[o for o in scene.objects if o.type=='MESH' and not o.hide_render and o.visible_get()]
    # Preserve every actual visible source surface. Evaluate mask/normal/cloth
    # modifiers at REST before deriving LODs, retaining named bone weights.
    bases=[];deps=bpy.context.evaluated_depsgraph_get()
    for original in originals:
        obj=original.copy();obj.data=bpy.data.meshes.new_from_object(original.evaluated_get(deps),preserve_all_data_layers=True,depsgraph=deps);scene.collection.objects.link(obj)
        matrix=rig.matrix_world.inverted()@original.matrix_world;obj.data.transform(matrix)
        for modifier in list(obj.modifiers):obj.modifiers.remove(modifier)
        obj.parent=rig;obj.parent_type='OBJECT';obj.matrix_parent_inverse.identity();obj.matrix_basis.identity()
        mod=obj.modifiers.new('Shared authored rig','ARMATURE');mod.object=rig
        obj.hide_render=False;obj.hide_viewport=False;obj.hide_set(False);bases.append(obj)
        prepare_surface(obj)
    for original in originals:original.hide_render=True;original.hide_set(True)
    for obj in scene.objects:obj.select_set(False)
    # One mesh with material groups instead of dozens of separately updated skins.
    for obj in bases:obj.select_set(True)
    bpy.context.view_layer.objects.active=bases[0];bpy.ops.object.join();master=bpy.context.object;master.name=kind+'_close';master.data.name=master.name
    master.data.calc_loop_triangles();full_triangles=len(master.data.loop_triangles)
    levels=[]
    for level,budget in [(1,60000 if kind=='archer' else 80000),(2,20000 if kind=='archer' else 28000)]:
        obj=master.copy();obj.data=master.data.copy();scene.collection.objects.link(obj);obj.name=kind+'_LOD'+str(level);obj.data.name=obj.name;obj['redesignLod']=level
        for selected_obj in bpy.context.selected_objects:selected_obj.select_set(False)
        obj.select_set(True);bpy.context.view_layer.objects.active=obj
        decimate=obj.modifiers.new('Screen-size silhouette LOD','DECIMATE');decimate.ratio=min(1,budget/full_triangles);decimate.use_collapse_triangulate=True
        bpy.ops.object.modifier_move_up(modifier=decimate.name);bpy.ops.object.modifier_apply(modifier=decimate.name)
        obj.data.calc_loop_triangles();levels.append(obj)
    export_props=bpy.ops.export_scene.gltf.get_rna_type().properties
    options=dict(export_format='GLB',use_selection=True,export_extras=True,export_yup=True,export_animations=True,export_animation_mode='ACTIONS',export_force_sampling=True,export_bake_animation=True,export_frame_step=2,export_skins=True,export_all_influences=False,export_image_format='AUTO',export_draco_mesh_compression_enable=True,export_draco_mesh_compression_level=6,export_draco_position_quantization=16,export_draco_normal_quantization=12,export_draco_texcoord_quantization=16)
    options={k:v for k,v in options.items() if k in export_props}
    image_sizes={image.name:list(image.size) for image in bpy.data.images}
    def export(meshes,suffix,texture_size):
        for image in bpy.data.images:
            if image.size[0] and max(image.size)>texture_size:
                scale=texture_size/max(image.size);image.scale(max(1,round(image.size[0]*scale)),max(1,round(image.size[1]*scale)))
        for obj in scene.objects:obj.select_set(False)
        for mesh in meshes:mesh.select_set(True);mesh.hide_set(False)
        rig.select_set(True);rig.data.pose_position='POSE';bpy.context.view_layer.objects.active=rig
        rig.animation_data.action=bpy.data.actions['Idle']
        if rig.animation_data.action.slots:rig.animation_data.action_slot=rig.animation_data.action.slots[0]
        target=out/(kind+'-mobile-'+suffix+'.glb');bpy.ops.export_scene.gltf(filepath=str(target),**options)
        return {'file':str(target),'bytes':target.stat().st_size,'sha256':hashlib.sha256(target.read_bytes()).hexdigest()}
    close=export([master],'close',2048)
    distance=export(levels,'lods',1024)
    reports[kind]={'source':str(src),'sourceSha256':hashlib.sha256(src.read_bytes()).hexdigest(),'sourceTriangles':full_triangles,'lods':[{'level':o['redesignLod'],'triangles':len(o.data.loop_triangles)} for o in levels],'bones':len(rig.data.bones),'actions':list(bpy.data.actions.keys()),'originalImageSizes':image_sizes,'close':close,'distance':distance,'status':'exported_pending_runtime_review'}
    (tests/'humanoid-exports.json').write_text(json.dumps(reports,indent=2));print(json.dumps(reports[kind]))
