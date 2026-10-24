(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const gc="180",Bu=0,qc=1,Hu=2,Nd=1,kd=2,yi=3,Ti=0,xn=1,Xe=2,Hi=0,Is=1,Yc=2,jc=3,Zc=4,Vu=5,ts=100,Gu=101,Wu=102,$u=103,Xu=104,qu=200,Yu=201,ju=202,Zu=203,pl=204,ml=205,Ku=206,Ju=207,Qu=208,tf=209,ef=210,nf=211,sf=212,rf=213,af=214,gl=0,vl=1,xl=2,Ns=3,yl=4,_l=5,Ml=6,bl=7,Fd=0,of=1,lf=2,Vi=0,cf=1,hf=2,df=3,zd=4,uf=5,ff=6,pf=7,Kc="attached",mf="detached",Od=300,ks=301,Fs=302,Sl=303,wl=304,Ja=306,zs=1e3,Oi=1001,Tl=1002,Un=1003,gf=1004,Kr=1005,qn=1006,fo=1007,Bi=1008,hi=1009,Bd=1010,Hd=1011,Pr=1012,vc=1013,rs=1014,Yn=1015,Hr=1016,xc=1017,yc=1018,Dr=1020,Vd=35902,Gd=35899,Wd=1021,$d=1022,In=1023,Lr=1026,Ir=1027,_c=1028,Mc=1029,Xd=1030,bc=1031,Sc=1033,ka=33776,Fa=33777,za=33778,Oa=33779,El=35840,Al=35841,Cl=35842,Rl=35843,Pl=36196,Dl=37492,Ll=37496,Il=37808,Ul=37809,Nl=37810,kl=37811,Fl=37812,zl=37813,Ol=37814,Bl=37815,Hl=37816,Vl=37817,Gl=37818,Wl=37819,$l=37820,Xl=37821,ql=36492,Yl=36494,jl=36495,Zl=36283,Kl=36284,Jl=36285,Ql=36286,vf=3200,xf=3201,qd=0,yf=1,Mi="",Sn="srgb",Os="srgb-linear",Ga="linear",De="srgb",cs=7680,Jc=519,_f=512,Mf=513,bf=514,Yd=515,Sf=516,wf=517,Tf=518,Ef=519,tc=35044,Fi=35048,Qc="300 es",li=2e3,Wa=2001;class Vs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const pn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let th=1234567;const Mr=Math.PI/180,Ur=180/Math.PI;function ci(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(pn[i&255]+pn[i>>8&255]+pn[i>>16&255]+pn[i>>24&255]+"-"+pn[t&255]+pn[t>>8&255]+"-"+pn[t>>16&15|64]+pn[t>>24&255]+"-"+pn[e&63|128]+pn[e>>8&255]+"-"+pn[e>>16&255]+pn[e>>24&255]+pn[n&255]+pn[n>>8&255]+pn[n>>16&255]+pn[n>>24&255]).toLowerCase()}function ue(i,t,e){return Math.max(t,Math.min(e,i))}function wc(i,t){return(i%t+t)%t}function Af(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Cf(i,t,e){return i!==t?(e-i)/(t-i):0}function br(i,t,e){return(1-e)*i+e*t}function Rf(i,t,e,n){return br(i,t,1-Math.exp(-e*n))}function Pf(i,t=1){return t-Math.abs(wc(i,t*2)-t)}function Df(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Lf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function If(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Uf(i,t){return i+Math.random()*(t-i)}function Nf(i){return i*(.5-Math.random())}function kf(i){i!==void 0&&(th=i);let t=th+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ff(i){return i*Mr}function zf(i){return i*Ur}function Of(i){return(i&i-1)===0&&i!==0}function Bf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Hf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Vf(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),u=a((t-n)/2),f=r((n-t)/2),p=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*d,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*p,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*p,o*c);break;case"ZYZ":i.set(l*p,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Xn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Re(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const _i={DEG2RAD:Mr,RAD2DEG:Ur,generateUUID:ci,clamp:ue,euclideanModulo:wc,mapLinear:Af,inverseLerp:Cf,lerp:br,damp:Rf,pingpong:Pf,smoothstep:Df,smootherstep:Lf,randInt:If,randFloat:Uf,randFloatSpread:Nf,seededRandom:kf,degToRad:Ff,radToDeg:zf,isPowerOfTwo:Of,ceilPowerOfTwo:Bf,floorPowerOfTwo:Hf,setQuaternionFromProperEuler:Vf,normalize:Re,denormalize:Xn};class kt{constructor(t=0,e=0){kt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ue(this.x,t.x,e.x),this.y=ue(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ue(this.x,t,e),this.y=ue(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ue(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Vr{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3];const u=r[a+0],f=r[a+1],p=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=u,t[e+1]=f,t[e+2]=p,t[e+3]=v;return}if(d!==v||l!==u||c!==f||h!==p){let g=1-o;const m=l*u+c*f+h*p+d*v,y=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const A=Math.sqrt(x),C=Math.atan2(A,m*y);g=Math.sin(g*C)/A,o=Math.sin(o*C)/A}const _=o*y;if(l=l*g+u*_,c=c*g+f*_,h=h*g+p*_,d=d*g+v*_,g===1-o){const A=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=A,c*=A,h*=A,d*=A}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],p=r[a+3];return t[e]=o*p+h*d+l*f-c*u,t[e+1]=l*p+h*u+c*d-o*f,t[e+2]=c*p+h*f+o*u-l*d,t[e+3]=h*p-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),p=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"YZX":this._x=u*h*d+c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d-u*f*p;break;case"XZY":this._x=u*h*d-c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d+u*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ue(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(eh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(eh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ue(this.x,t.x,e.x),this.y=ue(this.y,t.y,e.y),this.z=ue(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ue(this.x,t,e),this.y=ue(this.y,t,e),this.z=ue(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ue(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return po.copy(this).projectOnVector(t),this.sub(po)}reflect(t){return this.sub(po.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const po=new P,eh=new Vr;class oe{constructor(t,e,n,s,r,a,o,l,c){oe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],v=s[0],g=s[3],m=s[6],y=s[1],x=s[4],_=s[7],A=s[2],C=s[5],E=s[8];return r[0]=a*v+o*y+l*A,r[3]=a*g+o*x+l*C,r[6]=a*m+o*_+l*E,r[1]=c*v+h*y+d*A,r[4]=c*g+h*x+d*C,r[7]=c*m+h*_+d*E,r[2]=u*v+f*y+p*A,r[5]=u*g+f*x+p*C,r[8]=u*m+f*_+p*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,p=e*d+n*u+s*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return t[0]=d*v,t[1]=(s*c-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=u*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(mo.makeScale(t,e)),this}rotate(t){return this.premultiply(mo.makeRotation(-t)),this}translate(t,e){return this.premultiply(mo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const mo=new oe;function jd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function $a(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Gf(){const i=$a("canvas");return i.style.display="block",i}const nh={};function Nr(i){i in nh||(nh[i]=!0,console.warn(i))}function Wf(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const ih=new oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),sh=new oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $f(){const i={enabled:!0,workingColorSpace:Os,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===De&&(s.r=Si(s.r),s.g=Si(s.g),s.b=Si(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===De&&(s.r=Us(s.r),s.g=Us(s.g),s.b=Us(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Mi?Ga:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Nr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Nr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Os]:{primaries:t,whitePoint:n,transfer:Ga,toXYZ:ih,fromXYZ:sh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Sn},outputColorSpaceConfig:{drawingBufferColorSpace:Sn}},[Sn]:{primaries:t,whitePoint:n,transfer:De,toXYZ:ih,fromXYZ:sh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Sn}}}),i}const ye=$f();function Si(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Us(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let hs;class Xf{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{hs===void 0&&(hs=$a("canvas")),hs.width=t.width,hs.height=t.height;const s=hs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=hs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=$a("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Si(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Si(e[n]/255)*255):e[n]=Si(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let qf=0;class Tc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qf++}),this.uuid=ci(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(go(s[a].image)):r.push(go(s[a]))}else r=go(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function go(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Xf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Yf=0;const vo=new P;class yn extends Vs{constructor(t=yn.DEFAULT_IMAGE,e=yn.DEFAULT_MAPPING,n=Oi,s=Oi,r=qn,a=Bi,o=In,l=hi,c=yn.DEFAULT_ANISOTROPY,h=Mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Yf++}),this.uuid=ci(),this.name="",this.source=new Tc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new kt(0,0),this.repeat=new kt(1,1),this.center=new kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(vo).x}get height(){return this.source.getSize(vo).y}get depth(){return this.source.getSize(vo).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Od)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case zs:t.x=t.x-Math.floor(t.x);break;case Oi:t.x=t.x<0?0:1;break;case Tl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case zs:t.y=t.y-Math.floor(t.y);break;case Oi:t.y=t.y<0?0:1;break;case Tl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}yn.DEFAULT_IMAGE=null;yn.DEFAULT_MAPPING=Od;yn.DEFAULT_ANISOTROPY=1;class xe{constructor(t=0,e=0,n=0,s=1){xe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,_=(f+1)/2,A=(m+1)/2,C=(h+u)/4,E=(d+v)/4,D=(p+g)/4;return x>_&&x>A?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=C/n,r=E/n):_>A?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=C/s,r=D/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=E/r,s=D/r),this.set(n,s,r,e),this}let y=Math.sqrt((g-p)*(g-p)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(g-p)/y,this.y=(d-v)/y,this.z=(u-h)/y,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ue(this.x,t.x,e.x),this.y=ue(this.y,t.y,e.y),this.z=ue(this.z,t.z,e.z),this.w=ue(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ue(this.x,t,e),this.y=ue(this.y,t,e),this.z=ue(this.z,t,e),this.w=ue(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ue(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class jf extends Vs{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new xe(0,0,t,e),this.scissorTest=!1,this.viewport=new xe(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new yn(s);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:qn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Tc(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class di extends jf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Zd extends yn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Un,this.minFilter=Un,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zf extends yn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Un,this.minFilter=Un,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bn{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Vn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Vn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Vn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Vn):Vn.fromBufferAttribute(r,a),Vn.applyMatrix4(t.matrixWorld),this.expandByPoint(Vn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Jr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Jr.copy(n.boundingBox)),Jr.applyMatrix4(t.matrixWorld),this.union(Jr)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Vn),Vn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ks),Qr.subVectors(this.max,Ks),ds.subVectors(t.a,Ks),us.subVectors(t.b,Ks),fs.subVectors(t.c,Ks),Ri.subVectors(us,ds),Pi.subVectors(fs,us),qi.subVectors(ds,fs);let e=[0,-Ri.z,Ri.y,0,-Pi.z,Pi.y,0,-qi.z,qi.y,Ri.z,0,-Ri.x,Pi.z,0,-Pi.x,qi.z,0,-qi.x,-Ri.y,Ri.x,0,-Pi.y,Pi.x,0,-qi.y,qi.x,0];return!xo(e,ds,us,fs,Qr)||(e=[1,0,0,0,1,0,0,0,1],!xo(e,ds,us,fs,Qr))?!1:(ta.crossVectors(Ri,Pi),e=[ta.x,ta.y,ta.z],xo(e,ds,us,fs,Qr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Vn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Vn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(pi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const pi=[new P,new P,new P,new P,new P,new P,new P,new P],Vn=new P,Jr=new Bn,ds=new P,us=new P,fs=new P,Ri=new P,Pi=new P,qi=new P,Ks=new P,Qr=new P,ta=new P,Yi=new P;function xo(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Yi.fromArray(i,r);const o=s.x*Math.abs(Yi.x)+s.y*Math.abs(Yi.y)+s.z*Math.abs(Yi.z),l=t.dot(Yi),c=e.dot(Yi),h=n.dot(Yi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Kf=new Bn,Js=new P,yo=new P;class Zn{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Kf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Js.subVectors(t,this.center);const e=Js.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Js,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(yo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Js.copy(t.center).add(yo)),this.expandByPoint(Js.copy(t.center).sub(yo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const mi=new P,_o=new P,ea=new P,Di=new P,Mo=new P,na=new P,bo=new P;class Gr{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,mi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=mi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(mi.copy(this.origin).addScaledVector(this.direction,e),mi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){_o.copy(t).add(e).multiplyScalar(.5),ea.copy(e).sub(t).normalize(),Di.copy(this.origin).sub(_o);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ea),o=Di.dot(this.direction),l=-Di.dot(ea),c=Di.lengthSq(),h=Math.abs(1-a*a);let d,u,f,p;if(h>0)if(d=a*l-o,u=a*o-l,p=r*h,d>=0)if(u>=-p)if(u<=p){const v=1/h;d*=v,u*=v,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-p?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=p?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(_o).addScaledVector(ea,u),f}intersectSphere(t,e){mi.subVectors(t.center,this.origin);const n=mi.dot(this.direction),s=mi.dot(mi)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,mi)!==null}intersectTriangle(t,e,n,s,r){Mo.subVectors(e,t),na.subVectors(n,t),bo.crossVectors(Mo,na);let a=this.direction.dot(bo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Di.subVectors(this.origin,t);const l=o*this.direction.dot(na.crossVectors(Di,na));if(l<0)return null;const c=o*this.direction.dot(Mo.cross(Di));if(c<0||l+c>a)return null;const h=-o*Di.dot(bo);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ie{constructor(t,e,n,s,r,a,o,l,c,h,d,u,f,p,v,g){ie.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,u,f,p,v,g)}set(t,e,n,s,r,a,o,l,c,h,d,u,f,p,v,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ie().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/ps.setFromMatrixColumn(t,0).length(),r=1/ps.setFromMatrixColumn(t,1).length(),a=1/ps.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=a*h,f=a*d,p=o*h,v=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+p*c,e[5]=u-v*c,e[9]=-o*l,e[2]=v-u*c,e[6]=p+f*c,e[10]=a*l}else if(t.order==="YXZ"){const u=l*h,f=l*d,p=c*h,v=c*d;e[0]=u+v*o,e[4]=p*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-p,e[6]=v+u*o,e[10]=a*l}else if(t.order==="ZXY"){const u=l*h,f=l*d,p=c*h,v=c*d;e[0]=u-v*o,e[4]=-a*d,e[8]=p+f*o,e[1]=f+p*o,e[5]=a*h,e[9]=v-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const u=a*h,f=a*d,p=o*h,v=o*d;e[0]=l*h,e[4]=p*c-f,e[8]=u*c+v,e[1]=l*d,e[5]=v*c+u,e[9]=f*c-p,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,f=a*c,p=o*l,v=o*c;e[0]=l*h,e[4]=v-u*d,e[8]=p*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+p,e[10]=u-v*d}else if(t.order==="XZY"){const u=a*l,f=a*c,p=o*l,v=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+v,e[5]=a*h,e[9]=f*d-p,e[2]=p*d-f,e[6]=o*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Jf,t,Qf)}lookAt(t,e,n){const s=this.elements;return Pn.subVectors(t,e),Pn.lengthSq()===0&&(Pn.z=1),Pn.normalize(),Li.crossVectors(n,Pn),Li.lengthSq()===0&&(Math.abs(n.z)===1?Pn.x+=1e-4:Pn.z+=1e-4,Pn.normalize(),Li.crossVectors(n,Pn)),Li.normalize(),ia.crossVectors(Pn,Li),s[0]=Li.x,s[4]=ia.x,s[8]=Pn.x,s[1]=Li.y,s[5]=ia.y,s[9]=Pn.y,s[2]=Li.z,s[6]=ia.z,s[10]=Pn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],v=n[6],g=n[10],m=n[14],y=n[3],x=n[7],_=n[11],A=n[15],C=s[0],E=s[4],D=s[8],S=s[12],M=s[1],L=s[5],k=s[9],V=s[13],Z=s[2],J=s[6],Y=s[10],z=s[14],O=s[3],lt=s[7],ot=s[11],Mt=s[15];return r[0]=a*C+o*M+l*Z+c*O,r[4]=a*E+o*L+l*J+c*lt,r[8]=a*D+o*k+l*Y+c*ot,r[12]=a*S+o*V+l*z+c*Mt,r[1]=h*C+d*M+u*Z+f*O,r[5]=h*E+d*L+u*J+f*lt,r[9]=h*D+d*k+u*Y+f*ot,r[13]=h*S+d*V+u*z+f*Mt,r[2]=p*C+v*M+g*Z+m*O,r[6]=p*E+v*L+g*J+m*lt,r[10]=p*D+v*k+g*Y+m*ot,r[14]=p*S+v*V+g*z+m*Mt,r[3]=y*C+x*M+_*Z+A*O,r[7]=y*E+x*L+_*J+A*lt,r[11]=y*D+x*k+_*Y+A*ot,r[15]=y*S+x*V+_*z+A*Mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],p=t[3],v=t[7],g=t[11],m=t[15];return p*(+r*l*d-s*c*d-r*o*u+n*c*u+s*o*f-n*l*f)+v*(+e*l*f-e*c*u+r*a*u-s*a*f+s*c*h-r*l*h)+g*(+e*c*d-e*o*f-r*a*d+n*a*f+r*o*h-n*c*h)+m*(-s*o*h-e*l*d+e*o*u+s*a*d-n*a*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],p=t[12],v=t[13],g=t[14],m=t[15],y=d*g*c-v*u*c+v*l*f-o*g*f-d*l*m+o*u*m,x=p*u*c-h*g*c-p*l*f+a*g*f+h*l*m-a*u*m,_=h*v*c-p*d*c+p*o*f-a*v*f-h*o*m+a*d*m,A=p*d*l-h*v*l-p*o*u+a*v*u+h*o*g-a*d*g,C=e*y+n*x+s*_+r*A;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/C;return t[0]=y*E,t[1]=(v*u*r-d*g*r-v*s*f+n*g*f+d*s*m-n*u*m)*E,t[2]=(o*g*r-v*l*r+v*s*c-n*g*c-o*s*m+n*l*m)*E,t[3]=(d*l*r-o*u*r-d*s*c+n*u*c+o*s*f-n*l*f)*E,t[4]=x*E,t[5]=(h*g*r-p*u*r+p*s*f-e*g*f-h*s*m+e*u*m)*E,t[6]=(p*l*r-a*g*r-p*s*c+e*g*c+a*s*m-e*l*m)*E,t[7]=(a*u*r-h*l*r+h*s*c-e*u*c-a*s*f+e*l*f)*E,t[8]=_*E,t[9]=(p*d*r-h*v*r-p*n*f+e*v*f+h*n*m-e*d*m)*E,t[10]=(a*v*r-p*o*r+p*n*c-e*v*c-a*n*m+e*o*m)*E,t[11]=(h*o*r-a*d*r-h*n*c+e*d*c+a*n*f-e*o*f)*E,t[12]=A*E,t[13]=(h*v*s-p*d*s+p*n*u-e*v*u-h*n*g+e*d*g)*E,t[14]=(p*o*s-a*v*s-p*n*l+e*v*l+a*n*g-e*o*g)*E,t[15]=(a*d*s-h*o*s+h*n*l-e*d*l-a*n*u+e*o*u)*E,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,p=r*d,v=a*h,g=a*d,m=o*d,y=l*c,x=l*h,_=l*d,A=n.x,C=n.y,E=n.z;return s[0]=(1-(v+m))*A,s[1]=(f+_)*A,s[2]=(p-x)*A,s[3]=0,s[4]=(f-_)*C,s[5]=(1-(u+m))*C,s[6]=(g+y)*C,s[7]=0,s[8]=(p+x)*E,s[9]=(g-y)*E,s[10]=(1-(u+v))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=ps.set(s[0],s[1],s[2]).length();const a=ps.set(s[4],s[5],s[6]).length(),o=ps.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Gn.copy(this);const c=1/r,h=1/a,d=1/o;return Gn.elements[0]*=c,Gn.elements[1]*=c,Gn.elements[2]*=c,Gn.elements[4]*=h,Gn.elements[5]*=h,Gn.elements[6]*=h,Gn.elements[8]*=d,Gn.elements[9]*=d,Gn.elements[10]*=d,e.setFromRotationMatrix(Gn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=li,l=!1){const c=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let p,v;if(l)p=r/(a-r),v=a*r/(a-r);else if(o===li)p=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Wa)p=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=li,l=!1){const c=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s);let p,v;if(l)p=1/(a-r),v=a/(a-r);else if(o===li)p=-2/(a-r),v=-(a+r)/(a-r);else if(o===Wa)p=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ps=new P,Gn=new ie,Jf=new P(0,0,0),Qf=new P(1,1,1),Li=new P,ia=new P,Pn=new P,rh=new ie,ah=new Vr;class ui{constructor(t=0,e=0,n=0,s=ui.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ue(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ue(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ue(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ue(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ue(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ue(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return rh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(rh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ah.setFromEuler(this),this.setFromQuaternion(ah,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ui.DEFAULT_ORDER="XYZ";class Ec{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let tp=0;const oh=new P,ms=new Vr,gi=new ie,sa=new P,Qs=new P,ep=new P,np=new Vr,lh=new P(1,0,0),ch=new P(0,1,0),hh=new P(0,0,1),dh={type:"added"},ip={type:"removed"},gs={type:"childadded",child:null},So={type:"childremoved",child:null};class Be extends Vs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tp++}),this.uuid=ci(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Be.DEFAULT_UP.clone();const t=new P,e=new ui,n=new Vr,s=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ie},normalMatrix:{value:new oe}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=Be.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ec,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ms.setFromAxisAngle(t,e),this.quaternion.multiply(ms),this}rotateOnWorldAxis(t,e){return ms.setFromAxisAngle(t,e),this.quaternion.premultiply(ms),this}rotateX(t){return this.rotateOnAxis(lh,t)}rotateY(t){return this.rotateOnAxis(ch,t)}rotateZ(t){return this.rotateOnAxis(hh,t)}translateOnAxis(t,e){return oh.copy(t).applyQuaternion(this.quaternion),this.position.add(oh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(lh,t)}translateY(t){return this.translateOnAxis(ch,t)}translateZ(t){return this.translateOnAxis(hh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(gi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?sa.copy(t):sa.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Qs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gi.lookAt(Qs,sa,this.up):gi.lookAt(sa,Qs,this.up),this.quaternion.setFromRotationMatrix(gi),s&&(gi.extractRotation(s.matrixWorld),ms.setFromRotationMatrix(gi),this.quaternion.premultiply(ms.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(dh),gs.child=t,this.dispatchEvent(gs),gs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ip),So.child=t,this.dispatchEvent(So),So.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),gi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),gi.multiply(t.parent.matrixWorld)),t.applyMatrix4(gi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(dh),gs.child=t,this.dispatchEvent(gs),gs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,t,ep),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qs,np,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),p=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Be.DEFAULT_UP=new P(0,1,0);Be.DEFAULT_MATRIX_AUTO_UPDATE=!0;Be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Wn=new P,vi=new P,wo=new P,xi=new P,vs=new P,xs=new P,uh=new P,To=new P,Eo=new P,Ao=new P,Co=new xe,Ro=new xe,Po=new xe;class zn{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Wn.subVectors(t,e),s.cross(Wn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Wn.subVectors(s,e),vi.subVectors(n,e),wo.subVectors(t,e);const a=Wn.dot(Wn),o=Wn.dot(vi),l=Wn.dot(wo),c=vi.dot(vi),h=vi.dot(wo),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,p=(a*h-o*l)*u;return r.set(1-f-p,p,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,xi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,xi.x),l.addScaledVector(a,xi.y),l.addScaledVector(o,xi.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return Co.setScalar(0),Ro.setScalar(0),Po.setScalar(0),Co.fromBufferAttribute(t,e),Ro.fromBufferAttribute(t,n),Po.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Co,r.x),a.addScaledVector(Ro,r.y),a.addScaledVector(Po,r.z),a}static isFrontFacing(t,e,n,s){return Wn.subVectors(n,e),vi.subVectors(t,e),Wn.cross(vi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Wn.subVectors(this.c,this.b),vi.subVectors(this.a,this.b),Wn.cross(vi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return zn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return zn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return zn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return zn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return zn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;vs.subVectors(s,n),xs.subVectors(r,n),To.subVectors(t,n);const l=vs.dot(To),c=xs.dot(To);if(l<=0&&c<=0)return e.copy(n);Eo.subVectors(t,s);const h=vs.dot(Eo),d=xs.dot(Eo);if(h>=0&&d<=h)return e.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(vs,a);Ao.subVectors(t,r);const f=vs.dot(Ao),p=xs.dot(Ao);if(p>=0&&f<=p)return e.copy(r);const v=f*c-l*p;if(v<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(n).addScaledVector(xs,o);const g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return uh.subVectors(r,s),o=(d-h)/(d-h+(f-p)),e.copy(s).addScaledVector(uh,o);const m=1/(g+v+u);return a=v*m,o=u*m,e.copy(n).addScaledVector(vs,a).addScaledVector(xs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Kd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ii={h:0,s:0,l:0},ra={h:0,s:0,l:0};function Do(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Jt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Sn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ye.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ye.workingColorSpace){return this.r=t,this.g=e,this.b=n,ye.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ye.workingColorSpace){if(t=wc(t,1),e=ue(e,0,1),n=ue(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Do(a,r,t+1/3),this.g=Do(a,r,t),this.b=Do(a,r,t-1/3)}return ye.colorSpaceToWorking(this,s),this}setStyle(t,e=Sn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Sn){const n=Kd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Si(t.r),this.g=Si(t.g),this.b=Si(t.b),this}copyLinearToSRGB(t){return this.r=Us(t.r),this.g=Us(t.g),this.b=Us(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Sn){return ye.workingToColorSpace(mn.copy(this),t),Math.round(ue(mn.r*255,0,255))*65536+Math.round(ue(mn.g*255,0,255))*256+Math.round(ue(mn.b*255,0,255))}getHexString(t=Sn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ye.workingColorSpace){ye.workingToColorSpace(mn.copy(this),e);const n=mn.r,s=mn.g,r=mn.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ye.workingColorSpace){return ye.workingToColorSpace(mn.copy(this),e),t.r=mn.r,t.g=mn.g,t.b=mn.b,t}getStyle(t=Sn){ye.workingToColorSpace(mn.copy(this),t);const e=mn.r,n=mn.g,s=mn.b;return t!==Sn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ii),this.setHSL(Ii.h+t,Ii.s+e,Ii.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ii),t.getHSL(ra);const n=br(Ii.h,ra.h,e),s=br(Ii.s,ra.s,e),r=br(Ii.l,ra.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const mn=new Jt;Jt.NAMES=Kd;let sp=0;class Wi extends Vs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sp++}),this.uuid=ci(),this.name="",this.type="Material",this.blending=Is,this.side=Ti,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pl,this.blendDst=ml,this.blendEquation=ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Jt(0,0,0),this.blendAlpha=0,this.depthFunc=Ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=cs,this.stencilZFail=cs,this.stencilZPass=cs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Is&&(n.blending=this.blending),this.side!==Ti&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==pl&&(n.blendSrc=this.blendSrc),this.blendDst!==ml&&(n.blendDst=this.blendDst),this.blendEquation!==ts&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ns&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==cs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==cs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==cs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Qa extends Wi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.combine=Fd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Qe=new P,aa=new kt;let rp=0;class nn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=tc,this.updateRanges=[],this.gpuType=Yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)aa.fromBufferAttribute(this,e),aa.applyMatrix3(t),this.setXY(e,aa.x,aa.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.applyMatrix3(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.applyMatrix4(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.applyNormalMatrix(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.transformDirection(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Xn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Xn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Xn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Xn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Xn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),n=Re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),n=Re(n,this.array),s=Re(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Re(e,this.array),n=Re(n,this.array),s=Re(s,this.array),r=Re(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==tc&&(t.usage=this.usage),t}}class Ac extends nn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Jd extends nn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ce extends nn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let ap=0;const Nn=new ie,Lo=new Be,ys=new P,Dn=new Bn,tr=new Bn,cn=new P;class Le extends Vs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ap++}),this.uuid=ci(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(jd(t)?Jd:Ac)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new oe().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Nn.makeRotationFromQuaternion(t),this.applyMatrix4(Nn),this}rotateX(t){return Nn.makeRotationX(t),this.applyMatrix4(Nn),this}rotateY(t){return Nn.makeRotationY(t),this.applyMatrix4(Nn),this}rotateZ(t){return Nn.makeRotationZ(t),this.applyMatrix4(Nn),this}translate(t,e,n){return Nn.makeTranslation(t,e,n),this.applyMatrix4(Nn),this}scale(t,e,n){return Nn.makeScale(t,e,n),this.applyMatrix4(Nn),this}lookAt(t){return Lo.lookAt(t),Lo.updateMatrix(),this.applyMatrix4(Lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ys).negate(),this.translate(ys.x,ys.y,ys.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ce(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Dn.setFromBufferAttribute(r),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Dn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Dn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Dn.min),this.boundingBox.expandByPoint(Dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(Dn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];tr.setFromBufferAttribute(o),this.morphTargetsRelative?(cn.addVectors(Dn.min,tr.min),Dn.expandByPoint(cn),cn.addVectors(Dn.max,tr.max),Dn.expandByPoint(cn)):(Dn.expandByPoint(tr.min),Dn.expandByPoint(tr.max))}Dn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)cn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(cn));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)cn.fromBufferAttribute(o,c),l&&(ys.fromBufferAttribute(t,c),cn.add(ys)),s=Math.max(s,n.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new nn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<n.count;D++)o[D]=new P,l[D]=new P;const c=new P,h=new P,d=new P,u=new kt,f=new kt,p=new kt,v=new P,g=new P;function m(D,S,M){c.fromBufferAttribute(n,D),h.fromBufferAttribute(n,S),d.fromBufferAttribute(n,M),u.fromBufferAttribute(r,D),f.fromBufferAttribute(r,S),p.fromBufferAttribute(r,M),h.sub(c),d.sub(c),f.sub(u),p.sub(u);const L=1/(f.x*p.y-p.x*f.y);isFinite(L)&&(v.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(L),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(L),o[D].add(v),o[S].add(v),o[M].add(v),l[D].add(g),l[S].add(g),l[M].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let D=0,S=y.length;D<S;++D){const M=y[D],L=M.start,k=M.count;for(let V=L,Z=L+k;V<Z;V+=3)m(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const x=new P,_=new P,A=new P,C=new P;function E(D){A.fromBufferAttribute(s,D),C.copy(A);const S=o[D];x.copy(S),x.sub(A.multiplyScalar(A.dot(S))).normalize(),_.crossVectors(C,S);const L=_.dot(l[D])<0?-1:1;a.setXYZW(D,x.x,x.y,x.z,L)}for(let D=0,S=y.length;D<S;++D){const M=y[D],L=M.start,k=M.count;for(let V=L,Z=L+k;V<Z;V+=3)E(t.getX(V+0)),E(t.getX(V+1)),E(t.getX(V+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new nn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new P,r=new P,a=new P,o=new P,l=new P,c=new P,h=new P,d=new P;if(t)for(let u=0,f=t.count;u<f;u+=3){const p=t.getX(u+0),v=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,g),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)cn.fromBufferAttribute(t,e),cn.normalize(),t.setXYZ(e,cn.x,cn.y,cn.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,p=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let m=0;m<h;m++)u[p++]=c[f++]}return new nn(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Le,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const fh=new ie,ji=new Gr,oa=new Zn,ph=new P,la=new P,ca=new P,ha=new P,Io=new P,da=new P,mh=new P,ua=new P;class Me extends Be{constructor(t=new Le,e=new Qa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){da.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(Io.fromBufferAttribute(d,t),a?da.addScaledVector(Io,h):da.addScaledVector(Io.sub(e),h))}e.add(da)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),oa.copy(n.boundingSphere),oa.applyMatrix4(r),ji.copy(t.ray).recast(t.near),!(oa.containsPoint(ji.origin)===!1&&(ji.intersectSphere(oa,ph)===null||ji.origin.distanceToSquared(ph)>(t.far-t.near)**2))&&(fh.copy(r).invert(),ji.copy(t.ray).applyMatrix4(fh),!(n.boundingBox!==null&&ji.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ji)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,v=u.length;p<v;p++){const g=u[p],m=a[g.materialIndex],y=Math.max(g.start,f.start),x=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let _=y,A=x;_<A;_+=3){const C=o.getX(_),E=o.getX(_+1),D=o.getX(_+2);s=fa(this,m,t,n,c,h,d,C,E,D),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const p=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const y=o.getX(g),x=o.getX(g+1),_=o.getX(g+2);s=fa(this,a,t,n,c,h,d,y,x,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,v=u.length;p<v;p++){const g=u[p],m=a[g.materialIndex],y=Math.max(g.start,f.start),x=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let _=y,A=x;_<A;_+=3){const C=_,E=_+1,D=_+2;s=fa(this,m,t,n,c,h,d,C,E,D),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const p=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const y=g,x=g+1,_=g+2;s=fa(this,a,t,n,c,h,d,y,x,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function op(i,t,e,n,s,r,a,o){let l;if(t.side===xn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Ti,o),l===null)return null;ua.copy(o),ua.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(ua);return c<e.near||c>e.far?null:{distance:c,point:ua.clone(),object:i}}function fa(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,la),i.getVertexPosition(l,ca),i.getVertexPosition(c,ha);const h=op(i,t,e,n,la,ca,ha,mh);if(h){const d=new P;zn.getBarycoord(mh,la,ca,ha,d),s&&(h.uv=zn.getInterpolatedAttribute(s,o,l,c,d,new kt)),r&&(h.uv1=zn.getInterpolatedAttribute(r,o,l,c,d,new kt)),a&&(h.normal=zn.getInterpolatedAttribute(a,o,l,c,d,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new P,materialIndex:0};zn.getNormal(la,ca,ha,u.normal),h.face=u,h.barycoord=d}return h}class Gs extends Le{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;p("z","y","x",-1,-1,n,e,t,a,r,0),p("z","y","x",1,-1,n,e,-t,a,r,1),p("x","z","y",1,1,t,n,e,s,a,2),p("x","z","y",1,-1,t,n,-e,s,a,3),p("x","y","z",1,-1,t,e,n,s,r,4),p("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ce(c,3)),this.setAttribute("normal",new ce(h,3)),this.setAttribute("uv",new ce(d,2));function p(v,g,m,y,x,_,A,C,E,D,S){const M=_/E,L=A/D,k=_/2,V=A/2,Z=C/2,J=E+1,Y=D+1;let z=0,O=0;const lt=new P;for(let ot=0;ot<Y;ot++){const Mt=ot*L-V;for(let jt=0;jt<J;jt++){const he=jt*M-k;lt[v]=he*y,lt[g]=Mt*x,lt[m]=Z,c.push(lt.x,lt.y,lt.z),lt[v]=0,lt[g]=0,lt[m]=C>0?1:-1,h.push(lt.x,lt.y,lt.z),d.push(jt/E),d.push(1-ot/D),z+=1}}for(let ot=0;ot<D;ot++)for(let Mt=0;Mt<E;Mt++){const jt=u+Mt+J*ot,he=u+Mt+J*(ot+1),_e=u+(Mt+1)+J*(ot+1),Ht=u+(Mt+1)+J*ot;l.push(jt,he,Ht),l.push(he,_e,Ht),O+=6}o.addGroup(f,O,S),f+=O,u+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Bs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function bn(i){const t={};for(let e=0;e<i.length;e++){const n=Bs(i[e]);for(const s in n)t[s]=n[s]}return t}function lp(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Qd(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ye.workingColorSpace}const Xa={clone:Bs,merge:bn};var cp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Hn extends Wi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cp,this.fragmentShader=hp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Bs(t.uniforms),this.uniformsGroups=lp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class tu extends Be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=li,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ui=new P,gh=new kt,vh=new kt;class vn extends tu{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ur*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Mr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ur*2*Math.atan(Math.tan(Mr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ui.x,Ui.y).multiplyScalar(-t/Ui.z),Ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ui.x,Ui.y).multiplyScalar(-t/Ui.z)}getViewSize(t,e){return this.getViewBounds(t,gh,vh),e.subVectors(vh,gh)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Mr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const _s=-90,Ms=1;class dp extends Be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new vn(_s,Ms,t,e);s.layers=this.layers,this.add(s);const r=new vn(_s,Ms,t,e);r.layers=this.layers,this.add(r);const a=new vn(_s,Ms,t,e);a.layers=this.layers,this.add(a);const o=new vn(_s,Ms,t,e);o.layers=this.layers,this.add(o);const l=new vn(_s,Ms,t,e);l.layers=this.layers,this.add(l);const c=new vn(_s,Ms,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===li)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Wa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class eu extends yn{constructor(t=[],e=ks,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class up extends di{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new eu(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Gs(5,5,5),r=new Hn({name:"CubemapFromEquirect",uniforms:Bs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:xn,blending:Hi});r.uniforms.tEquirect.value=e;const a=new Me(s,r),o=e.minFilter;return e.minFilter===Bi&&(e.minFilter=qn),new dp(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}class Oe extends Be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const fp={type:"move"};class Uo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&u>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(fp)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Oe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class to{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Jt(t),this.density=e}clone(){return new to(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class No extends Be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ui,this.environmentIntensity=1,this.environmentRotation=new ui,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class pp{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=tc,this.updateRanges=[],this.version=0,this.uuid=ci()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ci()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ci()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Mn=new P;class qa{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Mn.fromBufferAttribute(this,e),Mn.applyMatrix4(t),this.setXYZ(e,Mn.x,Mn.y,Mn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Mn.fromBufferAttribute(this,e),Mn.applyNormalMatrix(t),this.setXYZ(e,Mn.x,Mn.y,Mn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Mn.fromBufferAttribute(this,e),Mn.transformDirection(t),this.setXYZ(e,Mn.x,Mn.y,Mn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Xn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Re(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Xn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Xn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Xn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Xn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Re(e,this.array),n=Re(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Re(e,this.array),n=Re(n,this.array),s=Re(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Re(e,this.array),n=Re(n,this.array),s=Re(s,this.array),r=Re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new nn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new qa(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class nu extends Wi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Jt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let bs;const er=new P,Ss=new P,ws=new P,Ts=new kt,nr=new kt,iu=new ie,pa=new P,ir=new P,ma=new P,xh=new kt,ko=new kt,yh=new kt;class mp extends Be{constructor(t=new nu){if(super(),this.isSprite=!0,this.type="Sprite",bs===void 0){bs=new Le;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new pp(e,5);bs.setIndex([0,1,2,0,2,3]),bs.setAttribute("position",new qa(n,3,0,!1)),bs.setAttribute("uv",new qa(n,2,3,!1))}this.geometry=bs,this.material=t,this.center=new kt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ss.setFromMatrixScale(this.matrixWorld),iu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ws.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ss.multiplyScalar(-ws.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;ga(pa.set(-.5,-.5,0),ws,a,Ss,s,r),ga(ir.set(.5,-.5,0),ws,a,Ss,s,r),ga(ma.set(.5,.5,0),ws,a,Ss,s,r),xh.set(0,0),ko.set(1,0),yh.set(1,1);let o=t.ray.intersectTriangle(pa,ir,ma,!1,er);if(o===null&&(ga(ir.set(-.5,.5,0),ws,a,Ss,s,r),ko.set(0,1),o=t.ray.intersectTriangle(pa,ma,ir,!1,er),o===null))return;const l=t.ray.origin.distanceTo(er);l<t.near||l>t.far||e.push({distance:l,point:er.clone(),uv:zn.getInterpolation(er,pa,ir,ma,xh,ko,yh,new kt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function ga(i,t,e,n,s,r){Ts.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(nr.x=r*Ts.x-s*Ts.y,nr.y=s*Ts.x+r*Ts.y):nr.copy(Ts),i.copy(t),i.x+=nr.x,i.y+=nr.y,i.applyMatrix4(iu)}const _h=new P,Mh=new xe,bh=new xe,gp=new P,Sh=new ie,va=new P,Fo=new Zn,wh=new ie,zo=new Gr;class xa extends Me{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Kc,this.bindMatrix=new ie,this.bindMatrixInverse=new ie,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Bn),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,va),this.boundingBox.expandByPoint(va)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Zn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,va),this.boundingSphere.expandByPoint(va)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fo.copy(this.boundingSphere),Fo.applyMatrix4(s),t.ray.intersectsSphere(Fo)!==!1&&(wh.copy(s).invert(),zo.copy(t.ray).applyMatrix4(wh),!(this.boundingBox!==null&&zo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,zo)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new xe,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Kc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===mf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,s=this.geometry;Mh.fromBufferAttribute(s.attributes.skinIndex,t),bh.fromBufferAttribute(s.attributes.skinWeight,t),_h.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const a=bh.getComponent(r);if(a!==0){const o=Mh.getComponent(r);Sh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),e.addScaledVector(gp.copy(_h).applyMatrix4(Sh),a)}}return e.applyMatrix4(this.bindMatrixInverse)}}class su extends Be{constructor(){super(),this.isBone=!0,this.type="Bone"}}class eo extends yn{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Un,h=Un,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Th=new ie,vp=new ie;class Cc{constructor(t=[],e=[]){this.uuid=ci(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ie)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new ie;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=t.length;r<a;r++){const o=t[r]?t[r].matrixWorld:vp;Th.multiplyMatrices(o,e[r]),Th.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Cc(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new eo(e,t,t,In,Yn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){const r=t.bones[n];let a=e[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new su),this.bones.push(a),this.boneInverses.push(new ie().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const a=e[s];t.bones.push(a.uuid);const o=n[s];t.boneInverses.push(o.toArray())}return t}}class Ds extends nn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Es=new ie,Eh=new ie,ya=[],Ah=new Bn,xp=new ie,sr=new Me,rr=new Zn;class Fn extends Me{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ds(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,xp)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Bn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Es),Ah.copy(t.boundingBox).applyMatrix4(Es),this.boundingBox.union(Ah)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Zn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Es),rr.copy(t.boundingSphere).applyMatrix4(Es),this.boundingSphere.union(rr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(sr.geometry=this.geometry,sr.material=this.material,sr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rr.copy(this.boundingSphere),rr.applyMatrix4(n),t.ray.intersectsSphere(rr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Es),Eh.multiplyMatrices(n,Es),sr.matrixWorld=Eh,sr.raycast(t,ya);for(let a=0,o=ya.length;a<o;a++){const l=ya[a];l.instanceId=r,l.object=this,e.push(l)}ya.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ds(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new eo(new Float32Array(s*this.count),s,this.count,_c,Yn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Oo=new P,yp=new P,_p=new oe;class ai{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Oo.subVectors(n,e).cross(yp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Oo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||_p.getNormalMatrix(t),s=this.coplanarPoint(Oo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Zi=new Zn,Mp=new kt(.5,.5),_a=new P;class Rc{constructor(t=new ai,e=new ai,n=new ai,s=new ai,r=new ai,a=new ai){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=li,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],p=r[8],v=r[9],g=r[10],m=r[11],y=r[12],x=r[13],_=r[14],A=r[15];if(s[0].setComponents(c-a,f-h,m-p,A-y).normalize(),s[1].setComponents(c+a,f+h,m+p,A+y).normalize(),s[2].setComponents(c+o,f+d,m+v,A+x).normalize(),s[3].setComponents(c-o,f-d,m-v,A-x).normalize(),n)s[4].setComponents(l,u,g,_).normalize(),s[5].setComponents(c-l,f-u,m-g,A-_).normalize();else if(s[4].setComponents(c-l,f-u,m-g,A-_).normalize(),e===li)s[5].setComponents(c+l,f+u,m+g,A+_).normalize();else if(e===Wa)s[5].setComponents(l,u,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Zi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Zi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Zi)}intersectsSprite(t){Zi.center.set(0,0,0);const e=Mp.distanceTo(t.center);return Zi.radius=.7071067811865476+e,Zi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Zi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(_a.x=s.normal.x>0?t.max.x:t.min.x,_a.y=s.normal.y>0?t.max.y:t.min.y,_a.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(_a)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ru extends Wi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Jt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ya=new P,ja=new P,Ch=new ie,ar=new Gr,Ma=new Zn,Bo=new P,Rh=new P;class au extends Be{constructor(t=new Le,e=new ru){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Ya.fromBufferAttribute(e,s-1),ja.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Ya.distanceTo(ja);t.setAttribute("lineDistance",new ce(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ma.copy(n.boundingSphere),Ma.applyMatrix4(s),Ma.radius+=r,t.ray.intersectsSphere(Ma)===!1)return;Ch.copy(s).invert(),ar.copy(t.ray).applyMatrix4(Ch);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let v=f,g=p-1;v<g;v+=c){const m=h.getX(v),y=h.getX(v+1),x=ba(this,t,ar,l,m,y,v);x&&e.push(x)}if(this.isLineLoop){const v=h.getX(p-1),g=h.getX(f),m=ba(this,t,ar,l,v,g,p-1);m&&e.push(m)}}else{const f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let v=f,g=p-1;v<g;v+=c){const m=ba(this,t,ar,l,v,v+1,v);m&&e.push(m)}if(this.isLineLoop){const v=ba(this,t,ar,l,p-1,f,p-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ba(i,t,e,n,s,r,a){const o=i.geometry.attributes.position;if(Ya.fromBufferAttribute(o,s),ja.fromBufferAttribute(o,r),e.distanceSqToSegment(Ya,ja,Bo,Rh)>n)return;Bo.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Bo);if(!(c<t.near||c>t.far))return{distance:c,point:Rh.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Ph=new P,Dh=new P;class bp extends au{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Ph.fromBufferAttribute(e,s),Dh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Ph.distanceTo(Dh);t.setAttribute("lineDistance",new ce(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Sp extends au{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class wp extends Wi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Jt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Lh=new ie,ec=new Gr,Sa=new Zn,wa=new P;class Tp extends Be{constructor(t=new Le,e=new wp){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sa.copy(n.boundingSphere),Sa.applyMatrix4(s),Sa.radius+=r,t.ray.intersectsSphere(Sa)===!1)return;Lh.copy(s).invert(),ec.copy(t.ray).applyMatrix4(Lh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=u,v=f;p<v;p++){const g=c.getX(p);wa.fromBufferAttribute(d,g),Ih(wa,g,l,s,t,e,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let p=u,v=f;p<v;p++)wa.fromBufferAttribute(d,p),Ih(wa,p,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ih(i,t,e,n,s,r,a){const o=ec.distanceSqToPoint(i);if(o<e){const l=new P;ec.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class ou extends yn{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class lu extends yn{constructor(t,e,n=rs,s,r,a,o=Un,l=Un,c,h=Lr,d=1){if(h!==Lr&&h!==Ir)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:d};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Tc(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class cu extends yn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ei{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new kt:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new P,s=[],r=[],a=[],o=new P,l=new ie;for(let f=0;f<=t;f++){const p=f/t;s[f]=this.getTangentAt(p,new P)}r[0]=new P,a[0]=new P;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(ue(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(ue(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],f*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class hu extends Ei{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new kt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Ep extends hu{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Pc(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const Ta=new P,Ho=new Pc,Vo=new Pc,Go=new Pc;class kr extends Ei{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new P){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Ta.subVectors(s[0],s[1]).add(s[0]),c=Ta);const d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Ta.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Ta),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),Ho.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,p,v,g),Vo.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,p,v,g),Go.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,p,v,g)}else this.curveType==="catmullrom"&&(Ho.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Vo.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Go.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(Ho.calc(l),Vo.calc(l),Go.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new P().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Uh(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function Ap(i,t){const e=1-i;return e*e*t}function Cp(i,t){return 2*(1-i)*i*t}function Rp(i,t){return i*i*t}function Sr(i,t,e,n){return Ap(i,t)+Cp(i,e)+Rp(i,n)}function Pp(i,t){const e=1-i;return e*e*e*t}function Dp(i,t){const e=1-i;return 3*e*e*i*t}function Lp(i,t){return 3*(1-i)*i*i*t}function Ip(i,t){return i*i*i*t}function wr(i,t,e,n,s){return Pp(i,t)+Dp(i,e)+Lp(i,n)+Ip(i,s)}class Up extends Ei{constructor(t=new kt,e=new kt,n=new kt,s=new kt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new kt){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(wr(t,s.x,r.x,a.x,o.x),wr(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Np extends Ei{constructor(t=new P,e=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new P){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(wr(t,s.x,r.x,a.x,o.x),wr(t,s.y,r.y,a.y,o.y),wr(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class kp extends Ei{constructor(t=new kt,e=new kt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new kt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new kt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Fp extends Ei{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class zp extends Ei{constructor(t=new kt,e=new kt,n=new kt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new kt){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Sr(t,s.x,r.x,a.x),Sr(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class du extends Ei{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Sr(t,s.x,r.x,a.x),Sr(t,s.y,r.y,a.y),Sr(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Op extends Ei{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new kt){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(Uh(o,l.x,c.x,h.x,d.x),Uh(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new kt().fromArray(s))}return this}}var Bp=Object.freeze({__proto__:null,ArcCurve:Ep,CatmullRomCurve3:kr,CubicBezierCurve:Up,CubicBezierCurve3:Np,EllipseCurve:hu,LineCurve:kp,LineCurve3:Fp,QuadraticBezierCurve:zp,QuadraticBezierCurve3:du,SplineCurve:Op});class is extends Le{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,u=e/l,f=[],p=[],v=[],g=[];for(let m=0;m<h;m++){const y=m*u-a;for(let x=0;x<c;x++){const _=x*d-r;p.push(_,-y,0),v.push(0,0,1),g.push(x/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<o;y++){const x=y+c*m,_=y+c*(m+1),A=y+1+c*(m+1),C=y+1+c*m;f.push(x,_,C),f.push(_,A,C)}this.setIndex(f),this.setAttribute("position",new ce(p,3)),this.setAttribute("normal",new ce(v,3)),this.setAttribute("uv",new ce(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new is(t.width,t.height,t.widthSegments,t.heightSegments)}}class no extends Le{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new P,u=new P,f=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const y=[],x=m/n;let _=0;m===0&&a===0?_=.5/e:m===n&&l===Math.PI&&(_=-.5/e);for(let A=0;A<=e;A++){const C=A/e;d.x=-t*Math.cos(s+C*r)*Math.sin(a+x*o),d.y=t*Math.cos(a+x*o),d.z=t*Math.sin(s+C*r)*Math.sin(a+x*o),p.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),g.push(C+_,1-x),y.push(c++)}h.push(y)}for(let m=0;m<n;m++)for(let y=0;y<e;y++){const x=h[m][y+1],_=h[m][y],A=h[m+1][y],C=h[m+1][y+1];(m!==0||a>0)&&f.push(x,_,C),(m!==n-1||l<Math.PI)&&f.push(_,A,C)}this.setIndex(f),this.setAttribute("position",new ce(p,3)),this.setAttribute("normal",new ce(v,3)),this.setAttribute("uv",new ce(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new no(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class io extends Le{constructor(t=new du(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new P,l=new P,c=new kt;let h=new P;const d=[],u=[],f=[],p=[];v(),this.setIndex(p),this.setAttribute("position",new ce(d,3)),this.setAttribute("normal",new ce(u,3)),this.setAttribute("uv",new ce(f,2));function v(){for(let x=0;x<e;x++)g(x);g(r===!1?e:0),y(),m()}function g(x){h=t.getPointAt(x/e,h);const _=a.normals[x],A=a.binormals[x];for(let C=0;C<=s;C++){const E=C/s*Math.PI*2,D=Math.sin(E),S=-Math.cos(E);l.x=S*_.x+D*A.x,l.y=S*_.y+D*A.y,l.z=S*_.z+D*A.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function m(){for(let x=1;x<=e;x++)for(let _=1;_<=s;_++){const A=(s+1)*(x-1)+(_-1),C=(s+1)*x+(_-1),E=(s+1)*x+_,D=(s+1)*(x-1)+_;p.push(A,C,D),p.push(C,E,D)}}function y(){for(let x=0;x<=e;x++)for(let _=0;_<=s;_++)c.x=x/e,c.y=_/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new io(new Bp[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class tn extends Wi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qd,this.normalScale=new kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Dc extends tn{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new kt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ue(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Jt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Jt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Jt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Hp extends Wi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Vp extends Wi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Lc extends Be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Wo extends Lc{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Jt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const $o=new ie,Nh=new P,kh=new P;class uu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new kt(512,512),this.mapType=hi,this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Rc,this._frameExtents=new kt(1,1),this._viewportCount=1,this._viewports=[new xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Nh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Nh),kh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(kh),e.updateMatrixWorld(),$o.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix($o,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply($o)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Fh=new ie,or=new P,Xo=new P;class Gp extends uu{constructor(){super(new vn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new kt(4,2),this._viewportCount=6,this._viewports=[new xe(2,1,1,1),new xe(0,1,1,1),new xe(3,1,1,1),new xe(1,1,1,1),new xe(3,0,1,1),new xe(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),or.setFromMatrixPosition(t.matrixWorld),n.position.copy(or),Xo.copy(n.position),Xo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Xo),n.updateMatrixWorld(),s.makeTranslation(-or.x,-or.y,-or.z),Fh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fh,n.coordinateSystem,n.reversedDepth)}}class Wp extends Lc{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Gp}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class fu extends tu{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class $p extends uu{constructor(){super(new fu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ea extends Lc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Be.DEFAULT_UP),this.updateMatrix(),this.target=new Be,this.shadow=new $p}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Xp extends Le{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class qp extends vn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const zh=new ie;class Ic{constructor(t,e,n=0,s=1/0){this.ray=new Gr(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ec,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return zh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(zh),this}intersectObject(t,e=!0,n=[]){return nc(t,this,n,e),n.sort(Oh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)nc(t[s],this,n,e);return n.sort(Oh),n}}function Oh(i,t){return i.distance-t.distance}function nc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)nc(r[a],t,e,!0)}}function Bh(i,t,e,n){const s=Yp(n);switch(e){case Wd:return i*t;case _c:return i*t/s.components*s.byteLength;case Mc:return i*t/s.components*s.byteLength;case Xd:return i*t*2/s.components*s.byteLength;case bc:return i*t*2/s.components*s.byteLength;case $d:return i*t*3/s.components*s.byteLength;case In:return i*t*4/s.components*s.byteLength;case Sc:return i*t*4/s.components*s.byteLength;case ka:case Fa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case za:case Oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Al:case Rl:return Math.max(i,16)*Math.max(t,8)/4;case El:case Cl:return Math.max(i,8)*Math.max(t,8)/2;case Pl:case Dl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ll:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Il:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ul:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Nl:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case kl:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Fl:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case zl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ol:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Bl:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Hl:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Vl:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Gl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Wl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case $l:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Xl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ql:case Yl:case jl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Zl:case Kl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Jl:case Ql:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Yp(i){switch(i){case hi:case Bd:return{byteLength:1,components:1};case Pr:case Hd:case Hr:return{byteLength:2,components:1};case xc:case yc:return{byteLength:2,components:4};case rs:case vc:case Yn:return{byteLength:4,components:1};case Vd:case Gd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function pu(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function jp(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){const p=d[u],v=d[f];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){const v=d[f];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Zp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kp=`#ifdef USE_ALPHAHASH
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
#endif`,Jp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,em=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nm=`#ifdef USE_AOMAP
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
#endif`,im=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sm=`#ifdef USE_BATCHING
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
#endif`,rm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,am=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,om=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,lm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,cm=`#ifdef USE_IRIDESCENCE
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
#endif`,hm=`#ifdef USE_BUMPMAP
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
#endif`,dm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,um=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,gm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,xm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ym=`#define PI 3.141592653589793
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
} // validated`,_m=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Mm=`vec3 transformedNormal = objectNormal;
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
#endif`,bm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,wm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Tm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Em="gl_FragColor = linearToOutputTexel( gl_FragColor );",Am=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Cm=`#ifdef USE_ENVMAP
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
#endif`,Rm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Pm=`#ifdef USE_ENVMAP
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
#endif`,Dm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lm=`#ifdef USE_ENVMAP
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
#endif`,Im=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Um=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,km=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fm=`#ifdef USE_GRADIENTMAP
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
}`,zm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Om=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hm=`uniform bool receiveShadow;
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
#endif`,Vm=`#ifdef USE_ENVMAP
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
#endif`,Gm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Wm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$m=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qm=`PhysicalMaterial material;
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
#endif`,Ym=`struct PhysicalMaterial {
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
}`,jm=`
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
#endif`,Zm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Km=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ng=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ig=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,rg=`#if defined( USE_POINTS_UV )
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
#endif`,ag=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,og=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,lg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dg=`#ifdef USE_MORPHTARGETS
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
#endif`,ug=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,pg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,mg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,xg=`#ifdef USE_NORMALMAP
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
#endif`,yg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_g=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Tg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Eg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ag=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Dg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ig=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ug=`float getShadowMask() {
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
}`,Ng=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,kg=`#ifdef USE_SKINNING
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
#endif`,Fg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zg=`#ifdef USE_SKINNING
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
#endif`,Og=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Hg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gg=`#ifdef USE_TRANSMISSION
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
#endif`,Wg=`#ifdef USE_TRANSMISSION
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
#endif`,$g=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const jg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zg=`uniform sampler2D t2D;
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
}`,Kg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Qg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,t0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e0=`#include <common>
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
}`,n0=`#if DEPTH_PACKING == 3200
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
}`,i0=`#define DISTANCE
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
}`,s0=`#define DISTANCE
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
}`,r0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,a0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o0=`uniform float scale;
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
}`,l0=`uniform vec3 diffuse;
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
}`,c0=`#include <common>
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
}`,h0=`uniform vec3 diffuse;
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
}`,d0=`#define LAMBERT
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
}`,u0=`#define LAMBERT
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
}`,f0=`#define MATCAP
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
}`,p0=`#define MATCAP
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
}`,m0=`#define NORMAL
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
}`,g0=`#define NORMAL
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
}`,v0=`#define PHONG
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
}`,x0=`#define PHONG
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
}`,y0=`#define STANDARD
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
}`,_0=`#define STANDARD
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
}`,M0=`#define TOON
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
}`,b0=`#define TOON
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
}`,S0=`uniform float size;
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
}`,w0=`uniform vec3 diffuse;
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
}`,T0=`#include <common>
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
}`,E0=`uniform vec3 color;
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
}`,A0=`uniform float rotation;
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
}`,C0=`uniform vec3 diffuse;
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
}`,le={alphahash_fragment:Zp,alphahash_pars_fragment:Kp,alphamap_fragment:Jp,alphamap_pars_fragment:Qp,alphatest_fragment:tm,alphatest_pars_fragment:em,aomap_fragment:nm,aomap_pars_fragment:im,batching_pars_vertex:sm,batching_vertex:rm,begin_vertex:am,beginnormal_vertex:om,bsdfs:lm,iridescence_fragment:cm,bumpmap_pars_fragment:hm,clipping_planes_fragment:dm,clipping_planes_pars_fragment:um,clipping_planes_pars_vertex:fm,clipping_planes_vertex:pm,color_fragment:mm,color_pars_fragment:gm,color_pars_vertex:vm,color_vertex:xm,common:ym,cube_uv_reflection_fragment:_m,defaultnormal_vertex:Mm,displacementmap_pars_vertex:bm,displacementmap_vertex:Sm,emissivemap_fragment:wm,emissivemap_pars_fragment:Tm,colorspace_fragment:Em,colorspace_pars_fragment:Am,envmap_fragment:Cm,envmap_common_pars_fragment:Rm,envmap_pars_fragment:Pm,envmap_pars_vertex:Dm,envmap_physical_pars_fragment:Vm,envmap_vertex:Lm,fog_vertex:Im,fog_pars_vertex:Um,fog_fragment:Nm,fog_pars_fragment:km,gradientmap_pars_fragment:Fm,lightmap_pars_fragment:zm,lights_lambert_fragment:Om,lights_lambert_pars_fragment:Bm,lights_pars_begin:Hm,lights_toon_fragment:Gm,lights_toon_pars_fragment:Wm,lights_phong_fragment:$m,lights_phong_pars_fragment:Xm,lights_physical_fragment:qm,lights_physical_pars_fragment:Ym,lights_fragment_begin:jm,lights_fragment_maps:Zm,lights_fragment_end:Km,logdepthbuf_fragment:Jm,logdepthbuf_pars_fragment:Qm,logdepthbuf_pars_vertex:tg,logdepthbuf_vertex:eg,map_fragment:ng,map_pars_fragment:ig,map_particle_fragment:sg,map_particle_pars_fragment:rg,metalnessmap_fragment:ag,metalnessmap_pars_fragment:og,morphinstance_vertex:lg,morphcolor_vertex:cg,morphnormal_vertex:hg,morphtarget_pars_vertex:dg,morphtarget_vertex:ug,normal_fragment_begin:fg,normal_fragment_maps:pg,normal_pars_fragment:mg,normal_pars_vertex:gg,normal_vertex:vg,normalmap_pars_fragment:xg,clearcoat_normal_fragment_begin:yg,clearcoat_normal_fragment_maps:_g,clearcoat_pars_fragment:Mg,iridescence_pars_fragment:bg,opaque_fragment:Sg,packing:wg,premultiplied_alpha_fragment:Tg,project_vertex:Eg,dithering_fragment:Ag,dithering_pars_fragment:Cg,roughnessmap_fragment:Rg,roughnessmap_pars_fragment:Pg,shadowmap_pars_fragment:Dg,shadowmap_pars_vertex:Lg,shadowmap_vertex:Ig,shadowmask_pars_fragment:Ug,skinbase_vertex:Ng,skinning_pars_vertex:kg,skinning_vertex:Fg,skinnormal_vertex:zg,specularmap_fragment:Og,specularmap_pars_fragment:Bg,tonemapping_fragment:Hg,tonemapping_pars_fragment:Vg,transmission_fragment:Gg,transmission_pars_fragment:Wg,uv_pars_fragment:$g,uv_pars_vertex:Xg,uv_vertex:qg,worldpos_vertex:Yg,background_vert:jg,background_frag:Zg,backgroundCube_vert:Kg,backgroundCube_frag:Jg,cube_vert:Qg,cube_frag:t0,depth_vert:e0,depth_frag:n0,distanceRGBA_vert:i0,distanceRGBA_frag:s0,equirect_vert:r0,equirect_frag:a0,linedashed_vert:o0,linedashed_frag:l0,meshbasic_vert:c0,meshbasic_frag:h0,meshlambert_vert:d0,meshlambert_frag:u0,meshmatcap_vert:f0,meshmatcap_frag:p0,meshnormal_vert:m0,meshnormal_frag:g0,meshphong_vert:v0,meshphong_frag:x0,meshphysical_vert:y0,meshphysical_frag:_0,meshtoon_vert:M0,meshtoon_frag:b0,points_vert:S0,points_frag:w0,shadow_vert:T0,shadow_frag:E0,sprite_vert:A0,sprite_frag:C0},bt={common:{diffuse:{value:new Jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new oe},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new oe}},envmap:{envMap:{value:null},envMapRotation:{value:new oe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new oe},normalScale:{value:new kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0},uvTransform:{value:new oe}},sprite:{diffuse:{value:new Jt(16777215)},opacity:{value:1},center:{value:new kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new oe},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0}}},oi={basic:{uniforms:bn([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.fog]),vertexShader:le.meshbasic_vert,fragmentShader:le.meshbasic_frag},lambert:{uniforms:bn([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new Jt(0)}}]),vertexShader:le.meshlambert_vert,fragmentShader:le.meshlambert_frag},phong:{uniforms:bn([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new Jt(0)},specular:{value:new Jt(1118481)},shininess:{value:30}}]),vertexShader:le.meshphong_vert,fragmentShader:le.meshphong_frag},standard:{uniforms:bn([bt.common,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.roughnessmap,bt.metalnessmap,bt.fog,bt.lights,{emissive:{value:new Jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag},toon:{uniforms:bn([bt.common,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.gradientmap,bt.fog,bt.lights,{emissive:{value:new Jt(0)}}]),vertexShader:le.meshtoon_vert,fragmentShader:le.meshtoon_frag},matcap:{uniforms:bn([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,{matcap:{value:null}}]),vertexShader:le.meshmatcap_vert,fragmentShader:le.meshmatcap_frag},points:{uniforms:bn([bt.points,bt.fog]),vertexShader:le.points_vert,fragmentShader:le.points_frag},dashed:{uniforms:bn([bt.common,bt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:le.linedashed_vert,fragmentShader:le.linedashed_frag},depth:{uniforms:bn([bt.common,bt.displacementmap]),vertexShader:le.depth_vert,fragmentShader:le.depth_frag},normal:{uniforms:bn([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,{opacity:{value:1}}]),vertexShader:le.meshnormal_vert,fragmentShader:le.meshnormal_frag},sprite:{uniforms:bn([bt.sprite,bt.fog]),vertexShader:le.sprite_vert,fragmentShader:le.sprite_frag},background:{uniforms:{uvTransform:{value:new oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:le.background_vert,fragmentShader:le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new oe}},vertexShader:le.backgroundCube_vert,fragmentShader:le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:le.cube_vert,fragmentShader:le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:le.equirect_vert,fragmentShader:le.equirect_frag},distanceRGBA:{uniforms:bn([bt.common,bt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:le.distanceRGBA_vert,fragmentShader:le.distanceRGBA_frag},shadow:{uniforms:bn([bt.lights,bt.fog,{color:{value:new Jt(0)},opacity:{value:1}}]),vertexShader:le.shadow_vert,fragmentShader:le.shadow_frag}};oi.physical={uniforms:bn([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new oe},clearcoatNormalScale:{value:new kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new oe},sheen:{value:0},sheenColor:{value:new Jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new oe},transmissionSamplerSize:{value:new kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new oe},attenuationDistance:{value:0},attenuationColor:{value:new Jt(0)},specularColor:{value:new Jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new oe},anisotropyVector:{value:new kt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new oe}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag};const Aa={r:0,b:0,g:0},Ki=new ui,R0=new ie;function P0(i,t,e,n,s,r,a){const o=new Jt(0);let l=r===!0?0:1,c,h,d=null,u=0,f=null;function p(x){let _=x.isScene===!0?x.background:null;return _&&_.isTexture&&(_=(x.backgroundBlurriness>0?e:t).get(_)),_}function v(x){let _=!1;const A=p(x);A===null?m(o,l):A&&A.isColor&&(m(A,1),_=!0);const C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,a):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(x,_){const A=p(_);A&&(A.isCubeTexture||A.mapping===Ja)?(h===void 0&&(h=new Me(new Gs(1,1,1),new Hn({name:"BackgroundCubeMaterial",uniforms:Bs(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,E,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ki.copy(_.backgroundRotation),Ki.x*=-1,Ki.y*=-1,Ki.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Ki.y*=-1,Ki.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(R0.makeRotationFromEuler(Ki)),h.material.toneMapped=ye.getTransfer(A.colorSpace)!==De,(d!==A||u!==A.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=A,u=A.version,f=i.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new Me(new is(2,2),new Hn({name:"BackgroundMaterial",uniforms:Bs(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:Ti,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=ye.getTransfer(A.colorSpace)!==De,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(d!==A||u!==A.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,d=A,u=A.version,f=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function m(x,_){x.getRGB(Aa,Qd(i)),n.buffers.color.setClear(Aa.r,Aa.g,Aa.b,_,a)}function y(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,_=1){o.set(x),l=_,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,m(o,l)},render:v,addToRenderList:g,dispose:y}}function D0(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(M,L,k,V,Z){let J=!1;const Y=d(V,k,L);r!==Y&&(r=Y,c(r.object)),J=f(M,V,k,Z),J&&p(M,V,k,Z),Z!==null&&t.update(Z,i.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,_(M,L,k,V),Z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function d(M,L,k){const V=k.wireframe===!0;let Z=n[M.id];Z===void 0&&(Z={},n[M.id]=Z);let J=Z[L.id];J===void 0&&(J={},Z[L.id]=J);let Y=J[V];return Y===void 0&&(Y=u(l()),J[V]=Y),Y}function u(M){const L=[],k=[],V=[];for(let Z=0;Z<e;Z++)L[Z]=0,k[Z]=0,V[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:k,attributeDivisors:V,object:M,attributes:{},index:null}}function f(M,L,k,V){const Z=r.attributes,J=L.attributes;let Y=0;const z=k.getAttributes();for(const O in z)if(z[O].location>=0){const ot=Z[O];let Mt=J[O];if(Mt===void 0&&(O==="instanceMatrix"&&M.instanceMatrix&&(Mt=M.instanceMatrix),O==="instanceColor"&&M.instanceColor&&(Mt=M.instanceColor)),ot===void 0||ot.attribute!==Mt||Mt&&ot.data!==Mt.data)return!0;Y++}return r.attributesNum!==Y||r.index!==V}function p(M,L,k,V){const Z={},J=L.attributes;let Y=0;const z=k.getAttributes();for(const O in z)if(z[O].location>=0){let ot=J[O];ot===void 0&&(O==="instanceMatrix"&&M.instanceMatrix&&(ot=M.instanceMatrix),O==="instanceColor"&&M.instanceColor&&(ot=M.instanceColor));const Mt={};Mt.attribute=ot,ot&&ot.data&&(Mt.data=ot.data),Z[O]=Mt,Y++}r.attributes=Z,r.attributesNum=Y,r.index=V}function v(){const M=r.newAttributes;for(let L=0,k=M.length;L<k;L++)M[L]=0}function g(M){m(M,0)}function m(M,L){const k=r.newAttributes,V=r.enabledAttributes,Z=r.attributeDivisors;k[M]=1,V[M]===0&&(i.enableVertexAttribArray(M),V[M]=1),Z[M]!==L&&(i.vertexAttribDivisor(M,L),Z[M]=L)}function y(){const M=r.newAttributes,L=r.enabledAttributes;for(let k=0,V=L.length;k<V;k++)L[k]!==M[k]&&(i.disableVertexAttribArray(k),L[k]=0)}function x(M,L,k,V,Z,J,Y){Y===!0?i.vertexAttribIPointer(M,L,k,Z,J):i.vertexAttribPointer(M,L,k,V,Z,J)}function _(M,L,k,V){v();const Z=V.attributes,J=k.getAttributes(),Y=L.defaultAttributeValues;for(const z in J){const O=J[z];if(O.location>=0){let lt=Z[z];if(lt===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(lt=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(lt=M.instanceColor)),lt!==void 0){const ot=lt.normalized,Mt=lt.itemSize,jt=t.get(lt);if(jt===void 0)continue;const he=jt.buffer,_e=jt.type,Ht=jt.bytesPerElement,Q=_e===i.INT||_e===i.UNSIGNED_INT||lt.gpuType===vc;if(lt.isInterleavedBufferAttribute){const nt=lt.data,vt=nt.stride,gt=lt.offset;if(nt.isInstancedInterleavedBuffer){for(let At=0;At<O.locationSize;At++)m(O.location+At,nt.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let At=0;At<O.locationSize;At++)g(O.location+At);i.bindBuffer(i.ARRAY_BUFFER,he);for(let At=0;At<O.locationSize;At++)x(O.location+At,Mt/O.locationSize,_e,ot,vt*Ht,(gt+Mt/O.locationSize*At)*Ht,Q)}else{if(lt.isInstancedBufferAttribute){for(let nt=0;nt<O.locationSize;nt++)m(O.location+nt,lt.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let nt=0;nt<O.locationSize;nt++)g(O.location+nt);i.bindBuffer(i.ARRAY_BUFFER,he);for(let nt=0;nt<O.locationSize;nt++)x(O.location+nt,Mt/O.locationSize,_e,ot,Mt*Ht,Mt/O.locationSize*nt*Ht,Q)}}else if(Y!==void 0){const ot=Y[z];if(ot!==void 0)switch(ot.length){case 2:i.vertexAttrib2fv(O.location,ot);break;case 3:i.vertexAttrib3fv(O.location,ot);break;case 4:i.vertexAttrib4fv(O.location,ot);break;default:i.vertexAttrib1fv(O.location,ot)}}}}y()}function A(){D();for(const M in n){const L=n[M];for(const k in L){const V=L[k];for(const Z in V)h(V[Z].object),delete V[Z];delete L[k]}delete n[M]}}function C(M){if(n[M.id]===void 0)return;const L=n[M.id];for(const k in L){const V=L[k];for(const Z in V)h(V[Z].object),delete V[Z];delete L[k]}delete n[M.id]}function E(M){for(const L in n){const k=n[L];if(k[M.id]===void 0)continue;const V=k[M.id];for(const Z in V)h(V[Z].object),delete V[Z];delete k[M.id]}}function D(){S(),a=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:D,resetDefaultState:S,dispose:A,releaseStatesOfGeometry:C,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:g,disableUnusedAttributes:y}}function L0(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let p=0;p<d;p++)f+=h[p];e.update(f,n,1)}function l(c,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<c.length;p++)a(c[p],h[p],u[p]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let p=0;for(let v=0;v<d;v++)p+=h[v]*u[v];e.update(p,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function I0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(E){return!(E!==In&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const D=E===Hr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==hi&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Yn&&!D)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=p>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:A,maxSamples:C}}function U0(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new ai,o=new oe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const p=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,m=i.get(d);if(!s||p===null||p.length===0||r&&!g)r?h(null):c();else{const y=r?0:n,x=y*4;let _=m.clippingState||null;l.value=_,_=h(p,u,x,f);for(let A=0;A!==x;++A)_[A]=e[A];m.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,p){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=l.value,p!==!0||g===null){const m=f+v*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<m)&&(g=new Float32Array(m));for(let x=0,_=f;x!==v;++x,_+=4)a.copy(d[x]).applyMatrix4(y,o),a.normal.toArray(g,_),g[_+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function N0(i){let t=new WeakMap;function e(a,o){return o===Sl?a.mapping=ks:o===wl&&(a.mapping=Fs),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Sl||o===wl)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new up(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Ls=4,Hh=[.125,.215,.35,.446,.526,.582],es=20,qo=new fu,Vh=new Jt;let Yo=null,jo=0,Zo=0,Ko=!1;const Qi=(1+Math.sqrt(5))/2,As=1/Qi,Gh=[new P(-Qi,As,0),new P(Qi,As,0),new P(-As,0,Qi),new P(As,0,Qi),new P(0,Qi,-As),new P(0,Qi,As),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)],k0=new P;class ic{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=k0}=r;Yo=this._renderer.getRenderTarget(),jo=this._renderer.getActiveCubeFace(),Zo=this._renderer.getActiveMipmapLevel(),Ko=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$h(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Yo,jo,Zo),this._renderer.xr.enabled=Ko,t.scissorTest=!1,Ca(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ks||t.mapping===Fs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Yo=this._renderer.getRenderTarget(),jo=this._renderer.getActiveCubeFace(),Zo=this._renderer.getActiveMipmapLevel(),Ko=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:qn,minFilter:qn,generateMipmaps:!1,type:Hr,format:In,colorSpace:Os,depthBuffer:!1},s=Wh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wh(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=F0(r)),this._blurMaterial=z0(r,t,e)}return s}_compileMaterial(t){const e=new Me(this._lodPlanes[0],t);this._renderer.compile(e,qo)}_sceneToCubeUV(t,e,n,s,r){const l=new vn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Vh),d.toneMapping=Vi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));const v=new Qa({name:"PMREM.Background",side:xn,depthWrite:!1,depthTest:!1}),g=new Me(new Gs,v);let m=!1;const y=t.background;y?y.isColor&&(v.color.copy(y),t.background=null,m=!0):(v.color.copy(Vh),m=!0);for(let x=0;x<6;x++){const _=x%3;_===0?(l.up.set(0,c[x],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[x],r.y,r.z)):_===1?(l.up.set(0,0,c[x]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[x],r.z)):(l.up.set(0,c[x],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[x]));const A=this._cubeSize;Ca(s,_*A,x>2?A:0,A,A),d.setRenderTarget(s),m&&d.render(g,l),d.render(t,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=f,d.autoClear=u,t.background=y}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===ks||t.mapping===Fs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$h());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Me(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Ca(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,qo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Gh[(s-r-1)%Gh.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Me(this._lodPlanes[s],c),u=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*es-1),v=r/p,g=isFinite(r)?1+Math.floor(h*v):es;g>es&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${es}`);const m=[];let y=0;for(let E=0;E<es;++E){const D=E/v,S=Math.exp(-D*D/2);m.push(S),E===0?y+=S:E<g&&(y+=2*S)}for(let E=0;E<m.length;E++)m[E]=m[E]/y;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=m,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:x}=this;u.dTheta.value=p,u.mipInt.value=x-n;const _=this._sizeLods[s],A=3*_*(s>x-Ls?s-x+Ls:0),C=4*(this._cubeSize-_);Ca(e,A,C,3*_,2*_),l.setRenderTarget(e),l.render(d,qo)}}function F0(i){const t=[],e=[],n=[];let s=i;const r=i-Ls+1+Hh.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Ls?l=Hh[a-i+Ls-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,p=6,v=3,g=2,m=1,y=new Float32Array(v*p*f),x=new Float32Array(g*p*f),_=new Float32Array(m*p*f);for(let C=0;C<f;C++){const E=C%3*2/3-1,D=C>2?0:-1,S=[E,D,0,E+2/3,D,0,E+2/3,D+1,0,E,D,0,E+2/3,D+1,0,E,D+1,0];y.set(S,v*p*C),x.set(u,g*p*C);const M=[C,C,C,C,C,C];_.set(M,m*p*C)}const A=new Le;A.setAttribute("position",new nn(y,v)),A.setAttribute("uv",new nn(x,g)),A.setAttribute("faceIndex",new nn(_,m)),t.push(A),s>Ls&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Wh(i,t,e){const n=new di(i,t,e);return n.texture.mapping=Ja,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ca(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function z0(i,t,e){const n=new Float32Array(es),s=new P(0,1,0);return new Hn({name:"SphericalGaussianBlur",defines:{n:es,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Uc(),fragmentShader:`

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
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function $h(){return new Hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Uc(),fragmentShader:`

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
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function Xh(){return new Hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Uc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function Uc(){return`

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
	`}function O0(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Sl||l===wl,h=l===ks||l===Fs;if(c||h){let d=t.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new ic(i)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new ic(i)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function B0(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Nr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function H0(i,t,e,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const p in u.attributes)t.remove(u.attributes[p]);u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)t.update(u[f],i.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,p=d.attributes.position;let v=0;if(f!==null){const y=f.array;v=f.version;for(let x=0,_=y.length;x<_;x+=3){const A=y[x+0],C=y[x+1],E=y[x+2];u.push(A,C,C,E,E,A)}}else if(p!==void 0){const y=p.array;v=p.version;for(let x=0,_=y.length/3-1;x<_;x+=3){const A=x+0,C=x+1,E=x+2;u.push(A,C,C,E,E,A)}}else return;const g=new(jd(u)?Jd:Ac)(u,1);g.version=v;const m=r.get(d);m&&t.remove(m),r.set(d,g)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function V0(i,t,e){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,f){i.drawElements(n,f,r,u*a),e.update(f,n,1)}function c(u,f,p){p!==0&&(i.drawElementsInstanced(n,f,r,u*a,p),e.update(f,n,p))}function h(u,f,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];e.update(g,n,1)}function d(u,f,p,v){if(p===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<u.length;m++)c(u[m]/a,f[m],v[m]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,v,0,p);let m=0;for(let y=0;y<p;y++)m+=f[y]*v[y];e.update(m,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function G0(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function W0(i,t,e){const n=new WeakMap,s=new xe;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let M=function(){D.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var f=M;u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let _=0;p===!0&&(_=1),v===!0&&(_=2),g===!0&&(_=3);let A=o.attributes.position.count*_,C=1;A>t.maxTextureSize&&(C=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const E=new Float32Array(A*C*4*d),D=new Zd(E,A,C,d);D.type=Yn,D.needsUpdate=!0;const S=_*4;for(let L=0;L<d;L++){const k=m[L],V=y[L],Z=x[L],J=A*C*4*L;for(let Y=0;Y<k.count;Y++){const z=Y*S;p===!0&&(s.fromBufferAttribute(k,Y),E[J+z+0]=s.x,E[J+z+1]=s.y,E[J+z+2]=s.z,E[J+z+3]=0),v===!0&&(s.fromBufferAttribute(V,Y),E[J+z+4]=s.x,E[J+z+5]=s.y,E[J+z+6]=s.z,E[J+z+7]=0),g===!0&&(s.fromBufferAttribute(Z,Y),E[J+z+8]=s.x,E[J+z+9]=s.y,E[J+z+10]=s.z,E[J+z+11]=Z.itemSize===4?s.w:1)}}u={count:d,texture:D,size:new kt(A,C)},n.set(o,u),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const v=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function $0(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}const mu=new yn,qh=new lu(1,1),gu=new Zd,vu=new Zf,xu=new eu,Yh=[],jh=[],Zh=new Float32Array(16),Kh=new Float32Array(9),Jh=new Float32Array(4);function Ws(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Yh[s];if(r===void 0&&(r=new Float32Array(s),Yh[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function on(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ln(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function so(i,t){let e=jh[t];e===void 0&&(e=new Int32Array(t),jh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function X0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function q0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(on(e,t))return;i.uniform2fv(this.addr,t),ln(e,t)}}function Y0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(on(e,t))return;i.uniform3fv(this.addr,t),ln(e,t)}}function j0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(on(e,t))return;i.uniform4fv(this.addr,t),ln(e,t)}}function Z0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(on(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ln(e,t)}else{if(on(e,n))return;Jh.set(n),i.uniformMatrix2fv(this.addr,!1,Jh),ln(e,n)}}function K0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(on(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ln(e,t)}else{if(on(e,n))return;Kh.set(n),i.uniformMatrix3fv(this.addr,!1,Kh),ln(e,n)}}function J0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(on(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ln(e,t)}else{if(on(e,n))return;Zh.set(n),i.uniformMatrix4fv(this.addr,!1,Zh),ln(e,n)}}function Q0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function tv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(on(e,t))return;i.uniform2iv(this.addr,t),ln(e,t)}}function ev(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(on(e,t))return;i.uniform3iv(this.addr,t),ln(e,t)}}function nv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(on(e,t))return;i.uniform4iv(this.addr,t),ln(e,t)}}function iv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function sv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(on(e,t))return;i.uniform2uiv(this.addr,t),ln(e,t)}}function rv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(on(e,t))return;i.uniform3uiv(this.addr,t),ln(e,t)}}function av(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(on(e,t))return;i.uniform4uiv(this.addr,t),ln(e,t)}}function ov(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(qh.compareFunction=Yd,r=qh):r=mu,e.setTexture2D(t||r,s)}function lv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||vu,s)}function cv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||xu,s)}function hv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||gu,s)}function dv(i){switch(i){case 5126:return X0;case 35664:return q0;case 35665:return Y0;case 35666:return j0;case 35674:return Z0;case 35675:return K0;case 35676:return J0;case 5124:case 35670:return Q0;case 35667:case 35671:return tv;case 35668:case 35672:return ev;case 35669:case 35673:return nv;case 5125:return iv;case 36294:return sv;case 36295:return rv;case 36296:return av;case 35678:case 36198:case 36298:case 36306:case 35682:return ov;case 35679:case 36299:case 36307:return lv;case 35680:case 36300:case 36308:case 36293:return cv;case 36289:case 36303:case 36311:case 36292:return hv}}function uv(i,t){i.uniform1fv(this.addr,t)}function fv(i,t){const e=Ws(t,this.size,2);i.uniform2fv(this.addr,e)}function pv(i,t){const e=Ws(t,this.size,3);i.uniform3fv(this.addr,e)}function mv(i,t){const e=Ws(t,this.size,4);i.uniform4fv(this.addr,e)}function gv(i,t){const e=Ws(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function vv(i,t){const e=Ws(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function xv(i,t){const e=Ws(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function yv(i,t){i.uniform1iv(this.addr,t)}function _v(i,t){i.uniform2iv(this.addr,t)}function Mv(i,t){i.uniform3iv(this.addr,t)}function bv(i,t){i.uniform4iv(this.addr,t)}function Sv(i,t){i.uniform1uiv(this.addr,t)}function wv(i,t){i.uniform2uiv(this.addr,t)}function Tv(i,t){i.uniform3uiv(this.addr,t)}function Ev(i,t){i.uniform4uiv(this.addr,t)}function Av(i,t,e){const n=this.cache,s=t.length,r=so(e,s);on(n,r)||(i.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||mu,r[a])}function Cv(i,t,e){const n=this.cache,s=t.length,r=so(e,s);on(n,r)||(i.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||vu,r[a])}function Rv(i,t,e){const n=this.cache,s=t.length,r=so(e,s);on(n,r)||(i.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||xu,r[a])}function Pv(i,t,e){const n=this.cache,s=t.length,r=so(e,s);on(n,r)||(i.uniform1iv(this.addr,r),ln(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||gu,r[a])}function Dv(i){switch(i){case 5126:return uv;case 35664:return fv;case 35665:return pv;case 35666:return mv;case 35674:return gv;case 35675:return vv;case 35676:return xv;case 5124:case 35670:return yv;case 35667:case 35671:return _v;case 35668:case 35672:return Mv;case 35669:case 35673:return bv;case 5125:return Sv;case 36294:return wv;case 36295:return Tv;case 36296:return Ev;case 35678:case 36198:case 36298:case 36306:case 35682:return Av;case 35679:case 36299:case 36307:return Cv;case 35680:case 36300:case 36308:case 36293:return Rv;case 36289:case 36303:case 36311:case 36292:return Pv}}class Lv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=dv(e.type)}}class Iv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Dv(e.type)}}class Uv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Jo=/(\w+)(\])?(\[|\.)?/g;function Qh(i,t){i.seq.push(t),i.map[t.id]=t}function Nv(i,t,e){const n=i.name,s=n.length;for(Jo.lastIndex=0;;){const r=Jo.exec(n),a=Jo.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Qh(e,c===void 0?new Lv(o,i,t):new Iv(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new Uv(o),Qh(e,d)),e=d}}}class Ba{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Nv(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function td(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const kv=37297;let Fv=0;function zv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const ed=new oe;function Ov(i){ye._getMatrix(ed,ye.workingColorSpace,i);const t=`mat3( ${ed.elements.map(e=>e.toFixed(4))} )`;switch(ye.getTransfer(i)){case Ga:return[t,"LinearTransferOETF"];case De:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function nd(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+zv(i.getShaderSource(t),o)}else return r}function Bv(i,t){const e=Ov(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Hv(i,t){let e;switch(t){case cf:e="Linear";break;case hf:e="Reinhard";break;case df:e="Cineon";break;case zd:e="ACESFilmic";break;case ff:e="AgX";break;case pf:e="Neutral";break;case uf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ra=new P;function Vv(){ye.getLuminanceCoefficients(Ra);const i=Ra.x.toFixed(4),t=Ra.y.toFixed(4),e=Ra.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Gv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vr).join(`
`)}function Wv(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function $v(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function vr(i){return i!==""}function id(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function sd(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Xv=/^[ \t]*#include +<([\w\d./]+)>/gm;function sc(i){return i.replace(Xv,Yv)}const qv=new Map;function Yv(i,t){let e=le[t];if(e===void 0){const n=qv.get(t);if(n!==void 0)e=le[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return sc(e)}const jv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rd(i){return i.replace(jv,Zv)}function Zv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ad(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Kv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Nd?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===kd?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===yi&&(t="SHADOWMAP_TYPE_VSM"),t}function Jv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ks:case Fs:t="ENVMAP_TYPE_CUBE";break;case Ja:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Qv(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Fs:t="ENVMAP_MODE_REFRACTION";break}return t}function t1(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Fd:t="ENVMAP_BLENDING_MULTIPLY";break;case of:t="ENVMAP_BLENDING_MIX";break;case lf:t="ENVMAP_BLENDING_ADD";break}return t}function e1(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function n1(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Kv(e),c=Jv(e),h=Qv(e),d=t1(e),u=e1(e),f=Gv(e),p=Wv(r),v=s.createProgram();let g,m,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(vr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(vr).join(`
`),m.length>0&&(m+=`
`)):(g=[ad(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vr).join(`
`),m=[ad(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Vi?"#define TONE_MAPPING":"",e.toneMapping!==Vi?le.tonemapping_pars_fragment:"",e.toneMapping!==Vi?Hv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",le.colorspace_pars_fragment,Bv("linearToOutputTexel",e.outputColorSpace),Vv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(vr).join(`
`)),a=sc(a),a=id(a,e),a=sd(a,e),o=sc(o),o=id(o,e),o=sd(o,e),a=rd(a),o=rd(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Qc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Qc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=y+g+a,_=y+m+o,A=td(s,s.VERTEX_SHADER,x),C=td(s,s.FRAGMENT_SHADER,_);s.attachShader(v,A),s.attachShader(v,C),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function E(L){if(i.debug.checkShaderErrors){const k=s.getProgramInfoLog(v)||"",V=s.getShaderInfoLog(A)||"",Z=s.getShaderInfoLog(C)||"",J=k.trim(),Y=V.trim(),z=Z.trim();let O=!0,lt=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(O=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,A,C);else{const ot=nd(s,A,"vertex"),Mt=nd(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+J+`
`+ot+`
`+Mt)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(Y===""||z==="")&&(lt=!1);lt&&(L.diagnostics={runnable:O,programLog:J,vertexShader:{log:Y,prefix:g},fragmentShader:{log:z,prefix:m}})}s.deleteShader(A),s.deleteShader(C),D=new Ba(s,v),S=$v(s,v)}let D;this.getUniforms=function(){return D===void 0&&E(this),D};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,kv)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Fv++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=C,this}let i1=0;class s1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new r1(t),e.set(t,n)),n}}class r1{constructor(t){this.id=i1++,this.code=t,this.usedTimes=0}}function a1(i,t,e,n,s,r,a){const o=new Ec,l=new s1,c=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures;let f=s.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,M,L,k,V){const Z=k.fog,J=V.geometry,Y=S.isMeshStandardMaterial?k.environment:null,z=(S.isMeshStandardMaterial?e:t).get(S.envMap||Y),O=z&&z.mapping===Ja?z.image.height:null,lt=p[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const ot=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Mt=ot!==void 0?ot.length:0;let jt=0;J.morphAttributes.position!==void 0&&(jt=1),J.morphAttributes.normal!==void 0&&(jt=2),J.morphAttributes.color!==void 0&&(jt=3);let he,_e,Ht,Q;if(lt){const ge=oi[lt];he=ge.vertexShader,_e=ge.fragmentShader}else he=S.vertexShader,_e=S.fragmentShader,l.update(S),Ht=l.getVertexShaderID(S),Q=l.getFragmentShaderID(S);const nt=i.getRenderTarget(),vt=i.state.buffers.depth.getReversed(),gt=V.isInstancedMesh===!0,At=V.isBatchedMesh===!0,se=!!S.map,be=!!S.matcap,I=!!z,Se=!!S.aoMap,te=!!S.lightMap,Zt=!!S.bumpMap,Nt=!!S.normalMap,Ie=!!S.displacementMap,Lt=!!S.emissiveMap,re=!!S.metalnessMap,He=!!S.roughnessMap,Ve=S.anisotropy>0,R=S.clearcoat>0,b=S.dispersion>0,W=S.iridescence>0,it=S.sheen>0,ct=S.transmission>0,et=Ve&&!!S.anisotropyMap,Ft=R&&!!S.clearcoatMap,xt=R&&!!S.clearcoatNormalMap,It=R&&!!S.clearcoatRoughnessMap,zt=W&&!!S.iridescenceMap,pt=W&&!!S.iridescenceThicknessMap,St=it&&!!S.sheenColorMap,$t=it&&!!S.sheenRoughnessMap,Ot=!!S.specularMap,_t=!!S.specularColorMap,ee=!!S.specularIntensityMap,F=ct&&!!S.transmissionMap,dt=ct&&!!S.thicknessMap,yt=!!S.gradientMap,Ct=!!S.alphaMap,ut=S.alphaTest>0,at=!!S.alphaHash,Pt=!!S.extensions;let ne=Vi;S.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(ne=i.toneMapping);const Pe={shaderID:lt,shaderType:S.type,shaderName:S.name,vertexShader:he,fragmentShader:_e,defines:S.defines,customVertexShaderID:Ht,customFragmentShaderID:Q,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:At,batchingColor:At&&V._colorsTexture!==null,instancing:gt,instancingColor:gt&&V.instanceColor!==null,instancingMorph:gt&&V.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:nt===null?i.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Os,alphaToCoverage:!!S.alphaToCoverage,map:se,matcap:be,envMap:I,envMapMode:I&&z.mapping,envMapCubeUVHeight:O,aoMap:Se,lightMap:te,bumpMap:Zt,normalMap:Nt,displacementMap:u&&Ie,emissiveMap:Lt,normalMapObjectSpace:Nt&&S.normalMapType===yf,normalMapTangentSpace:Nt&&S.normalMapType===qd,metalnessMap:re,roughnessMap:He,anisotropy:Ve,anisotropyMap:et,clearcoat:R,clearcoatMap:Ft,clearcoatNormalMap:xt,clearcoatRoughnessMap:It,dispersion:b,iridescence:W,iridescenceMap:zt,iridescenceThicknessMap:pt,sheen:it,sheenColorMap:St,sheenRoughnessMap:$t,specularMap:Ot,specularColorMap:_t,specularIntensityMap:ee,transmission:ct,transmissionMap:F,thicknessMap:dt,gradientMap:yt,opaque:S.transparent===!1&&S.blending===Is&&S.alphaToCoverage===!1,alphaMap:Ct,alphaTest:ut,alphaHash:at,combine:S.combine,mapUv:se&&v(S.map.channel),aoMapUv:Se&&v(S.aoMap.channel),lightMapUv:te&&v(S.lightMap.channel),bumpMapUv:Zt&&v(S.bumpMap.channel),normalMapUv:Nt&&v(S.normalMap.channel),displacementMapUv:Ie&&v(S.displacementMap.channel),emissiveMapUv:Lt&&v(S.emissiveMap.channel),metalnessMapUv:re&&v(S.metalnessMap.channel),roughnessMapUv:He&&v(S.roughnessMap.channel),anisotropyMapUv:et&&v(S.anisotropyMap.channel),clearcoatMapUv:Ft&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:xt&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:It&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:zt&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:pt&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:St&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:$t&&v(S.sheenRoughnessMap.channel),specularMapUv:Ot&&v(S.specularMap.channel),specularColorMapUv:_t&&v(S.specularColorMap.channel),specularIntensityMapUv:ee&&v(S.specularIntensityMap.channel),transmissionMapUv:F&&v(S.transmissionMap.channel),thicknessMapUv:dt&&v(S.thicknessMap.channel),alphaMapUv:Ct&&v(S.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(Nt||Ve),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!J.attributes.uv&&(se||Ct),fog:!!Z,useFog:S.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:vt,skinning:V.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:Mt,morphTextureStride:jt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:ne,decodeVideoTexture:se&&S.map.isVideoTexture===!0&&ye.getTransfer(S.map.colorSpace)===De,decodeVideoTextureEmissive:Lt&&S.emissiveMap.isVideoTexture===!0&&ye.getTransfer(S.emissiveMap.colorSpace)===De,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Xe,flipSided:S.side===xn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Pt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pt&&S.extensions.multiDraw===!0||At)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function m(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const L in S.defines)M.push(L),M.push(S.defines[L]);return S.isRawShaderMaterial===!1&&(y(M,S),x(M,S),M.push(i.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function y(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function x(S,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),S.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),S.push(o.mask)}function _(S){const M=p[S.type];let L;if(M){const k=oi[M];L=Xa.clone(k.uniforms)}else L=S.uniforms;return L}function A(S,M){let L;for(let k=0,V=h.length;k<V;k++){const Z=h[k];if(Z.cacheKey===M){L=Z,++L.usedTimes;break}}return L===void 0&&(L=new n1(i,M,S,r),h.push(L)),L}function C(S){if(--S.usedTimes===0){const M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function E(S){l.remove(S)}function D(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:_,acquireProgram:A,releaseProgram:C,releaseShaderCache:E,programs:h,dispose:D}}function o1(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function l1(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function od(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function ld(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d,u,f,p,v,g){let m=i[t];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:p,renderOrder:d.renderOrder,z:v,group:g},i[t]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=p,m.renderOrder=d.renderOrder,m.z=v,m.group=g),t++,m}function o(d,u,f,p,v,g){const m=a(d,u,f,p,v,g);f.transmission>0?n.push(m):f.transparent===!0?s.push(m):e.push(m)}function l(d,u,f,p,v,g){const m=a(d,u,f,p,v,g);f.transmission>0?n.unshift(m):f.transparent===!0?s.unshift(m):e.unshift(m)}function c(d,u){e.length>1&&e.sort(d||l1),n.length>1&&n.sort(u||od),s.length>1&&s.sort(u||od)}function h(){for(let d=t,u=i.length;d<u;d++){const f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function c1(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new ld,i.set(n,[a])):s>=r.length?(a=new ld,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function h1(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new Jt};break;case"SpotLight":e={position:new P,direction:new P,color:new Jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new Jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new Jt,groundColor:new Jt};break;case"RectAreaLight":e={color:new Jt,position:new P,halfWidth:new P,halfHeight:new P};break}return i[t.id]=e,e}}}function d1(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let u1=0;function f1(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function p1(i){const t=new h1,e=d1(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);const s=new P,r=new ie,a=new ie;function o(c){let h=0,d=0,u=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,p=0,v=0,g=0,m=0,y=0,x=0,_=0,A=0,C=0,E=0;c.sort(f1);for(let S=0,M=c.length;S<M;S++){const L=c[S],k=L.color,V=L.intensity,Z=L.distance,J=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=k.r*V,d+=k.g*V,u+=k.b*V;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(L.sh.coefficients[Y],V);E++}else if(L.isDirectionalLight){const Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const z=L.shadow,O=e.get(L);O.shadowIntensity=z.intensity,O.shadowBias=z.bias,O.shadowNormalBias=z.normalBias,O.shadowRadius=z.radius,O.shadowMapSize=z.mapSize,n.directionalShadow[f]=O,n.directionalShadowMap[f]=J,n.directionalShadowMatrix[f]=L.shadow.matrix,y++}n.directional[f]=Y,f++}else if(L.isSpotLight){const Y=t.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(k).multiplyScalar(V),Y.distance=Z,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,n.spot[v]=Y;const z=L.shadow;if(L.map&&(n.spotLightMap[A]=L.map,A++,z.updateMatrices(L),L.castShadow&&C++),n.spotLightMatrix[v]=z.matrix,L.castShadow){const O=e.get(L);O.shadowIntensity=z.intensity,O.shadowBias=z.bias,O.shadowNormalBias=z.normalBias,O.shadowRadius=z.radius,O.shadowMapSize=z.mapSize,n.spotShadow[v]=O,n.spotShadowMap[v]=J,_++}v++}else if(L.isRectAreaLight){const Y=t.get(L);Y.color.copy(k).multiplyScalar(V),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),n.rectArea[g]=Y,g++}else if(L.isPointLight){const Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){const z=L.shadow,O=e.get(L);O.shadowIntensity=z.intensity,O.shadowBias=z.bias,O.shadowNormalBias=z.normalBias,O.shadowRadius=z.radius,O.shadowMapSize=z.mapSize,O.shadowCameraNear=z.camera.near,O.shadowCameraFar=z.camera.far,n.pointShadow[p]=O,n.pointShadowMap[p]=J,n.pointShadowMatrix[p]=L.shadow.matrix,x++}n.point[p]=Y,p++}else if(L.isHemisphereLight){const Y=t.get(L);Y.skyColor.copy(L.color).multiplyScalar(V),Y.groundColor.copy(L.groundColor).multiplyScalar(V),n.hemi[m]=Y,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=bt.LTC_FLOAT_1,n.rectAreaLTC2=bt.LTC_FLOAT_2):(n.rectAreaLTC1=bt.LTC_HALF_1,n.rectAreaLTC2=bt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const D=n.hash;(D.directionalLength!==f||D.pointLength!==p||D.spotLength!==v||D.rectAreaLength!==g||D.hemiLength!==m||D.numDirectionalShadows!==y||D.numPointShadows!==x||D.numSpotShadows!==_||D.numSpotMaps!==A||D.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=_+A-C,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=E,D.directionalLength=f,D.pointLength=p,D.spotLength=v,D.rectAreaLength=g,D.hemiLength=m,D.numDirectionalShadows=y,D.numPointShadows=x,D.numSpotShadows=_,D.numSpotMaps=A,D.numLightProbes=E,n.version=u1++)}function l(c,h){let d=0,u=0,f=0,p=0,v=0;const g=h.matrixWorldInverse;for(let m=0,y=c.length;m<y;m++){const x=c[m];if(x.isDirectionalLight){const _=n.directional[d];_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),d++}else if(x.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),f++}else if(x.isRectAreaLight){const _=n.rectArea[p];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(g),a.identity(),r.copy(x.matrixWorld),r.premultiply(g),a.extractRotation(r),_.halfWidth.set(x.width*.5,0,0),_.halfHeight.set(0,x.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),p++}else if(x.isPointLight){const _=n.point[u];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(g),u++}else if(x.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function cd(i){const t=new p1(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function m1(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new cd(i),t.set(s,[o])):r>=a.length?(o=new cd(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const g1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,v1=`uniform sampler2D shadow_pass;
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
}`;function x1(i,t,e){let n=new Rc;const s=new kt,r=new kt,a=new xe,o=new Hp({depthPacking:xf}),l=new Vp,c={},h=e.maxTextureSize,d={[Ti]:xn,[xn]:Ti,[Xe]:Xe},u=new Hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new kt},radius:{value:4}},vertexShader:g1,fragmentShader:v1}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const p=new Le;p.setAttribute("position",new nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Me(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nd;let m=this.type;this.render=function(C,E,D){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||C.length===0)return;const S=i.getRenderTarget(),M=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),k=i.state;k.setBlending(Hi),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const V=m!==yi&&this.type===yi,Z=m===yi&&this.type!==yi;for(let J=0,Y=C.length;J<Y;J++){const z=C[J],O=z.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const lt=O.getFrameExtents();if(s.multiply(lt),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/lt.x),s.x=r.x*lt.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/lt.y),s.y=r.y*lt.y,O.mapSize.y=r.y)),O.map===null||V===!0||Z===!0){const Mt=this.type!==yi?{minFilter:Un,magFilter:Un}:{};O.map!==null&&O.map.dispose(),O.map=new di(s.x,s.y,Mt),O.map.texture.name=z.name+".shadowMap",O.camera.updateProjectionMatrix()}i.setRenderTarget(O.map),i.clear();const ot=O.getViewportCount();for(let Mt=0;Mt<ot;Mt++){const jt=O.getViewport(Mt);a.set(r.x*jt.x,r.y*jt.y,r.x*jt.z,r.y*jt.w),k.viewport(a),O.updateMatrices(z,Mt),n=O.getFrustum(),_(E,D,O.camera,z,this.type)}O.isPointLightShadow!==!0&&this.type===yi&&y(O,D),O.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(S,M,L)};function y(C,E){const D=t.update(v);u.defines.VSM_SAMPLES!==C.blurSamples&&(u.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new di(s.x,s.y)),u.uniforms.shadow_pass.value=C.map.texture,u.uniforms.resolution.value=C.mapSize,u.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(E,null,D,u,v,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(E,null,D,f,v,null)}function x(C,E,D,S){let M=null;const L=D.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(L!==void 0)M=L;else if(M=D.isPointLight===!0?l:o,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const k=M.uuid,V=E.uuid;let Z=c[k];Z===void 0&&(Z={},c[k]=Z);let J=Z[V];J===void 0&&(J=M.clone(),Z[V]=J,E.addEventListener("dispose",A)),M=J}if(M.visible=E.visible,M.wireframe=E.wireframe,S===yi?M.side=E.shadowSide!==null?E.shadowSide:E.side:M.side=E.shadowSide!==null?E.shadowSide:d[E.side],M.alphaMap=E.alphaMap,M.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,M.map=E.map,M.clipShadows=E.clipShadows,M.clippingPlanes=E.clippingPlanes,M.clipIntersection=E.clipIntersection,M.displacementMap=E.displacementMap,M.displacementScale=E.displacementScale,M.displacementBias=E.displacementBias,M.wireframeLinewidth=E.wireframeLinewidth,M.linewidth=E.linewidth,D.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const k=i.properties.get(M);k.light=D}return M}function _(C,E,D,S,M){if(C.visible===!1)return;if(C.layers.test(E.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===yi)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,C.matrixWorld);const V=t.update(C),Z=C.material;if(Array.isArray(Z)){const J=V.groups;for(let Y=0,z=J.length;Y<z;Y++){const O=J[Y],lt=Z[O.materialIndex];if(lt&&lt.visible){const ot=x(C,lt,S,M);C.onBeforeShadow(i,C,E,D,V,ot,O),i.renderBufferDirect(D,null,V,ot,C,O),C.onAfterShadow(i,C,E,D,V,ot,O)}}}else if(Z.visible){const J=x(C,Z,S,M);C.onBeforeShadow(i,C,E,D,V,J,null),i.renderBufferDirect(D,null,V,J,C,null),C.onAfterShadow(i,C,E,D,V,J,null)}}const k=C.children;for(let V=0,Z=k.length;V<Z;V++)_(k[V],E,D,S,M)}function A(C){C.target.removeEventListener("dispose",A);for(const D in c){const S=c[D],M=C.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const y1={[gl]:vl,[xl]:Ml,[yl]:bl,[Ns]:_l,[vl]:gl,[Ml]:xl,[bl]:yl,[_l]:Ns};function _1(i,t){function e(){let F=!1;const dt=new xe;let yt=null;const Ct=new xe(0,0,0,0);return{setMask:function(ut){yt!==ut&&!F&&(i.colorMask(ut,ut,ut,ut),yt=ut)},setLocked:function(ut){F=ut},setClear:function(ut,at,Pt,ne,Pe){Pe===!0&&(ut*=ne,at*=ne,Pt*=ne),dt.set(ut,at,Pt,ne),Ct.equals(dt)===!1&&(i.clearColor(ut,at,Pt,ne),Ct.copy(dt))},reset:function(){F=!1,yt=null,Ct.set(-1,0,0,0)}}}function n(){let F=!1,dt=!1,yt=null,Ct=null,ut=null;return{setReversed:function(at){if(dt!==at){const Pt=t.get("EXT_clip_control");at?Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.ZERO_TO_ONE_EXT):Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.NEGATIVE_ONE_TO_ONE_EXT),dt=at;const ne=ut;ut=null,this.setClear(ne)}},getReversed:function(){return dt},setTest:function(at){at?nt(i.DEPTH_TEST):vt(i.DEPTH_TEST)},setMask:function(at){yt!==at&&!F&&(i.depthMask(at),yt=at)},setFunc:function(at){if(dt&&(at=y1[at]),Ct!==at){switch(at){case gl:i.depthFunc(i.NEVER);break;case vl:i.depthFunc(i.ALWAYS);break;case xl:i.depthFunc(i.LESS);break;case Ns:i.depthFunc(i.LEQUAL);break;case yl:i.depthFunc(i.EQUAL);break;case _l:i.depthFunc(i.GEQUAL);break;case Ml:i.depthFunc(i.GREATER);break;case bl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ct=at}},setLocked:function(at){F=at},setClear:function(at){ut!==at&&(dt&&(at=1-at),i.clearDepth(at),ut=at)},reset:function(){F=!1,yt=null,Ct=null,ut=null,dt=!1}}}function s(){let F=!1,dt=null,yt=null,Ct=null,ut=null,at=null,Pt=null,ne=null,Pe=null;return{setTest:function(ge){F||(ge?nt(i.STENCIL_TEST):vt(i.STENCIL_TEST))},setMask:function(ge){dt!==ge&&!F&&(i.stencilMask(ge),dt=ge)},setFunc:function(ge,hn,dn){(yt!==ge||Ct!==hn||ut!==dn)&&(i.stencilFunc(ge,hn,dn),yt=ge,Ct=hn,ut=dn)},setOp:function(ge,hn,dn){(at!==ge||Pt!==hn||ne!==dn)&&(i.stencilOp(ge,hn,dn),at=ge,Pt=hn,ne=dn)},setLocked:function(ge){F=ge},setClear:function(ge){Pe!==ge&&(i.clearStencil(ge),Pe=ge)},reset:function(){F=!1,dt=null,yt=null,Ct=null,ut=null,at=null,Pt=null,ne=null,Pe=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,f=[],p=null,v=!1,g=null,m=null,y=null,x=null,_=null,A=null,C=null,E=new Jt(0,0,0),D=0,S=!1,M=null,L=null,k=null,V=null,Z=null;const J=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,z=0;const O=i.getParameter(i.VERSION);O.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(O)[1]),Y=z>=1):O.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),Y=z>=2);let lt=null,ot={};const Mt=i.getParameter(i.SCISSOR_BOX),jt=i.getParameter(i.VIEWPORT),he=new xe().fromArray(Mt),_e=new xe().fromArray(jt);function Ht(F,dt,yt,Ct){const ut=new Uint8Array(4),at=i.createTexture();i.bindTexture(F,at),i.texParameteri(F,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(F,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Pt=0;Pt<yt;Pt++)F===i.TEXTURE_3D||F===i.TEXTURE_2D_ARRAY?i.texImage3D(dt,0,i.RGBA,1,1,Ct,0,i.RGBA,i.UNSIGNED_BYTE,ut):i.texImage2D(dt+Pt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ut);return at}const Q={};Q[i.TEXTURE_2D]=Ht(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=Ht(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=Ht(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=Ht(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),nt(i.DEPTH_TEST),a.setFunc(Ns),Zt(!1),Nt(qc),nt(i.CULL_FACE),Se(Hi);function nt(F){h[F]!==!0&&(i.enable(F),h[F]=!0)}function vt(F){h[F]!==!1&&(i.disable(F),h[F]=!1)}function gt(F,dt){return d[F]!==dt?(i.bindFramebuffer(F,dt),d[F]=dt,F===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=dt),F===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=dt),!0):!1}function At(F,dt){let yt=f,Ct=!1;if(F){yt=u.get(dt),yt===void 0&&(yt=[],u.set(dt,yt));const ut=F.textures;if(yt.length!==ut.length||yt[0]!==i.COLOR_ATTACHMENT0){for(let at=0,Pt=ut.length;at<Pt;at++)yt[at]=i.COLOR_ATTACHMENT0+at;yt.length=ut.length,Ct=!0}}else yt[0]!==i.BACK&&(yt[0]=i.BACK,Ct=!0);Ct&&i.drawBuffers(yt)}function se(F){return p!==F?(i.useProgram(F),p=F,!0):!1}const be={[ts]:i.FUNC_ADD,[Gu]:i.FUNC_SUBTRACT,[Wu]:i.FUNC_REVERSE_SUBTRACT};be[$u]=i.MIN,be[Xu]=i.MAX;const I={[qu]:i.ZERO,[Yu]:i.ONE,[ju]:i.SRC_COLOR,[pl]:i.SRC_ALPHA,[ef]:i.SRC_ALPHA_SATURATE,[Qu]:i.DST_COLOR,[Ku]:i.DST_ALPHA,[Zu]:i.ONE_MINUS_SRC_COLOR,[ml]:i.ONE_MINUS_SRC_ALPHA,[tf]:i.ONE_MINUS_DST_COLOR,[Ju]:i.ONE_MINUS_DST_ALPHA,[nf]:i.CONSTANT_COLOR,[sf]:i.ONE_MINUS_CONSTANT_COLOR,[rf]:i.CONSTANT_ALPHA,[af]:i.ONE_MINUS_CONSTANT_ALPHA};function Se(F,dt,yt,Ct,ut,at,Pt,ne,Pe,ge){if(F===Hi){v===!0&&(vt(i.BLEND),v=!1);return}if(v===!1&&(nt(i.BLEND),v=!0),F!==Vu){if(F!==g||ge!==S){if((m!==ts||_!==ts)&&(i.blendEquation(i.FUNC_ADD),m=ts,_=ts),ge)switch(F){case Is:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Yc:i.blendFunc(i.ONE,i.ONE);break;case jc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Zc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case Is:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Yc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case jc:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Zc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}y=null,x=null,A=null,C=null,E.set(0,0,0),D=0,g=F,S=ge}return}ut=ut||dt,at=at||yt,Pt=Pt||Ct,(dt!==m||ut!==_)&&(i.blendEquationSeparate(be[dt],be[ut]),m=dt,_=ut),(yt!==y||Ct!==x||at!==A||Pt!==C)&&(i.blendFuncSeparate(I[yt],I[Ct],I[at],I[Pt]),y=yt,x=Ct,A=at,C=Pt),(ne.equals(E)===!1||Pe!==D)&&(i.blendColor(ne.r,ne.g,ne.b,Pe),E.copy(ne),D=Pe),g=F,S=!1}function te(F,dt){F.side===Xe?vt(i.CULL_FACE):nt(i.CULL_FACE);let yt=F.side===xn;dt&&(yt=!yt),Zt(yt),F.blending===Is&&F.transparent===!1?Se(Hi):Se(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),a.setFunc(F.depthFunc),a.setTest(F.depthTest),a.setMask(F.depthWrite),r.setMask(F.colorWrite);const Ct=F.stencilWrite;o.setTest(Ct),Ct&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Lt(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?nt(i.SAMPLE_ALPHA_TO_COVERAGE):vt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Zt(F){M!==F&&(F?i.frontFace(i.CW):i.frontFace(i.CCW),M=F)}function Nt(F){F!==Bu?(nt(i.CULL_FACE),F!==L&&(F===qc?i.cullFace(i.BACK):F===Hu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):vt(i.CULL_FACE),L=F}function Ie(F){F!==k&&(Y&&i.lineWidth(F),k=F)}function Lt(F,dt,yt){F?(nt(i.POLYGON_OFFSET_FILL),(V!==dt||Z!==yt)&&(i.polygonOffset(dt,yt),V=dt,Z=yt)):vt(i.POLYGON_OFFSET_FILL)}function re(F){F?nt(i.SCISSOR_TEST):vt(i.SCISSOR_TEST)}function He(F){F===void 0&&(F=i.TEXTURE0+J-1),lt!==F&&(i.activeTexture(F),lt=F)}function Ve(F,dt,yt){yt===void 0&&(lt===null?yt=i.TEXTURE0+J-1:yt=lt);let Ct=ot[yt];Ct===void 0&&(Ct={type:void 0,texture:void 0},ot[yt]=Ct),(Ct.type!==F||Ct.texture!==dt)&&(lt!==yt&&(i.activeTexture(yt),lt=yt),i.bindTexture(F,dt||Q[F]),Ct.type=F,Ct.texture=dt)}function R(){const F=ot[lt];F!==void 0&&F.type!==void 0&&(i.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function b(){try{i.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function W(){try{i.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function it(){try{i.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ct(){try{i.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function et(){try{i.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Ft(){try{i.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function xt(){try{i.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function It(){try{i.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function zt(){try{i.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function pt(){try{i.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function St(F){he.equals(F)===!1&&(i.scissor(F.x,F.y,F.z,F.w),he.copy(F))}function $t(F){_e.equals(F)===!1&&(i.viewport(F.x,F.y,F.z,F.w),_e.copy(F))}function Ot(F,dt){let yt=c.get(dt);yt===void 0&&(yt=new WeakMap,c.set(dt,yt));let Ct=yt.get(F);Ct===void 0&&(Ct=i.getUniformBlockIndex(dt,F.name),yt.set(F,Ct))}function _t(F,dt){const Ct=c.get(dt).get(F);l.get(dt)!==Ct&&(i.uniformBlockBinding(dt,Ct,F.__bindingPointIndex),l.set(dt,Ct))}function ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},lt=null,ot={},d={},u=new WeakMap,f=[],p=null,v=!1,g=null,m=null,y=null,x=null,_=null,A=null,C=null,E=new Jt(0,0,0),D=0,S=!1,M=null,L=null,k=null,V=null,Z=null,he.set(0,0,i.canvas.width,i.canvas.height),_e.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:nt,disable:vt,bindFramebuffer:gt,drawBuffers:At,useProgram:se,setBlending:Se,setMaterial:te,setFlipSided:Zt,setCullFace:Nt,setLineWidth:Ie,setPolygonOffset:Lt,setScissorTest:re,activeTexture:He,bindTexture:Ve,unbindTexture:R,compressedTexImage2D:b,compressedTexImage3D:W,texImage2D:zt,texImage3D:pt,updateUBOMapping:Ot,uniformBlockBinding:_t,texStorage2D:xt,texStorage3D:It,texSubImage2D:it,texSubImage3D:ct,compressedTexSubImage2D:et,compressedTexSubImage3D:Ft,scissor:St,viewport:$t,reset:ee}}function M1(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new kt,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(R,b){return f?new OffscreenCanvas(R,b):$a("canvas")}function v(R,b,W){let it=1;const ct=Ve(R);if((ct.width>W||ct.height>W)&&(it=W/Math.max(ct.width,ct.height)),it<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const et=Math.floor(it*ct.width),Ft=Math.floor(it*ct.height);d===void 0&&(d=p(et,Ft));const xt=b?p(et,Ft):d;return xt.width=et,xt.height=Ft,xt.getContext("2d").drawImage(R,0,0,et,Ft),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ct.width+"x"+ct.height+") to ("+et+"x"+Ft+")."),xt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ct.width+"x"+ct.height+")."),R;return R}function g(R){return R.generateMipmaps}function m(R){i.generateMipmap(R)}function y(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(R,b,W,it,ct=!1){if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let et=b;if(b===i.RED&&(W===i.FLOAT&&(et=i.R32F),W===i.HALF_FLOAT&&(et=i.R16F),W===i.UNSIGNED_BYTE&&(et=i.R8)),b===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(et=i.R8UI),W===i.UNSIGNED_SHORT&&(et=i.R16UI),W===i.UNSIGNED_INT&&(et=i.R32UI),W===i.BYTE&&(et=i.R8I),W===i.SHORT&&(et=i.R16I),W===i.INT&&(et=i.R32I)),b===i.RG&&(W===i.FLOAT&&(et=i.RG32F),W===i.HALF_FLOAT&&(et=i.RG16F),W===i.UNSIGNED_BYTE&&(et=i.RG8)),b===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(et=i.RG8UI),W===i.UNSIGNED_SHORT&&(et=i.RG16UI),W===i.UNSIGNED_INT&&(et=i.RG32UI),W===i.BYTE&&(et=i.RG8I),W===i.SHORT&&(et=i.RG16I),W===i.INT&&(et=i.RG32I)),b===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(et=i.RGB8UI),W===i.UNSIGNED_SHORT&&(et=i.RGB16UI),W===i.UNSIGNED_INT&&(et=i.RGB32UI),W===i.BYTE&&(et=i.RGB8I),W===i.SHORT&&(et=i.RGB16I),W===i.INT&&(et=i.RGB32I)),b===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(et=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(et=i.RGBA16UI),W===i.UNSIGNED_INT&&(et=i.RGBA32UI),W===i.BYTE&&(et=i.RGBA8I),W===i.SHORT&&(et=i.RGBA16I),W===i.INT&&(et=i.RGBA32I)),b===i.RGB&&(W===i.UNSIGNED_INT_5_9_9_9_REV&&(et=i.RGB9_E5),W===i.UNSIGNED_INT_10F_11F_11F_REV&&(et=i.R11F_G11F_B10F)),b===i.RGBA){const Ft=ct?Ga:ye.getTransfer(it);W===i.FLOAT&&(et=i.RGBA32F),W===i.HALF_FLOAT&&(et=i.RGBA16F),W===i.UNSIGNED_BYTE&&(et=Ft===De?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT_4_4_4_4&&(et=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(et=i.RGB5_A1)}return(et===i.R16F||et===i.R32F||et===i.RG16F||et===i.RG32F||et===i.RGBA16F||et===i.RGBA32F)&&t.get("EXT_color_buffer_float"),et}function _(R,b){let W;return R?b===null||b===rs||b===Dr?W=i.DEPTH24_STENCIL8:b===Yn?W=i.DEPTH32F_STENCIL8:b===Pr&&(W=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===rs||b===Dr?W=i.DEPTH_COMPONENT24:b===Yn?W=i.DEPTH_COMPONENT32F:b===Pr&&(W=i.DEPTH_COMPONENT16),W}function A(R,b){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==Un&&R.minFilter!==qn?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function C(R){const b=R.target;b.removeEventListener("dispose",C),D(b),b.isVideoTexture&&h.delete(b)}function E(R){const b=R.target;b.removeEventListener("dispose",E),M(b)}function D(R){const b=n.get(R);if(b.__webglInit===void 0)return;const W=R.source,it=u.get(W);if(it){const ct=it[b.__cacheKey];ct.usedTimes--,ct.usedTimes===0&&S(R),Object.keys(it).length===0&&u.delete(W)}n.remove(R)}function S(R){const b=n.get(R);i.deleteTexture(b.__webglTexture);const W=R.source,it=u.get(W);delete it[b.__cacheKey],a.memory.textures--}function M(R){const b=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let it=0;it<6;it++){if(Array.isArray(b.__webglFramebuffer[it]))for(let ct=0;ct<b.__webglFramebuffer[it].length;ct++)i.deleteFramebuffer(b.__webglFramebuffer[it][ct]);else i.deleteFramebuffer(b.__webglFramebuffer[it]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[it])}else{if(Array.isArray(b.__webglFramebuffer))for(let it=0;it<b.__webglFramebuffer.length;it++)i.deleteFramebuffer(b.__webglFramebuffer[it]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let it=0;it<b.__webglColorRenderbuffer.length;it++)b.__webglColorRenderbuffer[it]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[it]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const W=R.textures;for(let it=0,ct=W.length;it<ct;it++){const et=n.get(W[it]);et.__webglTexture&&(i.deleteTexture(et.__webglTexture),a.memory.textures--),n.remove(W[it])}n.remove(R)}let L=0;function k(){L=0}function V(){const R=L;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),L+=1,R}function Z(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function J(R,b){const W=n.get(R);if(R.isVideoTexture&&re(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&W.__version!==R.version){const it=R.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(W,R,b);return}}else R.isExternalTexture&&(W.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+b)}function Y(R,b){const W=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&W.__version!==R.version){Q(W,R,b);return}e.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+b)}function z(R,b){const W=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&W.__version!==R.version){Q(W,R,b);return}e.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+b)}function O(R,b){const W=n.get(R);if(R.version>0&&W.__version!==R.version){nt(W,R,b);return}e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+b)}const lt={[zs]:i.REPEAT,[Oi]:i.CLAMP_TO_EDGE,[Tl]:i.MIRRORED_REPEAT},ot={[Un]:i.NEAREST,[gf]:i.NEAREST_MIPMAP_NEAREST,[Kr]:i.NEAREST_MIPMAP_LINEAR,[qn]:i.LINEAR,[fo]:i.LINEAR_MIPMAP_NEAREST,[Bi]:i.LINEAR_MIPMAP_LINEAR},Mt={[_f]:i.NEVER,[Ef]:i.ALWAYS,[Mf]:i.LESS,[Yd]:i.LEQUAL,[bf]:i.EQUAL,[Tf]:i.GEQUAL,[Sf]:i.GREATER,[wf]:i.NOTEQUAL};function jt(R,b){if(b.type===Yn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===qn||b.magFilter===fo||b.magFilter===Kr||b.magFilter===Bi||b.minFilter===qn||b.minFilter===fo||b.minFilter===Kr||b.minFilter===Bi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,lt[b.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,lt[b.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,lt[b.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,ot[b.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,ot[b.minFilter]),b.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Mt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Un||b.minFilter!==Kr&&b.minFilter!==Bi||b.type===Yn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const W=t.get("EXT_texture_filter_anisotropic");i.texParameterf(R,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function he(R,b){let W=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",C));const it=b.source;let ct=u.get(it);ct===void 0&&(ct={},u.set(it,ct));const et=Z(b);if(et!==R.__cacheKey){ct[et]===void 0&&(ct[et]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,W=!0),ct[et].usedTimes++;const Ft=ct[R.__cacheKey];Ft!==void 0&&(ct[R.__cacheKey].usedTimes--,Ft.usedTimes===0&&S(b)),R.__cacheKey=et,R.__webglTexture=ct[et].texture}return W}function _e(R,b,W){return Math.floor(Math.floor(R/W)/b)}function Ht(R,b,W,it){const et=R.updateRanges;if(et.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,W,it,b.data);else{et.sort((pt,St)=>pt.start-St.start);let Ft=0;for(let pt=1;pt<et.length;pt++){const St=et[Ft],$t=et[pt],Ot=St.start+St.count,_t=_e($t.start,b.width,4),ee=_e(St.start,b.width,4);$t.start<=Ot+1&&_t===ee&&_e($t.start+$t.count-1,b.width,4)===_t?St.count=Math.max(St.count,$t.start+$t.count-St.start):(++Ft,et[Ft]=$t)}et.length=Ft+1;const xt=i.getParameter(i.UNPACK_ROW_LENGTH),It=i.getParameter(i.UNPACK_SKIP_PIXELS),zt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let pt=0,St=et.length;pt<St;pt++){const $t=et[pt],Ot=Math.floor($t.start/4),_t=Math.ceil($t.count/4),ee=Ot%b.width,F=Math.floor(Ot/b.width),dt=_t,yt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,ee),i.pixelStorei(i.UNPACK_SKIP_ROWS,F),e.texSubImage2D(i.TEXTURE_2D,0,ee,F,dt,yt,W,it,b.data)}R.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,xt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,It),i.pixelStorei(i.UNPACK_SKIP_ROWS,zt)}}function Q(R,b,W){let it=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(it=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(it=i.TEXTURE_3D);const ct=he(R,b),et=b.source;e.bindTexture(it,R.__webglTexture,i.TEXTURE0+W);const Ft=n.get(et);if(et.version!==Ft.__version||ct===!0){e.activeTexture(i.TEXTURE0+W);const xt=ye.getPrimaries(ye.workingColorSpace),It=b.colorSpace===Mi?null:ye.getPrimaries(b.colorSpace),zt=b.colorSpace===Mi||xt===It?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);let pt=v(b.image,!1,s.maxTextureSize);pt=He(b,pt);const St=r.convert(b.format,b.colorSpace),$t=r.convert(b.type);let Ot=x(b.internalFormat,St,$t,b.colorSpace,b.isVideoTexture);jt(it,b);let _t;const ee=b.mipmaps,F=b.isVideoTexture!==!0,dt=Ft.__version===void 0||ct===!0,yt=et.dataReady,Ct=A(b,pt);if(b.isDepthTexture)Ot=_(b.format===Ir,b.type),dt&&(F?e.texStorage2D(i.TEXTURE_2D,1,Ot,pt.width,pt.height):e.texImage2D(i.TEXTURE_2D,0,Ot,pt.width,pt.height,0,St,$t,null));else if(b.isDataTexture)if(ee.length>0){F&&dt&&e.texStorage2D(i.TEXTURE_2D,Ct,Ot,ee[0].width,ee[0].height);for(let ut=0,at=ee.length;ut<at;ut++)_t=ee[ut],F?yt&&e.texSubImage2D(i.TEXTURE_2D,ut,0,0,_t.width,_t.height,St,$t,_t.data):e.texImage2D(i.TEXTURE_2D,ut,Ot,_t.width,_t.height,0,St,$t,_t.data);b.generateMipmaps=!1}else F?(dt&&e.texStorage2D(i.TEXTURE_2D,Ct,Ot,pt.width,pt.height),yt&&Ht(b,pt,St,$t)):e.texImage2D(i.TEXTURE_2D,0,Ot,pt.width,pt.height,0,St,$t,pt.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){F&&dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ct,Ot,ee[0].width,ee[0].height,pt.depth);for(let ut=0,at=ee.length;ut<at;ut++)if(_t=ee[ut],b.format!==In)if(St!==null)if(F){if(yt)if(b.layerUpdates.size>0){const Pt=Bh(_t.width,_t.height,b.format,b.type);for(const ne of b.layerUpdates){const Pe=_t.data.subarray(ne*Pt/_t.data.BYTES_PER_ELEMENT,(ne+1)*Pt/_t.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ut,0,0,ne,_t.width,_t.height,1,St,Pe)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ut,0,0,0,_t.width,_t.height,pt.depth,St,_t.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ut,Ot,_t.width,_t.height,pt.depth,0,_t.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?yt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ut,0,0,0,_t.width,_t.height,pt.depth,St,$t,_t.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ut,Ot,_t.width,_t.height,pt.depth,0,St,$t,_t.data)}else{F&&dt&&e.texStorage2D(i.TEXTURE_2D,Ct,Ot,ee[0].width,ee[0].height);for(let ut=0,at=ee.length;ut<at;ut++)_t=ee[ut],b.format!==In?St!==null?F?yt&&e.compressedTexSubImage2D(i.TEXTURE_2D,ut,0,0,_t.width,_t.height,St,_t.data):e.compressedTexImage2D(i.TEXTURE_2D,ut,Ot,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?yt&&e.texSubImage2D(i.TEXTURE_2D,ut,0,0,_t.width,_t.height,St,$t,_t.data):e.texImage2D(i.TEXTURE_2D,ut,Ot,_t.width,_t.height,0,St,$t,_t.data)}else if(b.isDataArrayTexture)if(F){if(dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ct,Ot,pt.width,pt.height,pt.depth),yt)if(b.layerUpdates.size>0){const ut=Bh(pt.width,pt.height,b.format,b.type);for(const at of b.layerUpdates){const Pt=pt.data.subarray(at*ut/pt.data.BYTES_PER_ELEMENT,(at+1)*ut/pt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,at,pt.width,pt.height,1,St,$t,Pt)}b.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,pt.width,pt.height,pt.depth,St,$t,pt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ot,pt.width,pt.height,pt.depth,0,St,$t,pt.data);else if(b.isData3DTexture)F?(dt&&e.texStorage3D(i.TEXTURE_3D,Ct,Ot,pt.width,pt.height,pt.depth),yt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,pt.width,pt.height,pt.depth,St,$t,pt.data)):e.texImage3D(i.TEXTURE_3D,0,Ot,pt.width,pt.height,pt.depth,0,St,$t,pt.data);else if(b.isFramebufferTexture){if(dt)if(F)e.texStorage2D(i.TEXTURE_2D,Ct,Ot,pt.width,pt.height);else{let ut=pt.width,at=pt.height;for(let Pt=0;Pt<Ct;Pt++)e.texImage2D(i.TEXTURE_2D,Pt,Ot,ut,at,0,St,$t,null),ut>>=1,at>>=1}}else if(ee.length>0){if(F&&dt){const ut=Ve(ee[0]);e.texStorage2D(i.TEXTURE_2D,Ct,Ot,ut.width,ut.height)}for(let ut=0,at=ee.length;ut<at;ut++)_t=ee[ut],F?yt&&e.texSubImage2D(i.TEXTURE_2D,ut,0,0,St,$t,_t):e.texImage2D(i.TEXTURE_2D,ut,Ot,St,$t,_t);b.generateMipmaps=!1}else if(F){if(dt){const ut=Ve(pt);e.texStorage2D(i.TEXTURE_2D,Ct,Ot,ut.width,ut.height)}yt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,St,$t,pt)}else e.texImage2D(i.TEXTURE_2D,0,Ot,St,$t,pt);g(b)&&m(it),Ft.__version=et.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function nt(R,b,W){if(b.image.length!==6)return;const it=he(R,b),ct=b.source;e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+W);const et=n.get(ct);if(ct.version!==et.__version||it===!0){e.activeTexture(i.TEXTURE0+W);const Ft=ye.getPrimaries(ye.workingColorSpace),xt=b.colorSpace===Mi?null:ye.getPrimaries(b.colorSpace),It=b.colorSpace===Mi||Ft===xt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);const zt=b.isCompressedTexture||b.image[0].isCompressedTexture,pt=b.image[0]&&b.image[0].isDataTexture,St=[];for(let at=0;at<6;at++)!zt&&!pt?St[at]=v(b.image[at],!0,s.maxCubemapSize):St[at]=pt?b.image[at].image:b.image[at],St[at]=He(b,St[at]);const $t=St[0],Ot=r.convert(b.format,b.colorSpace),_t=r.convert(b.type),ee=x(b.internalFormat,Ot,_t,b.colorSpace),F=b.isVideoTexture!==!0,dt=et.__version===void 0||it===!0,yt=ct.dataReady;let Ct=A(b,$t);jt(i.TEXTURE_CUBE_MAP,b);let ut;if(zt){F&&dt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ct,ee,$t.width,$t.height);for(let at=0;at<6;at++){ut=St[at].mipmaps;for(let Pt=0;Pt<ut.length;Pt++){const ne=ut[Pt];b.format!==In?Ot!==null?F?yt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Pt,0,0,ne.width,ne.height,Ot,ne.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Pt,ee,ne.width,ne.height,0,ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?yt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Pt,0,0,ne.width,ne.height,Ot,_t,ne.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Pt,ee,ne.width,ne.height,0,Ot,_t,ne.data)}}}else{if(ut=b.mipmaps,F&&dt){ut.length>0&&Ct++;const at=Ve(St[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ct,ee,at.width,at.height)}for(let at=0;at<6;at++)if(pt){F?yt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,St[at].width,St[at].height,Ot,_t,St[at].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,ee,St[at].width,St[at].height,0,Ot,_t,St[at].data);for(let Pt=0;Pt<ut.length;Pt++){const Pe=ut[Pt].image[at].image;F?yt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Pt+1,0,0,Pe.width,Pe.height,Ot,_t,Pe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Pt+1,ee,Pe.width,Pe.height,0,Ot,_t,Pe.data)}}else{F?yt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,Ot,_t,St[at]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,ee,Ot,_t,St[at]);for(let Pt=0;Pt<ut.length;Pt++){const ne=ut[Pt];F?yt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Pt+1,0,0,Ot,_t,ne.image[at]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Pt+1,ee,Ot,_t,ne.image[at])}}}g(b)&&m(i.TEXTURE_CUBE_MAP),et.__version=ct.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function vt(R,b,W,it,ct,et){const Ft=r.convert(W.format,W.colorSpace),xt=r.convert(W.type),It=x(W.internalFormat,Ft,xt,W.colorSpace),zt=n.get(b),pt=n.get(W);if(pt.__renderTarget=b,!zt.__hasExternalTextures){const St=Math.max(1,b.width>>et),$t=Math.max(1,b.height>>et);ct===i.TEXTURE_3D||ct===i.TEXTURE_2D_ARRAY?e.texImage3D(ct,et,It,St,$t,b.depth,0,Ft,xt,null):e.texImage2D(ct,et,It,St,$t,0,Ft,xt,null)}e.bindFramebuffer(i.FRAMEBUFFER,R),Lt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,it,ct,pt.__webglTexture,0,Ie(b)):(ct===i.TEXTURE_2D||ct>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ct<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,it,ct,pt.__webglTexture,et),e.bindFramebuffer(i.FRAMEBUFFER,null)}function gt(R,b,W){if(i.bindRenderbuffer(i.RENDERBUFFER,R),b.depthBuffer){const it=b.depthTexture,ct=it&&it.isDepthTexture?it.type:null,et=_(b.stencilBuffer,ct),Ft=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xt=Ie(b);Lt(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt,et,b.width,b.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt,et,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,et,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ft,i.RENDERBUFFER,R)}else{const it=b.textures;for(let ct=0;ct<it.length;ct++){const et=it[ct],Ft=r.convert(et.format,et.colorSpace),xt=r.convert(et.type),It=x(et.internalFormat,Ft,xt,et.colorSpace),zt=Ie(b);W&&Lt(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,zt,It,b.width,b.height):Lt(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,zt,It,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,It,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function At(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const it=n.get(b.depthTexture);it.__renderTarget=b,(!it.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),J(b.depthTexture,0);const ct=it.__webglTexture,et=Ie(b);if(b.depthTexture.format===Lr)Lt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ct,0,et):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ct,0);else if(b.depthTexture.format===Ir)Lt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ct,0,et):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ct,0);else throw new Error("Unknown depthTexture format")}function se(R){const b=n.get(R),W=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){const it=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),it){const ct=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,it.removeEventListener("dispose",ct)};it.addEventListener("dispose",ct),b.__depthDisposeCallback=ct}b.__boundDepthTexture=it}if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");const it=R.texture.mipmaps;it&&it.length>0?At(b.__webglFramebuffer[0],R):At(b.__webglFramebuffer,R)}else if(W){b.__webglDepthbuffer=[];for(let it=0;it<6;it++)if(e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[it]),b.__webglDepthbuffer[it]===void 0)b.__webglDepthbuffer[it]=i.createRenderbuffer(),gt(b.__webglDepthbuffer[it],R,!1);else{const ct=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=b.__webglDepthbuffer[it];i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,ct,i.RENDERBUFFER,et)}}else{const it=R.texture.mipmaps;if(it&&it.length>0?e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),gt(b.__webglDepthbuffer,R,!1);else{const ct=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,ct,i.RENDERBUFFER,et)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function be(R,b,W){const it=n.get(R);b!==void 0&&vt(it.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&se(R)}function I(R){const b=R.texture,W=n.get(R),it=n.get(b);R.addEventListener("dispose",E);const ct=R.textures,et=R.isWebGLCubeRenderTarget===!0,Ft=ct.length>1;if(Ft||(it.__webglTexture===void 0&&(it.__webglTexture=i.createTexture()),it.__version=b.version,a.memory.textures++),et){W.__webglFramebuffer=[];for(let xt=0;xt<6;xt++)if(b.mipmaps&&b.mipmaps.length>0){W.__webglFramebuffer[xt]=[];for(let It=0;It<b.mipmaps.length;It++)W.__webglFramebuffer[xt][It]=i.createFramebuffer()}else W.__webglFramebuffer[xt]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){W.__webglFramebuffer=[];for(let xt=0;xt<b.mipmaps.length;xt++)W.__webglFramebuffer[xt]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(Ft)for(let xt=0,It=ct.length;xt<It;xt++){const zt=n.get(ct[xt]);zt.__webglTexture===void 0&&(zt.__webglTexture=i.createTexture(),a.memory.textures++)}if(R.samples>0&&Lt(R)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let xt=0;xt<ct.length;xt++){const It=ct[xt];W.__webglColorRenderbuffer[xt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[xt]);const zt=r.convert(It.format,It.colorSpace),pt=r.convert(It.type),St=x(It.internalFormat,zt,pt,It.colorSpace,R.isXRRenderTarget===!0),$t=Ie(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,$t,St,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+xt,i.RENDERBUFFER,W.__webglColorRenderbuffer[xt])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),gt(W.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(et){e.bindTexture(i.TEXTURE_CUBE_MAP,it.__webglTexture),jt(i.TEXTURE_CUBE_MAP,b);for(let xt=0;xt<6;xt++)if(b.mipmaps&&b.mipmaps.length>0)for(let It=0;It<b.mipmaps.length;It++)vt(W.__webglFramebuffer[xt][It],R,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,It);else vt(W.__webglFramebuffer[xt],R,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0);g(b)&&m(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ft){for(let xt=0,It=ct.length;xt<It;xt++){const zt=ct[xt],pt=n.get(zt);let St=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(St=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(St,pt.__webglTexture),jt(St,zt),vt(W.__webglFramebuffer,R,zt,i.COLOR_ATTACHMENT0+xt,St,0),g(zt)&&m(St)}e.unbindTexture()}else{let xt=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(xt=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(xt,it.__webglTexture),jt(xt,b),b.mipmaps&&b.mipmaps.length>0)for(let It=0;It<b.mipmaps.length;It++)vt(W.__webglFramebuffer[It],R,b,i.COLOR_ATTACHMENT0,xt,It);else vt(W.__webglFramebuffer,R,b,i.COLOR_ATTACHMENT0,xt,0);g(b)&&m(xt),e.unbindTexture()}R.depthBuffer&&se(R)}function Se(R){const b=R.textures;for(let W=0,it=b.length;W<it;W++){const ct=b[W];if(g(ct)){const et=y(R),Ft=n.get(ct).__webglTexture;e.bindTexture(et,Ft),m(et),e.unbindTexture()}}}const te=[],Zt=[];function Nt(R){if(R.samples>0){if(Lt(R)===!1){const b=R.textures,W=R.width,it=R.height;let ct=i.COLOR_BUFFER_BIT;const et=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ft=n.get(R),xt=b.length>1;if(xt)for(let zt=0;zt<b.length;zt++)e.bindFramebuffer(i.FRAMEBUFFER,Ft.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+zt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ft.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+zt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ft.__webglMultisampledFramebuffer);const It=R.texture.mipmaps;It&&It.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ft.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ft.__webglFramebuffer);for(let zt=0;zt<b.length;zt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ct|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ct|=i.STENCIL_BUFFER_BIT)),xt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ft.__webglColorRenderbuffer[zt]);const pt=n.get(b[zt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,pt,0)}i.blitFramebuffer(0,0,W,it,0,0,W,it,ct,i.NEAREST),l===!0&&(te.length=0,Zt.length=0,te.push(i.COLOR_ATTACHMENT0+zt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(te.push(et),Zt.push(et),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Zt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,te))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),xt)for(let zt=0;zt<b.length;zt++){e.bindFramebuffer(i.FRAMEBUFFER,Ft.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+zt,i.RENDERBUFFER,Ft.__webglColorRenderbuffer[zt]);const pt=n.get(b[zt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ft.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+zt,i.TEXTURE_2D,pt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ft.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const b=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function Ie(R){return Math.min(s.maxSamples,R.samples)}function Lt(R){const b=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function re(R){const b=a.render.frame;h.get(R)!==b&&(h.set(R,b),R.update())}function He(R,b){const W=R.colorSpace,it=R.format,ct=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||W!==Os&&W!==Mi&&(ye.getTransfer(W)===De?(it!==In||ct!==hi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),b}function Ve(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=k,this.setTexture2D=J,this.setTexture2DArray=Y,this.setTexture3D=z,this.setTextureCube=O,this.rebindTextures=be,this.setupRenderTarget=I,this.updateRenderTargetMipmap=Se,this.updateMultisampleRenderTarget=Nt,this.setupDepthRenderbuffer=se,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=Lt}function b1(i,t){function e(n,s=Mi){let r;const a=ye.getTransfer(s);if(n===hi)return i.UNSIGNED_BYTE;if(n===xc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===yc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Vd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Gd)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Bd)return i.BYTE;if(n===Hd)return i.SHORT;if(n===Pr)return i.UNSIGNED_SHORT;if(n===vc)return i.INT;if(n===rs)return i.UNSIGNED_INT;if(n===Yn)return i.FLOAT;if(n===Hr)return i.HALF_FLOAT;if(n===Wd)return i.ALPHA;if(n===$d)return i.RGB;if(n===In)return i.RGBA;if(n===Lr)return i.DEPTH_COMPONENT;if(n===Ir)return i.DEPTH_STENCIL;if(n===_c)return i.RED;if(n===Mc)return i.RED_INTEGER;if(n===Xd)return i.RG;if(n===bc)return i.RG_INTEGER;if(n===Sc)return i.RGBA_INTEGER;if(n===ka||n===Fa||n===za||n===Oa)if(a===De)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ka)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Fa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===za)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ka)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Fa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===za)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Oa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===El||n===Al||n===Cl||n===Rl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===El)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Al)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Cl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Rl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Pl||n===Dl||n===Ll)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Pl||n===Dl)return a===De?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ll)return a===De?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Il||n===Ul||n===Nl||n===kl||n===Fl||n===zl||n===Ol||n===Bl||n===Hl||n===Vl||n===Gl||n===Wl||n===$l||n===Xl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Il)return a===De?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ul)return a===De?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Nl)return a===De?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===kl)return a===De?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fl)return a===De?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===zl)return a===De?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ol)return a===De?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Bl)return a===De?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Hl)return a===De?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Vl)return a===De?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Gl)return a===De?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Wl)return a===De?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===$l)return a===De?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xl)return a===De?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ql||n===Yl||n===jl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ql)return a===De?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Yl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===jl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Zl||n===Kl||n===Jl||n===Ql)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Zl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Kl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Jl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ql)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Dr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const S1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,w1=`
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

}`;class T1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new cu(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Hn({vertexShader:S1,fragmentShader:w1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Me(new is(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class E1 extends Vs{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,p=null;const v=typeof XRWebGLBinding<"u",g=new T1,m={},y=e.getContextAttributes();let x=null,_=null;const A=[],C=[],E=new kt;let D=null;const S=new vn;S.viewport=new xe;const M=new vn;M.viewport=new xe;const L=[S,M],k=new qp;let V=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let nt=A[Q];return nt===void 0&&(nt=new Uo,A[Q]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(Q){let nt=A[Q];return nt===void 0&&(nt=new Uo,A[Q]=nt),nt.getGripSpace()},this.getHand=function(Q){let nt=A[Q];return nt===void 0&&(nt=new Uo,A[Q]=nt),nt.getHandSpace()};function J(Q){const nt=C.indexOf(Q.inputSource);if(nt===-1)return;const vt=A[nt];vt!==void 0&&(vt.update(Q.inputSource,Q.frame,c||a),vt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function Y(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",z);for(let Q=0;Q<A.length;Q++){const nt=C[Q];nt!==null&&(C[Q]=null,A[Q].disconnect(nt))}V=null,Z=null,g.reset();for(const Q in m)delete m[Q];t.setRenderTarget(x),f=null,u=null,d=null,s=null,_=null,Ht.stop(),n.isPresenting=!1,t.setPixelRatio(D),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(x=t.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",z),y.xrCompatible!==!0&&await e.makeXRCompatible(),D=t.getPixelRatio(),t.getSize(E),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let vt=null,gt=null,At=null;y.depth&&(At=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,vt=y.stencil?Ir:Lr,gt=y.stencil?Dr:rs);const se={colorFormat:e.RGBA8,depthFormat:At,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(se),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),_=new di(u.textureWidth,u.textureHeight,{format:In,type:hi,depthTexture:new lu(u.textureWidth,u.textureHeight,gt,void 0,void 0,void 0,void 0,void 0,void 0,vt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const vt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,vt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new di(f.framebufferWidth,f.framebufferHeight,{format:In,type:hi,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ht.setContext(s),Ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function z(Q){for(let nt=0;nt<Q.removed.length;nt++){const vt=Q.removed[nt],gt=C.indexOf(vt);gt>=0&&(C[gt]=null,A[gt].disconnect(vt))}for(let nt=0;nt<Q.added.length;nt++){const vt=Q.added[nt];let gt=C.indexOf(vt);if(gt===-1){for(let se=0;se<A.length;se++)if(se>=C.length){C.push(vt),gt=se;break}else if(C[se]===null){C[se]=vt,gt=se;break}if(gt===-1)break}const At=A[gt];At&&At.connect(vt)}}const O=new P,lt=new P;function ot(Q,nt,vt){O.setFromMatrixPosition(nt.matrixWorld),lt.setFromMatrixPosition(vt.matrixWorld);const gt=O.distanceTo(lt),At=nt.projectionMatrix.elements,se=vt.projectionMatrix.elements,be=At[14]/(At[10]-1),I=At[14]/(At[10]+1),Se=(At[9]+1)/At[5],te=(At[9]-1)/At[5],Zt=(At[8]-1)/At[0],Nt=(se[8]+1)/se[0],Ie=be*Zt,Lt=be*Nt,re=gt/(-Zt+Nt),He=re*-Zt;if(nt.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(He),Q.translateZ(re),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),At[10]===-1)Q.projectionMatrix.copy(nt.projectionMatrix),Q.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const Ve=be+re,R=I+re,b=Ie-He,W=Lt+(gt-He),it=Se*I/R*Ve,ct=te*I/R*Ve;Q.projectionMatrix.makePerspective(b,W,it,ct,Ve,R),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function Mt(Q,nt){nt===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(nt.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let nt=Q.near,vt=Q.far;g.texture!==null&&(g.depthNear>0&&(nt=g.depthNear),g.depthFar>0&&(vt=g.depthFar)),k.near=M.near=S.near=nt,k.far=M.far=S.far=vt,(V!==k.near||Z!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),V=k.near,Z=k.far),k.layers.mask=Q.layers.mask|6,S.layers.mask=k.layers.mask&3,M.layers.mask=k.layers.mask&5;const gt=Q.parent,At=k.cameras;Mt(k,gt);for(let se=0;se<At.length;se++)Mt(At[se],gt);At.length===2?ot(k,S,M):k.projectionMatrix.copy(S.projectionMatrix),jt(Q,k,gt)};function jt(Q,nt,vt){vt===null?Q.matrix.copy(nt.matrixWorld):(Q.matrix.copy(vt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(nt.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(nt.projectionMatrix),Q.projectionMatrixInverse.copy(nt.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Ur*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Q){l=Q,u!==null&&(u.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(k)},this.getCameraTexture=function(Q){return m[Q]};let he=null;function _e(Q,nt){if(h=nt.getViewerPose(c||a),p=nt,h!==null){const vt=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let gt=!1;vt.length!==k.cameras.length&&(k.cameras.length=0,gt=!0);for(let I=0;I<vt.length;I++){const Se=vt[I];let te=null;if(f!==null)te=f.getViewport(Se);else{const Nt=d.getViewSubImage(u,Se);te=Nt.viewport,I===0&&(t.setRenderTargetTextures(_,Nt.colorTexture,Nt.depthStencilTexture),t.setRenderTarget(_))}let Zt=L[I];Zt===void 0&&(Zt=new vn,Zt.layers.enable(I),Zt.viewport=new xe,L[I]=Zt),Zt.matrix.fromArray(Se.transform.matrix),Zt.matrix.decompose(Zt.position,Zt.quaternion,Zt.scale),Zt.projectionMatrix.fromArray(Se.projectionMatrix),Zt.projectionMatrixInverse.copy(Zt.projectionMatrix).invert(),Zt.viewport.set(te.x,te.y,te.width,te.height),I===0&&(k.matrix.copy(Zt.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),gt===!0&&k.cameras.push(Zt)}const At=s.enabledFeatures;if(At&&At.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=n.getBinding();const I=d.getDepthInformation(vt[0]);I&&I.isValid&&I.texture&&g.init(I,s.renderState)}if(At&&At.includes("camera-access")&&v){t.state.unbindTexture(),d=n.getBinding();for(let I=0;I<vt.length;I++){const Se=vt[I].camera;if(Se){let te=m[Se];te||(te=new cu,m[Se]=te);const Zt=d.getCameraImage(Se);te.sourceTexture=Zt}}}}for(let vt=0;vt<A.length;vt++){const gt=C[vt],At=A[vt];gt!==null&&At!==void 0&&At.update(gt,nt,c||a)}he&&he(Q,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),p=null}const Ht=new pu;Ht.setAnimationLoop(_e),this.setAnimationLoop=function(Q){he=Q},this.dispose=function(){}}}const Ji=new ui,A1=new ie;function C1(i,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Qd(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,y,x,_){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,_)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,y,x):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===xn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===xn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const y=t.get(m),x=y.envMap,_=y.envMapRotation;x&&(g.envMap.value=x,Ji.copy(_),Ji.x*=-1,Ji.y*=-1,Ji.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ji.y*=-1,Ji.z*=-1),g.envMapRotation.value.setFromMatrix4(A1.makeRotationFromEuler(Ji)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,y,x){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*y,g.scale.value=x*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,y){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===xn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const y=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function R1(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,x){const _=x.program;n.uniformBlockBinding(y,_)}function c(y,x){let _=s[y.id];_===void 0&&(p(y),_=h(y),s[y.id]=_,y.addEventListener("dispose",g));const A=x.program;n.updateUBOMapping(y,A);const C=t.render.frame;r[y.id]!==C&&(u(y),r[y.id]=C)}function h(y){const x=d();y.__bindingPointIndex=x;const _=i.createBuffer(),A=y.__size,C=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,A,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,_),_}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const x=s[y.id],_=y.uniforms,A=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let C=0,E=_.length;C<E;C++){const D=Array.isArray(_[C])?_[C]:[_[C]];for(let S=0,M=D.length;S<M;S++){const L=D[S];if(f(L,C,S,A)===!0){const k=L.__offset,V=Array.isArray(L.value)?L.value:[L.value];let Z=0;for(let J=0;J<V.length;J++){const Y=V[J],z=v(Y);typeof Y=="number"||typeof Y=="boolean"?(L.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,k+Z,L.__data)):Y.isMatrix3?(L.__data[0]=Y.elements[0],L.__data[1]=Y.elements[1],L.__data[2]=Y.elements[2],L.__data[3]=0,L.__data[4]=Y.elements[3],L.__data[5]=Y.elements[4],L.__data[6]=Y.elements[5],L.__data[7]=0,L.__data[8]=Y.elements[6],L.__data[9]=Y.elements[7],L.__data[10]=Y.elements[8],L.__data[11]=0):(Y.toArray(L.__data,Z),Z+=z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,x,_,A){const C=y.value,E=x+"_"+_;if(A[E]===void 0)return typeof C=="number"||typeof C=="boolean"?A[E]=C:A[E]=C.clone(),!0;{const D=A[E];if(typeof C=="number"||typeof C=="boolean"){if(D!==C)return A[E]=C,!0}else if(D.equals(C)===!1)return D.copy(C),!0}return!1}function p(y){const x=y.uniforms;let _=0;const A=16;for(let E=0,D=x.length;E<D;E++){const S=Array.isArray(x[E])?x[E]:[x[E]];for(let M=0,L=S.length;M<L;M++){const k=S[M],V=Array.isArray(k.value)?k.value:[k.value];for(let Z=0,J=V.length;Z<J;Z++){const Y=V[Z],z=v(Y),O=_%A,lt=O%z.boundary,ot=O+lt;_+=lt,ot!==0&&A-ot<z.storage&&(_+=A-ot),k.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=_,_+=z.storage}}}const C=_%A;return C>0&&(_+=A-C),y.__size=_,y.__cache={},this}function v(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function g(y){const x=y.target;x.removeEventListener("dispose",g);const _=a.indexOf(x.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function m(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:m}}class P1{constructor(t={}){const{canvas:e=Gf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const p=new Uint32Array(4),v=new Int32Array(4);let g=null,m=null;const y=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Vi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let A=!1;this._outputColorSpace=Sn;let C=0,E=0,D=null,S=-1,M=null;const L=new xe,k=new xe;let V=null;const Z=new Jt(0);let J=0,Y=e.width,z=e.height,O=1,lt=null,ot=null;const Mt=new xe(0,0,Y,z),jt=new xe(0,0,Y,z);let he=!1;const _e=new Rc;let Ht=!1,Q=!1;const nt=new ie,vt=new P,gt=new xe,At={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let se=!1;function be(){return D===null?O:1}let I=n;function Se(w,B){return e.getContext(w,B)}try{const w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${gc}`),e.addEventListener("webglcontextlost",yt,!1),e.addEventListener("webglcontextrestored",Ct,!1),e.addEventListener("webglcontextcreationerror",ut,!1),I===null){const B="webgl2";if(I=Se(B,w),I===null)throw Se(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let te,Zt,Nt,Ie,Lt,re,He,Ve,R,b,W,it,ct,et,Ft,xt,It,zt,pt,St,$t,Ot,_t,ee;function F(){te=new B0(I),te.init(),Ot=new b1(I,te),Zt=new I0(I,te,t,Ot),Nt=new _1(I,te),Zt.reversedDepthBuffer&&u&&Nt.buffers.depth.setReversed(!0),Ie=new G0(I),Lt=new o1,re=new M1(I,te,Nt,Lt,Zt,Ot,Ie),He=new N0(_),Ve=new O0(_),R=new jp(I),_t=new D0(I,R),b=new H0(I,R,Ie,_t),W=new $0(I,b,R,Ie),pt=new W0(I,Zt,re),xt=new U0(Lt),it=new a1(_,He,Ve,te,Zt,_t,xt),ct=new C1(_,Lt),et=new c1,Ft=new m1(te),zt=new P0(_,He,Ve,Nt,W,f,l),It=new x1(_,W,Zt),ee=new R1(I,Ie,Zt,Nt),St=new L0(I,te,Ie),$t=new V0(I,te,Ie),Ie.programs=it.programs,_.capabilities=Zt,_.extensions=te,_.properties=Lt,_.renderLists=et,_.shadowMap=It,_.state=Nt,_.info=Ie}F();const dt=new E1(_,I);this.xr=dt,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const w=te.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=te.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(w){w!==void 0&&(O=w,this.setSize(Y,z,!1))},this.getSize=function(w){return w.set(Y,z)},this.setSize=function(w,B,j=!0){if(dt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Y=w,z=B,e.width=Math.floor(w*O),e.height=Math.floor(B*O),j===!0&&(e.style.width=w+"px",e.style.height=B+"px"),this.setViewport(0,0,w,B)},this.getDrawingBufferSize=function(w){return w.set(Y*O,z*O).floor()},this.setDrawingBufferSize=function(w,B,j){Y=w,z=B,O=j,e.width=Math.floor(w*j),e.height=Math.floor(B*j),this.setViewport(0,0,w,B)},this.getCurrentViewport=function(w){return w.copy(L)},this.getViewport=function(w){return w.copy(Mt)},this.setViewport=function(w,B,j,K){w.isVector4?Mt.set(w.x,w.y,w.z,w.w):Mt.set(w,B,j,K),Nt.viewport(L.copy(Mt).multiplyScalar(O).round())},this.getScissor=function(w){return w.copy(jt)},this.setScissor=function(w,B,j,K){w.isVector4?jt.set(w.x,w.y,w.z,w.w):jt.set(w,B,j,K),Nt.scissor(k.copy(jt).multiplyScalar(O).round())},this.getScissorTest=function(){return he},this.setScissorTest=function(w){Nt.setScissorTest(he=w)},this.setOpaqueSort=function(w){lt=w},this.setTransparentSort=function(w){ot=w},this.getClearColor=function(w){return w.copy(zt.getClearColor())},this.setClearColor=function(){zt.setClearColor(...arguments)},this.getClearAlpha=function(){return zt.getClearAlpha()},this.setClearAlpha=function(){zt.setClearAlpha(...arguments)},this.clear=function(w=!0,B=!0,j=!0){let K=0;if(w){let H=!1;if(D!==null){const ft=D.texture.format;H=ft===Sc||ft===bc||ft===Mc}if(H){const ft=D.texture.type,wt=ft===hi||ft===rs||ft===Pr||ft===Dr||ft===xc||ft===yc,Dt=zt.getClearColor(),Et=zt.getClearAlpha(),Yt=Dt.r,Xt=Dt.g,Gt=Dt.b;wt?(p[0]=Yt,p[1]=Xt,p[2]=Gt,p[3]=Et,I.clearBufferuiv(I.COLOR,0,p)):(v[0]=Yt,v[1]=Xt,v[2]=Gt,v[3]=Et,I.clearBufferiv(I.COLOR,0,v))}else K|=I.COLOR_BUFFER_BIT}B&&(K|=I.DEPTH_BUFFER_BIT),j&&(K|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",yt,!1),e.removeEventListener("webglcontextrestored",Ct,!1),e.removeEventListener("webglcontextcreationerror",ut,!1),zt.dispose(),et.dispose(),Ft.dispose(),Lt.dispose(),He.dispose(),Ve.dispose(),W.dispose(),_t.dispose(),ee.dispose(),it.dispose(),dt.dispose(),dt.removeEventListener("sessionstart",dn),dt.removeEventListener("sessionend",Xs),Kn.stop()};function yt(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function Ct(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const w=Ie.autoReset,B=It.enabled,j=It.autoUpdate,K=It.needsUpdate,H=It.type;F(),Ie.autoReset=w,It.enabled=B,It.autoUpdate=j,It.needsUpdate=K,It.type=H}function ut(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function at(w){const B=w.target;B.removeEventListener("dispose",at),Pt(B)}function Pt(w){ne(w),Lt.remove(w)}function ne(w){const B=Lt.get(w).programs;B!==void 0&&(B.forEach(function(j){it.releaseProgram(j)}),w.isShaderMaterial&&it.releaseShaderCache(w))}this.renderBufferDirect=function(w,B,j,K,H,ft){B===null&&(B=At);const wt=H.isMesh&&H.matrixWorld.determinant()<0,Dt=co(w,B,j,K,H);Nt.setMaterial(K,wt);let Et=j.index,Yt=1;if(K.wireframe===!0){if(Et=b.getWireframeAttribute(j),Et===void 0)return;Yt=2}const Xt=j.drawRange,Gt=j.attributes.position;let ae=Xt.start*Yt,we=(Xt.start+Xt.count)*Yt;ft!==null&&(ae=Math.max(ae,ft.start*Yt),we=Math.min(we,(ft.start+ft.count)*Yt)),Et!==null?(ae=Math.max(ae,0),we=Math.min(we,Et.count)):Gt!=null&&(ae=Math.max(ae,0),we=Math.min(we,Gt.count));const ze=we-ae;if(ze<0||ze===1/0)return;_t.setup(H,K,Dt,j,Et);let Ue,Ae=St;if(Et!==null&&(Ue=R.get(Et),Ae=$t,Ae.setIndex(Ue)),H.isMesh)K.wireframe===!0?(Nt.setLineWidth(K.wireframeLinewidth*be()),Ae.setMode(I.LINES)):Ae.setMode(I.TRIANGLES);else if(H.isLine){let qt=K.linewidth;qt===void 0&&(qt=1),Nt.setLineWidth(qt*be()),H.isLineSegments?Ae.setMode(I.LINES):H.isLineLoop?Ae.setMode(I.LINE_LOOP):Ae.setMode(I.LINE_STRIP)}else H.isPoints?Ae.setMode(I.POINTS):H.isSprite&&Ae.setMode(I.TRIANGLES);if(H.isBatchedMesh)if(H._multiDrawInstances!==null)Nr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ae.renderMultiDrawInstances(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount,H._multiDrawInstances);else if(te.get("WEBGL_multi_draw"))Ae.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const qt=H._multiDrawStarts,Fe=H._multiDrawCounts,T=H._multiDrawCount,U=Et?R.get(Et).bytesPerElement:1,G=Lt.get(K).currentProgram.getUniforms();for(let N=0;N<T;N++)G.setValue(I,"_gl_DrawID",N),Ae.render(qt[N]/U,Fe[N])}else if(H.isInstancedMesh)Ae.renderInstances(ae,ze,H.count);else if(j.isInstancedBufferGeometry){const qt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Fe=Math.min(j.instanceCount,qt);Ae.renderInstances(ae,ze,Fe)}else Ae.render(ae,ze)};function Pe(w,B,j){w.transparent===!0&&w.side===Xe&&w.forceSinglePass===!1?(w.side=xn,w.needsUpdate=!0,Ci(w,B,j),w.side=Ti,w.needsUpdate=!0,Ci(w,B,j),w.side=Xe):Ci(w,B,j)}this.compile=function(w,B,j=null){j===null&&(j=w),m=Ft.get(j),m.init(B),x.push(m),j.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(m.pushLight(H),H.castShadow&&m.pushShadow(H))}),w!==j&&w.traverseVisible(function(H){H.isLight&&H.layers.test(B.layers)&&(m.pushLight(H),H.castShadow&&m.pushShadow(H))}),m.setupLights();const K=new Set;return w.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const ft=H.material;if(ft)if(Array.isArray(ft))for(let wt=0;wt<ft.length;wt++){const Dt=ft[wt];Pe(Dt,j,H),K.add(Dt)}else Pe(ft,j,H),K.add(ft)}),m=x.pop(),K},this.compileAsync=function(w,B,j=null){const K=this.compile(w,B,j);return new Promise(H=>{function ft(){if(K.forEach(function(wt){Lt.get(wt).currentProgram.isReady()&&K.delete(wt)}),K.size===0){H(w);return}setTimeout(ft,10)}te.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let ge=null;function hn(w){ge&&ge(w)}function dn(){Kn.stop()}function Xs(){Kn.start()}const Kn=new pu;Kn.setAnimationLoop(hn),typeof self<"u"&&Kn.setContext(self),this.setAnimationLoop=function(w){ge=w,dt.setAnimationLoop(w),w===null?Kn.stop():Kn.start()},dt.addEventListener("sessionstart",dn),dt.addEventListener("sessionend",Xs),this.render=function(w,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),dt.enabled===!0&&dt.isPresenting===!0&&(dt.cameraAutoUpdate===!0&&dt.updateCamera(B),B=dt.getCamera()),w.isScene===!0&&w.onBeforeRender(_,w,B,D),m=Ft.get(w,x.length),m.init(B),x.push(m),nt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),_e.setFromProjectionMatrix(nt,li,B.reversedDepth),Q=this.localClippingEnabled,Ht=xt.init(this.clippingPlanes,Q),g=et.get(w,y.length),g.init(),y.push(g),dt.enabled===!0&&dt.isPresenting===!0){const ft=_.xr.getDepthSensingMesh();ft!==null&&Ai(ft,B,-1/0,_.sortObjects)}Ai(w,B,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(lt,ot),se=dt.enabled===!1||dt.isPresenting===!1||dt.hasDepthSensing()===!1,se&&zt.addToRenderList(g,w),this.info.render.frame++,Ht===!0&&xt.beginShadows();const j=m.state.shadowsArray;It.render(j,w,B),Ht===!0&&xt.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=g.opaque,H=g.transmissive;if(m.setupLights(),B.isArrayCamera){const ft=B.cameras;if(H.length>0)for(let wt=0,Dt=ft.length;wt<Dt;wt++){const Et=ft[wt];$r(K,H,w,Et)}se&&zt.render(w);for(let wt=0,Dt=ft.length;wt<Dt;wt++){const Et=ft[wt];qs(g,w,Et,Et.viewport)}}else H.length>0&&$r(K,H,w,B),se&&zt.render(w),qs(g,w,B);D!==null&&E===0&&(re.updateMultisampleRenderTarget(D),re.updateRenderTargetMipmap(D)),w.isScene===!0&&w.onAfterRender(_,w,B),_t.resetDefaultState(),S=-1,M=null,x.pop(),x.length>0?(m=x[x.length-1],Ht===!0&&xt.setGlobalState(_.clippingPlanes,m.state.camera)):m=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function Ai(w,B,j,K){if(w.visible===!1)return;if(w.layers.test(B.layers)){if(w.isGroup)j=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(B);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||_e.intersectsSprite(w)){K&&gt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(nt);const wt=W.update(w),Dt=w.material;Dt.visible&&g.push(w,wt,Dt,j,gt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||_e.intersectsObject(w))){const wt=W.update(w),Dt=w.material;if(K&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),gt.copy(w.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),gt.copy(wt.boundingSphere.center)),gt.applyMatrix4(w.matrixWorld).applyMatrix4(nt)),Array.isArray(Dt)){const Et=wt.groups;for(let Yt=0,Xt=Et.length;Yt<Xt;Yt++){const Gt=Et[Yt],ae=Dt[Gt.materialIndex];ae&&ae.visible&&g.push(w,wt,ae,j,gt.z,Gt)}}else Dt.visible&&g.push(w,wt,Dt,j,gt.z,null)}}const ft=w.children;for(let wt=0,Dt=ft.length;wt<Dt;wt++)Ai(ft[wt],B,j,K)}function qs(w,B,j,K){const H=w.opaque,ft=w.transmissive,wt=w.transparent;m.setupLightsView(j),Ht===!0&&xt.setGlobalState(_.clippingPlanes,j),K&&Nt.viewport(L.copy(K)),H.length>0&&Tn(H,B,j),ft.length>0&&Tn(ft,B,j),wt.length>0&&Tn(wt,B,j),Nt.buffers.depth.setTest(!0),Nt.buffers.depth.setMask(!0),Nt.buffers.color.setMask(!0),Nt.setPolygonOffset(!1)}function $r(w,B,j,K){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[K.id]===void 0&&(m.state.transmissionRenderTarget[K.id]=new di(1,1,{generateMipmaps:!0,type:te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float")?Hr:hi,minFilter:Bi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ye.workingColorSpace}));const ft=m.state.transmissionRenderTarget[K.id],wt=K.viewport||L;ft.setSize(wt.z*_.transmissionResolutionScale,wt.w*_.transmissionResolutionScale);const Dt=_.getRenderTarget(),Et=_.getActiveCubeFace(),Yt=_.getActiveMipmapLevel();_.setRenderTarget(ft),_.getClearColor(Z),J=_.getClearAlpha(),J<1&&_.setClearColor(16777215,.5),_.clear(),se&&zt.render(j);const Xt=_.toneMapping;_.toneMapping=Vi;const Gt=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),m.setupLightsView(K),Ht===!0&&xt.setGlobalState(_.clippingPlanes,K),Tn(w,j,K),re.updateMultisampleRenderTarget(ft),re.updateRenderTargetMipmap(ft),te.has("WEBGL_multisampled_render_to_texture")===!1){let ae=!1;for(let we=0,ze=B.length;we<ze;we++){const Ue=B[we],Ae=Ue.object,qt=Ue.geometry,Fe=Ue.material,T=Ue.group;if(Fe.side===Xe&&Ae.layers.test(K.layers)){const U=Fe.side;Fe.side=xn,Fe.needsUpdate=!0,Xr(Ae,j,K,qt,Fe,T),Fe.side=U,Fe.needsUpdate=!0,ae=!0}}ae===!0&&(re.updateMultisampleRenderTarget(ft),re.updateRenderTargetMipmap(ft))}_.setRenderTarget(Dt,Et,Yt),_.setClearColor(Z,J),Gt!==void 0&&(K.viewport=Gt),_.toneMapping=Xt}function Tn(w,B,j){const K=B.isScene===!0?B.overrideMaterial:null;for(let H=0,ft=w.length;H<ft;H++){const wt=w[H],Dt=wt.object,Et=wt.geometry,Yt=wt.group;let Xt=wt.material;Xt.allowOverride===!0&&K!==null&&(Xt=K),Dt.layers.test(j.layers)&&Xr(Dt,B,j,Et,Xt,Yt)}}function Xr(w,B,j,K,H,ft){w.onBeforeRender(_,B,j,K,H,ft),w.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),H.onBeforeRender(_,B,j,K,w,ft),H.transparent===!0&&H.side===Xe&&H.forceSinglePass===!1?(H.side=xn,H.needsUpdate=!0,_.renderBufferDirect(j,B,K,H,w,ft),H.side=Ti,H.needsUpdate=!0,_.renderBufferDirect(j,B,K,H,w,ft),H.side=Xe):_.renderBufferDirect(j,B,K,H,w,ft),w.onAfterRender(_,B,j,K,H,ft)}function Ci(w,B,j){B.isScene!==!0&&(B=At);const K=Lt.get(w),H=m.state.lights,ft=m.state.shadowsArray,wt=H.state.version,Dt=it.getParameters(w,H.state,ft,B,j),Et=it.getProgramCacheKey(Dt);let Yt=K.programs;K.environment=w.isMeshStandardMaterial?B.environment:null,K.fog=B.fog,K.envMap=(w.isMeshStandardMaterial?Ve:He).get(w.envMap||K.environment),K.envMapRotation=K.environment!==null&&w.envMap===null?B.environmentRotation:w.envMapRotation,Yt===void 0&&(w.addEventListener("dispose",at),Yt=new Map,K.programs=Yt);let Xt=Yt.get(Et);if(Xt!==void 0){if(K.currentProgram===Xt&&K.lightsStateVersion===wt)return Ys(w,Dt),Xt}else Dt.uniforms=it.getUniforms(w),w.onBeforeCompile(Dt,_),Xt=it.acquireProgram(Dt,Et),Yt.set(Et,Xt),K.uniforms=Dt.uniforms;const Gt=K.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Gt.clippingPlanes=xt.uniform),Ys(w,Dt),K.needsLights=Yr(w),K.lightsStateVersion=wt,K.needsLights&&(Gt.ambientLightColor.value=H.state.ambient,Gt.lightProbe.value=H.state.probe,Gt.directionalLights.value=H.state.directional,Gt.directionalLightShadows.value=H.state.directionalShadow,Gt.spotLights.value=H.state.spot,Gt.spotLightShadows.value=H.state.spotShadow,Gt.rectAreaLights.value=H.state.rectArea,Gt.ltc_1.value=H.state.rectAreaLTC1,Gt.ltc_2.value=H.state.rectAreaLTC2,Gt.pointLights.value=H.state.point,Gt.pointLightShadows.value=H.state.pointShadow,Gt.hemisphereLights.value=H.state.hemi,Gt.directionalShadowMap.value=H.state.directionalShadowMap,Gt.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Gt.spotShadowMap.value=H.state.spotShadowMap,Gt.spotLightMatrix.value=H.state.spotLightMatrix,Gt.spotLightMap.value=H.state.spotLightMap,Gt.pointShadowMap.value=H.state.pointShadowMap,Gt.pointShadowMatrix.value=H.state.pointShadowMatrix),K.currentProgram=Xt,K.uniformsList=null,Xt}function qr(w){if(w.uniformsList===null){const B=w.currentProgram.getUniforms();w.uniformsList=Ba.seqWithValue(B.seq,w.uniforms)}return w.uniformsList}function Ys(w,B){const j=Lt.get(w);j.outputColorSpace=B.outputColorSpace,j.batching=B.batching,j.batchingColor=B.batchingColor,j.instancing=B.instancing,j.instancingColor=B.instancingColor,j.instancingMorph=B.instancingMorph,j.skinning=B.skinning,j.morphTargets=B.morphTargets,j.morphNormals=B.morphNormals,j.morphColors=B.morphColors,j.morphTargetsCount=B.morphTargetsCount,j.numClippingPlanes=B.numClippingPlanes,j.numIntersection=B.numClipIntersection,j.vertexAlphas=B.vertexAlphas,j.vertexTangents=B.vertexTangents,j.toneMapping=B.toneMapping}function co(w,B,j,K,H){B.isScene!==!0&&(B=At),re.resetTextureUnits();const ft=B.fog,wt=K.isMeshStandardMaterial?B.environment:null,Dt=D===null?_.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Os,Et=(K.isMeshStandardMaterial?Ve:He).get(K.envMap||wt),Yt=K.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Xt=!!j.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Gt=!!j.morphAttributes.position,ae=!!j.morphAttributes.normal,we=!!j.morphAttributes.color;let ze=Vi;K.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(ze=_.toneMapping);const Ue=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Ae=Ue!==void 0?Ue.length:0,qt=Lt.get(K),Fe=m.state.lights;if(Ht===!0&&(Q===!0||w!==M)){const st=w===M&&K.id===S;xt.setState(K,w,st)}let T=!1;K.version===qt.__version?(qt.needsLights&&qt.lightsStateVersion!==Fe.state.version||qt.outputColorSpace!==Dt||H.isBatchedMesh&&qt.batching===!1||!H.isBatchedMesh&&qt.batching===!0||H.isBatchedMesh&&qt.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&qt.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&qt.instancing===!1||!H.isInstancedMesh&&qt.instancing===!0||H.isSkinnedMesh&&qt.skinning===!1||!H.isSkinnedMesh&&qt.skinning===!0||H.isInstancedMesh&&qt.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&qt.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&qt.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&qt.instancingMorph===!1&&H.morphTexture!==null||qt.envMap!==Et||K.fog===!0&&qt.fog!==ft||qt.numClippingPlanes!==void 0&&(qt.numClippingPlanes!==xt.numPlanes||qt.numIntersection!==xt.numIntersection)||qt.vertexAlphas!==Yt||qt.vertexTangents!==Xt||qt.morphTargets!==Gt||qt.morphNormals!==ae||qt.morphColors!==we||qt.toneMapping!==ze||qt.morphTargetsCount!==Ae)&&(T=!0):(T=!0,qt.__version=K.version);let U=qt.currentProgram;T===!0&&(U=Ci(K,B,H));let G=!1,N=!1,tt=!1;const $=U.getUniforms(),q=qt.uniforms;if(Nt.useProgram(U.program)&&(G=!0,N=!0,tt=!0),K.id!==S&&(S=K.id,N=!0),G||M!==w){Nt.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),$.setValue(I,"projectionMatrix",w.projectionMatrix),$.setValue(I,"viewMatrix",w.matrixWorldInverse);const mt=$.map.cameraPosition;mt!==void 0&&mt.setValue(I,vt.setFromMatrixPosition(w.matrixWorld)),Zt.logarithmicDepthBuffer&&$.setValue(I,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&$.setValue(I,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,N=!0,tt=!0)}if(H.isSkinnedMesh){$.setOptional(I,H,"bindMatrix"),$.setOptional(I,H,"bindMatrixInverse");const st=H.skeleton;st&&(st.boneTexture===null&&st.computeBoneTexture(),$.setValue(I,"boneTexture",st.boneTexture,re))}H.isBatchedMesh&&($.setOptional(I,H,"batchingTexture"),$.setValue(I,"batchingTexture",H._matricesTexture,re),$.setOptional(I,H,"batchingIdTexture"),$.setValue(I,"batchingIdTexture",H._indirectTexture,re),$.setOptional(I,H,"batchingColorTexture"),H._colorsTexture!==null&&$.setValue(I,"batchingColorTexture",H._colorsTexture,re));const X=j.morphAttributes;if((X.position!==void 0||X.normal!==void 0||X.color!==void 0)&&pt.update(H,j,U),(N||qt.receiveShadow!==H.receiveShadow)&&(qt.receiveShadow=H.receiveShadow,$.setValue(I,"receiveShadow",H.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(q.envMap.value=Et,q.flipEnvMap.value=Et.isCubeTexture&&Et.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&B.environment!==null&&(q.envMapIntensity.value=B.environmentIntensity),N&&($.setValue(I,"toneMappingExposure",_.toneMappingExposure),qt.needsLights&&ho(q,tt),ft&&K.fog===!0&&ct.refreshFogUniforms(q,ft),ct.refreshMaterialUniforms(q,K,O,z,m.state.transmissionRenderTarget[w.id]),Ba.upload(I,qr(qt),q,re)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Ba.upload(I,qr(qt),q,re),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&$.setValue(I,"center",H.center),$.setValue(I,"modelViewMatrix",H.modelViewMatrix),$.setValue(I,"normalMatrix",H.normalMatrix),$.setValue(I,"modelMatrix",H.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const st=K.uniformsGroups;for(let mt=0,Wt=st.length;mt<Wt;mt++){const Vt=st[mt];ee.update(Vt,U),ee.bind(Vt,U)}}return U}function ho(w,B){w.ambientLightColor.needsUpdate=B,w.lightProbe.needsUpdate=B,w.directionalLights.needsUpdate=B,w.directionalLightShadows.needsUpdate=B,w.pointLights.needsUpdate=B,w.pointLightShadows.needsUpdate=B,w.spotLights.needsUpdate=B,w.spotLightShadows.needsUpdate=B,w.rectAreaLights.needsUpdate=B,w.hemisphereLights.needsUpdate=B}function Yr(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(w,B,j){const K=Lt.get(w);K.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),Lt.get(w.texture).__webglTexture=B,Lt.get(w.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:j,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,B){const j=Lt.get(w);j.__webglFramebuffer=B,j.__useDefaultFramebuffer=B===void 0};const js=I.createFramebuffer();this.setRenderTarget=function(w,B=0,j=0){D=w,C=B,E=j;let K=!0,H=null,ft=!1,wt=!1;if(w){const Et=Lt.get(w);if(Et.__useDefaultFramebuffer!==void 0)Nt.bindFramebuffer(I.FRAMEBUFFER,null),K=!1;else if(Et.__webglFramebuffer===void 0)re.setupRenderTarget(w);else if(Et.__hasExternalTextures)re.rebindTextures(w,Lt.get(w.texture).__webglTexture,Lt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Gt=w.depthTexture;if(Et.__boundDepthTexture!==Gt){if(Gt!==null&&Lt.has(Gt)&&(w.width!==Gt.image.width||w.height!==Gt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");re.setupDepthRenderbuffer(w)}}const Yt=w.texture;(Yt.isData3DTexture||Yt.isDataArrayTexture||Yt.isCompressedArrayTexture)&&(wt=!0);const Xt=Lt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Xt[B])?H=Xt[B][j]:H=Xt[B],ft=!0):w.samples>0&&re.useMultisampledRTT(w)===!1?H=Lt.get(w).__webglMultisampledFramebuffer:Array.isArray(Xt)?H=Xt[j]:H=Xt,L.copy(w.viewport),k.copy(w.scissor),V=w.scissorTest}else L.copy(Mt).multiplyScalar(O).floor(),k.copy(jt).multiplyScalar(O).floor(),V=he;if(j!==0&&(H=js),Nt.bindFramebuffer(I.FRAMEBUFFER,H)&&K&&Nt.drawBuffers(w,H),Nt.viewport(L),Nt.scissor(k),Nt.setScissorTest(V),ft){const Et=Lt.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+B,Et.__webglTexture,j)}else if(wt){const Et=B;for(let Yt=0;Yt<w.textures.length;Yt++){const Xt=Lt.get(w.textures[Yt]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Yt,Xt.__webglTexture,j,Et)}}else if(w!==null&&j!==0){const Et=Lt.get(w.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Et.__webglTexture,j)}S=-1},this.readRenderTargetPixels=function(w,B,j,K,H,ft,wt,Dt=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=Lt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&wt!==void 0&&(Et=Et[wt]),Et){Nt.bindFramebuffer(I.FRAMEBUFFER,Et);try{const Yt=w.textures[Dt],Xt=Yt.format,Gt=Yt.type;if(!Zt.textureFormatReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Zt.textureTypeReadable(Gt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=w.width-K&&j>=0&&j<=w.height-H&&(w.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Dt),I.readPixels(B,j,K,H,Ot.convert(Xt),Ot.convert(Gt),ft))}finally{const Yt=D!==null?Lt.get(D).__webglFramebuffer:null;Nt.bindFramebuffer(I.FRAMEBUFFER,Yt)}}},this.readRenderTargetPixelsAsync=async function(w,B,j,K,H,ft,wt,Dt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=Lt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&wt!==void 0&&(Et=Et[wt]),Et)if(B>=0&&B<=w.width-K&&j>=0&&j<=w.height-H){Nt.bindFramebuffer(I.FRAMEBUFFER,Et);const Yt=w.textures[Dt],Xt=Yt.format,Gt=Yt.type;if(!Zt.textureFormatReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Zt.textureTypeReadable(Gt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ae=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,ae),I.bufferData(I.PIXEL_PACK_BUFFER,ft.byteLength,I.STREAM_READ),w.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Dt),I.readPixels(B,j,K,H,Ot.convert(Xt),Ot.convert(Gt),0);const we=D!==null?Lt.get(D).__webglFramebuffer:null;Nt.bindFramebuffer(I.FRAMEBUFFER,we);const ze=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Wf(I,ze,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,ae),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ft),I.deleteBuffer(ae),I.deleteSync(ze),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,B=null,j=0){const K=Math.pow(2,-j),H=Math.floor(w.image.width*K),ft=Math.floor(w.image.height*K),wt=B!==null?B.x:0,Dt=B!==null?B.y:0;re.setTexture2D(w,0),I.copyTexSubImage2D(I.TEXTURE_2D,j,0,0,wt,Dt,H,ft),Nt.unbindTexture()};const $i=I.createFramebuffer(),jr=I.createFramebuffer();this.copyTextureToTexture=function(w,B,j=null,K=null,H=0,ft=null){ft===null&&(H!==0?(Nr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ft=H,H=0):ft=0);let wt,Dt,Et,Yt,Xt,Gt,ae,we,ze;const Ue=w.isCompressedTexture?w.mipmaps[ft]:w.image;if(j!==null)wt=j.max.x-j.min.x,Dt=j.max.y-j.min.y,Et=j.isBox3?j.max.z-j.min.z:1,Yt=j.min.x,Xt=j.min.y,Gt=j.isBox3?j.min.z:0;else{const X=Math.pow(2,-H);wt=Math.floor(Ue.width*X),Dt=Math.floor(Ue.height*X),w.isDataArrayTexture?Et=Ue.depth:w.isData3DTexture?Et=Math.floor(Ue.depth*X):Et=1,Yt=0,Xt=0,Gt=0}K!==null?(ae=K.x,we=K.y,ze=K.z):(ae=0,we=0,ze=0);const Ae=Ot.convert(B.format),qt=Ot.convert(B.type);let Fe;B.isData3DTexture?(re.setTexture3D(B,0),Fe=I.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(re.setTexture2DArray(B,0),Fe=I.TEXTURE_2D_ARRAY):(re.setTexture2D(B,0),Fe=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,B.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,B.unpackAlignment);const T=I.getParameter(I.UNPACK_ROW_LENGTH),U=I.getParameter(I.UNPACK_IMAGE_HEIGHT),G=I.getParameter(I.UNPACK_SKIP_PIXELS),N=I.getParameter(I.UNPACK_SKIP_ROWS),tt=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Ue.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ue.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Yt),I.pixelStorei(I.UNPACK_SKIP_ROWS,Xt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Gt);const $=w.isDataArrayTexture||w.isData3DTexture,q=B.isDataArrayTexture||B.isData3DTexture;if(w.isDepthTexture){const X=Lt.get(w),st=Lt.get(B),mt=Lt.get(X.__renderTarget),Wt=Lt.get(st.__renderTarget);Nt.bindFramebuffer(I.READ_FRAMEBUFFER,mt.__webglFramebuffer),Nt.bindFramebuffer(I.DRAW_FRAMEBUFFER,Wt.__webglFramebuffer);for(let Vt=0;Vt<Et;Vt++)$&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Lt.get(w).__webglTexture,H,Gt+Vt),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Lt.get(B).__webglTexture,ft,ze+Vt)),I.blitFramebuffer(Yt,Xt,wt,Dt,ae,we,wt,Dt,I.DEPTH_BUFFER_BIT,I.NEAREST);Nt.bindFramebuffer(I.READ_FRAMEBUFFER,null),Nt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(H!==0||w.isRenderTargetTexture||Lt.has(w)){const X=Lt.get(w),st=Lt.get(B);Nt.bindFramebuffer(I.READ_FRAMEBUFFER,$i),Nt.bindFramebuffer(I.DRAW_FRAMEBUFFER,jr);for(let mt=0;mt<Et;mt++)$?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,X.__webglTexture,H,Gt+mt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,X.__webglTexture,H),q?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,st.__webglTexture,ft,ze+mt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,st.__webglTexture,ft),H!==0?I.blitFramebuffer(Yt,Xt,wt,Dt,ae,we,wt,Dt,I.COLOR_BUFFER_BIT,I.NEAREST):q?I.copyTexSubImage3D(Fe,ft,ae,we,ze+mt,Yt,Xt,wt,Dt):I.copyTexSubImage2D(Fe,ft,ae,we,Yt,Xt,wt,Dt);Nt.bindFramebuffer(I.READ_FRAMEBUFFER,null),Nt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else q?w.isDataTexture||w.isData3DTexture?I.texSubImage3D(Fe,ft,ae,we,ze,wt,Dt,Et,Ae,qt,Ue.data):B.isCompressedArrayTexture?I.compressedTexSubImage3D(Fe,ft,ae,we,ze,wt,Dt,Et,Ae,Ue.data):I.texSubImage3D(Fe,ft,ae,we,ze,wt,Dt,Et,Ae,qt,Ue):w.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ft,ae,we,wt,Dt,Ae,qt,Ue.data):w.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ft,ae,we,Ue.width,Ue.height,Ae,Ue.data):I.texSubImage2D(I.TEXTURE_2D,ft,ae,we,wt,Dt,Ae,qt,Ue);I.pixelStorei(I.UNPACK_ROW_LENGTH,T),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,U),I.pixelStorei(I.UNPACK_SKIP_PIXELS,G),I.pixelStorei(I.UNPACK_SKIP_ROWS,N),I.pixelStorei(I.UNPACK_SKIP_IMAGES,tt),ft===0&&B.generateMipmaps&&I.generateMipmap(Fe),Nt.unbindTexture()},this.initRenderTarget=function(w){Lt.get(w).__webglFramebuffer===void 0&&re.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?re.setTextureCube(w,0):w.isData3DTexture?re.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?re.setTexture2DArray(w,0):re.setTexture2D(w,0),Nt.unbindTexture()},this.resetState=function(){C=0,E=0,D=null,Nt.reset(),_t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ye._getDrawingBufferColorSpace(t),e.unpackColorSpace=ye._getUnpackColorSpace()}}class ro extends Me{constructor(){const t=ro.SkyShader,e=new Hn({name:t.name,uniforms:Xa.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:xn,depthWrite:!1});super(new Gs(1,1,1),e),this.isSky=!0}}ro.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new P},up:{value:new P(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calculation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorption + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};class D1 extends Me{constructor(t,e={}){super(t),this.isWater=!0;const n=this,s=e.textureWidth!==void 0?e.textureWidth:512,r=e.textureHeight!==void 0?e.textureHeight:512,a=e.clipBias!==void 0?e.clipBias:0,o=e.alpha!==void 0?e.alpha:1,l=e.time!==void 0?e.time:0,c=e.waterNormals!==void 0?e.waterNormals:null,h=e.sunDirection!==void 0?e.sunDirection:new P(.70707,.70707,0),d=new Jt(e.sunColor!==void 0?e.sunColor:16777215),u=new Jt(e.waterColor!==void 0?e.waterColor:8355711),f=e.eye!==void 0?e.eye:new P(0,0,0),p=e.distortionScale!==void 0?e.distortionScale:20,v=e.side!==void 0?e.side:Ti,g=e.fog!==void 0?e.fog:!1,m=new ai,y=new P,x=new P,_=new P,A=new ie,C=new P(0,0,-1),E=new xe,D=new P,S=new P,M=new xe,L=new ie,k=new vn,V=new di(s,r),Z={name:"MirrorShader",uniforms:Xa.merge([bt.fog,bt.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new ie},sunColor:{value:new Jt(8355711)},sunDirection:{value:new P(.70707,.70707,0)},eye:{value:new P},waterColor:{value:new Jt(5592405)}}]),vertexShader:`
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
				}`},J=new Hn({name:Z.name,uniforms:Xa.clone(Z.uniforms),vertexShader:Z.vertexShader,fragmentShader:Z.fragmentShader,lights:!0,side:v,fog:g});J.uniforms.mirrorSampler.value=V.texture,J.uniforms.textureMatrix.value=L,J.uniforms.alpha.value=o,J.uniforms.time.value=l,J.uniforms.normalSampler.value=c,J.uniforms.sunColor.value=d,J.uniforms.waterColor.value=u,J.uniforms.sunDirection.value=h,J.uniforms.distortionScale.value=p,J.uniforms.eye.value=f,n.material=J,n.onBeforeRender=function(Y,z,O){if(x.setFromMatrixPosition(n.matrixWorld),_.setFromMatrixPosition(O.matrixWorld),A.extractRotation(n.matrixWorld),y.set(0,0,1),y.applyMatrix4(A),D.subVectors(x,_),D.dot(y)>0)return;D.reflect(y).negate(),D.add(x),A.extractRotation(O.matrixWorld),C.set(0,0,-1),C.applyMatrix4(A),C.add(_),S.subVectors(x,C),S.reflect(y).negate(),S.add(x),k.position.copy(D),k.up.set(0,1,0),k.up.applyMatrix4(A),k.up.reflect(y),k.lookAt(S),k.far=O.far,k.updateMatrixWorld(),k.projectionMatrix.copy(O.projectionMatrix),L.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),L.multiply(k.projectionMatrix),L.multiply(k.matrixWorldInverse),m.setFromNormalAndCoplanarPoint(y,x),m.applyMatrix4(k.matrixWorldInverse),E.set(m.normal.x,m.normal.y,m.normal.z,m.constant);const lt=k.projectionMatrix;M.x=(Math.sign(E.x)+lt.elements[8])/lt.elements[0],M.y=(Math.sign(E.y)+lt.elements[9])/lt.elements[5],M.z=-1,M.w=(1+lt.elements[10])/lt.elements[14],E.multiplyScalar(2/E.dot(M)),lt.elements[2]=E.x,lt.elements[6]=E.y,lt.elements[10]=E.z+1-a,lt.elements[14]=E.w,f.setFromMatrixPosition(O.matrixWorld);const ot=Y.getRenderTarget(),Mt=Y.xr.enabled,jt=Y.shadowMap.autoUpdate;n.visible=!1,Y.xr.enabled=!1,Y.shadowMap.autoUpdate=!1,Y.setRenderTarget(V),Y.state.buffers.depth.setMask(!0),Y.autoClear===!1&&Y.clear(),Y.render(z,k),n.visible=!0,Y.xr.enabled=Mt,Y.shadowMap.autoUpdate=jt,Y.setRenderTarget(ot);const he=O.viewport;he!==void 0&&Y.state.viewport(he)}}}function Nc(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Le;let c=0;for(let h=0;h<i.length;++h){const d=i[h];let u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const d=[];for(let u=0;u<i.length;++u){const f=i[u].index;for(let p=0;p<f.count;++p)d.push(f.getX(p)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(const h in r){const d=hd(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let v=0;v<a[h].length;++v)f.push(a[h][v][u]);const p=hd(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}return l}function hd(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new nn(a,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const d=l/e;for(let u=0,f=h.count;u<f;u++)for(let p=0;p<e;p++){const v=h.getComponent(u,p);o.setComponent(u+d,p,v)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}const Za=12.1,xr=.1,Tr=Object.freeze({store:Object.freeze({width:4.4,depth:3.6}),nursery:Object.freeze({width:5.8,depth:5.9}),watchtower:Object.freeze({width:4.8,depth:4}),training:Object.freeze({width:5.7,depth:4.8}),palisade:Object.freeze({width:7,depth:1})}),dd=Object.freeze({x:-1.1825,z:-1.0664,yaw:0,width:7.68,depth:8.25}),rc=Object.freeze({x:-6.45,z:.43,yaw:-.5,width:4.8,depth:5.2}),ud=Object.freeze({store:Object.freeze({x:-6.0962,z:4.9054,yaw:0}),nursery:Object.freeze({x:6.5601,z:-3.869,yaw:0}),watchtower:Object.freeze({x:6.6295,z:5.3482,yaw:0}),training:Object.freeze({x:-6.2831,z:-6.0974,yaw:0}),palisade:Object.freeze({x:0,z:9.8,yaw:0})}),yu=Object.keys(Tr),Ha=i=>!!i&&typeof i=="object"&&Number.isFinite(i.x)&&Number.isFinite(i.z)&&Number.isFinite(i.yaw),L1=i=>!!i&&i.team==="ally"&&!i.destroyed&&(i.hp===void 0||Number.isFinite(i.hp)&&i.hp>0),ac=(i,t)=>!!i?.buildings?.[t],I1=i=>i>=-Math.PI&&i<=Math.PI?i:Math.atan2(Math.sin(i),Math.cos(i));function _u(i){return Object.hasOwn(ud,i)?{...ud[i]}:null}function yr(i,t,e=0){const n=Math.cos(t.yaw),s=Math.sin(t.yaw);return{x:t.x,z:t.z,u:{x:n,z:-s},v:{x:s,z:n},hx:i.width/2+e,hz:i.depth/2+e}}function U1(i){return[-1,1].flatMap(t=>[-1,1].map(e=>({x:i.x+t*i.hx*i.u.x+e*i.hz*i.v.x,z:i.z+t*i.hx*i.u.z+e*i.hz*i.v.z})))}function Qo(i,t){const e=t.x-i.x,n=t.z-i.z;for(const s of[i.u,i.v,t.u,t.v]){const r=Math.abs(e*s.x+n*s.z),a=o=>o.hx*Math.abs(o.u.x*s.x+o.u.z*s.z)+o.hz*Math.abs(o.v.x*s.x+o.v.z*s.z);if(r>=a(i)+a(t)-1e-9)return!1}return!0}function Mu(i){return U1(i).every(t=>t.x*t.x+t.z*t.z<=Za*Za+1e-9)}function kc(i,t,e){const n=a=>({valid:!1,reason:a});if(!L1(i))return n("inactive-camp");if(i.safe===!1)return n("unsafe-camp");if(!Object.hasOwn(Tr,t))return n("unknown-building");if(ac(i,t))return n("already-owned");if(!Ha(e))return n("invalid-position");const s=yr(Tr[t],e,xr/2);if(!Mu(s))return n("outside-courtyard");const r=yr(dd,dd,xr/2);if(Qo(s,r)||Qo(s,yr(rc,rc,xr/2)))return n("overlap-core");for(const a of yu){if(!ac(i,a))continue;const o=i.buildingPlacements?.[a];if(a==="palisade"&&!Ha(o))continue;const l=Ha(o)?o:_u(a);if(Qo(s,yr(Tr[a],l,xr/2)))return n("overlap-building")}return{valid:!0,reason:""}}function N1(i){const t=i?.buildingPlacements;if(!t||typeof t!="object"||Array.isArray(t))return{};const e={};for(const r of yu){const a=t[r];if(!ac(i,r)||!Ha(a)||Math.abs(a.x)>Za||Math.abs(a.z)>Za)continue;const o={x:a.x,z:a.z,yaw:I1(a.yaw)};Mu(yr(Tr[r],o,xr/2))&&(e[r]=o)}const n={},s={...i,team:"ally",hp:Math.max(1,Number.isFinite(i?.hp)?i.hp:350),destroyed:!1,safe:!0,buildingPlacements:e};for(const[r,a]of Object.entries(e)){const o={...s,buildings:{...i.buildings,[r]:!1}};kc(o,r,a).valid&&(n[r]=a)}return n}const Ee=Math.PI*2,sn=2.15,Pa=12.3,_r=_i.clamp,Cs=(i,t,e)=>(e=_r((e-i)/(t-i),0,1),e*e*(3-2*e));function as(i){return()=>{i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const tl=(i,t)=>Math.sin(i*.213+Math.sin(t*.137)*1.9)*.48+Math.sin(t*.329-i*.079)*.27+Math.cos(i*.741+t*.533)*.13,an=i=>new Jt(i),Ut=new Be;new P(0,1,0);function Fc(i,t,e=1){const n=document.createElement("canvas");n.width=n.height=i,t(n.getContext("2d"),i);const s=new ou(n);return s.colorSpace=Sn,s.wrapS=s.wrapT=zs,s.repeat.set(e,e),s.anisotropy=4,s}function el(i,t=!1){const e=as(i);return Fc(256,(n,s)=>{n.fillStyle=t?"#6c7155":"#8b8978",n.fillRect(0,0,s,s);for(let r=0;r<15e3;r++){const a=e()*s,o=e()*s,l=45+e()*110;n.fillStyle=t?`rgba(${l*.8},${l},${l*.61},${.12+e()*.28})`:`rgba(${l*1.06},${l},${l*.85},${.15+e()*.3})`,n.fillRect(a,o,.5+e()*3,.5+e()*3)}n.lineWidth=.7;for(let r=0;r<26;r++){n.strokeStyle=`rgba(31,36,28,${.06+e()*.15})`,n.beginPath();let a=e()*s;n.moveTo(0,a);for(let o=0;o<s;o+=10)a+=(e()-.5)*9,n.lineTo(o,a);n.stroke()}},1)}function k1(i){const t=as(i);return Fc(512,(e,n)=>{const s=e.createRadialGradient(n*.5,n*.5,4,n*.5,n*.5,n*.54);s.addColorStop(0,"#588a39"),s.addColorStop(.6,"#6ca04a"),s.addColorStop(1,"#345d27"),e.fillStyle=s,e.fillRect(0,0,n,n);for(let r=0;r<9e3;r++)e.fillStyle=t()>.5?"rgba(185,214,109,.08)":"rgba(18,58,20,.06)",e.fillRect(t()*n,t()*n,t()*4+1,t()*4+1);for(let r=.18;r<Ee-.18;r+=.31){const a=n*.5+Math.cos(r)*n*.49,o=n*.5+Math.sin(r)*n*.49;e.strokeStyle="rgba(191,204,117,.42)",e.lineWidth=1.8,e.beginPath(),e.moveTo(n*.5,n*.5),e.quadraticCurveTo(n*.5+Math.cos(r+.08)*n*.28,n*.5+Math.sin(r+.08)*n*.28,a,o),e.stroke();for(let l=.2;l<.9;l+=.15)for(const c of[-1,1])e.strokeStyle="rgba(186,211,124,.19)",e.lineWidth=.8,e.beginPath(),e.moveTo(n*.5+Math.cos(r)*n*l*.5,n*.5+Math.sin(r)*n*l*.5),e.lineTo(n*.5+Math.cos(r+c*.12)*n*(l+.1)*.5,n*.5+Math.sin(r+c*.12)*n*(l+.1)*.5),e.stroke()}for(let r=0;r<13;r++){const a=t()*Ee,o=t()*n*.45;e.fillStyle="rgba(42,56,17,.16)",e.beginPath(),e.ellipse(n*.5+Math.cos(a)*o,n*.5+Math.sin(a)*o,t()*5+2,t()*3+1,a,0,Ee),e.fill()}})}function F1(i){const e=document.createElement("canvas");e.width=e.height=256;const n=e.getContext("2d"),s=n.createImageData(256,256);for(let a=0;a<256;a++)for(let o=0;o<256;o++){const l=(a*256+o)*4,c=o*Ee/256,h=a*Ee/256,d=Math.cos(c*9+h*7)*.27+Math.cos(c*17-h*11)*.14+Math.sin(c*31+h*19)*.07,u=Math.sin(c*7+h*13)*.27+Math.sin(c*19-h*9)*.13+Math.cos(c*29+h*23)*.08;s.data[l]=128+d*110,s.data[l+1]=128+u*110,s.data[l+2]=245,s.data[l+3]=255}n.putImageData(s,0,0);const r=new ou(e);return r.wrapS=r.wrapT=zs,r.colorSpace=Mi,r}function oc(i,t,e=.1,n=1){const s=as(n),r=i.attributes.position,a=new Float32Array(r.count*3),o=an(t);for(let l=0;l<r.count;l++){const c=1+(s()-.5)*e;a[l*3]=o.r*c,a[l*3+1]=o.g*c,a[l*3+2]=o.b*c}return i.setAttribute("color",new nn(a,3)),i}function Ne(i,t,e,n=12,s=0){const r=new kr(i.map(o=>new P(...o))),a=new io(r,n,t,5,!1);if(s){const o=a.attributes.position;for(let l=0;l<=n;l++){const c=r.getPointAt(l/n),h=1-s*l/n;for(let d=0;d<=5;d++){const u=l*6+d;o.setXYZ(u,c.x+(o.getX(u)-c.x)*h,c.y+(o.getY(u)-c.y)*h,c.z+(o.getZ(u)-c.z)*h)}}a.computeVertexNormals()}return new Me(a,e)}function ei(i,t=[],e=new Set){i.updateMatrixWorld(!0);const n=new ie().copy(i.matrixWorld).invert(),s=new Map;i.traverse(r=>{if(!r.isMesh||r.isInstancedMesh||e.has(r)||Array.isArray(r.material))return;const a=r.material.uuid;s.has(a)||s.set(a,{material:r.material,meshes:[]}),s.get(a).meshes.push(r)});for(const{material:r,meshes:a}of s.values()){if(a.length<2)continue;const o=a.map(h=>h.geometry.clone().applyMatrix4(new ie().multiplyMatrices(n,h.matrixWorld))),l=Nc(o,!1);for(const h of o)h.dispose();if(!l)continue;const c=new Me(l,r);c.castShadow=a.some(h=>h.castShadow),c.receiveShadow=!0,t.push(l);for(const h of a){h.removeFromParent();const d=t.indexOf(h.geometry);d>=0&&(t.splice(d,1),h.geometry.dispose())}i.add(c)}}function lr(i=1,t=1,e=.08){const n=[],s=[],r=[];for(let c=0;c<=3;c++)for(let h=0;h<=40;h++){const d=c/3,u=.22+h/40*(Ee-.44),f=1+.027*Math.sin(u*7)+.016*Math.cos(u*13),p=Math.cos(u)*d*f,v=Math.sin(u)*d*f;n.push(p*i,e*(d*d)+.014*Math.sin(u*4)*d*d,v*t),s.push(p*.48+.5,v*.48+.5)}for(let c=0;c<3;c++)for(let h=0;h<40;h++){const d=c*41+h,u=d+40+1;r.push(d,d+1,u,u,d+1,u+1)}const l=new Le;return l.setAttribute("position",new ce(n,3)),l.setAttribute("uv",new ce(s,2)),l.setIndex(r),l.computeVertexNormals(),l}function nl(i){const t=as(i),e=28,n=[[-.47,.57],[-.2,.91],[.15,1],[.52,.86],[.71,.61],[.76,.08]],s=[],r=[],a=[],o=Array.from({length:e+1},(h,d)=>.87+.12*Math.sin(d*1.51+i)+t()*.12);o[e]=o[0];for(let h=0;h<n.length;h++)for(let d=0;d<=e;d++){const u=d/e*Ee,f=n[h][1]*o[d],p=(Math.sin(u*5+i)+Math.sin(u*9-i))*.045;s.push(Math.cos(u)*f,n[h][0]+p*(h===5?.15:1),Math.sin(u)*f*.86),r.push(Math.cos(u)*f*.5+.5,Math.sin(u)*f*.5+.5)}for(let h=0;h<n.length-1;h++)for(let d=0;d<e;d++){const u=h*(e+1)+d,f=u+e+1;a.push(u,f,u+1,u+1,f,f+1)}const l=s.length/3;s.push(0,.764,0),r.push(.5,.5);for(let h=0;h<e;h++)a.push(l,(n.length-1)*(e+1)+h+1,(n.length-1)*(e+1)+h);const c=new Le;return c.setAttribute("position",new ce(s,3)),c.setAttribute("uv",new ce(r,2)),c.setIndex(a),c.computeVertexNormals(),c}function bu(i){const t=as(i),e=[],n=[],s=[],r=[];for(let o=0;o<5;o++){const l=t()*Ee,c=.55+t()*.7,h=.1+t()*.35,d=.022+t()*.035,u=an(o%2?"#819c42":"#526f33"),f=e.length/3;for(let p=0;p<=7;p++){const v=p/7,g=Math.cos(l)*h*v*v,m=Math.sin(l)*h*v*v,y=d*Math.sin(Math.PI*(v*.94+.04));for(const x of[-1,1])e.push(g+Math.cos(l+Math.PI/2)*y*x,v*c,m+Math.sin(l+Math.PI/2)*y*x),n.push(x*.5+.5,v),r.push(u.r*(.65+v*.35),u.g*(.65+v*.35),u.b*(.65+v*.35))}for(let p=0;p<7;p++){const v=f+p*2;s.push(v,v+1,v+2,v+1,v+3,v+2)}}const a=new Le;return a.setAttribute("position",new ce(e,3)),a.setAttribute("uv",new ce(n,2)),a.setAttribute("color",new ce(r,3)),a.setIndex(s),a.computeVertexNormals(),a}function z1(){const i=new io(new kr([new P,new P(.03,.8,.015),new P(.1,1.8,.04)]),9,.013,5,!1);oc(i,"#64754a",.15,8);const t=new no(1,7,7);t.scale(.065,.25,.065),t.translate(.1,1.61,.04),oc(t,"#5d3f27",.3,5);const e=bu(92);e.scale(.8,1.45,.8);const n=Nc([i,t,e],!1);return i.dispose(),t.dispose(),e.dispose(),n}function O1(i){const t=new no(1,13,9),e=t.attributes.position;for(let n=0;n<e.count;n++){const s=e.getX(n),r=e.getY(n),a=e.getZ(n),o=1+.06*Math.sin(s*12+i)*Math.sin(a*13-r*7);e.setXYZ(n,s*o,r*.83*o,a*o)}return t.computeVertexNormals(),t}function B1(){const i=[],t=[],e=[];function n(r,a,o,l){const c=i.length/3;i.push(...r,...a,...o);const h=an(l);for(let d=0;d<3;d++)t.push(h.r,h.g,h.b);e.push(c,c+1,c+2)}n([0,.025,-.1],[-.045,0,0],[0,.04,.09],"#16201b"),n([0,.025,-.1],[0,.04,.09],[.045,0,0],"#293327"),n([0,0,0],[-.17,.025,-.035],[-.12,.015,.07],"#a0b3b0"),n([0,0,0],[.12,.015,.07],[.17,.025,-.035],"#a0b3b0");const s=new Le;return s.setAttribute("position",new ce(i,3)),s.setAttribute("color",new ce(t,3)),s.setIndex(e),s.computeVertexNormals(),s}function H1(i,t,e={}){const n=e.seed??731,s=as(n),r=new Oe;r.name="The living creek",i.add(r);const a=[],o=[],l=new Set,c=new Set,h=[],d=new Map,u=6;let f=null;new Jt("#8aaab0");const p=new Jt("#819e91");i.fog||(i.fog=new to(p,.0042));const v=el(n),g=el(n+9,!0),m=k1(n),y=F1();h.push(v,g,m,y);const x={terrain:new tn({color:16777215,vertexColors:!0,map:g,roughness:1}),leaf:new tn({color:"#b5d28f",map:m,roughness:.44,metalness:.025,side:Xe}),rock:new tn({color:"#a4a292",map:v,roughness:.89}),mossRock:new tn({color:"#89976c",map:g,roughness:.94}),plant:new tn({color:16777215,vertexColors:!0,roughness:.87,side:Xe}),bark:new tn({color:"#65513a",map:v,roughness:.94}),reed:new tn({color:"#b4a676",map:v,roughness:.83}),compost:new tn({color:"#57422e",map:g,roughness:1}),fruit:new tn({color:"#b38539",map:v,roughness:.75}),darkFruit:new tn({color:"#685831",map:g,roughness:.95})},_=[nl(7),nl(35),nl(89)],A=lr(),C=O1(19),E=[{id:"home",x:8,z:8,radius:7.4,team:"neutral",name:"Willow Haven"},{id:"mudfang",x:-31,z:-30,radius:7,team:"enemy",name:"Mudfang Den"},{id:"redreed",x:31,z:-56,radius:7.6,team:"enemy",name:"Red Reed Stronghold"},{id:"mossjaw",x:-24,z:49,radius:7.1,team:"enemy",name:"Mossjaw Hollow"},{id:"blackpool",x:34,z:79,radius:8,team:"enemy",name:"Blackwater Nest"},{id:"thornback",x:-8,z:-91,radius:8,team:"enemy",name:"Thornback Root"},{id:"oldwillow",x:-38,z:96,radius:7.5,team:"enemy",name:"Old Willow Court"},{id:"quietbend",x:29,z:32,radius:6.8,team:"neutral",name:"Quiet Bend"},{id:"foxglove",x:-39,z:2,radius:6.8,team:"neutral",name:"Foxglove Island"}];for(const T of E)T.radius=Math.max(15,T.radius*2.1);function D(T,U){const G=Math.sin(U*.032)*15+Math.sin(U*.073)*5,N=Math.abs(T-G);let tt=-2.2+tl(T,U)*.47+Cs(44,71,N)*6;tt+=Cs(105,132,Math.abs(U))*4.8;for(const $ of E){const q=T-$.x,X=U-$.z,st=Math.hypot(q,X),mt=$.radius*(1+.06*Math.sin(Math.atan2(X,q)*5+$.x));if(st<mt+3.8){const Wt=.39+tl(T*1.7,U*1.7)*.07-Cs(mt*.65,mt+3.8,st)*2.8;tt=Math.max(tt,Wt)}}return tt}const S=new is(270,270,180,180);S.rotateX(-Math.PI/2);const M=S.attributes.position,L=new Float32Array(M.count*3),k=an("#8b8a62"),V=an("#43533b"),Z=an("#52634e");for(let T=0;T<M.count;T++){const U=M.getX(T),G=M.getZ(T),N=D(U,G);M.setY(T,N);const tt=Z.clone().lerp(V,Cs(-1.7,.05,N)).lerp(k,Cs(.02,2,N));tt.multiplyScalar(.88+tl(U*2,G*2)*.18),tt.toArray(L,T*3)}S.setAttribute("color",new nn(L,3)),S.computeVertexNormals(),g.repeat.set(44,44);const J=new Me(S,x.terrain);J.receiveShadow=!0,r.add(J);const Y=el(n+9,!0);h.push(Y),x.mossRock.map=Y,x.compost.map=Y,x.darkFruit.map=Y;const z=new is(266,266,88,88),O=new D1(z,{textureWidth:512,textureHeight:512,waterNormals:y,sunDirection:new P(.6,.8,-.3),sunColor:16771517,waterColor:3039835,distortionScale:2.5,alpha:.91,fog:!0});O.name="Reflecting creek",O.rotation.x=-Math.PI/2,O.position.y=-.035,O.material.transparent=!0,O.material.depthWrite=!1,O.renderOrder=-2,O.material.uniforms.size.value=4.8,r.add(O);const lt=z.attributes.position.array.slice(),ot=[],Mt=new Oe,jt=[];Mt.name="Willow trunks and tangled roots",r.add(Mt);for(let T of[-1,1])for(let U=0;U<15;U++){const G=-122+U*17+(s()-.5)*7,N=T*(59+s()*15)+Math.sin(G*.032)*15,tt=D(N,G);if(tt<.2)continue;const $=new Oe;$.position.set(N,tt,G);const q=9+s()*14,X=(s()-.5)*3,st=Ne([[0,-.8,0],[.25,q*.3,0],[X,q*.72,.6],[X*.8,q,1]],.68+s()*.65,x.bark,13,.72);st.castShadow=!0,$.add(st),ot.push(st.geometry);for(let mt=0;mt<5;mt++){const Wt=mt/5*Ee+s(),Vt=3+s()*4,Qt=Ne([[0,.7,0],[Math.cos(Wt)*Vt*.45,.1,Math.sin(Wt)*Vt*.45],[Math.cos(Wt)*Vt,-.4,Math.sin(Wt)*Vt]],.15+s()*.2,x.bark,9,.82);Qt.castShadow=!0,$.add(Qt),ot.push(Qt.geometry)}for(let mt=0;mt<4;mt++){const Wt=s()*Ee,Vt=q*(.5+s()*.3),Qt=3+s()*6,fe=Ne([[X*.4,Vt,0],[Math.cos(Wt)*Qt*.45,Vt+2,Math.sin(Wt)*Qt*.45],[Math.cos(Wt)*Qt,Vt+3,Math.sin(Wt)*Qt]],.16+s()*.2,x.bark,10,.83);$.add(fe),ot.push(fe.geometry);for(let Ce=0;Ce<70;Ce++){const Te=Math.sqrt(s())*4,Ge=s()*Ee;jt.push({x:N+Math.cos(Wt)*Qt+Math.cos(Ge)*Te,y:tt+Vt+3+(s()-.5)*3-Math.abs(Te)*.25,z:G+Math.sin(Wt)*Qt+Math.sin(Ge)*Te,angle:s()*Ee,scale:.65+s()*.6})}}Mt.add($)}ei(Mt,ot);const he=new Le;he.setAttribute("position",new ce([0,0,0,-.12,-.32,.035,0,-.38,.06,.12,-.32,.035,-.1,-.64,.02,0,-.76,.04,.1,-.64,.02,0,-1.05,0],3)),he.setAttribute("uv",new ce([.5,0,0,.3,.5,.35,1,.3,0,.6,.5,.7,1,.6,.5,1],2)),he.setIndex([0,1,2,0,2,3,1,4,2,2,4,5,2,5,6,2,6,3,4,7,5,5,7,6]),he.computeVertexNormals(),oc(he,"#69834d",.25,n);const _e=new Fn(he,x.plant,jt.length);_e.name="Hanging willow foliage",jt.forEach((T,U)=>{Ut.position.set(T.x,T.y,T.z),Ut.rotation.set((s()-.5)*.8,T.angle,(s()-.5)*.7),Ut.scale.setScalar(T.scale),Ut.updateMatrix(),_e.setMatrixAt(U,Ut.matrix)}),r.add(_e);function Ht(T){a.push(T);const U=Math.floor((T.x-T.radius)/u),G=Math.floor((T.x+T.radius)/u),N=Math.floor((T.z-T.radius)/u),tt=Math.floor((T.z+T.radius)/u);for(let $=U;$<=G;$++)for(let q=N;q<=tt;q++){const X=$+":"+q;d.has(X)||d.set(X,[]),d.get(X).push(T)}return T}const Q=[],nt=[[],[],[]];function vt(T,U,G=1.35+s()*.9){const N=Ht({id:"p"+a.length,type:"lily",x:T,z:U,y:.105,radius:G*.91,visualRadius:G,angle:s()*Ee,phase:s()*Ee});return Q.push(N),N}function gt(T,U,G=1.3+s()*1.3,N=.65+s()*.65){const tt=Math.floor(s()*3),$=Ht({id:"p"+a.length,type:"rock",x:T,z:U,y:N*.76-.05,radius:G*.72,visualRadius:G,scaleY:N,angle:s()*Ee,variant:tt});return nt[tt].push($),$}vt(0,0,3.1),vt(3.7,1,2.3),gt(-3.9,2.2,2.5,.9);function At(T,U){const G=Math.hypot(U.x-T.x,U.z-T.z),N=Math.ceil(G/3.65);for(let tt=1;tt<N;tt++){const $=tt/N,q=T.x+(U.x-T.x)*$+Math.sin($*Math.PI*3)*1.25,X=T.z+(U.z-T.z)*$;D(q,X)>-.1||(s()<.18?gt(q,X,1.8+s()*.7,.65+s()*.55):vt(q,X,1.65+s()*.65))}}const se={x:0,z:0};At(se,E[0]);for(const T of E)At(se,T);for(let T=1;T<E.length;T++)At(E[T-1],E[T]);for(let T=0;T<670;T++){const U=(s()-.5)*218,G=(s()-.5)*108+Math.sin(U*.032)*10;D(G,U)>-.18||(d.get(Math.floor(G/u)+":"+Math.floor(U/u))||[]).some(tt=>Math.hypot(tt.x-G,tt.z-U)<tt.radius+1)||(s()<.15?gt(G,U,1.1+s()*2.3,.55+s()*1.2):vt(G,U,1.1+s()*1.1))}for(const T of E)Ht({id:"island-"+T.id,type:"land",x:T.x,z:T.z,y:.39,radius:T.radius*.8});const be=new Fn(A,x.leaf,Q.length);be.name="Veined water lily leaves",be.castShadow=!0,be.receiveShadow=!0,be.instanceMatrix.setUsage(Fi),Q.forEach((T,U)=>{Ut.position.set(T.x,T.y,T.z),Ut.rotation.set((s()-.5)*.04,T.angle,(s()-.5)*.035),Ut.scale.set(T.visualRadius,1,T.visualRadius*(.89+s()*.18)),Ut.updateMatrix(),be.setMatrixAt(U,Ut.matrix),be.setColorAt(U,an(["#b6cf8a","#88ac67","#749d59","#c0cc7e","#729958"][Math.floor(s()*5)]))}),r.add(be),nt.forEach((T,U)=>{const G=new Fn(_[U],U===1?x.mossRock:x.rock,T.length);G.name="Weathered waterline outcrops",G.castShadow=!0,G.receiveShadow=!0,T.forEach((N,tt)=>{Ut.position.set(N.x,-.05,N.z),Ut.rotation.set(0,N.angle,0),Ut.scale.set(N.visualRadius,N.scaleY,N.visualRadius),Ut.updateMatrix(),G.setMatrixAt(tt,Ut.matrix),G.setColorAt(tt,an("#ffffff").multiplyScalar(.7+s()*.4))}),r.add(G)});const I=new Le,Se=[],te=[],Zt=[];for(let T=0;T<=9;T++){const U=T/9,G=Math.sin(U*Math.PI)*.16;for(const N of[-1,1])Se.push(N*G,.13*Math.sin(U*Math.PI)+.23*U*U,U*.65),te.push(N*.5+.5,U)}for(let T=0;T<9;T++){const U=T*2;Zt.push(U,U+1,U+2,U+1,U+3,U+2)}I.setAttribute("position",new ce(Se,3)),I.setAttribute("uv",new ce(te,2)),I.setIndex(Zt),I.computeVertexNormals();const Nt=new tn({color:"#f4e5d5",roughness:.48,side:Xe}),Ie=Q.filter((T,U)=>U%23===5),Lt=new Fn(I,Nt,Ie.length*13);let re=0;for(const T of Ie)for(let U=0;U<13;U++)Ut.position.set(T.x+.24,T.y+.045,T.z),Ut.rotation.set(U>7?.1:0,U/8*Ee,U>7?.1:0),Ut.scale.setScalar(U>7?.67:1),Ut.updateMatrix(),Lt.setMatrixAt(re++,Ut.matrix);r.add(Lt);const He=[];for(let T=0;T<21500;T++){const U=(s()-.5)*254,G=(s()-.5)*254,N=D(U,G);N<-.52||N>3.2||E.some(tt=>Math.hypot(tt.x-U,tt.z-G)<tt.radius*.68)||Math.hypot(U,G)<8||He.push({x:U,z:G,y:N,scale:.65+s()*2.2,angle:s()*Ee})}const Ve=bu(44),R=new Fn(Ve,x.plant,He.length);R.name="Curved river reeds",R.receiveShadow=!0,He.forEach((T,U)=>{Ut.position.set(T.x,T.y,T.z),Ut.rotation.set(0,T.angle,0),Ut.scale.set(.65+T.scale*.25,T.scale,.65+T.scale*.25),Ut.updateMatrix(),R.setMatrixAt(U,Ut.matrix),R.setColorAt(U,an("#ffffff").multiplyScalar(.75+s()*.5))}),r.add(R);const b=He.filter((T,U)=>T.y<.5&&U%5===0),W=z1(),it=new Fn(W,x.plant,b.length);b.forEach((T,U)=>{Ut.position.set(T.x+.12,T.y,T.z),Ut.rotation.set(0,T.angle,0),Ut.scale.setScalar(.7+T.scale*.4),Ut.updateMatrix(),it.setMatrixAt(U,Ut.matrix)}),r.add(it);const ct={value:0};x.plant.onBeforeCompile=T=>{T.uniforms.uCreekTime=ct,T.vertexShader=`uniform float uCreekTime;
`+T.vertexShader,T.vertexShader=T.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 transformed.x += sin(uCreekTime * 1.1 + position.y * 2.3 + instanceMatrix[3].x * .13 + instanceMatrix[3].z * .17) * pow(max(position.y, 0.0), 1.6) * .035;`)},x.plant.customProgramCacheKey=()=>"creek-wind-1";function et(T,U){let G=D(T,U),N=G>-.1?"land":"water",tt=null;G<=-.1&&(G=-.25);const $=d.get(Math.floor(T/u)+":"+Math.floor(U/u))||[];for(const q of $){if(q.type==="land")continue;const X=Math.hypot(T-q.x,U-q.z);if(X<=q.radius){let st=q.y;q.type==="rock"&&(st-=Cs(q.radius*.62,q.radius,X)*.14*q.scaleY),st>G&&(G=st,N=q.type==="shelter"?"land":q.type,tt=q)}}return{height:G,type:N,platform:tt}}function Ft(T,U){return et(T,U).height}const xt=[{x:4.5,z:-4,rich:!1},{x:-10,z:12,rich:!0},{x:15,z:-20,rich:!1},{x:-25,z:-23,rich:!0},{x:26,z:-47,rich:!0},{x:-17,z:40,rich:!0},{x:27,z:69,rich:!0},{x:-4,z:-81,rich:!0},{x:-34,z:86,rich:!0},{x:23,z:26,rich:!1},{x:-33,z:7,rich:!1},{x:4,z:51,rich:!1},{x:9,z:-59,rich:!1},{x:-12,z:76,rich:!1},{x:39,z:-4,rich:!1},{x:-42,z:-59,rich:!0}],It=[],zt=[],pt=new Oe;r.add(pt);for(let T=0;T<xt.length;T++){const U=xt[T];D(U.x,U.z)<-.15&&gt(U.x,U.z,U.rich?3.2:2.2,.62);const N=Ft(U.x,U.z),tt={id:"flies-"+T,x:U.x,z:U.z,y:N+.25,flies:U.rich?240:100,maxFlies:U.rich?240:100,rich:U.rich};o.push(tt);const $=new Me(_[T%3],x.compost);$.position.set(U.x,N+.05,U.z),$.scale.set(U.rich?1.7:1.05,.28,U.rich?1.25:.75),$.rotation.y=s()*Ee,r.add($);for(let q=0;q<(U.rich?12:6);q++){const X=s()*Ee,st=s()*(U.rich?1.5:.85);It.push({x:U.x+Math.cos(X)*st,y:N+.12+s()*.16,z:U.z+Math.sin(X)*st,scale:.12+s()*.18,rot:s()*Ee})}for(let q=0;q<3;q++){const X=s()*Ee,st=.7+s()*.8,mt=Ne([[0,0,0],[st*.5,.02,.06],[st,.04,.14]],.035,x.bark,4);mt.position.set(U.x+(s()-.5)*1.6,N+.1,U.z+(s()-.5)*1.6),mt.rotation.y=X,pt.add(mt),zt.push(mt.geometry)}}ei(pt,zt);for(const T of xt)if(D(T.x,T.z)<-.15){const U=nt.flat().find(G=>Math.abs(G.x-T.x)<.01&&Math.abs(G.z-T.z)<.01);if(U){const G=new Me(_[U.variant],x.mossRock);G.position.set(U.x,-.05,U.z),G.rotation.y=U.angle,G.scale.set(U.visualRadius,U.scaleY,U.visualRadius),G.castShadow=!0,G.receiveShadow=!0,r.add(G)}}const St=new Fn(C,x.fruit,It.length);It.forEach((T,U)=>{Ut.position.set(T.x,T.y,T.z),Ut.rotation.set(.3,T.rot,.2),Ut.scale.setScalar(T.scale),Ut.updateMatrix(),St.setMatrixAt(U,Ut.matrix),St.setColorAt(U,an(["#cb9d59","#6d7341","#aa7044","#c5ad62"][U%4]))}),r.add(St);const $t=[];for(let T=0;T<o.length;T++)for(let U=0;U<(o[T].rich?65:30);U++)$t.push({spot:T,phase:s()*Ee,phase2:s()*Ee,r:.25+s()*(o[T].rich?2.3:1.35),height:.45+s()*1.9,speed:.65+s()*1.7,rank:U});const Ot=new tn({vertexColors:!0,roughness:.45,side:Xe}),_t=new Fn(B1(),Ot,$t.length);_t.instanceMatrix.setUsage(Fi),_t.frustumCulled=!1,_t.name="Fly swarms",r.add(_t);const ee=64,F=new is(2,2),dt=new Xp;F.rotateX(-Math.PI/2),dt.index=F.index,dt.attributes.position=F.attributes.position,dt.attributes.uv=F.attributes.uv;const yt=new Float32Array(ee*3),Ct=new Float32Array(ee).fill(-100),ut=new Float32Array(ee),at=new Float32Array(ee*3);dt.setAttribute("aCenter",new Ds(yt,3)),dt.setAttribute("aStart",new Ds(Ct,1)),dt.setAttribute("aSize",new Ds(ut,1)),dt.setAttribute("aTint",new Ds(at,3)),dt.instanceCount=ee;const Pt=new Hn({transparent:!0,depthWrite:!1,side:Xe,uniforms:{uTime:{value:0}},vertexShader:"attribute vec3 aCenter; attribute float aStart; attribute float aSize; attribute vec3 aTint; uniform float uTime; varying vec2 vUv; varying float vLife; varying vec3 vTint; void main(){vUv=uv; vLife=(uTime-aStart)/2.4; vTint=aTint; vec3 p=position*aSize*(.35+clamp(vLife,0.,1.)*3.8)+aCenter; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}",fragmentShader:"varying vec2 vUv;varying float vLife;varying vec3 vTint;void main(){if(vLife<0.||vLife>1.)discard;float r=length(vUv-.5)*2.;float band=exp(-pow((r-.82)/(.026+vLife*.018),2.))* .58+exp(-pow((r-.64)/.026,2.))*.22;float a=band*pow(1.-vLife,1.6);gl_FragColor=vec4(vTint,a);}"}),ne=new Me(dt,Pt);ne.frustumCulled=!1,ne.renderOrder=2,r.add(ne);let Pe=0,ge=0;const hn=1100,dn=new Float32Array(hn*3),Xs=new Float32Array(hn*3),Kn=new Float32Array(hn),Ai=new Float32Array(hn),qs=Array.from({length:hn},()=>({life:0,max:1,vx:0,vy:0,vz:0,water:!0}));let $r=0;const Tn=new Le;Tn.setAttribute("position",new nn(dn,3).setUsage(Fi)),Tn.setAttribute("aColor",new nn(Xs,3).setUsage(Fi)),Tn.setAttribute("aSize",new nn(Kn,1).setUsage(Fi)),Tn.setAttribute("aAlpha",new nn(Ai,1).setUsage(Fi));const Xr=new Hn({transparent:!0,depthWrite:!1,uniforms:{uScale:{value:500}},vertexShader:"attribute vec3 aColor;attribute float aSize;attribute float aAlpha;uniform float uScale;varying vec3 vColor;varying float vAlpha;void main(){vColor=aColor;vAlpha=aAlpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*uScale/max(.1,-mv.z),1.,35.);}",fragmentShader:"varying vec3 vColor;varying float vAlpha;void main(){vec2 p=gl_PointCoord-.5;float d=length(p)*2.;if(d>1.)discard;float shade=.6+.4*max(0.,1.-length(p-vec2(-.12,.12))*2.);gl_FragColor=vec4(vColor*shade,smoothstep(1.,.55,d)*vAlpha);}"}),Ci=new Tp(Tn,Xr);Ci.frustumCulled=!1,Ci.renderOrder=3,r.add(Ci);function qr(T,U,G){const N=Pe++%ee;yt.set([T.x,Math.max(-.005,T.y+.025),T.z],N*3),Ct[N]=ge,ut[N]=.7+U*.7,an(G??"#c2e1d5").toArray(at,N*3);for(const $ of["aCenter","aStart","aSize","aTint"])dt.attributes[$].needsUpdate=!0}function Ys(T,U,G,N){const tt=Math.min(90,Math.round(18+U*21)),$=an(G??(N?"#b2d7ce":"#d5bc80"));for(let q=0;q<tt;q++){const X=$r++%hn,st=qs[X],mt=s()*Ee,Wt=(.6+s()*2.7)*Math.sqrt(U);st.life=st.max=.5+s()*.8,st.vx=Math.cos(mt)*Wt,st.vz=Math.sin(mt)*Wt,st.vy=(1.5+s()*4)*Math.sqrt(U),st.water=N,dn.set([T.x+(s()-.5)*.3,(T.y??0)+.12,T.z+(s()-.5)*.3],X*3),$.clone().multiplyScalar(.85+s()*.3).toArray(Xs,X*3),Kn[X]=(.045+s()*.085)*(N?1:.8),Ai[X]=.9}Tn.attributes.aColor.needsUpdate=!0,Tn.attributes.aSize.needsUpdate=!0}function co(T,U=1,G){U=_r(U,.1,4),qr({x:T.x,y:.01,z:T.z},U,G),Ys({x:T.x,y:.03,z:T.z},U,G,!0)}function ho(T,U="#e9cb87",G=1){Ys(T,G,U,!1)}function Yr(T,U,G,N=1){const tt=[],$=[],q=[],X=[],st=as(N),mt=16,Wt=20;for(let Qt=0;Qt<=mt;Qt++)for(let fe=0;fe<=Wt;fe++){const Ce=fe/Wt*2-1,Te=Qt/mt,Ge=.5+Math.sqrt(Math.max(0,1-Ce*Ce))*G+.06*Math.sin(Te*23+Ce*5),un=Ce*T*(.97+.025*Math.sin(Te*19));tt.push(un,Ge,(Te-.5)*U),$.push(fe/Wt,Qt/mt),an("#809549").multiplyScalar(.85+st()*.23).toArray(X,X.length)}for(let Qt=0;Qt<mt;Qt++)for(let fe=0;fe<Wt;fe++){const Ce=Qt*(Wt+1)+fe,Te=Ce+Wt+1;q.push(Ce,Te,Ce+1,Te,Te+1,Ce+1)}const Vt=new Le;return Vt.setAttribute("position",new ce(tt,3)),Vt.setAttribute("uv",new ce($,2)),Vt.setAttribute("color",new ce(X,3)),Vt.setIndex(q),Vt.computeVertexNormals(),Vt}function js(T,U,G){const N=new Oe,tt=new tn({color:"#a6bf76",map:m,vertexColors:!0,roughness:.78,side:Xe});G.push(tt);const $=Yr(1.75,3.8,1.95,n+Math.round(T*7));G.push($);const q=new Me($,tt);q.castShadow=!0,q.receiveShadow=!0,N.add(q);for(let X=0;X<8;X++){const st=-1.85+X*.53,mt=[];for(let Vt=0;Vt<=12;Vt++){const Qt=Vt/12*Math.PI;mt.push([Math.cos(Qt)*1.75,.5+Math.sin(Qt)*1.96+.025,st+.025*Math.sin(Qt*4)])}const Wt=Ne(mt,.038,x.reed,18);G.push(Wt.geometry),N.add(Wt)}for(let X of[-1,1])for(let st=0;st<5;st++){const mt=-1.6+st*.8,Wt=Ne([[X*1.68,-.08,mt],[X*1.7,.45,mt],[X*1.38,1.5,mt]],.052,x.bark,5);G.push(Wt.geometry),N.add(Wt)}for(let X=0;X<7;X++){const st=.16+X*.12,mt=Ne([[-1.65,st,-1.8],[0,st+.025,-1.88],[1.65,st,-1.8]],.036,x.reed,8);G.push(mt.geometry),N.add(mt)}return ei(N,G,new Set([q])),N.scale.setScalar(T),N.userData.roof=q,N}const $i={player:"#8ecf75",friendly:"#8ecf75",ally:"#8ecf75",enemy:"#cf7554",neutral:"#ceb785"};function jr(T){if(typeof T=="string"&&T.startsWith("enemy")){const U=["#e8aa70","#d8786b","#b9ad81","#a9a0d4","#8dc2b8"],G=parseInt(T.replace(/\D/g,""),10)||0;return U[G%U.length]}return $i[T]||$i.neutral}const w=new Map;function B(T){if(w.has(T))return w.get(T);const U=["player","ally","friendly"].includes(T),G=T==="neutral",N=(parseInt(String(T).replace(/\D/g,""),10)||0)%5,tt=Fc(256,($,q)=>{$.fillStyle="#eee9cb",$.fillRect(0,0,q,q);for(let st=0;st<256;st+=4)$.fillStyle=st%8?"#ded9bd":"#f3eed3",$.fillRect(st,0,1,q),$.fillRect(0,st,q,1);$.save(),$.translate(38,23),$.scale(2.8,2.8),$.fillStyle=U?"#194333":G?"#494633":"#472c29",$.strokeStyle="#fff2c9",$.lineWidth=2,$.beginPath(),$.moveTo(32,3),$.lineTo(59,14),$.lineTo(56,44),$.quadraticCurveTo(53,55,32,68),$.quadraticCurveTo(11,55,8,44),$.lineTo(5,14),$.closePath(),$.fill(),$.stroke(),$.lineWidth=3.2,$.lineCap="round",$.lineJoin="round";const X=st=>{$.beginPath(),st.forEach((mt,Wt)=>Wt?$.lineTo(...mt):$.moveTo(...mt)),$.stroke()};if(U)$.beginPath(),$.moveTo(43,20),$.bezierCurveTo(28,17,18,26,21,38),$.bezierCurveTo(24,48,35,47,40,37),$.bezierCurveTo(43,30,40,24,43,20),$.stroke(),X([[20,51],[37,27]]),X([[28,40],[23,32]]),X([[32,35],[39,34]]);else if(G)X([[24,27],[32,19],[40,27]]),X([[32,19],[32,49]]),X([[23,40],[32,49],[41,40]]);else if(N===0)X([[20,19],[27,31],[22,44]]),X([[44,19],[37,31],[42,44]]),X([[28,46],[36,46]]);else if(N===1)X([[22,18],[18,36],[32,49],[46,36],[42,18]]),X([[25,30],[32,36],[39,30]]);else if(N===2)for(const[st,mt]of[[21,20],[32,15],[43,20]])X([[st,mt],[st,49]]),X([[st-4,mt+6],[st+4,mt+6]]);else N===3?($.beginPath(),$.moveTo(44,17),$.bezierCurveTo(15,9,11,48,32,52),$.bezierCurveTo(39,53,44,50,47,45),$.bezierCurveTo(29,43,26,26,44,17),$.stroke()):X([[18,24],[25,30],[32,17],[39,30],[46,24],[41,46],[23,46],[18,24]]);$.restore()});return tt.wrapS=tt.wrapT=Oi,w.set(T,tt),h.push(tt),tt}function j(T,U,G=0){const N=new Oe;N.name="Woven reed courtyard and rooted foundations";const tt=5.68;for(let $=0;$<43;$++){const q=-5.58+$*.266,X=Math.sqrt(Math.max(0,tt*tt-q*q))*(.97+.02*Math.sin($*1.7)),st=Ne([[-X,-.045,q],[-X*.25,-.035,q+.022],[X*.4,-.04,q-.018],[X,-.045,q+.015]],.077,x.bark,7);st.receiveShadow=!0,U.push(st.geometry),N.add(st)}for(let $=0;$<25;$++){const q=-5.4+$*.45,X=Math.sqrt(Math.max(0,tt*tt-q*q))*.98,st=Ne([[q,.018,-X],[q+.025,.028,0],[q-.018,.02,X]],.027,x.reed,10);U.push(st.geometry),N.add(st)}for(let $=0;$<16;$++){const q=$/16*Ee,X=Math.cos(q)*5.1,st=Math.sin(q)*5.1,mt=(D(T.position.x+(X*Math.cos(G)+st*Math.sin(G))*sn,T.position.z+(st*Math.cos(G)-X*Math.sin(G))*sn)-T.position.y)/sn,Wt=Ne([[X,Math.min(-.18,mt-.15),st],[X+.03,-.35,st-.02],[X,-.08,st]],.095,x.bark,5);U.push(Wt.geometry),N.add(Wt)}ei(N,U),T.add(N),T.userData.foundation=N}function K(T,U){const G=new Oe,N=Ne([[0,0,0],[.04,1.6,0],[-.03,3.1,.02]],.047,x.bark,7);U.push(N.geometry),G.add(N);const tt=new Le,$=[0,2.93,0,.9,2.8,.09,1.13,2.12,.02,.6,2.25,-.03,0,2.18,0],q=[0,1,1,1,1,0,.5,.1,0,0];tt.setAttribute("position",new ce($,3)),tt.setAttribute("uv",new ce(q,2)),tt.setIndex([0,1,3,1,2,3,0,3,4]),tt.computeVertexNormals();const X=new tn({color:jr(T),roughness:.8,side:Xe,map:B(T)}),st=new Me(tt,X);return st.castShadow=!0,G.add(st),G.userData.flag=st,G.userData.emblemTeam=T,U.push(tt,X),G}function H(T,U={}){const G=!!U.preview,N=new Oe;N.name="Shelter "+(T.id??""),N.position.set(T.x,G?0:Ft(T.x,T.z),T.z),N.scale.setScalar(sn),N.userData.id=T.id,N.userData.radius=Pa,N.userData.owned=[];const tt=N.userData.owned;j(N,tt,Number.isFinite(T.yaw)?T.yaw:0),G||(N.userData.support=Ht({id:"shelter-"+T.id,type:"shelter",x:T.x,z:T.z,y:N.position.y+.11,radius:Pa-.2}));const $=js(1,$i[T.team],tt);$.position.set(-.55,.04,-.5),N.add($),N.userData.core=$;const q=K(T.team,tt);q.position.set(1.8,0,1.1),N.add(q),N.userData.banner=q;const X=new Oe;X.name="Additional sleeping leaves";const st=js(.62,$i[T.team],tt);st.position.set(-3,.01,.2),st.rotation.y=-.5,X.add(st),N.add(X),N.userData.extra=X;const mt=new Oe;mt.name="Hatchery";const Wt=js(.52,$i[T.team],tt);Wt.position.set(3.05,0,-1.8),Wt.rotation.y=.7,mt.add(Wt);for(let rt=0;rt<5;rt++){const Tt=[];for(let Ke=0;Ke<=24;Ke++){const Je=Ke/24*Ee;Tt.push([3.05+Math.cos(Je)*.74,.06+rt*.065,-1.7+Math.sin(Je)*.63])}const Kt=Ne(Tt,.035,x.reed,25);tt.push(Kt.geometry),mt.add(Kt)}ei(mt,tt),N.add(mt),N.userData.nursery=mt;const Vt=new Oe;Vt.name="Leaf training yard and woven sparring dummies",Vt.position.set(-2.9,.07,-3.2);for(let rt=0;rt<3;rt++){const Tt=-.82+rt*.8,Kt=rt%2?-.2:.2,Ke=new Me(lr(.46,.65,.04),x.leaf);Ke.position.set(Tt,.025,Kt+.6),Ke.rotation.y=(rt-1)*.35,tt.push(Ke.geometry),Vt.add(Ke);for(const ve of[-.21,.21]){const Rn=Ne([[Tt+ve,-.02,Kt-.25],[Tt+ve*.3,.48,Kt-.3],[Tt,.96,Kt-.25]],.035,x.bark,5);tt.push(Rn.geometry),Vt.add(Rn)}const Je=Ne([[Tt-.4,.64,Kt-.2],[Tt,.72,Kt-.28],[Tt+.4,.64,Kt-.2]],.041,x.reed,6);tt.push(Je.geometry),Vt.add(Je);for(let ve=0;ve<3;ve++){const Rn=new Me(lr(.23,.37,.15),x.leaf);Rn.position.set(Tt+(ve-1)*.06,.59,Kt-.19),Rn.rotation.set(Math.PI/2,(ve-1)*.25,(ve-1)*.3),tt.push(Rn.geometry),Vt.add(Rn)}for(const ve of[-.12,.12]){const Rn=Ne([[Tt+ve,.89,Kt-.22],[Tt+ve*1.45,1.09,Kt-.22],[Tt+ve*.5,1.07,Kt-.19],[Tt+ve,.89,Kt-.22]],.025,x.reed,10);tt.push(Rn.geometry),Vt.add(Rn)}}for(const rt of[-1.2,1.2]){const Tt=Ne([[rt,-.04,-.65],[rt*.98,.75,-.68],[rt,.98,-.65]],.04,x.bark,5);tt.push(Tt.geometry),Vt.add(Tt)}for(let rt=0;rt<2;rt++){const Tt=Ne([[-1.2,.45+rt*.28,-.65],[0,.38+rt*.28,-.7],[1.2,.45+rt*.28,-.65]],.025,x.reed,10);tt.push(Tt.geometry),Vt.add(Tt)}ei(Vt,tt),N.add(Vt),N.userData.training=Vt,N.userData.trainingPoint=new P(T.x-2.9*sn,N.position.y+.12,T.z-2.5*sn);const Qt=new Oe;Qt.name="Leaf-wrapped food cache",Qt.position.set(-2.8,.04,2.2);const fe=new Fn(C,x.fruit,15);for(let rt=0;rt<15;rt++)Ut.position.set(rt%4*.32-.5,Math.floor(rt/8)*.25+.15,Math.floor(rt/4)%2*.35),Ut.scale.setScalar(.22+rt%3*.025),Ut.rotation.set(rt*.7,rt*.4,0),Ut.updateMatrix(),fe.setMatrixAt(rt,Ut.matrix),fe.setColorAt(rt,an(rt%3?"#b7b06c":"#6d673f"));Qt.add(fe);for(let rt=0;rt<3;rt++){const Tt=Ne([[-.85,.05,-.3+rt*.45],[0,.02,-.3+rt*.45],[.85,.08,-.3+rt*.45]],.075,x.bark,5);tt.push(Tt.geometry),Qt.add(Tt)}const Ce=new Me(lr(1,.8,.23),x.leaf);Ce.position.set(0,.5,.1),Ce.rotation.z=.17,tt.push(Ce.geometry),Qt.add(Ce),ei(Qt,tt),N.add(Qt),N.userData.storage=Qt,N.userData.foodMesh=fe,N.userData.storageCover=Ce;const Te=new Oe;Te.name="Lookout perch",Te.position.set(3.1,0,2.5);for(let rt=0;rt<3;rt++){const Tt=rt/3*Ee,Kt=Ne([[Math.cos(Tt)*.7,-.1,Math.sin(Tt)*.7],[Math.cos(Tt)*.44,1.4,Math.sin(Tt)*.44],[Math.cos(Tt)*.35,2.65,Math.sin(Tt)*.35]],.085,x.bark,7);tt.push(Kt.geometry),Te.add(Kt)}for(let rt=0;rt<8;rt++){const Tt=-.6+rt*.17,Kt=Ne([[-.7,2.35,Tt],[0,2.32,Tt],[.7,2.36,Tt]],.06,x.reed,4);tt.push(Kt.geometry),Te.add(Kt)}const Ge=new Me(lr(1.1,.9,.08),x.leaf);Ge.position.y=3.15,Ge.rotation.x=.17,tt.push(Ge.geometry),Te.add(Ge);for(let rt=0;rt<6;rt++){const Tt=Ne([[-.25,rt*.34,.63],[.25,rt*.34,.63]],.035,x.reed,2);tt.push(Tt.geometry),Te.add(Tt)}ei(Te,tt),N.add(Te),N.userData.watchtower=Te;const un=new Oe;un.name="Root-and-reed defences";const Xi=[];for(let rt=0;rt<54;rt++){const Tt=rt/54*Ee;if(Math.abs(Math.sin(Tt))<.19)continue;const Kt=Math.cos(Tt)*5.2,Ke=Math.sin(Tt)*4.5,Je=.65+rt%5*.12,ve=Ne([[Kt,-.07,Ke],[Kt*1.008,Je*.6,Ke*1.008],[Kt*1.025,Je,Ke*1.025]],.055,x.bark,3);Xi.push(ve.geometry)}const Jn=Nc(Xi,!1);for(const rt of Xi)rt.dispose();const Qn=new Me(Jn,x.bark);Qn.castShadow=!0,tt.push(Jn),un.add(Qn),N.add(un),N.userData.palisade=un;const _n=new Oe;_n.name="Placeable woven timber palisade",_n.position.z=9.8/sn;for(let rt=0;rt<13;rt++){const Tt=-1.5+rt*.25,Kt=.025*Math.sin(rt*1.7),Ke=.82+rt%4*.095,Je=Ne([[Tt,-.05,Kt],[Tt+.018,.55,Kt+.02],[Tt-.015,Ke,Kt-.025]],.055,x.bark,5);tt.push(Je.geometry),_n.add(Je);for(const ve of[.34,.66]){const Rn=Ne([[Tt-.055,ve,Kt-.065],[Tt-.065,ve+.045,Kt+.08],[Tt+.055,ve+.07,Kt+.07],[Tt+.06,ve+.015,Kt-.06],[Tt-.055,ve,Kt-.065]],.016,x.reed,10);tt.push(Rn.geometry),_n.add(Rn)}}for(const rt of[.37,.69]){const Tt=Ne([[-1.55,rt,.08],[0,rt-.035,.095],[1.55,rt,.075]],.035,x.reed,14);tt.push(Tt.geometry),_n.add(Tt)}for(const rt of[-1,1]){const Tt=Ne([[rt*1.38,.12,-.09],[rt*.78,.44,-.1],[rt*.15,.79,-.085]],.041,x.bark,7);tt.push(Tt.geometry),_n.add(Tt)}ei(_n,tt),N.add(_n),N.userData.palisadeSection=_n;const ti=new Fn(_[1],x.mossRock,25);for(let rt=0;rt<25;rt++){const Tt=rt/25*Ee;Ut.position.set(Math.cos(Tt)*2.15,-.12,Math.sin(Tt)*2.35-.5),Ut.rotation.set(0,Tt,0),Ut.scale.set(.25,.25,.25),Ut.updateMatrix(),ti.setMatrixAt(rt,Ut.matrix)}N.add(ti);const ls=new Oe;ls.name="Collapsed shelter remains";const Vc=new tn({color:"#839061",map:m,roughness:.94,side:Xe});tt.push(Vc);for(let rt=0;rt<6;rt++){const Tt=Yr(.62+rt%3*.16,1.35+rt%2*.55,.14+rt%3*.05,n+rt*19),Kt=new Me(Tt,Vc);Kt.position.set(-1.3+rt%3*.85,-.46+rt%2*.04,-1.5+Math.floor(rt/3)*1.7),Kt.rotation.set((rt%2-.5)*.24,rt*1.71,(rt%3-1)*.13),Kt.castShadow=!0,tt.push(Tt),ls.add(Kt)}for(let rt=0;rt<22;rt++){const Tt=rt*2.399,Kt=.65+rt%5*.27,Ke=Math.cos(Tt)*(rt<14?1.2:3.4),Je=Math.sin(Tt)*(rt<14?1.6:2.8)-.3,ve=Ne([[Ke,.055,Je],[Ke+Math.cos(Tt+.7)*Kt*.6,.11+rt%3*.07,Je+Math.sin(Tt+.7)*Kt*.6],[Ke+Math.cos(Tt+.7)*Kt,.04+rt%4*.06,Je+Math.sin(Tt+.7)*Kt]],rt%2?.045:.065,rt%2?x.reed:x.bark,4);ve.castShadow=!0,tt.push(ve.geometry),ls.add(ve)}ei(ls,tt),N.add(ls),N.userData.ruin=ls;const Zs=new Fn(C,x.fruit,8);Zs.name="Supplies exposed in the ruins";for(let rt=0;rt<8;rt++)Ut.position.set(-.5+rt%4*.29,.12+Math.floor(rt/4)*.08,1.35+Math.floor(rt/4)*.31),Ut.rotation.set(rt*.43,rt*1.31,.2),Ut.scale.setScalar(.16+rt%3*.025),Ut.updateMatrix(),Zs.setMatrixAt(rt,Ut.matrix),Zs.setColorAt(rt,an(rt%2?"#a99958":"#d9a253"));N.add(Zs),N.userData.looseLoot=Zs;const Gc=new tn({color:"#edc371",emissive:"#e5a64c",emissiveIntensity:.7,roughness:.7});tt.push(Gc);const Zr=new Me(C,Gc);Zr.position.set(1.7,.55,1.1),Zr.scale.set(.15,.22,.15),N.add(Zr),N.userData.lamp=Zr;const uo=new Wp("#ffd098",1.8,25,2);uo.position.set(0,2.3,1.8),N.add(uo),N.userData.light=uo,N.updateMatrixWorld(!0),N.userData.buildingGroups={},N.userData.defaultPlacements={};for(const[rt,Tt]of Object.entries({store:"storage",nursery:"nursery",watchtower:"watchtower",training:"training",palisade:"palisadeSection"})){const Kt=N.userData[Tt],Ke=new Bn().setFromObject(Kt),Je=N.worldToLocal(Ke.getCenter(new P)),ve=new Oe;ve.name=Kt.name+" placement",ve.position.set(Je.x,Kt.position.y,Je.z),N.add(ve),Kt.position.sub(ve.position),ve.add(Kt),N.userData[Tt]=ve,N.userData.buildingGroups[rt]=ve,N.userData.defaultPlacements[rt]={x:Je.x*sn,z:Je.z*sn,yaw:0}}N.updateMatrixWorld(!0);const Wc=new Bn().setFromObject($),$c=N.worldToLocal(Wc.getCenter(new P)),Xc=Wc.getSize(new P);return N.userData.coreFootprint={x:$c.x*sn,z:$c.z*sn,width:Xc.x,depth:Xc.z},G||(r.add(N),l.add(N)),ft(N,T),N}function ft(T,U={}){if(!T)return;const G=T.userData.visualState||{},N={...G,...U},tt=Math.max(1,N.tier??1),$=N.buildings||{},q=_r((N.hp??N.maxHp??100)/(N.maxHp??100),0,1),X=!!N.destroyed||q<=0,st=N.team??G.team??"neutral",mt={};for(const[Te,Ge]of Object.entries(N.buildingPlacements||{}))T.userData.buildingGroups[Te]&&Ge&&Number.isFinite(Ge.x)&&Number.isFinite(Ge.z)&&Number.isFinite(Ge.yaw??0)&&(mt[Te]={x:Ge.x,z:Ge.z,yaw:Ge.yaw??0});T.userData.visualState={team:st,tier:tt,hp:N.hp,maxHp:N.maxHp,buildings:{...$},buildingPlacements:mt,yaw:Number.isFinite(N.yaw)?N.yaw:0,storage:N.storage,resources:N.resources,lootTaken:!!N.lootTaken,destroyed:X},T.rotation.y=T.userData.visualState.yaw;for(const[Te,Ge]of Object.entries(T.userData.buildingGroups)){const un=mt[Te]||T.userData.defaultPlacements[Te];Ge.position.x=un.x/sn,Ge.position.z=un.z/sn,Ge.rotation.y=un.yaw}const Wt=T.userData.buildingGroups.training;T.updateMatrixWorld(!0),T.userData.trainingPoint.copy(Wt.getWorldPosition(new P)),T.userData.trainingPoint.y=T.position.y+.12,T.userData.team=st,T.userData.tier=tt,T.userData.health=q,T.userData.destroyed=X,T.userData.banner.userData.flag.material.color.set(jr(st)),T.userData.banner.userData.emblemTeam!==st&&(T.userData.banner.userData.flag.material.map=B(st),T.userData.banner.userData.flag.material.needsUpdate=!0,T.userData.banner.userData.emblemTeam=st);const Vt=!!($.storage??$.store??!1);T.userData.core.visible=!X,T.userData.extra.visible=!X&&tt>=2,T.userData.ruin.visible=X,T.userData.nursery.visible=!X&&!!($.nursery||$.hatchery||$.spawn||$.breeding),T.userData.training.visible=!X&&!!($.training||$.trainingGround||$.drill),T.userData.watchtower.visible=!X&&!!($.watchtower||$.tower||$.guards);const Qt=!X&&!!($.palisade||$.walls||$.wall||$.defense);T.userData.palisade.visible=Qt&&!mt.palisade,T.userData.palisadeSection.visible=Qt&&!!mt.palisade,T.userData.core.rotation.z=X?0:(1-q)*.09,T.userData.core.userData.roof.scale.y=X?1:.78+.22*q;let fe=typeof N.storage=="number"?N.storage:N.storage?.food??N.resources??0;Number.isFinite(fe)||(fe=0),fe=Math.max(0,fe);const Ce=fe>0&&!N.lootTaken;T.userData.storage.visible=Vt&&(!X||Ce),T.userData.storage.rotation.z=X?-.08:0,T.userData.foodMesh.count=X&&!Ce?0:Math.min(15,Math.ceil(fe/8)),T.userData.storageCover.position.set(X?-.65:0,X?.1:.5,X?.52:.1),T.userData.storageCover.rotation.set(X?.28:0,0,X?-.32:.17),T.userData.looseLoot.visible=X&&Ce&&!Vt,T.userData.looseLoot.count=Math.min(8,Math.ceil(fe/5)),T.userData.banner.position.y=X?.035:0,T.userData.banner.rotation.set(X?.08:0,X?.35:0,X?1.49:q<.25?.22:0),T.userData.lamp.visible=!X,X&&(T.userData.light.visible=!1)}function wt(T){if(!T)return;f?.userData.camp===T&&Xt(),r.remove(T),l.delete(T);const U=T.userData.support;if(U){const G=a.indexOf(U);G>=0&&a.splice(G,1);for(const N of d.values()){const tt=N.indexOf(U);tt>=0&&N.splice(tt,1)}}T.traverse(G=>{G.isInstancedMesh&&G.dispose()});for(const G of T.userData.owned||[])G.dispose?.()}function Dt(T){if(!["shelter","store","nursery","watchtower","training","palisade"].includes(T))return null;const U=H({id:"construction-preview",x:0,z:0,team:"ally",tier:1,hp:350,maxHp:350,buildings:{},storage:{food:80}},{preview:!0});if(U.name="Construction preview: "+T,U.userData.previewType=T,U.userData.previewMaterials=[],T!=="shelter"){const N=U.userData.buildingGroups[T];for(const tt of U.children)tt.visible=tt===N;N.visible=!0,N.position.x=N.position.z=0,N.rotation.y=0}const G=new Map;return U.traverse(N=>{if(N.isLight){N.visible=!1;return}if(!N.isMesh)return;N.castShadow=!1,N.receiveShadow=!1,N.renderOrder=8;const tt=$=>{if(G.has($))return G.get($);const q=$.clone();return q.transparent=!0,q.opacity=.46,q.depthWrite=!1,q.polygonOffset=!0,q.polygonOffsetFactor=-1,q.polygonOffsetUnits=-1,G.set($,q),U.userData.previewMaterials.push(q),U.userData.owned.push(q),q};N.material=Array.isArray(N.material)?N.material.map(tt):tt(N.material)}),c.add(U),r.add(U),Et(U,{x:0,y:0,z:0,yaw:0,valid:!1}),U.visible=!1,U}function Et(T,{x:U,y:G,z:N,yaw:tt=0,valid:$=!1}={}){if(T?.userData.previewType&&(Number.isFinite(U)&&(T.position.x=U),Number.isFinite(G)&&(T.position.y=G),Number.isFinite(N)&&(T.position.z=N),T.rotation.y=Number.isFinite(tt)?tt:0,T.visible=!0,T.userData.previewValid!==!!$)){T.userData.previewValid=!!$;for(const q of T.userData.previewMaterials)q.color?.set($?"#69ed89":"#ef665b"),q.emissive?.set($?"#266c37":"#782d27"),"emissiveIntensity"in q&&(q.emissiveIntensity=.4)}}function Yt(T){!T||!c.has(T)||(c.delete(T),T.removeFromParent(),wt(T))}function Xt(){if(!f)return;f.removeFromParent();const T=new Set,U=new Set;f.traverse(G=>{G.geometry&&T.add(G.geometry),G.material&&U.add(G.material)});for(const G of T)G.dispose();for(const G of U)G.dispose();f=null}function Gt(T){const U=T?.mesh||T;if(!U?.isObject3D)return Xt(),null;if(f?.userData.camp===U)return f;Xt(),f=new Oe,f.name="Construction courtyard guide",f.userData.camp=U;const G=(Pa-.2)/sn,N=.075,tt=(st,mt,Wt,Vt=!1)=>{const Qt=new Le().setFromPoints(st),fe=new ru({color:mt,transparent:!0,opacity:Wt,depthWrite:!1}),Ce=Vt?new Sp(Qt,fe):new bp(Qt,fe);return Ce.renderOrder=6,f.add(Ce),Ce},$=[];for(let st=0;st<96;st++){const mt=st/96*Ee;$.push(new P(Math.cos(mt)*G,N,Math.sin(mt)*G))}tt($,"#9fe5af",.78,!0);const q=[];for(let st=-7;st<=7;st++){const mt=st*.7;if(Math.abs(mt)>=G)continue;const Wt=Math.sqrt(G*G-mt*mt);q.push(new P(mt,N,-Wt),new P(mt,N,Wt),new P(-Wt,N,mt),new P(Wt,N,mt))}tt(q,"#b7ddbc",.22);const X=(st,mt)=>{const Wt=st.x/sn,Vt=st.z/sn,Qt=st.width/(2*sn)+.025,fe=st.depth/(2*sn)+.025,Ce=Math.cos(st.yaw||0),Te=Math.sin(st.yaw||0),Ge=N+.012,un=(Jn,Qn)=>new P(Wt+Jn*Ce+Qn*Te,Ge,Vt+Qn*Ce-Jn*Te);tt([un(-Qt,-fe),un(Qt,-fe),un(Qt,fe),un(-Qt,fe)],"#ec8a72",.8,!0).name=mt+" outline";const Xi=[];for(let Jn=-Qt-fe;Jn<=Qt+fe;Jn+=.42){const Qn=[];for(const _n of[-Qt,Qt]){const ti=Jn-_n;ti>=-fe&&ti<=fe&&Qn.push(un(_n,ti))}for(const _n of[-fe,fe]){const ti=Jn-_n;ti>-Qt&&ti<Qt&&Qn.push(un(ti,_n))}Qn.length===2&&Xi.push(...Qn)}tt(Xi,"#d9806c",.35).name=mt+" hatch"};return X(U.userData.coreFootprint||{x:-1.1825,z:-1.0664,width:7.68,depth:8.25},"Main hut exclusion"),X(rc,"Sleeping hut reservation"),U.add(f),f}let ae=0;const we=an("#2c6258"),ze=an("#0c2b32"),Ue=an("#fff0cb"),Ae=an("#7aa5cb");function qt(T,U,G=1,N){if(ge=U,ae++,G=_r(G,0,1),ct.value=U,O.material.uniforms.time.value=U*.45,O.material.uniforms.waterColor.value.copy(ze).lerp(we,G),O.material.uniforms.sunColor.value.copy(Ae).lerp(Ue,G),O.material.uniforms.sunDirection.value.set(.35+.25*Math.sin(U*.008),.45+G*.4,-.45).normalize(),ae%3===0){const q=z.attributes.position;for(let X=0;X<q.count;X++){const st=lt[X*3],mt=lt[X*3+1];q.setZ(X,Math.sin(st*.33+mt*.21+U*.91)*.025+Math.sin(st*.14-mt*.38-U*.72)*.018)}q.needsUpdate=!0}Pt.uniforms.uTime.value=U;let tt=!1;for(let q=0;q<hn;q++){const X=qs[q];X.life<=0||(X.life-=T,X.vy-=9.2*T,dn[q*3]+=X.vx*T,dn[q*3+1]+=X.vy*T,dn[q*3+2]+=X.vz*T,Ai[q]=Math.max(0,X.life/X.max)*.88,(dn[q*3+1]<-.03||X.life<=0)&&(X.life=0,Ai[q]=0),tt=!0)}if(tt&&(Tn.attributes.position.needsUpdate=!0,Tn.attributes.aAlpha.needsUpdate=!0),ae%2===0){for(let q=0;q<$t.length;q++){const X=$t[q],st=o[X.spot],mt=_r(st.flies/st.maxFlies,0,1),Wt=(st.rich?65:30)*mt;if(X.rank>=Wt)Ut.position.set(st.x,-10,st.z),Ut.scale.setScalar(.001);else{const Vt=U*X.speed+X.phase;Ut.position.set(st.x+Math.sin(Vt)*X.r+Math.sin(Vt*2.9)*.13,st.y+X.height+Math.sin(Vt*1.7+X.phase2)*.26,st.z+Math.cos(Vt*.83+X.phase2)*X.r),Ut.scale.setScalar(.55+.3*Math.sin(X.phase2)**2),Ut.rotation.set(Math.sin(Vt*3)*.25,-Vt,Math.sin(Vt*12)*.25)}Ut.updateMatrix(),_t.setMatrixAt(q,Ut.matrix)}_t.instanceMatrix.needsUpdate=!0}ae%5===0&&N&&(Q.forEach((q,X)=>{Math.hypot(N.x-q.x,N.z-q.z)>48||(Ut.position.set(q.x,q.y+Math.sin(U*.9+q.phase)*.018,q.z),Ut.rotation.set(Math.sin(U*.61+q.phase)*.015,q.angle,Math.cos(U*.8+q.phase)*.015),Ut.scale.set(q.visualRadius,1,q.visualRadius),Ut.updateMatrix(),be.setMatrixAt(X,Ut.matrix))}),be.instanceMatrix.needsUpdate=!0);const $=[...l].filter(q=>!q.userData.destroyed).sort((q,X)=>N?q.position.distanceToSquared(N)-X.position.distanceToSquared(N):0).slice(0,3);for(const q of l)q.userData.light.visible=$.includes(q),q.userData.light.intensity=.25+(1-G)*3,q.userData.lamp.material.emissiveIntensity=.3+(1-G)*1.3,q.userData.banner.userData.flag.rotation.y=Math.sin(U*1.4+q.position.x)*.06}function Fe(){Xt();for(const G of[...c])Yt(G);i.remove(r);const T=new Set,U=new Set;r.traverse(G=>{G.isInstancedMesh&&G.dispose(),G.geometry&&T.add(G.geometry),G.material&&(Array.isArray(G.material)?G.material.forEach(N=>U.add(N)):U.add(G.material))});for(const G of T)G.dispose();for(const G of U)G.dispose();for(const G of h)G.dispose();O.material.uniforms.mirrorSampler?.value?.dispose?.(),l.clear()}return{group:r,platforms:a,hotspots:o,campSites:E,sampleHeight:Ft,getSurface:et,update:qt,splash:co,impact:ho,createShelter:H,updateShelter:ft,removeShelter:wt,createBuildingPreview:Dt,setBuildingPreview:Et,removeBuildingPreview:Yt,showBuildArea:Gt,hideBuildArea:Xt,dispose:Fe,water:O,shelterRadius:Pa,shelterScale:sn}}const Er=Math.PI*2,An=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),qe=(i,t,e)=>i+(t-i)*e,On=(i,t,e)=>{const n=An((e-i)/(t-i));return n*n*(3-2*n)},cr=(i,t=0,e=0)=>{const n=Math.sin(i*127.1+t*311.7+e*74.7)*43758.5453;return n-Math.floor(n)},$e=(i=0,t=0,e=0)=>new P(i,t,e),il=new Map,sl=new Map,fd=$e(0,1,0);$e();function rl(i,t){if(typeof i=="number")return i;const e=An(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n,r=s*s*(3-2*s);return qe(i[n],i[n+1],r)}function ns(i,t){if(i.length===1)return[[i[0],1]];const e=An(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n;return[[i[n],1-s],[i[n+1],s]]}function pe(i,t=0){return{color:i,mask:t}}class jn{constructor(){this.p=[],this.uv=[],this.c=[],this.mask=[],this.si=[],this.sw=[],this.idx=[]}vertex(t,e=[0,0],n=[[0,1]],s={color:[1,1,1],mask:0}){const r=this.p.length/3;this.p.push(t.x,t.y,t.z),this.uv.push(...e),this.c.push(...s.color),this.mask.push(s.mask||0);let a=n.reduce((o,l)=>o+l[1],0)||1;for(let o=0;o<4;o++)this.si.push(n[o]?.[0]||0),this.sw.push((n[o]?.[1]||0)/a);return r}tri(t,e,n){this.idx.push(t,e,n)}quad(t,e,n,s,r=!1){r?(this.tri(t,n,e),this.tri(e,n,s)):(this.tri(t,e,n),this.tri(e,s,n))}tube(t,e,n,s={}){const{segments:r=28,radial:a=16,bones:o=[0],paint:l=()=>pe([.7,.7,.7],1),distort:c}=s,h=new kr(t.map(x=>x.isVector3?x:$e(...x)),!1,"catmullrom",.5),d=this.p.length/3;for(let x=0;x<=r;x++){const _=x/r,A=h.getPoint(_),C=h.getTangent(_).normalize(),E=new P().crossVectors(Math.abs(C.y)>.94?$e(0,0,1):fd,C).normalize(),D=new P().crossVectors(C,E).normalize();for(let S=0;S<=a;S++){const M=S/a,L=M*Er,k=Math.cos(L)*rl(e,_),V=Math.sin(L)*rl(n,_),Z=A.clone().addScaledVector(E,k).addScaledVector(D,V);c&&c(Z,_,L,A);const J=typeof o=="function"?o(_,Z):ns(o,_);this.vertex(Z,[M,_],J,l(Z,_,L))}}for(let x=0;x<r;x++)for(let _=0;_<a;_++){const A=d+x*(a+1)+_;this.quad(A,A+1,A+a+1,A+a+2)}const u=h.getPoint(0),f=h.getPoint(1),p=typeof o=="function"?o(0,u):ns(o,0),v=typeof o=="function"?o(1,f):ns(o,1),g=this.vertex(u,[.5,0],p,l(u,0,0)),m=this.vertex(f,[.5,1],v,l(f,1,0)),y=d+r*(a+1);for(let x=0;x<a;x++)this.tri(g,d+x+1,d+x),this.tri(m,y+x,y+x+1);return this}ellipsoid(t,e,{bone:n=0,rings:s=14,radial:r=24,paint:a=()=>pe([1,1,1]),rotationY:o=0,sculpt:l}={}){const c=this.p.length/3,h=$e(...t),d=Math.cos(o),u=Math.sin(o);for(let f=0;f<=s;f++){const p=f/s,v=Math.PI*p;for(let g=0;g<=r;g++){const m=g/r,y=Er*m;let x=Math.sin(v)*Math.cos(y)*e[0],_=Math.cos(v)*e[1],A=Math.sin(v)*Math.sin(y)*e[2];const C=$e(x,_,A);l&&l(C,m,p);const E=$e(C.x*d+C.z*u,C.y,-C.x*u+C.z*d).add(h);this.vertex(E,[m,p],[[n,1]],a(C,m,p))}}for(let f=0;f<s;f++)for(let p=0;p<r;p++){const v=c+f*(r+1)+p;this.quad(v,v+1,v+r+1,v+r+2)}return this}leaf(t,e,{bone:n=0,bones:s,segments:r=14,across:a=6,color:o=[.35,.45,.22],ridge:l=.025,mask:c=0,vein:h=!0}={}){const d=new kr(t.map(f=>f.isVector3?f:$e(...f)),!1,"catmullrom",.5),u=this.p.length/3;for(let f=0;f<=r;f++){const p=f/r,v=d.getPoint(p),g=d.getTangent(p).normalize(),m=new P().crossVectors(Math.abs(g.y)>.95?$e(0,0,1):fd,g).normalize();for(let y=0;y<=a;y++){const x=y/a*2-1,_=v.clone().addScaledVector(m,x*rl(e,p));_.y+=l*(1-Math.abs(x))*Math.sin(p*Math.PI);const A=(h?.88+.12*Math.cos(p*45+Math.abs(x)*9):1)+.12*(1-Math.abs(x));this.vertex(_,[(x+1)/2,p],s?ns(s,p):[[n,1]],pe(o.map(C=>C*A),c))}}for(let f=0;f<r;f++)for(let p=0;p<a;p++){const v=u+f*(a+1)+p;this.quad(v,v+1,v+a+1,v+a+2,!0)}return this}geometry(){const t=new Le;return t.setAttribute("position",new ce(this.p,3)),t.setAttribute("uv",new ce(this.uv,2)),t.setAttribute("color",new ce(this.c,3)),t.setAttribute("skinTintMask",new ce(this.mask,1)),t.setAttribute("skinIndex",new Ac(this.si,4)),t.setAttribute("skinWeight",new ce(this.sw,4)),t.setIndex(this.idx),t.computeVertexNormals(),t.computeBoundingSphere(),t}}function ao(){const i=[],t={};return{defs:i,ids:t,bone(e,n,s=null){const r=i.length;return t[e]=r,i.push({name:e,p:n,parent:typeof s=="string"?t[s]:s}),r}}}function Rs(i,t=0,e=0){const n=1-On(.26,.47,i.y),s=Math.sin(i.x*31+Math.sin(i.z*13))*Math.sin(i.z*25+i.y*23),r=On(.42,.77,s)*.5,a=.75-r+.06*Math.sin(i.x*75+i.z*64),o=(1-On(.026,.065,Math.abs(i.x)))*On(.52,.67,i.y);return o>.3?pe([.78,.61,.18].map(l=>qe(a,l,o)),1-o):pe([qe(a,.76,n),qe(a,.72,n),qe(a,.49,n)],1-n*.96)}function ni(i,t=0,e=0){const n=(1-On(-.55,.1,Math.sin(e)))*.65,r=.79-.36*On(.38,.78,Math.sin(i.x*35+i.z*17)*Math.sin(i.y*39-i.z*23));return pe([qe(r,.7,n),qe(r,.66,n),qe(r,.43,n)],1-n*.92)}function pd(){const i=ao(),t=new jn,e=new jn,n=new jn,s=new jn,r=i.bone("pelvis",[0,.36,-.35]),a=i.bone("spine",[0,.43,-.07],r),o=i.bone("head",[0,.47,.29],a),l=i.bone("jaw",[0,.39,.37],o),c=i.bone("throat",[0,.29,.36],l),h=i.bone("eyeL",[-.292,.685,.53],o),d=i.bone("eyeR",[.292,.685,.53],o),u=i.bone("mouth",[0,.405,.755],l);t.tube([[0,.35,-.72],[0,.42,-.48],[0,.43,-.08],[0,.47,.3],[0,.46,.58],[0,.43,.75]],[.012,.32,.435,.43,.34,.018],[.012,.245,.27,.235,.145,.025],{segments:42,radial:36,bones:p=>ns([r,r,a,o,o],p),paint:Rs,distort(p,v,g){const m=Math.max(0,Math.sin(g));p.y+=m*.008*Math.sin(p.x*70+p.z*50);const y=Math.exp(-Math.pow((Math.abs(p.x)-.22)/.035,2));p.y+=y*m*.023*Math.sin(v*Math.PI)}});for(const p of[-1,1]){const v=p<0?h:d,g=[p*.292,.685,.53];t.ellipsoid([p*.292,.605,.405],[.15,.145,.165],{bone:o,rings:14,radial:24,paint:S=>Rs(S.clone().add($e(p*.292,.605,.405)))}),e.ellipsoid(g,[.106,.103,.113],{bone:v,radial:40,rings:22,rotationY:p*.32,paint(S,M,L){const k=S.z/.113,V=Math.pow(S.x/.084,2)+Math.pow(S.y/.029,2);if(k<.12)return pe([.065,.14,.018]);if(k<.34)return pe([.04,.065,.012]);if(k>.52&&V<1)return pe([.008,.012,.006]);const Z=.12*Math.sin(Math.atan2(S.y,S.x)*51+Math.hypot(S.x,S.y)*120);return pe([.74+Z,.52+Z*.6,.08+Z*.12])}});const m=i.bone(`hip${p}`,[p*.33,.32,-.33],r),y=i.bone(`knee${p}`,[p*.64,.24,.025],m),x=i.bone(`ankle${p}`,[p*.46,.09,-.61],y),_=i.bone(`foot${p}`,[p*.64,.045,-.49],x);t.ellipsoid([p*.64,.24,.025],[.143,.128,.148],{bone:y,rings:12,radial:18,paint:(S,M,L)=>ni(S.clone().add($e(p*.64,.24,.025)),M,Math.PI*(.5-L)),sculpt(S){S.x*=1+.06*Math.sin(S.z*30)}}),t.ellipsoid([p*.46,.09,-.61],[.069,.052,.071],{bone:x,rings:8,radial:12,paint:(S,M,L)=>ni(S.clone().add($e(p*.46,.09,-.61)),M,Math.PI*(.5-L))}),t.tube([[p*.3,.33,-.35],[p*.5,.3,-.21],[p*.64,.24,.025]],[.13,.223,.14],[.13,.173,.12],{segments:20,radial:22,bones:[m,m,y],paint:ni}),t.tube([[p*.64,.24,.025],[p*.57,.15,-.27],[p*.46,.09,-.61]],[.12,.105,.065],[.11,.09,.05],{segments:20,radial:18,bones:[y,y,x],paint:ni}),t.tube([[p*.46,.09,-.61],[p*.57,.06,-.55],[p*.72,.035,-.35]],[.06,.07,.047],[.047,.04,.025],{segments:12,radial:14,bones:[x,_,_],paint:ni});const A=[];for(let S=0;S<4;S++){const M=p*(.7+(S-1.5)*.075),L=-.34+.36*(1-Math.abs(S-1.5)*.16),k=[p*(.67+(S-1.5)*.028),.036,-.37],V=[qe(k[0],M,.53),.037,-.18];t.tube([k,V,[M,.035,L]],[.032,.024,.007],[.02,.014,.006],{segments:10,radial:8,bones:[_],paint:ni}),A.push([M,.034,L*.66-.12])}for(let S=0;S<3;S++){const M=$e(p*.68,.035,-.36),L=$e(...A[S]),k=$e(...A[S+1]),V=L.clone().lerp(k,.5).lerp(M,.2),Z=t.vertex(M,[0,0],[[_,1]],Rs(M)),J=t.vertex(L,[1,0],[[_,1]],Rs(L)),Y=t.vertex(V,[.5,1],[[_,1]],Rs(V)),z=t.vertex(k,[0,1],[[_,1]],Rs(k));t.tri(Z,J,Y),t.tri(Z,Y,z),t.tri(Y,J,z)}const C=i.bone(`shoulder${p}`,[p*.3,.43,.31],a),E=i.bone(`elbow${p}`,[p*.48,.235,.4],C),D=i.bone(`wrist${p}`,[p*.46,.058,.62],E);t.ellipsoid([p*.48,.235,.4],[.064,.066,.064],{bone:E,rings:8,radial:12,paint:(S,M,L)=>ni(S.clone().add($e(p*.48,.235,.4)),M,Math.PI*(.5-L))}),t.tube([[p*.3,.43,.31],[p*.43,.33,.335],[p*.48,.235,.4]],[.092,.085,.061],[.09,.077,.059],{segments:14,radial:16,bones:[C,C,E],paint:ni}),t.tube([[p*.48,.235,.4],[p*.48,.14,.48],[p*.46,.058,.62]],[.062,.07,.039],[.058,.057,.03],{segments:12,radial:14,bones:[E,E,D],paint:ni});for(let S=0;S<4;S++){const M=p*(.44+(S-1.5)*.075),L=.81+.04*(1.5-Math.abs(S-1.5));t.tube([[p*.46,.055,.61],[qe(p*.46,M,.6),.031,.74],[M,.025,L]],[.025,.017,.009],[.021,.014,.006],{segments:9,radial:8,bones:[D],paint:ni}),t.ellipsoid([M,.025,L],[.017,.01,.021],{bone:D,rings:6,radial:10,paint:()=>pe([.71,.65,.4],.4)})}for(let S=0;S<3;S++){const M=.32+S*.016;t.tube(Array.from({length:17},(L,k)=>[p*.415+Math.cos(k/16*Er)*.085,M+Math.sin(k/16*Er)*.072,.355+Math.sin(k/16*Er)*.02]),.009,.009,{segments:20,radial:6,bones:[C],paint:()=>pe([.38,.55,.12],.25)})}n.leaf([[p*.12,.695,-.08],[p*.31,.69,-.19],[p*.48,.52,-.38]],[.012,.14,.03],{bone:a,color:[.26,.4,.12],ridge:.025,segments:15}),n.leaf([[p*.04,.715,.05],[p*.2,.73,-.03],[p*.36,.59,-.2]],[.008,.13,.015],{bone:a,color:[.34,.48,.18],ridge:.035,segments:15}),s.leaf([[p*.17,.76,.4],[p*.21,.89,.32],[p*.24,.91,.18]],[.025,.055,.002],{bone:o,color:[.69,.53,.19],ridge:.015,segments:12})}const f=Array.from({length:13},(p,v)=>{const g=(v/12-.5)*.74;return[g,.414-.025*Math.abs(g)/.37,.748-.2*Math.pow(g/.37,2)]});return t.tube(f,.009,.009,{segments:34,radial:8,bones:[o],paint:()=>pe([.045,.065,.016])}),t.tube(f.map(p=>[p[0],p[1]-.019,p[2]+.001]),.009,.014,{segments:34,radial:8,bones:[l],paint:()=>pe([.65,.61,.35])}),t.ellipsoid([0,.284,.385],[.25,.125,.265],{bone:c,rings:18,radial:28,paint:()=>pe([.75,.72,.48]),sculpt(p){p.y+=.01*Math.sin(p.x*80)*Math.cos(p.z*60)}}),{type:"frog",rig:i,skin:t.geometry(),eyes:e.geometry(),armor:n.geometry(),crest:s.geometry(),mouth:u,length:1.7,height:.8,scale:1}}function Ps(i,t,e,n,s,r,a=.05){const o=$e(...t).lerp($e(...e),.5);o.y+=a,i.leaf([t,o.toArray(),e],[.012,n,n*.7,.002],{bone:s,segments:13,across:6,ridge:.012,color:r,vein:!0})}function V1(){const i=ao(),t=new jn,e=new jn,n=i.bone("pelvis",[0,2.45,-.16]),s=i.bone("spine",[0,2.79,.02],n),r=i.bone("neck0",[0,2.97,.24],s),a=i.bone("neck1",[0,3.35,.03],r),o=i.bone("neck2",[0,3.82,.18],a),l=i.bone("head",[0,4.19,.6],o),c=i.bone("jaw",[0,4.12,.7],l),h=i.bone("mouth",[0,4.11,1.48],c),d=i.bone("eyeL",[-.125,4.25,.69],l),u=i.bone("eyeR",[.125,4.25,.69],l),f=p=>{const v=On(2.7,3.02,p.y)*.35;return pe([.54-v,.59-v,.61-v])};t.tube([[0,2.43,-.95],[0,2.58,-.53],[0,2.78,-.05],[0,2.99,.27]],[.02,.34,.41,.14],[.02,.39,.48,.18],{segments:30,radial:28,bones:[n,n,s,s],paint:f}),t.tube([[0,2.97,.24],[0,3.22,.16],[0,3.46,.015],[0,3.83,.18],[0,4.12,.52],[0,4.21,.65]],[.16,.15,.12,.1,.1,.13],[.17,.17,.14,.12,.13,.14],{segments:40,radial:20,bones:[r,r,a,o,l,l],paint(p,v,g){const m=Math.cos(g)>.7?.65:.9;return pe([m,m*.99,m*.91])}}),t.tube([[0,4.18,.36],[0,4.28,.57],[0,4.25,.76],[0,4.18,.91]],[.018,.15,.14,.045],[.02,.16,.14,.07],{segments:22,radial:20,bones:[l],paint(p){return p.y>4.32?pe([.07,.1,.12]):pe([.83,.86,.82])}}),t.tube([[0,4.19,.81],[0,4.18,1.04],[0,4.15,1.32],[0,4.12,1.6]],[.072,.055,.027,.001],[.06,.044,.022,.001],{segments:20,radial:10,bones:[l],paint(p,v){return pe([qe(.74,.34,v),qe(.47,.24,v),.075])}}),t.tube([[0,4.112,.81],[0,4.105,1.06],[0,4.103,1.36],[0,4.115,1.59]],[.063,.046,.022,.001],[.026,.02,.012,.001],{segments:18,radial:8,bones:[c],paint:()=>pe([.68,.38,.07])});for(const p of[-1,1]){const v=p<0?d:u;e.ellipsoid([p*.132,4.255,.69],[.029,.039,.043],{bone:v,rings:10,radial:18,paint:D=>Math.abs(D.x)>.022&&Math.abs(D.y)<.018&&Math.abs(D.z)<.021?pe([.005,.008,.006]):pe([.9,.7,.13])});const g=i.bone(`hip${p}`,[p*.14,2.47,-.12],n),m=i.bone(`knee${p}`,[p*.18,1.5,-.12],g),y=i.bone(`ankle${p}`,[p*.22,.16,.04],m),x=i.bone(`foot${p}`,[p*.22,.075,.15],y),_=(D,S)=>{const M=.8+.2*Math.sin(D.y*110);return pe([.38*M,.36*M,.21*M])};t.tube([[p*.14,2.47,-.12],[p*.18,1.73,-.15],[p*.18,1.5,-.12]],[.077,.04,.049],[.074,.037,.049],{segments:20,radial:12,bones:[g,g,m],paint:_}),t.tube([[p*.18,1.5,-.12],[p*.2,.7,-.02],[p*.22,.16,.04]],[.042,.024,.031],[.042,.023,.03],{segments:22,radial:10,bones:[m,m,y],paint:_});for(let D=0;D<4;D++){const S=D<3?(D-1)*.23:-.08,M=D<3?.54-.06*Math.abs(D-1):-.21;t.tube([[p*.22,.16,.04],[p*.22+S*.5,.065,(M+.04)*.55],[p*.22+S,.035,M]],[.025,.017,.006],[.023,.013,.005],{segments:12,radial:8,bones:[x],paint:_})}const A=i.bone(`wing${p}`,[p*.31,2.91,-.03],s),C=i.bone(`wingElbow${p}`,[p*.94,2.83,-.12],A),E=i.bone(`wingWrist${p}`,[p*1.5,2.68,-.24],C);t.leaf([[p*.31,2.91,-.03],[p*.95,2.84,-.18],[p*1.58,2.69,-.35]],[.08,.29,.1],{bones:[A,C,E],segments:22,across:10,ridge:.05,color:[.36,.43,.47]});for(let D=0;D<15;D++){const S=.42+D*.088,M=D<6?A:D<11?C:E;Ps(t,[p*S,2.89-D*.014,-.05-D*.012],[p*(S+.22+D*.009),2.73-D*.023,-.76-D*.018],.105-D*.002,M,[.26+D*.004,.32+D*.004,.36+D*.004]),D<12&&Ps(t,[p*S,2.94-D*.014,.035],[p*(S+.1),2.86-D*.017,-.44],.077,M,[.49,.55,.57])}for(let D=0;D<11;D++)Ps(t,[p*(.11+.015*D),2.86-.042*D,-.21],[p*(.29+.009*D),2.7-.044*D,-.75-.022*D],.075,s,[.51+D*.013,.56+D*.012,.56+D*.012]);Ps(t,[p*.065,4.34,.51],[p*.13,4.28,-.02],.018,l,[.04,.07,.09],.025)}for(let p=0;p<9;p++)Ps(t,[(p-4)*.045,2.53,-.65],[(p-4)*.075,2.34,-1.34-.1*(1-Math.abs(p-4)/4)],.07,n,[.21,.28,.31]);for(let p=0;p<9;p++)Ps(t,[(p-4)*.025,3.06,.35],[(p-4)*.044,2.48-.06*(p%3),.42],.032,s,[.79,.8,.72],.01);return{type:"heron",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:h,length:3,height:4.55,scale:1}}function G1(){const i=ao(),t=new jn,e=new jn,n=new jn,s=i.bone("head",[0,.27,1.97]),r=[s];for(let d=1;d<=20;d++)r.push(i.bone(`coil${d}`,[0,.23,1.97-d*.22],r[d-1]));const a=i.bone("jaw",[0,.205,2.1],s),o=i.bone("mouth",[0,.19,2.48],a),l=i.bone("eyeL",[-.183,.346,2.21],s),c=i.bone("eyeR",[.183,.346,2.21],s),h=(d,u,f)=>{const p=1-On(.13,.22,d.y),v=.73-.26*On(.2,.65,Math.sin(d.z*7+d.x*18));return pe([qe(v,.65,p),qe(v,.6,p),qe(v,.36,p)],1-p)};t.tube([[0,.25,2.05],[0,.23,1.4],[0,.23,.5],[0,.22,-.4],[0,.18,-1.5],[0,.09,-2.46]],[.13,.186,.205,.18,.115,.002],[.11,.16,.17,.15,.09,.003],{segments:100,radial:20,bones:d=>ns(r,d),paint:h,distort(d,u,f){d.y+=.003*Math.sin(u*390)*Math.sin(f*12)}}),t.tube([[0,.265,1.86],[0,.29,2.07],[0,.285,2.27],[0,.245,2.48]],[.115,.237,.202,.035],[.1,.12,.105,.038],{segments:24,radial:24,bones:[s],paint:h}),t.tube([[0,.192,1.99],[0,.179,2.25],[0,.207,2.47]],[.14,.19,.025],[.027,.035,.006],{segments:18,radial:16,bones:[a],paint:()=>pe([.66,.63,.42])});for(const d of[-1,1])e.ellipsoid([d*.183,.346,2.21],[.045,.043,.05],{bone:d<0?l:c,rings:12,radial:20,rotationY:d*.9,paint(u){return Math.abs(u.x)<.012&&u.z>.015?pe([.009,.008,.005]):pe([.69,.51,.12])}}),t.tube([[d*.2,.228,2.06],[d*.197,.218,2.29],[d*.045,.225,2.475]],.004,.004,{segments:20,radial:6,bones:[s],paint:()=>pe([.05,.06,.025])}),n.tube([[0,.194,2.47],[0,.19,2.73],[d*.06,.18,2.84]],[.014,.01,.001],[.007,.005,.001],{segments:16,radial:6,bones:[a],paint:()=>pe([.28,.025,.035])});return{type:"snake",rig:i,skin:t.geometry(),eyes:e.geometry(),tongue:n.geometry(),mouth:o,length:5,height:.43,scale:1}}function W1(){const i=ao(),t=new jn,e=new jn,n=i.bone("spine",[0,.6,.18]),s=i.bone("head",[0,.61,.78],n),r=i.bone("tail0",[0,.55,-.44],n),a=i.bone("tail1",[0,.49,-.99],r),o=i.bone("tail",[0,.48,-1.43],a),l=i.bone("jaw",[0,.42,1.03],s),c=i.bone("mouth",[0,.43,1.55],l),h=i.bone("eyeL",[-.22,.72,1.06],s),d=i.bone("eyeR",[.22,.72,1.06],s),u=g=>{const m=1-On(.35,.62,g.y),y=.74-.25*On(.1,.6,Math.sin(g.z*18+g.y*29)*Math.sin(g.y*35));return pe([qe(y,.81,m),qe(y,.78,m),qe(y,.61,m)],1-m)};t.tube([[0,.48,-1.46],[0,.51,-.92],[0,.61,-.28],[0,.64,.34],[0,.62,.84],[0,.55,1.24],[0,.52,1.56]],[.018,.15,.31,.35,.29,.19,.027],[.035,.22,.46,.48,.32,.19,.05],{segments:54,radial:28,bones:g=>ns([o,a,r,n,s,s,s],g),paint:u}),t.tube([[0,.43,.92],[0,.36,1.25],[0,.445,1.56]],[.14,.16,.025],[.055,.065,.018],{segments:18,radial:18,bones:[l],paint:()=>pe([.72,.69,.49])});const f=[.33,.4,.23],p=t.p.length/3;for(let g=0;g<=18;g++){const m=g/18,y=Math.cos(m*Math.PI)*.62,x=-1.45-(.3+.3*Math.abs(Math.cos(m*Math.PI)));for(let _=0;_<=6;_++){const A=_/6,C=$e(.025*Math.sin(m*Math.PI),.48+y*A,qe(-1.43,x,A)),E=g%2?.85:1.15;t.vertex(C,[A,m],[[o,1]],pe(f.map(D=>D*E),.3))}}for(let g=0;g<18;g++)for(let m=0;m<6;m++){const y=p+g*7+m;t.quad(y,y+1,y+7,y+8)}const v=(g,m,y,x,_=1)=>{const A=$e(...g).lerp($e(...m),.5);A.x+=_*y,t.leaf([g,A.toArray(),m],[.01,y*.8,.003],{bone:x,segments:16,across:8,ridge:.014,color:f,mask:.3})};for(const g of[-1,1]){e.ellipsoid([g*.22,.72,1.06],[.052,.07,.08],{bone:g<0?h:d,rings:12,radial:22,rotationY:g*1,paint(y){return y.z>.035&&Math.pow(y.x/.035,2)+Math.pow(y.y/.04,2)<1?pe([.005,.007,.004]):pe([.75,.59,.18])}});const m=i.bone(`fin${g}`,[g*.255,.42,.65],n);v([g*.255,.42,.65],[g*.63,.21,.11],.16,m,g),v([g*.2,.26,-.11],[g*.38,.13,-.57],.12,r,g),t.tube([[g*.24,.86,.71],[g*.31,.64,.67],[g*.24,.39,.69]],.009,.011,{segments:20,radial:6,bones:[s],paint:()=>pe([.19,.24,.12],.3)});for(let y=0;y<8;y++){const x=1.18+y*.04,_=g*(.12-y*.009);t.tube([[_,.445,x],[_*.9,.475,x+.005]],[.008,.001],[.008,.001],{segments:3,radial:5,bones:[l],paint:()=>pe([.78,.76,.56])})}}for(const g of[!0,!1]){const m=t.p.length/3,y=22;for(let x=0;x<=y;x++){const _=x/y,A=qe(-.9,.18,_),C=g?.8+.22*_:.26-.1*_,E=Math.sin(Math.PI*_)*(g?.45:-.24),D=_<.5?r:n;for(let S=0;S<=6;S++){const M=S/6,L=$e(.012*Math.sin(_*6),C+E*M,A-.1*M);t.vertex(L,[M,_],[[D,1]],pe(f.map(k=>k*(x%2?.85:1.1)),.2))}}for(let x=0;x<y;x++)for(let _=0;_<6;_++){const A=m+x*7+_;t.quad(A,A+1,A+7,A+8)}}return{type:"fish",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:c,length:3.65,height:1.65,scale:1}}function $1(i){if(sl.has(i))return sl.get(i);const t=256,e=new Uint8Array(t*t*4);for(let s=0;s<t;s++)for(let r=0;r<t;r++){const a=r/t,o=s/t;let l=.82+cr(r,s)*.18;if(i==="frog"){const u=Math.floor(a*28),f=Math.floor(o*28),p=a*28-u-.5,v=o*28-f-.5,g=Math.hypot(p,v),m=Math.exp(-g*g*38)*(.1+cr(u,f)*.18);l=.79+.16*cr(r,s)+m-.11*Math.exp(-Math.pow(g-.31,2)*300)}else if(i==="snake"||i==="fish"){const d=i==="snake"?28:35,u=o*d,f=Math.floor(u),p=a*20+f%2*.5,v=p-Math.floor(p)-.5,g=u-f-.5,m=Math.abs(v)*1.4+Math.abs(g);l=.74+.22*(1-On(.49,.72,m))+.04*cr(r,s)}else l=.79+.15*Math.sin(a*170+.4*Math.sin(o*31))**2+.06*cr(r,s);const c=(s*t+r)*4,h=Math.floor(An(l)*255);e[c]=e[c+1]=e[c+2]=h,e[c+3]=255}const n=new eo(e,t,t,In);return n.wrapS=n.wrapT=zs,n.magFilter=qn,n.minFilter=Bi,n.generateMipmaps=!0,n.needsUpdate=!0,n.repeat.set(i==="heron"?1:2,i==="frog"?3:2),sl.set(i,n),n}function X1(i,t){const e=$1(i),n=new Dc({color:16777215,vertexColors:!0,map:e,bumpMap:e,bumpScale:i==="frog"?.013:i==="heron"?.007:.009,roughness:i==="frog"?.32:i==="heron"?.68:.37,metalness:0,clearcoat:i==="heron"?0:.42,clearcoatRoughness:.25,envMapIntensity:.8,side:Xe}),s=new Jt(t);return n.userData.tint=s,n.onBeforeCompile=r=>{r.uniforms.skinTint={value:s},r.vertexShader=`attribute float skinTintMask; varying float vSkinTint;
`+r.vertexShader,r.vertexShader=r.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vSkinTint = skinTintMask;`),r.fragmentShader=`uniform vec3 skinTint; varying float vSkinTint;
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
 diffuseColor.rgb *= mix(vec3(1.0),skinTint,vSkinTint);`)},n.customProgramCacheKey=()=>"anatomical-skin-v3",n}function q1(i,t){const e=new Qa({color:i,side:xn,transparent:!0,opacity:.91,depthWrite:!1,toneMapped:!1});return e.userData.thickness={value:t},e.onBeforeCompile=n=>{n.uniforms.outlineThickness=e.userData.thickness,n.vertexShader=`uniform float outlineThickness;
`+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <begin_vertex>","vec3 transformed = position + normal * outlineThickness;")},e.customProgramCacheKey=()=>"skeletal-silhouette-v3",e}function Y1(i){const t=i.map(e=>{const n=new su;return n.name=e.name,n});for(let e=0;e<i.length;e++){const n=i[e];t[e].position.fromArray(n.p),n.parent!==null&&n.parent!==void 0&&(t[e].position.sub($e(...i[n.parent].p)),t[n.parent].add(t[e]))}return{bones:t,skeleton:new Cc(t),root:t[0]}}function j1(i){if(!il.has(i)){const t=({frog:pd,heron:V1,snake:G1,fish:W1}[i]||pd)();for(const e of["skin","eyes","armor","crest","tongue"])t[e]?.boundingSphere&&(t[e].boundingSphere.radius*=1.9);il.set(i,t)}return il.get(i)}function al(i,t,e,n,s,r,a){const o=Math.hypot(n.y,n.z),l=Math.hypot(s.y,s.z),c=n.y+s.y+r,h=n.z+s.z+a,d=Math.max(Math.abs(o-l)+1e-5,Math.min(o+l-1e-5,Math.hypot(c,h))),u=Math.atan2(h,c),f=-Math.sign(n.y*s.z-n.z*s.y)||1,p=Math.acos(An((o*o+d*d-l*l)/(2*o*d),-1,1)),v=u+f*p,g=v-Math.atan2(n.z,n.y);i.rotation.x=Math.atan2(Math.sin(g),Math.cos(g));const m=Math.cos(v)*o,y=Math.sin(v)*o,x=Math.atan2(h-y,c-m)-i.rotation.x-Math.atan2(s.z,s.y);t.rotation.x=Math.atan2(Math.sin(x),Math.cos(x)),e.rotation.x=-i.rotation.x-t.rotation.x}function Z1(i,t){if(!i)return{type:"",phase:0,force:0};let e="kick",n=t;return typeof i=="string"?e=i:typeof i=="number"?n=i:(e=i.type||i.kind||"kick",n=i.phase??i.progress??t),n=An(n),{type:e,phase:n,force:Math.sin(n*Math.PI)}}function Da(i="frog",t={}){["frog","heron","snake","fish"].includes(i)||(i="frog");const e=j1(i),n=new Oe,s=new Oe;n.name=`creature-${i}`,s.name="anatomical-animation-pivot",n.add(s);const r=i==="frog"?7378989:i==="snake"?6715206:i==="fish"?8624996:16777215,a=X1(i,t.color??r),o=new Dc({color:16777215,vertexColors:!0,roughness:.13,clearcoat:1,clearcoatRoughness:.05,metalness:.05}),{bones:l,skeleton:c,root:h}=Y1(e.rig.defs),d=new xa(e.skin,a);d.name=`${i}-weighted-surface`,d.add(h),s.add(d),d.castShadow=!0,d.receiveShadow=!0,d.frustumCulled=!0,n.updateMatrixWorld(!0),d.bind(c);const u=new xa(e.eyes,o);u.name="articulated-eyes",u.bind(c,d.bindMatrix),u.castShadow=!1,u.frustumCulled=!0,s.add(u);const f=new xa(e.skin,q1(t.outlineColor??(t.team==="enemy"?16741200:t.team==="player"?11075554:i==="frog"?8513956:16755275),i==="frog"?.018:.027));f.name="animated-color-silhouette",f.bind(c,d.bindMatrix),f.frustumCulled=!0,f.renderOrder=-1,s.add(f);const p=[];for(const k of["armor","crest","tongue"])if(e[k]){const V=new tn({color:16777215,vertexColors:!0,roughness:k==="tongue"?.35:.79,side:Xe}),Z=new xa(e[k],V);Z.name=k,Z.bind(c,d.bindMatrix),Z.frustumCulled=!0,Z.castShadow=k!=="tongue",Z.visible=k==="tongue",s.add(Z),p.push(Z)}const v={};for(const k of l)v[k.name]=k;const g=l.map(k=>k.position.clone()),m=new Be;m.name="mouth-attachment",l[e.mouth].add(m);let y=(t.seed||0)*.731,x=0,_="",A=1,C=0,E=0;const D=t.role||"scout",S=i==="frog"?["guardian","brute","tank"].includes(D)?[1.15,1.12,1.05]:["scout","hunter","agile"].includes(D)?[.96,.98,1.04]:[1.03,1.02,1.02]:[1,1,1];s.scale.set(...S);const M=()=>{for(let k=0;k<l.length;k++)l[k].rotation.set(0,0,0),l[k].scale.set(1,1,1),l[k].position.copy(g[k])},L={group:n,bones:v,skeleton:c,mesh:d,stats:{type:i,vertices:e.skin.attributes.position.count+e.eyes.attributes.position.count,triangles:(e.skin.index.count+e.eyes.index.count)/3,boneCount:l.length,length:e.length,height:e.height,rigged:!0},setOutline(k,V=!0){k!=null&&f.material.color.set(k),f.visible=V},setTier(k){A=An(Math.round(k||1),1,5);for(const Z of p)Z.name==="armor"?Z.visible=A>=2:Z.name==="crest"&&(Z.visible=A>=3);const V=1+(A-1)*.028;s.scale.set(S[0]*V,S[1]*V,S[2]*V)},mouthWorld(k=new P){return n.updateWorldMatrix(!0,!0),m.getWorldPosition(k)},update(k,V={}){k=An(Number(k)||0,0,.1),y=V.time!==void 0?V.time+(t.seed||0)*.731:y+k,M();const Z=Math.max(0,Number(V.speed)||0),J=An(Z/(i==="frog"?2.8:3));E=qe(E,J,1-Math.exp(-k*12));const Y=V.swimming?1:0,z=typeof V.jump=="number"?An(V.jump):V.jump?.5:0,O=typeof V.attack=="string"?V.attack:V.attack?.type||V.attack?.kind||(V.attack?"kick":"");O!==_?(x=0,_=O):V.attack&&(x+=k/.55);const lt=Z1(V.attack,x),ot=lt.force,Mt=typeof V.roar=="number"?An(V.roar):V.roar?1:0,jt=typeof V.hit=="number"?An(V.hit):V.hit?1:0;C=qe(C,V.dead?1:0,1-Math.exp(-k*5)),s.position.set(0,0,0),s.rotation.set(0,0,0);const he=(y+(t.seed||0)*.4)%5.7,_e=he>5.5?.08+.92*Math.abs((he-5.6)*10):1;if(v.eyeL&&(v.eyeL.scale.y=An(_e,.08,1)),v.eyeR&&(v.eyeR.scale.y=An(_e,.08,1)),i==="frog"){const Ht=y*(Y?7.8:10.6),Q=Math.max(0,Math.sin(Ht)),nt=Math.sin(Ht),vt=Math.sin(z*Math.PI);s.position.y=Y?-.14+.023*Math.sin(y*3):Q*.045*E,s.rotation.x=Y?-.12:-.05*nt*E,v.spine.rotation.x=Math.sin(y*2.6)*.009+E*nt*.045,v.spine.scale.y=1+Math.sin(y*2.6)*.018,v.head.rotation.x=.02*Math.sin(y*1.7)-Mt*.18-vt*.06,v.jaw.rotation.x=-Mt*.13-(lt.type==="tongue"?ot*.16:0),v.throat.scale.set(1+Mt*.26,1+Mt*1.45+Math.sin(y*2.5)*.035,1+Mt*.25);for(const gt of[-1,1]){const At=Math.sin(Y?Ht:Ht+gt*.14),se=E*At;v[`hip${gt}`].rotation.x=-.32*se-vt*.62,v[`hip${gt}`].rotation.z=gt*(vt*.1+Y*.07*At),v[`knee${gt}`].rotation.x=.62*se+vt*1.05,v[`ankle${gt}`].rotation.x=-.25*se-vt*.3,v[`foot${gt}`].rotation.x=.2*se;const be=Math.sin(Ht+gt*1.3)*E;if(v[`shoulder${gt}`].rotation.x=-.23*be+vt*.25,v[`elbow${gt}`].rotation.x=.28*be-vt*.32,v[`wrist${gt}`].rotation.x=-.12*be,Y&&(v[`shoulder${gt}`].rotation.z=gt*(.22+.25*At*E),v[`elbow${gt}`].rotation.y=gt*.3),!Y&&z===0&&!lt.type&&!V.dead){const I=e.rig.ids,Se=Ht+gt*.12,te=Ht+gt*1.3+Math.PI;al(v[`hip${gt}`],v[`knee${gt}`],v[`ankle${gt}`],g[I[`knee${gt}`]],g[I[`ankle${gt}`]],Math.max(0,Math.sin(Se))*.11*E-s.position.y,Math.cos(Se)*.095*E),al(v[`shoulder${gt}`],v[`elbow${gt}`],v[`wrist${gt}`],g[I[`elbow${gt}`]],g[I[`wrist${gt}`]],Math.max(0,Math.sin(te))*.08*E-s.position.y,Math.cos(te)*.07*E)}}if(lt.type==="kick"||lt.type==="strike"){s.rotation.y=-ot*.55,s.rotation.z=ot*.22,s.position.y+=ot*.16;const gt=e.rig.ids;al(v.hip1,v.knee1,v.ankle1,g[gt.knee1],g[gt.ankle1],.26*ot,1.16*ot),v.hip1.rotation.y=-ot*.3,v.hip1.rotation.z=-ot*.08,v["shoulder-1"].rotation.z=ot*.55}else if(lt.type==="slam"||lt.type==="belly"){const gt=Math.sin(lt.phase*Math.PI);s.rotation.x=-gt*.28,s.position.y+=gt*.22;for(const At of[-1,1])v[`hip${At}`].rotation.x-=gt*.7,v[`shoulder${At}`].rotation.z=At*gt*.45}else lt.type==="tongue"&&(v.head.rotation.x-=ot*.1,v.spine.rotation.x-=ot*.07);s.rotation.z+=jt*.21*Math.sin(y*44),s.position.y-=C*.22,s.rotation.z+=C*1.35,v.spine.scale.y*=1-C*.15}else if(i==="heron"){const Ht=y*5.6,Q=E;s.position.y=.035*Math.sin(Ht*2)*Q,v.spine.rotation.x=-.03*Math.sin(Ht)*Q,v.neck0.rotation.x=.1*Math.sin(y*1.4)-ot*.62,v.neck1.rotation.x=-.08*Math.sin(y*1.4)+ot*.58,v.neck2.rotation.x=-.03+ot*.7,v.head.rotation.x=-.06*Math.sin(y*1.8)+ot*.48,v.jaw.rotation.x=-ot*.5;for(const nt of[-1,1]){const vt=Ht+(nt<0?Math.PI:0),gt=Math.sin(vt);v[`hip${nt}`].rotation.x=gt*.31*Q,v[`knee${nt}`].rotation.x=Math.max(0,-gt)*.57*Q,v[`foot${nt}`].rotation.x=-.18*gt*Q,v[`wing${nt}`].rotation.y=nt*(1.24-ot*1.07-jt*.55),v[`wing${nt}`].rotation.z=nt*(.07+ot*(.5+.25*Math.sin(y*18))+jt*.5),v[`wingElbow${nt}`].rotation.y=nt*.12,v[`wingWrist${nt}`].rotation.z=nt*ot*.18}s.rotation.z+=jt*.08*Math.sin(y*32)+C*1.45,s.position.y-=C*1.8}else if(i==="snake"){const Ht=y*(3+E*5),Q=.055+E*.105;for(let vt=1;vt<=20;vt++)v[`coil${vt}`].rotation.y=Math.sin(Ht-vt*.48)*Q,v[`coil${vt}`].rotation.x=vt<6?-ot*.18*(1-vt/7):.006*Math.sin(y*3-vt);v.head.rotation.x=ot*.45,v.head.rotation.y=Math.sin(Ht)*.035,v.jaw.rotation.x=-ot*.62,s.position.y=ot*.28;const nt=p.find(vt=>vt.name==="tongue");nt&&(nt.visible=!V.dead&&(Math.sin(y*3.7)>.77||ot>.2)),s.rotation.z=C*.65+jt*.1*Math.sin(y*32)}else if(i==="fish"){const Ht=y*(4+E*10),Q=.09+E*.22;v.spine.rotation.y=Math.sin(Ht)*Q*.2,v.head.rotation.y=-Math.sin(Ht)*Q*.13,v.tail0.rotation.y=Math.sin(Ht-.5)*Q,v.tail1.rotation.y=Math.sin(Ht-1.1)*Q*1.25,v.tail.rotation.y=Math.sin(Ht-1.6)*Q*1.2,v.jaw.rotation.x=-ot*.62-.035*Math.sin(y*2.5);for(const nt of[-1,1])v[`fin${nt}`].rotation.z=nt*(.13+.16*Math.sin(y*6)),v[`fin${nt}`].rotation.y=nt*.15*Math.sin(y*5);s.rotation.x=-ot*.35,s.position.y=.035*Math.sin(y*2),s.rotation.z=C*Math.PI+jt*.14*Math.sin(y*35)}},dispose(){a.dispose(),o.dispose(),f.material.dispose();for(const k of p)k.material.dispose();c.dispose(),n.removeFromParent()}};return L.setTier(t.tier||1),L.update(0,{}),n.userData.creature=L,L}const ol="Πήγαινε σε δικό σου καταφύγιο.",md="Με χώρο εκπαίδευσης στη βάση: Tab → επίλεξε βατράχους → Εκπαίδευση.",gd={"gather-food":{title:"Μάζεψε τροφή",hint:"Στο σμήνος: E για αποθέματα τροφής, αριστερό κλικ (LMB) για να φας."},"gather-reeds":{title:"Μάζεψε υλικά κατασκευής",hint:"Πλησίασε σμήνος και πάτησε E για υλικά και τροφή· στην όχθη, απομακρύνσου πρώτα από βατράχους και καταφύγια."},"build-shelter":{title:"Χτίσε καταφύγιο",hint:"Σε ελεύθερη όχθη: V → Νέο καταφύγιο → πράσινη θέση → αριστερό κλικ."},"build-store":{title:"Χτίσε αποθήκη",hint:ol+" V → Αποθήκη → πράσινη θέση στην αυλή → αριστερό κλικ."},"build-nursery":{title:"Χτίσε φωλιά στρατολόγησης",hint:ol+" V → Φωλιά στρατολόγησης → τοποθέτηση στην αυλή."},"build-training":{title:"Χτίσε χώρο εκπαίδευσης",hint:ol+" V → Χώρος εκπαίδευσης → τοποθέτηση στην αυλή."},"recruit-allies":{title:"Στρατολόγησε συμμάχους",hint:"Πλησίασε ουδέτερο ή παραδομένο βάτραχο και πάτησε E για στρατολόγηση."},"train-starters":{title:"Εκπαίδευσε τρεις βατράχους",hint:md},"hunt-heron":{title:"Νίκησε τον ερωδιό",hint:"Σημάδεψε τον ερωδιό και πάτα F για ομαδική επίθεση μέχρι να μηδενιστεί η ζωή του."},"hunt-snake":{title:"Νίκησε το νερόφιδο",hint:"Σημάδεψε το νερόφιδο και πάτα F για ομαδική επίθεση μέχρι να μηδενιστεί η ζωή του."},"hunt-fish":{title:"Νίκησε το αρπακτικό ψάρι",hint:"Σημάδεψε το αρπακτικό ψάρι και πάτα F για ομαδική επίθεση μέχρι να μηδενιστεί η ζωή του."},"expand-shelters":{title:"Απόκτησε δεύτερο καταφύγιο",hint:"Σε ελεύθερη όχθη μακριά από άλλη βάση: V → Νέο καταφύγιο → τοποθέτηση."},"expand-buildings":{title:"Χτίσε συνολικά έξι κτίρια",hint:"Σε δικά σου καταφύγια: V → διάλεξε κτίριο → πράσινη θέση στην αυλή → αριστερό κλικ."},"train-army":{title:"Εκπαίδευσε έξι βατράχους",hint:md},"boss-heron":{title:"Νίκησε τον Σιδερόραμφο",hint:"Σημάδεψε τον γιγάντιο ερωδιό και πάτα F για ομαδική επίθεση μέχρι να μηδενιστεί η ζωή του."},"boss-snake":{title:"Νίκησε τη Ρίζα του Βυθού",hint:"Σημάδεψε το γιγάντιο νερόφιδο και πάτα F για ομαδική επίθεση μέχρι να μηδενιστεί η ζωή του."},"boss-fish":{title:"Νίκησε τον Λεβιάθαν",hint:"Σημάδεψε το γιγάντιο ψάρι και πάτα F για ομαδική επίθεση μέχρι να μηδενιστεί η ζωή του."},territories:{title:"Ένωσε τις πέντε αντίπαλες περιοχές",hint:"Πλησίασε εχθρικό καταφύγιο: F για ομαδική επίθεση ή E για πρόταση συμμαχίας."}},vd={food:"gather-food",reeds:"gather-reeds",shelter:"build-shelter",store:"build-store",nursery:"build-nursery",training:"build-training",allies:"recruit-allies",trained:"train-starters"};function Su(i){const t=typeof i=="string"?i:typeof i?.id=="string"?i.id:"",e=Object.hasOwn(vd,t)?vd[t]:t;return Object.hasOwn(gd,e)?{...gd[e]}:{title:(typeof i?.label=="string"?i.label.trim():"")||"Επόμενος στόχος",hint:typeof i?.hint=="string"?i.hint:""}}let K1=0;const J1=(i,t="")=>{const e=`fg-paint-${K1++}`;return`<svg xmlns="http://www.w3.org/2000/svg" class="fg-pictogram ${t}" viewBox="0 0 64 64" fill="none" aria-hidden="true"><defs><linearGradient id="${e}" x1="10" y1="3" x2="49" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#e4f3ac"/><stop offset=".48" stop-color="#94bd73"/><stop offset="1" stop-color="#3c7155"/></linearGradient><linearGradient id="${e}-gold" x1="18" y1="8" x2="43" y2="55"><stop stop-color="#ffe8a0"/><stop offset="1" stop-color="#a7793d"/></linearGradient></defs><g stroke="#182f27" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round">${i.replaceAll("$GREEN",`url(#${e})`).replaceAll("$GOLD",`url(#${e}-gold)`)}</g></svg>`},Ln='<path d="M15 27c-4-15 13-22 18-8 9-14 22-1 15 11 10 5 11 18-1 22-9 4-25 3-32-3-8-7-7-17 0-22Z" fill="$GREEN"/><ellipse cx="22" cy="23" rx="7" ry="8" fill="$GOLD"/><ellipse cx="42" cy="23" rx="7" ry="8" fill="$GOLD"/><path d="M18 23h8m12 0h8" stroke="#152824" stroke-width="4"/><path d="M17 41q15 8 31-1" stroke="#e4e5ac" stroke-width="4"/><path d="M18 38q14 5 29-1"/>',hr='<path d="M20 29c-2-10 9-17 20-10 10 7 12 19 3 25-6 4-22 1-25-5Z" fill="$GREEN"/><path d="M23 39 10 48l13 3m18-14 12 10-11 5" stroke="#9fca82" stroke-width="7"/><path d="m13 47-7 3m12 1-9 6m42-10 7 2m-10 2 7 5" stroke="#c7df91" stroke-width="2.4"/>',Q1='<path d="M50 10C29 7 10 18 12 37c2 18 20 19 31 4C48 32 45 21 50 10Z" fill="$GREEN"/><path d="m10 57 29-30m-13 15-6-12m14 4 11-2" stroke="#dceba4" stroke-width="2.4"/>',dr='<path d="m26 23-9-8-7 5m28 3 9-8 7 5M25 30l-12 1-6 8m32-9 12 1 6 8M27 38l-10 9-2 12m22-21 10 9 2 12" stroke="#c7d1ca" stroke-width="2.6"/><path d="m26 23-9-8-7 5m28 3 9-8 7 5M25 30l-12 1-6 8m32-9 12 1 6 8M27 38l-10 9-2 12m22-21 10 9 2 12" stroke="#3b514d" stroke-width="1.2"/><path d="M24 34c-3 12 0 22 8 25 8-3 11-13 8-25Z" fill="#89958e" stroke="#263c36"/><path d="M23 41q9 4 18 0m-16 7q7 3 14 0m-11 7q4 2 8 0" stroke="#41554e" stroke-width="2"/><path d="M30 38v17" stroke="#cad0bd" stroke-width="1.5"/><path d="M28 26C19 20 3 28 5 42c2 16 19 8 25-11Z" fill="#d4e3eb" fill-opacity=".78" stroke="#9bb7ba" stroke-width="1.2"/><path d="M36 26c9-6 25 2 23 16-2 16-19 8-25-11Z" fill="#d4e3eb" fill-opacity=".78" stroke="#9bb7ba" stroke-width="1.2"/><path d="m27 28-17 17m10-11-1 11m-2-8-8-1m28-8 17 17m-10-11 1 11m2-8 8-1" stroke="#91aeb4" stroke-width=".9" opacity=".85"/><ellipse cx="32" cy="28" rx="9" ry="12" fill="#355d59" stroke="#172e2b"/><path d="M28 20v15m8-15v15" stroke="#8fa89b" stroke-width="2"/><path d="M32 19v17" stroke="#152d2c" stroke-width="2"/><ellipse cx="32" cy="15" rx="11" ry="9" fill="#314b46"/><ellipse cx="25" cy="14" rx="6" ry="8" fill="#c86b60" stroke="#4d3933"/><ellipse cx="39" cy="14" rx="6" ry="8" fill="#c86b60" stroke="#4d3933"/><path d="m22 10 3-1m-3 5 3-1m-1 5 3-1m9-8 3 1m-3 4 3 1m-3 3 3 1" stroke="#e5a38a" stroke-width="1.1"/><path d="m29 8-2-5m8 5 2-5" stroke="#9cbbb0" stroke-width="1.7"/>',xd={frog:Ln,leaf:Q1,fly:dr,food:dr,tongue:`<g transform="translate(-6 5) scale(.8)">${Ln}</g><path d="M31 40c27 10 22-13 11-6" stroke="#f0959c" stroke-width="5"/><path d="M31 39c26 10 20-11 12-6" stroke="#ffd0bd" stroke-width="1.5"/><g transform="translate(43 -2) scale(.3)">${dr}</g>`,kick:`<path d="m7 23 13-4m-9 12 8-4" stroke="#f0d78e" stroke-width="2.5"/><g transform="translate(0 -3) rotate(-20 32 32)">${hr}</g><path d="M34 35 46 18l12-2-6-4-12 2-16 17" fill="$GREEN"/><path d="m52 8 3-5m5 8 3-2" stroke="#f3cb75" stroke-width="2.6"/>`,slam:`<path d="m16 9 4 11m12-14 1 13M48 9l-4 11" stroke="#e4dca8" stroke-width="2.5"/><g transform="translate(0 5) scale(1 .9)">${hr}</g><path d="M4 48 17 45 13 53l12-4 8 10 6-11 12 6-3-9 13 6" stroke="#f0ce80" stroke-width="2.8"/><path d="m8 59 7-4m36 5-7-4" stroke="#9e7441" stroke-width="2"/>`,shield:'<path d="M32 5 54 14l-3 25c-2 9-10 16-19 21C23 55 15 48 13 39l-3-25Z" fill="$GOLD"/><path d="M32 11 47 18l-2 19c-2 6-7 12-13 16-7-5-12-10-13-16l-2-19Z" fill="#396f55"/><path d="m24 31 7 7 12-17" stroke="#e5efba" stroke-width="5"/>',attack:'<path d="m15 54 6-12 29-34 7-2-1 9-31 32Z" fill="#e1e8d6"/><path d="m9 38 17 15m-10-7-8 10" stroke="#e0bd71" stroke-width="5"/><path d="M11 8 37 37m0 0 12 17m-8-15 11 9" stroke="#ffb17a" stroke-width="4"/><path d="m31 28 3-10m5 7 10-4" stroke="#f6d68d" stroke-width="2"/>',dodge:`<path d="M6 18h16M3 28h13M6 38h11" stroke="#b9d6d3" stroke-width="3"/><g transform="translate(15 0) scale(.77)">${hr}</g><path d="M29 53c13 4 24-2 28-12l-1 10m1-10-10 3" stroke="#f5d48a" stroke-width="3"/>`,jump:`<g transform="translate(7 0) scale(.84)">${hr}</g><path d="M8 52c4-29 26-38 44-26m-4-9 5 10-12-1" stroke="#e5eabb" stroke-width="3" stroke-dasharray="3 4"/>`,roar:`<g transform="translate(-2 7) scale(.76)">${Ln}</g><path d="M40 24c8 5 9 13 2 18m6-25c13 9 14 23 3 32m5-38c13 12 15 29 5 42" stroke="#efcd7e" stroke-width="3"/><ellipse cx="25" cy="43" rx="10" ry="9" fill="#bfd998"/>`,heart:'<path d="M32 56 10 34C-6 15 19 0 32 19 47 0 70 16 55 34Z" fill="#e49a82"/><path d="M9 31h13l5-10 7 23 5-13h16" stroke="#ffe8b5" stroke-width="3"/><path d="M13 19c1-5 5-6 9-4" stroke="#ffd0b6" stroke-width="3"/>',heal:'<path d="M18 10h28l8 18-5 27H15L10 28Z" fill="$GREEN"/><path d="M24 24h16v24H24Zm-5 5h26v13H19Z" fill="#f1df9e" stroke="none"/><path d="M21 11v-5h22v5" stroke="#c5d7a1" stroke-width="4"/>',stamina:'<path d="m38 4-25 32 17-1-7 26 29-36-18 2Z" fill="$GOLD"/><path d="m37 12-16 19 15-2" stroke="#fff2b6" stroke-width="2.5"/>',stomach:'<path d="M27 5v19c-11-8-23-1-22 13 2 22 32 27 46 10C65 30 49 10 36 22V5" fill="$GOLD"/><path d="M14 34c7-4 11 6 20 5 6 0 9-4 11-8" stroke="#fae8a8" stroke-width="3"/><path d="M20 50c8 5 19 2 22-3" stroke="#8d623a" stroke-width="2"/>',reeds:'<path d="m13 15 35 14-5 16-35-14Z" fill="#8e6540"/><path d="m16 9 36 15-5 16-36-15Z" fill="#ad7b49"/><path d="m20 24 33 15-5 17-34-15Z" fill="#9a6e43"/><ellipse cx="14" cy="20" rx="8" ry="11" transform="rotate(20 14 20)" fill="$GOLD"/><ellipse cx="14" cy="20" rx="4" ry="6" transform="rotate(20 14 20)" stroke="#8f633e"/><ellipse cx="18" cy="35" rx="8" ry="11" transform="rotate(20 18 35)" fill="#d4ae72"/><ellipse cx="18" cy="35" rx="4" ry="6" transform="rotate(20 18 35)" stroke="#8f633e"/><path d="m31 16-8 25m14-22-8 25" stroke="#e8c896" stroke-width="3"/><path d="M34 49c-4-17 9-30 25-30-1 18-10 30-25 30Z" fill="$GREEN"/><path d="m28 57 21-29m-12 19-1-10m6 4 10-2" stroke="#d8e5a2" stroke-width="2.2"/><path d="m47 18 6-14m-2 17 9-12" stroke="#a8c181" stroke-width="2.5"/>',camp:'<path d="M10 31h44v25H10Z" fill="#906e48"/><path d="M18 34v22m29-22v22" stroke="#d1b47b" stroke-width="3"/><path d="M4 32C15 19 18 11 32 8c7 12 17 17 29 24-18 2-37 6-57 0Z" fill="$GREEN"/><path d="m13 28 19-16 18 15M32 12v20" stroke="#d5dd9b" stroke-width="2"/><path d="M25 56V40q7-7 14 0v16" fill="#1b3027"/><path d="M5 58h55" stroke="#d1b47b" stroke-width="3"/>',nursery:`<path d="M8 30c0 29 49 30 49 0l-8 7-7-5-8 7-9-8-8 6Z" fill="$GOLD"/><path d="M12 42q20 14 42 0M15 50q18 10 37 0" stroke="#655b34" stroke-width="2"/><g transform="translate(11 -1) scale(.65)">${Ln}</g>`,store:`<path d="M9 20h46l-4 37H13Z" fill="#a38651"/><path d="M9 22q23-8 46 0M10 30h44M12 43h40M20 23l3 33m10-34v34m11-33-3 33" stroke="#e1c18b" stroke-width="2.5"/><path d="M17 14q16-15 30 0" stroke="#bdd291" stroke-width="7"/><g transform="translate(21 -4) scale(.38)">${dr}</g>`,watchtower:'<path d="m18 59 3-34h22l4 34M22 35l23 15M20 50l24-15" stroke="#c5a878" stroke-width="4"/><path d="M14 25h36v-9H14Z" fill="$GOLD"/><path d="M9 16 32 3l24 13Z" fill="$GREEN"/><path d="M22 17v8m19-8v8" stroke="#253c30" stroke-width="3"/>',palisade:'<path d="M7 57V23l6-10 6 10v34m1 0V14l6-10 6 10v43m1 0V14l6-10 6 10v43m1 0V23l6-10 6 10v34" fill="$GOLD"/><path d="M5 32h54M5 48h54" stroke="#675b3d" stroke-width="5"/>',training:`<path d="M45 59V20m-10 12h23M38 17h14l3 16-10 8-9-8Z" fill="$GOLD" stroke="#d3b47e" stroke-width="3"/><g transform="translate(-8 18) scale(.68)">${hr}</g><path d="m32 20 3-7m1 13 9-3" stroke="#f0d799" stroke-width="3"/>`,boss:`<g transform="translate(0 7)">${Ln}</g><path d="m17 13 7 5 8-12 8 12 8-5-4 15H21Z" fill="$GOLD"/><path d="m6 37 5 8m45-8-5 8" stroke="#e3986e" stroke-width="3"/>`,repair:'<path d="m16 54 27-33m-3-9 9-7 12 9-5 10-10 1-6-7" stroke="#d3dfc8" stroke-width="8"/><path d="m12 55 7-10" stroke="#e4bc73" stroke-width="11"/>',crown:'<path d="M9 20 21 31 32 12 44 31l12-11-6 34H15Z" fill="$GOLD"/><path d="M17 46h31" stroke="#fff0ae" stroke-width="3"/><circle cx="32" cy="11" r="5" fill="#ddaa58"/><circle cx="9" cy="19" r="4" fill="#dfbc74"/><circle cx="56" cy="19" r="4" fill="#dfbc74"/>',follow:'<path d="M7 30h14v23H7Z" fill="#7d9d6c"/><path d="M24 22h14v31H24Z" fill="$GREEN"/><path d="m44 7 15 14-15 14v-9H29V16h15Z" fill="$GOLD"/>',regroup:`<path d="m6 13 13 1-1 13m40-14-13 1 1 13M6 52l13-1-1-13m40 14-13-1 1-13" stroke="#e2d496" stroke-width="4"/><g transform="translate(14 12) scale(.56)">${Ln}</g>`,forage:`<g transform="translate(-2 3) scale(.65)">${dr}</g><path d="M35 38c14-15 27-4 23 6-5 11-20 9-25 3Z" fill="$GREEN"/><path d="m20 54 16-12" stroke="#d8e6a6" stroke-width="3"/><path d="m48 11 10 1-4 10" stroke="#e9cb83" stroke-width="3"/>`,group:`<g transform="translate(-6 10) scale(.55)">${Ln}</g><g transform="translate(30 10) scale(.55)">${Ln}</g><g transform="translate(10 -2) scale(.68)">${Ln}</g>`,recruit:`<g transform="translate(-3 3) scale(.8)">${Ln}</g><path d="M48 34v22M37 45h22" stroke="#e3efae" stroke-width="7"/>`,persuade:`<g transform="translate(-7 12) scale(.58)">${Ln}</g><g transform="translate(34 12) scale(.58)">${Ln}</g><path d="m24 18 8-8 8 8m-8-8v26" stroke="#f1d58c" stroke-width="3"/>`,camera:'<path d="M8 18h13l6-8h14l5 8h11v36H8Z" fill="#639377"/><circle cx="33" cy="36" r="13" fill="#182f2b" stroke="#dfdeb0" stroke-width="3"/><circle cx="33" cy="36" r="7" fill="#89b5b0"/><path d="m31 31 6 7" stroke="#d5e9d1" stroke-width="2"/>',first:'<path d="M5 32q27-36 54 0-27 36-54 0Z" fill="$GREEN"/><ellipse cx="32" cy="32" rx="12" ry="16" fill="$GOLD"/><ellipse cx="32" cy="32" rx="5" ry="12" fill="#143329"/>',third:`<g transform="translate(3 12) scale(.7)">${Ln}</g><path d="M37 7h23v19H37Z" fill="#b3d1bd"/><path d="m47 26-7 13" stroke="#c6dfb4" stroke-width="3"/>`,topdown:'<path d="m6 12 16-5 20 7 16-5v44l-16 5-20-7-16 5Z" fill="#709576"/><path d="M22 7v44m20-37v44" stroke="#c7daaa" stroke-width="2"/><path d="m32 23 8 14-8-3-8 3Z" fill="#ffe5a1"/>',save:'<path d="M11 6h38l6 7v45H9V6Z" fill="$GREEN"/><path d="M20 6h23v18H20Zm-3 32h30v20H17Z" fill="#dae4b1"/><path d="M36 8v13M23 44h17M23 50h17" stroke="#628469" stroke-width="3"/>',pause:'<path d="M16 10h11v44H16Zm21 0h11v44H37Z" fill="$GOLD"/>',check:'<path d="M32 4 56 17v29L32 60 8 46V17Z" fill="$GREEN"/><path d="m18 32 10 10 19-22" stroke="#f0ecb5" stroke-width="6"/>',warning:'<path d="M32 5 61 55H3Z" fill="$GOLD"/><path d="M32 21v17" stroke="#523e28" stroke-width="5"/><circle cx="32" cy="46" r="3" fill="#523e28"/>',enemy:'<path d="m10 11 9 7q13-10 26 0l9-7-3 21-9 21H22l-9-21Z" fill="#c96c55"/><path d="m18 29 10 5-2-11m20 6-10 5 2-11" fill="#1c3026"/><path d="m26 43 6-5 6 5m-11 7h10" stroke="#f5d493" stroke-width="3"/>',heron:'<path d="M34 55c-16-8-15-22-1-29 12-7 15-9 7-14L24 9l-14 5 19 3 6 9c-14 2-23 17-14 29Z" fill="#c1d3cf"/><path d="M31 12 11 15l16 5" fill="$GOLD"/><path d="M28 52v9m11-9v9" stroke="#c0ad78" stroke-width="2"/><circle cx="31" cy="12" r="2" fill="#1c332c"/>',snake:'<path d="M9 50c27 18 40-16 13-17-23-1-5-22 12-15 22 9 26-3 17-10" stroke="#83aa6e" stroke-width="11"/><path d="M47 5q12-4 14 4-2 10-13 8Z" fill="$GREEN"/><circle cx="54" cy="8" r="1.5" fill="#f5d784"/><path d="M60 13h3" stroke="#e68b7e" stroke-width="2"/>',fish:'<path d="M7 34c13-25 29-26 41-10l12-9v34l-12-8C31 58 17 52 7 34Z" fill="$GREEN"/><path d="m25 14 12-9 3 15M27 50l11 9 3-14" fill="#d0bd78"/><path d="M24 22c7 6 7 19 0 26" stroke="#315c4c" stroke-width="2"/><circle cx="17" cy="30" r="4" fill="$GOLD"/><circle cx="17" cy="30" r="1.8" fill="#17332a"/>',rescue:'<path d="M14 7 7 20l11 17 12-4m20-26 7 13-11 17-12-4" stroke="#d5af79" stroke-width="8"/><path d="m19 27 12 14 11-14" stroke="#9ecc87" stroke-width="9"/><path d="M22 53h20M32 44v17" stroke="#f1dc96" stroke-width="6"/>',windup:'<path d="m6 48 8-13 5 13m9-2 8-13 5 13m9-2 8-13 5 13" stroke="#f3bc6e" stroke-width="3"/><path d="m16 10 16 4 16-4-7 15H23Z" fill="#df8b64"/><path d="M32 3v9" stroke="#ffe3a0" stroke-width="3"/>',recover:'<path d="M50 19a23 23 0 1 0 4 23M50 19l-1-13m1 13-14-1" stroke="#c9dca7" stroke-width="5"/><path d="M33 18v16l10 5" stroke="#efd38c" stroke-width="4"/>',"rotate-left":'<path d="M14 23C21 3 54 9 55 32c1 16-16 26-30 19" stroke="#bedc9a" stroke-width="7"/><path d="m5 22 17 4-5-16" fill="$GOLD" stroke="#f0dca0" stroke-width="2"/><path d="m27 31 11-4 10 7-11 6Z" fill="$GREEN"/><path d="M27 31v12l10 7V40m0 0 11-6v12l-11 4" fill="#5b8e67" stroke="#deebb3" stroke-width="1.6"/>',"rotate-right":'<path d="M50 23C43 3 10 9 9 32c-1 16 16 26 30 19" stroke="#bedc9a" stroke-width="7"/><path d="m59 22-17 4 5-16" fill="$GOLD" stroke="#f0dca0" stroke-width="2"/><path d="m16 31 11-4 10 7-11 6Z" fill="$GREEN"/><path d="M16 31v12l10 7V40m0 0 11-6v12l-11 4" fill="#5b8e67" stroke="#deebb3" stroke-width="1.6"/>',place:'<path d="m6 44 24-11 28 12-25 14Z" fill="#64885d" stroke="#c5dd9c" stroke-width="2"/><path d="M32 5v27m-9-9 9 10 9-10" stroke="#f5df9a" stroke-width="5"/><path d="m13 42 8-4m22 0 8 4m-12 9-6 3-6-3" stroke="#e0eab8" stroke-width="3"/>',invalid:'<path d="m22 5 21 0 16 16v22L43 59H21L5 43V21Z" fill="#9d4d3f" stroke="#efb09a" stroke-width="2.8"/><path d="m21 21 22 22m0-22L21 43" stroke="#ffe3be" stroke-width="6"/>',close:'<path d="m17 17 30 30m0-30L17 47" stroke="#d7dfb9" stroke-width="5"/>'},tx={shelter:"camp",build:"repair",guard:"shield",train:"training",materials:"reeds",wood:"reeds",leaves:"reeds",hunger:"stomach",energy:"stamina",level:"crown",promotion:"crown",selection:"group"};function ht(i,t=""){return J1(xd[tx[i]||i]||xd.leaf,t)}function lc(i){return{hunter:"tongue",scout:"dodge",bruiser:"slam",caller:"roar",guardian:"shield",guard:"shield",intimidator:"roar"}[i]||"frog"}function ii(i="ally",t=""){const e=["player","ally","friendly"].includes(i),n=i==="neutral",s=Number(String(i).match(/\d+/)?.[0]||0)%5,a=e?"#bfe7a4":n?"#e3d9a4":["#e8aa70","#d8786b","#b9ad81","#a9a0d4","#8dc2b8"][s];return`<svg xmlns="http://www.w3.org/2000/svg" class="fg-emblem ${t}" viewBox="0 0 64 70" aria-hidden="true"><path d="M32 3 59 14l-3 30C53 55 43 63 32 68 21 63 11 55 8 44L5 14Z" fill="${e?"#1e4f3e":n?"#3c4330":"#452b29"}" stroke="${a}" stroke-width="2.5"/><path d="M32 9 52 18l-3 24C46 51 39 57 32 61c-8-5-15-11-17-19l-3-24Z" fill="none" stroke="${a}" opacity=".3"/><g fill="none" stroke="${a}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${e?'<path d="M43 20C28 17 18 26 21 38c3 10 14 9 19-1 3-7 0-11 3-17ZM20 51l17-24m-9 13-5-8m9 3 7-1"/>':n?'<path d="m24 27 8-8 8 8m-8-8v29m-9-8 9 9 9-9"/>':['<path d="m20 19 7 12-5 13m22-25-7 12 5 13M28 46h8"/>','<path d="M22 18 18 36l14 13 14-13-4-18M25 30l7 6 7-6"/>','<path d="M21 20v28m11-33v34m11-29v28M17 26h8m3-4h8m3 4h8"/>','<path d="M44 17a19 19 0 1 0 3 28A20 20 0 0 1 44 17Z"/>','<path d="m18 24 7 6 7-13 7 13 7-6-5 22H23Z"/>'][s]}</g></svg>`}function ex(i={}){let t=0;for(const r of String(i.id||i.name||"frog"))t=t*31+r.charCodeAt(0)>>>0;const e=[91,111,136,73,156,55],n=e[t%e.length];lc(i.role);const s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"><defs><radialGradient id="a"><stop stop-color="#395d48"/><stop offset="1" stop-color="#10281f"/></radialGradient><linearGradient id="s" x2=".7" y2="1"><stop stop-color="hsl(${n} 40% 66%)"/><stop offset="1" stop-color="hsl(${n} 35% 28%)"/></linearGradient></defs><rect width="160" height="160" fill="url(#a)"/><ellipse cx="82" cy="149" rx="65" ry="35" fill="#1a3429"/><path d="M28 106c-16-24 7-53 27-44 4-40 49-37 52 1 35-7 45 26 28 48-22 28-88 29-107-5Z" fill="url(#s)" stroke="#264333" stroke-width="3"/><ellipse cx="51" cy="65" rx="21" ry="25" fill="url(#s)"/><ellipse cx="111" cy="65" rx="21" ry="25" fill="url(#s)"/><ellipse cx="51" cy="63" rx="14" ry="16" fill="#e4c27d"/><ellipse cx="111" cy="63" rx="14" ry="16" fill="#e4c27d"/><path d="M40 63h22m38 0h22" stroke="#142c25" stroke-width="8" stroke-linecap="round"/><path d="M35 111q43 18 89-2" fill="none" stroke="#e1d9a2" stroke-width="8" stroke-linecap="round"/><path d="M34 105q45 14 91-2" fill="none" stroke="#2c4934" stroke-width="3"/><g fill="#224b36" opacity=".4"><circle cx="67" cy="83" r="5"/><circle cx="86" cy="90" r="4"/><circle cx="101" cy="80" r="4"/><circle cx="53" cy="94" r="3"/></g>${i.role==="bruiser"?'<path d="M27 133 12 142l10 18h27l4-22m80-5 16 9-10 18h-25l-6-22" fill="#8d865d" stroke="#d6c68e" stroke-width="2"/>':""}${i.role==="caller"?'<path d="M70 29 78 14l6 10 9-12 3 20" fill="#c5a563"/>':""}</svg>`;return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(s)}`}const Ye=(i,t)=>i.querySelector(t),ll=(i,t)=>Array.from(i.querySelectorAll(t)),si=(i,t=0,e=1)=>Math.max(t,Math.min(e,Number(i)||0)),me=(i="")=>String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),Ni=i=>String(i||"").replace(/καλάμια/gi,"υλικά κατασκευής").replace(/καλαμιών/gi,"υλικών κατασκευής"),kn=i=>Math.max(0,Math.floor(Number(i)||0)),de=i=>Math.max(0,Math.round(Number(i)||0)),gn=(i,t)=>si((Number(i)||0)/(Number(t)||100)),ur=new Set(["shelter","store","nursery","training","watchtower","palisade"]),nx={"primary-attack":"Γλώσσα","special-attack":"Κλωτσιά",dodge:"Αποφυγή",interact:"Πλησίασε","open-build":"Χτίσε","hud-more":"Άλλα",intimidate:"Εκφόβισε","gang-toggle":"Επίθεση ομάδας","gang-forage":"Βρείτε τροφή","cycle-view":"Κάμερα","open-roster":"Ομάδα","open-map":"Χάρτης","open-pause":"Παύση"},ix={Στρατολόγησε:"Ένταξη",Κατασκευές:"Χτίσε",Ακολούθησε:"Έλα",Φρούρησε:"Φρουρά",Αποφυγή:"Ελιγμός"},cl=i=>`<span class="fg-caption-wide">${me(i)}</span><span class="fg-caption-compact">${me(ix[i]||i)}</span>`,sx=i=>({"gather-food":"Τροφή",food:"Τροφή","gather-reeds":"Υλικά",reeds:"Υλικά","build-shelter":"Καταφύγιο",shelter:"Καταφύγιο","build-store":"Αποθήκη",store:"Αποθήκη","build-nursery":"Φωλιά",nursery:"Φωλιά","build-training":"Εκπαιδευτήριο",training:"Εκπαιδευτήριο","recruit-allies":"Σύμμαχοι",allies:"Σύμμαχοι","train-starters":"Εκπαιδευμένοι",trained:"Εκπαιδευμένοι","train-army":"Εκπαιδευμένοι","expand-shelters":"Καταφύγια","expand-buildings":"Κτίρια",territories:"Περιοχές"})[i.id]||({heron:"Ερωδιός",snake:"Νερόφιδο",fish:"Ψάρι"}[i.type||i.icon]?(i.boss?"Αρχηγός ":"")+{heron:"Ερωδιός",snake:"Νερόφιδο",fish:"Ψάρι"}[i.type||i.icon]:Su(i).title),rx={scout:"Ανιχνευτής",hunter:"Κυνηγός",bruiser:"Μαχητής",brute:"Βαρύς μαχητής",guardian:"Φύλακας",guard:"Φρουρός",leader:"Αρχηγός",agile:"Ακροβάτης",warrior:"Πολεμιστής",striker:"Μαχητής",intimidator:"Εκφοβιστής",caller:"Κράχτης"},yd={heron:"ΕΡΩΔΙΟΣ",snake:"ΝΕΡΟΦΙΔΟ",fish:"ΑΡΠΑΚΤΙΚΟ ΨΑΡΙ"},ax={heron:"Απέφυγε το ράμφος. Χτύπησε όταν ορμήσει.",snake:"Άνοιξε την ομάδα. Επίθεση από τα πλάγια.",fish:"Πήγαινε σε πέτρες και ρηχά. Πρόσεχε τη σκιά."},_d={leaf:'<path d="M19 3C8 2 3 7 4 14c1 6 9 7 12 1 2-4 1-7 3-12Z"/><path d="M5 20 15 8M8 15l-1-5M11 12l5 1"/>',fly:'<path d="M12 8v11M9 10l-4-4M15 10l4-4M9 14l-5 2M15 14l5 2M10 18l-3 3M14 18l3 3"/><ellipse cx="7" cy="9" rx="3" ry="5" transform="rotate(-35 7 9)"/><ellipse cx="17" cy="9" rx="3" ry="5" transform="rotate(35 17 9)"/>',reeds:'<path d="M7 22V8m5 14V4m5 18V10M5 7V3h4v4Zm5-4V1h4v2Zm5 6V5h4v4Z"/>',heart:'<path d="m12 20-8-8C-1 6 7 1 12 7c5-6 13-1 8 5Z"/>',bolt:'<path d="m14 2-9 12h6l-1 8 9-13h-6Z"/>',stomach:'<path d="M10 3v6c-5-1-7 2-6 6 1 6 10 8 15 2 4-5 0-11-5-9V3M6 14c2-2 4 1 6 1"/>',moon:'<path d="M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',shield:'<path d="m12 2 8 3v7c0 5-8 10-8 10S4 17 4 12V5Z"/><path d="m8 12 3 3 6-6"/>',group:'<circle cx="12" cy="7" r="3"/><path d="M6 21v-4c0-6 12-6 12 0v4M4 7a3 3 0 0 0 0 6M20 7a3 3 0 0 1 0 6M2 20v-3m20 3v-3"/>',camp:'<path d="m2 20 10-17 10 17ZM8 20l4-8 4 8M9 3l3 4 3-4"/>',crown:'<path d="m3 6 4 4 5-7 5 7 4-4-3 14H6ZM7 16h10"/>',arrow:'<path d="m5 12 14 0m-6-6 6 6-6 6"/>',close:'<path d="m5 5 14 14M19 5 5 19"/>',sound:'<path d="M3 9v6h4l5 5V4L7 9ZM16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',pin:'<path d="M19 9c0 5-7 13-7 13S5 14 5 9a7 7 0 1 1 14 0Z"/><circle cx="12" cy="9" r="2"/>',skull:'<path d="M8 21v-4H5V9a7 7 0 0 1 14 0v8h-3v4ZM12 18v3"/><circle cx="9" cy="10" r="1.5"/><circle cx="15" cy="10" r="1.5"/>',more:'<circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/>',check:'<path d="m4 12 5 5L20 6"/>'};function je(i,t=""){return`<svg class="fg-icon ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${_d[i]||_d.leaf}</svg>`}const We=i=>`<kbd>${i}</kbd>`;class ox{constructor({onAction:t=()=>{},onStart:e=()=>{},onResume:n=()=>{},onSettings:s=()=>{}}={}){this.callbacks={onAction:t,onStart:e,onResume:n,onSettings:s},this.abort=new AbortController,this.state={},this.portraits={},this.panel=null,this.menu=null,this.lastDraw=0,this.lastPanel=0,this.hudDisclosure=null,this.rosterFilter="all",this.toastKeys=new Map,this.portraitCache=new Map,this.settings={quality:"high",volume:.65,sensitivity:1},this.root=document.createElement("div"),this.root.id="frog-ui",this.root.innerHTML=this.markup(),document.body.append(this.root),Ye(this.root,".fg-title-art").style.backgroundImage='url("./art/creek.jpg")',this.refs={};for(const r of ll(this.root,"[data-ref]"))this.refs[r.dataset.ref]=r;this.root.addEventListener("click",r=>this.click(r),{signal:this.abort.signal}),this.root.addEventListener("dragstart",r=>this.beginBuildDrag(r),{signal:this.abort.signal}),document.addEventListener("dragover",r=>this.moveBuildDrag(r),{signal:this.abort.signal}),document.addEventListener("drop",r=>this.dropBuildDrag(r),{signal:this.abort.signal}),document.addEventListener("dragend",()=>this.finishBuildDrag(),{signal:this.abort.signal}),this.root.addEventListener("scroll",r=>{r.target.classList?.contains("fg-illustrated-build")&&this.syncBuildCatalog()},{capture:!0,signal:this.abort.signal}),this.root.addEventListener("input",r=>this.setting(r),{signal:this.abort.signal}),this.root.addEventListener("change",r=>this.setting(r),{signal:this.abort.signal}),this.root.addEventListener("contextmenu",r=>r.preventDefault(),{signal:this.abort.signal}),this.root.addEventListener("keydown",r=>this.hudKeydown(r),{signal:this.abort.signal}),document.addEventListener("keydown",r=>{this.hudDisclosure&&r.code==="Escape"&&(r.preventDefault(),r.stopPropagation(),this.closeHudDisclosure(!0))},{capture:!0,signal:this.abort.signal}),document.addEventListener("pointerdown",r=>{this.hudDisclosure&&!r.target.closest?.('.fg-objective,.fg-action-drawer,[data-action="hud-more"]')&&this.closeHudDisclosure()},{signal:this.abort.signal}),window.addEventListener("resize",()=>{this.lastDraw=0},{signal:this.abort.signal}),this.setLoading("Δημιουργία του ποταμού…")}toggleHudDisclosure(t){const e=this.hudDisclosure===t?null:t;this.setHudDisclosure(e)}setHudDisclosure(t,e=!1){const n=this.hudDisclosure||null;n!==t&&(this.hudDisclosure=t,this.refs.objectiveDetails&&(this.refs.objectiveDetails.hidden=t!=="objectives"),this.refs.actionDrawer&&(this.refs.actionDrawer.hidden=t!=="actions"),this.refs.objectiveToggle?.setAttribute("aria-expanded",String(t==="objectives")),this.refs.moreToggle?.setAttribute("aria-expanded",String(t==="actions")),this.refs.objectiveBox?.classList.toggle("is-expanded",t==="objectives"),this.root.classList.toggle("fg-hud-drawer-open",!!t),e&&(n==="objectives"?this.refs.objectiveToggle:this.refs.moreToggle)?.focus({preventScroll:!0}),this.callbacks.onAction("hud-disclosure",{name:t,open:!!t}))}closeHudDisclosure(t=!1){this.hudDisclosure&&this.setHudDisclosure(null,t)}hudKeydown(t){if(this.hudDisclosure&&t.code==="Escape"){t.preventDefault(),t.stopPropagation(),this.closeHudDisclosure(!0);return}const e=t.target.closest?.("button");if(e&&["Space","Enter"].includes(t.code)){t.preventDefault(),t.stopPropagation(),e.click();return}(t.target.matches?.("input,select")||t.target.closest?.(".fg-panel")&&!["Escape","Tab","KeyV"].includes(t.code)&&!this.state.buildPlacement?.active)&&t.stopPropagation()}scrollBuildCatalog(t){const e=Ye(this.refs.panel,".fg-illustrated-build");if(!e)return;const n=Ye(e,".fg-picture-building")?.getBoundingClientRect().width||220,s=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;e.scrollBy({left:Math.sign(t||1)*(n+14),behavior:s?"instant":"smooth"})}syncBuildCatalog(){if(this.panel!=="build")return;const t=Ye(this.refs.panel,".fg-illustrated-build");if(!t)return;const e=Ye(this.refs.panel,'[data-action="build-scroll"][data-direction="-1"]'),n=Ye(this.refs.panel,'[data-action="build-scroll"][data-direction="1"]');e&&(e.disabled=t.scrollLeft<=2),n&&(n.disabled=t.scrollLeft+t.clientWidth>=t.scrollWidth-2)}beginBuildDrag(t){const e=t.target.closest('.fg-picture-building[draggable="true"]');if(!e||e.disabled||!ur.has(e.dataset.type)){t.preventDefault();return}if(this.draggingBuild=!0,this.dragClickUntil=1/0,t.dataTransfer){t.dataTransfer.effectAllowed="copy",t.dataTransfer.setData("application/x-frog-building",e.dataset.type),t.dataTransfer.setData("text/plain",e.dataset.type);const n=e.querySelector(".fg-building-art");n&&t.dataTransfer.setDragImage(n,n.clientWidth/2,n.clientHeight/2)}if(this.callbacks.onAction("begin-placement",{type:e.dataset.type,dragging:!0}),!this.state.buildPlacement?.active){this.draggingBuild=!1,this.dragClickUntil=performance.now()+180,t.preventDefault();return}this.dragVisibilityFrame=requestAnimationFrame(()=>{this.draggingBuild&&this.root.classList.add("fg-build-dragging")})}moveBuildDrag(t){this.draggingBuild&&(t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="copy"),this.callbacks.onAction("move-placement",{clientX:t.clientX,clientY:t.clientY,dragging:!0}))}dropBuildDrag(t){if(!this.draggingBuild)return;t.preventDefault(),t.stopPropagation();const e={clientX:t.clientX,clientY:t.clientY};this.finishBuildDrag(!1),this.callbacks.onAction("drop-placement",e)}finishBuildDrag(t=!0){this.draggingBuild&&(this.draggingBuild=!1,this.dragClickUntil=performance.now()+180,cancelAnimationFrame(this.dragVisibilityFrame),this.root.classList.remove("fg-build-dragging"),this.closePanels(),t&&this.state.buildPlacement?.active&&this.callbacks.onAction("cancel-placement",{}))}updatePlacement(t){const e=!!t?.active,n=this.resources(this.state.resources);if(!e&&this.draggingBuild&&this.finishBuildDrag(!1),e&&this.closeHudDisclosure(),this.root.classList.toggle("fg-is-placing",e),this.refs.buildPlacement.hidden=!e,!e)return;const s=!!t.valid,r=typeof t.cost=="number"?{food:t.cost,reeds:0}:t.cost||{},a={shelter:"camp"}[t.type]||t.type||"camp";this.placementArt!==a&&(this.placementArt=a,this.refs.placementArt.innerHTML=ht(a));const o=s?"check":"invalid";this.placementStatus!==o&&(this.placementStatus=o,this.refs.placementStatus.innerHTML=ht(o)),this.refs.buildPlacement.classList.toggle("is-invalid",!s),this.refs.buildPlacement.classList.toggle("is-dragging",!!t.dragging),this.refs.buildPlacement.title=Ni(t.reason||(s?"Έτοιμο για τοποθέτηση":"Ακατάλληλη θέση κατασκευής")),this.refs.placementConfirm.disabled=!s,this.setText("placementAngle",`${Math.round(((Number(t.yaw)||0)*180/Math.PI%360+360)%360)}°`),this.setText("placementFood",`${kn(n.food)} / ${de(r.food)}`),this.setText("placementMaterials",`${kn(n.reeds)} / ${de(r.reeds)}`),this.refs.placementFood.parentElement.classList.toggle("is-short",n.food<(r.food||0)),this.refs.placementMaterials.parentElement.classList.toggle("is-short",n.reeds<(r.reeds||0))}actionTile(t,e,n,s,r=""){return`<button class="fg-action-tile" data-action="${t}" data-cooldown="${r}" aria-label="${me(s)}" title="${me(s)}"><span class="fg-action-art">${e==="more"?je("more"):ht(e)}</span><span class="fg-action-caption">${cl(nx[t]||s)}</span><span class="fg-cooldown-cover"></span><span class="fg-cooldown-time"></span>${n?We(n):""}<span class="fg-ready-line"></span></button>`}commandButton(t,e="selection-command",n=""){const s={follow:"Ακολουθήστε",attack:"Επίθεση",forage:"Βρείτε μύγες · τροφή και θεραπεία",guard:"Υπεράσπιση καταφυγίου",regroup:"Ανασύνταξη όλης της ομάδας",train:"Εκπαίδευση",promote:"Προαγωγή"},r={guard:"shield",train:"training",training:"training",promote:"crown"}[t]||t;return`<button class="fg-command-image" data-action="${e}" data-command="${t}"${n?` data-id="${me(n)}"`:""} aria-label="${s[t]||t}" title="${s[t]||t}">${ht(r)}</button>`}trainingButton(t="selection"){const e=this.state,n=e.allies||[],s=this.chosen(),r=e.training?.cost||{food:8,reeds:4},l=(t==="gang"?n:n.filter(g=>s.has(String(g.id)))).filter(g=>!g.trained&&!(g.trainingProgress>0)&&!["train","training"].includes(g.order)).length,c={food:l*(r.food||0),reeds:l*(r.reeds||0)},h=this.resources(e.resources),u=[...e.camps||[],...e.currentCamp?[e.currentCamp]:[]].some(g=>["ally","player","friendly",0].includes(g.team)&&!g.destroyed&&g.hp!==0&&g.buildings?.training),f=h.food>=c.food&&h.reeds>=c.reeds,p=l>0&&u&&f,v=l?`Εκπαίδευση ${l} βατράχων · ${de(c.food)} τροφή + ${de(c.reeds)} υλικά κατασκευής · ${de(e.training?.duration||18)} δευτερόλεπτα ανά βάτραχο${u?f?"":" · Δεν αρκούν τα αποθέματα":" · Χρειάζεται χώρος εκπαίδευσης"}`:"Επίλεξε βατράχους που χρειάζονται εκπαίδευση";return t==="gang"?`<button class="fg-command-image fg-global-training" data-action="gang-command" data-command="train" title="${me(v)}" aria-label="${me(v)}" ${p?"":"disabled"}>${ht("training")}<span class="fg-command-caption">Εκπαίδευση</span><b>${l}</b></button>`:`<button class="fg-training-order${f?"":" is-short"}" data-action="selection-command" data-command="train" title="${me(v)}" aria-label="${me(v)}" ${p?"":"disabled"}><strong class="fg-training-title">Εκπαίδευση</strong><span class="fg-training-order-image">${ht("training")}<b>${l}</b></span><span class="fg-training-costs"><span>${ht("fly")}<b>${de(c.food)}</b></span><span>${ht("reeds")}<b>${de(c.reeds)}</b></span></span><span class="fg-training-state">${ht(p?"check":"warning")}</span></button>`}portrait(t={}){const e=t.portrait||this.portraits[t.id]||this.portraits[t.role];if(e)return e;const n=String(t.id??t.name??t.role??"frog")+":"+(t.tier||1)+":"+(t.role||"hunter");return this.portraitCache.has(n)||this.portraitCache.set(n,ex(t)),this.portraitCache.get(n)}chosen(){return new Set((this.state.selectedIds||this.state.allies?.filter(t=>t.selected).map(t=>t.id)||[]).map(String))}markup(){return`
    <div class="fg-hud fg-visual-hud fg-compact-hud" data-ref="hud" hidden>
      <div class="fg-hud-top">
      <section class="fg-player" aria-label="Κατάσταση παίκτη">
        <div class="fg-player-top"><div class="fg-avatar"><img data-ref="playerPortrait" alt="Ο βάτραχός σου" hidden><span data-ref="playerBadge">${ht("frog")}</span><b data-ref="level">1</b></div><div class="fg-player-crest" title="Πράσινο Ρεύμα">${ii("ally")}<span data-ref="tier">I</span></div><button class="fg-members-button" data-action="open-roster" title="Διοίκηση συμμορίας · TAB" aria-label="Διοίκηση συμμορίας">${ht("group")}<b data-ref="gangCount">1</b></button></div>
        <div class="fg-vital fg-health" title="Υγεία">${ht("heart")}<div class="fg-meter"><span data-ref="hpBar"></span></div><small data-ref="hpLabel">100</small></div>
        <div class="fg-vital fg-energy" title="Αντοχή">${ht("stamina")}<div class="fg-meter"><span data-ref="staminaBar"></span></div><small data-ref="staminaLabel">100</small></div>
        <div class="fg-vital fg-hunger" title="Στομάχι">${ht("stomach")}<div class="fg-meter"><span data-ref="stomachBar"></span></div><small data-ref="stomachLabel">70%</small></div>
        <div class="fg-xp" title="Εμπειρία"><span data-ref="xpBar"></span></div>
      </section>
      <section class="fg-location"><div class="fg-resource-row fg-resource-bank" aria-label="Κοινά αποθέματα"><span title="Κοινό απόθεμα τροφής" aria-label="Τροφή">${ht("fly")}<b data-ref="food">0</b><small>Τροφή</small></span><span title="Υλικά κατασκευής (ξύλο, φύλλα, καλάμια)" aria-label="Υλικά κατασκευής">${ht("reeds")}<b data-ref="reeds">0</b><small>Υλικά</small></span></div><div class="fg-location-tools"><div class="fg-clock"><span data-ref="dayIcon">${je("sun")}</span><b data-ref="clock">09:00</b><span data-ref="day">1</span></div><button class="fg-map-button" data-action="open-map" aria-label="Χάρτης" title="Χάρτης">${ht("topdown")}<canvas data-ref="minimap" width="64" height="64" hidden></canvas></button></div></section>
      </div>
      <section class="fg-objective" data-ref="objectiveBox" aria-label="Στόχοι εκστρατείας">
        <button class="fg-objective-toggle" data-action="hud-objectives" data-ref="objectiveToggle" aria-expanded="false" aria-controls="fg-objective-details" title="Στόχοι εκστρατείας" aria-label="Άνοιγμα στόχων εκστρατείας"><span class="fg-objective-lead" data-ref="objectiveArt" hidden>${ht("camp")}</span><span class="fg-objective-next" data-ref="objectiveNext">${ht("fly")}</span><span class="fg-objective-brief"><strong data-ref="objectiveTitle">Βρες τροφή</strong><span class="fg-objective-count"><b data-ref="objectiveSummary">0 / 30</b><span class="fg-objective-track"><span data-ref="objectiveMeter"></span></span></span></span><span class="fg-disclosure-arrow">${je("arrow")}</span></button>
        <div class="fg-objective-details" data-ref="objectiveDetails" id="fg-objective-details" hidden><p class="fg-objective-help" data-ref="objectiveHint"></p><div class="fg-conquest-summary"><span class="fg-conquest-label">Συμμορίες</span><div class="fg-territories" data-ref="territories"></div><b data-ref="objectiveProgress">0 / 5</b></div><div class="fg-campaign-strip" data-ref="campaignObjectives"></div></div>
      </section>
      <section class="fg-hunt" data-ref="hunt" aria-live="polite" hidden>
        <div class="fg-hunt-portrait"><img data-ref="predatorPortrait" alt="Θηρευτής" hidden><span data-ref="predatorFallback">${ht("heron")}</span><span class="fg-hunt-badge">${ht("enemy")}</span></div>
        <div class="fg-hunt-content"><div class="fg-hunt-heading"><span data-ref="predatorPhaseIcon">${ht("windup")}</span><span data-ref="predatorHpLabel">100 / 100</span></div><div class="fg-predator-health"><span data-ref="predatorHp"></span></div><div class="fg-phase-track"><span data-ref="predatorPhaseBar"></span></div><div class="fg-hunt-response" data-ref="predatorResponse"></div></div>
      </section>
      <div class="fg-crosshair" data-ref="crosshair"><i></i><i></i><i></i><i></i><span></span></div>
      <div class="fg-context" data-ref="context" hidden><span data-ref="contextArt"></span><kbd data-ref="contextKey">E</kbd><div class="fg-context-track"><span data-ref="contextBar"></span></div></div>
      <section class="fg-selection-dock" data-ref="selectionDock" aria-label="Επιλεγμένη ομάδα"><button class="fg-squad-entry" data-action="open-roster" aria-label="Διοίκηση συμμορίας" title="Διοίκηση συμμορίας · TAB"><span data-ref="squadMode">${ht("follow")}</span><span class="fg-squad-caption"><small data-ref="selectionLabel">Ομάδα</small><b data-ref="selectionCount">0</b></span>${ii("ally")}</button><div class="fg-dock-portraits" data-ref="selectionPortraits"></div></section>
      <div class="fg-actionbar fg-image-actionbar fg-primary-actions" aria-label="Βασικές ενέργειες">
        ${this.actionTile("primary-attack","tongue","LMB","Επίθεση με τη γλώσσα","attack")}
        ${this.actionTile("special-attack","kick","Q","Ειδική επίθεση","special")}
        ${this.actionTile("dodge","dodge","Z","Αποφυγή","dodge")}
        ${this.actionTile("interact","recruit","E","Αλληλεπίδραση","interact")}
        ${this.actionTile("open-build","camp","V","Κατασκευές")}
        ${this.actionTile("hud-more","more","B","Περισσότερες ενέργειες · B").replace('data-action="hud-more"','data-action="hud-more" data-ref="moreToggle" aria-controls="fg-action-drawer" aria-expanded="false"')}
      </div>
      <section class="fg-action-drawer" data-ref="actionDrawer" id="fg-action-drawer" aria-label="Πρόσθετες ενέργειες" hidden>
        <button class="fg-drawer-close" data-action="hud-close" aria-label="Κλείσιμο πρόσθετων ενεργειών" title="Κλείσιμο">${ht("close")}</button>
        <div class="fg-secondary-actions">${this.actionTile("intimidate","roar","R","Εκφοβισμός","roar")}${this.actionTile("gang-toggle","attack","F","Επίθεση / ακολουθήστε")}${this.actionTile("gang-forage","forage","T","Αναζήτηση μυγών και θεραπεία")}${this.actionTile("cycle-view","third","C","Αλλαγή κάμερας","view")}${this.actionTile("open-roster","group","TAB","Διοίκηση συμμορίας")}${this.actionTile("open-map","topdown","","Χάρτης")}${this.actionTile("open-pause","pause","ESC","Παύση")}</div>
        <div class="fg-special-picker" aria-label="Επιλογή ειδικής κίνησης">${["kick","slam","tongue"].map((t,e)=>`<button data-action="special-select" data-index="${e}" title="${["Κλωτσιά","Άλμα κρούσης","Σάρωση γλώσσας"][e]}" aria-label="${["Κλωτσιά","Άλμα κρούσης","Σάρωση γλώσσας"][e]}" class="${e===0?"is-selected":""}">${ht(t)}<span class="fg-special-caption">${["Κλωτσιά","Άλμα","Σάρωση"][e]}</span>${We(e+1)}</button>`).join("")}</div>
      </section>
      <section class="fg-placement-hud fg-placement-tools" data-ref="buildPlacement" aria-label="Τοποθέτηση κατασκευής" hidden>
        <div class="fg-placement-building"><span data-ref="placementArt">${ht("camp")}</span><i data-ref="placementStatus">${ht("check")}</i></div>
        <div class="fg-placement-costs"><span title="Τροφή: διαθέσιμη / κόστος">${ht("fly")}<b data-ref="placementFood">0 / 0</b></span><span title="Υλικά κατασκευής: διαθέσιμα / κόστος">${ht("reeds")}<b data-ref="placementMaterials">0 / 0</b></span></div>
        <div class="fg-placement-rotation"><div><button data-action="rotate-placement" data-direction="-1" title="Περιστροφή αριστερά · Q" aria-label="Περιστροφή αριστερά">${ht("rotate-left")}${We("Q")}</button><button data-action="rotate-placement" data-direction="1" title="Περιστροφή δεξιά · R" aria-label="Περιστροφή δεξιά">${ht("rotate-right")}${We("R")}</button></div><b data-ref="placementAngle">0°</b></div>
        <button class="fg-placement-confirm" data-action="confirm-placement" data-ref="placementConfirm" title="Τοποθέτηση · πληρωμή και κατασκευή" aria-label="Επιβεβαίωση τοποθέτησης">${ht("place")}${We("LMB")}</button>
        <button class="fg-placement-cancel" data-action="cancel-placement" title="Ακύρωση · χωρίς χρέωση" aria-label="Ακύρωση τοποθέτησης">${ht("close")}${We("ESC")}</button>
      </section>
      <div class="fg-save-status" data-ref="saveStatus" title="Η πρόοδος αποθηκεύτηκε" hidden>${ht("save")}</div>
    </div>
    <div class="fg-toasts" data-ref="toasts" role="status" aria-live="polite"></div>
    <div class="fg-loading" data-ref="loading"><div class="fg-loading-mark">${je("leaf")}</div><b>FROG</b><span data-ref="loadingText">Δημιουργία του ποταμού…</span><div class="fg-loading-line"></div></div>
    <section class="fg-title fg-overlay" data-ref="title" hidden>
      <div class="fg-title-art"></div><div class="fg-title-shade"></div><div class="fg-title-top"><span>${je("leaf")} ARIS CONSTANTINOU</span><small>3D SURVIVAL · TERRITORY · GANGS</small></div>
      <div class="fg-title-body"><div class="fg-eyebrow fg-title-kicker">ΕΝΑΣ ΠΟΤΑΜΟΣ. ΠΟΛΛΕΣ ΣΥΜΜΟΡΙΕΣ.</div><h1>FROG<span>CREEK DOMINION</span></h1><p>Κυνήγησε. Στρατολόγησε. Κυριάρχησε.<br>Κράτησε τη συμμορία σου ζωντανή.</p><div class="fg-title-actions"><button class="fg-button fg-primary" data-action="continue" data-ref="continueButton" hidden>Συνέχεια ${je("arrow")}</button><button class="fg-button fg-primary" data-action="new-game" data-ref="newButton">Μπες στον ποταμό ${je("arrow")}</button><button class="fg-button fg-subtle" data-action="title-help">Χειρισμός & οδηγός</button></div><div class="fg-title-note">Ποντίκι για στόχευση · WASD για κίνηση · Αποθήκευση στη συσκευή σου</div></div>
      <div class="fg-title-bottom"><div><b>01</b><span>Βρες τα μεγάλα σμήνη</span></div><div><b>02</b><span>Χτίσε και υπερασπίσου</span></div><div><b>03</b><span>Ένωσε τον ποταμό</span></div></div>
    </section>
    <section class="fg-modal-layer" data-ref="pause" hidden><div class="fg-panel fg-pause-panel"><div class="fg-panel-head"><div><span class="fg-eyebrow">ΜΙΑ ΑΝΑΣΑ ΣΤΗΝ ΟΧΘΗ</span><h2>Παύση</h2></div><button class="fg-icon-button" data-action="resume" aria-label="Συνέχεια">${je("close")}</button></div><p class="fg-muted">Ο ποταμός σε περιμένει.</p><div class="fg-pause-actions"><button class="fg-button fg-primary" data-action="resume">Επιστροφή στο παιχνίδι ${je("arrow")}</button><button class="fg-button" data-action="save">Αποθήκευση προόδου ${je("check")}</button></div><div class="fg-settings"><label>Ποιότητα γραφικών<select data-setting="quality"><option value="high">Υψηλή</option><option value="medium">Ισορροπημένη</option><option value="low">Απόδοση</option></select></label><label>Ένταση ήχου <output data-ref="volumeOutput">65%</output><input type="range" min="0" max="100" value="65" data-setting="volume"></label><label>Ευαισθησία ποντικιού <output data-ref="sensitivityOutput">1.0×</output><input type="range" min="30" max="200" value="100" data-setting="sensitivity"></label></div><button class="fg-text-button" data-action="pause-help">Πλήρης χειρισμός & οδηγός ${je("arrow")}</button><button class="fg-text-button fg-danger-text" data-action="restart-confirm">Νέο ταξίδι</button><div data-ref="restartConfirm" class="fg-confirm" hidden><p>Η τρέχουσα αποθηκευμένη πρόοδος θα αντικατασταθεί.</p><button class="fg-button fg-danger" data-action="restart">Έναρξη νέου παιχνιδιού</button><button class="fg-button" data-action="restart-cancel">Ακύρωση</button></div></div></section>
    <section class="fg-modal-layer" data-ref="panelLayer" hidden><div class="fg-panel fg-game-panel" data-ref="panel"></div></section>
    <section class="fg-modal-layer" data-ref="ending" hidden><div class="fg-panel fg-ending-panel"><span class="fg-ending-mark" data-ref="endingMark">${je("crown")}</span><span class="fg-eyebrow" data-ref="endingEyebrow">Ο ΠΟΤΑΜΟΣ ΕΝΩΘΗΚΕ</span><h2 data-ref="endingTitle">Κυρίαρχος του ποταμού</h2><p data-ref="endingText"></p><div class="fg-ending-stats" data-ref="endingStats"></div><div class="fg-pause-actions"><button class="fg-button fg-primary" data-action="continue-after-end" data-ref="endingContinue">Συνέχισε την εξερεύνηση</button><button class="fg-button" data-action="restart">Νέο ταξίδι</button></div></div></section>`}click(t){const e=t.target.closest("[data-action]");if(!e||e.disabled)return;const n=e.dataset.action;if(t.stopPropagation(),n==="build-scroll"){this.scrollBuildCatalog(Number(e.dataset.direction)||1);return}if(n==="hud-objectives"){this.toggleHudDisclosure("objectives");return}if(n==="hud-more"){this.toggleHudDisclosure("actions");return}if(n==="hud-close"){this.closeHudDisclosure(!0);return}if(this.closeHudDisclosure(),!(n==="build"&&performance.now()<(this.dragClickUntil||0))){if(n==="rotate-placement"){e.blur?.(),this.callbacks.onAction("rotate-placement",{direction:Number(e.dataset.direction)||1});return}if(n==="confirm-placement"||n==="cancel-placement"){e.blur?.(),this.callbacks.onAction(n,{});return}if(n==="new-game"||n==="continue"){this.hideMenus(),this.menu=null,this.refs.hud.hidden=!1,this.callbacks.onStart(n==="continue"?"continue":"new");return}if(n==="resume"||n==="close-panel"||n==="continue-after-end"){this.hideMenus(),this.callbacks.onResume();return}if(n==="open-pause"){this.showPause(!0),this.callbacks.onAction("pause",{});return}if(n==="open-build"){this.callbacks.onAction("panel-open",{name:"build"});return}if(n==="open-roster"){this.callbacks.onAction("panel-open",{name:"roster"});return}if(n==="open-map"){this.callbacks.onAction("panel-open",{name:"map"});return}if(n==="special-select"){this.callbacks.onAction("special-select",{index:Number(e.dataset.index)});return}if(n==="select-frog"){this.callbacks.onAction("select-frog",{id:e.dataset.id,additive:!!(t.shiftKey||t.ctrlKey||t.metaKey)}),this.panel==="roster"&&this.renderPanel(!0);return}if(n==="select-all"){this.callbacks.onAction("select-all",{filter:e.dataset.filter||"all"}),this.renderPanel(!0);return}if(n==="roster-filter"){this.rosterFilter=e.dataset.filter||"all",this.renderPanel(!0);return}if(n==="gang-command"){this.callbacks.onAction("gang-command",{command:e.dataset.command});return}if(n==="selection-command"){this.callbacks.onAction("selection-command",{command:e.dataset.command,ids:Array.from(this.chosen())});return}if(n==="gang-forage"){this.callbacks.onAction("gang-command",{command:"forage"});return}if(n==="title-help"||n==="pause-help"){this.returnMenu=n==="title-help"?"title":"pause",this.showPanel("help");return}if(n==="help-back"){this.closePanels(),this.returnMenu==="title"?this.showTitle(this.hasSave):this.showPause(!0);return}if(n==="tab-roster"||n==="tab-map"){this.showPanel(n==="tab-map"?"map":"roster");return}if(n==="build"){this.callbacks.onAction("build",{type:e.dataset.type,campId:e.dataset.camp||this.state.currentCampId});return}if(n==="frog-command"){this.callbacks.onAction("frog-command",{id:e.dataset.id,command:e.dataset.command});return}if(n==="gang-toggle"){this.callbacks.onAction("gang-command",{command:this.state.squadMode==="attack"?"follow":"attack"});return}if(n==="gang-follow"||n==="gang-guard"||n==="gang-attack"||n==="gang-regroup"){this.callbacks.onAction("gang-command",{command:n.slice(5)});return}if(n==="restart-confirm"){this.refs.restartConfirm.hidden=!1;return}if(n==="restart-cancel"){this.refs.restartConfirm.hidden=!0;return}if(n==="restart"){this.hideMenus(),this.refs.hud.hidden=!1,this.callbacks.onAction("restart",{});return}if(n==="save"){this.callbacks.onAction("save",{});return}if(n==="consume"){this.callbacks.onAction("consume",{});return}if(n==="recruit"){this.callbacks.onAction("recruit",{});return}this.callbacks.onAction(n,{})}}setting(t){const e=t.target.closest("[data-setting]");if(!e)return;const n=e.dataset.setting;this.settings[n]=n==="quality"?e.value:Number(e.value)/100,this.refs.volumeOutput.textContent=`${de(this.settings.volume*100)}%`,this.refs.sensitivityOutput.textContent=`${this.settings.sensitivity.toFixed(1)}×`,this.callbacks.onSettings({...this.settings})}setSettings(t={}){Object.assign(this.settings,t);for(const e of ll(this.root,"[data-setting]")){const n=e.dataset.setting;e.value=n==="quality"?this.settings[n]:this.settings[n]*100}this.refs.volumeOutput.textContent=`${de(this.settings.volume*100)}%`,this.refs.sensitivityOutput.textContent=`${this.settings.sensitivity.toFixed(1)}×`}setLoading(t,e){this.refs.loading.hidden=!1,this.refs.loadingText.textContent=t,e!==void 0&&this.refs.loading.style.setProperty("--progress",`${si(e)*100}%`)}showTitle(t=!1){this.hasSave=t,this.hideMenus(),this.menu="title",this.refs.loading.hidden=!0,this.refs.title.hidden=!1,this.refs.hud.hidden=!0,this.refs.continueButton.hidden=!t,this.refs.newButton.innerHTML=t?`Νέο ταξίδι ${je("arrow")}`:`Μπες στον ποταμό ${je("arrow")}`,this.refs.newButton.classList.toggle("fg-primary",!t)}showPause(t=!0){if(t&&this.closeHudDisclosure(),!t){this.refs.pause.hidden=!0,this.menu==="pause"&&(this.menu=null);return}this.closePanels(),this.menu="pause",this.refs.pause.hidden=!1,this.refs.restartConfirm.hidden=!0,document.exitPointerLock?.()}hideMenus(){this.closeHudDisclosure();for(const t of["title","pause","ending","panelLayer","loading"])this.refs[t].hidden=!0;this.panel=null,this.menu=null}isBlocking(){return!!(this.menu||this.panel&&!this.state.buildPlacement?.active)}closePanels(){this.panel=null,this.refs.panelLayer.hidden=!0}togglePanel(t,e){this.panel===t?this.closePanels():this.showPanel(t,e)}showPanel(t,e){this.closeHudDisclosure(),this.panel=t,this.panelData=e||{},this.refs.pause.hidden=!0,this.refs.panelLayer.hidden=!1,document.exitPointerLock?.(),this.renderPanel(!0)}setPortraits(t){Object.assign(this.portraits,t),this.portraits.frog&&(this.refs.playerPortrait.src=this.portraits.frog,this.refs.playerPortrait.hidden=!1,this.refs.playerBadge.hidden=!0),this.activePortrait=null}update(t={}){this.state=t,this.updatePlacement(t.buildPlacement);const e=t.player||{},n=t.allies||[],s=this.chosen();this.meter("hpBar",gn(e.hp,e.maxHp)),this.meter("staminaBar",gn(e.stamina,e.maxStamina)),this.meter("stomachBar",gn(e.stomach,e.maxStomach)),this.meter("xpBar",gn(e.xp,e.nextXp)),this.setText("hpLabel",de(e.hp)),this.setText("staminaLabel",de(e.stamina)),this.setText("stomachLabel",`${de(gn(e.stomach,e.maxStomach)*100)}%`),this.setText("level",e.level||1),this.setText("tier",["","I","II","III","IV","V"][e.tier||1]||e.tier),this.setText("gangCount",t.gangCount??n.length+1),this.root.classList.toggle("fg-low-health",gn(e.hp,e.maxHp)<.25),this.root.classList.toggle("fg-low-hunger",gn(e.stomach,e.maxStomach)<.15);const r=this.resources(t.resources);this.setText("food",kn(r.food)),this.setText("reeds",kn(r.reeds));for(const z of["food","reeds"])this.refs[z].parentElement.classList.toggle("is-large-value",String(kn(r[z])).length>5);this.setText("clock",t.timeLabel||"09:00"),this.setText("day",t.day||1);const a=!!t.night;a!==this.lastNight&&(this.refs.dayIcon.innerHTML=je(a?"moon":"sun"),this.lastNight=a),this.refs.crosshair.hidden=this.isBlocking()||t.viewMode==="topdown",this.root.classList.toggle("fg-aiming",!!t.aiming);const o=t.camps||[],l=t.objectiveVisual||{},c=l.targets||o.filter(z=>z.originalTeam?.startsWith("enemy")||String(z.team).startsWith("enemy")).slice(0,5).map(z=>({...z,done:z.destroyed||["ally","player","friendly"].includes(z.team)})),h=c.length?c:Array.from({length:5},(z,O)=>({id:O,team:"enemy"+O,done:!1})),d=l.current??h.filter(z=>z.done).length,u=l.total||5,f=JSON.stringify(h.map(z=>[z.id,z.team,z.originalTeam,z.done]));f!==this.territorySignature&&(this.territorySignature=f,this.refs.territories.innerHTML=h.map((z,O)=>`<span class="fg-territory${z.done?" is-conquered":""}" title="${me(z.name||`Συμμορία ${O+1}`)}">${ii(z.originalTeam||(""+z.team).startsWith("enemy")&&z.team||"enemy"+O)}${z.done?`<i>${ht("check")}</i>`:""}</span>`).join("")),this.meter("objectiveMeter",l.progress??d/u),this.setText("objectiveProgress",`${de(d)} / ${de(u)}`);const p=t.campaign||{},v=p.objectives||[],g=v.find(z=>!z.done)||v.at(-1),m=g?.icon||"crown";m!==this.summaryArt&&(this.summaryArt=m,this.refs.objectiveNext.innerHTML=ht(m)),this.setText("objectiveSummary",g?`${Math.min(de(g.target),["fly","food","reeds","materials"].includes(g.icon)?kn(g.current):de(g.current))} / ${de(g.target)}`:`${de(d)} / ${de(u)}`),this.meter("objectiveMeter",g?si(g.progress??g.current/g.target):l.progress??d/u);const y=Su(g);this.setText("objectiveTitle",y.title),this.setText("objectiveHint",y.hint),this.refs.objectiveToggle.title=Ni(g?.label||"Στόχοι εκστρατείας");const x=JSON.stringify(v.map(z=>[z.id,z.icon,z.current,z.target,z.progress,z.done]));x!==this.goalSignature&&(this.goalSignature=x,this.refs.campaignObjectives.hidden=!v.length,this.refs.campaignObjectives.classList.toggle("has-many",v.length>6),this.refs.campaignObjectives.innerHTML=v.map(z=>{const O=Math.min(de(z.target),["food","fly","reeds","materials"].includes(z.icon)?kn(z.current):de(z.current));return`<div class="fg-campaign-goal${z.done?" is-done":""}" title="${me(Ni(z.label||z.id))}"><span>${ht(z.icon||"camp")}</span><strong class="fg-goal-caption">${me(sx(z))}</strong><b>${O}<small>/ ${de(z.target)}</small></b><div><i style="width:${si(z.progress??z.current/z.target)*100}%"></i></div>${z.done?`<em>${ht("check")}</em>`:""}</div>`}).join(""));const _={settlement:"camp",hunters:"heron",preparation:"training",bosses:"boss",complete:"crown"}[p.phase]||{food:"forage",forage:"forage",build:"camp",shelter:"camp",defend:"shield",conquer:"crown",victory:"crown"}[l.type]||"camp";_!==this.objectiveArt&&(this.objectiveArt=_,this.refs.objectiveArt.innerHTML=ht(_)),this.refs.objectiveBox.title=typeof t.objective=="string"?t.objective:t.objective?.title||"Στόχοι εκστρατείας";const A=t.context||{},C=A.type,E=A.actionIcon||{recruit:"recruit",loot:"store","persuade-camp":"persuade",persuade:"persuade",home:"camp",gather:"forage",reeds:"reeds",ally:"group",flies:"tongue"}[C]||C;this.refs.context.hidden=!C||C==="none"||this.isBlocking(),this.refs.context.title=Ni(t.hint||A.label||""),this.refs.context.classList.toggle("is-unavailable",A.available===!1),E!==this.contextArt&&(this.contextArt=E,this.refs.contextArt.innerHTML=ht(E||"recruit"),Ye(this.root,'[data-action="interact"] .fg-action-art').innerHTML=ht(E&&C!=="none"?E:"recruit"));const D=Ye(this.root,'[data-action="interact"]');D.classList.toggle("has-context",!!(C&&C!=="none")),D.title=Ni(t.hint||"Πλησίασε βάτραχο, σμήνος ή καταφύγιο"),D.disabled=!C||C==="none"||A.available===!1;const S=A.actionLabel||{recruit:"Στρατολόγησε",loot:"Λάφυρα","persuade-camp":"Πείσε",persuade:"Πείσε",home:"Κατασκευές",gather:"Μάζεψε",reeds:"Μάζεψε",ally:"Ομάδα",flies:"Μάζεψε"}[C]||"Πλησίασε";S!==this.contextCaption&&(this.contextCaption=S,Ye(D,".fg-action-caption").innerHTML=cl(S)),this.setText("contextKey",C==="home"?"V":"E"),this.meter("contextBar",A.progress??1);const M=t.predator,L=!!(M&&M.hp>0);if(L&&!this.wasHunting&&this.closeHudDisclosure(),this.wasHunting=L,this.root.classList.toggle("fg-is-hunted",L),this.refs.hunt.hidden=!L,this.refs.objectiveBox.hidden=L,L){this.refs.hunt.title=`${M.name||yd[M.type]||"Θηρευτής"} · ${M.objective||M.note||ax[M.type]||""}`,this.setText("predatorHpLabel",`${de(M.hp)} / ${de(M.maxHp)}`),this.meter("predatorHp",gn(M.hp,M.maxHp));const z=M.phase||M.state||"stalk",O={windup:"windup",lunge:"attack",attack:"attack",recover:"recover",grab:"rescue",grabbed:"rescue",flee:"attack",stalk:"enemy"}[z]||"enemy";let lt=M.phaseProgress;lt==null&&(lt=z==="windup"?(M.phaseTime||0)/(M.windup||1):["grab","grabbed"].includes(z)?(M.rescueDamage||0)/(M.rescueNeeded||45):z==="recover"?(M.phaseTime||0)/(M.recover||1):["lunge","attack"].includes(z)?1:.12),this.meter("predatorPhaseBar",lt),this.refs.hunt.dataset.phase=z,this.refs.hunt.classList.toggle("is-boss",!!(M.boss||M.isBoss)),this.refs.hunt.classList.toggle("is-enraged",!!M.enraged);const ot=`${M.type}:${O}:${!!(M.boss||M.isBoss)}`;this.phaseSignature!==ot&&(this.phaseSignature=ot,this.refs.predatorPhaseIcon.innerHTML=ht(O),this.refs.predatorFallback.innerHTML=ht(M.type||"heron"),Ye(this.refs.hunt,".fg-hunt-badge").innerHTML=ht(M.boss||M.isBoss?"crown":"enemy"),this.refs.predatorResponse.innerHTML=["grab","grabbed"].includes(z)?`${ht("rescue")}${We("Q")}${We("SPACE")}${We("R")}`:z==="windup"?`${ht("dodge")}${We("Z")}${ht("shield")}${We("RMB")}`:`${ht("attack")}${We("LMB")}${We("Q")}`);const Mt=M.portrait||this.portraits[M.type];Mt&&Mt!==this.activePortrait&&(this.refs.predatorPortrait.src=Mt,this.refs.predatorPortrait.alt=M.name||yd[M.type]||"Θηρευτής",this.activePortrait=Mt),this.refs.predatorPortrait.hidden=!Mt,this.refs.predatorFallback.hidden=!!Mt}const k={attack:[e.attackCD,.43],special:[e.specialCD,e.specialDuration||5.2],dodge:[e.dodgeCD,1.5],roar:[e.roarCD,8],interact:[e.interactCD,4]};for(const[z,[O,lt]]of Object.entries(k)){const ot=Ye(this.root,`.fg-action-tile[data-cooldown="${z}"]`);if(!ot)continue;const Mt=Math.max(0,Number(O)||0);ot.style.setProperty("--cooldown",`${si(Mt/lt)*100}%`),ot.classList.toggle("is-cooling",Mt>.02),Ye(ot,".fg-cooldown-time").textContent=Mt>.02?Mt.toFixed(1):""}const V=Number(e.specialIndex??t.specialIndex??0);if(V!==this.specialIndex){this.specialIndex=V,Ye(this.root,'[data-cooldown="special"] .fg-action-caption').innerHTML=cl(["Κλωτσιά","Άλμα","Σάρωση"][V]||"Ειδική"),Ye(this.root,'[data-cooldown="special"] .fg-action-art').innerHTML=ht(["kick","slam","tongue"][V]||"kick");for(const z of ll(this.root,'[data-action="special-select"]'))z.classList.toggle("is-selected",Number(z.dataset.index)===V)}this.viewMode!==t.viewMode&&(this.viewMode=t.viewMode,Ye(this.root,'[data-cooldown="view"] .fg-action-art').innerHTML=ht({first:"first",topdown:"topdown"}[t.viewMode]||"third"));const Z=t.squadMode||"follow";Z!==this.squadMode&&(this.squadMode=Z,this.refs.squadMode.innerHTML=ht({guard:"shield",train:"training",training:"training"}[Z]||Z)),this.setText("selectionCount",s.size?`${s.size} / ${n.length}`:n.length),this.refs.selectionDock.hidden=!n.length,this.setText("selectionLabel",s.size?"Επιλογή":"Ομάδα");const J=JSON.stringify([Array.from(s),n.map(z=>[z.id,z.hp,z.order,z.guard,z.portrait])]);if(J!==this.selectionSignature){this.selectionSignature=J;const z=(s.size?n.filter(O=>s.has(String(O.id))):n).slice(0,2);this.refs.selectionPortraits.innerHTML=z.map(O=>`<button class="fg-dock-frog${s.has(String(O.id))?" is-selected":""}" data-action="select-frog" data-id="${me(O.id)}" aria-label="${me(O.name||"Βάτραχος")}" title="${me(O.name||"Βάτραχος")}"><img src="${me(this.portrait(O))}" alt="${me(O.name||"Βάτραχος")}"><span style="width:${gn(O.hp,O.maxHp)*100}%"></span>${O.guard||O.order==="guard"?`<i>${ht("shield")}</i>`:""}</button>`).join("")+((s.size||n.length)>2?`<button class="fg-dock-more" data-action="open-roster" title="Όλη η ομάδα"><span class="fg-dock-rest-wide">+${(s.size||n.length)-2}</span><span class="fg-dock-rest-short">+${(s.size||n.length)-1}</span></button>`:""),this.panel==="roster"&&this.renderPanel(!1)}t.savedAt&&t.savedAt!==this.savedAt&&(this.savedAt=t.savedAt,this.refs.saveStatus.hidden=!1,clearTimeout(this.saveTimer),this.saveTimer=setTimeout(()=>this.refs.saveStatus.hidden=!0,2500));const Y=performance.now();if(Y-this.lastDraw>100&&(this.drawMap(this.refs.minimap,t.world||{},!1),this.lastDraw=Y,this.panel==="map")){const z=Ye(this.refs.panel,"canvas");z&&this.drawMap(z,t.world||{},!0)}this.panel&&Y-this.lastPanel>700&&!["help","map"].includes(this.panel)&&(this.renderPanel(!1),this.lastPanel=Y)}resources(t){return typeof t=="number"?{food:t,reeds:t}:{food:t?.food??t?.flies??0,reeds:t?.reeds??t?.wood??t?.materials??0}}setText(t,e){const n=this.refs[t];n&&n.textContent!==String(e)&&(n.textContent=String(e))}meter(t,e){const n=this.refs[t];n&&(n.style.transform=`scaleX(${si(e)})`)}panelHeader(t,e,n=""){return`<div class="fg-panel-head"><div><span class="fg-eyebrow">${t}</span><h2>${e}</h2></div><button class="fg-icon-button" data-action="${this.panel==="help"?"help-back":"close-panel"}" aria-label="Κλείσιμο">${je("close")}</button></div>${n}`}renderPanel(t=!1){const e=this.refs.panel;if(!this.panel||this.draggingBuild)return;const n=Ye(e,".fg-illustrated-build")?.scrollLeft||0,s=e.scrollTop,r=Ye(e,".fg-frog-grid")?.scrollTop||0,a=document.activeElement;if(!t&&e.contains(a)&&["INPUT","SELECT"].includes(a.tagName))return;e.classList.toggle("fg-command-panel",this.panel==="roster"),e.classList.toggle("fg-building-panel",this.panel==="build");const o=this.state,l=this.panel==="roster"?JSON.stringify([this.panel,this.rosterFilter,Array.from(this.chosen()),o.allies?.map(d=>[d.id,d.name,d.hp,d.stomach,d.level,d.tier,d.order,d.guard,d.canPromote,d.trained,d.trainingProgress,!!d.portrait]),o.resources,o.capacity,o.recruitmentUnlimited,o.training,o.camps?.map(d=>[d.id,d.team,d.destroyed,!!d.buildings?.training]),o.currentCamp?.buildings]):this.panel==="build"?JSON.stringify([this.panel,o.resources,o.buildOptions,o.currentCamp?.id,o.currentCamp?.hp,o.currentCamp?.buildings,o.placement,o.capacity]):this.panel;if(!t&&this.panelSignature===l)return;this.panelSignature=l,this.panel==="help"?e.innerHTML=this.helpMarkup():this.panel==="build"?e.innerHTML=this.buildMarkup():this.panel==="roster"?e.innerHTML=this.rosterMarkup():this.panel==="map"&&(e.innerHTML=this.panelHeader("Ο ΚΟΣΜΟΣ ΣΟΥ","Ο Μεγάλος Ποταμός",this.tabs("map"))+'<div class="fg-large-map"><canvas width="1024" height="720"></canvas><span class="fg-map-north">N</span></div><div class="fg-map-legend"><span><i style="--legend:#c8f3a1"></i>Εσύ & σύμμαχοι</span><span><i style="--legend:#ee9a71"></i>Αντίπαλοι</span><span><i style="--legend:#f6db82"></i>Τροφή</span><span><i style="--legend:#c2b9e8"></i>Ελεύθερες θέσεις</span><span><i style="--legend:#f85a48"></i>Θηρευτές</span></div>',this.drawMap(Ye(e,"canvas"),this.state.world||{},!0)),e.scrollTop=s;const c=Ye(e,".fg-illustrated-build");c&&(c.scrollLeft=n,this.syncBuildCatalog());const h=Ye(e,".fg-frog-grid");h&&(h.scrollTop=r)}tabs(t){return`<div class="fg-tabs"><button class="${t==="roster"?"active":""}" data-action="tab-roster">${je("group")} Συμμορία</button><button class="${t==="map"?"active":""}" data-action="tab-map">${je("pin")} Χάρτης</button></div>`}buildMarkup(){const t=this.state,e=this.resources(t.resources),n=t.currentCamp||this.panelData?.camp,s=[{type:"shelter",name:"Καταφύγιο",cost:{food:30,reeds:45}},{type:"store",name:"Αποθήκη",cost:{food:16,reeds:24}},{type:"nursery",name:"Φωλιά",cost:{food:24,reeds:32}},{type:"training",name:"Χώρος εκπαίδευσης",cost:{food:24,reeds:28}},{type:"watchtower",name:"Σκοπιά",cost:{food:22,reeds:34}},{type:"palisade",name:"Οχύρωση",cost:{food:18,reeds:30}},{type:"repair",name:"Επισκευή",cost:{food:8,reeds:12}},{type:"upgrade",name:"Αναβάθμιση",cost:{food:45,reeds:45}}],r=t.buildOptions||this.panelData?.buildOptions||s,a=(t.camps||[]).filter(h=>["ally","player","friendly",0].includes(h.team)&&!h.destroyed),o=t.placement?.valid!==!1,l=h=>({shelter:"camp",upgrade:"crown",promote:"crown","promote-player":"crown",repair:"repair"})[h]||h,c=h=>({shelter:"group",store:"fly",nursery:"recruit",watchtower:"shield",palisade:"shield",upgrade:"group",repair:"heart",promote:"attack","promote-player":"attack",training:"training"})[h]||"check";return this.panelHeader("ΚΑΤΑΣΚΕΥΗ & ΑΜΥΝΑ","Τα καταφύγιά σου")+`
      <div class="fg-build-overview"><div class="fg-camp-illustration">${ht("camp")}${ii("ally")}</div><div class="fg-base-health"><h3>${me(n?.name||t.campName||"Νέο καταφύγιο")}</h3><div class="fg-base-healthbar"><span style="width:${n?gn(n.hp,n.maxHp)*100:100}%"></span></div><div class="fg-base-badges"><span title="Αντοχή καταφυγίου">${ht("heart")}<b>${n?`${de(n.hp)} / ${de(n.maxHp)}`:"—"}</b></span><span title="Συμμαχικά καταφύγια">${ht("camp")}<b>${a.length}</b></span><span title="Θέσεις αυτόματης γέννησης στη φωλιά · οι στρατολογήσεις είναι απεριόριστες">${ht("nursery")}<b>${t.capacity??"∞"}</b></span></div></div><div class="fg-build-bank" aria-label="Διαθέσιμα κοινά αποθέματα"><span class="fg-bank-label">Διαθέσιμα</span><div title="Κοινό απόθεμα τροφής">${ht("fly")}<b>${kn(e.food)}</b><small>Τροφή</small></div><div title="Υλικά κατασκευής (ξύλο, φύλλα, καλάμια)">${ht("reeds")}<b>${kn(e.reeds)}</b><small>Υλικά</small></div></div></div>
      <div class="fg-build-catalog-toolbar"><span>Κτίρια · σύρε ή επίλεξε</span><div><button class="fg-build-nav" data-action="build-scroll" data-direction="-1" title="Προηγούμενα κτίρια" aria-label="Προηγούμενα κτίρια">${je("arrow")}</button><button class="fg-build-nav" data-action="build-scroll" data-direction="1" title="Επόμενα κτίρια" aria-label="Επόμενα κτίρια">${je("arrow")}</button></div></div>
      <div class="fg-build-grid fg-illustrated-build" role="region" aria-label="Κατάλογος κτιρίων" tabindex="0">${r.map((h,d)=>{const u=typeof h.cost=="number"?{food:h.cost,reeds:0}:h.cost||{},f=e.food>=(u.food||0)&&e.reeds>=(u.reeds||0),p=!!(h.built||n?.buildings?.[h.type]),v=h.type==="shelter"?o:!!n||["promote","promote-player"].includes(h.type),g=h.enabled!==!1&&f&&!p&&v,m=p?"built":v?f?g?"ready":"locked":"resources":"site",y=Ni(h.reason||(v?f?p?"Έχει ήδη κατασκευαστεί":h.description||"":"Δεν αρκούν τα κοινά αποθέματα":"Απαιτείται κατάλληλη θέση ή συμμαχικό καταφύγιο")),x=g&&ur.has(h.type)?" · Σύρε στον χώρο ή κάνε κλικ και τοποθέτησε · Q/R περιστροφή · Esc ακύρωση":"",_={built:"check",site:"warning",resources:"store",ready:"repair",locked:"warning"}[m];return`<button class="fg-build-card fg-picture-building is-${m}" data-action="build" data-type="${me(h.type)}" draggable="${g&&ur.has(h.type)?"true":"false"}" data-camp="${me(n?.id||t.currentCampId||"")}" title="${me((h.name||h.type)+" · "+y+x)}" aria-label="${me((h.name||h.type)+" · "+y+x)}" ${g?"":"disabled"}><div class="fg-building-art">${ht(l(h.type))}${g&&ur.has(h.type)?`<span class="fg-building-drag" title="Σύρε και τοποθέτησε">${ht("place")}</span>`:""}<span class="fg-building-benefit" title="${me(h.description||"")}">${ht(c(h.type))}</span><span class="fg-building-state">${ht(_)}</span></div><h3>${me(h.name||h.type)}</h3><span class="fg-cost-label">Κόστος</span><div class="fg-material-requirements">${[["food","fly","Τροφή"],["reeds","reeds","Υλικά κατασκευής"]].map(([A,C,E])=>`<div class="fg-material ${e[A]>=(u[A]||0)?"is-enough":"is-short"}" title="${E}: ${kn(e[A])} / ${de(u[A]||0)}">${ht(C)}<div><b>${de(u[A]||0)}</b><span><i style="width:${u[A]?si(e[A]/u[A])*100:100}%"></i></span></div></div>`).join("")}</div><div class="fg-build-purchase">${We(d+1)}<span>${ht(p?"check":g?ur.has(h.type)?"place":"repair":"warning")}</span></div></button>`}).join("")}</div>
      <div class="fg-build-footer"><div class="fg-placement-status${o?"":" is-invalid"}" title="${me(Ni(t.placement?.reason||(o?"Κατάλληλη θέση κατασκευής":"Ακατάλληλη θέση κατασκευής")))}">${ht("camp")}${ht(o?"check":"warning")}</div><button class="fg-image-meal" data-action="consume" title="Τροφή από κοινά αποθέματα" aria-label="Τροφή από κοινά αποθέματα" ${t.inCamp||n?"":"disabled"}>${ht("fly")}${ht("heal")}${We("G")}</button><button class="fg-image-meal" data-action="gang-forage" title="Η ομάδα βρίσκει μύγες και θεραπεύεται" aria-label="Αναζήτηση τροφής">${ht("forage")}${We("T")}</button><div class="fg-build-exit">${We("V")}${We("ESC")}</div></div>`}rosterMarkup(){const t=this.state,e=t.allies||[],n=this.chosen(),s=this.resources(t.resources),r=y=>y.guard||y.order==="guard",a=y=>gn(y.hp,y.maxHp)<.85,o=y=>y.order==="forage",l={all:e,injured:e.filter(a),guards:e.filter(r),forage:e.filter(o)},c=l[this.rosterFilter]||e,h=e.filter(y=>n.has(String(y.id))),d=h.length===1?h[0]:null,u=d?.promoteCost,f=typeof u=="number"?{food:u,reeds:0}:u||{food:0,reeds:0},p=h.length?h.reduce((y,x)=>y+gn(x.hp,x.maxHp),0)/h.length:0,v=h.length?h.reduce((y,x)=>y+gn(x.stomach,x.maxStomach),0)/h.length:0,g=y=>({guard:"shield",stay:"shield",train:"training",training:"training"})[y.order]||y.order||(y.guard?"shield":"follow"),m=(y,x,_,A)=>`<div class="fg-card-meter ${A}">${ht(y)}<span><b style="width:${si(x)*100}%"></b></span><small>${_}</small></div>`;return this.panelHeader("ΤΑΚΤΙΚΗ ΔΙΟΙΚΗΣΗ","Πράσινο Ρεύμα",this.tabs("roster"))+`
      <div class="fg-command-summary"><span class="fg-hq-crest">${ii("ally")}</span><span class="fg-command-metric" title="Η συμμορία σου · απεριόριστη στρατολόγηση">${ht("group")}<b>${e.length+1}</b><small>/ ${t.recruitmentUnlimited?"∞":t.capacity??"∞"}</small></span><span class="fg-command-metric" title="Τραυματισμένοι βάτραχοι">${ht("heal")}<b>${l.injured.length}</b></span><span class="fg-command-metric" title="Φρουροί">${ht("shield")}<b>${l.guards.length}</b></span><span class="fg-command-metric fg-hq-food" title="Κοινό απόθεμα τροφής">${ht("fly")}<b>${kn(s.food)}</b></span><span class="fg-command-metric fg-hq-reeds" title="Υλικά κατασκευής (ξύλο, φύλλα, καλάμια)">${ht("reeds")}<b>${kn(s.reeds)}</b></span><div class="fg-global-command">${this.commandButton("regroup","gang-command")}${this.commandButton("forage","gang-command")}${this.trainingButton("gang")}</div></div>
      <div class="fg-command-layout"><div class="fg-army-main"><div class="fg-roster-toolbar"><div class="fg-roster-filters">${[["all","group","Όλοι"],["injured","heal","Τραυματισμένοι"],["guards","shield","Φρουροί"],["forage","forage","Σε αναζήτηση τροφής"]].map(([y,x,_])=>`<button data-action="roster-filter" data-filter="${y}" class="${this.rosterFilter===y?"is-active":""}" title="${_}" aria-label="${_}">${ht(x)}<b>${l[y].length}</b></button>`).join("")}</div><button class="fg-select-filter" data-action="select-all" data-filter="${this.rosterFilter}" title="Επιλογή όλων στο φίλτρο" aria-label="Επιλογή όλων στο φίλτρο">${ht("check")}${We("ALL")}</button></div><div class="fg-frog-grid">${c.length?c.map((y,x)=>`
        <button class="fg-frog-card${n.has(String(y.id))?" is-selected":""}${a(y)?" is-wounded":""}" data-action="select-frog" data-id="${me(y.id)}" aria-label="${me(y.name||`Βάτραχος ${x+1}`)}" title="${me((y.name||"Βάτραχος")+" · "+(rx[y.role]||y.role||"Κυνηγός"))}"><div class="fg-frog-picture"><img src="${me(this.portrait(y))}" alt="${me(y.name||"Βάτραχος")}" loading="lazy"><span class="fg-frog-crest">${ii("ally")}</span><span class="fg-frog-role">${ht(lc(y.role))}</span><span class="fg-frog-tier">${"◆".repeat(Math.min(5,Math.max(1,y.tier||1)))}</span><b class="fg-frog-level">${de(y.level||1)}</b>${n.has(String(y.id))?`<span class="fg-frog-chosen">${ht("check")}</span>`:""}${y.trainingProgress>0?`<div class="fg-training-card-progress"><span style="width:${si(y.trainingProgress)*100}%"></span>${ht("training")}</div>`:""}${y.trained?`<span class="fg-trained-badge" title="Εκπαιδευμένος">${ht("training")}</span>`:""}</div><div class="fg-frog-card-caption"><strong>${me(y.name||`Βάτραχος ${x+1}`)}</strong><span>${ht(g(y))}</span></div>${m("heart",gn(y.hp,y.maxHp),de(y.hp),"health")}${m("stomach",gn(y.stomach,y.maxStomach),`${de(gn(y.stomach,y.maxStomach)*100)}%`,"hunger")}</button>`).join(""):`<div class="fg-roster-empty">${ht("recruit")}${We("E")}</div>`}</div></div>
      <aside class="fg-command-detail"><div class="fg-selection-title"><span>${ht("group")}</span><h3>${d?me(d.name):h.length?`${h.length} βάτραχοι`:"Επιλογή ομάδας"}</h3></div><div class="fg-selected-hero">${h.length?`<img src="${me(this.portrait(h[0]))}" alt="${me(h[0].name||"Επιλεγμένος βάτραχος")}"><span>${ht(d?lc(d.role):"group")}</span><b>${d?de(d.level||1):h.length}</b>`:ht("regroup")}</div>${m("heart",p,`${de(p*100)}%`,"health")}${m("stomach",v,`${de(v*100)}%`,"hunger")}<div class="fg-selected-orders">${["follow","attack","forage","guard","regroup"].map(y=>this.commandButton(y)).join("")}</div>${this.trainingButton("selection")}${d?`<button class="fg-promote-picture" data-action="frog-command" data-id="${me(d.id)}" data-command="promote" aria-label="Προαγωγή" title="Προαγωγή · ${de(f.food)} τροφή + ${de(f.reeds)} υλικά κατασκευής" ${d.canPromote===!1?"disabled":""}>${ht("crown")}<span>${"◆".repeat(Math.min(5,(d.tier||1)+1))}</span>${ht("fly")}<b>${de(f.food)}</b>${ht("reeds")}<b>${de(f.reeds)}</b></button>`:""}<div class="fg-detail-selection-count">${ht("group")}<b>${h.length} / ${e.length}</b>${We("SHIFT")}</div></aside></div>`}helpMarkup(){const t=[["W A S D","Κίνηση σε σχέση με την κάμερα · σταθερή κατεύθυνση στην κάτοψη"],["Ποντίκι","Κάμερα και στόχευση · ελεύθερος δείκτης στην κάτοψη"],["C","Τρίτο πρόσωπο → πρώτο πρόσωπο → κάτοψη"],["Ροδέλα","Απόσταση κάμερας / μεγέθυνση κάτοψης"],["SPACE","Άλμα σε φύλλα και βράχους"],["SHIFT","Γρήγορη κίνηση · καταναλώνει αντοχή"],["Z","Γρήγορη αποφυγή επίθεσης"],["LMB","Γλώσσα για μύγες και επιθέσεις · κλικ σε σύμμαχο για επιλογή"],["SHIFT + κλικ","Προσθήκη ή αφαίρεση βατράχου από την επιλογή"],["RMB","Στόχευση / αμυντική στάση"],["Q","Επιλεγμένη ειδική επίθεση"],["1 / 2 / 3","Επιλογή ειδικής κίνησης"],["E","Στρατολόγηση, αλληλεπίδραση ή λεηλασία"],["R","Εκφοβισμός των αντιπάλων"],["F","Επίθεση / ακολουθήστε"],["T","Ομάδα: αναζήτηση μυγών για τροφή και θεραπεία"],["X","Φρουρά / επιστροφή στην ομάδα"],["V","Κατασκευές · σύρε κάρτα στον χώρο ή κάνε κλικ και τοποθέτησε"],["Q / R","Κατά την τοποθέτηση: περιστροφή αριστερά / δεξιά"],["LMB / ESC","Κατά την τοποθέτηση: επιβεβαίωση / ακύρωση χωρίς χρέωση"],["G","Τροφή από τα κοινά αποθέματα κοντά στη βάση"],["TAB","Διοίκηση συμμορίας και χάρτης"],["ESC","Παύση / απελευθέρωση ποντικιού"]],e=[["01","camp","Θεμελίωσε τη συμμορία","Συγκέντρωσε 30 τροφή και 45 υλικά κατασκευής. Χτίσε καταφύγιο, αποθήκη, φωλιά και χώρο εκπαίδευσης. Στρατολόγησε 6 συμμάχους και εκπαίδευσε 3.",["fly","reeds","camp","store","nursery","training","group"]],["02","heron","Αντιμετώπισε τους κυνηγούς","Οι πρώτες αποστολές ξεκλειδώνουν ερωδιό, νερόφιδο και αρπακτικό ψάρι. Διάβασε την εικόνα της επίθεσης, απέφυγε και αντεπιτέσου με την ομάδα.",["heron","snake","fish","dodge","attack"]],["03","training","Ετοίμασε τον στρατό","Επέκτεινε σε 2 καταφύγια, 6 κτίρια και 6 εκπαιδευμένους συμμάχους. Κράτα φρουρούς στις βάσεις και δώσε εντολή αναζήτησης τροφής στους τραυματισμένους.",["camp","watchtower","training","shield","forage"]],["04","boss","Κυριάρχησε στον ποταμό","Νίκησε τους 3 μεγάλους θηρευτές και ένωσε και τις 5 αντίπαλες συμμορίες με κατάκτηση ή πειθώ. Οι μεγάλοι θηρευτές επιτίθενται σε διαδοχικές ορμές.",["boss","crown","persuade","attack"]]];return this.panelHeader("ΚΡΑΤΗΣΕ ΤΑ ΔΑΧΤΥΛΑ ΚΟΝΤΑ ΣΤΟ WASD","Χειρισμός & επιβίωση")+`<div class="fg-help-grid"><div><h3>Χειρισμός</h3><dl class="fg-controls">${t.map(([n,s])=>`<div><dt>${We(n)}</dt><dd>${s}</dd></div>`).join("")}</dl><div class="fg-help-training"><span class="fg-help-training-art">${ht("training")}</span><div><h3>Εκπαίδευση ανά βάτραχο</h3><div class="fg-help-costs"><span>${ht("fly")}<b>8</b></span><span>${ht("reeds")}<b>4</b></span><span>${ht("recover")}<b>18″</b></span></div><p>Επίλεξε συμμάχους στη διοίκηση και πάτησε την εικόνα εκπαίδευσης. Το κόστος εμφανίζεται πριν δώσεις εντολή. Οι βάτραχοι πηγαίνουν σε συμμαχικό χώρο εκπαίδευσης· ο χρόνος αρχίζει όταν φτάσουν. Οι φρουροί επιστρέφουν στο καθήκον τους μετά το μάθημα.</p></div></div></div><div class="fg-guide fg-campaign-guide"><h3>Τα 4 κεφάλαια της εκστρατείας</h3>${e.map(([n,s,r,a,o])=>`<article class="fg-help-chapter"><span class="fg-help-chapter-art">${ht(s)}</span><div><b>${n} / ${r}</b><p>${a}</p><div class="fg-help-chapter-images">${o.map(l=>ht(l)).join("")}</div></div></article>`).join("")}<div class="fg-help-forage"><span>${ht("forage")}${We("T")}</span><div><b>Οι μύγες θεραπεύουν την ομάδα</b><p>Η εντολή αναζήτησης οδηγεί τους συμμάχους στα σμήνη για τροφή, θεραπεία και προμήθειες. Οι φρουροί κρατούν τη βάση τους, εκτός αν τους επιλέξεις ρητά ή διατάξεις γενική ανασύνταξη. Οι στρατολογήσεις δεν περιορίζονται από τις θέσεις της φωλιάς.</p></div></div><div class="fg-help-emblems"><span title="Σύμμαχοι">${ii("ally")}</span><span title="Αντίπαλες συμμορίες">${ii("enemy0")}</span><span title="Μεγάλος θηρευτής">${ht("boss")}</span></div></div></div>`}emblemImage(t){if(this.mapEmblems||(this.mapEmblems=new Map),this.mapEmblems.has(t))return this.mapEmblems.get(t);const e=new Image;return e.src=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(ii(t))}`,this.mapEmblems.set(t,e),e}drawMap(t,e={},n=!1){const s=t.getContext("2d");if(!s)return;const r=t.width,a=t.height,o=e.radius||110,l=Math.min(r,a)/(o*2.12),c=r/2,h=a/2,d=y=>[c+(y.x??y.position?.x??0)*l,h+(y.z??y.position?.z??0)*l];s.clearRect(0,0,r,a),s.fillStyle="#102825",s.fillRect(0,0,r,a),s.strokeStyle="#263e37",s.lineWidth=1;const u=20*l;for(let y=c%u;y<r;y+=u)s.beginPath(),s.moveTo(y,0),s.lineTo(y,a),s.stroke();for(let y=h%u;y<a;y+=u)s.beginPath(),s.moveTo(0,y),s.lineTo(r,y),s.stroke();if(e.platforms){s.fillStyle="#42523d";for(const y of e.platforms){const[x,_]=d(y);s.beginPath(),s.arc(x,_,Math.max(1,(y.radius||1)*l),0,Math.PI*2),s.fill()}}for(const y of e.hotspots||[]){if(y.flies===0)continue;const[x,_]=d(y);s.fillStyle=y.rich?"#d6b96b":"#8c9c6e",s.globalAlpha=.65,s.beginPath(),s.arc(x,_,n?5:3,0,Math.PI*2),s.fill()}s.globalAlpha=1;for(const y of e.camps||this.state.camps||[]){const[x,_]=d(y),A=["player","ally","friendly",0].includes(y.team),C=y.team==="neutral"||y.team==null;s.strokeStyle=A?"#b8e89b":C?"#b6a9da":"#e89470",s.fillStyle=A?"#324e35":C?"#332f45":"#51392e",s.lineWidth=n?2:1.5;const E=n?12:7,D=this.emblemImage(A?"ally":C?"neutral":y.originalTeam||y.team);D.complete&&D.naturalWidth?s.drawImage(D,x-E,_-E*1.1,E*2,E*2.2):(s.beginPath(),s.moveTo(x,_-E),s.lineTo(x+E,_-E*.5),s.lineTo(x+E*.8,_+E*.5),s.lineTo(x,_+E),s.lineTo(x-E*.8,_+E*.5),s.lineTo(x-E,_-E*.5),s.closePath(),s.fill(),s.stroke()),n&&y.name&&(s.font="13px system-ui",s.textAlign="center",s.fillStyle="#c9d0ba",s.fillText(y.name,x,_+E+16))}const f=(y,x,_)=>{s.fillStyle=x;for(const A of y||[]){if(A.dead)continue;const[C,E]=d(A);s.beginPath(),s.arc(C,E,_,0,Math.PI*2),s.fill()}};f(e.enemies,"#df936f",n?3:2),f(e.allies,"#94ca8c",n?3:2);for(const y of e.predators||[]){if(y.dead||y.hp===0)continue;const[x,_]=d(y);s.save(),s.translate(x,_),s.rotate(Math.PI/4),s.fillStyle=y.hunting?"#ff6953":"#b47b67";const A=n?6:4;s.fillRect(-A,-A,A*2,A*2),s.restore()}const p=e.player||{x:0,z:0,yaw:0},[v,g]=d(p);s.strokeStyle="rgba(199,235,165,.16)",s.lineWidth=1,s.beginPath(),s.arc(v,g,18*l,0,Math.PI*2),s.stroke(),s.save(),s.translate(v,g),s.rotate(Math.PI-(p.yaw||0)),s.fillStyle="#e2f4bc",s.strokeStyle="#142a20",s.lineWidth=2;const m=n?9:7;s.beginPath(),s.moveTo(0,-m),s.lineTo(m*.65,m*.7),s.lineTo(0,m*.35),s.lineTo(-m*.65,m*.7),s.closePath(),s.fill(),s.stroke(),s.restore(),n&&(s.font="12px system-ui",s.textAlign="left",s.fillStyle="#829b8c",s.fillText("Κάθε τετράγωνο: 20 μονάδες",20,a-20))}toast(t,e="info"){const n=typeof t=="object"&&t?t:{detail:String(t),tone:e},s=Ni(n.detail||n.message||""),r=n.tone||e,a=()=>/εκπαίδευ|training/i.test(s)?"training":/προαγ|βαθμίδ|επίπεδ/i.test(s)?"crown":/στρατολογ|ενώθηκ|συμμάχ/i.test(s)?"recruit":/μύγ|τροφή|έφαγ|γεμάτ|χόρτα/i.test(s)?"fly":/θεραπε|υγεί/i.test(s)?"heal":/υλικ|ξύλ|καλάμ|καλαμ/i.test(s)?"reeds":/φρουρ|υπεράσπ/i.test(s)?"shield":/καταφύγ|αποθήκ|φωλιά|χτίσ|χτίστ/i.test(s)?"camp":/πέθαν|έπεσ|νεκρ/i.test(s)?"enemy":/κάμερ|πρόσωπο|κάτοψ/i.test(s)?"camera":/αντοχ/i.test(s)?"stamina":/επίθε|χτύπ|θηρευτ|ερωδι|νερόφιδ|ψάρι/i.test(s)?"attack":r==="warning"||r==="danger"?"warning":r==="success"?"check":r==="food"?"fly":"leaf",o=n.icon||a(),l=n.id||`${r}:${o}:${s}`,c=performance.now();if(this.toastKeys.has(l)&&c-this.toastKeys.get(l)<1800)return;if(this.toastKeys.set(l,c),this.toastKeys.size>70)for(const[f,p]of this.toastKeys)c-p>1e4&&this.toastKeys.delete(f);const h=n.value??s.match(/\+\s*\d+/)?.[0],d=["warning","danger"].includes(r)?5200:3600,u=document.createElement("div");for(u.className=`fg-toast fg-visual-toast fg-notice-${r}`,u.title=s,u.setAttribute("aria-label",s||o),u.style.setProperty("--notice-life",`${d}ms`),u.innerHTML=`<span class="fg-notice-art">${n.portrait?`<img src="${me(n.portrait)}" alt="">`:ht(o)}</span><span class="fg-notice-payload">${ht(n.portrait?o:n.secondaryIcon||(["warning","danger"].includes(r)?"warning":"check"))}${h!==void 0?`<b>${me(h)}</b>`:""}${n.progress!==void 0?`<span class="fg-notice-progress"><span style="width:${si(n.progress)*100}%"></span></span>`:""}</span><span class="fg-notice-lifetime"></span>`,this.refs.toasts.append(u);this.refs.toasts.children.length>2;)this.refs.toasts.firstChild.remove();setTimeout(()=>{u.classList.add("fg-toast-out"),setTimeout(()=>u.remove(),250)},d)}showEnding(t,e={}){this.hideMenus(),this.menu="ending",this.refs.ending.hidden=!1,document.exitPointerLock?.(),this.refs.endingMark.innerHTML=je(t?"crown":"leaf"),this.setText("endingEyebrow",t?"Ο ΠΟΤΑΜΟΣ ΕΝΩΘΗΚΕ":"ΤΟ ΤΑΞΙΔΙ ΤΕΛΕΙΩΣΕ"),this.setText("endingTitle",t?"Κυρίαρχος του ποταμού":"Η λίμνη θυμάται"),this.setText("endingText",t?"Οι αντίπαλες βάσεις έπεσαν ή επέλεξαν να ενωθούν μαζί σου. Η συμμορία σου γράφει πλέον την ιστορία του ποταμού.":"Κάθε διαδρομή αφήνει μια ιστορία. Επέστρεψε με καλύτερη φρουρά, γεμάτα στομάχια και μια πιο δεμένη συμμορία."),this.refs.endingContinue.hidden=!t;const n=[["Ημέρες",e.days||e.day||1],["Μύγες",e.fliesCaught||e.flies||0],["Στρατολογήσεις",e.recruited||0],["Καταφύγια",e.campsCaptured||e.camps||0],["Θηρευτές",e.predatorsKilled||e.predators||0]];this.refs.endingStats.innerHTML=n.map(([s,r])=>`<div><b>${de(r)}</b><span>${s}</span></div>`).join("")}destroy(){this.abort.abort(),clearTimeout(this.saveTimer),cancelAnimationFrame(this.dragVisibilityFrame),this.root.remove()}}class lx{constructor({volume:t=.65}={}){this.volume=Math.max(0,Math.min(1,t)),this._muted=!1,this.context=null,this.master=null,this.started=!1,this.elapsed=0,this.nextCroak=7,this.nextBird=4,this.nextNote=12,this.lastPlayed=new Map,this.ambient=[],this.activeVoices=0,this.seed=78103,this.night=!1,this.hunt=!1,this.water=!1}random(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}async init(){if(this.context){this.context.state==="suspended"&&await this.context.resume().catch(()=>{});return}const t=window.AudioContext||window.webkitAudioContext;if(t)try{this.context=new t;const e=this.context;this.master=e.createGain(),this.master.gain.value=this._muted?0:this.volume*.58,this.compressor=e.createDynamicsCompressor(),this.compressor.threshold.value=-18,this.compressor.knee.value=18,this.compressor.ratio.value=3,this.compressor.attack.value=.012,this.compressor.release.value=.2,this.master.connect(this.compressor),this.compressor.connect(e.destination),this.sfx=e.createGain(),this.sfx.gain.value=.8,this.sfx.connect(this.master),this.ambience=e.createGain(),this.ambience.gain.value=.6,this.ambience.connect(this.master);const n=e.sampleRate*4;this.noise=e.createBuffer(1,n,e.sampleRate);const s=this.noise.getChannelData(0);let r=0;for(let o=0;o<n;o++)r=(r+(this.random()*2-1)*.025)/1.015,s[o]=r*5;this.white=e.createBuffer(1,e.sampleRate*2,e.sampleRate);const a=this.white.getChannelData(0);for(let o=0;o<a.length;o++)a[o]=this.random()*2-1;this.startAmbience(),e.state==="suspended"&&await e.resume().catch(()=>{})}catch{this.context=null}}async start(){await this.init(),this.started=!!this.context}get muted(){return this._muted}set muted(t){this._muted=!!t,this.setVolume(this.volume)}setVolume(t){this.volume=Math.max(0,Math.min(1,Number(t)||0)),this.master&&this.master.gain.setTargetAtTime(this._muted?0:this.volume*.58,this.context.currentTime,.08)}setMuted(t){this.muted=t}async resume(){this.context?.state==="suspended"&&await this.context.resume().catch(()=>{})}async suspend(){this.context?.state==="running"&&await this.context.suspend().catch(()=>{})}startAmbience(){const t=this.context,e=(n,s,r,a)=>{const o=t.createBufferSource();o.buffer=n,o.loop=!0;const l=t.createBiquadFilter();l.type=s,l.frequency.value=r,l.Q.value=.5;const c=t.createGain();return c.gain.value=a,o.connect(l),l.connect(c),c.connect(this.ambience),o.start(),this.ambient.push(o),{source:o,filter:l,volume:c}};this.current=e(this.noise,"lowpass",650,.11),this.breeze=e(this.white,"bandpass",1800,.018),this.insects=e(this.white,"bandpass",6200,.0015),this.lowTone=t.createOscillator(),this.lowTone.type="sine",this.lowTone.frequency.value=73.416,this.lowGain=t.createGain(),this.lowGain.gain.value=.002,this.lowTone.connect(this.lowGain),this.lowGain.connect(this.ambience),this.lowTone.start(),this.ambient.push(this.lowTone)}update(t,{night:e=!1,water:n=!1,hunt:s=!1,paused:r=!1}={}){if(!this.context||!this.started||this.context.state!=="running"||r)return;this.elapsed+=Math.min(t,.1),this.night=e,this.water=n,this.hunt=s;const a=this.context.currentTime;if(this.current.volume.gain.setTargetAtTime((n?.2:.075)+Math.sin(this.elapsed*.31)*.015,a,.5),this.breeze.volume.gain.setTargetAtTime((e?.009:.019)+(Math.sin(this.elapsed*.071)+1)*.004,a,1),this.insects.volume.gain.setTargetAtTime(e?.005:.001,a,1.4),this.lowGain.gain.setTargetAtTime(s?.025:.002,a,1.1),this.lowTone.frequency.setTargetAtTime(s?55:73.416,a,.5),this.elapsed>this.nextCroak&&(this.nextCroak=this.elapsed+(e?5:9)+this.random()*14,this.croak(.2+this.random()*.15,180+this.random()*110,(this.random()-.5)*1.8)),!e&&this.elapsed>this.nextBird&&(this.nextBird=this.elapsed+11+this.random()*21,this.chirp(.08,(this.random()-.5)*1.6)),!s&&this.elapsed>this.nextNote){this.nextNote=this.elapsed+15+this.random()*13;const o=e?[146.832,220,293.665]:[196,246.942,293.665,440],l=o[Math.floor(this.random()*o.length)];this.tone(l,l,3.8,.014,"sine",.6,(this.random()-.5)*.8,this.ambience),this.tone(l*1.5,l*1.5,4.4,.005,"sine",.8,0,this.ambience)}}output(t=0,e){const n=this.context;if(n.createStereoPanner){const s=n.createStereoPanner();return s.pan.value=Math.max(-1,Math.min(1,t)),s.connect(e||this.sfx),s}return e||this.sfx}tone(t,e,n,s=.1,r="sine",a=.005,o=0,l,c=0){if(!this.context)return;const h=this.context,d=h.currentTime+c,u=h.createOscillator();u.type=r,u.frequency.setValueAtTime(Math.max(20,t),d),u.frequency.exponentialRampToValueAtTime(Math.max(20,e),d+n);const f=h.createGain();f.gain.setValueAtTime(0,d),f.gain.linearRampToValueAtTime(s,d+Math.min(a,n*.4)),f.gain.exponentialRampToValueAtTime(1e-4,d+n);const p=this.output(o,l);u.connect(f),f.connect(p),u.start(d),u.stop(d+n+.03),u.onended=()=>{u.disconnect(),f.disconnect(),p!==this.sfx&&p!==this.ambience&&p.disconnect()}}noiseBurst(t,e=.1,n=1e3,s=.4,r="bandpass",a=0,o=0){if(!this.context)return;const l=this.context,c=l.currentTime+o,h=l.createBufferSource();h.buffer=this.white;const d=l.createBiquadFilter();d.type=r,d.frequency.value=n,d.Q.value=s;const u=l.createGain();u.gain.setValueAtTime(0,c),u.gain.linearRampToValueAtTime(e,c+.006),u.gain.exponentialRampToValueAtTime(1e-4,c+t);const f=this.output(a);h.connect(d),d.connect(u),u.connect(f),h.start(c,this.random()*.7),h.stop(c+t+.02),h.onended=()=>{h.disconnect(),d.disconnect(),u.disconnect(),f!==this.sfx&&f.disconnect()}}croak(t=.35,e=210,n=0){this.tone(e*1.2,e*.72,.17,t*.12,"sawtooth",.018,n),this.tone(e*.7,e*.55,.22,t*.17,"sine",.02,n),this.tone(e,e*.76,.18,t*.1,"triangle",.012,n,void 0,.16),this.noiseBurst(.18,t*.025,900,2,"bandpass",n)}chirp(t=.2,e=0){const n=1600+this.random()*1e3;this.tone(n,n*1.32,.09,t*.3,"sine",.012,e),this.tone(n*1.45,n,.12,t*.22,"sine",.008,e,void 0,.13),this.tone(n,n*1.18,.07,t*.2,"sine",.006,e,void 0,.3)}play(t,e={}){if(!this.context||this.context.state!=="running"||this._muted)return;typeof e=="number"&&(e={intensity:e});const n=this.context.currentTime,s={splash:.11,hit:.065,tongue:.09,footstep:.14,water:.15,ui:.04}[t]||.045;if(n-(this.lastPlayed.get(t)??-100)<s)return;this.lastPlayed.set(t,n);const r=Math.max(.03,Math.min(2,e.volume??e.intensity??1)),a=e.pan||0;switch(t){case"tongue":case"catch":this.tone(650,125,.13,.085*r,"sine",.002,a),this.tone(190,420,.065,.06*r,"triangle",.001,a),this.noiseBurst(.035,.035*r,1700,.8,"bandpass",a);break;case"eat":case"fly":case"food":this.tone(430,220,.075,.075*r,"sine",.003,a),this.noiseBurst(.08,.025*r,1300,.7,"bandpass",a),this.tone(740,880,.09,.018*r,"sine",.004,a,void 0,.04);break;case"jump":this.noiseBurst(.17,.065*r,500,.7,"bandpass",a),this.tone(140,65,.16,.055*r,"sine",.005,a);break;case"land":case"footstep":this.noiseBurst(.085,.055*r,410,.7,"lowpass",a),this.tone(100,45,.11,.055*r,"sine",.002,a);break;case"splash":case"water":this.noiseBurst(.42,.15*r,1700,.2,"lowpass",a),this.noiseBurst(.16,.08*r,3600,.4,"bandpass",a,.025),this.tone(140,50,.24,.07*r,"sine",.003,a),this.tone(660,220,.13,.018*r,"sine",.005,a,void 0,.08);break;case"hit":case"kick":case"damage":this.tone(125,38,.16,.18*r,"sine",.002,a),this.noiseBurst(.105,.12*r,850,.5,"lowpass",a),this.noiseBurst(.04,.055*r,2600,.6,"bandpass",a);break;case"slam":case"heavy":this.tone(90,27,.42,.23*r,"sine",.005,a),this.noiseBurst(.35,.2*r,1100,.3,"lowpass",a),this.noiseBurst(.18,.1*r,3200,.5,"bandpass",a,.02);break;case"roar":case"intimidate":this.croak(.8*r,115,a),this.tone(77,51,.65,.15*r,"triangle",.05,a),this.croak(.7*r,105,a);break;case"croak":this.croak(.6*r,180+this.random()*75,a);break;case"hurt":this.tone(330,120,.2,.07*r,"sawtooth",.005,a),this.tone(160,90,.25,.095*r,"sine",.006,a);break;case"death":this.tone(220,43,.55,.08*r,"triangle",.01,a),this.noiseBurst(.3,.065*r,1200,.5,"lowpass",a);break;case"recruit":case"success":this.croak(.3*r,220,a),[392,493.883,587.33].forEach((o,l)=>this.tone(o,o,.28,.045*r,"sine",.015,a,void 0,l*.1));break;case"promote":case"levelup":case"level-up":[293.665,392,493.883,587.33].forEach((o,l)=>this.tone(o,o,.6,.06*r,"sine",.014,a,void 0,l*.12)),this.tone(146.832,146.832,1.2,.045*r,"sine",.03,a);break;case"build":for(let o=0;o<4;o++)this.noiseBurst(.09,.085*r,1e3+o*350,.8,"bandpass",a,o*.12),this.tone(210+o*35,80,.11,.06*r,"triangle",.003,a,void 0,o*.12);break;case"loot":case"gather":this.noiseBurst(.2,.055*r,2300,.7,"bandpass",a),[550,740].forEach((o,l)=>this.tone(o,o*1.04,.18,.035*r,"sine",.006,a,void 0,l*.08));break;case"flap":this.noiseBurst(.2,.19*r,550,.3,"lowpass",a),this.noiseBurst(.17,.12*r,900,.5,"bandpass",a,.22);break;case"heron":case"hunt":case"warning":this.tone(490,170,.55,.085*r,"sawtooth",.045,a),this.noiseBurst(.6,.09*r,1900,1.2,"bandpass",a),this.tone(65,52,.8,.1*r,"sine",.06,a);break;case"snake":case"hiss":this.noiseBurst(.7,.12*r,4200,1.3,"bandpass",a);break;case"fish":this.noiseBurst(.65,.21*r,950,.4,"lowpass",a),this.tone(90,25,.45,.2*r,"sine",.008,a);break;case"night":this.tone(196,196,2,.025*r,"sine",.3,a),this.tone(293.665,293.665,2.6,.018*r,"sine",.4,a);break;case"victory":case"win":[196,246.942,293.665,392,493.883,587.33,784].forEach((o,l)=>this.tone(o,o,1.3,.05*r,"sine",.03,a,void 0,l*.19));break;case"defeat":case"lose":[196,174.614,146.832,98].forEach((o,l)=>this.tone(o,o,1,.04*r,"sine",.04,a,void 0,l*.28));break;case"ui":case"click":this.tone(520,440,.045,.035*r,"sine",.002,a);break;case"blocked":case"error":this.tone(150,120,.1,.04*r,"triangle",.003,a);break}}async destroy(){for(const t of this.ambient)try{t.stop(),t.disconnect()}catch{}this.ambient=[],this.context&&await this.context.close().catch(()=>{}),this.context=null,this.started=!1}}class cx{constructor(t,e){this.canvas=t,this.onAction=e,this.keys=new Set,this.pressed=new Set,this.released=new Set,this.dx=0,this.dy=0,this.left=!1,this.right=!1,this.pointerLocked=!1,this.mode="third",this.zoomDelta=0,this.pointerInside=!1,this.mouseX=innerWidth/2,this.mouseY=innerHeight/2,this.mouse={x:this.mouseX,y:this.mouseY,ndcX:0,ndcY:0},this.ndc={x:0,y:0},this.mouseNDC=this.ndc,this.abort=new AbortController;const n=this.abort.signal;addEventListener("keydown",s=>{s.target instanceof HTMLElement&&s.target.closest('input,textarea,select,[contenteditable="true"]')||(["Space","Tab","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(s.code)&&s.preventDefault(),this.keys.has(s.code)||this.pressed.add(s.code),this.keys.add(s.code),!s.repeat&&s.code==="Escape"&&this.onAction("escape"))},{signal:n}),addEventListener("keyup",s=>{this.keys.delete(s.code),this.released.add(s.code)},{signal:n}),addEventListener("mousemove",s=>{const r=this.canvas.getBoundingClientRect();this.mouseX=s.clientX,this.mouseY=s.clientY,this.mouse.x=s.clientX,this.mouse.y=s.clientY,this.ndc.x=(s.clientX-r.left)/(r.width||1)*2-1,this.ndc.y=1-(s.clientY-r.top)/(r.height||1)*2,this.mouse.ndcX=this.ndc.x,this.mouse.ndcY=this.ndc.y,this.mode!=="topdown"&&(this.pointerLocked||this.right)&&(this.dx+=s.movementX||0,this.dy+=s.movementY||0)},{signal:n}),t.addEventListener("mouseenter",()=>{this.pointerInside=!0},{signal:n}),t.addEventListener("mouseleave",()=>{this.pointerInside=!1},{signal:n}),t.addEventListener("mousedown",s=>{s.button===0&&(this.left=!0,this.pressed.add("MouseLeft")),s.button===2&&(this.right=!0,this.pressed.add("MouseRight"))},{signal:n}),addEventListener("mouseup",s=>{s.button===0&&(this.left=!1,this.released.add("MouseLeft")),s.button===2&&(this.right=!1,this.released.add("MouseRight"))},{signal:n}),t.addEventListener("wheel",s=>{s.preventDefault();const r=s.deltaMode===1?16:s.deltaMode===2?innerHeight:1;this.zoomDelta+=Math.max(-180,Math.min(180,s.deltaY*r))},{signal:n,passive:!1}),t.addEventListener("contextmenu",s=>s.preventDefault(),{signal:n}),document.addEventListener("pointerlockchange",()=>{const s=this.pointerLocked;this.pointerLocked=document.pointerLockElement===t,s&&!this.pointerLocked&&this.onAction("unlock")},{signal:n}),addEventListener("blur",()=>{this.clear(),this.onAction("blur")},{signal:n})}setMode(t){this.mode=t,this.canvas.style.cursor=t==="topdown"?"crosshair":"default",t==="topdown"&&this.clearMouseMotion()}clearMouseMotion(){this.dx=0,this.dy=0,this.zoomDelta=0}lock(){if(!(this.mode==="topdown"||this.buildingMode))try{const t=this.canvas.requestPointerLock();t?.catch&&t.catch(()=>{})}catch{}}unlock(){document.pointerLockElement===this.canvas&&document.exitPointerLock()}down(t){return this.keys.has(t)}hit(t){return this.pressed.has(t)}up(t){return this.released.has(t)}endFrame(){this.pressed.clear(),this.released.clear(),this.dx=0,this.dy=0,this.zoomDelta=0}clear(){this.keys.clear(),this.pressed.clear(),this.released.clear(),this.left=!1,this.right=!1,this.clearMouseMotion()}destroy(){this.abort.abort()}}const La=P;function hx(i){const t=[],e=[],n=i==="leaf"?8:10,s=i==="leaf"?4:12;if(i==="leaf")for(let a=0;a<=n;a++){const o=a/n,l=Math.sin(Math.PI*o)*(.19+.02*Math.sin(a*3));for(let c=0;c<=s;c++){const h=c/s*2-1;t.push(h*l,.04*(1-h*h)+.025*Math.sin(o*5),o*.7-.35)}}else for(let a=0;a<=n;a++){const o=a/n*Math.PI,l=Math.cos(o),c=i==="drop"?1-.4*l:1;for(let h=0;h<=s;h++){const d=h/s*Math.PI*2,u=i==="mud"?1+.16*Math.sin(a*2.7+h*1.3)+.09*Math.cos(h*2):1;t.push(Math.sin(o)*Math.cos(d)*.1*c*u,l*(i==="drop"?.18:.105)*u,Math.sin(o)*Math.sin(d)*.1*c*u)}}for(let a=0;a<n;a++)for(let o=0;o<s;o++){const l=a*(s+1)+o,c=l+s+1;e.push(l,c,l+1,c,c+1,l+1)}const r=new Le;return r.setAttribute("position",new ce(t,3)),r.setIndex(e),r.computeVertexNormals(),r}function dx(){const t=new Uint8Array(16384);for(let n=0;n<64;n++)for(let s=0;s<64;s++){const r=(s-31.5)/31.5,a=(n-31.5)/31.5,o=r*r+a*a,l=.65+.2*Math.sin(s*.53+n*.26)+.15*Math.sin(n*.91-s*.35),c=(n*64+s)*4;t[c]=218,t[c+1]=226,t[c+2]=210,t[c+3]=Math.round(Math.max(0,Math.exp(-o*4)-.018)*l*175)}const e=new eo(t,64,64);return e.needsUpdate=!0,e.colorSpace=Sn,e}class ux{constructor(t){this.scene=t,this.tongues=[],this.trails=[],this.mist=[],this.texture=dx(),this.dummy=new Be;const e={leaf:{count:150,color:7903060},mud:{count:160,color:6509377},drop:{count:180,color:12442067}};this.pools={};for(const[n,s]of Object.entries(e)){const r=n==="drop"?new Dc({color:s.color,roughness:.1,metalness:.02,transparent:!0,opacity:.72,transmission:.12}):new tn({color:s.color,roughness:.88,side:Xe}),a=new Fn(hx(n),r,s.count);a.name="natural-"+n+"-fragments",a.instanceMatrix.setUsage(Fi),a.frustumCulled=!1,a.count=0,t.add(a),this.pools[n]={mesh:a,count:s.count,particles:[]}}}tongue(t,e,n=14192541){let s=this.tongues.find(r=>r.life<=0);if(!s){const o=new Le,l=new Float32Array(600),c=[];for(let d=0;d<24;d++)for(let u=0;u<7;u++){const f=d*8+u,p=f+7+1;c.push(f,p,f+1,p,p+1,f+1)}o.setAttribute("position",new nn(l,3).setUsage(Fi)),o.setIndex(c);const h=new Me(o,new tn({color:n,roughness:.3,metalness:0,side:Xe}));h.frustumCulled=!1,h.castShadow=!0,this.scene.add(h),s={mesh:h,g:o,pos:l,n:24,m:7,life:0},this.tongues.push(s)}s.actor=t,s.end=e.clone(),s.life=.29,s.total=.29,s.mesh.visible=!0,s.mesh.material.color.set(n)}cue(){return null}number(){return null}emit(t,e,n,s,r=1){const a=this.pools[t];for(let o=0;o<s&&a.particles.length<a.count;o++){const l=n+(Math.random()-.5)*2.9,c=(1+Math.random()*3)*r;a.particles.push({position:e.clone().add(new La((Math.random()-.5)*.45,Math.random()*.2,(Math.random()-.5)*.45)),velocity:new La(Math.sin(l)*c,(1.4+Math.random()*3.2)*r,Math.cos(l)*c),rotation:new La(Math.random()*6,Math.random()*6,Math.random()*6),spin:new La(Math.random()*6-3,Math.random()*6-3,Math.random()*6-3),life:.55+Math.random()*.65,total:1.2,scale:(.65+Math.random()*.9)*Math.sqrt(r)})}}cloud(t,e=1,n=!1){if(this.mist.length>=21)return;const s=new nu({map:this.texture,color:n?13886687:11249296,transparent:!0,opacity:.28,depthWrite:!1,rotation:Math.random()*6}),r=new mp(s);r.position.copy(t),r.scale.setScalar(.7*e),this.scene.add(r),this.mist.push({sprite:r,life:.55,total:.55,power:e})}trail(t,e,n=1){if(this.trails.length>=30)return;const s=[],r=[],a=10;for(let h=0;h<=a;h++){const d=h/a,u=(.3+d*2)*n,f=Math.sin(Math.PI*d)*.13*n;for(const p of[-1,1])s.push(t.x+Math.sin(e)*u+Math.cos(e)*f*p,t.y+.15+Math.sin(d*Math.PI)*.22,t.z+Math.cos(e)*u-Math.sin(e)*f*p);if(h<a&&h%4!==3){const p=h*2;r.push(p,p+1,p+2,p+1,p+3,p+2)}}const o=new Le;o.setAttribute("position",new ce(s,3)),o.setIndex(r);const l=new Qa({color:13095361,side:Xe,transparent:!0,opacity:.3,depthWrite:!1}),c=new Me(o,l);c.name="tapered-motion-fragments",this.scene.add(c),this.trails.push({mesh:c,life:.13,total:.13})}strike(t,e,n=0,s=1){if(!e||![e.x,e.y,e.z,n,s].every(Number.isFinite))return;s=Math.max(.15,Math.min(3,s));const r=t==="fish",a=t==="slam"||t==="debris";this.emit("mud",e,n,a?18:r?4:7,s),this.emit("leaf",e,n,t==="croak"?3:a?12:6,s*.8),this.emit("drop",e,n,r?28:t==="heron"?10:a?14:5,s),t!=="croak"&&this.cloud(e,s,r),["kick","tongue","heron","snake"].includes(t)&&this.trail(e,n,s)}update(t){t=Math.max(0,Math.min(.1,Number.isFinite(t)?t:0));const e=new P,n=new P,s=new P,r=new P,a=new P(0,1,0);for(const o of this.tongues){if(o.life<=0)continue;if(o.life-=t,o.life<=0){o.mesh.visible=!1;continue}o.actor.model.mouthWorld(e),n.copy(o.end).sub(e);const l=1-o.life/o.total,c=Math.sin(Math.PI*l)**.6;n.multiplyScalar(c),s.crossVectors(n,a).normalize(),s.lengthSq()<.01&&s.set(1,0,0),r.crossVectors(s,n).normalize();for(let h=0;h<=o.n;h++){const d=h/o.n,u=e.clone().addScaledVector(n,d);u.y+=Math.sin(d*Math.PI)*.12*(1-c);const f=(.035+.028*Math.pow(d,8))*(.8+.2*Math.sin(Math.PI*d));for(let p=0;p<=o.m;p++){const v=p/o.m*Math.PI*2,g=(h*(o.m+1)+p)*3;o.pos[g]=u.x+(s.x*Math.cos(v)+r.x*Math.sin(v))*f,o.pos[g+1]=u.y+(s.y*Math.cos(v)+r.y*Math.sin(v))*f,o.pos[g+2]=u.z+(s.z*Math.cos(v)+r.z*Math.sin(v))*f}}o.g.attributes.position.needsUpdate=!0,o.g.computeVertexNormals()}for(const[o,l]of Object.entries(this.pools)){for(let c=l.particles.length-1;c>=0;c--){const h=l.particles[c];if(h.life-=t,h.life<=0){l.particles.splice(c,1);continue}h.velocity.y-=t*(o==="leaf"?3.8:12),h.position.addScaledVector(h.velocity,t),h.rotation.addScaledVector(h.spin,t),h.position.y<.03&&(h.position.y=.03,h.velocity.y=Math.abs(h.velocity.y)*.22,h.velocity.x*=.7,h.velocity.z*=.7),h.velocity.multiplyScalar(Math.exp(-t*(o==="leaf"?1.8:.25)))}l.mesh.count=l.particles.length,l.particles.forEach((c,h)=>{this.dummy.position.copy(c.position),this.dummy.rotation.set(c.rotation.x,c.rotation.y,c.rotation.z);const d=Math.min(1,c.life*5);this.dummy.scale.setScalar(c.scale*d),this.dummy.updateMatrix(),l.mesh.setMatrixAt(h,this.dummy.matrix)}),l.mesh.instanceMatrix.needsUpdate=!0}for(let o=this.trails.length-1;o>=0;o--){const l=this.trails[o];l.life-=t,l.life<=0?(this.scene.remove(l.mesh),l.mesh.geometry.dispose(),l.mesh.material.dispose(),this.trails.splice(o,1)):l.mesh.material.opacity=.3*l.life/l.total}for(let o=this.mist.length-1;o>=0;o--){const l=this.mist[o];if(l.life-=t,l.life<=0)this.scene.remove(l.sprite),l.sprite.material.dispose(),this.mist.splice(o,1);else{const c=1-l.life/l.total;l.sprite.position.y+=t*.35,l.sprite.scale.setScalar(l.power*(.7+c*1.9)),l.sprite.material.opacity=.3*(1-c)}}}clear(){for(const t of this.tongues)t.life=0,t.mesh.visible=!1;for(const t of this.trails)this.scene.remove(t.mesh),t.mesh.geometry.dispose(),t.mesh.material.dispose();for(const t of this.mist)this.scene.remove(t.sprite),t.sprite.material.dispose();this.trails=[],this.mist=[];for(const t of Object.values(this.pools))t.particles=[],t.mesh.count=0}}const Md=new WeakMap,fr=_i.clamp,fx={third:"Τρίτο πρόσωπο",first:"Πρώτο πρόσωπο",topdown:"Κάτοψη"};function px(i){let t=Md.get(i);return t||(t={focus:new P,wanted:new P,target:new P,look:new P,forward:new P,right:new P,sample:new P,raycaster:new Ic,ndc:new kt,plane:new ai(new P(0,1,0),0),hit:new P,lastMode:null,time:0},Md.set(i,t)),t}function cc(i,t,e){let n=0;return i.world?.sampleHeight?n=i.world.sampleHeight(t,e):i.world?.getSurface&&(n=i.world.getSurface(t,e)?.height),Number.isFinite(n)?n:0}function mx(i,t,e,n){for(let s=3;s<=18;s++){const r=s/18;n.sample.lerpVectors(t,e,r);const a=cc(i,n.sample.x,n.sample.z);if(n.sample.y<a+.28){e.lerpVectors(t,e,Math.max(.16,r-.085));break}}e.y=Math.max(e.y,cc(i,e.x,e.z)+.3)}function gx(i,t,e){const n=i.input;if(e==="topdown"){const l=n?.ndc||n?.mouseNDC;t.ndc.set(l?.x||0,l?.y||0)}else t.ndc.set(0,0);t.raycaster.setFromCamera(t.ndc,i.camera);const s=i.player;let r=e==="first"?s.y+.45:Math.max(0,s.y+.08),a=!1;for(let l=0;l<3;l++){t.plane.constant=-r;const c=t.raycaster.ray.intersectPlane(t.plane,t.hit);if(!c)break;a=!0,r=cc(i,c.x,c.z)+.08}const o=i.aimPoint||(i.aimPoint=new P);if(a&&t.hit.distanceTo(i.camera.position)<350?o.copy(t.hit):t.raycaster.ray.at(e==="topdown"?60:24,o),e==="topdown"){const l=o.x-s.x,c=o.z-s.z;l*l+c*c>.0225&&(i.aimYaw=Math.atan2(l,c))}else i.aimYaw=i.cameraYaw;i.aimPitch=e==="topdown"?0:i.cameraPitch}function wu(i,t,e=!1){if(!i.camera||!i.player)return;const n=px(i),s=i.camera,r=i.player,a=i.input,o=i.viewMode||(i.viewMode="third");n.lastMode!==o&&(e=!0,n.lastMode=o,a?.setMode?.(o)),n.time+=Math.min(Math.max(t,0),.1),i.cameraYaw=Number.isFinite(i.cameraYaw)?i.cameraYaw:.28,i.cameraPitch=Number.isFinite(i.cameraPitch)?i.cameraPitch:.38,i.cameraDistance=Number.isFinite(i.cameraDistance)?i.cameraDistance:8.4;const l=i.started!==!1&&!i.paused&&!i.ui?.isBlocking?.();if(l&&o!=="topdown"){const g=fr(i.settings?.sensitivity??1,.15,3);i.cameraYaw-=(a?.dx||0)*.0025*g,i.cameraPitch+=(a?.dy||0)*.002*g,i.cameraPitch=fr(i.cameraPitch,o==="first"?-1.18:-.12,o==="first"?1.25:1.18)}l&&a?.zoomDelta&&(o==="topdown"?i.topdownHeight=fr((i.topdownHeight||26)+a.zoomDelta*.025,15,48):o==="third"&&(i.cameraDistance=fr(i.cameraDistance+a.zoomDelta*.009,3.8,16))),i.hidePlayer=o==="first",r.model?.group&&(r.model.group.visible=!i.hidePlayer);const c=i.cameraYaw,h=i.cameraPitch;n.forward.set(Math.sin(c),0,Math.cos(c)),n.right.set(-Math.cos(c),0,Math.sin(c));const d=i.cameraFocus||n.focus,u=i.cameraWanted||n.wanted,f=1-Math.exp(-Math.max(0,t)*12);n.target.set(r.x,r.y+.73,r.z),e||o==="first"?d.copy(n.target):d.lerp(n.target,f),s.up.set(0,1,0);let p=63;if(o==="first")p=76,u.set(r.x,r.y+.86,r.z).addScaledVector(n.forward,.38),s.near=.045,s.position.copy(u),n.sample.set(Math.sin(c)*Math.cos(h),-Math.sin(h),Math.cos(c)*Math.cos(h)),n.look.copy(s.position).add(n.sample);else if(o==="topdown"){p=49,s.near=.15;const g=i.topdownHeight||26;u.set(d.x,d.y+g,d.z-g*.31),e?s.position.copy(u):s.position.lerp(u,1-Math.exp(-t*9)),n.look.set(d.x,d.y-.2,d.z+1.2)}else{s.near=.1;const g=i.cameraDistance;u.copy(d).addScaledVector(n.forward,-Math.cos(h)*g).addScaledVector(n.right,.62),u.y+=Math.sin(h)*g+.35,mx(i,d,u,n),e?s.position.copy(u):s.position.lerp(u,1-Math.exp(-t*15)),n.look.copy(d).addScaledVector(n.forward,1.65).addScaledVector(n.right,.14)}const v=typeof i.shake=="number"?i.shake:i.shake?.amount||0;if(l&&v>0){const g=fr(v,0,2)*(o==="first"?.035:.075);s.position.x+=Math.sin(n.time*111.3)*g,s.position.y+=Math.sin(n.time*137.1+1)*g*.7,s.position.z+=Math.sin(n.time*91.8+2)*g*.5}return s.lookAt(n.look),Math.abs(s.fov-p)>.01?(s.fov=p,s.updateProjectionMatrix()):e&&s.updateProjectionMatrix(),s.updateMatrixWorld(!0),gx(i,n,o),i.movementYaw=o==="topdown"?0:i.cameraYaw,o}function bd(i){const t=i.viewMode||"third",e={third:"first",first:"topdown",topdown:"third"}[t]||"third";return i.viewMode=e,i.hidePlayer=e==="first",i.ignoreUnlockUntil=performance.now()+500,i.input?.setMode?.(e),i.input?.clearMouseMotion?.(),e==="topdown"?i.input?.unlock?.():i.started&&!i.paused&&!i.ui?.isBlocking?.()&&i.input?.lock?.(),wu(i,0,!0),i.ui?.toast?.(`${fx[e]} · C για αλλαγή κάμερας`,"info"),e}const vx=1,Va=["settlement","hunters","preparation","bosses","complete"],Fr=["heron","snake","fish"],$n=Object.freeze({cost:Object.freeze({food:8,reeds:4}),duration:18}),bi=(i,t=0)=>Number.isFinite(Number(i))?Number(i):t,en=i=>Math.max(0,bi(i)),hc=["store","nursery","training","watchtower","palisade"],Sd=i=>[...new Set(Array.isArray(i)?i.filter(t=>Fr.includes(t)):[])],Tu=(i,t)=>Array.isArray(i?.buildings)?i.buildings.includes(t):!!i?.buildings?.[t],Eu=i=>!!i&&i.team==="ally"&&!i.destroyed&&bi(i.hp,1)>0;function $s(i={}){const t=i&&typeof i=="object"?i:{};return{version:vx,phase:Va.includes(t.phase)?t.phase:"settlement",defeated:Sd(t.defeated),bossDefeated:Sd(t.bossDefeated),resourceTotals:{food:en(t.resourceTotals?.food),reeds:en(t.resourceTotals?.reeds)},achieved:[...new Set(Array.isArray(t.achieved)?t.achieved.filter(e=>typeof e=="string").map(e=>e.slice(0,100)):[])],legacy:!!t.legacy}}function Au(i={}){const t=Object.fromEntries(hc.map(e=>[e,en(i.buildings?.[e])]));return{gatheredFood:en(i.gatheredFood),gatheredReeds:en(i.gatheredReeds),shelters:en(i.shelters),buildings:t,buildingCount:Object.values(t).reduce((e,n)=>e+n,0),allies:en(i.allies),trained:en(i.trained),territories:en(i.territories)}}function xx(i,t,e=i.phase){const n=Au(t),s=Math.max(i.resourceTotals.food,n.gatheredFood),r=Math.max(i.resourceTotals.reeds,n.gatheredReeds),a=(o,l,c,h,d,u={})=>({id:o,icon:l,current:c,target:h,label:d,phase:e,...u});return e==="settlement"?[a("gather-food","food",s,30,"Συγκέντρωσε 30 τροφή"),a("gather-reeds","reeds",r,45,"Συγκέντρωσε 45 υλικά"),a("build-shelter","shelter",n.shelters,1,"Απόκτησε ένα καταφύγιο"),a("build-store","store",n.buildings.store,1,"Κατασκεύασε αποθήκη"),a("build-nursery","nursery",n.buildings.nursery,1,"Κατασκεύασε φυτώριο"),a("build-training","training",n.buildings.training,1,"Κατασκεύασε χώρο εκπαίδευσης"),a("recruit-allies","recruit",n.allies,6,"Στρατολόγησε έξι συμμάχους"),a("train-starters","training",n.trained,3,"Εκπαίδευσε τρεις βατράχους")]:e==="hunters"?Fr.map(o=>a("hunt-"+o,o,i.defeated.includes(o)?1:0,1,"Νίκησε τον θηρευτή: "+o,{type:o,boss:!1})):e==="preparation"?[a("expand-shelters","shelter",n.shelters,2,"Απόκτησε δύο καταφύγια"),a("expand-buildings","build",n.buildingCount,6,"Κατασκεύασε έξι κτίρια"),a("train-army","training",n.trained,6,"Εκπαίδευσε έξι βατράχους")]:e==="bosses"||e==="complete"?[...Fr.map(o=>a("boss-"+o,o,i.bossDefeated.includes(o)?1:0,1,"Νίκησε τον αρχηγό: "+o,{type:o,boss:!0})),a("territories","crown",n.territories,5,"Ένωσε και τις πέντε αντίπαλες περιοχές")]:[]}function Cu(i,t={}){const e=$s(i);return xx(e,t).map(n=>{const s=e.achieved.includes(n.id)||n.current>=n.target,r=s?Math.max(n.current,n.target):n.current;return{...n,current:r,done:s,progress:Math.min(1,Math.max(0,r/n.target))}})}function dc(i,t={}){const e=$s(i),n=Au(t),s=[];e.resourceTotals.food=Math.max(e.resourceTotals.food,n.gatheredFood),e.resourceTotals.reeds=Math.max(e.resourceTotals.reeds,n.gatheredReeds);for(let r=0;r<Va.length;r++){const a=Cu(e,n);for(const c of a)c.done&&!e.achieved.includes(c.id)&&e.achieved.push(c.id);if(e.phase==="complete"||!a.length||!a.every(c=>c.done))break;const o=e.phase,l=Va[Va.indexOf(o)+1];e.phase=l,s.push({from:o,to:l})}return{state:e,transitions:s}}function Ru(i=null,t={},{legacy:e=!1}={}){const n=$s(i);return n.legacy=n.legacy||e,dc(n,t).state}function yx(i,t=0,e=0){const n=$s(i);return n.resourceTotals.food+=en(t),n.resourceTotals.reeds+=en(e),n}function Pu(i){const t=$s(i);return t.phase==="bosses"?Fr.find(e=>!t.bossDefeated.includes(e))??null:null}function _x(i,t,{boss:e=!1}={}){const n=$s(i);if(!Fr.includes(t))return n;if(e){if(n.phase!=="bosses"||Pu(n)!==t)return n;n.bossDefeated.includes(t)||n.bossDefeated.push(t)}else{if(n.phase!=="hunters")return n;n.defeated.includes(t)||n.defeated.push(t)}return n}function Mx(i={}){const t=Array.isArray(i.camps)?i.camps:[],e=t.filter(Eu),n=(Array.isArray(i.frogs)?i.frogs:[]).filter(l=>l&&l.team==="ally"&&!l.dead&&bi(l.hp,1)>0),s=Object.fromEntries(hc.map(l=>[l,e.filter(c=>Tu(c,l)).length])),r={store:{food:10,reeds:20},nursery:{food:22,reeds:28},training:{food:18,reeds:24},watchtower:{food:12,reeds:24},palisade:{food:8,reeds:30}},a={food:e.length*12,reeds:e.length*30};for(const l of hc)for(const c of["food","reeds"])a[c]+=s[l]*r[l][c];const o=e.reduce((l,c)=>({food:l.food+en(c.stock?.food),reeds:l.reeds+en(c.stock?.reeds)}),{food:0,reeds:0});return{gatheredFood:Math.max(en(i.stats?.gatheredFood),en(i.resources?.food)+o.food+a.food),gatheredReeds:Math.max(en(i.stats?.gatheredReeds),en(i.resources?.reeds)+o.reeds+a.reeds),shelters:e.length,buildings:s,allies:n.length,trained:n.filter(l=>l.trained||bi(l.level,1)>=2).length,territories:t.filter(l=>l.originalEnemy&&(l.destroyed||l.team==="ally")).length}}function bx(i,t,e={}){return!!i&&i.team==="ally"&&!i.dead&&bi(i.hp)>0&&!i.trained&&!i.trainingPaid&&!i.grabbedBy&&Eu(t)&&Tu(t,"training")&&en(e.food)>=$n.cost.food&&en(e.reeds)>=$n.cost.reeds}function Sx(i){if(!i||i.dead||!(bi(i.hp)>0)||i.trained)return!1;const t=Math.max(1,Math.floor(bi(i.level,1))),e=Math.max(1,Math.floor(bi(i.tier,1))),n=Math.min(99,t+1);return i.level=n,i.tier=Math.max(2,e),i.maxHp=Math.max(1,bi(i.maxHp,100))+(n>t?8:0)+(e<2?25:0),i.hp=i.maxHp,i.xp=en(i.xp),i.trained=!0,!0}const Du=1,wd="frog-creek-dominion-v1",En={player:15005068,ally:7531963,enemy:16742501,neutral:15652229,predator:16753999,surrender:16770459},wx={scout:"Ανιχνευτής",bruiser:"Μαχητής",caller:"Κράχτης",hunter:"Κυνηγός"},Lu={heron:{name:"Ο Ερωδιός",hp:650,speed:3.5,damage:30,reach:4.2,windup:1.25,recover:1.55,grab:3.7,scale:1.25},snake:{name:"Το Νερόφιδο",hp:470,speed:4.6,damage:24,reach:3.1,windup:1,recover:1.45,grab:4.2,scale:1.1},fish:{name:"Ο Κυνηγός του Βυθού",hp:540,speed:5.7,damage:35,reach:3.6,windup:1.5,recover:2,grab:3.5,scale:1.2}},zr={shelter:{name:"Νέο καταφύγιο",description:"Μια νέα βάση, αποθέματα και ασφαλές σημείο επιστροφής.",cost:{food:12,reeds:30}},store:{name:"Αποθήκη",description:"Περισσότερη ασφαλής τροφή και καλύτερη συλλογή πόρων.",cost:{food:10,reeds:20}},nursery:{name:"Φωλιά στρατολόγησης",description:"Δημιουργεί νέο βάτραχο κάθε 85″ με κόστος 10 τροφή / 6 καλάμια.",cost:{food:22,reeds:28}},training:{name:"Χώρος εκπαίδευσης",description:"Εκπαιδεύει κάθε σύμμαχο μία φορά: 8 τροφή / 4 υλικά και 18″ για επίπεδο και βαθμίδα II.",cost:{food:18,reeds:24}},watchtower:{name:"Σκοπιά",description:"Οι φρουροί εντοπίζουν νωρίτερα επιδρομές και μάχονται καλύτερα.",cost:{food:12,reeds:24}},palisade:{name:"Περίφραξη",description:"Προσθέτει 180 αντοχή στη βάση και καθυστερεί επιδρομείς.",cost:{food:8,reeds:30}},upgrade:{name:"Αναβάθμιση βάσης",description:"Επόμενη βαθμίδα, περισσότερη αντοχή και θέσεις συμμάχων.",cost:{food:30,reeds:40}},repair:{name:"Επισκευή",description:"Αποκαθιστά 150 αντοχή στο καταφύγιο.",cost:{food:3,reeds:12}}};function Bt(i,t,e){return Math.min(e,Math.max(t,Number.isFinite(i)?i:t))}function zi(i,t){return Object.entries(t).every(([e,n])=>(i[e]||0)>=n)}function ki(i,t){if(!zi(i,t))return!1;for(const[e,n]of Object.entries(t))i[e]-=n;return!0}function uc(i){return 40+Math.max(1,i)*28}function hl(i,t){i.xp=(i.xp||0)+Math.max(0,t);let e=0;for(;i.xp>=uc(i.level||1);)i.xp-=uc(i.level||1),i.level=(i.level||1)+1,i.maxHp+=8,i.hp=Math.min(i.maxHp,i.hp+20),e++;return e}function Ka(i){return{food:12*(i.tier||1),reeds:18*(i.tier||1)}}function fc(i,t){return i.hp>0&&(i.tier||1)<3&&i.level>=(i.tier||1)*2&&zi(t,Ka(i))}function Td(i,t){return fc(i,t)?(ki(t,Ka(i)),i.tier++,i.maxHp+=25,i.hp=i.maxHp,!0):!1}function Tx({allyPower:i=1,enemyPower:t=1,hp:e=1,maxHp:n=1,morale:s=100,campDestroyed:r=!1,neutral:a=!1}){return a?1:Bt(.16+.26*(i/Math.max(t,1))+.26*(1-e/Math.max(1,n))+.22*(1-s/100)+(r?.32:0),.06,.98)}function pr(i,t=1,e=1,n=!1){return Math.max(1,Math.round(i*(1+(t-1)*.28+(e-1)*.045)*(n?.35:1)))}function Ex(i,t){const e=Math.max(0,(i.maxStomach||100)-i.stomach),n=Math.min(e,Math.max(0,t));return i.stomach+=n,n}function Ed(i){return 6+i.filter(t=>t.team==="ally"&&!t.destroyed).reduce((t,e)=>t+4+(e.tier||1)*2+(e.buildings?.nursery?3:0),0)}function rn(i){const t=((i/600+.375)%1+1)%1,e=Bt(Math.sin(t*Math.PI*2-Math.PI/2)*1.35,0,1),n=Math.floor(t*24),s=Math.floor((t*24-n)*60);return{phase:t,daylight:e,night:e<.2,day:Math.floor((i+225)/600)+1,timeLabel:`${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}`}}function Ax(i){if(!i||i.version!==Du||!i.player||typeof i.player!="object"||!Array.isArray(i.frogs)||!Array.isArray(i.camps)||!Number.isFinite(i.player.x)||!Number.isFinite(i.player.z)||!Number.isFinite(i.player.hp))return null;const t=JSON.parse(JSON.stringify(i));t.elapsed=Bt(t.elapsed||0,0,1e8),t.resources={food:Bt(t.resources?.food||0,0,1e6),reeds:Bt(t.resources?.reeds||0,0,1e6)};const e=r=>typeof r=="string"&&/^(player|ally|neutral|enemy\d*)$/.test(r),n=["follow","attack","guard","forage","regroup","training"],s=r=>({...r,name:typeof r.name=="string"?r.name.slice(0,60):"Βάτραχος",role:Object.hasOwn(wx,r.role)?r.role:"hunter",x:Bt(r.x,-108,108),z:Bt(r.z,-108,108),yaw:Number.isFinite(r.yaw)?r.yaw:0,maxHp:Bt(r.maxHp||100,25,1e4),hp:Bt(r.hp,1,Bt(r.maxHp||100,25,1e4)),stomach:Bt(r.stomach||0,0,100),maxStomach:100,level:Math.floor(Bt(r.level||1,1,99)),tier:Math.floor(Bt(r.tier||1,1,3)),xp:Bt(r.xp||0,0,1e6),morale:Bt(r.morale??100,0,100),home:typeof r.home=="string"?r.home:null,guard:!!r.guard,leader:!!r.leader,surrendered:!!r.surrendered,order:n.includes(r.order)?r.order:r.guard?"guard":"follow",trained:!!r.trained,trainingPaid:!!r.trainingPaid&&!r.trained,trainingProgress:Bt(r.trainingProgress||0,0,$n.duration),trainingCamp:typeof r.trainingCamp=="string"?r.trainingCamp:null,returnOrder:r.returnOrder==="guard"?"guard":"follow"});t.player=s({...t.player,team:"player",id:"player"}),t.frogs=t.frogs.filter(r=>r&&typeof r=="object"&&typeof r.id=="string"&&Number.isFinite(r.x)&&Number.isFinite(r.z)&&r.hp>0&&e(r.team)&&r.team!=="player").map(s),t.camps=t.camps.filter(r=>r&&typeof r=="object"&&typeof r.id=="string"&&Number.isFinite(r.x)&&Number.isFinite(r.z)&&e(r.team)).map(r=>({...r,name:typeof r.name=="string"?r.name.slice(0,80):"Καταφύγιο",x:Bt(r.x,-108,108),z:Bt(r.z,-108,108),yaw:Number.isFinite(r.yaw)?Math.atan2(Math.sin(r.yaw),Math.cos(r.yaw)):0,tier:Math.floor(Bt(r.tier||1,1,3)),maxHp:Bt(r.maxHp||350,100,1e4),hp:Bt(r.hp??350,0,Bt(r.maxHp||350,100,1e4)),stock:{food:Bt(r.stock?.food||0,0,1e6),reeds:Bt(r.stock?.reeds||0,0,1e6)},buildings:Object.fromEntries(["store","nursery","training","watchtower","palisade"].map(a=>[a,!!r.buildings?.[a]])),morale:Bt(r.morale??100,0,100),destroyed:!!r.destroyed,originalEnemy:!!r.originalEnemy,supplyMigrated:!!r.supplyMigrated,spawnTimer:Bt(r.spawnTimer||0,0,1e4),mealCount:Bt(r.mealCount||0,0,2),mealDay:Bt(r.mealDay||0,0,1e6)}));for(const r of t.camps)r.buildingPlacements=N1(r);t.campaign=t.campaign&&typeof t.campaign=="object"?Ru(t.campaign):null,t.stats={...t.stats&&typeof t.stats=="object"?t.stats:{}};for(const r of["trained","gatheredFood","gatheredReeds"])t.stats[r]=Bt(t.stats[r]||0,0,1e8);return t.idCounter=Math.floor(Bt(t.idCounter||0,0,1e8)),t.won=!!t.won,t}function Cx(i){return()=>{let t=i+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const Ze=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Cn=i=>i&&(i.team==="player"||i.team==="ally"),wi=i=>i&&!i.dead&&i.hp>0,Or=(i,t=.3)=>new P(i.x,(i.y||0)+t,i.z),Rx=(i,t,e)=>i+Math.atan2(Math.sin(t-i),Math.cos(t-i))*Math.min(1,e),Px={heron:21,snake:17,fish:23},Dx={heron:2.65,snake:1.65,fish:2.85},Lx={heron:.44,snake:.38,fish:.58},Ix={heron:1.8,snake:2.05,fish:1.35},Ia=new P;function zc(i){if(i._aiReady)return;const t=Lu[i.type];i._aiReady=!0,i.baseSpeed=Number.isFinite(i.baseSpeed)&&i.baseSpeed>0?i.baseSpeed:Number.isFinite(i.speed)&&i.speed>0?i.speed:t.speed,i.speed=0,i.health=i.hp,i.baseWindup=Number.isFinite(i.windup)&&i.windup>0?i.windup:t.windup,i.baseRecover=Number.isFinite(i.recover)&&i.recover>0?i.recover:t.recover,i.windup=i.baseWindup,i.recover=i.baseRecover,i.strikeRadius=Number.isFinite(i.strikeRadius)&&i.strikeRadius>0?i.strikeRadius:Dx[i.type]*(i.boss?i.type==="fish"?1.8:1.45:1),i.lungeTime=Number.isFinite(i.lungeTime)&&i.lungeTime>0?i.lungeTime:Lx[i.type],i.burstCount=Number.isFinite(i.burstCount)?Bt(Math.round(i.burstCount),1,5):i.boss?i.type==="heron"?2:i.type==="snake"?3:1:1,i.burstRemaining=0,i.burstIndex=0,i.enraged=!!i.boss&&i.hp<=i.maxHp*.5,i.defeatNotified=!1,i.grabCooldown=0,i.thinkTime=0,i.chaseTime=0,i.lostTime=0,i.huntUntil=0,i.playerDamage=0,i.lastCombatAt=-100,i.engagedPlayer=!1,i.hitAnim=0,i.repelAwarded=!1,i.killAwarded=!1,i.provokedUntil=0,i.hunting=!1,i.fearPressure=0,i.attackDuration=1,i.attackType="lunge",i.movePulse=0,i.grace=i.grace||0}function Iu(i,t,e){return i.world.getSurface(t,e)}function Gi(i,t,e){const n=Iu(i,t,e);return n.type==="water"||n.type==="lily"||n.type==="leaf"||n.height<.13}function Uu(i,t,e){return Cn(e)&&i.elapsed<(i.graceUntil||0)&&i.elapsed>=(t.provokedUntil||0)}function Ar(i,t,e){return!wi(e)||e.grabbedBy&&e.grabbedBy!==t||Uu(i,t,e)?!1:t.type==="fish"?Gi(i,e.x,e.z)&&e.y<1.15:t.type==="snake"?e.y<2.2:e.y<4.1}function Nu(i,t,e=5){const n=t.team==="player"?"ally":t.team;let s=0;for(const r of i.frogs)r===t||!wi(r)||r.grabbedBy||(r.team==="player"?"ally":r.team)===n&&Ze(r,t)<e&&s++;return s}function os(i,t,e=37){return i.player&&Ze(i.player,t)<e}function fi(i,t,e,n=1){os(i,t,42)&&i.audio?.play?.(e,{intensity:n*Math.max(.25,1-Ze(i.player,t)/52)})}function Hs(i,t){t.engagedPlayer=!0,t.huntUntil=i.elapsed+10,t.hunting=!0,(!i.hunt||i.hunt.dead||i.hunt.phase==="dormant"||Ze(i.player,t)<Ze(i.player,i.hunt)*.72)&&(i.hunt=t),(!t.announced||i.elapsed-t.announced>28)&&(t.announced=i.elapsed,i.ui?.toast?.(`${t.name} σε κυνηγά! Πολέμησε για να τον απωθήσεις ή να τον σκοτώσεις.`,"warning"),fi(i,t,"hunt",.9))}function wn(i,t){i.phase=t,i.phaseTime=0,i.speed=0}function Ux(i,t){let e=null,n=1/0;const s=Px[t.type];for(const r of i.frogs){if(!Ar(i,t,r))continue;const a=Ze(t,r);if(a>s)continue;const o=Nu(i,r),l=a+r.hp/r.maxHp*2.3+Math.min(o,5)*.65-(r.hp<r.maxHp*.45?2:0);l<n&&(n=l,e=r)}return e&&(t.target=e,t.targetId=e.id,t.chaseTime=0,t.lostTime=0,wn(t,"stalk"),Cn(e)&&os(i,t,40)?Hs(i,t):fi(i,t,t.type,.45)),e}function dl(i,t,e,n,s,r){let a=e-t.x,o=n-t.z,l=Math.hypot(a,o);if(l<.05){t.speed=0;return}let c=t.x+a/l*Math.min(l,s*r),h=t.z+o/l*Math.min(l,s*r);if(t.type==="fish"&&!Gi(i,c,h)){let d=null,u=1/0;const f=Math.atan2(a,o),p=Math.max(.16,s*r);for(const v of[.45,-.45,.9,-.9,1.4,-1.4,2.2,-2.2]){const g=f+v,m=t.x+Math.sin(g)*p,y=t.z+Math.cos(g)*p;if(!Gi(i,m,y))continue;const x=Math.hypot(e-m,n-y)+Math.abs(v)*.08;x<u&&(u=x,d={x:m,z:y})}if(!d){t.speed=0;return}c=d.x,h=d.z,a=c-t.x,o=h-t.z}c=Bt(c,-106,106),h=Bt(h,-106,106),t.yaw=Rx(t.yaw,Math.atan2(a,o),r*(t.type==="heron"?4:7)),t.speed=Math.hypot(c-t.x,h-t.z)/Math.max(.001,r),t.x=c,t.z=h,t.movePulse+=r*t.speed,t.movePulse>4.5&&t.type!=="snake"&&os(i,t,32)&&(t.movePulse=0,Gi(i,t.x,t.z)&&i.world.splash(Or(t,-t.y),t.type==="heron"?.32:.2))}function ri(i,t){if(t.type==="fish"){let e=-1.52+Math.sin(i.elapsed*1.8)*.055;t.phase==="windup"&&(e+=Bt(t.phaseTime/t.windup,0,1)*.32),t.phase==="lunge"&&(e=-1.15+Math.sin(Bt(t.phaseTime/t.lungeTime,0,1)*Math.PI)*(t.boss?1.55:1.05)),t.phase==="grab"&&(e=-.74+Math.sin(i.elapsed*3)*.08),t.phase==="recover"&&(e=-1.52+Math.max(0,1-t.phaseTime/.7)*.4),t.dead&&(e=-.78),t.y=e}else{const e=i.world.sampleHeight(t.x,t.z);t.y=t.type==="snake"?Math.max(-.1,e):Math.max(-.2,e)}}function Cr(i,t){t.target=null,t.targetId=null,t.chaseTime=0,t.lostTime=0,t.cooldown=Math.max(t.cooldown,2.5),t.huntUntil=Math.min(t.huntUntil,i.elapsed+3),wn(t,"patrol")}function Ad(i,t,e=!1){const n=t.target;if(!Ar(i,t,n)){Cr(i,t);return}if(e?t.burstIndex++:(t.burstRemaining=Math.max(t.burstCount,t.boss&&t.type==="fish"&&t.enraged?2:1)-1,t.burstIndex=0),t.windup=Math.max(.8,t.baseWindup*(t.enraged?.78:1)),wn(t,"windup"),t.strike={x:Bt(n.x+(n.vx||0)*.12,-106,106),z:Bt(n.z+(n.vz||0)*.12,-106,106)},t.boss&&t.type==="snake"){const a=Math.atan2(n.x-t.x,n.z-t.z),o=t.burstIndex%2?1:-1;t.strike.x=Bt(t.strike.x+Math.cos(a)*o*.75,-106,106),t.strike.z=Bt(t.strike.z-Math.sin(a)*o*.75,-106,106)}t.attackType="lunge",t.attackDuration=t.windup+t.lungeTime,t.attackAnim=t.attackDuration;const s=Iu(i,t.strike.x,t.strike.z),r=new P(t.strike.x,Math.max(.05,s.height),t.strike.z);t.type==="fish"&&i.world.splash(r,t.boss?1.1:.65,"#adcfba"),fi(i,t,t.type,.9),Cn(n)&&os(i,t,42)&&Hs(i,t)}function Nx(i,t){wn(t,"lunge"),t.struck=!1,t.lungeStart={x:t.x,z:t.z};const e=t.strike.x-t.x,n=t.strike.z-t.z,s=Math.hypot(e,n)||1;t.yaw=Math.atan2(e,n);const r=Math.max(0,Math.min(s-Ix[t.type]*(t.boss?1.45:1),t.reach+1.3));t.lungeEnd={x:t.x+e/s*r,z:t.z+n/s*r},t.type==="heron"&&fi(i,t,"flap",.7)}function kx(i,t,e){t.grabbed=e,e.grabbedBy=t,t.rescueDamage=0,t.grabCooldown=15,e.vx=e.vz=e.vy=e.speed=0,e.grounded=!1,e.stun=0,wn(t,"grab"),t.attackType="lunge",t.attackDuration=t.grab,t.attackAnim=t.grab,Cn(e)&&(Hs(i,t),i.ui?.toast?.(e===i.player?"Σε άρπαξε! Πάτα Q / Space / R για να ξεφύγεις!":`${e.name} αρπάχτηκε! Χτύπα τον θηρευτή για να τον σώσεις!`,"warning"))}function Fx(i,t){if(t.struck)return;t.struck=!0;const e=new P(t.strike.x,Math.max(.08,i.world.sampleHeight(t.strike.x,t.strike.z)),t.strike.z);Gi(i,e.x,e.z)&&i.world.splash(e,(t.type==="fish"?2.2:t.type==="heron"?1.25:.8)*(t.boss?1.65:1)),i.vfx?.strike?.(t.type,e,t.yaw,(t.type==="fish"?1.8:1.2)*(t.boss?1.5:1)),i.world.impact(e,"#d7d7a6",t.type==="snake"?.8:1.4),fi(i,t,t.type==="fish"?"fish":"slam",.85);let n=null;for(const s of i.frogs){if(!wi(s)||s.grabbedBy||Uu(i,t,s)||t.type==="fish"&&!Gi(i,s.x,s.z)||Ze(s,t.strike)>t.strikeRadius||s.y>e.y+(t.type==="heron"?2:1.15)*(t.boss?1.4:1))continue;const r=s.hp,a=(s.invulnerable||0)>0,o=s===t.target&&!a&&!s.blocking&&t.grabCooldown<=0&&(s.hp/s.maxHp<.68||Nu(i,s,5)<=1);i.damage(s,t.damage,t,{knockback:t.type==="snake"?2.8:4.8}),o&&wi(s)&&s.hp<r&&(n=s)}n&&kx(i,t,n)}function Wr(i,t){const e=t.grabbed;if(!e)return null;if(t.grabbed=null,t.rescueDamage=0,e.grabbedBy=null,!e.dead){const n=t.yaw+(t.type==="snake"?1.5:1.1),s=(t.type==="heron"?2.6:2.1)*(t.boss?1.5:1);e.x=Bt(t.x+Math.sin(n)*s,-106,106),e.z=Bt(t.z+Math.cos(n)*s,-106,106),e.y=Math.max(i.world.sampleHeight(e.x,e.z)+.45,t.type==="heron"?t.y+.9:.35),e.vx=Math.sin(n)*3,e.vz=Math.cos(n)*3,e.vy=3.7,e.grounded=!1,e.jumpTime=.7,e.invulnerable=Math.max(e.invulnerable||0,1.4),e.stun=Math.max(e.stun||0,.18)}return e}function Oc(i,t){const e=Wr(i,t);wn(t,"recover"),t.cooldown=1.25,t.rescueResistUntil=i.elapsed+5,t.grabCooldown=Math.max(t.grabCooldown,16),i.world.impact(Or(t,t.type==="heron"?1.4:.4),"#a9edc9",1.1),fi(i,t,"success",.7),Cn(e)&&(i.ui?.toast?.(e===i.player?"Ξέφυγες! Η ομάδα σου έχει παράθυρο αντεπίθεσης.":`${e.name} σώθηκε!`,"success"),i.gainXP?.(12))}function zx(i,t){const e=t.grabbed;e&&(t.grabbed=null,e.grabbedBy=null,i.damage(e,e.hp+e.maxHp+100,t,{bypass:!0,knockback:0}),t.hp=Math.min(t.maxHp,t.hp+t.maxHp*.07),t.health=t.hp,Cn(e)&&e!==i.player&&i.ui?.toast?.(`${t.name} έφαγε τον ${e.name}. Κράτα την ομάδα κοντά σου.`,"danger"),fi(i,t,"death",.8),wn(t,"recover"),t.cooldown=2.8,t.target=null,t.targetId=null)}function Ox(i,t){Wr(i,t),wn(t,"flee"),t.fleeTime=0,t.target=null,t.targetId=null,t.attackAnim=0;const e=t.lastAttacker||i.player||{x:0,z:0},n=t.x-e.x,s=t.z-e.z,r=Math.hypot(n,s)||1;t.fleeDestination={x:Bt(t.x+n/r*9,-104,104),z:Bt(t.z+s/r*9,-104,104)},t.engagedPlayer&&(t.huntUntil=i.elapsed+7,i.ui?.toast?.({icon:"intimidate",portrait:i.portraits?.[t.type],progress:1,tone:"success",detail:`${t.name}: ο εκφοβισμός πέτυχε.`}))}function Bx(i,t){const e=t.engagedPlayer&&!t.repelAwarded&&!t.killAwarded;Cr(i,t),t.grace=i.elapsed+35,t.huntUntil=0,t.hunting=!1,t.fearPressure=0,e&&(t.repelAwarded=!0,i.stats.predatorsRepelled=(i.stats.predatorsRepelled||0)+1,i.gainXP?.(45),fi(i,t,"success",.75)),i.hunt===t&&(i.hunt=null)}function Cd(i,t){t.dead=!1,t.hp=t.maxHp,t.health=t.hp,t.x=t.anchor.x,t.z=t.anchor.z,t.yaw=0,t.model.group.visible=!0,t.grabbed=null,t.rescueDamage=0,t.target=null,t.targetId=null,t.playerDamage=0,t.engagedPlayer=!1,t.repelAwarded=!1,t.killAwarded=!1,t.announced=0,t.hunting=!1,t.huntUntil=0,t.cooldown=3,t.grabCooldown=3,t.grace=i.elapsed+8,t.attackAnim=0,t.hitAnim=0,t.provokedUntil=0,t.lastCombatAt=-100,t.chaseTime=0,t.lostTime=0,t.fearPressure=0,t.enraged=!1,t.defeatNotified=!1,t.burstRemaining=0,t.windup=t.baseWindup,t.recover=t.baseRecover,wn(t,"patrol"),ri(i,t)}function Hx(i,t,e){if(Wr(i,t),t.dead=!0,t.hp=0,t.health=0,t.respawnAt=t.campaignTracked?1/0:i.elapsed+220,wn(t,"dead"),t.attackAnim=0,t.target=null,t.targetId=null,t.hunting=!1,t.huntUntil=0,(Cn(e)||t.playerDamage>0)&&!t.killAwarded){const n=t.boss?250:100;t.killAwarded=!0,i.stats.predatorsKilled=(i.stats.predatorsKilled||0)+1,i.gainXP?.(n),i.ui?.toast?.({icon:t.boss?"crown":"attack",portrait:i.portraits?.[t.id]||i.portraits?.[t.type],value:n,progress:1,tone:"success",detail:`${t.name} νικήθηκε!`}),fi(i,t,"victory",.65)}i.hunt===t&&(i.hunt=null),Gi(i,t.x,t.z)?i.world.splash(Or(t,-t.y),t.boss?2.3:1.4):i.world.impact(Or(t,.1),"#c9bc94",t.boss?1.8:1),t.defeatNotified||(t.defeatNotified=!0,i.onPredatorDefeated?.(t))}function Vx(i,t,e,n=null){if(zc(t),e=Number(e),!Number.isFinite(e)||e<=0||t.dead||t.phase==="dormant")return!1;const s=Math.min(t.hp,Math.max(1,e));return t.hp=Math.max(0,t.hp-s),t.health=t.hp,t.enraged=!!t.boss&&t.hp<=t.maxHp*.5,t.hitAnim=.23,t.lastCombatAt=i.elapsed,t.lastAttacker=n,Cn(n)&&(t.playerDamage+=s,t.provokedUntil=i.elapsed+120,t.grace=0,(os(i,t,45)||n===i.player)&&Hs(i,t)),os(i,t,35)&&(i.world.impact(Or(t,t.type==="heron"?1.5:.45),"#ebd9ab",Bt(s/30,.5,1.8)),fi(i,t,"hit",.75)),t.grabbed&&(t.rescueDamage+=s),t.hp<=0?(Hx(i,t,n),!0):(t.grabbed&&t.rescueDamage>=45&&Oc(i,t),t.phase==="flee"&&(t.fearPressure=0,t.target=wi(n)?n:i.player,t.targetId=t.target?.id,wn(t,"stalk")),wi(n)&&(t.phase==="patrol"||!t.target||Cn(n)&&!Cn(t.target))&&(t.target=n,t.targetId=n.id,t.chaseTime=0,t.lostTime=0,t.phase!=="recover"&&t.phase!=="flee"&&wn(t,"stalk")),!0)}function Gx(i,t,e=35){return zc(t),t.dead||t.phase==="dormant"||t.phase==="flee"?!1:(t.fearPressure=Bt(t.fearPressure+Bt(Number(e)||0,0,50),0,100),t.grabbed&&(t.rescueDamage+=Math.max(0,e)*.4,t.rescueDamage>=45&&Oc(i,t)),t.fearPressure>=85?(Ox(i,t),!0):!1)}function Rd(i){return i?i.grabbed?.team==="player"?"ΣΕ ΑΡΠΑΞΕ — Πάτα Q / Space / R. Οι σύμμαχοι μπορούν να σε ελευθερώσουν!":i.grabbed&&Cn(i.grabbed)?`ΔΙΑΣΩΣΗ — Χτύπα τον θηρευτή πριν καταπιεί τον ${i.grabbed.name}!`:i.phase==="windup"?i.type==="fish"?"ΕΦΟΔΟΣ ΑΠΟ ΚΑΤΩ — Πήδηξε σε βράχο ή άλλαξε κατεύθυνση!":"ΕΤΟΙΜΑΖΕΙ ΕΠΙΘΕΣΗ — Απέφυγε την έφοδο και αντεπιτέσου.":i.phase==="flee"?"ΥΠΟΧΩΡΕΙ — Απώθησέ τον ή καταδίωξέ τον για να τον νικήσεις.":i.phase==="recover"?"ΠΑΡΑΘΥΡΟ ΑΝΤΕΠΙΘΕΣΗΣ — Συντόνισε τα χτυπήματα της ομάδας.":{heron:"Χτύπα τα πόδια και απόφυγε το ράμφος. Η ομάδα μπορεί να διακόψει ένα άρπαγμα.",snake:"Άνοιξε την ομάδα και χτύπα από τα πλάγια. Πρόσεχε την έφοδο από τις καλαμιές.",fish:"Χρησιμοποίησε βράχους και ρηχά. Χτύπα όταν βγει στην επιφάνεια."}[i.type]||"Πολέμησε για να απωθήσεις ή να σκοτώσεις τον θηρευτή.":""}function Wx(i,t){t=Bt(t,0,.1);for(const s of i.predators){if(zc(s),s.phaseTime+=t,s.cooldown=Math.max(0,s.cooldown-t),s.grabCooldown=Math.max(0,s.grabCooldown-t),s.thinkTime-=t,s.speed=0,s.fearPressure=Math.max(0,s.fearPressure-t*2),s.dead||s.phase==="dead"){s.phaseTime>=4&&(s.model.group.visible=!1),!s.campaignTracked&&i.elapsed>=s.respawnAt&&Ze(i.player,s.anchor)>34&&!i.allies().some(l=>Ze(l,s.anchor)<15)&&Cd(i,s);continue}if(s.phase==="dormant"){!s.campaignTracked&&i.elapsed>=s.respawnAt&&Ze(i.player,s.anchor)>34&&!i.allies().some(l=>Ze(l,s.anchor)<15)&&Cd(i,s);continue}if(s.phase==="flee"){s.fleeTime+=t,dl(i,s,s.fleeDestination.x,s.fleeDestination.z,s.baseSpeed*.72,t),(s.fleeTime>=6||Ze(s,s.fleeDestination)<.6)&&Bx(i,s),ri(i,s);continue}if(s.phase==="grab"){const l=s.grabbed;if(!wi(l)){Wr(i,s),wn(s,"recover");continue}if(s.rescueDamage>=45){Oc(i,s);continue}Cn(l)&&Hs(i,s),s.model.mouthWorld?(s.model.mouthWorld(Ia),l.x=Ia.x,l.z=Ia.z,l.y=Ia.y-.2):(l.x=s.x+Math.sin(s.yaw)*1.5,l.z=s.z+Math.cos(s.yaw)*1.5,l.y=s.y+(s.type==="heron"?2.4:.8)),l.yaw=s.yaw+Math.PI*.4,l.vx=l.vz=l.vy=0,l.speed=0,l.grounded=!1,s.phaseTime>=s.grab&&zx(i,s),ri(i,s);continue}if(s.phase==="windup"){s.phaseTime>=s.windup&&Nx(i,s),ri(i,s);continue}if(s.phase==="lunge"){const l=Bt(s.phaseTime/s.lungeTime,0,1),c=1-Math.pow(1-l,3),h=s.lungeStart.x+(s.lungeEnd.x-s.lungeStart.x)*c,d=s.lungeStart.z+(s.lungeEnd.z-s.lungeStart.z)*c;(s.type!=="fish"||Gi(i,h,d))&&(s.speed=Ze(s,{x:h,z:d})/Math.max(.001,t),s.x=h,s.z=d),l>=.55&&Fx(i,s),s.phase==="lunge"&&l>=1&&(s.burstRemaining>0&&Ar(i,s,s.target)&&Ze(s,s.target)<s.reach+3?(s.burstRemaining--,Ad(i,s,!0)):(s.burstRemaining=0,s.recover=s.baseRecover*(s.enraged?.72:1),wn(s,"recover"),s.cooldown=s.recover)),ri(i,s);continue}if(s.phase==="recover"){if(s.phaseTime>=s.recover){const l=i.elapsed<s.provokedUntil;wi(s.target)&&(Ar(i,s,s.target)||l)&&Ze(s,s.target)<(l?52:29)?wn(s,"stalk"):Cr(i,s)}ri(i,s);continue}if(s.phase==="stalk"){if(s.chaseTime+=t,!wi(s.target)){Cr(i,s),ri(i,s);continue}Ar(i,s,s.target)?s.lostTime=0:s.lostTime+=t;const l=i.elapsed<s.provokedUntil;if(s.lostTime>(l?14:2.4)||Ze(s,s.target)>(l?52:34)||!l&&s.chaseTime>36&&Ze(s,s.target)>13){Cr(i,s),ri(i,s);continue}Cn(s.target)&&os(i,s,42)&&Hs(i,s);const c=Ze(s,s.target);if(c<=s.reach&&s.cooldown<=0&&s.lostTime===0)Ad(i,s);else{let h=s.target.x,d=s.target.z;if(s.type==="snake"&&c>6){const u=Math.atan2(h-s.x,d-s.z)+.48;h+=Math.cos(u)*1.4,d-=Math.sin(u)*1.4}dl(i,s,h,d,s.baseSpeed*(s.type==="heron"?1.08:1.02)*(s.enraged?1.18:1),t)}ri(i,s);continue}const r=i.elapsed*(s.type==="heron"?.07:.11)+(s.type==="snake"?2.1:s.type==="fish"?4.3:0),a=s.anchor.x+Math.sin(r)*(s.type==="fish"?10:6),o=s.anchor.z+Math.cos(r*.83)*(s.type==="fish"?8:5);dl(i,s,a,o,s.baseSpeed*.36,t),s.thinkTime<=0&&i.elapsed>=s.grace&&(s.thinkTime=.38,Ux(i,s)),ri(i,s)}const e=i.predators.filter(s=>!s.dead&&s.phase!=="dormant"&&(s.huntUntil>i.elapsed||Cn(s.target)&&Ze(s,i.player)<42));for(const s of i.predators)s.hunting=e.includes(s);e.includes(i.hunt)||(i.hunt=e.sort((s,r)=>Ze(s,i.player)-Ze(r,i.player))[0]||null);const n=e.find(s=>s.grabbed===i.player);n&&(i.hunt=n)}const fn=(i,t=0)=>Number.isFinite(Number(i))?Number(i):t,ss=i=>Math.max(0,fn(i)),Br=i=>Math.max(1,fn(i?.maxHp??i?.maxHP,100)),pc=i=>Math.max(1,fn(i?.maxStomach,100)),oo=i=>!!i&&!i.dead&&fn(i.hp,Br(i))>0,ku=i=>i?.faction??i?.team??i?.owner,Fu=i=>["ally","player","allied"].includes(ku(i))||i?.allied===!0,Pd=(i,t)=>Array.isArray(i?.buildings)?i.buildings.includes(t):!!i?.buildings?.[t],zu=i=>!!i&&Fu(i)&&!i.destroyed&&fn(i.hp,1)>0;function Dd(i,t=null){const e=(s,r,a,o)=>({eligible:s,guaranteed:r,cost:{food:a},reason:o});return!oo(i)||Fu(i)||i?.isPlayer?e(!1,!1,0,"unavailable"):!!i.surrendered||!!i.surrender||i.state==="surrender"||i.state==="surrendered"||t?.destroyed||t&&fn(t.hp,1)<=0?e(!0,!0,0,"surrender"):ku(i)==="neutral"?e(!0,!0,4,"neutral"):e(!0,!1,6,"persuade")}function Ou(i){return oo(i)&&(fn(i.stomach)<pc(i)||fn(i.hp)<Br(i))}function Ld(i,t){const e=l=>({consumed:!1,nourished:0,healed:0,food:0,reason:l});if(!oo(i))return e("unavailable");if(!Ou(i))return e("full");if(fn(i.eatCD)>0)return e("cooldown");if(!t)return e("empty");const n=typeof t.flies=="number"?"flies":typeof t.count=="number"?"count":typeof t.amount=="number"?"amount":"flies";if(ss(t[n])<1)return e("empty");const s=ss(i.stomach),r=ss(i.hp),a=Math.max(0,Math.min(12,pc(i)-s)),o=Math.max(0,Math.min(14,Br(i)-r));return t[n]=Math.max(0,t[n]-1),i.stomach=Math.min(pc(i),s+a),i.hp=Math.min(Br(i),r+o),i.eatCD=1.8,{consumed:!0,nourished:a,healed:o,food:1,reason:"fed"}}function ul(i,t){const e={food:0,reeds:0};if(!i||!zu(t)||t.supplyMigrated)return e;for(const n of["food","reeds"])e[n]=ss(t.stock?.[n]),i[n]=ss(i[n])+e[n];return t.stock={food:0,reeds:0},t.supplyMigrated=!0,e}function $x(i,t,e,{safe:n=!0}={}){const s={food:0,reeds:0};return!i||!n||!zu(t)||!(fn(e)>0)||(s.food=(Pd(t,"store")?.5:.25)*fn(e),s.reeds=(Pd(t,"watchtower")?.2:.12)*fn(e),i.food=ss(i.food)+s.food,i.reeds=ss(i.reeds)+s.reeds),s}function Xx(i,t,{safe:e=!0,store:n=!1}={}){if(!e||!oo(i)||i.grabbed||i.grabbedBy||!(fn(t)>0))return 0;const s=Math.max(0,fn(i.stomach)-10),r=Math.max(0,Br(i)-fn(i.hp)),a=Math.min(r,(n?3.8:2.2)*fn(t),s/.18);return a>0?(i.hp+=a,i.stomach=Math.max(10,fn(i.stomach)-a*.18),a):0}const mc=new Set(["shelter","store","nursery","watchtower","training","palisade"]),fl=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),qx=i=>(i%(Math.PI*2)+Math.PI*2)%(Math.PI*2),Bc=(i,t)=>i.camps.find(e=>e.id===t.campId);function Yx(i,t,e){const n=i.yaw||0,s=t.x-i.x,r=t.z-i.z;return{x:Math.cos(n)*s-Math.sin(n)*r,z:Math.sin(n)*s+Math.cos(n)*r,yaw:e}}function jx(i,t){const e=i.yaw||0;return{x:i.x+Math.cos(e)*t.x+Math.sin(e)*t.z,z:i.z-Math.sin(e)*t.x+Math.cos(e)*t.z}}function Zx(i,t){if(i.player.dead)return{valid:!1,reason:"unavailable"};if(!zi(i.resources,zr[t.type].cost))return{valid:!1,reason:"resources"};if(!Number.isFinite(t.x)||!Number.isFinite(t.z)||!t.hasPoint)return{valid:!1,reason:"invalid-position"};if(t.type==="shelter"){if(Math.abs(t.x)>96||Math.abs(t.z)>96)return{valid:!1,reason:"outside-world"};const n=i.camps.find(r=>r.destroyed&&fl(r,t)<5);if(n&&(t.x=n.x,t.z=n.z),i.camps.some(r=>!r.destroyed&&fl(r,t)<26))return{valid:!1,reason:"overlap-building"};const s=i.world.getSurface(t.x,t.z);return!n&&s.type!=="land"&&!(s.type==="rock"&&s.platform?.radius>6)?{valid:!1,reason:"water"}:fl(t,i.player)>36?{valid:!1,reason:"out-of-range"}:(t.ruin=n||null,t.local=null,{valid:!0,reason:null})}const e=Bc(i,t);return e?(t.local=Yx(e,t,t.yaw),kc(e,t.type,t.local)):{valid:!1,reason:"inactive-camp"}}function lo(i,t){const e=Bc(i,t),n=Zx(i,t);return t.valid=n.valid,t.reason=n.reason,t.y=e?.mesh?.position?.y??i.world.sampleHeight(t.x,t.z),t.ghost&&Number.isFinite(t.x)&&Number.isFinite(t.z)&&i.world.setBuildingPreview?.(t.ghost,{x:t.x,y:t.y,z:t.z,yaw:t.yaw+(e?.yaw||0),valid:t.valid}),t}function Kx(i,t,{dragging:e=!1}={}){if(!mc.has(t)||!zr[t])return!1;const n=t==="shelter"?null:i.nearestHome(18);if(t!=="shelter"&&(!n||n.destroyed||n.team!=="ally"))return i.ui.toast({icon:"camp",progress:0,tone:"warning"}),!1;if(n?.buildings?.[t])return!1;Rr(i,{quiet:!0});const s=t==="shelter"?{x:0,z:0,yaw:0}:t==="training"?{x:0,z:6,yaw:0}:t==="store"?{x:-6.5,z:6,yaw:0}:_u(t),r=n?jx(n,s):{x:i.player.x,z:i.player.z},a=i.buildPlacement={active:!0,type:t,campId:n?.id||null,x:r.x,z:r.z,yaw:s.yaw||0,hasPoint:!0,cost:{...zr[t].cost},dragging:e,ghost:i.world.createBuildingPreview?.(t)||null};return i.ignoreUnlockUntil=performance.now()+700,i.input&&(i.input.buildingMode=!0,i.input.clear?.(),i.input.unlock?.()),i.paused=!1,e||i.ui.closePanels?.(),i.world.showBuildArea?.(n||null),lo(i,a),i.updateUI?.(i.buildDayState?.()||{timeLabel:"",day:1,night:!1}),!0}function mr(i,t=null){const e=i.buildPlacement;if(!e?.active)return null;t&&(e.pointer={x:t.clientX,y:t.clientY},i.input?.mouse&&(i.input.mouse.x=t.clientX,i.input.mouse.y=t.clientY),t.dragging!==void 0&&(e.dragging=t.dragging));const n=e.dragging?e.pointer:i.input?.mouse||e.pointer;if(i.camera&&n&&Number.isFinite(n.x)&&Number.isFinite(n.y)){let s=!1;if(typeof document<"u"&&!e.dragging&&(s=!!document.elementFromPoint?.(n.x,n.y)?.closest?.("button,.fg-panel,.fg-placement-tools")),!s){const r=i.renderer?.domElement?.getBoundingClientRect?.()||{left:0,top:0,width:typeof innerWidth=="number"?innerWidth:1,height:typeof innerHeight=="number"?innerHeight:1},a=i.buildRay||(i.buildRay=new Ic),o=new kt((n.x-r.left)/r.width*2-1,1-(n.y-r.top)/r.height*2);a.setFromCamera(o,i.camera);const l=new P,c=Bc(i,e);let h=c?.mesh?.position?.y??i.player.y??0,d=!1;for(let u=0;u<(c?1:3);u++){const f=new ai(new P(0,1,0),-h);if(!a.ray.intersectPlane(f,l)){d=!1;break}d=!0,h=c?.mesh?.position?.y??i.world.sampleHeight(l.x,l.z)}e.hasPoint=d&&l.distanceTo(i.camera.position)<180,e.hasPoint&&(e.x=l.x,e.z=l.z)}}return lo(i,e)}function Jx(i,t=1){const e=i.buildPlacement;return e?.active?(e.yaw=qx(e.yaw+Math.sign(t||1)*Math.PI/12),lo(i,e),!0):!1}function Id(i){const t=i.buildPlacement;if(!t?.active)return!1;if(lo(i,t),!t.valid)return i.ui.toast({icon:"warning",progress:0,tone:"warning",detail:t.reason}),!1;const e={x:t.x,z:t.z,yaw:t.yaw,local:t.local?{...t.local}:null,campId:t.campId,ruin:t.ruin},n=t.type;return i.commitBuild(n,e),i.lastBuildCommitted?(Rr(i,{quiet:!0}),!0):!1}function Rr(i,{quiet:t=!1}={}){const e=i.buildPlacement;return e?.ghost&&i.world.removeBuildingPreview?.(e.ghost),i.world.hideBuildArea?.(),i.buildPlacement=null,i.input&&(i.input.buildingMode=!1,i.input.clearMouseMotion?.(),i.input.left=!1,i.input.right=!1),!t&&e&&(i.ui.closePanels?.(),i.ui.toast({icon:"camp",progress:0,tone:"info"})),!!e}const ke=P,Ud=Math.PI*2,Rt=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Ua=(i,t,e)=>i+Math.atan2(Math.sin(t-i),Math.cos(t-i))*Math.min(1,e),gr=["Σπίθα","Βρύο","Κρόκος","Σκιά","Νούφαρο","Σάλτος","Ρίζα","Σμάραγδος","Βότσαλο","Κάλαμος","Ρόζος","Σβούρα","Αστραπή","Λωτός","Νέφος","Σφύριγμα"],Na=["scout","hunter","bruiser","caller"],Qx=["id","name","team","role","tier","level","hp","maxHp","stomach","maxStomach","xp","x","z","yaw","morale","home","guard","leader","surrendered","order","skinColor","trained","trainingProgress","trainingCamp","trainingPaid","returnOrder"];class ty{constructor(){this.settings={quality:"high",volume:.55,sensitivity:1};try{Object.assign(this.settings,JSON.parse(localStorage.getItem("frog-settings")||"{}"))}catch{}this.scene=new No,this.scene.background=new Jt("#aacbd0"),this.scene.fog=new to("#98b9ba",.0065),this.renderer=new P1({antialias:!0,powerPreference:"high-performance",alpha:!1}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)),this.renderer.setSize(innerWidth,innerHeight),this.renderer.outputColorSpace=Sn,this.renderer.toneMapping=zd,this.renderer.toneMappingExposure=1.12,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=kd,this.renderer.domElement.id="world-canvas",this.renderer.domElement.setAttribute("aria-label","Τρισδιάστατος κόσμος Frog — Creek Dominion"),document.body.prepend(this.renderer.domElement),this.camera=new vn(59,innerWidth/innerHeight,.07,370),this.cameraYaw=.28,this.cameraPitch=.38,this.cameraDistance=12.2,this.cameraFocus=new ke,this.cameraWanted=new ke,this.sun=new Ea(16771003,3),this.sun.position.set(25,48,17),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),Object.assign(this.sun.shadow.camera,{left:-35,right:35,top:35,bottom:-35,near:1,far:140}),this.sun.shadow.bias=-25e-5,this.sun.shadow.normalBias=.035,this.scene.add(this.sun,this.sun.target),this.hemi=new Wo(13165807,4215607,2),this.scene.add(this.hemi),this.moon=new Ea(9549544,.15),this.moon.position.set(-30,35,-20),this.scene.add(this.moon),this.sky=new ro,this.sky.scale.setScalar(1e3),this.sky.material.uniforms.turbidity.value=5,this.sky.material.uniforms.rayleigh.value=1.8,this.sky.material.uniforms.mieCoefficient.value=.004,this.sky.material.uniforms.mieDirectionalG.value=.8,this.sky.material.uniforms.sunPosition.value.set(25,48,17),this.scene.add(this.sky);const t=new ic(this.renderer);this.environment=t.fromScene(this.sky,.04,1,1500),this.scene.environment=this.environment.texture,this.scene.environmentIntensity=.55,t.dispose(),this.world=H1(this.scene,this.renderer,{seed:731}),this.vfx=new ux(this.scene),this.audio=new lx,this.selectedIds=new Set,this.portraitCache=new Map,this.portraitQueue=[],this.iconCache=new Map,this.frogs=[],this.predators=[],this.camps=[],this.resources={food:22,reeds:40},this.elapsed=0,this.frameTime=0,this.idCounter=0,this.random=Cx(9541),this.started=!1,this.paused=!0,this.ended=!1,this.won=!1,this.command="follow",this.targetCommand=null,this.specialIndex=0,this.ui=new ox({onAction:(e,n)=>this.onAction(e,n),onStart:e=>this.start(e),onResume:()=>this.resume(),onSettings:e=>this.setSettings(e)}),this.ui.setSettings(this.settings),this.input=new cx(this.renderer.domElement,e=>{e==="escape"?this.escape():this.started&&!this.paused&&!this.ui.panel&&performance.now()>(this.ignoreUnlockUntil||0)&&this.pause()}),this.labels=document.createElement("canvas"),this.labels.id="world-labels",Object.assign(this.labels.style,{position:"fixed",inset:"0",width:"100%",height:"100%",pointerEvents:"none",zIndex:4}),document.body.append(this.labels),this.labelCtx=this.labels.getContext("2d"),this.timers={ui:0,save:0,objective:0,raids:0,lighting:0,flyAttack:0},this.shake=0,this.hitPause=0,this.stats=this.emptyStats(),this.hunt=null,this.resetWorld(),this.saved=this.readSave(),this.ui.showTitle(!!this.saved),this.applySettings(),this.resize(),this.makePortraits(),addEventListener("resize",()=>this.resize()),addEventListener("beforeunload",()=>this.save()),document.addEventListener("visibilitychange",()=>{document.hidden&&this.started&&(this.save(),this.pause())}),this.renderer.domElement.addEventListener("click",()=>{this.started&&!this.paused&&!this.buildPlacement?.active&&!this.ui.panel&&!this.input.pointerLocked&&this.input.lock()}),this.last=performance.now(),this.fps=60,this.renderer.setAnimationLoop(e=>this.frame(e)),window.__FROG__={version:"1.1.0",inspect:()=>this.inspect(),save:()=>this.save()},document.getElementById("boot")?.remove()}emptyStats(){return{flies:0,recruited:0,kills:0,predatorsKilled:0,predatorsRepelled:0,campsBuilt:0,campsCaptured:0,raidsDefended:0,losses:0,gatheredFood:0,gatheredReeds:0,trained:0}}resetWorld(t=null){this.buildPlacement&&Rr(this,{quiet:!0});for(const e of[...this.frogs,...this.predators])this.scene.remove(e.model.group),e.model.dispose?.();for(const e of this.camps)this.world.removeShelter(e.mesh);this.selectedIds=new Set,this.portraitQueue=[],this.frogs=[],this.predators=[],this.camps=[],this.vfx.clear(),this.player=null,this.elapsed=t?.elapsed||0,this.resources=t?.resources||{food:22,reeds:40},this.stats={...this.emptyStats(),...t?.stats||{}},this.idCounter=t?.idCounter||0,this.command="follow",this.targetCommand=null,this.hunt=null,this.won=t?.won||!1,this.ended=!1,this.nextRaid=this.elapsed+110,this.graceUntil=this.elapsed+45,this.deathTimer=0;for(const e of this.world.hotspots)e.flies=e.maxFlies;if(t){this.player=this.spawnFrog({...t.player,team:"player"});for(const e of t.frogs)this.spawnFrog({...e,trained:!!e.trained||!t.campaign&&e.team==="ally"&&e.level>=2});for(const e of t.camps)this.addCamp(e);for(const e of this.world.hotspots){const n=t.hotspots?.find(s=>s.id===e.id);n&&(e.flies=Bt(n.flies,0,e.maxFlies))}}else{this.player=this.spawnFrog({id:"player",name:"Άρης",x:0,z:0,yaw:-.55,team:"player",role:"hunter",hp:120,maxHp:120,stomach:55}),this.spawnFrog({name:"Σπίθα",x:-2,z:-2,team:"ally",role:"scout",stomach:62}),this.spawnFrog({name:"Βρύο",x:1.8,z:-2.4,team:"ally",role:"bruiser",stomach:65}),this.spawnFrog({name:"Κρόκος",x:3,z:-1,team:"ally",role:"caller",stomach:59});let e=this.world.campSites.filter(s=>s.team==="enemy").slice(0,5);e.length<5&&(e=this.world.campSites.filter(s=>Rt(s,{x:0,z:0})>25).slice(0,5)),e.forEach((s,r)=>{const a=this.addCamp({id:s.id||`enemy-camp-${r}`,x:s.x,z:s.z,name:["Οι Χάλκινοι","Οι Ριζοφύλακες","Τα Κόκκινα Καλάμια","Οι Νυχτοβάτες","Οι Βασιλιάδες του Βάλτου"][r],team:`enemy${r}`,originalEnemy:!0,tier:r>2?2:1,hp:350+r*45,maxHp:350+r*45,stock:{food:30+r*12,reeds:38+r*8},buildings:{store:!0,watchtower:r>1,nursery:r>2,palisade:r>2},morale:100});for(let o=0;o<4+(r>2?1:0);o++){const l=o/5*Ud;this.spawnFrog({x:a.x+Math.sin(l)*4,z:a.z+Math.cos(l)*4,team:a.team,home:a.id,leader:o===0,name:o===0?`Αρχηγός · ${a.name}`:gr[(r*4+o)%gr.length],role:Na[(r+o)%4],tier:r>2?2:1,level:1+r,guard:o<2})}});const n=[{x:12,z:-7},{x:-14,z:8},{x:20,z:18},{x:-24,z:-15}];for(let s=0;s<n.length;s++)this.spawnFrog({...n[s],team:"neutral",role:Na[s],name:gr[4+s]})}this.campaign=Ru(t?.campaign,t&&!t.campaign?Mx(t):this.campaignMetrics(),{legacy:!!t&&!t.campaign}),this.campaign=dc(this.campaign,this.campaignMetrics()).state,this.won=this.campaign.phase==="complete",this.campaignCheckAt=0,this.syncCampaignPredators(),this.cameraYaw=this.player.yaw||.28,this.cameraFocus.set(this.player.x,1.1,this.player.z),this.updateCamera(1,!0)}spawnFrog(t){const e=t.role||Na[Math.floor(this.random()*Na.length)],n=t.tier||1,s={id:t.id||`frog-${++this.idCounter}`,name:t.name||gr[this.idCounter%gr.length],team:t.team||"neutral",role:e,tier:n,level:t.level||1,xp:t.xp||0,hp:t.hp??(e==="bruiser"?120:95),maxHp:t.maxHp||(e==="bruiser"?120:95),stomach:t.stomach??65,maxStomach:100,x:t.x||0,z:t.z||0,y:0,yaw:t.yaw||0,vx:0,vz:0,vy:0,grounded:!0,jump:0,jumpTime:0,speed:0,morale:t.morale??100,home:t.home||null,guard:!!t.guard,leader:!!t.leader,surrendered:!!t.surrendered,dead:!1,attackAnim:0,attackType:"",roarAnim:0,hitAnim:0,attackCD:0,specialCD:0,invulnerable:0,stun:0,aiTime:0,brain:0,eatCD:0,intent:null,seed:this.idCounter,grabbedBy:null,thinkOffset:this.random()*5},r=[...s.id].reduce((l,c)=>l*31+c.charCodeAt(0)>>>0,17);s.seed=r%997,s.order=t.order||(s.guard?"guard":"follow"),s.trained=!!t.trained,s.trainingProgress=t.trainingProgress||0,s.trainingPaid=!!t.trainingPaid,s.trainingCamp=t.trainingCamp||null,s.returnOrder=t.returnOrder==="guard"?"guard":"follow";const a=s.team==="player"?[6065973]:s.team==="ally"?[5740139,7440201,4164985,9279579]:s.team==="neutral"?[11838541]:[11033138,8410986,9990979],o=t.skinColor??a[r%a.length];return s.skinColor=o,s.model=Da("frog",{color:o,team:s.team,role:e,tier:n,seed:s.seed}),s.model.setOutline(En[s.team]||En.enemy,!0),s.y=this.world.sampleHeight(s.x,s.z),s.model.group.position.set(s.x,s.y,s.z),s.model.group.rotation.y=s.yaw,s.model.group.userData.actor=s,this.scene.add(s.model.group),this.frogs.push(s),s.team==="player"&&(s.maxStamina=100,s.stamina=100,s.charge=-1,s.maxHp=t.maxHp||120,s.hp=t.hp??120),["ally","player"].includes(s.team)&&(this.portraitQueue??=[],this.portraitQueue.push(s)),s}spawnPredator(t){const e=Lu[t.type],n=!!t.boss,s=t.hp||(n?{heron:1600,snake:1450,fish:1900}[t.type]:e.hp),r=t.scale||e.scale*(n?1.85:1),a={...e,...t,id:(n?"boss-":"predator-")+t.type,name:n?{heron:"Σιδερόραμφος",snake:"Ρίζα του Βυθού",fish:"Λεβιάθαν"}[t.type]:e.name,maxHp:s,hp:s,scale:r,boss:n,campaignTracked:!!t.campaignTracked,team:"predator",y:0,yaw:0,phase:"patrol",phaseTime:0,attackAnim:0,hitAnim:0,dead:!1,cooldown:0,target:null,targetId:null,anchor:{x:t.x,z:t.z},notice:0,rescueDamage:0,grabbed:null,fleeTime:0,respawnAt:0,grace:0};return n&&(a.damage=e.damage*1.45,a.reach=e.reach*1.4,a.baseSpeed=e.speed*1.08,a.speed=a.baseSpeed,a.windup=Math.max(1.3,e.windup)),a.model=Da(t.type,{team:"predator",seed:n?827:432}),a.model.group.scale.setScalar(r),a.model.setOutline(n?15906405:En.predator,!0),n&&a.model.group.traverse(o=>{o.isMesh&&o.material?.color&&o.name!=="animated-color-silhouette"&&(t.type==="heron"?o.material.color.set(9477544):o.material.color.multiplyScalar(.76))}),a.y=t.type==="fish"?-.7:this.world.sampleHeight(a.x,a.z),a.model.group.position.set(a.x,a.y,a.z),this.scene.add(a.model.group),this.predators.push(a),a}addCamp(t){const e={tier:1,hp:350,maxHp:350,stock:t.team==="ally"?{food:0,reeds:0}:{food:14,reeds:20},buildings:{},morale:100,destroyed:!1,spawnTimer:0,mealCount:0,mealDay:0,...t};return ul(this.resources,e),e.mesh=this.world.createShelter({...e,storage:this.campStorage(e)}),this.camps.push(e),e}campStorage(t){if(t.team!=="ally")return t.stock;const e=Math.max(1,this.ownedCamps().length);return{food:this.resources.food/e,reeds:this.resources.reeds/e}}allies(){return this.frogs.filter(t=>t.team==="ally"&&!t.dead)}ownedCamps(){return this.camps.filter(t=>t.team==="ally"&&!t.destroyed)}hostile(t,e){if(t.dead||e.dead||t===e||t.team==="neutral"||e.team==="neutral"||t.surrendered||e.surrendered)return!1;const n=t.team==="player"?"ally":t.team,s=e.team==="player"?"ally":e.team;return n!==s}start(t){t==="continue"&&this.saved?this.resetWorld(this.saved):this.started&&this.resetWorld(),this.started=!0,this.paused=!1,this.ended=!1,this.ui.closePanels(),this.ui.showPause(!1),this.audio.init?.(),this.audio.start?.(),this.audio.setVolume?.(this.settings.volume),this.input.clear(),this.input.lock(),this.ui.toast("WASD κίνηση · Ποντίκι στόχευση · Space άλμα · E αλληλεπίδραση","info"),this.save()}pause(){!this.started||this.ended||(this.paused=!0,this.input.clear(),this.input.unlock(),this.ui.showPause(!0),this.save())}resume(){this.started&&(this.paused=!1,this.ended=!1,this.ui.hideMenus(),this.input.clear(),this.input.lock())}escape(){if(this.buildPlacement?.active){this.cancelBuildingPlacement();return}if(!this.started){this.ui.panel&&this.ui.showTitle(!!this.saved);return}this.ui.panel?this.ui.panel==="help"&&this.ui.returnMenu==="pause"?(this.ui.closePanels(),this.ui.showPause(!0),this.paused=!0):this.resume():this.paused?this.resume():this.pause()}setSettings(t){Object.assign(this.settings,t),localStorage.setItem("frog-settings",JSON.stringify(this.settings)),this.applySettings()}applySettings(){const t=this.settings.quality;this.renderer.setPixelRatio(Math.min(devicePixelRatio,t==="high"?1.5:t==="medium"?1.15:1)),this.renderer.shadowMap.enabled=t!=="low",this.scene.fog.density=t==="low"?.009:.0065,this.audio?.setVolume?.(this.settings.volume),this.resize()}resize(){this.camera.aspect=innerWidth/innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(innerWidth,innerHeight),this.labels&&(this.labels.width=innerWidth,this.labels.height=innerHeight)}frame(t){let e=Math.min(.05,Math.max(.001,(t-this.last)/1e3));if(this.last=t,this.frameTime+=e,this.fps=_i.lerp(this.fps,1/e,.03),this.input.hit("KeyC")&&this.started&&!this.ended&&(bd(this),this.input.pressed.delete("KeyC")),this.input.hit("KeyB")&&(this.toggleHUDControls(),this.input.pressed.delete("KeyB")),this.ui.panel&&this.started&&!this.buildPlacement?.active){if(this.ui.panel==="build"&&this.input.hit("KeyV")||["roster","map"].includes(this.ui.panel)&&this.input.hit("Tab"))this.ui.closePanels(),this.paused=!1,this.input.pressed.delete("KeyV"),this.input.pressed.delete("Tab"),this.input.lock();else if(this.ui.panel==="build"){for(let s=0;s<8;s++)if(this.input.hit(`Digit${s+1}`)){const r=this.buildOptions()[s];r?.enabled&&this.build(r.type),this.input.pressed.delete(`Digit${s+1}`)}}}this.started&&!this.paused&&!this.ended&&(!this.ui.isBlocking?.()||this.buildPlacement?.active)&&(this.hitPause>0&&(this.hitPause-=e,e*=.17),this.elapsed+=e,this.updatePlayer(e),this.updateFrogs(e),this.updatePredators(e),this.updateEconomy(e),this.updateCampaign(),this.checkVictory());const n=rn(this.elapsed);if(this.updateLighting(n),this.world.update(e,this.elapsed+this.frameTime*.025,n.daylight,new ke(this.player.x,this.player.y,this.player.z)),this.vfx.update(e),this.updateModels(e),this.portraitQueue?.length&&this.renderer){const s=this.portraitQueue.shift();s.dead||this.updateFrogPortrait(s)}this.updateCamera(e),this.buildPlacement?.active&&mr(this),this.drawLabels(),this.timers.ui+=e,this.timers.ui>.1&&(this.updateUI(n),this.timers.ui=0),this.started&&!this.paused&&(this.timers.save+=e,this.timers.save>20&&(this.save(),this.timers.save=0)),this.audio.update?.(e,{night:n.night,water:!!this.player.swimming,hunt:!!this.hunt,paused:this.paused||this.ui.isBlocking()}),this.renderer.render(this.scene,this.camera),this.input.endFrame()}updateLighting(t){const e=t.phase*Ud-Math.PI/2,n=t.daylight;this.sun.position.set(this.player.x+Math.cos(e)*35,this.player.y+Math.max(8,Math.sin(e)*45+12),this.player.z+25),this.sun.target.position.set(this.player.x,0,this.player.z),this.sun.intensity=.1+n*3,this.hemi.intensity=.5+n*1.3,this.moon.intensity=.65*(1-n),this.scene.environmentIntensity=.12+n*.48,this.sun.color.setHSL(.1,.3+.3*(1-n),.82),this.hemi.color.setRGB(.38+n*.39,.5+n*.37,.69+n*.25),this.scene.fog.color.setRGB(.04+n*.52,.095+n*.58,.16+n*.56),this.scene.background.copy(this.scene.fog.color),this.sky.material.uniforms.sunPosition.value.set(Math.cos(e)*80,Math.max(-6,Math.sin(e)*70+10),40),this.sky.material.uniforms.rayleigh.value=1.5+2*(1-n),this.sky.visible=n>.05,this.renderer.toneMappingExposure=.88+n*.18}updateCamera(t,e=!1){wu(this,t,e)}updatePlayer(t){const e=this.player;if(e.dead){this.deathTimer+=t,this.deathTimer>3&&this.respawn();return}for(const u of["attackCD","specialCD","invulnerable","stun","eatCD","roarCD","dodgeCD"])e[u]=Math.max(0,(e[u]||0)-t);if(e.grabbedBy){(this.input.hit("KeyQ")||this.input.hit("Space")||this.input.hit("KeyR"))&&(e.grabbedBy.rescueDamage+=13,this.audio.play?.("hit"));return}const n=(this.input.down("KeyD")?1:0)-(this.input.down("KeyA")?1:0),s=(this.input.down("KeyW")?1:0)-(this.input.down("KeyS")?1:0),r=Math.hypot(n,s),a=this.input.down("ShiftLeft")&&e.stamina>8&&r>0,o=!this.buildPlacement?.active&&this.input.right&&e.stamina>2;e.blocking=o;let l=(a?6.6:4.25)*(e.stomach<10?.78:1)*(e.swimming?.72:1)*(o?.55:1)*(e.stun>0?.1:1);const c=this.viewMode==="topdown"?0:this.cameraYaw,h=r?(Math.sin(c)*s-Math.cos(c)*n)/r:0,d=r?(Math.cos(c)*s+Math.sin(c)*n)/r:0;if(e.vx=_i.damp(e.vx,h*l,12,t),e.vz=_i.damp(e.vz,d*l,12,t),r&&(e.yaw=Ua(e.yaw,Math.atan2(h,d),t*14)),(o||this.input.left||this.viewMode==="first"||this.viewMode==="topdown")&&(e.yaw=Ua(e.yaw,this.aimYaw??this.cameraYaw,t*14)),this.input.hit("Space")&&e.grounded&&e.stamina>12&&(e.charge=0),e.charge>=0&&this.input.down("Space")&&(e.charge=Math.min(.65,e.charge+t)),this.input.up("Space")&&e.charge>=0&&(this.jump(e,8+e.charge*4),e.stamina-=12+e.charge*8,e.charge=-1),this.input.hit("KeyZ")&&e.dodgeCD===0&&e.stamina>=22&&(e.stamina-=22,e.dodgeCD=1.5,e.invulnerable=.42,e.vx=(h||Math.sin(this.cameraYaw))*11,e.vz=(d||Math.cos(this.cameraYaw))*11,this.jump(e,4.5),this.audio.play?.("jump")),this.moveActor(e,t),e.stamina=Bt(e.stamina+t*(a?-12:o?-3.5:15),0,100),e.stomach=Bt(e.stomach-t*(a?.14:.085),0,100),e.stomach<=0&&this.elapsed%2<t&&this.damage(e,2,null),this.buildPlacement?.active){this.input.hit("KeyQ")&&this.rotateBuildingPlacement(-1),this.input.hit("KeyR")&&this.rotateBuildingPlacement(1),this.input.hit("MouseLeft")&&this.confirmBuildingPlacement();return}this.aimTarget=this.findAim(),this.input.hit("MouseLeft")&&this.aimTarget?.kind==="actor"&&this.aimTarget.entity.team==="ally"?this.selectFrog(this.aimTarget.entity.id,this.input.down("ShiftLeft")):(this.input.left||this.input.hit("MouseLeft"))&&e.attackCD<=0&&this.aimTarget?.entity?.team!=="ally"&&this.primaryAttack(),this.input.hit("KeyQ")&&this.special(e),this.input.hit("KeyR")&&this.intimidate(e),this.input.hit("KeyE")&&this.interact(),this.input.hit("KeyF")&&this.gangCommand(this.command==="attack"?"follow":"attack"),this.input.hit("KeyT")&&this.gangCommand(this.command==="forage"?"follow":"forage"),this.input.hit("KeyX")&&this.gangCommand(this.command==="guard"?"follow":"guard"),this.input.hit("KeyV")&&this.openPanel("build"),this.input.hit("Tab")&&this.openPanel("roster"),this.input.hit("KeyG")&&this.consume();for(let u=0;u<3;u++)this.input.hit(`Digit${u+1}`)&&(this.specialIndex=u,this.ui.toast(`Ειδική κίνηση: ${["Εναέρια κλωτσιά","Βαριά προσγείωση","Χτύπημα γλώσσας"][u]}`))}jump(t,e=7){!t.grounded&&!t.swimming||(t.vy=e,t.grounded=!1,t.jumpTime=.8,this.world.splash(new ke(t.x,Math.max(0,t.y),t.z),.4),t===this.player&&this.audio.play?.("jump"))}moveActor(t,e){let n=Bt(t.x+t.vx*e,-107,107),s=Bt(t.z+t.vz*e,-107,107),r=this.world.getSurface(n,s),a=r.height;if(a>t.y+.65&&t.grounded&&(n=t.x,s=t.z,r=this.world.getSurface(n,s),a=r.height,t!==this.player&&this.jump(t,7.5)),t.x=n,t.z=s,t.speed=Math.hypot(t.vx,t.vz),t.swimming=r.type==="water",t.grounded)t.y>a+.2?(t.grounded=!1,t.vy=0):t.y=a+(t.swimming?Math.sin(this.elapsed*4+t.seed)*.025:0);else if(t.vy-=20*e,t.y+=t.vy*e,t.y<=a&&t.vy<=0){const o=Math.abs(t.vy);t.y=a,t.vy=0,t.grounded=!0,t.jumpTime=0,(t.swimming||r.type==="lily")&&this.world.splash(new ke(t.x,0,t.z),Math.min(1.2,o*.12)),t===this.player&&o>5&&this.audio.play?.("land")}t.jump=t.grounded?0:Bt(t.vy/10,-1,1),t.swimming&&t.speed>1&&Math.random()<e*3&&this.world.splash(new ke(t.x,0,t.z),.12)}findAim(){const t=this.player,e=this.aimRay||(this.aimRay=new Ic),n=new kt(this.viewMode==="topdown"&&this.input.ndc?.x||0,this.viewMode==="topdown"&&this.input.ndc?.y||0);e.near=0,e.far=1/0,e.setFromCamera(n,this.camera);const s=this.aimMeshCache||(this.aimMeshCache=new WeakMap),r=new ke,a=new ke,o=new ie,l=[],c=[];let h=null,d=1/0;for(const u of[...this.frogs,...this.predators]){if(u===t||u.dead||u.phase==="dormant"||!u.model?.mesh||u.model.group.visible===!1||Rt(u,t)>26+(u.model.stats?.length||2)*(u.scale||1))continue;let f=s.get(u.model);if(!f){const v=[];u.model.group.traverse(g=>{g.isMesh&&g.name!=="animated-color-silhouette"&&g.name!=="tongue"&&v.push(g)}),f={parts:v,bones:Object.values(u.model.bones||{}),bounds:new Zn},s.set(u.model,f)}u.model.group.updateMatrixWorld(!0),f.bounds.makeEmpty();for(const v of f.bones)f.bounds.expandByPoint(r.setFromMatrixPosition(v.matrixWorld));const p=u.model.mesh;f.bones.length||(p.geometry.boundingSphere||p.geometry.computeBoundingSphere(),f.bounds.copy(p.geometry.boundingSphere).applyMatrix4(p.matrixWorld)),f.bounds.radius+=p.matrixWorld.getMaxScaleOnAxis()*(u.type==="fish"?.75:u.type==="heron"?.7:u.type==="snake"?.35:.45),f.bounds.containsPoint(e.ray.origin)?l.push({f:u,shape:f,depth:0}):e.ray.intersectSphere(f.bounds,r)&&l.push({f:u,shape:f,depth:r.distanceTo(e.ray.origin)})}l.sort((u,f)=>u.depth-f.depth);for(const{f:u,shape:f,depth:p}of l){if(p>d)break;for(const v of f.parts)v.visible&&(v.isSkinnedMesh&&(v.boundingSphere||(v.boundingSphere=new Zn),v.boundingSphere.copy(f.bounds).applyMatrix4(o.copy(v.matrixWorld).invert()),v.boundingBox=null),c.length=0,e.far=d,e.intersectObject(v,!1,c),c[0]&&c[0].distance<d&&(d=c[0].distance,h={kind:"actor",entity:u,point:c[0].point.clone()}))}for(const u of this.world.hotspots){if(u.flies<1||Rt(u,t)>10)continue;r.set(u.x,(u.y||0)+1.2,u.z),e.ray.closestPointToPoint(r,a);const f=a.distanceTo(e.ray.origin);r.clone().sub(e.ray.origin).dot(e.ray.direction)>0&&a.distanceToSquared(r)<4&&f<d&&(d=f,h={kind:"flies",entity:u})}return h}gainXP(t){hl(this.player,t)&&(this.ui.toast(`Επίπεδο ${this.player.level} — περισσότερη ζωή!`,"success"),this.audio.play?.("levelup"));for(const n of this.allies())Rt(n,this.player)<24&&hl(n,t*.45)}power(t="ally"){return this.frogs.filter(e=>!e.dead&&!e.surrendered&&(t==="ally"?["ally","player"].includes(e.team):e.team===t)).reduce((e,n)=>e+(n.tier+.15*n.level)*(.35+.65*n.hp/n.maxHp),0)}damage(t,e,n,s={}){if(!t||t.dead)return;if(t.team==="predator"){Vx(this,t,e,n);return}if(!s.bypass&&n&&n!==t&&n.team!=="predator"&&!this.hostile(n,t)||t.surrendered&&n?.team!=="predator"&&!s.eaten&&!s.bypass||t.invulnerable>0&&!s.bypass)return;let r=e;t===this.player&&t.blocking&&t.stamina>5&&(r*=.35,t.stamina=Math.max(0,t.stamina-e*.5),this.audio.play?.("block"));const a=this.camps.find(o=>o.id===t.home);if(t.guard&&a?.buildings.watchtower&&(r*=.82),t.hp=Math.max(0,t.hp-r),t.hitAnim=.34,t.invulnerable=t===this.player?.38:.1,t.stun=t===this.player?.12:.18,t.morale=Math.max(0,t.morale-r*.48),n&&n!==t){const o=Math.max(.5,Rt(t,n));t.vx+=(t.x-n.x)/o*2.5,t.vz+=(t.z-n.z)/o*2.5}if(this.vfx.strike?.("impact",new ke(t.x,t.y+.5,t.z),n?Math.atan2(t.x-n.x,t.z-n.z):t.yaw,.55),Rt(t,this.player)<20&&this.audio.play?.("hit"),t===this.player&&(this.shake=.7),n&&n!==t&&!n.dead&&!t.surrendered&&t!==this.player&&(t.combatTarget=n,t.combatUntil=this.elapsed+16,t.brain=0,t.fear=0),t.hp<=0){if(t.team.startsWith("enemy")&&n?.team!=="predator"&&!s.eaten){t.hp=t.maxHp*.15,t.surrendered=!0,t.morale=0,t.guard=!1,t.surrenderTimer=80,t.model.setOutline(En.surrender,!0),this.targetCommand===t&&(this.targetCommand=null,this.command==="attack"&&(this.command="follow"));for(const o of this.frogs)o.intent?.target===t&&(o.intent=null,o.brain=0);(n?.team==="player"||n?.team==="ally")&&(this.stats.kills++,this.gainXP(24),this.resources.reeds+=5,this.ui.toast(`${t.name} παραδόθηκε. E για στρατολόγηση.`,"success"));return}t.dead=!0,t.deadTime=0,t.model.setOutline(En.enemy,!1),t===this.player?(this.buildPlacement&&Rr(this,{quiet:!0}),this.deathTimer=0,this.ui.toast("Έπεσες στη μάχη…","danger"),this.input.clear()):t.team==="ally"?(this.stats.losses++,this.ui.toast(`Χάθηκε ο ${t.name}.`,"danger")):(this.stats.kills++,(n?.team==="player"||n?.team==="ally")&&(this.gainXP(22),this.resources.food+=4,this.resources.reeds+=6))}}primaryAttack(){const t=this.player,e=this.aimTarget;if(e?.entity?.team==="ally"){this.selectFrog(e.entity.id,!1);return}if(t.stamina<3)return;t.attackCD=.43,t.attackAnim=.34,t.attackDuration=.34,t.attackType="tongue",this.audio.play?.("tongue");const n=this.aimYaw??this.cameraYaw;let s=new ke(t.x+Math.sin(n)*7,t.y+.7,t.z+Math.cos(n)*7);if(e?.kind==="actor"&&Rt(e.entity,t)<10){const r=e.entity;(this.hostile(t,r)||r.team==="predator")&&(e.point?s.copy(e.point):s.set(r.x,r.y+(r.type==="heron"?1.6:.55),r.z),this.damage(r,pr(14,t.tier,t.level),t),t.stamina=Math.max(0,t.stamina-5),this.hitPause=.035)}else if(e?.kind==="flies"){const r=e.entity,a=Ld(t,r);a.consumed?(this.resources.food+=a.food,this.creditGathering(a.food,0),this.stats.flies++,this.gainXP(4),s.set(r.x+(this.random()-.5),1.3+this.random(),r.z+(this.random()-.5)),this.audio.play?.("eat"),t.healingUntil=this.elapsed+1,this.ui.toast({id:"player-feed",icon:a.healed?"heal":"fly",value:a.healed?Math.round(a.healed):"+1",progress:t.hp/t.maxHp,tone:"success"})):a.reason==="full"&&(this.ui.toast({id:"stomach-full",icon:"stomach",progress:1,tone:"info",detail:"Γεμάτο στομάχι και ζωή. E για αποθέματα."}),t.attackCD=1)}else{const r=this.frogs.find(a=>this.hostile(t,a)&&Rt(a,t)<3.2&&Math.cos(Math.atan2(a.x-t.x,a.z-t.z)-n)>.3);if(r)s.set(r.x,r.y+.6,r.z),this.damage(r,pr(14,t.tier,t.level),t);else{const a=this.camps.find(o=>o.team.startsWith("enemy")&&!o.destroyed&&Rt(o,t)<13&&Math.cos(Math.atan2(o.x-t.x,o.z-t.z)-n)>.3);a&&(s.set(a.x,this.world.sampleHeight(a.x,a.z)+1,a.z),this.damageCamp(a,16,t),t.stamina=Math.max(0,t.stamina-3))}}this.vfx.tongue(t,s)}special(t){if(t.specialCD>0||t.dead||t.grabbedBy)return;if(t===this.player&&t.stamina<23){this.ui.toast("Χρειάζεσαι περισσότερη αντοχή.","warning");return}const e=t===this.player?["kick","slam","tongue"][this.specialIndex]:t.role==="bruiser"?"slam":t.role==="hunter"?"tongue":"kick";t.specialCD=e==="slam"?5.2:4,t.specialDuration=t.specialCD,t.attackAnim=.65,t.attackDuration=.65,t.attackType=e,t===this.player&&(t.stamina-=23);const n=t===this.player?this.aimYaw??this.cameraYaw:t.yaw;t.yaw=n;const s=e==="tongue"?8:e==="slam"?4.6:3.8;e==="kick"&&(this.jump(t,5.3),t.vx=Math.sin(n)*8,t.vz=Math.cos(n)*8),this.audio.play?.(e==="slam"?"slam":"hit"),this.vfx.strike?.(e,new ke(t.x,t.y+.35,t.z),n,e==="slam"?1.4:1),(t.swimming||this.world.getSurface(t.x,t.z).type==="lily")&&this.world.splash(new ke(t.x,0,t.z),e==="slam"?1.6:.6);for(const r of[...this.frogs,...this.predators]){if(r===t||r.dead||!this.hostile(t,r)&&r.team!=="predator"||Rt(t,r)>s)continue;const a=Math.cos(Math.atan2(r.x-t.x,r.z-t.z)-n);e!=="slam"&&a<-.1||this.damage(r,pr(e==="kick"?43:e==="slam"?33:29,t.tier,t.level),t)}for(const r of this.camps)!r.destroyed&&r.team!==t.team&&r.team!=="ally"&&Rt(t,r)<s+7&&this.damageCamp(r,e==="slam"?38:26,t);t===this.player&&(this.shake=.4,this.hitPause=.065)}intimidate(t){if(t.roarCD>0||t.dead||t===this.player&&t.stamina<18)return;t.roarCD=8,t.specialCD=Math.max(t.specialCD||0,5),t.roarAnim=1.25,t===this.player&&(t.stamina-=18),this.audio.play?.("croak"),this.vfx.strike?.("croak",new ke(t.x,t.y+.4,t.z),t.yaw,.6);const e=28+t.tier*7;for(const n of this.frogs)!this.hostile(t,n)||Rt(t,n)>9||(n.morale=Math.max(0,n.morale-e),t===this.player&&this.elapsed>=(n.fearReady||0)&&(n.fear=.85,n.fearReady=this.elapsed+9,n.fearFrom={x:t.x,z:t.z}),n.hp<n.maxHp*.42&&n.morale<20&&(n.surrendered=!0,n.guard=!1,n.model.setOutline(En.surrender,!0)));for(const n of this.predators)!n.dead&&Rt(t,n)<10&&n.phase!=="patrol"&&(n.rescueDamage+=20,t===this.player&&Gx(this,n,e));t===this.player&&this.ui.toast({icon:"roar",progress:1,tone:"success"})}context(){const t=this.player,e=this.frogs.filter(o=>o!==t&&!o.dead&&Rt(o,t)<4.5).sort((o,l)=>Rt(o,t)-Rt(l,t)),n=e.find(o=>o.team==="neutral"||o.surrendered);if(n){const o=Dd(n,this.camps.find(l=>l.id===n.home));return{type:"recruit",entity:n,cost:o.cost,progress:o.guaranteed?1:.5,hint:"E · Στρατολόγηση"}}const s=this.camps.filter(o=>Rt(o,t)<13).sort((o,l)=>Rt(o,t)-Rt(l,t))[0];if(s){if(s.destroyed)return{type:"loot",entity:s,hint:s.lootTaken?"V · Ξαναχτίσε αυτό το καταφύγιο":"E · Λεηλασία αποθεμάτων"};if(s.team.startsWith("enemy"))return{type:"persuade-camp",entity:s,hint:"E · Πείσε τη συμμορία · LMB / Q · Επίθεση στη βάση"};if(s.team==="ally")return{type:"home",entity:s,hint:"V · Κτίρια / επισκευή · G · Φαγητό · X · Φρουρά"}}const r=this.world.hotspots.filter(o=>Rt(o,t)<5).sort((o,l)=>Rt(o,t)-Rt(l,t))[0];if(r)return{type:"gather",entity:r,hint:"LMB · Φάε μύγες · E · Συλλογή τροφής και καλαμιών"};const a=e.find(o=>o.team==="ally");return a?{type:"ally",entity:a,hint:`E · ${a.guard?"Κάλεσε πίσω":"Όρισε φρουρό"} τον ${a.name} · Tab · Συμμορία`}:this.world.getSurface(t.x,t.z).type==="land"?{type:"reeds",hint:"E · Συλλογή καλαμιών · V · Νέο καταφύγιο"}:{type:"none",hint:"C · Κάμερα · LMB · Γλώσσα · Space · Άλμα · Q · Ειδική επίθεση"}}interact(){const t=this.context(),e=this.player;if(t.type==="recruit")return this.recruit(t.entity);if(t.type==="loot"){const n=t.entity;if(n.lootTaken){this.openPanel("build");return}this.resources.food+=Math.round(n.stock.food),this.resources.reeds+=Math.round(n.stock.reeds),n.stock={food:0,reeds:0},n.lootTaken=!0,this.world.updateShelter(n.mesh,{...n,storage:this.campStorage(n)}),this.gainXP(35),this.ui.toast("Τα αποθέματα της βάσης πέρασαν στη συμμορία σου.","success"),this.audio.play?.("eat");return}if(t.type==="persuade-camp")return this.persuadeCamp(t.entity);if(t.type==="home"){this.openPanel("build");return}if(t.type==="ally"){this.frogCommand(t.entity.id,t.entity.guard?"follow":"guard");return}if((t.type==="gather"||t.type==="reeds")&&e.eatCD<=0){e.eatCD=4;let n=0,s=3;if(t.entity){const r=Math.min(t.entity.flies,8);t.entity.flies-=r,n=Math.floor(r*.65),s=t.entity.rich?6:3}this.resources.food+=n,this.resources.reeds+=s,this.creditGathering(n,s),this.ui.toast(`Συλλογή: +${n} τροφή · +${s} καλάμια`,"food"),this.audio.play?.("eat"),this.vfx.number(new ke(e.x,e.y,e.z),`+${s}`,"#dfd3a6");return}t.type==="none"&&this.ui.toast("Πλησίασε βάτραχο, σμήνος, όχθη ή καταφύγιο για αλληλεπίδραση.")}recruit(t){const e=this.camps.find(r=>r.id===t.home),n=Dd(t,e);if(!n.eligible)return!1;if(!zi(this.resources,n.cost))return this.ui.toast({icon:"fly",value:n.cost.food,tone:"warning"}),!1;if(!n.guaranteed&&(t.persuadeCD||0)>this.elapsed)return!1;const s=n.guaranteed?1:Tx({allyPower:this.power(),enemyPower:this.power(t.team),hp:t.hp,maxHp:t.maxHp,morale:t.morale,campDestroyed:!!e?.destroyed,neutral:t.team==="neutral"});if(t.persuadeCD=this.elapsed+8,!n.guaranteed&&this.random()>s)return this.resources.food=Math.max(0,this.resources.food-2),this.ui.toast({icon:"recruit",progress:s,tone:"warning"}),!1;ki(this.resources,n.cost),t.team="ally",t.surrendered=!1,t.morale=100,t.fear=0,t.guard=!1,t.order="follow",t.home=this.ownedCamps()[0]?.id||null,t.hp=Math.max(t.hp,t.maxHp*.5),t.intent=null,t.brain=0,t.raidTarget=null,t.combatTarget=null,t.model.setOutline(En.ally,!0),this.stats.recruited++,this.gainXP(20),this.audio.play?.("recruit"),this.updateFrogPortrait?.(t,!0),this.ui.toast({icon:"recruit",portrait:this.portraits?.[t.id],value:1,tone:"success"}),this.targetCommand===t&&(this.targetCommand=null,this.command==="attack"&&(this.command="follow"));for(const r of this.frogs)r.intent?.target===t&&(r.intent=null,r.brain=0);return t.leader&&e&&!e.destroyed&&e.hp/e.maxHp<.5&&this.captureCamp(e),!0}persuadeCamp(t){if((t.persuadeCD||0)>this.elapsed){this.ui.toast("Η συμμορία δεν θέλει ακόμη να διαπραγματευτεί.");return}const e=this.power()/Math.max(.5,this.power(t.team)),n=1-t.hp/t.maxHp;if(e<1.35&&n<.5){this.ui.toast("Η αντίπαλη συμμορία αντιστέκεται. Χτύπησε τη βάση ή αύξησε τη δύναμή σου.","warning");return}if(!zi(this.resources,{food:12})){this.ui.toast("Χρειάζεσαι 12 τροφή για προσφορά συμμαχίας.","warning");return}t.persuadeCD=this.elapsed+15;const s=Bt(.15+e*.2+n*.5+(100-t.morale)*.002,.1,.97);Math.random()<s?(ki(this.resources,{food:12}),this.captureCamp(t)):(this.ui.toast("Η συμμαχία απορρίφθηκε. Η φθορά της βάσης αυξάνει τις πιθανότητες.","warning"),t.morale=Math.max(0,t.morale-12))}captureCamp(t){if(!t||t.team==="ally")return;const e=t.team;t.team="ally",t.destroyed=!1,t.hp=Math.max(t.hp,t.maxHp*.5),t.morale=100,this.stats.campsCaptured++,t.supplyMigrated=!1,ul(this.resources,t);let n=!1;for(const s of this.frogs)s.team===e&&!s.dead&&(s.team="ally",s.surrendered=!1,s.morale=100,s.home=t.id,s.guard=!n,n=!0,s.order=s.guard?"guard":"follow",s.raidTarget=null,s.combatTarget=null,s.intent=null,s.brain=0,s.model.setOutline(En.ally,!0),this.updateFrogPortrait?.(s,!0),this.stats.recruited++);(this.targetCommand===t||this.targetCommand?.model&&this.targetCommand.team==="ally")&&(this.targetCommand=null,this.command==="attack"&&(this.command="follow"));for(const s of this.frogs)(s.intent?.target===t||s.intent?.kind==="attack"&&s.intent.target?.team!=="predator"&&!this.hostile(s,s.intent.target))&&(s.intent=null,s.brain=0);this.world.updateShelter(t.mesh,{...t,storage:this.campStorage(t)}),this.gainXP(100),this.audio.play?.("recruit"),this.ui.toast({icon:"camp",value:1,progress:1,tone:"success"}),this.save()}damageCamp(t,e,n){if(!(!t||t.destroyed)&&!(n&&(n.dead||n.surrendered||(n.team==="player"?"ally":n.team)===(t.team==="player"?"ally":t.team)))&&(t.hp=Math.max(0,t.hp-e),t.morale=Math.max(0,t.morale-e*.14),this.vfx.strike?.("debris",new ke(t.x,this.world.sampleHeight(t.x,t.z)+1,t.z),n?.yaw||0,.6),(this.elapsed-(t.visualUpdate||0)>.4||t.hp===0)&&(t.visualUpdate=this.elapsed,this.world.updateShelter(t.mesh,{...t,storage:this.campStorage(t)})),t.hp<=0)){if(t.destroyed=!0,this.world.updateShelter(t.mesh,{...t,storage:this.campStorage(t)}),this.audio.play?.("slam"),t.team.startsWith("enemy")){(n?.team==="player"||n?.team==="ally")&&this.gainXP(120),this.ui.toast(`Καταστράφηκε το ${t.name}. E για λάφυρα — οι υπερασπιστές μπορούν να στρατολογηθούν.`,"success");for(const s of this.frogs)s.home===t.id&&!s.dead&&(s.morale=0,s.guard=!1,s.surrendered=!0,s.intent=null,s.brain=0,s.model.setOutline(En.surrender,!0))}else this.ui.toast(`Το καταφύγιο ${t.name} έπεσε! Ξαναχτίζεται με V.`,"danger");(this.targetCommand===t||this.targetCommand?.model&&this.targetCommand.surrendered)&&(this.targetCommand=null,this.command==="attack"&&(this.command="follow"));for(const s of this.frogs)(s.intent?.target===t||s.intent?.kind==="attack"&&s.intent.target?.surrendered)&&(s.intent=null,s.brain=0);this.save()}}updateFrogs(t){const e=this.player,n=this.allies();for(const s of this.frogs){if(s===e)continue;if(s.dead){s.deadTime=(s.deadTime||0)+t;continue}for(const u of["attackCD","specialCD","roarCD","invulnerable","stun","eatCD","fear"])s[u]=Math.max(0,(s[u]||0)-t);if(s.stomach=Bt(s.stomach-t*.055,0,100),s.trainingPaid&&!this.camps.some(u=>u.id===s.trainingCamp&&u.team==="ally"&&!u.destroyed&&u.buildings.training)&&this.cancelTraining(s),s.grabbedBy)continue;if(s.surrendered){s.vx=_i.damp(s.vx,0,8,t),s.vz=_i.damp(s.vz,0,8,t),this.moveActor(s,t);continue}s.brain-=t,s.brain<=0&&(s.brain=Rt(s,e)>65?.65:.2,s.intent=this.thinkFrog(s,n));const r=s.intent;if(!r){s.vx=0,s.vz=0,this.moveActor(s,t);continue}const a=r.kind==="attack"&&(!r.target||r.target.dead||r.target.surrendered||r.target.phase==="dormant"||r.target.team!=="predator"&&!this.hostile(s,r.target)),o=r.kind==="camp-attack"&&(!r.target||r.target.destroyed||r.target.team==="neutral"||(s.team==="player"?"ally":s.team)===(r.target.team==="player"?"ally":r.target.team));if(a||o){s.intent=null,s.brain=0,s.vx=0,s.vz=0,this.moveActor(s,t);continue}const l=r.target,c=Rt(s,l);let h=(s.role==="scout"?4.6:3.7)*(s.stomach<10?.75:1);const d=r.kind==="attack"?l.team==="predator"?2.8:s.role==="hunter"?5:1.6:r.kind==="camp-attack"?10.5:r.kind==="eat"?2:1.3;if(c>d){const u=(l.x-s.x)/Math.max(c,.01),f=(l.z-s.z)/Math.max(c,.01);let p=0,v=0;for(const g of this.frogs){if(g===s||g.dead)continue;const m=Rt(s,g);m<1.15&&m>.01&&(p+=(s.x-g.x)/m*(1.15-m),v+=(s.z-g.z)/m*(1.15-m))}s.vx=u*h+p*2,s.vz=f*h+v*2,s.yaw=Ua(s.yaw,Math.atan2(s.vx,s.vz),t*10),s.grounded&&!s.swimming&&c>3&&(this.elapsed+s.thinkOffset)%1.5<t&&this.jump(s,6.4)}else{if(s.vx=_i.damp(s.vx,0,10,t),s.vz=_i.damp(s.vz,0,10,t),c>.1&&(s.yaw=Ua(s.yaw,Math.atan2(l.x-s.x,l.z-s.z),t*10)),r.kind==="attack"&&!l.dead&&s.attackCD<=0&&(s.attackCD=1.15+this.random()*.35,s.attackAnim=.4,s.attackDuration=.4,s.attackType=s.role==="hunter"?"tongue":"kick",this.damage(l,pr(s.role==="bruiser"?14:10,s.tier,s.level),s),s.role==="hunter"&&this.vfx.tongue(s,new ke(l.x,l.y+.6,l.z)),s.specialCD<=0&&(s.role==="caller"?this.intimidate(s):c<4&&this.special(s))),r.kind==="camp-attack"&&s.attackCD<=0&&!l.destroyed&&(s.attackCD=1.4,s.attackAnim=.4,s.attackDuration=.4,s.attackType="kick",this.damageCamp(l,pr(10,s.tier,s.level),s),s.raidTarget&&l.team==="ally"&&!this.frogs.some(u=>u.team==="ally"&&u.guard&&u.home===l.id&&!u.dead&&Rt(u,l)<14))){const u=Math.min(3,this.resources.food);this.resources.food-=u,s.loot=(s.loot||0)+u,s.loot>=9&&(s.raidTarget=null,s.intent=null,this.ui.toast("Επιδρομείς έκλεψαν τρόφιμα από αφύλακτη βάση!","danger"))}if(r.kind==="eat"&&s.eatCD<=0){const u=Ld(s,l);u.consumed&&(s.attackAnim=.3,s.attackDuration=.3,s.attackType="tongue",s.healingUntil=this.elapsed+1,Rt(s,e)<30&&this.vfx.tongue(s,new ke(l.x,1.5,l.z)),s.team==="ally"&&(this.resources.food+=u.food,this.creditGathering(u.food,0),hl(s,3)))}r.kind==="train"&&this.updateTraining(s,r.camp,t)}s.stun>0&&(s.vx*=.2,s.vz*=.2),this.moveActor(s,t)}}thinkFrog(t,e){if(t.fear>0&&t.fearFrom){const c=Math.atan2(t.x-t.fearFrom.x,t.z-t.fearFrom.z);return{kind:"move",target:{x:t.x+Math.sin(c)*4,z:t.z+Math.cos(c)*4}}}const n=t.team==="ally",s=this.camps.find(c=>c.id===t.home&&!c.destroyed),r=t.order||(t.guard?"guard":"follow");if(t.team==="neutral")return{kind:"move",target:{x:t.x+Math.sin(this.elapsed*.15+t.seed)*.2,z:t.z+Math.cos(this.elapsed*.15+t.seed)*.2}};const a=this.predators.filter(c=>!c.dead&&!["patrol","dormant","dead"].includes(c.phase)&&Rt(c,t)<(n?20:12)&&(!c.target||c.target.team===t.team||c.target===this.player)).sort((c,h)=>Rt(c,t)-Rt(h,t))[0];if(a)return{kind:"attack",target:a};if(t.combatTarget&&!t.combatTarget.dead&&(t.combatUntil||0)>this.elapsed&&Rt(t,t.combatTarget)<32&&(t.combatTarget.team==="predator"||this.hostile(t,t.combatTarget)))return{kind:"attack",target:t.combatTarget};const o=this.frogs.filter(c=>this.hostile(t,c)&&Rt(c,t)<(t.guard?15:12)).sort((c,h)=>Rt(c,t)-Rt(h,t));if(o[0]&&(n||this.elapsed>this.graceUntil||o[0].team.startsWith("enemy")))return{kind:"attack",target:o[0]};if(n&&r==="training"){const c=this.camps.find(h=>h.id===t.trainingCamp&&h.team==="ally"&&!h.destroyed&&h.buildings?.training);if(!c)this.cancelTraining(t);else return{kind:"train",target:c.mesh?.userData?.trainingPoint||{x:c.x+5,z:c.z+3},camp:c}}if(n&&(r==="attack"||this.command==="attack")&&!t.guard){const c=t.orderTarget||this.targetCommand;if(c){if(c.model?!c.dead&&!c.surrendered&&c.phase!=="dormant"&&(c.team==="predator"||this.hostile(t,c)):!c.destroyed&&typeof c.team=="string"&&c.team.startsWith("enemy"))return{kind:c.model?"attack":"camp-attack",target:c};t.orderTarget=null,t.order="follow",this.targetCommand===c&&(this.targetCommand=null,this.command="follow")}}if(t.raidTarget){const c=this.camps.find(h=>h.id===t.raidTarget&&!h.destroyed);if(c)return{kind:"camp-attack",target:c};t.raidTarget=null}const l=n&&r==="forage";if(Ou(t)){const c=l?95:n?t.guard?16:10:24,h=this.world.hotspots.filter(d=>d.flies>=1&&Rt(d,t)<c&&(!t.guard||!s||Rt(d,s)<17)).sort((d,u)=>Rt(d,t)-Rt(u,t)-(d.rich?3:0)+(u.rich?3:0))[0];if(h&&(!n||l||Rt(h,this.player)<18||t.guard))return{kind:"eat",target:h}}else l&&(t.order=t.returnOrder==="guard"?"guard":"follow",t.guard=t.order==="guard");if(n&&!t.guard){const c=e.indexOf(t),h=Math.floor(c/4),d=this.player.yaw+Math.PI+(c%4-1.5)*.48;return{kind:"move",target:{x:this.player.x+Math.sin(d)*(3.2+h*1.8),z:this.player.z+Math.cos(d)*(3.2+h*1.8)}}}if(s){const c=this.elapsed*.08+t.seed*2.3;return{kind:"move",target:{x:s.x+Math.sin(c)*(t.guard?7:10),z:s.z+Math.cos(c)*(t.guard?7:10)}}}return null}campaignMetrics(){const t=this.ownedCamps(),e=this.allies();return{gatheredFood:this.stats.gatheredFood||0,gatheredReeds:this.stats.gatheredReeds||0,shelters:t.length,buildings:Object.fromEntries(["store","nursery","training","watchtower","palisade"].map(n=>[n,t.filter(s=>s.buildings?.[n]).length])),allies:e.length,trained:Math.max(this.stats.trained||0,e.filter(n=>n.trained).length),territories:this.camps.filter(n=>n.originalEnemy&&(n.destroyed||n.team==="ally")).length}}creditGathering(t=0,e=0){this.stats.gatheredFood=(this.stats.gatheredFood||0)+Math.max(0,t),this.stats.gatheredReeds=(this.stats.gatheredReeds||0)+Math.max(0,e),this.campaign&&(this.campaign=yx(this.campaign,t,e))}updateCampaign(t=!1){if(!this.campaign||!t&&this.elapsed<(this.campaignCheckAt||0))return;this.campaignCheckAt=this.elapsed+.25;const e=dc(this.campaign,this.campaignMetrics());this.campaign=e.state;for(const n of e.transitions)this.ui.toast({id:"chapter",icon:{hunters:"heron",preparation:"training",bosses:"crown",complete:"crown"}[n.to]||"camp",value:{hunters:"2/4",preparation:"3/4",bosses:"4/4",complete:"4/4"}[n.to],progress:1,tone:"success",detail:"Νέα φάση εκστρατείας"}),this.audio.play?.("levelup");this.syncCampaignPredators()}syncCampaignPredators(){if(!this.campaign)return;const t={heron:{x:34,z:14},snake:{x:-38,z:-22},fish:{x:12,z:48}};if(this.campaign.phase==="hunters")for(const e of["heron","snake","fish"])!this.campaign.defeated.includes(e)&&!this.predators.some(n=>n.type===e&&!n.boss&&!n.dead)&&this.spawnPredator({type:e,...t[e],campaignTracked:!0});if(this.campaign.phase==="bosses"){const e=Pu(this.campaign);e&&!this.predators.some(n=>n.type===e&&n.boss&&!n.dead)&&this.spawnPredator({type:e,...t[e],boss:!0,campaignTracked:!0})}}onPredatorDefeated(t){!t?.campaignTracked||t.campaignKillRecorded||!this.campaign||(t.campaignKillRecorded=!0,this.campaign=_x(this.campaign,t.type,{boss:!!t.boss}),this.updateCampaign(!0),this.save())}trainSquad(t){const e=this.ownedCamps().filter(r=>r.buildings?.training).sort((r,a)=>Rt(r,this.player)-Rt(a,this.player))[0];if(!e)return this.ui.toast({icon:"training",progress:0,tone:"warning",detail:"Χτίσε χώρο εκπαίδευσης."}),!1;const n=t.filter(r=>r.team==="ally"&&!r.trained&&!r.trainingPaid&&!r.dead&&!r.grabbedBy),s={food:n.length*$n.cost.food,reeds:n.length*$n.cost.reeds};if(!n.length||!zi(this.resources,s))return this.ui.toast({icon:"training",value:n.length,progress:Math.min(this.resources.food/Math.max(1,s.food),this.resources.reeds/Math.max(1,s.reeds)),tone:"warning",detail:"8 τροφή και 4 υλικά ανά βάτραχο."}),!1;ki(this.resources,s);for(const r of n)r.returnOrder=r.guard?"guard":"follow",r.guard=!1,r.order="training",r.trainingCamp=e.id,r.trainingPaid=!0,r.trainingProgress=0,r.intent=null,r.orderTarget=null,r.combatTarget=null,r.brain=0;return this.ui.toast({icon:"training",value:n.length,progress:0,tone:"success"}),this.save(),this.updateUI(rn(this.elapsed)),!0}cancelTraining(t){const e=!!t.trainingPaid;return e&&(this.resources.food+=$n.cost.food,this.resources.reeds+=$n.cost.reeds),t.trainingPaid=!1,t.trainingProgress=0,t.trainingCamp=null,t.order==="training"&&(t.order="follow",t.guard=!1),t.intent=null,t.brain=0,e}updateTraining(t,e,n){if(!t.trainingPaid||t.trained||t.dead)return;if(!e||e.destroyed||e.team!=="ally"||!e.buildings.training){this.cancelTraining(t);return}const s=e.mesh?.userData?.trainingPoint||{x:e.x+5,z:e.z+3};t.grabbedBy||Rt(t,s)>2||!this.campSafe(e)||(t.trainingProgress=Math.min($n.duration,(t.trainingProgress||0)+n),t.attackAnim=.25,t.attackDuration=.6,t.attackType="kick",t.trainingPulse=(t.trainingPulse||0)+n,t.trainingPulse>2&&(t.trainingPulse=0,this.vfx.strike?.("kick",new ke(t.x,t.y+.4,t.z),t.yaw,.4)),t.trainingProgress>=$n.duration&&Sx(t)&&(t.trainingPaid=!1,t.trainingProgress=0,t.trainingCamp=null,t.model.setTier(t.tier),t.order=t.returnOrder==="guard"?"guard":"follow",t.guard=t.order==="guard",t.home=e.id,t.intent=null,t.brain=0,this.stats.trained=(this.stats.trained||0)+1,this.updateFrogPortrait(t,!0),this.ui.toast({icon:"training",portrait:this.portraits?.[t.id],progress:1,value:t.tier,tone:"success"}),this.updateCampaign(!0),this.save()))}updatePredators(t){Wx(this,t)}updateEconomy(t){const e=rn(this.elapsed);for(const n of this.world.hotspots)n.flies=Math.min(n.maxFlies,n.flies+t*(n.rich?.55:.16)*(e.night?.65:1));for(const n of this.camps)if(!n.destroyed)if(n.spawnTimer=(n.spawnTimer||0)+t,n.team==="ally"){ul(this.resources,n);const s=this.campSafe(n);$x(this.resources,n,t,{safe:s});const r=this.frogs.filter(a=>!a.dead&&["player","ally"].includes(a.team)&&Rt(a,n)<14&&!a.grabbedBy);for(const a of r)Xx(a,t,{safe:s,store:!!n.buildings.store})&&(a.healingUntil=this.elapsed+1),s&&(a.morale=Math.min(100,a.morale+t*2));if(n.buildings.nursery&&s&&n.spawnTimer>=85&&this.allies().length<Ed(this.camps)&&zi(this.resources,{food:10,reeds:6})){ki(this.resources,{food:10,reeds:6}),n.spawnTimer=0;const a=this.spawnFrog({x:n.x+2,z:n.z,team:"ally",home:n.id,guard:!0,stomach:80});this.ui.toast({icon:"recruit",portrait:this.portraits?.[a.id],value:1,tone:"success"}),this.audio.play?.("recruit")}}else n.team.startsWith("enemy")&&(n.stock.food=Math.min(150,n.stock.food+t*.03),n.stock.reeds=Math.min(180,n.stock.reeds+t*.02),n.spawnTimer>110&&(n.spawnTimer=0,this.frogs.filter(r=>r.home===n.id&&r.team===n.team&&!r.dead&&!r.surrendered).length<4&&n.stock.food>=12&&this.frogs.filter(r=>!r.dead).length<100&&(n.stock.food-=12,this.spawnFrog({x:n.x+3,z:n.z,team:n.team,home:n.id,guard:!0,tier:n.tier,level:n.tier+1}))));this.elapsed>=this.nextRaid&&(this.nextRaid=this.elapsed+(e.night?85:140),this.launchRaid()),this.player.hp<25&&!this.lowHealthWarn&&(this.lowHealthWarn=!0,this.ui.toast({icon:"heal",progress:this.player.hp/this.player.maxHp,tone:"danger"})),this.player.hp>45&&(this.lowHealthWarn=!1)}campSafe(t){return!this.frogs.some(e=>e.team.startsWith("enemy")&&!e.dead&&!e.surrendered&&Rt(e,t)<18)&&!this.predators.some(e=>!e.dead&&Rt(e,t)<18&&!["patrol","dormant","dead"].includes(e.phase))}launchRaid(){const t=this.ownedCamps();if(!t.length)return;const e=this.camps.filter(a=>a.team.startsWith("enemy")&&!a.destroyed);if(!e.length)return;const n=t[Math.floor(this.random()*t.length)],s=e.sort((a,o)=>Rt(a,n)-Rt(o,n))[0],r=this.frogs.filter(a=>a.home===s.id&&a.team===s.team&&!a.dead&&!a.surrendered&&!a.grabbedBy).slice(-3);for(const a of r)a.raidTarget=n.id,a.guard=!1,a.intent=null,a.brain=0,a.loot=0;r.length&&(n.underRaid=!0,this.ui.toast(`${n.buildings.watchtower?"Η σκοπιά εντόπισε":"Πλησιάζει"} επιδρομή στο ${n.name}! Άφησε φρουρά ή γύρνα στη βάση.`,"warning"),this.audio.play?.("croak"))}nearestHome(t=14){return this.ownedCamps().filter(e=>Rt(e,this.player)<t).sort((e,n)=>Rt(e,this.player)-Rt(n,this.player))[0]||null}placement(){const t=this.player,e=this.camps.find(a=>a.destroyed&&Rt(a,t)<13);if(e)return{x:e.x,z:e.z,ruin:e};if(this.camps.some(a=>!a.destroyed&&Rt(a,t)<26))return null;const s=this.world.campSites.find(a=>Rt(a,t)<7&&!this.camps.some(o=>Rt(o,a)<26&&!o.destroyed));if(s)return{x:s.x,z:s.z};const r=this.world.getSurface(t.x,t.z);return r.type==="land"||r.type==="rock"&&r.platform?.radius>3.5?{x:t.x,z:t.z}:null}buildOptions(){const t=this.nearestHome(),e=this.placement();return[...Object.entries(zr).map(([n,s])=>{let r="";return n==="shelter"?e||(r="Πλησίασε ελεύθερη νησίδα, όχθη ή ερείπιο, μακριά από άλλη βάση."):t?n==="upgrade"&&t.tier>=3?r="Η βάση βρίσκεται ήδη στην ανώτερη βαθμίδα.":n==="repair"&&t.hp>=t.maxHp?r="Το καταφύγιο δεν έχει ζημιές.":!["upgrade","repair"].includes(n)&&t.buildings[n]&&(r="Το κτίριο υπάρχει ήδη."):r="Πλησίασε ενεργό φιλικό καταφύγιο.",{type:n,...s,enabled:!r,reason:r}}),{type:"promote-player",name:"Προαγωγή αρχηγού",description:`Βαθμίδα ${this.player.tier+1}: περισσότερη ζωή, ισχυρότερα χτυπήματα και εξοπλισμός από φύλλα. Απαιτεί επίπεδο ${this.player.tier*2}.`,cost:Ka(this.player),enabled:fc(this.player,this.resources),reason:this.player.tier>=3?"Ανώτερη βαθμίδα.":`Απαιτεί επίπεδο ${this.player.tier*2} και τους απαραίτητους πόρους.`}]}build(t){return mc.has(t)?this.beginBuildingPlacement(t):this.commitBuild(t)}buildDayState(){return rn(this.elapsed)}beginBuildingPlacement(t,e={}){return Kx(this,t,e)}updateBuildingPlacement(t){return mr(this,t)}rotateBuildingPlacement(t){const e=Jx(this,t);return this.updateUI(rn(this.elapsed)),e}confirmBuildingPlacement(){mr(this);const t=Id(this);return this.updateUI(rn(this.elapsed)),t}cancelBuildingPlacement(){const t=Rr(this);return this.updateUI(rn(this.elapsed)),t}commitBuild(t,e=null){if(this.lastBuildCommitted=!1,t==="promote-player"){Td(this.player,this.resources)&&(this.player.model.setTier(this.player.tier),this.updateFrogPortrait(this.player,!0),this.ui.toast(`Αρχηγός βαθμίδας ${this.player.tier}!`,"success"),this.audio.play?.("levelup"),this.save());return}const n=zr[t],s=e?{enabled:!0}:this.buildOptions().find(r=>r.type===t);if(!n||!s?.enabled){this.ui.toast(s?.reason||"Δεν μπορείς να χτίσεις εδώ.","warning");return}if(!zi(this.resources,n.cost)){this.ui.toast("Δεν αρκούν οι πόροι. Κυνήγησε ή λεηλάτησε εχθρικές αποθήκες.","warning");return}if(t==="shelter"){const r=e||this.placement();if(!r)return;ki(this.resources,n.cost);let a;r.ruin?(a=r.ruin,a.team="ally",a.destroyed=!1,a.hp=a.maxHp,a.stock={food:0,reeds:0},a.supplyMigrated=!0,a.buildings={},a.buildingPlacements={},a.yaw=r.yaw||0,this.world.updateShelter(a.mesh,{...a,storage:this.campStorage(a)})):a=this.addCamp({id:`camp-${++this.idCounter}`,x:r.x,z:r.z,yaw:r.yaw||0,name:`Φωλιά ${this.ownedCamps().length+1}`,team:"ally",hp:350,maxHp:350,tier:1,originalEnemy:!1,buildings:{}}),this.stats.campsBuilt++,this.gainXP(35);for(const o of this.allies())o.home||(o.home=a.id);this.ui.toast(`Χτίστηκε το ${a.name}. X για φρουρά, V για νέα κτίρια.`,"success")}else{const r=e?this.camps.find(a=>a.id===e.campId):this.nearestHome();if(!r||mc.has(t)&&(!e?.local||!kc(r,t,e.local).valid))return;ki(this.resources,n.cost),t==="upgrade"?(r.tier++,r.maxHp+=150,r.hp=Math.min(r.maxHp,r.hp+180)):t==="repair"?r.hp=Math.min(r.maxHp,r.hp+150):(r.buildings[t]=!0,e?.local&&(r.buildingPlacements??={},r.buildingPlacements[t]={...e.local}),t==="palisade"&&(r.maxHp+=180,r.hp+=180)),this.world.updateShelter(r.mesh,{...r,storage:this.campStorage(r)}),this.ui.toast(`${n.name}: ολοκληρώθηκε στο ${r.name}.`,"success")}return this.lastBuildCommitted=!0,this.audio.play?.("build"),this.vfx.strike?.("debris",new ke(this.player.x,this.player.y+.5,this.player.z),this.player.yaw,1),this.updateUI(rn(this.elapsed)),this.ui.renderPanel?.(!0),this.save(),!0}consume(){const t=this.nearestHome();if(!t){this.ui.toast("Πρέπει να βρίσκεσαι σε φιλικό καταφύγιο.","warning");return}const e=rn(this.elapsed).day;if(t.mealDay!==e&&(t.mealDay=e,t.mealCount=0),t.mealCount>=2){this.ui.toast("Οι δύο εφεδρικές μερίδες της ημέρας εξαντλήθηκαν. Βγες για κυνήγι.","warning");return}if(this.player.stomach>85){this.ui.toast("Δεν χρειάζεσαι ακόμη εφεδρικό γεύμα.");return}if(!ki(this.resources,{food:10})){this.ui.toast("Χρειάζονται 10 τροφή για μια εφεδρική μερίδα.","warning");return}Ex(this.player,25),t.mealCount++,this.audio.play?.("eat"),this.ui.toast("+25 στομάχι. Η εφεδρική τροφή είναι περιορισμένη.","food")}gangCommand(t,e=null){const n=e?new Set(e):null,s=this.command;let r=this.allies().filter(l=>n?n.has(l.id):t==="regroup"||t==="train"||!l.guard);if(!n&&s==="guard"&&t==="follow"){const l=this.nearestHome();l&&r.push(...this.allies().filter(c=>c.guard&&c.home===l.id&&Rt(c,l)<20)),r=[...new Set(r)]}if(t==="train")return this.trainSquad(r);let a=null,o=null;if(t==="guard"&&(a=this.nearestHome(18)||this.ownedCamps().sort((l,c)=>Rt(l,this.player)-Rt(c,this.player))[0],!a))return this.ui.toast({icon:"camp",progress:0,tone:"warning"}),!1;if(t==="attack"&&(o=this.aimTarget?.kind==="actor"?this.aimTarget.entity:null,(!o||!this.hostile(this.player,o)&&o.team!=="predator")&&(o=this.hunt&&!this.hunt.dead?this.hunt:this.camps.filter(l=>l.team.startsWith("enemy")&&!l.destroyed&&Rt(l,this.player)<38).sort((l,c)=>Rt(l,this.player)-Rt(c,this.player))[0]),!o))return this.ui.toast({icon:"attack",progress:0,tone:"warning"}),!1;n||(this.command=t==="regroup"?"follow":t,this.targetCommand=o);for(const l of r)l.trainingPaid&&this.cancelTraining(l),t==="forage"&&(l.returnOrder=l.guard?"guard":"follow"),l.order=t==="regroup"?"follow":t,l.guard=t==="guard",a&&(l.home=a.id),l.orderTarget=o,l.combatTarget=null,l.intent=null,l.brain=0;return this.ui.toast({icon:{guard:"shield",attack:"attack",forage:"forage",regroup:"regroup",follow:"follow"}[t]||"group",value:r.length,progress:1,tone:"success"}),this.audio.play?.("croak"),this.updateUI(rn(this.elapsed)),this.ui.renderPanel?.(!0),this.save(),!0}selectFrog(t,e=!1){const n=this.frogs.find(s=>s.id===String(t)&&s.team==="ally"&&!s.dead);n&&(this.selectedIds??=new Set,e||this.selectedIds.clear(),e&&this.selectedIds.has(n.id)?this.selectedIds.delete(n.id):this.selectedIds.add(n.id),this.updateUI(rn(this.elapsed)),this.ui.renderPanel?.(!0))}selectAll(t="all"){this.selectedIds=new Set(this.allies().filter(e=>t==="injured"?e.hp<e.maxHp*.9:t==="guards"?e.guard:t==="forage"?e.order==="forage":!0).map(e=>e.id)),this.updateUI(rn(this.elapsed)),this.ui.renderPanel?.(!0)}frogCommand(t,e){const n=this.frogs.find(s=>s.id===String(t)&&s.team==="ally"&&!s.dead);if(n)if(e==="promote"){if(!Td(n,this.resources)){this.ui.toast({icon:"crown",value:n.tier,tone:"warning"});return}n.model.setTier(n.tier),this.updateFrogPortrait(n,!0),this.audio.play?.("levelup"),this.ui.toast({icon:"crown",portrait:this.portraits?.[n.id],value:n.tier,tone:"success"}),this.updateUI(rn(this.elapsed)),this.ui.renderPanel?.(!0),this.save()}else this.gangCommand(e,[n.id])}toggleHUDControls(){return!this.started||this.paused||this.ended||this.ui.panel||this.buildPlacement?.active?!1:(this.ui.toggleHudDisclosure?.("actions"),!0)}openPanel(t){if(!this.buildPlacement?.active){if(this.ui.panel===t){this.ui.closePanels(),this.paused=!1,this.input.lock();return}this.updateUI(rn(this.elapsed)),this.ui.showPanel(t),this.ignoreUnlockUntil=performance.now()+500,this.input.unlock()}}onAction(t,e={}){if(t==="hud-disclosure"){e.open&&(this.ignoreUnlockUntil=performance.now()+700,this.input.clear?.(),this.input.unlock?.());return}if(t==="begin-placement"){this.beginBuildingPlacement(e.type,{dragging:!!e.dragging});return}if(t==="move-placement"){mr(this,e);return}if(t==="drop-placement"){mr(this,{...e,dragging:!0}),Id(this),this.buildPlacement&&(this.buildPlacement.dragging=!1),this.updateUI(rn(this.elapsed));return}if(t==="end-placement-drag"){this.buildPlacement&&(this.buildPlacement.dragging=!1),this.updateUI(rn(this.elapsed));return}if(t==="rotate-placement"){this.rotateBuildingPlacement(e.direction);return}if(t==="confirm-placement"){this.confirmBuildingPlacement();return}if(t==="cancel-placement"){this.cancelBuildingPlacement();return}if(t==="build")this.build(e.type);else if(t==="frog-command")this.frogCommand(e.id,e.command);else if(t==="gang-command")this.gangCommand(e.command);else if(t==="selection-command")this.gangCommand(e.command,[...this.selectedIds||[]]);else if(t==="select-frog")this.selectFrog(e.id,e.additive);else if(t==="select-all")this.selectAll(e.filter);else if(t==="special-select")this.specialIndex=e.index,this.updateUI(rn(this.elapsed));else if(t==="primary-attack")this.primaryAttack();else if(["special-attack","intimidate","dodge"].includes(t)&&this.player.grabbedBy)this.player.grabbedBy.rescueDamage+=13,this.audio.play?.("hit");else if(t==="special-attack")this.special(this.player);else if(t==="intimidate")this.intimidate(this.player);else if(t==="dodge"){const n=this.player;(n.dodgeCD||0)<=0&&n.stamina>=22&&(n.stamina-=22,n.dodgeCD=1.5,n.invulnerable=.42,n.vx=Math.sin(n.yaw)*11,n.vz=Math.cos(n.yaw)*11,this.jump(n,4.5),this.audio.play?.("jump"))}else t==="interact"||t==="recruit"?this.interact():t==="consume"?this.consume():t==="save"?(this.save(),this.ui.toast({icon:"check",progress:1,tone:"success"})):t==="restart"?(this.ui.hideMenus(),this.start("new")):t==="pause"?this.pause():t==="panel-open"?this.openPanel(e.name):t==="cycle-view"&&bd(this)}objective(){if(this.hunt&&!this.hunt.dead)return Rd(this.hunt);if(!this.ownedCamps().length)return this.player.stomach<85?"Κυνήγησε μύγες, τάισε τη συμμορία και βρες μια ασφαλή νησίδα.":"Το στομάχι σου γέμισε. Πήγαινε στη νησίδα κοντά στην αρχή και πάτησε V για καταφύγιο.";const t=this.ownedCamps().find(n=>this.frogs.some(s=>s.raidTarget===n.id&&!s.dead&&!s.surrendered));if(t)return`Υπερασπίσου το ${t.name} από την επιδρομή.`;const e=this.camps.filter(n=>n.originalEnemy&&!n.destroyed&&n.team!=="ally").length;return e?`Ένωσε τον ποταμό: κατάστρεψε ή πείσε τις ${e} αντίπαλες συμμορίες.`:"Ο ποταμός είναι δικός σου. Εξερεύνησε, επέκτεινε και κράτησε τη συμμορία ασφαλή."}updateUI(t){const e=this.player,n=this.nearestHome(),s=this.allies(),r=this.camps.filter(f=>f.originalEnemy),a=r.filter(f=>f.destroyed||f.team==="ally").length,o=[...this.selectedIds||[]].filter(f=>s.some(p=>p.id===f)),l=this.hunt&&!this.hunt.dead?{...this.hunt,portrait:this.portraits?.[this.hunt.boss?"boss-"+this.hunt.type:this.hunt.type],objective:Rd(this.hunt)}:null,c=s.map(f=>({id:f.id,name:f.name,hp:f.hp,maxHp:f.maxHp,stomach:f.stomach,maxStomach:100,level:f.level,tier:f.tier,role:f.role,guard:f.guard,order:f.order||(f.guard?"guard":"follow"),selected:o.includes(f.id),portrait:this.portraits?.[f.id],home:f.home,healing:(f.healingUntil||0)>this.elapsed,trained:f.trained,trainingProgress:f.trainingPaid?(f.trainingProgress||0)/$n.duration:0,canTrain:bx(f,n,this.resources),canPromote:fc(f,this.resources),promoteCost:Ka(f),team:"ally",skinColor:f.skinColor})),h=this.context(),d={type:h.type,progress:h.progress??(h.type==="gather"?Math.min(1,(h.entity?.flies||0)/20):h.type==="home"?(n?.hp||1)/(n?.maxHp||1):1),portrait:h.entity?.model?this.portraits?.[h.entity.id]:null,cost:h.cost,actionLabel:h.type==="ally"?h.entity.guard?"Ακολούθησε":"Φρούρησε":h.type==="loot"&&h.entity.lootTaken?"Κατασκευές":void 0,actionIcon:h.type==="ally"?h.entity.guard?"follow":"shield":h.type==="loot"&&h.entity.lootTaken?"camp":void 0},u=this.placement();this.ui.update({player:{hp:e.hp,maxHp:e.maxHp,stamina:e.stamina,maxStamina:100,stomach:e.stomach,maxStomach:100,level:e.level,xp:e.xp,nextXp:uc(e.level),tier:e.tier,portrait:this.portraits?.[e.id],specialIndex:this.specialIndex,specialCD:e.specialCD,specialDuration:e.specialDuration||5.2,attackCD:e.attackCD,roarCD:e.roarCD,dodgeCD:e.dodgeCD},resources:this.resources,buildPlacement:this.buildPlacement?{active:!0,type:this.buildPlacement.type,valid:this.buildPlacement.valid,reason:this.buildPlacement.reason,yaw:this.buildPlacement.yaw,cost:this.buildPlacement.cost,dragging:this.buildPlacement.dragging}:null,allies:c,selectedIds:o,capacity:Ed(this.camps),recruitmentUnlimited:!0,camps:this.camps,predator:l,context:d,campaign:{...this.campaign,objectives:Cu(this.campaign,this.campaignMetrics())},training:$n,placement:{valid:!!u,x:u?.x,z:u?.z},objectiveVisual:{type:"conquer",current:a,total:r.length,progress:a/Math.max(1,r.length),targets:r.map(f=>({id:f.id,team:f.team==="ally"?"ally":f.team,done:f.destroyed||f.team==="ally"}))},objective:this.objective(),objectiveProgress:a+" / "+r.length,hint:h.hint,timeLabel:t.timeLabel,day:t.day,night:t.night,world:{radius:110,player:{x:e.x,z:e.z,yaw:e.yaw},platforms:this.world.platforms,hotspots:this.world.hotspots,camps:[...this.camps,...this.world.campSites.filter(f=>!this.camps.some(p=>Rt(p,f)<8)).map(f=>({...f,team:"neutral"}))],enemies:this.frogs.filter(f=>f.team.startsWith("enemy")&&!f.dead),allies:s,predators:this.predators.filter(f=>!f.dead&&f.phase!=="dormant").map(f=>({type:f.type,x:f.x,z:f.z,hp:f.hp,boss:f.boss,hunting:f===this.hunt}))},stats:this.stats,fps:Math.round(this.fps),paused:this.paused,inCamp:!!n,currentCamp:n,currentCampId:n?.id,campName:n?.name,buildOptions:this.buildOptions(),squadMode:this.command,gangCount:s.length+1,savedAt:this.savedAt,aiming:!!this.aimTarget,viewMode:this.viewMode,mouse:this.input.mouse,locationName:n?.name||"Ο Μεγάλος Ποταμός"})}updateModels(t){for(const e of this.frogs){e.attackAnim=Math.max(0,(e.attackAnim||0)-t),e.roarAnim=Math.max(0,(e.roarAnim||0)-t),e.hitAnim=Math.max(0,(e.hitAnim||0)-t),e.model.group.position.set(e.x,e.y,e.z),e.model.group.rotation.y=e.yaw;const n=Rt(e,this.player)<80;e.model.group.visible=n&&!(e===this.player&&this.hidePlayer)&&(!e.dead||(e.deadTime||0)<5),n&&(e.model.update(t,{time:this.elapsed+e.seed*.31,speed:this.paused?0:e.speed,swimming:e.swimming,jump:e.grounded?0:Bt(.5+e.vy/20,0,1),attack:e.attackAnim>0?{type:e.attackType||"tongue",phase:1-e.attackAnim/(e.attackDuration||.4)}:0,roar:e.roarAnim/1.25,hit:e.hitAnim/.34,dead:e.dead}),e.surrendered?e.model.setOutline(En.surrender,!0):e.model.setOutline(this.selectedIds?.has(e.id)?15137209:En[e.team]||En.enemy,!0))}for(const e of this.predators)e.attackAnim=Math.max(0,(e.attackAnim||0)-t),e.hitAnim=Math.max(0,(e.hitAnim||0)-t),e.model.group.position.set(e.x,e.y,e.z),e.model.group.rotation.y=e.yaw,e.model.group.visible=e.phase!=="dormant"&&Rt(e,this.player)<100&&(!e.dead||e.phaseTime<4),e.model.update(t,{time:this.elapsed,speed:e.phase==="patrol"?1:e.phase==="stalk"||e.phase==="flee"?e.speed:0,swimming:e.type==="fish",attack:e.attackAnim>0?{type:e.attackType||"lunge",phase:1-e.attackAnim/(e.attackDuration||.65)}:0,hit:e.hitAnim/.35,dead:e.dead});this.shake=Math.max(0,this.shake-t*1.8)}drawLabels(){const t=this.labelCtx,e=this.labels.width,n=this.labels.height;if(t.clearRect(0,0,e,n),!this.started||this.ui.isBlocking())return;const s=new ke;for(const r of this.frogs){if(r===this.player||r.dead||Rt(r,this.player)>26||(s.set(r.x,r.y+1.8,r.z).project(this.camera),s.z<0||s.z>1||Math.abs(s.x)>1.1||Math.abs(s.y)>1.1))continue;const a=(s.x*.5+.5)*e,o=(-s.y*.5+.5)*n,l=r.team==="ally"?58:52;this.selectedIds?.has(r.id)&&(t.fillStyle="#d9edaa",t.fillRect(a-l/2-3,o-28,l+6,3));const h=this.labelImage("emblem:"+r.team);h.complete&&h.naturalWidth&&t.drawImage(h,a-l/2-27,o-23,25,25);const d=r.surrendered?"recruit":r.trainingPaid?"training":r.guard?"shield":r.order==="forage"?"forage":r.order==="attack"?"attack":"follow",u=this.labelImage(d);u.complete&&u.naturalWidth&&t.drawImage(u,a-13,o-28,25,25),t.fillStyle="rgba(8,23,20,.85)",t.fillRect(a-l/2-1,o-1,l+2,7),t.fillStyle=r.surrendered?"#f0d18b":r.team==="ally"?"#87dba9":r.team==="neutral"?"#e0cd85":"#e58e78",t.fillRect(a-l/2,o,l*Bt(r.hp/r.maxHp,0,1),5),r.team==="ally"&&(t.fillStyle="rgba(8,23,20,.85)",t.fillRect(a-l/2-1,o+7,l+2,5),t.fillStyle="#d7cb8a",t.fillRect(a-l/2,o+8,l*Bt(r.stomach/100,0,1),3))}}labelImage(t){if(this.iconCache??=new Map,!this.iconCache.has(t)){const e=new Image,n=t.startsWith("emblem:")?ii(t.slice(7)):ht(t);e.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(n),this.iconCache.set(t,e)}return this.iconCache.get(t)}makePortraits(){const t={},n=new di(192,192),s=new Uint8Array(36864*4),r=document.createElement("canvas");r.width=192,r.height=192;const a=r.getContext("2d");for(const o of["frog","heron","snake","fish","boss-heron","boss-snake","boss-fish"]){const l=o.startsWith("boss-"),c=l?o.slice(5):o,h=new No;h.background=new Jt("#18332d"),h.environment=this.environment.texture,h.environmentIntensity=.5,h.add(new Wo(15005923,2702891,2.5));const d=new Ea(16772552,4);d.position.set(4,6,5),h.add(d);const u=Da(c,{color:c==="frog"?7447366:void 0,seed:l?827:21});u.setOutline(16777215,!1),h.add(u.group),u.update(0,{time:0,speed:0}),l&&u.group.traverse(x=>{x.isMesh&&x.material?.color&&x.name!=="animated-color-silhouette"&&(c==="heron"?x.material.color.set(9477544):x.material.color.multiplyScalar(.76))}),u.group.updateMatrixWorld(!0);const f=new Bn().setFromObject(u.group),p=f.getCenter(new ke),v=f.getSize(new ke),g=Math.max(v.x,v.y,v.z),m=new vn(36,1,.05,100);m.position.copy(p).add(new ke(g*.95,g*.47,g*1.6)),m.lookAt(p),m.updateMatrixWorld(!0),this.renderer.setRenderTarget(n),this.renderer.render(h,m),this.renderer.readRenderTargetPixels(n,0,0,192,192,s);const y=a.createImageData(192,192);for(let x=0;x<192;x++)y.data.set(s.subarray(x*192*4,(x+1)*192*4),(191-x)*192*4);a.putImageData(y,0,0),t[o]=r.toDataURL("image/png"),u.dispose?.()}this.renderer.setRenderTarget(null),n.dispose(),this.ui.setPortraits(t),this.portraits=t,this.portraitQueue=[this.player,...this.allies()]}updateFrogPortrait(t,e=!1){if(!t||!this.renderer||typeof document>"u")return;this.portraits??={},this.portraitCache??=new Map;const n=[t.id,t.role,t.tier,t.skinColor].join(":");if(e){this.portraitCache.delete(n),this.portraitQueue??=[],this.portraitQueue.includes(t)||this.portraitQueue.push(t);return}if(this.portraitCache.has(n)){this.portraits[t.id]=this.portraitCache.get(n);return}const s=160,r=new di(s,s),a=new Uint8Array(s*s*4),o=document.createElement("canvas");o.width=s,o.height=s;const l=new No;l.background=new Jt("#18332d"),l.environment=this.environment.texture,l.environmentIntensity=.55,l.add(new Wo(15005923,2702891,2.4));const c=new Ea(16772552,4);c.position.set(4,6,5),l.add(c);const h=Da("frog",{color:t.skinColor,role:t.role,tier:t.tier,seed:t.seed});h.setOutline(En.ally,!1),h.update(0,{time:0}),l.add(h.group),h.group.updateMatrixWorld(!0);const d=new Bn().setFromObject(h.group),u=d.getCenter(new ke),f=d.getSize(new ke),p=Math.max(f.x,f.y,f.z),v=new vn(34,1,.05,30);v.position.copy(u).add(new ke(p*(.52+t.seed%7*.05),p*.39,p*1.75)),v.lookAt(u),v.updateMatrixWorld(!0);const g=this.renderer.getRenderTarget();this.renderer.setRenderTarget(r),this.renderer.render(l,v),this.renderer.readRenderTargetPixels(r,0,0,s,s,a),this.renderer.setRenderTarget(g);const m=o.getContext("2d"),y=m.createImageData(s,s);for(let _=0;_<s;_++)y.data.set(a.subarray(_*s*4,(_+1)*s*4),(s-1-_)*s*4);m.putImageData(y,0,0);const x=o.toDataURL("image/png");this.portraitCache.set(n,x),this.portraits[t.id]=x,t===this.player&&(this.portraits.frog=x),this.ui.setPortraits?.(this.portraits),h.dispose(),r.dispose()}checkVictory(){!this.won&&this.campaign?.phase==="complete"&&(this.won=!0,this.paused=!0,this.ended=!0,this.input.unlock(),this.audio.play?.("victory"),this.ui.showEnding(!0,{...this.stats,days:rn(this.elapsed).day}),this.save())}respawn(){const t=this.ownedCamps()[0];if(!t){this.ended=!0,this.paused=!0,this.ui.showEnding(!1,{...this.stats,days:rn(this.elapsed).day}),this.input.unlock();return}const e=this.player;e.grabbedBy&&Wr(this,e.grabbedBy),e.dead=!1,e.hp=e.maxHp*.65,e.stomach=Math.max(e.stomach,35),e.stamina=100,e.x=t.x+3,e.z=t.z,e.y=this.world.sampleHeight(e.x,e.z),e.grounded=!0,e.vy=0,e.invulnerable=6,this.graceUntil=this.elapsed+20,this.resources.food=Math.floor(this.resources.food*.8),this.resources.reeds=Math.floor(this.resources.reeds*.85),this.hunt=null,this.deathTimer=0,e.model.setOutline(En.player,!0),this.ui.toast("Επέστρεψες στο καταφύγιο, με απώλεια μέρους των πόρων.","warning"),this.save()}readSave(){try{return Ax(JSON.parse(localStorage.getItem(wd)||"null"))}catch{return null}}save(){if(!this.started||this.player.dead)return!1;const t=n=>Object.fromEntries(Qx.map(s=>[s,n[s]])),e={version:Du,elapsed:this.elapsed,resources:{...this.resources},stats:{...this.stats},campaign:this.campaign,player:t(this.player),frogs:this.frogs.filter(n=>n!==this.player&&!n.dead).map(t),camps:this.camps.map(n=>({id:n.id,x:n.x,z:n.z,name:n.name,team:n.team,yaw:n.yaw||0,buildingPlacements:n.buildingPlacements||{},tier:n.tier,hp:n.hp,maxHp:n.maxHp,stock:n.stock,buildings:n.buildings,originalEnemy:n.originalEnemy,destroyed:n.destroyed,lootTaken:n.lootTaken,supplyMigrated:n.supplyMigrated,morale:n.morale,spawnTimer:n.spawnTimer,mealCount:n.mealCount,mealDay:n.mealDay})),hotspots:this.world.hotspots.map(n=>({id:n.id,flies:n.flies})),idCounter:this.idCounter,won:this.won};try{return localStorage.setItem(wd,JSON.stringify(e)),this.savedAt=Date.now(),!0}catch{return this.saveWarn||(this.ui.toast("Η αποθήκευση του browser είναι γεμάτη ή απενεργοποιημένη.","warning"),this.saveWarn=!0),!1}}inspect(){return{version:"1.1.0",started:this.started,paused:this.paused,ended:this.ended,view:this.viewMode,elapsed:Math.round(this.elapsed),player:{x:this.player.x,y:this.player.y,z:this.player.z,hp:this.player.hp,stomach:this.player.stomach,level:this.player.level,grounded:this.player.grounded,swimming:this.player.swimming},frogs:this.frogs.length,allies:this.allies().length,camps:this.camps.map(t=>({name:t.name,team:t.team,hp:t.hp,destroyed:t.destroyed})),predators:this.predators.map(t=>({type:t.type,phase:t.phase,hp:t.hp,x:t.x,z:t.z})),hunt:this.hunt?.type,resources:this.resources,objective:this.objective(),performance:{fps:Math.round(this.fps),drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures},rigs:this.frogs[0].model.stats}}}function Hc(i){if(console.error(i),document.getElementById("boot")){const e=document.getElementById("boot-error");e.textContent=`Δεν μπόρεσε να ξεκινήσει ο 3D κόσμος. Ενεργοποίησε το hardware acceleration στον browser και κάνε ανανέωση.
`+(i?.message||String(i))}}addEventListener("error",i=>Hc(i.error||i.message));addEventListener("unhandledrejection",i=>Hc(i.reason));requestAnimationFrame(()=>{try{window.frogGame=new ty}catch(i){Hc(i)}});
