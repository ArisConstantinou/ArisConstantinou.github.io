// Principal-axis boxes keep debris collision inexpensive while following a
// chunk's long axis, instead of filling its entire world-aligned bounding box.
export function fitCollisionBox(points,minHalf=.025){
 const mean=[0,0,0];for(const p of points)for(let i=0;i<3;i++)mean[i]+=p[['x','y','z'][i]]/points.length;
 const a=Array.from({length:3},()=>[0,0,0]),v=[[1,0,0],[0,1,0],[0,0,1]];
 for(const p of points){const d=[p.x-mean[0],p.y-mean[1],p.z-mean[2]];for(let i=0;i<3;i++)for(let j=0;j<3;j++)a[i][j]+=d[i]*d[j]/points.length;}
 for(let iteration=0;iteration<16;iteration++){
  let p=0,q=1;for(const [i,j]of [[0,2],[1,2]])if(Math.abs(a[i][j])>Math.abs(a[p][q])){p=i;q=j;}if(Math.abs(a[p][q])<1e-10)break;
  const theta=.5*Math.atan2(2*a[p][q],a[q][q]-a[p][p]),c=Math.cos(theta),s=Math.sin(theta),app=a[p][p],aqq=a[q][q],apq=a[p][q];
  for(let i=0;i<3;i++)if(i!==p&&i!==q){const ip=a[i][p],iq=a[i][q];a[i][p]=a[p][i]=c*ip-s*iq;a[i][q]=a[q][i]=s*ip+c*iq;}
  a[p][p]=c*c*app-2*s*c*apq+s*s*aqq;a[q][q]=s*s*app+2*s*c*apq+c*c*aqq;a[p][q]=a[q][p]=0;
  for(let i=0;i<3;i++){const ip=v[i][p],iq=v[i][q];v[i][p]=c*ip-s*iq;v[i][q]=s*ip+c*iq;}
 }
 const axes=[0,1,2].map(i=>({x:v[0][i],y:v[1][i],z:v[2][i]})),lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];
 for(const p of points)for(let i=0;i<3;i++){const d=(p.x-mean[0])*axes[i].x+(p.y-mean[1])*axes[i].y+(p.z-mean[2])*axes[i].z;lo[i]=Math.min(lo[i],d);hi[i]=Math.max(hi[i],d);}
 const center={x:mean[0],y:mean[1],z:mean[2]};for(let i=0;i<3;i++)for(const key of ['x','y','z'])center[key]+=axes[i][key]*(lo[i]+hi[i])/2;
 return {center,axes,halfExtents:{x:Math.max(minHalf,(hi[0]-lo[0])/2),y:Math.max(minHalf,(hi[1]-lo[1])/2),z:Math.max(minHalf,(hi[2]-lo[2])/2)}};
}
