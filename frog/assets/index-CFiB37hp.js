(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Yc="180",Of=0,Nh=1,Bf=2,vd=1,Hf=2,zi=3,Oi=0,In=1,Pe=2,os=0,vr=1,kh=2,Fh=3,Oh=4,Gf=5,As=100,Vf=101,Wf=102,Xf=103,qf=104,$f=200,Yf=201,Zf=202,jf=203,Jl=204,Ql=205,Kf=206,Jf=207,Qf=208,tp=209,ep=210,np=211,ip=212,sp=213,rp=214,tc=0,ec=1,nc=2,Sr=3,ic=4,sc=5,rc=6,oc=7,yd=0,op=1,ap=2,as=0,lp=1,cp=2,hp=3,_d=4,up=5,dp=6,fp=7,Bh="attached",pp="detached",Md=300,wr=301,Er=302,ac=303,lc=304,Da=306,Tr=1e3,is=1001,cc=1002,Wn=1003,mp=1004,Ao=1005,oi=1006,Za=1007,ss=1008,xi=1009,bd=1010,Sd=1011,co=1012,Zc=1013,zs=1014,ai=1015,_o=1016,jc=1017,Kc=1018,ho=1020,wd=35902,Ed=35899,Td=1021,Ad=1022,Vn=1023,uo=1026,fo=1027,Jc=1028,Qc=1029,Rd=1030,th=1031,eh=1033,xa=33776,va=33777,ya=33778,_a=33779,hc=35840,uc=35841,dc=35842,fc=35843,pc=36196,mc=37492,gc=37496,xc=37808,vc=37809,yc=37810,_c=37811,Mc=37812,bc=37813,Sc=37814,wc=37815,Ec=37816,Tc=37817,Ac=37818,Rc=37819,Cc=37820,Pc=37821,zc=36492,Dc=36494,Ic=36495,Lc=36283,Uc=36284,Nc=36285,kc=36286,gp=3200,xp=3201,nh=0,vp=1,Di="",Un="srgb",Ar="srgb-linear",ba="linear",Ve="srgb",Xs=7680,Hh=519,yp=512,_p=513,Mp=514,Cd=515,bp=516,Sp=517,wp=518,Ep=519,Gh=35044,Ii=35048,Vh="300 es",mi=2e3,Sa=2001;class Pr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Wh=1234567;const eo=Math.PI/180,po=180/Math.PI;function Ls(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Sn[i&255]+Sn[i>>8&255]+Sn[i>>16&255]+Sn[i>>24&255]+"-"+Sn[t&255]+Sn[t>>8&255]+"-"+Sn[t>>16&15|64]+Sn[t>>24&255]+"-"+Sn[e&63|128]+Sn[e>>8&255]+"-"+Sn[e>>16&255]+Sn[e>>24&255]+Sn[n&255]+Sn[n>>8&255]+Sn[n>>16&255]+Sn[n>>24&255]).toLowerCase()}function Se(i,t,e){return Math.max(t,Math.min(e,i))}function ih(i,t){return(i%t+t)%t}function Tp(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Ap(i,t,e){return i!==t?(e-i)/(t-i):0}function no(i,t,e){return(1-e)*i+e*t}function Rp(i,t,e,n){return no(i,t,1-Math.exp(-e*n))}function Cp(i,t=1){return t-Math.abs(ih(i,t*2)-t)}function Pp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function zp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Dp(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Ip(i,t){return i+Math.random()*(t-i)}function Lp(i){return i*(.5-Math.random())}function Up(i){i!==void 0&&(Wh=i);let t=Wh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Np(i){return i*eo}function kp(i){return i*po}function Fp(i){return(i&i-1)===0&&i!==0}function Op(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Bp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Hp(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*m,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*m,a*c);break;case"ZYZ":i.set(l*m,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ur(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Rn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Fc={DEG2RAD:eo,RAD2DEG:po,generateUUID:Ls,clamp:Se,euclideanModulo:ih,mapLinear:Tp,inverseLerp:Ap,lerp:no,damp:Rp,pingpong:Cp,smoothstep:Pp,smootherstep:zp,randInt:Dp,randFloat:Ip,randFloatSpread:Lp,seededRandom:Up,degToRad:Np,radToDeg:kp,isPowerOfTwo:Fp,ceilPowerOfTwo:Op,floorPowerOfTwo:Bp,setQuaternionFromProperEuler:Hp,normalize:Rn,denormalize:ur};class Wt{constructor(t=0,e=0){Wt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Se(this.x,t.x,e.x),this.y=Se(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Se(this.x,t,e),this.y=Se(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ls{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],m=r[o+2],g=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=g;return}if(u!==g||l!==d||c!==f||h!==m){let x=1-a;const p=l*d+c*f+h*m+u*g,v=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const T=Math.sqrt(y),A=Math.atan2(T,p*v);x=Math.sin(x*A)/T,a=Math.sin(a*A)/T}const _=a*v;if(l=l*x+d*_,c=c*x+f*_,h=h*x+m*_,u=u*x+g*_,x===1-a){const T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+h*u+l*f-c*d,t[e+1]=l*m+h*d+c*u-a*f,t[e+2]=c*m+h*f+a*d-l*u,t[e+3]=h*m-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Se(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Se(this.x,t.x,e.x),this.y=Se(this.y,t.y,e.y),this.z=Se(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Se(this.x,t,e),this.y=Se(this.y,t,e),this.z=Se(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ja.copy(this).projectOnVector(t),this.sub(ja)}reflect(t){return this.sub(ja.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ja=new L,Xh=new ls;class xe{constructor(t,e,n,s,r,o,a,l,c){xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],g=s[0],x=s[3],p=s[6],v=s[1],y=s[4],_=s[7],T=s[2],A=s[5],E=s[8];return r[0]=o*g+a*v+l*T,r[3]=o*x+a*y+l*A,r[6]=o*p+a*_+l*E,r[1]=c*g+h*v+u*T,r[4]=c*x+h*y+u*A,r[7]=c*p+h*_+u*E,r[2]=d*g+f*v+m*T,r[5]=d*x+f*y+m*A,r[8]=d*p+f*_+m*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,m=e*u+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/m;return t[0]=u*g,t[1]=(s*c-h*n)*g,t[2]=(a*n-s*o)*g,t[3]=d*g,t[4]=(h*e-s*l)*g,t[5]=(s*r-a*e)*g,t[6]=f*g,t[7]=(n*l-c*e)*g,t[8]=(o*e-n*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ka.makeScale(t,e)),this}rotate(t){return this.premultiply(Ka.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ka.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ka=new xe;function Pd(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function wa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Gp(){const i=wa("canvas");return i.style.display="block",i}const qh={};function mo(i){i in qh||(qh[i]=!0,console.warn(i))}function Vp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const $h=new xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yh=new xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Wp(){const i={enabled:!0,workingColorSpace:Ar,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ve&&(s.r=ki(s.r),s.g=ki(s.g),s.b=ki(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ve&&(s.r=yr(s.r),s.g=yr(s.g),s.b=yr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Di?ba:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return mo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return mo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ar]:{primaries:t,whitePoint:n,transfer:ba,toXYZ:$h,fromXYZ:Yh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Un},outputColorSpaceConfig:{drawingBufferColorSpace:Un}},[Un]:{primaries:t,whitePoint:n,transfer:Ve,toXYZ:$h,fromXYZ:Yh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Un}}}),i}const Ue=Wp();function ki(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function yr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let qs;class Xp{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{qs===void 0&&(qs=wa("canvas")),qs.width=t.width,qs.height=t.height;const s=qs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=qs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=wa("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ki(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ki(e[n]/255)*255):e[n]=ki(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let qp=0;class sh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qp++}),this.uuid=Ls(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ja(s[o].image)):r.push(Ja(s[o]))}else r=Ja(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ja(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Xp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let $p=0;const Qa=new L;class Tn extends Pr{constructor(t=Tn.DEFAULT_IMAGE,e=Tn.DEFAULT_MAPPING,n=is,s=is,r=oi,o=ss,a=Vn,l=xi,c=Tn.DEFAULT_ANISOTROPY,h=Di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$p++}),this.uuid=Ls(),this.name="",this.source=new sh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Wt(0,0),this.repeat=new Wt(1,1),this.center=new Wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Qa).x}get height(){return this.source.getSize(Qa).y}get depth(){return this.source.getSize(Qa).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Md)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Tr:t.x=t.x-Math.floor(t.x);break;case is:t.x=t.x<0?0:1;break;case cc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Tr:t.y=t.y-Math.floor(t.y);break;case is:t.y=t.y<0?0:1;break;case cc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Tn.DEFAULT_IMAGE=null;Tn.DEFAULT_MAPPING=Md;Tn.DEFAULT_ANISOTROPY=1;class Ie{constructor(t=0,e=0,n=0,s=1){Ie.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],g=l[2],x=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-g)<.01&&Math.abs(m-x)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+g)<.1&&Math.abs(m+x)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,_=(f+1)/2,T=(p+1)/2,A=(h+d)/4,E=(u+g)/4,R=(m+x)/4;return y>_&&y>T?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=A/n,r=E/n):_>T?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=A/s,r=R/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=E/r,s=R/r),this.set(n,s,r,e),this}let v=Math.sqrt((x-m)*(x-m)+(u-g)*(u-g)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(x-m)/v,this.y=(u-g)/v,this.z=(d-h)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Se(this.x,t.x,e.x),this.y=Se(this.y,t.y,e.y),this.z=Se(this.z,t.z,e.z),this.w=Se(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Se(this.x,t,e),this.y=Se(this.y,t,e),this.z=Se(this.z,t,e),this.w=Se(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Yp extends Pr{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:oi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ie(0,0,t,e),this.scissorTest=!1,this.viewport=new Ie(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Tn(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:oi,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new sh(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cs extends Yp{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class zd extends Tn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Wn,this.minFilter=Wn,this.wrapR=is,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zp extends Tn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Wn,this.minFilter=Wn,this.wrapR=is,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jn{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ti.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ti.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ti.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ti):ti.fromBufferAttribute(r,o),ti.applyMatrix4(t.matrixWorld),this.expandByPoint(ti);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ro.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ro.copy(n.boundingBox)),Ro.applyMatrix4(t.matrixWorld),this.union(Ro)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ti),ti.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Hr),Co.subVectors(this.max,Hr),$s.subVectors(t.a,Hr),Ys.subVectors(t.b,Hr),Zs.subVectors(t.c,Hr),qi.subVectors(Ys,$s),$i.subVectors(Zs,Ys),vs.subVectors($s,Zs);let e=[0,-qi.z,qi.y,0,-$i.z,$i.y,0,-vs.z,vs.y,qi.z,0,-qi.x,$i.z,0,-$i.x,vs.z,0,-vs.x,-qi.y,qi.x,0,-$i.y,$i.x,0,-vs.y,vs.x,0];return!tl(e,$s,Ys,Zs,Co)||(e=[1,0,0,0,1,0,0,0,1],!tl(e,$s,Ys,Zs,Co))?!1:(Po.crossVectors(qi,$i),e=[Po.x,Po.y,Po.z],tl(e,$s,Ys,Zs,Co))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ti).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ti).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(wi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),wi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),wi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),wi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),wi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),wi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),wi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),wi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(wi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const wi=[new L,new L,new L,new L,new L,new L,new L,new L],ti=new L,Ro=new jn,$s=new L,Ys=new L,Zs=new L,qi=new L,$i=new L,vs=new L,Hr=new L,Co=new L,Po=new L,ys=new L;function tl(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ys.fromArray(i,r);const a=s.x*Math.abs(ys.x)+s.y*Math.abs(ys.y)+s.z*Math.abs(ys.z),l=t.dot(ys),c=e.dot(ys),h=n.dot(ys);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const jp=new jn,Gr=new L,el=new L;class Hi{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):jp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Gr.subVectors(t,this.center);const e=Gr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Gr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(el.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Gr.copy(t.center).add(el)),this.expandByPoint(Gr.copy(t.center).sub(el))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Ei=new L,nl=new L,zo=new L,Yi=new L,il=new L,Do=new L,sl=new L;class Ds{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ei)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ei.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ei.copy(this.origin).addScaledVector(this.direction,e),Ei.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){nl.copy(t).add(e).multiplyScalar(.5),zo.copy(e).sub(t).normalize(),Yi.copy(this.origin).sub(nl);const r=t.distanceTo(e)*.5,o=-this.direction.dot(zo),a=Yi.dot(this.direction),l=-Yi.dot(zo),c=Yi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,m;if(h>0)if(u=o*l-a,d=o*a-l,m=r*h,u>=0)if(d>=-m)if(d<=m){const g=1/h;u*=g,d*=g,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(nl).addScaledVector(zo,d),f}intersectSphere(t,e){Ei.subVectors(t.center,this.origin);const n=Ei.dot(this.direction),s=Ei.dot(Ei)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Ei)!==null}intersectTriangle(t,e,n,s,r){il.subVectors(e,t),Do.subVectors(n,t),sl.crossVectors(il,Do);let o=this.direction.dot(sl),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Yi.subVectors(this.origin,t);const l=a*this.direction.dot(Do.crossVectors(Yi,Do));if(l<0)return null;const c=a*this.direction.dot(il.cross(Yi));if(c<0||l+c>o)return null;const h=-a*Yi.dot(sl);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he{constructor(t,e,n,s,r,o,a,l,c,h,u,d,f,m,g,x){he.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,f,m,g,x)}set(t,e,n,s,r,o,a,l,c,h,u,d,f,m,g,x){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=g,p[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new he().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/js.setFromMatrixColumn(t,0).length(),r=1/js.setFromMatrixColumn(t,1).length(),o=1/js.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,m=a*h,g=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+m*c,e[5]=d-g*c,e[9]=-a*l,e[2]=g-d*c,e[6]=m+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,m=c*h,g=c*u;e[0]=d+g*a,e[4]=m*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=g+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,m=c*h,g=c*u;e[0]=d-g*a,e[4]=-o*u,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=g-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,f=o*u,m=a*h,g=a*u;e[0]=l*h,e[4]=m*c-f,e[8]=d*c+g,e[1]=l*u,e[5]=g*c+d,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,m=a*l,g=a*c;e[0]=l*h,e[4]=g-d*u,e[8]=m*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+m,e[10]=d-g*u}else if(t.order==="XZY"){const d=o*l,f=o*c,m=a*l,g=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+g,e[5]=o*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=a*h,e[10]=g*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Kp,t,Jp)}lookAt(t,e,n){const s=this.elements;return Bn.subVectors(t,e),Bn.lengthSq()===0&&(Bn.z=1),Bn.normalize(),Zi.crossVectors(n,Bn),Zi.lengthSq()===0&&(Math.abs(n.z)===1?Bn.x+=1e-4:Bn.z+=1e-4,Bn.normalize(),Zi.crossVectors(n,Bn)),Zi.normalize(),Io.crossVectors(Bn,Zi),s[0]=Zi.x,s[4]=Io.x,s[8]=Bn.x,s[1]=Zi.y,s[5]=Io.y,s[9]=Bn.y,s[2]=Zi.z,s[6]=Io.z,s[10]=Bn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],g=n[6],x=n[10],p=n[14],v=n[3],y=n[7],_=n[11],T=n[15],A=s[0],E=s[4],R=s[8],S=s[12],b=s[1],U=s[5],P=s[9],G=s[13],j=s[2],H=s[6],q=s[10],B=s[14],O=s[3],Q=s[7],W=s[11],ft=s[15];return r[0]=o*A+a*b+l*j+c*O,r[4]=o*E+a*U+l*H+c*Q,r[8]=o*R+a*P+l*q+c*W,r[12]=o*S+a*G+l*B+c*ft,r[1]=h*A+u*b+d*j+f*O,r[5]=h*E+u*U+d*H+f*Q,r[9]=h*R+u*P+d*q+f*W,r[13]=h*S+u*G+d*B+f*ft,r[2]=m*A+g*b+x*j+p*O,r[6]=m*E+g*U+x*H+p*Q,r[10]=m*R+g*P+x*q+p*W,r[14]=m*S+g*G+x*B+p*ft,r[3]=v*A+y*b+_*j+T*O,r[7]=v*E+y*U+_*H+T*Q,r[11]=v*R+y*P+_*q+T*W,r[15]=v*S+y*G+_*B+T*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],g=t[7],x=t[11],p=t[15];return m*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*f-n*l*f)+g*(+e*l*f-e*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+x*(+e*c*u-e*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-s*a*h-e*l*u+e*a*d+s*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],g=t[13],x=t[14],p=t[15],v=u*x*c-g*d*c+g*l*f-a*x*f-u*l*p+a*d*p,y=m*d*c-h*x*c-m*l*f+o*x*f+h*l*p-o*d*p,_=h*g*c-m*u*c+m*a*f-o*g*f-h*a*p+o*u*p,T=m*u*l-h*g*l-m*a*d+o*g*d+h*a*x-o*u*x,A=e*v+n*y+s*_+r*T;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/A;return t[0]=v*E,t[1]=(g*d*r-u*x*r-g*s*f+n*x*f+u*s*p-n*d*p)*E,t[2]=(a*x*r-g*l*r+g*s*c-n*x*c-a*s*p+n*l*p)*E,t[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*f-n*l*f)*E,t[4]=y*E,t[5]=(h*x*r-m*d*r+m*s*f-e*x*f-h*s*p+e*d*p)*E,t[6]=(m*l*r-o*x*r-m*s*c+e*x*c+o*s*p-e*l*p)*E,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*f+e*l*f)*E,t[8]=_*E,t[9]=(m*u*r-h*g*r-m*n*f+e*g*f+h*n*p-e*u*p)*E,t[10]=(o*g*r-m*a*r+m*n*c-e*g*c-o*n*p+e*a*p)*E,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*f-e*a*f)*E,t[12]=T*E,t[13]=(h*g*s-m*u*s+m*n*d-e*g*d-h*n*x+e*u*x)*E,t[14]=(m*a*s-o*g*s-m*n*l+e*g*l+o*n*x-e*a*x)*E,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*d+e*a*d)*E,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,m=r*u,g=o*h,x=o*u,p=a*u,v=l*c,y=l*h,_=l*u,T=n.x,A=n.y,E=n.z;return s[0]=(1-(g+p))*T,s[1]=(f+_)*T,s[2]=(m-y)*T,s[3]=0,s[4]=(f-_)*A,s[5]=(1-(d+p))*A,s[6]=(x+v)*A,s[7]=0,s[8]=(m+y)*E,s[9]=(x-v)*E,s[10]=(1-(d+g))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=js.set(s[0],s[1],s[2]).length();const o=js.set(s[4],s[5],s[6]).length(),a=js.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ei.copy(this);const c=1/r,h=1/o,u=1/a;return ei.elements[0]*=c,ei.elements[1]*=c,ei.elements[2]*=c,ei.elements[4]*=h,ei.elements[5]*=h,ei.elements[6]*=h,ei.elements[8]*=u,ei.elements[9]*=u,ei.elements[10]*=u,e.setFromRotationMatrix(ei),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=mi,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let m,g;if(l)m=r/(o-r),g=o*r/(o-r);else if(a===mi)m=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Sa)m=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=mi,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s);let m,g;if(l)m=1/(o-r),g=o/(o-r);else if(a===mi)m=-2/(o-r),g=-(o+r)/(o-r);else if(a===Sa)m=-1/(o-r),g=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const js=new L,ei=new he,Kp=new L(0,0,0),Jp=new L(1,1,1),Zi=new L,Io=new L,Bn=new L,Zh=new he,jh=new ls;class vi{constructor(t=0,e=0,n=0,s=vi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Se(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Se(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Se(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Se(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Se(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Se(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Zh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Zh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return jh.setFromEuler(this),this.setFromQuaternion(jh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vi.DEFAULT_ORDER="XYZ";class rh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Qp=0;const Kh=new L,Ks=new ls,Ti=new he,Lo=new L,Vr=new L,tm=new L,em=new ls,Jh=new L(1,0,0),Qh=new L(0,1,0),tu=new L(0,0,1),eu={type:"added"},nm={type:"removed"},Js={type:"childadded",child:null},rl={type:"childremoved",child:null};class Xe extends Pr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qp++}),this.uuid=Ls(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Xe.DEFAULT_UP.clone();const t=new L,e=new vi,n=new ls,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new xe}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=Xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ks.setFromAxisAngle(t,e),this.quaternion.multiply(Ks),this}rotateOnWorldAxis(t,e){return Ks.setFromAxisAngle(t,e),this.quaternion.premultiply(Ks),this}rotateX(t){return this.rotateOnAxis(Jh,t)}rotateY(t){return this.rotateOnAxis(Qh,t)}rotateZ(t){return this.rotateOnAxis(tu,t)}translateOnAxis(t,e){return Kh.copy(t).applyQuaternion(this.quaternion),this.position.add(Kh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Jh,t)}translateY(t){return this.translateOnAxis(Qh,t)}translateZ(t){return this.translateOnAxis(tu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Lo.copy(t):Lo.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(Vr,Lo,this.up):Ti.lookAt(Lo,Vr,this.up),this.quaternion.setFromRotationMatrix(Ti),s&&(Ti.extractRotation(s.matrixWorld),Ks.setFromRotationMatrix(Ti),this.quaternion.premultiply(Ks.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(eu),Js.child=t,this.dispatchEvent(Js),Js.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(nm),rl.child=t,this.dispatchEvent(rl),rl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ti.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ti),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(eu),Js.child=t,this.dispatchEvent(Js),Js.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,t,tm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,em,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Xe.DEFAULT_UP=new L(0,1,0);Xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ni=new L,Ai=new L,ol=new L,Ri=new L,Qs=new L,tr=new L,nu=new L,al=new L,ll=new L,cl=new L,hl=new Ie,ul=new Ie,dl=new Ie;class $n{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),ni.subVectors(t,e),s.cross(ni);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){ni.subVectors(s,e),Ai.subVectors(n,e),ol.subVectors(t,e);const o=ni.dot(ni),a=ni.dot(Ai),l=ni.dot(ol),c=Ai.dot(Ai),h=Ai.dot(ol),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,m=(o*h-a*l)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Ri)===null?!1:Ri.x>=0&&Ri.y>=0&&Ri.x+Ri.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Ri)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ri.x),l.addScaledVector(o,Ri.y),l.addScaledVector(a,Ri.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return hl.setScalar(0),ul.setScalar(0),dl.setScalar(0),hl.fromBufferAttribute(t,e),ul.fromBufferAttribute(t,n),dl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(hl,r.x),o.addScaledVector(ul,r.y),o.addScaledVector(dl,r.z),o}static isFrontFacing(t,e,n,s){return ni.subVectors(n,e),Ai.subVectors(t,e),ni.cross(Ai).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ni.subVectors(this.c,this.b),Ai.subVectors(this.a,this.b),ni.cross(Ai).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return $n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return $n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return $n.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return $n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return $n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Qs.subVectors(s,n),tr.subVectors(r,n),al.subVectors(t,n);const l=Qs.dot(al),c=tr.dot(al);if(l<=0&&c<=0)return e.copy(n);ll.subVectors(t,s);const h=Qs.dot(ll),u=tr.dot(ll);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Qs,o);cl.subVectors(t,r);const f=Qs.dot(cl),m=tr.dot(cl);if(m>=0&&f<=m)return e.copy(r);const g=f*c-l*m;if(g<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(tr,a);const x=h*m-f*u;if(x<=0&&u-h>=0&&f-m>=0)return nu.subVectors(r,s),a=(u-h)/(u-h+(f-m)),e.copy(s).addScaledVector(nu,a);const p=1/(x+g+d);return o=g*p,a=d*p,e.copy(n).addScaledVector(Qs,o).addScaledVector(tr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Dd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ji={h:0,s:0,l:0},Uo={h:0,s:0,l:0};function fl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class ee{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Un){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ue.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Ue.workingColorSpace){return this.r=t,this.g=e,this.b=n,Ue.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Ue.workingColorSpace){if(t=ih(t,1),e=Se(e,0,1),n=Se(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=fl(o,r,t+1/3),this.g=fl(o,r,t),this.b=fl(o,r,t-1/3)}return Ue.colorSpaceToWorking(this,s),this}setStyle(t,e=Un){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Un){const n=Dd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ki(t.r),this.g=ki(t.g),this.b=ki(t.b),this}copyLinearToSRGB(t){return this.r=yr(t.r),this.g=yr(t.g),this.b=yr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Un){return Ue.workingToColorSpace(wn.copy(this),t),Math.round(Se(wn.r*255,0,255))*65536+Math.round(Se(wn.g*255,0,255))*256+Math.round(Se(wn.b*255,0,255))}getHexString(t=Un){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Ue.workingColorSpace){Ue.workingToColorSpace(wn.copy(this),e);const n=wn.r,s=wn.g,r=wn.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Ue.workingColorSpace){return Ue.workingToColorSpace(wn.copy(this),e),t.r=wn.r,t.g=wn.g,t.b=wn.b,t}getStyle(t=Un){Ue.workingToColorSpace(wn.copy(this),t);const e=wn.r,n=wn.g,s=wn.b;return t!==Un?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ji),this.setHSL(ji.h+t,ji.s+e,ji.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ji),t.getHSL(Uo);const n=no(ji.h,Uo.h,e),s=no(ji.s,Uo.s,e),r=no(ji.l,Uo.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wn=new ee;ee.NAMES=Dd;let im=0;class ds extends Pr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=Ls(),this.name="",this.type="Material",this.blending=vr,this.side=Oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Jl,this.blendDst=Ql,this.blendEquation=As,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=Sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xs,this.stencilZFail=Xs,this.stencilZPass=Xs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==vr&&(n.blending=this.blending),this.side!==Oi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Jl&&(n.blendSrc=this.blendSrc),this.blendDst!==Ql&&(n.blendDst=this.blendDst),this.blendEquation!==As&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Sr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Xs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Xs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class _n extends ds{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vi,this.combine=yd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const rn=new L,No=new Wt;let sm=0;class un{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:sm++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Gh,this.updateRanges=[],this.gpuType=ai,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)No.fromBufferAttribute(this,e),No.applyMatrix3(t),this.setXY(e,No.x,No.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.applyMatrix3(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.applyMatrix4(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.applyNormalMatrix(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)rn.fromBufferAttribute(this,e),rn.transformDirection(t),this.setXYZ(e,rn.x,rn.y,rn.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ur(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Rn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ur(e,this.array)),e}setX(t,e){return this.normalized&&(e=Rn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ur(e,this.array)),e}setY(t,e){return this.normalized&&(e=Rn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ur(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Rn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ur(e,this.array)),e}setW(t,e){return this.normalized&&(e=Rn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Rn(e,this.array),n=Rn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Rn(e,this.array),n=Rn(n,this.array),s=Rn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Rn(e,this.array),n=Rn(n,this.array),s=Rn(s,this.array),r=Rn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Gh&&(t.usage=this.usage),t}}class oh extends un{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Id extends un{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Gt extends un{constructor(t,e,n){super(new Float32Array(t),e,n)}}let rm=0;const qn=new he,pl=new Xe,er=new L,Hn=new jn,Wr=new jn,mn=new L;class we extends Pr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rm++}),this.uuid=Ls(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Pd(t)?Id:oh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new xe().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return qn.makeRotationFromQuaternion(t),this.applyMatrix4(qn),this}rotateX(t){return qn.makeRotationX(t),this.applyMatrix4(qn),this}rotateY(t){return qn.makeRotationY(t),this.applyMatrix4(qn),this}rotateZ(t){return qn.makeRotationZ(t),this.applyMatrix4(qn),this}translate(t,e,n){return qn.makeTranslation(t,e,n),this.applyMatrix4(qn),this}scale(t,e,n){return qn.makeScale(t,e,n),this.applyMatrix4(qn),this}lookAt(t){return pl.lookAt(t),pl.updateMatrix(),this.applyMatrix4(pl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(er).negate(),this.translate(er.x,er.y,er.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Gt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new jn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Hn.setFromBufferAttribute(r),this.morphTargetsRelative?(mn.addVectors(this.boundingBox.min,Hn.min),this.boundingBox.expandByPoint(mn),mn.addVectors(this.boundingBox.max,Hn.max),this.boundingBox.expandByPoint(mn)):(this.boundingBox.expandByPoint(Hn.min),this.boundingBox.expandByPoint(Hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(Hn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Wr.setFromBufferAttribute(a),this.morphTargetsRelative?(mn.addVectors(Hn.min,Wr.min),Hn.expandByPoint(mn),mn.addVectors(Hn.max,Wr.max),Hn.expandByPoint(mn)):(Hn.expandByPoint(Wr.min),Hn.expandByPoint(Wr.max))}Hn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)mn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(mn));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)mn.fromBufferAttribute(a,c),l&&(er.fromBufferAttribute(t,c),mn.add(er)),s=Math.max(s,n.distanceToSquared(mn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new un(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new L,l[R]=new L;const c=new L,h=new L,u=new L,d=new Wt,f=new Wt,m=new Wt,g=new L,x=new L;function p(R,S,b){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,b),d.fromBufferAttribute(r,R),f.fromBufferAttribute(r,S),m.fromBufferAttribute(r,b),h.sub(c),u.sub(c),f.sub(d),m.sub(d);const U=1/(f.x*m.y-m.x*f.y);isFinite(U)&&(g.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(U),x.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(U),a[R].add(g),a[S].add(g),a[b].add(g),l[R].add(x),l[S].add(x),l[b].add(x))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let R=0,S=v.length;R<S;++R){const b=v[R],U=b.start,P=b.count;for(let G=U,j=U+P;G<j;G+=3)p(t.getX(G+0),t.getX(G+1),t.getX(G+2))}const y=new L,_=new L,T=new L,A=new L;function E(R){T.fromBufferAttribute(s,R),A.copy(T);const S=a[R];y.copy(S),y.sub(T.multiplyScalar(T.dot(S))).normalize(),_.crossVectors(A,S);const U=_.dot(l[R])<0?-1:1;o.setXYZW(R,y.x,y.y,y.z,U)}for(let R=0,S=v.length;R<S;++R){const b=v[R],U=b.start,P=b.count;for(let G=U,j=U+P;G<j;G+=3)E(t.getX(G+0)),E(t.getX(G+1)),E(t.getX(G+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new un(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,u=new L;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),g=t.getX(d+1),x=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,g),o.fromBufferAttribute(e,x),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(x,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)mn.fromBufferAttribute(t,e),mn.normalize(),t.setXYZ(e,mn.x,mn.y,mn.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,m=0;for(let g=0,x=l.length;g<x;g++){a.isInterleavedBufferAttribute?f=l[g]*a.data.stride+a.offset:f=l[g]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new un(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new we,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const iu=new he,_s=new Ds,ko=new Hi,su=new L,Fo=new L,Oo=new L,Bo=new L,ml=new L,Ho=new L,ru=new L,Go=new L;class Zt extends Xe{constructor(t=new we,e=new _n){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Ho.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(ml.fromBufferAttribute(u,t),o?Ho.addScaledVector(ml,h):Ho.addScaledVector(ml.sub(e),h))}e.add(Ho)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ko.copy(n.boundingSphere),ko.applyMatrix4(r),_s.copy(t.ray).recast(t.near),!(ko.containsPoint(_s.origin)===!1&&(_s.intersectSphere(ko,su)===null||_s.origin.distanceToSquared(su)>(t.far-t.near)**2))&&(iu.copy(r).invert(),_s.copy(t.ray).applyMatrix4(iu),!(n.boundingBox!==null&&_s.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,_s)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,g=d.length;m<g;m++){const x=d[m],p=o[x.materialIndex],v=Math.max(x.start,f.start),y=Math.min(a.count,Math.min(x.start+x.count,f.start+f.count));for(let _=v,T=y;_<T;_+=3){const A=a.getX(_),E=a.getX(_+1),R=a.getX(_+2);s=Vo(this,p,t,n,c,h,u,A,E,R),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=x.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),g=Math.min(a.count,f.start+f.count);for(let x=m,p=g;x<p;x+=3){const v=a.getX(x),y=a.getX(x+1),_=a.getX(x+2);s=Vo(this,o,t,n,c,h,u,v,y,_),s&&(s.faceIndex=Math.floor(x/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,g=d.length;m<g;m++){const x=d[m],p=o[x.materialIndex],v=Math.max(x.start,f.start),y=Math.min(l.count,Math.min(x.start+x.count,f.start+f.count));for(let _=v,T=y;_<T;_+=3){const A=_,E=_+1,R=_+2;s=Vo(this,p,t,n,c,h,u,A,E,R),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=x.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let x=m,p=g;x<p;x+=3){const v=x,y=x+1,_=x+2;s=Vo(this,o,t,n,c,h,u,v,y,_),s&&(s.faceIndex=Math.floor(x/3),e.push(s))}}}}function om(i,t,e,n,s,r,o,a){let l;if(t.side===In?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Oi,a),l===null)return null;Go.copy(a),Go.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Go);return c<e.near||c>e.far?null:{distance:c,point:Go.clone(),object:i}}function Vo(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Fo),i.getVertexPosition(l,Oo),i.getVertexPosition(c,Bo);const h=om(i,t,e,n,Fo,Oo,Bo,ru);if(h){const u=new L;$n.getBarycoord(ru,Fo,Oo,Bo,u),s&&(h.uv=$n.getInterpolatedAttribute(s,a,l,c,u,new Wt)),r&&(h.uv1=$n.getInterpolatedAttribute(r,a,l,c,u,new Wt)),o&&(h.normal=$n.getInterpolatedAttribute(o,a,l,c,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new L,materialIndex:0};$n.getNormal(Fo,Oo,Bo,d.normal),h.face=d,h.barycoord=u}return h}class Bi extends we{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Gt(c,3)),this.setAttribute("normal",new Gt(h,3)),this.setAttribute("uv",new Gt(u,2));function m(g,x,p,v,y,_,T,A,E,R,S){const b=_/E,U=T/R,P=_/2,G=T/2,j=A/2,H=E+1,q=R+1;let B=0,O=0;const Q=new L;for(let W=0;W<q;W++){const ft=W*U-G;for(let Vt=0;Vt<H;Vt++){const Me=Vt*b-P;Q[g]=Me*v,Q[x]=ft*y,Q[p]=j,c.push(Q.x,Q.y,Q.z),Q[g]=0,Q[x]=0,Q[p]=A>0?1:-1,h.push(Q.x,Q.y,Q.z),u.push(Vt/E),u.push(1-W/R),B+=1}}for(let W=0;W<R;W++)for(let ft=0;ft<E;ft++){const Vt=d+ft+H*W,Me=d+ft+H*(W+1),ce=d+(ft+1)+H*(W+1),ht=d+(ft+1)+H*W;l.push(Vt,Me,ht),l.push(Me,ce,ht),O+=6}a.addGroup(f,O,S),f+=O,d+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Rr(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Cn(i){const t={};for(let e=0;e<i.length;e++){const n=Rr(i[e]);for(const s in n)t[s]=n[s]}return t}function am(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Ld(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ue.workingColorSpace}const Ea={clone:Rr,merge:Cn};var lm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Kn extends ds{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lm,this.fragmentShader=cm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Rr(t.uniforms),this.uniformsGroups=am(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Ud extends Xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=mi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ki=new L,ou=new Wt,au=new Wt;class Nn extends Ud{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=po*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(eo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return po*2*Math.atan(Math.tan(eo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ki.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ki.x,Ki.y).multiplyScalar(-t/Ki.z),Ki.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ki.x,Ki.y).multiplyScalar(-t/Ki.z)}getViewSize(t,e){return this.getViewBounds(t,ou,au),e.subVectors(au,ou)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(eo*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const nr=-90,ir=1;class hm extends Xe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Nn(nr,ir,t,e);s.layers=this.layers,this.add(s);const r=new Nn(nr,ir,t,e);r.layers=this.layers,this.add(r);const o=new Nn(nr,ir,t,e);o.layers=this.layers,this.add(o);const a=new Nn(nr,ir,t,e);a.layers=this.layers,this.add(a);const l=new Nn(nr,ir,t,e);l.layers=this.layers,this.add(l);const c=new Nn(nr,ir,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===mi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Sa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Nd extends Tn{constructor(t=[],e=wr,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class um extends cs{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Nd(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Bi(5,5,5),r=new Kn({name:"CubemapFromEquirect",uniforms:Rr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:In,blending:os});r.uniforms.tEquirect.value=e;const o=new Zt(s,r),a=e.minFilter;return e.minFilter===ss&&(e.minFilter=oi),new hm(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class te extends Xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const dm={type:"move"};class gl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new te,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new te,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new te,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const g of t.hand.values()){const x=e.getJointPose(g,n),p=this._getHandJoint(c,g);x!==null&&(p.matrix.fromArray(x.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=x.radius),p.visible=x!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(dm)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new te;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Ia{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ee(t),this.density=e}clone(){return new Ia(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class fm extends Xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vi,this.environmentIntensity=1,this.environmentRotation=new vi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const lu=new L,cu=new Ie,hu=new Ie,pm=new L,uu=new he,Wo=new L,xl=new Hi,du=new he,vl=new Ds;class Xo extends Zt{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Bh,this.bindMatrix=new he,this.bindMatrixInverse=new he,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new jn),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Wo),this.boundingBox.expandByPoint(Wo)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Hi),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Wo),this.boundingSphere.expandByPoint(Wo)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xl.copy(this.boundingSphere),xl.applyMatrix4(s),t.ray.intersectsSphere(xl)!==!1&&(du.copy(s).invert(),vl.copy(t.ray).applyMatrix4(du),!(this.boundingBox!==null&&vl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,vl)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Ie,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Bh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===pp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,s=this.geometry;cu.fromBufferAttribute(s.attributes.skinIndex,t),hu.fromBufferAttribute(s.attributes.skinWeight,t),lu.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const o=hu.getComponent(r);if(o!==0){const a=cu.getComponent(r);uu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(pm.copy(lu).applyMatrix4(uu),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class kd extends Xe{constructor(){super(),this.isBone=!0,this.type="Bone"}}class ah extends Tn{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Wn,h=Wn,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const fu=new he,mm=new he;class lh{constructor(t=[],e=[]){this.uuid=Ls(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new he)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new he;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:mm;fu.multiplyMatrices(a,e[r]),fu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new lh(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new ah(e,t,t,Vn,ai);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){const r=t.bones[n];let o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new kd),this.bones.push(o),this.boneInverses.push(new he().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const o=e[s];t.bones.push(o.uuid);const a=n[s];t.boneInverses.push(a.toArray())}return t}}class fr extends un{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const sr=new he,pu=new he,qo=[],mu=new jn,gm=new he,Xr=new Zt,qr=new Hi;class En extends Zt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new fr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,gm)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new jn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,sr),mu.copy(t.boundingBox).applyMatrix4(sr),this.boundingBox.union(mu)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Hi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,sr),qr.copy(t.boundingSphere).applyMatrix4(sr),this.boundingSphere.union(qr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Xr.geometry=this.geometry,Xr.material=this.material,Xr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qr.copy(this.boundingSphere),qr.applyMatrix4(n),t.ray.intersectsSphere(qr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,sr),pu.multiplyMatrices(n,sr),Xr.matrixWorld=pu,Xr.raycast(t,qo);for(let o=0,a=qo.length;o<a;o++){const l=qo[o];l.instanceId=r,l.object=this,e.push(l)}qo.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new fr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new ah(new Float32Array(s*this.count),s,this.count,Jc,ai));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const yl=new L,xm=new L,vm=new xe;class fi{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=yl.subVectors(n,e).cross(xm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(yl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||vm.getNormalMatrix(t),s=this.coplanarPoint(yl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ms=new Hi,ym=new Wt(.5,.5),$o=new L;class ch{constructor(t=new fi,e=new fi,n=new fi,s=new fi,r=new fi,o=new fi){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=mi,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],g=r[9],x=r[10],p=r[11],v=r[12],y=r[13],_=r[14],T=r[15];if(s[0].setComponents(c-o,f-h,p-m,T-v).normalize(),s[1].setComponents(c+o,f+h,p+m,T+v).normalize(),s[2].setComponents(c+a,f+u,p+g,T+y).normalize(),s[3].setComponents(c-a,f-u,p-g,T-y).normalize(),n)s[4].setComponents(l,d,x,_).normalize(),s[5].setComponents(c-l,f-d,p-x,T-_).normalize();else if(s[4].setComponents(c-l,f-d,p-x,T-_).normalize(),e===mi)s[5].setComponents(c+l,f+d,p+x,T+_).normalize();else if(e===Sa)s[5].setComponents(l,d,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ms.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ms.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ms)}intersectsSprite(t){Ms.center.set(0,0,0);const e=ym.distanceTo(t.center);return Ms.radius=.7071067811865476+e,Ms.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ms)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if($o.x=s.normal.x>0?t.max.x:t.min.x,$o.y=s.normal.y>0?t.max.y:t.min.y,$o.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint($o)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class hh extends ds{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ta=new L,Aa=new L,gu=new he,$r=new Ds,Yo=new Hi,_l=new L,xu=new L;class go extends Xe{constructor(t=new we,e=new hh){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Ta.fromBufferAttribute(e,s-1),Aa.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Ta.distanceTo(Aa);t.setAttribute("lineDistance",new Gt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Yo.copy(n.boundingSphere),Yo.applyMatrix4(s),Yo.radius+=r,t.ray.intersectsSphere(Yo)===!1)return;gu.copy(s).invert(),$r.copy(t.ray).applyMatrix4(gu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let g=f,x=m-1;g<x;g+=c){const p=h.getX(g),v=h.getX(g+1),y=Zo(this,t,$r,l,p,v,g);y&&e.push(y)}if(this.isLineLoop){const g=h.getX(m-1),x=h.getX(f),p=Zo(this,t,$r,l,g,x,m-1);p&&e.push(p)}}else{const f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let g=f,x=m-1;g<x;g+=c){const p=Zo(this,t,$r,l,g,g+1,g);p&&e.push(p)}if(this.isLineLoop){const g=Zo(this,t,$r,l,m-1,f,m-1);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Zo(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(Ta.fromBufferAttribute(a,s),Aa.fromBufferAttribute(a,r),e.distanceSqToSegment(Ta,Aa,_l,xu)>n)return;_l.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(_l);if(!(c<t.near||c>t.far))return{distance:c,point:xu.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const vu=new L,yu=new L;class _m extends go{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)vu.fromBufferAttribute(e,s),yu.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+vu.distanceTo(yu);t.setAttribute("lineDistance",new Gt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Mm extends go{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class bm extends ds{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const _u=new he,Oc=new Ds,jo=new Hi,Ko=new L;class Sm extends Xe{constructor(t=new we,e=new bm){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),jo.copy(n.boundingSphere),jo.applyMatrix4(s),jo.radius+=r,t.ray.intersectsSphere(jo)===!1)return;_u.copy(s).invert(),Oc.copy(t.ray).applyMatrix4(_u);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let m=d,g=f;m<g;m++){const x=c.getX(m);Ko.fromBufferAttribute(u,x),Mu(Ko,x,l,s,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let m=d,g=f;m<g;m++)Ko.fromBufferAttribute(u,m),Mu(Ko,m,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Mu(i,t,e,n,s,r,o){const a=Oc.distanceSqToPoint(i);if(a<e){const l=new L;Oc.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Fd extends Tn{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Od extends Tn{constructor(t,e,n=zs,s,r,o,a=Wn,l=Wn,c,h=uo,u=1){if(h!==uo&&h!==fo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new sh(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Bd extends Tn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class La extends we{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new L,h=new Wt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Gt(o,3)),this.setAttribute("normal",new Gt(a,3)),this.setAttribute("uv",new Gt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new La(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Us extends we{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let m=0;const g=[],x=n/2;let p=0;v(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Gt(u,3)),this.setAttribute("normal",new Gt(d,3)),this.setAttribute("uv",new Gt(f,2));function v(){const _=new L,T=new L;let A=0;const E=(e-t)/n;for(let R=0;R<=r;R++){const S=[],b=R/r,U=b*(e-t)+t;for(let P=0;P<=s;P++){const G=P/s,j=G*l+a,H=Math.sin(j),q=Math.cos(j);T.x=U*H,T.y=-b*n+x,T.z=U*q,u.push(T.x,T.y,T.z),_.set(H,E,q).normalize(),d.push(_.x,_.y,_.z),f.push(G,1-b),S.push(m++)}g.push(S)}for(let R=0;R<s;R++)for(let S=0;S<r;S++){const b=g[S][R],U=g[S+1][R],P=g[S+1][R+1],G=g[S][R+1];(t>0||S!==0)&&(h.push(b,U,G),A+=3),(e>0||S!==r-1)&&(h.push(U,P,G),A+=3)}c.addGroup(p,A,0),p+=A}function y(_){const T=m,A=new Wt,E=new L;let R=0;const S=_===!0?t:e,b=_===!0?1:-1;for(let P=1;P<=s;P++)u.push(0,x*b,0),d.push(0,b,0),f.push(.5,.5),m++;const U=m;for(let P=0;P<=s;P++){const j=P/s*l+a,H=Math.cos(j),q=Math.sin(j);E.x=S*q,E.y=x*b,E.z=S*H,u.push(E.x,E.y,E.z),d.push(0,b,0),A.x=H*.5+.5,A.y=q*.5*b+.5,f.push(A.x,A.y),m++}for(let P=0;P<s;P++){const G=T+P,j=U+P;_===!0?h.push(j,j+1,G):h.push(j+1,j,G),R+=3}c.addGroup(p,R,_===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Us(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class uh extends Us{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new uh(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Mo extends we{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new Gt(r,3)),this.setAttribute("normal",new Gt(r.slice(),3)),this.setAttribute("uv",new Gt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const y=new L,_=new L,T=new L;for(let A=0;A<e.length;A+=3)f(e[A+0],y),f(e[A+1],_),f(e[A+2],T),l(y,_,T,v)}function l(v,y,_,T){const A=T+1,E=[];for(let R=0;R<=A;R++){E[R]=[];const S=v.clone().lerp(_,R/A),b=y.clone().lerp(_,R/A),U=A-R;for(let P=0;P<=U;P++)P===0&&R===A?E[R][P]=S:E[R][P]=S.clone().lerp(b,P/U)}for(let R=0;R<A;R++)for(let S=0;S<2*(A-R)-1;S++){const b=Math.floor(S/2);S%2===0?(d(E[R][b+1]),d(E[R+1][b]),d(E[R][b])):(d(E[R][b+1]),d(E[R+1][b+1]),d(E[R+1][b]))}}function c(v){const y=new L;for(let _=0;_<r.length;_+=3)y.x=r[_+0],y.y=r[_+1],y.z=r[_+2],y.normalize().multiplyScalar(v),r[_+0]=y.x,r[_+1]=y.y,r[_+2]=y.z}function h(){const v=new L;for(let y=0;y<r.length;y+=3){v.x=r[y+0],v.y=r[y+1],v.z=r[y+2];const _=x(v)/2/Math.PI+.5,T=p(v)/Math.PI+.5;o.push(_,1-T)}m(),u()}function u(){for(let v=0;v<o.length;v+=6){const y=o[v+0],_=o[v+2],T=o[v+4],A=Math.max(y,_,T),E=Math.min(y,_,T);A>.9&&E<.1&&(y<.2&&(o[v+0]+=1),_<.2&&(o[v+2]+=1),T<.2&&(o[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function f(v,y){const _=v*3;y.x=t[_+0],y.y=t[_+1],y.z=t[_+2]}function m(){const v=new L,y=new L,_=new L,T=new L,A=new Wt,E=new Wt,R=new Wt;for(let S=0,b=0;S<r.length;S+=9,b+=6){v.set(r[S+0],r[S+1],r[S+2]),y.set(r[S+3],r[S+4],r[S+5]),_.set(r[S+6],r[S+7],r[S+8]),A.set(o[b+0],o[b+1]),E.set(o[b+2],o[b+3]),R.set(o[b+4],o[b+5]),T.copy(v).add(y).add(_).divideScalar(3);const U=x(T);g(A,b+0,v,U),g(E,b+2,y,U),g(R,b+4,_,U)}}function g(v,y,_,T){T<0&&v.x===1&&(o[y]=v.x-1),_.x===0&&_.z===0&&(o[y]=T/2/Math.PI+.5)}function x(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mo(t.vertices,t.indices,t.radius,t.details)}}class Ua extends Mo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ua(t.radius,t.detail)}}class Gi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new Wt:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new L,s=[],r=[],o=[],a=new L,l=new he;for(let f=0;f<=t;f++){const m=f/t;s[f]=this.getTangentAt(m,new L)}r[0]=new L,o[0]=new L;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Se(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Se(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Hd extends Gi{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Wt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class wm extends Hd{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function dh(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Jo=new L,Ml=new dh,bl=new dh,Sl=new dh;class xo extends Gi{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Jo.subVectors(s[0],s[1]).add(s[0]),c=Jo);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Jo.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Jo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(h),f);g<1e-4&&(g=1),m<1e-4&&(m=g),x<1e-4&&(x=g),Ml.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,g,x),bl.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,g,x),Sl.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,g,x)}else this.curveType==="catmullrom"&&(Ml.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),bl.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Sl.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Ml.calc(l),bl.calc(l),Sl.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function bu(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function Em(i,t){const e=1-i;return e*e*t}function Tm(i,t){return 2*(1-i)*i*t}function Am(i,t){return i*i*t}function io(i,t,e,n){return Em(i,t)+Tm(i,e)+Am(i,n)}function Rm(i,t){const e=1-i;return e*e*e*t}function Cm(i,t){const e=1-i;return 3*e*e*i*t}function Pm(i,t){return 3*(1-i)*i*i*t}function zm(i,t){return i*i*i*t}function so(i,t,e,n,s){return Rm(i,t)+Cm(i,e)+Pm(i,n)+zm(i,s)}class Dm extends Gi{constructor(t=new Wt,e=new Wt,n=new Wt,s=new Wt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Wt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(so(t,s.x,r.x,o.x,a.x),so(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Im extends Gi{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(so(t,s.x,r.x,o.x,a.x),so(t,s.y,r.y,o.y,a.y),so(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Lm extends Gi{constructor(t=new Wt,e=new Wt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Wt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Wt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Um extends Gi{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nm extends Gi{constructor(t=new Wt,e=new Wt,n=new Wt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Wt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(io(t,s.x,r.x,o.x),io(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gd extends Gi{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(io(t,s.x,r.x,o.x),io(t,s.y,r.y,o.y),io(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class km extends Gi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Wt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(bu(a,l.x,c.x,h.x,u.x),bu(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Wt().fromArray(s))}return this}}var Fm=Object.freeze({__proto__:null,ArcCurve:wm,CatmullRomCurve3:xo,CubicBezierCurve:Dm,CubicBezierCurve3:Im,EllipseCurve:Hd,LineCurve:Lm,LineCurve3:Um,QuadraticBezierCurve:Nm,QuadraticBezierCurve3:Gd,SplineCurve:km});class fh extends Mo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new fh(t.radius,t.detail)}}class ph extends Mo{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ph(t.radius,t.detail)}}class Ui extends we{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,f=[],m=[],g=[],x=[];for(let p=0;p<h;p++){const v=p*d-o;for(let y=0;y<c;y++){const _=y*u-r;m.push(_,-v,0),g.push(0,0,1),x.push(y/a),x.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<a;v++){const y=v+c*p,_=v+c*(p+1),T=v+1+c*(p+1),A=v+1+c*p;f.push(y,_,A),f.push(_,T,A)}this.setIndex(f),this.setAttribute("position",new Gt(m,3)),this.setAttribute("normal",new Gt(g,3)),this.setAttribute("uv",new Gt(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ui(t.width,t.height,t.widthSegments,t.heightSegments)}}class rs extends we{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let u=t;const d=(e-t)/s,f=new L,m=new Wt;for(let g=0;g<=s;g++){for(let x=0;x<=n;x++){const p=r+x/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}u+=d}for(let g=0;g<s;g++){const x=g*(n+1);for(let p=0;p<n;p++){const v=p+x,y=v,_=v+n+1,T=v+n+2,A=v+1;a.push(y,_,A),a.push(_,T,A)}}this.setIndex(a),this.setAttribute("position",new Gt(l,3)),this.setAttribute("normal",new Gt(c,3)),this.setAttribute("uv",new Gt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rs(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Jn extends we{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new L,d=new L,f=[],m=[],g=[],x=[];for(let p=0;p<=n;p++){const v=[],y=p/n;let _=0;p===0&&o===0?_=.5/e:p===n&&l===Math.PI&&(_=-.5/e);for(let T=0;T<=e;T++){const A=T/e;u.x=-t*Math.cos(s+A*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+A*r)*Math.sin(o+y*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),g.push(d.x,d.y,d.z),x.push(A+_,1-y),v.push(c++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<e;v++){const y=h[p][v+1],_=h[p][v],T=h[p+1][v],A=h[p+1][v+1];(p!==0||o>0)&&f.push(y,_,A),(p!==n-1||l<Math.PI)&&f.push(_,T,A)}this.setIndex(f),this.setAttribute("position",new Gt(m,3)),this.setAttribute("normal",new Gt(g,3)),this.setAttribute("uv",new Gt(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class mh extends we{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new L,u=new L,d=new L;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const g=m/s*r,x=f/n*Math.PI*2;u.x=(t+e*Math.cos(x))*Math.cos(g),u.y=(t+e*Math.cos(x))*Math.sin(g),u.z=e*Math.sin(x),a.push(u.x,u.y,u.z),h.x=t*Math.cos(g),h.y=t*Math.sin(g),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const g=(s+1)*f+m-1,x=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,v=(s+1)*f+m;o.push(g,x,v),o.push(x,p,v)}this.setIndex(o),this.setAttribute("position",new Gt(a,3)),this.setAttribute("normal",new Gt(l,3)),this.setAttribute("uv",new Gt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new mh(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Na extends we{constructor(t=new Gd(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new L,l=new L,c=new Wt;let h=new L;const u=[],d=[],f=[],m=[];g(),this.setIndex(m),this.setAttribute("position",new Gt(u,3)),this.setAttribute("normal",new Gt(d,3)),this.setAttribute("uv",new Gt(f,2));function g(){for(let y=0;y<e;y++)x(y);x(r===!1?e:0),v(),p()}function x(y){h=t.getPointAt(y/e,h);const _=o.normals[y],T=o.binormals[y];for(let A=0;A<=s;A++){const E=A/s*Math.PI*2,R=Math.sin(E),S=-Math.cos(E);l.x=S*_.x+R*T.x,l.y=S*_.y+R*T.y,l.z=S*_.z+R*T.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let y=1;y<=e;y++)for(let _=1;_<=s;_++){const T=(s+1)*(y-1)+(_-1),A=(s+1)*y+(_-1),E=(s+1)*y+_,R=(s+1)*(y-1)+_;m.push(T,A,R),m.push(A,E,R)}}function v(){for(let y=0;y<=e;y++)for(let _=0;_<=s;_++)c.x=y/e,c.y=_/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Na(new Fm[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class We extends ds{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nh,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Vd extends We{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Wt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Se(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class yn extends ds{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new ee(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nh,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class Om extends ds{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Bm extends ds{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Wd extends hh{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class gh extends Xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Hm extends gh{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Xe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const wl=new he,Su=new L,wu=new L;class Xd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Wt(512,512),this.mapType=xi,this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ch,this._frameExtents=new Wt(1,1),this._viewportCount=1,this._viewports=[new Ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Su.setFromMatrixPosition(t.matrixWorld),e.position.copy(Su),wu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(wu),e.updateMatrixWorld(),wl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wl,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(wl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Eu=new he,Yr=new L,El=new L;class Gm extends Xd{constructor(){super(new Nn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Wt(4,2),this._viewportCount=6,this._viewports=[new Ie(2,1,1,1),new Ie(0,1,1,1),new Ie(3,1,1,1),new Ie(1,1,1,1),new Ie(3,0,1,1),new Ie(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Yr.setFromMatrixPosition(t.matrixWorld),n.position.copy(Yr),El.copy(n.position),El.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(El),n.updateMatrixWorld(),s.makeTranslation(-Yr.x,-Yr.y,-Yr.z),Eu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Eu,n.coordinateSystem,n.reversedDepth)}}class Vm extends gh{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Gm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class qd extends Ud{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Wm extends Xd{constructor(){super(new qd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Xm extends gh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Xe.DEFAULT_UP),this.updateMatrix(),this.target=new Xe,this.shadow=new Wm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class qm extends we{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class $m extends Nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Tu=new he;class Tl{constructor(t,e,n=0,s=1/0){this.ray=new Ds(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new rh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Tu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Tu),this}intersectObject(t,e=!0,n=[]){return Bc(t,this,n,e),n.sort(Au),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Bc(t[s],this,n,e);return n.sort(Au),n}}function Au(i,t){return i.distance-t.distance}function Bc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Bc(r[o],t,e,!0)}}function Ru(i,t,e,n){const s=Ym(n);switch(e){case Td:return i*t;case Jc:return i*t/s.components*s.byteLength;case Qc:return i*t/s.components*s.byteLength;case Rd:return i*t*2/s.components*s.byteLength;case th:return i*t*2/s.components*s.byteLength;case Ad:return i*t*3/s.components*s.byteLength;case Vn:return i*t*4/s.components*s.byteLength;case eh:return i*t*4/s.components*s.byteLength;case xa:case va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ya:case _a:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case uc:case fc:return Math.max(i,16)*Math.max(t,8)/4;case hc:case dc:return Math.max(i,8)*Math.max(t,8)/2;case pc:case mc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case gc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case vc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case yc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case _c:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Mc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case bc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Sc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case wc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ec:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Tc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ac:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Rc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Cc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Pc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case zc:case Dc:case Ic:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Lc:case Uc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Nc:case kc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ym(i){switch(i){case xi:case bd:return{byteLength:1,components:1};case co:case Sd:case _o:return{byteLength:2,components:1};case jc:case Kc:return{byteLength:2,components:4};case zs:case Zc:case ai:return{byteLength:4,components:1};case wd:case Ed:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function $d(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Zm(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],g=u[f];g.start<=m.start+m.count+1?m.count=Math.max(m.count,g.start+g.count-m.start):(++d,u[d]=g)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const g=u[f];i.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var jm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Km=`#ifdef USE_ALPHAHASH
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
#endif`,Jm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,t0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,e0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,n0=`#ifdef USE_AOMAP
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
#endif`,i0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,s0=`#ifdef USE_BATCHING
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
#endif`,r0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,o0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,a0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,l0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,c0=`#ifdef USE_IRIDESCENCE
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
#endif`,h0=`#ifdef USE_BUMPMAP
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
#endif`,u0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,d0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,f0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,p0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,m0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,g0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,x0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,v0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,y0=`#define PI 3.141592653589793
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
} // validated`,_0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,M0=`vec3 transformedNormal = objectNormal;
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
#endif`,b0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,S0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,w0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,E0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,T0="gl_FragColor = linearToOutputTexel( gl_FragColor );",A0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,R0=`#ifdef USE_ENVMAP
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
#endif`,C0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,P0=`#ifdef USE_ENVMAP
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
#endif`,z0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,D0=`#ifdef USE_ENVMAP
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
#endif`,I0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,L0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,U0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,N0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,k0=`#ifdef USE_GRADIENTMAP
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
}`,F0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,O0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,B0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,H0=`uniform bool receiveShadow;
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
#endif`,G0=`#ifdef USE_ENVMAP
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
#endif`,V0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,W0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,X0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,q0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$0=`PhysicalMaterial material;
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
#endif`,Y0=`struct PhysicalMaterial {
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
}`,Z0=`
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
#endif`,j0=`#if defined( RE_IndirectDiffuse )
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
#endif`,K0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,J0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Q0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
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
#endif`,og=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ag=`#ifdef USE_METALNESSMAP
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
#endif`,ug=`#ifdef USE_MORPHTARGETS
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
#endif`,dg=`#ifdef USE_MORPHTARGETS
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
#endif`,xg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vg=`#ifdef USE_NORMALMAP
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
}`,Eg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Tg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ag=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Dg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lg=`float getShadowMask() {
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
}`,Ug=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ng=`#ifdef USE_SKINNING
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
#endif`,kg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fg=`#ifdef USE_SKINNING
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
#endif`,Gg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vg=`#ifdef USE_TRANSMISSION
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
#endif`,Xg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$g=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`;const Zg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jg=`uniform sampler2D t2D;
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
}`,tx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ex=`#include <common>
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
}`,nx=`#if DEPTH_PACKING == 3200
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
}`,ix=`#define DISTANCE
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
}`,sx=`#define DISTANCE
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
}`,rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ox=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ax=`uniform float scale;
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
}`,lx=`uniform vec3 diffuse;
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
}`,cx=`#include <common>
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
}`,hx=`uniform vec3 diffuse;
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
}`,ux=`#define LAMBERT
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
}`,dx=`#define LAMBERT
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
}`,fx=`#define MATCAP
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
}`,px=`#define MATCAP
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
}`,mx=`#define NORMAL
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
}`,gx=`#define NORMAL
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
}`,xx=`#define PHONG
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
}`,vx=`#define PHONG
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
}`,yx=`#define STANDARD
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
}`,_x=`#define STANDARD
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
}`,Mx=`#define TOON
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
}`,bx=`#define TOON
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
}`,Sx=`uniform float size;
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
}`,wx=`uniform vec3 diffuse;
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
}`,Ex=`#include <common>
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
}`,Tx=`uniform vec3 color;
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
}`,Ax=`uniform float rotation;
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
}`,Rx=`uniform vec3 diffuse;
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
}`,ye={alphahash_fragment:jm,alphahash_pars_fragment:Km,alphamap_fragment:Jm,alphamap_pars_fragment:Qm,alphatest_fragment:t0,alphatest_pars_fragment:e0,aomap_fragment:n0,aomap_pars_fragment:i0,batching_pars_vertex:s0,batching_vertex:r0,begin_vertex:o0,beginnormal_vertex:a0,bsdfs:l0,iridescence_fragment:c0,bumpmap_pars_fragment:h0,clipping_planes_fragment:u0,clipping_planes_pars_fragment:d0,clipping_planes_pars_vertex:f0,clipping_planes_vertex:p0,color_fragment:m0,color_pars_fragment:g0,color_pars_vertex:x0,color_vertex:v0,common:y0,cube_uv_reflection_fragment:_0,defaultnormal_vertex:M0,displacementmap_pars_vertex:b0,displacementmap_vertex:S0,emissivemap_fragment:w0,emissivemap_pars_fragment:E0,colorspace_fragment:T0,colorspace_pars_fragment:A0,envmap_fragment:R0,envmap_common_pars_fragment:C0,envmap_pars_fragment:P0,envmap_pars_vertex:z0,envmap_physical_pars_fragment:G0,envmap_vertex:D0,fog_vertex:I0,fog_pars_vertex:L0,fog_fragment:U0,fog_pars_fragment:N0,gradientmap_pars_fragment:k0,lightmap_pars_fragment:F0,lights_lambert_fragment:O0,lights_lambert_pars_fragment:B0,lights_pars_begin:H0,lights_toon_fragment:V0,lights_toon_pars_fragment:W0,lights_phong_fragment:X0,lights_phong_pars_fragment:q0,lights_physical_fragment:$0,lights_physical_pars_fragment:Y0,lights_fragment_begin:Z0,lights_fragment_maps:j0,lights_fragment_end:K0,logdepthbuf_fragment:J0,logdepthbuf_pars_fragment:Q0,logdepthbuf_pars_vertex:tg,logdepthbuf_vertex:eg,map_fragment:ng,map_pars_fragment:ig,map_particle_fragment:sg,map_particle_pars_fragment:rg,metalnessmap_fragment:og,metalnessmap_pars_fragment:ag,morphinstance_vertex:lg,morphcolor_vertex:cg,morphnormal_vertex:hg,morphtarget_pars_vertex:ug,morphtarget_vertex:dg,normal_fragment_begin:fg,normal_fragment_maps:pg,normal_pars_fragment:mg,normal_pars_vertex:gg,normal_vertex:xg,normalmap_pars_fragment:vg,clearcoat_normal_fragment_begin:yg,clearcoat_normal_fragment_maps:_g,clearcoat_pars_fragment:Mg,iridescence_pars_fragment:bg,opaque_fragment:Sg,packing:wg,premultiplied_alpha_fragment:Eg,project_vertex:Tg,dithering_fragment:Ag,dithering_pars_fragment:Rg,roughnessmap_fragment:Cg,roughnessmap_pars_fragment:Pg,shadowmap_pars_fragment:zg,shadowmap_pars_vertex:Dg,shadowmap_vertex:Ig,shadowmask_pars_fragment:Lg,skinbase_vertex:Ug,skinning_pars_vertex:Ng,skinning_vertex:kg,skinnormal_vertex:Fg,specularmap_fragment:Og,specularmap_pars_fragment:Bg,tonemapping_fragment:Hg,tonemapping_pars_fragment:Gg,transmission_fragment:Vg,transmission_pars_fragment:Wg,uv_pars_fragment:Xg,uv_pars_vertex:qg,uv_vertex:$g,worldpos_vertex:Yg,background_vert:Zg,background_frag:jg,backgroundCube_vert:Kg,backgroundCube_frag:Jg,cube_vert:Qg,cube_frag:tx,depth_vert:ex,depth_frag:nx,distanceRGBA_vert:ix,distanceRGBA_frag:sx,equirect_vert:rx,equirect_frag:ox,linedashed_vert:ax,linedashed_frag:lx,meshbasic_vert:cx,meshbasic_frag:hx,meshlambert_vert:ux,meshlambert_frag:dx,meshmatcap_vert:fx,meshmatcap_frag:px,meshnormal_vert:mx,meshnormal_frag:gx,meshphong_vert:xx,meshphong_frag:vx,meshphysical_vert:yx,meshphysical_frag:_x,meshtoon_vert:Mx,meshtoon_frag:bx,points_vert:Sx,points_frag:wx,shadow_vert:Ex,shadow_frag:Tx,sprite_vert:Ax,sprite_frag:Rx},Ct={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new xe},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new xe}},envmap:{envMap:{value:null},envMapRotation:{value:new xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new xe},normalScale:{value:new Wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0},uvTransform:{value:new xe}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new Wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new xe},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0}}},pi={basic:{uniforms:Cn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.fog]),vertexShader:ye.meshbasic_vert,fragmentShader:ye.meshbasic_frag},lambert:{uniforms:Cn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,Ct.lights,{emissive:{value:new ee(0)}}]),vertexShader:ye.meshlambert_vert,fragmentShader:ye.meshlambert_frag},phong:{uniforms:Cn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,Ct.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30}}]),vertexShader:ye.meshphong_vert,fragmentShader:ye.meshphong_frag},standard:{uniforms:Cn([Ct.common,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.roughnessmap,Ct.metalnessmap,Ct.fog,Ct.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ye.meshphysical_vert,fragmentShader:ye.meshphysical_frag},toon:{uniforms:Cn([Ct.common,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.gradientmap,Ct.fog,Ct.lights,{emissive:{value:new ee(0)}}]),vertexShader:ye.meshtoon_vert,fragmentShader:ye.meshtoon_frag},matcap:{uniforms:Cn([Ct.common,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,{matcap:{value:null}}]),vertexShader:ye.meshmatcap_vert,fragmentShader:ye.meshmatcap_frag},points:{uniforms:Cn([Ct.points,Ct.fog]),vertexShader:ye.points_vert,fragmentShader:ye.points_frag},dashed:{uniforms:Cn([Ct.common,Ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ye.linedashed_vert,fragmentShader:ye.linedashed_frag},depth:{uniforms:Cn([Ct.common,Ct.displacementmap]),vertexShader:ye.depth_vert,fragmentShader:ye.depth_frag},normal:{uniforms:Cn([Ct.common,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,{opacity:{value:1}}]),vertexShader:ye.meshnormal_vert,fragmentShader:ye.meshnormal_frag},sprite:{uniforms:Cn([Ct.sprite,Ct.fog]),vertexShader:ye.sprite_vert,fragmentShader:ye.sprite_frag},background:{uniforms:{uvTransform:{value:new xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ye.background_vert,fragmentShader:ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new xe}},vertexShader:ye.backgroundCube_vert,fragmentShader:ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ye.cube_vert,fragmentShader:ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ye.equirect_vert,fragmentShader:ye.equirect_frag},distanceRGBA:{uniforms:Cn([Ct.common,Ct.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ye.distanceRGBA_vert,fragmentShader:ye.distanceRGBA_frag},shadow:{uniforms:Cn([Ct.lights,Ct.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:ye.shadow_vert,fragmentShader:ye.shadow_frag}};pi.physical={uniforms:Cn([pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new xe},clearcoatNormalScale:{value:new Wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new xe},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new xe},transmissionSamplerSize:{value:new Wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new xe},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new xe},anisotropyVector:{value:new Wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new xe}}]),vertexShader:ye.meshphysical_vert,fragmentShader:ye.meshphysical_frag};const Qo={r:0,b:0,g:0},bs=new vi,Cx=new he;function Px(i,t,e,n,s,r,o){const a=new ee(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function m(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?e:t).get(_)),_}function g(y){let _=!1;const T=m(y);T===null?p(a,l):T&&T.isColor&&(p(T,1),_=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(y,_){const T=m(_);T&&(T.isCubeTexture||T.mapping===Da)?(h===void 0&&(h=new Zt(new Bi(1,1,1),new Kn({name:"BackgroundCubeMaterial",uniforms:Rr(pi.backgroundCube.uniforms),vertexShader:pi.backgroundCube.vertexShader,fragmentShader:pi.backgroundCube.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),bs.copy(_.backgroundRotation),bs.x*=-1,bs.y*=-1,bs.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(bs.y*=-1,bs.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Cx.makeRotationFromEuler(bs)),h.material.toneMapped=Ue.getTransfer(T.colorSpace)!==Ve,(u!==T||d!==T.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new Zt(new Ui(2,2),new Kn({name:"BackgroundMaterial",uniforms:Rr(pi.background.uniforms),vertexShader:pi.background.vertexShader,fragmentShader:pi.background.fragmentShader,side:Oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=Ue.getTransfer(T.colorSpace)!==Ve,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||d!==T.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,_){y.getRGB(Qo,Ld(i)),n.buffers.color.setClear(Qo.r,Qo.g,Qo.b,_,o)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:g,addToRenderList:x,dispose:v}}function zx(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(b,U,P,G,j){let H=!1;const q=u(G,P,U);r!==q&&(r=q,c(r.object)),H=f(b,G,P,j),H&&m(b,G,P,j),j!==null&&t.update(j,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,_(b,U,P,G),j!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(j).buffer))}function l(){return i.createVertexArray()}function c(b){return i.bindVertexArray(b)}function h(b){return i.deleteVertexArray(b)}function u(b,U,P){const G=P.wireframe===!0;let j=n[b.id];j===void 0&&(j={},n[b.id]=j);let H=j[U.id];H===void 0&&(H={},j[U.id]=H);let q=H[G];return q===void 0&&(q=d(l()),H[G]=q),q}function d(b){const U=[],P=[],G=[];for(let j=0;j<e;j++)U[j]=0,P[j]=0,G[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:P,attributeDivisors:G,object:b,attributes:{},index:null}}function f(b,U,P,G){const j=r.attributes,H=U.attributes;let q=0;const B=P.getAttributes();for(const O in B)if(B[O].location>=0){const W=j[O];let ft=H[O];if(ft===void 0&&(O==="instanceMatrix"&&b.instanceMatrix&&(ft=b.instanceMatrix),O==="instanceColor"&&b.instanceColor&&(ft=b.instanceColor)),W===void 0||W.attribute!==ft||ft&&W.data!==ft.data)return!0;q++}return r.attributesNum!==q||r.index!==G}function m(b,U,P,G){const j={},H=U.attributes;let q=0;const B=P.getAttributes();for(const O in B)if(B[O].location>=0){let W=H[O];W===void 0&&(O==="instanceMatrix"&&b.instanceMatrix&&(W=b.instanceMatrix),O==="instanceColor"&&b.instanceColor&&(W=b.instanceColor));const ft={};ft.attribute=W,W&&W.data&&(ft.data=W.data),j[O]=ft,q++}r.attributes=j,r.attributesNum=q,r.index=G}function g(){const b=r.newAttributes;for(let U=0,P=b.length;U<P;U++)b[U]=0}function x(b){p(b,0)}function p(b,U){const P=r.newAttributes,G=r.enabledAttributes,j=r.attributeDivisors;P[b]=1,G[b]===0&&(i.enableVertexAttribArray(b),G[b]=1),j[b]!==U&&(i.vertexAttribDivisor(b,U),j[b]=U)}function v(){const b=r.newAttributes,U=r.enabledAttributes;for(let P=0,G=U.length;P<G;P++)U[P]!==b[P]&&(i.disableVertexAttribArray(P),U[P]=0)}function y(b,U,P,G,j,H,q){q===!0?i.vertexAttribIPointer(b,U,P,j,H):i.vertexAttribPointer(b,U,P,G,j,H)}function _(b,U,P,G){g();const j=G.attributes,H=P.getAttributes(),q=U.defaultAttributeValues;for(const B in H){const O=H[B];if(O.location>=0){let Q=j[B];if(Q===void 0&&(B==="instanceMatrix"&&b.instanceMatrix&&(Q=b.instanceMatrix),B==="instanceColor"&&b.instanceColor&&(Q=b.instanceColor)),Q!==void 0){const W=Q.normalized,ft=Q.itemSize,Vt=t.get(Q);if(Vt===void 0)continue;const Me=Vt.buffer,ce=Vt.type,ht=Vt.bytesPerElement,Y=ce===i.INT||ce===i.UNSIGNED_INT||Q.gpuType===Zc;if(Q.isInterleavedBufferAttribute){const rt=Q.data,_t=rt.stride,Xt=Q.offset;if(rt.isInstancedInterleavedBuffer){for(let kt=0;kt<O.locationSize;kt++)p(O.location+kt,rt.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let kt=0;kt<O.locationSize;kt++)x(O.location+kt);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let kt=0;kt<O.locationSize;kt++)y(O.location+kt,ft/O.locationSize,ce,W,_t*ht,(Xt+ft/O.locationSize*kt)*ht,Y)}else{if(Q.isInstancedBufferAttribute){for(let rt=0;rt<O.locationSize;rt++)p(O.location+rt,Q.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let rt=0;rt<O.locationSize;rt++)x(O.location+rt);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let rt=0;rt<O.locationSize;rt++)y(O.location+rt,ft/O.locationSize,ce,W,ft*ht,ft/O.locationSize*rt*ht,Y)}}else if(q!==void 0){const W=q[B];if(W!==void 0)switch(W.length){case 2:i.vertexAttrib2fv(O.location,W);break;case 3:i.vertexAttrib3fv(O.location,W);break;case 4:i.vertexAttrib4fv(O.location,W);break;default:i.vertexAttrib1fv(O.location,W)}}}}v()}function T(){R();for(const b in n){const U=n[b];for(const P in U){const G=U[P];for(const j in G)h(G[j].object),delete G[j];delete U[P]}delete n[b]}}function A(b){if(n[b.id]===void 0)return;const U=n[b.id];for(const P in U){const G=U[P];for(const j in G)h(G[j].object),delete G[j];delete U[P]}delete n[b.id]}function E(b){for(const U in n){const P=n[U];if(P[b.id]===void 0)continue;const G=P[b.id];for(const j in G)h(G[j].object),delete G[j];delete P[b.id]}}function R(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:S,dispose:T,releaseStatesOfGeometry:A,releaseStatesOfProgram:E,initAttributes:g,enableAttribute:x,disableUnusedAttributes:v}}function Dx(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let g=0;g<u;g++)m+=h[g]*d[g];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Ix(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==Vn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const R=E===_o&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==xi&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==ai&&!R)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),x=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:g,maxCubemapSize:x,maxAttributes:p,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:T,maxSamples:A}}function Lx(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new fi,a=new xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,g=u.clipIntersection,x=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!x)r?h(null):c();else{const v=r?0:n,y=v*4;let _=p.clippingState||null;l.value=_,_=h(m,d,y,f);for(let T=0;T!==y;++T)_[T]=e[T];p.clippingState=_,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){const g=u!==null?u.length:0;let x=null;if(g!==0){if(x=l.value,m!==!0||x===null){const p=f+g*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(x===null||x.length<p)&&(x=new Float32Array(p));for(let y=0,_=f;y!==g;++y,_+=4)o.copy(u[y]).applyMatrix4(v,a),o.normal.toArray(x,_),x[_+3]=o.constant}l.value=x,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,x}}function Ux(i){let t=new WeakMap;function e(o,a){return a===ac?o.mapping=wr:a===lc&&(o.mapping=Er),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ac||a===lc)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new um(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const pr=4,Cu=[.125,.215,.35,.446,.526,.582],Rs=20,Al=new qd,Pu=new ee;let Rl=null,Cl=0,Pl=0,zl=!1;const Es=(1+Math.sqrt(5))/2,rr=1/Es,zu=[new L(-Es,rr,0),new L(Es,rr,0),new L(-rr,0,Es),new L(rr,0,Es),new L(0,Es,-rr),new L(0,Es,rr),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],Nx=new L;class Du{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=Nx}=r;Rl=this._renderer.getRenderTarget(),Cl=this._renderer.getActiveCubeFace(),Pl=this._renderer.getActiveMipmapLevel(),zl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Uu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Rl,Cl,Pl),this._renderer.xr.enabled=zl,t.scissorTest=!1,ta(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===wr||t.mapping===Er?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Rl=this._renderer.getRenderTarget(),Cl=this._renderer.getActiveCubeFace(),Pl=this._renderer.getActiveMipmapLevel(),zl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:oi,minFilter:oi,generateMipmaps:!1,type:_o,format:Vn,colorSpace:Ar,depthBuffer:!1},s=Iu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Iu(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=kx(r)),this._blurMaterial=Fx(r,t,e)}return s}_compileMaterial(t){const e=new Zt(this._lodPlanes[0],t);this._renderer.compile(e,Al)}_sceneToCubeUV(t,e,n,s,r){const l=new Nn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Pu),u.toneMapping=as,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const g=new _n({name:"PMREM.Background",side:In,depthWrite:!1,depthTest:!1}),x=new Zt(new Bi,g);let p=!1;const v=t.background;v?v.isColor&&(g.color.copy(v),t.background=null,p=!0):(g.color.copy(Pu),p=!0);for(let y=0;y<6;y++){const _=y%3;_===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):_===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));const T=this._cubeSize;ta(s,_*T,y>2?T:0,T,T),u.setRenderTarget(s),p&&u.render(x,l),u.render(t,l)}x.geometry.dispose(),x.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=v}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===wr||t.mapping===Er;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Uu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Zt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;ta(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Al)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=zu[(s-r-1)%zu.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Zt(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Rs-1),g=r/m,x=isFinite(r)?1+Math.floor(h*g):Rs;x>Rs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Rs}`);const p=[];let v=0;for(let E=0;E<Rs;++E){const R=E/g,S=Math.exp(-R*R/2);p.push(S),E===0?v+=S:E<x&&(v+=2*S)}for(let E=0;E<p.length;E++)p[E]=p[E]/v;d.envMap.value=t.texture,d.samples.value=x,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=m,d.mipInt.value=y-n;const _=this._sizeLods[s],T=3*_*(s>y-pr?s-y+pr:0),A=4*(this._cubeSize-_);ta(e,T,A,3*_,2*_),l.setRenderTarget(e),l.render(u,Al)}}function kx(i){const t=[],e=[],n=[];let s=i;const r=i-pr+1+Cu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-pr?l=Cu[o-i+pr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,g=3,x=2,p=1,v=new Float32Array(g*m*f),y=new Float32Array(x*m*f),_=new Float32Array(p*m*f);for(let A=0;A<f;A++){const E=A%3*2/3-1,R=A>2?0:-1,S=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];v.set(S,g*m*A),y.set(d,x*m*A);const b=[A,A,A,A,A,A];_.set(b,p*m*A)}const T=new we;T.setAttribute("position",new un(v,g)),T.setAttribute("uv",new un(y,x)),T.setAttribute("faceIndex",new un(_,p)),t.push(T),s>pr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Iu(i,t,e){const n=new cs(i,t,e);return n.texture.mapping=Da,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ta(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Fx(i,t,e){const n=new Float32Array(Rs),s=new L(0,1,0);return new Kn({name:"SphericalGaussianBlur",defines:{n:Rs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:xh(),fragmentShader:`

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
		`,blending:os,depthTest:!1,depthWrite:!1})}function Lu(){return new Kn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xh(),fragmentShader:`

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
		`,blending:os,depthTest:!1,depthWrite:!1})}function Uu(){return new Kn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:os,depthTest:!1,depthWrite:!1})}function xh(){return`

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
	`}function Ox(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ac||l===lc,h=l===wr||l===Er;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Du(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Du(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Bx(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&mo("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Hx(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,m=u.attributes.position;let g=0;if(f!==null){const v=f.array;g=f.version;for(let y=0,_=v.length;y<_;y+=3){const T=v[y+0],A=v[y+1],E=v[y+2];d.push(T,A,A,E,E,T)}}else if(m!==void 0){const v=m.array;g=m.version;for(let y=0,_=v.length/3-1;y<_;y+=3){const T=y+0,A=y+1,E=y+2;d.push(T,A,A,E,E,T)}}else return;const x=new(Pd(d)?Id:oh)(d,1);x.version=g;const p=r.get(u);p&&t.remove(p),r.set(u,x)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Gx(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function c(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,d*o,m),e.update(f,n,m))}function h(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let x=0;for(let p=0;p<m;p++)x+=f[p];e.update(x,n,1)}function u(d,f,m,g){if(m===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],g[p]);else{x.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,g,0,m);let p=0;for(let v=0;v<m;v++)p+=f[v]*g[v];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Vx(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Wx(i,t,e){const n=new WeakMap,s=new Ie;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let b=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",b)};var f=b;d!==void 0&&d.texture.dispose();const m=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let _=0;m===!0&&(_=1),g===!0&&(_=2),x===!0&&(_=3);let T=a.attributes.position.count*_,A=1;T>t.maxTextureSize&&(A=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const E=new Float32Array(T*A*4*u),R=new zd(E,T,A,u);R.type=ai,R.needsUpdate=!0;const S=_*4;for(let U=0;U<u;U++){const P=p[U],G=v[U],j=y[U],H=T*A*4*U;for(let q=0;q<P.count;q++){const B=q*S;m===!0&&(s.fromBufferAttribute(P,q),E[H+B+0]=s.x,E[H+B+1]=s.y,E[H+B+2]=s.z,E[H+B+3]=0),g===!0&&(s.fromBufferAttribute(G,q),E[H+B+4]=s.x,E[H+B+5]=s.y,E[H+B+6]=s.z,E[H+B+7]=0),x===!0&&(s.fromBufferAttribute(j,q),E[H+B+8]=s.x,E[H+B+9]=s.y,E[H+B+10]=s.z,E[H+B+11]=j.itemSize===4?s.w:1)}}d={count:u,texture:R,size:new Wt(T,A)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let m=0;for(let x=0;x<c.length;x++)m+=c[x];const g=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Xx(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const Yd=new Tn,Nu=new Od(1,1),Zd=new zd,jd=new Zp,Kd=new Nd,ku=[],Fu=[],Ou=new Float32Array(16),Bu=new Float32Array(9),Hu=new Float32Array(4);function zr(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=ku[s];if(r===void 0&&(r=new Float32Array(s),ku[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function dn(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function fn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ka(i,t){let e=Fu[t];e===void 0&&(e=new Int32Array(t),Fu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function qx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function $x(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(dn(e,t))return;i.uniform2fv(this.addr,t),fn(e,t)}}function Yx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(dn(e,t))return;i.uniform3fv(this.addr,t),fn(e,t)}}function Zx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(dn(e,t))return;i.uniform4fv(this.addr,t),fn(e,t)}}function jx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(dn(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),fn(e,t)}else{if(dn(e,n))return;Hu.set(n),i.uniformMatrix2fv(this.addr,!1,Hu),fn(e,n)}}function Kx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(dn(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),fn(e,t)}else{if(dn(e,n))return;Bu.set(n),i.uniformMatrix3fv(this.addr,!1,Bu),fn(e,n)}}function Jx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(dn(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),fn(e,t)}else{if(dn(e,n))return;Ou.set(n),i.uniformMatrix4fv(this.addr,!1,Ou),fn(e,n)}}function Qx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function tv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(dn(e,t))return;i.uniform2iv(this.addr,t),fn(e,t)}}function ev(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(dn(e,t))return;i.uniform3iv(this.addr,t),fn(e,t)}}function nv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(dn(e,t))return;i.uniform4iv(this.addr,t),fn(e,t)}}function iv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function sv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(dn(e,t))return;i.uniform2uiv(this.addr,t),fn(e,t)}}function rv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(dn(e,t))return;i.uniform3uiv(this.addr,t),fn(e,t)}}function ov(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(dn(e,t))return;i.uniform4uiv(this.addr,t),fn(e,t)}}function av(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Nu.compareFunction=Cd,r=Nu):r=Yd,e.setTexture2D(t||r,s)}function lv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||jd,s)}function cv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Kd,s)}function hv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Zd,s)}function uv(i){switch(i){case 5126:return qx;case 35664:return $x;case 35665:return Yx;case 35666:return Zx;case 35674:return jx;case 35675:return Kx;case 35676:return Jx;case 5124:case 35670:return Qx;case 35667:case 35671:return tv;case 35668:case 35672:return ev;case 35669:case 35673:return nv;case 5125:return iv;case 36294:return sv;case 36295:return rv;case 36296:return ov;case 35678:case 36198:case 36298:case 36306:case 35682:return av;case 35679:case 36299:case 36307:return lv;case 35680:case 36300:case 36308:case 36293:return cv;case 36289:case 36303:case 36311:case 36292:return hv}}function dv(i,t){i.uniform1fv(this.addr,t)}function fv(i,t){const e=zr(t,this.size,2);i.uniform2fv(this.addr,e)}function pv(i,t){const e=zr(t,this.size,3);i.uniform3fv(this.addr,e)}function mv(i,t){const e=zr(t,this.size,4);i.uniform4fv(this.addr,e)}function gv(i,t){const e=zr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function xv(i,t){const e=zr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function vv(i,t){const e=zr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function yv(i,t){i.uniform1iv(this.addr,t)}function _v(i,t){i.uniform2iv(this.addr,t)}function Mv(i,t){i.uniform3iv(this.addr,t)}function bv(i,t){i.uniform4iv(this.addr,t)}function Sv(i,t){i.uniform1uiv(this.addr,t)}function wv(i,t){i.uniform2uiv(this.addr,t)}function Ev(i,t){i.uniform3uiv(this.addr,t)}function Tv(i,t){i.uniform4uiv(this.addr,t)}function Av(i,t,e){const n=this.cache,s=t.length,r=ka(e,s);dn(n,r)||(i.uniform1iv(this.addr,r),fn(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Yd,r[o])}function Rv(i,t,e){const n=this.cache,s=t.length,r=ka(e,s);dn(n,r)||(i.uniform1iv(this.addr,r),fn(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||jd,r[o])}function Cv(i,t,e){const n=this.cache,s=t.length,r=ka(e,s);dn(n,r)||(i.uniform1iv(this.addr,r),fn(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Kd,r[o])}function Pv(i,t,e){const n=this.cache,s=t.length,r=ka(e,s);dn(n,r)||(i.uniform1iv(this.addr,r),fn(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Zd,r[o])}function zv(i){switch(i){case 5126:return dv;case 35664:return fv;case 35665:return pv;case 35666:return mv;case 35674:return gv;case 35675:return xv;case 35676:return vv;case 5124:case 35670:return yv;case 35667:case 35671:return _v;case 35668:case 35672:return Mv;case 35669:case 35673:return bv;case 5125:return Sv;case 36294:return wv;case 36295:return Ev;case 36296:return Tv;case 35678:case 36198:case 36298:case 36306:case 35682:return Av;case 35679:case 36299:case 36307:return Rv;case 35680:case 36300:case 36308:case 36293:return Cv;case 36289:case 36303:case 36311:case 36292:return Pv}}class Dv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=uv(e.type)}}class Iv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=zv(e.type)}}class Lv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Dl=/(\w+)(\])?(\[|\.)?/g;function Gu(i,t){i.seq.push(t),i.map[t.id]=t}function Uv(i,t,e){const n=i.name,s=n.length;for(Dl.lastIndex=0;;){const r=Dl.exec(n),o=Dl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Gu(e,c===void 0?new Dv(a,i,t):new Iv(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Lv(a),Gu(e,u)),e=u}}}class Ma{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Uv(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Vu(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Nv=37297;let kv=0;function Fv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Wu=new xe;function Ov(i){Ue._getMatrix(Wu,Ue.workingColorSpace,i);const t=`mat3( ${Wu.elements.map(e=>e.toFixed(4))} )`;switch(Ue.getTransfer(i)){case ba:return[t,"LinearTransferOETF"];case Ve:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Xu(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Fv(i.getShaderSource(t),a)}else return r}function Bv(i,t){const e=Ov(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Hv(i,t){let e;switch(t){case lp:e="Linear";break;case cp:e="Reinhard";break;case hp:e="Cineon";break;case _d:e="ACESFilmic";break;case dp:e="AgX";break;case fp:e="Neutral";break;case up:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ea=new L;function Gv(){Ue.getLuminanceCoefficients(ea);const i=ea.x.toFixed(4),t=ea.y.toFixed(4),e=ea.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Vv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qr).join(`
`)}function Wv(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Xv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Qr(i){return i!==""}function qu(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $u(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const qv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hc(i){return i.replace(qv,Yv)}const $v=new Map;function Yv(i,t){let e=ye[t];if(e===void 0){const n=$v.get(t);if(n!==void 0)e=ye[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Hc(e)}const Zv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yu(i){return i.replace(Zv,jv)}function jv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Zu(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Kv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===vd?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Hf?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===zi&&(t="SHADOWMAP_TYPE_VSM"),t}function Jv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case wr:case Er:t="ENVMAP_TYPE_CUBE";break;case Da:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Qv(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Er:t="ENVMAP_MODE_REFRACTION";break}return t}function ty(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case yd:t="ENVMAP_BLENDING_MULTIPLY";break;case op:t="ENVMAP_BLENDING_MIX";break;case ap:t="ENVMAP_BLENDING_ADD";break}return t}function ey(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function ny(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Kv(e),c=Jv(e),h=Qv(e),u=ty(e),d=ey(e),f=Vv(e),m=Wv(r),g=s.createProgram();let x,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Qr).join(`
`),x.length>0&&(x+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Qr).join(`
`),p.length>0&&(p+=`
`)):(x=[Zu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qr).join(`
`),p=[Zu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==as?"#define TONE_MAPPING":"",e.toneMapping!==as?ye.tonemapping_pars_fragment:"",e.toneMapping!==as?Hv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ye.colorspace_pars_fragment,Bv("linearToOutputTexel",e.outputColorSpace),Gv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Qr).join(`
`)),o=Hc(o),o=qu(o,e),o=$u(o,e),a=Hc(a),a=qu(a,e),a=$u(a,e),o=Yu(o),a=Yu(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,x=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,p=["#define varying in",e.glslVersion===Vh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Vh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=v+x+o,_=v+p+a,T=Vu(s,s.VERTEX_SHADER,y),A=Vu(s,s.FRAGMENT_SHADER,_);s.attachShader(g,T),s.attachShader(g,A),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function E(U){if(i.debug.checkShaderErrors){const P=s.getProgramInfoLog(g)||"",G=s.getShaderInfoLog(T)||"",j=s.getShaderInfoLog(A)||"",H=P.trim(),q=G.trim(),B=j.trim();let O=!0,Q=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(O=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,T,A);else{const W=Xu(s,T,"vertex"),ft=Xu(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+H+`
`+W+`
`+ft)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(q===""||B==="")&&(Q=!1);Q&&(U.diagnostics={runnable:O,programLog:H,vertexShader:{log:q,prefix:x},fragmentShader:{log:B,prefix:p}})}s.deleteShader(T),s.deleteShader(A),R=new Ma(s,g),S=Xv(s,g)}let R;this.getUniforms=function(){return R===void 0&&E(this),R};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(g,Nv)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=kv++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=T,this.fragmentShader=A,this}let iy=0;class sy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new ry(t),e.set(t,n)),n}}class ry{constructor(t){this.id=iy++,this.code=t,this.usedTimes=0}}function oy(i,t,e,n,s,r,o){const a=new rh,l=new sy,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return c.add(S),S===0?"uv":`uv${S}`}function x(S,b,U,P,G){const j=P.fog,H=G.geometry,q=S.isMeshStandardMaterial?P.environment:null,B=(S.isMeshStandardMaterial?e:t).get(S.envMap||q),O=B&&B.mapping===Da?B.image.height:null,Q=m[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const W=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ft=W!==void 0?W.length:0;let Vt=0;H.morphAttributes.position!==void 0&&(Vt=1),H.morphAttributes.normal!==void 0&&(Vt=2),H.morphAttributes.color!==void 0&&(Vt=3);let Me,ce,ht,Y;if(Q){const ve=pi[Q];Me=ve.vertexShader,ce=ve.fragmentShader}else Me=S.vertexShader,ce=S.fragmentShader,l.update(S),ht=l.getVertexShaderID(S),Y=l.getFragmentShaderID(S);const rt=i.getRenderTarget(),_t=i.state.buffers.depth.getReversed(),Xt=G.isInstancedMesh===!0,kt=G.isBatchedMesh===!0,fe=!!S.map,Ee=!!S.matcap,D=!!B,ne=!!S.aoMap,Yt=!!S.lightMap,qt=!!S.bumpMap,Lt=!!S.normalMap,se=!!S.displacementMap,mt=!!S.emissiveMap,Mt=!!S.metalnessMap,le=!!S.roughnessMap,De=S.anisotropy>0,z=S.clearcoat>0,w=S.dispersion>0,tt=S.iridescence>0,at=S.sheen>0,lt=S.transmission>0,ot=De&&!!S.anisotropyMap,Ut=z&&!!S.clearcoatMap,ct=z&&!!S.clearcoatNormalMap,St=z&&!!S.clearcoatRoughnessMap,Pt=tt&&!!S.iridescenceMap,gt=tt&&!!S.iridescenceThicknessMap,Rt=at&&!!S.sheenColorMap,jt=at&&!!S.sheenRoughnessMap,Ot=!!S.specularMap,wt=!!S.specularColorMap,ue=!!S.specularIntensityMap,$=lt&&!!S.transmissionMap,yt=lt&&!!S.thicknessMap,Et=!!S.gradientMap,Ft=!!S.alphaMap,xt=S.alphaTest>0,ut=!!S.alphaHash,Bt=!!S.extensions;let de=as;S.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(de=i.toneMapping);const Be={shaderID:Q,shaderType:S.type,shaderName:S.name,vertexShader:Me,fragmentShader:ce,defines:S.defines,customVertexShaderID:ht,customFragmentShaderID:Y,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:kt,batchingColor:kt&&G._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&G.instanceColor!==null,instancingMorph:Xt&&G.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:rt===null?i.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:Ar,alphaToCoverage:!!S.alphaToCoverage,map:fe,matcap:Ee,envMap:D,envMapMode:D&&B.mapping,envMapCubeUVHeight:O,aoMap:ne,lightMap:Yt,bumpMap:qt,normalMap:Lt,displacementMap:d&&se,emissiveMap:mt,normalMapObjectSpace:Lt&&S.normalMapType===vp,normalMapTangentSpace:Lt&&S.normalMapType===nh,metalnessMap:Mt,roughnessMap:le,anisotropy:De,anisotropyMap:ot,clearcoat:z,clearcoatMap:Ut,clearcoatNormalMap:ct,clearcoatRoughnessMap:St,dispersion:w,iridescence:tt,iridescenceMap:Pt,iridescenceThicknessMap:gt,sheen:at,sheenColorMap:Rt,sheenRoughnessMap:jt,specularMap:Ot,specularColorMap:wt,specularIntensityMap:ue,transmission:lt,transmissionMap:$,thicknessMap:yt,gradientMap:Et,opaque:S.transparent===!1&&S.blending===vr&&S.alphaToCoverage===!1,alphaMap:Ft,alphaTest:xt,alphaHash:ut,combine:S.combine,mapUv:fe&&g(S.map.channel),aoMapUv:ne&&g(S.aoMap.channel),lightMapUv:Yt&&g(S.lightMap.channel),bumpMapUv:qt&&g(S.bumpMap.channel),normalMapUv:Lt&&g(S.normalMap.channel),displacementMapUv:se&&g(S.displacementMap.channel),emissiveMapUv:mt&&g(S.emissiveMap.channel),metalnessMapUv:Mt&&g(S.metalnessMap.channel),roughnessMapUv:le&&g(S.roughnessMap.channel),anisotropyMapUv:ot&&g(S.anisotropyMap.channel),clearcoatMapUv:Ut&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:ct&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:St&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Pt&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:gt&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:jt&&g(S.sheenRoughnessMap.channel),specularMapUv:Ot&&g(S.specularMap.channel),specularColorMapUv:wt&&g(S.specularColorMap.channel),specularIntensityMapUv:ue&&g(S.specularIntensityMap.channel),transmissionMapUv:$&&g(S.transmissionMap.channel),thicknessMapUv:yt&&g(S.thicknessMap.channel),alphaMapUv:Ft&&g(S.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Lt||De),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!H.attributes.uv&&(fe||Ft),fog:!!j,useFog:S.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:_t,skinning:G.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Vt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:de,decodeVideoTexture:fe&&S.map.isVideoTexture===!0&&Ue.getTransfer(S.map.colorSpace)===Ve,decodeVideoTextureEmissive:mt&&S.emissiveMap.isVideoTexture===!0&&Ue.getTransfer(S.emissiveMap.colorSpace)===Ve,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Pe,flipSided:S.side===In,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Bt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&S.extensions.multiDraw===!0||kt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Be.vertexUv1s=c.has(1),Be.vertexUv2s=c.has(2),Be.vertexUv3s=c.has(3),c.clear(),Be}function p(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const U in S.defines)b.push(U),b.push(S.defines[U]);return S.isRawShaderMaterial===!1&&(v(b,S),y(b,S),b.push(i.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function v(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function y(S,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),S.push(a.mask)}function _(S){const b=m[S.type];let U;if(b){const P=pi[b];U=Ea.clone(P.uniforms)}else U=S.uniforms;return U}function T(S,b){let U;for(let P=0,G=h.length;P<G;P++){const j=h[P];if(j.cacheKey===b){U=j,++U.usedTimes;break}}return U===void 0&&(U=new ny(i,b,S,r),h.push(U)),U}function A(S){if(--S.usedTimes===0){const b=h.indexOf(S);h[b]=h[h.length-1],h.pop(),S.destroy()}}function E(S){l.remove(S)}function R(){l.dispose()}return{getParameters:x,getProgramCacheKey:p,getUniforms:_,acquireProgram:T,releaseProgram:A,releaseShaderCache:E,programs:h,dispose:R}}function ay(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function ly(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function ju(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ku(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,m,g,x){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:g,group:x},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=g,p.group=x),t++,p}function a(u,d,f,m,g,x){const p=o(u,d,f,m,g,x);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(u,d,f,m,g,x){const p=o(u,d,f,m,g,x);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||ly),n.length>1&&n.sort(d||ju),s.length>1&&s.sort(d||ju)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function cy(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Ku,i.set(n,[o])):s>=r.length?(o=new Ku,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function hy(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new ee};break;case"SpotLight":e={position:new L,direction:new L,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new ee,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":e={color:new ee,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function uy(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let dy=0;function fy(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function py(i){const t=new hy,e=uy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const s=new L,r=new he,o=new he;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,g=0,x=0,p=0,v=0,y=0,_=0,T=0,A=0,E=0;c.sort(fy);for(let S=0,b=c.length;S<b;S++){const U=c[S],P=U.color,G=U.intensity,j=U.distance,H=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)h+=P.r*G,u+=P.g*G,d+=P.b*G;else if(U.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(U.sh.coefficients[q],G);E++}else if(U.isDirectionalLight){const q=t.get(U);if(q.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const B=U.shadow,O=e.get(U);O.shadowIntensity=B.intensity,O.shadowBias=B.bias,O.shadowNormalBias=B.normalBias,O.shadowRadius=B.radius,O.shadowMapSize=B.mapSize,n.directionalShadow[f]=O,n.directionalShadowMap[f]=H,n.directionalShadowMatrix[f]=U.shadow.matrix,v++}n.directional[f]=q,f++}else if(U.isSpotLight){const q=t.get(U);q.position.setFromMatrixPosition(U.matrixWorld),q.color.copy(P).multiplyScalar(G),q.distance=j,q.coneCos=Math.cos(U.angle),q.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),q.decay=U.decay,n.spot[g]=q;const B=U.shadow;if(U.map&&(n.spotLightMap[T]=U.map,T++,B.updateMatrices(U),U.castShadow&&A++),n.spotLightMatrix[g]=B.matrix,U.castShadow){const O=e.get(U);O.shadowIntensity=B.intensity,O.shadowBias=B.bias,O.shadowNormalBias=B.normalBias,O.shadowRadius=B.radius,O.shadowMapSize=B.mapSize,n.spotShadow[g]=O,n.spotShadowMap[g]=H,_++}g++}else if(U.isRectAreaLight){const q=t.get(U);q.color.copy(P).multiplyScalar(G),q.halfWidth.set(U.width*.5,0,0),q.halfHeight.set(0,U.height*.5,0),n.rectArea[x]=q,x++}else if(U.isPointLight){const q=t.get(U);if(q.color.copy(U.color).multiplyScalar(U.intensity),q.distance=U.distance,q.decay=U.decay,U.castShadow){const B=U.shadow,O=e.get(U);O.shadowIntensity=B.intensity,O.shadowBias=B.bias,O.shadowNormalBias=B.normalBias,O.shadowRadius=B.radius,O.shadowMapSize=B.mapSize,O.shadowCameraNear=B.camera.near,O.shadowCameraFar=B.camera.far,n.pointShadow[m]=O,n.pointShadowMap[m]=H,n.pointShadowMatrix[m]=U.shadow.matrix,y++}n.point[m]=q,m++}else if(U.isHemisphereLight){const q=t.get(U);q.skyColor.copy(U.color).multiplyScalar(G),q.groundColor.copy(U.groundColor).multiplyScalar(G),n.hemi[p]=q,p++}}x>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ct.LTC_FLOAT_1,n.rectAreaLTC2=Ct.LTC_FLOAT_2):(n.rectAreaLTC1=Ct.LTC_HALF_1,n.rectAreaLTC2=Ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const R=n.hash;(R.directionalLength!==f||R.pointLength!==m||R.spotLength!==g||R.rectAreaLength!==x||R.hemiLength!==p||R.numDirectionalShadows!==v||R.numPointShadows!==y||R.numSpotShadows!==_||R.numSpotMaps!==T||R.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=x,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+T-A,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=E,R.directionalLength=f,R.pointLength=m,R.spotLength=g,R.rectAreaLength=x,R.hemiLength=p,R.numDirectionalShadows=v,R.numPointShadows=y,R.numSpotShadows=_,R.numSpotMaps=T,R.numLightProbes=E,n.version=dy++)}function l(c,h){let u=0,d=0,f=0,m=0,g=0;const x=h.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){const y=c[p];if(y.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(x),u++}else if(y.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(x),_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(x),f++}else if(y.isRectAreaLight){const _=n.rectArea[m];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(x),o.identity(),r.copy(y.matrixWorld),r.premultiply(x),o.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),m++}else if(y.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(x),d++}else if(y.isHemisphereLight){const _=n.hemi[g];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(x),g++}}}return{setup:a,setupView:l,state:n}}function Ju(i){const t=new py(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function my(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Ju(i),t.set(s,[a])):r>=o.length?(a=new Ju(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const gy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xy=`uniform sampler2D shadow_pass;
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
}`;function vy(i,t,e){let n=new ch;const s=new Wt,r=new Wt,o=new Ie,a=new Om({depthPacking:xp}),l=new Bm,c={},h=e.maxTextureSize,u={[Oi]:In,[In]:Oi,[Pe]:Pe},d=new Kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Wt},radius:{value:4}},vertexShader:gy,fragmentShader:xy}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new we;m.setAttribute("position",new un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Zt(m,d),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vd;let p=this.type;this.render=function(A,E,R){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||A.length===0)return;const S=i.getRenderTarget(),b=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),P=i.state;P.setBlending(os),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const G=p!==zi&&this.type===zi,j=p===zi&&this.type!==zi;for(let H=0,q=A.length;H<q;H++){const B=A[H],O=B.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",B,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const Q=O.getFrameExtents();if(s.multiply(Q),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,O.mapSize.y=r.y)),O.map===null||G===!0||j===!0){const ft=this.type!==zi?{minFilter:Wn,magFilter:Wn}:{};O.map!==null&&O.map.dispose(),O.map=new cs(s.x,s.y,ft),O.map.texture.name=B.name+".shadowMap",O.camera.updateProjectionMatrix()}i.setRenderTarget(O.map),i.clear();const W=O.getViewportCount();for(let ft=0;ft<W;ft++){const Vt=O.getViewport(ft);o.set(r.x*Vt.x,r.y*Vt.y,r.x*Vt.z,r.y*Vt.w),P.viewport(o),O.updateMatrices(B,ft),n=O.getFrustum(),_(E,R,O.camera,B,this.type)}O.isPointLightShadow!==!0&&this.type===zi&&v(O,R),O.needsUpdate=!1}p=this.type,x.needsUpdate=!1,i.setRenderTarget(S,b,U)};function v(A,E){const R=t.update(g);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new cs(s.x,s.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(E,null,R,d,g,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(E,null,R,f,g,null)}function y(A,E,R,S){let b=null;const U=R.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(U!==void 0)b=U;else if(b=R.isPointLight===!0?l:a,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const P=b.uuid,G=E.uuid;let j=c[P];j===void 0&&(j={},c[P]=j);let H=j[G];H===void 0&&(H=b.clone(),j[G]=H,E.addEventListener("dispose",T)),b=H}if(b.visible=E.visible,b.wireframe=E.wireframe,S===zi?b.side=E.shadowSide!==null?E.shadowSide:E.side:b.side=E.shadowSide!==null?E.shadowSide:u[E.side],b.alphaMap=E.alphaMap,b.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,b.map=E.map,b.clipShadows=E.clipShadows,b.clippingPlanes=E.clippingPlanes,b.clipIntersection=E.clipIntersection,b.displacementMap=E.displacementMap,b.displacementScale=E.displacementScale,b.displacementBias=E.displacementBias,b.wireframeLinewidth=E.wireframeLinewidth,b.linewidth=E.linewidth,R.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const P=i.properties.get(b);P.light=R}return b}function _(A,E,R,S,b){if(A.visible===!1)return;if(A.layers.test(E.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===zi)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,A.matrixWorld);const G=t.update(A),j=A.material;if(Array.isArray(j)){const H=G.groups;for(let q=0,B=H.length;q<B;q++){const O=H[q],Q=j[O.materialIndex];if(Q&&Q.visible){const W=y(A,Q,S,b);A.onBeforeShadow(i,A,E,R,G,W,O),i.renderBufferDirect(R,null,G,W,A,O),A.onAfterShadow(i,A,E,R,G,W,O)}}}else if(j.visible){const H=y(A,j,S,b);A.onBeforeShadow(i,A,E,R,G,H,null),i.renderBufferDirect(R,null,G,H,A,null),A.onAfterShadow(i,A,E,R,G,H,null)}}const P=A.children;for(let G=0,j=P.length;G<j;G++)_(P[G],E,R,S,b)}function T(A){A.target.removeEventListener("dispose",T);for(const R in c){const S=c[R],b=A.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}const yy={[tc]:ec,[nc]:rc,[ic]:oc,[Sr]:sc,[ec]:tc,[rc]:nc,[oc]:ic,[sc]:Sr};function _y(i,t){function e(){let $=!1;const yt=new Ie;let Et=null;const Ft=new Ie(0,0,0,0);return{setMask:function(xt){Et!==xt&&!$&&(i.colorMask(xt,xt,xt,xt),Et=xt)},setLocked:function(xt){$=xt},setClear:function(xt,ut,Bt,de,Be){Be===!0&&(xt*=de,ut*=de,Bt*=de),yt.set(xt,ut,Bt,de),Ft.equals(yt)===!1&&(i.clearColor(xt,ut,Bt,de),Ft.copy(yt))},reset:function(){$=!1,Et=null,Ft.set(-1,0,0,0)}}}function n(){let $=!1,yt=!1,Et=null,Ft=null,xt=null;return{setReversed:function(ut){if(yt!==ut){const Bt=t.get("EXT_clip_control");ut?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT),yt=ut;const de=xt;xt=null,this.setClear(de)}},getReversed:function(){return yt},setTest:function(ut){ut?rt(i.DEPTH_TEST):_t(i.DEPTH_TEST)},setMask:function(ut){Et!==ut&&!$&&(i.depthMask(ut),Et=ut)},setFunc:function(ut){if(yt&&(ut=yy[ut]),Ft!==ut){switch(ut){case tc:i.depthFunc(i.NEVER);break;case ec:i.depthFunc(i.ALWAYS);break;case nc:i.depthFunc(i.LESS);break;case Sr:i.depthFunc(i.LEQUAL);break;case ic:i.depthFunc(i.EQUAL);break;case sc:i.depthFunc(i.GEQUAL);break;case rc:i.depthFunc(i.GREATER);break;case oc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ft=ut}},setLocked:function(ut){$=ut},setClear:function(ut){xt!==ut&&(yt&&(ut=1-ut),i.clearDepth(ut),xt=ut)},reset:function(){$=!1,Et=null,Ft=null,xt=null,yt=!1}}}function s(){let $=!1,yt=null,Et=null,Ft=null,xt=null,ut=null,Bt=null,de=null,Be=null;return{setTest:function(ve){$||(ve?rt(i.STENCIL_TEST):_t(i.STENCIL_TEST))},setMask:function(ve){yt!==ve&&!$&&(i.stencilMask(ve),yt=ve)},setFunc:function(ve,An,On){(Et!==ve||Ft!==An||xt!==On)&&(i.stencilFunc(ve,An,On),Et=ve,Ft=An,xt=On)},setOp:function(ve,An,On){(ut!==ve||Bt!==An||de!==On)&&(i.stencilOp(ve,An,On),ut=ve,Bt=An,de=On)},setLocked:function(ve){$=ve},setClear:function(ve){Be!==ve&&(i.clearStencil(ve),Be=ve)},reset:function(){$=!1,yt=null,Et=null,Ft=null,xt=null,ut=null,Bt=null,de=null,Be=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,g=!1,x=null,p=null,v=null,y=null,_=null,T=null,A=null,E=new ee(0,0,0),R=0,S=!1,b=null,U=null,P=null,G=null,j=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,B=0;const O=i.getParameter(i.VERSION);O.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(O)[1]),q=B>=1):O.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),q=B>=2);let Q=null,W={};const ft=i.getParameter(i.SCISSOR_BOX),Vt=i.getParameter(i.VIEWPORT),Me=new Ie().fromArray(ft),ce=new Ie().fromArray(Vt);function ht($,yt,Et,Ft){const xt=new Uint8Array(4),ut=i.createTexture();i.bindTexture($,ut),i.texParameteri($,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri($,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Bt=0;Bt<Et;Bt++)$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?i.texImage3D(yt,0,i.RGBA,1,1,Ft,0,i.RGBA,i.UNSIGNED_BYTE,xt):i.texImage2D(yt+Bt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xt);return ut}const Y={};Y[i.TEXTURE_2D]=ht(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=ht(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=ht(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=ht(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),rt(i.DEPTH_TEST),o.setFunc(Sr),qt(!1),Lt(Nh),rt(i.CULL_FACE),ne(os);function rt($){h[$]!==!0&&(i.enable($),h[$]=!0)}function _t($){h[$]!==!1&&(i.disable($),h[$]=!1)}function Xt($,yt){return u[$]!==yt?(i.bindFramebuffer($,yt),u[$]=yt,$===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=yt),$===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=yt),!0):!1}function kt($,yt){let Et=f,Ft=!1;if($){Et=d.get(yt),Et===void 0&&(Et=[],d.set(yt,Et));const xt=$.textures;if(Et.length!==xt.length||Et[0]!==i.COLOR_ATTACHMENT0){for(let ut=0,Bt=xt.length;ut<Bt;ut++)Et[ut]=i.COLOR_ATTACHMENT0+ut;Et.length=xt.length,Ft=!0}}else Et[0]!==i.BACK&&(Et[0]=i.BACK,Ft=!0);Ft&&i.drawBuffers(Et)}function fe($){return m!==$?(i.useProgram($),m=$,!0):!1}const Ee={[As]:i.FUNC_ADD,[Vf]:i.FUNC_SUBTRACT,[Wf]:i.FUNC_REVERSE_SUBTRACT};Ee[Xf]=i.MIN,Ee[qf]=i.MAX;const D={[$f]:i.ZERO,[Yf]:i.ONE,[Zf]:i.SRC_COLOR,[Jl]:i.SRC_ALPHA,[ep]:i.SRC_ALPHA_SATURATE,[Qf]:i.DST_COLOR,[Kf]:i.DST_ALPHA,[jf]:i.ONE_MINUS_SRC_COLOR,[Ql]:i.ONE_MINUS_SRC_ALPHA,[tp]:i.ONE_MINUS_DST_COLOR,[Jf]:i.ONE_MINUS_DST_ALPHA,[np]:i.CONSTANT_COLOR,[ip]:i.ONE_MINUS_CONSTANT_COLOR,[sp]:i.CONSTANT_ALPHA,[rp]:i.ONE_MINUS_CONSTANT_ALPHA};function ne($,yt,Et,Ft,xt,ut,Bt,de,Be,ve){if($===os){g===!0&&(_t(i.BLEND),g=!1);return}if(g===!1&&(rt(i.BLEND),g=!0),$!==Gf){if($!==x||ve!==S){if((p!==As||_!==As)&&(i.blendEquation(i.FUNC_ADD),p=As,_=As),ve)switch($){case vr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kh:i.blendFunc(i.ONE,i.ONE);break;case Fh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Oh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}else switch($){case vr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case kh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Fh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Oh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}v=null,y=null,T=null,A=null,E.set(0,0,0),R=0,x=$,S=ve}return}xt=xt||yt,ut=ut||Et,Bt=Bt||Ft,(yt!==p||xt!==_)&&(i.blendEquationSeparate(Ee[yt],Ee[xt]),p=yt,_=xt),(Et!==v||Ft!==y||ut!==T||Bt!==A)&&(i.blendFuncSeparate(D[Et],D[Ft],D[ut],D[Bt]),v=Et,y=Ft,T=ut,A=Bt),(de.equals(E)===!1||Be!==R)&&(i.blendColor(de.r,de.g,de.b,Be),E.copy(de),R=Be),x=$,S=!1}function Yt($,yt){$.side===Pe?_t(i.CULL_FACE):rt(i.CULL_FACE);let Et=$.side===In;yt&&(Et=!Et),qt(Et),$.blending===vr&&$.transparent===!1?ne(os):ne($.blending,$.blendEquation,$.blendSrc,$.blendDst,$.blendEquationAlpha,$.blendSrcAlpha,$.blendDstAlpha,$.blendColor,$.blendAlpha,$.premultipliedAlpha),o.setFunc($.depthFunc),o.setTest($.depthTest),o.setMask($.depthWrite),r.setMask($.colorWrite);const Ft=$.stencilWrite;a.setTest(Ft),Ft&&(a.setMask($.stencilWriteMask),a.setFunc($.stencilFunc,$.stencilRef,$.stencilFuncMask),a.setOp($.stencilFail,$.stencilZFail,$.stencilZPass)),mt($.polygonOffset,$.polygonOffsetFactor,$.polygonOffsetUnits),$.alphaToCoverage===!0?rt(i.SAMPLE_ALPHA_TO_COVERAGE):_t(i.SAMPLE_ALPHA_TO_COVERAGE)}function qt($){b!==$&&($?i.frontFace(i.CW):i.frontFace(i.CCW),b=$)}function Lt($){$!==Of?(rt(i.CULL_FACE),$!==U&&($===Nh?i.cullFace(i.BACK):$===Bf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):_t(i.CULL_FACE),U=$}function se($){$!==P&&(q&&i.lineWidth($),P=$)}function mt($,yt,Et){$?(rt(i.POLYGON_OFFSET_FILL),(G!==yt||j!==Et)&&(i.polygonOffset(yt,Et),G=yt,j=Et)):_t(i.POLYGON_OFFSET_FILL)}function Mt($){$?rt(i.SCISSOR_TEST):_t(i.SCISSOR_TEST)}function le($){$===void 0&&($=i.TEXTURE0+H-1),Q!==$&&(i.activeTexture($),Q=$)}function De($,yt,Et){Et===void 0&&(Q===null?Et=i.TEXTURE0+H-1:Et=Q);let Ft=W[Et];Ft===void 0&&(Ft={type:void 0,texture:void 0},W[Et]=Ft),(Ft.type!==$||Ft.texture!==yt)&&(Q!==Et&&(i.activeTexture(Et),Q=Et),i.bindTexture($,yt||Y[$]),Ft.type=$,Ft.texture=yt)}function z(){const $=W[Q];$!==void 0&&$.type!==void 0&&(i.bindTexture($.type,null),$.type=void 0,$.texture=void 0)}function w(){try{i.compressedTexImage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function tt(){try{i.compressedTexImage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function at(){try{i.texSubImage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function lt(){try{i.texSubImage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function ot(){try{i.compressedTexSubImage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Ut(){try{i.compressedTexSubImage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function ct(){try{i.texStorage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function St(){try{i.texStorage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Pt(){try{i.texImage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function gt(){try{i.texImage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Rt($){Me.equals($)===!1&&(i.scissor($.x,$.y,$.z,$.w),Me.copy($))}function jt($){ce.equals($)===!1&&(i.viewport($.x,$.y,$.z,$.w),ce.copy($))}function Ot($,yt){let Et=c.get(yt);Et===void 0&&(Et=new WeakMap,c.set(yt,Et));let Ft=Et.get($);Ft===void 0&&(Ft=i.getUniformBlockIndex(yt,$.name),Et.set($,Ft))}function wt($,yt){const Ft=c.get(yt).get($);l.get(yt)!==Ft&&(i.uniformBlockBinding(yt,Ft,$.__bindingPointIndex),l.set(yt,Ft))}function ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Q=null,W={},u={},d=new WeakMap,f=[],m=null,g=!1,x=null,p=null,v=null,y=null,_=null,T=null,A=null,E=new ee(0,0,0),R=0,S=!1,b=null,U=null,P=null,G=null,j=null,Me.set(0,0,i.canvas.width,i.canvas.height),ce.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:rt,disable:_t,bindFramebuffer:Xt,drawBuffers:kt,useProgram:fe,setBlending:ne,setMaterial:Yt,setFlipSided:qt,setCullFace:Lt,setLineWidth:se,setPolygonOffset:mt,setScissorTest:Mt,activeTexture:le,bindTexture:De,unbindTexture:z,compressedTexImage2D:w,compressedTexImage3D:tt,texImage2D:Pt,texImage3D:gt,updateUBOMapping:Ot,uniformBlockBinding:wt,texStorage2D:ct,texStorage3D:St,texSubImage2D:at,texSubImage3D:lt,compressedTexSubImage2D:ot,compressedTexSubImage3D:Ut,scissor:Rt,viewport:jt,reset:ue}}function My(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Wt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(z,w){return f?new OffscreenCanvas(z,w):wa("canvas")}function g(z,w,tt){let at=1;const lt=De(z);if((lt.width>tt||lt.height>tt)&&(at=tt/Math.max(lt.width,lt.height)),at<1)if(typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&z instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&z instanceof ImageBitmap||typeof VideoFrame<"u"&&z instanceof VideoFrame){const ot=Math.floor(at*lt.width),Ut=Math.floor(at*lt.height);u===void 0&&(u=m(ot,Ut));const ct=w?m(ot,Ut):u;return ct.width=ot,ct.height=Ut,ct.getContext("2d").drawImage(z,0,0,ot,Ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+lt.width+"x"+lt.height+") to ("+ot+"x"+Ut+")."),ct}else return"data"in z&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+lt.width+"x"+lt.height+")."),z;return z}function x(z){return z.generateMipmaps}function p(z){i.generateMipmap(z)}function v(z){return z.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:z.isWebGL3DRenderTarget?i.TEXTURE_3D:z.isWebGLArrayRenderTarget||z.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(z,w,tt,at,lt=!1){if(z!==null){if(i[z]!==void 0)return i[z];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+z+"'")}let ot=w;if(w===i.RED&&(tt===i.FLOAT&&(ot=i.R32F),tt===i.HALF_FLOAT&&(ot=i.R16F),tt===i.UNSIGNED_BYTE&&(ot=i.R8)),w===i.RED_INTEGER&&(tt===i.UNSIGNED_BYTE&&(ot=i.R8UI),tt===i.UNSIGNED_SHORT&&(ot=i.R16UI),tt===i.UNSIGNED_INT&&(ot=i.R32UI),tt===i.BYTE&&(ot=i.R8I),tt===i.SHORT&&(ot=i.R16I),tt===i.INT&&(ot=i.R32I)),w===i.RG&&(tt===i.FLOAT&&(ot=i.RG32F),tt===i.HALF_FLOAT&&(ot=i.RG16F),tt===i.UNSIGNED_BYTE&&(ot=i.RG8)),w===i.RG_INTEGER&&(tt===i.UNSIGNED_BYTE&&(ot=i.RG8UI),tt===i.UNSIGNED_SHORT&&(ot=i.RG16UI),tt===i.UNSIGNED_INT&&(ot=i.RG32UI),tt===i.BYTE&&(ot=i.RG8I),tt===i.SHORT&&(ot=i.RG16I),tt===i.INT&&(ot=i.RG32I)),w===i.RGB_INTEGER&&(tt===i.UNSIGNED_BYTE&&(ot=i.RGB8UI),tt===i.UNSIGNED_SHORT&&(ot=i.RGB16UI),tt===i.UNSIGNED_INT&&(ot=i.RGB32UI),tt===i.BYTE&&(ot=i.RGB8I),tt===i.SHORT&&(ot=i.RGB16I),tt===i.INT&&(ot=i.RGB32I)),w===i.RGBA_INTEGER&&(tt===i.UNSIGNED_BYTE&&(ot=i.RGBA8UI),tt===i.UNSIGNED_SHORT&&(ot=i.RGBA16UI),tt===i.UNSIGNED_INT&&(ot=i.RGBA32UI),tt===i.BYTE&&(ot=i.RGBA8I),tt===i.SHORT&&(ot=i.RGBA16I),tt===i.INT&&(ot=i.RGBA32I)),w===i.RGB&&(tt===i.UNSIGNED_INT_5_9_9_9_REV&&(ot=i.RGB9_E5),tt===i.UNSIGNED_INT_10F_11F_11F_REV&&(ot=i.R11F_G11F_B10F)),w===i.RGBA){const Ut=lt?ba:Ue.getTransfer(at);tt===i.FLOAT&&(ot=i.RGBA32F),tt===i.HALF_FLOAT&&(ot=i.RGBA16F),tt===i.UNSIGNED_BYTE&&(ot=Ut===Ve?i.SRGB8_ALPHA8:i.RGBA8),tt===i.UNSIGNED_SHORT_4_4_4_4&&(ot=i.RGBA4),tt===i.UNSIGNED_SHORT_5_5_5_1&&(ot=i.RGB5_A1)}return(ot===i.R16F||ot===i.R32F||ot===i.RG16F||ot===i.RG32F||ot===i.RGBA16F||ot===i.RGBA32F)&&t.get("EXT_color_buffer_float"),ot}function _(z,w){let tt;return z?w===null||w===zs||w===ho?tt=i.DEPTH24_STENCIL8:w===ai?tt=i.DEPTH32F_STENCIL8:w===co&&(tt=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===zs||w===ho?tt=i.DEPTH_COMPONENT24:w===ai?tt=i.DEPTH_COMPONENT32F:w===co&&(tt=i.DEPTH_COMPONENT16),tt}function T(z,w){return x(z)===!0||z.isFramebufferTexture&&z.minFilter!==Wn&&z.minFilter!==oi?Math.log2(Math.max(w.width,w.height))+1:z.mipmaps!==void 0&&z.mipmaps.length>0?z.mipmaps.length:z.isCompressedTexture&&Array.isArray(z.image)?w.mipmaps.length:1}function A(z){const w=z.target;w.removeEventListener("dispose",A),R(w),w.isVideoTexture&&h.delete(w)}function E(z){const w=z.target;w.removeEventListener("dispose",E),b(w)}function R(z){const w=n.get(z);if(w.__webglInit===void 0)return;const tt=z.source,at=d.get(tt);if(at){const lt=at[w.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&S(z),Object.keys(at).length===0&&d.delete(tt)}n.remove(z)}function S(z){const w=n.get(z);i.deleteTexture(w.__webglTexture);const tt=z.source,at=d.get(tt);delete at[w.__cacheKey],o.memory.textures--}function b(z){const w=n.get(z);if(z.depthTexture&&(z.depthTexture.dispose(),n.remove(z.depthTexture)),z.isWebGLCubeRenderTarget)for(let at=0;at<6;at++){if(Array.isArray(w.__webglFramebuffer[at]))for(let lt=0;lt<w.__webglFramebuffer[at].length;lt++)i.deleteFramebuffer(w.__webglFramebuffer[at][lt]);else i.deleteFramebuffer(w.__webglFramebuffer[at]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[at])}else{if(Array.isArray(w.__webglFramebuffer))for(let at=0;at<w.__webglFramebuffer.length;at++)i.deleteFramebuffer(w.__webglFramebuffer[at]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let at=0;at<w.__webglColorRenderbuffer.length;at++)w.__webglColorRenderbuffer[at]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[at]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const tt=z.textures;for(let at=0,lt=tt.length;at<lt;at++){const ot=n.get(tt[at]);ot.__webglTexture&&(i.deleteTexture(ot.__webglTexture),o.memory.textures--),n.remove(tt[at])}n.remove(z)}let U=0;function P(){U=0}function G(){const z=U;return z>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+z+" texture units while this GPU supports only "+s.maxTextures),U+=1,z}function j(z){const w=[];return w.push(z.wrapS),w.push(z.wrapT),w.push(z.wrapR||0),w.push(z.magFilter),w.push(z.minFilter),w.push(z.anisotropy),w.push(z.internalFormat),w.push(z.format),w.push(z.type),w.push(z.generateMipmaps),w.push(z.premultiplyAlpha),w.push(z.flipY),w.push(z.unpackAlignment),w.push(z.colorSpace),w.join()}function H(z,w){const tt=n.get(z);if(z.isVideoTexture&&Mt(z),z.isRenderTargetTexture===!1&&z.isExternalTexture!==!0&&z.version>0&&tt.__version!==z.version){const at=z.image;if(at===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(at.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(tt,z,w);return}}else z.isExternalTexture&&(tt.__webglTexture=z.sourceTexture?z.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,tt.__webglTexture,i.TEXTURE0+w)}function q(z,w){const tt=n.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&tt.__version!==z.version){Y(tt,z,w);return}e.bindTexture(i.TEXTURE_2D_ARRAY,tt.__webglTexture,i.TEXTURE0+w)}function B(z,w){const tt=n.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&tt.__version!==z.version){Y(tt,z,w);return}e.bindTexture(i.TEXTURE_3D,tt.__webglTexture,i.TEXTURE0+w)}function O(z,w){const tt=n.get(z);if(z.version>0&&tt.__version!==z.version){rt(tt,z,w);return}e.bindTexture(i.TEXTURE_CUBE_MAP,tt.__webglTexture,i.TEXTURE0+w)}const Q={[Tr]:i.REPEAT,[is]:i.CLAMP_TO_EDGE,[cc]:i.MIRRORED_REPEAT},W={[Wn]:i.NEAREST,[mp]:i.NEAREST_MIPMAP_NEAREST,[Ao]:i.NEAREST_MIPMAP_LINEAR,[oi]:i.LINEAR,[Za]:i.LINEAR_MIPMAP_NEAREST,[ss]:i.LINEAR_MIPMAP_LINEAR},ft={[yp]:i.NEVER,[Ep]:i.ALWAYS,[_p]:i.LESS,[Cd]:i.LEQUAL,[Mp]:i.EQUAL,[wp]:i.GEQUAL,[bp]:i.GREATER,[Sp]:i.NOTEQUAL};function Vt(z,w){if(w.type===ai&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===oi||w.magFilter===Za||w.magFilter===Ao||w.magFilter===ss||w.minFilter===oi||w.minFilter===Za||w.minFilter===Ao||w.minFilter===ss)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(z,i.TEXTURE_WRAP_S,Q[w.wrapS]),i.texParameteri(z,i.TEXTURE_WRAP_T,Q[w.wrapT]),(z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY)&&i.texParameteri(z,i.TEXTURE_WRAP_R,Q[w.wrapR]),i.texParameteri(z,i.TEXTURE_MAG_FILTER,W[w.magFilter]),i.texParameteri(z,i.TEXTURE_MIN_FILTER,W[w.minFilter]),w.compareFunction&&(i.texParameteri(z,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(z,i.TEXTURE_COMPARE_FUNC,ft[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Wn||w.minFilter!==Ao&&w.minFilter!==ss||w.type===ai&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const tt=t.get("EXT_texture_filter_anisotropic");i.texParameterf(z,tt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Me(z,w){let tt=!1;z.__webglInit===void 0&&(z.__webglInit=!0,w.addEventListener("dispose",A));const at=w.source;let lt=d.get(at);lt===void 0&&(lt={},d.set(at,lt));const ot=j(w);if(ot!==z.__cacheKey){lt[ot]===void 0&&(lt[ot]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,tt=!0),lt[ot].usedTimes++;const Ut=lt[z.__cacheKey];Ut!==void 0&&(lt[z.__cacheKey].usedTimes--,Ut.usedTimes===0&&S(w)),z.__cacheKey=ot,z.__webglTexture=lt[ot].texture}return tt}function ce(z,w,tt){return Math.floor(Math.floor(z/tt)/w)}function ht(z,w,tt,at){const ot=z.updateRanges;if(ot.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,tt,at,w.data);else{ot.sort((gt,Rt)=>gt.start-Rt.start);let Ut=0;for(let gt=1;gt<ot.length;gt++){const Rt=ot[Ut],jt=ot[gt],Ot=Rt.start+Rt.count,wt=ce(jt.start,w.width,4),ue=ce(Rt.start,w.width,4);jt.start<=Ot+1&&wt===ue&&ce(jt.start+jt.count-1,w.width,4)===wt?Rt.count=Math.max(Rt.count,jt.start+jt.count-Rt.start):(++Ut,ot[Ut]=jt)}ot.length=Ut+1;const ct=i.getParameter(i.UNPACK_ROW_LENGTH),St=i.getParameter(i.UNPACK_SKIP_PIXELS),Pt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let gt=0,Rt=ot.length;gt<Rt;gt++){const jt=ot[gt],Ot=Math.floor(jt.start/4),wt=Math.ceil(jt.count/4),ue=Ot%w.width,$=Math.floor(Ot/w.width),yt=wt,Et=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,ue),i.pixelStorei(i.UNPACK_SKIP_ROWS,$),e.texSubImage2D(i.TEXTURE_2D,0,ue,$,yt,Et,tt,at,w.data)}z.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ct),i.pixelStorei(i.UNPACK_SKIP_PIXELS,St),i.pixelStorei(i.UNPACK_SKIP_ROWS,Pt)}}function Y(z,w,tt){let at=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(at=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(at=i.TEXTURE_3D);const lt=Me(z,w),ot=w.source;e.bindTexture(at,z.__webglTexture,i.TEXTURE0+tt);const Ut=n.get(ot);if(ot.version!==Ut.__version||lt===!0){e.activeTexture(i.TEXTURE0+tt);const ct=Ue.getPrimaries(Ue.workingColorSpace),St=w.colorSpace===Di?null:Ue.getPrimaries(w.colorSpace),Pt=w.colorSpace===Di||ct===St?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let gt=g(w.image,!1,s.maxTextureSize);gt=le(w,gt);const Rt=r.convert(w.format,w.colorSpace),jt=r.convert(w.type);let Ot=y(w.internalFormat,Rt,jt,w.colorSpace,w.isVideoTexture);Vt(at,w);let wt;const ue=w.mipmaps,$=w.isVideoTexture!==!0,yt=Ut.__version===void 0||lt===!0,Et=ot.dataReady,Ft=T(w,gt);if(w.isDepthTexture)Ot=_(w.format===fo,w.type),yt&&($?e.texStorage2D(i.TEXTURE_2D,1,Ot,gt.width,gt.height):e.texImage2D(i.TEXTURE_2D,0,Ot,gt.width,gt.height,0,Rt,jt,null));else if(w.isDataTexture)if(ue.length>0){$&&yt&&e.texStorage2D(i.TEXTURE_2D,Ft,Ot,ue[0].width,ue[0].height);for(let xt=0,ut=ue.length;xt<ut;xt++)wt=ue[xt],$?Et&&e.texSubImage2D(i.TEXTURE_2D,xt,0,0,wt.width,wt.height,Rt,jt,wt.data):e.texImage2D(i.TEXTURE_2D,xt,Ot,wt.width,wt.height,0,Rt,jt,wt.data);w.generateMipmaps=!1}else $?(yt&&e.texStorage2D(i.TEXTURE_2D,Ft,Ot,gt.width,gt.height),Et&&ht(w,gt,Rt,jt)):e.texImage2D(i.TEXTURE_2D,0,Ot,gt.width,gt.height,0,Rt,jt,gt.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){$&&yt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ft,Ot,ue[0].width,ue[0].height,gt.depth);for(let xt=0,ut=ue.length;xt<ut;xt++)if(wt=ue[xt],w.format!==Vn)if(Rt!==null)if($){if(Et)if(w.layerUpdates.size>0){const Bt=Ru(wt.width,wt.height,w.format,w.type);for(const de of w.layerUpdates){const Be=wt.data.subarray(de*Bt/wt.data.BYTES_PER_ELEMENT,(de+1)*Bt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,de,wt.width,wt.height,1,Rt,Be)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,0,wt.width,wt.height,gt.depth,Rt,wt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,xt,Ot,wt.width,wt.height,gt.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $?Et&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,0,wt.width,wt.height,gt.depth,Rt,jt,wt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,xt,Ot,wt.width,wt.height,gt.depth,0,Rt,jt,wt.data)}else{$&&yt&&e.texStorage2D(i.TEXTURE_2D,Ft,Ot,ue[0].width,ue[0].height);for(let xt=0,ut=ue.length;xt<ut;xt++)wt=ue[xt],w.format!==Vn?Rt!==null?$?Et&&e.compressedTexSubImage2D(i.TEXTURE_2D,xt,0,0,wt.width,wt.height,Rt,wt.data):e.compressedTexImage2D(i.TEXTURE_2D,xt,Ot,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$?Et&&e.texSubImage2D(i.TEXTURE_2D,xt,0,0,wt.width,wt.height,Rt,jt,wt.data):e.texImage2D(i.TEXTURE_2D,xt,Ot,wt.width,wt.height,0,Rt,jt,wt.data)}else if(w.isDataArrayTexture)if($){if(yt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ft,Ot,gt.width,gt.height,gt.depth),Et)if(w.layerUpdates.size>0){const xt=Ru(gt.width,gt.height,w.format,w.type);for(const ut of w.layerUpdates){const Bt=gt.data.subarray(ut*xt/gt.data.BYTES_PER_ELEMENT,(ut+1)*xt/gt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ut,gt.width,gt.height,1,Rt,jt,Bt)}w.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,gt.width,gt.height,gt.depth,Rt,jt,gt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ot,gt.width,gt.height,gt.depth,0,Rt,jt,gt.data);else if(w.isData3DTexture)$?(yt&&e.texStorage3D(i.TEXTURE_3D,Ft,Ot,gt.width,gt.height,gt.depth),Et&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,gt.width,gt.height,gt.depth,Rt,jt,gt.data)):e.texImage3D(i.TEXTURE_3D,0,Ot,gt.width,gt.height,gt.depth,0,Rt,jt,gt.data);else if(w.isFramebufferTexture){if(yt)if($)e.texStorage2D(i.TEXTURE_2D,Ft,Ot,gt.width,gt.height);else{let xt=gt.width,ut=gt.height;for(let Bt=0;Bt<Ft;Bt++)e.texImage2D(i.TEXTURE_2D,Bt,Ot,xt,ut,0,Rt,jt,null),xt>>=1,ut>>=1}}else if(ue.length>0){if($&&yt){const xt=De(ue[0]);e.texStorage2D(i.TEXTURE_2D,Ft,Ot,xt.width,xt.height)}for(let xt=0,ut=ue.length;xt<ut;xt++)wt=ue[xt],$?Et&&e.texSubImage2D(i.TEXTURE_2D,xt,0,0,Rt,jt,wt):e.texImage2D(i.TEXTURE_2D,xt,Ot,Rt,jt,wt);w.generateMipmaps=!1}else if($){if(yt){const xt=De(gt);e.texStorage2D(i.TEXTURE_2D,Ft,Ot,xt.width,xt.height)}Et&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Rt,jt,gt)}else e.texImage2D(i.TEXTURE_2D,0,Ot,Rt,jt,gt);x(w)&&p(at),Ut.__version=ot.version,w.onUpdate&&w.onUpdate(w)}z.__version=w.version}function rt(z,w,tt){if(w.image.length!==6)return;const at=Me(z,w),lt=w.source;e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+tt);const ot=n.get(lt);if(lt.version!==ot.__version||at===!0){e.activeTexture(i.TEXTURE0+tt);const Ut=Ue.getPrimaries(Ue.workingColorSpace),ct=w.colorSpace===Di?null:Ue.getPrimaries(w.colorSpace),St=w.colorSpace===Di||Ut===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);const Pt=w.isCompressedTexture||w.image[0].isCompressedTexture,gt=w.image[0]&&w.image[0].isDataTexture,Rt=[];for(let ut=0;ut<6;ut++)!Pt&&!gt?Rt[ut]=g(w.image[ut],!0,s.maxCubemapSize):Rt[ut]=gt?w.image[ut].image:w.image[ut],Rt[ut]=le(w,Rt[ut]);const jt=Rt[0],Ot=r.convert(w.format,w.colorSpace),wt=r.convert(w.type),ue=y(w.internalFormat,Ot,wt,w.colorSpace),$=w.isVideoTexture!==!0,yt=ot.__version===void 0||at===!0,Et=lt.dataReady;let Ft=T(w,jt);Vt(i.TEXTURE_CUBE_MAP,w);let xt;if(Pt){$&&yt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ft,ue,jt.width,jt.height);for(let ut=0;ut<6;ut++){xt=Rt[ut].mipmaps;for(let Bt=0;Bt<xt.length;Bt++){const de=xt[Bt];w.format!==Vn?Ot!==null?$?Et&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt,0,0,de.width,de.height,Ot,de.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt,ue,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt,0,0,de.width,de.height,Ot,wt,de.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt,ue,de.width,de.height,0,Ot,wt,de.data)}}}else{if(xt=w.mipmaps,$&&yt){xt.length>0&&Ft++;const ut=De(Rt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ft,ue,ut.width,ut.height)}for(let ut=0;ut<6;ut++)if(gt){$?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,Rt[ut].width,Rt[ut].height,Ot,wt,Rt[ut].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,ue,Rt[ut].width,Rt[ut].height,0,Ot,wt,Rt[ut].data);for(let Bt=0;Bt<xt.length;Bt++){const Be=xt[Bt].image[ut].image;$?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt+1,0,0,Be.width,Be.height,Ot,wt,Be.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt+1,ue,Be.width,Be.height,0,Ot,wt,Be.data)}}else{$?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,Ot,wt,Rt[ut]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,ue,Ot,wt,Rt[ut]);for(let Bt=0;Bt<xt.length;Bt++){const de=xt[Bt];$?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt+1,0,0,Ot,wt,de.image[ut]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt+1,ue,Ot,wt,de.image[ut])}}}x(w)&&p(i.TEXTURE_CUBE_MAP),ot.__version=lt.version,w.onUpdate&&w.onUpdate(w)}z.__version=w.version}function _t(z,w,tt,at,lt,ot){const Ut=r.convert(tt.format,tt.colorSpace),ct=r.convert(tt.type),St=y(tt.internalFormat,Ut,ct,tt.colorSpace),Pt=n.get(w),gt=n.get(tt);if(gt.__renderTarget=w,!Pt.__hasExternalTextures){const Rt=Math.max(1,w.width>>ot),jt=Math.max(1,w.height>>ot);lt===i.TEXTURE_3D||lt===i.TEXTURE_2D_ARRAY?e.texImage3D(lt,ot,St,Rt,jt,w.depth,0,Ut,ct,null):e.texImage2D(lt,ot,St,Rt,jt,0,Ut,ct,null)}e.bindFramebuffer(i.FRAMEBUFFER,z),mt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,at,lt,gt.__webglTexture,0,se(w)):(lt===i.TEXTURE_2D||lt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,at,lt,gt.__webglTexture,ot),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Xt(z,w,tt){if(i.bindRenderbuffer(i.RENDERBUFFER,z),w.depthBuffer){const at=w.depthTexture,lt=at&&at.isDepthTexture?at.type:null,ot=_(w.stencilBuffer,lt),Ut=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=se(w);mt(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,ot,w.width,w.height):tt?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,ot,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,ot,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ut,i.RENDERBUFFER,z)}else{const at=w.textures;for(let lt=0;lt<at.length;lt++){const ot=at[lt],Ut=r.convert(ot.format,ot.colorSpace),ct=r.convert(ot.type),St=y(ot.internalFormat,Ut,ct,ot.colorSpace),Pt=se(w);tt&&mt(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt,St,w.width,w.height):mt(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pt,St,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,St,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function kt(z,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,z),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const at=n.get(w.depthTexture);at.__renderTarget=w,(!at.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),H(w.depthTexture,0);const lt=at.__webglTexture,ot=se(w);if(w.depthTexture.format===uo)mt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,lt,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,lt,0);else if(w.depthTexture.format===fo)mt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,lt,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,lt,0);else throw new Error("Unknown depthTexture format")}function fe(z){const w=n.get(z),tt=z.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==z.depthTexture){const at=z.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),at){const lt=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,at.removeEventListener("dispose",lt)};at.addEventListener("dispose",lt),w.__depthDisposeCallback=lt}w.__boundDepthTexture=at}if(z.depthTexture&&!w.__autoAllocateDepthBuffer){if(tt)throw new Error("target.depthTexture not supported in Cube render targets");const at=z.texture.mipmaps;at&&at.length>0?kt(w.__webglFramebuffer[0],z):kt(w.__webglFramebuffer,z)}else if(tt){w.__webglDepthbuffer=[];for(let at=0;at<6;at++)if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[at]),w.__webglDepthbuffer[at]===void 0)w.__webglDepthbuffer[at]=i.createRenderbuffer(),Xt(w.__webglDepthbuffer[at],z,!1);else{const lt=z.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=w.__webglDepthbuffer[at];i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,ot)}}else{const at=z.texture.mipmaps;if(at&&at.length>0?e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),Xt(w.__webglDepthbuffer,z,!1);else{const lt=z.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,ot)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ee(z,w,tt){const at=n.get(z);w!==void 0&&_t(at.__webglFramebuffer,z,z.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),tt!==void 0&&fe(z)}function D(z){const w=z.texture,tt=n.get(z),at=n.get(w);z.addEventListener("dispose",E);const lt=z.textures,ot=z.isWebGLCubeRenderTarget===!0,Ut=lt.length>1;if(Ut||(at.__webglTexture===void 0&&(at.__webglTexture=i.createTexture()),at.__version=w.version,o.memory.textures++),ot){tt.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(w.mipmaps&&w.mipmaps.length>0){tt.__webglFramebuffer[ct]=[];for(let St=0;St<w.mipmaps.length;St++)tt.__webglFramebuffer[ct][St]=i.createFramebuffer()}else tt.__webglFramebuffer[ct]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){tt.__webglFramebuffer=[];for(let ct=0;ct<w.mipmaps.length;ct++)tt.__webglFramebuffer[ct]=i.createFramebuffer()}else tt.__webglFramebuffer=i.createFramebuffer();if(Ut)for(let ct=0,St=lt.length;ct<St;ct++){const Pt=n.get(lt[ct]);Pt.__webglTexture===void 0&&(Pt.__webglTexture=i.createTexture(),o.memory.textures++)}if(z.samples>0&&mt(z)===!1){tt.__webglMultisampledFramebuffer=i.createFramebuffer(),tt.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,tt.__webglMultisampledFramebuffer);for(let ct=0;ct<lt.length;ct++){const St=lt[ct];tt.__webglColorRenderbuffer[ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,tt.__webglColorRenderbuffer[ct]);const Pt=r.convert(St.format,St.colorSpace),gt=r.convert(St.type),Rt=y(St.internalFormat,Pt,gt,St.colorSpace,z.isXRRenderTarget===!0),jt=se(z);i.renderbufferStorageMultisample(i.RENDERBUFFER,jt,Rt,z.width,z.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,tt.__webglColorRenderbuffer[ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),z.depthBuffer&&(tt.__webglDepthRenderbuffer=i.createRenderbuffer(),Xt(tt.__webglDepthRenderbuffer,z,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ot){e.bindTexture(i.TEXTURE_CUBE_MAP,at.__webglTexture),Vt(i.TEXTURE_CUBE_MAP,w);for(let ct=0;ct<6;ct++)if(w.mipmaps&&w.mipmaps.length>0)for(let St=0;St<w.mipmaps.length;St++)_t(tt.__webglFramebuffer[ct][St],z,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,St);else _t(tt.__webglFramebuffer[ct],z,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);x(w)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ut){for(let ct=0,St=lt.length;ct<St;ct++){const Pt=lt[ct],gt=n.get(Pt);let Rt=i.TEXTURE_2D;(z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(Rt=z.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Rt,gt.__webglTexture),Vt(Rt,Pt),_t(tt.__webglFramebuffer,z,Pt,i.COLOR_ATTACHMENT0+ct,Rt,0),x(Pt)&&p(Rt)}e.unbindTexture()}else{let ct=i.TEXTURE_2D;if((z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(ct=z.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ct,at.__webglTexture),Vt(ct,w),w.mipmaps&&w.mipmaps.length>0)for(let St=0;St<w.mipmaps.length;St++)_t(tt.__webglFramebuffer[St],z,w,i.COLOR_ATTACHMENT0,ct,St);else _t(tt.__webglFramebuffer,z,w,i.COLOR_ATTACHMENT0,ct,0);x(w)&&p(ct),e.unbindTexture()}z.depthBuffer&&fe(z)}function ne(z){const w=z.textures;for(let tt=0,at=w.length;tt<at;tt++){const lt=w[tt];if(x(lt)){const ot=v(z),Ut=n.get(lt).__webglTexture;e.bindTexture(ot,Ut),p(ot),e.unbindTexture()}}}const Yt=[],qt=[];function Lt(z){if(z.samples>0){if(mt(z)===!1){const w=z.textures,tt=z.width,at=z.height;let lt=i.COLOR_BUFFER_BIT;const ot=z.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ut=n.get(z),ct=w.length>1;if(ct)for(let Pt=0;Pt<w.length;Pt++)e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer);const St=z.texture.mipmaps;St&&St.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer);for(let Pt=0;Pt<w.length;Pt++){if(z.resolveDepthBuffer&&(z.depthBuffer&&(lt|=i.DEPTH_BUFFER_BIT),z.stencilBuffer&&z.resolveStencilBuffer&&(lt|=i.STENCIL_BUFFER_BIT)),ct){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ut.__webglColorRenderbuffer[Pt]);const gt=n.get(w[Pt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,gt,0)}i.blitFramebuffer(0,0,tt,at,0,0,tt,at,lt,i.NEAREST),l===!0&&(Yt.length=0,qt.length=0,Yt.push(i.COLOR_ATTACHMENT0+Pt),z.depthBuffer&&z.resolveDepthBuffer===!1&&(Yt.push(ot),qt.push(ot),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,qt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Yt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ct)for(let Pt=0;Pt<w.length;Pt++){e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.RENDERBUFFER,Ut.__webglColorRenderbuffer[Pt]);const gt=n.get(w[Pt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.TEXTURE_2D,gt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer)}else if(z.depthBuffer&&z.resolveDepthBuffer===!1&&l){const w=z.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function se(z){return Math.min(s.maxSamples,z.samples)}function mt(z){const w=n.get(z);return z.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Mt(z){const w=o.render.frame;h.get(z)!==w&&(h.set(z,w),z.update())}function le(z,w){const tt=z.colorSpace,at=z.format,lt=z.type;return z.isCompressedTexture===!0||z.isVideoTexture===!0||tt!==Ar&&tt!==Di&&(Ue.getTransfer(tt)===Ve?(at!==Vn||lt!==xi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",tt)),w}function De(z){return typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement?(c.width=z.naturalWidth||z.width,c.height=z.naturalHeight||z.height):typeof VideoFrame<"u"&&z instanceof VideoFrame?(c.width=z.displayWidth,c.height=z.displayHeight):(c.width=z.width,c.height=z.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=P,this.setTexture2D=H,this.setTexture2DArray=q,this.setTexture3D=B,this.setTextureCube=O,this.rebindTextures=Ee,this.setupRenderTarget=D,this.updateRenderTargetMipmap=ne,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=fe,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=mt}function by(i,t){function e(n,s=Di){let r;const o=Ue.getTransfer(s);if(n===xi)return i.UNSIGNED_BYTE;if(n===jc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Kc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===wd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ed)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===bd)return i.BYTE;if(n===Sd)return i.SHORT;if(n===co)return i.UNSIGNED_SHORT;if(n===Zc)return i.INT;if(n===zs)return i.UNSIGNED_INT;if(n===ai)return i.FLOAT;if(n===_o)return i.HALF_FLOAT;if(n===Td)return i.ALPHA;if(n===Ad)return i.RGB;if(n===Vn)return i.RGBA;if(n===uo)return i.DEPTH_COMPONENT;if(n===fo)return i.DEPTH_STENCIL;if(n===Jc)return i.RED;if(n===Qc)return i.RED_INTEGER;if(n===Rd)return i.RG;if(n===th)return i.RG_INTEGER;if(n===eh)return i.RGBA_INTEGER;if(n===xa||n===va||n===ya||n===_a)if(o===Ve)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===xa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===va)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ya)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===_a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===xa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===va)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ya)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===_a)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===hc||n===uc||n===dc||n===fc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===hc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===uc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===dc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===fc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===pc||n===mc||n===gc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===pc||n===mc)return o===Ve?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===gc)return o===Ve?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===xc||n===vc||n===yc||n===_c||n===Mc||n===bc||n===Sc||n===wc||n===Ec||n===Tc||n===Ac||n===Rc||n===Cc||n===Pc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===xc)return o===Ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===vc)return o===Ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===yc)return o===Ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===_c)return o===Ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Mc)return o===Ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===bc)return o===Ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Sc)return o===Ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===wc)return o===Ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ec)return o===Ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Tc)return o===Ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ac)return o===Ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Rc)return o===Ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Cc)return o===Ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Pc)return o===Ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===zc||n===Dc||n===Ic)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===zc)return o===Ve?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Dc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ic)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Lc||n===Uc||n===Nc||n===kc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Lc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Uc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Nc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===kc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ho?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const Sy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,wy=`
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

}`;class Ey{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Bd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Kn({vertexShader:Sy,fragmentShader:wy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Zt(new Ui(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ty extends Pr{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null;const g=typeof XRWebGLBinding<"u",x=new Ey,p={},v=e.getContextAttributes();let y=null,_=null;const T=[],A=[],E=new Wt;let R=null;const S=new Nn;S.viewport=new Ie;const b=new Nn;b.viewport=new Ie;const U=[S,b],P=new $m;let G=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let rt=T[Y];return rt===void 0&&(rt=new gl,T[Y]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(Y){let rt=T[Y];return rt===void 0&&(rt=new gl,T[Y]=rt),rt.getGripSpace()},this.getHand=function(Y){let rt=T[Y];return rt===void 0&&(rt=new gl,T[Y]=rt),rt.getHandSpace()};function H(Y){const rt=A.indexOf(Y.inputSource);if(rt===-1)return;const _t=T[rt];_t!==void 0&&(_t.update(Y.inputSource,Y.frame,c||o),_t.dispatchEvent({type:Y.type,data:Y.inputSource}))}function q(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",B);for(let Y=0;Y<T.length;Y++){const rt=A[Y];rt!==null&&(A[Y]=null,T[Y].disconnect(rt))}G=null,j=null,x.reset();for(const Y in p)delete p[Y];t.setRenderTarget(y),f=null,d=null,u=null,s=null,_=null,ht.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&g&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",q),s.addEventListener("inputsourceschange",B),v.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(E),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let _t=null,Xt=null,kt=null;v.depth&&(kt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,_t=v.stencil?fo:uo,Xt=v.stencil?ho:zs);const fe={colorFormat:e.RGBA8,depthFormat:kt,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(fe),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new cs(d.textureWidth,d.textureHeight,{format:Vn,type:xi,depthTexture:new Od(d.textureWidth,d.textureHeight,Xt,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const _t={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,_t),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new cs(f.framebufferWidth,f.framebufferHeight,{format:Vn,type:xi,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ht.setContext(s),ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function B(Y){for(let rt=0;rt<Y.removed.length;rt++){const _t=Y.removed[rt],Xt=A.indexOf(_t);Xt>=0&&(A[Xt]=null,T[Xt].disconnect(_t))}for(let rt=0;rt<Y.added.length;rt++){const _t=Y.added[rt];let Xt=A.indexOf(_t);if(Xt===-1){for(let fe=0;fe<T.length;fe++)if(fe>=A.length){A.push(_t),Xt=fe;break}else if(A[fe]===null){A[fe]=_t,Xt=fe;break}if(Xt===-1)break}const kt=T[Xt];kt&&kt.connect(_t)}}const O=new L,Q=new L;function W(Y,rt,_t){O.setFromMatrixPosition(rt.matrixWorld),Q.setFromMatrixPosition(_t.matrixWorld);const Xt=O.distanceTo(Q),kt=rt.projectionMatrix.elements,fe=_t.projectionMatrix.elements,Ee=kt[14]/(kt[10]-1),D=kt[14]/(kt[10]+1),ne=(kt[9]+1)/kt[5],Yt=(kt[9]-1)/kt[5],qt=(kt[8]-1)/kt[0],Lt=(fe[8]+1)/fe[0],se=Ee*qt,mt=Ee*Lt,Mt=Xt/(-qt+Lt),le=Mt*-qt;if(rt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(le),Y.translateZ(Mt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),kt[10]===-1)Y.projectionMatrix.copy(rt.projectionMatrix),Y.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const De=Ee+Mt,z=D+Mt,w=se-le,tt=mt+(Xt-le),at=ne*D/z*De,lt=Yt*D/z*De;Y.projectionMatrix.makePerspective(w,tt,at,lt,De,z),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ft(Y,rt){rt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(rt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let rt=Y.near,_t=Y.far;x.texture!==null&&(x.depthNear>0&&(rt=x.depthNear),x.depthFar>0&&(_t=x.depthFar)),P.near=b.near=S.near=rt,P.far=b.far=S.far=_t,(G!==P.near||j!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),G=P.near,j=P.far),P.layers.mask=Y.layers.mask|6,S.layers.mask=P.layers.mask&3,b.layers.mask=P.layers.mask&5;const Xt=Y.parent,kt=P.cameras;ft(P,Xt);for(let fe=0;fe<kt.length;fe++)ft(kt[fe],Xt);kt.length===2?W(P,S,b):P.projectionMatrix.copy(S.projectionMatrix),Vt(Y,P,Xt)};function Vt(Y,rt,_t){_t===null?Y.matrix.copy(rt.matrixWorld):(Y.matrix.copy(_t.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(rt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(rt.projectionMatrix),Y.projectionMatrixInverse.copy(rt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=po*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(P)},this.getCameraTexture=function(Y){return p[Y]};let Me=null;function ce(Y,rt){if(h=rt.getViewerPose(c||o),m=rt,h!==null){const _t=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let Xt=!1;_t.length!==P.cameras.length&&(P.cameras.length=0,Xt=!0);for(let D=0;D<_t.length;D++){const ne=_t[D];let Yt=null;if(f!==null)Yt=f.getViewport(ne);else{const Lt=u.getViewSubImage(d,ne);Yt=Lt.viewport,D===0&&(t.setRenderTargetTextures(_,Lt.colorTexture,Lt.depthStencilTexture),t.setRenderTarget(_))}let qt=U[D];qt===void 0&&(qt=new Nn,qt.layers.enable(D),qt.viewport=new Ie,U[D]=qt),qt.matrix.fromArray(ne.transform.matrix),qt.matrix.decompose(qt.position,qt.quaternion,qt.scale),qt.projectionMatrix.fromArray(ne.projectionMatrix),qt.projectionMatrixInverse.copy(qt.projectionMatrix).invert(),qt.viewport.set(Yt.x,Yt.y,Yt.width,Yt.height),D===0&&(P.matrix.copy(qt.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Xt===!0&&P.cameras.push(qt)}const kt=s.enabledFeatures;if(kt&&kt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&g){u=n.getBinding();const D=u.getDepthInformation(_t[0]);D&&D.isValid&&D.texture&&x.init(D,s.renderState)}if(kt&&kt.includes("camera-access")&&g){t.state.unbindTexture(),u=n.getBinding();for(let D=0;D<_t.length;D++){const ne=_t[D].camera;if(ne){let Yt=p[ne];Yt||(Yt=new Bd,p[ne]=Yt);const qt=u.getCameraImage(ne);Yt.sourceTexture=qt}}}}for(let _t=0;_t<T.length;_t++){const Xt=A[_t],kt=T[_t];Xt!==null&&kt!==void 0&&kt.update(Xt,rt,c||o)}Me&&Me(Y,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),m=null}const ht=new $d;ht.setAnimationLoop(ce),this.setAnimationLoop=function(Y){Me=Y},this.dispose=function(){}}}const Ss=new vi,Ay=new he;function Ry(i,t){function e(x,p){x.matrixAutoUpdate===!0&&x.updateMatrix(),p.value.copy(x.matrix)}function n(x,p){p.color.getRGB(x.fogColor.value,Ld(i)),p.isFog?(x.fogNear.value=p.near,x.fogFar.value=p.far):p.isFogExp2&&(x.fogDensity.value=p.density)}function s(x,p,v,y,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(x,p):p.isMeshToonMaterial?(r(x,p),u(x,p)):p.isMeshPhongMaterial?(r(x,p),h(x,p)):p.isMeshStandardMaterial?(r(x,p),d(x,p),p.isMeshPhysicalMaterial&&f(x,p,_)):p.isMeshMatcapMaterial?(r(x,p),m(x,p)):p.isMeshDepthMaterial?r(x,p):p.isMeshDistanceMaterial?(r(x,p),g(x,p)):p.isMeshNormalMaterial?r(x,p):p.isLineBasicMaterial?(o(x,p),p.isLineDashedMaterial&&a(x,p)):p.isPointsMaterial?l(x,p,v,y):p.isSpriteMaterial?c(x,p):p.isShadowMaterial?(x.color.value.copy(p.color),x.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(x,p){x.opacity.value=p.opacity,p.color&&x.diffuse.value.copy(p.color),p.emissive&&x.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(x.map.value=p.map,e(p.map,x.mapTransform)),p.alphaMap&&(x.alphaMap.value=p.alphaMap,e(p.alphaMap,x.alphaMapTransform)),p.bumpMap&&(x.bumpMap.value=p.bumpMap,e(p.bumpMap,x.bumpMapTransform),x.bumpScale.value=p.bumpScale,p.side===In&&(x.bumpScale.value*=-1)),p.normalMap&&(x.normalMap.value=p.normalMap,e(p.normalMap,x.normalMapTransform),x.normalScale.value.copy(p.normalScale),p.side===In&&x.normalScale.value.negate()),p.displacementMap&&(x.displacementMap.value=p.displacementMap,e(p.displacementMap,x.displacementMapTransform),x.displacementScale.value=p.displacementScale,x.displacementBias.value=p.displacementBias),p.emissiveMap&&(x.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,x.emissiveMapTransform)),p.specularMap&&(x.specularMap.value=p.specularMap,e(p.specularMap,x.specularMapTransform)),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest);const v=t.get(p),y=v.envMap,_=v.envMapRotation;y&&(x.envMap.value=y,Ss.copy(_),Ss.x*=-1,Ss.y*=-1,Ss.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ss.y*=-1,Ss.z*=-1),x.envMapRotation.value.setFromMatrix4(Ay.makeRotationFromEuler(Ss)),x.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=p.reflectivity,x.ior.value=p.ior,x.refractionRatio.value=p.refractionRatio),p.lightMap&&(x.lightMap.value=p.lightMap,x.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,x.lightMapTransform)),p.aoMap&&(x.aoMap.value=p.aoMap,x.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,x.aoMapTransform))}function o(x,p){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity,p.map&&(x.map.value=p.map,e(p.map,x.mapTransform))}function a(x,p){x.dashSize.value=p.dashSize,x.totalSize.value=p.dashSize+p.gapSize,x.scale.value=p.scale}function l(x,p,v,y){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity,x.size.value=p.size*v,x.scale.value=y*.5,p.map&&(x.map.value=p.map,e(p.map,x.uvTransform)),p.alphaMap&&(x.alphaMap.value=p.alphaMap,e(p.alphaMap,x.alphaMapTransform)),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest)}function c(x,p){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity,x.rotation.value=p.rotation,p.map&&(x.map.value=p.map,e(p.map,x.mapTransform)),p.alphaMap&&(x.alphaMap.value=p.alphaMap,e(p.alphaMap,x.alphaMapTransform)),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest)}function h(x,p){x.specular.value.copy(p.specular),x.shininess.value=Math.max(p.shininess,1e-4)}function u(x,p){p.gradientMap&&(x.gradientMap.value=p.gradientMap)}function d(x,p){x.metalness.value=p.metalness,p.metalnessMap&&(x.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,x.metalnessMapTransform)),x.roughness.value=p.roughness,p.roughnessMap&&(x.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,x.roughnessMapTransform)),p.envMap&&(x.envMapIntensity.value=p.envMapIntensity)}function f(x,p,v){x.ior.value=p.ior,p.sheen>0&&(x.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),x.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(x.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,x.sheenColorMapTransform)),p.sheenRoughnessMap&&(x.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,x.sheenRoughnessMapTransform))),p.clearcoat>0&&(x.clearcoat.value=p.clearcoat,x.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(x.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,x.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(x.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===In&&x.clearcoatNormalScale.value.negate())),p.dispersion>0&&(x.dispersion.value=p.dispersion),p.iridescence>0&&(x.iridescence.value=p.iridescence,x.iridescenceIOR.value=p.iridescenceIOR,x.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(x.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,x.iridescenceMapTransform)),p.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),p.transmission>0&&(x.transmission.value=p.transmission,x.transmissionSamplerMap.value=v.texture,x.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(x.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,x.transmissionMapTransform)),x.thickness.value=p.thickness,p.thicknessMap&&(x.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=p.attenuationDistance,x.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(x.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(x.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=p.specularIntensity,x.specularColor.value.copy(p.specularColor),p.specularColorMap&&(x.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,x.specularColorMapTransform)),p.specularIntensityMap&&(x.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,x.specularIntensityMapTransform))}function m(x,p){p.matcap&&(x.matcap.value=p.matcap)}function g(x,p){const v=t.get(p).light;x.referencePosition.value.setFromMatrixPosition(v.matrixWorld),x.nearDistance.value=v.shadow.camera.near,x.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Cy(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){const _=y.program;n.uniformBlockBinding(v,_)}function c(v,y){let _=s[v.id];_===void 0&&(m(v),_=h(v),s[v.id]=_,v.addEventListener("dispose",x));const T=y.program;n.updateUBOMapping(v,T);const A=t.render.frame;r[v.id]!==A&&(d(v),r[v.id]=A)}function h(v){const y=u();v.__bindingPointIndex=y;const _=i.createBuffer(),T=v.__size,A=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,T,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,_),_}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const y=s[v.id],_=v.uniforms,T=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let A=0,E=_.length;A<E;A++){const R=Array.isArray(_[A])?_[A]:[_[A]];for(let S=0,b=R.length;S<b;S++){const U=R[S];if(f(U,A,S,T)===!0){const P=U.__offset,G=Array.isArray(U.value)?U.value:[U.value];let j=0;for(let H=0;H<G.length;H++){const q=G[H],B=g(q);typeof q=="number"||typeof q=="boolean"?(U.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,P+j,U.__data)):q.isMatrix3?(U.__data[0]=q.elements[0],U.__data[1]=q.elements[1],U.__data[2]=q.elements[2],U.__data[3]=0,U.__data[4]=q.elements[3],U.__data[5]=q.elements[4],U.__data[6]=q.elements[5],U.__data[7]=0,U.__data[8]=q.elements[6],U.__data[9]=q.elements[7],U.__data[10]=q.elements[8],U.__data[11]=0):(q.toArray(U.__data,j),j+=B.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,P,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,y,_,T){const A=v.value,E=y+"_"+_;if(T[E]===void 0)return typeof A=="number"||typeof A=="boolean"?T[E]=A:T[E]=A.clone(),!0;{const R=T[E];if(typeof A=="number"||typeof A=="boolean"){if(R!==A)return T[E]=A,!0}else if(R.equals(A)===!1)return R.copy(A),!0}return!1}function m(v){const y=v.uniforms;let _=0;const T=16;for(let E=0,R=y.length;E<R;E++){const S=Array.isArray(y[E])?y[E]:[y[E]];for(let b=0,U=S.length;b<U;b++){const P=S[b],G=Array.isArray(P.value)?P.value:[P.value];for(let j=0,H=G.length;j<H;j++){const q=G[j],B=g(q),O=_%T,Q=O%B.boundary,W=O+Q;_+=Q,W!==0&&T-W<B.storage&&(_+=T-W),P.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=_,_+=B.storage}}}const A=_%T;return A>0&&(_+=T-A),v.__size=_,v.__cache={},this}function g(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function x(v){const y=v.target;y.removeEventListener("dispose",x);const _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(const v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Py{constructor(t={}){const{canvas:e=Gp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const m=new Uint32Array(4),g=new Int32Array(4);let x=null,p=null;const v=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=as,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let T=!1;this._outputColorSpace=Un;let A=0,E=0,R=null,S=-1,b=null;const U=new Ie,P=new Ie;let G=null;const j=new ee(0);let H=0,q=e.width,B=e.height,O=1,Q=null,W=null;const ft=new Ie(0,0,q,B),Vt=new Ie(0,0,q,B);let Me=!1;const ce=new ch;let ht=!1,Y=!1;const rt=new he,_t=new L,Xt=new Ie,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let fe=!1;function Ee(){return R===null?O:1}let D=n;function ne(C,K){return e.getContext(C,K)}try{const C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Yc}`),e.addEventListener("webglcontextlost",Et,!1),e.addEventListener("webglcontextrestored",Ft,!1),e.addEventListener("webglcontextcreationerror",xt,!1),D===null){const K="webgl2";if(D=ne(K,C),D===null)throw ne(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let Yt,qt,Lt,se,mt,Mt,le,De,z,w,tt,at,lt,ot,Ut,ct,St,Pt,gt,Rt,jt,Ot,wt,ue;function $(){Yt=new Bx(D),Yt.init(),Ot=new by(D,Yt),qt=new Ix(D,Yt,t,Ot),Lt=new _y(D,Yt),qt.reversedDepthBuffer&&d&&Lt.buffers.depth.setReversed(!0),se=new Vx(D),mt=new ay,Mt=new My(D,Yt,Lt,mt,qt,Ot,se),le=new Ux(_),De=new Ox(_),z=new Zm(D),wt=new zx(D,z),w=new Hx(D,z,se,wt),tt=new Xx(D,w,z,se),gt=new Wx(D,qt,Mt),ct=new Lx(mt),at=new oy(_,le,De,Yt,qt,wt,ct),lt=new Ry(_,mt),ot=new cy,Ut=new my(Yt),Pt=new Px(_,le,De,Lt,tt,f,l),St=new vy(_,tt,qt),ue=new Cy(D,se,qt,Lt),Rt=new Dx(D,Yt,se),jt=new Gx(D,Yt,se),se.programs=at.programs,_.capabilities=qt,_.extensions=Yt,_.properties=mt,_.renderLists=ot,_.shadowMap=St,_.state=Lt,_.info=se}$();const yt=new Ty(_,D);this.xr=yt,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const C=Yt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Yt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(C){C!==void 0&&(O=C,this.setSize(q,B,!1))},this.getSize=function(C){return C.set(q,B)},this.setSize=function(C,K,et=!0){if(yt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=C,B=K,e.width=Math.floor(C*O),e.height=Math.floor(K*O),et===!0&&(e.style.width=C+"px",e.style.height=K+"px"),this.setViewport(0,0,C,K)},this.getDrawingBufferSize=function(C){return C.set(q*O,B*O).floor()},this.setDrawingBufferSize=function(C,K,et){q=C,B=K,O=et,e.width=Math.floor(C*et),e.height=Math.floor(K*et),this.setViewport(0,0,C,K)},this.getCurrentViewport=function(C){return C.copy(U)},this.getViewport=function(C){return C.copy(ft)},this.setViewport=function(C,K,et,nt){C.isVector4?ft.set(C.x,C.y,C.z,C.w):ft.set(C,K,et,nt),Lt.viewport(U.copy(ft).multiplyScalar(O).round())},this.getScissor=function(C){return C.copy(Vt)},this.setScissor=function(C,K,et,nt){C.isVector4?Vt.set(C.x,C.y,C.z,C.w):Vt.set(C,K,et,nt),Lt.scissor(P.copy(Vt).multiplyScalar(O).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(C){Lt.setScissorTest(Me=C)},this.setOpaqueSort=function(C){Q=C},this.setTransparentSort=function(C){W=C},this.getClearColor=function(C){return C.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor(...arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha(...arguments)},this.clear=function(C=!0,K=!0,et=!0){let nt=0;if(C){let J=!1;if(R!==null){const vt=R.texture.format;J=vt===eh||vt===th||vt===Qc}if(J){const vt=R.texture.type,Dt=vt===xi||vt===zs||vt===co||vt===ho||vt===jc||vt===Kc,Ht=Pt.getClearColor(),zt=Pt.getClearAlpha(),Kt=Ht.r,oe=Ht.g,Jt=Ht.b;Dt?(m[0]=Kt,m[1]=oe,m[2]=Jt,m[3]=zt,D.clearBufferuiv(D.COLOR,0,m)):(g[0]=Kt,g[1]=oe,g[2]=Jt,g[3]=zt,D.clearBufferiv(D.COLOR,0,g))}else nt|=D.COLOR_BUFFER_BIT}K&&(nt|=D.DEPTH_BUFFER_BIT),et&&(nt|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Et,!1),e.removeEventListener("webglcontextrestored",Ft,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),Pt.dispose(),ot.dispose(),Ut.dispose(),mt.dispose(),le.dispose(),De.dispose(),tt.dispose(),wt.dispose(),ue.dispose(),at.dispose(),yt.dispose(),yt.removeEventListener("sessionstart",On),yt.removeEventListener("sessionend",Ir),li.stop()};function Et(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Ft(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const C=se.autoReset,K=St.enabled,et=St.autoUpdate,nt=St.needsUpdate,J=St.type;$(),se.autoReset=C,St.enabled=K,St.autoUpdate=et,St.needsUpdate=nt,St.type=J}function xt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ut(C){const K=C.target;K.removeEventListener("dispose",ut),Bt(K)}function Bt(C){de(C),mt.remove(C)}function de(C){const K=mt.get(C).programs;K!==void 0&&(K.forEach(function(et){at.releaseProgram(et)}),C.isShaderMaterial&&at.releaseShaderCache(C))}this.renderBufferDirect=function(C,K,et,nt,J,vt){K===null&&(K=kt);const Dt=J.isMesh&&J.matrixWorld.determinant()<0,Ht=Wa(C,K,et,nt,J);Lt.setMaterial(nt,Dt);let zt=et.index,Kt=1;if(nt.wireframe===!0){if(zt=w.getWireframeAttribute(et),zt===void 0)return;Kt=2}const oe=et.drawRange,Jt=et.attributes.position;let be=oe.start*Kt,Ne=(oe.start+oe.count)*Kt;vt!==null&&(be=Math.max(be,vt.start*Kt),Ne=Math.min(Ne,(vt.start+vt.count)*Kt)),zt!==null?(be=Math.max(be,0),Ne=Math.min(Ne,zt.count)):Jt!=null&&(be=Math.max(be,0),Ne=Math.min(Ne,Jt.count));const He=Ne-be;if(He<0||He===1/0)return;wt.setup(J,nt,Ht,et,zt);let ke,Te=Rt;if(zt!==null&&(ke=z.get(zt),Te=jt,Te.setIndex(ke)),J.isMesh)nt.wireframe===!0?(Lt.setLineWidth(nt.wireframeLinewidth*Ee()),Te.setMode(D.LINES)):Te.setMode(D.TRIANGLES);else if(J.isLine){let Qt=nt.linewidth;Qt===void 0&&(Qt=1),Lt.setLineWidth(Qt*Ee()),J.isLineSegments?Te.setMode(D.LINES):J.isLineLoop?Te.setMode(D.LINE_LOOP):Te.setMode(D.LINE_STRIP)}else J.isPoints?Te.setMode(D.POINTS):J.isSprite&&Te.setMode(D.TRIANGLES);if(J.isBatchedMesh)if(J._multiDrawInstances!==null)mo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Te.renderMultiDrawInstances(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount,J._multiDrawInstances);else if(Yt.get("WEBGL_multi_draw"))Te.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{const Qt=J._multiDrawStarts,qe=J._multiDrawCounts,Ae=J._multiDrawCount,Mn=zt?z.get(zt).bytesPerElement:1,bi=mt.get(nt).currentProgram.getUniforms();for(let gn=0;gn<Ae;gn++)bi.setValue(D,"_gl_DrawID",gn),Te.render(Qt[gn]/Mn,qe[gn])}else if(J.isInstancedMesh)Te.renderInstances(be,He,J.count);else if(et.isInstancedBufferGeometry){const Qt=et._maxInstanceCount!==void 0?et._maxInstanceCount:1/0,qe=Math.min(et.instanceCount,Qt);Te.renderInstances(be,He,qe)}else Te.render(be,He)};function Be(C,K,et){C.transparent===!0&&C.side===Pe&&C.forceSinglePass===!1?(C.side=In,C.needsUpdate=!0,Os(C,K,et),C.side=Oi,C.needsUpdate=!0,Os(C,K,et),C.side=Pe):Os(C,K,et)}this.compile=function(C,K,et=null){et===null&&(et=C),p=Ut.get(et),p.init(K),y.push(p),et.traverseVisible(function(J){J.isLight&&J.layers.test(K.layers)&&(p.pushLight(J),J.castShadow&&p.pushShadow(J))}),C!==et&&C.traverseVisible(function(J){J.isLight&&J.layers.test(K.layers)&&(p.pushLight(J),J.castShadow&&p.pushShadow(J))}),p.setupLights();const nt=new Set;return C.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;const vt=J.material;if(vt)if(Array.isArray(vt))for(let Dt=0;Dt<vt.length;Dt++){const Ht=vt[Dt];Be(Ht,et,J),nt.add(Ht)}else Be(vt,et,J),nt.add(vt)}),p=y.pop(),nt},this.compileAsync=function(C,K,et=null){const nt=this.compile(C,K,et);return new Promise(J=>{function vt(){if(nt.forEach(function(Dt){mt.get(Dt).currentProgram.isReady()&&nt.delete(Dt)}),nt.size===0){J(C);return}setTimeout(vt,10)}Yt.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let ve=null;function An(C){ve&&ve(C)}function On(){li.stop()}function Ir(){li.start()}const li=new $d;li.setAnimationLoop(An),typeof self<"u"&&li.setContext(self),this.setAnimationLoop=function(C){ve=C,yt.setAnimationLoop(C),C===null?li.stop():li.start()},yt.addEventListener("sessionstart",On),yt.addEventListener("sessionend",Ir),this.render=function(C,K){if(K!==void 0&&K.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),yt.enabled===!0&&yt.isPresenting===!0&&(yt.cameraAutoUpdate===!0&&yt.updateCamera(K),K=yt.getCamera()),C.isScene===!0&&C.onBeforeRender(_,C,K,R),p=Ut.get(C,y.length),p.init(K),y.push(p),rt.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),ce.setFromProjectionMatrix(rt,mi,K.reversedDepth),Y=this.localClippingEnabled,ht=ct.init(this.clippingPlanes,Y),x=ot.get(C,v.length),x.init(),v.push(x),yt.enabled===!0&&yt.isPresenting===!0){const vt=_.xr.getDepthSensingMesh();vt!==null&&Lr(vt,K,-1/0,_.sortObjects)}Lr(C,K,0,_.sortObjects),x.finish(),_.sortObjects===!0&&x.sort(Q,W),fe=yt.enabled===!1||yt.isPresenting===!1||yt.hasDepthSensing()===!1,fe&&Pt.addToRenderList(x,C),this.info.render.frame++,ht===!0&&ct.beginShadows();const et=p.state.shadowsArray;St.render(et,C,K),ht===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const nt=x.opaque,J=x.transmissive;if(p.setupLights(),K.isArrayCamera){const vt=K.cameras;if(J.length>0)for(let Dt=0,Ht=vt.length;Dt<Ht;Dt++){const zt=vt[Dt];ps(nt,J,C,zt)}fe&&Pt.render(C);for(let Dt=0,Ht=vt.length;Dt<Ht;Dt++){const zt=vt[Dt];Ur(x,C,zt,zt.viewport)}}else J.length>0&&ps(nt,J,C,K),fe&&Pt.render(C),Ur(x,C,K);R!==null&&E===0&&(Mt.updateMultisampleRenderTarget(R),Mt.updateRenderTargetMipmap(R)),C.isScene===!0&&C.onAfterRender(_,C,K),wt.resetDefaultState(),S=-1,b=null,y.pop(),y.length>0?(p=y[y.length-1],ht===!0&&ct.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?x=v[v.length-1]:x=null};function Lr(C,K,et,nt){if(C.visible===!1)return;if(C.layers.test(K.layers)){if(C.isGroup)et=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(K);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||ce.intersectsSprite(C)){nt&&Xt.setFromMatrixPosition(C.matrixWorld).applyMatrix4(rt);const Dt=tt.update(C),Ht=C.material;Ht.visible&&x.push(C,Dt,Ht,et,Xt.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||ce.intersectsObject(C))){const Dt=tt.update(C),Ht=C.material;if(nt&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Xt.copy(C.boundingSphere.center)):(Dt.boundingSphere===null&&Dt.computeBoundingSphere(),Xt.copy(Dt.boundingSphere.center)),Xt.applyMatrix4(C.matrixWorld).applyMatrix4(rt)),Array.isArray(Ht)){const zt=Dt.groups;for(let Kt=0,oe=zt.length;Kt<oe;Kt++){const Jt=zt[Kt],be=Ht[Jt.materialIndex];be&&be.visible&&x.push(C,Dt,be,et,Xt.z,Jt)}}else Ht.visible&&x.push(C,Dt,Ht,et,Xt.z,null)}}const vt=C.children;for(let Dt=0,Ht=vt.length;Dt<Ht;Dt++)Lr(vt[Dt],K,et,nt)}function Ur(C,K,et,nt){const J=C.opaque,vt=C.transmissive,Dt=C.transparent;p.setupLightsView(et),ht===!0&&ct.setGlobalState(_.clippingPlanes,et),nt&&Lt.viewport(U.copy(nt)),J.length>0&&Fs(J,K,et),vt.length>0&&Fs(vt,K,et),Dt.length>0&&Fs(Dt,K,et),Lt.buffers.depth.setTest(!0),Lt.buffers.depth.setMask(!0),Lt.buffers.color.setMask(!0),Lt.setPolygonOffset(!1)}function ps(C,K,et,nt){if((et.isScene===!0?et.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[nt.id]===void 0&&(p.state.transmissionRenderTarget[nt.id]=new cs(1,1,{generateMipmaps:!0,type:Yt.has("EXT_color_buffer_half_float")||Yt.has("EXT_color_buffer_float")?_o:xi,minFilter:ss,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ue.workingColorSpace}));const vt=p.state.transmissionRenderTarget[nt.id],Dt=nt.viewport||U;vt.setSize(Dt.z*_.transmissionResolutionScale,Dt.w*_.transmissionResolutionScale);const Ht=_.getRenderTarget(),zt=_.getActiveCubeFace(),Kt=_.getActiveMipmapLevel();_.setRenderTarget(vt),_.getClearColor(j),H=_.getClearAlpha(),H<1&&_.setClearColor(16777215,.5),_.clear(),fe&&Pt.render(et);const oe=_.toneMapping;_.toneMapping=as;const Jt=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),p.setupLightsView(nt),ht===!0&&ct.setGlobalState(_.clippingPlanes,nt),Fs(C,et,nt),Mt.updateMultisampleRenderTarget(vt),Mt.updateRenderTargetMipmap(vt),Yt.has("WEBGL_multisampled_render_to_texture")===!1){let be=!1;for(let Ne=0,He=K.length;Ne<He;Ne++){const ke=K[Ne],Te=ke.object,Qt=ke.geometry,qe=ke.material,Ae=ke.group;if(qe.side===Pe&&Te.layers.test(nt.layers)){const Mn=qe.side;qe.side=In,qe.needsUpdate=!0,Vi(Te,et,nt,Qt,qe,Ae),qe.side=Mn,qe.needsUpdate=!0,be=!0}}be===!0&&(Mt.updateMultisampleRenderTarget(vt),Mt.updateRenderTargetMipmap(vt))}_.setRenderTarget(Ht,zt,Kt),_.setClearColor(j,H),Jt!==void 0&&(nt.viewport=Jt),_.toneMapping=oe}function Fs(C,K,et){const nt=K.isScene===!0?K.overrideMaterial:null;for(let J=0,vt=C.length;J<vt;J++){const Dt=C[J],Ht=Dt.object,zt=Dt.geometry,Kt=Dt.group;let oe=Dt.material;oe.allowOverride===!0&&nt!==null&&(oe=nt),Ht.layers.test(et.layers)&&Vi(Ht,K,et,zt,oe,Kt)}}function Vi(C,K,et,nt,J,vt){C.onBeforeRender(_,K,et,nt,J,vt),C.modelViewMatrix.multiplyMatrices(et.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),J.onBeforeRender(_,K,et,nt,C,vt),J.transparent===!0&&J.side===Pe&&J.forceSinglePass===!1?(J.side=In,J.needsUpdate=!0,_.renderBufferDirect(et,K,nt,J,C,vt),J.side=Oi,J.needsUpdate=!0,_.renderBufferDirect(et,K,nt,J,C,vt),J.side=Pe):_.renderBufferDirect(et,K,nt,J,C,vt),C.onAfterRender(_,K,et,nt,J,vt)}function Os(C,K,et){K.isScene!==!0&&(K=kt);const nt=mt.get(C),J=p.state.lights,vt=p.state.shadowsArray,Dt=J.state.version,Ht=at.getParameters(C,J.state,vt,K,et),zt=at.getProgramCacheKey(Ht);let Kt=nt.programs;nt.environment=C.isMeshStandardMaterial?K.environment:null,nt.fog=K.fog,nt.envMap=(C.isMeshStandardMaterial?De:le).get(C.envMap||nt.environment),nt.envMapRotation=nt.environment!==null&&C.envMap===null?K.environmentRotation:C.envMapRotation,Kt===void 0&&(C.addEventListener("dispose",ut),Kt=new Map,nt.programs=Kt);let oe=Kt.get(zt);if(oe!==void 0){if(nt.currentProgram===oe&&nt.lightsStateVersion===Dt)return Bs(C,Ht),oe}else Ht.uniforms=at.getUniforms(C),C.onBeforeCompile(Ht,_),oe=at.acquireProgram(Ht,zt),Kt.set(zt,oe),nt.uniforms=Ht.uniforms;const Jt=nt.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Jt.clippingPlanes=ct.uniform),Bs(C,Ht),nt.needsLights=So(C),nt.lightsStateVersion=Dt,nt.needsLights&&(Jt.ambientLightColor.value=J.state.ambient,Jt.lightProbe.value=J.state.probe,Jt.directionalLights.value=J.state.directional,Jt.directionalLightShadows.value=J.state.directionalShadow,Jt.spotLights.value=J.state.spot,Jt.spotLightShadows.value=J.state.spotShadow,Jt.rectAreaLights.value=J.state.rectArea,Jt.ltc_1.value=J.state.rectAreaLTC1,Jt.ltc_2.value=J.state.rectAreaLTC2,Jt.pointLights.value=J.state.point,Jt.pointLightShadows.value=J.state.pointShadow,Jt.hemisphereLights.value=J.state.hemi,Jt.directionalShadowMap.value=J.state.directionalShadowMap,Jt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Jt.spotShadowMap.value=J.state.spotShadowMap,Jt.spotLightMatrix.value=J.state.spotLightMatrix,Jt.spotLightMap.value=J.state.spotLightMap,Jt.pointShadowMap.value=J.state.pointShadowMap,Jt.pointShadowMatrix.value=J.state.pointShadowMatrix),nt.currentProgram=oe,nt.uniformsList=null,oe}function ci(C){if(C.uniformsList===null){const K=C.currentProgram.getUniforms();C.uniformsList=Ma.seqWithValue(K.seq,C.uniforms)}return C.uniformsList}function Bs(C,K){const et=mt.get(C);et.outputColorSpace=K.outputColorSpace,et.batching=K.batching,et.batchingColor=K.batchingColor,et.instancing=K.instancing,et.instancingColor=K.instancingColor,et.instancingMorph=K.instancingMorph,et.skinning=K.skinning,et.morphTargets=K.morphTargets,et.morphNormals=K.morphNormals,et.morphColors=K.morphColors,et.morphTargetsCount=K.morphTargetsCount,et.numClippingPlanes=K.numClippingPlanes,et.numIntersection=K.numClipIntersection,et.vertexAlphas=K.vertexAlphas,et.vertexTangents=K.vertexTangents,et.toneMapping=K.toneMapping}function Wa(C,K,et,nt,J){K.isScene!==!0&&(K=kt),Mt.resetTextureUnits();const vt=K.fog,Dt=nt.isMeshStandardMaterial?K.environment:null,Ht=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Ar,zt=(nt.isMeshStandardMaterial?De:le).get(nt.envMap||Dt),Kt=nt.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,oe=!!et.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),Jt=!!et.morphAttributes.position,be=!!et.morphAttributes.normal,Ne=!!et.morphAttributes.color;let He=as;nt.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(He=_.toneMapping);const ke=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,Te=ke!==void 0?ke.length:0,Qt=mt.get(nt),qe=p.state.lights;if(ht===!0&&(Y===!0||C!==b)){const pn=C===b&&nt.id===S;ct.setState(nt,C,pn)}let Ae=!1;nt.version===Qt.__version?(Qt.needsLights&&Qt.lightsStateVersion!==qe.state.version||Qt.outputColorSpace!==Ht||J.isBatchedMesh&&Qt.batching===!1||!J.isBatchedMesh&&Qt.batching===!0||J.isBatchedMesh&&Qt.batchingColor===!0&&J.colorTexture===null||J.isBatchedMesh&&Qt.batchingColor===!1&&J.colorTexture!==null||J.isInstancedMesh&&Qt.instancing===!1||!J.isInstancedMesh&&Qt.instancing===!0||J.isSkinnedMesh&&Qt.skinning===!1||!J.isSkinnedMesh&&Qt.skinning===!0||J.isInstancedMesh&&Qt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Qt.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&Qt.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&Qt.instancingMorph===!1&&J.morphTexture!==null||Qt.envMap!==zt||nt.fog===!0&&Qt.fog!==vt||Qt.numClippingPlanes!==void 0&&(Qt.numClippingPlanes!==ct.numPlanes||Qt.numIntersection!==ct.numIntersection)||Qt.vertexAlphas!==Kt||Qt.vertexTangents!==oe||Qt.morphTargets!==Jt||Qt.morphNormals!==be||Qt.morphColors!==Ne||Qt.toneMapping!==He||Qt.morphTargetsCount!==Te)&&(Ae=!0):(Ae=!0,Qt.__version=nt.version);let Mn=Qt.currentProgram;Ae===!0&&(Mn=Os(nt,K,J));let bi=!1,gn=!1,gs=!1;const $e=Mn.getUniforms(),en=Qt.uniforms;if(Lt.useProgram(Mn.program)&&(bi=!0,gn=!0,gs=!0),nt.id!==S&&(S=nt.id,gn=!0),bi||b!==C){Lt.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),$e.setValue(D,"projectionMatrix",C.projectionMatrix),$e.setValue(D,"viewMatrix",C.matrixWorldInverse);const xn=$e.map.cameraPosition;xn!==void 0&&xn.setValue(D,_t.setFromMatrixPosition(C.matrixWorld)),qt.logarithmicDepthBuffer&&$e.setValue(D,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&$e.setValue(D,"isOrthographic",C.isOrthographicCamera===!0),b!==C&&(b=C,gn=!0,gs=!0)}if(J.isSkinnedMesh){$e.setOptional(D,J,"bindMatrix"),$e.setOptional(D,J,"bindMatrixInverse");const pn=J.skeleton;pn&&(pn.boneTexture===null&&pn.computeBoneTexture(),$e.setValue(D,"boneTexture",pn.boneTexture,Mt))}J.isBatchedMesh&&($e.setOptional(D,J,"batchingTexture"),$e.setValue(D,"batchingTexture",J._matricesTexture,Mt),$e.setOptional(D,J,"batchingIdTexture"),$e.setValue(D,"batchingIdTexture",J._indirectTexture,Mt),$e.setOptional(D,J,"batchingColorTexture"),J._colorsTexture!==null&&$e.setValue(D,"batchingColorTexture",J._colorsTexture,Mt));const ln=et.morphAttributes;if((ln.position!==void 0||ln.normal!==void 0||ln.color!==void 0)&&gt.update(J,et,Mn),(gn||Qt.receiveShadow!==J.receiveShadow)&&(Qt.receiveShadow=J.receiveShadow,$e.setValue(D,"receiveShadow",J.receiveShadow)),nt.isMeshGouraudMaterial&&nt.envMap!==null&&(en.envMap.value=zt,en.flipEnvMap.value=zt.isCubeTexture&&zt.isRenderTargetTexture===!1?-1:1),nt.isMeshStandardMaterial&&nt.envMap===null&&K.environment!==null&&(en.envMapIntensity.value=K.environmentIntensity),gn&&($e.setValue(D,"toneMappingExposure",_.toneMappingExposure),Qt.needsLights&&Wi(en,gs),vt&&nt.fog===!0&&lt.refreshFogUniforms(en,vt),lt.refreshMaterialUniforms(en,nt,O,B,p.state.transmissionRenderTarget[C.id]),Ma.upload(D,ci(Qt),en,Mt)),nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(Ma.upload(D,ci(Qt),en,Mt),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&$e.setValue(D,"center",J.center),$e.setValue(D,"modelViewMatrix",J.modelViewMatrix),$e.setValue(D,"normalMatrix",J.normalMatrix),$e.setValue(D,"modelMatrix",J.matrixWorld),nt.isShaderMaterial||nt.isRawShaderMaterial){const pn=nt.uniformsGroups;for(let xn=0,Xi=pn.length;xn<Xi;xn++){const hi=pn[xn];ue.update(hi,Mn),ue.bind(hi,Mn)}}return Mn}function Wi(C,K){C.ambientLightColor.needsUpdate=K,C.lightProbe.needsUpdate=K,C.directionalLights.needsUpdate=K,C.directionalLightShadows.needsUpdate=K,C.pointLights.needsUpdate=K,C.pointLightShadows.needsUpdate=K,C.spotLights.needsUpdate=K,C.spotLightShadows.needsUpdate=K,C.rectAreaLights.needsUpdate=K,C.hemisphereLights.needsUpdate=K}function So(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(C,K,et){const nt=mt.get(C);nt.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,nt.__autoAllocateDepthBuffer===!1&&(nt.__useRenderToTexture=!1),mt.get(C.texture).__webglTexture=K,mt.get(C.depthTexture).__webglTexture=nt.__autoAllocateDepthBuffer?void 0:et,nt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,K){const et=mt.get(C);et.__webglFramebuffer=K,et.__useDefaultFramebuffer=K===void 0};const ms=D.createFramebuffer();this.setRenderTarget=function(C,K=0,et=0){R=C,A=K,E=et;let nt=!0,J=null,vt=!1,Dt=!1;if(C){const zt=mt.get(C);if(zt.__useDefaultFramebuffer!==void 0)Lt.bindFramebuffer(D.FRAMEBUFFER,null),nt=!1;else if(zt.__webglFramebuffer===void 0)Mt.setupRenderTarget(C);else if(zt.__hasExternalTextures)Mt.rebindTextures(C,mt.get(C.texture).__webglTexture,mt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Jt=C.depthTexture;if(zt.__boundDepthTexture!==Jt){if(Jt!==null&&mt.has(Jt)&&(C.width!==Jt.image.width||C.height!==Jt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Mt.setupDepthRenderbuffer(C)}}const Kt=C.texture;(Kt.isData3DTexture||Kt.isDataArrayTexture||Kt.isCompressedArrayTexture)&&(Dt=!0);const oe=mt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(oe[K])?J=oe[K][et]:J=oe[K],vt=!0):C.samples>0&&Mt.useMultisampledRTT(C)===!1?J=mt.get(C).__webglMultisampledFramebuffer:Array.isArray(oe)?J=oe[et]:J=oe,U.copy(C.viewport),P.copy(C.scissor),G=C.scissorTest}else U.copy(ft).multiplyScalar(O).floor(),P.copy(Vt).multiplyScalar(O).floor(),G=Me;if(et!==0&&(J=ms),Lt.bindFramebuffer(D.FRAMEBUFFER,J)&&nt&&Lt.drawBuffers(C,J),Lt.viewport(U),Lt.scissor(P),Lt.setScissorTest(G),vt){const zt=mt.get(C.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+K,zt.__webglTexture,et)}else if(Dt){const zt=K;for(let Kt=0;Kt<C.textures.length;Kt++){const oe=mt.get(C.textures[Kt]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Kt,oe.__webglTexture,et,zt)}}else if(C!==null&&et!==0){const zt=mt.get(C.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,zt.__webglTexture,et)}S=-1},this.readRenderTargetPixels=function(C,K,et,nt,J,vt,Dt,Ht=0){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let zt=mt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Dt!==void 0&&(zt=zt[Dt]),zt){Lt.bindFramebuffer(D.FRAMEBUFFER,zt);try{const Kt=C.textures[Ht],oe=Kt.format,Jt=Kt.type;if(!qt.textureFormatReadable(oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qt.textureTypeReadable(Jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=C.width-nt&&et>=0&&et<=C.height-J&&(C.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ht),D.readPixels(K,et,nt,J,Ot.convert(oe),Ot.convert(Jt),vt))}finally{const Kt=R!==null?mt.get(R).__webglFramebuffer:null;Lt.bindFramebuffer(D.FRAMEBUFFER,Kt)}}},this.readRenderTargetPixelsAsync=async function(C,K,et,nt,J,vt,Dt,Ht=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let zt=mt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Dt!==void 0&&(zt=zt[Dt]),zt)if(K>=0&&K<=C.width-nt&&et>=0&&et<=C.height-J){Lt.bindFramebuffer(D.FRAMEBUFFER,zt);const Kt=C.textures[Ht],oe=Kt.format,Jt=Kt.type;if(!qt.textureFormatReadable(oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qt.textureTypeReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const be=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,be),D.bufferData(D.PIXEL_PACK_BUFFER,vt.byteLength,D.STREAM_READ),C.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ht),D.readPixels(K,et,nt,J,Ot.convert(oe),Ot.convert(Jt),0);const Ne=R!==null?mt.get(R).__webglFramebuffer:null;Lt.bindFramebuffer(D.FRAMEBUFFER,Ne);const He=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Vp(D,He,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,be),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,vt),D.deleteBuffer(be),D.deleteSync(He),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,K=null,et=0){const nt=Math.pow(2,-et),J=Math.floor(C.image.width*nt),vt=Math.floor(C.image.height*nt),Dt=K!==null?K.x:0,Ht=K!==null?K.y:0;Mt.setTexture2D(C,0),D.copyTexSubImage2D(D.TEXTURE_2D,et,0,0,Dt,Ht,J,vt),Lt.unbindTexture()};const Nr=D.createFramebuffer(),Hs=D.createFramebuffer();this.copyTextureToTexture=function(C,K,et=null,nt=null,J=0,vt=null){vt===null&&(J!==0?(mo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),vt=J,J=0):vt=0);let Dt,Ht,zt,Kt,oe,Jt,be,Ne,He;const ke=C.isCompressedTexture?C.mipmaps[vt]:C.image;if(et!==null)Dt=et.max.x-et.min.x,Ht=et.max.y-et.min.y,zt=et.isBox3?et.max.z-et.min.z:1,Kt=et.min.x,oe=et.min.y,Jt=et.isBox3?et.min.z:0;else{const ln=Math.pow(2,-J);Dt=Math.floor(ke.width*ln),Ht=Math.floor(ke.height*ln),C.isDataArrayTexture?zt=ke.depth:C.isData3DTexture?zt=Math.floor(ke.depth*ln):zt=1,Kt=0,oe=0,Jt=0}nt!==null?(be=nt.x,Ne=nt.y,He=nt.z):(be=0,Ne=0,He=0);const Te=Ot.convert(K.format),Qt=Ot.convert(K.type);let qe;K.isData3DTexture?(Mt.setTexture3D(K,0),qe=D.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(Mt.setTexture2DArray(K,0),qe=D.TEXTURE_2D_ARRAY):(Mt.setTexture2D(K,0),qe=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,K.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,K.unpackAlignment);const Ae=D.getParameter(D.UNPACK_ROW_LENGTH),Mn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),bi=D.getParameter(D.UNPACK_SKIP_PIXELS),gn=D.getParameter(D.UNPACK_SKIP_ROWS),gs=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,ke.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ke.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Kt),D.pixelStorei(D.UNPACK_SKIP_ROWS,oe),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Jt);const $e=C.isDataArrayTexture||C.isData3DTexture,en=K.isDataArrayTexture||K.isData3DTexture;if(C.isDepthTexture){const ln=mt.get(C),pn=mt.get(K),xn=mt.get(ln.__renderTarget),Xi=mt.get(pn.__renderTarget);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,xn.__webglFramebuffer),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Xi.__webglFramebuffer);for(let hi=0;hi<zt;hi++)$e&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,mt.get(C).__webglTexture,J,Jt+hi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,mt.get(K).__webglTexture,vt,He+hi)),D.blitFramebuffer(Kt,oe,Dt,Ht,be,Ne,Dt,Ht,D.DEPTH_BUFFER_BIT,D.NEAREST);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(J!==0||C.isRenderTargetTexture||mt.has(C)){const ln=mt.get(C),pn=mt.get(K);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,Nr),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Hs);for(let xn=0;xn<zt;xn++)$e?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ln.__webglTexture,J,Jt+xn):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ln.__webglTexture,J),en?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,pn.__webglTexture,vt,He+xn):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,pn.__webglTexture,vt),J!==0?D.blitFramebuffer(Kt,oe,Dt,Ht,be,Ne,Dt,Ht,D.COLOR_BUFFER_BIT,D.NEAREST):en?D.copyTexSubImage3D(qe,vt,be,Ne,He+xn,Kt,oe,Dt,Ht):D.copyTexSubImage2D(qe,vt,be,Ne,Kt,oe,Dt,Ht);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else en?C.isDataTexture||C.isData3DTexture?D.texSubImage3D(qe,vt,be,Ne,He,Dt,Ht,zt,Te,Qt,ke.data):K.isCompressedArrayTexture?D.compressedTexSubImage3D(qe,vt,be,Ne,He,Dt,Ht,zt,Te,ke.data):D.texSubImage3D(qe,vt,be,Ne,He,Dt,Ht,zt,Te,Qt,ke):C.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,vt,be,Ne,Dt,Ht,Te,Qt,ke.data):C.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,vt,be,Ne,ke.width,ke.height,Te,ke.data):D.texSubImage2D(D.TEXTURE_2D,vt,be,Ne,Dt,Ht,Te,Qt,ke);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ae),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Mn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,bi),D.pixelStorei(D.UNPACK_SKIP_ROWS,gn),D.pixelStorei(D.UNPACK_SKIP_IMAGES,gs),vt===0&&K.generateMipmaps&&D.generateMipmap(qe),Lt.unbindTexture()},this.initRenderTarget=function(C){mt.get(C).__webglFramebuffer===void 0&&Mt.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?Mt.setTextureCube(C,0):C.isData3DTexture?Mt.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?Mt.setTexture2DArray(C,0):Mt.setTexture2D(C,0),Lt.unbindTexture()},this.resetState=function(){A=0,E=0,R=null,Lt.reset(),wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Ue._getDrawingBufferColorSpace(t),e.unpackColorSpace=Ue._getUnpackColorSpace()}}class zy extends Zt{constructor(t,e={}){super(t),this.isWater=!0;const n=this,s=e.textureWidth!==void 0?e.textureWidth:512,r=e.textureHeight!==void 0?e.textureHeight:512,o=e.clipBias!==void 0?e.clipBias:0,a=e.alpha!==void 0?e.alpha:1,l=e.time!==void 0?e.time:0,c=e.waterNormals!==void 0?e.waterNormals:null,h=e.sunDirection!==void 0?e.sunDirection:new L(.70707,.70707,0),u=new ee(e.sunColor!==void 0?e.sunColor:16777215),d=new ee(e.waterColor!==void 0?e.waterColor:8355711),f=e.eye!==void 0?e.eye:new L(0,0,0),m=e.distortionScale!==void 0?e.distortionScale:20,g=e.side!==void 0?e.side:Oi,x=e.fog!==void 0?e.fog:!1,p=new fi,v=new L,y=new L,_=new L,T=new he,A=new L(0,0,-1),E=new Ie,R=new L,S=new L,b=new Ie,U=new he,P=new Nn,G=new cs(s,r),j={name:"MirrorShader",uniforms:Ea.merge([Ct.fog,Ct.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new he},sunColor:{value:new ee(8355711)},sunDirection:{value:new L(.70707,.70707,0)},eye:{value:new L},waterColor:{value:new ee(5592405)}}]),vertexShader:`
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
				}`},H=new Kn({name:j.name,uniforms:Ea.clone(j.uniforms),vertexShader:j.vertexShader,fragmentShader:j.fragmentShader,lights:!0,side:g,fog:x});H.uniforms.mirrorSampler.value=G.texture,H.uniforms.textureMatrix.value=U,H.uniforms.alpha.value=a,H.uniforms.time.value=l,H.uniforms.normalSampler.value=c,H.uniforms.sunColor.value=u,H.uniforms.waterColor.value=d,H.uniforms.sunDirection.value=h,H.uniforms.distortionScale.value=m,H.uniforms.eye.value=f,n.material=H,n.onBeforeRender=function(q,B,O){if(y.setFromMatrixPosition(n.matrixWorld),_.setFromMatrixPosition(O.matrixWorld),T.extractRotation(n.matrixWorld),v.set(0,0,1),v.applyMatrix4(T),R.subVectors(y,_),R.dot(v)>0)return;R.reflect(v).negate(),R.add(y),T.extractRotation(O.matrixWorld),A.set(0,0,-1),A.applyMatrix4(T),A.add(_),S.subVectors(y,A),S.reflect(v).negate(),S.add(y),P.position.copy(R),P.up.set(0,1,0),P.up.applyMatrix4(T),P.up.reflect(v),P.lookAt(S),P.far=O.far,P.updateMatrixWorld(),P.projectionMatrix.copy(O.projectionMatrix),U.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),U.multiply(P.projectionMatrix),U.multiply(P.matrixWorldInverse),p.setFromNormalAndCoplanarPoint(v,y),p.applyMatrix4(P.matrixWorldInverse),E.set(p.normal.x,p.normal.y,p.normal.z,p.constant);const Q=P.projectionMatrix;b.x=(Math.sign(E.x)+Q.elements[8])/Q.elements[0],b.y=(Math.sign(E.y)+Q.elements[9])/Q.elements[5],b.z=-1,b.w=(1+Q.elements[10])/Q.elements[14],E.multiplyScalar(2/E.dot(b)),Q.elements[2]=E.x,Q.elements[6]=E.y,Q.elements[10]=E.z+1-o,Q.elements[14]=E.w,f.setFromMatrixPosition(O.matrixWorld);const W=q.getRenderTarget(),ft=q.xr.enabled,Vt=q.shadowMap.autoUpdate;n.visible=!1,q.xr.enabled=!1,q.shadowMap.autoUpdate=!1,q.setRenderTarget(G),q.state.buffers.depth.setMask(!0),q.autoClear===!1&&q.clear(),q.render(B,P),n.visible=!0,q.xr.enabled=ft,q.shadowMap.autoUpdate=Vt,q.setRenderTarget(W);const Me=O.viewport;Me!==void 0&&q.state.viewport(Me)}}}function Li(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new we;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const u=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=i[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=Qu(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let g=0;g<o[h].length;++g)f.push(o[h][g][d]);const m=Qu(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function Qu(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new un(o,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let d=0,f=h.count;d<f;d++)for(let m=0;m<e;m++){const g=h.getComponent(d,m);a.setComponent(d+u,m,g)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const ge=1.8,Dy=2,Iy=110*ge,Ly=108*ge,ie=3,mr=ie/2.15,Cs=12.3*mr,ws=Cs+6,Uy=Cs+8,na=17,Ny=mr,Yn=i=>Object.freeze(Object.fromEntries(Object.entries(i).map(([t,e])=>[t,t==="yaw"?e:e*Ny])));Object.freeze({store:Yn({width:4.4,depth:3.6}),nursery:Yn({width:5.8,depth:5.9}),watchtower:Yn({width:4.8,depth:4}),training:Yn({width:5.7,depth:4.8}),palisade:Yn({width:7,depth:1})});Yn({x:-1.1825,z:-1.0664,yaw:0,width:7.68,depth:8.25});const ky=Yn({x:-6.45,z:.43,yaw:-.5,width:4.8,depth:5.2});Object.freeze({store:Yn({x:-6.0962,z:4.9054,yaw:0}),nursery:Yn({x:6.5601,z:-3.869,yaw:0}),watchtower:Yn({x:6.6295,z:5.3482,yaw:0}),training:Yn({x:-6.2831,z:-6.0974,yaw:0}),palisade:Yn({x:0,z:9.8,yaw:0})});const Fy=Cs-.15,Oy=6.8,Ra=3.8,By=.9,td=(i,t)=>Number.isFinite(i)?i:t,Hy=i=>i?.natural===!0||i?.mesh?.userData?.natural===!0,Gy=Array.from({length:5},(i,t)=>Object.freeze({stage:t,unfinished:t<4,wallHeight:t===0?0:t===1?Ra*.35:Ra,keep:t>=3,gate:t===4})),Vy=Object.freeze({stage:4,unfinished:!1,wallHeight:0,keep:!1,gate:!1});function ed(i){if(Hy(i))return Vy;const t=i.mesh?.userData?.visualState,e=i.underConstruction??t?.underConstruction??!1,n=e?Math.max(0,Math.min(1,td(i.constructionProgress,td(t?.constructionProgress,0)))):1,s=e?Math.min(3,Math.floor(n*4)):4;return Gy[s]}const Ts=(i,t=0)=>Number.isFinite(i)?i:t,Ca=(i,t,e)=>Math.max(t,Math.min(e,i)),gr=1e-6,Wy=i=>i&&i.active!==!1;function Xy(i,t){const e=Math.cos(i.yaw||0),n=Math.sin(i.yaw||0),s=t.x-i.x,r=t.z-i.z;return{x:e*s-n*r,y:t.y,z:n*s+e*r}}function ia(i,t){const e=Math.cos(i.yaw||0),n=Math.sin(i.yaw||0);return{x:i.x+e*t.x+n*t.z,y:Ts(t.y,i.floorY),z:i.z-n*t.x+e*t.z}}const Jd=(i,t,e=0)=>i.x>t.minX+e-gr&&i.x<t.maxX-e+gr&&i.z>t.minZ+e-gr&&i.z<t.maxZ-e+gr,Ci=(i,t,e,n,s,r,o)=>({id:i,minX:t,maxX:e,minZ:n,maxZ:s,minY:r,maxY:o});function nd(i,t,e=0){return t.outline?t.outline.every((s,r)=>{const o=t.outline[(r+1)%t.outline.length],a=o.x-s.x,l=o.z-s.z;return a*(i.z-s.z)-l*(i.x-s.x)>=Math.max(0,e)*Math.hypot(a,l)-gr})||e<0&&t.outline.some((s,r)=>qy(i,s,t.outline[(r+1)%t.outline.length])<e*e-gr):Jd(i,t,e)}function qy(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=Ca(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1),0,1);return(i.x-t.x-n*r)**2+(i.z-t.z-s*r)**2}function $y(i,t){return i.outline=t.map(([e,n])=>({x:e,z:n})),i.minX=Math.min(...t.map(e=>e[0])),i.maxX=Math.max(...t.map(e=>e[0])),i.minZ=Math.min(...t.map(e=>e[1])),i.maxZ=Math.max(...t.map(e=>e[1])),i}function Yy(i,{terrainHeight:t,minimumFloorY:e=.82}={}){const n=t||(()=>0),s={id:i.id,x:Ts(i.x),z:Ts(i.z),yaw:Ts(i.yaw,Math.atan2(-i.x,-i.z)),team:i.team||"neutral",active:!0};let r=-1/0,o=1/0;for(let m=-3.75;m<=3.76;m+=1.25)for(let g=-3.25;g<=4.26;g+=1.25){const x=ia(s,{x:m,z:g,y:0}),p=Ts(n(x.x,x.z));r=Math.max(r,p),o=Math.min(o,p)}s.floorY=Math.max(e,r+.045),s.floorBottom=Math.min(o-.16,s.floorY-.22),s.roofBottom=s.floorY+2.25,s.roofTop=s.floorY+3.05,s.interior={minX:-3.1,maxX:3.1,minZ:-2.6,maxZ:.45},s.floor={minX:-3.75,maxX:3.75,minZ:-3.25,maxZ:4.1},s.entrance={x:1.55,z:4,minX:.3,maxX:2.8,minZ:3.35,maxZ:4,width:2.5,height:1.95},s.solids=[Ci("floor",-3.75,3.75,-3.25,4.1,s.floorBottom,s.floorY),Ci("left-wall",-3.75,-3.1,-3.25,4,s.floorY,s.roofBottom),Ci("right-wall",3.1,3.75,-3.25,4,s.floorY,s.roofBottom),Ci("back-wall",-3.75,3.75,-3.25,-2.6,s.floorY,s.roofBottom),Ci("front-left",-3.75,.3,3.35,4,s.floorY,s.roofBottom),Ci("front-right",2.8,3.75,3.35,4,s.floorY,s.roofBottom),Ci("entrance-lintel",.3,2.8,3.35,4,s.floorY+1.95,s.roofBottom),Ci("root-baffle",-.35,3.1,.45,1.05,s.floorY,s.roofBottom),Ci("roof",-3.75,3.75,-3.25,4,s.roofBottom,s.roofTop)];const l={floor:[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.2],[-3.15,4.2],[-4.12,3.4]],roof:[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.22],[-3.15,4.45],[-4.12,3.4]],"left-wall":[[-3.1,-3.35],[-3.1,4.3],[-3.95,3.4],[-4.05,-2.2]],"right-wall":[[3.1,-3.35],[3.95,-2.3],[3.85,3.4],[3.1,4.2]],"back-wall":[[-3.25,-2.6],[-3.5,-3.3],[2.9,-3.5],[3.3,-2.6]],"front-left":[[-3.3,3.35],[.3,3.35],[.3,4.13],[-3.15,4.3]],"front-right":[[2.8,3.35],[3.3,3.35],[3.45,4],[2.8,4]],"root-baffle":[[-.35,.45],[3.1,.45],[3.1,1.05],[-.3,.98]]};for(const m of s.solids)$y(m,l[m.id]||[[m.minX,m.minZ],[m.maxX,m.minZ],[m.maxX,m.maxZ],[m.minX,m.maxZ]]);s.floor={...s.solids[0]},s.shellBounds={minX:Math.min(...s.solids.map(m=>m.minX)),maxX:Math.max(...s.solids.map(m=>m.maxX)),minZ:Math.min(...s.solids.map(m=>m.minZ)),maxZ:Math.max(...s.solids.map(m=>m.maxZ))};let c=4.5;const h=4.2;for(let m=0;m<3;m++){const g=ia(s,{x:s.entrance.x,z:h+c,y:0});c=Ca(Math.abs(s.floorY-n(g.x,g.z))/.32,4.5,14)}const u=Math.max(10,Math.ceil(c/.45)),d=6,f={minX:s.entrance.x-1.6,maxX:s.entrance.x+1.6,minZ:h,maxZ:h+c,rows:u,cols:d,heights:[],bottoms:[]};for(let m=0;m<=u;m++)for(let g=0;g<=d;g++){const x=m/u,p=f.minX+(f.maxX-f.minX)*g/d,v=f.minZ+c*x,y=ia(s,{x:p,z:v,y:0}),_=ia(s,{x:p,z:f.maxZ,y:0}),T=Ts(n(y.x,y.z)),A=s.floorY+(Ts(n(_.x,_.z))-s.floorY)*x;f.heights.push(m===0?s.floorY:Math.max(T+(m===u?.005:.02),A)),f.bottoms.push(Math.min(T-.14,A-.18))}return s.ramp=f,s.radius=Math.max(6,Math.hypot(f.maxX,f.maxZ)),s}function Zy(i,t){const e=i.ramp;if(!e||!Jd(t,e))return null;const n=Ca((t.x-e.minX)/(e.maxX-e.minX)*e.cols,0,e.cols),s=Ca((t.z-e.minZ)/(e.maxZ-e.minZ)*e.rows,0,e.rows),r=Math.min(e.cols-1,Math.floor(n)),o=Math.min(e.rows-1,Math.floor(s)),a=n-r,l=s-o,c=(m,g)=>e.heights[g*(e.cols+1)+m],h=c(r,o),u=c(r+1,o),d=c(r,o+1),f=c(r+1,o+1);return a+l<=1?h+(u-h)*a+(d-h)*l:f+(d-f)*(1-a)+(u-f)*(1-l)}function jy(i,t,e,{y:n}={}){let s=null;for(const r of i||[]){if(!Wy(r)||Math.hypot(t-r.x,e-r.z)>r.radius+1)continue;const o=Xy(r,{x:t,z:e}),a=r.solids.find(u=>u.id==="roof");let l=null,c="floor";nd(o,r.floor)&&(l=r.floorY);const h=Zy(r,o);h!==null&&(l===null||h>l)&&(l=h,c="ramp"),Number.isFinite(n)&&n>=r.roofTop-.06&&nd(o,a)&&(l=r.roofTop,c="roof"),l!==null&&(!s||l>s.height)&&(s={height:l,type:c==="roof"?"rock":"land",platform:r,refuge:r,surface:c})}return s}const vh=(i,t,e)=>Math.max(t,Math.min(e,i)),ri=(i,t,e)=>{const n=vh((e-i)/(t-i),0,1);return n*n*(3-2*n)},Ji=-.035;function Ky(i,t){if(!Number.isFinite(i)||!Number.isFinite(t))return .91;const e=Math.max(0,t-.215-i);return .91-.63*ri(.1,.6,e)}const Jy=Object.freeze({pond:{id:"pond",x:0,z:0,radius:8,label:"Λιμνούλα των νούφαρων",description:"Μύγες, ανθισμένα φύλλα και χαμηλές διαδρομές πάνω από το νερό.",hint:"Παρατήρησε πού μαζεύονται οι μύγες.",findPoint:{x:6.5,z:3}},creek:{id:"creek",x:8,z:-24,radius:7,label:"Το στενό ρυάκι",description:"Το ρεύμα αλλάζει τις διαδρομές και μεταφέρει την τροφή.",hint:"Ακολούθησε την κίνηση του νερού.",findPoint:{x:4,z:-29}},bank:{id:"bank",x:27,z:8,radius:7,label:"Η όχθη με τα βότσαλα",description:"Ψηλά βράχια, κρυψώνες και εκτεθειμένα περάσματα.",hint:"Οι καλαμιές κρύβουν μια δεύτερη προσέγγιση.",findPoint:{x:30,z:6}},roots:{id:"roots",x:24,z:-16,radius:5,label:"Το πέρασμα στις ρίζες",description:"Ένα φυσικό άνοιγμα που αποκαλύπτεται όταν χαμηλώνει το νερό.",hint:"Μικρά έντομα χάνονται κάτω από τις καμπύλες ρίζες.",findPoint:{x:31,z:-16}}});function Qy(i){const t=e=>({...e,...i.toWorld(e.x,e.z)});return{landmarks:Object.values(Jy).map(e=>({...t(e),findPoint:t(e.findPoint)})),nest:t({id:"creek-nest",x:17,z:16,radius:4,label:"Κοιλότητα κάτω από τις ρίζες"}),refuges:[{id:"willow-crevice",x:-20,z:7,label:"Κρυψώνα της πεσμένης ιτιάς"},{id:"bank-crevice",x:34,z:-9,label:"Κοιλότητα της πετρώδους όχθης"}].map(e=>({...t(e),yaw:Math.atan2(-e.x,-e.z)+i.yaw})),cover:[{id:"nest-reeds",x:14,z:20,radius:3.1},{id:"root-reeds",x:18,z:-7,radius:3},{id:"bank-reeds",x:29,z:11,radius:3.3},{id:"creek-reeds",x:18,z:-22,radius:3}].map(t)}}function Qd(i){return 6+Math.sin(i*.035)*9}function t1(i,t,e=0,n=[]){const s=Math.abs(i-Qd(t));let r=-1.9+ri(6,17,s)*3.5+e*.22;r+=ri(20,55,s)*(.4+Math.sin(t*.04+.6)**2*1.2);const o=1-ri(11,20,Math.hypot(i*.95,t*.8));r=r*(1-o)+(-2.65+e*.2)*o;for(const l of n){const c=Math.hypot(i-l.x,t-l.z),u=l.radius*(1+.045*Math.sin(Math.atan2(t-l.z,i-l.x)*5+(l.shorePhase||0))),d=1-ri(u*.46,u+5,c);d>0&&(r=Math.max(r,r*(1-d)+l.elevation*d))}const a=(1-ri(1.9,4.7,Math.abs(t+16)))*ri(9,14,i)*(1-ri(31,36,i));return r=r*(1-a)+Math.min(r,-.18+e*.025)*a,r+=ri(190,235,Math.max(Math.abs(i),Math.abs(t)))*4,r}function e1(i,t,e,n=.45){const s=i.toSource(t,e),r=Math.abs(s.x-Qd(s.z)),o=vh(Number(n)||0,0,1.5)*(1-ri(5,17,r))*(.55+.45*ri(5,23,Math.abs(s.z)));if(o<=0)return{x:0,z:0,strength:0};const a=.315*Math.cos(s.z*.035),l=Math.hypot(a,1),c=i.toWorld(0,0),h=i.toWorld(a/l,1/l);return{x:(h.x-c.x)*o,z:(h.z-c.z)*o,strength:o}}function n1({group:i,layout:t,terrainHeight:e,surface:n,insertPlatform:s,materials:r,rockGeos:o,tube:a,leafGeometry:l,bladeGeometry:c,geography:h}){const u=new te;u.name="Natural creek discoveries",i.add(u);const d=[],f=new Xe,m=new Map,g=new Jn(1,11,7),x=new We({color:"#e0c58b",roughness:.68}),p=new We({color:"#698d9d",roughness:.65}),v=l(.55,.38,.11),y=r.leaf.clone();y.color.set("#adc68a");const _=(H,q,B)=>{const O=t.toWorld(H,q);return[O.x,B,O.z]},T=h.landmarks.find(H=>H.id==="roots"),A=e(T.x,T.z);for(const H of[-.48,.45]){const q=a([[0,-.1,-4.1],[-.3,2.3,-2.6],[.2,3.7,0],[.35,2.5,2.7],[0,-.1,4.2]].map(B=>_(24+B[0]+H,-16+B[2],A+B[1])),.48,r.bark,24,.14);q.name="Passable willow root arch",q.castShadow=!0,q.receiveShadow=!0,u.add(q)}for(const H of[-1,1])for(let q=0;q<4;q++){const B=-16+H*(3.4+q*.45),O=24+(q-1.5)*1.1,Q=t.toWorld(O,B),W=t.toWorld(O-4.5,B+H*1.5),ft=a([[Q.x,e(Q.x,Q.z)+.8,Q.z],[(Q.x+W.x)/2,e(W.x,W.z)+.45,(Q.z+W.z)/2],[W.x,e(W.x,W.z)-.05,W.z]],.1+q*.025,r.bark,12,.75);ft.castShadow=!0,u.add(ft)}const E=[{id:"creek-stone",x:4,z:-29,r:1.8,height:3.5},{id:"root-approach",x:18,z:-7,r:1.65,height:1.65},{id:"root-perch",x:24,z:-11,r:1.7,height:2},{id:"bank-perch",x:30,z:6,r:2,height:2.05},{id:"nest-perch",x:19,z:20,r:1.8,height:1.7},{id:"pond-perch",x:-5,z:8,r:1.7,height:3.5}],R=new We({color:"#c4d9ad",roughness:.82});for(const[H,q]of E.entries()){const B=t.toWorld(q.x,q.z),O=e(B.x,B.z),Q=q.height,W=new Zt(o[H%o.length],r.mossRock);W.name="Moss-covered grip outcrop",W.position.set(B.x,O,B.z),W.scale.set(q.r,Q,q.r),W.rotation.y=H*1.93,W.castShadow=!0,W.receiveShadow=!0,u.add(W);const ft=s({id:q.id,type:"rock",...B,y:O+Q*.76,radius:q.r*.72,visualRadius:q.r,scaleY:Q}),Vt=new Zt(g,R);Vt.name="Pale natural grip",Vt.position.set(B.x,ft.y+.045,B.z),Vt.scale.set(.22,.07,.22),u.add(Vt),d.push({id:q.id,...B,y:ft.y+.13,radius:ft.radius})}const S=c(123),b=new En(S,r.plant,h.cover.length*84);b.name="Dense camouflage reed pockets";let U=0;for(const[H,q]of h.cover.entries())for(let B=0;B<84;B++){const O=B*2.399+H*.7,Q=Math.sqrt((B+.4)/84)*q.radius,W=q.x+Math.cos(O)*Q,ft=q.z+Math.sin(O)*Q;f.position.set(W,e(W,ft),ft),f.rotation.set(0,O,0),f.scale.set(1.2,1.65+B%5*.18,1.2),f.updateMatrix(),b.setMatrixAt(U++,f.matrix)}b.receiveShadow=!0,b.computeBoundingSphere(),u.add(b);function P(H,q,B){const O=new te;O.name=B?"Lost food and natural keepsakes":"Natural discovery";const Q=new Zt(v,y);Q.rotation.y=m.size*2.4%6.28,Q.receiveShadow=!0,O.add(Q);for(let W=0;W<(B?3:1);W++){const ft=new Zt(g,q.kind==="keepsake"||q.keepsakesCount?x:p);ft.position.set((W-1)*.15,.15+W%2*.035,.015),ft.scale.set(.22,.15,.18),ft.rotation.set(.2,W*.9,.1),ft.castShadow=!0,O.add(ft)}return O.userData.creekPoint={...q},u.add(O),m.set(H,O),O}function G(H,q){const B=new Set;for(const[O,Q]of[[!1,H.finds||[]],[!0,H.dropped||[]]])for(const W of Q){if(!Number.isFinite(W.x)||!Number.isFinite(W.z)||W.collected||W.visible===!1)continue;const ft=(O?"drop:":"find:")+W.id;B.add(ft);const Vt=m.get(ft)||P(ft,W,O);Vt.userData.creekPoint={...W},Vt.visible=!0,Vt.position.set(W.x,Math.max(n(W.x,W.z).height,q)+.07,W.z),Vt.updateMatrix()}for(const[O,Q]of m)B.has(O)||(Q.removeFromParent(),m.delete(O))}function j(H,q){for(const B of m.values()){const O=B.userData.creekPoint,Q=n(O.x,O.z),W=Q.type==="water";B.position.y=Math.max(Q.height,H)+.07+(W?Math.sin(q*1.5+O.x)*.025:0),B.rotation.z=W?Math.sin(q*.8+O.z)*.045:0,B.updateMatrix()}}return{group:u,grips:d,sync:G,update:j,resources:[g,x,p,v,y,R,S]}}function i1(i){const t=i.outline||[{x:i.minX,z:i.minZ},{x:i.maxX,z:i.minZ},{x:i.maxX,z:i.maxZ},{x:i.minX,z:i.maxZ}],e=t.length,n=[],s=[];for(const h of[i.minY,i.maxY])for(const u of t)n.push(u.x,h,u.z);for(let h=1;h<e-1;h++)s.push(0,h,h+1,e,e+h+1,e+h);for(let h=0;h<e;h++){const u=(h+1)%e;s.push(h,e+h,u,u,e+h,e+u)}const r=new we;r.setAttribute("position",new Gt(n,3)),r.setIndex(s);const o=r.toNonIndexed();r.dispose(),o.computeVertexNormals();const a=o.attributes.position,l=o.attributes.normal,c=[];for(let h=0;h<a.count;h++){const u=Math.abs(l.getY(h))>.5;c.push((u?a.getX(h):Math.abs(l.getX(h))>.5?a.getZ(h):a.getX(h))*.35,(u?a.getZ(h):a.getY(h))*.35)}return o.setAttribute("uv",new Gt(c,2)),o}function s1(i,{terrainHeight:t,materials:e,rockGeos:n,tube:s,leafGeometry:r,mergeStaticParts:o,teamColor:a}){const l=Yy(i,{terrainHeight:t}),c=new te;c.name="Natural refuge "+(i.id||""),c.position.set(i.x,l.floorY,i.z),c.rotation.y=l.yaw;const h=[],u=e.leaf.clone(),d=e.rock.clone();d.color.set("#71816a"),h.push(u,d);const f=new te;f.name="Opaque rock and root cavity",c.add(f);const m=new te;m.name="Overhanging refuge slab",f.add(m);for(const E of l.solids){const R=i1(E),S=E.id==="root-baffle"?e.bark:E.id==="floor"?d:e.mossRock,b=new Zt(R,S);b.name="Refuge solid · "+E.id,b.userData.refugeSolid=E,b.position.y=-l.floorY,b.castShadow=!0,b.receiveShadow=!0,h.push(R),(E.id==="roof"?m:f).add(b)}const g=l.ramp,x=[],p=[];for(let E=0;E<=g.rows;E++)for(let R=0;R<=g.cols;R++){const S=E*(g.cols+1)+R;x.push(g.minX+(g.maxX-g.minX)*R/g.cols,g.heights[S]-l.floorY,g.minZ+(g.maxZ-g.minZ)*E/g.rows)}for(let E=0;E<g.rows;E++)for(let R=0;R<g.cols;R++){const S=E*(g.cols+1)+R,b=S+1,U=S+g.cols+1,P=U+1;p.push(S,U,b,b,U,P)}const v=[];for(let E=0;E<=g.cols;E++)v.push(E);for(let E=1;E<=g.rows;E++)v.push(E*(g.cols+1)+g.cols);for(let E=g.cols-1;E>=0;E--)v.push(g.rows*(g.cols+1)+E);for(let E=g.rows-1;E>0;E--)v.push(E*(g.cols+1));for(let E=0;E<v.length;E++){const R=v[E],S=v[(E+1)%v.length],b=x.length/3,U=b+1;x.push(x[R*3],g.bottoms[R]-l.floorY,x[R*3+2],x[S*3],g.bottoms[S]-l.floorY,x[S*3+2]),p.push(R,S,b,S,U,b)}const y=new we;y.setAttribute("position",new Gt(x,3)),y.setAttribute("uv",new Gt(Array.from({length:x.length/3},(E,R)=>[x[R*3]*.35,x[R*3+2]*.35]).flat(),2)),y.setIndex(p),y.computeVertexNormals(),h.push(y);const _=new Zt(y,e.mossRock);_.name="Terrain-joined natural refuge ledge",_.castShadow=!0,_.receiveShadow=!0,f.add(_);for(const E of[-1,1])for(let R=0;R<3;R++){const S=E*(3.6-R*.12),b=-2.4+R*2.3,U=s([[S,l.floorBottom-l.floorY,b+.55],[S+E*.08,.55,b+.35],[S-E*.12,1.8,b],[S-E*.45,2.6,b-.2]],.16+R*.045,e.bark,15,.48);U.castShadow=!0,h.push(U.geometry),f.add(U)}for(let E=0;E<5;E++){const R=-2.3+E*1.3,S=s([[-3.5,3.03,R],[-1.6,3.12,R-.2],[.5,3.1,R+.1],[3.4,3.04,R+.35]],.075+E%2*.045,e.bark,18,.35);S.castShadow=!0,h.push(S.geometry),m.add(S)}const T=[];for(let E=0;E<4;E++){const R=new te;R.name="Natural life "+E,T.push(R),m.add(R);for(let S=0;S<8+E*3;S++){const b=S*2.399+E*.7,U=Math.cos(b)*(2.1+S%3*.48),P=.35+Math.sin(b)*(2.1+S%4*.2),G=new Zt(r(.65+S%3*.15,.85,.12),u);h.push(G.geometry),G.position.set(U,3.07+S%3*.025,P),G.rotation.set((S%3-1)*.08,b,(S%2-.5)*.1),G.castShadow=!0,G.receiveShadow=!0,R.add(G)}o(R,h)}const A=new te;A.name="Dry leaves inside the root hollow",f.add(A);for(let E=0;E<8;E++){const R=new Zt(r(.3,.48,.045),u);h.push(R.geometry),R.position.set(Math.sin(E*2.4)*2,.025,-1.1+Math.cos(E*2.4)*.7),R.rotation.y=E*1.7,R.receiveShadow=!0,A.add(R)}return o(A,h),l.mesh=c,c.userData={id:i.id,natural:!0,radius:l.radius,owned:h,growth:T,leafMaterial:u,terrain:null,keepCollision:{rects:[]},trainingPoint:c.position.clone(),support:{x:i.x,z:i.z,y:l.floorY,type:"land",radius:0},team:i.team,refuge:l,refugeSolids:f,refugeRoof:m},tf(c,i,a),c}function tf(i,t={},e){const n=i.userData.visualState||{},s={...n,...t},r=vh(Math.floor(Number(s.nestLevel??s.level??s.tier??1)||0),0,3);return i.userData.visualState={team:s.team??"neutral",tier:s.tier??1,nestLevel:r,safe:s.safe!==!1,hp:s.hp,maxHp:s.maxHp,destroyed:!!s.destroyed},i.userData.team=i.userData.visualState.team,i.userData.level=r,i.userData.destroyed=!!s.destroyed,i.userData.refuge&&(i.userData.refuge.team=i.userData.team),i.userData.leafMaterial.color.set(e(i.userData.team)).lerp(new ee("#72964b"),.7),i.userData.growth.forEach((o,a)=>{o.visible=a<=r}),i.userData.collisionRevision=(i.userData.collisionRevision||0)+1,i}const Le=Math.PI*2,es=Fc.clamp,ii=(i,t,e)=>(e=es((e-i)/(t-i),0,1),e*e*(3-2*e));function Fi(i){return()=>{i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const sa=(i,t)=>Math.sin(i*.213+Math.sin(t*.137)*1.9)*.48+Math.sin(t*.329-i*.079)*.27+Math.cos(i*.741+t*.533)*.13,hn=i=>new ee(i),pt=new Xe;new L(0,1,0);const id=[{sky:"#8aaab0",fog:"#819e91",earth:"#8b8a62",wet:"#43533b",deep:"#52634e",leaf:"#b5d28f",rock:"#a4a292",moss:"#89976c",bark:"#65513a",reed:"#b4a676",water:"#2c6258",nightWater:"#0c2b32"},{sky:"#91acbd",fog:"#8bada6",earth:"#82958a",wet:"#3c6257",deep:"#456b68",leaf:"#a0c9ad",rock:"#a7b5ae",moss:"#7f9b88",bark:"#605848",reed:"#aebca0",water:"#3b747b",nightWater:"#122c3b"},{sky:"#b4a58a",fog:"#a39b7e",earth:"#b09b6b",wet:"#685b3c",deep:"#626047",leaf:"#d0b46b",rock:"#b6a184",moss:"#9f9a6d",bark:"#78543b",reed:"#c8ad73",water:"#69765a",nightWater:"#25352b"},{sky:"#82989c",fog:"#738d81",earth:"#7a8064",wet:"#364f3b",deep:"#3e5c52",leaf:"#93b57d",rock:"#939b8b",moss:"#6b8664",bark:"#554934",reed:"#9b9d70",water:"#376b57",nightWater:"#112e29"}];function r1(i=0,t=731+Math.max(0,i)*7919){const e=Math.max(0,Math.floor(Number(i)||0)),n=e%8,[s,r]=[[1,0],[0,1],[-1,0],[0,-1]][n%4],o=n>=4?-1:1,a=(h,u)=>e?{x:s*h*o+r*u,z:-r*h*o+s*u}:{x:h,z:u},l=(h,u)=>e?{x:o*(s*h-r*u),z:r*h+s*u}:{x:h,z:u},c=Fi((Number(t)||731)^Math.imul(e,2654435761));return{index:e,seed:t,symmetry:n,yaw:n%4*Math.PI/2,toWorld:a,toSource:l,palette:{...id[e%id.length]},noiseOffset:e?{x:(c()-.5)*170,z:(c()-.5)*170}:{x:0,z:0}}}function yh(i,t,e=1){const n=document.createElement("canvas");n.width=n.height=i,t(n.getContext("2d"),i);const s=new Fd(n);return s.colorSpace=Un,s.wrapS=s.wrapT=Tr,s.repeat.set(e,e),s.anisotropy=4,s}function Il(i,t=!1){const e=Fi(i);return yh(256,(n,s)=>{n.fillStyle=t?"#6c7155":"#8b8978",n.fillRect(0,0,s,s);for(let r=0;r<15e3;r++){const o=e()*s,a=e()*s,l=45+e()*110;n.fillStyle=t?`rgba(${l*.8},${l},${l*.61},${.12+e()*.28})`:`rgba(${l*1.06},${l},${l*.85},${.15+e()*.3})`,n.fillRect(o,a,.5+e()*3,.5+e()*3)}n.lineWidth=.7;for(let r=0;r<26;r++){n.strokeStyle=`rgba(31,36,28,${.06+e()*.15})`,n.beginPath();let o=e()*s;n.moveTo(0,o);for(let a=0;a<s;a+=10)o+=(e()-.5)*9,n.lineTo(a,o);n.stroke()}},1)}function o1(i){const t=Fi(i);return yh(512,(e,n)=>{const s=e.createRadialGradient(n*.5,n*.5,4,n*.5,n*.5,n*.54);s.addColorStop(0,"#588a39"),s.addColorStop(.6,"#6ca04a"),s.addColorStop(1,"#345d27"),e.fillStyle=s,e.fillRect(0,0,n,n);for(let r=0;r<9e3;r++)e.fillStyle=t()>.5?"rgba(185,214,109,.08)":"rgba(18,58,20,.06)",e.fillRect(t()*n,t()*n,t()*4+1,t()*4+1);for(let r=.18;r<Le-.18;r+=.31){const o=n*.5+Math.cos(r)*n*.49,a=n*.5+Math.sin(r)*n*.49;e.strokeStyle="rgba(191,204,117,.42)",e.lineWidth=1.8,e.beginPath(),e.moveTo(n*.5,n*.5),e.quadraticCurveTo(n*.5+Math.cos(r+.08)*n*.28,n*.5+Math.sin(r+.08)*n*.28,o,a),e.stroke();for(let l=.2;l<.9;l+=.15)for(const c of[-1,1])e.strokeStyle="rgba(186,211,124,.19)",e.lineWidth=.8,e.beginPath(),e.moveTo(n*.5+Math.cos(r)*n*l*.5,n*.5+Math.sin(r)*n*l*.5),e.lineTo(n*.5+Math.cos(r+c*.12)*n*(l+.1)*.5,n*.5+Math.sin(r+c*.12)*n*(l+.1)*.5),e.stroke()}for(let r=0;r<13;r++){const o=t()*Le,a=t()*n*.45;e.fillStyle="rgba(42,56,17,.16)",e.beginPath(),e.ellipse(n*.5+Math.cos(o)*a,n*.5+Math.sin(o)*a,t()*5+2,t()*3+1,o,0,Le),e.fill()}})}function a1(i){const e=document.createElement("canvas");e.width=e.height=256;const n=e.getContext("2d"),s=n.createImageData(256,256);for(let o=0;o<256;o++)for(let a=0;a<256;a++){const l=(o*256+a)*4,c=a*Le/256,h=o*Le/256,u=Math.cos(c*9+h*7)*.27+Math.cos(c*17-h*11)*.14+Math.sin(c*31+h*19)*.07,d=Math.sin(c*7+h*13)*.27+Math.sin(c*19-h*9)*.13+Math.cos(c*29+h*23)*.08;s.data[l]=128+u*110,s.data[l+1]=128+d*110,s.data[l+2]=245,s.data[l+3]=255}n.putImageData(s,0,0);const r=new Fd(e);return r.wrapS=r.wrapT=Tr,r.colorSpace=Di,r}function Gc(i,t,e=.1,n=1){const s=Fi(n),r=i.attributes.position,o=new Float32Array(r.count*3),a=hn(t);for(let l=0;l<r.count;l++){const c=1+(s()-.5)*e;o[l*3]=a.r*c,o[l*3+1]=a.g*c,o[l*3+2]=a.b*c}return i.setAttribute("color",new un(o,3)),i}function Ke(i,t,e,n=12,s=0){const r=new xo(i.map(a=>new L(...a))),o=new Na(r,n,t,5,!1);if(s){const a=o.attributes.position;for(let l=0;l<=n;l++){const c=r.getPointAt(l/n),h=1-s*l/n;for(let u=0;u<=5;u++){const d=l*6+u;a.setXYZ(d,c.x+(a.getX(d)-c.x)*h,c.y+(a.getY(d)-c.y)*h,c.z+(a.getZ(d)-c.z)*h)}}o.computeVertexNormals()}return new Zt(o,e)}function si(i,t=[],e=new Set){i.updateMatrixWorld(!0);const n=new he().copy(i.matrixWorld).invert(),s=new Map;i.traverse(r=>{if(!r.isMesh||r.isInstancedMesh||e.has(r)||Array.isArray(r.material))return;const o=r.material.uuid;s.has(o)||s.set(o,{material:r.material,meshes:[]}),s.get(o).meshes.push(r)});for(const{material:r,meshes:o}of s.values()){if(o.length<2)continue;const a=o.map(h=>h.geometry.clone().applyMatrix4(new he().multiplyMatrices(n,h.matrixWorld))),l=Li(a,!1);for(const h of a)h.dispose();if(!l)continue;const c=new Zt(l,r);c.castShadow=o.some(h=>h.castShadow),c.receiveShadow=!0,t.push(l);for(const h of o){h.removeFromParent();const u=t.indexOf(h.geometry);u>=0&&(t.splice(u,1),h.geometry.dispose())}i.add(c)}}function Qi(i=1,t=1,e=.08){const n=[],s=[],r=[];for(let c=0;c<=3;c++)for(let h=0;h<=40;h++){const u=c/3,d=.22+h/40*(Le-.44),f=1+.027*Math.sin(d*7)+.016*Math.cos(d*13),m=Math.cos(d)*u*f,g=Math.sin(d)*u*f;n.push(m*i,e*(u*u)+.014*Math.sin(d*4)*u*u,g*t),s.push(m*.48+.5,g*.48+.5)}for(let c=0;c<3;c++)for(let h=0;h<40;h++){const u=c*41+h,d=u+40+1;r.push(u,u+1,d,d,u+1,d+1)}const l=new we;return l.setAttribute("position",new Gt(n,3)),l.setAttribute("uv",new Gt(s,2)),l.setIndex(r),l.computeVertexNormals(),l}function Ll(i){const t=Fi(i),e=28,n=[[-.47,.57],[-.2,.91],[.15,1],[.52,.86],[.71,.61],[.76,.08]],s=[],r=[],o=[],a=Array.from({length:e+1},(h,u)=>.87+.12*Math.sin(u*1.51+i)+t()*.12);a[e]=a[0];for(let h=0;h<n.length;h++)for(let u=0;u<=e;u++){const d=u/e*Le,f=n[h][1]*a[u],m=(Math.sin(d*5+i)+Math.sin(d*9-i))*.045;s.push(Math.cos(d)*f,n[h][0]+m*(h===5?.15:1),Math.sin(d)*f*.86),r.push(Math.cos(d)*f*.5+.5,Math.sin(d)*f*.5+.5)}for(let h=0;h<n.length-1;h++)for(let u=0;u<e;u++){const d=h*(e+1)+u,f=d+e+1;o.push(d,f,d+1,d+1,f,f+1)}const l=s.length/3;s.push(0,.764,0),r.push(.5,.5);for(let h=0;h<e;h++)o.push(l,(n.length-1)*(e+1)+h+1,(n.length-1)*(e+1)+h);const c=new we;return c.setAttribute("position",new Gt(s,3)),c.setAttribute("uv",new Gt(r,2)),c.setIndex(o),c.computeVertexNormals(),c}function Vc(i){const t=Fi(i),e=[],n=[],s=[],r=[];for(let a=0;a<5;a++){const l=t()*Le,c=.55+t()*.7,h=.1+t()*.35,u=.022+t()*.035,d=hn(a%2?"#819c42":"#526f33"),f=e.length/3;for(let m=0;m<=7;m++){const g=m/7,x=Math.cos(l)*h*g*g,p=Math.sin(l)*h*g*g,v=u*Math.sin(Math.PI*(g*.94+.04));for(const y of[-1,1])e.push(x+Math.cos(l+Math.PI/2)*v*y,g*c,p+Math.sin(l+Math.PI/2)*v*y),n.push(y*.5+.5,g),r.push(d.r*(.65+g*.35),d.g*(.65+g*.35),d.b*(.65+g*.35))}for(let m=0;m<7;m++){const g=f+m*2;s.push(g,g+1,g+2,g+1,g+3,g+2)}}const o=new we;return o.setAttribute("position",new Gt(e,3)),o.setAttribute("uv",new Gt(n,2)),o.setAttribute("color",new Gt(r,3)),o.setIndex(s),o.computeVertexNormals(),o}function l1(){const i=new Na(new xo([new L,new L(.03,.8,.015),new L(.1,1.8,.04)]),9,.013,5,!1);Gc(i,"#64754a",.15,8);const t=new Jn(1,7,7);t.scale(.065,.25,.065),t.translate(.1,1.61,.04),Gc(t,"#5d3f27",.3,5);const e=Vc(92);e.scale(.8,1.45,.8);const n=Li([i,t,e],!1);return i.dispose(),t.dispose(),e.dispose(),n}function c1(i){const t=new Jn(1,13,9),e=t.attributes.position;for(let n=0;n<e.count;n++){const s=e.getX(n),r=e.getY(n),o=e.getZ(n),a=1+.06*Math.sin(s*12+i)*Math.sin(o*13-r*7);e.setXYZ(n,s*a,r*.83*a,o*a)}return t.computeVertexNormals(),t}function h1(){const i=[],t=[],e=[];function n(r,o,a,l){const c=i.length/3;i.push(...r,...o,...a);const h=hn(l);for(let u=0;u<3;u++)t.push(h.r,h.g,h.b);e.push(c,c+1,c+2)}n([0,.025,-.1],[-.045,0,0],[0,.04,.09],"#16201b"),n([0,.025,-.1],[0,.04,.09],[.045,0,0],"#293327"),n([0,0,0],[-.17,.025,-.035],[-.12,.015,.07],"#a0b3b0"),n([0,0,0],[.12,.015,.07],[.17,.025,-.035],"#a0b3b0");const s=new we;return s.setAttribute("position",new Gt(i,3)),s.setAttribute("color",new Gt(t,3)),s.setIndex(e),s.computeVertexNormals(),s}function Zr(i,t,e,n,{castShadow:s=!1,receiveShadow:r=!1,dynamic:o=!1}={}){const a=new te;a.name=n;const l=new Map,c=[],h=[],u=new Set,d=128;e.forEach((f,m)=>{const g=Math.floor(f.x/d)+":"+Math.floor(f.z/d);l.has(g)||l.set(g,[]),l.get(g).push(m)});for(const[f,m]of l){const g=new En(i,t,m.length);g.name=n+" · "+f,g.castShadow=s,g.receiveShadow=r,g.userData.spatialChunk=!0,g.userData.chunkSpan=d,o&&g.instanceMatrix.setUsage(Ii),m.forEach((x,p)=>{c[x]={mesh:g,index:p}}),a.add(g),h.push(g)}return{group:a,meshes:h,count:e.length,setMatrixAt(f,m){const g=c[f];g.mesh.setMatrixAt(g.index,m),u.add(g.mesh)},setColorAt(f,m){const g=c[f];g.mesh.setColorAt(g.index,m)},finish(){for(const f of h)f.computeBoundingBox(),f.computeBoundingSphere(),f.boundingSphere.radius+=.75,f.instanceMatrix.needsUpdate=!0,f.instanceColor&&(f.instanceColor.needsUpdate=!0);u.clear()},flush(){for(const f of u)f.instanceMatrix.needsUpdate=!0;u.clear()}}}function u1(i,t,e={}){const n=Math.max(0,Math.floor(Number(e.regionIndex)||0)),s=e.seed??731+n*7919,r=r1(n,s),o=r.palette,a=Fi(s),l=new te;l.name="The living creek",i.add(l);const c=e.natural===!0,h=c?Qy(r):null,u=h?.landmarks||[],d=h?.nest||null,f=h?.cover||[],m=[],g=[];let x=Ji,p=Ji,v={flow:.45},y=!1,_=null;const T=[],A=[],E=new Set,R=new Map,S=new Set,b=[],U=new Map,P=6;let G=null;const j={reflectionRenders:0,reflectionSkips:0,flyMatricesUpdated:0,spatialChunks:0,terrainUpdates:0};new ee(o.sky);const H=new ee(o.fog);i.fog?i.fog.color.copy(H):i.fog=new Ia(H,.0042);const q=Il(s),B=Il(s+9,!0),O=o1(s),Q=a1();b.push(q,B,O,Q);const W={terrain:new We({color:16777215,vertexColors:!0,map:B,roughness:1}),leaf:new We({color:o.leaf,map:O,roughness:.44,metalness:.025,side:Pe}),rock:new We({color:o.rock,map:q,roughness:.89}),mossRock:new We({color:o.moss,map:B,roughness:.94}),plant:new We({color:16777215,vertexColors:!0,roughness:.87,side:Pe}),bark:new We({color:o.bark,map:q,roughness:.94}),reed:new We({color:o.reed,map:q,roughness:.83}),compost:new We({color:"#57422e",map:B,roughness:1}),fruit:new We({color:"#b38539",map:q,roughness:.75}),darkFruit:new We({color:"#685831",map:B,roughness:.95})},ft=[Ll(7),Ll(35),Ll(89)],Vt=Qi(),Me=c1(19),ce=[{id:"home",x:8,z:8,radius:7.4,team:"neutral",name:"Willow Haven"},{id:"mudfang",x:-31,z:-30,radius:7,team:"enemy",name:"Mudfang Den"},{id:"redreed",x:31,z:-56,radius:7.6,team:"enemy",name:"Red Reed Stronghold"},{id:"mossjaw",x:-24,z:49,radius:7.1,team:"enemy",name:"Mossjaw Hollow"},{id:"blackpool",x:34,z:79,radius:8,team:"enemy",name:"Blackwater Nest"},{id:"thornback",x:-8,z:-91,radius:8,team:"enemy",name:"Thornback Root"},{id:"oldwillow",x:-38,z:96,radius:7.5,team:"neutral",name:"Αυλή της Γέρικης Ιτιάς"},{id:"quietbend",x:29,z:32,radius:6.8,team:"neutral",name:"Quiet Bend"},{id:"foxglove",x:-39,z:2,radius:6.8,team:"neutral",name:"Foxglove Island"},{id:"reedcrossing",x:3,z:-45,radius:6.8,team:"neutral",name:"Πέρασμα των Καλαμιών"},{id:"longreed",x:-4,z:67,radius:6.8,team:"neutral",name:"Νησίδα των Ανέμων"},{id:"eastshallows",x:58,z:35,radius:6.8,team:"neutral",name:"Ανατολικές Αβαθείς"}],ht={home:.65,mudfang:2.7,redreed:4.1,mossjaw:1.8,blackpool:5.2,thornback:7.1,oldwillow:2.9,quietbend:1.2,foxglove:2.1,reedcrossing:1.7,longreed:2.5,eastshallows:3.4},Y=Fi(s^3582759),rt={home:{x:17,z:16,radius:7.4,elevation:.65},mudfang:{x:38,z:-19,radius:9,elevation:1.35},redreed:{x:-37,z:-46,radius:11,elevation:1.2},mossjaw:{x:-34,z:44,radius:11,elevation:1.05},blackpool:{x:40,z:86,radius:12,elevation:1.5},thornback:{x:-16,z:-120,radius:12,elevation:1.65}};for(const M of ce){const I=rt[M.id],k=c&&I?{x:I.x,z:I.z}:{x:M.x*ge,z:M.z*ge};Object.assign(M,r.toWorld(k.x,k.z)),M.radius=c?I?.radius||10:Math.max(36,M.radius*(M.id==="thornback"?5.8:4.9)),M.elevation=c?I?.elevation||1.1:Math.max(.45,ht[M.id]+(n?(Y()-.5)*.6:0)),M.shorePhase=k.x+(n?Y()*Le:0),n&&(M.yaw=r.yaw)}ce.find(M=>M.id==="thornback").stronghold=!0;const _t=[{id:"haven",name:"Απάνεμη Όχθη",x:0,z:12,radius:30,tint:"#77965d"},{id:"reedways",name:"Περάσματα των Καλαμιών",x:2,z:-50,radius:45,tint:"#a99d64"},{id:"westernroots",name:"Δυτικές Ρίζες",x:-34,z:22,radius:37,tint:"#657f67"},{id:"blackwater",name:"Βαθύ Νερό",x:10,z:75,radius:34,tint:"#496f79"}].map(M=>({...M,...r.toWorld(M.x*ge,M.z*ge),radius:M.radius*ge})),Xt={heron:r.toWorld(34*ge,14*ge),snake:r.toWorld(-38*ge,-22*ge),fish:r.toWorld(12*ge,48*ge)},kt={heron:r.toWorld(43*ge,-73*ge),snake:r.toWorld(-39*ge,70*ge),fish:r.toWorld(11*ge,94*ge)};c&&(Object.assign(Xt,{heron:r.toWorld(34,15),snake:r.toWorld(-26,-23),fish:r.toWorld(5,-34)}),Object.assign(kt,{heron:r.toWorld(41,-70),snake:r.toWorld(-34,62),fish:r.toWorld(7,106)}));const fe=c?ce.map(M=>({...M,...r.toSource(M.x,M.z)})):[];function Ee(M,I){const k=r.toSource(M,I),F=k.x/ge,N=k.z/ge;if(c)return t1(k.x,k.z,sa(k.x+r.noiseOffset.x,k.z+r.noiseOffset.z),fe);const V=Math.sin(N*.032)*15+Math.sin(N*.073)*5,Z=Math.abs(F-V);let X=-2.2+sa(k.x+r.noiseOffset.x,k.z+r.noiseOffset.z)*.47+ii(44,71,Z)*6;X+=ii(47,72,Z)*(1.5+3.3*Math.sin(N*.036+.7)**2),X+=ii(105,132,Math.abs(N))*4.8;let it=null,dt=0;for(const Nt of ce){const re=M-Nt.x,Re=I-Nt.z,Ce=Math.hypot(re,Re),me=r.toSource(re,Re),nn=Nt.radius*(1+.05*Math.sin(Math.atan2(me.z,me.x)*5+Nt.shorePhase));if(Ce<nn+7){const Je=Uy,cn=Nt.elevation-ii(Je,nn+7,Ce)*(Nt.elevation+2.8);X=Math.max(X,cn);const vn=1-ii(Je,Je+8,Ce);vn>dt&&(it=Nt,dt=vn)}}it&&(X=X*(1-dt)+it.elevation*dt);let Tt=null,$t=0,It=1/0;for(const Nt of R.values()){const re=Math.hypot(M-Nt.x,I-Nt.z),Re=1-ii(ws,ws+na,re);(Re>$t||Re===$t&&Re>0&&re<It)&&(Tt=Nt,$t=Re,It=re)}if(Tt){const Nt=X*(1-$t)+Tt.elevation*$t;X=$t===1?Tt.elevation:Math.max(X,Nt)}return X}const D=new Ui(270*ge,270*ge,216,216);D.rotateX(-Math.PI/2);const ne=D.attributes.position,Yt=new Float32Array(ne.count*3),qt=hn(o.earth),Lt=hn(o.wet),se=hn(o.deep);for(let M=0;M<ne.count;M++){const I=ne.getX(M),k=ne.getZ(M),F=Ee(I,k);ne.setY(M,F);const N=se.clone().lerp(Lt,ii(-1.7,.05,F)).lerp(qt,ii(.02,2,F));N.multiplyScalar(.88+sa(I*2,k*2)*.18),N.toArray(Yt,M*3)}D.setAttribute("color",new un(Yt,3)),D.computeVertexNormals(),B.repeat.set(44*ge,44*ge);const mt=new Zt(D,W.terrain);mt.receiveShadow=!0,mt.name="Creek bed and island banks",l.add(mt);const Mt=135*ge,le=270*ge/216,De=217;function z(M,I){const k=Fc.clamp((M+Mt)/le,0,216),F=Fc.clamp((I+Mt)/le,0,216),N=Math.min(215,Math.floor(k)),V=Math.min(215,Math.floor(F)),Z=k-N,X=F-V,it=V*De+N,dt=it+De,Tt=ne.getY(it),$t=ne.getY(it+1),It=ne.getY(dt),Nt=ne.getY(dt+1);return Z+X<=1?Tt+Z*($t-Tt)+X*(It-Tt):Nt+(1-Z)*(It-Nt)+(1-X)*($t-Nt)}function w(M){const I=ws+na+le*2;for(let k=0;k<ne.count;k++){const F=ne.getX(k),N=ne.getZ(k);if(Math.abs(F-M.x)>I||Math.abs(N-M.z)>I)continue;const V=Ee(F,N);ne.setY(k,V);const Z=se.clone().lerp(Lt,ii(-1.7,.05,V)).lerp(qt,ii(.02,2,V));Z.multiplyScalar(.88+sa(F*2,N*2)*.18),Z.toArray(Yt,k*3)}ne.needsUpdate=!0,D.attributes.color.needsUpdate=!0,D.computeVertexNormals(),D.computeBoundingBox(),D.computeBoundingSphere(),j.terrainUpdates++}const tt=Il(s+9,!0);b.push(tt),W.mossRock.map=tt,W.compost.map=tt,W.darkFruit.map=tt;const at=new Ui(266*ge,266*ge,88,88),lt=new zy(at,{textureWidth:512,textureHeight:512,waterNormals:Q,sunDirection:new L(.6,.8,-.3),sunColor:16771517,waterColor:3039835,distortionScale:2.5,alpha:.91,fog:!0});lt.name="Reflecting creek",lt.rotation.x=-Math.PI/2,lt.position.y=Ji,lt.material.transparent=!0,lt.material.depthWrite=!1,lt.renderOrder=-2,lt.material.uniforms.size.value=4.8,l.add(lt);const ot=lt.onBeforeRender;let Ut=0;lt.onBeforeRender=function(M,I,k){if(lt.material.uniforms.eye.value.setFromMatrixPosition(k.matrixWorld),Ut++%2){j.reflectionSkips++;return}j.reflectionRenders++,ot.call(this,M,I,k)};const ct=at.attributes.position.array.slice(),St=[],Pt=new te,gt=[];Pt.name="Willow trunks and tangled roots",l.add(Pt);for(let M of[-1,1])for(let I=0;I<15;I++){const k=(-122+I*17+(a()-.5)*7)*ge,F=(M*(59+a()*15)+Math.sin(k/ge*.032)*15)*ge,{x:N,z:V}=r.toWorld(F,k),Z=Ee(N,V);if(Z<.2)continue;const X=new te;X.position.set(N,Z,V);const it=9+a()*14,dt=(a()-.5)*3,Tt=Ke([[0,-.8,0],[.25,it*.3,0],[dt,it*.72,.6],[dt*.8,it,1]],.68+a()*.65,W.bark,13,.72);Tt.castShadow=!0,X.add(Tt),St.push(Tt.geometry);for(let $t=0;$t<5;$t++){const It=$t/5*Le+a(),Nt=3+a()*4,re=Ke([[0,.7,0],[Math.cos(It)*Nt*.45,.1,Math.sin(It)*Nt*.45],[Math.cos(It)*Nt,-.4,Math.sin(It)*Nt]],.15+a()*.2,W.bark,9,.82);re.castShadow=!0,X.add(re),St.push(re.geometry)}for(let $t=0;$t<4;$t++){const It=a()*Le,Nt=it*(.5+a()*.3),re=3+a()*6,Re=Ke([[dt*.4,Nt,0],[Math.cos(It)*re*.45,Nt+2,Math.sin(It)*re*.45],[Math.cos(It)*re,Nt+3,Math.sin(It)*re]],.16+a()*.2,W.bark,10,.83);X.add(Re),St.push(Re.geometry);for(let Ce=0;Ce<70;Ce++){const me=Math.sqrt(a())*4,nn=a()*Le;gt.push({x:N+Math.cos(It)*re+Math.cos(nn)*me,y:Z+Nt+3+(a()-.5)*3-Math.abs(me)*.25,z:V+Math.sin(It)*re+Math.sin(nn)*me,angle:a()*Le,scale:.65+a()*.6})}}Pt.add(X)}si(Pt,St);const Rt=new we;Rt.setAttribute("position",new Gt([0,0,0,-.12,-.32,.035,0,-.38,.06,.12,-.32,.035,-.1,-.64,.02,0,-.76,.04,.1,-.64,.02,0,-1.05,0],3)),Rt.setAttribute("uv",new Gt([.5,0,0,.3,.5,.35,1,.3,0,.6,.5,.7,1,.6,.5,1],2)),Rt.setIndex([0,1,2,0,2,3,1,4,2,2,4,5,2,5,6,2,6,3,4,7,5,5,7,6]),Rt.computeVertexNormals(),Gc(Rt,"#69834d",.25,s);const jt=Zr(Rt,W.plant,gt,"Hanging willow foliage");gt.forEach((M,I)=>{pt.position.set(M.x,M.y,M.z),pt.rotation.set((a()-.5)*.8,M.angle,(a()-.5)*.7),pt.scale.setScalar(M.scale),pt.updateMatrix(),jt.setMatrixAt(I,pt.matrix)}),jt.finish(),l.add(jt.group),j.spatialChunks+=jt.meshes.length;function Ot(M){T.push(M);const I=Math.floor((M.x-M.radius)/P),k=Math.floor((M.x+M.radius)/P),F=Math.floor((M.z-M.radius)/P),N=Math.floor((M.z+M.radius)/P);for(let V=I;V<=k;V++)for(let Z=F;Z<=N;Z++){const X=V+":"+Z;U.has(X)||U.set(X,[]),U.get(X).push(M)}return M}const wt=[],ue=[[],[],[]];function $(M,I,k=1.35+a()*.9){const F=Ot({id:"p"+T.length,type:"lily",x:M,z:I,y:.105,radius:k*.91,visualRadius:k,angle:a()*Le,phase:a()*Le});return wt.push(F),F}function yt(M,I,k=1.3+a()*1.3,F=.65+a()*.65){const N=Math.floor(a()*3),V=Ot({id:"p"+T.length,type:"rock",x:M,z:I,y:F*.76-.05,radius:k*.72,visualRadius:k,scaleY:F,angle:a()*Le,variant:N});return ue[N].push(V),V}const Et=r.toWorld(3.7,1),Ft=r.toWorld(-3.9,2.2);if($(0,0,3.1),$(Et.x,Et.z,2.3),yt(Ft.x,Ft.z,2.5,.9),c){const M=u.find(I=>I.id==="pond").findPoint;$(M.x,M.z,1.7)}function xt(M,I){const k=Math.hypot(I.x-M.x,I.z-M.z),F=Math.ceil(k/3.65),N=r.toSource(M.x,M.z),V=r.toSource(I.x,I.z);for(let Z=1;Z<F;Z++){const X=Z/F,{x:it,z:dt}=r.toWorld(N.x+(V.x-N.x)*X+Math.sin(X*Math.PI*3)*1.25,N.z+(V.z-N.z)*X);if(Ee(it,dt)>-.1)continue;const Tt=r.toSource(it,dt);c&&Tt.x>14&&Tt.x<32&&Math.abs(Tt.z+16)<3.7||(a()<.18?yt(it,dt,1.8+a()*.7,.65+a()*.55):$(it,dt,1.65+a()*.65))}}const ut={id:"origin",x:0,z:0},Bt=new Map(ce.map(M=>[M.id,M]));Bt.set("origin",ut);const Be=[["origin","home"],["origin","foxglove"],["home","mudfang"],["home","quietbend"],["mudfang","reedcrossing"],["reedcrossing","redreed"],["reedcrossing","thornback"],["foxglove","mossjaw"],["quietbend","mossjaw"],["quietbend","eastshallows"],["mossjaw","longreed"],["longreed","blackpool"],["longreed","oldwillow"],["eastshallows","blackpool"],["redreed","thornback"]].map(([M,I])=>({from:M,to:I,start:Bt.get(M),end:Bt.get(I)}));for(const M of Be)xt(M.start,M.end);if(c){const M=I=>u.find(k=>k.id===I);for(const[I,k]of[[ut,M("creek")],[M("creek"),M("roots")],[M("roots"),M("bank")],[M("bank"),d]])xt(I,k)}for(let M=0;M<1180;M++){const I=(a()-.5)*218*ge,k=((a()-.5)*108+Math.sin(I/ge*.032)*10)*ge,{x:F,z:N}=r.toWorld(k,I);if(Ee(F,N)>-.18)continue;const V=r.toSource(F,N);c&&V.x>14&&V.x<32&&Math.abs(V.z+16)<3.7||(U.get(Math.floor(F/P)+":"+Math.floor(N/P))||[]).some(X=>Math.hypot(X.x-F,X.z-N)<X.radius+1)||(a()<.15?yt(F,N,1.1+a()*2.3,.55+a()*1.2):$(F,N,1.1+a()*1.1))}for(const M of ce)Ot({id:"island-"+M.id,type:"land",x:M.x,z:M.z,y:M.elevation,radius:M.radius*.8});const ve=Zr(Vt,W.leaf,wt,"Veined water lily leaves",{castShadow:!0,receiveShadow:!0,dynamic:!0});wt.forEach((M,I)=>{pt.position.set(M.x,M.y,M.z),pt.rotation.set((a()-.5)*.04,M.angle,(a()-.5)*.035),pt.scale.set(M.visualRadius,1,M.visualRadius*(.89+a()*.18)),pt.updateMatrix(),ve.setMatrixAt(I,pt.matrix),ve.setColorAt(I,hn(["#b6cf8a","#88ac67","#749d59","#c0cc7e","#729958"][Math.floor(a()*5)]))}),ve.finish(),l.add(ve.group),j.spatialChunks+=ve.meshes.length,ue.forEach((M,I)=>{const k=Zr(ft[I],I===1?W.mossRock:W.rock,M,"Weathered waterline outcrops",{castShadow:!0,receiveShadow:!0});M.forEach((F,N)=>{pt.position.set(F.x,-.05,F.z),pt.rotation.set(0,F.angle,0),pt.scale.set(F.visualRadius,F.scaleY,F.visualRadius),pt.updateMatrix(),k.setMatrixAt(N,pt.matrix),k.setColorAt(N,hn("#ffffff").multiplyScalar(.7+a()*.4))}),k.finish(),l.add(k.group),j.spatialChunks+=k.meshes.length});const An=new we,On=[],Ir=[],li=[];for(let M=0;M<=9;M++){const I=M/9,k=Math.sin(I*Math.PI)*.16;for(const F of[-1,1])On.push(F*k,.13*Math.sin(I*Math.PI)+.23*I*I,I*.65),Ir.push(F*.5+.5,I)}for(let M=0;M<9;M++){const I=M*2;li.push(I,I+1,I+2,I+1,I+3,I+2)}An.setAttribute("position",new Gt(On,3)),An.setAttribute("uv",new Gt(Ir,2)),An.setIndex(li),An.computeVertexNormals();const Lr=new We({color:"#f4e5d5",roughness:.48,side:Pe}),Ur=wt.filter((M,I)=>I%23===5),ps=new En(An,Lr,Ur.length*13);let Fs=0;for(const M of Ur)for(let I=0;I<13;I++)pt.position.set(M.x+.24,M.y+.045,M.z),pt.rotation.set(I>7?.1:0,I/8*Le,I>7?.1:0),pt.scale.setScalar(I>7?.67:1),pt.updateMatrix(),ps.setMatrixAt(Fs++,pt.matrix);l.add(ps);const Vi=[];for(let M=0;M<26e3;M++){const I=(a()-.5)*254*ge,k=(a()-.5)*254*ge,F=Ee(I,k);F<-.52||F>3.2||ce.some(N=>Math.hypot(N.x-I,N.z-k)<N.radius*.68)||Math.hypot(I,k)<8||Vi.push({x:I,z:k,y:F,scale:.65+a()*2.2,angle:a()*Le})}const Os=Vc(44),ci=Zr(Os,W.plant,Vi,"Curved river reeds",{receiveShadow:!0});Vi.forEach((M,I)=>{pt.position.set(M.x,M.y,M.z),pt.rotation.set(0,M.angle,0),pt.scale.set(.65+M.scale*.25,M.scale,.65+M.scale*.25),pt.updateMatrix(),ci.setMatrixAt(I,pt.matrix),ci.setColorAt(I,hn("#ffffff").multiplyScalar(.75+a()*.5))}),ci.finish(),l.add(ci.group),j.spatialChunks+=ci.meshes.length;const Bs=Vi.filter((M,I)=>M.y<.5&&I%5===0),Wa=l1(),Wi=Zr(Wa,W.plant,Bs,"Cattail patches");Bs.forEach((M,I)=>{pt.position.set(M.x+.12,M.y,M.z),pt.rotation.set(0,M.angle,0),pt.scale.setScalar(.7+M.scale*.4),pt.updateMatrix(),Wi.setMatrixAt(I,pt.matrix)}),Wi.finish(),l.add(Wi.group),j.spatialChunks+=Wi.meshes.length;const So={value:0};W.plant.onBeforeCompile=M=>{M.uniforms.uCreekTime=So,M.vertexShader=`uniform float uCreekTime;
`+M.vertexShader,M.vertexShader=M.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 transformed.x += sin(uCreekTime * 1.1 + position.y * 2.3 + instanceMatrix[3].x * .13 + instanceMatrix[3].z * .17) * pow(max(position.y, 0.0), 1.6) * .035;`)},W.plant.customProgramCacheKey=()=>"creek-wind-1";function ms(M,I){const k=c?x-.065:-.1;let F=z(M,I),N=F>k?"land":"water",V=null;F<=k&&(F=c?x-.215:-.25);const Z=U.get(Math.floor(M/P)+":"+Math.floor(I/P))||[];for(const X of Z){if(X.type==="land")continue;const it=Math.hypot(M-X.x,I-X.z);if(it<=X.radius){let dt=X.y;if(X.type==="rock"&&(dt-=ii(X.radius*.62,X.radius,it)*.14*X.scaleY),c&&dt<=k)continue;dt>F&&(F=dt,N=X.type==="shelter"?"land":X.type,V=X)}}return jy(g,M,I)||{height:F,type:N,platform:V}}function Nr(M,I){return ms(M,I).height}const Hs=[{x:4.5/ge,z:-4/ge,rich:!1},{x:-10,z:12,rich:!0},{x:15,z:-20,rich:!1},{x:-25,z:-23,rich:!0},{x:26,z:-47,rich:!0},{x:-17,z:40,rich:!0},{x:27,z:69,rich:!0},{x:-4,z:-81,rich:!0},{x:-34,z:86,rich:!0},{x:23,z:26,rich:!1},{x:-33,z:7,rich:!1},{x:4,z:51,rich:!1},{x:9,z:-59,rich:!1},{x:-12,z:76,rich:!1},{x:39,z:-4,rich:!1},{x:-42,z:-59,rich:!0},{x:7,z:-39,rich:!0},{x:0,z:63,rich:!0},{x:53,z:33,rich:!0},{x:-24,z:17,rich:!1},{x:17,z:-70,rich:!1},{x:18,z:90,rich:!0}].map(M=>({...M,...r.toWorld(M.x*ge,M.z*ge)}));if(c)for(const[M,I]of[{x:4.5,z:-4},{x:18,z:14},{x:9,z:-24},{x:26,z:10},{x:31,z:-16},{x:-20,z:-8}].entries())Object.assign(Hs[M],r.toWorld(I.x,I.z));const C=[],K=[],et=[],nt=new te;l.add(nt);for(let M=0;M<Hs.length;M++){const I=Hs[M];Ee(I.x,I.z)<-.15&&yt(I.x,I.z,I.rich?3.2:2.2,.62);const F=Nr(I.x,I.z),N={id:"flies-"+M,x:I.x,z:I.z,y:F+.25,flies:I.rich?240:100,maxFlies:I.rich?240:100,rich:I.rich};if(c){const Z=[...u].sort((X,it)=>Math.hypot(I.x-X.x,I.z-X.z)-Math.hypot(I.x-it.x,I.z-it.z))[0]?.id||"creek";N.ecology={habitat:Z,activity:1},N.regenMultiplier=1}A.push(N);const V=new Zt(ft[M%3],W.compost);V.position.set(I.x,F+.05,I.z),V.scale.set(I.rich?1.7:1.05,.28,I.rich?1.25:.75),V.rotation.y=a()*Le,l.add(V),K.push(V);for(let Z=0;Z<(I.rich?12:6);Z++){const X=a()*Le,it=a()*(I.rich?1.5:.85),dt=.12+a()*.16;C.push({spot:M,groundOffset:dt,x:I.x+Math.cos(X)*it,y:F+dt,z:I.z+Math.sin(X)*it,scale:.12+a()*.18,rot:a()*Le})}for(let Z=0;Z<3;Z++){const X=a()*Le,it=.7+a()*.8,dt=Ke([[0,0,0],[it*.5,.02,.06],[it,.04,.14]],.035,W.bark,4);dt.position.set(I.x+(a()-.5)*1.6,F+.1,I.z+(a()-.5)*1.6),dt.rotation.y=X,nt.add(dt),et.push(dt.geometry)}}si(nt,et);for(const M of Hs)if(Ee(M.x,M.z)<-.15){const I=ue.flat().find(k=>Math.abs(k.x-M.x)<.01&&Math.abs(k.z-M.z)<.01);if(I){const k=new Zt(ft[I.variant],W.mossRock);k.position.set(I.x,-.05,I.z),k.rotation.y=I.angle,k.scale.set(I.visualRadius,I.scaleY,I.visualRadius),k.castShadow=!0,k.receiveShadow=!0,l.add(k)}}const J=new En(Me,W.fruit,C.length);C.forEach((M,I)=>{pt.position.set(M.x,M.y,M.z),pt.rotation.set(.3,M.rot,.2),pt.scale.setScalar(M.scale),pt.updateMatrix(),J.setMatrixAt(I,pt.matrix),J.setColorAt(I,hn(["#cb9d59","#6d7341","#aa7044","#c5ad62"][I%4]))}),l.add(J);const vt=[];for(let M=0;M<A.length;M++)for(let I=0;I<(A[M].rich?65:30);I++)vt.push({spot:M,phase:a()*Le,phase2:a()*Le,r:.25+a()*(A[M].rich?2.3:1.35),height:.45+a()*1.9,speed:.65+a()*1.7,rank:I});const Dt=A.map(()=>[]);for(const M of vt)Dt[M.spot].push(M);const Ht=new We({vertexColors:!0,roughness:.45,side:Pe}),zt=new En(h1(),Ht,vt.length);zt.instanceMatrix.setUsage(Ii),zt.frustumCulled=!1,zt.name="Fly swarms",zt.count=0,l.add(zt);const Kt=c?n1({group:l,layout:r,terrainHeight:z,surface:ms,insertPlatform:Ot,materials:W,rockGeos:ft,tube:Ke,leafGeometry:Qi,bladeGeometry:Vc,geography:h}):null;Kt&&m.push(...Kt.grips);function oe(M,I){return c&&ms(M,I).type==="water"?e1(r,M,I,v.flow):{x:0,z:0,strength:0}}function Jt(M,I){return c&&f.some(k=>Math.hypot(M-k.x,I-k.z)<k.radius*.85)&&z(M,I)>x-.5}function be(M){x=M,lt.position.y=M,lt.updateMatrix(),ps.position.y=M-Ji,ps.updateMatrix();for(const I of wt)I.y=.105+M-Ji}function Ne(M={}){if(!c)return!1;v={...v,...M.phase||{}},p=Ji+es(Number(v.waterOffset)||0,-.75,.65),y||(be(p),y=!0);for(const k of A){const F=k.ecology?.habitat===v.foodShift?1.4:typeof v.foodShift=="string"?.45:1;k.regenMultiplier=F,k.ecology.activity=F}const I=M.nest;if(I&&Number.isFinite(I.x)&&Number.isFinite(I.z)){const k={id:"living-creek-nest",x:I.x,z:I.z,team:"ally",natural:!0,nestLevel:I.level??0,safe:I.safe,hp:1,maxHp:1};_?Ya(_,k):_=Eo(k)}return Kt.sync(M,x),!0}const He=64,ke=new Ui(2,2),Te=new qm;ke.rotateX(-Math.PI/2),Te.index=ke.index,Te.attributes.position=ke.attributes.position,Te.attributes.uv=ke.attributes.uv;const Qt=new Float32Array(He*3),qe=new Float32Array(He).fill(-100),Ae=new Float32Array(He),Mn=new Float32Array(He*3);Te.setAttribute("aCenter",new fr(Qt,3)),Te.setAttribute("aStart",new fr(qe,1)),Te.setAttribute("aSize",new fr(Ae,1)),Te.setAttribute("aTint",new fr(Mn,3)),Te.instanceCount=He;const bi=new Kn({transparent:!0,depthWrite:!1,side:Pe,uniforms:{uTime:{value:0}},vertexShader:"attribute vec3 aCenter; attribute float aStart; attribute float aSize; attribute vec3 aTint; uniform float uTime; varying vec2 vUv; varying float vLife; varying vec3 vTint; void main(){vUv=uv; vLife=(uTime-aStart)/2.4; vTint=aTint; vec3 p=position*aSize*(.35+clamp(vLife,0.,1.)*3.8)+aCenter; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}",fragmentShader:"varying vec2 vUv;varying float vLife;varying vec3 vTint;void main(){if(vLife<0.||vLife>1.)discard;float r=length(vUv-.5)*2.;float band=exp(-pow((r-.82)/(.026+vLife*.018),2.))* .58+exp(-pow((r-.64)/.026,2.))*.22;float a=band*pow(1.-vLife,1.6);gl_FragColor=vec4(vTint,a);}"}),gn=new Zt(Te,bi);gn.frustumCulled=!1,gn.renderOrder=2,l.add(gn);let gs=0,$e=0;const en=1100,ln=new Float32Array(en*3),pn=new Float32Array(en*3),xn=new Float32Array(en),Xi=new Float32Array(en),hi=Array.from({length:en},()=>({life:0,max:1,vx:0,vy:0,vz:0,water:!0}));let yf=0;const Si=new we;Si.setAttribute("position",new un(ln,3).setUsage(Ii)),Si.setAttribute("aColor",new un(pn,3).setUsage(Ii)),Si.setAttribute("aSize",new un(xn,1).setUsage(Ii)),Si.setAttribute("aAlpha",new un(Xi,1).setUsage(Ii));const _f=new Kn({transparent:!0,depthWrite:!1,uniforms:{uScale:{value:500}},vertexShader:"attribute vec3 aColor;attribute float aSize;attribute float aAlpha;uniform float uScale;varying vec3 vColor;varying float vAlpha;void main(){vColor=aColor;vAlpha=aAlpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*uScale/max(.1,-mv.z),1.,35.);}",fragmentShader:"varying vec3 vColor;varying float vAlpha;void main(){vec2 p=gl_PointCoord-.5;float d=length(p)*2.;if(d>1.)discard;float shade=.6+.4*max(0.,1.-length(p-vec2(-.12,.12))*2.);gl_FragColor=vec4(vColor*shade,smoothstep(1.,.55,d)*vAlpha);}"}),Xa=new Sm(Si,_f);Xa.frustumCulled=!1,Xa.renderOrder=3,l.add(Xa);function Mf(M,I,k){const F=gs++%He;Qt.set([M.x,c?(M.y??x)+.025:Math.max(-.005,(M.y??0)+.025),M.z],F*3),qe[F]=$e,Ae[F]=.7+I*.7,hn(k??"#c2e1d5").toArray(Mn,F*3);for(const V of["aCenter","aStart","aSize","aTint"])Te.attributes[V].needsUpdate=!0}function Ah(M,I,k,F){const N=Math.min(90,Math.round(18+I*21)),V=hn(k??(F?"#b2d7ce":"#d5bc80"));for(let Z=0;Z<N;Z++){const X=yf++%en,it=hi[X],dt=a()*Le,Tt=(.6+a()*2.7)*Math.sqrt(I);it.life=it.max=.5+a()*.8,it.vx=Math.cos(dt)*Tt,it.vz=Math.sin(dt)*Tt,it.vy=(1.5+a()*4)*Math.sqrt(I),it.water=F,ln.set([M.x+(a()-.5)*.3,(M.y??0)+.12,M.z+(a()-.5)*.3],X*3),V.clone().multiplyScalar(.85+a()*.3).toArray(pn,X*3),xn[X]=(.045+a()*.085)*(F?1:.8),Xi[X]=.9}Si.attributes.aColor.needsUpdate=!0,Si.attributes.aSize.needsUpdate=!0}function bf(M,I=1,k){I=es(I,.1,4),Mf({x:M.x,y:c?x+.01:.01,z:M.z},I,k),Ah({x:M.x,y:c?x+.03:.03,z:M.z},I,k,!0)}function Sf(M,I="#e9cb87",k=1){Ah(M,k,I,!1)}function Rh(M,I,k,F=1){const N=[],V=[],Z=[],X=[],it=Fi(F),dt=16,Tt=20;for(let It=0;It<=dt;It++)for(let Nt=0;Nt<=Tt;Nt++){const re=Nt/Tt*2-1,Re=It/dt,Ce=.5+Math.sqrt(Math.max(0,1-re*re))*k+.06*Math.sin(Re*23+re*5),me=re*M*(.97+.025*Math.sin(Re*19));N.push(me,Ce,(Re-.5)*I),V.push(Nt/Tt,It/dt),hn("#809549").multiplyScalar(.85+it()*.23).toArray(X,X.length)}for(let It=0;It<dt;It++)for(let Nt=0;Nt<Tt;Nt++){const re=It*(Tt+1)+Nt,Re=re+Tt+1;Z.push(re,Re,re+1,Re,Re+1,re+1)}const $t=new we;return $t.setAttribute("position",new Gt(N,3)),$t.setAttribute("uv",new Gt(V,2)),$t.setAttribute("color",new Gt(X,3)),$t.setIndex(Z),$t.computeVertexNormals(),$t}function qa(M,I,k){const F=new te,N=new We({color:"#a6bf76",map:O,vertexColors:!0,roughness:.78,side:Pe});k.push(N);const V=Rh(1.75,3.8,1.95,s+Math.round(M*7));k.push(V);const Z=new Zt(V,N);Z.castShadow=!0,Z.receiveShadow=!0,F.add(Z);for(let X=0;X<8;X++){const it=-1.85+X*.53,dt=[];for(let $t=0;$t<=12;$t++){const It=$t/12*Math.PI;dt.push([Math.cos(It)*1.75,.5+Math.sin(It)*1.96+.025,it+.025*Math.sin(It*4)])}const Tt=Ke(dt,.038,W.reed,18);k.push(Tt.geometry),F.add(Tt)}for(let X of[-1,1])for(let it=0;it<5;it++){const dt=-1.6+it*.8,Tt=Ke([[X*1.68,-.08,dt],[X*1.7,.45,dt],[X*1.38,1.5,dt]],.052,W.bark,5);k.push(Tt.geometry),F.add(Tt)}for(let X=0;X<7;X++){const it=.16+X*.12,dt=Ke([[-1.65,it,-1.8],[0,it+.025,-1.88],[1.65,it,-1.8]],.036,W.reed,8);k.push(dt.geometry),F.add(dt)}return si(F,k,new Set([Z])),F.scale.setScalar(M),F.userData.roof=Z,F}const kr={player:"#8ecf75",friendly:"#8ecf75",ally:"#8ecf75",enemy:"#cf7554",neutral:"#ceb785"};function Gs(M){if(typeof M=="string"&&M.startsWith("enemy")){const I=["#e8aa70","#d8786b","#b9ad81","#a9a0d4","#8dc2b8"],k=parseInt(M.replace(/\D/g,""),10)||0;return I[k%I.length]}return kr[M]||kr.neutral}const $a=new Map;function wo(M){if($a.has(M))return $a.get(M);const I=["player","ally","friendly"].includes(M),k=M==="neutral",F=(parseInt(String(M).replace(/\D/g,""),10)||0)%5,N=yh(256,(V,Z)=>{V.fillStyle="#eee9cb",V.fillRect(0,0,Z,Z);for(let it=0;it<256;it+=4)V.fillStyle=it%8?"#ded9bd":"#f3eed3",V.fillRect(it,0,1,Z),V.fillRect(0,it,Z,1);V.save(),V.translate(38,23),V.scale(2.8,2.8),V.fillStyle=I?"#194333":k?"#494633":"#472c29",V.strokeStyle="#fff2c9",V.lineWidth=2,V.beginPath(),V.moveTo(32,3),V.lineTo(59,14),V.lineTo(56,44),V.quadraticCurveTo(53,55,32,68),V.quadraticCurveTo(11,55,8,44),V.lineTo(5,14),V.closePath(),V.fill(),V.stroke(),V.lineWidth=3.2,V.lineCap="round",V.lineJoin="round";const X=it=>{V.beginPath(),it.forEach((dt,Tt)=>Tt?V.lineTo(...dt):V.moveTo(...dt)),V.stroke()};if(I)V.beginPath(),V.moveTo(43,20),V.bezierCurveTo(28,17,18,26,21,38),V.bezierCurveTo(24,48,35,47,40,37),V.bezierCurveTo(43,30,40,24,43,20),V.stroke(),X([[20,51],[37,27]]),X([[28,40],[23,32]]),X([[32,35],[39,34]]);else if(k)X([[24,27],[32,19],[40,27]]),X([[32,19],[32,49]]),X([[23,40],[32,49],[41,40]]);else if(F===0)X([[20,19],[27,31],[22,44]]),X([[44,19],[37,31],[42,44]]),X([[28,46],[36,46]]);else if(F===1)X([[22,18],[18,36],[32,49],[46,36],[42,18]]),X([[25,30],[32,36],[39,30]]);else if(F===2)for(const[it,dt]of[[21,20],[32,15],[43,20]])X([[it,dt],[it,49]]),X([[it-4,dt+6],[it+4,dt+6]]);else F===3?(V.beginPath(),V.moveTo(44,17),V.bezierCurveTo(15,9,11,48,32,52),V.bezierCurveTo(39,53,44,50,47,45),V.bezierCurveTo(29,43,26,26,44,17),V.stroke()):X([[18,24],[25,30],[32,17],[39,30],[46,24],[41,46],[23,46],[18,24]]);V.restore()});return N.wrapS=N.wrapT=is,$a.set(M,N),b.push(N),N}function wf(M,I,k=0){const F=new te;F.name="Woven reed courtyard and rooted foundations";const N=5.68;for(let V=0;V<43;V++){const Z=-5.58+V*.266,X=Math.sqrt(Math.max(0,N*N-Z*Z))*(.97+.02*Math.sin(V*1.7)),it=Ke([[-X,-.045,Z],[-X*.25,-.035,Z+.022],[X*.4,-.04,Z-.018],[X,-.045,Z+.015]],.077,W.bark,7);it.receiveShadow=!0,I.push(it.geometry),F.add(it)}for(let V=0;V<25;V++){const Z=-5.4+V*.45,X=Math.sqrt(Math.max(0,N*N-Z*Z))*.98,it=Ke([[Z,.018,-X],[Z+.025,.028,0],[Z-.018,.02,X]],.027,W.reed,10);I.push(it.geometry),F.add(it)}for(let V=0;V<16;V++){const Z=V/16*Le,X=Math.cos(Z)*5.1,it=Math.sin(Z)*5.1,dt=(z(M.position.x+(X*Math.cos(k)+it*Math.sin(k))*ie,M.position.z+(it*Math.cos(k)-X*Math.sin(k))*ie)-M.position.y)/ie,Tt=Ke([[X,Math.min(-.18,dt-.15),it],[X+.03,-.35,it-.02],[X,-.08,it]],.095,W.bark,5);I.push(Tt.geometry),F.add(Tt)}si(F,I),M.add(F),M.userData.foundation=F}function Ef(M,I){const k=new te,F=Ke([[0,0,0],[.04,1.6,0],[-.03,3.1,.02]],.047,W.bark,7);I.push(F.geometry),k.add(F);const N=new we,V=[0,2.93,0,.9,2.8,.09,1.13,2.12,.02,.6,2.25,-.03,0,2.18,0],Z=[0,1,1,1,1,0,.5,.1,0,0];N.setAttribute("position",new Gt(V,3)),N.setAttribute("uv",new Gt(Z,2)),N.setIndex([0,1,3,1,2,3,0,3,4]),N.computeVertexNormals();const X=new We({color:Gs(M),roughness:.8,side:Pe,map:wo(M)}),it=new Zt(N,X);return it.castShadow=!0,k.add(it),k.userData.flag=it,k.userData.emblemTeam=M,I.push(N,X),k}function Tf(M,I,k){const F=Fy,N=Oy,V=Ra,Z=.11,X=new te;X.name="Enclosed creek castle",M.add(X);const it=new te;it.name="Reinforced castle perimeter",M.add(it);const dt=Math.asin((N/2+.25)/F),Tt=44,$t=(Le-dt*2)/Tt,It=[],Nt=[],re=2*(F+.65)*Math.tan($t/2)+.08;for(let st=0;st<Tt;st++){const bt=dt+$t*(st+.5),ae=Math.sin(bt)*F,je=Math.cos(bt)*F;It.push({x:ae,z:je,y:Z+V/2,w:re,h:V,d:By,ry:bt});for(const Ge of[-.29,.29]){const pe=bt+$t*Ge;It.push({x:Math.sin(pe)*F,z:Math.cos(pe)*F,y:Z+V+.37,w:.76,h:.74,d:1.2,ry:pe})}Nt.push({x:Math.sin(bt)*(F+.64),z:Math.cos(bt)*(F+.64),y:Z+1.65,w:re*.7,h:3.1,d:.5,ry:bt}),Nt.push({x:Math.sin(bt)*(F+.4),z:Math.cos(bt)*(F+.4),y:Z+3.5,w:re*1.01,h:.28,d:.9,ry:bt})}const Re=[Math.PI/4,Math.PI*3/4,Math.PI*5/4,Math.PI*7/4],Ce=[];for(const st of Re){const bt=Math.sin(st)*(F+.15),ae=Math.cos(st)*(F+.15);Ce.push({x:bt,z:ae});for(let je=0;je<10;je++){const Ge=je/10*Le;It.push({x:bt+Math.sin(Ge)*1.42,z:ae+Math.cos(Ge)*1.42,y:Z+6.15,w:.6,h:.85,d:.66,ry:Ge})}}for(const st of[-1,1])It.push({x:st*(N/2+.62),z:F,y:Z+2.8,w:1.24,h:5.6,d:2}),It.push({x:st*(N/2+.62),z:F,y:Z+5.95,w:1.6,h:.7,d:2.35}),Nt.push({x:st*(N/2+.62),z:F+1.05,y:Z+2.4,w:1.32,h:4.8,d:.25});It.push({x:0,z:F,y:Z+4.85,w:N+1.2,h:.78,d:1.75});const me=(st,bt,ae,je)=>{const Ge=new Bi(1,1,1),pe=new En(Ge,je,ae.length);return k.push(Ge),pe.name=bt,pe.castShadow=!0,pe.receiveShadow=!0,ae.forEach((sn,Ff)=>{pt.position.set((sn.x||0)/ie,(sn.y||0)/ie,(sn.z||0)/ie),pt.rotation.set(sn.rx||0,sn.ry||0,sn.rz||0),pt.scale.set(sn.w/ie,sn.h/ie,sn.d/ie),pt.updateMatrix(),pe.setMatrixAt(Ff,pt.matrix)}),st.add(pe),pe},nn=me(X,"Continuous moss-stone walls and crenellations",It,W.mossRock);nn.userData.fullCount=It.length,nn.userData.firstCoursesCount=Tt*3,me(it,"Whole-ring stone buttresses and gate reinforcement",Nt,W.rock);const Je=new Us(1,1.12,1,12,1),cn=new En(Je,W.mossRock,4);k.push(Je),cn.name="Four castle defence towers",cn.castShadow=!0,cn.receiveShadow=!0,Ce.forEach((st,bt)=>{pt.position.set(st.x/ie,(Z+2.9)/ie,st.z/ie),pt.rotation.set(0,Re[bt],0),pt.scale.set(1.65/ie,5.8/ie,1.65/ie),pt.updateMatrix(),cn.setMatrixAt(bt,pt.matrix)}),X.add(cn);const vn=Qi(1,1,.28),bn=new En(vn,W.leaf,4);k.push(vn),bn.name="Folded leaf tower roofs",bn.castShadow=!0,Ce.forEach((st,bt)=>{pt.position.set(st.x/ie,(Z+6.68)/ie,st.z/ie),pt.rotation.set(0,Re[bt],0),pt.scale.set(2/ie,2.4/ie,2/ie),pt.updateMatrix(),bn.setMatrixAt(bt,pt.matrix)}),X.add(bn);const Qn=new te;Qn.name="Working south castle gate",Qn.position.set(0,Z/ie,F/ie),X.add(Qn);const Vs=[];for(const st of[-1,1]){const bt=new te;bt.position.x=st*N/(2*ie),bt.name=st<0?"Left hinged gate":"Right hinged gate",Qn.add(bt);const ae=[],je=[],Ge=N/2;for(let pe=0;pe<7;pe++)ae.push({x:-st*((pe+.5)*Ge/7),y:V/2,z:0,w:Ge/7+.025,h:V-.08,d:.36});for(const pe of[.65,1.9,3.2])je.push({x:-st*Ge/2,y:pe,z:.23,w:Ge-.1,h:.22,d:.2});me(bt,"Bound timber gate leaf",ae,W.bark),me(bt,"Gate cross braces",je,W.reed),Vs.push(bt)}const xs=new te;xs.name="Breached gate fallen slabs",Qn.add(xs),me(xs,"Broken gate timber",[{x:-1.45,y:.18,z:1.5,w:2.8,h:.3,d:3.5,ry:.18},{x:1.6,y:.23,z:.9,w:2.7,h:.35,d:3.2,ry:-.24}],W.bark);const Or=new Ui(1.7/ie,1.9/ie),Br=new We({map:wo(I.team),color:Gs(I.team),side:Pe,roughness:.85});k.push(Or,Br);const Ws=new Zt(Or,Br);return Ws.name="Castle gate clan crest",Ws.position.set(0,(Z+5.2)/ie,(F+1.02)/ie),X.add(Ws),M.userData.fortification=X,M.userData.palisade=it,M.userData.gate=Qn,M.userData.gateLeaves=Vs,M.userData.fallenGate=xs,M.userData.gateCrest=Ws,M.userData.fortWalls=nn,M.userData.fortTowers=cn,M.userData.fortTowerRoofs=bn,M.userData.fortificationGeometry={radius:F,gateWidth:N,wallHeight:V,gateDirection:{x:0,z:1},towerCount:4},X}function Af(M){const I=qa(1,kr.ally,M);I.name="Stone keep beneath woven leaf roof",I.userData.groundWalls=[];const k=new te;k.name="Enclosed central keep";const F=(N,V,Z,X,it,dt,Tt=W.mossRock)=>{const $t=new Bi(X,it,dt),It=new Zt($t,Tt);M.push($t),It.position.set(N,V,Z),It.castShadow=!0,It.receiveShadow=!0,k.add(It),V-it/2<.03&&I.userData.groundWalls.push({minX:N-X/2,maxX:N+X/2,minZ:Z-dt/2,maxZ:Z+dt/2,height:V+it/2})};F(-1.6,.68,0,.26,1.36,3.45),F(1.6,.68,0,.26,1.36,3.45),F(0,.68,-1.65,3.05,1.36,.25);for(const N of[-1,1])F(N*1.14,.68,1.64,.9,1.36,.26);F(0,1.22,1.64,1.45,.28,.27);for(const N of[-1.23,1.23])for(const V of[-1.34,1.34]){F(N,1.36,V,.58,2.72,.58);for(const Z of[-.2,.2])for(const X of[-.2,.2])F(N+Z,2.83,V+X,.19,.3,.19,W.rock)}return si(k,M),I.add(k),I}function Ch(M){const I=ws+na+3,k=N=>Math.hypot(N.x-M.x,N.z-M.z)<I,F=N=>[...R.values()].some(V=>Math.hypot(N.x-V.x,N.z-V.z)<ws-2);Vi.forEach((N,V)=>{k(N)&&(pt.position.set(N.x,z(N.x,N.z),N.z),pt.rotation.set(0,N.angle,0),pt.scale.set(.65+N.scale*.25,N.scale,.65+N.scale*.25),F(N)&&pt.scale.setScalar(0),pt.updateMatrix(),ci.setMatrixAt(V,pt.matrix))}),ci.finish(),Bs.forEach((N,V)=>{k(N)&&(pt.position.set(N.x+.12,z(N.x,N.z),N.z),pt.rotation.set(0,N.angle,0),pt.scale.setScalar(F(N)?0:.7+N.scale*.4),pt.updateMatrix(),Wi.setMatrixAt(V,pt.matrix))}),Wi.finish(),A.forEach((N,V)=>{k(N)&&(N.y=ms(N.x,N.z).height+.25,K[V].position.y=N.y-.2,K[V].updateMatrix())}),C.forEach((N,V)=>{k(N)&&(pt.position.set(N.x,A[N.spot].y-.25+N.groundOffset,N.z),pt.rotation.set(.3,N.rot,.2),pt.scale.setScalar(N.scale),pt.updateMatrix(),J.setMatrixAt(V,pt.matrix))}),J.instanceMatrix.needsUpdate=!0,J.computeBoundingBox(),J.computeBoundingSphere()}function Ph(M,I){for(const N of R.values())if(Math.hypot(N.x-M,N.z-I)<.01)return N.elevation;const k=ce.find(N=>Math.hypot(N.x-M,N.z-I)<.01);let F=k?Math.fround(k.elevation):Math.max(.35,Nr(M,I));if(!k){const N=ws+le,V=Math.max(0,Math.floor((M-N+Mt)/le)),Z=Math.min(216,Math.ceil((M+N+Mt)/le)),X=Math.max(0,Math.floor((I-N+Mt)/le)),it=Math.min(216,Math.ceil((I+N+Mt)/le));for(let dt=X;dt<=it;dt++)for(let Tt=V;Tt<=Z;Tt++){const $t=dt*De+Tt;Math.hypot(ne.getX($t)-M,ne.getZ($t)-I)<=N&&(F=Math.max(F,ne.getY($t)))}}return F}function Rf(M){const I=Ph(M.x,M.z),k={id:M.id,x:M.x,z:M.z,elevation:I};return R.set(M.id,k),w(k),Ch(k),k}function Eo(M,I={}){if((c||M.natural===!0)&&!I.preview){const st=s1(M,{terrainHeight:z,materials:W,rockGeos:ft,tube:Ke,leafGeometry:Qi,mergeStaticParts:si,teamColor:Gs});return l.add(st),E.add(st),g.push(st.userData.refuge),st}const k=!!I.preview,F=k?null:Rf(M),N=new te;N.name="Shelter "+(M.id??""),N.position.set(M.x,F?.elevation??0,M.z),N.scale.setScalar(ie),N.userData.id=M.id,N.userData.radius=Cs,N.userData.owned=[],N.userData.terrain=F;const V=N.userData.owned;wf(N,V,Number.isFinite(M.yaw)?M.yaw:0),k||(N.userData.support=Ot({id:"shelter-"+M.id,type:"shelter",x:M.x,z:M.z,y:N.position.y+.11,radius:Cs-.2}),N.userData.landmark=Ot({id:"castle-land-"+M.id,type:"land",x:M.x,z:M.z,y:N.position.y,radius:ws+na*.45})),Tf(N,M,V);const Z=Af(V);Z.position.set(-.55,.04,-.5),N.add(Z),N.userData.core=Z,N.userData.keepCollision={rects:Z.userData.groundWalls.map(st=>({minX:(st.minX+Z.position.x)*ie,maxX:(st.maxX+Z.position.x)*ie,minZ:(st.minZ+Z.position.z)*ie,maxZ:(st.maxZ+Z.position.z)*ie,height:(st.height+Z.position.y)*ie})),door:{x:Z.position.x*ie,z:(Z.position.z+1.64)*ie}};const X=Ef(M.team,V);X.position.set(1.8,0,1.1),N.add(X),N.userData.banner=X;const it=new te;it.name="Additional sleeping leaves";const dt=qa(.62,kr[M.team],V);dt.position.set(-3,.01,.2),dt.rotation.y=-.5,it.add(dt),N.add(it),N.userData.extra=it;const Tt=new te;Tt.name="Hatchery";const $t=qa(.52,kr[M.team],V);$t.position.set(3.05,0,-1.8),$t.rotation.y=.7,Tt.add($t);for(let st=0;st<5;st++){const bt=[];for(let je=0;je<=24;je++){const Ge=je/24*Le;bt.push([3.05+Math.cos(Ge)*.74,.06+st*.065,-1.7+Math.sin(Ge)*.63])}const ae=Ke(bt,.035,W.reed,25);V.push(ae.geometry),Tt.add(ae)}si(Tt,V),N.add(Tt),N.userData.nursery=Tt;const It=new te;It.name="Leaf training yard and woven sparring dummies",It.position.set(-2.9,.07,-3.2);for(let st=0;st<3;st++){const bt=-.82+st*.8,ae=st%2?-.2:.2,je=new Zt(Qi(.46,.65,.04),W.leaf);je.position.set(bt,.025,ae+.6),je.rotation.y=(st-1)*.35,V.push(je.geometry),It.add(je);for(const pe of[-.21,.21]){const sn=Ke([[bt+pe,-.02,ae-.25],[bt+pe*.3,.48,ae-.3],[bt,.96,ae-.25]],.035,W.bark,5);V.push(sn.geometry),It.add(sn)}const Ge=Ke([[bt-.4,.64,ae-.2],[bt,.72,ae-.28],[bt+.4,.64,ae-.2]],.041,W.reed,6);V.push(Ge.geometry),It.add(Ge);for(let pe=0;pe<3;pe++){const sn=new Zt(Qi(.23,.37,.15),W.leaf);sn.position.set(bt+(pe-1)*.06,.59,ae-.19),sn.rotation.set(Math.PI/2,(pe-1)*.25,(pe-1)*.3),V.push(sn.geometry),It.add(sn)}for(const pe of[-.12,.12]){const sn=Ke([[bt+pe,.89,ae-.22],[bt+pe*1.45,1.09,ae-.22],[bt+pe*.5,1.07,ae-.19],[bt+pe,.89,ae-.22]],.025,W.reed,10);V.push(sn.geometry),It.add(sn)}}for(const st of[-1.2,1.2]){const bt=Ke([[st,-.04,-.65],[st*.98,.75,-.68],[st,.98,-.65]],.04,W.bark,5);V.push(bt.geometry),It.add(bt)}for(let st=0;st<2;st++){const bt=Ke([[-1.2,.45+st*.28,-.65],[0,.38+st*.28,-.7],[1.2,.45+st*.28,-.65]],.025,W.reed,10);V.push(bt.geometry),It.add(bt)}si(It,V),N.add(It),N.userData.training=It,N.userData.trainingPoint=new L(M.x-2.9*ie,N.position.y+.12,M.z-2.5*ie);const Nt=new te;Nt.name="Leaf-wrapped food cache",Nt.position.set(-2.8,.04,2.2);const re=new En(Me,W.fruit,15);for(let st=0;st<15;st++)pt.position.set(st%4*.32-.5,Math.floor(st/8)*.25+.15,Math.floor(st/4)%2*.35),pt.scale.setScalar(.22+st%3*.025),pt.rotation.set(st*.7,st*.4,0),pt.updateMatrix(),re.setMatrixAt(st,pt.matrix),re.setColorAt(st,hn(st%3?"#b7b06c":"#6d673f"));Nt.add(re);for(let st=0;st<3;st++){const bt=Ke([[-.85,.05,-.3+st*.45],[0,.02,-.3+st*.45],[.85,.08,-.3+st*.45]],.075,W.bark,5);V.push(bt.geometry),Nt.add(bt)}const Re=new Zt(Qi(1,.8,.23),W.leaf);Re.position.set(0,.5,.1),Re.rotation.z=.17,V.push(Re.geometry),Nt.add(Re),si(Nt,V),N.add(Nt),N.userData.storage=Nt,N.userData.foodMesh=re,N.userData.storageCover=Re;const Ce=new te;Ce.name="Lookout perch",Ce.position.set(3.1,0,2.5);for(let st=0;st<3;st++){const bt=st/3*Le,ae=Ke([[Math.cos(bt)*.7,-.1,Math.sin(bt)*.7],[Math.cos(bt)*.44,1.4,Math.sin(bt)*.44],[Math.cos(bt)*.35,2.65,Math.sin(bt)*.35]],.085,W.bark,7);V.push(ae.geometry),Ce.add(ae)}for(let st=0;st<8;st++){const bt=-.6+st*.17,ae=Ke([[-.7,2.35,bt],[0,2.32,bt],[.7,2.36,bt]],.06,W.reed,4);V.push(ae.geometry),Ce.add(ae)}const me=new Zt(Qi(1.1,.9,.08),W.leaf);me.position.y=3.15,me.rotation.x=.17,V.push(me.geometry),Ce.add(me);for(let st=0;st<6;st++){const bt=Ke([[-.25,st*.34,.63],[.25,st*.34,.63]],.035,W.reed,2);V.push(bt.geometry),Ce.add(bt)}si(Ce,V),N.add(Ce),N.userData.watchtower=Ce;const nn=new En(ft[1],W.mossRock,25);for(let st=0;st<25;st++){const bt=st/25*Le;pt.position.set(Math.cos(bt)*2.15,-.12,Math.sin(bt)*2.35-.5),pt.rotation.set(0,bt,0),pt.scale.set(.25,.25,.25),pt.updateMatrix(),nn.setMatrixAt(st,pt.matrix)}N.add(nn);const Je=new te;Je.name="Collapsed shelter remains";const cn=new We({color:"#839061",map:O,roughness:.94,side:Pe});V.push(cn);for(let st=0;st<6;st++){const bt=Rh(.62+st%3*.16,1.35+st%2*.55,.14+st%3*.05,s+st*19),ae=new Zt(bt,cn);ae.position.set(-1.3+st%3*.85,-.46+st%2*.04,-1.5+Math.floor(st/3)*1.7),ae.rotation.set((st%2-.5)*.24,st*1.71,(st%3-1)*.13),ae.castShadow=!0,V.push(bt),Je.add(ae)}for(let st=0;st<22;st++){const bt=st*2.399,ae=.65+st%5*.27,je=Math.cos(bt)*(st<14?1.2:3.4),Ge=Math.sin(bt)*(st<14?1.6:2.8)-.3,pe=Ke([[je,.055,Ge],[je+Math.cos(bt+.7)*ae*.6,.11+st%3*.07,Ge+Math.sin(bt+.7)*ae*.6],[je+Math.cos(bt+.7)*ae,.04+st%4*.06,Ge+Math.sin(bt+.7)*ae]],st%2?.045:.065,st%2?W.reed:W.bark,4);pe.castShadow=!0,V.push(pe.geometry),Je.add(pe)}si(Je,V),N.add(Je),N.userData.ruin=Je;const vn=new En(Me,W.fruit,8);vn.name="Supplies exposed in the ruins";for(let st=0;st<8;st++)pt.position.set(-.5+st%4*.29,.12+Math.floor(st/4)*.08,1.35+Math.floor(st/4)*.31),pt.rotation.set(st*.43,st*1.31,.2),pt.scale.setScalar(.16+st%3*.025),pt.updateMatrix(),vn.setMatrixAt(st,pt.matrix),vn.setColorAt(st,hn(st%2?"#a99958":"#d9a253"));N.add(vn),N.userData.looseLoot=vn;const bn=new We({color:"#edc371",emissive:"#e5a64c",emissiveIntensity:.7,roughness:.7});V.push(bn);const Qn=new Zt(Me,bn);Qn.position.set(1.7,.55,1.1),Qn.scale.set(.15,.22,.15),N.add(Qn),N.userData.lamp=Qn;const Vs=new Vm("#ffd098",1.8,25,2);Vs.position.set(0,2.3,1.8),N.add(Vs),N.userData.light=Vs,N.updateMatrixWorld(!0),N.userData.buildingGroups={},N.userData.defaultPlacements={};for(const[st,bt]of Object.entries({store:"storage",nursery:"nursery",watchtower:"watchtower",training:"training"})){const ae=N.userData[bt],je=new jn().setFromObject(ae),Ge=N.worldToLocal(je.getCenter(new L)),pe=new te;pe.name=ae.name+" placement",pe.position.set(Ge.x,ae.position.y,Ge.z),N.add(pe),ae.position.sub(pe.position),pe.add(ae),N.userData[bt]=pe,N.userData.buildingGroups[st]=pe,N.userData.defaultPlacements[st]={x:Ge.x*ie,z:Ge.z*ie,yaw:0}}N.updateMatrixWorld(!0);const xs=new jn().setFromObject(Z),Or=N.worldToLocal(xs.getCenter(new L)),Br=xs.getSize(new L);N.userData.coreFootprint={x:Or.x*ie,z:Or.z*ie,width:Br.x,depth:Br.z},k||(l.add(N),E.add(N)),Ya(N,M);const Ws=new Set([N.userData.core.userData.roof,N.userData.storageCover,N.userData.banner.userData.flag]);return N.traverse(st=>{st.isMesh&&!Ws.has(st)&&(st.updateMatrix(),st.matrixAutoUpdate=!1)}),N}function Ya(M,I={}){if(!M)return;if(M.userData.natural)return tf(M,I,Gs);const k=M.userData.visualState||{},F={...k,...I},N=Math.max(1,F.tier??1),V=F.buildings||{},Z=es((F.hp??F.maxHp??100)/(F.maxHp??100),0,1),X=!!F.destroyed||Z<=0,it=F.team??k.team??"neutral",dt={};for(const[Ce,me]of Object.entries(F.buildingPlacements||{}))M.userData.buildingGroups[Ce]&&me&&Number.isFinite(me.x)&&Number.isFinite(me.z)&&Number.isFinite(me.yaw??0)&&(dt[Ce]={x:me.x,z:me.z,yaw:me.yaw??0});M.userData.visualState={team:it,tier:N,hp:F.hp,maxHp:F.maxHp,buildings:{...V},buildingPlacements:dt,yaw:Number.isFinite(F.yaw)?F.yaw:0,storage:F.storage,resources:F.resources,lootTaken:!!F.lootTaken,gateHp:F.gateHp,gateOpen:!!F.gateOpen,destroyed:X,underConstruction:!!F.underConstruction,constructionProgress:es(Number(F.constructionProgress)||0,0,1)},M.rotation.y=M.userData.visualState.yaw;for(const[Ce,me]of Object.entries(M.userData.buildingGroups)){const nn=dt[Ce]||M.userData.defaultPlacements[Ce];me.position.x=nn.x/ie,me.position.z=nn.z/ie,me.rotation.y=nn.yaw}const Tt=M.userData.buildingGroups.training;M.updateMatrixWorld(!0),M.userData.trainingPoint.copy(Tt.getWorldPosition(new L)),M.userData.trainingPoint.y=M.position.y+.12,M.userData.team=it,M.userData.tier=N,M.userData.health=Z,M.userData.destroyed=X,M.userData.banner.userData.flag.material.color.set(Gs(it)),M.userData.banner.userData.emblemTeam!==it&&(M.userData.banner.userData.flag.material.map=wo(it),M.userData.banner.userData.flag.material.needsUpdate=!0,M.userData.banner.userData.emblemTeam=it),M.userData.gateCrest.material.color.set(Gs(it)),M.userData.gateCrest.material.map=wo(it);const $t=!!(V.storage??V.store??!1);M.userData.core.visible=!X,M.userData.extra.visible=!X&&N>=2,M.userData.ruin.visible=X,M.userData.nursery.visible=!X&&!!(V.nursery||V.hatchery||V.spawn||V.breeding),M.userData.training.visible=!X&&!!(V.training||V.trainingGround||V.drill),M.userData.watchtower.visible=!X&&!!(V.watchtower||V.tower||V.guards);const It=!X&&!!(V.palisade||V.walls||V.wall||V.defense);M.userData.fortification.visible=!X,M.userData.palisade.visible=It;const Nt=Number.isFinite(F.gateHp)&&F.gateHp<=0;M.userData.gate.userData.breached=Nt,M.userData.gate.userData.open=!!F.gateOpen,M.userData.fallenGate.visible=Nt;for(let Ce=0;Ce<2;Ce++){const me=M.userData.gateLeaves[Ce];me.visible=!Nt,me.rotation.y=F.gateOpen?(Ce===0?-1:1)*Math.PI*.52:0}M.userData.core.rotation.z=X?0:(1-Z)*.09,M.userData.core.userData.roof.scale.y=X?1:.78+.22*Z;let re=typeof F.storage=="number"?F.storage:F.storage?.food??F.resources??0;Number.isFinite(re)||(re=0),re=Math.max(0,re);const Re=re>0&&!F.lootTaken;M.userData.storage.visible=$t&&(!X||Re),M.userData.storage.rotation.z=X?-.08:0,M.userData.foodMesh.count=X&&!Re?0:Math.min(15,Math.ceil(re/8)),M.userData.storageCover.position.set(X?-.65:0,X?.1:.5,X?.52:.1),M.userData.storageCover.rotation.set(X?.28:0,0,X?-.32:.17),M.userData.looseLoot.visible=X&&Re&&!$t,M.userData.looseLoot.count=Math.min(8,Math.ceil(re/5)),M.userData.banner.position.y=X?.035:0,M.userData.banner.rotation.set(X?.08:0,X?.35:0,X?1.49:Z<.25?.22:0),M.userData.lamp.visible=!X,X&&(M.userData.light.visible=!1),zh(M),M.userData.collisionRevision=(M.userData.collisionRevision||0)+1}function zh(M){const I=M.userData.visualState||{},k=ed({...I,mesh:M}),{stage:F,unfinished:N,wallHeight:V}=k,Z=!!I.destroyed,X=M.userData.fortWalls,it=V/Ra;if(X.visible=!Z&&F>=1,X.count=F===1?X.userData.firstCoursesCount:X.userData.fullCount,X.scale.y=it||1,X.position.y=.11*(1-(it||1))/ie,X.updateMatrix(),M.userData.fortification.visible=!Z&&F>=1,M.userData.fortTowers.visible=!Z&&F>=2,M.userData.fortTowerRoofs.visible=!Z&&F>=3,M.userData.core.visible=!Z&&F>=3,M.userData.gate.visible=!Z&&!N,M.userData.gateCrest.visible=!Z&&!N,M.userData.banner.visible=!N,N)for(const dt of["extra","nursery","training","watchtower","storage","palisade","lamp","light","looseLoot"])M.userData[dt].visible=!1;M.userData.constructionStage=F,M.userData.constructionWallHeight=V}function Cf(M,I,k){if(M?.type!=="shelter")return!1;const F=k?.mesh||[...E].find(X=>X.userData.id===(M.siteId||M.campId));if(!F?.userData?.fortWalls)return!1;const N=es(Number(I)||0,0,1);k&&(k.constructionProgress=N);const V=F.userData.visualState||{};return V.constructionProgress=N,V.underConstruction=k?.underConstruction??V.underConstruction??!0,F.userData.visualState=V,ed({...V,mesh:F}).stage!==F.userData.constructionStage&&(zh(F),F.userData.collisionRevision=(F.userData.collisionRevision||0)+1),!0}function Dh(M){if(!M)return;if(G?.userData.camp===M&&Fr(),l.remove(M),E.delete(M),M.userData.refuge){M.userData.refuge.active=!1;const k=g.indexOf(M.userData.refuge);k>=0&&g.splice(k,1)}M===_&&(_=null);for(const k of[M.userData.support,M.userData.landmark])if(k){const F=T.indexOf(k);F>=0&&T.splice(F,1);for(const N of U.values()){const V=N.indexOf(k);V>=0&&N.splice(V,1)}}const I=M.userData.terrain;I&&(R.delete(I.id),w(I),Ch(I)),M.traverse(k=>{k.isInstancedMesh&&k.dispose()});for(const k of M.userData.owned||[])k.dispose?.()}function Pf(M){if(c||!["shelter","store","nursery","watchtower","training"].includes(M))return null;const I=Eo({id:"construction-preview",x:0,z:0,team:"ally",tier:1,hp:350,maxHp:350,buildings:{},storage:{food:80}},{preview:!0});if(I.name="Construction preview: "+M,I.userData.previewType=M,I.userData.previewMaterials=[],M!=="shelter"){const F=I.userData.buildingGroups[M];for(const N of I.children)N.visible=N===F;F.visible=!0,F.position.x=F.position.z=0,F.rotation.y=0}const k=new Map;return I.traverse(F=>{if(F.isLight){F.visible=!1;return}if(!F.isMesh)return;F.castShadow=!1,F.receiveShadow=!1,F.renderOrder=8;const N=V=>{if(k.has(V))return k.get(V);const Z=V.clone();return Z.transparent=!0,Z.opacity=.46,Z.depthWrite=!1,Z.polygonOffset=!0,Z.polygonOffsetFactor=-1,Z.polygonOffsetUnits=-1,k.set(V,Z),I.userData.previewMaterials.push(Z),I.userData.owned.push(Z),Z};F.material=Array.isArray(F.material)?F.material.map(N):N(F.material)}),S.add(I),l.add(I),Ih(I,{x:0,y:0,z:0,yaw:0,valid:!1}),I.visible=!1,I}function Ih(M,{x:I,y:k,z:F,yaw:N=0,valid:V=!1}={}){if(M?.userData.previewType&&(Number.isFinite(I)&&(M.position.x=I),Number.isFinite(k)&&(M.position.y=k),Number.isFinite(F)&&(M.position.z=F),M.rotation.y=Number.isFinite(N)?N:0,M.visible=!0,M.userData.previewValid!==!!V)){M.userData.previewValid=!!V;for(const Z of M.userData.previewMaterials)Z.color?.set(V?"#69ed89":"#ef665b"),Z.emissive?.set(V?"#266c37":"#782d27"),"emissiveIntensity"in Z&&(Z.emissiveIntensity=.4)}}function Lh(M){!M||!S.has(M)||(S.delete(M),M.removeFromParent(),Dh(M))}function Fr(){if(!G)return;G.removeFromParent();const M=new Set,I=new Set;G.traverse(k=>{k.geometry&&M.add(k.geometry),k.material&&I.add(k.material)});for(const k of M)k.dispose();for(const k of I)k.dispose();G=null}function zf(M){const I=M?.mesh||M;if(!I?.isObject3D)return Fr(),null;if(G?.userData.camp===I)return G;Fr(),G=new te,G.name="Construction courtyard guide",G.userData.camp=I;const k=(Cs-.2)/ie,F=.075,N=(it,dt,Tt,$t=!1)=>{const It=new we().setFromPoints(it),Nt=new hh({color:dt,transparent:!0,opacity:Tt,depthWrite:!1}),re=$t?new Mm(It,Nt):new _m(It,Nt);return re.renderOrder=6,G.add(re),re},V=[];for(let it=0;it<96;it++){const dt=it/96*Le;V.push(new L(Math.cos(dt)*k,F,Math.sin(dt)*k))}N(V,"#9fe5af",.78,!0);const Z=[];for(let it=-7;it<=7;it++){const dt=it*.7;if(Math.abs(dt)>=k)continue;const Tt=Math.sqrt(k*k-dt*dt);Z.push(new L(dt,F,-Tt),new L(dt,F,Tt),new L(-Tt,F,dt),new L(Tt,F,dt))}N(Z,"#b7ddbc",.22);const X=(it,dt)=>{const Tt=it.x/ie,$t=it.z/ie,It=it.width/(2*ie)+.025,Nt=it.depth/(2*ie)+.025,re=Math.cos(it.yaw||0),Re=Math.sin(it.yaw||0),Ce=F+.012,me=(Je,cn)=>new L(Tt+Je*re+cn*Re,Ce,$t+cn*re-Je*Re);N([me(-It,-Nt),me(It,-Nt),me(It,Nt),me(-It,Nt)],"#ec8a72",.8,!0).name=dt+" outline";const nn=[];for(let Je=-It-Nt;Je<=It+Nt;Je+=.42){const cn=[];for(const vn of[-It,It]){const bn=Je-vn;bn>=-Nt&&bn<=Nt&&cn.push(me(vn,bn))}for(const vn of[-Nt,Nt]){const bn=Je-vn;bn>-It&&bn<It&&cn.push(me(bn,vn))}cn.length===2&&nn.push(...cn)}N(nn,"#d9806c",.35).name=dt+" hatch"};return X(I.userData.coreFootprint||{x:-1.1825*mr,z:-1.0664*mr,width:7.68*mr,depth:8.25*mr},"Main hut exclusion"),X(ky,"Sleeping hut reservation"),I.add(G),G}let To=0,Uh=Ji;const Df=hn(o.water),If=hn(o.nightWater),Lf=hn("#fff0cb"),Uf=hn("#7aa5cb");function Nf(M,I,k=1,F){if($e=I,To++,k=es(k,0,1),So.value=I,c){const Z=1-Math.exp(-Math.max(0,Math.min(.5,Number(M)||0))*3);be(x+(p-x)*Z);const X=lt.material.uniforms.alpha,it=Ky(F?.y,x);if(X.value+=(it-X.value)*(1-Math.exp(-Math.max(0,Math.min(.5,Number(M)||0))*8)),Math.abs(Uh-x)>.008){for(let dt=0;dt<wt.length;dt++){const Tt=wt[dt];pt.position.set(Tt.x,Tt.y,Tt.z),pt.rotation.set(0,Tt.angle,0),pt.scale.set(Tt.visualRadius,1,Tt.visualRadius),pt.updateMatrix(),ve.setMatrixAt(dt,pt.matrix)}ve.flush(),Uh=x}Kt.update(x,I)}if(lt.material.uniforms.time.value=I*.45,lt.material.uniforms.waterColor.value.copy(If).lerp(Df,k),lt.material.uniforms.sunColor.value.copy(Uf).lerp(Lf,k),lt.material.uniforms.sunDirection.value.set(.35+.25*Math.sin(I*.008),.45+k*.4,-.45).normalize(),To%3===0){const Z=at.attributes.position;for(let X=0;X<Z.count;X++){const it=ct[X*3],dt=ct[X*3+1];Z.setZ(X,Math.sin(it*.33+dt*.21+I*.91)*.025+Math.sin(it*.14-dt*.38-I*.72)*.018)}Z.needsUpdate=!0}bi.uniforms.uTime.value=I;let N=!1;for(let Z=0;Z<en;Z++){const X=hi[Z];X.life<=0||(X.life-=M,X.vy-=9.2*M,ln[Z*3]+=X.vx*M,ln[Z*3+1]+=X.vy*M,ln[Z*3+2]+=X.vz*M,Xi[Z]=Math.max(0,X.life/X.max)*.88,(ln[Z*3+1]<(c?x-.03:-.03)||X.life<=0)&&(X.life=0,Xi[Z]=0),N=!0)}if(N&&(Si.attributes.position.needsUpdate=!0,Si.attributes.aAlpha.needsUpdate=!0),To%2===0){let Z=0;for(let X=0;X<A.length;X++){const it=A[X];if(F&&(it.x-F.x)**2+(it.z-F.z)**2>90**2)continue;const dt=(it.rich?65:30)*es(it.flies/it.maxFlies,0,1)*(c?Math.min(1,it.ecology?.activity??1):1);for(const Tt of Dt[X]){if(Tt.rank>=dt)continue;const $t=I*Tt.speed+Tt.phase;pt.position.set(it.x+Math.sin($t)*Tt.r+Math.sin($t*2.9)*.13,it.y+Tt.height+Math.sin($t*1.7+Tt.phase2)*.26,it.z+Math.cos($t*.83+Tt.phase2)*Tt.r),pt.scale.setScalar(.55+.3*Math.sin(Tt.phase2)**2),pt.rotation.set(Math.sin($t*3)*.25,-$t,Math.sin($t*12)*.25),pt.updateMatrix(),zt.setMatrixAt(Z++,pt.matrix)}}zt.count=Z,j.flyMatricesUpdated=Z,Z&&(zt.instanceMatrix.clearUpdateRanges(),zt.instanceMatrix.addUpdateRange(0,Z*16),zt.instanceMatrix.needsUpdate=!0)}To%5===0&&F&&(wt.forEach((Z,X)=>{Math.hypot(F.x-Z.x,F.z-Z.z)>48||(pt.position.set(Z.x,Z.y+Math.sin(I*.9+Z.phase)*.018,Z.z),pt.rotation.set(Math.sin(I*.61+Z.phase)*.015,Z.angle,Math.cos(I*.8+Z.phase)*.015),pt.scale.set(Z.visualRadius,1,Z.visualRadius),pt.updateMatrix(),ve.setMatrixAt(X,pt.matrix))}),ve.flush());const V=[...E].filter(Z=>!Z.userData.natural&&!Z.userData.destroyed&&!Z.userData.visualState?.underConstruction).sort((Z,X)=>F?Z.position.distanceToSquared(F)-X.position.distanceToSquared(F):0).slice(0,3);for(const Z of E)Z.userData.natural||(Z.userData.light.visible=V.includes(Z),Z.userData.light.intensity=.25+(1-k)*3,Z.userData.lamp.material.emissiveIntensity=.3+(1-k)*1.3,Z.userData.banner.userData.flag.rotation.y=Math.sin(I*1.4+Z.position.x)*.06)}function kf(){Fr();for(const k of[...S])Lh(k);i.remove(l);const M=new Set,I=new Set;l.traverse(k=>{k.isInstancedMesh&&k.dispose(),k.geometry&&M.add(k.geometry),k.material&&(Array.isArray(k.material)?k.material.forEach(F=>I.add(F)):I.add(k.material))});for(const k of Kt?.resources||[])k.isBufferGeometry&&M.add(k),k.isMaterial&&I.add(k);for(const k of M)k.dispose();for(const k of I)k.dispose();for(const k of b)k.dispose();lt.material.uniforms.mirrorSampler?.value?.dispose?.(),E.clear();for(const k of g)k.active=!1;g.length=0}for(const M of h?.refuges||[])Eo({...M,natural:!0,team:"neutral",nestLevel:0});return l.traverse(M=>{M.updateMatrix(),M.matrixAutoUpdate=!1}),l.updateMatrixWorld(!0),{group:l,platforms:T,hotspots:A,campSites:ce,mapRegions:_t,routes:Be,predatorAnchors:Xt,bossAnchors:kt,renderStats:j,seed:s,regionIndex:n,palette:o,toRegionPoint:r.toWorld,radius:Iy,boundary:Ly,revision:Dy,sampleHeight:Nr,getTerrainHeight:z,getSurface:ms,shelterLandHeight:Ph,update:Nf,splash:bf,impact:Sf,createShelter:Eo,updateShelter:Ya,setConstructionProgress:Cf,removeShelter:Dh,createBuildingPreview:Pf,setBuildingPreview:Ih,removeBuildingPreview:Lh,showBuildArea:zf,hideBuildArea:Fr,dispose:kf,water:lt,shelterRadius:Cs,shelterScale:ie,natural:c,creekLandmarks:u,creekNest:d,creekCover:f,creekGrips:m,creekRefuges:g,creekSpawn:c?{x:0,z:0}:null,creekTerritories:c?ce.filter(M=>M.team==="enemy"):[],setCreekState:Ne,currentAt:oe,isCreekCover:Jt,get waterLevel(){return c?x:Ji}}}const di=Math.PI*2,Ye=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),Ze=(i,t,e)=>i+(t-i)*e,Zn=(i,t,e)=>{const n=Ye((e-i)/(t-i));return n*n*(3-2*n)},jr=(i,t=0,e=0)=>{const n=Math.sin(i*127.1+t*311.7+e*74.7)*43758.5453;return n-Math.floor(n)},Oe=(i=0,t=0,e=0)=>new L(i,t,e),Ul=new Map,Nl=new Map;let ts,kl;const Wc=Oe(0,1,0);Oe();function Fl(i,t){if(typeof i=="number")return i;const e=Ye(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n,r=s*s*(3-2*s);return Ze(i[n],i[n+1],r)}function Ps(i,t){if(i.length===1)return[[i[0],1]];const e=Ye(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n;return[[i[n],1-s],[i[n+1],s]]}function _e(i,t=0){return{color:i,mask:t}}class Gn{constructor(t=1){this.detail=t,this.p=[],this.uv=[],this.c=[],this.mask=[],this.si=[],this.sw=[],this.idx=[]}vertex(t,e=[0,0],n=[[0,1]],s={color:[1,1,1],mask:0}){const r=this.p.length/3;this.p.push(t.x,t.y,t.z),this.uv.push(...e),this.c.push(...s.color),this.mask.push(s.mask||0);let o=n.reduce((a,l)=>a+l[1],0)||1;for(let a=0;a<4;a++)this.si.push(n[a]?.[0]||0),this.sw.push((n[a]?.[1]||0)/o);return r}tri(t,e,n){this.idx.push(t,e,n)}quad(t,e,n,s,r=!1){r?(this.tri(t,n,e),this.tri(e,n,s)):(this.tri(t,e,n),this.tri(e,s,n))}tube(t,e,n,s={}){const{bones:r=[0],paint:o=()=>_e([.7,.7,.7],1),distort:a}=s,l=Math.max(2,Math.round((s.segments??28)*this.detail)),c=Math.max(3,Math.round((s.radial??16)*this.detail)),h=new xo(t.map(y=>y.isVector3?y:Oe(...y)),!1,"catmullrom",.5),u=this.p.length/3;for(let y=0;y<=l;y++){const _=y/l,T=h.getPoint(_),A=h.getTangent(_).normalize(),E=new L().crossVectors(Math.abs(A.y)>.94?Oe(0,0,1):Wc,A).normalize(),R=new L().crossVectors(A,E).normalize();for(let S=0;S<=c;S++){const b=S/c,U=b*di,P=Math.cos(U)*Fl(e,_),G=Math.sin(U)*Fl(n,_),j=T.clone().addScaledVector(E,P).addScaledVector(R,G);a&&a(j,_,U,T);const H=typeof r=="function"?r(_,j):Ps(r,_);this.vertex(j,[b,_],H,o(j,_,U))}}for(let y=0;y<l;y++)for(let _=0;_<c;_++){const T=u+y*(c+1)+_;this.quad(T,T+1,T+c+1,T+c+2)}const d=h.getPoint(0),f=h.getPoint(1),m=typeof r=="function"?r(0,d):Ps(r,0),g=typeof r=="function"?r(1,f):Ps(r,1),x=this.vertex(d,[.5,0],m,o(d,0,0)),p=this.vertex(f,[.5,1],g,o(f,1,0)),v=u+l*(c+1);for(let y=0;y<c;y++)this.tri(x,u+y+1,u+y),this.tri(p,v+y,v+y+1);return this}ellipsoid(t,e,{bone:n=0,rings:s=14,radial:r=24,paint:o=()=>_e([1,1,1]),rotationY:a=0,sculpt:l}={}){s=Math.max(3,Math.round(s*this.detail)),r=Math.max(4,Math.round(r*this.detail));const c=this.p.length/3,h=Oe(...t),u=Math.cos(a),d=Math.sin(a);for(let f=0;f<=s;f++){const m=f/s,g=Math.PI*m;for(let x=0;x<=r;x++){const p=x/r,v=di*p;let y=Math.sin(g)*Math.cos(v)*e[0],_=Math.cos(g)*e[1],T=Math.sin(g)*Math.sin(v)*e[2];const A=Oe(y,_,T);l&&l(A,p,m);const E=Oe(A.x*u+A.z*d,A.y,-A.x*d+A.z*u).add(h);this.vertex(E,[p,m],[[n,1]],o(A,p,m))}}for(let f=0;f<s;f++)for(let m=0;m<r;m++){const g=c+f*(r+1)+m;this.quad(g,g+1,g+r+1,g+r+2)}return this}leaf(t,e,{bone:n=0,bones:s,segments:r=14,across:o=6,color:a=[.35,.45,.22],ridge:l=.025,mask:c=0,vein:h=!0}={}){r=Math.max(2,Math.round(r*this.detail)),o=Math.max(2,Math.round(o*this.detail));const u=new xo(t.map(f=>f.isVector3?f:Oe(...f)),!1,"catmullrom",.5),d=this.p.length/3;for(let f=0;f<=r;f++){const m=f/r,g=u.getPoint(m),x=u.getTangent(m).normalize(),p=new L().crossVectors(Math.abs(x.y)>.95?Oe(0,0,1):Wc,x).normalize();for(let v=0;v<=o;v++){const y=v/o*2-1,_=g.clone().addScaledVector(p,y*Fl(e,m));_.y+=l*(1-Math.abs(y))*Math.sin(m*Math.PI);const T=(h?.88+.12*Math.cos(m*45+Math.abs(y)*9):1)+.12*(1-Math.abs(y));this.vertex(_,[(y+1)/2,m],s?Ps(s,m):[[n,1]],_e(a.map(A=>A*T),c))}}for(let f=0;f<r;f++)for(let m=0;m<o;m++){const g=d+f*(o+1)+m;this.quad(g,g+1,g+o+1,g+o+2,!0)}return this}geometry(){const t=new we;return t.setAttribute("position",new Gt(this.p,3)),t.setAttribute("uv",new Gt(this.uv,2)),t.setAttribute("color",new Gt(this.c,3)),t.setAttribute("skinTintMask",new Gt(this.mask,1)),t.setAttribute("skinIndex",new oh(this.si,4)),t.setAttribute("skinWeight",new Gt(this.sw,4)),t.setIndex(this.idx),t.computeVertexNormals(),t.computeBoundingSphere(),t}}function Fa(){const i=[],t={};return{defs:i,ids:t,bone(e,n,s=null){const r=i.length;return t[e]=r,i.push({name:e,p:n,parent:typeof s=="string"?t[s]:s}),r}}}function or(i,t=0,e=0){const n=1-Zn(.26,.47,i.y),s=Math.sin(i.x*31+Math.sin(i.z*13))*Math.sin(i.z*25+i.y*23),r=Zn(.42,.77,s)*.5,o=.75-r+.06*Math.sin(i.x*75+i.z*64),a=(1-Zn(.026,.065,Math.abs(i.x)))*Zn(.52,.67,i.y);return a>.3?_e([.78,.61,.18].map(l=>Ze(o,l,a)),1-a):_e([Ze(o,.76,n),Ze(o,.72,n),Ze(o,.49,n)],1-n*.96)}function ui(i,t=0,e=0){const n=(1-Zn(-.55,.1,Math.sin(e)))*.65,r=.79-.36*Zn(.38,.78,Math.sin(i.x*35+i.z*17)*Math.sin(i.y*39-i.z*23));return _e([Ze(r,.7,n),Ze(r,.66,n),Ze(r,.43,n)],1-n*.92)}function sd(i=1){const t=Fa(),e=new Gn(i),n=new Gn(i),s=new Gn(i),r=new Gn(i),o=new Gn(i),a=new Gn(i),l=t.bone("pelvis",[0,.36,-.35]),c=t.bone("spine",[0,.43,-.07],l),h=t.bone("head",[0,.47,.29],c),u=t.bone("jaw",[0,.39,.37],h),d=t.bone("throat",[0,.29,.36],u),f=t.bone("eyeL",[-.292,.685,.53],h),m=t.bone("eyeR",[.292,.685,.53],h),g=t.bone("mouth",[0,.405,.755],u);e.tube([[0,.35,-.72],[0,.42,-.48],[0,.43,-.08],[0,.47,.3],[0,.46,.58],[0,.43,.75]],[.012,.32,.435,.43,.34,.018],[.012,.245,.27,.235,.145,.025],{segments:42,radial:36,bones:p=>Ps([l,l,c,h,h],p),paint:or,distort(p,v,y){const _=Math.max(0,Math.sin(y));p.y+=_*.008*Math.sin(p.x*70+p.z*50);const T=Math.exp(-Math.pow((Math.abs(p.x)-.22)/.035,2));p.y+=T*_*.023*Math.sin(v*Math.PI)}});for(const p of[-1,1]){const v=p<0?f:m,y=[p*.292,.685,.53];e.ellipsoid([p*.292,.605,.405],[.15,.145,.165],{bone:h,rings:14,radial:24,paint:P=>or(P.clone().add(Oe(p*.292,.605,.405)))}),n.ellipsoid(y,[.106,.103,.113],{bone:v,radial:40,rings:22,rotationY:p*.32,paint(P,G,j){const H=P.z/.113,q=Math.pow(P.x/.084,2)+Math.pow(P.y/.029,2);if(H<.12)return _e([.065,.14,.018]);if(H<.34)return _e([.04,.065,.012]);if(H>.52&&q<1)return _e([.008,.012,.006]);const B=.12*Math.sin(Math.atan2(P.y,P.x)*51+Math.hypot(P.x,P.y)*120);return _e([.74+B,.52+B*.6,.08+B*.12])}});const _=t.bone(`hip${p}`,[p*.33,.32,-.33],l),T=t.bone(`knee${p}`,[p*.64,.24,.025],_),A=t.bone(`ankle${p}`,[p*.46,.09,-.61],T),E=t.bone(`foot${p}`,[p*.64,.045,-.49],A);e.ellipsoid([p*.64,.24,.025],[.143,.128,.148],{bone:T,rings:12,radial:18,paint:(P,G,j)=>ui(P.clone().add(Oe(p*.64,.24,.025)),G,Math.PI*(.5-j)),sculpt(P){P.x*=1+.06*Math.sin(P.z*30)}}),e.ellipsoid([p*.46,.09,-.61],[.069,.052,.071],{bone:A,rings:8,radial:12,paint:(P,G,j)=>ui(P.clone().add(Oe(p*.46,.09,-.61)),G,Math.PI*(.5-j))}),e.tube([[p*.3,.33,-.35],[p*.5,.3,-.21],[p*.64,.24,.025]],[.13,.223,.14],[.13,.173,.12],{segments:20,radial:22,bones:[_,_,T],paint:ui}),e.tube([[p*.64,.24,.025],[p*.57,.15,-.27],[p*.46,.09,-.61]],[.12,.105,.065],[.11,.09,.05],{segments:20,radial:18,bones:[T,T,A],paint:ui}),e.tube([[p*.46,.09,-.61],[p*.57,.06,-.55],[p*.72,.035,-.35]],[.06,.07,.047],[.047,.04,.025],{segments:12,radial:14,bones:[A,E,E],paint:ui});const R=[];for(let P=0;P<4;P++){const G=p*(.7+(P-1.5)*.075),j=-.34+.36*(1-Math.abs(P-1.5)*.16),H=[p*(.67+(P-1.5)*.028),.036,-.37],q=[Ze(H[0],G,.53),.037,-.18];e.tube([H,q,[G,.035,j]],[.032,.024,.007],[.02,.014,.006],{segments:10,radial:8,bones:[E],paint:ui}),R.push([G,.034,j*.66-.12])}for(let P=0;P<3;P++){const G=Oe(p*.68,.035,-.36),j=Oe(...R[P]),H=Oe(...R[P+1]),q=j.clone().lerp(H,.5).lerp(G,.2),B=e.vertex(G,[0,0],[[E,1]],or(G)),O=e.vertex(j,[1,0],[[E,1]],or(j)),Q=e.vertex(q,[.5,1],[[E,1]],or(q)),W=e.vertex(H,[0,1],[[E,1]],or(H));e.tri(B,O,Q),e.tri(B,Q,W),e.tri(Q,O,W)}const S=t.bone(`shoulder${p}`,[p*.3,.43,.31],c),b=t.bone(`elbow${p}`,[p*.48,.235,.4],S),U=t.bone(`wrist${p}`,[p*.46,.058,.62],b);e.ellipsoid([p*.48,.235,.4],[.064,.066,.064],{bone:b,rings:8,radial:12,paint:(P,G,j)=>ui(P.clone().add(Oe(p*.48,.235,.4)),G,Math.PI*(.5-j))}),e.tube([[p*.3,.43,.31],[p*.43,.33,.335],[p*.48,.235,.4]],[.092,.085,.061],[.09,.077,.059],{segments:14,radial:16,bones:[S,S,b],paint:ui}),e.tube([[p*.48,.235,.4],[p*.48,.14,.48],[p*.46,.058,.62]],[.062,.07,.039],[.058,.057,.03],{segments:12,radial:14,bones:[b,b,U],paint:ui});for(let P=0;P<4;P++){const G=p*(.44+(P-1.5)*.075),j=.81+.04*(1.5-Math.abs(P-1.5));e.tube([[p*.46,.055,.61],[Ze(p*.46,G,.6),.031,.74],[G,.025,j]],[.025,.017,.009],[.021,.014,.006],{segments:9,radial:8,bones:[U],paint:ui}),e.ellipsoid([G,.025,j],[.017,.01,.021],{bone:U,rings:6,radial:10,paint:()=>_e([.71,.65,.4],.4)})}for(let P=0;P<3;P++){const G=.32+P*.016;e.tube(Array.from({length:17},(j,H)=>[p*.415+Math.cos(H/16*di)*.085,G+Math.sin(H/16*di)*.072,.355+Math.sin(H/16*di)*.02]),.009,.009,{segments:20,radial:6,bones:[S],paint:()=>_e([.38,.55,.12],.25)})}s.leaf([[p*.12,.695,-.08],[p*.31,.69,-.19],[p*.48,.52,-.38]],[.012,.14,.03],{bone:c,color:[.26,.4,.12],ridge:.025,segments:15}),s.leaf([[p*.04,.715,.05],[p*.2,.73,-.03],[p*.36,.59,-.2]],[.008,.13,.015],{bone:c,color:[.34,.48,.18],ridge:.035,segments:15}),r.leaf([[p*.17,.76,.4],[p*.21,.89,.32],[p*.24,.91,.18]],[.025,.055,.002],{bone:h,color:[.69,.53,.19],ridge:.015,segments:12});for(const[P,G,j,H,q]of[[p*.16,.745,-.005,.18,.21],[p*.29,.67,-.25,.17,.19]])o.ellipsoid([P,G,j],[H,.055,q],{bone:c,rings:8,radial:18,paint:(B,O)=>_e([.84+.08*Math.cos(O*di*9),.79,.59]),sculpt(B){const O=1+.035*Math.cos(Math.atan2(B.x,B.z)*9);B.x*=O,B.z*=O}});for(let P=0;P<3;P++){const G=.19+P*.028,j=.455-P*.017;a.tube(Array.from({length:13},(H,q)=>[p*.478+Math.cos(q/12*di)*.081,G+Math.sin(q/12*di)*.027,j+Math.sin(q/12*di)*.079]),.016,.014,{segments:14,radial:6,bones:[b],paint:()=>_e([.72,.47,.16])})}}const x=Array.from({length:13},(p,v)=>{const y=(v/12-.5)*.74;return[y,.414-.025*Math.abs(y)/.37,.748-.2*Math.pow(y/.37,2)]});return e.tube(x,.009,.009,{segments:34,radial:8,bones:[h],paint:()=>_e([.045,.065,.016])}),e.tube(x.map(p=>[p[0],p[1]-.019,p[2]+.001]),.009,.014,{segments:34,radial:8,bones:[u],paint:()=>_e([.65,.61,.35])}),e.ellipsoid([0,.284,.385],[.25,.125,.265],{bone:d,rings:18,radial:28,paint:()=>_e([.75,.72,.48]),sculpt(p){p.y+=.01*Math.sin(p.x*80)*Math.cos(p.z*60)}}),{type:"frog",rig:t,skin:e.geometry(),eyes:n.geometry(),armor:s.geometry(),shell:o.geometry(),bracers:a.geometry(),crest:r.geometry(),mouth:g,length:1.7,height:.8,scale:1}}function ar(i,t,e,n,s,r,o=.05){const a=Oe(...t).lerp(Oe(...e),.5);a.y+=o,i.leaf([t,a.toArray(),e],[.012,n,n*.7,.002],{bone:s,segments:13,across:6,ridge:.012,color:r,vein:!0})}function d1(){const i=Fa(),t=new Gn,e=new Gn,n=i.bone("pelvis",[0,2.45,-.16]),s=i.bone("spine",[0,2.79,.02],n),r=i.bone("neck0",[0,2.97,.24],s),o=i.bone("neck1",[0,3.35,.03],r),a=i.bone("neck2",[0,3.82,.18],o),l=i.bone("head",[0,4.19,.6],a),c=i.bone("jaw",[0,4.12,.7],l),h=i.bone("mouth",[0,4.11,1.48],c),u=i.bone("eyeL",[-.125,4.25,.69],l),d=i.bone("eyeR",[.125,4.25,.69],l),f=m=>{const g=Zn(2.7,3.02,m.y)*.35;return _e([.54-g,.59-g,.61-g])};t.tube([[0,2.43,-.95],[0,2.58,-.53],[0,2.78,-.05],[0,2.99,.27]],[.02,.34,.41,.14],[.02,.39,.48,.18],{segments:30,radial:28,bones:[n,n,s,s],paint:f}),t.tube([[0,2.97,.24],[0,3.22,.16],[0,3.46,.015],[0,3.83,.18],[0,4.12,.52],[0,4.21,.65]],[.16,.15,.12,.1,.1,.13],[.17,.17,.14,.12,.13,.14],{segments:40,radial:20,bones:[r,r,o,a,l,l],paint(m,g,x){const p=Math.cos(x)>.7?.65:.9;return _e([p,p*.99,p*.91])}}),t.tube([[0,4.18,.36],[0,4.28,.57],[0,4.25,.76],[0,4.18,.91]],[.018,.15,.14,.045],[.02,.16,.14,.07],{segments:22,radial:20,bones:[l],paint(m){return m.y>4.32?_e([.07,.1,.12]):_e([.83,.86,.82])}}),t.tube([[0,4.19,.81],[0,4.18,1.04],[0,4.15,1.32],[0,4.12,1.6]],[.072,.055,.027,.001],[.06,.044,.022,.001],{segments:20,radial:10,bones:[l],paint(m,g){return _e([Ze(.74,.34,g),Ze(.47,.24,g),.075])}}),t.tube([[0,4.112,.81],[0,4.105,1.06],[0,4.103,1.36],[0,4.115,1.59]],[.063,.046,.022,.001],[.026,.02,.012,.001],{segments:18,radial:8,bones:[c],paint:()=>_e([.68,.38,.07])});for(const m of[-1,1]){const g=m<0?u:d;e.ellipsoid([m*.132,4.255,.69],[.029,.039,.043],{bone:g,rings:10,radial:18,paint:R=>Math.abs(R.x)>.022&&Math.abs(R.y)<.018&&Math.abs(R.z)<.021?_e([.005,.008,.006]):_e([.9,.7,.13])});const x=i.bone(`hip${m}`,[m*.14,2.47,-.12],n),p=i.bone(`knee${m}`,[m*.18,1.5,-.12],x),v=i.bone(`ankle${m}`,[m*.22,.16,.04],p),y=i.bone(`foot${m}`,[m*.22,.075,.15],v),_=(R,S)=>{const b=.8+.2*Math.sin(R.y*110);return _e([.38*b,.36*b,.21*b])};t.tube([[m*.14,2.47,-.12],[m*.18,1.73,-.15],[m*.18,1.5,-.12]],[.077,.04,.049],[.074,.037,.049],{segments:20,radial:12,bones:[x,x,p],paint:_}),t.tube([[m*.18,1.5,-.12],[m*.2,.7,-.02],[m*.22,.16,.04]],[.042,.024,.031],[.042,.023,.03],{segments:22,radial:10,bones:[p,p,v],paint:_});for(let R=0;R<4;R++){const S=R<3?(R-1)*.23:-.08,b=R<3?.54-.06*Math.abs(R-1):-.21;t.tube([[m*.22,.16,.04],[m*.22+S*.5,.065,(b+.04)*.55],[m*.22+S,.035,b]],[.025,.017,.006],[.023,.013,.005],{segments:12,radial:8,bones:[y],paint:_})}const T=i.bone(`wing${m}`,[m*.31,2.91,-.03],s),A=i.bone(`wingElbow${m}`,[m*.94,2.83,-.12],T),E=i.bone(`wingWrist${m}`,[m*1.5,2.68,-.24],A);t.leaf([[m*.31,2.91,-.03],[m*.95,2.84,-.18],[m*1.58,2.69,-.35]],[.08,.29,.1],{bones:[T,A,E],segments:22,across:10,ridge:.05,color:[.36,.43,.47]});for(let R=0;R<15;R++){const S=.42+R*.088,b=R<6?T:R<11?A:E;ar(t,[m*S,2.89-R*.014,-.05-R*.012],[m*(S+.22+R*.009),2.73-R*.023,-.76-R*.018],.105-R*.002,b,[.26+R*.004,.32+R*.004,.36+R*.004]),R<12&&ar(t,[m*S,2.94-R*.014,.035],[m*(S+.1),2.86-R*.017,-.44],.077,b,[.49,.55,.57])}for(let R=0;R<11;R++)ar(t,[m*(.11+.015*R),2.86-.042*R,-.21],[m*(.29+.009*R),2.7-.044*R,-.75-.022*R],.075,s,[.51+R*.013,.56+R*.012,.56+R*.012]);ar(t,[m*.065,4.34,.51],[m*.13,4.28,-.02],.018,l,[.04,.07,.09],.025)}for(let m=0;m<9;m++)ar(t,[(m-4)*.045,2.53,-.65],[(m-4)*.075,2.34,-1.34-.1*(1-Math.abs(m-4)/4)],.07,n,[.21,.28,.31]);for(let m=0;m<9;m++)ar(t,[(m-4)*.025,3.06,.35],[(m-4)*.044,2.48-.06*(m%3),.42],.032,s,[.79,.8,.72],.01);return{type:"heron",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:h,length:3,height:4.55,scale:1}}function f1(){const i=Fa(),t=new Gn,e=new Gn,n=new Gn,s=i.bone("head",[0,.27,1.97]),r=[s];for(let u=1;u<=20;u++)r.push(i.bone(`coil${u}`,[0,.23,1.97-u*.22],r[u-1]));const o=i.bone("jaw",[0,.205,2.1],s),a=i.bone("mouth",[0,.19,2.48],o),l=i.bone("eyeL",[-.183,.346,2.21],s),c=i.bone("eyeR",[.183,.346,2.21],s),h=(u,d,f)=>{const m=1-Zn(.13,.22,u.y),g=.73-.26*Zn(.2,.65,Math.sin(u.z*7+u.x*18));return _e([Ze(g,.65,m),Ze(g,.6,m),Ze(g,.36,m)],1-m)};t.tube([[0,.25,2.05],[0,.23,1.4],[0,.23,.5],[0,.22,-.4],[0,.18,-1.5],[0,.09,-2.46]],[.13,.186,.205,.18,.115,.002],[.11,.16,.17,.15,.09,.003],{segments:100,radial:20,bones:u=>Ps(r,u),paint:h,distort(u,d,f){u.y+=.003*Math.sin(d*390)*Math.sin(f*12)}}),t.tube([[0,.265,1.86],[0,.29,2.07],[0,.285,2.27],[0,.245,2.48]],[.115,.237,.202,.035],[.1,.12,.105,.038],{segments:24,radial:24,bones:[s],paint:h}),t.tube([[0,.192,1.99],[0,.179,2.25],[0,.207,2.47]],[.14,.19,.025],[.027,.035,.006],{segments:18,radial:16,bones:[o],paint:()=>_e([.66,.63,.42])});for(const u of[-1,1])e.ellipsoid([u*.183,.346,2.21],[.045,.043,.05],{bone:u<0?l:c,rings:12,radial:20,rotationY:u*.9,paint(d){return Math.abs(d.x)<.012&&d.z>.015?_e([.009,.008,.005]):_e([.69,.51,.12])}}),t.tube([[u*.2,.228,2.06],[u*.197,.218,2.29],[u*.045,.225,2.475]],.004,.004,{segments:20,radial:6,bones:[s],paint:()=>_e([.05,.06,.025])}),n.tube([[0,.194,2.47],[0,.19,2.73],[u*.06,.18,2.84]],[.014,.01,.001],[.007,.005,.001],{segments:16,radial:6,bones:[o],paint:()=>_e([.28,.025,.035])});return{type:"snake",rig:i,skin:t.geometry(),eyes:e.geometry(),tongue:n.geometry(),mouth:a,length:5,height:.43,scale:1}}function p1(){const i=Fa(),t=new Gn,e=new Gn,n=i.bone("spine",[0,.6,.18]),s=i.bone("head",[0,.61,.78],n),r=i.bone("tail0",[0,.55,-.44],n),o=i.bone("tail1",[0,.49,-.99],r),a=i.bone("tail",[0,.48,-1.43],o),l=i.bone("jaw",[0,.42,1.03],s),c=i.bone("mouth",[0,.43,1.55],l),h=i.bone("eyeL",[-.22,.72,1.06],s),u=i.bone("eyeR",[.22,.72,1.06],s),d=x=>{const p=1-Zn(.35,.62,x.y),v=.74-.25*Zn(.1,.6,Math.sin(x.z*18+x.y*29)*Math.sin(x.y*35));return _e([Ze(v,.81,p),Ze(v,.78,p),Ze(v,.61,p)],1-p)};t.tube([[0,.48,-1.46],[0,.51,-.92],[0,.61,-.28],[0,.64,.34],[0,.62,.84],[0,.55,1.24],[0,.52,1.56]],[.018,.15,.31,.35,.29,.19,.027],[.035,.22,.46,.48,.32,.19,.05],{segments:54,radial:28,bones:x=>Ps([a,o,r,n,s,s,s],x),paint:d}),t.tube([[0,.43,.92],[0,.36,1.25],[0,.445,1.56]],[.14,.16,.025],[.055,.065,.018],{segments:18,radial:18,bones:[l],paint:()=>_e([.72,.69,.49])});const f=[.33,.4,.23],m=t.p.length/3;for(let x=0;x<=18;x++){const p=x/18,v=Math.cos(p*Math.PI)*.62,y=-1.45-(.3+.3*Math.abs(Math.cos(p*Math.PI)));for(let _=0;_<=6;_++){const T=_/6,A=Oe(.025*Math.sin(p*Math.PI),.48+v*T,Ze(-1.43,y,T)),E=x%2?.85:1.15;t.vertex(A,[T,p],[[a,1]],_e(f.map(R=>R*E),.3))}}for(let x=0;x<18;x++)for(let p=0;p<6;p++){const v=m+x*7+p;t.quad(v,v+1,v+7,v+8)}const g=(x,p,v,y,_=1)=>{const T=Oe(...x).lerp(Oe(...p),.5);T.x+=_*v,t.leaf([x,T.toArray(),p],[.01,v*.8,.003],{bone:y,segments:16,across:8,ridge:.014,color:f,mask:.3})};for(const x of[-1,1]){e.ellipsoid([x*.22,.72,1.06],[.052,.07,.08],{bone:x<0?h:u,rings:12,radial:22,rotationY:x*1,paint(v){return v.z>.035&&Math.pow(v.x/.035,2)+Math.pow(v.y/.04,2)<1?_e([.005,.007,.004]):_e([.75,.59,.18])}});const p=i.bone(`fin${x}`,[x*.255,.42,.65],n);g([x*.255,.42,.65],[x*.63,.21,.11],.16,p,x),g([x*.2,.26,-.11],[x*.38,.13,-.57],.12,r,x),t.tube([[x*.24,.86,.71],[x*.31,.64,.67],[x*.24,.39,.69]],.009,.011,{segments:20,radial:6,bones:[s],paint:()=>_e([.19,.24,.12],.3)});for(let v=0;v<8;v++){const y=1.18+v*.04,_=x*(.12-v*.009);t.tube([[_,.445,y],[_*.9,.475,y+.005]],[.008,.001],[.008,.001],{segments:3,radial:5,bones:[l],paint:()=>_e([.78,.76,.56])})}}for(const x of[!0,!1]){const p=t.p.length/3,v=22;for(let y=0;y<=v;y++){const _=y/v,T=Ze(-.9,.18,_),A=x?.8+.22*_:.26-.1*_,E=Math.sin(Math.PI*_)*(x?.45:-.24),R=_<.5?r:n;for(let S=0;S<=6;S++){const b=S/6,U=Oe(.012*Math.sin(_*6),A+E*b,T-.1*b);t.vertex(U,[b,_],[[R,1]],_e(f.map(P=>P*(y%2?.85:1.1)),.2))}}for(let y=0;y<v;y++)for(let _=0;_<6;_++){const T=p+y*7+_;t.quad(T,T+1,T+7,T+8)}}return{type:"fish",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:c,length:3.65,height:1.65,scale:1}}function m1(i){if(Nl.has(i))return Nl.get(i);const t=256,e=new Uint8Array(t*t*4);for(let s=0;s<t;s++)for(let r=0;r<t;r++){const o=r/t,a=s/t;let l=.82+jr(r,s)*.18;if(i==="frog"){const d=Math.floor(o*28),f=Math.floor(a*28),m=o*28-d-.5,g=a*28-f-.5,x=Math.hypot(m,g),p=Math.exp(-x*x*38)*(.1+jr(d,f)*.18);l=.79+.16*jr(r,s)+p-.11*Math.exp(-Math.pow(x-.31,2)*300)}else if(i==="snake"||i==="fish"){const u=i==="snake"?28:35,d=a*u,f=Math.floor(d),m=o*20+f%2*.5,g=m-Math.floor(m)-.5,x=d-f-.5,p=Math.abs(g)*1.4+Math.abs(x);l=.74+.22*(1-Zn(.49,.72,p))+.04*jr(r,s)}else l=.79+.15*Math.sin(o*170+.4*Math.sin(a*31))**2+.06*jr(r,s);const c=(s*t+r)*4,h=Math.floor(Ye(l)*255);e[c]=e[c+1]=e[c+2]=h,e[c+3]=255}const n=new ah(e,t,t,Vn);return n.wrapS=n.wrapT=Tr,n.magFilter=oi,n.minFilter=ss,n.generateMipmaps=!0,n.needsUpdate=!0,n.repeat.set(i==="heron"?1:2,i==="frog"?3:2),Nl.set(i,n),n}function g1(i,t){const e=m1(i),n=new Vd({color:16777215,vertexColors:!0,map:e,bumpMap:e,bumpScale:i==="frog"?.013:i==="heron"?.007:.009,roughness:i==="frog"?.32:i==="heron"?.68:.37,metalness:0,clearcoat:i==="heron"?0:.42,clearcoatRoughness:.25,envMapIntensity:.8,side:Pe}),s=new ee(t);return n.userData.tint=s,n.onBeforeCompile=r=>{r.uniforms.skinTint={value:s},r.vertexShader=`attribute float skinTintMask; varying float vSkinTint;
`+r.vertexShader,r.vertexShader=r.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vSkinTint = skinTintMask;`),r.fragmentShader=`uniform vec3 skinTint; varying float vSkinTint;
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
 diffuseColor.rgb *= mix(vec3(1.0),skinTint,vSkinTint);`)},n.customProgramCacheKey=()=>"anatomical-skin-v3",n}function x1(i,t){const e=new _n({color:i,side:In,transparent:!0,opacity:.91,depthWrite:!1,toneMapped:!1});return e.userData.thickness={value:t},e.onBeforeCompile=n=>{n.uniforms.outlineThickness=e.userData.thickness,n.vertexShader=`uniform float outlineThickness;
`+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <begin_vertex>","vec3 transformed = position + normal * outlineThickness;")},e.customProgramCacheKey=()=>"skeletal-silhouette-v3",e}function v1(i){const t=i.map(e=>{const n=new kd;return n.name=e.name,n});for(let e=0;e<i.length;e++){const n=i[e];t[e].position.fromArray(n.p),n.parent!==null&&n.parent!==void 0&&(t[e].position.sub(Oe(...i[n.parent].p)),t[n.parent].add(t[e]))}return{bones:t,skeleton:new lh(t),root:t[0]}}function y1(){if(!ts){const n=[],s=[];for(let o=0;o<=48;o++){const a=o/48*di,l=Math.sin(a),c=Math.cos(a),h=Math.abs(o%8-4)/4,u=-.018*c,d=u+.1+.205*h,f=1+.08*h;n.push(l*.255,u,c*.175,l*.27*f,d,c*.188*f,l*.231,u,c*.151,l*(.27*f-.024),d,c*(.188*f-.024))}for(let o=0;o<48;o++){const a=o*4,l=a+4;s.push(a,l,a+1,l,l+1,a+1),s.push(a+2,a+3,l+2,l+2,a+3,l+3),s.push(a+1,l+1,a+3,l+1,l+3,a+3),s.push(a,a+2,l,l,a+2,l+2)}ts=new we,ts.setAttribute("position",new Gt(n,3)),ts.setIndex(s),ts.computeVertexNormals(),ts.computeBoundingSphere(),ts.computeBoundingBox(),kl=new ph(.047,0),kl.scale(.78,1.05,.5)}const i=new te;i.name="royal-crown",i.position.set(0,.22,-.11);const t=new Zt(ts,new We({color:15910746,roughness:.29,metalness:.58,emissive:5911813,emissiveIntensity:.12}));t.name="royal-crown-gold",t.castShadow=!0,t.receiveShadow=!0,i.add(t);const e=new Zt(kl,new We({color:14562379,roughness:.18,metalness:.2,flatShading:!0,emissive:4785420,emissiveIntensity:.12}));return e.name="royal-crown-ruby",e.position.set(0,.042,.195),i.add(e),i}function rd(i,t=0){const e=i==="frog"&&t?`${i}:${t}`:i;if(!Ul.has(e)){const n=i==="frog"?sd([1,.36,.18][t]):({heron:d1,snake:f1,fish:p1}[i]||sd)();for(const s of["skin","eyes","armor","shell","bracers","crest","tongue"])n[s]?.boundingSphere&&(n[s].boundingSphere.radius*=1.9);Ul.set(e,n)}return Ul.get(e)}function Ol(i,t,e,n,s,r,o){const a=Math.hypot(n.y,n.z),l=Math.hypot(s.y,s.z),c=n.y+s.y+r,h=n.z+s.z+o,u=Math.max(Math.abs(a-l)+1e-5,Math.min(a+l-1e-5,Math.hypot(c,h))),d=Math.atan2(h,c),f=-Math.sign(n.y*s.z-n.z*s.y)||1,m=Math.acos(Ye((a*a+u*u-l*l)/(2*a*u),-1,1)),g=d+f*m,x=g-Math.atan2(n.z,n.y);i.rotation.x=Math.atan2(Math.sin(x),Math.cos(x));const p=Math.cos(g)*a,v=Math.sin(g)*a,y=Math.atan2(h-v,c-p)-i.rotation.x-Math.atan2(s.z,s.y);t.rotation.x=Math.atan2(Math.sin(y),Math.cos(y)),e.rotation.x=-i.rotation.x-t.rotation.x}function _1(i,t){if(!i)return{type:"",phase:0,force:0};let e="kick",n=t;return typeof i=="string"?e=i:typeof i=="number"?n=i:(e=i.type||i.kind||"kick",n=i.phase??i.progress??t),n=Ye(n),{type:e,phase:n,force:Math.sin(n*Math.PI)}}function Bl(i,t,e){const n=i.points;if(t<=n[0].s)return e.copy(n[0]),e;for(let s=1;s<n.length;s++)if(t<=n[s].s){const r=n[s-1],o=n[s],a=(t-r.s)/(o.s-r.s||1);return e.set(Ze(r.x,o.x,a),Ze(r.y,o.y,a),Ze(r.z,o.z,a))}return e.copy(n.at(-1)),e}function M1(i="frog",t={}){["frog","heron","snake","fish"].includes(i)||(i="frog");const e=rd(i),n=new te,s=new te;n.name=`creature-${i}`,s.name="anatomical-animation-pivot",n.add(s);const r=i==="frog"?7378989:i==="snake"?6715206:i==="fish"?8624996:16777215,o=g1(i,t.color??r);o.emissive.set(16777215),o.emissiveIntensity=0;const a=new Vd({color:16777215,vertexColors:!0,roughness:.13,clearcoat:1,clearcoatRoughness:.05,metalness:.05}),{bones:l,skeleton:c,root:h}=v1(e.rig.defs),u=new Xo(e.skin,o);u.name=`${i}-weighted-surface`,u.add(h),s.add(u),u.castShadow=!0,u.receiveShadow=!0,u.frustumCulled=!0,n.updateMatrixWorld(!0),u.bind(c);const d=new Xo(e.eyes,a);d.name="articulated-eyes",d.bind(c,u.bindMatrix),d.castShadow=!1,d.frustumCulled=!0,s.add(d);const f=new Xo(e.skin,x1(t.outlineColor??(t.team==="enemy"?16741200:t.team==="player"?11075554:i==="frog"?8513956:16755275),i==="frog"?.018:.027));f.name="animated-color-silhouette",f.bind(c,u.bindMatrix),f.frustumCulled=!0,f.renderOrder=-1,s.add(f);const m=[];for(const ht of["armor","shell","bracers","crest","tongue"])if(e[ht]){const Y=new We({color:16777215,vertexColors:!0,roughness:ht==="tongue"?.35:.79,side:Pe}),rt=new Xo(e[ht],Y);rt.name=ht,rt.bind(c,u.bindMatrix),rt.frustumCulled=!0,rt.castShadow=ht!=="tongue",rt.visible=ht==="tongue",s.add(rt),m.push(rt)}const g={};for(const ht of l)g[ht.name]=ht;const x=l.map(ht=>ht.position.clone()),p=new Xe;p.name="mouth-attachment",l[e.mouth].add(p);let v=(t.seed||0)*.731,y=0,_="",T=1,A=0,E=0,R=0,S=!0,b=!1,U=null,P=1,G=!1,j=0,H={x:0,z:1,strength:0,life:0,duration:.26,heavy:!1},q={armor:null,weapon:null,crest:!1};const B=t.role||"scout",O=i==="frog"?["guardian","brute","tank"].includes(B)?[1.15,1.12,1.05]:["scout","hunter","agile"].includes(B)?[.96,.98,1.04]:[1.03,1.02,1.02]:[1,1,1];s.scale.set(...O);const Q=()=>{const ht=1+(T-1)*.04+Math.min(24,Math.max(0,P-1))*.004;s.scale.set(O[0]*ht,O[1]*ht,O[2]*ht)},W=()=>{for(const ht of m)ht.name==="armor"&&(ht.visible=i==="frog"&&q.armor==="reed"),ht.name==="shell"&&(ht.visible=i==="frog"&&q.armor==="shell"),ht.name==="bracers"&&(ht.visible=i==="frog"&&q.weapon==="reed"),ht.name==="crest"&&(ht.visible=i==="frog"&&q.crest&&!b)},ft=()=>{for(let ht=0;ht<l.length;ht++)l[ht].rotation.set(0,0,0),l[ht].scale.set(1,1,1),l[ht].position.copy(x[ht])};let Vt=null;function Me(ht){if(i!=="snake"||!ht?.points?.length||!ht.weight)return;Vt||(Vt={targets:Array.from({length:21},()=>new he),local:new he,inverse:new he,point:Oe(),before:Oe(),after:Oe(),translation:Oe(),rotation:new ls,scale:Oe(1,1,1),localPosition:Oe(),localRotation:new ls,localScale:Oe()});const Y=Vt,rt=Ye(ht.weight),_t=ht.scale||1,Xt=ht.origin,kt=Math.cos(ht.yaw||0),fe=Math.sin(ht.yaw||0);s.position.y*=1-rt,s.rotation.x*=1-rt,s.rotation.z*=1-rt;for(let D=0;D<=20;D++){const ne=D?g["coil"+D]:g.head,Yt=1.97-D*.22,qt=(D?Yt:2.17)*_t;Bl(ht,qt,Y.point),Bl(ht,qt-.07*_t,Y.before),Bl(ht,qt+.07*_t,Y.after);const Lt=Y.after.x-Y.before.x,se=Y.after.z-Y.before.z,mt=Math.hypot(Lt,se),Mt=mt>1e-4?Math.atan2(Lt,se):ht.yaw||0;D||(Y.point.x-=Math.sin(Mt)*.2*_t,Y.point.z-=Math.cos(Mt)*.2*_t);const le=(Y.point.x-Xt.x)/_t,De=(Y.point.z-Xt.z)/_t,z=Math.max(Y.point.y,Y.before.y,Y.after.y);Y.translation.set(kt*le-fe*De,(z-Xt.y)/_t+(D?.26:.3),fe*le+kt*De),Y.rotation.setFromAxisAngle(Wc,Mt-(ht.yaw||0)),Y.targets[D].compose(Y.translation,Y.rotation,Y.scale),Y.local.copy(Y.targets[D]),D&&Y.local.premultiply(Y.inverse.copy(Y.targets[D-1]).invert()),Y.local.decompose(Y.localPosition,Y.localRotation,Y.localScale),ne.position.lerp(Y.localPosition,rt),ne.quaternion.slerp(Y.localRotation,rt),ne.scale.lerp(Y.localScale,rt)}g.jaw.rotation.x*=1-rt*.8;const Ee=m.find(D=>D.name==="tongue");Ee&&rt>.8&&(Ee.visible=!1)}const ce={group:n,bones:g,skeleton:c,mesh:u,get crowned(){return b},get equipment(){return{...q}},get level(){return P},get working(){return G},stats:{type:i,vertices:e.skin.attributes.position.count+e.eyes.attributes.position.count,triangles:(e.skin.index.count+e.eyes.index.count)/3,boneCount:l.length,length:e.length,height:e.height,rigged:!0,renderLOD:0},setOutline(ht,Y=!0){ht!=null&&f.material.color.set(ht),S=Y,f.visible=Y&&R===0},setRenderLOD(ht=0){const Y=i==="frog"?Ye(Math.round(Number(ht)||0),0,2):0;if(Y===R)return;R=Y;const rt=rd(i,Y);for(const _t of[u,d,f,...m])_t.geometry=rt[_t===u||_t===f?"skin":_t===d?"eyes":_t.name],_t.boundingSphere=null,_t.boundingBox=null,_t.castShadow=Y===0&&_t!==d&&_t!==f&&_t.name!=="tongue";f.visible=S&&Y===0,U&&(U.getObjectByName("royal-crown-gold").castShadow=Y===0),ce.stats.vertices=rt.skin.attributes.position.count+rt.eyes.attributes.position.count,ce.stats.triangles=(rt.skin.index.count+rt.eyes.index.count)/3,ce.stats.renderLOD=Y},setTier(ht){T=Ye(Math.round(ht||1),1,5),Q()},setLevel(ht){P=Ye(Math.floor(Number(ht)||1),1,999),Q()},setEquipment(ht={}){return q=i==="frog"?{armor:["reed","shell"].includes(ht?.armor)?ht.armor:null,weapon:ht?.weapon==="reed"?"reed":null,crest:ht?.crest===!0}:{armor:null,weapon:null,crest:!1},W(),{...q}},setWorking(ht=!1){G=i==="frog"&&!!ht},setImpact(ht={}){const Y=Ye(Number(ht.strength)||0,0,1.5),rt=Number(ht.x)||0,_t=Number(ht.z)||0,Xt=Math.hypot(rt,_t)||1,kt=Ye(Number(ht.duration)||.26,.08,.5);H={x:rt/Xt,z:_t/Xt,strength:Y,life:Y?kt:0,duration:kt,heavy:!!ht.heavy},o.emissiveIntensity=Y?Math.min(.82,.34+Y*.35):0},setCrowned(ht=!1){return b=i==="frog"&&!!ht,b&&!U&&(U=y1(),g.head.add(U)),U&&(U.visible=b,U.getObjectByName("royal-crown-gold").castShadow=R===0),W(),b},mouthWorld(ht=new L){return n.updateWorldMatrix(!0,!0),p.getWorldPosition(ht)},update(ht,Y={}){ht=Ye(Number(ht)||0,0,.1),v=Y.time!==void 0?Y.time+(t.seed||0)*.731:v+ht,ft();const rt=Math.max(0,Number(Y.speed)||0),_t=Ye(rt/(i==="frog"?2.8:3));E=Ze(E,_t,1-Math.exp(-ht*12));const Xt=Y.swimming?1:0,kt=typeof Y.jump=="number"?Ye(Y.jump):Y.jump?.5:0,fe=typeof Y.attack=="string"?Y.attack:Y.attack?.type||Y.attack?.kind||(Y.attack?"kick":"");fe!==_?(y=0,_=fe):Y.attack&&(y+=ht/.55);const Ee=_1(Y.attack,y),D=Ee.force,ne=typeof Y.roar=="number"?Ye(Y.roar):Y.roar?1:0,Yt=typeof Y.hit=="number"?Ye(Y.hit):Y.hit?1:0;H.life=Math.max(0,H.life-ht),o.emissiveIntensity=H.life>0?Math.max(0,1-(H.duration-H.life)/.07)*Math.min(.82,.34+H.strength*.35):0,Y.building!==void 0&&(G=i==="frog"&&!!Y.building),j=Ze(j,G&&!Y.dead&&!Ee.type&&rt<1?1:0,1-Math.exp(-ht*12)),A=Ze(A,Y.dead?1:0,1-Math.exp(-ht*5)),s.position.set(0,0,0),s.rotation.set(0,0,0);const qt=(v+(t.seed||0)*.4)%5.7,Lt=qt>5.5?.08+.92*Math.abs((qt-5.6)*10):1;if(g.eyeL&&(g.eyeL.scale.y=Ye(Lt,.08,1)),g.eyeR&&(g.eyeR.scale.y=Ye(Lt,.08,1)),i==="frog"){const se=Y.hop||(kt>0?{phase:"air",progress:1-kt}:{phase:"idle",progress:0}),mt=Ye(se.progress||0),Mt=se.phase==="air",le=se.phase==="gather"?mt:0,De=se.phase==="land"?Math.sin(mt*Math.PI):0,z=Mt?Math.sin(Ye(mt/.14)*Math.PI/2)*(1-Ye((mt-.16)/.48)):0,w=Mt?Ye((mt-.82)/.18):0,tt=Mt?1-Ye(mt/.14):0,at=Mt?Ye((mt-.25)/.45)*(1-w):0,lt=Mt?Ye((mt-.6)/.35):0,ot=v*7.8,Ut=Math.sin(ot)*E;s.position.y=Xt?-.14+.023*Math.sin(v*3):-.085*(le+tt)-.075*De,s.rotation.x=Xt?-.12:(le+tt)*.07-(Mt?Math.sin(mt*Math.PI)*.12:0)+lt*.08*(1-w),g.spine.rotation.x=Math.sin(v*2.6)*.009,g.spine.scale.y=1+Math.sin(v*2.6)*.018,g.head.rotation.x=.02*Math.sin(v*1.7)-ne*.18-(Mt?.04:0),g.jaw.rotation.x=-ne*.13-(Ee.type==="tongue"?D*.16:0),g.throat.scale.set(1+ne*.26,1+ne*1.45+Math.sin(v*2.5)*.035,1+ne*.25);for(const ct of[-1,1])if(Xt)g[`hip${ct}`].rotation.x=-.32*Ut,g[`hip${ct}`].rotation.z=ct*.07*Ut,g[`knee${ct}`].rotation.x=.62*Ut,g[`ankle${ct}`].rotation.x=-.25*Ut,g[`foot${ct}`].rotation.x=.2*Ut,g[`shoulder${ct}`].rotation.x=-.23*Ut,g[`elbow${ct}`].rotation.x=.28*Ut,g[`wrist${ct}`].rotation.x=-.12*Ut,g[`shoulder${ct}`].rotation.z=ct*(.22+.25*Ut),g[`elbow${ct}`].rotation.y=ct*.3;else if(!Y.dead){const St=e.rig.ids,Pt=Mt?.085*tt+(-.1*z+.045*at)*(1-tt):-s.position.y,gt=Mt?.035*tt+(-.42*z+.11*at)*(1-tt):.035*le,Rt=Mt?.085*tt+(.085*(1-lt)-.035*lt)*(1-w)*(1-tt):-s.position.y,jt=Mt?(-.075*(1-lt)+.13*lt)*(1-w)*(1-tt):0;Ol(g[`hip${ct}`],g[`knee${ct}`],g[`ankle${ct}`],x[St[`knee${ct}`]],x[St[`ankle${ct}`]],Pt,gt),Ol(g[`shoulder${ct}`],g[`elbow${ct}`],g[`wrist${ct}`],x[St[`elbow${ct}`]],x[St[`wrist${ct}`]],Rt,jt),g[`foot${ct}`].rotation.x=-z*.14}if(Ee.type==="kick"||Ee.type==="strike"){s.rotation.y=-D*.55,s.rotation.z=D*.22,s.position.y+=D*.16;const ct=e.rig.ids;Ol(g.hip1,g.knee1,g.ankle1,x[ct.knee1],x[ct.ankle1],.26*D,1.16*D),g.hip1.rotation.y=-D*.3,g.hip1.rotation.z=-D*.08,g["shoulder-1"].rotation.z=D*.55}else if(Ee.type==="slam"||Ee.type==="belly"){const ct=Math.sin(Ee.phase*Math.PI);s.rotation.x=-ct*.28,s.position.y+=ct*.22;for(const St of[-1,1])g[`hip${St}`].rotation.x-=ct*.7,g[`shoulder${St}`].rotation.z=St*ct*.45}else Ee.type==="tongue"&&(g.head.rotation.x-=D*.1,g.spine.rotation.x-=D*.07);if(j>.001){const ct=v*8.2,St=.5+.5*Math.sin(ct),Pt=.5+.5*Math.sin(ct+Math.PI);g.spine.rotation.x+=.1*j,g.head.rotation.x+=(.12+.06*St)*j,g.shoulder1.rotation.x-=(.25+St*.85)*j,g.elbow1.rotation.x+=(.2+St*.55)*j,g.wrist1.rotation.x-=St*.3*j,g["shoulder-1"].rotation.x-=(.13+Pt*.35)*j,g["elbow-1"].rotation.x+=(.15+Pt*.2)*j,s.position.y+=.025*Math.cos(ct)*j}if(H.life>0){const ct=1-H.life/H.duration,St=Math.sin(Math.min(1,ct/.22)*Math.PI/2)*Math.pow(1-ct,1.8)*H.strength,Pt=St*(H.heavy?1.2:1);s.rotation.x+=H.z*.17*Pt,s.rotation.z-=H.x*.21*Pt,s.position.x+=H.x*.045*Pt,s.position.z+=H.z*.055*Pt,g.spine.scale.z*=1-.075*St,g.head.rotation.x-=.15*Pt,g.head.rotation.z-=H.x*.08*Pt,g.jaw.rotation.x-=.12*Pt,g["shoulder-1"].rotation.z-=.1*Pt,g.shoulder1.rotation.z+=.1*Pt,g.eyeL.scale.y*=1-.55*St,g.eyeR.scale.y*=1-.55*St}else Yt>0&&(s.rotation.x+=Yt*.065);s.position.y-=A*.22,s.rotation.z+=A*1.35,g.spine.scale.y*=1-A*.15}else if(i==="heron"){const se=v*5.6,mt=E;s.position.y=.035*Math.sin(se*2)*mt,g.spine.rotation.x=-.03*Math.sin(se)*mt,g.neck0.rotation.x=.1*Math.sin(v*1.4)-D*.62,g.neck1.rotation.x=-.08*Math.sin(v*1.4)+D*.58,g.neck2.rotation.x=-.03+D*.7,g.head.rotation.x=-.06*Math.sin(v*1.8)+D*.48,g.jaw.rotation.x=-D*.5;for(const Mt of[-1,1]){const le=se+(Mt<0?Math.PI:0),De=Math.sin(le);g[`hip${Mt}`].rotation.x=De*.31*mt,g[`knee${Mt}`].rotation.x=Math.max(0,-De)*.57*mt,g[`foot${Mt}`].rotation.x=-.18*De*mt,g[`wing${Mt}`].rotation.y=Mt*(1.24-D*1.07-Yt*.55),g[`wing${Mt}`].rotation.z=Mt*(.07+D*(.5+.25*Math.sin(v*18))+Yt*.5),g[`wingElbow${Mt}`].rotation.y=Mt*.12,g[`wingWrist${Mt}`].rotation.z=Mt*D*.18}s.rotation.z+=(H.life>0?0:Yt*.08*Math.sin(v*32))+A*1.45,s.position.y-=A*1.8}else if(i==="snake"){const se=v*(3+E*5),mt=.055+E*.105;for(let le=1;le<=20;le++)g[`coil${le}`].rotation.y=Math.sin(se-le*.48)*mt,g[`coil${le}`].rotation.x=le<6?-D*.18*(1-le/7):.006*Math.sin(v*3-le);g.head.rotation.x=D*.45,g.head.rotation.y=Math.sin(se)*.035,g.jaw.rotation.x=-D*.62,s.position.y=D*.28;const Mt=m.find(le=>le.name==="tongue");Mt&&(Mt.visible=!Y.dead&&(Math.sin(v*3.7)>.77||D>.2)),s.rotation.z=A*.65+(H.life>0?0:Yt*.1*Math.sin(v*32))}else if(i==="fish"){const se=v*(4+E*10),mt=.09+E*.22;g.spine.rotation.y=Math.sin(se)*mt*.2,g.head.rotation.y=-Math.sin(se)*mt*.13,g.tail0.rotation.y=Math.sin(se-.5)*mt,g.tail1.rotation.y=Math.sin(se-1.1)*mt*1.25,g.tail.rotation.y=Math.sin(se-1.6)*mt*1.2,g.jaw.rotation.x=-D*.62-.035*Math.sin(v*2.5);for(const Mt of[-1,1])g[`fin${Mt}`].rotation.z=Mt*(.13+.16*Math.sin(v*6)),g[`fin${Mt}`].rotation.y=Mt*.15*Math.sin(v*5);s.rotation.x=-D*.35,s.position.y=.035*Math.sin(v*2),s.rotation.z=A*Math.PI+(H.life>0?0:Yt*.14*Math.sin(v*35))}if(i!=="frog"&&H.life>0){const se=1-H.life/H.duration,mt=Math.sin(Math.min(1,se/.22)*Math.PI/2)*Math.pow(1-se,1.8)*H.strength*(H.heavy?1.2:1);s.rotation.x+=H.z*.055*mt,s.rotation.z-=H.x*.08*mt,g.head.rotation.x-=.075*mt,g.head.rotation.z-=H.x*.05*mt}i==="snake"&&Me(Y.snakePose)},dispose(){o.dispose(),a.dispose(),f.material.dispose();for(const ht of m)ht.material.dispose();U&&U.traverse(ht=>{ht.isMesh&&ht.material.dispose()}),c.dispose(),n.removeFromParent()}};return ce.setTier(t.tier||1),ce.setLevel(t.level||1),ce.setEquipment(t.equipment),ce.setCrowned(t.crowned),ce.update(0,{}),n.userData.creature=ce,ce}const Ln=(i,t)=>Object.freeze({x:i,z:t}),_r=["player","rival-1","rival-2"],b1=.78,yi=.84,Pn=1e-5,Oa=Object.freeze([{id:"catapult-player",enclosureId:"yard-player",owner:_r[0],x:-8.5,z:16},{id:"catapult-rival-1",enclosureId:"yard-rival-1",owner:_r[1],x:-16,z:-8.5},{id:"catapult-rival-2",enclosureId:"yard-rival-2",owner:_r[2],x:16,z:-8.5}].map(Object.freeze)),Xn=Object.freeze([{id:"base-player",owner:_r[0],x:0,z:20.5,spawn:Ln(0,19.65),spawnHeading:Math.PI,stock:Ln(0,21.4),gate:Ln(0,17.9),approach:Ln(0,16.25),side:"north",halfWidth:3.1,halfDepth:2.6},{id:"base-rival-1",owner:_r[1],x:-18,z:1,spawn:Ln(-17.35,1),spawnHeading:Math.PI/2,stock:Ln(-19.1,1),gate:Ln(-14.9,1),approach:Ln(-13.25,1),side:"east",halfWidth:3.1,halfDepth:2.9},{id:"base-rival-2",owner:_r[2],x:18,z:1,spawn:Ln(17.35,1),spawnHeading:-Math.PI/2,stock:Ln(19.1,1),gate:Ln(14.9,1),approach:Ln(13.25,1),side:"west",halfWidth:3.1,halfDepth:2.9}].map(Object.freeze));function ef(i,t){return i.map(e=>{let n=-1/0,s=1/0;const r=e.halfWidth+.18,o=e.halfDepth+.18,a=Math.ceil(r*2/.22),l=Math.ceil(o*2/.22);for(let x=0;x<=a;x++)for(let p=0;p<=l;p++){const v=-r+r*2*x/a,y=-o+o*2*p/l,_=t(e.x+v,e.z+y);n=Math.max(n,_),s=Math.min(s,_)}const c=n+.16,h=Math.hypot(e.gate.x-e.x,e.gate.z-e.z),u=(e.gate.x-e.x)/h,d=(e.gate.z-e.z)/h,f=-d,m=u,g={x:e.gate.x+u*.18,z:e.gate.z+d*.18,dx:u,dz:d,rightX:f,rightZ:m,halfWidth:1.55,length:2.5,rows:10,cols:6,heights:[]};for(let x=0;x<=g.rows;x++)for(let p=0;p<=g.cols;p++){const v=x/g.rows*g.length,y=(p/g.cols*2-1)*g.halfWidth,_=g.x+u*v+f*y,T=g.z+d*v+m*y,A=t(g.x+u*g.length+f*y,g.z+d*g.length+m*y)+.015;g.heights.push(Math.max(c+(A-c)*x/g.rows,t(_,T)+.015))}return{id:e.id,baseId:e.id,x:e.x,z:e.z,halfWidth:r,halfDepth:o,height:c,minimum:s,ramp:g}})}function S1(i){return ef(Xn,i)}function w1(i){return ef(nf,i)}function E1(i,t,e){if(!e)return null;for(const n of e){if(Math.abs(i-n.x)<=n.halfWidth+1e-7&&Math.abs(t-n.z)<=n.halfDepth+1e-7)return n.height;const s=n.ramp,r=i-s.x,o=t-s.z,a=r*s.dx+o*s.dz,l=r*s.rightX+o*s.rightZ;if(a<-1e-7||a>s.length+1e-7||Math.abs(l)>s.halfWidth+1e-7)continue;const c=Math.max(0,Math.min(s.rows,a/s.length*s.rows)),h=Math.max(0,Math.min(s.cols,(l/s.halfWidth+1)*.5*s.cols)),u=Math.min(s.rows-1,Math.floor(c)),d=Math.min(s.cols-1,Math.floor(h)),f=c-u,m=h-d,g=s.heights[u*(s.cols+1)+d],x=s.heights[u*(s.cols+1)+d+1],p=s.heights[(u+1)*(s.cols+1)+d],v=s.heights[(u+1)*(s.cols+1)+d+1];return(g+(x-g)*m)*(1-f)+(p+(v-p)*m)*f}return null}const nf=Object.freeze(Oa.map(i=>Object.freeze({id:i.enclosureId,owner:i.owner,x:i.x,z:i.z,halfWidth:2.8,halfDepth:2.8,side:"south",gate:Ln(i.x,i.z+2.8),approach:Ln(i.x,i.z+4.45)}))),Ba=Object.freeze([...Xn.map(i=>Object.freeze({...i,kind:"shelter",height:2.3})),...nf.map(i=>Object.freeze({...i,kind:"catapult",height:1.65}))]),ra=3.2,lr=.34;function T1(i){const t=[],e=(n,s,r,o,a,l="whole")=>t.push(Object.freeze({id:`${i.id}-${n}-${l}`,enclosureId:i.id,owner:i.owner,x:s,z:r,hw:o,hd:a,height:i.height}));for(const n of["north","south"]){const s=i.z+(n==="north"?-i.halfDepth:i.halfDepth);if(i.side===n){const r=(i.halfWidth-ra/2)/2;for(const o of[-1,1])e(n,i.x+o*(ra/2+r),s,r,lr/2,String(o))}else e(n,i.x,s,i.halfWidth+lr/2,lr/2)}for(const n of["west","east"]){const s=i.x+(n==="west"?-i.halfWidth:i.halfWidth);if(i.side===n){const r=(i.halfDepth-ra/2)/2;for(const o of[-1,1])e(n,s,i.z+o*(ra/2+r),lr/2,r,String(o))}else e(n,s,i.z,lr/2,i.halfDepth+lr/2)}return t}const hs=Object.freeze(Ba.flatMap(T1)),_h=Object.freeze([{id:"grove-west",x:-7,z:9,radius:3.1},{id:"grove-east",x:8,z:6.4,radius:3.1},{id:"grove-middle",x:0,z:-4.5,radius:3.4},{id:"grove-northwest",x:-7.2,z:-8.8,radius:2.5},{id:"grove-northeast",x:7.6,z:-9.2,radius:2.5}].map(Object.freeze)),bo=Object.freeze([{x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6},...Oa.map(i=>({x:i.x,z:i.z,r:.95,machine:!0}))]);function Ha(i,t=0){return{minX:i.x-i.hw-t,maxX:i.x+i.hw+t,minZ:i.z-i.hd-t,maxZ:i.z+i.hd+t}}function Mh(i,t,e,n=0){return i>e.minX+n&&i<e.maxX-n&&t>e.minZ+n&&t<e.maxZ-n}function sf(i,t,e,n,s,r=0){const o=Ha(s,r),a=e-i,l=n-t;let c=-1/0,h=1/0,u=0,d=0;for(const[f,m,g,x,p]of[[i,a,o.minX,o.maxX,"x"],[t,l,o.minZ,o.maxZ,"z"]]){if(Math.abs(m)<1e-12){if(f<g-Pn||f>x+Pn)return null;continue}const v=(g-f)/m,y=(x-f)/m,_=Math.min(v,y),T=Math.max(v,y);if(_>c&&(c=_,u=p==="x"?m>0?-1:1:0,d=p==="z"?m>0?-1:1:0),h=Math.min(h,T),c>h+Pn)return null}return h<0||c>1||c<0&&!Mh(i,t,o,-Pn)?null:{t:Math.max(0,c),nx:u,nz:d}}function A1(i,t,e,n,s=0){let r=1/0;for(const o of hs){const a=sf(i,t,e,n,o,s);a&&a.t<r&&(r=a.t)}return Number.isFinite(r)?r:null}function Ns(i,t,e=.1){return A1(i.x,i.z,t.x,t.z,e)===null}function ro(i,t,e,n=b1){let s=i.x,r=i.z,o=Number.isFinite(t)?t:0,a=Number.isFinite(e)?e:0;for(let l=0;l<4;l++){let c=!1;for(const h of hs){const u=Ha(h,n);if(!Mh(s,r,u,Pn))continue;const d=[{distance:s-u.minX,x:u.minX-Pn,z:r},{distance:u.maxX-s,x:u.maxX+Pn,z:r},{distance:r-u.minZ,x:s,z:u.minZ-Pn},{distance:u.maxZ-r,x:s,z:u.maxZ+Pn}];d.sort((f,m)=>f.distance-m.distance),s=d[0].x,r=d[0].z,c=!0}if(!c)break}for(let l=0;l<4&&(Math.abs(o)>Pn||Math.abs(a)>Pn);l++){let c=null;for(const f of hs){const m=sf(s,r,s+o,r+a,f,n);m&&(!c||m.t<c.t)&&(c=m)}if(!c){s+=o,r+=a;break}const h=Math.max(0,c.t-Pn);s+=o*h,r+=a*h;const u=1-c.t;o*=u,a*=u;const d=o*c.nx+a*c.nz;if(d<0)o-=c.nx*d,a-=c.nz*d;else break}return{x:s,z:r}}function Ga(i){return _h.find(t=>Math.hypot(i.x-t.x,i.z-t.z)<=t.radius)||null}function R1(i){return Ga(i)?.55:1}function C1(i){return Ba.find(t=>Math.abs(i.x-t.x)<t.halfWidth&&Math.abs(i.z-t.z)<t.halfDepth)||null}function P1(i,t,e,n){const s=t.x-i.x,r=t.z-i.z,o=s*s+r*r,a=o?Math.max(0,Math.min(1,((e.x-i.x)*s+(e.z-i.z)*r)/o)):0;return Math.hypot(i.x+a*s-e.x,i.z+a*r-e.z)<n-Pn}function Mr(i,t){return Ns(i,t,yi)&&bo.every(e=>!P1(i,t,e,e.r+yi))}function z1(i){return Math.hypot(i.x,i.z)<=23.85&&hs.every(t=>!Mh(i.x,i.z,Ha(t,yi),-Pn))&&bo.every(t=>Math.hypot(i.x-t.x,i.z-t.z)>t.r+yi+Pn)}let oa=null;const cr=new WeakMap;function D1(){if(oa)return oa;const i=[],t=(n,s)=>{const r={x:n,z:s};z1(r)&&!i.some(o=>Math.hypot(o.x-n,o.z-s)<.1)&&i.push(r)};for(const n of hs){const s=Ha(n,yi+.06);for(const r of[s.minX,s.maxX])for(const o of[s.minZ,s.maxZ])t(r,o)}for(const n of bo)for(let s=0;s<12;s++){const r=s*Math.PI/6,o=(n.r+yi+.08)/Math.cos(Math.PI/12);t(n.x+Math.cos(r)*o,n.z+Math.sin(r)*o)}for(const n of Ba)t(n.gate.x,n.gate.z),t(n.approach.x,n.approach.z),t(n.gate.x+(n.x-n.gate.x)*.4,n.gate.z+(n.z-n.gate.z)*.4);const e=i.map(()=>[]);for(let n=0;n<i.length;n++)for(let s=n+1;s<i.length;s++)if(Mr(i[n],i[s])){const r=Math.hypot(i[n].x-i[s].x,i[n].z-i[s].z);e[n].push([s,r]),e[s].push([n,r])}return oa={nodes:i,edges:e},oa}function I1(i,t){let e={x:t.x,z:t.z};const n=bo.find(s=>s.machine&&Math.hypot(e.x-s.x,e.z-s.z)<s.r+yi);return n&&(e={x:n.x,z:n.z+2.05}),ro(e,0,0,yi+.02)}function L1(i,t){const{nodes:e,edges:n}=D1(),s=e.length,r=new Float64Array(s),o=new Int32Array(s),a=new Uint8Array(s);r.fill(1/0),o.fill(-1);const l=new Map;for(let d=0;d<s;d++)Mr(i,e[d])&&(r[d]=Math.hypot(i.x-e[d].x,i.z-e[d].z)),Mr(e[d],t)&&l.set(d,Math.hypot(t.x-e[d].x,t.z-e[d].z));let c=-1,h=1/0;for(let d=0;d<s;d++){let f=-1,m=1/0;for(let g=0;g<s;g++)!a[g]&&r[g]<m&&(m=r[g],f=g);if(f<0||m>=h)break;a[f]=1,l.has(f)&&m+l.get(f)<h&&(c=f,h=m+l.get(f));for(const[g,x]of n[f])m+x<r[g]&&(r[g]=m+x,o[g]=f)}if(c<0)return[];const u=[t];for(let d=c;d>=0;d=o[d])u.unshift(e[d]);return u}function rf(i,t){if(!Number.isFinite(t?.x)||!Number.isFinite(t?.z))return{x:0,z:0};const e=ro(i,0,0,yi+.02),n=Math.hypot(e.x-i.x,e.z-i.z);if(n>.005)return cr.delete(i),{x:(e.x-i.x)/n,z:(e.z-i.z)/n};for(const c of bo){const h=i.x-c.x,u=i.z-c.z,d=Math.hypot(h,u);if(d<c.r+yi+.01)return cr.delete(i),d>1e-6?{x:h/d,z:u/d}:{x:0,z:1}}const s=I1(i,t),r=Math.hypot(s.x-i.x,s.z-i.z);if(r<.18)return cr.delete(i),{x:0,z:0};if(Mr(i,s))return cr.delete(i),{x:(s.x-i.x)/r,z:(s.z-i.z)/r};let o=cr.get(i);for((!o||Math.hypot(o.goal.x-s.x,o.goal.z-s.z)>1.1||Math.hypot(o.lastX-i.x,o.lastZ-i.z)>3)&&(o={goal:s,path:L1(i,s),lastX:i.x,lastZ:i.z},cr.set(i,o)),o.lastX=i.x,o.lastZ=i.z;o.path.length&&Math.hypot(o.path[0].x-i.x,o.path[0].z-i.z)<.18&&(o.path.length===1||Mr(i,o.path[1]));)o.path.shift();for(let c=o.path.length-1;c>0;c--)if(Mr(i,o.path[c])){o.path.splice(0,c);break}const a=o.path[0];if(!a)return{x:0,z:0};const l=Math.hypot(a.x-i.x,a.z-i.z);return l?{x:(a.x-i.x)/l,z:(a.z-i.z)/l}:{x:0,z:0}}const ze=Object.freeze({delivery:"catapult",interactionRange:3,baseRadius:.95,minRange:5,maxRange:28,blastRadius:2.8,innerRadius:1.25,flightTime:1.25,arcHeight:8,cooldown:3,recoilDuration:.45,centerLift:.85,rimLift:.45,centerRecovery:.48,rimRecovery:.42}),bh=Oa,U1=(i,t,e)=>Math.max(t,Math.min(e,i));function N1(i,t,e,n=.6){const s=Math.hypot(t,e),r=s>1e-6?t/s:0,o=s>1e-6?e/s:-1,a=ze.minRange+(ze.maxRange-ze.minRange)*U1(Number.isFinite(n)?n:.6,0,1),l=i.x*r+i.z*o,c=576-i.x*i.x-i.z*i.z,h=Math.max(0,-l+Math.sqrt(Math.max(0,l*l+c))),u=Math.min(a,h);return{x:i.x+r*u,z:i.z+o*u,range:u,valid:u>=ze.minRange-1e-6}}function k1(){return bh.map(i=>({...i,occupant:null,cooldown:0,loaded:!0,aimX:0,aimZ:-1,recoil:0}))}function of(i,t){return i.catapults.filter(e=>(e.owner===t.id||!e.owner)&&(!e.occupant||e.occupant===t.id)&&Math.hypot(e.x-t.x,e.z-t.z)<=ze.interactionRange&&Ns(t,e,.1)).sort((e,n)=>Math.hypot(e.x-t.x,e.z-t.z)-Math.hypot(n.x-t.x,n.z-t.z))[0]||null}function Is(i,t){const e=i.catapults.find(s=>s.id===t.catapultId);if(e?.occupant===t.id){e.occupant=null,t.x=e.x,t.z=e.z+2.3;const s=Math.hypot(t.x,t.z);s>24&&(t.x*=24/s,t.z*=24/s)}const n=!!t.catapultId;return t.catapultId=null,t.catapultShots=0,t.interactHeld=!1,n}function F1(i,t){if(t.catapultId)return Is(i,t);if(t.ko||t.dizzyTime>0||t.knockUp>0||t.kick>0||t.id!=="player"&&i.phase!=="battle")return!1;const e=of(i,t);return e?(e.occupant=t.id,t.catapultId=e.id,t.catapultShots=0,t.catapultAim=1,t.x=e.x,t.z=e.z,t.hop=0,t.height=0,t.idle=0,t.hopX=t.hopZ=0,t.impulseX=t.impulseZ=0,i.events.push({type:"catapultMount",id:t.id,catapultId:e.id}),!0):!1}function O1(i,t,e){const n=i.catapults.find(f=>f.id===t.catapultId);if(i.phase!=="battle"||t.ko||t.dizzyTime>0||t.hit>0||t.knockUp>0||!n||n.occupant!==t.id||!n.loaded||n.cooldown>0||e?.valid===!1||!Number.isFinite(e?.x)||!Number.isFinite(e?.z))return!1;let s=e.x,r=e.z;const o=Math.hypot(s,r);o>24&&(s*=24/o,r*=24/o);const a=s-n.x,l=r-n.z,c=Math.hypot(a,l);if(c<ze.minRange-1e-6)return!1;const h=a/c,u=l/c;c>ze.maxRange&&(s=n.x+h*ze.maxRange,r=n.z+u*ze.maxRange);const d={id:i.nextId++,owner:t.id,catapultId:n.id,startX:n.x+h,startZ:n.z+u,startHeight:1.6,tx:s,tz:r,age:0,duration:ze.flightTime,arcHeight:ze.arcHeight};return n.aimX=h,n.aimZ=u,n.loaded=!1,n.cooldown=ze.cooldown,n.recoil=ze.recoilDuration,t.catapultShots++,i.shells.push(d),i.events.push({type:"stoneShot",id:t.id,shellId:d.id,catapultId:n.id}),!0}function B1(i,t,e){for(const n of i.catapults)if(n.cooldown=Math.max(0,n.cooldown-t),n.recoil=Math.max(0,n.recoil-t),n.loaded=n.cooldown===0,n.occupant){const s=i.actors.find(r=>r.id===n.occupant);(!s||s.ko||s.dizzyTime>0||s.knockUp>0||s.catapultId!==n.id)&&(s&&s.catapultId===n.id?Is(i,s):n.occupant=null)}for(const n of i.shells)if(n.age+=t,!(n.age<n.duration)&&(i.events.push({type:"stoneImpact",id:n.id,owner:n.owner,x:n.tx,z:n.tz,radius:ze.blastRadius}),i.phase==="battle"))for(const s of i.actors){const r=s.x-n.tx,o=s.z-n.tz,a=Math.hypot(r,o);if(s.ko||a>ze.blastRadius||!Ns({x:n.tx,z:n.tz},s,0))continue;const l=n.tx-n.startX,c=n.tz-n.startZ,h=Math.hypot(l,c)||1,u=a>1e-6?{dx:r/a,dz:o/a}:{dx:l/h,dz:c/h},d=a<=ze.innerRadius;e(i,s,{owner:n.owner,...u,damage:d?4:2,force:d?12:8,lift:d?ze.centerLift:ze.rimLift,liftDuration:d?ze.centerRecovery:ze.rimRecovery})}i.shells=i.shells.filter(n=>n.age<n.duration)}const an=Object.freeze({radius:.1,muzzleOffset:.8,originHeight:.45,bodyHeight:.95,terrainStep:.12}),zn=1e-9,oo=new WeakMap,H1={ground:()=>0,solids:new Map},Dn=(i,t=0)=>Number.isFinite(i)?i:t,od=(i,t,e)=>Math.max(t,Math.min(e,i)),af=i=>oo.get(i)||H1;function G1(i,{ground:t}={}){return typeof t!="function"?(oo.delete(i),i):(oo.get(i)?.ground!==t&&oo.set(i,{ground:t,solids:new Map}),i)}function Fn(i,t,e){return Dn(af(i).ground(t,e))}function _i(i,t,e,n={x:0,y:0,z:1}){i=Dn(i),t=Dn(t),e=Dn(e);const s=Math.hypot(i,t,e);return s>zn?{x:i/s,y:t/s,z:e/s}:{...n}}function Xc(i,t){return{x:t.x,y:Fn(i,t.x,t.z)+Math.max(0,Dn(t.height))+(t.catapultId?.45:0)+an.originHeight,z:t.z}}function V1(i){return _i(i.aimX,i.aimY,i.aimZ)}function W1(i){return!i.aim3D&&Math.abs(Dn(i.aimY))<zn}const X1=(i,t,e)=>({x:i.x+t.x*e,y:i.y+t.y*e,z:i.z+t.z*e});function q1(i,t,e){let n=0,s=1,r={x:0,y:0,z:0};for(const o of["x","y","z"]){const a=t[o]-i[o],l=e.min[o],c=e.max[o];if(Math.abs(a)<zn){if(i[o]<l||i[o]>c)return null;continue}const h=(l-i[o])/a,u=(c-i[o])/a,d=Math.min(h,u),f=Math.max(h,u);if(d>n&&(n=d,r={x:0,y:0,z:0},r[o]=a>0?-1:1),s=Math.min(s,f),n>s+zn)return null}return s<0||n>1?null:(!r.x&&!r.y&&!r.z&&(r=_i(i.x-t.x,i.y-t.y,i.z-t.z,{x:0,y:1,z:0})),{t:Math.max(0,n),normal:r})}function $1(i,t,e,n,s,r){const o=t.x-i.x,a=t.z-i.z,l=i.x-e.x,c=i.z-e.z,h=o*o+a*a,u=l*l+c*c-n*n;let d=-1/0,f=1/0,m=!1;if(h<zn){if(u>0)return null}else{const v=l*o+c*a,y=v*v-h*u;if(y<0)return null;const _=Math.sqrt(y);d=(-v-_)/h,f=(-v+_)/h}const g=t.y-i.y;if(Math.abs(g)<zn){if(i.y<s||i.y>r)return null}else{const v=(s-i.y)/g,y=(r-i.y)/g,_=Math.min(v,y);_>d&&(d=_,m=!0),f=Math.min(f,Math.max(v,y))}const x=Math.max(0,d);if(x>Math.min(1,f)+zn||f<0)return null;const p=m?{x:0,y:g>0?-1:1,z:0}:_i(i.x+o*x-e.x,0,i.z+a*x-e.z,{x:0,y:1,z:0});return{t:x,normal:p}}function Y1(i,t,e,n){const s=(i.x-e.x)/n.x,r=(i.y-e.y)/n.y,o=(i.z-e.z)/n.z,a=(t.x-i.x)/n.x,l=(t.y-i.y)/n.y,c=(t.z-i.z)/n.z,h=a*a+l*l+c*c,u=s*a+r*l+o*c,d=s*s+r*r+o*o-1;let f=0;if(d>0){if(h<zn)return null;const m=u*u-h*d;if(m<0||(f=(-u-Math.sqrt(m))/h,f<0||f>1))return null}return{t:f,normal:_i((s+a*f)/n.x,(r+l*f)/n.y,(o+c*f)/n.z,{x:0,y:1,z:0})}}function Z1(i,t){const e=af(i);let n=e.solids.get(t);if(n)return n;const s=an.radius;return n={walls:hs.map(r=>{const o=Fn(i,r.x,r.z);return{id:r.id,min:{x:r.x-r.hw-s,y:o-s,z:r.z-r.hd-s},max:{x:r.x+r.hw+s,y:o+r.height+.135+s,z:r.z+r.hd+s}}}),rocks:t.map(r=>({...r,ground:Fn(i,r.x,r.z)}))},e.solids.set(t,n),n}function j1(i,t,e){const n=e.x-t.x,s=e.y-t.y,r=e.z-t.z,o=Math.hypot(n,r),a=u=>t.y+s*u-Fn(i,t.x+n*u,t.z+r*u)-an.radius;let l=0,c=a(0);if(c<=0)return{t:0,normal:Hl(i,t.x,t.z)};if(o<zn){if(s>=0)return null;const u=-c/s;return u<=1?{t:u,normal:Hl(i,t.x,t.z)}:null}const h=Math.max(1,Math.ceil(o/an.terrainStep));for(let u=1;u<=h;u++){const d=u/h,f=a(d);if(f<=0){let m=l,g=d;for(let x=0;x<24;x++){const p=(m+g)/2;a(p)>0?m=p:g=p}return{t:g,normal:Hl(i,t.x+n*g,t.z+r*g)}}l=d,c=f}return null}function Hl(i,t,e){const s=(Fn(i,t+.025,e)-Fn(i,t-.025,e))/.05,r=(Fn(i,t,e+.025)-Fn(i,t,e-.025))/(2*.025);return _i(-s,1,-r)}function K1(i,t,e){if(!Number.isFinite(e))return null;const n=t.x-i.x,s=t.z-i.z,r=n*n+s*s,o=i.x*n+i.z*s,a=i.x*i.x+i.z*i.z-e*e;if(a>zn)return{t:0,normal:_i(-i.x,0,-i.z)};if(r<zn)return null;const l=o*o-r*a;if(l<0)return null;const c=(-o+Math.sqrt(l))/r;return c<0||c>1?null:{t:c,normal:_i(-i.x-n*c,0,-i.z-s*c)}}function lf(i,t,e,{obstacles:n=[],ignoreId:s,hitActors:r=!0,terrain:o=!0,solidFrom:a=0,arenaRadius:l=1/0}={}){a=Math.max(0,Dn(a));const c=Math.hypot(e.x-t.x,e.y-t.y,e.z-t.z),h=od(Dn(a)/Math.max(c,zn),0,1),u={x:t.x+(e.x-t.x)*h,y:t.y+(e.y-t.y)*h,z:t.z+(e.z-t.z)*h};let d=null;const f=(g,x,p={},v=0)=>{if(!g)return;const y=v+g.t*(1-v);y<-zn||y>1+zn||d&&y>=d.t-zn||(d={...g,...p,t:y,kind:x,targetId:p.targetId??null,blocked:x!=="actor"})},m=Z1(i,n);if(a<=c){for(const g of m.walls)f(q1(u,e,g),"wall",{wallId:g.id},h);for(const g of m.rocks)f(Y1(u,e,{x:g.x,y:g.ground+g.r*.9,z:g.z},{x:g.r+an.radius,y:g.r*1.7+an.radius,z:g.r+an.radius}),"rock",{},h)}if(r)for(const g of i.actors){if(g.id===s||g.ko||g.eliminated)continue;const x=Fn(i,g.x,g.z)+Math.max(0,Dn(g.height))+(g.catapultId?.45:0);f($1(t,e,g,1+od(Dn(g.load),0,1)*.2,x-an.radius,x+an.bodyHeight+an.radius),"actor",{targetId:g.id})}return o&&f(j1(i,t,e),"terrain"),f(K1(t,e,l),"boundary"),d?{...d,x:t.x+(e.x-t.x)*d.t,y:t.y+(e.y-t.y)*d.t,z:t.z+(e.z-t.z)*d.t,distance:c*d.t}:null}function J1(i,t,e,n,s={}){const r=_i(e.x,e.y,e.z),o=Math.max(0,Dn(n));return lf(i,t,X1(t,r,o),s)}function vo(i,t,e){const n={x:t.x+t.dx*e,y:Dn(t.y,Fn(i,t.x,t.z)+an.originHeight)+Dn(t.dy)*e,z:t.z+t.dz*e};return t.followGround&&(n.y=Fn(i,n.x,n.z)+Dn(t.heightOffset,an.originHeight)),n}function Sh(i,t,e,n={}){const s={x:t.x,y:Dn(t.y,Fn(i,t.x,t.z)+an.originHeight),z:t.z},r=t.followGround&&oo.has(i)?Math.max(1,Math.ceil(e/.2)):1;let o=s;for(let a=1;a<=r;a++){const l=vo(i,t,e*a/r),c=lf(i,o,l,{...n,terrain:!t.followGround});if(c)return{...c,distance:e*((a-1+c.t)/r)};o=l}return null}function cf(i,t){const e=Xc(i,t),n=V1(t),s=W1(t);return s&&(e.y=Fn(i,t.x,t.z)+an.originHeight),{...e,dx:n.x,dy:n.y,dz:n.z,followGround:s,heightOffset:e.y-Fn(i,t.x,t.z)}}const Gl="4.3.4",aa="frog-arcade-save-v1",la="frog-arcade-settings-v1",At=Object.freeze({radius:25,capacity:60,dizzyHits:6,finishHits:3,dizzySeconds:4.5,tongueRange:3.2,pickupRange:3.2,tongueInterval:.22,kickRange:3.6,kickCooldown:1.1,kickDuration:.48,hopDuration:.3,landingDuration:.035,shotInterval:.14,projectileSpeed:32,projectileLifetime:.65,introSeconds:20,sabotageSeconds:10,sabotageRange:2.4,sabotageRecovery:.55,respawnSeconds:12,revealSeconds:2.5}),fs=Object.freeze([{x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6}]),Cr=Object.freeze([[0,3.5],[-13,8],[13,1],[-12,-11],[10,-14],[2,17]].map(([i,t],e)=>Object.freeze({id:`swarm-${e}`,x:i,z:t,radius:2.1}))),on=(i,t,e)=>Math.max(t,Math.min(e,i)),tn=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),Mi=(i,t)=>{const e=Math.hypot(i,t);return e>1e-6?{x:i/e,z:t/e}:{x:0,z:1}},Fe=(i,t=0)=>Number.isFinite(i)?i:t;function Ni(i){let t=i.seed+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function hf(i,t,e,n=Math.PI){return{id:i,x:t,z:e,aimX:Math.sin(n),aimY:0,aimZ:Math.cos(n),aim3D:!1,aiming:!1,face:n,ammo:At.capacity,load:1,dizzy:0,finishHits:0,dizzyTime:0,ko:!1,eliminated:!1,respawnTime:0,hit:0,invuln:0,shot:0,tongue:0,kick:0,kickCooldown:0,kickPending:!1,impulseX:0,impulseZ:0,hop:0,hopX:0,hopZ:0,hopSpeed:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0,brain:0,decision:0,catapultId:null,catapultShots:0,catapultAim:0,interactHeld:!1,machineTimer:i==="rival-1"?8:12,machineSeeking:!1,aimWindup:0,aiShotReady:0,aiCharging:!1,aiAimX:Math.sin(n),aiAimZ:Math.cos(n),refilling:!1,raidId:null,sabotageId:null,sabotageRecovery:0,revealedTime:0}}function ks(i,t){return i.bases?.find(e=>e.owner===t.id)||null}const gi=i=>Xn.find(t=>t.id===i?.id);function ao(i,t,e){const n=Math.max(1,Math.ceil(Math.hypot(t,e)/.35));for(let s=0;s<n;s++){let{x:r,z:o}=ro(i,t/n,e/n);for(const c of fs){const h=Math.hypot(r-c.x,o-c.z),u=c.r+.78;if(h<u){const d=Mi(r-c.x,o-c.z);r=c.x+d.x*u,o=c.z+d.z*u}}for(const c of bh){if(i.catapultId===c.id)continue;const h=Math.hypot(r-c.x,o-c.z),u=ze.baseRadius+.78;if(h<u){const d=Mi(r-c.x,o-c.z);r=c.x+d.x*u,o=c.z+d.z*u}}({x:r,z:o}=ro(i,r-i.x,o-i.z));const a=Math.hypot(r,o);a>At.radius-1&&(r*=(At.radius-1)/a,o*=(At.radius-1)/a);const l=ro({x:r,z:o},0,0);i.x=l.x,i.z=l.z}}function Q1(i,t,e,n,s,r){const o=e-i,a=n-t,l=i-s.x,c=t-s.z,h=o*o+a*a,u=l*l+c*c-r*r;if(u<=0)return 0;if(h<1e-12)return null;const d=2*(l*o+c*a),f=d*d-4*h*u;if(f<0)return null;const m=(-d-Math.sqrt(f))/(2*h);return m>=0&&m<=1?m:null}function us(i,t){return Ns(i,t,.1)&&fs.every(e=>Q1(i.x,i.z,t.x,t.z,e,e.r+.1)===null)}function t_(i,t){return!t.ko&&!t.eliminated&&tn(i,t)<=23&&us(i,t)&&(!Ga(t)||t.revealedTime>0||tn(i,t)<2.2)}function uf(i,t){const e=Cr[Math.floor(t.id/12)];t.swarmId=e.id;const n=Ni(i)*Math.PI*2,s=Math.sqrt(Ni(i))*e.radius;t.x=e.x+Math.sin(n)*s,t.z=e.z+Math.cos(n)*s,t.wait=0,t.phase=Ni(i)*Math.PI*2}function qc(i=731){const t={version:2,swarmVersion:1,seed:i,time:0,status:"playing",phase:"countdown",intro:At.introSeconds,actors:Xn.map(e=>hf(e.owner,e.spawn.x,e.spawn.z,e.spawnHeading)),bases:Xn.map(e=>({id:e.id,owner:e.owner,x:e.x,z:e.z,destroyed:!1,progress:0,attackerId:null})),flies:[],catapults:k1(),shells:[],bullets:[],events:[],nextId:1,stats:{caught:0,shots:0,hits:0,kos:0,basesDestroyed:0}};for(let e=0;e<72;e++){const n={id:e,swarmId:"",x:0,z:0,wait:0,phase:0};uf(t,n),t.flies.push(n)}return t}function e_(i,t){const e=Math.hypot(i,t);return{x:e>.08?i/Math.max(1,e):0,z:e>.08?t/Math.max(1,e):0,fire:e>=.72}}function $c(i,t){return i.actors.filter(e=>e!==t&&!e.ko&&tn(t,e)<=At.kickRange&&us(t,e)).sort((e,n)=>tn(t,e)-tn(t,n))[0]||null}function n_(i,t){if(t.ko||t.eliminated||t.dizzyTime>0||t.catapultId||t.tongue>0||t.ammo>=At.capacity)return!1;const e=ks(i,t),n=gi(e)?.stock;if(e&&!e.destroyed&&n&&tn(t,n)<=At.pickupRange&&us(t,n))return t.tongue=At.tongueInterval,t.ammo++,i.events.push({type:"tongue",id:t.id,x:n.x,z:n.z,baseId:e.id}),t.id==="player"&&i.stats.caught++,!0;const s=i.flies.filter(r=>r.wait<=0&&tn(t,r)<=At.pickupRange&&us(t,r)).sort((r,o)=>tn(t,r)-tn(t,o))[0];return s?(t.tongue=At.tongueInterval,t.ammo++,s.wait=7+Ni(i)*4,i.events.push({type:"tongue",id:t.id,x:s.x,z:s.z,swarmId:s.swarmId}),t.id==="player"&&i.stats.caught++,!0):!1}function i_(i,t,e,n,s={}){return J1(i,t,e,n,{...s,obstacles:fs})}function s_(i,t,e=At.projectileSpeed*At.projectileLifetime+an.muzzleOffset){const n=cf(i,t),s=Math.max(0,Fe(e)),r=Sh(i,n,s,{obstacles:fs,ignoreId:t.id,hitActors:i.phase==="battle",arenaRadius:At.radius-.2}),o=r||vo(i,n,s),a=r?.distance??s;return{x:o.x,y:o.y,z:o.z,distance:a,targetId:r?.targetId??null,blocked:r?.blocked??!1,kind:r?.kind??null,normal:r?.normal??null,origin:{x:n.x,y:n.y,z:n.z},muzzle:vo(i,n,Math.min(an.muzzleOffset,a)),direction:{x:n.dx,y:n.dy,z:n.dz}}}function df(i,t,e){if(Object.assign(t,{x:e.x,y:e.y,z:e.z,life:0}),e.kind==="actor"){const n=i.actors.find(s=>s.id===e.targetId);n&&wh(i,n,t)}i.events.push({type:"splat",x:t.x,y:t.y,z:t.z,wall:e.kind==="wall"||e.kind==="rock",kind:e.kind,normal:e.normal,dx:t.dx,dy:t.dy,dz:t.dz})}function r_(i,t){if(t.ko||t.eliminated||t.dizzyTime>0||t.hit>0||t.catapultId||t.knockUp>0||t.shot>0||t.ammo<=0||t.id!=="player"&&i.phase!=="battle")return!1;t.shot=At.shotInterval,t.ammo--,t.revealedTime=At.revealSeconds;const e=cf(i,t),n={id:i.nextId++,owner:t.id,...e,life:At.projectileLifetime},s=Sh(i,n,an.muzzleOffset,{obstacles:fs,ignoreId:t.id,hitActors:i.phase==="battle",arenaRadius:At.radius-.2});return s?df(i,n,s):(Object.assign(n,vo(i,n,an.muzzleOffset)),i.bullets.push(n)),i.events.push({type:"shot",id:t.id}),t.id==="player"&&i.stats.shots++,!0}function yo(i,t,e="interrupted"){for(const n of i.bases||[])n.attackerId!==t.id||n.destroyed||(n.progress>0&&i.events.push({type:"sabotageInterrupted",baseId:n.id,id:n.owner,by:t.id,reason:e}),n.progress=0,n.attackerId=null);t.sabotageId=null}function o_(i,t,e){yo(i,t,"knockout"),Is(i,t),t.ko=!0,t.dizzyTime=0,t.hop=0,t.knockUp=0,t.knockUpStart=0,t.height=.9,t.impulseX=e.dx*17,t.impulseZ=e.dz*17,t.ammo=0,t.aiCharging=!1,t.respawnTime=ks(i,t)?.destroyed?0:At.respawnSeconds,i.events.push({type:"ko",id:t.id,by:e.owner,x:t.x,z:t.z,dx:e.dx,dz:e.dz}),e.owner==="player"&&t.id!=="player"&&i.stats.kos++}function wh(i,t,e){if(t.ko||t.eliminated||t.invuln>0)return!1;const n=Math.max(0,t.height),s=Mi(Fe(e.dx),Fe(e.dz)),r=on(Fe(e.force,5),0,30);let o=on(Math.floor(Fe(e.damage,1)),1,9);if(yo(i,t,"hit"),t.sabotageRecovery=At.sabotageRecovery,t.aiCharging=!1,t.aimWindup=0,t.aiShotReady=Math.max(t.aiShotReady,.4),t.hit=.23,t.invuln=.12,t.impulseX=s.x*r,t.impulseZ=s.z*r,t.revealedTime=At.revealSeconds,t.dizzyTime<=0){const a=Math.min(o,At.dizzyHits-t.dizzy);t.dizzy+=a,o-=a,t.dizzy>=At.dizzyHits&&(t.dizzy=At.dizzyHits,t.dizzyTime=At.dizzySeconds,t.finishHits=0,t.hop=0,t.knockUp<=0&&(t.height=0),Is(i,t),i.events.push({type:"dizzy",id:t.id}))}return t.dizzyTime>0&&o>0&&(t.finishHits=Math.min(At.finishHits,t.finishHits+o)),Fe(e.lift)>0&&(Is(i,t),t.knockUpDuration=on(Fe(e.liftDuration,.48),.25,.65),t.knockUp=t.knockUpDuration,t.knockUpPeak=on(e.lift,.1,1.2),t.knockUpStart=n,t.height=n,t.hop=0,t.hopX=t.hopZ=0,t.hopSpeed=0,t.kick=0,t.kickPending=!1),i.events.push({type:"hit",id:t.id,owner:e.owner,x:t.x,z:t.z,...Number.isFinite(e.y)?{y:e.y}:{},dx:s.x,dz:s.z}),e.owner==="player"&&t.id!=="player"&&i.stats.hits++,t.finishHits>=At.finishHits&&o_(i,t,{...e,dx:s.x,dz:s.z}),!0}function a_(i,t){if(i.phase!=="battle"||t.ko||t.eliminated||t.dizzyTime>0||t.hit>0||t.catapultId||t.knockUp>0||t.kick>0||t.kickCooldown>0)return!1;const e=$c(i,t);if(!e)return!1;const n=Mi(e.x-t.x,e.z-t.z);return t.aimX=n.x,t.aimY=0,t.aimZ=n.z,t.aim3D=!1,t.kick=At.kickDuration,t.kickCooldown=At.kickCooldown,t.kickPending=!0,t.kickId=e.id,t.revealedTime=At.revealSeconds,i.events.push({type:"kick",id:t.id}),!0}function l_(i,t){t.kickPending=!1;const e=i.actors.find(s=>s.id===t.kickId);if(!e||e.ko||tn(t,e)>At.kickRange+.25||!us(t,e))return;const n=Mi(e.x-t.x,e.z-t.z);wh(i,e,{owner:t.id,dx:n.x,dz:n.z,damage:1,force:14}),e.ko||(e.impulseX=n.x*14,e.impulseZ=n.z*14)}function Va(i,t){return t.ko||t.eliminated||t.catapultId?null:(i.bases||[]).filter(e=>!e.destroyed&&e.owner!==t.id&&tn(t,gi(e).stock)<=At.sabotageRange&&us(t,gi(e).stock)).sort((e,n)=>tn(t,gi(e).stock)-tn(t,gi(n).stock))[0]||null}function c_(i,t,e){t.destroyed=!0,t.progress=At.sabotageSeconds,t.attackerId=null,e.sabotageId=null;const n=i.actors.find(s=>s.id===t.owner);n&&(yo(i,n,"eliminated"),Is(i,n),n.eliminated=!0,n.ko=!0,n.respawnTime=0,n.ammo=0,n.dizzyTime=0,n.hop=0,n.height=0,n.knockUp=0),e.id==="player"&&i.stats.basesDestroyed++,i.events.push({type:"baseDestroyed",baseId:t.id,id:t.owner,by:e.id,x:t.x,z:t.z})}function h_(i,t,e){for(const n of i.bases){if(n.destroyed)continue;const s=i.actors.filter(l=>t.get(l.id)===n.id&&!l.ko&&!l.eliminated&&l.dizzyTime<=0&&l.hit<=0&&l.sabotageRecovery<=0&&l.knockUp<=0&&l.kick<=0&&l.shot<=0&&l.hop<=0&&Va(i,l)?.id===n.id),r=s.find(l=>l.id===n.attackerId)||s.sort((l,c)=>l.id.localeCompare(c.id))[0];if(!r){if(n.attackerId){const l=i.actors.find(c=>c.id===n.attackerId);l&&yo(i,l,"released")}continue}if(n.attackerId!==r.id){if(n.attackerId){const l=i.actors.find(c=>c.id===n.attackerId);l&&yo(i,l,"interrupted")}n.progress=0,n.attackerId=r.id,r.sabotageId=n.id,i.events.push({type:"sabotageStart",baseId:n.id,id:n.owner,by:r.id})}const o=gi(n).stock,a=Mi(o.x-r.x,o.z-r.z);r.sabotageId=n.id,r.aiming=!1,r.face=Math.atan2(a.x,a.z),r.aimX=a.x,r.aimY=0,r.aimZ=a.z,r.aim3D=!1,r.revealedTime=At.revealSeconds,n.progress=Math.min(At.sabotageSeconds,n.progress+e),n.progress>=At.sabotageSeconds-1e-8&&c_(i,n,r)}}function ca(i,t,e={}){const n=rf(i,t);return{mx:n.x,mz:n.z,aiming:!1,...e}}function dr(i){i.aiCharging=!1,i.aimWindup=0}function Vl(i,t,e){const n=tn(t,e),s=Mi(e.x-t.x,e.z-t.z);t.brain-=1/60,t.brain<=0&&(t.brain=.7+Ni(i)*.5,t.decision=Ni(i)>.5?1:-1);let r=!1;if(n<16&&t.ammo>0&&us(t,e))if(!t.aiCharging&&t.aiShotReady<=0){const l=(Ni(i)-.5)*.08,c=Math.cos(l),h=Math.sin(l);t.aiAimX=s.x*c-s.z*h,t.aiAimZ=s.x*h+s.z*c,t.aimWindup=.32,t.aiCharging=!0}else t.aiCharging&&t.aimWindup<=0&&(r=!0,t.aiCharging=!1,t.aiShotReady=.22+Ni(i)*.1);else dr(t);let o=0,a=0;if(n>11){const l=rf(t,e);o=l.x,a=l.z}else{const l=n<6?-1:0;o=s.x*l+s.z*t.decision*.45,a=s.z*l-s.x*t.decision*.45}return{mx:o,mz:a,aiming:!0,ax:t.aiCharging||r?t.aiAimX:s.x,az:t.aiCharging||r?t.aiAimZ:s.z,fire:r,kick:n<3.3}}function u_(i,t){if(i.phase!=="battle"||t.ko||t.eliminated)return{};if(t.hit>0){dr(t);const h=Mi(t.impulseX,t.impulseZ);return{mx:h.x,mz:h.z,aiming:!1}}const e=ks(i,t),n=gi(e),s=i.actors.filter(h=>h!==t&&t_(t,h)).sort((h,u)=>tn(t,h)-tn(t,u)),r=s[0],o=r?tn(t,r):1/0;if(t.catapultId){if(!r||o<7||t.catapultShots>=2)return t.machineTimer=18,t.machineSeeking=!1,{interactCatapult:!0};const h=i.catapults.find(d=>d.id===t.catapultId),u=Mi(r.x-t.x,r.z-t.z);return{aiming:!0,ax:u.x,az:u.z,throwStone:h?.loaded&&t.catapultAim<=0?{x:r.x,z:r.z}:void 0}}if(t.ammo<6&&(t.refilling=!0),t.ammo>=48&&(t.refilling=!1),t.refilling&&e&&!e.destroyed)return dr(t),tn(t,n.stock)<=At.pickupRange-.35&&us(t,n.stock)?r&&o<5&&t.ammo>0?Vl(i,t,r):{}:ca(t,n.stock);if(e?.attackerId&&e.attackerId!==t.id){const h=s.find(u=>u.id===e.attackerId);return h?Vl(i,t,h):(dr(t),ca(t,n.stock))}if(!i.bases.find(h=>h.id===t.raidId&&!h.destroyed&&h.owner!==t.id)){const h=i.bases.filter(d=>!d.destroyed&&d.owner!==t.id),u=t.id==="rival-1"?"rival-2":"player";t.raidId=(h.find(d=>d.owner===u)||h[0])?.id||null}const l=i.bases.find(h=>h.id===t.raidId),c=gi(l)?.stock;if(l&&tn(t,c)<=At.sabotageRange-.2&&(t.sabotageId===l.id||!r||o>6.5))return dr(t),t.machineSeeking=!1,{sabotage:!0,aiming:!1};if(r&&o<16){const h=i.catapults.find(u=>u.owner===t.id&&!u.occupant);if(t.machineTimer<=0&&!t.machineSeeking&&(t.machineSeeking=!!h&&o>11&&Ni(i)<.35,t.machineTimer=8),t.machineSeeking&&h)if(o<7)t.machineSeeking=!1,t.machineTimer=12;else return ca(t,{x:h.x,z:h.z+2.2},{interactCatapult:tn(t,h)<=ze.interactionRange&&Ns(t,h)});return Vl(i,t,r)}return dr(t),c?ca(t,c):{}}function d_(i,t){const e=ks(i,t),n=gi(e);if(!e||e.destroyed||!n)return;const s=hf(t.id,n.spawn.x,n.spawn.z,n.spawnHeading);Object.assign(t,s,{invuln:1}),i.events.push({type:"respawn",id:t.id,x:t.x,z:t.z})}function ff(i){const t=i.bases.find(n=>n.owner==="player"),e=i.bases.filter(n=>!n.destroyed);t?.destroyed?i.status="lost":e.length===1&&e[0].owner==="player"&&(i.status="won")}function ad(i,t={},e=1/60){if(i.status!=="playing"||(i.events.length=0,e=on(Fe(e),0,.05),e===0))return;i.time+=e,i.phase==="countdown"&&(i.intro=Math.max(0,i.intro-e),i.intro<1e-8&&(i.intro=0,i.phase="battle",i.events.push({type:"battle"})));for(const s of i.flies)s.wait>0&&(s.wait-=e,s.wait<=0&&uf(i,s));const n=new Map;for(const s of i.actors){for(const u of["shot","tongue","invuln","hit","idle","kickCooldown","aimWindup","aiShotReady","catapultAim","sabotageRecovery","revealedTime"])s[u]=Math.max(0,s[u]-e);if(i.phase==="battle"&&(s.machineTimer=Math.max(0,s.machineTimer-e)),s.ko){Is(i,s),ao(s,s.impulseX*e,s.impulseZ*e),s.impulseX*=Math.exp(-e*3),s.impulseZ*=Math.exp(-e*3),s.height=Math.max(0,s.height-e*1.6),!s.eliminated&&!ks(i,s)?.destroyed&&(s.respawnTime=Math.max(0,s.respawnTime-e),s.respawnTime<1e-8&&d_(i,s));continue}s.kick>0&&(s.kick=Math.max(0,s.kick-e),s.kickPending&&s.kick<.3&&l_(i,s)),s.dizzyTime>0&&(s.dizzyTime=Math.max(0,s.dizzyTime-e),s.dizzyTime===0&&(s.dizzy=0,s.finishHits=0,s.invuln=.55,i.events.push({type:"recover",id:s.id})));const r=s.id==="player"?t:u_(i,s);r.interactCatapult&&!s.interactHeld&&F1(i,s),s.interactHeld=!!r.interactCatapult;const o=s.catapultId?0:Fe(r.mx),a=s.catapultId?0:Fe(r.mz),l=Math.hypot(o,a),c=l>.08&&s.knockUp<=0,h=Number.isFinite(r.ax)&&Number.isFinite(r.az)&&Math.hypot(r.ax,Fe(r.ay),r.az)>.05;if(s.aiming=r.aiming===void 0?h:r.aiming===!0,s.aiming&&h){const u=_i(r.ax,Fe(r.ay),r.az);s.aimX=u.x,s.aimY=u.y,s.aimZ=u.z,s.aim3D=Number.isFinite(r.ay)}if(c&&(s.face=Math.atan2(o,a),!s.aiming&&s.kick<=0)){const u=Mi(o,a);s.aimX=u.x,s.aimY=0,s.aimZ=u.z,s.aim3D=!1}if(i.phase==="battle"&&r.sabotage&&!c&&!r.fire&&!r.kick&&!r.throwStone){const u=Va(i,s);u&&n.set(s.id,u.id)}if(s.dizzyTime<=0){if(n_(i,s),r.fire&&r_(i,s),r.kick&&a_(i,s),r.throwStone&&O1(i,s,r.throwStone),s.catapultId){const u=i.catapults.find(d=>d.id===s.catapultId);u&&(u.aimX=s.aimX,u.aimZ=s.aimZ,s.x=u.x,s.z=u.z,s.impulseX=s.impulseZ=0)}if(s.knockUp<=0&&s.hop<=0&&s.idle<=0&&c&&(s.hop=At.hopDuration,s.hopSpeed=on(l,0,1)),s.knockUp<=0&&s.hop>0){s.hop=Math.max(0,s.hop-e);const u=(s.id==="player"?8.8:6.2)*R1(s),d=c?u/Math.max(1,l):0;s.hopX=o*d,s.hopZ=a*d,ao(s,s.hopX*e,s.hopZ*e),s.height=Math.sin((1-s.hop/At.hopDuration)*Math.PI)*(.35+.32*s.hopSpeed),s.hop===0&&(s.height=0,s.hopX=0,s.hopZ=0,s.idle=At.landingDuration,i.events.push({type:"land",id:s.id,x:s.x,z:s.z}))}}if(ao(s,s.impulseX*e,s.impulseZ*e),s.impulseX*=Math.exp(-e*10),s.impulseZ*=Math.exp(-e*10),s.knockUp>0){s.knockUp=Math.max(0,s.knockUp-e);const u=1-s.knockUp/s.knockUpDuration;s.height=s.knockUpStart*(1-u)+Math.sin(u*Math.PI)*s.knockUpPeak,s.knockUp===0&&(s.height=0,s.knockUpStart=0,s.idle=At.landingDuration,i.events.push({type:"land",id:s.id,x:s.x,z:s.z,stone:!0,strength:s.knockUpPeak}))}s.load+=(s.ammo/At.capacity-s.load)*(1-Math.exp(-e*12))}for(const s of i.bullets){const r=Math.min(e,Math.max(0,s.life));if(s.life-=e,r<=0)continue;const o=At.projectileSpeed*r,a=Sh(i,s,o,{obstacles:fs,ignoreId:s.owner,hitActors:i.phase==="battle",arenaRadius:At.radius-.2});a?df(i,s,a):Object.assign(s,vo(i,s,o))}i.bullets=i.bullets.filter(s=>s.life>0),B1(i,e,wh),h_(i,n,e),ff(i)}function f_(i){return JSON.stringify({...i,events:[],bullets:[],shells:[]})}function p_(i){try{const t=JSON.parse(i);if(![1,2].includes(t?.version)||!Array.isArray(t.actors)||t.actors.length!==3||!Array.isArray(t.flies)||t.flies.length!==72||!["playing","won","lost"].includes(t.status))return null;const e=t.version===1,n=qc(Fe(t.seed,731));if(n.time=on(Fe(t.time),0,1e7),n.nextId=on(Math.floor(Fe(t.nextId,1)),1,1e9),n.intro=e?At.introSeconds:on(Fe(t.intro,At.introSeconds),0,At.introSeconds),n.phase=!e&&(t.phase==="battle"||n.intro===0)?"battle":"countdown",!e){if(!Array.isArray(t.bases)||t.bases.length!==Xn.length)return null;for(const s of n.bases){const r=t.bases.find(o=>o?.id===s.id&&o?.owner===s.owner);if(!r)return null;s.destroyed=r.destroyed===!0,s.progress=s.destroyed?At.sabotageSeconds:0}}for(let s=0;s<3;s++){const r=t.actors[s],o=n.actors[s];if(r?.id!==o.id||!Number.isFinite(r.x)||!Number.isFinite(r.z))return null;for(const u of Object.keys(o))typeof o[u]=="number"&&(o[u]=on(Fe(r[u],o[u]),-1e4,1e4));const a=ks(n,o),l=a.destroyed,c=l||r.ko===!0;Object.assign(o,{ko:c,eliminated:l,respawnTime:c&&!l?on(Fe(r.respawnTime,At.respawnSeconds)||At.respawnSeconds,.01,At.respawnSeconds):0,aiming:!1,catapultId:null,interactHeld:!1,machineSeeking:!1,aiCharging:!1,aimWindup:0,refilling:r.refilling===!0||Fe(r.ammo)<6,raidId:null,sabotageId:null,sabotageRecovery:0,revealedTime:0,ammo:l?0:on(Math.floor(Fe(r.ammo)),0,At.capacity),load:on(Fe(r.load),0,1),dizzy:on(Fe(r.dizzy),0,At.dizzyHits),finishHits:on(Fe(r.finishHits),0,At.finishHits),dizzyTime:on(Fe(r.dizzyTime),0,At.dizzySeconds),kickPending:!1,kick:0,hop:0,hopX:0,hopZ:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0,impulseX:0,impulseZ:0});for(const u of["shot","tongue","invuln","hit","kickCooldown","aiShotReady"])o[u]=on(o[u],0,2);o.machineTimer=on(o.machineTimer,0,30),o.face=Fe(o.face,Math.PI),o.aim3D=r.aim3D===!0||Math.abs(Fe(r.aimY))>1e-9;const h=_i(o.aimX,o.aim3D?o.aimY:0,o.aimZ,{x:Math.sin(o.face),y:0,z:Math.cos(o.face)});if(o.aimX=h.x,o.aimY=h.y,o.aimZ=h.z,e){const u=gi(a);Object.assign(o,{x:u.spawn.x,z:u.spawn.z,face:u.spawnHeading,aimX:Math.sin(u.spawnHeading),aimY:0,aimZ:Math.cos(u.spawnHeading),aim3D:!1})}ao(o,0,0)}for(let s=0;s<72;s++){const r=t.flies[s],o=Cr[Math.floor(s/12)];r&&(t.swarmVersion===1&&r.swarmId===o.id&&Number.isFinite(r.x)&&Number.isFinite(r.z)&&tn(r,o)<=o.radius+.001&&Object.assign(n.flies[s],{x:r.x,z:r.z,phase:Fe(r.phase)}),n.flies[s].wait=on(Fe(r.wait),0,12))}if(Array.isArray(t.catapults))for(const s of n.catapults){const r=t.catapults.find(a=>a.id===s.id);r&&(s.cooldown=on(Fe(r.cooldown),0,ze.cooldown),s.loaded=s.cooldown===0);const o=!e&&t.actors.find(a=>a.catapultId===s.id);if(o){const a=n.actors.find(l=>l.id===o.id);a.x=s.x,a.z=s.z+2.3,ao(a,0,0)}}for(const s of Object.keys(n.stats))n.stats[s]=Math.max(0,Math.floor(Fe(t.stats?.[s])));return ff(n),n}catch{return null}}function m_(i){const t=i.aiming||i.shot>.02||i.kick>0,e=Math.hypot(i.aimX,i.aimZ);if((t||!Number.isFinite(i.face))&&Number.isFinite(e)&&e>1e-6)return{x:i.aimX/e,z:i.aimZ/e};const n=Number.isFinite(i.face)?i.face:Math.PI;return{x:Math.sin(n),z:Math.cos(n)}}const kn=Object.freeze({yaw:Math.PI,pitch:.44,minPitch:.18,maxPitch:1.05,sensitivity:.005}),br=Object.freeze({min:.7,max:1.5,default:1});function g_(i,t,e){const n=(Number.isFinite(i?.yaw)?i.yaw:kn.yaw)-(Number.isFinite(t)?t:0)*kn.sensitivity,s=(Number.isFinite(i?.pitch)?i.pitch:kn.pitch)+(Number.isFinite(e)?e:0)*kn.sensitivity;return{yaw:Math.atan2(Math.sin(n),Math.cos(n)),pitch:Math.max(kn.minPitch,Math.min(kn.maxPitch,s))}}function pf(i,t,e=1.6,n="chase3d",s=kn){const r=Number.isFinite(e)&&e>0?e:1.6,o=Number.isFinite(s?.zoom)?Math.max(br.min,Math.min(br.max,s.zoom)):br.default;if(n==="overview"){const g=Math.max(.86,Math.min(1.6,Math.sqrt(1.2/r)));return{look:[i.x,t+1.2,i.z],position:[i.x,t+1.2+(26*g-1.2)/o,i.z+19*g/o]}}const a=Number.isFinite(s?.yaw)?s.yaw:kn.yaw,l=Math.max(kn.minPitch,Math.min(kn.maxPitch,Number.isFinite(s?.pitch)?s.pitch:kn.pitch)),c={x:Math.sin(a),z:Math.cos(a)},u=12.6*Math.max(1,Math.min(1.42,.72/r))/o,d=u*Math.cos(l),f=i.x+c.x*.9,m=i.z+c.z*.9;return{look:[f,t+1.2,m],position:[f-c.x*d,t+1.2+u*Math.sin(l),m-c.z*d]}}function x_(i,t){const e=t.x-i.x,n=t.z-i.z,s=Math.hypot(e,n),r=Number.isFinite(s)&&s>1e-6?e/s:0,o=Number.isFinite(s)&&s>1e-6?n/s:-1;return{camera:{x:0,z:0},focus:{x:r,z:o}}}function lo(i,t,e,n){const s=n.x-e.x,r=n.z-e.z,o=Math.hypot(s,r),a=o>1e-6?s/o:0,l=o>1e-6?r/o:-1,c=Number.isFinite(i)?i:0,h=Number.isFinite(t)?t:0;return{x:-l*c-a*h,z:a*c-l*h}}const Wl=["#d2ff70","#ff765d","#d7a0ff"],v_=new Map(Cr.map((i,t)=>[i.id,t])),ld=new WeakMap;function mf(i){let t=ld.get(i);t||(t=Cr.map(e=>({swarm:e,available:0,next:1/0})),ld.set(i,t));for(const e of t)e.available=0,e.next=1/0;for(const e of i.flies){const n=t[v_.get(e.swarmId)];n&&(e.wait<=0?n.available++:n.next=Math.min(n.next,e.wait))}return t}function gf(i,t,e,n,s){i.fillStyle=s?"#dceee6":"#718781",i.beginPath(),i.ellipse(t-n*.5,e-n*.28,n*.6,n*.32,-.5,0,Math.PI*2),i.ellipse(t+n*.5,e-n*.28,n*.6,n*.32,.5,0,Math.PI*2),i.fill(),i.fillStyle=s?"#384c4c":"#536763",i.strokeStyle=s?"#b6d1c3":"#8ca09a",i.lineWidth=1.4,i.beginPath(),i.ellipse(t,e+n*.12,n*.34,n*.56,0,0,Math.PI*2),i.fill(),i.stroke()}function y_(i,t){if(!t)return;const e=t.getContext("2d");if(!e)return;const n=t.width,s=n/2,r=n*.43,o=r/At.radius;e.clearRect(0,0,n,n),e.save(),e.translate(s,s),e.fillStyle="#153e3af2",e.strokeStyle="#9bd1be",e.lineWidth=4,e.beginPath(),e.arc(0,0,r,0,Math.PI*2),e.fill(),e.stroke(),e.clip();const a=i.focus.x-i.camera.position.x,l=i.focus.z-i.camera.position.z,c=Math.hypot(a,l),h=c>1e-6?a/c:0,u=c>1e-6?l/c:-1,d=(f,m)=>({x:(-u*f+h*m)*o,y:-(h*f+u*m)*o});e.strokeStyle="#ffffff17",e.lineWidth=1;for(let f=-20;f<=20;f+=10){const m=d(f,-25),g=d(f,25),x=d(-25,f),p=d(25,f);e.beginPath(),e.moveTo(m.x,m.y),e.lineTo(g.x,g.y),e.moveTo(x.x,x.y),e.lineTo(p.x,p.y),e.stroke()}for(const f of fs){const m=d(f.x,f.z);e.fillStyle="#769084",e.beginPath(),e.arc(m.x,m.y,f.r*o,0,Math.PI*2),e.fill()}for(const f of _h){const m=d(f.x,f.z);e.fillStyle="#517d4788",e.beginPath(),e.arc(m.x,m.y,f.radius*o,0,Math.PI*2),e.fill()}for(const f of hs){const m=[d(f.x-f.hw,f.z-f.hd),d(f.x+f.hw,f.z-f.hd),d(f.x+f.hw,f.z+f.hd),d(f.x-f.hw,f.z+f.hd)];e.fillStyle="#c4b492",e.beginPath(),e.moveTo(m[0].x,m[0].y);for(const g of m.slice(1))e.lineTo(g.x,g.y);e.closePath(),e.fill()}for(const f of Oa){const m=d(f.x,f.z);e.strokeStyle="#bfd6d0",e.lineWidth=2,e.beginPath(),e.moveTo(m.x-3,m.y+3),e.lineTo(m.x,m.y-4),e.lineTo(m.x+4,m.y+3),e.moveTo(m.x,m.y-1),e.lineTo(m.x+4,m.y-6),e.stroke()}for(const[f,m]of Xn.entries()){const g=i.state.bases?.find(p=>p.id===m.id),x=d(m.stock.x,m.stock.z);if(m.owner==="player"&&g?.attackerId&&!g.destroyed){const p=.5+.5*Math.sin((i.elapsed||0)*4);e.strokeStyle="#ff9a6a",e.lineWidth=3+p,e.beginPath(),e.arc(x.x,x.y,13+p*3,0,Math.PI*2),e.stroke()}e.fillStyle=g?.destroyed?"#4f6258":g?.attackerId?"#ffce77":Wl[f],e.strokeStyle="#092b22",e.lineWidth=2,e.beginPath(),e.moveTo(x.x-7,x.y-2),e.lineTo(x.x,x.y-8),e.lineTo(x.x+7,x.y-2),e.lineTo(x.x+7,x.y+7),e.lineTo(x.x-7,x.y+7),e.closePath(),e.fill(),e.stroke(),g?.destroyed&&(e.strokeStyle="#b7c7ba",e.beginPath(),e.moveTo(x.x-5,x.y-5),e.lineTo(x.x+5,x.y+5),e.moveTo(x.x+5,x.y-5),e.lineTo(x.x-5,x.y+5),e.stroke())}for(const f of mf(i.state)){const m=d(f.swarm.x,f.swarm.z),g=f.available>0;e.strokeStyle=g?"#b8daa7":"#6a827b",e.lineWidth=g?1.8:1.2,e.beginPath(),e.arc(m.x,m.y,9,0,Math.PI*2),e.stroke(),gf(e,m.x,m.y,6,g)}i.state.actors.forEach((f,m)=>{if(f.ko||f.eliminated)return;const g=i.state.actors[0];if(m>0&&Ga(f)&&f.revealedTime<=0&&Math.hypot(f.x-g.x,f.z-g.z)>2.2)return;const x=d(f.x,f.z);if(e.fillStyle=Wl[m],e.strokeStyle="#102923",e.lineWidth=3,e.beginPath(),e.arc(x.x,x.y,m===0?9:8,0,Math.PI*2),e.fill(),e.stroke(),m===0){const p=d(f.aimX*2.7,f.aimZ*2.7);e.strokeStyle=Wl[0],e.lineWidth=4,e.beginPath(),e.moveTo(x.x,x.y),e.lineTo(x.x+p.x,x.y+p.y),e.stroke()}else e.fillStyle="#102923",e.beginPath(),e.arc(x.x-3,x.y-2,1.6,0,Math.PI*2),e.arc(x.x+3,x.y-2,1.6,0,Math.PI*2),e.fill()}),e.restore(),e.fillStyle="#f2ffe1",e.font="bold 18px sans-serif",e.textAlign="center",e.fillText("ΒΑΣΕΙΣ • ΜΥΓΕΣ • ΚΑΛΥΨΗ",s,n-5)}function __(i,t){const e=i.state.actors[0];if(e.ko||e.ammo>=At.capacity)return;const n=Xn.find(v=>v.owner===e.id),s=i.state.bases?.find(v=>v.owner===e.id);if(n&&s&&!s.destroyed&&Math.hypot(e.x-n.stock.x,e.z-n.stock.z)<=At.pickupRange&&Ns(e,n.stock))return;let r=null,o=null,a=1/0,l=1/0;for(const v of mf(i.state)){const y=Math.hypot(v.swarm.x-e.x,v.swarm.z-e.z);y<a&&(r=v,a=y),v.available>0&&y<l&&(o=v,l=y)}const h=r&&r.available===0&&a<=r.swarm.radius+At.pickupRange+.5?r:o;if(!h)return;const u=h.swarm,d=i.project(u.x,i.ground(u.x,u.z)+.35,u.z),f=i.touch&&i.h>i.w?240:110,m=i.touch?Math.min(165,i.h*.3):65;if(!d.visible||d.x<72||d.x>i.w-72||d.y<f||d.y>i.h-m)return;t.save(),t.font="700 12px sans-serif",t.textAlign="left",t.lineJoin="round";const g=h.available>0?`Μύγες · ${h.available}`:`Ξανά σε ${Math.max(1,Math.ceil(h.next))}″`,x=t.measureText(g).width+22,p=d.x-x/2;gf(t,p+7,d.y+8,6,h.available>0),t.strokeStyle="#18352de6",t.lineWidth=3,t.strokeText(g,p+20,d.y+12),t.fillStyle=h.available>0?"#e8f4d5":"#c1d0c9",t.fillText(g,p+20,d.y+12),t.restore()}function M_(i,t,e){return s_(i,t,e)}const b_=new L(0,1,0),S_=Math.PI*2,Xl=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),ha=(i,t,e)=>i+(t-i)*e,ua=["#b8e76c","#ef886a","#be94e0"],w_=.45;class E_{constructor(t){this.game=t,this.scene=t.scene,this.clock=0,this.machines=new Map,this.platforms=new Map,this.shellMeshes=new Map,this.dummy=new Xe,this._vector=new L,this._direction=new L,this.geometry={box:new Bi(1,1,1),cylinder:new Us(.5,.5,1,8),rock:new Ua(.4,0),leaf:new Jn(1,10,5),cup:new Jn(.38,10,6,0,S_,Math.PI/2,Math.PI/2),ring:new rs(.94,1,48),disc:new La(1,32),rope:new mh(.14,.027,5,10)},this.material={wood:new yn({color:"#a47746"}),lightWood:new yn({color:"#d4ac64"}),darkWood:new yn({color:"#67503c"}),rope:new yn({color:"#d3c593"}),leaf:new yn({color:"#5c9b67"}),stone:new yn({color:"#90999b",emissive:"#172023",emissiveIntensity:.16}),preview:new Wd({color:"#e6f7a1",dashSize:.45,gapSize:.25,transparent:!0,opacity:.85,depthWrite:!1}),landing:new _n({color:"#d6ed8b",transparent:!0,opacity:.72,side:Pe,depthWrite:!1})},this.material.ramp=new yn({color:"#b18b59",side:Pe});for(const[s,r]of bh.entries()){const o=this.createPlatform(r);o&&this.platforms.set(r.id,o),this.machines.set(r.id,this.createMachine(r,s))}const e=new Float32Array(99),n=new we;n.setAttribute("position",new un(e,3)),this.previewLine=new go(n,this.material.preview),this.previewLine.name="catapult-trajectory-preview",this.previewLine.frustumCulled=!1,this.previewLine.visible=!1,this.scene.add(this.previewLine),this.landingMarker=new Zt(this.geometry.ring,this.material.landing),this.landingMarker.name="catapult-landing-preview",this.landingMarker.rotation.x=-Math.PI/2,this.landingMarker.scale.setScalar(ze.blastRadius),this.landingMarker.visible=!1,this.scene.add(this.landingMarker)}ground(t,e){return this.game.ground(t,e)}mesh(t,e,n,s=[0,0,0],r=[1,1,1]){const o=new Zt(e,n);return o.position.fromArray(s),o.scale.fromArray(r),t.add(o),o}createPlatform(t){const e=this.game.houseFloors?.find(d=>d.id===t.enclosureId);if(!e)return null;const n=new te;n.name=`${t.id}-level-platform`,n.position.set(e.x,e.height,e.z),this.scene.add(n);const s=this.mesh(n,this.geometry.box,this.material.darkWood,[0,-.1,0],[e.halfWidth*2,.2,e.halfDepth*2]);s.name="catapult-floor-at-operator-height";const r=[],o=[];for(let d=-e.halfDepth+.2;d<e.halfDepth;d+=.4){const f=this.geometry.box.clone();f.scale(e.halfWidth*2-.06,.025,.355),f.translate(0,-.012,Math.min(d,e.halfDepth-.2)),r.push(f)}for(const d of[-e.halfWidth+.18,e.halfWidth-.18])for(const f of[-e.halfDepth+.18,e.halfDepth-.18]){const m=this.game.world?.getSurface(e.x+d,e.z+f).height??e.minimum,g=Math.max(.2,e.height-m),x=this.geometry.box.clone();x.scale(.3,g,.3),x.translate(d,-g*.5,f),o.push(x)}for(const[d,f]of[[r,this.material.lightWood],[o,this.material.darkWood]]){const m=Li(d);for(const x of d)x.dispose();const g=this.mesh(n,m,f);g.userData.ownedGeometry=!0}const a=e.ramp,l=[],c=[];for(let d=0;d<=a.rows;d++)for(let f=0;f<=a.cols;f++){const m=d/a.rows*a.length,g=(f/a.cols*2-1)*a.halfWidth;l.push(a.x+a.dx*m+a.rightX*g-e.x,a.heights[d*(a.cols+1)+f]-e.height,a.z+a.dz*m+a.rightZ*g-e.z)}for(let d=0;d<a.rows;d++)for(let f=0;f<a.cols;f++){const m=d*(a.cols+1)+f,g=m+1,x=m+a.cols+1,p=x+1;c.push(m,x,g,g,x,p)}const h=new we;h.setAttribute("position",new Gt(l,3)),h.setIndex(c),h.computeVertexNormals();const u=this.mesh(n,h,this.material.ramp);return u.name=`${t.id}-walkable-entrance-ramp`,u.userData.ownedGeometry=!0,{group:n,deck:s,ramp:u,floor:e}}createMachine(t,e){const n=new te;n.name=t.id,n.position.set(t.x,this.ground(t.x,t.z),t.z),this.scene.add(n);const s=new te;s.name="wooden-catapult-frame",n.add(s);const r={wood:[],lightWood:[],darkWood:[],rope:[]},o=(y,_,T,A,E,R,S)=>{const b=this.geometry.box.clone();b.scale(E,R,S),b.translate(_,T,A),r[y].push(b)},a=(y,_,T,A)=>{const E=new L(..._),R=new L(...T),S=R.clone().sub(E),b=this.geometry.cylinder.clone();b.scale(A,S.length(),A),b.applyQuaternion(new ls().setFromUnitVectors(b_,S.normalize())),b.translate(...E.add(R).multiplyScalar(.5).toArray()),r[y].push(b)};for(const y of[-1,1])o("wood",y*.82,.18,.6,.26,.28,2.65);for(const y of[-.55,.12,.83,1.68])o("lightWood",0,.29,y,1.98,.14,.22);o("darkWood",0,.34,-.03,1.2,.14,.93);for(const y of[-1,1])a("wood",[y*.76,.3,.1],[y*.76,.99,1],.17),a("wood",[y*.76,.3,1.83],[y*.76,.99,1],.17),a("rope",[y*.77,.48,.35],[y*.77,.58,.47],.21),a("rope",[y*.77,.48,1.61],[y*.77,.58,1.49],.21);a("darkWood",[-.94,.85,1],[.94,.85,1],.22),o("lightWood",0,.52,1.66,1.72,.17,.17);for(const[y,_]of Object.entries(r)){if(!_.length)continue;const T=Li(_);for(const E of _)E.dispose();const A=this.mesh(s,T,this.material[y]);A.userData.ownedGeometry=!0}const l=this.mesh(s,this.geometry.leaf,this.material.leaf,[0,.41,-.04],[.59,.065,.48]);l.name="operator-seat";const c=new yn({color:ua[e%ua.length]}),h=this.mesh(s,this.geometry.leaf,c,[-.98,.64,1.65],[.13,.45,.3]);h.rotation.z=-.3,h.name="side-leaf";const u=new te;u.name="throwing-arm",u.position.set(0,.85,1),s.add(u),this.mesh(u,this.geometry.box,this.material.lightWood,[0,.07,0],[.18,1.2,.2]),this.mesh(u,this.geometry.box,this.material.darkWood,[0,-.48,0],[.43,.27,.37]);const d=this.mesh(u,this.geometry.cup,this.material.darkWood,[0,.57,0],[1.1,.72,1.3]);d.name="stone-cup";const f=this.mesh(u,this.geometry.rock,this.material.stone,[0,.75,0],[.78,.7,.8]);f.name="loaded-catapult-stone",u.rotation.x=-.45;const m=new te;m.name="reload-winch",m.position.set(0,.61,.53),s.add(m);const g=this.mesh(m,this.geometry.cylinder,this.material.darkWood,[0,0,0],[.13,1.37,.13]);g.rotation.z=Math.PI/2;for(const y of[-1,1]){const _=this.mesh(m,this.geometry.box,this.material.lightWood,[y*.47,.12,0],[.13,.35,.12]);_.name="operator-handle";const T=this.mesh(s,this.geometry.rope,this.material.rope,[y*.76,.85,1],[1,1,1]);T.rotation.y=Math.PI/2}const x=[];for(let y=0;y<2;y++){const _=this.mesh(s,this.geometry.rock,this.material.stone,[1.17,.29,.72+y*.64],[.65,.6,.68]);_.rotation.set(y*.7,.6+y,0),x.push(_)}const p=new _n({color:ua[e%ua.length],transparent:!0,opacity:.25,side:Pe,depthWrite:!1}),v=this.mesh(n,this.geometry.ring,p,[0,.045,.4],[1.65,1.65,1.65]);return v.rotation.x=-Math.PI/2,v.name="catapult-station-ring",{group:n,turret:s,arm:u,winch:m,loadedRock:f,pile:x,ring:v,factionMaterial:c,ringMaterial:p,definition:t,launchAge:1/0,yaw:Math.PI}}operatorPose(t){const e=this.machines.get(typeof t=="string"?t:t?.id);if(!e)return null;const n=this.game.state.catapults?.find(s=>s.id===e.definition.id);return{x:e.definition.x,y:this.ground(e.definition.x,e.definition.z)+w_,z:e.definition.z,yaw:n?Math.atan2(n.aimX,n.aimZ):e.yaw}}consumeEvent(t){if(t.type==="stoneShot"){const e=this.machines.get(t.catapultId);e&&(e.launchAge=0,e.arm.rotation.x=0,e.loadedRock.visible=!1)}}shellPoint(t,e,n=this._vector){const s=ha(t.startX,t.tx,e),r=ha(t.startZ,t.tz,e),o=this.ground(t.startX,t.startZ)+(t.startHeight??1.6),a=this.ground(t.tx,t.tz)+.12;return n.set(s,ha(o,a,e)+4*t.arcHeight*e*(1-e),r)}createShell(t){const e=this.mesh(this.scene,this.geometry.rock,this.material.stone,void 0,[1.05,.95,1.14]);e.name=`catapult-stone-${t.id}`;const n=new _n({color:t.owner==="player"?"#e4c36e":"#f17e62",transparent:!0,opacity:.45,side:Pe,depthWrite:!1}),s=this.mesh(this.scene,this.geometry.ring,n,[t.tx,this.ground(t.tx,t.tz)+.055,t.tz],[ze.blastRadius,ze.blastRadius,ze.blastRadius]);s.rotation.x=-Math.PI/2,s.name=`catapult-danger-${t.id}`;const r=this.mesh(this.scene,this.geometry.disc,n,[t.tx,this.ground(t.tx,t.tz)+.05,t.tz],[.13,.13,.13]);return r.rotation.x=-Math.PI/2,{stone:e,ring:s,core:r,material:n}}updatePreview(){const t=this.game.state,e=t.actors[0],n=this.game.catapultAim,s=t.catapults?.find(m=>m.id===e.catapultId&&m.occupant===e.id),r=n?.target,o=this.game.running&&n?.active&&s&&r&&Number.isFinite(r.x)&&Number.isFinite(r.z)&&!e.ko&&e.dizzyTime<=0;if(this.previewLine.visible=!!o,this.landingMarker.visible=!!o,!o)return;const a=r.x-s.x,l=r.z-s.z,c=Math.hypot(a,l)||1,h={startX:s.x+a/c,startZ:s.z+l/c,startHeight:1.6,tx:r.x,tz:r.z,arcHeight:ze.arcHeight},u=this.previewLine.geometry.attributes.position;for(let m=0;m<u.count;m++){const g=this.shellPoint(h,m/(u.count-1));u.setXYZ(m,g.x,g.y,g.z)}u.needsUpdate=!0,this.previewLine.computeLineDistances(),this.landingMarker.position.set(r.x,this.ground(r.x,r.z)+.065,r.z),this.landingMarker.scale.setScalar(ze.blastRadius);const d=s.loaded&&s.cooldown<=0,f=r.valid===!1;this.material.preview.color.set(f?"#ef826d":d?"#e6f7a1":"#b7bfaf"),this.material.landing.color.set(f?"#ef826d":d?"#d6ed8b":"#b7bfaf")}poseOperator(t,e,n){const s=this.game.state.actors.findIndex(c=>c.id===t.id),r=this.game.models?.[s];if(!r?.bones||t.ko)return;const o=r.bones,a=n.cooldown>0,l=a?Math.sin(this.clock*9)*.13:0;for(const c of[-1,1]){const h=o[`shoulder${c}`],u=o[`elbow${c}`],d=o[`wrist${c}`];h&&(h.rotation.x=-.53-l*c,h.rotation.z=c*.08),u&&(u.rotation.x=.45+l*c),d&&(d.rotation.x=-.18)}o.spine&&(o.spine.rotation.x=.08+Math.abs(l)*.12),o.head&&(o.head.rotation.x=-.04)}update(t=0){const e=this.game.running?Math.max(0,Math.min(.1,t)):0;this.clock+=e;const n=this.game.state;for(const s of n.catapults||[]){const r=this.machines.get(s.id);if(!r)continue;r.group.position.y=this.ground(s.x,s.z);const o=Math.atan2(s.aimX,s.aimZ);r.yaw=o,r.turret.rotation.y=o,Number.isFinite(r.launchAge)&&(r.launchAge+=e);const a=this.game.catapultAim;let c=s.occupant==="player"&&a?.active?-.74:-.45;if(s.cooldown>0){const u=1-Xl(s.cooldown/(ze.cooldown||3));c=ha(.6,-.45,u*u),r.winch.rotation.x=this.clock*7}else r.winch.rotation.x=0;r.launchAge<.18&&(c=.6*Math.sin(Xl(r.launchAge/.09)*Math.PI/2)),r.arm.rotation.x+=(c-r.arm.rotation.x)*(1-Math.exp(-e*18)),r.loadedRock.visible=!!s.loaded,r.ring.material.opacity=s.occupant?.42:.2;const h=n.actors.find(u=>u.id===s.occupant);h&&this.poseOperator(h,r,s)}for(const s of n.shells||[]){let r=this.shellMeshes.get(s.id);r||(r=this.createShell(s),this.shellMeshes.set(s.id,r));const o=Xl(s.age/s.duration);this.shellPoint(s,o,r.stone.position),r.stone.rotation.set(s.age*4,s.age*3,s.age*1.5),r.material.opacity=.35+.22*o+.08*Math.sin(this.clock*13)}for(const[s,r]of this.shellMeshes)(n.shells||[]).some(o=>o.id===s)||(r.stone.removeFromParent(),r.ring.removeFromParent(),r.core.removeFromParent(),r.material.dispose(),this.shellMeshes.delete(s));this.updatePreview()}dispose(){for(const t of this.platforms.values())t.group.removeFromParent(),t.group.traverse(e=>{e.userData.ownedGeometry&&e.geometry.dispose()});for(const t of this.machines.values())t.group.removeFromParent(),t.group.traverse(e=>{e.userData.ownedGeometry&&e.geometry.dispose()}),t.factionMaterial.dispose(),t.ringMaterial.dispose();for(const t of this.shellMeshes.values())t.stone.removeFromParent(),t.ring.removeFromParent(),t.core.removeFromParent(),t.material.dispose();this.previewLine.removeFromParent(),this.previewLine.geometry.dispose(),this.landingMarker.removeFromParent();for(const t of Object.values(this.geometry))t.dispose();for(const t of Object.values(this.material))t.dispose();this.machines.clear(),this.platforms.clear(),this.shellMeshes.clear()}}const T_=Math.PI*2,A_=new L(0,1,0),Kr=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),ql=i=>Number.isFinite(i?.x)&&Number.isFinite(i?.z),cd=["#c4e4de","#83bcb4","#eaf4e4"].map(i=>new ee(i)),da=Object.freeze({mobileDrops:96,desktopDrops:144,mobileRipples:6,desktopRipples:8}),R_=`
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
`;class P_{constructor(t){this.game=t,this.scene=t.scene,this.time=0,this.seed=7919,this.cursor=0,this.rippleCursor=0,this.capacity=t.touch?da.mobileDrops:da.desktopDrops,this.particles=Array.from({length:this.capacity},()=>({life:0,total:1,x:0,y:0,z:0,vx:0,vy:0,vz:0,size:.08,color:0})),this.dummy=new Xe,this.direction=new L,this.dropGeometry=new Jn(1,7,5),this.dropMaterial=new yn({color:"#ffffff",emissive:"#163a35",emissiveIntensity:.06,depthTest:!0,depthWrite:!0}),this.droplets=new En(this.dropGeometry,this.dropMaterial,this.capacity),this.droplets.name="arcade-impact-droplets",this.droplets.instanceMatrix.setUsage(Ii),this.droplets.frustumCulled=!1,this.droplets.count=0;for(let n=0;n<this.capacity;n++)this.droplets.setColorAt(n,cd[0]);this.droplets.instanceColor.setUsage(Ii),this.scene.add(this.droplets);const e=t.touch?da.mobileRipples:da.desktopRipples;this.ripples=Array.from({length:e},(n,s)=>{const r=new Ui(2,2,8,8);r.rotateX(-Math.PI/2);const o=r.attributes.position.array.slice(),a=new Kn({vertexShader:R_,fragmentShader:C_,uniforms:Ea.merge([Ct.fog,{uAge:{value:0},uOpacity:{value:.75},uWater:{value:new ee("#6aaba4")},uFoam:{value:new ee("#e8f2df")}}]),transparent:!0,depthTest:!0,depthWrite:!1,side:Pe,fog:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),l=new Zt(r,a);return l.name=`arcade-impact-ripple-${s}`,l.frustumCulled=!1,l.visible=!1,this.scene.add(l),{mesh:l,reference:o,age:0,duration:1,active:!1}})}ground(t,e){const n=this.game.ground(t,e);return Number.isFinite(n)?n:0}random(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}ripple(t,e,n,s,r=.75){const o=this.ripples[this.rippleCursor++%this.ripples.length],a=o.mesh.geometry.attributes.position;for(let l=0;l<a.count;l++){const c=t+o.reference[l*3]*n,h=e+o.reference[l*3+2]*n;a.setXYZ(l,c,this.ground(c,h)+.035,h)}a.needsUpdate=!0,o.mesh.geometry.computeVertexNormals(),o.mesh.material.uniforms.uAge.value=0,o.mesh.material.uniforms.uOpacity.value=r,o.age=0,o.duration=s,o.active=!0,o.mesh.visible=!0}emit({x:t,y:e,z:n,count:s,power:r,spread:o=.12,dx:a=0,dz:l=0,lifetime:c=.55}){const h=Math.hypot(a,l);h>0&&(a/=h,l/=h);for(let u=0;u<s;u++){const d=this.particles[this.cursor++%this.capacity],f=this.random()*T_,m=(.8+this.random()*1.7)*r;d.x=t+(this.random()-.5)*o,d.y=e+this.random()*.07,d.z=n+(this.random()-.5)*o,d.vx=Math.sin(f)*m+a*r*.65,d.vz=Math.cos(f)*m+l*r*.65,d.vy=(1.8+this.random()*2.2)*r,d.total=c*(.82+this.random()*.3),d.life=d.total,d.size=(.045+this.random()*.045)*Math.sqrt(r),d.color=u%3}this.drawDrops()}hit({x:t,z:e,dx:n=0,dz:s=0,height:r,heavy:o=!1}={}){if(!ql({x:t,z:e}))return;const a=this.ground(t,e),l=Number.isFinite(r)?Math.max(a+.04,r):a+.7;this.ripple(t,e,o?1.3:.72,o?.54:.4,o?.8:.64),this.emit({x:t,y:l,z:e,dx:n,dz:s,count:o?15:8,power:o?1.2:.72,spread:o?.22:.1,lifetime:o?.58:.43})}stone({x:t,z:e,radius:n=2.8}={}){if(!ql({x:t,z:e}))return;const s=Kr(Number.isFinite(n)?n:2.8,1,4);this.ripple(t,e,s,.74,.9),this.emit({x:t,y:this.ground(t,e)+.12,z:e,count:this.game.touch?28:34,power:1.8,spread:.55,lifetime:.76})}landing({x:t,z:e,strength:n=1}={}){if(!ql({x:t,z:e}))return;const s=Kr(Number.isFinite(n)?n:1,.35,1.8);this.ripple(t,e,.75+s*.42,.48,.68),this.emit({x:t,y:this.ground(t,e)+.08,z:e,count:Math.round(6+s*5),power:.6+s*.28,spread:.25,lifetime:.48})}drawDrops(){let t=0;for(const e of this.particles){if(e.life<=0)continue;const n=Kr(e.life/.13),s=e.size*n;this.dummy.position.set(e.x,e.y,e.z),this.direction.set(e.vx,e.vy,e.vz),this.direction.lengthSq()>1e-6?this.dummy.quaternion.setFromUnitVectors(A_,this.direction.normalize()):this.dummy.quaternion.identity(),this.dummy.scale.set(s,s*1.55,s),this.dummy.updateMatrix(),this.droplets.setMatrixAt(t,this.dummy.matrix),this.droplets.setColorAt(t,cd[e.color]),t++}this.droplets.count=t,this.droplets.instanceMatrix.needsUpdate=!0,this.droplets.instanceColor.needsUpdate=!0}update(t=0){const e=Kr(Number.isFinite(t)?t:0,0,.1);if(e!==0){this.time+=e;for(const n of this.particles){if(n.life<=0||(n.life=Math.max(0,n.life-e),n.life===0))continue;n.x+=n.vx*e,n.z+=n.vz*e,n.y+=n.vy*e-7*e*e,n.vy-=14*e;const s=Math.exp(-e*1.2);n.vx*=s,n.vz*=s;const r=this.ground(n.x,n.z)+.025;n.y<r&&(n.y=r,n.vy=0,n.vx*=.3,n.vz*=.3,n.life=Math.min(n.life,.06))}this.drawDrops();for(const n of this.ripples)n.active&&(n.age+=e,n.mesh.material.uniforms.uAge.value=Kr(n.age/n.duration),n.age>=n.duration&&(n.active=!1,n.mesh.visible=!1))}}clear(){for(const t of this.particles)t.life=0;this.droplets.count=0;for(const t of this.ripples)t.active=!1,t.mesh.visible=!1,t.age=0;this.time=0}dispose(){this.clear(),this.droplets.removeFromParent(),this.dropGeometry.dispose(),this.dropMaterial.dispose();for(const t of this.ripples)t.mesh.removeFromParent(),t.mesh.geometry.dispose(),t.mesh.material.dispose()}}const hr=["#b5dc72","#ee8c72","#bd9ee3"],hd=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),ud=Math.PI*2,z_=["pelvis","spine","head","eyeL","eyeR","wrist-1","wrist1","foot-1","foot1"];class D_{constructor(t){this.game=t,this.scene=t.scene,this.clock=0,this.group=new te,this.group.name="storage-homes-and-fenced-catapult-yards",this.scene.add(this.group),this.bases=new Map,this.groves=[],this.enclosures=new Map,this.ownedGeometries=[],this.ownedMaterials=[],this.dummy=new Xe,this.sightRay=new Ds,this.sightTarget=new L,this.sightHit=new L,this.roofRay=new Ds,this.roofHit=new L,this.roofCamera=new L,this.roofAnchor=new L,this.roofNearest=new L,this.roofTargets=Array.from({length:16},()=>new L),this.roofTargetCount=0,this.geometries={box:new Bi(1,1,1),cylinder:new Us(.5,.5,1,8),cone:new uh(1,1,5),leaf:new fh(1,1),ring:new rs(.91,1,40),wing:new Jn(1,6,4),sphere:new Jn(1,8,6)},this.materials={wood:new yn({color:"#866244"}),lightWood:new yn({color:"#c69b62"}),darkWood:new yn({color:"#554535"}),leaf:new yn({color:"#56874d"}),fly:new yn({color:"#233e38"}),wing:new yn({color:"#d5eee1",transparent:!0,opacity:.85}),ruin:new yn({color:"#6a6855"}),dark:new _n({color:"#173b31"}),alert:new _n({color:"#f4af69"})},this.buildWalls();for(const[e,n]of Xn.entries())this.bases.set(n.id,this.buildBase(n,e));for(const[e,n]of _h.entries())this.groves.push(this.buildGrove(n,e))}ground(t,e){return this.game.ground(t,e)}mesh(t,e,n,s=0,r=0,o=0,a=1,l=1,c=1){const h=new Zt(e,n);return h.position.set(s,r,o),h.scale.set(a,l,c),t.add(h),h}material(t){const e=new yn(t);return this.ownedMaterials.push(e),e}mergeParts(t,e,n){if(!t.length)return null;const s=Li(t);for(const o of t)o.dispose();this.ownedGeometries.push(s);const r=new Zt(s,e);return r.name=n,this.group.add(r),r}boxPart(t,e,n,s,r,o,a){const l=this.geometries.box.clone();l.scale(r,o,a),l.translate(e,n,s),t.push(l)}buildWalls(){const t=[];for(const e of Ba){const n=Xn.findIndex(x=>x.owner===e.owner),s=[],r=[],o=[],a=this.material({color:"#866244",transparent:!0,opacity:1}),l=this.material({color:hr[n],transparent:!0,opacity:1});for(const x of hs){if(x.enclosureId!==e.id)continue;const p=this.ground(x.x,x.z);this.boxPart(t,x.x,p+.25,x.z,x.hw*2+.08,.5,x.hd*2+.08),this.boxPart(s,x.x,p+x.height*.5,x.z,x.hw*2,x.height,x.hd*2),this.boxPart(r,x.x,p+x.height+.055,x.z,x.hw*2+.05,.16,x.hd*2+.05);const v=x.hw>x.hd,y=v?x.hw*2:x.hd*2,_=Math.max(1,Math.floor(y/.65));for(let T=0;T<=_;T++){const A=_?T/_-.5:0;this.boxPart(s,x.x+(v?A*y:0),p+x.height*.55,x.z+(v?0:A*y),.15,x.height+.32,.15)}o.push(new jn(new L(x.x-x.hw-.1,p,x.z-x.hd-.1),new L(x.x+x.hw+.1,p+x.height+.35,x.z+x.hd+.1)))}const c=this.mergeParts(s,a,`${e.id}-solid-walls`),h=this.mergeParts(r,l,`${e.id}-wall-tops`);this.enclosures.set(e.id,{definition:e,wallMesh:c,capMesh:h,woodMaterial:a,capMaterial:l,boxes:o,faded:!1});const u=this.ground(e.gate.x,e.gate.z),d=new te;d.name=`${e.id}-single-open-entrance`,d.position.set(e.gate.x,u,e.gate.z),this.group.add(d),(e.side==="east"||e.side==="west")&&(d.rotation.y=Math.PI/2),this.mesh(d,this.geometries.box,a,-1.6,1.25,0,.18,2.5,.25),this.mesh(d,this.geometries.box,a,1.6,1.25,0,.18,2.5,.25),this.mesh(d,this.geometries.box,l,0,2.5,0,3.38,.22,.3);const m=this.mesh(d,this.geometries.box,this.material({color:hr[n]}),0,.045,0,2.8,.07,.5);m.name="walkable-gate-threshold";const g=this.mesh(d,this.geometries.leaf,this.material({color:hr[n]}),0,2.9,0,.4,.35,.1);g.rotation.z=.25}this.mergeParts(t,this.materials.ruin,"enclosure-foundations")}updateWallVisibility(t,e,n){const s=this.game.camera;let r=0;t&&s&&(this.sightTarget.set(t.x,this.ground(t.x,t.z)+(t.height||0)+.9,t.z),this.sightRay.origin.copy(s.position),this.sightRay.direction.copy(this.sightTarget).sub(s.position),r=this.sightRay.direction.lengthSq(),this.sightRay.direction.normalize());const o=1-Math.exp(-Math.max(n,.016)*10);for(const a of this.enclosures.values()){let l=e?.id===a.definition.id;if(!l&&r>0){for(const h of a.boxes)if(this.sightRay.intersectBox(h,this.sightHit)&&this.sightHit.distanceToSquared(this.sightRay.origin)<r-.05){l=!0;break}}a.faded=l;const c=l?.2:a.woodMaterial.opacity+(1-a.woodMaterial.opacity)*o;a.woodMaterial.opacity=a.capMaterial.opacity=c,a.woodMaterial.depthWrite=a.capMaterial.depthWrite=c>.95}}prepareRoofSight(t){this.roofTargetCount=0;const e=this.game.camera;if(!t||!e)return;e.getWorldPosition(this.roofCamera);const n=this.game.models?.[0],s=hd(t.load||0);if(n?.group){n.group.updateWorldMatrix(!0,!0),this.roofAnchor.setFromMatrixPosition(n.group.matrixWorld);for(const c of z_){const h=n.bones?.[c];h&&this.roofTargets[this.roofTargetCount++].setFromMatrixPosition(h.matrixWorld)}}else this.roofAnchor.set(t.x,this.ground(t.x,t.z)+(t.height||0)+s*.28+(t.catapultId?.45:0),t.z);const r=.86+s*.45,o=.55+s*.22,a=.85+s*.32,l=this.roofAnchor;this.roofTargets[this.roofTargetCount++].set(l.x,l.y+o,l.z),this.roofTargets[this.roofTargetCount++].set(l.x-r,l.y+o,l.z),this.roofTargets[this.roofTargetCount++].set(l.x+r,l.y+o,l.z),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+o,l.z-r),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+o,l.z+r),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+.08,l.z),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+a,l.z)}roofObstructsPlayer(t){if(!this.roofTargetCount)return!1;const e=this.roofCamera,n=this.roofRay,s=this.game.camera,r=s.near||.1,o=Math.tan((s.fov||52)*Math.PI/360),a=Math.max(.35,r*Math.sqrt(1+o*o*(1+(s.aspect||1)**2))+.08);for(const l of t.roofTriangles)if(l.closestPointToPoint(e,this.roofNearest),this.roofNearest.distanceToSquared(e)<a*a)return!0;n.origin.copy(e);for(let l=0;l<this.roofTargetCount;l++){n.direction.copy(this.roofTargets[l]).sub(e);const c=n.direction.lengthSq();if(!(c<1e-8)&&(n.direction.normalize(),!!n.intersectsBox(t.roofBounds))){for(const h of t.roofTriangles)if(n.intersectTriangle(h.a,h.b,h.c,!1,this.roofHit)&&this.roofHit.distanceToSquared(e)<c)return!0}}return!1}buildHouse(t,e,n){const s=this.game.houseFloors?.find(P=>P.baseId===t.id),r=s?.height??this.ground(t.x,t.z),o=t.halfWidth+.18,a=t.halfDepth+.18,l=new te;l.name=`${t.id}-actual-roofed-house`,l.position.set(t.x,r,t.z),this.group.add(l);const c=this.mesh(l,this.geometries.box,this.materials.darkWood,0,-.09,0,o*2,.18,a*2);c.name="house-floor-at-actor-height";const h=[];for(let P=-a+.2;P<a;P+=.4)this.boxPart(h,0,-.012,Math.min(P,a-.2),o*2-.06,.025,.355);const u=Li(h);for(const P of h)P.dispose();this.ownedGeometries.push(u),this.mesh(l,u,this.materials.lightWood);const d=[];for(const P of[-t.halfWidth,t.halfWidth])for(const G of[-t.halfDepth,t.halfDepth]){const j=this.game.world?.getSurface(t.x+P,t.z+G).height??s?.minimum??r-.2,H=Math.max(.18,r-j);this.boxPart(d,P,-H*.5,G,.3,H,.3)}const f=Li(d);for(const P of d)P.dispose();this.ownedGeometries.push(f),this.mesh(l,f,this.materials.darkWood);const m=t.side==="east"||t.side==="west",g=(m?t.halfDepth:t.halfWidth)+.32,x=(m?t.halfWidth:t.halfDepth)+.32,p=2.62,v=4.05,y=new we;y.setAttribute("position",new Gt([-g,p,-x,0,v,-x,g,p,-x,-g,p,x,0,v,x,g,p,x],3)),y.setIndex([0,3,4,0,4,1,1,4,5,1,5,2,0,1,2,3,5,4]),y.computeVertexNormals(),m&&y.rotateY(Math.PI/2),this.ownedGeometries.push(y);const _=this.mesh(l,y,e);_.name="full-house-leaf-roof",_.updateWorldMatrix(!0,!1);const T=[],A=new jn,E=y.attributes.position,R=y.index;for(let P=0;P<R.count;P+=3){const G=new $n;G.a.fromBufferAttribute(E,R.getX(P)).applyMatrix4(_.matrixWorld),G.b.fromBufferAttribute(E,R.getX(P+1)).applyMatrix4(_.matrixWorld),G.c.fromBufferAttribute(E,R.getX(P+2)).applyMatrix4(_.matrixWorld),T.push(G),A.expandByPoint(G.a).expandByPoint(G.b).expandByPoint(G.c)}const S=this.mesh(l,this.geometries.cylinder,n,0,v+.18,0,.13,.55,.13);S.rotation.z=.2;const b=this.mesh(l,this.geometries.leaf,n,.2,v+.48,0,.5,.14,.24);b.rotation.z=.3;let U=null;if(s?.ramp){const P=s.ramp,G=[],j=[];for(let B=0;B<=P.rows;B++)for(let O=0;O<=P.cols;O++){const Q=B/P.rows*P.length,W=(O/P.cols*2-1)*P.halfWidth;G.push(P.x+P.dx*Q+P.rightX*W,P.heights[B*(P.cols+1)+O],P.z+P.dz*Q+P.rightZ*W)}for(let B=0;B<P.rows;B++)for(let O=0;O<P.cols;O++){const Q=B*(P.cols+1)+O,W=Q+1,ft=Q+P.cols+1,Vt=ft+1;j.push(Q,ft,W,W,ft,Vt)}const H=new we;H.setAttribute("position",new Gt(G,3)),H.setIndex(j),H.computeVertexNormals(),this.ownedGeometries.push(H);const q=this.material({color:"#b18b59",side:Pe});U=new Zt(H,q),U.name=`${t.id}-walkable-door-ramp`,this.group.add(U)}return l.userData={baseId:t.id,interior:{x:t.x,z:t.z,halfWidth:t.halfWidth-.17,halfDepth:t.halfDepth-.17},floorY:r,roofEaveY:r+p,roofRidgeY:r+v},{house:l,deck:c,ramp:U,roof:_,roofStem:S,roofLeaf:b,roofTriangles:T,roofBounds:A}}buildBase(t,e){const n=new te;n.name=`${t.id}-shelter`,n.position.set(t.stock.x,this.ground(t.stock.x,t.stock.z),t.stock.z),this.group.add(n);const s=t.side==="north"?0:t.side==="east"?Math.PI/2:-Math.PI/2,r=new te;r.rotation.y=s,n.add(r);const o=this.material({color:hr[e]}),a=this.material({color:e===0?"#61975b":e===1?"#ba7356":"#9270b0",transparent:!0,opacity:1,depthWrite:!0,side:Pe}),l=this.mesh(r,this.geometries.cylinder,this.materials.wood,0,.38,0,1.25,.76,1.25);l.name="infinite-fly-stock-basket",this.mesh(r,this.geometries.cylinder,this.materials.darkWood,0,.77,0,1.15,.09,1.15);const c=this.mesh(r,this.geometries.cylinder,o,0,.42,0,1.31,.14,1.31);c.name="owner-color-on-stock";const{house:h,deck:u,ramp:d,roof:f,roofStem:m,roofLeaf:g,roofTriangles:x,roofBounds:p}=this.buildHouse(t,a,o),v=new te;v.name="visible-fly-reserve",r.add(v);const y=new En(this.geometries.sphere,this.materials.fly,8),_=new En(this.geometries.wing,this.materials.wing,16);y.name="reserve-fly-bodies",_.name="reserve-fly-wings",y.frustumCulled=_.frustumCulled=!1,v.add(y,_);const T=new _n({color:hr[e],transparent:!0,opacity:.36,side:Pe,depthWrite:!1});this.ownedMaterials.push(T);const A=this.mesh(n,this.geometries.ring,T,0,.045,0,2.05,2.05,2.05);A.rotation.x=-Math.PI/2,A.name="stock-refill-ring";const E=new te;E.name="storage-destruction-progress",E.position.set(0,2.12,0),n.add(E),this.mesh(E,this.geometries.box,this.materials.dark,0,0,0,2.2,.17,.09);const R=this.mesh(E,this.geometries.box,this.materials.alert,-1.06,0,.055,0,.115,.05);E.visible=!1;const S=new te;S.name="destroyed-storage-remains",S.visible=!1,n.add(S);const b=[];for(let P=0;P<5;P++){const G=this.geometries.box.clone();G.scale(.2,.2,1.1),G.rotateY(P*.8),G.translate(Math.sin(P*2.4)*.8,.12+P%2*.08,Math.cos(P*2.4)*.7),b.push(G)}const U=Li(b);for(const P of b)P.dispose();return this.ownedGeometries.push(U),this.mesh(S,U,this.materials.ruin),{definition:t,group:n,cabin:r,house:h,deck:u,ramp:d,roof:f,roofStem:m,roofLeaf:g,roofTriangles:x,roofBounds:p,roofObstructed:!1,roofHold:0,roofMaterial:a,marker:A,markerMaterial:T,bar:E,fill:R,supply:v,flyBodies:y,flyWings:_,ruins:S,index:e}}buildGrove(t,e){const n=new te;n.name=t.id,this.group.add(n);const s=this.material({color:["#487c47","#609147","#397553","#668349","#4d825a"][e],transparent:!0,opacity:.94,depthWrite:!0}),r=[],o=[],a=[],l=new te;l.name="tree-cover-canopy",n.add(l);for(let d=0;d<3;d++){const f=d*ud/3+e*.7,m=t.x+Math.cos(f)*t.radius*.43,g=t.z+Math.sin(f)*t.radius*.43,x=this.ground(m,g),p=3.3+d%2*.5,v=this.geometries.cylinder.clone();v.scale(.24,p,.24),v.translate(m,x+p/2,g),o.push(v);for(let _=0;_<3;_++){const T=this.geometries.leaf.clone();T.scale(1.35+_*.12,.8,1.25),T.translate(m+Math.sin(_*2.1)*.42,x+p+_*.35,g+Math.cos(_*2.1)*.35),r.push(T)}const y=this.geometries.leaf.clone();y.scale(.7,.35,.7),y.translate(m+.5,x+.22,g-.25),a.push(y)}const c=(d,f,m,g)=>{const x=Li(d);for(const v of d)v.dispose();this.ownedGeometries.push(x);const p=new Zt(x,f);return p.name=m,g.add(p),p};c(o,this.materials.wood,"grove-trunks",n),c(r,s,"grove-leaf-crown",l),c(a,this.materials.leaf,"slow-moving-underbrush",n);const h=new _n({color:"#50733f",transparent:!0,opacity:.2,side:Pe,depthWrite:!1});this.ownedMaterials.push(h);const u=this.mesh(n,this.geometries.ring,h,t.x,this.ground(t.x,t.z)+.02,t.z,t.radius,t.radius,t.radius);return u.rotation.x=-Math.PI/2,{definition:t,group:n,canopy:l,material:s}}update(t=0){const e=this.game.running?Math.max(0,Math.min(.1,t)):0;this.clock+=e;const n=this.game.state.actors?.[0],s=n?C1(n):null;this.updateWallVisibility(n,s,t),this.prepareRoofSight(n);const r=this.game.state.bases||[];for(const o of this.bases.values()){const a=r.find(d=>d.id===o.definition.id||d.owner===o.definition.owner),l=!!a?.destroyed,c=hd((a?.progress||0)/10),h=c>0&&!l;o.cabin.visible=!l,o.supply.visible=!l,o.ruins.visible=l,o.markerMaterial.color.set(l?"#5c7067":h?"#ff9b58":hr[o.index]),o.markerMaterial.opacity=l?.12:h?.4+.12*Math.sin(this.clock*8):.28,o.bar.visible=h,o.fill.scale.x=2.12*c,o.fill.position.x=-1.06+1.06*c,this.game.camera&&o.bar.quaternion.copy(this.game.camera.quaternion),o.roofObstructed=s?.id===o.definition.id||this.roofObstructsPlayer(o),o.roofHold=o.roofObstructed?.18:Math.max(0,o.roofHold-Math.max(t,.016));const u=o.roofObstructed||o.roofHold>0;o.roof.visible=!l&&!u,o.roofMaterial.opacity=u?0:o.roofMaterial.opacity+(1-o.roofMaterial.opacity)*(1-Math.exp(-Math.max(t,.016)*10)),o.roofMaterial.depthWrite=o.roofMaterial.opacity>.9,o.roofStem.visible=o.roofLeaf.visible=o.roof.visible&&o.roofMaterial.opacity>.6,o.cabin.position.x=h?Math.sin(this.clock*25)*.025:0;for(let d=0;d<8;d++){const f=this.clock*(1.4+d%3*.2)+d*ud/8,m=.3+d%3*.13,g=Math.sin(f)*m,x=1.05+d%3*.17+Math.sin(this.clock*4+d)*.08,p=Math.cos(f)*m,v=this.dummy;v.position.set(g,x,p),v.scale.set(.09,.08,.13),v.rotation.set(0,f,0),v.updateMatrix(),o.flyBodies.setMatrixAt(d,v.matrix);for(let y=0;y<2;y++){const _=y===0?-1:1;v.position.set(g+Math.cos(f)*_*.105,x+.035,p-Math.sin(f)*_*.105),v.scale.set(.15,.016,.07),v.rotation.set(0,f,Math.sin(this.clock*36+d)*.55*_),v.updateMatrix(),o.flyWings.setMatrixAt(d*2+y,v.matrix)}}o.flyBodies.instanceMatrix.needsUpdate=!0,o.flyWings.instanceMatrix.needsUpdate=!0}for(const o of this.groves){const l=n&&Math.hypot(n.x-o.definition.x,n.z-o.definition.z)<o.definition.radius+1.4?.23:.94;o.material.opacity+=(l-o.material.opacity)*(1-Math.exp(-Math.max(t,.016)*8)),o.material.depthWrite=o.material.opacity>.9}}dispose(){this.group.removeFromParent();for(const t of this.ownedGeometries)t.dispose();for(const t of Object.values(this.geometries))t.dispose();for(const t of this.ownedMaterials)t.dispose();for(const t of Object.values(this.materials))t.dispose();this.bases.clear(),this.enclosures.clear(),this.groves.length=0}}const ns=["move","aim","fire"],to=8,Pa=(i,t,e)=>Math.max(t,Math.min(e,i)),xr=(i,t)=>Number.isFinite(i)?i:t,Eh=(i,t)=>({left:i.x-t.width/2,top:i.y-t.height/2,right:i.x+t.width/2,bottom:i.y+t.height/2}),I_=(i,t,e=to)=>i.left<t.right+e&&i.right>t.left-e&&i.top<t.bottom+e&&i.bottom>t.top-e;function xf(i,t,e,n,s=i){const r=e.left+t.width/2,o=Math.max(r,e.right-t.width/2),a=e.top+t.height/2,l=Math.max(a,e.bottom-t.height/2),c=m=>({x:Pa(xr(m?.x,r),r,o),y:Pa(xr(m?.y,a),a,l)}),h=c(i),u=[h,c(s)];for(const m of n)u.push(c({x:m.left-t.width/2-to,y:h.y}),c({x:m.right+t.width/2+to,y:h.y}),c({x:h.x,y:m.top-t.height/2-to}),c({x:h.x,y:m.bottom+t.height/2+to}));for(let m=a;m<=l+16;m+=16)for(let g=r;g<=o+16;g+=16)u.push(c({x:g,y:m}));let d=null,f=1/0;for(const m of u){if(n.some(x=>I_(Eh(m,t),x)))continue;const g=(m.x-h.x)**2+(m.y-h.y)**2;g<f&&(d=m,f=g)}return d||c(s)}function L_(i,t,e){const n=t>=i,s=e.move,r=e.aim,o=e.fire;return{move:{x:14+s.width/2,y:t-26-s.height/2},aim:{x:i-14-r.width/2,y:t-26-r.height/2},fire:n?{x:i-14-r.width/2,y:t-26-r.height-20-o.height/2}:{x:i-14-r.width-22-o.width/2,y:t-26-o.height/2}}}function U_({width:i,height:t,controls:e,preferred:n={},blocked:s=[],insets:r={}}){const o={left:Math.max(10,xr(r.left,0)+8),top:Math.max(10,xr(r.top,0)+8),right:i-Math.max(10,xr(r.right,0)+8),bottom:t-Math.max(18,xr(r.bottom,0)+8)},a=L_(i,t,e),l={},c=[...s];for(const h of ns){const u=n[h],d=u&&Number.isFinite(u.x)&&Number.isFinite(u.y)?{x:u.x*i,y:u.y*t}:a[h];l[h]=xf(d,e[h],o,c,a[h]),c.push(Eh(l[h],e[h]))}return{positions:l,bounds:o}}function N_({root:i,movePad:t,aimPad:e,fireButton:n,toggleButton:s,storageKey:r="frog.touch-layout.v1",onEditingChange:o=()=>{},announce:a=()=>{}}){const l=i.ownerDocument,c=l.defaultView,h={move:t,aim:e,fire:n},u=i.querySelector("#layout-hint");let d=!1,f=null,m={},g={},x={},p={portrait:{},landscape:{}},v=0,y=!1,_={width:c.innerWidth,height:c.innerHeight,mode:c.innerHeight>=c.innerWidth?"portrait":"landscape"};const T=[],A=(B,O,Q,W)=>{B.addEventListener(O,Q,W),T.push(()=>B.removeEventListener(O,Q,W))},E=()=>c.innerHeight>=c.innerWidth?"portrait":"landscape";try{const B=JSON.parse(c.localStorage.getItem(r)||"null");if(B?.version===1)for(const O of["portrait","landscape"])for(const Q of ns){const W=B[O]?.[Q];Number.isFinite(W?.x)&&Number.isFinite(W?.y)&&(p[O][Q]={x:Pa(W.x,0,1),y:Pa(W.y,0,1)})}}catch{}const R=()=>{const{mode:B,width:O,height:Q}=_;for(const W of ns)m[W]&&(p[B][W]={x:m[W].x/O,y:m[W].y/Q});try{c.localStorage.setItem(r,JSON.stringify({version:1,...p}))}catch{}},S=()=>{const B=[];for(const O of l.querySelectorAll("#arcade-hud, #minimap, #view-button, #layout-button, #layout-hint, #round-status, #base-status, #catapult-status, #sabotage-status, #kick-button, #catapult-button, #sabotage-button")){if(O.hidden||O.closest("[hidden]")||c.getComputedStyle(O).visibility==="hidden")continue;const Q=O.getBoundingClientRect();Q.width&&Q.height&&B.push({left:Q.left,top:Q.top,right:Q.right,bottom:Q.bottom})}return B},b=()=>{for(const B of ns){const O=h[B],Q=m[B];Q&&(O.style.left=`${Q.x-g[B].width/2}px`,O.style.top=`${Q.y-g[B].height/2}px`,O.style.right="auto",O.style.bottom="auto")}},U=()=>{if(y)return;const B=c.getComputedStyle(i),O={};for(const W of["left","right","top","bottom"])O[W]=parseFloat(B.getPropertyValue(`--touch-safe-${W}`))||0;for(const W of ns){const ft=h[W],Vt=ft.getBoundingClientRect(),Me=c.getComputedStyle(ft);g[W]={width:Math.max(44,Vt.width||parseFloat(Me.width)||72),height:Math.max(44,Vt.height||parseFloat(Me.height)||72)}}const Q=U_({width:c.innerWidth,height:c.innerHeight,controls:g,preferred:p[E()],blocked:S(),insets:O});m=Q.positions,x=Q.bounds,_={width:c.innerWidth,height:c.innerHeight,mode:E()},b()},P=()=>{c.cancelAnimationFrame(v),v=c.requestAnimationFrame(U)},G=()=>{f&&(f=null,R())},j=B=>{const O=!!B;if(O!==d){G(),d=O,i.classList.toggle("layout-editing",d),s.setAttribute("aria-pressed",String(d)),s.setAttribute("aria-label",d?"Ολοκλήρωση αλλαγής θέσεων χειριστηρίων":"Αλλαγή θέσεων χειριστηρίων"),s.querySelector("span")?.replaceChildren(d?"ΤΕΛΟΣ":"ΘΕΣΕΙΣ"),u&&(u.hidden=!d);for(const Q of ns)h[Q].setAttribute("data-layout-label",{move:"ΚΙΝΗΣΗ",aim:"ΣΤΟΧΕΥΣΗ",fire:"ΒΟΛΗ"}[Q]),h[Q].classList.toggle("layout-draggable",d);d||R(),o(d),a(d?"Σύρε τα χειριστήρια στη θέση που σε βολεύει. Πάτησε ΤΕΛΟΣ για να συνεχίσεις.":"Οι θέσεις των χειριστηρίων αποθηκεύτηκαν.")}},H=()=>{p[E()]={},U(),R(),a("Επαναφέρθηκαν οι αρχικές θέσεις χειριστηρίων.")};if(u){u.textContent.trim()||u.append("Σύρε κίνηση, στόχευση και βολή. ");const B=l.createElement("button");B.type="button",B.className="layout-reset",B.textContent="ΕΠΑΝΑΦΟΡΑ",B.setAttribute("aria-label","Επαναφορά αρχικών θέσεων χειριστηρίων"),u.append(B),A(B,"click",H)}for(const B of ns){const O=h[B];A(O,"pointerdown",Q=>{d&&(Q.preventDefault(),Q.stopImmediatePropagation(),!f&&(m[B]||U(),f={key:B,id:Q.pointerId,dx:Q.clientX-m[B].x,dy:Q.clientY-m[B].y},O.setPointerCapture?.(Q.pointerId)))},!0),A(O,"pointermove",Q=>{if(!d||(Q.preventDefault(),Q.stopImmediatePropagation(),!f||f.id!==Q.pointerId||f.key!==B))return;const W=S();for(const ft of ns)ft!==B&&m[ft]&&W.push(Eh(m[ft],g[ft]));m[B]=xf({x:Q.clientX-f.dx,y:Q.clientY-f.dy},g[B],x,W,m[B]),b()},!0);for(const Q of["pointerup","pointercancel","lostpointercapture"])A(O,Q,W=>{d&&(W.preventDefault?.(),W.stopImmediatePropagation(),f?.id===W.pointerId&&G())},!0);A(O,"click",Q=>{d&&(Q.preventDefault(),Q.stopImmediatePropagation())},!0)}let q=-1/0;return A(s,"pointerdown",B=>{B.pointerType==="touch"&&(B.preventDefault(),B.stopPropagation(),q=Date.now(),j(!d))}),A(s,"click",B=>{(B.detail===0||Date.now()-q>600)&&j(!d)}),A(c,"resize",()=>{G(),P()}),A(c,"orientationchange",P),A(c,"keydown",B=>{d&&B.code==="Escape"&&(B.preventDefault(),B.stopImmediatePropagation(),j(!1))},!0),A(c,"blur",()=>{G(),d&&j(!1)}),s.setAttribute("aria-pressed","false"),P(),{get editing(){return d},setEditing:j,refresh:U,reset:H,destroy(){if(!y){j(!1),y=!0,c.cancelAnimationFrame(v);for(const B of T)B()}}}}const dd=i=>Number.isFinite(i)?Math.max(0,Math.min(1,i)):0,k_=Object.freeze([.96,.98,1.04]);function F_(i){if(i.stats?.type!=="frog")return i;i.group.getObjectByName("anatomical-animation-pivot").scale.set(...k_),i.group.scale.setScalar(1);const e=i.mesh.material;return e.bumpScale=0,e.roughness=.9,e.clearcoat=.08,e.clearcoatRoughness=.75,i}function O_(i,{load:t=0,spit:e=0}={}){if(i.stats?.type!=="frog")return i;const n=dd(t),s=dd(e),r=i.bones;i.group.scale.setScalar(1),r.throat.scale.x*=1+n*.08+s*.1,r.throat.scale.y*=1+n*.12+s*.16,r.throat.scale.z*=1+n*.08+s*.08,r.jaw.rotation.x-=s*.42,r.head.rotation.x-=s*.08;for(const o of["eyeL","eyeR"])r[o].scale.multiplyScalar(1.14);return i}const za=Object.freeze({cameraZoom:br.default,cameraFov:52,cameraAutoRotate:!0}),fd=(i,t)=>{const e=typeof i=="number"||typeof i=="string"&&i.trim()?Number(i):NaN;return Number.isFinite(e)?e:t},pd=(i,t,e)=>Math.max(t,Math.min(e,i));function vf(i={}){const t=pd(fd(i?.cameraZoom,za.cameraZoom),br.min,br.max),e=pd(fd(i?.cameraFov,za.cameraFov),40,80);return{cameraZoom:Math.round(t*20)/20,cameraFov:Math.round(e),cameraAutoRotate:i?.cameraAutoRotate!==!1}}function B_(i){const t=i.camera,e=i.state?.actors?.[0];if(t.fov=i.settings.cameraFov,t.updateProjectionMatrix(),e){const n=pf(e,i.ground(e.x,e.z),t.aspect,i.viewMode,{yaw:i.cameraYaw,pitch:i.cameraPitch,zoom:i.settings.cameraZoom});i.focus.fromArray(n.look),i.cameraTarget.fromArray(n.position),t.position.copy(i.cameraTarget),t.lookAt(i.focus),t.updateMatrixWorld(),i.cameraReady=!0,i.basesView?.update(0)}i.renderer.render(i.scene,t),i.drawLabels?.()}function H_(i,{onChange:t=()=>{}}={}){const e=["camera-zoom","camera-zoom-value","camera-fov","camera-fov-value","camera-reset","camera-follow"],[n,s,r,o,a,l]=e.map(g=>{const x=i.$(g);if(!x)throw new Error(`Camera settings need #${g}`);return x});n.min="70",n.max="150",n.step="5",r.min="40",r.max="80",r.step="1";const c=()=>{const g=vf(i.settings);return Object.assign(i.settings,g),n.value=String(Math.round(g.cameraZoom*100)),s.textContent=n.value+"%",r.value=String(g.cameraFov),o.textContent=r.value+"°",l.value=g.cameraAutoRotate?"auto":"manual",g},h=()=>{const g=c();B_(i),t(g)},u=()=>{i.settings.cameraZoom=Number(n.value)/100,h()},d=()=>{i.settings.cameraFov=Number(r.value),h()},f=()=>{i.settings.cameraAutoRotate=l.value!=="manual",i.cameraFollow?.reset(),h()},m=()=>{Object.assign(i.settings,{cameraZoom:za.cameraZoom,cameraFov:za.cameraFov}),h()};return n.addEventListener("input",u),r.addEventListener("input",d),a.addEventListener("click",m),l.addEventListener("change",f),c(),()=>{n.removeEventListener("input",u),r.removeEventListener("input",d),a.removeEventListener("click",m),l.removeEventListener("change",f)}}const md=(i,t,e)=>Math.max(t,Math.min(e,i)),$l=i=>Math.atan2(Math.sin(i),Math.cos(i));class G_{constructor(){this.reset()}reset(){this.releaseMovement(),this.manualTime=0}releaseMovement(){this.basis=null,this.heading=null,this.turnTime=0}manual(){this.releaseMovement(),this.manualTime=1.25}movement(t,e,n,s,{enabled:r=!0,dragging:o=!1,continuous:a=!1}={}){const l=Math.hypot(t,e);if(l<=.08)return this.releaseMovement(),{x:0,z:0};if(!r||o)return this.releaseMovement(),lo(t,e,n,s);const c={x:t/l,y:e/l};return(!this.basis||!this.heading||!a&&c.x*this.heading.x+c.y*this.heading.y<Math.cos(.12))&&(this.basis=x_(n,s),this.heading=c,this.turnTime=0),lo(t,e,this.basis.camera,this.basis.focus)}update(t,{dt:e=0,enabled:n=!0,mode:s="chase3d",moving:r={x:0,z:0},aiming:o=!1,dragging:a=!1,active:l=!0}={}){if(e=md(Number.isFinite(e)?e:0,0,.05),!l||e===0)return t;if(a)return this.manual(),t;if(this.manualTime=Math.max(0,this.manualTime-e),!n||s!=="chase3d"||o||this.manualTime>0||Math.hypot(r.x,r.z)<=.08)return this.turnTime=0,t;if(this.turnTime+=e,this.turnTime<.22)return t;const c=$l(Math.atan2(r.x,r.z)-t);if(Math.abs(c)<.002)return $l(t+c);const h=md(c*(1-Math.exp(-e*3.2)),-1.8*e,1.8*e);return $l(t+h)}}const Pi=1e-7,fa=i=>i&&Number.isFinite(i.x)&&Number.isFinite(i.y)&&Number.isFinite(i.z),Yl=(i,t)=>i.x*t.x+i.y*t.y+i.z*t.z,pa=(i,t)=>({x:i.x-t.x,y:i.y-t.y,z:i.z-t.z}),Zl=(i,t,e)=>({x:i.x+t.x*e,y:i.y+t.y*e,z:i.z+t.z*e});function V_({rayOrigin:i,rayDirection:t,muzzle:e,range:n,hits:s=[]}={}){const r=fa(e)?e:{x:0,y:0,z:0},o=fa(i)?i:r,a=fa(t)?Math.hypot(t.x,t.y,t.z):0,l=a>Pi?{x:t.x/a,y:t.y/a,z:t.z/a}:{x:0,y:0,z:-1},c=Number.isFinite(n)&&n>Pi?n:1;let h=null,u=1/0;for(const p of s||[]){const v=p?.point??p;if(!fa(v))continue;const y=pa(v,r),_=pa(v,o),T=Yl(_,l),A=Math.hypot(y.x,y.y,y.z);T<=Pi||T>=u||A<=Pi||A>c+Pi||(h=v,u=T)}const d=h?"hit":"range";if(!h){const p=pa(o,r),v=Yl(p,l),y=v*v-Yl(p,p)+c*c,_=y>=0?-v+Math.sqrt(y):-1;if(_>Pi)h=Zl(o,l,_);else{const T=Math.max(0,-v);h=Zl(o,l,T>Pi?T:c)}}const f=pa(h,r),m=Math.hypot(f.x,f.y,f.z),g=m>Pi?{x:f.x/m,y:f.y/m,z:f.z/m}:l,x=m>Pi?Math.min(c,m):c;return{target:Zl(r,g,x),direction:g,distance:x,source:d}}const Qe=L,jl=new Qe(0,1,0),W_=an.muzzleOffset+At.projectileSpeed*At.projectileLifetime,ma=(i,t,e)=>Math.max(t,Math.min(e,i)),ga=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]),Kl=i=>{try{return localStorage.getItem(i)}catch{return null}},Jr=(i,t)=>{try{return localStorage.setItem(i,t),!0}catch{return!1}},Dr=i=>`<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">${i}</svg>`,gd=Dr('<ellipse cx="21" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(-30 21 23)"/><ellipse cx="43" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(30 43 23)"/><ellipse cx="32" cy="37" rx="10" ry="15" fill="#344b50" stroke="#12282b" stroke-width="3"/><circle cx="27" cy="25" r="5" fill="#fff6cd"/><circle cx="37" cy="25" r="5" fill="#fff6cd"/><circle cx="28" cy="25" r="2" fill="#14282c"/><circle cx="36" cy="25" r="2" fill="#14282c"/>'),X_=Dr('<path d="m15 8 11 5-4 21 29 6 4 10-36 4-9-11z" fill="#d3ff80" stroke="#314b2d" stroke-width="3"/><path d="m46 13 4 8m9-5-6 9m9 4-9 1" stroke="#ffce71" stroke-width="4"/>'),q_=Dr('<path d="M9 50h46M18 47l10-28 18 28M31 27l20-17" stroke="#d9bf82" stroke-width="6" stroke-linecap="round"/><path d="m45 9 13 4-4 10-12-5z" fill="#8ea29a"/><circle cx="17" cy="53" r="6" fill="#6d4e35"/><circle cx="48" cy="53" r="6" fill="#6d4e35"/>'),xd=Dr('<path d="M18 10v44l36-22z" fill="#f3ffd0" stroke="#264e26" stroke-width="4" stroke-linejoin="round"/>'),$_=Dr('<path d="M12 18h40M12 32h40M12 46h40" stroke="#e9f3e5" stroke-width="5" stroke-linecap="round"/><circle cx="24" cy="18" r="6" fill="#fbc562"/><circle cx="42" cy="32" r="6" fill="#fbc562"/><circle cx="24" cy="46" r="6" fill="#fbc562"/>'),Y_=Dr('<path d="M8 29 32 9l24 20M14 27v29h36V27" stroke="#f4dfad" stroke-width="5" stroke-linejoin="round"/><path d="M24 56V35h16v21" fill="#243e36" stroke="#f4dfad" stroke-width="3"/><path d="m12 12 11 10m29-10L41 22" stroke="#ffad7a" stroke-width="4"/>');class Z_{constructor(){this.volume=.5,this.ctx=null,this.gain=null}resume(){try{this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext),this.gain=this.ctx.createGain(),this.gain.connect(this.ctx.destination)),this.gain.gain.value=this.volume,this.ctx.resume()}catch{}}pause(){this.ctx&&(this.gain.gain.value=0,this.ctx.suspend().catch(()=>{}))}play(t){if(!this.ctx||this.ctx.state!=="running"||this.volume<=0)return;const e=this.ctx,n=e.currentTime,s=e.createOscillator(),r=e.createGain(),a={shot:[200,70,.065],tongue:[560,150,.11],hit:[110,45,.12],hitConfirm:[860,530,.07],storageAlert:[740,480,.3],stoneShot:[110,65,.2],stoneImpact:[75,35,.3],land:[95,50,.13],dizzy:[700,240,.28],ko:[80,330,.26],win:[400,800,.45],lost:[220,55,.4]}[t];a&&(s.type=t==="hit"?"triangle":"sine",s.frequency.setValueAtTime(a[0],n),s.frequency.exponentialRampToValueAtTime(a[1],n+a[2]),r.gain.setValueAtTime(1e-4,n),r.gain.exponentialRampToValueAtTime(.14,n+.008),r.gain.exponentialRampToValueAtTime(1e-4,n+a[2]),s.connect(r),r.connect(this.gain),s.start(n),s.stop(n+a[2]+.01),s.onended=()=>{s.disconnect(),r.disconnect()})}}class j_{constructor(){this.touch=matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>0,this.settings={volume:.5,quality:this.touch?"low":"high"};try{Object.assign(this.settings,JSON.parse(Kl(la)||"{}"))}catch{}Object.assign(this.settings,vf(this.settings)),this.storageAlertUntil=-1/0,this.settings.volume=ma(Number(this.settings.volume)||0,0,1),["low","high"].includes(this.settings.quality)||(this.settings.quality="low");const t=Kl(aa);try{JSON.parse(t)?.version===1&&!Kl(aa+"-before-bases")&&Jr(aa+"-before-bases",t)}catch{}this.state=qc(),this.saved=p_(t),this.running=!1,this.mode="title",this.keys=new Set,this.actions={fire:!1,kick:!1,sabotage:!1},this.aimStrength=0,this.lastMouseAim=-1/0,this.move={x:0,z:0},this.aim={x:0,z:-1},this.mouse={x:0,y:0,valid:!1},this.pointers=new Map,this.layoutEditing=!1,this.fx=[],this.particles=[],this.splats=[],this.tongues=new Map,this.bulletMeshes=new Map,this.koTimes=new Map,this.elapsed=0,this.shake=0,this.saveClock=0,this.accumulator=0,this.failures=[],this.hitConfirmUntil=0,this.lastPlayerHit=null,this.scene=new fm,this.scene.background=new ee("#9fe4ff"),this.scene.fog=new Ia("#baf0ea",.006),this.renderer=new Py({antialias:!this.touch,powerPreference:"high-performance"}),this.renderer.domElement.id="arcade-world",this.renderer.domElement.setAttribute("aria-label","FROG — κωμική μάχη με μύγες"),this.renderer.outputColorSpace=Un,this.renderer.toneMapping=_d,this.renderer.toneMappingExposure=1.3,document.body.append(this.renderer.domElement),this.camera=new Nn(this.settings.cameraFov,innerWidth/innerHeight,.1,250),this.camera.position.set(0,8,15),this.focus=new Qe(0,2,3),this.cameraTarget=new Qe(0,8,15),this.viewMode="chase3d",this.cameraReady=!1,this.cameraYaw=kn.yaw,this.cameraPitch=kn.pitch,this.cameraDrag=null,this.cameraFollow=new G_,this.lastMovement={x:0,z:0},this.stickAim={x:0,z:-1},this.mouseRay=new Tl,this.mousePoint=new Qe,this.mouseNdc=new Wt,this.mousePlane=new fi(jl,0),this.scene.add(new Hm("#def8ff","#52733a",2.6)),this.sun=new Xm("#fff1bf",3.2),this.sun.position.set(-16,36,12),this.scene.add(this.sun),this.world=u1(this.scene,this.renderer,{seed:731,natural:!0});for(const s of[...this.world.creekRefuges])this.world.removeShelter(s.mesh);const e=(s,r)=>this.world.getSurface(s,r).height;this.houseFloors=[...S1(e),...w1(e)];const n=this.world.group.getObjectByName("Fly swarms");n&&(n.visible=!1);for(const s of this.world.hotspots)s.flies=0;this.labels=document.createElement("canvas"),this.labels.id="arcade-labels",document.body.append(this.labels),this.labelCtx=this.labels.getContext("2d"),this.sound=new Z_,this.sound.volume=this.settings.volume,this.shared={sphere:new Jn(1,10,7),wing:new Jn(1,6,4),cylinder:new Us(1,1,1,8),circle:new La(1,18)},this.materials={insect:new We({color:"#263f42",roughness:.8,metalness:0}),wing:new _n({color:"#edfcff",transparent:!0,opacity:.86,side:Pe,depthWrite:!1}),tongue:new We({color:"#ff839c",roughness:.4}),shot:new We({color:"#384b4d",emissive:"#a6c9bf",emissiveIntensity:.16}),ink:new _n({color:"#90e44c",transparent:!0,opacity:.9,depthWrite:!1,side:Pe}),rock:new We({color:"#617b70",roughness:.9}),rim:new _n({color:"#eaff9e",transparent:!0,opacity:.6,depthWrite:!1})},this.createArena(),this.models=[],this.buildActors(),this.createFlies(),this.artilleryView=new E_(this),this.basesView=new D_(this),this.impactEffects=new P_(this),this.createUI(),this.bindInputs(),this.applyQuality(),this.resize(),this.showTitle(),window.__FROG__={version:Gl,mode:"arcade",inspect:()=>this.inspect(),save:()=>this.persist()},new URLSearchParams(location.search).has("test")&&(window.__FROG__.test={step:(s,r=1)=>{for(let o=0;o<r;o++)ad(this.state,s,1/60),this.consumeEvents();this.updateHUD()},state:()=>this.state,setState:s=>{this.state=s,this.buildActors(),this.updateHUD()},input:()=>this.currentInput(),kickTarget:()=>$c(this.state,this.state.actors[0])?.id}),this.last=performance.now(),H_(this,{onChange:()=>Jr(la,JSON.stringify(this.settings))}),this.renderer.setAnimationLoop(s=>this.frame(s)),document.getElementById("boot")?.remove()}ground(t,e){return E1(t,e,this.houseFloors)??this.world.getSurface(t,e).height}createArena(){this.obstacleMeshes=[];for(const n of fs){const s=new Zt(new Ua(n.r,1),this.materials.rock);s.scale.y=1.7,s.position.set(n.x,this.ground(n.x,n.z)+n.r*.9,n.z),this.scene.add(s),this.obstacleMeshes.push(s)}const t=[];for(let n=0;n<=160;n++){const s=n/160*Math.PI*2,r=Math.sin(s)*At.radius,o=Math.cos(s)*At.radius;t.push(new Qe(r,this.ground(r,o)+.06,o))}const e=new go(new we().setFromPoints(t),this.materials.rim);this.scene.add(e),this.playerRing=new Zt(new rs(1.05,1.18,32),new _n({color:"#ecff9a",side:Pe,transparent:!0,opacity:.85,depthWrite:!1})),this.playerRing.rotation.x=-Math.PI/2,this.scene.add(this.playerRing),this.aimGuide=new go(new we().setFromPoints([new Qe,new Qe]),new Wd({color:"#fff2b0",dashSize:.45,gapSize:.35,transparent:!0,opacity:.65})),this.scene.add(this.aimGuide),this.aimReticle=new Zt(new rs(.35,.42,24),new _n({color:"#fff2b0",side:Pe,transparent:!0,opacity:.88,depthWrite:!1})),this.aimReticle.rotation.x=-Math.PI/2,this.scene.add(this.aimReticle),this.targetRing=new Zt(new rs(1.32,1.44,32),new _n({color:"#ffb19c",side:Pe,transparent:!0,opacity:.9,depthWrite:!1})),this.targetRing.rotation.x=-Math.PI/2,this.targetRing.visible=!1,this.scene.add(this.targetRing),this.swarmRings=Cr.map(n=>{const s=new Zt(new rs(n.radius-.08,n.radius+.03,40),new _n({color:"#c8e0a3",side:Pe,transparent:!0,opacity:.22,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.set(n.x,this.ground(n.x,n.z)+.08,n.z),this.scene.add(s),s})}buildActors(){G1(this.state,{ground:(t,e)=>this.ground(t,e)});for(const t of this.models||[])t.dispose();this.models=this.state.actors.map((t,e)=>{const n=M1("frog",{seed:7+e*39,team:e===0?"player":`enemy${e}`,role:e===2?"bruiser":"hunter",tier:1,level:1});if(n.setEquipment({}),n.setOutline(e===0?"#e7fca7":e===1?"#ffae88":"#d3a8ff",!0),this.settings.quality==="low"&&n.setRenderLOD(1),n.mesh?.material){const s=n.mesh.material;s.bumpScale=0,s.roughness=.85,s.userData?.tint?.set(["#86da38","#ff694a","#bb70ed"][e])}return F_(n),this.scene.add(n.group),n})}createFlies(){const t=this.state.flies.length;this.flyBodies=new En(this.shared.sphere,this.materials.insect,t),this.flyWings=new En(this.shared.wing,this.materials.wing,t*2);for(const e of[this.flyBodies,this.flyWings])e.instanceMatrix.setUsage(Ii),e.frustumCulled=!1,this.scene.add(e);this.dummy=new Xe}createUI(){this.ui=document.createElement("div"),this.ui.id="arcade-ui",this.ui.classList.toggle("is-touch",this.touch),this.ui.innerHTML=`<header id="arcade-hud" hidden><button class="view-button" id="view-button" aria-label="Αλλαγή σε κεντραρισμένη κάτοψη">ΠΙΣΩ 3D · C</button><div class="ammo-card">${gd}<div class="ammo-info"><div class="ammo-numbers"><strong id="ammo-count">0 / ${At.capacity}</strong><b id="ammo-percent">0%</b></div><div id="ammo-track" role="progressbar" aria-label="Γέμιση με μύγες" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="ammo-fill"></i></div><span id="ammo-state">Γέμισε στην αποθήκη σου</span></div></div><div class="ko-card base-card"><b id="ko-count">3 / 3</b><span>ΑΠΟΘΗΚΕΣ</span><div id="base-dots" aria-label="Άθικτες αποθήκες"><i data-owner="player"></i><i data-owner="rival-1"></i><i data-owner="rival-2"></i></div></div><button class="small-button" id="pause-button" aria-label="Παύση">Ⅱ</button></header>
  <div id="round-status" hidden><b id="round-time">20″</b><span id="round-copy">ΠΡΟΕΤΟΙΜΑΣΙΑ · Προστάτεψε την αποθήκη σου</span></div><div id="base-status" hidden><b id="base-warning-title" role="alert" aria-atomic="true"></b><span id="base-warning-detail"></span></div>
  <button id="catapult-button" class="touch-action catapult-button" aria-label="Χρήση κοντινού καταπέλτη" hidden>${q_}<span>ΧΡΗΣΗ</span></button><div id="catapult-status" hidden></div>
  <button id="sabotage-button" class="touch-action sabotage-button" aria-label="Κράτησε για καταστροφή εχθρικής αποθήκης" hidden>${Y_}<span>ΚΡΑΤΑ · 10″</span></button><div id="sabotage-status" hidden><span id="sabotage-copy"></span><div role="progressbar" aria-label="Καταστροφή αποθήκης" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="sabotage-track"><i id="sabotage-fill"></i></div></div>
  <canvas id="minimap" width="320" height="320" aria-label="Χάρτης: η βάση σου πράσινη, εχθρικές αποθήκες κόκκινη και μωβ, είσοδοι, καταπέλτες και σμήνη"></canvas><div id="dizzy-banner" hidden>🌀 ΖΑΛΙΣΤΗΚΕΣ! <b id="dizzy-time"></b></div><div id="callout" aria-live="polite"></div>
  <div id="desktop-help" hidden><span><b>WASD</b> Κίνηση</span><span><b>Ποντίκι</b> Ελεύθερη στόχευση</span><span><b>Κλικ</b> Μύγες</span><span><b>E κράτημα</b> Αποθήκη</span><span><b>E</b> Καταπέλτης</span><span id="pc-kick"><b>Q</b> Κλωτσιά</span></div>
  <div id="touch-controls" hidden><div class="stick-zone move-zone"><div id="move-stick" class="stick" aria-label="Κίνηση"><div class="stick-inner"></div><div class="stick-knob"></div></div><span class="stick-caption">ΑΛΜΑΤΑ</span></div><button id="kick-button" class="touch-action kick-button" aria-label="Αμυντική κλωτσιά για απώθηση κοντινού αντιπάλου" hidden disabled>${X_}<span>ΚΛΩΤΣΙΑ</span></button><button id="fire-button" class="touch-action fire-button" aria-label="Κράτησε για εκτόξευση μυγών">${gd}<span>ΠΥΡ</span></button><div class="stick-zone aim-zone"><div id="aim-stick" class="stick" aria-label="Στόχευση"><div class="fire-ring"></div><div class="stick-inner"></div><div class="stick-knob"></div><span class="aim-center" aria-hidden="true">+</span></div><span class="stick-caption">ΣΤΟΧΕΥΣΗ</span></div><button id="layout-button" class="layout-button" aria-label="Μετακίνηση χειριστηρίων"><b aria-hidden="true">↔</b><span>ΘΕΣΕΙΣ</span></button><div id="layout-hint" hidden>Σύρε τα χειριστήρια στη θέση σου.</div></div>
  <section id="arcade-menu" class="menu"><div id="menu-main" class="menu-buttons"><button id="play-button" class="art-button play-button">${xd}<span>ΠΑΙΞΕ</span></button><button id="settings-button" class="art-button settings-button">${$_}<span>ΡΥΘΜΙΣΕΙΣ</span></button><button id="new-round-button" class="plain-button" hidden>ΝΕΟΣ ΓΥΡΟΣ</button></div><div id="settings-panel" class="settings-panel" hidden><h2>Ρυθμίσεις</h2><div class="settings-grid"><label>Ήχος <input id="volume" type="range" min="0" max="100" value="${Math.round(this.settings.volume*100)}"></label><label>Γραφικά <select id="quality"><option value="low">Ομαλή κίνηση</option><option value="high">Υψηλά</option></select></label></div><div class="camera-settings-heading"><h3>Κάμερα</h3><select id="camera-follow" aria-label="Περιστροφή κάμερας"><option value="auto">Αυτόματη</option><option value="manual">Χειροκίνητη</option></select><button id="camera-reset" type="button">ΕΠΑΝΑΦΟΡΑ</button></div><div class="settings-grid camera-settings-grid"><label for="camera-zoom"><span>Zoom <output id="camera-zoom-value" for="camera-zoom">100%</output></span><input id="camera-zoom" type="range" min="70" max="150" step="5" value="100"></label><label for="camera-fov"><span>Οπτικό πεδίο <output id="camera-fov-value" for="camera-fov">52°</output></span><input id="camera-fov" type="range" min="40" max="80" step="1" value="52" aria-label="Οπτικό πεδίο FOV σε μοίρες"></label></div><button id="settings-back" class="art-button compact">ΠΙΣΩ</button></div><div id="result-panel" class="result-panel" hidden><span class="result-kicker">FROG • FLY FRENZY</span><h1 id="result-title"></h1><p id="result-copy"></p><button id="replay-button" class="art-button play-button">${xd}<span>ΠΑΙΞΕ ΞΑΝΑ</span></button><button id="result-settings" class="plain-button">Ρυθμίσεις</button></div><span class="version">FROG ${Gl}</span></section>`,document.body.append(this.ui),this.$=t=>this.ui.querySelector("#"+t),this.$("quality").value=this.settings.quality,this.$("view-button").onclick=()=>this.toggleView(),this.$("play-button").onclick=()=>this.startOrResume(),this.$("pause-button").onclick=()=>this.pause(),this.$("settings-button").onclick=()=>this.settingsMenu(),this.$("result-settings").onclick=()=>this.settingsMenu(),this.$("settings-back").onclick=()=>{this.$("arcade-menu").classList.remove("settings-open"),this.$("settings-panel").hidden=!0,this.mode==="result"?this.$("result-panel").hidden=!1:this.$("menu-main").hidden=!1},this.$("replay-button").onclick=()=>this.startNew(),this.$("new-round-button").onclick=()=>this.startNew(),this.$("volume").oninput=t=>{this.settings.volume=Number(t.target.value)/100,this.sound.volume=this.settings.volume,Jr(la,JSON.stringify(this.settings))},this.$("quality").onchange=t=>{this.settings.quality=t.target.value,this.applyQuality(),Jr(la,JSON.stringify(this.settings))},this.touchLayout=N_({root:this.$("touch-controls"),movePad:this.ui.querySelector(".move-zone"),aimPad:this.ui.querySelector(".aim-zone"),fireButton:this.$("fire-button"),toggleButton:this.$("layout-button"),storageKey:"frog-touch-layout-v1",onEditingChange:t=>{this.layoutEditing=t,this.clearInputs(),this.accumulator=0,t?this.sound.pause():this.running&&this.sound.resume()},announce:t=>this.message(t,2)})}showTitle(){this.running=!1,this.mode="title",this.$("play-button").querySelector("span").textContent=this.saved?.status==="playing"?"ΣΥΝΕΧΕΙΑ":"ΠΑΙΞΕ",this.$("new-round-button").hidden=this.saved?.status!=="playing",this.ui.classList.add("in-menu")}settingsMenu(){this.$("arcade-menu").classList.add("settings-open"),this.$("menu-main").hidden=!0,this.$("result-panel").hidden=!0,this.$("settings-panel").hidden=!1}startOrResume(){if(this.mode==="pause"){this.go();return}this.saved?.status==="playing"?(this.state=this.saved,this.saved=null,this.resetCamera(),this.buildActors(),this.go()):this.startNew()}toggleView(){this.cameraFollow.reset(),this.stopCameraDrag(),this.mouse.valid=!1,this.viewMode=this.viewMode==="chase3d"?"overview":"chase3d",this.$("view-button").textContent=this.viewMode==="chase3d"?"ΠΙΣΩ 3D · C":"ΚΑΤΟΨΗ · C",this.$("view-button").setAttribute("aria-label",this.viewMode==="chase3d"?"Αλλαγή σε κεντραρισμένη κάτοψη":"Αλλαγή σε κάμερα πίσω από τον βάτραχο"),this.cameraReady=!1}startNew(){this.storageAlertUntil=-1/0,this.saved=null,this.state=qc(731+Math.floor(Math.random()*1e5)),this.resetCamera(),this.clearEffects(),this.buildActors(),this.go(),this.message("60 μύγες έτοιμες!",1.6)}resetCamera(){this.cameraFollow.reset();const t=this.state.actors[0],e=m_(t);this.cameraYaw=Math.atan2(e.x,e.z),this.cameraPitch=kn.pitch,this.cameraReady=!1,this.mouse.valid=!1,this.aim={x:t.aimX,z:t.aimZ},this.stopCameraDrag()}beginCameraDrag(t){if(this.cameraDrag)return;this.cameraFollow.manual(),this.viewMode==="overview"&&this.toggleView(),this.mouse.valid=!1,this.actions.fire=!1,this.cameraDrag={id:t.pointerId,type:t.pointerType,x:t.clientX,y:t.clientY};const e=this.renderer.domElement;e.setPointerCapture(t.pointerId),e.classList.add("camera-dragging")}stopCameraDrag(){const t=this.cameraDrag;this.cameraDrag=null;const e=this.renderer?.domElement;t&&e?.hasPointerCapture?.(t.id)&&e.releasePointerCapture(t.id),e?.classList.remove("camera-dragging")}go(){this.$("arcade-menu").classList.remove("settings-open"),this.clearInputs(),this.accumulator=0,this.last=performance.now(),this.running=!0,this.mode="play",this.$("new-round-button").hidden=!0,this.$("arcade-menu").hidden=!0,this.$("settings-panel").hidden=!0,this.$("result-panel").hidden=!0,this.$("menu-main").hidden=!1,this.$("arcade-hud").hidden=!1,this.$("desktop-help").hidden=this.touch,this.$("touch-controls").hidden=!this.touch,this.ui.classList.remove("in-menu"),this.sound.resume(),this.updateHUD(),this.touchLayout?.refresh(),this.persist()}pause(){this.running&&(this.touchLayout?.setEditing(!1),this.running=!1,this.mode="pause",this.clearInputs(),this.persist(),this.sound.pause(),this.$("arcade-menu").hidden=!1,this.$("menu-main").hidden=!1,this.$("settings-panel").hidden=!0,this.$("play-button").querySelector("span").textContent="ΣΥΝΕΧΕΙΑ",this.$("new-round-button").hidden=!1,this.ui.classList.add("in-menu"))}finish(){this.touchLayout?.setEditing(!1),this.running=!1,this.mode="finishing",this.resultAt=this.elapsed+.85,this.clearInputs(),this.persist()}showResult(){this.running=!1,this.mode="result",this.clearInputs(),this.persist();const t=this.state.status==="won";this.sound.play(t?"win":"lost"),this.$("arcade-menu").hidden=!1,this.$("menu-main").hidden=!0,this.$("result-panel").hidden=!1,this.$("result-title").textContent=t?"Η ΤΕΛΕΥΤΑΙΑ ΑΠΟΘΗΚΗ ΕΙΝΑΙ ΔΙΚΗ ΣΟΥ!":"Η ΑΠΟΘΗΚΗ ΣΟΥ ΚΑΤΑΣΤΡΑΦΗΚΕ",this.$("result-copy").textContent=t?`${this.state.stats.kos} νοκ άουτ · ${this.state.stats.shots} βολές · ${Math.floor(this.state.time)}″ μάχης`:"Κράτησε την είσοδο, διέκοψε τους εισβολείς με μία εύστοχη βολή και ανεφοδιάσου πριν ξαναβγείς.",this.ui.classList.add("in-menu")}persist(){return this.mode==="title"?!1:Jr(aa,f_(this.state))}clearInputs(){if(this.cameraFollow?.reset(),this.lastMovement={x:0,z:0},this.renderer?.domElement.classList.remove("mouse-aiming"),this.currentAimPreview=null,this.currentAimScreen=null,this.aimGuide&&(this.aimGuide.visible=!1),this.aimReticle&&(this.aimReticle.visible=!1),this.targetRing&&(this.targetRing.visible=!1),this.keys.clear(),this.actions={fire:!1,kick:!1,sabotage:!1},this.aimStrength=0,this.mouse.valid=!1,this.lastMouseAim=-1/0,this.move={x:0,z:0},this.pointers.clear(),this.stopCameraDrag(),this.ui){for(const t of this.ui.querySelectorAll(".stick-knob"))t.style.transform="translate(-50%,-50%)";this.$("aim-stick").classList.remove("firing"),this.$("fire-button")?.classList.remove("firing")}}bindInputs(){addEventListener("keydown",s=>{if(!s.target.matches("input,select")){if(s.code==="Escape"){if(s.preventDefault(),this.layoutEditing){this.touchLayout.setEditing(!1);return}this.running?this.pause():this.mode==="pause"&&this.go();return}if(!(!this.running||this.layoutEditing)){if(s.code==="KeyC"&&!s.repeat){s.preventDefault(),this.toggleView();return}(ga.has(s.code)||["KeyQ","KeyE"].includes(s.code))&&(s.preventDefault(),this.keys.add(s.code))}}}),addEventListener("keyup",s=>{this.keys.delete(s.code),ga.has(s.code)&&![...this.keys].some(r=>ga.has(r))&&Math.hypot(this.move.x,this.move.z)<=.08&&this.cameraFollow.releaseMovement()});const t=this.renderer.domElement;t.addEventListener("pointermove",s=>{if(!(!this.running||this.layoutEditing)){if(s.pointerType==="mouse"&&(this.cameraDrag?.type==="mouse"&&!(s.buttons&2)&&this.stopCameraDrag(),s.buttons&2&&!this.cameraDrag&&this.beginCameraDrag(s)),this.cameraDrag){if(s.pointerId!==this.cameraDrag.id)return;s.preventDefault();const r=g_({yaw:this.cameraYaw,pitch:this.cameraPitch},s.clientX-this.cameraDrag.x,s.clientY-this.cameraDrag.y);this.cameraYaw=r.yaw,this.cameraPitch=r.pitch,this.cameraDrag.x=s.clientX,this.cameraDrag.y=s.clientY;return}s.pointerType==="mouse"&&this.captureMouseAim(s)}}),t.addEventListener("pointerdown",s=>{if(!(!this.running||this.layoutEditing)){if(s.preventDefault(),s.button===2||s.pointerType==="touch"){this.beginCameraDrag(s);return}s.button===0&&!this.cameraDrag&&(this.captureMouseAim(s),this.actions.fire=!0)}}),addEventListener("pointerup",s=>{this.cameraDrag?.id===s.pointerId&&(s.button===2||s.pointerType==="touch")&&this.stopCameraDrag(),s.pointerType!=="touch"&&s.button===0&&(this.actions.fire=!1)}),t.addEventListener("pointercancel",s=>{this.cameraDrag?.id===s.pointerId&&this.stopCameraDrag(),this.actions.fire=!1}),t.addEventListener("pointerleave",s=>{s.pointerType==="mouse"&&!s.buttons&&!this.cameraDrag&&(this.mouse.valid=!1,t.classList.remove("mouse-aiming"))}),t.addEventListener("lostpointercapture",s=>{this.cameraDrag?.id===s.pointerId&&this.stopCameraDrag()}),t.addEventListener("contextmenu",s=>s.preventDefault());const e=(s,r)=>{const o=this.$(s),a=o.querySelector(".stick-knob");let l=null;const c=u=>{const d=o.getBoundingClientRect(),f=(u.clientX-d.left-d.width/2)/(d.width/2),m=(u.clientY-d.top-d.height/2)/(d.height/2),g=e_(f,m),x=Math.hypot(f,m),p=x>1?1/x:1;a.style.transform=`translate(-50%,-50%) translate(${f*p*d.width*.31}px,${m*p*d.height*.31}px)`,r==="move"?this.move={x:g.x,z:g.z}:(this.aimStrength=Math.min(1,x),x>.08&&(this.stickAim={x:f/x,z:m/x})),this.mouse.valid=!1};o.onpointerdown=u=>{!this.running||this.layoutEditing||l!==null&&this.pointers.has(r)||(u.preventDefault(),l=u.pointerId,this.pointers.set(r,l),o.setPointerCapture(u.pointerId),c(u))},o.onpointermove=u=>{!this.layoutEditing&&l===u.pointerId&&this.pointers.get(r)===l&&(u.preventDefault(),c(u))};const h=u=>{u.pointerId===l&&(l=null,this.pointers.delete(r),a.style.transform="translate(-50%,-50%)",r==="move"?(this.move={x:0,z:0},this.cameraFollow.releaseMovement()):(this.aimStrength=0,o.classList.remove("firing")))};o.onpointerup=h,o.onpointercancel=h,o.onlostpointercapture=h};e("move-stick","move"),e("aim-stick","aim");const n=(s,r)=>{const o=this.$(s);let a=null;o.onpointerdown=c=>{!this.running||this.layoutEditing||o.disabled||(c.preventDefault(),a=c.pointerId,o.setPointerCapture(c.pointerId),this.actions[r]=!0)};const l=c=>{c.pointerId===a&&(a=null,this.actions[r]=!1)};o.onpointerup=l,o.onpointercancel=l,o.onlostpointercapture=l};n("kick-button","kick"),n("fire-button","fire"),n("sabotage-button","sabotage"),addEventListener("blur",()=>{this.clearInputs(),this.running&&this.pause()}),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.clearInputs(),this.pause(),this.sound.pause())}),addEventListener("beforeunload",()=>this.persist()),addEventListener("resize",()=>{this.clearInputs(),this.resize()})}applyQuality(){const t=this.settings.quality==="low";this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,t?1:1.5));for(const e of this.models)e.setRenderLOD(t?1:0);this.resize()}resize(){const t=innerWidth,e=innerHeight;this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.cameraReady=!1,this.labels.width=t,this.labels.height=e,this.w=t,this.h=e,this.touchLayout?.refresh()}captureMouseAim(t){this.mouse.x=t.clientX,this.mouse.y=t.clientY,this.mouse.valid=!0,this.lastMouseAim=performance.now(),this.updateMouseTarget()}updateMouseTarget(){if(!this.mouse.valid||this.cameraDrag)return;const t=this.state.actors[0];if(this.mouseNdc.set(this.mouse.x/this.w*2-1,1-this.mouse.y/this.h*2),this.mouseRay.setFromCamera(this.mouseNdc,this.camera),t.catapultId){if(this.mousePlane.constant=-this.ground(t.x,t.z)-.9,this.mouseRay.ray.intersectPlane(this.mousePlane,this.mousePoint))this.mouse.target={x:this.mousePoint.x,y:this.mousePoint.y,z:this.mousePoint.z};else{const u=this.mouseRay.ray.direction,d=Math.hypot(u.x,u.z),f=lo(0,-1,this.camera.position,this.focus);this.mouse.target={x:t.x+(d>1e-6?u.x/d:f.x)*ze.maxRange,y:this.ground(t.x,t.z),z:t.z+(d>1e-6?u.z/d:f.z)*ze.maxRange}}this.mouse.direction=null;return}const e=Xc(this.state,t),n=this.mouseRay.ray,s=W_,r=e.x-n.origin.x,o=e.y-n.origin.y,a=e.z-n.origin.z,l=Math.max(0,r*n.direction.x+o*n.direction.y+a*n.direction.z),c=i_(this.state,n.origin,n.direction,Math.hypot(r,o,a)+s,{ignoreId:t.id,solidFrom:l}),h=V_({rayOrigin:n.origin,rayDirection:n.direction,muzzle:e,range:s,hits:c?[c]:[]});this.mouse.target=h.target,this.mouse.direction=h.direction,this.mouse.distance=h.distance}aimFromScreen(t,e){const n=this.state.actors[0],s=this.ground(n.x,n.z)+.9,r=this.project(n.x,s,n.z),o=Math.min(this.w,this.h)*.34,a=new Qe,l=new Tl;if(l.setFromCamera(new Wt((r.x+t*o)/this.w*2-1,1-(r.y+e*o)/this.h*2),this.camera),l.ray.intersectPlane(new fi(jl,-s),a)){const c=a.x-n.x,h=a.z-n.z,u=Math.hypot(c,h);if(u>.05&&Number.isFinite(u))return{x:c/u,z:h/u,distance:u}}return lo(t,e,this.camera.position,this.focus)}currentInput(){if(this.layoutEditing)return{};const t=this.state.actors[0],e=this.pointers.has("aim")&&this.aimStrength>.08,n=!this.cameraDrag&&(this.actions.fire||e||this.mouse.valid);if(e&&(this.aim={...lo(this.stickAim.x,this.stickAim.z,this.camera.position,this.focus),distance:14}),this.updateMouseTarget(),this.mouse.valid&&n&&this.mouse.target)if(!t.catapultId&&this.mouse.direction)this.aim={...this.mouse.direction,distance:this.mouse.distance};else{const r=this.mouse.target.x-t.x,o=this.mouse.target.z-t.z,a=Math.hypot(r,o);a>.1&&(this.aim={x:r/a,z:o/a,distance:a})}const s=this.cameraFollow.movement(this.move.x+(this.keys.has("KeyD")||this.keys.has("ArrowRight")?1:0)-(this.keys.has("KeyA")||this.keys.has("ArrowLeft")?1:0),this.move.z+(this.keys.has("KeyS")||this.keys.has("ArrowDown")?1:0)-(this.keys.has("KeyW")||this.keys.has("ArrowUp")?1:0),this.camera.position,this.focus,{enabled:this.settings.cameraAutoRotate&&this.viewMode==="chase3d",dragging:!!this.cameraDrag,continuous:this.pointers.has("move")&&![...this.keys].some(r=>ga.has(r))});return this.lastMovement=s,{mx:s.x,mz:s.z,ax:this.aim.x,ay:this.aim.y,az:this.aim.z,aiming:n,fire:this.actions.fire&&!this.cameraDrag,kick:this.actions.kick||this.keys.has("KeyQ"),sabotage:!t.catapultId&&(this.actions.sabotage||this.keys.has("KeyE"))}}message(t,e=1.5){this.$("callout").textContent=t,this.calloutUntil=this.elapsed+e}makeFlyBullet(){const t=new te,e=new Zt(this.shared.sphere,this.materials.shot);e.scale.set(.12,.1,.19),t.add(e);for(const n of[-1,1]){const s=new Zt(this.shared.wing,this.materials.wing);s.position.set(n*.13,.07,0),s.scale.set(.17,.018,.09),t.add(s)}return this.scene.add(t),t}consumeEvents(){for(const t of this.state.events){this.artilleryView?.consumeEvent(t);const e=this.state.actors.findIndex(r=>r.id===t.id),n=this.state.actors[e],s=this.models[e];if(t.type==="tongue"&&n){const r=this.tongues.get(n.id);r&&this.scene.remove(r.mesh);const o=new Zt(this.shared.cylinder,this.materials.tongue);this.scene.add(o),this.tongues.set(n.id,{mesh:o,start:this.elapsed,x:t.x,z:t.z})}if(t.type==="shot"&&n?.id==="player"&&this.sound.play("shot"),t.type==="hit"&&s){s.mesh.material.emissive?.set("#ffffff");const r=s.group.rotation.y,o=Math.cos(r),a=Math.sin(r);s.setImpact({x:o*t.dx-a*t.dz,z:a*t.dx+o*t.dz,strength:1.3,duration:n.knockUp>0?.42:.27}),this.impactEffects.hit({...t,height:Number.isFinite(t.y)?t.y:this.ground(t.x,t.z)+n.height+.75,heavy:n.knockUp>0}),this.shake=Math.max(this.shake,n.id==="player"?.16:.025),t.owner==="player"&&n.id!=="player"?(this.hitConfirmUntil=this.elapsed+.2,this.lastPlayerHit={id:n.id,x:t.x,y:t.y,z:t.z,time:this.elapsed},this.sound.play("hitConfirm")):n.id==="player"&&this.sound.play("hit")}if(t.type==="dizzy"&&(this.addText("ΖΑΛΗ!",n.x,n.z,"#ffe375",1),this.sound.play("dizzy"),n.id!=="player"&&this.message("ΖΑΛΙΣΤΗΚΕ! ΣΥΝΕΧΙΣΕ ΤΙΣ ΕΥΣΤΟΧΕΣ ΒΟΛΕΣ.",2)),t.type==="ko"&&(this.koTimes.set(n.id,{time:this.elapsed,dx:t.dx,dz:t.dz}),this.addText("ΝΟΚ ΑΟΥΤ!",n.x,n.z,"#ffe791",1.4),this.sound.play("ko"),this.shake=.32,this.makeSplat({...t,wall:!1})),t.type==="respawn"&&(this.koTimes.delete(t.id),t.id==="player"&&(this.clearInputs(),this.resetCamera(),this.message("Επέστρεψες με 60 μύγες!",2))),t.type==="sabotageStart"&&(t.id==="player"?this.elapsed>=this.storageAlertUntil&&(this.sound.play("storageAlert"),this.storageAlertUntil=this.elapsed+3):t.by==="player"&&this.message("Κράτα μέχρι το τέλος · οι βολές εναντίον σου διακόπτουν.",2)),t.type==="sabotageInterrupted"&&t.by==="player"&&this.message(t.reason==="hit"?"Σε χτύπησαν! Η καταστροφή διακόπηκε.":"Η καταστροφή διακόπηκε.",1.5),t.type==="baseDestroyed"){const r=Xn.find(o=>o.id===t.baseId);r&&this.addText("ΑΠΟΘΗΚΗ ΚΑΤΑΣΤΡΑΦΗΚΕ",r.stock.x,r.stock.z,"#ffc689",2),this.sound.play("stoneImpact"),this.shake=.2}t.type==="splat"&&this.makeSplat(t),t.type==="stoneShot"&&this.sound.play("stoneShot"),t.type==="land"&&t.stone&&(this.impactEffects.landing(t),Math.hypot(t.x-this.state.actors[0].x,t.z-this.state.actors[0].z)<10&&this.sound.play("land")),t.type==="stoneImpact"&&(this.sound.play("stoneImpact"),this.impactEffects.stone(t),Math.hypot(t.x-this.state.actors[0].x,t.z-this.state.actors[0].z)<7&&(this.shake=Math.max(this.shake,.16))),t.type==="battle"&&this.message("ΜΑΧΗ!",1.2)}}addText(t,e,n,s,r){this.fx.push({text:t,x:e,z:n,color:s,life:r,start:this.elapsed}),this.fx.length>28&&this.fx.shift()}burst(t,e){for(let n=0;n<9;n++){const s=new Zt(this.shared.sphere,this.materials.shot);s.scale.setScalar(.06+Math.random()*.07),s.position.set(t,this.ground(t,e)+1,e),this.scene.add(s),this.particles.push({mesh:s,start:this.elapsed,v:new Qe((Math.random()-.5)*6,2+Math.random()*4,(Math.random()-.5)*6)})}for(;this.particles.length>90;)this.particles.shift().mesh.removeFromParent()}makeSplat(t){const e=[];for(let l=0;l<20;l++){const c=l/20*6.283,h=(l+1)/20*6.283,u=.4+l%3*.14,d=.4+(l+1)%3*.14;e.push(0,0,0,Math.cos(c)*u,Math.sin(c)*u,0,Math.cos(h)*d,Math.sin(h)*d,0)}const s=new we;s.setAttribute("position",new Gt(e,3));const r=this.materials.ink.clone();r.color.set(["#d2ed4d","#f5bf52","#c6ef78"][this.splats.length%3]);const o=new Zt(s,r),a=this.ground(t.x,t.z);if(t.normal&&Number.isFinite(t.y)&&(t.wall||t.kind==="terrain")){const l=new Qe(t.normal.x,t.normal.y,t.normal.z).normalize();o.position.set(t.x,t.y,t.z).addScaledVector(l,.025-an.radius),o.quaternion.setFromUnitVectors(new Qe(0,0,1),l)}else if(t.wall){const l=new Qe(t.dx,t.dy||0,t.dz).normalize(),c=new Qe(t.x,Number.isFinite(t.y)?t.y:a+.9,t.z).addScaledVector(l,-1.5);for(const u of this.obstacleMeshes)u.updateMatrixWorld();const h=new Tl(c,l,0,5).intersectObjects(this.obstacleMeshes,!1)[0];if(h){const u=h.face.normal.clone().transformDirection(h.object.matrixWorld);o.position.copy(h.point).addScaledVector(u,.025),o.quaternion.setFromUnitVectors(new Qe(0,0,1),u)}else o.position.set(t.x,a+.05,t.z),o.rotation.x=-Math.PI/2}else o.position.set(t.x,a+.045,t.z),o.rotation.x=-Math.PI/2;if(this.scene.add(o),this.splats.push({mesh:o,start:this.elapsed}),this.splats.length>90){const l=this.splats.shift();l.mesh.removeFromParent(),l.mesh.geometry.dispose(),l.mesh.material.dispose()}}clearEffects(){this.impactEffects?.clear();for(const t of this.particles)t.mesh.removeFromParent();this.particles=[];for(const t of this.splats)t.mesh.removeFromParent(),t.mesh.geometry.dispose(),t.mesh.material.dispose();this.splats=[];for(const t of this.bulletMeshes.values())t.removeFromParent();this.bulletMeshes.clear();for(const t of this.tongues.values())t.mesh.removeFromParent();this.tongues.clear(),this.fx=[],this.koTimes.clear()}updateHUD(){const t=this.state.actors[0],e=Math.round(t.ammo/At.capacity*100),n=$c(this.state,t),s=ks(this.state,t),r=this.state.bases.filter(T=>!T.destroyed).length,o=Xn.find(T=>T.owner===t.id)?.stock,a=s&&!s.destroyed&&o&&Math.hypot(t.x-o.x,t.z-o.z)<=At.pickupRange&&Ns(t,o),l=Ga(t)&&t.revealedTime<=0,c=Va(this.state,t),h=this.state.bases.find(T=>!T.destroyed&&T.attackerId===t.id),u=this.$("sabotage-button");u.hidden=!this.running||this.layoutEditing||this.state.phase!=="battle"||t.ko||t.catapultId||!c,u.disabled=t.dizzyTime>0||t.knockUp>0||t.hit>0||t.sabotageRecovery>0,u.querySelector("span").textContent=h?`${Math.max(0,At.sabotageSeconds-h.progress).toFixed(1)}″`:this.touch?"ΚΡΑΤΑ · 10″":"ΚΡΑΤΑ E · 10″",this.$("sabotage-status").hidden=!this.running||!h;const d=h?h.progress/At.sabotageSeconds:0;this.$("sabotage-copy").textContent="ΚΑΤΑΣΤΡΟΦΗ ΑΠΟΘΗΚΗΣ",this.$("sabotage-fill").style.transform=`scaleX(${d})`,this.$("sabotage-track").setAttribute("aria-valuenow",String(Math.round(d*100)));const f=this.state.catapults?.find(T=>T.id===t.catapultId),m=of(this.state,t),g=this.$("catapult-button");g.hidden=!this.running||t.ko||!f&&(!m||this.state.phase!=="battle"),g.disabled=t.dizzyTime>0||t.knockUp>0,g.querySelector("span").textContent=f?"ΕΞΟΔΟΣ":"ΧΡΗΣΗ",g.setAttribute("aria-label",f?"Έξοδος από τον καταπέλτη":"Χρήση κοντινού καταπέλτη"),g.classList.toggle("ready",!!f),this.$("catapult-status").hidden=!f||!this.running||this.layoutEditing,this.$("catapult-status").textContent=f?f.cooldown>0?`ΦΟΡΤΩΝΕΙ ΠΕΤΡΑ · ${f.cooldown.toFixed(1)}″`:this.touch?"ΣΗΜΑΔΕΨΕ · ΠΑΤΑ ΠΕΤΡΑ":"ΠΕΤΡΑ ΕΤΟΙΜΗ · ΑΡΙΣΤΕΡΟ ΚΛΙΚ":"",this.$("aim-stick").classList.toggle("catapult",!!f),this.ui.querySelector(".aim-zone .stick-caption").textContent=f?"ΚΑΤΕΥΘΥΝΣΗ · ΙΣΧΥΣ":"ΣΤΟΧΕΥΣΗ",this.ui.querySelector(".move-zone").classList.toggle("mounted",!!f),this.$("fire-button").disabled=!this.layoutEditing&&(t.ko||t.dizzyTime>0||t.knockUp>0),this.$("fire-button").querySelector("span").textContent=f?"ΠΕΤΡΑ":"ΠΥΡ",this.$("fire-button").classList.toggle("firing",this.actions.fire),this.$("fire-button").classList.toggle("empty",f?f.cooldown>0:t.ammo===0),this.$("ammo-count").textContent=`${t.ammo} / ${At.capacity}`,this.$("ammo-percent").textContent=e+"%",this.$("ammo-fill").style.transform=`scaleX(${e/100})`,this.$("ammo-track").setAttribute("aria-valuenow",String(e)),this.$("ammo-state").textContent=t.ko?"Επιστρέφεις στην αποθήκη":t.ammo===At.capacity?"ΓΕΜΑΤΟΣ!":a?"ΑΠΟΘΗΚΗ ∞ · ΓΕΜΙΖΕΙ…":t.tongue>0?"ΜΑΖΕΥΕΙ ΜΥΓΕΣ…":t.ammo===0?"Γύρνα στην αποθήκη ή βρες σμήνος":"Μύγες για τις επόμενες βολές",this.$("ko-count").textContent=`${r} / 3`;for(const T of this.$("base-dots").children){const A=this.state.bases.find(E=>E.owner===T.dataset.owner);T.classList.toggle("destroyed",!!A?.destroyed),T.classList.toggle("attacked",!!A?.attackerId),T.title=(T.dataset.owner==="player"?"Η αποθήκη σου":T.dataset.owner==="rival-1"?"Κόκκινη αποθήκη":"Μωβ αποθήκη")+(A?.destroyed?" · κατεστραμμένη":A?.attackerId?" · υπό επίθεση":" · άθικτη")}this.$("round-status").hidden=!this.running||!this.layoutEditing&&!t.ko&&this.state.phase==="battle",this.$("round-status").classList.toggle("warmup",this.state.phase!=="battle"),this.$("round-time").textContent=this.layoutEditing?"↔":t.ko?`${Math.ceil(t.respawnTime||0)}″`:this.state.phase!=="battle"?`${Math.ceil(this.state.intro)}″`:`${r}`,this.$("round-copy").textContent=this.layoutEditing?this.touch?"ΡΥΘΜΙΣΗ ΘΕΣΕΩΝ":"ΡΥΘΜΙΣΗ ΘΕΣΕΩΝ · Το παιχνίδι περιμένει":t.ko?this.touch?"ΕΠΙΣΤΡΟΦΗ":"ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΒΑΣΗ":this.state.phase!=="battle"?this.touch?"ΠΡΟΕΤΟΙΜΑΣΙΑ":"ΠΡΟΕΤΟΙΜΑΣΙΑ · Προστάτεψε την αποθήκη σου":"";const x=!!s?.attackerId&&!s.destroyed,p=this.running&&!this.layoutEditing&&x;this.ui.classList.toggle("storage-threat",p),this.$("base-status").hidden=!this.running||this.layoutEditing||!x&&!l,this.$("base-status").classList.toggle("threat",x);const v=x?"ΕΠΙΘΕΣΗ ΣΤΗΝ ΑΠΟΘΗΚΗ ΣΟΥ":l?"ΚΡΥΜΜΕΝΟΣ ΣΤΑ ΔΕΝΤΡΑ":"";this.$("base-warning-title").textContent!==v&&(this.$("base-warning-title").textContent=v),this.$("base-warning-detail").textContent=x?`${Math.max(0,At.sabotageSeconds-s.progress).toFixed(1)}″ μέχρι καταστροφή · Χτύπησέ τον!`:l?"Πιο αργά άλματα":"";const y=!t.ko&&!!n&&this.state.phase==="battle"&&!t.catapultId&&t.dizzyTime<=0&&t.knockUp<=0&&t.kick<=0&&(t.kickCooldown||0)<=0;this.$("kick-button").hidden=!this.running||t.ko||this.state.phase!=="battle"||!!t.catapultId||!n&&t.kick<=0,this.$("kick-button").disabled=!y,this.$("kick-button").classList.toggle("ready",y),this.$("pc-kick").classList.toggle("ready",y),this.$("dizzy-banner").hidden=t.dizzyTime<=0,this.$("dizzy-time").textContent=t.dizzyTime.toFixed(1)+"″",this.$("aim-stick").classList.toggle("empty",f?f.cooldown>0:t.ammo===0),this.calloutUntil<this.elapsed&&(this.$("callout").textContent="");const _=["round-status","base-status","catapult-button","catapult-status","kick-button","sabotage-button","sabotage-status"].map(T=>this.$(T).hidden?0:1).join("");this.touch&&!this.layoutEditing&&this.running&&_!==this.contextLayout&&(this.contextLayout=_,this.touchLayout?.refresh())}renderActors(t){this.state.actors.forEach((l,c)=>{const h=this.models[c];if(h.group.visible=!l.eliminated,l.eliminated)return;const u=this.ground(l.x,l.z);let d=l.x,f=l.z,m=u+l.height+(l.catapultId?.45:0);const g=this.koTimes.get(l.id),x=g?this.elapsed-g.time:99;x<.65&&(d+=g.dx*x*5,f+=g.dz*x*5,m+=Math.sin(x/.65*Math.PI)*2.5),h.group.position.set(d,m,f);const p=l.aiming||l.shot>.02||l.kick>0,v=p?Math.hypot(l.aimX,l.aimZ)>.001?Math.atan2(l.aimX,l.aimZ):h.group.rotation.y:l.face;let y=Math.atan2(Math.sin(v-h.group.rotation.y),Math.cos(v-h.group.rotation.y));h.group.rotation.y+=y*(1-Math.exp(-t*22)),h.update(t,{time:this.elapsed,speed:Math.hypot(l.hopX,l.hopZ),building:!!l.sabotageId,hop:l.knockUp>0?{phase:"air",progress:1-l.knockUp/l.knockUpDuration}:l.hop>0?{phase:"air",progress:1-l.hop/At.hopDuration}:l.idle>0?{phase:"land",progress:1-l.idle/At.landingDuration}:{phase:"idle",progress:0},dead:l.ko,attack:l.kick>0?{type:"kick",phase:1-l.kick/(At.kickDuration||.48)}:l.tongue>0||l.shot>0?{type:"tongue",phase:l.tongue>0?1-l.tongue/.22:1-l.shot/At.shotInterval}:null});const _=l.load,T=l.shot>0?Math.sin((1-l.shot/At.shotInterval)*Math.PI):0;if(O_(h,{load:_,spit:T}),p&&!l.ko&&!l.catapultId){const A=ma(Math.atan2(l.aimY||0,Math.hypot(l.aimX,l.aimZ)),-.5,1.1);h.bones.head.rotation.x-=A*.7,h.bones.spine.rotation.x-=A*.12}if(l.hop>0){const A=Math.atan2(l.hopX,l.hopZ)-h.group.rotation.y,E=Math.min(1,Math.hypot(l.hopX,l.hopZ)/8.8)*Math.sin((1-l.hop/At.hopDuration)*Math.PI);h.bones.spine.rotation.z-=Math.sin(A)*E*.1;for(const R of[-1,1])h.bones[`hip${R}`].rotation.z-=Math.sin(A)*E*.14}if(l.dizzyTime>0?(h.group.rotation.z=Math.sin(this.elapsed*7)*.17,h.bones.head.rotation.z+=Math.sin(this.elapsed*9)*.2):h.group.rotation.z=x<.65?x*6:0,h.group.rotation.x=0,l.knockUp>0){const A=1-l.knockUp/l.knockUpDuration,E=Math.sin(A*Math.PI)*.38,R=Math.atan2(l.impulseX,l.impulseZ)-h.group.rotation.y;h.group.rotation.x=Math.cos(R)*E,h.group.rotation.z-=Math.sin(R)*E}});const e=this.state.actors[0];this.playerRing.position.set(e.x,this.ground(e.x,e.z)+.07,e.z),this.playerRing.scale.setScalar(1);const n=M_(this.state,e),s=this.aimGuide.geometry.attributes.position,r=n.origin||Xc(this.state,e);s.setXYZ(0,r.x,r.y,r.z),s.setXYZ(1,n.x,n.y,n.z),s.needsUpdate=!0,this.aimGuide.computeLineDistances(),this.aimGuide.geometry.computeBoundingSphere();const o=this.running&&!this.layoutEditing&&!this.cameraDrag&&!e.catapultId&&!e.ko&&e.dizzyTime<=0&&(e.aiming||e.shot>0);this.renderer.domElement.classList.toggle("mouse-aiming",o&&this.mouse.valid&&!this.cameraDrag),this.currentAimPreview=o?n:null,this.aimGuide.visible=o,this.aimGuide.material.color.set(n.targetId?"#ffc09b":n.blocked?"#b9c0b5":"#f4f7d5"),this.aimReticle.visible=o,this.aimReticle.position.set(n.x,n.y,n.z),this.aimReticle.quaternion.copy(this.camera.quaternion),this.aimReticle.scale.setScalar(.5),this.aimReticle.material.color.copy(this.aimGuide.material.color);const a=this.state.actors.find(l=>l.id===n.targetId);this.targetRing.visible=o&&!!a,a&&(this.targetRing.position.set(a.x,this.ground(a.x,a.z)+.1,a.z),this.targetRing.scale.setScalar(1+a.load*.2))}renderFlies(){this.state.flies.forEach((e,n)=>{const s=this.dummy,r=e.wait<=0,o=this.ground(e.x,e.z)+1.05+Math.sin(this.elapsed*5+e.phase)*.12,a=e.x+Math.sin(this.elapsed*3+e.phase)*.12;s.position.set(a,r?o:-100,e.z),s.scale.set(r?.105:0,r?.08:0,r?.14:0),s.rotation.set(0,e.phase,0),s.updateMatrix(),this.flyBodies.setMatrixAt(n,s.matrix);for(let l=0;l<2;l++)s.position.set(a+(l===0?-.1:.1),r?o+.045:-100,e.z),s.scale.set(r?.17:0,r?.015:0,r?.08:0),s.rotation.set(0,e.phase,Math.sin(this.elapsed*55+e.phase)*(l===0?1:-1)*.5),s.updateMatrix(),this.flyWings.setMatrixAt(n*2+l,s.matrix)}),this.flyBodies.instanceMatrix.needsUpdate=!0,this.flyWings.instanceMatrix.needsUpdate=!0,Cr.forEach((e,n)=>{const s=this.state.flies.filter(o=>o.swarmId===e.id&&o.wait<=0).length,r=this.swarmRings[n];r.material.opacity=s?.2:.09,r.material.color.set(s?"#c8e0a3":"#6f8c83")});const t=new Set;for(const e of this.state.bullets){t.add(e.id);let n=this.bulletMeshes.get(e.id);n||(n=this.makeFlyBullet(),this.bulletMeshes.set(e.id,n)),n.position.set(e.x,Number.isFinite(e.y)?e.y:this.ground(e.x,e.z)+.9,e.z),n.quaternion.setFromUnitVectors(new Qe(0,0,1),new Qe(e.dx,e.dy||0,e.dz).normalize()),n.children[1].rotation.z=Math.sin(this.elapsed*75),n.children[2].rotation.z=-Math.sin(this.elapsed*75)}for(const[e,n]of this.bulletMeshes)t.has(e)||(n.removeFromParent(),this.bulletMeshes.delete(e));for(const[e,n]of this.tongues){const s=(this.elapsed-n.start)/.22;if(s>=1){n.mesh.removeFromParent(),this.tongues.delete(e);continue}const r=this.state.actors.findIndex(u=>u.id===e),o=this.models[r],a=o.mouthWorld(),l=new Qe(n.x,this.ground(n.x,n.z)+1,n.z),c=Math.sin(s*Math.PI);l.lerpVectors(a,l,c);const h=l.clone().sub(a);n.mesh.position.copy(a).addScaledVector(h,.5),n.mesh.quaternion.setFromUnitVectors(jl,h.clone().normalize()),n.mesh.scale.set(.07,Math.max(.001,h.length()),.07)}}project(t,e,n){const s=new Qe(t,e,n).project(this.camera);return{x:(s.x+1)*this.w/2,y:(1-s.y)*this.h/2,visible:s.z>-1&&s.z<1}}drawLabels(){const t=this.labelCtx;if(t.clearRect(0,0,this.w,this.h),t.textAlign="center",t.lineJoin="round",t.font="800 18px sans-serif",this.running&&(__(this,t),y_(this,this.$("minimap"))),this.currentAimScreen=null,this.currentAimPreview){const e=this.currentAimPreview,n=this.mouse.valid&&!this.cameraDrag?{x:this.mouse.x,y:this.mouse.y,visible:!0}:this.project(e.x,e.y,e.z);if(this.currentAimScreen={x:n.x,y:n.y},n.visible&&n.x>4&&n.x<this.w-4&&n.y>4&&n.y<this.h-4){t.save(),t.lineWidth=4,t.strokeStyle="#173c35",t.beginPath(),t.arc(n.x,n.y,7,0,Math.PI*2),t.stroke(),t.lineWidth=2,t.strokeStyle=e.targetId?"#ffc5a0":"#f4ffdd",t.beginPath(),t.arc(n.x,n.y,7,0,Math.PI*2);for(const[s,r]of[[1,0],[-1,0],[0,1],[0,-1]])t.moveTo(n.x+s*10,n.y+r*10),t.lineTo(n.x+s*16,n.y+r*16);t.stroke(),t.restore()}}if(this.hitConfirmUntil>this.elapsed&&this.lastPlayerHit){const e=this.lastPlayerHit,n=this.state.actors.find(r=>r.id===e.id),s=this.project(e.x,Number.isFinite(e.y)?e.y:this.ground(e.x,e.z)+(n?.height||0)+1.2,e.z);if(s.visible){t.save(),t.strokeStyle="#143d35",t.lineWidth=6,t.beginPath();for(const[r,o]of[[1,1],[-1,1],[1,-1],[-1,-1]])t.moveTo(s.x+r*6,s.y+o*6),t.lineTo(s.x+r*15,s.y+o*15);t.stroke(),t.strokeStyle="#fffce2",t.lineWidth=3,t.stroke(),t.restore()}}if(this.state.actors.forEach((e,n)=>{if(e.eliminated)return;const s=this.project(e.x,this.ground(e.x,e.z)+e.height+2.4,e.z);if(!s.visible)return;if(!(s.x>20&&s.x<this.w-20&&s.y>70&&s.y<this.h-40)&&n>0&&!e.ko&&this.running){const o=ma(s.x,24,this.w-24),a=ma(s.y,110,this.h-(this.touch?210:90));t.font="bold 24px sans-serif",t.fillStyle=n===1?"#ffbb8e":"#dfb5ff",t.fillText("▼",o,a);return}if(e.ko){t.font="900 20px sans-serif",t.strokeStyle="#1e2e28",t.lineWidth=5;const o=`KO · ${Math.ceil(e.respawnTime||0)}″`;t.strokeText(o,s.x,s.y),t.fillStyle="#ffe374",t.fillText(o,s.x,s.y);return}if(e.dizzyTime>0){for(let o=0;o<3;o++){const a=this.elapsed*4+o*2.094;t.font="bold 25px sans-serif",t.fillStyle="#ffdf57",t.strokeStyle="#725c21",t.lineWidth=3;const l=s.x+Math.cos(a)*27,c=s.y+Math.sin(a)*7;t.strokeText("★",l,c),t.fillText("★",l,c)}t.font="bold 15px sans-serif",t.fillStyle="#fff4ad",t.fillText(e.dizzyTime.toFixed(1)+"″",s.x,s.y+24);for(let o=0;o<At.finishHits;o++)t.beginPath(),t.arc(s.x+(o-(At.finishHits-1)/2)*11,s.y+36,4,0,Math.PI*2),t.fillStyle=o<e.finishHits?"#ffb58e":"#244438",t.fill(),t.strokeStyle="#ffe6ac",t.lineWidth=1.5,t.stroke()}else if(n>0){e.aimWindup>0&&(t.font="900 22px sans-serif",t.fillStyle="#ffddaa",t.fillText("!",s.x,s.y-40));const o=n===1?"ΚΟΚΚΙΝΟΣ":"ΜΩΒ",a=n===1?"#ff886a":"#dba1ff";t.fillStyle="#112b27dd",t.strokeStyle=a,t.lineWidth=3,t.beginPath(),t.roundRect?t.roundRect(s.x-52,s.y-28,104,24,10):t.rect(s.x-52,s.y-28,104,24),t.fill(),t.stroke(),t.font="bold 15px sans-serif",t.fillStyle=a,t.fillText(o,s.x,s.y-11);for(let l=0;l<6;l++)t.beginPath(),t.arc(s.x+(l-2.5)*9,s.y+6,3.8,0,Math.PI*2),t.fillStyle=l<e.dizzy?"#ffe16a":"#214036bb",t.fill()}}),this.running){const e=this.state.actors[0];for(const n of this.state.bases){const s=Xn.find(l=>l.id===n.id),r=Math.hypot(e.x-s.stock.x,e.z-s.stock.z)<10;if(n.destroyed||!r&&!n.attackerId)continue;const o=this.project(s.stock.x,this.ground(s.stock.x,s.stock.z)+3.5,s.stock.z);if(!o.visible||o.x<70||o.x>this.w-70||o.y<95||o.y>this.h-(this.touch?220:85))continue;const a=n.attackerId?`ΚΑΤΑΣΤΡΟΦΗ · ${Math.max(0,At.sabotageSeconds-n.progress).toFixed(1)}″`:n.owner==="player"?"Η ΑΠΟΘΗΚΗ ΣΟΥ · ∞":"ΕΧΘΡΙΚΗ ΑΠΟΘΗΚΗ";t.font="800 12px sans-serif",t.strokeStyle="#14342df2",t.lineWidth=5,t.strokeText(a,o.x,o.y),t.fillStyle=n.attackerId?"#ffd197":n.owner==="player"?"#dbff9d":"#ffbdad",t.fillText(a,o.x,o.y)}}this.fx=this.fx.filter(e=>this.elapsed-e.start<e.life);for(const e of this.fx){const n=(this.elapsed-e.start)/e.life,s=this.project(e.x,this.ground(e.x,e.z)+2+n*2,e.z);t.globalAlpha=1-n,t.font=`900 ${e.text==="ΝΟΚ ΑΟΥΤ!"?32:22}px sans-serif`,t.strokeStyle="#244136",t.lineWidth=6,t.strokeText(e.text,s.x,s.y),t.fillStyle=e.color,t.fillText(e.text,s.x,s.y)}t.globalAlpha=1}frame(t){const e=Math.min(.05,Math.max(0,(t-this.last)/1e3));if(this.last=t,this.running&&!this.layoutEditing){for(this.elapsed+=e,this.accumulator+=e;this.accumulator>=1/60;)if(ad(this.state,this.currentInput(),1/60),this.consumeEvents(),this.accumulator-=1/60,this.state.status!=="playing"){this.finish();break}this.saveClock+=e,this.saveClock>3&&(this.saveClock=0,this.persist())}else(this.mode==="result"||this.mode==="finishing")&&(this.elapsed+=e);this.mode==="finishing"&&this.elapsed>=this.resultAt&&this.showResult();const n=this.state.actors[0];this.cameraYaw=this.cameraFollow.update(this.cameraYaw,{dt:e,enabled:this.settings.cameraAutoRotate,mode:this.viewMode,moving:this.lastMovement,aiming:this.actions.fire||this.pointers.has("aim")||this.mouse.valid&&performance.now()-this.lastMouseAim<350,dragging:!!this.cameraDrag,active:this.running&&!this.layoutEditing&&!n.ko&&!n.catapultId&&n.dizzyTime<=0&&n.knockUp<=0});const s=pf(n,this.ground(n.x,n.z),this.w/this.h,this.viewMode,{yaw:this.cameraYaw,pitch:this.cameraPitch,zoom:this.settings.cameraZoom}),r=new Qe(...s.look),o=new Qe(...s.position);this.cameraReady?this.focus.lerp(r,1-Math.exp(-e*8)):(this.focus.copy(r),this.cameraReady=!0),this.cameraTarget.copy(this.focus).add(o.sub(r)),this.shake*=Math.exp(-e*15);const a=this.running?this.shake:0;if(this.camera.position.copy(this.cameraTarget),this.camera.position.x+=(Math.random()-.5)*a,this.camera.lookAt(this.focus),this.camera.updateMatrixWorld(),this.running||this.mode==="title"||this.mode==="result"||this.mode==="finishing"){const l=this.mode==="title"||this.layoutEditing?0:e;this.renderActors(l),this.renderFlies(),this.updateCatapultAim?.(),this.artilleryView.update(l),this.basesView.update(l),this.impactEffects.update(l),this.world.update(this.running&&!this.layoutEditing?e:0,this.elapsed,1,new Qe(n.x,this.ground(n.x,n.z),n.z))}(this.running&&!this.layoutEditing||this.mode==="finishing"||this.mode==="result")&&(this.particles=this.particles.filter(l=>this.elapsed-l.start>.55?(l.mesh.removeFromParent(),!1):(l.v.y-=e*16,l.mesh.position.addScaledVector(l.v,e),!0))),this.renderer.render(this.scene,this.camera),this.drawLabels(),this.updateHUD()}inspect(){return{version:Gl,viewMode:this.viewMode,cameraAutoRotate:this.settings.cameraAutoRotate,mouse:{x:this.mouse.x,y:this.mouse.y,valid:this.mouse.valid},aim:{...this.aim},aimScreen:this.currentAimScreen,cameraYaw:this.cameraYaw,cameraPitch:this.cameraPitch,cameraDragging:!!this.cameraDrag,phase:this.state.phase,intro:this.state.intro,mode:this.mode,status:this.state.status,ammo:this.state.actors[0].ammo,fillPercent:Math.round(this.state.actors[0].ammo/At.capacity*100),actors:this.state.actors.map(t=>({id:t.id,x:t.x,z:t.z,ammo:t.ammo,dizzy:t.dizzy,dizzyTime:t.dizzyTime,ko:t.ko,eliminated:t.eliminated,respawnTime:t.respawnTime,sabotageId:t.sabotageId,aiming:t.aiming,aimX:t.aimX,aimY:t.aimY,aimZ:t.aimZ,face:t.face,hop:t.hop,hopX:t.hopX,hopZ:t.hopZ,height:t.height,knockUp:t.knockUp,finishHits:t.finishHits,kickCooldown:t.kickCooldown,catapultId:t.catapultId})),bases:this.state.bases.map(t=>({...t})),layoutEditing:this.layoutEditing,touch:this.touch,catapults:this.state.catapults?.map(t=>({id:t.id,occupant:t.occupant,cooldown:t.cooldown})),shells:this.state.shells?.length,hitConfirmUntil:this.hitConfirmUntil,bullets:this.state.bullets.length,splats:this.splats.length,legacySavePreserved:!0}}}function K_(i){const t={fire:!1,kick:!1},e=r=>{i.running&&!i.layoutEditing&&!i.cameraDrag&&(t[r]=!0)},n=i.currentInput.bind(i),s=i.clearInputs.bind(i);i.currentInput=()=>{const r=n();for(const o of Object.keys(t))!i.layoutEditing&&!i.cameraDrag&&(r[o]||=t[o]),t[o]=!1;return!i.layoutEditing&&!i.cameraDrag&&(r.aiming||=r.fire),r},i.clearInputs=()=>{for(const r of Object.keys(t))t[r]=!1;s()},addEventListener("keydown",r=>{r.repeat||r.target.matches("input,select")||r.code==="KeyQ"&&e("kick")},!0),addEventListener("pointerdown",r=>{r.target.closest?.("#kick-button")&&!i.$("kick-button").disabled?e("kick"):(r.target===i.renderer.domElement&&r.pointerType!=="touch"&&r.button===0||r.target.closest?.("#fire-button")&&!i.$("fire-button").disabled)&&e("fire")},!0),addEventListener("pointercancel",()=>{for(const r of Object.keys(t))t[r]=!1},!0)}function J_(i,t=()=>performance.now()){const e=i.$("view-button");let n=-1/0;e.onpointerdown=s=>{s.pointerType!=="touch"||!i.running||(s.preventDefault(),n=t(),i.toggleView())},e.onclick=s=>{i.running&&(s.detail===0||t()-n>600)&&i.toggleView()}}function Q_(i){i.catapultAim={active:!1,target:null};let t=!1,e=!1;const n=()=>!!i.state.actors[0].catapultId;i.updateCatapultAim=()=>{if(!n()){i.catapultAim={active:!1,target:null};return}const l=i.state.actors[0];if(i.mouse.valid&&i.mouse.target){const u=i.mouse.target.x-l.x,d=i.mouse.target.z-l.z,f=Math.hypot(u,d);f>.01&&(i.aim={x:u/f,z:d/f,distance:f})}const c=i.aim||{x:l.aimX,z:l.aimZ},h=i.touch&&!i.mouse.valid?Math.max(0,Math.min(1,(i.aimStrength-.08)/.92)):Math.max(0,Math.min(1,((c.distance||17)-ze.minRange)/(ze.maxRange-ze.minRange)));i.catapultAim={active:!0,target:N1(l,c.x,c.z,h)}};const s=i.currentInput.bind(i),r=i.clearInputs.bind(i);i.currentInput=()=>{const l=s();if(i.layoutEditing)return t=!1,e=!1,{};const c=l.fire&&!e;return e=!!l.fire,n()&&(i.updateCatapultAim(),l.fire=!1,l.aiming=!0,l.ax=i.aim.x,l.az=i.aim.z,l.ay=void 0,l.sabotage=!1,c&&i.catapultAim.target?.valid!==!1&&(l.throwStone={...i.catapultAim.target})),t&&(l.interactCatapult=!0,t=!1),l},i.clearInputs=()=>{t=!1,e=!1,i.catapultAim={active:!1,target:null},r()};const o=i.$("catapult-button");o.onpointerdown=l=>{!i.running||i.layoutEditing||o.disabled||!n()&&i.state.phase!=="battle"||(l.preventDefault(),t=!0)},o.onclick=l=>{l.detail===0&&i.running&&!i.layoutEditing&&!o.disabled&&(t=!0)},addEventListener("keydown",l=>{l.code!=="KeyE"||l.repeat||l.target.matches("input,select")||!i.running||i.layoutEditing||!n()&&i.state.phase!=="battle"||!n()&&Va(i.state,i.state.actors[0])||(l.preventDefault(),t=!0)});const a=i.$("aim-stick");a.addEventListener("pointerdown",()=>{n()&&i.updateCatapultAim()}),a.addEventListener("pointermove",()=>{n()&&i.pointers.has("aim")&&i.updateCatapultAim()})}const tM='input,select,textarea,[contenteditable]:not([contenteditable="false"])',eM=new Set(["+","=","-","_","0"]),nM=new Set(["Equal","Minus","Digit0","NumpadAdd","NumpadSubtract","Numpad0"]);function iM({document:i=globalThis.document,surfaces:t,enabled:e=()=>!0}={}){const n=t??[...i.querySelectorAll("#arcade-world,#arcade-labels,#arcade-ui")],s=[],r=new Set;let o=!1;const a=p=>(p?.nodeType===3?p.parentElement:p)?.closest?.(tM),l=p=>!!p?.nodeType&&!a(p)&&n.some(v=>v&&(v===p||v.contains?.(p))),c=p=>{const v=p.composedPath?.()||[];return v.length?v:[p.target]},h=p=>{const v=c(p);return!v.some(a)&&v.some(l)},u=p=>{p.cancelable&&p.preventDefault()},d=(p,v,y=!1)=>{const _={capture:!0,passive:y};i.addEventListener(p,v,_),s.push([p,v,_])},f=()=>{r.clear(),o=!1},m=()=>e()?!0:(f(),!1),g=p=>r.size>0||h(p)||Array.from(p.touches||[]).some(v=>l(v.target));d("touchstart",p=>{if(m()){for(const v of p.changedTouches||[])l(v.target)&&r.add(v.identifier);p.touches?.length>1&&g(p)&&u(p)}}),d("touchmove",p=>{m()&&g(p)&&u(p)});const x=p=>{for(const v of p.changedTouches||[])r.delete(v.identifier);p.touches?.length||r.clear()};d("touchend",x,!0),d("touchcancel",x,!0);for(const p of["gesturestart","gesturechange","gestureend"])d(p,v=>{m()&&(p==="gesturestart"&&(o=g(v)),(o||g(v))&&u(v),p==="gestureend"&&(o=!1))});for(const p of["wheel","dblclick","selectstart","contextmenu","dragstart"])d(p,v=>{m()&&h(v)&&u(v)});return d("keydown",p=>{if(!m()||!(p.ctrlKey||p.metaKey)||p.altKey||!eM.has(p.key)&&!nM.has(p.code)||c(p).some(a))return;const v=[i,i.body,i.documentElement].includes(p.target);(h(p)||n.length&&v)&&u(p)}),d("visibilitychange",()=>{i.hidden&&f()},!0),()=>{for(const[p,v,y]of s)i.removeEventListener(p,v,y);s.length=0,f()}}function Th(i){console.error(i);let t=document.getElementById("boot");if(!t){t=document.createElement("div"),t.id="boot";const n=document.createElement("div");n.id="boot-error",t.append(n),document.body.append(t)}t.classList.add("has-error");const e=document.getElementById("boot-error");e.textContent=`Δεν μπόρεσε να ξεκινήσει ο 3D κόσμος. Ενεργοποίησε την επιτάχυνση γραφικών στον browser και κάνε ανανέωση.
`+(i?.message||String(i))}addEventListener("error",i=>Th(i.error||i.message));addEventListener("unhandledrejection",i=>Th(i.reason));requestAnimationFrame(()=>{try{const i=window.frogArcade=new j_;K_(i),J_(i),Q_(i),iM({surfaces:[i.renderer.domElement,i.labels,i.ui]})}catch(i){Th(i)}});
