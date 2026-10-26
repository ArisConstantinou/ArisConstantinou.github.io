(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Kl="180",vd=0,Lc=1,_d=2,uu=1,Md=2,vi=3,Ei=0,En=1,Fe=2,Wi=0,Xs=1,Uc=2,zc=3,Nc=4,yd=5,cs=100,Sd=101,bd=102,wd=103,Ed=104,Td=200,Ad=201,Rd=202,Cd=203,tl=204,el=205,Pd=206,Dd=207,Id=208,Ld=209,Ud=210,zd=211,Nd=212,Fd=213,kd=214,nl=0,il=1,sl=2,Ys=3,rl=4,ol=5,al=6,ll=7,du=0,Od=1,Bd=2,Xi=0,Hd=1,Gd=2,Vd=3,fu=4,Wd=5,Xd=6,qd=7,Fc="attached",Yd="detached",pu=300,$s=301,Zs=302,cl=303,hl=304,Ho=306,js=1e3,Gi=1001,ul=1002,Nn=1003,$d=1004,Xr=1005,jn=1006,ea=1007,Vi=1008,oi=1009,mu=1010,gu=1011,Cr=1012,Jl=1013,ps=1014,Kn=1015,Fr=1016,Ql=1017,tc=1018,Pr=1020,xu=35902,vu=35899,_u=1021,Mu=1022,zn=1023,Dr=1026,Ir=1027,ec=1028,nc=1029,yu=1030,ic=1031,sc=1033,Ao=33776,Ro=33777,Co=33778,Po=33779,dl=35840,fl=35841,pl=35842,ml=35843,gl=36196,xl=37492,vl=37496,_l=37808,Ml=37809,yl=37810,Sl=37811,bl=37812,wl=37813,El=37814,Tl=37815,Al=37816,Rl=37817,Cl=37818,Pl=37819,Dl=37820,Il=37821,Ll=36492,Ul=36494,zl=36495,Nl=36283,Fl=36284,kl=36285,Ol=36286,Zd=3200,jd=3201,rc=0,Kd=1,_i="",An="srgb",Ks="srgb-linear",Lo="linear",Ge="srgb",bs=7680,kc=519,Jd=512,Qd=513,tf=514,Su=515,ef=516,nf=517,sf=518,rf=519,Oc=35044,Mi=35048,Bc="300 es",ri=2e3,Uo=2001;class er{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const vn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Hc=1234567;const wr=Math.PI/180,Lr=180/Math.PI;function ms(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(vn[i&255]+vn[i>>8&255]+vn[i>>16&255]+vn[i>>24&255]+"-"+vn[t&255]+vn[t>>8&255]+"-"+vn[t>>16&15|64]+vn[t>>24&255]+"-"+vn[e&63|128]+vn[e>>8&255]+"-"+vn[e>>16&255]+vn[e>>24&255]+vn[n&255]+vn[n>>8&255]+vn[n>>16&255]+vn[n>>24&255]).toLowerCase()}function Se(i,t,e){return Math.max(t,Math.min(e,i))}function oc(i,t){return(i%t+t)%t}function of(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function af(i,t,e){return i!==t?(e-i)/(t-i):0}function Er(i,t,e){return(1-e)*i+e*t}function lf(i,t,e,n){return Er(i,t,1-Math.exp(-e*n))}function cf(i,t=1){return t-Math.abs(oc(i,t*2)-t)}function hf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function uf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function df(i,t){return i+Math.floor(Math.random()*(t-i+1))}function ff(i,t){return i+Math.random()*(t-i)}function pf(i){return i*(.5-Math.random())}function mf(i){i!==void 0&&(Hc=i);let t=Hc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function gf(i){return i*wr}function xf(i){return i*Lr}function vf(i){return(i&i-1)===0&&i!==0}function _f(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Mf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function yf(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),p=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*p,a*c);break;case"YZY":i.set(l*p,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*p,a*h,a*c);break;case"XZX":i.set(a*h,l*m,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*m,a*c);break;case"ZYZ":i.set(l*m,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Bs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Sn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Bl={DEG2RAD:wr,RAD2DEG:Lr,generateUUID:ms,clamp:Se,euclideanModulo:oc,mapLinear:of,inverseLerp:af,lerp:Er,damp:lf,pingpong:cf,smoothstep:hf,smootherstep:uf,randInt:df,randFloat:ff,randFloatSpread:pf,seededRandom:mf,degToRad:gf,radToDeg:xf,isPowerOfTwo:vf,ceilPowerOfTwo:_f,floorPowerOfTwo:Mf,setQuaternionFromProperEuler:yf,normalize:Sn,denormalize:Bs};class Ht{constructor(t=0,e=0){Ht.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Se(this.x,t.x,e.x),this.y=Se(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Se(this.x,t,e),this.y=Se(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qi{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const p=r[o+0],f=r[o+1],m=r[o+2],g=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=p,t[e+1]=f,t[e+2]=m,t[e+3]=g;return}if(u!==g||l!==p||c!==f||h!==m){let x=1-a;const d=l*p+c*f+h*m+u*g,b=d>=0?1:-1,M=1-d*d;if(M>Number.EPSILON){const C=Math.sqrt(M),R=Math.atan2(C,d*b);x=Math.sin(x*R)/C,a=Math.sin(a*R)/C}const _=a*b;if(l=l*x+p*_,c=c*x+f*_,h=h*x+m*_,u=u*x+g*_,x===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],p=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+h*u+l*f-c*p,t[e+1]=l*m+h*p+c*u-a*f,t[e+2]=c*m+h*f+a*p-l*u,t[e+3]=h*m-a*u-l*p-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),p=l(n/2),f=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=p*h*u+c*f*m,this._y=c*f*u-p*h*m,this._z=c*h*m+p*f*u,this._w=c*h*u-p*f*m;break;case"YXZ":this._x=p*h*u+c*f*m,this._y=c*f*u-p*h*m,this._z=c*h*m-p*f*u,this._w=c*h*u+p*f*m;break;case"ZXY":this._x=p*h*u-c*f*m,this._y=c*f*u+p*h*m,this._z=c*h*m+p*f*u,this._w=c*h*u-p*f*m;break;case"ZYX":this._x=p*h*u-c*f*m,this._y=c*f*u+p*h*m,this._z=c*h*m-p*f*u,this._w=c*h*u+p*f*m;break;case"YZX":this._x=p*h*u+c*f*m,this._y=c*f*u+p*h*m,this._z=c*h*m-p*f*u,this._w=c*h*u-p*f*m;break;case"XZY":this._x=p*h*u-c*f*m,this._y=c*f*u-p*h*m,this._z=c*h*m+p*f*u,this._w=c*h*u+p*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],p=n+a+u;if(p>0){const f=.5/Math.sqrt(p+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Se(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,p=Math.sin(e*h)/c;return this._w=o*u+this._w*p,this._x=n*u+this._x*p,this._y=s*u+this._y*p,this._z=r*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Gc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Gc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Se(this.x,t.x,e.x),this.y=Se(this.y,t.y,e.y),this.z=Se(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Se(this.x,t,e),this.y=Se(this.y,t,e),this.z=Se(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return na.copy(this).projectOnVector(t),this.sub(na)}reflect(t){return this.sub(na.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const na=new L,Gc=new qi;class xe{constructor(t,e,n,s,r,o,a,l,c){xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],p=n[2],f=n[5],m=n[8],g=s[0],x=s[3],d=s[6],b=s[1],M=s[4],_=s[7],C=s[2],R=s[5],E=s[8];return r[0]=o*g+a*b+l*C,r[3]=o*x+a*M+l*R,r[6]=o*d+a*_+l*E,r[1]=c*g+h*b+u*C,r[4]=c*x+h*M+u*R,r[7]=c*d+h*_+u*E,r[2]=p*g+f*b+m*C,r[5]=p*x+f*M+m*R,r[8]=p*d+f*_+m*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,p=a*l-h*r,f=c*r-o*l,m=e*u+n*p+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/m;return t[0]=u*g,t[1]=(s*c-h*n)*g,t[2]=(a*n-s*o)*g,t[3]=p*g,t[4]=(h*e-s*l)*g,t[5]=(s*r-a*e)*g,t[6]=f*g,t[7]=(n*l-c*e)*g,t[8]=(o*e-n*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ia.makeScale(t,e)),this}rotate(t){return this.premultiply(ia.makeRotation(-t)),this}translate(t,e){return this.premultiply(ia.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ia=new xe;function bu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function zo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Sf(){const i=zo("canvas");return i.style.display="block",i}const Vc={};function Ur(i){i in Vc||(Vc[i]=!0,console.warn(i))}function bf(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Wc=new xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xc=new xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wf(){const i={enabled:!0,workingColorSpace:Ks,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ge&&(s.r=bi(s.r),s.g=bi(s.g),s.b=bi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ge&&(s.r=qs(s.r),s.g=qs(s.g),s.b=qs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===_i?Lo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ur("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ur("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ks]:{primaries:t,whitePoint:n,transfer:Lo,toXYZ:Wc,fromXYZ:Xc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:An},outputColorSpaceConfig:{drawingBufferColorSpace:An}},[An]:{primaries:t,whitePoint:n,transfer:Ge,toXYZ:Wc,fromXYZ:Xc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:An}}}),i}const Ue=wf();function bi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function qs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ws;class Ef{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ws===void 0&&(ws=zo("canvas")),ws.width=t.width,ws.height=t.height;const s=ws.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ws}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=zo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=bi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(bi(e[n]/255)*255):e[n]=bi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Tf=0;class ac{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=ms(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(sa(s[o].image)):r.push(sa(s[o]))}else r=sa(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function sa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ef.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Af=0;const ra=new L;class Mn extends er{constructor(t=Mn.DEFAULT_IMAGE,e=Mn.DEFAULT_MAPPING,n=Gi,s=Gi,r=jn,o=Vi,a=zn,l=oi,c=Mn.DEFAULT_ANISOTROPY,h=_i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Af++}),this.uuid=ms(),this.name="",this.source=new ac(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ht(0,0),this.repeat=new Ht(1,1),this.center=new Ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ra).x}get height(){return this.source.getSize(ra).y}get depth(){return this.source.getSize(ra).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==pu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case js:t.x=t.x-Math.floor(t.x);break;case Gi:t.x=t.x<0?0:1;break;case ul:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case js:t.y=t.y-Math.floor(t.y);break;case Gi:t.y=t.y<0?0:1;break;case ul:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Mn.DEFAULT_IMAGE=null;Mn.DEFAULT_MAPPING=pu;Mn.DEFAULT_ANISOTROPY=1;class Ie{constructor(t=0,e=0,n=0,s=1){Ie.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],p=l[1],f=l[5],m=l[9],g=l[2],x=l[6],d=l[10];if(Math.abs(h-p)<.01&&Math.abs(u-g)<.01&&Math.abs(m-x)<.01){if(Math.abs(h+p)<.1&&Math.abs(u+g)<.1&&Math.abs(m+x)<.1&&Math.abs(c+f+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,_=(f+1)/2,C=(d+1)/2,R=(h+p)/4,E=(u+g)/4,A=(m+x)/4;return M>_&&M>C?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=R/n,r=E/n):_>C?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=R/s,r=A/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=E/r,s=A/r),this.set(n,s,r,e),this}let b=Math.sqrt((x-m)*(x-m)+(u-g)*(u-g)+(p-h)*(p-h));return Math.abs(b)<.001&&(b=1),this.x=(x-m)/b,this.y=(u-g)/b,this.z=(p-h)/b,this.w=Math.acos((c+f+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Se(this.x,t.x,e.x),this.y=Se(this.y,t.y,e.y),this.z=Se(this.z,t.z,e.z),this.w=Se(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Se(this.x,t,e),this.y=Se(this.y,t,e),this.z=Se(this.z,t,e),this.w=Se(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Rf extends er{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ie(0,0,t,e),this.scissorTest=!1,this.viewport=new Ie(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Mn(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:jn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new ac(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yi extends Rf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class wu extends Mn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Nn,this.minFilter=Nn,this.wrapR=Gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Cf extends Mn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Nn,this.minFilter=Nn,this.wrapR=Gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ai{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Gn):Gn.fromBufferAttribute(r,o),Gn.applyMatrix4(t.matrixWorld),this.expandByPoint(Gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),qr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qr.copy(n.boundingBox)),qr.applyMatrix4(t.matrixWorld),this.union(qr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Gn),Gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(dr),Yr.subVectors(this.max,dr),Es.subVectors(t.a,dr),Ts.subVectors(t.b,dr),As.subVectors(t.c,dr),Di.subVectors(Ts,Es),Ii.subVectors(As,Ts),ts.subVectors(Es,As);let e=[0,-Di.z,Di.y,0,-Ii.z,Ii.y,0,-ts.z,ts.y,Di.z,0,-Di.x,Ii.z,0,-Ii.x,ts.z,0,-ts.x,-Di.y,Di.x,0,-Ii.y,Ii.x,0,-ts.y,ts.x,0];return!oa(e,Es,Ts,As,Yr)||(e=[1,0,0,0,1,0,0,0,1],!oa(e,Es,Ts,As,Yr))?!1:($r.crossVectors(Di,Ii),e=[$r.x,$r.y,$r.z],oa(e,Es,Ts,As,Yr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(di),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const di=[new L,new L,new L,new L,new L,new L,new L,new L],Gn=new L,qr=new ai,Es=new L,Ts=new L,As=new L,Di=new L,Ii=new L,ts=new L,dr=new L,Yr=new L,$r=new L,es=new L;function oa(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){es.fromArray(i,r);const a=s.x*Math.abs(es.x)+s.y*Math.abs(es.y)+s.z*Math.abs(es.z),l=t.dot(es),c=e.dot(es),h=n.dot(es);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Pf=new ai,fr=new L,aa=new L;class Ti{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Pf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;fr.subVectors(t,this.center);const e=fr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(fr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(aa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(fr.copy(t.center).add(aa)),this.expandByPoint(fr.copy(t.center).sub(aa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const fi=new L,la=new L,Zr=new L,Li=new L,ca=new L,jr=new L,ha=new L;class kr{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,fi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=fi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(fi.copy(this.origin).addScaledVector(this.direction,e),fi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){la.copy(t).add(e).multiplyScalar(.5),Zr.copy(e).sub(t).normalize(),Li.copy(this.origin).sub(la);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Zr),a=Li.dot(this.direction),l=-Li.dot(Zr),c=Li.lengthSq(),h=Math.abs(1-o*o);let u,p,f,m;if(h>0)if(u=o*l-a,p=o*a-l,m=r*h,u>=0)if(p>=-m)if(p<=m){const g=1/h;u*=g,p*=g,f=u*(u+o*p+2*a)+p*(o*u+p+2*l)+c}else p=r,u=Math.max(0,-(o*p+a)),f=-u*u+p*(p+2*l)+c;else p=-r,u=Math.max(0,-(o*p+a)),f=-u*u+p*(p+2*l)+c;else p<=-m?(u=Math.max(0,-(-o*r+a)),p=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+p*(p+2*l)+c):p<=m?(u=0,p=Math.min(Math.max(-r,-l),r),f=p*(p+2*l)+c):(u=Math.max(0,-(o*r+a)),p=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+p*(p+2*l)+c);else p=o>0?-r:r,u=Math.max(0,-(o*p+a)),f=-u*u+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(la).addScaledVector(Zr,p),f}intersectSphere(t,e){fi.subVectors(t.center,this.origin);const n=fi.dot(this.direction),s=fi.dot(fi)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,p=this.origin;return c>=0?(n=(t.min.x-p.x)*c,s=(t.max.x-p.x)*c):(n=(t.max.x-p.x)*c,s=(t.min.x-p.x)*c),h>=0?(r=(t.min.y-p.y)*h,o=(t.max.y-p.y)*h):(r=(t.max.y-p.y)*h,o=(t.min.y-p.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-p.z)*u,l=(t.max.z-p.z)*u):(a=(t.max.z-p.z)*u,l=(t.min.z-p.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,fi)!==null}intersectTriangle(t,e,n,s,r){ca.subVectors(e,t),jr.subVectors(n,t),ha.crossVectors(ca,jr);let o=this.direction.dot(ha),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Li.subVectors(this.origin,t);const l=a*this.direction.dot(jr.crossVectors(Li,jr));if(l<0)return null;const c=a*this.direction.dot(ca.cross(Li));if(c<0||l+c>o)return null;const h=-a*Li.dot(ha);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ce{constructor(t,e,n,s,r,o,a,l,c,h,u,p,f,m,g,x){ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,p,f,m,g,x)}set(t,e,n,s,r,o,a,l,c,h,u,p,f,m,g,x){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=p,d[3]=f,d[7]=m,d[11]=g,d[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ce().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Rs.setFromMatrixColumn(t,0).length(),r=1/Rs.setFromMatrixColumn(t,1).length(),o=1/Rs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const p=o*h,f=o*u,m=a*h,g=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+m*c,e[5]=p-g*c,e[9]=-a*l,e[2]=g-p*c,e[6]=m+f*c,e[10]=o*l}else if(t.order==="YXZ"){const p=l*h,f=l*u,m=c*h,g=c*u;e[0]=p+g*a,e[4]=m*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=g+p*a,e[10]=o*l}else if(t.order==="ZXY"){const p=l*h,f=l*u,m=c*h,g=c*u;e[0]=p-g*a,e[4]=-o*u,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=g-p*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const p=o*h,f=o*u,m=a*h,g=a*u;e[0]=l*h,e[4]=m*c-f,e[8]=p*c+g,e[1]=l*u,e[5]=g*c+p,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const p=o*l,f=o*c,m=a*l,g=a*c;e[0]=l*h,e[4]=g-p*u,e[8]=m*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+m,e[10]=p-g*u}else if(t.order==="XZY"){const p=o*l,f=o*c,m=a*l,g=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=p*u+g,e[5]=o*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=a*h,e[10]=g*u+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Df,t,If)}lookAt(t,e,n){const s=this.elements;return Dn.subVectors(t,e),Dn.lengthSq()===0&&(Dn.z=1),Dn.normalize(),Ui.crossVectors(n,Dn),Ui.lengthSq()===0&&(Math.abs(n.z)===1?Dn.x+=1e-4:Dn.z+=1e-4,Dn.normalize(),Ui.crossVectors(n,Dn)),Ui.normalize(),Kr.crossVectors(Dn,Ui),s[0]=Ui.x,s[4]=Kr.x,s[8]=Dn.x,s[1]=Ui.y,s[5]=Kr.y,s[9]=Dn.y,s[2]=Ui.z,s[6]=Kr.z,s[10]=Dn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],p=n[9],f=n[13],m=n[2],g=n[6],x=n[10],d=n[14],b=n[3],M=n[7],_=n[11],C=n[15],R=s[0],E=s[4],A=s[8],S=s[12],y=s[1],U=s[5],N=s[9],X=s[13],J=s[2],B=s[6],W=s[10],Q=s[14],Y=s[3],ct=s[7],j=s[11],Mt=s[15];return r[0]=o*R+a*y+l*J+c*Y,r[4]=o*E+a*U+l*B+c*ct,r[8]=o*A+a*N+l*W+c*j,r[12]=o*S+a*X+l*Q+c*Mt,r[1]=h*R+u*y+p*J+f*Y,r[5]=h*E+u*U+p*B+f*ct,r[9]=h*A+u*N+p*W+f*j,r[13]=h*S+u*X+p*Q+f*Mt,r[2]=m*R+g*y+x*J+d*Y,r[6]=m*E+g*U+x*B+d*ct,r[10]=m*A+g*N+x*W+d*j,r[14]=m*S+g*X+x*Q+d*Mt,r[3]=b*R+M*y+_*J+C*Y,r[7]=b*E+M*U+_*B+C*ct,r[11]=b*A+M*N+_*W+C*j,r[15]=b*S+M*X+_*Q+C*Mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],p=t[10],f=t[14],m=t[3],g=t[7],x=t[11],d=t[15];return m*(+r*l*u-s*c*u-r*a*p+n*c*p+s*a*f-n*l*f)+g*(+e*l*f-e*c*p+r*o*p-s*o*f+s*c*h-r*l*h)+x*(+e*c*u-e*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+d*(-s*a*h-e*l*u+e*a*p+s*o*u-n*o*p+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],p=t[10],f=t[11],m=t[12],g=t[13],x=t[14],d=t[15],b=u*x*c-g*p*c+g*l*f-a*x*f-u*l*d+a*p*d,M=m*p*c-h*x*c-m*l*f+o*x*f+h*l*d-o*p*d,_=h*g*c-m*u*c+m*a*f-o*g*f-h*a*d+o*u*d,C=m*u*l-h*g*l-m*a*p+o*g*p+h*a*x-o*u*x,R=e*b+n*M+s*_+r*C;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/R;return t[0]=b*E,t[1]=(g*p*r-u*x*r-g*s*f+n*x*f+u*s*d-n*p*d)*E,t[2]=(a*x*r-g*l*r+g*s*c-n*x*c-a*s*d+n*l*d)*E,t[3]=(u*l*r-a*p*r-u*s*c+n*p*c+a*s*f-n*l*f)*E,t[4]=M*E,t[5]=(h*x*r-m*p*r+m*s*f-e*x*f-h*s*d+e*p*d)*E,t[6]=(m*l*r-o*x*r-m*s*c+e*x*c+o*s*d-e*l*d)*E,t[7]=(o*p*r-h*l*r+h*s*c-e*p*c-o*s*f+e*l*f)*E,t[8]=_*E,t[9]=(m*u*r-h*g*r-m*n*f+e*g*f+h*n*d-e*u*d)*E,t[10]=(o*g*r-m*a*r+m*n*c-e*g*c-o*n*d+e*a*d)*E,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*f-e*a*f)*E,t[12]=C*E,t[13]=(h*g*s-m*u*s+m*n*p-e*g*p-h*n*x+e*u*x)*E,t[14]=(m*a*s-o*g*s-m*n*l+e*g*l+o*n*x-e*a*x)*E,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*p+e*a*p)*E,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,p=r*c,f=r*h,m=r*u,g=o*h,x=o*u,d=a*u,b=l*c,M=l*h,_=l*u,C=n.x,R=n.y,E=n.z;return s[0]=(1-(g+d))*C,s[1]=(f+_)*C,s[2]=(m-M)*C,s[3]=0,s[4]=(f-_)*R,s[5]=(1-(p+d))*R,s[6]=(x+b)*R,s[7]=0,s[8]=(m+M)*E,s[9]=(x-b)*E,s[10]=(1-(p+g))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Rs.set(s[0],s[1],s[2]).length();const o=Rs.set(s[4],s[5],s[6]).length(),a=Rs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Vn.copy(this);const c=1/r,h=1/o,u=1/a;return Vn.elements[0]*=c,Vn.elements[1]*=c,Vn.elements[2]*=c,Vn.elements[4]*=h,Vn.elements[5]*=h,Vn.elements[6]*=h,Vn.elements[8]*=u,Vn.elements[9]*=u,Vn.elements[10]*=u,e.setFromRotationMatrix(Vn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=ri,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-s),p=(e+t)/(e-t),f=(n+s)/(n-s);let m,g;if(l)m=r/(o-r),g=o*r/(o-r);else if(a===ri)m=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Uo)m=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=p,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=ri,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-s),p=-(e+t)/(e-t),f=-(n+s)/(n-s);let m,g;if(l)m=1/(o-r),g=o/(o-r);else if(a===ri)m=-2/(o-r),g=-(o+r)/(o-r);else if(a===Uo)m=-1/(o-r),g=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=p,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Rs=new L,Vn=new ce,Df=new L(0,0,0),If=new L(1,1,1),Ui=new L,Kr=new L,Dn=new L,qc=new ce,Yc=new qi;class li{constructor(t=0,e=0,n=0,s=li.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],p=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Se(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Se(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Se(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Se(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Se(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Se(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return qc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Yc.setFromEuler(this),this.setFromQuaternion(Yc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}li.DEFAULT_ORDER="XYZ";class lc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Lf=0;const $c=new L,Cs=new qi,pi=new ce,Jr=new L,pr=new L,Uf=new L,zf=new qi,Zc=new L(1,0,0),jc=new L(0,1,0),Kc=new L(0,0,1),Jc={type:"added"},Nf={type:"removed"},Ps={type:"childadded",child:null},ua={type:"childremoved",child:null};class $e extends er{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Lf++}),this.uuid=ms(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=$e.DEFAULT_UP.clone();const t=new L,e=new li,n=new qi,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ce},normalMatrix:{value:new xe}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=$e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=$e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Cs.setFromAxisAngle(t,e),this.quaternion.multiply(Cs),this}rotateOnWorldAxis(t,e){return Cs.setFromAxisAngle(t,e),this.quaternion.premultiply(Cs),this}rotateX(t){return this.rotateOnAxis(Zc,t)}rotateY(t){return this.rotateOnAxis(jc,t)}rotateZ(t){return this.rotateOnAxis(Kc,t)}translateOnAxis(t,e){return $c.copy(t).applyQuaternion(this.quaternion),this.position.add($c.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zc,t)}translateY(t){return this.translateOnAxis(jc,t)}translateZ(t){return this.translateOnAxis(Kc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Jr.copy(t):Jr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),pr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pi.lookAt(pr,Jr,this.up):pi.lookAt(Jr,pr,this.up),this.quaternion.setFromRotationMatrix(pi),s&&(pi.extractRotation(s.matrixWorld),Cs.setFromRotationMatrix(pi),this.quaternion.premultiply(Cs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Jc),Ps.child=t,this.dispatchEvent(Ps),Ps.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Nf),ua.child=t,this.dispatchEvent(ua),ua.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pi.multiply(t.parent.matrixWorld)),t.applyMatrix4(pi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Jc),Ps.child=t,this.dispatchEvent(Ps),Ps.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pr,t,Uf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pr,zf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),p=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}$e.DEFAULT_UP=new L(0,1,0);$e.DEFAULT_MATRIX_AUTO_UPDATE=!0;$e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Wn=new L,mi=new L,da=new L,gi=new L,Ds=new L,Is=new L,Qc=new L,fa=new L,pa=new L,ma=new L,ga=new Ie,xa=new Ie,va=new Ie;class Zn{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Wn.subVectors(t,e),s.cross(Wn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Wn.subVectors(s,e),mi.subVectors(n,e),da.subVectors(t,e);const o=Wn.dot(Wn),a=Wn.dot(mi),l=Wn.dot(da),c=mi.dot(mi),h=mi.dot(da),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const p=1/u,f=(c*l-a*h)*p,m=(o*h-a*l)*p;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,gi)===null?!1:gi.x>=0&&gi.y>=0&&gi.x+gi.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,gi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,gi.x),l.addScaledVector(o,gi.y),l.addScaledVector(a,gi.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return ga.setScalar(0),xa.setScalar(0),va.setScalar(0),ga.fromBufferAttribute(t,e),xa.fromBufferAttribute(t,n),va.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ga,r.x),o.addScaledVector(xa,r.y),o.addScaledVector(va,r.z),o}static isFrontFacing(t,e,n,s){return Wn.subVectors(n,e),mi.subVectors(t,e),Wn.cross(mi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Wn.subVectors(this.c,this.b),mi.subVectors(this.a,this.b),Wn.cross(mi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Zn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Zn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Zn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Zn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Zn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Ds.subVectors(s,n),Is.subVectors(r,n),fa.subVectors(t,n);const l=Ds.dot(fa),c=Is.dot(fa);if(l<=0&&c<=0)return e.copy(n);pa.subVectors(t,s);const h=Ds.dot(pa),u=Is.dot(pa);if(h>=0&&u<=h)return e.copy(s);const p=l*u-h*c;if(p<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Ds,o);ma.subVectors(t,r);const f=Ds.dot(ma),m=Is.dot(ma);if(m>=0&&f<=m)return e.copy(r);const g=f*c-l*m;if(g<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(Is,a);const x=h*m-f*u;if(x<=0&&u-h>=0&&f-m>=0)return Qc.subVectors(r,s),a=(u-h)/(u-h+(f-m)),e.copy(s).addScaledVector(Qc,a);const d=1/(x+g+p);return o=g*d,a=p*d,e.copy(n).addScaledVector(Ds,o).addScaledVector(Is,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Eu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zi={h:0,s:0,l:0},Qr={h:0,s:0,l:0};function _a(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Qt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=An){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ue.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Ue.workingColorSpace){return this.r=t,this.g=e,this.b=n,Ue.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Ue.workingColorSpace){if(t=oc(t,1),e=Se(e,0,1),n=Se(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=_a(o,r,t+1/3),this.g=_a(o,r,t),this.b=_a(o,r,t-1/3)}return Ue.colorSpaceToWorking(this,s),this}setStyle(t,e=An){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=An){const n=Eu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=bi(t.r),this.g=bi(t.g),this.b=bi(t.b),this}copyLinearToSRGB(t){return this.r=qs(t.r),this.g=qs(t.g),this.b=qs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=An){return Ue.workingToColorSpace(_n.copy(this),t),Math.round(Se(_n.r*255,0,255))*65536+Math.round(Se(_n.g*255,0,255))*256+Math.round(Se(_n.b*255,0,255))}getHexString(t=An){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Ue.workingColorSpace){Ue.workingToColorSpace(_n.copy(this),e);const n=_n.r,s=_n.g,r=_n.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Ue.workingColorSpace){return Ue.workingToColorSpace(_n.copy(this),e),t.r=_n.r,t.g=_n.g,t.b=_n.b,t}getStyle(t=An){Ue.workingToColorSpace(_n.copy(this),t);const e=_n.r,n=_n.g,s=_n.b;return t!==An?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(zi),this.setHSL(zi.h+t,zi.s+e,zi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(zi),t.getHSL(Qr);const n=Er(zi.h,Qr.h,e),s=Er(zi.s,Qr.s,e),r=Er(zi.l,Qr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _n=new Qt;Qt.NAMES=Eu;let Ff=0;class Zi extends er{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=ms(),this.name="",this.type="Material",this.blending=Xs,this.side=Ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=tl,this.blendDst=el,this.blendEquation=cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qt(0,0,0),this.blendAlpha=0,this.depthFunc=Ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=kc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bs,this.stencilZFail=bs,this.stencilZPass=bs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Xs&&(n.blending=this.blending),this.side!==Ei&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==tl&&(n.blendSrc=this.blendSrc),this.blendDst!==el&&(n.blendDst=this.blendDst),this.blendEquation!==cs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ys&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==kc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==bs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==bs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==bs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Ln extends Zi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.combine=du,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const nn=new L,to=new Ht;let kf=0;class an{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Oc,this.updateRanges=[],this.gpuType=Kn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)to.fromBufferAttribute(this,e),to.applyMatrix3(t),this.setXY(e,to.x,to.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)nn.fromBufferAttribute(this,e),nn.applyMatrix3(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)nn.fromBufferAttribute(this,e),nn.applyMatrix4(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)nn.fromBufferAttribute(this,e),nn.applyNormalMatrix(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)nn.fromBufferAttribute(this,e),nn.transformDirection(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Bs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Sn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Bs(e,this.array)),e}setX(t,e){return this.normalized&&(e=Sn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Bs(e,this.array)),e}setY(t,e){return this.normalized&&(e=Sn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Bs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Sn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Bs(e,this.array)),e}setW(t,e){return this.normalized&&(e=Sn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Sn(e,this.array),n=Sn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Sn(e,this.array),n=Sn(n,this.array),s=Sn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Sn(e,this.array),n=Sn(n,this.array),s=Sn(s,this.array),r=Sn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Oc&&(t.usage=this.usage),t}}class cc extends an{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Tu extends an{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Vt extends an{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Of=0;const Fn=new ce,Ma=new $e,Ls=new L,In=new ai,mr=new ai,un=new L;class Te extends er{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=ms(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(bu(t)?Tu:cc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new xe().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Fn.makeRotationFromQuaternion(t),this.applyMatrix4(Fn),this}rotateX(t){return Fn.makeRotationX(t),this.applyMatrix4(Fn),this}rotateY(t){return Fn.makeRotationY(t),this.applyMatrix4(Fn),this}rotateZ(t){return Fn.makeRotationZ(t),this.applyMatrix4(Fn),this}translate(t,e,n){return Fn.makeTranslation(t,e,n),this.applyMatrix4(Fn),this}scale(t,e,n){return Fn.makeScale(t,e,n),this.applyMatrix4(Fn),this}lookAt(t){return Ma.lookAt(t),Ma.updateMatrix(),this.applyMatrix4(Ma.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ls).negate(),this.translate(Ls.x,Ls.y,Ls.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Vt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ai);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];In.setFromBufferAttribute(r),this.morphTargetsRelative?(un.addVectors(this.boundingBox.min,In.min),this.boundingBox.expandByPoint(un),un.addVectors(this.boundingBox.max,In.max),this.boundingBox.expandByPoint(un)):(this.boundingBox.expandByPoint(In.min),this.boundingBox.expandByPoint(In.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ti);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(In.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];mr.setFromBufferAttribute(a),this.morphTargetsRelative?(un.addVectors(In.min,mr.min),In.expandByPoint(un),un.addVectors(In.max,mr.max),In.expandByPoint(un)):(In.expandByPoint(mr.min),In.expandByPoint(mr.max))}In.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)un.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(un));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)un.fromBufferAttribute(a,c),l&&(Ls.fromBufferAttribute(t,c),un.add(Ls)),s=Math.max(s,n.distanceToSquared(un))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new an(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let A=0;A<n.count;A++)a[A]=new L,l[A]=new L;const c=new L,h=new L,u=new L,p=new Ht,f=new Ht,m=new Ht,g=new L,x=new L;function d(A,S,y){c.fromBufferAttribute(n,A),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,y),p.fromBufferAttribute(r,A),f.fromBufferAttribute(r,S),m.fromBufferAttribute(r,y),h.sub(c),u.sub(c),f.sub(p),m.sub(p);const U=1/(f.x*m.y-m.x*f.y);isFinite(U)&&(g.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(U),x.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(U),a[A].add(g),a[S].add(g),a[y].add(g),l[A].add(x),l[S].add(x),l[y].add(x))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let A=0,S=b.length;A<S;++A){const y=b[A],U=y.start,N=y.count;for(let X=U,J=U+N;X<J;X+=3)d(t.getX(X+0),t.getX(X+1),t.getX(X+2))}const M=new L,_=new L,C=new L,R=new L;function E(A){C.fromBufferAttribute(s,A),R.copy(C);const S=a[A];M.copy(S),M.sub(C.multiplyScalar(C.dot(S))).normalize(),_.crossVectors(R,S);const U=_.dot(l[A])<0?-1:1;o.setXYZW(A,M.x,M.y,M.z,U)}for(let A=0,S=b.length;A<S;++A){const y=b[A],U=y.start,N=y.count;for(let X=U,J=U+N;X<J;X+=3)E(t.getX(X+0)),E(t.getX(X+1)),E(t.getX(X+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new an(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,f=n.count;p<f;p++)n.setXYZ(p,0,0,0);const s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,u=new L;if(t)for(let p=0,f=t.count;p<f;p+=3){const m=t.getX(p+0),g=t.getX(p+1),x=t.getX(p+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,g),o.fromBufferAttribute(e,x),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(x,c.x,c.y,c.z)}else for(let p=0,f=e.count;p<f;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),o.fromBufferAttribute(e,p+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)un.fromBufferAttribute(t,e),un.normalize(),t.setXYZ(e,un.x,un.y,un.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,p=new c.constructor(l.length*h);let f=0,m=0;for(let g=0,x=l.length;g<x;g++){a.isInterleavedBufferAttribute?f=l[g]*a.data.stride+a.offset:f=l[g]*h;for(let d=0;d<h;d++)p[m++]=c[f++]}return new an(p,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Te,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const p=c[h],f=t(p,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,p=c.length;u<p;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let p=0,f=u.length;p<f;p++)h.push(u[p].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const th=new ce,ns=new kr,eo=new Ti,eh=new L,no=new L,io=new L,so=new L,ya=new L,ro=new L,nh=new L,oo=new L;class ne extends $e{constructor(t=new Te,e=new Ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){ro.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(ya.fromBufferAttribute(u,t),o?ro.addScaledVector(ya,h):ro.addScaledVector(ya.sub(e),h))}e.add(ro)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),eo.copy(n.boundingSphere),eo.applyMatrix4(r),ns.copy(t.ray).recast(t.near),!(eo.containsPoint(ns.origin)===!1&&(ns.intersectSphere(eo,eh)===null||ns.origin.distanceToSquared(eh)>(t.far-t.near)**2))&&(th.copy(r).invert(),ns.copy(t.ray).applyMatrix4(th),!(n.boundingBox!==null&&ns.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ns)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,p=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,g=p.length;m<g;m++){const x=p[m],d=o[x.materialIndex],b=Math.max(x.start,f.start),M=Math.min(a.count,Math.min(x.start+x.count,f.start+f.count));for(let _=b,C=M;_<C;_+=3){const R=a.getX(_),E=a.getX(_+1),A=a.getX(_+2);s=ao(this,d,t,n,c,h,u,R,E,A),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=x.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),g=Math.min(a.count,f.start+f.count);for(let x=m,d=g;x<d;x+=3){const b=a.getX(x),M=a.getX(x+1),_=a.getX(x+2);s=ao(this,o,t,n,c,h,u,b,M,_),s&&(s.faceIndex=Math.floor(x/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,g=p.length;m<g;m++){const x=p[m],d=o[x.materialIndex],b=Math.max(x.start,f.start),M=Math.min(l.count,Math.min(x.start+x.count,f.start+f.count));for(let _=b,C=M;_<C;_+=3){const R=_,E=_+1,A=_+2;s=ao(this,d,t,n,c,h,u,R,E,A),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=x.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let x=m,d=g;x<d;x+=3){const b=x,M=x+1,_=x+2;s=ao(this,o,t,n,c,h,u,b,M,_),s&&(s.faceIndex=Math.floor(x/3),e.push(s))}}}}function Bf(i,t,e,n,s,r,o,a){let l;if(t.side===En?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Ei,a),l===null)return null;oo.copy(a),oo.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(oo);return c<e.near||c>e.far?null:{distance:c,point:oo.clone(),object:i}}function ao(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,no),i.getVertexPosition(l,io),i.getVertexPosition(c,so);const h=Bf(i,t,e,n,no,io,so,nh);if(h){const u=new L;Zn.getBarycoord(nh,no,io,so,u),s&&(h.uv=Zn.getInterpolatedAttribute(s,a,l,c,u,new Ht)),r&&(h.uv1=Zn.getInterpolatedAttribute(r,a,l,c,u,new Ht)),o&&(h.normal=Zn.getInterpolatedAttribute(o,a,l,c,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const p={a,b:l,c,normal:new L,materialIndex:0};Zn.getNormal(no,io,so,p.normal),h.face=p,h.barycoord=u}return h}class $i extends Te{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let p=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Vt(c,3)),this.setAttribute("normal",new Vt(h,3)),this.setAttribute("uv",new Vt(u,2));function m(g,x,d,b,M,_,C,R,E,A,S){const y=_/E,U=C/A,N=_/2,X=C/2,J=R/2,B=E+1,W=A+1;let Q=0,Y=0;const ct=new L;for(let j=0;j<W;j++){const Mt=j*U-X;for(let $t=0;$t<B;$t++){const Ee=$t*y-N;ct[g]=Ee*b,ct[x]=Mt*M,ct[d]=J,c.push(ct.x,ct.y,ct.z),ct[g]=0,ct[x]=0,ct[d]=R>0?1:-1,h.push(ct.x,ct.y,ct.z),u.push($t/E),u.push(1-j/A),Q+=1}}for(let j=0;j<A;j++)for(let Mt=0;Mt<E;Mt++){const $t=p+Mt+B*j,Ee=p+Mt+B*(j+1),le=p+(Mt+1)+B*(j+1),ht=p+(Mt+1)+B*j;l.push($t,Ee,ht),l.push(Ee,le,ht),Y+=6}a.addGroup(f,Y,S),f+=Y,p+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Js(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function bn(i){const t={};for(let e=0;e<i.length;e++){const n=Js(i[e]);for(const s in n)t[s]=n[s]}return t}function Hf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Au(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ue.workingColorSpace}const No={clone:Js,merge:bn};var Gf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Bn extends Zi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gf,this.fragmentShader=Vf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Js(t.uniforms),this.uniformsGroups=Hf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Ru extends $e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=ri,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ni=new L,ih=new Ht,sh=new Ht;class Rn extends Ru{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Lr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(wr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Lr*2*Math.atan(Math.tan(wr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ni.x,Ni.y).multiplyScalar(-t/Ni.z),Ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ni.x,Ni.y).multiplyScalar(-t/Ni.z)}getViewSize(t,e){return this.getViewBounds(t,ih,sh),e.subVectors(sh,ih)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(wr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Us=-90,zs=1;class Wf extends $e{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Rn(Us,zs,t,e);s.layers=this.layers,this.add(s);const r=new Rn(Us,zs,t,e);r.layers=this.layers,this.add(r);const o=new Rn(Us,zs,t,e);o.layers=this.layers,this.add(o);const a=new Rn(Us,zs,t,e);a.layers=this.layers,this.add(a);const l=new Rn(Us,zs,t,e);l.layers=this.layers,this.add(l);const c=new Rn(Us,zs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===ri)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Uo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),p=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,p,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Cu extends Mn{constructor(t=[],e=$s,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Xf extends Yi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Cu(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new $i(5,5,5),r=new Bn({name:"CubemapFromEquirect",uniforms:Js(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:En,blending:Wi});r.uniforms.tEquirect.value=e;const o=new ne(s,r),a=e.minFilter;return e.minFilter===Vi&&(e.minFilter=jn),new Wf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class pe extends $e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qf={type:"move"};class Sa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const g of t.hand.values()){const x=e.getJointPose(g,n),d=this._getHandJoint(c,g);x!==null&&(d.matrix.fromArray(x.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=x.radius),d.visible=x!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],p=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&p>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&p<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(qf)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new pe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Go{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Qt(t),this.density=e}clone(){return new Go(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Yf extends $e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new li,this.environmentIntensity=1,this.environmentRotation=new li,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const rh=new L,oh=new Ie,ah=new Ie,$f=new L,lh=new ce,lo=new L,ba=new Ti,ch=new ce,wa=new kr;class co extends ne{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Fc,this.bindMatrix=new ce,this.bindMatrixInverse=new ce,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new ai),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,lo),this.boundingBox.expandByPoint(lo)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ti),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,lo),this.boundingSphere.expandByPoint(lo)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ba.copy(this.boundingSphere),ba.applyMatrix4(s),t.ray.intersectsSphere(ba)!==!1&&(ch.copy(s).invert(),wa.copy(t.ray).applyMatrix4(ch),!(this.boundingBox!==null&&wa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,wa)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Ie,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Fc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Yd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,s=this.geometry;oh.fromBufferAttribute(s.attributes.skinIndex,t),ah.fromBufferAttribute(s.attributes.skinWeight,t),rh.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const o=ah.getComponent(r);if(o!==0){const a=oh.getComponent(r);lh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector($f.copy(rh).applyMatrix4(lh),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class Pu extends $e{constructor(){super(),this.isBone=!0,this.type="Bone"}}class hc extends Mn{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Nn,h=Nn,u,p){super(null,o,a,l,c,h,s,r,u,p),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const hh=new ce,Zf=new ce;class uc{constructor(t=[],e=[]){this.uuid=ms(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ce)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new ce;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:Zf;hh.multiplyMatrices(a,e[r]),hh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new uc(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new hc(e,t,t,zn,Kn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){const r=t.bones[n];let o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Pu),this.bones.push(o),this.boneInverses.push(new ce().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const o=e[s];t.bones.push(o.uuid);const a=n[s];t.boneInverses.push(a.toArray())}return t}}class Hs extends an{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ns=new ce,uh=new ce,ho=[],dh=new ai,jf=new ce,gr=new ne,xr=new Ti;class Tn extends ne{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Hs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,jf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ai),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ns),dh.copy(t.boundingBox).applyMatrix4(Ns),this.boundingBox.union(dh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ti),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ns),xr.copy(t.boundingSphere).applyMatrix4(Ns),this.boundingSphere.union(xr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(gr.geometry=this.geometry,gr.material=this.material,gr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xr.copy(this.boundingSphere),xr.applyMatrix4(n),t.ray.intersectsSphere(xr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ns),uh.multiplyMatrices(n,Ns),gr.matrixWorld=uh,gr.raycast(t,ho);for(let o=0,a=ho.length;o<a;o++){const l=ho[o];l.instanceId=r,l.object=this,e.push(l)}ho.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Hs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new hc(new Float32Array(s*this.count),s,this.count,ec,Kn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ea=new L,Kf=new L,Jf=new xe;class $n{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ea.subVectors(n,e).cross(Kf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ea),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Jf.getNormalMatrix(t),s=this.coplanarPoint(Ea).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const is=new Ti,Qf=new Ht(.5,.5),uo=new L;class dc{constructor(t=new $n,e=new $n,n=new $n,s=new $n,r=new $n,o=new $n){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ri,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],p=r[6],f=r[7],m=r[8],g=r[9],x=r[10],d=r[11],b=r[12],M=r[13],_=r[14],C=r[15];if(s[0].setComponents(c-o,f-h,d-m,C-b).normalize(),s[1].setComponents(c+o,f+h,d+m,C+b).normalize(),s[2].setComponents(c+a,f+u,d+g,C+M).normalize(),s[3].setComponents(c-a,f-u,d-g,C-M).normalize(),n)s[4].setComponents(l,p,x,_).normalize(),s[5].setComponents(c-l,f-p,d-x,C-_).normalize();else if(s[4].setComponents(c-l,f-p,d-x,C-_).normalize(),e===ri)s[5].setComponents(c+l,f+p,d+x,C+_).normalize();else if(e===Uo)s[5].setComponents(l,p,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),is.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),is.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(is)}intersectsSprite(t){is.center.set(0,0,0);const e=Qf.distanceTo(t.center);return is.radius=.7071067811865476+e,is.applyMatrix4(t.matrixWorld),this.intersectsSphere(is)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(uo.x=s.normal.x>0?t.max.x:t.min.x,uo.y=s.normal.y>0?t.max.y:t.min.y,uo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(uo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class fc extends Zi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Fo=new L,ko=new L,fh=new ce,vr=new kr,fo=new Ti,Ta=new L,ph=new L;class zr extends $e{constructor(t=new Te,e=new fc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Fo.fromBufferAttribute(e,s-1),ko.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Fo.distanceTo(ko);t.setAttribute("lineDistance",new Vt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fo.copy(n.boundingSphere),fo.applyMatrix4(s),fo.radius+=r,t.ray.intersectsSphere(fo)===!1)return;fh.copy(s).invert(),vr.copy(t.ray).applyMatrix4(fh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let g=f,x=m-1;g<x;g+=c){const d=h.getX(g),b=h.getX(g+1),M=po(this,t,vr,l,d,b,g);M&&e.push(M)}if(this.isLineLoop){const g=h.getX(m-1),x=h.getX(f),d=po(this,t,vr,l,g,x,m-1);d&&e.push(d)}}else{const f=Math.max(0,o.start),m=Math.min(p.count,o.start+o.count);for(let g=f,x=m-1;g<x;g+=c){const d=po(this,t,vr,l,g,g+1,g);d&&e.push(d)}if(this.isLineLoop){const g=po(this,t,vr,l,m-1,f,m-1);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function po(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(Fo.fromBufferAttribute(a,s),ko.fromBufferAttribute(a,r),e.distanceSqToSegment(Fo,ko,Ta,ph)>n)return;Ta.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Ta);if(!(c<t.near||c>t.far))return{distance:c,point:ph.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const mh=new L,gh=new L;class tp extends zr{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)mh.fromBufferAttribute(e,s),gh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+mh.distanceTo(gh);t.setAttribute("lineDistance",new Vt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ep extends zr{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class np extends Zi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Qt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const xh=new ce,Hl=new kr,mo=new Ti,go=new L;class ip extends $e{constructor(t=new Te,e=new np){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),mo.copy(n.boundingSphere),mo.applyMatrix4(s),mo.radius+=r,t.ray.intersectsSphere(mo)===!1)return;xh.copy(s).invert(),Hl.copy(t.ray).applyMatrix4(xh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const p=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let m=p,g=f;m<g;m++){const x=c.getX(m);go.fromBufferAttribute(u,x),vh(go,x,l,s,t,e,this)}}else{const p=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let m=p,g=f;m<g;m++)go.fromBufferAttribute(u,m),vh(go,m,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function vh(i,t,e,n,s,r,o){const a=Hl.distanceSqToPoint(i);if(a<e){const l=new L;Hl.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Du extends Mn{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Iu extends Mn{constructor(t,e,n=ps,s,r,o,a=Nn,l=Nn,c,h=Dr,u=1){if(h!==Dr&&h!==Ir)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:t,height:e,depth:u};super(p,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ac(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Lu extends Mn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Vo extends Te{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new L,h=new Ht;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,p=3;u<=e;u++,p+=3){const f=n+u/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[p]/t+1)/2,h.y=(o[p+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Vt(o,3)),this.setAttribute("normal",new Vt(a,3)),this.setAttribute("uv",new Vt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vo(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Or extends Te{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],p=[],f=[];let m=0;const g=[],x=n/2;let d=0;b(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new Vt(u,3)),this.setAttribute("normal",new Vt(p,3)),this.setAttribute("uv",new Vt(f,2));function b(){const _=new L,C=new L;let R=0;const E=(e-t)/n;for(let A=0;A<=r;A++){const S=[],y=A/r,U=y*(e-t)+t;for(let N=0;N<=s;N++){const X=N/s,J=X*l+a,B=Math.sin(J),W=Math.cos(J);C.x=U*B,C.y=-y*n+x,C.z=U*W,u.push(C.x,C.y,C.z),_.set(B,E,W).normalize(),p.push(_.x,_.y,_.z),f.push(X,1-y),S.push(m++)}g.push(S)}for(let A=0;A<s;A++)for(let S=0;S<r;S++){const y=g[S][A],U=g[S+1][A],N=g[S+1][A+1],X=g[S][A+1];(t>0||S!==0)&&(h.push(y,U,X),R+=3),(e>0||S!==r-1)&&(h.push(U,N,X),R+=3)}c.addGroup(d,R,0),d+=R}function M(_){const C=m,R=new Ht,E=new L;let A=0;const S=_===!0?t:e,y=_===!0?1:-1;for(let N=1;N<=s;N++)u.push(0,x*y,0),p.push(0,y,0),f.push(.5,.5),m++;const U=m;for(let N=0;N<=s;N++){const J=N/s*l+a,B=Math.cos(J),W=Math.sin(J);E.x=S*W,E.y=x*y,E.z=S*B,u.push(E.x,E.y,E.z),p.push(0,y,0),R.x=B*.5+.5,R.y=W*.5*y+.5,f.push(R.x,R.y),m++}for(let N=0;N<s;N++){const X=C+N,J=U+N;_===!0?h.push(J,J+1,X):h.push(J+1,J,X),A+=3}c.addGroup(d,A,_===!0?1:2),d+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Or(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Wo extends Te{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new Vt(r,3)),this.setAttribute("normal",new Vt(r.slice(),3)),this.setAttribute("uv",new Vt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(b){const M=new L,_=new L,C=new L;for(let R=0;R<e.length;R+=3)f(e[R+0],M),f(e[R+1],_),f(e[R+2],C),l(M,_,C,b)}function l(b,M,_,C){const R=C+1,E=[];for(let A=0;A<=R;A++){E[A]=[];const S=b.clone().lerp(_,A/R),y=M.clone().lerp(_,A/R),U=R-A;for(let N=0;N<=U;N++)N===0&&A===R?E[A][N]=S:E[A][N]=S.clone().lerp(y,N/U)}for(let A=0;A<R;A++)for(let S=0;S<2*(R-A)-1;S++){const y=Math.floor(S/2);S%2===0?(p(E[A][y+1]),p(E[A+1][y]),p(E[A][y])):(p(E[A][y+1]),p(E[A+1][y+1]),p(E[A+1][y]))}}function c(b){const M=new L;for(let _=0;_<r.length;_+=3)M.x=r[_+0],M.y=r[_+1],M.z=r[_+2],M.normalize().multiplyScalar(b),r[_+0]=M.x,r[_+1]=M.y,r[_+2]=M.z}function h(){const b=new L;for(let M=0;M<r.length;M+=3){b.x=r[M+0],b.y=r[M+1],b.z=r[M+2];const _=x(b)/2/Math.PI+.5,C=d(b)/Math.PI+.5;o.push(_,1-C)}m(),u()}function u(){for(let b=0;b<o.length;b+=6){const M=o[b+0],_=o[b+2],C=o[b+4],R=Math.max(M,_,C),E=Math.min(M,_,C);R>.9&&E<.1&&(M<.2&&(o[b+0]+=1),_<.2&&(o[b+2]+=1),C<.2&&(o[b+4]+=1))}}function p(b){r.push(b.x,b.y,b.z)}function f(b,M){const _=b*3;M.x=t[_+0],M.y=t[_+1],M.z=t[_+2]}function m(){const b=new L,M=new L,_=new L,C=new L,R=new Ht,E=new Ht,A=new Ht;for(let S=0,y=0;S<r.length;S+=9,y+=6){b.set(r[S+0],r[S+1],r[S+2]),M.set(r[S+3],r[S+4],r[S+5]),_.set(r[S+6],r[S+7],r[S+8]),R.set(o[y+0],o[y+1]),E.set(o[y+2],o[y+3]),A.set(o[y+4],o[y+5]),C.copy(b).add(M).add(_).divideScalar(3);const U=x(C);g(R,y+0,b,U),g(E,y+2,M,U),g(A,y+4,_,U)}}function g(b,M,_,C){C<0&&b.x===1&&(o[M]=b.x-1),_.x===0&&_.z===0&&(o[M]=C/2/Math.PI+.5)}function x(b){return Math.atan2(b.z,-b.x)}function d(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wo(t.vertices,t.indices,t.radius,t.details)}}class Xo extends Wo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Xo(t.radius,t.detail)}}class Ai{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],p=n[s+1]-h,f=(o-h)/p;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new Ht:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new L,s=[],r=[],o=[],a=new L,l=new ce;for(let f=0;f<=t;f++){const m=f/t;s[f]=this.getTangentAt(m,new L)}r[0]=new L,o[0]=new L;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),p=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),p<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Se(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Se(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Uu extends Ai{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Ht){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),p=l-this.aX,f=c-this.aY;l=p*h-f*u+this.aX,c=p*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class sp extends Uu{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function pc(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let p=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;p*=h,f*=h,s(o,a,p,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const xo=new L,Aa=new pc,Ra=new pc,Ca=new pc;class Nr extends Ai{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(xo.subVectors(s[0],s[1]).add(s[0]),c=xo);const u=s[a%r],p=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(xo.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=xo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(p),f),x=Math.pow(p.distanceToSquared(h),f);g<1e-4&&(g=1),m<1e-4&&(m=g),x<1e-4&&(x=g),Aa.initNonuniformCatmullRom(c.x,u.x,p.x,h.x,m,g,x),Ra.initNonuniformCatmullRom(c.y,u.y,p.y,h.y,m,g,x),Ca.initNonuniformCatmullRom(c.z,u.z,p.z,h.z,m,g,x)}else this.curveType==="catmullrom"&&(Aa.initCatmullRom(c.x,u.x,p.x,h.x,this.tension),Ra.initCatmullRom(c.y,u.y,p.y,h.y,this.tension),Ca.initCatmullRom(c.z,u.z,p.z,h.z,this.tension));return n.set(Aa.calc(l),Ra.calc(l),Ca.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function _h(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function rp(i,t){const e=1-i;return e*e*t}function op(i,t){return 2*(1-i)*i*t}function ap(i,t){return i*i*t}function Tr(i,t,e,n){return rp(i,t)+op(i,e)+ap(i,n)}function lp(i,t){const e=1-i;return e*e*e*t}function cp(i,t){const e=1-i;return 3*e*e*i*t}function hp(i,t){return 3*(1-i)*i*i*t}function up(i,t){return i*i*i*t}function Ar(i,t,e,n,s){return lp(i,t)+cp(i,e)+hp(i,n)+up(i,s)}class dp extends Ai{constructor(t=new Ht,e=new Ht,n=new Ht,s=new Ht){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Ht){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ar(t,s.x,r.x,o.x,a.x),Ar(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class fp extends Ai{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ar(t,s.x,r.x,o.x,a.x),Ar(t,s.y,r.y,o.y,a.y),Ar(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class pp extends Ai{constructor(t=new Ht,e=new Ht){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ht){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ht){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class mp extends Ai{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class gp extends Ai{constructor(t=new Ht,e=new Ht,n=new Ht){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Ht){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Tr(t,s.x,r.x,o.x),Tr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class zu extends Ai{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Tr(t,s.x,r.x,o.x),Tr(t,s.y,r.y,o.y),Tr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class xp extends Ai{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ht){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(_h(a,l.x,c.x,h.x,u.x),_h(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Ht().fromArray(s))}return this}}var vp=Object.freeze({__proto__:null,ArcCurve:sp,CatmullRomCurve3:Nr,CubicBezierCurve:dp,CubicBezierCurve3:fp,EllipseCurve:Uu,LineCurve:pp,LineCurve3:mp,QuadraticBezierCurve:gp,QuadraticBezierCurve3:zu,SplineCurve:xp});class mc extends Wo{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new mc(t.radius,t.detail)}}class Si extends Te{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,p=e/l,f=[],m=[],g=[],x=[];for(let d=0;d<h;d++){const b=d*p-o;for(let M=0;M<c;M++){const _=M*u-r;m.push(_,-b,0),g.push(0,0,1),x.push(M/a),x.push(1-d/l)}}for(let d=0;d<l;d++)for(let b=0;b<a;b++){const M=b+c*d,_=b+c*(d+1),C=b+1+c*(d+1),R=b+1+c*d;f.push(M,_,R),f.push(_,C,R)}this.setIndex(f),this.setAttribute("position",new Vt(m,3)),this.setAttribute("normal",new Vt(g,3)),this.setAttribute("uv",new Vt(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Si(t.width,t.height,t.widthSegments,t.heightSegments)}}class us extends Te{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let u=t;const p=(e-t)/s,f=new L,m=new Ht;for(let g=0;g<=s;g++){for(let x=0;x<=n;x++){const d=r+x/n*o;f.x=u*Math.cos(d),f.y=u*Math.sin(d),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}u+=p}for(let g=0;g<s;g++){const x=g*(n+1);for(let d=0;d<n;d++){const b=d+x,M=b,_=b+n+1,C=b+n+2,R=b+1;a.push(M,_,R),a.push(_,C,R)}}this.setIndex(a),this.setAttribute("position",new Vt(l,3)),this.setAttribute("normal",new Vt(c,3)),this.setAttribute("uv",new Vt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new us(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ci extends Te{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new L,p=new L,f=[],m=[],g=[],x=[];for(let d=0;d<=n;d++){const b=[],M=d/n;let _=0;d===0&&o===0?_=.5/e:d===n&&l===Math.PI&&(_=-.5/e);for(let C=0;C<=e;C++){const R=C/e;u.x=-t*Math.cos(s+R*r)*Math.sin(o+M*a),u.y=t*Math.cos(o+M*a),u.z=t*Math.sin(s+R*r)*Math.sin(o+M*a),m.push(u.x,u.y,u.z),p.copy(u).normalize(),g.push(p.x,p.y,p.z),x.push(R+_,1-M),b.push(c++)}h.push(b)}for(let d=0;d<n;d++)for(let b=0;b<e;b++){const M=h[d][b+1],_=h[d][b],C=h[d+1][b],R=h[d+1][b+1];(d!==0||o>0)&&f.push(M,_,R),(d!==n-1||l<Math.PI)&&f.push(_,C,R)}this.setIndex(f),this.setAttribute("position",new Vt(m,3)),this.setAttribute("normal",new Vt(g,3)),this.setAttribute("uv",new Vt(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ci(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class gc extends Te{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new L,u=new L,p=new L;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const g=m/s*r,x=f/n*Math.PI*2;u.x=(t+e*Math.cos(x))*Math.cos(g),u.y=(t+e*Math.cos(x))*Math.sin(g),u.z=e*Math.sin(x),a.push(u.x,u.y,u.z),h.x=t*Math.cos(g),h.y=t*Math.sin(g),p.subVectors(u,h).normalize(),l.push(p.x,p.y,p.z),c.push(m/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const g=(s+1)*f+m-1,x=(s+1)*(f-1)+m-1,d=(s+1)*(f-1)+m,b=(s+1)*f+m;o.push(g,x,b),o.push(x,d,b)}this.setIndex(o),this.setAttribute("position",new Vt(a,3)),this.setAttribute("normal",new Vt(l,3)),this.setAttribute("uv",new Vt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gc(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class qo extends Te{constructor(t=new zu(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new L,l=new L,c=new Ht;let h=new L;const u=[],p=[],f=[],m=[];g(),this.setIndex(m),this.setAttribute("position",new Vt(u,3)),this.setAttribute("normal",new Vt(p,3)),this.setAttribute("uv",new Vt(f,2));function g(){for(let M=0;M<e;M++)x(M);x(r===!1?e:0),b(),d()}function x(M){h=t.getPointAt(M/e,h);const _=o.normals[M],C=o.binormals[M];for(let R=0;R<=s;R++){const E=R/s*Math.PI*2,A=Math.sin(E),S=-Math.cos(E);l.x=S*_.x+A*C.x,l.y=S*_.y+A*C.y,l.z=S*_.z+A*C.z,l.normalize(),p.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function d(){for(let M=1;M<=e;M++)for(let _=1;_<=s;_++){const C=(s+1)*(M-1)+(_-1),R=(s+1)*M+(_-1),E=(s+1)*M+_,A=(s+1)*(M-1)+_;m.push(C,R,A),m.push(R,E,A)}}function b(){for(let M=0;M<=e;M++)for(let _=0;_<=s;_++)c.x=M/e,c.y=_/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new qo(new vp[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Ve extends Zi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rc,this.normalScale=new Ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Nu extends Ve{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ht(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Se(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Qt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Qt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Qt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Bi extends Zi{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Qt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rc,this.normalScale=new Ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class _p extends Zi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Mp extends Zi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Fu extends fc{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class xc extends $e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class yp extends xc{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Pa=new ce,Mh=new L,yh=new L;class ku{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ht(512,512),this.mapType=oi,this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new dc,this._frameExtents=new Ht(1,1),this._viewportCount=1,this._viewports=[new Ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Mh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Mh),yh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(yh),e.updateMatrixWorld(),Pa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Pa,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Pa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Sh=new ce,_r=new L,Da=new L;class Sp extends ku{constructor(){super(new Rn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ht(4,2),this._viewportCount=6,this._viewports=[new Ie(2,1,1,1),new Ie(0,1,1,1),new Ie(3,1,1,1),new Ie(1,1,1,1),new Ie(3,0,1,1),new Ie(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),_r.setFromMatrixPosition(t.matrixWorld),n.position.copy(_r),Da.copy(n.position),Da.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Da),n.updateMatrixWorld(),s.makeTranslation(-_r.x,-_r.y,-_r.z),Sh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sh,n.coordinateSystem,n.reversedDepth)}}class bp extends xc{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Sp}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Ou extends Ru{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class wp extends ku{constructor(){super(new Ou(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ep extends xc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.target=new $e,this.shadow=new wp}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Tp extends Te{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Ap extends Rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const bh=new ce;class Do{constructor(t,e,n=0,s=1/0){this.ray=new kr(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new lc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return bh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(bh),this}intersectObject(t,e=!0,n=[]){return Gl(t,this,n,e),n.sort(wh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Gl(t[s],this,n,e);return n.sort(wh),n}}function wh(i,t){return i.distance-t.distance}function Gl(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Gl(r[o],t,e,!0)}}function Eh(i,t,e,n){const s=Rp(n);switch(e){case _u:return i*t;case ec:return i*t/s.components*s.byteLength;case nc:return i*t/s.components*s.byteLength;case yu:return i*t*2/s.components*s.byteLength;case ic:return i*t*2/s.components*s.byteLength;case Mu:return i*t*3/s.components*s.byteLength;case zn:return i*t*4/s.components*s.byteLength;case sc:return i*t*4/s.components*s.byteLength;case Ao:case Ro:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Co:case Po:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case fl:case ml:return Math.max(i,16)*Math.max(t,8)/4;case dl:case pl:return Math.max(i,8)*Math.max(t,8)/2;case gl:case xl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case vl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case _l:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ml:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case yl:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Sl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case bl:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case wl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case El:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Tl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Al:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Rl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Cl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Pl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Dl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Il:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ll:case Ul:case zl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Nl:case Fl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case kl:case Ol:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Rp(i){switch(i){case oi:case mu:return{byteLength:1,components:1};case Cr:case gu:case Fr:return{byteLength:2,components:1};case Ql:case tc:return{byteLength:2,components:4};case ps:case Jl:case Kn:return{byteLength:4,components:1};case xu:case vu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Kl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Kl);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Bu(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Cp(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let p=0;for(let f=1;f<u.length;f++){const m=u[p],g=u[f];g.start<=m.start+m.count+1?m.count=Math.max(m.count,g.start+g.count-m.start):(++p,u[p]=g)}u.length=p+1;for(let f=0,m=u.length;f<m;f++){const g=u[f];i.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Pp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ip=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Up=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Np=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Fp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Op=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Gp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Vp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Wp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Xp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,qp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$p=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Kp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Jp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Qp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,tm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,em=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,nm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,im=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,om="gl_FragColor = linearToOutputTexel( gl_FragColor );",am=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,cm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,hm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,um=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,vm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_m=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ym=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Sm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,bm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Em=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Am=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Rm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Cm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Pm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Dm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Im=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Um=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Nm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Fm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,km=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Om=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Vm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,qm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ym=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,$m=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Zm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Km=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Jm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Qm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,t0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,e0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,n0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,i0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,s0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,r0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,o0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,a0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,l0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,c0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,h0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,u0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,d0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,f0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,p0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,m0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,g0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,x0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,v0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,_0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,M0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,y0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,S0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,b0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,w0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,E0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,T0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,A0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,R0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const C0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,P0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,D0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,I0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,U0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,N0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,F0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,k0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,O0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,B0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,H0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,G0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,V0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,W0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,X0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,q0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Y0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,$0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,j0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,K0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,J0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Q0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,tg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ng=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ig=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,sg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,rg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,og=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ag=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,lg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,_e={alphahash_fragment:Pp,alphahash_pars_fragment:Dp,alphamap_fragment:Ip,alphamap_pars_fragment:Lp,alphatest_fragment:Up,alphatest_pars_fragment:zp,aomap_fragment:Np,aomap_pars_fragment:Fp,batching_pars_vertex:kp,batching_vertex:Op,begin_vertex:Bp,beginnormal_vertex:Hp,bsdfs:Gp,iridescence_fragment:Vp,bumpmap_pars_fragment:Wp,clipping_planes_fragment:Xp,clipping_planes_pars_fragment:qp,clipping_planes_pars_vertex:Yp,clipping_planes_vertex:$p,color_fragment:Zp,color_pars_fragment:jp,color_pars_vertex:Kp,color_vertex:Jp,common:Qp,cube_uv_reflection_fragment:tm,defaultnormal_vertex:em,displacementmap_pars_vertex:nm,displacementmap_vertex:im,emissivemap_fragment:sm,emissivemap_pars_fragment:rm,colorspace_fragment:om,colorspace_pars_fragment:am,envmap_fragment:lm,envmap_common_pars_fragment:cm,envmap_pars_fragment:hm,envmap_pars_vertex:um,envmap_physical_pars_fragment:Sm,envmap_vertex:dm,fog_vertex:fm,fog_pars_vertex:pm,fog_fragment:mm,fog_pars_fragment:gm,gradientmap_pars_fragment:xm,lightmap_pars_fragment:vm,lights_lambert_fragment:_m,lights_lambert_pars_fragment:Mm,lights_pars_begin:ym,lights_toon_fragment:bm,lights_toon_pars_fragment:wm,lights_phong_fragment:Em,lights_phong_pars_fragment:Tm,lights_physical_fragment:Am,lights_physical_pars_fragment:Rm,lights_fragment_begin:Cm,lights_fragment_maps:Pm,lights_fragment_end:Dm,logdepthbuf_fragment:Im,logdepthbuf_pars_fragment:Lm,logdepthbuf_pars_vertex:Um,logdepthbuf_vertex:zm,map_fragment:Nm,map_pars_fragment:Fm,map_particle_fragment:km,map_particle_pars_fragment:Om,metalnessmap_fragment:Bm,metalnessmap_pars_fragment:Hm,morphinstance_vertex:Gm,morphcolor_vertex:Vm,morphnormal_vertex:Wm,morphtarget_pars_vertex:Xm,morphtarget_vertex:qm,normal_fragment_begin:Ym,normal_fragment_maps:$m,normal_pars_fragment:Zm,normal_pars_vertex:jm,normal_vertex:Km,normalmap_pars_fragment:Jm,clearcoat_normal_fragment_begin:Qm,clearcoat_normal_fragment_maps:t0,clearcoat_pars_fragment:e0,iridescence_pars_fragment:n0,opaque_fragment:i0,packing:s0,premultiplied_alpha_fragment:r0,project_vertex:o0,dithering_fragment:a0,dithering_pars_fragment:l0,roughnessmap_fragment:c0,roughnessmap_pars_fragment:h0,shadowmap_pars_fragment:u0,shadowmap_pars_vertex:d0,shadowmap_vertex:f0,shadowmask_pars_fragment:p0,skinbase_vertex:m0,skinning_pars_vertex:g0,skinning_vertex:x0,skinnormal_vertex:v0,specularmap_fragment:_0,specularmap_pars_fragment:M0,tonemapping_fragment:y0,tonemapping_pars_fragment:S0,transmission_fragment:b0,transmission_pars_fragment:w0,uv_pars_fragment:E0,uv_pars_vertex:T0,uv_vertex:A0,worldpos_vertex:R0,background_vert:C0,background_frag:P0,backgroundCube_vert:D0,backgroundCube_frag:I0,cube_vert:L0,cube_frag:U0,depth_vert:z0,depth_frag:N0,distanceRGBA_vert:F0,distanceRGBA_frag:k0,equirect_vert:O0,equirect_frag:B0,linedashed_vert:H0,linedashed_frag:G0,meshbasic_vert:V0,meshbasic_frag:W0,meshlambert_vert:X0,meshlambert_frag:q0,meshmatcap_vert:Y0,meshmatcap_frag:$0,meshnormal_vert:Z0,meshnormal_frag:j0,meshphong_vert:K0,meshphong_frag:J0,meshphysical_vert:Q0,meshphysical_frag:tg,meshtoon_vert:eg,meshtoon_frag:ng,points_vert:ig,points_frag:sg,shadow_vert:rg,shadow_frag:og,sprite_vert:ag,sprite_frag:lg},Rt={common:{diffuse:{value:new Qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new xe},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new xe}},envmap:{envMap:{value:null},envMapRotation:{value:new xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new xe},normalScale:{value:new Ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0},uvTransform:{value:new xe}},sprite:{diffuse:{value:new Qt(16777215)},opacity:{value:1},center:{value:new Ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new xe},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0}}},si={basic:{uniforms:bn([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.fog]),vertexShader:_e.meshbasic_vert,fragmentShader:_e.meshbasic_frag},lambert:{uniforms:bn([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,Rt.lights,{emissive:{value:new Qt(0)}}]),vertexShader:_e.meshlambert_vert,fragmentShader:_e.meshlambert_frag},phong:{uniforms:bn([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,Rt.lights,{emissive:{value:new Qt(0)},specular:{value:new Qt(1118481)},shininess:{value:30}}]),vertexShader:_e.meshphong_vert,fragmentShader:_e.meshphong_frag},standard:{uniforms:bn([Rt.common,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.roughnessmap,Rt.metalnessmap,Rt.fog,Rt.lights,{emissive:{value:new Qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:_e.meshphysical_vert,fragmentShader:_e.meshphysical_frag},toon:{uniforms:bn([Rt.common,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.gradientmap,Rt.fog,Rt.lights,{emissive:{value:new Qt(0)}}]),vertexShader:_e.meshtoon_vert,fragmentShader:_e.meshtoon_frag},matcap:{uniforms:bn([Rt.common,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,{matcap:{value:null}}]),vertexShader:_e.meshmatcap_vert,fragmentShader:_e.meshmatcap_frag},points:{uniforms:bn([Rt.points,Rt.fog]),vertexShader:_e.points_vert,fragmentShader:_e.points_frag},dashed:{uniforms:bn([Rt.common,Rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:_e.linedashed_vert,fragmentShader:_e.linedashed_frag},depth:{uniforms:bn([Rt.common,Rt.displacementmap]),vertexShader:_e.depth_vert,fragmentShader:_e.depth_frag},normal:{uniforms:bn([Rt.common,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,{opacity:{value:1}}]),vertexShader:_e.meshnormal_vert,fragmentShader:_e.meshnormal_frag},sprite:{uniforms:bn([Rt.sprite,Rt.fog]),vertexShader:_e.sprite_vert,fragmentShader:_e.sprite_frag},background:{uniforms:{uvTransform:{value:new xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:_e.background_vert,fragmentShader:_e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new xe}},vertexShader:_e.backgroundCube_vert,fragmentShader:_e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:_e.cube_vert,fragmentShader:_e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:_e.equirect_vert,fragmentShader:_e.equirect_frag},distanceRGBA:{uniforms:bn([Rt.common,Rt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:_e.distanceRGBA_vert,fragmentShader:_e.distanceRGBA_frag},shadow:{uniforms:bn([Rt.lights,Rt.fog,{color:{value:new Qt(0)},opacity:{value:1}}]),vertexShader:_e.shadow_vert,fragmentShader:_e.shadow_frag}};si.physical={uniforms:bn([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new xe},clearcoatNormalScale:{value:new Ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new xe},sheen:{value:0},sheenColor:{value:new Qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new xe},transmissionSamplerSize:{value:new Ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new xe},attenuationDistance:{value:0},attenuationColor:{value:new Qt(0)},specularColor:{value:new Qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new xe},anisotropyVector:{value:new Ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new xe}}]),vertexShader:_e.meshphysical_vert,fragmentShader:_e.meshphysical_frag};const vo={r:0,b:0,g:0},ss=new li,cg=new ce;function hg(i,t,e,n,s,r,o){const a=new Qt(0);let l=r===!0?0:1,c,h,u=null,p=0,f=null;function m(M){let _=M.isScene===!0?M.background:null;return _&&_.isTexture&&(_=(M.backgroundBlurriness>0?e:t).get(_)),_}function g(M){let _=!1;const C=m(M);C===null?d(a,l):C&&C.isColor&&(d(C,1),_=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(M,_){const C=m(_);C&&(C.isCubeTexture||C.mapping===Ho)?(h===void 0&&(h=new ne(new $i(1,1,1),new Bn({name:"BackgroundCubeMaterial",uniforms:Js(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ss.copy(_.backgroundRotation),ss.x*=-1,ss.y*=-1,ss.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(ss.y*=-1,ss.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(cg.makeRotationFromEuler(ss)),h.material.toneMapped=Ue.getTransfer(C.colorSpace)!==Ge,(u!==C||p!==C.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=C,p=C.version,f=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new ne(new Si(2,2),new Bn({name:"BackgroundMaterial",uniforms:Js(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:Ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=Ue.getTransfer(C.colorSpace)!==Ge,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||p!==C.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=C,p=C.version,f=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function d(M,_){M.getRGB(vo,Au(i)),n.buffers.color.setClear(vo.r,vo.g,vo.b,_,o)}function b(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,_=1){a.set(M),l=_,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,d(a,l)},render:g,addToRenderList:x,dispose:b}}function ug(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,o=!1;function a(y,U,N,X,J){let B=!1;const W=u(X,N,U);r!==W&&(r=W,c(r.object)),B=f(y,X,N,J),B&&m(y,X,N,J),J!==null&&t.update(J,i.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,_(y,U,N,X),J!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,U,N){const X=N.wireframe===!0;let J=n[y.id];J===void 0&&(J={},n[y.id]=J);let B=J[U.id];B===void 0&&(B={},J[U.id]=B);let W=B[X];return W===void 0&&(W=p(l()),B[X]=W),W}function p(y){const U=[],N=[],X=[];for(let J=0;J<e;J++)U[J]=0,N[J]=0,X[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:N,attributeDivisors:X,object:y,attributes:{},index:null}}function f(y,U,N,X){const J=r.attributes,B=U.attributes;let W=0;const Q=N.getAttributes();for(const Y in Q)if(Q[Y].location>=0){const j=J[Y];let Mt=B[Y];if(Mt===void 0&&(Y==="instanceMatrix"&&y.instanceMatrix&&(Mt=y.instanceMatrix),Y==="instanceColor"&&y.instanceColor&&(Mt=y.instanceColor)),j===void 0||j.attribute!==Mt||Mt&&j.data!==Mt.data)return!0;W++}return r.attributesNum!==W||r.index!==X}function m(y,U,N,X){const J={},B=U.attributes;let W=0;const Q=N.getAttributes();for(const Y in Q)if(Q[Y].location>=0){let j=B[Y];j===void 0&&(Y==="instanceMatrix"&&y.instanceMatrix&&(j=y.instanceMatrix),Y==="instanceColor"&&y.instanceColor&&(j=y.instanceColor));const Mt={};Mt.attribute=j,j&&j.data&&(Mt.data=j.data),J[Y]=Mt,W++}r.attributes=J,r.attributesNum=W,r.index=X}function g(){const y=r.newAttributes;for(let U=0,N=y.length;U<N;U++)y[U]=0}function x(y){d(y,0)}function d(y,U){const N=r.newAttributes,X=r.enabledAttributes,J=r.attributeDivisors;N[y]=1,X[y]===0&&(i.enableVertexAttribArray(y),X[y]=1),J[y]!==U&&(i.vertexAttribDivisor(y,U),J[y]=U)}function b(){const y=r.newAttributes,U=r.enabledAttributes;for(let N=0,X=U.length;N<X;N++)U[N]!==y[N]&&(i.disableVertexAttribArray(N),U[N]=0)}function M(y,U,N,X,J,B,W){W===!0?i.vertexAttribIPointer(y,U,N,J,B):i.vertexAttribPointer(y,U,N,X,J,B)}function _(y,U,N,X){g();const J=X.attributes,B=N.getAttributes(),W=U.defaultAttributeValues;for(const Q in B){const Y=B[Q];if(Y.location>=0){let ct=J[Q];if(ct===void 0&&(Q==="instanceMatrix"&&y.instanceMatrix&&(ct=y.instanceMatrix),Q==="instanceColor"&&y.instanceColor&&(ct=y.instanceColor)),ct!==void 0){const j=ct.normalized,Mt=ct.itemSize,$t=t.get(ct);if($t===void 0)continue;const Ee=$t.buffer,le=$t.type,ht=$t.bytesPerElement,V=le===i.INT||le===i.UNSIGNED_INT||ct.gpuType===Jl;if(ct.isInterleavedBufferAttribute){const st=ct.data,_t=st.stride,Gt=ct.offset;if(st.isInstancedInterleavedBuffer){for(let Nt=0;Nt<Y.locationSize;Nt++)d(Y.location+Nt,st.meshPerAttribute);y.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let Nt=0;Nt<Y.locationSize;Nt++)x(Y.location+Nt);i.bindBuffer(i.ARRAY_BUFFER,Ee);for(let Nt=0;Nt<Y.locationSize;Nt++)M(Y.location+Nt,Mt/Y.locationSize,le,j,_t*ht,(Gt+Mt/Y.locationSize*Nt)*ht,V)}else{if(ct.isInstancedBufferAttribute){for(let st=0;st<Y.locationSize;st++)d(Y.location+st,ct.meshPerAttribute);y.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let st=0;st<Y.locationSize;st++)x(Y.location+st);i.bindBuffer(i.ARRAY_BUFFER,Ee);for(let st=0;st<Y.locationSize;st++)M(Y.location+st,Mt/Y.locationSize,le,j,Mt*ht,Mt/Y.locationSize*st*ht,V)}}else if(W!==void 0){const j=W[Q];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(Y.location,j);break;case 3:i.vertexAttrib3fv(Y.location,j);break;case 4:i.vertexAttrib4fv(Y.location,j);break;default:i.vertexAttrib1fv(Y.location,j)}}}}b()}function C(){A();for(const y in n){const U=n[y];for(const N in U){const X=U[N];for(const J in X)h(X[J].object),delete X[J];delete U[N]}delete n[y]}}function R(y){if(n[y.id]===void 0)return;const U=n[y.id];for(const N in U){const X=U[N];for(const J in X)h(X[J].object),delete X[J];delete U[N]}delete n[y.id]}function E(y){for(const U in n){const N=n[U];if(N[y.id]===void 0)continue;const X=N[y.id];for(const J in X)h(X[J].object),delete X[J];delete N[y.id]}}function A(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:S,dispose:C,releaseStatesOfGeometry:R,releaseStatesOfProgram:E,initAttributes:g,enableAttribute:x,disableUnusedAttributes:b}}function dg(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];e.update(f,n,1)}function l(c,h,u,p){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],h[m],p[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,p,0,u);let m=0;for(let g=0;g<u;g++)m+=h[g]*p[g];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function fg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==zn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const A=E===Fr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==oi&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Kn&&!A)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,p=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),x=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=m>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:p,maxTextures:f,maxVertexTextures:m,maxTextureSize:g,maxCubemapSize:x,maxAttributes:d,maxVertexUniforms:b,maxVaryings:M,maxFragmentUniforms:_,vertexTextures:C,maxSamples:R}}function pg(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new $n,a=new xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){const f=u.length!==0||p||n!==0||s;return s=p,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,p){e=h(u,p,0)},this.setState=function(u,p,f){const m=u.clippingPlanes,g=u.clipIntersection,x=u.clipShadows,d=i.get(u);if(!s||m===null||m.length===0||r&&!x)r?h(null):c();else{const b=r?0:n,M=b*4;let _=d.clippingState||null;l.value=_,_=h(m,p,M,f);for(let C=0;C!==M;++C)_[C]=e[C];d.clippingState=_,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,p,f,m){const g=u!==null?u.length:0;let x=null;if(g!==0){if(x=l.value,m!==!0||x===null){const d=f+g*4,b=p.matrixWorldInverse;a.getNormalMatrix(b),(x===null||x.length<d)&&(x=new Float32Array(d));for(let M=0,_=f;M!==g;++M,_+=4)o.copy(u[M]).applyMatrix4(b,a),o.normal.toArray(x,_),x[_+3]=o.constant}l.value=x,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,x}}function mg(i){let t=new WeakMap;function e(o,a){return a===cl?o.mapping=$s:a===hl&&(o.mapping=Zs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===cl||a===hl)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Xf(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Gs=4,Th=[.125,.215,.35,.446,.526,.582],hs=20,Ia=new Ou,Ah=new Qt;let La=null,Ua=0,za=0,Na=!1;const as=(1+Math.sqrt(5))/2,Fs=1/as,Rh=[new L(-as,Fs,0),new L(as,Fs,0),new L(-Fs,0,as),new L(Fs,0,as),new L(0,as,-Fs),new L(0,as,Fs),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],gg=new L;class Ch{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=gg}=r;La=this._renderer.getRenderTarget(),Ua=this._renderer.getActiveCubeFace(),za=this._renderer.getActiveMipmapLevel(),Na=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ih(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(La,Ua,za),this._renderer.xr.enabled=Na,t.scissorTest=!1,_o(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===$s||t.mapping===Zs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),La=this._renderer.getRenderTarget(),Ua=this._renderer.getActiveCubeFace(),za=this._renderer.getActiveMipmapLevel(),Na=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:jn,minFilter:jn,generateMipmaps:!1,type:Fr,format:zn,colorSpace:Ks,depthBuffer:!1},s=Ph(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ph(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=xg(r)),this._blurMaterial=vg(r,t,e)}return s}_compileMaterial(t){const e=new ne(this._lodPlanes[0],t);this._renderer.compile(e,Ia)}_sceneToCubeUV(t,e,n,s,r){const l=new Rn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,p=u.autoClear,f=u.toneMapping;u.getClearColor(Ah),u.toneMapping=Xi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const g=new Ln({name:"PMREM.Background",side:En,depthWrite:!1,depthTest:!1}),x=new ne(new $i,g);let d=!1;const b=t.background;b?b.isColor&&(g.color.copy(b),t.background=null,d=!0):(g.color.copy(Ah),d=!0);for(let M=0;M<6;M++){const _=M%3;_===0?(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[M],r.y,r.z)):_===1?(l.up.set(0,0,c[M]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[M],r.z)):(l.up.set(0,c[M],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[M]));const C=this._cubeSize;_o(s,_*C,M>2?C:0,C,C),u.setRenderTarget(s),d&&u.render(x,l),u.render(t,l)}x.geometry.dispose(),x.material.dispose(),u.toneMapping=f,u.autoClear=p,t.background=b}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===$s||t.mapping===Zs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ih()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ne(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;_o(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Ia)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Rh[(s-r-1)%Rh.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ne(this._lodPlanes[s],c),p=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*hs-1),g=r/m,x=isFinite(r)?1+Math.floor(h*g):hs;x>hs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${hs}`);const d=[];let b=0;for(let E=0;E<hs;++E){const A=E/g,S=Math.exp(-A*A/2);d.push(S),E===0?b+=S:E<x&&(b+=2*S)}for(let E=0;E<d.length;E++)d[E]=d[E]/b;p.envMap.value=t.texture,p.samples.value=x,p.weights.value=d,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:M}=this;p.dTheta.value=m,p.mipInt.value=M-n;const _=this._sizeLods[s],C=3*_*(s>M-Gs?s-M+Gs:0),R=4*(this._cubeSize-_);_o(e,C,R,3*_,2*_),l.setRenderTarget(e),l.render(u,Ia)}}function xg(i){const t=[],e=[],n=[];let s=i;const r=i-Gs+1+Th.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-Gs?l=Th[o-i+Gs-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,p=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,g=3,x=2,d=1,b=new Float32Array(g*m*f),M=new Float32Array(x*m*f),_=new Float32Array(d*m*f);for(let R=0;R<f;R++){const E=R%3*2/3-1,A=R>2?0:-1,S=[E,A,0,E+2/3,A,0,E+2/3,A+1,0,E,A,0,E+2/3,A+1,0,E,A+1,0];b.set(S,g*m*R),M.set(p,x*m*R);const y=[R,R,R,R,R,R];_.set(y,d*m*R)}const C=new Te;C.setAttribute("position",new an(b,g)),C.setAttribute("uv",new an(M,x)),C.setAttribute("faceIndex",new an(_,d)),t.push(C),s>Gs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ph(i,t,e){const n=new Yi(i,t,e);return n.texture.mapping=Ho,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function _o(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function vg(i,t,e){const n=new Float32Array(hs),s=new L(0,1,0);return new Bn({name:"SphericalGaussianBlur",defines:{n:hs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function Dh(){return new Bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function Ih(){return new Bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function vc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function _g(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===cl||l===hl,h=l===$s||l===Zs;if(c||h){let u=t.get(a);const p=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return e===null&&(e=new Ch(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Ch(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Mg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ur("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function yg(i,t,e,n){const s={},r=new WeakMap;function o(u){const p=u.target;p.index!==null&&t.remove(p.index);for(const m in p.attributes)t.remove(p.attributes[m]);p.removeEventListener("dispose",o),delete s[p.id];const f=r.get(p);f&&(t.remove(f),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function a(u,p){return s[p.id]===!0||(p.addEventListener("dispose",o),s[p.id]=!0,e.memory.geometries++),p}function l(u){const p=u.attributes;for(const f in p)t.update(p[f],i.ARRAY_BUFFER)}function c(u){const p=[],f=u.index,m=u.attributes.position;let g=0;if(f!==null){const b=f.array;g=f.version;for(let M=0,_=b.length;M<_;M+=3){const C=b[M+0],R=b[M+1],E=b[M+2];p.push(C,R,R,E,E,C)}}else if(m!==void 0){const b=m.array;g=m.version;for(let M=0,_=b.length/3-1;M<_;M+=3){const C=M+0,R=M+1,E=M+2;p.push(C,R,R,E,E,C)}}else return;const x=new(bu(p)?Tu:cc)(p,1);x.version=g;const d=r.get(u);d&&t.remove(d),r.set(u,x)}function h(u){const p=r.get(u);if(p){const f=u.index;f!==null&&p.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Sg(i,t,e){let n;function s(p){n=p}let r,o;function a(p){r=p.type,o=p.bytesPerElement}function l(p,f){i.drawElements(n,f,r,p*o),e.update(f,n,1)}function c(p,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,p*o,m),e.update(f,n,m))}function h(p,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,p,0,m);let x=0;for(let d=0;d<m;d++)x+=f[d];e.update(x,n,1)}function u(p,f,m,g){if(m===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let d=0;d<p.length;d++)c(p[d]/o,f[d],g[d]);else{x.multiDrawElementsInstancedWEBGL(n,f,0,r,p,0,g,0,m);let d=0;for(let b=0;b<m;b++)d+=f[b]*g[b];e.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function bg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function wg(i,t,e){const n=new WeakMap,s=new Ie;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let p=n.get(a);if(p===void 0||p.count!==u){let y=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var f=y;p!==void 0&&p.texture.dispose();const m=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let _=0;m===!0&&(_=1),g===!0&&(_=2),x===!0&&(_=3);let C=a.attributes.position.count*_,R=1;C>t.maxTextureSize&&(R=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const E=new Float32Array(C*R*4*u),A=new wu(E,C,R,u);A.type=Kn,A.needsUpdate=!0;const S=_*4;for(let U=0;U<u;U++){const N=d[U],X=b[U],J=M[U],B=C*R*4*U;for(let W=0;W<N.count;W++){const Q=W*S;m===!0&&(s.fromBufferAttribute(N,W),E[B+Q+0]=s.x,E[B+Q+1]=s.y,E[B+Q+2]=s.z,E[B+Q+3]=0),g===!0&&(s.fromBufferAttribute(X,W),E[B+Q+4]=s.x,E[B+Q+5]=s.y,E[B+Q+6]=s.z,E[B+Q+7]=0),x===!0&&(s.fromBufferAttribute(J,W),E[B+Q+8]=s.x,E[B+Q+9]=s.y,E[B+Q+10]=s.z,E[B+Q+11]=J.itemSize===4?s.w:1)}}p={count:u,texture:A,size:new Ht(C,R)},n.set(a,p),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let m=0;for(let x=0;x<c.length;x++)m+=c[x];const g=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function Eg(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const Hu=new Mn,Lh=new Iu(1,1),Gu=new wu,Vu=new Cf,Wu=new Cu,Uh=[],zh=[],Nh=new Float32Array(16),Fh=new Float32Array(9),kh=new Float32Array(4);function nr(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Uh[s];if(r===void 0&&(r=new Float32Array(s),Uh[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function ln(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function cn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Yo(i,t){let e=zh[t];e===void 0&&(e=new Int32Array(t),zh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Tg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Ag(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ln(e,t))return;i.uniform2fv(this.addr,t),cn(e,t)}}function Rg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ln(e,t))return;i.uniform3fv(this.addr,t),cn(e,t)}}function Cg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ln(e,t))return;i.uniform4fv(this.addr,t),cn(e,t)}}function Pg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ln(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),cn(e,t)}else{if(ln(e,n))return;kh.set(n),i.uniformMatrix2fv(this.addr,!1,kh),cn(e,n)}}function Dg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ln(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),cn(e,t)}else{if(ln(e,n))return;Fh.set(n),i.uniformMatrix3fv(this.addr,!1,Fh),cn(e,n)}}function Ig(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ln(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),cn(e,t)}else{if(ln(e,n))return;Nh.set(n),i.uniformMatrix4fv(this.addr,!1,Nh),cn(e,n)}}function Lg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Ug(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ln(e,t))return;i.uniform2iv(this.addr,t),cn(e,t)}}function zg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ln(e,t))return;i.uniform3iv(this.addr,t),cn(e,t)}}function Ng(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ln(e,t))return;i.uniform4iv(this.addr,t),cn(e,t)}}function Fg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function kg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ln(e,t))return;i.uniform2uiv(this.addr,t),cn(e,t)}}function Og(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ln(e,t))return;i.uniform3uiv(this.addr,t),cn(e,t)}}function Bg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ln(e,t))return;i.uniform4uiv(this.addr,t),cn(e,t)}}function Hg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Lh.compareFunction=Su,r=Lh):r=Hu,e.setTexture2D(t||r,s)}function Gg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Vu,s)}function Vg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Wu,s)}function Wg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Gu,s)}function Xg(i){switch(i){case 5126:return Tg;case 35664:return Ag;case 35665:return Rg;case 35666:return Cg;case 35674:return Pg;case 35675:return Dg;case 35676:return Ig;case 5124:case 35670:return Lg;case 35667:case 35671:return Ug;case 35668:case 35672:return zg;case 35669:case 35673:return Ng;case 5125:return Fg;case 36294:return kg;case 36295:return Og;case 36296:return Bg;case 35678:case 36198:case 36298:case 36306:case 35682:return Hg;case 35679:case 36299:case 36307:return Gg;case 35680:case 36300:case 36308:case 36293:return Vg;case 36289:case 36303:case 36311:case 36292:return Wg}}function qg(i,t){i.uniform1fv(this.addr,t)}function Yg(i,t){const e=nr(t,this.size,2);i.uniform2fv(this.addr,e)}function $g(i,t){const e=nr(t,this.size,3);i.uniform3fv(this.addr,e)}function Zg(i,t){const e=nr(t,this.size,4);i.uniform4fv(this.addr,e)}function jg(i,t){const e=nr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Kg(i,t){const e=nr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Jg(i,t){const e=nr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Qg(i,t){i.uniform1iv(this.addr,t)}function tx(i,t){i.uniform2iv(this.addr,t)}function ex(i,t){i.uniform3iv(this.addr,t)}function nx(i,t){i.uniform4iv(this.addr,t)}function ix(i,t){i.uniform1uiv(this.addr,t)}function sx(i,t){i.uniform2uiv(this.addr,t)}function rx(i,t){i.uniform3uiv(this.addr,t)}function ox(i,t){i.uniform4uiv(this.addr,t)}function ax(i,t,e){const n=this.cache,s=t.length,r=Yo(e,s);ln(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Hu,r[o])}function lx(i,t,e){const n=this.cache,s=t.length,r=Yo(e,s);ln(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Vu,r[o])}function cx(i,t,e){const n=this.cache,s=t.length,r=Yo(e,s);ln(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Wu,r[o])}function hx(i,t,e){const n=this.cache,s=t.length,r=Yo(e,s);ln(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Gu,r[o])}function ux(i){switch(i){case 5126:return qg;case 35664:return Yg;case 35665:return $g;case 35666:return Zg;case 35674:return jg;case 35675:return Kg;case 35676:return Jg;case 5124:case 35670:return Qg;case 35667:case 35671:return tx;case 35668:case 35672:return ex;case 35669:case 35673:return nx;case 5125:return ix;case 36294:return sx;case 36295:return rx;case 36296:return ox;case 35678:case 36198:case 36298:case 36306:case 35682:return ax;case 35679:case 36299:case 36307:return lx;case 35680:case 36300:case 36308:case 36293:return cx;case 36289:case 36303:case 36311:case 36292:return hx}}class dx{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Xg(e.type)}}class fx{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ux(e.type)}}class px{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Fa=/(\w+)(\])?(\[|\.)?/g;function Oh(i,t){i.seq.push(t),i.map[t.id]=t}function mx(i,t,e){const n=i.name,s=n.length;for(Fa.lastIndex=0;;){const r=Fa.exec(n),o=Fa.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Oh(e,c===void 0?new dx(a,i,t):new fx(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new px(a),Oh(e,u)),e=u}}}class Io{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);mx(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Bh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const gx=37297;let xx=0;function vx(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Hh=new xe;function _x(i){Ue._getMatrix(Hh,Ue.workingColorSpace,i);const t=`mat3( ${Hh.elements.map(e=>e.toFixed(4))} )`;switch(Ue.getTransfer(i)){case Lo:return[t,"LinearTransferOETF"];case Ge:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Gh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+vx(i.getShaderSource(t),a)}else return r}function Mx(i,t){const e=_x(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function yx(i,t){let e;switch(t){case Hd:e="Linear";break;case Gd:e="Reinhard";break;case Vd:e="Cineon";break;case fu:e="ACESFilmic";break;case Xd:e="AgX";break;case qd:e="Neutral";break;case Wd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Mo=new L;function Sx(){Ue.getLuminanceCoefficients(Mo);const i=Mo.x.toFixed(4),t=Mo.y.toFixed(4),e=Mo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function bx(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(br).join(`
`)}function wx(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Ex(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function br(i){return i!==""}function Vh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Wh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Tx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vl(i){return i.replace(Tx,Rx)}const Ax=new Map;function Rx(i,t){let e=_e[t];if(e===void 0){const n=Ax.get(t);if(n!==void 0)e=_e[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Vl(e)}const Cx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xh(i){return i.replace(Cx,Px)}function Px(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function qh(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Dx(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===uu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Md?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===vi&&(t="SHADOWMAP_TYPE_VSM"),t}function Ix(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case $s:case Zs:t="ENVMAP_TYPE_CUBE";break;case Ho:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Lx(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Zs:t="ENVMAP_MODE_REFRACTION";break}return t}function Ux(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case du:t="ENVMAP_BLENDING_MULTIPLY";break;case Od:t="ENVMAP_BLENDING_MIX";break;case Bd:t="ENVMAP_BLENDING_ADD";break}return t}function zx(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Nx(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Dx(e),c=Ix(e),h=Lx(e),u=Ux(e),p=zx(e),f=bx(e),m=wx(r),g=s.createProgram();let x,d,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(br).join(`
`),x.length>0&&(x+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(br).join(`
`),d.length>0&&(d+=`
`)):(x=[qh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(br).join(`
`),d=[qh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Xi?"#define TONE_MAPPING":"",e.toneMapping!==Xi?_e.tonemapping_pars_fragment:"",e.toneMapping!==Xi?yx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",_e.colorspace_pars_fragment,Mx("linearToOutputTexel",e.outputColorSpace),Sx(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(br).join(`
`)),o=Vl(o),o=Vh(o,e),o=Wh(o,e),a=Vl(a),a=Vh(a,e),a=Wh(a,e),o=Xh(o),a=Xh(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,x=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,d=["#define varying in",e.glslVersion===Bc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Bc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=b+x+o,_=b+d+a,C=Bh(s,s.VERTEX_SHADER,M),R=Bh(s,s.FRAGMENT_SHADER,_);s.attachShader(g,C),s.attachShader(g,R),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function E(U){if(i.debug.checkShaderErrors){const N=s.getProgramInfoLog(g)||"",X=s.getShaderInfoLog(C)||"",J=s.getShaderInfoLog(R)||"",B=N.trim(),W=X.trim(),Q=J.trim();let Y=!0,ct=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,C,R);else{const j=Gh(s,C,"vertex"),Mt=Gh(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+B+`
`+j+`
`+Mt)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(W===""||Q==="")&&(ct=!1);ct&&(U.diagnostics={runnable:Y,programLog:B,vertexShader:{log:W,prefix:x},fragmentShader:{log:Q,prefix:d}})}s.deleteShader(C),s.deleteShader(R),A=new Io(s,g),S=Ex(s,g)}let A;this.getUniforms=function(){return A===void 0&&E(this),A};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(g,gx)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=xx++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=C,this.fragmentShader=R,this}let Fx=0;class kx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Ox(t),e.set(t,n)),n}}class Ox{constructor(t){this.id=Fx++,this.code=t,this.usedTimes=0}}function Bx(i,t,e,n,s,r,o){const a=new lc,l=new kx,c=new Set,h=[],u=s.logarithmicDepthBuffer,p=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return c.add(S),S===0?"uv":`uv${S}`}function x(S,y,U,N,X){const J=N.fog,B=X.geometry,W=S.isMeshStandardMaterial?N.environment:null,Q=(S.isMeshStandardMaterial?e:t).get(S.envMap||W),Y=Q&&Q.mapping===Ho?Q.image.height:null,ct=m[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const j=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Mt=j!==void 0?j.length:0;let $t=0;B.morphAttributes.position!==void 0&&($t=1),B.morphAttributes.normal!==void 0&&($t=2),B.morphAttributes.color!==void 0&&($t=3);let Ee,le,ht,V;if(ct){const ve=si[ct];Ee=ve.vertexShader,le=ve.fragmentShader}else Ee=S.vertexShader,le=S.fragmentShader,l.update(S),ht=l.getVertexShaderID(S),V=l.getFragmentShaderID(S);const st=i.getRenderTarget(),_t=i.state.buffers.depth.getReversed(),Gt=X.isInstancedMesh===!0,Nt=X.isBatchedMesh===!0,de=!!S.map,be=!!S.matcap,D=!!Q,te=!!S.aoMap,Yt=!!S.lightMap,Wt=!!S.bumpMap,Lt=!!S.normalMap,ie=!!S.displacementMap,pt=!!S.emissiveMap,yt=!!S.metalnessMap,ae=!!S.roughnessMap,Pe=S.anisotropy>0,P=S.clearcoat>0,w=S.dispersion>0,K=S.iridescence>0,ot=S.sheen>0,at=S.transmission>0,rt=Pe&&!!S.anisotropyMap,Ut=P&&!!S.clearcoatMap,lt=P&&!!S.clearcoatNormalMap,bt=P&&!!S.clearcoatRoughnessMap,Ct=K&&!!S.iridescenceMap,mt=K&&!!S.iridescenceThicknessMap,At=ot&&!!S.sheenColorMap,Zt=ot&&!!S.sheenRoughnessMap,kt=!!S.specularMap,wt=!!S.specularColorMap,he=!!S.specularIntensityMap,G=at&&!!S.transmissionMap,vt=at&&!!S.thicknessMap,Et=!!S.gradientMap,Ft=!!S.alphaMap,gt=S.alphaTest>0,ut=!!S.alphaHash,Ot=!!S.extensions;let ue=Xi;S.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(ue=i.toneMapping);const Oe={shaderID:ct,shaderType:S.type,shaderName:S.name,vertexShader:Ee,fragmentShader:le,defines:S.defines,customVertexShaderID:ht,customFragmentShaderID:V,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Nt,batchingColor:Nt&&X._colorsTexture!==null,instancing:Gt,instancingColor:Gt&&X.instanceColor!==null,instancingMorph:Gt&&X.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:st===null?i.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:Ks,alphaToCoverage:!!S.alphaToCoverage,map:de,matcap:be,envMap:D,envMapMode:D&&Q.mapping,envMapCubeUVHeight:Y,aoMap:te,lightMap:Yt,bumpMap:Wt,normalMap:Lt,displacementMap:p&&ie,emissiveMap:pt,normalMapObjectSpace:Lt&&S.normalMapType===Kd,normalMapTangentSpace:Lt&&S.normalMapType===rc,metalnessMap:yt,roughnessMap:ae,anisotropy:Pe,anisotropyMap:rt,clearcoat:P,clearcoatMap:Ut,clearcoatNormalMap:lt,clearcoatRoughnessMap:bt,dispersion:w,iridescence:K,iridescenceMap:Ct,iridescenceThicknessMap:mt,sheen:ot,sheenColorMap:At,sheenRoughnessMap:Zt,specularMap:kt,specularColorMap:wt,specularIntensityMap:he,transmission:at,transmissionMap:G,thicknessMap:vt,gradientMap:Et,opaque:S.transparent===!1&&S.blending===Xs&&S.alphaToCoverage===!1,alphaMap:Ft,alphaTest:gt,alphaHash:ut,combine:S.combine,mapUv:de&&g(S.map.channel),aoMapUv:te&&g(S.aoMap.channel),lightMapUv:Yt&&g(S.lightMap.channel),bumpMapUv:Wt&&g(S.bumpMap.channel),normalMapUv:Lt&&g(S.normalMap.channel),displacementMapUv:ie&&g(S.displacementMap.channel),emissiveMapUv:pt&&g(S.emissiveMap.channel),metalnessMapUv:yt&&g(S.metalnessMap.channel),roughnessMapUv:ae&&g(S.roughnessMap.channel),anisotropyMapUv:rt&&g(S.anisotropyMap.channel),clearcoatMapUv:Ut&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:lt&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:bt&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Ct&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:At&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:Zt&&g(S.sheenRoughnessMap.channel),specularMapUv:kt&&g(S.specularMap.channel),specularColorMapUv:wt&&g(S.specularColorMap.channel),specularIntensityMapUv:he&&g(S.specularIntensityMap.channel),transmissionMapUv:G&&g(S.transmissionMap.channel),thicknessMapUv:vt&&g(S.thicknessMap.channel),alphaMapUv:Ft&&g(S.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Lt||Pe),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!B.attributes.uv&&(de||Ft),fog:!!J,useFog:S.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:_t,skinning:X.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Mt,morphTextureStride:$t,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:ue,decodeVideoTexture:de&&S.map.isVideoTexture===!0&&Ue.getTransfer(S.map.colorSpace)===Ge,decodeVideoTextureEmissive:pt&&S.emissiveMap.isVideoTexture===!0&&Ue.getTransfer(S.emissiveMap.colorSpace)===Ge,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Fe,flipSided:S.side===En,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ot&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ot&&S.extensions.multiDraw===!0||Nt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Oe.vertexUv1s=c.has(1),Oe.vertexUv2s=c.has(2),Oe.vertexUv3s=c.has(3),c.clear(),Oe}function d(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const U in S.defines)y.push(U),y.push(S.defines[U]);return S.isRawShaderMaterial===!1&&(b(y,S),M(y,S),y.push(i.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function b(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function M(S,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),S.push(a.mask)}function _(S){const y=m[S.type];let U;if(y){const N=si[y];U=No.clone(N.uniforms)}else U=S.uniforms;return U}function C(S,y){let U;for(let N=0,X=h.length;N<X;N++){const J=h[N];if(J.cacheKey===y){U=J,++U.usedTimes;break}}return U===void 0&&(U=new Nx(i,y,S,r),h.push(U)),U}function R(S){if(--S.usedTimes===0){const y=h.indexOf(S);h[y]=h[h.length-1],h.pop(),S.destroy()}}function E(S){l.remove(S)}function A(){l.dispose()}return{getParameters:x,getProgramCacheKey:d,getUniforms:_,acquireProgram:C,releaseProgram:R,releaseShaderCache:E,programs:h,dispose:A}}function Hx(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Gx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Yh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function $h(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,p,f,m,g,x){let d=i[t];return d===void 0?(d={id:u.id,object:u,geometry:p,material:f,groupOrder:m,renderOrder:u.renderOrder,z:g,group:x},i[t]=d):(d.id=u.id,d.object=u,d.geometry=p,d.material=f,d.groupOrder=m,d.renderOrder=u.renderOrder,d.z=g,d.group=x),t++,d}function a(u,p,f,m,g,x){const d=o(u,p,f,m,g,x);f.transmission>0?n.push(d):f.transparent===!0?s.push(d):e.push(d)}function l(u,p,f,m,g,x){const d=o(u,p,f,m,g,x);f.transmission>0?n.unshift(d):f.transparent===!0?s.unshift(d):e.unshift(d)}function c(u,p){e.length>1&&e.sort(u||Gx),n.length>1&&n.sort(p||Yh),s.length>1&&s.sort(p||Yh)}function h(){for(let u=t,p=i.length;u<p;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function Vx(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new $h,i.set(n,[o])):s>=r.length?(o=new $h,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Wx(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Qt};break;case"SpotLight":e={position:new L,direction:new L,color:new Qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Qt,groundColor:new Qt};break;case"RectAreaLight":e={color:new Qt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function Xx(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let qx=0;function Yx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function $x(i){const t=new Wx,e=Xx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const s=new L,r=new ce,o=new ce;function a(c){let h=0,u=0,p=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,g=0,x=0,d=0,b=0,M=0,_=0,C=0,R=0,E=0;c.sort(Yx);for(let S=0,y=c.length;S<y;S++){const U=c[S],N=U.color,X=U.intensity,J=U.distance,B=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)h+=N.r*X,u+=N.g*X,p+=N.b*X;else if(U.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(U.sh.coefficients[W],X);E++}else if(U.isDirectionalLight){const W=t.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const Q=U.shadow,Y=e.get(U);Y.shadowIntensity=Q.intensity,Y.shadowBias=Q.bias,Y.shadowNormalBias=Q.normalBias,Y.shadowRadius=Q.radius,Y.shadowMapSize=Q.mapSize,n.directionalShadow[f]=Y,n.directionalShadowMap[f]=B,n.directionalShadowMatrix[f]=U.shadow.matrix,b++}n.directional[f]=W,f++}else if(U.isSpotLight){const W=t.get(U);W.position.setFromMatrixPosition(U.matrixWorld),W.color.copy(N).multiplyScalar(X),W.distance=J,W.coneCos=Math.cos(U.angle),W.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),W.decay=U.decay,n.spot[g]=W;const Q=U.shadow;if(U.map&&(n.spotLightMap[C]=U.map,C++,Q.updateMatrices(U),U.castShadow&&R++),n.spotLightMatrix[g]=Q.matrix,U.castShadow){const Y=e.get(U);Y.shadowIntensity=Q.intensity,Y.shadowBias=Q.bias,Y.shadowNormalBias=Q.normalBias,Y.shadowRadius=Q.radius,Y.shadowMapSize=Q.mapSize,n.spotShadow[g]=Y,n.spotShadowMap[g]=B,_++}g++}else if(U.isRectAreaLight){const W=t.get(U);W.color.copy(N).multiplyScalar(X),W.halfWidth.set(U.width*.5,0,0),W.halfHeight.set(0,U.height*.5,0),n.rectArea[x]=W,x++}else if(U.isPointLight){const W=t.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity),W.distance=U.distance,W.decay=U.decay,U.castShadow){const Q=U.shadow,Y=e.get(U);Y.shadowIntensity=Q.intensity,Y.shadowBias=Q.bias,Y.shadowNormalBias=Q.normalBias,Y.shadowRadius=Q.radius,Y.shadowMapSize=Q.mapSize,Y.shadowCameraNear=Q.camera.near,Y.shadowCameraFar=Q.camera.far,n.pointShadow[m]=Y,n.pointShadowMap[m]=B,n.pointShadowMatrix[m]=U.shadow.matrix,M++}n.point[m]=W,m++}else if(U.isHemisphereLight){const W=t.get(U);W.skyColor.copy(U.color).multiplyScalar(X),W.groundColor.copy(U.groundColor).multiplyScalar(X),n.hemi[d]=W,d++}}x>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Rt.LTC_FLOAT_1,n.rectAreaLTC2=Rt.LTC_FLOAT_2):(n.rectAreaLTC1=Rt.LTC_HALF_1,n.rectAreaLTC2=Rt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=p;const A=n.hash;(A.directionalLength!==f||A.pointLength!==m||A.spotLength!==g||A.rectAreaLength!==x||A.hemiLength!==d||A.numDirectionalShadows!==b||A.numPointShadows!==M||A.numSpotShadows!==_||A.numSpotMaps!==C||A.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=x,n.point.length=m,n.hemi.length=d,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=_+C-R,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=E,A.directionalLength=f,A.pointLength=m,A.spotLength=g,A.rectAreaLength=x,A.hemiLength=d,A.numDirectionalShadows=b,A.numPointShadows=M,A.numSpotShadows=_,A.numSpotMaps=C,A.numLightProbes=E,n.version=qx++)}function l(c,h){let u=0,p=0,f=0,m=0,g=0;const x=h.matrixWorldInverse;for(let d=0,b=c.length;d<b;d++){const M=c[d];if(M.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(x),u++}else if(M.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(x),_.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(x),f++}else if(M.isRectAreaLight){const _=n.rectArea[m];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(x),o.identity(),r.copy(M.matrixWorld),r.premultiply(x),o.extractRotation(r),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),m++}else if(M.isPointLight){const _=n.point[p];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(x),p++}else if(M.isHemisphereLight){const _=n.hemi[g];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(x),g++}}}return{setup:a,setupView:l,state:n}}function Zh(i){const t=new $x(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Zx(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Zh(i),t.set(s,[a])):r>=o.length?(a=new Zh(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const jx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Kx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Jx(i,t,e){let n=new dc;const s=new Ht,r=new Ht,o=new Ie,a=new _p({depthPacking:jd}),l=new Mp,c={},h=e.maxTextureSize,u={[Ei]:En,[En]:Ei,[Fe]:Fe},p=new Bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ht},radius:{value:4}},vertexShader:jx,fragmentShader:Kx}),f=p.clone();f.defines.HORIZONTAL_PASS=1;const m=new Te;m.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new ne(m,p),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=uu;let d=this.type;this.render=function(R,E,A){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||R.length===0)return;const S=i.getRenderTarget(),y=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),N=i.state;N.setBlending(Wi),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const X=d!==vi&&this.type===vi,J=d===vi&&this.type!==vi;for(let B=0,W=R.length;B<W;B++){const Q=R[B],Y=Q.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const ct=Y.getFrameExtents();if(s.multiply(ct),r.copy(Y.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ct.x),s.x=r.x*ct.x,Y.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ct.y),s.y=r.y*ct.y,Y.mapSize.y=r.y)),Y.map===null||X===!0||J===!0){const Mt=this.type!==vi?{minFilter:Nn,magFilter:Nn}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Yi(s.x,s.y,Mt),Y.map.texture.name=Q.name+".shadowMap",Y.camera.updateProjectionMatrix()}i.setRenderTarget(Y.map),i.clear();const j=Y.getViewportCount();for(let Mt=0;Mt<j;Mt++){const $t=Y.getViewport(Mt);o.set(r.x*$t.x,r.y*$t.y,r.x*$t.z,r.y*$t.w),N.viewport(o),Y.updateMatrices(Q,Mt),n=Y.getFrustum(),_(E,A,Y.camera,Q,this.type)}Y.isPointLightShadow!==!0&&this.type===vi&&b(Y,A),Y.needsUpdate=!1}d=this.type,x.needsUpdate=!1,i.setRenderTarget(S,y,U)};function b(R,E){const A=t.update(g);p.defines.VSM_SAMPLES!==R.blurSamples&&(p.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,p.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Yi(s.x,s.y)),p.uniforms.shadow_pass.value=R.map.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(E,null,A,p,g,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(E,null,A,f,g,null)}function M(R,E,A,S){let y=null;const U=A.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(U!==void 0)y=U;else if(y=A.isPointLight===!0?l:a,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const N=y.uuid,X=E.uuid;let J=c[N];J===void 0&&(J={},c[N]=J);let B=J[X];B===void 0&&(B=y.clone(),J[X]=B,E.addEventListener("dispose",C)),y=B}if(y.visible=E.visible,y.wireframe=E.wireframe,S===vi?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:u[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,A.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const N=i.properties.get(y);N.light=A}return y}function _(R,E,A,S,y){if(R.visible===!1)return;if(R.layers.test(E.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&y===vi)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,R.matrixWorld);const X=t.update(R),J=R.material;if(Array.isArray(J)){const B=X.groups;for(let W=0,Q=B.length;W<Q;W++){const Y=B[W],ct=J[Y.materialIndex];if(ct&&ct.visible){const j=M(R,ct,S,y);R.onBeforeShadow(i,R,E,A,X,j,Y),i.renderBufferDirect(A,null,X,j,R,Y),R.onAfterShadow(i,R,E,A,X,j,Y)}}}else if(J.visible){const B=M(R,J,S,y);R.onBeforeShadow(i,R,E,A,X,B,null),i.renderBufferDirect(A,null,X,B,R,null),R.onAfterShadow(i,R,E,A,X,B,null)}}const N=R.children;for(let X=0,J=N.length;X<J;X++)_(N[X],E,A,S,y)}function C(R){R.target.removeEventListener("dispose",C);for(const A in c){const S=c[A],y=R.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const Qx={[nl]:il,[sl]:al,[rl]:ll,[Ys]:ol,[il]:nl,[al]:sl,[ll]:rl,[ol]:Ys};function tv(i,t){function e(){let G=!1;const vt=new Ie;let Et=null;const Ft=new Ie(0,0,0,0);return{setMask:function(gt){Et!==gt&&!G&&(i.colorMask(gt,gt,gt,gt),Et=gt)},setLocked:function(gt){G=gt},setClear:function(gt,ut,Ot,ue,Oe){Oe===!0&&(gt*=ue,ut*=ue,Ot*=ue),vt.set(gt,ut,Ot,ue),Ft.equals(vt)===!1&&(i.clearColor(gt,ut,Ot,ue),Ft.copy(vt))},reset:function(){G=!1,Et=null,Ft.set(-1,0,0,0)}}}function n(){let G=!1,vt=!1,Et=null,Ft=null,gt=null;return{setReversed:function(ut){if(vt!==ut){const Ot=t.get("EXT_clip_control");ut?Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.ZERO_TO_ONE_EXT):Ot.clipControlEXT(Ot.LOWER_LEFT_EXT,Ot.NEGATIVE_ONE_TO_ONE_EXT),vt=ut;const ue=gt;gt=null,this.setClear(ue)}},getReversed:function(){return vt},setTest:function(ut){ut?st(i.DEPTH_TEST):_t(i.DEPTH_TEST)},setMask:function(ut){Et!==ut&&!G&&(i.depthMask(ut),Et=ut)},setFunc:function(ut){if(vt&&(ut=Qx[ut]),Ft!==ut){switch(ut){case nl:i.depthFunc(i.NEVER);break;case il:i.depthFunc(i.ALWAYS);break;case sl:i.depthFunc(i.LESS);break;case Ys:i.depthFunc(i.LEQUAL);break;case rl:i.depthFunc(i.EQUAL);break;case ol:i.depthFunc(i.GEQUAL);break;case al:i.depthFunc(i.GREATER);break;case ll:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ft=ut}},setLocked:function(ut){G=ut},setClear:function(ut){gt!==ut&&(vt&&(ut=1-ut),i.clearDepth(ut),gt=ut)},reset:function(){G=!1,Et=null,Ft=null,gt=null,vt=!1}}}function s(){let G=!1,vt=null,Et=null,Ft=null,gt=null,ut=null,Ot=null,ue=null,Oe=null;return{setTest:function(ve){G||(ve?st(i.STENCIL_TEST):_t(i.STENCIL_TEST))},setMask:function(ve){vt!==ve&&!G&&(i.stencilMask(ve),vt=ve)},setFunc:function(ve,yn,Pn){(Et!==ve||Ft!==yn||gt!==Pn)&&(i.stencilFunc(ve,yn,Pn),Et=ve,Ft=yn,gt=Pn)},setOp:function(ve,yn,Pn){(ut!==ve||Ot!==yn||ue!==Pn)&&(i.stencilOp(ve,yn,Pn),ut=ve,Ot=yn,ue=Pn)},setLocked:function(ve){G=ve},setClear:function(ve){Oe!==ve&&(i.clearStencil(ve),Oe=ve)},reset:function(){G=!1,vt=null,Et=null,Ft=null,gt=null,ut=null,Ot=null,ue=null,Oe=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},p=new WeakMap,f=[],m=null,g=!1,x=null,d=null,b=null,M=null,_=null,C=null,R=null,E=new Qt(0,0,0),A=0,S=!1,y=null,U=null,N=null,X=null,J=null;const B=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,Q=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(Y)[1]),W=Q>=1):Y.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),W=Q>=2);let ct=null,j={};const Mt=i.getParameter(i.SCISSOR_BOX),$t=i.getParameter(i.VIEWPORT),Ee=new Ie().fromArray(Mt),le=new Ie().fromArray($t);function ht(G,vt,Et,Ft){const gt=new Uint8Array(4),ut=i.createTexture();i.bindTexture(G,ut),i.texParameteri(G,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(G,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ot=0;Ot<Et;Ot++)G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?i.texImage3D(vt,0,i.RGBA,1,1,Ft,0,i.RGBA,i.UNSIGNED_BYTE,gt):i.texImage2D(vt+Ot,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,gt);return ut}const V={};V[i.TEXTURE_2D]=ht(i.TEXTURE_2D,i.TEXTURE_2D,1),V[i.TEXTURE_CUBE_MAP]=ht(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),V[i.TEXTURE_2D_ARRAY]=ht(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),V[i.TEXTURE_3D]=ht(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),st(i.DEPTH_TEST),o.setFunc(Ys),Wt(!1),Lt(Lc),st(i.CULL_FACE),te(Wi);function st(G){h[G]!==!0&&(i.enable(G),h[G]=!0)}function _t(G){h[G]!==!1&&(i.disable(G),h[G]=!1)}function Gt(G,vt){return u[G]!==vt?(i.bindFramebuffer(G,vt),u[G]=vt,G===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=vt),G===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=vt),!0):!1}function Nt(G,vt){let Et=f,Ft=!1;if(G){Et=p.get(vt),Et===void 0&&(Et=[],p.set(vt,Et));const gt=G.textures;if(Et.length!==gt.length||Et[0]!==i.COLOR_ATTACHMENT0){for(let ut=0,Ot=gt.length;ut<Ot;ut++)Et[ut]=i.COLOR_ATTACHMENT0+ut;Et.length=gt.length,Ft=!0}}else Et[0]!==i.BACK&&(Et[0]=i.BACK,Ft=!0);Ft&&i.drawBuffers(Et)}function de(G){return m!==G?(i.useProgram(G),m=G,!0):!1}const be={[cs]:i.FUNC_ADD,[Sd]:i.FUNC_SUBTRACT,[bd]:i.FUNC_REVERSE_SUBTRACT};be[wd]=i.MIN,be[Ed]=i.MAX;const D={[Td]:i.ZERO,[Ad]:i.ONE,[Rd]:i.SRC_COLOR,[tl]:i.SRC_ALPHA,[Ud]:i.SRC_ALPHA_SATURATE,[Id]:i.DST_COLOR,[Pd]:i.DST_ALPHA,[Cd]:i.ONE_MINUS_SRC_COLOR,[el]:i.ONE_MINUS_SRC_ALPHA,[Ld]:i.ONE_MINUS_DST_COLOR,[Dd]:i.ONE_MINUS_DST_ALPHA,[zd]:i.CONSTANT_COLOR,[Nd]:i.ONE_MINUS_CONSTANT_COLOR,[Fd]:i.CONSTANT_ALPHA,[kd]:i.ONE_MINUS_CONSTANT_ALPHA};function te(G,vt,Et,Ft,gt,ut,Ot,ue,Oe,ve){if(G===Wi){g===!0&&(_t(i.BLEND),g=!1);return}if(g===!1&&(st(i.BLEND),g=!0),G!==yd){if(G!==x||ve!==S){if((d!==cs||_!==cs)&&(i.blendEquation(i.FUNC_ADD),d=cs,_=cs),ve)switch(G){case Xs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Uc:i.blendFunc(i.ONE,i.ONE);break;case zc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Nc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case Xs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Uc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case zc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Nc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}b=null,M=null,C=null,R=null,E.set(0,0,0),A=0,x=G,S=ve}return}gt=gt||vt,ut=ut||Et,Ot=Ot||Ft,(vt!==d||gt!==_)&&(i.blendEquationSeparate(be[vt],be[gt]),d=vt,_=gt),(Et!==b||Ft!==M||ut!==C||Ot!==R)&&(i.blendFuncSeparate(D[Et],D[Ft],D[ut],D[Ot]),b=Et,M=Ft,C=ut,R=Ot),(ue.equals(E)===!1||Oe!==A)&&(i.blendColor(ue.r,ue.g,ue.b,Oe),E.copy(ue),A=Oe),x=G,S=!1}function Yt(G,vt){G.side===Fe?_t(i.CULL_FACE):st(i.CULL_FACE);let Et=G.side===En;vt&&(Et=!Et),Wt(Et),G.blending===Xs&&G.transparent===!1?te(Wi):te(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),o.setFunc(G.depthFunc),o.setTest(G.depthTest),o.setMask(G.depthWrite),r.setMask(G.colorWrite);const Ft=G.stencilWrite;a.setTest(Ft),Ft&&(a.setMask(G.stencilWriteMask),a.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),a.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),pt(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?st(i.SAMPLE_ALPHA_TO_COVERAGE):_t(i.SAMPLE_ALPHA_TO_COVERAGE)}function Wt(G){y!==G&&(G?i.frontFace(i.CW):i.frontFace(i.CCW),y=G)}function Lt(G){G!==vd?(st(i.CULL_FACE),G!==U&&(G===Lc?i.cullFace(i.BACK):G===_d?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):_t(i.CULL_FACE),U=G}function ie(G){G!==N&&(W&&i.lineWidth(G),N=G)}function pt(G,vt,Et){G?(st(i.POLYGON_OFFSET_FILL),(X!==vt||J!==Et)&&(i.polygonOffset(vt,Et),X=vt,J=Et)):_t(i.POLYGON_OFFSET_FILL)}function yt(G){G?st(i.SCISSOR_TEST):_t(i.SCISSOR_TEST)}function ae(G){G===void 0&&(G=i.TEXTURE0+B-1),ct!==G&&(i.activeTexture(G),ct=G)}function Pe(G,vt,Et){Et===void 0&&(ct===null?Et=i.TEXTURE0+B-1:Et=ct);let Ft=j[Et];Ft===void 0&&(Ft={type:void 0,texture:void 0},j[Et]=Ft),(Ft.type!==G||Ft.texture!==vt)&&(ct!==Et&&(i.activeTexture(Et),ct=Et),i.bindTexture(G,vt||V[G]),Ft.type=G,Ft.texture=vt)}function P(){const G=j[ct];G!==void 0&&G.type!==void 0&&(i.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function w(){try{i.compressedTexImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function K(){try{i.compressedTexImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ot(){try{i.texSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function at(){try{i.texSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function rt(){try{i.compressedTexSubImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ut(){try{i.compressedTexSubImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function lt(){try{i.texStorage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function bt(){try{i.texStorage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ct(){try{i.texImage2D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function mt(){try{i.texImage3D(...arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function At(G){Ee.equals(G)===!1&&(i.scissor(G.x,G.y,G.z,G.w),Ee.copy(G))}function Zt(G){le.equals(G)===!1&&(i.viewport(G.x,G.y,G.z,G.w),le.copy(G))}function kt(G,vt){let Et=c.get(vt);Et===void 0&&(Et=new WeakMap,c.set(vt,Et));let Ft=Et.get(G);Ft===void 0&&(Ft=i.getUniformBlockIndex(vt,G.name),Et.set(G,Ft))}function wt(G,vt){const Ft=c.get(vt).get(G);l.get(vt)!==Ft&&(i.uniformBlockBinding(vt,Ft,G.__bindingPointIndex),l.set(vt,Ft))}function he(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ct=null,j={},u={},p=new WeakMap,f=[],m=null,g=!1,x=null,d=null,b=null,M=null,_=null,C=null,R=null,E=new Qt(0,0,0),A=0,S=!1,y=null,U=null,N=null,X=null,J=null,Ee.set(0,0,i.canvas.width,i.canvas.height),le.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:st,disable:_t,bindFramebuffer:Gt,drawBuffers:Nt,useProgram:de,setBlending:te,setMaterial:Yt,setFlipSided:Wt,setCullFace:Lt,setLineWidth:ie,setPolygonOffset:pt,setScissorTest:yt,activeTexture:ae,bindTexture:Pe,unbindTexture:P,compressedTexImage2D:w,compressedTexImage3D:K,texImage2D:Ct,texImage3D:mt,updateUBOMapping:kt,uniformBlockBinding:wt,texStorage2D:lt,texStorage3D:bt,texSubImage2D:ot,texSubImage3D:at,compressedTexSubImage2D:rt,compressedTexSubImage3D:Ut,scissor:At,viewport:Zt,reset:he}}function ev(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ht,h=new WeakMap;let u;const p=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(P,w){return f?new OffscreenCanvas(P,w):zo("canvas")}function g(P,w,K){let ot=1;const at=Pe(P);if((at.width>K||at.height>K)&&(ot=K/Math.max(at.width,at.height)),ot<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const rt=Math.floor(ot*at.width),Ut=Math.floor(ot*at.height);u===void 0&&(u=m(rt,Ut));const lt=w?m(rt,Ut):u;return lt.width=rt,lt.height=Ut,lt.getContext("2d").drawImage(P,0,0,rt,Ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+at.width+"x"+at.height+") to ("+rt+"x"+Ut+")."),lt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+at.width+"x"+at.height+")."),P;return P}function x(P){return P.generateMipmaps}function d(P){i.generateMipmap(P)}function b(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(P,w,K,ot,at=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let rt=w;if(w===i.RED&&(K===i.FLOAT&&(rt=i.R32F),K===i.HALF_FLOAT&&(rt=i.R16F),K===i.UNSIGNED_BYTE&&(rt=i.R8)),w===i.RED_INTEGER&&(K===i.UNSIGNED_BYTE&&(rt=i.R8UI),K===i.UNSIGNED_SHORT&&(rt=i.R16UI),K===i.UNSIGNED_INT&&(rt=i.R32UI),K===i.BYTE&&(rt=i.R8I),K===i.SHORT&&(rt=i.R16I),K===i.INT&&(rt=i.R32I)),w===i.RG&&(K===i.FLOAT&&(rt=i.RG32F),K===i.HALF_FLOAT&&(rt=i.RG16F),K===i.UNSIGNED_BYTE&&(rt=i.RG8)),w===i.RG_INTEGER&&(K===i.UNSIGNED_BYTE&&(rt=i.RG8UI),K===i.UNSIGNED_SHORT&&(rt=i.RG16UI),K===i.UNSIGNED_INT&&(rt=i.RG32UI),K===i.BYTE&&(rt=i.RG8I),K===i.SHORT&&(rt=i.RG16I),K===i.INT&&(rt=i.RG32I)),w===i.RGB_INTEGER&&(K===i.UNSIGNED_BYTE&&(rt=i.RGB8UI),K===i.UNSIGNED_SHORT&&(rt=i.RGB16UI),K===i.UNSIGNED_INT&&(rt=i.RGB32UI),K===i.BYTE&&(rt=i.RGB8I),K===i.SHORT&&(rt=i.RGB16I),K===i.INT&&(rt=i.RGB32I)),w===i.RGBA_INTEGER&&(K===i.UNSIGNED_BYTE&&(rt=i.RGBA8UI),K===i.UNSIGNED_SHORT&&(rt=i.RGBA16UI),K===i.UNSIGNED_INT&&(rt=i.RGBA32UI),K===i.BYTE&&(rt=i.RGBA8I),K===i.SHORT&&(rt=i.RGBA16I),K===i.INT&&(rt=i.RGBA32I)),w===i.RGB&&(K===i.UNSIGNED_INT_5_9_9_9_REV&&(rt=i.RGB9_E5),K===i.UNSIGNED_INT_10F_11F_11F_REV&&(rt=i.R11F_G11F_B10F)),w===i.RGBA){const Ut=at?Lo:Ue.getTransfer(ot);K===i.FLOAT&&(rt=i.RGBA32F),K===i.HALF_FLOAT&&(rt=i.RGBA16F),K===i.UNSIGNED_BYTE&&(rt=Ut===Ge?i.SRGB8_ALPHA8:i.RGBA8),K===i.UNSIGNED_SHORT_4_4_4_4&&(rt=i.RGBA4),K===i.UNSIGNED_SHORT_5_5_5_1&&(rt=i.RGB5_A1)}return(rt===i.R16F||rt===i.R32F||rt===i.RG16F||rt===i.RG32F||rt===i.RGBA16F||rt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function _(P,w){let K;return P?w===null||w===ps||w===Pr?K=i.DEPTH24_STENCIL8:w===Kn?K=i.DEPTH32F_STENCIL8:w===Cr&&(K=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===ps||w===Pr?K=i.DEPTH_COMPONENT24:w===Kn?K=i.DEPTH_COMPONENT32F:w===Cr&&(K=i.DEPTH_COMPONENT16),K}function C(P,w){return x(P)===!0||P.isFramebufferTexture&&P.minFilter!==Nn&&P.minFilter!==jn?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function R(P){const w=P.target;w.removeEventListener("dispose",R),A(w),w.isVideoTexture&&h.delete(w)}function E(P){const w=P.target;w.removeEventListener("dispose",E),y(w)}function A(P){const w=n.get(P);if(w.__webglInit===void 0)return;const K=P.source,ot=p.get(K);if(ot){const at=ot[w.__cacheKey];at.usedTimes--,at.usedTimes===0&&S(P),Object.keys(ot).length===0&&p.delete(K)}n.remove(P)}function S(P){const w=n.get(P);i.deleteTexture(w.__webglTexture);const K=P.source,ot=p.get(K);delete ot[w.__cacheKey],o.memory.textures--}function y(P){const w=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let ot=0;ot<6;ot++){if(Array.isArray(w.__webglFramebuffer[ot]))for(let at=0;at<w.__webglFramebuffer[ot].length;at++)i.deleteFramebuffer(w.__webglFramebuffer[ot][at]);else i.deleteFramebuffer(w.__webglFramebuffer[ot]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[ot])}else{if(Array.isArray(w.__webglFramebuffer))for(let ot=0;ot<w.__webglFramebuffer.length;ot++)i.deleteFramebuffer(w.__webglFramebuffer[ot]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let ot=0;ot<w.__webglColorRenderbuffer.length;ot++)w.__webglColorRenderbuffer[ot]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[ot]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const K=P.textures;for(let ot=0,at=K.length;ot<at;ot++){const rt=n.get(K[ot]);rt.__webglTexture&&(i.deleteTexture(rt.__webglTexture),o.memory.textures--),n.remove(K[ot])}n.remove(P)}let U=0;function N(){U=0}function X(){const P=U;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),U+=1,P}function J(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function B(P,w){const K=n.get(P);if(P.isVideoTexture&&yt(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&K.__version!==P.version){const ot=P.image;if(ot===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{V(K,P,w);return}}else P.isExternalTexture&&(K.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,K.__webglTexture,i.TEXTURE0+w)}function W(P,w){const K=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&K.__version!==P.version){V(K,P,w);return}e.bindTexture(i.TEXTURE_2D_ARRAY,K.__webglTexture,i.TEXTURE0+w)}function Q(P,w){const K=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&K.__version!==P.version){V(K,P,w);return}e.bindTexture(i.TEXTURE_3D,K.__webglTexture,i.TEXTURE0+w)}function Y(P,w){const K=n.get(P);if(P.version>0&&K.__version!==P.version){st(K,P,w);return}e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture,i.TEXTURE0+w)}const ct={[js]:i.REPEAT,[Gi]:i.CLAMP_TO_EDGE,[ul]:i.MIRRORED_REPEAT},j={[Nn]:i.NEAREST,[$d]:i.NEAREST_MIPMAP_NEAREST,[Xr]:i.NEAREST_MIPMAP_LINEAR,[jn]:i.LINEAR,[ea]:i.LINEAR_MIPMAP_NEAREST,[Vi]:i.LINEAR_MIPMAP_LINEAR},Mt={[Jd]:i.NEVER,[rf]:i.ALWAYS,[Qd]:i.LESS,[Su]:i.LEQUAL,[tf]:i.EQUAL,[sf]:i.GEQUAL,[ef]:i.GREATER,[nf]:i.NOTEQUAL};function $t(P,w){if(w.type===Kn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===jn||w.magFilter===ea||w.magFilter===Xr||w.magFilter===Vi||w.minFilter===jn||w.minFilter===ea||w.minFilter===Xr||w.minFilter===Vi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,ct[w.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,ct[w.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,ct[w.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,j[w.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,j[w.minFilter]),w.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,Mt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Nn||w.minFilter!==Xr&&w.minFilter!==Vi||w.type===Kn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const K=t.get("EXT_texture_filter_anisotropic");i.texParameterf(P,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Ee(P,w){let K=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",R));const ot=w.source;let at=p.get(ot);at===void 0&&(at={},p.set(ot,at));const rt=J(w);if(rt!==P.__cacheKey){at[rt]===void 0&&(at[rt]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,K=!0),at[rt].usedTimes++;const Ut=at[P.__cacheKey];Ut!==void 0&&(at[P.__cacheKey].usedTimes--,Ut.usedTimes===0&&S(w)),P.__cacheKey=rt,P.__webglTexture=at[rt].texture}return K}function le(P,w,K){return Math.floor(Math.floor(P/K)/w)}function ht(P,w,K,ot){const rt=P.updateRanges;if(rt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,K,ot,w.data);else{rt.sort((mt,At)=>mt.start-At.start);let Ut=0;for(let mt=1;mt<rt.length;mt++){const At=rt[Ut],Zt=rt[mt],kt=At.start+At.count,wt=le(Zt.start,w.width,4),he=le(At.start,w.width,4);Zt.start<=kt+1&&wt===he&&le(Zt.start+Zt.count-1,w.width,4)===wt?At.count=Math.max(At.count,Zt.start+Zt.count-At.start):(++Ut,rt[Ut]=Zt)}rt.length=Ut+1;const lt=i.getParameter(i.UNPACK_ROW_LENGTH),bt=i.getParameter(i.UNPACK_SKIP_PIXELS),Ct=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let mt=0,At=rt.length;mt<At;mt++){const Zt=rt[mt],kt=Math.floor(Zt.start/4),wt=Math.ceil(Zt.count/4),he=kt%w.width,G=Math.floor(kt/w.width),vt=wt,Et=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,he),i.pixelStorei(i.UNPACK_SKIP_ROWS,G),e.texSubImage2D(i.TEXTURE_2D,0,he,G,vt,Et,K,ot,w.data)}P.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,lt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,bt),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ct)}}function V(P,w,K){let ot=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ot=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ot=i.TEXTURE_3D);const at=Ee(P,w),rt=w.source;e.bindTexture(ot,P.__webglTexture,i.TEXTURE0+K);const Ut=n.get(rt);if(rt.version!==Ut.__version||at===!0){e.activeTexture(i.TEXTURE0+K);const lt=Ue.getPrimaries(Ue.workingColorSpace),bt=w.colorSpace===_i?null:Ue.getPrimaries(w.colorSpace),Ct=w.colorSpace===_i||lt===bt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);let mt=g(w.image,!1,s.maxTextureSize);mt=ae(w,mt);const At=r.convert(w.format,w.colorSpace),Zt=r.convert(w.type);let kt=M(w.internalFormat,At,Zt,w.colorSpace,w.isVideoTexture);$t(ot,w);let wt;const he=w.mipmaps,G=w.isVideoTexture!==!0,vt=Ut.__version===void 0||at===!0,Et=rt.dataReady,Ft=C(w,mt);if(w.isDepthTexture)kt=_(w.format===Ir,w.type),vt&&(G?e.texStorage2D(i.TEXTURE_2D,1,kt,mt.width,mt.height):e.texImage2D(i.TEXTURE_2D,0,kt,mt.width,mt.height,0,At,Zt,null));else if(w.isDataTexture)if(he.length>0){G&&vt&&e.texStorage2D(i.TEXTURE_2D,Ft,kt,he[0].width,he[0].height);for(let gt=0,ut=he.length;gt<ut;gt++)wt=he[gt],G?Et&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,wt.width,wt.height,At,Zt,wt.data):e.texImage2D(i.TEXTURE_2D,gt,kt,wt.width,wt.height,0,At,Zt,wt.data);w.generateMipmaps=!1}else G?(vt&&e.texStorage2D(i.TEXTURE_2D,Ft,kt,mt.width,mt.height),Et&&ht(w,mt,At,Zt)):e.texImage2D(i.TEXTURE_2D,0,kt,mt.width,mt.height,0,At,Zt,mt.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){G&&vt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ft,kt,he[0].width,he[0].height,mt.depth);for(let gt=0,ut=he.length;gt<ut;gt++)if(wt=he[gt],w.format!==zn)if(At!==null)if(G){if(Et)if(w.layerUpdates.size>0){const Ot=Eh(wt.width,wt.height,w.format,w.type);for(const ue of w.layerUpdates){const Oe=wt.data.subarray(ue*Ot/wt.data.BYTES_PER_ELEMENT,(ue+1)*Ot/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,ue,wt.width,wt.height,1,At,Oe)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,0,wt.width,wt.height,mt.depth,At,wt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,gt,kt,wt.width,wt.height,mt.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else G?Et&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,0,wt.width,wt.height,mt.depth,At,Zt,wt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,gt,kt,wt.width,wt.height,mt.depth,0,At,Zt,wt.data)}else{G&&vt&&e.texStorage2D(i.TEXTURE_2D,Ft,kt,he[0].width,he[0].height);for(let gt=0,ut=he.length;gt<ut;gt++)wt=he[gt],w.format!==zn?At!==null?G?Et&&e.compressedTexSubImage2D(i.TEXTURE_2D,gt,0,0,wt.width,wt.height,At,wt.data):e.compressedTexImage2D(i.TEXTURE_2D,gt,kt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):G?Et&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,wt.width,wt.height,At,Zt,wt.data):e.texImage2D(i.TEXTURE_2D,gt,kt,wt.width,wt.height,0,At,Zt,wt.data)}else if(w.isDataArrayTexture)if(G){if(vt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ft,kt,mt.width,mt.height,mt.depth),Et)if(w.layerUpdates.size>0){const gt=Eh(mt.width,mt.height,w.format,w.type);for(const ut of w.layerUpdates){const Ot=mt.data.subarray(ut*gt/mt.data.BYTES_PER_ELEMENT,(ut+1)*gt/mt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ut,mt.width,mt.height,1,At,Zt,Ot)}w.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,mt.width,mt.height,mt.depth,At,Zt,mt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,kt,mt.width,mt.height,mt.depth,0,At,Zt,mt.data);else if(w.isData3DTexture)G?(vt&&e.texStorage3D(i.TEXTURE_3D,Ft,kt,mt.width,mt.height,mt.depth),Et&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,mt.width,mt.height,mt.depth,At,Zt,mt.data)):e.texImage3D(i.TEXTURE_3D,0,kt,mt.width,mt.height,mt.depth,0,At,Zt,mt.data);else if(w.isFramebufferTexture){if(vt)if(G)e.texStorage2D(i.TEXTURE_2D,Ft,kt,mt.width,mt.height);else{let gt=mt.width,ut=mt.height;for(let Ot=0;Ot<Ft;Ot++)e.texImage2D(i.TEXTURE_2D,Ot,kt,gt,ut,0,At,Zt,null),gt>>=1,ut>>=1}}else if(he.length>0){if(G&&vt){const gt=Pe(he[0]);e.texStorage2D(i.TEXTURE_2D,Ft,kt,gt.width,gt.height)}for(let gt=0,ut=he.length;gt<ut;gt++)wt=he[gt],G?Et&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,At,Zt,wt):e.texImage2D(i.TEXTURE_2D,gt,kt,At,Zt,wt);w.generateMipmaps=!1}else if(G){if(vt){const gt=Pe(mt);e.texStorage2D(i.TEXTURE_2D,Ft,kt,gt.width,gt.height)}Et&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,At,Zt,mt)}else e.texImage2D(i.TEXTURE_2D,0,kt,At,Zt,mt);x(w)&&d(ot),Ut.__version=rt.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function st(P,w,K){if(w.image.length!==6)return;const ot=Ee(P,w),at=w.source;e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+K);const rt=n.get(at);if(at.version!==rt.__version||ot===!0){e.activeTexture(i.TEXTURE0+K);const Ut=Ue.getPrimaries(Ue.workingColorSpace),lt=w.colorSpace===_i?null:Ue.getPrimaries(w.colorSpace),bt=w.colorSpace===_i||Ut===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);const Ct=w.isCompressedTexture||w.image[0].isCompressedTexture,mt=w.image[0]&&w.image[0].isDataTexture,At=[];for(let ut=0;ut<6;ut++)!Ct&&!mt?At[ut]=g(w.image[ut],!0,s.maxCubemapSize):At[ut]=mt?w.image[ut].image:w.image[ut],At[ut]=ae(w,At[ut]);const Zt=At[0],kt=r.convert(w.format,w.colorSpace),wt=r.convert(w.type),he=M(w.internalFormat,kt,wt,w.colorSpace),G=w.isVideoTexture!==!0,vt=rt.__version===void 0||ot===!0,Et=at.dataReady;let Ft=C(w,Zt);$t(i.TEXTURE_CUBE_MAP,w);let gt;if(Ct){G&&vt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ft,he,Zt.width,Zt.height);for(let ut=0;ut<6;ut++){gt=At[ut].mipmaps;for(let Ot=0;Ot<gt.length;Ot++){const ue=gt[Ot];w.format!==zn?kt!==null?G?Et&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ot,0,0,ue.width,ue.height,kt,ue.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ot,he,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ot,0,0,ue.width,ue.height,kt,wt,ue.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ot,he,ue.width,ue.height,0,kt,wt,ue.data)}}}else{if(gt=w.mipmaps,G&&vt){gt.length>0&&Ft++;const ut=Pe(At[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ft,he,ut.width,ut.height)}for(let ut=0;ut<6;ut++)if(mt){G?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,At[ut].width,At[ut].height,kt,wt,At[ut].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,he,At[ut].width,At[ut].height,0,kt,wt,At[ut].data);for(let Ot=0;Ot<gt.length;Ot++){const Oe=gt[Ot].image[ut].image;G?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ot+1,0,0,Oe.width,Oe.height,kt,wt,Oe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ot+1,he,Oe.width,Oe.height,0,kt,wt,Oe.data)}}else{G?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,kt,wt,At[ut]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,he,kt,wt,At[ut]);for(let Ot=0;Ot<gt.length;Ot++){const ue=gt[Ot];G?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ot+1,0,0,kt,wt,ue.image[ut]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ot+1,he,kt,wt,ue.image[ut])}}}x(w)&&d(i.TEXTURE_CUBE_MAP),rt.__version=at.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function _t(P,w,K,ot,at,rt){const Ut=r.convert(K.format,K.colorSpace),lt=r.convert(K.type),bt=M(K.internalFormat,Ut,lt,K.colorSpace),Ct=n.get(w),mt=n.get(K);if(mt.__renderTarget=w,!Ct.__hasExternalTextures){const At=Math.max(1,w.width>>rt),Zt=Math.max(1,w.height>>rt);at===i.TEXTURE_3D||at===i.TEXTURE_2D_ARRAY?e.texImage3D(at,rt,bt,At,Zt,w.depth,0,Ut,lt,null):e.texImage2D(at,rt,bt,At,Zt,0,Ut,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,P),pt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ot,at,mt.__webglTexture,0,ie(w)):(at===i.TEXTURE_2D||at>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&at<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ot,at,mt.__webglTexture,rt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Gt(P,w,K){if(i.bindRenderbuffer(i.RENDERBUFFER,P),w.depthBuffer){const ot=w.depthTexture,at=ot&&ot.isDepthTexture?ot.type:null,rt=_(w.stencilBuffer,at),Ut=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=ie(w);pt(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt,rt,w.width,w.height):K?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,rt,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,rt,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ut,i.RENDERBUFFER,P)}else{const ot=w.textures;for(let at=0;at<ot.length;at++){const rt=ot[at],Ut=r.convert(rt.format,rt.colorSpace),lt=r.convert(rt.type),bt=M(rt.internalFormat,Ut,lt,rt.colorSpace),Ct=ie(w);K&&pt(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ct,bt,w.width,w.height):pt(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ct,bt,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,bt,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Nt(P,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ot=n.get(w.depthTexture);ot.__renderTarget=w,(!ot.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),B(w.depthTexture,0);const at=ot.__webglTexture,rt=ie(w);if(w.depthTexture.format===Dr)pt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,at,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,at,0);else if(w.depthTexture.format===Ir)pt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,at,0,rt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,at,0);else throw new Error("Unknown depthTexture format")}function de(P){const w=n.get(P),K=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){const ot=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),ot){const at=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,ot.removeEventListener("dispose",at)};ot.addEventListener("dispose",at),w.__depthDisposeCallback=at}w.__boundDepthTexture=ot}if(P.depthTexture&&!w.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");const ot=P.texture.mipmaps;ot&&ot.length>0?Nt(w.__webglFramebuffer[0],P):Nt(w.__webglFramebuffer,P)}else if(K){w.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[ot]),w.__webglDepthbuffer[ot]===void 0)w.__webglDepthbuffer[ot]=i.createRenderbuffer(),Gt(w.__webglDepthbuffer[ot],P,!1);else{const at=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=w.__webglDepthbuffer[ot];i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,rt)}}else{const ot=P.texture.mipmaps;if(ot&&ot.length>0?e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),Gt(w.__webglDepthbuffer,P,!1);else{const at=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,rt=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,rt),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,rt)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function be(P,w,K){const ot=n.get(P);w!==void 0&&_t(ot.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),K!==void 0&&de(P)}function D(P){const w=P.texture,K=n.get(P),ot=n.get(w);P.addEventListener("dispose",E);const at=P.textures,rt=P.isWebGLCubeRenderTarget===!0,Ut=at.length>1;if(Ut||(ot.__webglTexture===void 0&&(ot.__webglTexture=i.createTexture()),ot.__version=w.version,o.memory.textures++),rt){K.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(w.mipmaps&&w.mipmaps.length>0){K.__webglFramebuffer[lt]=[];for(let bt=0;bt<w.mipmaps.length;bt++)K.__webglFramebuffer[lt][bt]=i.createFramebuffer()}else K.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){K.__webglFramebuffer=[];for(let lt=0;lt<w.mipmaps.length;lt++)K.__webglFramebuffer[lt]=i.createFramebuffer()}else K.__webglFramebuffer=i.createFramebuffer();if(Ut)for(let lt=0,bt=at.length;lt<bt;lt++){const Ct=n.get(at[lt]);Ct.__webglTexture===void 0&&(Ct.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&pt(P)===!1){K.__webglMultisampledFramebuffer=i.createFramebuffer(),K.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let lt=0;lt<at.length;lt++){const bt=at[lt];K.__webglColorRenderbuffer[lt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,K.__webglColorRenderbuffer[lt]);const Ct=r.convert(bt.format,bt.colorSpace),mt=r.convert(bt.type),At=M(bt.internalFormat,Ct,mt,bt.colorSpace,P.isXRRenderTarget===!0),Zt=ie(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Zt,At,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,K.__webglColorRenderbuffer[lt])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(K.__webglDepthRenderbuffer=i.createRenderbuffer(),Gt(K.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(rt){e.bindTexture(i.TEXTURE_CUBE_MAP,ot.__webglTexture),$t(i.TEXTURE_CUBE_MAP,w);for(let lt=0;lt<6;lt++)if(w.mipmaps&&w.mipmaps.length>0)for(let bt=0;bt<w.mipmaps.length;bt++)_t(K.__webglFramebuffer[lt][bt],P,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,bt);else _t(K.__webglFramebuffer[lt],P,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);x(w)&&d(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ut){for(let lt=0,bt=at.length;lt<bt;lt++){const Ct=at[lt],mt=n.get(Ct);let At=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(At=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(At,mt.__webglTexture),$t(At,Ct),_t(K.__webglFramebuffer,P,Ct,i.COLOR_ATTACHMENT0+lt,At,0),x(Ct)&&d(At)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(lt=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,ot.__webglTexture),$t(lt,w),w.mipmaps&&w.mipmaps.length>0)for(let bt=0;bt<w.mipmaps.length;bt++)_t(K.__webglFramebuffer[bt],P,w,i.COLOR_ATTACHMENT0,lt,bt);else _t(K.__webglFramebuffer,P,w,i.COLOR_ATTACHMENT0,lt,0);x(w)&&d(lt),e.unbindTexture()}P.depthBuffer&&de(P)}function te(P){const w=P.textures;for(let K=0,ot=w.length;K<ot;K++){const at=w[K];if(x(at)){const rt=b(P),Ut=n.get(at).__webglTexture;e.bindTexture(rt,Ut),d(rt),e.unbindTexture()}}}const Yt=[],Wt=[];function Lt(P){if(P.samples>0){if(pt(P)===!1){const w=P.textures,K=P.width,ot=P.height;let at=i.COLOR_BUFFER_BIT;const rt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ut=n.get(P),lt=w.length>1;if(lt)for(let Ct=0;Ct<w.length;Ct++)e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer);const bt=P.texture.mipmaps;bt&&bt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer);for(let Ct=0;Ct<w.length;Ct++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(at|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(at|=i.STENCIL_BUFFER_BIT)),lt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ut.__webglColorRenderbuffer[Ct]);const mt=n.get(w[Ct]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,mt,0)}i.blitFramebuffer(0,0,K,ot,0,0,K,ot,at,i.NEAREST),l===!0&&(Yt.length=0,Wt.length=0,Yt.push(i.COLOR_ATTACHMENT0+Ct),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Yt.push(rt),Wt.push(rt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Wt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Yt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),lt)for(let Ct=0;Ct<w.length;Ct++){e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.RENDERBUFFER,Ut.__webglColorRenderbuffer[Ct]);const mt=n.get(w[Ct]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ct,i.TEXTURE_2D,mt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const w=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function ie(P){return Math.min(s.maxSamples,P.samples)}function pt(P){const w=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function yt(P){const w=o.render.frame;h.get(P)!==w&&(h.set(P,w),P.update())}function ae(P,w){const K=P.colorSpace,ot=P.format,at=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||K!==Ks&&K!==_i&&(Ue.getTransfer(K)===Ge?(ot!==zn||at!==oi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),w}function Pe(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=N,this.setTexture2D=B,this.setTexture2DArray=W,this.setTexture3D=Q,this.setTextureCube=Y,this.rebindTextures=be,this.setupRenderTarget=D,this.updateRenderTargetMipmap=te,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=pt}function nv(i,t){function e(n,s=_i){let r;const o=Ue.getTransfer(s);if(n===oi)return i.UNSIGNED_BYTE;if(n===Ql)return i.UNSIGNED_SHORT_4_4_4_4;if(n===tc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===xu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===vu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===mu)return i.BYTE;if(n===gu)return i.SHORT;if(n===Cr)return i.UNSIGNED_SHORT;if(n===Jl)return i.INT;if(n===ps)return i.UNSIGNED_INT;if(n===Kn)return i.FLOAT;if(n===Fr)return i.HALF_FLOAT;if(n===_u)return i.ALPHA;if(n===Mu)return i.RGB;if(n===zn)return i.RGBA;if(n===Dr)return i.DEPTH_COMPONENT;if(n===Ir)return i.DEPTH_STENCIL;if(n===ec)return i.RED;if(n===nc)return i.RED_INTEGER;if(n===yu)return i.RG;if(n===ic)return i.RG_INTEGER;if(n===sc)return i.RGBA_INTEGER;if(n===Ao||n===Ro||n===Co||n===Po)if(o===Ge)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ao)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Po)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ao)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ro)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Co)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Po)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===dl||n===fl||n===pl||n===ml)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===dl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===pl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ml)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===gl||n===xl||n===vl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===gl||n===xl)return o===Ge?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===vl)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===_l||n===Ml||n===yl||n===Sl||n===bl||n===wl||n===El||n===Tl||n===Al||n===Rl||n===Cl||n===Pl||n===Dl||n===Il)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===_l)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ml)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===yl)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Sl)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===bl)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===wl)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===El)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Tl)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Al)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Rl)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Cl)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Pl)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Dl)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Il)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ll||n===Ul||n===zl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ll)return o===Ge?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ul)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===zl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Nl||n===Fl||n===kl||n===Ol)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Nl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Fl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===kl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ol)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Pr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const iv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class rv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Lu(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Bn({vertexShader:iv,fragmentShader:sv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ne(new Si(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ov extends er{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,p=null,f=null,m=null;const g=typeof XRWebGLBinding<"u",x=new rv,d={},b=e.getContextAttributes();let M=null,_=null;const C=[],R=[],E=new Ht;let A=null;const S=new Rn;S.viewport=new Ie;const y=new Rn;y.viewport=new Ie;const U=[S,y],N=new Ap;let X=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let st=C[V];return st===void 0&&(st=new Sa,C[V]=st),st.getTargetRaySpace()},this.getControllerGrip=function(V){let st=C[V];return st===void 0&&(st=new Sa,C[V]=st),st.getGripSpace()},this.getHand=function(V){let st=C[V];return st===void 0&&(st=new Sa,C[V]=st),st.getHandSpace()};function B(V){const st=R.indexOf(V.inputSource);if(st===-1)return;const _t=C[st];_t!==void 0&&(_t.update(V.inputSource,V.frame,c||o),_t.dispatchEvent({type:V.type,data:V.inputSource}))}function W(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",Q);for(let V=0;V<C.length;V++){const st=R[V];st!==null&&(R[V]=null,C[V].disconnect(st))}X=null,J=null,x.reset();for(const V in d)delete d[V];t.setRenderTarget(M),f=null,p=null,u=null,s=null,_=null,ht.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){a=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return p!==null?p:f},this.getBinding=function(){return u===null&&g&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(M=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",W),s.addEventListener("inputsourceschange",Q),b.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(E),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let _t=null,Gt=null,Nt=null;b.depth&&(Nt=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,_t=b.stencil?Ir:Dr,Gt=b.stencil?Pr:ps);const de={colorFormat:e.RGBA8,depthFormat:Nt,scaleFactor:r};u=this.getBinding(),p=u.createProjectionLayer(de),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),_=new Yi(p.textureWidth,p.textureHeight,{format:zn,type:oi,depthTexture:new Iu(p.textureWidth,p.textureHeight,Gt,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const _t={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,_t),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new Yi(f.framebufferWidth,f.framebufferHeight,{format:zn,type:oi,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ht.setContext(s),ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Q(V){for(let st=0;st<V.removed.length;st++){const _t=V.removed[st],Gt=R.indexOf(_t);Gt>=0&&(R[Gt]=null,C[Gt].disconnect(_t))}for(let st=0;st<V.added.length;st++){const _t=V.added[st];let Gt=R.indexOf(_t);if(Gt===-1){for(let de=0;de<C.length;de++)if(de>=R.length){R.push(_t),Gt=de;break}else if(R[de]===null){R[de]=_t,Gt=de;break}if(Gt===-1)break}const Nt=C[Gt];Nt&&Nt.connect(_t)}}const Y=new L,ct=new L;function j(V,st,_t){Y.setFromMatrixPosition(st.matrixWorld),ct.setFromMatrixPosition(_t.matrixWorld);const Gt=Y.distanceTo(ct),Nt=st.projectionMatrix.elements,de=_t.projectionMatrix.elements,be=Nt[14]/(Nt[10]-1),D=Nt[14]/(Nt[10]+1),te=(Nt[9]+1)/Nt[5],Yt=(Nt[9]-1)/Nt[5],Wt=(Nt[8]-1)/Nt[0],Lt=(de[8]+1)/de[0],ie=be*Wt,pt=be*Lt,yt=Gt/(-Wt+Lt),ae=yt*-Wt;if(st.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(ae),V.translateZ(yt),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),Nt[10]===-1)V.projectionMatrix.copy(st.projectionMatrix),V.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{const Pe=be+yt,P=D+yt,w=ie-ae,K=pt+(Gt-ae),ot=te*D/P*Pe,at=Yt*D/P*Pe;V.projectionMatrix.makePerspective(w,K,ot,at,Pe,P),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function Mt(V,st){st===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(st.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;let st=V.near,_t=V.far;x.texture!==null&&(x.depthNear>0&&(st=x.depthNear),x.depthFar>0&&(_t=x.depthFar)),N.near=y.near=S.near=st,N.far=y.far=S.far=_t,(X!==N.near||J!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),X=N.near,J=N.far),N.layers.mask=V.layers.mask|6,S.layers.mask=N.layers.mask&3,y.layers.mask=N.layers.mask&5;const Gt=V.parent,Nt=N.cameras;Mt(N,Gt);for(let de=0;de<Nt.length;de++)Mt(Nt[de],Gt);Nt.length===2?j(N,S,y):N.projectionMatrix.copy(S.projectionMatrix),$t(V,N,Gt)};function $t(V,st,_t){_t===null?V.matrix.copy(st.matrixWorld):(V.matrix.copy(_t.matrixWorld),V.matrix.invert(),V.matrix.multiply(st.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(st.projectionMatrix),V.projectionMatrixInverse.copy(st.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Lr*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(p===null&&f===null))return l},this.setFoveation=function(V){l=V,p!==null&&(p.fixedFoveation=V),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=V)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(N)},this.getCameraTexture=function(V){return d[V]};let Ee=null;function le(V,st){if(h=st.getViewerPose(c||o),m=st,h!==null){const _t=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let Gt=!1;_t.length!==N.cameras.length&&(N.cameras.length=0,Gt=!0);for(let D=0;D<_t.length;D++){const te=_t[D];let Yt=null;if(f!==null)Yt=f.getViewport(te);else{const Lt=u.getViewSubImage(p,te);Yt=Lt.viewport,D===0&&(t.setRenderTargetTextures(_,Lt.colorTexture,Lt.depthStencilTexture),t.setRenderTarget(_))}let Wt=U[D];Wt===void 0&&(Wt=new Rn,Wt.layers.enable(D),Wt.viewport=new Ie,U[D]=Wt),Wt.matrix.fromArray(te.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(te.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(Yt.x,Yt.y,Yt.width,Yt.height),D===0&&(N.matrix.copy(Wt.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Gt===!0&&N.cameras.push(Wt)}const Nt=s.enabledFeatures;if(Nt&&Nt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&g){u=n.getBinding();const D=u.getDepthInformation(_t[0]);D&&D.isValid&&D.texture&&x.init(D,s.renderState)}if(Nt&&Nt.includes("camera-access")&&g){t.state.unbindTexture(),u=n.getBinding();for(let D=0;D<_t.length;D++){const te=_t[D].camera;if(te){let Yt=d[te];Yt||(Yt=new Lu,d[te]=Yt);const Wt=u.getCameraImage(te);Yt.sourceTexture=Wt}}}}for(let _t=0;_t<C.length;_t++){const Gt=R[_t],Nt=C[_t];Gt!==null&&Nt!==void 0&&Nt.update(Gt,st,c||o)}Ee&&Ee(V,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),m=null}const ht=new Bu;ht.setAnimationLoop(le),this.setAnimationLoop=function(V){Ee=V},this.dispose=function(){}}}const rs=new li,av=new ce;function lv(i,t){function e(x,d){x.matrixAutoUpdate===!0&&x.updateMatrix(),d.value.copy(x.matrix)}function n(x,d){d.color.getRGB(x.fogColor.value,Au(i)),d.isFog?(x.fogNear.value=d.near,x.fogFar.value=d.far):d.isFogExp2&&(x.fogDensity.value=d.density)}function s(x,d,b,M,_){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(x,d):d.isMeshToonMaterial?(r(x,d),u(x,d)):d.isMeshPhongMaterial?(r(x,d),h(x,d)):d.isMeshStandardMaterial?(r(x,d),p(x,d),d.isMeshPhysicalMaterial&&f(x,d,_)):d.isMeshMatcapMaterial?(r(x,d),m(x,d)):d.isMeshDepthMaterial?r(x,d):d.isMeshDistanceMaterial?(r(x,d),g(x,d)):d.isMeshNormalMaterial?r(x,d):d.isLineBasicMaterial?(o(x,d),d.isLineDashedMaterial&&a(x,d)):d.isPointsMaterial?l(x,d,b,M):d.isSpriteMaterial?c(x,d):d.isShadowMaterial?(x.color.value.copy(d.color),x.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(x,d){x.opacity.value=d.opacity,d.color&&x.diffuse.value.copy(d.color),d.emissive&&x.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(x.map.value=d.map,e(d.map,x.mapTransform)),d.alphaMap&&(x.alphaMap.value=d.alphaMap,e(d.alphaMap,x.alphaMapTransform)),d.bumpMap&&(x.bumpMap.value=d.bumpMap,e(d.bumpMap,x.bumpMapTransform),x.bumpScale.value=d.bumpScale,d.side===En&&(x.bumpScale.value*=-1)),d.normalMap&&(x.normalMap.value=d.normalMap,e(d.normalMap,x.normalMapTransform),x.normalScale.value.copy(d.normalScale),d.side===En&&x.normalScale.value.negate()),d.displacementMap&&(x.displacementMap.value=d.displacementMap,e(d.displacementMap,x.displacementMapTransform),x.displacementScale.value=d.displacementScale,x.displacementBias.value=d.displacementBias),d.emissiveMap&&(x.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,x.emissiveMapTransform)),d.specularMap&&(x.specularMap.value=d.specularMap,e(d.specularMap,x.specularMapTransform)),d.alphaTest>0&&(x.alphaTest.value=d.alphaTest);const b=t.get(d),M=b.envMap,_=b.envMapRotation;M&&(x.envMap.value=M,rs.copy(_),rs.x*=-1,rs.y*=-1,rs.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(rs.y*=-1,rs.z*=-1),x.envMapRotation.value.setFromMatrix4(av.makeRotationFromEuler(rs)),x.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=d.reflectivity,x.ior.value=d.ior,x.refractionRatio.value=d.refractionRatio),d.lightMap&&(x.lightMap.value=d.lightMap,x.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,x.lightMapTransform)),d.aoMap&&(x.aoMap.value=d.aoMap,x.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,x.aoMapTransform))}function o(x,d){x.diffuse.value.copy(d.color),x.opacity.value=d.opacity,d.map&&(x.map.value=d.map,e(d.map,x.mapTransform))}function a(x,d){x.dashSize.value=d.dashSize,x.totalSize.value=d.dashSize+d.gapSize,x.scale.value=d.scale}function l(x,d,b,M){x.diffuse.value.copy(d.color),x.opacity.value=d.opacity,x.size.value=d.size*b,x.scale.value=M*.5,d.map&&(x.map.value=d.map,e(d.map,x.uvTransform)),d.alphaMap&&(x.alphaMap.value=d.alphaMap,e(d.alphaMap,x.alphaMapTransform)),d.alphaTest>0&&(x.alphaTest.value=d.alphaTest)}function c(x,d){x.diffuse.value.copy(d.color),x.opacity.value=d.opacity,x.rotation.value=d.rotation,d.map&&(x.map.value=d.map,e(d.map,x.mapTransform)),d.alphaMap&&(x.alphaMap.value=d.alphaMap,e(d.alphaMap,x.alphaMapTransform)),d.alphaTest>0&&(x.alphaTest.value=d.alphaTest)}function h(x,d){x.specular.value.copy(d.specular),x.shininess.value=Math.max(d.shininess,1e-4)}function u(x,d){d.gradientMap&&(x.gradientMap.value=d.gradientMap)}function p(x,d){x.metalness.value=d.metalness,d.metalnessMap&&(x.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,x.metalnessMapTransform)),x.roughness.value=d.roughness,d.roughnessMap&&(x.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,x.roughnessMapTransform)),d.envMap&&(x.envMapIntensity.value=d.envMapIntensity)}function f(x,d,b){x.ior.value=d.ior,d.sheen>0&&(x.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),x.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(x.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,x.sheenColorMapTransform)),d.sheenRoughnessMap&&(x.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,x.sheenRoughnessMapTransform))),d.clearcoat>0&&(x.clearcoat.value=d.clearcoat,x.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(x.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,x.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(x.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===En&&x.clearcoatNormalScale.value.negate())),d.dispersion>0&&(x.dispersion.value=d.dispersion),d.iridescence>0&&(x.iridescence.value=d.iridescence,x.iridescenceIOR.value=d.iridescenceIOR,x.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(x.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,x.iridescenceMapTransform)),d.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),d.transmission>0&&(x.transmission.value=d.transmission,x.transmissionSamplerMap.value=b.texture,x.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(x.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,x.transmissionMapTransform)),x.thickness.value=d.thickness,d.thicknessMap&&(x.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=d.attenuationDistance,x.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(x.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(x.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=d.specularIntensity,x.specularColor.value.copy(d.specularColor),d.specularColorMap&&(x.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,x.specularColorMapTransform)),d.specularIntensityMap&&(x.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,x.specularIntensityMapTransform))}function m(x,d){d.matcap&&(x.matcap.value=d.matcap)}function g(x,d){const b=t.get(d).light;x.referencePosition.value.setFromMatrixPosition(b.matrixWorld),x.nearDistance.value=b.shadow.camera.near,x.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function cv(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,M){const _=M.program;n.uniformBlockBinding(b,_)}function c(b,M){let _=s[b.id];_===void 0&&(m(b),_=h(b),s[b.id]=_,b.addEventListener("dispose",x));const C=M.program;n.updateUBOMapping(b,C);const R=t.render.frame;r[b.id]!==R&&(p(b),r[b.id]=R)}function h(b){const M=u();b.__bindingPointIndex=M;const _=i.createBuffer(),C=b.__size,R=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,C,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,_),_}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(b){const M=s[b.id],_=b.uniforms,C=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let R=0,E=_.length;R<E;R++){const A=Array.isArray(_[R])?_[R]:[_[R]];for(let S=0,y=A.length;S<y;S++){const U=A[S];if(f(U,R,S,C)===!0){const N=U.__offset,X=Array.isArray(U.value)?U.value:[U.value];let J=0;for(let B=0;B<X.length;B++){const W=X[B],Q=g(W);typeof W=="number"||typeof W=="boolean"?(U.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,N+J,U.__data)):W.isMatrix3?(U.__data[0]=W.elements[0],U.__data[1]=W.elements[1],U.__data[2]=W.elements[2],U.__data[3]=0,U.__data[4]=W.elements[3],U.__data[5]=W.elements[4],U.__data[6]=W.elements[5],U.__data[7]=0,U.__data[8]=W.elements[6],U.__data[9]=W.elements[7],U.__data[10]=W.elements[8],U.__data[11]=0):(W.toArray(U.__data,J),J+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(b,M,_,C){const R=b.value,E=M+"_"+_;if(C[E]===void 0)return typeof R=="number"||typeof R=="boolean"?C[E]=R:C[E]=R.clone(),!0;{const A=C[E];if(typeof R=="number"||typeof R=="boolean"){if(A!==R)return C[E]=R,!0}else if(A.equals(R)===!1)return A.copy(R),!0}return!1}function m(b){const M=b.uniforms;let _=0;const C=16;for(let E=0,A=M.length;E<A;E++){const S=Array.isArray(M[E])?M[E]:[M[E]];for(let y=0,U=S.length;y<U;y++){const N=S[y],X=Array.isArray(N.value)?N.value:[N.value];for(let J=0,B=X.length;J<B;J++){const W=X[J],Q=g(W),Y=_%C,ct=Y%Q.boundary,j=Y+ct;_+=ct,j!==0&&C-j<Q.storage&&(_+=C-j),N.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=_,_+=Q.storage}}}const R=_%C;return R>0&&(_+=C-R),b.__size=_,b.__cache={},this}function g(b){const M={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(M.boundary=4,M.storage=4):b.isVector2?(M.boundary=8,M.storage=8):b.isVector3||b.isColor?(M.boundary=16,M.storage=12):b.isVector4?(M.boundary=16,M.storage=16):b.isMatrix3?(M.boundary=48,M.storage=48):b.isMatrix4?(M.boundary=64,M.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),M}function x(b){const M=b.target;M.removeEventListener("dispose",x);const _=o.indexOf(M.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function d(){for(const b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}class hv{constructor(t={}){const{canvas:e=Sf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:p=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const m=new Uint32Array(4),g=new Int32Array(4);let x=null,d=null;const b=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let C=!1;this._outputColorSpace=An;let R=0,E=0,A=null,S=-1,y=null;const U=new Ie,N=new Ie;let X=null;const J=new Qt(0);let B=0,W=e.width,Q=e.height,Y=1,ct=null,j=null;const Mt=new Ie(0,0,W,Q),$t=new Ie(0,0,W,Q);let Ee=!1;const le=new dc;let ht=!1,V=!1;const st=new ce,_t=new L,Gt=new Ie,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let de=!1;function be(){return A===null?Y:1}let D=n;function te(T,$){return e.getContext(T,$)}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Kl}`),e.addEventListener("webglcontextlost",Et,!1),e.addEventListener("webglcontextrestored",Ft,!1),e.addEventListener("webglcontextcreationerror",gt,!1),D===null){const $="webgl2";if(D=te($,T),D===null)throw te($)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Yt,Wt,Lt,ie,pt,yt,ae,Pe,P,w,K,ot,at,rt,Ut,lt,bt,Ct,mt,At,Zt,kt,wt,he;function G(){Yt=new Mg(D),Yt.init(),kt=new nv(D,Yt),Wt=new fg(D,Yt,t,kt),Lt=new tv(D,Yt),Wt.reversedDepthBuffer&&p&&Lt.buffers.depth.setReversed(!0),ie=new bg(D),pt=new Hx,yt=new ev(D,Yt,Lt,pt,Wt,kt,ie),ae=new mg(_),Pe=new _g(_),P=new Cp(D),wt=new ug(D,P),w=new yg(D,P,ie,wt),K=new Eg(D,w,P,ie),mt=new wg(D,Wt,yt),lt=new pg(pt),ot=new Bx(_,ae,Pe,Yt,Wt,wt,lt),at=new lv(_,pt),rt=new Vx,Ut=new Zx(Yt),Ct=new hg(_,ae,Pe,Lt,K,f,l),bt=new Jx(_,K,Wt),he=new cv(D,ie,Wt,Lt),At=new dg(D,Yt,ie),Zt=new Sg(D,Yt,ie),ie.programs=ot.programs,_.capabilities=Wt,_.extensions=Yt,_.properties=pt,_.renderLists=rt,_.shadowMap=bt,_.state=Lt,_.info=ie}G();const vt=new ov(_,D);this.xr=vt,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const T=Yt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Yt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(T){T!==void 0&&(Y=T,this.setSize(W,Q,!1))},this.getSize=function(T){return T.set(W,Q)},this.setSize=function(T,$,tt=!0){if(vt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=T,Q=$,e.width=Math.floor(T*Y),e.height=Math.floor($*Y),tt===!0&&(e.style.width=T+"px",e.style.height=$+"px"),this.setViewport(0,0,T,$)},this.getDrawingBufferSize=function(T){return T.set(W*Y,Q*Y).floor()},this.setDrawingBufferSize=function(T,$,tt){W=T,Q=$,Y=tt,e.width=Math.floor(T*tt),e.height=Math.floor($*tt),this.setViewport(0,0,T,$)},this.getCurrentViewport=function(T){return T.copy(U)},this.getViewport=function(T){return T.copy(Mt)},this.setViewport=function(T,$,tt,et){T.isVector4?Mt.set(T.x,T.y,T.z,T.w):Mt.set(T,$,tt,et),Lt.viewport(U.copy(Mt).multiplyScalar(Y).round())},this.getScissor=function(T){return T.copy($t)},this.setScissor=function(T,$,tt,et){T.isVector4?$t.set(T.x,T.y,T.z,T.w):$t.set(T,$,tt,et),Lt.scissor(N.copy($t).multiplyScalar(Y).round())},this.getScissorTest=function(){return Ee},this.setScissorTest=function(T){Lt.setScissorTest(Ee=T)},this.setOpaqueSort=function(T){ct=T},this.setTransparentSort=function(T){j=T},this.getClearColor=function(T){return T.copy(Ct.getClearColor())},this.setClearColor=function(){Ct.setClearColor(...arguments)},this.getClearAlpha=function(){return Ct.getClearAlpha()},this.setClearAlpha=function(){Ct.setClearAlpha(...arguments)},this.clear=function(T=!0,$=!0,tt=!0){let et=0;if(T){let Z=!1;if(A!==null){const xt=A.texture.format;Z=xt===sc||xt===ic||xt===nc}if(Z){const xt=A.texture.type,Dt=xt===oi||xt===ps||xt===Cr||xt===Pr||xt===Ql||xt===tc,Bt=Ct.getClearColor(),Pt=Ct.getClearAlpha(),jt=Bt.r,re=Bt.g,Kt=Bt.b;Dt?(m[0]=jt,m[1]=re,m[2]=Kt,m[3]=Pt,D.clearBufferuiv(D.COLOR,0,m)):(g[0]=jt,g[1]=re,g[2]=Kt,g[3]=Pt,D.clearBufferiv(D.COLOR,0,g))}else et|=D.COLOR_BUFFER_BIT}$&&(et|=D.DEPTH_BUFFER_BIT),tt&&(et|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(et)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Et,!1),e.removeEventListener("webglcontextrestored",Ft,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),Ct.dispose(),rt.dispose(),Ut.dispose(),pt.dispose(),ae.dispose(),Pe.dispose(),K.dispose(),wt.dispose(),he.dispose(),ot.dispose(),vt.dispose(),vt.removeEventListener("sessionstart",Pn),vt.removeEventListener("sessionend",sr),Qn.stop()};function Et(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Ft(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const T=ie.autoReset,$=bt.enabled,tt=bt.autoUpdate,et=bt.needsUpdate,Z=bt.type;G(),ie.autoReset=T,bt.enabled=$,bt.autoUpdate=tt,bt.needsUpdate=et,bt.type=Z}function gt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ut(T){const $=T.target;$.removeEventListener("dispose",ut),Ot($)}function Ot(T){ue(T),pt.remove(T)}function ue(T){const $=pt.get(T).programs;$!==void 0&&($.forEach(function(tt){ot.releaseProgram(tt)}),T.isShaderMaterial&&ot.releaseShaderCache(T))}this.renderBufferDirect=function(T,$,tt,et,Z,xt){$===null&&($=Nt);const Dt=Z.isMesh&&Z.matrixWorld.determinant()<0,Bt=jo(T,$,tt,et,Z);Lt.setMaterial(et,Dt);let Pt=tt.index,jt=1;if(et.wireframe===!0){if(Pt=w.getWireframeAttribute(tt),Pt===void 0)return;jt=2}const re=tt.drawRange,Kt=tt.attributes.position;let ye=re.start*jt,ze=(re.start+re.count)*jt;xt!==null&&(ye=Math.max(ye,xt.start*jt),ze=Math.min(ze,(xt.start+xt.count)*jt)),Pt!==null?(ye=Math.max(ye,0),ze=Math.min(ze,Pt.count)):Kt!=null&&(ye=Math.max(ye,0),ze=Math.min(ze,Kt.count));const Be=ze-ye;if(Be<0||Be===1/0)return;wt.setup(Z,et,Bt,tt,Pt);let Ne,we=At;if(Pt!==null&&(Ne=P.get(Pt),we=Zt,we.setIndex(Ne)),Z.isMesh)et.wireframe===!0?(Lt.setLineWidth(et.wireframeLinewidth*be()),we.setMode(D.LINES)):we.setMode(D.TRIANGLES);else if(Z.isLine){let Jt=et.linewidth;Jt===void 0&&(Jt=1),Lt.setLineWidth(Jt*be()),Z.isLineSegments?we.setMode(D.LINES):Z.isLineLoop?we.setMode(D.LINE_LOOP):we.setMode(D.LINE_STRIP)}else Z.isPoints?we.setMode(D.POINTS):Z.isSprite&&we.setMode(D.TRIANGLES);if(Z.isBatchedMesh)if(Z._multiDrawInstances!==null)Ur("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),we.renderMultiDrawInstances(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount,Z._multiDrawInstances);else if(Yt.get("WEBGL_multi_draw"))we.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const Jt=Z._multiDrawStarts,We=Z._multiDrawCounts,Ae=Z._multiDrawCount,gn=Pt?P.get(Pt).bytesPerElement:1,hi=pt.get(et).currentProgram.getUniforms();for(let fn=0;fn<Ae;fn++)hi.setValue(D,"_gl_DrawID",fn),we.render(Jt[fn]/gn,We[fn])}else if(Z.isInstancedMesh)we.renderInstances(ye,Be,Z.count);else if(tt.isInstancedBufferGeometry){const Jt=tt._maxInstanceCount!==void 0?tt._maxInstanceCount:1/0,We=Math.min(tt.instanceCount,Jt);we.renderInstances(ye,Be,We)}else we.render(ye,Be)};function Oe(T,$,tt){T.transparent===!0&&T.side===Fe&&T.forceSinglePass===!1?(T.side=En,T.needsUpdate=!0,xs(T,$,tt),T.side=Ei,T.needsUpdate=!0,xs(T,$,tt),T.side=Fe):xs(T,$,tt)}this.compile=function(T,$,tt=null){tt===null&&(tt=T),d=Ut.get(tt),d.init($),M.push(d),tt.traverseVisible(function(Z){Z.isLight&&Z.layers.test($.layers)&&(d.pushLight(Z),Z.castShadow&&d.pushShadow(Z))}),T!==tt&&T.traverseVisible(function(Z){Z.isLight&&Z.layers.test($.layers)&&(d.pushLight(Z),Z.castShadow&&d.pushShadow(Z))}),d.setupLights();const et=new Set;return T.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const xt=Z.material;if(xt)if(Array.isArray(xt))for(let Dt=0;Dt<xt.length;Dt++){const Bt=xt[Dt];Oe(Bt,tt,Z),et.add(Bt)}else Oe(xt,tt,Z),et.add(xt)}),d=M.pop(),et},this.compileAsync=function(T,$,tt=null){const et=this.compile(T,$,tt);return new Promise(Z=>{function xt(){if(et.forEach(function(Dt){pt.get(Dt).currentProgram.isReady()&&et.delete(Dt)}),et.size===0){Z(T);return}setTimeout(xt,10)}Yt.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let ve=null;function yn(T){ve&&ve(T)}function Pn(){Qn.stop()}function sr(){Qn.start()}const Qn=new Bu;Qn.setAnimationLoop(yn),typeof self<"u"&&Qn.setContext(self),this.setAnimationLoop=function(T){ve=T,vt.setAnimationLoop(T),T===null?Qn.stop():Qn.start()},vt.addEventListener("sessionstart",Pn),vt.addEventListener("sessionend",sr),this.render=function(T,$){if($!==void 0&&$.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),$.parent===null&&$.matrixWorldAutoUpdate===!0&&$.updateMatrixWorld(),vt.enabled===!0&&vt.isPresenting===!0&&(vt.cameraAutoUpdate===!0&&vt.updateCamera($),$=vt.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,$,A),d=Ut.get(T,M.length),d.init($),M.push(d),st.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),le.setFromProjectionMatrix(st,ri,$.reversedDepth),V=this.localClippingEnabled,ht=lt.init(this.clippingPlanes,V),x=rt.get(T,b.length),x.init(),b.push(x),vt.enabled===!0&&vt.isPresenting===!0){const xt=_.xr.getDepthSensingMesh();xt!==null&&rr(xt,$,-1/0,_.sortObjects)}rr(T,$,0,_.sortObjects),x.finish(),_.sortObjects===!0&&x.sort(ct,j),de=vt.enabled===!1||vt.isPresenting===!1||vt.hasDepthSensing()===!1,de&&Ct.addToRenderList(x,T),this.info.render.frame++,ht===!0&&lt.beginShadows();const tt=d.state.shadowsArray;bt.render(tt,T,$),ht===!0&&lt.endShadows(),this.info.autoReset===!0&&this.info.reset();const et=x.opaque,Z=x.transmissive;if(d.setupLights(),$.isArrayCamera){const xt=$.cameras;if(Z.length>0)for(let Dt=0,Bt=xt.length;Dt<Bt;Dt++){const Pt=xt[Dt];ji(et,Z,T,Pt)}de&&Ct.render(T);for(let Dt=0,Bt=xt.length;Dt<Bt;Dt++){const Pt=xt[Dt];or(x,T,Pt,Pt.viewport)}}else Z.length>0&&ji(et,Z,T,$),de&&Ct.render(T),or(x,T,$);A!==null&&E===0&&(yt.updateMultisampleRenderTarget(A),yt.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(_,T,$),wt.resetDefaultState(),S=-1,y=null,M.pop(),M.length>0?(d=M[M.length-1],ht===!0&&lt.setGlobalState(_.clippingPlanes,d.state.camera)):d=null,b.pop(),b.length>0?x=b[b.length-1]:x=null};function rr(T,$,tt,et){if(T.visible===!1)return;if(T.layers.test($.layers)){if(T.isGroup)tt=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update($);else if(T.isLight)d.pushLight(T),T.castShadow&&d.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||le.intersectsSprite(T)){et&&Gt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(st);const Dt=K.update(T),Bt=T.material;Bt.visible&&x.push(T,Dt,Bt,tt,Gt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||le.intersectsObject(T))){const Dt=K.update(T),Bt=T.material;if(et&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Gt.copy(T.boundingSphere.center)):(Dt.boundingSphere===null&&Dt.computeBoundingSphere(),Gt.copy(Dt.boundingSphere.center)),Gt.applyMatrix4(T.matrixWorld).applyMatrix4(st)),Array.isArray(Bt)){const Pt=Dt.groups;for(let jt=0,re=Pt.length;jt<re;jt++){const Kt=Pt[jt],ye=Bt[Kt.materialIndex];ye&&ye.visible&&x.push(T,Dt,ye,tt,Gt.z,Kt)}}else Bt.visible&&x.push(T,Dt,Bt,tt,Gt.z,null)}}const xt=T.children;for(let Dt=0,Bt=xt.length;Dt<Bt;Dt++)rr(xt[Dt],$,tt,et)}function or(T,$,tt,et){const Z=T.opaque,xt=T.transmissive,Dt=T.transparent;d.setupLightsView(tt),ht===!0&&lt.setGlobalState(_.clippingPlanes,tt),et&&Lt.viewport(U.copy(et)),Z.length>0&&gs(Z,$,tt),xt.length>0&&gs(xt,$,tt),Dt.length>0&&gs(Dt,$,tt),Lt.buffers.depth.setTest(!0),Lt.buffers.depth.setMask(!0),Lt.buffers.color.setMask(!0),Lt.setPolygonOffset(!1)}function ji(T,$,tt,et){if((tt.isScene===!0?tt.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[et.id]===void 0&&(d.state.transmissionRenderTarget[et.id]=new Yi(1,1,{generateMipmaps:!0,type:Yt.has("EXT_color_buffer_half_float")||Yt.has("EXT_color_buffer_float")?Fr:oi,minFilter:Vi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ue.workingColorSpace}));const xt=d.state.transmissionRenderTarget[et.id],Dt=et.viewport||U;xt.setSize(Dt.z*_.transmissionResolutionScale,Dt.w*_.transmissionResolutionScale);const Bt=_.getRenderTarget(),Pt=_.getActiveCubeFace(),jt=_.getActiveMipmapLevel();_.setRenderTarget(xt),_.getClearColor(J),B=_.getClearAlpha(),B<1&&_.setClearColor(16777215,.5),_.clear(),de&&Ct.render(tt);const re=_.toneMapping;_.toneMapping=Xi;const Kt=et.viewport;if(et.viewport!==void 0&&(et.viewport=void 0),d.setupLightsView(et),ht===!0&&lt.setGlobalState(_.clippingPlanes,et),gs(T,tt,et),yt.updateMultisampleRenderTarget(xt),yt.updateRenderTargetMipmap(xt),Yt.has("WEBGL_multisampled_render_to_texture")===!1){let ye=!1;for(let ze=0,Be=$.length;ze<Be;ze++){const Ne=$[ze],we=Ne.object,Jt=Ne.geometry,We=Ne.material,Ae=Ne.group;if(We.side===Fe&&we.layers.test(et.layers)){const gn=We.side;We.side=En,We.needsUpdate=!0,Ri(we,tt,et,Jt,We,Ae),We.side=gn,We.needsUpdate=!0,ye=!0}}ye===!0&&(yt.updateMultisampleRenderTarget(xt),yt.updateRenderTargetMipmap(xt))}_.setRenderTarget(Bt,Pt,jt),_.setClearColor(J,B),Kt!==void 0&&(et.viewport=Kt),_.toneMapping=re}function gs(T,$,tt){const et=$.isScene===!0?$.overrideMaterial:null;for(let Z=0,xt=T.length;Z<xt;Z++){const Dt=T[Z],Bt=Dt.object,Pt=Dt.geometry,jt=Dt.group;let re=Dt.material;re.allowOverride===!0&&et!==null&&(re=et),Bt.layers.test(tt.layers)&&Ri(Bt,$,tt,Pt,re,jt)}}function Ri(T,$,tt,et,Z,xt){T.onBeforeRender(_,$,tt,et,Z,xt),T.modelViewMatrix.multiplyMatrices(tt.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),Z.onBeforeRender(_,$,tt,et,T,xt),Z.transparent===!0&&Z.side===Fe&&Z.forceSinglePass===!1?(Z.side=En,Z.needsUpdate=!0,_.renderBufferDirect(tt,$,et,Z,T,xt),Z.side=Ei,Z.needsUpdate=!0,_.renderBufferDirect(tt,$,et,Z,T,xt),Z.side=Fe):_.renderBufferDirect(tt,$,et,Z,T,xt),T.onAfterRender(_,$,tt,et,Z,xt)}function xs(T,$,tt){$.isScene!==!0&&($=Nt);const et=pt.get(T),Z=d.state.lights,xt=d.state.shadowsArray,Dt=Z.state.version,Bt=ot.getParameters(T,Z.state,xt,$,tt),Pt=ot.getProgramCacheKey(Bt);let jt=et.programs;et.environment=T.isMeshStandardMaterial?$.environment:null,et.fog=$.fog,et.envMap=(T.isMeshStandardMaterial?Pe:ae).get(T.envMap||et.environment),et.envMapRotation=et.environment!==null&&T.envMap===null?$.environmentRotation:T.envMapRotation,jt===void 0&&(T.addEventListener("dispose",ut),jt=new Map,et.programs=jt);let re=jt.get(Pt);if(re!==void 0){if(et.currentProgram===re&&et.lightsStateVersion===Dt)return vs(T,Bt),re}else Bt.uniforms=ot.getUniforms(T),T.onBeforeCompile(Bt,_),re=ot.acquireProgram(Bt,Pt),jt.set(Pt,re),et.uniforms=Bt.uniforms;const Kt=et.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Kt.clippingPlanes=lt.uniform),vs(T,Bt),et.needsLights=Hr(T),et.lightsStateVersion=Dt,et.needsLights&&(Kt.ambientLightColor.value=Z.state.ambient,Kt.lightProbe.value=Z.state.probe,Kt.directionalLights.value=Z.state.directional,Kt.directionalLightShadows.value=Z.state.directionalShadow,Kt.spotLights.value=Z.state.spot,Kt.spotLightShadows.value=Z.state.spotShadow,Kt.rectAreaLights.value=Z.state.rectArea,Kt.ltc_1.value=Z.state.rectAreaLTC1,Kt.ltc_2.value=Z.state.rectAreaLTC2,Kt.pointLights.value=Z.state.point,Kt.pointLightShadows.value=Z.state.pointShadow,Kt.hemisphereLights.value=Z.state.hemi,Kt.directionalShadowMap.value=Z.state.directionalShadowMap,Kt.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Kt.spotShadowMap.value=Z.state.spotShadowMap,Kt.spotLightMatrix.value=Z.state.spotLightMatrix,Kt.spotLightMap.value=Z.state.spotLightMap,Kt.pointShadowMap.value=Z.state.pointShadowMap,Kt.pointShadowMatrix.value=Z.state.pointShadowMatrix),et.currentProgram=re,et.uniformsList=null,re}function ti(T){if(T.uniformsList===null){const $=T.currentProgram.getUniforms();T.uniformsList=Io.seqWithValue($.seq,T.uniforms)}return T.uniformsList}function vs(T,$){const tt=pt.get(T);tt.outputColorSpace=$.outputColorSpace,tt.batching=$.batching,tt.batchingColor=$.batchingColor,tt.instancing=$.instancing,tt.instancingColor=$.instancingColor,tt.instancingMorph=$.instancingMorph,tt.skinning=$.skinning,tt.morphTargets=$.morphTargets,tt.morphNormals=$.morphNormals,tt.morphColors=$.morphColors,tt.morphTargetsCount=$.morphTargetsCount,tt.numClippingPlanes=$.numClippingPlanes,tt.numIntersection=$.numClipIntersection,tt.vertexAlphas=$.vertexAlphas,tt.vertexTangents=$.vertexTangents,tt.toneMapping=$.toneMapping}function jo(T,$,tt,et,Z){$.isScene!==!0&&($=Nt),yt.resetTextureUnits();const xt=$.fog,Dt=et.isMeshStandardMaterial?$.environment:null,Bt=A===null?_.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Ks,Pt=(et.isMeshStandardMaterial?Pe:ae).get(et.envMap||Dt),jt=et.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,re=!!tt.attributes.tangent&&(!!et.normalMap||et.anisotropy>0),Kt=!!tt.morphAttributes.position,ye=!!tt.morphAttributes.normal,ze=!!tt.morphAttributes.color;let Be=Xi;et.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Be=_.toneMapping);const Ne=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,we=Ne!==void 0?Ne.length:0,Jt=pt.get(et),We=d.state.lights;if(ht===!0&&(V===!0||T!==y)){const hn=T===y&&et.id===S;lt.setState(et,T,hn)}let Ae=!1;et.version===Jt.__version?(Jt.needsLights&&Jt.lightsStateVersion!==We.state.version||Jt.outputColorSpace!==Bt||Z.isBatchedMesh&&Jt.batching===!1||!Z.isBatchedMesh&&Jt.batching===!0||Z.isBatchedMesh&&Jt.batchingColor===!0&&Z.colorTexture===null||Z.isBatchedMesh&&Jt.batchingColor===!1&&Z.colorTexture!==null||Z.isInstancedMesh&&Jt.instancing===!1||!Z.isInstancedMesh&&Jt.instancing===!0||Z.isSkinnedMesh&&Jt.skinning===!1||!Z.isSkinnedMesh&&Jt.skinning===!0||Z.isInstancedMesh&&Jt.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Jt.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Jt.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Jt.instancingMorph===!1&&Z.morphTexture!==null||Jt.envMap!==Pt||et.fog===!0&&Jt.fog!==xt||Jt.numClippingPlanes!==void 0&&(Jt.numClippingPlanes!==lt.numPlanes||Jt.numIntersection!==lt.numIntersection)||Jt.vertexAlphas!==jt||Jt.vertexTangents!==re||Jt.morphTargets!==Kt||Jt.morphNormals!==ye||Jt.morphColors!==ze||Jt.toneMapping!==Be||Jt.morphTargetsCount!==we)&&(Ae=!0):(Ae=!0,Jt.__version=et.version);let gn=Jt.currentProgram;Ae===!0&&(gn=xs(et,$,Z));let hi=!1,fn=!1,Ji=!1;const Xe=gn.getUniforms(),Qe=Jt.uniforms;if(Lt.useProgram(gn.program)&&(hi=!0,fn=!0,Ji=!0),et.id!==S&&(S=et.id,fn=!0),hi||y!==T){Lt.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Xe.setValue(D,"projectionMatrix",T.projectionMatrix),Xe.setValue(D,"viewMatrix",T.matrixWorldInverse);const pn=Xe.map.cameraPosition;pn!==void 0&&pn.setValue(D,_t.setFromMatrixPosition(T.matrixWorld)),Wt.logarithmicDepthBuffer&&Xe.setValue(D,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(et.isMeshPhongMaterial||et.isMeshToonMaterial||et.isMeshLambertMaterial||et.isMeshBasicMaterial||et.isMeshStandardMaterial||et.isShaderMaterial)&&Xe.setValue(D,"isOrthographic",T.isOrthographicCamera===!0),y!==T&&(y=T,fn=!0,Ji=!0)}if(Z.isSkinnedMesh){Xe.setOptional(D,Z,"bindMatrix"),Xe.setOptional(D,Z,"bindMatrixInverse");const hn=Z.skeleton;hn&&(hn.boneTexture===null&&hn.computeBoneTexture(),Xe.setValue(D,"boneTexture",hn.boneTexture,yt))}Z.isBatchedMesh&&(Xe.setOptional(D,Z,"batchingTexture"),Xe.setValue(D,"batchingTexture",Z._matricesTexture,yt),Xe.setOptional(D,Z,"batchingIdTexture"),Xe.setValue(D,"batchingIdTexture",Z._indirectTexture,yt),Xe.setOptional(D,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Xe.setValue(D,"batchingColorTexture",Z._colorsTexture,yt));const sn=tt.morphAttributes;if((sn.position!==void 0||sn.normal!==void 0||sn.color!==void 0)&&mt.update(Z,tt,gn),(fn||Jt.receiveShadow!==Z.receiveShadow)&&(Jt.receiveShadow=Z.receiveShadow,Xe.setValue(D,"receiveShadow",Z.receiveShadow)),et.isMeshGouraudMaterial&&et.envMap!==null&&(Qe.envMap.value=Pt,Qe.flipEnvMap.value=Pt.isCubeTexture&&Pt.isRenderTargetTexture===!1?-1:1),et.isMeshStandardMaterial&&et.envMap===null&&$.environment!==null&&(Qe.envMapIntensity.value=$.environmentIntensity),fn&&(Xe.setValue(D,"toneMappingExposure",_.toneMappingExposure),Jt.needsLights&&Ci(Qe,Ji),xt&&et.fog===!0&&at.refreshFogUniforms(Qe,xt),at.refreshMaterialUniforms(Qe,et,Y,Q,d.state.transmissionRenderTarget[T.id]),Io.upload(D,ti(Jt),Qe,yt)),et.isShaderMaterial&&et.uniformsNeedUpdate===!0&&(Io.upload(D,ti(Jt),Qe,yt),et.uniformsNeedUpdate=!1),et.isSpriteMaterial&&Xe.setValue(D,"center",Z.center),Xe.setValue(D,"modelViewMatrix",Z.modelViewMatrix),Xe.setValue(D,"normalMatrix",Z.normalMatrix),Xe.setValue(D,"modelMatrix",Z.matrixWorld),et.isShaderMaterial||et.isRawShaderMaterial){const hn=et.uniformsGroups;for(let pn=0,Pi=hn.length;pn<Pi;pn++){const ei=hn[pn];he.update(ei,gn),he.bind(ei,gn)}}return gn}function Ci(T,$){T.ambientLightColor.needsUpdate=$,T.lightProbe.needsUpdate=$,T.directionalLights.needsUpdate=$,T.directionalLightShadows.needsUpdate=$,T.pointLights.needsUpdate=$,T.pointLightShadows.needsUpdate=$,T.spotLights.needsUpdate=$,T.spotLightShadows.needsUpdate=$,T.rectAreaLights.needsUpdate=$,T.hemisphereLights.needsUpdate=$}function Hr(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,$,tt){const et=pt.get(T);et.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,et.__autoAllocateDepthBuffer===!1&&(et.__useRenderToTexture=!1),pt.get(T.texture).__webglTexture=$,pt.get(T.depthTexture).__webglTexture=et.__autoAllocateDepthBuffer?void 0:tt,et.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,$){const tt=pt.get(T);tt.__webglFramebuffer=$,tt.__useDefaultFramebuffer=$===void 0};const Ki=D.createFramebuffer();this.setRenderTarget=function(T,$=0,tt=0){A=T,R=$,E=tt;let et=!0,Z=null,xt=!1,Dt=!1;if(T){const Pt=pt.get(T);if(Pt.__useDefaultFramebuffer!==void 0)Lt.bindFramebuffer(D.FRAMEBUFFER,null),et=!1;else if(Pt.__webglFramebuffer===void 0)yt.setupRenderTarget(T);else if(Pt.__hasExternalTextures)yt.rebindTextures(T,pt.get(T.texture).__webglTexture,pt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Kt=T.depthTexture;if(Pt.__boundDepthTexture!==Kt){if(Kt!==null&&pt.has(Kt)&&(T.width!==Kt.image.width||T.height!==Kt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");yt.setupDepthRenderbuffer(T)}}const jt=T.texture;(jt.isData3DTexture||jt.isDataArrayTexture||jt.isCompressedArrayTexture)&&(Dt=!0);const re=pt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(re[$])?Z=re[$][tt]:Z=re[$],xt=!0):T.samples>0&&yt.useMultisampledRTT(T)===!1?Z=pt.get(T).__webglMultisampledFramebuffer:Array.isArray(re)?Z=re[tt]:Z=re,U.copy(T.viewport),N.copy(T.scissor),X=T.scissorTest}else U.copy(Mt).multiplyScalar(Y).floor(),N.copy($t).multiplyScalar(Y).floor(),X=Ee;if(tt!==0&&(Z=Ki),Lt.bindFramebuffer(D.FRAMEBUFFER,Z)&&et&&Lt.drawBuffers(T,Z),Lt.viewport(U),Lt.scissor(N),Lt.setScissorTest(X),xt){const Pt=pt.get(T.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+$,Pt.__webglTexture,tt)}else if(Dt){const Pt=$;for(let jt=0;jt<T.textures.length;jt++){const re=pt.get(T.textures[jt]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+jt,re.__webglTexture,tt,Pt)}}else if(T!==null&&tt!==0){const Pt=pt.get(T.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Pt.__webglTexture,tt)}S=-1},this.readRenderTargetPixels=function(T,$,tt,et,Z,xt,Dt,Bt=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=pt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Dt!==void 0&&(Pt=Pt[Dt]),Pt){Lt.bindFramebuffer(D.FRAMEBUFFER,Pt);try{const jt=T.textures[Bt],re=jt.format,Kt=jt.type;if(!Wt.textureFormatReadable(re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Wt.textureTypeReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}$>=0&&$<=T.width-et&&tt>=0&&tt<=T.height-Z&&(T.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Bt),D.readPixels($,tt,et,Z,kt.convert(re),kt.convert(Kt),xt))}finally{const jt=A!==null?pt.get(A).__webglFramebuffer:null;Lt.bindFramebuffer(D.FRAMEBUFFER,jt)}}},this.readRenderTargetPixelsAsync=async function(T,$,tt,et,Z,xt,Dt,Bt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=pt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Dt!==void 0&&(Pt=Pt[Dt]),Pt)if($>=0&&$<=T.width-et&&tt>=0&&tt<=T.height-Z){Lt.bindFramebuffer(D.FRAMEBUFFER,Pt);const jt=T.textures[Bt],re=jt.format,Kt=jt.type;if(!Wt.textureFormatReadable(re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Wt.textureTypeReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ye=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,ye),D.bufferData(D.PIXEL_PACK_BUFFER,xt.byteLength,D.STREAM_READ),T.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Bt),D.readPixels($,tt,et,Z,kt.convert(re),kt.convert(Kt),0);const ze=A!==null?pt.get(A).__webglFramebuffer:null;Lt.bindFramebuffer(D.FRAMEBUFFER,ze);const Be=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await bf(D,Be,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,ye),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,xt),D.deleteBuffer(ye),D.deleteSync(Be),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,$=null,tt=0){const et=Math.pow(2,-tt),Z=Math.floor(T.image.width*et),xt=Math.floor(T.image.height*et),Dt=$!==null?$.x:0,Bt=$!==null?$.y:0;yt.setTexture2D(T,0),D.copyTexSubImage2D(D.TEXTURE_2D,tt,0,0,Dt,Bt,Z,xt),Lt.unbindTexture()};const ar=D.createFramebuffer(),_s=D.createFramebuffer();this.copyTextureToTexture=function(T,$,tt=null,et=null,Z=0,xt=null){xt===null&&(Z!==0?(Ur("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),xt=Z,Z=0):xt=0);let Dt,Bt,Pt,jt,re,Kt,ye,ze,Be;const Ne=T.isCompressedTexture?T.mipmaps[xt]:T.image;if(tt!==null)Dt=tt.max.x-tt.min.x,Bt=tt.max.y-tt.min.y,Pt=tt.isBox3?tt.max.z-tt.min.z:1,jt=tt.min.x,re=tt.min.y,Kt=tt.isBox3?tt.min.z:0;else{const sn=Math.pow(2,-Z);Dt=Math.floor(Ne.width*sn),Bt=Math.floor(Ne.height*sn),T.isDataArrayTexture?Pt=Ne.depth:T.isData3DTexture?Pt=Math.floor(Ne.depth*sn):Pt=1,jt=0,re=0,Kt=0}et!==null?(ye=et.x,ze=et.y,Be=et.z):(ye=0,ze=0,Be=0);const we=kt.convert($.format),Jt=kt.convert($.type);let We;$.isData3DTexture?(yt.setTexture3D($,0),We=D.TEXTURE_3D):$.isDataArrayTexture||$.isCompressedArrayTexture?(yt.setTexture2DArray($,0),We=D.TEXTURE_2D_ARRAY):(yt.setTexture2D($,0),We=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,$.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,$.unpackAlignment);const Ae=D.getParameter(D.UNPACK_ROW_LENGTH),gn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),hi=D.getParameter(D.UNPACK_SKIP_PIXELS),fn=D.getParameter(D.UNPACK_SKIP_ROWS),Ji=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ne.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ne.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,jt),D.pixelStorei(D.UNPACK_SKIP_ROWS,re),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Kt);const Xe=T.isDataArrayTexture||T.isData3DTexture,Qe=$.isDataArrayTexture||$.isData3DTexture;if(T.isDepthTexture){const sn=pt.get(T),hn=pt.get($),pn=pt.get(sn.__renderTarget),Pi=pt.get(hn.__renderTarget);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,pn.__webglFramebuffer),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Pi.__webglFramebuffer);for(let ei=0;ei<Pt;ei++)Xe&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,pt.get(T).__webglTexture,Z,Kt+ei),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,pt.get($).__webglTexture,xt,Be+ei)),D.blitFramebuffer(jt,re,Dt,Bt,ye,ze,Dt,Bt,D.DEPTH_BUFFER_BIT,D.NEAREST);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(Z!==0||T.isRenderTargetTexture||pt.has(T)){const sn=pt.get(T),hn=pt.get($);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,ar),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,_s);for(let pn=0;pn<Pt;pn++)Xe?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,sn.__webglTexture,Z,Kt+pn):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,sn.__webglTexture,Z),Qe?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,hn.__webglTexture,xt,Be+pn):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,hn.__webglTexture,xt),Z!==0?D.blitFramebuffer(jt,re,Dt,Bt,ye,ze,Dt,Bt,D.COLOR_BUFFER_BIT,D.NEAREST):Qe?D.copyTexSubImage3D(We,xt,ye,ze,Be+pn,jt,re,Dt,Bt):D.copyTexSubImage2D(We,xt,ye,ze,jt,re,Dt,Bt);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Qe?T.isDataTexture||T.isData3DTexture?D.texSubImage3D(We,xt,ye,ze,Be,Dt,Bt,Pt,we,Jt,Ne.data):$.isCompressedArrayTexture?D.compressedTexSubImage3D(We,xt,ye,ze,Be,Dt,Bt,Pt,we,Ne.data):D.texSubImage3D(We,xt,ye,ze,Be,Dt,Bt,Pt,we,Jt,Ne):T.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,xt,ye,ze,Dt,Bt,we,Jt,Ne.data):T.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,xt,ye,ze,Ne.width,Ne.height,we,Ne.data):D.texSubImage2D(D.TEXTURE_2D,xt,ye,ze,Dt,Bt,we,Jt,Ne);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ae),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,gn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,hi),D.pixelStorei(D.UNPACK_SKIP_ROWS,fn),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ji),xt===0&&$.generateMipmaps&&D.generateMipmap(We),Lt.unbindTexture()},this.initRenderTarget=function(T){pt.get(T).__webglFramebuffer===void 0&&yt.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?yt.setTextureCube(T,0):T.isData3DTexture?yt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?yt.setTexture2DArray(T,0):yt.setTexture2D(T,0),Lt.unbindTexture()},this.resetState=function(){R=0,E=0,A=null,Lt.reset(),wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Ue._getDrawingBufferColorSpace(t),e.unpackColorSpace=Ue._getUnpackColorSpace()}}class uv extends ne{constructor(t,e={}){super(t),this.isWater=!0;const n=this,s=e.textureWidth!==void 0?e.textureWidth:512,r=e.textureHeight!==void 0?e.textureHeight:512,o=e.clipBias!==void 0?e.clipBias:0,a=e.alpha!==void 0?e.alpha:1,l=e.time!==void 0?e.time:0,c=e.waterNormals!==void 0?e.waterNormals:null,h=e.sunDirection!==void 0?e.sunDirection:new L(.70707,.70707,0),u=new Qt(e.sunColor!==void 0?e.sunColor:16777215),p=new Qt(e.waterColor!==void 0?e.waterColor:8355711),f=e.eye!==void 0?e.eye:new L(0,0,0),m=e.distortionScale!==void 0?e.distortionScale:20,g=e.side!==void 0?e.side:Ei,x=e.fog!==void 0?e.fog:!1,d=new $n,b=new L,M=new L,_=new L,C=new ce,R=new L(0,0,-1),E=new Ie,A=new L,S=new L,y=new Ie,U=new ce,N=new Rn,X=new Yi(s,r),J={name:"MirrorShader",uniforms:No.merge([Rt.fog,Rt.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new ce},sunColor:{value:new Qt(8355711)},sunDirection:{value:new L(.70707,.70707,0)},eye:{value:new L},waterColor:{value:new Qt(5592405)}}]),vertexShader:`
				uniform mat4 textureMatrix;
				uniform float time;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				#include <common>
				#include <fog_pars_vertex>
				#include <shadowmap_pars_vertex>
				#include <logdepthbuf_pars_vertex>

				void main() {
					mirrorCoord = modelMatrix * vec4( position, 1.0 );
					worldPosition = mirrorCoord.xyzw;
					mirrorCoord = textureMatrix * mirrorCoord;
					vec4 mvPosition =  modelViewMatrix * vec4( position, 1.0 );
					gl_Position = projectionMatrix * mvPosition;

				#include <beginnormal_vertex>
				#include <defaultnormal_vertex>
				#include <logdepthbuf_vertex>
				#include <fog_vertex>
				#include <shadowmap_vertex>
			}`,fragmentShader:`
				uniform sampler2D mirrorSampler;
				uniform float alpha;
				uniform float time;
				uniform float size;
				uniform float distortionScale;
				uniform sampler2D normalSampler;
				uniform vec3 sunColor;
				uniform vec3 sunDirection;
				uniform vec3 eye;
				uniform vec3 waterColor;

				varying vec4 mirrorCoord;
				varying vec4 worldPosition;

				vec4 getNoise( vec2 uv ) {
					vec2 uv0 = ( uv / 103.0 ) + vec2(time / 17.0, time / 29.0);
					vec2 uv1 = uv / 107.0-vec2( time / -19.0, time / 31.0 );
					vec2 uv2 = uv / vec2( 8907.0, 9803.0 ) + vec2( time / 101.0, time / 97.0 );
					vec2 uv3 = uv / vec2( 1091.0, 1027.0 ) - vec2( time / 109.0, time / -113.0 );
					vec4 noise = texture2D( normalSampler, uv0 ) +
						texture2D( normalSampler, uv1 ) +
						texture2D( normalSampler, uv2 ) +
						texture2D( normalSampler, uv3 );
					return noise * 0.5 - 1.0;
				}

				void sunLight( const vec3 surfaceNormal, const vec3 eyeDirection, float shiny, float spec, float diffuse, inout vec3 diffuseColor, inout vec3 specularColor ) {
					vec3 reflection = normalize( reflect( -sunDirection, surfaceNormal ) );
					float direction = max( 0.0, dot( eyeDirection, reflection ) );
					specularColor += pow( direction, shiny ) * sunColor * spec;
					diffuseColor += max( dot( sunDirection, surfaceNormal ), 0.0 ) * sunColor * diffuse;
				}

				#include <common>
				#include <packing>
				#include <bsdfs>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <lights_pars_begin>
				#include <shadowmap_pars_fragment>
				#include <shadowmask_pars_fragment>

				void main() {

					#include <logdepthbuf_fragment>
					vec4 noise = getNoise( worldPosition.xz * size );
					vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );

					vec3 diffuseLight = vec3(0.0);
					vec3 specularLight = vec3(0.0);

					vec3 worldToEye = eye-worldPosition.xyz;
					vec3 eyeDirection = normalize( worldToEye );
					sunLight( surfaceNormal, eyeDirection, 100.0, 2.0, 0.5, diffuseLight, specularLight );

					float distance = length(worldToEye);

					vec2 distortion = surfaceNormal.xz * ( 0.001 + 1.0 / distance ) * distortionScale;
					vec3 reflectionSample = vec3( texture2D( mirrorSampler, mirrorCoord.xy / mirrorCoord.w + distortion ) );

					float theta = max( dot( eyeDirection, surfaceNormal ), 0.0 );
					float rf0 = 0.3;
					float reflectance = rf0 + ( 1.0 - rf0 ) * pow( ( 1.0 - theta ), 5.0 );
					vec3 scatter = max( 0.0, dot( surfaceNormal, eyeDirection ) ) * waterColor;
					vec3 albedo = mix( ( sunColor * diffuseLight * 0.3 + scatter ) * getShadowMask(), ( vec3( 0.1 ) + reflectionSample * 0.9 + reflectionSample * specularLight ), reflectance);
					vec3 outgoingLight = albedo;
					gl_FragColor = vec4( outgoingLight, alpha );

					#include <tonemapping_fragment>
					#include <colorspace_fragment>
					#include <fog_fragment>	
				}`},B=new Bn({name:J.name,uniforms:No.clone(J.uniforms),vertexShader:J.vertexShader,fragmentShader:J.fragmentShader,lights:!0,side:g,fog:x});B.uniforms.mirrorSampler.value=X.texture,B.uniforms.textureMatrix.value=U,B.uniforms.alpha.value=a,B.uniforms.time.value=l,B.uniforms.normalSampler.value=c,B.uniforms.sunColor.value=u,B.uniforms.waterColor.value=p,B.uniforms.sunDirection.value=h,B.uniforms.distortionScale.value=m,B.uniforms.eye.value=f,n.material=B,n.onBeforeRender=function(W,Q,Y){if(M.setFromMatrixPosition(n.matrixWorld),_.setFromMatrixPosition(Y.matrixWorld),C.extractRotation(n.matrixWorld),b.set(0,0,1),b.applyMatrix4(C),A.subVectors(M,_),A.dot(b)>0)return;A.reflect(b).negate(),A.add(M),C.extractRotation(Y.matrixWorld),R.set(0,0,-1),R.applyMatrix4(C),R.add(_),S.subVectors(M,R),S.reflect(b).negate(),S.add(M),N.position.copy(A),N.up.set(0,1,0),N.up.applyMatrix4(C),N.up.reflect(b),N.lookAt(S),N.far=Y.far,N.updateMatrixWorld(),N.projectionMatrix.copy(Y.projectionMatrix),U.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),U.multiply(N.projectionMatrix),U.multiply(N.matrixWorldInverse),d.setFromNormalAndCoplanarPoint(b,M),d.applyMatrix4(N.matrixWorldInverse),E.set(d.normal.x,d.normal.y,d.normal.z,d.constant);const ct=N.projectionMatrix;y.x=(Math.sign(E.x)+ct.elements[8])/ct.elements[0],y.y=(Math.sign(E.y)+ct.elements[9])/ct.elements[5],y.z=-1,y.w=(1+ct.elements[10])/ct.elements[14],E.multiplyScalar(2/E.dot(y)),ct.elements[2]=E.x,ct.elements[6]=E.y,ct.elements[10]=E.z+1-o,ct.elements[14]=E.w,f.setFromMatrixPosition(Y.matrixWorld);const j=W.getRenderTarget(),Mt=W.xr.enabled,$t=W.shadowMap.autoUpdate;n.visible=!1,W.xr.enabled=!1,W.shadowMap.autoUpdate=!1,W.setRenderTarget(X),W.state.buffers.depth.setMask(!0),W.autoClear===!1&&W.clear(),W.render(Q,N),n.visible=!0,W.xr.enabled=Mt,W.shadowMap.autoUpdate=$t,W.setRenderTarget(j);const Ee=Y.viewport;Ee!==void 0&&W.state.viewport(Ee)}}}function _c(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new Te;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let p=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),p++}if(p!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const u=[];for(let p=0;p<i.length;++p){const f=i[p].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=i[p].attributes.position.count}l.setIndex(u)}for(const h in r){const u=jh(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let p=0;p<u;++p){const f=[];for(let g=0;g<o[h].length;++g)f.push(o[h][g][p]);const m=jh(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function jh(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new an(o,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let p=0,f=h.count;p<f;p++)for(let m=0;m<e;m++){const g=h.getComponent(p,m);a.setComponent(p+u,m,g)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const ge=1.8,dv=2,fv=110*ge,pv=108*ge,ee=3,Vs=ee/2.15,ds=12.3*Vs,os=ds+6,mv=ds+8,yo=17,gv=Vs,kn=i=>Object.freeze(Object.fromEntries(Object.entries(i).map(([t,e])=>[t,t==="yaw"?e:e*gv])));Object.freeze({store:kn({width:4.4,depth:3.6}),nursery:kn({width:5.8,depth:5.9}),watchtower:kn({width:4.8,depth:4}),training:kn({width:5.7,depth:4.8}),palisade:kn({width:7,depth:1})});kn({x:-1.1825,z:-1.0664,yaw:0,width:7.68,depth:8.25});const xv=kn({x:-6.45,z:.43,yaw:-.5,width:4.8,depth:5.2});Object.freeze({store:kn({x:-6.0962,z:4.9054,yaw:0}),nursery:kn({x:6.5601,z:-3.869,yaw:0}),watchtower:kn({x:6.6295,z:5.3482,yaw:0}),training:kn({x:-6.2831,z:-6.0974,yaw:0}),palisade:kn({x:0,z:9.8,yaw:0})});const vv=ds-.15,_v=6.8,Oo=3.8,Mv=.9,Kh=(i,t)=>Number.isFinite(i)?i:t,yv=i=>i?.natural===!0||i?.mesh?.userData?.natural===!0,Sv=Array.from({length:5},(i,t)=>Object.freeze({stage:t,unfinished:t<4,wallHeight:t===0?0:t===1?Oo*.35:Oo,keep:t>=3,gate:t===4})),bv=Object.freeze({stage:4,unfinished:!1,wallHeight:0,keep:!1,gate:!1});function Jh(i){if(yv(i))return bv;const t=i.mesh?.userData?.visualState,e=i.underConstruction??t?.underConstruction??!1,n=e?Math.max(0,Math.min(1,Kh(i.constructionProgress,Kh(t?.constructionProgress,0)))):1,s=e?Math.min(3,Math.floor(n*4)):4;return Sv[s]}const ls=(i,t=0)=>Number.isFinite(i)?i:t,Bo=(i,t,e)=>Math.max(t,Math.min(e,i)),Ws=1e-6,wv=i=>i&&i.active!==!1;function Ev(i,t){const e=Math.cos(i.yaw||0),n=Math.sin(i.yaw||0),s=t.x-i.x,r=t.z-i.z;return{x:e*s-n*r,y:t.y,z:n*s+e*r}}function So(i,t){const e=Math.cos(i.yaw||0),n=Math.sin(i.yaw||0);return{x:i.x+e*t.x+n*t.z,y:ls(t.y,i.floorY),z:i.z-n*t.x+e*t.z}}const Xu=(i,t,e=0)=>i.x>t.minX+e-Ws&&i.x<t.maxX-e+Ws&&i.z>t.minZ+e-Ws&&i.z<t.maxZ-e+Ws,xi=(i,t,e,n,s,r,o)=>({id:i,minX:t,maxX:e,minZ:n,maxZ:s,minY:r,maxY:o});function Qh(i,t,e=0){return t.outline?t.outline.every((s,r)=>{const o=t.outline[(r+1)%t.outline.length],a=o.x-s.x,l=o.z-s.z;return a*(i.z-s.z)-l*(i.x-s.x)>=Math.max(0,e)*Math.hypot(a,l)-Ws})||e<0&&t.outline.some((s,r)=>Tv(i,s,t.outline[(r+1)%t.outline.length])<e*e-Ws):Xu(i,t,e)}function Tv(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=Bo(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1),0,1);return(i.x-t.x-n*r)**2+(i.z-t.z-s*r)**2}function Av(i,t){return i.outline=t.map(([e,n])=>({x:e,z:n})),i.minX=Math.min(...t.map(e=>e[0])),i.maxX=Math.max(...t.map(e=>e[0])),i.minZ=Math.min(...t.map(e=>e[1])),i.maxZ=Math.max(...t.map(e=>e[1])),i}function Rv(i,{terrainHeight:t,minimumFloorY:e=.82}={}){const n=t||(()=>0),s={id:i.id,x:ls(i.x),z:ls(i.z),yaw:ls(i.yaw,Math.atan2(-i.x,-i.z)),team:i.team||"neutral",active:!0};let r=-1/0,o=1/0;for(let m=-3.75;m<=3.76;m+=1.25)for(let g=-3.25;g<=4.26;g+=1.25){const x=So(s,{x:m,z:g,y:0}),d=ls(n(x.x,x.z));r=Math.max(r,d),o=Math.min(o,d)}s.floorY=Math.max(e,r+.045),s.floorBottom=Math.min(o-.16,s.floorY-.22),s.roofBottom=s.floorY+2.25,s.roofTop=s.floorY+3.05,s.interior={minX:-3.1,maxX:3.1,minZ:-2.6,maxZ:.45},s.floor={minX:-3.75,maxX:3.75,minZ:-3.25,maxZ:4.1},s.entrance={x:1.55,z:4,minX:.3,maxX:2.8,minZ:3.35,maxZ:4,width:2.5,height:1.95},s.solids=[xi("floor",-3.75,3.75,-3.25,4.1,s.floorBottom,s.floorY),xi("left-wall",-3.75,-3.1,-3.25,4,s.floorY,s.roofBottom),xi("right-wall",3.1,3.75,-3.25,4,s.floorY,s.roofBottom),xi("back-wall",-3.75,3.75,-3.25,-2.6,s.floorY,s.roofBottom),xi("front-left",-3.75,.3,3.35,4,s.floorY,s.roofBottom),xi("front-right",2.8,3.75,3.35,4,s.floorY,s.roofBottom),xi("entrance-lintel",.3,2.8,3.35,4,s.floorY+1.95,s.roofBottom),xi("root-baffle",-.35,3.1,.45,1.05,s.floorY,s.roofBottom),xi("roof",-3.75,3.75,-3.25,4,s.roofBottom,s.roofTop)];const l={floor:[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.2],[-3.15,4.2],[-4.12,3.4]],roof:[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.22],[-3.15,4.45],[-4.12,3.4]],"left-wall":[[-3.1,-3.35],[-3.1,4.3],[-3.95,3.4],[-4.05,-2.2]],"right-wall":[[3.1,-3.35],[3.95,-2.3],[3.85,3.4],[3.1,4.2]],"back-wall":[[-3.25,-2.6],[-3.5,-3.3],[2.9,-3.5],[3.3,-2.6]],"front-left":[[-3.3,3.35],[.3,3.35],[.3,4.13],[-3.15,4.3]],"front-right":[[2.8,3.35],[3.3,3.35],[3.45,4],[2.8,4]],"root-baffle":[[-.35,.45],[3.1,.45],[3.1,1.05],[-.3,.98]]};for(const m of s.solids)Av(m,l[m.id]||[[m.minX,m.minZ],[m.maxX,m.minZ],[m.maxX,m.maxZ],[m.minX,m.maxZ]]);s.floor={...s.solids[0]},s.shellBounds={minX:Math.min(...s.solids.map(m=>m.minX)),maxX:Math.max(...s.solids.map(m=>m.maxX)),minZ:Math.min(...s.solids.map(m=>m.minZ)),maxZ:Math.max(...s.solids.map(m=>m.maxZ))};let c=4.5;const h=4.2;for(let m=0;m<3;m++){const g=So(s,{x:s.entrance.x,z:h+c,y:0});c=Bo(Math.abs(s.floorY-n(g.x,g.z))/.32,4.5,14)}const u=Math.max(10,Math.ceil(c/.45)),p=6,f={minX:s.entrance.x-1.6,maxX:s.entrance.x+1.6,minZ:h,maxZ:h+c,rows:u,cols:p,heights:[],bottoms:[]};for(let m=0;m<=u;m++)for(let g=0;g<=p;g++){const x=m/u,d=f.minX+(f.maxX-f.minX)*g/p,b=f.minZ+c*x,M=So(s,{x:d,z:b,y:0}),_=So(s,{x:d,z:f.maxZ,y:0}),C=ls(n(M.x,M.z)),R=s.floorY+(ls(n(_.x,_.z))-s.floorY)*x;f.heights.push(m===0?s.floorY:Math.max(C+(m===u?.005:.02),R)),f.bottoms.push(Math.min(C-.14,R-.18))}return s.ramp=f,s.radius=Math.max(6,Math.hypot(f.maxX,f.maxZ)),s}function Cv(i,t){const e=i.ramp;if(!e||!Xu(t,e))return null;const n=Bo((t.x-e.minX)/(e.maxX-e.minX)*e.cols,0,e.cols),s=Bo((t.z-e.minZ)/(e.maxZ-e.minZ)*e.rows,0,e.rows),r=Math.min(e.cols-1,Math.floor(n)),o=Math.min(e.rows-1,Math.floor(s)),a=n-r,l=s-o,c=(m,g)=>e.heights[g*(e.cols+1)+m],h=c(r,o),u=c(r+1,o),p=c(r,o+1),f=c(r+1,o+1);return a+l<=1?h+(u-h)*a+(p-h)*l:f+(p-f)*(1-a)+(u-f)*(1-l)}function Pv(i,t,e,{y:n}={}){let s=null;for(const r of i||[]){if(!wv(r)||Math.hypot(t-r.x,e-r.z)>r.radius+1)continue;const o=Ev(r,{x:t,z:e}),a=r.solids.find(u=>u.id==="roof");let l=null,c="floor";Qh(o,r.floor)&&(l=r.floorY);const h=Cv(r,o);h!==null&&(l===null||h>l)&&(l=h,c="ramp"),Number.isFinite(n)&&n>=r.roofTop-.06&&Qh(o,a)&&(l=r.roofTop,c="roof"),l!==null&&(!s||l>s.height)&&(s={height:l,type:c==="roof"?"rock":"land",platform:r,refuge:r,surface:c})}return s}const Mc=(i,t,e)=>Math.max(t,Math.min(e,i)),Yn=(i,t,e)=>{const n=Mc((e-i)/(t-i),0,1);return n*n*(3-2*n)},Fi=-.035;function Dv(i,t){if(!Number.isFinite(i)||!Number.isFinite(t))return .91;const e=Math.max(0,t-.215-i);return .91-.63*Yn(.1,.6,e)}const Iv=Object.freeze({pond:{id:"pond",x:0,z:0,radius:8,label:"Λιμνούλα των νούφαρων",description:"Μύγες, ανθισμένα φύλλα και χαμηλές διαδρομές πάνω από το νερό.",hint:"Παρατήρησε πού μαζεύονται οι μύγες.",findPoint:{x:6.5,z:3}},creek:{id:"creek",x:8,z:-24,radius:7,label:"Το στενό ρυάκι",description:"Το ρεύμα αλλάζει τις διαδρομές και μεταφέρει την τροφή.",hint:"Ακολούθησε την κίνηση του νερού.",findPoint:{x:4,z:-29}},bank:{id:"bank",x:27,z:8,radius:7,label:"Η όχθη με τα βότσαλα",description:"Ψηλά βράχια, κρυψώνες και εκτεθειμένα περάσματα.",hint:"Οι καλαμιές κρύβουν μια δεύτερη προσέγγιση.",findPoint:{x:30,z:6}},roots:{id:"roots",x:24,z:-16,radius:5,label:"Το πέρασμα στις ρίζες",description:"Ένα φυσικό άνοιγμα που αποκαλύπτεται όταν χαμηλώνει το νερό.",hint:"Μικρά έντομα χάνονται κάτω από τις καμπύλες ρίζες.",findPoint:{x:31,z:-16}}});function Lv(i){const t=e=>({...e,...i.toWorld(e.x,e.z)});return{landmarks:Object.values(Iv).map(e=>({...t(e),findPoint:t(e.findPoint)})),nest:t({id:"creek-nest",x:17,z:16,radius:4,label:"Κοιλότητα κάτω από τις ρίζες"}),refuges:[{id:"willow-crevice",x:-20,z:7,label:"Κρυψώνα της πεσμένης ιτιάς"},{id:"bank-crevice",x:34,z:-9,label:"Κοιλότητα της πετρώδους όχθης"}].map(e=>({...t(e),yaw:Math.atan2(-e.x,-e.z)+i.yaw})),cover:[{id:"nest-reeds",x:14,z:20,radius:3.1},{id:"root-reeds",x:18,z:-7,radius:3},{id:"bank-reeds",x:29,z:11,radius:3.3},{id:"creek-reeds",x:18,z:-22,radius:3}].map(t)}}function qu(i){return 6+Math.sin(i*.035)*9}function Uv(i,t,e=0,n=[]){const s=Math.abs(i-qu(t));let r=-1.9+Yn(6,17,s)*3.5+e*.22;r+=Yn(20,55,s)*(.4+Math.sin(t*.04+.6)**2*1.2);const o=1-Yn(11,20,Math.hypot(i*.95,t*.8));r=r*(1-o)+(-2.65+e*.2)*o;for(const l of n){const c=Math.hypot(i-l.x,t-l.z),u=l.radius*(1+.045*Math.sin(Math.atan2(t-l.z,i-l.x)*5+(l.shorePhase||0))),p=1-Yn(u*.46,u+5,c);p>0&&(r=Math.max(r,r*(1-p)+l.elevation*p))}const a=(1-Yn(1.9,4.7,Math.abs(t+16)))*Yn(9,14,i)*(1-Yn(31,36,i));return r=r*(1-a)+Math.min(r,-.18+e*.025)*a,r+=Yn(190,235,Math.max(Math.abs(i),Math.abs(t)))*4,r}function zv(i,t,e,n=.45){const s=i.toSource(t,e),r=Math.abs(s.x-qu(s.z)),o=Mc(Number(n)||0,0,1.5)*(1-Yn(5,17,r))*(.55+.45*Yn(5,23,Math.abs(s.z)));if(o<=0)return{x:0,z:0,strength:0};const a=.315*Math.cos(s.z*.035),l=Math.hypot(a,1),c=i.toWorld(0,0),h=i.toWorld(a/l,1/l);return{x:(h.x-c.x)*o,z:(h.z-c.z)*o,strength:o}}function Nv({group:i,layout:t,terrainHeight:e,surface:n,insertPlatform:s,materials:r,rockGeos:o,tube:a,leafGeometry:l,bladeGeometry:c,geography:h}){const u=new pe;u.name="Natural creek discoveries",i.add(u);const p=[],f=new $e,m=new Map,g=new ci(1,11,7),x=new Ve({color:"#e0c58b",roughness:.68}),d=new Ve({color:"#698d9d",roughness:.65}),b=l(.55,.38,.11),M=r.leaf.clone();M.color.set("#adc68a");const _=(B,W,Q)=>{const Y=t.toWorld(B,W);return[Y.x,Q,Y.z]},C=h.landmarks.find(B=>B.id==="roots"),R=e(C.x,C.z);for(const B of[-.48,.45]){const W=a([[0,-.1,-4.1],[-.3,2.3,-2.6],[.2,3.7,0],[.35,2.5,2.7],[0,-.1,4.2]].map(Q=>_(24+Q[0]+B,-16+Q[2],R+Q[1])),.48,r.bark,24,.14);W.name="Passable willow root arch",W.castShadow=!0,W.receiveShadow=!0,u.add(W)}for(const B of[-1,1])for(let W=0;W<4;W++){const Q=-16+B*(3.4+W*.45),Y=24+(W-1.5)*1.1,ct=t.toWorld(Y,Q),j=t.toWorld(Y-4.5,Q+B*1.5),Mt=a([[ct.x,e(ct.x,ct.z)+.8,ct.z],[(ct.x+j.x)/2,e(j.x,j.z)+.45,(ct.z+j.z)/2],[j.x,e(j.x,j.z)-.05,j.z]],.1+W*.025,r.bark,12,.75);Mt.castShadow=!0,u.add(Mt)}const E=[{id:"creek-stone",x:4,z:-29,r:1.8,height:3.5},{id:"root-approach",x:18,z:-7,r:1.65,height:1.65},{id:"root-perch",x:24,z:-11,r:1.7,height:2},{id:"bank-perch",x:30,z:6,r:2,height:2.05},{id:"nest-perch",x:19,z:20,r:1.8,height:1.7},{id:"pond-perch",x:-5,z:8,r:1.7,height:3.5}],A=new Ve({color:"#c4d9ad",roughness:.82});for(const[B,W]of E.entries()){const Q=t.toWorld(W.x,W.z),Y=e(Q.x,Q.z),ct=W.height,j=new ne(o[B%o.length],r.mossRock);j.name="Moss-covered grip outcrop",j.position.set(Q.x,Y,Q.z),j.scale.set(W.r,ct,W.r),j.rotation.y=B*1.93,j.castShadow=!0,j.receiveShadow=!0,u.add(j);const Mt=s({id:W.id,type:"rock",...Q,y:Y+ct*.76,radius:W.r*.72,visualRadius:W.r,scaleY:ct}),$t=new ne(g,A);$t.name="Pale natural grip",$t.position.set(Q.x,Mt.y+.045,Q.z),$t.scale.set(.22,.07,.22),u.add($t),p.push({id:W.id,...Q,y:Mt.y+.13,radius:Mt.radius})}const S=c(123),y=new Tn(S,r.plant,h.cover.length*84);y.name="Dense camouflage reed pockets";let U=0;for(const[B,W]of h.cover.entries())for(let Q=0;Q<84;Q++){const Y=Q*2.399+B*.7,ct=Math.sqrt((Q+.4)/84)*W.radius,j=W.x+Math.cos(Y)*ct,Mt=W.z+Math.sin(Y)*ct;f.position.set(j,e(j,Mt),Mt),f.rotation.set(0,Y,0),f.scale.set(1.2,1.65+Q%5*.18,1.2),f.updateMatrix(),y.setMatrixAt(U++,f.matrix)}y.receiveShadow=!0,y.computeBoundingSphere(),u.add(y);function N(B,W,Q){const Y=new pe;Y.name=Q?"Lost food and natural keepsakes":"Natural discovery";const ct=new ne(b,M);ct.rotation.y=m.size*2.4%6.28,ct.receiveShadow=!0,Y.add(ct);for(let j=0;j<(Q?3:1);j++){const Mt=new ne(g,W.kind==="keepsake"||W.keepsakesCount?x:d);Mt.position.set((j-1)*.15,.15+j%2*.035,.015),Mt.scale.set(.22,.15,.18),Mt.rotation.set(.2,j*.9,.1),Mt.castShadow=!0,Y.add(Mt)}return Y.userData.creekPoint={...W},u.add(Y),m.set(B,Y),Y}function X(B,W){const Q=new Set;for(const[Y,ct]of[[!1,B.finds||[]],[!0,B.dropped||[]]])for(const j of ct){if(!Number.isFinite(j.x)||!Number.isFinite(j.z)||j.collected||j.visible===!1)continue;const Mt=(Y?"drop:":"find:")+j.id;Q.add(Mt);const $t=m.get(Mt)||N(Mt,j,Y);$t.userData.creekPoint={...j},$t.visible=!0,$t.position.set(j.x,Math.max(n(j.x,j.z).height,W)+.07,j.z),$t.updateMatrix()}for(const[Y,ct]of m)Q.has(Y)||(ct.removeFromParent(),m.delete(Y))}function J(B,W){for(const Q of m.values()){const Y=Q.userData.creekPoint,ct=n(Y.x,Y.z),j=ct.type==="water";Q.position.y=Math.max(ct.height,B)+.07+(j?Math.sin(W*1.5+Y.x)*.025:0),Q.rotation.z=j?Math.sin(W*.8+Y.z)*.045:0,Q.updateMatrix()}}return{group:u,grips:p,sync:X,update:J,resources:[g,x,d,b,M,A,S]}}function Fv(i){const t=i.outline||[{x:i.minX,z:i.minZ},{x:i.maxX,z:i.minZ},{x:i.maxX,z:i.maxZ},{x:i.minX,z:i.maxZ}],e=t.length,n=[],s=[];for(const h of[i.minY,i.maxY])for(const u of t)n.push(u.x,h,u.z);for(let h=1;h<e-1;h++)s.push(0,h,h+1,e,e+h+1,e+h);for(let h=0;h<e;h++){const u=(h+1)%e;s.push(h,e+h,u,u,e+h,e+u)}const r=new Te;r.setAttribute("position",new Vt(n,3)),r.setIndex(s);const o=r.toNonIndexed();r.dispose(),o.computeVertexNormals();const a=o.attributes.position,l=o.attributes.normal,c=[];for(let h=0;h<a.count;h++){const u=Math.abs(l.getY(h))>.5;c.push((u?a.getX(h):Math.abs(l.getX(h))>.5?a.getZ(h):a.getX(h))*.35,(u?a.getZ(h):a.getY(h))*.35)}return o.setAttribute("uv",new Vt(c,2)),o}function kv(i,{terrainHeight:t,materials:e,rockGeos:n,tube:s,leafGeometry:r,mergeStaticParts:o,teamColor:a}){const l=Rv(i,{terrainHeight:t}),c=new pe;c.name="Natural refuge "+(i.id||""),c.position.set(i.x,l.floorY,i.z),c.rotation.y=l.yaw;const h=[],u=e.leaf.clone(),p=e.rock.clone();p.color.set("#71816a"),h.push(u,p);const f=new pe;f.name="Opaque rock and root cavity",c.add(f);const m=new pe;m.name="Overhanging refuge slab",f.add(m);for(const E of l.solids){const A=Fv(E),S=E.id==="root-baffle"?e.bark:E.id==="floor"?p:e.mossRock,y=new ne(A,S);y.name="Refuge solid · "+E.id,y.userData.refugeSolid=E,y.position.y=-l.floorY,y.castShadow=!0,y.receiveShadow=!0,h.push(A),(E.id==="roof"?m:f).add(y)}const g=l.ramp,x=[],d=[];for(let E=0;E<=g.rows;E++)for(let A=0;A<=g.cols;A++){const S=E*(g.cols+1)+A;x.push(g.minX+(g.maxX-g.minX)*A/g.cols,g.heights[S]-l.floorY,g.minZ+(g.maxZ-g.minZ)*E/g.rows)}for(let E=0;E<g.rows;E++)for(let A=0;A<g.cols;A++){const S=E*(g.cols+1)+A,y=S+1,U=S+g.cols+1,N=U+1;d.push(S,U,y,y,U,N)}const b=[];for(let E=0;E<=g.cols;E++)b.push(E);for(let E=1;E<=g.rows;E++)b.push(E*(g.cols+1)+g.cols);for(let E=g.cols-1;E>=0;E--)b.push(g.rows*(g.cols+1)+E);for(let E=g.rows-1;E>0;E--)b.push(E*(g.cols+1));for(let E=0;E<b.length;E++){const A=b[E],S=b[(E+1)%b.length],y=x.length/3,U=y+1;x.push(x[A*3],g.bottoms[A]-l.floorY,x[A*3+2],x[S*3],g.bottoms[S]-l.floorY,x[S*3+2]),d.push(A,S,y,S,U,y)}const M=new Te;M.setAttribute("position",new Vt(x,3)),M.setAttribute("uv",new Vt(Array.from({length:x.length/3},(E,A)=>[x[A*3]*.35,x[A*3+2]*.35]).flat(),2)),M.setIndex(d),M.computeVertexNormals(),h.push(M);const _=new ne(M,e.mossRock);_.name="Terrain-joined natural refuge ledge",_.castShadow=!0,_.receiveShadow=!0,f.add(_);for(const E of[-1,1])for(let A=0;A<3;A++){const S=E*(3.6-A*.12),y=-2.4+A*2.3,U=s([[S,l.floorBottom-l.floorY,y+.55],[S+E*.08,.55,y+.35],[S-E*.12,1.8,y],[S-E*.45,2.6,y-.2]],.16+A*.045,e.bark,15,.48);U.castShadow=!0,h.push(U.geometry),f.add(U)}for(let E=0;E<5;E++){const A=-2.3+E*1.3,S=s([[-3.5,3.03,A],[-1.6,3.12,A-.2],[.5,3.1,A+.1],[3.4,3.04,A+.35]],.075+E%2*.045,e.bark,18,.35);S.castShadow=!0,h.push(S.geometry),m.add(S)}const C=[];for(let E=0;E<4;E++){const A=new pe;A.name="Natural life "+E,C.push(A),m.add(A);for(let S=0;S<8+E*3;S++){const y=S*2.399+E*.7,U=Math.cos(y)*(2.1+S%3*.48),N=.35+Math.sin(y)*(2.1+S%4*.2),X=new ne(r(.65+S%3*.15,.85,.12),u);h.push(X.geometry),X.position.set(U,3.07+S%3*.025,N),X.rotation.set((S%3-1)*.08,y,(S%2-.5)*.1),X.castShadow=!0,X.receiveShadow=!0,A.add(X)}o(A,h)}const R=new pe;R.name="Dry leaves inside the root hollow",f.add(R);for(let E=0;E<8;E++){const A=new ne(r(.3,.48,.045),u);h.push(A.geometry),A.position.set(Math.sin(E*2.4)*2,.025,-1.1+Math.cos(E*2.4)*.7),A.rotation.y=E*1.7,A.receiveShadow=!0,R.add(A)}return o(R,h),l.mesh=c,c.userData={id:i.id,natural:!0,radius:l.radius,owned:h,growth:C,leafMaterial:u,terrain:null,keepCollision:{rects:[]},trainingPoint:c.position.clone(),support:{x:i.x,z:i.z,y:l.floorY,type:"land",radius:0},team:i.team,refuge:l,refugeSolids:f,refugeRoof:m},Yu(c,i,a),c}function Yu(i,t={},e){const n=i.userData.visualState||{},s={...n,...t},r=Mc(Math.floor(Number(s.nestLevel??s.level??s.tier??1)||0),0,3);return i.userData.visualState={team:s.team??"neutral",tier:s.tier??1,nestLevel:r,safe:s.safe!==!1,hp:s.hp,maxHp:s.maxHp,destroyed:!!s.destroyed},i.userData.team=i.userData.visualState.team,i.userData.level=r,i.userData.destroyed=!!s.destroyed,i.userData.refuge&&(i.userData.refuge.team=i.userData.team),i.userData.leafMaterial.color.set(e(i.userData.team)).lerp(new Qt("#72964b"),.7),i.userData.growth.forEach((o,a)=>{o.visible=a<=r}),i.userData.collisionRevision=(i.userData.collisionRevision||0)+1,i}const Le=Math.PI*2,Hi=Bl.clamp,Xn=(i,t,e)=>(e=Hi((e-i)/(t-i),0,1),e*e*(3-2*e));function wi(i){return()=>{i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const bo=(i,t)=>Math.sin(i*.213+Math.sin(t*.137)*1.9)*.48+Math.sin(t*.329-i*.079)*.27+Math.cos(i*.741+t*.533)*.13,on=i=>new Qt(i),ft=new $e;new L(0,1,0);const tu=[{sky:"#8aaab0",fog:"#819e91",earth:"#8b8a62",wet:"#43533b",deep:"#52634e",leaf:"#b5d28f",rock:"#a4a292",moss:"#89976c",bark:"#65513a",reed:"#b4a676",water:"#2c6258",nightWater:"#0c2b32"},{sky:"#91acbd",fog:"#8bada6",earth:"#82958a",wet:"#3c6257",deep:"#456b68",leaf:"#a0c9ad",rock:"#a7b5ae",moss:"#7f9b88",bark:"#605848",reed:"#aebca0",water:"#3b747b",nightWater:"#122c3b"},{sky:"#b4a58a",fog:"#a39b7e",earth:"#b09b6b",wet:"#685b3c",deep:"#626047",leaf:"#d0b46b",rock:"#b6a184",moss:"#9f9a6d",bark:"#78543b",reed:"#c8ad73",water:"#69765a",nightWater:"#25352b"},{sky:"#82989c",fog:"#738d81",earth:"#7a8064",wet:"#364f3b",deep:"#3e5c52",leaf:"#93b57d",rock:"#939b8b",moss:"#6b8664",bark:"#554934",reed:"#9b9d70",water:"#376b57",nightWater:"#112e29"}];function Ov(i=0,t=731+Math.max(0,i)*7919){const e=Math.max(0,Math.floor(Number(i)||0)),n=e%8,[s,r]=[[1,0],[0,1],[-1,0],[0,-1]][n%4],o=n>=4?-1:1,a=(h,u)=>e?{x:s*h*o+r*u,z:-r*h*o+s*u}:{x:h,z:u},l=(h,u)=>e?{x:o*(s*h-r*u),z:r*h+s*u}:{x:h,z:u},c=wi((Number(t)||731)^Math.imul(e,2654435761));return{index:e,seed:t,symmetry:n,yaw:n%4*Math.PI/2,toWorld:a,toSource:l,palette:{...tu[e%tu.length]},noiseOffset:e?{x:(c()-.5)*170,z:(c()-.5)*170}:{x:0,z:0}}}function yc(i,t,e=1){const n=document.createElement("canvas");n.width=n.height=i,t(n.getContext("2d"),i);const s=new Du(n);return s.colorSpace=An,s.wrapS=s.wrapT=js,s.repeat.set(e,e),s.anisotropy=4,s}function ka(i,t=!1){const e=wi(i);return yc(256,(n,s)=>{n.fillStyle=t?"#6c7155":"#8b8978",n.fillRect(0,0,s,s);for(let r=0;r<15e3;r++){const o=e()*s,a=e()*s,l=45+e()*110;n.fillStyle=t?`rgba(${l*.8},${l},${l*.61},${.12+e()*.28})`:`rgba(${l*1.06},${l},${l*.85},${.15+e()*.3})`,n.fillRect(o,a,.5+e()*3,.5+e()*3)}n.lineWidth=.7;for(let r=0;r<26;r++){n.strokeStyle=`rgba(31,36,28,${.06+e()*.15})`,n.beginPath();let o=e()*s;n.moveTo(0,o);for(let a=0;a<s;a+=10)o+=(e()-.5)*9,n.lineTo(a,o);n.stroke()}},1)}function Bv(i){const t=wi(i);return yc(512,(e,n)=>{const s=e.createRadialGradient(n*.5,n*.5,4,n*.5,n*.5,n*.54);s.addColorStop(0,"#588a39"),s.addColorStop(.6,"#6ca04a"),s.addColorStop(1,"#345d27"),e.fillStyle=s,e.fillRect(0,0,n,n);for(let r=0;r<9e3;r++)e.fillStyle=t()>.5?"rgba(185,214,109,.08)":"rgba(18,58,20,.06)",e.fillRect(t()*n,t()*n,t()*4+1,t()*4+1);for(let r=.18;r<Le-.18;r+=.31){const o=n*.5+Math.cos(r)*n*.49,a=n*.5+Math.sin(r)*n*.49;e.strokeStyle="rgba(191,204,117,.42)",e.lineWidth=1.8,e.beginPath(),e.moveTo(n*.5,n*.5),e.quadraticCurveTo(n*.5+Math.cos(r+.08)*n*.28,n*.5+Math.sin(r+.08)*n*.28,o,a),e.stroke();for(let l=.2;l<.9;l+=.15)for(const c of[-1,1])e.strokeStyle="rgba(186,211,124,.19)",e.lineWidth=.8,e.beginPath(),e.moveTo(n*.5+Math.cos(r)*n*l*.5,n*.5+Math.sin(r)*n*l*.5),e.lineTo(n*.5+Math.cos(r+c*.12)*n*(l+.1)*.5,n*.5+Math.sin(r+c*.12)*n*(l+.1)*.5),e.stroke()}for(let r=0;r<13;r++){const o=t()*Le,a=t()*n*.45;e.fillStyle="rgba(42,56,17,.16)",e.beginPath(),e.ellipse(n*.5+Math.cos(o)*a,n*.5+Math.sin(o)*a,t()*5+2,t()*3+1,o,0,Le),e.fill()}})}function Hv(i){const e=document.createElement("canvas");e.width=e.height=256;const n=e.getContext("2d"),s=n.createImageData(256,256);for(let o=0;o<256;o++)for(let a=0;a<256;a++){const l=(o*256+a)*4,c=a*Le/256,h=o*Le/256,u=Math.cos(c*9+h*7)*.27+Math.cos(c*17-h*11)*.14+Math.sin(c*31+h*19)*.07,p=Math.sin(c*7+h*13)*.27+Math.sin(c*19-h*9)*.13+Math.cos(c*29+h*23)*.08;s.data[l]=128+u*110,s.data[l+1]=128+p*110,s.data[l+2]=245,s.data[l+3]=255}n.putImageData(s,0,0);const r=new Du(e);return r.wrapS=r.wrapT=js,r.colorSpace=_i,r}function Wl(i,t,e=.1,n=1){const s=wi(n),r=i.attributes.position,o=new Float32Array(r.count*3),a=on(t);for(let l=0;l<r.count;l++){const c=1+(s()-.5)*e;o[l*3]=a.r*c,o[l*3+1]=a.g*c,o[l*3+2]=a.b*c}return i.setAttribute("color",new an(o,3)),i}function je(i,t,e,n=12,s=0){const r=new Nr(i.map(a=>new L(...a))),o=new qo(r,n,t,5,!1);if(s){const a=o.attributes.position;for(let l=0;l<=n;l++){const c=r.getPointAt(l/n),h=1-s*l/n;for(let u=0;u<=5;u++){const p=l*6+u;a.setXYZ(p,c.x+(a.getX(p)-c.x)*h,c.y+(a.getY(p)-c.y)*h,c.z+(a.getZ(p)-c.z)*h)}}o.computeVertexNormals()}return new ne(o,e)}function qn(i,t=[],e=new Set){i.updateMatrixWorld(!0);const n=new ce().copy(i.matrixWorld).invert(),s=new Map;i.traverse(r=>{if(!r.isMesh||r.isInstancedMesh||e.has(r)||Array.isArray(r.material))return;const o=r.material.uuid;s.has(o)||s.set(o,{material:r.material,meshes:[]}),s.get(o).meshes.push(r)});for(const{material:r,meshes:o}of s.values()){if(o.length<2)continue;const a=o.map(h=>h.geometry.clone().applyMatrix4(new ce().multiplyMatrices(n,h.matrixWorld))),l=_c(a,!1);for(const h of a)h.dispose();if(!l)continue;const c=new ne(l,r);c.castShadow=o.some(h=>h.castShadow),c.receiveShadow=!0,t.push(l);for(const h of o){h.removeFromParent();const u=t.indexOf(h.geometry);u>=0&&(t.splice(u,1),h.geometry.dispose())}i.add(c)}}function ki(i=1,t=1,e=.08){const n=[],s=[],r=[];for(let c=0;c<=3;c++)for(let h=0;h<=40;h++){const u=c/3,p=.22+h/40*(Le-.44),f=1+.027*Math.sin(p*7)+.016*Math.cos(p*13),m=Math.cos(p)*u*f,g=Math.sin(p)*u*f;n.push(m*i,e*(u*u)+.014*Math.sin(p*4)*u*u,g*t),s.push(m*.48+.5,g*.48+.5)}for(let c=0;c<3;c++)for(let h=0;h<40;h++){const u=c*41+h,p=u+40+1;r.push(u,u+1,p,p,u+1,p+1)}const l=new Te;return l.setAttribute("position",new Vt(n,3)),l.setAttribute("uv",new Vt(s,2)),l.setIndex(r),l.computeVertexNormals(),l}function Oa(i){const t=wi(i),e=28,n=[[-.47,.57],[-.2,.91],[.15,1],[.52,.86],[.71,.61],[.76,.08]],s=[],r=[],o=[],a=Array.from({length:e+1},(h,u)=>.87+.12*Math.sin(u*1.51+i)+t()*.12);a[e]=a[0];for(let h=0;h<n.length;h++)for(let u=0;u<=e;u++){const p=u/e*Le,f=n[h][1]*a[u],m=(Math.sin(p*5+i)+Math.sin(p*9-i))*.045;s.push(Math.cos(p)*f,n[h][0]+m*(h===5?.15:1),Math.sin(p)*f*.86),r.push(Math.cos(p)*f*.5+.5,Math.sin(p)*f*.5+.5)}for(let h=0;h<n.length-1;h++)for(let u=0;u<e;u++){const p=h*(e+1)+u,f=p+e+1;o.push(p,f,p+1,p+1,f,f+1)}const l=s.length/3;s.push(0,.764,0),r.push(.5,.5);for(let h=0;h<e;h++)o.push(l,(n.length-1)*(e+1)+h+1,(n.length-1)*(e+1)+h);const c=new Te;return c.setAttribute("position",new Vt(s,3)),c.setAttribute("uv",new Vt(r,2)),c.setIndex(o),c.computeVertexNormals(),c}function Xl(i){const t=wi(i),e=[],n=[],s=[],r=[];for(let a=0;a<5;a++){const l=t()*Le,c=.55+t()*.7,h=.1+t()*.35,u=.022+t()*.035,p=on(a%2?"#819c42":"#526f33"),f=e.length/3;for(let m=0;m<=7;m++){const g=m/7,x=Math.cos(l)*h*g*g,d=Math.sin(l)*h*g*g,b=u*Math.sin(Math.PI*(g*.94+.04));for(const M of[-1,1])e.push(x+Math.cos(l+Math.PI/2)*b*M,g*c,d+Math.sin(l+Math.PI/2)*b*M),n.push(M*.5+.5,g),r.push(p.r*(.65+g*.35),p.g*(.65+g*.35),p.b*(.65+g*.35))}for(let m=0;m<7;m++){const g=f+m*2;s.push(g,g+1,g+2,g+1,g+3,g+2)}}const o=new Te;return o.setAttribute("position",new Vt(e,3)),o.setAttribute("uv",new Vt(n,2)),o.setAttribute("color",new Vt(r,3)),o.setIndex(s),o.computeVertexNormals(),o}function Gv(){const i=new qo(new Nr([new L,new L(.03,.8,.015),new L(.1,1.8,.04)]),9,.013,5,!1);Wl(i,"#64754a",.15,8);const t=new ci(1,7,7);t.scale(.065,.25,.065),t.translate(.1,1.61,.04),Wl(t,"#5d3f27",.3,5);const e=Xl(92);e.scale(.8,1.45,.8);const n=_c([i,t,e],!1);return i.dispose(),t.dispose(),e.dispose(),n}function Vv(i){const t=new ci(1,13,9),e=t.attributes.position;for(let n=0;n<e.count;n++){const s=e.getX(n),r=e.getY(n),o=e.getZ(n),a=1+.06*Math.sin(s*12+i)*Math.sin(o*13-r*7);e.setXYZ(n,s*a,r*.83*a,o*a)}return t.computeVertexNormals(),t}function Wv(){const i=[],t=[],e=[];function n(r,o,a,l){const c=i.length/3;i.push(...r,...o,...a);const h=on(l);for(let u=0;u<3;u++)t.push(h.r,h.g,h.b);e.push(c,c+1,c+2)}n([0,.025,-.1],[-.045,0,0],[0,.04,.09],"#16201b"),n([0,.025,-.1],[0,.04,.09],[.045,0,0],"#293327"),n([0,0,0],[-.17,.025,-.035],[-.12,.015,.07],"#a0b3b0"),n([0,0,0],[.12,.015,.07],[.17,.025,-.035],"#a0b3b0");const s=new Te;return s.setAttribute("position",new Vt(i,3)),s.setAttribute("color",new Vt(t,3)),s.setIndex(e),s.computeVertexNormals(),s}function Mr(i,t,e,n,{castShadow:s=!1,receiveShadow:r=!1,dynamic:o=!1}={}){const a=new pe;a.name=n;const l=new Map,c=[],h=[],u=new Set,p=128;e.forEach((f,m)=>{const g=Math.floor(f.x/p)+":"+Math.floor(f.z/p);l.has(g)||l.set(g,[]),l.get(g).push(m)});for(const[f,m]of l){const g=new Tn(i,t,m.length);g.name=n+" · "+f,g.castShadow=s,g.receiveShadow=r,g.userData.spatialChunk=!0,g.userData.chunkSpan=p,o&&g.instanceMatrix.setUsage(Mi),m.forEach((x,d)=>{c[x]={mesh:g,index:d}}),a.add(g),h.push(g)}return{group:a,meshes:h,count:e.length,setMatrixAt(f,m){const g=c[f];g.mesh.setMatrixAt(g.index,m),u.add(g.mesh)},setColorAt(f,m){const g=c[f];g.mesh.setColorAt(g.index,m)},finish(){for(const f of h)f.computeBoundingBox(),f.computeBoundingSphere(),f.boundingSphere.radius+=.75,f.instanceMatrix.needsUpdate=!0,f.instanceColor&&(f.instanceColor.needsUpdate=!0);u.clear()},flush(){for(const f of u)f.instanceMatrix.needsUpdate=!0;u.clear()}}}function Xv(i,t,e={}){const n=Math.max(0,Math.floor(Number(e.regionIndex)||0)),s=e.seed??731+n*7919,r=Ov(n,s),o=r.palette,a=wi(s),l=new pe;l.name="The living creek",i.add(l);const c=e.natural===!0,h=c?Lv(r):null,u=h?.landmarks||[],p=h?.nest||null,f=h?.cover||[],m=[],g=[];let x=Fi,d=Fi,b={flow:.45},M=!1,_=null;const C=[],R=[],E=new Set,A=new Map,S=new Set,y=[],U=new Map,N=6;let X=null;const J={reflectionRenders:0,reflectionSkips:0,flyMatricesUpdated:0,spatialChunks:0,terrainUpdates:0};new Qt(o.sky);const B=new Qt(o.fog);i.fog?i.fog.color.copy(B):i.fog=new Go(B,.0042);const W=ka(s),Q=ka(s+9,!0),Y=Bv(s),ct=Hv();y.push(W,Q,Y,ct);const j={terrain:new Ve({color:16777215,vertexColors:!0,map:Q,roughness:1}),leaf:new Ve({color:o.leaf,map:Y,roughness:.44,metalness:.025,side:Fe}),rock:new Ve({color:o.rock,map:W,roughness:.89}),mossRock:new Ve({color:o.moss,map:Q,roughness:.94}),plant:new Ve({color:16777215,vertexColors:!0,roughness:.87,side:Fe}),bark:new Ve({color:o.bark,map:W,roughness:.94}),reed:new Ve({color:o.reed,map:W,roughness:.83}),compost:new Ve({color:"#57422e",map:Q,roughness:1}),fruit:new Ve({color:"#b38539",map:W,roughness:.75}),darkFruit:new Ve({color:"#685831",map:Q,roughness:.95})},Mt=[Oa(7),Oa(35),Oa(89)],$t=ki(),Ee=Vv(19),le=[{id:"home",x:8,z:8,radius:7.4,team:"neutral",name:"Willow Haven"},{id:"mudfang",x:-31,z:-30,radius:7,team:"enemy",name:"Mudfang Den"},{id:"redreed",x:31,z:-56,radius:7.6,team:"enemy",name:"Red Reed Stronghold"},{id:"mossjaw",x:-24,z:49,radius:7.1,team:"enemy",name:"Mossjaw Hollow"},{id:"blackpool",x:34,z:79,radius:8,team:"enemy",name:"Blackwater Nest"},{id:"thornback",x:-8,z:-91,radius:8,team:"enemy",name:"Thornback Root"},{id:"oldwillow",x:-38,z:96,radius:7.5,team:"neutral",name:"Αυλή της Γέρικης Ιτιάς"},{id:"quietbend",x:29,z:32,radius:6.8,team:"neutral",name:"Quiet Bend"},{id:"foxglove",x:-39,z:2,radius:6.8,team:"neutral",name:"Foxglove Island"},{id:"reedcrossing",x:3,z:-45,radius:6.8,team:"neutral",name:"Πέρασμα των Καλαμιών"},{id:"longreed",x:-4,z:67,radius:6.8,team:"neutral",name:"Νησίδα των Ανέμων"},{id:"eastshallows",x:58,z:35,radius:6.8,team:"neutral",name:"Ανατολικές Αβαθείς"}],ht={home:.65,mudfang:2.7,redreed:4.1,mossjaw:1.8,blackpool:5.2,thornback:7.1,oldwillow:2.9,quietbend:1.2,foxglove:2.1,reedcrossing:1.7,longreed:2.5,eastshallows:3.4},V=wi(s^3582759),st={home:{x:17,z:16,radius:7.4,elevation:.65},mudfang:{x:38,z:-19,radius:9,elevation:1.35},redreed:{x:-37,z:-46,radius:11,elevation:1.2},mossjaw:{x:-34,z:44,radius:11,elevation:1.05},blackpool:{x:40,z:86,radius:12,elevation:1.5},thornback:{x:-16,z:-120,radius:12,elevation:1.65}};for(const v of le){const I=st[v.id],F=c&&I?{x:I.x,z:I.z}:{x:v.x*ge,z:v.z*ge};Object.assign(v,r.toWorld(F.x,F.z)),v.radius=c?I?.radius||10:Math.max(36,v.radius*(v.id==="thornback"?5.8:4.9)),v.elevation=c?I?.elevation||1.1:Math.max(.45,ht[v.id]+(n?(V()-.5)*.6:0)),v.shorePhase=F.x+(n?V()*Le:0),n&&(v.yaw=r.yaw)}le.find(v=>v.id==="thornback").stronghold=!0;const _t=[{id:"haven",name:"Απάνεμη Όχθη",x:0,z:12,radius:30,tint:"#77965d"},{id:"reedways",name:"Περάσματα των Καλαμιών",x:2,z:-50,radius:45,tint:"#a99d64"},{id:"westernroots",name:"Δυτικές Ρίζες",x:-34,z:22,radius:37,tint:"#657f67"},{id:"blackwater",name:"Βαθύ Νερό",x:10,z:75,radius:34,tint:"#496f79"}].map(v=>({...v,...r.toWorld(v.x*ge,v.z*ge),radius:v.radius*ge})),Gt={heron:r.toWorld(34*ge,14*ge),snake:r.toWorld(-38*ge,-22*ge),fish:r.toWorld(12*ge,48*ge)},Nt={heron:r.toWorld(43*ge,-73*ge),snake:r.toWorld(-39*ge,70*ge),fish:r.toWorld(11*ge,94*ge)};c&&(Object.assign(Gt,{heron:r.toWorld(34,15),snake:r.toWorld(-26,-23),fish:r.toWorld(5,-34)}),Object.assign(Nt,{heron:r.toWorld(41,-70),snake:r.toWorld(-34,62),fish:r.toWorld(7,106)}));const de=c?le.map(v=>({...v,...r.toSource(v.x,v.z)})):[];function be(v,I){const F=r.toSource(v,I),k=F.x/ge,z=F.z/ge;if(c)return Uv(F.x,F.z,bo(F.x+r.noiseOffset.x,F.z+r.noiseOffset.z),de);const O=Math.sin(z*.032)*15+Math.sin(z*.073)*5,q=Math.abs(k-O);let H=-2.2+bo(F.x+r.noiseOffset.x,F.z+r.noiseOffset.z)*.47+Xn(44,71,q)*6;H+=Xn(47,72,q)*(1.5+3.3*Math.sin(z*.036+.7)**2),H+=Xn(105,132,Math.abs(z))*4.8;let nt=null,dt=0;for(const zt of le){const se=v-zt.x,Re=I-zt.z,Ce=Math.hypot(se,Re),me=r.toSource(se,Re),tn=zt.radius*(1+.05*Math.sin(Math.atan2(me.z,me.x)*5+zt.shorePhase));if(Ce<tn+7){const Je=mv,rn=zt.elevation-Xn(Je,tn+7,Ce)*(zt.elevation+2.8);H=Math.max(H,rn);const mn=1-Xn(Je,Je+8,Ce);mn>dt&&(nt=zt,dt=mn)}}nt&&(H=H*(1-dt)+nt.elevation*dt);let Tt=null,Xt=0,It=1/0;for(const zt of A.values()){const se=Math.hypot(v-zt.x,I-zt.z),Re=1-Xn(os,os+yo,se);(Re>Xt||Re===Xt&&Re>0&&se<It)&&(Tt=zt,Xt=Re,It=se)}if(Tt){const zt=H*(1-Xt)+Tt.elevation*Xt;H=Xt===1?Tt.elevation:Math.max(H,zt)}return H}const D=new Si(270*ge,270*ge,216,216);D.rotateX(-Math.PI/2);const te=D.attributes.position,Yt=new Float32Array(te.count*3),Wt=on(o.earth),Lt=on(o.wet),ie=on(o.deep);for(let v=0;v<te.count;v++){const I=te.getX(v),F=te.getZ(v),k=be(I,F);te.setY(v,k);const z=ie.clone().lerp(Lt,Xn(-1.7,.05,k)).lerp(Wt,Xn(.02,2,k));z.multiplyScalar(.88+bo(I*2,F*2)*.18),z.toArray(Yt,v*3)}D.setAttribute("color",new an(Yt,3)),D.computeVertexNormals(),Q.repeat.set(44*ge,44*ge);const pt=new ne(D,j.terrain);pt.receiveShadow=!0,pt.name="Creek bed and island banks",l.add(pt);const yt=135*ge,ae=270*ge/216,Pe=217;function P(v,I){const F=Bl.clamp((v+yt)/ae,0,216),k=Bl.clamp((I+yt)/ae,0,216),z=Math.min(215,Math.floor(F)),O=Math.min(215,Math.floor(k)),q=F-z,H=k-O,nt=O*Pe+z,dt=nt+Pe,Tt=te.getY(nt),Xt=te.getY(nt+1),It=te.getY(dt),zt=te.getY(dt+1);return q+H<=1?Tt+q*(Xt-Tt)+H*(It-Tt):zt+(1-q)*(It-zt)+(1-H)*(Xt-zt)}function w(v){const I=os+yo+ae*2;for(let F=0;F<te.count;F++){const k=te.getX(F),z=te.getZ(F);if(Math.abs(k-v.x)>I||Math.abs(z-v.z)>I)continue;const O=be(k,z);te.setY(F,O);const q=ie.clone().lerp(Lt,Xn(-1.7,.05,O)).lerp(Wt,Xn(.02,2,O));q.multiplyScalar(.88+bo(k*2,z*2)*.18),q.toArray(Yt,F*3)}te.needsUpdate=!0,D.attributes.color.needsUpdate=!0,D.computeVertexNormals(),D.computeBoundingBox(),D.computeBoundingSphere(),J.terrainUpdates++}const K=ka(s+9,!0);y.push(K),j.mossRock.map=K,j.compost.map=K,j.darkFruit.map=K;const ot=new Si(266*ge,266*ge,88,88),at=new uv(ot,{textureWidth:512,textureHeight:512,waterNormals:ct,sunDirection:new L(.6,.8,-.3),sunColor:16771517,waterColor:3039835,distortionScale:2.5,alpha:.91,fog:!0});at.name="Reflecting creek",at.rotation.x=-Math.PI/2,at.position.y=Fi,at.material.transparent=!0,at.material.depthWrite=!1,at.renderOrder=-2,at.material.uniforms.size.value=4.8,l.add(at);const rt=at.onBeforeRender;let Ut=0;at.onBeforeRender=function(v,I,F){if(at.material.uniforms.eye.value.setFromMatrixPosition(F.matrixWorld),Ut++%2){J.reflectionSkips++;return}J.reflectionRenders++,rt.call(this,v,I,F)};const lt=ot.attributes.position.array.slice(),bt=[],Ct=new pe,mt=[];Ct.name="Willow trunks and tangled roots",l.add(Ct);for(let v of[-1,1])for(let I=0;I<15;I++){const F=(-122+I*17+(a()-.5)*7)*ge,k=(v*(59+a()*15)+Math.sin(F/ge*.032)*15)*ge,{x:z,z:O}=r.toWorld(k,F),q=be(z,O);if(q<.2)continue;const H=new pe;H.position.set(z,q,O);const nt=9+a()*14,dt=(a()-.5)*3,Tt=je([[0,-.8,0],[.25,nt*.3,0],[dt,nt*.72,.6],[dt*.8,nt,1]],.68+a()*.65,j.bark,13,.72);Tt.castShadow=!0,H.add(Tt),bt.push(Tt.geometry);for(let Xt=0;Xt<5;Xt++){const It=Xt/5*Le+a(),zt=3+a()*4,se=je([[0,.7,0],[Math.cos(It)*zt*.45,.1,Math.sin(It)*zt*.45],[Math.cos(It)*zt,-.4,Math.sin(It)*zt]],.15+a()*.2,j.bark,9,.82);se.castShadow=!0,H.add(se),bt.push(se.geometry)}for(let Xt=0;Xt<4;Xt++){const It=a()*Le,zt=nt*(.5+a()*.3),se=3+a()*6,Re=je([[dt*.4,zt,0],[Math.cos(It)*se*.45,zt+2,Math.sin(It)*se*.45],[Math.cos(It)*se,zt+3,Math.sin(It)*se]],.16+a()*.2,j.bark,10,.83);H.add(Re),bt.push(Re.geometry);for(let Ce=0;Ce<70;Ce++){const me=Math.sqrt(a())*4,tn=a()*Le;mt.push({x:z+Math.cos(It)*se+Math.cos(tn)*me,y:q+zt+3+(a()-.5)*3-Math.abs(me)*.25,z:O+Math.sin(It)*se+Math.sin(tn)*me,angle:a()*Le,scale:.65+a()*.6})}}Ct.add(H)}qn(Ct,bt);const At=new Te;At.setAttribute("position",new Vt([0,0,0,-.12,-.32,.035,0,-.38,.06,.12,-.32,.035,-.1,-.64,.02,0,-.76,.04,.1,-.64,.02,0,-1.05,0],3)),At.setAttribute("uv",new Vt([.5,0,0,.3,.5,.35,1,.3,0,.6,.5,.7,1,.6,.5,1],2)),At.setIndex([0,1,2,0,2,3,1,4,2,2,4,5,2,5,6,2,6,3,4,7,5,5,7,6]),At.computeVertexNormals(),Wl(At,"#69834d",.25,s);const Zt=Mr(At,j.plant,mt,"Hanging willow foliage");mt.forEach((v,I)=>{ft.position.set(v.x,v.y,v.z),ft.rotation.set((a()-.5)*.8,v.angle,(a()-.5)*.7),ft.scale.setScalar(v.scale),ft.updateMatrix(),Zt.setMatrixAt(I,ft.matrix)}),Zt.finish(),l.add(Zt.group),J.spatialChunks+=Zt.meshes.length;function kt(v){C.push(v);const I=Math.floor((v.x-v.radius)/N),F=Math.floor((v.x+v.radius)/N),k=Math.floor((v.z-v.radius)/N),z=Math.floor((v.z+v.radius)/N);for(let O=I;O<=F;O++)for(let q=k;q<=z;q++){const H=O+":"+q;U.has(H)||U.set(H,[]),U.get(H).push(v)}return v}const wt=[],he=[[],[],[]];function G(v,I,F=1.35+a()*.9){const k=kt({id:"p"+C.length,type:"lily",x:v,z:I,y:.105,radius:F*.91,visualRadius:F,angle:a()*Le,phase:a()*Le});return wt.push(k),k}function vt(v,I,F=1.3+a()*1.3,k=.65+a()*.65){const z=Math.floor(a()*3),O=kt({id:"p"+C.length,type:"rock",x:v,z:I,y:k*.76-.05,radius:F*.72,visualRadius:F,scaleY:k,angle:a()*Le,variant:z});return he[z].push(O),O}const Et=r.toWorld(3.7,1),Ft=r.toWorld(-3.9,2.2);if(G(0,0,3.1),G(Et.x,Et.z,2.3),vt(Ft.x,Ft.z,2.5,.9),c){const v=u.find(I=>I.id==="pond").findPoint;G(v.x,v.z,1.7)}function gt(v,I){const F=Math.hypot(I.x-v.x,I.z-v.z),k=Math.ceil(F/3.65),z=r.toSource(v.x,v.z),O=r.toSource(I.x,I.z);for(let q=1;q<k;q++){const H=q/k,{x:nt,z:dt}=r.toWorld(z.x+(O.x-z.x)*H+Math.sin(H*Math.PI*3)*1.25,z.z+(O.z-z.z)*H);if(be(nt,dt)>-.1)continue;const Tt=r.toSource(nt,dt);c&&Tt.x>14&&Tt.x<32&&Math.abs(Tt.z+16)<3.7||(a()<.18?vt(nt,dt,1.8+a()*.7,.65+a()*.55):G(nt,dt,1.65+a()*.65))}}const ut={id:"origin",x:0,z:0},Ot=new Map(le.map(v=>[v.id,v]));Ot.set("origin",ut);const Oe=[["origin","home"],["origin","foxglove"],["home","mudfang"],["home","quietbend"],["mudfang","reedcrossing"],["reedcrossing","redreed"],["reedcrossing","thornback"],["foxglove","mossjaw"],["quietbend","mossjaw"],["quietbend","eastshallows"],["mossjaw","longreed"],["longreed","blackpool"],["longreed","oldwillow"],["eastshallows","blackpool"],["redreed","thornback"]].map(([v,I])=>({from:v,to:I,start:Ot.get(v),end:Ot.get(I)}));for(const v of Oe)gt(v.start,v.end);if(c){const v=I=>u.find(F=>F.id===I);for(const[I,F]of[[ut,v("creek")],[v("creek"),v("roots")],[v("roots"),v("bank")],[v("bank"),p]])gt(I,F)}for(let v=0;v<1180;v++){const I=(a()-.5)*218*ge,F=((a()-.5)*108+Math.sin(I/ge*.032)*10)*ge,{x:k,z}=r.toWorld(F,I);if(be(k,z)>-.18)continue;const O=r.toSource(k,z);c&&O.x>14&&O.x<32&&Math.abs(O.z+16)<3.7||(U.get(Math.floor(k/N)+":"+Math.floor(z/N))||[]).some(H=>Math.hypot(H.x-k,H.z-z)<H.radius+1)||(a()<.15?vt(k,z,1.1+a()*2.3,.55+a()*1.2):G(k,z,1.1+a()*1.1))}for(const v of le)kt({id:"island-"+v.id,type:"land",x:v.x,z:v.z,y:v.elevation,radius:v.radius*.8});const ve=Mr($t,j.leaf,wt,"Veined water lily leaves",{castShadow:!0,receiveShadow:!0,dynamic:!0});wt.forEach((v,I)=>{ft.position.set(v.x,v.y,v.z),ft.rotation.set((a()-.5)*.04,v.angle,(a()-.5)*.035),ft.scale.set(v.visualRadius,1,v.visualRadius*(.89+a()*.18)),ft.updateMatrix(),ve.setMatrixAt(I,ft.matrix),ve.setColorAt(I,on(["#b6cf8a","#88ac67","#749d59","#c0cc7e","#729958"][Math.floor(a()*5)]))}),ve.finish(),l.add(ve.group),J.spatialChunks+=ve.meshes.length,he.forEach((v,I)=>{const F=Mr(Mt[I],I===1?j.mossRock:j.rock,v,"Weathered waterline outcrops",{castShadow:!0,receiveShadow:!0});v.forEach((k,z)=>{ft.position.set(k.x,-.05,k.z),ft.rotation.set(0,k.angle,0),ft.scale.set(k.visualRadius,k.scaleY,k.visualRadius),ft.updateMatrix(),F.setMatrixAt(z,ft.matrix),F.setColorAt(z,on("#ffffff").multiplyScalar(.7+a()*.4))}),F.finish(),l.add(F.group),J.spatialChunks+=F.meshes.length});const yn=new Te,Pn=[],sr=[],Qn=[];for(let v=0;v<=9;v++){const I=v/9,F=Math.sin(I*Math.PI)*.16;for(const k of[-1,1])Pn.push(k*F,.13*Math.sin(I*Math.PI)+.23*I*I,I*.65),sr.push(k*.5+.5,I)}for(let v=0;v<9;v++){const I=v*2;Qn.push(I,I+1,I+2,I+1,I+3,I+2)}yn.setAttribute("position",new Vt(Pn,3)),yn.setAttribute("uv",new Vt(sr,2)),yn.setIndex(Qn),yn.computeVertexNormals();const rr=new Ve({color:"#f4e5d5",roughness:.48,side:Fe}),or=wt.filter((v,I)=>I%23===5),ji=new Tn(yn,rr,or.length*13);let gs=0;for(const v of or)for(let I=0;I<13;I++)ft.position.set(v.x+.24,v.y+.045,v.z),ft.rotation.set(I>7?.1:0,I/8*Le,I>7?.1:0),ft.scale.setScalar(I>7?.67:1),ft.updateMatrix(),ji.setMatrixAt(gs++,ft.matrix);l.add(ji);const Ri=[];for(let v=0;v<26e3;v++){const I=(a()-.5)*254*ge,F=(a()-.5)*254*ge,k=be(I,F);k<-.52||k>3.2||le.some(z=>Math.hypot(z.x-I,z.z-F)<z.radius*.68)||Math.hypot(I,F)<8||Ri.push({x:I,z:F,y:k,scale:.65+a()*2.2,angle:a()*Le})}const xs=Xl(44),ti=Mr(xs,j.plant,Ri,"Curved river reeds",{receiveShadow:!0});Ri.forEach((v,I)=>{ft.position.set(v.x,v.y,v.z),ft.rotation.set(0,v.angle,0),ft.scale.set(.65+v.scale*.25,v.scale,.65+v.scale*.25),ft.updateMatrix(),ti.setMatrixAt(I,ft.matrix),ti.setColorAt(I,on("#ffffff").multiplyScalar(.75+a()*.5))}),ti.finish(),l.add(ti.group),J.spatialChunks+=ti.meshes.length;const vs=Ri.filter((v,I)=>v.y<.5&&I%5===0),jo=Gv(),Ci=Mr(jo,j.plant,vs,"Cattail patches");vs.forEach((v,I)=>{ft.position.set(v.x+.12,v.y,v.z),ft.rotation.set(0,v.angle,0),ft.scale.setScalar(.7+v.scale*.4),ft.updateMatrix(),Ci.setMatrixAt(I,ft.matrix)}),Ci.finish(),l.add(Ci.group),J.spatialChunks+=Ci.meshes.length;const Hr={value:0};j.plant.onBeforeCompile=v=>{v.uniforms.uCreekTime=Hr,v.vertexShader=`uniform float uCreekTime;
`+v.vertexShader,v.vertexShader=v.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 transformed.x += sin(uCreekTime * 1.1 + position.y * 2.3 + instanceMatrix[3].x * .13 + instanceMatrix[3].z * .17) * pow(max(position.y, 0.0), 1.6) * .035;`)},j.plant.customProgramCacheKey=()=>"creek-wind-1";function Ki(v,I){const F=c?x-.065:-.1;let k=P(v,I),z=k>F?"land":"water",O=null;k<=F&&(k=c?x-.215:-.25);const q=U.get(Math.floor(v/N)+":"+Math.floor(I/N))||[];for(const H of q){if(H.type==="land")continue;const nt=Math.hypot(v-H.x,I-H.z);if(nt<=H.radius){let dt=H.y;if(H.type==="rock"&&(dt-=Xn(H.radius*.62,H.radius,nt)*.14*H.scaleY),c&&dt<=F)continue;dt>k&&(k=dt,z=H.type==="shelter"?"land":H.type,O=H)}}return Pv(g,v,I)||{height:k,type:z,platform:O}}function ar(v,I){return Ki(v,I).height}const _s=[{x:4.5/ge,z:-4/ge,rich:!1},{x:-10,z:12,rich:!0},{x:15,z:-20,rich:!1},{x:-25,z:-23,rich:!0},{x:26,z:-47,rich:!0},{x:-17,z:40,rich:!0},{x:27,z:69,rich:!0},{x:-4,z:-81,rich:!0},{x:-34,z:86,rich:!0},{x:23,z:26,rich:!1},{x:-33,z:7,rich:!1},{x:4,z:51,rich:!1},{x:9,z:-59,rich:!1},{x:-12,z:76,rich:!1},{x:39,z:-4,rich:!1},{x:-42,z:-59,rich:!0},{x:7,z:-39,rich:!0},{x:0,z:63,rich:!0},{x:53,z:33,rich:!0},{x:-24,z:17,rich:!1},{x:17,z:-70,rich:!1},{x:18,z:90,rich:!0}].map(v=>({...v,...r.toWorld(v.x*ge,v.z*ge)}));if(c)for(const[v,I]of[{x:4.5,z:-4},{x:18,z:14},{x:9,z:-24},{x:26,z:10},{x:31,z:-16},{x:-20,z:-8}].entries())Object.assign(_s[v],r.toWorld(I.x,I.z));const T=[],$=[],tt=[],et=new pe;l.add(et);for(let v=0;v<_s.length;v++){const I=_s[v];be(I.x,I.z)<-.15&&vt(I.x,I.z,I.rich?3.2:2.2,.62);const k=ar(I.x,I.z),z={id:"flies-"+v,x:I.x,z:I.z,y:k+.25,flies:I.rich?240:100,maxFlies:I.rich?240:100,rich:I.rich};if(c){const q=[...u].sort((H,nt)=>Math.hypot(I.x-H.x,I.z-H.z)-Math.hypot(I.x-nt.x,I.z-nt.z))[0]?.id||"creek";z.ecology={habitat:q,activity:1},z.regenMultiplier=1}R.push(z);const O=new ne(Mt[v%3],j.compost);O.position.set(I.x,k+.05,I.z),O.scale.set(I.rich?1.7:1.05,.28,I.rich?1.25:.75),O.rotation.y=a()*Le,l.add(O),$.push(O);for(let q=0;q<(I.rich?12:6);q++){const H=a()*Le,nt=a()*(I.rich?1.5:.85),dt=.12+a()*.16;T.push({spot:v,groundOffset:dt,x:I.x+Math.cos(H)*nt,y:k+dt,z:I.z+Math.sin(H)*nt,scale:.12+a()*.18,rot:a()*Le})}for(let q=0;q<3;q++){const H=a()*Le,nt=.7+a()*.8,dt=je([[0,0,0],[nt*.5,.02,.06],[nt,.04,.14]],.035,j.bark,4);dt.position.set(I.x+(a()-.5)*1.6,k+.1,I.z+(a()-.5)*1.6),dt.rotation.y=H,et.add(dt),tt.push(dt.geometry)}}qn(et,tt);for(const v of _s)if(be(v.x,v.z)<-.15){const I=he.flat().find(F=>Math.abs(F.x-v.x)<.01&&Math.abs(F.z-v.z)<.01);if(I){const F=new ne(Mt[I.variant],j.mossRock);F.position.set(I.x,-.05,I.z),F.rotation.y=I.angle,F.scale.set(I.visualRadius,I.scaleY,I.visualRadius),F.castShadow=!0,F.receiveShadow=!0,l.add(F)}}const Z=new Tn(Ee,j.fruit,T.length);T.forEach((v,I)=>{ft.position.set(v.x,v.y,v.z),ft.rotation.set(.3,v.rot,.2),ft.scale.setScalar(v.scale),ft.updateMatrix(),Z.setMatrixAt(I,ft.matrix),Z.setColorAt(I,on(["#cb9d59","#6d7341","#aa7044","#c5ad62"][I%4]))}),l.add(Z);const xt=[];for(let v=0;v<R.length;v++)for(let I=0;I<(R[v].rich?65:30);I++)xt.push({spot:v,phase:a()*Le,phase2:a()*Le,r:.25+a()*(R[v].rich?2.3:1.35),height:.45+a()*1.9,speed:.65+a()*1.7,rank:I});const Dt=R.map(()=>[]);for(const v of xt)Dt[v.spot].push(v);const Bt=new Ve({vertexColors:!0,roughness:.45,side:Fe}),Pt=new Tn(Wv(),Bt,xt.length);Pt.instanceMatrix.setUsage(Mi),Pt.frustumCulled=!1,Pt.name="Fly swarms",Pt.count=0,l.add(Pt);const jt=c?Nv({group:l,layout:r,terrainHeight:P,surface:Ki,insertPlatform:kt,materials:j,rockGeos:Mt,tube:je,leafGeometry:ki,bladeGeometry:Xl,geography:h}):null;jt&&m.push(...jt.grips);function re(v,I){return c&&Ki(v,I).type==="water"?zv(r,v,I,b.flow):{x:0,z:0,strength:0}}function Kt(v,I){return c&&f.some(F=>Math.hypot(v-F.x,I-F.z)<F.radius*.85)&&P(v,I)>x-.5}function ye(v){x=v,at.position.y=v,at.updateMatrix(),ji.position.y=v-Fi,ji.updateMatrix();for(const I of wt)I.y=.105+v-Fi}function ze(v={}){if(!c)return!1;b={...b,...v.phase||{}},d=Fi+Hi(Number(b.waterOffset)||0,-.75,.65),M||(ye(d),M=!0);for(const F of R){const k=F.ecology?.habitat===b.foodShift?1.4:typeof b.foodShift=="string"?.45:1;F.regenMultiplier=k,F.ecology.activity=k}const I=v.nest;if(I&&Number.isFinite(I.x)&&Number.isFinite(I.z)){const F={id:"living-creek-nest",x:I.x,z:I.z,team:"ally",natural:!0,nestLevel:I.level??0,safe:I.safe,hp:1,maxHp:1};_?ta(_,F):_=Vr(F)}return jt.sync(v,x),!0}const Be=64,Ne=new Si(2,2),we=new Tp;Ne.rotateX(-Math.PI/2),we.index=Ne.index,we.attributes.position=Ne.attributes.position,we.attributes.uv=Ne.attributes.uv;const Jt=new Float32Array(Be*3),We=new Float32Array(Be).fill(-100),Ae=new Float32Array(Be),gn=new Float32Array(Be*3);we.setAttribute("aCenter",new Hs(Jt,3)),we.setAttribute("aStart",new Hs(We,1)),we.setAttribute("aSize",new Hs(Ae,1)),we.setAttribute("aTint",new Hs(gn,3)),we.instanceCount=Be;const hi=new Bn({transparent:!0,depthWrite:!1,side:Fe,uniforms:{uTime:{value:0}},vertexShader:"attribute vec3 aCenter; attribute float aStart; attribute float aSize; attribute vec3 aTint; uniform float uTime; varying vec2 vUv; varying float vLife; varying vec3 vTint; void main(){vUv=uv; vLife=(uTime-aStart)/2.4; vTint=aTint; vec3 p=position*aSize*(.35+clamp(vLife,0.,1.)*3.8)+aCenter; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}",fragmentShader:"varying vec2 vUv;varying float vLife;varying vec3 vTint;void main(){if(vLife<0.||vLife>1.)discard;float r=length(vUv-.5)*2.;float band=exp(-pow((r-.82)/(.026+vLife*.018),2.))* .58+exp(-pow((r-.64)/.026,2.))*.22;float a=band*pow(1.-vLife,1.6);gl_FragColor=vec4(vTint,a);}"}),fn=new ne(we,hi);fn.frustumCulled=!1,fn.renderOrder=2,l.add(fn);let Ji=0,Xe=0;const Qe=1100,sn=new Float32Array(Qe*3),hn=new Float32Array(Qe*3),pn=new Float32Array(Qe),Pi=new Float32Array(Qe),ei=Array.from({length:Qe},()=>({life:0,max:1,vx:0,vy:0,vz:0,water:!0}));let Ju=0;const ui=new Te;ui.setAttribute("position",new an(sn,3).setUsage(Mi)),ui.setAttribute("aColor",new an(hn,3).setUsage(Mi)),ui.setAttribute("aSize",new an(pn,1).setUsage(Mi)),ui.setAttribute("aAlpha",new an(Pi,1).setUsage(Mi));const Qu=new Bn({transparent:!0,depthWrite:!1,uniforms:{uScale:{value:500}},vertexShader:"attribute vec3 aColor;attribute float aSize;attribute float aAlpha;uniform float uScale;varying vec3 vColor;varying float vAlpha;void main(){vColor=aColor;vAlpha=aAlpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*uScale/max(.1,-mv.z),1.,35.);}",fragmentShader:"varying vec3 vColor;varying float vAlpha;void main(){vec2 p=gl_PointCoord-.5;float d=length(p)*2.;if(d>1.)discard;float shade=.6+.4*max(0.,1.-length(p-vec2(-.12,.12))*2.);gl_FragColor=vec4(vColor*shade,smoothstep(1.,.55,d)*vAlpha);}"}),Ko=new ip(ui,Qu);Ko.frustumCulled=!1,Ko.renderOrder=3,l.add(Ko);function td(v,I,F){const k=Ji++%Be;Jt.set([v.x,c?(v.y??x)+.025:Math.max(-.005,(v.y??0)+.025),v.z],k*3),We[k]=Xe,Ae[k]=.7+I*.7,on(F??"#c2e1d5").toArray(gn,k*3);for(const O of["aCenter","aStart","aSize","aTint"])we.attributes[O].needsUpdate=!0}function wc(v,I,F,k){const z=Math.min(90,Math.round(18+I*21)),O=on(F??(k?"#b2d7ce":"#d5bc80"));for(let q=0;q<z;q++){const H=Ju++%Qe,nt=ei[H],dt=a()*Le,Tt=(.6+a()*2.7)*Math.sqrt(I);nt.life=nt.max=.5+a()*.8,nt.vx=Math.cos(dt)*Tt,nt.vz=Math.sin(dt)*Tt,nt.vy=(1.5+a()*4)*Math.sqrt(I),nt.water=k,sn.set([v.x+(a()-.5)*.3,(v.y??0)+.12,v.z+(a()-.5)*.3],H*3),O.clone().multiplyScalar(.85+a()*.3).toArray(hn,H*3),pn[H]=(.045+a()*.085)*(k?1:.8),Pi[H]=.9}ui.attributes.aColor.needsUpdate=!0,ui.attributes.aSize.needsUpdate=!0}function ed(v,I=1,F){I=Hi(I,.1,4),td({x:v.x,y:c?x+.01:.01,z:v.z},I,F),wc({x:v.x,y:c?x+.03:.03,z:v.z},I,F,!0)}function nd(v,I="#e9cb87",F=1){wc(v,F,I,!1)}function Ec(v,I,F,k=1){const z=[],O=[],q=[],H=[],nt=wi(k),dt=16,Tt=20;for(let It=0;It<=dt;It++)for(let zt=0;zt<=Tt;zt++){const se=zt/Tt*2-1,Re=It/dt,Ce=.5+Math.sqrt(Math.max(0,1-se*se))*F+.06*Math.sin(Re*23+se*5),me=se*v*(.97+.025*Math.sin(Re*19));z.push(me,Ce,(Re-.5)*I),O.push(zt/Tt,It/dt),on("#809549").multiplyScalar(.85+nt()*.23).toArray(H,H.length)}for(let It=0;It<dt;It++)for(let zt=0;zt<Tt;zt++){const se=It*(Tt+1)+zt,Re=se+Tt+1;q.push(se,Re,se+1,Re,Re+1,se+1)}const Xt=new Te;return Xt.setAttribute("position",new Vt(z,3)),Xt.setAttribute("uv",new Vt(O,2)),Xt.setAttribute("color",new Vt(H,3)),Xt.setIndex(q),Xt.computeVertexNormals(),Xt}function Jo(v,I,F){const k=new pe,z=new Ve({color:"#a6bf76",map:Y,vertexColors:!0,roughness:.78,side:Fe});F.push(z);const O=Ec(1.75,3.8,1.95,s+Math.round(v*7));F.push(O);const q=new ne(O,z);q.castShadow=!0,q.receiveShadow=!0,k.add(q);for(let H=0;H<8;H++){const nt=-1.85+H*.53,dt=[];for(let Xt=0;Xt<=12;Xt++){const It=Xt/12*Math.PI;dt.push([Math.cos(It)*1.75,.5+Math.sin(It)*1.96+.025,nt+.025*Math.sin(It*4)])}const Tt=je(dt,.038,j.reed,18);F.push(Tt.geometry),k.add(Tt)}for(let H of[-1,1])for(let nt=0;nt<5;nt++){const dt=-1.6+nt*.8,Tt=je([[H*1.68,-.08,dt],[H*1.7,.45,dt],[H*1.38,1.5,dt]],.052,j.bark,5);F.push(Tt.geometry),k.add(Tt)}for(let H=0;H<7;H++){const nt=.16+H*.12,dt=je([[-1.65,nt,-1.8],[0,nt+.025,-1.88],[1.65,nt,-1.8]],.036,j.reed,8);F.push(dt.geometry),k.add(dt)}return qn(k,F,new Set([q])),k.scale.setScalar(v),k.userData.roof=q,k}const lr={player:"#8ecf75",friendly:"#8ecf75",ally:"#8ecf75",enemy:"#cf7554",neutral:"#ceb785"};function Ms(v){if(typeof v=="string"&&v.startsWith("enemy")){const I=["#e8aa70","#d8786b","#b9ad81","#a9a0d4","#8dc2b8"],F=parseInt(v.replace(/\D/g,""),10)||0;return I[F%I.length]}return lr[v]||lr.neutral}const Qo=new Map;function Gr(v){if(Qo.has(v))return Qo.get(v);const I=["player","ally","friendly"].includes(v),F=v==="neutral",k=(parseInt(String(v).replace(/\D/g,""),10)||0)%5,z=yc(256,(O,q)=>{O.fillStyle="#eee9cb",O.fillRect(0,0,q,q);for(let nt=0;nt<256;nt+=4)O.fillStyle=nt%8?"#ded9bd":"#f3eed3",O.fillRect(nt,0,1,q),O.fillRect(0,nt,q,1);O.save(),O.translate(38,23),O.scale(2.8,2.8),O.fillStyle=I?"#194333":F?"#494633":"#472c29",O.strokeStyle="#fff2c9",O.lineWidth=2,O.beginPath(),O.moveTo(32,3),O.lineTo(59,14),O.lineTo(56,44),O.quadraticCurveTo(53,55,32,68),O.quadraticCurveTo(11,55,8,44),O.lineTo(5,14),O.closePath(),O.fill(),O.stroke(),O.lineWidth=3.2,O.lineCap="round",O.lineJoin="round";const H=nt=>{O.beginPath(),nt.forEach((dt,Tt)=>Tt?O.lineTo(...dt):O.moveTo(...dt)),O.stroke()};if(I)O.beginPath(),O.moveTo(43,20),O.bezierCurveTo(28,17,18,26,21,38),O.bezierCurveTo(24,48,35,47,40,37),O.bezierCurveTo(43,30,40,24,43,20),O.stroke(),H([[20,51],[37,27]]),H([[28,40],[23,32]]),H([[32,35],[39,34]]);else if(F)H([[24,27],[32,19],[40,27]]),H([[32,19],[32,49]]),H([[23,40],[32,49],[41,40]]);else if(k===0)H([[20,19],[27,31],[22,44]]),H([[44,19],[37,31],[42,44]]),H([[28,46],[36,46]]);else if(k===1)H([[22,18],[18,36],[32,49],[46,36],[42,18]]),H([[25,30],[32,36],[39,30]]);else if(k===2)for(const[nt,dt]of[[21,20],[32,15],[43,20]])H([[nt,dt],[nt,49]]),H([[nt-4,dt+6],[nt+4,dt+6]]);else k===3?(O.beginPath(),O.moveTo(44,17),O.bezierCurveTo(15,9,11,48,32,52),O.bezierCurveTo(39,53,44,50,47,45),O.bezierCurveTo(29,43,26,26,44,17),O.stroke()):H([[18,24],[25,30],[32,17],[39,30],[46,24],[41,46],[23,46],[18,24]]);O.restore()});return z.wrapS=z.wrapT=Gi,Qo.set(v,z),y.push(z),z}function id(v,I,F=0){const k=new pe;k.name="Woven reed courtyard and rooted foundations";const z=5.68;for(let O=0;O<43;O++){const q=-5.58+O*.266,H=Math.sqrt(Math.max(0,z*z-q*q))*(.97+.02*Math.sin(O*1.7)),nt=je([[-H,-.045,q],[-H*.25,-.035,q+.022],[H*.4,-.04,q-.018],[H,-.045,q+.015]],.077,j.bark,7);nt.receiveShadow=!0,I.push(nt.geometry),k.add(nt)}for(let O=0;O<25;O++){const q=-5.4+O*.45,H=Math.sqrt(Math.max(0,z*z-q*q))*.98,nt=je([[q,.018,-H],[q+.025,.028,0],[q-.018,.02,H]],.027,j.reed,10);I.push(nt.geometry),k.add(nt)}for(let O=0;O<16;O++){const q=O/16*Le,H=Math.cos(q)*5.1,nt=Math.sin(q)*5.1,dt=(P(v.position.x+(H*Math.cos(F)+nt*Math.sin(F))*ee,v.position.z+(nt*Math.cos(F)-H*Math.sin(F))*ee)-v.position.y)/ee,Tt=je([[H,Math.min(-.18,dt-.15),nt],[H+.03,-.35,nt-.02],[H,-.08,nt]],.095,j.bark,5);I.push(Tt.geometry),k.add(Tt)}qn(k,I),v.add(k),v.userData.foundation=k}function sd(v,I){const F=new pe,k=je([[0,0,0],[.04,1.6,0],[-.03,3.1,.02]],.047,j.bark,7);I.push(k.geometry),F.add(k);const z=new Te,O=[0,2.93,0,.9,2.8,.09,1.13,2.12,.02,.6,2.25,-.03,0,2.18,0],q=[0,1,1,1,1,0,.5,.1,0,0];z.setAttribute("position",new Vt(O,3)),z.setAttribute("uv",new Vt(q,2)),z.setIndex([0,1,3,1,2,3,0,3,4]),z.computeVertexNormals();const H=new Ve({color:Ms(v),roughness:.8,side:Fe,map:Gr(v)}),nt=new ne(z,H);return nt.castShadow=!0,F.add(nt),F.userData.flag=nt,F.userData.emblemTeam=v,I.push(z,H),F}function rd(v,I,F){const k=vv,z=_v,O=Oo,q=.11,H=new pe;H.name="Enclosed creek castle",v.add(H);const nt=new pe;nt.name="Reinforced castle perimeter",v.add(nt);const dt=Math.asin((z/2+.25)/k),Tt=44,Xt=(Le-dt*2)/Tt,It=[],zt=[],se=2*(k+.65)*Math.tan(Xt/2)+.08;for(let it=0;it<Tt;it++){const St=dt+Xt*(it+.5),oe=Math.sin(St)*k,Ze=Math.cos(St)*k;It.push({x:oe,z:Ze,y:q+O/2,w:se,h:O,d:Mv,ry:St});for(const He of[-.29,.29]){const fe=St+Xt*He;It.push({x:Math.sin(fe)*k,z:Math.cos(fe)*k,y:q+O+.37,w:.76,h:.74,d:1.2,ry:fe})}zt.push({x:Math.sin(St)*(k+.64),z:Math.cos(St)*(k+.64),y:q+1.65,w:se*.7,h:3.1,d:.5,ry:St}),zt.push({x:Math.sin(St)*(k+.4),z:Math.cos(St)*(k+.4),y:q+3.5,w:se*1.01,h:.28,d:.9,ry:St})}const Re=[Math.PI/4,Math.PI*3/4,Math.PI*5/4,Math.PI*7/4],Ce=[];for(const it of Re){const St=Math.sin(it)*(k+.15),oe=Math.cos(it)*(k+.15);Ce.push({x:St,z:oe});for(let Ze=0;Ze<10;Ze++){const He=Ze/10*Le;It.push({x:St+Math.sin(He)*1.42,z:oe+Math.cos(He)*1.42,y:q+6.15,w:.6,h:.85,d:.66,ry:He})}}for(const it of[-1,1])It.push({x:it*(z/2+.62),z:k,y:q+2.8,w:1.24,h:5.6,d:2}),It.push({x:it*(z/2+.62),z:k,y:q+5.95,w:1.6,h:.7,d:2.35}),zt.push({x:it*(z/2+.62),z:k+1.05,y:q+2.4,w:1.32,h:4.8,d:.25});It.push({x:0,z:k,y:q+4.85,w:z+1.2,h:.78,d:1.75});const me=(it,St,oe,Ze)=>{const He=new $i(1,1,1),fe=new Tn(He,Ze,oe.length);return F.push(He),fe.name=St,fe.castShadow=!0,fe.receiveShadow=!0,oe.forEach((en,xd)=>{ft.position.set((en.x||0)/ee,(en.y||0)/ee,(en.z||0)/ee),ft.rotation.set(en.rx||0,en.ry||0,en.rz||0),ft.scale.set(en.w/ee,en.h/ee,en.d/ee),ft.updateMatrix(),fe.setMatrixAt(xd,ft.matrix)}),it.add(fe),fe},tn=me(H,"Continuous moss-stone walls and crenellations",It,j.mossRock);tn.userData.fullCount=It.length,tn.userData.firstCoursesCount=Tt*3,me(nt,"Whole-ring stone buttresses and gate reinforcement",zt,j.rock);const Je=new Or(1,1.12,1,12,1),rn=new Tn(Je,j.mossRock,4);F.push(Je),rn.name="Four castle defence towers",rn.castShadow=!0,rn.receiveShadow=!0,Ce.forEach((it,St)=>{ft.position.set(it.x/ee,(q+2.9)/ee,it.z/ee),ft.rotation.set(0,Re[St],0),ft.scale.set(1.65/ee,5.8/ee,1.65/ee),ft.updateMatrix(),rn.setMatrixAt(St,ft.matrix)}),H.add(rn);const mn=ki(1,1,.28),xn=new Tn(mn,j.leaf,4);F.push(mn),xn.name="Folded leaf tower roofs",xn.castShadow=!0,Ce.forEach((it,St)=>{ft.position.set(it.x/ee,(q+6.68)/ee,it.z/ee),ft.rotation.set(0,Re[St],0),ft.scale.set(2/ee,2.4/ee,2/ee),ft.updateMatrix(),xn.setMatrixAt(St,ft.matrix)}),H.add(xn);const Hn=new pe;Hn.name="Working south castle gate",Hn.position.set(0,q/ee,k/ee),H.add(Hn);const ys=[];for(const it of[-1,1]){const St=new pe;St.position.x=it*z/(2*ee),St.name=it<0?"Left hinged gate":"Right hinged gate",Hn.add(St);const oe=[],Ze=[],He=z/2;for(let fe=0;fe<7;fe++)oe.push({x:-it*((fe+.5)*He/7),y:O/2,z:0,w:He/7+.025,h:O-.08,d:.36});for(const fe of[.65,1.9,3.2])Ze.push({x:-it*He/2,y:fe,z:.23,w:He-.1,h:.22,d:.2});me(St,"Bound timber gate leaf",oe,j.bark),me(St,"Gate cross braces",Ze,j.reed),ys.push(St)}const Qi=new pe;Qi.name="Breached gate fallen slabs",Hn.add(Qi),me(Qi,"Broken gate timber",[{x:-1.45,y:.18,z:1.5,w:2.8,h:.3,d:3.5,ry:.18},{x:1.6,y:.23,z:.9,w:2.7,h:.35,d:3.2,ry:-.24}],j.bark);const hr=new Si(1.7/ee,1.9/ee),ur=new Ve({map:Gr(I.team),color:Ms(I.team),side:Fe,roughness:.85});F.push(hr,ur);const Ss=new ne(hr,ur);return Ss.name="Castle gate clan crest",Ss.position.set(0,(q+5.2)/ee,(k+1.02)/ee),H.add(Ss),v.userData.fortification=H,v.userData.palisade=nt,v.userData.gate=Hn,v.userData.gateLeaves=ys,v.userData.fallenGate=Qi,v.userData.gateCrest=Ss,v.userData.fortWalls=tn,v.userData.fortTowers=rn,v.userData.fortTowerRoofs=xn,v.userData.fortificationGeometry={radius:k,gateWidth:z,wallHeight:O,gateDirection:{x:0,z:1},towerCount:4},H}function od(v){const I=Jo(1,lr.ally,v);I.name="Stone keep beneath woven leaf roof",I.userData.groundWalls=[];const F=new pe;F.name="Enclosed central keep";const k=(z,O,q,H,nt,dt,Tt=j.mossRock)=>{const Xt=new $i(H,nt,dt),It=new ne(Xt,Tt);v.push(Xt),It.position.set(z,O,q),It.castShadow=!0,It.receiveShadow=!0,F.add(It),O-nt/2<.03&&I.userData.groundWalls.push({minX:z-H/2,maxX:z+H/2,minZ:q-dt/2,maxZ:q+dt/2,height:O+nt/2})};k(-1.6,.68,0,.26,1.36,3.45),k(1.6,.68,0,.26,1.36,3.45),k(0,.68,-1.65,3.05,1.36,.25);for(const z of[-1,1])k(z*1.14,.68,1.64,.9,1.36,.26);k(0,1.22,1.64,1.45,.28,.27);for(const z of[-1.23,1.23])for(const O of[-1.34,1.34]){k(z,1.36,O,.58,2.72,.58);for(const q of[-.2,.2])for(const H of[-.2,.2])k(z+q,2.83,O+H,.19,.3,.19,j.rock)}return qn(F,v),I.add(F),I}function Tc(v){const I=os+yo+3,F=z=>Math.hypot(z.x-v.x,z.z-v.z)<I,k=z=>[...A.values()].some(O=>Math.hypot(z.x-O.x,z.z-O.z)<os-2);Ri.forEach((z,O)=>{F(z)&&(ft.position.set(z.x,P(z.x,z.z),z.z),ft.rotation.set(0,z.angle,0),ft.scale.set(.65+z.scale*.25,z.scale,.65+z.scale*.25),k(z)&&ft.scale.setScalar(0),ft.updateMatrix(),ti.setMatrixAt(O,ft.matrix))}),ti.finish(),vs.forEach((z,O)=>{F(z)&&(ft.position.set(z.x+.12,P(z.x,z.z),z.z),ft.rotation.set(0,z.angle,0),ft.scale.setScalar(k(z)?0:.7+z.scale*.4),ft.updateMatrix(),Ci.setMatrixAt(O,ft.matrix))}),Ci.finish(),R.forEach((z,O)=>{F(z)&&(z.y=Ki(z.x,z.z).height+.25,$[O].position.y=z.y-.2,$[O].updateMatrix())}),T.forEach((z,O)=>{F(z)&&(ft.position.set(z.x,R[z.spot].y-.25+z.groundOffset,z.z),ft.rotation.set(.3,z.rot,.2),ft.scale.setScalar(z.scale),ft.updateMatrix(),Z.setMatrixAt(O,ft.matrix))}),Z.instanceMatrix.needsUpdate=!0,Z.computeBoundingBox(),Z.computeBoundingSphere()}function Ac(v,I){for(const z of A.values())if(Math.hypot(z.x-v,z.z-I)<.01)return z.elevation;const F=le.find(z=>Math.hypot(z.x-v,z.z-I)<.01);let k=F?Math.fround(F.elevation):Math.max(.35,ar(v,I));if(!F){const z=os+ae,O=Math.max(0,Math.floor((v-z+yt)/ae)),q=Math.min(216,Math.ceil((v+z+yt)/ae)),H=Math.max(0,Math.floor((I-z+yt)/ae)),nt=Math.min(216,Math.ceil((I+z+yt)/ae));for(let dt=H;dt<=nt;dt++)for(let Tt=O;Tt<=q;Tt++){const Xt=dt*Pe+Tt;Math.hypot(te.getX(Xt)-v,te.getZ(Xt)-I)<=z&&(k=Math.max(k,te.getY(Xt)))}}return k}function ad(v){const I=Ac(v.x,v.z),F={id:v.id,x:v.x,z:v.z,elevation:I};return A.set(v.id,F),w(F),Tc(F),F}function Vr(v,I={}){if((c||v.natural===!0)&&!I.preview){const it=kv(v,{terrainHeight:P,materials:j,rockGeos:Mt,tube:je,leafGeometry:ki,mergeStaticParts:qn,teamColor:Ms});return l.add(it),E.add(it),g.push(it.userData.refuge),it}const F=!!I.preview,k=F?null:ad(v),z=new pe;z.name="Shelter "+(v.id??""),z.position.set(v.x,k?.elevation??0,v.z),z.scale.setScalar(ee),z.userData.id=v.id,z.userData.radius=ds,z.userData.owned=[],z.userData.terrain=k;const O=z.userData.owned;id(z,O,Number.isFinite(v.yaw)?v.yaw:0),F||(z.userData.support=kt({id:"shelter-"+v.id,type:"shelter",x:v.x,z:v.z,y:z.position.y+.11,radius:ds-.2}),z.userData.landmark=kt({id:"castle-land-"+v.id,type:"land",x:v.x,z:v.z,y:z.position.y,radius:os+yo*.45})),rd(z,v,O);const q=od(O);q.position.set(-.55,.04,-.5),z.add(q),z.userData.core=q,z.userData.keepCollision={rects:q.userData.groundWalls.map(it=>({minX:(it.minX+q.position.x)*ee,maxX:(it.maxX+q.position.x)*ee,minZ:(it.minZ+q.position.z)*ee,maxZ:(it.maxZ+q.position.z)*ee,height:(it.height+q.position.y)*ee})),door:{x:q.position.x*ee,z:(q.position.z+1.64)*ee}};const H=sd(v.team,O);H.position.set(1.8,0,1.1),z.add(H),z.userData.banner=H;const nt=new pe;nt.name="Additional sleeping leaves";const dt=Jo(.62,lr[v.team],O);dt.position.set(-3,.01,.2),dt.rotation.y=-.5,nt.add(dt),z.add(nt),z.userData.extra=nt;const Tt=new pe;Tt.name="Hatchery";const Xt=Jo(.52,lr[v.team],O);Xt.position.set(3.05,0,-1.8),Xt.rotation.y=.7,Tt.add(Xt);for(let it=0;it<5;it++){const St=[];for(let Ze=0;Ze<=24;Ze++){const He=Ze/24*Le;St.push([3.05+Math.cos(He)*.74,.06+it*.065,-1.7+Math.sin(He)*.63])}const oe=je(St,.035,j.reed,25);O.push(oe.geometry),Tt.add(oe)}qn(Tt,O),z.add(Tt),z.userData.nursery=Tt;const It=new pe;It.name="Leaf training yard and woven sparring dummies",It.position.set(-2.9,.07,-3.2);for(let it=0;it<3;it++){const St=-.82+it*.8,oe=it%2?-.2:.2,Ze=new ne(ki(.46,.65,.04),j.leaf);Ze.position.set(St,.025,oe+.6),Ze.rotation.y=(it-1)*.35,O.push(Ze.geometry),It.add(Ze);for(const fe of[-.21,.21]){const en=je([[St+fe,-.02,oe-.25],[St+fe*.3,.48,oe-.3],[St,.96,oe-.25]],.035,j.bark,5);O.push(en.geometry),It.add(en)}const He=je([[St-.4,.64,oe-.2],[St,.72,oe-.28],[St+.4,.64,oe-.2]],.041,j.reed,6);O.push(He.geometry),It.add(He);for(let fe=0;fe<3;fe++){const en=new ne(ki(.23,.37,.15),j.leaf);en.position.set(St+(fe-1)*.06,.59,oe-.19),en.rotation.set(Math.PI/2,(fe-1)*.25,(fe-1)*.3),O.push(en.geometry),It.add(en)}for(const fe of[-.12,.12]){const en=je([[St+fe,.89,oe-.22],[St+fe*1.45,1.09,oe-.22],[St+fe*.5,1.07,oe-.19],[St+fe,.89,oe-.22]],.025,j.reed,10);O.push(en.geometry),It.add(en)}}for(const it of[-1.2,1.2]){const St=je([[it,-.04,-.65],[it*.98,.75,-.68],[it,.98,-.65]],.04,j.bark,5);O.push(St.geometry),It.add(St)}for(let it=0;it<2;it++){const St=je([[-1.2,.45+it*.28,-.65],[0,.38+it*.28,-.7],[1.2,.45+it*.28,-.65]],.025,j.reed,10);O.push(St.geometry),It.add(St)}qn(It,O),z.add(It),z.userData.training=It,z.userData.trainingPoint=new L(v.x-2.9*ee,z.position.y+.12,v.z-2.5*ee);const zt=new pe;zt.name="Leaf-wrapped food cache",zt.position.set(-2.8,.04,2.2);const se=new Tn(Ee,j.fruit,15);for(let it=0;it<15;it++)ft.position.set(it%4*.32-.5,Math.floor(it/8)*.25+.15,Math.floor(it/4)%2*.35),ft.scale.setScalar(.22+it%3*.025),ft.rotation.set(it*.7,it*.4,0),ft.updateMatrix(),se.setMatrixAt(it,ft.matrix),se.setColorAt(it,on(it%3?"#b7b06c":"#6d673f"));zt.add(se);for(let it=0;it<3;it++){const St=je([[-.85,.05,-.3+it*.45],[0,.02,-.3+it*.45],[.85,.08,-.3+it*.45]],.075,j.bark,5);O.push(St.geometry),zt.add(St)}const Re=new ne(ki(1,.8,.23),j.leaf);Re.position.set(0,.5,.1),Re.rotation.z=.17,O.push(Re.geometry),zt.add(Re),qn(zt,O),z.add(zt),z.userData.storage=zt,z.userData.foodMesh=se,z.userData.storageCover=Re;const Ce=new pe;Ce.name="Lookout perch",Ce.position.set(3.1,0,2.5);for(let it=0;it<3;it++){const St=it/3*Le,oe=je([[Math.cos(St)*.7,-.1,Math.sin(St)*.7],[Math.cos(St)*.44,1.4,Math.sin(St)*.44],[Math.cos(St)*.35,2.65,Math.sin(St)*.35]],.085,j.bark,7);O.push(oe.geometry),Ce.add(oe)}for(let it=0;it<8;it++){const St=-.6+it*.17,oe=je([[-.7,2.35,St],[0,2.32,St],[.7,2.36,St]],.06,j.reed,4);O.push(oe.geometry),Ce.add(oe)}const me=new ne(ki(1.1,.9,.08),j.leaf);me.position.y=3.15,me.rotation.x=.17,O.push(me.geometry),Ce.add(me);for(let it=0;it<6;it++){const St=je([[-.25,it*.34,.63],[.25,it*.34,.63]],.035,j.reed,2);O.push(St.geometry),Ce.add(St)}qn(Ce,O),z.add(Ce),z.userData.watchtower=Ce;const tn=new Tn(Mt[1],j.mossRock,25);for(let it=0;it<25;it++){const St=it/25*Le;ft.position.set(Math.cos(St)*2.15,-.12,Math.sin(St)*2.35-.5),ft.rotation.set(0,St,0),ft.scale.set(.25,.25,.25),ft.updateMatrix(),tn.setMatrixAt(it,ft.matrix)}z.add(tn);const Je=new pe;Je.name="Collapsed shelter remains";const rn=new Ve({color:"#839061",map:Y,roughness:.94,side:Fe});O.push(rn);for(let it=0;it<6;it++){const St=Ec(.62+it%3*.16,1.35+it%2*.55,.14+it%3*.05,s+it*19),oe=new ne(St,rn);oe.position.set(-1.3+it%3*.85,-.46+it%2*.04,-1.5+Math.floor(it/3)*1.7),oe.rotation.set((it%2-.5)*.24,it*1.71,(it%3-1)*.13),oe.castShadow=!0,O.push(St),Je.add(oe)}for(let it=0;it<22;it++){const St=it*2.399,oe=.65+it%5*.27,Ze=Math.cos(St)*(it<14?1.2:3.4),He=Math.sin(St)*(it<14?1.6:2.8)-.3,fe=je([[Ze,.055,He],[Ze+Math.cos(St+.7)*oe*.6,.11+it%3*.07,He+Math.sin(St+.7)*oe*.6],[Ze+Math.cos(St+.7)*oe,.04+it%4*.06,He+Math.sin(St+.7)*oe]],it%2?.045:.065,it%2?j.reed:j.bark,4);fe.castShadow=!0,O.push(fe.geometry),Je.add(fe)}qn(Je,O),z.add(Je),z.userData.ruin=Je;const mn=new Tn(Ee,j.fruit,8);mn.name="Supplies exposed in the ruins";for(let it=0;it<8;it++)ft.position.set(-.5+it%4*.29,.12+Math.floor(it/4)*.08,1.35+Math.floor(it/4)*.31),ft.rotation.set(it*.43,it*1.31,.2),ft.scale.setScalar(.16+it%3*.025),ft.updateMatrix(),mn.setMatrixAt(it,ft.matrix),mn.setColorAt(it,on(it%2?"#a99958":"#d9a253"));z.add(mn),z.userData.looseLoot=mn;const xn=new Ve({color:"#edc371",emissive:"#e5a64c",emissiveIntensity:.7,roughness:.7});O.push(xn);const Hn=new ne(Ee,xn);Hn.position.set(1.7,.55,1.1),Hn.scale.set(.15,.22,.15),z.add(Hn),z.userData.lamp=Hn;const ys=new bp("#ffd098",1.8,25,2);ys.position.set(0,2.3,1.8),z.add(ys),z.userData.light=ys,z.updateMatrixWorld(!0),z.userData.buildingGroups={},z.userData.defaultPlacements={};for(const[it,St]of Object.entries({store:"storage",nursery:"nursery",watchtower:"watchtower",training:"training"})){const oe=z.userData[St],Ze=new ai().setFromObject(oe),He=z.worldToLocal(Ze.getCenter(new L)),fe=new pe;fe.name=oe.name+" placement",fe.position.set(He.x,oe.position.y,He.z),z.add(fe),oe.position.sub(fe.position),fe.add(oe),z.userData[St]=fe,z.userData.buildingGroups[it]=fe,z.userData.defaultPlacements[it]={x:He.x*ee,z:He.z*ee,yaw:0}}z.updateMatrixWorld(!0);const Qi=new ai().setFromObject(q),hr=z.worldToLocal(Qi.getCenter(new L)),ur=Qi.getSize(new L);z.userData.coreFootprint={x:hr.x*ee,z:hr.z*ee,width:ur.x,depth:ur.z},F||(l.add(z),E.add(z)),ta(z,v);const Ss=new Set([z.userData.core.userData.roof,z.userData.storageCover,z.userData.banner.userData.flag]);return z.traverse(it=>{it.isMesh&&!Ss.has(it)&&(it.updateMatrix(),it.matrixAutoUpdate=!1)}),z}function ta(v,I={}){if(!v)return;if(v.userData.natural)return Yu(v,I,Ms);const F=v.userData.visualState||{},k={...F,...I},z=Math.max(1,k.tier??1),O=k.buildings||{},q=Hi((k.hp??k.maxHp??100)/(k.maxHp??100),0,1),H=!!k.destroyed||q<=0,nt=k.team??F.team??"neutral",dt={};for(const[Ce,me]of Object.entries(k.buildingPlacements||{}))v.userData.buildingGroups[Ce]&&me&&Number.isFinite(me.x)&&Number.isFinite(me.z)&&Number.isFinite(me.yaw??0)&&(dt[Ce]={x:me.x,z:me.z,yaw:me.yaw??0});v.userData.visualState={team:nt,tier:z,hp:k.hp,maxHp:k.maxHp,buildings:{...O},buildingPlacements:dt,yaw:Number.isFinite(k.yaw)?k.yaw:0,storage:k.storage,resources:k.resources,lootTaken:!!k.lootTaken,gateHp:k.gateHp,gateOpen:!!k.gateOpen,destroyed:H,underConstruction:!!k.underConstruction,constructionProgress:Hi(Number(k.constructionProgress)||0,0,1)},v.rotation.y=v.userData.visualState.yaw;for(const[Ce,me]of Object.entries(v.userData.buildingGroups)){const tn=dt[Ce]||v.userData.defaultPlacements[Ce];me.position.x=tn.x/ee,me.position.z=tn.z/ee,me.rotation.y=tn.yaw}const Tt=v.userData.buildingGroups.training;v.updateMatrixWorld(!0),v.userData.trainingPoint.copy(Tt.getWorldPosition(new L)),v.userData.trainingPoint.y=v.position.y+.12,v.userData.team=nt,v.userData.tier=z,v.userData.health=q,v.userData.destroyed=H,v.userData.banner.userData.flag.material.color.set(Ms(nt)),v.userData.banner.userData.emblemTeam!==nt&&(v.userData.banner.userData.flag.material.map=Gr(nt),v.userData.banner.userData.flag.material.needsUpdate=!0,v.userData.banner.userData.emblemTeam=nt),v.userData.gateCrest.material.color.set(Ms(nt)),v.userData.gateCrest.material.map=Gr(nt);const Xt=!!(O.storage??O.store??!1);v.userData.core.visible=!H,v.userData.extra.visible=!H&&z>=2,v.userData.ruin.visible=H,v.userData.nursery.visible=!H&&!!(O.nursery||O.hatchery||O.spawn||O.breeding),v.userData.training.visible=!H&&!!(O.training||O.trainingGround||O.drill),v.userData.watchtower.visible=!H&&!!(O.watchtower||O.tower||O.guards);const It=!H&&!!(O.palisade||O.walls||O.wall||O.defense);v.userData.fortification.visible=!H,v.userData.palisade.visible=It;const zt=Number.isFinite(k.gateHp)&&k.gateHp<=0;v.userData.gate.userData.breached=zt,v.userData.gate.userData.open=!!k.gateOpen,v.userData.fallenGate.visible=zt;for(let Ce=0;Ce<2;Ce++){const me=v.userData.gateLeaves[Ce];me.visible=!zt,me.rotation.y=k.gateOpen?(Ce===0?-1:1)*Math.PI*.52:0}v.userData.core.rotation.z=H?0:(1-q)*.09,v.userData.core.userData.roof.scale.y=H?1:.78+.22*q;let se=typeof k.storage=="number"?k.storage:k.storage?.food??k.resources??0;Number.isFinite(se)||(se=0),se=Math.max(0,se);const Re=se>0&&!k.lootTaken;v.userData.storage.visible=Xt&&(!H||Re),v.userData.storage.rotation.z=H?-.08:0,v.userData.foodMesh.count=H&&!Re?0:Math.min(15,Math.ceil(se/8)),v.userData.storageCover.position.set(H?-.65:0,H?.1:.5,H?.52:.1),v.userData.storageCover.rotation.set(H?.28:0,0,H?-.32:.17),v.userData.looseLoot.visible=H&&Re&&!Xt,v.userData.looseLoot.count=Math.min(8,Math.ceil(se/5)),v.userData.banner.position.y=H?.035:0,v.userData.banner.rotation.set(H?.08:0,H?.35:0,H?1.49:q<.25?.22:0),v.userData.lamp.visible=!H,H&&(v.userData.light.visible=!1),Rc(v),v.userData.collisionRevision=(v.userData.collisionRevision||0)+1}function Rc(v){const I=v.userData.visualState||{},F=Jh({...I,mesh:v}),{stage:k,unfinished:z,wallHeight:O}=F,q=!!I.destroyed,H=v.userData.fortWalls,nt=O/Oo;if(H.visible=!q&&k>=1,H.count=k===1?H.userData.firstCoursesCount:H.userData.fullCount,H.scale.y=nt||1,H.position.y=.11*(1-(nt||1))/ee,H.updateMatrix(),v.userData.fortification.visible=!q&&k>=1,v.userData.fortTowers.visible=!q&&k>=2,v.userData.fortTowerRoofs.visible=!q&&k>=3,v.userData.core.visible=!q&&k>=3,v.userData.gate.visible=!q&&!z,v.userData.gateCrest.visible=!q&&!z,v.userData.banner.visible=!z,z)for(const dt of["extra","nursery","training","watchtower","storage","palisade","lamp","light","looseLoot"])v.userData[dt].visible=!1;v.userData.constructionStage=k,v.userData.constructionWallHeight=O}function ld(v,I,F){if(v?.type!=="shelter")return!1;const k=F?.mesh||[...E].find(H=>H.userData.id===(v.siteId||v.campId));if(!k?.userData?.fortWalls)return!1;const z=Hi(Number(I)||0,0,1);F&&(F.constructionProgress=z);const O=k.userData.visualState||{};return O.constructionProgress=z,O.underConstruction=F?.underConstruction??O.underConstruction??!0,k.userData.visualState=O,Jh({...O,mesh:k}).stage!==k.userData.constructionStage&&(Rc(k),k.userData.collisionRevision=(k.userData.collisionRevision||0)+1),!0}function Cc(v){if(!v)return;if(X?.userData.camp===v&&cr(),l.remove(v),E.delete(v),v.userData.refuge){v.userData.refuge.active=!1;const F=g.indexOf(v.userData.refuge);F>=0&&g.splice(F,1)}v===_&&(_=null);for(const F of[v.userData.support,v.userData.landmark])if(F){const k=C.indexOf(F);k>=0&&C.splice(k,1);for(const z of U.values()){const O=z.indexOf(F);O>=0&&z.splice(O,1)}}const I=v.userData.terrain;I&&(A.delete(I.id),w(I),Tc(I)),v.traverse(F=>{F.isInstancedMesh&&F.dispose()});for(const F of v.userData.owned||[])F.dispose?.()}function cd(v){if(c||!["shelter","store","nursery","watchtower","training"].includes(v))return null;const I=Vr({id:"construction-preview",x:0,z:0,team:"ally",tier:1,hp:350,maxHp:350,buildings:{},storage:{food:80}},{preview:!0});if(I.name="Construction preview: "+v,I.userData.previewType=v,I.userData.previewMaterials=[],v!=="shelter"){const k=I.userData.buildingGroups[v];for(const z of I.children)z.visible=z===k;k.visible=!0,k.position.x=k.position.z=0,k.rotation.y=0}const F=new Map;return I.traverse(k=>{if(k.isLight){k.visible=!1;return}if(!k.isMesh)return;k.castShadow=!1,k.receiveShadow=!1,k.renderOrder=8;const z=O=>{if(F.has(O))return F.get(O);const q=O.clone();return q.transparent=!0,q.opacity=.46,q.depthWrite=!1,q.polygonOffset=!0,q.polygonOffsetFactor=-1,q.polygonOffsetUnits=-1,F.set(O,q),I.userData.previewMaterials.push(q),I.userData.owned.push(q),q};k.material=Array.isArray(k.material)?k.material.map(z):z(k.material)}),S.add(I),l.add(I),Pc(I,{x:0,y:0,z:0,yaw:0,valid:!1}),I.visible=!1,I}function Pc(v,{x:I,y:F,z:k,yaw:z=0,valid:O=!1}={}){if(v?.userData.previewType&&(Number.isFinite(I)&&(v.position.x=I),Number.isFinite(F)&&(v.position.y=F),Number.isFinite(k)&&(v.position.z=k),v.rotation.y=Number.isFinite(z)?z:0,v.visible=!0,v.userData.previewValid!==!!O)){v.userData.previewValid=!!O;for(const q of v.userData.previewMaterials)q.color?.set(O?"#69ed89":"#ef665b"),q.emissive?.set(O?"#266c37":"#782d27"),"emissiveIntensity"in q&&(q.emissiveIntensity=.4)}}function Dc(v){!v||!S.has(v)||(S.delete(v),v.removeFromParent(),Cc(v))}function cr(){if(!X)return;X.removeFromParent();const v=new Set,I=new Set;X.traverse(F=>{F.geometry&&v.add(F.geometry),F.material&&I.add(F.material)});for(const F of v)F.dispose();for(const F of I)F.dispose();X=null}function hd(v){const I=v?.mesh||v;if(!I?.isObject3D)return cr(),null;if(X?.userData.camp===I)return X;cr(),X=new pe,X.name="Construction courtyard guide",X.userData.camp=I;const F=(ds-.2)/ee,k=.075,z=(nt,dt,Tt,Xt=!1)=>{const It=new Te().setFromPoints(nt),zt=new fc({color:dt,transparent:!0,opacity:Tt,depthWrite:!1}),se=Xt?new ep(It,zt):new tp(It,zt);return se.renderOrder=6,X.add(se),se},O=[];for(let nt=0;nt<96;nt++){const dt=nt/96*Le;O.push(new L(Math.cos(dt)*F,k,Math.sin(dt)*F))}z(O,"#9fe5af",.78,!0);const q=[];for(let nt=-7;nt<=7;nt++){const dt=nt*.7;if(Math.abs(dt)>=F)continue;const Tt=Math.sqrt(F*F-dt*dt);q.push(new L(dt,k,-Tt),new L(dt,k,Tt),new L(-Tt,k,dt),new L(Tt,k,dt))}z(q,"#b7ddbc",.22);const H=(nt,dt)=>{const Tt=nt.x/ee,Xt=nt.z/ee,It=nt.width/(2*ee)+.025,zt=nt.depth/(2*ee)+.025,se=Math.cos(nt.yaw||0),Re=Math.sin(nt.yaw||0),Ce=k+.012,me=(Je,rn)=>new L(Tt+Je*se+rn*Re,Ce,Xt+rn*se-Je*Re);z([me(-It,-zt),me(It,-zt),me(It,zt),me(-It,zt)],"#ec8a72",.8,!0).name=dt+" outline";const tn=[];for(let Je=-It-zt;Je<=It+zt;Je+=.42){const rn=[];for(const mn of[-It,It]){const xn=Je-mn;xn>=-zt&&xn<=zt&&rn.push(me(mn,xn))}for(const mn of[-zt,zt]){const xn=Je-mn;xn>-It&&xn<It&&rn.push(me(xn,mn))}rn.length===2&&tn.push(...rn)}z(tn,"#d9806c",.35).name=dt+" hatch"};return H(I.userData.coreFootprint||{x:-1.1825*Vs,z:-1.0664*Vs,width:7.68*Vs,depth:8.25*Vs},"Main hut exclusion"),H(xv,"Sleeping hut reservation"),I.add(X),X}let Wr=0,Ic=Fi;const ud=on(o.water),dd=on(o.nightWater),fd=on("#fff0cb"),pd=on("#7aa5cb");function md(v,I,F=1,k){if(Xe=I,Wr++,F=Hi(F,0,1),Hr.value=I,c){const q=1-Math.exp(-Math.max(0,Math.min(.5,Number(v)||0))*3);ye(x+(d-x)*q);const H=at.material.uniforms.alpha,nt=Dv(k?.y,x);if(H.value+=(nt-H.value)*(1-Math.exp(-Math.max(0,Math.min(.5,Number(v)||0))*8)),Math.abs(Ic-x)>.008){for(let dt=0;dt<wt.length;dt++){const Tt=wt[dt];ft.position.set(Tt.x,Tt.y,Tt.z),ft.rotation.set(0,Tt.angle,0),ft.scale.set(Tt.visualRadius,1,Tt.visualRadius),ft.updateMatrix(),ve.setMatrixAt(dt,ft.matrix)}ve.flush(),Ic=x}jt.update(x,I)}if(at.material.uniforms.time.value=I*.45,at.material.uniforms.waterColor.value.copy(dd).lerp(ud,F),at.material.uniforms.sunColor.value.copy(pd).lerp(fd,F),at.material.uniforms.sunDirection.value.set(.35+.25*Math.sin(I*.008),.45+F*.4,-.45).normalize(),Wr%3===0){const q=ot.attributes.position;for(let H=0;H<q.count;H++){const nt=lt[H*3],dt=lt[H*3+1];q.setZ(H,Math.sin(nt*.33+dt*.21+I*.91)*.025+Math.sin(nt*.14-dt*.38-I*.72)*.018)}q.needsUpdate=!0}hi.uniforms.uTime.value=I;let z=!1;for(let q=0;q<Qe;q++){const H=ei[q];H.life<=0||(H.life-=v,H.vy-=9.2*v,sn[q*3]+=H.vx*v,sn[q*3+1]+=H.vy*v,sn[q*3+2]+=H.vz*v,Pi[q]=Math.max(0,H.life/H.max)*.88,(sn[q*3+1]<(c?x-.03:-.03)||H.life<=0)&&(H.life=0,Pi[q]=0),z=!0)}if(z&&(ui.attributes.position.needsUpdate=!0,ui.attributes.aAlpha.needsUpdate=!0),Wr%2===0){let q=0;for(let H=0;H<R.length;H++){const nt=R[H];if(k&&(nt.x-k.x)**2+(nt.z-k.z)**2>90**2)continue;const dt=(nt.rich?65:30)*Hi(nt.flies/nt.maxFlies,0,1)*(c?Math.min(1,nt.ecology?.activity??1):1);for(const Tt of Dt[H]){if(Tt.rank>=dt)continue;const Xt=I*Tt.speed+Tt.phase;ft.position.set(nt.x+Math.sin(Xt)*Tt.r+Math.sin(Xt*2.9)*.13,nt.y+Tt.height+Math.sin(Xt*1.7+Tt.phase2)*.26,nt.z+Math.cos(Xt*.83+Tt.phase2)*Tt.r),ft.scale.setScalar(.55+.3*Math.sin(Tt.phase2)**2),ft.rotation.set(Math.sin(Xt*3)*.25,-Xt,Math.sin(Xt*12)*.25),ft.updateMatrix(),Pt.setMatrixAt(q++,ft.matrix)}}Pt.count=q,J.flyMatricesUpdated=q,q&&(Pt.instanceMatrix.clearUpdateRanges(),Pt.instanceMatrix.addUpdateRange(0,q*16),Pt.instanceMatrix.needsUpdate=!0)}Wr%5===0&&k&&(wt.forEach((q,H)=>{Math.hypot(k.x-q.x,k.z-q.z)>48||(ft.position.set(q.x,q.y+Math.sin(I*.9+q.phase)*.018,q.z),ft.rotation.set(Math.sin(I*.61+q.phase)*.015,q.angle,Math.cos(I*.8+q.phase)*.015),ft.scale.set(q.visualRadius,1,q.visualRadius),ft.updateMatrix(),ve.setMatrixAt(H,ft.matrix))}),ve.flush());const O=[...E].filter(q=>!q.userData.natural&&!q.userData.destroyed&&!q.userData.visualState?.underConstruction).sort((q,H)=>k?q.position.distanceToSquared(k)-H.position.distanceToSquared(k):0).slice(0,3);for(const q of E)q.userData.natural||(q.userData.light.visible=O.includes(q),q.userData.light.intensity=.25+(1-F)*3,q.userData.lamp.material.emissiveIntensity=.3+(1-F)*1.3,q.userData.banner.userData.flag.rotation.y=Math.sin(I*1.4+q.position.x)*.06)}function gd(){cr();for(const F of[...S])Dc(F);i.remove(l);const v=new Set,I=new Set;l.traverse(F=>{F.isInstancedMesh&&F.dispose(),F.geometry&&v.add(F.geometry),F.material&&(Array.isArray(F.material)?F.material.forEach(k=>I.add(k)):I.add(F.material))});for(const F of jt?.resources||[])F.isBufferGeometry&&v.add(F),F.isMaterial&&I.add(F);for(const F of v)F.dispose();for(const F of I)F.dispose();for(const F of y)F.dispose();at.material.uniforms.mirrorSampler?.value?.dispose?.(),E.clear();for(const F of g)F.active=!1;g.length=0}for(const v of h?.refuges||[])Vr({...v,natural:!0,team:"neutral",nestLevel:0});return l.traverse(v=>{v.updateMatrix(),v.matrixAutoUpdate=!1}),l.updateMatrixWorld(!0),{group:l,platforms:C,hotspots:R,campSites:le,mapRegions:_t,routes:Oe,predatorAnchors:Gt,bossAnchors:Nt,renderStats:J,seed:s,regionIndex:n,palette:o,toRegionPoint:r.toWorld,radius:fv,boundary:pv,revision:dv,sampleHeight:ar,getTerrainHeight:P,getSurface:Ki,shelterLandHeight:Ac,update:md,splash:ed,impact:nd,createShelter:Vr,updateShelter:ta,setConstructionProgress:ld,removeShelter:Cc,createBuildingPreview:cd,setBuildingPreview:Pc,removeBuildingPreview:Dc,showBuildArea:hd,hideBuildArea:cr,dispose:gd,water:at,shelterRadius:ds,shelterScale:ee,natural:c,creekLandmarks:u,creekNest:p,creekCover:f,creekGrips:m,creekRefuges:g,creekSpawn:c?{x:0,z:0}:null,creekTerritories:c?le.filter(v=>v.team==="enemy"):[],setCreekState:ze,currentAt:re,isCreekCover:Kt,get waterLevel(){return c?x:Fi}}}const ii=Math.PI*2,qe=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),Ye=(i,t,e)=>i+(t-i)*e,On=(i,t,e)=>{const n=qe((e-i)/(t-i));return n*n*(3-2*n)},yr=(i,t=0,e=0)=>{const n=Math.sin(i*127.1+t*311.7+e*74.7)*43758.5453;return n-Math.floor(n)},ke=(i=0,t=0,e=0)=>new L(i,t,e),Ba=new Map,Ha=new Map;let Oi,Ga;const ql=ke(0,1,0);ke();function Va(i,t){if(typeof i=="number")return i;const e=qe(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n,r=s*s*(3-2*s);return Ye(i[n],i[n+1],r)}function fs(i,t){if(i.length===1)return[[i[0],1]];const e=qe(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n;return[[i[n],1-s],[i[n+1],s]]}function Me(i,t=0){return{color:i,mask:t}}class Un{constructor(t=1){this.detail=t,this.p=[],this.uv=[],this.c=[],this.mask=[],this.si=[],this.sw=[],this.idx=[]}vertex(t,e=[0,0],n=[[0,1]],s={color:[1,1,1],mask:0}){const r=this.p.length/3;this.p.push(t.x,t.y,t.z),this.uv.push(...e),this.c.push(...s.color),this.mask.push(s.mask||0);let o=n.reduce((a,l)=>a+l[1],0)||1;for(let a=0;a<4;a++)this.si.push(n[a]?.[0]||0),this.sw.push((n[a]?.[1]||0)/o);return r}tri(t,e,n){this.idx.push(t,e,n)}quad(t,e,n,s,r=!1){r?(this.tri(t,n,e),this.tri(e,n,s)):(this.tri(t,e,n),this.tri(e,s,n))}tube(t,e,n,s={}){const{bones:r=[0],paint:o=()=>Me([.7,.7,.7],1),distort:a}=s,l=Math.max(2,Math.round((s.segments??28)*this.detail)),c=Math.max(3,Math.round((s.radial??16)*this.detail)),h=new Nr(t.map(M=>M.isVector3?M:ke(...M)),!1,"catmullrom",.5),u=this.p.length/3;for(let M=0;M<=l;M++){const _=M/l,C=h.getPoint(_),R=h.getTangent(_).normalize(),E=new L().crossVectors(Math.abs(R.y)>.94?ke(0,0,1):ql,R).normalize(),A=new L().crossVectors(R,E).normalize();for(let S=0;S<=c;S++){const y=S/c,U=y*ii,N=Math.cos(U)*Va(e,_),X=Math.sin(U)*Va(n,_),J=C.clone().addScaledVector(E,N).addScaledVector(A,X);a&&a(J,_,U,C);const B=typeof r=="function"?r(_,J):fs(r,_);this.vertex(J,[y,_],B,o(J,_,U))}}for(let M=0;M<l;M++)for(let _=0;_<c;_++){const C=u+M*(c+1)+_;this.quad(C,C+1,C+c+1,C+c+2)}const p=h.getPoint(0),f=h.getPoint(1),m=typeof r=="function"?r(0,p):fs(r,0),g=typeof r=="function"?r(1,f):fs(r,1),x=this.vertex(p,[.5,0],m,o(p,0,0)),d=this.vertex(f,[.5,1],g,o(f,1,0)),b=u+l*(c+1);for(let M=0;M<c;M++)this.tri(x,u+M+1,u+M),this.tri(d,b+M,b+M+1);return this}ellipsoid(t,e,{bone:n=0,rings:s=14,radial:r=24,paint:o=()=>Me([1,1,1]),rotationY:a=0,sculpt:l}={}){s=Math.max(3,Math.round(s*this.detail)),r=Math.max(4,Math.round(r*this.detail));const c=this.p.length/3,h=ke(...t),u=Math.cos(a),p=Math.sin(a);for(let f=0;f<=s;f++){const m=f/s,g=Math.PI*m;for(let x=0;x<=r;x++){const d=x/r,b=ii*d;let M=Math.sin(g)*Math.cos(b)*e[0],_=Math.cos(g)*e[1],C=Math.sin(g)*Math.sin(b)*e[2];const R=ke(M,_,C);l&&l(R,d,m);const E=ke(R.x*u+R.z*p,R.y,-R.x*p+R.z*u).add(h);this.vertex(E,[d,m],[[n,1]],o(R,d,m))}}for(let f=0;f<s;f++)for(let m=0;m<r;m++){const g=c+f*(r+1)+m;this.quad(g,g+1,g+r+1,g+r+2)}return this}leaf(t,e,{bone:n=0,bones:s,segments:r=14,across:o=6,color:a=[.35,.45,.22],ridge:l=.025,mask:c=0,vein:h=!0}={}){r=Math.max(2,Math.round(r*this.detail)),o=Math.max(2,Math.round(o*this.detail));const u=new Nr(t.map(f=>f.isVector3?f:ke(...f)),!1,"catmullrom",.5),p=this.p.length/3;for(let f=0;f<=r;f++){const m=f/r,g=u.getPoint(m),x=u.getTangent(m).normalize(),d=new L().crossVectors(Math.abs(x.y)>.95?ke(0,0,1):ql,x).normalize();for(let b=0;b<=o;b++){const M=b/o*2-1,_=g.clone().addScaledVector(d,M*Va(e,m));_.y+=l*(1-Math.abs(M))*Math.sin(m*Math.PI);const C=(h?.88+.12*Math.cos(m*45+Math.abs(M)*9):1)+.12*(1-Math.abs(M));this.vertex(_,[(M+1)/2,m],s?fs(s,m):[[n,1]],Me(a.map(R=>R*C),c))}}for(let f=0;f<r;f++)for(let m=0;m<o;m++){const g=p+f*(o+1)+m;this.quad(g,g+1,g+o+1,g+o+2,!0)}return this}geometry(){const t=new Te;return t.setAttribute("position",new Vt(this.p,3)),t.setAttribute("uv",new Vt(this.uv,2)),t.setAttribute("color",new Vt(this.c,3)),t.setAttribute("skinTintMask",new Vt(this.mask,1)),t.setAttribute("skinIndex",new cc(this.si,4)),t.setAttribute("skinWeight",new Vt(this.sw,4)),t.setIndex(this.idx),t.computeVertexNormals(),t.computeBoundingSphere(),t}}function $o(){const i=[],t={};return{defs:i,ids:t,bone(e,n,s=null){const r=i.length;return t[e]=r,i.push({name:e,p:n,parent:typeof s=="string"?t[s]:s}),r}}}function ks(i,t=0,e=0){const n=1-On(.26,.47,i.y),s=Math.sin(i.x*31+Math.sin(i.z*13))*Math.sin(i.z*25+i.y*23),r=On(.42,.77,s)*.5,o=.75-r+.06*Math.sin(i.x*75+i.z*64),a=(1-On(.026,.065,Math.abs(i.x)))*On(.52,.67,i.y);return a>.3?Me([.78,.61,.18].map(l=>Ye(o,l,a)),1-a):Me([Ye(o,.76,n),Ye(o,.72,n),Ye(o,.49,n)],1-n*.96)}function ni(i,t=0,e=0){const n=(1-On(-.55,.1,Math.sin(e)))*.65,r=.79-.36*On(.38,.78,Math.sin(i.x*35+i.z*17)*Math.sin(i.y*39-i.z*23));return Me([Ye(r,.7,n),Ye(r,.66,n),Ye(r,.43,n)],1-n*.92)}function eu(i=1){const t=$o(),e=new Un(i),n=new Un(i),s=new Un(i),r=new Un(i),o=new Un(i),a=new Un(i),l=t.bone("pelvis",[0,.36,-.35]),c=t.bone("spine",[0,.43,-.07],l),h=t.bone("head",[0,.47,.29],c),u=t.bone("jaw",[0,.39,.37],h),p=t.bone("throat",[0,.29,.36],u),f=t.bone("eyeL",[-.292,.685,.53],h),m=t.bone("eyeR",[.292,.685,.53],h),g=t.bone("mouth",[0,.405,.755],u);e.tube([[0,.35,-.72],[0,.42,-.48],[0,.43,-.08],[0,.47,.3],[0,.46,.58],[0,.43,.75]],[.012,.32,.435,.43,.34,.018],[.012,.245,.27,.235,.145,.025],{segments:42,radial:36,bones:d=>fs([l,l,c,h,h],d),paint:ks,distort(d,b,M){const _=Math.max(0,Math.sin(M));d.y+=_*.008*Math.sin(d.x*70+d.z*50);const C=Math.exp(-Math.pow((Math.abs(d.x)-.22)/.035,2));d.y+=C*_*.023*Math.sin(b*Math.PI)}});for(const d of[-1,1]){const b=d<0?f:m,M=[d*.292,.685,.53];e.ellipsoid([d*.292,.605,.405],[.15,.145,.165],{bone:h,rings:14,radial:24,paint:N=>ks(N.clone().add(ke(d*.292,.605,.405)))}),n.ellipsoid(M,[.106,.103,.113],{bone:b,radial:40,rings:22,rotationY:d*.32,paint(N,X,J){const B=N.z/.113,W=Math.pow(N.x/.084,2)+Math.pow(N.y/.029,2);if(B<.12)return Me([.065,.14,.018]);if(B<.34)return Me([.04,.065,.012]);if(B>.52&&W<1)return Me([.008,.012,.006]);const Q=.12*Math.sin(Math.atan2(N.y,N.x)*51+Math.hypot(N.x,N.y)*120);return Me([.74+Q,.52+Q*.6,.08+Q*.12])}});const _=t.bone(`hip${d}`,[d*.33,.32,-.33],l),C=t.bone(`knee${d}`,[d*.64,.24,.025],_),R=t.bone(`ankle${d}`,[d*.46,.09,-.61],C),E=t.bone(`foot${d}`,[d*.64,.045,-.49],R);e.ellipsoid([d*.64,.24,.025],[.143,.128,.148],{bone:C,rings:12,radial:18,paint:(N,X,J)=>ni(N.clone().add(ke(d*.64,.24,.025)),X,Math.PI*(.5-J)),sculpt(N){N.x*=1+.06*Math.sin(N.z*30)}}),e.ellipsoid([d*.46,.09,-.61],[.069,.052,.071],{bone:R,rings:8,radial:12,paint:(N,X,J)=>ni(N.clone().add(ke(d*.46,.09,-.61)),X,Math.PI*(.5-J))}),e.tube([[d*.3,.33,-.35],[d*.5,.3,-.21],[d*.64,.24,.025]],[.13,.223,.14],[.13,.173,.12],{segments:20,radial:22,bones:[_,_,C],paint:ni}),e.tube([[d*.64,.24,.025],[d*.57,.15,-.27],[d*.46,.09,-.61]],[.12,.105,.065],[.11,.09,.05],{segments:20,radial:18,bones:[C,C,R],paint:ni}),e.tube([[d*.46,.09,-.61],[d*.57,.06,-.55],[d*.72,.035,-.35]],[.06,.07,.047],[.047,.04,.025],{segments:12,radial:14,bones:[R,E,E],paint:ni});const A=[];for(let N=0;N<4;N++){const X=d*(.7+(N-1.5)*.075),J=-.34+.36*(1-Math.abs(N-1.5)*.16),B=[d*(.67+(N-1.5)*.028),.036,-.37],W=[Ye(B[0],X,.53),.037,-.18];e.tube([B,W,[X,.035,J]],[.032,.024,.007],[.02,.014,.006],{segments:10,radial:8,bones:[E],paint:ni}),A.push([X,.034,J*.66-.12])}for(let N=0;N<3;N++){const X=ke(d*.68,.035,-.36),J=ke(...A[N]),B=ke(...A[N+1]),W=J.clone().lerp(B,.5).lerp(X,.2),Q=e.vertex(X,[0,0],[[E,1]],ks(X)),Y=e.vertex(J,[1,0],[[E,1]],ks(J)),ct=e.vertex(W,[.5,1],[[E,1]],ks(W)),j=e.vertex(B,[0,1],[[E,1]],ks(B));e.tri(Q,Y,ct),e.tri(Q,ct,j),e.tri(ct,Y,j)}const S=t.bone(`shoulder${d}`,[d*.3,.43,.31],c),y=t.bone(`elbow${d}`,[d*.48,.235,.4],S),U=t.bone(`wrist${d}`,[d*.46,.058,.62],y);e.ellipsoid([d*.48,.235,.4],[.064,.066,.064],{bone:y,rings:8,radial:12,paint:(N,X,J)=>ni(N.clone().add(ke(d*.48,.235,.4)),X,Math.PI*(.5-J))}),e.tube([[d*.3,.43,.31],[d*.43,.33,.335],[d*.48,.235,.4]],[.092,.085,.061],[.09,.077,.059],{segments:14,radial:16,bones:[S,S,y],paint:ni}),e.tube([[d*.48,.235,.4],[d*.48,.14,.48],[d*.46,.058,.62]],[.062,.07,.039],[.058,.057,.03],{segments:12,radial:14,bones:[y,y,U],paint:ni});for(let N=0;N<4;N++){const X=d*(.44+(N-1.5)*.075),J=.81+.04*(1.5-Math.abs(N-1.5));e.tube([[d*.46,.055,.61],[Ye(d*.46,X,.6),.031,.74],[X,.025,J]],[.025,.017,.009],[.021,.014,.006],{segments:9,radial:8,bones:[U],paint:ni}),e.ellipsoid([X,.025,J],[.017,.01,.021],{bone:U,rings:6,radial:10,paint:()=>Me([.71,.65,.4],.4)})}for(let N=0;N<3;N++){const X=.32+N*.016;e.tube(Array.from({length:17},(J,B)=>[d*.415+Math.cos(B/16*ii)*.085,X+Math.sin(B/16*ii)*.072,.355+Math.sin(B/16*ii)*.02]),.009,.009,{segments:20,radial:6,bones:[S],paint:()=>Me([.38,.55,.12],.25)})}s.leaf([[d*.12,.695,-.08],[d*.31,.69,-.19],[d*.48,.52,-.38]],[.012,.14,.03],{bone:c,color:[.26,.4,.12],ridge:.025,segments:15}),s.leaf([[d*.04,.715,.05],[d*.2,.73,-.03],[d*.36,.59,-.2]],[.008,.13,.015],{bone:c,color:[.34,.48,.18],ridge:.035,segments:15}),r.leaf([[d*.17,.76,.4],[d*.21,.89,.32],[d*.24,.91,.18]],[.025,.055,.002],{bone:h,color:[.69,.53,.19],ridge:.015,segments:12});for(const[N,X,J,B,W]of[[d*.16,.745,-.005,.18,.21],[d*.29,.67,-.25,.17,.19]])o.ellipsoid([N,X,J],[B,.055,W],{bone:c,rings:8,radial:18,paint:(Q,Y)=>Me([.84+.08*Math.cos(Y*ii*9),.79,.59]),sculpt(Q){const Y=1+.035*Math.cos(Math.atan2(Q.x,Q.z)*9);Q.x*=Y,Q.z*=Y}});for(let N=0;N<3;N++){const X=.19+N*.028,J=.455-N*.017;a.tube(Array.from({length:13},(B,W)=>[d*.478+Math.cos(W/12*ii)*.081,X+Math.sin(W/12*ii)*.027,J+Math.sin(W/12*ii)*.079]),.016,.014,{segments:14,radial:6,bones:[y],paint:()=>Me([.72,.47,.16])})}}const x=Array.from({length:13},(d,b)=>{const M=(b/12-.5)*.74;return[M,.414-.025*Math.abs(M)/.37,.748-.2*Math.pow(M/.37,2)]});return e.tube(x,.009,.009,{segments:34,radial:8,bones:[h],paint:()=>Me([.045,.065,.016])}),e.tube(x.map(d=>[d[0],d[1]-.019,d[2]+.001]),.009,.014,{segments:34,radial:8,bones:[u],paint:()=>Me([.65,.61,.35])}),e.ellipsoid([0,.284,.385],[.25,.125,.265],{bone:p,rings:18,radial:28,paint:()=>Me([.75,.72,.48]),sculpt(d){d.y+=.01*Math.sin(d.x*80)*Math.cos(d.z*60)}}),{type:"frog",rig:t,skin:e.geometry(),eyes:n.geometry(),armor:s.geometry(),shell:o.geometry(),bracers:a.geometry(),crest:r.geometry(),mouth:g,length:1.7,height:.8,scale:1}}function Os(i,t,e,n,s,r,o=.05){const a=ke(...t).lerp(ke(...e),.5);a.y+=o,i.leaf([t,a.toArray(),e],[.012,n,n*.7,.002],{bone:s,segments:13,across:6,ridge:.012,color:r,vein:!0})}function qv(){const i=$o(),t=new Un,e=new Un,n=i.bone("pelvis",[0,2.45,-.16]),s=i.bone("spine",[0,2.79,.02],n),r=i.bone("neck0",[0,2.97,.24],s),o=i.bone("neck1",[0,3.35,.03],r),a=i.bone("neck2",[0,3.82,.18],o),l=i.bone("head",[0,4.19,.6],a),c=i.bone("jaw",[0,4.12,.7],l),h=i.bone("mouth",[0,4.11,1.48],c),u=i.bone("eyeL",[-.125,4.25,.69],l),p=i.bone("eyeR",[.125,4.25,.69],l),f=m=>{const g=On(2.7,3.02,m.y)*.35;return Me([.54-g,.59-g,.61-g])};t.tube([[0,2.43,-.95],[0,2.58,-.53],[0,2.78,-.05],[0,2.99,.27]],[.02,.34,.41,.14],[.02,.39,.48,.18],{segments:30,radial:28,bones:[n,n,s,s],paint:f}),t.tube([[0,2.97,.24],[0,3.22,.16],[0,3.46,.015],[0,3.83,.18],[0,4.12,.52],[0,4.21,.65]],[.16,.15,.12,.1,.1,.13],[.17,.17,.14,.12,.13,.14],{segments:40,radial:20,bones:[r,r,o,a,l,l],paint(m,g,x){const d=Math.cos(x)>.7?.65:.9;return Me([d,d*.99,d*.91])}}),t.tube([[0,4.18,.36],[0,4.28,.57],[0,4.25,.76],[0,4.18,.91]],[.018,.15,.14,.045],[.02,.16,.14,.07],{segments:22,radial:20,bones:[l],paint(m){return m.y>4.32?Me([.07,.1,.12]):Me([.83,.86,.82])}}),t.tube([[0,4.19,.81],[0,4.18,1.04],[0,4.15,1.32],[0,4.12,1.6]],[.072,.055,.027,.001],[.06,.044,.022,.001],{segments:20,radial:10,bones:[l],paint(m,g){return Me([Ye(.74,.34,g),Ye(.47,.24,g),.075])}}),t.tube([[0,4.112,.81],[0,4.105,1.06],[0,4.103,1.36],[0,4.115,1.59]],[.063,.046,.022,.001],[.026,.02,.012,.001],{segments:18,radial:8,bones:[c],paint:()=>Me([.68,.38,.07])});for(const m of[-1,1]){const g=m<0?u:p;e.ellipsoid([m*.132,4.255,.69],[.029,.039,.043],{bone:g,rings:10,radial:18,paint:A=>Math.abs(A.x)>.022&&Math.abs(A.y)<.018&&Math.abs(A.z)<.021?Me([.005,.008,.006]):Me([.9,.7,.13])});const x=i.bone(`hip${m}`,[m*.14,2.47,-.12],n),d=i.bone(`knee${m}`,[m*.18,1.5,-.12],x),b=i.bone(`ankle${m}`,[m*.22,.16,.04],d),M=i.bone(`foot${m}`,[m*.22,.075,.15],b),_=(A,S)=>{const y=.8+.2*Math.sin(A.y*110);return Me([.38*y,.36*y,.21*y])};t.tube([[m*.14,2.47,-.12],[m*.18,1.73,-.15],[m*.18,1.5,-.12]],[.077,.04,.049],[.074,.037,.049],{segments:20,radial:12,bones:[x,x,d],paint:_}),t.tube([[m*.18,1.5,-.12],[m*.2,.7,-.02],[m*.22,.16,.04]],[.042,.024,.031],[.042,.023,.03],{segments:22,radial:10,bones:[d,d,b],paint:_});for(let A=0;A<4;A++){const S=A<3?(A-1)*.23:-.08,y=A<3?.54-.06*Math.abs(A-1):-.21;t.tube([[m*.22,.16,.04],[m*.22+S*.5,.065,(y+.04)*.55],[m*.22+S,.035,y]],[.025,.017,.006],[.023,.013,.005],{segments:12,radial:8,bones:[M],paint:_})}const C=i.bone(`wing${m}`,[m*.31,2.91,-.03],s),R=i.bone(`wingElbow${m}`,[m*.94,2.83,-.12],C),E=i.bone(`wingWrist${m}`,[m*1.5,2.68,-.24],R);t.leaf([[m*.31,2.91,-.03],[m*.95,2.84,-.18],[m*1.58,2.69,-.35]],[.08,.29,.1],{bones:[C,R,E],segments:22,across:10,ridge:.05,color:[.36,.43,.47]});for(let A=0;A<15;A++){const S=.42+A*.088,y=A<6?C:A<11?R:E;Os(t,[m*S,2.89-A*.014,-.05-A*.012],[m*(S+.22+A*.009),2.73-A*.023,-.76-A*.018],.105-A*.002,y,[.26+A*.004,.32+A*.004,.36+A*.004]),A<12&&Os(t,[m*S,2.94-A*.014,.035],[m*(S+.1),2.86-A*.017,-.44],.077,y,[.49,.55,.57])}for(let A=0;A<11;A++)Os(t,[m*(.11+.015*A),2.86-.042*A,-.21],[m*(.29+.009*A),2.7-.044*A,-.75-.022*A],.075,s,[.51+A*.013,.56+A*.012,.56+A*.012]);Os(t,[m*.065,4.34,.51],[m*.13,4.28,-.02],.018,l,[.04,.07,.09],.025)}for(let m=0;m<9;m++)Os(t,[(m-4)*.045,2.53,-.65],[(m-4)*.075,2.34,-1.34-.1*(1-Math.abs(m-4)/4)],.07,n,[.21,.28,.31]);for(let m=0;m<9;m++)Os(t,[(m-4)*.025,3.06,.35],[(m-4)*.044,2.48-.06*(m%3),.42],.032,s,[.79,.8,.72],.01);return{type:"heron",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:h,length:3,height:4.55,scale:1}}function Yv(){const i=$o(),t=new Un,e=new Un,n=new Un,s=i.bone("head",[0,.27,1.97]),r=[s];for(let u=1;u<=20;u++)r.push(i.bone(`coil${u}`,[0,.23,1.97-u*.22],r[u-1]));const o=i.bone("jaw",[0,.205,2.1],s),a=i.bone("mouth",[0,.19,2.48],o),l=i.bone("eyeL",[-.183,.346,2.21],s),c=i.bone("eyeR",[.183,.346,2.21],s),h=(u,p,f)=>{const m=1-On(.13,.22,u.y),g=.73-.26*On(.2,.65,Math.sin(u.z*7+u.x*18));return Me([Ye(g,.65,m),Ye(g,.6,m),Ye(g,.36,m)],1-m)};t.tube([[0,.25,2.05],[0,.23,1.4],[0,.23,.5],[0,.22,-.4],[0,.18,-1.5],[0,.09,-2.46]],[.13,.186,.205,.18,.115,.002],[.11,.16,.17,.15,.09,.003],{segments:100,radial:20,bones:u=>fs(r,u),paint:h,distort(u,p,f){u.y+=.003*Math.sin(p*390)*Math.sin(f*12)}}),t.tube([[0,.265,1.86],[0,.29,2.07],[0,.285,2.27],[0,.245,2.48]],[.115,.237,.202,.035],[.1,.12,.105,.038],{segments:24,radial:24,bones:[s],paint:h}),t.tube([[0,.192,1.99],[0,.179,2.25],[0,.207,2.47]],[.14,.19,.025],[.027,.035,.006],{segments:18,radial:16,bones:[o],paint:()=>Me([.66,.63,.42])});for(const u of[-1,1])e.ellipsoid([u*.183,.346,2.21],[.045,.043,.05],{bone:u<0?l:c,rings:12,radial:20,rotationY:u*.9,paint(p){return Math.abs(p.x)<.012&&p.z>.015?Me([.009,.008,.005]):Me([.69,.51,.12])}}),t.tube([[u*.2,.228,2.06],[u*.197,.218,2.29],[u*.045,.225,2.475]],.004,.004,{segments:20,radial:6,bones:[s],paint:()=>Me([.05,.06,.025])}),n.tube([[0,.194,2.47],[0,.19,2.73],[u*.06,.18,2.84]],[.014,.01,.001],[.007,.005,.001],{segments:16,radial:6,bones:[o],paint:()=>Me([.28,.025,.035])});return{type:"snake",rig:i,skin:t.geometry(),eyes:e.geometry(),tongue:n.geometry(),mouth:a,length:5,height:.43,scale:1}}function $v(){const i=$o(),t=new Un,e=new Un,n=i.bone("spine",[0,.6,.18]),s=i.bone("head",[0,.61,.78],n),r=i.bone("tail0",[0,.55,-.44],n),o=i.bone("tail1",[0,.49,-.99],r),a=i.bone("tail",[0,.48,-1.43],o),l=i.bone("jaw",[0,.42,1.03],s),c=i.bone("mouth",[0,.43,1.55],l),h=i.bone("eyeL",[-.22,.72,1.06],s),u=i.bone("eyeR",[.22,.72,1.06],s),p=x=>{const d=1-On(.35,.62,x.y),b=.74-.25*On(.1,.6,Math.sin(x.z*18+x.y*29)*Math.sin(x.y*35));return Me([Ye(b,.81,d),Ye(b,.78,d),Ye(b,.61,d)],1-d)};t.tube([[0,.48,-1.46],[0,.51,-.92],[0,.61,-.28],[0,.64,.34],[0,.62,.84],[0,.55,1.24],[0,.52,1.56]],[.018,.15,.31,.35,.29,.19,.027],[.035,.22,.46,.48,.32,.19,.05],{segments:54,radial:28,bones:x=>fs([a,o,r,n,s,s,s],x),paint:p}),t.tube([[0,.43,.92],[0,.36,1.25],[0,.445,1.56]],[.14,.16,.025],[.055,.065,.018],{segments:18,radial:18,bones:[l],paint:()=>Me([.72,.69,.49])});const f=[.33,.4,.23],m=t.p.length/3;for(let x=0;x<=18;x++){const d=x/18,b=Math.cos(d*Math.PI)*.62,M=-1.45-(.3+.3*Math.abs(Math.cos(d*Math.PI)));for(let _=0;_<=6;_++){const C=_/6,R=ke(.025*Math.sin(d*Math.PI),.48+b*C,Ye(-1.43,M,C)),E=x%2?.85:1.15;t.vertex(R,[C,d],[[a,1]],Me(f.map(A=>A*E),.3))}}for(let x=0;x<18;x++)for(let d=0;d<6;d++){const b=m+x*7+d;t.quad(b,b+1,b+7,b+8)}const g=(x,d,b,M,_=1)=>{const C=ke(...x).lerp(ke(...d),.5);C.x+=_*b,t.leaf([x,C.toArray(),d],[.01,b*.8,.003],{bone:M,segments:16,across:8,ridge:.014,color:f,mask:.3})};for(const x of[-1,1]){e.ellipsoid([x*.22,.72,1.06],[.052,.07,.08],{bone:x<0?h:u,rings:12,radial:22,rotationY:x*1,paint(b){return b.z>.035&&Math.pow(b.x/.035,2)+Math.pow(b.y/.04,2)<1?Me([.005,.007,.004]):Me([.75,.59,.18])}});const d=i.bone(`fin${x}`,[x*.255,.42,.65],n);g([x*.255,.42,.65],[x*.63,.21,.11],.16,d,x),g([x*.2,.26,-.11],[x*.38,.13,-.57],.12,r,x),t.tube([[x*.24,.86,.71],[x*.31,.64,.67],[x*.24,.39,.69]],.009,.011,{segments:20,radial:6,bones:[s],paint:()=>Me([.19,.24,.12],.3)});for(let b=0;b<8;b++){const M=1.18+b*.04,_=x*(.12-b*.009);t.tube([[_,.445,M],[_*.9,.475,M+.005]],[.008,.001],[.008,.001],{segments:3,radial:5,bones:[l],paint:()=>Me([.78,.76,.56])})}}for(const x of[!0,!1]){const d=t.p.length/3,b=22;for(let M=0;M<=b;M++){const _=M/b,C=Ye(-.9,.18,_),R=x?.8+.22*_:.26-.1*_,E=Math.sin(Math.PI*_)*(x?.45:-.24),A=_<.5?r:n;for(let S=0;S<=6;S++){const y=S/6,U=ke(.012*Math.sin(_*6),R+E*y,C-.1*y);t.vertex(U,[y,_],[[A,1]],Me(f.map(N=>N*(M%2?.85:1.1)),.2))}}for(let M=0;M<b;M++)for(let _=0;_<6;_++){const C=d+M*7+_;t.quad(C,C+1,C+7,C+8)}}return{type:"fish",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:c,length:3.65,height:1.65,scale:1}}function Zv(i){if(Ha.has(i))return Ha.get(i);const t=256,e=new Uint8Array(t*t*4);for(let s=0;s<t;s++)for(let r=0;r<t;r++){const o=r/t,a=s/t;let l=.82+yr(r,s)*.18;if(i==="frog"){const p=Math.floor(o*28),f=Math.floor(a*28),m=o*28-p-.5,g=a*28-f-.5,x=Math.hypot(m,g),d=Math.exp(-x*x*38)*(.1+yr(p,f)*.18);l=.79+.16*yr(r,s)+d-.11*Math.exp(-Math.pow(x-.31,2)*300)}else if(i==="snake"||i==="fish"){const u=i==="snake"?28:35,p=a*u,f=Math.floor(p),m=o*20+f%2*.5,g=m-Math.floor(m)-.5,x=p-f-.5,d=Math.abs(g)*1.4+Math.abs(x);l=.74+.22*(1-On(.49,.72,d))+.04*yr(r,s)}else l=.79+.15*Math.sin(o*170+.4*Math.sin(a*31))**2+.06*yr(r,s);const c=(s*t+r)*4,h=Math.floor(qe(l)*255);e[c]=e[c+1]=e[c+2]=h,e[c+3]=255}const n=new hc(e,t,t,zn);return n.wrapS=n.wrapT=js,n.magFilter=jn,n.minFilter=Vi,n.generateMipmaps=!0,n.needsUpdate=!0,n.repeat.set(i==="heron"?1:2,i==="frog"?3:2),Ha.set(i,n),n}function jv(i,t){const e=Zv(i),n=new Nu({color:16777215,vertexColors:!0,map:e,bumpMap:e,bumpScale:i==="frog"?.013:i==="heron"?.007:.009,roughness:i==="frog"?.32:i==="heron"?.68:.37,metalness:0,clearcoat:i==="heron"?0:.42,clearcoatRoughness:.25,envMapIntensity:.8,side:Fe}),s=new Qt(t);return n.userData.tint=s,n.onBeforeCompile=r=>{r.uniforms.skinTint={value:s},r.vertexShader=`attribute float skinTintMask; varying float vSkinTint;
`+r.vertexShader,r.vertexShader=r.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vSkinTint = skinTintMask;`),r.fragmentShader=`uniform vec3 skinTint; varying float vSkinTint;
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
 diffuseColor.rgb *= mix(vec3(1.0),skinTint,vSkinTint);`)},n.customProgramCacheKey=()=>"anatomical-skin-v3",n}function Kv(i,t){const e=new Ln({color:i,side:En,transparent:!0,opacity:.91,depthWrite:!1,toneMapped:!1});return e.userData.thickness={value:t},e.onBeforeCompile=n=>{n.uniforms.outlineThickness=e.userData.thickness,n.vertexShader=`uniform float outlineThickness;
`+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <begin_vertex>","vec3 transformed = position + normal * outlineThickness;")},e.customProgramCacheKey=()=>"skeletal-silhouette-v3",e}function Jv(i){const t=i.map(e=>{const n=new Pu;return n.name=e.name,n});for(let e=0;e<i.length;e++){const n=i[e];t[e].position.fromArray(n.p),n.parent!==null&&n.parent!==void 0&&(t[e].position.sub(ke(...i[n.parent].p)),t[n.parent].add(t[e]))}return{bones:t,skeleton:new uc(t),root:t[0]}}function Qv(){if(!Oi){const n=[],s=[];for(let o=0;o<=48;o++){const a=o/48*ii,l=Math.sin(a),c=Math.cos(a),h=Math.abs(o%8-4)/4,u=-.018*c,p=u+.1+.205*h,f=1+.08*h;n.push(l*.255,u,c*.175,l*.27*f,p,c*.188*f,l*.231,u,c*.151,l*(.27*f-.024),p,c*(.188*f-.024))}for(let o=0;o<48;o++){const a=o*4,l=a+4;s.push(a,l,a+1,l,l+1,a+1),s.push(a+2,a+3,l+2,l+2,a+3,l+3),s.push(a+1,l+1,a+3,l+1,l+3,a+3),s.push(a,a+2,l,l,a+2,l+2)}Oi=new Te,Oi.setAttribute("position",new Vt(n,3)),Oi.setIndex(s),Oi.computeVertexNormals(),Oi.computeBoundingSphere(),Oi.computeBoundingBox(),Ga=new mc(.047,0),Ga.scale(.78,1.05,.5)}const i=new pe;i.name="royal-crown",i.position.set(0,.22,-.11);const t=new ne(Oi,new Ve({color:15910746,roughness:.29,metalness:.58,emissive:5911813,emissiveIntensity:.12}));t.name="royal-crown-gold",t.castShadow=!0,t.receiveShadow=!0,i.add(t);const e=new ne(Ga,new Ve({color:14562379,roughness:.18,metalness:.2,flatShading:!0,emissive:4785420,emissiveIntensity:.12}));return e.name="royal-crown-ruby",e.position.set(0,.042,.195),i.add(e),i}function nu(i,t=0){const e=i==="frog"&&t?`${i}:${t}`:i;if(!Ba.has(e)){const n=i==="frog"?eu([1,.36,.18][t]):({heron:qv,snake:Yv,fish:$v}[i]||eu)();for(const s of["skin","eyes","armor","shell","bracers","crest","tongue"])n[s]?.boundingSphere&&(n[s].boundingSphere.radius*=1.9);Ba.set(e,n)}return Ba.get(e)}function Wa(i,t,e,n,s,r,o){const a=Math.hypot(n.y,n.z),l=Math.hypot(s.y,s.z),c=n.y+s.y+r,h=n.z+s.z+o,u=Math.max(Math.abs(a-l)+1e-5,Math.min(a+l-1e-5,Math.hypot(c,h))),p=Math.atan2(h,c),f=-Math.sign(n.y*s.z-n.z*s.y)||1,m=Math.acos(qe((a*a+u*u-l*l)/(2*a*u),-1,1)),g=p+f*m,x=g-Math.atan2(n.z,n.y);i.rotation.x=Math.atan2(Math.sin(x),Math.cos(x));const d=Math.cos(g)*a,b=Math.sin(g)*a,M=Math.atan2(h-b,c-d)-i.rotation.x-Math.atan2(s.z,s.y);t.rotation.x=Math.atan2(Math.sin(M),Math.cos(M)),e.rotation.x=-i.rotation.x-t.rotation.x}function t_(i,t){if(!i)return{type:"",phase:0,force:0};let e="kick",n=t;return typeof i=="string"?e=i:typeof i=="number"?n=i:(e=i.type||i.kind||"kick",n=i.phase??i.progress??t),n=qe(n),{type:e,phase:n,force:Math.sin(n*Math.PI)}}function Xa(i,t,e){const n=i.points;if(t<=n[0].s)return e.copy(n[0]),e;for(let s=1;s<n.length;s++)if(t<=n[s].s){const r=n[s-1],o=n[s],a=(t-r.s)/(o.s-r.s||1);return e.set(Ye(r.x,o.x,a),Ye(r.y,o.y,a),Ye(r.z,o.z,a))}return e.copy(n.at(-1)),e}function e_(i="frog",t={}){["frog","heron","snake","fish"].includes(i)||(i="frog");const e=nu(i),n=new pe,s=new pe;n.name=`creature-${i}`,s.name="anatomical-animation-pivot",n.add(s);const r=i==="frog"?7378989:i==="snake"?6715206:i==="fish"?8624996:16777215,o=jv(i,t.color??r);o.emissive.set(16777215),o.emissiveIntensity=0;const a=new Nu({color:16777215,vertexColors:!0,roughness:.13,clearcoat:1,clearcoatRoughness:.05,metalness:.05}),{bones:l,skeleton:c,root:h}=Jv(e.rig.defs),u=new co(e.skin,o);u.name=`${i}-weighted-surface`,u.add(h),s.add(u),u.castShadow=!0,u.receiveShadow=!0,u.frustumCulled=!0,n.updateMatrixWorld(!0),u.bind(c);const p=new co(e.eyes,a);p.name="articulated-eyes",p.bind(c,u.bindMatrix),p.castShadow=!1,p.frustumCulled=!0,s.add(p);const f=new co(e.skin,Kv(t.outlineColor??(t.team==="enemy"?16741200:t.team==="player"?11075554:i==="frog"?8513956:16755275),i==="frog"?.018:.027));f.name="animated-color-silhouette",f.bind(c,u.bindMatrix),f.frustumCulled=!0,f.renderOrder=-1,s.add(f);const m=[];for(const ht of["armor","shell","bracers","crest","tongue"])if(e[ht]){const V=new Ve({color:16777215,vertexColors:!0,roughness:ht==="tongue"?.35:.79,side:Fe}),st=new co(e[ht],V);st.name=ht,st.bind(c,u.bindMatrix),st.frustumCulled=!0,st.castShadow=ht!=="tongue",st.visible=ht==="tongue",s.add(st),m.push(st)}const g={};for(const ht of l)g[ht.name]=ht;const x=l.map(ht=>ht.position.clone()),d=new $e;d.name="mouth-attachment",l[e.mouth].add(d);let b=(t.seed||0)*.731,M=0,_="",C=1,R=0,E=0,A=0,S=!0,y=!1,U=null,N=1,X=!1,J=0,B={x:0,z:1,strength:0,life:0,duration:.26,heavy:!1},W={armor:null,weapon:null,crest:!1};const Q=t.role||"scout",Y=i==="frog"?["guardian","brute","tank"].includes(Q)?[1.15,1.12,1.05]:["scout","hunter","agile"].includes(Q)?[.96,.98,1.04]:[1.03,1.02,1.02]:[1,1,1];s.scale.set(...Y);const ct=()=>{const ht=1+(C-1)*.04+Math.min(24,Math.max(0,N-1))*.004;s.scale.set(Y[0]*ht,Y[1]*ht,Y[2]*ht)},j=()=>{for(const ht of m)ht.name==="armor"&&(ht.visible=i==="frog"&&W.armor==="reed"),ht.name==="shell"&&(ht.visible=i==="frog"&&W.armor==="shell"),ht.name==="bracers"&&(ht.visible=i==="frog"&&W.weapon==="reed"),ht.name==="crest"&&(ht.visible=i==="frog"&&W.crest&&!y)},Mt=()=>{for(let ht=0;ht<l.length;ht++)l[ht].rotation.set(0,0,0),l[ht].scale.set(1,1,1),l[ht].position.copy(x[ht])};let $t=null;function Ee(ht){if(i!=="snake"||!ht?.points?.length||!ht.weight)return;$t||($t={targets:Array.from({length:21},()=>new ce),local:new ce,inverse:new ce,point:ke(),before:ke(),after:ke(),translation:ke(),rotation:new qi,scale:ke(1,1,1),localPosition:ke(),localRotation:new qi,localScale:ke()});const V=$t,st=qe(ht.weight),_t=ht.scale||1,Gt=ht.origin,Nt=Math.cos(ht.yaw||0),de=Math.sin(ht.yaw||0);s.position.y*=1-st,s.rotation.x*=1-st,s.rotation.z*=1-st;for(let D=0;D<=20;D++){const te=D?g["coil"+D]:g.head,Yt=1.97-D*.22,Wt=(D?Yt:2.17)*_t;Xa(ht,Wt,V.point),Xa(ht,Wt-.07*_t,V.before),Xa(ht,Wt+.07*_t,V.after);const Lt=V.after.x-V.before.x,ie=V.after.z-V.before.z,pt=Math.hypot(Lt,ie),yt=pt>1e-4?Math.atan2(Lt,ie):ht.yaw||0;D||(V.point.x-=Math.sin(yt)*.2*_t,V.point.z-=Math.cos(yt)*.2*_t);const ae=(V.point.x-Gt.x)/_t,Pe=(V.point.z-Gt.z)/_t,P=Math.max(V.point.y,V.before.y,V.after.y);V.translation.set(Nt*ae-de*Pe,(P-Gt.y)/_t+(D?.26:.3),de*ae+Nt*Pe),V.rotation.setFromAxisAngle(ql,yt-(ht.yaw||0)),V.targets[D].compose(V.translation,V.rotation,V.scale),V.local.copy(V.targets[D]),D&&V.local.premultiply(V.inverse.copy(V.targets[D-1]).invert()),V.local.decompose(V.localPosition,V.localRotation,V.localScale),te.position.lerp(V.localPosition,st),te.quaternion.slerp(V.localRotation,st),te.scale.lerp(V.localScale,st)}g.jaw.rotation.x*=1-st*.8;const be=m.find(D=>D.name==="tongue");be&&st>.8&&(be.visible=!1)}const le={group:n,bones:g,skeleton:c,mesh:u,get crowned(){return y},get equipment(){return{...W}},get level(){return N},get working(){return X},stats:{type:i,vertices:e.skin.attributes.position.count+e.eyes.attributes.position.count,triangles:(e.skin.index.count+e.eyes.index.count)/3,boneCount:l.length,length:e.length,height:e.height,rigged:!0,renderLOD:0},setOutline(ht,V=!0){ht!=null&&f.material.color.set(ht),S=V,f.visible=V&&A===0},setRenderLOD(ht=0){const V=i==="frog"?qe(Math.round(Number(ht)||0),0,2):0;if(V===A)return;A=V;const st=nu(i,V);for(const _t of[u,p,f,...m])_t.geometry=st[_t===u||_t===f?"skin":_t===p?"eyes":_t.name],_t.boundingSphere=null,_t.boundingBox=null,_t.castShadow=V===0&&_t!==p&&_t!==f&&_t.name!=="tongue";f.visible=S&&V===0,U&&(U.getObjectByName("royal-crown-gold").castShadow=V===0),le.stats.vertices=st.skin.attributes.position.count+st.eyes.attributes.position.count,le.stats.triangles=(st.skin.index.count+st.eyes.index.count)/3,le.stats.renderLOD=V},setTier(ht){C=qe(Math.round(ht||1),1,5),ct()},setLevel(ht){N=qe(Math.floor(Number(ht)||1),1,999),ct()},setEquipment(ht={}){return W=i==="frog"?{armor:["reed","shell"].includes(ht?.armor)?ht.armor:null,weapon:ht?.weapon==="reed"?"reed":null,crest:ht?.crest===!0}:{armor:null,weapon:null,crest:!1},j(),{...W}},setWorking(ht=!1){X=i==="frog"&&!!ht},setImpact(ht={}){const V=qe(Number(ht.strength)||0,0,1.5),st=Number(ht.x)||0,_t=Number(ht.z)||0,Gt=Math.hypot(st,_t)||1,Nt=qe(Number(ht.duration)||.26,.08,.5);B={x:st/Gt,z:_t/Gt,strength:V,life:V?Nt:0,duration:Nt,heavy:!!ht.heavy},o.emissiveIntensity=V?Math.min(.82,.34+V*.35):0},setCrowned(ht=!1){return y=i==="frog"&&!!ht,y&&!U&&(U=Qv(),g.head.add(U)),U&&(U.visible=y,U.getObjectByName("royal-crown-gold").castShadow=A===0),j(),y},mouthWorld(ht=new L){return n.updateWorldMatrix(!0,!0),d.getWorldPosition(ht)},update(ht,V={}){ht=qe(Number(ht)||0,0,.1),b=V.time!==void 0?V.time+(t.seed||0)*.731:b+ht,Mt();const st=Math.max(0,Number(V.speed)||0),_t=qe(st/(i==="frog"?2.8:3));E=Ye(E,_t,1-Math.exp(-ht*12));const Gt=V.swimming?1:0,Nt=typeof V.jump=="number"?qe(V.jump):V.jump?.5:0,de=typeof V.attack=="string"?V.attack:V.attack?.type||V.attack?.kind||(V.attack?"kick":"");de!==_?(M=0,_=de):V.attack&&(M+=ht/.55);const be=t_(V.attack,M),D=be.force,te=typeof V.roar=="number"?qe(V.roar):V.roar?1:0,Yt=typeof V.hit=="number"?qe(V.hit):V.hit?1:0;B.life=Math.max(0,B.life-ht),o.emissiveIntensity=B.life>0?Math.max(0,1-(B.duration-B.life)/.07)*Math.min(.82,.34+B.strength*.35):0,V.building!==void 0&&(X=i==="frog"&&!!V.building),J=Ye(J,X&&!V.dead&&!be.type&&st<1?1:0,1-Math.exp(-ht*12)),R=Ye(R,V.dead?1:0,1-Math.exp(-ht*5)),s.position.set(0,0,0),s.rotation.set(0,0,0);const Wt=(b+(t.seed||0)*.4)%5.7,Lt=Wt>5.5?.08+.92*Math.abs((Wt-5.6)*10):1;if(g.eyeL&&(g.eyeL.scale.y=qe(Lt,.08,1)),g.eyeR&&(g.eyeR.scale.y=qe(Lt,.08,1)),i==="frog"){const ie=V.hop||(Nt>0?{phase:"air",progress:1-Nt}:{phase:"idle",progress:0}),pt=qe(ie.progress||0),yt=ie.phase==="air",ae=ie.phase==="gather"?pt:0,Pe=ie.phase==="land"?Math.sin(pt*Math.PI):0,P=yt?Math.sin(qe(pt/.14)*Math.PI/2)*(1-qe((pt-.16)/.48)):0,w=yt?qe((pt-.82)/.18):0,K=yt?1-qe(pt/.14):0,ot=yt?qe((pt-.25)/.45)*(1-w):0,at=yt?qe((pt-.6)/.35):0,rt=b*7.8,Ut=Math.sin(rt)*E;s.position.y=Gt?-.14+.023*Math.sin(b*3):-.085*(ae+K)-.075*Pe,s.rotation.x=Gt?-.12:(ae+K)*.07-(yt?Math.sin(pt*Math.PI)*.12:0)+at*.08*(1-w),g.spine.rotation.x=Math.sin(b*2.6)*.009,g.spine.scale.y=1+Math.sin(b*2.6)*.018,g.head.rotation.x=.02*Math.sin(b*1.7)-te*.18-(yt?.04:0),g.jaw.rotation.x=-te*.13-(be.type==="tongue"?D*.16:0),g.throat.scale.set(1+te*.26,1+te*1.45+Math.sin(b*2.5)*.035,1+te*.25);for(const lt of[-1,1])if(Gt)g[`hip${lt}`].rotation.x=-.32*Ut,g[`hip${lt}`].rotation.z=lt*.07*Ut,g[`knee${lt}`].rotation.x=.62*Ut,g[`ankle${lt}`].rotation.x=-.25*Ut,g[`foot${lt}`].rotation.x=.2*Ut,g[`shoulder${lt}`].rotation.x=-.23*Ut,g[`elbow${lt}`].rotation.x=.28*Ut,g[`wrist${lt}`].rotation.x=-.12*Ut,g[`shoulder${lt}`].rotation.z=lt*(.22+.25*Ut),g[`elbow${lt}`].rotation.y=lt*.3;else if(!V.dead){const bt=e.rig.ids,Ct=yt?.085*K+(-.1*P+.045*ot)*(1-K):-s.position.y,mt=yt?.035*K+(-.42*P+.11*ot)*(1-K):.035*ae,At=yt?.085*K+(.085*(1-at)-.035*at)*(1-w)*(1-K):-s.position.y,Zt=yt?(-.075*(1-at)+.13*at)*(1-w)*(1-K):0;Wa(g[`hip${lt}`],g[`knee${lt}`],g[`ankle${lt}`],x[bt[`knee${lt}`]],x[bt[`ankle${lt}`]],Ct,mt),Wa(g[`shoulder${lt}`],g[`elbow${lt}`],g[`wrist${lt}`],x[bt[`elbow${lt}`]],x[bt[`wrist${lt}`]],At,Zt),g[`foot${lt}`].rotation.x=-P*.14}if(be.type==="kick"||be.type==="strike"){s.rotation.y=-D*.55,s.rotation.z=D*.22,s.position.y+=D*.16;const lt=e.rig.ids;Wa(g.hip1,g.knee1,g.ankle1,x[lt.knee1],x[lt.ankle1],.26*D,1.16*D),g.hip1.rotation.y=-D*.3,g.hip1.rotation.z=-D*.08,g["shoulder-1"].rotation.z=D*.55}else if(be.type==="slam"||be.type==="belly"){const lt=Math.sin(be.phase*Math.PI);s.rotation.x=-lt*.28,s.position.y+=lt*.22;for(const bt of[-1,1])g[`hip${bt}`].rotation.x-=lt*.7,g[`shoulder${bt}`].rotation.z=bt*lt*.45}else be.type==="tongue"&&(g.head.rotation.x-=D*.1,g.spine.rotation.x-=D*.07);if(J>.001){const lt=b*8.2,bt=.5+.5*Math.sin(lt),Ct=.5+.5*Math.sin(lt+Math.PI);g.spine.rotation.x+=.1*J,g.head.rotation.x+=(.12+.06*bt)*J,g.shoulder1.rotation.x-=(.25+bt*.85)*J,g.elbow1.rotation.x+=(.2+bt*.55)*J,g.wrist1.rotation.x-=bt*.3*J,g["shoulder-1"].rotation.x-=(.13+Ct*.35)*J,g["elbow-1"].rotation.x+=(.15+Ct*.2)*J,s.position.y+=.025*Math.cos(lt)*J}if(B.life>0){const lt=1-B.life/B.duration,bt=Math.sin(Math.min(1,lt/.22)*Math.PI/2)*Math.pow(1-lt,1.8)*B.strength,Ct=bt*(B.heavy?1.2:1);s.rotation.x+=B.z*.17*Ct,s.rotation.z-=B.x*.21*Ct,s.position.x+=B.x*.045*Ct,s.position.z+=B.z*.055*Ct,g.spine.scale.z*=1-.075*bt,g.head.rotation.x-=.15*Ct,g.head.rotation.z-=B.x*.08*Ct,g.jaw.rotation.x-=.12*Ct,g["shoulder-1"].rotation.z-=.1*Ct,g.shoulder1.rotation.z+=.1*Ct,g.eyeL.scale.y*=1-.55*bt,g.eyeR.scale.y*=1-.55*bt}else Yt>0&&(s.rotation.x+=Yt*.065);s.position.y-=R*.22,s.rotation.z+=R*1.35,g.spine.scale.y*=1-R*.15}else if(i==="heron"){const ie=b*5.6,pt=E;s.position.y=.035*Math.sin(ie*2)*pt,g.spine.rotation.x=-.03*Math.sin(ie)*pt,g.neck0.rotation.x=.1*Math.sin(b*1.4)-D*.62,g.neck1.rotation.x=-.08*Math.sin(b*1.4)+D*.58,g.neck2.rotation.x=-.03+D*.7,g.head.rotation.x=-.06*Math.sin(b*1.8)+D*.48,g.jaw.rotation.x=-D*.5;for(const yt of[-1,1]){const ae=ie+(yt<0?Math.PI:0),Pe=Math.sin(ae);g[`hip${yt}`].rotation.x=Pe*.31*pt,g[`knee${yt}`].rotation.x=Math.max(0,-Pe)*.57*pt,g[`foot${yt}`].rotation.x=-.18*Pe*pt,g[`wing${yt}`].rotation.y=yt*(1.24-D*1.07-Yt*.55),g[`wing${yt}`].rotation.z=yt*(.07+D*(.5+.25*Math.sin(b*18))+Yt*.5),g[`wingElbow${yt}`].rotation.y=yt*.12,g[`wingWrist${yt}`].rotation.z=yt*D*.18}s.rotation.z+=(B.life>0?0:Yt*.08*Math.sin(b*32))+R*1.45,s.position.y-=R*1.8}else if(i==="snake"){const ie=b*(3+E*5),pt=.055+E*.105;for(let ae=1;ae<=20;ae++)g[`coil${ae}`].rotation.y=Math.sin(ie-ae*.48)*pt,g[`coil${ae}`].rotation.x=ae<6?-D*.18*(1-ae/7):.006*Math.sin(b*3-ae);g.head.rotation.x=D*.45,g.head.rotation.y=Math.sin(ie)*.035,g.jaw.rotation.x=-D*.62,s.position.y=D*.28;const yt=m.find(ae=>ae.name==="tongue");yt&&(yt.visible=!V.dead&&(Math.sin(b*3.7)>.77||D>.2)),s.rotation.z=R*.65+(B.life>0?0:Yt*.1*Math.sin(b*32))}else if(i==="fish"){const ie=b*(4+E*10),pt=.09+E*.22;g.spine.rotation.y=Math.sin(ie)*pt*.2,g.head.rotation.y=-Math.sin(ie)*pt*.13,g.tail0.rotation.y=Math.sin(ie-.5)*pt,g.tail1.rotation.y=Math.sin(ie-1.1)*pt*1.25,g.tail.rotation.y=Math.sin(ie-1.6)*pt*1.2,g.jaw.rotation.x=-D*.62-.035*Math.sin(b*2.5);for(const yt of[-1,1])g[`fin${yt}`].rotation.z=yt*(.13+.16*Math.sin(b*6)),g[`fin${yt}`].rotation.y=yt*.15*Math.sin(b*5);s.rotation.x=-D*.35,s.position.y=.035*Math.sin(b*2),s.rotation.z=R*Math.PI+(B.life>0?0:Yt*.14*Math.sin(b*35))}if(i!=="frog"&&B.life>0){const ie=1-B.life/B.duration,pt=Math.sin(Math.min(1,ie/.22)*Math.PI/2)*Math.pow(1-ie,1.8)*B.strength*(B.heavy?1.2:1);s.rotation.x+=B.z*.055*pt,s.rotation.z-=B.x*.08*pt,g.head.rotation.x-=.075*pt,g.head.rotation.z-=B.x*.05*pt}i==="snake"&&Ee(V.snakePose)},dispose(){o.dispose(),a.dispose(),f.material.dispose();for(const ht of m)ht.material.dispose();U&&U.traverse(ht=>{ht.isMesh&&ht.material.dispose()}),c.dispose(),n.removeFromParent()}};return le.setTier(t.tier||1),le.setLevel(t.level||1),le.setEquipment(t.equipment),le.setCrowned(t.crowned),le.update(0,{}),n.userData.creature=le,le}const De=Object.freeze({delivery:"catapult",interactionRange:3,baseRadius:.95,minRange:5,maxRange:28,blastRadius:2.8,innerRadius:1.25,flightTime:1.25,arcHeight:8,cooldown:3,recoilDuration:.45,centerLift:.85,rimLift:.45,centerRecovery:.48,rimRecovery:.42}),Sc=Object.freeze([{id:"catapult-player",x:0,z:12,owner:"player"},{id:"catapult-rival-1",x:-14,z:-16,owner:"rival-1"},{id:"catapult-rival-2",x:14,z:-16,owner:"rival-2"}].map(Object.freeze)),n_=(i,t,e)=>Math.max(t,Math.min(e,i));function i_(i,t,e,n=.6){const s=Math.hypot(t,e),r=s>1e-6?t/s:0,o=s>1e-6?e/s:-1,a=De.minRange+(De.maxRange-De.minRange)*n_(Number.isFinite(n)?n:.6,0,1),l=i.x*r+i.z*o,c=576-i.x*i.x-i.z*i.z,h=Math.max(0,-l+Math.sqrt(Math.max(0,l*l+c))),u=Math.min(a,h);return{x:i.x+r*u,z:i.z+o*u,range:u,valid:u>=De.minRange-1e-6}}function s_(){return Sc.map(i=>({...i,occupant:null,cooldown:0,loaded:!0,aimX:0,aimZ:-1,recoil:0}))}function $u(i,t){return i.catapults.filter(e=>(e.owner===t.id||!e.owner)&&(!e.occupant||e.occupant===t.id)&&Math.hypot(e.x-t.x,e.z-t.z)<=De.interactionRange).sort((e,n)=>Math.hypot(e.x-t.x,e.z-t.z)-Math.hypot(n.x-t.x,n.z-t.z))[0]||null}function Qs(i,t){const e=i.catapults.find(s=>s.id===t.catapultId);if(e?.occupant===t.id){e.occupant=null,t.x=e.x,t.z=e.z+2.3;const s=Math.hypot(t.x,t.z);s>24&&(t.x*=24/s,t.z*=24/s)}const n=!!t.catapultId;return t.catapultId=null,t.catapultShots=0,t.interactHeld=!1,n}function r_(i,t){if(t.catapultId)return Qs(i,t);if(t.ko||t.dizzyTime>0||t.knockUp>0||t.kick>0||t.id!=="player"&&i.phase!=="battle")return!1;const e=$u(i,t);return e?(e.occupant=t.id,t.catapultId=e.id,t.catapultShots=0,t.catapultAim=1,t.x=e.x,t.z=e.z,t.hop=0,t.height=0,t.idle=0,t.hopX=t.hopZ=0,t.impulseX=t.impulseZ=0,i.events.push({type:"catapultMount",id:t.id,catapultId:e.id}),!0):!1}function o_(i,t,e){const n=i.catapults.find(f=>f.id===t.catapultId);if(i.phase!=="battle"||t.ko||t.dizzyTime>0||!n||n.occupant!==t.id||!n.loaded||n.cooldown>0||e?.valid===!1||!Number.isFinite(e?.x)||!Number.isFinite(e?.z))return!1;let s=e.x,r=e.z;const o=Math.hypot(s,r);o>24&&(s*=24/o,r*=24/o);const a=s-n.x,l=r-n.z,c=Math.hypot(a,l);if(c<De.minRange-1e-6)return!1;const h=a/c,u=l/c;c>De.maxRange&&(s=n.x+h*De.maxRange,r=n.z+u*De.maxRange);const p={id:i.nextId++,owner:t.id,catapultId:n.id,startX:n.x+h,startZ:n.z+u,startHeight:1.6,tx:s,tz:r,age:0,duration:De.flightTime,arcHeight:De.arcHeight};return n.aimX=h,n.aimZ=u,n.loaded=!1,n.cooldown=De.cooldown,n.recoil=De.recoilDuration,t.catapultShots++,i.shells.push(p),i.events.push({type:"stoneShot",id:t.id,shellId:p.id,catapultId:n.id}),!0}function a_(i,t,e){for(const n of i.catapults)if(n.cooldown=Math.max(0,n.cooldown-t),n.recoil=Math.max(0,n.recoil-t),n.loaded=n.cooldown===0,n.occupant){const s=i.actors.find(r=>r.id===n.occupant);(!s||s.ko||s.dizzyTime>0||s.knockUp>0||s.catapultId!==n.id)&&(s&&s.catapultId===n.id?Qs(i,s):n.occupant=null)}for(const n of i.shells)if(n.age+=t,!(n.age<n.duration)&&(i.events.push({type:"stoneImpact",id:n.id,owner:n.owner,x:n.tx,z:n.tz,radius:De.blastRadius}),i.phase==="battle"))for(const s of i.actors){const r=s.x-n.tx,o=s.z-n.tz,a=Math.hypot(r,o);if(s.ko||a>De.blastRadius)continue;const l=n.tx-n.startX,c=n.tz-n.startZ,h=Math.hypot(l,c)||1,u=a>1e-6?{dx:r/a,dz:o/a}:{dx:l/h,dz:c/h},p=a<=De.innerRadius;e(i,s,{owner:n.owner,...u,damage:p?4:2,force:p?12:8,lift:p?De.centerLift:De.rimLift,liftDuration:p?De.centerRecovery:De.rimRecovery})}i.shells=i.shells.filter(n=>n.age<n.duration)}const qa="4.2.0",iu="frog-arcade-save-v1",Ya="frog-arcade-settings-v1",qt=Object.freeze({radius:25,capacity:40,dizzyHits:6,finishHits:3,dizzySeconds:4.5,tongueRange:3.2,pickupRange:3.2,tongueInterval:.22,kickRange:3.6,kickCooldown:1.1,kickDuration:.48,hopDuration:.3,landingDuration:.035,shotInterval:.14,projectileSpeed:32,projectileLifetime:.65,introSeconds:5}),ir=Object.freeze([{x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6}]),tr=Object.freeze([[0,3.5],[-13,8],[13,1],[-12,-11],[10,-14],[2,17]].map(([i,t],e)=>Object.freeze({id:`swarm-${e}`,x:i,z:t,radius:2.1}))),wn=(i,t,e)=>Math.max(t,Math.min(e,i)),Cn=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Jn=(i,t)=>{const e=Math.hypot(i,t);return e>1e-6?{x:i/e,z:t/e}:{x:0,z:1}},Ke=(i,t=0)=>Number.isFinite(i)?i:t;function yi(i){let t=i.seed+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function $a(i,t,e){return{id:i,x:t,z:e,aimX:0,aimZ:-1,aiming:!1,face:Math.PI,ammo:0,load:0,dizzy:0,finishHits:0,dizzyTime:0,ko:!1,hit:0,invuln:0,shot:0,tongue:0,kick:0,kickCooldown:0,kickPending:!1,impulseX:0,impulseZ:0,hop:0,hopX:0,hopZ:0,hopSpeed:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0,brain:0,decision:0,catapultId:null,catapultShots:0,catapultAim:0,interactHeld:!1,machineTimer:i==="rival-1"?8:12,machineSeeking:!1,aimWindup:0,aiShotReady:0,aiCharging:!1,aiAimX:0,aiAimZ:-1}}function Rr(i,t,e){let n=i.x+t,s=i.z+e;for(const o of ir){const a=Math.hypot(n-o.x,s-o.z),l=o.r+.78;if(a<l){const c=Jn(n-o.x,s-o.z);n=o.x+c.x*l,s=o.z+c.z*l}}for(const o of Sc){if(i.catapultId===o.id)continue;const a=Math.hypot(n-o.x,s-o.z),l=De.baseRadius+.78;if(a<l){const c=Jn(n-o.x,s-o.z);n=o.x+c.x*l,s=o.z+c.z*l}}const r=Math.hypot(n,s);r>qt.radius-1&&(n*=(qt.radius-1)/r,s*=(qt.radius-1)/r),i.x=n,i.z=s}function Yl(i,t,e,n,s,r){const o=e-i,a=n-t,l=i-s.x,c=t-s.z,h=o*o+a*a,u=l*l+c*c-r*r;if(u<=0)return 0;if(h<1e-12)return null;const p=2*(l*o+c*a),f=p*p-4*h*u;if(f<0)return null;const m=(-p-Math.sqrt(f))/(2*h);return m>=0&&m<=1?m:null}function Zo(i,t){return ir.every(e=>Yl(i.x,i.z,t.x,t.z,e,e.r+.1)===null)}function Zu(i,t){const e=tr[Math.floor(t.id/12)];t.swarmId=e.id;const n=yi(i)*Math.PI*2,s=Math.sqrt(yi(i))*e.radius;t.x=e.x+Math.sin(n)*s,t.z=e.z+Math.cos(n)*s,t.wait=0,t.phase=yi(i)*Math.PI*2}function $l(i=731){const t={version:1,swarmVersion:1,seed:i,time:0,status:"playing",phase:"collect",intro:qt.introSeconds,actors:[$a("player",0,8),$a("rival-1",-8,-16),$a("rival-2",8,-16)],flies:[],catapults:s_(),shells:[],bullets:[],events:[],nextId:1,stats:{caught:0,shots:0,hits:0,kos:0}};for(let e=0;e<72;e++){const n={id:e,swarmId:"",x:0,z:0,wait:0,phase:0};Zu(t,n),t.flies.push(n)}return Object.assign(t.flies[0],{x:0,z:5.5}),t}function l_(i,t){const e=Math.hypot(i,t);return{x:e>.08?i/Math.max(1,e):0,z:e>.08?t/Math.max(1,e):0,fire:e>=.72}}function Zl(i,t){return i.actors.filter(e=>e!==t&&!e.ko&&Cn(t,e)<=qt.kickRange&&Zo(t,e)).sort((e,n)=>Cn(t,e)-Cn(t,n))[0]||null}function c_(i,t){if(t.ko||t.dizzyTime>0||t.catapultId||t.tongue>0||t.ammo>=qt.capacity||t.id!=="player"&&i.phase!=="battle")return!1;const e=i.flies.filter(n=>n.wait<=0&&Cn(t,n)<=qt.pickupRange&&Zo(t,n)).sort((n,s)=>Cn(t,n)-Cn(t,s))[0];return e?(t.tongue=qt.tongueInterval,t.ammo++,e.wait=7+yi(i)*4,i.events.push({type:"tongue",id:t.id,x:e.x,z:e.z,swarmId:e.swarmId}),t.id==="player"&&i.stats.caught++,!0):!1}function h_(i,t){if(t.ko||t.dizzyTime>0||t.catapultId||t.shot>0||t.ammo<=0||t.id!=="player"&&i.phase!=="battle")return!1;t.shot=qt.shotInterval,t.ammo--;const e=Jn(t.aimX,t.aimZ);return i.bullets.push({id:i.nextId++,owner:t.id,x:t.x+e.x*1.2,z:t.z+e.z*1.2,dx:e.x,dz:e.z,life:qt.projectileLifetime}),i.events.push({type:"shot",id:t.id}),t.id==="player"&&(i.stats.shots++,i.phase==="practice"&&(i.phase="countdown",i.intro=qt.introSeconds)),!0}function u_(i,t,e){Qs(i,t),t.ko=!0,t.dizzyTime=0,t.hop=0,t.knockUp=0,t.knockUpStart=0,t.height=.9,t.impulseX=e.dx*17,t.impulseZ=e.dz*17,i.events.push({type:"ko",id:t.id,by:e.owner,x:t.x,z:t.z,dx:e.dx,dz:e.dz}),e.owner==="player"&&t.id!=="player"&&i.stats.kos++}function jl(i,t,e){if(t.ko||t.invuln>0)return!1;const n=Math.max(0,t.height),s=Jn(Ke(e.dx),Ke(e.dz)),r=wn(Ke(e.force,5),0,30);let o=wn(Math.floor(Ke(e.damage,1)),1,9);if(t.hit=.23,t.invuln=.12,t.impulseX=s.x*r,t.impulseZ=s.z*r,t.dizzyTime<=0){const a=Math.min(o,qt.dizzyHits-t.dizzy);t.dizzy+=a,o-=a,t.dizzy>=qt.dizzyHits&&(t.dizzy=qt.dizzyHits,t.dizzyTime=qt.dizzySeconds,t.finishHits=0,t.hop=0,t.knockUp<=0&&(t.height=0),Qs(i,t),i.events.push({type:"dizzy",id:t.id}))}return t.dizzyTime>0&&o>0&&(t.finishHits=Math.min(qt.finishHits,t.finishHits+o)),Ke(e.lift)>0&&(Qs(i,t),t.knockUpDuration=wn(Ke(e.liftDuration,.48),.25,.65),t.knockUp=t.knockUpDuration,t.knockUpPeak=wn(e.lift,.1,1.2),t.knockUpStart=n,t.height=n,t.hop=0,t.hopX=t.hopZ=0,t.hopSpeed=0,t.kick=0,t.kickPending=!1),i.events.push({type:"hit",id:t.id,owner:e.owner,x:t.x,z:t.z,dx:s.x,dz:s.z}),e.owner==="player"&&t.id!=="player"&&i.stats.hits++,t.finishHits>=qt.finishHits&&u_(i,t,{...e,dx:s.x,dz:s.z}),!0}function d_(i,t){if(i.phase!=="battle"||t.ko||t.dizzyTime>0||t.catapultId||t.knockUp>0||t.kick>0||t.kickCooldown>0)return!1;const e=Zl(i,t);if(!e)return!1;const n=Jn(e.x-t.x,e.z-t.z);return t.aimX=n.x,t.aimZ=n.z,t.kick=qt.kickDuration,t.kickCooldown=qt.kickCooldown,t.kickPending=!0,t.kickId=e.id,i.events.push({type:"kick",id:t.id}),!0}function f_(i,t){t.kickPending=!1;const e=i.actors.find(s=>s.id===t.kickId);if(!e||e.ko||Cn(t,e)>qt.kickRange+.25||!Zo(t,e))return;const n=Jn(e.x-t.x,e.z-t.z);jl(i,e,{owner:t.id,dx:n.x,dz:n.z,damage:1,force:14}),e.ko||(e.impulseX=n.x*14,e.impulseZ=n.z*14)}function p_(i,t){if(i.phase!=="battle")return{};const e=i.actors.filter(h=>h!==t&&!h.ko);if(!e.length)return{};const n=e.reduce((h,u)=>Cn(t,h)<Cn(t,u)?h:u),s=Cn(t,n),r=Jn(n.x-t.x,n.z-t.z);t.brain-=1/60,t.brain<=0&&(t.brain=.7+yi(i)*.5,t.decision=yi(i)>.5?1:-1);const o={aiming:!0,ax:r.x,az:r.z,kick:s<3.3};if(t.catapultId){if(s<7||t.catapultShots>=2)return t.machineTimer=18,t.machineSeeking=!1,{...o,interactCatapult:!0};const h=i.catapults.find(u=>u.id===t.catapultId);return{...o,throwStone:h?.loaded&&t.catapultAim<=0?{x:n.x,z:n.z}:void 0}}const a=i.catapults.find(h=>h.owner===t.id&&!h.occupant);if(t.machineTimer<=0&&!t.machineSeeking&&(t.machineSeeking=!!a&&s>9&&yi(i)<.45,t.machineTimer=5),t.machineSeeking&&a)if(s<6)t.machineSeeking=!1,t.machineTimer=12;else{const h=Jn(a.x-t.x,a.z-t.z);return{...o,mx:h.x,mz:h.z,aiming:!1,interactCatapult:Cn(t,a)<=De.interactionRange}}if(t.ammo<5){t.aiCharging=!1,t.aimWindup=0;const h=i.flies.filter(u=>u.wait<=0).sort((u,p)=>Cn(t,u)-Cn(t,p))[0];if(h){const u=Jn(h.x-t.x,h.z-t.z);return{...o,mx:u.x,mz:u.z,aiming:!1}}}let l=!1;if(s<16&&t.ammo>0&&Zo(t,n))if(!t.aiCharging&&t.aiShotReady<=0){const h=(yi(i)-.5)*.08,u=Math.cos(h),p=Math.sin(h);t.aiAimX=r.x*u-r.z*p,t.aiAimZ=r.x*p+r.z*u,t.aimWindup=.32,t.aiCharging=!0}else t.aiCharging&&t.aimWindup<=0&&(l=!0,t.aiCharging=!1,t.aiShotReady=.22+yi(i)*.1);else t.aiCharging=!1,t.aimWindup=0;const c=s>11?1:s<6?-1:0;return{...o,mx:r.x*c+r.z*t.decision*.45,mz:r.z*c-r.x*t.decision*.45,ax:t.aiCharging||l?t.aiAimX:r.x,az:t.aiCharging||l?t.aiAimZ:r.z,fire:l}}function su(i,t={},e=1/60){if(i.status==="playing"&&(i.events.length=0,e=wn(Ke(e),0,.05),e!==0)){i.time+=e,i.phase==="collect"&&i.stats.caught>=5&&(i.phase="practice"),i.phase==="countdown"&&(i.intro=Math.max(0,i.intro-e),i.intro===0&&(i.phase="battle",i.events.push({type:"battle"})));for(const n of i.flies)n.wait>0&&(n.wait-=e,n.wait<=0&&Zu(i,n));for(const n of i.actors){for(const h of["shot","tongue","invuln","hit","idle","kickCooldown","aimWindup","aiShotReady","catapultAim"])n[h]=Math.max(0,n[h]-e);if(i.phase==="battle"&&(n.machineTimer=Math.max(0,n.machineTimer-e)),n.ko){Qs(i,n),Rr(n,n.impulseX*e,n.impulseZ*e),n.impulseX*=Math.exp(-e*3),n.impulseZ*=Math.exp(-e*3),n.height=Math.max(0,n.height-e*1.6);continue}n.kick>0&&(n.kick=Math.max(0,n.kick-e),n.kickPending&&n.kick<.3&&f_(i,n)),n.dizzyTime>0&&(n.dizzyTime=Math.max(0,n.dizzyTime-e),n.dizzyTime===0&&(n.dizzy=0,n.finishHits=0,n.invuln=.55,i.events.push({type:"recover",id:n.id})));const s=n.id==="player"?t:p_(i,n);s.interactCatapult&&!n.interactHeld&&r_(i,n),n.interactHeld=!!s.interactCatapult;const r=n.catapultId?0:Ke(s.mx),o=n.catapultId?0:Ke(s.mz),a=Math.hypot(r,o),l=a>.08&&n.knockUp<=0,c=Number.isFinite(s.ax)&&Number.isFinite(s.az)&&Math.hypot(s.ax,s.az)>.05;if(n.aiming=s.aiming===void 0?c:s.aiming===!0,n.aiming&&c){const h=Jn(s.ax,s.az);n.aimX=h.x,n.aimZ=h.z}if(l&&(n.face=Math.atan2(r,o),!n.aiming&&n.kick<=0)){const h=Jn(r,o);n.aimX=h.x,n.aimZ=h.z}if(n.dizzyTime<=0){if(c_(i,n),i.phase==="collect"&&i.stats.caught>=5&&(i.phase="practice"),s.fire&&h_(i,n),s.kick&&d_(i,n),s.throwStone&&o_(i,n,s.throwStone),n.catapultId){const h=i.catapults.find(u=>u.id===n.catapultId);h&&(h.aimX=n.aimX,h.aimZ=n.aimZ,n.x=h.x,n.z=h.z,n.impulseX=n.impulseZ=0)}if(n.knockUp<=0&&n.hop<=0&&n.idle<=0&&l&&(n.hop=qt.hopDuration,n.hopSpeed=wn(a,0,1)),n.knockUp<=0&&n.hop>0){n.hop=Math.max(0,n.hop-e);const h=n.id==="player"?8.8:6.2,u=l?h/Math.max(1,a):0;n.hopX=r*u,n.hopZ=o*u,Rr(n,n.hopX*e,n.hopZ*e),n.height=Math.sin((1-n.hop/qt.hopDuration)*Math.PI)*(.35+.32*n.hopSpeed),n.hop===0&&(n.height=0,n.hopX=0,n.hopZ=0,n.idle=qt.landingDuration,i.events.push({type:"land",id:n.id,x:n.x,z:n.z}))}}if(Rr(n,n.impulseX*e,n.impulseZ*e),n.impulseX*=Math.exp(-e*10),n.impulseZ*=Math.exp(-e*10),n.knockUp>0){n.knockUp=Math.max(0,n.knockUp-e);const h=1-n.knockUp/n.knockUpDuration;n.height=n.knockUpStart*(1-h)+Math.sin(h*Math.PI)*n.knockUpPeak,n.knockUp===0&&(n.height=0,n.knockUpStart=0,n.idle=qt.landingDuration,i.events.push({type:"land",id:n.id,x:n.x,z:n.z,stone:!0,strength:n.knockUpPeak}))}n.load+=(n.ammo/qt.capacity-n.load)*(1-Math.exp(-e*12))}for(const n of i.bullets){const s=Math.min(e,Math.max(0,n.life));if(n.life-=e,s<=0)continue;const r=n.x+n.dx*qt.projectileSpeed*s,o=n.z+n.dz*qt.projectileSpeed*s;let a=2,l=null;for(const c of ir){const h=Yl(n.x,n.z,r,o,c,c.r+.1);h!==null&&h<a&&(a=h,l={type:"wall",o:c})}for(const c of i.actors){if(i.phase!=="battle"||c.id===n.owner||c.ko)continue;const h=Yl(n.x,n.z,r,o,c,1+c.load*.2);h!==null&&h<a&&(a=h,l={type:"actor",a:c})}l?(n.x+=(r-n.x)*a,n.z+=(o-n.z)*a,n.life=0,l.type==="actor"&&jl(i,l.a,n),i.events.push({type:"splat",x:n.x,z:n.z,wall:l.type==="wall",dx:n.dx,dz:n.dz})):(n.x=r,n.z=o,Math.hypot(r,o)>qt.radius-.2&&(n.life=0,i.events.push({type:"splat",x:r,z:o,wall:!1,dx:n.dx,dz:n.dz})))}i.bullets=i.bullets.filter(n=>n.life>0),a_(i,e,jl),i.actors[0].ko?i.status="lost":i.actors.slice(1).every(n=>n.ko)&&(i.status="won")}}function m_(i){return JSON.stringify({...i,events:[],bullets:[],shells:[]})}function g_(i){try{const t=JSON.parse(i);if(t?.version!==1||!Array.isArray(t.actors)||t.actors.length!==3||!Array.isArray(t.flies)||t.flies.length!==72||!["playing","won","lost"].includes(t.status))return null;const e=$l(Ke(t.seed,731));e.time=wn(Ke(t.time),0,1e7),e.status=t.status,e.nextId=Math.max(1,Math.floor(Ke(t.nextId,1))),e.intro=wn(Ke(t.intro,qt.introSeconds),0,qt.introSeconds),e.phase=["collect","practice","countdown","battle"].includes(t.phase)?t.phase:Ke(t.stats?.caught)>=5?"practice":"collect";for(let n=0;n<3;n++){const s=t.actors[n];if(s.id!==e.actors[n].id||!Number.isFinite(s.x)||!Number.isFinite(s.z))return null;for(const r of Object.keys(e.actors[n]))typeof e.actors[n][r]=="number"&&(e.actors[n][r]=Ke(s[r],e.actors[n][r]));Object.assign(e.actors[n],{ko:!!s.ko,aiming:!1,catapultId:null,interactHeld:!1,machineSeeking:!1,aiCharging:!1,aimWindup:0,ammo:wn(Math.floor(Ke(s.ammo)),0,qt.capacity),load:wn(Ke(s.load),0,1),dizzy:wn(Ke(s.dizzy),0,qt.dizzyHits),finishHits:wn(Ke(s.finishHits),0,qt.finishHits),dizzyTime:wn(Ke(s.dizzyTime),0,qt.dizzySeconds),kickPending:!1,kick:0,hop:0,hopX:0,hopZ:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0}),Rr(e.actors[n],0,0)}for(let n=0;n<72;n++){const s=t.flies[n],r=tr[Math.floor(n/12)];s&&(t.swarmVersion===1&&s.swarmId===r.id&&Number.isFinite(s.x)&&Number.isFinite(s.z)&&Cn(s,r)<=r.radius+.001&&Object.assign(e.flies[n],{x:s.x,z:s.z,phase:Ke(s.phase)}),e.flies[n].wait=wn(Ke(s.wait),0,12))}if(Array.isArray(t.catapults))for(const n of e.catapults){const s=t.catapults.find(o=>o.id===n.id);s&&(n.cooldown=wn(Ke(s.cooldown),0,De.cooldown),n.loaded=n.cooldown===0);const r=t.actors.find(o=>o.catapultId===n.id);if(r){const o=e.actors.find(a=>a.id===r.id);o.x=n.x,o.z=n.z+2.3,Rr(o,0,0)}}for(const n of Object.keys(e.stats))e.stats[n]=Math.max(0,Math.floor(Ke(t.stats?.[n])));return e}catch{return null}}function x_(i,t,e=1.6,n="chase3d"){const s=Number.isFinite(e)&&e>0?e:1.6;if(n==="overview"){const o=Math.max(.86,Math.min(1.6,Math.sqrt(1.2/s)));return{look:[i.x,t+1.2,i.z],position:[i.x,t+26*o,i.z+19*o]}}const r=Math.max(1,Math.min(1.42,.85/s));return{look:[i.x,t+1.2,i.z-.5],position:[i.x+8.8*r,t+5.5*r,i.z+6.6*r]}}function ru(i,t,e,n){const s=n.x-e.x,r=n.z-e.z,o=Math.hypot(s,r),a=o>1e-6?s/o:0,l=o>1e-6?r/o:-1,c=Number.isFinite(i)?i:0,h=Number.isFinite(t)?t:0;return{x:-l*c-a*h,z:a*c-l*h}}const ou=["#d2ff70","#ff765d","#d7a0ff"],v_=new Map(tr.map((i,t)=>[i.id,t])),au=new WeakMap;function ju(i){let t=au.get(i);t||(t=tr.map(e=>({swarm:e,available:0,next:1/0})),au.set(i,t));for(const e of t)e.available=0,e.next=1/0;for(const e of i.flies){const n=t[v_.get(e.swarmId)];n&&(e.wait<=0?n.available++:n.next=Math.min(n.next,e.wait))}return t}function Ku(i,t,e,n,s){i.fillStyle=s?"#dceee6":"#718781",i.beginPath(),i.ellipse(t-n*.5,e-n*.28,n*.6,n*.32,-.5,0,Math.PI*2),i.ellipse(t+n*.5,e-n*.28,n*.6,n*.32,.5,0,Math.PI*2),i.fill(),i.fillStyle=s?"#384c4c":"#536763",i.strokeStyle=s?"#b6d1c3":"#8ca09a",i.lineWidth=1.4,i.beginPath(),i.ellipse(t,e+n*.12,n*.34,n*.56,0,0,Math.PI*2),i.fill(),i.stroke()}function __(i,t){if(!t)return;const e=t.getContext("2d");if(!e)return;const n=t.width,s=n/2,r=n*.43,o=r/qt.radius;e.clearRect(0,0,n,n),e.save(),e.translate(s,s),e.fillStyle="#153e3af2",e.strokeStyle="#9bd1be",e.lineWidth=4,e.beginPath(),e.arc(0,0,r,0,Math.PI*2),e.fill(),e.stroke(),e.clip();const a=i.focus.x-i.camera.position.x,l=i.focus.z-i.camera.position.z,c=Math.hypot(a,l),h=c>1e-6?a/c:0,u=c>1e-6?l/c:-1,p=(f,m)=>({x:(-u*f+h*m)*o,y:-(h*f+u*m)*o});e.strokeStyle="#ffffff17",e.lineWidth=1;for(let f=-20;f<=20;f+=10){const m=p(f,-25),g=p(f,25),x=p(-25,f),d=p(25,f);e.beginPath(),e.moveTo(m.x,m.y),e.lineTo(g.x,g.y),e.moveTo(x.x,x.y),e.lineTo(d.x,d.y),e.stroke()}for(const f of ir){const m=p(f.x,f.z);e.fillStyle="#769084",e.beginPath(),e.arc(m.x,m.y,f.r*o,0,Math.PI*2),e.fill()}for(const f of ju(i.state)){const m=p(f.swarm.x,f.swarm.z),g=f.available>0;e.strokeStyle=g?"#b8daa7":"#6a827b",e.lineWidth=g?1.8:1.2,e.beginPath(),e.arc(m.x,m.y,9,0,Math.PI*2),e.stroke(),Ku(e,m.x,m.y,6,g)}i.state.actors.forEach((f,m)=>{if(f.ko)return;const g=p(f.x,f.z);if(e.fillStyle=ou[m],e.strokeStyle="#102923",e.lineWidth=3,e.beginPath(),e.arc(g.x,g.y,m===0?9:8,0,Math.PI*2),e.fill(),e.stroke(),m===0){const x=p(f.aimX*2.7,f.aimZ*2.7);e.strokeStyle=ou[0],e.lineWidth=4,e.beginPath(),e.moveTo(g.x,g.y),e.lineTo(g.x+x.x,g.y+x.y),e.stroke()}else e.fillStyle="#102923",e.beginPath(),e.arc(g.x-3,g.y-2,1.6,0,Math.PI*2),e.arc(g.x+3,g.y-2,1.6,0,Math.PI*2),e.fill()}),e.restore(),e.fillStyle="#f2ffe1",e.font="bold 18px sans-serif",e.textAlign="center",e.fillText("ΣΜΗΝΗ • ΑΝΤΙΠΑΛΟΙ",s,n-5)}function M_(i,t){const e=i.state.actors[0];if(e.ko||e.ammo>=qt.capacity)return;let n=null,s=null,r=1/0,o=1/0;for(const x of ju(i.state)){const d=Math.hypot(x.swarm.x-e.x,x.swarm.z-e.z);d<r&&(n=x,r=d),x.available>0&&d<o&&(s=x,o=d)}const l=n&&n.available===0&&r<=n.swarm.radius+qt.pickupRange+.5?n:s;if(!l)return;const c=l.swarm,h=i.project(c.x,i.ground(c.x,c.z)+.35,c.z),u=i.touch&&i.h>i.w?240:110,p=i.touch?Math.min(165,i.h*.3):65;if(!h.visible||h.x<72||h.x>i.w-72||h.y<u||h.y>i.h-p)return;t.save(),t.font="700 12px sans-serif",t.textAlign="left",t.lineJoin="round";const f=l.available>0?`Μύγες · ${l.available}`:`Ξανά σε ${Math.max(1,Math.ceil(l.next))}″`,m=t.measureText(f).width+22,g=h.x-m/2;Ku(t,g+7,h.y+8,6,l.available>0),t.strokeStyle="#18352de6",t.lineWidth=3,t.strokeText(f,g+20,h.y+12),t.fillStyle=l.available>0?"#e8f4d5":"#c1d0c9",t.fillText(f,g+20,h.y+12),t.restore()}function y_(i,t,e=qt.projectileSpeed*qt.projectileLifetime){const n=Math.hypot(t.aimX,t.aimZ)||1,s=t.aimX/n,r=t.aimZ/n;let o=e,a=null,l=!1;const c=(p,f,m)=>{const g=t.x+s*1.2-p,x=t.z+r*1.2-f,d=g*s+x*r,b=g*g+x*x-m*m,M=d*d-b;if(M<0)return 1/0;const _=-d-Math.sqrt(M);return b<0?1.2:_>=0?_+1.2:1/0},h=t.x*s+t.z*r,u=t.x*t.x+t.z*t.z-(qt.radius-.2)**2;o=Math.min(o,Math.max(1.2,-h+Math.sqrt(Math.max(0,h*h-u))));for(const p of ir){const f=c(p.x,p.z,p.r+.1);f<o&&(o=f,l=!0)}for(const p of i.actors){if(p===t||p.ko)continue;const f=c(p.x,p.z,1+p.load*.2);f<o&&(o=f,a=p.id,l=!1)}return{x:t.x+s*o,z:t.z+r*o,distance:o,targetId:a,blocked:l}}const S_=new L(0,1,0),b_=Math.PI*2,Za=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),wo=(i,t,e)=>i+(t-i)*e,Eo=["#b8e76c","#ef886a","#be94e0"],w_=.45;class E_{constructor(t){this.game=t,this.scene=t.scene,this.clock=0,this.machines=new Map,this.shellMeshes=new Map,this.dummy=new $e,this._vector=new L,this._direction=new L,this.geometry={box:new $i(1,1,1),cylinder:new Or(.5,.5,1,8),rock:new Xo(.4,0),leaf:new ci(1,10,5),cup:new ci(.38,10,6,0,b_,Math.PI/2,Math.PI/2),ring:new us(.94,1,48),disc:new Vo(1,32),rope:new gc(.14,.027,5,10)},this.material={wood:new Bi({color:"#a47746"}),lightWood:new Bi({color:"#d4ac64"}),darkWood:new Bi({color:"#67503c"}),rope:new Bi({color:"#d3c593"}),leaf:new Bi({color:"#5c9b67"}),stone:new Bi({color:"#90999b",emissive:"#172023",emissiveIntensity:.16}),preview:new Fu({color:"#e6f7a1",dashSize:.45,gapSize:.25,transparent:!0,opacity:.85,depthWrite:!1}),landing:new Ln({color:"#d6ed8b",transparent:!0,opacity:.72,side:Fe,depthWrite:!1})};for(const[s,r]of Sc.entries())this.machines.set(r.id,this.createMachine(r,s));const e=new Float32Array(99),n=new Te;n.setAttribute("position",new an(e,3)),this.previewLine=new zr(n,this.material.preview),this.previewLine.name="catapult-trajectory-preview",this.previewLine.frustumCulled=!1,this.previewLine.visible=!1,this.scene.add(this.previewLine),this.landingMarker=new ne(this.geometry.ring,this.material.landing),this.landingMarker.name="catapult-landing-preview",this.landingMarker.rotation.x=-Math.PI/2,this.landingMarker.scale.setScalar(De.blastRadius),this.landingMarker.visible=!1,this.scene.add(this.landingMarker)}ground(t,e){return this.game.ground(t,e)}mesh(t,e,n,s=[0,0,0],r=[1,1,1]){const o=new ne(e,n);return o.position.fromArray(s),o.scale.fromArray(r),t.add(o),o}createMachine(t,e){const n=new pe;n.name=t.id,n.position.set(t.x,this.ground(t.x,t.z),t.z),this.scene.add(n);const s=new pe;s.name="wooden-catapult-frame",n.add(s);const r={wood:[],lightWood:[],darkWood:[],rope:[]},o=(M,_,C,R,E,A,S)=>{const y=this.geometry.box.clone();y.scale(E,A,S),y.translate(_,C,R),r[M].push(y)},a=(M,_,C,R)=>{const E=new L(..._),A=new L(...C),S=A.clone().sub(E),y=this.geometry.cylinder.clone();y.scale(R,S.length(),R),y.applyQuaternion(new qi().setFromUnitVectors(S_,S.normalize())),y.translate(...E.add(A).multiplyScalar(.5).toArray()),r[M].push(y)};for(const M of[-1,1])o("wood",M*.82,.18,.6,.26,.28,2.65);for(const M of[-.55,.12,.83,1.68])o("lightWood",0,.29,M,1.98,.14,.22);o("darkWood",0,.34,-.03,1.2,.14,.93);for(const M of[-1,1])a("wood",[M*.76,.3,.1],[M*.76,.99,1],.17),a("wood",[M*.76,.3,1.83],[M*.76,.99,1],.17),a("rope",[M*.77,.48,.35],[M*.77,.58,.47],.21),a("rope",[M*.77,.48,1.61],[M*.77,.58,1.49],.21);a("darkWood",[-.94,.85,1],[.94,.85,1],.22),o("lightWood",0,.52,1.66,1.72,.17,.17);for(const[M,_]of Object.entries(r)){if(!_.length)continue;const C=_c(_);for(const E of _)E.dispose();const R=this.mesh(s,C,this.material[M]);R.userData.ownedGeometry=!0}const l=this.mesh(s,this.geometry.leaf,this.material.leaf,[0,.41,-.04],[.59,.065,.48]);l.name="operator-seat";const c=new Bi({color:Eo[e%Eo.length]}),h=this.mesh(s,this.geometry.leaf,c,[-.98,.64,1.65],[.13,.45,.3]);h.rotation.z=-.3,h.name="side-leaf";const u=new pe;u.name="throwing-arm",u.position.set(0,.85,1),s.add(u),this.mesh(u,this.geometry.box,this.material.lightWood,[0,.07,0],[.18,1.2,.2]),this.mesh(u,this.geometry.box,this.material.darkWood,[0,-.48,0],[.43,.27,.37]);const p=this.mesh(u,this.geometry.cup,this.material.darkWood,[0,.57,0],[1.1,.72,1.3]);p.name="stone-cup";const f=this.mesh(u,this.geometry.rock,this.material.stone,[0,.75,0],[.78,.7,.8]);f.name="loaded-catapult-stone",u.rotation.x=-.45;const m=new pe;m.name="reload-winch",m.position.set(0,.61,.53),s.add(m);const g=this.mesh(m,this.geometry.cylinder,this.material.darkWood,[0,0,0],[.13,1.37,.13]);g.rotation.z=Math.PI/2;for(const M of[-1,1]){const _=this.mesh(m,this.geometry.box,this.material.lightWood,[M*.47,.12,0],[.13,.35,.12]);_.name="operator-handle";const C=this.mesh(s,this.geometry.rope,this.material.rope,[M*.76,.85,1],[1,1,1]);C.rotation.y=Math.PI/2}const x=[];for(let M=0;M<2;M++){const _=this.mesh(s,this.geometry.rock,this.material.stone,[1.17,.29,.72+M*.64],[.65,.6,.68]);_.rotation.set(M*.7,.6+M,0),x.push(_)}const d=new Ln({color:Eo[e%Eo.length],transparent:!0,opacity:.25,side:Fe,depthWrite:!1}),b=this.mesh(n,this.geometry.ring,d,[0,.045,.4],[1.65,1.65,1.65]);return b.rotation.x=-Math.PI/2,b.name="catapult-station-ring",{group:n,turret:s,arm:u,winch:m,loadedRock:f,pile:x,ring:b,factionMaterial:c,ringMaterial:d,definition:t,launchAge:1/0,yaw:Math.PI}}operatorPose(t){const e=this.machines.get(typeof t=="string"?t:t?.id);if(!e)return null;const n=this.game.state.catapults?.find(s=>s.id===e.definition.id);return{x:e.definition.x,y:this.ground(e.definition.x,e.definition.z)+w_,z:e.definition.z,yaw:n?Math.atan2(n.aimX,n.aimZ):e.yaw}}consumeEvent(t){if(t.type==="stoneShot"){const e=this.machines.get(t.catapultId);e&&(e.launchAge=0,e.arm.rotation.x=0,e.loadedRock.visible=!1)}}shellPoint(t,e,n=this._vector){const s=wo(t.startX,t.tx,e),r=wo(t.startZ,t.tz,e),o=this.ground(t.startX,t.startZ)+(t.startHeight??1.6),a=this.ground(t.tx,t.tz)+.12;return n.set(s,wo(o,a,e)+4*t.arcHeight*e*(1-e),r)}createShell(t){const e=this.mesh(this.scene,this.geometry.rock,this.material.stone,void 0,[1.05,.95,1.14]);e.name=`catapult-stone-${t.id}`;const n=new Ln({color:t.owner==="player"?"#e4c36e":"#f17e62",transparent:!0,opacity:.45,side:Fe,depthWrite:!1}),s=this.mesh(this.scene,this.geometry.ring,n,[t.tx,this.ground(t.tx,t.tz)+.055,t.tz],[De.blastRadius,De.blastRadius,De.blastRadius]);s.rotation.x=-Math.PI/2,s.name=`catapult-danger-${t.id}`;const r=this.mesh(this.scene,this.geometry.disc,n,[t.tx,this.ground(t.tx,t.tz)+.05,t.tz],[.13,.13,.13]);return r.rotation.x=-Math.PI/2,{stone:e,ring:s,core:r,material:n}}updatePreview(){const t=this.game.state,e=t.actors[0],n=this.game.catapultAim,s=t.catapults?.find(m=>m.id===e.catapultId&&m.occupant===e.id),r=n?.target,o=this.game.running&&n?.active&&s&&r&&Number.isFinite(r.x)&&Number.isFinite(r.z)&&!e.ko&&e.dizzyTime<=0;if(this.previewLine.visible=!!o,this.landingMarker.visible=!!o,!o)return;const a=r.x-s.x,l=r.z-s.z,c=Math.hypot(a,l)||1,h={startX:s.x+a/c,startZ:s.z+l/c,startHeight:1.6,tx:r.x,tz:r.z,arcHeight:De.arcHeight},u=this.previewLine.geometry.attributes.position;for(let m=0;m<u.count;m++){const g=this.shellPoint(h,m/(u.count-1));u.setXYZ(m,g.x,g.y,g.z)}u.needsUpdate=!0,this.previewLine.computeLineDistances(),this.landingMarker.position.set(r.x,this.ground(r.x,r.z)+.065,r.z),this.landingMarker.scale.setScalar(De.blastRadius);const p=s.loaded&&s.cooldown<=0,f=r.valid===!1;this.material.preview.color.set(f?"#ef826d":p?"#e6f7a1":"#b7bfaf"),this.material.landing.color.set(f?"#ef826d":p?"#d6ed8b":"#b7bfaf")}poseOperator(t,e,n){const s=this.game.state.actors.findIndex(c=>c.id===t.id),r=this.game.models?.[s];if(!r?.bones||t.ko)return;const o=r.bones,a=n.cooldown>0,l=a?Math.sin(this.clock*9)*.13:0;for(const c of[-1,1]){const h=o[`shoulder${c}`],u=o[`elbow${c}`],p=o[`wrist${c}`];h&&(h.rotation.x=-.53-l*c,h.rotation.z=c*.08),u&&(u.rotation.x=.45+l*c),p&&(p.rotation.x=-.18)}o.spine&&(o.spine.rotation.x=.08+Math.abs(l)*.12),o.head&&(o.head.rotation.x=-.04)}update(t=0){const e=this.game.running?Math.max(0,Math.min(.1,t)):0;this.clock+=e;const n=this.game.state;for(const s of n.catapults||[]){const r=this.machines.get(s.id);if(!r)continue;r.group.position.y=this.ground(s.x,s.z);const o=Math.atan2(s.aimX,s.aimZ);r.yaw=o,r.turret.rotation.y=o,Number.isFinite(r.launchAge)&&(r.launchAge+=e);const a=this.game.catapultAim;let c=s.occupant==="player"&&a?.active?-.74:-.45;if(s.cooldown>0){const u=1-Za(s.cooldown/(De.cooldown||3));c=wo(.6,-.45,u*u),r.winch.rotation.x=this.clock*7}else r.winch.rotation.x=0;r.launchAge<.18&&(c=.6*Math.sin(Za(r.launchAge/.09)*Math.PI/2)),r.arm.rotation.x+=(c-r.arm.rotation.x)*(1-Math.exp(-e*18)),r.loadedRock.visible=!!s.loaded,r.ring.material.opacity=s.occupant?.42:.2;const h=n.actors.find(u=>u.id===s.occupant);h&&this.poseOperator(h,r,s)}for(const s of n.shells||[]){let r=this.shellMeshes.get(s.id);r||(r=this.createShell(s),this.shellMeshes.set(s.id,r));const o=Za(s.age/s.duration);this.shellPoint(s,o,r.stone.position),r.stone.rotation.set(s.age*4,s.age*3,s.age*1.5),r.material.opacity=.35+.22*o+.08*Math.sin(this.clock*13)}for(const[s,r]of this.shellMeshes)(n.shells||[]).some(o=>o.id===s)||(r.stone.removeFromParent(),r.ring.removeFromParent(),r.core.removeFromParent(),r.material.dispose(),this.shellMeshes.delete(s));this.updatePreview()}dispose(){for(const t of this.machines.values())t.group.removeFromParent(),t.group.traverse(e=>{e.userData.ownedGeometry&&e.geometry.dispose()}),t.factionMaterial.dispose(),t.ringMaterial.dispose();for(const t of this.shellMeshes.values())t.stone.removeFromParent(),t.ring.removeFromParent(),t.core.removeFromParent(),t.material.dispose();this.previewLine.removeFromParent(),this.previewLine.geometry.dispose(),this.landingMarker.removeFromParent();for(const t of Object.values(this.geometry))t.dispose();for(const t of Object.values(this.material))t.dispose();this.machines.clear(),this.shellMeshes.clear()}}const T_=Math.PI*2,A_=new L(0,1,0),Sr=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),ja=i=>Number.isFinite(i?.x)&&Number.isFinite(i?.z),lu=["#c4e4de","#83bcb4","#eaf4e4"].map(i=>new Qt(i)),To=Object.freeze({mobileDrops:96,desktopDrops:144,mobileRipples:6,desktopRipples:8}),R_=`
 varying vec2 vUv;
 varying vec3 vNormal;
 #include <fog_pars_vertex>
 void main(){
  vUv=uv;
  vNormal=normalize(mat3(modelMatrix)*normal);
  vec4 mvPosition=modelViewMatrix*vec4(position,1.0);
  gl_Position=projectionMatrix*mvPosition;
  #include <fog_vertex>
 }
`,C_=`
 uniform float uAge;
 uniform float uOpacity;
 uniform vec3 uWater;
 uniform vec3 uFoam;
 varying vec2 vUv;
 varying vec3 vNormal;
 #include <fog_pars_fragment>
 void main(){
  vec2 uv=vUv*2.0-1.0;
  float r=length(uv);
  float life=clamp(uAge,0.0,1.0);
  float angle=atan(uv.y,uv.x);
  float front=0.14+0.78*sqrt(life);
  float breakup=0.5+0.5*sin(angle*17.0+sin(angle*6.0)*1.4+life*7.0);
  float edge=abs(r-front-(breakup-0.5)*0.018);
  float band=1.0-smoothstep(0.020,0.055,edge);
  float inner=1.0-smoothstep(0.012,0.036,abs(r-max(0.0,front-0.16)));
  float fade=pow(1.0-life,1.4);
  float core=exp(-r*r*65.0)*exp(-life*24.0);
  float foam=band*(0.65+0.35*breakup)+inner*0.20;
  float alpha=(foam*fade+core*0.65)*uOpacity;
  if(alpha<0.012||r>1.0)discard;
  float light=0.76+0.24*max(0.0,dot(normalize(vNormal),normalize(vec3(-0.4,0.85,0.3))));
  vec3 color=mix(uWater,uFoam,clamp(foam+core,0.0,1.0))*light;
  gl_FragColor=vec4(color,alpha);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  #include <fog_fragment>
 }
`;class P_{constructor(t){this.game=t,this.scene=t.scene,this.time=0,this.seed=7919,this.cursor=0,this.rippleCursor=0,this.capacity=t.touch?To.mobileDrops:To.desktopDrops,this.particles=Array.from({length:this.capacity},()=>({life:0,total:1,x:0,y:0,z:0,vx:0,vy:0,vz:0,size:.08,color:0})),this.dummy=new $e,this.direction=new L,this.dropGeometry=new ci(1,7,5),this.dropMaterial=new Bi({color:"#ffffff",emissive:"#163a35",emissiveIntensity:.06,depthTest:!0,depthWrite:!0}),this.droplets=new Tn(this.dropGeometry,this.dropMaterial,this.capacity),this.droplets.name="arcade-impact-droplets",this.droplets.instanceMatrix.setUsage(Mi),this.droplets.frustumCulled=!1,this.droplets.count=0;for(let n=0;n<this.capacity;n++)this.droplets.setColorAt(n,lu[0]);this.droplets.instanceColor.setUsage(Mi),this.scene.add(this.droplets);const e=t.touch?To.mobileRipples:To.desktopRipples;this.ripples=Array.from({length:e},(n,s)=>{const r=new Si(2,2,8,8);r.rotateX(-Math.PI/2);const o=r.attributes.position.array.slice(),a=new Bn({vertexShader:R_,fragmentShader:C_,uniforms:No.merge([Rt.fog,{uAge:{value:0},uOpacity:{value:.75},uWater:{value:new Qt("#6aaba4")},uFoam:{value:new Qt("#e8f2df")}}]),transparent:!0,depthTest:!0,depthWrite:!1,side:Fe,fog:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),l=new ne(r,a);return l.name=`arcade-impact-ripple-${s}`,l.frustumCulled=!1,l.visible=!1,this.scene.add(l),{mesh:l,reference:o,age:0,duration:1,active:!1}})}ground(t,e){const n=this.game.ground(t,e);return Number.isFinite(n)?n:0}random(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}ripple(t,e,n,s,r=.75){const o=this.ripples[this.rippleCursor++%this.ripples.length],a=o.mesh.geometry.attributes.position;for(let l=0;l<a.count;l++){const c=t+o.reference[l*3]*n,h=e+o.reference[l*3+2]*n;a.setXYZ(l,c,this.ground(c,h)+.035,h)}a.needsUpdate=!0,o.mesh.geometry.computeVertexNormals(),o.mesh.material.uniforms.uAge.value=0,o.mesh.material.uniforms.uOpacity.value=r,o.age=0,o.duration=s,o.active=!0,o.mesh.visible=!0}emit({x:t,y:e,z:n,count:s,power:r,spread:o=.12,dx:a=0,dz:l=0,lifetime:c=.55}){const h=Math.hypot(a,l);h>0&&(a/=h,l/=h);for(let u=0;u<s;u++){const p=this.particles[this.cursor++%this.capacity],f=this.random()*T_,m=(.8+this.random()*1.7)*r;p.x=t+(this.random()-.5)*o,p.y=e+this.random()*.07,p.z=n+(this.random()-.5)*o,p.vx=Math.sin(f)*m+a*r*.65,p.vz=Math.cos(f)*m+l*r*.65,p.vy=(1.8+this.random()*2.2)*r,p.total=c*(.82+this.random()*.3),p.life=p.total,p.size=(.045+this.random()*.045)*Math.sqrt(r),p.color=u%3}this.drawDrops()}hit({x:t,z:e,dx:n=0,dz:s=0,height:r,heavy:o=!1}={}){if(!ja({x:t,z:e}))return;const a=this.ground(t,e),l=Number.isFinite(r)?Math.max(a+.04,r):a+.7;this.ripple(t,e,o?1.3:.72,o?.54:.4,o?.8:.64),this.emit({x:t,y:l,z:e,dx:n,dz:s,count:o?15:8,power:o?1.2:.72,spread:o?.22:.1,lifetime:o?.58:.43})}stone({x:t,z:e,radius:n=2.8}={}){if(!ja({x:t,z:e}))return;const s=Sr(Number.isFinite(n)?n:2.8,1,4);this.ripple(t,e,s,.74,.9),this.emit({x:t,y:this.ground(t,e)+.12,z:e,count:this.game.touch?28:34,power:1.8,spread:.55,lifetime:.76})}landing({x:t,z:e,strength:n=1}={}){if(!ja({x:t,z:e}))return;const s=Sr(Number.isFinite(n)?n:1,.35,1.8);this.ripple(t,e,.75+s*.42,.48,.68),this.emit({x:t,y:this.ground(t,e)+.08,z:e,count:Math.round(6+s*5),power:.6+s*.28,spread:.25,lifetime:.48})}drawDrops(){let t=0;for(const e of this.particles){if(e.life<=0)continue;const n=Sr(e.life/.13),s=e.size*n;this.dummy.position.set(e.x,e.y,e.z),this.direction.set(e.vx,e.vy,e.vz),this.direction.lengthSq()>1e-6?this.dummy.quaternion.setFromUnitVectors(A_,this.direction.normalize()):this.dummy.quaternion.identity(),this.dummy.scale.set(s,s*1.55,s),this.dummy.updateMatrix(),this.droplets.setMatrixAt(t,this.dummy.matrix),this.droplets.setColorAt(t,lu[e.color]),t++}this.droplets.count=t,this.droplets.instanceMatrix.needsUpdate=!0,this.droplets.instanceColor.needsUpdate=!0}update(t=0){const e=Sr(Number.isFinite(t)?t:0,0,.1);if(e!==0){this.time+=e;for(const n of this.particles){if(n.life<=0||(n.life=Math.max(0,n.life-e),n.life===0))continue;n.x+=n.vx*e,n.z+=n.vz*e,n.y+=n.vy*e-7*e*e,n.vy-=14*e;const s=Math.exp(-e*1.2);n.vx*=s,n.vz*=s;const r=this.ground(n.x,n.z)+.025;n.y<r&&(n.y=r,n.vy=0,n.vx*=.3,n.vz*=.3,n.life=Math.min(n.life,.06))}this.drawDrops();for(const n of this.ripples)n.active&&(n.age+=e,n.mesh.material.uniforms.uAge.value=Sr(n.age/n.duration),n.age>=n.duration&&(n.active=!1,n.mesh.visible=!1))}}clear(){for(const t of this.particles)t.life=0;this.droplets.count=0;for(const t of this.ripples)t.active=!1,t.mesh.visible=!1,t.age=0;this.time=0}dispose(){this.clear(),this.droplets.removeFromParent(),this.dropGeometry.dispose(),this.dropMaterial.dispose();for(const t of this.ripples)t.mesh.removeFromParent(),t.mesh.geometry.dispose(),t.mesh.material.dispose()}}const dn=L,Ka=new dn(0,1,0),Ja=(i,t,e)=>Math.max(t,Math.min(e,i)),cu=i=>{try{return localStorage.getItem(i)}catch{return null}},Qa=(i,t)=>{try{return localStorage.setItem(i,t),!0}catch{return!1}},Br=i=>`<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">${i}</svg>`,D_=Br('<ellipse cx="21" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(-30 21 23)"/><ellipse cx="43" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(30 43 23)"/><ellipse cx="32" cy="37" rx="10" ry="15" fill="#344b50" stroke="#12282b" stroke-width="3"/><circle cx="27" cy="25" r="5" fill="#fff6cd"/><circle cx="37" cy="25" r="5" fill="#fff6cd"/><circle cx="28" cy="25" r="2" fill="#14282c"/><circle cx="36" cy="25" r="2" fill="#14282c"/>'),I_=Br('<path d="m15 8 11 5-4 21 29 6 4 10-36 4-9-11z" fill="#d3ff80" stroke="#314b2d" stroke-width="3"/><path d="m46 13 4 8m9-5-6 9m9 4-9 1" stroke="#ffce71" stroke-width="4"/>'),L_=Br('<path d="M9 50h46M18 47l10-28 18 28M31 27l20-17" stroke="#d9bf82" stroke-width="6" stroke-linecap="round"/><path d="m45 9 13 4-4 10-12-5z" fill="#8ea29a"/><circle cx="17" cy="53" r="6" fill="#6d4e35"/><circle cx="48" cy="53" r="6" fill="#6d4e35"/>'),hu=Br('<path d="M18 10v44l36-22z" fill="#f3ffd0" stroke="#264e26" stroke-width="4" stroke-linejoin="round"/>'),U_=Br('<path d="M12 18h40M12 32h40M12 46h40" stroke="#e9f3e5" stroke-width="5" stroke-linecap="round"/><circle cx="24" cy="18" r="6" fill="#fbc562"/><circle cx="42" cy="32" r="6" fill="#fbc562"/><circle cx="24" cy="46" r="6" fill="#fbc562"/>');class z_{constructor(){this.volume=.5,this.ctx=null,this.gain=null}resume(){try{this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext),this.gain=this.ctx.createGain(),this.gain.connect(this.ctx.destination)),this.gain.gain.value=this.volume,this.ctx.resume()}catch{}}pause(){this.ctx&&(this.gain.gain.value=0,this.ctx.suspend().catch(()=>{}))}play(t){if(!this.ctx||this.ctx.state!=="running"||this.volume<=0)return;const e=this.ctx,n=e.currentTime,s=e.createOscillator(),r=e.createGain(),a={shot:[200,70,.065],tongue:[560,150,.11],hit:[110,45,.12],hitConfirm:[860,530,.07],stoneShot:[110,65,.2],stoneImpact:[75,35,.3],land:[95,50,.13],dizzy:[700,240,.28],ko:[80,330,.26],win:[400,800,.45],lost:[220,55,.4]}[t];a&&(s.type=t==="hit"?"triangle":"sine",s.frequency.setValueAtTime(a[0],n),s.frequency.exponentialRampToValueAtTime(a[1],n+a[2]),r.gain.setValueAtTime(1e-4,n),r.gain.exponentialRampToValueAtTime(.14,n+.008),r.gain.exponentialRampToValueAtTime(1e-4,n+a[2]),s.connect(r),r.connect(this.gain),s.start(n),s.stop(n+a[2]+.01),s.onended=()=>{s.disconnect(),r.disconnect()})}}class N_{constructor(){this.touch=matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>0,this.settings={volume:.5,quality:this.touch?"low":"high"};try{Object.assign(this.settings,JSON.parse(cu(Ya)||"{}"))}catch{}this.settings.volume=Ja(Number(this.settings.volume)||0,0,1),["low","high"].includes(this.settings.quality)||(this.settings.quality="low"),this.state=$l(),this.saved=g_(cu(iu)),this.running=!1,this.mode="title",this.keys=new Set,this.actions={fire:!1,kick:!1},this.aimStrength=0,this.lastMouseAim=-1/0,this.move={x:0,z:0},this.aim={x:0,z:-1},this.mouse={x:0,y:0,valid:!1},this.pointers=new Map,this.fx=[],this.particles=[],this.splats=[],this.tongues=new Map,this.bulletMeshes=new Map,this.koTimes=new Map,this.elapsed=0,this.shake=0,this.saveClock=0,this.accumulator=0,this.failures=[],this.hitConfirmUntil=0,this.lastPlayerHit=null,this.scene=new Yf,this.scene.background=new Qt("#9fe4ff"),this.scene.fog=new Go("#baf0ea",.006),this.renderer=new hv({antialias:!this.touch,powerPreference:"high-performance"}),this.renderer.domElement.id="arcade-world",this.renderer.domElement.setAttribute("aria-label","FROG — κωμική μάχη με μύγες"),this.renderer.outputColorSpace=An,this.renderer.toneMapping=fu,this.renderer.toneMappingExposure=1.3,document.body.append(this.renderer.domElement),this.camera=new Rn(52,innerWidth/innerHeight,.1,250),this.camera.position.set(0,8,15),this.focus=new dn(0,2,3),this.cameraTarget=new dn(0,8,15),this.viewMode="overview",this.cameraReady=!1,this.scene.add(new yp("#def8ff","#52733a",2.6)),this.sun=new Ep("#fff1bf",3.2),this.sun.position.set(-16,36,12),this.scene.add(this.sun),this.world=Xv(this.scene,this.renderer,{seed:731,natural:!0});const t=this.world.group.getObjectByName("Fly swarms");t&&(t.visible=!1);for(const e of this.world.hotspots)e.flies=0;this.labels=document.createElement("canvas"),this.labels.id="arcade-labels",document.body.append(this.labels),this.labelCtx=this.labels.getContext("2d"),this.sound=new z_,this.sound.volume=this.settings.volume,this.shared={sphere:new ci(1,10,7),wing:new ci(1,6,4),cylinder:new Or(1,1,1,8),circle:new Vo(1,18)},this.materials={insect:new Ve({color:"#263f42",roughness:.8,metalness:0}),wing:new Ln({color:"#edfcff",transparent:!0,opacity:.86,side:Fe,depthWrite:!1}),tongue:new Ve({color:"#ff839c",roughness:.4}),shot:new Ve({color:"#384b4d",emissive:"#a6c9bf",emissiveIntensity:.16}),ink:new Ln({color:"#90e44c",transparent:!0,opacity:.9,depthWrite:!1,side:Fe}),rock:new Ve({color:"#617b70",roughness:.9}),rim:new Ln({color:"#eaff9e",transparent:!0,opacity:.6,depthWrite:!1})},this.createArena(),this.models=[],this.buildActors(),this.createFlies(),this.artilleryView=new E_(this),this.impactEffects=new P_(this),this.createUI(),this.bindInputs(),this.applyQuality(),this.resize(),this.showTitle(),window.__FROG__={version:qa,mode:"arcade",inspect:()=>this.inspect(),save:()=>this.persist()},new URLSearchParams(location.search).has("test")&&(window.__FROG__.test={step:(e,n=1)=>{for(let s=0;s<n;s++)su(this.state,e,1/60),this.consumeEvents();this.updateHUD()},state:()=>this.state,setState:e=>{this.state=e,this.buildActors(),this.updateHUD()},input:()=>this.currentInput(),kickTarget:()=>Zl(this.state,this.state.actors[0])?.id}),this.last=performance.now(),this.renderer.setAnimationLoop(e=>this.frame(e)),document.getElementById("boot")?.remove()}ground(t,e){return this.world.getSurface(t,e).height}createArena(){this.obstacleMeshes=[];for(const n of ir){const s=new ne(new Xo(n.r,1),this.materials.rock);s.scale.y=1.7,s.position.set(n.x,this.ground(n.x,n.z)+n.r*.9,n.z),this.scene.add(s),this.obstacleMeshes.push(s)}const t=[];for(let n=0;n<=160;n++){const s=n/160*Math.PI*2,r=Math.sin(s)*qt.radius,o=Math.cos(s)*qt.radius;t.push(new dn(r,this.ground(r,o)+.06,o))}const e=new zr(new Te().setFromPoints(t),this.materials.rim);this.scene.add(e),this.playerRing=new ne(new us(1.05,1.18,32),new Ln({color:"#ecff9a",side:Fe,transparent:!0,opacity:.85,depthWrite:!1})),this.playerRing.rotation.x=-Math.PI/2,this.scene.add(this.playerRing),this.aimGuide=new zr(new Te().setFromPoints([new dn,new dn]),new Fu({color:"#fff2b0",dashSize:.45,gapSize:.35,transparent:!0,opacity:.65})),this.scene.add(this.aimGuide),this.aimReticle=new ne(new us(.35,.42,24),new Ln({color:"#fff2b0",side:Fe,transparent:!0,opacity:.88,depthWrite:!1})),this.aimReticle.rotation.x=-Math.PI/2,this.scene.add(this.aimReticle),this.targetRing=new ne(new us(1.32,1.44,32),new Ln({color:"#ffb19c",side:Fe,transparent:!0,opacity:.9,depthWrite:!1})),this.targetRing.rotation.x=-Math.PI/2,this.targetRing.visible=!1,this.scene.add(this.targetRing),this.swarmRings=tr.map(n=>{const s=new ne(new us(n.radius-.08,n.radius+.03,40),new Ln({color:"#c8e0a3",side:Fe,transparent:!0,opacity:.22,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.set(n.x,this.ground(n.x,n.z)+.08,n.z),this.scene.add(s),s})}buildActors(){for(const t of this.models||[])t.dispose();this.models=this.state.actors.map((t,e)=>{const n=e_("frog",{seed:7+e*39,team:e===0?"player":`enemy${e}`,role:e===2?"bruiser":"hunter",tier:1,level:1});if(n.setEquipment({}),n.setOutline(e===0?"#e7fca7":e===1?"#ffae88":"#d3a8ff",!0),this.settings.quality==="low"&&n.setRenderLOD(1),n.mesh?.material){const s=n.mesh.material;s.bumpScale=0,s.roughness=.85,s.userData?.tint?.set(["#86da38","#ff694a","#bb70ed"][e])}return this.scene.add(n.group),n})}createFlies(){const t=this.state.flies.length;this.flyBodies=new Tn(this.shared.sphere,this.materials.insect,t),this.flyWings=new Tn(this.shared.wing,this.materials.wing,t*2);for(const e of[this.flyBodies,this.flyWings])e.instanceMatrix.setUsage(Mi),e.frustumCulled=!1,this.scene.add(e);this.dummy=new $e}createUI(){this.ui=document.createElement("div"),this.ui.id="arcade-ui",this.ui.classList.toggle("is-touch",this.touch),this.ui.innerHTML=`<header id="arcade-hud" hidden><button class="view-button" id="view-button" aria-label="Αλλαγή σε πλαϊνή κάμερα τρίτου προσώπου">ΚΑΤΟΨΗ · C</button><div class="ammo-card">${D_}<div class="ammo-info"><div class="ammo-numbers"><strong id="ammo-count">0 / 40</strong><b id="ammo-percent">0%</b></div><div id="ammo-track" role="progressbar" aria-label="Γέμιση με μύγες" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="ammo-fill"></i></div><span id="ammo-state">Αυτόματο γέμισμα κοντά σε σμήνη</span></div></div><div class="ko-card"><b id="ko-count">0 / 2</b><span>ΝΟΚ ΑΟΥΤ</span></div><button class="small-button" id="pause-button" aria-label="Παύση">Ⅱ</button></header>
  <button id="catapult-button" class="touch-action catapult-button" aria-label="Χρήση κοντινού καταπέλτη" hidden>${L_}<span>ΧΡΗΣΗ</span></button><div id="catapult-status" hidden></div><canvas id="minimap" width="320" height="320" aria-label="Χάρτης: εσύ πράσινος, αντίπαλοι κόκκινος και μωβ, σημεία ανεφοδιασμού με μύγες"></canvas><div id="dizzy-banner" hidden>🌀 ΖΑΛΙΣΤΗΚΕΣ! <b id="dizzy-time"></b></div><div id="callout" aria-live="polite"></div>
  <div id="desktop-help" hidden><span><b>WASD</b> Άλματα</span><span><b>ΣΜΗΝΗ</b> Αυτόματο γέμισμα</span><span><b>Αριστερό κλικ</b> Βολές</span><span><b>E</b> Καταπέλτης</span><span id="pc-kick"><b>Q</b> Άμυνα από κοντά</span></div>
  <div id="touch-controls" hidden><div class="stick-zone move-zone"><div id="move-stick" class="stick" aria-label="Κίνηση"><div class="stick-inner"></div><div class="stick-knob"></div></div><span class="stick-caption">ΑΛΜΑΤΑ</span></div><button id="kick-button" class="touch-action kick-button" aria-label="Αμυντική κλωτσιά για απώθηση κοντινού αντιπάλου" hidden disabled>${I_}<span>ΚΛΩΤΣΙΑ</span></button><div class="stick-zone aim-zone"><div id="aim-stick" class="stick" aria-label="Στόχευση μέσα, πυροβολισμός στον εξωτερικό δακτύλιο"><div class="fire-ring"></div><div class="stick-inner"></div><div class="stick-knob"></div><b class="ring-label">ΠΥΡ</b><span class="aim-center">＋</span></div><span class="stick-caption">ΣΤΟΧΕΥΣΗ → ΠΥΡ</span></div></div>
  <section id="arcade-menu" class="menu"><div id="menu-main" class="menu-buttons"><button id="play-button" class="art-button play-button">${hu}<span>ΠΑΙΞΕ</span></button><button id="settings-button" class="art-button settings-button">${U_}<span>ΡΥΘΜΙΣΕΙΣ</span></button></div><div id="settings-panel" class="settings-panel" hidden><h2>Ρυθμίσεις</h2><label>Ήχος <input id="volume" type="range" min="0" max="100" value="${Math.round(this.settings.volume*100)}"></label><label>Γραφικά <select id="quality"><option value="low">Ομαλή κίνηση</option><option value="high">Υψηλά</option></select></label><button id="settings-back" class="art-button compact">ΠΙΣΩ</button></div><div id="result-panel" class="result-panel" hidden><span class="result-kicker">FROG • FLY FRENZY</span><h1 id="result-title"></h1><p id="result-copy"></p><button id="replay-button" class="art-button play-button">${hu}<span>ΠΑΙΞΕ ΞΑΝΑ</span></button><button id="result-settings" class="plain-button">Ρυθμίσεις</button></div><span class="version">FROG ${qa}</span></section>`,document.body.append(this.ui),this.$=t=>this.ui.querySelector("#"+t),this.$("quality").value=this.settings.quality,this.$("view-button").onclick=()=>this.toggleView(),this.$("play-button").onclick=()=>this.startOrResume(),this.$("pause-button").onclick=()=>this.pause(),this.$("settings-button").onclick=()=>this.settingsMenu(),this.$("result-settings").onclick=()=>this.settingsMenu(),this.$("settings-back").onclick=()=>{this.$("settings-panel").hidden=!0,this.mode==="result"?this.$("result-panel").hidden=!1:this.$("menu-main").hidden=!1},this.$("replay-button").onclick=()=>this.startNew(),this.$("volume").oninput=t=>{this.settings.volume=Number(t.target.value)/100,this.sound.volume=this.settings.volume,Qa(Ya,JSON.stringify(this.settings))},this.$("quality").onchange=t=>{this.settings.quality=t.target.value,this.applyQuality(),Qa(Ya,JSON.stringify(this.settings))}}showTitle(){this.running=!1,this.mode="title",this.$("play-button").querySelector("span").textContent=this.saved?.status==="playing"?"ΣΥΝΕΧΕΙΑ":"ΠΑΙΞΕ",this.ui.classList.add("in-menu")}settingsMenu(){this.$("menu-main").hidden=!0,this.$("result-panel").hidden=!0,this.$("settings-panel").hidden=!1}startOrResume(){if(this.mode==="pause"){this.go();return}this.saved?.status==="playing"?(this.state=this.saved,this.saved=null,this.buildActors(),this.go()):this.startNew()}toggleView(){this.viewMode=this.viewMode==="chase3d"?"overview":"chase3d",this.$("view-button").textContent=this.viewMode==="chase3d"?"ΠΛΑΪΝΗ 3D · C":"ΚΑΤΟΨΗ · C",this.$("view-button").setAttribute("aria-label",this.viewMode==="chase3d"?"Αλλαγή σε κεντραρισμένη κάτοψη":"Αλλαγή σε πλαϊνή κάμερα τρίτου προσώπου"),this.cameraReady=!1}startNew(){this.aim={x:0,z:-1},this.mouse.valid=!1,this.cameraReady=!1,this.state=$l(731+Math.floor(Math.random()*1e5)),this.clearEffects(),this.buildActors(),this.go(),this.message("ΠΛΗΣΙΑΣΕ ΤΑ ΣΜΗΝΗ · ΟΙ ΜΥΓΕΣ ΜΑΖΕΥΟΝΤΑΙ ΑΥΤΟΜΑΤΑ",3.5)}go(){this.clearInputs(),this.accumulator=0,this.last=performance.now(),this.running=!0,this.mode="play",this.$("arcade-menu").hidden=!0,this.$("settings-panel").hidden=!0,this.$("result-panel").hidden=!0,this.$("menu-main").hidden=!1,this.$("arcade-hud").hidden=!1,this.$("desktop-help").hidden=this.touch,this.$("touch-controls").hidden=!this.touch,this.ui.classList.remove("in-menu"),this.sound.resume(),this.updateHUD(),this.persist()}pause(){this.running&&(this.running=!1,this.mode="pause",this.clearInputs(),this.persist(),this.sound.pause(),this.$("arcade-menu").hidden=!1,this.$("menu-main").hidden=!1,this.$("settings-panel").hidden=!0,this.$("play-button").querySelector("span").textContent="ΣΥΝΕΧΕΙΑ",this.ui.classList.add("in-menu"))}finish(){this.running=!1,this.mode="finishing",this.resultAt=this.elapsed+.85,this.clearInputs(),this.persist()}showResult(){this.running=!1,this.mode="result",this.clearInputs(),this.persist();const t=this.state.status==="won";this.sound.play(t?"win":"lost"),this.$("arcade-menu").hidden=!1,this.$("menu-main").hidden=!0,this.$("result-panel").hidden=!1,this.$("result-title").textContent=t?"Ο ΒΑΛΤΟΣ ΕΙΝΑΙ ΔΙΚΟΣ ΣΟΥ!":"ΣΕ ΕΚΑΝΑΝ ΣΑΛΑΤΑ!",this.$("result-copy").textContent=t?`Όλοι νοκ άουτ! ${this.state.stats.caught} μύγες · ${this.state.stats.shots} βολές · ${Math.floor(this.state.time)}″`:"Γέμισε κοντά στα σμήνη, απόφυγε τις βολές και πέτυχε τους αντιπάλους μέχρι το νοκ άουτ.",this.ui.classList.add("in-menu")}persist(){return this.mode==="title"?!1:Qa(iu,m_(this.state))}clearInputs(){if(this.keys.clear(),this.actions={fire:!1,kick:!1},this.aimStrength=0,this.mouse.valid=!1,this.lastMouseAim=-1/0,this.move={x:0,z:0},this.pointers.clear(),this.ui){for(const t of this.ui.querySelectorAll(".stick-knob"))t.style.transform="translate(-50%,-50%)";this.$("aim-stick").classList.remove("firing")}}bindInputs(){addEventListener("keydown",s=>{if(!s.target.matches("input,select")){if(s.code==="Escape"){s.preventDefault(),this.running?this.pause():this.mode==="pause"&&this.go();return}if(this.running){if(s.code==="KeyC"&&!s.repeat){s.preventDefault(),this.toggleView();return}["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyQ"].includes(s.code)&&(s.preventDefault(),this.keys.add(s.code))}}}),addEventListener("keyup",s=>this.keys.delete(s.code));const t=this.renderer.domElement;t.addEventListener("pointermove",s=>{s.pointerType==="mouse"&&(this.mouse={x:s.clientX,y:s.clientY,valid:!0},this.lastMouseAim=performance.now())}),t.addEventListener("pointerdown",s=>{!this.running||s.pointerType==="touch"||(s.preventDefault(),this.mouse={x:s.clientX,y:s.clientY,valid:!0},s.button===0&&(this.actions.fire=!0),this.lastMouseAim=performance.now())}),addEventListener("pointerup",s=>{s.pointerType!=="touch"&&s.button===0&&(this.actions.fire=!1)}),t.addEventListener("contextmenu",s=>s.preventDefault());const e=(s,r)=>{const o=this.$(s),a=o.querySelector(".stick-knob");let l=null;const c=u=>{const p=o.getBoundingClientRect(),f=(u.clientX-p.left-p.width/2)/(p.width/2),m=(u.clientY-p.top-p.height/2)/(p.height/2),g=l_(f,m),x=Math.hypot(f,m),d=x>1?1/x:1;a.style.transform=`translate(-50%,-50%) translate(${f*d*p.width*.31}px,${m*d*p.height*.31}px)`,r==="move"?this.move={x:g.x,z:g.z}:(this.aimStrength=x,x>.08&&(this.aim=this.aimFromScreen(f/x,m/x)),this.actions.fire=g.fire,o.classList.toggle("firing",g.fire)),this.mouse.valid=!1};o.onpointerdown=u=>{!this.running||l!==null&&this.pointers.has(r)||(u.preventDefault(),l=u.pointerId,this.pointers.set(r,l),o.setPointerCapture(u.pointerId),c(u))},o.onpointermove=u=>{l===u.pointerId&&this.pointers.get(r)===l&&(u.preventDefault(),c(u))};const h=u=>{u.pointerId===l&&(l=null,this.pointers.delete(r),a.style.transform="translate(-50%,-50%)",r==="move"?this.move={x:0,z:0}:(this.aimStrength=0,this.actions.fire=!1,o.classList.remove("firing")))};o.onpointerup=h,o.onpointercancel=h,o.onlostpointercapture=h};e("move-stick","move"),e("aim-stick","aim"),((s,r)=>{const o=this.$(s);o.onpointerdown=l=>{!this.running||o.disabled||(l.preventDefault(),o.setPointerCapture(l.pointerId),this.actions[r]=!0)};const a=()=>this.actions[r]=!1;o.onpointerup=a,o.onpointercancel=a,o.onlostpointercapture=a})("kick-button","kick"),addEventListener("blur",()=>{this.clearInputs(),this.running&&this.pause()}),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.clearInputs(),this.pause(),this.sound.pause())}),addEventListener("beforeunload",()=>this.persist()),addEventListener("resize",()=>{this.clearInputs(),this.resize()})}applyQuality(){const t=this.settings.quality==="low";this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,t?1:1.5));for(const e of this.models)e.setRenderLOD(t?1:0);this.resize()}resize(){const t=innerWidth,e=innerHeight;this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.cameraReady=!1,this.labels.width=t,this.labels.height=e,this.w=t,this.h=e}aimFromScreen(t,e){const n=this.state.actors[0],s=this.ground(n.x,n.z)+.9,r=this.project(n.x,s,n.z),o=Math.min(this.w,this.h)*.34,a=new dn,l=new Do;if(l.setFromCamera(new Ht((r.x+t*o)/this.w*2-1,1-(r.y+e*o)/this.h*2),this.camera),l.ray.intersectPlane(new $n(Ka,-s),a)){const c=a.x-n.x,h=a.z-n.z,u=Math.hypot(c,h);if(u>.05&&Number.isFinite(u))return{x:c/u,z:h/u,distance:u}}return ru(t,e,this.camera.position,this.focus)}currentInput(){const t=this.state.actors[0],e=this.actions.fire||this.pointers.has("aim")&&this.aimStrength>.08||!this.touch&&this.mouse.valid&&performance.now()-this.lastMouseAim<220;if(this.mouse.valid&&e){const s=new Do;s.setFromCamera(new Ht(this.mouse.x/this.w*2-1,1-this.mouse.y/this.h*2),this.camera);const r=new dn;if(s.ray.intersectPlane(new $n(Ka,-this.ground(t.x,t.z)-.9),r)){const o=r.x-t.x,a=r.z-t.z,l=Math.hypot(o,a);l>.1&&(this.aim={x:o/l,z:a/l,distance:l})}}const n=ru(this.move.x+(this.keys.has("KeyD")||this.keys.has("ArrowRight")?1:0)-(this.keys.has("KeyA")||this.keys.has("ArrowLeft")?1:0),this.move.z+(this.keys.has("KeyS")||this.keys.has("ArrowDown")?1:0)-(this.keys.has("KeyW")||this.keys.has("ArrowUp")?1:0),this.camera.position,this.focus);return{mx:n.x,mz:n.z,ax:this.aim.x,az:this.aim.z,aiming:e,fire:this.actions.fire,kick:this.actions.kick||this.keys.has("KeyQ")}}message(t,e=1.5){this.$("callout").textContent=t,this.calloutUntil=this.elapsed+e}makeFlyBullet(){const t=new pe,e=new ne(this.shared.sphere,this.materials.shot);e.scale.set(.12,.1,.19),t.add(e);for(const n of[-1,1]){const s=new ne(this.shared.wing,this.materials.wing);s.position.set(n*.13,.07,0),s.scale.set(.17,.018,.09),t.add(s)}return this.scene.add(t),t}consumeEvents(){for(const t of this.state.events){this.artilleryView?.consumeEvent(t);const e=this.state.actors.findIndex(r=>r.id===t.id),n=this.state.actors[e],s=this.models[e];if(t.type==="tongue"&&n){const r=this.tongues.get(n.id);r&&this.scene.remove(r.mesh);const o=new ne(this.shared.cylinder,this.materials.tongue);this.scene.add(o),this.tongues.set(n.id,{mesh:o,start:this.elapsed,x:t.x,z:t.z}),n.id==="player"&&!t.empty&&this.sound.play("tongue")}if(t.type==="shot"&&n?.id==="player"&&this.sound.play("shot"),t.type==="hit"&&s){s.mesh.material.emissive?.set("#ffffff");const r=s.group.rotation.y,o=Math.cos(r),a=Math.sin(r);s.setImpact({x:o*t.dx-a*t.dz,z:a*t.dx+o*t.dz,strength:1.3,duration:n.knockUp>0?.42:.27}),this.impactEffects.hit({...t,height:this.ground(t.x,t.z)+n.height+.75,heavy:n.knockUp>0}),this.shake=Math.max(this.shake,n.id==="player"?.16:.025),t.owner==="player"&&n.id!=="player"?(this.hitConfirmUntil=this.elapsed+.2,this.lastPlayerHit={id:n.id,x:t.x,z:t.z,time:this.elapsed},this.sound.play("hitConfirm")):n.id==="player"&&this.sound.play("hit")}t.type==="dizzy"&&(this.addText("ΖΑΛΗ!",n.x,n.z,"#ffe375",1),this.sound.play("dizzy"),n.id!=="player"&&this.message("ΖΑΛΙΣΤΗΚΕ! ΣΥΝΕΧΙΣΕ ΤΙΣ ΕΥΣΤΟΧΕΣ ΒΟΛΕΣ.",2)),t.type==="ko"&&(this.koTimes.set(n.id,{time:this.elapsed,dx:t.dx,dz:t.dz}),this.addText("ΝΟΚ ΑΟΥΤ!",n.x,n.z,"#ffe791",1.4),this.sound.play("ko"),this.shake=.32,this.makeSplat({...t,wall:!1})),t.type==="splat"&&this.makeSplat(t),t.type==="stoneShot"&&this.sound.play("stoneShot"),t.type==="land"&&t.stone&&(this.impactEffects.landing(t),Math.hypot(t.x-this.state.actors[0].x,t.z-this.state.actors[0].z)<10&&this.sound.play("land")),t.type==="stoneImpact"&&(this.sound.play("stoneImpact"),this.impactEffects.stone(t),Math.hypot(t.x-this.state.actors[0].x,t.z-this.state.actors[0].z)<7&&(this.shake=Math.max(this.shake,.16))),t.type==="battle"&&this.message("ΒΟΛΕΣ ΓΙΑ ΝΟΚ ΑΟΥΤ · ΚΛΩΤΣΙΑ ΓΙΑ ΑΜΥΝΑ ΑΠΟ ΚΟΝΤΑ",3.5)}}addText(t,e,n,s,r){this.fx.push({text:t,x:e,z:n,color:s,life:r,start:this.elapsed}),this.fx.length>28&&this.fx.shift()}burst(t,e){for(let n=0;n<9;n++){const s=new ne(this.shared.sphere,this.materials.shot);s.scale.setScalar(.06+Math.random()*.07),s.position.set(t,this.ground(t,e)+1,e),this.scene.add(s),this.particles.push({mesh:s,start:this.elapsed,v:new dn((Math.random()-.5)*6,2+Math.random()*4,(Math.random()-.5)*6)})}for(;this.particles.length>90;)this.particles.shift().mesh.removeFromParent()}makeSplat(t){const e=[];for(let l=0;l<20;l++){const c=l/20*6.283,h=(l+1)/20*6.283,u=.4+l%3*.14,p=.4+(l+1)%3*.14;e.push(0,0,0,Math.cos(c)*u,Math.sin(c)*u,0,Math.cos(h)*p,Math.sin(h)*p,0)}const s=new Te;s.setAttribute("position",new Vt(e,3));const r=this.materials.ink.clone();r.color.set(["#d2ed4d","#f5bf52","#c6ef78"][this.splats.length%3]);const o=new ne(s,r),a=this.ground(t.x,t.z);if(t.wall){const l=new dn(t.x-t.dx*1.5,a+.9,t.z-t.dz*1.5),c=new dn(t.dx,0,t.dz);for(const u of this.obstacleMeshes)u.updateMatrixWorld();const h=new Do(l,c,0,5).intersectObjects(this.obstacleMeshes,!1)[0];if(h){const u=h.face.normal.clone().transformDirection(h.object.matrixWorld);o.position.copy(h.point).addScaledVector(u,.025),o.quaternion.setFromUnitVectors(new dn(0,0,1),u)}else o.position.set(t.x,a+.05,t.z),o.rotation.x=-Math.PI/2}else o.position.set(t.x,a+.045,t.z),o.rotation.x=-Math.PI/2;if(this.scene.add(o),this.splats.push({mesh:o,start:this.elapsed}),this.splats.length>90){const l=this.splats.shift();l.mesh.removeFromParent(),l.mesh.geometry.dispose(),l.mesh.material.dispose()}}clearEffects(){this.impactEffects?.clear();for(const t of this.particles)t.mesh.removeFromParent();this.particles=[];for(const t of this.splats)t.mesh.removeFromParent(),t.mesh.geometry.dispose(),t.mesh.material.dispose();this.splats=[];for(const t of this.bulletMeshes.values())t.removeFromParent();this.bulletMeshes.clear();for(const t of this.tongues.values())t.mesh.removeFromParent();this.tongues.clear(),this.fx=[],this.koTimes.clear()}updateHUD(){const t=this.state.actors[0],e=Math.round(t.ammo/qt.capacity*100),n=Zl(this.state,t),s=this.state.actors.slice(1).filter(c=>c.ko).length,r=this.state.catapults?.find(c=>c.id===t.catapultId),o=$u(this.state,t),a=this.$("catapult-button");a.hidden=!this.running||t.ko||!r&&(!o||this.state.phase!=="battle"),a.disabled=t.dizzyTime>0||t.knockUp>0,a.querySelector("span").textContent=r?"ΕΞΟΔΟΣ":"ΧΡΗΣΗ",a.setAttribute("aria-label",r?"Έξοδος από τον καταπέλτη":"Χρήση κοντινού καταπέλτη"),a.classList.toggle("ready",!!r),this.$("catapult-status").hidden=!r||!this.running,this.$("catapult-status").textContent=r?r.cooldown>0?`ΦΟΡΤΩΝΕΙ ΠΕΤΡΑ · ${r.cooldown.toFixed(1)}″`:this.touch?"ΣΗΜΑΔΕΨΕ ΚΑΙ ΑΦΗΣΕ ΓΙΑ ΡΙΨΗ":"ΠΕΤΡΑ ΕΤΟΙΜΗ · ΑΡΙΣΤΕΡΟ ΚΛΙΚ":"",this.$("aim-stick").classList.toggle("catapult",!!r),this.ui.querySelector(".aim-zone .stick-caption").textContent=r?"ΣΗΜΑΔΕΨΕ · ΑΦΗΣΕ":"ΣΤΟΧΕΥΣΗ → ΠΥΡ",this.ui.querySelector(".move-zone").classList.toggle("mounted",!!r),this.$("ammo-count").textContent=`${t.ammo} / ${qt.capacity}`,this.$("ammo-percent").textContent=e+"%",this.$("ammo-fill").style.transform=`scaleX(${e/100})`,this.$("ammo-track").setAttribute("aria-valuenow",String(e)),this.$("ammo-state").textContent=t.ammo===qt.capacity?"ΓΕΜΑΤΟΣ!":t.tongue>0?"ΓΕΜΙΖΕΙ ΑΥΤΟΜΑΤΑ…":t.ammo===0?"Πλησίασε ένα σμήνος":"Αυτόματο γέμισμα στα σμήνη",this.$("ko-count").textContent=`${s} / 2`;const l=!!n&&this.state.phase==="battle"&&!t.catapultId&&t.dizzyTime<=0&&t.knockUp<=0&&t.kick<=0&&(t.kickCooldown||0)<=0;this.$("kick-button").hidden=this.state.phase!=="battle"||!!t.catapultId||!n&&t.kick<=0,this.$("kick-button").disabled=!l,this.$("kick-button").classList.toggle("ready",l),this.$("pc-kick").classList.toggle("ready",l),this.$("dizzy-banner").hidden=t.dizzyTime<=0,this.$("dizzy-time").textContent=t.dizzyTime.toFixed(1)+"″",this.$("aim-stick").classList.toggle("empty",r?r.cooldown>0:t.ammo===0),this.running&&this.state.phase!=="battle"?(this.$("callout").textContent=this.state.phase==="collect"?`Πλησίασε το σμήνος · αυτόματο γέμισμα ${Math.min(5,this.state.stats.caught)}/5`:this.state.phase==="practice"?this.touch?"Δεξί χειριστήριο: σύρε προς στόχο, τέρμα για βολές!":"Στόχευσε με το ποντίκι · αριστερό κλικ για βολές!":`ΕΤΟΙΜΑΣΟΥ! Μάχη σε ${Math.ceil(this.state.intro)}″`,this.calloutUntil=this.elapsed+.15):this.calloutUntil<this.elapsed&&(this.$("callout").textContent="")}renderActors(t){this.state.actors.forEach((a,l)=>{const c=this.models[l],h=this.ground(a.x,a.z);let u=a.x,p=a.z,f=h+a.height+(a.catapultId?.45:0);const m=this.koTimes.get(a.id),g=m?this.elapsed-m.time:99;g<.65&&(u+=m.dx*g*5,p+=m.dz*g*5,f+=Math.sin(g/.65*Math.PI)*2.5),c.group.position.set(u,f,p);const x=a.aiming||a.shot>.02||a.kick>0,d=x?Math.atan2(a.aimX,a.aimZ):a.face;let b=Math.atan2(Math.sin(d-c.group.rotation.y),Math.cos(d-c.group.rotation.y));c.group.rotation.y+=b*(1-Math.exp(-t*22)),c.update(t,{time:this.elapsed,speed:Math.hypot(a.hopX,a.hopZ),hop:a.knockUp>0?{phase:"air",progress:1-a.knockUp/a.knockUpDuration}:a.hop>0?{phase:"air",progress:1-a.hop/qt.hopDuration}:a.idle>0?{phase:"land",progress:1-a.idle/qt.landingDuration}:{phase:"idle",progress:0},dead:a.ko,attack:a.kick>0?{type:"kick",phase:1-a.kick/(qt.kickDuration||.48)}:a.tongue>0||a.shot>0?{type:"tongue",phase:a.tongue>0?1-a.tongue/.22:1-a.shot/qt.shotInterval}:null});const M=a.shot>0?Math.sin((1-a.shot/qt.shotInterval)*Math.PI):0;c.bones.jaw.rotation.x-=M*.42,c.bones.head.rotation.x-=M*.08;for(const C of["eyeL","eyeR"])c.bones[C]?.scale.multiplyScalar(1.14);const _=a.load;if(c.bones.spine.scale.x*=1+_*.75,c.bones.spine.scale.y*=1+_*.5,c.bones.spine.scale.z*=1+_*.45,c.bones.throat.scale.multiply(new dn(1+_*.45+M*.18,1+_*.7+M*.3,1+_*.35)),a.hop>0){const C=Math.atan2(a.hopX,a.hopZ)-c.group.rotation.y,R=Math.min(1,Math.hypot(a.hopX,a.hopZ)/8.8)*Math.sin((1-a.hop/qt.hopDuration)*Math.PI);c.bones.spine.rotation.z-=Math.sin(C)*R*.1;for(const E of[-1,1])c.bones[`hip${E}`].rotation.z-=Math.sin(C)*R*.14}if(c.group.scale.setScalar(1+_*.13),a.dizzyTime>0?(c.group.rotation.z=Math.sin(this.elapsed*7)*.17,c.bones.head.rotation.z+=Math.sin(this.elapsed*9)*.2):c.group.rotation.z=g<.65?g*6:0,c.group.rotation.x=0,a.knockUp>0){const C=1-a.knockUp/a.knockUpDuration,R=Math.sin(C*Math.PI)*.38,E=Math.atan2(a.impulseX,a.impulseZ)-c.group.rotation.y;c.group.rotation.x=Math.cos(E)*R,c.group.rotation.z-=Math.sin(E)*R}});const e=this.state.actors[0];this.playerRing.position.set(e.x,this.ground(e.x,e.z)+.07,e.z),this.playerRing.scale.setScalar(1+e.load*.25);const n=y_(this.state,e,Math.min(qt.projectileSpeed*qt.projectileLifetime,this.aim.distance||14)),s=this.aimGuide.geometry.attributes.position;s.setXYZ(0,e.x+e.aimX*1.3,this.ground(e.x,e.z)+.18,e.z+e.aimZ*1.3),s.setXYZ(1,n.x,this.ground(n.x,n.z)+.18,n.z),s.needsUpdate=!0,this.aimGuide.computeLineDistances();const r=this.running&&!e.catapultId&&!e.ko&&e.dizzyTime<=0&&(e.aiming||e.shot>0||this.state.phase==="practice");this.currentAimPreview=r?n:null,this.aimGuide.visible=r,this.aimGuide.material.color.set(n.targetId?"#ffc09b":n.blocked?"#b9c0b5":"#f4f7d5"),this.aimReticle.visible=r,this.aimReticle.position.set(n.x,this.ground(n.x,n.z)+.12,n.z),this.aimReticle.material.color.copy(this.aimGuide.material.color);const o=this.state.actors.find(a=>a.id===n.targetId);this.targetRing.visible=r&&!!o,o&&(this.targetRing.position.set(o.x,this.ground(o.x,o.z)+.1,o.z),this.targetRing.scale.setScalar(1+o.load*.2))}renderFlies(){this.state.flies.forEach((e,n)=>{const s=this.dummy,r=e.wait<=0,o=this.ground(e.x,e.z)+1.05+Math.sin(this.elapsed*5+e.phase)*.12,a=e.x+Math.sin(this.elapsed*3+e.phase)*.12;s.position.set(a,r?o:-100,e.z),s.scale.set(r?.105:0,r?.08:0,r?.14:0),s.rotation.set(0,e.phase,0),s.updateMatrix(),this.flyBodies.setMatrixAt(n,s.matrix);for(let l=0;l<2;l++)s.position.set(a+(l===0?-.1:.1),r?o+.045:-100,e.z),s.scale.set(r?.17:0,r?.015:0,r?.08:0),s.rotation.set(0,e.phase,Math.sin(this.elapsed*55+e.phase)*(l===0?1:-1)*.5),s.updateMatrix(),this.flyWings.setMatrixAt(n*2+l,s.matrix)}),this.flyBodies.instanceMatrix.needsUpdate=!0,this.flyWings.instanceMatrix.needsUpdate=!0,tr.forEach((e,n)=>{const s=this.state.flies.filter(o=>o.swarmId===e.id&&o.wait<=0).length,r=this.swarmRings[n];r.material.opacity=s?.2:.09,r.material.color.set(s?"#c8e0a3":"#6f8c83")});const t=new Set;for(const e of this.state.bullets){t.add(e.id);let n=this.bulletMeshes.get(e.id);if(!n){n=this.makeFlyBullet(),this.bulletMeshes.set(e.id,n);const r=this.state.actors.findIndex(o=>o.id===e.owner);n.userData.mouth=this.models[r].mouthWorld().clone()}n.position.set(e.x,this.ground(e.x,e.z)+.9,e.z);const s=(qt.projectileLifetime||1.6)-e.life;s<.09&&n.position.lerp(n.userData.mouth,1-s/.09),n.rotation.y=Math.atan2(e.dx,e.dz),n.children[1].rotation.z=Math.sin(this.elapsed*75),n.children[2].rotation.z=-Math.sin(this.elapsed*75)}for(const[e,n]of this.bulletMeshes)t.has(e)||(n.removeFromParent(),this.bulletMeshes.delete(e));for(const[e,n]of this.tongues){const s=(this.elapsed-n.start)/.22;if(s>=1){n.mesh.removeFromParent(),this.tongues.delete(e);continue}const r=this.state.actors.findIndex(u=>u.id===e),o=this.models[r],a=o.mouthWorld(),l=new dn(n.x,this.ground(n.x,n.z)+1,n.z),c=Math.sin(s*Math.PI);l.lerpVectors(a,l,c);const h=l.clone().sub(a);n.mesh.position.copy(a).addScaledVector(h,.5),n.mesh.quaternion.setFromUnitVectors(Ka,h.clone().normalize()),n.mesh.scale.set(.07,Math.max(.001,h.length()),.07)}}project(t,e,n){const s=new dn(t,e,n).project(this.camera);return{x:(s.x+1)*this.w/2,y:(1-s.y)*this.h/2,visible:s.z>-1&&s.z<1}}drawLabels(){const t=this.labelCtx;if(t.clearRect(0,0,this.w,this.h),t.textAlign="center",t.lineJoin="round",t.font="800 18px sans-serif",this.running&&(M_(this,t),__(this,this.$("minimap"))),this.currentAimPreview){const e=this.currentAimPreview,n=this.project(e.x,this.ground(e.x,e.z)+.9,e.z);if(n.visible&&n.x>12&&n.x<this.w-12&&n.y>90&&n.y<this.h-30){t.save(),t.lineWidth=4,t.strokeStyle="#173c35",t.beginPath(),t.arc(n.x,n.y,7,0,Math.PI*2),t.stroke(),t.lineWidth=2,t.strokeStyle=e.targetId?"#ffc5a0":"#f4ffdd",t.beginPath(),t.arc(n.x,n.y,7,0,Math.PI*2);for(const[s,r]of[[1,0],[-1,0],[0,1],[0,-1]])t.moveTo(n.x+s*10,n.y+r*10),t.lineTo(n.x+s*16,n.y+r*16);t.stroke(),t.restore()}}if(this.hitConfirmUntil>this.elapsed&&this.lastPlayerHit){const e=this.lastPlayerHit,n=this.state.actors.find(r=>r.id===e.id),s=this.project(e.x,this.ground(e.x,e.z)+(n?.height||0)+1.2,e.z);if(s.visible){t.save(),t.strokeStyle="#143d35",t.lineWidth=6,t.beginPath();for(const[r,o]of[[1,1],[-1,1],[1,-1],[-1,-1]])t.moveTo(s.x+r*6,s.y+o*6),t.lineTo(s.x+r*15,s.y+o*15);t.stroke(),t.strokeStyle="#fffce2",t.lineWidth=3,t.stroke(),t.restore()}}this.state.actors.forEach((e,n)=>{const s=this.project(e.x,this.ground(e.x,e.z)+e.height+2.4,e.z);if(!s.visible)return;if(!(s.x>20&&s.x<this.w-20&&s.y>70&&s.y<this.h-40)&&n>0&&!e.ko&&this.running){const o=Ja(s.x,24,this.w-24),a=Ja(s.y,110,this.h-(this.touch?210:90));t.font="bold 24px sans-serif",t.fillStyle=n===1?"#ffbb8e":"#dfb5ff",t.fillText("▼",o,a);return}if(e.ko){t.font="900 23px sans-serif",t.strokeStyle="#1e2e28",t.lineWidth=5,t.strokeText("KO",s.x,s.y),t.fillStyle="#ffe374",t.fillText("KO",s.x,s.y);return}if(e.dizzyTime>0){for(let o=0;o<3;o++){const a=this.elapsed*4+o*2.094;t.font="bold 25px sans-serif",t.fillStyle="#ffdf57",t.strokeStyle="#725c21",t.lineWidth=3;const l=s.x+Math.cos(a)*27,c=s.y+Math.sin(a)*7;t.strokeText("★",l,c),t.fillText("★",l,c)}t.font="bold 15px sans-serif",t.fillStyle="#fff4ad",t.fillText(e.dizzyTime.toFixed(1)+"″",s.x,s.y+24);for(let o=0;o<qt.finishHits;o++)t.beginPath(),t.arc(s.x+(o-(qt.finishHits-1)/2)*11,s.y+36,4,0,Math.PI*2),t.fillStyle=o<e.finishHits?"#ffb58e":"#244438",t.fill(),t.strokeStyle="#ffe6ac",t.lineWidth=1.5,t.stroke()}else if(n>0){e.aimWindup>0&&(t.font="900 22px sans-serif",t.fillStyle="#ffddaa",t.fillText("!",s.x,s.y-40));const o=n===1?"ΚΟΚΚΙΝΟΣ":"ΜΩΒ",a=n===1?"#ff886a":"#dba1ff";t.fillStyle="#112b27dd",t.strokeStyle=a,t.lineWidth=3,t.beginPath(),t.roundRect?t.roundRect(s.x-52,s.y-28,104,24,10):t.rect(s.x-52,s.y-28,104,24),t.fill(),t.stroke(),t.font="bold 15px sans-serif",t.fillStyle=a,t.fillText(o,s.x,s.y-11);for(let l=0;l<6;l++)t.beginPath(),t.arc(s.x+(l-2.5)*9,s.y+6,3.8,0,Math.PI*2),t.fillStyle=l<e.dizzy?"#ffe16a":"#214036bb",t.fill()}}),this.fx=this.fx.filter(e=>this.elapsed-e.start<e.life);for(const e of this.fx){const n=(this.elapsed-e.start)/e.life,s=this.project(e.x,this.ground(e.x,e.z)+2+n*2,e.z);t.globalAlpha=1-n,t.font=`900 ${e.text==="ΝΟΚ ΑΟΥΤ!"?32:22}px sans-serif`,t.strokeStyle="#244136",t.lineWidth=6,t.strokeText(e.text,s.x,s.y),t.fillStyle=e.color,t.fillText(e.text,s.x,s.y)}t.globalAlpha=1}frame(t){const e=Math.min(.05,Math.max(0,(t-this.last)/1e3));if(this.last=t,this.running){for(this.elapsed+=e,this.accumulator+=e;this.accumulator>=1/60;)if(su(this.state,this.currentInput(),1/60),this.consumeEvents(),this.accumulator-=1/60,this.state.status!=="playing"){this.finish();break}this.saveClock+=e,this.saveClock>3&&(this.saveClock=0,this.persist())}else(this.mode==="result"||this.mode==="finishing")&&(this.elapsed+=e);this.mode==="finishing"&&this.elapsed>=this.resultAt&&this.showResult();const n=this.state.actors[0],s=x_(n,this.ground(n.x,n.z),this.w/this.h,this.viewMode),r=new dn(...s.look),o=new dn(...s.position);this.cameraReady?(this.focus.lerp(r,1-Math.exp(-e*8)),this.cameraTarget.lerp(o,1-Math.exp(-e*8))):(this.focus.copy(r),this.cameraTarget.copy(o),this.cameraReady=!0),this.shake*=Math.exp(-e*15);const a=this.running?this.shake:0;if(this.camera.position.copy(this.cameraTarget),this.camera.position.x+=(Math.random()-.5)*a,this.camera.lookAt(this.focus),this.camera.updateMatrixWorld(),this.running||this.mode==="title"||this.mode==="result"||this.mode==="finishing"){const l=this.mode==="title"?0:e;this.renderActors(l),this.renderFlies(),this.updateCatapultAim?.(),this.artilleryView.update(l),this.impactEffects.update(l),this.world.update(this.running?e:0,this.elapsed,1,new dn(n.x,this.ground(n.x,n.z),n.z))}(this.running||this.mode==="finishing"||this.mode==="result")&&(this.particles=this.particles.filter(l=>this.elapsed-l.start>.55?(l.mesh.removeFromParent(),!1):(l.v.y-=e*16,l.mesh.position.addScaledVector(l.v,e),!0))),this.renderer.render(this.scene,this.camera),this.drawLabels(),this.updateHUD()}inspect(){return{version:qa,viewMode:this.viewMode,phase:this.state.phase,intro:this.state.intro,mode:this.mode,status:this.state.status,ammo:this.state.actors[0].ammo,fillPercent:Math.round(this.state.actors[0].ammo/qt.capacity*100),actors:this.state.actors.map(t=>({id:t.id,x:t.x,z:t.z,ammo:t.ammo,dizzy:t.dizzy,dizzyTime:t.dizzyTime,ko:t.ko,aiming:t.aiming,face:t.face,hop:t.hop,hopX:t.hopX,hopZ:t.hopZ,height:t.height,knockUp:t.knockUp,finishHits:t.finishHits,kickCooldown:t.kickCooldown,catapultId:t.catapultId})),touch:this.touch,catapults:this.state.catapults?.map(t=>({id:t.id,occupant:t.occupant,cooldown:t.cooldown})),shells:this.state.shells?.length,hitConfirmUntil:this.hitConfirmUntil,bullets:this.state.bullets.length,splats:this.splats.length,legacySavePreserved:!0}}}function F_(i){const t={fire:!1,kick:!1},e=r=>{i.running&&(t[r]=!0)},n=i.currentInput.bind(i),s=i.clearInputs.bind(i);i.currentInput=()=>{const r=n();for(const o of Object.keys(t))r[o]||=t[o],t[o]=!1;return r.aiming||=r.fire,r},i.clearInputs=()=>{for(const r of Object.keys(t))t[r]=!1;s()},addEventListener("keydown",r=>{r.repeat||r.target.matches("input,select")||r.code==="KeyQ"&&e("kick")},!0),addEventListener("pointerdown",r=>{if(r.target.closest?.("#kick-button")&&!i.$("kick-button").disabled)e("kick");else if(r.target===i.renderer.domElement&&r.pointerType!=="touch"&&r.button===0)e("fire");else if(r.target.closest?.("#aim-stick")){const o=i.$("aim-stick").getBoundingClientRect();Math.hypot(r.clientX-o.x-o.width/2,r.clientY-o.y-o.height/2)>=o.width*.36&&e("fire")}},!0),addEventListener("pointercancel",()=>{for(const r of Object.keys(t))t[r]=!1},!0)}function k_(i,t=()=>performance.now()){const e=i.$("view-button");let n=-1/0;e.onpointerdown=s=>{s.pointerType!=="touch"||!i.running||(s.preventDefault(),n=t(),i.toggleView())},e.onclick=s=>{i.running&&(s.detail===0||t()-n>600)&&i.toggleView()}}function O_(i){i.catapultAim={active:!1,target:null};let t=!1,e=null;const n=()=>!!i.state.actors[0].catapultId;i.updateCatapultAim=()=>{if(!n()){i.catapultAim={active:!1,target:null};return}const l=i.state.actors[0];if(!i.touch&&i.mouse.valid){const u=new Do,p=new L;if(u.setFromCamera(new Ht(i.mouse.x/i.w*2-1,1-i.mouse.y/i.h*2),i.camera),u.ray.intersectPlane(new $n(new L(0,1,0),-i.ground(l.x,l.z)),p)){const f=p.x-l.x,m=p.z-l.z,g=Math.hypot(f,m);g>.01&&(i.aim={x:f/g,z:m/g,distance:g})}}const c=i.aim||{x:l.aimX,z:l.aimZ},h=i.touch?Math.max(0,Math.min(1,(i.aimStrength-.08)/.92)):Math.max(0,Math.min(1,((c.distance||17)-De.minRange)/(De.maxRange-De.minRange)));i.catapultAim={active:!0,target:i_(l,c.x,c.z,h)}};const s=i.currentInput.bind(i),r=i.clearInputs.bind(i);i.currentInput=()=>{const l=s();return n()&&(i.updateCatapultAim(),l.fire=!1,l.aiming=!0,l.ax=i.aim.x,l.az=i.aim.z),t&&(l.interactCatapult=!0,t=!1),e&&(l.throwStone=e,l.fire=!1,e=null),l},i.clearInputs=()=>{t=!1,e=null,i.catapultAim={active:!1,target:null},r()};const o=i.$("catapult-button");o.onpointerdown=l=>{!i.running||o.disabled||!n()&&i.state.phase!=="battle"||(l.preventDefault(),t=!0)},o.onclick=l=>{l.detail===0&&i.running&&!o.disabled&&(t=!0)},addEventListener("keydown",l=>{l.code!=="KeyE"||l.repeat||l.target.matches("input,select")||!i.running||!n()&&i.state.phase!=="battle"||(l.preventDefault(),t=!0)});const a=i.$("aim-stick");a.addEventListener("pointerdown",()=>{n()&&i.updateCatapultAim()}),a.addEventListener("pointermove",()=>{n()&&i.pointers.has("aim")&&i.updateCatapultAim()}),a.addEventListener("pointerup",l=>{!n()||!i.running||i.pointers.get("aim")!==l.pointerId||i.aimStrength>.15&&(i.updateCatapultAim(),i.catapultAim.target.valid!==!1&&(e={...i.catapultAim.target}))},!0),a.addEventListener("pointercancel",()=>{e=null},!0),i.renderer.domElement.addEventListener("pointerdown",l=>{!n()||!i.running||l.pointerType==="touch"||l.button!==0||(s(),i.updateCatapultAim(),i.catapultAim.target.valid!==!1&&(e={...i.catapultAim.target}))})}function bc(i){console.error(i);let t=document.getElementById("boot");if(!t){t=document.createElement("div"),t.id="boot";const n=document.createElement("div");n.id="boot-error",t.append(n),document.body.append(t)}t.classList.add("has-error");const e=document.getElementById("boot-error");e.textContent=`Δεν μπόρεσε να ξεκινήσει ο 3D κόσμος. Ενεργοποίησε την επιτάχυνση γραφικών στον browser και κάνε ανανέωση.
`+(i?.message||String(i))}addEventListener("error",i=>bc(i.error||i.message));addEventListener("unhandledrejection",i=>bc(i.reason));requestAnimationFrame(()=>{try{window.frogArcade=new N_,F_(window.frogArcade),k_(window.frogArcade),O_(window.frogArcade)}catch(i){bc(i)}});
