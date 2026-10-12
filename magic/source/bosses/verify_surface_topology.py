"""Blender regression: closed armour must have outward-facing, manifold surfaces."""
import pathlib, sys, json, bpy
sys.path.insert(0,str(pathlib.Path(__file__).resolve().parent))
import build_bosses as boss

boss.parts=[]
boss.rig=boss.new_rig('Topology test',[('root',(0,0,0),(0,0,1),None)])
stone=bpy.data.materials.new('Test stone')
brass=bpy.data.materials.new('Test brass')
fixtures=[
    boss.plate('Sculpted stone armour',(2,.3,1),(.7,.8,.6),stone,'root'),
    boss.plate('Manufactured brass bracket',(-2,.4,1),(.2,.3,.5),brass,'root'),
    boss.loft('Loft',[(0,.3,.2,0,0),(1,.2,.15,0,0)],brass,'root'),
    boss.rod('Rod',(0,0,0),(1,.5,1),.1,brass,'root'),
    boss.gem('Gem',(0,0,0),(.2,.3,.4),brass,'root'),
    boss.ring('Ring',(0,0,0),.3,.05,brass,'root'),
    boss.curved('Curved',[(0,0,0),(.1,.1,.5),(.2,.1,1)],[.1,.09,.03],brass,'root')
]
checks=[dict(part=o.name,**boss.surface_topology(o)) for o in fixtures]
failures=[c for c in checks if c['nonManifoldEdges'] or c['inconsistentEdges'] or c['degenerateTriangles'] or c['signedVolume']<=0]
print('SURFACE_TOPOLOGY',json.dumps({'checks':checks,'failures':failures}))
assert not failures,'Inside-out or invalid closed surface: '+str([c['part'] for c in failures])
