import json, math, pathlib
import numpy as np
from PIL import Image, ImageDraw, ImageFont
ROOT=pathlib.Path(__file__).parent
records=json.loads((ROOT/'creature-geometry.json').read_text())
SIZE=500
view=np.array([5.,3.0,7.]);view/=np.linalg.norm(view)
right=np.cross([0.,1.,0.],view);right/=np.linalg.norm(right)
up=np.cross(view,right)
light=np.array([-0.4,.9,.65]);light/=np.linalg.norm(light)
half=(light+view);half/=np.linalg.norm(half)
scenes={}
for r in records:
 arrays=[np.array(m['position']).reshape(-1,3) for m in r['meshes']]
 points=np.concatenate(arrays);q=np.stack((points@right,points@up,points@view),axis=-1)
 b=scenes.setdefault(r['type'],[q[:,:2].min(0),q[:,:2].max(0)])
 b[0]=np.minimum(b[0],q[:,:2].min(0));b[1]=np.maximum(b[1],q[:,:2].max(0))

def render(record):
 depth=np.full((SIZE,SIZE),-np.inf,dtype=np.float32)
 image=np.zeros((SIZE,SIZE,4),dtype=np.uint8)
 lo,hi=scenes[record['type']];center=(lo+hi)*.5;scale=(SIZE-70)/max(hi-lo)
 for mesh in record['meshes']:
  p=np.array(mesh['position']).reshape(-1,3);n=np.array(mesh['normal']).reshape(-1,3)
  c=np.array(mesh['color']).reshape(-1,3);indices=np.array(mesh['index']).reshape(-1,3)
  normaldot=n@view
  if mesh['doubleSide']:
   n=n*np.where(normaldot<0,-1,1)[:,None]
  intensity=.27+np.maximum(0,n@light)*.85
  shiny=.33 if 'eye' in mesh['name'] else .09 if record['type']!='heron' else .025
  exp=96 if 'eye' in mesh['name'] else 42
  shaded=c*intensity[:,None]+(np.maximum(0,n@half)**exp*shiny)[:,None]
  shaded=shaded/(1+shaded*.2)
  rgb=np.clip(np.where(shaded<=.0031308,shaded*12.92,1.055*np.maximum(0,shaded)**(1/2.4)-.055),0,1)*255
  q=np.stack(((p@right-center[0])*scale+SIZE*.5, SIZE*.5-(p@up-center[1])*scale,p@view),axis=-1)
  for tri in indices:
   if not mesh['doubleSide'] and np.mean(normaldot[tri])<0:continue
   a,b,cq=q[tri];
   x0=max(0,int(math.floor(min(a[0],b[0],cq[0]))));x1=min(SIZE-1,int(math.ceil(max(a[0],b[0],cq[0]))))
   y0=max(0,int(math.floor(min(a[1],b[1],cq[1]))));y1=min(SIZE-1,int(math.ceil(max(a[1],b[1],cq[1]))))
   if x1<x0 or y1<y0:continue
   den=(b[1]-cq[1])*(a[0]-cq[0])+(cq[0]-b[0])*(a[1]-cq[1])
   if abs(den)<1e-8:continue
   xx,yy=np.meshgrid(np.arange(x0,x1+1)+.5,np.arange(y0,y1+1)+.5)
   w0=((b[1]-cq[1])*(xx-cq[0])+(cq[0]-b[0])*(yy-cq[1]))/den
   w1=((cq[1]-a[1])*(xx-cq[0])+(a[0]-cq[0])*(yy-cq[1]))/den
   w2=1-w0-w1
   zz=w0*a[2]+w1*b[2]+w2*cq[2]
   zpatch=depth[y0:y1+1,x0:x1+1]
   yes=(w0>=-.00001)&(w1>=-.00001)&(w2>=-.00001)&(zz>zpatch)
   if not yes.any():continue
   col=w0[:,:,None]*rgb[tri[0]]+w1[:,:,None]*rgb[tri[1]]+w2[:,:,None]*rgb[tri[2]]
   patch=image[y0:y1+1,x0:x1+1];patch[:,:,:3][yes]=col[yes].astype(np.uint8);patch[:,:,3][yes]=255;zpatch[yes]=zz[yes]
 return Image.fromarray(image,'RGBA')

fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
font=ImageFont.truetype(fontfile,20);small=ImageFont.truetype(fontfile,15);title=ImageFont.truetype(fontfile,27)
sheet=Image.new('RGB',(2080,1220),'#16251e');draw=ImageDraw.Draw(sheet)
draw.text((35,24),'ACTUAL SKINNED GEOMETRY — CPU DIAGNOSTIC',font=title,fill='#e6e9d2')
draw.text((35,65),'Original game meshes after bone deformation. Approximate lighting; no environment, textures or gameplay renderer.',font=small,fill='#aebfae')
for r in records:
 col=['frog','heron','snake','fish'].index(r['type']);row=0 if r['pose']=='idle' else 1
 x=25+col*515;y=105+row*550
 draw.rounded_rectangle((x,y,x+500,y+530),radius=12,fill='#23382c',outline='#3f5742')
 draw.text((x+16,y+12),r['type'].upper()+' / '+r['pose'].upper(),font=font,fill='#dce4ba')
 im=render(r);sheet.paste(im,(x,y+26),im)
 draw.text((x+16,y+505),f"{r['stats']['boneCount']} bones · {r['stats']['triangles']:,} triangles",font=small,fill='#b5c5b5')
 print('Rendered',r['type'],r['pose'],flush=True)
sheet.save(ROOT/'creature-geometry-check.png')

