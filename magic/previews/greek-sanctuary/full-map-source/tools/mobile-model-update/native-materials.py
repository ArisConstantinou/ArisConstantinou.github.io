"""Retain the active authored UV on joins and bake unsupported shader nodes."""
import bpy

def prepare_surface(obj):
    mesh=obj.data
    active=next((u for u in mesh.uv_layers if u.active_render),mesh.uv_layers.active)
    if active:
        name=active.name
        for uv in list(mesh.uv_layers):
            if uv!=active:mesh.uv_layers.remove(uv)
        active.name='UVMap';mesh.uv_layers.active_index=0
    else:
        mesh.uv_layers.new(name='UVMap')
        bpy.context.view_layer.objects.active=obj
        bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT');bpy.ops.uv.smart_project(island_margin=.03);bpy.ops.object.mode_set(mode='OBJECT')
    for material in mesh.materials:
        if material and material.use_nodes:
            for node in material.node_tree.nodes:
                if node.type=='UVMAP':node.uv_map='UVMap'
    for index,material in enumerate(list(mesh.materials)):
        if not material or not material.use_nodes:continue
        principled=next((n for n in material.node_tree.nodes if n.type=='BSDF_PRINCIPLED'),None)
        if not principled:continue
        base=principled.inputs['Base Color'];normal=principled.inputs['Normal']
        bake_color=base.is_linked and base.links[0].from_node.type not in ['TEX_IMAGE']
        bake_normal=normal.is_linked and normal.links[0].from_node.type=='BUMP'
        if not (bake_color or bake_normal):continue
        material=material.copy();mesh.materials[index]=material;nodes=material.node_tree.nodes;links=material.node_tree.links
        # Baking visits every material slot of the selected mesh. Give other
        # slots isolated scratch targets so their packed source maps cannot be
        # accidentally overwritten in memory by a bake for this one material.
        other_slots=[]
        for other_index,other in enumerate(list(mesh.materials)):
            if other_index==index or not other or not other.use_nodes:continue
            scratch=other.copy();mesh.materials[other_index]=scratch
            scratch_node=scratch.node_tree.nodes.new('ShaderNodeTexImage');scratch_node.image=bpy.data.images.new('Unused bake slot',width=16,height=16);scratch.node_tree.nodes.active=scratch_node
            other_slots.append((other_index,other,scratch,scratch_node.image))
        principled=next(n for n in nodes if n.type=='BSDF_PRINCIPLED');output=next(n for n in nodes if n.type=='OUTPUT_MATERIAL' and n.is_active_output)
        for o in bpy.context.selected_objects:o.select_set(False)
        obj.select_set(True);bpy.context.view_layer.objects.active=obj
        scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.device='CPU';scene.cycles.samples=1
        scene.render.bake.use_selected_to_active=False;scene.render.bake.margin=6
        targets={}
        for channel,required in [('color',bake_color),('normal',bake_normal)]:
            if not required:continue
            image=bpy.data.images.new(obj.name+' '+channel+' baked',width=1024,height=1024,alpha=False)
            if channel=='normal':image.colorspace_settings.name='Non-Color'
            target=nodes.new('ShaderNodeTexImage');target.image=image;nodes.active=target;targets[channel]=target
            if channel=='color':
                surface=output.inputs['Surface'].links[0].from_socket
                emission=nodes.new('ShaderNodeEmission');base=principled.inputs['Base Color']
                if base.is_linked:links.new(base.links[0].from_socket,emission.inputs['Color'])
                else:emission.inputs['Color'].default_value=base.default_value
                links.new(emission.outputs[0],output.inputs['Surface']);bpy.ops.object.bake(type='EMIT');links.new(surface,output.inputs['Surface']);nodes.remove(emission)
            else:bpy.ops.object.bake(type='NORMAL')
            image.pack()
        if 'color' in targets:links.new(targets['color'].outputs['Color'],principled.inputs['Base Color'])
        if 'normal' in targets:
            normalmap=nodes.new('ShaderNodeNormalMap');links.new(targets['normal'].outputs['Color'],normalmap.inputs['Color']);links.new(normalmap.outputs['Normal'],principled.inputs['Normal'])
        for other_index,original,scratch,image in other_slots:
            mesh.materials[other_index]=original;bpy.data.materials.remove(scratch);bpy.data.images.remove(image)
