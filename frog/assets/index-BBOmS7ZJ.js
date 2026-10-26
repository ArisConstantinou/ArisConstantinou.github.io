(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jc="180",Vf=0,Hh=1,Wf=2,bd=1,Xf=2,Ii=3,Hi=0,Dn=1,Ce=2,ls=0,vr=1,Gh=2,Vh=3,Wh=4,qf=5,As=100,$f=101,Yf=102,Zf=103,jf=104,Kf=200,Jf=201,Qf=202,tp=203,nc=204,ic=205,ep=206,np=207,ip=208,sp=209,rp=210,op=211,ap=212,lp=213,cp=214,sc=0,rc=1,oc=2,Sr=3,ac=4,lc=5,cc=6,hc=7,Sd=0,hp=1,up=2,cs=0,dp=1,fp=2,pp=3,wd=4,mp=5,gp=6,xp=7,Xh="attached",vp="detached",Ed=300,wr=301,Er=302,uc=303,dc=304,La=306,Tr=1e3,rs=1001,fc=1002,Vn=1003,yp=1004,Co=1005,ri=1006,Ka=1007,os=1008,vi=1009,Td=1010,Ad=1011,ao=1012,Qc=1013,zs=1014,oi=1015,vo=1016,th=1017,eh=1018,lo=1020,Rd=35902,Cd=35899,Pd=1021,zd=1022,Gn=1023,co=1026,ho=1027,nh=1028,ih=1029,Dd=1030,sh=1031,rh=1033,ya=33776,_a=33777,Ma=33778,ba=33779,pc=35840,mc=35841,gc=35842,xc=35843,vc=36196,yc=37492,_c=37496,Mc=37808,bc=37809,Sc=37810,wc=37811,Ec=37812,Tc=37813,Ac=37814,Rc=37815,Cc=37816,Pc=37817,zc=37818,Dc=37819,Ic=37820,Lc=37821,Uc=36492,kc=36494,Nc=36495,Fc=36283,Oc=36284,Bc=36285,Hc=36286,_p=3200,Mp=3201,oh=0,bp=1,Li="",Un="srgb",Ar="srgb-linear",Ea="linear",Ge="srgb",Ws=7680,qh=519,Sp=512,wp=513,Ep=514,Id=515,Tp=516,Ap=517,Rp=518,Cp=519,$h=35044,Ui=35048,Yh="300 es",gi=2e3,Ta=2001;class Pr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Zh=1234567;const to=Math.PI/180,uo=180/Math.PI;function Ls(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bn[i&255]+bn[i>>8&255]+bn[i>>16&255]+bn[i>>24&255]+"-"+bn[t&255]+bn[t>>8&255]+"-"+bn[t>>16&15|64]+bn[t>>24&255]+"-"+bn[e&63|128]+bn[e>>8&255]+"-"+bn[e>>16&255]+bn[e>>24&255]+bn[n&255]+bn[n>>8&255]+bn[n>>16&255]+bn[n>>24&255]).toLowerCase()}function be(i,t,e){return Math.max(t,Math.min(e,i))}function ah(i,t){return(i%t+t)%t}function Pp(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function zp(i,t,e){return i!==t?(e-i)/(t-i):0}function eo(i,t,e){return(1-e)*i+e*t}function Dp(i,t,e,n){return eo(i,t,1-Math.exp(-e*n))}function Ip(i,t=1){return t-Math.abs(ah(i,t*2)-t)}function Lp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Up(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function kp(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Np(i,t){return i+Math.random()*(t-i)}function Fp(i){return i*(.5-Math.random())}function Op(i){i!==void 0&&(Zh=i);let t=Zh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Bp(i){return i*to}function Hp(i){return i*uo}function Gp(i){return(i&i-1)===0&&i!==0}function Vp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Wp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Xp(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*m,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*m,a*c);break;case"ZYZ":i.set(l*m,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ur(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function An(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Gc={DEG2RAD:to,RAD2DEG:uo,generateUUID:Ls,clamp:be,euclideanModulo:ah,mapLinear:Pp,inverseLerp:zp,lerp:eo,damp:Dp,pingpong:Ip,smoothstep:Lp,smootherstep:Up,randInt:kp,randFloat:Np,randFloatSpread:Fp,seededRandom:Op,degToRad:Bp,radToDeg:Hp,isPowerOfTwo:Gp,ceilPowerOfTwo:Vp,floorPowerOfTwo:Wp,setQuaternionFromProperEuler:Xp,normalize:An,denormalize:ur};class Wt{constructor(t=0,e=0){Wt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=be(this.x,t.x,e.x),this.y=be(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=be(this.x,t,e),this.y=be(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(be(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class hs{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],m=r[o+2],g=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=g;return}if(u!==g||l!==d||c!==f||h!==m){let x=1-a;const p=l*d+c*f+h*m+u*g,v=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const T=Math.sqrt(y),A=Math.atan2(T,p*v);x=Math.sin(x*A)/T,a=Math.sin(a*A)/T}const _=a*v;if(l=l*x+d*_,c=c*x+f*_,h=h*x+m*_,u=u*x+g*_,x===1-a){const T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+h*u+l*f-c*d,t[e+1]=l*m+h*d+c*u-a*f,t[e+2]=c*m+h*f+a*d-l*u,t[e+3]=h*m-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(be(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(jh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(jh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=be(this.x,t.x,e.x),this.y=be(this.y,t.y,e.y),this.z=be(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=be(this.x,t,e),this.y=be(this.y,t,e),this.z=be(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(be(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ja.copy(this).projectOnVector(t),this.sub(Ja)}reflect(t){return this.sub(Ja.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ja=new L,jh=new hs;class xe{constructor(t,e,n,s,r,o,a,l,c){xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],g=s[0],x=s[3],p=s[6],v=s[1],y=s[4],_=s[7],T=s[2],A=s[5],E=s[8];return r[0]=o*g+a*v+l*T,r[3]=o*x+a*y+l*A,r[6]=o*p+a*_+l*E,r[1]=c*g+h*v+u*T,r[4]=c*x+h*y+u*A,r[7]=c*p+h*_+u*E,r[2]=d*g+f*v+m*T,r[5]=d*x+f*y+m*A,r[8]=d*p+f*_+m*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,m=e*u+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/m;return t[0]=u*g,t[1]=(s*c-h*n)*g,t[2]=(a*n-s*o)*g,t[3]=d*g,t[4]=(h*e-s*l)*g,t[5]=(s*r-a*e)*g,t[6]=f*g,t[7]=(n*l-c*e)*g,t[8]=(o*e-n*r)*g,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Qa.makeScale(t,e)),this}rotate(t){return this.premultiply(Qa.makeRotation(-t)),this}translate(t,e){return this.premultiply(Qa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Qa=new xe;function Ld(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Aa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qp(){const i=Aa("canvas");return i.style.display="block",i}const Kh={};function fo(i){i in Kh||(Kh[i]=!0,console.warn(i))}function $p(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Jh=new xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qh=new xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Yp(){const i={enabled:!0,workingColorSpace:Ar,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ge&&(s.r=Oi(s.r),s.g=Oi(s.g),s.b=Oi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ge&&(s.r=yr(s.r),s.g=yr(s.g),s.b=yr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Li?Ea:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return fo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return fo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ar]:{primaries:t,whitePoint:n,transfer:Ea,toXYZ:Jh,fromXYZ:Qh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Un},outputColorSpaceConfig:{drawingBufferColorSpace:Un}},[Un]:{primaries:t,whitePoint:n,transfer:Ge,toXYZ:Jh,fromXYZ:Qh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Un}}}),i}const ke=Yp();function Oi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function yr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Xs;class Zp{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Xs===void 0&&(Xs=Aa("canvas")),Xs.width=t.width,Xs.height=t.height;const s=Xs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Xs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Aa("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Oi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Oi(e[n]/255)*255):e[n]=Oi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let jp=0;class lh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jp++}),this.uuid=Ls(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(tl(s[o].image)):r.push(tl(s[o]))}else r=tl(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function tl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Zp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Kp=0;const el=new L;class En extends Pr{constructor(t=En.DEFAULT_IMAGE,e=En.DEFAULT_MAPPING,n=rs,s=rs,r=ri,o=os,a=Gn,l=vi,c=En.DEFAULT_ANISOTROPY,h=Li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kp++}),this.uuid=Ls(),this.name="",this.source=new lh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Wt(0,0),this.repeat=new Wt(1,1),this.center=new Wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(el).x}get height(){return this.source.getSize(el).y}get depth(){return this.source.getSize(el).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ed)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Tr:t.x=t.x-Math.floor(t.x);break;case rs:t.x=t.x<0?0:1;break;case fc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Tr:t.y=t.y-Math.floor(t.y);break;case rs:t.y=t.y<0?0:1;break;case fc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}En.DEFAULT_IMAGE=null;En.DEFAULT_MAPPING=Ed;En.DEFAULT_ANISOTROPY=1;class Le{constructor(t=0,e=0,n=0,s=1){Le.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],g=l[2],x=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-g)<.01&&Math.abs(m-x)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+g)<.1&&Math.abs(m+x)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,_=(f+1)/2,T=(p+1)/2,A=(h+d)/4,E=(u+g)/4,R=(m+x)/4;return y>_&&y>T?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=A/n,r=E/n):_>T?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=A/s,r=R/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=E/r,s=R/r),this.set(n,s,r,e),this}let v=Math.sqrt((x-m)*(x-m)+(u-g)*(u-g)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(x-m)/v,this.y=(u-g)/v,this.z=(d-h)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=be(this.x,t.x,e.x),this.y=be(this.y,t.y,e.y),this.z=be(this.z,t.z,e.z),this.w=be(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=be(this.x,t,e),this.y=be(this.y,t,e),this.z=be(this.z,t,e),this.w=be(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(be(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Jp extends Pr{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ri,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Le(0,0,t,e),this.scissorTest=!1,this.viewport=new Le(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new En(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:ri,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new lh(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class us extends Jp{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ud extends En{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Qp extends En{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Nn{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Qn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Qn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Qn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Qn):Qn.fromBufferAttribute(r,o),Qn.applyMatrix4(t.matrixWorld),this.expandByPoint(Qn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Po.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Po.copy(n.boundingBox)),Po.applyMatrix4(t.matrixWorld),this.union(Po)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Qn),Qn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Br),zo.subVectors(this.max,Br),qs.subVectors(t.a,Br),$s.subVectors(t.b,Br),Ys.subVectors(t.c,Br),$i.subVectors($s,qs),Yi.subVectors(Ys,$s),vs.subVectors(qs,Ys);let e=[0,-$i.z,$i.y,0,-Yi.z,Yi.y,0,-vs.z,vs.y,$i.z,0,-$i.x,Yi.z,0,-Yi.x,vs.z,0,-vs.x,-$i.y,$i.x,0,-Yi.y,Yi.x,0,-vs.y,vs.x,0];return!nl(e,qs,$s,Ys,zo)||(e=[1,0,0,0,1,0,0,0,1],!nl(e,qs,$s,Ys,zo))?!1:(Do.crossVectors($i,Yi),e=[Do.x,Do.y,Do.z],nl(e,qs,$s,Ys,zo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ti),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ti=[new L,new L,new L,new L,new L,new L,new L,new L],Qn=new L,Po=new Nn,qs=new L,$s=new L,Ys=new L,$i=new L,Yi=new L,vs=new L,Br=new L,zo=new L,Do=new L,ys=new L;function nl(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ys.fromArray(i,r);const a=s.x*Math.abs(ys.x)+s.y*Math.abs(ys.y)+s.z*Math.abs(ys.z),l=t.dot(ys),c=e.dot(ys),h=n.dot(ys);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const tm=new Nn,Hr=new L,il=new L;class Vi{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):tm.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Hr.subVectors(t,this.center);const e=Hr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Hr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(il.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Hr.copy(t.center).add(il)),this.expandByPoint(Hr.copy(t.center).sub(il))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Ai=new L,sl=new L,Io=new L,Zi=new L,rl=new L,Lo=new L,ol=new L;class Ds{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ai)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ai.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ai.copy(this.origin).addScaledVector(this.direction,e),Ai.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){sl.copy(t).add(e).multiplyScalar(.5),Io.copy(e).sub(t).normalize(),Zi.copy(this.origin).sub(sl);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Io),a=Zi.dot(this.direction),l=-Zi.dot(Io),c=Zi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,m;if(h>0)if(u=o*l-a,d=o*a-l,m=r*h,u>=0)if(d>=-m)if(d<=m){const g=1/h;u*=g,d*=g,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(sl).addScaledVector(Io,d),f}intersectSphere(t,e){Ai.subVectors(t.center,this.origin);const n=Ai.dot(this.direction),s=Ai.dot(Ai)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Ai)!==null}intersectTriangle(t,e,n,s,r){rl.subVectors(e,t),Lo.subVectors(n,t),ol.crossVectors(rl,Lo);let o=this.direction.dot(ol),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Zi.subVectors(this.origin,t);const l=a*this.direction.dot(Lo.crossVectors(Zi,Lo));if(l<0)return null;const c=a*this.direction.dot(rl.cross(Zi));if(c<0||l+c>o)return null;const h=-a*Zi.dot(ol);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he{constructor(t,e,n,s,r,o,a,l,c,h,u,d,f,m,g,x){he.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,f,m,g,x)}set(t,e,n,s,r,o,a,l,c,h,u,d,f,m,g,x){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=g,p[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new he().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Zs.setFromMatrixColumn(t,0).length(),r=1/Zs.setFromMatrixColumn(t,1).length(),o=1/Zs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,m=a*h,g=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+m*c,e[5]=d-g*c,e[9]=-a*l,e[2]=g-d*c,e[6]=m+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,m=c*h,g=c*u;e[0]=d+g*a,e[4]=m*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=g+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,m=c*h,g=c*u;e[0]=d-g*a,e[4]=-o*u,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=g-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,f=o*u,m=a*h,g=a*u;e[0]=l*h,e[4]=m*c-f,e[8]=d*c+g,e[1]=l*u,e[5]=g*c+d,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,m=a*l,g=a*c;e[0]=l*h,e[4]=g-d*u,e[8]=m*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+m,e[10]=d-g*u}else if(t.order==="XZY"){const d=o*l,f=o*c,m=a*l,g=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+g,e[5]=o*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=a*h,e[10]=g*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(em,t,nm)}lookAt(t,e,n){const s=this.elements;return On.subVectors(t,e),On.lengthSq()===0&&(On.z=1),On.normalize(),ji.crossVectors(n,On),ji.lengthSq()===0&&(Math.abs(n.z)===1?On.x+=1e-4:On.z+=1e-4,On.normalize(),ji.crossVectors(n,On)),ji.normalize(),Uo.crossVectors(On,ji),s[0]=ji.x,s[4]=Uo.x,s[8]=On.x,s[1]=ji.y,s[5]=Uo.y,s[9]=On.y,s[2]=ji.z,s[6]=Uo.z,s[10]=On.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],g=n[6],x=n[10],p=n[14],v=n[3],y=n[7],_=n[11],T=n[15],A=s[0],E=s[4],R=s[8],S=s[12],b=s[1],U=s[5],P=s[9],G=s[13],Z=s[2],H=s[6],V=s[10],N=s[14],B=s[3],Q=s[7],X=s[11],ft=s[15];return r[0]=o*A+a*b+l*Z+c*B,r[4]=o*E+a*U+l*H+c*Q,r[8]=o*R+a*P+l*V+c*X,r[12]=o*S+a*G+l*N+c*ft,r[1]=h*A+u*b+d*Z+f*B,r[5]=h*E+u*U+d*H+f*Q,r[9]=h*R+u*P+d*V+f*X,r[13]=h*S+u*G+d*N+f*ft,r[2]=m*A+g*b+x*Z+p*B,r[6]=m*E+g*U+x*H+p*Q,r[10]=m*R+g*P+x*V+p*X,r[14]=m*S+g*G+x*N+p*ft,r[3]=v*A+y*b+_*Z+T*B,r[7]=v*E+y*U+_*H+T*Q,r[11]=v*R+y*P+_*V+T*X,r[15]=v*S+y*G+_*N+T*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],g=t[7],x=t[11],p=t[15];return m*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*f-n*l*f)+g*(+e*l*f-e*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+x*(+e*c*u-e*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-s*a*h-e*l*u+e*a*d+s*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],g=t[13],x=t[14],p=t[15],v=u*x*c-g*d*c+g*l*f-a*x*f-u*l*p+a*d*p,y=m*d*c-h*x*c-m*l*f+o*x*f+h*l*p-o*d*p,_=h*g*c-m*u*c+m*a*f-o*g*f-h*a*p+o*u*p,T=m*u*l-h*g*l-m*a*d+o*g*d+h*a*x-o*u*x,A=e*v+n*y+s*_+r*T;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/A;return t[0]=v*E,t[1]=(g*d*r-u*x*r-g*s*f+n*x*f+u*s*p-n*d*p)*E,t[2]=(a*x*r-g*l*r+g*s*c-n*x*c-a*s*p+n*l*p)*E,t[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*f-n*l*f)*E,t[4]=y*E,t[5]=(h*x*r-m*d*r+m*s*f-e*x*f-h*s*p+e*d*p)*E,t[6]=(m*l*r-o*x*r-m*s*c+e*x*c+o*s*p-e*l*p)*E,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*f+e*l*f)*E,t[8]=_*E,t[9]=(m*u*r-h*g*r-m*n*f+e*g*f+h*n*p-e*u*p)*E,t[10]=(o*g*r-m*a*r+m*n*c-e*g*c-o*n*p+e*a*p)*E,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*f-e*a*f)*E,t[12]=T*E,t[13]=(h*g*s-m*u*s+m*n*d-e*g*d-h*n*x+e*u*x)*E,t[14]=(m*a*s-o*g*s-m*n*l+e*g*l+o*n*x-e*a*x)*E,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*d+e*a*d)*E,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,m=r*u,g=o*h,x=o*u,p=a*u,v=l*c,y=l*h,_=l*u,T=n.x,A=n.y,E=n.z;return s[0]=(1-(g+p))*T,s[1]=(f+_)*T,s[2]=(m-y)*T,s[3]=0,s[4]=(f-_)*A,s[5]=(1-(d+p))*A,s[6]=(x+v)*A,s[7]=0,s[8]=(m+y)*E,s[9]=(x-v)*E,s[10]=(1-(d+g))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Zs.set(s[0],s[1],s[2]).length();const o=Zs.set(s[4],s[5],s[6]).length(),a=Zs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ti.copy(this);const c=1/r,h=1/o,u=1/a;return ti.elements[0]*=c,ti.elements[1]*=c,ti.elements[2]*=c,ti.elements[4]*=h,ti.elements[5]*=h,ti.elements[6]*=h,ti.elements[8]*=u,ti.elements[9]*=u,ti.elements[10]*=u,e.setFromRotationMatrix(ti),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=gi,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let m,g;if(l)m=r/(o-r),g=o*r/(o-r);else if(a===gi)m=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ta)m=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=gi,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s);let m,g;if(l)m=1/(o-r),g=o/(o-r);else if(a===gi)m=-2/(o-r),g=-(o+r)/(o-r);else if(a===Ta)m=-1/(o-r),g=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Zs=new L,ti=new he,em=new L(0,0,0),nm=new L(1,1,1),ji=new L,Uo=new L,On=new L,tu=new he,eu=new hs;class yi{constructor(t=0,e=0,n=0,s=yi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(be(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-be(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(be(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return tu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(tu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return eu.setFromEuler(this),this.setFromQuaternion(eu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yi.DEFAULT_ORDER="XYZ";class ch{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let im=0;const nu=new L,js=new hs,Ri=new he,ko=new L,Gr=new L,sm=new L,rm=new hs,iu=new L(1,0,0),su=new L(0,1,0),ru=new L(0,0,1),ou={type:"added"},om={type:"removed"},Ks={type:"childadded",child:null},al={type:"childremoved",child:null};class qe extends Pr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=Ls(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qe.DEFAULT_UP.clone();const t=new L,e=new yi,n=new hs,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new xe}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=qe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ch,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return js.setFromAxisAngle(t,e),this.quaternion.multiply(js),this}rotateOnWorldAxis(t,e){return js.setFromAxisAngle(t,e),this.quaternion.premultiply(js),this}rotateX(t){return this.rotateOnAxis(iu,t)}rotateY(t){return this.rotateOnAxis(su,t)}rotateZ(t){return this.rotateOnAxis(ru,t)}translateOnAxis(t,e){return nu.copy(t).applyQuaternion(this.quaternion),this.position.add(nu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(iu,t)}translateY(t){return this.translateOnAxis(su,t)}translateZ(t){return this.translateOnAxis(ru,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ko.copy(t):ko.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(Gr,ko,this.up):Ri.lookAt(ko,Gr,this.up),this.quaternion.setFromRotationMatrix(Ri),s&&(Ri.extractRotation(s.matrixWorld),js.setFromRotationMatrix(Ri),this.quaternion.premultiply(js.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ou),Ks.child=t,this.dispatchEvent(Ks),Ks.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(om),al.child=t,this.dispatchEvent(al),al.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ri.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ri),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ou),Ks.child=t,this.dispatchEvent(Ks),Ks.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,t,sm),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,rm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}qe.DEFAULT_UP=new L(0,1,0);qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ei=new L,Ci=new L,ll=new L,Pi=new L,Js=new L,Qs=new L,au=new L,cl=new L,hl=new L,ul=new L,dl=new Le,fl=new Le,pl=new Le;class qn{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),ei.subVectors(t,e),s.cross(ei);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){ei.subVectors(s,e),Ci.subVectors(n,e),ll.subVectors(t,e);const o=ei.dot(ei),a=ei.dot(Ci),l=ei.dot(ll),c=Ci.dot(Ci),h=Ci.dot(ll),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,m=(o*h-a*l)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Pi)===null?!1:Pi.x>=0&&Pi.y>=0&&Pi.x+Pi.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Pi.x),l.addScaledVector(o,Pi.y),l.addScaledVector(a,Pi.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return dl.setScalar(0),fl.setScalar(0),pl.setScalar(0),dl.fromBufferAttribute(t,e),fl.fromBufferAttribute(t,n),pl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(dl,r.x),o.addScaledVector(fl,r.y),o.addScaledVector(pl,r.z),o}static isFrontFacing(t,e,n,s){return ei.subVectors(n,e),Ci.subVectors(t,e),ei.cross(Ci).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ei.subVectors(this.c,this.b),Ci.subVectors(this.a,this.b),ei.cross(Ci).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return qn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return qn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return qn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return qn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return qn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Js.subVectors(s,n),Qs.subVectors(r,n),cl.subVectors(t,n);const l=Js.dot(cl),c=Qs.dot(cl);if(l<=0&&c<=0)return e.copy(n);hl.subVectors(t,s);const h=Js.dot(hl),u=Qs.dot(hl);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Js,o);ul.subVectors(t,r);const f=Js.dot(ul),m=Qs.dot(ul);if(m>=0&&f<=m)return e.copy(r);const g=f*c-l*m;if(g<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(Qs,a);const x=h*m-f*u;if(x<=0&&u-h>=0&&f-m>=0)return au.subVectors(r,s),a=(u-h)/(u-h+(f-m)),e.copy(s).addScaledVector(au,a);const p=1/(x+g+d);return o=g*p,a=d*p,e.copy(n).addScaledVector(Js,o).addScaledVector(Qs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const kd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ki={h:0,s:0,l:0},No={h:0,s:0,l:0};function ml(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class ee{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Un){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ke.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ke.workingColorSpace){return this.r=t,this.g=e,this.b=n,ke.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ke.workingColorSpace){if(t=ah(t,1),e=be(e,0,1),n=be(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=ml(o,r,t+1/3),this.g=ml(o,r,t),this.b=ml(o,r,t-1/3)}return ke.colorSpaceToWorking(this,s),this}setStyle(t,e=Un){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Un){const n=kd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Oi(t.r),this.g=Oi(t.g),this.b=Oi(t.b),this}copyLinearToSRGB(t){return this.r=yr(t.r),this.g=yr(t.g),this.b=yr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Un){return ke.workingToColorSpace(Sn.copy(this),t),Math.round(be(Sn.r*255,0,255))*65536+Math.round(be(Sn.g*255,0,255))*256+Math.round(be(Sn.b*255,0,255))}getHexString(t=Un){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ke.workingColorSpace){ke.workingToColorSpace(Sn.copy(this),e);const n=Sn.r,s=Sn.g,r=Sn.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ke.workingColorSpace){return ke.workingToColorSpace(Sn.copy(this),e),t.r=Sn.r,t.g=Sn.g,t.b=Sn.b,t}getStyle(t=Un){ke.workingToColorSpace(Sn.copy(this),t);const e=Sn.r,n=Sn.g,s=Sn.b;return t!==Un?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ki),this.setHSL(Ki.h+t,Ki.s+e,Ki.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ki),t.getHSL(No);const n=eo(Ki.h,No.h,e),s=eo(Ki.s,No.s,e),r=eo(Ki.l,No.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Sn=new ee;ee.NAMES=kd;let am=0;class ps extends Pr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:am++}),this.uuid=Ls(),this.name="",this.type="Material",this.blending=vr,this.side=Hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nc,this.blendDst=ic,this.blendEquation=As,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=Sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ws,this.stencilZFail=Ws,this.stencilZPass=Ws,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==vr&&(n.blending=this.blending),this.side!==Hi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==nc&&(n.blendSrc=this.blendSrc),this.blendDst!==ic&&(n.blendDst=this.blendDst),this.blendEquation!==As&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Sr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==qh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ws&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ws&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ws&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class xn extends ps{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=Sd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const on=new L,Fo=new Wt;let lm=0;class un{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lm++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=$h,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Fo.fromBufferAttribute(this,e),Fo.applyMatrix3(t),this.setXY(e,Fo.x,Fo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)on.fromBufferAttribute(this,e),on.applyMatrix3(t),this.setXYZ(e,on.x,on.y,on.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)on.fromBufferAttribute(this,e),on.applyMatrix4(t),this.setXYZ(e,on.x,on.y,on.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)on.fromBufferAttribute(this,e),on.applyNormalMatrix(t),this.setXYZ(e,on.x,on.y,on.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)on.fromBufferAttribute(this,e),on.transformDirection(t),this.setXYZ(e,on.x,on.y,on.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ur(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=An(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ur(e,this.array)),e}setX(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ur(e,this.array)),e}setY(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ur(e,this.array)),e}setZ(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ur(e,this.array)),e}setW(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=An(e,this.array),n=An(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=An(e,this.array),n=An(n,this.array),s=An(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=An(e,this.array),n=An(n,this.array),s=An(s,this.array),r=An(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==$h&&(t.usage=this.usage),t}}class hh extends un{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Nd extends un{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Gt extends un{constructor(t,e,n){super(new Float32Array(t),e,n)}}let cm=0;const Xn=new he,gl=new qe,tr=new L,Bn=new Nn,Vr=new Nn,pn=new L;class Se extends Pr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cm++}),this.uuid=Ls(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ld(t)?Nd:hh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new xe().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Xn.makeRotationFromQuaternion(t),this.applyMatrix4(Xn),this}rotateX(t){return Xn.makeRotationX(t),this.applyMatrix4(Xn),this}rotateY(t){return Xn.makeRotationY(t),this.applyMatrix4(Xn),this}rotateZ(t){return Xn.makeRotationZ(t),this.applyMatrix4(Xn),this}translate(t,e,n){return Xn.makeTranslation(t,e,n),this.applyMatrix4(Xn),this}scale(t,e,n){return Xn.makeScale(t,e,n),this.applyMatrix4(Xn),this}lookAt(t){return gl.lookAt(t),gl.updateMatrix(),this.applyMatrix4(gl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(tr).negate(),this.translate(tr.x,tr.y,tr.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Gt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Nn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Bn.setFromBufferAttribute(r),this.morphTargetsRelative?(pn.addVectors(this.boundingBox.min,Bn.min),this.boundingBox.expandByPoint(pn),pn.addVectors(this.boundingBox.max,Bn.max),this.boundingBox.expandByPoint(pn)):(this.boundingBox.expandByPoint(Bn.min),this.boundingBox.expandByPoint(Bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(Bn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Vr.setFromBufferAttribute(a),this.morphTargetsRelative?(pn.addVectors(Bn.min,Vr.min),Bn.expandByPoint(pn),pn.addVectors(Bn.max,Vr.max),Bn.expandByPoint(pn)):(Bn.expandByPoint(Vr.min),Bn.expandByPoint(Vr.max))}Bn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)pn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(pn));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)pn.fromBufferAttribute(a,c),l&&(tr.fromBufferAttribute(t,c),pn.add(tr)),s=Math.max(s,n.distanceToSquared(pn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new un(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new L,l[R]=new L;const c=new L,h=new L,u=new L,d=new Wt,f=new Wt,m=new Wt,g=new L,x=new L;function p(R,S,b){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,b),d.fromBufferAttribute(r,R),f.fromBufferAttribute(r,S),m.fromBufferAttribute(r,b),h.sub(c),u.sub(c),f.sub(d),m.sub(d);const U=1/(f.x*m.y-m.x*f.y);isFinite(U)&&(g.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(U),x.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(U),a[R].add(g),a[S].add(g),a[b].add(g),l[R].add(x),l[S].add(x),l[b].add(x))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let R=0,S=v.length;R<S;++R){const b=v[R],U=b.start,P=b.count;for(let G=U,Z=U+P;G<Z;G+=3)p(t.getX(G+0),t.getX(G+1),t.getX(G+2))}const y=new L,_=new L,T=new L,A=new L;function E(R){T.fromBufferAttribute(s,R),A.copy(T);const S=a[R];y.copy(S),y.sub(T.multiplyScalar(T.dot(S))).normalize(),_.crossVectors(A,S);const U=_.dot(l[R])<0?-1:1;o.setXYZW(R,y.x,y.y,y.z,U)}for(let R=0,S=v.length;R<S;++R){const b=v[R],U=b.start,P=b.count;for(let G=U,Z=U+P;G<Z;G+=3)E(t.getX(G+0)),E(t.getX(G+1)),E(t.getX(G+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new un(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,u=new L;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),g=t.getX(d+1),x=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,g),o.fromBufferAttribute(e,x),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(x,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)pn.fromBufferAttribute(t,e),pn.normalize(),t.setXYZ(e,pn.x,pn.y,pn.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,m=0;for(let g=0,x=l.length;g<x;g++){a.isInterleavedBufferAttribute?f=l[g]*a.data.stride+a.offset:f=l[g]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new un(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Se,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const lu=new he,_s=new Ds,Oo=new Vi,cu=new L,Bo=new L,Ho=new L,Go=new L,xl=new L,Vo=new L,hu=new L,Wo=new L;class Jt extends qe{constructor(t=new Se,e=new xn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Vo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(xl.fromBufferAttribute(u,t),o?Vo.addScaledVector(xl,h):Vo.addScaledVector(xl.sub(e),h))}e.add(Vo)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Oo.copy(n.boundingSphere),Oo.applyMatrix4(r),_s.copy(t.ray).recast(t.near),!(Oo.containsPoint(_s.origin)===!1&&(_s.intersectSphere(Oo,cu)===null||_s.origin.distanceToSquared(cu)>(t.far-t.near)**2))&&(lu.copy(r).invert(),_s.copy(t.ray).applyMatrix4(lu),!(n.boundingBox!==null&&_s.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,_s)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,g=d.length;m<g;m++){const x=d[m],p=o[x.materialIndex],v=Math.max(x.start,f.start),y=Math.min(a.count,Math.min(x.start+x.count,f.start+f.count));for(let _=v,T=y;_<T;_+=3){const A=a.getX(_),E=a.getX(_+1),R=a.getX(_+2);s=Xo(this,p,t,n,c,h,u,A,E,R),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=x.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),g=Math.min(a.count,f.start+f.count);for(let x=m,p=g;x<p;x+=3){const v=a.getX(x),y=a.getX(x+1),_=a.getX(x+2);s=Xo(this,o,t,n,c,h,u,v,y,_),s&&(s.faceIndex=Math.floor(x/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,g=d.length;m<g;m++){const x=d[m],p=o[x.materialIndex],v=Math.max(x.start,f.start),y=Math.min(l.count,Math.min(x.start+x.count,f.start+f.count));for(let _=v,T=y;_<T;_+=3){const A=_,E=_+1,R=_+2;s=Xo(this,p,t,n,c,h,u,A,E,R),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=x.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),g=Math.min(l.count,f.start+f.count);for(let x=m,p=g;x<p;x+=3){const v=x,y=x+1,_=x+2;s=Xo(this,o,t,n,c,h,u,v,y,_),s&&(s.faceIndex=Math.floor(x/3),e.push(s))}}}}function hm(i,t,e,n,s,r,o,a){let l;if(t.side===Dn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Hi,a),l===null)return null;Wo.copy(a),Wo.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Wo);return c<e.near||c>e.far?null:{distance:c,point:Wo.clone(),object:i}}function Xo(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Bo),i.getVertexPosition(l,Ho),i.getVertexPosition(c,Go);const h=hm(i,t,e,n,Bo,Ho,Go,hu);if(h){const u=new L;qn.getBarycoord(hu,Bo,Ho,Go,u),s&&(h.uv=qn.getInterpolatedAttribute(s,a,l,c,u,new Wt)),r&&(h.uv1=qn.getInterpolatedAttribute(r,a,l,c,u,new Wt)),o&&(h.normal=qn.getInterpolatedAttribute(o,a,l,c,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new L,materialIndex:0};qn.getNormal(Bo,Ho,Go,d.normal),h.face=d,h.barycoord=u}return h}class Gi extends Se{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Gt(c,3)),this.setAttribute("normal",new Gt(h,3)),this.setAttribute("uv",new Gt(u,2));function m(g,x,p,v,y,_,T,A,E,R,S){const b=_/E,U=T/R,P=_/2,G=T/2,Z=A/2,H=E+1,V=R+1;let N=0,B=0;const Q=new L;for(let X=0;X<V;X++){const ft=X*U-G;for(let Vt=0;Vt<H;Vt++){const Me=Vt*b-P;Q[g]=Me*v,Q[x]=ft*y,Q[p]=Z,c.push(Q.x,Q.y,Q.z),Q[g]=0,Q[x]=0,Q[p]=A>0?1:-1,h.push(Q.x,Q.y,Q.z),u.push(Vt/E),u.push(1-X/R),N+=1}}for(let X=0;X<R;X++)for(let ft=0;ft<E;ft++){const Vt=d+ft+H*X,Me=d+ft+H*(X+1),ce=d+(ft+1)+H*(X+1),ht=d+(ft+1)+H*X;l.push(Vt,Me,ht),l.push(Me,ce,ht),B+=6}a.addGroup(f,B,S),f+=B,d+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Rr(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Rn(i){const t={};for(let e=0;e<i.length;e++){const n=Rr(i[e]);for(const s in n)t[s]=n[s]}return t}function um(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Fd(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ke.workingColorSpace}const Ra={clone:Rr,merge:Rn};var dm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Zn extends ps{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dm,this.fragmentShader=fm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Rr(t.uniforms),this.uniformsGroups=um(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Od extends qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=gi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ji=new L,uu=new Wt,du=new Wt;class kn extends Od{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=uo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(to*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return uo*2*Math.atan(Math.tan(to*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ji.x,Ji.y).multiplyScalar(-t/Ji.z),Ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ji.x,Ji.y).multiplyScalar(-t/Ji.z)}getViewSize(t,e){return this.getViewBounds(t,uu,du),e.subVectors(du,uu)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(to*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const er=-90,nr=1;class pm extends qe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new kn(er,nr,t,e);s.layers=this.layers,this.add(s);const r=new kn(er,nr,t,e);r.layers=this.layers,this.add(r);const o=new kn(er,nr,t,e);o.layers=this.layers,this.add(o);const a=new kn(er,nr,t,e);a.layers=this.layers,this.add(a);const l=new kn(er,nr,t,e);l.layers=this.layers,this.add(l);const c=new kn(er,nr,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===gi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ta)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Bd extends En{constructor(t=[],e=wr,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class mm extends us{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Bd(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Gi(5,5,5),r=new Zn({name:"CubemapFromEquirect",uniforms:Rr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Dn,blending:ls});r.uniforms.tEquirect.value=e;const o=new Jt(s,r),a=e.minFilter;return e.minFilter===os&&(e.minFilter=ri),new pm(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class te extends qe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const gm={type:"move"};class vl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new te,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new te,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new te,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const g of t.hand.values()){const x=e.getJointPose(g,n),p=this._getHandJoint(c,g);x!==null&&(p.matrix.fromArray(x.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=x.radius),p.visible=x!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(gm)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new te;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Ua{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ee(t),this.density=e}clone(){return new Ua(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class xm extends qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yi,this.environmentIntensity=1,this.environmentRotation=new yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const fu=new L,pu=new Le,mu=new Le,vm=new L,gu=new he,qo=new L,yl=new Vi,xu=new he,_l=new Ds;class $o extends Jt{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Xh,this.bindMatrix=new he,this.bindMatrixInverse=new he,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Nn),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,qo),this.boundingBox.expandByPoint(qo)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Vi),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,qo),this.boundingSphere.expandByPoint(qo)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),yl.copy(this.boundingSphere),yl.applyMatrix4(s),t.ray.intersectsSphere(yl)!==!1&&(xu.copy(s).invert(),_l.copy(t.ray).applyMatrix4(xu),!(this.boundingBox!==null&&_l.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,_l)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Le,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Xh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===vp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,s=this.geometry;pu.fromBufferAttribute(s.attributes.skinIndex,t),mu.fromBufferAttribute(s.attributes.skinWeight,t),fu.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const o=mu.getComponent(r);if(o!==0){const a=pu.getComponent(r);gu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(vm.copy(fu).applyMatrix4(gu),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class Hd extends qe{constructor(){super(),this.isBone=!0,this.type="Bone"}}class uh extends En{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Vn,h=Vn,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const vu=new he,ym=new he;class dh{constructor(t=[],e=[]){this.uuid=Ls(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new he)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new he;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:ym;vu.multiplyMatrices(a,e[r]),vu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new dh(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new uh(e,t,t,Gn,oi);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){const r=t.bones[n];let o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Hd),this.bones.push(o),this.boneInverses.push(new he().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const o=e[s];t.bones.push(o.uuid);const a=n[s];t.boneInverses.push(a.toArray())}return t}}class fr extends un{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ir=new he,yu=new he,Yo=[],_u=new Nn,_m=new he,Wr=new Jt,Xr=new Vi;class wn extends Jt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new fr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,_m)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Nn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ir),_u.copy(t.boundingBox).applyMatrix4(ir),this.boundingBox.union(_u)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Vi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ir),Xr.copy(t.boundingSphere).applyMatrix4(ir),this.boundingSphere.union(Xr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Wr.geometry=this.geometry,Wr.material=this.material,Wr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xr.copy(this.boundingSphere),Xr.applyMatrix4(n),t.ray.intersectsSphere(Xr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ir),yu.multiplyMatrices(n,ir),Wr.matrixWorld=yu,Wr.raycast(t,Yo);for(let o=0,a=Yo.length;o<a;o++){const l=Yo[o];l.instanceId=r,l.object=this,e.push(l)}Yo.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new fr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new uh(new Float32Array(s*this.count),s,this.count,nh,oi));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ml=new L,Mm=new L,bm=new xe;class pi{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ml.subVectors(n,e).cross(Mm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ml),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||bm.getNormalMatrix(t),s=this.coplanarPoint(Ml).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ms=new Vi,Sm=new Wt(.5,.5),Zo=new L;class fh{constructor(t=new pi,e=new pi,n=new pi,s=new pi,r=new pi,o=new pi){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=gi,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],g=r[9],x=r[10],p=r[11],v=r[12],y=r[13],_=r[14],T=r[15];if(s[0].setComponents(c-o,f-h,p-m,T-v).normalize(),s[1].setComponents(c+o,f+h,p+m,T+v).normalize(),s[2].setComponents(c+a,f+u,p+g,T+y).normalize(),s[3].setComponents(c-a,f-u,p-g,T-y).normalize(),n)s[4].setComponents(l,d,x,_).normalize(),s[5].setComponents(c-l,f-d,p-x,T-_).normalize();else if(s[4].setComponents(c-l,f-d,p-x,T-_).normalize(),e===gi)s[5].setComponents(c+l,f+d,p+x,T+_).normalize();else if(e===Ta)s[5].setComponents(l,d,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ms.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ms.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ms)}intersectsSprite(t){Ms.center.set(0,0,0);const e=Sm.distanceTo(t.center);return Ms.radius=.7071067811865476+e,Ms.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ms)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Zo.x=s.normal.x>0?t.max.x:t.min.x,Zo.y=s.normal.y>0?t.max.y:t.min.y,Zo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Zo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ph extends ps{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ca=new L,Pa=new L,Mu=new he,qr=new Ds,jo=new Vi,bl=new L,bu=new L;class po extends qe{constructor(t=new Se,e=new ph){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Ca.fromBufferAttribute(e,s-1),Pa.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Ca.distanceTo(Pa);t.setAttribute("lineDistance",new Gt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),jo.copy(n.boundingSphere),jo.applyMatrix4(s),jo.radius+=r,t.ray.intersectsSphere(jo)===!1)return;Mu.copy(s).invert(),qr.copy(t.ray).applyMatrix4(Mu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let g=f,x=m-1;g<x;g+=c){const p=h.getX(g),v=h.getX(g+1),y=Ko(this,t,qr,l,p,v,g);y&&e.push(y)}if(this.isLineLoop){const g=h.getX(m-1),x=h.getX(f),p=Ko(this,t,qr,l,g,x,m-1);p&&e.push(p)}}else{const f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let g=f,x=m-1;g<x;g+=c){const p=Ko(this,t,qr,l,g,g+1,g);p&&e.push(p)}if(this.isLineLoop){const g=Ko(this,t,qr,l,m-1,f,m-1);g&&e.push(g)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ko(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(Ca.fromBufferAttribute(a,s),Pa.fromBufferAttribute(a,r),e.distanceSqToSegment(Ca,Pa,bl,bu)>n)return;bl.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(bl);if(!(c<t.near||c>t.far))return{distance:c,point:bu.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Su=new L,wu=new L;class wm extends po{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Su.fromBufferAttribute(e,s),wu.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Su.distanceTo(wu);t.setAttribute("lineDistance",new Gt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Em extends po{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Tm extends ps{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Eu=new he,Vc=new Ds,Jo=new Vi,Qo=new L;class Am extends qe{constructor(t=new Se,e=new Tm){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jo.copy(n.boundingSphere),Jo.applyMatrix4(s),Jo.radius+=r,t.ray.intersectsSphere(Jo)===!1)return;Eu.copy(s).invert(),Vc.copy(t.ray).applyMatrix4(Eu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let m=d,g=f;m<g;m++){const x=c.getX(m);Qo.fromBufferAttribute(u,x),Tu(Qo,x,l,s,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let m=d,g=f;m<g;m++)Qo.fromBufferAttribute(u,m),Tu(Qo,m,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Tu(i,t,e,n,s,r,o){const a=Vc.distanceSqToPoint(i);if(a<e){const l=new L;Vc.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Gd extends En{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Vd extends En{constructor(t,e,n=zs,s,r,o,a=Vn,l=Vn,c,h=co,u=1){if(h!==co&&h!==ho)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new lh(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Wd extends En{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ka extends Se{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new L,h=new Wt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Gt(o,3)),this.setAttribute("normal",new Gt(a,3)),this.setAttribute("uv",new Gt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ka(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Us extends Se{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let m=0;const g=[],x=n/2;let p=0;v(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Gt(u,3)),this.setAttribute("normal",new Gt(d,3)),this.setAttribute("uv",new Gt(f,2));function v(){const _=new L,T=new L;let A=0;const E=(e-t)/n;for(let R=0;R<=r;R++){const S=[],b=R/r,U=b*(e-t)+t;for(let P=0;P<=s;P++){const G=P/s,Z=G*l+a,H=Math.sin(Z),V=Math.cos(Z);T.x=U*H,T.y=-b*n+x,T.z=U*V,u.push(T.x,T.y,T.z),_.set(H,E,V).normalize(),d.push(_.x,_.y,_.z),f.push(G,1-b),S.push(m++)}g.push(S)}for(let R=0;R<s;R++)for(let S=0;S<r;S++){const b=g[S][R],U=g[S+1][R],P=g[S+1][R+1],G=g[S][R+1];(t>0||S!==0)&&(h.push(b,U,G),A+=3),(e>0||S!==r-1)&&(h.push(U,P,G),A+=3)}c.addGroup(p,A,0),p+=A}function y(_){const T=m,A=new Wt,E=new L;let R=0;const S=_===!0?t:e,b=_===!0?1:-1;for(let P=1;P<=s;P++)u.push(0,x*b,0),d.push(0,b,0),f.push(.5,.5),m++;const U=m;for(let P=0;P<=s;P++){const Z=P/s*l+a,H=Math.cos(Z),V=Math.sin(Z);E.x=S*V,E.y=x*b,E.z=S*H,u.push(E.x,E.y,E.z),d.push(0,b,0),A.x=H*.5+.5,A.y=V*.5*b+.5,f.push(A.x,A.y),m++}for(let P=0;P<s;P++){const G=T+P,Z=U+P;_===!0?h.push(Z,Z+1,G):h.push(Z+1,Z,G),R+=3}c.addGroup(p,R,_===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Us(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class mh extends Us{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new mh(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class yo extends Se{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new Gt(r,3)),this.setAttribute("normal",new Gt(r.slice(),3)),this.setAttribute("uv",new Gt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const y=new L,_=new L,T=new L;for(let A=0;A<e.length;A+=3)f(e[A+0],y),f(e[A+1],_),f(e[A+2],T),l(y,_,T,v)}function l(v,y,_,T){const A=T+1,E=[];for(let R=0;R<=A;R++){E[R]=[];const S=v.clone().lerp(_,R/A),b=y.clone().lerp(_,R/A),U=A-R;for(let P=0;P<=U;P++)P===0&&R===A?E[R][P]=S:E[R][P]=S.clone().lerp(b,P/U)}for(let R=0;R<A;R++)for(let S=0;S<2*(A-R)-1;S++){const b=Math.floor(S/2);S%2===0?(d(E[R][b+1]),d(E[R+1][b]),d(E[R][b])):(d(E[R][b+1]),d(E[R+1][b+1]),d(E[R+1][b]))}}function c(v){const y=new L;for(let _=0;_<r.length;_+=3)y.x=r[_+0],y.y=r[_+1],y.z=r[_+2],y.normalize().multiplyScalar(v),r[_+0]=y.x,r[_+1]=y.y,r[_+2]=y.z}function h(){const v=new L;for(let y=0;y<r.length;y+=3){v.x=r[y+0],v.y=r[y+1],v.z=r[y+2];const _=x(v)/2/Math.PI+.5,T=p(v)/Math.PI+.5;o.push(_,1-T)}m(),u()}function u(){for(let v=0;v<o.length;v+=6){const y=o[v+0],_=o[v+2],T=o[v+4],A=Math.max(y,_,T),E=Math.min(y,_,T);A>.9&&E<.1&&(y<.2&&(o[v+0]+=1),_<.2&&(o[v+2]+=1),T<.2&&(o[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function f(v,y){const _=v*3;y.x=t[_+0],y.y=t[_+1],y.z=t[_+2]}function m(){const v=new L,y=new L,_=new L,T=new L,A=new Wt,E=new Wt,R=new Wt;for(let S=0,b=0;S<r.length;S+=9,b+=6){v.set(r[S+0],r[S+1],r[S+2]),y.set(r[S+3],r[S+4],r[S+5]),_.set(r[S+6],r[S+7],r[S+8]),A.set(o[b+0],o[b+1]),E.set(o[b+2],o[b+3]),R.set(o[b+4],o[b+5]),T.copy(v).add(y).add(_).divideScalar(3);const U=x(T);g(A,b+0,v,U),g(E,b+2,y,U),g(R,b+4,_,U)}}function g(v,y,_,T){T<0&&v.x===1&&(o[y]=v.x-1),_.x===0&&_.z===0&&(o[y]=T/2/Math.PI+.5)}function x(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yo(t.vertices,t.indices,t.radius,t.details)}}class Na extends yo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Na(t.radius,t.detail)}}class Wi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new Wt:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new L,s=[],r=[],o=[],a=new L,l=new he;for(let f=0;f<=t;f++){const m=f/t;s[f]=this.getTangentAt(m,new L)}r[0]=new L,o[0]=new L;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(be(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(be(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Xd extends Wi{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Wt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Rm extends Xd{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function gh(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const ta=new L,Sl=new gh,wl=new gh,El=new gh;class mo extends Wi{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(ta.subVectors(s[0],s[1]).add(s[0]),c=ta);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(ta.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=ta),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(h),f);g<1e-4&&(g=1),m<1e-4&&(m=g),x<1e-4&&(x=g),Sl.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,g,x),wl.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,g,x),El.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,g,x)}else this.curveType==="catmullrom"&&(Sl.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),wl.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),El.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Sl.calc(l),wl.calc(l),El.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Au(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function Cm(i,t){const e=1-i;return e*e*t}function Pm(i,t){return 2*(1-i)*i*t}function zm(i,t){return i*i*t}function no(i,t,e,n){return Cm(i,t)+Pm(i,e)+zm(i,n)}function Dm(i,t){const e=1-i;return e*e*e*t}function Im(i,t){const e=1-i;return 3*e*e*i*t}function Lm(i,t){return 3*(1-i)*i*i*t}function Um(i,t){return i*i*i*t}function io(i,t,e,n,s){return Dm(i,t)+Im(i,e)+Lm(i,n)+Um(i,s)}class km extends Wi{constructor(t=new Wt,e=new Wt,n=new Wt,s=new Wt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Wt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(io(t,s.x,r.x,o.x,a.x),io(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Nm extends Wi{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(io(t,s.x,r.x,o.x,a.x),io(t,s.y,r.y,o.y,a.y),io(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Fm extends Wi{constructor(t=new Wt,e=new Wt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Wt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Wt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Om extends Wi{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Bm extends Wi{constructor(t=new Wt,e=new Wt,n=new Wt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Wt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(no(t,s.x,r.x,o.x),no(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qd extends Wi{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(no(t,s.x,r.x,o.x),no(t,s.y,r.y,o.y),no(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Hm extends Wi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Wt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Au(a,l.x,c.x,h.x,u.x),Au(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Wt().fromArray(s))}return this}}var Gm=Object.freeze({__proto__:null,ArcCurve:Rm,CatmullRomCurve3:mo,CubicBezierCurve:km,CubicBezierCurve3:Nm,EllipseCurve:Xd,LineCurve:Fm,LineCurve3:Om,QuadraticBezierCurve:Bm,QuadraticBezierCurve3:qd,SplineCurve:Hm});class xh extends yo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new xh(t.radius,t.detail)}}class vh extends yo{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new vh(t.radius,t.detail)}}class Ni extends Se{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,f=[],m=[],g=[],x=[];for(let p=0;p<h;p++){const v=p*d-o;for(let y=0;y<c;y++){const _=y*u-r;m.push(_,-v,0),g.push(0,0,1),x.push(y/a),x.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<a;v++){const y=v+c*p,_=v+c*(p+1),T=v+1+c*(p+1),A=v+1+c*p;f.push(y,_,A),f.push(_,T,A)}this.setIndex(f),this.setAttribute("position",new Gt(m,3)),this.setAttribute("normal",new Gt(g,3)),this.setAttribute("uv",new Gt(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ni(t.width,t.height,t.widthSegments,t.heightSegments)}}class as extends Se{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let u=t;const d=(e-t)/s,f=new L,m=new Wt;for(let g=0;g<=s;g++){for(let x=0;x<=n;x++){const p=r+x/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}u+=d}for(let g=0;g<s;g++){const x=g*(n+1);for(let p=0;p<n;p++){const v=p+x,y=v,_=v+n+1,T=v+n+2,A=v+1;a.push(y,_,A),a.push(_,T,A)}}this.setIndex(a),this.setAttribute("position",new Gt(l,3)),this.setAttribute("normal",new Gt(c,3)),this.setAttribute("uv",new Gt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new as(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class jn extends Se{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new L,d=new L,f=[],m=[],g=[],x=[];for(let p=0;p<=n;p++){const v=[],y=p/n;let _=0;p===0&&o===0?_=.5/e:p===n&&l===Math.PI&&(_=-.5/e);for(let T=0;T<=e;T++){const A=T/e;u.x=-t*Math.cos(s+A*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+A*r)*Math.sin(o+y*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),g.push(d.x,d.y,d.z),x.push(A+_,1-y),v.push(c++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<e;v++){const y=h[p][v+1],_=h[p][v],T=h[p+1][v],A=h[p+1][v+1];(p!==0||o>0)&&f.push(y,_,A),(p!==n-1||l<Math.PI)&&f.push(_,T,A)}this.setIndex(f),this.setAttribute("position",new Gt(m,3)),this.setAttribute("normal",new Gt(g,3)),this.setAttribute("uv",new Gt(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class yh extends Se{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new L,u=new L,d=new L;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const g=m/s*r,x=f/n*Math.PI*2;u.x=(t+e*Math.cos(x))*Math.cos(g),u.y=(t+e*Math.cos(x))*Math.sin(g),u.z=e*Math.sin(x),a.push(u.x,u.y,u.z),h.x=t*Math.cos(g),h.y=t*Math.sin(g),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const g=(s+1)*f+m-1,x=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,v=(s+1)*f+m;o.push(g,x,v),o.push(x,p,v)}this.setIndex(o),this.setAttribute("position",new Gt(a,3)),this.setAttribute("normal",new Gt(l,3)),this.setAttribute("uv",new Gt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yh(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Fa extends Se{constructor(t=new qd(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new L,l=new L,c=new Wt;let h=new L;const u=[],d=[],f=[],m=[];g(),this.setIndex(m),this.setAttribute("position",new Gt(u,3)),this.setAttribute("normal",new Gt(d,3)),this.setAttribute("uv",new Gt(f,2));function g(){for(let y=0;y<e;y++)x(y);x(r===!1?e:0),v(),p()}function x(y){h=t.getPointAt(y/e,h);const _=o.normals[y],T=o.binormals[y];for(let A=0;A<=s;A++){const E=A/s*Math.PI*2,R=Math.sin(E),S=-Math.cos(E);l.x=S*_.x+R*T.x,l.y=S*_.y+R*T.y,l.z=S*_.z+R*T.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let y=1;y<=e;y++)for(let _=1;_<=s;_++){const T=(s+1)*(y-1)+(_-1),A=(s+1)*y+(_-1),E=(s+1)*y+_,R=(s+1)*(y-1)+_;m.push(T,A,R),m.push(A,E,R)}}function v(){for(let y=0;y<=e;y++)for(let _=0;_<=s;_++)c.x=y/e,c.y=_/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Fa(new Gm[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Ve extends ps{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oh,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class $d extends Ve{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Wt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return be(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class gn extends ps{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new ee(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=oh,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class Vm extends ps{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_p,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Wm extends ps{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Yd extends ph{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class _h extends qe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Xm extends _h{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(qe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Tl=new he,Ru=new L,Cu=new L;class Zd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Wt(512,512),this.mapType=vi,this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fh,this._frameExtents=new Wt(1,1),this._viewportCount=1,this._viewports=[new Le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ru.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ru),Cu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Cu),e.updateMatrixWorld(),Tl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tl,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Tl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Pu=new he,$r=new L,Al=new L;class qm extends Zd{constructor(){super(new kn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Wt(4,2),this._viewportCount=6,this._viewports=[new Le(2,1,1,1),new Le(0,1,1,1),new Le(3,1,1,1),new Le(1,1,1,1),new Le(3,0,1,1),new Le(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),$r.setFromMatrixPosition(t.matrixWorld),n.position.copy($r),Al.copy(n.position),Al.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Al),n.updateMatrixWorld(),s.makeTranslation(-$r.x,-$r.y,-$r.z),Pu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Pu,n.coordinateSystem,n.reversedDepth)}}class $m extends _h{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new qm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class jd extends Od{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Ym extends Zd{constructor(){super(new jd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Zm extends _h{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(qe.DEFAULT_UP),this.updateMatrix(),this.target=new qe,this.shadow=new Ym}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class jm extends Se{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Km extends kn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const zu=new he;class Rl{constructor(t,e,n=0,s=1/0){this.ray=new Ds(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new ch,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return zu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(zu),this}intersectObject(t,e=!0,n=[]){return Wc(t,this,n,e),n.sort(Du),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Wc(t[s],this,n,e);return n.sort(Du),n}}function Du(i,t){return i.distance-t.distance}function Wc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Wc(r[o],t,e,!0)}}function Iu(i,t,e,n){const s=Jm(n);switch(e){case Pd:return i*t;case nh:return i*t/s.components*s.byteLength;case ih:return i*t/s.components*s.byteLength;case Dd:return i*t*2/s.components*s.byteLength;case sh:return i*t*2/s.components*s.byteLength;case zd:return i*t*3/s.components*s.byteLength;case Gn:return i*t*4/s.components*s.byteLength;case rh:return i*t*4/s.components*s.byteLength;case ya:case _a:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ma:case ba:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case mc:case xc:return Math.max(i,16)*Math.max(t,8)/4;case pc:case gc:return Math.max(i,8)*Math.max(t,8)/2;case vc:case yc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case _c:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Mc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case bc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Sc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case wc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ec:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Tc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ac:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Rc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Cc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Pc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case zc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Dc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ic:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Lc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Uc:case kc:case Nc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Fc:case Oc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Bc:case Hc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Jm(i){switch(i){case vi:case Td:return{byteLength:1,components:1};case ao:case Ad:case vo:return{byteLength:2,components:1};case th:case eh:return{byteLength:2,components:4};case zs:case Qc:case oi:return{byteLength:4,components:1};case Rd:case Cd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Kd(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Qm(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],g=u[f];g.start<=m.start+m.count+1?m.count=Math.max(m.count,g.start+g.count-m.start):(++d,u[d]=g)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const g=u[f];i.bufferSubData(c,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var t0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,e0=`#ifdef USE_ALPHAHASH
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
#endif`,n0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,i0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,s0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,r0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,o0=`#ifdef USE_AOMAP
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
#endif`,a0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,l0=`#ifdef USE_BATCHING
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
#endif`,c0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,h0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,u0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,d0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,f0=`#ifdef USE_IRIDESCENCE
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
#endif`,p0=`#ifdef USE_BUMPMAP
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
#endif`,m0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,g0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,x0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,v0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,y0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,M0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,b0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,S0=`#define PI 3.141592653589793
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
} // validated`,w0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,E0=`vec3 transformedNormal = objectNormal;
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
#endif`,T0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,A0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,R0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,C0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,P0="gl_FragColor = linearToOutputTexel( gl_FragColor );",z0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,D0=`#ifdef USE_ENVMAP
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
#endif`,I0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,L0=`#ifdef USE_ENVMAP
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
#endif`,U0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,k0=`#ifdef USE_ENVMAP
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
#endif`,N0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,F0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,O0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,B0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,H0=`#ifdef USE_GRADIENTMAP
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
}`,G0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,V0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,W0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,X0=`uniform bool receiveShadow;
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
#endif`,q0=`#ifdef USE_ENVMAP
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
#endif`,$0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Y0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Z0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,j0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,K0=`PhysicalMaterial material;
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
#endif`,J0=`struct PhysicalMaterial {
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
}`,Q0=`
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
#endif`,tg=`#if defined( RE_IndirectDiffuse )
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
#endif`,eg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ng=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ig=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,og=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ag=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,cg=`#if defined( USE_POINTS_UV )
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
#endif`,hg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ug=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mg=`#ifdef USE_MORPHTARGETS
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
#endif`,gg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,vg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,yg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_g=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bg=`#ifdef USE_NORMALMAP
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
#endif`,Sg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Eg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Tg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ag=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Cg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ig=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ug=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ng=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Fg=`float getShadowMask() {
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
}`,Og=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Bg=`#ifdef USE_SKINNING
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
#endif`,Hg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Gg=`#ifdef USE_SKINNING
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
#endif`,Vg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,$g=`#ifdef USE_TRANSMISSION
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
#endif`,Yg=`#ifdef USE_TRANSMISSION
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
#endif`,Zg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tx=`uniform sampler2D t2D;
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
}`,ex=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ix=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rx=`#include <common>
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
}`,ox=`#if DEPTH_PACKING == 3200
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
}`,ax=`#define DISTANCE
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
}`,lx=`#define DISTANCE
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
}`,cx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ux=`uniform float scale;
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
}`,dx=`uniform vec3 diffuse;
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
}`,fx=`#include <common>
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
}`,px=`uniform vec3 diffuse;
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
}`,mx=`#define LAMBERT
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
}`,gx=`#define LAMBERT
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
}`,xx=`#define MATCAP
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
}`,vx=`#define MATCAP
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
}`,yx=`#define NORMAL
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
}`,_x=`#define NORMAL
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
}`,Mx=`#define PHONG
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
}`,bx=`#define PHONG
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
}`,Sx=`#define STANDARD
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
}`,wx=`#define STANDARD
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
}`,Ex=`#define TOON
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
}`,Tx=`#define TOON
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
}`,Ax=`uniform float size;
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
}`,Rx=`uniform vec3 diffuse;
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
}`,Cx=`#include <common>
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
}`,Px=`uniform vec3 color;
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
}`,zx=`uniform float rotation;
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
}`,Dx=`uniform vec3 diffuse;
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
}`,ye={alphahash_fragment:t0,alphahash_pars_fragment:e0,alphamap_fragment:n0,alphamap_pars_fragment:i0,alphatest_fragment:s0,alphatest_pars_fragment:r0,aomap_fragment:o0,aomap_pars_fragment:a0,batching_pars_vertex:l0,batching_vertex:c0,begin_vertex:h0,beginnormal_vertex:u0,bsdfs:d0,iridescence_fragment:f0,bumpmap_pars_fragment:p0,clipping_planes_fragment:m0,clipping_planes_pars_fragment:g0,clipping_planes_pars_vertex:x0,clipping_planes_vertex:v0,color_fragment:y0,color_pars_fragment:_0,color_pars_vertex:M0,color_vertex:b0,common:S0,cube_uv_reflection_fragment:w0,defaultnormal_vertex:E0,displacementmap_pars_vertex:T0,displacementmap_vertex:A0,emissivemap_fragment:R0,emissivemap_pars_fragment:C0,colorspace_fragment:P0,colorspace_pars_fragment:z0,envmap_fragment:D0,envmap_common_pars_fragment:I0,envmap_pars_fragment:L0,envmap_pars_vertex:U0,envmap_physical_pars_fragment:q0,envmap_vertex:k0,fog_vertex:N0,fog_pars_vertex:F0,fog_fragment:O0,fog_pars_fragment:B0,gradientmap_pars_fragment:H0,lightmap_pars_fragment:G0,lights_lambert_fragment:V0,lights_lambert_pars_fragment:W0,lights_pars_begin:X0,lights_toon_fragment:$0,lights_toon_pars_fragment:Y0,lights_phong_fragment:Z0,lights_phong_pars_fragment:j0,lights_physical_fragment:K0,lights_physical_pars_fragment:J0,lights_fragment_begin:Q0,lights_fragment_maps:tg,lights_fragment_end:eg,logdepthbuf_fragment:ng,logdepthbuf_pars_fragment:ig,logdepthbuf_pars_vertex:sg,logdepthbuf_vertex:rg,map_fragment:og,map_pars_fragment:ag,map_particle_fragment:lg,map_particle_pars_fragment:cg,metalnessmap_fragment:hg,metalnessmap_pars_fragment:ug,morphinstance_vertex:dg,morphcolor_vertex:fg,morphnormal_vertex:pg,morphtarget_pars_vertex:mg,morphtarget_vertex:gg,normal_fragment_begin:xg,normal_fragment_maps:vg,normal_pars_fragment:yg,normal_pars_vertex:_g,normal_vertex:Mg,normalmap_pars_fragment:bg,clearcoat_normal_fragment_begin:Sg,clearcoat_normal_fragment_maps:wg,clearcoat_pars_fragment:Eg,iridescence_pars_fragment:Tg,opaque_fragment:Ag,packing:Rg,premultiplied_alpha_fragment:Cg,project_vertex:Pg,dithering_fragment:zg,dithering_pars_fragment:Dg,roughnessmap_fragment:Ig,roughnessmap_pars_fragment:Lg,shadowmap_pars_fragment:Ug,shadowmap_pars_vertex:kg,shadowmap_vertex:Ng,shadowmask_pars_fragment:Fg,skinbase_vertex:Og,skinning_pars_vertex:Bg,skinning_vertex:Hg,skinnormal_vertex:Gg,specularmap_fragment:Vg,specularmap_pars_fragment:Wg,tonemapping_fragment:Xg,tonemapping_pars_fragment:qg,transmission_fragment:$g,transmission_pars_fragment:Yg,uv_pars_fragment:Zg,uv_pars_vertex:jg,uv_vertex:Kg,worldpos_vertex:Jg,background_vert:Qg,background_frag:tx,backgroundCube_vert:ex,backgroundCube_frag:nx,cube_vert:ix,cube_frag:sx,depth_vert:rx,depth_frag:ox,distanceRGBA_vert:ax,distanceRGBA_frag:lx,equirect_vert:cx,equirect_frag:hx,linedashed_vert:ux,linedashed_frag:dx,meshbasic_vert:fx,meshbasic_frag:px,meshlambert_vert:mx,meshlambert_frag:gx,meshmatcap_vert:xx,meshmatcap_frag:vx,meshnormal_vert:yx,meshnormal_frag:_x,meshphong_vert:Mx,meshphong_frag:bx,meshphysical_vert:Sx,meshphysical_frag:wx,meshtoon_vert:Ex,meshtoon_frag:Tx,points_vert:Ax,points_frag:Rx,shadow_vert:Cx,shadow_frag:Px,sprite_vert:zx,sprite_frag:Dx},Pt={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new xe},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new xe}},envmap:{envMap:{value:null},envMapRotation:{value:new xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new xe},normalScale:{value:new Wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0},uvTransform:{value:new xe}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new Wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new xe},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0}}},mi={basic:{uniforms:Rn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.fog]),vertexShader:ye.meshbasic_vert,fragmentShader:ye.meshbasic_frag},lambert:{uniforms:Rn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new ee(0)}}]),vertexShader:ye.meshlambert_vert,fragmentShader:ye.meshlambert_frag},phong:{uniforms:Rn([Pt.common,Pt.specularmap,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,Pt.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30}}]),vertexShader:ye.meshphong_vert,fragmentShader:ye.meshphong_frag},standard:{uniforms:Rn([Pt.common,Pt.envmap,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.roughnessmap,Pt.metalnessmap,Pt.fog,Pt.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ye.meshphysical_vert,fragmentShader:ye.meshphysical_frag},toon:{uniforms:Rn([Pt.common,Pt.aomap,Pt.lightmap,Pt.emissivemap,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.gradientmap,Pt.fog,Pt.lights,{emissive:{value:new ee(0)}}]),vertexShader:ye.meshtoon_vert,fragmentShader:ye.meshtoon_frag},matcap:{uniforms:Rn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,Pt.fog,{matcap:{value:null}}]),vertexShader:ye.meshmatcap_vert,fragmentShader:ye.meshmatcap_frag},points:{uniforms:Rn([Pt.points,Pt.fog]),vertexShader:ye.points_vert,fragmentShader:ye.points_frag},dashed:{uniforms:Rn([Pt.common,Pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ye.linedashed_vert,fragmentShader:ye.linedashed_frag},depth:{uniforms:Rn([Pt.common,Pt.displacementmap]),vertexShader:ye.depth_vert,fragmentShader:ye.depth_frag},normal:{uniforms:Rn([Pt.common,Pt.bumpmap,Pt.normalmap,Pt.displacementmap,{opacity:{value:1}}]),vertexShader:ye.meshnormal_vert,fragmentShader:ye.meshnormal_frag},sprite:{uniforms:Rn([Pt.sprite,Pt.fog]),vertexShader:ye.sprite_vert,fragmentShader:ye.sprite_frag},background:{uniforms:{uvTransform:{value:new xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ye.background_vert,fragmentShader:ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new xe}},vertexShader:ye.backgroundCube_vert,fragmentShader:ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ye.cube_vert,fragmentShader:ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ye.equirect_vert,fragmentShader:ye.equirect_frag},distanceRGBA:{uniforms:Rn([Pt.common,Pt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ye.distanceRGBA_vert,fragmentShader:ye.distanceRGBA_frag},shadow:{uniforms:Rn([Pt.lights,Pt.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:ye.shadow_vert,fragmentShader:ye.shadow_frag}};mi.physical={uniforms:Rn([mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new xe},clearcoatNormalScale:{value:new Wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new xe},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new xe},transmissionSamplerSize:{value:new Wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new xe},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new xe},anisotropyVector:{value:new Wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new xe}}]),vertexShader:ye.meshphysical_vert,fragmentShader:ye.meshphysical_frag};const ea={r:0,b:0,g:0},bs=new yi,Ix=new he;function Lx(i,t,e,n,s,r,o){const a=new ee(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function m(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?e:t).get(_)),_}function g(y){let _=!1;const T=m(y);T===null?p(a,l):T&&T.isColor&&(p(T,1),_=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(y,_){const T=m(_);T&&(T.isCubeTexture||T.mapping===La)?(h===void 0&&(h=new Jt(new Gi(1,1,1),new Zn({name:"BackgroundCubeMaterial",uniforms:Rr(mi.backgroundCube.uniforms),vertexShader:mi.backgroundCube.vertexShader,fragmentShader:mi.backgroundCube.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),bs.copy(_.backgroundRotation),bs.x*=-1,bs.y*=-1,bs.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(bs.y*=-1,bs.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ix.makeRotationFromEuler(bs)),h.material.toneMapped=ke.getTransfer(T.colorSpace)!==Ge,(u!==T||d!==T.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new Jt(new Ni(2,2),new Zn({name:"BackgroundMaterial",uniforms:Rr(mi.background.uniforms),vertexShader:mi.background.vertexShader,fragmentShader:mi.background.fragmentShader,side:Hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=ke.getTransfer(T.colorSpace)!==Ge,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||d!==T.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,_){y.getRGB(ea,Fd(i)),n.buffers.color.setClear(ea.r,ea.g,ea.b,_,o)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,_=1){a.set(y),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:g,addToRenderList:x,dispose:v}}function Ux(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(b,U,P,G,Z){let H=!1;const V=u(G,P,U);r!==V&&(r=V,c(r.object)),H=f(b,G,P,Z),H&&m(b,G,P,Z),Z!==null&&t.update(Z,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,_(b,U,P,G),Z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function l(){return i.createVertexArray()}function c(b){return i.bindVertexArray(b)}function h(b){return i.deleteVertexArray(b)}function u(b,U,P){const G=P.wireframe===!0;let Z=n[b.id];Z===void 0&&(Z={},n[b.id]=Z);let H=Z[U.id];H===void 0&&(H={},Z[U.id]=H);let V=H[G];return V===void 0&&(V=d(l()),H[G]=V),V}function d(b){const U=[],P=[],G=[];for(let Z=0;Z<e;Z++)U[Z]=0,P[Z]=0,G[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:P,attributeDivisors:G,object:b,attributes:{},index:null}}function f(b,U,P,G){const Z=r.attributes,H=U.attributes;let V=0;const N=P.getAttributes();for(const B in N)if(N[B].location>=0){const X=Z[B];let ft=H[B];if(ft===void 0&&(B==="instanceMatrix"&&b.instanceMatrix&&(ft=b.instanceMatrix),B==="instanceColor"&&b.instanceColor&&(ft=b.instanceColor)),X===void 0||X.attribute!==ft||ft&&X.data!==ft.data)return!0;V++}return r.attributesNum!==V||r.index!==G}function m(b,U,P,G){const Z={},H=U.attributes;let V=0;const N=P.getAttributes();for(const B in N)if(N[B].location>=0){let X=H[B];X===void 0&&(B==="instanceMatrix"&&b.instanceMatrix&&(X=b.instanceMatrix),B==="instanceColor"&&b.instanceColor&&(X=b.instanceColor));const ft={};ft.attribute=X,X&&X.data&&(ft.data=X.data),Z[B]=ft,V++}r.attributes=Z,r.attributesNum=V,r.index=G}function g(){const b=r.newAttributes;for(let U=0,P=b.length;U<P;U++)b[U]=0}function x(b){p(b,0)}function p(b,U){const P=r.newAttributes,G=r.enabledAttributes,Z=r.attributeDivisors;P[b]=1,G[b]===0&&(i.enableVertexAttribArray(b),G[b]=1),Z[b]!==U&&(i.vertexAttribDivisor(b,U),Z[b]=U)}function v(){const b=r.newAttributes,U=r.enabledAttributes;for(let P=0,G=U.length;P<G;P++)U[P]!==b[P]&&(i.disableVertexAttribArray(P),U[P]=0)}function y(b,U,P,G,Z,H,V){V===!0?i.vertexAttribIPointer(b,U,P,Z,H):i.vertexAttribPointer(b,U,P,G,Z,H)}function _(b,U,P,G){g();const Z=G.attributes,H=P.getAttributes(),V=U.defaultAttributeValues;for(const N in H){const B=H[N];if(B.location>=0){let Q=Z[N];if(Q===void 0&&(N==="instanceMatrix"&&b.instanceMatrix&&(Q=b.instanceMatrix),N==="instanceColor"&&b.instanceColor&&(Q=b.instanceColor)),Q!==void 0){const X=Q.normalized,ft=Q.itemSize,Vt=t.get(Q);if(Vt===void 0)continue;const Me=Vt.buffer,ce=Vt.type,ht=Vt.bytesPerElement,Y=ce===i.INT||ce===i.UNSIGNED_INT||Q.gpuType===Qc;if(Q.isInterleavedBufferAttribute){const rt=Q.data,_t=rt.stride,Xt=Q.offset;if(rt.isInstancedInterleavedBuffer){for(let Nt=0;Nt<B.locationSize;Nt++)p(B.location+Nt,rt.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Nt=0;Nt<B.locationSize;Nt++)x(B.location+Nt);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let Nt=0;Nt<B.locationSize;Nt++)y(B.location+Nt,ft/B.locationSize,ce,X,_t*ht,(Xt+ft/B.locationSize*Nt)*ht,Y)}else{if(Q.isInstancedBufferAttribute){for(let rt=0;rt<B.locationSize;rt++)p(B.location+rt,Q.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let rt=0;rt<B.locationSize;rt++)x(B.location+rt);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let rt=0;rt<B.locationSize;rt++)y(B.location+rt,ft/B.locationSize,ce,X,ft*ht,ft/B.locationSize*rt*ht,Y)}}else if(V!==void 0){const X=V[N];if(X!==void 0)switch(X.length){case 2:i.vertexAttrib2fv(B.location,X);break;case 3:i.vertexAttrib3fv(B.location,X);break;case 4:i.vertexAttrib4fv(B.location,X);break;default:i.vertexAttrib1fv(B.location,X)}}}}v()}function T(){R();for(const b in n){const U=n[b];for(const P in U){const G=U[P];for(const Z in G)h(G[Z].object),delete G[Z];delete U[P]}delete n[b]}}function A(b){if(n[b.id]===void 0)return;const U=n[b.id];for(const P in U){const G=U[P];for(const Z in G)h(G[Z].object),delete G[Z];delete U[P]}delete n[b.id]}function E(b){for(const U in n){const P=n[U];if(P[b.id]===void 0)continue;const G=P[b.id];for(const Z in G)h(G[Z].object),delete G[Z];delete P[b.id]}}function R(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:S,dispose:T,releaseStatesOfGeometry:A,releaseStatesOfProgram:E,initAttributes:g,enableAttribute:x,disableUnusedAttributes:v}}function kx(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let g=0;g<u;g++)m+=h[g]*d[g];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Nx(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==Gn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const R=E===vo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==vi&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==oi&&!R)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),x=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,A=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:g,maxCubemapSize:x,maxAttributes:p,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:T,maxSamples:A}}function Fx(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new pi,a=new xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,g=u.clipIntersection,x=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!x)r?h(null):c();else{const v=r?0:n,y=v*4;let _=p.clippingState||null;l.value=_,_=h(m,d,y,f);for(let T=0;T!==y;++T)_[T]=e[T];p.clippingState=_,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){const g=u!==null?u.length:0;let x=null;if(g!==0){if(x=l.value,m!==!0||x===null){const p=f+g*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(x===null||x.length<p)&&(x=new Float32Array(p));for(let y=0,_=f;y!==g;++y,_+=4)o.copy(u[y]).applyMatrix4(v,a),o.normal.toArray(x,_),x[_+3]=o.constant}l.value=x,l.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,x}}function Ox(i){let t=new WeakMap;function e(o,a){return a===uc?o.mapping=wr:a===dc&&(o.mapping=Er),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===uc||a===dc)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new mm(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const pr=4,Lu=[.125,.215,.35,.446,.526,.582],Rs=20,Cl=new jd,Uu=new ee;let Pl=null,zl=0,Dl=0,Il=!1;const Es=(1+Math.sqrt(5))/2,sr=1/Es,ku=[new L(-Es,sr,0),new L(Es,sr,0),new L(-sr,0,Es),new L(sr,0,Es),new L(0,Es,-sr),new L(0,Es,sr),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],Bx=new L;class Nu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=Bx}=r;Pl=this._renderer.getRenderTarget(),zl=this._renderer.getActiveCubeFace(),Dl=this._renderer.getActiveMipmapLevel(),Il=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ou(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Pl,zl,Dl),this._renderer.xr.enabled=Il,t.scissorTest=!1,na(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===wr||t.mapping===Er?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Pl=this._renderer.getRenderTarget(),zl=this._renderer.getActiveCubeFace(),Dl=this._renderer.getActiveMipmapLevel(),Il=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ri,minFilter:ri,generateMipmaps:!1,type:vo,format:Gn,colorSpace:Ar,depthBuffer:!1},s=Fu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fu(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hx(r)),this._blurMaterial=Gx(r,t,e)}return s}_compileMaterial(t){const e=new Jt(this._lodPlanes[0],t);this._renderer.compile(e,Cl)}_sceneToCubeUV(t,e,n,s,r){const l=new kn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Uu),u.toneMapping=cs,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const g=new xn({name:"PMREM.Background",side:Dn,depthWrite:!1,depthTest:!1}),x=new Jt(new Gi,g);let p=!1;const v=t.background;v?v.isColor&&(g.color.copy(v),t.background=null,p=!0):(g.color.copy(Uu),p=!0);for(let y=0;y<6;y++){const _=y%3;_===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):_===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));const T=this._cubeSize;na(s,_*T,y>2?T:0,T,T),u.setRenderTarget(s),p&&u.render(x,l),u.render(t,l)}x.geometry.dispose(),x.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=v}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===wr||t.mapping===Er;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ou());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Jt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;na(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Cl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=ku[(s-r-1)%ku.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Jt(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Rs-1),g=r/m,x=isFinite(r)?1+Math.floor(h*g):Rs;x>Rs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Rs}`);const p=[];let v=0;for(let E=0;E<Rs;++E){const R=E/g,S=Math.exp(-R*R/2);p.push(S),E===0?v+=S:E<x&&(v+=2*S)}for(let E=0;E<p.length;E++)p[E]=p[E]/v;d.envMap.value=t.texture,d.samples.value=x,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=m,d.mipInt.value=y-n;const _=this._sizeLods[s],T=3*_*(s>y-pr?s-y+pr:0),A=4*(this._cubeSize-_);na(e,T,A,3*_,2*_),l.setRenderTarget(e),l.render(u,Cl)}}function Hx(i){const t=[],e=[],n=[];let s=i;const r=i-pr+1+Lu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-pr?l=Lu[o-i+pr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,g=3,x=2,p=1,v=new Float32Array(g*m*f),y=new Float32Array(x*m*f),_=new Float32Array(p*m*f);for(let A=0;A<f;A++){const E=A%3*2/3-1,R=A>2?0:-1,S=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];v.set(S,g*m*A),y.set(d,x*m*A);const b=[A,A,A,A,A,A];_.set(b,p*m*A)}const T=new Se;T.setAttribute("position",new un(v,g)),T.setAttribute("uv",new un(y,x)),T.setAttribute("faceIndex",new un(_,p)),t.push(T),s>pr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Fu(i,t,e){const n=new us(i,t,e);return n.texture.mapping=La,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function na(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Gx(i,t,e){const n=new Float32Array(Rs),s=new L(0,1,0);return new Zn({name:"SphericalGaussianBlur",defines:{n:Rs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Mh(),fragmentShader:`

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
		`,blending:ls,depthTest:!1,depthWrite:!1})}function Ou(){return new Zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mh(),fragmentShader:`

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
		`,blending:ls,depthTest:!1,depthWrite:!1})}function Bu(){return new Zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ls,depthTest:!1,depthWrite:!1})}function Mh(){return`

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
	`}function Vx(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===uc||l===dc,h=l===wr||l===Er;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Nu(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Nu(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Wx(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&fo("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Xx(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,m=u.attributes.position;let g=0;if(f!==null){const v=f.array;g=f.version;for(let y=0,_=v.length;y<_;y+=3){const T=v[y+0],A=v[y+1],E=v[y+2];d.push(T,A,A,E,E,T)}}else if(m!==void 0){const v=m.array;g=m.version;for(let y=0,_=v.length/3-1;y<_;y+=3){const T=y+0,A=y+1,E=y+2;d.push(T,A,A,E,E,T)}}else return;const x=new(Ld(d)?Nd:hh)(d,1);x.version=g;const p=r.get(u);p&&t.remove(p),r.set(u,x)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function qx(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function c(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,d*o,m),e.update(f,n,m))}function h(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let x=0;for(let p=0;p<m;p++)x+=f[p];e.update(x,n,1)}function u(d,f,m,g){if(m===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],g[p]);else{x.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,g,0,m);let p=0;for(let v=0;v<m;v++)p+=f[v]*g[v];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function $x(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Yx(i,t,e){const n=new WeakMap,s=new Le;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let b=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",b)};var f=b;d!==void 0&&d.texture.dispose();const m=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let _=0;m===!0&&(_=1),g===!0&&(_=2),x===!0&&(_=3);let T=a.attributes.position.count*_,A=1;T>t.maxTextureSize&&(A=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const E=new Float32Array(T*A*4*u),R=new Ud(E,T,A,u);R.type=oi,R.needsUpdate=!0;const S=_*4;for(let U=0;U<u;U++){const P=p[U],G=v[U],Z=y[U],H=T*A*4*U;for(let V=0;V<P.count;V++){const N=V*S;m===!0&&(s.fromBufferAttribute(P,V),E[H+N+0]=s.x,E[H+N+1]=s.y,E[H+N+2]=s.z,E[H+N+3]=0),g===!0&&(s.fromBufferAttribute(G,V),E[H+N+4]=s.x,E[H+N+5]=s.y,E[H+N+6]=s.z,E[H+N+7]=0),x===!0&&(s.fromBufferAttribute(Z,V),E[H+N+8]=s.x,E[H+N+9]=s.y,E[H+N+10]=s.z,E[H+N+11]=Z.itemSize===4?s.w:1)}}d={count:u,texture:R,size:new Wt(T,A)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let m=0;for(let x=0;x<c.length;x++)m+=c[x];const g=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Zx(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const Jd=new En,Hu=new Vd(1,1),Qd=new Ud,tf=new Qp,ef=new Bd,Gu=[],Vu=[],Wu=new Float32Array(16),Xu=new Float32Array(9),qu=new Float32Array(4);function zr(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Gu[s];if(r===void 0&&(r=new Float32Array(s),Gu[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function dn(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function fn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Oa(i,t){let e=Vu[t];e===void 0&&(e=new Int32Array(t),Vu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function jx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Kx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(dn(e,t))return;i.uniform2fv(this.addr,t),fn(e,t)}}function Jx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(dn(e,t))return;i.uniform3fv(this.addr,t),fn(e,t)}}function Qx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(dn(e,t))return;i.uniform4fv(this.addr,t),fn(e,t)}}function tv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(dn(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),fn(e,t)}else{if(dn(e,n))return;qu.set(n),i.uniformMatrix2fv(this.addr,!1,qu),fn(e,n)}}function ev(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(dn(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),fn(e,t)}else{if(dn(e,n))return;Xu.set(n),i.uniformMatrix3fv(this.addr,!1,Xu),fn(e,n)}}function nv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(dn(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),fn(e,t)}else{if(dn(e,n))return;Wu.set(n),i.uniformMatrix4fv(this.addr,!1,Wu),fn(e,n)}}function iv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function sv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(dn(e,t))return;i.uniform2iv(this.addr,t),fn(e,t)}}function rv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(dn(e,t))return;i.uniform3iv(this.addr,t),fn(e,t)}}function ov(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(dn(e,t))return;i.uniform4iv(this.addr,t),fn(e,t)}}function av(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function lv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(dn(e,t))return;i.uniform2uiv(this.addr,t),fn(e,t)}}function cv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(dn(e,t))return;i.uniform3uiv(this.addr,t),fn(e,t)}}function hv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(dn(e,t))return;i.uniform4uiv(this.addr,t),fn(e,t)}}function uv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Hu.compareFunction=Id,r=Hu):r=Jd,e.setTexture2D(t||r,s)}function dv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||tf,s)}function fv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||ef,s)}function pv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Qd,s)}function mv(i){switch(i){case 5126:return jx;case 35664:return Kx;case 35665:return Jx;case 35666:return Qx;case 35674:return tv;case 35675:return ev;case 35676:return nv;case 5124:case 35670:return iv;case 35667:case 35671:return sv;case 35668:case 35672:return rv;case 35669:case 35673:return ov;case 5125:return av;case 36294:return lv;case 36295:return cv;case 36296:return hv;case 35678:case 36198:case 36298:case 36306:case 35682:return uv;case 35679:case 36299:case 36307:return dv;case 35680:case 36300:case 36308:case 36293:return fv;case 36289:case 36303:case 36311:case 36292:return pv}}function gv(i,t){i.uniform1fv(this.addr,t)}function xv(i,t){const e=zr(t,this.size,2);i.uniform2fv(this.addr,e)}function vv(i,t){const e=zr(t,this.size,3);i.uniform3fv(this.addr,e)}function yv(i,t){const e=zr(t,this.size,4);i.uniform4fv(this.addr,e)}function _v(i,t){const e=zr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Mv(i,t){const e=zr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function bv(i,t){const e=zr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Sv(i,t){i.uniform1iv(this.addr,t)}function wv(i,t){i.uniform2iv(this.addr,t)}function Ev(i,t){i.uniform3iv(this.addr,t)}function Tv(i,t){i.uniform4iv(this.addr,t)}function Av(i,t){i.uniform1uiv(this.addr,t)}function Rv(i,t){i.uniform2uiv(this.addr,t)}function Cv(i,t){i.uniform3uiv(this.addr,t)}function Pv(i,t){i.uniform4uiv(this.addr,t)}function zv(i,t,e){const n=this.cache,s=t.length,r=Oa(e,s);dn(n,r)||(i.uniform1iv(this.addr,r),fn(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Jd,r[o])}function Dv(i,t,e){const n=this.cache,s=t.length,r=Oa(e,s);dn(n,r)||(i.uniform1iv(this.addr,r),fn(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||tf,r[o])}function Iv(i,t,e){const n=this.cache,s=t.length,r=Oa(e,s);dn(n,r)||(i.uniform1iv(this.addr,r),fn(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||ef,r[o])}function Lv(i,t,e){const n=this.cache,s=t.length,r=Oa(e,s);dn(n,r)||(i.uniform1iv(this.addr,r),fn(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Qd,r[o])}function Uv(i){switch(i){case 5126:return gv;case 35664:return xv;case 35665:return vv;case 35666:return yv;case 35674:return _v;case 35675:return Mv;case 35676:return bv;case 5124:case 35670:return Sv;case 35667:case 35671:return wv;case 35668:case 35672:return Ev;case 35669:case 35673:return Tv;case 5125:return Av;case 36294:return Rv;case 36295:return Cv;case 36296:return Pv;case 35678:case 36198:case 36298:case 36306:case 35682:return zv;case 35679:case 36299:case 36307:return Dv;case 35680:case 36300:case 36308:case 36293:return Iv;case 36289:case 36303:case 36311:case 36292:return Lv}}class kv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=mv(e.type)}}class Nv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Uv(e.type)}}class Fv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Ll=/(\w+)(\])?(\[|\.)?/g;function $u(i,t){i.seq.push(t),i.map[t.id]=t}function Ov(i,t,e){const n=i.name,s=n.length;for(Ll.lastIndex=0;;){const r=Ll.exec(n),o=Ll.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){$u(e,c===void 0?new kv(a,i,t):new Nv(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Fv(a),$u(e,u)),e=u}}}class Sa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Ov(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Yu(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Bv=37297;let Hv=0;function Gv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Zu=new xe;function Vv(i){ke._getMatrix(Zu,ke.workingColorSpace,i);const t=`mat3( ${Zu.elements.map(e=>e.toFixed(4))} )`;switch(ke.getTransfer(i)){case Ea:return[t,"LinearTransferOETF"];case Ge:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function ju(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Gv(i.getShaderSource(t),a)}else return r}function Wv(i,t){const e=Vv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Xv(i,t){let e;switch(t){case dp:e="Linear";break;case fp:e="Reinhard";break;case pp:e="Cineon";break;case wd:e="ACESFilmic";break;case gp:e="AgX";break;case xp:e="Neutral";break;case mp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ia=new L;function qv(){ke.getLuminanceCoefficients(ia);const i=ia.x.toFixed(4),t=ia.y.toFixed(4),e=ia.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $v(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Jr).join(`
`)}function Yv(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Zv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Jr(i){return i!==""}function Ku(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ju(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const jv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xc(i){return i.replace(jv,Jv)}const Kv=new Map;function Jv(i,t){let e=ye[t];if(e===void 0){const n=Kv.get(t);if(n!==void 0)e=ye[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Xc(e)}const Qv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qu(i){return i.replace(Qv,ty)}function ty(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function td(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function ey(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===bd?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Xf?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ii&&(t="SHADOWMAP_TYPE_VSM"),t}function ny(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case wr:case Er:t="ENVMAP_TYPE_CUBE";break;case La:t="ENVMAP_TYPE_CUBE_UV";break}return t}function iy(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Er:t="ENVMAP_MODE_REFRACTION";break}return t}function sy(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Sd:t="ENVMAP_BLENDING_MULTIPLY";break;case hp:t="ENVMAP_BLENDING_MIX";break;case up:t="ENVMAP_BLENDING_ADD";break}return t}function ry(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function oy(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=ey(e),c=ny(e),h=iy(e),u=sy(e),d=ry(e),f=$v(e),m=Yv(r),g=s.createProgram();let x,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Jr).join(`
`),x.length>0&&(x+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Jr).join(`
`),p.length>0&&(p+=`
`)):(x=[td(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Jr).join(`
`),p=[td(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==cs?"#define TONE_MAPPING":"",e.toneMapping!==cs?ye.tonemapping_pars_fragment:"",e.toneMapping!==cs?Xv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ye.colorspace_pars_fragment,Wv("linearToOutputTexel",e.outputColorSpace),qv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Jr).join(`
`)),o=Xc(o),o=Ku(o,e),o=Ju(o,e),a=Xc(a),a=Ku(a,e),a=Ju(a,e),o=Qu(o),a=Qu(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,x=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,p=["#define varying in",e.glslVersion===Yh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Yh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=v+x+o,_=v+p+a,T=Yu(s,s.VERTEX_SHADER,y),A=Yu(s,s.FRAGMENT_SHADER,_);s.attachShader(g,T),s.attachShader(g,A),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function E(U){if(i.debug.checkShaderErrors){const P=s.getProgramInfoLog(g)||"",G=s.getShaderInfoLog(T)||"",Z=s.getShaderInfoLog(A)||"",H=P.trim(),V=G.trim(),N=Z.trim();let B=!0,Q=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(B=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,T,A);else{const X=ju(s,T,"vertex"),ft=ju(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+H+`
`+X+`
`+ft)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(V===""||N==="")&&(Q=!1);Q&&(U.diagnostics={runnable:B,programLog:H,vertexShader:{log:V,prefix:x},fragmentShader:{log:N,prefix:p}})}s.deleteShader(T),s.deleteShader(A),R=new Sa(s,g),S=Zv(s,g)}let R;this.getUniforms=function(){return R===void 0&&E(this),R};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(g,Bv)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Hv++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=T,this.fragmentShader=A,this}let ay=0;class ly{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new cy(t),e.set(t,n)),n}}class cy{constructor(t){this.id=ay++,this.code=t,this.usedTimes=0}}function hy(i,t,e,n,s,r,o){const a=new ch,l=new ly,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return c.add(S),S===0?"uv":`uv${S}`}function x(S,b,U,P,G){const Z=P.fog,H=G.geometry,V=S.isMeshStandardMaterial?P.environment:null,N=(S.isMeshStandardMaterial?e:t).get(S.envMap||V),B=N&&N.mapping===La?N.image.height:null,Q=m[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const X=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ft=X!==void 0?X.length:0;let Vt=0;H.morphAttributes.position!==void 0&&(Vt=1),H.morphAttributes.normal!==void 0&&(Vt=2),H.morphAttributes.color!==void 0&&(Vt=3);let Me,ce,ht,Y;if(Q){const ve=mi[Q];Me=ve.vertexShader,ce=ve.fragmentShader}else Me=S.vertexShader,ce=S.fragmentShader,l.update(S),ht=l.getVertexShaderID(S),Y=l.getFragmentShaderID(S);const rt=i.getRenderTarget(),_t=i.state.buffers.depth.getReversed(),Xt=G.isInstancedMesh===!0,Nt=G.isBatchedMesh===!0,fe=!!S.map,we=!!S.matcap,I=!!N,ne=!!S.aoMap,jt=!!S.lightMap,Yt=!!S.bumpMap,It=!!S.normalMap,se=!!S.displacementMap,mt=!!S.emissiveMap,Mt=!!S.metalnessMap,le=!!S.roughnessMap,ze=S.anisotropy>0,D=S.clearcoat>0,w=S.dispersion>0,tt=S.iridescence>0,at=S.sheen>0,lt=S.transmission>0,ot=ze&&!!S.anisotropyMap,Lt=D&&!!S.clearcoatMap,ct=D&&!!S.clearcoatNormalMap,wt=D&&!!S.clearcoatRoughnessMap,zt=tt&&!!S.iridescenceMap,gt=tt&&!!S.iridescenceThicknessMap,Rt=at&&!!S.sheenColorMap,Qt=at&&!!S.sheenRoughnessMap,Bt=!!S.specularMap,St=!!S.specularColorMap,ue=!!S.specularIntensityMap,$=lt&&!!S.transmissionMap,yt=lt&&!!S.thicknessMap,Et=!!S.gradientMap,Ft=!!S.alphaMap,xt=S.alphaTest>0,ut=!!S.alphaHash,Ht=!!S.extensions;let de=cs;S.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(de=i.toneMapping);const Be={shaderID:Q,shaderType:S.type,shaderName:S.name,vertexShader:Me,fragmentShader:ce,defines:S.defines,customVertexShaderID:ht,customFragmentShaderID:Y,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Nt,batchingColor:Nt&&G._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&G.instanceColor!==null,instancingMorph:Xt&&G.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:rt===null?i.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:Ar,alphaToCoverage:!!S.alphaToCoverage,map:fe,matcap:we,envMap:I,envMapMode:I&&N.mapping,envMapCubeUVHeight:B,aoMap:ne,lightMap:jt,bumpMap:Yt,normalMap:It,displacementMap:d&&se,emissiveMap:mt,normalMapObjectSpace:It&&S.normalMapType===bp,normalMapTangentSpace:It&&S.normalMapType===oh,metalnessMap:Mt,roughnessMap:le,anisotropy:ze,anisotropyMap:ot,clearcoat:D,clearcoatMap:Lt,clearcoatNormalMap:ct,clearcoatRoughnessMap:wt,dispersion:w,iridescence:tt,iridescenceMap:zt,iridescenceThicknessMap:gt,sheen:at,sheenColorMap:Rt,sheenRoughnessMap:Qt,specularMap:Bt,specularColorMap:St,specularIntensityMap:ue,transmission:lt,transmissionMap:$,thicknessMap:yt,gradientMap:Et,opaque:S.transparent===!1&&S.blending===vr&&S.alphaToCoverage===!1,alphaMap:Ft,alphaTest:xt,alphaHash:ut,combine:S.combine,mapUv:fe&&g(S.map.channel),aoMapUv:ne&&g(S.aoMap.channel),lightMapUv:jt&&g(S.lightMap.channel),bumpMapUv:Yt&&g(S.bumpMap.channel),normalMapUv:It&&g(S.normalMap.channel),displacementMapUv:se&&g(S.displacementMap.channel),emissiveMapUv:mt&&g(S.emissiveMap.channel),metalnessMapUv:Mt&&g(S.metalnessMap.channel),roughnessMapUv:le&&g(S.roughnessMap.channel),anisotropyMapUv:ot&&g(S.anisotropyMap.channel),clearcoatMapUv:Lt&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:ct&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:wt&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:zt&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:gt&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:Qt&&g(S.sheenRoughnessMap.channel),specularMapUv:Bt&&g(S.specularMap.channel),specularColorMapUv:St&&g(S.specularColorMap.channel),specularIntensityMapUv:ue&&g(S.specularIntensityMap.channel),transmissionMapUv:$&&g(S.transmissionMap.channel),thicknessMapUv:yt&&g(S.thicknessMap.channel),alphaMapUv:Ft&&g(S.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(It||ze),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!H.attributes.uv&&(fe||Ft),fog:!!Z,useFog:S.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:_t,skinning:G.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Vt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:de,decodeVideoTexture:fe&&S.map.isVideoTexture===!0&&ke.getTransfer(S.map.colorSpace)===Ge,decodeVideoTextureEmissive:mt&&S.emissiveMap.isVideoTexture===!0&&ke.getTransfer(S.emissiveMap.colorSpace)===Ge,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ce,flipSided:S.side===Dn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ht&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ht&&S.extensions.multiDraw===!0||Nt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Be.vertexUv1s=c.has(1),Be.vertexUv2s=c.has(2),Be.vertexUv3s=c.has(3),c.clear(),Be}function p(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const U in S.defines)b.push(U),b.push(S.defines[U]);return S.isRawShaderMaterial===!1&&(v(b,S),y(b,S),b.push(i.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function v(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function y(S,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),S.push(a.mask)}function _(S){const b=m[S.type];let U;if(b){const P=mi[b];U=Ra.clone(P.uniforms)}else U=S.uniforms;return U}function T(S,b){let U;for(let P=0,G=h.length;P<G;P++){const Z=h[P];if(Z.cacheKey===b){U=Z,++U.usedTimes;break}}return U===void 0&&(U=new oy(i,b,S,r),h.push(U)),U}function A(S){if(--S.usedTimes===0){const b=h.indexOf(S);h[b]=h[h.length-1],h.pop(),S.destroy()}}function E(S){l.remove(S)}function R(){l.dispose()}return{getParameters:x,getProgramCacheKey:p,getUniforms:_,acquireProgram:T,releaseProgram:A,releaseShaderCache:E,programs:h,dispose:R}}function uy(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function dy(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function ed(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function nd(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,m,g,x){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:g,group:x},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=g,p.group=x),t++,p}function a(u,d,f,m,g,x){const p=o(u,d,f,m,g,x);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(u,d,f,m,g,x){const p=o(u,d,f,m,g,x);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||dy),n.length>1&&n.sort(d||ed),s.length>1&&s.sort(d||ed)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function fy(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new nd,i.set(n,[o])):s>=r.length?(o=new nd,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function py(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new ee};break;case"SpotLight":e={position:new L,direction:new L,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new ee,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":e={color:new ee,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function my(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let gy=0;function xy(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function vy(i){const t=new py,e=my(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const s=new L,r=new he,o=new he;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,g=0,x=0,p=0,v=0,y=0,_=0,T=0,A=0,E=0;c.sort(xy);for(let S=0,b=c.length;S<b;S++){const U=c[S],P=U.color,G=U.intensity,Z=U.distance,H=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)h+=P.r*G,u+=P.g*G,d+=P.b*G;else if(U.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(U.sh.coefficients[V],G);E++}else if(U.isDirectionalLight){const V=t.get(U);if(V.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const N=U.shadow,B=e.get(U);B.shadowIntensity=N.intensity,B.shadowBias=N.bias,B.shadowNormalBias=N.normalBias,B.shadowRadius=N.radius,B.shadowMapSize=N.mapSize,n.directionalShadow[f]=B,n.directionalShadowMap[f]=H,n.directionalShadowMatrix[f]=U.shadow.matrix,v++}n.directional[f]=V,f++}else if(U.isSpotLight){const V=t.get(U);V.position.setFromMatrixPosition(U.matrixWorld),V.color.copy(P).multiplyScalar(G),V.distance=Z,V.coneCos=Math.cos(U.angle),V.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),V.decay=U.decay,n.spot[g]=V;const N=U.shadow;if(U.map&&(n.spotLightMap[T]=U.map,T++,N.updateMatrices(U),U.castShadow&&A++),n.spotLightMatrix[g]=N.matrix,U.castShadow){const B=e.get(U);B.shadowIntensity=N.intensity,B.shadowBias=N.bias,B.shadowNormalBias=N.normalBias,B.shadowRadius=N.radius,B.shadowMapSize=N.mapSize,n.spotShadow[g]=B,n.spotShadowMap[g]=H,_++}g++}else if(U.isRectAreaLight){const V=t.get(U);V.color.copy(P).multiplyScalar(G),V.halfWidth.set(U.width*.5,0,0),V.halfHeight.set(0,U.height*.5,0),n.rectArea[x]=V,x++}else if(U.isPointLight){const V=t.get(U);if(V.color.copy(U.color).multiplyScalar(U.intensity),V.distance=U.distance,V.decay=U.decay,U.castShadow){const N=U.shadow,B=e.get(U);B.shadowIntensity=N.intensity,B.shadowBias=N.bias,B.shadowNormalBias=N.normalBias,B.shadowRadius=N.radius,B.shadowMapSize=N.mapSize,B.shadowCameraNear=N.camera.near,B.shadowCameraFar=N.camera.far,n.pointShadow[m]=B,n.pointShadowMap[m]=H,n.pointShadowMatrix[m]=U.shadow.matrix,y++}n.point[m]=V,m++}else if(U.isHemisphereLight){const V=t.get(U);V.skyColor.copy(U.color).multiplyScalar(G),V.groundColor.copy(U.groundColor).multiplyScalar(G),n.hemi[p]=V,p++}}x>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Pt.LTC_FLOAT_1,n.rectAreaLTC2=Pt.LTC_FLOAT_2):(n.rectAreaLTC1=Pt.LTC_HALF_1,n.rectAreaLTC2=Pt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const R=n.hash;(R.directionalLength!==f||R.pointLength!==m||R.spotLength!==g||R.rectAreaLength!==x||R.hemiLength!==p||R.numDirectionalShadows!==v||R.numPointShadows!==y||R.numSpotShadows!==_||R.numSpotMaps!==T||R.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=g,n.rectArea.length=x,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=_+T-A,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=E,R.directionalLength=f,R.pointLength=m,R.spotLength=g,R.rectAreaLength=x,R.hemiLength=p,R.numDirectionalShadows=v,R.numPointShadows=y,R.numSpotShadows=_,R.numSpotMaps=T,R.numLightProbes=E,n.version=gy++)}function l(c,h){let u=0,d=0,f=0,m=0,g=0;const x=h.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){const y=c[p];if(y.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(x),u++}else if(y.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(x),_.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(x),f++}else if(y.isRectAreaLight){const _=n.rectArea[m];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(x),o.identity(),r.copy(y.matrixWorld),r.premultiply(x),o.extractRotation(r),_.halfWidth.set(y.width*.5,0,0),_.halfHeight.set(0,y.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),m++}else if(y.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(y.matrixWorld),_.position.applyMatrix4(x),d++}else if(y.isHemisphereLight){const _=n.hemi[g];_.direction.setFromMatrixPosition(y.matrixWorld),_.direction.transformDirection(x),g++}}}return{setup:a,setupView:l,state:n}}function id(i){const t=new vy(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function yy(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new id(i),t.set(s,[a])):r>=o.length?(a=new id(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const _y=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,My=`uniform sampler2D shadow_pass;
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
}`;function by(i,t,e){let n=new fh;const s=new Wt,r=new Wt,o=new Le,a=new Vm({depthPacking:Mp}),l=new Wm,c={},h=e.maxTextureSize,u={[Hi]:Dn,[Dn]:Hi,[Ce]:Ce},d=new Zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Wt},radius:{value:4}},vertexShader:_y,fragmentShader:My}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new Se;m.setAttribute("position",new un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Jt(m,d),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=bd;let p=this.type;this.render=function(A,E,R){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||A.length===0)return;const S=i.getRenderTarget(),b=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),P=i.state;P.setBlending(ls),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const G=p!==Ii&&this.type===Ii,Z=p===Ii&&this.type!==Ii;for(let H=0,V=A.length;H<V;H++){const N=A[H],B=N.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",N,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const Q=B.getFrameExtents();if(s.multiply(Q),r.copy(B.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,B.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,B.mapSize.y=r.y)),B.map===null||G===!0||Z===!0){const ft=this.type!==Ii?{minFilter:Vn,magFilter:Vn}:{};B.map!==null&&B.map.dispose(),B.map=new us(s.x,s.y,ft),B.map.texture.name=N.name+".shadowMap",B.camera.updateProjectionMatrix()}i.setRenderTarget(B.map),i.clear();const X=B.getViewportCount();for(let ft=0;ft<X;ft++){const Vt=B.getViewport(ft);o.set(r.x*Vt.x,r.y*Vt.y,r.x*Vt.z,r.y*Vt.w),P.viewport(o),B.updateMatrices(N,ft),n=B.getFrustum(),_(E,R,B.camera,N,this.type)}B.isPointLightShadow!==!0&&this.type===Ii&&v(B,R),B.needsUpdate=!1}p=this.type,x.needsUpdate=!1,i.setRenderTarget(S,b,U)};function v(A,E){const R=t.update(g);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new us(s.x,s.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(E,null,R,d,g,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(E,null,R,f,g,null)}function y(A,E,R,S){let b=null;const U=R.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(U!==void 0)b=U;else if(b=R.isPointLight===!0?l:a,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const P=b.uuid,G=E.uuid;let Z=c[P];Z===void 0&&(Z={},c[P]=Z);let H=Z[G];H===void 0&&(H=b.clone(),Z[G]=H,E.addEventListener("dispose",T)),b=H}if(b.visible=E.visible,b.wireframe=E.wireframe,S===Ii?b.side=E.shadowSide!==null?E.shadowSide:E.side:b.side=E.shadowSide!==null?E.shadowSide:u[E.side],b.alphaMap=E.alphaMap,b.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,b.map=E.map,b.clipShadows=E.clipShadows,b.clippingPlanes=E.clippingPlanes,b.clipIntersection=E.clipIntersection,b.displacementMap=E.displacementMap,b.displacementScale=E.displacementScale,b.displacementBias=E.displacementBias,b.wireframeLinewidth=E.wireframeLinewidth,b.linewidth=E.linewidth,R.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const P=i.properties.get(b);P.light=R}return b}function _(A,E,R,S,b){if(A.visible===!1)return;if(A.layers.test(E.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&b===Ii)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,A.matrixWorld);const G=t.update(A),Z=A.material;if(Array.isArray(Z)){const H=G.groups;for(let V=0,N=H.length;V<N;V++){const B=H[V],Q=Z[B.materialIndex];if(Q&&Q.visible){const X=y(A,Q,S,b);A.onBeforeShadow(i,A,E,R,G,X,B),i.renderBufferDirect(R,null,G,X,A,B),A.onAfterShadow(i,A,E,R,G,X,B)}}}else if(Z.visible){const H=y(A,Z,S,b);A.onBeforeShadow(i,A,E,R,G,H,null),i.renderBufferDirect(R,null,G,H,A,null),A.onAfterShadow(i,A,E,R,G,H,null)}}const P=A.children;for(let G=0,Z=P.length;G<Z;G++)_(P[G],E,R,S,b)}function T(A){A.target.removeEventListener("dispose",T);for(const R in c){const S=c[R],b=A.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}const Sy={[sc]:rc,[oc]:cc,[ac]:hc,[Sr]:lc,[rc]:sc,[cc]:oc,[hc]:ac,[lc]:Sr};function wy(i,t){function e(){let $=!1;const yt=new Le;let Et=null;const Ft=new Le(0,0,0,0);return{setMask:function(xt){Et!==xt&&!$&&(i.colorMask(xt,xt,xt,xt),Et=xt)},setLocked:function(xt){$=xt},setClear:function(xt,ut,Ht,de,Be){Be===!0&&(xt*=de,ut*=de,Ht*=de),yt.set(xt,ut,Ht,de),Ft.equals(yt)===!1&&(i.clearColor(xt,ut,Ht,de),Ft.copy(yt))},reset:function(){$=!1,Et=null,Ft.set(-1,0,0,0)}}}function n(){let $=!1,yt=!1,Et=null,Ft=null,xt=null;return{setReversed:function(ut){if(yt!==ut){const Ht=t.get("EXT_clip_control");ut?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT),yt=ut;const de=xt;xt=null,this.setClear(de)}},getReversed:function(){return yt},setTest:function(ut){ut?rt(i.DEPTH_TEST):_t(i.DEPTH_TEST)},setMask:function(ut){Et!==ut&&!$&&(i.depthMask(ut),Et=ut)},setFunc:function(ut){if(yt&&(ut=Sy[ut]),Ft!==ut){switch(ut){case sc:i.depthFunc(i.NEVER);break;case rc:i.depthFunc(i.ALWAYS);break;case oc:i.depthFunc(i.LESS);break;case Sr:i.depthFunc(i.LEQUAL);break;case ac:i.depthFunc(i.EQUAL);break;case lc:i.depthFunc(i.GEQUAL);break;case cc:i.depthFunc(i.GREATER);break;case hc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ft=ut}},setLocked:function(ut){$=ut},setClear:function(ut){xt!==ut&&(yt&&(ut=1-ut),i.clearDepth(ut),xt=ut)},reset:function(){$=!1,Et=null,Ft=null,xt=null,yt=!1}}}function s(){let $=!1,yt=null,Et=null,Ft=null,xt=null,ut=null,Ht=null,de=null,Be=null;return{setTest:function(ve){$||(ve?rt(i.STENCIL_TEST):_t(i.STENCIL_TEST))},setMask:function(ve){yt!==ve&&!$&&(i.stencilMask(ve),yt=ve)},setFunc:function(ve,Kn,vn){(Et!==ve||Ft!==Kn||xt!==vn)&&(i.stencilFunc(ve,Kn,vn),Et=ve,Ft=Kn,xt=vn)},setOp:function(ve,Kn,vn){(ut!==ve||Ht!==Kn||de!==vn)&&(i.stencilOp(ve,Kn,vn),ut=ve,Ht=Kn,de=vn)},setLocked:function(ve){$=ve},setClear:function(ve){Be!==ve&&(i.clearStencil(ve),Be=ve)},reset:function(){$=!1,yt=null,Et=null,Ft=null,xt=null,ut=null,Ht=null,de=null,Be=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,g=!1,x=null,p=null,v=null,y=null,_=null,T=null,A=null,E=new ee(0,0,0),R=0,S=!1,b=null,U=null,P=null,G=null,Z=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,N=0;const B=i.getParameter(i.VERSION);B.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(B)[1]),V=N>=1):B.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),V=N>=2);let Q=null,X={};const ft=i.getParameter(i.SCISSOR_BOX),Vt=i.getParameter(i.VIEWPORT),Me=new Le().fromArray(ft),ce=new Le().fromArray(Vt);function ht($,yt,Et,Ft){const xt=new Uint8Array(4),ut=i.createTexture();i.bindTexture($,ut),i.texParameteri($,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri($,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ht=0;Ht<Et;Ht++)$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?i.texImage3D(yt,0,i.RGBA,1,1,Ft,0,i.RGBA,i.UNSIGNED_BYTE,xt):i.texImage2D(yt+Ht,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xt);return ut}const Y={};Y[i.TEXTURE_2D]=ht(i.TEXTURE_2D,i.TEXTURE_2D,1),Y[i.TEXTURE_CUBE_MAP]=ht(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[i.TEXTURE_2D_ARRAY]=ht(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Y[i.TEXTURE_3D]=ht(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),rt(i.DEPTH_TEST),o.setFunc(Sr),Yt(!1),It(Hh),rt(i.CULL_FACE),ne(ls);function rt($){h[$]!==!0&&(i.enable($),h[$]=!0)}function _t($){h[$]!==!1&&(i.disable($),h[$]=!1)}function Xt($,yt){return u[$]!==yt?(i.bindFramebuffer($,yt),u[$]=yt,$===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=yt),$===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=yt),!0):!1}function Nt($,yt){let Et=f,Ft=!1;if($){Et=d.get(yt),Et===void 0&&(Et=[],d.set(yt,Et));const xt=$.textures;if(Et.length!==xt.length||Et[0]!==i.COLOR_ATTACHMENT0){for(let ut=0,Ht=xt.length;ut<Ht;ut++)Et[ut]=i.COLOR_ATTACHMENT0+ut;Et.length=xt.length,Ft=!0}}else Et[0]!==i.BACK&&(Et[0]=i.BACK,Ft=!0);Ft&&i.drawBuffers(Et)}function fe($){return m!==$?(i.useProgram($),m=$,!0):!1}const we={[As]:i.FUNC_ADD,[$f]:i.FUNC_SUBTRACT,[Yf]:i.FUNC_REVERSE_SUBTRACT};we[Zf]=i.MIN,we[jf]=i.MAX;const I={[Kf]:i.ZERO,[Jf]:i.ONE,[Qf]:i.SRC_COLOR,[nc]:i.SRC_ALPHA,[rp]:i.SRC_ALPHA_SATURATE,[ip]:i.DST_COLOR,[ep]:i.DST_ALPHA,[tp]:i.ONE_MINUS_SRC_COLOR,[ic]:i.ONE_MINUS_SRC_ALPHA,[sp]:i.ONE_MINUS_DST_COLOR,[np]:i.ONE_MINUS_DST_ALPHA,[op]:i.CONSTANT_COLOR,[ap]:i.ONE_MINUS_CONSTANT_COLOR,[lp]:i.CONSTANT_ALPHA,[cp]:i.ONE_MINUS_CONSTANT_ALPHA};function ne($,yt,Et,Ft,xt,ut,Ht,de,Be,ve){if($===ls){g===!0&&(_t(i.BLEND),g=!1);return}if(g===!1&&(rt(i.BLEND),g=!0),$!==qf){if($!==x||ve!==S){if((p!==As||_!==As)&&(i.blendEquation(i.FUNC_ADD),p=As,_=As),ve)switch($){case vr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gh:i.blendFunc(i.ONE,i.ONE);break;case Vh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Wh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}else switch($){case vr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Vh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}v=null,y=null,T=null,A=null,E.set(0,0,0),R=0,x=$,S=ve}return}xt=xt||yt,ut=ut||Et,Ht=Ht||Ft,(yt!==p||xt!==_)&&(i.blendEquationSeparate(we[yt],we[xt]),p=yt,_=xt),(Et!==v||Ft!==y||ut!==T||Ht!==A)&&(i.blendFuncSeparate(I[Et],I[Ft],I[ut],I[Ht]),v=Et,y=Ft,T=ut,A=Ht),(de.equals(E)===!1||Be!==R)&&(i.blendColor(de.r,de.g,de.b,Be),E.copy(de),R=Be),x=$,S=!1}function jt($,yt){$.side===Ce?_t(i.CULL_FACE):rt(i.CULL_FACE);let Et=$.side===Dn;yt&&(Et=!Et),Yt(Et),$.blending===vr&&$.transparent===!1?ne(ls):ne($.blending,$.blendEquation,$.blendSrc,$.blendDst,$.blendEquationAlpha,$.blendSrcAlpha,$.blendDstAlpha,$.blendColor,$.blendAlpha,$.premultipliedAlpha),o.setFunc($.depthFunc),o.setTest($.depthTest),o.setMask($.depthWrite),r.setMask($.colorWrite);const Ft=$.stencilWrite;a.setTest(Ft),Ft&&(a.setMask($.stencilWriteMask),a.setFunc($.stencilFunc,$.stencilRef,$.stencilFuncMask),a.setOp($.stencilFail,$.stencilZFail,$.stencilZPass)),mt($.polygonOffset,$.polygonOffsetFactor,$.polygonOffsetUnits),$.alphaToCoverage===!0?rt(i.SAMPLE_ALPHA_TO_COVERAGE):_t(i.SAMPLE_ALPHA_TO_COVERAGE)}function Yt($){b!==$&&($?i.frontFace(i.CW):i.frontFace(i.CCW),b=$)}function It($){$!==Vf?(rt(i.CULL_FACE),$!==U&&($===Hh?i.cullFace(i.BACK):$===Wf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):_t(i.CULL_FACE),U=$}function se($){$!==P&&(V&&i.lineWidth($),P=$)}function mt($,yt,Et){$?(rt(i.POLYGON_OFFSET_FILL),(G!==yt||Z!==Et)&&(i.polygonOffset(yt,Et),G=yt,Z=Et)):_t(i.POLYGON_OFFSET_FILL)}function Mt($){$?rt(i.SCISSOR_TEST):_t(i.SCISSOR_TEST)}function le($){$===void 0&&($=i.TEXTURE0+H-1),Q!==$&&(i.activeTexture($),Q=$)}function ze($,yt,Et){Et===void 0&&(Q===null?Et=i.TEXTURE0+H-1:Et=Q);let Ft=X[Et];Ft===void 0&&(Ft={type:void 0,texture:void 0},X[Et]=Ft),(Ft.type!==$||Ft.texture!==yt)&&(Q!==Et&&(i.activeTexture(Et),Q=Et),i.bindTexture($,yt||Y[$]),Ft.type=$,Ft.texture=yt)}function D(){const $=X[Q];$!==void 0&&$.type!==void 0&&(i.bindTexture($.type,null),$.type=void 0,$.texture=void 0)}function w(){try{i.compressedTexImage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function tt(){try{i.compressedTexImage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function at(){try{i.texSubImage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function lt(){try{i.texSubImage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function ot(){try{i.compressedTexSubImage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Lt(){try{i.compressedTexSubImage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function ct(){try{i.texStorage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function wt(){try{i.texStorage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function zt(){try{i.texImage2D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function gt(){try{i.texImage3D(...arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Rt($){Me.equals($)===!1&&(i.scissor($.x,$.y,$.z,$.w),Me.copy($))}function Qt($){ce.equals($)===!1&&(i.viewport($.x,$.y,$.z,$.w),ce.copy($))}function Bt($,yt){let Et=c.get(yt);Et===void 0&&(Et=new WeakMap,c.set(yt,Et));let Ft=Et.get($);Ft===void 0&&(Ft=i.getUniformBlockIndex(yt,$.name),Et.set($,Ft))}function St($,yt){const Ft=c.get(yt).get($);l.get(yt)!==Ft&&(i.uniformBlockBinding(yt,Ft,$.__bindingPointIndex),l.set(yt,Ft))}function ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Q=null,X={},u={},d=new WeakMap,f=[],m=null,g=!1,x=null,p=null,v=null,y=null,_=null,T=null,A=null,E=new ee(0,0,0),R=0,S=!1,b=null,U=null,P=null,G=null,Z=null,Me.set(0,0,i.canvas.width,i.canvas.height),ce.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:rt,disable:_t,bindFramebuffer:Xt,drawBuffers:Nt,useProgram:fe,setBlending:ne,setMaterial:jt,setFlipSided:Yt,setCullFace:It,setLineWidth:se,setPolygonOffset:mt,setScissorTest:Mt,activeTexture:le,bindTexture:ze,unbindTexture:D,compressedTexImage2D:w,compressedTexImage3D:tt,texImage2D:zt,texImage3D:gt,updateUBOMapping:Bt,uniformBlockBinding:St,texStorage2D:ct,texStorage3D:wt,texSubImage2D:at,texSubImage3D:lt,compressedTexSubImage2D:ot,compressedTexSubImage3D:Lt,scissor:Rt,viewport:Qt,reset:ue}}function Ey(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Wt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(D,w){return f?new OffscreenCanvas(D,w):Aa("canvas")}function g(D,w,tt){let at=1;const lt=ze(D);if((lt.width>tt||lt.height>tt)&&(at=tt/Math.max(lt.width,lt.height)),at<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const ot=Math.floor(at*lt.width),Lt=Math.floor(at*lt.height);u===void 0&&(u=m(ot,Lt));const ct=w?m(ot,Lt):u;return ct.width=ot,ct.height=Lt,ct.getContext("2d").drawImage(D,0,0,ot,Lt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+lt.width+"x"+lt.height+") to ("+ot+"x"+Lt+")."),ct}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+lt.width+"x"+lt.height+")."),D;return D}function x(D){return D.generateMipmaps}function p(D){i.generateMipmap(D)}function v(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(D,w,tt,at,lt=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let ot=w;if(w===i.RED&&(tt===i.FLOAT&&(ot=i.R32F),tt===i.HALF_FLOAT&&(ot=i.R16F),tt===i.UNSIGNED_BYTE&&(ot=i.R8)),w===i.RED_INTEGER&&(tt===i.UNSIGNED_BYTE&&(ot=i.R8UI),tt===i.UNSIGNED_SHORT&&(ot=i.R16UI),tt===i.UNSIGNED_INT&&(ot=i.R32UI),tt===i.BYTE&&(ot=i.R8I),tt===i.SHORT&&(ot=i.R16I),tt===i.INT&&(ot=i.R32I)),w===i.RG&&(tt===i.FLOAT&&(ot=i.RG32F),tt===i.HALF_FLOAT&&(ot=i.RG16F),tt===i.UNSIGNED_BYTE&&(ot=i.RG8)),w===i.RG_INTEGER&&(tt===i.UNSIGNED_BYTE&&(ot=i.RG8UI),tt===i.UNSIGNED_SHORT&&(ot=i.RG16UI),tt===i.UNSIGNED_INT&&(ot=i.RG32UI),tt===i.BYTE&&(ot=i.RG8I),tt===i.SHORT&&(ot=i.RG16I),tt===i.INT&&(ot=i.RG32I)),w===i.RGB_INTEGER&&(tt===i.UNSIGNED_BYTE&&(ot=i.RGB8UI),tt===i.UNSIGNED_SHORT&&(ot=i.RGB16UI),tt===i.UNSIGNED_INT&&(ot=i.RGB32UI),tt===i.BYTE&&(ot=i.RGB8I),tt===i.SHORT&&(ot=i.RGB16I),tt===i.INT&&(ot=i.RGB32I)),w===i.RGBA_INTEGER&&(tt===i.UNSIGNED_BYTE&&(ot=i.RGBA8UI),tt===i.UNSIGNED_SHORT&&(ot=i.RGBA16UI),tt===i.UNSIGNED_INT&&(ot=i.RGBA32UI),tt===i.BYTE&&(ot=i.RGBA8I),tt===i.SHORT&&(ot=i.RGBA16I),tt===i.INT&&(ot=i.RGBA32I)),w===i.RGB&&(tt===i.UNSIGNED_INT_5_9_9_9_REV&&(ot=i.RGB9_E5),tt===i.UNSIGNED_INT_10F_11F_11F_REV&&(ot=i.R11F_G11F_B10F)),w===i.RGBA){const Lt=lt?Ea:ke.getTransfer(at);tt===i.FLOAT&&(ot=i.RGBA32F),tt===i.HALF_FLOAT&&(ot=i.RGBA16F),tt===i.UNSIGNED_BYTE&&(ot=Lt===Ge?i.SRGB8_ALPHA8:i.RGBA8),tt===i.UNSIGNED_SHORT_4_4_4_4&&(ot=i.RGBA4),tt===i.UNSIGNED_SHORT_5_5_5_1&&(ot=i.RGB5_A1)}return(ot===i.R16F||ot===i.R32F||ot===i.RG16F||ot===i.RG32F||ot===i.RGBA16F||ot===i.RGBA32F)&&t.get("EXT_color_buffer_float"),ot}function _(D,w){let tt;return D?w===null||w===zs||w===lo?tt=i.DEPTH24_STENCIL8:w===oi?tt=i.DEPTH32F_STENCIL8:w===ao&&(tt=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===zs||w===lo?tt=i.DEPTH_COMPONENT24:w===oi?tt=i.DEPTH_COMPONENT32F:w===ao&&(tt=i.DEPTH_COMPONENT16),tt}function T(D,w){return x(D)===!0||D.isFramebufferTexture&&D.minFilter!==Vn&&D.minFilter!==ri?Math.log2(Math.max(w.width,w.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?w.mipmaps.length:1}function A(D){const w=D.target;w.removeEventListener("dispose",A),R(w),w.isVideoTexture&&h.delete(w)}function E(D){const w=D.target;w.removeEventListener("dispose",E),b(w)}function R(D){const w=n.get(D);if(w.__webglInit===void 0)return;const tt=D.source,at=d.get(tt);if(at){const lt=at[w.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&S(D),Object.keys(at).length===0&&d.delete(tt)}n.remove(D)}function S(D){const w=n.get(D);i.deleteTexture(w.__webglTexture);const tt=D.source,at=d.get(tt);delete at[w.__cacheKey],o.memory.textures--}function b(D){const w=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let at=0;at<6;at++){if(Array.isArray(w.__webglFramebuffer[at]))for(let lt=0;lt<w.__webglFramebuffer[at].length;lt++)i.deleteFramebuffer(w.__webglFramebuffer[at][lt]);else i.deleteFramebuffer(w.__webglFramebuffer[at]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[at])}else{if(Array.isArray(w.__webglFramebuffer))for(let at=0;at<w.__webglFramebuffer.length;at++)i.deleteFramebuffer(w.__webglFramebuffer[at]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let at=0;at<w.__webglColorRenderbuffer.length;at++)w.__webglColorRenderbuffer[at]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[at]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const tt=D.textures;for(let at=0,lt=tt.length;at<lt;at++){const ot=n.get(tt[at]);ot.__webglTexture&&(i.deleteTexture(ot.__webglTexture),o.memory.textures--),n.remove(tt[at])}n.remove(D)}let U=0;function P(){U=0}function G(){const D=U;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),U+=1,D}function Z(D){const w=[];return w.push(D.wrapS),w.push(D.wrapT),w.push(D.wrapR||0),w.push(D.magFilter),w.push(D.minFilter),w.push(D.anisotropy),w.push(D.internalFormat),w.push(D.format),w.push(D.type),w.push(D.generateMipmaps),w.push(D.premultiplyAlpha),w.push(D.flipY),w.push(D.unpackAlignment),w.push(D.colorSpace),w.join()}function H(D,w){const tt=n.get(D);if(D.isVideoTexture&&Mt(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&tt.__version!==D.version){const at=D.image;if(at===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(at.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(tt,D,w);return}}else D.isExternalTexture&&(tt.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,tt.__webglTexture,i.TEXTURE0+w)}function V(D,w){const tt=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&tt.__version!==D.version){Y(tt,D,w);return}e.bindTexture(i.TEXTURE_2D_ARRAY,tt.__webglTexture,i.TEXTURE0+w)}function N(D,w){const tt=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&tt.__version!==D.version){Y(tt,D,w);return}e.bindTexture(i.TEXTURE_3D,tt.__webglTexture,i.TEXTURE0+w)}function B(D,w){const tt=n.get(D);if(D.version>0&&tt.__version!==D.version){rt(tt,D,w);return}e.bindTexture(i.TEXTURE_CUBE_MAP,tt.__webglTexture,i.TEXTURE0+w)}const Q={[Tr]:i.REPEAT,[rs]:i.CLAMP_TO_EDGE,[fc]:i.MIRRORED_REPEAT},X={[Vn]:i.NEAREST,[yp]:i.NEAREST_MIPMAP_NEAREST,[Co]:i.NEAREST_MIPMAP_LINEAR,[ri]:i.LINEAR,[Ka]:i.LINEAR_MIPMAP_NEAREST,[os]:i.LINEAR_MIPMAP_LINEAR},ft={[Sp]:i.NEVER,[Cp]:i.ALWAYS,[wp]:i.LESS,[Id]:i.LEQUAL,[Ep]:i.EQUAL,[Rp]:i.GEQUAL,[Tp]:i.GREATER,[Ap]:i.NOTEQUAL};function Vt(D,w){if(w.type===oi&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===ri||w.magFilter===Ka||w.magFilter===Co||w.magFilter===os||w.minFilter===ri||w.minFilter===Ka||w.minFilter===Co||w.minFilter===os)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,Q[w.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,Q[w.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,Q[w.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,X[w.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,X[w.minFilter]),w.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,ft[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Vn||w.minFilter!==Co&&w.minFilter!==os||w.type===oi&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const tt=t.get("EXT_texture_filter_anisotropic");i.texParameterf(D,tt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Me(D,w){let tt=!1;D.__webglInit===void 0&&(D.__webglInit=!0,w.addEventListener("dispose",A));const at=w.source;let lt=d.get(at);lt===void 0&&(lt={},d.set(at,lt));const ot=Z(w);if(ot!==D.__cacheKey){lt[ot]===void 0&&(lt[ot]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,tt=!0),lt[ot].usedTimes++;const Lt=lt[D.__cacheKey];Lt!==void 0&&(lt[D.__cacheKey].usedTimes--,Lt.usedTimes===0&&S(w)),D.__cacheKey=ot,D.__webglTexture=lt[ot].texture}return tt}function ce(D,w,tt){return Math.floor(Math.floor(D/tt)/w)}function ht(D,w,tt,at){const ot=D.updateRanges;if(ot.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,tt,at,w.data);else{ot.sort((gt,Rt)=>gt.start-Rt.start);let Lt=0;for(let gt=1;gt<ot.length;gt++){const Rt=ot[Lt],Qt=ot[gt],Bt=Rt.start+Rt.count,St=ce(Qt.start,w.width,4),ue=ce(Rt.start,w.width,4);Qt.start<=Bt+1&&St===ue&&ce(Qt.start+Qt.count-1,w.width,4)===St?Rt.count=Math.max(Rt.count,Qt.start+Qt.count-Rt.start):(++Lt,ot[Lt]=Qt)}ot.length=Lt+1;const ct=i.getParameter(i.UNPACK_ROW_LENGTH),wt=i.getParameter(i.UNPACK_SKIP_PIXELS),zt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let gt=0,Rt=ot.length;gt<Rt;gt++){const Qt=ot[gt],Bt=Math.floor(Qt.start/4),St=Math.ceil(Qt.count/4),ue=Bt%w.width,$=Math.floor(Bt/w.width),yt=St,Et=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,ue),i.pixelStorei(i.UNPACK_SKIP_ROWS,$),e.texSubImage2D(i.TEXTURE_2D,0,ue,$,yt,Et,tt,at,w.data)}D.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ct),i.pixelStorei(i.UNPACK_SKIP_PIXELS,wt),i.pixelStorei(i.UNPACK_SKIP_ROWS,zt)}}function Y(D,w,tt){let at=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(at=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(at=i.TEXTURE_3D);const lt=Me(D,w),ot=w.source;e.bindTexture(at,D.__webglTexture,i.TEXTURE0+tt);const Lt=n.get(ot);if(ot.version!==Lt.__version||lt===!0){e.activeTexture(i.TEXTURE0+tt);const ct=ke.getPrimaries(ke.workingColorSpace),wt=w.colorSpace===Li?null:ke.getPrimaries(w.colorSpace),zt=w.colorSpace===Li||ct===wt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);let gt=g(w.image,!1,s.maxTextureSize);gt=le(w,gt);const Rt=r.convert(w.format,w.colorSpace),Qt=r.convert(w.type);let Bt=y(w.internalFormat,Rt,Qt,w.colorSpace,w.isVideoTexture);Vt(at,w);let St;const ue=w.mipmaps,$=w.isVideoTexture!==!0,yt=Lt.__version===void 0||lt===!0,Et=ot.dataReady,Ft=T(w,gt);if(w.isDepthTexture)Bt=_(w.format===ho,w.type),yt&&($?e.texStorage2D(i.TEXTURE_2D,1,Bt,gt.width,gt.height):e.texImage2D(i.TEXTURE_2D,0,Bt,gt.width,gt.height,0,Rt,Qt,null));else if(w.isDataTexture)if(ue.length>0){$&&yt&&e.texStorage2D(i.TEXTURE_2D,Ft,Bt,ue[0].width,ue[0].height);for(let xt=0,ut=ue.length;xt<ut;xt++)St=ue[xt],$?Et&&e.texSubImage2D(i.TEXTURE_2D,xt,0,0,St.width,St.height,Rt,Qt,St.data):e.texImage2D(i.TEXTURE_2D,xt,Bt,St.width,St.height,0,Rt,Qt,St.data);w.generateMipmaps=!1}else $?(yt&&e.texStorage2D(i.TEXTURE_2D,Ft,Bt,gt.width,gt.height),Et&&ht(w,gt,Rt,Qt)):e.texImage2D(i.TEXTURE_2D,0,Bt,gt.width,gt.height,0,Rt,Qt,gt.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){$&&yt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ft,Bt,ue[0].width,ue[0].height,gt.depth);for(let xt=0,ut=ue.length;xt<ut;xt++)if(St=ue[xt],w.format!==Gn)if(Rt!==null)if($){if(Et)if(w.layerUpdates.size>0){const Ht=Iu(St.width,St.height,w.format,w.type);for(const de of w.layerUpdates){const Be=St.data.subarray(de*Ht/St.data.BYTES_PER_ELEMENT,(de+1)*Ht/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,de,St.width,St.height,1,Rt,Be)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,0,St.width,St.height,gt.depth,Rt,St.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,xt,Bt,St.width,St.height,gt.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $?Et&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,0,St.width,St.height,gt.depth,Rt,Qt,St.data):e.texImage3D(i.TEXTURE_2D_ARRAY,xt,Bt,St.width,St.height,gt.depth,0,Rt,Qt,St.data)}else{$&&yt&&e.texStorage2D(i.TEXTURE_2D,Ft,Bt,ue[0].width,ue[0].height);for(let xt=0,ut=ue.length;xt<ut;xt++)St=ue[xt],w.format!==Gn?Rt!==null?$?Et&&e.compressedTexSubImage2D(i.TEXTURE_2D,xt,0,0,St.width,St.height,Rt,St.data):e.compressedTexImage2D(i.TEXTURE_2D,xt,Bt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$?Et&&e.texSubImage2D(i.TEXTURE_2D,xt,0,0,St.width,St.height,Rt,Qt,St.data):e.texImage2D(i.TEXTURE_2D,xt,Bt,St.width,St.height,0,Rt,Qt,St.data)}else if(w.isDataArrayTexture)if($){if(yt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ft,Bt,gt.width,gt.height,gt.depth),Et)if(w.layerUpdates.size>0){const xt=Iu(gt.width,gt.height,w.format,w.type);for(const ut of w.layerUpdates){const Ht=gt.data.subarray(ut*xt/gt.data.BYTES_PER_ELEMENT,(ut+1)*xt/gt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ut,gt.width,gt.height,1,Rt,Qt,Ht)}w.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,gt.width,gt.height,gt.depth,Rt,Qt,gt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Bt,gt.width,gt.height,gt.depth,0,Rt,Qt,gt.data);else if(w.isData3DTexture)$?(yt&&e.texStorage3D(i.TEXTURE_3D,Ft,Bt,gt.width,gt.height,gt.depth),Et&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,gt.width,gt.height,gt.depth,Rt,Qt,gt.data)):e.texImage3D(i.TEXTURE_3D,0,Bt,gt.width,gt.height,gt.depth,0,Rt,Qt,gt.data);else if(w.isFramebufferTexture){if(yt)if($)e.texStorage2D(i.TEXTURE_2D,Ft,Bt,gt.width,gt.height);else{let xt=gt.width,ut=gt.height;for(let Ht=0;Ht<Ft;Ht++)e.texImage2D(i.TEXTURE_2D,Ht,Bt,xt,ut,0,Rt,Qt,null),xt>>=1,ut>>=1}}else if(ue.length>0){if($&&yt){const xt=ze(ue[0]);e.texStorage2D(i.TEXTURE_2D,Ft,Bt,xt.width,xt.height)}for(let xt=0,ut=ue.length;xt<ut;xt++)St=ue[xt],$?Et&&e.texSubImage2D(i.TEXTURE_2D,xt,0,0,Rt,Qt,St):e.texImage2D(i.TEXTURE_2D,xt,Bt,Rt,Qt,St);w.generateMipmaps=!1}else if($){if(yt){const xt=ze(gt);e.texStorage2D(i.TEXTURE_2D,Ft,Bt,xt.width,xt.height)}Et&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Rt,Qt,gt)}else e.texImage2D(i.TEXTURE_2D,0,Bt,Rt,Qt,gt);x(w)&&p(at),Lt.__version=ot.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function rt(D,w,tt){if(w.image.length!==6)return;const at=Me(D,w),lt=w.source;e.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+tt);const ot=n.get(lt);if(lt.version!==ot.__version||at===!0){e.activeTexture(i.TEXTURE0+tt);const Lt=ke.getPrimaries(ke.workingColorSpace),ct=w.colorSpace===Li?null:ke.getPrimaries(w.colorSpace),wt=w.colorSpace===Li||Lt===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);const zt=w.isCompressedTexture||w.image[0].isCompressedTexture,gt=w.image[0]&&w.image[0].isDataTexture,Rt=[];for(let ut=0;ut<6;ut++)!zt&&!gt?Rt[ut]=g(w.image[ut],!0,s.maxCubemapSize):Rt[ut]=gt?w.image[ut].image:w.image[ut],Rt[ut]=le(w,Rt[ut]);const Qt=Rt[0],Bt=r.convert(w.format,w.colorSpace),St=r.convert(w.type),ue=y(w.internalFormat,Bt,St,w.colorSpace),$=w.isVideoTexture!==!0,yt=ot.__version===void 0||at===!0,Et=lt.dataReady;let Ft=T(w,Qt);Vt(i.TEXTURE_CUBE_MAP,w);let xt;if(zt){$&&yt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ft,ue,Qt.width,Qt.height);for(let ut=0;ut<6;ut++){xt=Rt[ut].mipmaps;for(let Ht=0;Ht<xt.length;Ht++){const de=xt[Ht];w.format!==Gn?Bt!==null?$?Et&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ht,0,0,de.width,de.height,Bt,de.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ht,ue,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ht,0,0,de.width,de.height,Bt,St,de.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ht,ue,de.width,de.height,0,Bt,St,de.data)}}}else{if(xt=w.mipmaps,$&&yt){xt.length>0&&Ft++;const ut=ze(Rt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ft,ue,ut.width,ut.height)}for(let ut=0;ut<6;ut++)if(gt){$?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,Rt[ut].width,Rt[ut].height,Bt,St,Rt[ut].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,ue,Rt[ut].width,Rt[ut].height,0,Bt,St,Rt[ut].data);for(let Ht=0;Ht<xt.length;Ht++){const Be=xt[Ht].image[ut].image;$?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ht+1,0,0,Be.width,Be.height,Bt,St,Be.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ht+1,ue,Be.width,Be.height,0,Bt,St,Be.data)}}else{$?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,Bt,St,Rt[ut]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,ue,Bt,St,Rt[ut]);for(let Ht=0;Ht<xt.length;Ht++){const de=xt[Ht];$?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ht+1,0,0,Bt,St,de.image[ut]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Ht+1,ue,Bt,St,de.image[ut])}}}x(w)&&p(i.TEXTURE_CUBE_MAP),ot.__version=lt.version,w.onUpdate&&w.onUpdate(w)}D.__version=w.version}function _t(D,w,tt,at,lt,ot){const Lt=r.convert(tt.format,tt.colorSpace),ct=r.convert(tt.type),wt=y(tt.internalFormat,Lt,ct,tt.colorSpace),zt=n.get(w),gt=n.get(tt);if(gt.__renderTarget=w,!zt.__hasExternalTextures){const Rt=Math.max(1,w.width>>ot),Qt=Math.max(1,w.height>>ot);lt===i.TEXTURE_3D||lt===i.TEXTURE_2D_ARRAY?e.texImage3D(lt,ot,wt,Rt,Qt,w.depth,0,Lt,ct,null):e.texImage2D(lt,ot,wt,Rt,Qt,0,Lt,ct,null)}e.bindFramebuffer(i.FRAMEBUFFER,D),mt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,at,lt,gt.__webglTexture,0,se(w)):(lt===i.TEXTURE_2D||lt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,at,lt,gt.__webglTexture,ot),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Xt(D,w,tt){if(i.bindRenderbuffer(i.RENDERBUFFER,D),w.depthBuffer){const at=w.depthTexture,lt=at&&at.isDepthTexture?at.type:null,ot=_(w.stencilBuffer,lt),Lt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=se(w);mt(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,ot,w.width,w.height):tt?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,ot,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,ot,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Lt,i.RENDERBUFFER,D)}else{const at=w.textures;for(let lt=0;lt<at.length;lt++){const ot=at[lt],Lt=r.convert(ot.format,ot.colorSpace),ct=r.convert(ot.type),wt=y(ot.internalFormat,Lt,ct,ot.colorSpace),zt=se(w);tt&&mt(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,zt,wt,w.width,w.height):mt(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,zt,wt,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,wt,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Nt(D,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,D),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const at=n.get(w.depthTexture);at.__renderTarget=w,(!at.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),H(w.depthTexture,0);const lt=at.__webglTexture,ot=se(w);if(w.depthTexture.format===co)mt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,lt,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,lt,0);else if(w.depthTexture.format===ho)mt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,lt,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,lt,0);else throw new Error("Unknown depthTexture format")}function fe(D){const w=n.get(D),tt=D.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==D.depthTexture){const at=D.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),at){const lt=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,at.removeEventListener("dispose",lt)};at.addEventListener("dispose",lt),w.__depthDisposeCallback=lt}w.__boundDepthTexture=at}if(D.depthTexture&&!w.__autoAllocateDepthBuffer){if(tt)throw new Error("target.depthTexture not supported in Cube render targets");const at=D.texture.mipmaps;at&&at.length>0?Nt(w.__webglFramebuffer[0],D):Nt(w.__webglFramebuffer,D)}else if(tt){w.__webglDepthbuffer=[];for(let at=0;at<6;at++)if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[at]),w.__webglDepthbuffer[at]===void 0)w.__webglDepthbuffer[at]=i.createRenderbuffer(),Xt(w.__webglDepthbuffer[at],D,!1);else{const lt=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=w.__webglDepthbuffer[at];i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,ot)}}else{const at=D.texture.mipmaps;if(at&&at.length>0?e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),Xt(w.__webglDepthbuffer,D,!1);else{const lt=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,ot)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function we(D,w,tt){const at=n.get(D);w!==void 0&&_t(at.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),tt!==void 0&&fe(D)}function I(D){const w=D.texture,tt=n.get(D),at=n.get(w);D.addEventListener("dispose",E);const lt=D.textures,ot=D.isWebGLCubeRenderTarget===!0,Lt=lt.length>1;if(Lt||(at.__webglTexture===void 0&&(at.__webglTexture=i.createTexture()),at.__version=w.version,o.memory.textures++),ot){tt.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(w.mipmaps&&w.mipmaps.length>0){tt.__webglFramebuffer[ct]=[];for(let wt=0;wt<w.mipmaps.length;wt++)tt.__webglFramebuffer[ct][wt]=i.createFramebuffer()}else tt.__webglFramebuffer[ct]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){tt.__webglFramebuffer=[];for(let ct=0;ct<w.mipmaps.length;ct++)tt.__webglFramebuffer[ct]=i.createFramebuffer()}else tt.__webglFramebuffer=i.createFramebuffer();if(Lt)for(let ct=0,wt=lt.length;ct<wt;ct++){const zt=n.get(lt[ct]);zt.__webglTexture===void 0&&(zt.__webglTexture=i.createTexture(),o.memory.textures++)}if(D.samples>0&&mt(D)===!1){tt.__webglMultisampledFramebuffer=i.createFramebuffer(),tt.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,tt.__webglMultisampledFramebuffer);for(let ct=0;ct<lt.length;ct++){const wt=lt[ct];tt.__webglColorRenderbuffer[ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,tt.__webglColorRenderbuffer[ct]);const zt=r.convert(wt.format,wt.colorSpace),gt=r.convert(wt.type),Rt=y(wt.internalFormat,zt,gt,wt.colorSpace,D.isXRRenderTarget===!0),Qt=se(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Qt,Rt,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,tt.__webglColorRenderbuffer[ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(tt.__webglDepthRenderbuffer=i.createRenderbuffer(),Xt(tt.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ot){e.bindTexture(i.TEXTURE_CUBE_MAP,at.__webglTexture),Vt(i.TEXTURE_CUBE_MAP,w);for(let ct=0;ct<6;ct++)if(w.mipmaps&&w.mipmaps.length>0)for(let wt=0;wt<w.mipmaps.length;wt++)_t(tt.__webglFramebuffer[ct][wt],D,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,wt);else _t(tt.__webglFramebuffer[ct],D,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);x(w)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Lt){for(let ct=0,wt=lt.length;ct<wt;ct++){const zt=lt[ct],gt=n.get(zt);let Rt=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Rt=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Rt,gt.__webglTexture),Vt(Rt,zt),_t(tt.__webglFramebuffer,D,zt,i.COLOR_ATTACHMENT0+ct,Rt,0),x(zt)&&p(Rt)}e.unbindTexture()}else{let ct=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ct=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ct,at.__webglTexture),Vt(ct,w),w.mipmaps&&w.mipmaps.length>0)for(let wt=0;wt<w.mipmaps.length;wt++)_t(tt.__webglFramebuffer[wt],D,w,i.COLOR_ATTACHMENT0,ct,wt);else _t(tt.__webglFramebuffer,D,w,i.COLOR_ATTACHMENT0,ct,0);x(w)&&p(ct),e.unbindTexture()}D.depthBuffer&&fe(D)}function ne(D){const w=D.textures;for(let tt=0,at=w.length;tt<at;tt++){const lt=w[tt];if(x(lt)){const ot=v(D),Lt=n.get(lt).__webglTexture;e.bindTexture(ot,Lt),p(ot),e.unbindTexture()}}}const jt=[],Yt=[];function It(D){if(D.samples>0){if(mt(D)===!1){const w=D.textures,tt=D.width,at=D.height;let lt=i.COLOR_BUFFER_BIT;const ot=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Lt=n.get(D),ct=w.length>1;if(ct)for(let zt=0;zt<w.length;zt++)e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+zt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+zt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer);const wt=D.texture.mipmaps;wt&&wt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let zt=0;zt<w.length;zt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(lt|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(lt|=i.STENCIL_BUFFER_BIT)),ct){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[zt]);const gt=n.get(w[zt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,gt,0)}i.blitFramebuffer(0,0,tt,at,0,0,tt,at,lt,i.NEAREST),l===!0&&(jt.length=0,Yt.length=0,jt.push(i.COLOR_ATTACHMENT0+zt),D.depthBuffer&&D.resolveDepthBuffer===!1&&(jt.push(ot),Yt.push(ot),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Yt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,jt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ct)for(let zt=0;zt<w.length;zt++){e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+zt,i.RENDERBUFFER,Lt.__webglColorRenderbuffer[zt]);const gt=n.get(w[zt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+zt,i.TEXTURE_2D,gt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const w=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function se(D){return Math.min(s.maxSamples,D.samples)}function mt(D){const w=n.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Mt(D){const w=o.render.frame;h.get(D)!==w&&(h.set(D,w),D.update())}function le(D,w){const tt=D.colorSpace,at=D.format,lt=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||tt!==Ar&&tt!==Li&&(ke.getTransfer(tt)===Ge?(at!==Gn||lt!==vi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",tt)),w}function ze(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=P,this.setTexture2D=H,this.setTexture2DArray=V,this.setTexture3D=N,this.setTextureCube=B,this.rebindTextures=we,this.setupRenderTarget=I,this.updateRenderTargetMipmap=ne,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=fe,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=mt}function Ty(i,t){function e(n,s=Li){let r;const o=ke.getTransfer(s);if(n===vi)return i.UNSIGNED_BYTE;if(n===th)return i.UNSIGNED_SHORT_4_4_4_4;if(n===eh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Rd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Cd)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Td)return i.BYTE;if(n===Ad)return i.SHORT;if(n===ao)return i.UNSIGNED_SHORT;if(n===Qc)return i.INT;if(n===zs)return i.UNSIGNED_INT;if(n===oi)return i.FLOAT;if(n===vo)return i.HALF_FLOAT;if(n===Pd)return i.ALPHA;if(n===zd)return i.RGB;if(n===Gn)return i.RGBA;if(n===co)return i.DEPTH_COMPONENT;if(n===ho)return i.DEPTH_STENCIL;if(n===nh)return i.RED;if(n===ih)return i.RED_INTEGER;if(n===Dd)return i.RG;if(n===sh)return i.RG_INTEGER;if(n===rh)return i.RGBA_INTEGER;if(n===ya||n===_a||n===Ma||n===ba)if(o===Ge)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ya)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ya)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_a)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===pc||n===mc||n===gc||n===xc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===pc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===mc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===gc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===xc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===vc||n===yc||n===_c)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===vc||n===yc)return o===Ge?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===_c)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Mc||n===bc||n===Sc||n===wc||n===Ec||n===Tc||n===Ac||n===Rc||n===Cc||n===Pc||n===zc||n===Dc||n===Ic||n===Lc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Mc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===bc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Sc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ec)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Tc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ac)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Rc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Cc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Pc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===zc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Dc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ic)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Lc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Uc||n===kc||n===Nc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Uc)return o===Ge?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===kc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Nc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Fc||n===Oc||n===Bc||n===Hc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Fc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Oc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Bc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Hc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===lo?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const Ay=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ry=`
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

}`;class Cy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Wd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Zn({vertexShader:Ay,fragmentShader:Ry,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Jt(new Ni(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Py extends Pr{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null;const g=typeof XRWebGLBinding<"u",x=new Cy,p={},v=e.getContextAttributes();let y=null,_=null;const T=[],A=[],E=new Wt;let R=null;const S=new kn;S.viewport=new Le;const b=new kn;b.viewport=new Le;const U=[S,b],P=new Km;let G=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let rt=T[Y];return rt===void 0&&(rt=new vl,T[Y]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(Y){let rt=T[Y];return rt===void 0&&(rt=new vl,T[Y]=rt),rt.getGripSpace()},this.getHand=function(Y){let rt=T[Y];return rt===void 0&&(rt=new vl,T[Y]=rt),rt.getHandSpace()};function H(Y){const rt=A.indexOf(Y.inputSource);if(rt===-1)return;const _t=T[rt];_t!==void 0&&(_t.update(Y.inputSource,Y.frame,c||o),_t.dispatchEvent({type:Y.type,data:Y.inputSource}))}function V(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",N);for(let Y=0;Y<T.length;Y++){const rt=A[Y];rt!==null&&(A[Y]=null,T[Y].disconnect(rt))}G=null,Z=null,x.reset();for(const Y in p)delete p[Y];t.setRenderTarget(y),f=null,d=null,u=null,s=null,_=null,ht.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&g&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",V),s.addEventListener("inputsourceschange",N),v.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(E),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let _t=null,Xt=null,Nt=null;v.depth&&(Nt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,_t=v.stencil?ho:co,Xt=v.stencil?lo:zs);const fe={colorFormat:e.RGBA8,depthFormat:Nt,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(fe),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),_=new us(d.textureWidth,d.textureHeight,{format:Gn,type:vi,depthTexture:new Vd(d.textureWidth,d.textureHeight,Xt,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const _t={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,_t),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new us(f.framebufferWidth,f.framebufferHeight,{format:Gn,type:vi,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ht.setContext(s),ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function N(Y){for(let rt=0;rt<Y.removed.length;rt++){const _t=Y.removed[rt],Xt=A.indexOf(_t);Xt>=0&&(A[Xt]=null,T[Xt].disconnect(_t))}for(let rt=0;rt<Y.added.length;rt++){const _t=Y.added[rt];let Xt=A.indexOf(_t);if(Xt===-1){for(let fe=0;fe<T.length;fe++)if(fe>=A.length){A.push(_t),Xt=fe;break}else if(A[fe]===null){A[fe]=_t,Xt=fe;break}if(Xt===-1)break}const Nt=T[Xt];Nt&&Nt.connect(_t)}}const B=new L,Q=new L;function X(Y,rt,_t){B.setFromMatrixPosition(rt.matrixWorld),Q.setFromMatrixPosition(_t.matrixWorld);const Xt=B.distanceTo(Q),Nt=rt.projectionMatrix.elements,fe=_t.projectionMatrix.elements,we=Nt[14]/(Nt[10]-1),I=Nt[14]/(Nt[10]+1),ne=(Nt[9]+1)/Nt[5],jt=(Nt[9]-1)/Nt[5],Yt=(Nt[8]-1)/Nt[0],It=(fe[8]+1)/fe[0],se=we*Yt,mt=we*It,Mt=Xt/(-Yt+It),le=Mt*-Yt;if(rt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(le),Y.translateZ(Mt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Nt[10]===-1)Y.projectionMatrix.copy(rt.projectionMatrix),Y.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const ze=we+Mt,D=I+Mt,w=se-le,tt=mt+(Xt-le),at=ne*I/D*ze,lt=jt*I/D*ze;Y.projectionMatrix.makePerspective(w,tt,at,lt,ze,D),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function ft(Y,rt){rt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(rt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let rt=Y.near,_t=Y.far;x.texture!==null&&(x.depthNear>0&&(rt=x.depthNear),x.depthFar>0&&(_t=x.depthFar)),P.near=b.near=S.near=rt,P.far=b.far=S.far=_t,(G!==P.near||Z!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),G=P.near,Z=P.far),P.layers.mask=Y.layers.mask|6,S.layers.mask=P.layers.mask&3,b.layers.mask=P.layers.mask&5;const Xt=Y.parent,Nt=P.cameras;ft(P,Xt);for(let fe=0;fe<Nt.length;fe++)ft(Nt[fe],Xt);Nt.length===2?X(P,S,b):P.projectionMatrix.copy(S.projectionMatrix),Vt(Y,P,Xt)};function Vt(Y,rt,_t){_t===null?Y.matrix.copy(rt.matrixWorld):(Y.matrix.copy(_t.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(rt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(rt.projectionMatrix),Y.projectionMatrixInverse.copy(rt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=uo*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(Y){l=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(P)},this.getCameraTexture=function(Y){return p[Y]};let Me=null;function ce(Y,rt){if(h=rt.getViewerPose(c||o),m=rt,h!==null){const _t=h.views;f!==null&&(t.setRenderTargetFramebuffer(_,f.framebuffer),t.setRenderTarget(_));let Xt=!1;_t.length!==P.cameras.length&&(P.cameras.length=0,Xt=!0);for(let I=0;I<_t.length;I++){const ne=_t[I];let jt=null;if(f!==null)jt=f.getViewport(ne);else{const It=u.getViewSubImage(d,ne);jt=It.viewport,I===0&&(t.setRenderTargetTextures(_,It.colorTexture,It.depthStencilTexture),t.setRenderTarget(_))}let Yt=U[I];Yt===void 0&&(Yt=new kn,Yt.layers.enable(I),Yt.viewport=new Le,U[I]=Yt),Yt.matrix.fromArray(ne.transform.matrix),Yt.matrix.decompose(Yt.position,Yt.quaternion,Yt.scale),Yt.projectionMatrix.fromArray(ne.projectionMatrix),Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),Yt.viewport.set(jt.x,jt.y,jt.width,jt.height),I===0&&(P.matrix.copy(Yt.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Xt===!0&&P.cameras.push(Yt)}const Nt=s.enabledFeatures;if(Nt&&Nt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&g){u=n.getBinding();const I=u.getDepthInformation(_t[0]);I&&I.isValid&&I.texture&&x.init(I,s.renderState)}if(Nt&&Nt.includes("camera-access")&&g){t.state.unbindTexture(),u=n.getBinding();for(let I=0;I<_t.length;I++){const ne=_t[I].camera;if(ne){let jt=p[ne];jt||(jt=new Wd,p[ne]=jt);const Yt=u.getCameraImage(ne);jt.sourceTexture=Yt}}}}for(let _t=0;_t<T.length;_t++){const Xt=A[_t],Nt=T[_t];Xt!==null&&Nt!==void 0&&Nt.update(Xt,rt,c||o)}Me&&Me(Y,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),m=null}const ht=new Kd;ht.setAnimationLoop(ce),this.setAnimationLoop=function(Y){Me=Y},this.dispose=function(){}}}const Ss=new yi,zy=new he;function Dy(i,t){function e(x,p){x.matrixAutoUpdate===!0&&x.updateMatrix(),p.value.copy(x.matrix)}function n(x,p){p.color.getRGB(x.fogColor.value,Fd(i)),p.isFog?(x.fogNear.value=p.near,x.fogFar.value=p.far):p.isFogExp2&&(x.fogDensity.value=p.density)}function s(x,p,v,y,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(x,p):p.isMeshToonMaterial?(r(x,p),u(x,p)):p.isMeshPhongMaterial?(r(x,p),h(x,p)):p.isMeshStandardMaterial?(r(x,p),d(x,p),p.isMeshPhysicalMaterial&&f(x,p,_)):p.isMeshMatcapMaterial?(r(x,p),m(x,p)):p.isMeshDepthMaterial?r(x,p):p.isMeshDistanceMaterial?(r(x,p),g(x,p)):p.isMeshNormalMaterial?r(x,p):p.isLineBasicMaterial?(o(x,p),p.isLineDashedMaterial&&a(x,p)):p.isPointsMaterial?l(x,p,v,y):p.isSpriteMaterial?c(x,p):p.isShadowMaterial?(x.color.value.copy(p.color),x.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(x,p){x.opacity.value=p.opacity,p.color&&x.diffuse.value.copy(p.color),p.emissive&&x.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(x.map.value=p.map,e(p.map,x.mapTransform)),p.alphaMap&&(x.alphaMap.value=p.alphaMap,e(p.alphaMap,x.alphaMapTransform)),p.bumpMap&&(x.bumpMap.value=p.bumpMap,e(p.bumpMap,x.bumpMapTransform),x.bumpScale.value=p.bumpScale,p.side===Dn&&(x.bumpScale.value*=-1)),p.normalMap&&(x.normalMap.value=p.normalMap,e(p.normalMap,x.normalMapTransform),x.normalScale.value.copy(p.normalScale),p.side===Dn&&x.normalScale.value.negate()),p.displacementMap&&(x.displacementMap.value=p.displacementMap,e(p.displacementMap,x.displacementMapTransform),x.displacementScale.value=p.displacementScale,x.displacementBias.value=p.displacementBias),p.emissiveMap&&(x.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,x.emissiveMapTransform)),p.specularMap&&(x.specularMap.value=p.specularMap,e(p.specularMap,x.specularMapTransform)),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest);const v=t.get(p),y=v.envMap,_=v.envMapRotation;y&&(x.envMap.value=y,Ss.copy(_),Ss.x*=-1,Ss.y*=-1,Ss.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ss.y*=-1,Ss.z*=-1),x.envMapRotation.value.setFromMatrix4(zy.makeRotationFromEuler(Ss)),x.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=p.reflectivity,x.ior.value=p.ior,x.refractionRatio.value=p.refractionRatio),p.lightMap&&(x.lightMap.value=p.lightMap,x.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,x.lightMapTransform)),p.aoMap&&(x.aoMap.value=p.aoMap,x.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,x.aoMapTransform))}function o(x,p){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity,p.map&&(x.map.value=p.map,e(p.map,x.mapTransform))}function a(x,p){x.dashSize.value=p.dashSize,x.totalSize.value=p.dashSize+p.gapSize,x.scale.value=p.scale}function l(x,p,v,y){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity,x.size.value=p.size*v,x.scale.value=y*.5,p.map&&(x.map.value=p.map,e(p.map,x.uvTransform)),p.alphaMap&&(x.alphaMap.value=p.alphaMap,e(p.alphaMap,x.alphaMapTransform)),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest)}function c(x,p){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity,x.rotation.value=p.rotation,p.map&&(x.map.value=p.map,e(p.map,x.mapTransform)),p.alphaMap&&(x.alphaMap.value=p.alphaMap,e(p.alphaMap,x.alphaMapTransform)),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest)}function h(x,p){x.specular.value.copy(p.specular),x.shininess.value=Math.max(p.shininess,1e-4)}function u(x,p){p.gradientMap&&(x.gradientMap.value=p.gradientMap)}function d(x,p){x.metalness.value=p.metalness,p.metalnessMap&&(x.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,x.metalnessMapTransform)),x.roughness.value=p.roughness,p.roughnessMap&&(x.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,x.roughnessMapTransform)),p.envMap&&(x.envMapIntensity.value=p.envMapIntensity)}function f(x,p,v){x.ior.value=p.ior,p.sheen>0&&(x.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),x.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(x.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,x.sheenColorMapTransform)),p.sheenRoughnessMap&&(x.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,x.sheenRoughnessMapTransform))),p.clearcoat>0&&(x.clearcoat.value=p.clearcoat,x.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(x.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,x.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(x.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Dn&&x.clearcoatNormalScale.value.negate())),p.dispersion>0&&(x.dispersion.value=p.dispersion),p.iridescence>0&&(x.iridescence.value=p.iridescence,x.iridescenceIOR.value=p.iridescenceIOR,x.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(x.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,x.iridescenceMapTransform)),p.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),p.transmission>0&&(x.transmission.value=p.transmission,x.transmissionSamplerMap.value=v.texture,x.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(x.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,x.transmissionMapTransform)),x.thickness.value=p.thickness,p.thicknessMap&&(x.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=p.attenuationDistance,x.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(x.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(x.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=p.specularIntensity,x.specularColor.value.copy(p.specularColor),p.specularColorMap&&(x.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,x.specularColorMapTransform)),p.specularIntensityMap&&(x.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,x.specularIntensityMapTransform))}function m(x,p){p.matcap&&(x.matcap.value=p.matcap)}function g(x,p){const v=t.get(p).light;x.referencePosition.value.setFromMatrixPosition(v.matrixWorld),x.nearDistance.value=v.shadow.camera.near,x.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Iy(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){const _=y.program;n.uniformBlockBinding(v,_)}function c(v,y){let _=s[v.id];_===void 0&&(m(v),_=h(v),s[v.id]=_,v.addEventListener("dispose",x));const T=y.program;n.updateUBOMapping(v,T);const A=t.render.frame;r[v.id]!==A&&(d(v),r[v.id]=A)}function h(v){const y=u();v.__bindingPointIndex=y;const _=i.createBuffer(),T=v.__size,A=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,T,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,_),_}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const y=s[v.id],_=v.uniforms,T=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let A=0,E=_.length;A<E;A++){const R=Array.isArray(_[A])?_[A]:[_[A]];for(let S=0,b=R.length;S<b;S++){const U=R[S];if(f(U,A,S,T)===!0){const P=U.__offset,G=Array.isArray(U.value)?U.value:[U.value];let Z=0;for(let H=0;H<G.length;H++){const V=G[H],N=g(V);typeof V=="number"||typeof V=="boolean"?(U.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,P+Z,U.__data)):V.isMatrix3?(U.__data[0]=V.elements[0],U.__data[1]=V.elements[1],U.__data[2]=V.elements[2],U.__data[3]=0,U.__data[4]=V.elements[3],U.__data[5]=V.elements[4],U.__data[6]=V.elements[5],U.__data[7]=0,U.__data[8]=V.elements[6],U.__data[9]=V.elements[7],U.__data[10]=V.elements[8],U.__data[11]=0):(V.toArray(U.__data,Z),Z+=N.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,P,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,y,_,T){const A=v.value,E=y+"_"+_;if(T[E]===void 0)return typeof A=="number"||typeof A=="boolean"?T[E]=A:T[E]=A.clone(),!0;{const R=T[E];if(typeof A=="number"||typeof A=="boolean"){if(R!==A)return T[E]=A,!0}else if(R.equals(A)===!1)return R.copy(A),!0}return!1}function m(v){const y=v.uniforms;let _=0;const T=16;for(let E=0,R=y.length;E<R;E++){const S=Array.isArray(y[E])?y[E]:[y[E]];for(let b=0,U=S.length;b<U;b++){const P=S[b],G=Array.isArray(P.value)?P.value:[P.value];for(let Z=0,H=G.length;Z<H;Z++){const V=G[Z],N=g(V),B=_%T,Q=B%N.boundary,X=B+Q;_+=Q,X!==0&&T-X<N.storage&&(_+=T-X),P.__data=new Float32Array(N.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=_,_+=N.storage}}}const A=_%T;return A>0&&(_+=T-A),v.__size=_,v.__cache={},this}function g(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function x(v){const y=v.target;y.removeEventListener("dispose",x);const _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(const v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Ly{constructor(t={}){const{canvas:e=qp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const m=new Uint32Array(4),g=new Int32Array(4);let x=null,p=null;const v=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=cs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let T=!1;this._outputColorSpace=Un;let A=0,E=0,R=null,S=-1,b=null;const U=new Le,P=new Le;let G=null;const Z=new ee(0);let H=0,V=e.width,N=e.height,B=1,Q=null,X=null;const ft=new Le(0,0,V,N),Vt=new Le(0,0,V,N);let Me=!1;const ce=new fh;let ht=!1,Y=!1;const rt=new he,_t=new L,Xt=new Le,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let fe=!1;function we(){return R===null?B:1}let I=n;function ne(C,K){return e.getContext(C,K)}try{const C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Jc}`),e.addEventListener("webglcontextlost",Et,!1),e.addEventListener("webglcontextrestored",Ft,!1),e.addEventListener("webglcontextcreationerror",xt,!1),I===null){const K="webgl2";if(I=ne(K,C),I===null)throw ne(K)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let jt,Yt,It,se,mt,Mt,le,ze,D,w,tt,at,lt,ot,Lt,ct,wt,zt,gt,Rt,Qt,Bt,St,ue;function $(){jt=new Wx(I),jt.init(),Bt=new Ty(I,jt),Yt=new Nx(I,jt,t,Bt),It=new wy(I,jt),Yt.reversedDepthBuffer&&d&&It.buffers.depth.setReversed(!0),se=new $x(I),mt=new uy,Mt=new Ey(I,jt,It,mt,Yt,Bt,se),le=new Ox(_),ze=new Vx(_),D=new Qm(I),St=new Ux(I,D),w=new Xx(I,D,se,St),tt=new Zx(I,w,D,se),gt=new Yx(I,Yt,Mt),ct=new Fx(mt),at=new hy(_,le,ze,jt,Yt,St,ct),lt=new Dy(_,mt),ot=new fy,Lt=new yy(jt),zt=new Lx(_,le,ze,It,tt,f,l),wt=new by(_,tt,Yt),ue=new Iy(I,se,Yt,It),Rt=new kx(I,jt,se),Qt=new qx(I,jt,se),se.programs=at.programs,_.capabilities=Yt,_.extensions=jt,_.properties=mt,_.renderLists=ot,_.shadowMap=wt,_.state=It,_.info=se}$();const yt=new Py(_,I);this.xr=yt,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const C=jt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=jt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(C){C!==void 0&&(B=C,this.setSize(V,N,!1))},this.getSize=function(C){return C.set(V,N)},this.setSize=function(C,K,et=!0){if(yt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=C,N=K,e.width=Math.floor(C*B),e.height=Math.floor(K*B),et===!0&&(e.style.width=C+"px",e.style.height=K+"px"),this.setViewport(0,0,C,K)},this.getDrawingBufferSize=function(C){return C.set(V*B,N*B).floor()},this.setDrawingBufferSize=function(C,K,et){V=C,N=K,B=et,e.width=Math.floor(C*et),e.height=Math.floor(K*et),this.setViewport(0,0,C,K)},this.getCurrentViewport=function(C){return C.copy(U)},this.getViewport=function(C){return C.copy(ft)},this.setViewport=function(C,K,et,nt){C.isVector4?ft.set(C.x,C.y,C.z,C.w):ft.set(C,K,et,nt),It.viewport(U.copy(ft).multiplyScalar(B).round())},this.getScissor=function(C){return C.copy(Vt)},this.setScissor=function(C,K,et,nt){C.isVector4?Vt.set(C.x,C.y,C.z,C.w):Vt.set(C,K,et,nt),It.scissor(P.copy(Vt).multiplyScalar(B).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(C){It.setScissorTest(Me=C)},this.setOpaqueSort=function(C){Q=C},this.setTransparentSort=function(C){X=C},this.getClearColor=function(C){return C.copy(zt.getClearColor())},this.setClearColor=function(){zt.setClearColor(...arguments)},this.getClearAlpha=function(){return zt.getClearAlpha()},this.setClearAlpha=function(){zt.setClearAlpha(...arguments)},this.clear=function(C=!0,K=!0,et=!0){let nt=0;if(C){let J=!1;if(R!==null){const vt=R.texture.format;J=vt===rh||vt===sh||vt===ih}if(J){const vt=R.texture.type,Ct=vt===vi||vt===zs||vt===ao||vt===lo||vt===th||vt===eh,Ot=zt.getClearColor(),Ut=zt.getClearAlpha(),re=Ot.r,$t=Ot.g,qt=Ot.b;Ct?(m[0]=re,m[1]=$t,m[2]=qt,m[3]=Ut,I.clearBufferuiv(I.COLOR,0,m)):(g[0]=re,g[1]=$t,g[2]=qt,g[3]=Ut,I.clearBufferiv(I.COLOR,0,g))}else nt|=I.COLOR_BUFFER_BIT}K&&(nt|=I.DEPTH_BUFFER_BIT),et&&(nt|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Et,!1),e.removeEventListener("webglcontextrestored",Ft,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),zt.dispose(),ot.dispose(),Lt.dispose(),mt.dispose(),le.dispose(),ze.dispose(),tt.dispose(),St.dispose(),ue.dispose(),at.dispose(),yt.dispose(),yt.removeEventListener("sessionstart",vn),yt.removeEventListener("sessionend",Ir),ai.stop()};function Et(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Ft(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const C=se.autoReset,K=wt.enabled,et=wt.autoUpdate,nt=wt.needsUpdate,J=wt.type;$(),se.autoReset=C,wt.enabled=K,wt.autoUpdate=et,wt.needsUpdate=nt,wt.type=J}function xt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ut(C){const K=C.target;K.removeEventListener("dispose",ut),Ht(K)}function Ht(C){de(C),mt.remove(C)}function de(C){const K=mt.get(C).programs;K!==void 0&&(K.forEach(function(et){at.releaseProgram(et)}),C.isShaderMaterial&&at.releaseShaderCache(C))}this.renderBufferDirect=function(C,K,et,nt,J,vt){K===null&&(K=Nt);const Ct=J.isMesh&&J.matrixWorld.determinant()<0,Ot=Ur(C,K,et,nt,J);It.setMaterial(nt,Ct);let Ut=et.index,re=1;if(nt.wireframe===!0){if(Ut=w.getWireframeAttribute(et),Ut===void 0)return;re=2}const $t=et.drawRange,qt=et.attributes.position;let Ee=$t.start*re,Ne=($t.start+$t.count)*re;vt!==null&&(Ee=Math.max(Ee,vt.start*re),Ne=Math.min(Ne,(vt.start+vt.count)*re)),Ut!==null?(Ee=Math.max(Ee,0),Ne=Math.min(Ne,Ut.count)):qt!=null&&(Ee=Math.max(Ee,0),Ne=Math.min(Ne,qt.count));const Ze=Ne-Ee;if(Ze<0||Ze===1/0)return;St.setup(J,nt,Ot,et,Ut);let We,De=Rt;if(Ut!==null&&(We=D.get(Ut),De=Qt,De.setIndex(We)),J.isMesh)nt.wireframe===!0?(It.setLineWidth(nt.wireframeLinewidth*we()),De.setMode(I.LINES)):De.setMode(I.TRIANGLES);else if(J.isLine){let Kt=nt.linewidth;Kt===void 0&&(Kt=1),It.setLineWidth(Kt*we()),J.isLineSegments?De.setMode(I.LINES):J.isLineLoop?De.setMode(I.LINE_LOOP):De.setMode(I.LINE_STRIP)}else J.isPoints?De.setMode(I.POINTS):J.isSprite&&De.setMode(I.TRIANGLES);if(J.isBatchedMesh)if(J._multiDrawInstances!==null)fo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),De.renderMultiDrawInstances(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount,J._multiDrawInstances);else if(jt.get("WEBGL_multi_draw"))De.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{const Kt=J._multiDrawStarts,Ie=J._multiDrawCounts,Te=J._multiDrawCount,yn=Ut?D.get(Ut).bytesPerElement:1,wi=mt.get(nt).currentProgram.getUniforms();for(let _n=0;_n<Te;_n++)wi.setValue(I,"_gl_DrawID",_n),De.render(Kt[_n]/yn,Ie[_n])}else if(J.isInstancedMesh)De.renderInstances(Ee,Ze,J.count);else if(et.isInstancedBufferGeometry){const Kt=et._maxInstanceCount!==void 0?et._maxInstanceCount:1/0,Ie=Math.min(et.instanceCount,Kt);De.renderInstances(Ee,Ze,Ie)}else De.render(Ee,Ze)};function Be(C,K,et){C.transparent===!0&&C.side===Ce&&C.forceSinglePass===!1?(C.side=Dn,C.needsUpdate=!0,li(C,K,et),C.side=Hi,C.needsUpdate=!0,li(C,K,et),C.side=Ce):li(C,K,et)}this.compile=function(C,K,et=null){et===null&&(et=C),p=Lt.get(et),p.init(K),y.push(p),et.traverseVisible(function(J){J.isLight&&J.layers.test(K.layers)&&(p.pushLight(J),J.castShadow&&p.pushShadow(J))}),C!==et&&C.traverseVisible(function(J){J.isLight&&J.layers.test(K.layers)&&(p.pushLight(J),J.castShadow&&p.pushShadow(J))}),p.setupLights();const nt=new Set;return C.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;const vt=J.material;if(vt)if(Array.isArray(vt))for(let Ct=0;Ct<vt.length;Ct++){const Ot=vt[Ct];Be(Ot,et,J),nt.add(Ot)}else Be(vt,et,J),nt.add(vt)}),p=y.pop(),nt},this.compileAsync=function(C,K,et=null){const nt=this.compile(C,K,et);return new Promise(J=>{function vt(){if(nt.forEach(function(Ct){mt.get(Ct).currentProgram.isReady()&&nt.delete(Ct)}),nt.size===0){J(C);return}setTimeout(vt,10)}jt.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let ve=null;function Kn(C){ve&&ve(C)}function vn(){ai.stop()}function Ir(){ai.start()}const ai=new Kd;ai.setAnimationLoop(Kn),typeof self<"u"&&ai.setContext(self),this.setAnimationLoop=function(C){ve=C,yt.setAnimationLoop(C),C===null?ai.stop():ai.start()},yt.addEventListener("sessionstart",vn),yt.addEventListener("sessionend",Ir),this.render=function(C,K){if(K!==void 0&&K.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),K.parent===null&&K.matrixWorldAutoUpdate===!0&&K.updateMatrixWorld(),yt.enabled===!0&&yt.isPresenting===!0&&(yt.cameraAutoUpdate===!0&&yt.updateCamera(K),K=yt.getCamera()),C.isScene===!0&&C.onBeforeRender(_,C,K,R),p=Lt.get(C,y.length),p.init(K),y.push(p),rt.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),ce.setFromProjectionMatrix(rt,gi,K.reversedDepth),Y=this.localClippingEnabled,ht=ct.init(this.clippingPlanes,Y),x=ot.get(C,v.length),x.init(),v.push(x),yt.enabled===!0&&yt.isPresenting===!0){const vt=_.xr.getDepthSensingMesh();vt!==null&&Fs(vt,K,-1/0,_.sortObjects)}Fs(C,K,0,_.sortObjects),x.finish(),_.sortObjects===!0&&x.sort(Q,X),fe=yt.enabled===!1||yt.isPresenting===!1||yt.hasDepthSensing()===!1,fe&&zt.addToRenderList(x,C),this.info.render.frame++,ht===!0&&ct.beginShadows();const et=p.state.shadowsArray;wt.render(et,C,K),ht===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const nt=x.opaque,J=x.transmissive;if(p.setupLights(),K.isArrayCamera){const vt=K.cameras;if(J.length>0)for(let Ct=0,Ot=vt.length;Ct<Ot;Ct++){const Ut=vt[Ct];Lr(nt,J,C,Ut)}fe&&zt.render(C);for(let Ct=0,Ot=vt.length;Ct<Ot;Ct++){const Ut=vt[Ct];Mo(x,C,Ut,Ut.viewport)}}else J.length>0&&Lr(nt,J,C,K),fe&&zt.render(C),Mo(x,C,K);R!==null&&E===0&&(Mt.updateMultisampleRenderTarget(R),Mt.updateRenderTargetMipmap(R)),C.isScene===!0&&C.onAfterRender(_,C,K),St.resetDefaultState(),S=-1,b=null,y.pop(),y.length>0?(p=y[y.length-1],ht===!0&&ct.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?x=v[v.length-1]:x=null};function Fs(C,K,et,nt){if(C.visible===!1)return;if(C.layers.test(K.layers)){if(C.isGroup)et=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(K);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||ce.intersectsSprite(C)){nt&&Xt.setFromMatrixPosition(C.matrixWorld).applyMatrix4(rt);const Ct=tt.update(C),Ot=C.material;Ot.visible&&x.push(C,Ct,Ot,et,Xt.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||ce.intersectsObject(C))){const Ct=tt.update(C),Ot=C.material;if(nt&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Xt.copy(C.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),Xt.copy(Ct.boundingSphere.center)),Xt.applyMatrix4(C.matrixWorld).applyMatrix4(rt)),Array.isArray(Ot)){const Ut=Ct.groups;for(let re=0,$t=Ut.length;re<$t;re++){const qt=Ut[re],Ee=Ot[qt.materialIndex];Ee&&Ee.visible&&x.push(C,Ct,Ee,et,Xt.z,qt)}}else Ot.visible&&x.push(C,Ct,Ot,et,Xt.z,null)}}const vt=C.children;for(let Ct=0,Ot=vt.length;Ct<Ot;Ct++)Fs(vt[Ct],K,et,nt)}function Mo(C,K,et,nt){const J=C.opaque,vt=C.transmissive,Ct=C.transparent;p.setupLightsView(et),ht===!0&&ct.setGlobalState(_.clippingPlanes,et),nt&&It.viewport(U.copy(nt)),J.length>0&&Si(J,K,et),vt.length>0&&Si(vt,K,et),Ct.length>0&&Si(Ct,K,et),It.buffers.depth.setTest(!0),It.buffers.depth.setMask(!0),It.buffers.color.setMask(!0),It.setPolygonOffset(!1)}function Lr(C,K,et,nt){if((et.isScene===!0?et.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[nt.id]===void 0&&(p.state.transmissionRenderTarget[nt.id]=new us(1,1,{generateMipmaps:!0,type:jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float")?vo:vi,minFilter:os,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ke.workingColorSpace}));const vt=p.state.transmissionRenderTarget[nt.id],Ct=nt.viewport||U;vt.setSize(Ct.z*_.transmissionResolutionScale,Ct.w*_.transmissionResolutionScale);const Ot=_.getRenderTarget(),Ut=_.getActiveCubeFace(),re=_.getActiveMipmapLevel();_.setRenderTarget(vt),_.getClearColor(Z),H=_.getClearAlpha(),H<1&&_.setClearColor(16777215,.5),_.clear(),fe&&zt.render(et);const $t=_.toneMapping;_.toneMapping=cs;const qt=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),p.setupLightsView(nt),ht===!0&&ct.setGlobalState(_.clippingPlanes,nt),Si(C,et,nt),Mt.updateMultisampleRenderTarget(vt),Mt.updateRenderTargetMipmap(vt),jt.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let Ne=0,Ze=K.length;Ne<Ze;Ne++){const We=K[Ne],De=We.object,Kt=We.geometry,Ie=We.material,Te=We.group;if(Ie.side===Ce&&De.layers.test(nt.layers)){const yn=Ie.side;Ie.side=Dn,Ie.needsUpdate=!0,bo(De,et,nt,Kt,Ie,Te),Ie.side=yn,Ie.needsUpdate=!0,Ee=!0}}Ee===!0&&(Mt.updateMultisampleRenderTarget(vt),Mt.updateRenderTargetMipmap(vt))}_.setRenderTarget(Ot,Ut,re),_.setClearColor(Z,H),qt!==void 0&&(nt.viewport=qt),_.toneMapping=$t}function Si(C,K,et){const nt=K.isScene===!0?K.overrideMaterial:null;for(let J=0,vt=C.length;J<vt;J++){const Ct=C[J],Ot=Ct.object,Ut=Ct.geometry,re=Ct.group;let $t=Ct.material;$t.allowOverride===!0&&nt!==null&&($t=nt),Ot.layers.test(et.layers)&&bo(Ot,K,et,Ut,$t,re)}}function bo(C,K,et,nt,J,vt){C.onBeforeRender(_,K,et,nt,J,vt),C.modelViewMatrix.multiplyMatrices(et.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),J.onBeforeRender(_,K,et,nt,C,vt),J.transparent===!0&&J.side===Ce&&J.forceSinglePass===!1?(J.side=Dn,J.needsUpdate=!0,_.renderBufferDirect(et,K,nt,J,C,vt),J.side=Hi,J.needsUpdate=!0,_.renderBufferDirect(et,K,nt,J,C,vt),J.side=Ce):_.renderBufferDirect(et,K,nt,J,C,vt),C.onAfterRender(_,K,et,nt,J,vt)}function li(C,K,et){K.isScene!==!0&&(K=Nt);const nt=mt.get(C),J=p.state.lights,vt=p.state.shadowsArray,Ct=J.state.version,Ot=at.getParameters(C,J.state,vt,K,et),Ut=at.getProgramCacheKey(Ot);let re=nt.programs;nt.environment=C.isMeshStandardMaterial?K.environment:null,nt.fog=K.fog,nt.envMap=(C.isMeshStandardMaterial?ze:le).get(C.envMap||nt.environment),nt.envMapRotation=nt.environment!==null&&C.envMap===null?K.environmentRotation:C.envMapRotation,re===void 0&&(C.addEventListener("dispose",ut),re=new Map,nt.programs=re);let $t=re.get(Ut);if($t!==void 0){if(nt.currentProgram===$t&&nt.lightsStateVersion===Ct)return ci(C,Ot),$t}else Ot.uniforms=at.getUniforms(C),C.onBeforeCompile(Ot,_),$t=at.acquireProgram(Ot,Ut),re.set(Ut,$t),nt.uniforms=Ot.uniforms;const qt=nt.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(qt.clippingPlanes=ct.uniform),ci(C,Ot),nt.needsLights=Xi(C),nt.lightsStateVersion=Ct,nt.needsLights&&(qt.ambientLightColor.value=J.state.ambient,qt.lightProbe.value=J.state.probe,qt.directionalLights.value=J.state.directional,qt.directionalLightShadows.value=J.state.directionalShadow,qt.spotLights.value=J.state.spot,qt.spotLightShadows.value=J.state.spotShadow,qt.rectAreaLights.value=J.state.rectArea,qt.ltc_1.value=J.state.rectAreaLTC1,qt.ltc_2.value=J.state.rectAreaLTC2,qt.pointLights.value=J.state.point,qt.pointLightShadows.value=J.state.pointShadow,qt.hemisphereLights.value=J.state.hemi,qt.directionalShadowMap.value=J.state.directionalShadowMap,qt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,qt.spotShadowMap.value=J.state.spotShadowMap,qt.spotLightMatrix.value=J.state.spotLightMatrix,qt.spotLightMap.value=J.state.spotLightMap,qt.pointShadowMap.value=J.state.pointShadowMap,qt.pointShadowMatrix.value=J.state.pointShadowMatrix),nt.currentProgram=$t,nt.uniformsList=null,$t}function So(C){if(C.uniformsList===null){const K=C.currentProgram.getUniforms();C.uniformsList=Sa.seqWithValue(K.seq,C.uniforms)}return C.uniformsList}function ci(C,K){const et=mt.get(C);et.outputColorSpace=K.outputColorSpace,et.batching=K.batching,et.batchingColor=K.batchingColor,et.instancing=K.instancing,et.instancingColor=K.instancingColor,et.instancingMorph=K.instancingMorph,et.skinning=K.skinning,et.morphTargets=K.morphTargets,et.morphNormals=K.morphNormals,et.morphColors=K.morphColors,et.morphTargetsCount=K.morphTargetsCount,et.numClippingPlanes=K.numClippingPlanes,et.numIntersection=K.numClipIntersection,et.vertexAlphas=K.vertexAlphas,et.vertexTangents=K.vertexTangents,et.toneMapping=K.toneMapping}function Ur(C,K,et,nt,J){K.isScene!==!0&&(K=Nt),Mt.resetTextureUnits();const vt=K.fog,Ct=nt.isMeshStandardMaterial?K.environment:null,Ot=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Ar,Ut=(nt.isMeshStandardMaterial?ze:le).get(nt.envMap||Ct),re=nt.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,$t=!!et.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),qt=!!et.morphAttributes.position,Ee=!!et.morphAttributes.normal,Ne=!!et.morphAttributes.color;let Ze=cs;nt.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Ze=_.toneMapping);const We=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,De=We!==void 0?We.length:0,Kt=mt.get(nt),Ie=p.state.lights;if(ht===!0&&(Y===!0||C!==b)){const Je=C===b&&nt.id===S;ct.setState(nt,C,Je)}let Te=!1;nt.version===Kt.__version?(Kt.needsLights&&Kt.lightsStateVersion!==Ie.state.version||Kt.outputColorSpace!==Ot||J.isBatchedMesh&&Kt.batching===!1||!J.isBatchedMesh&&Kt.batching===!0||J.isBatchedMesh&&Kt.batchingColor===!0&&J.colorTexture===null||J.isBatchedMesh&&Kt.batchingColor===!1&&J.colorTexture!==null||J.isInstancedMesh&&Kt.instancing===!1||!J.isInstancedMesh&&Kt.instancing===!0||J.isSkinnedMesh&&Kt.skinning===!1||!J.isSkinnedMesh&&Kt.skinning===!0||J.isInstancedMesh&&Kt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Kt.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&Kt.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&Kt.instancingMorph===!1&&J.morphTexture!==null||Kt.envMap!==Ut||nt.fog===!0&&Kt.fog!==vt||Kt.numClippingPlanes!==void 0&&(Kt.numClippingPlanes!==ct.numPlanes||Kt.numIntersection!==ct.numIntersection)||Kt.vertexAlphas!==re||Kt.vertexTangents!==$t||Kt.morphTargets!==qt||Kt.morphNormals!==Ee||Kt.morphColors!==Ne||Kt.toneMapping!==Ze||Kt.morphTargetsCount!==De)&&(Te=!0):(Te=!0,Kt.__version=nt.version);let yn=Kt.currentProgram;Te===!0&&(yn=li(nt,K,J));let wi=!1,_n=!1,qi=!1;const Xe=yn.getUniforms(),In=Kt.uniforms;if(It.useProgram(yn.program)&&(wi=!0,_n=!0,qi=!0),nt.id!==S&&(S=nt.id,_n=!0),wi||b!==C){It.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),Xe.setValue(I,"projectionMatrix",C.projectionMatrix),Xe.setValue(I,"viewMatrix",C.matrixWorldInverse);const Qe=Xe.map.cameraPosition;Qe!==void 0&&Qe.setValue(I,_t.setFromMatrixPosition(C.matrixWorld)),Yt.logarithmicDepthBuffer&&Xe.setValue(I,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&Xe.setValue(I,"isOrthographic",C.isOrthographicCamera===!0),b!==C&&(b=C,_n=!0,qi=!0)}if(J.isSkinnedMesh){Xe.setOptional(I,J,"bindMatrix"),Xe.setOptional(I,J,"bindMatrixInverse");const Je=J.skeleton;Je&&(Je.boneTexture===null&&Je.computeBoneTexture(),Xe.setValue(I,"boneTexture",Je.boneTexture,Mt))}J.isBatchedMesh&&(Xe.setOptional(I,J,"batchingTexture"),Xe.setValue(I,"batchingTexture",J._matricesTexture,Mt),Xe.setOptional(I,J,"batchingIdTexture"),Xe.setValue(I,"batchingIdTexture",J._indirectTexture,Mt),Xe.setOptional(I,J,"batchingColorTexture"),J._colorsTexture!==null&&Xe.setValue(I,"batchingColorTexture",J._colorsTexture,Mt));const Tn=et.morphAttributes;if((Tn.position!==void 0||Tn.normal!==void 0||Tn.color!==void 0)&&gt.update(J,et,yn),(_n||Kt.receiveShadow!==J.receiveShadow)&&(Kt.receiveShadow=J.receiveShadow,Xe.setValue(I,"receiveShadow",J.receiveShadow)),nt.isMeshGouraudMaterial&&nt.envMap!==null&&(In.envMap.value=Ut,In.flipEnvMap.value=Ut.isCubeTexture&&Ut.isRenderTargetTexture===!1?-1:1),nt.isMeshStandardMaterial&&nt.envMap===null&&K.environment!==null&&(In.envMapIntensity.value=K.environmentIntensity),_n&&(Xe.setValue(I,"toneMappingExposure",_.toneMappingExposure),Kt.needsLights&&qa(In,qi),vt&&nt.fog===!0&&lt.refreshFogUniforms(In,vt),lt.refreshMaterialUniforms(In,nt,B,N,p.state.transmissionRenderTarget[C.id]),Sa.upload(I,So(Kt),In,Mt)),nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(Sa.upload(I,So(Kt),In,Mt),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&Xe.setValue(I,"center",J.center),Xe.setValue(I,"modelViewMatrix",J.modelViewMatrix),Xe.setValue(I,"normalMatrix",J.normalMatrix),Xe.setValue(I,"modelMatrix",J.matrixWorld),nt.isShaderMaterial||nt.isRawShaderMaterial){const Je=nt.uniformsGroups;for(let Qe=0,Bs=Je.length;Qe<Bs;Qe++){const hi=Je[Qe];ue.update(hi,yn),ue.bind(hi,yn)}}return yn}function qa(C,K){C.ambientLightColor.needsUpdate=K,C.lightProbe.needsUpdate=K,C.directionalLights.needsUpdate=K,C.directionalLightShadows.needsUpdate=K,C.pointLights.needsUpdate=K,C.pointLightShadows.needsUpdate=K,C.spotLights.needsUpdate=K,C.spotLightShadows.needsUpdate=K,C.rectAreaLights.needsUpdate=K,C.hemisphereLights.needsUpdate=K}function Xi(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(C,K,et){const nt=mt.get(C);nt.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,nt.__autoAllocateDepthBuffer===!1&&(nt.__useRenderToTexture=!1),mt.get(C.texture).__webglTexture=K,mt.get(C.depthTexture).__webglTexture=nt.__autoAllocateDepthBuffer?void 0:et,nt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,K){const et=mt.get(C);et.__webglFramebuffer=K,et.__useDefaultFramebuffer=K===void 0};const wo=I.createFramebuffer();this.setRenderTarget=function(C,K=0,et=0){R=C,A=K,E=et;let nt=!0,J=null,vt=!1,Ct=!1;if(C){const Ut=mt.get(C);if(Ut.__useDefaultFramebuffer!==void 0)It.bindFramebuffer(I.FRAMEBUFFER,null),nt=!1;else if(Ut.__webglFramebuffer===void 0)Mt.setupRenderTarget(C);else if(Ut.__hasExternalTextures)Mt.rebindTextures(C,mt.get(C.texture).__webglTexture,mt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const qt=C.depthTexture;if(Ut.__boundDepthTexture!==qt){if(qt!==null&&mt.has(qt)&&(C.width!==qt.image.width||C.height!==qt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Mt.setupDepthRenderbuffer(C)}}const re=C.texture;(re.isData3DTexture||re.isDataArrayTexture||re.isCompressedArrayTexture)&&(Ct=!0);const $t=mt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray($t[K])?J=$t[K][et]:J=$t[K],vt=!0):C.samples>0&&Mt.useMultisampledRTT(C)===!1?J=mt.get(C).__webglMultisampledFramebuffer:Array.isArray($t)?J=$t[et]:J=$t,U.copy(C.viewport),P.copy(C.scissor),G=C.scissorTest}else U.copy(ft).multiplyScalar(B).floor(),P.copy(Vt).multiplyScalar(B).floor(),G=Me;if(et!==0&&(J=wo),It.bindFramebuffer(I.FRAMEBUFFER,J)&&nt&&It.drawBuffers(C,J),It.viewport(U),It.scissor(P),It.setScissorTest(G),vt){const Ut=mt.get(C.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ut.__webglTexture,et)}else if(Ct){const Ut=K;for(let re=0;re<C.textures.length;re++){const $t=mt.get(C.textures[re]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+re,$t.__webglTexture,et,Ut)}}else if(C!==null&&et!==0){const Ut=mt.get(C.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ut.__webglTexture,et)}S=-1},this.readRenderTargetPixels=function(C,K,et,nt,J,vt,Ct,Ot=0){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=mt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ct!==void 0&&(Ut=Ut[Ct]),Ut){It.bindFramebuffer(I.FRAMEBUFFER,Ut);try{const re=C.textures[Ot],$t=re.format,qt=re.type;if(!Yt.textureFormatReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Yt.textureTypeReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}K>=0&&K<=C.width-nt&&et>=0&&et<=C.height-J&&(C.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Ot),I.readPixels(K,et,nt,J,Bt.convert($t),Bt.convert(qt),vt))}finally{const re=R!==null?mt.get(R).__webglFramebuffer:null;It.bindFramebuffer(I.FRAMEBUFFER,re)}}},this.readRenderTargetPixelsAsync=async function(C,K,et,nt,J,vt,Ct,Ot=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ut=mt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Ct!==void 0&&(Ut=Ut[Ct]),Ut)if(K>=0&&K<=C.width-nt&&et>=0&&et<=C.height-J){It.bindFramebuffer(I.FRAMEBUFFER,Ut);const re=C.textures[Ot],$t=re.format,qt=re.type;if(!Yt.textureFormatReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Yt.textureTypeReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ee=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ee),I.bufferData(I.PIXEL_PACK_BUFFER,vt.byteLength,I.STREAM_READ),C.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Ot),I.readPixels(K,et,nt,J,Bt.convert($t),Bt.convert(qt),0);const Ne=R!==null?mt.get(R).__webglFramebuffer:null;It.bindFramebuffer(I.FRAMEBUFFER,Ne);const Ze=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await $p(I,Ze,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ee),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,vt),I.deleteBuffer(Ee),I.deleteSync(Ze),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,K=null,et=0){const nt=Math.pow(2,-et),J=Math.floor(C.image.width*nt),vt=Math.floor(C.image.height*nt),Ct=K!==null?K.x:0,Ot=K!==null?K.y:0;Mt.setTexture2D(C,0),I.copyTexSubImage2D(I.TEXTURE_2D,et,0,0,Ct,Ot,J,vt),It.unbindTexture()};const gs=I.createFramebuffer(),Os=I.createFramebuffer();this.copyTextureToTexture=function(C,K,et=null,nt=null,J=0,vt=null){vt===null&&(J!==0?(fo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),vt=J,J=0):vt=0);let Ct,Ot,Ut,re,$t,qt,Ee,Ne,Ze;const We=C.isCompressedTexture?C.mipmaps[vt]:C.image;if(et!==null)Ct=et.max.x-et.min.x,Ot=et.max.y-et.min.y,Ut=et.isBox3?et.max.z-et.min.z:1,re=et.min.x,$t=et.min.y,qt=et.isBox3?et.min.z:0;else{const Tn=Math.pow(2,-J);Ct=Math.floor(We.width*Tn),Ot=Math.floor(We.height*Tn),C.isDataArrayTexture?Ut=We.depth:C.isData3DTexture?Ut=Math.floor(We.depth*Tn):Ut=1,re=0,$t=0,qt=0}nt!==null?(Ee=nt.x,Ne=nt.y,Ze=nt.z):(Ee=0,Ne=0,Ze=0);const De=Bt.convert(K.format),Kt=Bt.convert(K.type);let Ie;K.isData3DTexture?(Mt.setTexture3D(K,0),Ie=I.TEXTURE_3D):K.isDataArrayTexture||K.isCompressedArrayTexture?(Mt.setTexture2DArray(K,0),Ie=I.TEXTURE_2D_ARRAY):(Mt.setTexture2D(K,0),Ie=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,K.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,K.unpackAlignment);const Te=I.getParameter(I.UNPACK_ROW_LENGTH),yn=I.getParameter(I.UNPACK_IMAGE_HEIGHT),wi=I.getParameter(I.UNPACK_SKIP_PIXELS),_n=I.getParameter(I.UNPACK_SKIP_ROWS),qi=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,We.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,We.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,re),I.pixelStorei(I.UNPACK_SKIP_ROWS,$t),I.pixelStorei(I.UNPACK_SKIP_IMAGES,qt);const Xe=C.isDataArrayTexture||C.isData3DTexture,In=K.isDataArrayTexture||K.isData3DTexture;if(C.isDepthTexture){const Tn=mt.get(C),Je=mt.get(K),Qe=mt.get(Tn.__renderTarget),Bs=mt.get(Je.__renderTarget);It.bindFramebuffer(I.READ_FRAMEBUFFER,Qe.__webglFramebuffer),It.bindFramebuffer(I.DRAW_FRAMEBUFFER,Bs.__webglFramebuffer);for(let hi=0;hi<Ut;hi++)Xe&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,mt.get(C).__webglTexture,J,qt+hi),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,mt.get(K).__webglTexture,vt,Ze+hi)),I.blitFramebuffer(re,$t,Ct,Ot,Ee,Ne,Ct,Ot,I.DEPTH_BUFFER_BIT,I.NEAREST);It.bindFramebuffer(I.READ_FRAMEBUFFER,null),It.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(J!==0||C.isRenderTargetTexture||mt.has(C)){const Tn=mt.get(C),Je=mt.get(K);It.bindFramebuffer(I.READ_FRAMEBUFFER,gs),It.bindFramebuffer(I.DRAW_FRAMEBUFFER,Os);for(let Qe=0;Qe<Ut;Qe++)Xe?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Tn.__webglTexture,J,qt+Qe):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Tn.__webglTexture,J),In?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Je.__webglTexture,vt,Ze+Qe):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Je.__webglTexture,vt),J!==0?I.blitFramebuffer(re,$t,Ct,Ot,Ee,Ne,Ct,Ot,I.COLOR_BUFFER_BIT,I.NEAREST):In?I.copyTexSubImage3D(Ie,vt,Ee,Ne,Ze+Qe,re,$t,Ct,Ot):I.copyTexSubImage2D(Ie,vt,Ee,Ne,re,$t,Ct,Ot);It.bindFramebuffer(I.READ_FRAMEBUFFER,null),It.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else In?C.isDataTexture||C.isData3DTexture?I.texSubImage3D(Ie,vt,Ee,Ne,Ze,Ct,Ot,Ut,De,Kt,We.data):K.isCompressedArrayTexture?I.compressedTexSubImage3D(Ie,vt,Ee,Ne,Ze,Ct,Ot,Ut,De,We.data):I.texSubImage3D(Ie,vt,Ee,Ne,Ze,Ct,Ot,Ut,De,Kt,We):C.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,vt,Ee,Ne,Ct,Ot,De,Kt,We.data):C.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,vt,Ee,Ne,We.width,We.height,De,We.data):I.texSubImage2D(I.TEXTURE_2D,vt,Ee,Ne,Ct,Ot,De,Kt,We);I.pixelStorei(I.UNPACK_ROW_LENGTH,Te),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,yn),I.pixelStorei(I.UNPACK_SKIP_PIXELS,wi),I.pixelStorei(I.UNPACK_SKIP_ROWS,_n),I.pixelStorei(I.UNPACK_SKIP_IMAGES,qi),vt===0&&K.generateMipmaps&&I.generateMipmap(Ie),It.unbindTexture()},this.initRenderTarget=function(C){mt.get(C).__webglFramebuffer===void 0&&Mt.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?Mt.setTextureCube(C,0):C.isData3DTexture?Mt.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?Mt.setTexture2DArray(C,0):Mt.setTexture2D(C,0),It.unbindTexture()},this.resetState=function(){A=0,E=0,R=null,It.reset(),St.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ke._getDrawingBufferColorSpace(t),e.unpackColorSpace=ke._getUnpackColorSpace()}}class Uy extends Jt{constructor(t,e={}){super(t),this.isWater=!0;const n=this,s=e.textureWidth!==void 0?e.textureWidth:512,r=e.textureHeight!==void 0?e.textureHeight:512,o=e.clipBias!==void 0?e.clipBias:0,a=e.alpha!==void 0?e.alpha:1,l=e.time!==void 0?e.time:0,c=e.waterNormals!==void 0?e.waterNormals:null,h=e.sunDirection!==void 0?e.sunDirection:new L(.70707,.70707,0),u=new ee(e.sunColor!==void 0?e.sunColor:16777215),d=new ee(e.waterColor!==void 0?e.waterColor:8355711),f=e.eye!==void 0?e.eye:new L(0,0,0),m=e.distortionScale!==void 0?e.distortionScale:20,g=e.side!==void 0?e.side:Hi,x=e.fog!==void 0?e.fog:!1,p=new pi,v=new L,y=new L,_=new L,T=new he,A=new L(0,0,-1),E=new Le,R=new L,S=new L,b=new Le,U=new he,P=new kn,G=new us(s,r),Z={name:"MirrorShader",uniforms:Ra.merge([Pt.fog,Pt.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new he},sunColor:{value:new ee(8355711)},sunDirection:{value:new L(.70707,.70707,0)},eye:{value:new L},waterColor:{value:new ee(5592405)}}]),vertexShader:`
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
				}`},H=new Zn({name:Z.name,uniforms:Ra.clone(Z.uniforms),vertexShader:Z.vertexShader,fragmentShader:Z.fragmentShader,lights:!0,side:g,fog:x});H.uniforms.mirrorSampler.value=G.texture,H.uniforms.textureMatrix.value=U,H.uniforms.alpha.value=a,H.uniforms.time.value=l,H.uniforms.normalSampler.value=c,H.uniforms.sunColor.value=u,H.uniforms.waterColor.value=d,H.uniforms.sunDirection.value=h,H.uniforms.distortionScale.value=m,H.uniforms.eye.value=f,n.material=H,n.onBeforeRender=function(V,N,B){if(y.setFromMatrixPosition(n.matrixWorld),_.setFromMatrixPosition(B.matrixWorld),T.extractRotation(n.matrixWorld),v.set(0,0,1),v.applyMatrix4(T),R.subVectors(y,_),R.dot(v)>0)return;R.reflect(v).negate(),R.add(y),T.extractRotation(B.matrixWorld),A.set(0,0,-1),A.applyMatrix4(T),A.add(_),S.subVectors(y,A),S.reflect(v).negate(),S.add(y),P.position.copy(R),P.up.set(0,1,0),P.up.applyMatrix4(T),P.up.reflect(v),P.lookAt(S),P.far=B.far,P.updateMatrixWorld(),P.projectionMatrix.copy(B.projectionMatrix),U.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),U.multiply(P.projectionMatrix),U.multiply(P.matrixWorldInverse),p.setFromNormalAndCoplanarPoint(v,y),p.applyMatrix4(P.matrixWorldInverse),E.set(p.normal.x,p.normal.y,p.normal.z,p.constant);const Q=P.projectionMatrix;b.x=(Math.sign(E.x)+Q.elements[8])/Q.elements[0],b.y=(Math.sign(E.y)+Q.elements[9])/Q.elements[5],b.z=-1,b.w=(1+Q.elements[10])/Q.elements[14],E.multiplyScalar(2/E.dot(b)),Q.elements[2]=E.x,Q.elements[6]=E.y,Q.elements[10]=E.z+1-o,Q.elements[14]=E.w,f.setFromMatrixPosition(B.matrixWorld);const X=V.getRenderTarget(),ft=V.xr.enabled,Vt=V.shadowMap.autoUpdate;n.visible=!1,V.xr.enabled=!1,V.shadowMap.autoUpdate=!1,V.setRenderTarget(G),V.state.buffers.depth.setMask(!0),V.autoClear===!1&&V.clear(),V.render(N,P),n.visible=!0,V.xr.enabled=ft,V.shadowMap.autoUpdate=Vt,V.setRenderTarget(X);const Me=B.viewport;Me!==void 0&&V.state.viewport(Me)}}}function ki(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new Se;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const u=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=i[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=sd(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let g=0;g<o[h].length;++g)f.push(o[h][g][d]);const m=sd(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function sd(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new un(o,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let d=0,f=h.count;d<f;d++)for(let m=0;m<e;m++){const g=h.getComponent(d,m);a.setComponent(d+u,m,g)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const ge=1.8,ky=2,Ny=110*ge,Fy=108*ge,ie=3,mr=ie/2.15,Cs=12.3*mr,ws=Cs+6,Oy=Cs+8,sa=17,By=mr,$n=i=>Object.freeze(Object.fromEntries(Object.entries(i).map(([t,e])=>[t,t==="yaw"?e:e*By])));Object.freeze({store:$n({width:4.4,depth:3.6}),nursery:$n({width:5.8,depth:5.9}),watchtower:$n({width:4.8,depth:4}),training:$n({width:5.7,depth:4.8}),palisade:$n({width:7,depth:1})});$n({x:-1.1825,z:-1.0664,yaw:0,width:7.68,depth:8.25});const Hy=$n({x:-6.45,z:.43,yaw:-.5,width:4.8,depth:5.2});Object.freeze({store:$n({x:-6.0962,z:4.9054,yaw:0}),nursery:$n({x:6.5601,z:-3.869,yaw:0}),watchtower:$n({x:6.6295,z:5.3482,yaw:0}),training:$n({x:-6.2831,z:-6.0974,yaw:0}),palisade:$n({x:0,z:9.8,yaw:0})});const Gy=Cs-.15,Vy=6.8,za=3.8,Wy=.9,rd=(i,t)=>Number.isFinite(i)?i:t,Xy=i=>i?.natural===!0||i?.mesh?.userData?.natural===!0,qy=Array.from({length:5},(i,t)=>Object.freeze({stage:t,unfinished:t<4,wallHeight:t===0?0:t===1?za*.35:za,keep:t>=3,gate:t===4})),$y=Object.freeze({stage:4,unfinished:!1,wallHeight:0,keep:!1,gate:!1});function od(i){if(Xy(i))return $y;const t=i.mesh?.userData?.visualState,e=i.underConstruction??t?.underConstruction??!1,n=e?Math.max(0,Math.min(1,rd(i.constructionProgress,rd(t?.constructionProgress,0)))):1,s=e?Math.min(3,Math.floor(n*4)):4;return qy[s]}const Ts=(i,t=0)=>Number.isFinite(i)?i:t,Da=(i,t,e)=>Math.max(t,Math.min(e,i)),gr=1e-6,Yy=i=>i&&i.active!==!1;function Zy(i,t){const e=Math.cos(i.yaw||0),n=Math.sin(i.yaw||0),s=t.x-i.x,r=t.z-i.z;return{x:e*s-n*r,y:t.y,z:n*s+e*r}}function ra(i,t){const e=Math.cos(i.yaw||0),n=Math.sin(i.yaw||0);return{x:i.x+e*t.x+n*t.z,y:Ts(t.y,i.floorY),z:i.z-n*t.x+e*t.z}}const nf=(i,t,e=0)=>i.x>t.minX+e-gr&&i.x<t.maxX-e+gr&&i.z>t.minZ+e-gr&&i.z<t.maxZ-e+gr,zi=(i,t,e,n,s,r,o)=>({id:i,minX:t,maxX:e,minZ:n,maxZ:s,minY:r,maxY:o});function ad(i,t,e=0){return t.outline?t.outline.every((s,r)=>{const o=t.outline[(r+1)%t.outline.length],a=o.x-s.x,l=o.z-s.z;return a*(i.z-s.z)-l*(i.x-s.x)>=Math.max(0,e)*Math.hypot(a,l)-gr})||e<0&&t.outline.some((s,r)=>jy(i,s,t.outline[(r+1)%t.outline.length])<e*e-gr):nf(i,t,e)}function jy(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=Da(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1),0,1);return(i.x-t.x-n*r)**2+(i.z-t.z-s*r)**2}function Ky(i,t){return i.outline=t.map(([e,n])=>({x:e,z:n})),i.minX=Math.min(...t.map(e=>e[0])),i.maxX=Math.max(...t.map(e=>e[0])),i.minZ=Math.min(...t.map(e=>e[1])),i.maxZ=Math.max(...t.map(e=>e[1])),i}function Jy(i,{terrainHeight:t,minimumFloorY:e=.82}={}){const n=t||(()=>0),s={id:i.id,x:Ts(i.x),z:Ts(i.z),yaw:Ts(i.yaw,Math.atan2(-i.x,-i.z)),team:i.team||"neutral",active:!0};let r=-1/0,o=1/0;for(let m=-3.75;m<=3.76;m+=1.25)for(let g=-3.25;g<=4.26;g+=1.25){const x=ra(s,{x:m,z:g,y:0}),p=Ts(n(x.x,x.z));r=Math.max(r,p),o=Math.min(o,p)}s.floorY=Math.max(e,r+.045),s.floorBottom=Math.min(o-.16,s.floorY-.22),s.roofBottom=s.floorY+2.25,s.roofTop=s.floorY+3.05,s.interior={minX:-3.1,maxX:3.1,minZ:-2.6,maxZ:.45},s.floor={minX:-3.75,maxX:3.75,minZ:-3.25,maxZ:4.1},s.entrance={x:1.55,z:4,minX:.3,maxX:2.8,minZ:3.35,maxZ:4,width:2.5,height:1.95},s.solids=[zi("floor",-3.75,3.75,-3.25,4.1,s.floorBottom,s.floorY),zi("left-wall",-3.75,-3.1,-3.25,4,s.floorY,s.roofBottom),zi("right-wall",3.1,3.75,-3.25,4,s.floorY,s.roofBottom),zi("back-wall",-3.75,3.75,-3.25,-2.6,s.floorY,s.roofBottom),zi("front-left",-3.75,.3,3.35,4,s.floorY,s.roofBottom),zi("front-right",2.8,3.75,3.35,4,s.floorY,s.roofBottom),zi("entrance-lintel",.3,2.8,3.35,4,s.floorY+1.95,s.roofBottom),zi("root-baffle",-.35,3.1,.45,1.05,s.floorY,s.roofBottom),zi("roof",-3.75,3.75,-3.25,4,s.roofBottom,s.roofTop)];const l={floor:[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.2],[-3.15,4.2],[-4.12,3.4]],roof:[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.22],[-3.15,4.45],[-4.12,3.4]],"left-wall":[[-3.1,-3.35],[-3.1,4.3],[-3.95,3.4],[-4.05,-2.2]],"right-wall":[[3.1,-3.35],[3.95,-2.3],[3.85,3.4],[3.1,4.2]],"back-wall":[[-3.25,-2.6],[-3.5,-3.3],[2.9,-3.5],[3.3,-2.6]],"front-left":[[-3.3,3.35],[.3,3.35],[.3,4.13],[-3.15,4.3]],"front-right":[[2.8,3.35],[3.3,3.35],[3.45,4],[2.8,4]],"root-baffle":[[-.35,.45],[3.1,.45],[3.1,1.05],[-.3,.98]]};for(const m of s.solids)Ky(m,l[m.id]||[[m.minX,m.minZ],[m.maxX,m.minZ],[m.maxX,m.maxZ],[m.minX,m.maxZ]]);s.floor={...s.solids[0]},s.shellBounds={minX:Math.min(...s.solids.map(m=>m.minX)),maxX:Math.max(...s.solids.map(m=>m.maxX)),minZ:Math.min(...s.solids.map(m=>m.minZ)),maxZ:Math.max(...s.solids.map(m=>m.maxZ))};let c=4.5;const h=4.2;for(let m=0;m<3;m++){const g=ra(s,{x:s.entrance.x,z:h+c,y:0});c=Da(Math.abs(s.floorY-n(g.x,g.z))/.32,4.5,14)}const u=Math.max(10,Math.ceil(c/.45)),d=6,f={minX:s.entrance.x-1.6,maxX:s.entrance.x+1.6,minZ:h,maxZ:h+c,rows:u,cols:d,heights:[],bottoms:[]};for(let m=0;m<=u;m++)for(let g=0;g<=d;g++){const x=m/u,p=f.minX+(f.maxX-f.minX)*g/d,v=f.minZ+c*x,y=ra(s,{x:p,z:v,y:0}),_=ra(s,{x:p,z:f.maxZ,y:0}),T=Ts(n(y.x,y.z)),A=s.floorY+(Ts(n(_.x,_.z))-s.floorY)*x;f.heights.push(m===0?s.floorY:Math.max(T+(m===u?.005:.02),A)),f.bottoms.push(Math.min(T-.14,A-.18))}return s.ramp=f,s.radius=Math.max(6,Math.hypot(f.maxX,f.maxZ)),s}function Qy(i,t){const e=i.ramp;if(!e||!nf(t,e))return null;const n=Da((t.x-e.minX)/(e.maxX-e.minX)*e.cols,0,e.cols),s=Da((t.z-e.minZ)/(e.maxZ-e.minZ)*e.rows,0,e.rows),r=Math.min(e.cols-1,Math.floor(n)),o=Math.min(e.rows-1,Math.floor(s)),a=n-r,l=s-o,c=(m,g)=>e.heights[g*(e.cols+1)+m],h=c(r,o),u=c(r+1,o),d=c(r,o+1),f=c(r+1,o+1);return a+l<=1?h+(u-h)*a+(d-h)*l:f+(d-f)*(1-a)+(u-f)*(1-l)}function t1(i,t,e,{y:n}={}){let s=null;for(const r of i||[]){if(!Yy(r)||Math.hypot(t-r.x,e-r.z)>r.radius+1)continue;const o=Zy(r,{x:t,z:e}),a=r.solids.find(u=>u.id==="roof");let l=null,c="floor";ad(o,r.floor)&&(l=r.floorY);const h=Qy(r,o);h!==null&&(l===null||h>l)&&(l=h,c="ramp"),Number.isFinite(n)&&n>=r.roofTop-.06&&ad(o,a)&&(l=r.roofTop,c="roof"),l!==null&&(!s||l>s.height)&&(s={height:l,type:c==="roof"?"rock":"land",platform:r,refuge:r,surface:c})}return s}const bh=(i,t,e)=>Math.max(t,Math.min(e,i)),si=(i,t,e)=>{const n=bh((e-i)/(t-i),0,1);return n*n*(3-2*n)},Qi=-.035;function e1(i,t){if(!Number.isFinite(i)||!Number.isFinite(t))return .91;const e=Math.max(0,t-.215-i);return .91-.63*si(.1,.6,e)}const n1=Object.freeze({pond:{id:"pond",x:0,z:0,radius:8,label:"Λιμνούλα των νούφαρων",description:"Μύγες, ανθισμένα φύλλα και χαμηλές διαδρομές πάνω από το νερό.",hint:"Παρατήρησε πού μαζεύονται οι μύγες.",findPoint:{x:6.5,z:3}},creek:{id:"creek",x:8,z:-24,radius:7,label:"Το στενό ρυάκι",description:"Το ρεύμα αλλάζει τις διαδρομές και μεταφέρει την τροφή.",hint:"Ακολούθησε την κίνηση του νερού.",findPoint:{x:4,z:-29}},bank:{id:"bank",x:27,z:8,radius:7,label:"Η όχθη με τα βότσαλα",description:"Ψηλά βράχια, κρυψώνες και εκτεθειμένα περάσματα.",hint:"Οι καλαμιές κρύβουν μια δεύτερη προσέγγιση.",findPoint:{x:30,z:6}},roots:{id:"roots",x:24,z:-16,radius:5,label:"Το πέρασμα στις ρίζες",description:"Ένα φυσικό άνοιγμα που αποκαλύπτεται όταν χαμηλώνει το νερό.",hint:"Μικρά έντομα χάνονται κάτω από τις καμπύλες ρίζες.",findPoint:{x:31,z:-16}}});function i1(i){const t=e=>({...e,...i.toWorld(e.x,e.z)});return{landmarks:Object.values(n1).map(e=>({...t(e),findPoint:t(e.findPoint)})),nest:t({id:"creek-nest",x:17,z:16,radius:4,label:"Κοιλότητα κάτω από τις ρίζες"}),refuges:[{id:"willow-crevice",x:-20,z:7,label:"Κρυψώνα της πεσμένης ιτιάς"},{id:"bank-crevice",x:34,z:-9,label:"Κοιλότητα της πετρώδους όχθης"}].map(e=>({...t(e),yaw:Math.atan2(-e.x,-e.z)+i.yaw})),cover:[{id:"nest-reeds",x:14,z:20,radius:3.1},{id:"root-reeds",x:18,z:-7,radius:3},{id:"bank-reeds",x:29,z:11,radius:3.3},{id:"creek-reeds",x:18,z:-22,radius:3}].map(t)}}function sf(i){return 6+Math.sin(i*.035)*9}function s1(i,t,e=0,n=[]){const s=Math.abs(i-sf(t));let r=-1.9+si(6,17,s)*3.5+e*.22;r+=si(20,55,s)*(.4+Math.sin(t*.04+.6)**2*1.2);const o=1-si(11,20,Math.hypot(i*.95,t*.8));r=r*(1-o)+(-2.65+e*.2)*o;for(const l of n){const c=Math.hypot(i-l.x,t-l.z),u=l.radius*(1+.045*Math.sin(Math.atan2(t-l.z,i-l.x)*5+(l.shorePhase||0))),d=1-si(u*.46,u+5,c);d>0&&(r=Math.max(r,r*(1-d)+l.elevation*d))}const a=(1-si(1.9,4.7,Math.abs(t+16)))*si(9,14,i)*(1-si(31,36,i));return r=r*(1-a)+Math.min(r,-.18+e*.025)*a,r+=si(190,235,Math.max(Math.abs(i),Math.abs(t)))*4,r}function r1(i,t,e,n=.45){const s=i.toSource(t,e),r=Math.abs(s.x-sf(s.z)),o=bh(Number(n)||0,0,1.5)*(1-si(5,17,r))*(.55+.45*si(5,23,Math.abs(s.z)));if(o<=0)return{x:0,z:0,strength:0};const a=.315*Math.cos(s.z*.035),l=Math.hypot(a,1),c=i.toWorld(0,0),h=i.toWorld(a/l,1/l);return{x:(h.x-c.x)*o,z:(h.z-c.z)*o,strength:o}}function o1({group:i,layout:t,terrainHeight:e,surface:n,insertPlatform:s,materials:r,rockGeos:o,tube:a,leafGeometry:l,bladeGeometry:c,geography:h}){const u=new te;u.name="Natural creek discoveries",i.add(u);const d=[],f=new qe,m=new Map,g=new jn(1,11,7),x=new Ve({color:"#e0c58b",roughness:.68}),p=new Ve({color:"#698d9d",roughness:.65}),v=l(.55,.38,.11),y=r.leaf.clone();y.color.set("#adc68a");const _=(H,V,N)=>{const B=t.toWorld(H,V);return[B.x,N,B.z]},T=h.landmarks.find(H=>H.id==="roots"),A=e(T.x,T.z);for(const H of[-.48,.45]){const V=a([[0,-.1,-4.1],[-.3,2.3,-2.6],[.2,3.7,0],[.35,2.5,2.7],[0,-.1,4.2]].map(N=>_(24+N[0]+H,-16+N[2],A+N[1])),.48,r.bark,24,.14);V.name="Passable willow root arch",V.castShadow=!0,V.receiveShadow=!0,u.add(V)}for(const H of[-1,1])for(let V=0;V<4;V++){const N=-16+H*(3.4+V*.45),B=24+(V-1.5)*1.1,Q=t.toWorld(B,N),X=t.toWorld(B-4.5,N+H*1.5),ft=a([[Q.x,e(Q.x,Q.z)+.8,Q.z],[(Q.x+X.x)/2,e(X.x,X.z)+.45,(Q.z+X.z)/2],[X.x,e(X.x,X.z)-.05,X.z]],.1+V*.025,r.bark,12,.75);ft.castShadow=!0,u.add(ft)}const E=[{id:"creek-stone",x:4,z:-29,r:1.8,height:3.5},{id:"root-approach",x:18,z:-7,r:1.65,height:1.65},{id:"root-perch",x:24,z:-11,r:1.7,height:2},{id:"bank-perch",x:30,z:6,r:2,height:2.05},{id:"nest-perch",x:19,z:20,r:1.8,height:1.7},{id:"pond-perch",x:-5,z:8,r:1.7,height:3.5}],R=new Ve({color:"#c4d9ad",roughness:.82});for(const[H,V]of E.entries()){const N=t.toWorld(V.x,V.z),B=e(N.x,N.z),Q=V.height,X=new Jt(o[H%o.length],r.mossRock);X.name="Moss-covered grip outcrop",X.position.set(N.x,B,N.z),X.scale.set(V.r,Q,V.r),X.rotation.y=H*1.93,X.castShadow=!0,X.receiveShadow=!0,u.add(X);const ft=s({id:V.id,type:"rock",...N,y:B+Q*.76,radius:V.r*.72,visualRadius:V.r,scaleY:Q}),Vt=new Jt(g,R);Vt.name="Pale natural grip",Vt.position.set(N.x,ft.y+.045,N.z),Vt.scale.set(.22,.07,.22),u.add(Vt),d.push({id:V.id,...N,y:ft.y+.13,radius:ft.radius})}const S=c(123),b=new wn(S,r.plant,h.cover.length*84);b.name="Dense camouflage reed pockets";let U=0;for(const[H,V]of h.cover.entries())for(let N=0;N<84;N++){const B=N*2.399+H*.7,Q=Math.sqrt((N+.4)/84)*V.radius,X=V.x+Math.cos(B)*Q,ft=V.z+Math.sin(B)*Q;f.position.set(X,e(X,ft),ft),f.rotation.set(0,B,0),f.scale.set(1.2,1.65+N%5*.18,1.2),f.updateMatrix(),b.setMatrixAt(U++,f.matrix)}b.receiveShadow=!0,b.computeBoundingSphere(),u.add(b);function P(H,V,N){const B=new te;B.name=N?"Lost food and natural keepsakes":"Natural discovery";const Q=new Jt(v,y);Q.rotation.y=m.size*2.4%6.28,Q.receiveShadow=!0,B.add(Q);for(let X=0;X<(N?3:1);X++){const ft=new Jt(g,V.kind==="keepsake"||V.keepsakesCount?x:p);ft.position.set((X-1)*.15,.15+X%2*.035,.015),ft.scale.set(.22,.15,.18),ft.rotation.set(.2,X*.9,.1),ft.castShadow=!0,B.add(ft)}return B.userData.creekPoint={...V},u.add(B),m.set(H,B),B}function G(H,V){const N=new Set;for(const[B,Q]of[[!1,H.finds||[]],[!0,H.dropped||[]]])for(const X of Q){if(!Number.isFinite(X.x)||!Number.isFinite(X.z)||X.collected||X.visible===!1)continue;const ft=(B?"drop:":"find:")+X.id;N.add(ft);const Vt=m.get(ft)||P(ft,X,B);Vt.userData.creekPoint={...X},Vt.visible=!0,Vt.position.set(X.x,Math.max(n(X.x,X.z).height,V)+.07,X.z),Vt.updateMatrix()}for(const[B,Q]of m)N.has(B)||(Q.removeFromParent(),m.delete(B))}function Z(H,V){for(const N of m.values()){const B=N.userData.creekPoint,Q=n(B.x,B.z),X=Q.type==="water";N.position.y=Math.max(Q.height,H)+.07+(X?Math.sin(V*1.5+B.x)*.025:0),N.rotation.z=X?Math.sin(V*.8+B.z)*.045:0,N.updateMatrix()}}return{group:u,grips:d,sync:G,update:Z,resources:[g,x,p,v,y,R,S]}}function a1(i){const t=i.outline||[{x:i.minX,z:i.minZ},{x:i.maxX,z:i.minZ},{x:i.maxX,z:i.maxZ},{x:i.minX,z:i.maxZ}],e=t.length,n=[],s=[];for(const h of[i.minY,i.maxY])for(const u of t)n.push(u.x,h,u.z);for(let h=1;h<e-1;h++)s.push(0,h,h+1,e,e+h+1,e+h);for(let h=0;h<e;h++){const u=(h+1)%e;s.push(h,e+h,u,u,e+h,e+u)}const r=new Se;r.setAttribute("position",new Gt(n,3)),r.setIndex(s);const o=r.toNonIndexed();r.dispose(),o.computeVertexNormals();const a=o.attributes.position,l=o.attributes.normal,c=[];for(let h=0;h<a.count;h++){const u=Math.abs(l.getY(h))>.5;c.push((u?a.getX(h):Math.abs(l.getX(h))>.5?a.getZ(h):a.getX(h))*.35,(u?a.getZ(h):a.getY(h))*.35)}return o.setAttribute("uv",new Gt(c,2)),o}function l1(i,{terrainHeight:t,materials:e,rockGeos:n,tube:s,leafGeometry:r,mergeStaticParts:o,teamColor:a}){const l=Jy(i,{terrainHeight:t}),c=new te;c.name="Natural refuge "+(i.id||""),c.position.set(i.x,l.floorY,i.z),c.rotation.y=l.yaw;const h=[],u=e.leaf.clone(),d=e.rock.clone();d.color.set("#71816a"),h.push(u,d);const f=new te;f.name="Opaque rock and root cavity",c.add(f);const m=new te;m.name="Overhanging refuge slab",f.add(m);for(const E of l.solids){const R=a1(E),S=E.id==="root-baffle"?e.bark:E.id==="floor"?d:e.mossRock,b=new Jt(R,S);b.name="Refuge solid · "+E.id,b.userData.refugeSolid=E,b.position.y=-l.floorY,b.castShadow=!0,b.receiveShadow=!0,h.push(R),(E.id==="roof"?m:f).add(b)}const g=l.ramp,x=[],p=[];for(let E=0;E<=g.rows;E++)for(let R=0;R<=g.cols;R++){const S=E*(g.cols+1)+R;x.push(g.minX+(g.maxX-g.minX)*R/g.cols,g.heights[S]-l.floorY,g.minZ+(g.maxZ-g.minZ)*E/g.rows)}for(let E=0;E<g.rows;E++)for(let R=0;R<g.cols;R++){const S=E*(g.cols+1)+R,b=S+1,U=S+g.cols+1,P=U+1;p.push(S,U,b,b,U,P)}const v=[];for(let E=0;E<=g.cols;E++)v.push(E);for(let E=1;E<=g.rows;E++)v.push(E*(g.cols+1)+g.cols);for(let E=g.cols-1;E>=0;E--)v.push(g.rows*(g.cols+1)+E);for(let E=g.rows-1;E>0;E--)v.push(E*(g.cols+1));for(let E=0;E<v.length;E++){const R=v[E],S=v[(E+1)%v.length],b=x.length/3,U=b+1;x.push(x[R*3],g.bottoms[R]-l.floorY,x[R*3+2],x[S*3],g.bottoms[S]-l.floorY,x[S*3+2]),p.push(R,S,b,S,U,b)}const y=new Se;y.setAttribute("position",new Gt(x,3)),y.setAttribute("uv",new Gt(Array.from({length:x.length/3},(E,R)=>[x[R*3]*.35,x[R*3+2]*.35]).flat(),2)),y.setIndex(p),y.computeVertexNormals(),h.push(y);const _=new Jt(y,e.mossRock);_.name="Terrain-joined natural refuge ledge",_.castShadow=!0,_.receiveShadow=!0,f.add(_);for(const E of[-1,1])for(let R=0;R<3;R++){const S=E*(3.6-R*.12),b=-2.4+R*2.3,U=s([[S,l.floorBottom-l.floorY,b+.55],[S+E*.08,.55,b+.35],[S-E*.12,1.8,b],[S-E*.45,2.6,b-.2]],.16+R*.045,e.bark,15,.48);U.castShadow=!0,h.push(U.geometry),f.add(U)}for(let E=0;E<5;E++){const R=-2.3+E*1.3,S=s([[-3.5,3.03,R],[-1.6,3.12,R-.2],[.5,3.1,R+.1],[3.4,3.04,R+.35]],.075+E%2*.045,e.bark,18,.35);S.castShadow=!0,h.push(S.geometry),m.add(S)}const T=[];for(let E=0;E<4;E++){const R=new te;R.name="Natural life "+E,T.push(R),m.add(R);for(let S=0;S<8+E*3;S++){const b=S*2.399+E*.7,U=Math.cos(b)*(2.1+S%3*.48),P=.35+Math.sin(b)*(2.1+S%4*.2),G=new Jt(r(.65+S%3*.15,.85,.12),u);h.push(G.geometry),G.position.set(U,3.07+S%3*.025,P),G.rotation.set((S%3-1)*.08,b,(S%2-.5)*.1),G.castShadow=!0,G.receiveShadow=!0,R.add(G)}o(R,h)}const A=new te;A.name="Dry leaves inside the root hollow",f.add(A);for(let E=0;E<8;E++){const R=new Jt(r(.3,.48,.045),u);h.push(R.geometry),R.position.set(Math.sin(E*2.4)*2,.025,-1.1+Math.cos(E*2.4)*.7),R.rotation.y=E*1.7,R.receiveShadow=!0,A.add(R)}return o(A,h),l.mesh=c,c.userData={id:i.id,natural:!0,radius:l.radius,owned:h,growth:T,leafMaterial:u,terrain:null,keepCollision:{rects:[]},trainingPoint:c.position.clone(),support:{x:i.x,z:i.z,y:l.floorY,type:"land",radius:0},team:i.team,refuge:l,refugeSolids:f,refugeRoof:m},rf(c,i,a),c}function rf(i,t={},e){const n=i.userData.visualState||{},s={...n,...t},r=bh(Math.floor(Number(s.nestLevel??s.level??s.tier??1)||0),0,3);return i.userData.visualState={team:s.team??"neutral",tier:s.tier??1,nestLevel:r,safe:s.safe!==!1,hp:s.hp,maxHp:s.maxHp,destroyed:!!s.destroyed},i.userData.team=i.userData.visualState.team,i.userData.level=r,i.userData.destroyed=!!s.destroyed,i.userData.refuge&&(i.userData.refuge.team=i.userData.team),i.userData.leafMaterial.color.set(e(i.userData.team)).lerp(new ee("#72964b"),.7),i.userData.growth.forEach((o,a)=>{o.visible=a<=r}),i.userData.collisionRevision=(i.userData.collisionRevision||0)+1,i}function c1(i,t,{bucketSize:e=6}={}){let n=0,s=-1/0,r=0;for(let c=0;c<t.length;c+=3)n=Math.max(n,Math.hypot(t[c],t[c+2])),s=Math.max(s,t[c+1]),r=Math.max(r,Math.abs(t[c+1]));const o=new Map,a=Number.isFinite(e)&&e>0?e:6,l=Math.sin(.04);for(const c of i){const h=n*c.visualRadius*1.07+r*l+.01,u={lily:c,radiusSquared:h*h,heightOffset:s+n*c.visualRadius*1.07*l+.018+.01};for(let d=Math.floor((c.x-h)/a);d<=Math.floor((c.x+h)/a);d++)for(let f=Math.floor((c.z-h)/a);f<=Math.floor((c.z+h)/a);f++){const m=d+":"+f;o.has(m)||o.set(m,[]),o.get(m).push(u)}}return(c,h)=>{let u=-1/0;const d=o.get(Math.floor(c/a)+":"+Math.floor(h/a))||[];for(const{lily:f,radiusSquared:m,heightOffset:g}of d){const x=c-f.x,p=h-f.z;x*x+p*p<=m&&(u=Math.max(u,f.y+g))}return u}}const Ue=Math.PI*2,ns=Gc.clamp,ni=(i,t,e)=>(e=ns((e-i)/(t-i),0,1),e*e*(3-2*e));function Bi(i){return()=>{i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const oa=(i,t)=>Math.sin(i*.213+Math.sin(t*.137)*1.9)*.48+Math.sin(t*.329-i*.079)*.27+Math.cos(i*.741+t*.533)*.13,hn=i=>new ee(i),pt=new qe;new L(0,1,0);const ld=[{sky:"#8aaab0",fog:"#819e91",earth:"#8b8a62",wet:"#43533b",deep:"#52634e",leaf:"#b5d28f",rock:"#a4a292",moss:"#89976c",bark:"#65513a",reed:"#b4a676",water:"#2c6258",nightWater:"#0c2b32"},{sky:"#91acbd",fog:"#8bada6",earth:"#82958a",wet:"#3c6257",deep:"#456b68",leaf:"#a0c9ad",rock:"#a7b5ae",moss:"#7f9b88",bark:"#605848",reed:"#aebca0",water:"#3b747b",nightWater:"#122c3b"},{sky:"#b4a58a",fog:"#a39b7e",earth:"#b09b6b",wet:"#685b3c",deep:"#626047",leaf:"#d0b46b",rock:"#b6a184",moss:"#9f9a6d",bark:"#78543b",reed:"#c8ad73",water:"#69765a",nightWater:"#25352b"},{sky:"#82989c",fog:"#738d81",earth:"#7a8064",wet:"#364f3b",deep:"#3e5c52",leaf:"#93b57d",rock:"#939b8b",moss:"#6b8664",bark:"#554934",reed:"#9b9d70",water:"#376b57",nightWater:"#112e29"}];function h1(i=0,t=731+Math.max(0,i)*7919){const e=Math.max(0,Math.floor(Number(i)||0)),n=e%8,[s,r]=[[1,0],[0,1],[-1,0],[0,-1]][n%4],o=n>=4?-1:1,a=(h,u)=>e?{x:s*h*o+r*u,z:-r*h*o+s*u}:{x:h,z:u},l=(h,u)=>e?{x:o*(s*h-r*u),z:r*h+s*u}:{x:h,z:u},c=Bi((Number(t)||731)^Math.imul(e,2654435761));return{index:e,seed:t,symmetry:n,yaw:n%4*Math.PI/2,toWorld:a,toSource:l,palette:{...ld[e%ld.length]},noiseOffset:e?{x:(c()-.5)*170,z:(c()-.5)*170}:{x:0,z:0}}}function Sh(i,t,e=1){const n=document.createElement("canvas");n.width=n.height=i,t(n.getContext("2d"),i);const s=new Gd(n);return s.colorSpace=Un,s.wrapS=s.wrapT=Tr,s.repeat.set(e,e),s.anisotropy=4,s}function Ul(i,t=!1){const e=Bi(i);return Sh(256,(n,s)=>{n.fillStyle=t?"#6c7155":"#8b8978",n.fillRect(0,0,s,s);for(let r=0;r<15e3;r++){const o=e()*s,a=e()*s,l=45+e()*110;n.fillStyle=t?`rgba(${l*.8},${l},${l*.61},${.12+e()*.28})`:`rgba(${l*1.06},${l},${l*.85},${.15+e()*.3})`,n.fillRect(o,a,.5+e()*3,.5+e()*3)}n.lineWidth=.7;for(let r=0;r<26;r++){n.strokeStyle=`rgba(31,36,28,${.06+e()*.15})`,n.beginPath();let o=e()*s;n.moveTo(0,o);for(let a=0;a<s;a+=10)o+=(e()-.5)*9,n.lineTo(a,o);n.stroke()}},1)}function u1(i){const t=Bi(i);return Sh(512,(e,n)=>{const s=e.createRadialGradient(n*.5,n*.5,4,n*.5,n*.5,n*.54);s.addColorStop(0,"#588a39"),s.addColorStop(.6,"#6ca04a"),s.addColorStop(1,"#345d27"),e.fillStyle=s,e.fillRect(0,0,n,n);for(let r=0;r<9e3;r++)e.fillStyle=t()>.5?"rgba(185,214,109,.08)":"rgba(18,58,20,.06)",e.fillRect(t()*n,t()*n,t()*4+1,t()*4+1);for(let r=.18;r<Ue-.18;r+=.31){const o=n*.5+Math.cos(r)*n*.49,a=n*.5+Math.sin(r)*n*.49;e.strokeStyle="rgba(191,204,117,.42)",e.lineWidth=1.8,e.beginPath(),e.moveTo(n*.5,n*.5),e.quadraticCurveTo(n*.5+Math.cos(r+.08)*n*.28,n*.5+Math.sin(r+.08)*n*.28,o,a),e.stroke();for(let l=.2;l<.9;l+=.15)for(const c of[-1,1])e.strokeStyle="rgba(186,211,124,.19)",e.lineWidth=.8,e.beginPath(),e.moveTo(n*.5+Math.cos(r)*n*l*.5,n*.5+Math.sin(r)*n*l*.5),e.lineTo(n*.5+Math.cos(r+c*.12)*n*(l+.1)*.5,n*.5+Math.sin(r+c*.12)*n*(l+.1)*.5),e.stroke()}for(let r=0;r<13;r++){const o=t()*Ue,a=t()*n*.45;e.fillStyle="rgba(42,56,17,.16)",e.beginPath(),e.ellipse(n*.5+Math.cos(o)*a,n*.5+Math.sin(o)*a,t()*5+2,t()*3+1,o,0,Ue),e.fill()}})}function d1(i){const e=document.createElement("canvas");e.width=e.height=256;const n=e.getContext("2d"),s=n.createImageData(256,256);for(let o=0;o<256;o++)for(let a=0;a<256;a++){const l=(o*256+a)*4,c=a*Ue/256,h=o*Ue/256,u=Math.cos(c*9+h*7)*.27+Math.cos(c*17-h*11)*.14+Math.sin(c*31+h*19)*.07,d=Math.sin(c*7+h*13)*.27+Math.sin(c*19-h*9)*.13+Math.cos(c*29+h*23)*.08;s.data[l]=128+u*110,s.data[l+1]=128+d*110,s.data[l+2]=245,s.data[l+3]=255}n.putImageData(s,0,0);const r=new Gd(e);return r.wrapS=r.wrapT=Tr,r.colorSpace=Li,r}function qc(i,t,e=.1,n=1){const s=Bi(n),r=i.attributes.position,o=new Float32Array(r.count*3),a=hn(t);for(let l=0;l<r.count;l++){const c=1+(s()-.5)*e;o[l*3]=a.r*c,o[l*3+1]=a.g*c,o[l*3+2]=a.b*c}return i.setAttribute("color",new un(o,3)),i}function Ke(i,t,e,n=12,s=0){const r=new mo(i.map(a=>new L(...a))),o=new Fa(r,n,t,5,!1);if(s){const a=o.attributes.position;for(let l=0;l<=n;l++){const c=r.getPointAt(l/n),h=1-s*l/n;for(let u=0;u<=5;u++){const d=l*6+u;a.setXYZ(d,c.x+(a.getX(d)-c.x)*h,c.y+(a.getY(d)-c.y)*h,c.z+(a.getZ(d)-c.z)*h)}}o.computeVertexNormals()}return new Jt(o,e)}function ii(i,t=[],e=new Set){i.updateMatrixWorld(!0);const n=new he().copy(i.matrixWorld).invert(),s=new Map;i.traverse(r=>{if(!r.isMesh||r.isInstancedMesh||e.has(r)||Array.isArray(r.material))return;const o=r.material.uuid;s.has(o)||s.set(o,{material:r.material,meshes:[]}),s.get(o).meshes.push(r)});for(const{material:r,meshes:o}of s.values()){if(o.length<2)continue;const a=o.map(h=>h.geometry.clone().applyMatrix4(new he().multiplyMatrices(n,h.matrixWorld))),l=ki(a,!1);for(const h of a)h.dispose();if(!l)continue;const c=new Jt(l,r);c.castShadow=o.some(h=>h.castShadow),c.receiveShadow=!0,t.push(l);for(const h of o){h.removeFromParent();const u=t.indexOf(h.geometry);u>=0&&(t.splice(u,1),h.geometry.dispose())}i.add(c)}}function ts(i=1,t=1,e=.08){const n=[],s=[],r=[];for(let c=0;c<=3;c++)for(let h=0;h<=40;h++){const u=c/3,d=.22+h/40*(Ue-.44),f=1+.027*Math.sin(d*7)+.016*Math.cos(d*13),m=Math.cos(d)*u*f,g=Math.sin(d)*u*f;n.push(m*i,e*(u*u)+.014*Math.sin(d*4)*u*u,g*t),s.push(m*.48+.5,g*.48+.5)}for(let c=0;c<3;c++)for(let h=0;h<40;h++){const u=c*41+h,d=u+40+1;r.push(u,u+1,d,d,u+1,d+1)}const l=new Se;return l.setAttribute("position",new Gt(n,3)),l.setAttribute("uv",new Gt(s,2)),l.setIndex(r),l.computeVertexNormals(),l}function kl(i){const t=Bi(i),e=28,n=[[-.47,.57],[-.2,.91],[.15,1],[.52,.86],[.71,.61],[.76,.08]],s=[],r=[],o=[],a=Array.from({length:e+1},(h,u)=>.87+.12*Math.sin(u*1.51+i)+t()*.12);a[e]=a[0];for(let h=0;h<n.length;h++)for(let u=0;u<=e;u++){const d=u/e*Ue,f=n[h][1]*a[u],m=(Math.sin(d*5+i)+Math.sin(d*9-i))*.045;s.push(Math.cos(d)*f,n[h][0]+m*(h===5?.15:1),Math.sin(d)*f*.86),r.push(Math.cos(d)*f*.5+.5,Math.sin(d)*f*.5+.5)}for(let h=0;h<n.length-1;h++)for(let u=0;u<e;u++){const d=h*(e+1)+u,f=d+e+1;o.push(d,f,d+1,d+1,f,f+1)}const l=s.length/3;s.push(0,.764,0),r.push(.5,.5);for(let h=0;h<e;h++)o.push(l,(n.length-1)*(e+1)+h+1,(n.length-1)*(e+1)+h);const c=new Se;return c.setAttribute("position",new Gt(s,3)),c.setAttribute("uv",new Gt(r,2)),c.setIndex(o),c.computeVertexNormals(),c}function $c(i){const t=Bi(i),e=[],n=[],s=[],r=[];for(let a=0;a<5;a++){const l=t()*Ue,c=.55+t()*.7,h=.1+t()*.35,u=.022+t()*.035,d=hn(a%2?"#819c42":"#526f33"),f=e.length/3;for(let m=0;m<=7;m++){const g=m/7,x=Math.cos(l)*h*g*g,p=Math.sin(l)*h*g*g,v=u*Math.sin(Math.PI*(g*.94+.04));for(const y of[-1,1])e.push(x+Math.cos(l+Math.PI/2)*v*y,g*c,p+Math.sin(l+Math.PI/2)*v*y),n.push(y*.5+.5,g),r.push(d.r*(.65+g*.35),d.g*(.65+g*.35),d.b*(.65+g*.35))}for(let m=0;m<7;m++){const g=f+m*2;s.push(g,g+1,g+2,g+1,g+3,g+2)}}const o=new Se;return o.setAttribute("position",new Gt(e,3)),o.setAttribute("uv",new Gt(n,2)),o.setAttribute("color",new Gt(r,3)),o.setIndex(s),o.computeVertexNormals(),o}function f1(){const i=new Fa(new mo([new L,new L(.03,.8,.015),new L(.1,1.8,.04)]),9,.013,5,!1);qc(i,"#64754a",.15,8);const t=new jn(1,7,7);t.scale(.065,.25,.065),t.translate(.1,1.61,.04),qc(t,"#5d3f27",.3,5);const e=$c(92);e.scale(.8,1.45,.8);const n=ki([i,t,e],!1);return i.dispose(),t.dispose(),e.dispose(),n}function p1(i){const t=new jn(1,13,9),e=t.attributes.position;for(let n=0;n<e.count;n++){const s=e.getX(n),r=e.getY(n),o=e.getZ(n),a=1+.06*Math.sin(s*12+i)*Math.sin(o*13-r*7);e.setXYZ(n,s*a,r*.83*a,o*a)}return t.computeVertexNormals(),t}function m1(){const i=[],t=[],e=[];function n(r,o,a,l){const c=i.length/3;i.push(...r,...o,...a);const h=hn(l);for(let u=0;u<3;u++)t.push(h.r,h.g,h.b);e.push(c,c+1,c+2)}n([0,.025,-.1],[-.045,0,0],[0,.04,.09],"#16201b"),n([0,.025,-.1],[0,.04,.09],[.045,0,0],"#293327"),n([0,0,0],[-.17,.025,-.035],[-.12,.015,.07],"#a0b3b0"),n([0,0,0],[.12,.015,.07],[.17,.025,-.035],"#a0b3b0");const s=new Se;return s.setAttribute("position",new Gt(i,3)),s.setAttribute("color",new Gt(t,3)),s.setIndex(e),s.computeVertexNormals(),s}function Yr(i,t,e,n,{castShadow:s=!1,receiveShadow:r=!1,dynamic:o=!1}={}){const a=new te;a.name=n;const l=new Map,c=[],h=[],u=new Set,d=128;e.forEach((f,m)=>{const g=Math.floor(f.x/d)+":"+Math.floor(f.z/d);l.has(g)||l.set(g,[]),l.get(g).push(m)});for(const[f,m]of l){const g=new wn(i,t,m.length);g.name=n+" · "+f,g.castShadow=s,g.receiveShadow=r,g.userData.spatialChunk=!0,g.userData.chunkSpan=d,o&&g.instanceMatrix.setUsage(Ui),m.forEach((x,p)=>{c[x]={mesh:g,index:p}}),a.add(g),h.push(g)}return{group:a,meshes:h,count:e.length,setMatrixAt(f,m){const g=c[f];g.mesh.setMatrixAt(g.index,m),u.add(g.mesh)},setColorAt(f,m){const g=c[f];g.mesh.setColorAt(g.index,m)},finish(){for(const f of h)f.computeBoundingBox(),f.computeBoundingSphere(),f.boundingSphere.radius+=.75,f.instanceMatrix.needsUpdate=!0,f.instanceColor&&(f.instanceColor.needsUpdate=!0);u.clear()},flush(){for(const f of u)f.instanceMatrix.needsUpdate=!0;u.clear()}}}function g1(i,t,e={}){const n=Math.max(0,Math.floor(Number(e.regionIndex)||0)),s=e.seed??731+n*7919,r=h1(n,s),o=r.palette,a=Bi(s),l=new te;l.name="The living creek",i.add(l);const c=e.natural===!0,h=c?i1(r):null,u=h?.landmarks||[],d=h?.nest||null,f=h?.cover||[],m=[],g=[];let x=Qi,p=Qi,v={flow:.45},y=!1,_=null;const T=[],A=[],E=new Set,R=new Map,S=new Set,b=[],U=new Map,P=6;let G=null;const Z={reflectionRenders:0,reflectionSkips:0,flyMatricesUpdated:0,spatialChunks:0,terrainUpdates:0};new ee(o.sky);const H=new ee(o.fog);i.fog?i.fog.color.copy(H):i.fog=new Ua(H,.0042);const V=Ul(s),N=Ul(s+9,!0),B=u1(s),Q=d1();b.push(V,N,B,Q);const X={terrain:new Ve({color:16777215,vertexColors:!0,map:N,roughness:1}),leaf:new Ve({color:o.leaf,map:B,roughness:.44,metalness:.025,side:Ce}),rock:new Ve({color:o.rock,map:V,roughness:.89}),mossRock:new Ve({color:o.moss,map:N,roughness:.94}),plant:new Ve({color:16777215,vertexColors:!0,roughness:.87,side:Ce}),bark:new Ve({color:o.bark,map:V,roughness:.94}),reed:new Ve({color:o.reed,map:V,roughness:.83}),compost:new Ve({color:"#57422e",map:N,roughness:1}),fruit:new Ve({color:"#b38539",map:V,roughness:.75}),darkFruit:new Ve({color:"#685831",map:N,roughness:.95})},ft=[kl(7),kl(35),kl(89)],Vt=ts(),Me=p1(19),ce=[{id:"home",x:8,z:8,radius:7.4,team:"neutral",name:"Willow Haven"},{id:"mudfang",x:-31,z:-30,radius:7,team:"enemy",name:"Mudfang Den"},{id:"redreed",x:31,z:-56,radius:7.6,team:"enemy",name:"Red Reed Stronghold"},{id:"mossjaw",x:-24,z:49,radius:7.1,team:"enemy",name:"Mossjaw Hollow"},{id:"blackpool",x:34,z:79,radius:8,team:"enemy",name:"Blackwater Nest"},{id:"thornback",x:-8,z:-91,radius:8,team:"enemy",name:"Thornback Root"},{id:"oldwillow",x:-38,z:96,radius:7.5,team:"neutral",name:"Αυλή της Γέρικης Ιτιάς"},{id:"quietbend",x:29,z:32,radius:6.8,team:"neutral",name:"Quiet Bend"},{id:"foxglove",x:-39,z:2,radius:6.8,team:"neutral",name:"Foxglove Island"},{id:"reedcrossing",x:3,z:-45,radius:6.8,team:"neutral",name:"Πέρασμα των Καλαμιών"},{id:"longreed",x:-4,z:67,radius:6.8,team:"neutral",name:"Νησίδα των Ανέμων"},{id:"eastshallows",x:58,z:35,radius:6.8,team:"neutral",name:"Ανατολικές Αβαθείς"}],ht={home:.65,mudfang:2.7,redreed:4.1,mossjaw:1.8,blackpool:5.2,thornback:7.1,oldwillow:2.9,quietbend:1.2,foxglove:2.1,reedcrossing:1.7,longreed:2.5,eastshallows:3.4},Y=Bi(s^3582759),rt={home:{x:17,z:16,radius:7.4,elevation:.65},mudfang:{x:38,z:-19,radius:9,elevation:1.35},redreed:{x:-37,z:-46,radius:11,elevation:1.2},mossjaw:{x:-34,z:44,radius:11,elevation:1.05},blackpool:{x:40,z:86,radius:12,elevation:1.5},thornback:{x:-16,z:-120,radius:12,elevation:1.65}};for(const M of ce){const z=rt[M.id],F=c&&z?{x:z.x,z:z.z}:{x:M.x*ge,z:M.z*ge};Object.assign(M,r.toWorld(F.x,F.z)),M.radius=c?z?.radius||10:Math.max(36,M.radius*(M.id==="thornback"?5.8:4.9)),M.elevation=c?z?.elevation||1.1:Math.max(.45,ht[M.id]+(n?(Y()-.5)*.6:0)),M.shorePhase=F.x+(n?Y()*Ue:0),n&&(M.yaw=r.yaw)}ce.find(M=>M.id==="thornback").stronghold=!0;const _t=[{id:"haven",name:"Απάνεμη Όχθη",x:0,z:12,radius:30,tint:"#77965d"},{id:"reedways",name:"Περάσματα των Καλαμιών",x:2,z:-50,radius:45,tint:"#a99d64"},{id:"westernroots",name:"Δυτικές Ρίζες",x:-34,z:22,radius:37,tint:"#657f67"},{id:"blackwater",name:"Βαθύ Νερό",x:10,z:75,radius:34,tint:"#496f79"}].map(M=>({...M,...r.toWorld(M.x*ge,M.z*ge),radius:M.radius*ge})),Xt={heron:r.toWorld(34*ge,14*ge),snake:r.toWorld(-38*ge,-22*ge),fish:r.toWorld(12*ge,48*ge)},Nt={heron:r.toWorld(43*ge,-73*ge),snake:r.toWorld(-39*ge,70*ge),fish:r.toWorld(11*ge,94*ge)};c&&(Object.assign(Xt,{heron:r.toWorld(34,15),snake:r.toWorld(-26,-23),fish:r.toWorld(5,-34)}),Object.assign(Nt,{heron:r.toWorld(41,-70),snake:r.toWorld(-34,62),fish:r.toWorld(7,106)}));const fe=c?ce.map(M=>({...M,...r.toSource(M.x,M.z)})):[];function we(M,z){const F=r.toSource(M,z),O=F.x/ge,k=F.z/ge;if(c)return s1(F.x,F.z,oa(F.x+r.noiseOffset.x,F.z+r.noiseOffset.z),fe);const W=Math.sin(k*.032)*15+Math.sin(k*.073)*5,j=Math.abs(O-W);let q=-2.2+oa(F.x+r.noiseOffset.x,F.z+r.noiseOffset.z)*.47+ni(44,71,j)*6;q+=ni(47,72,j)*(1.5+3.3*Math.sin(k*.036+.7)**2),q+=ni(105,132,Math.abs(k))*4.8;let it=null,dt=0;for(const kt of ce){const oe=M-kt.x,Ae=z-kt.z,Re=Math.hypot(oe,Ae),me=r.toSource(oe,Ae),sn=kt.radius*(1+.05*Math.sin(Math.atan2(me.z,me.x)*5+kt.shorePhase));if(Re<sn+7){const tn=Oy,cn=kt.elevation-ni(tn,sn+7,Re)*(kt.elevation+2.8);q=Math.max(q,cn);const mn=1-ni(tn,tn+8,Re);mn>dt&&(it=kt,dt=mn)}}it&&(q=q*(1-dt)+it.elevation*dt);let Tt=null,Zt=0,Dt=1/0;for(const kt of R.values()){const oe=Math.hypot(M-kt.x,z-kt.z),Ae=1-ni(ws,ws+sa,oe);(Ae>Zt||Ae===Zt&&Ae>0&&oe<Dt)&&(Tt=kt,Zt=Ae,Dt=oe)}if(Tt){const kt=q*(1-Zt)+Tt.elevation*Zt;q=Zt===1?Tt.elevation:Math.max(q,kt)}return q}const I=new Ni(270*ge,270*ge,216,216);I.rotateX(-Math.PI/2);const ne=I.attributes.position,jt=new Float32Array(ne.count*3),Yt=hn(o.earth),It=hn(o.wet),se=hn(o.deep);for(let M=0;M<ne.count;M++){const z=ne.getX(M),F=ne.getZ(M),O=we(z,F);ne.setY(M,O);const k=se.clone().lerp(It,ni(-1.7,.05,O)).lerp(Yt,ni(.02,2,O));k.multiplyScalar(.88+oa(z*2,F*2)*.18),k.toArray(jt,M*3)}I.setAttribute("color",new un(jt,3)),I.computeVertexNormals(),N.repeat.set(44*ge,44*ge);const mt=new Jt(I,X.terrain);mt.receiveShadow=!0,mt.name="Creek bed and island banks",l.add(mt);const Mt=135*ge,le=270*ge/216,ze=217;function D(M,z){const F=Gc.clamp((M+Mt)/le,0,216),O=Gc.clamp((z+Mt)/le,0,216),k=Math.min(215,Math.floor(F)),W=Math.min(215,Math.floor(O)),j=F-k,q=O-W,it=W*ze+k,dt=it+ze,Tt=ne.getY(it),Zt=ne.getY(it+1),Dt=ne.getY(dt),kt=ne.getY(dt+1);return j+q<=1?Tt+j*(Zt-Tt)+q*(Dt-Tt):kt+(1-j)*(Dt-kt)+(1-q)*(Zt-kt)}function w(M){const z=ws+sa+le*2;for(let F=0;F<ne.count;F++){const O=ne.getX(F),k=ne.getZ(F);if(Math.abs(O-M.x)>z||Math.abs(k-M.z)>z)continue;const W=we(O,k);ne.setY(F,W);const j=se.clone().lerp(It,ni(-1.7,.05,W)).lerp(Yt,ni(.02,2,W));j.multiplyScalar(.88+oa(O*2,k*2)*.18),j.toArray(jt,F*3)}ne.needsUpdate=!0,I.attributes.color.needsUpdate=!0,I.computeVertexNormals(),I.computeBoundingBox(),I.computeBoundingSphere(),Z.terrainUpdates++}const tt=Ul(s+9,!0);b.push(tt),X.mossRock.map=tt,X.compost.map=tt,X.darkFruit.map=tt;const at=new Ni(266*ge,266*ge,88,88),lt=new Uy(at,{textureWidth:512,textureHeight:512,waterNormals:Q,sunDirection:new L(.6,.8,-.3),sunColor:16771517,waterColor:3039835,distortionScale:2.5,alpha:.91,fog:!0});lt.name="Reflecting creek",lt.rotation.x=-Math.PI/2,lt.position.y=Qi,lt.material.transparent=!0,lt.material.depthWrite=!1,lt.renderOrder=-2,lt.material.uniforms.size.value=4.8,l.add(lt);const ot=lt.onBeforeRender;let Lt=0;lt.onBeforeRender=function(M,z,F){if(lt.material.uniforms.eye.value.setFromMatrixPosition(F.matrixWorld),Lt++%2){Z.reflectionSkips++;return}Z.reflectionRenders++,ot.call(this,M,z,F)};const ct=at.attributes.position.array.slice(),wt=[],zt=new te,gt=[];zt.name="Willow trunks and tangled roots",l.add(zt);for(let M of[-1,1])for(let z=0;z<15;z++){const F=(-122+z*17+(a()-.5)*7)*ge,O=(M*(59+a()*15)+Math.sin(F/ge*.032)*15)*ge,{x:k,z:W}=r.toWorld(O,F),j=we(k,W);if(j<.2)continue;const q=new te;q.position.set(k,j,W);const it=9+a()*14,dt=(a()-.5)*3,Tt=Ke([[0,-.8,0],[.25,it*.3,0],[dt,it*.72,.6],[dt*.8,it,1]],.68+a()*.65,X.bark,13,.72);Tt.castShadow=!0,q.add(Tt),wt.push(Tt.geometry);for(let Zt=0;Zt<5;Zt++){const Dt=Zt/5*Ue+a(),kt=3+a()*4,oe=Ke([[0,.7,0],[Math.cos(Dt)*kt*.45,.1,Math.sin(Dt)*kt*.45],[Math.cos(Dt)*kt,-.4,Math.sin(Dt)*kt]],.15+a()*.2,X.bark,9,.82);oe.castShadow=!0,q.add(oe),wt.push(oe.geometry)}for(let Zt=0;Zt<4;Zt++){const Dt=a()*Ue,kt=it*(.5+a()*.3),oe=3+a()*6,Ae=Ke([[dt*.4,kt,0],[Math.cos(Dt)*oe*.45,kt+2,Math.sin(Dt)*oe*.45],[Math.cos(Dt)*oe,kt+3,Math.sin(Dt)*oe]],.16+a()*.2,X.bark,10,.83);q.add(Ae),wt.push(Ae.geometry);for(let Re=0;Re<70;Re++){const me=Math.sqrt(a())*4,sn=a()*Ue;gt.push({x:k+Math.cos(Dt)*oe+Math.cos(sn)*me,y:j+kt+3+(a()-.5)*3-Math.abs(me)*.25,z:W+Math.sin(Dt)*oe+Math.sin(sn)*me,angle:a()*Ue,scale:.65+a()*.6})}}zt.add(q)}ii(zt,wt);const Rt=new Se;Rt.setAttribute("position",new Gt([0,0,0,-.12,-.32,.035,0,-.38,.06,.12,-.32,.035,-.1,-.64,.02,0,-.76,.04,.1,-.64,.02,0,-1.05,0],3)),Rt.setAttribute("uv",new Gt([.5,0,0,.3,.5,.35,1,.3,0,.6,.5,.7,1,.6,.5,1],2)),Rt.setIndex([0,1,2,0,2,3,1,4,2,2,4,5,2,5,6,2,6,3,4,7,5,5,7,6]),Rt.computeVertexNormals(),qc(Rt,"#69834d",.25,s);const Qt=Yr(Rt,X.plant,gt,"Hanging willow foliage");gt.forEach((M,z)=>{pt.position.set(M.x,M.y,M.z),pt.rotation.set((a()-.5)*.8,M.angle,(a()-.5)*.7),pt.scale.setScalar(M.scale),pt.updateMatrix(),Qt.setMatrixAt(z,pt.matrix)}),Qt.finish(),l.add(Qt.group),Z.spatialChunks+=Qt.meshes.length;function Bt(M){T.push(M);const z=Math.floor((M.x-M.radius)/P),F=Math.floor((M.x+M.radius)/P),O=Math.floor((M.z-M.radius)/P),k=Math.floor((M.z+M.radius)/P);for(let W=z;W<=F;W++)for(let j=O;j<=k;j++){const q=W+":"+j;U.has(q)||U.set(q,[]),U.get(q).push(M)}return M}const St=[],ue=[[],[],[]];function $(M,z,F=1.35+a()*.9){const O=Bt({id:"p"+T.length,type:"lily",x:M,z,y:.105,radius:F*.91,visualRadius:F,angle:a()*Ue,phase:a()*Ue});return St.push(O),O}function yt(M,z,F=1.3+a()*1.3,O=.65+a()*.65){const k=Math.floor(a()*3),W=Bt({id:"p"+T.length,type:"rock",x:M,z,y:O*.76-.05,radius:F*.72,visualRadius:F,scaleY:O,angle:a()*Ue,variant:k});return ue[k].push(W),W}const Et=r.toWorld(3.7,1),Ft=r.toWorld(-3.9,2.2);if($(0,0,3.1),$(Et.x,Et.z,2.3),yt(Ft.x,Ft.z,2.5,.9),c){const M=u.find(z=>z.id==="pond").findPoint;$(M.x,M.z,1.7)}function xt(M,z){const F=Math.hypot(z.x-M.x,z.z-M.z),O=Math.ceil(F/3.65),k=r.toSource(M.x,M.z),W=r.toSource(z.x,z.z);for(let j=1;j<O;j++){const q=j/O,{x:it,z:dt}=r.toWorld(k.x+(W.x-k.x)*q+Math.sin(q*Math.PI*3)*1.25,k.z+(W.z-k.z)*q);if(we(it,dt)>-.1)continue;const Tt=r.toSource(it,dt);c&&Tt.x>14&&Tt.x<32&&Math.abs(Tt.z+16)<3.7||(a()<.18?yt(it,dt,1.8+a()*.7,.65+a()*.55):$(it,dt,1.65+a()*.65))}}const ut={id:"origin",x:0,z:0},Ht=new Map(ce.map(M=>[M.id,M]));Ht.set("origin",ut);const Be=[["origin","home"],["origin","foxglove"],["home","mudfang"],["home","quietbend"],["mudfang","reedcrossing"],["reedcrossing","redreed"],["reedcrossing","thornback"],["foxglove","mossjaw"],["quietbend","mossjaw"],["quietbend","eastshallows"],["mossjaw","longreed"],["longreed","blackpool"],["longreed","oldwillow"],["eastshallows","blackpool"],["redreed","thornback"]].map(([M,z])=>({from:M,to:z,start:Ht.get(M),end:Ht.get(z)}));for(const M of Be)xt(M.start,M.end);if(c){const M=z=>u.find(F=>F.id===z);for(const[z,F]of[[ut,M("creek")],[M("creek"),M("roots")],[M("roots"),M("bank")],[M("bank"),d]])xt(z,F)}for(let M=0;M<1180;M++){const z=(a()-.5)*218*ge,F=((a()-.5)*108+Math.sin(z/ge*.032)*10)*ge,{x:O,z:k}=r.toWorld(F,z);if(we(O,k)>-.18)continue;const W=r.toSource(O,k);c&&W.x>14&&W.x<32&&Math.abs(W.z+16)<3.7||(U.get(Math.floor(O/P)+":"+Math.floor(k/P))||[]).some(q=>Math.hypot(q.x-O,q.z-k)<q.radius+1)||(a()<.15?yt(O,k,1.1+a()*2.3,.55+a()*1.2):$(O,k,1.1+a()*1.1))}for(const M of ce)Bt({id:"island-"+M.id,type:"land",x:M.x,z:M.z,y:M.elevation,radius:M.radius*.8});const ve=Yr(Vt,X.leaf,St,"Veined water lily leaves",{castShadow:!0,receiveShadow:!0,dynamic:!0}),Kn=c1(St,Vt.attributes.position.array);St.forEach((M,z)=>{pt.position.set(M.x,M.y,M.z),pt.rotation.set((a()-.5)*.04,M.angle,(a()-.5)*.035),pt.scale.set(M.visualRadius,1,M.visualRadius*(.89+a()*.18)),pt.updateMatrix(),ve.setMatrixAt(z,pt.matrix),ve.setColorAt(z,hn(["#b6cf8a","#88ac67","#749d59","#c0cc7e","#729958"][Math.floor(a()*5)]))}),ve.finish(),l.add(ve.group),Z.spatialChunks+=ve.meshes.length,ue.forEach((M,z)=>{const F=Yr(ft[z],z===1?X.mossRock:X.rock,M,"Weathered waterline outcrops",{castShadow:!0,receiveShadow:!0});M.forEach((O,k)=>{pt.position.set(O.x,-.05,O.z),pt.rotation.set(0,O.angle,0),pt.scale.set(O.visualRadius,O.scaleY,O.visualRadius),pt.updateMatrix(),F.setMatrixAt(k,pt.matrix),F.setColorAt(k,hn("#ffffff").multiplyScalar(.7+a()*.4))}),F.finish(),l.add(F.group),Z.spatialChunks+=F.meshes.length});const vn=new Se,Ir=[],ai=[],Fs=[];for(let M=0;M<=9;M++){const z=M/9,F=Math.sin(z*Math.PI)*.16;for(const O of[-1,1])Ir.push(O*F,.13*Math.sin(z*Math.PI)+.23*z*z,z*.65),ai.push(O*.5+.5,z)}for(let M=0;M<9;M++){const z=M*2;Fs.push(z,z+1,z+2,z+1,z+3,z+2)}vn.setAttribute("position",new Gt(Ir,3)),vn.setAttribute("uv",new Gt(ai,2)),vn.setIndex(Fs),vn.computeVertexNormals();const Mo=new Ve({color:"#f4e5d5",roughness:.48,side:Ce}),Lr=St.filter((M,z)=>z%23===5),Si=new wn(vn,Mo,Lr.length*13);let bo=0;for(const M of Lr)for(let z=0;z<13;z++)pt.position.set(M.x+.24,M.y+.045,M.z),pt.rotation.set(z>7?.1:0,z/8*Ue,z>7?.1:0),pt.scale.setScalar(z>7?.67:1),pt.updateMatrix(),Si.setMatrixAt(bo++,pt.matrix);l.add(Si);const li=[];for(let M=0;M<26e3;M++){const z=(a()-.5)*254*ge,F=(a()-.5)*254*ge,O=we(z,F);O<-.52||O>3.2||ce.some(k=>Math.hypot(k.x-z,k.z-F)<k.radius*.68)||Math.hypot(z,F)<8||li.push({x:z,z:F,y:O,scale:.65+a()*2.2,angle:a()*Ue})}const So=$c(44),ci=Yr(So,X.plant,li,"Curved river reeds",{receiveShadow:!0});li.forEach((M,z)=>{pt.position.set(M.x,M.y,M.z),pt.rotation.set(0,M.angle,0),pt.scale.set(.65+M.scale*.25,M.scale,.65+M.scale*.25),pt.updateMatrix(),ci.setMatrixAt(z,pt.matrix),ci.setColorAt(z,hn("#ffffff").multiplyScalar(.75+a()*.5))}),ci.finish(),l.add(ci.group),Z.spatialChunks+=ci.meshes.length;const Ur=li.filter((M,z)=>M.y<.5&&z%5===0),qa=f1(),Xi=Yr(qa,X.plant,Ur,"Cattail patches");Ur.forEach((M,z)=>{pt.position.set(M.x+.12,M.y,M.z),pt.rotation.set(0,M.angle,0),pt.scale.setScalar(.7+M.scale*.4),pt.updateMatrix(),Xi.setMatrixAt(z,pt.matrix)}),Xi.finish(),l.add(Xi.group),Z.spatialChunks+=Xi.meshes.length;const wo={value:0};X.plant.onBeforeCompile=M=>{M.uniforms.uCreekTime=wo,M.vertexShader=`uniform float uCreekTime;
`+M.vertexShader,M.vertexShader=M.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 transformed.x += sin(uCreekTime * 1.1 + position.y * 2.3 + instanceMatrix[3].x * .13 + instanceMatrix[3].z * .17) * pow(max(position.y, 0.0), 1.6) * .035;`)},X.plant.customProgramCacheKey=()=>"creek-wind-1";function gs(M,z){const F=c?x-.065:-.1;let O=D(M,z),k=O>F?"land":"water",W=null;O<=F&&(O=c?x-.215:-.25);const j=U.get(Math.floor(M/P)+":"+Math.floor(z/P))||[];for(const q of j){if(q.type==="land")continue;const it=Math.hypot(M-q.x,z-q.z);if(it<=q.radius){let dt=q.y;if(q.type==="rock"&&(dt-=ni(q.radius*.62,q.radius,it)*.14*q.scaleY),c&&dt<=F)continue;dt>O&&(O=dt,k=q.type==="shelter"?"land":q.type,W=q)}}return t1(g,M,z)||{height:O,type:k,platform:W}}function Os(M,z){return gs(M,z).height}function C(M,z){return Math.max(Os(M,z),Kn(M,z))}const K=[{x:4.5/ge,z:-4/ge,rich:!1},{x:-10,z:12,rich:!0},{x:15,z:-20,rich:!1},{x:-25,z:-23,rich:!0},{x:26,z:-47,rich:!0},{x:-17,z:40,rich:!0},{x:27,z:69,rich:!0},{x:-4,z:-81,rich:!0},{x:-34,z:86,rich:!0},{x:23,z:26,rich:!1},{x:-33,z:7,rich:!1},{x:4,z:51,rich:!1},{x:9,z:-59,rich:!1},{x:-12,z:76,rich:!1},{x:39,z:-4,rich:!1},{x:-42,z:-59,rich:!0},{x:7,z:-39,rich:!0},{x:0,z:63,rich:!0},{x:53,z:33,rich:!0},{x:-24,z:17,rich:!1},{x:17,z:-70,rich:!1},{x:18,z:90,rich:!0}].map(M=>({...M,...r.toWorld(M.x*ge,M.z*ge)}));if(c)for(const[M,z]of[{x:4.5,z:-4},{x:18,z:14},{x:9,z:-24},{x:26,z:10},{x:31,z:-16},{x:-20,z:-8}].entries())Object.assign(K[M],r.toWorld(z.x,z.z));const et=[],nt=[],J=[],vt=new te;l.add(vt);for(let M=0;M<K.length;M++){const z=K[M];we(z.x,z.z)<-.15&&yt(z.x,z.z,z.rich?3.2:2.2,.62);const O=Os(z.x,z.z),k={id:"flies-"+M,x:z.x,z:z.z,y:O+.25,flies:z.rich?240:100,maxFlies:z.rich?240:100,rich:z.rich};if(c){const j=[...u].sort((q,it)=>Math.hypot(z.x-q.x,z.z-q.z)-Math.hypot(z.x-it.x,z.z-it.z))[0]?.id||"creek";k.ecology={habitat:j,activity:1},k.regenMultiplier=1}A.push(k);const W=new Jt(ft[M%3],X.compost);W.position.set(z.x,O+.05,z.z),W.scale.set(z.rich?1.7:1.05,.28,z.rich?1.25:.75),W.rotation.y=a()*Ue,l.add(W),nt.push(W);for(let j=0;j<(z.rich?12:6);j++){const q=a()*Ue,it=a()*(z.rich?1.5:.85),dt=.12+a()*.16;et.push({spot:M,groundOffset:dt,x:z.x+Math.cos(q)*it,y:O+dt,z:z.z+Math.sin(q)*it,scale:.12+a()*.18,rot:a()*Ue})}for(let j=0;j<3;j++){const q=a()*Ue,it=.7+a()*.8,dt=Ke([[0,0,0],[it*.5,.02,.06],[it,.04,.14]],.035,X.bark,4);dt.position.set(z.x+(a()-.5)*1.6,O+.1,z.z+(a()-.5)*1.6),dt.rotation.y=q,vt.add(dt),J.push(dt.geometry)}}ii(vt,J);for(const M of K)if(we(M.x,M.z)<-.15){const z=ue.flat().find(F=>Math.abs(F.x-M.x)<.01&&Math.abs(F.z-M.z)<.01);if(z){const F=new Jt(ft[z.variant],X.mossRock);F.position.set(z.x,-.05,z.z),F.rotation.y=z.angle,F.scale.set(z.visualRadius,z.scaleY,z.visualRadius),F.castShadow=!0,F.receiveShadow=!0,l.add(F)}}const Ct=new wn(Me,X.fruit,et.length);et.forEach((M,z)=>{pt.position.set(M.x,M.y,M.z),pt.rotation.set(.3,M.rot,.2),pt.scale.setScalar(M.scale),pt.updateMatrix(),Ct.setMatrixAt(z,pt.matrix),Ct.setColorAt(z,hn(["#cb9d59","#6d7341","#aa7044","#c5ad62"][z%4]))}),l.add(Ct);const Ot=[];for(let M=0;M<A.length;M++)for(let z=0;z<(A[M].rich?65:30);z++)Ot.push({spot:M,phase:a()*Ue,phase2:a()*Ue,r:.25+a()*(A[M].rich?2.3:1.35),height:.45+a()*1.9,speed:.65+a()*1.7,rank:z});const Ut=A.map(()=>[]);for(const M of Ot)Ut[M.spot].push(M);const re=new Ve({vertexColors:!0,roughness:.45,side:Ce}),$t=new wn(m1(),re,Ot.length);$t.instanceMatrix.setUsage(Ui),$t.frustumCulled=!1,$t.name="Fly swarms",$t.count=0,l.add($t);const qt=c?o1({group:l,layout:r,terrainHeight:D,surface:gs,insertPlatform:Bt,materials:X,rockGeos:ft,tube:Ke,leafGeometry:ts,bladeGeometry:$c,geography:h}):null;qt&&m.push(...qt.grips);function Ee(M,z){return c&&gs(M,z).type==="water"?r1(r,M,z,v.flow):{x:0,z:0,strength:0}}function Ne(M,z){return c&&f.some(F=>Math.hypot(M-F.x,z-F.z)<F.radius*.85)&&D(M,z)>x-.5}function Ze(M){x=M,lt.position.y=M,lt.updateMatrix(),Si.position.y=M-Qi,Si.updateMatrix();for(const z of St)z.y=.105+M-Qi}function We(M={}){if(!c)return!1;v={...v,...M.phase||{}},p=Qi+ns(Number(v.waterOffset)||0,-.75,.65),y||(Ze(p),y=!0);for(const F of A){const O=F.ecology?.habitat===v.foodShift?1.4:typeof v.foodShift=="string"?.45:1;F.regenMultiplier=O,F.ecology.activity=O}const z=M.nest;if(z&&Number.isFinite(z.x)&&Number.isFinite(z.z)){const F={id:"living-creek-nest",x:z.x,z:z.z,team:"ally",natural:!0,nestLevel:z.level??0,safe:z.safe,hp:1,maxHp:1};_?ja(_,F):_=Ao(F)}return qt.sync(M,x),!0}const De=64,Kt=new Ni(2,2),Ie=new jm;Kt.rotateX(-Math.PI/2),Ie.index=Kt.index,Ie.attributes.position=Kt.attributes.position,Ie.attributes.uv=Kt.attributes.uv;const Te=new Float32Array(De*3),yn=new Float32Array(De).fill(-100),wi=new Float32Array(De),_n=new Float32Array(De*3);Ie.setAttribute("aCenter",new fr(Te,3)),Ie.setAttribute("aStart",new fr(yn,1)),Ie.setAttribute("aSize",new fr(wi,1)),Ie.setAttribute("aTint",new fr(_n,3)),Ie.instanceCount=De;const qi=new Zn({transparent:!0,depthWrite:!1,side:Ce,uniforms:{uTime:{value:0}},vertexShader:"attribute vec3 aCenter; attribute float aStart; attribute float aSize; attribute vec3 aTint; uniform float uTime; varying vec2 vUv; varying float vLife; varying vec3 vTint; void main(){vUv=uv; vLife=(uTime-aStart)/2.4; vTint=aTint; vec3 p=position*aSize*(.35+clamp(vLife,0.,1.)*3.8)+aCenter; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}",fragmentShader:"varying vec2 vUv;varying float vLife;varying vec3 vTint;void main(){if(vLife<0.||vLife>1.)discard;float r=length(vUv-.5)*2.;float band=exp(-pow((r-.82)/(.026+vLife*.018),2.))* .58+exp(-pow((r-.64)/.026,2.))*.22;float a=band*pow(1.-vLife,1.6);gl_FragColor=vec4(vTint,a);}"}),Xe=new Jt(Ie,qi);Xe.frustumCulled=!1,Xe.renderOrder=2,l.add(Xe);let In=0,Tn=0;const Je=1100,Qe=new Float32Array(Je*3),Bs=new Float32Array(Je*3),hi=new Float32Array(Je),Eo=new Float32Array(Je),zh=Array.from({length:Je},()=>({life:0,max:1,vx:0,vy:0,vz:0,water:!0}));let Sf=0;const Ei=new Se;Ei.setAttribute("position",new un(Qe,3).setUsage(Ui)),Ei.setAttribute("aColor",new un(Bs,3).setUsage(Ui)),Ei.setAttribute("aSize",new un(hi,1).setUsage(Ui)),Ei.setAttribute("aAlpha",new un(Eo,1).setUsage(Ui));const wf=new Zn({transparent:!0,depthWrite:!1,uniforms:{uScale:{value:500}},vertexShader:"attribute vec3 aColor;attribute float aSize;attribute float aAlpha;uniform float uScale;varying vec3 vColor;varying float vAlpha;void main(){vColor=aColor;vAlpha=aAlpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*uScale/max(.1,-mv.z),1.,35.);}",fragmentShader:"varying vec3 vColor;varying float vAlpha;void main(){vec2 p=gl_PointCoord-.5;float d=length(p)*2.;if(d>1.)discard;float shade=.6+.4*max(0.,1.-length(p-vec2(-.12,.12))*2.);gl_FragColor=vec4(vColor*shade,smoothstep(1.,.55,d)*vAlpha);}"}),$a=new Am(Ei,wf);$a.frustumCulled=!1,$a.renderOrder=3,l.add($a);function Ef(M,z,F){const O=In++%De;Te.set([M.x,c?(M.y??x)+.025:Math.max(-.005,(M.y??0)+.025),M.z],O*3),yn[O]=Tn,wi[O]=.7+z*.7,hn(F??"#c2e1d5").toArray(_n,O*3);for(const W of["aCenter","aStart","aSize","aTint"])Ie.attributes[W].needsUpdate=!0}function Dh(M,z,F,O){const k=Math.min(90,Math.round(18+z*21)),W=hn(F??(O?"#b2d7ce":"#d5bc80"));for(let j=0;j<k;j++){const q=Sf++%Je,it=zh[q],dt=a()*Ue,Tt=(.6+a()*2.7)*Math.sqrt(z);it.life=it.max=.5+a()*.8,it.vx=Math.cos(dt)*Tt,it.vz=Math.sin(dt)*Tt,it.vy=(1.5+a()*4)*Math.sqrt(z),it.water=O,Qe.set([M.x+(a()-.5)*.3,(M.y??0)+.12,M.z+(a()-.5)*.3],q*3),W.clone().multiplyScalar(.85+a()*.3).toArray(Bs,q*3),hi[q]=(.045+a()*.085)*(O?1:.8),Eo[q]=.9}Ei.attributes.aColor.needsUpdate=!0,Ei.attributes.aSize.needsUpdate=!0}function Tf(M,z=1,F){z=ns(z,.1,4),Ef({x:M.x,y:c?x+.01:.01,z:M.z},z,F),Dh({x:M.x,y:c?x+.03:.03,z:M.z},z,F,!0)}function Af(M,z="#e9cb87",F=1){Dh(M,F,z,!1)}function Ih(M,z,F,O=1){const k=[],W=[],j=[],q=[],it=Bi(O),dt=16,Tt=20;for(let Dt=0;Dt<=dt;Dt++)for(let kt=0;kt<=Tt;kt++){const oe=kt/Tt*2-1,Ae=Dt/dt,Re=.5+Math.sqrt(Math.max(0,1-oe*oe))*F+.06*Math.sin(Ae*23+oe*5),me=oe*M*(.97+.025*Math.sin(Ae*19));k.push(me,Re,(Ae-.5)*z),W.push(kt/Tt,Dt/dt),hn("#809549").multiplyScalar(.85+it()*.23).toArray(q,q.length)}for(let Dt=0;Dt<dt;Dt++)for(let kt=0;kt<Tt;kt++){const oe=Dt*(Tt+1)+kt,Ae=oe+Tt+1;j.push(oe,Ae,oe+1,Ae,Ae+1,oe+1)}const Zt=new Se;return Zt.setAttribute("position",new Gt(k,3)),Zt.setAttribute("uv",new Gt(W,2)),Zt.setAttribute("color",new Gt(q,3)),Zt.setIndex(j),Zt.computeVertexNormals(),Zt}function Ya(M,z,F){const O=new te,k=new Ve({color:"#a6bf76",map:B,vertexColors:!0,roughness:.78,side:Ce});F.push(k);const W=Ih(1.75,3.8,1.95,s+Math.round(M*7));F.push(W);const j=new Jt(W,k);j.castShadow=!0,j.receiveShadow=!0,O.add(j);for(let q=0;q<8;q++){const it=-1.85+q*.53,dt=[];for(let Zt=0;Zt<=12;Zt++){const Dt=Zt/12*Math.PI;dt.push([Math.cos(Dt)*1.75,.5+Math.sin(Dt)*1.96+.025,it+.025*Math.sin(Dt*4)])}const Tt=Ke(dt,.038,X.reed,18);F.push(Tt.geometry),O.add(Tt)}for(let q of[-1,1])for(let it=0;it<5;it++){const dt=-1.6+it*.8,Tt=Ke([[q*1.68,-.08,dt],[q*1.7,.45,dt],[q*1.38,1.5,dt]],.052,X.bark,5);F.push(Tt.geometry),O.add(Tt)}for(let q=0;q<7;q++){const it=.16+q*.12,dt=Ke([[-1.65,it,-1.8],[0,it+.025,-1.88],[1.65,it,-1.8]],.036,X.reed,8);F.push(dt.geometry),O.add(dt)}return ii(O,F,new Set([j])),O.scale.setScalar(M),O.userData.roof=j,O}const kr={player:"#8ecf75",friendly:"#8ecf75",ally:"#8ecf75",enemy:"#cf7554",neutral:"#ceb785"};function Hs(M){if(typeof M=="string"&&M.startsWith("enemy")){const z=["#e8aa70","#d8786b","#b9ad81","#a9a0d4","#8dc2b8"],F=parseInt(M.replace(/\D/g,""),10)||0;return z[F%z.length]}return kr[M]||kr.neutral}const Za=new Map;function To(M){if(Za.has(M))return Za.get(M);const z=["player","ally","friendly"].includes(M),F=M==="neutral",O=(parseInt(String(M).replace(/\D/g,""),10)||0)%5,k=Sh(256,(W,j)=>{W.fillStyle="#eee9cb",W.fillRect(0,0,j,j);for(let it=0;it<256;it+=4)W.fillStyle=it%8?"#ded9bd":"#f3eed3",W.fillRect(it,0,1,j),W.fillRect(0,it,j,1);W.save(),W.translate(38,23),W.scale(2.8,2.8),W.fillStyle=z?"#194333":F?"#494633":"#472c29",W.strokeStyle="#fff2c9",W.lineWidth=2,W.beginPath(),W.moveTo(32,3),W.lineTo(59,14),W.lineTo(56,44),W.quadraticCurveTo(53,55,32,68),W.quadraticCurveTo(11,55,8,44),W.lineTo(5,14),W.closePath(),W.fill(),W.stroke(),W.lineWidth=3.2,W.lineCap="round",W.lineJoin="round";const q=it=>{W.beginPath(),it.forEach((dt,Tt)=>Tt?W.lineTo(...dt):W.moveTo(...dt)),W.stroke()};if(z)W.beginPath(),W.moveTo(43,20),W.bezierCurveTo(28,17,18,26,21,38),W.bezierCurveTo(24,48,35,47,40,37),W.bezierCurveTo(43,30,40,24,43,20),W.stroke(),q([[20,51],[37,27]]),q([[28,40],[23,32]]),q([[32,35],[39,34]]);else if(F)q([[24,27],[32,19],[40,27]]),q([[32,19],[32,49]]),q([[23,40],[32,49],[41,40]]);else if(O===0)q([[20,19],[27,31],[22,44]]),q([[44,19],[37,31],[42,44]]),q([[28,46],[36,46]]);else if(O===1)q([[22,18],[18,36],[32,49],[46,36],[42,18]]),q([[25,30],[32,36],[39,30]]);else if(O===2)for(const[it,dt]of[[21,20],[32,15],[43,20]])q([[it,dt],[it,49]]),q([[it-4,dt+6],[it+4,dt+6]]);else O===3?(W.beginPath(),W.moveTo(44,17),W.bezierCurveTo(15,9,11,48,32,52),W.bezierCurveTo(39,53,44,50,47,45),W.bezierCurveTo(29,43,26,26,44,17),W.stroke()):q([[18,24],[25,30],[32,17],[39,30],[46,24],[41,46],[23,46],[18,24]]);W.restore()});return k.wrapS=k.wrapT=rs,Za.set(M,k),b.push(k),k}function Rf(M,z,F=0){const O=new te;O.name="Woven reed courtyard and rooted foundations";const k=5.68;for(let W=0;W<43;W++){const j=-5.58+W*.266,q=Math.sqrt(Math.max(0,k*k-j*j))*(.97+.02*Math.sin(W*1.7)),it=Ke([[-q,-.045,j],[-q*.25,-.035,j+.022],[q*.4,-.04,j-.018],[q,-.045,j+.015]],.077,X.bark,7);it.receiveShadow=!0,z.push(it.geometry),O.add(it)}for(let W=0;W<25;W++){const j=-5.4+W*.45,q=Math.sqrt(Math.max(0,k*k-j*j))*.98,it=Ke([[j,.018,-q],[j+.025,.028,0],[j-.018,.02,q]],.027,X.reed,10);z.push(it.geometry),O.add(it)}for(let W=0;W<16;W++){const j=W/16*Ue,q=Math.cos(j)*5.1,it=Math.sin(j)*5.1,dt=(D(M.position.x+(q*Math.cos(F)+it*Math.sin(F))*ie,M.position.z+(it*Math.cos(F)-q*Math.sin(F))*ie)-M.position.y)/ie,Tt=Ke([[q,Math.min(-.18,dt-.15),it],[q+.03,-.35,it-.02],[q,-.08,it]],.095,X.bark,5);z.push(Tt.geometry),O.add(Tt)}ii(O,z),M.add(O),M.userData.foundation=O}function Cf(M,z){const F=new te,O=Ke([[0,0,0],[.04,1.6,0],[-.03,3.1,.02]],.047,X.bark,7);z.push(O.geometry),F.add(O);const k=new Se,W=[0,2.93,0,.9,2.8,.09,1.13,2.12,.02,.6,2.25,-.03,0,2.18,0],j=[0,1,1,1,1,0,.5,.1,0,0];k.setAttribute("position",new Gt(W,3)),k.setAttribute("uv",new Gt(j,2)),k.setIndex([0,1,3,1,2,3,0,3,4]),k.computeVertexNormals();const q=new Ve({color:Hs(M),roughness:.8,side:Ce,map:To(M)}),it=new Jt(k,q);return it.castShadow=!0,F.add(it),F.userData.flag=it,F.userData.emblemTeam=M,z.push(k,q),F}function Pf(M,z,F){const O=Gy,k=Vy,W=za,j=.11,q=new te;q.name="Enclosed creek castle",M.add(q);const it=new te;it.name="Reinforced castle perimeter",M.add(it);const dt=Math.asin((k/2+.25)/O),Tt=44,Zt=(Ue-dt*2)/Tt,Dt=[],kt=[],oe=2*(O+.65)*Math.tan(Zt/2)+.08;for(let st=0;st<Tt;st++){const bt=dt+Zt*(st+.5),ae=Math.sin(bt)*O,je=Math.cos(bt)*O;Dt.push({x:ae,z:je,y:j+W/2,w:oe,h:W,d:Wy,ry:bt});for(const He of[-.29,.29]){const pe=bt+Zt*He;Dt.push({x:Math.sin(pe)*O,z:Math.cos(pe)*O,y:j+W+.37,w:.76,h:.74,d:1.2,ry:pe})}kt.push({x:Math.sin(bt)*(O+.64),z:Math.cos(bt)*(O+.64),y:j+1.65,w:oe*.7,h:3.1,d:.5,ry:bt}),kt.push({x:Math.sin(bt)*(O+.4),z:Math.cos(bt)*(O+.4),y:j+3.5,w:oe*1.01,h:.28,d:.9,ry:bt})}const Ae=[Math.PI/4,Math.PI*3/4,Math.PI*5/4,Math.PI*7/4],Re=[];for(const st of Ae){const bt=Math.sin(st)*(O+.15),ae=Math.cos(st)*(O+.15);Re.push({x:bt,z:ae});for(let je=0;je<10;je++){const He=je/10*Ue;Dt.push({x:bt+Math.sin(He)*1.42,z:ae+Math.cos(He)*1.42,y:j+6.15,w:.6,h:.85,d:.66,ry:He})}}for(const st of[-1,1])Dt.push({x:st*(k/2+.62),z:O,y:j+2.8,w:1.24,h:5.6,d:2}),Dt.push({x:st*(k/2+.62),z:O,y:j+5.95,w:1.6,h:.7,d:2.35}),kt.push({x:st*(k/2+.62),z:O+1.05,y:j+2.4,w:1.32,h:4.8,d:.25});Dt.push({x:0,z:O,y:j+4.85,w:k+1.2,h:.78,d:1.75});const me=(st,bt,ae,je)=>{const He=new Gi(1,1,1),pe=new wn(He,je,ae.length);return F.push(He),pe.name=bt,pe.castShadow=!0,pe.receiveShadow=!0,ae.forEach((rn,Gf)=>{pt.position.set((rn.x||0)/ie,(rn.y||0)/ie,(rn.z||0)/ie),pt.rotation.set(rn.rx||0,rn.ry||0,rn.rz||0),pt.scale.set(rn.w/ie,rn.h/ie,rn.d/ie),pt.updateMatrix(),pe.setMatrixAt(Gf,pt.matrix)}),st.add(pe),pe},sn=me(q,"Continuous moss-stone walls and crenellations",Dt,X.mossRock);sn.userData.fullCount=Dt.length,sn.userData.firstCoursesCount=Tt*3,me(it,"Whole-ring stone buttresses and gate reinforcement",kt,X.rock);const tn=new Us(1,1.12,1,12,1),cn=new wn(tn,X.mossRock,4);F.push(tn),cn.name="Four castle defence towers",cn.castShadow=!0,cn.receiveShadow=!0,Re.forEach((st,bt)=>{pt.position.set(st.x/ie,(j+2.9)/ie,st.z/ie),pt.rotation.set(0,Ae[bt],0),pt.scale.set(1.65/ie,5.8/ie,1.65/ie),pt.updateMatrix(),cn.setMatrixAt(bt,pt.matrix)}),q.add(cn);const mn=ts(1,1,.28),Mn=new wn(mn,X.leaf,4);F.push(mn),Mn.name="Folded leaf tower roofs",Mn.castShadow=!0,Re.forEach((st,bt)=>{pt.position.set(st.x/ie,(j+6.68)/ie,st.z/ie),pt.rotation.set(0,Ae[bt],0),pt.scale.set(2/ie,2.4/ie,2/ie),pt.updateMatrix(),Mn.setMatrixAt(bt,pt.matrix)}),q.add(Mn);const Jn=new te;Jn.name="Working south castle gate",Jn.position.set(0,j/ie,O/ie),q.add(Jn);const Gs=[];for(const st of[-1,1]){const bt=new te;bt.position.x=st*k/(2*ie),bt.name=st<0?"Left hinged gate":"Right hinged gate",Jn.add(bt);const ae=[],je=[],He=k/2;for(let pe=0;pe<7;pe++)ae.push({x:-st*((pe+.5)*He/7),y:W/2,z:0,w:He/7+.025,h:W-.08,d:.36});for(const pe of[.65,1.9,3.2])je.push({x:-st*He/2,y:pe,z:.23,w:He-.1,h:.22,d:.2});me(bt,"Bound timber gate leaf",ae,X.bark),me(bt,"Gate cross braces",je,X.reed),Gs.push(bt)}const xs=new te;xs.name="Breached gate fallen slabs",Jn.add(xs),me(xs,"Broken gate timber",[{x:-1.45,y:.18,z:1.5,w:2.8,h:.3,d:3.5,ry:.18},{x:1.6,y:.23,z:.9,w:2.7,h:.35,d:3.2,ry:-.24}],X.bark);const Fr=new Ni(1.7/ie,1.9/ie),Or=new Ve({map:To(z.team),color:Hs(z.team),side:Ce,roughness:.85});F.push(Fr,Or);const Vs=new Jt(Fr,Or);return Vs.name="Castle gate clan crest",Vs.position.set(0,(j+5.2)/ie,(O+1.02)/ie),q.add(Vs),M.userData.fortification=q,M.userData.palisade=it,M.userData.gate=Jn,M.userData.gateLeaves=Gs,M.userData.fallenGate=xs,M.userData.gateCrest=Vs,M.userData.fortWalls=sn,M.userData.fortTowers=cn,M.userData.fortTowerRoofs=Mn,M.userData.fortificationGeometry={radius:O,gateWidth:k,wallHeight:W,gateDirection:{x:0,z:1},towerCount:4},q}function zf(M){const z=Ya(1,kr.ally,M);z.name="Stone keep beneath woven leaf roof",z.userData.groundWalls=[];const F=new te;F.name="Enclosed central keep";const O=(k,W,j,q,it,dt,Tt=X.mossRock)=>{const Zt=new Gi(q,it,dt),Dt=new Jt(Zt,Tt);M.push(Zt),Dt.position.set(k,W,j),Dt.castShadow=!0,Dt.receiveShadow=!0,F.add(Dt),W-it/2<.03&&z.userData.groundWalls.push({minX:k-q/2,maxX:k+q/2,minZ:j-dt/2,maxZ:j+dt/2,height:W+it/2})};O(-1.6,.68,0,.26,1.36,3.45),O(1.6,.68,0,.26,1.36,3.45),O(0,.68,-1.65,3.05,1.36,.25);for(const k of[-1,1])O(k*1.14,.68,1.64,.9,1.36,.26);O(0,1.22,1.64,1.45,.28,.27);for(const k of[-1.23,1.23])for(const W of[-1.34,1.34]){O(k,1.36,W,.58,2.72,.58);for(const j of[-.2,.2])for(const q of[-.2,.2])O(k+j,2.83,W+q,.19,.3,.19,X.rock)}return ii(F,M),z.add(F),z}function Lh(M){const z=ws+sa+3,F=k=>Math.hypot(k.x-M.x,k.z-M.z)<z,O=k=>[...R.values()].some(W=>Math.hypot(k.x-W.x,k.z-W.z)<ws-2);li.forEach((k,W)=>{F(k)&&(pt.position.set(k.x,D(k.x,k.z),k.z),pt.rotation.set(0,k.angle,0),pt.scale.set(.65+k.scale*.25,k.scale,.65+k.scale*.25),O(k)&&pt.scale.setScalar(0),pt.updateMatrix(),ci.setMatrixAt(W,pt.matrix))}),ci.finish(),Ur.forEach((k,W)=>{F(k)&&(pt.position.set(k.x+.12,D(k.x,k.z),k.z),pt.rotation.set(0,k.angle,0),pt.scale.setScalar(O(k)?0:.7+k.scale*.4),pt.updateMatrix(),Xi.setMatrixAt(W,pt.matrix))}),Xi.finish(),A.forEach((k,W)=>{F(k)&&(k.y=gs(k.x,k.z).height+.25,nt[W].position.y=k.y-.2,nt[W].updateMatrix())}),et.forEach((k,W)=>{F(k)&&(pt.position.set(k.x,A[k.spot].y-.25+k.groundOffset,k.z),pt.rotation.set(.3,k.rot,.2),pt.scale.setScalar(k.scale),pt.updateMatrix(),Ct.setMatrixAt(W,pt.matrix))}),Ct.instanceMatrix.needsUpdate=!0,Ct.computeBoundingBox(),Ct.computeBoundingSphere()}function Uh(M,z){for(const k of R.values())if(Math.hypot(k.x-M,k.z-z)<.01)return k.elevation;const F=ce.find(k=>Math.hypot(k.x-M,k.z-z)<.01);let O=F?Math.fround(F.elevation):Math.max(.35,Os(M,z));if(!F){const k=ws+le,W=Math.max(0,Math.floor((M-k+Mt)/le)),j=Math.min(216,Math.ceil((M+k+Mt)/le)),q=Math.max(0,Math.floor((z-k+Mt)/le)),it=Math.min(216,Math.ceil((z+k+Mt)/le));for(let dt=q;dt<=it;dt++)for(let Tt=W;Tt<=j;Tt++){const Zt=dt*ze+Tt;Math.hypot(ne.getX(Zt)-M,ne.getZ(Zt)-z)<=k&&(O=Math.max(O,ne.getY(Zt)))}}return O}function Df(M){const z=Uh(M.x,M.z),F={id:M.id,x:M.x,z:M.z,elevation:z};return R.set(M.id,F),w(F),Lh(F),F}function Ao(M,z={}){if((c||M.natural===!0)&&!z.preview){const st=l1(M,{terrainHeight:D,materials:X,rockGeos:ft,tube:Ke,leafGeometry:ts,mergeStaticParts:ii,teamColor:Hs});return l.add(st),E.add(st),g.push(st.userData.refuge),st}const F=!!z.preview,O=F?null:Df(M),k=new te;k.name="Shelter "+(M.id??""),k.position.set(M.x,O?.elevation??0,M.z),k.scale.setScalar(ie),k.userData.id=M.id,k.userData.radius=Cs,k.userData.owned=[],k.userData.terrain=O;const W=k.userData.owned;Rf(k,W,Number.isFinite(M.yaw)?M.yaw:0),F||(k.userData.support=Bt({id:"shelter-"+M.id,type:"shelter",x:M.x,z:M.z,y:k.position.y+.11,radius:Cs-.2}),k.userData.landmark=Bt({id:"castle-land-"+M.id,type:"land",x:M.x,z:M.z,y:k.position.y,radius:ws+sa*.45})),Pf(k,M,W);const j=zf(W);j.position.set(-.55,.04,-.5),k.add(j),k.userData.core=j,k.userData.keepCollision={rects:j.userData.groundWalls.map(st=>({minX:(st.minX+j.position.x)*ie,maxX:(st.maxX+j.position.x)*ie,minZ:(st.minZ+j.position.z)*ie,maxZ:(st.maxZ+j.position.z)*ie,height:(st.height+j.position.y)*ie})),door:{x:j.position.x*ie,z:(j.position.z+1.64)*ie}};const q=Cf(M.team,W);q.position.set(1.8,0,1.1),k.add(q),k.userData.banner=q;const it=new te;it.name="Additional sleeping leaves";const dt=Ya(.62,kr[M.team],W);dt.position.set(-3,.01,.2),dt.rotation.y=-.5,it.add(dt),k.add(it),k.userData.extra=it;const Tt=new te;Tt.name="Hatchery";const Zt=Ya(.52,kr[M.team],W);Zt.position.set(3.05,0,-1.8),Zt.rotation.y=.7,Tt.add(Zt);for(let st=0;st<5;st++){const bt=[];for(let je=0;je<=24;je++){const He=je/24*Ue;bt.push([3.05+Math.cos(He)*.74,.06+st*.065,-1.7+Math.sin(He)*.63])}const ae=Ke(bt,.035,X.reed,25);W.push(ae.geometry),Tt.add(ae)}ii(Tt,W),k.add(Tt),k.userData.nursery=Tt;const Dt=new te;Dt.name="Leaf training yard and woven sparring dummies",Dt.position.set(-2.9,.07,-3.2);for(let st=0;st<3;st++){const bt=-.82+st*.8,ae=st%2?-.2:.2,je=new Jt(ts(.46,.65,.04),X.leaf);je.position.set(bt,.025,ae+.6),je.rotation.y=(st-1)*.35,W.push(je.geometry),Dt.add(je);for(const pe of[-.21,.21]){const rn=Ke([[bt+pe,-.02,ae-.25],[bt+pe*.3,.48,ae-.3],[bt,.96,ae-.25]],.035,X.bark,5);W.push(rn.geometry),Dt.add(rn)}const He=Ke([[bt-.4,.64,ae-.2],[bt,.72,ae-.28],[bt+.4,.64,ae-.2]],.041,X.reed,6);W.push(He.geometry),Dt.add(He);for(let pe=0;pe<3;pe++){const rn=new Jt(ts(.23,.37,.15),X.leaf);rn.position.set(bt+(pe-1)*.06,.59,ae-.19),rn.rotation.set(Math.PI/2,(pe-1)*.25,(pe-1)*.3),W.push(rn.geometry),Dt.add(rn)}for(const pe of[-.12,.12]){const rn=Ke([[bt+pe,.89,ae-.22],[bt+pe*1.45,1.09,ae-.22],[bt+pe*.5,1.07,ae-.19],[bt+pe,.89,ae-.22]],.025,X.reed,10);W.push(rn.geometry),Dt.add(rn)}}for(const st of[-1.2,1.2]){const bt=Ke([[st,-.04,-.65],[st*.98,.75,-.68],[st,.98,-.65]],.04,X.bark,5);W.push(bt.geometry),Dt.add(bt)}for(let st=0;st<2;st++){const bt=Ke([[-1.2,.45+st*.28,-.65],[0,.38+st*.28,-.7],[1.2,.45+st*.28,-.65]],.025,X.reed,10);W.push(bt.geometry),Dt.add(bt)}ii(Dt,W),k.add(Dt),k.userData.training=Dt,k.userData.trainingPoint=new L(M.x-2.9*ie,k.position.y+.12,M.z-2.5*ie);const kt=new te;kt.name="Leaf-wrapped food cache",kt.position.set(-2.8,.04,2.2);const oe=new wn(Me,X.fruit,15);for(let st=0;st<15;st++)pt.position.set(st%4*.32-.5,Math.floor(st/8)*.25+.15,Math.floor(st/4)%2*.35),pt.scale.setScalar(.22+st%3*.025),pt.rotation.set(st*.7,st*.4,0),pt.updateMatrix(),oe.setMatrixAt(st,pt.matrix),oe.setColorAt(st,hn(st%3?"#b7b06c":"#6d673f"));kt.add(oe);for(let st=0;st<3;st++){const bt=Ke([[-.85,.05,-.3+st*.45],[0,.02,-.3+st*.45],[.85,.08,-.3+st*.45]],.075,X.bark,5);W.push(bt.geometry),kt.add(bt)}const Ae=new Jt(ts(1,.8,.23),X.leaf);Ae.position.set(0,.5,.1),Ae.rotation.z=.17,W.push(Ae.geometry),kt.add(Ae),ii(kt,W),k.add(kt),k.userData.storage=kt,k.userData.foodMesh=oe,k.userData.storageCover=Ae;const Re=new te;Re.name="Lookout perch",Re.position.set(3.1,0,2.5);for(let st=0;st<3;st++){const bt=st/3*Ue,ae=Ke([[Math.cos(bt)*.7,-.1,Math.sin(bt)*.7],[Math.cos(bt)*.44,1.4,Math.sin(bt)*.44],[Math.cos(bt)*.35,2.65,Math.sin(bt)*.35]],.085,X.bark,7);W.push(ae.geometry),Re.add(ae)}for(let st=0;st<8;st++){const bt=-.6+st*.17,ae=Ke([[-.7,2.35,bt],[0,2.32,bt],[.7,2.36,bt]],.06,X.reed,4);W.push(ae.geometry),Re.add(ae)}const me=new Jt(ts(1.1,.9,.08),X.leaf);me.position.y=3.15,me.rotation.x=.17,W.push(me.geometry),Re.add(me);for(let st=0;st<6;st++){const bt=Ke([[-.25,st*.34,.63],[.25,st*.34,.63]],.035,X.reed,2);W.push(bt.geometry),Re.add(bt)}ii(Re,W),k.add(Re),k.userData.watchtower=Re;const sn=new wn(ft[1],X.mossRock,25);for(let st=0;st<25;st++){const bt=st/25*Ue;pt.position.set(Math.cos(bt)*2.15,-.12,Math.sin(bt)*2.35-.5),pt.rotation.set(0,bt,0),pt.scale.set(.25,.25,.25),pt.updateMatrix(),sn.setMatrixAt(st,pt.matrix)}k.add(sn);const tn=new te;tn.name="Collapsed shelter remains";const cn=new Ve({color:"#839061",map:B,roughness:.94,side:Ce});W.push(cn);for(let st=0;st<6;st++){const bt=Ih(.62+st%3*.16,1.35+st%2*.55,.14+st%3*.05,s+st*19),ae=new Jt(bt,cn);ae.position.set(-1.3+st%3*.85,-.46+st%2*.04,-1.5+Math.floor(st/3)*1.7),ae.rotation.set((st%2-.5)*.24,st*1.71,(st%3-1)*.13),ae.castShadow=!0,W.push(bt),tn.add(ae)}for(let st=0;st<22;st++){const bt=st*2.399,ae=.65+st%5*.27,je=Math.cos(bt)*(st<14?1.2:3.4),He=Math.sin(bt)*(st<14?1.6:2.8)-.3,pe=Ke([[je,.055,He],[je+Math.cos(bt+.7)*ae*.6,.11+st%3*.07,He+Math.sin(bt+.7)*ae*.6],[je+Math.cos(bt+.7)*ae,.04+st%4*.06,He+Math.sin(bt+.7)*ae]],st%2?.045:.065,st%2?X.reed:X.bark,4);pe.castShadow=!0,W.push(pe.geometry),tn.add(pe)}ii(tn,W),k.add(tn),k.userData.ruin=tn;const mn=new wn(Me,X.fruit,8);mn.name="Supplies exposed in the ruins";for(let st=0;st<8;st++)pt.position.set(-.5+st%4*.29,.12+Math.floor(st/4)*.08,1.35+Math.floor(st/4)*.31),pt.rotation.set(st*.43,st*1.31,.2),pt.scale.setScalar(.16+st%3*.025),pt.updateMatrix(),mn.setMatrixAt(st,pt.matrix),mn.setColorAt(st,hn(st%2?"#a99958":"#d9a253"));k.add(mn),k.userData.looseLoot=mn;const Mn=new Ve({color:"#edc371",emissive:"#e5a64c",emissiveIntensity:.7,roughness:.7});W.push(Mn);const Jn=new Jt(Me,Mn);Jn.position.set(1.7,.55,1.1),Jn.scale.set(.15,.22,.15),k.add(Jn),k.userData.lamp=Jn;const Gs=new $m("#ffd098",1.8,25,2);Gs.position.set(0,2.3,1.8),k.add(Gs),k.userData.light=Gs,k.updateMatrixWorld(!0),k.userData.buildingGroups={},k.userData.defaultPlacements={};for(const[st,bt]of Object.entries({store:"storage",nursery:"nursery",watchtower:"watchtower",training:"training"})){const ae=k.userData[bt],je=new Nn().setFromObject(ae),He=k.worldToLocal(je.getCenter(new L)),pe=new te;pe.name=ae.name+" placement",pe.position.set(He.x,ae.position.y,He.z),k.add(pe),ae.position.sub(pe.position),pe.add(ae),k.userData[bt]=pe,k.userData.buildingGroups[st]=pe,k.userData.defaultPlacements[st]={x:He.x*ie,z:He.z*ie,yaw:0}}k.updateMatrixWorld(!0);const xs=new Nn().setFromObject(j),Fr=k.worldToLocal(xs.getCenter(new L)),Or=xs.getSize(new L);k.userData.coreFootprint={x:Fr.x*ie,z:Fr.z*ie,width:Or.x,depth:Or.z},F||(l.add(k),E.add(k)),ja(k,M);const Vs=new Set([k.userData.core.userData.roof,k.userData.storageCover,k.userData.banner.userData.flag]);return k.traverse(st=>{st.isMesh&&!Vs.has(st)&&(st.updateMatrix(),st.matrixAutoUpdate=!1)}),k}function ja(M,z={}){if(!M)return;if(M.userData.natural)return rf(M,z,Hs);const F=M.userData.visualState||{},O={...F,...z},k=Math.max(1,O.tier??1),W=O.buildings||{},j=ns((O.hp??O.maxHp??100)/(O.maxHp??100),0,1),q=!!O.destroyed||j<=0,it=O.team??F.team??"neutral",dt={};for(const[Re,me]of Object.entries(O.buildingPlacements||{}))M.userData.buildingGroups[Re]&&me&&Number.isFinite(me.x)&&Number.isFinite(me.z)&&Number.isFinite(me.yaw??0)&&(dt[Re]={x:me.x,z:me.z,yaw:me.yaw??0});M.userData.visualState={team:it,tier:k,hp:O.hp,maxHp:O.maxHp,buildings:{...W},buildingPlacements:dt,yaw:Number.isFinite(O.yaw)?O.yaw:0,storage:O.storage,resources:O.resources,lootTaken:!!O.lootTaken,gateHp:O.gateHp,gateOpen:!!O.gateOpen,destroyed:q,underConstruction:!!O.underConstruction,constructionProgress:ns(Number(O.constructionProgress)||0,0,1)},M.rotation.y=M.userData.visualState.yaw;for(const[Re,me]of Object.entries(M.userData.buildingGroups)){const sn=dt[Re]||M.userData.defaultPlacements[Re];me.position.x=sn.x/ie,me.position.z=sn.z/ie,me.rotation.y=sn.yaw}const Tt=M.userData.buildingGroups.training;M.updateMatrixWorld(!0),M.userData.trainingPoint.copy(Tt.getWorldPosition(new L)),M.userData.trainingPoint.y=M.position.y+.12,M.userData.team=it,M.userData.tier=k,M.userData.health=j,M.userData.destroyed=q,M.userData.banner.userData.flag.material.color.set(Hs(it)),M.userData.banner.userData.emblemTeam!==it&&(M.userData.banner.userData.flag.material.map=To(it),M.userData.banner.userData.flag.material.needsUpdate=!0,M.userData.banner.userData.emblemTeam=it),M.userData.gateCrest.material.color.set(Hs(it)),M.userData.gateCrest.material.map=To(it);const Zt=!!(W.storage??W.store??!1);M.userData.core.visible=!q,M.userData.extra.visible=!q&&k>=2,M.userData.ruin.visible=q,M.userData.nursery.visible=!q&&!!(W.nursery||W.hatchery||W.spawn||W.breeding),M.userData.training.visible=!q&&!!(W.training||W.trainingGround||W.drill),M.userData.watchtower.visible=!q&&!!(W.watchtower||W.tower||W.guards);const Dt=!q&&!!(W.palisade||W.walls||W.wall||W.defense);M.userData.fortification.visible=!q,M.userData.palisade.visible=Dt;const kt=Number.isFinite(O.gateHp)&&O.gateHp<=0;M.userData.gate.userData.breached=kt,M.userData.gate.userData.open=!!O.gateOpen,M.userData.fallenGate.visible=kt;for(let Re=0;Re<2;Re++){const me=M.userData.gateLeaves[Re];me.visible=!kt,me.rotation.y=O.gateOpen?(Re===0?-1:1)*Math.PI*.52:0}M.userData.core.rotation.z=q?0:(1-j)*.09,M.userData.core.userData.roof.scale.y=q?1:.78+.22*j;let oe=typeof O.storage=="number"?O.storage:O.storage?.food??O.resources??0;Number.isFinite(oe)||(oe=0),oe=Math.max(0,oe);const Ae=oe>0&&!O.lootTaken;M.userData.storage.visible=Zt&&(!q||Ae),M.userData.storage.rotation.z=q?-.08:0,M.userData.foodMesh.count=q&&!Ae?0:Math.min(15,Math.ceil(oe/8)),M.userData.storageCover.position.set(q?-.65:0,q?.1:.5,q?.52:.1),M.userData.storageCover.rotation.set(q?.28:0,0,q?-.32:.17),M.userData.looseLoot.visible=q&&Ae&&!Zt,M.userData.looseLoot.count=Math.min(8,Math.ceil(oe/5)),M.userData.banner.position.y=q?.035:0,M.userData.banner.rotation.set(q?.08:0,q?.35:0,q?1.49:j<.25?.22:0),M.userData.lamp.visible=!q,q&&(M.userData.light.visible=!1),kh(M),M.userData.collisionRevision=(M.userData.collisionRevision||0)+1}function kh(M){const z=M.userData.visualState||{},F=od({...z,mesh:M}),{stage:O,unfinished:k,wallHeight:W}=F,j=!!z.destroyed,q=M.userData.fortWalls,it=W/za;if(q.visible=!j&&O>=1,q.count=O===1?q.userData.firstCoursesCount:q.userData.fullCount,q.scale.y=it||1,q.position.y=.11*(1-(it||1))/ie,q.updateMatrix(),M.userData.fortification.visible=!j&&O>=1,M.userData.fortTowers.visible=!j&&O>=2,M.userData.fortTowerRoofs.visible=!j&&O>=3,M.userData.core.visible=!j&&O>=3,M.userData.gate.visible=!j&&!k,M.userData.gateCrest.visible=!j&&!k,M.userData.banner.visible=!k,k)for(const dt of["extra","nursery","training","watchtower","storage","palisade","lamp","light","looseLoot"])M.userData[dt].visible=!1;M.userData.constructionStage=O,M.userData.constructionWallHeight=W}function If(M,z,F){if(M?.type!=="shelter")return!1;const O=F?.mesh||[...E].find(q=>q.userData.id===(M.siteId||M.campId));if(!O?.userData?.fortWalls)return!1;const k=ns(Number(z)||0,0,1);F&&(F.constructionProgress=k);const W=O.userData.visualState||{};return W.constructionProgress=k,W.underConstruction=F?.underConstruction??W.underConstruction??!0,O.userData.visualState=W,od({...W,mesh:O}).stage!==O.userData.constructionStage&&(kh(O),O.userData.collisionRevision=(O.userData.collisionRevision||0)+1),!0}function Nh(M){if(!M)return;if(G?.userData.camp===M&&Nr(),l.remove(M),E.delete(M),M.userData.refuge){M.userData.refuge.active=!1;const F=g.indexOf(M.userData.refuge);F>=0&&g.splice(F,1)}M===_&&(_=null);for(const F of[M.userData.support,M.userData.landmark])if(F){const O=T.indexOf(F);O>=0&&T.splice(O,1);for(const k of U.values()){const W=k.indexOf(F);W>=0&&k.splice(W,1)}}const z=M.userData.terrain;z&&(R.delete(z.id),w(z),Lh(z)),M.traverse(F=>{F.isInstancedMesh&&F.dispose()});for(const F of M.userData.owned||[])F.dispose?.()}function Lf(M){if(c||!["shelter","store","nursery","watchtower","training"].includes(M))return null;const z=Ao({id:"construction-preview",x:0,z:0,team:"ally",tier:1,hp:350,maxHp:350,buildings:{},storage:{food:80}},{preview:!0});if(z.name="Construction preview: "+M,z.userData.previewType=M,z.userData.previewMaterials=[],M!=="shelter"){const O=z.userData.buildingGroups[M];for(const k of z.children)k.visible=k===O;O.visible=!0,O.position.x=O.position.z=0,O.rotation.y=0}const F=new Map;return z.traverse(O=>{if(O.isLight){O.visible=!1;return}if(!O.isMesh)return;O.castShadow=!1,O.receiveShadow=!1,O.renderOrder=8;const k=W=>{if(F.has(W))return F.get(W);const j=W.clone();return j.transparent=!0,j.opacity=.46,j.depthWrite=!1,j.polygonOffset=!0,j.polygonOffsetFactor=-1,j.polygonOffsetUnits=-1,F.set(W,j),z.userData.previewMaterials.push(j),z.userData.owned.push(j),j};O.material=Array.isArray(O.material)?O.material.map(k):k(O.material)}),S.add(z),l.add(z),Fh(z,{x:0,y:0,z:0,yaw:0,valid:!1}),z.visible=!1,z}function Fh(M,{x:z,y:F,z:O,yaw:k=0,valid:W=!1}={}){if(M?.userData.previewType&&(Number.isFinite(z)&&(M.position.x=z),Number.isFinite(F)&&(M.position.y=F),Number.isFinite(O)&&(M.position.z=O),M.rotation.y=Number.isFinite(k)?k:0,M.visible=!0,M.userData.previewValid!==!!W)){M.userData.previewValid=!!W;for(const j of M.userData.previewMaterials)j.color?.set(W?"#69ed89":"#ef665b"),j.emissive?.set(W?"#266c37":"#782d27"),"emissiveIntensity"in j&&(j.emissiveIntensity=.4)}}function Oh(M){!M||!S.has(M)||(S.delete(M),M.removeFromParent(),Nh(M))}function Nr(){if(!G)return;G.removeFromParent();const M=new Set,z=new Set;G.traverse(F=>{F.geometry&&M.add(F.geometry),F.material&&z.add(F.material)});for(const F of M)F.dispose();for(const F of z)F.dispose();G=null}function Uf(M){const z=M?.mesh||M;if(!z?.isObject3D)return Nr(),null;if(G?.userData.camp===z)return G;Nr(),G=new te,G.name="Construction courtyard guide",G.userData.camp=z;const F=(Cs-.2)/ie,O=.075,k=(it,dt,Tt,Zt=!1)=>{const Dt=new Se().setFromPoints(it),kt=new ph({color:dt,transparent:!0,opacity:Tt,depthWrite:!1}),oe=Zt?new Em(Dt,kt):new wm(Dt,kt);return oe.renderOrder=6,G.add(oe),oe},W=[];for(let it=0;it<96;it++){const dt=it/96*Ue;W.push(new L(Math.cos(dt)*F,O,Math.sin(dt)*F))}k(W,"#9fe5af",.78,!0);const j=[];for(let it=-7;it<=7;it++){const dt=it*.7;if(Math.abs(dt)>=F)continue;const Tt=Math.sqrt(F*F-dt*dt);j.push(new L(dt,O,-Tt),new L(dt,O,Tt),new L(-Tt,O,dt),new L(Tt,O,dt))}k(j,"#b7ddbc",.22);const q=(it,dt)=>{const Tt=it.x/ie,Zt=it.z/ie,Dt=it.width/(2*ie)+.025,kt=it.depth/(2*ie)+.025,oe=Math.cos(it.yaw||0),Ae=Math.sin(it.yaw||0),Re=O+.012,me=(tn,cn)=>new L(Tt+tn*oe+cn*Ae,Re,Zt+cn*oe-tn*Ae);k([me(-Dt,-kt),me(Dt,-kt),me(Dt,kt),me(-Dt,kt)],"#ec8a72",.8,!0).name=dt+" outline";const sn=[];for(let tn=-Dt-kt;tn<=Dt+kt;tn+=.42){const cn=[];for(const mn of[-Dt,Dt]){const Mn=tn-mn;Mn>=-kt&&Mn<=kt&&cn.push(me(mn,Mn))}for(const mn of[-kt,kt]){const Mn=tn-mn;Mn>-Dt&&Mn<Dt&&cn.push(me(Mn,mn))}cn.length===2&&sn.push(...cn)}k(sn,"#d9806c",.35).name=dt+" hatch"};return q(z.userData.coreFootprint||{x:-1.1825*mr,z:-1.0664*mr,width:7.68*mr,depth:8.25*mr},"Main hut exclusion"),q(Hy,"Sleeping hut reservation"),z.add(G),G}let Ro=0,Bh=Qi;const kf=hn(o.water),Nf=hn(o.nightWater),Ff=hn("#fff0cb"),Of=hn("#7aa5cb");function Bf(M,z,F=1,O){if(Tn=z,Ro++,F=ns(F,0,1),wo.value=z,c){const j=1-Math.exp(-Math.max(0,Math.min(.5,Number(M)||0))*3);Ze(x+(p-x)*j);const q=lt.material.uniforms.alpha,it=e1(O?.y,x);if(q.value+=(it-q.value)*(1-Math.exp(-Math.max(0,Math.min(.5,Number(M)||0))*8)),Math.abs(Bh-x)>.008){for(let dt=0;dt<St.length;dt++){const Tt=St[dt];pt.position.set(Tt.x,Tt.y,Tt.z),pt.rotation.set(0,Tt.angle,0),pt.scale.set(Tt.visualRadius,1,Tt.visualRadius),pt.updateMatrix(),ve.setMatrixAt(dt,pt.matrix)}ve.flush(),Bh=x}qt.update(x,z)}if(lt.material.uniforms.time.value=z*.45,lt.material.uniforms.waterColor.value.copy(Nf).lerp(kf,F),lt.material.uniforms.sunColor.value.copy(Of).lerp(Ff,F),lt.material.uniforms.sunDirection.value.set(.35+.25*Math.sin(z*.008),.45+F*.4,-.45).normalize(),Ro%3===0){const j=at.attributes.position;for(let q=0;q<j.count;q++){const it=ct[q*3],dt=ct[q*3+1];j.setZ(q,Math.sin(it*.33+dt*.21+z*.91)*.025+Math.sin(it*.14-dt*.38-z*.72)*.018)}j.needsUpdate=!0}qi.uniforms.uTime.value=z;let k=!1;for(let j=0;j<Je;j++){const q=zh[j];q.life<=0||(q.life-=M,q.vy-=9.2*M,Qe[j*3]+=q.vx*M,Qe[j*3+1]+=q.vy*M,Qe[j*3+2]+=q.vz*M,Eo[j]=Math.max(0,q.life/q.max)*.88,(Qe[j*3+1]<(c?x-.03:-.03)||q.life<=0)&&(q.life=0,Eo[j]=0),k=!0)}if(k&&(Ei.attributes.position.needsUpdate=!0,Ei.attributes.aAlpha.needsUpdate=!0),Ro%2===0){let j=0;for(let q=0;q<A.length;q++){const it=A[q];if(O&&(it.x-O.x)**2+(it.z-O.z)**2>90**2)continue;const dt=(it.rich?65:30)*ns(it.flies/it.maxFlies,0,1)*(c?Math.min(1,it.ecology?.activity??1):1);for(const Tt of Ut[q]){if(Tt.rank>=dt)continue;const Zt=z*Tt.speed+Tt.phase;pt.position.set(it.x+Math.sin(Zt)*Tt.r+Math.sin(Zt*2.9)*.13,it.y+Tt.height+Math.sin(Zt*1.7+Tt.phase2)*.26,it.z+Math.cos(Zt*.83+Tt.phase2)*Tt.r),pt.scale.setScalar(.55+.3*Math.sin(Tt.phase2)**2),pt.rotation.set(Math.sin(Zt*3)*.25,-Zt,Math.sin(Zt*12)*.25),pt.updateMatrix(),$t.setMatrixAt(j++,pt.matrix)}}$t.count=j,Z.flyMatricesUpdated=j,j&&($t.instanceMatrix.clearUpdateRanges(),$t.instanceMatrix.addUpdateRange(0,j*16),$t.instanceMatrix.needsUpdate=!0)}Ro%5===0&&O&&(St.forEach((j,q)=>{Math.hypot(O.x-j.x,O.z-j.z)>48||(pt.position.set(j.x,j.y+Math.sin(z*.9+j.phase)*.018,j.z),pt.rotation.set(Math.sin(z*.61+j.phase)*.015,j.angle,Math.cos(z*.8+j.phase)*.015),pt.scale.set(j.visualRadius,1,j.visualRadius),pt.updateMatrix(),ve.setMatrixAt(q,pt.matrix))}),ve.flush());const W=[...E].filter(j=>!j.userData.natural&&!j.userData.destroyed&&!j.userData.visualState?.underConstruction).sort((j,q)=>O?j.position.distanceToSquared(O)-q.position.distanceToSquared(O):0).slice(0,3);for(const j of E)j.userData.natural||(j.userData.light.visible=W.includes(j),j.userData.light.intensity=.25+(1-F)*3,j.userData.lamp.material.emissiveIntensity=.3+(1-F)*1.3,j.userData.banner.userData.flag.rotation.y=Math.sin(z*1.4+j.position.x)*.06)}function Hf(){Nr();for(const F of[...S])Oh(F);i.remove(l);const M=new Set,z=new Set;l.traverse(F=>{F.isInstancedMesh&&F.dispose(),F.geometry&&M.add(F.geometry),F.material&&(Array.isArray(F.material)?F.material.forEach(O=>z.add(O)):z.add(F.material))});for(const F of qt?.resources||[])F.isBufferGeometry&&M.add(F),F.isMaterial&&z.add(F);for(const F of M)F.dispose();for(const F of z)F.dispose();for(const F of b)F.dispose();lt.material.uniforms.mirrorSampler?.value?.dispose?.(),E.clear();for(const F of g)F.active=!1;g.length=0}for(const M of h?.refuges||[])Ao({...M,natural:!0,team:"neutral",nestLevel:0});return l.traverse(M=>{M.updateMatrix(),M.matrixAutoUpdate=!1}),l.updateMatrixWorld(!0),{group:l,platforms:T,hotspots:A,campSites:ce,mapRegions:_t,routes:Be,predatorAnchors:Xt,bossAnchors:Nt,renderStats:Z,seed:s,regionIndex:n,palette:o,toRegionPoint:r.toWorld,radius:Ny,boundary:Fy,revision:ky,sampleHeight:Os,cameraSurfaceHeight:C,getTerrainHeight:D,getSurface:gs,shelterLandHeight:Uh,update:Bf,splash:Tf,impact:Af,createShelter:Ao,updateShelter:ja,setConstructionProgress:If,removeShelter:Nh,createBuildingPreview:Lf,setBuildingPreview:Fh,removeBuildingPreview:Oh,showBuildArea:Uf,hideBuildArea:Nr,dispose:Hf,water:lt,shelterRadius:Cs,shelterScale:ie,natural:c,creekLandmarks:u,creekNest:d,creekCover:f,creekGrips:m,creekRefuges:g,creekSpawn:c?{x:0,z:0}:null,creekTerritories:c?ce.filter(M=>M.team==="enemy"):[],setCreekState:We,currentAt:Ee,isCreekCover:Ne,get waterLevel(){return c?x:Qi}}}const fi=Math.PI*2,$e=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),Ye=(i,t,e)=>i+(t-i)*e,Yn=(i,t,e)=>{const n=$e((e-i)/(t-i));return n*n*(3-2*n)},Zr=(i,t=0,e=0)=>{const n=Math.sin(i*127.1+t*311.7+e*74.7)*43758.5453;return n-Math.floor(n)},Oe=(i=0,t=0,e=0)=>new L(i,t,e),Nl=new Map,Fl=new Map;let es,Ol;const Yc=Oe(0,1,0);Oe();function Bl(i,t){if(typeof i=="number")return i;const e=$e(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n,r=s*s*(3-2*s);return Ye(i[n],i[n+1],r)}function Ps(i,t){if(i.length===1)return[[i[0],1]];const e=$e(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n;return[[i[n],1-s],[i[n+1],s]]}function _e(i,t=0){return{color:i,mask:t}}class Hn{constructor(t=1){this.detail=t,this.p=[],this.uv=[],this.c=[],this.mask=[],this.si=[],this.sw=[],this.idx=[]}vertex(t,e=[0,0],n=[[0,1]],s={color:[1,1,1],mask:0}){const r=this.p.length/3;this.p.push(t.x,t.y,t.z),this.uv.push(...e),this.c.push(...s.color),this.mask.push(s.mask||0);let o=n.reduce((a,l)=>a+l[1],0)||1;for(let a=0;a<4;a++)this.si.push(n[a]?.[0]||0),this.sw.push((n[a]?.[1]||0)/o);return r}tri(t,e,n){this.idx.push(t,e,n)}quad(t,e,n,s,r=!1){r?(this.tri(t,n,e),this.tri(e,n,s)):(this.tri(t,e,n),this.tri(e,s,n))}tube(t,e,n,s={}){const{bones:r=[0],paint:o=()=>_e([.7,.7,.7],1),distort:a}=s,l=Math.max(2,Math.round((s.segments??28)*this.detail)),c=Math.max(3,Math.round((s.radial??16)*this.detail)),h=new mo(t.map(y=>y.isVector3?y:Oe(...y)),!1,"catmullrom",.5),u=this.p.length/3;for(let y=0;y<=l;y++){const _=y/l,T=h.getPoint(_),A=h.getTangent(_).normalize(),E=new L().crossVectors(Math.abs(A.y)>.94?Oe(0,0,1):Yc,A).normalize(),R=new L().crossVectors(A,E).normalize();for(let S=0;S<=c;S++){const b=S/c,U=b*fi,P=Math.cos(U)*Bl(e,_),G=Math.sin(U)*Bl(n,_),Z=T.clone().addScaledVector(E,P).addScaledVector(R,G);a&&a(Z,_,U,T);const H=typeof r=="function"?r(_,Z):Ps(r,_);this.vertex(Z,[b,_],H,o(Z,_,U))}}for(let y=0;y<l;y++)for(let _=0;_<c;_++){const T=u+y*(c+1)+_;this.quad(T,T+1,T+c+1,T+c+2)}const d=h.getPoint(0),f=h.getPoint(1),m=typeof r=="function"?r(0,d):Ps(r,0),g=typeof r=="function"?r(1,f):Ps(r,1),x=this.vertex(d,[.5,0],m,o(d,0,0)),p=this.vertex(f,[.5,1],g,o(f,1,0)),v=u+l*(c+1);for(let y=0;y<c;y++)this.tri(x,u+y+1,u+y),this.tri(p,v+y,v+y+1);return this}ellipsoid(t,e,{bone:n=0,rings:s=14,radial:r=24,paint:o=()=>_e([1,1,1]),rotationY:a=0,sculpt:l}={}){s=Math.max(3,Math.round(s*this.detail)),r=Math.max(4,Math.round(r*this.detail));const c=this.p.length/3,h=Oe(...t),u=Math.cos(a),d=Math.sin(a);for(let f=0;f<=s;f++){const m=f/s,g=Math.PI*m;for(let x=0;x<=r;x++){const p=x/r,v=fi*p;let y=Math.sin(g)*Math.cos(v)*e[0],_=Math.cos(g)*e[1],T=Math.sin(g)*Math.sin(v)*e[2];const A=Oe(y,_,T);l&&l(A,p,m);const E=Oe(A.x*u+A.z*d,A.y,-A.x*d+A.z*u).add(h);this.vertex(E,[p,m],[[n,1]],o(A,p,m))}}for(let f=0;f<s;f++)for(let m=0;m<r;m++){const g=c+f*(r+1)+m;this.quad(g,g+1,g+r+1,g+r+2)}return this}leaf(t,e,{bone:n=0,bones:s,segments:r=14,across:o=6,color:a=[.35,.45,.22],ridge:l=.025,mask:c=0,vein:h=!0}={}){r=Math.max(2,Math.round(r*this.detail)),o=Math.max(2,Math.round(o*this.detail));const u=new mo(t.map(f=>f.isVector3?f:Oe(...f)),!1,"catmullrom",.5),d=this.p.length/3;for(let f=0;f<=r;f++){const m=f/r,g=u.getPoint(m),x=u.getTangent(m).normalize(),p=new L().crossVectors(Math.abs(x.y)>.95?Oe(0,0,1):Yc,x).normalize();for(let v=0;v<=o;v++){const y=v/o*2-1,_=g.clone().addScaledVector(p,y*Bl(e,m));_.y+=l*(1-Math.abs(y))*Math.sin(m*Math.PI);const T=(h?.88+.12*Math.cos(m*45+Math.abs(y)*9):1)+.12*(1-Math.abs(y));this.vertex(_,[(y+1)/2,m],s?Ps(s,m):[[n,1]],_e(a.map(A=>A*T),c))}}for(let f=0;f<r;f++)for(let m=0;m<o;m++){const g=d+f*(o+1)+m;this.quad(g,g+1,g+o+1,g+o+2,!0)}return this}geometry(){const t=new Se;return t.setAttribute("position",new Gt(this.p,3)),t.setAttribute("uv",new Gt(this.uv,2)),t.setAttribute("color",new Gt(this.c,3)),t.setAttribute("skinTintMask",new Gt(this.mask,1)),t.setAttribute("skinIndex",new hh(this.si,4)),t.setAttribute("skinWeight",new Gt(this.sw,4)),t.setIndex(this.idx),t.computeVertexNormals(),t.computeBoundingSphere(),t}}function Ba(){const i=[],t={};return{defs:i,ids:t,bone(e,n,s=null){const r=i.length;return t[e]=r,i.push({name:e,p:n,parent:typeof s=="string"?t[s]:s}),r}}}function rr(i,t=0,e=0){const n=1-Yn(.26,.47,i.y),s=Math.sin(i.x*31+Math.sin(i.z*13))*Math.sin(i.z*25+i.y*23),r=Yn(.42,.77,s)*.5,o=.75-r+.06*Math.sin(i.x*75+i.z*64),a=(1-Yn(.026,.065,Math.abs(i.x)))*Yn(.52,.67,i.y);return a>.3?_e([.78,.61,.18].map(l=>Ye(o,l,a)),1-a):_e([Ye(o,.76,n),Ye(o,.72,n),Ye(o,.49,n)],1-n*.96)}function ui(i,t=0,e=0){const n=(1-Yn(-.55,.1,Math.sin(e)))*.65,r=.79-.36*Yn(.38,.78,Math.sin(i.x*35+i.z*17)*Math.sin(i.y*39-i.z*23));return _e([Ye(r,.7,n),Ye(r,.66,n),Ye(r,.43,n)],1-n*.92)}function cd(i=1){const t=Ba(),e=new Hn(i),n=new Hn(i),s=new Hn(i),r=new Hn(i),o=new Hn(i),a=new Hn(i),l=t.bone("pelvis",[0,.36,-.35]),c=t.bone("spine",[0,.43,-.07],l),h=t.bone("head",[0,.47,.29],c),u=t.bone("jaw",[0,.39,.37],h),d=t.bone("throat",[0,.29,.36],u),f=t.bone("eyeL",[-.292,.685,.53],h),m=t.bone("eyeR",[.292,.685,.53],h),g=t.bone("mouth",[0,.405,.755],u);e.tube([[0,.35,-.72],[0,.42,-.48],[0,.43,-.08],[0,.47,.3],[0,.46,.58],[0,.43,.75]],[.012,.32,.435,.43,.34,.018],[.012,.245,.27,.235,.145,.025],{segments:42,radial:36,bones:p=>Ps([l,l,c,h,h],p),paint:rr,distort(p,v,y){const _=Math.max(0,Math.sin(y));p.y+=_*.008*Math.sin(p.x*70+p.z*50);const T=Math.exp(-Math.pow((Math.abs(p.x)-.22)/.035,2));p.y+=T*_*.023*Math.sin(v*Math.PI)}});for(const p of[-1,1]){const v=p<0?f:m,y=[p*.292,.685,.53];e.ellipsoid([p*.292,.605,.405],[.15,.145,.165],{bone:h,rings:14,radial:24,paint:P=>rr(P.clone().add(Oe(p*.292,.605,.405)))}),n.ellipsoid(y,[.106,.103,.113],{bone:v,radial:40,rings:22,rotationY:p*.32,paint(P,G,Z){const H=P.z/.113,V=Math.pow(P.x/.084,2)+Math.pow(P.y/.029,2);if(H<.12)return _e([.065,.14,.018]);if(H<.34)return _e([.04,.065,.012]);if(H>.52&&V<1)return _e([.008,.012,.006]);const N=.12*Math.sin(Math.atan2(P.y,P.x)*51+Math.hypot(P.x,P.y)*120);return _e([.74+N,.52+N*.6,.08+N*.12])}});const _=t.bone(`hip${p}`,[p*.33,.32,-.33],l),T=t.bone(`knee${p}`,[p*.64,.24,.025],_),A=t.bone(`ankle${p}`,[p*.46,.09,-.61],T),E=t.bone(`foot${p}`,[p*.64,.045,-.49],A);e.ellipsoid([p*.64,.24,.025],[.143,.128,.148],{bone:T,rings:12,radial:18,paint:(P,G,Z)=>ui(P.clone().add(Oe(p*.64,.24,.025)),G,Math.PI*(.5-Z)),sculpt(P){P.x*=1+.06*Math.sin(P.z*30)}}),e.ellipsoid([p*.46,.09,-.61],[.069,.052,.071],{bone:A,rings:8,radial:12,paint:(P,G,Z)=>ui(P.clone().add(Oe(p*.46,.09,-.61)),G,Math.PI*(.5-Z))}),e.tube([[p*.3,.33,-.35],[p*.5,.3,-.21],[p*.64,.24,.025]],[.13,.223,.14],[.13,.173,.12],{segments:20,radial:22,bones:[_,_,T],paint:ui}),e.tube([[p*.64,.24,.025],[p*.57,.15,-.27],[p*.46,.09,-.61]],[.12,.105,.065],[.11,.09,.05],{segments:20,radial:18,bones:[T,T,A],paint:ui}),e.tube([[p*.46,.09,-.61],[p*.57,.06,-.55],[p*.72,.035,-.35]],[.06,.07,.047],[.047,.04,.025],{segments:12,radial:14,bones:[A,E,E],paint:ui});const R=[];for(let P=0;P<4;P++){const G=p*(.7+(P-1.5)*.075),Z=-.34+.36*(1-Math.abs(P-1.5)*.16),H=[p*(.67+(P-1.5)*.028),.036,-.37],V=[Ye(H[0],G,.53),.037,-.18];e.tube([H,V,[G,.035,Z]],[.032,.024,.007],[.02,.014,.006],{segments:10,radial:8,bones:[E],paint:ui}),R.push([G,.034,Z*.66-.12])}for(let P=0;P<3;P++){const G=Oe(p*.68,.035,-.36),Z=Oe(...R[P]),H=Oe(...R[P+1]),V=Z.clone().lerp(H,.5).lerp(G,.2),N=e.vertex(G,[0,0],[[E,1]],rr(G)),B=e.vertex(Z,[1,0],[[E,1]],rr(Z)),Q=e.vertex(V,[.5,1],[[E,1]],rr(V)),X=e.vertex(H,[0,1],[[E,1]],rr(H));e.tri(N,B,Q),e.tri(N,Q,X),e.tri(Q,B,X)}const S=t.bone(`shoulder${p}`,[p*.3,.43,.31],c),b=t.bone(`elbow${p}`,[p*.48,.235,.4],S),U=t.bone(`wrist${p}`,[p*.46,.058,.62],b);e.ellipsoid([p*.48,.235,.4],[.064,.066,.064],{bone:b,rings:8,radial:12,paint:(P,G,Z)=>ui(P.clone().add(Oe(p*.48,.235,.4)),G,Math.PI*(.5-Z))}),e.tube([[p*.3,.43,.31],[p*.43,.33,.335],[p*.48,.235,.4]],[.092,.085,.061],[.09,.077,.059],{segments:14,radial:16,bones:[S,S,b],paint:ui}),e.tube([[p*.48,.235,.4],[p*.48,.14,.48],[p*.46,.058,.62]],[.062,.07,.039],[.058,.057,.03],{segments:12,radial:14,bones:[b,b,U],paint:ui});for(let P=0;P<4;P++){const G=p*(.44+(P-1.5)*.075),Z=.81+.04*(1.5-Math.abs(P-1.5));e.tube([[p*.46,.055,.61],[Ye(p*.46,G,.6),.031,.74],[G,.025,Z]],[.025,.017,.009],[.021,.014,.006],{segments:9,radial:8,bones:[U],paint:ui}),e.ellipsoid([G,.025,Z],[.017,.01,.021],{bone:U,rings:6,radial:10,paint:()=>_e([.71,.65,.4],.4)})}for(let P=0;P<3;P++){const G=.32+P*.016;e.tube(Array.from({length:17},(Z,H)=>[p*.415+Math.cos(H/16*fi)*.085,G+Math.sin(H/16*fi)*.072,.355+Math.sin(H/16*fi)*.02]),.009,.009,{segments:20,radial:6,bones:[S],paint:()=>_e([.38,.55,.12],.25)})}s.leaf([[p*.12,.695,-.08],[p*.31,.69,-.19],[p*.48,.52,-.38]],[.012,.14,.03],{bone:c,color:[.26,.4,.12],ridge:.025,segments:15}),s.leaf([[p*.04,.715,.05],[p*.2,.73,-.03],[p*.36,.59,-.2]],[.008,.13,.015],{bone:c,color:[.34,.48,.18],ridge:.035,segments:15}),r.leaf([[p*.17,.76,.4],[p*.21,.89,.32],[p*.24,.91,.18]],[.025,.055,.002],{bone:h,color:[.69,.53,.19],ridge:.015,segments:12});for(const[P,G,Z,H,V]of[[p*.16,.745,-.005,.18,.21],[p*.29,.67,-.25,.17,.19]])o.ellipsoid([P,G,Z],[H,.055,V],{bone:c,rings:8,radial:18,paint:(N,B)=>_e([.84+.08*Math.cos(B*fi*9),.79,.59]),sculpt(N){const B=1+.035*Math.cos(Math.atan2(N.x,N.z)*9);N.x*=B,N.z*=B}});for(let P=0;P<3;P++){const G=.19+P*.028,Z=.455-P*.017;a.tube(Array.from({length:13},(H,V)=>[p*.478+Math.cos(V/12*fi)*.081,G+Math.sin(V/12*fi)*.027,Z+Math.sin(V/12*fi)*.079]),.016,.014,{segments:14,radial:6,bones:[b],paint:()=>_e([.72,.47,.16])})}}const x=Array.from({length:13},(p,v)=>{const y=(v/12-.5)*.74;return[y,.414-.025*Math.abs(y)/.37,.748-.2*Math.pow(y/.37,2)]});return e.tube(x,.009,.009,{segments:34,radial:8,bones:[h],paint:()=>_e([.045,.065,.016])}),e.tube(x.map(p=>[p[0],p[1]-.019,p[2]+.001]),.009,.014,{segments:34,radial:8,bones:[u],paint:()=>_e([.65,.61,.35])}),e.ellipsoid([0,.284,.385],[.25,.125,.265],{bone:d,rings:18,radial:28,paint:()=>_e([.75,.72,.48]),sculpt(p){p.y+=.01*Math.sin(p.x*80)*Math.cos(p.z*60)}}),{type:"frog",rig:t,skin:e.geometry(),eyes:n.geometry(),armor:s.geometry(),shell:o.geometry(),bracers:a.geometry(),crest:r.geometry(),mouth:g,length:1.7,height:.8,scale:1}}function or(i,t,e,n,s,r,o=.05){const a=Oe(...t).lerp(Oe(...e),.5);a.y+=o,i.leaf([t,a.toArray(),e],[.012,n,n*.7,.002],{bone:s,segments:13,across:6,ridge:.012,color:r,vein:!0})}function x1(){const i=Ba(),t=new Hn,e=new Hn,n=i.bone("pelvis",[0,2.45,-.16]),s=i.bone("spine",[0,2.79,.02],n),r=i.bone("neck0",[0,2.97,.24],s),o=i.bone("neck1",[0,3.35,.03],r),a=i.bone("neck2",[0,3.82,.18],o),l=i.bone("head",[0,4.19,.6],a),c=i.bone("jaw",[0,4.12,.7],l),h=i.bone("mouth",[0,4.11,1.48],c),u=i.bone("eyeL",[-.125,4.25,.69],l),d=i.bone("eyeR",[.125,4.25,.69],l),f=m=>{const g=Yn(2.7,3.02,m.y)*.35;return _e([.54-g,.59-g,.61-g])};t.tube([[0,2.43,-.95],[0,2.58,-.53],[0,2.78,-.05],[0,2.99,.27]],[.02,.34,.41,.14],[.02,.39,.48,.18],{segments:30,radial:28,bones:[n,n,s,s],paint:f}),t.tube([[0,2.97,.24],[0,3.22,.16],[0,3.46,.015],[0,3.83,.18],[0,4.12,.52],[0,4.21,.65]],[.16,.15,.12,.1,.1,.13],[.17,.17,.14,.12,.13,.14],{segments:40,radial:20,bones:[r,r,o,a,l,l],paint(m,g,x){const p=Math.cos(x)>.7?.65:.9;return _e([p,p*.99,p*.91])}}),t.tube([[0,4.18,.36],[0,4.28,.57],[0,4.25,.76],[0,4.18,.91]],[.018,.15,.14,.045],[.02,.16,.14,.07],{segments:22,radial:20,bones:[l],paint(m){return m.y>4.32?_e([.07,.1,.12]):_e([.83,.86,.82])}}),t.tube([[0,4.19,.81],[0,4.18,1.04],[0,4.15,1.32],[0,4.12,1.6]],[.072,.055,.027,.001],[.06,.044,.022,.001],{segments:20,radial:10,bones:[l],paint(m,g){return _e([Ye(.74,.34,g),Ye(.47,.24,g),.075])}}),t.tube([[0,4.112,.81],[0,4.105,1.06],[0,4.103,1.36],[0,4.115,1.59]],[.063,.046,.022,.001],[.026,.02,.012,.001],{segments:18,radial:8,bones:[c],paint:()=>_e([.68,.38,.07])});for(const m of[-1,1]){const g=m<0?u:d;e.ellipsoid([m*.132,4.255,.69],[.029,.039,.043],{bone:g,rings:10,radial:18,paint:R=>Math.abs(R.x)>.022&&Math.abs(R.y)<.018&&Math.abs(R.z)<.021?_e([.005,.008,.006]):_e([.9,.7,.13])});const x=i.bone(`hip${m}`,[m*.14,2.47,-.12],n),p=i.bone(`knee${m}`,[m*.18,1.5,-.12],x),v=i.bone(`ankle${m}`,[m*.22,.16,.04],p),y=i.bone(`foot${m}`,[m*.22,.075,.15],v),_=(R,S)=>{const b=.8+.2*Math.sin(R.y*110);return _e([.38*b,.36*b,.21*b])};t.tube([[m*.14,2.47,-.12],[m*.18,1.73,-.15],[m*.18,1.5,-.12]],[.077,.04,.049],[.074,.037,.049],{segments:20,radial:12,bones:[x,x,p],paint:_}),t.tube([[m*.18,1.5,-.12],[m*.2,.7,-.02],[m*.22,.16,.04]],[.042,.024,.031],[.042,.023,.03],{segments:22,radial:10,bones:[p,p,v],paint:_});for(let R=0;R<4;R++){const S=R<3?(R-1)*.23:-.08,b=R<3?.54-.06*Math.abs(R-1):-.21;t.tube([[m*.22,.16,.04],[m*.22+S*.5,.065,(b+.04)*.55],[m*.22+S,.035,b]],[.025,.017,.006],[.023,.013,.005],{segments:12,radial:8,bones:[y],paint:_})}const T=i.bone(`wing${m}`,[m*.31,2.91,-.03],s),A=i.bone(`wingElbow${m}`,[m*.94,2.83,-.12],T),E=i.bone(`wingWrist${m}`,[m*1.5,2.68,-.24],A);t.leaf([[m*.31,2.91,-.03],[m*.95,2.84,-.18],[m*1.58,2.69,-.35]],[.08,.29,.1],{bones:[T,A,E],segments:22,across:10,ridge:.05,color:[.36,.43,.47]});for(let R=0;R<15;R++){const S=.42+R*.088,b=R<6?T:R<11?A:E;or(t,[m*S,2.89-R*.014,-.05-R*.012],[m*(S+.22+R*.009),2.73-R*.023,-.76-R*.018],.105-R*.002,b,[.26+R*.004,.32+R*.004,.36+R*.004]),R<12&&or(t,[m*S,2.94-R*.014,.035],[m*(S+.1),2.86-R*.017,-.44],.077,b,[.49,.55,.57])}for(let R=0;R<11;R++)or(t,[m*(.11+.015*R),2.86-.042*R,-.21],[m*(.29+.009*R),2.7-.044*R,-.75-.022*R],.075,s,[.51+R*.013,.56+R*.012,.56+R*.012]);or(t,[m*.065,4.34,.51],[m*.13,4.28,-.02],.018,l,[.04,.07,.09],.025)}for(let m=0;m<9;m++)or(t,[(m-4)*.045,2.53,-.65],[(m-4)*.075,2.34,-1.34-.1*(1-Math.abs(m-4)/4)],.07,n,[.21,.28,.31]);for(let m=0;m<9;m++)or(t,[(m-4)*.025,3.06,.35],[(m-4)*.044,2.48-.06*(m%3),.42],.032,s,[.79,.8,.72],.01);return{type:"heron",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:h,length:3,height:4.55,scale:1}}function v1(){const i=Ba(),t=new Hn,e=new Hn,n=new Hn,s=i.bone("head",[0,.27,1.97]),r=[s];for(let u=1;u<=20;u++)r.push(i.bone(`coil${u}`,[0,.23,1.97-u*.22],r[u-1]));const o=i.bone("jaw",[0,.205,2.1],s),a=i.bone("mouth",[0,.19,2.48],o),l=i.bone("eyeL",[-.183,.346,2.21],s),c=i.bone("eyeR",[.183,.346,2.21],s),h=(u,d,f)=>{const m=1-Yn(.13,.22,u.y),g=.73-.26*Yn(.2,.65,Math.sin(u.z*7+u.x*18));return _e([Ye(g,.65,m),Ye(g,.6,m),Ye(g,.36,m)],1-m)};t.tube([[0,.25,2.05],[0,.23,1.4],[0,.23,.5],[0,.22,-.4],[0,.18,-1.5],[0,.09,-2.46]],[.13,.186,.205,.18,.115,.002],[.11,.16,.17,.15,.09,.003],{segments:100,radial:20,bones:u=>Ps(r,u),paint:h,distort(u,d,f){u.y+=.003*Math.sin(d*390)*Math.sin(f*12)}}),t.tube([[0,.265,1.86],[0,.29,2.07],[0,.285,2.27],[0,.245,2.48]],[.115,.237,.202,.035],[.1,.12,.105,.038],{segments:24,radial:24,bones:[s],paint:h}),t.tube([[0,.192,1.99],[0,.179,2.25],[0,.207,2.47]],[.14,.19,.025],[.027,.035,.006],{segments:18,radial:16,bones:[o],paint:()=>_e([.66,.63,.42])});for(const u of[-1,1])e.ellipsoid([u*.183,.346,2.21],[.045,.043,.05],{bone:u<0?l:c,rings:12,radial:20,rotationY:u*.9,paint(d){return Math.abs(d.x)<.012&&d.z>.015?_e([.009,.008,.005]):_e([.69,.51,.12])}}),t.tube([[u*.2,.228,2.06],[u*.197,.218,2.29],[u*.045,.225,2.475]],.004,.004,{segments:20,radial:6,bones:[s],paint:()=>_e([.05,.06,.025])}),n.tube([[0,.194,2.47],[0,.19,2.73],[u*.06,.18,2.84]],[.014,.01,.001],[.007,.005,.001],{segments:16,radial:6,bones:[o],paint:()=>_e([.28,.025,.035])});return{type:"snake",rig:i,skin:t.geometry(),eyes:e.geometry(),tongue:n.geometry(),mouth:a,length:5,height:.43,scale:1}}function y1(){const i=Ba(),t=new Hn,e=new Hn,n=i.bone("spine",[0,.6,.18]),s=i.bone("head",[0,.61,.78],n),r=i.bone("tail0",[0,.55,-.44],n),o=i.bone("tail1",[0,.49,-.99],r),a=i.bone("tail",[0,.48,-1.43],o),l=i.bone("jaw",[0,.42,1.03],s),c=i.bone("mouth",[0,.43,1.55],l),h=i.bone("eyeL",[-.22,.72,1.06],s),u=i.bone("eyeR",[.22,.72,1.06],s),d=x=>{const p=1-Yn(.35,.62,x.y),v=.74-.25*Yn(.1,.6,Math.sin(x.z*18+x.y*29)*Math.sin(x.y*35));return _e([Ye(v,.81,p),Ye(v,.78,p),Ye(v,.61,p)],1-p)};t.tube([[0,.48,-1.46],[0,.51,-.92],[0,.61,-.28],[0,.64,.34],[0,.62,.84],[0,.55,1.24],[0,.52,1.56]],[.018,.15,.31,.35,.29,.19,.027],[.035,.22,.46,.48,.32,.19,.05],{segments:54,radial:28,bones:x=>Ps([a,o,r,n,s,s,s],x),paint:d}),t.tube([[0,.43,.92],[0,.36,1.25],[0,.445,1.56]],[.14,.16,.025],[.055,.065,.018],{segments:18,radial:18,bones:[l],paint:()=>_e([.72,.69,.49])});const f=[.33,.4,.23],m=t.p.length/3;for(let x=0;x<=18;x++){const p=x/18,v=Math.cos(p*Math.PI)*.62,y=-1.45-(.3+.3*Math.abs(Math.cos(p*Math.PI)));for(let _=0;_<=6;_++){const T=_/6,A=Oe(.025*Math.sin(p*Math.PI),.48+v*T,Ye(-1.43,y,T)),E=x%2?.85:1.15;t.vertex(A,[T,p],[[a,1]],_e(f.map(R=>R*E),.3))}}for(let x=0;x<18;x++)for(let p=0;p<6;p++){const v=m+x*7+p;t.quad(v,v+1,v+7,v+8)}const g=(x,p,v,y,_=1)=>{const T=Oe(...x).lerp(Oe(...p),.5);T.x+=_*v,t.leaf([x,T.toArray(),p],[.01,v*.8,.003],{bone:y,segments:16,across:8,ridge:.014,color:f,mask:.3})};for(const x of[-1,1]){e.ellipsoid([x*.22,.72,1.06],[.052,.07,.08],{bone:x<0?h:u,rings:12,radial:22,rotationY:x*1,paint(v){return v.z>.035&&Math.pow(v.x/.035,2)+Math.pow(v.y/.04,2)<1?_e([.005,.007,.004]):_e([.75,.59,.18])}});const p=i.bone(`fin${x}`,[x*.255,.42,.65],n);g([x*.255,.42,.65],[x*.63,.21,.11],.16,p,x),g([x*.2,.26,-.11],[x*.38,.13,-.57],.12,r,x),t.tube([[x*.24,.86,.71],[x*.31,.64,.67],[x*.24,.39,.69]],.009,.011,{segments:20,radial:6,bones:[s],paint:()=>_e([.19,.24,.12],.3)});for(let v=0;v<8;v++){const y=1.18+v*.04,_=x*(.12-v*.009);t.tube([[_,.445,y],[_*.9,.475,y+.005]],[.008,.001],[.008,.001],{segments:3,radial:5,bones:[l],paint:()=>_e([.78,.76,.56])})}}for(const x of[!0,!1]){const p=t.p.length/3,v=22;for(let y=0;y<=v;y++){const _=y/v,T=Ye(-.9,.18,_),A=x?.8+.22*_:.26-.1*_,E=Math.sin(Math.PI*_)*(x?.45:-.24),R=_<.5?r:n;for(let S=0;S<=6;S++){const b=S/6,U=Oe(.012*Math.sin(_*6),A+E*b,T-.1*b);t.vertex(U,[b,_],[[R,1]],_e(f.map(P=>P*(y%2?.85:1.1)),.2))}}for(let y=0;y<v;y++)for(let _=0;_<6;_++){const T=p+y*7+_;t.quad(T,T+1,T+7,T+8)}}return{type:"fish",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:c,length:3.65,height:1.65,scale:1}}function _1(i){if(Fl.has(i))return Fl.get(i);const t=256,e=new Uint8Array(t*t*4);for(let s=0;s<t;s++)for(let r=0;r<t;r++){const o=r/t,a=s/t;let l=.82+Zr(r,s)*.18;if(i==="frog"){const d=Math.floor(o*28),f=Math.floor(a*28),m=o*28-d-.5,g=a*28-f-.5,x=Math.hypot(m,g),p=Math.exp(-x*x*38)*(.1+Zr(d,f)*.18);l=.79+.16*Zr(r,s)+p-.11*Math.exp(-Math.pow(x-.31,2)*300)}else if(i==="snake"||i==="fish"){const u=i==="snake"?28:35,d=a*u,f=Math.floor(d),m=o*20+f%2*.5,g=m-Math.floor(m)-.5,x=d-f-.5,p=Math.abs(g)*1.4+Math.abs(x);l=.74+.22*(1-Yn(.49,.72,p))+.04*Zr(r,s)}else l=.79+.15*Math.sin(o*170+.4*Math.sin(a*31))**2+.06*Zr(r,s);const c=(s*t+r)*4,h=Math.floor($e(l)*255);e[c]=e[c+1]=e[c+2]=h,e[c+3]=255}const n=new uh(e,t,t,Gn);return n.wrapS=n.wrapT=Tr,n.magFilter=ri,n.minFilter=os,n.generateMipmaps=!0,n.needsUpdate=!0,n.repeat.set(i==="heron"?1:2,i==="frog"?3:2),Fl.set(i,n),n}function M1(i,t){const e=_1(i),n=new $d({color:16777215,vertexColors:!0,map:e,bumpMap:e,bumpScale:i==="frog"?.013:i==="heron"?.007:.009,roughness:i==="frog"?.32:i==="heron"?.68:.37,metalness:0,clearcoat:i==="heron"?0:.42,clearcoatRoughness:.25,envMapIntensity:.8,side:Ce}),s=new ee(t);return n.userData.tint=s,n.onBeforeCompile=r=>{r.uniforms.skinTint={value:s},r.vertexShader=`attribute float skinTintMask; varying float vSkinTint;
`+r.vertexShader,r.vertexShader=r.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vSkinTint = skinTintMask;`),r.fragmentShader=`uniform vec3 skinTint; varying float vSkinTint;
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
 diffuseColor.rgb *= mix(vec3(1.0),skinTint,vSkinTint);`)},n.customProgramCacheKey=()=>"anatomical-skin-v3",n}function b1(i,t){const e=new xn({color:i,side:Dn,transparent:!0,opacity:.91,depthWrite:!1,toneMapped:!1});return e.userData.thickness={value:t},e.onBeforeCompile=n=>{n.uniforms.outlineThickness=e.userData.thickness,n.vertexShader=`uniform float outlineThickness;
`+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <begin_vertex>","vec3 transformed = position + normal * outlineThickness;")},e.customProgramCacheKey=()=>"skeletal-silhouette-v3",e}function S1(i){const t=i.map(e=>{const n=new Hd;return n.name=e.name,n});for(let e=0;e<i.length;e++){const n=i[e];t[e].position.fromArray(n.p),n.parent!==null&&n.parent!==void 0&&(t[e].position.sub(Oe(...i[n.parent].p)),t[n.parent].add(t[e]))}return{bones:t,skeleton:new dh(t),root:t[0]}}function w1(){if(!es){const n=[],s=[];for(let o=0;o<=48;o++){const a=o/48*fi,l=Math.sin(a),c=Math.cos(a),h=Math.abs(o%8-4)/4,u=-.018*c,d=u+.1+.205*h,f=1+.08*h;n.push(l*.255,u,c*.175,l*.27*f,d,c*.188*f,l*.231,u,c*.151,l*(.27*f-.024),d,c*(.188*f-.024))}for(let o=0;o<48;o++){const a=o*4,l=a+4;s.push(a,l,a+1,l,l+1,a+1),s.push(a+2,a+3,l+2,l+2,a+3,l+3),s.push(a+1,l+1,a+3,l+1,l+3,a+3),s.push(a,a+2,l,l,a+2,l+2)}es=new Se,es.setAttribute("position",new Gt(n,3)),es.setIndex(s),es.computeVertexNormals(),es.computeBoundingSphere(),es.computeBoundingBox(),Ol=new vh(.047,0),Ol.scale(.78,1.05,.5)}const i=new te;i.name="royal-crown",i.position.set(0,.22,-.11);const t=new Jt(es,new Ve({color:15910746,roughness:.29,metalness:.58,emissive:5911813,emissiveIntensity:.12}));t.name="royal-crown-gold",t.castShadow=!0,t.receiveShadow=!0,i.add(t);const e=new Jt(Ol,new Ve({color:14562379,roughness:.18,metalness:.2,flatShading:!0,emissive:4785420,emissiveIntensity:.12}));return e.name="royal-crown-ruby",e.position.set(0,.042,.195),i.add(e),i}function hd(i,t=0){const e=i==="frog"&&t?`${i}:${t}`:i;if(!Nl.has(e)){const n=i==="frog"?cd([1,.36,.18][t]):({heron:x1,snake:v1,fish:y1}[i]||cd)();for(const s of["skin","eyes","armor","shell","bracers","crest","tongue"])n[s]?.boundingSphere&&(n[s].boundingSphere.radius*=1.9);Nl.set(e,n)}return Nl.get(e)}function Hl(i,t,e,n,s,r,o){const a=Math.hypot(n.y,n.z),l=Math.hypot(s.y,s.z),c=n.y+s.y+r,h=n.z+s.z+o,u=Math.max(Math.abs(a-l)+1e-5,Math.min(a+l-1e-5,Math.hypot(c,h))),d=Math.atan2(h,c),f=-Math.sign(n.y*s.z-n.z*s.y)||1,m=Math.acos($e((a*a+u*u-l*l)/(2*a*u),-1,1)),g=d+f*m,x=g-Math.atan2(n.z,n.y);i.rotation.x=Math.atan2(Math.sin(x),Math.cos(x));const p=Math.cos(g)*a,v=Math.sin(g)*a,y=Math.atan2(h-v,c-p)-i.rotation.x-Math.atan2(s.z,s.y);t.rotation.x=Math.atan2(Math.sin(y),Math.cos(y)),e.rotation.x=-i.rotation.x-t.rotation.x}function E1(i,t){if(!i)return{type:"",phase:0,force:0};let e="kick",n=t;return typeof i=="string"?e=i:typeof i=="number"?n=i:(e=i.type||i.kind||"kick",n=i.phase??i.progress??t),n=$e(n),{type:e,phase:n,force:Math.sin(n*Math.PI)}}function Gl(i,t,e){const n=i.points;if(t<=n[0].s)return e.copy(n[0]),e;for(let s=1;s<n.length;s++)if(t<=n[s].s){const r=n[s-1],o=n[s],a=(t-r.s)/(o.s-r.s||1);return e.set(Ye(r.x,o.x,a),Ye(r.y,o.y,a),Ye(r.z,o.z,a))}return e.copy(n.at(-1)),e}function T1(i="frog",t={}){["frog","heron","snake","fish"].includes(i)||(i="frog");const e=hd(i),n=new te,s=new te;n.name=`creature-${i}`,s.name="anatomical-animation-pivot",n.add(s);const r=i==="frog"?7378989:i==="snake"?6715206:i==="fish"?8624996:16777215,o=M1(i,t.color??r);o.emissive.set(16777215),o.emissiveIntensity=0;const a=new $d({color:16777215,vertexColors:!0,roughness:.13,clearcoat:1,clearcoatRoughness:.05,metalness:.05}),{bones:l,skeleton:c,root:h}=S1(e.rig.defs),u=new $o(e.skin,o);u.name=`${i}-weighted-surface`,u.add(h),s.add(u),u.castShadow=!0,u.receiveShadow=!0,u.frustumCulled=!0,n.updateMatrixWorld(!0),u.bind(c);const d=new $o(e.eyes,a);d.name="articulated-eyes",d.bind(c,u.bindMatrix),d.castShadow=!1,d.frustumCulled=!0,s.add(d);const f=new $o(e.skin,b1(t.outlineColor??(t.team==="enemy"?16741200:t.team==="player"?11075554:i==="frog"?8513956:16755275),i==="frog"?.018:.027));f.name="animated-color-silhouette",f.bind(c,u.bindMatrix),f.frustumCulled=!0,f.renderOrder=-1,s.add(f);const m=[];for(const ht of["armor","shell","bracers","crest","tongue"])if(e[ht]){const Y=new Ve({color:16777215,vertexColors:!0,roughness:ht==="tongue"?.35:.79,side:Ce}),rt=new $o(e[ht],Y);rt.name=ht,rt.bind(c,u.bindMatrix),rt.frustumCulled=!0,rt.castShadow=ht!=="tongue",rt.visible=ht==="tongue",s.add(rt),m.push(rt)}const g={};for(const ht of l)g[ht.name]=ht;const x=l.map(ht=>ht.position.clone()),p=new qe;p.name="mouth-attachment",l[e.mouth].add(p);let v=(t.seed||0)*.731,y=0,_="",T=1,A=0,E=0,R=0,S=!0,b=!1,U=null,P=1,G=!1,Z=0,H={x:0,z:1,strength:0,life:0,duration:.26,heavy:!1},V={armor:null,weapon:null,crest:!1};const N=t.role||"scout",B=i==="frog"?["guardian","brute","tank"].includes(N)?[1.15,1.12,1.05]:["scout","hunter","agile"].includes(N)?[.96,.98,1.04]:[1.03,1.02,1.02]:[1,1,1];s.scale.set(...B);const Q=()=>{const ht=1+(T-1)*.04+Math.min(24,Math.max(0,P-1))*.004;s.scale.set(B[0]*ht,B[1]*ht,B[2]*ht)},X=()=>{for(const ht of m)ht.name==="armor"&&(ht.visible=i==="frog"&&V.armor==="reed"),ht.name==="shell"&&(ht.visible=i==="frog"&&V.armor==="shell"),ht.name==="bracers"&&(ht.visible=i==="frog"&&V.weapon==="reed"),ht.name==="crest"&&(ht.visible=i==="frog"&&V.crest&&!b)},ft=()=>{for(let ht=0;ht<l.length;ht++)l[ht].rotation.set(0,0,0),l[ht].scale.set(1,1,1),l[ht].position.copy(x[ht])};let Vt=null;function Me(ht){if(i!=="snake"||!ht?.points?.length||!ht.weight)return;Vt||(Vt={targets:Array.from({length:21},()=>new he),local:new he,inverse:new he,point:Oe(),before:Oe(),after:Oe(),translation:Oe(),rotation:new hs,scale:Oe(1,1,1),localPosition:Oe(),localRotation:new hs,localScale:Oe()});const Y=Vt,rt=$e(ht.weight),_t=ht.scale||1,Xt=ht.origin,Nt=Math.cos(ht.yaw||0),fe=Math.sin(ht.yaw||0);s.position.y*=1-rt,s.rotation.x*=1-rt,s.rotation.z*=1-rt;for(let I=0;I<=20;I++){const ne=I?g["coil"+I]:g.head,jt=1.97-I*.22,Yt=(I?jt:2.17)*_t;Gl(ht,Yt,Y.point),Gl(ht,Yt-.07*_t,Y.before),Gl(ht,Yt+.07*_t,Y.after);const It=Y.after.x-Y.before.x,se=Y.after.z-Y.before.z,mt=Math.hypot(It,se),Mt=mt>1e-4?Math.atan2(It,se):ht.yaw||0;I||(Y.point.x-=Math.sin(Mt)*.2*_t,Y.point.z-=Math.cos(Mt)*.2*_t);const le=(Y.point.x-Xt.x)/_t,ze=(Y.point.z-Xt.z)/_t,D=Math.max(Y.point.y,Y.before.y,Y.after.y);Y.translation.set(Nt*le-fe*ze,(D-Xt.y)/_t+(I?.26:.3),fe*le+Nt*ze),Y.rotation.setFromAxisAngle(Yc,Mt-(ht.yaw||0)),Y.targets[I].compose(Y.translation,Y.rotation,Y.scale),Y.local.copy(Y.targets[I]),I&&Y.local.premultiply(Y.inverse.copy(Y.targets[I-1]).invert()),Y.local.decompose(Y.localPosition,Y.localRotation,Y.localScale),ne.position.lerp(Y.localPosition,rt),ne.quaternion.slerp(Y.localRotation,rt),ne.scale.lerp(Y.localScale,rt)}g.jaw.rotation.x*=1-rt*.8;const we=m.find(I=>I.name==="tongue");we&&rt>.8&&(we.visible=!1)}const ce={group:n,bones:g,skeleton:c,mesh:u,get crowned(){return b},get equipment(){return{...V}},get level(){return P},get working(){return G},stats:{type:i,vertices:e.skin.attributes.position.count+e.eyes.attributes.position.count,triangles:(e.skin.index.count+e.eyes.index.count)/3,boneCount:l.length,length:e.length,height:e.height,rigged:!0,renderLOD:0},setOutline(ht,Y=!0){ht!=null&&f.material.color.set(ht),S=Y,f.visible=Y&&R===0},setRenderLOD(ht=0){const Y=i==="frog"?$e(Math.round(Number(ht)||0),0,2):0;if(Y===R)return;R=Y;const rt=hd(i,Y);for(const _t of[u,d,f,...m])_t.geometry=rt[_t===u||_t===f?"skin":_t===d?"eyes":_t.name],_t.boundingSphere=null,_t.boundingBox=null,_t.castShadow=Y===0&&_t!==d&&_t!==f&&_t.name!=="tongue";f.visible=S&&Y===0,U&&(U.getObjectByName("royal-crown-gold").castShadow=Y===0),ce.stats.vertices=rt.skin.attributes.position.count+rt.eyes.attributes.position.count,ce.stats.triangles=(rt.skin.index.count+rt.eyes.index.count)/3,ce.stats.renderLOD=Y},setTier(ht){T=$e(Math.round(ht||1),1,5),Q()},setLevel(ht){P=$e(Math.floor(Number(ht)||1),1,999),Q()},setEquipment(ht={}){return V=i==="frog"?{armor:["reed","shell"].includes(ht?.armor)?ht.armor:null,weapon:ht?.weapon==="reed"?"reed":null,crest:ht?.crest===!0}:{armor:null,weapon:null,crest:!1},X(),{...V}},setWorking(ht=!1){G=i==="frog"&&!!ht},setImpact(ht={}){const Y=$e(Number(ht.strength)||0,0,1.5),rt=Number(ht.x)||0,_t=Number(ht.z)||0,Xt=Math.hypot(rt,_t)||1,Nt=$e(Number(ht.duration)||.26,.08,.5);H={x:rt/Xt,z:_t/Xt,strength:Y,life:Y?Nt:0,duration:Nt,heavy:!!ht.heavy},o.emissiveIntensity=Y?Math.min(.82,.34+Y*.35):0},setCrowned(ht=!1){return b=i==="frog"&&!!ht,b&&!U&&(U=w1(),g.head.add(U)),U&&(U.visible=b,U.getObjectByName("royal-crown-gold").castShadow=R===0),X(),b},mouthWorld(ht=new L){return n.updateWorldMatrix(!0,!0),p.getWorldPosition(ht)},update(ht,Y={}){ht=$e(Number(ht)||0,0,.1),v=Y.time!==void 0?Y.time+(t.seed||0)*.731:v+ht,ft();const rt=Math.max(0,Number(Y.speed)||0),_t=$e(rt/(i==="frog"?2.8:3));E=Ye(E,_t,1-Math.exp(-ht*12));const Xt=Y.swimming?1:0,Nt=typeof Y.jump=="number"?$e(Y.jump):Y.jump?.5:0,fe=typeof Y.attack=="string"?Y.attack:Y.attack?.type||Y.attack?.kind||(Y.attack?"kick":"");fe!==_?(y=0,_=fe):Y.attack&&(y+=ht/.55);const we=E1(Y.attack,y),I=we.force,ne=typeof Y.roar=="number"?$e(Y.roar):Y.roar?1:0,jt=typeof Y.hit=="number"?$e(Y.hit):Y.hit?1:0;H.life=Math.max(0,H.life-ht),o.emissiveIntensity=H.life>0?Math.max(0,1-(H.duration-H.life)/.07)*Math.min(.82,.34+H.strength*.35):0,Y.building!==void 0&&(G=i==="frog"&&!!Y.building),Z=Ye(Z,G&&!Y.dead&&!we.type&&rt<1?1:0,1-Math.exp(-ht*12)),A=Ye(A,Y.dead?1:0,1-Math.exp(-ht*5)),s.position.set(0,0,0),s.rotation.set(0,0,0);const Yt=(v+(t.seed||0)*.4)%5.7,It=Yt>5.5?.08+.92*Math.abs((Yt-5.6)*10):1;if(g.eyeL&&(g.eyeL.scale.y=$e(It,.08,1)),g.eyeR&&(g.eyeR.scale.y=$e(It,.08,1)),i==="frog"){const se=Y.hop||(Nt>0?{phase:"air",progress:1-Nt}:{phase:"idle",progress:0}),mt=$e(se.progress||0),Mt=se.phase==="air",le=se.phase==="gather"?mt:0,ze=se.phase==="land"?Math.sin(mt*Math.PI):0,D=Mt?Math.sin($e(mt/.14)*Math.PI/2)*(1-$e((mt-.16)/.48)):0,w=Mt?$e((mt-.82)/.18):0,tt=Mt?1-$e(mt/.14):0,at=Mt?$e((mt-.25)/.45)*(1-w):0,lt=Mt?$e((mt-.6)/.35):0,ot=v*7.8,Lt=Math.sin(ot)*E;s.position.y=Xt?-.14+.023*Math.sin(v*3):-.085*(le+tt)-.075*ze,s.rotation.x=Xt?-.12:(le+tt)*.07-(Mt?Math.sin(mt*Math.PI)*.12:0)+lt*.08*(1-w),g.spine.rotation.x=Math.sin(v*2.6)*.009,g.spine.scale.y=1+Math.sin(v*2.6)*.018,g.head.rotation.x=.02*Math.sin(v*1.7)-ne*.18-(Mt?.04:0),g.jaw.rotation.x=-ne*.13-(we.type==="tongue"?I*.16:0),g.throat.scale.set(1+ne*.26,1+ne*1.45+Math.sin(v*2.5)*.035,1+ne*.25);for(const ct of[-1,1])if(Xt)g[`hip${ct}`].rotation.x=-.32*Lt,g[`hip${ct}`].rotation.z=ct*.07*Lt,g[`knee${ct}`].rotation.x=.62*Lt,g[`ankle${ct}`].rotation.x=-.25*Lt,g[`foot${ct}`].rotation.x=.2*Lt,g[`shoulder${ct}`].rotation.x=-.23*Lt,g[`elbow${ct}`].rotation.x=.28*Lt,g[`wrist${ct}`].rotation.x=-.12*Lt,g[`shoulder${ct}`].rotation.z=ct*(.22+.25*Lt),g[`elbow${ct}`].rotation.y=ct*.3;else if(!Y.dead){const wt=e.rig.ids,zt=Mt?.085*tt+(-.1*D+.045*at)*(1-tt):-s.position.y,gt=Mt?.035*tt+(-.42*D+.11*at)*(1-tt):.035*le,Rt=Mt?.085*tt+(.085*(1-lt)-.035*lt)*(1-w)*(1-tt):-s.position.y,Qt=Mt?(-.075*(1-lt)+.13*lt)*(1-w)*(1-tt):0;Hl(g[`hip${ct}`],g[`knee${ct}`],g[`ankle${ct}`],x[wt[`knee${ct}`]],x[wt[`ankle${ct}`]],zt,gt),Hl(g[`shoulder${ct}`],g[`elbow${ct}`],g[`wrist${ct}`],x[wt[`elbow${ct}`]],x[wt[`wrist${ct}`]],Rt,Qt),g[`foot${ct}`].rotation.x=-D*.14}if(we.type==="kick"||we.type==="strike"){s.rotation.y=-I*.55,s.rotation.z=I*.22,s.position.y+=I*.16;const ct=e.rig.ids;Hl(g.hip1,g.knee1,g.ankle1,x[ct.knee1],x[ct.ankle1],.26*I,1.16*I),g.hip1.rotation.y=-I*.3,g.hip1.rotation.z=-I*.08,g["shoulder-1"].rotation.z=I*.55}else if(we.type==="slam"||we.type==="belly"){const ct=Math.sin(we.phase*Math.PI);s.rotation.x=-ct*.28,s.position.y+=ct*.22;for(const wt of[-1,1])g[`hip${wt}`].rotation.x-=ct*.7,g[`shoulder${wt}`].rotation.z=wt*ct*.45}else we.type==="tongue"&&(g.head.rotation.x-=I*.1,g.spine.rotation.x-=I*.07);if(Z>.001){const ct=v*8.2,wt=.5+.5*Math.sin(ct),zt=.5+.5*Math.sin(ct+Math.PI);g.spine.rotation.x+=.1*Z,g.head.rotation.x+=(.12+.06*wt)*Z,g.shoulder1.rotation.x-=(.25+wt*.85)*Z,g.elbow1.rotation.x+=(.2+wt*.55)*Z,g.wrist1.rotation.x-=wt*.3*Z,g["shoulder-1"].rotation.x-=(.13+zt*.35)*Z,g["elbow-1"].rotation.x+=(.15+zt*.2)*Z,s.position.y+=.025*Math.cos(ct)*Z}if(H.life>0){const ct=1-H.life/H.duration,wt=Math.sin(Math.min(1,ct/.22)*Math.PI/2)*Math.pow(1-ct,1.8)*H.strength,zt=wt*(H.heavy?1.2:1);s.rotation.x+=H.z*.17*zt,s.rotation.z-=H.x*.21*zt,s.position.x+=H.x*.045*zt,s.position.z+=H.z*.055*zt,g.spine.scale.z*=1-.075*wt,g.head.rotation.x-=.15*zt,g.head.rotation.z-=H.x*.08*zt,g.jaw.rotation.x-=.12*zt,g["shoulder-1"].rotation.z-=.1*zt,g.shoulder1.rotation.z+=.1*zt,g.eyeL.scale.y*=1-.55*wt,g.eyeR.scale.y*=1-.55*wt}else jt>0&&(s.rotation.x+=jt*.065);s.position.y-=A*.22,s.rotation.z+=A*1.35,g.spine.scale.y*=1-A*.15}else if(i==="heron"){const se=v*5.6,mt=E;s.position.y=.035*Math.sin(se*2)*mt,g.spine.rotation.x=-.03*Math.sin(se)*mt,g.neck0.rotation.x=.1*Math.sin(v*1.4)-I*.62,g.neck1.rotation.x=-.08*Math.sin(v*1.4)+I*.58,g.neck2.rotation.x=-.03+I*.7,g.head.rotation.x=-.06*Math.sin(v*1.8)+I*.48,g.jaw.rotation.x=-I*.5;for(const Mt of[-1,1]){const le=se+(Mt<0?Math.PI:0),ze=Math.sin(le);g[`hip${Mt}`].rotation.x=ze*.31*mt,g[`knee${Mt}`].rotation.x=Math.max(0,-ze)*.57*mt,g[`foot${Mt}`].rotation.x=-.18*ze*mt,g[`wing${Mt}`].rotation.y=Mt*(1.24-I*1.07-jt*.55),g[`wing${Mt}`].rotation.z=Mt*(.07+I*(.5+.25*Math.sin(v*18))+jt*.5),g[`wingElbow${Mt}`].rotation.y=Mt*.12,g[`wingWrist${Mt}`].rotation.z=Mt*I*.18}s.rotation.z+=(H.life>0?0:jt*.08*Math.sin(v*32))+A*1.45,s.position.y-=A*1.8}else if(i==="snake"){const se=v*(3+E*5),mt=.055+E*.105;for(let le=1;le<=20;le++)g[`coil${le}`].rotation.y=Math.sin(se-le*.48)*mt,g[`coil${le}`].rotation.x=le<6?-I*.18*(1-le/7):.006*Math.sin(v*3-le);g.head.rotation.x=I*.45,g.head.rotation.y=Math.sin(se)*.035,g.jaw.rotation.x=-I*.62,s.position.y=I*.28;const Mt=m.find(le=>le.name==="tongue");Mt&&(Mt.visible=!Y.dead&&(Math.sin(v*3.7)>.77||I>.2)),s.rotation.z=A*.65+(H.life>0?0:jt*.1*Math.sin(v*32))}else if(i==="fish"){const se=v*(4+E*10),mt=.09+E*.22;g.spine.rotation.y=Math.sin(se)*mt*.2,g.head.rotation.y=-Math.sin(se)*mt*.13,g.tail0.rotation.y=Math.sin(se-.5)*mt,g.tail1.rotation.y=Math.sin(se-1.1)*mt*1.25,g.tail.rotation.y=Math.sin(se-1.6)*mt*1.2,g.jaw.rotation.x=-I*.62-.035*Math.sin(v*2.5);for(const Mt of[-1,1])g[`fin${Mt}`].rotation.z=Mt*(.13+.16*Math.sin(v*6)),g[`fin${Mt}`].rotation.y=Mt*.15*Math.sin(v*5);s.rotation.x=-I*.35,s.position.y=.035*Math.sin(v*2),s.rotation.z=A*Math.PI+(H.life>0?0:jt*.14*Math.sin(v*35))}if(i!=="frog"&&H.life>0){const se=1-H.life/H.duration,mt=Math.sin(Math.min(1,se/.22)*Math.PI/2)*Math.pow(1-se,1.8)*H.strength*(H.heavy?1.2:1);s.rotation.x+=H.z*.055*mt,s.rotation.z-=H.x*.08*mt,g.head.rotation.x-=.075*mt,g.head.rotation.z-=H.x*.05*mt}i==="snake"&&Me(Y.snakePose)},dispose(){o.dispose(),a.dispose(),f.material.dispose();for(const ht of m)ht.material.dispose();U&&U.traverse(ht=>{ht.isMesh&&ht.material.dispose()}),c.dispose(),n.removeFromParent()}};return ce.setTier(t.tier||1),ce.setLevel(t.level||1),ce.setEquipment(t.equipment),ce.setCrowned(t.crowned),ce.update(0,{}),n.userData.creature=ce,ce}const Ln=(i,t)=>Object.freeze({x:i,z:t}),_r=["player","rival-1","rival-2"],A1=.78,_i=.84,Cn=1e-5,Ha=Object.freeze([{id:"catapult-player",enclosureId:"yard-player",owner:_r[0],x:-8.5,z:16},{id:"catapult-rival-1",enclosureId:"yard-rival-1",owner:_r[1],x:-16,z:-8.5},{id:"catapult-rival-2",enclosureId:"yard-rival-2",owner:_r[2],x:16,z:-8.5}].map(Object.freeze)),Wn=Object.freeze([{id:"base-player",owner:_r[0],x:0,z:20.5,spawn:Ln(0,19.65),spawnHeading:Math.PI,stock:Ln(0,21.4),gate:Ln(0,17.9),approach:Ln(0,16.25),side:"north",halfWidth:3.1,halfDepth:2.6},{id:"base-rival-1",owner:_r[1],x:-18,z:1,spawn:Ln(-17.35,1),spawnHeading:Math.PI/2,stock:Ln(-19.1,1),gate:Ln(-14.9,1),approach:Ln(-13.25,1),side:"east",halfWidth:3.1,halfDepth:2.9},{id:"base-rival-2",owner:_r[2],x:18,z:1,spawn:Ln(17.35,1),spawnHeading:-Math.PI/2,stock:Ln(19.1,1),gate:Ln(14.9,1),approach:Ln(13.25,1),side:"west",halfWidth:3.1,halfDepth:2.9}].map(Object.freeze));function of(i,t){return i.map(e=>{let n=-1/0,s=1/0;const r=e.halfWidth+.18,o=e.halfDepth+.18,a=Math.ceil(r*2/.22),l=Math.ceil(o*2/.22);for(let x=0;x<=a;x++)for(let p=0;p<=l;p++){const v=-r+r*2*x/a,y=-o+o*2*p/l,_=t(e.x+v,e.z+y);n=Math.max(n,_),s=Math.min(s,_)}const c=n+.16,h=Math.hypot(e.gate.x-e.x,e.gate.z-e.z),u=(e.gate.x-e.x)/h,d=(e.gate.z-e.z)/h,f=-d,m=u,g={x:e.gate.x+u*.18,z:e.gate.z+d*.18,dx:u,dz:d,rightX:f,rightZ:m,halfWidth:1.55,length:2.5,rows:10,cols:6,heights:[]};for(let x=0;x<=g.rows;x++)for(let p=0;p<=g.cols;p++){const v=x/g.rows*g.length,y=(p/g.cols*2-1)*g.halfWidth,_=g.x+u*v+f*y,T=g.z+d*v+m*y,A=t(g.x+u*g.length+f*y,g.z+d*g.length+m*y)+.015;g.heights.push(Math.max(c+(A-c)*x/g.rows,t(_,T)+.015))}return{id:e.id,baseId:e.id,x:e.x,z:e.z,halfWidth:r,halfDepth:o,height:c,minimum:s,ramp:g}})}function R1(i){return of(Wn,i)}function C1(i){return of(af,i)}function P1(i,t,e){if(!e)return null;for(const n of e){if(Math.abs(i-n.x)<=n.halfWidth+1e-7&&Math.abs(t-n.z)<=n.halfDepth+1e-7)return n.height;const s=n.ramp,r=i-s.x,o=t-s.z,a=r*s.dx+o*s.dz,l=r*s.rightX+o*s.rightZ;if(a<-1e-7||a>s.length+1e-7||Math.abs(l)>s.halfWidth+1e-7)continue;const c=Math.max(0,Math.min(s.rows,a/s.length*s.rows)),h=Math.max(0,Math.min(s.cols,(l/s.halfWidth+1)*.5*s.cols)),u=Math.min(s.rows-1,Math.floor(c)),d=Math.min(s.cols-1,Math.floor(h)),f=c-u,m=h-d,g=s.heights[u*(s.cols+1)+d],x=s.heights[u*(s.cols+1)+d+1],p=s.heights[(u+1)*(s.cols+1)+d],v=s.heights[(u+1)*(s.cols+1)+d+1];return(g+(x-g)*m)*(1-f)+(p+(v-p)*m)*f}return null}const af=Object.freeze(Ha.map(i=>Object.freeze({id:i.enclosureId,owner:i.owner,x:i.x,z:i.z,halfWidth:2.8,halfDepth:2.8,side:"south",gate:Ln(i.x,i.z+2.8),approach:Ln(i.x,i.z+4.45)}))),Ga=Object.freeze([...Wn.map(i=>Object.freeze({...i,kind:"shelter",height:2.3})),...af.map(i=>Object.freeze({...i,kind:"catapult",height:1.65}))]),aa=3.2,ar=.34;function z1(i){const t=[],e=(n,s,r,o,a,l="whole")=>t.push(Object.freeze({id:`${i.id}-${n}-${l}`,enclosureId:i.id,owner:i.owner,x:s,z:r,hw:o,hd:a,height:i.height}));for(const n of["north","south"]){const s=i.z+(n==="north"?-i.halfDepth:i.halfDepth);if(i.side===n){const r=(i.halfWidth-aa/2)/2;for(const o of[-1,1])e(n,i.x+o*(aa/2+r),s,r,ar/2,String(o))}else e(n,i.x,s,i.halfWidth+ar/2,ar/2)}for(const n of["west","east"]){const s=i.x+(n==="west"?-i.halfWidth:i.halfWidth);if(i.side===n){const r=(i.halfDepth-aa/2)/2;for(const o of[-1,1])e(n,s,i.z+o*(aa/2+r),ar/2,r,String(o))}else e(n,s,i.z,ar/2,i.halfDepth+ar/2)}return t}const ds=Object.freeze(Ga.flatMap(z1)),wh=Object.freeze([{id:"grove-west",x:-7,z:9,radius:3.1},{id:"grove-east",x:8,z:6.4,radius:3.1},{id:"grove-middle",x:0,z:-4.5,radius:3.4},{id:"grove-northwest",x:-7.2,z:-8.8,radius:2.5},{id:"grove-northeast",x:7.6,z:-9.2,radius:2.5}].map(Object.freeze)),_o=Object.freeze([{x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6},...Ha.map(i=>({x:i.x,z:i.z,r:.95,machine:!0}))]);function Va(i,t=0){return{minX:i.x-i.hw-t,maxX:i.x+i.hw+t,minZ:i.z-i.hd-t,maxZ:i.z+i.hd+t}}function Eh(i,t,e,n=0){return i>e.minX+n&&i<e.maxX-n&&t>e.minZ+n&&t<e.maxZ-n}function lf(i,t,e,n,s,r=0){const o=Va(s,r),a=e-i,l=n-t;let c=-1/0,h=1/0,u=0,d=0;for(const[f,m,g,x,p]of[[i,a,o.minX,o.maxX,"x"],[t,l,o.minZ,o.maxZ,"z"]]){if(Math.abs(m)<1e-12){if(f<g-Cn||f>x+Cn)return null;continue}const v=(g-f)/m,y=(x-f)/m,_=Math.min(v,y),T=Math.max(v,y);if(_>c&&(c=_,u=p==="x"?m>0?-1:1:0,d=p==="z"?m>0?-1:1:0),h=Math.min(h,T),c>h+Cn)return null}return h<0||c>1||c<0&&!Eh(i,t,o,-Cn)?null:{t:Math.max(0,c),nx:u,nz:d}}function D1(i,t,e,n,s=0){let r=1/0;for(const o of ds){const a=lf(i,t,e,n,o,s);a&&a.t<r&&(r=a.t)}return Number.isFinite(r)?r:null}function ks(i,t,e=.1){return D1(i.x,i.z,t.x,t.z,e)===null}function so(i,t,e,n=A1){let s=i.x,r=i.z,o=Number.isFinite(t)?t:0,a=Number.isFinite(e)?e:0;for(let l=0;l<4;l++){let c=!1;for(const h of ds){const u=Va(h,n);if(!Eh(s,r,u,Cn))continue;const d=[{distance:s-u.minX,x:u.minX-Cn,z:r},{distance:u.maxX-s,x:u.maxX+Cn,z:r},{distance:r-u.minZ,x:s,z:u.minZ-Cn},{distance:u.maxZ-r,x:s,z:u.maxZ+Cn}];d.sort((f,m)=>f.distance-m.distance),s=d[0].x,r=d[0].z,c=!0}if(!c)break}for(let l=0;l<4&&(Math.abs(o)>Cn||Math.abs(a)>Cn);l++){let c=null;for(const f of ds){const m=lf(s,r,s+o,r+a,f,n);m&&(!c||m.t<c.t)&&(c=m)}if(!c){s+=o,r+=a;break}const h=Math.max(0,c.t-Cn);s+=o*h,r+=a*h;const u=1-c.t;o*=u,a*=u;const d=o*c.nx+a*c.nz;if(d<0)o-=c.nx*d,a-=c.nz*d;else break}return{x:s,z:r}}function Wa(i){return wh.find(t=>Math.hypot(i.x-t.x,i.z-t.z)<=t.radius)||null}function I1(i){return Wa(i)?.55:1}function L1(i){return Ga.find(t=>Math.abs(i.x-t.x)<t.halfWidth&&Math.abs(i.z-t.z)<t.halfDepth)||null}function U1(i,t,e,n){const s=t.x-i.x,r=t.z-i.z,o=s*s+r*r,a=o?Math.max(0,Math.min(1,((e.x-i.x)*s+(e.z-i.z)*r)/o)):0;return Math.hypot(i.x+a*s-e.x,i.z+a*r-e.z)<n-Cn}function Mr(i,t){return ks(i,t,_i)&&_o.every(e=>!U1(i,t,e,e.r+_i))}function k1(i){return Math.hypot(i.x,i.z)<=23.85&&ds.every(t=>!Eh(i.x,i.z,Va(t,_i),-Cn))&&_o.every(t=>Math.hypot(i.x-t.x,i.z-t.z)>t.r+_i+Cn)}let la=null;const lr=new WeakMap;function N1(){if(la)return la;const i=[],t=(n,s)=>{const r={x:n,z:s};k1(r)&&!i.some(o=>Math.hypot(o.x-n,o.z-s)<.1)&&i.push(r)};for(const n of ds){const s=Va(n,_i+.06);for(const r of[s.minX,s.maxX])for(const o of[s.minZ,s.maxZ])t(r,o)}for(const n of _o)for(let s=0;s<12;s++){const r=s*Math.PI/6,o=(n.r+_i+.08)/Math.cos(Math.PI/12);t(n.x+Math.cos(r)*o,n.z+Math.sin(r)*o)}for(const n of Ga)t(n.gate.x,n.gate.z),t(n.approach.x,n.approach.z),t(n.gate.x+(n.x-n.gate.x)*.4,n.gate.z+(n.z-n.gate.z)*.4);const e=i.map(()=>[]);for(let n=0;n<i.length;n++)for(let s=n+1;s<i.length;s++)if(Mr(i[n],i[s])){const r=Math.hypot(i[n].x-i[s].x,i[n].z-i[s].z);e[n].push([s,r]),e[s].push([n,r])}return la={nodes:i,edges:e},la}function F1(i,t){let e={x:t.x,z:t.z};const n=_o.find(s=>s.machine&&Math.hypot(e.x-s.x,e.z-s.z)<s.r+_i);return n&&(e={x:n.x,z:n.z+2.05}),so(e,0,0,_i+.02)}function O1(i,t){const{nodes:e,edges:n}=N1(),s=e.length,r=new Float64Array(s),o=new Int32Array(s),a=new Uint8Array(s);r.fill(1/0),o.fill(-1);const l=new Map;for(let d=0;d<s;d++)Mr(i,e[d])&&(r[d]=Math.hypot(i.x-e[d].x,i.z-e[d].z)),Mr(e[d],t)&&l.set(d,Math.hypot(t.x-e[d].x,t.z-e[d].z));let c=-1,h=1/0;for(let d=0;d<s;d++){let f=-1,m=1/0;for(let g=0;g<s;g++)!a[g]&&r[g]<m&&(m=r[g],f=g);if(f<0||m>=h)break;a[f]=1,l.has(f)&&m+l.get(f)<h&&(c=f,h=m+l.get(f));for(const[g,x]of n[f])m+x<r[g]&&(r[g]=m+x,o[g]=f)}if(c<0)return[];const u=[t];for(let d=c;d>=0;d=o[d])u.unshift(e[d]);return u}function cf(i,t){if(!Number.isFinite(t?.x)||!Number.isFinite(t?.z))return{x:0,z:0};const e=so(i,0,0,_i+.02),n=Math.hypot(e.x-i.x,e.z-i.z);if(n>.005)return lr.delete(i),{x:(e.x-i.x)/n,z:(e.z-i.z)/n};for(const c of _o){const h=i.x-c.x,u=i.z-c.z,d=Math.hypot(h,u);if(d<c.r+_i+.01)return lr.delete(i),d>1e-6?{x:h/d,z:u/d}:{x:0,z:1}}const s=F1(i,t),r=Math.hypot(s.x-i.x,s.z-i.z);if(r<.18)return lr.delete(i),{x:0,z:0};if(Mr(i,s))return lr.delete(i),{x:(s.x-i.x)/r,z:(s.z-i.z)/r};let o=lr.get(i);for((!o||Math.hypot(o.goal.x-s.x,o.goal.z-s.z)>1.1||Math.hypot(o.lastX-i.x,o.lastZ-i.z)>3)&&(o={goal:s,path:O1(i,s),lastX:i.x,lastZ:i.z},lr.set(i,o)),o.lastX=i.x,o.lastZ=i.z;o.path.length&&Math.hypot(o.path[0].x-i.x,o.path[0].z-i.z)<.18&&(o.path.length===1||Mr(i,o.path[1]));)o.path.shift();for(let c=o.path.length-1;c>0;c--)if(Mr(i,o.path[c])){o.path.splice(0,c);break}const a=o.path[0];if(!a)return{x:0,z:0};const l=Math.hypot(a.x-i.x,a.z-i.z);return l?{x:(a.x-i.x)/l,z:(a.z-i.z)/l}:{x:0,z:0}}const Pe=Object.freeze({delivery:"catapult",interactionRange:3,baseRadius:.95,minRange:5,maxRange:28,blastRadius:2.8,innerRadius:1.25,flightTime:1.25,arcHeight:8,cooldown:3,recoilDuration:.45,centerLift:.85,rimLift:.45,centerRecovery:.48,rimRecovery:.42}),Th=Ha,B1=(i,t,e)=>Math.max(t,Math.min(e,i));function H1(i,t,e,n=.6){const s=Math.hypot(t,e),r=s>1e-6?t/s:0,o=s>1e-6?e/s:-1,a=Pe.minRange+(Pe.maxRange-Pe.minRange)*B1(Number.isFinite(n)?n:.6,0,1),l=i.x*r+i.z*o,c=576-i.x*i.x-i.z*i.z,h=Math.max(0,-l+Math.sqrt(Math.max(0,l*l+c))),u=Math.min(a,h);return{x:i.x+r*u,z:i.z+o*u,range:u,valid:u>=Pe.minRange-1e-6}}function G1(){return Th.map(i=>({...i,occupant:null,cooldown:0,loaded:!0,aimX:0,aimZ:-1,recoil:0}))}function hf(i,t){return i.catapults.filter(e=>(e.owner===t.id||!e.owner)&&(!e.occupant||e.occupant===t.id)&&Math.hypot(e.x-t.x,e.z-t.z)<=Pe.interactionRange&&ks(t,e,.1)).sort((e,n)=>Math.hypot(e.x-t.x,e.z-t.z)-Math.hypot(n.x-t.x,n.z-t.z))[0]||null}function Is(i,t){const e=i.catapults.find(s=>s.id===t.catapultId);if(e?.occupant===t.id){e.occupant=null,t.x=e.x,t.z=e.z+2.3;const s=Math.hypot(t.x,t.z);s>24&&(t.x*=24/s,t.z*=24/s)}const n=!!t.catapultId;return t.catapultId=null,t.catapultShots=0,t.interactHeld=!1,n}function V1(i,t){if(t.catapultId)return Is(i,t);if(t.ko||t.dizzyTime>0||t.knockUp>0||t.kick>0||t.id!=="player"&&i.phase!=="battle")return!1;const e=hf(i,t);return e?(e.occupant=t.id,t.catapultId=e.id,t.catapultShots=0,t.catapultAim=1,t.x=e.x,t.z=e.z,t.hop=0,t.height=0,t.idle=0,t.hopX=t.hopZ=0,t.impulseX=t.impulseZ=0,i.events.push({type:"catapultMount",id:t.id,catapultId:e.id}),!0):!1}function W1(i,t,e){const n=i.catapults.find(f=>f.id===t.catapultId);if(i.phase!=="battle"||t.ko||t.dizzyTime>0||t.hit>0||t.knockUp>0||!n||n.occupant!==t.id||!n.loaded||n.cooldown>0||e?.valid===!1||!Number.isFinite(e?.x)||!Number.isFinite(e?.z))return!1;let s=e.x,r=e.z;const o=Math.hypot(s,r);o>24&&(s*=24/o,r*=24/o);const a=s-n.x,l=r-n.z,c=Math.hypot(a,l);if(c<Pe.minRange-1e-6)return!1;const h=a/c,u=l/c;c>Pe.maxRange&&(s=n.x+h*Pe.maxRange,r=n.z+u*Pe.maxRange);const d={id:i.nextId++,owner:t.id,catapultId:n.id,startX:n.x+h,startZ:n.z+u,startHeight:1.6,tx:s,tz:r,age:0,duration:Pe.flightTime,arcHeight:Pe.arcHeight};return n.aimX=h,n.aimZ=u,n.loaded=!1,n.cooldown=Pe.cooldown,n.recoil=Pe.recoilDuration,t.catapultShots++,i.shells.push(d),i.events.push({type:"stoneShot",id:t.id,shellId:d.id,catapultId:n.id}),!0}function X1(i,t,e){for(const n of i.catapults)if(n.cooldown=Math.max(0,n.cooldown-t),n.recoil=Math.max(0,n.recoil-t),n.loaded=n.cooldown===0,n.occupant){const s=i.actors.find(r=>r.id===n.occupant);(!s||s.ko||s.dizzyTime>0||s.knockUp>0||s.catapultId!==n.id)&&(s&&s.catapultId===n.id?Is(i,s):n.occupant=null)}for(const n of i.shells)if(n.age+=t,!(n.age<n.duration)&&(i.events.push({type:"stoneImpact",id:n.id,owner:n.owner,x:n.tx,z:n.tz,radius:Pe.blastRadius}),i.phase==="battle"))for(const s of i.actors){const r=s.x-n.tx,o=s.z-n.tz,a=Math.hypot(r,o);if(s.ko||a>Pe.blastRadius||!ks({x:n.tx,z:n.tz},s,0))continue;const l=n.tx-n.startX,c=n.tz-n.startZ,h=Math.hypot(l,c)||1,u=a>1e-6?{dx:r/a,dz:o/a}:{dx:l/h,dz:c/h},d=a<=Pe.innerRadius;e(i,s,{owner:n.owner,...u,damage:d?4:2,force:d?12:8,lift:d?Pe.centerLift:Pe.rimLift,liftDuration:d?Pe.centerRecovery:Pe.rimRecovery})}i.shells=i.shells.filter(n=>n.age<n.duration)}const ln=Object.freeze({radius:.1,muzzleOffset:.8,originHeight:.45,bodyHeight:.95,terrainStep:.12}),Pn=1e-9,ro=new WeakMap,q1={ground:()=>0,solids:new Map},zn=(i,t=0)=>Number.isFinite(i)?i:t,ud=(i,t,e)=>Math.max(t,Math.min(e,i)),uf=i=>ro.get(i)||q1;function $1(i,{ground:t}={}){return typeof t!="function"?(ro.delete(i),i):(ro.get(i)?.ground!==t&&ro.set(i,{ground:t,solids:new Map}),i)}function Fn(i,t,e){return zn(uf(i).ground(t,e))}function Mi(i,t,e,n={x:0,y:0,z:1}){i=zn(i),t=zn(t),e=zn(e);const s=Math.hypot(i,t,e);return s>Pn?{x:i/s,y:t/s,z:e/s}:{...n}}function Zc(i,t){return{x:t.x,y:Fn(i,t.x,t.z)+Math.max(0,zn(t.height))+(t.catapultId?.45:0)+ln.originHeight,z:t.z}}function Y1(i){return Mi(i.aimX,i.aimY,i.aimZ)}function Z1(i){return!i.aim3D&&Math.abs(zn(i.aimY))<Pn}const j1=(i,t,e)=>({x:i.x+t.x*e,y:i.y+t.y*e,z:i.z+t.z*e});function K1(i,t,e){let n=0,s=1,r={x:0,y:0,z:0};for(const o of["x","y","z"]){const a=t[o]-i[o],l=e.min[o],c=e.max[o];if(Math.abs(a)<Pn){if(i[o]<l||i[o]>c)return null;continue}const h=(l-i[o])/a,u=(c-i[o])/a,d=Math.min(h,u),f=Math.max(h,u);if(d>n&&(n=d,r={x:0,y:0,z:0},r[o]=a>0?-1:1),s=Math.min(s,f),n>s+Pn)return null}return s<0||n>1?null:(!r.x&&!r.y&&!r.z&&(r=Mi(i.x-t.x,i.y-t.y,i.z-t.z,{x:0,y:1,z:0})),{t:Math.max(0,n),normal:r})}function J1(i,t,e,n,s,r){const o=t.x-i.x,a=t.z-i.z,l=i.x-e.x,c=i.z-e.z,h=o*o+a*a,u=l*l+c*c-n*n;let d=-1/0,f=1/0,m=!1;if(h<Pn){if(u>0)return null}else{const v=l*o+c*a,y=v*v-h*u;if(y<0)return null;const _=Math.sqrt(y);d=(-v-_)/h,f=(-v+_)/h}const g=t.y-i.y;if(Math.abs(g)<Pn){if(i.y<s||i.y>r)return null}else{const v=(s-i.y)/g,y=(r-i.y)/g,_=Math.min(v,y);_>d&&(d=_,m=!0),f=Math.min(f,Math.max(v,y))}const x=Math.max(0,d);if(x>Math.min(1,f)+Pn||f<0)return null;const p=m?{x:0,y:g>0?-1:1,z:0}:Mi(i.x+o*x-e.x,0,i.z+a*x-e.z,{x:0,y:1,z:0});return{t:x,normal:p}}function Q1(i,t,e,n){const s=(i.x-e.x)/n.x,r=(i.y-e.y)/n.y,o=(i.z-e.z)/n.z,a=(t.x-i.x)/n.x,l=(t.y-i.y)/n.y,c=(t.z-i.z)/n.z,h=a*a+l*l+c*c,u=s*a+r*l+o*c,d=s*s+r*r+o*o-1;let f=0;if(d>0){if(h<Pn)return null;const m=u*u-h*d;if(m<0||(f=(-u-Math.sqrt(m))/h,f<0||f>1))return null}return{t:f,normal:Mi((s+a*f)/n.x,(r+l*f)/n.y,(o+c*f)/n.z,{x:0,y:1,z:0})}}function t_(i,t){const e=uf(i);let n=e.solids.get(t);if(n)return n;const s=ln.radius;return n={walls:ds.map(r=>{const o=Fn(i,r.x,r.z);return{id:r.id,min:{x:r.x-r.hw-s,y:o-s,z:r.z-r.hd-s},max:{x:r.x+r.hw+s,y:o+r.height+.135+s,z:r.z+r.hd+s}}}),rocks:t.map(r=>({...r,ground:Fn(i,r.x,r.z)}))},e.solids.set(t,n),n}function e_(i,t,e){const n=e.x-t.x,s=e.y-t.y,r=e.z-t.z,o=Math.hypot(n,r),a=u=>t.y+s*u-Fn(i,t.x+n*u,t.z+r*u)-ln.radius;let l=0,c=a(0);if(c<=0)return{t:0,normal:Vl(i,t.x,t.z)};if(o<Pn){if(s>=0)return null;const u=-c/s;return u<=1?{t:u,normal:Vl(i,t.x,t.z)}:null}const h=Math.max(1,Math.ceil(o/ln.terrainStep));for(let u=1;u<=h;u++){const d=u/h,f=a(d);if(f<=0){let m=l,g=d;for(let x=0;x<24;x++){const p=(m+g)/2;a(p)>0?m=p:g=p}return{t:g,normal:Vl(i,t.x+n*g,t.z+r*g)}}l=d,c=f}return null}function Vl(i,t,e){const s=(Fn(i,t+.025,e)-Fn(i,t-.025,e))/.05,r=(Fn(i,t,e+.025)-Fn(i,t,e-.025))/(2*.025);return Mi(-s,1,-r)}function n_(i,t,e){if(!Number.isFinite(e))return null;const n=t.x-i.x,s=t.z-i.z,r=n*n+s*s,o=i.x*n+i.z*s,a=i.x*i.x+i.z*i.z-e*e;if(a>Pn)return{t:0,normal:Mi(-i.x,0,-i.z)};if(r<Pn)return null;const l=o*o-r*a;if(l<0)return null;const c=(-o+Math.sqrt(l))/r;return c<0||c>1?null:{t:c,normal:Mi(-i.x-n*c,0,-i.z-s*c)}}function df(i,t,e,{obstacles:n=[],ignoreId:s,hitActors:r=!0,terrain:o=!0,solidFrom:a=0,arenaRadius:l=1/0}={}){a=Math.max(0,zn(a));const c=Math.hypot(e.x-t.x,e.y-t.y,e.z-t.z),h=ud(zn(a)/Math.max(c,Pn),0,1),u={x:t.x+(e.x-t.x)*h,y:t.y+(e.y-t.y)*h,z:t.z+(e.z-t.z)*h};let d=null;const f=(g,x,p={},v=0)=>{if(!g)return;const y=v+g.t*(1-v);y<-Pn||y>1+Pn||d&&y>=d.t-Pn||(d={...g,...p,t:y,kind:x,targetId:p.targetId??null,blocked:x!=="actor"})},m=t_(i,n);if(a<=c){for(const g of m.walls)f(K1(u,e,g),"wall",{wallId:g.id},h);for(const g of m.rocks)f(Q1(u,e,{x:g.x,y:g.ground+g.r*.9,z:g.z},{x:g.r+ln.radius,y:g.r*1.7+ln.radius,z:g.r+ln.radius}),"rock",{},h)}if(r)for(const g of i.actors){if(g.id===s||g.ko||g.eliminated)continue;const x=Fn(i,g.x,g.z)+Math.max(0,zn(g.height))+(g.catapultId?.45:0);f(J1(t,e,g,1+ud(zn(g.load),0,1)*.2,x-ln.radius,x+ln.bodyHeight+ln.radius),"actor",{targetId:g.id})}return o&&f(e_(i,t,e),"terrain"),f(n_(t,e,l),"boundary"),d?{...d,x:t.x+(e.x-t.x)*d.t,y:t.y+(e.y-t.y)*d.t,z:t.z+(e.z-t.z)*d.t,distance:c*d.t}:null}function i_(i,t,e,n,s={}){const r=Mi(e.x,e.y,e.z),o=Math.max(0,zn(n));return df(i,t,j1(t,r,o),s)}function go(i,t,e){const n={x:t.x+t.dx*e,y:zn(t.y,Fn(i,t.x,t.z)+ln.originHeight)+zn(t.dy)*e,z:t.z+t.dz*e};return t.followGround&&(n.y=Fn(i,n.x,n.z)+zn(t.heightOffset,ln.originHeight)),n}function Ah(i,t,e,n={}){const s={x:t.x,y:zn(t.y,Fn(i,t.x,t.z)+ln.originHeight),z:t.z},r=t.followGround&&ro.has(i)?Math.max(1,Math.ceil(e/.2)):1;let o=s;for(let a=1;a<=r;a++){const l=go(i,t,e*a/r),c=df(i,o,l,{...n,terrain:!t.followGround});if(c)return{...c,distance:e*((a-1+c.t)/r)};o=l}return null}function ff(i,t){const e=Zc(i,t),n=Y1(t),s=Z1(t);return s&&(e.y=Fn(i,t.x,t.z)+ln.originHeight),{...e,dx:n.x,dy:n.y,dz:n.z,followGround:s,heightOffset:e.y-Fn(i,t.x,t.z)}}const Wl="4.3.5",ca="frog-arcade-save-v1",ha="frog-arcade-settings-v1",At=Object.freeze({radius:25,capacity:60,dizzyHits:6,finishHits:3,dizzySeconds:4.5,tongueRange:3.2,pickupRange:3.2,tongueInterval:.22,kickRange:3.6,kickCooldown:1.1,kickDuration:.48,hopDuration:.3,landingDuration:.035,shotInterval:.14,projectileSpeed:32,projectileLifetime:.65,introSeconds:20,sabotageSeconds:10,sabotageRange:2.4,sabotageRecovery:.55,respawnSeconds:12,revealSeconds:2.5}),ms=Object.freeze([{x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6}]),Cr=Object.freeze([[0,3.5],[-13,8],[13,1],[-12,-11],[10,-14],[2,17]].map(([i,t],e)=>Object.freeze({id:`swarm-${e}`,x:i,z:t,radius:2.1}))),an=(i,t,e)=>Math.max(t,Math.min(e,i)),nn=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),bi=(i,t)=>{const e=Math.hypot(i,t);return e>1e-6?{x:i/e,z:t/e}:{x:0,z:1}},Fe=(i,t=0)=>Number.isFinite(i)?i:t;function Fi(i){let t=i.seed+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function pf(i,t,e,n=Math.PI){return{id:i,x:t,z:e,aimX:Math.sin(n),aimY:0,aimZ:Math.cos(n),aim3D:!1,aiming:!1,face:n,ammo:At.capacity,load:1,dizzy:0,finishHits:0,dizzyTime:0,ko:!1,eliminated:!1,respawnTime:0,hit:0,invuln:0,shot:0,tongue:0,kick:0,kickCooldown:0,kickPending:!1,impulseX:0,impulseZ:0,hop:0,hopX:0,hopZ:0,hopSpeed:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0,brain:0,decision:0,catapultId:null,catapultShots:0,catapultAim:0,interactHeld:!1,machineTimer:i==="rival-1"?8:12,machineSeeking:!1,aimWindup:0,aiShotReady:0,aiCharging:!1,aiAimX:Math.sin(n),aiAimZ:Math.cos(n),refilling:!1,raidId:null,sabotageId:null,sabotageRecovery:0,revealedTime:0}}function Ns(i,t){return i.bases?.find(e=>e.owner===t.id)||null}const xi=i=>Wn.find(t=>t.id===i?.id);function oo(i,t,e){const n=Math.max(1,Math.ceil(Math.hypot(t,e)/.35));for(let s=0;s<n;s++){let{x:r,z:o}=so(i,t/n,e/n);for(const c of ms){const h=Math.hypot(r-c.x,o-c.z),u=c.r+.78;if(h<u){const d=bi(r-c.x,o-c.z);r=c.x+d.x*u,o=c.z+d.z*u}}for(const c of Th){if(i.catapultId===c.id)continue;const h=Math.hypot(r-c.x,o-c.z),u=Pe.baseRadius+.78;if(h<u){const d=bi(r-c.x,o-c.z);r=c.x+d.x*u,o=c.z+d.z*u}}({x:r,z:o}=so(i,r-i.x,o-i.z));const a=Math.hypot(r,o);a>At.radius-1&&(r*=(At.radius-1)/a,o*=(At.radius-1)/a);const l=so({x:r,z:o},0,0);i.x=l.x,i.z=l.z}}function s_(i,t,e,n,s,r){const o=e-i,a=n-t,l=i-s.x,c=t-s.z,h=o*o+a*a,u=l*l+c*c-r*r;if(u<=0)return 0;if(h<1e-12)return null;const d=2*(l*o+c*a),f=d*d-4*h*u;if(f<0)return null;const m=(-d-Math.sqrt(f))/(2*h);return m>=0&&m<=1?m:null}function fs(i,t){return ks(i,t,.1)&&ms.every(e=>s_(i.x,i.z,t.x,t.z,e,e.r+.1)===null)}function r_(i,t){return!t.ko&&!t.eliminated&&nn(i,t)<=23&&fs(i,t)&&(!Wa(t)||t.revealedTime>0||nn(i,t)<2.2)}function mf(i,t){const e=Cr[Math.floor(t.id/12)];t.swarmId=e.id;const n=Fi(i)*Math.PI*2,s=Math.sqrt(Fi(i))*e.radius;t.x=e.x+Math.sin(n)*s,t.z=e.z+Math.cos(n)*s,t.wait=0,t.phase=Fi(i)*Math.PI*2}function jc(i=731){const t={version:2,swarmVersion:1,seed:i,time:0,status:"playing",phase:"countdown",intro:At.introSeconds,actors:Wn.map(e=>pf(e.owner,e.spawn.x,e.spawn.z,e.spawnHeading)),bases:Wn.map(e=>({id:e.id,owner:e.owner,x:e.x,z:e.z,destroyed:!1,progress:0,attackerId:null})),flies:[],catapults:G1(),shells:[],bullets:[],events:[],nextId:1,stats:{caught:0,shots:0,hits:0,kos:0,basesDestroyed:0}};for(let e=0;e<72;e++){const n={id:e,swarmId:"",x:0,z:0,wait:0,phase:0};mf(t,n),t.flies.push(n)}return t}function o_(i,t){const e=Math.hypot(i,t);return{x:e>.08?i/Math.max(1,e):0,z:e>.08?t/Math.max(1,e):0,fire:e>=.72}}function Kc(i,t){return i.actors.filter(e=>e!==t&&!e.ko&&nn(t,e)<=At.kickRange&&fs(t,e)).sort((e,n)=>nn(t,e)-nn(t,n))[0]||null}function a_(i,t){if(t.ko||t.eliminated||t.dizzyTime>0||t.catapultId||t.tongue>0||t.ammo>=At.capacity)return!1;const e=Ns(i,t),n=xi(e)?.stock;if(e&&!e.destroyed&&n&&nn(t,n)<=At.pickupRange&&fs(t,n))return t.tongue=At.tongueInterval,t.ammo++,i.events.push({type:"tongue",id:t.id,x:n.x,z:n.z,baseId:e.id}),t.id==="player"&&i.stats.caught++,!0;const s=i.flies.filter(r=>r.wait<=0&&nn(t,r)<=At.pickupRange&&fs(t,r)).sort((r,o)=>nn(t,r)-nn(t,o))[0];return s?(t.tongue=At.tongueInterval,t.ammo++,s.wait=7+Fi(i)*4,i.events.push({type:"tongue",id:t.id,x:s.x,z:s.z,swarmId:s.swarmId}),t.id==="player"&&i.stats.caught++,!0):!1}function l_(i,t,e,n,s={}){return i_(i,t,e,n,{...s,obstacles:ms})}function c_(i,t,e=At.projectileSpeed*At.projectileLifetime+ln.muzzleOffset){const n=ff(i,t),s=Math.max(0,Fe(e)),r=Ah(i,n,s,{obstacles:ms,ignoreId:t.id,hitActors:i.phase==="battle",arenaRadius:At.radius-.2}),o=r||go(i,n,s),a=r?.distance??s;return{x:o.x,y:o.y,z:o.z,distance:a,targetId:r?.targetId??null,blocked:r?.blocked??!1,kind:r?.kind??null,normal:r?.normal??null,origin:{x:n.x,y:n.y,z:n.z},muzzle:go(i,n,Math.min(ln.muzzleOffset,a)),direction:{x:n.dx,y:n.dy,z:n.dz}}}function gf(i,t,e){if(Object.assign(t,{x:e.x,y:e.y,z:e.z,life:0}),e.kind==="actor"){const n=i.actors.find(s=>s.id===e.targetId);n&&Rh(i,n,t)}i.events.push({type:"splat",x:t.x,y:t.y,z:t.z,wall:e.kind==="wall"||e.kind==="rock",kind:e.kind,normal:e.normal,dx:t.dx,dy:t.dy,dz:t.dz})}function h_(i,t){if(t.ko||t.eliminated||t.dizzyTime>0||t.hit>0||t.catapultId||t.knockUp>0||t.shot>0||t.ammo<=0||t.id!=="player"&&i.phase!=="battle")return!1;t.shot=At.shotInterval,t.ammo--,t.revealedTime=At.revealSeconds;const e=ff(i,t),n={id:i.nextId++,owner:t.id,...e,life:At.projectileLifetime},s=Ah(i,n,ln.muzzleOffset,{obstacles:ms,ignoreId:t.id,hitActors:i.phase==="battle",arenaRadius:At.radius-.2});return s?gf(i,n,s):(Object.assign(n,go(i,n,ln.muzzleOffset)),i.bullets.push(n)),i.events.push({type:"shot",id:t.id}),t.id==="player"&&i.stats.shots++,!0}function xo(i,t,e="interrupted"){for(const n of i.bases||[])n.attackerId!==t.id||n.destroyed||(n.progress>0&&i.events.push({type:"sabotageInterrupted",baseId:n.id,id:n.owner,by:t.id,reason:e}),n.progress=0,n.attackerId=null);t.sabotageId=null}function u_(i,t,e){xo(i,t,"knockout"),Is(i,t),t.ko=!0,t.dizzyTime=0,t.hop=0,t.knockUp=0,t.knockUpStart=0,t.height=.9,t.impulseX=e.dx*17,t.impulseZ=e.dz*17,t.ammo=0,t.aiCharging=!1,t.respawnTime=Ns(i,t)?.destroyed?0:At.respawnSeconds,i.events.push({type:"ko",id:t.id,by:e.owner,x:t.x,z:t.z,dx:e.dx,dz:e.dz}),e.owner==="player"&&t.id!=="player"&&i.stats.kos++}function Rh(i,t,e){if(t.ko||t.eliminated||t.invuln>0)return!1;const n=Math.max(0,t.height),s=bi(Fe(e.dx),Fe(e.dz)),r=an(Fe(e.force,5),0,30);let o=an(Math.floor(Fe(e.damage,1)),1,9);if(xo(i,t,"hit"),t.sabotageRecovery=At.sabotageRecovery,t.aiCharging=!1,t.aimWindup=0,t.aiShotReady=Math.max(t.aiShotReady,.4),t.hit=.23,t.invuln=.12,t.impulseX=s.x*r,t.impulseZ=s.z*r,t.revealedTime=At.revealSeconds,t.dizzyTime<=0){const a=Math.min(o,At.dizzyHits-t.dizzy);t.dizzy+=a,o-=a,t.dizzy>=At.dizzyHits&&(t.dizzy=At.dizzyHits,t.dizzyTime=At.dizzySeconds,t.finishHits=0,t.hop=0,t.knockUp<=0&&(t.height=0),Is(i,t),i.events.push({type:"dizzy",id:t.id}))}return t.dizzyTime>0&&o>0&&(t.finishHits=Math.min(At.finishHits,t.finishHits+o)),Fe(e.lift)>0&&(Is(i,t),t.knockUpDuration=an(Fe(e.liftDuration,.48),.25,.65),t.knockUp=t.knockUpDuration,t.knockUpPeak=an(e.lift,.1,1.2),t.knockUpStart=n,t.height=n,t.hop=0,t.hopX=t.hopZ=0,t.hopSpeed=0,t.kick=0,t.kickPending=!1),i.events.push({type:"hit",id:t.id,owner:e.owner,x:t.x,z:t.z,...Number.isFinite(e.y)?{y:e.y}:{},dx:s.x,dz:s.z}),e.owner==="player"&&t.id!=="player"&&i.stats.hits++,t.finishHits>=At.finishHits&&u_(i,t,{...e,dx:s.x,dz:s.z}),!0}function d_(i,t){if(i.phase!=="battle"||t.ko||t.eliminated||t.dizzyTime>0||t.hit>0||t.catapultId||t.knockUp>0||t.kick>0||t.kickCooldown>0)return!1;const e=Kc(i,t);if(!e)return!1;const n=bi(e.x-t.x,e.z-t.z);return t.aimX=n.x,t.aimY=0,t.aimZ=n.z,t.aim3D=!1,t.kick=At.kickDuration,t.kickCooldown=At.kickCooldown,t.kickPending=!0,t.kickId=e.id,t.revealedTime=At.revealSeconds,i.events.push({type:"kick",id:t.id}),!0}function f_(i,t){t.kickPending=!1;const e=i.actors.find(s=>s.id===t.kickId);if(!e||e.ko||nn(t,e)>At.kickRange+.25||!fs(t,e))return;const n=bi(e.x-t.x,e.z-t.z);Rh(i,e,{owner:t.id,dx:n.x,dz:n.z,damage:1,force:14}),e.ko||(e.impulseX=n.x*14,e.impulseZ=n.z*14)}function Xa(i,t){return t.ko||t.eliminated||t.catapultId?null:(i.bases||[]).filter(e=>!e.destroyed&&e.owner!==t.id&&nn(t,xi(e).stock)<=At.sabotageRange&&fs(t,xi(e).stock)).sort((e,n)=>nn(t,xi(e).stock)-nn(t,xi(n).stock))[0]||null}function p_(i,t,e){t.destroyed=!0,t.progress=At.sabotageSeconds,t.attackerId=null,e.sabotageId=null;const n=i.actors.find(s=>s.id===t.owner);n&&(xo(i,n,"eliminated"),Is(i,n),n.eliminated=!0,n.ko=!0,n.respawnTime=0,n.ammo=0,n.dizzyTime=0,n.hop=0,n.height=0,n.knockUp=0),e.id==="player"&&i.stats.basesDestroyed++,i.events.push({type:"baseDestroyed",baseId:t.id,id:t.owner,by:e.id,x:t.x,z:t.z})}function m_(i,t,e){for(const n of i.bases){if(n.destroyed)continue;const s=i.actors.filter(l=>t.get(l.id)===n.id&&!l.ko&&!l.eliminated&&l.dizzyTime<=0&&l.hit<=0&&l.sabotageRecovery<=0&&l.knockUp<=0&&l.kick<=0&&l.shot<=0&&l.hop<=0&&Xa(i,l)?.id===n.id),r=s.find(l=>l.id===n.attackerId)||s.sort((l,c)=>l.id.localeCompare(c.id))[0];if(!r){if(n.attackerId){const l=i.actors.find(c=>c.id===n.attackerId);l&&xo(i,l,"released")}continue}if(n.attackerId!==r.id){if(n.attackerId){const l=i.actors.find(c=>c.id===n.attackerId);l&&xo(i,l,"interrupted")}n.progress=0,n.attackerId=r.id,r.sabotageId=n.id,i.events.push({type:"sabotageStart",baseId:n.id,id:n.owner,by:r.id})}const o=xi(n).stock,a=bi(o.x-r.x,o.z-r.z);r.sabotageId=n.id,r.aiming=!1,r.face=Math.atan2(a.x,a.z),r.aimX=a.x,r.aimY=0,r.aimZ=a.z,r.aim3D=!1,r.revealedTime=At.revealSeconds,n.progress=Math.min(At.sabotageSeconds,n.progress+e),n.progress>=At.sabotageSeconds-1e-8&&p_(i,n,r)}}function ua(i,t,e={}){const n=cf(i,t);return{mx:n.x,mz:n.z,aiming:!1,...e}}function dr(i){i.aiCharging=!1,i.aimWindup=0}function Xl(i,t,e){const n=nn(t,e),s=bi(e.x-t.x,e.z-t.z);t.brain-=1/60,t.brain<=0&&(t.brain=.7+Fi(i)*.5,t.decision=Fi(i)>.5?1:-1);let r=!1;if(n<16&&t.ammo>0&&fs(t,e))if(!t.aiCharging&&t.aiShotReady<=0){const l=(Fi(i)-.5)*.08,c=Math.cos(l),h=Math.sin(l);t.aiAimX=s.x*c-s.z*h,t.aiAimZ=s.x*h+s.z*c,t.aimWindup=.32,t.aiCharging=!0}else t.aiCharging&&t.aimWindup<=0&&(r=!0,t.aiCharging=!1,t.aiShotReady=.22+Fi(i)*.1);else dr(t);let o=0,a=0;if(n>11){const l=cf(t,e);o=l.x,a=l.z}else{const l=n<6?-1:0;o=s.x*l+s.z*t.decision*.45,a=s.z*l-s.x*t.decision*.45}return{mx:o,mz:a,aiming:!0,ax:t.aiCharging||r?t.aiAimX:s.x,az:t.aiCharging||r?t.aiAimZ:s.z,fire:r,kick:n<3.3}}function g_(i,t){if(i.phase!=="battle"||t.ko||t.eliminated)return{};if(t.hit>0){dr(t);const h=bi(t.impulseX,t.impulseZ);return{mx:h.x,mz:h.z,aiming:!1}}const e=Ns(i,t),n=xi(e),s=i.actors.filter(h=>h!==t&&r_(t,h)).sort((h,u)=>nn(t,h)-nn(t,u)),r=s[0],o=r?nn(t,r):1/0;if(t.catapultId){if(!r||o<7||t.catapultShots>=2)return t.machineTimer=18,t.machineSeeking=!1,{interactCatapult:!0};const h=i.catapults.find(d=>d.id===t.catapultId),u=bi(r.x-t.x,r.z-t.z);return{aiming:!0,ax:u.x,az:u.z,throwStone:h?.loaded&&t.catapultAim<=0?{x:r.x,z:r.z}:void 0}}if(t.ammo<6&&(t.refilling=!0),t.ammo>=48&&(t.refilling=!1),t.refilling&&e&&!e.destroyed)return dr(t),nn(t,n.stock)<=At.pickupRange-.35&&fs(t,n.stock)?r&&o<5&&t.ammo>0?Xl(i,t,r):{}:ua(t,n.stock);if(e?.attackerId&&e.attackerId!==t.id){const h=s.find(u=>u.id===e.attackerId);return h?Xl(i,t,h):(dr(t),ua(t,n.stock))}if(!i.bases.find(h=>h.id===t.raidId&&!h.destroyed&&h.owner!==t.id)){const h=i.bases.filter(d=>!d.destroyed&&d.owner!==t.id),u=t.id==="rival-1"?"rival-2":"player";t.raidId=(h.find(d=>d.owner===u)||h[0])?.id||null}const l=i.bases.find(h=>h.id===t.raidId),c=xi(l)?.stock;if(l&&nn(t,c)<=At.sabotageRange-.2&&(t.sabotageId===l.id||!r||o>6.5))return dr(t),t.machineSeeking=!1,{sabotage:!0,aiming:!1};if(r&&o<16){const h=i.catapults.find(u=>u.owner===t.id&&!u.occupant);if(t.machineTimer<=0&&!t.machineSeeking&&(t.machineSeeking=!!h&&o>11&&Fi(i)<.35,t.machineTimer=8),t.machineSeeking&&h)if(o<7)t.machineSeeking=!1,t.machineTimer=12;else return ua(t,{x:h.x,z:h.z+2.2},{interactCatapult:nn(t,h)<=Pe.interactionRange&&ks(t,h)});return Xl(i,t,r)}return dr(t),c?ua(t,c):{}}function x_(i,t){const e=Ns(i,t),n=xi(e);if(!e||e.destroyed||!n)return;const s=pf(t.id,n.spawn.x,n.spawn.z,n.spawnHeading);Object.assign(t,s,{invuln:1}),i.events.push({type:"respawn",id:t.id,x:t.x,z:t.z})}function xf(i){const t=i.bases.find(n=>n.owner==="player"),e=i.bases.filter(n=>!n.destroyed);t?.destroyed?i.status="lost":e.length===1&&e[0].owner==="player"&&(i.status="won")}function dd(i,t={},e=1/60){if(i.status!=="playing"||(i.events.length=0,e=an(Fe(e),0,.05),e===0))return;i.time+=e,i.phase==="countdown"&&(i.intro=Math.max(0,i.intro-e),i.intro<1e-8&&(i.intro=0,i.phase="battle",i.events.push({type:"battle"})));for(const s of i.flies)s.wait>0&&(s.wait-=e,s.wait<=0&&mf(i,s));const n=new Map;for(const s of i.actors){for(const u of["shot","tongue","invuln","hit","idle","kickCooldown","aimWindup","aiShotReady","catapultAim","sabotageRecovery","revealedTime"])s[u]=Math.max(0,s[u]-e);if(i.phase==="battle"&&(s.machineTimer=Math.max(0,s.machineTimer-e)),s.ko){Is(i,s),oo(s,s.impulseX*e,s.impulseZ*e),s.impulseX*=Math.exp(-e*3),s.impulseZ*=Math.exp(-e*3),s.height=Math.max(0,s.height-e*1.6),!s.eliminated&&!Ns(i,s)?.destroyed&&(s.respawnTime=Math.max(0,s.respawnTime-e),s.respawnTime<1e-8&&x_(i,s));continue}s.kick>0&&(s.kick=Math.max(0,s.kick-e),s.kickPending&&s.kick<.3&&f_(i,s)),s.dizzyTime>0&&(s.dizzyTime=Math.max(0,s.dizzyTime-e),s.dizzyTime===0&&(s.dizzy=0,s.finishHits=0,s.invuln=.55,i.events.push({type:"recover",id:s.id})));const r=s.id==="player"?t:g_(i,s);r.interactCatapult&&!s.interactHeld&&V1(i,s),s.interactHeld=!!r.interactCatapult;const o=s.catapultId?0:Fe(r.mx),a=s.catapultId?0:Fe(r.mz),l=Math.hypot(o,a),c=l>.08&&s.knockUp<=0,h=Number.isFinite(r.ax)&&Number.isFinite(r.az)&&Math.hypot(r.ax,Fe(r.ay),r.az)>.05;if(s.aiming=r.aiming===void 0?h:r.aiming===!0,s.aiming&&h){const u=Mi(r.ax,Fe(r.ay),r.az);s.aimX=u.x,s.aimY=u.y,s.aimZ=u.z,s.aim3D=Number.isFinite(r.ay)}if(c&&(s.face=Math.atan2(o,a),!s.aiming&&s.kick<=0)){const u=bi(o,a);s.aimX=u.x,s.aimY=0,s.aimZ=u.z,s.aim3D=!1}if(i.phase==="battle"&&r.sabotage&&!c&&!r.fire&&!r.kick&&!r.throwStone){const u=Xa(i,s);u&&n.set(s.id,u.id)}if(s.dizzyTime<=0){if(a_(i,s),r.fire&&h_(i,s),r.kick&&d_(i,s),r.throwStone&&W1(i,s,r.throwStone),s.catapultId){const u=i.catapults.find(d=>d.id===s.catapultId);u&&(u.aimX=s.aimX,u.aimZ=s.aimZ,s.x=u.x,s.z=u.z,s.impulseX=s.impulseZ=0)}if(s.knockUp<=0&&s.hop<=0&&s.idle<=0&&c&&(s.hop=At.hopDuration,s.hopSpeed=an(l,0,1)),s.knockUp<=0&&s.hop>0){s.hop=Math.max(0,s.hop-e);const u=(s.id==="player"?8.8:6.2)*I1(s),d=c?u/Math.max(1,l):0;s.hopX=o*d,s.hopZ=a*d,oo(s,s.hopX*e,s.hopZ*e),s.height=Math.sin((1-s.hop/At.hopDuration)*Math.PI)*(.35+.32*s.hopSpeed),s.hop===0&&(s.height=0,s.hopX=0,s.hopZ=0,s.idle=At.landingDuration,i.events.push({type:"land",id:s.id,x:s.x,z:s.z}))}}if(oo(s,s.impulseX*e,s.impulseZ*e),s.impulseX*=Math.exp(-e*10),s.impulseZ*=Math.exp(-e*10),s.knockUp>0){s.knockUp=Math.max(0,s.knockUp-e);const u=1-s.knockUp/s.knockUpDuration;s.height=s.knockUpStart*(1-u)+Math.sin(u*Math.PI)*s.knockUpPeak,s.knockUp===0&&(s.height=0,s.knockUpStart=0,s.idle=At.landingDuration,i.events.push({type:"land",id:s.id,x:s.x,z:s.z,stone:!0,strength:s.knockUpPeak}))}s.load+=(s.ammo/At.capacity-s.load)*(1-Math.exp(-e*12))}for(const s of i.bullets){const r=Math.min(e,Math.max(0,s.life));if(s.life-=e,r<=0)continue;const o=At.projectileSpeed*r,a=Ah(i,s,o,{obstacles:ms,ignoreId:s.owner,hitActors:i.phase==="battle",arenaRadius:At.radius-.2});a?gf(i,s,a):Object.assign(s,go(i,s,o))}i.bullets=i.bullets.filter(s=>s.life>0),X1(i,e,Rh),m_(i,n,e),xf(i)}function v_(i){return JSON.stringify({...i,events:[],bullets:[],shells:[]})}function y_(i){try{const t=JSON.parse(i);if(![1,2].includes(t?.version)||!Array.isArray(t.actors)||t.actors.length!==3||!Array.isArray(t.flies)||t.flies.length!==72||!["playing","won","lost"].includes(t.status))return null;const e=t.version===1,n=jc(Fe(t.seed,731));if(n.time=an(Fe(t.time),0,1e7),n.nextId=an(Math.floor(Fe(t.nextId,1)),1,1e9),n.intro=e?At.introSeconds:an(Fe(t.intro,At.introSeconds),0,At.introSeconds),n.phase=!e&&(t.phase==="battle"||n.intro===0)?"battle":"countdown",!e){if(!Array.isArray(t.bases)||t.bases.length!==Wn.length)return null;for(const s of n.bases){const r=t.bases.find(o=>o?.id===s.id&&o?.owner===s.owner);if(!r)return null;s.destroyed=r.destroyed===!0,s.progress=s.destroyed?At.sabotageSeconds:0}}for(let s=0;s<3;s++){const r=t.actors[s],o=n.actors[s];if(r?.id!==o.id||!Number.isFinite(r.x)||!Number.isFinite(r.z))return null;for(const u of Object.keys(o))typeof o[u]=="number"&&(o[u]=an(Fe(r[u],o[u]),-1e4,1e4));const a=Ns(n,o),l=a.destroyed,c=l||r.ko===!0;Object.assign(o,{ko:c,eliminated:l,respawnTime:c&&!l?an(Fe(r.respawnTime,At.respawnSeconds)||At.respawnSeconds,.01,At.respawnSeconds):0,aiming:!1,catapultId:null,interactHeld:!1,machineSeeking:!1,aiCharging:!1,aimWindup:0,refilling:r.refilling===!0||Fe(r.ammo)<6,raidId:null,sabotageId:null,sabotageRecovery:0,revealedTime:0,ammo:l?0:an(Math.floor(Fe(r.ammo)),0,At.capacity),load:an(Fe(r.load),0,1),dizzy:an(Fe(r.dizzy),0,At.dizzyHits),finishHits:an(Fe(r.finishHits),0,At.finishHits),dizzyTime:an(Fe(r.dizzyTime),0,At.dizzySeconds),kickPending:!1,kick:0,hop:0,hopX:0,hopZ:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0,impulseX:0,impulseZ:0});for(const u of["shot","tongue","invuln","hit","kickCooldown","aiShotReady"])o[u]=an(o[u],0,2);o.machineTimer=an(o.machineTimer,0,30),o.face=Fe(o.face,Math.PI),o.aim3D=r.aim3D===!0||Math.abs(Fe(r.aimY))>1e-9;const h=Mi(o.aimX,o.aim3D?o.aimY:0,o.aimZ,{x:Math.sin(o.face),y:0,z:Math.cos(o.face)});if(o.aimX=h.x,o.aimY=h.y,o.aimZ=h.z,e){const u=xi(a);Object.assign(o,{x:u.spawn.x,z:u.spawn.z,face:u.spawnHeading,aimX:Math.sin(u.spawnHeading),aimY:0,aimZ:Math.cos(u.spawnHeading),aim3D:!1})}oo(o,0,0)}for(let s=0;s<72;s++){const r=t.flies[s],o=Cr[Math.floor(s/12)];r&&(t.swarmVersion===1&&r.swarmId===o.id&&Number.isFinite(r.x)&&Number.isFinite(r.z)&&nn(r,o)<=o.radius+.001&&Object.assign(n.flies[s],{x:r.x,z:r.z,phase:Fe(r.phase)}),n.flies[s].wait=an(Fe(r.wait),0,12))}if(Array.isArray(t.catapults))for(const s of n.catapults){const r=t.catapults.find(a=>a.id===s.id);r&&(s.cooldown=an(Fe(r.cooldown),0,Pe.cooldown),s.loaded=s.cooldown===0);const o=!e&&t.actors.find(a=>a.catapultId===s.id);if(o){const a=n.actors.find(l=>l.id===o.id);a.x=s.x,a.z=s.z+2.3,oo(a,0,0)}}for(const s of Object.keys(n.stats))n.stats[s]=Math.max(0,Math.floor(Fe(t.stats?.[s])));return xf(n),n}catch{return null}}const di=Object.freeze({sensitivity:.0025,minPitch:-.65,maxPitch:1.15,yaw:Math.PI,pitch:.12}),fd=(i,t,e)=>Math.max(t,Math.min(e,i)),ql=i=>Math.atan2(Math.sin(i),Math.cos(i)),cr=(i,t=0)=>Number.isFinite(i)?i:t;function pd(i,t=0,e=0,{sensitivity:n=di.sensitivity,invertY:s=!1}={}){const r=ql(cr(i?.yaw,di.yaw)),o=fd(cr(i?.pitch,di.pitch),di.minPitch,di.maxPitch),a=Number.isFinite(n)&&n>0?n:di.sensitivity,l=ql(cr(cr(t)*a)),c=cr(cr(e)*a)*(s===!0?-1:1);return{yaw:ql(r-l),pitch:fd(o+c,di.minPitch,di.maxPitch)}}function __(i){const t=i.aiming||i.shot>.02||i.kick>0,e=Math.hypot(i.aimX,i.aimZ);if((t||!Number.isFinite(i.face))&&Number.isFinite(e)&&e>1e-6)return{x:i.aimX/e,z:i.aimZ/e};const n=Number.isFinite(i.face)?i.face:Math.PI;return{x:Math.sin(n),z:Math.cos(n)}}const ss=Object.freeze({...di,sensitivity:.005}),br=Object.freeze({min:.7,max:1.5,default:1});function vf(i,t,e=1.6,n="chase3d",s=ss){const r=Number.isFinite(e)&&e>0?e:1.6,o=Number.isFinite(s?.zoom)?Math.max(br.min,Math.min(br.max,s.zoom)):br.default;if(n==="overview"){const g=Math.max(.86,Math.min(1.6,Math.sqrt(1.2/r)));return{look:[i.x,t+1.2,i.z],position:[i.x,t+1.2+(26*g-1.2)/o,i.z+19*g/o]}}const a=Number.isFinite(s?.yaw)?s.yaw:ss.yaw,l=Math.max(ss.minPitch,Math.min(ss.maxPitch,Number.isFinite(s?.pitch)?s.pitch:ss.pitch)),c={x:Math.sin(a),z:Math.cos(a)},u=12.6*Math.max(1,Math.min(1.42,.72/r))/o,d=u*Math.cos(l),f=i.x+c.x*.9,m=i.z+c.z*.9;return{look:[f,t+1.2,m],position:[f-c.x*d,t+1.2+u*Math.sin(l),m-c.z*d]}}function M_(i,t,{clearance:e=.35,step:n=.15}={}){const s=[...i.look],r=[...i.position],o=r.map((v,y)=>v-s[y]),a=Math.hypot(...o);if(typeof t!="function"||a<1e-8)return{...i,look:s,position:r};const l=o.map(v=>v/a),c=Number.isFinite(e)&&e>=0?e:.35,h=Number.isFinite(n)&&n>0?Math.max(.03,n):.15,u=(v,y)=>{const _=t(v,y);return Number.isFinite(_)?_:-1/0},d=v=>s.map((y,_)=>y+l[_]*v),f=Math.min(a,.12),m=Math.max(1,Math.ceil(f/.03));let g=0;for(let v=0;v<=m;v++){const y=d(f*v/m);g=Math.max(g,u(y[0],y[2])+c-y[1])}g>0&&(s[1]+=g+.001,r[1]+=g+.001);const x=Math.max(1,Math.min(512,Math.ceil((a-f)/h)));let p=f;for(let v=1;v<=x;v++){const y=f+(a-f)*v/x,_=d(y);if(_[1]>=u(_[0],_[2])+c){p=y;continue}let T=y;for(let A=0;A<18;A++){const E=(p+T)/2,R=d(E);R[1]>=u(R[0],R[2])+c?p=E:T=E}return{...i,look:s,position:d(p)}}return{...i,look:s,position:r}}function da(i,t,e,n){const s=n.x-e.x,r=n.z-e.z,o=Math.hypot(s,r),a=o>1e-6?s/o:0,l=o>1e-6?r/o:-1,c=Number.isFinite(i)?i:0,h=Number.isFinite(t)?t:0;return{x:-l*c-a*h,z:a*c-l*h}}const $l=["#d2ff70","#ff765d","#d7a0ff"],b_=new Map(Cr.map((i,t)=>[i.id,t])),md=new WeakMap;function yf(i){let t=md.get(i);t||(t=Cr.map(e=>({swarm:e,available:0,next:1/0})),md.set(i,t));for(const e of t)e.available=0,e.next=1/0;for(const e of i.flies){const n=t[b_.get(e.swarmId)];n&&(e.wait<=0?n.available++:n.next=Math.min(n.next,e.wait))}return t}function _f(i,t,e,n,s){i.fillStyle=s?"#dceee6":"#718781",i.beginPath(),i.ellipse(t-n*.5,e-n*.28,n*.6,n*.32,-.5,0,Math.PI*2),i.ellipse(t+n*.5,e-n*.28,n*.6,n*.32,.5,0,Math.PI*2),i.fill(),i.fillStyle=s?"#384c4c":"#536763",i.strokeStyle=s?"#b6d1c3":"#8ca09a",i.lineWidth=1.4,i.beginPath(),i.ellipse(t,e+n*.12,n*.34,n*.56,0,0,Math.PI*2),i.fill(),i.stroke()}function S_(i,t){if(!t)return;const e=t.getContext("2d");if(!e)return;const n=t.width,s=n/2,r=n*.43,o=r/At.radius;e.clearRect(0,0,n,n),e.save(),e.translate(s,s),e.fillStyle="#153e3af2",e.strokeStyle="#9bd1be",e.lineWidth=4,e.beginPath(),e.arc(0,0,r,0,Math.PI*2),e.fill(),e.stroke(),e.clip();const a=i.focus.x-i.camera.position.x,l=i.focus.z-i.camera.position.z,c=Math.hypot(a,l),h=c>1e-6?a/c:0,u=c>1e-6?l/c:-1,d=(f,m)=>({x:(-u*f+h*m)*o,y:-(h*f+u*m)*o});e.strokeStyle="#ffffff17",e.lineWidth=1;for(let f=-20;f<=20;f+=10){const m=d(f,-25),g=d(f,25),x=d(-25,f),p=d(25,f);e.beginPath(),e.moveTo(m.x,m.y),e.lineTo(g.x,g.y),e.moveTo(x.x,x.y),e.lineTo(p.x,p.y),e.stroke()}for(const f of ms){const m=d(f.x,f.z);e.fillStyle="#769084",e.beginPath(),e.arc(m.x,m.y,f.r*o,0,Math.PI*2),e.fill()}for(const f of wh){const m=d(f.x,f.z);e.fillStyle="#517d4788",e.beginPath(),e.arc(m.x,m.y,f.radius*o,0,Math.PI*2),e.fill()}for(const f of ds){const m=[d(f.x-f.hw,f.z-f.hd),d(f.x+f.hw,f.z-f.hd),d(f.x+f.hw,f.z+f.hd),d(f.x-f.hw,f.z+f.hd)];e.fillStyle="#c4b492",e.beginPath(),e.moveTo(m[0].x,m[0].y);for(const g of m.slice(1))e.lineTo(g.x,g.y);e.closePath(),e.fill()}for(const f of Ha){const m=d(f.x,f.z);e.strokeStyle="#bfd6d0",e.lineWidth=2,e.beginPath(),e.moveTo(m.x-3,m.y+3),e.lineTo(m.x,m.y-4),e.lineTo(m.x+4,m.y+3),e.moveTo(m.x,m.y-1),e.lineTo(m.x+4,m.y-6),e.stroke()}for(const[f,m]of Wn.entries()){const g=i.state.bases?.find(p=>p.id===m.id),x=d(m.stock.x,m.stock.z);if(m.owner==="player"&&g?.attackerId&&!g.destroyed){const p=.5+.5*Math.sin((i.elapsed||0)*4);e.strokeStyle="#ff9a6a",e.lineWidth=3+p,e.beginPath(),e.arc(x.x,x.y,13+p*3,0,Math.PI*2),e.stroke()}e.fillStyle=g?.destroyed?"#4f6258":g?.attackerId?"#ffce77":$l[f],e.strokeStyle="#092b22",e.lineWidth=2,e.beginPath(),e.moveTo(x.x-7,x.y-2),e.lineTo(x.x,x.y-8),e.lineTo(x.x+7,x.y-2),e.lineTo(x.x+7,x.y+7),e.lineTo(x.x-7,x.y+7),e.closePath(),e.fill(),e.stroke(),g?.destroyed&&(e.strokeStyle="#b7c7ba",e.beginPath(),e.moveTo(x.x-5,x.y-5),e.lineTo(x.x+5,x.y+5),e.moveTo(x.x+5,x.y-5),e.lineTo(x.x-5,x.y+5),e.stroke())}for(const f of yf(i.state)){const m=d(f.swarm.x,f.swarm.z),g=f.available>0;e.strokeStyle=g?"#b8daa7":"#6a827b",e.lineWidth=g?1.8:1.2,e.beginPath(),e.arc(m.x,m.y,9,0,Math.PI*2),e.stroke(),_f(e,m.x,m.y,6,g)}i.state.actors.forEach((f,m)=>{if(f.ko||f.eliminated)return;const g=i.state.actors[0];if(m>0&&Wa(f)&&f.revealedTime<=0&&Math.hypot(f.x-g.x,f.z-g.z)>2.2)return;const x=d(f.x,f.z);if(e.fillStyle=$l[m],e.strokeStyle="#102923",e.lineWidth=3,e.beginPath(),e.arc(x.x,x.y,m===0?9:8,0,Math.PI*2),e.fill(),e.stroke(),m===0){const p=d(f.aimX*2.7,f.aimZ*2.7);e.strokeStyle=$l[0],e.lineWidth=4,e.beginPath(),e.moveTo(x.x,x.y),e.lineTo(x.x+p.x,x.y+p.y),e.stroke()}else e.fillStyle="#102923",e.beginPath(),e.arc(x.x-3,x.y-2,1.6,0,Math.PI*2),e.arc(x.x+3,x.y-2,1.6,0,Math.PI*2),e.fill()}),e.restore(),e.fillStyle="#f2ffe1",e.font="bold 18px sans-serif",e.textAlign="center",e.fillText("ΒΑΣΕΙΣ • ΜΥΓΕΣ • ΚΑΛΥΨΗ",s,n-5)}function w_(i,t){const e=i.state.actors[0];if(e.ko||e.ammo>=At.capacity)return;const n=Wn.find(v=>v.owner===e.id),s=i.state.bases?.find(v=>v.owner===e.id);if(n&&s&&!s.destroyed&&Math.hypot(e.x-n.stock.x,e.z-n.stock.z)<=At.pickupRange&&ks(e,n.stock))return;let r=null,o=null,a=1/0,l=1/0;for(const v of yf(i.state)){const y=Math.hypot(v.swarm.x-e.x,v.swarm.z-e.z);y<a&&(r=v,a=y),v.available>0&&y<l&&(o=v,l=y)}const h=r&&r.available===0&&a<=r.swarm.radius+At.pickupRange+.5?r:o;if(!h)return;const u=h.swarm,d=i.project(u.x,i.ground(u.x,u.z)+.35,u.z),f=i.touch&&i.h>i.w?240:110,m=i.touch?Math.min(165,i.h*.3):65;if(!d.visible||d.x<72||d.x>i.w-72||d.y<f||d.y>i.h-m)return;t.save(),t.font="700 12px sans-serif",t.textAlign="left",t.lineJoin="round";const g=h.available>0?`Μύγες · ${h.available}`:`Ξανά σε ${Math.max(1,Math.ceil(h.next))}″`,x=t.measureText(g).width+22,p=d.x-x/2;_f(t,p+7,d.y+8,6,h.available>0),t.strokeStyle="#18352de6",t.lineWidth=3,t.strokeText(g,p+20,d.y+12),t.fillStyle=h.available>0?"#e8f4d5":"#c1d0c9",t.fillText(g,p+20,d.y+12),t.restore()}function E_(i,t,e){return c_(i,t,e)}const T_=new L(0,1,0),A_=Math.PI*2,Yl=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),fa=(i,t,e)=>i+(t-i)*e,pa=["#b8e76c","#ef886a","#be94e0"],R_=.45;class C_{constructor(t){this.game=t,this.scene=t.scene,this.clock=0,this.machines=new Map,this.platforms=new Map,this.shellMeshes=new Map,this.dummy=new qe,this._vector=new L,this._direction=new L,this.geometry={box:new Gi(1,1,1),cylinder:new Us(.5,.5,1,8),rock:new Na(.4,0),leaf:new jn(1,10,5),cup:new jn(.38,10,6,0,A_,Math.PI/2,Math.PI/2),ring:new as(.94,1,48),disc:new ka(1,32),rope:new yh(.14,.027,5,10)},this.material={wood:new gn({color:"#a47746"}),lightWood:new gn({color:"#d4ac64"}),darkWood:new gn({color:"#67503c"}),rope:new gn({color:"#d3c593"}),leaf:new gn({color:"#5c9b67"}),stone:new gn({color:"#90999b",emissive:"#172023",emissiveIntensity:.16}),preview:new Yd({color:"#e6f7a1",dashSize:.45,gapSize:.25,transparent:!0,opacity:.85,depthWrite:!1}),landing:new xn({color:"#d6ed8b",transparent:!0,opacity:.72,side:Ce,depthWrite:!1})},this.material.ramp=new gn({color:"#b18b59",side:Ce});for(const[s,r]of Th.entries()){const o=this.createPlatform(r);o&&this.platforms.set(r.id,o),this.machines.set(r.id,this.createMachine(r,s))}const e=new Float32Array(99),n=new Se;n.setAttribute("position",new un(e,3)),this.previewLine=new po(n,this.material.preview),this.previewLine.name="catapult-trajectory-preview",this.previewLine.frustumCulled=!1,this.previewLine.visible=!1,this.scene.add(this.previewLine),this.landingMarker=new Jt(this.geometry.ring,this.material.landing),this.landingMarker.name="catapult-landing-preview",this.landingMarker.rotation.x=-Math.PI/2,this.landingMarker.scale.setScalar(Pe.blastRadius),this.landingMarker.visible=!1,this.scene.add(this.landingMarker)}ground(t,e){return this.game.ground(t,e)}mesh(t,e,n,s=[0,0,0],r=[1,1,1]){const o=new Jt(e,n);return o.position.fromArray(s),o.scale.fromArray(r),t.add(o),o}createPlatform(t){const e=this.game.houseFloors?.find(d=>d.id===t.enclosureId);if(!e)return null;const n=new te;n.name=`${t.id}-level-platform`,n.position.set(e.x,e.height,e.z),this.scene.add(n);const s=this.mesh(n,this.geometry.box,this.material.darkWood,[0,-.1,0],[e.halfWidth*2,.2,e.halfDepth*2]);s.name="catapult-floor-at-operator-height";const r=[],o=[];for(let d=-e.halfDepth+.2;d<e.halfDepth;d+=.4){const f=this.geometry.box.clone();f.scale(e.halfWidth*2-.06,.025,.355),f.translate(0,-.012,Math.min(d,e.halfDepth-.2)),r.push(f)}for(const d of[-e.halfWidth+.18,e.halfWidth-.18])for(const f of[-e.halfDepth+.18,e.halfDepth-.18]){const m=this.game.world?.getSurface(e.x+d,e.z+f).height??e.minimum,g=Math.max(.2,e.height-m),x=this.geometry.box.clone();x.scale(.3,g,.3),x.translate(d,-g*.5,f),o.push(x)}for(const[d,f]of[[r,this.material.lightWood],[o,this.material.darkWood]]){const m=ki(d);for(const x of d)x.dispose();const g=this.mesh(n,m,f);g.userData.ownedGeometry=!0}const a=e.ramp,l=[],c=[];for(let d=0;d<=a.rows;d++)for(let f=0;f<=a.cols;f++){const m=d/a.rows*a.length,g=(f/a.cols*2-1)*a.halfWidth;l.push(a.x+a.dx*m+a.rightX*g-e.x,a.heights[d*(a.cols+1)+f]-e.height,a.z+a.dz*m+a.rightZ*g-e.z)}for(let d=0;d<a.rows;d++)for(let f=0;f<a.cols;f++){const m=d*(a.cols+1)+f,g=m+1,x=m+a.cols+1,p=x+1;c.push(m,x,g,g,x,p)}const h=new Se;h.setAttribute("position",new Gt(l,3)),h.setIndex(c),h.computeVertexNormals();const u=this.mesh(n,h,this.material.ramp);return u.name=`${t.id}-walkable-entrance-ramp`,u.userData.ownedGeometry=!0,{group:n,deck:s,ramp:u,floor:e}}createMachine(t,e){const n=new te;n.name=t.id,n.position.set(t.x,this.ground(t.x,t.z),t.z),this.scene.add(n);const s=new te;s.name="wooden-catapult-frame",n.add(s);const r={wood:[],lightWood:[],darkWood:[],rope:[]},o=(y,_,T,A,E,R,S)=>{const b=this.geometry.box.clone();b.scale(E,R,S),b.translate(_,T,A),r[y].push(b)},a=(y,_,T,A)=>{const E=new L(..._),R=new L(...T),S=R.clone().sub(E),b=this.geometry.cylinder.clone();b.scale(A,S.length(),A),b.applyQuaternion(new hs().setFromUnitVectors(T_,S.normalize())),b.translate(...E.add(R).multiplyScalar(.5).toArray()),r[y].push(b)};for(const y of[-1,1])o("wood",y*.82,.18,.6,.26,.28,2.65);for(const y of[-.55,.12,.83,1.68])o("lightWood",0,.29,y,1.98,.14,.22);o("darkWood",0,.34,-.03,1.2,.14,.93);for(const y of[-1,1])a("wood",[y*.76,.3,.1],[y*.76,.99,1],.17),a("wood",[y*.76,.3,1.83],[y*.76,.99,1],.17),a("rope",[y*.77,.48,.35],[y*.77,.58,.47],.21),a("rope",[y*.77,.48,1.61],[y*.77,.58,1.49],.21);a("darkWood",[-.94,.85,1],[.94,.85,1],.22),o("lightWood",0,.52,1.66,1.72,.17,.17);for(const[y,_]of Object.entries(r)){if(!_.length)continue;const T=ki(_);for(const E of _)E.dispose();const A=this.mesh(s,T,this.material[y]);A.userData.ownedGeometry=!0}const l=this.mesh(s,this.geometry.leaf,this.material.leaf,[0,.41,-.04],[.59,.065,.48]);l.name="operator-seat";const c=new gn({color:pa[e%pa.length]}),h=this.mesh(s,this.geometry.leaf,c,[-.98,.64,1.65],[.13,.45,.3]);h.rotation.z=-.3,h.name="side-leaf";const u=new te;u.name="throwing-arm",u.position.set(0,.85,1),s.add(u),this.mesh(u,this.geometry.box,this.material.lightWood,[0,.07,0],[.18,1.2,.2]),this.mesh(u,this.geometry.box,this.material.darkWood,[0,-.48,0],[.43,.27,.37]);const d=this.mesh(u,this.geometry.cup,this.material.darkWood,[0,.57,0],[1.1,.72,1.3]);d.name="stone-cup";const f=this.mesh(u,this.geometry.rock,this.material.stone,[0,.75,0],[.78,.7,.8]);f.name="loaded-catapult-stone",u.rotation.x=-.45;const m=new te;m.name="reload-winch",m.position.set(0,.61,.53),s.add(m);const g=this.mesh(m,this.geometry.cylinder,this.material.darkWood,[0,0,0],[.13,1.37,.13]);g.rotation.z=Math.PI/2;for(const y of[-1,1]){const _=this.mesh(m,this.geometry.box,this.material.lightWood,[y*.47,.12,0],[.13,.35,.12]);_.name="operator-handle";const T=this.mesh(s,this.geometry.rope,this.material.rope,[y*.76,.85,1],[1,1,1]);T.rotation.y=Math.PI/2}const x=[];for(let y=0;y<2;y++){const _=this.mesh(s,this.geometry.rock,this.material.stone,[1.17,.29,.72+y*.64],[.65,.6,.68]);_.rotation.set(y*.7,.6+y,0),x.push(_)}const p=new xn({color:pa[e%pa.length],transparent:!0,opacity:.25,side:Ce,depthWrite:!1}),v=this.mesh(n,this.geometry.ring,p,[0,.045,.4],[1.65,1.65,1.65]);return v.rotation.x=-Math.PI/2,v.name="catapult-station-ring",{group:n,turret:s,arm:u,winch:m,loadedRock:f,pile:x,ring:v,factionMaterial:c,ringMaterial:p,definition:t,launchAge:1/0,yaw:Math.PI}}operatorPose(t){const e=this.machines.get(typeof t=="string"?t:t?.id);if(!e)return null;const n=this.game.state.catapults?.find(s=>s.id===e.definition.id);return{x:e.definition.x,y:this.ground(e.definition.x,e.definition.z)+R_,z:e.definition.z,yaw:n?Math.atan2(n.aimX,n.aimZ):e.yaw}}consumeEvent(t){if(t.type==="stoneShot"){const e=this.machines.get(t.catapultId);e&&(e.launchAge=0,e.arm.rotation.x=0,e.loadedRock.visible=!1)}}shellPoint(t,e,n=this._vector){const s=fa(t.startX,t.tx,e),r=fa(t.startZ,t.tz,e),o=this.ground(t.startX,t.startZ)+(t.startHeight??1.6),a=this.ground(t.tx,t.tz)+.12;return n.set(s,fa(o,a,e)+4*t.arcHeight*e*(1-e),r)}createShell(t){const e=this.mesh(this.scene,this.geometry.rock,this.material.stone,void 0,[1.05,.95,1.14]);e.name=`catapult-stone-${t.id}`;const n=new xn({color:t.owner==="player"?"#e4c36e":"#f17e62",transparent:!0,opacity:.45,side:Ce,depthWrite:!1}),s=this.mesh(this.scene,this.geometry.ring,n,[t.tx,this.ground(t.tx,t.tz)+.055,t.tz],[Pe.blastRadius,Pe.blastRadius,Pe.blastRadius]);s.rotation.x=-Math.PI/2,s.name=`catapult-danger-${t.id}`;const r=this.mesh(this.scene,this.geometry.disc,n,[t.tx,this.ground(t.tx,t.tz)+.05,t.tz],[.13,.13,.13]);return r.rotation.x=-Math.PI/2,{stone:e,ring:s,core:r,material:n}}updatePreview(){const t=this.game.state,e=t.actors[0],n=this.game.catapultAim,s=t.catapults?.find(m=>m.id===e.catapultId&&m.occupant===e.id),r=n?.target,o=this.game.running&&n?.active&&s&&r&&Number.isFinite(r.x)&&Number.isFinite(r.z)&&!e.ko&&e.dizzyTime<=0;if(this.previewLine.visible=!!o,this.landingMarker.visible=!!o,!o)return;const a=r.x-s.x,l=r.z-s.z,c=Math.hypot(a,l)||1,h={startX:s.x+a/c,startZ:s.z+l/c,startHeight:1.6,tx:r.x,tz:r.z,arcHeight:Pe.arcHeight},u=this.previewLine.geometry.attributes.position;for(let m=0;m<u.count;m++){const g=this.shellPoint(h,m/(u.count-1));u.setXYZ(m,g.x,g.y,g.z)}u.needsUpdate=!0,this.previewLine.computeLineDistances(),this.landingMarker.position.set(r.x,this.ground(r.x,r.z)+.065,r.z),this.landingMarker.scale.setScalar(Pe.blastRadius);const d=s.loaded&&s.cooldown<=0,f=r.valid===!1;this.material.preview.color.set(f?"#ef826d":d?"#e6f7a1":"#b7bfaf"),this.material.landing.color.set(f?"#ef826d":d?"#d6ed8b":"#b7bfaf")}poseOperator(t,e,n){const s=this.game.state.actors.findIndex(c=>c.id===t.id),r=this.game.models?.[s];if(!r?.bones||t.ko)return;const o=r.bones,a=n.cooldown>0,l=a?Math.sin(this.clock*9)*.13:0;for(const c of[-1,1]){const h=o[`shoulder${c}`],u=o[`elbow${c}`],d=o[`wrist${c}`];h&&(h.rotation.x=-.53-l*c,h.rotation.z=c*.08),u&&(u.rotation.x=.45+l*c),d&&(d.rotation.x=-.18)}o.spine&&(o.spine.rotation.x=.08+Math.abs(l)*.12),o.head&&(o.head.rotation.x=-.04)}update(t=0){const e=this.game.running?Math.max(0,Math.min(.1,t)):0;this.clock+=e;const n=this.game.state;for(const s of n.catapults||[]){const r=this.machines.get(s.id);if(!r)continue;r.group.position.y=this.ground(s.x,s.z);const o=Math.atan2(s.aimX,s.aimZ);r.yaw=o,r.turret.rotation.y=o,Number.isFinite(r.launchAge)&&(r.launchAge+=e);const a=this.game.catapultAim;let c=s.occupant==="player"&&a?.active?-.74:-.45;if(s.cooldown>0){const u=1-Yl(s.cooldown/(Pe.cooldown||3));c=fa(.6,-.45,u*u),r.winch.rotation.x=this.clock*7}else r.winch.rotation.x=0;r.launchAge<.18&&(c=.6*Math.sin(Yl(r.launchAge/.09)*Math.PI/2)),r.arm.rotation.x+=(c-r.arm.rotation.x)*(1-Math.exp(-e*18)),r.loadedRock.visible=!!s.loaded,r.ring.material.opacity=s.occupant?.42:.2;const h=n.actors.find(u=>u.id===s.occupant);h&&this.poseOperator(h,r,s)}for(const s of n.shells||[]){let r=this.shellMeshes.get(s.id);r||(r=this.createShell(s),this.shellMeshes.set(s.id,r));const o=Yl(s.age/s.duration);this.shellPoint(s,o,r.stone.position),r.stone.rotation.set(s.age*4,s.age*3,s.age*1.5),r.material.opacity=.35+.22*o+.08*Math.sin(this.clock*13)}for(const[s,r]of this.shellMeshes)(n.shells||[]).some(o=>o.id===s)||(r.stone.removeFromParent(),r.ring.removeFromParent(),r.core.removeFromParent(),r.material.dispose(),this.shellMeshes.delete(s));this.updatePreview()}dispose(){for(const t of this.platforms.values())t.group.removeFromParent(),t.group.traverse(e=>{e.userData.ownedGeometry&&e.geometry.dispose()});for(const t of this.machines.values())t.group.removeFromParent(),t.group.traverse(e=>{e.userData.ownedGeometry&&e.geometry.dispose()}),t.factionMaterial.dispose(),t.ringMaterial.dispose();for(const t of this.shellMeshes.values())t.stone.removeFromParent(),t.ring.removeFromParent(),t.core.removeFromParent(),t.material.dispose();this.previewLine.removeFromParent(),this.previewLine.geometry.dispose(),this.landingMarker.removeFromParent();for(const t of Object.values(this.geometry))t.dispose();for(const t of Object.values(this.material))t.dispose();this.machines.clear(),this.platforms.clear(),this.shellMeshes.clear()}}const P_=Math.PI*2,z_=new L(0,1,0),jr=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),Zl=i=>Number.isFinite(i?.x)&&Number.isFinite(i?.z),gd=["#c4e4de","#83bcb4","#eaf4e4"].map(i=>new ee(i)),ma=Object.freeze({mobileDrops:96,desktopDrops:144,mobileRipples:6,desktopRipples:8}),D_=`
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
`,I_=`
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
`;class L_{constructor(t){this.game=t,this.scene=t.scene,this.time=0,this.seed=7919,this.cursor=0,this.rippleCursor=0,this.capacity=t.touch?ma.mobileDrops:ma.desktopDrops,this.particles=Array.from({length:this.capacity},()=>({life:0,total:1,x:0,y:0,z:0,vx:0,vy:0,vz:0,size:.08,color:0})),this.dummy=new qe,this.direction=new L,this.dropGeometry=new jn(1,7,5),this.dropMaterial=new gn({color:"#ffffff",emissive:"#163a35",emissiveIntensity:.06,depthTest:!0,depthWrite:!0}),this.droplets=new wn(this.dropGeometry,this.dropMaterial,this.capacity),this.droplets.name="arcade-impact-droplets",this.droplets.instanceMatrix.setUsage(Ui),this.droplets.frustumCulled=!1,this.droplets.count=0;for(let n=0;n<this.capacity;n++)this.droplets.setColorAt(n,gd[0]);this.droplets.instanceColor.setUsage(Ui),this.scene.add(this.droplets);const e=t.touch?ma.mobileRipples:ma.desktopRipples;this.ripples=Array.from({length:e},(n,s)=>{const r=new Ni(2,2,8,8);r.rotateX(-Math.PI/2);const o=r.attributes.position.array.slice(),a=new Zn({vertexShader:D_,fragmentShader:I_,uniforms:Ra.merge([Pt.fog,{uAge:{value:0},uOpacity:{value:.75},uWater:{value:new ee("#6aaba4")},uFoam:{value:new ee("#e8f2df")}}]),transparent:!0,depthTest:!0,depthWrite:!1,side:Ce,fog:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),l=new Jt(r,a);return l.name=`arcade-impact-ripple-${s}`,l.frustumCulled=!1,l.visible=!1,this.scene.add(l),{mesh:l,reference:o,age:0,duration:1,active:!1}})}ground(t,e){const n=this.game.ground(t,e);return Number.isFinite(n)?n:0}random(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}ripple(t,e,n,s,r=.75){const o=this.ripples[this.rippleCursor++%this.ripples.length],a=o.mesh.geometry.attributes.position;for(let l=0;l<a.count;l++){const c=t+o.reference[l*3]*n,h=e+o.reference[l*3+2]*n;a.setXYZ(l,c,this.ground(c,h)+.035,h)}a.needsUpdate=!0,o.mesh.geometry.computeVertexNormals(),o.mesh.material.uniforms.uAge.value=0,o.mesh.material.uniforms.uOpacity.value=r,o.age=0,o.duration=s,o.active=!0,o.mesh.visible=!0}emit({x:t,y:e,z:n,count:s,power:r,spread:o=.12,dx:a=0,dz:l=0,lifetime:c=.55}){const h=Math.hypot(a,l);h>0&&(a/=h,l/=h);for(let u=0;u<s;u++){const d=this.particles[this.cursor++%this.capacity],f=this.random()*P_,m=(.8+this.random()*1.7)*r;d.x=t+(this.random()-.5)*o,d.y=e+this.random()*.07,d.z=n+(this.random()-.5)*o,d.vx=Math.sin(f)*m+a*r*.65,d.vz=Math.cos(f)*m+l*r*.65,d.vy=(1.8+this.random()*2.2)*r,d.total=c*(.82+this.random()*.3),d.life=d.total,d.size=(.045+this.random()*.045)*Math.sqrt(r),d.color=u%3}this.drawDrops()}hit({x:t,z:e,dx:n=0,dz:s=0,height:r,heavy:o=!1}={}){if(!Zl({x:t,z:e}))return;const a=this.ground(t,e),l=Number.isFinite(r)?Math.max(a+.04,r):a+.7;this.ripple(t,e,o?1.3:.72,o?.54:.4,o?.8:.64),this.emit({x:t,y:l,z:e,dx:n,dz:s,count:o?15:8,power:o?1.2:.72,spread:o?.22:.1,lifetime:o?.58:.43})}stone({x:t,z:e,radius:n=2.8}={}){if(!Zl({x:t,z:e}))return;const s=jr(Number.isFinite(n)?n:2.8,1,4);this.ripple(t,e,s,.74,.9),this.emit({x:t,y:this.ground(t,e)+.12,z:e,count:this.game.touch?28:34,power:1.8,spread:.55,lifetime:.76})}landing({x:t,z:e,strength:n=1}={}){if(!Zl({x:t,z:e}))return;const s=jr(Number.isFinite(n)?n:1,.35,1.8);this.ripple(t,e,.75+s*.42,.48,.68),this.emit({x:t,y:this.ground(t,e)+.08,z:e,count:Math.round(6+s*5),power:.6+s*.28,spread:.25,lifetime:.48})}drawDrops(){let t=0;for(const e of this.particles){if(e.life<=0)continue;const n=jr(e.life/.13),s=e.size*n;this.dummy.position.set(e.x,e.y,e.z),this.direction.set(e.vx,e.vy,e.vz),this.direction.lengthSq()>1e-6?this.dummy.quaternion.setFromUnitVectors(z_,this.direction.normalize()):this.dummy.quaternion.identity(),this.dummy.scale.set(s,s*1.55,s),this.dummy.updateMatrix(),this.droplets.setMatrixAt(t,this.dummy.matrix),this.droplets.setColorAt(t,gd[e.color]),t++}this.droplets.count=t,this.droplets.instanceMatrix.needsUpdate=!0,this.droplets.instanceColor.needsUpdate=!0}update(t=0){const e=jr(Number.isFinite(t)?t:0,0,.1);if(e!==0){this.time+=e;for(const n of this.particles){if(n.life<=0||(n.life=Math.max(0,n.life-e),n.life===0))continue;n.x+=n.vx*e,n.z+=n.vz*e,n.y+=n.vy*e-7*e*e,n.vy-=14*e;const s=Math.exp(-e*1.2);n.vx*=s,n.vz*=s;const r=this.ground(n.x,n.z)+.025;n.y<r&&(n.y=r,n.vy=0,n.vx*=.3,n.vz*=.3,n.life=Math.min(n.life,.06))}this.drawDrops();for(const n of this.ripples)n.active&&(n.age+=e,n.mesh.material.uniforms.uAge.value=jr(n.age/n.duration),n.age>=n.duration&&(n.active=!1,n.mesh.visible=!1))}}clear(){for(const t of this.particles)t.life=0;this.droplets.count=0;for(const t of this.ripples)t.active=!1,t.mesh.visible=!1,t.age=0;this.time=0}dispose(){this.clear(),this.droplets.removeFromParent(),this.dropGeometry.dispose(),this.dropMaterial.dispose();for(const t of this.ripples)t.mesh.removeFromParent(),t.mesh.geometry.dispose(),t.mesh.material.dispose()}}const hr=["#b5dc72","#ee8c72","#bd9ee3"],xd=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),vd=Math.PI*2,U_=["pelvis","spine","head","eyeL","eyeR","wrist-1","wrist1","foot-1","foot1"];class k_{constructor(t){this.game=t,this.scene=t.scene,this.clock=0,this.group=new te,this.group.name="storage-homes-and-fenced-catapult-yards",this.scene.add(this.group),this.bases=new Map,this.groves=[],this.enclosures=new Map,this.ownedGeometries=[],this.ownedMaterials=[],this.dummy=new qe,this.sightRay=new Ds,this.sightTarget=new L,this.sightHit=new L,this.roofRay=new Ds,this.roofHit=new L,this.roofCamera=new L,this.roofAnchor=new L,this.roofNearest=new L,this.roofTargets=Array.from({length:16},()=>new L),this.roofTargetCount=0,this.geometries={box:new Gi(1,1,1),cylinder:new Us(.5,.5,1,8),cone:new mh(1,1,5),leaf:new xh(1,1),ring:new as(.91,1,40),wing:new jn(1,6,4),sphere:new jn(1,8,6)},this.materials={wood:new gn({color:"#866244"}),lightWood:new gn({color:"#c69b62"}),darkWood:new gn({color:"#554535"}),leaf:new gn({color:"#56874d"}),fly:new gn({color:"#233e38"}),wing:new gn({color:"#d5eee1",transparent:!0,opacity:.85}),ruin:new gn({color:"#6a6855"}),dark:new xn({color:"#173b31"}),alert:new xn({color:"#f4af69"})},this.buildWalls();for(const[e,n]of Wn.entries())this.bases.set(n.id,this.buildBase(n,e));for(const[e,n]of wh.entries())this.groves.push(this.buildGrove(n,e))}ground(t,e){return this.game.ground(t,e)}mesh(t,e,n,s=0,r=0,o=0,a=1,l=1,c=1){const h=new Jt(e,n);return h.position.set(s,r,o),h.scale.set(a,l,c),t.add(h),h}material(t){const e=new gn(t);return this.ownedMaterials.push(e),e}mergeParts(t,e,n){if(!t.length)return null;const s=ki(t);for(const o of t)o.dispose();this.ownedGeometries.push(s);const r=new Jt(s,e);return r.name=n,this.group.add(r),r}boxPart(t,e,n,s,r,o,a){const l=this.geometries.box.clone();l.scale(r,o,a),l.translate(e,n,s),t.push(l)}buildWalls(){const t=[];for(const e of Ga){const n=Wn.findIndex(x=>x.owner===e.owner),s=[],r=[],o=[],a=this.material({color:"#866244",transparent:!0,opacity:1}),l=this.material({color:hr[n],transparent:!0,opacity:1});for(const x of ds){if(x.enclosureId!==e.id)continue;const p=this.ground(x.x,x.z);this.boxPart(t,x.x,p+.25,x.z,x.hw*2+.08,.5,x.hd*2+.08),this.boxPart(s,x.x,p+x.height*.5,x.z,x.hw*2,x.height,x.hd*2),this.boxPart(r,x.x,p+x.height+.055,x.z,x.hw*2+.05,.16,x.hd*2+.05);const v=x.hw>x.hd,y=v?x.hw*2:x.hd*2,_=Math.max(1,Math.floor(y/.65));for(let T=0;T<=_;T++){const A=_?T/_-.5:0;this.boxPart(s,x.x+(v?A*y:0),p+x.height*.55,x.z+(v?0:A*y),.15,x.height+.32,.15)}o.push(new Nn(new L(x.x-x.hw-.1,p,x.z-x.hd-.1),new L(x.x+x.hw+.1,p+x.height+.35,x.z+x.hd+.1)))}const c=this.mergeParts(s,a,`${e.id}-solid-walls`),h=this.mergeParts(r,l,`${e.id}-wall-tops`);this.enclosures.set(e.id,{definition:e,wallMesh:c,capMesh:h,woodMaterial:a,capMaterial:l,boxes:o,faded:!1});const u=this.ground(e.gate.x,e.gate.z),d=new te;d.name=`${e.id}-single-open-entrance`,d.position.set(e.gate.x,u,e.gate.z),this.group.add(d),(e.side==="east"||e.side==="west")&&(d.rotation.y=Math.PI/2),this.mesh(d,this.geometries.box,a,-1.6,1.25,0,.18,2.5,.25),this.mesh(d,this.geometries.box,a,1.6,1.25,0,.18,2.5,.25),this.mesh(d,this.geometries.box,l,0,2.5,0,3.38,.22,.3);const m=this.mesh(d,this.geometries.box,this.material({color:hr[n]}),0,.045,0,2.8,.07,.5);m.name="walkable-gate-threshold";const g=this.mesh(d,this.geometries.leaf,this.material({color:hr[n]}),0,2.9,0,.4,.35,.1);g.rotation.z=.25}this.mergeParts(t,this.materials.ruin,"enclosure-foundations")}updateWallVisibility(t,e,n){const s=this.game.camera;let r=0;t&&s&&(this.sightTarget.set(t.x,this.ground(t.x,t.z)+(t.height||0)+.9,t.z),this.sightRay.origin.copy(s.position),this.sightRay.direction.copy(this.sightTarget).sub(s.position),r=this.sightRay.direction.lengthSq(),this.sightRay.direction.normalize());const o=1-Math.exp(-Math.max(n,.016)*10);for(const a of this.enclosures.values()){let l=e?.id===a.definition.id;if(!l&&r>0){for(const h of a.boxes)if(this.sightRay.intersectBox(h,this.sightHit)&&this.sightHit.distanceToSquared(this.sightRay.origin)<r-.05){l=!0;break}}a.faded=l;const c=l?.2:a.woodMaterial.opacity+(1-a.woodMaterial.opacity)*o;a.woodMaterial.opacity=a.capMaterial.opacity=c,a.woodMaterial.depthWrite=a.capMaterial.depthWrite=c>.95}}prepareRoofSight(t){this.roofTargetCount=0;const e=this.game.camera;if(!t||!e)return;e.getWorldPosition(this.roofCamera);const n=this.game.models?.[0],s=xd(t.load||0);if(n?.group){n.group.updateWorldMatrix(!0,!0),this.roofAnchor.setFromMatrixPosition(n.group.matrixWorld);for(const c of U_){const h=n.bones?.[c];h&&this.roofTargets[this.roofTargetCount++].setFromMatrixPosition(h.matrixWorld)}}else this.roofAnchor.set(t.x,this.ground(t.x,t.z)+(t.height||0)+s*.28+(t.catapultId?.45:0),t.z);const r=.86+s*.45,o=.55+s*.22,a=.85+s*.32,l=this.roofAnchor;this.roofTargets[this.roofTargetCount++].set(l.x,l.y+o,l.z),this.roofTargets[this.roofTargetCount++].set(l.x-r,l.y+o,l.z),this.roofTargets[this.roofTargetCount++].set(l.x+r,l.y+o,l.z),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+o,l.z-r),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+o,l.z+r),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+.08,l.z),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+a,l.z)}roofObstructsPlayer(t){if(!this.roofTargetCount)return!1;const e=this.roofCamera,n=this.roofRay,s=this.game.camera,r=s.near||.1,o=Math.tan((s.fov||52)*Math.PI/360),a=Math.max(.35,r*Math.sqrt(1+o*o*(1+(s.aspect||1)**2))+.08);for(const l of t.roofTriangles)if(l.closestPointToPoint(e,this.roofNearest),this.roofNearest.distanceToSquared(e)<a*a)return!0;n.origin.copy(e);for(let l=0;l<this.roofTargetCount;l++){n.direction.copy(this.roofTargets[l]).sub(e);const c=n.direction.lengthSq();if(!(c<1e-8)&&(n.direction.normalize(),!!n.intersectsBox(t.roofBounds))){for(const h of t.roofTriangles)if(n.intersectTriangle(h.a,h.b,h.c,!1,this.roofHit)&&this.roofHit.distanceToSquared(e)<c)return!0}}return!1}stockObstructsPlayer(t){if(!this.roofTargetCount)return!1;const e=this.roofCamera,n=this.roofRay,s=t.stockBounds,r=this.game.camera,o=r.near||.1,a=Math.tan((r.fov||52)*Math.PI/360),l=Math.max(.35,o*Math.sqrt(1+a*a*(1+(r.aspect||1)**2))+.08);if(s.distanceToPoint(e)<l)return!0;n.origin.copy(e);for(let c=0;c<this.roofTargetCount;c++){n.direction.copy(this.roofTargets[c]).sub(e);const h=n.direction.lengthSq();if(!(h<1e-8)&&(n.direction.normalize(),n.intersectBox(s,this.roofHit)&&this.roofHit.distanceToSquared(e)<h-1e-5))return!0}return!1}buildHouse(t,e,n){const s=this.game.houseFloors?.find(P=>P.baseId===t.id),r=s?.height??this.ground(t.x,t.z),o=t.halfWidth+.18,a=t.halfDepth+.18,l=new te;l.name=`${t.id}-actual-roofed-house`,l.position.set(t.x,r,t.z),this.group.add(l);const c=this.mesh(l,this.geometries.box,this.materials.darkWood,0,-.09,0,o*2,.18,a*2);c.name="house-floor-at-actor-height";const h=[];for(let P=-a+.2;P<a;P+=.4)this.boxPart(h,0,-.012,Math.min(P,a-.2),o*2-.06,.025,.355);const u=ki(h);for(const P of h)P.dispose();this.ownedGeometries.push(u),this.mesh(l,u,this.materials.lightWood);const d=[];for(const P of[-t.halfWidth,t.halfWidth])for(const G of[-t.halfDepth,t.halfDepth]){const Z=this.game.world?.getSurface(t.x+P,t.z+G).height??s?.minimum??r-.2,H=Math.max(.18,r-Z);this.boxPart(d,P,-H*.5,G,.3,H,.3)}const f=ki(d);for(const P of d)P.dispose();this.ownedGeometries.push(f),this.mesh(l,f,this.materials.darkWood);const m=t.side==="east"||t.side==="west",g=(m?t.halfDepth:t.halfWidth)+.32,x=(m?t.halfWidth:t.halfDepth)+.32,p=2.62,v=4.05,y=new Se;y.setAttribute("position",new Gt([-g,p,-x,0,v,-x,g,p,-x,-g,p,x,0,v,x,g,p,x],3)),y.setIndex([0,3,4,0,4,1,1,4,5,1,5,2,0,1,2,3,5,4]),y.computeVertexNormals(),m&&y.rotateY(Math.PI/2),this.ownedGeometries.push(y);const _=this.mesh(l,y,e);_.name="full-house-leaf-roof",_.updateWorldMatrix(!0,!1);const T=[],A=new Nn,E=y.attributes.position,R=y.index;for(let P=0;P<R.count;P+=3){const G=new qn;G.a.fromBufferAttribute(E,R.getX(P)).applyMatrix4(_.matrixWorld),G.b.fromBufferAttribute(E,R.getX(P+1)).applyMatrix4(_.matrixWorld),G.c.fromBufferAttribute(E,R.getX(P+2)).applyMatrix4(_.matrixWorld),T.push(G),A.expandByPoint(G.a).expandByPoint(G.b).expandByPoint(G.c)}const S=this.mesh(l,this.geometries.cylinder,n,0,v+.18,0,.13,.55,.13);S.rotation.z=.2;const b=this.mesh(l,this.geometries.leaf,n,.2,v+.48,0,.5,.14,.24);b.rotation.z=.3;let U=null;if(s?.ramp){const P=s.ramp,G=[],Z=[];for(let N=0;N<=P.rows;N++)for(let B=0;B<=P.cols;B++){const Q=N/P.rows*P.length,X=(B/P.cols*2-1)*P.halfWidth;G.push(P.x+P.dx*Q+P.rightX*X,P.heights[N*(P.cols+1)+B],P.z+P.dz*Q+P.rightZ*X)}for(let N=0;N<P.rows;N++)for(let B=0;B<P.cols;B++){const Q=N*(P.cols+1)+B,X=Q+1,ft=Q+P.cols+1,Vt=ft+1;Z.push(Q,ft,X,X,ft,Vt)}const H=new Se;H.setAttribute("position",new Gt(G,3)),H.setIndex(Z),H.computeVertexNormals(),this.ownedGeometries.push(H);const V=this.material({color:"#b18b59",side:Ce});U=new Jt(H,V),U.name=`${t.id}-walkable-door-ramp`,this.group.add(U)}return l.userData={baseId:t.id,interior:{x:t.x,z:t.z,halfWidth:t.halfWidth-.17,halfDepth:t.halfDepth-.17},floorY:r,roofEaveY:r+p,roofRidgeY:r+v},{house:l,deck:c,ramp:U,roof:_,roofStem:S,roofLeaf:b,roofTriangles:T,roofBounds:A}}buildBase(t,e){const n=new te;n.name=`${t.id}-shelter`,n.position.set(t.stock.x,this.ground(t.stock.x,t.stock.z),t.stock.z),this.group.add(n);const s=t.side==="north"?0:t.side==="east"?Math.PI/2:-Math.PI/2,r=new te;r.rotation.y=s,n.add(r);const o=this.material({color:hr[e]}),a=this.material({color:e===0?"#61975b":e===1?"#ba7356":"#9270b0",transparent:!0,opacity:1,depthWrite:!0,side:Ce}),l=[this.materials.wood,this.materials.darkWood,o].map(V=>{const N=V.clone();return N.transparent=!0,this.ownedMaterials.push(N),N}),c=this.mesh(r,this.geometries.cylinder,l[0],0,.38,0,1.25,.76,1.25);c.name="infinite-fly-stock-basket";const h=this.mesh(r,this.geometries.cylinder,l[1],0,.77,0,1.15,.09,1.15);h.name="stock-basket-lid";const u=this.mesh(r,this.geometries.cylinder,l[2],0,.42,0,1.31,.14,1.31);u.name="owner-color-on-stock";const d=[c,h,u],{house:f,deck:m,ramp:g,roof:x,roofStem:p,roofLeaf:v,roofTriangles:y,roofBounds:_}=this.buildHouse(t,a,o),T=new te;T.name="visible-fly-reserve",r.add(T);const A=new wn(this.geometries.sphere,this.materials.fly,8),E=new wn(this.geometries.wing,this.materials.wing,16);A.name="reserve-fly-bodies",E.name="reserve-fly-wings",A.frustumCulled=E.frustumCulled=!1,T.add(A,E);const R=new xn({color:hr[e],transparent:!0,opacity:.36,side:Ce,depthWrite:!1});this.ownedMaterials.push(R);const S=this.mesh(n,this.geometries.ring,R,0,.045,0,2.05,2.05,2.05);S.rotation.x=-Math.PI/2,S.name="stock-refill-ring";const b=new te;b.name="storage-destruction-progress",b.position.set(0,2.12,0),n.add(b),this.mesh(b,this.geometries.box,this.materials.dark,0,0,0,2.2,.17,.09);const U=this.mesh(b,this.geometries.box,this.materials.alert,-1.06,0,.055,0,.115,.05);b.visible=!1;const P=new te;P.name="destroyed-storage-remains",P.visible=!1,n.add(P);const G=[];for(let V=0;V<5;V++){const N=this.geometries.box.clone();N.scale(.2,.2,1.1),N.rotateY(V*.8),N.translate(Math.sin(V*2.4)*.8,.12+V%2*.08,Math.cos(V*2.4)*.7),G.push(N)}const Z=ki(G);for(const V of G)V.dispose();this.ownedGeometries.push(Z),this.mesh(P,Z,this.materials.ruin),n.updateWorldMatrix(!0,!0);const H=new Nn;for(const V of d)H.union(new Nn().setFromObject(V));return H.expandByScalar(.03),{definition:t,group:n,cabin:r,house:f,deck:m,ramp:g,roof:x,roofStem:p,roofLeaf:v,roofTriangles:y,roofBounds:_,roofObstructed:!1,roofHold:0,roofMaterial:a,stockMeshes:d,stockMaterials:l,stockBounds:H,stockObstructed:!1,marker:S,markerMaterial:R,bar:b,fill:U,supply:T,flyBodies:A,flyWings:E,ruins:P,index:e}}buildGrove(t,e){const n=new te;n.name=t.id,this.group.add(n);const s=this.material({color:["#487c47","#609147","#397553","#668349","#4d825a"][e],transparent:!0,opacity:.94,depthWrite:!0}),r=[],o=[],a=[],l=new te;l.name="tree-cover-canopy",n.add(l);for(let d=0;d<3;d++){const f=d*vd/3+e*.7,m=t.x+Math.cos(f)*t.radius*.43,g=t.z+Math.sin(f)*t.radius*.43,x=this.ground(m,g),p=3.3+d%2*.5,v=this.geometries.cylinder.clone();v.scale(.24,p,.24),v.translate(m,x+p/2,g),o.push(v);for(let _=0;_<3;_++){const T=this.geometries.leaf.clone();T.scale(1.35+_*.12,.8,1.25),T.translate(m+Math.sin(_*2.1)*.42,x+p+_*.35,g+Math.cos(_*2.1)*.35),r.push(T)}const y=this.geometries.leaf.clone();y.scale(.7,.35,.7),y.translate(m+.5,x+.22,g-.25),a.push(y)}const c=(d,f,m,g)=>{const x=ki(d);for(const v of d)v.dispose();this.ownedGeometries.push(x);const p=new Jt(x,f);return p.name=m,g.add(p),p};c(o,this.materials.wood,"grove-trunks",n),c(r,s,"grove-leaf-crown",l),c(a,this.materials.leaf,"slow-moving-underbrush",n);const h=new xn({color:"#50733f",transparent:!0,opacity:.2,side:Ce,depthWrite:!1});this.ownedMaterials.push(h);const u=this.mesh(n,this.geometries.ring,h,t.x,this.ground(t.x,t.z)+.02,t.z,t.radius,t.radius,t.radius);return u.rotation.x=-Math.PI/2,{definition:t,group:n,canopy:l,material:s}}update(t=0){const e=this.game.running?Math.max(0,Math.min(.1,t)):0;this.clock+=e;const n=this.game.state.actors?.[0],s=n?L1(n):null;this.updateWallVisibility(n,s,t),this.prepareRoofSight(n);const r=this.game.state.bases||[];for(const o of this.bases.values()){const a=r.find(m=>m.id===o.definition.id||m.owner===o.definition.owner),l=!!a?.destroyed,c=xd((a?.progress||0)/10),h=c>0&&!l;o.cabin.visible=!l,o.supply.visible=!l,o.ruins.visible=l,o.stockObstructed=!l&&this.stockObstructsPlayer(o);const u=o.stockMaterials[0].opacity+(1-o.stockMaterials[0].opacity)*(1-Math.exp(-Math.max(t,.016)*10)),d=o.stockObstructed?.18:u>.995?1:u;for(const m of o.stockMaterials)m.opacity=d,m.depthWrite=d===1;o.markerMaterial.color.set(l?"#5c7067":h?"#ff9b58":hr[o.index]),o.markerMaterial.opacity=l?.12:h?.4+.12*Math.sin(this.clock*8):.28,o.bar.visible=h,o.fill.scale.x=2.12*c,o.fill.position.x=-1.06+1.06*c,this.game.camera&&o.bar.quaternion.copy(this.game.camera.quaternion),o.roofObstructed=s?.id===o.definition.id||this.roofObstructsPlayer(o),o.roofHold=o.roofObstructed?.18:Math.max(0,o.roofHold-Math.max(t,.016));const f=o.roofObstructed||o.roofHold>0;o.roof.visible=!l&&!f,o.roofMaterial.opacity=f?0:o.roofMaterial.opacity+(1-o.roofMaterial.opacity)*(1-Math.exp(-Math.max(t,.016)*10)),o.roofMaterial.depthWrite=o.roofMaterial.opacity>.9,o.roofStem.visible=o.roofLeaf.visible=o.roof.visible&&o.roofMaterial.opacity>.6,o.cabin.position.x=h?Math.sin(this.clock*25)*.025:0;for(let m=0;m<8;m++){const g=this.clock*(1.4+m%3*.2)+m*vd/8,x=.3+m%3*.13,p=Math.sin(g)*x,v=1.05+m%3*.17+Math.sin(this.clock*4+m)*.08,y=Math.cos(g)*x,_=this.dummy;_.position.set(p,v,y),_.scale.set(.09,.08,.13),_.rotation.set(0,g,0),_.updateMatrix(),o.flyBodies.setMatrixAt(m,_.matrix);for(let T=0;T<2;T++){const A=T===0?-1:1;_.position.set(p+Math.cos(g)*A*.105,v+.035,y-Math.sin(g)*A*.105),_.scale.set(.15,.016,.07),_.rotation.set(0,g,Math.sin(this.clock*36+m)*.55*A),_.updateMatrix(),o.flyWings.setMatrixAt(m*2+T,_.matrix)}}o.flyBodies.instanceMatrix.needsUpdate=!0,o.flyWings.instanceMatrix.needsUpdate=!0}for(const o of this.groves){const l=n&&Math.hypot(n.x-o.definition.x,n.z-o.definition.z)<o.definition.radius+1.4?.23:.94;o.material.opacity+=(l-o.material.opacity)*(1-Math.exp(-Math.max(t,.016)*8)),o.material.depthWrite=o.material.opacity>.9}}dispose(){this.group.removeFromParent();for(const t of this.ownedGeometries)t.dispose();for(const t of Object.values(this.geometries))t.dispose();for(const t of this.ownedMaterials)t.dispose();for(const t of Object.values(this.materials))t.dispose();this.bases.clear(),this.enclosures.clear(),this.groves.length=0}}const is=["move","aim","fire"],Qr=8,Ia=(i,t,e)=>Math.max(t,Math.min(e,i)),xr=(i,t)=>Number.isFinite(i)?i:t,Ch=(i,t)=>({left:i.x-t.width/2,top:i.y-t.height/2,right:i.x+t.width/2,bottom:i.y+t.height/2}),N_=(i,t,e=Qr)=>i.left<t.right+e&&i.right>t.left-e&&i.top<t.bottom+e&&i.bottom>t.top-e;function Mf(i,t,e,n,s=i){const r=e.left+t.width/2,o=Math.max(r,e.right-t.width/2),a=e.top+t.height/2,l=Math.max(a,e.bottom-t.height/2),c=m=>({x:Ia(xr(m?.x,r),r,o),y:Ia(xr(m?.y,a),a,l)}),h=c(i),u=[h,c(s)];for(const m of n)u.push(c({x:m.left-t.width/2-Qr,y:h.y}),c({x:m.right+t.width/2+Qr,y:h.y}),c({x:h.x,y:m.top-t.height/2-Qr}),c({x:h.x,y:m.bottom+t.height/2+Qr}));for(let m=a;m<=l+16;m+=16)for(let g=r;g<=o+16;g+=16)u.push(c({x:g,y:m}));let d=null,f=1/0;for(const m of u){if(n.some(x=>N_(Ch(m,t),x)))continue;const g=(m.x-h.x)**2+(m.y-h.y)**2;g<f&&(d=m,f=g)}return d||c(s)}function F_(i,t,e){const n=t>=i,s=e.move,r=e.aim,o=e.fire;return{move:{x:14+s.width/2,y:t-26-s.height/2},aim:{x:i-14-r.width/2,y:t-26-r.height/2},fire:n?{x:i-14-r.width/2,y:t-26-r.height-20-o.height/2}:{x:i-14-r.width-22-o.width/2,y:t-26-o.height/2}}}function O_({width:i,height:t,controls:e,preferred:n={},blocked:s=[],insets:r={}}){const o={left:Math.max(10,xr(r.left,0)+8),top:Math.max(10,xr(r.top,0)+8),right:i-Math.max(10,xr(r.right,0)+8),bottom:t-Math.max(18,xr(r.bottom,0)+8)},a=F_(i,t,e),l={},c=[...s];for(const h of is){const u=n[h],d=u&&Number.isFinite(u.x)&&Number.isFinite(u.y)?{x:u.x*i,y:u.y*t}:a[h];l[h]=Mf(d,e[h],o,c,a[h]),c.push(Ch(l[h],e[h]))}return{positions:l,bounds:o}}function B_({root:i,movePad:t,aimPad:e,fireButton:n,toggleButton:s,storageKey:r="frog.touch-layout.v1",onEditingChange:o=()=>{},announce:a=()=>{}}){const l=i.ownerDocument,c=l.defaultView,h={move:t,aim:e,fire:n},u=i.querySelector("#layout-hint");let d=!1,f=null,m={},g={},x={},p={portrait:{},landscape:{}},v=0,y=!1,_={width:c.innerWidth,height:c.innerHeight,mode:c.innerHeight>=c.innerWidth?"portrait":"landscape"};const T=[],A=(N,B,Q,X)=>{N.addEventListener(B,Q,X),T.push(()=>N.removeEventListener(B,Q,X))},E=()=>c.innerHeight>=c.innerWidth?"portrait":"landscape";try{const N=JSON.parse(c.localStorage.getItem(r)||"null");if(N?.version===1)for(const B of["portrait","landscape"])for(const Q of is){const X=N[B]?.[Q];Number.isFinite(X?.x)&&Number.isFinite(X?.y)&&(p[B][Q]={x:Ia(X.x,0,1),y:Ia(X.y,0,1)})}}catch{}const R=()=>{const{mode:N,width:B,height:Q}=_;for(const X of is)m[X]&&(p[N][X]={x:m[X].x/B,y:m[X].y/Q});try{c.localStorage.setItem(r,JSON.stringify({version:1,...p}))}catch{}},S=()=>{const N=[];for(const B of l.querySelectorAll("#arcade-hud, #minimap, #view-button, #layout-button, #layout-hint, #round-status, #base-status, #catapult-status, #sabotage-status, #kick-button, #catapult-button, #sabotage-button")){if(B.hidden||B.closest("[hidden]")||c.getComputedStyle(B).visibility==="hidden")continue;const Q=B.getBoundingClientRect();Q.width&&Q.height&&N.push({left:Q.left,top:Q.top,right:Q.right,bottom:Q.bottom})}return N},b=()=>{for(const N of is){const B=h[N],Q=m[N];Q&&(B.style.left=`${Q.x-g[N].width/2}px`,B.style.top=`${Q.y-g[N].height/2}px`,B.style.right="auto",B.style.bottom="auto")}},U=()=>{if(y)return;const N=c.getComputedStyle(i),B={};for(const X of["left","right","top","bottom"])B[X]=parseFloat(N.getPropertyValue(`--touch-safe-${X}`))||0;for(const X of is){const ft=h[X],Vt=ft.getBoundingClientRect(),Me=c.getComputedStyle(ft);g[X]={width:Math.max(44,Vt.width||parseFloat(Me.width)||72),height:Math.max(44,Vt.height||parseFloat(Me.height)||72)}}const Q=O_({width:c.innerWidth,height:c.innerHeight,controls:g,preferred:p[E()],blocked:S(),insets:B});m=Q.positions,x=Q.bounds,_={width:c.innerWidth,height:c.innerHeight,mode:E()},b()},P=()=>{c.cancelAnimationFrame(v),v=c.requestAnimationFrame(U)},G=()=>{f&&(f=null,R())},Z=N=>{const B=!!N;if(B!==d){G(),d=B,i.classList.toggle("layout-editing",d),s.setAttribute("aria-pressed",String(d)),s.setAttribute("aria-label",d?"Ολοκλήρωση αλλαγής θέσεων χειριστηρίων":"Αλλαγή θέσεων χειριστηρίων"),s.querySelector("span")?.replaceChildren(d?"ΤΕΛΟΣ":"ΘΕΣΕΙΣ"),u&&(u.hidden=!d);for(const Q of is)h[Q].setAttribute("data-layout-label",{move:"ΚΙΝΗΣΗ",aim:"ΣΤΟΧΕΥΣΗ",fire:"ΒΟΛΗ"}[Q]),h[Q].classList.toggle("layout-draggable",d);d||R(),o(d),a(d?"Σύρε τα χειριστήρια στη θέση που σε βολεύει. Πάτησε ΤΕΛΟΣ για να συνεχίσεις.":"Οι θέσεις των χειριστηρίων αποθηκεύτηκαν.")}},H=()=>{p[E()]={},U(),R(),a("Επαναφέρθηκαν οι αρχικές θέσεις χειριστηρίων.")};if(u){u.textContent.trim()||u.append("Σύρε κίνηση, στόχευση και βολή. ");const N=l.createElement("button");N.type="button",N.className="layout-reset",N.textContent="ΕΠΑΝΑΦΟΡΑ",N.setAttribute("aria-label","Επαναφορά αρχικών θέσεων χειριστηρίων"),u.append(N),A(N,"click",H)}for(const N of is){const B=h[N];A(B,"pointerdown",Q=>{d&&(Q.preventDefault(),Q.stopImmediatePropagation(),!f&&(m[N]||U(),f={key:N,id:Q.pointerId,dx:Q.clientX-m[N].x,dy:Q.clientY-m[N].y},B.setPointerCapture?.(Q.pointerId)))},!0),A(B,"pointermove",Q=>{if(!d||(Q.preventDefault(),Q.stopImmediatePropagation(),!f||f.id!==Q.pointerId||f.key!==N))return;const X=S();for(const ft of is)ft!==N&&m[ft]&&X.push(Ch(m[ft],g[ft]));m[N]=Mf({x:Q.clientX-f.dx,y:Q.clientY-f.dy},g[N],x,X,m[N]),b()},!0);for(const Q of["pointerup","pointercancel","lostpointercapture"])A(B,Q,X=>{d&&(X.preventDefault?.(),X.stopImmediatePropagation(),f?.id===X.pointerId&&G())},!0);A(B,"click",Q=>{d&&(Q.preventDefault(),Q.stopImmediatePropagation())},!0)}let V=-1/0;return A(s,"pointerdown",N=>{N.pointerType==="touch"&&(N.preventDefault(),N.stopPropagation(),V=Date.now(),Z(!d))}),A(s,"click",N=>{(N.detail===0||Date.now()-V>600)&&Z(!d)}),A(c,"resize",()=>{G(),P()}),A(c,"orientationchange",P),A(c,"keydown",N=>{d&&N.code==="Escape"&&(N.preventDefault(),N.stopImmediatePropagation(),Z(!1))},!0),A(c,"blur",()=>{G(),d&&Z(!1)}),s.setAttribute("aria-pressed","false"),P(),{get editing(){return d},setEditing:Z,refresh:U,reset:H,destroy(){if(!y){Z(!1),y=!0,c.cancelAnimationFrame(v);for(const N of T)N()}}}}const yd=i=>Number.isFinite(i)?Math.max(0,Math.min(1,i)):0,H_=Object.freeze([.96,.98,1.04]);function G_(i){if(i.stats?.type!=="frog")return i;i.group.getObjectByName("anatomical-animation-pivot").scale.set(...H_),i.group.scale.setScalar(1);const e=i.mesh.material;return e.bumpScale=0,e.roughness=.9,e.clearcoat=.08,e.clearcoatRoughness=.75,i}function V_(i,{load:t=0,spit:e=0}={}){if(i.stats?.type!=="frog")return i;const n=yd(t),s=yd(e),r=i.bones;i.group.scale.setScalar(1),r.throat.scale.x*=1+n*.08+s*.1,r.throat.scale.y*=1+n*.12+s*.16,r.throat.scale.z*=1+n*.08+s*.08,r.jaw.rotation.x-=s*.42,r.head.rotation.x-=s*.08;for(const o of["eyeL","eyeR"])r[o].scale.multiplyScalar(1.14);return i}const wa=Object.freeze({cameraZoom:br.default,cameraFov:52,cameraSensitivity:1}),jl=(i,t)=>{const e=typeof i=="number"||typeof i=="string"&&i.trim()?Number(i):NaN;return Number.isFinite(e)?e:t},Kl=(i,t,e)=>Math.max(t,Math.min(e,i));function bf(i={}){const t=Kl(jl(i?.cameraZoom,wa.cameraZoom),br.min,br.max),e=Kl(jl(i?.cameraFov,wa.cameraFov),40,80),n=Kl(jl(i?.cameraSensitivity,wa.cameraSensitivity),.25,2);return{cameraZoom:Math.round(t*20)/20,cameraFov:Math.round(e),cameraSensitivity:Math.round(n*20)/20}}function W_(i){const t=i.camera,e=i.state?.actors?.[0];if(t.fov=i.settings.cameraFov,t.updateProjectionMatrix(),e){if(typeof i.updateCameraPose=="function")i.cameraReady=!1,i.updateCameraPose(0);else{const n=vf(e,i.ground(e.x,e.z),t.aspect,i.viewMode,{yaw:i.cameraYaw,pitch:i.cameraPitch,zoom:i.settings.cameraZoom});i.focus.fromArray(n.look),i.cameraTarget.fromArray(n.position),t.position.copy(i.cameraTarget),t.lookAt(i.focus),t.updateMatrixWorld(),i.cameraReady=!0}i.basesView?.update(0)}i.renderer.render(i.scene,t),i.drawLabels?.()}function X_(i,{onChange:t=()=>{}}={}){const e=["camera-zoom","camera-zoom-value","camera-fov","camera-fov-value","camera-reset","camera-sensitivity","camera-sensitivity-value"],[n,s,r,o,a,l,c]=e.map(x=>{const p=i.$(x);if(!p)throw new Error(`Camera settings need #${x}`);return p});n.min="70",n.max="150",n.step="5",r.min="40",r.max="80",r.step="1",l.min="25",l.max="200",l.step="5";const h=()=>{const x=bf(i.settings);return Object.assign(i.settings,x),n.value=String(Math.round(x.cameraZoom*100)),s.textContent=n.value+"%",r.value=String(x.cameraFov),o.textContent=r.value+"°",l.value=String(Math.round(x.cameraSensitivity*100)),c.textContent=l.value+"%",x},u=()=>{const x=h();W_(i),t(x)},d=()=>{i.settings.cameraZoom=Number(n.value)/100,u()},f=()=>{i.settings.cameraFov=Number(r.value),u()},m=()=>{i.settings.cameraSensitivity=Number(l.value)/100,u()},g=()=>{Object.assign(i.settings,wa),u()};return n.addEventListener("input",d),r.addEventListener("input",f),a.addEventListener("click",g),l.addEventListener("input",m),h(),()=>{n.removeEventListener("input",d),r.removeEventListener("input",f),a.removeEventListener("click",g),l.removeEventListener("input",m)}}const Di=1e-7,ga=i=>i&&Number.isFinite(i.x)&&Number.isFinite(i.y)&&Number.isFinite(i.z),Jl=(i,t)=>i.x*t.x+i.y*t.y+i.z*t.z,xa=(i,t)=>({x:i.x-t.x,y:i.y-t.y,z:i.z-t.z}),Ql=(i,t,e)=>({x:i.x+t.x*e,y:i.y+t.y*e,z:i.z+t.z*e});function q_({rayOrigin:i,rayDirection:t,muzzle:e,range:n,hits:s=[]}={}){const r=ga(e)?e:{x:0,y:0,z:0},o=ga(i)?i:r,a=ga(t)?Math.hypot(t.x,t.y,t.z):0,l=a>Di?{x:t.x/a,y:t.y/a,z:t.z/a}:{x:0,y:0,z:-1},c=Number.isFinite(n)&&n>Di?n:1;let h=null,u=1/0;for(const p of s||[]){const v=p?.point??p;if(!ga(v))continue;const y=xa(v,r),_=xa(v,o),T=Jl(_,l),A=Math.hypot(y.x,y.y,y.z);T<=Di||T>=u||A<=Di||A>c+Di||(h=v,u=T)}const d=h?"hit":"range";if(!h){const p=xa(o,r),v=Jl(p,l),y=v*v-Jl(p,p)+c*c,_=y>=0?-v+Math.sqrt(y):-1;if(_>Di)h=Ql(o,l,_);else{const T=Math.max(0,-v);h=Ql(o,l,T>Di?T:c)}}const f=xa(h,r),m=Math.hypot(f.x,f.y,f.z),g=m>Di?{x:f.x/m,y:f.y/m,z:f.z/m}:l,x=m>Di?Math.min(c,m):c;return{target:Ql(r,g,x),direction:g,distance:x,source:d}}const en=L,tc=new en(0,1,0),$_=ln.muzzleOffset+At.projectileSpeed*At.projectileLifetime,va=(i,t,e)=>Math.max(t,Math.min(e,i)),Y_=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]),ec=i=>{try{return localStorage.getItem(i)}catch{return null}},Kr=(i,t)=>{try{return localStorage.setItem(i,t),!0}catch{return!1}},Dr=i=>`<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">${i}</svg>`,_d=Dr('<ellipse cx="21" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(-30 21 23)"/><ellipse cx="43" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(30 43 23)"/><ellipse cx="32" cy="37" rx="10" ry="15" fill="#344b50" stroke="#12282b" stroke-width="3"/><circle cx="27" cy="25" r="5" fill="#fff6cd"/><circle cx="37" cy="25" r="5" fill="#fff6cd"/><circle cx="28" cy="25" r="2" fill="#14282c"/><circle cx="36" cy="25" r="2" fill="#14282c"/>'),Z_=Dr('<path d="m15 8 11 5-4 21 29 6 4 10-36 4-9-11z" fill="#d3ff80" stroke="#314b2d" stroke-width="3"/><path d="m46 13 4 8m9-5-6 9m9 4-9 1" stroke="#ffce71" stroke-width="4"/>'),j_=Dr('<path d="M9 50h46M18 47l10-28 18 28M31 27l20-17" stroke="#d9bf82" stroke-width="6" stroke-linecap="round"/><path d="m45 9 13 4-4 10-12-5z" fill="#8ea29a"/><circle cx="17" cy="53" r="6" fill="#6d4e35"/><circle cx="48" cy="53" r="6" fill="#6d4e35"/>'),Md=Dr('<path d="M18 10v44l36-22z" fill="#f3ffd0" stroke="#264e26" stroke-width="4" stroke-linejoin="round"/>'),K_=Dr('<path d="M12 18h40M12 32h40M12 46h40" stroke="#e9f3e5" stroke-width="5" stroke-linecap="round"/><circle cx="24" cy="18" r="6" fill="#fbc562"/><circle cx="42" cy="32" r="6" fill="#fbc562"/><circle cx="24" cy="46" r="6" fill="#fbc562"/>'),J_=Dr('<path d="M8 29 32 9l24 20M14 27v29h36V27" stroke="#f4dfad" stroke-width="5" stroke-linejoin="round"/><path d="M24 56V35h16v21" fill="#243e36" stroke="#f4dfad" stroke-width="3"/><path d="m12 12 11 10m29-10L41 22" stroke="#ffad7a" stroke-width="4"/>');class Q_{constructor(){this.volume=.5,this.ctx=null,this.gain=null}resume(){try{this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext),this.gain=this.ctx.createGain(),this.gain.connect(this.ctx.destination)),this.gain.gain.value=this.volume,this.ctx.resume()}catch{}}pause(){this.ctx&&(this.gain.gain.value=0,this.ctx.suspend().catch(()=>{}))}play(t){if(!this.ctx||this.ctx.state!=="running"||this.volume<=0)return;const e=this.ctx,n=e.currentTime,s=e.createOscillator(),r=e.createGain(),a={shot:[200,70,.065],tongue:[560,150,.11],hit:[110,45,.12],hitConfirm:[860,530,.07],storageAlert:[740,480,.3],stoneShot:[110,65,.2],stoneImpact:[75,35,.3],land:[95,50,.13],dizzy:[700,240,.28],ko:[80,330,.26],win:[400,800,.45],lost:[220,55,.4]}[t];a&&(s.type=t==="hit"?"triangle":"sine",s.frequency.setValueAtTime(a[0],n),s.frequency.exponentialRampToValueAtTime(a[1],n+a[2]),r.gain.setValueAtTime(1e-4,n),r.gain.exponentialRampToValueAtTime(.14,n+.008),r.gain.exponentialRampToValueAtTime(1e-4,n+a[2]),s.connect(r),r.connect(this.gain),s.start(n),s.stop(n+a[2]+.01),s.onended=()=>{s.disconnect(),r.disconnect()})}}class tM{constructor(){this.touch=matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>0,this.mouseControl=!this.touch,this.settings={volume:.5,quality:this.touch?"low":"high"};try{Object.assign(this.settings,JSON.parse(ec(ha)||"{}"))}catch{}Object.assign(this.settings,bf(this.settings)),delete this.settings.cameraAutoRotate,this.storageAlertUntil=-1/0,this.settings.volume=va(Number(this.settings.volume)||0,0,1),["low","high"].includes(this.settings.quality)||(this.settings.quality="low");const t=ec(ca);try{JSON.parse(t)?.version===1&&!ec(ca+"-before-bases")&&Kr(ca+"-before-bases",t)}catch{}this.state=jc(),this.saved=y_(t),this.running=!1,this.mode="title",this.keys=new Set,this.actions={fire:!1,kick:!1,sabotage:!1},this.aimStrength=0,this.move={x:0,z:0},this.aim={x:0,z:-1},this.mouse={x:0,y:0,valid:!1,inside:!1},this.pointers=new Map,this.layoutEditing=!1,this.fx=[],this.particles=[],this.splats=[],this.tongues=new Map,this.bulletMeshes=new Map,this.koTimes=new Map,this.elapsed=0,this.shake=0,this.saveClock=0,this.accumulator=0,this.failures=[],this.hitConfirmUntil=0,this.lastPlayerHit=null,this.scene=new xm,this.scene.background=new ee("#9fe4ff"),this.scene.fog=new Ua("#baf0ea",.006),this.renderer=new Ly({antialias:!this.touch,powerPreference:"high-performance"}),this.renderer.domElement.id="arcade-world",this.renderer.domElement.setAttribute("aria-label","FROG — κωμική μάχη με μύγες"),this.renderer.outputColorSpace=Un,this.renderer.toneMapping=wd,this.renderer.toneMappingExposure=1.3,document.body.append(this.renderer.domElement),this.camera=new kn(this.settings.cameraFov,innerWidth/innerHeight,.1,250),this.camera.position.set(0,8,15),this.focus=new en(0,2,3),this.cameraTarget=new en(0,8,15),this.viewMode="chase3d",this.cameraReady=!1,this.cameraYaw=ss.yaw,this.cameraPitch=ss.pitch,this.cameraDrag=null,this.pointerLockedActive=!1,this.lookRequestPending=!1,this.lastMovement={x:0,z:0},this.stickAim={x:0,z:-1},this.mouseRay=new Rl,this.mousePoint=new en,this.mouseNdc=new Wt,this.mousePlane=new pi(tc,0),this.scene.add(new Xm("#def8ff","#52733a",2.6)),this.sun=new Zm("#fff1bf",3.2),this.sun.position.set(-16,36,12),this.scene.add(this.sun),this.world=g1(this.scene,this.renderer,{seed:731,natural:!0});for(const s of[...this.world.creekRefuges])this.world.removeShelter(s.mesh);const e=(s,r)=>this.world.getSurface(s,r).height;this.houseFloors=[...R1(e),...C1(e)];const n=this.world.group.getObjectByName("Fly swarms");n&&(n.visible=!1);for(const s of this.world.hotspots)s.flies=0;this.labels=document.createElement("canvas"),this.labels.id="arcade-labels",document.body.append(this.labels),this.labelCtx=this.labels.getContext("2d"),this.sound=new Q_,this.sound.volume=this.settings.volume,this.shared={sphere:new jn(1,10,7),wing:new jn(1,6,4),cylinder:new Us(1,1,1,8),circle:new ka(1,18)},this.materials={insect:new Ve({color:"#263f42",roughness:.8,metalness:0}),wing:new xn({color:"#edfcff",transparent:!0,opacity:.86,side:Ce,depthWrite:!1}),tongue:new Ve({color:"#ff839c",roughness:.4}),shot:new Ve({color:"#384b4d",emissive:"#a6c9bf",emissiveIntensity:.16}),ink:new xn({color:"#90e44c",transparent:!0,opacity:.9,depthWrite:!1,side:Ce}),rock:new Ve({color:"#617b70",roughness:.9}),rim:new xn({color:"#eaff9e",transparent:!0,opacity:.6,depthWrite:!1})},this.createArena(),this.models=[],this.buildActors(),this.createFlies(),this.artilleryView=new C_(this),this.basesView=new k_(this),this.impactEffects=new L_(this),this.createUI(),this.bindInputs(),this.applyQuality(),this.resize(),this.showTitle(),window.__FROG__={version:Wl,mode:"arcade",inspect:()=>this.inspect(),save:()=>this.persist()},new URLSearchParams(location.search).has("test")&&(window.__FROG__.test={step:(s,r=1)=>{for(let o=0;o<r;o++)dd(this.state,s,1/60),this.consumeEvents();this.updateHUD()},state:()=>this.state,setState:s=>{this.state=s,this.buildActors(),this.updateHUD()},input:()=>this.currentInput(),kickTarget:()=>Kc(this.state,this.state.actors[0])?.id}),this.last=performance.now(),X_(this,{onChange:()=>Kr(ha,JSON.stringify(this.settings))}),this.renderer.setAnimationLoop(s=>this.frame(s)),document.getElementById("boot")?.remove()}ground(t,e){return P1(t,e,this.houseFloors)??this.world.getSurface(t,e).height}cameraGround(t,e){return Math.max(this.ground(t,e),this.world.cameraSurfaceHeight(t,e))}createArena(){this.obstacleMeshes=[];for(const n of ms){const s=new Jt(new Na(n.r,1),this.materials.rock);s.scale.y=1.7,s.position.set(n.x,this.ground(n.x,n.z)+n.r*.9,n.z),this.scene.add(s),this.obstacleMeshes.push(s)}const t=[];for(let n=0;n<=160;n++){const s=n/160*Math.PI*2,r=Math.sin(s)*At.radius,o=Math.cos(s)*At.radius;t.push(new en(r,this.ground(r,o)+.06,o))}const e=new po(new Se().setFromPoints(t),this.materials.rim);this.scene.add(e),this.playerRing=new Jt(new as(1.05,1.18,32),new xn({color:"#ecff9a",side:Ce,transparent:!0,opacity:.85,depthWrite:!1})),this.playerRing.rotation.x=-Math.PI/2,this.scene.add(this.playerRing),this.aimGuide=new po(new Se().setFromPoints([new en,new en]),new Yd({color:"#fff2b0",dashSize:.45,gapSize:.35,transparent:!0,opacity:.65})),this.scene.add(this.aimGuide),this.aimReticle=new Jt(new as(.35,.42,24),new xn({color:"#fff2b0",side:Ce,transparent:!0,opacity:.88,depthWrite:!1})),this.aimReticle.rotation.x=-Math.PI/2,this.scene.add(this.aimReticle),this.targetRing=new Jt(new as(1.32,1.44,32),new xn({color:"#ffb19c",side:Ce,transparent:!0,opacity:.9,depthWrite:!1})),this.targetRing.rotation.x=-Math.PI/2,this.targetRing.visible=!1,this.scene.add(this.targetRing),this.swarmRings=Cr.map(n=>{const s=new Jt(new as(n.radius-.08,n.radius+.03,40),new xn({color:"#c8e0a3",side:Ce,transparent:!0,opacity:.22,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.set(n.x,this.ground(n.x,n.z)+.08,n.z),this.scene.add(s),s})}buildActors(){$1(this.state,{ground:(t,e)=>this.ground(t,e)});for(const t of this.models||[])t.dispose();this.models=this.state.actors.map((t,e)=>{const n=T1("frog",{seed:7+e*39,team:e===0?"player":`enemy${e}`,role:e===2?"bruiser":"hunter",tier:1,level:1});if(n.setEquipment({}),n.setOutline(e===0?"#e7fca7":e===1?"#ffae88":"#d3a8ff",!0),this.settings.quality==="low"&&n.setRenderLOD(1),n.mesh?.material){const s=n.mesh.material;s.bumpScale=0,s.roughness=.85,s.userData?.tint?.set(["#86da38","#ff694a","#bb70ed"][e])}return G_(n),this.scene.add(n.group),n})}createFlies(){const t=this.state.flies.length;this.flyBodies=new wn(this.shared.sphere,this.materials.insect,t),this.flyWings=new wn(this.shared.wing,this.materials.wing,t*2);for(const e of[this.flyBodies,this.flyWings])e.instanceMatrix.setUsage(Ui),e.frustumCulled=!1,this.scene.add(e);this.dummy=new qe}createUI(){this.ui=document.createElement("div"),this.ui.id="arcade-ui",this.ui.classList.toggle("is-touch",this.touch),this.ui.innerHTML=`<header id="arcade-hud" hidden><button class="view-button" id="view-button" aria-label="Αλλαγή σε κεντραρισμένη κάτοψη">ΠΙΣΩ 3D · C</button><div class="ammo-card">${_d}<div class="ammo-info"><div class="ammo-numbers"><strong id="ammo-count">0 / ${At.capacity}</strong><b id="ammo-percent">0%</b></div><div id="ammo-track" role="progressbar" aria-label="Γέμιση με μύγες" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="ammo-fill"></i></div><span id="ammo-state">Γέμισε στην αποθήκη σου</span></div></div><div class="ko-card base-card"><b id="ko-count">3 / 3</b><span>ΑΠΟΘΗΚΕΣ</span><div id="base-dots" aria-label="Άθικτες αποθήκες"><i data-owner="player"></i><i data-owner="rival-1"></i><i data-owner="rival-2"></i></div></div><button class="small-button" id="pause-button" aria-label="Παύση">Ⅱ</button></header>
  <div id="round-status" hidden><b id="round-time">20″</b><span id="round-copy">ΠΡΟΕΤΟΙΜΑΣΙΑ · Προστάτεψε την αποθήκη σου</span></div><div id="base-status" hidden><b id="base-warning-title" role="alert" aria-atomic="true"></b><span id="base-warning-detail"></span></div>
  <button id="catapult-button" class="touch-action catapult-button" aria-label="Χρήση κοντινού καταπέλτη" hidden>${j_}<span>ΧΡΗΣΗ</span></button><div id="catapult-status" hidden></div>
  <button id="sabotage-button" class="touch-action sabotage-button" aria-label="Κράτησε για καταστροφή εχθρικής αποθήκης" hidden>${J_}<span>ΚΡΑΤΑ · 10″</span></button><div id="sabotage-status" hidden><span id="sabotage-copy"></span><div role="progressbar" aria-label="Καταστροφή αποθήκης" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="sabotage-track"><i id="sabotage-fill"></i></div></div>
  <canvas id="minimap" width="320" height="320" aria-label="Χάρτης: η βάση σου πράσινη, εχθρικές αποθήκες κόκκινη και μωβ, είσοδοι, καταπέλτες και σμήνη"></canvas><div id="dizzy-banner" hidden>🌀 ΖΑΛΙΣΤΗΚΕΣ! <b id="dizzy-time"></b></div><div id="callout" aria-live="polite"></div>
  <div id="desktop-help" hidden><span><b>WASD</b> Κίνηση</span><span><b>Ποντίκι</b> Θέα + στόχευση</span><span><b>Κλικ</b> Μύγες</span><span><b>E κράτημα</b> Αποθήκη</span><span><b>E</b> Καταπέλτης</span><span id="pc-kick"><b>Q</b> Κλωτσιά</span><span><b>Esc</b> Παύση</span></div>
  <div id="touch-controls" hidden><div class="stick-zone move-zone"><div id="move-stick" class="stick" aria-label="Κίνηση"><div class="stick-inner"></div><div class="stick-knob"></div></div><span class="stick-caption">ΑΛΜΑΤΑ</span></div><button id="kick-button" class="touch-action kick-button" aria-label="Αμυντική κλωτσιά για απώθηση κοντινού αντιπάλου" hidden disabled>${Z_}<span>ΚΛΩΤΣΙΑ</span></button><button id="fire-button" class="touch-action fire-button" aria-label="Κράτησε για εκτόξευση μυγών">${_d}<span>ΠΥΡ</span></button><div class="stick-zone aim-zone"><div id="aim-stick" class="stick" aria-label="Θέα και στόχευση"><div class="fire-ring"></div><div class="stick-inner"></div><div class="stick-knob"></div><span class="aim-center" aria-hidden="true">+</span></div><span class="stick-caption">ΘΕΑ / ΣΤΟΧΕΥΣΗ</span></div><button id="layout-button" class="layout-button" aria-label="Μετακίνηση χειριστηρίων"><b aria-hidden="true">↔</b><span>ΘΕΣΕΙΣ</span></button><div id="layout-hint" hidden>Σύρε τα χειριστήρια στη θέση σου.</div></div>
  <section id="arcade-menu" class="menu"><div id="menu-main" class="menu-buttons"><button id="play-button" class="art-button play-button">${Md}<span>ΠΑΙΞΕ</span></button><button id="settings-button" class="art-button settings-button">${K_}<span>ΡΥΘΜΙΣΕΙΣ</span></button><button id="new-round-button" class="plain-button" hidden>ΝΕΟΣ ΓΥΡΟΣ</button><p id="look-status" role="status" hidden></p></div><div id="settings-panel" class="settings-panel" hidden><h2>Ρυθμίσεις</h2><div class="settings-grid"><label>Ήχος <input id="volume" type="range" min="0" max="100" value="${Math.round(this.settings.volume*100)}"></label><label>Γραφικά <select id="quality"><option value="low">Ομαλή κίνηση</option><option value="high">Υψηλά</option></select></label></div><div class="camera-settings-heading"><h3>Κάμερα</h3><button id="camera-reset" type="button">ΕΠΑΝΑΦΟΡΑ</button></div><div class="settings-grid camera-settings-grid"><label for="camera-zoom"><span>Zoom <output id="camera-zoom-value" for="camera-zoom">100%</output></span><input id="camera-zoom" type="range" min="70" max="150" step="5" value="100"></label><label for="camera-fov"><span>Οπτικό πεδίο <output id="camera-fov-value" for="camera-fov">52°</output></span><input id="camera-fov" type="range" min="40" max="80" step="1" value="52" aria-label="Οπτικό πεδίο FOV σε μοίρες"></label><label class="camera-sensitivity-label" for="camera-sensitivity"><span>Ευαισθησία <output id="camera-sensitivity-value" for="camera-sensitivity">100%</output></span><input id="camera-sensitivity" type="range" min="25" max="200" step="5" value="100" aria-label="Ευαισθησία ποντικιού και θέας"></label></div><button id="settings-back" class="art-button compact">ΠΙΣΩ</button></div><div id="result-panel" class="result-panel" hidden><span class="result-kicker">FROG • FLY FRENZY</span><h1 id="result-title"></h1><p id="result-copy"></p><button id="replay-button" class="art-button play-button">${Md}<span>ΠΑΙΞΕ ΞΑΝΑ</span></button><button id="result-settings" class="plain-button">Ρυθμίσεις</button></div><span class="version">FROG ${Wl}</span></section>`,document.body.append(this.ui),this.$=t=>this.ui.querySelector("#"+t),this.$("quality").value=this.settings.quality,this.$("view-button").onclick=t=>this.toggleView(t),this.$("play-button").onclick=t=>this.startOrResume(t),this.$("pause-button").onclick=()=>this.pause(),this.$("settings-button").onclick=()=>this.settingsMenu(),this.$("result-settings").onclick=()=>this.settingsMenu(),this.$("settings-back").onclick=()=>{this.$("arcade-menu").classList.remove("settings-open"),this.$("settings-panel").hidden=!0,this.mode==="result"?this.$("result-panel").hidden=!1:this.$("menu-main").hidden=!1},this.$("replay-button").onclick=t=>this.startNew(t),this.$("new-round-button").onclick=t=>this.startNew(t),this.$("volume").oninput=t=>{this.settings.volume=Number(t.target.value)/100,this.sound.volume=this.settings.volume,Kr(ha,JSON.stringify(this.settings))},this.$("quality").onchange=t=>{this.settings.quality=t.target.value,this.applyQuality(),Kr(ha,JSON.stringify(this.settings))},this.touchLayout=B_({root:this.$("touch-controls"),movePad:this.ui.querySelector(".move-zone"),aimPad:this.ui.querySelector(".aim-zone"),fireButton:this.$("fire-button"),toggleButton:this.$("layout-button"),storageKey:"frog-touch-layout-v1",onEditingChange:t=>{this.layoutEditing=t,this.clearInputs(),this.accumulator=0,t?this.sound.pause():this.running&&this.sound.resume()},announce:t=>this.message(t,2)})}showTitle(){this.running=!1,this.mode="title",this.$("play-button").querySelector("span").textContent=this.saved?.status==="playing"?"ΣΥΝΕΧΕΙΑ":"ΠΑΙΞΕ",this.$("new-round-button").hidden=this.saved?.status!=="playing",this.ui.classList.add("in-menu")}settingsMenu(){this.$("arcade-menu").classList.add("settings-open"),this.$("menu-main").hidden=!0,this.$("result-panel").hidden=!0,this.$("settings-panel").hidden=!1}startOrResume(t){if(this.mode==="pause"){this.go(t);return}this.saved?.status==="playing"?(this.state=this.saved,this.saved=null,this.resetCamera(),this.buildActors(),this.go(t)):this.startNew(t)}toggleView(t){this.stopCameraDrag(),this.actions.fire=!1,this.mouse.valid=!1,this.viewMode=this.viewMode==="chase3d"?"overview":"chase3d",this.$("view-button").textContent=this.viewMode==="chase3d"?"ΠΙΣΩ 3D · C":"ΚΑΤΟΨΗ · C",this.$("view-button").setAttribute("aria-label",this.viewMode==="chase3d"?"Αλλαγή σε κεντραρισμένη κάτοψη":"Αλλαγή σε κάμερα πίσω από τον βάτραχο"),this.cameraReady=!1,this.viewMode==="overview"?this.releaseMouseLook():(this.centerAim(),this.running&&(t?.pointerType==="mouse"||(this.mouseControl||t?.type==="keydown")&&t?.pointerType!=="touch")&&this.requestMouseLook())}startNew(t){this.storageAlertUntil=-1/0,this.saved=null,this.state=jc(731+Math.floor(Math.random()*1e5)),this.resetCamera(),this.clearEffects(),this.buildActors(),this.go(t),this.message("60 μύγες έτοιμες!",1.6)}resetCamera(){const t=this.state.actors[0],e=__(t);this.cameraYaw=Math.atan2(e.x,e.z),this.cameraPitch=ss.pitch,this.cameraReady=!1,this.mouse.valid=!1,this.aim={x:t.aimX,z:t.aimZ},this.stopCameraDrag()}beginCameraDrag(t){if(this.cameraDrag)return;this.mouseControl=!1,this.viewMode==="overview"&&this.toggleView(t),this.centerAim(),this.cameraDrag={id:t.pointerId,type:t.pointerType,x:t.clientX,y:t.clientY};const e=this.renderer.domElement;e.setPointerCapture(t.pointerId),e.classList.add("camera-dragging")}stopCameraDrag(){const t=this.cameraDrag;this.cameraDrag=null;const e=this.renderer?.domElement;t&&e?.hasPointerCapture?.(t.id)&&e.releasePointerCapture(t.id),e?.classList.remove("camera-dragging")}go(t){t?.pointerType==="touch"&&(this.mouseControl=!1),this.$("arcade-menu").classList.remove("settings-open"),this.clearInputs(),this.accumulator=0,this.last=performance.now(),this.running=!0,this.mode="play",this.$("new-round-button").hidden=!0,this.$("arcade-menu").hidden=!0,this.$("settings-panel").hidden=!0,this.$("result-panel").hidden=!0,this.$("menu-main").hidden=!1,this.$("look-status").hidden=!0,this.$("arcade-hud").hidden=!1,this.$("desktop-help").hidden=this.touch,this.$("touch-controls").hidden=!this.touch,this.ui.classList.remove("in-menu"),this.sound.resume(),this.updateHUD(),this.touchLayout?.refresh(),this.persist(),this.viewMode==="chase3d"&&(this.centerAim(),(t?.pointerType==="mouse"||(this.mouseControl||t?.type==="keydown")&&t?.pointerType!=="touch")&&this.requestMouseLook())}pause(){this.running&&(this.touchLayout?.setEditing(!1),this.running=!1,this.mode="pause",this.clearInputs(),this.releaseMouseLook(),this.persist(),this.sound.pause(),this.$("arcade-menu").hidden=!1,this.$("menu-main").hidden=!1,this.$("settings-panel").hidden=!0,this.$("play-button").querySelector("span").textContent="ΣΥΝΕΧΕΙΑ",this.$("new-round-button").hidden=!1,this.ui.classList.add("in-menu"))}finish(){this.touchLayout?.setEditing(!1),this.running=!1,this.mode="finishing",this.resultAt=this.elapsed+.85,this.clearInputs(),this.releaseMouseLook(),this.persist()}showResult(){this.running=!1,this.mode="result",this.clearInputs(),this.persist();const t=this.state.status==="won";this.sound.play(t?"win":"lost"),this.$("arcade-menu").hidden=!1,this.$("menu-main").hidden=!0,this.$("result-panel").hidden=!1,this.$("result-title").textContent=t?"Η ΤΕΛΕΥΤΑΙΑ ΑΠΟΘΗΚΗ ΕΙΝΑΙ ΔΙΚΗ ΣΟΥ!":"Η ΑΠΟΘΗΚΗ ΣΟΥ ΚΑΤΑΣΤΡΑΦΗΚΕ",this.$("result-copy").textContent=t?`${this.state.stats.kos} νοκ άουτ · ${this.state.stats.shots} βολές · ${Math.floor(this.state.time)}″ μάχης`:"Κράτησε την είσοδο, διέκοψε τους εισβολείς με μία εύστοχη βολή και ανεφοδιάσου πριν ξαναβγείς.",this.ui.classList.add("in-menu")}persist(){return this.mode==="title"?!1:Kr(ca,v_(this.state))}clearInputs(){if(this.lastMovement={x:0,z:0},this.renderer?.domElement.classList.remove("mouse-aiming"),this.currentAimPreview=null,this.currentAimScreen=null,this.aimGuide&&(this.aimGuide.visible=!1),this.aimReticle&&(this.aimReticle.visible=!1),this.targetRing&&(this.targetRing.visible=!1),this.keys.clear(),this.actions={fire:!1,kick:!1,sabotage:!1},this.aimStrength=0,this.mouse.valid=!1,this.mouse.inside=!1,this.move={x:0,z:0},this.pointers.clear(),this.stopCameraDrag(),this.ui){for(const t of this.ui.querySelectorAll(".stick-knob"))t.style.transform="translate(-50%,-50%)";this.$("aim-stick").classList.remove("firing"),this.$("fire-button")?.classList.remove("firing")}}pointerLocked(){return document.pointerLockElement===this.renderer.domElement}requestMouseLook(){if(!(!this.running||this.layoutEditing||this.viewMode!=="chase3d"||this.pointerLocked()||this.lookRequestPending)){this.mouseControl=!0,this.lookRequestPending=!0;try{this.renderer.domElement.requestPointerLock()?.catch?.(()=>this.pointerLookFailed())}catch{this.pointerLookFailed()}}}releaseMouseLook(){this.pointerLocked()&&document.exitPointerLock()}pointerLookFailed(){if(!this.lookRequestPending||(this.lookRequestPending=!1,!this.running||this.pointerLocked()))return;this.pause();const t=this.$("look-status");t.textContent="Πάτησε ΣΥΝΕΧΕΙΑ για έλεγχο με το ποντίκι.",t.hidden=!1}centerAim(){this.mouse.x=this.w/2,this.mouse.y=this.h/2,this.mouse.valid=!0}turnLook(t,e,n=!1){if(!this.running||this.layoutEditing||this.viewMode!=="chase3d")return;const s=pd({yaw:this.cameraYaw,pitch:this.cameraPitch},t,e,{sensitivity:di.sensitivity*this.settings.cameraSensitivity*(n?1.6:1)});this.cameraYaw=s.yaw,this.cameraPitch=s.pitch,this.centerAim()}bindInputs(){addEventListener("keydown",s=>{if(!s.target.matches("input,select")){if(s.code==="Escape"){if(s.preventDefault(),this.layoutEditing){this.touchLayout.setEditing(!1);return}this.running&&this.pause();return}if(!(!this.running||this.layoutEditing)){if(s.code==="KeyC"&&!s.repeat){s.preventDefault(),this.toggleView(s);return}(Y_.has(s.code)||["KeyQ","KeyE"].includes(s.code))&&(s.preventDefault(),this.keys.add(s.code))}}}),addEventListener("keyup",s=>this.keys.delete(s.code));const t=this.renderer.domElement;document.addEventListener("pointerlockchange",()=>{const s=this.pointerLockedActive;if(this.pointerLockedActive=this.pointerLocked(),this.lookRequestPending=!1,this.pointerLockedActive){if(!this.running||this.layoutEditing||this.viewMode!=="chase3d"){this.releaseMouseLook();return}this.centerAim()}else s&&(this.actions.fire=!1,this.running&&!this.layoutEditing&&this.viewMode==="chase3d"&&this.pause())}),document.addEventListener("pointerlockerror",()=>this.pointerLookFailed()),t.addEventListener("pointermove",s=>{if(!(!this.running||this.layoutEditing)){if(s.pointerType==="mouse"){this.pointerLocked()?this.turnLook(s.movementX,s.movementY):this.viewMode==="overview"&&this.captureMouseAim(s);return}this.cameraDrag?.id===s.pointerId&&(s.preventDefault(),this.turnLook(s.clientX-this.cameraDrag.x,s.clientY-this.cameraDrag.y,!0),this.cameraDrag.x=s.clientX,this.cameraDrag.y=s.clientY)}}),t.addEventListener("pointerdown",s=>{if(!(!this.running||this.layoutEditing)){if(s.preventDefault(),s.pointerType==="touch"||s.pointerType==="pen"){this.beginCameraDrag(s);return}if(this.viewMode==="chase3d"&&!this.pointerLocked()){s.button===0&&this.requestMouseLook();return}s.button===0&&(this.viewMode==="chase3d"?this.centerAim():this.captureMouseAim(s),this.actions.fire=!0)}}),addEventListener("pointerup",s=>{this.cameraDrag?.id===s.pointerId&&this.stopCameraDrag(),s.pointerType==="mouse"&&s.button===0&&(this.actions.fire=!1)}),t.addEventListener("pointercancel",s=>{this.cameraDrag?.id===s.pointerId&&this.stopCameraDrag(),this.actions.fire=!1}),t.addEventListener("pointerleave",s=>{s.pointerType==="mouse"&&this.viewMode==="overview"&&!s.buttons&&(this.mouse.valid=!1,t.classList.remove("mouse-aiming"))}),t.addEventListener("lostpointercapture",s=>{this.cameraDrag?.id===s.pointerId&&this.stopCameraDrag()}),t.addEventListener("contextmenu",s=>s.preventDefault());const e=(s,r)=>{const o=this.$(s),a=o.querySelector(".stick-knob");let l=null;const c=u=>{const d=o.getBoundingClientRect(),f=(u.clientX-d.left-d.width/2)/(d.width/2),m=(u.clientY-d.top-d.height/2)/(d.height/2),g=o_(f,m),x=Math.hypot(f,m),p=x>1?1/x:1;a.style.transform=`translate(-50%,-50%) translate(${f*p*d.width*.31}px,${m*p*d.height*.31}px)`,r==="move"?this.move={x:g.x,z:g.z}:(this.aimStrength=Math.min(1,x),x>.08&&(this.stickAim={x:f/x,z:m/x})),this.viewMode==="chase3d"?this.centerAim():this.mouse.valid=!1};o.onpointerdown=u=>{!this.running||this.layoutEditing||l!==null&&this.pointers.has(r)||(u.preventDefault(),l=u.pointerId,this.pointers.set(r,l),o.setPointerCapture(u.pointerId),c(u))},o.onpointermove=u=>{!this.layoutEditing&&l===u.pointerId&&this.pointers.get(r)===l&&(u.preventDefault(),c(u))};const h=u=>{u.pointerId===l&&(l=null,this.pointers.delete(r),a.style.transform="translate(-50%,-50%)",r==="move"?this.move={x:0,z:0}:(this.aimStrength=0,o.classList.remove("firing")))};o.onpointerup=h,o.onpointercancel=h,o.onlostpointercapture=h};e("move-stick","move"),e("aim-stick","aim");const n=(s,r)=>{const o=this.$(s);let a=null,l=null;o.onpointerdown=h=>{!this.running||this.layoutEditing||o.disabled||(h.preventDefault(),a=h.pointerId,l={x:h.clientX,y:h.clientY},o.setPointerCapture(h.pointerId),this.viewMode==="chase3d"&&this.centerAim(),this.actions[r]=!0)},o.onpointermove=h=>{r!=="fire"||a!==h.pointerId||h.pointerType!=="touch"||!this.actions.fire||(this.turnLook(h.clientX-l.x,h.clientY-l.y,!0),l={x:h.clientX,y:h.clientY})};const c=h=>{h.pointerId===a&&(a=null,l=null,this.actions[r]=!1)};o.onpointerup=c,o.onpointercancel=c,o.onlostpointercapture=c};n("kick-button","kick"),n("fire-button","fire"),n("sabotage-button","sabotage"),addEventListener("blur",()=>{this.clearInputs(),this.running&&this.pause()}),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.clearInputs(),this.pause(),this.sound.pause())}),addEventListener("beforeunload",()=>this.persist()),addEventListener("resize",()=>{this.clearInputs(),this.resize()})}applyQuality(){const t=this.settings.quality==="low";this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,t?1:1.5));for(const e of this.models)e.setRenderLOD(t?1:0);this.resize()}resize(){const t=innerWidth,e=innerHeight;this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.cameraReady=!1,this.labels.width=t,this.labels.height=e,this.w=t,this.h=e,this.touchLayout?.refresh()}captureMouseAim(t){this.mouse.x=t.clientX,this.mouse.y=t.clientY,this.mouse.valid=!0,this.mouse.inside=!0,this.updateMouseTarget()}movementInput(){return this.lastMovement=da(this.move.x+(this.keys.has("KeyD")||this.keys.has("ArrowRight")?1:0)-(this.keys.has("KeyA")||this.keys.has("ArrowLeft")?1:0),this.move.z+(this.keys.has("KeyS")||this.keys.has("ArrowDown")?1:0)-(this.keys.has("KeyW")||this.keys.has("ArrowUp")?1:0),this.camera.position,this.focus),this.lastMovement}updateMouseTarget(){if(this.viewMode==="chase3d"&&this.centerAim(),!this.mouse.valid)return;const t=this.state.actors[0];if(this.mouseNdc.set(this.mouse.x/this.w*2-1,1-this.mouse.y/this.h*2),this.mouseRay.setFromCamera(this.mouseNdc,this.camera),t.catapultId){if(this.mousePlane.constant=-this.ground(t.x,t.z)-.9,this.mouseRay.ray.intersectPlane(this.mousePlane,this.mousePoint))this.mouse.target={x:this.mousePoint.x,y:this.mousePoint.y,z:this.mousePoint.z};else{const u=this.mouseRay.ray.direction,d=Math.hypot(u.x,u.z),f=da(0,-1,this.camera.position,this.focus);this.mouse.target={x:t.x+(d>1e-6?u.x/d:f.x)*Pe.maxRange,y:this.ground(t.x,t.z),z:t.z+(d>1e-6?u.z/d:f.z)*Pe.maxRange}}this.mouse.direction=null;return}const e=Zc(this.state,t),n=this.mouseRay.ray,s=$_,r=e.x-n.origin.x,o=e.y-n.origin.y,a=e.z-n.origin.z,l=Math.max(0,r*n.direction.x+o*n.direction.y+a*n.direction.z),c=l_(this.state,n.origin,n.direction,Math.hypot(r,o,a)+s,{ignoreId:t.id,solidFrom:l}),h=q_({rayOrigin:n.origin,rayDirection:n.direction,muzzle:e,range:s,hits:c?[c]:[]});this.mouse.target=h.target,this.mouse.direction=h.direction,this.mouse.distance=h.distance}aimFromScreen(t,e){const n=this.state.actors[0],s=this.ground(n.x,n.z)+.9,r=this.project(n.x,s,n.z),o=Math.min(this.w,this.h)*.34,a=new en,l=new Rl;if(l.setFromCamera(new Wt((r.x+t*o)/this.w*2-1,1-(r.y+e*o)/this.h*2),this.camera),l.ray.intersectPlane(new pi(tc,-s),a)){const c=a.x-n.x,h=a.z-n.z,u=Math.hypot(c,h);if(u>.05&&Number.isFinite(u))return{x:c/u,z:h/u,distance:u}}return da(t,e,this.camera.position,this.focus)}currentInput(){if(this.layoutEditing)return{};const t=this.state.actors[0],e=this.pointers.has("aim")&&this.aimStrength>.08,n=this.viewMode==="chase3d"||this.actions.fire||e||this.mouse.valid;if(e&&this.viewMode==="overview"&&(this.aim={...da(this.stickAim.x,this.stickAim.z,this.camera.position,this.focus),distance:14}),this.updateMouseTarget(),this.mouse.valid&&n&&this.mouse.target)if(!t.catapultId&&this.mouse.direction)this.aim={...this.mouse.direction,distance:this.mouse.distance};else{const r=this.mouse.target.x-t.x,o=this.mouse.target.z-t.z,a=Math.hypot(r,o);a>.1&&(this.aim={x:r/a,z:o/a,distance:a})}const s=this.movementInput();return{mx:s.x,mz:s.z,ax:this.aim.x,ay:this.aim.y,az:this.aim.z,aiming:n,fire:this.actions.fire,kick:this.actions.kick||this.keys.has("KeyQ"),sabotage:!t.catapultId&&(this.actions.sabotage||this.keys.has("KeyE"))}}message(t,e=1.5){this.$("callout").textContent=t,this.calloutUntil=this.elapsed+e}makeFlyBullet(){const t=new te,e=new Jt(this.shared.sphere,this.materials.shot);e.scale.set(.12,.1,.19),t.add(e);for(const n of[-1,1]){const s=new Jt(this.shared.wing,this.materials.wing);s.position.set(n*.13,.07,0),s.scale.set(.17,.018,.09),t.add(s)}return this.scene.add(t),t}consumeEvents(){for(const t of this.state.events){this.artilleryView?.consumeEvent(t);const e=this.state.actors.findIndex(r=>r.id===t.id),n=this.state.actors[e],s=this.models[e];if(t.type==="tongue"&&n){const r=this.tongues.get(n.id);r&&this.scene.remove(r.mesh);const o=new Jt(this.shared.cylinder,this.materials.tongue);this.scene.add(o),this.tongues.set(n.id,{mesh:o,start:this.elapsed,x:t.x,z:t.z})}if(t.type==="shot"&&n?.id==="player"&&this.sound.play("shot"),t.type==="hit"&&s){s.mesh.material.emissive?.set("#ffffff");const r=s.group.rotation.y,o=Math.cos(r),a=Math.sin(r);s.setImpact({x:o*t.dx-a*t.dz,z:a*t.dx+o*t.dz,strength:1.3,duration:n.knockUp>0?.42:.27}),this.impactEffects.hit({...t,height:Number.isFinite(t.y)?t.y:this.ground(t.x,t.z)+n.height+.75,heavy:n.knockUp>0}),this.shake=Math.max(this.shake,n.id==="player"?.16:.025),t.owner==="player"&&n.id!=="player"?(this.hitConfirmUntil=this.elapsed+.2,this.lastPlayerHit={id:n.id,x:t.x,y:t.y,z:t.z,time:this.elapsed},this.sound.play("hitConfirm")):n.id==="player"&&this.sound.play("hit")}if(t.type==="dizzy"&&(this.addText("ΖΑΛΗ!",n.x,n.z,"#ffe375",1),this.sound.play("dizzy"),n.id!=="player"&&this.message("ΖΑΛΙΣΤΗΚΕ! ΣΥΝΕΧΙΣΕ ΤΙΣ ΕΥΣΤΟΧΕΣ ΒΟΛΕΣ.",2)),t.type==="ko"&&(this.koTimes.set(n.id,{time:this.elapsed,dx:t.dx,dz:t.dz}),this.addText("ΝΟΚ ΑΟΥΤ!",n.x,n.z,"#ffe791",1.4),this.sound.play("ko"),this.shake=.32,this.makeSplat({...t,wall:!1})),t.type==="respawn"&&(this.koTimes.delete(t.id),t.id==="player"&&(this.clearInputs(),this.resetCamera(),this.message("Επέστρεψες με 60 μύγες!",2))),t.type==="sabotageStart"&&(t.id==="player"?this.elapsed>=this.storageAlertUntil&&(this.sound.play("storageAlert"),this.storageAlertUntil=this.elapsed+3):t.by==="player"&&this.message("Κράτα μέχρι το τέλος · οι βολές εναντίον σου διακόπτουν.",2)),t.type==="sabotageInterrupted"&&t.by==="player"&&this.message(t.reason==="hit"?"Σε χτύπησαν! Η καταστροφή διακόπηκε.":"Η καταστροφή διακόπηκε.",1.5),t.type==="baseDestroyed"){const r=Wn.find(o=>o.id===t.baseId);r&&this.addText("ΑΠΟΘΗΚΗ ΚΑΤΑΣΤΡΑΦΗΚΕ",r.stock.x,r.stock.z,"#ffc689",2),this.sound.play("stoneImpact"),this.shake=.2}t.type==="splat"&&this.makeSplat(t),t.type==="stoneShot"&&this.sound.play("stoneShot"),t.type==="land"&&t.stone&&(this.impactEffects.landing(t),Math.hypot(t.x-this.state.actors[0].x,t.z-this.state.actors[0].z)<10&&this.sound.play("land")),t.type==="stoneImpact"&&(this.sound.play("stoneImpact"),this.impactEffects.stone(t),Math.hypot(t.x-this.state.actors[0].x,t.z-this.state.actors[0].z)<7&&(this.shake=Math.max(this.shake,.16))),t.type==="battle"&&this.message("ΜΑΧΗ!",1.2)}}addText(t,e,n,s,r){this.fx.push({text:t,x:e,z:n,color:s,life:r,start:this.elapsed}),this.fx.length>28&&this.fx.shift()}burst(t,e){for(let n=0;n<9;n++){const s=new Jt(this.shared.sphere,this.materials.shot);s.scale.setScalar(.06+Math.random()*.07),s.position.set(t,this.ground(t,e)+1,e),this.scene.add(s),this.particles.push({mesh:s,start:this.elapsed,v:new en((Math.random()-.5)*6,2+Math.random()*4,(Math.random()-.5)*6)})}for(;this.particles.length>90;)this.particles.shift().mesh.removeFromParent()}makeSplat(t){const e=[];for(let l=0;l<20;l++){const c=l/20*6.283,h=(l+1)/20*6.283,u=.4+l%3*.14,d=.4+(l+1)%3*.14;e.push(0,0,0,Math.cos(c)*u,Math.sin(c)*u,0,Math.cos(h)*d,Math.sin(h)*d,0)}const s=new Se;s.setAttribute("position",new Gt(e,3));const r=this.materials.ink.clone();r.color.set(["#d2ed4d","#f5bf52","#c6ef78"][this.splats.length%3]);const o=new Jt(s,r),a=this.ground(t.x,t.z);if(t.normal&&Number.isFinite(t.y)&&(t.wall||t.kind==="terrain")){const l=new en(t.normal.x,t.normal.y,t.normal.z).normalize();o.position.set(t.x,t.y,t.z).addScaledVector(l,.025-ln.radius),o.quaternion.setFromUnitVectors(new en(0,0,1),l)}else if(t.wall){const l=new en(t.dx,t.dy||0,t.dz).normalize(),c=new en(t.x,Number.isFinite(t.y)?t.y:a+.9,t.z).addScaledVector(l,-1.5);for(const u of this.obstacleMeshes)u.updateMatrixWorld();const h=new Rl(c,l,0,5).intersectObjects(this.obstacleMeshes,!1)[0];if(h){const u=h.face.normal.clone().transformDirection(h.object.matrixWorld);o.position.copy(h.point).addScaledVector(u,.025),o.quaternion.setFromUnitVectors(new en(0,0,1),u)}else o.position.set(t.x,a+.05,t.z),o.rotation.x=-Math.PI/2}else o.position.set(t.x,a+.045,t.z),o.rotation.x=-Math.PI/2;if(this.scene.add(o),this.splats.push({mesh:o,start:this.elapsed}),this.splats.length>90){const l=this.splats.shift();l.mesh.removeFromParent(),l.mesh.geometry.dispose(),l.mesh.material.dispose()}}clearEffects(){this.impactEffects?.clear();for(const t of this.particles)t.mesh.removeFromParent();this.particles=[];for(const t of this.splats)t.mesh.removeFromParent(),t.mesh.geometry.dispose(),t.mesh.material.dispose();this.splats=[];for(const t of this.bulletMeshes.values())t.removeFromParent();this.bulletMeshes.clear();for(const t of this.tongues.values())t.mesh.removeFromParent();this.tongues.clear(),this.fx=[],this.koTimes.clear()}updateHUD(){const t=this.state.actors[0],e=Math.round(t.ammo/At.capacity*100),n=Kc(this.state,t),s=Ns(this.state,t),r=this.state.bases.filter(T=>!T.destroyed).length,o=Wn.find(T=>T.owner===t.id)?.stock,a=s&&!s.destroyed&&o&&Math.hypot(t.x-o.x,t.z-o.z)<=At.pickupRange&&ks(t,o),l=Wa(t)&&t.revealedTime<=0,c=Xa(this.state,t),h=this.state.bases.find(T=>!T.destroyed&&T.attackerId===t.id),u=this.$("sabotage-button");u.hidden=!this.running||this.layoutEditing||this.state.phase!=="battle"||t.ko||t.catapultId||!c,u.disabled=t.dizzyTime>0||t.knockUp>0||t.hit>0||t.sabotageRecovery>0,u.querySelector("span").textContent=h?`${Math.max(0,At.sabotageSeconds-h.progress).toFixed(1)}″`:this.touch?"ΚΡΑΤΑ · 10″":"ΚΡΑΤΑ E · 10″",this.$("sabotage-status").hidden=!this.running||!h;const d=h?h.progress/At.sabotageSeconds:0;this.$("sabotage-copy").textContent="ΚΑΤΑΣΤΡΟΦΗ ΑΠΟΘΗΚΗΣ",this.$("sabotage-fill").style.transform=`scaleX(${d})`,this.$("sabotage-track").setAttribute("aria-valuenow",String(Math.round(d*100)));const f=this.state.catapults?.find(T=>T.id===t.catapultId),m=hf(this.state,t),g=this.$("catapult-button");g.hidden=!this.running||t.ko||!f&&(!m||this.state.phase!=="battle"),g.disabled=t.dizzyTime>0||t.knockUp>0,g.querySelector("span").textContent=f?"ΕΞΟΔΟΣ":"ΧΡΗΣΗ",g.setAttribute("aria-label",f?"Έξοδος από τον καταπέλτη":"Χρήση κοντινού καταπέλτη"),g.classList.toggle("ready",!!f),this.$("catapult-status").hidden=!f||!this.running||this.layoutEditing,this.$("catapult-status").textContent=f?f.cooldown>0?`ΦΟΡΤΩΝΕΙ ΠΕΤΡΑ · ${f.cooldown.toFixed(1)}″`:this.touch?"ΣΗΜΑΔΕΨΕ · ΠΑΤΑ ΠΕΤΡΑ":"ΠΕΤΡΑ ΕΤΟΙΜΗ · ΑΡΙΣΤΕΡΟ ΚΛΙΚ":"",this.$("aim-stick").classList.toggle("catapult",!!f),this.ui.querySelector(".aim-zone .stick-caption").textContent=f?"ΚΑΤΕΥΘΥΝΣΗ · ΙΣΧΥΣ":"ΣΤΟΧΕΥΣΗ",this.ui.querySelector(".move-zone").classList.toggle("mounted",!!f),this.$("fire-button").disabled=!this.layoutEditing&&(t.ko||t.dizzyTime>0||t.knockUp>0),this.$("fire-button").querySelector("span").textContent=f?"ΠΕΤΡΑ":"ΠΥΡ",this.$("fire-button").classList.toggle("firing",this.actions.fire),this.$("fire-button").classList.toggle("empty",f?f.cooldown>0:t.ammo===0),this.$("ammo-count").textContent=`${t.ammo} / ${At.capacity}`,this.$("ammo-percent").textContent=e+"%",this.$("ammo-fill").style.transform=`scaleX(${e/100})`,this.$("ammo-track").setAttribute("aria-valuenow",String(e)),this.$("ammo-state").textContent=t.ko?"Επιστρέφεις στην αποθήκη":t.ammo===At.capacity?"ΓΕΜΑΤΟΣ!":a?"ΑΠΟΘΗΚΗ ∞ · ΓΕΜΙΖΕΙ…":t.tongue>0?"ΜΑΖΕΥΕΙ ΜΥΓΕΣ…":t.ammo===0?"Γύρνα στην αποθήκη ή βρες σμήνος":"Μύγες για τις επόμενες βολές",this.$("ko-count").textContent=`${r} / 3`;for(const T of this.$("base-dots").children){const A=this.state.bases.find(E=>E.owner===T.dataset.owner);T.classList.toggle("destroyed",!!A?.destroyed),T.classList.toggle("attacked",!!A?.attackerId),T.title=(T.dataset.owner==="player"?"Η αποθήκη σου":T.dataset.owner==="rival-1"?"Κόκκινη αποθήκη":"Μωβ αποθήκη")+(A?.destroyed?" · κατεστραμμένη":A?.attackerId?" · υπό επίθεση":" · άθικτη")}this.$("round-status").hidden=!this.running||!this.layoutEditing&&!t.ko&&this.state.phase==="battle",this.$("round-status").classList.toggle("warmup",this.state.phase!=="battle"),this.$("round-time").textContent=this.layoutEditing?"↔":t.ko?`${Math.ceil(t.respawnTime||0)}″`:this.state.phase!=="battle"?`${Math.ceil(this.state.intro)}″`:`${r}`,this.$("round-copy").textContent=this.layoutEditing?this.touch?"ΡΥΘΜΙΣΗ ΘΕΣΕΩΝ":"ΡΥΘΜΙΣΗ ΘΕΣΕΩΝ · Το παιχνίδι περιμένει":t.ko?this.touch?"ΕΠΙΣΤΡΟΦΗ":"ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΒΑΣΗ":this.state.phase!=="battle"?this.touch?"ΠΡΟΕΤΟΙΜΑΣΙΑ":"ΠΡΟΕΤΟΙΜΑΣΙΑ · Προστάτεψε την αποθήκη σου":"";const x=!!s?.attackerId&&!s.destroyed,p=this.running&&!this.layoutEditing&&x;this.ui.classList.toggle("storage-threat",p),this.$("base-status").hidden=!this.running||this.layoutEditing||!x&&!l,this.$("base-status").classList.toggle("threat",x);const v=x?"ΕΠΙΘΕΣΗ ΣΤΗΝ ΑΠΟΘΗΚΗ ΣΟΥ":l?"ΚΡΥΜΜΕΝΟΣ ΣΤΑ ΔΕΝΤΡΑ":"";this.$("base-warning-title").textContent!==v&&(this.$("base-warning-title").textContent=v),this.$("base-warning-detail").textContent=x?`${Math.max(0,At.sabotageSeconds-s.progress).toFixed(1)}″ μέχρι καταστροφή · Χτύπησέ τον!`:l?"Πιο αργά άλματα":"";const y=!t.ko&&!!n&&this.state.phase==="battle"&&!t.catapultId&&t.dizzyTime<=0&&t.knockUp<=0&&t.kick<=0&&(t.kickCooldown||0)<=0;this.$("kick-button").hidden=!this.running||t.ko||this.state.phase!=="battle"||!!t.catapultId||!n&&t.kick<=0,this.$("kick-button").disabled=!y,this.$("kick-button").classList.toggle("ready",y),this.$("pc-kick").classList.toggle("ready",y),this.$("dizzy-banner").hidden=t.dizzyTime<=0,this.$("dizzy-time").textContent=t.dizzyTime.toFixed(1)+"″",this.$("aim-stick").classList.toggle("empty",f?f.cooldown>0:t.ammo===0),this.calloutUntil<this.elapsed&&(this.$("callout").textContent="");const _=["round-status","base-status","catapult-button","catapult-status","kick-button","sabotage-button","sabotage-status"].map(T=>this.$(T).hidden?0:1).join("");this.touch&&!this.layoutEditing&&this.running&&_!==this.contextLayout&&(this.contextLayout=_,this.touchLayout?.refresh())}renderActors(t){this.state.actors.forEach((l,c)=>{const h=this.models[c];if(h.group.visible=!l.eliminated,l.eliminated)return;const u=this.ground(l.x,l.z);let d=l.x,f=l.z,m=u+l.height+(l.catapultId?.45:0);const g=this.koTimes.get(l.id),x=g?this.elapsed-g.time:99;x<.65&&(d+=g.dx*x*5,f+=g.dz*x*5,m+=Math.sin(x/.65*Math.PI)*2.5),h.group.position.set(d,m,f);const p=l.aiming||l.shot>.02||l.kick>0,v=p?Math.hypot(l.aimX,l.aimZ)>.001?Math.atan2(l.aimX,l.aimZ):h.group.rotation.y:l.face;let y=Math.atan2(Math.sin(v-h.group.rotation.y),Math.cos(v-h.group.rotation.y));h.group.rotation.y+=y*(1-Math.exp(-t*22)),h.update(t,{time:this.elapsed,speed:Math.hypot(l.hopX,l.hopZ),building:!!l.sabotageId,hop:l.knockUp>0?{phase:"air",progress:1-l.knockUp/l.knockUpDuration}:l.hop>0?{phase:"air",progress:1-l.hop/At.hopDuration}:l.idle>0?{phase:"land",progress:1-l.idle/At.landingDuration}:{phase:"idle",progress:0},dead:l.ko,attack:l.kick>0?{type:"kick",phase:1-l.kick/(At.kickDuration||.48)}:l.tongue>0||l.shot>0?{type:"tongue",phase:l.tongue>0?1-l.tongue/.22:1-l.shot/At.shotInterval}:null});const _=l.load,T=l.shot>0?Math.sin((1-l.shot/At.shotInterval)*Math.PI):0;if(V_(h,{load:_,spit:T}),p&&!l.ko&&!l.catapultId){const A=va(Math.atan2(l.aimY||0,Math.hypot(l.aimX,l.aimZ)),-.5,1.1);h.bones.head.rotation.x-=A*.7,h.bones.spine.rotation.x-=A*.12}if(l.hop>0){const A=Math.atan2(l.hopX,l.hopZ)-h.group.rotation.y,E=Math.min(1,Math.hypot(l.hopX,l.hopZ)/8.8)*Math.sin((1-l.hop/At.hopDuration)*Math.PI);h.bones.spine.rotation.z-=Math.sin(A)*E*.1;for(const R of[-1,1])h.bones[`hip${R}`].rotation.z-=Math.sin(A)*E*.14}if(l.dizzyTime>0?(h.group.rotation.z=Math.sin(this.elapsed*7)*.17,h.bones.head.rotation.z+=Math.sin(this.elapsed*9)*.2):h.group.rotation.z=x<.65?x*6:0,h.group.rotation.x=0,l.knockUp>0){const A=1-l.knockUp/l.knockUpDuration,E=Math.sin(A*Math.PI)*.38,R=Math.atan2(l.impulseX,l.impulseZ)-h.group.rotation.y;h.group.rotation.x=Math.cos(R)*E,h.group.rotation.z-=Math.sin(R)*E}c===0&&this.viewMode==="chase3d"&&!l.ko&&Math.hypot(this.camera.position.x-d,this.camera.position.z-f)<1.35&&this.camera.position.y<m+1.3&&(h.group.visible=!1)});const e=this.state.actors[0];this.playerRing.position.set(e.x,this.ground(e.x,e.z)+.07,e.z),this.playerRing.scale.setScalar(1);const n=E_(this.state,e),s=this.aimGuide.geometry.attributes.position,r=n.origin||Zc(this.state,e);s.setXYZ(0,r.x,r.y,r.z),s.setXYZ(1,n.x,n.y,n.z),s.needsUpdate=!0,this.aimGuide.computeLineDistances(),this.aimGuide.geometry.computeBoundingSphere();const o=this.running&&!this.layoutEditing&&!e.catapultId&&!e.ko&&e.dizzyTime<=0&&(e.aiming||e.shot>0);this.renderer.domElement.classList.toggle("mouse-aiming",o&&(this.pointerLocked()||this.viewMode==="overview"&&this.mouse.valid)),this.currentAimPreview=o?n:null,this.aimGuide.visible=o,this.aimGuide.material.color.set(n.targetId?"#ffc09b":n.blocked?"#b9c0b5":"#f4f7d5"),this.aimReticle.visible=o,this.aimReticle.position.set(n.x,n.y,n.z),this.aimReticle.quaternion.copy(this.camera.quaternion),this.aimReticle.scale.setScalar(.5),this.aimReticle.material.color.copy(this.aimGuide.material.color);const a=this.state.actors.find(l=>l.id===n.targetId);this.targetRing.visible=o&&!!a,a&&(this.targetRing.position.set(a.x,this.ground(a.x,a.z)+.1,a.z),this.targetRing.scale.setScalar(1+a.load*.2))}renderFlies(){this.state.flies.forEach((e,n)=>{const s=this.dummy,r=e.wait<=0,o=this.ground(e.x,e.z)+1.05+Math.sin(this.elapsed*5+e.phase)*.12,a=e.x+Math.sin(this.elapsed*3+e.phase)*.12;s.position.set(a,r?o:-100,e.z),s.scale.set(r?.105:0,r?.08:0,r?.14:0),s.rotation.set(0,e.phase,0),s.updateMatrix(),this.flyBodies.setMatrixAt(n,s.matrix);for(let l=0;l<2;l++)s.position.set(a+(l===0?-.1:.1),r?o+.045:-100,e.z),s.scale.set(r?.17:0,r?.015:0,r?.08:0),s.rotation.set(0,e.phase,Math.sin(this.elapsed*55+e.phase)*(l===0?1:-1)*.5),s.updateMatrix(),this.flyWings.setMatrixAt(n*2+l,s.matrix)}),this.flyBodies.instanceMatrix.needsUpdate=!0,this.flyWings.instanceMatrix.needsUpdate=!0,Cr.forEach((e,n)=>{const s=this.state.flies.filter(o=>o.swarmId===e.id&&o.wait<=0).length,r=this.swarmRings[n];r.material.opacity=s?.2:.09,r.material.color.set(s?"#c8e0a3":"#6f8c83")});const t=new Set;for(const e of this.state.bullets){t.add(e.id);let n=this.bulletMeshes.get(e.id);n||(n=this.makeFlyBullet(),this.bulletMeshes.set(e.id,n)),n.position.set(e.x,Number.isFinite(e.y)?e.y:this.ground(e.x,e.z)+.9,e.z),n.quaternion.setFromUnitVectors(new en(0,0,1),new en(e.dx,e.dy||0,e.dz).normalize()),n.children[1].rotation.z=Math.sin(this.elapsed*75),n.children[2].rotation.z=-Math.sin(this.elapsed*75)}for(const[e,n]of this.bulletMeshes)t.has(e)||(n.removeFromParent(),this.bulletMeshes.delete(e));for(const[e,n]of this.tongues){n.mesh.visible=e!=="player"||this.models[0].group.visible;const s=(this.elapsed-n.start)/.22;if(s>=1){n.mesh.removeFromParent(),this.tongues.delete(e);continue}const r=this.state.actors.findIndex(u=>u.id===e),o=this.models[r],a=o.mouthWorld(),l=new en(n.x,this.ground(n.x,n.z)+1,n.z),c=Math.sin(s*Math.PI);l.lerpVectors(a,l,c);const h=l.clone().sub(a);n.mesh.position.copy(a).addScaledVector(h,.5),n.mesh.quaternion.setFromUnitVectors(tc,h.clone().normalize()),n.mesh.scale.set(.07,Math.max(.001,h.length()),.07)}}project(t,e,n){const s=new en(t,e,n).project(this.camera);return{x:(s.x+1)*this.w/2,y:(1-s.y)*this.h/2,visible:s.z>-1&&s.z<1}}drawLabels(){const t=this.labelCtx;if(t.clearRect(0,0,this.w,this.h),t.textAlign="center",t.lineJoin="round",t.font="800 18px sans-serif",this.running&&(w_(this,t),S_(this,this.$("minimap"))),this.currentAimScreen=null,this.currentAimPreview){const e=this.currentAimPreview,n=this.mouse.valid?{x:this.mouse.x,y:this.mouse.y,visible:!0}:this.project(e.x,e.y,e.z);if(this.currentAimScreen={x:n.x,y:n.y},n.visible&&n.x>4&&n.x<this.w-4&&n.y>4&&n.y<this.h-4){t.save(),t.lineWidth=4,t.strokeStyle="#173c35",t.beginPath(),t.arc(n.x,n.y,7,0,Math.PI*2),t.stroke(),t.lineWidth=2,t.strokeStyle=e.targetId?"#ffc5a0":"#f4ffdd",t.beginPath(),t.arc(n.x,n.y,7,0,Math.PI*2);for(const[s,r]of[[1,0],[-1,0],[0,1],[0,-1]])t.moveTo(n.x+s*10,n.y+r*10),t.lineTo(n.x+s*16,n.y+r*16);t.stroke(),t.restore()}}if(this.hitConfirmUntil>this.elapsed&&this.lastPlayerHit){const e=this.lastPlayerHit,n=this.state.actors.find(r=>r.id===e.id),s=this.project(e.x,Number.isFinite(e.y)?e.y:this.ground(e.x,e.z)+(n?.height||0)+1.2,e.z);if(s.visible){t.save(),t.strokeStyle="#143d35",t.lineWidth=6,t.beginPath();for(const[r,o]of[[1,1],[-1,1],[1,-1],[-1,-1]])t.moveTo(s.x+r*6,s.y+o*6),t.lineTo(s.x+r*15,s.y+o*15);t.stroke(),t.strokeStyle="#fffce2",t.lineWidth=3,t.stroke(),t.restore()}}if(this.state.actors.forEach((e,n)=>{if(e.eliminated)return;const s=this.project(e.x,this.ground(e.x,e.z)+e.height+2.4,e.z);if(!s.visible)return;if(!(s.x>20&&s.x<this.w-20&&s.y>70&&s.y<this.h-40)&&n>0&&!e.ko&&this.running){const o=va(s.x,24,this.w-24),a=va(s.y,110,this.h-(this.touch?210:90));t.font="bold 24px sans-serif",t.fillStyle=n===1?"#ffbb8e":"#dfb5ff",t.fillText("▼",o,a);return}if(e.ko){t.font="900 20px sans-serif",t.strokeStyle="#1e2e28",t.lineWidth=5;const o=`KO · ${Math.ceil(e.respawnTime||0)}″`;t.strokeText(o,s.x,s.y),t.fillStyle="#ffe374",t.fillText(o,s.x,s.y);return}if(e.dizzyTime>0){for(let o=0;o<3;o++){const a=this.elapsed*4+o*2.094;t.font="bold 25px sans-serif",t.fillStyle="#ffdf57",t.strokeStyle="#725c21",t.lineWidth=3;const l=s.x+Math.cos(a)*27,c=s.y+Math.sin(a)*7;t.strokeText("★",l,c),t.fillText("★",l,c)}t.font="bold 15px sans-serif",t.fillStyle="#fff4ad",t.fillText(e.dizzyTime.toFixed(1)+"″",s.x,s.y+24);for(let o=0;o<At.finishHits;o++)t.beginPath(),t.arc(s.x+(o-(At.finishHits-1)/2)*11,s.y+36,4,0,Math.PI*2),t.fillStyle=o<e.finishHits?"#ffb58e":"#244438",t.fill(),t.strokeStyle="#ffe6ac",t.lineWidth=1.5,t.stroke()}else if(n>0){e.aimWindup>0&&(t.font="900 22px sans-serif",t.fillStyle="#ffddaa",t.fillText("!",s.x,s.y-40));const o=n===1?"ΚΟΚΚΙΝΟΣ":"ΜΩΒ",a=n===1?"#ff886a":"#dba1ff";t.fillStyle="#112b27dd",t.strokeStyle=a,t.lineWidth=3,t.beginPath(),t.roundRect?t.roundRect(s.x-52,s.y-28,104,24,10):t.rect(s.x-52,s.y-28,104,24),t.fill(),t.stroke(),t.font="bold 15px sans-serif",t.fillStyle=a,t.fillText(o,s.x,s.y-11);for(let l=0;l<6;l++)t.beginPath(),t.arc(s.x+(l-2.5)*9,s.y+6,3.8,0,Math.PI*2),t.fillStyle=l<e.dizzy?"#ffe16a":"#214036bb",t.fill()}}),this.running){const e=this.state.actors[0];for(const n of this.state.bases){const s=Wn.find(l=>l.id===n.id),r=Math.hypot(e.x-s.stock.x,e.z-s.stock.z)<10;if(n.destroyed||!r&&!n.attackerId)continue;const o=this.project(s.stock.x,this.ground(s.stock.x,s.stock.z)+3.5,s.stock.z);if(!o.visible||o.x<70||o.x>this.w-70||o.y<95||o.y>this.h-(this.touch?220:85))continue;const a=n.attackerId?`ΚΑΤΑΣΤΡΟΦΗ · ${Math.max(0,At.sabotageSeconds-n.progress).toFixed(1)}″`:n.owner==="player"?"Η ΑΠΟΘΗΚΗ ΣΟΥ · ∞":"ΕΧΘΡΙΚΗ ΑΠΟΘΗΚΗ";t.font="800 12px sans-serif",t.strokeStyle="#14342df2",t.lineWidth=5,t.strokeText(a,o.x,o.y),t.fillStyle=n.attackerId?"#ffd197":n.owner==="player"?"#dbff9d":"#ffbdad",t.fillText(a,o.x,o.y)}}this.fx=this.fx.filter(e=>this.elapsed-e.start<e.life);for(const e of this.fx){const n=(this.elapsed-e.start)/e.life,s=this.project(e.x,this.ground(e.x,e.z)+2+n*2,e.z);t.globalAlpha=1-n,t.font=`900 ${e.text==="ΝΟΚ ΑΟΥΤ!"?32:22}px sans-serif`,t.strokeStyle="#244136",t.lineWidth=6,t.strokeText(e.text,s.x,s.y),t.fillStyle=e.color,t.fillText(e.text,s.x,s.y)}t.globalAlpha=1}updateCameraPose(t){const e=this.state.actors[0],n=vf(e,this.ground(e.x,e.z),this.w/this.h,this.viewMode,{yaw:this.cameraYaw,pitch:this.cameraPitch,zoom:this.settings.cameraZoom}),s=new en(...n.look),r=new en(...n.position);this.cameraReady?this.focus.lerp(s,1-Math.exp(-t*8)):(this.focus.copy(s),this.cameraReady=!0),this.cameraTarget.copy(this.focus).add(r.sub(s));const o=M_({look:this.focus.toArray(),position:this.cameraTarget.toArray()},(l,c)=>this.cameraGround(l,c));this.focus.fromArray(o.look),this.cameraTarget.fromArray(o.position);const a=this.running?this.shake:0;this.camera.position.copy(this.cameraTarget),this.camera.position.x+=(Math.random()-.5)*a,this.camera.lookAt(this.focus),this.camera.updateMatrixWorld()}frame(t){const e=Math.min(.05,Math.max(0,(t-this.last)/1e3));this.last=t;const n=this.state.actors[0],s=this.running&&!this.layoutEditing;if(s&&this.viewMode==="chase3d"&&this.pointers.has("aim")&&this.aimStrength>.08){const r=(this.aimStrength-.08)/.92,o=pd({yaw:this.cameraYaw,pitch:this.cameraPitch},this.stickAim.x*r*e,this.stickAim.z*r*e,{sensitivity:2.2*this.settings.cameraSensitivity});this.cameraYaw=o.yaw,this.cameraPitch=o.pitch}if(this.shake*=Math.exp(-e*15),this.updateCameraPose(e),s){for(this.elapsed+=e,this.accumulator+=e;this.accumulator>=1/60;)if(dd(this.state,this.currentInput(),1/60),this.consumeEvents(),this.accumulator-=1/60,this.state.status!=="playing"){this.finish();break}this.saveClock+=e,this.saveClock>3&&(this.saveClock=0,this.persist())}else(this.mode==="result"||this.mode==="finishing")&&(this.elapsed+=e);if(this.mode==="finishing"&&this.elapsed>=this.resultAt&&this.showResult(),this.cameraReady||this.updateCameraPose(0),this.running||this.mode==="title"||this.mode==="result"||this.mode==="finishing"){const r=this.mode==="title"||this.layoutEditing?0:e;this.renderActors(r),this.renderFlies(),this.updateCatapultAim?.(),this.artilleryView.update(r),this.basesView.update(r),this.impactEffects.update(r),this.world.update(this.running&&!this.layoutEditing?e:0,this.elapsed,1,new en(n.x,this.ground(n.x,n.z),n.z))}(this.running&&!this.layoutEditing||this.mode==="finishing"||this.mode==="result")&&(this.particles=this.particles.filter(r=>this.elapsed-r.start>.55?(r.mesh.removeFromParent(),!1):(r.v.y-=e*16,r.mesh.position.addScaledVector(r.v,e),!0))),this.renderer.render(this.scene,this.camera),this.drawLabels(),this.updateHUD()}inspect(){return{version:Wl,viewMode:this.viewMode,cameraControl:"direct-look",pointerLocked:this.pointerLocked(),cameraSensitivity:this.settings.cameraSensitivity,mouse:{x:this.mouse.x,y:this.mouse.y,valid:this.mouse.valid},aim:{...this.aim},aimScreen:this.currentAimScreen,cameraYaw:this.cameraYaw,cameraPitch:this.cameraPitch,cameraDragging:!!this.cameraDrag,phase:this.state.phase,intro:this.state.intro,mode:this.mode,status:this.state.status,ammo:this.state.actors[0].ammo,fillPercent:Math.round(this.state.actors[0].ammo/At.capacity*100),actors:this.state.actors.map(t=>({id:t.id,x:t.x,z:t.z,ammo:t.ammo,dizzy:t.dizzy,dizzyTime:t.dizzyTime,ko:t.ko,eliminated:t.eliminated,respawnTime:t.respawnTime,sabotageId:t.sabotageId,aiming:t.aiming,aimX:t.aimX,aimY:t.aimY,aimZ:t.aimZ,face:t.face,hop:t.hop,hopX:t.hopX,hopZ:t.hopZ,height:t.height,knockUp:t.knockUp,finishHits:t.finishHits,kickCooldown:t.kickCooldown,catapultId:t.catapultId})),bases:this.state.bases.map(t=>({...t})),layoutEditing:this.layoutEditing,touch:this.touch,catapults:this.state.catapults?.map(t=>({id:t.id,occupant:t.occupant,cooldown:t.cooldown})),shells:this.state.shells?.length,hitConfirmUntil:this.hitConfirmUntil,bullets:this.state.bullets.length,splats:this.splats.length,legacySavePreserved:!0}}}function eM(i){const t={fire:!1,kick:!1},e=r=>{i.running&&!i.layoutEditing&&(t[r]=!0)},n=i.currentInput.bind(i),s=i.clearInputs.bind(i);i.currentInput=()=>{const r=n();for(const o of Object.keys(t))i.layoutEditing||(r[o]||=t[o]),t[o]=!1;return i.layoutEditing||(r.aiming||=r.fire),r},i.clearInputs=()=>{for(const r of Object.keys(t))t[r]=!1;s()},addEventListener("keydown",r=>{r.repeat||r.target.matches("input,select")||r.code==="KeyQ"&&e("kick")},!0),addEventListener("pointerdown",r=>{r.target.closest?.("#kick-button")&&!i.$("kick-button").disabled?e("kick"):(r.target===i.renderer.domElement&&r.pointerType==="mouse"&&r.button===0&&(i.viewMode!=="chase3d"||i.pointerLocked?.())||r.target.closest?.("#fire-button")&&!i.$("fire-button").disabled)&&e("fire")},!0),addEventListener("pointercancel",()=>{for(const r of Object.keys(t))t[r]=!1},!0)}function nM(i,t=()=>performance.now()){const e=i.$("view-button");let n=-1/0;e.onpointerdown=s=>{s.pointerType!=="touch"||!i.running||(s.preventDefault(),n=t(),i.toggleView(s))},e.onclick=s=>{i.running&&(s.detail===0||t()-n>600)&&i.toggleView(s)}}function iM(i){i.catapultAim={active:!1,target:null};let t=!1,e=!1;const n=()=>!!i.state.actors[0].catapultId;i.updateCatapultAim=()=>{if(!n()){i.catapultAim={active:!1,target:null};return}const l=i.state.actors[0];if(i.mouse.valid&&i.mouse.target){const u=i.mouse.target.x-l.x,d=i.mouse.target.z-l.z,f=Math.hypot(u,d);f>.01&&(i.aim={x:u/f,z:d/f,distance:f})}const c=i.aim||{x:l.aimX,z:l.aimZ},h=i.touch&&!i.mouse.valid?Math.max(0,Math.min(1,(i.aimStrength-.08)/.92)):Math.max(0,Math.min(1,((c.distance||17)-Pe.minRange)/(Pe.maxRange-Pe.minRange)));i.catapultAim={active:!0,target:H1(l,c.x,c.z,h)}};const s=i.currentInput.bind(i),r=i.clearInputs.bind(i);i.currentInput=()=>{const l=s();if(i.layoutEditing)return t=!1,e=!1,{};const c=l.fire&&!e;return e=!!l.fire,n()&&(i.updateCatapultAim(),l.fire=!1,l.aiming=!0,l.ax=i.aim.x,l.az=i.aim.z,l.ay=void 0,l.sabotage=!1,c&&i.catapultAim.target?.valid!==!1&&(l.throwStone={...i.catapultAim.target})),t&&(l.interactCatapult=!0,t=!1),l},i.clearInputs=()=>{t=!1,e=!1,i.catapultAim={active:!1,target:null},r()};const o=i.$("catapult-button");o.onpointerdown=l=>{!i.running||i.layoutEditing||o.disabled||!n()&&i.state.phase!=="battle"||(l.preventDefault(),t=!0)},o.onclick=l=>{l.detail===0&&i.running&&!i.layoutEditing&&!o.disabled&&(t=!0)},addEventListener("keydown",l=>{l.code!=="KeyE"||l.repeat||l.target.matches("input,select")||!i.running||i.layoutEditing||!n()&&i.state.phase!=="battle"||!n()&&Xa(i.state,i.state.actors[0])||(l.preventDefault(),t=!0)});const a=i.$("aim-stick");a.addEventListener("pointerdown",()=>{n()&&i.updateCatapultAim()}),a.addEventListener("pointermove",()=>{n()&&i.pointers.has("aim")&&i.updateCatapultAim()})}const sM='input,select,textarea,[contenteditable]:not([contenteditable="false"])',rM=new Set(["+","=","-","_","0"]),oM=new Set(["Equal","Minus","Digit0","NumpadAdd","NumpadSubtract","Numpad0"]);function aM({document:i=globalThis.document,surfaces:t,enabled:e=()=>!0}={}){const n=t??[...i.querySelectorAll("#arcade-world,#arcade-labels,#arcade-ui")],s=[],r=new Set;let o=!1;const a=p=>(p?.nodeType===3?p.parentElement:p)?.closest?.(sM),l=p=>!!p?.nodeType&&!a(p)&&n.some(v=>v&&(v===p||v.contains?.(p))),c=p=>{const v=p.composedPath?.()||[];return v.length?v:[p.target]},h=p=>{const v=c(p);return!v.some(a)&&v.some(l)},u=p=>{p.cancelable&&p.preventDefault()},d=(p,v,y=!1)=>{const _={capture:!0,passive:y};i.addEventListener(p,v,_),s.push([p,v,_])},f=()=>{r.clear(),o=!1},m=()=>e()?!0:(f(),!1),g=p=>r.size>0||h(p)||Array.from(p.touches||[]).some(v=>l(v.target));d("touchstart",p=>{if(m()){for(const v of p.changedTouches||[])l(v.target)&&r.add(v.identifier);p.touches?.length>1&&g(p)&&u(p)}}),d("touchmove",p=>{m()&&g(p)&&u(p)});const x=p=>{for(const v of p.changedTouches||[])r.delete(v.identifier);p.touches?.length||r.clear()};d("touchend",x,!0),d("touchcancel",x,!0);for(const p of["gesturestart","gesturechange","gestureend"])d(p,v=>{m()&&(p==="gesturestart"&&(o=g(v)),(o||g(v))&&u(v),p==="gestureend"&&(o=!1))});for(const p of["wheel","dblclick","selectstart","contextmenu","dragstart"])d(p,v=>{m()&&h(v)&&u(v)});return d("keydown",p=>{if(!m()||!(p.ctrlKey||p.metaKey)||p.altKey||!rM.has(p.key)&&!oM.has(p.code)||c(p).some(a))return;const v=[i,i.body,i.documentElement].includes(p.target);(h(p)||n.length&&v)&&u(p)}),d("visibilitychange",()=>{i.hidden&&f()},!0),()=>{for(const[p,v,y]of s)i.removeEventListener(p,v,y);s.length=0,f()}}function Ph(i){console.error(i);let t=document.getElementById("boot");if(!t){t=document.createElement("div"),t.id="boot";const n=document.createElement("div");n.id="boot-error",t.append(n),document.body.append(t)}t.classList.add("has-error");const e=document.getElementById("boot-error");e.textContent=`Δεν μπόρεσε να ξεκινήσει ο 3D κόσμος. Ενεργοποίησε την επιτάχυνση γραφικών στον browser και κάνε ανανέωση.
`+(i?.message||String(i))}addEventListener("error",i=>Ph(i.error||i.message));addEventListener("unhandledrejection",i=>Ph(i.reason));requestAnimationFrame(()=>{try{const i=window.frogArcade=new tM;eM(i),nM(i),iM(i),aM({surfaces:[i.renderer.domElement,i.labels,i.ui]})}catch(i){Ph(i)}});
