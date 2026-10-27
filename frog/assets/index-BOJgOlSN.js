(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const nh="180",jf=0,Xh=1,Kf=2,Ad=1,Jf=2,Di=3,Hi=0,In=1,Ce=2,ls=0,Mr=1,qh=2,$h=3,Yh=4,Qf=5,Rs=100,tp=101,ep=102,np=103,ip=104,sp=200,rp=201,op=202,ap=203,oc=204,ac=205,lp=206,cp=207,hp=208,up=209,dp=210,fp=211,pp=212,mp=213,gp=214,lc=0,cc=1,hc=2,Er=3,uc=4,dc=5,fc=6,pc=7,Rd=0,xp=1,vp=2,cs=0,yp=1,Mp=2,_p=3,Cd=4,bp=5,Sp=6,wp=7,Zh="attached",Ep="detached",Pd=300,Tr=301,Ar=302,mc=303,gc=304,Na=306,Rr=1e3,rs=1001,xc=1002,Vn=1003,Tp=1004,Io=1005,ri=1006,tl=1007,os=1008,vi=1009,zd=1010,Id=1011,co=1012,ih=1013,Is=1014,oi=1015,_o=1016,sh=1017,rh=1018,ho=1020,Dd=35902,Ld=35899,Ud=1021,kd=1022,Gn=1023,uo=1026,fo=1027,oh=1028,ah=1029,Nd=1030,lh=1031,ch=1033,ba=33776,Sa=33777,wa=33778,Ea=33779,vc=35840,yc=35841,Mc=35842,_c=35843,bc=36196,Sc=37492,wc=37496,Ec=37808,Tc=37809,Ac=37810,Rc=37811,Cc=37812,Pc=37813,zc=37814,Ic=37815,Dc=37816,Lc=37817,Uc=37818,kc=37819,Nc=37820,Fc=37821,Oc=36492,Bc=36494,Hc=36495,Gc=36283,Vc=36284,Wc=36285,Xc=36286,Ap=3200,Rp=3201,hh=0,Cp=1,Li="",Un="srgb",Cr="srgb-linear",Ra="linear",Ge="srgb",Xs=7680,jh=519,Pp=512,zp=513,Ip=514,Fd=515,Dp=516,Lp=517,Up=518,kp=519,Kh=35044,Ui=35048,Jh="300 es",gi=2e3,Ca=2001;class Ir{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Qh=1234567;const no=Math.PI/180,po=180/Math.PI;function Ls(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bn[i&255]+bn[i>>8&255]+bn[i>>16&255]+bn[i>>24&255]+"-"+bn[t&255]+bn[t>>8&255]+"-"+bn[t>>16&15|64]+bn[t>>24&255]+"-"+bn[e&63|128]+bn[e>>8&255]+"-"+bn[e>>16&255]+bn[e>>24&255]+bn[n&255]+bn[n>>8&255]+bn[n>>16&255]+bn[n>>24&255]).toLowerCase()}function be(i,t,e){return Math.max(t,Math.min(e,i))}function uh(i,t){return(i%t+t)%t}function Np(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Fp(i,t,e){return i!==t?(e-i)/(t-i):0}function io(i,t,e){return(1-e)*i+e*t}function Op(i,t,e,n){return io(i,t,1-Math.exp(-e*n))}function Bp(i,t=1){return t-Math.abs(uh(i,t*2)-t)}function Hp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Gp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Vp(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Wp(i,t){return i+Math.random()*(t-i)}function Xp(i){return i*(.5-Math.random())}function qp(i){i!==void 0&&(Qh=i);let t=Qh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function $p(i){return i*no}function Yp(i){return i*po}function Zp(i){return(i&i-1)===0&&i!==0}function jp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Kp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Jp(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*m,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*m,a*c);break;case"ZYZ":i.set(l*m,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function fr(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function An(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const qc={DEG2RAD:no,RAD2DEG:po,generateUUID:Ls,clamp:be,euclideanModulo:uh,mapLinear:Np,inverseLerp:Fp,lerp:io,damp:Op,pingpong:Bp,smoothstep:Hp,smootherstep:Gp,randInt:Vp,randFloat:Wp,randFloatSpread:Xp,seededRandom:qp,degToRad:$p,radToDeg:Yp,isPowerOfTwo:Zp,ceilPowerOfTwo:jp,floorPowerOfTwo:Kp,setQuaternionFromProperEuler:Jp,normalize:An,denormalize:fr};class Wt{constructor(t=0,e=0){Wt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=be(this.x,t.x,e.x),this.y=be(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=be(this.x,t,e),this.y=be(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(be(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class hs{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],m=r[o+2],p=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=p;return}if(u!==p||l!==d||c!==f||h!==m){let x=1-a;const g=l*d+c*f+h*m+u*p,M=g>=0?1:-1,y=1-g*g;if(y>Number.EPSILON){const E=Math.sqrt(y),T=Math.atan2(E,g*M);x=Math.sin(x*T)/E,a=Math.sin(a*T)/E}const v=a*M;if(l=l*x+d*v,c=c*x+f*v,h=h*x+m*v,u=u*x+p*v,x===1-a){const E=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=E,c*=E,h*=E,u*=E}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+h*u+l*f-c*d,t[e+1]=l*m+h*d+c*u-a*f,t[e+2]=c*m+h*f+a*d-l*u,t[e+3]=h*m-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(be(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(tu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(tu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=be(this.x,t.x,e.x),this.y=be(this.y,t.y,e.y),this.z=be(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=be(this.x,t,e),this.y=be(this.y,t,e),this.z=be(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(be(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return el.copy(this).projectOnVector(t),this.sub(el)}reflect(t){return this.sub(el.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const el=new L,tu=new hs;class ve{constructor(t,e,n,s,r,o,a,l,c){ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],p=s[0],x=s[3],g=s[6],M=s[1],y=s[4],v=s[7],E=s[2],T=s[5],w=s[8];return r[0]=o*p+a*M+l*E,r[3]=o*x+a*y+l*T,r[6]=o*g+a*v+l*w,r[1]=c*p+h*M+u*E,r[4]=c*x+h*y+u*T,r[7]=c*g+h*v+u*w,r[2]=d*p+f*M+m*E,r[5]=d*x+f*y+m*T,r[8]=d*g+f*v+m*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,m=e*u+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const p=1/m;return t[0]=u*p,t[1]=(s*c-h*n)*p,t[2]=(a*n-s*o)*p,t[3]=d*p,t[4]=(h*e-s*l)*p,t[5]=(s*r-a*e)*p,t[6]=f*p,t[7]=(n*l-c*e)*p,t[8]=(o*e-n*r)*p,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(nl.makeScale(t,e)),this}rotate(t){return this.premultiply(nl.makeRotation(-t)),this}translate(t,e){return this.premultiply(nl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const nl=new ve;function Od(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Pa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Qp(){const i=Pa("canvas");return i.style.display="block",i}const eu={};function mo(i){i in eu||(eu[i]=!0,console.warn(i))}function tm(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const nu=new ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),iu=new ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function em(){const i={enabled:!0,workingColorSpace:Cr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ge&&(s.r=Oi(s.r),s.g=Oi(s.g),s.b=Oi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ge&&(s.r=_r(s.r),s.g=_r(s.g),s.b=_r(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Li?Ra:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return mo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return mo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Cr]:{primaries:t,whitePoint:n,transfer:Ra,toXYZ:nu,fromXYZ:iu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Un},outputColorSpaceConfig:{drawingBufferColorSpace:Un}},[Un]:{primaries:t,whitePoint:n,transfer:Ge,toXYZ:nu,fromXYZ:iu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Un}}}),i}const ke=em();function Oi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function _r(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let qs;class nm{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{qs===void 0&&(qs=Pa("canvas")),qs.width=t.width,qs.height=t.height;const s=qs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=qs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Pa("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Oi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Oi(e[n]/255)*255):e[n]=Oi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let im=0;class dh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=Ls(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(il(s[o].image)):r.push(il(s[o]))}else r=il(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function il(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?nm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let sm=0;const sl=new L;class En extends Ir{constructor(t=En.DEFAULT_IMAGE,e=En.DEFAULT_MAPPING,n=rs,s=rs,r=ri,o=os,a=Gn,l=vi,c=En.DEFAULT_ANISOTROPY,h=Li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sm++}),this.uuid=Ls(),this.name="",this.source=new dh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Wt(0,0),this.repeat=new Wt(1,1),this.center=new Wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(sl).x}get height(){return this.source.getSize(sl).y}get depth(){return this.source.getSize(sl).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Pd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Rr:t.x=t.x-Math.floor(t.x);break;case rs:t.x=t.x<0?0:1;break;case xc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Rr:t.y=t.y-Math.floor(t.y);break;case rs:t.y=t.y<0?0:1;break;case xc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}En.DEFAULT_IMAGE=null;En.DEFAULT_MAPPING=Pd;En.DEFAULT_ANISOTROPY=1;class Le{constructor(t=0,e=0,n=0,s=1){Le.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],p=l[2],x=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-p)<.01&&Math.abs(m-x)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+p)<.1&&Math.abs(m+x)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,v=(f+1)/2,E=(g+1)/2,T=(h+d)/4,w=(u+p)/4,R=(m+x)/4;return y>v&&y>E?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=T/n,r=w/n):v>E?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=T/s,r=R/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=w/r,s=R/r),this.set(n,s,r,e),this}let M=Math.sqrt((x-m)*(x-m)+(u-p)*(u-p)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(x-m)/M,this.y=(u-p)/M,this.z=(d-h)/M,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=be(this.x,t.x,e.x),this.y=be(this.y,t.y,e.y),this.z=be(this.z,t.z,e.z),this.w=be(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=be(this.x,t,e),this.y=be(this.y,t,e),this.z=be(this.z,t,e),this.w=be(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(be(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class rm extends Ir{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ri,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Le(0,0,t,e),this.scissorTest=!1,this.viewport=new Le(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new En(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:ri,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new dh(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class us extends rm{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Bd extends En{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class om extends En{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Nn{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Qn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Qn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Qn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Qn):Qn.fromBufferAttribute(r,o),Qn.applyMatrix4(t.matrixWorld),this.expandByPoint(Qn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Do.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Do.copy(n.boundingBox)),Do.applyMatrix4(t.matrixWorld),this.union(Do)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Qn),Qn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Hr),Lo.subVectors(this.max,Hr),$s.subVectors(t.a,Hr),Ys.subVectors(t.b,Hr),Zs.subVectors(t.c,Hr),$i.subVectors(Ys,$s),Yi.subVectors(Zs,Ys),ys.subVectors($s,Zs);let e=[0,-$i.z,$i.y,0,-Yi.z,Yi.y,0,-ys.z,ys.y,$i.z,0,-$i.x,Yi.z,0,-Yi.x,ys.z,0,-ys.x,-$i.y,$i.x,0,-Yi.y,Yi.x,0,-ys.y,ys.x,0];return!rl(e,$s,Ys,Zs,Lo)||(e=[1,0,0,0,1,0,0,0,1],!rl(e,$s,Ys,Zs,Lo))?!1:(Uo.crossVectors($i,Yi),e=[Uo.x,Uo.y,Uo.z],rl(e,$s,Ys,Zs,Lo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ti),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ti=[new L,new L,new L,new L,new L,new L,new L,new L],Qn=new L,Do=new Nn,$s=new L,Ys=new L,Zs=new L,$i=new L,Yi=new L,ys=new L,Hr=new L,Lo=new L,Uo=new L,Ms=new L;function rl(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ms.fromArray(i,r);const a=s.x*Math.abs(Ms.x)+s.y*Math.abs(Ms.y)+s.z*Math.abs(Ms.z),l=t.dot(Ms),c=e.dot(Ms),h=n.dot(Ms);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const am=new Nn,Gr=new L,ol=new L;class Vi{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):am.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Gr.subVectors(t,this.center);const e=Gr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Gr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ol.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Gr.copy(t.center).add(ol)),this.expandByPoint(Gr.copy(t.center).sub(ol))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Ai=new L,al=new L,ko=new L,Zi=new L,ll=new L,No=new L,cl=new L;class ds{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ai)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ai.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ai.copy(this.origin).addScaledVector(this.direction,e),Ai.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){al.copy(t).add(e).multiplyScalar(.5),ko.copy(e).sub(t).normalize(),Zi.copy(this.origin).sub(al);const r=t.distanceTo(e)*.5,o=-this.direction.dot(ko),a=Zi.dot(this.direction),l=-Zi.dot(ko),c=Zi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,m;if(h>0)if(u=o*l-a,d=o*a-l,m=r*h,u>=0)if(d>=-m)if(d<=m){const p=1/h;u*=p,d*=p,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(al).addScaledVector(ko,d),f}intersectSphere(t,e){Ai.subVectors(t.center,this.origin);const n=Ai.dot(this.direction),s=Ai.dot(Ai)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Ai)!==null}intersectTriangle(t,e,n,s,r){ll.subVectors(e,t),No.subVectors(n,t),cl.crossVectors(ll,No);let o=this.direction.dot(cl),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Zi.subVectors(this.origin,t);const l=a*this.direction.dot(No.crossVectors(Zi,No));if(l<0)return null;const c=a*this.direction.dot(ll.cross(Zi));if(c<0||l+c>o)return null;const h=-a*Zi.dot(cl);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ue{constructor(t,e,n,s,r,o,a,l,c,h,u,d,f,m,p,x){ue.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,f,m,p,x)}set(t,e,n,s,r,o,a,l,c,h,u,d,f,m,p,x){const g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=m,g[11]=p,g[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ue().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/js.setFromMatrixColumn(t,0).length(),r=1/js.setFromMatrixColumn(t,1).length(),o=1/js.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,m=a*h,p=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+m*c,e[5]=d-p*c,e[9]=-a*l,e[2]=p-d*c,e[6]=m+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,m=c*h,p=c*u;e[0]=d+p*a,e[4]=m*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=p+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,m=c*h,p=c*u;e[0]=d-p*a,e[4]=-o*u,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=p-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,f=o*u,m=a*h,p=a*u;e[0]=l*h,e[4]=m*c-f,e[8]=d*c+p,e[1]=l*u,e[5]=p*c+d,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,m=a*l,p=a*c;e[0]=l*h,e[4]=p-d*u,e[8]=m*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+m,e[10]=d-p*u}else if(t.order==="XZY"){const d=o*l,f=o*c,m=a*l,p=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+p,e[5]=o*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=a*h,e[10]=p*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(lm,t,cm)}lookAt(t,e,n){const s=this.elements;return On.subVectors(t,e),On.lengthSq()===0&&(On.z=1),On.normalize(),ji.crossVectors(n,On),ji.lengthSq()===0&&(Math.abs(n.z)===1?On.x+=1e-4:On.z+=1e-4,On.normalize(),ji.crossVectors(n,On)),ji.normalize(),Fo.crossVectors(On,ji),s[0]=ji.x,s[4]=Fo.x,s[8]=On.x,s[1]=ji.y,s[5]=Fo.y,s[9]=On.y,s[2]=ji.z,s[6]=Fo.z,s[10]=On.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],p=n[6],x=n[10],g=n[14],M=n[3],y=n[7],v=n[11],E=n[15],T=s[0],w=s[4],R=s[8],S=s[12],b=s[1],U=s[5],P=s[9],G=s[13],j=s[2],O=s[6],B=s[10],K=s[14],q=s[3],Y=s[7],H=s[11],st=s[15];return r[0]=o*T+a*b+l*j+c*q,r[4]=o*w+a*U+l*O+c*Y,r[8]=o*R+a*P+l*B+c*H,r[12]=o*S+a*G+l*K+c*st,r[1]=h*T+u*b+d*j+f*q,r[5]=h*w+u*U+d*O+f*Y,r[9]=h*R+u*P+d*B+f*H,r[13]=h*S+u*G+d*K+f*st,r[2]=m*T+p*b+x*j+g*q,r[6]=m*w+p*U+x*O+g*Y,r[10]=m*R+p*P+x*B+g*H,r[14]=m*S+p*G+x*K+g*st,r[3]=M*T+y*b+v*j+E*q,r[7]=M*w+y*U+v*O+E*Y,r[11]=M*R+y*P+v*B+E*H,r[15]=M*S+y*G+v*K+E*st,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],p=t[7],x=t[11],g=t[15];return m*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*f-n*l*f)+p*(+e*l*f-e*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+x*(+e*c*u-e*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+g*(-s*a*h-e*l*u+e*a*d+s*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],p=t[13],x=t[14],g=t[15],M=u*x*c-p*d*c+p*l*f-a*x*f-u*l*g+a*d*g,y=m*d*c-h*x*c-m*l*f+o*x*f+h*l*g-o*d*g,v=h*p*c-m*u*c+m*a*f-o*p*f-h*a*g+o*u*g,E=m*u*l-h*p*l-m*a*d+o*p*d+h*a*x-o*u*x,T=e*M+n*y+s*v+r*E;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/T;return t[0]=M*w,t[1]=(p*d*r-u*x*r-p*s*f+n*x*f+u*s*g-n*d*g)*w,t[2]=(a*x*r-p*l*r+p*s*c-n*x*c-a*s*g+n*l*g)*w,t[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*f-n*l*f)*w,t[4]=y*w,t[5]=(h*x*r-m*d*r+m*s*f-e*x*f-h*s*g+e*d*g)*w,t[6]=(m*l*r-o*x*r-m*s*c+e*x*c+o*s*g-e*l*g)*w,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*f+e*l*f)*w,t[8]=v*w,t[9]=(m*u*r-h*p*r-m*n*f+e*p*f+h*n*g-e*u*g)*w,t[10]=(o*p*r-m*a*r+m*n*c-e*p*c-o*n*g+e*a*g)*w,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*f-e*a*f)*w,t[12]=E*w,t[13]=(h*p*s-m*u*s+m*n*d-e*p*d-h*n*x+e*u*x)*w,t[14]=(m*a*s-o*p*s-m*n*l+e*p*l+o*n*x-e*a*x)*w,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*d+e*a*d)*w,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,m=r*u,p=o*h,x=o*u,g=a*u,M=l*c,y=l*h,v=l*u,E=n.x,T=n.y,w=n.z;return s[0]=(1-(p+g))*E,s[1]=(f+v)*E,s[2]=(m-y)*E,s[3]=0,s[4]=(f-v)*T,s[5]=(1-(d+g))*T,s[6]=(x+M)*T,s[7]=0,s[8]=(m+y)*w,s[9]=(x-M)*w,s[10]=(1-(d+p))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=js.set(s[0],s[1],s[2]).length();const o=js.set(s[4],s[5],s[6]).length(),a=js.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ti.copy(this);const c=1/r,h=1/o,u=1/a;return ti.elements[0]*=c,ti.elements[1]*=c,ti.elements[2]*=c,ti.elements[4]*=h,ti.elements[5]*=h,ti.elements[6]*=h,ti.elements[8]*=u,ti.elements[9]*=u,ti.elements[10]*=u,e.setFromRotationMatrix(ti),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=gi,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let m,p;if(l)m=r/(o-r),p=o*r/(o-r);else if(a===gi)m=-(o+r)/(o-r),p=-2*o*r/(o-r);else if(a===Ca)m=-o/(o-r),p=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=p,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=gi,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s);let m,p;if(l)m=1/(o-r),p=o/(o-r);else if(a===gi)m=-2/(o-r),p=-(o+r)/(o-r);else if(a===Ca)m=-1/(o-r),p=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=p,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const js=new L,ti=new ue,lm=new L(0,0,0),cm=new L(1,1,1),ji=new L,Fo=new L,On=new L,su=new ue,ru=new hs;class yi{constructor(t=0,e=0,n=0,s=yi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(be(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-be(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(be(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return su.makeRotationFromQuaternion(t),this.setFromRotationMatrix(su,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ru.setFromEuler(this),this.setFromQuaternion(ru,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yi.DEFAULT_ORDER="XYZ";class fh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let hm=0;const ou=new L,Ks=new hs,Ri=new ue,Oo=new L,Vr=new L,um=new L,dm=new hs,au=new L(1,0,0),lu=new L(0,1,0),cu=new L(0,0,1),hu={type:"added"},fm={type:"removed"},Js={type:"childadded",child:null},hl={type:"childremoved",child:null};class qe extends Ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hm++}),this.uuid=Ls(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qe.DEFAULT_UP.clone();const t=new L,e=new yi,n=new hs,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ue},normalMatrix:{value:new ve}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=qe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ks.setFromAxisAngle(t,e),this.quaternion.multiply(Ks),this}rotateOnWorldAxis(t,e){return Ks.setFromAxisAngle(t,e),this.quaternion.premultiply(Ks),this}rotateX(t){return this.rotateOnAxis(au,t)}rotateY(t){return this.rotateOnAxis(lu,t)}rotateZ(t){return this.rotateOnAxis(cu,t)}translateOnAxis(t,e){return ou.copy(t).applyQuaternion(this.quaternion),this.position.add(ou.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(au,t)}translateY(t){return this.translateOnAxis(lu,t)}translateZ(t){return this.translateOnAxis(cu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Oo.copy(t):Oo.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(Vr,Oo,this.up):Ri.lookAt(Oo,Vr,this.up),this.quaternion.setFromRotationMatrix(Ri),s&&(Ri.extractRotation(s.matrixWorld),Ks.setFromRotationMatrix(Ri),this.quaternion.premultiply(Ks.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(hu),Js.child=t,this.dispatchEvent(Js),Js.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(fm),hl.child=t,this.dispatchEvent(hl),hl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ri.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ri),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(hu),Js.child=t,this.dispatchEvent(Js),Js.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,t,um),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,dm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}qe.DEFAULT_UP=new L(0,1,0);qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ei=new L,Ci=new L,ul=new L,Pi=new L,Qs=new L,tr=new L,uu=new L,dl=new L,fl=new L,pl=new L,ml=new Le,gl=new Le,xl=new Le;class qn{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),ei.subVectors(t,e),s.cross(ei);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){ei.subVectors(s,e),Ci.subVectors(n,e),ul.subVectors(t,e);const o=ei.dot(ei),a=ei.dot(Ci),l=ei.dot(ul),c=Ci.dot(Ci),h=Ci.dot(ul),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,m=(o*h-a*l)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Pi)===null?!1:Pi.x>=0&&Pi.y>=0&&Pi.x+Pi.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Pi.x),l.addScaledVector(o,Pi.y),l.addScaledVector(a,Pi.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return ml.setScalar(0),gl.setScalar(0),xl.setScalar(0),ml.fromBufferAttribute(t,e),gl.fromBufferAttribute(t,n),xl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(ml,r.x),o.addScaledVector(gl,r.y),o.addScaledVector(xl,r.z),o}static isFrontFacing(t,e,n,s){return ei.subVectors(n,e),Ci.subVectors(t,e),ei.cross(Ci).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ei.subVectors(this.c,this.b),Ci.subVectors(this.a,this.b),ei.cross(Ci).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return qn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return qn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return qn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return qn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return qn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Qs.subVectors(s,n),tr.subVectors(r,n),dl.subVectors(t,n);const l=Qs.dot(dl),c=tr.dot(dl);if(l<=0&&c<=0)return e.copy(n);fl.subVectors(t,s);const h=Qs.dot(fl),u=tr.dot(fl);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Qs,o);pl.subVectors(t,r);const f=Qs.dot(pl),m=tr.dot(pl);if(m>=0&&f<=m)return e.copy(r);const p=f*c-l*m;if(p<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(tr,a);const x=h*m-f*u;if(x<=0&&u-h>=0&&f-m>=0)return uu.subVectors(r,s),a=(u-h)/(u-h+(f-m)),e.copy(s).addScaledVector(uu,a);const g=1/(x+p+d);return o=p*g,a=d*g,e.copy(n).addScaledVector(Qs,o).addScaledVector(tr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Hd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ki={h:0,s:0,l:0},Bo={h:0,s:0,l:0};function vl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class ee{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Un){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ke.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ke.workingColorSpace){return this.r=t,this.g=e,this.b=n,ke.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ke.workingColorSpace){if(t=uh(t,1),e=be(e,0,1),n=be(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=vl(o,r,t+1/3),this.g=vl(o,r,t),this.b=vl(o,r,t-1/3)}return ke.colorSpaceToWorking(this,s),this}setStyle(t,e=Un){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Un){const n=Hd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Oi(t.r),this.g=Oi(t.g),this.b=Oi(t.b),this}copyLinearToSRGB(t){return this.r=_r(t.r),this.g=_r(t.g),this.b=_r(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Un){return ke.workingToColorSpace(Sn.copy(this),t),Math.round(be(Sn.r*255,0,255))*65536+Math.round(be(Sn.g*255,0,255))*256+Math.round(be(Sn.b*255,0,255))}getHexString(t=Un){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ke.workingColorSpace){ke.workingToColorSpace(Sn.copy(this),e);const n=Sn.r,s=Sn.g,r=Sn.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ke.workingColorSpace){return ke.workingToColorSpace(Sn.copy(this),e),t.r=Sn.r,t.g=Sn.g,t.b=Sn.b,t}getStyle(t=Un){ke.workingToColorSpace(Sn.copy(this),t);const e=Sn.r,n=Sn.g,s=Sn.b;return t!==Un?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ki),this.setHSL(Ki.h+t,Ki.s+e,Ki.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ki),t.getHSL(Bo);const n=io(Ki.h,Bo.h,e),s=io(Ki.s,Bo.s,e),r=io(Ki.l,Bo.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Sn=new ee;ee.NAMES=Hd;let pm=0;class ms extends Ir{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pm++}),this.uuid=Ls(),this.name="",this.type="Material",this.blending=Mr,this.side=Hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oc,this.blendDst=ac,this.blendEquation=Rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=Er,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xs,this.stencilZFail=Xs,this.stencilZPass=Xs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Mr&&(n.blending=this.blending),this.side!==Hi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==oc&&(n.blendSrc=this.blendSrc),this.blendDst!==ac&&(n.blendDst=this.blendDst),this.blendEquation!==Rs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Er&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Xs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Xs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class xn extends ms{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=Rd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const on=new L,Ho=new Wt;let mm=0;class un{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mm++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Kh,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ho.fromBufferAttribute(this,e),Ho.applyMatrix3(t),this.setXY(e,Ho.x,Ho.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)on.fromBufferAttribute(this,e),on.applyMatrix3(t),this.setXYZ(e,on.x,on.y,on.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)on.fromBufferAttribute(this,e),on.applyMatrix4(t),this.setXYZ(e,on.x,on.y,on.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)on.fromBufferAttribute(this,e),on.applyNormalMatrix(t),this.setXYZ(e,on.x,on.y,on.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)on.fromBufferAttribute(this,e),on.transformDirection(t),this.setXYZ(e,on.x,on.y,on.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=fr(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=An(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=fr(e,this.array)),e}setX(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=fr(e,this.array)),e}setY(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=fr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=fr(e,this.array)),e}setW(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=An(e,this.array),n=An(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=An(e,this.array),n=An(n,this.array),s=An(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=An(e,this.array),n=An(n,this.array),s=An(s,this.array),r=An(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Kh&&(t.usage=this.usage),t}}class ph extends un{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Gd extends un{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Vt extends un{constructor(t,e,n){super(new Float32Array(t),e,n)}}let gm=0;const Xn=new ue,yl=new qe,er=new L,Bn=new Nn,Wr=new Nn,pn=new L;class Se extends Ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=Ls(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Od(t)?Gd:ph)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ve().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Xn.makeRotationFromQuaternion(t),this.applyMatrix4(Xn),this}rotateX(t){return Xn.makeRotationX(t),this.applyMatrix4(Xn),this}rotateY(t){return Xn.makeRotationY(t),this.applyMatrix4(Xn),this}rotateZ(t){return Xn.makeRotationZ(t),this.applyMatrix4(Xn),this}translate(t,e,n){return Xn.makeTranslation(t,e,n),this.applyMatrix4(Xn),this}scale(t,e,n){return Xn.makeScale(t,e,n),this.applyMatrix4(Xn),this}lookAt(t){return yl.lookAt(t),yl.updateMatrix(),this.applyMatrix4(yl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(er).negate(),this.translate(er.x,er.y,er.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Vt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Nn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Bn.setFromBufferAttribute(r),this.morphTargetsRelative?(pn.addVectors(this.boundingBox.min,Bn.min),this.boundingBox.expandByPoint(pn),pn.addVectors(this.boundingBox.max,Bn.max),this.boundingBox.expandByPoint(pn)):(this.boundingBox.expandByPoint(Bn.min),this.boundingBox.expandByPoint(Bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(Bn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Wr.setFromBufferAttribute(a),this.morphTargetsRelative?(pn.addVectors(Bn.min,Wr.min),Bn.expandByPoint(pn),pn.addVectors(Bn.max,Wr.max),Bn.expandByPoint(pn)):(Bn.expandByPoint(Wr.min),Bn.expandByPoint(Wr.max))}Bn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)pn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(pn));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)pn.fromBufferAttribute(a,c),l&&(er.fromBufferAttribute(t,c),pn.add(er)),s=Math.max(s,n.distanceToSquared(pn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new un(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new L,l[R]=new L;const c=new L,h=new L,u=new L,d=new Wt,f=new Wt,m=new Wt,p=new L,x=new L;function g(R,S,b){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,b),d.fromBufferAttribute(r,R),f.fromBufferAttribute(r,S),m.fromBufferAttribute(r,b),h.sub(c),u.sub(c),f.sub(d),m.sub(d);const U=1/(f.x*m.y-m.x*f.y);isFinite(U)&&(p.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(U),x.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(U),a[R].add(p),a[S].add(p),a[b].add(p),l[R].add(x),l[S].add(x),l[b].add(x))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let R=0,S=M.length;R<S;++R){const b=M[R],U=b.start,P=b.count;for(let G=U,j=U+P;G<j;G+=3)g(t.getX(G+0),t.getX(G+1),t.getX(G+2))}const y=new L,v=new L,E=new L,T=new L;function w(R){E.fromBufferAttribute(s,R),T.copy(E);const S=a[R];y.copy(S),y.sub(E.multiplyScalar(E.dot(S))).normalize(),v.crossVectors(T,S);const U=v.dot(l[R])<0?-1:1;o.setXYZW(R,y.x,y.y,y.z,U)}for(let R=0,S=M.length;R<S;++R){const b=M[R],U=b.start,P=b.count;for(let G=U,j=U+P;G<j;G+=3)w(t.getX(G+0)),w(t.getX(G+1)),w(t.getX(G+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new un(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,u=new L;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),p=t.getX(d+1),x=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,p),o.fromBufferAttribute(e,x),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,p),c.fromBufferAttribute(n,x),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(p,l.x,l.y,l.z),n.setXYZ(x,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)pn.fromBufferAttribute(t,e),pn.normalize(),t.setXYZ(e,pn.x,pn.y,pn.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,m=0;for(let p=0,x=l.length;p<x;p++){a.isInterleavedBufferAttribute?f=l[p]*a.data.stride+a.offset:f=l[p]*h;for(let g=0;g<h;g++)d[m++]=c[f++]}return new un(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Se,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const du=new ue,_s=new ds,Go=new Vi,fu=new L,Vo=new L,Wo=new L,Xo=new L,Ml=new L,qo=new L,pu=new L,$o=new L;class Jt extends qe{constructor(t=new Se,e=new xn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){qo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(Ml.fromBufferAttribute(u,t),o?qo.addScaledVector(Ml,h):qo.addScaledVector(Ml.sub(e),h))}e.add(qo)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Go.copy(n.boundingSphere),Go.applyMatrix4(r),_s.copy(t.ray).recast(t.near),!(Go.containsPoint(_s.origin)===!1&&(_s.intersectSphere(Go,fu)===null||_s.origin.distanceToSquared(fu)>(t.far-t.near)**2))&&(du.copy(r).invert(),_s.copy(t.ray).applyMatrix4(du),!(n.boundingBox!==null&&_s.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,_s)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,p=d.length;m<p;m++){const x=d[m],g=o[x.materialIndex],M=Math.max(x.start,f.start),y=Math.min(a.count,Math.min(x.start+x.count,f.start+f.count));for(let v=M,E=y;v<E;v+=3){const T=a.getX(v),w=a.getX(v+1),R=a.getX(v+2);s=Yo(this,g,t,n,c,h,u,T,w,R),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=x.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),p=Math.min(a.count,f.start+f.count);for(let x=m,g=p;x<g;x+=3){const M=a.getX(x),y=a.getX(x+1),v=a.getX(x+2);s=Yo(this,o,t,n,c,h,u,M,y,v),s&&(s.faceIndex=Math.floor(x/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,p=d.length;m<p;m++){const x=d[m],g=o[x.materialIndex],M=Math.max(x.start,f.start),y=Math.min(l.count,Math.min(x.start+x.count,f.start+f.count));for(let v=M,E=y;v<E;v+=3){const T=v,w=v+1,R=v+2;s=Yo(this,g,t,n,c,h,u,T,w,R),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=x.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),p=Math.min(l.count,f.start+f.count);for(let x=m,g=p;x<g;x+=3){const M=x,y=x+1,v=x+2;s=Yo(this,o,t,n,c,h,u,M,y,v),s&&(s.faceIndex=Math.floor(x/3),e.push(s))}}}}function xm(i,t,e,n,s,r,o,a){let l;if(t.side===In?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Hi,a),l===null)return null;$o.copy(a),$o.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo($o);return c<e.near||c>e.far?null:{distance:c,point:$o.clone(),object:i}}function Yo(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Vo),i.getVertexPosition(l,Wo),i.getVertexPosition(c,Xo);const h=xm(i,t,e,n,Vo,Wo,Xo,pu);if(h){const u=new L;qn.getBarycoord(pu,Vo,Wo,Xo,u),s&&(h.uv=qn.getInterpolatedAttribute(s,a,l,c,u,new Wt)),r&&(h.uv1=qn.getInterpolatedAttribute(r,a,l,c,u,new Wt)),o&&(h.normal=qn.getInterpolatedAttribute(o,a,l,c,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new L,materialIndex:0};qn.getNormal(Vo,Wo,Xo,d.normal),h.face=d,h.barycoord=u}return h}class Gi extends Se{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Vt(c,3)),this.setAttribute("normal",new Vt(h,3)),this.setAttribute("uv",new Vt(u,2));function m(p,x,g,M,y,v,E,T,w,R,S){const b=v/w,U=E/R,P=v/2,G=E/2,j=T/2,O=w+1,B=R+1;let K=0,q=0;const Y=new L;for(let H=0;H<B;H++){const st=H*U-G;for(let _t=0;_t<O;_t++){const ne=_t*b-P;Y[p]=ne*M,Y[x]=st*y,Y[g]=j,c.push(Y.x,Y.y,Y.z),Y[p]=0,Y[x]=0,Y[g]=T>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push(_t/w),u.push(1-H/R),K+=1}}for(let H=0;H<R;H++)for(let st=0;st<w;st++){const _t=d+st+O*H,ne=d+st+O*(H+1),le=d+(st+1)+O*(H+1),ut=d+(st+1)+O*H;l.push(_t,ne,ut),l.push(ne,le,ut),q+=6}a.addGroup(f,q,S),f+=q,d+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Pr(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Rn(i){const t={};for(let e=0;e<i.length;e++){const n=Pr(i[e]);for(const s in n)t[s]=n[s]}return t}function vm(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Vd(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ke.workingColorSpace}const za={clone:Pr,merge:Rn};var ym=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Mm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Zn extends ms{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ym,this.fragmentShader=Mm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Pr(t.uniforms),this.uniformsGroups=vm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Wd extends qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=gi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ji=new L,mu=new Wt,gu=new Wt;class kn extends Wd{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=po*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(no*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return po*2*Math.atan(Math.tan(no*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ji.x,Ji.y).multiplyScalar(-t/Ji.z),Ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ji.x,Ji.y).multiplyScalar(-t/Ji.z)}getViewSize(t,e){return this.getViewBounds(t,mu,gu),e.subVectors(gu,mu)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(no*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const nr=-90,ir=1;class _m extends qe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new kn(nr,ir,t,e);s.layers=this.layers,this.add(s);const r=new kn(nr,ir,t,e);r.layers=this.layers,this.add(r);const o=new kn(nr,ir,t,e);o.layers=this.layers,this.add(o);const a=new kn(nr,ir,t,e);a.layers=this.layers,this.add(a);const l=new kn(nr,ir,t,e);l.layers=this.layers,this.add(l);const c=new kn(nr,ir,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===gi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ca)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const p=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=p,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Xd extends En{constructor(t=[],e=Tr,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class bm extends us{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Xd(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Gi(5,5,5),r=new Zn({name:"CubemapFromEquirect",uniforms:Pr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:In,blending:ls});r.uniforms.tEquirect.value=e;const o=new Jt(s,r),a=e.minFilter;return e.minFilter===os&&(e.minFilter=ri),new _m(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class te extends qe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Sm={type:"move"};class _l{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new te,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new te,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new te,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const p of t.hand.values()){const x=e.getJointPose(p,n),g=this._getHandJoint(c,p);x!==null&&(g.matrix.fromArray(x.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=x.radius),g.visible=x!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Sm)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new te;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Fa{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ee(t),this.density=e}clone(){return new Fa(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class wm extends qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yi,this.environmentIntensity=1,this.environmentRotation=new yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const xu=new L,vu=new Le,yu=new Le,Em=new L,Mu=new ue,Zo=new L,bl=new Vi,_u=new ue,Sl=new ds;class jo extends Jt{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Zh,this.bindMatrix=new ue,this.bindMatrixInverse=new ue,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Nn),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Zo),this.boundingBox.expandByPoint(Zo)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Vi),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Zo),this.boundingSphere.expandByPoint(Zo)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),bl.copy(this.boundingSphere),bl.applyMatrix4(s),t.ray.intersectsSphere(bl)!==!1&&(_u.copy(s).invert(),Sl.copy(t.ray).applyMatrix4(_u),!(this.boundingBox!==null&&Sl.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Sl)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Le,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Zh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ep?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,s=this.geometry;vu.fromBufferAttribute(s.attributes.skinIndex,t),yu.fromBufferAttribute(s.attributes.skinWeight,t),xu.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const o=yu.getComponent(r);if(o!==0){const a=vu.getComponent(r);Mu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Em.copy(xu).applyMatrix4(Mu),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class qd extends qe{constructor(){super(),this.isBone=!0,this.type="Bone"}}class mh extends En{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Vn,h=Vn,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const bu=new ue,Tm=new ue;class gh{constructor(t=[],e=[]){this.uuid=Ls(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ue)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new ue;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:Tm;bu.multiplyMatrices(a,e[r]),bu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new gh(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new mh(e,t,t,Gn,oi);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){const r=t.bones[n];let o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new qd),this.bones.push(o),this.boneInverses.push(new ue().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const o=e[s];t.bones.push(o.uuid);const a=n[s];t.boneInverses.push(a.toArray())}return t}}class mr extends un{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const sr=new ue,Su=new ue,Ko=[],wu=new Nn,Am=new ue,Xr=new Jt,qr=new Vi;class wn extends Jt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new mr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Am)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Nn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,sr),wu.copy(t.boundingBox).applyMatrix4(sr),this.boundingBox.union(wu)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Vi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,sr),qr.copy(t.boundingSphere).applyMatrix4(sr),this.boundingSphere.union(qr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Xr.geometry=this.geometry,Xr.material=this.material,Xr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qr.copy(this.boundingSphere),qr.applyMatrix4(n),t.ray.intersectsSphere(qr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,sr),Su.multiplyMatrices(n,sr),Xr.matrixWorld=Su,Xr.raycast(t,Ko);for(let o=0,a=Ko.length;o<a;o++){const l=Ko[o];l.instanceId=r,l.object=this,e.push(l)}Ko.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new mr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new mh(new Float32Array(s*this.count),s,this.count,oh,oi));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const wl=new L,Rm=new L,Cm=new ve;class pi{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=wl.subVectors(n,e).cross(Rm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(wl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Cm.getNormalMatrix(t),s=this.coplanarPoint(wl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const bs=new Vi,Pm=new Wt(.5,.5),Jo=new L;class xh{constructor(t=new pi,e=new pi,n=new pi,s=new pi,r=new pi,o=new pi){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=gi,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],p=r[9],x=r[10],g=r[11],M=r[12],y=r[13],v=r[14],E=r[15];if(s[0].setComponents(c-o,f-h,g-m,E-M).normalize(),s[1].setComponents(c+o,f+h,g+m,E+M).normalize(),s[2].setComponents(c+a,f+u,g+p,E+y).normalize(),s[3].setComponents(c-a,f-u,g-p,E-y).normalize(),n)s[4].setComponents(l,d,x,v).normalize(),s[5].setComponents(c-l,f-d,g-x,E-v).normalize();else if(s[4].setComponents(c-l,f-d,g-x,E-v).normalize(),e===gi)s[5].setComponents(c+l,f+d,g+x,E+v).normalize();else if(e===Ca)s[5].setComponents(l,d,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),bs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),bs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(bs)}intersectsSprite(t){bs.center.set(0,0,0);const e=Pm.distanceTo(t.center);return bs.radius=.7071067811865476+e,bs.applyMatrix4(t.matrixWorld),this.intersectsSphere(bs)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Jo.x=s.normal.x>0?t.max.x:t.min.x,Jo.y=s.normal.y>0?t.max.y:t.min.y,Jo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Jo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class vh extends ms{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ia=new L,Da=new L,Eu=new ue,$r=new ds,Qo=new Vi,El=new L,Tu=new L;class go extends qe{constructor(t=new Se,e=new vh){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Ia.fromBufferAttribute(e,s-1),Da.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Ia.distanceTo(Da);t.setAttribute("lineDistance",new Vt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qo.copy(n.boundingSphere),Qo.applyMatrix4(s),Qo.radius+=r,t.ray.intersectsSphere(Qo)===!1)return;Eu.copy(s).invert(),$r.copy(t.ray).applyMatrix4(Eu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let p=f,x=m-1;p<x;p+=c){const g=h.getX(p),M=h.getX(p+1),y=ta(this,t,$r,l,g,M,p);y&&e.push(y)}if(this.isLineLoop){const p=h.getX(m-1),x=h.getX(f),g=ta(this,t,$r,l,p,x,m-1);g&&e.push(g)}}else{const f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let p=f,x=m-1;p<x;p+=c){const g=ta(this,t,$r,l,p,p+1,p);g&&e.push(g)}if(this.isLineLoop){const p=ta(this,t,$r,l,m-1,f,m-1);p&&e.push(p)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ta(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(Ia.fromBufferAttribute(a,s),Da.fromBufferAttribute(a,r),e.distanceSqToSegment(Ia,Da,El,Tu)>n)return;El.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(El);if(!(c<t.near||c>t.far))return{distance:c,point:Tu.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Au=new L,Ru=new L;class zm extends go{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Au.fromBufferAttribute(e,s),Ru.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Au.distanceTo(Ru);t.setAttribute("lineDistance",new Vt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Im extends go{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Dm extends ms{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Cu=new ue,$c=new ds,ea=new Vi,na=new L;class Lm extends qe{constructor(t=new Se,e=new Dm){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ea.copy(n.boundingSphere),ea.applyMatrix4(s),ea.radius+=r,t.ray.intersectsSphere(ea)===!1)return;Cu.copy(s).invert(),$c.copy(t.ray).applyMatrix4(Cu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let m=d,p=f;m<p;m++){const x=c.getX(m);na.fromBufferAttribute(u,x),Pu(na,x,l,s,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let m=d,p=f;m<p;m++)na.fromBufferAttribute(u,m),Pu(na,m,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Pu(i,t,e,n,s,r,o){const a=$c.distanceSqToPoint(i);if(a<e){const l=new L;$c.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class $d extends En{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Yd extends En{constructor(t,e,n=Is,s,r,o,a=Vn,l=Vn,c,h=uo,u=1){if(h!==uo&&h!==fo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new dh(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Zd extends En{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Oa extends Se{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new L,h=new Wt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Vt(o,3)),this.setAttribute("normal",new Vt(a,3)),this.setAttribute("uv",new Vt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oa(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Us extends Se{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let m=0;const p=[],x=n/2;let g=0;M(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Vt(u,3)),this.setAttribute("normal",new Vt(d,3)),this.setAttribute("uv",new Vt(f,2));function M(){const v=new L,E=new L;let T=0;const w=(e-t)/n;for(let R=0;R<=r;R++){const S=[],b=R/r,U=b*(e-t)+t;for(let P=0;P<=s;P++){const G=P/s,j=G*l+a,O=Math.sin(j),B=Math.cos(j);E.x=U*O,E.y=-b*n+x,E.z=U*B,u.push(E.x,E.y,E.z),v.set(O,w,B).normalize(),d.push(v.x,v.y,v.z),f.push(G,1-b),S.push(m++)}p.push(S)}for(let R=0;R<s;R++)for(let S=0;S<r;S++){const b=p[S][R],U=p[S+1][R],P=p[S+1][R+1],G=p[S][R+1];(t>0||S!==0)&&(h.push(b,U,G),T+=3),(e>0||S!==r-1)&&(h.push(U,P,G),T+=3)}c.addGroup(g,T,0),g+=T}function y(v){const E=m,T=new Wt,w=new L;let R=0;const S=v===!0?t:e,b=v===!0?1:-1;for(let P=1;P<=s;P++)u.push(0,x*b,0),d.push(0,b,0),f.push(.5,.5),m++;const U=m;for(let P=0;P<=s;P++){const j=P/s*l+a,O=Math.cos(j),B=Math.sin(j);w.x=S*B,w.y=x*b,w.z=S*O,u.push(w.x,w.y,w.z),d.push(0,b,0),T.x=O*.5+.5,T.y=B*.5*b+.5,f.push(T.x,T.y),m++}for(let P=0;P<s;P++){const G=E+P,j=U+P;v===!0?h.push(j,j+1,G):h.push(j+1,j,G),R+=3}c.addGroup(g,R,v===!0?1:2),g+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Us(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class yh extends Us{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new yh(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class bo extends Se{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new Vt(r,3)),this.setAttribute("normal",new Vt(r.slice(),3)),this.setAttribute("uv",new Vt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const y=new L,v=new L,E=new L;for(let T=0;T<e.length;T+=3)f(e[T+0],y),f(e[T+1],v),f(e[T+2],E),l(y,v,E,M)}function l(M,y,v,E){const T=E+1,w=[];for(let R=0;R<=T;R++){w[R]=[];const S=M.clone().lerp(v,R/T),b=y.clone().lerp(v,R/T),U=T-R;for(let P=0;P<=U;P++)P===0&&R===T?w[R][P]=S:w[R][P]=S.clone().lerp(b,P/U)}for(let R=0;R<T;R++)for(let S=0;S<2*(T-R)-1;S++){const b=Math.floor(S/2);S%2===0?(d(w[R][b+1]),d(w[R+1][b]),d(w[R][b])):(d(w[R][b+1]),d(w[R+1][b+1]),d(w[R+1][b]))}}function c(M){const y=new L;for(let v=0;v<r.length;v+=3)y.x=r[v+0],y.y=r[v+1],y.z=r[v+2],y.normalize().multiplyScalar(M),r[v+0]=y.x,r[v+1]=y.y,r[v+2]=y.z}function h(){const M=new L;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];const v=x(M)/2/Math.PI+.5,E=g(M)/Math.PI+.5;o.push(v,1-E)}m(),u()}function u(){for(let M=0;M<o.length;M+=6){const y=o[M+0],v=o[M+2],E=o[M+4],T=Math.max(y,v,E),w=Math.min(y,v,E);T>.9&&w<.1&&(y<.2&&(o[M+0]+=1),v<.2&&(o[M+2]+=1),E<.2&&(o[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,y){const v=M*3;y.x=t[v+0],y.y=t[v+1],y.z=t[v+2]}function m(){const M=new L,y=new L,v=new L,E=new L,T=new Wt,w=new Wt,R=new Wt;for(let S=0,b=0;S<r.length;S+=9,b+=6){M.set(r[S+0],r[S+1],r[S+2]),y.set(r[S+3],r[S+4],r[S+5]),v.set(r[S+6],r[S+7],r[S+8]),T.set(o[b+0],o[b+1]),w.set(o[b+2],o[b+3]),R.set(o[b+4],o[b+5]),E.copy(M).add(y).add(v).divideScalar(3);const U=x(E);p(T,b+0,M,U),p(w,b+2,y,U),p(R,b+4,v,U)}}function p(M,y,v,E){E<0&&M.x===1&&(o[y]=M.x-1),v.x===0&&v.z===0&&(o[y]=E/2/Math.PI+.5)}function x(M){return Math.atan2(M.z,-M.x)}function g(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bo(t.vertices,t.indices,t.radius,t.details)}}class Ba extends bo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ba(t.radius,t.detail)}}class Wi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new Wt:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new L,s=[],r=[],o=[],a=new L,l=new ue;for(let f=0;f<=t;f++){const m=f/t;s[f]=this.getTangentAt(m,new L)}r[0]=new L,o[0]=new L;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(be(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(be(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class jd extends Wi{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Wt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Um extends jd{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Mh(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const ia=new L,Tl=new Mh,Al=new Mh,Rl=new Mh;class xo extends Wi{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(ia.subVectors(s[0],s[1]).add(s[0]),c=ia);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(ia.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=ia),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),f),p=Math.pow(u.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(h),f);p<1e-4&&(p=1),m<1e-4&&(m=p),x<1e-4&&(x=p),Tl.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,p,x),Al.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,p,x),Rl.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,p,x)}else this.curveType==="catmullrom"&&(Tl.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Al.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Rl.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Tl.calc(l),Al.calc(l),Rl.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function zu(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function km(i,t){const e=1-i;return e*e*t}function Nm(i,t){return 2*(1-i)*i*t}function Fm(i,t){return i*i*t}function so(i,t,e,n){return km(i,t)+Nm(i,e)+Fm(i,n)}function Om(i,t){const e=1-i;return e*e*e*t}function Bm(i,t){const e=1-i;return 3*e*e*i*t}function Hm(i,t){return 3*(1-i)*i*i*t}function Gm(i,t){return i*i*i*t}function ro(i,t,e,n,s){return Om(i,t)+Bm(i,e)+Hm(i,n)+Gm(i,s)}class Vm extends Wi{constructor(t=new Wt,e=new Wt,n=new Wt,s=new Wt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Wt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ro(t,s.x,r.x,o.x,a.x),ro(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Wm extends Wi{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(ro(t,s.x,r.x,o.x,a.x),ro(t,s.y,r.y,o.y,a.y),ro(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Xm extends Wi{constructor(t=new Wt,e=new Wt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Wt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Wt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qm extends Wi{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $m extends Wi{constructor(t=new Wt,e=new Wt,n=new Wt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Wt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(so(t,s.x,r.x,o.x),so(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Kd extends Wi{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(so(t,s.x,r.x,o.x),so(t,s.y,r.y,o.y),so(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ym extends Wi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Wt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(zu(a,l.x,c.x,h.x,u.x),zu(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Wt().fromArray(s))}return this}}var Zm=Object.freeze({__proto__:null,ArcCurve:Um,CatmullRomCurve3:xo,CubicBezierCurve:Vm,CubicBezierCurve3:Wm,EllipseCurve:jd,LineCurve:Xm,LineCurve3:qm,QuadraticBezierCurve:$m,QuadraticBezierCurve3:Kd,SplineCurve:Ym});class _h extends bo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new _h(t.radius,t.detail)}}class bh extends bo{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new bh(t.radius,t.detail)}}class Ni extends Se{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,f=[],m=[],p=[],x=[];for(let g=0;g<h;g++){const M=g*d-o;for(let y=0;y<c;y++){const v=y*u-r;m.push(v,-M,0),p.push(0,0,1),x.push(y/a),x.push(1-g/l)}}for(let g=0;g<l;g++)for(let M=0;M<a;M++){const y=M+c*g,v=M+c*(g+1),E=M+1+c*(g+1),T=M+1+c*g;f.push(y,v,T),f.push(v,E,T)}this.setIndex(f),this.setAttribute("position",new Vt(m,3)),this.setAttribute("normal",new Vt(p,3)),this.setAttribute("uv",new Vt(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ni(t.width,t.height,t.widthSegments,t.heightSegments)}}class as extends Se{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let u=t;const d=(e-t)/s,f=new L,m=new Wt;for(let p=0;p<=s;p++){for(let x=0;x<=n;x++){const g=r+x/n*o;f.x=u*Math.cos(g),f.y=u*Math.sin(g),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}u+=d}for(let p=0;p<s;p++){const x=p*(n+1);for(let g=0;g<n;g++){const M=g+x,y=M,v=M+n+1,E=M+n+2,T=M+1;a.push(y,v,T),a.push(v,E,T)}}this.setIndex(a),this.setAttribute("position",new Vt(l,3)),this.setAttribute("normal",new Vt(c,3)),this.setAttribute("uv",new Vt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new as(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class jn extends Se{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new L,d=new L,f=[],m=[],p=[],x=[];for(let g=0;g<=n;g++){const M=[],y=g/n;let v=0;g===0&&o===0?v=.5/e:g===n&&l===Math.PI&&(v=-.5/e);for(let E=0;E<=e;E++){const T=E/e;u.x=-t*Math.cos(s+T*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+T*r)*Math.sin(o+y*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),p.push(d.x,d.y,d.z),x.push(T+v,1-y),M.push(c++)}h.push(M)}for(let g=0;g<n;g++)for(let M=0;M<e;M++){const y=h[g][M+1],v=h[g][M],E=h[g+1][M],T=h[g+1][M+1];(g!==0||o>0)&&f.push(y,v,T),(g!==n-1||l<Math.PI)&&f.push(v,E,T)}this.setIndex(f),this.setAttribute("position",new Vt(m,3)),this.setAttribute("normal",new Vt(p,3)),this.setAttribute("uv",new Vt(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Sh extends Se{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new L,u=new L,d=new L;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const p=m/s*r,x=f/n*Math.PI*2;u.x=(t+e*Math.cos(x))*Math.cos(p),u.y=(t+e*Math.cos(x))*Math.sin(p),u.z=e*Math.sin(x),a.push(u.x,u.y,u.z),h.x=t*Math.cos(p),h.y=t*Math.sin(p),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const p=(s+1)*f+m-1,x=(s+1)*(f-1)+m-1,g=(s+1)*(f-1)+m,M=(s+1)*f+m;o.push(p,x,M),o.push(x,g,M)}this.setIndex(o),this.setAttribute("position",new Vt(a,3)),this.setAttribute("normal",new Vt(l,3)),this.setAttribute("uv",new Vt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Sh(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Ha extends Se{constructor(t=new Kd(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new L,l=new L,c=new Wt;let h=new L;const u=[],d=[],f=[],m=[];p(),this.setIndex(m),this.setAttribute("position",new Vt(u,3)),this.setAttribute("normal",new Vt(d,3)),this.setAttribute("uv",new Vt(f,2));function p(){for(let y=0;y<e;y++)x(y);x(r===!1?e:0),M(),g()}function x(y){h=t.getPointAt(y/e,h);const v=o.normals[y],E=o.binormals[y];for(let T=0;T<=s;T++){const w=T/s*Math.PI*2,R=Math.sin(w),S=-Math.cos(w);l.x=S*v.x+R*E.x,l.y=S*v.y+R*E.y,l.z=S*v.z+R*E.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function g(){for(let y=1;y<=e;y++)for(let v=1;v<=s;v++){const E=(s+1)*(y-1)+(v-1),T=(s+1)*y+(v-1),w=(s+1)*y+v,R=(s+1)*(y-1)+v;m.push(E,T,R),m.push(T,w,R)}}function M(){for(let y=0;y<=e;y++)for(let v=0;v<=s;v++)c.x=y/e,c.y=v/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Ha(new Zm[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Ve extends ms{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hh,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Jd extends Ve{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Wt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return be(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class gn extends ms{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new ee(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hh,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class jm extends ms{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ap,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Km extends ms{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Qd extends vh{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class wh extends qe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Jm extends wh{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(qe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Cl=new ue,Iu=new L,Du=new L;class tf{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Wt(512,512),this.mapType=vi,this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xh,this._frameExtents=new Wt(1,1),this._viewportCount=1,this._viewports=[new Le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Iu.setFromMatrixPosition(t.matrixWorld),e.position.copy(Iu),Du.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Du),e.updateMatrixWorld(),Cl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Cl,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Cl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Lu=new ue,Yr=new L,Pl=new L;class Qm extends tf{constructor(){super(new kn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Wt(4,2),this._viewportCount=6,this._viewports=[new Le(2,1,1,1),new Le(0,1,1,1),new Le(3,1,1,1),new Le(1,1,1,1),new Le(3,0,1,1),new Le(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Yr.setFromMatrixPosition(t.matrixWorld),n.position.copy(Yr),Pl.copy(n.position),Pl.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Pl),n.updateMatrixWorld(),s.makeTranslation(-Yr.x,-Yr.y,-Yr.z),Lu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lu,n.coordinateSystem,n.reversedDepth)}}class tg extends wh{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Qm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class ef extends Wd{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class eg extends tf{constructor(){super(new ef(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ng extends wh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(qe.DEFAULT_UP),this.updateMatrix(),this.target=new qe,this.shadow=new eg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class ig extends Se{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class sg extends kn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Uu=new ue;class zl{constructor(t,e,n=0,s=1/0){this.ray=new ds(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new fh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Uu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Uu),this}intersectObject(t,e=!0,n=[]){return Yc(t,this,n,e),n.sort(ku),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Yc(t[s],this,n,e);return n.sort(ku),n}}function ku(i,t){return i.distance-t.distance}function Yc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Yc(r[o],t,e,!0)}}function Nu(i,t,e,n){const s=rg(n);switch(e){case Ud:return i*t;case oh:return i*t/s.components*s.byteLength;case ah:return i*t/s.components*s.byteLength;case Nd:return i*t*2/s.components*s.byteLength;case lh:return i*t*2/s.components*s.byteLength;case kd:return i*t*3/s.components*s.byteLength;case Gn:return i*t*4/s.components*s.byteLength;case ch:return i*t*4/s.components*s.byteLength;case ba:case Sa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case wa:case Ea:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case yc:case _c:return Math.max(i,16)*Math.max(t,8)/4;case vc:case Mc:return Math.max(i,8)*Math.max(t,8)/2;case bc:case Sc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case wc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ec:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Tc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ac:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Rc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Cc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Pc:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case zc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ic:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Dc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Lc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Uc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case kc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Nc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Fc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Oc:case Bc:case Hc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Gc:case Vc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Wc:case Xc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function rg(i){switch(i){case vi:case zd:return{byteLength:1,components:1};case co:case Id:case _o:return{byteLength:2,components:1};case sh:case rh:return{byteLength:2,components:4};case Is:case ih:case oi:return{byteLength:4,components:1};case Dd:case Ld:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:nh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=nh);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function nf(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function og(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],p=u[f];p.start<=m.start+m.count+1?m.count=Math.max(m.count,p.start+p.count-m.start):(++d,u[d]=p)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const p=u[f];i.bufferSubData(c,p.start*h.BYTES_PER_ELEMENT,h,p.start,p.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var ag=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lg=`#ifdef USE_ALPHAHASH
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
#endif`,cg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ug=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,dg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,fg=`#ifdef USE_AOMAP
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
#endif`,pg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mg=`#ifdef USE_BATCHING
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
#endif`,gg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Mg=`#ifdef USE_IRIDESCENCE
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
#endif`,_g=`#ifdef USE_BUMPMAP
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
#endif`,bg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Sg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Eg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Tg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ag=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Rg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Cg=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Pg=`#define PI 3.141592653589793
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
} // validated`,zg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ig=`vec3 transformedNormal = objectNormal;
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
#endif`,Dg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ug=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,kg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ng="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Og=`#ifdef USE_ENVMAP
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
#endif`,Bg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Hg=`#ifdef USE_ENVMAP
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
#endif`,Gg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Vg=`#ifdef USE_ENVMAP
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
#endif`,Wg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$g=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Yg=`#ifdef USE_GRADIENTMAP
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
}`,Zg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Kg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jg=`uniform bool receiveShadow;
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
#endif`,Qg=`#ifdef USE_ENVMAP
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
#endif`,t0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,e0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,n0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,i0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,s0=`PhysicalMaterial material;
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
#endif`,r0=`struct PhysicalMaterial {
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
}`,o0=`
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
#endif`,a0=`#if defined( RE_IndirectDiffuse )
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
#endif`,l0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,c0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,h0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,u0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,d0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,f0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,p0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,m0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,g0=`#if defined( USE_POINTS_UV )
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
#endif`,x0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,v0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,y0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,M0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,b0=`#ifdef USE_MORPHTARGETS
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
#endif`,S0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,w0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,E0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,T0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,A0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,R0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,C0=`#ifdef USE_NORMALMAP
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
#endif`,P0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,z0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,I0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,D0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,L0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,U0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,k0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,N0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,F0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,O0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,B0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,H0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,G0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,V0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,W0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,X0=`float getShadowMask() {
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
}`,q0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$0=`#ifdef USE_SKINNING
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
#endif`,Y0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Z0=`#ifdef USE_SKINNING
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
#endif`,j0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,K0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,J0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Q0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,tx=`#ifdef USE_TRANSMISSION
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
#endif`,ex=`#ifdef USE_TRANSMISSION
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
#endif`,nx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ix=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ox=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ax=`uniform sampler2D t2D;
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
}`,lx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,hx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ux=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dx=`#include <common>
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
}`,fx=`#if DEPTH_PACKING == 3200
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
}`,px=`#define DISTANCE
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
}`,mx=`#define DISTANCE
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
}`,gx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vx=`uniform float scale;
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
}`,yx=`uniform vec3 diffuse;
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
}`,Mx=`#include <common>
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
}`,_x=`uniform vec3 diffuse;
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
}`,bx=`#define LAMBERT
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
}`,Sx=`#define LAMBERT
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
}`,wx=`#define MATCAP
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
}`,Ex=`#define MATCAP
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
}`,Tx=`#define NORMAL
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
}`,Ax=`#define NORMAL
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
}`,Rx=`#define PHONG
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
}`,Cx=`#define PHONG
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
}`,Px=`#define STANDARD
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
}`,zx=`#define STANDARD
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
}`,Ix=`#define TOON
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
}`,Dx=`#define TOON
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
}`,Lx=`uniform float size;
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
}`,Ux=`uniform vec3 diffuse;
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
}`,kx=`#include <common>
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
}`,Nx=`uniform vec3 color;
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
}`,Fx=`uniform float rotation;
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
}`,Ox=`uniform vec3 diffuse;
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
}`,Me={alphahash_fragment:ag,alphahash_pars_fragment:lg,alphamap_fragment:cg,alphamap_pars_fragment:hg,alphatest_fragment:ug,alphatest_pars_fragment:dg,aomap_fragment:fg,aomap_pars_fragment:pg,batching_pars_vertex:mg,batching_vertex:gg,begin_vertex:xg,beginnormal_vertex:vg,bsdfs:yg,iridescence_fragment:Mg,bumpmap_pars_fragment:_g,clipping_planes_fragment:bg,clipping_planes_pars_fragment:Sg,clipping_planes_pars_vertex:wg,clipping_planes_vertex:Eg,color_fragment:Tg,color_pars_fragment:Ag,color_pars_vertex:Rg,color_vertex:Cg,common:Pg,cube_uv_reflection_fragment:zg,defaultnormal_vertex:Ig,displacementmap_pars_vertex:Dg,displacementmap_vertex:Lg,emissivemap_fragment:Ug,emissivemap_pars_fragment:kg,colorspace_fragment:Ng,colorspace_pars_fragment:Fg,envmap_fragment:Og,envmap_common_pars_fragment:Bg,envmap_pars_fragment:Hg,envmap_pars_vertex:Gg,envmap_physical_pars_fragment:Qg,envmap_vertex:Vg,fog_vertex:Wg,fog_pars_vertex:Xg,fog_fragment:qg,fog_pars_fragment:$g,gradientmap_pars_fragment:Yg,lightmap_pars_fragment:Zg,lights_lambert_fragment:jg,lights_lambert_pars_fragment:Kg,lights_pars_begin:Jg,lights_toon_fragment:t0,lights_toon_pars_fragment:e0,lights_phong_fragment:n0,lights_phong_pars_fragment:i0,lights_physical_fragment:s0,lights_physical_pars_fragment:r0,lights_fragment_begin:o0,lights_fragment_maps:a0,lights_fragment_end:l0,logdepthbuf_fragment:c0,logdepthbuf_pars_fragment:h0,logdepthbuf_pars_vertex:u0,logdepthbuf_vertex:d0,map_fragment:f0,map_pars_fragment:p0,map_particle_fragment:m0,map_particle_pars_fragment:g0,metalnessmap_fragment:x0,metalnessmap_pars_fragment:v0,morphinstance_vertex:y0,morphcolor_vertex:M0,morphnormal_vertex:_0,morphtarget_pars_vertex:b0,morphtarget_vertex:S0,normal_fragment_begin:w0,normal_fragment_maps:E0,normal_pars_fragment:T0,normal_pars_vertex:A0,normal_vertex:R0,normalmap_pars_fragment:C0,clearcoat_normal_fragment_begin:P0,clearcoat_normal_fragment_maps:z0,clearcoat_pars_fragment:I0,iridescence_pars_fragment:D0,opaque_fragment:L0,packing:U0,premultiplied_alpha_fragment:k0,project_vertex:N0,dithering_fragment:F0,dithering_pars_fragment:O0,roughnessmap_fragment:B0,roughnessmap_pars_fragment:H0,shadowmap_pars_fragment:G0,shadowmap_pars_vertex:V0,shadowmap_vertex:W0,shadowmask_pars_fragment:X0,skinbase_vertex:q0,skinning_pars_vertex:$0,skinning_vertex:Y0,skinnormal_vertex:Z0,specularmap_fragment:j0,specularmap_pars_fragment:K0,tonemapping_fragment:J0,tonemapping_pars_fragment:Q0,transmission_fragment:tx,transmission_pars_fragment:ex,uv_pars_fragment:nx,uv_pars_vertex:ix,uv_vertex:sx,worldpos_vertex:rx,background_vert:ox,background_frag:ax,backgroundCube_vert:lx,backgroundCube_frag:cx,cube_vert:hx,cube_frag:ux,depth_vert:dx,depth_frag:fx,distanceRGBA_vert:px,distanceRGBA_frag:mx,equirect_vert:gx,equirect_frag:xx,linedashed_vert:vx,linedashed_frag:yx,meshbasic_vert:Mx,meshbasic_frag:_x,meshlambert_vert:bx,meshlambert_frag:Sx,meshmatcap_vert:wx,meshmatcap_frag:Ex,meshnormal_vert:Tx,meshnormal_frag:Ax,meshphong_vert:Rx,meshphong_frag:Cx,meshphysical_vert:Px,meshphysical_frag:zx,meshtoon_vert:Ix,meshtoon_frag:Dx,points_vert:Lx,points_frag:Ux,shadow_vert:kx,shadow_frag:Nx,sprite_vert:Fx,sprite_frag:Ox},zt={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ve},alphaMap:{value:null},alphaMapTransform:{value:new ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ve}},envmap:{envMap:{value:null},envMapRotation:{value:new ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ve},normalScale:{value:new Wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ve},alphaTest:{value:0},uvTransform:{value:new ve}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new Wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ve},alphaMap:{value:null},alphaMapTransform:{value:new ve},alphaTest:{value:0}}},mi={basic:{uniforms:Rn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.fog]),vertexShader:Me.meshbasic_vert,fragmentShader:Me.meshbasic_frag},lambert:{uniforms:Rn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,zt.lights,{emissive:{value:new ee(0)}}]),vertexShader:Me.meshlambert_vert,fragmentShader:Me.meshlambert_frag},phong:{uniforms:Rn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,zt.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30}}]),vertexShader:Me.meshphong_vert,fragmentShader:Me.meshphong_frag},standard:{uniforms:Rn([zt.common,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.roughnessmap,zt.metalnessmap,zt.fog,zt.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Me.meshphysical_vert,fragmentShader:Me.meshphysical_frag},toon:{uniforms:Rn([zt.common,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.gradientmap,zt.fog,zt.lights,{emissive:{value:new ee(0)}}]),vertexShader:Me.meshtoon_vert,fragmentShader:Me.meshtoon_frag},matcap:{uniforms:Rn([zt.common,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,{matcap:{value:null}}]),vertexShader:Me.meshmatcap_vert,fragmentShader:Me.meshmatcap_frag},points:{uniforms:Rn([zt.points,zt.fog]),vertexShader:Me.points_vert,fragmentShader:Me.points_frag},dashed:{uniforms:Rn([zt.common,zt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Me.linedashed_vert,fragmentShader:Me.linedashed_frag},depth:{uniforms:Rn([zt.common,zt.displacementmap]),vertexShader:Me.depth_vert,fragmentShader:Me.depth_frag},normal:{uniforms:Rn([zt.common,zt.bumpmap,zt.normalmap,zt.displacementmap,{opacity:{value:1}}]),vertexShader:Me.meshnormal_vert,fragmentShader:Me.meshnormal_frag},sprite:{uniforms:Rn([zt.sprite,zt.fog]),vertexShader:Me.sprite_vert,fragmentShader:Me.sprite_frag},background:{uniforms:{uvTransform:{value:new ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Me.background_vert,fragmentShader:Me.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ve}},vertexShader:Me.backgroundCube_vert,fragmentShader:Me.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Me.cube_vert,fragmentShader:Me.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Me.equirect_vert,fragmentShader:Me.equirect_frag},distanceRGBA:{uniforms:Rn([zt.common,zt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Me.distanceRGBA_vert,fragmentShader:Me.distanceRGBA_frag},shadow:{uniforms:Rn([zt.lights,zt.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:Me.shadow_vert,fragmentShader:Me.shadow_frag}};mi.physical={uniforms:Rn([mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ve},clearcoatNormalScale:{value:new Wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ve},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ve},transmissionSamplerSize:{value:new Wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ve},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ve},anisotropyVector:{value:new Wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ve}}]),vertexShader:Me.meshphysical_vert,fragmentShader:Me.meshphysical_frag};const sa={r:0,b:0,g:0},Ss=new yi,Bx=new ue;function Hx(i,t,e,n,s,r,o){const a=new ee(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function m(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?e:t).get(v)),v}function p(y){let v=!1;const E=m(y);E===null?g(a,l):E&&E.isColor&&(g(E,1),v=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(y,v){const E=m(v);E&&(E.isCubeTexture||E.mapping===Na)?(h===void 0&&(h=new Jt(new Gi(1,1,1),new Zn({name:"BackgroundCubeMaterial",uniforms:Pr(mi.backgroundCube.uniforms),vertexShader:mi.backgroundCube.vertexShader,fragmentShader:mi.backgroundCube.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ss.copy(v.backgroundRotation),Ss.x*=-1,Ss.y*=-1,Ss.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Ss.y*=-1,Ss.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Bx.makeRotationFromEuler(Ss)),h.material.toneMapped=ke.getTransfer(E.colorSpace)!==Ge,(u!==E||d!==E.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=E,d=E.version,f=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Jt(new Ni(2,2),new Zn({name:"BackgroundMaterial",uniforms:Pr(mi.background.uniforms),vertexShader:mi.background.vertexShader,fragmentShader:mi.background.fragmentShader,side:Hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=ke.getTransfer(E.colorSpace)!==Ge,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||d!==E.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=E,d=E.version,f=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function g(y,v){y.getRGB(sa,Vd(i)),n.buffers.color.setClear(sa.r,sa.g,sa.b,v,o)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,v=1){a.set(y),l=v,g(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,g(a,l)},render:p,addToRenderList:x,dispose:M}}function Gx(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(b,U,P,G,j){let O=!1;const B=u(G,P,U);r!==B&&(r=B,c(r.object)),O=f(b,G,P,j),O&&m(b,G,P,j),j!==null&&t.update(j,i.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,v(b,U,P,G),j!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(j).buffer))}function l(){return i.createVertexArray()}function c(b){return i.bindVertexArray(b)}function h(b){return i.deleteVertexArray(b)}function u(b,U,P){const G=P.wireframe===!0;let j=n[b.id];j===void 0&&(j={},n[b.id]=j);let O=j[U.id];O===void 0&&(O={},j[U.id]=O);let B=O[G];return B===void 0&&(B=d(l()),O[G]=B),B}function d(b){const U=[],P=[],G=[];for(let j=0;j<e;j++)U[j]=0,P[j]=0,G[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:P,attributeDivisors:G,object:b,attributes:{},index:null}}function f(b,U,P,G){const j=r.attributes,O=U.attributes;let B=0;const K=P.getAttributes();for(const q in K)if(K[q].location>=0){const H=j[q];let st=O[q];if(st===void 0&&(q==="instanceMatrix"&&b.instanceMatrix&&(st=b.instanceMatrix),q==="instanceColor"&&b.instanceColor&&(st=b.instanceColor)),H===void 0||H.attribute!==st||st&&H.data!==st.data)return!0;B++}return r.attributesNum!==B||r.index!==G}function m(b,U,P,G){const j={},O=U.attributes;let B=0;const K=P.getAttributes();for(const q in K)if(K[q].location>=0){let H=O[q];H===void 0&&(q==="instanceMatrix"&&b.instanceMatrix&&(H=b.instanceMatrix),q==="instanceColor"&&b.instanceColor&&(H=b.instanceColor));const st={};st.attribute=H,H&&H.data&&(st.data=H.data),j[q]=st,B++}r.attributes=j,r.attributesNum=B,r.index=G}function p(){const b=r.newAttributes;for(let U=0,P=b.length;U<P;U++)b[U]=0}function x(b){g(b,0)}function g(b,U){const P=r.newAttributes,G=r.enabledAttributes,j=r.attributeDivisors;P[b]=1,G[b]===0&&(i.enableVertexAttribArray(b),G[b]=1),j[b]!==U&&(i.vertexAttribDivisor(b,U),j[b]=U)}function M(){const b=r.newAttributes,U=r.enabledAttributes;for(let P=0,G=U.length;P<G;P++)U[P]!==b[P]&&(i.disableVertexAttribArray(P),U[P]=0)}function y(b,U,P,G,j,O,B){B===!0?i.vertexAttribIPointer(b,U,P,j,O):i.vertexAttribPointer(b,U,P,G,j,O)}function v(b,U,P,G){p();const j=G.attributes,O=P.getAttributes(),B=U.defaultAttributeValues;for(const K in O){const q=O[K];if(q.location>=0){let Y=j[K];if(Y===void 0&&(K==="instanceMatrix"&&b.instanceMatrix&&(Y=b.instanceMatrix),K==="instanceColor"&&b.instanceColor&&(Y=b.instanceColor)),Y!==void 0){const H=Y.normalized,st=Y.itemSize,_t=t.get(Y);if(_t===void 0)continue;const ne=_t.buffer,le=_t.type,ut=_t.bytesPerElement,$=le===i.INT||le===i.UNSIGNED_INT||Y.gpuType===ih;if(Y.isInterleavedBufferAttribute){const ot=Y.data,Mt=ot.stride,Xt=Y.offset;if(ot.isInstancedInterleavedBuffer){for(let Ft=0;Ft<q.locationSize;Ft++)g(q.location+Ft,ot.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Ft=0;Ft<q.locationSize;Ft++)x(q.location+Ft);i.bindBuffer(i.ARRAY_BUFFER,ne);for(let Ft=0;Ft<q.locationSize;Ft++)y(q.location+Ft,st/q.locationSize,le,H,Mt*ut,(Xt+st/q.locationSize*Ft)*ut,$)}else{if(Y.isInstancedBufferAttribute){for(let ot=0;ot<q.locationSize;ot++)g(q.location+ot,Y.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ot=0;ot<q.locationSize;ot++)x(q.location+ot);i.bindBuffer(i.ARRAY_BUFFER,ne);for(let ot=0;ot<q.locationSize;ot++)y(q.location+ot,st/q.locationSize,le,H,st*ut,st/q.locationSize*ot*ut,$)}}else if(B!==void 0){const H=B[K];if(H!==void 0)switch(H.length){case 2:i.vertexAttrib2fv(q.location,H);break;case 3:i.vertexAttrib3fv(q.location,H);break;case 4:i.vertexAttrib4fv(q.location,H);break;default:i.vertexAttrib1fv(q.location,H)}}}}M()}function E(){R();for(const b in n){const U=n[b];for(const P in U){const G=U[P];for(const j in G)h(G[j].object),delete G[j];delete U[P]}delete n[b]}}function T(b){if(n[b.id]===void 0)return;const U=n[b.id];for(const P in U){const G=U[P];for(const j in G)h(G[j].object),delete G[j];delete U[P]}delete n[b.id]}function w(b){for(const U in n){const P=n[U];if(P[b.id]===void 0)continue;const G=P[b.id];for(const j in G)h(G[j].object),delete G[j];delete P[b.id]}}function R(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:S,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfProgram:w,initAttributes:p,enableAttribute:x,disableUnusedAttributes:M}}function Vx(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let m=0;for(let p=0;p<u;p++)m+=h[p]*d[p];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Wx(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==Gn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const R=w===_o&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==vi&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==oi&&!R)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),x=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=m>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:p,maxCubemapSize:x,maxAttributes:g,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:E,maxSamples:T}}function Xx(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new pi,a=new ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,p=u.clipIntersection,x=u.clipShadows,g=i.get(u);if(!s||m===null||m.length===0||r&&!x)r?h(null):c();else{const M=r?0:n,y=M*4;let v=g.clippingState||null;l.value=v,v=h(m,d,y,f);for(let E=0;E!==y;++E)v[E]=e[E];g.clippingState=v,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){const p=u!==null?u.length:0;let x=null;if(p!==0){if(x=l.value,m!==!0||x===null){const g=f+p*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(x===null||x.length<g)&&(x=new Float32Array(g));for(let y=0,v=f;y!==p;++y,v+=4)o.copy(u[y]).applyMatrix4(M,a),o.normal.toArray(x,v),x[v+3]=o.constant}l.value=x,l.needsUpdate=!0}return t.numPlanes=p,t.numIntersection=0,x}}function qx(i){let t=new WeakMap;function e(o,a){return a===mc?o.mapping=Tr:a===gc&&(o.mapping=Ar),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===mc||a===gc)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new bm(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const gr=4,Fu=[.125,.215,.35,.446,.526,.582],Cs=20,Il=new ef,Ou=new ee;let Dl=null,Ll=0,Ul=0,kl=!1;const Ts=(1+Math.sqrt(5))/2,rr=1/Ts,Bu=[new L(-Ts,rr,0),new L(Ts,rr,0),new L(-rr,0,Ts),new L(rr,0,Ts),new L(0,Ts,-rr),new L(0,Ts,rr),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],$x=new L;class Hu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=$x}=r;Dl=this._renderer.getRenderTarget(),Ll=this._renderer.getActiveCubeFace(),Ul=this._renderer.getActiveMipmapLevel(),kl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Dl,Ll,Ul),this._renderer.xr.enabled=kl,t.scissorTest=!1,ra(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Tr||t.mapping===Ar?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Dl=this._renderer.getRenderTarget(),Ll=this._renderer.getActiveCubeFace(),Ul=this._renderer.getActiveMipmapLevel(),kl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ri,minFilter:ri,generateMipmaps:!1,type:_o,format:Gn,colorSpace:Cr,depthBuffer:!1},s=Gu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gu(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Yx(r)),this._blurMaterial=Zx(r,t,e)}return s}_compileMaterial(t){const e=new Jt(this._lodPlanes[0],t);this._renderer.compile(e,Il)}_sceneToCubeUV(t,e,n,s,r){const l=new kn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Ou),u.toneMapping=cs,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const p=new xn({name:"PMREM.Background",side:In,depthWrite:!1,depthTest:!1}),x=new Jt(new Gi,p);let g=!1;const M=t.background;M?M.isColor&&(p.color.copy(M),t.background=null,g=!0):(p.color.copy(Ou),g=!0);for(let y=0;y<6;y++){const v=y%3;v===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):v===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));const E=this._cubeSize;ra(s,v*E,y>2?E:0,E,E),u.setRenderTarget(s),g&&u.render(x,l),u.render(t,l)}x.geometry.dispose(),x.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=M}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Tr||t.mapping===Ar;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Jt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;ra(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Il)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Bu[(s-r-1)%Bu.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Jt(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Cs-1),p=r/m,x=isFinite(r)?1+Math.floor(h*p):Cs;x>Cs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Cs}`);const g=[];let M=0;for(let w=0;w<Cs;++w){const R=w/p,S=Math.exp(-R*R/2);g.push(S),w===0?M+=S:w<x&&(M+=2*S)}for(let w=0;w<g.length;w++)g[w]=g[w]/M;d.envMap.value=t.texture,d.samples.value=x,d.weights.value=g,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=m,d.mipInt.value=y-n;const v=this._sizeLods[s],E=3*v*(s>y-gr?s-y+gr:0),T=4*(this._cubeSize-v);ra(e,E,T,3*v,2*v),l.setRenderTarget(e),l.render(u,Il)}}function Yx(i){const t=[],e=[],n=[];let s=i;const r=i-gr+1+Fu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-gr?l=Fu[o-i+gr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,p=3,x=2,g=1,M=new Float32Array(p*m*f),y=new Float32Array(x*m*f),v=new Float32Array(g*m*f);for(let T=0;T<f;T++){const w=T%3*2/3-1,R=T>2?0:-1,S=[w,R,0,w+2/3,R,0,w+2/3,R+1,0,w,R,0,w+2/3,R+1,0,w,R+1,0];M.set(S,p*m*T),y.set(d,x*m*T);const b=[T,T,T,T,T,T];v.set(b,g*m*T)}const E=new Se;E.setAttribute("position",new un(M,p)),E.setAttribute("uv",new un(y,x)),E.setAttribute("faceIndex",new un(v,g)),t.push(E),s>gr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Gu(i,t,e){const n=new us(i,t,e);return n.texture.mapping=Na,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ra(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Zx(i,t,e){const n=new Float32Array(Cs),s=new L(0,1,0);return new Zn({name:"SphericalGaussianBlur",defines:{n:Cs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Eh(),fragmentShader:`

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
		`,blending:ls,depthTest:!1,depthWrite:!1})}function Vu(){return new Zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Eh(),fragmentShader:`

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
		`,blending:ls,depthTest:!1,depthWrite:!1})}function Wu(){return new Zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Eh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ls,depthTest:!1,depthWrite:!1})}function Eh(){return`

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
	`}function jx(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===mc||l===gc,h=l===Tr||l===Ar;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Hu(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Hu(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Kx(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&mo("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Jx(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,m=u.attributes.position;let p=0;if(f!==null){const M=f.array;p=f.version;for(let y=0,v=M.length;y<v;y+=3){const E=M[y+0],T=M[y+1],w=M[y+2];d.push(E,T,T,w,w,E)}}else if(m!==void 0){const M=m.array;p=m.version;for(let y=0,v=M.length/3-1;y<v;y+=3){const E=y+0,T=y+1,w=y+2;d.push(E,T,T,w,w,E)}}else return;const x=new(Od(d)?Gd:ph)(d,1);x.version=p;const g=r.get(u);g&&t.remove(g),r.set(u,x)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Qx(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function c(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,d*o,m),e.update(f,n,m))}function h(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let x=0;for(let g=0;g<m;g++)x+=f[g];e.update(x,n,1)}function u(d,f,m,p){if(m===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let g=0;g<d.length;g++)c(d[g]/o,f[g],p[g]);else{x.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,p,0,m);let g=0;for(let M=0;M<m;M++)g+=f[M]*p[M];e.update(g,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function tv(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function ev(i,t,e){const n=new WeakMap,s=new Le;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let b=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",b)};var f=b;d!==void 0&&d.texture.dispose();const m=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let v=0;m===!0&&(v=1),p===!0&&(v=2),x===!0&&(v=3);let E=a.attributes.position.count*v,T=1;E>t.maxTextureSize&&(T=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const w=new Float32Array(E*T*4*u),R=new Bd(w,E,T,u);R.type=oi,R.needsUpdate=!0;const S=v*4;for(let U=0;U<u;U++){const P=g[U],G=M[U],j=y[U],O=E*T*4*U;for(let B=0;B<P.count;B++){const K=B*S;m===!0&&(s.fromBufferAttribute(P,B),w[O+K+0]=s.x,w[O+K+1]=s.y,w[O+K+2]=s.z,w[O+K+3]=0),p===!0&&(s.fromBufferAttribute(G,B),w[O+K+4]=s.x,w[O+K+5]=s.y,w[O+K+6]=s.z,w[O+K+7]=0),x===!0&&(s.fromBufferAttribute(j,B),w[O+K+8]=s.x,w[O+K+9]=s.y,w[O+K+10]=s.z,w[O+K+11]=j.itemSize===4?s.w:1)}}d={count:u,texture:R,size:new Wt(E,T)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let m=0;for(let x=0;x<c.length;x++)m+=c[x];const p=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function nv(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const sf=new En,Xu=new Yd(1,1),rf=new Bd,of=new om,af=new Xd,qu=[],$u=[],Yu=new Float32Array(16),Zu=new Float32Array(9),ju=new Float32Array(4);function Dr(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=qu[s];if(r===void 0&&(r=new Float32Array(s),qu[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function dn(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function fn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ga(i,t){let e=$u[t];e===void 0&&(e=new Int32Array(t),$u[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function iv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function sv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(dn(e,t))return;i.uniform2fv(this.addr,t),fn(e,t)}}function rv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(dn(e,t))return;i.uniform3fv(this.addr,t),fn(e,t)}}function ov(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(dn(e,t))return;i.uniform4fv(this.addr,t),fn(e,t)}}function av(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(dn(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),fn(e,t)}else{if(dn(e,n))return;ju.set(n),i.uniformMatrix2fv(this.addr,!1,ju),fn(e,n)}}function lv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(dn(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),fn(e,t)}else{if(dn(e,n))return;Zu.set(n),i.uniformMatrix3fv(this.addr,!1,Zu),fn(e,n)}}function cv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(dn(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),fn(e,t)}else{if(dn(e,n))return;Yu.set(n),i.uniformMatrix4fv(this.addr,!1,Yu),fn(e,n)}}function hv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function uv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(dn(e,t))return;i.uniform2iv(this.addr,t),fn(e,t)}}function dv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(dn(e,t))return;i.uniform3iv(this.addr,t),fn(e,t)}}function fv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(dn(e,t))return;i.uniform4iv(this.addr,t),fn(e,t)}}function pv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function mv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(dn(e,t))return;i.uniform2uiv(this.addr,t),fn(e,t)}}function gv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(dn(e,t))return;i.uniform3uiv(this.addr,t),fn(e,t)}}function xv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(dn(e,t))return;i.uniform4uiv(this.addr,t),fn(e,t)}}function vv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Xu.compareFunction=Fd,r=Xu):r=sf,e.setTexture2D(t||r,s)}function yv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||of,s)}function Mv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||af,s)}function _v(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||rf,s)}function bv(i){switch(i){case 5126:return iv;case 35664:return sv;case 35665:return rv;case 35666:return ov;case 35674:return av;case 35675:return lv;case 35676:return cv;case 5124:case 35670:return hv;case 35667:case 35671:return uv;case 35668:case 35672:return dv;case 35669:case 35673:return fv;case 5125:return pv;case 36294:return mv;case 36295:return gv;case 36296:return xv;case 35678:case 36198:case 36298:case 36306:case 35682:return vv;case 35679:case 36299:case 36307:return yv;case 35680:case 36300:case 36308:case 36293:return Mv;case 36289:case 36303:case 36311:case 36292:return _v}}function Sv(i,t){i.uniform1fv(this.addr,t)}function wv(i,t){const e=Dr(t,this.size,2);i.uniform2fv(this.addr,e)}function Ev(i,t){const e=Dr(t,this.size,3);i.uniform3fv(this.addr,e)}function Tv(i,t){const e=Dr(t,this.size,4);i.uniform4fv(this.addr,e)}function Av(i,t){const e=Dr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Rv(i,t){const e=Dr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Cv(i,t){const e=Dr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Pv(i,t){i.uniform1iv(this.addr,t)}function zv(i,t){i.uniform2iv(this.addr,t)}function Iv(i,t){i.uniform3iv(this.addr,t)}function Dv(i,t){i.uniform4iv(this.addr,t)}function Lv(i,t){i.uniform1uiv(this.addr,t)}function Uv(i,t){i.uniform2uiv(this.addr,t)}function kv(i,t){i.uniform3uiv(this.addr,t)}function Nv(i,t){i.uniform4uiv(this.addr,t)}function Fv(i,t,e){const n=this.cache,s=t.length,r=Ga(e,s);dn(n,r)||(i.uniform1iv(this.addr,r),fn(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||sf,r[o])}function Ov(i,t,e){const n=this.cache,s=t.length,r=Ga(e,s);dn(n,r)||(i.uniform1iv(this.addr,r),fn(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||of,r[o])}function Bv(i,t,e){const n=this.cache,s=t.length,r=Ga(e,s);dn(n,r)||(i.uniform1iv(this.addr,r),fn(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||af,r[o])}function Hv(i,t,e){const n=this.cache,s=t.length,r=Ga(e,s);dn(n,r)||(i.uniform1iv(this.addr,r),fn(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||rf,r[o])}function Gv(i){switch(i){case 5126:return Sv;case 35664:return wv;case 35665:return Ev;case 35666:return Tv;case 35674:return Av;case 35675:return Rv;case 35676:return Cv;case 5124:case 35670:return Pv;case 35667:case 35671:return zv;case 35668:case 35672:return Iv;case 35669:case 35673:return Dv;case 5125:return Lv;case 36294:return Uv;case 36295:return kv;case 36296:return Nv;case 35678:case 36198:case 36298:case 36306:case 35682:return Fv;case 35679:case 36299:case 36307:return Ov;case 35680:case 36300:case 36308:case 36293:return Bv;case 36289:case 36303:case 36311:case 36292:return Hv}}class Vv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=bv(e.type)}}class Wv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Gv(e.type)}}class Xv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Nl=/(\w+)(\])?(\[|\.)?/g;function Ku(i,t){i.seq.push(t),i.map[t.id]=t}function qv(i,t,e){const n=i.name,s=n.length;for(Nl.lastIndex=0;;){const r=Nl.exec(n),o=Nl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Ku(e,c===void 0?new Vv(a,i,t):new Wv(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Xv(a),Ku(e,u)),e=u}}}class Ta{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);qv(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Ju(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const $v=37297;let Yv=0;function Zv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Qu=new ve;function jv(i){ke._getMatrix(Qu,ke.workingColorSpace,i);const t=`mat3( ${Qu.elements.map(e=>e.toFixed(4))} )`;switch(ke.getTransfer(i)){case Ra:return[t,"LinearTransferOETF"];case Ge:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function td(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Zv(i.getShaderSource(t),a)}else return r}function Kv(i,t){const e=jv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Jv(i,t){let e;switch(t){case yp:e="Linear";break;case Mp:e="Reinhard";break;case _p:e="Cineon";break;case Cd:e="ACESFilmic";break;case Sp:e="AgX";break;case wp:e="Neutral";break;case bp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const oa=new L;function Qv(){ke.getLuminanceCoefficients(oa);const i=oa.x.toFixed(4),t=oa.y.toFixed(4),e=oa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ty(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(to).join(`
`)}function ey(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ny(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function to(i){return i!==""}function ed(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function nd(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const iy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zc(i){return i.replace(iy,ry)}const sy=new Map;function ry(i,t){let e=Me[t];if(e===void 0){const n=sy.get(t);if(n!==void 0)e=Me[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Zc(e)}const oy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function id(i){return i.replace(oy,ay)}function ay(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function sd(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function ly(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ad?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Jf?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Di&&(t="SHADOWMAP_TYPE_VSM"),t}function cy(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Tr:case Ar:t="ENVMAP_TYPE_CUBE";break;case Na:t="ENVMAP_TYPE_CUBE_UV";break}return t}function hy(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ar:t="ENVMAP_MODE_REFRACTION";break}return t}function uy(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Rd:t="ENVMAP_BLENDING_MULTIPLY";break;case xp:t="ENVMAP_BLENDING_MIX";break;case vp:t="ENVMAP_BLENDING_ADD";break}return t}function dy(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function fy(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=ly(e),c=cy(e),h=hy(e),u=uy(e),d=dy(e),f=ty(e),m=ey(r),p=s.createProgram();let x,g,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(to).join(`
`),x.length>0&&(x+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(to).join(`
`),g.length>0&&(g+=`
`)):(x=[sd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(to).join(`
`),g=[sd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==cs?"#define TONE_MAPPING":"",e.toneMapping!==cs?Me.tonemapping_pars_fragment:"",e.toneMapping!==cs?Jv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Me.colorspace_pars_fragment,Kv("linearToOutputTexel",e.outputColorSpace),Qv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(to).join(`
`)),o=Zc(o),o=ed(o,e),o=nd(o,e),a=Zc(a),a=ed(a,e),a=nd(a,e),o=id(o),a=id(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,x=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,g=["#define varying in",e.glslVersion===Jh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Jh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const y=M+x+o,v=M+g+a,E=Ju(s,s.VERTEX_SHADER,y),T=Ju(s,s.FRAGMENT_SHADER,v);s.attachShader(p,E),s.attachShader(p,T),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function w(U){if(i.debug.checkShaderErrors){const P=s.getProgramInfoLog(p)||"",G=s.getShaderInfoLog(E)||"",j=s.getShaderInfoLog(T)||"",O=P.trim(),B=G.trim(),K=j.trim();let q=!0,Y=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,E,T);else{const H=td(s,E,"vertex"),st=td(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+O+`
`+H+`
`+st)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(B===""||K==="")&&(Y=!1);Y&&(U.diagnostics={runnable:q,programLog:O,vertexShader:{log:B,prefix:x},fragmentShader:{log:K,prefix:g}})}s.deleteShader(E),s.deleteShader(T),R=new Ta(s,p),S=ny(s,p)}let R;this.getUniforms=function(){return R===void 0&&w(this),R};let S;this.getAttributes=function(){return S===void 0&&w(this),S};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(p,$v)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Yv++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=E,this.fragmentShader=T,this}let py=0;class my{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new gy(t),e.set(t,n)),n}}class gy{constructor(t){this.id=py++,this.code=t,this.usedTimes=0}}function xy(i,t,e,n,s,r,o){const a=new fh,l=new my,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(S){return c.add(S),S===0?"uv":`uv${S}`}function x(S,b,U,P,G){const j=P.fog,O=G.geometry,B=S.isMeshStandardMaterial?P.environment:null,K=(S.isMeshStandardMaterial?e:t).get(S.envMap||B),q=K&&K.mapping===Na?K.image.height:null,Y=m[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const H=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,st=H!==void 0?H.length:0;let _t=0;O.morphAttributes.position!==void 0&&(_t=1),O.morphAttributes.normal!==void 0&&(_t=2),O.morphAttributes.color!==void 0&&(_t=3);let ne,le,ut,$;if(Y){const ye=mi[Y];ne=ye.vertexShader,le=ye.fragmentShader}else ne=S.vertexShader,le=S.fragmentShader,l.update(S),ut=l.getVertexShaderID(S),$=l.getFragmentShaderID(S);const ot=i.getRenderTarget(),Mt=i.state.buffers.depth.getReversed(),Xt=G.isInstancedMesh===!0,Ft=G.isBatchedMesh===!0,pe=!!S.map,we=!!S.matcap,D=!!K,ie=!!S.aoMap,jt=!!S.lightMap,Yt=!!S.bumpMap,Lt=!!S.normalMap,re=!!S.displacementMap,mt=!!S.emissiveMap,bt=!!S.metalnessMap,he=!!S.roughnessMap,ze=S.anisotropy>0,I=S.clearcoat>0,A=S.dispersion>0,tt=S.iridescence>0,lt=S.sheen>0,ct=S.transmission>0,at=ze&&!!S.anisotropyMap,Ut=I&&!!S.clearcoatMap,ht=I&&!!S.clearcoatNormalMap,Et=I&&!!S.clearcoatRoughnessMap,It=tt&&!!S.iridescenceMap,gt=tt&&!!S.iridescenceThicknessMap,Ct=lt&&!!S.sheenColorMap,Qt=lt&&!!S.sheenRoughnessMap,Ht=!!S.specularMap,wt=!!S.specularColorMap,de=!!S.specularIntensityMap,X=ct&&!!S.transmissionMap,yt=ct&&!!S.thicknessMap,Tt=!!S.gradientMap,Ot=!!S.alphaMap,xt=S.alphaTest>0,dt=!!S.alphaHash,Gt=!!S.extensions;let fe=cs;S.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(fe=i.toneMapping);const Be={shaderID:Y,shaderType:S.type,shaderName:S.name,vertexShader:ne,fragmentShader:le,defines:S.defines,customVertexShaderID:ut,customFragmentShaderID:$,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Ft,batchingColor:Ft&&G._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&G.instanceColor!==null,instancingMorph:Xt&&G.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ot===null?i.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Cr,alphaToCoverage:!!S.alphaToCoverage,map:pe,matcap:we,envMap:D,envMapMode:D&&K.mapping,envMapCubeUVHeight:q,aoMap:ie,lightMap:jt,bumpMap:Yt,normalMap:Lt,displacementMap:d&&re,emissiveMap:mt,normalMapObjectSpace:Lt&&S.normalMapType===Cp,normalMapTangentSpace:Lt&&S.normalMapType===hh,metalnessMap:bt,roughnessMap:he,anisotropy:ze,anisotropyMap:at,clearcoat:I,clearcoatMap:Ut,clearcoatNormalMap:ht,clearcoatRoughnessMap:Et,dispersion:A,iridescence:tt,iridescenceMap:It,iridescenceThicknessMap:gt,sheen:lt,sheenColorMap:Ct,sheenRoughnessMap:Qt,specularMap:Ht,specularColorMap:wt,specularIntensityMap:de,transmission:ct,transmissionMap:X,thicknessMap:yt,gradientMap:Tt,opaque:S.transparent===!1&&S.blending===Mr&&S.alphaToCoverage===!1,alphaMap:Ot,alphaTest:xt,alphaHash:dt,combine:S.combine,mapUv:pe&&p(S.map.channel),aoMapUv:ie&&p(S.aoMap.channel),lightMapUv:jt&&p(S.lightMap.channel),bumpMapUv:Yt&&p(S.bumpMap.channel),normalMapUv:Lt&&p(S.normalMap.channel),displacementMapUv:re&&p(S.displacementMap.channel),emissiveMapUv:mt&&p(S.emissiveMap.channel),metalnessMapUv:bt&&p(S.metalnessMap.channel),roughnessMapUv:he&&p(S.roughnessMap.channel),anisotropyMapUv:at&&p(S.anisotropyMap.channel),clearcoatMapUv:Ut&&p(S.clearcoatMap.channel),clearcoatNormalMapUv:ht&&p(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&p(S.clearcoatRoughnessMap.channel),iridescenceMapUv:It&&p(S.iridescenceMap.channel),iridescenceThicknessMapUv:gt&&p(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&p(S.sheenColorMap.channel),sheenRoughnessMapUv:Qt&&p(S.sheenRoughnessMap.channel),specularMapUv:Ht&&p(S.specularMap.channel),specularColorMapUv:wt&&p(S.specularColorMap.channel),specularIntensityMapUv:de&&p(S.specularIntensityMap.channel),transmissionMapUv:X&&p(S.transmissionMap.channel),thicknessMapUv:yt&&p(S.thicknessMap.channel),alphaMapUv:Ot&&p(S.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Lt||ze),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!O.attributes.uv&&(pe||Ot),fog:!!j,useFog:S.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Mt,skinning:G.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:st,morphTextureStride:_t,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:fe,decodeVideoTexture:pe&&S.map.isVideoTexture===!0&&ke.getTransfer(S.map.colorSpace)===Ge,decodeVideoTextureEmissive:mt&&S.emissiveMap.isVideoTexture===!0&&ke.getTransfer(S.emissiveMap.colorSpace)===Ge,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ce,flipSided:S.side===In,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Gt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&S.extensions.multiDraw===!0||Ft)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Be.vertexUv1s=c.has(1),Be.vertexUv2s=c.has(2),Be.vertexUv3s=c.has(3),c.clear(),Be}function g(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const U in S.defines)b.push(U),b.push(S.defines[U]);return S.isRawShaderMaterial===!1&&(M(b,S),y(b,S),b.push(i.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function M(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function y(S,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),S.push(a.mask)}function v(S){const b=m[S.type];let U;if(b){const P=mi[b];U=za.clone(P.uniforms)}else U=S.uniforms;return U}function E(S,b){let U;for(let P=0,G=h.length;P<G;P++){const j=h[P];if(j.cacheKey===b){U=j,++U.usedTimes;break}}return U===void 0&&(U=new fy(i,b,S,r),h.push(U)),U}function T(S){if(--S.usedTimes===0){const b=h.indexOf(S);h[b]=h[h.length-1],h.pop(),S.destroy()}}function w(S){l.remove(S)}function R(){l.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:v,acquireProgram:E,releaseProgram:T,releaseShaderCache:w,programs:h,dispose:R}}function vy(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function yy(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function rd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function od(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,m,p,x){let g=i[t];return g===void 0?(g={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:p,group:x},i[t]=g):(g.id=u.id,g.object=u,g.geometry=d,g.material=f,g.groupOrder=m,g.renderOrder=u.renderOrder,g.z=p,g.group=x),t++,g}function a(u,d,f,m,p,x){const g=o(u,d,f,m,p,x);f.transmission>0?n.push(g):f.transparent===!0?s.push(g):e.push(g)}function l(u,d,f,m,p,x){const g=o(u,d,f,m,p,x);f.transmission>0?n.unshift(g):f.transparent===!0?s.unshift(g):e.unshift(g)}function c(u,d){e.length>1&&e.sort(u||yy),n.length>1&&n.sort(d||rd),s.length>1&&s.sort(d||rd)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function My(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new od,i.set(n,[o])):s>=r.length?(o=new od,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function _y(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new ee};break;case"SpotLight":e={position:new L,direction:new L,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new ee,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":e={color:new ee,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function by(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Sy=0;function wy(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Ey(i){const t=new _y,e=by(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const s=new L,r=new ue,o=new ue;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,p=0,x=0,g=0,M=0,y=0,v=0,E=0,T=0,w=0;c.sort(wy);for(let S=0,b=c.length;S<b;S++){const U=c[S],P=U.color,G=U.intensity,j=U.distance,O=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)h+=P.r*G,u+=P.g*G,d+=P.b*G;else if(U.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(U.sh.coefficients[B],G);w++}else if(U.isDirectionalLight){const B=t.get(U);if(B.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const K=U.shadow,q=e.get(U);q.shadowIntensity=K.intensity,q.shadowBias=K.bias,q.shadowNormalBias=K.normalBias,q.shadowRadius=K.radius,q.shadowMapSize=K.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=O,n.directionalShadowMatrix[f]=U.shadow.matrix,M++}n.directional[f]=B,f++}else if(U.isSpotLight){const B=t.get(U);B.position.setFromMatrixPosition(U.matrixWorld),B.color.copy(P).multiplyScalar(G),B.distance=j,B.coneCos=Math.cos(U.angle),B.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),B.decay=U.decay,n.spot[p]=B;const K=U.shadow;if(U.map&&(n.spotLightMap[E]=U.map,E++,K.updateMatrices(U),U.castShadow&&T++),n.spotLightMatrix[p]=K.matrix,U.castShadow){const q=e.get(U);q.shadowIntensity=K.intensity,q.shadowBias=K.bias,q.shadowNormalBias=K.normalBias,q.shadowRadius=K.radius,q.shadowMapSize=K.mapSize,n.spotShadow[p]=q,n.spotShadowMap[p]=O,v++}p++}else if(U.isRectAreaLight){const B=t.get(U);B.color.copy(P).multiplyScalar(G),B.halfWidth.set(U.width*.5,0,0),B.halfHeight.set(0,U.height*.5,0),n.rectArea[x]=B,x++}else if(U.isPointLight){const B=t.get(U);if(B.color.copy(U.color).multiplyScalar(U.intensity),B.distance=U.distance,B.decay=U.decay,U.castShadow){const K=U.shadow,q=e.get(U);q.shadowIntensity=K.intensity,q.shadowBias=K.bias,q.shadowNormalBias=K.normalBias,q.shadowRadius=K.radius,q.shadowMapSize=K.mapSize,q.shadowCameraNear=K.camera.near,q.shadowCameraFar=K.camera.far,n.pointShadow[m]=q,n.pointShadowMap[m]=O,n.pointShadowMatrix[m]=U.shadow.matrix,y++}n.point[m]=B,m++}else if(U.isHemisphereLight){const B=t.get(U);B.skyColor.copy(U.color).multiplyScalar(G),B.groundColor.copy(U.groundColor).multiplyScalar(G),n.hemi[g]=B,g++}}x>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=zt.LTC_FLOAT_1,n.rectAreaLTC2=zt.LTC_FLOAT_2):(n.rectAreaLTC1=zt.LTC_HALF_1,n.rectAreaLTC2=zt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const R=n.hash;(R.directionalLength!==f||R.pointLength!==m||R.spotLength!==p||R.rectAreaLength!==x||R.hemiLength!==g||R.numDirectionalShadows!==M||R.numPointShadows!==y||R.numSpotShadows!==v||R.numSpotMaps!==E||R.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=p,n.rectArea.length=x,n.point.length=m,n.hemi.length=g,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+E-T,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=w,R.directionalLength=f,R.pointLength=m,R.spotLength=p,R.rectAreaLength=x,R.hemiLength=g,R.numDirectionalShadows=M,R.numPointShadows=y,R.numSpotShadows=v,R.numSpotMaps=E,R.numLightProbes=w,n.version=Sy++)}function l(c,h){let u=0,d=0,f=0,m=0,p=0;const x=h.matrixWorldInverse;for(let g=0,M=c.length;g<M;g++){const y=c[g];if(y.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(x),u++}else if(y.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(x),v.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(x),f++}else if(y.isRectAreaLight){const v=n.rectArea[m];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(x),o.identity(),r.copy(y.matrixWorld),r.premultiply(x),o.extractRotation(r),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(y.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(x),d++}else if(y.isHemisphereLight){const v=n.hemi[p];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(x),p++}}}return{setup:a,setupView:l,state:n}}function ad(i){const t=new Ey(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Ty(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new ad(i),t.set(s,[a])):r>=o.length?(a=new ad(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const Ay=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ry=`uniform sampler2D shadow_pass;
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
}`;function Cy(i,t,e){let n=new xh;const s=new Wt,r=new Wt,o=new Le,a=new jm({depthPacking:Rp}),l=new Km,c={},h=e.maxTextureSize,u={[Hi]:In,[In]:Hi,[Ce]:Ce},d=new Zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Wt},radius:{value:4}},vertexShader:Ay,fragmentShader:Ry}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new Se;m.setAttribute("position",new un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const p=new Jt(m,d),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ad;let g=this.type;this.render=function(T,w,R){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||T.length===0)return;const S=i.getRenderTarget(),b=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),P=i.state;P.setBlending(ls),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const G=g!==Di&&this.type===Di,j=g===Di&&this.type!==Di;for(let O=0,B=T.length;O<B;O++){const K=T[O],q=K.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);const Y=q.getFrameExtents();if(s.multiply(Y),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Y.x),s.x=r.x*Y.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Y.y),s.y=r.y*Y.y,q.mapSize.y=r.y)),q.map===null||G===!0||j===!0){const st=this.type!==Di?{minFilter:Vn,magFilter:Vn}:{};q.map!==null&&q.map.dispose(),q.map=new us(s.x,s.y,st),q.map.texture.name=K.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();const H=q.getViewportCount();for(let st=0;st<H;st++){const _t=q.getViewport(st);o.set(r.x*_t.x,r.y*_t.y,r.x*_t.z,r.y*_t.w),P.viewport(o),q.updateMatrices(K,st),n=q.getFrustum(),v(w,R,q.camera,K,this.type)}q.isPointLightShadow!==!0&&this.type===Di&&M(q,R),q.needsUpdate=!1}g=this.type,x.needsUpdate=!1,i.setRenderTarget(S,b,U)};function M(T,w){const R=t.update(p);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new us(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(w,null,R,d,p,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(w,null,R,f,p,null)}function y(T,w,R,S){let b=null;const U=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(U!==void 0)b=U;else if(b=R.isPointLight===!0?l:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const P=b.uuid,G=w.uuid;let j=c[P];j===void 0&&(j={},c[P]=j);let O=j[G];O===void 0&&(O=b.clone(),j[G]=O,w.addEventListener("dispose",E)),b=O}if(b.visible=w.visible,b.wireframe=w.wireframe,S===Di?b.side=w.shadowSide!==null?w.shadowSide:w.side:b.side=w.shadowSide!==null?w.shadowSide:u[w.side],b.alphaMap=w.alphaMap,b.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,b.map=w.map,b.clipShadows=w.clipShadows,b.clippingPlanes=w.clippingPlanes,b.clipIntersection=w.clipIntersection,b.displacementMap=w.displacementMap,b.displacementScale=w.displacementScale,b.displacementBias=w.displacementBias,b.wireframeLinewidth=w.wireframeLinewidth,b.linewidth=w.linewidth,R.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const P=i.properties.get(b);P.light=R}return b}function v(T,w,R,S,b){if(T.visible===!1)return;if(T.layers.test(w.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&b===Di)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);const G=t.update(T),j=T.material;if(Array.isArray(j)){const O=G.groups;for(let B=0,K=O.length;B<K;B++){const q=O[B],Y=j[q.materialIndex];if(Y&&Y.visible){const H=y(T,Y,S,b);T.onBeforeShadow(i,T,w,R,G,H,q),i.renderBufferDirect(R,null,G,H,T,q),T.onAfterShadow(i,T,w,R,G,H,q)}}}else if(j.visible){const O=y(T,j,S,b);T.onBeforeShadow(i,T,w,R,G,O,null),i.renderBufferDirect(R,null,G,O,T,null),T.onAfterShadow(i,T,w,R,G,O,null)}}const P=T.children;for(let G=0,j=P.length;G<j;G++)v(P[G],w,R,S,b)}function E(T){T.target.removeEventListener("dispose",E);for(const R in c){const S=c[R],b=T.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}const Py={[lc]:cc,[hc]:fc,[uc]:pc,[Er]:dc,[cc]:lc,[fc]:hc,[pc]:uc,[dc]:Er};function zy(i,t){function e(){let X=!1;const yt=new Le;let Tt=null;const Ot=new Le(0,0,0,0);return{setMask:function(xt){Tt!==xt&&!X&&(i.colorMask(xt,xt,xt,xt),Tt=xt)},setLocked:function(xt){X=xt},setClear:function(xt,dt,Gt,fe,Be){Be===!0&&(xt*=fe,dt*=fe,Gt*=fe),yt.set(xt,dt,Gt,fe),Ot.equals(yt)===!1&&(i.clearColor(xt,dt,Gt,fe),Ot.copy(yt))},reset:function(){X=!1,Tt=null,Ot.set(-1,0,0,0)}}}function n(){let X=!1,yt=!1,Tt=null,Ot=null,xt=null;return{setReversed:function(dt){if(yt!==dt){const Gt=t.get("EXT_clip_control");dt?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT),yt=dt;const fe=xt;xt=null,this.setClear(fe)}},getReversed:function(){return yt},setTest:function(dt){dt?ot(i.DEPTH_TEST):Mt(i.DEPTH_TEST)},setMask:function(dt){Tt!==dt&&!X&&(i.depthMask(dt),Tt=dt)},setFunc:function(dt){if(yt&&(dt=Py[dt]),Ot!==dt){switch(dt){case lc:i.depthFunc(i.NEVER);break;case cc:i.depthFunc(i.ALWAYS);break;case hc:i.depthFunc(i.LESS);break;case Er:i.depthFunc(i.LEQUAL);break;case uc:i.depthFunc(i.EQUAL);break;case dc:i.depthFunc(i.GEQUAL);break;case fc:i.depthFunc(i.GREATER);break;case pc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ot=dt}},setLocked:function(dt){X=dt},setClear:function(dt){xt!==dt&&(yt&&(dt=1-dt),i.clearDepth(dt),xt=dt)},reset:function(){X=!1,Tt=null,Ot=null,xt=null,yt=!1}}}function s(){let X=!1,yt=null,Tt=null,Ot=null,xt=null,dt=null,Gt=null,fe=null,Be=null;return{setTest:function(ye){X||(ye?ot(i.STENCIL_TEST):Mt(i.STENCIL_TEST))},setMask:function(ye){yt!==ye&&!X&&(i.stencilMask(ye),yt=ye)},setFunc:function(ye,Kn,vn){(Tt!==ye||Ot!==Kn||xt!==vn)&&(i.stencilFunc(ye,Kn,vn),Tt=ye,Ot=Kn,xt=vn)},setOp:function(ye,Kn,vn){(dt!==ye||Gt!==Kn||fe!==vn)&&(i.stencilOp(ye,Kn,vn),dt=ye,Gt=Kn,fe=vn)},setLocked:function(ye){X=ye},setClear:function(ye){Be!==ye&&(i.clearStencil(ye),Be=ye)},reset:function(){X=!1,yt=null,Tt=null,Ot=null,xt=null,dt=null,Gt=null,fe=null,Be=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,p=!1,x=null,g=null,M=null,y=null,v=null,E=null,T=null,w=new ee(0,0,0),R=0,S=!1,b=null,U=null,P=null,G=null,j=null;const O=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,K=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(q)[1]),B=K>=1):q.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),B=K>=2);let Y=null,H={};const st=i.getParameter(i.SCISSOR_BOX),_t=i.getParameter(i.VIEWPORT),ne=new Le().fromArray(st),le=new Le().fromArray(_t);function ut(X,yt,Tt,Ot){const xt=new Uint8Array(4),dt=i.createTexture();i.bindTexture(X,dt),i.texParameteri(X,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(X,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Gt=0;Gt<Tt;Gt++)X===i.TEXTURE_3D||X===i.TEXTURE_2D_ARRAY?i.texImage3D(yt,0,i.RGBA,1,1,Ot,0,i.RGBA,i.UNSIGNED_BYTE,xt):i.texImage2D(yt+Gt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xt);return dt}const $={};$[i.TEXTURE_2D]=ut(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=ut(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[i.TEXTURE_2D_ARRAY]=ut(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=ut(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ot(i.DEPTH_TEST),o.setFunc(Er),Yt(!1),Lt(Xh),ot(i.CULL_FACE),ie(ls);function ot(X){h[X]!==!0&&(i.enable(X),h[X]=!0)}function Mt(X){h[X]!==!1&&(i.disable(X),h[X]=!1)}function Xt(X,yt){return u[X]!==yt?(i.bindFramebuffer(X,yt),u[X]=yt,X===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=yt),X===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=yt),!0):!1}function Ft(X,yt){let Tt=f,Ot=!1;if(X){Tt=d.get(yt),Tt===void 0&&(Tt=[],d.set(yt,Tt));const xt=X.textures;if(Tt.length!==xt.length||Tt[0]!==i.COLOR_ATTACHMENT0){for(let dt=0,Gt=xt.length;dt<Gt;dt++)Tt[dt]=i.COLOR_ATTACHMENT0+dt;Tt.length=xt.length,Ot=!0}}else Tt[0]!==i.BACK&&(Tt[0]=i.BACK,Ot=!0);Ot&&i.drawBuffers(Tt)}function pe(X){return m!==X?(i.useProgram(X),m=X,!0):!1}const we={[Rs]:i.FUNC_ADD,[tp]:i.FUNC_SUBTRACT,[ep]:i.FUNC_REVERSE_SUBTRACT};we[np]=i.MIN,we[ip]=i.MAX;const D={[sp]:i.ZERO,[rp]:i.ONE,[op]:i.SRC_COLOR,[oc]:i.SRC_ALPHA,[dp]:i.SRC_ALPHA_SATURATE,[hp]:i.DST_COLOR,[lp]:i.DST_ALPHA,[ap]:i.ONE_MINUS_SRC_COLOR,[ac]:i.ONE_MINUS_SRC_ALPHA,[up]:i.ONE_MINUS_DST_COLOR,[cp]:i.ONE_MINUS_DST_ALPHA,[fp]:i.CONSTANT_COLOR,[pp]:i.ONE_MINUS_CONSTANT_COLOR,[mp]:i.CONSTANT_ALPHA,[gp]:i.ONE_MINUS_CONSTANT_ALPHA};function ie(X,yt,Tt,Ot,xt,dt,Gt,fe,Be,ye){if(X===ls){p===!0&&(Mt(i.BLEND),p=!1);return}if(p===!1&&(ot(i.BLEND),p=!0),X!==Qf){if(X!==x||ye!==S){if((g!==Rs||v!==Rs)&&(i.blendEquation(i.FUNC_ADD),g=Rs,v=Rs),ye)switch(X){case Mr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qh:i.blendFunc(i.ONE,i.ONE);break;case $h:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Yh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}else switch(X){case Mr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case $h:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Yh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}M=null,y=null,E=null,T=null,w.set(0,0,0),R=0,x=X,S=ye}return}xt=xt||yt,dt=dt||Tt,Gt=Gt||Ot,(yt!==g||xt!==v)&&(i.blendEquationSeparate(we[yt],we[xt]),g=yt,v=xt),(Tt!==M||Ot!==y||dt!==E||Gt!==T)&&(i.blendFuncSeparate(D[Tt],D[Ot],D[dt],D[Gt]),M=Tt,y=Ot,E=dt,T=Gt),(fe.equals(w)===!1||Be!==R)&&(i.blendColor(fe.r,fe.g,fe.b,Be),w.copy(fe),R=Be),x=X,S=!1}function jt(X,yt){X.side===Ce?Mt(i.CULL_FACE):ot(i.CULL_FACE);let Tt=X.side===In;yt&&(Tt=!Tt),Yt(Tt),X.blending===Mr&&X.transparent===!1?ie(ls):ie(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),o.setFunc(X.depthFunc),o.setTest(X.depthTest),o.setMask(X.depthWrite),r.setMask(X.colorWrite);const Ot=X.stencilWrite;a.setTest(Ot),Ot&&(a.setMask(X.stencilWriteMask),a.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),a.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),mt(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?ot(i.SAMPLE_ALPHA_TO_COVERAGE):Mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Yt(X){b!==X&&(X?i.frontFace(i.CW):i.frontFace(i.CCW),b=X)}function Lt(X){X!==jf?(ot(i.CULL_FACE),X!==U&&(X===Xh?i.cullFace(i.BACK):X===Kf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Mt(i.CULL_FACE),U=X}function re(X){X!==P&&(B&&i.lineWidth(X),P=X)}function mt(X,yt,Tt){X?(ot(i.POLYGON_OFFSET_FILL),(G!==yt||j!==Tt)&&(i.polygonOffset(yt,Tt),G=yt,j=Tt)):Mt(i.POLYGON_OFFSET_FILL)}function bt(X){X?ot(i.SCISSOR_TEST):Mt(i.SCISSOR_TEST)}function he(X){X===void 0&&(X=i.TEXTURE0+O-1),Y!==X&&(i.activeTexture(X),Y=X)}function ze(X,yt,Tt){Tt===void 0&&(Y===null?Tt=i.TEXTURE0+O-1:Tt=Y);let Ot=H[Tt];Ot===void 0&&(Ot={type:void 0,texture:void 0},H[Tt]=Ot),(Ot.type!==X||Ot.texture!==yt)&&(Y!==Tt&&(i.activeTexture(Tt),Y=Tt),i.bindTexture(X,yt||$[X]),Ot.type=X,Ot.texture=yt)}function I(){const X=H[Y];X!==void 0&&X.type!==void 0&&(i.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function A(){try{i.compressedTexImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function tt(){try{i.compressedTexImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function lt(){try{i.texSubImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function ct(){try{i.texSubImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function at(){try{i.compressedTexSubImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Ut(){try{i.compressedTexSubImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function ht(){try{i.texStorage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Et(){try{i.texStorage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function It(){try{i.texImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function gt(){try{i.texImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Ct(X){ne.equals(X)===!1&&(i.scissor(X.x,X.y,X.z,X.w),ne.copy(X))}function Qt(X){le.equals(X)===!1&&(i.viewport(X.x,X.y,X.z,X.w),le.copy(X))}function Ht(X,yt){let Tt=c.get(yt);Tt===void 0&&(Tt=new WeakMap,c.set(yt,Tt));let Ot=Tt.get(X);Ot===void 0&&(Ot=i.getUniformBlockIndex(yt,X.name),Tt.set(X,Ot))}function wt(X,yt){const Ot=c.get(yt).get(X);l.get(yt)!==Ot&&(i.uniformBlockBinding(yt,Ot,X.__bindingPointIndex),l.set(yt,Ot))}function de(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Y=null,H={},u={},d=new WeakMap,f=[],m=null,p=!1,x=null,g=null,M=null,y=null,v=null,E=null,T=null,w=new ee(0,0,0),R=0,S=!1,b=null,U=null,P=null,G=null,j=null,ne.set(0,0,i.canvas.width,i.canvas.height),le.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ot,disable:Mt,bindFramebuffer:Xt,drawBuffers:Ft,useProgram:pe,setBlending:ie,setMaterial:jt,setFlipSided:Yt,setCullFace:Lt,setLineWidth:re,setPolygonOffset:mt,setScissorTest:bt,activeTexture:he,bindTexture:ze,unbindTexture:I,compressedTexImage2D:A,compressedTexImage3D:tt,texImage2D:It,texImage3D:gt,updateUBOMapping:Ht,uniformBlockBinding:wt,texStorage2D:ht,texStorage3D:Et,texSubImage2D:lt,texSubImage3D:ct,compressedTexSubImage2D:at,compressedTexSubImage3D:Ut,scissor:Ct,viewport:Qt,reset:de}}function Iy(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Wt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(I,A){return f?new OffscreenCanvas(I,A):Pa("canvas")}function p(I,A,tt){let lt=1;const ct=ze(I);if((ct.width>tt||ct.height>tt)&&(lt=tt/Math.max(ct.width,ct.height)),lt<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const at=Math.floor(lt*ct.width),Ut=Math.floor(lt*ct.height);u===void 0&&(u=m(at,Ut));const ht=A?m(at,Ut):u;return ht.width=at,ht.height=Ut,ht.getContext("2d").drawImage(I,0,0,at,Ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ct.width+"x"+ct.height+") to ("+at+"x"+Ut+")."),ht}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ct.width+"x"+ct.height+")."),I;return I}function x(I){return I.generateMipmaps}function g(I){i.generateMipmap(I)}function M(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(I,A,tt,lt,ct=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let at=A;if(A===i.RED&&(tt===i.FLOAT&&(at=i.R32F),tt===i.HALF_FLOAT&&(at=i.R16F),tt===i.UNSIGNED_BYTE&&(at=i.R8)),A===i.RED_INTEGER&&(tt===i.UNSIGNED_BYTE&&(at=i.R8UI),tt===i.UNSIGNED_SHORT&&(at=i.R16UI),tt===i.UNSIGNED_INT&&(at=i.R32UI),tt===i.BYTE&&(at=i.R8I),tt===i.SHORT&&(at=i.R16I),tt===i.INT&&(at=i.R32I)),A===i.RG&&(tt===i.FLOAT&&(at=i.RG32F),tt===i.HALF_FLOAT&&(at=i.RG16F),tt===i.UNSIGNED_BYTE&&(at=i.RG8)),A===i.RG_INTEGER&&(tt===i.UNSIGNED_BYTE&&(at=i.RG8UI),tt===i.UNSIGNED_SHORT&&(at=i.RG16UI),tt===i.UNSIGNED_INT&&(at=i.RG32UI),tt===i.BYTE&&(at=i.RG8I),tt===i.SHORT&&(at=i.RG16I),tt===i.INT&&(at=i.RG32I)),A===i.RGB_INTEGER&&(tt===i.UNSIGNED_BYTE&&(at=i.RGB8UI),tt===i.UNSIGNED_SHORT&&(at=i.RGB16UI),tt===i.UNSIGNED_INT&&(at=i.RGB32UI),tt===i.BYTE&&(at=i.RGB8I),tt===i.SHORT&&(at=i.RGB16I),tt===i.INT&&(at=i.RGB32I)),A===i.RGBA_INTEGER&&(tt===i.UNSIGNED_BYTE&&(at=i.RGBA8UI),tt===i.UNSIGNED_SHORT&&(at=i.RGBA16UI),tt===i.UNSIGNED_INT&&(at=i.RGBA32UI),tt===i.BYTE&&(at=i.RGBA8I),tt===i.SHORT&&(at=i.RGBA16I),tt===i.INT&&(at=i.RGBA32I)),A===i.RGB&&(tt===i.UNSIGNED_INT_5_9_9_9_REV&&(at=i.RGB9_E5),tt===i.UNSIGNED_INT_10F_11F_11F_REV&&(at=i.R11F_G11F_B10F)),A===i.RGBA){const Ut=ct?Ra:ke.getTransfer(lt);tt===i.FLOAT&&(at=i.RGBA32F),tt===i.HALF_FLOAT&&(at=i.RGBA16F),tt===i.UNSIGNED_BYTE&&(at=Ut===Ge?i.SRGB8_ALPHA8:i.RGBA8),tt===i.UNSIGNED_SHORT_4_4_4_4&&(at=i.RGBA4),tt===i.UNSIGNED_SHORT_5_5_5_1&&(at=i.RGB5_A1)}return(at===i.R16F||at===i.R32F||at===i.RG16F||at===i.RG32F||at===i.RGBA16F||at===i.RGBA32F)&&t.get("EXT_color_buffer_float"),at}function v(I,A){let tt;return I?A===null||A===Is||A===ho?tt=i.DEPTH24_STENCIL8:A===oi?tt=i.DEPTH32F_STENCIL8:A===co&&(tt=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Is||A===ho?tt=i.DEPTH_COMPONENT24:A===oi?tt=i.DEPTH_COMPONENT32F:A===co&&(tt=i.DEPTH_COMPONENT16),tt}function E(I,A){return x(I)===!0||I.isFramebufferTexture&&I.minFilter!==Vn&&I.minFilter!==ri?Math.log2(Math.max(A.width,A.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?A.mipmaps.length:1}function T(I){const A=I.target;A.removeEventListener("dispose",T),R(A),A.isVideoTexture&&h.delete(A)}function w(I){const A=I.target;A.removeEventListener("dispose",w),b(A)}function R(I){const A=n.get(I);if(A.__webglInit===void 0)return;const tt=I.source,lt=d.get(tt);if(lt){const ct=lt[A.__cacheKey];ct.usedTimes--,ct.usedTimes===0&&S(I),Object.keys(lt).length===0&&d.delete(tt)}n.remove(I)}function S(I){const A=n.get(I);i.deleteTexture(A.__webglTexture);const tt=I.source,lt=d.get(tt);delete lt[A.__cacheKey],o.memory.textures--}function b(I){const A=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let lt=0;lt<6;lt++){if(Array.isArray(A.__webglFramebuffer[lt]))for(let ct=0;ct<A.__webglFramebuffer[lt].length;ct++)i.deleteFramebuffer(A.__webglFramebuffer[lt][ct]);else i.deleteFramebuffer(A.__webglFramebuffer[lt]);A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer[lt])}else{if(Array.isArray(A.__webglFramebuffer))for(let lt=0;lt<A.__webglFramebuffer.length;lt++)i.deleteFramebuffer(A.__webglFramebuffer[lt]);else i.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&i.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let lt=0;lt<A.__webglColorRenderbuffer.length;lt++)A.__webglColorRenderbuffer[lt]&&i.deleteRenderbuffer(A.__webglColorRenderbuffer[lt]);A.__webglDepthRenderbuffer&&i.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const tt=I.textures;for(let lt=0,ct=tt.length;lt<ct;lt++){const at=n.get(tt[lt]);at.__webglTexture&&(i.deleteTexture(at.__webglTexture),o.memory.textures--),n.remove(tt[lt])}n.remove(I)}let U=0;function P(){U=0}function G(){const I=U;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),U+=1,I}function j(I){const A=[];return A.push(I.wrapS),A.push(I.wrapT),A.push(I.wrapR||0),A.push(I.magFilter),A.push(I.minFilter),A.push(I.anisotropy),A.push(I.internalFormat),A.push(I.format),A.push(I.type),A.push(I.generateMipmaps),A.push(I.premultiplyAlpha),A.push(I.flipY),A.push(I.unpackAlignment),A.push(I.colorSpace),A.join()}function O(I,A){const tt=n.get(I);if(I.isVideoTexture&&bt(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&tt.__version!==I.version){const lt=I.image;if(lt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(lt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(tt,I,A);return}}else I.isExternalTexture&&(tt.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,tt.__webglTexture,i.TEXTURE0+A)}function B(I,A){const tt=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&tt.__version!==I.version){$(tt,I,A);return}e.bindTexture(i.TEXTURE_2D_ARRAY,tt.__webglTexture,i.TEXTURE0+A)}function K(I,A){const tt=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&tt.__version!==I.version){$(tt,I,A);return}e.bindTexture(i.TEXTURE_3D,tt.__webglTexture,i.TEXTURE0+A)}function q(I,A){const tt=n.get(I);if(I.version>0&&tt.__version!==I.version){ot(tt,I,A);return}e.bindTexture(i.TEXTURE_CUBE_MAP,tt.__webglTexture,i.TEXTURE0+A)}const Y={[Rr]:i.REPEAT,[rs]:i.CLAMP_TO_EDGE,[xc]:i.MIRRORED_REPEAT},H={[Vn]:i.NEAREST,[Tp]:i.NEAREST_MIPMAP_NEAREST,[Io]:i.NEAREST_MIPMAP_LINEAR,[ri]:i.LINEAR,[tl]:i.LINEAR_MIPMAP_NEAREST,[os]:i.LINEAR_MIPMAP_LINEAR},st={[Pp]:i.NEVER,[kp]:i.ALWAYS,[zp]:i.LESS,[Fd]:i.LEQUAL,[Ip]:i.EQUAL,[Up]:i.GEQUAL,[Dp]:i.GREATER,[Lp]:i.NOTEQUAL};function _t(I,A){if(A.type===oi&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===ri||A.magFilter===tl||A.magFilter===Io||A.magFilter===os||A.minFilter===ri||A.minFilter===tl||A.minFilter===Io||A.minFilter===os)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,Y[A.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,Y[A.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,Y[A.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,H[A.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,H[A.minFilter]),A.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,st[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Vn||A.minFilter!==Io&&A.minFilter!==os||A.type===oi&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const tt=t.get("EXT_texture_filter_anisotropic");i.texParameterf(I,tt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function ne(I,A){let tt=!1;I.__webglInit===void 0&&(I.__webglInit=!0,A.addEventListener("dispose",T));const lt=A.source;let ct=d.get(lt);ct===void 0&&(ct={},d.set(lt,ct));const at=j(A);if(at!==I.__cacheKey){ct[at]===void 0&&(ct[at]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,tt=!0),ct[at].usedTimes++;const Ut=ct[I.__cacheKey];Ut!==void 0&&(ct[I.__cacheKey].usedTimes--,Ut.usedTimes===0&&S(A)),I.__cacheKey=at,I.__webglTexture=ct[at].texture}return tt}function le(I,A,tt){return Math.floor(Math.floor(I/tt)/A)}function ut(I,A,tt,lt){const at=I.updateRanges;if(at.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,A.width,A.height,tt,lt,A.data);else{at.sort((gt,Ct)=>gt.start-Ct.start);let Ut=0;for(let gt=1;gt<at.length;gt++){const Ct=at[Ut],Qt=at[gt],Ht=Ct.start+Ct.count,wt=le(Qt.start,A.width,4),de=le(Ct.start,A.width,4);Qt.start<=Ht+1&&wt===de&&le(Qt.start+Qt.count-1,A.width,4)===wt?Ct.count=Math.max(Ct.count,Qt.start+Qt.count-Ct.start):(++Ut,at[Ut]=Qt)}at.length=Ut+1;const ht=i.getParameter(i.UNPACK_ROW_LENGTH),Et=i.getParameter(i.UNPACK_SKIP_PIXELS),It=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,A.width);for(let gt=0,Ct=at.length;gt<Ct;gt++){const Qt=at[gt],Ht=Math.floor(Qt.start/4),wt=Math.ceil(Qt.count/4),de=Ht%A.width,X=Math.floor(Ht/A.width),yt=wt,Tt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,de),i.pixelStorei(i.UNPACK_SKIP_ROWS,X),e.texSubImage2D(i.TEXTURE_2D,0,de,X,yt,Tt,tt,lt,A.data)}I.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ht),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Et),i.pixelStorei(i.UNPACK_SKIP_ROWS,It)}}function $(I,A,tt){let lt=i.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(lt=i.TEXTURE_2D_ARRAY),A.isData3DTexture&&(lt=i.TEXTURE_3D);const ct=ne(I,A),at=A.source;e.bindTexture(lt,I.__webglTexture,i.TEXTURE0+tt);const Ut=n.get(at);if(at.version!==Ut.__version||ct===!0){e.activeTexture(i.TEXTURE0+tt);const ht=ke.getPrimaries(ke.workingColorSpace),Et=A.colorSpace===Li?null:ke.getPrimaries(A.colorSpace),It=A.colorSpace===Li||ht===Et?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);let gt=p(A.image,!1,s.maxTextureSize);gt=he(A,gt);const Ct=r.convert(A.format,A.colorSpace),Qt=r.convert(A.type);let Ht=y(A.internalFormat,Ct,Qt,A.colorSpace,A.isVideoTexture);_t(lt,A);let wt;const de=A.mipmaps,X=A.isVideoTexture!==!0,yt=Ut.__version===void 0||ct===!0,Tt=at.dataReady,Ot=E(A,gt);if(A.isDepthTexture)Ht=v(A.format===fo,A.type),yt&&(X?e.texStorage2D(i.TEXTURE_2D,1,Ht,gt.width,gt.height):e.texImage2D(i.TEXTURE_2D,0,Ht,gt.width,gt.height,0,Ct,Qt,null));else if(A.isDataTexture)if(de.length>0){X&&yt&&e.texStorage2D(i.TEXTURE_2D,Ot,Ht,de[0].width,de[0].height);for(let xt=0,dt=de.length;xt<dt;xt++)wt=de[xt],X?Tt&&e.texSubImage2D(i.TEXTURE_2D,xt,0,0,wt.width,wt.height,Ct,Qt,wt.data):e.texImage2D(i.TEXTURE_2D,xt,Ht,wt.width,wt.height,0,Ct,Qt,wt.data);A.generateMipmaps=!1}else X?(yt&&e.texStorage2D(i.TEXTURE_2D,Ot,Ht,gt.width,gt.height),Tt&&ut(A,gt,Ct,Qt)):e.texImage2D(i.TEXTURE_2D,0,Ht,gt.width,gt.height,0,Ct,Qt,gt.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){X&&yt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ot,Ht,de[0].width,de[0].height,gt.depth);for(let xt=0,dt=de.length;xt<dt;xt++)if(wt=de[xt],A.format!==Gn)if(Ct!==null)if(X){if(Tt)if(A.layerUpdates.size>0){const Gt=Nu(wt.width,wt.height,A.format,A.type);for(const fe of A.layerUpdates){const Be=wt.data.subarray(fe*Gt/wt.data.BYTES_PER_ELEMENT,(fe+1)*Gt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,fe,wt.width,wt.height,1,Ct,Be)}A.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,0,wt.width,wt.height,gt.depth,Ct,wt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,xt,Ht,wt.width,wt.height,gt.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else X?Tt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,0,wt.width,wt.height,gt.depth,Ct,Qt,wt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,xt,Ht,wt.width,wt.height,gt.depth,0,Ct,Qt,wt.data)}else{X&&yt&&e.texStorage2D(i.TEXTURE_2D,Ot,Ht,de[0].width,de[0].height);for(let xt=0,dt=de.length;xt<dt;xt++)wt=de[xt],A.format!==Gn?Ct!==null?X?Tt&&e.compressedTexSubImage2D(i.TEXTURE_2D,xt,0,0,wt.width,wt.height,Ct,wt.data):e.compressedTexImage2D(i.TEXTURE_2D,xt,Ht,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):X?Tt&&e.texSubImage2D(i.TEXTURE_2D,xt,0,0,wt.width,wt.height,Ct,Qt,wt.data):e.texImage2D(i.TEXTURE_2D,xt,Ht,wt.width,wt.height,0,Ct,Qt,wt.data)}else if(A.isDataArrayTexture)if(X){if(yt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ot,Ht,gt.width,gt.height,gt.depth),Tt)if(A.layerUpdates.size>0){const xt=Nu(gt.width,gt.height,A.format,A.type);for(const dt of A.layerUpdates){const Gt=gt.data.subarray(dt*xt/gt.data.BYTES_PER_ELEMENT,(dt+1)*xt/gt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,dt,gt.width,gt.height,1,Ct,Qt,Gt)}A.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,gt.width,gt.height,gt.depth,Ct,Qt,gt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ht,gt.width,gt.height,gt.depth,0,Ct,Qt,gt.data);else if(A.isData3DTexture)X?(yt&&e.texStorage3D(i.TEXTURE_3D,Ot,Ht,gt.width,gt.height,gt.depth),Tt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,gt.width,gt.height,gt.depth,Ct,Qt,gt.data)):e.texImage3D(i.TEXTURE_3D,0,Ht,gt.width,gt.height,gt.depth,0,Ct,Qt,gt.data);else if(A.isFramebufferTexture){if(yt)if(X)e.texStorage2D(i.TEXTURE_2D,Ot,Ht,gt.width,gt.height);else{let xt=gt.width,dt=gt.height;for(let Gt=0;Gt<Ot;Gt++)e.texImage2D(i.TEXTURE_2D,Gt,Ht,xt,dt,0,Ct,Qt,null),xt>>=1,dt>>=1}}else if(de.length>0){if(X&&yt){const xt=ze(de[0]);e.texStorage2D(i.TEXTURE_2D,Ot,Ht,xt.width,xt.height)}for(let xt=0,dt=de.length;xt<dt;xt++)wt=de[xt],X?Tt&&e.texSubImage2D(i.TEXTURE_2D,xt,0,0,Ct,Qt,wt):e.texImage2D(i.TEXTURE_2D,xt,Ht,Ct,Qt,wt);A.generateMipmaps=!1}else if(X){if(yt){const xt=ze(gt);e.texStorage2D(i.TEXTURE_2D,Ot,Ht,xt.width,xt.height)}Tt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Ct,Qt,gt)}else e.texImage2D(i.TEXTURE_2D,0,Ht,Ct,Qt,gt);x(A)&&g(lt),Ut.__version=at.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function ot(I,A,tt){if(A.image.length!==6)return;const lt=ne(I,A),ct=A.source;e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+tt);const at=n.get(ct);if(ct.version!==at.__version||lt===!0){e.activeTexture(i.TEXTURE0+tt);const Ut=ke.getPrimaries(ke.workingColorSpace),ht=A.colorSpace===Li?null:ke.getPrimaries(A.colorSpace),Et=A.colorSpace===Li||Ut===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);const It=A.isCompressedTexture||A.image[0].isCompressedTexture,gt=A.image[0]&&A.image[0].isDataTexture,Ct=[];for(let dt=0;dt<6;dt++)!It&&!gt?Ct[dt]=p(A.image[dt],!0,s.maxCubemapSize):Ct[dt]=gt?A.image[dt].image:A.image[dt],Ct[dt]=he(A,Ct[dt]);const Qt=Ct[0],Ht=r.convert(A.format,A.colorSpace),wt=r.convert(A.type),de=y(A.internalFormat,Ht,wt,A.colorSpace),X=A.isVideoTexture!==!0,yt=at.__version===void 0||lt===!0,Tt=ct.dataReady;let Ot=E(A,Qt);_t(i.TEXTURE_CUBE_MAP,A);let xt;if(It){X&&yt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ot,de,Qt.width,Qt.height);for(let dt=0;dt<6;dt++){xt=Ct[dt].mipmaps;for(let Gt=0;Gt<xt.length;Gt++){const fe=xt[Gt];A.format!==Gn?Ht!==null?X?Tt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Gt,0,0,fe.width,fe.height,Ht,fe.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Gt,de,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?Tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Gt,0,0,fe.width,fe.height,Ht,wt,fe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Gt,de,fe.width,fe.height,0,Ht,wt,fe.data)}}}else{if(xt=A.mipmaps,X&&yt){xt.length>0&&Ot++;const dt=ze(Ct[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ot,de,dt.width,dt.height)}for(let dt=0;dt<6;dt++)if(gt){X?Tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,Ct[dt].width,Ct[dt].height,Ht,wt,Ct[dt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,de,Ct[dt].width,Ct[dt].height,0,Ht,wt,Ct[dt].data);for(let Gt=0;Gt<xt.length;Gt++){const Be=xt[Gt].image[dt].image;X?Tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Gt+1,0,0,Be.width,Be.height,Ht,wt,Be.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Gt+1,de,Be.width,Be.height,0,Ht,wt,Be.data)}}else{X?Tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,Ht,wt,Ct[dt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,de,Ht,wt,Ct[dt]);for(let Gt=0;Gt<xt.length;Gt++){const fe=xt[Gt];X?Tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Gt+1,0,0,Ht,wt,fe.image[dt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Gt+1,de,Ht,wt,fe.image[dt])}}}x(A)&&g(i.TEXTURE_CUBE_MAP),at.__version=ct.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function Mt(I,A,tt,lt,ct,at){const Ut=r.convert(tt.format,tt.colorSpace),ht=r.convert(tt.type),Et=y(tt.internalFormat,Ut,ht,tt.colorSpace),It=n.get(A),gt=n.get(tt);if(gt.__renderTarget=A,!It.__hasExternalTextures){const Ct=Math.max(1,A.width>>at),Qt=Math.max(1,A.height>>at);ct===i.TEXTURE_3D||ct===i.TEXTURE_2D_ARRAY?e.texImage3D(ct,at,Et,Ct,Qt,A.depth,0,Ut,ht,null):e.texImage2D(ct,at,Et,Ct,Qt,0,Ut,ht,null)}e.bindFramebuffer(i.FRAMEBUFFER,I),mt(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,lt,ct,gt.__webglTexture,0,re(A)):(ct===i.TEXTURE_2D||ct>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ct<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,lt,ct,gt.__webglTexture,at),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Xt(I,A,tt){if(i.bindRenderbuffer(i.RENDERBUFFER,I),A.depthBuffer){const lt=A.depthTexture,ct=lt&&lt.isDepthTexture?lt.type:null,at=v(A.stencilBuffer,ct),Ut=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=re(A);mt(A)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht,at,A.width,A.height):tt?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,at,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,at,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ut,i.RENDERBUFFER,I)}else{const lt=A.textures;for(let ct=0;ct<lt.length;ct++){const at=lt[ct],Ut=r.convert(at.format,at.colorSpace),ht=r.convert(at.type),Et=y(at.internalFormat,Ut,ht,at.colorSpace),It=re(A);tt&&mt(A)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,It,Et,A.width,A.height):mt(A)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,It,Et,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,Et,A.width,A.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ft(I,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,I),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const lt=n.get(A.depthTexture);lt.__renderTarget=A,(!lt.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),O(A.depthTexture,0);const ct=lt.__webglTexture,at=re(A);if(A.depthTexture.format===uo)mt(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ct,0,at):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ct,0);else if(A.depthTexture.format===fo)mt(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ct,0,at):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ct,0);else throw new Error("Unknown depthTexture format")}function pe(I){const A=n.get(I),tt=I.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==I.depthTexture){const lt=I.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),lt){const ct=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,lt.removeEventListener("dispose",ct)};lt.addEventListener("dispose",ct),A.__depthDisposeCallback=ct}A.__boundDepthTexture=lt}if(I.depthTexture&&!A.__autoAllocateDepthBuffer){if(tt)throw new Error("target.depthTexture not supported in Cube render targets");const lt=I.texture.mipmaps;lt&&lt.length>0?Ft(A.__webglFramebuffer[0],I):Ft(A.__webglFramebuffer,I)}else if(tt){A.__webglDepthbuffer=[];for(let lt=0;lt<6;lt++)if(e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[lt]),A.__webglDepthbuffer[lt]===void 0)A.__webglDepthbuffer[lt]=i.createRenderbuffer(),Xt(A.__webglDepthbuffer[lt],I,!1);else{const ct=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=A.__webglDepthbuffer[lt];i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,ct,i.RENDERBUFFER,at)}}else{const lt=I.texture.mipmaps;if(lt&&lt.length>0?e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=i.createRenderbuffer(),Xt(A.__webglDepthbuffer,I,!1);else{const ct=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=A.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,ct,i.RENDERBUFFER,at)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function we(I,A,tt){const lt=n.get(I);A!==void 0&&Mt(lt.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),tt!==void 0&&pe(I)}function D(I){const A=I.texture,tt=n.get(I),lt=n.get(A);I.addEventListener("dispose",w);const ct=I.textures,at=I.isWebGLCubeRenderTarget===!0,Ut=ct.length>1;if(Ut||(lt.__webglTexture===void 0&&(lt.__webglTexture=i.createTexture()),lt.__version=A.version,o.memory.textures++),at){tt.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(A.mipmaps&&A.mipmaps.length>0){tt.__webglFramebuffer[ht]=[];for(let Et=0;Et<A.mipmaps.length;Et++)tt.__webglFramebuffer[ht][Et]=i.createFramebuffer()}else tt.__webglFramebuffer[ht]=i.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){tt.__webglFramebuffer=[];for(let ht=0;ht<A.mipmaps.length;ht++)tt.__webglFramebuffer[ht]=i.createFramebuffer()}else tt.__webglFramebuffer=i.createFramebuffer();if(Ut)for(let ht=0,Et=ct.length;ht<Et;ht++){const It=n.get(ct[ht]);It.__webglTexture===void 0&&(It.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&mt(I)===!1){tt.__webglMultisampledFramebuffer=i.createFramebuffer(),tt.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,tt.__webglMultisampledFramebuffer);for(let ht=0;ht<ct.length;ht++){const Et=ct[ht];tt.__webglColorRenderbuffer[ht]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,tt.__webglColorRenderbuffer[ht]);const It=r.convert(Et.format,Et.colorSpace),gt=r.convert(Et.type),Ct=y(Et.internalFormat,It,gt,Et.colorSpace,I.isXRRenderTarget===!0),Qt=re(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,Qt,Ct,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,tt.__webglColorRenderbuffer[ht])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(tt.__webglDepthRenderbuffer=i.createRenderbuffer(),Xt(tt.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(at){e.bindTexture(i.TEXTURE_CUBE_MAP,lt.__webglTexture),_t(i.TEXTURE_CUBE_MAP,A);for(let ht=0;ht<6;ht++)if(A.mipmaps&&A.mipmaps.length>0)for(let Et=0;Et<A.mipmaps.length;Et++)Mt(tt.__webglFramebuffer[ht][Et],I,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Et);else Mt(tt.__webglFramebuffer[ht],I,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);x(A)&&g(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ut){for(let ht=0,Et=ct.length;ht<Et;ht++){const It=ct[ht],gt=n.get(It);let Ct=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Ct=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Ct,gt.__webglTexture),_t(Ct,It),Mt(tt.__webglFramebuffer,I,It,i.COLOR_ATTACHMENT0+ht,Ct,0),x(It)&&g(Ct)}e.unbindTexture()}else{let ht=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ht=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,lt.__webglTexture),_t(ht,A),A.mipmaps&&A.mipmaps.length>0)for(let Et=0;Et<A.mipmaps.length;Et++)Mt(tt.__webglFramebuffer[Et],I,A,i.COLOR_ATTACHMENT0,ht,Et);else Mt(tt.__webglFramebuffer,I,A,i.COLOR_ATTACHMENT0,ht,0);x(A)&&g(ht),e.unbindTexture()}I.depthBuffer&&pe(I)}function ie(I){const A=I.textures;for(let tt=0,lt=A.length;tt<lt;tt++){const ct=A[tt];if(x(ct)){const at=M(I),Ut=n.get(ct).__webglTexture;e.bindTexture(at,Ut),g(at),e.unbindTexture()}}}const jt=[],Yt=[];function Lt(I){if(I.samples>0){if(mt(I)===!1){const A=I.textures,tt=I.width,lt=I.height;let ct=i.COLOR_BUFFER_BIT;const at=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ut=n.get(I),ht=A.length>1;if(ht)for(let It=0;It<A.length;It++)e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer);const Et=I.texture.mipmaps;Et&&Et.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer);for(let It=0;It<A.length;It++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ct|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ct|=i.STENCIL_BUFFER_BIT)),ht){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ut.__webglColorRenderbuffer[It]);const gt=n.get(A[It]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,gt,0)}i.blitFramebuffer(0,0,tt,lt,0,0,tt,lt,ct,i.NEAREST),l===!0&&(jt.length=0,Yt.length=0,jt.push(i.COLOR_ATTACHMENT0+It),I.depthBuffer&&I.resolveDepthBuffer===!1&&(jt.push(at),Yt.push(at),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Yt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,jt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ht)for(let It=0;It<A.length;It++){e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.RENDERBUFFER,Ut.__webglColorRenderbuffer[It]);const gt=n.get(A[It]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.TEXTURE_2D,gt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const A=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[A])}}}function re(I){return Math.min(s.maxSamples,I.samples)}function mt(I){const A=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function bt(I){const A=o.render.frame;h.get(I)!==A&&(h.set(I,A),I.update())}function he(I,A){const tt=I.colorSpace,lt=I.format,ct=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||tt!==Cr&&tt!==Li&&(ke.getTransfer(tt)===Ge?(lt!==Gn||ct!==vi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",tt)),A}function ze(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=P,this.setTexture2D=O,this.setTexture2DArray=B,this.setTexture3D=K,this.setTextureCube=q,this.rebindTextures=we,this.setupRenderTarget=D,this.updateRenderTargetMipmap=ie,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=mt}function Dy(i,t){function e(n,s=Li){let r;const o=ke.getTransfer(s);if(n===vi)return i.UNSIGNED_BYTE;if(n===sh)return i.UNSIGNED_SHORT_4_4_4_4;if(n===rh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Dd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ld)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===zd)return i.BYTE;if(n===Id)return i.SHORT;if(n===co)return i.UNSIGNED_SHORT;if(n===ih)return i.INT;if(n===Is)return i.UNSIGNED_INT;if(n===oi)return i.FLOAT;if(n===_o)return i.HALF_FLOAT;if(n===Ud)return i.ALPHA;if(n===kd)return i.RGB;if(n===Gn)return i.RGBA;if(n===uo)return i.DEPTH_COMPONENT;if(n===fo)return i.DEPTH_STENCIL;if(n===oh)return i.RED;if(n===ah)return i.RED_INTEGER;if(n===Nd)return i.RG;if(n===lh)return i.RG_INTEGER;if(n===ch)return i.RGBA_INTEGER;if(n===ba||n===Sa||n===wa||n===Ea)if(o===Ge)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ba)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ba)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Sa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===wa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ea)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===vc||n===yc||n===Mc||n===_c)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===vc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===yc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Mc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_c)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===bc||n===Sc||n===wc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===bc||n===Sc)return o===Ge?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===wc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ec||n===Tc||n===Ac||n===Rc||n===Cc||n===Pc||n===zc||n===Ic||n===Dc||n===Lc||n===Uc||n===kc||n===Nc||n===Fc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ec)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Tc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ac)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Rc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Cc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Pc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===zc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ic)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Dc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Lc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Uc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===kc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Nc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Oc||n===Bc||n===Hc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Oc)return o===Ge?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Bc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Hc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Gc||n===Vc||n===Wc||n===Xc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Gc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Vc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Wc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ho?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const Ly=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Uy=`
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

}`;class ky{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Zd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Zn({vertexShader:Ly,fragmentShader:Uy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Jt(new Ni(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ny extends Ir{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null;const p=typeof XRWebGLBinding<"u",x=new ky,g={},M=e.getContextAttributes();let y=null,v=null;const E=[],T=[],w=new Wt;let R=null;const S=new kn;S.viewport=new Le;const b=new kn;b.viewport=new Le;const U=[S,b],P=new sg;let G=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ot=E[$];return ot===void 0&&(ot=new _l,E[$]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function($){let ot=E[$];return ot===void 0&&(ot=new _l,E[$]=ot),ot.getGripSpace()},this.getHand=function($){let ot=E[$];return ot===void 0&&(ot=new _l,E[$]=ot),ot.getHandSpace()};function O($){const ot=T.indexOf($.inputSource);if(ot===-1)return;const Mt=E[ot];Mt!==void 0&&(Mt.update($.inputSource,$.frame,c||o),Mt.dispatchEvent({type:$.type,data:$.inputSource}))}function B(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",K);for(let $=0;$<E.length;$++){const ot=T[$];ot!==null&&(T[$]=null,E[$].disconnect(ot))}G=null,j=null,x.reset();for(const $ in g)delete g[$];t.setRenderTarget(y),f=null,d=null,u=null,s=null,v=null,ut.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&p&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",B),s.addEventListener("inputsourceschange",K),M.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(w),p&&"createProjectionLayer"in XRWebGLBinding.prototype){let Mt=null,Xt=null,Ft=null;M.depth&&(Ft=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Mt=M.stencil?fo:uo,Xt=M.stencil?ho:Is);const pe={colorFormat:e.RGBA8,depthFormat:Ft,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(pe),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),v=new us(d.textureWidth,d.textureHeight,{format:Gn,type:vi,depthTexture:new Yd(d.textureWidth,d.textureHeight,Xt,void 0,void 0,void 0,void 0,void 0,void 0,Mt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Mt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,Mt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new us(f.framebufferWidth,f.framebufferHeight,{format:Gn,type:vi,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ut.setContext(s),ut.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function K($){for(let ot=0;ot<$.removed.length;ot++){const Mt=$.removed[ot],Xt=T.indexOf(Mt);Xt>=0&&(T[Xt]=null,E[Xt].disconnect(Mt))}for(let ot=0;ot<$.added.length;ot++){const Mt=$.added[ot];let Xt=T.indexOf(Mt);if(Xt===-1){for(let pe=0;pe<E.length;pe++)if(pe>=T.length){T.push(Mt),Xt=pe;break}else if(T[pe]===null){T[pe]=Mt,Xt=pe;break}if(Xt===-1)break}const Ft=E[Xt];Ft&&Ft.connect(Mt)}}const q=new L,Y=new L;function H($,ot,Mt){q.setFromMatrixPosition(ot.matrixWorld),Y.setFromMatrixPosition(Mt.matrixWorld);const Xt=q.distanceTo(Y),Ft=ot.projectionMatrix.elements,pe=Mt.projectionMatrix.elements,we=Ft[14]/(Ft[10]-1),D=Ft[14]/(Ft[10]+1),ie=(Ft[9]+1)/Ft[5],jt=(Ft[9]-1)/Ft[5],Yt=(Ft[8]-1)/Ft[0],Lt=(pe[8]+1)/pe[0],re=we*Yt,mt=we*Lt,bt=Xt/(-Yt+Lt),he=bt*-Yt;if(ot.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(he),$.translateZ(bt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ft[10]===-1)$.projectionMatrix.copy(ot.projectionMatrix),$.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{const ze=we+bt,I=D+bt,A=re-he,tt=mt+(Xt-he),lt=ie*D/I*ze,ct=jt*D/I*ze;$.projectionMatrix.makePerspective(A,tt,lt,ct,ze,I),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function st($,ot){ot===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ot.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let ot=$.near,Mt=$.far;x.texture!==null&&(x.depthNear>0&&(ot=x.depthNear),x.depthFar>0&&(Mt=x.depthFar)),P.near=b.near=S.near=ot,P.far=b.far=S.far=Mt,(G!==P.near||j!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),G=P.near,j=P.far),P.layers.mask=$.layers.mask|6,S.layers.mask=P.layers.mask&3,b.layers.mask=P.layers.mask&5;const Xt=$.parent,Ft=P.cameras;st(P,Xt);for(let pe=0;pe<Ft.length;pe++)st(Ft[pe],Xt);Ft.length===2?H(P,S,b):P.projectionMatrix.copy(S.projectionMatrix),_t($,P,Xt)};function _t($,ot,Mt){Mt===null?$.matrix.copy(ot.matrixWorld):($.matrix.copy(Mt.matrixWorld),$.matrix.invert(),$.matrix.multiply(ot.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ot.projectionMatrix),$.projectionMatrixInverse.copy(ot.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=po*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(P)},this.getCameraTexture=function($){return g[$]};let ne=null;function le($,ot){if(h=ot.getViewerPose(c||o),m=ot,h!==null){const Mt=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let Xt=!1;Mt.length!==P.cameras.length&&(P.cameras.length=0,Xt=!0);for(let D=0;D<Mt.length;D++){const ie=Mt[D];let jt=null;if(f!==null)jt=f.getViewport(ie);else{const Lt=u.getViewSubImage(d,ie);jt=Lt.viewport,D===0&&(t.setRenderTargetTextures(v,Lt.colorTexture,Lt.depthStencilTexture),t.setRenderTarget(v))}let Yt=U[D];Yt===void 0&&(Yt=new kn,Yt.layers.enable(D),Yt.viewport=new Le,U[D]=Yt),Yt.matrix.fromArray(ie.transform.matrix),Yt.matrix.decompose(Yt.position,Yt.quaternion,Yt.scale),Yt.projectionMatrix.fromArray(ie.projectionMatrix),Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),Yt.viewport.set(jt.x,jt.y,jt.width,jt.height),D===0&&(P.matrix.copy(Yt.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Xt===!0&&P.cameras.push(Yt)}const Ft=s.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&p){u=n.getBinding();const D=u.getDepthInformation(Mt[0]);D&&D.isValid&&D.texture&&x.init(D,s.renderState)}if(Ft&&Ft.includes("camera-access")&&p){t.state.unbindTexture(),u=n.getBinding();for(let D=0;D<Mt.length;D++){const ie=Mt[D].camera;if(ie){let jt=g[ie];jt||(jt=new Zd,g[ie]=jt);const Yt=u.getCameraImage(ie);jt.sourceTexture=Yt}}}}for(let Mt=0;Mt<E.length;Mt++){const Xt=T[Mt],Ft=E[Mt];Xt!==null&&Ft!==void 0&&Ft.update(Xt,ot,c||o)}ne&&ne($,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),m=null}const ut=new nf;ut.setAnimationLoop(le),this.setAnimationLoop=function($){ne=$},this.dispose=function(){}}}const ws=new yi,Fy=new ue;function Oy(i,t){function e(x,g){x.matrixAutoUpdate===!0&&x.updateMatrix(),g.value.copy(x.matrix)}function n(x,g){g.color.getRGB(x.fogColor.value,Vd(i)),g.isFog?(x.fogNear.value=g.near,x.fogFar.value=g.far):g.isFogExp2&&(x.fogDensity.value=g.density)}function s(x,g,M,y,v){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(x,g):g.isMeshToonMaterial?(r(x,g),u(x,g)):g.isMeshPhongMaterial?(r(x,g),h(x,g)):g.isMeshStandardMaterial?(r(x,g),d(x,g),g.isMeshPhysicalMaterial&&f(x,g,v)):g.isMeshMatcapMaterial?(r(x,g),m(x,g)):g.isMeshDepthMaterial?r(x,g):g.isMeshDistanceMaterial?(r(x,g),p(x,g)):g.isMeshNormalMaterial?r(x,g):g.isLineBasicMaterial?(o(x,g),g.isLineDashedMaterial&&a(x,g)):g.isPointsMaterial?l(x,g,M,y):g.isSpriteMaterial?c(x,g):g.isShadowMaterial?(x.color.value.copy(g.color),x.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(x,g){x.opacity.value=g.opacity,g.color&&x.diffuse.value.copy(g.color),g.emissive&&x.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(x.map.value=g.map,e(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,e(g.alphaMap,x.alphaMapTransform)),g.bumpMap&&(x.bumpMap.value=g.bumpMap,e(g.bumpMap,x.bumpMapTransform),x.bumpScale.value=g.bumpScale,g.side===In&&(x.bumpScale.value*=-1)),g.normalMap&&(x.normalMap.value=g.normalMap,e(g.normalMap,x.normalMapTransform),x.normalScale.value.copy(g.normalScale),g.side===In&&x.normalScale.value.negate()),g.displacementMap&&(x.displacementMap.value=g.displacementMap,e(g.displacementMap,x.displacementMapTransform),x.displacementScale.value=g.displacementScale,x.displacementBias.value=g.displacementBias),g.emissiveMap&&(x.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,x.emissiveMapTransform)),g.specularMap&&(x.specularMap.value=g.specularMap,e(g.specularMap,x.specularMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest);const M=t.get(g),y=M.envMap,v=M.envMapRotation;y&&(x.envMap.value=y,ws.copy(v),ws.x*=-1,ws.y*=-1,ws.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ws.y*=-1,ws.z*=-1),x.envMapRotation.value.setFromMatrix4(Fy.makeRotationFromEuler(ws)),x.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=g.reflectivity,x.ior.value=g.ior,x.refractionRatio.value=g.refractionRatio),g.lightMap&&(x.lightMap.value=g.lightMap,x.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,x.lightMapTransform)),g.aoMap&&(x.aoMap.value=g.aoMap,x.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,x.aoMapTransform))}function o(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,g.map&&(x.map.value=g.map,e(g.map,x.mapTransform))}function a(x,g){x.dashSize.value=g.dashSize,x.totalSize.value=g.dashSize+g.gapSize,x.scale.value=g.scale}function l(x,g,M,y){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.size.value=g.size*M,x.scale.value=y*.5,g.map&&(x.map.value=g.map,e(g.map,x.uvTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,e(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function c(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.rotation.value=g.rotation,g.map&&(x.map.value=g.map,e(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,e(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function h(x,g){x.specular.value.copy(g.specular),x.shininess.value=Math.max(g.shininess,1e-4)}function u(x,g){g.gradientMap&&(x.gradientMap.value=g.gradientMap)}function d(x,g){x.metalness.value=g.metalness,g.metalnessMap&&(x.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,x.metalnessMapTransform)),x.roughness.value=g.roughness,g.roughnessMap&&(x.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,x.roughnessMapTransform)),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)}function f(x,g,M){x.ior.value=g.ior,g.sheen>0&&(x.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),x.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(x.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,x.sheenColorMapTransform)),g.sheenRoughnessMap&&(x.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,x.sheenRoughnessMapTransform))),g.clearcoat>0&&(x.clearcoat.value=g.clearcoat,x.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(x.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,x.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(x.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===In&&x.clearcoatNormalScale.value.negate())),g.dispersion>0&&(x.dispersion.value=g.dispersion),g.iridescence>0&&(x.iridescence.value=g.iridescence,x.iridescenceIOR.value=g.iridescenceIOR,x.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(x.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,x.iridescenceMapTransform)),g.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),g.transmission>0&&(x.transmission.value=g.transmission,x.transmissionSamplerMap.value=M.texture,x.transmissionSamplerSize.value.set(M.width,M.height),g.transmissionMap&&(x.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,x.transmissionMapTransform)),x.thickness.value=g.thickness,g.thicknessMap&&(x.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=g.attenuationDistance,x.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(x.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(x.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=g.specularIntensity,x.specularColor.value.copy(g.specularColor),g.specularColorMap&&(x.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,x.specularColorMapTransform)),g.specularIntensityMap&&(x.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,x.specularIntensityMapTransform))}function m(x,g){g.matcap&&(x.matcap.value=g.matcap)}function p(x,g){const M=t.get(g).light;x.referencePosition.value.setFromMatrixPosition(M.matrixWorld),x.nearDistance.value=M.shadow.camera.near,x.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function By(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,y){const v=y.program;n.uniformBlockBinding(M,v)}function c(M,y){let v=s[M.id];v===void 0&&(m(M),v=h(M),s[M.id]=v,M.addEventListener("dispose",x));const E=y.program;n.updateUBOMapping(M,E);const T=t.render.frame;r[M.id]!==T&&(d(M),r[M.id]=T)}function h(M){const y=u();M.__bindingPointIndex=y;const v=i.createBuffer(),E=M.__size,T=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,E,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,v),v}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const y=s[M.id],v=M.uniforms,E=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let T=0,w=v.length;T<w;T++){const R=Array.isArray(v[T])?v[T]:[v[T]];for(let S=0,b=R.length;S<b;S++){const U=R[S];if(f(U,T,S,E)===!0){const P=U.__offset,G=Array.isArray(U.value)?U.value:[U.value];let j=0;for(let O=0;O<G.length;O++){const B=G[O],K=p(B);typeof B=="number"||typeof B=="boolean"?(U.__data[0]=B,i.bufferSubData(i.UNIFORM_BUFFER,P+j,U.__data)):B.isMatrix3?(U.__data[0]=B.elements[0],U.__data[1]=B.elements[1],U.__data[2]=B.elements[2],U.__data[3]=0,U.__data[4]=B.elements[3],U.__data[5]=B.elements[4],U.__data[6]=B.elements[5],U.__data[7]=0,U.__data[8]=B.elements[6],U.__data[9]=B.elements[7],U.__data[10]=B.elements[8],U.__data[11]=0):(B.toArray(U.__data,j),j+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,P,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,y,v,E){const T=M.value,w=y+"_"+v;if(E[w]===void 0)return typeof T=="number"||typeof T=="boolean"?E[w]=T:E[w]=T.clone(),!0;{const R=E[w];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return E[w]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function m(M){const y=M.uniforms;let v=0;const E=16;for(let w=0,R=y.length;w<R;w++){const S=Array.isArray(y[w])?y[w]:[y[w]];for(let b=0,U=S.length;b<U;b++){const P=S[b],G=Array.isArray(P.value)?P.value:[P.value];for(let j=0,O=G.length;j<O;j++){const B=G[j],K=p(B),q=v%E,Y=q%K.boundary,H=q+Y;v+=Y,H!==0&&E-H<K.storage&&(v+=E-H),P.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=v,v+=K.storage}}}const T=v%E;return T>0&&(v+=E-T),M.__size=v,M.__cache={},this}function p(M){const y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),y}function x(M){const y=M.target;y.removeEventListener("dispose",x);const v=o.indexOf(y.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function g(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:l,update:c,dispose:g}}class Hy{constructor(t={}){const{canvas:e=Qp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const m=new Uint32Array(4),p=new Int32Array(4);let x=null,g=null;const M=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=cs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let E=!1;this._outputColorSpace=Un;let T=0,w=0,R=null,S=-1,b=null;const U=new Le,P=new Le;let G=null;const j=new ee(0);let O=0,B=e.width,K=e.height,q=1,Y=null,H=null;const st=new Le(0,0,B,K),_t=new Le(0,0,B,K);let ne=!1;const le=new xh;let ut=!1,$=!1;const ot=new ue,Mt=new L,Xt=new Le,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pe=!1;function we(){return R===null?q:1}let D=n;function ie(C,J){return e.getContext(C,J)}try{const C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${nh}`),e.addEventListener("webglcontextlost",Tt,!1),e.addEventListener("webglcontextrestored",Ot,!1),e.addEventListener("webglcontextcreationerror",xt,!1),D===null){const J="webgl2";if(D=ie(J,C),D===null)throw ie(J)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let jt,Yt,Lt,re,mt,bt,he,ze,I,A,tt,lt,ct,at,Ut,ht,Et,It,gt,Ct,Qt,Ht,wt,de;function X(){jt=new Kx(D),jt.init(),Ht=new Dy(D,jt),Yt=new Wx(D,jt,t,Ht),Lt=new zy(D,jt),Yt.reversedDepthBuffer&&d&&Lt.buffers.depth.setReversed(!0),re=new tv(D),mt=new vy,bt=new Iy(D,jt,Lt,mt,Yt,Ht,re),he=new qx(v),ze=new jx(v),I=new og(D),wt=new Gx(D,I),A=new Jx(D,I,re,wt),tt=new nv(D,A,I,re),gt=new ev(D,Yt,bt),ht=new Xx(mt),lt=new xy(v,he,ze,jt,Yt,wt,ht),ct=new Oy(v,mt),at=new My,Ut=new Ty(jt),It=new Hx(v,he,ze,Lt,tt,f,l),Et=new Cy(v,tt,Yt),de=new By(D,re,Yt,Lt),Ct=new Vx(D,jt,re),Qt=new Qx(D,jt,re),re.programs=lt.programs,v.capabilities=Yt,v.extensions=jt,v.properties=mt,v.renderLists=at,v.shadowMap=Et,v.state=Lt,v.info=re}X();const yt=new Ny(v,D);this.xr=yt,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const C=jt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=jt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(C){C!==void 0&&(q=C,this.setSize(B,K,!1))},this.getSize=function(C){return C.set(B,K)},this.setSize=function(C,J,et=!0){if(yt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=C,K=J,e.width=Math.floor(C*q),e.height=Math.floor(J*q),et===!0&&(e.style.width=C+"px",e.style.height=J+"px"),this.setViewport(0,0,C,J)},this.getDrawingBufferSize=function(C){return C.set(B*q,K*q).floor()},this.setDrawingBufferSize=function(C,J,et){B=C,K=J,q=et,e.width=Math.floor(C*et),e.height=Math.floor(J*et),this.setViewport(0,0,C,J)},this.getCurrentViewport=function(C){return C.copy(U)},this.getViewport=function(C){return C.copy(st)},this.setViewport=function(C,J,et,nt){C.isVector4?st.set(C.x,C.y,C.z,C.w):st.set(C,J,et,nt),Lt.viewport(U.copy(st).multiplyScalar(q).round())},this.getScissor=function(C){return C.copy(_t)},this.setScissor=function(C,J,et,nt){C.isVector4?_t.set(C.x,C.y,C.z,C.w):_t.set(C,J,et,nt),Lt.scissor(P.copy(_t).multiplyScalar(q).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(C){Lt.setScissorTest(ne=C)},this.setOpaqueSort=function(C){Y=C},this.setTransparentSort=function(C){H=C},this.getClearColor=function(C){return C.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor(...arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha(...arguments)},this.clear=function(C=!0,J=!0,et=!0){let nt=0;if(C){let Q=!1;if(R!==null){const vt=R.texture.format;Q=vt===ch||vt===lh||vt===ah}if(Q){const vt=R.texture.type,Pt=vt===vi||vt===Is||vt===co||vt===ho||vt===sh||vt===rh,Bt=It.getClearColor(),kt=It.getClearAlpha(),oe=Bt.r,$t=Bt.g,qt=Bt.b;Pt?(m[0]=oe,m[1]=$t,m[2]=qt,m[3]=kt,D.clearBufferuiv(D.COLOR,0,m)):(p[0]=oe,p[1]=$t,p[2]=qt,p[3]=kt,D.clearBufferiv(D.COLOR,0,p))}else nt|=D.COLOR_BUFFER_BIT}J&&(nt|=D.DEPTH_BUFFER_BIT),et&&(nt|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Tt,!1),e.removeEventListener("webglcontextrestored",Ot,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),It.dispose(),at.dispose(),Ut.dispose(),mt.dispose(),he.dispose(),ze.dispose(),tt.dispose(),wt.dispose(),de.dispose(),lt.dispose(),yt.dispose(),yt.removeEventListener("sessionstart",vn),yt.removeEventListener("sessionend",Lr),ai.stop()};function Tt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function Ot(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const C=re.autoReset,J=Et.enabled,et=Et.autoUpdate,nt=Et.needsUpdate,Q=Et.type;X(),re.autoReset=C,Et.enabled=J,Et.autoUpdate=et,Et.needsUpdate=nt,Et.type=Q}function xt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function dt(C){const J=C.target;J.removeEventListener("dispose",dt),Gt(J)}function Gt(C){fe(C),mt.remove(C)}function fe(C){const J=mt.get(C).programs;J!==void 0&&(J.forEach(function(et){lt.releaseProgram(et)}),C.isShaderMaterial&&lt.releaseShaderCache(C))}this.renderBufferDirect=function(C,J,et,nt,Q,vt){J===null&&(J=Ft);const Pt=Q.isMesh&&Q.matrixWorld.determinant()<0,Bt=kr(C,J,et,nt,Q);Lt.setMaterial(nt,Pt);let kt=et.index,oe=1;if(nt.wireframe===!0){if(kt=A.getWireframeAttribute(et),kt===void 0)return;oe=2}const $t=et.drawRange,qt=et.attributes.position;let Ee=$t.start*oe,Ne=($t.start+$t.count)*oe;vt!==null&&(Ee=Math.max(Ee,vt.start*oe),Ne=Math.min(Ne,(vt.start+vt.count)*oe)),kt!==null?(Ee=Math.max(Ee,0),Ne=Math.min(Ne,kt.count)):qt!=null&&(Ee=Math.max(Ee,0),Ne=Math.min(Ne,qt.count));const Ze=Ne-Ee;if(Ze<0||Ze===1/0)return;wt.setup(Q,nt,Bt,et,kt);let We,Ie=Ct;if(kt!==null&&(We=I.get(kt),Ie=Qt,Ie.setIndex(We)),Q.isMesh)nt.wireframe===!0?(Lt.setLineWidth(nt.wireframeLinewidth*we()),Ie.setMode(D.LINES)):Ie.setMode(D.TRIANGLES);else if(Q.isLine){let Kt=nt.linewidth;Kt===void 0&&(Kt=1),Lt.setLineWidth(Kt*we()),Q.isLineSegments?Ie.setMode(D.LINES):Q.isLineLoop?Ie.setMode(D.LINE_LOOP):Ie.setMode(D.LINE_STRIP)}else Q.isPoints?Ie.setMode(D.POINTS):Q.isSprite&&Ie.setMode(D.TRIANGLES);if(Q.isBatchedMesh)if(Q._multiDrawInstances!==null)mo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ie.renderMultiDrawInstances(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount,Q._multiDrawInstances);else if(jt.get("WEBGL_multi_draw"))Ie.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{const Kt=Q._multiDrawStarts,De=Q._multiDrawCounts,Te=Q._multiDrawCount,yn=kt?I.get(kt).bytesPerElement:1,wi=mt.get(nt).currentProgram.getUniforms();for(let Mn=0;Mn<Te;Mn++)wi.setValue(D,"_gl_DrawID",Mn),Ie.render(Kt[Mn]/yn,De[Mn])}else if(Q.isInstancedMesh)Ie.renderInstances(Ee,Ze,Q.count);else if(et.isInstancedBufferGeometry){const Kt=et._maxInstanceCount!==void 0?et._maxInstanceCount:1/0,De=Math.min(et.instanceCount,Kt);Ie.renderInstances(Ee,Ze,De)}else Ie.render(Ee,Ze)};function Be(C,J,et){C.transparent===!0&&C.side===Ce&&C.forceSinglePass===!1?(C.side=In,C.needsUpdate=!0,li(C,J,et),C.side=Hi,C.needsUpdate=!0,li(C,J,et),C.side=Ce):li(C,J,et)}this.compile=function(C,J,et=null){et===null&&(et=C),g=Ut.get(et),g.init(J),y.push(g),et.traverseVisible(function(Q){Q.isLight&&Q.layers.test(J.layers)&&(g.pushLight(Q),Q.castShadow&&g.pushShadow(Q))}),C!==et&&C.traverseVisible(function(Q){Q.isLight&&Q.layers.test(J.layers)&&(g.pushLight(Q),Q.castShadow&&g.pushShadow(Q))}),g.setupLights();const nt=new Set;return C.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;const vt=Q.material;if(vt)if(Array.isArray(vt))for(let Pt=0;Pt<vt.length;Pt++){const Bt=vt[Pt];Be(Bt,et,Q),nt.add(Bt)}else Be(vt,et,Q),nt.add(vt)}),g=y.pop(),nt},this.compileAsync=function(C,J,et=null){const nt=this.compile(C,J,et);return new Promise(Q=>{function vt(){if(nt.forEach(function(Pt){mt.get(Pt).currentProgram.isReady()&&nt.delete(Pt)}),nt.size===0){Q(C);return}setTimeout(vt,10)}jt.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let ye=null;function Kn(C){ye&&ye(C)}function vn(){ai.stop()}function Lr(){ai.start()}const ai=new nf;ai.setAnimationLoop(Kn),typeof self<"u"&&ai.setContext(self),this.setAnimationLoop=function(C){ye=C,yt.setAnimationLoop(C),C===null?ai.stop():ai.start()},yt.addEventListener("sessionstart",vn),yt.addEventListener("sessionend",Lr),this.render=function(C,J){if(J!==void 0&&J.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),J.parent===null&&J.matrixWorldAutoUpdate===!0&&J.updateMatrixWorld(),yt.enabled===!0&&yt.isPresenting===!0&&(yt.cameraAutoUpdate===!0&&yt.updateCamera(J),J=yt.getCamera()),C.isScene===!0&&C.onBeforeRender(v,C,J,R),g=Ut.get(C,y.length),g.init(J),y.push(g),ot.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),le.setFromProjectionMatrix(ot,gi,J.reversedDepth),$=this.localClippingEnabled,ut=ht.init(this.clippingPlanes,$),x=at.get(C,M.length),x.init(),M.push(x),yt.enabled===!0&&yt.isPresenting===!0){const vt=v.xr.getDepthSensingMesh();vt!==null&&Os(vt,J,-1/0,v.sortObjects)}Os(C,J,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(Y,H),pe=yt.enabled===!1||yt.isPresenting===!1||yt.hasDepthSensing()===!1,pe&&It.addToRenderList(x,C),this.info.render.frame++,ut===!0&&ht.beginShadows();const et=g.state.shadowsArray;Et.render(et,C,J),ut===!0&&ht.endShadows(),this.info.autoReset===!0&&this.info.reset();const nt=x.opaque,Q=x.transmissive;if(g.setupLights(),J.isArrayCamera){const vt=J.cameras;if(Q.length>0)for(let Pt=0,Bt=vt.length;Pt<Bt;Pt++){const kt=vt[Pt];Ur(nt,Q,C,kt)}pe&&It.render(C);for(let Pt=0,Bt=vt.length;Pt<Bt;Pt++){const kt=vt[Pt];wo(x,C,kt,kt.viewport)}}else Q.length>0&&Ur(nt,Q,C,J),pe&&It.render(C),wo(x,C,J);R!==null&&w===0&&(bt.updateMultisampleRenderTarget(R),bt.updateRenderTargetMipmap(R)),C.isScene===!0&&C.onAfterRender(v,C,J),wt.resetDefaultState(),S=-1,b=null,y.pop(),y.length>0?(g=y[y.length-1],ut===!0&&ht.setGlobalState(v.clippingPlanes,g.state.camera)):g=null,M.pop(),M.length>0?x=M[M.length-1]:x=null};function Os(C,J,et,nt){if(C.visible===!1)return;if(C.layers.test(J.layers)){if(C.isGroup)et=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(J);else if(C.isLight)g.pushLight(C),C.castShadow&&g.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||le.intersectsSprite(C)){nt&&Xt.setFromMatrixPosition(C.matrixWorld).applyMatrix4(ot);const Pt=tt.update(C),Bt=C.material;Bt.visible&&x.push(C,Pt,Bt,et,Xt.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||le.intersectsObject(C))){const Pt=tt.update(C),Bt=C.material;if(nt&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Xt.copy(C.boundingSphere.center)):(Pt.boundingSphere===null&&Pt.computeBoundingSphere(),Xt.copy(Pt.boundingSphere.center)),Xt.applyMatrix4(C.matrixWorld).applyMatrix4(ot)),Array.isArray(Bt)){const kt=Pt.groups;for(let oe=0,$t=kt.length;oe<$t;oe++){const qt=kt[oe],Ee=Bt[qt.materialIndex];Ee&&Ee.visible&&x.push(C,Pt,Ee,et,Xt.z,qt)}}else Bt.visible&&x.push(C,Pt,Bt,et,Xt.z,null)}}const vt=C.children;for(let Pt=0,Bt=vt.length;Pt<Bt;Pt++)Os(vt[Pt],J,et,nt)}function wo(C,J,et,nt){const Q=C.opaque,vt=C.transmissive,Pt=C.transparent;g.setupLightsView(et),ut===!0&&ht.setGlobalState(v.clippingPlanes,et),nt&&Lt.viewport(U.copy(nt)),Q.length>0&&Si(Q,J,et),vt.length>0&&Si(vt,J,et),Pt.length>0&&Si(Pt,J,et),Lt.buffers.depth.setTest(!0),Lt.buffers.depth.setMask(!0),Lt.buffers.color.setMask(!0),Lt.setPolygonOffset(!1)}function Ur(C,J,et,nt){if((et.isScene===!0?et.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[nt.id]===void 0&&(g.state.transmissionRenderTarget[nt.id]=new us(1,1,{generateMipmaps:!0,type:jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float")?_o:vi,minFilter:os,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ke.workingColorSpace}));const vt=g.state.transmissionRenderTarget[nt.id],Pt=nt.viewport||U;vt.setSize(Pt.z*v.transmissionResolutionScale,Pt.w*v.transmissionResolutionScale);const Bt=v.getRenderTarget(),kt=v.getActiveCubeFace(),oe=v.getActiveMipmapLevel();v.setRenderTarget(vt),v.getClearColor(j),O=v.getClearAlpha(),O<1&&v.setClearColor(16777215,.5),v.clear(),pe&&It.render(et);const $t=v.toneMapping;v.toneMapping=cs;const qt=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),g.setupLightsView(nt),ut===!0&&ht.setGlobalState(v.clippingPlanes,nt),Si(C,et,nt),bt.updateMultisampleRenderTarget(vt),bt.updateRenderTargetMipmap(vt),jt.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let Ne=0,Ze=J.length;Ne<Ze;Ne++){const We=J[Ne],Ie=We.object,Kt=We.geometry,De=We.material,Te=We.group;if(De.side===Ce&&Ie.layers.test(nt.layers)){const yn=De.side;De.side=In,De.needsUpdate=!0,Eo(Ie,et,nt,Kt,De,Te),De.side=yn,De.needsUpdate=!0,Ee=!0}}Ee===!0&&(bt.updateMultisampleRenderTarget(vt),bt.updateRenderTargetMipmap(vt))}v.setRenderTarget(Bt,kt,oe),v.setClearColor(j,O),qt!==void 0&&(nt.viewport=qt),v.toneMapping=$t}function Si(C,J,et){const nt=J.isScene===!0?J.overrideMaterial:null;for(let Q=0,vt=C.length;Q<vt;Q++){const Pt=C[Q],Bt=Pt.object,kt=Pt.geometry,oe=Pt.group;let $t=Pt.material;$t.allowOverride===!0&&nt!==null&&($t=nt),Bt.layers.test(et.layers)&&Eo(Bt,J,et,kt,$t,oe)}}function Eo(C,J,et,nt,Q,vt){C.onBeforeRender(v,J,et,nt,Q,vt),C.modelViewMatrix.multiplyMatrices(et.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),Q.onBeforeRender(v,J,et,nt,C,vt),Q.transparent===!0&&Q.side===Ce&&Q.forceSinglePass===!1?(Q.side=In,Q.needsUpdate=!0,v.renderBufferDirect(et,J,nt,Q,C,vt),Q.side=Hi,Q.needsUpdate=!0,v.renderBufferDirect(et,J,nt,Q,C,vt),Q.side=Ce):v.renderBufferDirect(et,J,nt,Q,C,vt),C.onAfterRender(v,J,et,nt,Q,vt)}function li(C,J,et){J.isScene!==!0&&(J=Ft);const nt=mt.get(C),Q=g.state.lights,vt=g.state.shadowsArray,Pt=Q.state.version,Bt=lt.getParameters(C,Q.state,vt,J,et),kt=lt.getProgramCacheKey(Bt);let oe=nt.programs;nt.environment=C.isMeshStandardMaterial?J.environment:null,nt.fog=J.fog,nt.envMap=(C.isMeshStandardMaterial?ze:he).get(C.envMap||nt.environment),nt.envMapRotation=nt.environment!==null&&C.envMap===null?J.environmentRotation:C.envMapRotation,oe===void 0&&(C.addEventListener("dispose",dt),oe=new Map,nt.programs=oe);let $t=oe.get(kt);if($t!==void 0){if(nt.currentProgram===$t&&nt.lightsStateVersion===Pt)return ci(C,Bt),$t}else Bt.uniforms=lt.getUniforms(C),C.onBeforeCompile(Bt,v),$t=lt.acquireProgram(Bt,kt),oe.set(kt,$t),nt.uniforms=Bt.uniforms;const qt=nt.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(qt.clippingPlanes=ht.uniform),ci(C,Bt),nt.needsLights=Xi(C),nt.lightsStateVersion=Pt,nt.needsLights&&(qt.ambientLightColor.value=Q.state.ambient,qt.lightProbe.value=Q.state.probe,qt.directionalLights.value=Q.state.directional,qt.directionalLightShadows.value=Q.state.directionalShadow,qt.spotLights.value=Q.state.spot,qt.spotLightShadows.value=Q.state.spotShadow,qt.rectAreaLights.value=Q.state.rectArea,qt.ltc_1.value=Q.state.rectAreaLTC1,qt.ltc_2.value=Q.state.rectAreaLTC2,qt.pointLights.value=Q.state.point,qt.pointLightShadows.value=Q.state.pointShadow,qt.hemisphereLights.value=Q.state.hemi,qt.directionalShadowMap.value=Q.state.directionalShadowMap,qt.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,qt.spotShadowMap.value=Q.state.spotShadowMap,qt.spotLightMatrix.value=Q.state.spotLightMatrix,qt.spotLightMap.value=Q.state.spotLightMap,qt.pointShadowMap.value=Q.state.pointShadowMap,qt.pointShadowMatrix.value=Q.state.pointShadowMatrix),nt.currentProgram=$t,nt.uniformsList=null,$t}function To(C){if(C.uniformsList===null){const J=C.currentProgram.getUniforms();C.uniformsList=Ta.seqWithValue(J.seq,C.uniforms)}return C.uniformsList}function ci(C,J){const et=mt.get(C);et.outputColorSpace=J.outputColorSpace,et.batching=J.batching,et.batchingColor=J.batchingColor,et.instancing=J.instancing,et.instancingColor=J.instancingColor,et.instancingMorph=J.instancingMorph,et.skinning=J.skinning,et.morphTargets=J.morphTargets,et.morphNormals=J.morphNormals,et.morphColors=J.morphColors,et.morphTargetsCount=J.morphTargetsCount,et.numClippingPlanes=J.numClippingPlanes,et.numIntersection=J.numClipIntersection,et.vertexAlphas=J.vertexAlphas,et.vertexTangents=J.vertexTangents,et.toneMapping=J.toneMapping}function kr(C,J,et,nt,Q){J.isScene!==!0&&(J=Ft),bt.resetTextureUnits();const vt=J.fog,Pt=nt.isMeshStandardMaterial?J.environment:null,Bt=R===null?v.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Cr,kt=(nt.isMeshStandardMaterial?ze:he).get(nt.envMap||Pt),oe=nt.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,$t=!!et.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),qt=!!et.morphAttributes.position,Ee=!!et.morphAttributes.normal,Ne=!!et.morphAttributes.color;let Ze=cs;nt.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Ze=v.toneMapping);const We=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,Ie=We!==void 0?We.length:0,Kt=mt.get(nt),De=g.state.lights;if(ut===!0&&($===!0||C!==b)){const Je=C===b&&nt.id===S;ht.setState(nt,C,Je)}let Te=!1;nt.version===Kt.__version?(Kt.needsLights&&Kt.lightsStateVersion!==De.state.version||Kt.outputColorSpace!==Bt||Q.isBatchedMesh&&Kt.batching===!1||!Q.isBatchedMesh&&Kt.batching===!0||Q.isBatchedMesh&&Kt.batchingColor===!0&&Q.colorTexture===null||Q.isBatchedMesh&&Kt.batchingColor===!1&&Q.colorTexture!==null||Q.isInstancedMesh&&Kt.instancing===!1||!Q.isInstancedMesh&&Kt.instancing===!0||Q.isSkinnedMesh&&Kt.skinning===!1||!Q.isSkinnedMesh&&Kt.skinning===!0||Q.isInstancedMesh&&Kt.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Kt.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Kt.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Kt.instancingMorph===!1&&Q.morphTexture!==null||Kt.envMap!==kt||nt.fog===!0&&Kt.fog!==vt||Kt.numClippingPlanes!==void 0&&(Kt.numClippingPlanes!==ht.numPlanes||Kt.numIntersection!==ht.numIntersection)||Kt.vertexAlphas!==oe||Kt.vertexTangents!==$t||Kt.morphTargets!==qt||Kt.morphNormals!==Ee||Kt.morphColors!==Ne||Kt.toneMapping!==Ze||Kt.morphTargetsCount!==Ie)&&(Te=!0):(Te=!0,Kt.__version=nt.version);let yn=Kt.currentProgram;Te===!0&&(yn=li(nt,J,Q));let wi=!1,Mn=!1,qi=!1;const Xe=yn.getUniforms(),Dn=Kt.uniforms;if(Lt.useProgram(yn.program)&&(wi=!0,Mn=!0,qi=!0),nt.id!==S&&(S=nt.id,Mn=!0),wi||b!==C){Lt.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),Xe.setValue(D,"projectionMatrix",C.projectionMatrix),Xe.setValue(D,"viewMatrix",C.matrixWorldInverse);const Qe=Xe.map.cameraPosition;Qe!==void 0&&Qe.setValue(D,Mt.setFromMatrixPosition(C.matrixWorld)),Yt.logarithmicDepthBuffer&&Xe.setValue(D,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&Xe.setValue(D,"isOrthographic",C.isOrthographicCamera===!0),b!==C&&(b=C,Mn=!0,qi=!0)}if(Q.isSkinnedMesh){Xe.setOptional(D,Q,"bindMatrix"),Xe.setOptional(D,Q,"bindMatrixInverse");const Je=Q.skeleton;Je&&(Je.boneTexture===null&&Je.computeBoneTexture(),Xe.setValue(D,"boneTexture",Je.boneTexture,bt))}Q.isBatchedMesh&&(Xe.setOptional(D,Q,"batchingTexture"),Xe.setValue(D,"batchingTexture",Q._matricesTexture,bt),Xe.setOptional(D,Q,"batchingIdTexture"),Xe.setValue(D,"batchingIdTexture",Q._indirectTexture,bt),Xe.setOptional(D,Q,"batchingColorTexture"),Q._colorsTexture!==null&&Xe.setValue(D,"batchingColorTexture",Q._colorsTexture,bt));const Tn=et.morphAttributes;if((Tn.position!==void 0||Tn.normal!==void 0||Tn.color!==void 0)&&gt.update(Q,et,yn),(Mn||Kt.receiveShadow!==Q.receiveShadow)&&(Kt.receiveShadow=Q.receiveShadow,Xe.setValue(D,"receiveShadow",Q.receiveShadow)),nt.isMeshGouraudMaterial&&nt.envMap!==null&&(Dn.envMap.value=kt,Dn.flipEnvMap.value=kt.isCubeTexture&&kt.isRenderTargetTexture===!1?-1:1),nt.isMeshStandardMaterial&&nt.envMap===null&&J.environment!==null&&(Dn.envMapIntensity.value=J.environmentIntensity),Mn&&(Xe.setValue(D,"toneMappingExposure",v.toneMappingExposure),Kt.needsLights&&Za(Dn,qi),vt&&nt.fog===!0&&ct.refreshFogUniforms(Dn,vt),ct.refreshMaterialUniforms(Dn,nt,q,K,g.state.transmissionRenderTarget[C.id]),Ta.upload(D,To(Kt),Dn,bt)),nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(Ta.upload(D,To(Kt),Dn,bt),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&Xe.setValue(D,"center",Q.center),Xe.setValue(D,"modelViewMatrix",Q.modelViewMatrix),Xe.setValue(D,"normalMatrix",Q.normalMatrix),Xe.setValue(D,"modelMatrix",Q.matrixWorld),nt.isShaderMaterial||nt.isRawShaderMaterial){const Je=nt.uniformsGroups;for(let Qe=0,Hs=Je.length;Qe<Hs;Qe++){const hi=Je[Qe];de.update(hi,yn),de.bind(hi,yn)}}return yn}function Za(C,J){C.ambientLightColor.needsUpdate=J,C.lightProbe.needsUpdate=J,C.directionalLights.needsUpdate=J,C.directionalLightShadows.needsUpdate=J,C.pointLights.needsUpdate=J,C.pointLightShadows.needsUpdate=J,C.spotLights.needsUpdate=J,C.spotLightShadows.needsUpdate=J,C.rectAreaLights.needsUpdate=J,C.hemisphereLights.needsUpdate=J}function Xi(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(C,J,et){const nt=mt.get(C);nt.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,nt.__autoAllocateDepthBuffer===!1&&(nt.__useRenderToTexture=!1),mt.get(C.texture).__webglTexture=J,mt.get(C.depthTexture).__webglTexture=nt.__autoAllocateDepthBuffer?void 0:et,nt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,J){const et=mt.get(C);et.__webglFramebuffer=J,et.__useDefaultFramebuffer=J===void 0};const Ao=D.createFramebuffer();this.setRenderTarget=function(C,J=0,et=0){R=C,T=J,w=et;let nt=!0,Q=null,vt=!1,Pt=!1;if(C){const kt=mt.get(C);if(kt.__useDefaultFramebuffer!==void 0)Lt.bindFramebuffer(D.FRAMEBUFFER,null),nt=!1;else if(kt.__webglFramebuffer===void 0)bt.setupRenderTarget(C);else if(kt.__hasExternalTextures)bt.rebindTextures(C,mt.get(C.texture).__webglTexture,mt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const qt=C.depthTexture;if(kt.__boundDepthTexture!==qt){if(qt!==null&&mt.has(qt)&&(C.width!==qt.image.width||C.height!==qt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");bt.setupDepthRenderbuffer(C)}}const oe=C.texture;(oe.isData3DTexture||oe.isDataArrayTexture||oe.isCompressedArrayTexture)&&(Pt=!0);const $t=mt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray($t[J])?Q=$t[J][et]:Q=$t[J],vt=!0):C.samples>0&&bt.useMultisampledRTT(C)===!1?Q=mt.get(C).__webglMultisampledFramebuffer:Array.isArray($t)?Q=$t[et]:Q=$t,U.copy(C.viewport),P.copy(C.scissor),G=C.scissorTest}else U.copy(st).multiplyScalar(q).floor(),P.copy(_t).multiplyScalar(q).floor(),G=ne;if(et!==0&&(Q=Ao),Lt.bindFramebuffer(D.FRAMEBUFFER,Q)&&nt&&Lt.drawBuffers(C,Q),Lt.viewport(U),Lt.scissor(P),Lt.setScissorTest(G),vt){const kt=mt.get(C.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+J,kt.__webglTexture,et)}else if(Pt){const kt=J;for(let oe=0;oe<C.textures.length;oe++){const $t=mt.get(C.textures[oe]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+oe,$t.__webglTexture,et,kt)}}else if(C!==null&&et!==0){const kt=mt.get(C.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,kt.__webglTexture,et)}S=-1},this.readRenderTargetPixels=function(C,J,et,nt,Q,vt,Pt,Bt=0){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=mt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Pt!==void 0&&(kt=kt[Pt]),kt){Lt.bindFramebuffer(D.FRAMEBUFFER,kt);try{const oe=C.textures[Bt],$t=oe.format,qt=oe.type;if(!Yt.textureFormatReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Yt.textureTypeReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}J>=0&&J<=C.width-nt&&et>=0&&et<=C.height-Q&&(C.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Bt),D.readPixels(J,et,nt,Q,Ht.convert($t),Ht.convert(qt),vt))}finally{const oe=R!==null?mt.get(R).__webglFramebuffer:null;Lt.bindFramebuffer(D.FRAMEBUFFER,oe)}}},this.readRenderTargetPixelsAsync=async function(C,J,et,nt,Q,vt,Pt,Bt=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let kt=mt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Pt!==void 0&&(kt=kt[Pt]),kt)if(J>=0&&J<=C.width-nt&&et>=0&&et<=C.height-Q){Lt.bindFramebuffer(D.FRAMEBUFFER,kt);const oe=C.textures[Bt],$t=oe.format,qt=oe.type;if(!Yt.textureFormatReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Yt.textureTypeReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ee=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ee),D.bufferData(D.PIXEL_PACK_BUFFER,vt.byteLength,D.STREAM_READ),C.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Bt),D.readPixels(J,et,nt,Q,Ht.convert($t),Ht.convert(qt),0);const Ne=R!==null?mt.get(R).__webglFramebuffer:null;Lt.bindFramebuffer(D.FRAMEBUFFER,Ne);const Ze=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await tm(D,Ze,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ee),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,vt),D.deleteBuffer(Ee),D.deleteSync(Ze),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,J=null,et=0){const nt=Math.pow(2,-et),Q=Math.floor(C.image.width*nt),vt=Math.floor(C.image.height*nt),Pt=J!==null?J.x:0,Bt=J!==null?J.y:0;bt.setTexture2D(C,0),D.copyTexSubImage2D(D.TEXTURE_2D,et,0,0,Pt,Bt,Q,vt),Lt.unbindTexture()};const xs=D.createFramebuffer(),Bs=D.createFramebuffer();this.copyTextureToTexture=function(C,J,et=null,nt=null,Q=0,vt=null){vt===null&&(Q!==0?(mo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),vt=Q,Q=0):vt=0);let Pt,Bt,kt,oe,$t,qt,Ee,Ne,Ze;const We=C.isCompressedTexture?C.mipmaps[vt]:C.image;if(et!==null)Pt=et.max.x-et.min.x,Bt=et.max.y-et.min.y,kt=et.isBox3?et.max.z-et.min.z:1,oe=et.min.x,$t=et.min.y,qt=et.isBox3?et.min.z:0;else{const Tn=Math.pow(2,-Q);Pt=Math.floor(We.width*Tn),Bt=Math.floor(We.height*Tn),C.isDataArrayTexture?kt=We.depth:C.isData3DTexture?kt=Math.floor(We.depth*Tn):kt=1,oe=0,$t=0,qt=0}nt!==null?(Ee=nt.x,Ne=nt.y,Ze=nt.z):(Ee=0,Ne=0,Ze=0);const Ie=Ht.convert(J.format),Kt=Ht.convert(J.type);let De;J.isData3DTexture?(bt.setTexture3D(J,0),De=D.TEXTURE_3D):J.isDataArrayTexture||J.isCompressedArrayTexture?(bt.setTexture2DArray(J,0),De=D.TEXTURE_2D_ARRAY):(bt.setTexture2D(J,0),De=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,J.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,J.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,J.unpackAlignment);const Te=D.getParameter(D.UNPACK_ROW_LENGTH),yn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),wi=D.getParameter(D.UNPACK_SKIP_PIXELS),Mn=D.getParameter(D.UNPACK_SKIP_ROWS),qi=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,We.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,We.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,oe),D.pixelStorei(D.UNPACK_SKIP_ROWS,$t),D.pixelStorei(D.UNPACK_SKIP_IMAGES,qt);const Xe=C.isDataArrayTexture||C.isData3DTexture,Dn=J.isDataArrayTexture||J.isData3DTexture;if(C.isDepthTexture){const Tn=mt.get(C),Je=mt.get(J),Qe=mt.get(Tn.__renderTarget),Hs=mt.get(Je.__renderTarget);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,Qe.__webglFramebuffer),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Hs.__webglFramebuffer);for(let hi=0;hi<kt;hi++)Xe&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,mt.get(C).__webglTexture,Q,qt+hi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,mt.get(J).__webglTexture,vt,Ze+hi)),D.blitFramebuffer(oe,$t,Pt,Bt,Ee,Ne,Pt,Bt,D.DEPTH_BUFFER_BIT,D.NEAREST);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(Q!==0||C.isRenderTargetTexture||mt.has(C)){const Tn=mt.get(C),Je=mt.get(J);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,xs),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Bs);for(let Qe=0;Qe<kt;Qe++)Xe?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Tn.__webglTexture,Q,qt+Qe):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Tn.__webglTexture,Q),Dn?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Je.__webglTexture,vt,Ze+Qe):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Je.__webglTexture,vt),Q!==0?D.blitFramebuffer(oe,$t,Pt,Bt,Ee,Ne,Pt,Bt,D.COLOR_BUFFER_BIT,D.NEAREST):Dn?D.copyTexSubImage3D(De,vt,Ee,Ne,Ze+Qe,oe,$t,Pt,Bt):D.copyTexSubImage2D(De,vt,Ee,Ne,oe,$t,Pt,Bt);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Dn?C.isDataTexture||C.isData3DTexture?D.texSubImage3D(De,vt,Ee,Ne,Ze,Pt,Bt,kt,Ie,Kt,We.data):J.isCompressedArrayTexture?D.compressedTexSubImage3D(De,vt,Ee,Ne,Ze,Pt,Bt,kt,Ie,We.data):D.texSubImage3D(De,vt,Ee,Ne,Ze,Pt,Bt,kt,Ie,Kt,We):C.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,vt,Ee,Ne,Pt,Bt,Ie,Kt,We.data):C.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,vt,Ee,Ne,We.width,We.height,Ie,We.data):D.texSubImage2D(D.TEXTURE_2D,vt,Ee,Ne,Pt,Bt,Ie,Kt,We);D.pixelStorei(D.UNPACK_ROW_LENGTH,Te),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,yn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,wi),D.pixelStorei(D.UNPACK_SKIP_ROWS,Mn),D.pixelStorei(D.UNPACK_SKIP_IMAGES,qi),vt===0&&J.generateMipmaps&&D.generateMipmap(De),Lt.unbindTexture()},this.initRenderTarget=function(C){mt.get(C).__webglFramebuffer===void 0&&bt.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?bt.setTextureCube(C,0):C.isData3DTexture?bt.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?bt.setTexture2DArray(C,0):bt.setTexture2D(C,0),Lt.unbindTexture()},this.resetState=function(){T=0,w=0,R=null,Lt.reset(),wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ke._getDrawingBufferColorSpace(t),e.unpackColorSpace=ke._getUnpackColorSpace()}}class Gy extends Jt{constructor(t,e={}){super(t),this.isWater=!0;const n=this,s=e.textureWidth!==void 0?e.textureWidth:512,r=e.textureHeight!==void 0?e.textureHeight:512,o=e.clipBias!==void 0?e.clipBias:0,a=e.alpha!==void 0?e.alpha:1,l=e.time!==void 0?e.time:0,c=e.waterNormals!==void 0?e.waterNormals:null,h=e.sunDirection!==void 0?e.sunDirection:new L(.70707,.70707,0),u=new ee(e.sunColor!==void 0?e.sunColor:16777215),d=new ee(e.waterColor!==void 0?e.waterColor:8355711),f=e.eye!==void 0?e.eye:new L(0,0,0),m=e.distortionScale!==void 0?e.distortionScale:20,p=e.side!==void 0?e.side:Hi,x=e.fog!==void 0?e.fog:!1,g=new pi,M=new L,y=new L,v=new L,E=new ue,T=new L(0,0,-1),w=new Le,R=new L,S=new L,b=new Le,U=new ue,P=new kn,G=new us(s,r),j={name:"MirrorShader",uniforms:za.merge([zt.fog,zt.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new ue},sunColor:{value:new ee(8355711)},sunDirection:{value:new L(.70707,.70707,0)},eye:{value:new L},waterColor:{value:new ee(5592405)}}]),vertexShader:`
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
				}`},O=new Zn({name:j.name,uniforms:za.clone(j.uniforms),vertexShader:j.vertexShader,fragmentShader:j.fragmentShader,lights:!0,side:p,fog:x});O.uniforms.mirrorSampler.value=G.texture,O.uniforms.textureMatrix.value=U,O.uniforms.alpha.value=a,O.uniforms.time.value=l,O.uniforms.normalSampler.value=c,O.uniforms.sunColor.value=u,O.uniforms.waterColor.value=d,O.uniforms.sunDirection.value=h,O.uniforms.distortionScale.value=m,O.uniforms.eye.value=f,n.material=O,n.onBeforeRender=function(B,K,q){if(y.setFromMatrixPosition(n.matrixWorld),v.setFromMatrixPosition(q.matrixWorld),E.extractRotation(n.matrixWorld),M.set(0,0,1),M.applyMatrix4(E),R.subVectors(y,v),R.dot(M)>0)return;R.reflect(M).negate(),R.add(y),E.extractRotation(q.matrixWorld),T.set(0,0,-1),T.applyMatrix4(E),T.add(v),S.subVectors(y,T),S.reflect(M).negate(),S.add(y),P.position.copy(R),P.up.set(0,1,0),P.up.applyMatrix4(E),P.up.reflect(M),P.lookAt(S),P.far=q.far,P.updateMatrixWorld(),P.projectionMatrix.copy(q.projectionMatrix),U.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),U.multiply(P.projectionMatrix),U.multiply(P.matrixWorldInverse),g.setFromNormalAndCoplanarPoint(M,y),g.applyMatrix4(P.matrixWorldInverse),w.set(g.normal.x,g.normal.y,g.normal.z,g.constant);const Y=P.projectionMatrix;b.x=(Math.sign(w.x)+Y.elements[8])/Y.elements[0],b.y=(Math.sign(w.y)+Y.elements[9])/Y.elements[5],b.z=-1,b.w=(1+Y.elements[10])/Y.elements[14],w.multiplyScalar(2/w.dot(b)),Y.elements[2]=w.x,Y.elements[6]=w.y,Y.elements[10]=w.z+1-o,Y.elements[14]=w.w,f.setFromMatrixPosition(q.matrixWorld);const H=B.getRenderTarget(),st=B.xr.enabled,_t=B.shadowMap.autoUpdate;n.visible=!1,B.xr.enabled=!1,B.shadowMap.autoUpdate=!1,B.setRenderTarget(G),B.state.buffers.depth.setMask(!0),B.autoClear===!1&&B.clear(),B.render(K,P),n.visible=!0,B.xr.enabled=st,B.shadowMap.autoUpdate=_t,B.setRenderTarget(H);const ne=q.viewport;ne!==void 0&&B.state.viewport(ne)}}}function ki(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new Se;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const u=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=i[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=ld(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let p=0;p<o[h].length;++p)f.push(o[h][p][d]);const m=ld(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function ld(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new un(o,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let d=0,f=h.count;d<f;d++)for(let m=0;m<e;m++){const p=h.getComponent(d,m);a.setComponent(d+u,m,p)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const xe=1.8,Vy=2,Wy=110*xe,Xy=108*xe,se=3,xr=se/2.15,Ps=12.3*xr,Es=Ps+6,qy=Ps+8,aa=17,$y=xr,$n=i=>Object.freeze(Object.fromEntries(Object.entries(i).map(([t,e])=>[t,t==="yaw"?e:e*$y])));Object.freeze({store:$n({width:4.4,depth:3.6}),nursery:$n({width:5.8,depth:5.9}),watchtower:$n({width:4.8,depth:4}),training:$n({width:5.7,depth:4.8}),palisade:$n({width:7,depth:1})});$n({x:-1.1825,z:-1.0664,yaw:0,width:7.68,depth:8.25});const Yy=$n({x:-6.45,z:.43,yaw:-.5,width:4.8,depth:5.2});Object.freeze({store:$n({x:-6.0962,z:4.9054,yaw:0}),nursery:$n({x:6.5601,z:-3.869,yaw:0}),watchtower:$n({x:6.6295,z:5.3482,yaw:0}),training:$n({x:-6.2831,z:-6.0974,yaw:0}),palisade:$n({x:0,z:9.8,yaw:0})});const Zy=Ps-.15,jy=6.8,La=3.8,Ky=.9,cd=(i,t)=>Number.isFinite(i)?i:t,Jy=i=>i?.natural===!0||i?.mesh?.userData?.natural===!0,Qy=Array.from({length:5},(i,t)=>Object.freeze({stage:t,unfinished:t<4,wallHeight:t===0?0:t===1?La*.35:La,keep:t>=3,gate:t===4})),t1=Object.freeze({stage:4,unfinished:!1,wallHeight:0,keep:!1,gate:!1});function hd(i){if(Jy(i))return t1;const t=i.mesh?.userData?.visualState,e=i.underConstruction??t?.underConstruction??!1,n=e?Math.max(0,Math.min(1,cd(i.constructionProgress,cd(t?.constructionProgress,0)))):1,s=e?Math.min(3,Math.floor(n*4)):4;return Qy[s]}const As=(i,t=0)=>Number.isFinite(i)?i:t,Ua=(i,t,e)=>Math.max(t,Math.min(e,i)),vr=1e-6,e1=i=>i&&i.active!==!1;function n1(i,t){const e=Math.cos(i.yaw||0),n=Math.sin(i.yaw||0),s=t.x-i.x,r=t.z-i.z;return{x:e*s-n*r,y:t.y,z:n*s+e*r}}function la(i,t){const e=Math.cos(i.yaw||0),n=Math.sin(i.yaw||0);return{x:i.x+e*t.x+n*t.z,y:As(t.y,i.floorY),z:i.z-n*t.x+e*t.z}}const lf=(i,t,e=0)=>i.x>t.minX+e-vr&&i.x<t.maxX-e+vr&&i.z>t.minZ+e-vr&&i.z<t.maxZ-e+vr,zi=(i,t,e,n,s,r,o)=>({id:i,minX:t,maxX:e,minZ:n,maxZ:s,minY:r,maxY:o});function ud(i,t,e=0){return t.outline?t.outline.every((s,r)=>{const o=t.outline[(r+1)%t.outline.length],a=o.x-s.x,l=o.z-s.z;return a*(i.z-s.z)-l*(i.x-s.x)>=Math.max(0,e)*Math.hypot(a,l)-vr})||e<0&&t.outline.some((s,r)=>i1(i,s,t.outline[(r+1)%t.outline.length])<e*e-vr):lf(i,t,e)}function i1(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=Ua(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1),0,1);return(i.x-t.x-n*r)**2+(i.z-t.z-s*r)**2}function s1(i,t){return i.outline=t.map(([e,n])=>({x:e,z:n})),i.minX=Math.min(...t.map(e=>e[0])),i.maxX=Math.max(...t.map(e=>e[0])),i.minZ=Math.min(...t.map(e=>e[1])),i.maxZ=Math.max(...t.map(e=>e[1])),i}function r1(i,{terrainHeight:t,minimumFloorY:e=.82}={}){const n=t||(()=>0),s={id:i.id,x:As(i.x),z:As(i.z),yaw:As(i.yaw,Math.atan2(-i.x,-i.z)),team:i.team||"neutral",active:!0};let r=-1/0,o=1/0;for(let m=-3.75;m<=3.76;m+=1.25)for(let p=-3.25;p<=4.26;p+=1.25){const x=la(s,{x:m,z:p,y:0}),g=As(n(x.x,x.z));r=Math.max(r,g),o=Math.min(o,g)}s.floorY=Math.max(e,r+.045),s.floorBottom=Math.min(o-.16,s.floorY-.22),s.roofBottom=s.floorY+2.25,s.roofTop=s.floorY+3.05,s.interior={minX:-3.1,maxX:3.1,minZ:-2.6,maxZ:.45},s.floor={minX:-3.75,maxX:3.75,minZ:-3.25,maxZ:4.1},s.entrance={x:1.55,z:4,minX:.3,maxX:2.8,minZ:3.35,maxZ:4,width:2.5,height:1.95},s.solids=[zi("floor",-3.75,3.75,-3.25,4.1,s.floorBottom,s.floorY),zi("left-wall",-3.75,-3.1,-3.25,4,s.floorY,s.roofBottom),zi("right-wall",3.1,3.75,-3.25,4,s.floorY,s.roofBottom),zi("back-wall",-3.75,3.75,-3.25,-2.6,s.floorY,s.roofBottom),zi("front-left",-3.75,.3,3.35,4,s.floorY,s.roofBottom),zi("front-right",2.8,3.75,3.35,4,s.floorY,s.roofBottom),zi("entrance-lintel",.3,2.8,3.35,4,s.floorY+1.95,s.roofBottom),zi("root-baffle",-.35,3.1,.45,1.05,s.floorY,s.roofBottom),zi("roof",-3.75,3.75,-3.25,4,s.roofBottom,s.roofTop)];const l={floor:[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.2],[-3.15,4.2],[-4.12,3.4]],roof:[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.22],[-3.15,4.45],[-4.12,3.4]],"left-wall":[[-3.1,-3.35],[-3.1,4.3],[-3.95,3.4],[-4.05,-2.2]],"right-wall":[[3.1,-3.35],[3.95,-2.3],[3.85,3.4],[3.1,4.2]],"back-wall":[[-3.25,-2.6],[-3.5,-3.3],[2.9,-3.5],[3.3,-2.6]],"front-left":[[-3.3,3.35],[.3,3.35],[.3,4.13],[-3.15,4.3]],"front-right":[[2.8,3.35],[3.3,3.35],[3.45,4],[2.8,4]],"root-baffle":[[-.35,.45],[3.1,.45],[3.1,1.05],[-.3,.98]]};for(const m of s.solids)s1(m,l[m.id]||[[m.minX,m.minZ],[m.maxX,m.minZ],[m.maxX,m.maxZ],[m.minX,m.maxZ]]);s.floor={...s.solids[0]},s.shellBounds={minX:Math.min(...s.solids.map(m=>m.minX)),maxX:Math.max(...s.solids.map(m=>m.maxX)),minZ:Math.min(...s.solids.map(m=>m.minZ)),maxZ:Math.max(...s.solids.map(m=>m.maxZ))};let c=4.5;const h=4.2;for(let m=0;m<3;m++){const p=la(s,{x:s.entrance.x,z:h+c,y:0});c=Ua(Math.abs(s.floorY-n(p.x,p.z))/.32,4.5,14)}const u=Math.max(10,Math.ceil(c/.45)),d=6,f={minX:s.entrance.x-1.6,maxX:s.entrance.x+1.6,minZ:h,maxZ:h+c,rows:u,cols:d,heights:[],bottoms:[]};for(let m=0;m<=u;m++)for(let p=0;p<=d;p++){const x=m/u,g=f.minX+(f.maxX-f.minX)*p/d,M=f.minZ+c*x,y=la(s,{x:g,z:M,y:0}),v=la(s,{x:g,z:f.maxZ,y:0}),E=As(n(y.x,y.z)),T=s.floorY+(As(n(v.x,v.z))-s.floorY)*x;f.heights.push(m===0?s.floorY:Math.max(E+(m===u?.005:.02),T)),f.bottoms.push(Math.min(E-.14,T-.18))}return s.ramp=f,s.radius=Math.max(6,Math.hypot(f.maxX,f.maxZ)),s}function o1(i,t){const e=i.ramp;if(!e||!lf(t,e))return null;const n=Ua((t.x-e.minX)/(e.maxX-e.minX)*e.cols,0,e.cols),s=Ua((t.z-e.minZ)/(e.maxZ-e.minZ)*e.rows,0,e.rows),r=Math.min(e.cols-1,Math.floor(n)),o=Math.min(e.rows-1,Math.floor(s)),a=n-r,l=s-o,c=(m,p)=>e.heights[p*(e.cols+1)+m],h=c(r,o),u=c(r+1,o),d=c(r,o+1),f=c(r+1,o+1);return a+l<=1?h+(u-h)*a+(d-h)*l:f+(d-f)*(1-a)+(u-f)*(1-l)}function a1(i,t,e,{y:n}={}){let s=null;for(const r of i||[]){if(!e1(r)||Math.hypot(t-r.x,e-r.z)>r.radius+1)continue;const o=n1(r,{x:t,z:e}),a=r.solids.find(u=>u.id==="roof");let l=null,c="floor";ud(o,r.floor)&&(l=r.floorY);const h=o1(r,o);h!==null&&(l===null||h>l)&&(l=h,c="ramp"),Number.isFinite(n)&&n>=r.roofTop-.06&&ud(o,a)&&(l=r.roofTop,c="roof"),l!==null&&(!s||l>s.height)&&(s={height:l,type:c==="roof"?"rock":"land",platform:r,refuge:r,surface:c})}return s}const Th=(i,t,e)=>Math.max(t,Math.min(e,i)),si=(i,t,e)=>{const n=Th((e-i)/(t-i),0,1);return n*n*(3-2*n)},Qi=-.035;function l1(i,t){if(!Number.isFinite(i)||!Number.isFinite(t))return .91;const e=Math.max(0,t-.215-i);return .91-.63*si(.1,.6,e)}const c1=Object.freeze({pond:{id:"pond",x:0,z:0,radius:8,label:"Λιμνούλα των νούφαρων",description:"Μύγες, ανθισμένα φύλλα και χαμηλές διαδρομές πάνω από το νερό.",hint:"Παρατήρησε πού μαζεύονται οι μύγες.",findPoint:{x:6.5,z:3}},creek:{id:"creek",x:8,z:-24,radius:7,label:"Το στενό ρυάκι",description:"Το ρεύμα αλλάζει τις διαδρομές και μεταφέρει την τροφή.",hint:"Ακολούθησε την κίνηση του νερού.",findPoint:{x:4,z:-29}},bank:{id:"bank",x:27,z:8,radius:7,label:"Η όχθη με τα βότσαλα",description:"Ψηλά βράχια, κρυψώνες και εκτεθειμένα περάσματα.",hint:"Οι καλαμιές κρύβουν μια δεύτερη προσέγγιση.",findPoint:{x:30,z:6}},roots:{id:"roots",x:24,z:-16,radius:5,label:"Το πέρασμα στις ρίζες",description:"Ένα φυσικό άνοιγμα που αποκαλύπτεται όταν χαμηλώνει το νερό.",hint:"Μικρά έντομα χάνονται κάτω από τις καμπύλες ρίζες.",findPoint:{x:31,z:-16}}});function h1(i){const t=e=>({...e,...i.toWorld(e.x,e.z)});return{landmarks:Object.values(c1).map(e=>({...t(e),findPoint:t(e.findPoint)})),nest:t({id:"creek-nest",x:17,z:16,radius:4,label:"Κοιλότητα κάτω από τις ρίζες"}),refuges:[{id:"willow-crevice",x:-20,z:7,label:"Κρυψώνα της πεσμένης ιτιάς"},{id:"bank-crevice",x:34,z:-9,label:"Κοιλότητα της πετρώδους όχθης"}].map(e=>({...t(e),yaw:Math.atan2(-e.x,-e.z)+i.yaw})),cover:[{id:"nest-reeds",x:14,z:20,radius:3.1},{id:"root-reeds",x:18,z:-7,radius:3},{id:"bank-reeds",x:29,z:11,radius:3.3},{id:"creek-reeds",x:18,z:-22,radius:3}].map(t)}}function cf(i){return 6+Math.sin(i*.035)*9}function u1(i,t,e=0,n=[]){const s=Math.abs(i-cf(t));let r=-1.9+si(6,17,s)*3.5+e*.22;r+=si(20,55,s)*(.4+Math.sin(t*.04+.6)**2*1.2);const o=1-si(11,20,Math.hypot(i*.95,t*.8));r=r*(1-o)+(-2.65+e*.2)*o;for(const l of n){const c=Math.hypot(i-l.x,t-l.z),u=l.radius*(1+.045*Math.sin(Math.atan2(t-l.z,i-l.x)*5+(l.shorePhase||0))),d=1-si(u*.46,u+5,c);d>0&&(r=Math.max(r,r*(1-d)+l.elevation*d))}const a=(1-si(1.9,4.7,Math.abs(t+16)))*si(9,14,i)*(1-si(31,36,i));return r=r*(1-a)+Math.min(r,-.18+e*.025)*a,r+=si(190,235,Math.max(Math.abs(i),Math.abs(t)))*4,r}function d1(i,t,e,n=.45){const s=i.toSource(t,e),r=Math.abs(s.x-cf(s.z)),o=Th(Number(n)||0,0,1.5)*(1-si(5,17,r))*(.55+.45*si(5,23,Math.abs(s.z)));if(o<=0)return{x:0,z:0,strength:0};const a=.315*Math.cos(s.z*.035),l=Math.hypot(a,1),c=i.toWorld(0,0),h=i.toWorld(a/l,1/l);return{x:(h.x-c.x)*o,z:(h.z-c.z)*o,strength:o}}function f1({group:i,layout:t,terrainHeight:e,surface:n,insertPlatform:s,materials:r,rockGeos:o,tube:a,leafGeometry:l,bladeGeometry:c,geography:h}){const u=new te;u.name="Natural creek discoveries",i.add(u);const d=[],f=new qe,m=new Map,p=new jn(1,11,7),x=new Ve({color:"#e0c58b",roughness:.68}),g=new Ve({color:"#698d9d",roughness:.65}),M=l(.55,.38,.11),y=r.leaf.clone();y.color.set("#adc68a");const v=(O,B,K)=>{const q=t.toWorld(O,B);return[q.x,K,q.z]},E=h.landmarks.find(O=>O.id==="roots"),T=e(E.x,E.z);for(const O of[-.48,.45]){const B=a([[0,-.1,-4.1],[-.3,2.3,-2.6],[.2,3.7,0],[.35,2.5,2.7],[0,-.1,4.2]].map(K=>v(24+K[0]+O,-16+K[2],T+K[1])),.48,r.bark,24,.14);B.name="Passable willow root arch",B.castShadow=!0,B.receiveShadow=!0,u.add(B)}for(const O of[-1,1])for(let B=0;B<4;B++){const K=-16+O*(3.4+B*.45),q=24+(B-1.5)*1.1,Y=t.toWorld(q,K),H=t.toWorld(q-4.5,K+O*1.5),st=a([[Y.x,e(Y.x,Y.z)+.8,Y.z],[(Y.x+H.x)/2,e(H.x,H.z)+.45,(Y.z+H.z)/2],[H.x,e(H.x,H.z)-.05,H.z]],.1+B*.025,r.bark,12,.75);st.castShadow=!0,u.add(st)}const w=[{id:"creek-stone",x:4,z:-29,r:1.8,height:3.5},{id:"root-approach",x:18,z:-7,r:1.65,height:1.65},{id:"root-perch",x:24,z:-11,r:1.7,height:2},{id:"bank-perch",x:30,z:6,r:2,height:2.05},{id:"nest-perch",x:19,z:20,r:1.8,height:1.7},{id:"pond-perch",x:-5,z:8,r:1.7,height:3.5}],R=new Ve({color:"#c4d9ad",roughness:.82});for(const[O,B]of w.entries()){const K=t.toWorld(B.x,B.z),q=e(K.x,K.z),Y=B.height,H=new Jt(o[O%o.length],r.mossRock);H.name="Moss-covered grip outcrop",H.position.set(K.x,q,K.z),H.scale.set(B.r,Y,B.r),H.rotation.y=O*1.93,H.castShadow=!0,H.receiveShadow=!0,u.add(H);const st=s({id:B.id,type:"rock",...K,y:q+Y*.76,radius:B.r*.72,visualRadius:B.r,scaleY:Y}),_t=new Jt(p,R);_t.name="Pale natural grip",_t.position.set(K.x,st.y+.045,K.z),_t.scale.set(.22,.07,.22),u.add(_t),d.push({id:B.id,...K,y:st.y+.13,radius:st.radius})}const S=c(123),b=new wn(S,r.plant,h.cover.length*84);b.name="Dense camouflage reed pockets";let U=0;for(const[O,B]of h.cover.entries())for(let K=0;K<84;K++){const q=K*2.399+O*.7,Y=Math.sqrt((K+.4)/84)*B.radius,H=B.x+Math.cos(q)*Y,st=B.z+Math.sin(q)*Y;f.position.set(H,e(H,st),st),f.rotation.set(0,q,0),f.scale.set(1.2,1.65+K%5*.18,1.2),f.updateMatrix(),b.setMatrixAt(U++,f.matrix)}b.receiveShadow=!0,b.computeBoundingSphere(),u.add(b);function P(O,B,K){const q=new te;q.name=K?"Lost food and natural keepsakes":"Natural discovery";const Y=new Jt(M,y);Y.rotation.y=m.size*2.4%6.28,Y.receiveShadow=!0,q.add(Y);for(let H=0;H<(K?3:1);H++){const st=new Jt(p,B.kind==="keepsake"||B.keepsakesCount?x:g);st.position.set((H-1)*.15,.15+H%2*.035,.015),st.scale.set(.22,.15,.18),st.rotation.set(.2,H*.9,.1),st.castShadow=!0,q.add(st)}return q.userData.creekPoint={...B},u.add(q),m.set(O,q),q}function G(O,B){const K=new Set;for(const[q,Y]of[[!1,O.finds||[]],[!0,O.dropped||[]]])for(const H of Y){if(!Number.isFinite(H.x)||!Number.isFinite(H.z)||H.collected||H.visible===!1)continue;const st=(q?"drop:":"find:")+H.id;K.add(st);const _t=m.get(st)||P(st,H,q);_t.userData.creekPoint={...H},_t.visible=!0,_t.position.set(H.x,Math.max(n(H.x,H.z).height,B)+.07,H.z),_t.updateMatrix()}for(const[q,Y]of m)K.has(q)||(Y.removeFromParent(),m.delete(q))}function j(O,B){for(const K of m.values()){const q=K.userData.creekPoint,Y=n(q.x,q.z),H=Y.type==="water";K.position.y=Math.max(Y.height,O)+.07+(H?Math.sin(B*1.5+q.x)*.025:0),K.rotation.z=H?Math.sin(B*.8+q.z)*.045:0,K.updateMatrix()}}return{group:u,grips:d,sync:G,update:j,resources:[p,x,g,M,y,R,S]}}function p1(i){const t=i.outline||[{x:i.minX,z:i.minZ},{x:i.maxX,z:i.minZ},{x:i.maxX,z:i.maxZ},{x:i.minX,z:i.maxZ}],e=t.length,n=[],s=[];for(const h of[i.minY,i.maxY])for(const u of t)n.push(u.x,h,u.z);for(let h=1;h<e-1;h++)s.push(0,h,h+1,e,e+h+1,e+h);for(let h=0;h<e;h++){const u=(h+1)%e;s.push(h,e+h,u,u,e+h,e+u)}const r=new Se;r.setAttribute("position",new Vt(n,3)),r.setIndex(s);const o=r.toNonIndexed();r.dispose(),o.computeVertexNormals();const a=o.attributes.position,l=o.attributes.normal,c=[];for(let h=0;h<a.count;h++){const u=Math.abs(l.getY(h))>.5;c.push((u?a.getX(h):Math.abs(l.getX(h))>.5?a.getZ(h):a.getX(h))*.35,(u?a.getZ(h):a.getY(h))*.35)}return o.setAttribute("uv",new Vt(c,2)),o}function m1(i,{terrainHeight:t,materials:e,rockGeos:n,tube:s,leafGeometry:r,mergeStaticParts:o,teamColor:a}){const l=r1(i,{terrainHeight:t}),c=new te;c.name="Natural refuge "+(i.id||""),c.position.set(i.x,l.floorY,i.z),c.rotation.y=l.yaw;const h=[],u=e.leaf.clone(),d=e.rock.clone();d.color.set("#71816a"),h.push(u,d);const f=new te;f.name="Opaque rock and root cavity",c.add(f);const m=new te;m.name="Overhanging refuge slab",f.add(m);for(const w of l.solids){const R=p1(w),S=w.id==="root-baffle"?e.bark:w.id==="floor"?d:e.mossRock,b=new Jt(R,S);b.name="Refuge solid · "+w.id,b.userData.refugeSolid=w,b.position.y=-l.floorY,b.castShadow=!0,b.receiveShadow=!0,h.push(R),(w.id==="roof"?m:f).add(b)}const p=l.ramp,x=[],g=[];for(let w=0;w<=p.rows;w++)for(let R=0;R<=p.cols;R++){const S=w*(p.cols+1)+R;x.push(p.minX+(p.maxX-p.minX)*R/p.cols,p.heights[S]-l.floorY,p.minZ+(p.maxZ-p.minZ)*w/p.rows)}for(let w=0;w<p.rows;w++)for(let R=0;R<p.cols;R++){const S=w*(p.cols+1)+R,b=S+1,U=S+p.cols+1,P=U+1;g.push(S,U,b,b,U,P)}const M=[];for(let w=0;w<=p.cols;w++)M.push(w);for(let w=1;w<=p.rows;w++)M.push(w*(p.cols+1)+p.cols);for(let w=p.cols-1;w>=0;w--)M.push(p.rows*(p.cols+1)+w);for(let w=p.rows-1;w>0;w--)M.push(w*(p.cols+1));for(let w=0;w<M.length;w++){const R=M[w],S=M[(w+1)%M.length],b=x.length/3,U=b+1;x.push(x[R*3],p.bottoms[R]-l.floorY,x[R*3+2],x[S*3],p.bottoms[S]-l.floorY,x[S*3+2]),g.push(R,S,b,S,U,b)}const y=new Se;y.setAttribute("position",new Vt(x,3)),y.setAttribute("uv",new Vt(Array.from({length:x.length/3},(w,R)=>[x[R*3]*.35,x[R*3+2]*.35]).flat(),2)),y.setIndex(g),y.computeVertexNormals(),h.push(y);const v=new Jt(y,e.mossRock);v.name="Terrain-joined natural refuge ledge",v.castShadow=!0,v.receiveShadow=!0,f.add(v);for(const w of[-1,1])for(let R=0;R<3;R++){const S=w*(3.6-R*.12),b=-2.4+R*2.3,U=s([[S,l.floorBottom-l.floorY,b+.55],[S+w*.08,.55,b+.35],[S-w*.12,1.8,b],[S-w*.45,2.6,b-.2]],.16+R*.045,e.bark,15,.48);U.castShadow=!0,h.push(U.geometry),f.add(U)}for(let w=0;w<5;w++){const R=-2.3+w*1.3,S=s([[-3.5,3.03,R],[-1.6,3.12,R-.2],[.5,3.1,R+.1],[3.4,3.04,R+.35]],.075+w%2*.045,e.bark,18,.35);S.castShadow=!0,h.push(S.geometry),m.add(S)}const E=[];for(let w=0;w<4;w++){const R=new te;R.name="Natural life "+w,E.push(R),m.add(R);for(let S=0;S<8+w*3;S++){const b=S*2.399+w*.7,U=Math.cos(b)*(2.1+S%3*.48),P=.35+Math.sin(b)*(2.1+S%4*.2),G=new Jt(r(.65+S%3*.15,.85,.12),u);h.push(G.geometry),G.position.set(U,3.07+S%3*.025,P),G.rotation.set((S%3-1)*.08,b,(S%2-.5)*.1),G.castShadow=!0,G.receiveShadow=!0,R.add(G)}o(R,h)}const T=new te;T.name="Dry leaves inside the root hollow",f.add(T);for(let w=0;w<8;w++){const R=new Jt(r(.3,.48,.045),u);h.push(R.geometry),R.position.set(Math.sin(w*2.4)*2,.025,-1.1+Math.cos(w*2.4)*.7),R.rotation.y=w*1.7,R.receiveShadow=!0,T.add(R)}return o(T,h),l.mesh=c,c.userData={id:i.id,natural:!0,radius:l.radius,owned:h,growth:E,leafMaterial:u,terrain:null,keepCollision:{rects:[]},trainingPoint:c.position.clone(),support:{x:i.x,z:i.z,y:l.floorY,type:"land",radius:0},team:i.team,refuge:l,refugeSolids:f,refugeRoof:m},hf(c,i,a),c}function hf(i,t={},e){const n=i.userData.visualState||{},s={...n,...t},r=Th(Math.floor(Number(s.nestLevel??s.level??s.tier??1)||0),0,3);return i.userData.visualState={team:s.team??"neutral",tier:s.tier??1,nestLevel:r,safe:s.safe!==!1,hp:s.hp,maxHp:s.maxHp,destroyed:!!s.destroyed},i.userData.team=i.userData.visualState.team,i.userData.level=r,i.userData.destroyed=!!s.destroyed,i.userData.refuge&&(i.userData.refuge.team=i.userData.team),i.userData.leafMaterial.color.set(e(i.userData.team)).lerp(new ee("#72964b"),.7),i.userData.growth.forEach((o,a)=>{o.visible=a<=r}),i.userData.collisionRevision=(i.userData.collisionRevision||0)+1,i}function g1(i,t,{bucketSize:e=6}={}){let n=0,s=-1/0,r=0;for(let c=0;c<t.length;c+=3)n=Math.max(n,Math.hypot(t[c],t[c+2])),s=Math.max(s,t[c+1]),r=Math.max(r,Math.abs(t[c+1]));const o=new Map,a=Number.isFinite(e)&&e>0?e:6,l=Math.sin(.04);for(const c of i){const h=n*c.visualRadius*1.07+r*l+.01,u={lily:c,radiusSquared:h*h,heightOffset:s+n*c.visualRadius*1.07*l+.018+.01};for(let d=Math.floor((c.x-h)/a);d<=Math.floor((c.x+h)/a);d++)for(let f=Math.floor((c.z-h)/a);f<=Math.floor((c.z+h)/a);f++){const m=d+":"+f;o.has(m)||o.set(m,[]),o.get(m).push(u)}}return(c,h)=>{let u=-1/0;const d=o.get(Math.floor(c/a)+":"+Math.floor(h/a))||[];for(const{lily:f,radiusSquared:m,heightOffset:p}of d){const x=c-f.x,g=h-f.z;x*x+g*g<=m&&(u=Math.max(u,f.y+p))}return u}}const Ue=Math.PI*2,ns=qc.clamp,ni=(i,t,e)=>(e=ns((e-i)/(t-i),0,1),e*e*(3-2*e));function Bi(i){return()=>{i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const ca=(i,t)=>Math.sin(i*.213+Math.sin(t*.137)*1.9)*.48+Math.sin(t*.329-i*.079)*.27+Math.cos(i*.741+t*.533)*.13,hn=i=>new ee(i),pt=new qe;new L(0,1,0);const dd=[{sky:"#8aaab0",fog:"#819e91",earth:"#8b8a62",wet:"#43533b",deep:"#52634e",leaf:"#b5d28f",rock:"#a4a292",moss:"#89976c",bark:"#65513a",reed:"#b4a676",water:"#2c6258",nightWater:"#0c2b32"},{sky:"#91acbd",fog:"#8bada6",earth:"#82958a",wet:"#3c6257",deep:"#456b68",leaf:"#a0c9ad",rock:"#a7b5ae",moss:"#7f9b88",bark:"#605848",reed:"#aebca0",water:"#3b747b",nightWater:"#122c3b"},{sky:"#b4a58a",fog:"#a39b7e",earth:"#b09b6b",wet:"#685b3c",deep:"#626047",leaf:"#d0b46b",rock:"#b6a184",moss:"#9f9a6d",bark:"#78543b",reed:"#c8ad73",water:"#69765a",nightWater:"#25352b"},{sky:"#82989c",fog:"#738d81",earth:"#7a8064",wet:"#364f3b",deep:"#3e5c52",leaf:"#93b57d",rock:"#939b8b",moss:"#6b8664",bark:"#554934",reed:"#9b9d70",water:"#376b57",nightWater:"#112e29"}];function x1(i=0,t=731+Math.max(0,i)*7919){const e=Math.max(0,Math.floor(Number(i)||0)),n=e%8,[s,r]=[[1,0],[0,1],[-1,0],[0,-1]][n%4],o=n>=4?-1:1,a=(h,u)=>e?{x:s*h*o+r*u,z:-r*h*o+s*u}:{x:h,z:u},l=(h,u)=>e?{x:o*(s*h-r*u),z:r*h+s*u}:{x:h,z:u},c=Bi((Number(t)||731)^Math.imul(e,2654435761));return{index:e,seed:t,symmetry:n,yaw:n%4*Math.PI/2,toWorld:a,toSource:l,palette:{...dd[e%dd.length]},noiseOffset:e?{x:(c()-.5)*170,z:(c()-.5)*170}:{x:0,z:0}}}function Ah(i,t,e=1){const n=document.createElement("canvas");n.width=n.height=i,t(n.getContext("2d"),i);const s=new $d(n);return s.colorSpace=Un,s.wrapS=s.wrapT=Rr,s.repeat.set(e,e),s.anisotropy=4,s}function Fl(i,t=!1){const e=Bi(i);return Ah(256,(n,s)=>{n.fillStyle=t?"#6c7155":"#8b8978",n.fillRect(0,0,s,s);for(let r=0;r<15e3;r++){const o=e()*s,a=e()*s,l=45+e()*110;n.fillStyle=t?`rgba(${l*.8},${l},${l*.61},${.12+e()*.28})`:`rgba(${l*1.06},${l},${l*.85},${.15+e()*.3})`,n.fillRect(o,a,.5+e()*3,.5+e()*3)}n.lineWidth=.7;for(let r=0;r<26;r++){n.strokeStyle=`rgba(31,36,28,${.06+e()*.15})`,n.beginPath();let o=e()*s;n.moveTo(0,o);for(let a=0;a<s;a+=10)o+=(e()-.5)*9,n.lineTo(a,o);n.stroke()}},1)}function v1(i){const t=Bi(i);return Ah(512,(e,n)=>{const s=e.createRadialGradient(n*.5,n*.5,4,n*.5,n*.5,n*.54);s.addColorStop(0,"#588a39"),s.addColorStop(.6,"#6ca04a"),s.addColorStop(1,"#345d27"),e.fillStyle=s,e.fillRect(0,0,n,n);for(let r=0;r<9e3;r++)e.fillStyle=t()>.5?"rgba(185,214,109,.08)":"rgba(18,58,20,.06)",e.fillRect(t()*n,t()*n,t()*4+1,t()*4+1);for(let r=.18;r<Ue-.18;r+=.31){const o=n*.5+Math.cos(r)*n*.49,a=n*.5+Math.sin(r)*n*.49;e.strokeStyle="rgba(191,204,117,.42)",e.lineWidth=1.8,e.beginPath(),e.moveTo(n*.5,n*.5),e.quadraticCurveTo(n*.5+Math.cos(r+.08)*n*.28,n*.5+Math.sin(r+.08)*n*.28,o,a),e.stroke();for(let l=.2;l<.9;l+=.15)for(const c of[-1,1])e.strokeStyle="rgba(186,211,124,.19)",e.lineWidth=.8,e.beginPath(),e.moveTo(n*.5+Math.cos(r)*n*l*.5,n*.5+Math.sin(r)*n*l*.5),e.lineTo(n*.5+Math.cos(r+c*.12)*n*(l+.1)*.5,n*.5+Math.sin(r+c*.12)*n*(l+.1)*.5),e.stroke()}for(let r=0;r<13;r++){const o=t()*Ue,a=t()*n*.45;e.fillStyle="rgba(42,56,17,.16)",e.beginPath(),e.ellipse(n*.5+Math.cos(o)*a,n*.5+Math.sin(o)*a,t()*5+2,t()*3+1,o,0,Ue),e.fill()}})}function y1(i){const e=document.createElement("canvas");e.width=e.height=256;const n=e.getContext("2d"),s=n.createImageData(256,256);for(let o=0;o<256;o++)for(let a=0;a<256;a++){const l=(o*256+a)*4,c=a*Ue/256,h=o*Ue/256,u=Math.cos(c*9+h*7)*.27+Math.cos(c*17-h*11)*.14+Math.sin(c*31+h*19)*.07,d=Math.sin(c*7+h*13)*.27+Math.sin(c*19-h*9)*.13+Math.cos(c*29+h*23)*.08;s.data[l]=128+u*110,s.data[l+1]=128+d*110,s.data[l+2]=245,s.data[l+3]=255}n.putImageData(s,0,0);const r=new $d(e);return r.wrapS=r.wrapT=Rr,r.colorSpace=Li,r}function jc(i,t,e=.1,n=1){const s=Bi(n),r=i.attributes.position,o=new Float32Array(r.count*3),a=hn(t);for(let l=0;l<r.count;l++){const c=1+(s()-.5)*e;o[l*3]=a.r*c,o[l*3+1]=a.g*c,o[l*3+2]=a.b*c}return i.setAttribute("color",new un(o,3)),i}function Ke(i,t,e,n=12,s=0){const r=new xo(i.map(a=>new L(...a))),o=new Ha(r,n,t,5,!1);if(s){const a=o.attributes.position;for(let l=0;l<=n;l++){const c=r.getPointAt(l/n),h=1-s*l/n;for(let u=0;u<=5;u++){const d=l*6+u;a.setXYZ(d,c.x+(a.getX(d)-c.x)*h,c.y+(a.getY(d)-c.y)*h,c.z+(a.getZ(d)-c.z)*h)}}o.computeVertexNormals()}return new Jt(o,e)}function ii(i,t=[],e=new Set){i.updateMatrixWorld(!0);const n=new ue().copy(i.matrixWorld).invert(),s=new Map;i.traverse(r=>{if(!r.isMesh||r.isInstancedMesh||e.has(r)||Array.isArray(r.material))return;const o=r.material.uuid;s.has(o)||s.set(o,{material:r.material,meshes:[]}),s.get(o).meshes.push(r)});for(const{material:r,meshes:o}of s.values()){if(o.length<2)continue;const a=o.map(h=>h.geometry.clone().applyMatrix4(new ue().multiplyMatrices(n,h.matrixWorld))),l=ki(a,!1);for(const h of a)h.dispose();if(!l)continue;const c=new Jt(l,r);c.castShadow=o.some(h=>h.castShadow),c.receiveShadow=!0,t.push(l);for(const h of o){h.removeFromParent();const u=t.indexOf(h.geometry);u>=0&&(t.splice(u,1),h.geometry.dispose())}i.add(c)}}function ts(i=1,t=1,e=.08){const n=[],s=[],r=[];for(let c=0;c<=3;c++)for(let h=0;h<=40;h++){const u=c/3,d=.22+h/40*(Ue-.44),f=1+.027*Math.sin(d*7)+.016*Math.cos(d*13),m=Math.cos(d)*u*f,p=Math.sin(d)*u*f;n.push(m*i,e*(u*u)+.014*Math.sin(d*4)*u*u,p*t),s.push(m*.48+.5,p*.48+.5)}for(let c=0;c<3;c++)for(let h=0;h<40;h++){const u=c*41+h,d=u+40+1;r.push(u,u+1,d,d,u+1,d+1)}const l=new Se;return l.setAttribute("position",new Vt(n,3)),l.setAttribute("uv",new Vt(s,2)),l.setIndex(r),l.computeVertexNormals(),l}function Ol(i){const t=Bi(i),e=28,n=[[-.47,.57],[-.2,.91],[.15,1],[.52,.86],[.71,.61],[.76,.08]],s=[],r=[],o=[],a=Array.from({length:e+1},(h,u)=>.87+.12*Math.sin(u*1.51+i)+t()*.12);a[e]=a[0];for(let h=0;h<n.length;h++)for(let u=0;u<=e;u++){const d=u/e*Ue,f=n[h][1]*a[u],m=(Math.sin(d*5+i)+Math.sin(d*9-i))*.045;s.push(Math.cos(d)*f,n[h][0]+m*(h===5?.15:1),Math.sin(d)*f*.86),r.push(Math.cos(d)*f*.5+.5,Math.sin(d)*f*.5+.5)}for(let h=0;h<n.length-1;h++)for(let u=0;u<e;u++){const d=h*(e+1)+u,f=d+e+1;o.push(d,f,d+1,d+1,f,f+1)}const l=s.length/3;s.push(0,.764,0),r.push(.5,.5);for(let h=0;h<e;h++)o.push(l,(n.length-1)*(e+1)+h+1,(n.length-1)*(e+1)+h);const c=new Se;return c.setAttribute("position",new Vt(s,3)),c.setAttribute("uv",new Vt(r,2)),c.setIndex(o),c.computeVertexNormals(),c}function Kc(i){const t=Bi(i),e=[],n=[],s=[],r=[];for(let a=0;a<5;a++){const l=t()*Ue,c=.55+t()*.7,h=.1+t()*.35,u=.022+t()*.035,d=hn(a%2?"#819c42":"#526f33"),f=e.length/3;for(let m=0;m<=7;m++){const p=m/7,x=Math.cos(l)*h*p*p,g=Math.sin(l)*h*p*p,M=u*Math.sin(Math.PI*(p*.94+.04));for(const y of[-1,1])e.push(x+Math.cos(l+Math.PI/2)*M*y,p*c,g+Math.sin(l+Math.PI/2)*M*y),n.push(y*.5+.5,p),r.push(d.r*(.65+p*.35),d.g*(.65+p*.35),d.b*(.65+p*.35))}for(let m=0;m<7;m++){const p=f+m*2;s.push(p,p+1,p+2,p+1,p+3,p+2)}}const o=new Se;return o.setAttribute("position",new Vt(e,3)),o.setAttribute("uv",new Vt(n,2)),o.setAttribute("color",new Vt(r,3)),o.setIndex(s),o.computeVertexNormals(),o}function M1(){const i=new Ha(new xo([new L,new L(.03,.8,.015),new L(.1,1.8,.04)]),9,.013,5,!1);jc(i,"#64754a",.15,8);const t=new jn(1,7,7);t.scale(.065,.25,.065),t.translate(.1,1.61,.04),jc(t,"#5d3f27",.3,5);const e=Kc(92);e.scale(.8,1.45,.8);const n=ki([i,t,e],!1);return i.dispose(),t.dispose(),e.dispose(),n}function _1(i){const t=new jn(1,13,9),e=t.attributes.position;for(let n=0;n<e.count;n++){const s=e.getX(n),r=e.getY(n),o=e.getZ(n),a=1+.06*Math.sin(s*12+i)*Math.sin(o*13-r*7);e.setXYZ(n,s*a,r*.83*a,o*a)}return t.computeVertexNormals(),t}function b1(){const i=[],t=[],e=[];function n(r,o,a,l){const c=i.length/3;i.push(...r,...o,...a);const h=hn(l);for(let u=0;u<3;u++)t.push(h.r,h.g,h.b);e.push(c,c+1,c+2)}n([0,.025,-.1],[-.045,0,0],[0,.04,.09],"#16201b"),n([0,.025,-.1],[0,.04,.09],[.045,0,0],"#293327"),n([0,0,0],[-.17,.025,-.035],[-.12,.015,.07],"#a0b3b0"),n([0,0,0],[.12,.015,.07],[.17,.025,-.035],"#a0b3b0");const s=new Se;return s.setAttribute("position",new Vt(i,3)),s.setAttribute("color",new Vt(t,3)),s.setIndex(e),s.computeVertexNormals(),s}function Zr(i,t,e,n,{castShadow:s=!1,receiveShadow:r=!1,dynamic:o=!1}={}){const a=new te;a.name=n;const l=new Map,c=[],h=[],u=new Set,d=128;e.forEach((f,m)=>{const p=Math.floor(f.x/d)+":"+Math.floor(f.z/d);l.has(p)||l.set(p,[]),l.get(p).push(m)});for(const[f,m]of l){const p=new wn(i,t,m.length);p.name=n+" · "+f,p.castShadow=s,p.receiveShadow=r,p.userData.spatialChunk=!0,p.userData.chunkSpan=d,o&&p.instanceMatrix.setUsage(Ui),m.forEach((x,g)=>{c[x]={mesh:p,index:g}}),a.add(p),h.push(p)}return{group:a,meshes:h,count:e.length,setMatrixAt(f,m){const p=c[f];p.mesh.setMatrixAt(p.index,m),u.add(p.mesh)},setColorAt(f,m){const p=c[f];p.mesh.setColorAt(p.index,m)},finish(){for(const f of h)f.computeBoundingBox(),f.computeBoundingSphere(),f.boundingSphere.radius+=.75,f.instanceMatrix.needsUpdate=!0,f.instanceColor&&(f.instanceColor.needsUpdate=!0);u.clear()},flush(){for(const f of u)f.instanceMatrix.needsUpdate=!0;u.clear()}}}function S1(i,t,e={}){const n=Math.max(0,Math.floor(Number(e.regionIndex)||0)),s=e.seed??731+n*7919,r=x1(n,s),o=r.palette,a=Bi(s),l=new te;l.name="The living creek",i.add(l);const c=e.natural===!0,h=c?h1(r):null,u=h?.landmarks||[],d=h?.nest||null,f=h?.cover||[],m=[],p=[];let x=Qi,g=Qi,M={flow:.45},y=!1,v=null;const E=[],T=[],w=new Set,R=new Map,S=new Set,b=[],U=new Map,P=6;let G=null;const j={reflectionRenders:0,reflectionSkips:0,flyMatricesUpdated:0,spatialChunks:0,terrainUpdates:0};new ee(o.sky);const O=new ee(o.fog);i.fog?i.fog.color.copy(O):i.fog=new Fa(O,.0042);const B=Fl(s),K=Fl(s+9,!0),q=v1(s),Y=y1();b.push(B,K,q,Y);const H={terrain:new Ve({color:16777215,vertexColors:!0,map:K,roughness:1}),leaf:new Ve({color:o.leaf,map:q,roughness:.44,metalness:.025,side:Ce}),rock:new Ve({color:o.rock,map:B,roughness:.89}),mossRock:new Ve({color:o.moss,map:K,roughness:.94}),plant:new Ve({color:16777215,vertexColors:!0,roughness:.87,side:Ce}),bark:new Ve({color:o.bark,map:B,roughness:.94}),reed:new Ve({color:o.reed,map:B,roughness:.83}),compost:new Ve({color:"#57422e",map:K,roughness:1}),fruit:new Ve({color:"#b38539",map:B,roughness:.75}),darkFruit:new Ve({color:"#685831",map:K,roughness:.95})},st=[Ol(7),Ol(35),Ol(89)],_t=ts(),ne=_1(19),le=[{id:"home",x:8,z:8,radius:7.4,team:"neutral",name:"Willow Haven"},{id:"mudfang",x:-31,z:-30,radius:7,team:"enemy",name:"Mudfang Den"},{id:"redreed",x:31,z:-56,radius:7.6,team:"enemy",name:"Red Reed Stronghold"},{id:"mossjaw",x:-24,z:49,radius:7.1,team:"enemy",name:"Mossjaw Hollow"},{id:"blackpool",x:34,z:79,radius:8,team:"enemy",name:"Blackwater Nest"},{id:"thornback",x:-8,z:-91,radius:8,team:"enemy",name:"Thornback Root"},{id:"oldwillow",x:-38,z:96,radius:7.5,team:"neutral",name:"Αυλή της Γέρικης Ιτιάς"},{id:"quietbend",x:29,z:32,radius:6.8,team:"neutral",name:"Quiet Bend"},{id:"foxglove",x:-39,z:2,radius:6.8,team:"neutral",name:"Foxglove Island"},{id:"reedcrossing",x:3,z:-45,radius:6.8,team:"neutral",name:"Πέρασμα των Καλαμιών"},{id:"longreed",x:-4,z:67,radius:6.8,team:"neutral",name:"Νησίδα των Ανέμων"},{id:"eastshallows",x:58,z:35,radius:6.8,team:"neutral",name:"Ανατολικές Αβαθείς"}],ut={home:.65,mudfang:2.7,redreed:4.1,mossjaw:1.8,blackpool:5.2,thornback:7.1,oldwillow:2.9,quietbend:1.2,foxglove:2.1,reedcrossing:1.7,longreed:2.5,eastshallows:3.4},$=Bi(s^3582759),ot={home:{x:17,z:16,radius:7.4,elevation:.65},mudfang:{x:38,z:-19,radius:9,elevation:1.35},redreed:{x:-37,z:-46,radius:11,elevation:1.2},mossjaw:{x:-34,z:44,radius:11,elevation:1.05},blackpool:{x:40,z:86,radius:12,elevation:1.5},thornback:{x:-16,z:-120,radius:12,elevation:1.65}};for(const _ of le){const z=ot[_.id],N=c&&z?{x:z.x,z:z.z}:{x:_.x*xe,z:_.z*xe};Object.assign(_,r.toWorld(N.x,N.z)),_.radius=c?z?.radius||10:Math.max(36,_.radius*(_.id==="thornback"?5.8:4.9)),_.elevation=c?z?.elevation||1.1:Math.max(.45,ut[_.id]+(n?($()-.5)*.6:0)),_.shorePhase=N.x+(n?$()*Ue:0),n&&(_.yaw=r.yaw)}le.find(_=>_.id==="thornback").stronghold=!0;const Mt=[{id:"haven",name:"Απάνεμη Όχθη",x:0,z:12,radius:30,tint:"#77965d"},{id:"reedways",name:"Περάσματα των Καλαμιών",x:2,z:-50,radius:45,tint:"#a99d64"},{id:"westernroots",name:"Δυτικές Ρίζες",x:-34,z:22,radius:37,tint:"#657f67"},{id:"blackwater",name:"Βαθύ Νερό",x:10,z:75,radius:34,tint:"#496f79"}].map(_=>({..._,...r.toWorld(_.x*xe,_.z*xe),radius:_.radius*xe})),Xt={heron:r.toWorld(34*xe,14*xe),snake:r.toWorld(-38*xe,-22*xe),fish:r.toWorld(12*xe,48*xe)},Ft={heron:r.toWorld(43*xe,-73*xe),snake:r.toWorld(-39*xe,70*xe),fish:r.toWorld(11*xe,94*xe)};c&&(Object.assign(Xt,{heron:r.toWorld(34,15),snake:r.toWorld(-26,-23),fish:r.toWorld(5,-34)}),Object.assign(Ft,{heron:r.toWorld(41,-70),snake:r.toWorld(-34,62),fish:r.toWorld(7,106)}));const pe=c?le.map(_=>({..._,...r.toSource(_.x,_.z)})):[];function we(_,z){const N=r.toSource(_,z),F=N.x/xe,k=N.z/xe;if(c)return u1(N.x,N.z,ca(N.x+r.noiseOffset.x,N.z+r.noiseOffset.z),pe);const V=Math.sin(k*.032)*15+Math.sin(k*.073)*5,Z=Math.abs(F-V);let W=-2.2+ca(N.x+r.noiseOffset.x,N.z+r.noiseOffset.z)*.47+ni(44,71,Z)*6;W+=ni(47,72,Z)*(1.5+3.3*Math.sin(k*.036+.7)**2),W+=ni(105,132,Math.abs(k))*4.8;let it=null,ft=0;for(const Nt of le){const ae=_-Nt.x,Ae=z-Nt.z,Re=Math.hypot(ae,Ae),ge=r.toSource(ae,Ae),sn=Nt.radius*(1+.05*Math.sin(Math.atan2(ge.z,ge.x)*5+Nt.shorePhase));if(Re<sn+7){const tn=qy,cn=Nt.elevation-ni(tn,sn+7,Re)*(Nt.elevation+2.8);W=Math.max(W,cn);const mn=1-ni(tn,tn+8,Re);mn>ft&&(it=Nt,ft=mn)}}it&&(W=W*(1-ft)+it.elevation*ft);let At=null,Zt=0,Dt=1/0;for(const Nt of R.values()){const ae=Math.hypot(_-Nt.x,z-Nt.z),Ae=1-ni(Es,Es+aa,ae);(Ae>Zt||Ae===Zt&&Ae>0&&ae<Dt)&&(At=Nt,Zt=Ae,Dt=ae)}if(At){const Nt=W*(1-Zt)+At.elevation*Zt;W=Zt===1?At.elevation:Math.max(W,Nt)}return W}const D=new Ni(270*xe,270*xe,216,216);D.rotateX(-Math.PI/2);const ie=D.attributes.position,jt=new Float32Array(ie.count*3),Yt=hn(o.earth),Lt=hn(o.wet),re=hn(o.deep);for(let _=0;_<ie.count;_++){const z=ie.getX(_),N=ie.getZ(_),F=we(z,N);ie.setY(_,F);const k=re.clone().lerp(Lt,ni(-1.7,.05,F)).lerp(Yt,ni(.02,2,F));k.multiplyScalar(.88+ca(z*2,N*2)*.18),k.toArray(jt,_*3)}D.setAttribute("color",new un(jt,3)),D.computeVertexNormals(),K.repeat.set(44*xe,44*xe);const mt=new Jt(D,H.terrain);mt.receiveShadow=!0,mt.name="Creek bed and island banks",l.add(mt);const bt=135*xe,he=270*xe/216,ze=217;function I(_,z){const N=qc.clamp((_+bt)/he,0,216),F=qc.clamp((z+bt)/he,0,216),k=Math.min(215,Math.floor(N)),V=Math.min(215,Math.floor(F)),Z=N-k,W=F-V,it=V*ze+k,ft=it+ze,At=ie.getY(it),Zt=ie.getY(it+1),Dt=ie.getY(ft),Nt=ie.getY(ft+1);return Z+W<=1?At+Z*(Zt-At)+W*(Dt-At):Nt+(1-Z)*(Dt-Nt)+(1-W)*(Zt-Nt)}function A(_){const z=Es+aa+he*2;for(let N=0;N<ie.count;N++){const F=ie.getX(N),k=ie.getZ(N);if(Math.abs(F-_.x)>z||Math.abs(k-_.z)>z)continue;const V=we(F,k);ie.setY(N,V);const Z=re.clone().lerp(Lt,ni(-1.7,.05,V)).lerp(Yt,ni(.02,2,V));Z.multiplyScalar(.88+ca(F*2,k*2)*.18),Z.toArray(jt,N*3)}ie.needsUpdate=!0,D.attributes.color.needsUpdate=!0,D.computeVertexNormals(),D.computeBoundingBox(),D.computeBoundingSphere(),j.terrainUpdates++}const tt=Fl(s+9,!0);b.push(tt),H.mossRock.map=tt,H.compost.map=tt,H.darkFruit.map=tt;const lt=new Ni(266*xe,266*xe,88,88),ct=new Gy(lt,{textureWidth:512,textureHeight:512,waterNormals:Y,sunDirection:new L(.6,.8,-.3),sunColor:16771517,waterColor:3039835,distortionScale:2.5,alpha:.91,fog:!0});ct.name="Reflecting creek",ct.rotation.x=-Math.PI/2,ct.position.y=Qi,ct.material.transparent=!0,ct.material.depthWrite=!1,ct.renderOrder=-2,ct.material.uniforms.size.value=4.8,l.add(ct);const at=ct.onBeforeRender;let Ut=0;ct.onBeforeRender=function(_,z,N){if(ct.material.uniforms.eye.value.setFromMatrixPosition(N.matrixWorld),Ut++%2){j.reflectionSkips++;return}j.reflectionRenders++,at.call(this,_,z,N)};const ht=lt.attributes.position.array.slice(),Et=[],It=new te,gt=[];It.name="Willow trunks and tangled roots",l.add(It);for(let _ of[-1,1])for(let z=0;z<15;z++){const N=(-122+z*17+(a()-.5)*7)*xe,F=(_*(59+a()*15)+Math.sin(N/xe*.032)*15)*xe,{x:k,z:V}=r.toWorld(F,N),Z=we(k,V);if(Z<.2)continue;const W=new te;W.position.set(k,Z,V);const it=9+a()*14,ft=(a()-.5)*3,At=Ke([[0,-.8,0],[.25,it*.3,0],[ft,it*.72,.6],[ft*.8,it,1]],.68+a()*.65,H.bark,13,.72);At.castShadow=!0,W.add(At),Et.push(At.geometry);for(let Zt=0;Zt<5;Zt++){const Dt=Zt/5*Ue+a(),Nt=3+a()*4,ae=Ke([[0,.7,0],[Math.cos(Dt)*Nt*.45,.1,Math.sin(Dt)*Nt*.45],[Math.cos(Dt)*Nt,-.4,Math.sin(Dt)*Nt]],.15+a()*.2,H.bark,9,.82);ae.castShadow=!0,W.add(ae),Et.push(ae.geometry)}for(let Zt=0;Zt<4;Zt++){const Dt=a()*Ue,Nt=it*(.5+a()*.3),ae=3+a()*6,Ae=Ke([[ft*.4,Nt,0],[Math.cos(Dt)*ae*.45,Nt+2,Math.sin(Dt)*ae*.45],[Math.cos(Dt)*ae,Nt+3,Math.sin(Dt)*ae]],.16+a()*.2,H.bark,10,.83);W.add(Ae),Et.push(Ae.geometry);for(let Re=0;Re<70;Re++){const ge=Math.sqrt(a())*4,sn=a()*Ue;gt.push({x:k+Math.cos(Dt)*ae+Math.cos(sn)*ge,y:Z+Nt+3+(a()-.5)*3-Math.abs(ge)*.25,z:V+Math.sin(Dt)*ae+Math.sin(sn)*ge,angle:a()*Ue,scale:.65+a()*.6})}}It.add(W)}ii(It,Et);const Ct=new Se;Ct.setAttribute("position",new Vt([0,0,0,-.12,-.32,.035,0,-.38,.06,.12,-.32,.035,-.1,-.64,.02,0,-.76,.04,.1,-.64,.02,0,-1.05,0],3)),Ct.setAttribute("uv",new Vt([.5,0,0,.3,.5,.35,1,.3,0,.6,.5,.7,1,.6,.5,1],2)),Ct.setIndex([0,1,2,0,2,3,1,4,2,2,4,5,2,5,6,2,6,3,4,7,5,5,7,6]),Ct.computeVertexNormals(),jc(Ct,"#69834d",.25,s);const Qt=Zr(Ct,H.plant,gt,"Hanging willow foliage");gt.forEach((_,z)=>{pt.position.set(_.x,_.y,_.z),pt.rotation.set((a()-.5)*.8,_.angle,(a()-.5)*.7),pt.scale.setScalar(_.scale),pt.updateMatrix(),Qt.setMatrixAt(z,pt.matrix)}),Qt.finish(),l.add(Qt.group),j.spatialChunks+=Qt.meshes.length;function Ht(_){E.push(_);const z=Math.floor((_.x-_.radius)/P),N=Math.floor((_.x+_.radius)/P),F=Math.floor((_.z-_.radius)/P),k=Math.floor((_.z+_.radius)/P);for(let V=z;V<=N;V++)for(let Z=F;Z<=k;Z++){const W=V+":"+Z;U.has(W)||U.set(W,[]),U.get(W).push(_)}return _}const wt=[],de=[[],[],[]];function X(_,z,N=1.35+a()*.9){const F=Ht({id:"p"+E.length,type:"lily",x:_,z,y:.105,radius:N*.91,visualRadius:N,angle:a()*Ue,phase:a()*Ue});return wt.push(F),F}function yt(_,z,N=1.3+a()*1.3,F=.65+a()*.65){const k=Math.floor(a()*3),V=Ht({id:"p"+E.length,type:"rock",x:_,z,y:F*.76-.05,radius:N*.72,visualRadius:N,scaleY:F,angle:a()*Ue,variant:k});return de[k].push(V),V}const Tt=r.toWorld(3.7,1),Ot=r.toWorld(-3.9,2.2);if(X(0,0,3.1),X(Tt.x,Tt.z,2.3),yt(Ot.x,Ot.z,2.5,.9),c){const _=u.find(z=>z.id==="pond").findPoint;X(_.x,_.z,1.7)}function xt(_,z){const N=Math.hypot(z.x-_.x,z.z-_.z),F=Math.ceil(N/3.65),k=r.toSource(_.x,_.z),V=r.toSource(z.x,z.z);for(let Z=1;Z<F;Z++){const W=Z/F,{x:it,z:ft}=r.toWorld(k.x+(V.x-k.x)*W+Math.sin(W*Math.PI*3)*1.25,k.z+(V.z-k.z)*W);if(we(it,ft)>-.1)continue;const At=r.toSource(it,ft);c&&At.x>14&&At.x<32&&Math.abs(At.z+16)<3.7||(a()<.18?yt(it,ft,1.8+a()*.7,.65+a()*.55):X(it,ft,1.65+a()*.65))}}const dt={id:"origin",x:0,z:0},Gt=new Map(le.map(_=>[_.id,_]));Gt.set("origin",dt);const Be=[["origin","home"],["origin","foxglove"],["home","mudfang"],["home","quietbend"],["mudfang","reedcrossing"],["reedcrossing","redreed"],["reedcrossing","thornback"],["foxglove","mossjaw"],["quietbend","mossjaw"],["quietbend","eastshallows"],["mossjaw","longreed"],["longreed","blackpool"],["longreed","oldwillow"],["eastshallows","blackpool"],["redreed","thornback"]].map(([_,z])=>({from:_,to:z,start:Gt.get(_),end:Gt.get(z)}));for(const _ of Be)xt(_.start,_.end);if(c){const _=z=>u.find(N=>N.id===z);for(const[z,N]of[[dt,_("creek")],[_("creek"),_("roots")],[_("roots"),_("bank")],[_("bank"),d]])xt(z,N)}for(let _=0;_<1180;_++){const z=(a()-.5)*218*xe,N=((a()-.5)*108+Math.sin(z/xe*.032)*10)*xe,{x:F,z:k}=r.toWorld(N,z);if(we(F,k)>-.18)continue;const V=r.toSource(F,k);c&&V.x>14&&V.x<32&&Math.abs(V.z+16)<3.7||(U.get(Math.floor(F/P)+":"+Math.floor(k/P))||[]).some(W=>Math.hypot(W.x-F,W.z-k)<W.radius+1)||(a()<.15?yt(F,k,1.1+a()*2.3,.55+a()*1.2):X(F,k,1.1+a()*1.1))}for(const _ of le)Ht({id:"island-"+_.id,type:"land",x:_.x,z:_.z,y:_.elevation,radius:_.radius*.8});const ye=Zr(_t,H.leaf,wt,"Veined water lily leaves",{castShadow:!0,receiveShadow:!0,dynamic:!0}),Kn=g1(wt,_t.attributes.position.array);wt.forEach((_,z)=>{pt.position.set(_.x,_.y,_.z),pt.rotation.set((a()-.5)*.04,_.angle,(a()-.5)*.035),pt.scale.set(_.visualRadius,1,_.visualRadius*(.89+a()*.18)),pt.updateMatrix(),ye.setMatrixAt(z,pt.matrix),ye.setColorAt(z,hn(["#b6cf8a","#88ac67","#749d59","#c0cc7e","#729958"][Math.floor(a()*5)]))}),ye.finish(),l.add(ye.group),j.spatialChunks+=ye.meshes.length,de.forEach((_,z)=>{const N=Zr(st[z],z===1?H.mossRock:H.rock,_,"Weathered waterline outcrops",{castShadow:!0,receiveShadow:!0});_.forEach((F,k)=>{pt.position.set(F.x,-.05,F.z),pt.rotation.set(0,F.angle,0),pt.scale.set(F.visualRadius,F.scaleY,F.visualRadius),pt.updateMatrix(),N.setMatrixAt(k,pt.matrix),N.setColorAt(k,hn("#ffffff").multiplyScalar(.7+a()*.4))}),N.finish(),l.add(N.group),j.spatialChunks+=N.meshes.length});const vn=new Se,Lr=[],ai=[],Os=[];for(let _=0;_<=9;_++){const z=_/9,N=Math.sin(z*Math.PI)*.16;for(const F of[-1,1])Lr.push(F*N,.13*Math.sin(z*Math.PI)+.23*z*z,z*.65),ai.push(F*.5+.5,z)}for(let _=0;_<9;_++){const z=_*2;Os.push(z,z+1,z+2,z+1,z+3,z+2)}vn.setAttribute("position",new Vt(Lr,3)),vn.setAttribute("uv",new Vt(ai,2)),vn.setIndex(Os),vn.computeVertexNormals();const wo=new Ve({color:"#f4e5d5",roughness:.48,side:Ce}),Ur=wt.filter((_,z)=>z%23===5),Si=new wn(vn,wo,Ur.length*13);let Eo=0;for(const _ of Ur)for(let z=0;z<13;z++)pt.position.set(_.x+.24,_.y+.045,_.z),pt.rotation.set(z>7?.1:0,z/8*Ue,z>7?.1:0),pt.scale.setScalar(z>7?.67:1),pt.updateMatrix(),Si.setMatrixAt(Eo++,pt.matrix);l.add(Si);const li=[];for(let _=0;_<26e3;_++){const z=(a()-.5)*254*xe,N=(a()-.5)*254*xe,F=we(z,N);F<-.52||F>3.2||le.some(k=>Math.hypot(k.x-z,k.z-N)<k.radius*.68)||Math.hypot(z,N)<8||li.push({x:z,z:N,y:F,scale:.65+a()*2.2,angle:a()*Ue})}const To=Kc(44),ci=Zr(To,H.plant,li,"Curved river reeds",{receiveShadow:!0});li.forEach((_,z)=>{pt.position.set(_.x,_.y,_.z),pt.rotation.set(0,_.angle,0),pt.scale.set(.65+_.scale*.25,_.scale,.65+_.scale*.25),pt.updateMatrix(),ci.setMatrixAt(z,pt.matrix),ci.setColorAt(z,hn("#ffffff").multiplyScalar(.75+a()*.5))}),ci.finish(),l.add(ci.group),j.spatialChunks+=ci.meshes.length;const kr=li.filter((_,z)=>_.y<.5&&z%5===0),Za=M1(),Xi=Zr(Za,H.plant,kr,"Cattail patches");kr.forEach((_,z)=>{pt.position.set(_.x+.12,_.y,_.z),pt.rotation.set(0,_.angle,0),pt.scale.setScalar(.7+_.scale*.4),pt.updateMatrix(),Xi.setMatrixAt(z,pt.matrix)}),Xi.finish(),l.add(Xi.group),j.spatialChunks+=Xi.meshes.length;const Ao={value:0};H.plant.onBeforeCompile=_=>{_.uniforms.uCreekTime=Ao,_.vertexShader=`uniform float uCreekTime;
`+_.vertexShader,_.vertexShader=_.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 transformed.x += sin(uCreekTime * 1.1 + position.y * 2.3 + instanceMatrix[3].x * .13 + instanceMatrix[3].z * .17) * pow(max(position.y, 0.0), 1.6) * .035;`)},H.plant.customProgramCacheKey=()=>"creek-wind-1";function xs(_,z){const N=c?x-.065:-.1;let F=I(_,z),k=F>N?"land":"water",V=null;F<=N&&(F=c?x-.215:-.25);const Z=U.get(Math.floor(_/P)+":"+Math.floor(z/P))||[];for(const W of Z){if(W.type==="land")continue;const it=Math.hypot(_-W.x,z-W.z);if(it<=W.radius){let ft=W.y;if(W.type==="rock"&&(ft-=ni(W.radius*.62,W.radius,it)*.14*W.scaleY),c&&ft<=N)continue;ft>F&&(F=ft,k=W.type==="shelter"?"land":W.type,V=W)}}return a1(p,_,z)||{height:F,type:k,platform:V}}function Bs(_,z){return xs(_,z).height}function C(_,z){return Math.max(Bs(_,z),Kn(_,z))}const J=[{x:4.5/xe,z:-4/xe,rich:!1},{x:-10,z:12,rich:!0},{x:15,z:-20,rich:!1},{x:-25,z:-23,rich:!0},{x:26,z:-47,rich:!0},{x:-17,z:40,rich:!0},{x:27,z:69,rich:!0},{x:-4,z:-81,rich:!0},{x:-34,z:86,rich:!0},{x:23,z:26,rich:!1},{x:-33,z:7,rich:!1},{x:4,z:51,rich:!1},{x:9,z:-59,rich:!1},{x:-12,z:76,rich:!1},{x:39,z:-4,rich:!1},{x:-42,z:-59,rich:!0},{x:7,z:-39,rich:!0},{x:0,z:63,rich:!0},{x:53,z:33,rich:!0},{x:-24,z:17,rich:!1},{x:17,z:-70,rich:!1},{x:18,z:90,rich:!0}].map(_=>({..._,...r.toWorld(_.x*xe,_.z*xe)}));if(c)for(const[_,z]of[{x:4.5,z:-4},{x:18,z:14},{x:9,z:-24},{x:26,z:10},{x:31,z:-16},{x:-20,z:-8}].entries())Object.assign(J[_],r.toWorld(z.x,z.z));const et=[],nt=[],Q=[],vt=new te;l.add(vt);for(let _=0;_<J.length;_++){const z=J[_];we(z.x,z.z)<-.15&&yt(z.x,z.z,z.rich?3.2:2.2,.62);const F=Bs(z.x,z.z),k={id:"flies-"+_,x:z.x,z:z.z,y:F+.25,flies:z.rich?240:100,maxFlies:z.rich?240:100,rich:z.rich};if(c){const Z=[...u].sort((W,it)=>Math.hypot(z.x-W.x,z.z-W.z)-Math.hypot(z.x-it.x,z.z-it.z))[0]?.id||"creek";k.ecology={habitat:Z,activity:1},k.regenMultiplier=1}T.push(k);const V=new Jt(st[_%3],H.compost);V.position.set(z.x,F+.05,z.z),V.scale.set(z.rich?1.7:1.05,.28,z.rich?1.25:.75),V.rotation.y=a()*Ue,l.add(V),nt.push(V);for(let Z=0;Z<(z.rich?12:6);Z++){const W=a()*Ue,it=a()*(z.rich?1.5:.85),ft=.12+a()*.16;et.push({spot:_,groundOffset:ft,x:z.x+Math.cos(W)*it,y:F+ft,z:z.z+Math.sin(W)*it,scale:.12+a()*.18,rot:a()*Ue})}for(let Z=0;Z<3;Z++){const W=a()*Ue,it=.7+a()*.8,ft=Ke([[0,0,0],[it*.5,.02,.06],[it,.04,.14]],.035,H.bark,4);ft.position.set(z.x+(a()-.5)*1.6,F+.1,z.z+(a()-.5)*1.6),ft.rotation.y=W,vt.add(ft),Q.push(ft.geometry)}}ii(vt,Q);for(const _ of J)if(we(_.x,_.z)<-.15){const z=de.flat().find(N=>Math.abs(N.x-_.x)<.01&&Math.abs(N.z-_.z)<.01);if(z){const N=new Jt(st[z.variant],H.mossRock);N.position.set(z.x,-.05,z.z),N.rotation.y=z.angle,N.scale.set(z.visualRadius,z.scaleY,z.visualRadius),N.castShadow=!0,N.receiveShadow=!0,l.add(N)}}const Pt=new wn(ne,H.fruit,et.length);et.forEach((_,z)=>{pt.position.set(_.x,_.y,_.z),pt.rotation.set(.3,_.rot,.2),pt.scale.setScalar(_.scale),pt.updateMatrix(),Pt.setMatrixAt(z,pt.matrix),Pt.setColorAt(z,hn(["#cb9d59","#6d7341","#aa7044","#c5ad62"][z%4]))}),l.add(Pt);const Bt=[];for(let _=0;_<T.length;_++)for(let z=0;z<(T[_].rich?65:30);z++)Bt.push({spot:_,phase:a()*Ue,phase2:a()*Ue,r:.25+a()*(T[_].rich?2.3:1.35),height:.45+a()*1.9,speed:.65+a()*1.7,rank:z});const kt=T.map(()=>[]);for(const _ of Bt)kt[_.spot].push(_);const oe=new Ve({vertexColors:!0,roughness:.45,side:Ce}),$t=new wn(b1(),oe,Bt.length);$t.instanceMatrix.setUsage(Ui),$t.frustumCulled=!1,$t.name="Fly swarms",$t.count=0,l.add($t);const qt=c?f1({group:l,layout:r,terrainHeight:I,surface:xs,insertPlatform:Ht,materials:H,rockGeos:st,tube:Ke,leafGeometry:ts,bladeGeometry:Kc,geography:h}):null;qt&&m.push(...qt.grips);function Ee(_,z){return c&&xs(_,z).type==="water"?d1(r,_,z,M.flow):{x:0,z:0,strength:0}}function Ne(_,z){return c&&f.some(N=>Math.hypot(_-N.x,z-N.z)<N.radius*.85)&&I(_,z)>x-.5}function Ze(_){x=_,ct.position.y=_,ct.updateMatrix(),Si.position.y=_-Qi,Si.updateMatrix();for(const z of wt)z.y=.105+_-Qi}function We(_={}){if(!c)return!1;M={...M,..._.phase||{}},g=Qi+ns(Number(M.waterOffset)||0,-.75,.65),y||(Ze(g),y=!0);for(const N of T){const F=N.ecology?.habitat===M.foodShift?1.4:typeof M.foodShift=="string"?.45:1;N.regenMultiplier=F,N.ecology.activity=F}const z=_.nest;if(z&&Number.isFinite(z.x)&&Number.isFinite(z.z)){const N={id:"living-creek-nest",x:z.x,z:z.z,team:"ally",natural:!0,nestLevel:z.level??0,safe:z.safe,hp:1,maxHp:1};v?Qa(v,N):v=Po(N)}return qt.sync(_,x),!0}const Ie=64,Kt=new Ni(2,2),De=new ig;Kt.rotateX(-Math.PI/2),De.index=Kt.index,De.attributes.position=Kt.attributes.position,De.attributes.uv=Kt.attributes.uv;const Te=new Float32Array(Ie*3),yn=new Float32Array(Ie).fill(-100),wi=new Float32Array(Ie),Mn=new Float32Array(Ie*3);De.setAttribute("aCenter",new mr(Te,3)),De.setAttribute("aStart",new mr(yn,1)),De.setAttribute("aSize",new mr(wi,1)),De.setAttribute("aTint",new mr(Mn,3)),De.instanceCount=Ie;const qi=new Zn({transparent:!0,depthWrite:!1,side:Ce,uniforms:{uTime:{value:0}},vertexShader:"attribute vec3 aCenter; attribute float aStart; attribute float aSize; attribute vec3 aTint; uniform float uTime; varying vec2 vUv; varying float vLife; varying vec3 vTint; void main(){vUv=uv; vLife=(uTime-aStart)/2.4; vTint=aTint; vec3 p=position*aSize*(.35+clamp(vLife,0.,1.)*3.8)+aCenter; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}",fragmentShader:"varying vec2 vUv;varying float vLife;varying vec3 vTint;void main(){if(vLife<0.||vLife>1.)discard;float r=length(vUv-.5)*2.;float band=exp(-pow((r-.82)/(.026+vLife*.018),2.))* .58+exp(-pow((r-.64)/.026,2.))*.22;float a=band*pow(1.-vLife,1.6);gl_FragColor=vec4(vTint,a);}"}),Xe=new Jt(De,qi);Xe.frustumCulled=!1,Xe.renderOrder=2,l.add(Xe);let Dn=0,Tn=0;const Je=1100,Qe=new Float32Array(Je*3),Hs=new Float32Array(Je*3),hi=new Float32Array(Je),Ro=new Float32Array(Je),Uh=Array.from({length:Je},()=>({life:0,max:1,vx:0,vy:0,vz:0,water:!0}));let Pf=0;const Ei=new Se;Ei.setAttribute("position",new un(Qe,3).setUsage(Ui)),Ei.setAttribute("aColor",new un(Hs,3).setUsage(Ui)),Ei.setAttribute("aSize",new un(hi,1).setUsage(Ui)),Ei.setAttribute("aAlpha",new un(Ro,1).setUsage(Ui));const zf=new Zn({transparent:!0,depthWrite:!1,uniforms:{uScale:{value:500}},vertexShader:"attribute vec3 aColor;attribute float aSize;attribute float aAlpha;uniform float uScale;varying vec3 vColor;varying float vAlpha;void main(){vColor=aColor;vAlpha=aAlpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*uScale/max(.1,-mv.z),1.,35.);}",fragmentShader:"varying vec3 vColor;varying float vAlpha;void main(){vec2 p=gl_PointCoord-.5;float d=length(p)*2.;if(d>1.)discard;float shade=.6+.4*max(0.,1.-length(p-vec2(-.12,.12))*2.);gl_FragColor=vec4(vColor*shade,smoothstep(1.,.55,d)*vAlpha);}"}),ja=new Lm(Ei,zf);ja.frustumCulled=!1,ja.renderOrder=3,l.add(ja);function If(_,z,N){const F=Dn++%Ie;Te.set([_.x,c?(_.y??x)+.025:Math.max(-.005,(_.y??0)+.025),_.z],F*3),yn[F]=Tn,wi[F]=.7+z*.7,hn(N??"#c2e1d5").toArray(Mn,F*3);for(const V of["aCenter","aStart","aSize","aTint"])De.attributes[V].needsUpdate=!0}function kh(_,z,N,F){const k=Math.min(90,Math.round(18+z*21)),V=hn(N??(F?"#b2d7ce":"#d5bc80"));for(let Z=0;Z<k;Z++){const W=Pf++%Je,it=Uh[W],ft=a()*Ue,At=(.6+a()*2.7)*Math.sqrt(z);it.life=it.max=.5+a()*.8,it.vx=Math.cos(ft)*At,it.vz=Math.sin(ft)*At,it.vy=(1.5+a()*4)*Math.sqrt(z),it.water=F,Qe.set([_.x+(a()-.5)*.3,(_.y??0)+.12,_.z+(a()-.5)*.3],W*3),V.clone().multiplyScalar(.85+a()*.3).toArray(Hs,W*3),hi[W]=(.045+a()*.085)*(F?1:.8),Ro[W]=.9}Ei.attributes.aColor.needsUpdate=!0,Ei.attributes.aSize.needsUpdate=!0}function Df(_,z=1,N){z=ns(z,.1,4),If({x:_.x,y:c?x+.01:.01,z:_.z},z,N),kh({x:_.x,y:c?x+.03:.03,z:_.z},z,N,!0)}function Lf(_,z="#e9cb87",N=1){kh(_,N,z,!1)}function Nh(_,z,N,F=1){const k=[],V=[],Z=[],W=[],it=Bi(F),ft=16,At=20;for(let Dt=0;Dt<=ft;Dt++)for(let Nt=0;Nt<=At;Nt++){const ae=Nt/At*2-1,Ae=Dt/ft,Re=.5+Math.sqrt(Math.max(0,1-ae*ae))*N+.06*Math.sin(Ae*23+ae*5),ge=ae*_*(.97+.025*Math.sin(Ae*19));k.push(ge,Re,(Ae-.5)*z),V.push(Nt/At,Dt/ft),hn("#809549").multiplyScalar(.85+it()*.23).toArray(W,W.length)}for(let Dt=0;Dt<ft;Dt++)for(let Nt=0;Nt<At;Nt++){const ae=Dt*(At+1)+Nt,Ae=ae+At+1;Z.push(ae,Ae,ae+1,Ae,Ae+1,ae+1)}const Zt=new Se;return Zt.setAttribute("position",new Vt(k,3)),Zt.setAttribute("uv",new Vt(V,2)),Zt.setAttribute("color",new Vt(W,3)),Zt.setIndex(Z),Zt.computeVertexNormals(),Zt}function Ka(_,z,N){const F=new te,k=new Ve({color:"#a6bf76",map:q,vertexColors:!0,roughness:.78,side:Ce});N.push(k);const V=Nh(1.75,3.8,1.95,s+Math.round(_*7));N.push(V);const Z=new Jt(V,k);Z.castShadow=!0,Z.receiveShadow=!0,F.add(Z);for(let W=0;W<8;W++){const it=-1.85+W*.53,ft=[];for(let Zt=0;Zt<=12;Zt++){const Dt=Zt/12*Math.PI;ft.push([Math.cos(Dt)*1.75,.5+Math.sin(Dt)*1.96+.025,it+.025*Math.sin(Dt*4)])}const At=Ke(ft,.038,H.reed,18);N.push(At.geometry),F.add(At)}for(let W of[-1,1])for(let it=0;it<5;it++){const ft=-1.6+it*.8,At=Ke([[W*1.68,-.08,ft],[W*1.7,.45,ft],[W*1.38,1.5,ft]],.052,H.bark,5);N.push(At.geometry),F.add(At)}for(let W=0;W<7;W++){const it=.16+W*.12,ft=Ke([[-1.65,it,-1.8],[0,it+.025,-1.88],[1.65,it,-1.8]],.036,H.reed,8);N.push(ft.geometry),F.add(ft)}return ii(F,N,new Set([Z])),F.scale.setScalar(_),F.userData.roof=Z,F}const Nr={player:"#8ecf75",friendly:"#8ecf75",ally:"#8ecf75",enemy:"#cf7554",neutral:"#ceb785"};function Gs(_){if(typeof _=="string"&&_.startsWith("enemy")){const z=["#e8aa70","#d8786b","#b9ad81","#a9a0d4","#8dc2b8"],N=parseInt(_.replace(/\D/g,""),10)||0;return z[N%z.length]}return Nr[_]||Nr.neutral}const Ja=new Map;function Co(_){if(Ja.has(_))return Ja.get(_);const z=["player","ally","friendly"].includes(_),N=_==="neutral",F=(parseInt(String(_).replace(/\D/g,""),10)||0)%5,k=Ah(256,(V,Z)=>{V.fillStyle="#eee9cb",V.fillRect(0,0,Z,Z);for(let it=0;it<256;it+=4)V.fillStyle=it%8?"#ded9bd":"#f3eed3",V.fillRect(it,0,1,Z),V.fillRect(0,it,Z,1);V.save(),V.translate(38,23),V.scale(2.8,2.8),V.fillStyle=z?"#194333":N?"#494633":"#472c29",V.strokeStyle="#fff2c9",V.lineWidth=2,V.beginPath(),V.moveTo(32,3),V.lineTo(59,14),V.lineTo(56,44),V.quadraticCurveTo(53,55,32,68),V.quadraticCurveTo(11,55,8,44),V.lineTo(5,14),V.closePath(),V.fill(),V.stroke(),V.lineWidth=3.2,V.lineCap="round",V.lineJoin="round";const W=it=>{V.beginPath(),it.forEach((ft,At)=>At?V.lineTo(...ft):V.moveTo(...ft)),V.stroke()};if(z)V.beginPath(),V.moveTo(43,20),V.bezierCurveTo(28,17,18,26,21,38),V.bezierCurveTo(24,48,35,47,40,37),V.bezierCurveTo(43,30,40,24,43,20),V.stroke(),W([[20,51],[37,27]]),W([[28,40],[23,32]]),W([[32,35],[39,34]]);else if(N)W([[24,27],[32,19],[40,27]]),W([[32,19],[32,49]]),W([[23,40],[32,49],[41,40]]);else if(F===0)W([[20,19],[27,31],[22,44]]),W([[44,19],[37,31],[42,44]]),W([[28,46],[36,46]]);else if(F===1)W([[22,18],[18,36],[32,49],[46,36],[42,18]]),W([[25,30],[32,36],[39,30]]);else if(F===2)for(const[it,ft]of[[21,20],[32,15],[43,20]])W([[it,ft],[it,49]]),W([[it-4,ft+6],[it+4,ft+6]]);else F===3?(V.beginPath(),V.moveTo(44,17),V.bezierCurveTo(15,9,11,48,32,52),V.bezierCurveTo(39,53,44,50,47,45),V.bezierCurveTo(29,43,26,26,44,17),V.stroke()):W([[18,24],[25,30],[32,17],[39,30],[46,24],[41,46],[23,46],[18,24]]);V.restore()});return k.wrapS=k.wrapT=rs,Ja.set(_,k),b.push(k),k}function Uf(_,z,N=0){const F=new te;F.name="Woven reed courtyard and rooted foundations";const k=5.68;for(let V=0;V<43;V++){const Z=-5.58+V*.266,W=Math.sqrt(Math.max(0,k*k-Z*Z))*(.97+.02*Math.sin(V*1.7)),it=Ke([[-W,-.045,Z],[-W*.25,-.035,Z+.022],[W*.4,-.04,Z-.018],[W,-.045,Z+.015]],.077,H.bark,7);it.receiveShadow=!0,z.push(it.geometry),F.add(it)}for(let V=0;V<25;V++){const Z=-5.4+V*.45,W=Math.sqrt(Math.max(0,k*k-Z*Z))*.98,it=Ke([[Z,.018,-W],[Z+.025,.028,0],[Z-.018,.02,W]],.027,H.reed,10);z.push(it.geometry),F.add(it)}for(let V=0;V<16;V++){const Z=V/16*Ue,W=Math.cos(Z)*5.1,it=Math.sin(Z)*5.1,ft=(I(_.position.x+(W*Math.cos(N)+it*Math.sin(N))*se,_.position.z+(it*Math.cos(N)-W*Math.sin(N))*se)-_.position.y)/se,At=Ke([[W,Math.min(-.18,ft-.15),it],[W+.03,-.35,it-.02],[W,-.08,it]],.095,H.bark,5);z.push(At.geometry),F.add(At)}ii(F,z),_.add(F),_.userData.foundation=F}function kf(_,z){const N=new te,F=Ke([[0,0,0],[.04,1.6,0],[-.03,3.1,.02]],.047,H.bark,7);z.push(F.geometry),N.add(F);const k=new Se,V=[0,2.93,0,.9,2.8,.09,1.13,2.12,.02,.6,2.25,-.03,0,2.18,0],Z=[0,1,1,1,1,0,.5,.1,0,0];k.setAttribute("position",new Vt(V,3)),k.setAttribute("uv",new Vt(Z,2)),k.setIndex([0,1,3,1,2,3,0,3,4]),k.computeVertexNormals();const W=new Ve({color:Gs(_),roughness:.8,side:Ce,map:Co(_)}),it=new Jt(k,W);return it.castShadow=!0,N.add(it),N.userData.flag=it,N.userData.emblemTeam=_,z.push(k,W),N}function Nf(_,z,N){const F=Zy,k=jy,V=La,Z=.11,W=new te;W.name="Enclosed creek castle",_.add(W);const it=new te;it.name="Reinforced castle perimeter",_.add(it);const ft=Math.asin((k/2+.25)/F),At=44,Zt=(Ue-ft*2)/At,Dt=[],Nt=[],ae=2*(F+.65)*Math.tan(Zt/2)+.08;for(let rt=0;rt<At;rt++){const St=ft+Zt*(rt+.5),ce=Math.sin(St)*F,je=Math.cos(St)*F;Dt.push({x:ce,z:je,y:Z+V/2,w:ae,h:V,d:Ky,ry:St});for(const He of[-.29,.29]){const me=St+Zt*He;Dt.push({x:Math.sin(me)*F,z:Math.cos(me)*F,y:Z+V+.37,w:.76,h:.74,d:1.2,ry:me})}Nt.push({x:Math.sin(St)*(F+.64),z:Math.cos(St)*(F+.64),y:Z+1.65,w:ae*.7,h:3.1,d:.5,ry:St}),Nt.push({x:Math.sin(St)*(F+.4),z:Math.cos(St)*(F+.4),y:Z+3.5,w:ae*1.01,h:.28,d:.9,ry:St})}const Ae=[Math.PI/4,Math.PI*3/4,Math.PI*5/4,Math.PI*7/4],Re=[];for(const rt of Ae){const St=Math.sin(rt)*(F+.15),ce=Math.cos(rt)*(F+.15);Re.push({x:St,z:ce});for(let je=0;je<10;je++){const He=je/10*Ue;Dt.push({x:St+Math.sin(He)*1.42,z:ce+Math.cos(He)*1.42,y:Z+6.15,w:.6,h:.85,d:.66,ry:He})}}for(const rt of[-1,1])Dt.push({x:rt*(k/2+.62),z:F,y:Z+2.8,w:1.24,h:5.6,d:2}),Dt.push({x:rt*(k/2+.62),z:F,y:Z+5.95,w:1.6,h:.7,d:2.35}),Nt.push({x:rt*(k/2+.62),z:F+1.05,y:Z+2.4,w:1.32,h:4.8,d:.25});Dt.push({x:0,z:F,y:Z+4.85,w:k+1.2,h:.78,d:1.75});const ge=(rt,St,ce,je)=>{const He=new Gi(1,1,1),me=new wn(He,je,ce.length);return N.push(He),me.name=St,me.castShadow=!0,me.receiveShadow=!0,ce.forEach((rn,Zf)=>{pt.position.set((rn.x||0)/se,(rn.y||0)/se,(rn.z||0)/se),pt.rotation.set(rn.rx||0,rn.ry||0,rn.rz||0),pt.scale.set(rn.w/se,rn.h/se,rn.d/se),pt.updateMatrix(),me.setMatrixAt(Zf,pt.matrix)}),rt.add(me),me},sn=ge(W,"Continuous moss-stone walls and crenellations",Dt,H.mossRock);sn.userData.fullCount=Dt.length,sn.userData.firstCoursesCount=At*3,ge(it,"Whole-ring stone buttresses and gate reinforcement",Nt,H.rock);const tn=new Us(1,1.12,1,12,1),cn=new wn(tn,H.mossRock,4);N.push(tn),cn.name="Four castle defence towers",cn.castShadow=!0,cn.receiveShadow=!0,Re.forEach((rt,St)=>{pt.position.set(rt.x/se,(Z+2.9)/se,rt.z/se),pt.rotation.set(0,Ae[St],0),pt.scale.set(1.65/se,5.8/se,1.65/se),pt.updateMatrix(),cn.setMatrixAt(St,pt.matrix)}),W.add(cn);const mn=ts(1,1,.28),_n=new wn(mn,H.leaf,4);N.push(mn),_n.name="Folded leaf tower roofs",_n.castShadow=!0,Re.forEach((rt,St)=>{pt.position.set(rt.x/se,(Z+6.68)/se,rt.z/se),pt.rotation.set(0,Ae[St],0),pt.scale.set(2/se,2.4/se,2/se),pt.updateMatrix(),_n.setMatrixAt(St,pt.matrix)}),W.add(_n);const Jn=new te;Jn.name="Working south castle gate",Jn.position.set(0,Z/se,F/se),W.add(Jn);const Vs=[];for(const rt of[-1,1]){const St=new te;St.position.x=rt*k/(2*se),St.name=rt<0?"Left hinged gate":"Right hinged gate",Jn.add(St);const ce=[],je=[],He=k/2;for(let me=0;me<7;me++)ce.push({x:-rt*((me+.5)*He/7),y:V/2,z:0,w:He/7+.025,h:V-.08,d:.36});for(const me of[.65,1.9,3.2])je.push({x:-rt*He/2,y:me,z:.23,w:He-.1,h:.22,d:.2});ge(St,"Bound timber gate leaf",ce,H.bark),ge(St,"Gate cross braces",je,H.reed),Vs.push(St)}const vs=new te;vs.name="Breached gate fallen slabs",Jn.add(vs),ge(vs,"Broken gate timber",[{x:-1.45,y:.18,z:1.5,w:2.8,h:.3,d:3.5,ry:.18},{x:1.6,y:.23,z:.9,w:2.7,h:.35,d:3.2,ry:-.24}],H.bark);const Or=new Ni(1.7/se,1.9/se),Br=new Ve({map:Co(z.team),color:Gs(z.team),side:Ce,roughness:.85});N.push(Or,Br);const Ws=new Jt(Or,Br);return Ws.name="Castle gate clan crest",Ws.position.set(0,(Z+5.2)/se,(F+1.02)/se),W.add(Ws),_.userData.fortification=W,_.userData.palisade=it,_.userData.gate=Jn,_.userData.gateLeaves=Vs,_.userData.fallenGate=vs,_.userData.gateCrest=Ws,_.userData.fortWalls=sn,_.userData.fortTowers=cn,_.userData.fortTowerRoofs=_n,_.userData.fortificationGeometry={radius:F,gateWidth:k,wallHeight:V,gateDirection:{x:0,z:1},towerCount:4},W}function Ff(_){const z=Ka(1,Nr.ally,_);z.name="Stone keep beneath woven leaf roof",z.userData.groundWalls=[];const N=new te;N.name="Enclosed central keep";const F=(k,V,Z,W,it,ft,At=H.mossRock)=>{const Zt=new Gi(W,it,ft),Dt=new Jt(Zt,At);_.push(Zt),Dt.position.set(k,V,Z),Dt.castShadow=!0,Dt.receiveShadow=!0,N.add(Dt),V-it/2<.03&&z.userData.groundWalls.push({minX:k-W/2,maxX:k+W/2,minZ:Z-ft/2,maxZ:Z+ft/2,height:V+it/2})};F(-1.6,.68,0,.26,1.36,3.45),F(1.6,.68,0,.26,1.36,3.45),F(0,.68,-1.65,3.05,1.36,.25);for(const k of[-1,1])F(k*1.14,.68,1.64,.9,1.36,.26);F(0,1.22,1.64,1.45,.28,.27);for(const k of[-1.23,1.23])for(const V of[-1.34,1.34]){F(k,1.36,V,.58,2.72,.58);for(const Z of[-.2,.2])for(const W of[-.2,.2])F(k+Z,2.83,V+W,.19,.3,.19,H.rock)}return ii(N,_),z.add(N),z}function Fh(_){const z=Es+aa+3,N=k=>Math.hypot(k.x-_.x,k.z-_.z)<z,F=k=>[...R.values()].some(V=>Math.hypot(k.x-V.x,k.z-V.z)<Es-2);li.forEach((k,V)=>{N(k)&&(pt.position.set(k.x,I(k.x,k.z),k.z),pt.rotation.set(0,k.angle,0),pt.scale.set(.65+k.scale*.25,k.scale,.65+k.scale*.25),F(k)&&pt.scale.setScalar(0),pt.updateMatrix(),ci.setMatrixAt(V,pt.matrix))}),ci.finish(),kr.forEach((k,V)=>{N(k)&&(pt.position.set(k.x+.12,I(k.x,k.z),k.z),pt.rotation.set(0,k.angle,0),pt.scale.setScalar(F(k)?0:.7+k.scale*.4),pt.updateMatrix(),Xi.setMatrixAt(V,pt.matrix))}),Xi.finish(),T.forEach((k,V)=>{N(k)&&(k.y=xs(k.x,k.z).height+.25,nt[V].position.y=k.y-.2,nt[V].updateMatrix())}),et.forEach((k,V)=>{N(k)&&(pt.position.set(k.x,T[k.spot].y-.25+k.groundOffset,k.z),pt.rotation.set(.3,k.rot,.2),pt.scale.setScalar(k.scale),pt.updateMatrix(),Pt.setMatrixAt(V,pt.matrix))}),Pt.instanceMatrix.needsUpdate=!0,Pt.computeBoundingBox(),Pt.computeBoundingSphere()}function Oh(_,z){for(const k of R.values())if(Math.hypot(k.x-_,k.z-z)<.01)return k.elevation;const N=le.find(k=>Math.hypot(k.x-_,k.z-z)<.01);let F=N?Math.fround(N.elevation):Math.max(.35,Bs(_,z));if(!N){const k=Es+he,V=Math.max(0,Math.floor((_-k+bt)/he)),Z=Math.min(216,Math.ceil((_+k+bt)/he)),W=Math.max(0,Math.floor((z-k+bt)/he)),it=Math.min(216,Math.ceil((z+k+bt)/he));for(let ft=W;ft<=it;ft++)for(let At=V;At<=Z;At++){const Zt=ft*ze+At;Math.hypot(ie.getX(Zt)-_,ie.getZ(Zt)-z)<=k&&(F=Math.max(F,ie.getY(Zt)))}}return F}function Of(_){const z=Oh(_.x,_.z),N={id:_.id,x:_.x,z:_.z,elevation:z};return R.set(_.id,N),A(N),Fh(N),N}function Po(_,z={}){if((c||_.natural===!0)&&!z.preview){const rt=m1(_,{terrainHeight:I,materials:H,rockGeos:st,tube:Ke,leafGeometry:ts,mergeStaticParts:ii,teamColor:Gs});return l.add(rt),w.add(rt),p.push(rt.userData.refuge),rt}const N=!!z.preview,F=N?null:Of(_),k=new te;k.name="Shelter "+(_.id??""),k.position.set(_.x,F?.elevation??0,_.z),k.scale.setScalar(se),k.userData.id=_.id,k.userData.radius=Ps,k.userData.owned=[],k.userData.terrain=F;const V=k.userData.owned;Uf(k,V,Number.isFinite(_.yaw)?_.yaw:0),N||(k.userData.support=Ht({id:"shelter-"+_.id,type:"shelter",x:_.x,z:_.z,y:k.position.y+.11,radius:Ps-.2}),k.userData.landmark=Ht({id:"castle-land-"+_.id,type:"land",x:_.x,z:_.z,y:k.position.y,radius:Es+aa*.45})),Nf(k,_,V);const Z=Ff(V);Z.position.set(-.55,.04,-.5),k.add(Z),k.userData.core=Z,k.userData.keepCollision={rects:Z.userData.groundWalls.map(rt=>({minX:(rt.minX+Z.position.x)*se,maxX:(rt.maxX+Z.position.x)*se,minZ:(rt.minZ+Z.position.z)*se,maxZ:(rt.maxZ+Z.position.z)*se,height:(rt.height+Z.position.y)*se})),door:{x:Z.position.x*se,z:(Z.position.z+1.64)*se}};const W=kf(_.team,V);W.position.set(1.8,0,1.1),k.add(W),k.userData.banner=W;const it=new te;it.name="Additional sleeping leaves";const ft=Ka(.62,Nr[_.team],V);ft.position.set(-3,.01,.2),ft.rotation.y=-.5,it.add(ft),k.add(it),k.userData.extra=it;const At=new te;At.name="Hatchery";const Zt=Ka(.52,Nr[_.team],V);Zt.position.set(3.05,0,-1.8),Zt.rotation.y=.7,At.add(Zt);for(let rt=0;rt<5;rt++){const St=[];for(let je=0;je<=24;je++){const He=je/24*Ue;St.push([3.05+Math.cos(He)*.74,.06+rt*.065,-1.7+Math.sin(He)*.63])}const ce=Ke(St,.035,H.reed,25);V.push(ce.geometry),At.add(ce)}ii(At,V),k.add(At),k.userData.nursery=At;const Dt=new te;Dt.name="Leaf training yard and woven sparring dummies",Dt.position.set(-2.9,.07,-3.2);for(let rt=0;rt<3;rt++){const St=-.82+rt*.8,ce=rt%2?-.2:.2,je=new Jt(ts(.46,.65,.04),H.leaf);je.position.set(St,.025,ce+.6),je.rotation.y=(rt-1)*.35,V.push(je.geometry),Dt.add(je);for(const me of[-.21,.21]){const rn=Ke([[St+me,-.02,ce-.25],[St+me*.3,.48,ce-.3],[St,.96,ce-.25]],.035,H.bark,5);V.push(rn.geometry),Dt.add(rn)}const He=Ke([[St-.4,.64,ce-.2],[St,.72,ce-.28],[St+.4,.64,ce-.2]],.041,H.reed,6);V.push(He.geometry),Dt.add(He);for(let me=0;me<3;me++){const rn=new Jt(ts(.23,.37,.15),H.leaf);rn.position.set(St+(me-1)*.06,.59,ce-.19),rn.rotation.set(Math.PI/2,(me-1)*.25,(me-1)*.3),V.push(rn.geometry),Dt.add(rn)}for(const me of[-.12,.12]){const rn=Ke([[St+me,.89,ce-.22],[St+me*1.45,1.09,ce-.22],[St+me*.5,1.07,ce-.19],[St+me,.89,ce-.22]],.025,H.reed,10);V.push(rn.geometry),Dt.add(rn)}}for(const rt of[-1.2,1.2]){const St=Ke([[rt,-.04,-.65],[rt*.98,.75,-.68],[rt,.98,-.65]],.04,H.bark,5);V.push(St.geometry),Dt.add(St)}for(let rt=0;rt<2;rt++){const St=Ke([[-1.2,.45+rt*.28,-.65],[0,.38+rt*.28,-.7],[1.2,.45+rt*.28,-.65]],.025,H.reed,10);V.push(St.geometry),Dt.add(St)}ii(Dt,V),k.add(Dt),k.userData.training=Dt,k.userData.trainingPoint=new L(_.x-2.9*se,k.position.y+.12,_.z-2.5*se);const Nt=new te;Nt.name="Leaf-wrapped food cache",Nt.position.set(-2.8,.04,2.2);const ae=new wn(ne,H.fruit,15);for(let rt=0;rt<15;rt++)pt.position.set(rt%4*.32-.5,Math.floor(rt/8)*.25+.15,Math.floor(rt/4)%2*.35),pt.scale.setScalar(.22+rt%3*.025),pt.rotation.set(rt*.7,rt*.4,0),pt.updateMatrix(),ae.setMatrixAt(rt,pt.matrix),ae.setColorAt(rt,hn(rt%3?"#b7b06c":"#6d673f"));Nt.add(ae);for(let rt=0;rt<3;rt++){const St=Ke([[-.85,.05,-.3+rt*.45],[0,.02,-.3+rt*.45],[.85,.08,-.3+rt*.45]],.075,H.bark,5);V.push(St.geometry),Nt.add(St)}const Ae=new Jt(ts(1,.8,.23),H.leaf);Ae.position.set(0,.5,.1),Ae.rotation.z=.17,V.push(Ae.geometry),Nt.add(Ae),ii(Nt,V),k.add(Nt),k.userData.storage=Nt,k.userData.foodMesh=ae,k.userData.storageCover=Ae;const Re=new te;Re.name="Lookout perch",Re.position.set(3.1,0,2.5);for(let rt=0;rt<3;rt++){const St=rt/3*Ue,ce=Ke([[Math.cos(St)*.7,-.1,Math.sin(St)*.7],[Math.cos(St)*.44,1.4,Math.sin(St)*.44],[Math.cos(St)*.35,2.65,Math.sin(St)*.35]],.085,H.bark,7);V.push(ce.geometry),Re.add(ce)}for(let rt=0;rt<8;rt++){const St=-.6+rt*.17,ce=Ke([[-.7,2.35,St],[0,2.32,St],[.7,2.36,St]],.06,H.reed,4);V.push(ce.geometry),Re.add(ce)}const ge=new Jt(ts(1.1,.9,.08),H.leaf);ge.position.y=3.15,ge.rotation.x=.17,V.push(ge.geometry),Re.add(ge);for(let rt=0;rt<6;rt++){const St=Ke([[-.25,rt*.34,.63],[.25,rt*.34,.63]],.035,H.reed,2);V.push(St.geometry),Re.add(St)}ii(Re,V),k.add(Re),k.userData.watchtower=Re;const sn=new wn(st[1],H.mossRock,25);for(let rt=0;rt<25;rt++){const St=rt/25*Ue;pt.position.set(Math.cos(St)*2.15,-.12,Math.sin(St)*2.35-.5),pt.rotation.set(0,St,0),pt.scale.set(.25,.25,.25),pt.updateMatrix(),sn.setMatrixAt(rt,pt.matrix)}k.add(sn);const tn=new te;tn.name="Collapsed shelter remains";const cn=new Ve({color:"#839061",map:q,roughness:.94,side:Ce});V.push(cn);for(let rt=0;rt<6;rt++){const St=Nh(.62+rt%3*.16,1.35+rt%2*.55,.14+rt%3*.05,s+rt*19),ce=new Jt(St,cn);ce.position.set(-1.3+rt%3*.85,-.46+rt%2*.04,-1.5+Math.floor(rt/3)*1.7),ce.rotation.set((rt%2-.5)*.24,rt*1.71,(rt%3-1)*.13),ce.castShadow=!0,V.push(St),tn.add(ce)}for(let rt=0;rt<22;rt++){const St=rt*2.399,ce=.65+rt%5*.27,je=Math.cos(St)*(rt<14?1.2:3.4),He=Math.sin(St)*(rt<14?1.6:2.8)-.3,me=Ke([[je,.055,He],[je+Math.cos(St+.7)*ce*.6,.11+rt%3*.07,He+Math.sin(St+.7)*ce*.6],[je+Math.cos(St+.7)*ce,.04+rt%4*.06,He+Math.sin(St+.7)*ce]],rt%2?.045:.065,rt%2?H.reed:H.bark,4);me.castShadow=!0,V.push(me.geometry),tn.add(me)}ii(tn,V),k.add(tn),k.userData.ruin=tn;const mn=new wn(ne,H.fruit,8);mn.name="Supplies exposed in the ruins";for(let rt=0;rt<8;rt++)pt.position.set(-.5+rt%4*.29,.12+Math.floor(rt/4)*.08,1.35+Math.floor(rt/4)*.31),pt.rotation.set(rt*.43,rt*1.31,.2),pt.scale.setScalar(.16+rt%3*.025),pt.updateMatrix(),mn.setMatrixAt(rt,pt.matrix),mn.setColorAt(rt,hn(rt%2?"#a99958":"#d9a253"));k.add(mn),k.userData.looseLoot=mn;const _n=new Ve({color:"#edc371",emissive:"#e5a64c",emissiveIntensity:.7,roughness:.7});V.push(_n);const Jn=new Jt(ne,_n);Jn.position.set(1.7,.55,1.1),Jn.scale.set(.15,.22,.15),k.add(Jn),k.userData.lamp=Jn;const Vs=new tg("#ffd098",1.8,25,2);Vs.position.set(0,2.3,1.8),k.add(Vs),k.userData.light=Vs,k.updateMatrixWorld(!0),k.userData.buildingGroups={},k.userData.defaultPlacements={};for(const[rt,St]of Object.entries({store:"storage",nursery:"nursery",watchtower:"watchtower",training:"training"})){const ce=k.userData[St],je=new Nn().setFromObject(ce),He=k.worldToLocal(je.getCenter(new L)),me=new te;me.name=ce.name+" placement",me.position.set(He.x,ce.position.y,He.z),k.add(me),ce.position.sub(me.position),me.add(ce),k.userData[St]=me,k.userData.buildingGroups[rt]=me,k.userData.defaultPlacements[rt]={x:He.x*se,z:He.z*se,yaw:0}}k.updateMatrixWorld(!0);const vs=new Nn().setFromObject(Z),Or=k.worldToLocal(vs.getCenter(new L)),Br=vs.getSize(new L);k.userData.coreFootprint={x:Or.x*se,z:Or.z*se,width:Br.x,depth:Br.z},N||(l.add(k),w.add(k)),Qa(k,_);const Ws=new Set([k.userData.core.userData.roof,k.userData.storageCover,k.userData.banner.userData.flag]);return k.traverse(rt=>{rt.isMesh&&!Ws.has(rt)&&(rt.updateMatrix(),rt.matrixAutoUpdate=!1)}),k}function Qa(_,z={}){if(!_)return;if(_.userData.natural)return hf(_,z,Gs);const N=_.userData.visualState||{},F={...N,...z},k=Math.max(1,F.tier??1),V=F.buildings||{},Z=ns((F.hp??F.maxHp??100)/(F.maxHp??100),0,1),W=!!F.destroyed||Z<=0,it=F.team??N.team??"neutral",ft={};for(const[Re,ge]of Object.entries(F.buildingPlacements||{}))_.userData.buildingGroups[Re]&&ge&&Number.isFinite(ge.x)&&Number.isFinite(ge.z)&&Number.isFinite(ge.yaw??0)&&(ft[Re]={x:ge.x,z:ge.z,yaw:ge.yaw??0});_.userData.visualState={team:it,tier:k,hp:F.hp,maxHp:F.maxHp,buildings:{...V},buildingPlacements:ft,yaw:Number.isFinite(F.yaw)?F.yaw:0,storage:F.storage,resources:F.resources,lootTaken:!!F.lootTaken,gateHp:F.gateHp,gateOpen:!!F.gateOpen,destroyed:W,underConstruction:!!F.underConstruction,constructionProgress:ns(Number(F.constructionProgress)||0,0,1)},_.rotation.y=_.userData.visualState.yaw;for(const[Re,ge]of Object.entries(_.userData.buildingGroups)){const sn=ft[Re]||_.userData.defaultPlacements[Re];ge.position.x=sn.x/se,ge.position.z=sn.z/se,ge.rotation.y=sn.yaw}const At=_.userData.buildingGroups.training;_.updateMatrixWorld(!0),_.userData.trainingPoint.copy(At.getWorldPosition(new L)),_.userData.trainingPoint.y=_.position.y+.12,_.userData.team=it,_.userData.tier=k,_.userData.health=Z,_.userData.destroyed=W,_.userData.banner.userData.flag.material.color.set(Gs(it)),_.userData.banner.userData.emblemTeam!==it&&(_.userData.banner.userData.flag.material.map=Co(it),_.userData.banner.userData.flag.material.needsUpdate=!0,_.userData.banner.userData.emblemTeam=it),_.userData.gateCrest.material.color.set(Gs(it)),_.userData.gateCrest.material.map=Co(it);const Zt=!!(V.storage??V.store??!1);_.userData.core.visible=!W,_.userData.extra.visible=!W&&k>=2,_.userData.ruin.visible=W,_.userData.nursery.visible=!W&&!!(V.nursery||V.hatchery||V.spawn||V.breeding),_.userData.training.visible=!W&&!!(V.training||V.trainingGround||V.drill),_.userData.watchtower.visible=!W&&!!(V.watchtower||V.tower||V.guards);const Dt=!W&&!!(V.palisade||V.walls||V.wall||V.defense);_.userData.fortification.visible=!W,_.userData.palisade.visible=Dt;const Nt=Number.isFinite(F.gateHp)&&F.gateHp<=0;_.userData.gate.userData.breached=Nt,_.userData.gate.userData.open=!!F.gateOpen,_.userData.fallenGate.visible=Nt;for(let Re=0;Re<2;Re++){const ge=_.userData.gateLeaves[Re];ge.visible=!Nt,ge.rotation.y=F.gateOpen?(Re===0?-1:1)*Math.PI*.52:0}_.userData.core.rotation.z=W?0:(1-Z)*.09,_.userData.core.userData.roof.scale.y=W?1:.78+.22*Z;let ae=typeof F.storage=="number"?F.storage:F.storage?.food??F.resources??0;Number.isFinite(ae)||(ae=0),ae=Math.max(0,ae);const Ae=ae>0&&!F.lootTaken;_.userData.storage.visible=Zt&&(!W||Ae),_.userData.storage.rotation.z=W?-.08:0,_.userData.foodMesh.count=W&&!Ae?0:Math.min(15,Math.ceil(ae/8)),_.userData.storageCover.position.set(W?-.65:0,W?.1:.5,W?.52:.1),_.userData.storageCover.rotation.set(W?.28:0,0,W?-.32:.17),_.userData.looseLoot.visible=W&&Ae&&!Zt,_.userData.looseLoot.count=Math.min(8,Math.ceil(ae/5)),_.userData.banner.position.y=W?.035:0,_.userData.banner.rotation.set(W?.08:0,W?.35:0,W?1.49:Z<.25?.22:0),_.userData.lamp.visible=!W,W&&(_.userData.light.visible=!1),Bh(_),_.userData.collisionRevision=(_.userData.collisionRevision||0)+1}function Bh(_){const z=_.userData.visualState||{},N=hd({...z,mesh:_}),{stage:F,unfinished:k,wallHeight:V}=N,Z=!!z.destroyed,W=_.userData.fortWalls,it=V/La;if(W.visible=!Z&&F>=1,W.count=F===1?W.userData.firstCoursesCount:W.userData.fullCount,W.scale.y=it||1,W.position.y=.11*(1-(it||1))/se,W.updateMatrix(),_.userData.fortification.visible=!Z&&F>=1,_.userData.fortTowers.visible=!Z&&F>=2,_.userData.fortTowerRoofs.visible=!Z&&F>=3,_.userData.core.visible=!Z&&F>=3,_.userData.gate.visible=!Z&&!k,_.userData.gateCrest.visible=!Z&&!k,_.userData.banner.visible=!k,k)for(const ft of["extra","nursery","training","watchtower","storage","palisade","lamp","light","looseLoot"])_.userData[ft].visible=!1;_.userData.constructionStage=F,_.userData.constructionWallHeight=V}function Bf(_,z,N){if(_?.type!=="shelter")return!1;const F=N?.mesh||[...w].find(W=>W.userData.id===(_.siteId||_.campId));if(!F?.userData?.fortWalls)return!1;const k=ns(Number(z)||0,0,1);N&&(N.constructionProgress=k);const V=F.userData.visualState||{};return V.constructionProgress=k,V.underConstruction=N?.underConstruction??V.underConstruction??!0,F.userData.visualState=V,hd({...V,mesh:F}).stage!==F.userData.constructionStage&&(Bh(F),F.userData.collisionRevision=(F.userData.collisionRevision||0)+1),!0}function Hh(_){if(!_)return;if(G?.userData.camp===_&&Fr(),l.remove(_),w.delete(_),_.userData.refuge){_.userData.refuge.active=!1;const N=p.indexOf(_.userData.refuge);N>=0&&p.splice(N,1)}_===v&&(v=null);for(const N of[_.userData.support,_.userData.landmark])if(N){const F=E.indexOf(N);F>=0&&E.splice(F,1);for(const k of U.values()){const V=k.indexOf(N);V>=0&&k.splice(V,1)}}const z=_.userData.terrain;z&&(R.delete(z.id),A(z),Fh(z)),_.traverse(N=>{N.isInstancedMesh&&N.dispose()});for(const N of _.userData.owned||[])N.dispose?.()}function Hf(_){if(c||!["shelter","store","nursery","watchtower","training"].includes(_))return null;const z=Po({id:"construction-preview",x:0,z:0,team:"ally",tier:1,hp:350,maxHp:350,buildings:{},storage:{food:80}},{preview:!0});if(z.name="Construction preview: "+_,z.userData.previewType=_,z.userData.previewMaterials=[],_!=="shelter"){const F=z.userData.buildingGroups[_];for(const k of z.children)k.visible=k===F;F.visible=!0,F.position.x=F.position.z=0,F.rotation.y=0}const N=new Map;return z.traverse(F=>{if(F.isLight){F.visible=!1;return}if(!F.isMesh)return;F.castShadow=!1,F.receiveShadow=!1,F.renderOrder=8;const k=V=>{if(N.has(V))return N.get(V);const Z=V.clone();return Z.transparent=!0,Z.opacity=.46,Z.depthWrite=!1,Z.polygonOffset=!0,Z.polygonOffsetFactor=-1,Z.polygonOffsetUnits=-1,N.set(V,Z),z.userData.previewMaterials.push(Z),z.userData.owned.push(Z),Z};F.material=Array.isArray(F.material)?F.material.map(k):k(F.material)}),S.add(z),l.add(z),Gh(z,{x:0,y:0,z:0,yaw:0,valid:!1}),z.visible=!1,z}function Gh(_,{x:z,y:N,z:F,yaw:k=0,valid:V=!1}={}){if(_?.userData.previewType&&(Number.isFinite(z)&&(_.position.x=z),Number.isFinite(N)&&(_.position.y=N),Number.isFinite(F)&&(_.position.z=F),_.rotation.y=Number.isFinite(k)?k:0,_.visible=!0,_.userData.previewValid!==!!V)){_.userData.previewValid=!!V;for(const Z of _.userData.previewMaterials)Z.color?.set(V?"#69ed89":"#ef665b"),Z.emissive?.set(V?"#266c37":"#782d27"),"emissiveIntensity"in Z&&(Z.emissiveIntensity=.4)}}function Vh(_){!_||!S.has(_)||(S.delete(_),_.removeFromParent(),Hh(_))}function Fr(){if(!G)return;G.removeFromParent();const _=new Set,z=new Set;G.traverse(N=>{N.geometry&&_.add(N.geometry),N.material&&z.add(N.material)});for(const N of _)N.dispose();for(const N of z)N.dispose();G=null}function Gf(_){const z=_?.mesh||_;if(!z?.isObject3D)return Fr(),null;if(G?.userData.camp===z)return G;Fr(),G=new te,G.name="Construction courtyard guide",G.userData.camp=z;const N=(Ps-.2)/se,F=.075,k=(it,ft,At,Zt=!1)=>{const Dt=new Se().setFromPoints(it),Nt=new vh({color:ft,transparent:!0,opacity:At,depthWrite:!1}),ae=Zt?new Im(Dt,Nt):new zm(Dt,Nt);return ae.renderOrder=6,G.add(ae),ae},V=[];for(let it=0;it<96;it++){const ft=it/96*Ue;V.push(new L(Math.cos(ft)*N,F,Math.sin(ft)*N))}k(V,"#9fe5af",.78,!0);const Z=[];for(let it=-7;it<=7;it++){const ft=it*.7;if(Math.abs(ft)>=N)continue;const At=Math.sqrt(N*N-ft*ft);Z.push(new L(ft,F,-At),new L(ft,F,At),new L(-At,F,ft),new L(At,F,ft))}k(Z,"#b7ddbc",.22);const W=(it,ft)=>{const At=it.x/se,Zt=it.z/se,Dt=it.width/(2*se)+.025,Nt=it.depth/(2*se)+.025,ae=Math.cos(it.yaw||0),Ae=Math.sin(it.yaw||0),Re=F+.012,ge=(tn,cn)=>new L(At+tn*ae+cn*Ae,Re,Zt+cn*ae-tn*Ae);k([ge(-Dt,-Nt),ge(Dt,-Nt),ge(Dt,Nt),ge(-Dt,Nt)],"#ec8a72",.8,!0).name=ft+" outline";const sn=[];for(let tn=-Dt-Nt;tn<=Dt+Nt;tn+=.42){const cn=[];for(const mn of[-Dt,Dt]){const _n=tn-mn;_n>=-Nt&&_n<=Nt&&cn.push(ge(mn,_n))}for(const mn of[-Nt,Nt]){const _n=tn-mn;_n>-Dt&&_n<Dt&&cn.push(ge(_n,mn))}cn.length===2&&sn.push(...cn)}k(sn,"#d9806c",.35).name=ft+" hatch"};return W(z.userData.coreFootprint||{x:-1.1825*xr,z:-1.0664*xr,width:7.68*xr,depth:8.25*xr},"Main hut exclusion"),W(Yy,"Sleeping hut reservation"),z.add(G),G}let zo=0,Wh=Qi;const Vf=hn(o.water),Wf=hn(o.nightWater),Xf=hn("#fff0cb"),qf=hn("#7aa5cb");function $f(_,z,N=1,F){if(Tn=z,zo++,N=ns(N,0,1),Ao.value=z,c){const Z=1-Math.exp(-Math.max(0,Math.min(.5,Number(_)||0))*3);Ze(x+(g-x)*Z);const W=ct.material.uniforms.alpha,it=l1(F?.y,x);if(W.value+=(it-W.value)*(1-Math.exp(-Math.max(0,Math.min(.5,Number(_)||0))*8)),Math.abs(Wh-x)>.008){for(let ft=0;ft<wt.length;ft++){const At=wt[ft];pt.position.set(At.x,At.y,At.z),pt.rotation.set(0,At.angle,0),pt.scale.set(At.visualRadius,1,At.visualRadius),pt.updateMatrix(),ye.setMatrixAt(ft,pt.matrix)}ye.flush(),Wh=x}qt.update(x,z)}if(ct.material.uniforms.time.value=z*.45,ct.material.uniforms.waterColor.value.copy(Wf).lerp(Vf,N),ct.material.uniforms.sunColor.value.copy(qf).lerp(Xf,N),ct.material.uniforms.sunDirection.value.set(.35+.25*Math.sin(z*.008),.45+N*.4,-.45).normalize(),zo%3===0){const Z=lt.attributes.position;for(let W=0;W<Z.count;W++){const it=ht[W*3],ft=ht[W*3+1];Z.setZ(W,Math.sin(it*.33+ft*.21+z*.91)*.025+Math.sin(it*.14-ft*.38-z*.72)*.018)}Z.needsUpdate=!0}qi.uniforms.uTime.value=z;let k=!1;for(let Z=0;Z<Je;Z++){const W=Uh[Z];W.life<=0||(W.life-=_,W.vy-=9.2*_,Qe[Z*3]+=W.vx*_,Qe[Z*3+1]+=W.vy*_,Qe[Z*3+2]+=W.vz*_,Ro[Z]=Math.max(0,W.life/W.max)*.88,(Qe[Z*3+1]<(c?x-.03:-.03)||W.life<=0)&&(W.life=0,Ro[Z]=0),k=!0)}if(k&&(Ei.attributes.position.needsUpdate=!0,Ei.attributes.aAlpha.needsUpdate=!0),zo%2===0){let Z=0;for(let W=0;W<T.length;W++){const it=T[W];if(F&&(it.x-F.x)**2+(it.z-F.z)**2>90**2)continue;const ft=(it.rich?65:30)*ns(it.flies/it.maxFlies,0,1)*(c?Math.min(1,it.ecology?.activity??1):1);for(const At of kt[W]){if(At.rank>=ft)continue;const Zt=z*At.speed+At.phase;pt.position.set(it.x+Math.sin(Zt)*At.r+Math.sin(Zt*2.9)*.13,it.y+At.height+Math.sin(Zt*1.7+At.phase2)*.26,it.z+Math.cos(Zt*.83+At.phase2)*At.r),pt.scale.setScalar(.55+.3*Math.sin(At.phase2)**2),pt.rotation.set(Math.sin(Zt*3)*.25,-Zt,Math.sin(Zt*12)*.25),pt.updateMatrix(),$t.setMatrixAt(Z++,pt.matrix)}}$t.count=Z,j.flyMatricesUpdated=Z,Z&&($t.instanceMatrix.clearUpdateRanges(),$t.instanceMatrix.addUpdateRange(0,Z*16),$t.instanceMatrix.needsUpdate=!0)}zo%5===0&&F&&(wt.forEach((Z,W)=>{Math.hypot(F.x-Z.x,F.z-Z.z)>48||(pt.position.set(Z.x,Z.y+Math.sin(z*.9+Z.phase)*.018,Z.z),pt.rotation.set(Math.sin(z*.61+Z.phase)*.015,Z.angle,Math.cos(z*.8+Z.phase)*.015),pt.scale.set(Z.visualRadius,1,Z.visualRadius),pt.updateMatrix(),ye.setMatrixAt(W,pt.matrix))}),ye.flush());const V=[...w].filter(Z=>!Z.userData.natural&&!Z.userData.destroyed&&!Z.userData.visualState?.underConstruction).sort((Z,W)=>F?Z.position.distanceToSquared(F)-W.position.distanceToSquared(F):0).slice(0,3);for(const Z of w)Z.userData.natural||(Z.userData.light.visible=V.includes(Z),Z.userData.light.intensity=.25+(1-N)*3,Z.userData.lamp.material.emissiveIntensity=.3+(1-N)*1.3,Z.userData.banner.userData.flag.rotation.y=Math.sin(z*1.4+Z.position.x)*.06)}function Yf(){Fr();for(const N of[...S])Vh(N);i.remove(l);const _=new Set,z=new Set;l.traverse(N=>{N.isInstancedMesh&&N.dispose(),N.geometry&&_.add(N.geometry),N.material&&(Array.isArray(N.material)?N.material.forEach(F=>z.add(F)):z.add(N.material))});for(const N of qt?.resources||[])N.isBufferGeometry&&_.add(N),N.isMaterial&&z.add(N);for(const N of _)N.dispose();for(const N of z)N.dispose();for(const N of b)N.dispose();ct.material.uniforms.mirrorSampler?.value?.dispose?.(),w.clear();for(const N of p)N.active=!1;p.length=0}for(const _ of h?.refuges||[])Po({..._,natural:!0,team:"neutral",nestLevel:0});return l.traverse(_=>{_.updateMatrix(),_.matrixAutoUpdate=!1}),l.updateMatrixWorld(!0),{group:l,platforms:E,hotspots:T,campSites:le,mapRegions:Mt,routes:Be,predatorAnchors:Xt,bossAnchors:Ft,renderStats:j,seed:s,regionIndex:n,palette:o,toRegionPoint:r.toWorld,radius:Wy,boundary:Xy,revision:Vy,sampleHeight:Bs,cameraSurfaceHeight:C,getTerrainHeight:I,getSurface:xs,shelterLandHeight:Oh,update:$f,splash:Df,impact:Lf,createShelter:Po,updateShelter:Qa,setConstructionProgress:Bf,removeShelter:Hh,createBuildingPreview:Hf,setBuildingPreview:Gh,removeBuildingPreview:Vh,showBuildArea:Gf,hideBuildArea:Fr,dispose:Yf,water:ct,shelterRadius:Ps,shelterScale:se,natural:c,creekLandmarks:u,creekNest:d,creekCover:f,creekGrips:m,creekRefuges:p,creekSpawn:c?{x:0,z:0}:null,creekTerritories:c?le.filter(_=>_.team==="enemy"):[],setCreekState:We,currentAt:Ee,isCreekCover:Ne,get waterLevel(){return c?x:Qi}}}const fi=Math.PI*2,$e=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),Ye=(i,t,e)=>i+(t-i)*e,Yn=(i,t,e)=>{const n=$e((e-i)/(t-i));return n*n*(3-2*n)},jr=(i,t=0,e=0)=>{const n=Math.sin(i*127.1+t*311.7+e*74.7)*43758.5453;return n-Math.floor(n)},Oe=(i=0,t=0,e=0)=>new L(i,t,e),Bl=new Map,Hl=new Map;let es,Gl;const Jc=Oe(0,1,0);Oe();function Vl(i,t){if(typeof i=="number")return i;const e=$e(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n,r=s*s*(3-2*s);return Ye(i[n],i[n+1],r)}function zs(i,t){if(i.length===1)return[[i[0],1]];const e=$e(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n;return[[i[n],1-s],[i[n+1],s]]}function _e(i,t=0){return{color:i,mask:t}}class Hn{constructor(t=1){this.detail=t,this.p=[],this.uv=[],this.c=[],this.mask=[],this.si=[],this.sw=[],this.idx=[]}vertex(t,e=[0,0],n=[[0,1]],s={color:[1,1,1],mask:0}){const r=this.p.length/3;this.p.push(t.x,t.y,t.z),this.uv.push(...e),this.c.push(...s.color),this.mask.push(s.mask||0);let o=n.reduce((a,l)=>a+l[1],0)||1;for(let a=0;a<4;a++)this.si.push(n[a]?.[0]||0),this.sw.push((n[a]?.[1]||0)/o);return r}tri(t,e,n){this.idx.push(t,e,n)}quad(t,e,n,s,r=!1){r?(this.tri(t,n,e),this.tri(e,n,s)):(this.tri(t,e,n),this.tri(e,s,n))}tube(t,e,n,s={}){const{bones:r=[0],paint:o=()=>_e([.7,.7,.7],1),distort:a}=s,l=Math.max(2,Math.round((s.segments??28)*this.detail)),c=Math.max(3,Math.round((s.radial??16)*this.detail)),h=new xo(t.map(y=>y.isVector3?y:Oe(...y)),!1,"catmullrom",.5),u=this.p.length/3;for(let y=0;y<=l;y++){const v=y/l,E=h.getPoint(v),T=h.getTangent(v).normalize(),w=new L().crossVectors(Math.abs(T.y)>.94?Oe(0,0,1):Jc,T).normalize(),R=new L().crossVectors(T,w).normalize();for(let S=0;S<=c;S++){const b=S/c,U=b*fi,P=Math.cos(U)*Vl(e,v),G=Math.sin(U)*Vl(n,v),j=E.clone().addScaledVector(w,P).addScaledVector(R,G);a&&a(j,v,U,E);const O=typeof r=="function"?r(v,j):zs(r,v);this.vertex(j,[b,v],O,o(j,v,U))}}for(let y=0;y<l;y++)for(let v=0;v<c;v++){const E=u+y*(c+1)+v;this.quad(E,E+1,E+c+1,E+c+2)}const d=h.getPoint(0),f=h.getPoint(1),m=typeof r=="function"?r(0,d):zs(r,0),p=typeof r=="function"?r(1,f):zs(r,1),x=this.vertex(d,[.5,0],m,o(d,0,0)),g=this.vertex(f,[.5,1],p,o(f,1,0)),M=u+l*(c+1);for(let y=0;y<c;y++)this.tri(x,u+y+1,u+y),this.tri(g,M+y,M+y+1);return this}ellipsoid(t,e,{bone:n=0,rings:s=14,radial:r=24,paint:o=()=>_e([1,1,1]),rotationY:a=0,sculpt:l}={}){s=Math.max(3,Math.round(s*this.detail)),r=Math.max(4,Math.round(r*this.detail));const c=this.p.length/3,h=Oe(...t),u=Math.cos(a),d=Math.sin(a);for(let f=0;f<=s;f++){const m=f/s,p=Math.PI*m;for(let x=0;x<=r;x++){const g=x/r,M=fi*g;let y=Math.sin(p)*Math.cos(M)*e[0],v=Math.cos(p)*e[1],E=Math.sin(p)*Math.sin(M)*e[2];const T=Oe(y,v,E);l&&l(T,g,m);const w=Oe(T.x*u+T.z*d,T.y,-T.x*d+T.z*u).add(h);this.vertex(w,[g,m],[[n,1]],o(T,g,m))}}for(let f=0;f<s;f++)for(let m=0;m<r;m++){const p=c+f*(r+1)+m;this.quad(p,p+1,p+r+1,p+r+2)}return this}leaf(t,e,{bone:n=0,bones:s,segments:r=14,across:o=6,color:a=[.35,.45,.22],ridge:l=.025,mask:c=0,vein:h=!0}={}){r=Math.max(2,Math.round(r*this.detail)),o=Math.max(2,Math.round(o*this.detail));const u=new xo(t.map(f=>f.isVector3?f:Oe(...f)),!1,"catmullrom",.5),d=this.p.length/3;for(let f=0;f<=r;f++){const m=f/r,p=u.getPoint(m),x=u.getTangent(m).normalize(),g=new L().crossVectors(Math.abs(x.y)>.95?Oe(0,0,1):Jc,x).normalize();for(let M=0;M<=o;M++){const y=M/o*2-1,v=p.clone().addScaledVector(g,y*Vl(e,m));v.y+=l*(1-Math.abs(y))*Math.sin(m*Math.PI);const E=(h?.88+.12*Math.cos(m*45+Math.abs(y)*9):1)+.12*(1-Math.abs(y));this.vertex(v,[(y+1)/2,m],s?zs(s,m):[[n,1]],_e(a.map(T=>T*E),c))}}for(let f=0;f<r;f++)for(let m=0;m<o;m++){const p=d+f*(o+1)+m;this.quad(p,p+1,p+o+1,p+o+2,!0)}return this}geometry(){const t=new Se;return t.setAttribute("position",new Vt(this.p,3)),t.setAttribute("uv",new Vt(this.uv,2)),t.setAttribute("color",new Vt(this.c,3)),t.setAttribute("skinTintMask",new Vt(this.mask,1)),t.setAttribute("skinIndex",new ph(this.si,4)),t.setAttribute("skinWeight",new Vt(this.sw,4)),t.setIndex(this.idx),t.computeVertexNormals(),t.computeBoundingSphere(),t}}function Va(){const i=[],t={};return{defs:i,ids:t,bone(e,n,s=null){const r=i.length;return t[e]=r,i.push({name:e,p:n,parent:typeof s=="string"?t[s]:s}),r}}}function or(i,t=0,e=0){const n=1-Yn(.26,.47,i.y),s=Math.sin(i.x*31+Math.sin(i.z*13))*Math.sin(i.z*25+i.y*23),r=Yn(.42,.77,s)*.5,o=.75-r+.06*Math.sin(i.x*75+i.z*64),a=(1-Yn(.026,.065,Math.abs(i.x)))*Yn(.52,.67,i.y);return a>.3?_e([.78,.61,.18].map(l=>Ye(o,l,a)),1-a):_e([Ye(o,.76,n),Ye(o,.72,n),Ye(o,.49,n)],1-n*.96)}function ui(i,t=0,e=0){const n=(1-Yn(-.55,.1,Math.sin(e)))*.65,r=.79-.36*Yn(.38,.78,Math.sin(i.x*35+i.z*17)*Math.sin(i.y*39-i.z*23));return _e([Ye(r,.7,n),Ye(r,.66,n),Ye(r,.43,n)],1-n*.92)}function fd(i=1){const t=Va(),e=new Hn(i),n=new Hn(i),s=new Hn(i),r=new Hn(i),o=new Hn(i),a=new Hn(i),l=t.bone("pelvis",[0,.36,-.35]),c=t.bone("spine",[0,.43,-.07],l),h=t.bone("head",[0,.47,.29],c),u=t.bone("jaw",[0,.39,.37],h),d=t.bone("throat",[0,.29,.36],u),f=t.bone("eyeL",[-.292,.685,.53],h),m=t.bone("eyeR",[.292,.685,.53],h),p=t.bone("mouth",[0,.405,.755],u);e.tube([[0,.35,-.72],[0,.42,-.48],[0,.43,-.08],[0,.47,.3],[0,.46,.58],[0,.43,.75]],[.012,.32,.435,.43,.34,.018],[.012,.245,.27,.235,.145,.025],{segments:42,radial:36,bones:g=>zs([l,l,c,h,h],g),paint:or,distort(g,M,y){const v=Math.max(0,Math.sin(y));g.y+=v*.008*Math.sin(g.x*70+g.z*50);const E=Math.exp(-Math.pow((Math.abs(g.x)-.22)/.035,2));g.y+=E*v*.023*Math.sin(M*Math.PI)}});for(const g of[-1,1]){const M=g<0?f:m,y=[g*.292,.685,.53];e.ellipsoid([g*.292,.605,.405],[.15,.145,.165],{bone:h,rings:14,radial:24,paint:P=>or(P.clone().add(Oe(g*.292,.605,.405)))}),n.ellipsoid(y,[.106,.103,.113],{bone:M,radial:40,rings:22,rotationY:g*.32,paint(P,G,j){const O=P.z/.113,B=Math.pow(P.x/.084,2)+Math.pow(P.y/.029,2);if(O<.12)return _e([.065,.14,.018]);if(O<.34)return _e([.04,.065,.012]);if(O>.52&&B<1)return _e([.008,.012,.006]);const K=.12*Math.sin(Math.atan2(P.y,P.x)*51+Math.hypot(P.x,P.y)*120);return _e([.74+K,.52+K*.6,.08+K*.12])}});const v=t.bone(`hip${g}`,[g*.33,.32,-.33],l),E=t.bone(`knee${g}`,[g*.64,.24,.025],v),T=t.bone(`ankle${g}`,[g*.46,.09,-.61],E),w=t.bone(`foot${g}`,[g*.64,.045,-.49],T);e.ellipsoid([g*.64,.24,.025],[.143,.128,.148],{bone:E,rings:12,radial:18,paint:(P,G,j)=>ui(P.clone().add(Oe(g*.64,.24,.025)),G,Math.PI*(.5-j)),sculpt(P){P.x*=1+.06*Math.sin(P.z*30)}}),e.ellipsoid([g*.46,.09,-.61],[.069,.052,.071],{bone:T,rings:8,radial:12,paint:(P,G,j)=>ui(P.clone().add(Oe(g*.46,.09,-.61)),G,Math.PI*(.5-j))}),e.tube([[g*.3,.33,-.35],[g*.5,.3,-.21],[g*.64,.24,.025]],[.13,.223,.14],[.13,.173,.12],{segments:20,radial:22,bones:[v,v,E],paint:ui}),e.tube([[g*.64,.24,.025],[g*.57,.15,-.27],[g*.46,.09,-.61]],[.12,.105,.065],[.11,.09,.05],{segments:20,radial:18,bones:[E,E,T],paint:ui}),e.tube([[g*.46,.09,-.61],[g*.57,.06,-.55],[g*.72,.035,-.35]],[.06,.07,.047],[.047,.04,.025],{segments:12,radial:14,bones:[T,w,w],paint:ui});const R=[];for(let P=0;P<4;P++){const G=g*(.7+(P-1.5)*.075),j=-.34+.36*(1-Math.abs(P-1.5)*.16),O=[g*(.67+(P-1.5)*.028),.036,-.37],B=[Ye(O[0],G,.53),.037,-.18];e.tube([O,B,[G,.035,j]],[.032,.024,.007],[.02,.014,.006],{segments:10,radial:8,bones:[w],paint:ui}),R.push([G,.034,j*.66-.12])}for(let P=0;P<3;P++){const G=Oe(g*.68,.035,-.36),j=Oe(...R[P]),O=Oe(...R[P+1]),B=j.clone().lerp(O,.5).lerp(G,.2),K=e.vertex(G,[0,0],[[w,1]],or(G)),q=e.vertex(j,[1,0],[[w,1]],or(j)),Y=e.vertex(B,[.5,1],[[w,1]],or(B)),H=e.vertex(O,[0,1],[[w,1]],or(O));e.tri(K,q,Y),e.tri(K,Y,H),e.tri(Y,q,H)}const S=t.bone(`shoulder${g}`,[g*.3,.43,.31],c),b=t.bone(`elbow${g}`,[g*.48,.235,.4],S),U=t.bone(`wrist${g}`,[g*.46,.058,.62],b);e.ellipsoid([g*.48,.235,.4],[.064,.066,.064],{bone:b,rings:8,radial:12,paint:(P,G,j)=>ui(P.clone().add(Oe(g*.48,.235,.4)),G,Math.PI*(.5-j))}),e.tube([[g*.3,.43,.31],[g*.43,.33,.335],[g*.48,.235,.4]],[.092,.085,.061],[.09,.077,.059],{segments:14,radial:16,bones:[S,S,b],paint:ui}),e.tube([[g*.48,.235,.4],[g*.48,.14,.48],[g*.46,.058,.62]],[.062,.07,.039],[.058,.057,.03],{segments:12,radial:14,bones:[b,b,U],paint:ui});for(let P=0;P<4;P++){const G=g*(.44+(P-1.5)*.075),j=.81+.04*(1.5-Math.abs(P-1.5));e.tube([[g*.46,.055,.61],[Ye(g*.46,G,.6),.031,.74],[G,.025,j]],[.025,.017,.009],[.021,.014,.006],{segments:9,radial:8,bones:[U],paint:ui}),e.ellipsoid([G,.025,j],[.017,.01,.021],{bone:U,rings:6,radial:10,paint:()=>_e([.71,.65,.4],.4)})}for(let P=0;P<3;P++){const G=.32+P*.016;e.tube(Array.from({length:17},(j,O)=>[g*.415+Math.cos(O/16*fi)*.085,G+Math.sin(O/16*fi)*.072,.355+Math.sin(O/16*fi)*.02]),.009,.009,{segments:20,radial:6,bones:[S],paint:()=>_e([.38,.55,.12],.25)})}s.leaf([[g*.12,.695,-.08],[g*.31,.69,-.19],[g*.48,.52,-.38]],[.012,.14,.03],{bone:c,color:[.26,.4,.12],ridge:.025,segments:15}),s.leaf([[g*.04,.715,.05],[g*.2,.73,-.03],[g*.36,.59,-.2]],[.008,.13,.015],{bone:c,color:[.34,.48,.18],ridge:.035,segments:15}),r.leaf([[g*.17,.76,.4],[g*.21,.89,.32],[g*.24,.91,.18]],[.025,.055,.002],{bone:h,color:[.69,.53,.19],ridge:.015,segments:12});for(const[P,G,j,O,B]of[[g*.16,.745,-.005,.18,.21],[g*.29,.67,-.25,.17,.19]])o.ellipsoid([P,G,j],[O,.055,B],{bone:c,rings:8,radial:18,paint:(K,q)=>_e([.84+.08*Math.cos(q*fi*9),.79,.59]),sculpt(K){const q=1+.035*Math.cos(Math.atan2(K.x,K.z)*9);K.x*=q,K.z*=q}});for(let P=0;P<3;P++){const G=.19+P*.028,j=.455-P*.017;a.tube(Array.from({length:13},(O,B)=>[g*.478+Math.cos(B/12*fi)*.081,G+Math.sin(B/12*fi)*.027,j+Math.sin(B/12*fi)*.079]),.016,.014,{segments:14,radial:6,bones:[b],paint:()=>_e([.72,.47,.16])})}}const x=Array.from({length:13},(g,M)=>{const y=(M/12-.5)*.74;return[y,.414-.025*Math.abs(y)/.37,.748-.2*Math.pow(y/.37,2)]});return e.tube(x,.009,.009,{segments:34,radial:8,bones:[h],paint:()=>_e([.045,.065,.016])}),e.tube(x.map(g=>[g[0],g[1]-.019,g[2]+.001]),.009,.014,{segments:34,radial:8,bones:[u],paint:()=>_e([.65,.61,.35])}),e.ellipsoid([0,.284,.385],[.25,.125,.265],{bone:d,rings:18,radial:28,paint:()=>_e([.75,.72,.48]),sculpt(g){g.y+=.01*Math.sin(g.x*80)*Math.cos(g.z*60)}}),{type:"frog",rig:t,skin:e.geometry(),eyes:n.geometry(),armor:s.geometry(),shell:o.geometry(),bracers:a.geometry(),crest:r.geometry(),mouth:p,length:1.7,height:.8,scale:1}}function ar(i,t,e,n,s,r,o=.05){const a=Oe(...t).lerp(Oe(...e),.5);a.y+=o,i.leaf([t,a.toArray(),e],[.012,n,n*.7,.002],{bone:s,segments:13,across:6,ridge:.012,color:r,vein:!0})}function w1(){const i=Va(),t=new Hn,e=new Hn,n=i.bone("pelvis",[0,2.45,-.16]),s=i.bone("spine",[0,2.79,.02],n),r=i.bone("neck0",[0,2.97,.24],s),o=i.bone("neck1",[0,3.35,.03],r),a=i.bone("neck2",[0,3.82,.18],o),l=i.bone("head",[0,4.19,.6],a),c=i.bone("jaw",[0,4.12,.7],l),h=i.bone("mouth",[0,4.11,1.48],c),u=i.bone("eyeL",[-.125,4.25,.69],l),d=i.bone("eyeR",[.125,4.25,.69],l),f=m=>{const p=Yn(2.7,3.02,m.y)*.35;return _e([.54-p,.59-p,.61-p])};t.tube([[0,2.43,-.95],[0,2.58,-.53],[0,2.78,-.05],[0,2.99,.27]],[.02,.34,.41,.14],[.02,.39,.48,.18],{segments:30,radial:28,bones:[n,n,s,s],paint:f}),t.tube([[0,2.97,.24],[0,3.22,.16],[0,3.46,.015],[0,3.83,.18],[0,4.12,.52],[0,4.21,.65]],[.16,.15,.12,.1,.1,.13],[.17,.17,.14,.12,.13,.14],{segments:40,radial:20,bones:[r,r,o,a,l,l],paint(m,p,x){const g=Math.cos(x)>.7?.65:.9;return _e([g,g*.99,g*.91])}}),t.tube([[0,4.18,.36],[0,4.28,.57],[0,4.25,.76],[0,4.18,.91]],[.018,.15,.14,.045],[.02,.16,.14,.07],{segments:22,radial:20,bones:[l],paint(m){return m.y>4.32?_e([.07,.1,.12]):_e([.83,.86,.82])}}),t.tube([[0,4.19,.81],[0,4.18,1.04],[0,4.15,1.32],[0,4.12,1.6]],[.072,.055,.027,.001],[.06,.044,.022,.001],{segments:20,radial:10,bones:[l],paint(m,p){return _e([Ye(.74,.34,p),Ye(.47,.24,p),.075])}}),t.tube([[0,4.112,.81],[0,4.105,1.06],[0,4.103,1.36],[0,4.115,1.59]],[.063,.046,.022,.001],[.026,.02,.012,.001],{segments:18,radial:8,bones:[c],paint:()=>_e([.68,.38,.07])});for(const m of[-1,1]){const p=m<0?u:d;e.ellipsoid([m*.132,4.255,.69],[.029,.039,.043],{bone:p,rings:10,radial:18,paint:R=>Math.abs(R.x)>.022&&Math.abs(R.y)<.018&&Math.abs(R.z)<.021?_e([.005,.008,.006]):_e([.9,.7,.13])});const x=i.bone(`hip${m}`,[m*.14,2.47,-.12],n),g=i.bone(`knee${m}`,[m*.18,1.5,-.12],x),M=i.bone(`ankle${m}`,[m*.22,.16,.04],g),y=i.bone(`foot${m}`,[m*.22,.075,.15],M),v=(R,S)=>{const b=.8+.2*Math.sin(R.y*110);return _e([.38*b,.36*b,.21*b])};t.tube([[m*.14,2.47,-.12],[m*.18,1.73,-.15],[m*.18,1.5,-.12]],[.077,.04,.049],[.074,.037,.049],{segments:20,radial:12,bones:[x,x,g],paint:v}),t.tube([[m*.18,1.5,-.12],[m*.2,.7,-.02],[m*.22,.16,.04]],[.042,.024,.031],[.042,.023,.03],{segments:22,radial:10,bones:[g,g,M],paint:v});for(let R=0;R<4;R++){const S=R<3?(R-1)*.23:-.08,b=R<3?.54-.06*Math.abs(R-1):-.21;t.tube([[m*.22,.16,.04],[m*.22+S*.5,.065,(b+.04)*.55],[m*.22+S,.035,b]],[.025,.017,.006],[.023,.013,.005],{segments:12,radial:8,bones:[y],paint:v})}const E=i.bone(`wing${m}`,[m*.31,2.91,-.03],s),T=i.bone(`wingElbow${m}`,[m*.94,2.83,-.12],E),w=i.bone(`wingWrist${m}`,[m*1.5,2.68,-.24],T);t.leaf([[m*.31,2.91,-.03],[m*.95,2.84,-.18],[m*1.58,2.69,-.35]],[.08,.29,.1],{bones:[E,T,w],segments:22,across:10,ridge:.05,color:[.36,.43,.47]});for(let R=0;R<15;R++){const S=.42+R*.088,b=R<6?E:R<11?T:w;ar(t,[m*S,2.89-R*.014,-.05-R*.012],[m*(S+.22+R*.009),2.73-R*.023,-.76-R*.018],.105-R*.002,b,[.26+R*.004,.32+R*.004,.36+R*.004]),R<12&&ar(t,[m*S,2.94-R*.014,.035],[m*(S+.1),2.86-R*.017,-.44],.077,b,[.49,.55,.57])}for(let R=0;R<11;R++)ar(t,[m*(.11+.015*R),2.86-.042*R,-.21],[m*(.29+.009*R),2.7-.044*R,-.75-.022*R],.075,s,[.51+R*.013,.56+R*.012,.56+R*.012]);ar(t,[m*.065,4.34,.51],[m*.13,4.28,-.02],.018,l,[.04,.07,.09],.025)}for(let m=0;m<9;m++)ar(t,[(m-4)*.045,2.53,-.65],[(m-4)*.075,2.34,-1.34-.1*(1-Math.abs(m-4)/4)],.07,n,[.21,.28,.31]);for(let m=0;m<9;m++)ar(t,[(m-4)*.025,3.06,.35],[(m-4)*.044,2.48-.06*(m%3),.42],.032,s,[.79,.8,.72],.01);return{type:"heron",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:h,length:3,height:4.55,scale:1}}function E1(){const i=Va(),t=new Hn,e=new Hn,n=new Hn,s=i.bone("head",[0,.27,1.97]),r=[s];for(let u=1;u<=20;u++)r.push(i.bone(`coil${u}`,[0,.23,1.97-u*.22],r[u-1]));const o=i.bone("jaw",[0,.205,2.1],s),a=i.bone("mouth",[0,.19,2.48],o),l=i.bone("eyeL",[-.183,.346,2.21],s),c=i.bone("eyeR",[.183,.346,2.21],s),h=(u,d,f)=>{const m=1-Yn(.13,.22,u.y),p=.73-.26*Yn(.2,.65,Math.sin(u.z*7+u.x*18));return _e([Ye(p,.65,m),Ye(p,.6,m),Ye(p,.36,m)],1-m)};t.tube([[0,.25,2.05],[0,.23,1.4],[0,.23,.5],[0,.22,-.4],[0,.18,-1.5],[0,.09,-2.46]],[.13,.186,.205,.18,.115,.002],[.11,.16,.17,.15,.09,.003],{segments:100,radial:20,bones:u=>zs(r,u),paint:h,distort(u,d,f){u.y+=.003*Math.sin(d*390)*Math.sin(f*12)}}),t.tube([[0,.265,1.86],[0,.29,2.07],[0,.285,2.27],[0,.245,2.48]],[.115,.237,.202,.035],[.1,.12,.105,.038],{segments:24,radial:24,bones:[s],paint:h}),t.tube([[0,.192,1.99],[0,.179,2.25],[0,.207,2.47]],[.14,.19,.025],[.027,.035,.006],{segments:18,radial:16,bones:[o],paint:()=>_e([.66,.63,.42])});for(const u of[-1,1])e.ellipsoid([u*.183,.346,2.21],[.045,.043,.05],{bone:u<0?l:c,rings:12,radial:20,rotationY:u*.9,paint(d){return Math.abs(d.x)<.012&&d.z>.015?_e([.009,.008,.005]):_e([.69,.51,.12])}}),t.tube([[u*.2,.228,2.06],[u*.197,.218,2.29],[u*.045,.225,2.475]],.004,.004,{segments:20,radial:6,bones:[s],paint:()=>_e([.05,.06,.025])}),n.tube([[0,.194,2.47],[0,.19,2.73],[u*.06,.18,2.84]],[.014,.01,.001],[.007,.005,.001],{segments:16,radial:6,bones:[o],paint:()=>_e([.28,.025,.035])});return{type:"snake",rig:i,skin:t.geometry(),eyes:e.geometry(),tongue:n.geometry(),mouth:a,length:5,height:.43,scale:1}}function T1(){const i=Va(),t=new Hn,e=new Hn,n=i.bone("spine",[0,.6,.18]),s=i.bone("head",[0,.61,.78],n),r=i.bone("tail0",[0,.55,-.44],n),o=i.bone("tail1",[0,.49,-.99],r),a=i.bone("tail",[0,.48,-1.43],o),l=i.bone("jaw",[0,.42,1.03],s),c=i.bone("mouth",[0,.43,1.55],l),h=i.bone("eyeL",[-.22,.72,1.06],s),u=i.bone("eyeR",[.22,.72,1.06],s),d=x=>{const g=1-Yn(.35,.62,x.y),M=.74-.25*Yn(.1,.6,Math.sin(x.z*18+x.y*29)*Math.sin(x.y*35));return _e([Ye(M,.81,g),Ye(M,.78,g),Ye(M,.61,g)],1-g)};t.tube([[0,.48,-1.46],[0,.51,-.92],[0,.61,-.28],[0,.64,.34],[0,.62,.84],[0,.55,1.24],[0,.52,1.56]],[.018,.15,.31,.35,.29,.19,.027],[.035,.22,.46,.48,.32,.19,.05],{segments:54,radial:28,bones:x=>zs([a,o,r,n,s,s,s],x),paint:d}),t.tube([[0,.43,.92],[0,.36,1.25],[0,.445,1.56]],[.14,.16,.025],[.055,.065,.018],{segments:18,radial:18,bones:[l],paint:()=>_e([.72,.69,.49])});const f=[.33,.4,.23],m=t.p.length/3;for(let x=0;x<=18;x++){const g=x/18,M=Math.cos(g*Math.PI)*.62,y=-1.45-(.3+.3*Math.abs(Math.cos(g*Math.PI)));for(let v=0;v<=6;v++){const E=v/6,T=Oe(.025*Math.sin(g*Math.PI),.48+M*E,Ye(-1.43,y,E)),w=x%2?.85:1.15;t.vertex(T,[E,g],[[a,1]],_e(f.map(R=>R*w),.3))}}for(let x=0;x<18;x++)for(let g=0;g<6;g++){const M=m+x*7+g;t.quad(M,M+1,M+7,M+8)}const p=(x,g,M,y,v=1)=>{const E=Oe(...x).lerp(Oe(...g),.5);E.x+=v*M,t.leaf([x,E.toArray(),g],[.01,M*.8,.003],{bone:y,segments:16,across:8,ridge:.014,color:f,mask:.3})};for(const x of[-1,1]){e.ellipsoid([x*.22,.72,1.06],[.052,.07,.08],{bone:x<0?h:u,rings:12,radial:22,rotationY:x*1,paint(M){return M.z>.035&&Math.pow(M.x/.035,2)+Math.pow(M.y/.04,2)<1?_e([.005,.007,.004]):_e([.75,.59,.18])}});const g=i.bone(`fin${x}`,[x*.255,.42,.65],n);p([x*.255,.42,.65],[x*.63,.21,.11],.16,g,x),p([x*.2,.26,-.11],[x*.38,.13,-.57],.12,r,x),t.tube([[x*.24,.86,.71],[x*.31,.64,.67],[x*.24,.39,.69]],.009,.011,{segments:20,radial:6,bones:[s],paint:()=>_e([.19,.24,.12],.3)});for(let M=0;M<8;M++){const y=1.18+M*.04,v=x*(.12-M*.009);t.tube([[v,.445,y],[v*.9,.475,y+.005]],[.008,.001],[.008,.001],{segments:3,radial:5,bones:[l],paint:()=>_e([.78,.76,.56])})}}for(const x of[!0,!1]){const g=t.p.length/3,M=22;for(let y=0;y<=M;y++){const v=y/M,E=Ye(-.9,.18,v),T=x?.8+.22*v:.26-.1*v,w=Math.sin(Math.PI*v)*(x?.45:-.24),R=v<.5?r:n;for(let S=0;S<=6;S++){const b=S/6,U=Oe(.012*Math.sin(v*6),T+w*b,E-.1*b);t.vertex(U,[b,v],[[R,1]],_e(f.map(P=>P*(y%2?.85:1.1)),.2))}}for(let y=0;y<M;y++)for(let v=0;v<6;v++){const E=g+y*7+v;t.quad(E,E+1,E+7,E+8)}}return{type:"fish",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:c,length:3.65,height:1.65,scale:1}}function A1(i){if(Hl.has(i))return Hl.get(i);const t=256,e=new Uint8Array(t*t*4);for(let s=0;s<t;s++)for(let r=0;r<t;r++){const o=r/t,a=s/t;let l=.82+jr(r,s)*.18;if(i==="frog"){const d=Math.floor(o*28),f=Math.floor(a*28),m=o*28-d-.5,p=a*28-f-.5,x=Math.hypot(m,p),g=Math.exp(-x*x*38)*(.1+jr(d,f)*.18);l=.79+.16*jr(r,s)+g-.11*Math.exp(-Math.pow(x-.31,2)*300)}else if(i==="snake"||i==="fish"){const u=i==="snake"?28:35,d=a*u,f=Math.floor(d),m=o*20+f%2*.5,p=m-Math.floor(m)-.5,x=d-f-.5,g=Math.abs(p)*1.4+Math.abs(x);l=.74+.22*(1-Yn(.49,.72,g))+.04*jr(r,s)}else l=.79+.15*Math.sin(o*170+.4*Math.sin(a*31))**2+.06*jr(r,s);const c=(s*t+r)*4,h=Math.floor($e(l)*255);e[c]=e[c+1]=e[c+2]=h,e[c+3]=255}const n=new mh(e,t,t,Gn);return n.wrapS=n.wrapT=Rr,n.magFilter=ri,n.minFilter=os,n.generateMipmaps=!0,n.needsUpdate=!0,n.repeat.set(i==="heron"?1:2,i==="frog"?3:2),Hl.set(i,n),n}function R1(i,t){const e=A1(i),n=new Jd({color:16777215,vertexColors:!0,map:e,bumpMap:e,bumpScale:i==="frog"?.013:i==="heron"?.007:.009,roughness:i==="frog"?.32:i==="heron"?.68:.37,metalness:0,clearcoat:i==="heron"?0:.42,clearcoatRoughness:.25,envMapIntensity:.8,side:Ce}),s=new ee(t);return n.userData.tint=s,n.onBeforeCompile=r=>{r.uniforms.skinTint={value:s},r.vertexShader=`attribute float skinTintMask; varying float vSkinTint;
`+r.vertexShader,r.vertexShader=r.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vSkinTint = skinTintMask;`),r.fragmentShader=`uniform vec3 skinTint; varying float vSkinTint;
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
 diffuseColor.rgb *= mix(vec3(1.0),skinTint,vSkinTint);`)},n.customProgramCacheKey=()=>"anatomical-skin-v3",n}function C1(i,t){const e=new xn({color:i,side:In,transparent:!0,opacity:.91,depthWrite:!1,toneMapped:!1});return e.userData.thickness={value:t},e.onBeforeCompile=n=>{n.uniforms.outlineThickness=e.userData.thickness,n.vertexShader=`uniform float outlineThickness;
`+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <begin_vertex>","vec3 transformed = position + normal * outlineThickness;")},e.customProgramCacheKey=()=>"skeletal-silhouette-v3",e}function P1(i){const t=i.map(e=>{const n=new qd;return n.name=e.name,n});for(let e=0;e<i.length;e++){const n=i[e];t[e].position.fromArray(n.p),n.parent!==null&&n.parent!==void 0&&(t[e].position.sub(Oe(...i[n.parent].p)),t[n.parent].add(t[e]))}return{bones:t,skeleton:new gh(t),root:t[0]}}function z1(){if(!es){const n=[],s=[];for(let o=0;o<=48;o++){const a=o/48*fi,l=Math.sin(a),c=Math.cos(a),h=Math.abs(o%8-4)/4,u=-.018*c,d=u+.1+.205*h,f=1+.08*h;n.push(l*.255,u,c*.175,l*.27*f,d,c*.188*f,l*.231,u,c*.151,l*(.27*f-.024),d,c*(.188*f-.024))}for(let o=0;o<48;o++){const a=o*4,l=a+4;s.push(a,l,a+1,l,l+1,a+1),s.push(a+2,a+3,l+2,l+2,a+3,l+3),s.push(a+1,l+1,a+3,l+1,l+3,a+3),s.push(a,a+2,l,l,a+2,l+2)}es=new Se,es.setAttribute("position",new Vt(n,3)),es.setIndex(s),es.computeVertexNormals(),es.computeBoundingSphere(),es.computeBoundingBox(),Gl=new bh(.047,0),Gl.scale(.78,1.05,.5)}const i=new te;i.name="royal-crown",i.position.set(0,.22,-.11);const t=new Jt(es,new Ve({color:15910746,roughness:.29,metalness:.58,emissive:5911813,emissiveIntensity:.12}));t.name="royal-crown-gold",t.castShadow=!0,t.receiveShadow=!0,i.add(t);const e=new Jt(Gl,new Ve({color:14562379,roughness:.18,metalness:.2,flatShading:!0,emissive:4785420,emissiveIntensity:.12}));return e.name="royal-crown-ruby",e.position.set(0,.042,.195),i.add(e),i}function pd(i,t=0){const e=i==="frog"&&t?`${i}:${t}`:i;if(!Bl.has(e)){const n=i==="frog"?fd([1,.36,.18][t]):({heron:w1,snake:E1,fish:T1}[i]||fd)();for(const s of["skin","eyes","armor","shell","bracers","crest","tongue"])n[s]?.boundingSphere&&(n[s].boundingSphere.radius*=1.9);Bl.set(e,n)}return Bl.get(e)}function Wl(i,t,e,n,s,r,o){const a=Math.hypot(n.y,n.z),l=Math.hypot(s.y,s.z),c=n.y+s.y+r,h=n.z+s.z+o,u=Math.max(Math.abs(a-l)+1e-5,Math.min(a+l-1e-5,Math.hypot(c,h))),d=Math.atan2(h,c),f=-Math.sign(n.y*s.z-n.z*s.y)||1,m=Math.acos($e((a*a+u*u-l*l)/(2*a*u),-1,1)),p=d+f*m,x=p-Math.atan2(n.z,n.y);i.rotation.x=Math.atan2(Math.sin(x),Math.cos(x));const g=Math.cos(p)*a,M=Math.sin(p)*a,y=Math.atan2(h-M,c-g)-i.rotation.x-Math.atan2(s.z,s.y);t.rotation.x=Math.atan2(Math.sin(y),Math.cos(y)),e.rotation.x=-i.rotation.x-t.rotation.x}function I1(i,t){if(!i)return{type:"",phase:0,force:0};let e="kick",n=t;return typeof i=="string"?e=i:typeof i=="number"?n=i:(e=i.type||i.kind||"kick",n=i.phase??i.progress??t),n=$e(n),{type:e,phase:n,force:Math.sin(n*Math.PI)}}function Xl(i,t,e){const n=i.points;if(t<=n[0].s)return e.copy(n[0]),e;for(let s=1;s<n.length;s++)if(t<=n[s].s){const r=n[s-1],o=n[s],a=(t-r.s)/(o.s-r.s||1);return e.set(Ye(r.x,o.x,a),Ye(r.y,o.y,a),Ye(r.z,o.z,a))}return e.copy(n.at(-1)),e}function D1(i="frog",t={}){["frog","heron","snake","fish"].includes(i)||(i="frog");const e=pd(i),n=new te,s=new te;n.name=`creature-${i}`,s.name="anatomical-animation-pivot",n.add(s);const r=i==="frog"?7378989:i==="snake"?6715206:i==="fish"?8624996:16777215,o=R1(i,t.color??r);o.emissive.set(16777215),o.emissiveIntensity=0;const a=new Jd({color:16777215,vertexColors:!0,roughness:.13,clearcoat:1,clearcoatRoughness:.05,metalness:.05}),{bones:l,skeleton:c,root:h}=P1(e.rig.defs),u=new jo(e.skin,o);u.name=`${i}-weighted-surface`,u.add(h),s.add(u),u.castShadow=!0,u.receiveShadow=!0,u.frustumCulled=!0,n.updateMatrixWorld(!0),u.bind(c);const d=new jo(e.eyes,a);d.name="articulated-eyes",d.bind(c,u.bindMatrix),d.castShadow=!1,d.frustumCulled=!0,s.add(d);const f=new jo(e.skin,C1(t.outlineColor??(t.team==="enemy"?16741200:t.team==="player"?11075554:i==="frog"?8513956:16755275),i==="frog"?.018:.027));f.name="animated-color-silhouette",f.bind(c,u.bindMatrix),f.frustumCulled=!0,f.renderOrder=-1,s.add(f);const m=[];for(const ut of["armor","shell","bracers","crest","tongue"])if(e[ut]){const $=new Ve({color:16777215,vertexColors:!0,roughness:ut==="tongue"?.35:.79,side:Ce}),ot=new jo(e[ut],$);ot.name=ut,ot.bind(c,u.bindMatrix),ot.frustumCulled=!0,ot.castShadow=ut!=="tongue",ot.visible=ut==="tongue",s.add(ot),m.push(ot)}const p={};for(const ut of l)p[ut.name]=ut;const x=l.map(ut=>ut.position.clone()),g=new qe;g.name="mouth-attachment",l[e.mouth].add(g);let M=(t.seed||0)*.731,y=0,v="",E=1,T=0,w=0,R=0,S=!0,b=!1,U=null,P=1,G=!1,j=0,O={x:0,z:1,strength:0,life:0,duration:.26,heavy:!1},B={armor:null,weapon:null,crest:!1};const K=t.role||"scout",q=i==="frog"?["guardian","brute","tank"].includes(K)?[1.15,1.12,1.05]:["scout","hunter","agile"].includes(K)?[.96,.98,1.04]:[1.03,1.02,1.02]:[1,1,1];s.scale.set(...q);const Y=()=>{const ut=1+(E-1)*.04+Math.min(24,Math.max(0,P-1))*.004;s.scale.set(q[0]*ut,q[1]*ut,q[2]*ut)},H=()=>{for(const ut of m)ut.name==="armor"&&(ut.visible=i==="frog"&&B.armor==="reed"),ut.name==="shell"&&(ut.visible=i==="frog"&&B.armor==="shell"),ut.name==="bracers"&&(ut.visible=i==="frog"&&B.weapon==="reed"),ut.name==="crest"&&(ut.visible=i==="frog"&&B.crest&&!b)},st=()=>{for(let ut=0;ut<l.length;ut++)l[ut].rotation.set(0,0,0),l[ut].scale.set(1,1,1),l[ut].position.copy(x[ut])};let _t=null;function ne(ut){if(i!=="snake"||!ut?.points?.length||!ut.weight)return;_t||(_t={targets:Array.from({length:21},()=>new ue),local:new ue,inverse:new ue,point:Oe(),before:Oe(),after:Oe(),translation:Oe(),rotation:new hs,scale:Oe(1,1,1),localPosition:Oe(),localRotation:new hs,localScale:Oe()});const $=_t,ot=$e(ut.weight),Mt=ut.scale||1,Xt=ut.origin,Ft=Math.cos(ut.yaw||0),pe=Math.sin(ut.yaw||0);s.position.y*=1-ot,s.rotation.x*=1-ot,s.rotation.z*=1-ot;for(let D=0;D<=20;D++){const ie=D?p["coil"+D]:p.head,jt=1.97-D*.22,Yt=(D?jt:2.17)*Mt;Xl(ut,Yt,$.point),Xl(ut,Yt-.07*Mt,$.before),Xl(ut,Yt+.07*Mt,$.after);const Lt=$.after.x-$.before.x,re=$.after.z-$.before.z,mt=Math.hypot(Lt,re),bt=mt>1e-4?Math.atan2(Lt,re):ut.yaw||0;D||($.point.x-=Math.sin(bt)*.2*Mt,$.point.z-=Math.cos(bt)*.2*Mt);const he=($.point.x-Xt.x)/Mt,ze=($.point.z-Xt.z)/Mt,I=Math.max($.point.y,$.before.y,$.after.y);$.translation.set(Ft*he-pe*ze,(I-Xt.y)/Mt+(D?.26:.3),pe*he+Ft*ze),$.rotation.setFromAxisAngle(Jc,bt-(ut.yaw||0)),$.targets[D].compose($.translation,$.rotation,$.scale),$.local.copy($.targets[D]),D&&$.local.premultiply($.inverse.copy($.targets[D-1]).invert()),$.local.decompose($.localPosition,$.localRotation,$.localScale),ie.position.lerp($.localPosition,ot),ie.quaternion.slerp($.localRotation,ot),ie.scale.lerp($.localScale,ot)}p.jaw.rotation.x*=1-ot*.8;const we=m.find(D=>D.name==="tongue");we&&ot>.8&&(we.visible=!1)}const le={group:n,bones:p,skeleton:c,mesh:u,get crowned(){return b},get equipment(){return{...B}},get level(){return P},get working(){return G},stats:{type:i,vertices:e.skin.attributes.position.count+e.eyes.attributes.position.count,triangles:(e.skin.index.count+e.eyes.index.count)/3,boneCount:l.length,length:e.length,height:e.height,rigged:!0,renderLOD:0},setOutline(ut,$=!0){ut!=null&&f.material.color.set(ut),S=$,f.visible=$&&R===0},setRenderLOD(ut=0){const $=i==="frog"?$e(Math.round(Number(ut)||0),0,2):0;if($===R)return;R=$;const ot=pd(i,$);for(const Mt of[u,d,f,...m])Mt.geometry=ot[Mt===u||Mt===f?"skin":Mt===d?"eyes":Mt.name],Mt.boundingSphere=null,Mt.boundingBox=null,Mt.castShadow=$===0&&Mt!==d&&Mt!==f&&Mt.name!=="tongue";f.visible=S&&$===0,U&&(U.getObjectByName("royal-crown-gold").castShadow=$===0),le.stats.vertices=ot.skin.attributes.position.count+ot.eyes.attributes.position.count,le.stats.triangles=(ot.skin.index.count+ot.eyes.index.count)/3,le.stats.renderLOD=$},setTier(ut){E=$e(Math.round(ut||1),1,5),Y()},setLevel(ut){P=$e(Math.floor(Number(ut)||1),1,999),Y()},setEquipment(ut={}){return B=i==="frog"?{armor:["reed","shell"].includes(ut?.armor)?ut.armor:null,weapon:ut?.weapon==="reed"?"reed":null,crest:ut?.crest===!0}:{armor:null,weapon:null,crest:!1},H(),{...B}},setWorking(ut=!1){G=i==="frog"&&!!ut},setImpact(ut={}){const $=$e(Number(ut.strength)||0,0,1.5),ot=Number(ut.x)||0,Mt=Number(ut.z)||0,Xt=Math.hypot(ot,Mt)||1,Ft=$e(Number(ut.duration)||.26,.08,.5);O={x:ot/Xt,z:Mt/Xt,strength:$,life:$?Ft:0,duration:Ft,heavy:!!ut.heavy},o.emissiveIntensity=$?Math.min(.82,.34+$*.35):0},setCrowned(ut=!1){return b=i==="frog"&&!!ut,b&&!U&&(U=z1(),p.head.add(U)),U&&(U.visible=b,U.getObjectByName("royal-crown-gold").castShadow=R===0),H(),b},mouthWorld(ut=new L){return n.updateWorldMatrix(!0,!0),g.getWorldPosition(ut)},update(ut,$={}){ut=$e(Number(ut)||0,0,.1),M=$.time!==void 0?$.time+(t.seed||0)*.731:M+ut,st();const ot=Math.max(0,Number($.speed)||0),Mt=$e(ot/(i==="frog"?2.8:3));w=Ye(w,Mt,1-Math.exp(-ut*12));const Xt=$.swimming?1:0,Ft=typeof $.jump=="number"?$e($.jump):$.jump?.5:0,pe=typeof $.attack=="string"?$.attack:$.attack?.type||$.attack?.kind||($.attack?"kick":"");pe!==v?(y=0,v=pe):$.attack&&(y+=ut/.55);const we=I1($.attack,y),D=we.force,ie=typeof $.roar=="number"?$e($.roar):$.roar?1:0,jt=typeof $.hit=="number"?$e($.hit):$.hit?1:0;O.life=Math.max(0,O.life-ut),o.emissiveIntensity=O.life>0?Math.max(0,1-(O.duration-O.life)/.07)*Math.min(.82,.34+O.strength*.35):0,$.building!==void 0&&(G=i==="frog"&&!!$.building),j=Ye(j,G&&!$.dead&&!we.type&&ot<1?1:0,1-Math.exp(-ut*12)),T=Ye(T,$.dead?1:0,1-Math.exp(-ut*5)),s.position.set(0,0,0),s.rotation.set(0,0,0);const Yt=(M+(t.seed||0)*.4)%5.7,Lt=Yt>5.5?.08+.92*Math.abs((Yt-5.6)*10):1;if(p.eyeL&&(p.eyeL.scale.y=$e(Lt,.08,1)),p.eyeR&&(p.eyeR.scale.y=$e(Lt,.08,1)),i==="frog"){const re=$.hop||(Ft>0?{phase:"air",progress:1-Ft}:{phase:"idle",progress:0}),mt=$e(re.progress||0),bt=re.phase==="air",he=re.phase==="gather"?mt:0,ze=re.phase==="land"?Math.sin(mt*Math.PI):0,I=bt?Math.sin($e(mt/.14)*Math.PI/2)*(1-$e((mt-.16)/.48)):0,A=bt?$e((mt-.82)/.18):0,tt=bt?1-$e(mt/.14):0,lt=bt?$e((mt-.25)/.45)*(1-A):0,ct=bt?$e((mt-.6)/.35):0,at=M*7.8,Ut=Math.sin(at)*w;s.position.y=Xt?-.14+.023*Math.sin(M*3):-.085*(he+tt)-.075*ze,s.rotation.x=Xt?-.12:(he+tt)*.07-(bt?Math.sin(mt*Math.PI)*.12:0)+ct*.08*(1-A),p.spine.rotation.x=Math.sin(M*2.6)*.009,p.spine.scale.y=1+Math.sin(M*2.6)*.018,p.head.rotation.x=.02*Math.sin(M*1.7)-ie*.18-(bt?.04:0),p.jaw.rotation.x=-ie*.13-(we.type==="tongue"?D*.16:0),p.throat.scale.set(1+ie*.26,1+ie*1.45+Math.sin(M*2.5)*.035,1+ie*.25);for(const ht of[-1,1])if(Xt)p[`hip${ht}`].rotation.x=-.32*Ut,p[`hip${ht}`].rotation.z=ht*.07*Ut,p[`knee${ht}`].rotation.x=.62*Ut,p[`ankle${ht}`].rotation.x=-.25*Ut,p[`foot${ht}`].rotation.x=.2*Ut,p[`shoulder${ht}`].rotation.x=-.23*Ut,p[`elbow${ht}`].rotation.x=.28*Ut,p[`wrist${ht}`].rotation.x=-.12*Ut,p[`shoulder${ht}`].rotation.z=ht*(.22+.25*Ut),p[`elbow${ht}`].rotation.y=ht*.3;else if(!$.dead){const Et=e.rig.ids,It=bt?.085*tt+(-.1*I+.045*lt)*(1-tt):-s.position.y,gt=bt?.035*tt+(-.42*I+.11*lt)*(1-tt):.035*he,Ct=bt?.085*tt+(.085*(1-ct)-.035*ct)*(1-A)*(1-tt):-s.position.y,Qt=bt?(-.075*(1-ct)+.13*ct)*(1-A)*(1-tt):0;Wl(p[`hip${ht}`],p[`knee${ht}`],p[`ankle${ht}`],x[Et[`knee${ht}`]],x[Et[`ankle${ht}`]],It,gt),Wl(p[`shoulder${ht}`],p[`elbow${ht}`],p[`wrist${ht}`],x[Et[`elbow${ht}`]],x[Et[`wrist${ht}`]],Ct,Qt),p[`foot${ht}`].rotation.x=-I*.14}if(we.type==="kick"||we.type==="strike"){s.rotation.y=-D*.55,s.rotation.z=D*.22,s.position.y+=D*.16;const ht=e.rig.ids;Wl(p.hip1,p.knee1,p.ankle1,x[ht.knee1],x[ht.ankle1],.26*D,1.16*D),p.hip1.rotation.y=-D*.3,p.hip1.rotation.z=-D*.08,p["shoulder-1"].rotation.z=D*.55}else if(we.type==="slam"||we.type==="belly"){const ht=Math.sin(we.phase*Math.PI);s.rotation.x=-ht*.28,s.position.y+=ht*.22;for(const Et of[-1,1])p[`hip${Et}`].rotation.x-=ht*.7,p[`shoulder${Et}`].rotation.z=Et*ht*.45}else we.type==="tongue"&&(p.head.rotation.x-=D*.1,p.spine.rotation.x-=D*.07);if(j>.001){const ht=M*8.2,Et=.5+.5*Math.sin(ht),It=.5+.5*Math.sin(ht+Math.PI);p.spine.rotation.x+=.1*j,p.head.rotation.x+=(.12+.06*Et)*j,p.shoulder1.rotation.x-=(.25+Et*.85)*j,p.elbow1.rotation.x+=(.2+Et*.55)*j,p.wrist1.rotation.x-=Et*.3*j,p["shoulder-1"].rotation.x-=(.13+It*.35)*j,p["elbow-1"].rotation.x+=(.15+It*.2)*j,s.position.y+=.025*Math.cos(ht)*j}if(O.life>0){const ht=1-O.life/O.duration,Et=Math.sin(Math.min(1,ht/.22)*Math.PI/2)*Math.pow(1-ht,1.8)*O.strength,It=Et*(O.heavy?1.2:1);s.rotation.x+=O.z*.17*It,s.rotation.z-=O.x*.21*It,s.position.x+=O.x*.045*It,s.position.z+=O.z*.055*It,p.spine.scale.z*=1-.075*Et,p.head.rotation.x-=.15*It,p.head.rotation.z-=O.x*.08*It,p.jaw.rotation.x-=.12*It,p["shoulder-1"].rotation.z-=.1*It,p.shoulder1.rotation.z+=.1*It,p.eyeL.scale.y*=1-.55*Et,p.eyeR.scale.y*=1-.55*Et}else jt>0&&(s.rotation.x+=jt*.065);s.position.y-=T*.22,s.rotation.z+=T*1.35,p.spine.scale.y*=1-T*.15}else if(i==="heron"){const re=M*5.6,mt=w;s.position.y=.035*Math.sin(re*2)*mt,p.spine.rotation.x=-.03*Math.sin(re)*mt,p.neck0.rotation.x=.1*Math.sin(M*1.4)-D*.62,p.neck1.rotation.x=-.08*Math.sin(M*1.4)+D*.58,p.neck2.rotation.x=-.03+D*.7,p.head.rotation.x=-.06*Math.sin(M*1.8)+D*.48,p.jaw.rotation.x=-D*.5;for(const bt of[-1,1]){const he=re+(bt<0?Math.PI:0),ze=Math.sin(he);p[`hip${bt}`].rotation.x=ze*.31*mt,p[`knee${bt}`].rotation.x=Math.max(0,-ze)*.57*mt,p[`foot${bt}`].rotation.x=-.18*ze*mt,p[`wing${bt}`].rotation.y=bt*(1.24-D*1.07-jt*.55),p[`wing${bt}`].rotation.z=bt*(.07+D*(.5+.25*Math.sin(M*18))+jt*.5),p[`wingElbow${bt}`].rotation.y=bt*.12,p[`wingWrist${bt}`].rotation.z=bt*D*.18}s.rotation.z+=(O.life>0?0:jt*.08*Math.sin(M*32))+T*1.45,s.position.y-=T*1.8}else if(i==="snake"){const re=M*(3+w*5),mt=.055+w*.105;for(let he=1;he<=20;he++)p[`coil${he}`].rotation.y=Math.sin(re-he*.48)*mt,p[`coil${he}`].rotation.x=he<6?-D*.18*(1-he/7):.006*Math.sin(M*3-he);p.head.rotation.x=D*.45,p.head.rotation.y=Math.sin(re)*.035,p.jaw.rotation.x=-D*.62,s.position.y=D*.28;const bt=m.find(he=>he.name==="tongue");bt&&(bt.visible=!$.dead&&(Math.sin(M*3.7)>.77||D>.2)),s.rotation.z=T*.65+(O.life>0?0:jt*.1*Math.sin(M*32))}else if(i==="fish"){const re=M*(4+w*10),mt=.09+w*.22;p.spine.rotation.y=Math.sin(re)*mt*.2,p.head.rotation.y=-Math.sin(re)*mt*.13,p.tail0.rotation.y=Math.sin(re-.5)*mt,p.tail1.rotation.y=Math.sin(re-1.1)*mt*1.25,p.tail.rotation.y=Math.sin(re-1.6)*mt*1.2,p.jaw.rotation.x=-D*.62-.035*Math.sin(M*2.5);for(const bt of[-1,1])p[`fin${bt}`].rotation.z=bt*(.13+.16*Math.sin(M*6)),p[`fin${bt}`].rotation.y=bt*.15*Math.sin(M*5);s.rotation.x=-D*.35,s.position.y=.035*Math.sin(M*2),s.rotation.z=T*Math.PI+(O.life>0?0:jt*.14*Math.sin(M*35))}if(i!=="frog"&&O.life>0){const re=1-O.life/O.duration,mt=Math.sin(Math.min(1,re/.22)*Math.PI/2)*Math.pow(1-re,1.8)*O.strength*(O.heavy?1.2:1);s.rotation.x+=O.z*.055*mt,s.rotation.z-=O.x*.08*mt,p.head.rotation.x-=.075*mt,p.head.rotation.z-=O.x*.05*mt}i==="snake"&&ne($.snakePose)},dispose(){o.dispose(),a.dispose(),f.material.dispose();for(const ut of m)ut.material.dispose();U&&U.traverse(ut=>{ut.isMesh&&ut.material.dispose()}),c.dispose(),n.removeFromParent()}};return le.setTier(t.tier||1),le.setLevel(t.level||1),le.setEquipment(t.equipment),le.setCrowned(t.crowned),le.update(0,{}),n.userData.creature=le,le}const Ln=(i,t)=>Object.freeze({x:i,z:t}),br=["player","rival-1","rival-2"],L1=.78,Mi=.84,Cn=1e-5,Wa=Object.freeze([{id:"catapult-player",enclosureId:"yard-player",owner:br[0],x:-8.5,z:16},{id:"catapult-rival-1",enclosureId:"yard-rival-1",owner:br[1],x:-16,z:-8.5},{id:"catapult-rival-2",enclosureId:"yard-rival-2",owner:br[2],x:16,z:-8.5}].map(Object.freeze)),Wn=Object.freeze([{id:"base-player",owner:br[0],x:0,z:20.5,spawn:Ln(0,19.65),spawnHeading:Math.PI,stock:Ln(0,21.4),gate:Ln(0,17.9),approach:Ln(0,16.25),side:"north",halfWidth:3.1,halfDepth:2.6},{id:"base-rival-1",owner:br[1],x:-18,z:1,spawn:Ln(-17.35,1),spawnHeading:Math.PI/2,stock:Ln(-19.1,1),gate:Ln(-14.9,1),approach:Ln(-13.25,1),side:"east",halfWidth:3.1,halfDepth:2.9},{id:"base-rival-2",owner:br[2],x:18,z:1,spawn:Ln(17.35,1),spawnHeading:-Math.PI/2,stock:Ln(19.1,1),gate:Ln(14.9,1),approach:Ln(13.25,1),side:"west",halfWidth:3.1,halfDepth:2.9}].map(Object.freeze));function uf(i,t){return i.map(e=>{let n=-1/0,s=1/0;const r=e.halfWidth+.18,o=e.halfDepth+.18,a=Math.ceil(r*2/.22),l=Math.ceil(o*2/.22);for(let x=0;x<=a;x++)for(let g=0;g<=l;g++){const M=-r+r*2*x/a,y=-o+o*2*g/l,v=t(e.x+M,e.z+y);n=Math.max(n,v),s=Math.min(s,v)}const c=n+.16,h=Math.hypot(e.gate.x-e.x,e.gate.z-e.z),u=(e.gate.x-e.x)/h,d=(e.gate.z-e.z)/h,f=-d,m=u,p={x:e.gate.x+u*.18,z:e.gate.z+d*.18,dx:u,dz:d,rightX:f,rightZ:m,halfWidth:1.55,length:2.5,rows:10,cols:6,heights:[]};for(let x=0;x<=p.rows;x++)for(let g=0;g<=p.cols;g++){const M=x/p.rows*p.length,y=(g/p.cols*2-1)*p.halfWidth,v=p.x+u*M+f*y,E=p.z+d*M+m*y,T=t(p.x+u*p.length+f*y,p.z+d*p.length+m*y)+.015;p.heights.push(Math.max(c+(T-c)*x/p.rows,t(v,E)+.015))}return{id:e.id,baseId:e.id,x:e.x,z:e.z,halfWidth:r,halfDepth:o,height:c,minimum:s,ramp:p}})}function U1(i){return uf(Wn,i)}function k1(i){return uf(df,i)}function N1(i,t,e){if(!e)return null;for(const n of e){if(Math.abs(i-n.x)<=n.halfWidth+1e-7&&Math.abs(t-n.z)<=n.halfDepth+1e-7)return n.height;const s=n.ramp,r=i-s.x,o=t-s.z,a=r*s.dx+o*s.dz,l=r*s.rightX+o*s.rightZ;if(a<-1e-7||a>s.length+1e-7||Math.abs(l)>s.halfWidth+1e-7)continue;const c=Math.max(0,Math.min(s.rows,a/s.length*s.rows)),h=Math.max(0,Math.min(s.cols,(l/s.halfWidth+1)*.5*s.cols)),u=Math.min(s.rows-1,Math.floor(c)),d=Math.min(s.cols-1,Math.floor(h)),f=c-u,m=h-d,p=s.heights[u*(s.cols+1)+d],x=s.heights[u*(s.cols+1)+d+1],g=s.heights[(u+1)*(s.cols+1)+d],M=s.heights[(u+1)*(s.cols+1)+d+1];return(p+(x-p)*m)*(1-f)+(g+(M-g)*m)*f}return null}const df=Object.freeze(Wa.map(i=>Object.freeze({id:i.enclosureId,owner:i.owner,x:i.x,z:i.z,halfWidth:2.8,halfDepth:2.8,side:"south",gate:Ln(i.x,i.z+2.8),approach:Ln(i.x,i.z+4.45)}))),Xa=Object.freeze([...Wn.map(i=>Object.freeze({...i,kind:"shelter",height:2.3})),...df.map(i=>Object.freeze({...i,kind:"catapult",height:1.65}))]),ha=3.2,lr=.34;function F1(i){const t=[],e=(n,s,r,o,a,l="whole")=>t.push(Object.freeze({id:`${i.id}-${n}-${l}`,enclosureId:i.id,owner:i.owner,x:s,z:r,hw:o,hd:a,height:i.height}));for(const n of["north","south"]){const s=i.z+(n==="north"?-i.halfDepth:i.halfDepth);if(i.side===n){const r=(i.halfWidth-ha/2)/2;for(const o of[-1,1])e(n,i.x+o*(ha/2+r),s,r,lr/2,String(o))}else e(n,i.x,s,i.halfWidth+lr/2,lr/2)}for(const n of["west","east"]){const s=i.x+(n==="west"?-i.halfWidth:i.halfWidth);if(i.side===n){const r=(i.halfDepth-ha/2)/2;for(const o of[-1,1])e(n,s,i.z+o*(ha/2+r),lr/2,r,String(o))}else e(n,s,i.z,lr/2,i.halfDepth+lr/2)}return t}const fs=Object.freeze(Xa.flatMap(F1)),Rh=Object.freeze([{id:"grove-west",x:-7,z:9,radius:3.1},{id:"grove-east",x:8,z:6.4,radius:3.1},{id:"grove-middle",x:0,z:-4.5,radius:3.4},{id:"grove-northwest",x:-7.2,z:-8.8,radius:2.5},{id:"grove-northeast",x:7.6,z:-9.2,radius:2.5}].map(Object.freeze)),So=Object.freeze([{x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6},...Wa.map(i=>({x:i.x,z:i.z,r:.95,machine:!0}))]);function qa(i,t=0){return{minX:i.x-i.hw-t,maxX:i.x+i.hw+t,minZ:i.z-i.hd-t,maxZ:i.z+i.hd+t}}function Ch(i,t,e,n=0){return i>e.minX+n&&i<e.maxX-n&&t>e.minZ+n&&t<e.maxZ-n}function ff(i,t,e,n,s,r=0){const o=qa(s,r),a=e-i,l=n-t;let c=-1/0,h=1/0,u=0,d=0;for(const[f,m,p,x,g]of[[i,a,o.minX,o.maxX,"x"],[t,l,o.minZ,o.maxZ,"z"]]){if(Math.abs(m)<1e-12){if(f<p-Cn||f>x+Cn)return null;continue}const M=(p-f)/m,y=(x-f)/m,v=Math.min(M,y),E=Math.max(M,y);if(v>c&&(c=v,u=g==="x"?m>0?-1:1:0,d=g==="z"?m>0?-1:1:0),h=Math.min(h,E),c>h+Cn)return null}return h<0||c>1||c<0&&!Ch(i,t,o,-Cn)?null:{t:Math.max(0,c),nx:u,nz:d}}function O1(i,t,e,n,s=0){let r=1/0;for(const o of fs){const a=ff(i,t,e,n,o,s);a&&a.t<r&&(r=a.t)}return Number.isFinite(r)?r:null}function ks(i,t,e=.1){return O1(i.x,i.z,t.x,t.z,e)===null}function oo(i,t,e,n=L1){let s=i.x,r=i.z,o=Number.isFinite(t)?t:0,a=Number.isFinite(e)?e:0;for(let l=0;l<4;l++){let c=!1;for(const h of fs){const u=qa(h,n);if(!Ch(s,r,u,Cn))continue;const d=[{distance:s-u.minX,x:u.minX-Cn,z:r},{distance:u.maxX-s,x:u.maxX+Cn,z:r},{distance:r-u.minZ,x:s,z:u.minZ-Cn},{distance:u.maxZ-r,x:s,z:u.maxZ+Cn}];d.sort((f,m)=>f.distance-m.distance),s=d[0].x,r=d[0].z,c=!0}if(!c)break}for(let l=0;l<4&&(Math.abs(o)>Cn||Math.abs(a)>Cn);l++){let c=null;for(const f of fs){const m=ff(s,r,s+o,r+a,f,n);m&&(!c||m.t<c.t)&&(c=m)}if(!c){s+=o,r+=a;break}const h=Math.max(0,c.t-Cn);s+=o*h,r+=a*h;const u=1-c.t;o*=u,a*=u;const d=o*c.nx+a*c.nz;if(d<0)o-=c.nx*d,a-=c.nz*d;else break}return{x:s,z:r}}function $a(i){return Rh.find(t=>Math.hypot(i.x-t.x,i.z-t.z)<=t.radius)||null}function B1(i){return $a(i)?.55:1}function H1(i){return Xa.find(t=>Math.abs(i.x-t.x)<t.halfWidth&&Math.abs(i.z-t.z)<t.halfDepth)||null}function G1(i,t,e,n){const s=t.x-i.x,r=t.z-i.z,o=s*s+r*r,a=o?Math.max(0,Math.min(1,((e.x-i.x)*s+(e.z-i.z)*r)/o)):0;return Math.hypot(i.x+a*s-e.x,i.z+a*r-e.z)<n-Cn}function Sr(i,t){return ks(i,t,Mi)&&So.every(e=>!G1(i,t,e,e.r+Mi))}function V1(i){return Math.hypot(i.x,i.z)<=23.85&&fs.every(t=>!Ch(i.x,i.z,qa(t,Mi),-Cn))&&So.every(t=>Math.hypot(i.x-t.x,i.z-t.z)>t.r+Mi+Cn)}let ua=null;const cr=new WeakMap;function W1(){if(ua)return ua;const i=[],t=(n,s)=>{const r={x:n,z:s};V1(r)&&!i.some(o=>Math.hypot(o.x-n,o.z-s)<.1)&&i.push(r)};for(const n of fs){const s=qa(n,Mi+.06);for(const r of[s.minX,s.maxX])for(const o of[s.minZ,s.maxZ])t(r,o)}for(const n of So)for(let s=0;s<12;s++){const r=s*Math.PI/6,o=(n.r+Mi+.08)/Math.cos(Math.PI/12);t(n.x+Math.cos(r)*o,n.z+Math.sin(r)*o)}for(const n of Xa)t(n.gate.x,n.gate.z),t(n.approach.x,n.approach.z),t(n.gate.x+(n.x-n.gate.x)*.4,n.gate.z+(n.z-n.gate.z)*.4);const e=i.map(()=>[]);for(let n=0;n<i.length;n++)for(let s=n+1;s<i.length;s++)if(Sr(i[n],i[s])){const r=Math.hypot(i[n].x-i[s].x,i[n].z-i[s].z);e[n].push([s,r]),e[s].push([n,r])}return ua={nodes:i,edges:e},ua}function X1(i,t){let e={x:t.x,z:t.z};const n=So.find(s=>s.machine&&Math.hypot(e.x-s.x,e.z-s.z)<s.r+Mi);return n&&(e={x:n.x,z:n.z+2.05}),oo(e,0,0,Mi+.02)}function q1(i,t){const{nodes:e,edges:n}=W1(),s=e.length,r=new Float64Array(s),o=new Int32Array(s),a=new Uint8Array(s);r.fill(1/0),o.fill(-1);const l=new Map;for(let d=0;d<s;d++)Sr(i,e[d])&&(r[d]=Math.hypot(i.x-e[d].x,i.z-e[d].z)),Sr(e[d],t)&&l.set(d,Math.hypot(t.x-e[d].x,t.z-e[d].z));let c=-1,h=1/0;for(let d=0;d<s;d++){let f=-1,m=1/0;for(let p=0;p<s;p++)!a[p]&&r[p]<m&&(m=r[p],f=p);if(f<0||m>=h)break;a[f]=1,l.has(f)&&m+l.get(f)<h&&(c=f,h=m+l.get(f));for(const[p,x]of n[f])m+x<r[p]&&(r[p]=m+x,o[p]=f)}if(c<0)return[];const u=[t];for(let d=c;d>=0;d=o[d])u.unshift(e[d]);return u}function pf(i,t){if(!Number.isFinite(t?.x)||!Number.isFinite(t?.z))return{x:0,z:0};const e=oo(i,0,0,Mi+.02),n=Math.hypot(e.x-i.x,e.z-i.z);if(n>.005)return cr.delete(i),{x:(e.x-i.x)/n,z:(e.z-i.z)/n};for(const c of So){const h=i.x-c.x,u=i.z-c.z,d=Math.hypot(h,u);if(d<c.r+Mi+.01)return cr.delete(i),d>1e-6?{x:h/d,z:u/d}:{x:0,z:1}}const s=X1(i,t),r=Math.hypot(s.x-i.x,s.z-i.z);if(r<.18)return cr.delete(i),{x:0,z:0};if(Sr(i,s))return cr.delete(i),{x:(s.x-i.x)/r,z:(s.z-i.z)/r};let o=cr.get(i);for((!o||Math.hypot(o.goal.x-s.x,o.goal.z-s.z)>1.1||Math.hypot(o.lastX-i.x,o.lastZ-i.z)>3)&&(o={goal:s,path:q1(i,s),lastX:i.x,lastZ:i.z},cr.set(i,o)),o.lastX=i.x,o.lastZ=i.z;o.path.length&&Math.hypot(o.path[0].x-i.x,o.path[0].z-i.z)<.18&&(o.path.length===1||Sr(i,o.path[1]));)o.path.shift();for(let c=o.path.length-1;c>0;c--)if(Sr(i,o.path[c])){o.path.splice(0,c);break}const a=o.path[0];if(!a)return{x:0,z:0};const l=Math.hypot(a.x-i.x,a.z-i.z);return l?{x:(a.x-i.x)/l,z:(a.z-i.z)/l}:{x:0,z:0}}const Pe=Object.freeze({delivery:"catapult",interactionRange:3,baseRadius:.95,minRange:5,maxRange:28,blastRadius:2.8,innerRadius:1.25,flightTime:1.25,arcHeight:8,cooldown:3,recoilDuration:.45,centerLift:.85,rimLift:.45,centerRecovery:.48,rimRecovery:.42}),Ph=Wa,$1=(i,t,e)=>Math.max(t,Math.min(e,i));function Y1(i,t,e,n=.6){const s=Math.hypot(t,e),r=s>1e-6?t/s:0,o=s>1e-6?e/s:-1,a=Pe.minRange+(Pe.maxRange-Pe.minRange)*$1(Number.isFinite(n)?n:.6,0,1),l=i.x*r+i.z*o,c=576-i.x*i.x-i.z*i.z,h=Math.max(0,-l+Math.sqrt(Math.max(0,l*l+c))),u=Math.min(a,h);return{x:i.x+r*u,z:i.z+o*u,range:u,valid:u>=Pe.minRange-1e-6}}function Z1(){return Ph.map(i=>({...i,occupant:null,cooldown:0,loaded:!0,aimX:0,aimZ:-1,recoil:0}))}function mf(i,t){return i.catapults.filter(e=>(e.owner===t.id||!e.owner)&&(!e.occupant||e.occupant===t.id)&&Math.hypot(e.x-t.x,e.z-t.z)<=Pe.interactionRange&&ks(t,e,.1)).sort((e,n)=>Math.hypot(e.x-t.x,e.z-t.z)-Math.hypot(n.x-t.x,n.z-t.z))[0]||null}function Ds(i,t){const e=i.catapults.find(s=>s.id===t.catapultId);if(e?.occupant===t.id){e.occupant=null,t.x=e.x,t.z=e.z+2.3;const s=Math.hypot(t.x,t.z);s>24&&(t.x*=24/s,t.z*=24/s)}const n=!!t.catapultId;return t.catapultId=null,t.catapultShots=0,t.interactHeld=!1,n}function j1(i,t){if(t.catapultId)return Ds(i,t);if(t.ko||t.dizzyTime>0||t.knockUp>0||t.kick>0||t.id!=="player"&&i.phase!=="battle")return!1;const e=mf(i,t);return e?(e.occupant=t.id,t.catapultId=e.id,t.catapultShots=0,t.catapultAim=1,t.x=e.x,t.z=e.z,t.hop=0,t.height=0,t.idle=0,t.hopX=t.hopZ=0,t.impulseX=t.impulseZ=0,i.events.push({type:"catapultMount",id:t.id,catapultId:e.id}),!0):!1}function K1(i,t,e){const n=i.catapults.find(f=>f.id===t.catapultId);if(i.phase!=="battle"||t.ko||t.dizzyTime>0||t.hit>0||t.knockUp>0||!n||n.occupant!==t.id||!n.loaded||n.cooldown>0||e?.valid===!1||!Number.isFinite(e?.x)||!Number.isFinite(e?.z))return!1;let s=e.x,r=e.z;const o=Math.hypot(s,r);o>24&&(s*=24/o,r*=24/o);const a=s-n.x,l=r-n.z,c=Math.hypot(a,l);if(c<Pe.minRange-1e-6)return!1;const h=a/c,u=l/c;c>Pe.maxRange&&(s=n.x+h*Pe.maxRange,r=n.z+u*Pe.maxRange);const d={id:i.nextId++,owner:t.id,catapultId:n.id,startX:n.x+h,startZ:n.z+u,startHeight:1.6,tx:s,tz:r,age:0,duration:Pe.flightTime,arcHeight:Pe.arcHeight};return n.aimX=h,n.aimZ=u,n.loaded=!1,n.cooldown=Pe.cooldown,n.recoil=Pe.recoilDuration,t.catapultShots++,i.shells.push(d),i.events.push({type:"stoneShot",id:t.id,shellId:d.id,catapultId:n.id}),!0}function J1(i,t,e){for(const n of i.catapults)if(n.cooldown=Math.max(0,n.cooldown-t),n.recoil=Math.max(0,n.recoil-t),n.loaded=n.cooldown===0,n.occupant){const s=i.actors.find(r=>r.id===n.occupant);(!s||s.ko||s.dizzyTime>0||s.knockUp>0||s.catapultId!==n.id)&&(s&&s.catapultId===n.id?Ds(i,s):n.occupant=null)}for(const n of i.shells)if(n.age+=t,!(n.age<n.duration)&&(i.events.push({type:"stoneImpact",id:n.id,owner:n.owner,x:n.tx,z:n.tz,radius:Pe.blastRadius}),i.phase==="battle"))for(const s of i.actors){const r=s.x-n.tx,o=s.z-n.tz,a=Math.hypot(r,o);if(s.ko||a>Pe.blastRadius||!ks({x:n.tx,z:n.tz},s,0))continue;const l=n.tx-n.startX,c=n.tz-n.startZ,h=Math.hypot(l,c)||1,u=a>1e-6?{dx:r/a,dz:o/a}:{dx:l/h,dz:c/h},d=a<=Pe.innerRadius;e(i,s,{owner:n.owner,...u,damage:d?4:2,force:d?12:8,lift:d?Pe.centerLift:Pe.rimLift,liftDuration:d?Pe.centerRecovery:Pe.rimRecovery})}i.shells=i.shells.filter(n=>n.age<n.duration)}const ln=Object.freeze({radius:.1,muzzleOffset:.8,originHeight:.45,bodyHeight:.95,terrainStep:.12}),Pn=1e-9,ao=new WeakMap,Q1={ground:()=>0,solids:new Map},zn=(i,t=0)=>Number.isFinite(i)?i:t,md=(i,t,e)=>Math.max(t,Math.min(e,i)),gf=i=>ao.get(i)||Q1;function tM(i,{ground:t}={}){return typeof t!="function"?(ao.delete(i),i):(ao.get(i)?.ground!==t&&ao.set(i,{ground:t,solids:new Map}),i)}function Fn(i,t,e){return zn(gf(i).ground(t,e))}function _i(i,t,e,n={x:0,y:0,z:1}){i=zn(i),t=zn(t),e=zn(e);const s=Math.hypot(i,t,e);return s>Pn?{x:i/s,y:t/s,z:e/s}:{...n}}function vo(i,t){return{x:t.x,y:Fn(i,t.x,t.z)+Math.max(0,zn(t.height))+(t.catapultId?.45:0)+ln.originHeight,z:t.z}}function eM(i){return _i(i.aimX,i.aimY,i.aimZ)}function nM(i){return!i.aim3D&&Math.abs(zn(i.aimY))<Pn}const iM=(i,t,e)=>({x:i.x+t.x*e,y:i.y+t.y*e,z:i.z+t.z*e});function sM(i,t,e){let n=0,s=1,r={x:0,y:0,z:0};for(const o of["x","y","z"]){const a=t[o]-i[o],l=e.min[o],c=e.max[o];if(Math.abs(a)<Pn){if(i[o]<l||i[o]>c)return null;continue}const h=(l-i[o])/a,u=(c-i[o])/a,d=Math.min(h,u),f=Math.max(h,u);if(d>n&&(n=d,r={x:0,y:0,z:0},r[o]=a>0?-1:1),s=Math.min(s,f),n>s+Pn)return null}return s<0||n>1?null:(!r.x&&!r.y&&!r.z&&(r=_i(i.x-t.x,i.y-t.y,i.z-t.z,{x:0,y:1,z:0})),{t:Math.max(0,n),normal:r})}function rM(i,t,e,n,s,r){const o=t.x-i.x,a=t.z-i.z,l=i.x-e.x,c=i.z-e.z,h=o*o+a*a,u=l*l+c*c-n*n;let d=-1/0,f=1/0,m=!1;if(h<Pn){if(u>0)return null}else{const M=l*o+c*a,y=M*M-h*u;if(y<0)return null;const v=Math.sqrt(y);d=(-M-v)/h,f=(-M+v)/h}const p=t.y-i.y;if(Math.abs(p)<Pn){if(i.y<s||i.y>r)return null}else{const M=(s-i.y)/p,y=(r-i.y)/p,v=Math.min(M,y);v>d&&(d=v,m=!0),f=Math.min(f,Math.max(M,y))}const x=Math.max(0,d);if(x>Math.min(1,f)+Pn||f<0)return null;const g=m?{x:0,y:p>0?-1:1,z:0}:_i(i.x+o*x-e.x,0,i.z+a*x-e.z,{x:0,y:1,z:0});return{t:x,normal:g}}function oM(i,t,e,n){const s=(i.x-e.x)/n.x,r=(i.y-e.y)/n.y,o=(i.z-e.z)/n.z,a=(t.x-i.x)/n.x,l=(t.y-i.y)/n.y,c=(t.z-i.z)/n.z,h=a*a+l*l+c*c,u=s*a+r*l+o*c,d=s*s+r*r+o*o-1;let f=0;if(d>0){if(h<Pn)return null;const m=u*u-h*d;if(m<0||(f=(-u-Math.sqrt(m))/h,f<0||f>1))return null}return{t:f,normal:_i((s+a*f)/n.x,(r+l*f)/n.y,(o+c*f)/n.z,{x:0,y:1,z:0})}}function aM(i,t){const e=gf(i);let n=e.solids.get(t);if(n)return n;const s=ln.radius;return n={walls:fs.map(r=>{const o=Fn(i,r.x,r.z);return{id:r.id,min:{x:r.x-r.hw-s,y:o-s,z:r.z-r.hd-s},max:{x:r.x+r.hw+s,y:o+r.height+.135+s,z:r.z+r.hd+s}}}),rocks:t.map(r=>({...r,ground:Fn(i,r.x,r.z)}))},e.solids.set(t,n),n}function lM(i,t,e){const n=e.x-t.x,s=e.y-t.y,r=e.z-t.z,o=Math.hypot(n,r),a=u=>t.y+s*u-Fn(i,t.x+n*u,t.z+r*u)-ln.radius;let l=0,c=a(0);if(c<=0)return{t:0,normal:ql(i,t.x,t.z)};if(o<Pn){if(s>=0)return null;const u=-c/s;return u<=1?{t:u,normal:ql(i,t.x,t.z)}:null}const h=Math.max(1,Math.ceil(o/ln.terrainStep));for(let u=1;u<=h;u++){const d=u/h,f=a(d);if(f<=0){let m=l,p=d;for(let x=0;x<24;x++){const g=(m+p)/2;a(g)>0?m=g:p=g}return{t:p,normal:ql(i,t.x+n*p,t.z+r*p)}}l=d,c=f}return null}function ql(i,t,e){const s=(Fn(i,t+.025,e)-Fn(i,t-.025,e))/.05,r=(Fn(i,t,e+.025)-Fn(i,t,e-.025))/(2*.025);return _i(-s,1,-r)}function cM(i,t,e){if(!Number.isFinite(e))return null;const n=t.x-i.x,s=t.z-i.z,r=n*n+s*s,o=i.x*n+i.z*s,a=i.x*i.x+i.z*i.z-e*e;if(a>Pn)return{t:0,normal:_i(-i.x,0,-i.z)};if(r<Pn)return null;const l=o*o-r*a;if(l<0)return null;const c=(-o+Math.sqrt(l))/r;return c<0||c>1?null:{t:c,normal:_i(-i.x-n*c,0,-i.z-s*c)}}function xf(i,t,e,{obstacles:n=[],ignoreId:s,hitActors:r=!0,terrain:o=!0,solidFrom:a=0,arenaRadius:l=1/0}={}){a=Math.max(0,zn(a));const c=Math.hypot(e.x-t.x,e.y-t.y,e.z-t.z),h=md(zn(a)/Math.max(c,Pn),0,1),u={x:t.x+(e.x-t.x)*h,y:t.y+(e.y-t.y)*h,z:t.z+(e.z-t.z)*h};let d=null;const f=(p,x,g={},M=0)=>{if(!p)return;const y=M+p.t*(1-M);y<-Pn||y>1+Pn||d&&y>=d.t-Pn||(d={...p,...g,t:y,kind:x,targetId:g.targetId??null,blocked:x!=="actor"})},m=aM(i,n);if(a<=c){for(const p of m.walls)f(sM(u,e,p),"wall",{wallId:p.id},h);for(const p of m.rocks)f(oM(u,e,{x:p.x,y:p.ground+p.r*.9,z:p.z},{x:p.r+ln.radius,y:p.r*1.7+ln.radius,z:p.r+ln.radius}),"rock",{},h)}if(r)for(const p of i.actors){if(p.id===s||p.ko||p.eliminated)continue;const x=Fn(i,p.x,p.z)+Math.max(0,zn(p.height))+(p.catapultId?.45:0);f(rM(t,e,p,1+md(zn(p.load),0,1)*.2,x-ln.radius,x+ln.bodyHeight+ln.radius),"actor",{targetId:p.id})}return o&&f(lM(i,t,e),"terrain"),f(cM(t,e,l),"boundary"),d?{...d,x:t.x+(e.x-t.x)*d.t,y:t.y+(e.y-t.y)*d.t,z:t.z+(e.z-t.z)*d.t,distance:c*d.t}:null}function hM(i,t,e,n,s={}){const r=_i(e.x,e.y,e.z),o=Math.max(0,zn(n));return xf(i,t,iM(t,r,o),s)}function yo(i,t,e){const n={x:t.x+t.dx*e,y:zn(t.y,Fn(i,t.x,t.z)+ln.originHeight)+zn(t.dy)*e,z:t.z+t.dz*e};return t.followGround&&(n.y=Fn(i,n.x,n.z)+zn(t.heightOffset,ln.originHeight)),n}function zh(i,t,e,n={}){const s={x:t.x,y:zn(t.y,Fn(i,t.x,t.z)+ln.originHeight),z:t.z},r=t.followGround&&ao.has(i)?Math.max(1,Math.ceil(e/.2)):1;let o=s;for(let a=1;a<=r;a++){const l=yo(i,t,e*a/r),c=xf(i,o,l,{...n,terrain:!t.followGround});if(c)return{...c,distance:e*((a-1+c.t)/r)};o=l}return null}function vf(i,t){const e=vo(i,t),n=eM(t),s=nM(t);return s&&(e.y=Fn(i,t.x,t.z)+ln.originHeight),{...e,dx:n.x,dy:n.y,dz:n.z,followGround:s,heightOffset:e.y-Fn(i,t.x,t.z)}}const $l="4.3.8",da="frog-arcade-save-v1",Kr="frog-arcade-settings-v1",Rt=Object.freeze({radius:25,capacity:60,dizzyHits:6,finishHits:3,dizzySeconds:4.5,tongueRange:3.2,pickupRange:3.2,tongueInterval:.22,kickRange:3.6,kickCooldown:1.1,kickDuration:.48,hopDuration:.3,landingDuration:.035,shotInterval:.14,projectileSpeed:32,projectileLifetime:.65,introSeconds:20,sabotageSeconds:10,sabotageRange:2.4,sabotageRecovery:.55,respawnSeconds:12,revealSeconds:2.5}),gs=Object.freeze([{x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6}]),zr=Object.freeze([[0,3.5],[-13,8],[13,1],[-12,-11],[10,-14],[2,17]].map(([i,t],e)=>Object.freeze({id:`swarm-${e}`,x:i,z:t,radius:2.1}))),an=(i,t,e)=>Math.max(t,Math.min(e,i)),nn=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),bi=(i,t)=>{const e=Math.hypot(i,t);return e>1e-6?{x:i/e,z:t/e}:{x:0,z:1}},Fe=(i,t=0)=>Number.isFinite(i)?i:t;function Fi(i){let t=i.seed+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function yf(i,t,e,n=Math.PI){return{id:i,x:t,z:e,aimX:Math.sin(n),aimY:0,aimZ:Math.cos(n),aim3D:!1,aiming:!1,face:n,ammo:Rt.capacity,load:1,dizzy:0,finishHits:0,dizzyTime:0,ko:!1,eliminated:!1,respawnTime:0,hit:0,invuln:0,shot:0,tongue:0,kick:0,kickCooldown:0,kickPending:!1,impulseX:0,impulseZ:0,hop:0,hopX:0,hopZ:0,hopSpeed:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0,brain:0,decision:0,catapultId:null,catapultShots:0,catapultAim:0,interactHeld:!1,machineTimer:i==="rival-1"?8:12,machineSeeking:!1,aimWindup:0,aiShotReady:0,aiCharging:!1,aiAimX:Math.sin(n),aiAimZ:Math.cos(n),refilling:!1,raidId:null,sabotageId:null,sabotageRecovery:0,revealedTime:0}}function Ns(i,t){return i.bases?.find(e=>e.owner===t.id)||null}const xi=i=>Wn.find(t=>t.id===i?.id);function lo(i,t,e){const n=Math.max(1,Math.ceil(Math.hypot(t,e)/.35));for(let s=0;s<n;s++){let{x:r,z:o}=oo(i,t/n,e/n);for(const c of gs){const h=Math.hypot(r-c.x,o-c.z),u=c.r+.78;if(h<u){const d=bi(r-c.x,o-c.z);r=c.x+d.x*u,o=c.z+d.z*u}}for(const c of Ph){if(i.catapultId===c.id)continue;const h=Math.hypot(r-c.x,o-c.z),u=Pe.baseRadius+.78;if(h<u){const d=bi(r-c.x,o-c.z);r=c.x+d.x*u,o=c.z+d.z*u}}({x:r,z:o}=oo(i,r-i.x,o-i.z));const a=Math.hypot(r,o);a>Rt.radius-1&&(r*=(Rt.radius-1)/a,o*=(Rt.radius-1)/a);const l=oo({x:r,z:o},0,0);i.x=l.x,i.z=l.z}}function uM(i,t,e,n,s,r){const o=e-i,a=n-t,l=i-s.x,c=t-s.z,h=o*o+a*a,u=l*l+c*c-r*r;if(u<=0)return 0;if(h<1e-12)return null;const d=2*(l*o+c*a),f=d*d-4*h*u;if(f<0)return null;const m=(-d-Math.sqrt(f))/(2*h);return m>=0&&m<=1?m:null}function ps(i,t){return ks(i,t,.1)&&gs.every(e=>uM(i.x,i.z,t.x,t.z,e,e.r+.1)===null)}function dM(i,t){return!t.ko&&!t.eliminated&&nn(i,t)<=23&&ps(i,t)&&(!$a(t)||t.revealedTime>0||nn(i,t)<2.2)}function Mf(i,t){const e=zr[Math.floor(t.id/12)];t.swarmId=e.id;const n=Fi(i)*Math.PI*2,s=Math.sqrt(Fi(i))*e.radius;t.x=e.x+Math.sin(n)*s,t.z=e.z+Math.cos(n)*s,t.wait=0,t.phase=Fi(i)*Math.PI*2}function Qc(i=731){const t={version:2,swarmVersion:1,seed:i,time:0,status:"playing",phase:"countdown",intro:Rt.introSeconds,actors:Wn.map(e=>yf(e.owner,e.spawn.x,e.spawn.z,e.spawnHeading)),bases:Wn.map(e=>({id:e.id,owner:e.owner,x:e.x,z:e.z,destroyed:!1,progress:0,attackerId:null})),flies:[],catapults:Z1(),shells:[],bullets:[],events:[],nextId:1,stats:{caught:0,shots:0,hits:0,kos:0,basesDestroyed:0}};for(let e=0;e<72;e++){const n={id:e,swarmId:"",x:0,z:0,wait:0,phase:0};Mf(t,n),t.flies.push(n)}return t}function fM(i,t){const e=Math.hypot(i,t);return{x:e>.08?i/Math.max(1,e):0,z:e>.08?t/Math.max(1,e):0,fire:e>=.72}}function th(i,t){return i.actors.filter(e=>e!==t&&!e.ko&&nn(t,e)<=Rt.kickRange&&ps(t,e)).sort((e,n)=>nn(t,e)-nn(t,n))[0]||null}function pM(i,t){if(t.ko||t.eliminated||t.dizzyTime>0||t.catapultId||t.tongue>0||t.ammo>=Rt.capacity)return!1;const e=Ns(i,t),n=xi(e)?.stock;if(e&&!e.destroyed&&n&&nn(t,n)<=Rt.pickupRange&&ps(t,n))return t.tongue=Rt.tongueInterval,t.ammo++,i.events.push({type:"tongue",id:t.id,x:n.x,z:n.z,baseId:e.id}),t.id==="player"&&i.stats.caught++,!0;const s=i.flies.filter(r=>r.wait<=0&&nn(t,r)<=Rt.pickupRange&&ps(t,r)).sort((r,o)=>nn(t,r)-nn(t,o))[0];return s?(t.tongue=Rt.tongueInterval,t.ammo++,s.wait=7+Fi(i)*4,i.events.push({type:"tongue",id:t.id,x:s.x,z:s.z,swarmId:s.swarmId}),t.id==="player"&&i.stats.caught++,!0):!1}function _f(i,t,e,n,s={}){return hM(i,t,e,n,{...s,obstacles:gs})}function bf(i,t,e=Rt.projectileSpeed*Rt.projectileLifetime+ln.muzzleOffset){const n=vf(i,t),s=Math.max(0,Fe(e)),r=zh(i,n,s,{obstacles:gs,ignoreId:t.id,hitActors:i.phase==="battle",arenaRadius:Rt.radius-.2}),o=r||yo(i,n,s),a=r?.distance??s;return{x:o.x,y:o.y,z:o.z,distance:a,targetId:r?.targetId??null,blocked:r?.blocked??!1,kind:r?.kind??null,normal:r?.normal??null,origin:{x:n.x,y:n.y,z:n.z},muzzle:yo(i,n,Math.min(ln.muzzleOffset,a)),direction:{x:n.dx,y:n.dy,z:n.dz}}}function Sf(i,t,e){if(Object.assign(t,{x:e.x,y:e.y,z:e.z,life:0}),e.kind==="actor"){const n=i.actors.find(s=>s.id===e.targetId);n&&Ih(i,n,t)}i.events.push({type:"splat",x:t.x,y:t.y,z:t.z,wall:e.kind==="wall"||e.kind==="rock",kind:e.kind,normal:e.normal,dx:t.dx,dy:t.dy,dz:t.dz})}function mM(i,t){if(t.ko||t.eliminated||t.dizzyTime>0||t.hit>0||t.catapultId||t.knockUp>0||t.shot>0||t.ammo<=0||t.id!=="player"&&i.phase!=="battle")return!1;t.shot=Rt.shotInterval,t.ammo--,t.revealedTime=Rt.revealSeconds;const e=vf(i,t),n={id:i.nextId++,owner:t.id,...e,life:Rt.projectileLifetime},s=zh(i,n,ln.muzzleOffset,{obstacles:gs,ignoreId:t.id,hitActors:i.phase==="battle",arenaRadius:Rt.radius-.2});return s?Sf(i,n,s):(Object.assign(n,yo(i,n,ln.muzzleOffset)),i.bullets.push(n)),i.events.push({type:"shot",id:t.id}),t.id==="player"&&i.stats.shots++,!0}function Mo(i,t,e="interrupted"){for(const n of i.bases||[])n.attackerId!==t.id||n.destroyed||(n.progress>0&&i.events.push({type:"sabotageInterrupted",baseId:n.id,id:n.owner,by:t.id,reason:e}),n.progress=0,n.attackerId=null);t.sabotageId=null}function gM(i,t,e){Mo(i,t,"knockout"),Ds(i,t),t.ko=!0,t.dizzyTime=0,t.hop=0,t.knockUp=0,t.knockUpStart=0,t.height=.9,t.impulseX=e.dx*17,t.impulseZ=e.dz*17,t.ammo=0,t.aiCharging=!1,t.respawnTime=Ns(i,t)?.destroyed?0:Rt.respawnSeconds,i.events.push({type:"ko",id:t.id,by:e.owner,x:t.x,z:t.z,dx:e.dx,dz:e.dz}),e.owner==="player"&&t.id!=="player"&&i.stats.kos++}function Ih(i,t,e){if(t.ko||t.eliminated||t.invuln>0)return!1;const n=Math.max(0,t.height),s=bi(Fe(e.dx),Fe(e.dz)),r=an(Fe(e.force,5),0,30);let o=an(Math.floor(Fe(e.damage,1)),1,9);if(Mo(i,t,"hit"),t.sabotageRecovery=Rt.sabotageRecovery,t.aiCharging=!1,t.aimWindup=0,t.aiShotReady=Math.max(t.aiShotReady,.4),t.hit=.23,t.invuln=.12,t.impulseX=s.x*r,t.impulseZ=s.z*r,t.revealedTime=Rt.revealSeconds,t.dizzyTime<=0){const a=Math.min(o,Rt.dizzyHits-t.dizzy);t.dizzy+=a,o-=a,t.dizzy>=Rt.dizzyHits&&(t.dizzy=Rt.dizzyHits,t.dizzyTime=Rt.dizzySeconds,t.finishHits=0,t.hop=0,t.knockUp<=0&&(t.height=0),Ds(i,t),i.events.push({type:"dizzy",id:t.id}))}return t.dizzyTime>0&&o>0&&(t.finishHits=Math.min(Rt.finishHits,t.finishHits+o)),Fe(e.lift)>0&&(Ds(i,t),t.knockUpDuration=an(Fe(e.liftDuration,.48),.25,.65),t.knockUp=t.knockUpDuration,t.knockUpPeak=an(e.lift,.1,1.2),t.knockUpStart=n,t.height=n,t.hop=0,t.hopX=t.hopZ=0,t.hopSpeed=0,t.kick=0,t.kickPending=!1),i.events.push({type:"hit",id:t.id,owner:e.owner,x:t.x,z:t.z,...Number.isFinite(e.y)?{y:e.y}:{},dx:s.x,dz:s.z}),e.owner==="player"&&t.id!=="player"&&i.stats.hits++,t.finishHits>=Rt.finishHits&&gM(i,t,{...e,dx:s.x,dz:s.z}),!0}function xM(i,t){if(i.phase!=="battle"||t.ko||t.eliminated||t.dizzyTime>0||t.hit>0||t.catapultId||t.knockUp>0||t.kick>0||t.kickCooldown>0)return!1;const e=th(i,t);if(!e)return!1;const n=bi(e.x-t.x,e.z-t.z);return t.aimX=n.x,t.aimY=0,t.aimZ=n.z,t.aim3D=!1,t.kick=Rt.kickDuration,t.kickCooldown=Rt.kickCooldown,t.kickPending=!0,t.kickId=e.id,t.revealedTime=Rt.revealSeconds,i.events.push({type:"kick",id:t.id}),!0}function vM(i,t){t.kickPending=!1;const e=i.actors.find(s=>s.id===t.kickId);if(!e||e.ko||nn(t,e)>Rt.kickRange+.25||!ps(t,e))return;const n=bi(e.x-t.x,e.z-t.z);Ih(i,e,{owner:t.id,dx:n.x,dz:n.z,damage:1,force:14}),e.ko||(e.impulseX=n.x*14,e.impulseZ=n.z*14)}function Ya(i,t){return t.ko||t.eliminated||t.catapultId?null:(i.bases||[]).filter(e=>!e.destroyed&&e.owner!==t.id&&nn(t,xi(e).stock)<=Rt.sabotageRange&&ps(t,xi(e).stock)).sort((e,n)=>nn(t,xi(e).stock)-nn(t,xi(n).stock))[0]||null}function yM(i,t,e){t.destroyed=!0,t.progress=Rt.sabotageSeconds,t.attackerId=null,e.sabotageId=null;const n=i.actors.find(s=>s.id===t.owner);n&&(Mo(i,n,"eliminated"),Ds(i,n),n.eliminated=!0,n.ko=!0,n.respawnTime=0,n.ammo=0,n.dizzyTime=0,n.hop=0,n.height=0,n.knockUp=0),e.id==="player"&&i.stats.basesDestroyed++,i.events.push({type:"baseDestroyed",baseId:t.id,id:t.owner,by:e.id,x:t.x,z:t.z})}function MM(i,t,e){for(const n of i.bases){if(n.destroyed)continue;const s=i.actors.filter(l=>t.get(l.id)===n.id&&!l.ko&&!l.eliminated&&l.dizzyTime<=0&&l.hit<=0&&l.sabotageRecovery<=0&&l.knockUp<=0&&l.kick<=0&&l.shot<=0&&l.hop<=0&&Ya(i,l)?.id===n.id),r=s.find(l=>l.id===n.attackerId)||s.sort((l,c)=>l.id.localeCompare(c.id))[0];if(!r){if(n.attackerId){const l=i.actors.find(c=>c.id===n.attackerId);l&&Mo(i,l,"released")}continue}if(n.attackerId!==r.id){if(n.attackerId){const l=i.actors.find(c=>c.id===n.attackerId);l&&Mo(i,l,"interrupted")}n.progress=0,n.attackerId=r.id,r.sabotageId=n.id,i.events.push({type:"sabotageStart",baseId:n.id,id:n.owner,by:r.id})}const o=xi(n).stock,a=bi(o.x-r.x,o.z-r.z);r.sabotageId=n.id,r.aiming=!1,r.face=Math.atan2(a.x,a.z),r.aimX=a.x,r.aimY=0,r.aimZ=a.z,r.aim3D=!1,r.revealedTime=Rt.revealSeconds,n.progress=Math.min(Rt.sabotageSeconds,n.progress+e),n.progress>=Rt.sabotageSeconds-1e-8&&yM(i,n,r)}}function fa(i,t,e={}){const n=pf(i,t);return{mx:n.x,mz:n.z,aiming:!1,...e}}function pr(i){i.aiCharging=!1,i.aimWindup=0}function Yl(i,t,e){const n=nn(t,e),s=bi(e.x-t.x,e.z-t.z);t.brain-=1/60,t.brain<=0&&(t.brain=.7+Fi(i)*.5,t.decision=Fi(i)>.5?1:-1);let r=!1;if(n<16&&t.ammo>0&&ps(t,e))if(!t.aiCharging&&t.aiShotReady<=0){const l=(Fi(i)-.5)*.08,c=Math.cos(l),h=Math.sin(l);t.aiAimX=s.x*c-s.z*h,t.aiAimZ=s.x*h+s.z*c,t.aimWindup=.32,t.aiCharging=!0}else t.aiCharging&&t.aimWindup<=0&&(r=!0,t.aiCharging=!1,t.aiShotReady=.22+Fi(i)*.1);else pr(t);let o=0,a=0;if(n>11){const l=pf(t,e);o=l.x,a=l.z}else{const l=n<6?-1:0;o=s.x*l+s.z*t.decision*.45,a=s.z*l-s.x*t.decision*.45}return{mx:o,mz:a,aiming:!0,ax:t.aiCharging||r?t.aiAimX:s.x,az:t.aiCharging||r?t.aiAimZ:s.z,fire:r,kick:n<3.3}}function _M(i,t){if(i.phase!=="battle"||t.ko||t.eliminated)return{};if(t.hit>0){pr(t);const h=bi(t.impulseX,t.impulseZ);return{mx:h.x,mz:h.z,aiming:!1}}const e=Ns(i,t),n=xi(e),s=i.actors.filter(h=>h!==t&&dM(t,h)).sort((h,u)=>nn(t,h)-nn(t,u)),r=s[0],o=r?nn(t,r):1/0;if(t.catapultId){if(!r||o<7||t.catapultShots>=2)return t.machineTimer=18,t.machineSeeking=!1,{interactCatapult:!0};const h=i.catapults.find(d=>d.id===t.catapultId),u=bi(r.x-t.x,r.z-t.z);return{aiming:!0,ax:u.x,az:u.z,throwStone:h?.loaded&&t.catapultAim<=0?{x:r.x,z:r.z}:void 0}}if(t.ammo<6&&(t.refilling=!0),t.ammo>=48&&(t.refilling=!1),t.refilling&&e&&!e.destroyed)return pr(t),nn(t,n.stock)<=Rt.pickupRange-.35&&ps(t,n.stock)?r&&o<5&&t.ammo>0?Yl(i,t,r):{}:fa(t,n.stock);if(e?.attackerId&&e.attackerId!==t.id){const h=s.find(u=>u.id===e.attackerId);return h?Yl(i,t,h):(pr(t),fa(t,n.stock))}if(!i.bases.find(h=>h.id===t.raidId&&!h.destroyed&&h.owner!==t.id)){const h=i.bases.filter(d=>!d.destroyed&&d.owner!==t.id),u=t.id==="rival-1"?"rival-2":"player";t.raidId=(h.find(d=>d.owner===u)||h[0])?.id||null}const l=i.bases.find(h=>h.id===t.raidId),c=xi(l)?.stock;if(l&&nn(t,c)<=Rt.sabotageRange-.2&&(t.sabotageId===l.id||!r||o>6.5))return pr(t),t.machineSeeking=!1,{sabotage:!0,aiming:!1};if(r&&o<16){const h=i.catapults.find(u=>u.owner===t.id&&!u.occupant);if(t.machineTimer<=0&&!t.machineSeeking&&(t.machineSeeking=!!h&&o>11&&Fi(i)<.35,t.machineTimer=8),t.machineSeeking&&h)if(o<7)t.machineSeeking=!1,t.machineTimer=12;else return fa(t,{x:h.x,z:h.z+2.2},{interactCatapult:nn(t,h)<=Pe.interactionRange&&ks(t,h)});return Yl(i,t,r)}return pr(t),c?fa(t,c):{}}function bM(i,t){const e=Ns(i,t),n=xi(e);if(!e||e.destroyed||!n)return;const s=yf(t.id,n.spawn.x,n.spawn.z,n.spawnHeading);Object.assign(t,s,{invuln:1}),i.events.push({type:"respawn",id:t.id,x:t.x,z:t.z})}function wf(i){const t=i.bases.find(n=>n.owner==="player"),e=i.bases.filter(n=>!n.destroyed);t?.destroyed?i.status="lost":e.length===1&&e[0].owner==="player"&&(i.status="won")}function gd(i,t={},e=1/60){if(i.status!=="playing"||(i.events.length=0,e=an(Fe(e),0,.05),e===0))return;i.time+=e,i.phase==="countdown"&&(i.intro=Math.max(0,i.intro-e),i.intro<1e-8&&(i.intro=0,i.phase="battle",i.events.push({type:"battle"})));for(const s of i.flies)s.wait>0&&(s.wait-=e,s.wait<=0&&Mf(i,s));const n=new Map;for(const s of i.actors){for(const u of["shot","tongue","invuln","hit","idle","kickCooldown","aimWindup","aiShotReady","catapultAim","sabotageRecovery","revealedTime"])s[u]=Math.max(0,s[u]-e);if(i.phase==="battle"&&(s.machineTimer=Math.max(0,s.machineTimer-e)),s.ko){Ds(i,s),lo(s,s.impulseX*e,s.impulseZ*e),s.impulseX*=Math.exp(-e*3),s.impulseZ*=Math.exp(-e*3),s.height=Math.max(0,s.height-e*1.6),!s.eliminated&&!Ns(i,s)?.destroyed&&(s.respawnTime=Math.max(0,s.respawnTime-e),s.respawnTime<1e-8&&bM(i,s));continue}s.kick>0&&(s.kick=Math.max(0,s.kick-e),s.kickPending&&s.kick<.3&&vM(i,s)),s.dizzyTime>0&&(s.dizzyTime=Math.max(0,s.dizzyTime-e),s.dizzyTime===0&&(s.dizzy=0,s.finishHits=0,s.invuln=.55,i.events.push({type:"recover",id:s.id})));const r=s.id==="player"?t:_M(i,s);r.interactCatapult&&!s.interactHeld&&j1(i,s),s.interactHeld=!!r.interactCatapult;const o=s.catapultId?0:Fe(r.mx),a=s.catapultId?0:Fe(r.mz),l=Math.hypot(o,a),c=l>.08&&s.knockUp<=0,h=Number.isFinite(r.ax)&&Number.isFinite(r.az)&&Math.hypot(r.ax,Fe(r.ay),r.az)>.05;if(s.aiming=r.aiming===void 0?h:r.aiming===!0,s.aiming&&h){const u=_i(r.ax,Fe(r.ay),r.az);s.aimX=u.x,s.aimY=u.y,s.aimZ=u.z,s.aim3D=Number.isFinite(r.ay)}if(c&&(s.face=Math.atan2(o,a),!s.aiming&&s.kick<=0)){const u=bi(o,a);s.aimX=u.x,s.aimY=0,s.aimZ=u.z,s.aim3D=!1}if(i.phase==="battle"&&r.sabotage&&!c&&!r.fire&&!r.kick&&!r.throwStone){const u=Ya(i,s);u&&n.set(s.id,u.id)}if(s.dizzyTime<=0){if(pM(i,s),r.fire&&mM(i,s),r.kick&&xM(i,s),r.throwStone&&K1(i,s,r.throwStone),s.catapultId){const u=i.catapults.find(d=>d.id===s.catapultId);u&&(u.aimX=s.aimX,u.aimZ=s.aimZ,s.x=u.x,s.z=u.z,s.impulseX=s.impulseZ=0)}if(s.knockUp<=0&&s.hop<=0&&s.idle<=0&&c&&(s.hop=Rt.hopDuration,s.hopSpeed=an(l,0,1)),s.knockUp<=0&&s.hop>0){s.hop=Math.max(0,s.hop-e);const u=(s.id==="player"?8.8:6.2)*B1(s),d=c?u/Math.max(1,l):0;s.hopX=o*d,s.hopZ=a*d,lo(s,s.hopX*e,s.hopZ*e),s.height=Math.sin((1-s.hop/Rt.hopDuration)*Math.PI)*(.35+.32*s.hopSpeed),s.hop===0&&(s.height=0,s.hopX=0,s.hopZ=0,s.idle=Rt.landingDuration,i.events.push({type:"land",id:s.id,x:s.x,z:s.z}))}}if(lo(s,s.impulseX*e,s.impulseZ*e),s.impulseX*=Math.exp(-e*10),s.impulseZ*=Math.exp(-e*10),s.knockUp>0){s.knockUp=Math.max(0,s.knockUp-e);const u=1-s.knockUp/s.knockUpDuration;s.height=s.knockUpStart*(1-u)+Math.sin(u*Math.PI)*s.knockUpPeak,s.knockUp===0&&(s.height=0,s.knockUpStart=0,s.idle=Rt.landingDuration,i.events.push({type:"land",id:s.id,x:s.x,z:s.z,stone:!0,strength:s.knockUpPeak}))}s.load+=(s.ammo/Rt.capacity-s.load)*(1-Math.exp(-e*12))}for(const s of i.bullets){const r=Math.min(e,Math.max(0,s.life));if(s.life-=e,r<=0)continue;const o=Rt.projectileSpeed*r,a=zh(i,s,o,{obstacles:gs,ignoreId:s.owner,hitActors:i.phase==="battle",arenaRadius:Rt.radius-.2});a?Sf(i,s,a):Object.assign(s,yo(i,s,o))}i.bullets=i.bullets.filter(s=>s.life>0),J1(i,e,Ih),MM(i,n,e),wf(i)}function SM(i){return JSON.stringify({...i,events:[],bullets:[],shells:[]})}function wM(i){try{const t=JSON.parse(i);if(![1,2].includes(t?.version)||!Array.isArray(t.actors)||t.actors.length!==3||!Array.isArray(t.flies)||t.flies.length!==72||!["playing","won","lost"].includes(t.status))return null;const e=t.version===1,n=Qc(Fe(t.seed,731));if(n.time=an(Fe(t.time),0,1e7),n.nextId=an(Math.floor(Fe(t.nextId,1)),1,1e9),n.intro=e?Rt.introSeconds:an(Fe(t.intro,Rt.introSeconds),0,Rt.introSeconds),n.phase=!e&&(t.phase==="battle"||n.intro===0)?"battle":"countdown",!e){if(!Array.isArray(t.bases)||t.bases.length!==Wn.length)return null;for(const s of n.bases){const r=t.bases.find(o=>o?.id===s.id&&o?.owner===s.owner);if(!r)return null;s.destroyed=r.destroyed===!0,s.progress=s.destroyed?Rt.sabotageSeconds:0}}for(let s=0;s<3;s++){const r=t.actors[s],o=n.actors[s];if(r?.id!==o.id||!Number.isFinite(r.x)||!Number.isFinite(r.z))return null;for(const u of Object.keys(o))typeof o[u]=="number"&&(o[u]=an(Fe(r[u],o[u]),-1e4,1e4));const a=Ns(n,o),l=a.destroyed,c=l||r.ko===!0;Object.assign(o,{ko:c,eliminated:l,respawnTime:c&&!l?an(Fe(r.respawnTime,Rt.respawnSeconds)||Rt.respawnSeconds,.01,Rt.respawnSeconds):0,aiming:!1,catapultId:null,interactHeld:!1,machineSeeking:!1,aiCharging:!1,aimWindup:0,refilling:r.refilling===!0||Fe(r.ammo)<6,raidId:null,sabotageId:null,sabotageRecovery:0,revealedTime:0,ammo:l?0:an(Math.floor(Fe(r.ammo)),0,Rt.capacity),load:an(Fe(r.load),0,1),dizzy:an(Fe(r.dizzy),0,Rt.dizzyHits),finishHits:an(Fe(r.finishHits),0,Rt.finishHits),dizzyTime:an(Fe(r.dizzyTime),0,Rt.dizzySeconds),kickPending:!1,kick:0,hop:0,hopX:0,hopZ:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0,impulseX:0,impulseZ:0});for(const u of["shot","tongue","invuln","hit","kickCooldown","aiShotReady"])o[u]=an(o[u],0,2);o.machineTimer=an(o.machineTimer,0,30),o.face=Fe(o.face,Math.PI),o.aim3D=r.aim3D===!0||Math.abs(Fe(r.aimY))>1e-9;const h=_i(o.aimX,o.aim3D?o.aimY:0,o.aimZ,{x:Math.sin(o.face),y:0,z:Math.cos(o.face)});if(o.aimX=h.x,o.aimY=h.y,o.aimZ=h.z,e){const u=xi(a);Object.assign(o,{x:u.spawn.x,z:u.spawn.z,face:u.spawnHeading,aimX:Math.sin(u.spawnHeading),aimY:0,aimZ:Math.cos(u.spawnHeading),aim3D:!1})}lo(o,0,0)}for(let s=0;s<72;s++){const r=t.flies[s],o=zr[Math.floor(s/12)];r&&(t.swarmVersion===1&&r.swarmId===o.id&&Number.isFinite(r.x)&&Number.isFinite(r.z)&&nn(r,o)<=o.radius+.001&&Object.assign(n.flies[s],{x:r.x,z:r.z,phase:Fe(r.phase)}),n.flies[s].wait=an(Fe(r.wait),0,12))}if(Array.isArray(t.catapults))for(const s of n.catapults){const r=t.catapults.find(a=>a.id===s.id);r&&(s.cooldown=an(Fe(r.cooldown),0,Pe.cooldown),s.loaded=s.cooldown===0);const o=!e&&t.actors.find(a=>a.catapultId===s.id);if(o){const a=n.actors.find(l=>l.id===o.id);a.x=s.x,a.z=s.z+2.3,lo(a,0,0)}}for(const s of Object.keys(n.stats))n.stats[s]=Math.max(0,Math.floor(Fe(t.stats?.[s])));return wf(n),n}catch{return null}}const di=Object.freeze({sensitivity:.0025,minPitch:-.65,maxPitch:1.15,yaw:Math.PI,pitch:.12}),xd=(i,t,e)=>Math.max(t,Math.min(e,i)),Zl=i=>Math.atan2(Math.sin(i),Math.cos(i)),hr=(i,t=0)=>Number.isFinite(i)?i:t;function vd(i,t=0,e=0,{sensitivity:n=di.sensitivity,invertY:s=!1}={}){const r=Zl(hr(i?.yaw,di.yaw)),o=xd(hr(i?.pitch,di.pitch),di.minPitch,di.maxPitch),a=Number.isFinite(n)&&n>0?n:di.sensitivity,l=Zl(hr(hr(t)*a)),c=hr(hr(e)*a)*(s===!0?-1:1);return{yaw:Zl(r-l),pitch:xd(o+c,di.minPitch,di.maxPitch)}}function EM(i){const t=i.aiming||i.shot>.02||i.kick>0,e=Math.hypot(i.aimX,i.aimZ);if((t||!Number.isFinite(i.face))&&Number.isFinite(e)&&e>1e-6)return{x:i.aimX/e,z:i.aimZ/e};const n=Number.isFinite(i.face)?i.face:Math.PI;return{x:Math.sin(n),z:Math.cos(n)}}const is=Object.freeze({...di,sensitivity:.005}),wr=Object.freeze({min:.7,max:1.5,default:1});function Ef(i,t,e=1.6,n="chase3d",s=is){const r=Number.isFinite(e)&&e>0?e:1.6,o=Number.isFinite(s?.zoom)?Math.max(wr.min,Math.min(wr.max,s.zoom)):wr.default;if(n==="overview"){const p=Math.max(.86,Math.min(1.6,Math.sqrt(1.2/r)));return{look:[i.x,t+1.2,i.z],position:[i.x,t+1.2+(26*p-1.2)/o,i.z+19*p/o]}}const a=Number.isFinite(s?.yaw)?s.yaw:is.yaw,l=Math.max(is.minPitch,Math.min(is.maxPitch,Number.isFinite(s?.pitch)?s.pitch:is.pitch)),c={x:Math.sin(a),z:Math.cos(a)},u=12.6*Math.max(1,Math.min(1.42,.72/r))/o,d=u*Math.cos(l),f=i.x+c.x*.9,m=i.z+c.z*.9;return{look:[f,t+1.2,m],position:[f-c.x*d,t+1.2+u*Math.sin(l),m-c.z*d]}}function TM(i,t,{clearance:e=.35,step:n=.15}={}){const s=[...i.look],r=[...i.position],o=r.map((M,y)=>M-s[y]),a=Math.hypot(...o);if(typeof t!="function"||a<1e-8)return{...i,look:s,position:r};const l=o.map(M=>M/a),c=Number.isFinite(e)&&e>=0?e:.35,h=Number.isFinite(n)&&n>0?Math.max(.03,n):.15,u=(M,y)=>{const v=t(M,y);return Number.isFinite(v)?v:-1/0},d=M=>s.map((y,v)=>y+l[v]*M),f=Math.min(a,.12),m=Math.max(1,Math.ceil(f/.03));let p=0;for(let M=0;M<=m;M++){const y=d(f*M/m);p=Math.max(p,u(y[0],y[2])+c-y[1])}p>0&&(s[1]+=p+.001,r[1]+=p+.001);const x=Math.max(1,Math.min(512,Math.ceil((a-f)/h)));let g=f;for(let M=1;M<=x;M++){const y=f+(a-f)*M/x,v=d(y);if(v[1]>=u(v[0],v[2])+c){g=y;continue}let E=y;for(let T=0;T<18;T++){const w=(g+E)/2,R=d(w);R[1]>=u(R[0],R[2])+c?g=w:E=w}return{...i,look:s,position:d(g)}}return{...i,look:s,position:r}}function pa(i,t,e,n){const s=n.x-e.x,r=n.z-e.z,o=Math.hypot(s,r),a=o>1e-6?s/o:0,l=o>1e-6?r/o:-1,c=Number.isFinite(i)?i:0,h=Number.isFinite(t)?t:0;return{x:-l*c-a*h,z:a*c-l*h}}const jl=["#d2ff70","#ff765d","#d7a0ff"],AM=new Map(zr.map((i,t)=>[i.id,t])),yd=new WeakMap;function Tf(i){let t=yd.get(i);t||(t=zr.map(e=>({swarm:e,available:0,next:1/0})),yd.set(i,t));for(const e of t)e.available=0,e.next=1/0;for(const e of i.flies){const n=t[AM.get(e.swarmId)];n&&(e.wait<=0?n.available++:n.next=Math.min(n.next,e.wait))}return t}function Af(i,t,e,n,s){i.fillStyle=s?"#dceee6":"#718781",i.beginPath(),i.ellipse(t-n*.5,e-n*.28,n*.6,n*.32,-.5,0,Math.PI*2),i.ellipse(t+n*.5,e-n*.28,n*.6,n*.32,.5,0,Math.PI*2),i.fill(),i.fillStyle=s?"#384c4c":"#536763",i.strokeStyle=s?"#b6d1c3":"#8ca09a",i.lineWidth=1.4,i.beginPath(),i.ellipse(t,e+n*.12,n*.34,n*.56,0,0,Math.PI*2),i.fill(),i.stroke()}function RM(i,t){if(!t)return;const e=t.getContext("2d");if(!e)return;const n=t.width,s=n/2,r=n*.43,o=r/Rt.radius;e.clearRect(0,0,n,n),e.save(),e.translate(s,s),e.fillStyle="#153e3af2",e.strokeStyle="#9bd1be",e.lineWidth=4,e.beginPath(),e.arc(0,0,r,0,Math.PI*2),e.fill(),e.stroke(),e.clip();const a=i.focus.x-i.camera.position.x,l=i.focus.z-i.camera.position.z,c=Math.hypot(a,l),h=c>1e-6?a/c:0,u=c>1e-6?l/c:-1,d=(f,m)=>({x:(-u*f+h*m)*o,y:-(h*f+u*m)*o});e.strokeStyle="#ffffff17",e.lineWidth=1;for(let f=-20;f<=20;f+=10){const m=d(f,-25),p=d(f,25),x=d(-25,f),g=d(25,f);e.beginPath(),e.moveTo(m.x,m.y),e.lineTo(p.x,p.y),e.moveTo(x.x,x.y),e.lineTo(g.x,g.y),e.stroke()}for(const f of gs){const m=d(f.x,f.z);e.fillStyle="#769084",e.beginPath(),e.arc(m.x,m.y,f.r*o,0,Math.PI*2),e.fill()}for(const f of Rh){const m=d(f.x,f.z);e.fillStyle="#517d4788",e.beginPath(),e.arc(m.x,m.y,f.radius*o,0,Math.PI*2),e.fill()}for(const f of fs){const m=[d(f.x-f.hw,f.z-f.hd),d(f.x+f.hw,f.z-f.hd),d(f.x+f.hw,f.z+f.hd),d(f.x-f.hw,f.z+f.hd)];e.fillStyle="#c4b492",e.beginPath(),e.moveTo(m[0].x,m[0].y);for(const p of m.slice(1))e.lineTo(p.x,p.y);e.closePath(),e.fill()}for(const f of Wa){const m=d(f.x,f.z);e.strokeStyle="#bfd6d0",e.lineWidth=2,e.beginPath(),e.moveTo(m.x-3,m.y+3),e.lineTo(m.x,m.y-4),e.lineTo(m.x+4,m.y+3),e.moveTo(m.x,m.y-1),e.lineTo(m.x+4,m.y-6),e.stroke()}for(const[f,m]of Wn.entries()){const p=i.state.bases?.find(g=>g.id===m.id),x=d(m.stock.x,m.stock.z);if(m.owner==="player"&&p?.attackerId&&!p.destroyed){const g=.5+.5*Math.sin((i.elapsed||0)*4);e.strokeStyle="#ff9a6a",e.lineWidth=3+g,e.beginPath(),e.arc(x.x,x.y,13+g*3,0,Math.PI*2),e.stroke()}e.fillStyle=p?.destroyed?"#4f6258":p?.attackerId?"#ffce77":jl[f],e.strokeStyle="#092b22",e.lineWidth=2,e.beginPath(),e.moveTo(x.x-7,x.y-2),e.lineTo(x.x,x.y-8),e.lineTo(x.x+7,x.y-2),e.lineTo(x.x+7,x.y+7),e.lineTo(x.x-7,x.y+7),e.closePath(),e.fill(),e.stroke(),p?.destroyed&&(e.strokeStyle="#b7c7ba",e.beginPath(),e.moveTo(x.x-5,x.y-5),e.lineTo(x.x+5,x.y+5),e.moveTo(x.x+5,x.y-5),e.lineTo(x.x-5,x.y+5),e.stroke())}for(const f of Tf(i.state)){const m=d(f.swarm.x,f.swarm.z),p=f.available>0;e.strokeStyle=p?"#b8daa7":"#6a827b",e.lineWidth=p?1.8:1.2,e.beginPath(),e.arc(m.x,m.y,9,0,Math.PI*2),e.stroke(),Af(e,m.x,m.y,6,p)}i.state.actors.forEach((f,m)=>{if(f.ko||f.eliminated)return;const p=i.state.actors[0];if(m>0&&$a(f)&&f.revealedTime<=0&&Math.hypot(f.x-p.x,f.z-p.z)>2.2)return;const x=d(f.x,f.z);if(e.fillStyle=jl[m],e.strokeStyle="#102923",e.lineWidth=3,e.beginPath(),e.arc(x.x,x.y,m===0?9:8,0,Math.PI*2),e.fill(),e.stroke(),m===0){const g=d(f.aimX*2.7,f.aimZ*2.7);e.strokeStyle=jl[0],e.lineWidth=4,e.beginPath(),e.moveTo(x.x,x.y),e.lineTo(x.x+g.x,x.y+g.y),e.stroke()}else e.fillStyle="#102923",e.beginPath(),e.arc(x.x-3,x.y-2,1.6,0,Math.PI*2),e.arc(x.x+3,x.y-2,1.6,0,Math.PI*2),e.fill()}),e.restore(),e.fillStyle="#f2ffe1",e.font="bold 18px sans-serif",e.textAlign="center",e.fillText("ΒΑΣΕΙΣ • ΜΥΓΕΣ • ΚΑΛΥΨΗ",s,n-5)}function CM(i,t){const e=i.state.actors[0];if(e.ko||e.ammo>=Rt.capacity)return;const n=Wn.find(M=>M.owner===e.id),s=i.state.bases?.find(M=>M.owner===e.id);if(n&&s&&!s.destroyed&&Math.hypot(e.x-n.stock.x,e.z-n.stock.z)<=Rt.pickupRange&&ks(e,n.stock))return;let r=null,o=null,a=1/0,l=1/0;for(const M of Tf(i.state)){const y=Math.hypot(M.swarm.x-e.x,M.swarm.z-e.z);y<a&&(r=M,a=y),M.available>0&&y<l&&(o=M,l=y)}const h=r&&r.available===0&&a<=r.swarm.radius+Rt.pickupRange+.5?r:o;if(!h)return;const u=h.swarm,d=i.project(u.x,i.ground(u.x,u.z)+.35,u.z),f=i.touch&&i.h>i.w?240:110,m=i.touch?Math.min(165,i.h*.3):65;if(!d.visible||d.x<72||d.x>i.w-72||d.y<f||d.y>i.h-m)return;t.save(),t.font="700 12px sans-serif",t.textAlign="left",t.lineJoin="round";const p=h.available>0?`Μύγες · ${h.available}`:`Ξανά σε ${Math.max(1,Math.ceil(h.next))}″`,x=t.measureText(p).width+22,g=d.x-x/2;Af(t,g+7,d.y+8,6,h.available>0),t.strokeStyle="#18352de6",t.lineWidth=3,t.strokeText(p,g+20,d.y+12),t.fillStyle=h.available>0?"#e8f4d5":"#c1d0c9",t.fillText(p,g+20,d.y+12),t.restore()}function PM(i,t,e){return bf(i,t,e)}const zM=new L(0,1,0),IM=Math.PI*2,Kl=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),ma=(i,t,e)=>i+(t-i)*e,ga=["#b8e76c","#ef886a","#be94e0"],DM=.45;class LM{constructor(t){this.game=t,this.scene=t.scene,this.clock=0,this.machines=new Map,this.platforms=new Map,this.shellMeshes=new Map,this.dummy=new qe,this._vector=new L,this._direction=new L,this.geometry={box:new Gi(1,1,1),cylinder:new Us(.5,.5,1,8),rock:new Ba(.4,0),leaf:new jn(1,10,5),cup:new jn(.38,10,6,0,IM,Math.PI/2,Math.PI/2),ring:new as(.94,1,48),disc:new Oa(1,32),rope:new Sh(.14,.027,5,10)},this.material={wood:new gn({color:"#a47746"}),lightWood:new gn({color:"#d4ac64"}),darkWood:new gn({color:"#67503c"}),rope:new gn({color:"#d3c593"}),leaf:new gn({color:"#5c9b67"}),stone:new gn({color:"#90999b",emissive:"#172023",emissiveIntensity:.16}),preview:new Qd({color:"#e6f7a1",dashSize:.45,gapSize:.25,transparent:!0,opacity:.85,depthWrite:!1}),landing:new xn({color:"#d6ed8b",transparent:!0,opacity:.72,side:Ce,depthWrite:!1})},this.material.ramp=new gn({color:"#b18b59",side:Ce});for(const[s,r]of Ph.entries()){const o=this.createPlatform(r);o&&this.platforms.set(r.id,o),this.machines.set(r.id,this.createMachine(r,s))}const e=new Float32Array(99),n=new Se;n.setAttribute("position",new un(e,3)),this.previewLine=new go(n,this.material.preview),this.previewLine.name="catapult-trajectory-preview",this.previewLine.frustumCulled=!1,this.previewLine.visible=!1,this.scene.add(this.previewLine),this.landingMarker=new Jt(this.geometry.ring,this.material.landing),this.landingMarker.name="catapult-landing-preview",this.landingMarker.rotation.x=-Math.PI/2,this.landingMarker.scale.setScalar(Pe.blastRadius),this.landingMarker.visible=!1,this.scene.add(this.landingMarker)}ground(t,e){return this.game.ground(t,e)}mesh(t,e,n,s=[0,0,0],r=[1,1,1]){const o=new Jt(e,n);return o.position.fromArray(s),o.scale.fromArray(r),t.add(o),o}createPlatform(t){const e=this.game.houseFloors?.find(d=>d.id===t.enclosureId);if(!e)return null;const n=new te;n.name=`${t.id}-level-platform`,n.position.set(e.x,e.height,e.z),this.scene.add(n);const s=this.mesh(n,this.geometry.box,this.material.darkWood,[0,-.1,0],[e.halfWidth*2,.2,e.halfDepth*2]);s.name="catapult-floor-at-operator-height";const r=[],o=[];for(let d=-e.halfDepth+.2;d<e.halfDepth;d+=.4){const f=this.geometry.box.clone();f.scale(e.halfWidth*2-.06,.025,.355),f.translate(0,-.012,Math.min(d,e.halfDepth-.2)),r.push(f)}for(const d of[-e.halfWidth+.18,e.halfWidth-.18])for(const f of[-e.halfDepth+.18,e.halfDepth-.18]){const m=this.game.world?.getSurface(e.x+d,e.z+f).height??e.minimum,p=Math.max(.2,e.height-m),x=this.geometry.box.clone();x.scale(.3,p,.3),x.translate(d,-p*.5,f),o.push(x)}for(const[d,f]of[[r,this.material.lightWood],[o,this.material.darkWood]]){const m=ki(d);for(const x of d)x.dispose();const p=this.mesh(n,m,f);p.userData.ownedGeometry=!0}const a=e.ramp,l=[],c=[];for(let d=0;d<=a.rows;d++)for(let f=0;f<=a.cols;f++){const m=d/a.rows*a.length,p=(f/a.cols*2-1)*a.halfWidth;l.push(a.x+a.dx*m+a.rightX*p-e.x,a.heights[d*(a.cols+1)+f]-e.height,a.z+a.dz*m+a.rightZ*p-e.z)}for(let d=0;d<a.rows;d++)for(let f=0;f<a.cols;f++){const m=d*(a.cols+1)+f,p=m+1,x=m+a.cols+1,g=x+1;c.push(m,x,p,p,x,g)}const h=new Se;h.setAttribute("position",new Vt(l,3)),h.setIndex(c),h.computeVertexNormals();const u=this.mesh(n,h,this.material.ramp);return u.name=`${t.id}-walkable-entrance-ramp`,u.userData.ownedGeometry=!0,{group:n,deck:s,ramp:u,floor:e}}createMachine(t,e){const n=new te;n.name=t.id,n.position.set(t.x,this.ground(t.x,t.z),t.z),this.scene.add(n);const s=new te;s.name="wooden-catapult-frame",n.add(s);const r={wood:[],lightWood:[],darkWood:[],rope:[]},o=(y,v,E,T,w,R,S)=>{const b=this.geometry.box.clone();b.scale(w,R,S),b.translate(v,E,T),r[y].push(b)},a=(y,v,E,T)=>{const w=new L(...v),R=new L(...E),S=R.clone().sub(w),b=this.geometry.cylinder.clone();b.scale(T,S.length(),T),b.applyQuaternion(new hs().setFromUnitVectors(zM,S.normalize())),b.translate(...w.add(R).multiplyScalar(.5).toArray()),r[y].push(b)};for(const y of[-1,1])o("wood",y*.82,.18,.6,.26,.28,2.65);for(const y of[-.55,.12,.83,1.68])o("lightWood",0,.29,y,1.98,.14,.22);o("darkWood",0,.34,-.03,1.2,.14,.93);for(const y of[-1,1])a("wood",[y*.76,.3,.1],[y*.76,.99,1],.17),a("wood",[y*.76,.3,1.83],[y*.76,.99,1],.17),a("rope",[y*.77,.48,.35],[y*.77,.58,.47],.21),a("rope",[y*.77,.48,1.61],[y*.77,.58,1.49],.21);a("darkWood",[-.94,.85,1],[.94,.85,1],.22),o("lightWood",0,.52,1.66,1.72,.17,.17);for(const[y,v]of Object.entries(r)){if(!v.length)continue;const E=ki(v);for(const w of v)w.dispose();const T=this.mesh(s,E,this.material[y]);T.userData.ownedGeometry=!0}const l=this.mesh(s,this.geometry.leaf,this.material.leaf,[0,.41,-.04],[.59,.065,.48]);l.name="operator-seat";const c=new gn({color:ga[e%ga.length]}),h=this.mesh(s,this.geometry.leaf,c,[-.98,.64,1.65],[.13,.45,.3]);h.rotation.z=-.3,h.name="side-leaf";const u=new te;u.name="throwing-arm",u.position.set(0,.85,1),s.add(u),this.mesh(u,this.geometry.box,this.material.lightWood,[0,.07,0],[.18,1.2,.2]),this.mesh(u,this.geometry.box,this.material.darkWood,[0,-.48,0],[.43,.27,.37]);const d=this.mesh(u,this.geometry.cup,this.material.darkWood,[0,.57,0],[1.1,.72,1.3]);d.name="stone-cup";const f=this.mesh(u,this.geometry.rock,this.material.stone,[0,.75,0],[.78,.7,.8]);f.name="loaded-catapult-stone",u.rotation.x=-.45;const m=new te;m.name="reload-winch",m.position.set(0,.61,.53),s.add(m);const p=this.mesh(m,this.geometry.cylinder,this.material.darkWood,[0,0,0],[.13,1.37,.13]);p.rotation.z=Math.PI/2;for(const y of[-1,1]){const v=this.mesh(m,this.geometry.box,this.material.lightWood,[y*.47,.12,0],[.13,.35,.12]);v.name="operator-handle";const E=this.mesh(s,this.geometry.rope,this.material.rope,[y*.76,.85,1],[1,1,1]);E.rotation.y=Math.PI/2}const x=[];for(let y=0;y<2;y++){const v=this.mesh(s,this.geometry.rock,this.material.stone,[1.17,.29,.72+y*.64],[.65,.6,.68]);v.rotation.set(y*.7,.6+y,0),x.push(v)}const g=new xn({color:ga[e%ga.length],transparent:!0,opacity:.25,side:Ce,depthWrite:!1}),M=this.mesh(n,this.geometry.ring,g,[0,.045,.4],[1.65,1.65,1.65]);return M.rotation.x=-Math.PI/2,M.name="catapult-station-ring",{group:n,turret:s,arm:u,winch:m,loadedRock:f,pile:x,ring:M,factionMaterial:c,ringMaterial:g,definition:t,launchAge:1/0,yaw:Math.PI}}operatorPose(t){const e=this.machines.get(typeof t=="string"?t:t?.id);if(!e)return null;const n=this.game.state.catapults?.find(s=>s.id===e.definition.id);return{x:e.definition.x,y:this.ground(e.definition.x,e.definition.z)+DM,z:e.definition.z,yaw:n?Math.atan2(n.aimX,n.aimZ):e.yaw}}consumeEvent(t){if(t.type==="stoneShot"){const e=this.machines.get(t.catapultId);e&&(e.launchAge=0,e.arm.rotation.x=0,e.loadedRock.visible=!1)}}shellPoint(t,e,n=this._vector){const s=ma(t.startX,t.tx,e),r=ma(t.startZ,t.tz,e),o=this.ground(t.startX,t.startZ)+(t.startHeight??1.6),a=this.ground(t.tx,t.tz)+.12;return n.set(s,ma(o,a,e)+4*t.arcHeight*e*(1-e),r)}createShell(t){const e=this.mesh(this.scene,this.geometry.rock,this.material.stone,void 0,[1.05,.95,1.14]);e.name=`catapult-stone-${t.id}`;const n=new xn({color:t.owner==="player"?"#e4c36e":"#f17e62",transparent:!0,opacity:.45,side:Ce,depthWrite:!1}),s=this.mesh(this.scene,this.geometry.ring,n,[t.tx,this.ground(t.tx,t.tz)+.055,t.tz],[Pe.blastRadius,Pe.blastRadius,Pe.blastRadius]);s.rotation.x=-Math.PI/2,s.name=`catapult-danger-${t.id}`;const r=this.mesh(this.scene,this.geometry.disc,n,[t.tx,this.ground(t.tx,t.tz)+.05,t.tz],[.13,.13,.13]);return r.rotation.x=-Math.PI/2,{stone:e,ring:s,core:r,material:n}}updatePreview(){const t=this.game.state,e=t.actors[0],n=this.game.catapultAim,s=t.catapults?.find(m=>m.id===e.catapultId&&m.occupant===e.id),r=n?.target,o=this.game.running&&n?.active&&s&&r&&Number.isFinite(r.x)&&Number.isFinite(r.z)&&!e.ko&&e.dizzyTime<=0;if(this.previewLine.visible=!!o,this.landingMarker.visible=!!o,!o)return;const a=r.x-s.x,l=r.z-s.z,c=Math.hypot(a,l)||1,h={startX:s.x+a/c,startZ:s.z+l/c,startHeight:1.6,tx:r.x,tz:r.z,arcHeight:Pe.arcHeight},u=this.previewLine.geometry.attributes.position;for(let m=0;m<u.count;m++){const p=this.shellPoint(h,m/(u.count-1));u.setXYZ(m,p.x,p.y,p.z)}u.needsUpdate=!0,this.previewLine.computeLineDistances(),this.landingMarker.position.set(r.x,this.ground(r.x,r.z)+.065,r.z),this.landingMarker.scale.setScalar(Pe.blastRadius);const d=s.loaded&&s.cooldown<=0,f=r.valid===!1;this.material.preview.color.set(f?"#ef826d":d?"#e6f7a1":"#b7bfaf"),this.material.landing.color.set(f?"#ef826d":d?"#d6ed8b":"#b7bfaf")}poseOperator(t,e,n){const s=this.game.state.actors.findIndex(c=>c.id===t.id),r=this.game.models?.[s];if(!r?.bones||t.ko)return;const o=r.bones,a=n.cooldown>0,l=a?Math.sin(this.clock*9)*.13:0;for(const c of[-1,1]){const h=o[`shoulder${c}`],u=o[`elbow${c}`],d=o[`wrist${c}`];h&&(h.rotation.x=-.53-l*c,h.rotation.z=c*.08),u&&(u.rotation.x=.45+l*c),d&&(d.rotation.x=-.18)}o.spine&&(o.spine.rotation.x=.08+Math.abs(l)*.12),o.head&&(o.head.rotation.x=-.04)}update(t=0){const e=this.game.running?Math.max(0,Math.min(.1,t)):0;this.clock+=e;const n=this.game.state;for(const s of n.catapults||[]){const r=this.machines.get(s.id);if(!r)continue;r.group.position.y=this.ground(s.x,s.z);const o=Math.atan2(s.aimX,s.aimZ);r.yaw=o,r.turret.rotation.y=o,Number.isFinite(r.launchAge)&&(r.launchAge+=e);const a=this.game.catapultAim;let c=s.occupant==="player"&&a?.active?-.74:-.45;if(s.cooldown>0){const u=1-Kl(s.cooldown/(Pe.cooldown||3));c=ma(.6,-.45,u*u),r.winch.rotation.x=this.clock*7}else r.winch.rotation.x=0;r.launchAge<.18&&(c=.6*Math.sin(Kl(r.launchAge/.09)*Math.PI/2)),r.arm.rotation.x+=(c-r.arm.rotation.x)*(1-Math.exp(-e*18)),r.loadedRock.visible=!!s.loaded,r.ring.material.opacity=s.occupant?.42:.2;const h=n.actors.find(u=>u.id===s.occupant);h&&this.poseOperator(h,r,s)}for(const s of n.shells||[]){let r=this.shellMeshes.get(s.id);r||(r=this.createShell(s),this.shellMeshes.set(s.id,r));const o=Kl(s.age/s.duration);this.shellPoint(s,o,r.stone.position),r.stone.rotation.set(s.age*4,s.age*3,s.age*1.5),r.material.opacity=.35+.22*o+.08*Math.sin(this.clock*13)}for(const[s,r]of this.shellMeshes)(n.shells||[]).some(o=>o.id===s)||(r.stone.removeFromParent(),r.ring.removeFromParent(),r.core.removeFromParent(),r.material.dispose(),this.shellMeshes.delete(s));this.updatePreview()}dispose(){for(const t of this.platforms.values())t.group.removeFromParent(),t.group.traverse(e=>{e.userData.ownedGeometry&&e.geometry.dispose()});for(const t of this.machines.values())t.group.removeFromParent(),t.group.traverse(e=>{e.userData.ownedGeometry&&e.geometry.dispose()}),t.factionMaterial.dispose(),t.ringMaterial.dispose();for(const t of this.shellMeshes.values())t.stone.removeFromParent(),t.ring.removeFromParent(),t.core.removeFromParent(),t.material.dispose();this.previewLine.removeFromParent(),this.previewLine.geometry.dispose(),this.landingMarker.removeFromParent();for(const t of Object.values(this.geometry))t.dispose();for(const t of Object.values(this.material))t.dispose();this.machines.clear(),this.platforms.clear(),this.shellMeshes.clear()}}const UM=Math.PI*2,kM=new L(0,1,0),Jr=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),Jl=i=>Number.isFinite(i?.x)&&Number.isFinite(i?.z),Md=["#c4e4de","#83bcb4","#eaf4e4"].map(i=>new ee(i)),xa=Object.freeze({mobileDrops:96,desktopDrops:144,mobileRipples:6,desktopRipples:8}),NM=`
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
`,FM=`
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
`;class OM{constructor(t){this.game=t,this.scene=t.scene,this.time=0,this.seed=7919,this.cursor=0,this.rippleCursor=0,this.capacity=t.touch?xa.mobileDrops:xa.desktopDrops,this.particles=Array.from({length:this.capacity},()=>({life:0,total:1,x:0,y:0,z:0,vx:0,vy:0,vz:0,size:.08,color:0})),this.dummy=new qe,this.direction=new L,this.dropGeometry=new jn(1,7,5),this.dropMaterial=new gn({color:"#ffffff",emissive:"#163a35",emissiveIntensity:.06,depthTest:!0,depthWrite:!0}),this.droplets=new wn(this.dropGeometry,this.dropMaterial,this.capacity),this.droplets.name="arcade-impact-droplets",this.droplets.instanceMatrix.setUsage(Ui),this.droplets.frustumCulled=!1,this.droplets.count=0;for(let n=0;n<this.capacity;n++)this.droplets.setColorAt(n,Md[0]);this.droplets.instanceColor.setUsage(Ui),this.scene.add(this.droplets);const e=t.touch?xa.mobileRipples:xa.desktopRipples;this.ripples=Array.from({length:e},(n,s)=>{const r=new Ni(2,2,8,8);r.rotateX(-Math.PI/2);const o=r.attributes.position.array.slice(),a=new Zn({vertexShader:NM,fragmentShader:FM,uniforms:za.merge([zt.fog,{uAge:{value:0},uOpacity:{value:.75},uWater:{value:new ee("#6aaba4")},uFoam:{value:new ee("#e8f2df")}}]),transparent:!0,depthTest:!0,depthWrite:!1,side:Ce,fog:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),l=new Jt(r,a);return l.name=`arcade-impact-ripple-${s}`,l.frustumCulled=!1,l.visible=!1,this.scene.add(l),{mesh:l,reference:o,age:0,duration:1,active:!1}})}ground(t,e){const n=this.game.ground(t,e);return Number.isFinite(n)?n:0}random(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}ripple(t,e,n,s,r=.75){const o=this.ripples[this.rippleCursor++%this.ripples.length],a=o.mesh.geometry.attributes.position;for(let l=0;l<a.count;l++){const c=t+o.reference[l*3]*n,h=e+o.reference[l*3+2]*n;a.setXYZ(l,c,this.ground(c,h)+.035,h)}a.needsUpdate=!0,o.mesh.geometry.computeVertexNormals(),o.mesh.material.uniforms.uAge.value=0,o.mesh.material.uniforms.uOpacity.value=r,o.age=0,o.duration=s,o.active=!0,o.mesh.visible=!0}emit({x:t,y:e,z:n,count:s,power:r,spread:o=.12,dx:a=0,dz:l=0,lifetime:c=.55}){const h=Math.hypot(a,l);h>0&&(a/=h,l/=h);for(let u=0;u<s;u++){const d=this.particles[this.cursor++%this.capacity],f=this.random()*UM,m=(.8+this.random()*1.7)*r;d.x=t+(this.random()-.5)*o,d.y=e+this.random()*.07,d.z=n+(this.random()-.5)*o,d.vx=Math.sin(f)*m+a*r*.65,d.vz=Math.cos(f)*m+l*r*.65,d.vy=(1.8+this.random()*2.2)*r,d.total=c*(.82+this.random()*.3),d.life=d.total,d.size=(.045+this.random()*.045)*Math.sqrt(r),d.color=u%3}this.drawDrops()}hit({x:t,z:e,dx:n=0,dz:s=0,height:r,heavy:o=!1}={}){if(!Jl({x:t,z:e}))return;const a=this.ground(t,e),l=Number.isFinite(r)?Math.max(a+.04,r):a+.7;this.ripple(t,e,o?1.3:.72,o?.54:.4,o?.8:.64),this.emit({x:t,y:l,z:e,dx:n,dz:s,count:o?15:8,power:o?1.2:.72,spread:o?.22:.1,lifetime:o?.58:.43})}stone({x:t,z:e,radius:n=2.8}={}){if(!Jl({x:t,z:e}))return;const s=Jr(Number.isFinite(n)?n:2.8,1,4);this.ripple(t,e,s,.74,.9),this.emit({x:t,y:this.ground(t,e)+.12,z:e,count:this.game.touch?28:34,power:1.8,spread:.55,lifetime:.76})}landing({x:t,z:e,strength:n=1}={}){if(!Jl({x:t,z:e}))return;const s=Jr(Number.isFinite(n)?n:1,.35,1.8);this.ripple(t,e,.75+s*.42,.48,.68),this.emit({x:t,y:this.ground(t,e)+.08,z:e,count:Math.round(6+s*5),power:.6+s*.28,spread:.25,lifetime:.48})}drawDrops(){let t=0;for(const e of this.particles){if(e.life<=0)continue;const n=Jr(e.life/.13),s=e.size*n;this.dummy.position.set(e.x,e.y,e.z),this.direction.set(e.vx,e.vy,e.vz),this.direction.lengthSq()>1e-6?this.dummy.quaternion.setFromUnitVectors(kM,this.direction.normalize()):this.dummy.quaternion.identity(),this.dummy.scale.set(s,s*1.55,s),this.dummy.updateMatrix(),this.droplets.setMatrixAt(t,this.dummy.matrix),this.droplets.setColorAt(t,Md[e.color]),t++}this.droplets.count=t,this.droplets.instanceMatrix.needsUpdate=!0,this.droplets.instanceColor.needsUpdate=!0}update(t=0){const e=Jr(Number.isFinite(t)?t:0,0,.1);if(e!==0){this.time+=e;for(const n of this.particles){if(n.life<=0||(n.life=Math.max(0,n.life-e),n.life===0))continue;n.x+=n.vx*e,n.z+=n.vz*e,n.y+=n.vy*e-7*e*e,n.vy-=14*e;const s=Math.exp(-e*1.2);n.vx*=s,n.vz*=s;const r=this.ground(n.x,n.z)+.025;n.y<r&&(n.y=r,n.vy=0,n.vx*=.3,n.vz*=.3,n.life=Math.min(n.life,.06))}this.drawDrops();for(const n of this.ripples)n.active&&(n.age+=e,n.mesh.material.uniforms.uAge.value=Jr(n.age/n.duration),n.age>=n.duration&&(n.active=!1,n.mesh.visible=!1))}}clear(){for(const t of this.particles)t.life=0;this.droplets.count=0;for(const t of this.ripples)t.active=!1,t.mesh.visible=!1,t.age=0;this.time=0}dispose(){this.clear(),this.droplets.removeFromParent(),this.dropGeometry.dispose(),this.dropMaterial.dispose();for(const t of this.ripples)t.mesh.removeFromParent(),t.mesh.geometry.dispose(),t.mesh.material.dispose()}}const ur=["#b5dc72","#ee8c72","#bd9ee3"],_d=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),bd=Math.PI*2,BM=["pelvis","spine","head","eyeL","eyeR","wrist-1","wrist1","foot-1","foot1"];class HM{constructor(t){this.game=t,this.scene=t.scene,this.clock=0,this.group=new te,this.group.name="storage-homes-and-fenced-catapult-yards",this.scene.add(this.group),this.bases=new Map,this.groves=[],this.enclosures=new Map,this.ownedGeometries=[],this.ownedMaterials=[],this.dummy=new qe,this.sightRay=new ds,this.sightTarget=new L,this.sightHit=new L,this.roofRay=new ds,this.roofHit=new L,this.roofCamera=new L,this.roofAnchor=new L,this.roofNearest=new L,this.roofTargets=Array.from({length:16},()=>new L),this.roofTargetCount=0,this.geometries={box:new Gi(1,1,1),cylinder:new Us(.5,.5,1,8),cone:new yh(1,1,5),leaf:new _h(1,1),ring:new as(.91,1,40),wing:new jn(1,6,4),sphere:new jn(1,8,6)},this.materials={wood:new gn({color:"#866244"}),lightWood:new gn({color:"#c69b62"}),darkWood:new gn({color:"#554535"}),leaf:new gn({color:"#56874d"}),fly:new gn({color:"#233e38"}),wing:new gn({color:"#d5eee1",transparent:!0,opacity:.85}),ruin:new gn({color:"#6a6855"}),dark:new xn({color:"#173b31"}),alert:new xn({color:"#f4af69"})},this.buildWalls();for(const[e,n]of Wn.entries())this.bases.set(n.id,this.buildBase(n,e));for(const[e,n]of Rh.entries())this.groves.push(this.buildGrove(n,e))}ground(t,e){return this.game.ground(t,e)}mesh(t,e,n,s=0,r=0,o=0,a=1,l=1,c=1){const h=new Jt(e,n);return h.position.set(s,r,o),h.scale.set(a,l,c),t.add(h),h}material(t){const e=new gn(t);return this.ownedMaterials.push(e),e}mergeParts(t,e,n){if(!t.length)return null;const s=ki(t);for(const o of t)o.dispose();this.ownedGeometries.push(s);const r=new Jt(s,e);return r.name=n,this.group.add(r),r}boxPart(t,e,n,s,r,o,a){const l=this.geometries.box.clone();l.scale(r,o,a),l.translate(e,n,s),t.push(l)}buildWalls(){const t=[];for(const e of Xa){const n=Wn.findIndex(x=>x.owner===e.owner),s=[],r=[],o=[],a=this.material({color:"#866244",transparent:!0,opacity:1}),l=this.material({color:ur[n],transparent:!0,opacity:1});for(const x of fs){if(x.enclosureId!==e.id)continue;const g=this.ground(x.x,x.z);this.boxPart(t,x.x,g+.25,x.z,x.hw*2+.08,.5,x.hd*2+.08),this.boxPart(s,x.x,g+x.height*.5,x.z,x.hw*2,x.height,x.hd*2),this.boxPart(r,x.x,g+x.height+.055,x.z,x.hw*2+.05,.16,x.hd*2+.05);const M=x.hw>x.hd,y=M?x.hw*2:x.hd*2,v=Math.max(1,Math.floor(y/.65));for(let E=0;E<=v;E++){const T=v?E/v-.5:0;this.boxPart(s,x.x+(M?T*y:0),g+x.height*.55,x.z+(M?0:T*y),.15,x.height+.32,.15)}o.push(new Nn(new L(x.x-x.hw-.1,g,x.z-x.hd-.1),new L(x.x+x.hw+.1,g+x.height+.35,x.z+x.hd+.1)))}const c=this.mergeParts(s,a,`${e.id}-solid-walls`),h=this.mergeParts(r,l,`${e.id}-wall-tops`);this.enclosures.set(e.id,{definition:e,wallMesh:c,capMesh:h,woodMaterial:a,capMaterial:l,boxes:o,faded:!1});const u=this.ground(e.gate.x,e.gate.z),d=new te;d.name=`${e.id}-single-open-entrance`,d.position.set(e.gate.x,u,e.gate.z),this.group.add(d),(e.side==="east"||e.side==="west")&&(d.rotation.y=Math.PI/2),this.mesh(d,this.geometries.box,a,-1.6,1.25,0,.18,2.5,.25),this.mesh(d,this.geometries.box,a,1.6,1.25,0,.18,2.5,.25),this.mesh(d,this.geometries.box,l,0,2.5,0,3.38,.22,.3);const m=this.mesh(d,this.geometries.box,this.material({color:ur[n]}),0,.045,0,2.8,.07,.5);m.name="walkable-gate-threshold";const p=this.mesh(d,this.geometries.leaf,this.material({color:ur[n]}),0,2.9,0,.4,.35,.1);p.rotation.z=.25}this.mergeParts(t,this.materials.ruin,"enclosure-foundations")}updateWallVisibility(t,e,n){const s=this.game.camera;let r=0;t&&s&&(this.sightTarget.set(t.x,this.ground(t.x,t.z)+(t.height||0)+.9,t.z),this.sightRay.origin.copy(s.position),this.sightRay.direction.copy(this.sightTarget).sub(s.position),r=this.sightRay.direction.lengthSq(),this.sightRay.direction.normalize());const o=1-Math.exp(-Math.max(n,.016)*10);for(const a of this.enclosures.values()){let l=e?.id===a.definition.id;if(!l&&r>0){for(const h of a.boxes)if(this.sightRay.intersectBox(h,this.sightHit)&&this.sightHit.distanceToSquared(this.sightRay.origin)<r-.05){l=!0;break}}a.faded=l;const c=l?.2:a.woodMaterial.opacity+(1-a.woodMaterial.opacity)*o;a.woodMaterial.opacity=a.capMaterial.opacity=c,a.woodMaterial.depthWrite=a.capMaterial.depthWrite=c>.95}}prepareRoofSight(t){this.roofTargetCount=0;const e=this.game.camera;if(!t||!e)return;e.getWorldPosition(this.roofCamera);const n=this.game.models?.[0],s=_d(t.load||0);if(n?.group){n.group.updateWorldMatrix(!0,!0),this.roofAnchor.setFromMatrixPosition(n.group.matrixWorld);for(const c of BM){const h=n.bones?.[c];h&&this.roofTargets[this.roofTargetCount++].setFromMatrixPosition(h.matrixWorld)}}else this.roofAnchor.set(t.x,this.ground(t.x,t.z)+(t.height||0)+s*.28+(t.catapultId?.45:0),t.z);const r=.86+s*.45,o=.55+s*.22,a=.85+s*.32,l=this.roofAnchor;this.roofTargets[this.roofTargetCount++].set(l.x,l.y+o,l.z),this.roofTargets[this.roofTargetCount++].set(l.x-r,l.y+o,l.z),this.roofTargets[this.roofTargetCount++].set(l.x+r,l.y+o,l.z),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+o,l.z-r),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+o,l.z+r),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+.08,l.z),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+a,l.z)}roofObstructsPlayer(t){if(!this.roofTargetCount)return!1;const e=this.roofCamera,n=this.roofRay,s=this.game.camera,r=s.near||.1,o=Math.tan((s.fov||52)*Math.PI/360),a=Math.max(.35,r*Math.sqrt(1+o*o*(1+(s.aspect||1)**2))+.08);for(const l of t.roofTriangles)if(l.closestPointToPoint(e,this.roofNearest),this.roofNearest.distanceToSquared(e)<a*a)return!0;n.origin.copy(e);for(let l=0;l<this.roofTargetCount;l++){n.direction.copy(this.roofTargets[l]).sub(e);const c=n.direction.lengthSq();if(!(c<1e-8)&&(n.direction.normalize(),!!n.intersectsBox(t.roofBounds))){for(const h of t.roofTriangles)if(n.intersectTriangle(h.a,h.b,h.c,!1,this.roofHit)&&this.roofHit.distanceToSquared(e)<c)return!0}}return!1}stockObstructsPlayer(t){if(!this.roofTargetCount)return!1;const e=this.roofCamera,n=this.roofRay,s=t.stockBounds,r=this.game.camera,o=r.near||.1,a=Math.tan((r.fov||52)*Math.PI/360),l=Math.max(.35,o*Math.sqrt(1+a*a*(1+(r.aspect||1)**2))+.08);if(s.distanceToPoint(e)<l)return!0;n.origin.copy(e);for(let c=0;c<this.roofTargetCount;c++){n.direction.copy(this.roofTargets[c]).sub(e);const h=n.direction.lengthSq();if(!(h<1e-8)&&(n.direction.normalize(),n.intersectBox(s,this.roofHit)&&this.roofHit.distanceToSquared(e)<h-1e-5))return!0}return!1}buildHouse(t,e,n){const s=this.game.houseFloors?.find(P=>P.baseId===t.id),r=s?.height??this.ground(t.x,t.z),o=t.halfWidth+.18,a=t.halfDepth+.18,l=new te;l.name=`${t.id}-actual-roofed-house`,l.position.set(t.x,r,t.z),this.group.add(l);const c=this.mesh(l,this.geometries.box,this.materials.darkWood,0,-.09,0,o*2,.18,a*2);c.name="house-floor-at-actor-height";const h=[];for(let P=-a+.2;P<a;P+=.4)this.boxPart(h,0,-.012,Math.min(P,a-.2),o*2-.06,.025,.355);const u=ki(h);for(const P of h)P.dispose();this.ownedGeometries.push(u),this.mesh(l,u,this.materials.lightWood);const d=[];for(const P of[-t.halfWidth,t.halfWidth])for(const G of[-t.halfDepth,t.halfDepth]){const j=this.game.world?.getSurface(t.x+P,t.z+G).height??s?.minimum??r-.2,O=Math.max(.18,r-j);this.boxPart(d,P,-O*.5,G,.3,O,.3)}const f=ki(d);for(const P of d)P.dispose();this.ownedGeometries.push(f),this.mesh(l,f,this.materials.darkWood);const m=t.side==="east"||t.side==="west",p=(m?t.halfDepth:t.halfWidth)+.32,x=(m?t.halfWidth:t.halfDepth)+.32,g=2.62,M=4.05,y=new Se;y.setAttribute("position",new Vt([-p,g,-x,0,M,-x,p,g,-x,-p,g,x,0,M,x,p,g,x],3)),y.setIndex([0,3,4,0,4,1,1,4,5,1,5,2,0,1,2,3,5,4]),y.computeVertexNormals(),m&&y.rotateY(Math.PI/2),this.ownedGeometries.push(y);const v=this.mesh(l,y,e);v.name="full-house-leaf-roof",v.updateWorldMatrix(!0,!1);const E=[],T=new Nn,w=y.attributes.position,R=y.index;for(let P=0;P<R.count;P+=3){const G=new qn;G.a.fromBufferAttribute(w,R.getX(P)).applyMatrix4(v.matrixWorld),G.b.fromBufferAttribute(w,R.getX(P+1)).applyMatrix4(v.matrixWorld),G.c.fromBufferAttribute(w,R.getX(P+2)).applyMatrix4(v.matrixWorld),E.push(G),T.expandByPoint(G.a).expandByPoint(G.b).expandByPoint(G.c)}const S=this.mesh(l,this.geometries.cylinder,n,0,M+.18,0,.13,.55,.13);S.rotation.z=.2;const b=this.mesh(l,this.geometries.leaf,n,.2,M+.48,0,.5,.14,.24);b.rotation.z=.3;let U=null;if(s?.ramp){const P=s.ramp,G=[],j=[];for(let K=0;K<=P.rows;K++)for(let q=0;q<=P.cols;q++){const Y=K/P.rows*P.length,H=(q/P.cols*2-1)*P.halfWidth;G.push(P.x+P.dx*Y+P.rightX*H,P.heights[K*(P.cols+1)+q],P.z+P.dz*Y+P.rightZ*H)}for(let K=0;K<P.rows;K++)for(let q=0;q<P.cols;q++){const Y=K*(P.cols+1)+q,H=Y+1,st=Y+P.cols+1,_t=st+1;j.push(Y,st,H,H,st,_t)}const O=new Se;O.setAttribute("position",new Vt(G,3)),O.setIndex(j),O.computeVertexNormals(),this.ownedGeometries.push(O);const B=this.material({color:"#b18b59",side:Ce});U=new Jt(O,B),U.name=`${t.id}-walkable-door-ramp`,this.group.add(U)}return l.userData={baseId:t.id,interior:{x:t.x,z:t.z,halfWidth:t.halfWidth-.17,halfDepth:t.halfDepth-.17},floorY:r,roofEaveY:r+g,roofRidgeY:r+M},{house:l,deck:c,ramp:U,roof:v,roofStem:S,roofLeaf:b,roofTriangles:E,roofBounds:T}}buildBase(t,e){const n=new te;n.name=`${t.id}-shelter`,n.position.set(t.stock.x,this.ground(t.stock.x,t.stock.z),t.stock.z),this.group.add(n);const s=t.side==="north"?0:t.side==="east"?Math.PI/2:-Math.PI/2,r=new te;r.rotation.y=s,n.add(r);const o=this.material({color:ur[e]}),a=this.material({color:e===0?"#61975b":e===1?"#ba7356":"#9270b0",transparent:!0,opacity:1,depthWrite:!0,side:Ce}),l=[this.materials.wood,this.materials.darkWood,o].map(B=>{const K=B.clone();return K.transparent=!0,this.ownedMaterials.push(K),K}),c=this.mesh(r,this.geometries.cylinder,l[0],0,.38,0,1.25,.76,1.25);c.name="infinite-fly-stock-basket";const h=this.mesh(r,this.geometries.cylinder,l[1],0,.77,0,1.15,.09,1.15);h.name="stock-basket-lid";const u=this.mesh(r,this.geometries.cylinder,l[2],0,.42,0,1.31,.14,1.31);u.name="owner-color-on-stock";const d=[c,h,u],{house:f,deck:m,ramp:p,roof:x,roofStem:g,roofLeaf:M,roofTriangles:y,roofBounds:v}=this.buildHouse(t,a,o),E=new te;E.name="visible-fly-reserve",r.add(E);const T=new wn(this.geometries.sphere,this.materials.fly,8),w=new wn(this.geometries.wing,this.materials.wing,16);T.name="reserve-fly-bodies",w.name="reserve-fly-wings",T.frustumCulled=w.frustumCulled=!1,E.add(T,w);const R=new xn({color:ur[e],transparent:!0,opacity:.36,side:Ce,depthWrite:!1});this.ownedMaterials.push(R);const S=this.mesh(n,this.geometries.ring,R,0,.045,0,2.05,2.05,2.05);S.rotation.x=-Math.PI/2,S.name="stock-refill-ring";const b=new te;b.name="storage-destruction-progress",b.position.set(0,2.12,0),n.add(b),this.mesh(b,this.geometries.box,this.materials.dark,0,0,0,2.2,.17,.09);const U=this.mesh(b,this.geometries.box,this.materials.alert,-1.06,0,.055,0,.115,.05);b.visible=!1;const P=new te;P.name="destroyed-storage-remains",P.visible=!1,n.add(P);const G=[];for(let B=0;B<5;B++){const K=this.geometries.box.clone();K.scale(.2,.2,1.1),K.rotateY(B*.8),K.translate(Math.sin(B*2.4)*.8,.12+B%2*.08,Math.cos(B*2.4)*.7),G.push(K)}const j=ki(G);for(const B of G)B.dispose();this.ownedGeometries.push(j),this.mesh(P,j,this.materials.ruin),n.updateWorldMatrix(!0,!0);const O=new Nn;for(const B of d)O.union(new Nn().setFromObject(B));return O.expandByScalar(.03),{definition:t,group:n,cabin:r,house:f,deck:m,ramp:p,roof:x,roofStem:g,roofLeaf:M,roofTriangles:y,roofBounds:v,roofObstructed:!1,roofHold:0,roofMaterial:a,stockMeshes:d,stockMaterials:l,stockBounds:O,stockObstructed:!1,marker:S,markerMaterial:R,bar:b,fill:U,supply:E,flyBodies:T,flyWings:w,ruins:P,index:e}}buildGrove(t,e){const n=new te;n.name=t.id,this.group.add(n);const s=this.material({color:["#487c47","#609147","#397553","#668349","#4d825a"][e],transparent:!0,opacity:.94,depthWrite:!0}),r=[],o=[],a=[],l=new te;l.name="tree-cover-canopy",n.add(l);for(let d=0;d<3;d++){const f=d*bd/3+e*.7,m=t.x+Math.cos(f)*t.radius*.43,p=t.z+Math.sin(f)*t.radius*.43,x=this.ground(m,p),g=3.3+d%2*.5,M=this.geometries.cylinder.clone();M.scale(.24,g,.24),M.translate(m,x+g/2,p),o.push(M);for(let v=0;v<3;v++){const E=this.geometries.leaf.clone();E.scale(1.35+v*.12,.8,1.25),E.translate(m+Math.sin(v*2.1)*.42,x+g+v*.35,p+Math.cos(v*2.1)*.35),r.push(E)}const y=this.geometries.leaf.clone();y.scale(.7,.35,.7),y.translate(m+.5,x+.22,p-.25),a.push(y)}const c=(d,f,m,p)=>{const x=ki(d);for(const M of d)M.dispose();this.ownedGeometries.push(x);const g=new Jt(x,f);return g.name=m,p.add(g),g};c(o,this.materials.wood,"grove-trunks",n),c(r,s,"grove-leaf-crown",l),c(a,this.materials.leaf,"slow-moving-underbrush",n);const h=new xn({color:"#50733f",transparent:!0,opacity:.2,side:Ce,depthWrite:!1});this.ownedMaterials.push(h);const u=this.mesh(n,this.geometries.ring,h,t.x,this.ground(t.x,t.z)+.02,t.z,t.radius,t.radius,t.radius);return u.rotation.x=-Math.PI/2,{definition:t,group:n,canopy:l,material:s}}update(t=0){const e=this.game.running?Math.max(0,Math.min(.1,t)):0;this.clock+=e;const n=this.game.state.actors?.[0],s=n?H1(n):null;this.updateWallVisibility(n,s,t),this.prepareRoofSight(n);const r=this.game.state.bases||[];for(const o of this.bases.values()){const a=r.find(m=>m.id===o.definition.id||m.owner===o.definition.owner),l=!!a?.destroyed,c=_d((a?.progress||0)/10),h=c>0&&!l;o.cabin.visible=!l,o.supply.visible=!l,o.ruins.visible=l,o.stockObstructed=!l&&this.stockObstructsPlayer(o);const u=o.stockMaterials[0].opacity+(1-o.stockMaterials[0].opacity)*(1-Math.exp(-Math.max(t,.016)*10)),d=o.stockObstructed?.18:u>.995?1:u;for(const m of o.stockMaterials)m.opacity=d,m.depthWrite=d===1;o.markerMaterial.color.set(l?"#5c7067":h?"#ff9b58":ur[o.index]),o.markerMaterial.opacity=l?.12:h?.4+.12*Math.sin(this.clock*8):.28,o.bar.visible=h,o.fill.scale.x=2.12*c,o.fill.position.x=-1.06+1.06*c,this.game.camera&&o.bar.quaternion.copy(this.game.camera.quaternion),o.roofObstructed=s?.id===o.definition.id||this.roofObstructsPlayer(o),o.roofHold=o.roofObstructed?.18:Math.max(0,o.roofHold-Math.max(t,.016));const f=o.roofObstructed||o.roofHold>0;o.roof.visible=!l&&!f,o.roofMaterial.opacity=f?0:o.roofMaterial.opacity+(1-o.roofMaterial.opacity)*(1-Math.exp(-Math.max(t,.016)*10)),o.roofMaterial.depthWrite=o.roofMaterial.opacity>.9,o.roofStem.visible=o.roofLeaf.visible=o.roof.visible&&o.roofMaterial.opacity>.6,o.cabin.position.x=h?Math.sin(this.clock*25)*.025:0;for(let m=0;m<8;m++){const p=this.clock*(1.4+m%3*.2)+m*bd/8,x=.3+m%3*.13,g=Math.sin(p)*x,M=1.05+m%3*.17+Math.sin(this.clock*4+m)*.08,y=Math.cos(p)*x,v=this.dummy;v.position.set(g,M,y),v.scale.set(.09,.08,.13),v.rotation.set(0,p,0),v.updateMatrix(),o.flyBodies.setMatrixAt(m,v.matrix);for(let E=0;E<2;E++){const T=E===0?-1:1;v.position.set(g+Math.cos(p)*T*.105,M+.035,y-Math.sin(p)*T*.105),v.scale.set(.15,.016,.07),v.rotation.set(0,p,Math.sin(this.clock*36+m)*.55*T),v.updateMatrix(),o.flyWings.setMatrixAt(m*2+E,v.matrix)}}o.flyBodies.instanceMatrix.needsUpdate=!0,o.flyWings.instanceMatrix.needsUpdate=!0}for(const o of this.groves){const l=n&&Math.hypot(n.x-o.definition.x,n.z-o.definition.z)<o.definition.radius+1.4?.23:.94;o.material.opacity+=(l-o.material.opacity)*(1-Math.exp(-Math.max(t,.016)*8)),o.material.depthWrite=o.material.opacity>.9}}dispose(){this.group.removeFromParent();for(const t of this.ownedGeometries)t.dispose();for(const t of Object.values(this.geometries))t.dispose();for(const t of this.ownedMaterials)t.dispose();for(const t of Object.values(this.materials))t.dispose();this.bases.clear(),this.enclosures.clear(),this.groves.length=0}}const ss=["move","aim","fire"],eo=8,ka=(i,t,e)=>Math.max(t,Math.min(e,i)),yr=(i,t)=>Number.isFinite(i)?i:t,Dh=(i,t)=>({left:i.x-t.width/2,top:i.y-t.height/2,right:i.x+t.width/2,bottom:i.y+t.height/2}),GM=(i,t,e=eo)=>i.left<t.right+e&&i.right>t.left-e&&i.top<t.bottom+e&&i.bottom>t.top-e;function Rf(i,t,e,n,s=i){const r=e.left+t.width/2,o=Math.max(r,e.right-t.width/2),a=e.top+t.height/2,l=Math.max(a,e.bottom-t.height/2),c=m=>({x:ka(yr(m?.x,r),r,o),y:ka(yr(m?.y,a),a,l)}),h=c(i),u=[h,c(s)];for(const m of n)u.push(c({x:m.left-t.width/2-eo,y:h.y}),c({x:m.right+t.width/2+eo,y:h.y}),c({x:h.x,y:m.top-t.height/2-eo}),c({x:h.x,y:m.bottom+t.height/2+eo}));for(let m=a;m<=l+16;m+=16)for(let p=r;p<=o+16;p+=16)u.push(c({x:p,y:m}));let d=null,f=1/0;for(const m of u){if(n.some(x=>GM(Dh(m,t),x)))continue;const p=(m.x-h.x)**2+(m.y-h.y)**2;p<f&&(d=m,f=p)}return d||c(s)}function VM(i,t,e,n=ss){const s=t>=i,r=new Set(n),o={},a=r.has("move")&&e.move,l=r.has("aim")&&e.aim,c=r.has("fire")&&e.fire;return a&&(o.move={x:14+a.width/2,y:t-26-a.height/2}),l&&(o.aim={x:i-14-l.width/2,y:t-26-l.height/2}),c&&(o.fire=l?s?{x:i-14-l.width/2,y:t-26-l.height-20-c.height/2}:{x:i-14-l.width-22-c.width/2,y:t-26-c.height/2}:{x:i-14-c.width/2,y:t-26-c.height/2}),o}function WM({width:i,height:t,controls:e={},activeKeys:n=ss,preferred:s={},blocked:r=[],insets:o={}}){const a=ss.filter(d=>n.includes(d)&&e[d]),l={left:Math.max(10,yr(o.left,0)+8),top:Math.max(10,yr(o.top,0)+8),right:i-Math.max(10,yr(o.right,0)+8),bottom:t-Math.max(18,yr(o.bottom,0)+8)},c=VM(i,t,e,a),h={},u=[...r];for(const d of a){const f=s[d],m=f&&Number.isFinite(f.x)&&Number.isFinite(f.y)?{x:f.x*i,y:f.y*t}:c[d];h[d]=Rf(m,e[d],l,u,c[d]),u.push(Dh(h[d],e[d]))}return{positions:h,bounds:l}}function XM({root:i,movePad:t,aimPad:e,fireButton:n,toggleButton:s,storageKey:r="frog.touch-layout.v1",onEditingChange:o=()=>{},announce:a=()=>{}}){const l=i.ownerDocument,c=l.defaultView,h={move:t,aim:e,fire:n},u=i.querySelector("#layout-hint");let d=!1,f=null,m={},p={},x={},g=[],M={portrait:{},landscape:{}},y=0,v=!1,E={width:c.innerWidth,height:c.innerHeight,mode:c.innerHeight>=c.innerWidth?"portrait":"landscape"};const T=[],w=(Y,H,st,_t)=>{Y.addEventListener(H,st,_t),T.push(()=>Y.removeEventListener(H,st,_t))},R=()=>c.innerHeight>=c.innerWidth?"portrait":"landscape",S=Y=>{if(!Y||Y.hidden||Y.closest("[hidden]"))return!1;const H=c.getComputedStyle(Y),st=Y.getBoundingClientRect();return H.display!=="none"&&H.visibility!=="hidden"&&H.visibility!=="collapse"&&st.width>0&&st.height>0};try{const Y=JSON.parse(c.localStorage.getItem(r)||"null");if(Y?.version===1)for(const H of["portrait","landscape"])for(const st of ss){const _t=Y[H]?.[st];Number.isFinite(_t?.x)&&Number.isFinite(_t?.y)&&(M[H][st]={x:ka(_t.x,0,1),y:ka(_t.y,0,1)})}}catch{}const b=()=>{const{mode:Y,width:H,height:st}=E;for(const _t of g)m[_t]&&(M[Y][_t]={x:m[_t].x/H,y:m[_t].y/st});try{c.localStorage.setItem(r,JSON.stringify({version:1,...M}))}catch{}},U=()=>{const Y=[];for(const H of l.querySelectorAll("#arcade-hud, #minimap, #view-button, #layout-button, #layout-hint, #round-status, #base-status, #catapult-status, #sabotage-status, #kick-button, #catapult-button, #sabotage-button")){if(!S(H))continue;const st=H.getBoundingClientRect();st.width&&st.height&&Y.push({left:st.left,top:st.top,right:st.right,bottom:st.bottom})}return Y},P=()=>{for(const Y of g){const H=h[Y],st=m[Y];st&&(H.style.left=`${st.x-p[Y].width/2}px`,H.style.top=`${st.y-p[Y].height/2}px`,H.style.right="auto",H.style.bottom="auto")}},G=()=>{if(v)return;const Y=ss.filter(ne=>S(h[ne]));f&&!Y.includes(f.key)&&O(),g=Y;const H=c.getComputedStyle(i),st={};for(const ne of["left","right","top","bottom"])st[ne]=parseFloat(H.getPropertyValue(`--touch-safe-${ne}`))||0;for(const ne of g){const le=h[ne],ut=le.getBoundingClientRect();p[ne]={width:Math.max(44,ut.width),height:Math.max(44,ut.height)}}for(const ne of ss)h[ne]?.classList.toggle("layout-draggable",d&&g.includes(ne));const _t=WM({width:c.innerWidth,height:c.innerHeight,controls:p,activeKeys:g,preferred:M[R()],blocked:U(),insets:st});m=_t.positions,x=_t.bounds,E={width:c.innerWidth,height:c.innerHeight,mode:R()},P()},j=()=>{c.cancelAnimationFrame(y),y=c.requestAnimationFrame(G)},O=()=>{f&&(f=null,b())},B=Y=>{const H=!!Y;if(H!==d){H&&G(),O(),d=H,i.classList.toggle("layout-editing",d),s.setAttribute("aria-pressed",String(d)),s.setAttribute("aria-label",d?"Ολοκλήρωση αλλαγής θέσεων χειριστηρίων":"Αλλαγή θέσεων χειριστηρίων"),s.querySelector("span")?.replaceChildren(d?"ΤΕΛΟΣ":"ΘΕΣΕΙΣ"),u&&(u.hidden=!d);for(const st of ss){const _t=h[st];_t&&(_t.setAttribute("data-layout-label",{move:"ΚΙΝΗΣΗ",aim:"ΣΤΟΧΕΥΣΗ",fire:"ΒΟΛΗ"}[st]),_t.classList.toggle("layout-draggable",d&&g.includes(st)))}d||b(),o(d),a(d?"Σύρε τα χειριστήρια στη θέση που σε βολεύει. Πάτησε ΤΕΛΟΣ για να συνεχίσεις.":"Οι θέσεις των χειριστηρίων αποθηκεύτηκαν.")}},K=()=>{for(const Y of g)delete M[R()][Y];G(),b(),a("Επαναφέρθηκαν οι αρχικές θέσεις χειριστηρίων.")};if(u){u.textContent.trim()||u.append("Σύρε τα ορατά χειριστήρια. ");const Y=l.createElement("button");Y.type="button",Y.className="layout-reset",Y.textContent="ΕΠΑΝΑΦΟΡΑ",Y.setAttribute("aria-label","Επαναφορά αρχικών θέσεων χειριστηρίων"),u.append(Y),w(Y,"click",K)}for(const Y of ss){const H=h[Y];if(H){w(H,"pointerdown",st=>{!d||!g.includes(Y)||!S(H)||(st.preventDefault(),st.stopImmediatePropagation(),!f&&(m[Y]||G(),f={key:Y,id:st.pointerId,dx:st.clientX-m[Y].x,dy:st.clientY-m[Y].y},H.setPointerCapture?.(st.pointerId)))},!0),w(H,"pointermove",st=>{if(!d||!g.includes(Y)||!S(H)||(st.preventDefault(),st.stopImmediatePropagation(),!f||f.id!==st.pointerId||f.key!==Y))return;const _t=U();for(const ne of g)ne!==Y&&m[ne]&&_t.push(Dh(m[ne],p[ne]));m[Y]=Rf({x:st.clientX-f.dx,y:st.clientY-f.dy},p[Y],x,_t,m[Y]),P()},!0);for(const st of["pointerup","pointercancel","lostpointercapture"])w(H,st,_t=>{d&&(_t.preventDefault?.(),_t.stopImmediatePropagation(),f?.id===_t.pointerId&&O())},!0);w(H,"click",st=>{d&&(st.preventDefault(),st.stopImmediatePropagation())},!0)}}let q=-1/0;return w(s,"pointerdown",Y=>{Y.pointerType==="touch"&&(Y.preventDefault(),Y.stopPropagation(),q=Date.now(),B(!d))}),w(s,"click",Y=>{(Y.detail===0||Date.now()-q>600)&&B(!d)}),w(c,"resize",()=>{O(),j()}),w(c,"orientationchange",j),w(c,"keydown",Y=>{d&&Y.code==="Escape"&&(Y.preventDefault(),Y.stopImmediatePropagation(),B(!1))},!0),w(c,"blur",()=>{O(),d&&B(!1)}),s.setAttribute("aria-pressed","false"),j(),{get editing(){return d},setEditing:B,refresh:G,reset:K,destroy(){if(!v){B(!1),v=!0,c.cancelAnimationFrame(y);for(const Y of T)Y()}}}}const Sd=i=>Number.isFinite(i)?Math.max(0,Math.min(1,i)):0,qM=Object.freeze([.96,.98,1.04]);function $M(i){if(i.stats?.type!=="frog")return i;i.group.getObjectByName("anatomical-animation-pivot").scale.set(...qM),i.group.scale.setScalar(1);const e=i.mesh.material;return e.bumpScale=0,e.roughness=.9,e.clearcoat=.08,e.clearcoatRoughness=.75,i}function YM(i,{load:t=0,spit:e=0}={}){if(i.stats?.type!=="frog")return i;const n=Sd(t),s=Sd(e),r=i.bones;i.group.scale.setScalar(1),r.throat.scale.x*=1+n*.08+s*.1,r.throat.scale.y*=1+n*.12+s*.16,r.throat.scale.z*=1+n*.08+s*.08,r.jaw.rotation.x-=s*.42,r.head.rotation.x-=s*.08;for(const o of["eyeL","eyeR"])r[o].scale.multiplyScalar(1.14);return i}const Aa=Object.freeze({cameraZoom:wr.default,cameraFov:52,cameraSensitivity:1}),Ql=(i,t)=>{const e=typeof i=="number"||typeof i=="string"&&i.trim()?Number(i):NaN;return Number.isFinite(e)?e:t},tc=(i,t,e)=>Math.max(t,Math.min(e,i));function Cf(i={}){const t=tc(Ql(i?.cameraZoom,Aa.cameraZoom),wr.min,wr.max),e=tc(Ql(i?.cameraFov,Aa.cameraFov),40,80),n=tc(Ql(i?.cameraSensitivity,Aa.cameraSensitivity),.25,2);return{cameraZoom:Math.round(t*20)/20,cameraFov:Math.round(e),cameraSensitivity:Math.round(n*20)/20}}function ZM(i){const t=i.camera,e=i.state?.actors?.[0];if(t.fov=i.settings.cameraFov,t.updateProjectionMatrix(),e){if(typeof i.updateCameraPose=="function")i.cameraReady=!1,i.updateCameraPose(0);else{const n=Ef(e,i.ground(e.x,e.z),t.aspect,i.viewMode,{yaw:i.cameraYaw,pitch:i.cameraPitch,zoom:i.settings.cameraZoom});i.focus.fromArray(n.look),i.cameraTarget.fromArray(n.position),t.position.copy(i.cameraTarget),t.lookAt(i.focus),t.updateMatrixWorld(),i.cameraReady=!0}i.basesView?.update(0)}i.renderer.render(i.scene,t),i.drawLabels?.()}function jM(i,{onChange:t=()=>{}}={}){const e=["camera-zoom","camera-zoom-value","camera-fov","camera-fov-value","camera-reset","camera-sensitivity","camera-sensitivity-value"],[n,s,r,o,a,l,c]=e.map(x=>{const g=i.$(x);if(!g)throw new Error(`Camera settings need #${x}`);return g});n.min="70",n.max="150",n.step="5",r.min="40",r.max="80",r.step="1",l.min="25",l.max="200",l.step="5";const h=()=>{const x=Cf(i.settings);return Object.assign(i.settings,x),n.value=String(Math.round(x.cameraZoom*100)),s.textContent=n.value+"%",r.value=String(x.cameraFov),o.textContent=r.value+"°",l.value=String(Math.round(x.cameraSensitivity*100)),c.textContent=l.value+"%",x},u=()=>{const x=h();ZM(i),t(x)},d=()=>{i.settings.cameraZoom=Number(n.value)/100,u()},f=()=>{i.settings.cameraFov=Number(r.value),u()},m=()=>{i.settings.cameraSensitivity=Number(l.value)/100,u()},p=()=>{Object.assign(i.settings,Aa),u()};return n.addEventListener("input",d),r.addEventListener("input",f),a.addEventListener("click",p),l.addEventListener("input",m),h(),()=>{n.removeEventListener("input",d),r.removeEventListener("input",f),a.removeEventListener("click",p),l.removeEventListener("input",m)}}function KM({canvas:i,document:t=globalThis.document,active:e=()=>!0,onLock:n=()=>{},onUnexpectedUnlock:s=()=>{},onFallback:r=()=>{},timeoutMs:o=1500,setTimer:a=globalThis.setTimeout,clearTimer:l=globalThis.clearTimeout}={}){let c=0,h=0,u=!1,d=null,f=!1,m=!1;const p=()=>t.pointerLockElement===i,x=()=>{d!==null&&l(d),d=null,h=0,u=!1},g=()=>{if(c++,x(),f=!1,p())try{t.exitPointerLock?.()}catch{}},M=()=>{if(!m)if(p()){if(x(),!e()){g();return}const T=!f;f=!0,T&&n()}else{const T=f;f=!1,T&&(x(),e()&&s())}},y=(T,w)=>{if(!(m||h!==T)){if(x(),p()){M();return}e()&&r(w)}},v=()=>{h&&!u&&y(h,new Error("Pointer Lock was denied."))},E=()=>{if(m||!e()||p()||h)return!1;const T=++c;h=T,u=!1;try{if(typeof i.requestPointerLock!="function")return y(T,new Error("Pointer Lock is unavailable.")),!1;const w=i.requestPointerLock();w&&typeof w.then=="function"&&(u=!0,Promise.resolve(w).then(()=>{!m&&h===T&&p()&&M()},R=>y(T,R))),h===T&&(d=a(()=>y(T,new Error("Pointer Lock request timed out.")),Math.max(0,Number.isFinite(o)?o:1500)))}catch(w){y(T,w)}return h===T||p()};return t.addEventListener("pointerlockchange",M),t.addEventListener("pointerlockerror",v),{get locked(){return p()},get pending(){return!!h},request:E,release:g,dispose(){m||(g(),m=!0,t.removeEventListener("pointerlockchange",M),t.removeEventListener("pointerlockerror",v))}}}function va(i,t,e=()=>performance.now(),{allowSecondary:n=!1}={}){const s=p=>p.pointerType==="touch"||p.pointerType==="pen";let r=null,o=-1/0;const a=p=>{const x=i.getBoundingClientRect();return p.clientX>=x.left&&p.clientX<=x.right&&p.clientY>=x.top&&p.clientY<=x.bottom},l=p=>{try{i.releasePointerCapture?.(p)}catch{}},c=p=>{if(p.pointerType==="mouse"){if(r){const x=r.id;r=null,l(x)}o=-1/0;return}if(!(i.disabled||!s(p)||p.isPrimary===!1&&!n||p.button!==0||r)){r={id:p.pointerId,canceled:!1};try{i.setPointerCapture?.(p.pointerId)}catch{}}},h=p=>{r?.id===p.pointerId&&!a(p)&&(r.canceled=!0)},u=p=>{r?.id===p.pointerId&&(r=null,o=e(),l(p.pointerId))},m={pointerdown:c,pointermove:h,pointerleave:h,pointerup:p=>{if(r?.id!==p.pointerId)return;const x=r;if(r=null,p.preventDefault(),o=e(),l(p.pointerId),!(i.disabled||x.canceled||!a(p)))try{t(p)}finally{o=e()}},pointercancel:u,lostpointercapture:u,click:p=>{if(i.disabled||s(p)||p.detail!==0&&e()-o<900){p.preventDefault();return}t(p)}};for(const[p,x]of Object.entries(m))i.addEventListener(p,x);return()=>{for(const[p,x]of Object.entries(m))i.removeEventListener(p,x);if(r){const p=r.id;r=null,l(p)}}}const Ii=1e-7,ya=i=>i&&Number.isFinite(i.x)&&Number.isFinite(i.y)&&Number.isFinite(i.z),ec=(i,t)=>i.x*t.x+i.y*t.y+i.z*t.z,Ma=(i,t)=>({x:i.x-t.x,y:i.y-t.y,z:i.z-t.z}),nc=(i,t,e)=>({x:i.x+t.x*e,y:i.y+t.y*e,z:i.z+t.z*e});function JM({rayOrigin:i,rayDirection:t,muzzle:e,range:n,hits:s=[]}={}){const r=ya(e)?e:{x:0,y:0,z:0},o=ya(i)?i:r,a=ya(t)?Math.hypot(t.x,t.y,t.z):0,l=a>Ii?{x:t.x/a,y:t.y/a,z:t.z/a}:{x:0,y:0,z:-1},c=Number.isFinite(n)&&n>Ii?n:1;let h=null,u=1/0;for(const g of s||[]){const M=g?.point??g;if(!ya(M))continue;const y=Ma(M,r),v=Ma(M,o),E=ec(v,l),T=Math.hypot(y.x,y.y,y.z);E<=Ii||E>=u||T<=Ii||T>c+Ii||(h=M,u=E)}const d=h?"hit":"range";if(!h){const g=Ma(o,r),M=ec(g,l),y=M*M-ec(g,g)+c*c,v=y>=0?-M+Math.sqrt(y):-1;if(v>Ii)h=nc(o,l,v);else{const E=Math.max(0,-M);h=nc(o,l,E>Ii?E:c)}}const f=Ma(h,r),m=Math.hypot(f.x,f.y,f.z),p=m>Ii?{x:f.x/m,y:f.y/m,z:f.z/m}:l,x=m>Ii?Math.min(c,m):c;return{target:nc(r,p,x),direction:p,distance:x,source:d}}function QM({state:i,actor:t,input:e={},active:n=!1,aiming:s=!1}={}){const r={fire:!1,targetId:null,trace:null};if(!n||!s||i?.status!=="playing"||i.phase!=="battle"||!t||!Array.isArray(i.actors)||t.ko||t.eliminated||t.dizzyTime>0||t.hit>0||t.knockUp>0||t.kick>0||t.catapultId||t.sabotageId||!Number.isFinite(t.ammo)||t.ammo<=0||!e||e.aiming===!1||e.sabotage||e.kick||e.throwStone||e.interactCatapult||e.interact)return r;const o=e.ay===void 0?0:e.ay;if(!Number.isFinite(t.x)||!Number.isFinite(t.z)||!Number.isFinite(e.ax)||!Number.isFinite(o)||!Number.isFinite(e.az)||Math.hypot(e.ax,o,e.az)<=.05)return r;const a=bf(i,{...t,aimX:e.ax,aimY:o,aimZ:e.az,aim3D:Number.isFinite(e.ay)}),l=a.kind==="actor"?i.actors.find(c=>c.id===a.targetId):null;return!l||l.id===t.id||l.ko||l.eliminated||l.invuln>0?{...r,trace:a}:{fire:!0,targetId:l.id,trace:a}}const wd=new WeakMap,Qr=i=>i&&["x","y","z"].every(t=>Number.isFinite(i[t])),t_=i=>{let t=wd.get(i);return t||(t={ray:new ds,hit:new L},wd.set(i,t)),t};function e_(i,t,{directional:e=!1}={}){if(!i||!t)return!1;const n=t_(i);let s,r;if(e){const a=i.state?.actors?.[0],l=i.state?.actors?.find(f=>f.id===t);if(!a||!l||l.id===a.id||l.ko||l.eliminated||!Qr(i.camera?.position)||(r=vo(i.state,l),!Qr(r)))return!1;s=n.ray,s.origin.copy(i.camera.position),s.direction.set(r.x,r.y,r.z).sub(s.origin);const c=s.direction.length();if(c<1e-8)return!1;s.direction.multiplyScalar(1/c);const h=vo(i.state,a),u=Math.max(0,(h.x-s.origin.x)*s.direction.x+(h.y-s.origin.y)*s.direction.y+(h.z-s.origin.z)*s.direction.z),d=_f(i.state,s.origin,s.direction,c,{ignoreId:a.id,solidFrom:u});if(d?.targetId!==t)return!1;r=d}else if(!i.mouse?.valid||i.mouse.targetId!==t||!Qr(i.mouse.target)||(s=i.mouseRay?.ray,r=i.mouse.target,!s||!Qr(s.origin)||!Qr(s.direction)))return!1;const o=(r.x-s.origin.x)**2+(r.y-s.origin.y)**2+(r.z-s.origin.z)**2;for(const a of i.basesView?.bases?.values()||[]){if(a.roof.visible&&a.roofMaterial.opacity>.5&&s.intersectsBox(a.roofBounds)){for(const l of a.roofTriangles)if(s.intersectTriangle(l.a,l.b,l.c,!1,n.hit)&&n.hit.distanceToSquared(s.origin)<o-.01)return!1}if(a.cabin.visible&&a.stockMaterials[0].opacity>.5&&s.intersectBox(a.stockBounds,n.hit)&&n.hit.distanceToSquared(s.origin)<o-.01)return!1}return!0}function eh(i={}){return{touchFireMode:i?.touchFireMode==="auto"?"auto":"manual"}}const n_={manual:"Εσύ πατάς ΠΥΡ. Μπορείς να πυροβολείς ελεύθερα για εξάσκηση, ακόμη και στην προετοιμασία.",auto:"Στόχευσε αντίπαλο με το δεξί joystick ή με σύρσιμο για αυτόματη βολή. Το ΠΥΡ παραμένει διαθέσιμο για ελεύθερη εξάσκηση."};function i_(i,{onChange:t=()=>{}}={}){const e=i.$("touch-fire-mode"),n=i.$("touch-fire-mode-help");if(!e)throw new Error("Fire settings need #touch-fire-mode");const s=()=>{const o=eh(i.settings);return Object.assign(i.settings,o),e.value=o.touchFireMode,n&&(n.textContent=n_[o.touchFireMode]),o},r=()=>{const o=i.settings.touchFireMode;Object.assign(i.settings,eh({touchFireMode:e.value}));const a=s();a.touchFireMode!==o&&(i.clearInputs(),i.updateHUD(),i.touchLayout?.refresh(),t(a))};return s(),e.addEventListener("change",r),()=>e.removeEventListener("change",r)}const en=L,ic=new en(0,1,0),s_=ln.muzzleOffset+Rt.projectileSpeed*Rt.projectileLifetime,_a=(i,t,e)=>Math.max(t,Math.min(e,i)),r_=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]),sc=i=>{try{return localStorage.getItem(i)}catch{return null}},dr=(i,t)=>{try{return localStorage.setItem(i,t),!0}catch{return!1}},Fs=i=>`<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">${i}</svg>`,rc=Fs('<ellipse cx="21" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(-30 21 23)"/><ellipse cx="43" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(30 43 23)"/><ellipse cx="32" cy="37" rx="10" ry="15" fill="#344b50" stroke="#12282b" stroke-width="3"/><circle cx="27" cy="25" r="5" fill="#fff6cd"/><circle cx="37" cy="25" r="5" fill="#fff6cd"/><circle cx="28" cy="25" r="2" fill="#14282c"/><circle cx="36" cy="25" r="2" fill="#14282c"/>'),o_=Fs('<path d="m15 8 11 5-4 21 29 6 4 10-36 4-9-11z" fill="#d3ff80" stroke="#314b2d" stroke-width="3"/><path d="m46 13 4 8m9-5-6 9m9 4-9 1" stroke="#ffce71" stroke-width="4"/>'),Ed=Fs('<path d="M9 50h46M18 47l10-28 18 28M31 27l20-17" stroke="#d9bf82" stroke-width="6" stroke-linecap="round"/><path d="m45 9 13 4-4 10-12-5z" fill="#8ea29a"/><circle cx="17" cy="53" r="6" fill="#6d4e35"/><circle cx="48" cy="53" r="6" fill="#6d4e35"/>'),Td=Fs('<path d="M18 10v44l36-22z" fill="#f3ffd0" stroke="#264e26" stroke-width="4" stroke-linejoin="round"/>'),a_=Fs('<path d="M14 25a20 20 0 1 1 0 17" stroke="#f3ffd0" stroke-width="6" stroke-linecap="round"/><path d="m10 10 2 18 17-5" stroke="#f3ffd0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M29 24v16l13-8z" fill="#f3ffd0"/>'),l_=Fs('<path d="M12 18h40M12 32h40M12 46h40" stroke="#e9f3e5" stroke-width="5" stroke-linecap="round"/><circle cx="24" cy="18" r="6" fill="#fbc562"/><circle cx="42" cy="32" r="6" fill="#fbc562"/><circle cx="24" cy="46" r="6" fill="#fbc562"/>'),c_=Fs('<path d="M8 29 32 9l24 20M14 27v29h36V27" stroke="#f4dfad" stroke-width="5" stroke-linejoin="round"/><path d="M24 56V35h16v21" fill="#243e36" stroke="#f4dfad" stroke-width="3"/><path d="m12 12 11 10m29-10L41 22" stroke="#ffad7a" stroke-width="4"/>');class h_{constructor(){this.volume=.5,this.ctx=null,this.gain=null}resume(){try{this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext),this.gain=this.ctx.createGain(),this.gain.connect(this.ctx.destination)),this.gain.gain.value=this.volume,this.ctx.resume()}catch{}}pause(){this.ctx&&(this.gain.gain.value=0,this.ctx.suspend().catch(()=>{}))}play(t){if(!this.ctx||this.ctx.state!=="running"||this.volume<=0)return;const e=this.ctx,n=e.currentTime,s=e.createOscillator(),r=e.createGain(),a={shot:[200,70,.065],tongue:[560,150,.11],hit:[110,45,.12],hitConfirm:[860,530,.07],storageAlert:[740,480,.3],stoneShot:[110,65,.2],stoneImpact:[75,35,.3],land:[95,50,.13],dizzy:[700,240,.28],ko:[80,330,.26],win:[400,800,.45],lost:[220,55,.4]}[t];a&&(s.type=t==="hit"?"triangle":"sine",s.frequency.setValueAtTime(a[0],n),s.frequency.exponentialRampToValueAtTime(a[1],n+a[2]),r.gain.setValueAtTime(1e-4,n),r.gain.exponentialRampToValueAtTime(.14,n+.008),r.gain.exponentialRampToValueAtTime(1e-4,n+a[2]),s.connect(r),r.connect(this.gain),s.start(n),s.stop(n+a[2]+.01),s.onended=()=>{s.disconnect(),r.disconnect()})}}class u_{constructor(){this.touch=matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>0,this.mouseControl=!this.touch,this.settings={volume:.5,quality:this.touch?"low":"high"};try{Object.assign(this.settings,JSON.parse(sc(Kr)||"{}"))}catch{}Object.assign(this.settings,Cf(this.settings),eh(this.settings)),delete this.settings.cameraAutoRotate,this.storageAlertUntil=-1/0,this.settings.volume=_a(Number(this.settings.volume)||0,0,1),["low","high"].includes(this.settings.quality)||(this.settings.quality="low");const t=sc(da);try{JSON.parse(t)?.version===1&&!sc(da+"-before-bases")&&dr(da+"-before-bases",t)}catch{}this.state=Qc(),this.saved=wM(t),this.running=!1,this.mode="title",this.keys=new Set,this.actions={fire:!1,kick:!1,sabotage:!1},this.aimStrength=0,this.move={x:0,z:0},this.aim={x:0,z:-1},this.mouse={x:0,y:0,valid:!1,inside:!1},this.pointers=new Map,this.pointerTypes=new Map,this.layoutEditing=!1,this.fx=[],this.particles=[],this.splats=[],this.tongues=new Map,this.bulletMeshes=new Map,this.koTimes=new Map,this.elapsed=0,this.shake=0,this.saveClock=0,this.accumulator=0,this.failures=[],this.hitConfirmUntil=0,this.lastPlayerHit=null,this.scene=new wm,this.scene.background=new ee("#9fe4ff"),this.scene.fog=new Fa("#baf0ea",.006),this.renderer=new Hy({antialias:!this.touch,powerPreference:"high-performance"}),this.renderer.domElement.id="arcade-world",this.renderer.domElement.setAttribute("aria-label","FROG — κωμική μάχη με μύγες"),this.renderer.outputColorSpace=Un,this.renderer.toneMapping=Cd,this.renderer.toneMappingExposure=1.3,document.body.append(this.renderer.domElement),this.camera=new kn(this.settings.cameraFov,innerWidth/innerHeight,.1,250),this.camera.position.set(0,8,15),this.focus=new en(0,2,3),this.cameraTarget=new en(0,8,15),this.viewMode="chase3d",this.cameraReady=!1,this.cameraYaw=is.yaw,this.cameraPitch=is.pitch,this.cameraDrag=null,this.autoFireTargetId=null,this.freeMousePoint=null,this.mouseFirePointer=null,this.lastMovement={x:0,z:0},this.stickAim={x:0,z:-1},this.mouseRay=new zl,this.mousePoint=new en,this.mouseNdc=new Wt,this.mousePlane=new pi(ic,0),this.scene.add(new Jm("#def8ff","#52733a",2.6)),this.sun=new ng("#fff1bf",3.2),this.sun.position.set(-16,36,12),this.scene.add(this.sun),this.world=S1(this.scene,this.renderer,{seed:731,natural:!0});for(const s of[...this.world.creekRefuges])this.world.removeShelter(s.mesh);const e=(s,r)=>this.world.getSurface(s,r).height;this.houseFloors=[...U1(e),...k1(e)];const n=this.world.group.getObjectByName("Fly swarms");n&&(n.visible=!1);for(const s of this.world.hotspots)s.flies=0;this.labels=document.createElement("canvas"),this.labels.id="arcade-labels",document.body.append(this.labels),this.labelCtx=this.labels.getContext("2d"),this.sound=new h_,this.sound.volume=this.settings.volume,this.shared={sphere:new jn(1,10,7),wing:new jn(1,6,4),cylinder:new Us(1,1,1,8),circle:new Oa(1,18)},this.materials={insect:new Ve({color:"#263f42",roughness:.8,metalness:0}),wing:new xn({color:"#edfcff",transparent:!0,opacity:.86,side:Ce,depthWrite:!1}),tongue:new Ve({color:"#ff839c",roughness:.4}),shot:new Ve({color:"#384b4d",emissive:"#a6c9bf",emissiveIntensity:.16}),ink:new xn({color:"#90e44c",transparent:!0,opacity:.9,depthWrite:!1,side:Ce}),rock:new Ve({color:"#617b70",roughness:.9}),rim:new xn({color:"#eaff9e",transparent:!0,opacity:.6,depthWrite:!1})},this.createArena(),this.models=[],this.buildActors(),this.createFlies(),this.artilleryView=new LM(this),this.basesView=new HM(this),this.impactEffects=new OM(this),this.createUI(),this.bindInputs(),this.applyQuality(),this.resize(),this.showTitle(),window.__FROG__={version:$l,mode:"arcade",inspect:()=>this.inspect(),save:()=>this.persist()},new URLSearchParams(location.search).has("test")&&(window.__FROG__.test={step:(s,r=1)=>{for(let o=0;o<r;o++)gd(this.state,s,1/60),this.consumeEvents();this.updateHUD()},state:()=>this.state,setState:s=>{this.state=s,this.buildActors(),this.updateHUD()},input:()=>this.currentInput(),kickTarget:()=>th(this.state,this.state.actors[0])?.id}),this.last=performance.now(),jM(this,{onChange:()=>dr(Kr,JSON.stringify(this.settings))}),i_(this,{onChange:()=>dr(Kr,JSON.stringify(this.settings))}),this.renderer.setAnimationLoop(s=>this.frame(s)),document.getElementById("boot")?.remove()}ground(t,e){return N1(t,e,this.houseFloors)??this.world.getSurface(t,e).height}cameraGround(t,e){return Math.max(this.ground(t,e),this.world.cameraSurfaceHeight(t,e))}createArena(){this.obstacleMeshes=[];for(const n of gs){const s=new Jt(new Ba(n.r,1),this.materials.rock);s.scale.y=1.7,s.position.set(n.x,this.ground(n.x,n.z)+n.r*.9,n.z),this.scene.add(s),this.obstacleMeshes.push(s)}const t=[];for(let n=0;n<=160;n++){const s=n/160*Math.PI*2,r=Math.sin(s)*Rt.radius,o=Math.cos(s)*Rt.radius;t.push(new en(r,this.ground(r,o)+.06,o))}const e=new go(new Se().setFromPoints(t),this.materials.rim);this.scene.add(e),this.playerRing=new Jt(new as(1.05,1.18,32),new xn({color:"#ecff9a",side:Ce,transparent:!0,opacity:.85,depthWrite:!1})),this.playerRing.rotation.x=-Math.PI/2,this.scene.add(this.playerRing),this.aimGuide=new go(new Se().setFromPoints([new en,new en]),new Qd({color:"#fff2b0",dashSize:.45,gapSize:.35,transparent:!0,opacity:.65})),this.scene.add(this.aimGuide),this.aimReticle=new Jt(new as(.35,.42,24),new xn({color:"#fff2b0",side:Ce,transparent:!0,opacity:.88,depthWrite:!1})),this.aimReticle.rotation.x=-Math.PI/2,this.scene.add(this.aimReticle),this.targetRing=new Jt(new as(1.32,1.44,32),new xn({color:"#ffb19c",side:Ce,transparent:!0,opacity:.9,depthWrite:!1})),this.targetRing.rotation.x=-Math.PI/2,this.targetRing.visible=!1,this.scene.add(this.targetRing),this.swarmRings=zr.map(n=>{const s=new Jt(new as(n.radius-.08,n.radius+.03,40),new xn({color:"#c8e0a3",side:Ce,transparent:!0,opacity:.22,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.set(n.x,this.ground(n.x,n.z)+.08,n.z),this.scene.add(s),s})}buildActors(){tM(this.state,{ground:(t,e)=>this.ground(t,e)});for(const t of this.models||[])t.dispose();this.models=this.state.actors.map((t,e)=>{const n=D1("frog",{seed:7+e*39,team:e===0?"player":`enemy${e}`,role:e===2?"bruiser":"hunter",tier:1,level:1});if(n.setEquipment({}),n.setOutline(e===0?"#e7fca7":e===1?"#ffae88":"#d3a8ff",!0),this.settings.quality==="low"&&n.setRenderLOD(1),n.mesh?.material){const s=n.mesh.material;s.bumpScale=0,s.roughness=.85,s.userData?.tint?.set(["#86da38","#ff694a","#bb70ed"][e])}return $M(n),this.scene.add(n.group),n})}createFlies(){const t=this.state.flies.length;this.flyBodies=new wn(this.shared.sphere,this.materials.insect,t),this.flyWings=new wn(this.shared.wing,this.materials.wing,t*2);for(const e of[this.flyBodies,this.flyWings])e.instanceMatrix.setUsage(Ui),e.frustumCulled=!1,this.scene.add(e);this.dummy=new qe}createUI(){this.ui=document.createElement("div"),this.ui.id="arcade-ui",this.ui.classList.toggle("is-touch",this.touch),this.ui.innerHTML=`<header id="arcade-hud" hidden><button class="view-button" id="view-button" aria-label="Αλλαγή σε κεντραρισμένη κάτοψη">ΠΙΣΩ 3D · C</button><div class="ammo-card">${rc}<div class="ammo-info"><div class="ammo-numbers"><strong id="ammo-count">0 / ${Rt.capacity}</strong><b id="ammo-percent">0%</b></div><div id="ammo-track" role="progressbar" aria-label="Γέμιση με μύγες" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="ammo-fill"></i></div><span id="ammo-state">Γέμισε στην αποθήκη σου</span></div></div><div class="ko-card base-card"><b id="ko-count">3 / 3</b><span>ΑΠΟΘΗΚΕΣ</span><div id="base-dots" aria-label="Άθικτες αποθήκες"><i data-owner="player"></i><i data-owner="rival-1"></i><i data-owner="rival-2"></i></div></div><button class="small-button" id="pause-button" aria-label="Παύση">Ⅱ</button></header>
  <div id="round-status" hidden><b id="round-time">20″</b><span id="round-copy">ΠΡΟΕΤΟΙΜΑΣΙΑ · Προστάτεψε την αποθήκη σου</span></div><div id="base-status" hidden><b id="base-warning-title" role="alert" aria-atomic="true"></b><span id="base-warning-detail"></span></div>
  <button id="catapult-button" class="touch-action catapult-button" aria-label="Χρήση κοντινού καταπέλτη" hidden>${Ed}<span>ΧΡΗΣΗ</span></button><div id="catapult-status" hidden></div>
  <button id="sabotage-button" class="touch-action sabotage-button" aria-label="Κράτησε για καταστροφή εχθρικής αποθήκης" hidden>${c_}<span>ΚΡΑΤΑ · 10″</span></button><div id="sabotage-status" hidden><span id="sabotage-copy"></span><div role="progressbar" aria-label="Καταστροφή αποθήκης" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="sabotage-track"><i id="sabotage-fill"></i></div></div>
  <canvas id="minimap" width="320" height="320" aria-label="Χάρτης: η βάση σου πράσινη, εχθρικές αποθήκες κόκκινη και μωβ, είσοδοι, καταπέλτες και σμήνη"></canvas><div id="dizzy-banner" hidden>🌀 ΖΑΛΙΣΤΗΚΕΣ! <b id="dizzy-time"></b></div><div id="callout" aria-live="polite"></div>
  <div id="desktop-help" hidden><span><b>WASD</b> Κίνηση</span><span><b>Ποντίκι</b> Θέα + στόχευση</span><span><b>Κλικ</b> Μύγες</span><span><b>E κράτημα</b> Αποθήκη</span><span><b>E</b> Καταπέλτης</span><span id="pc-kick"><b>Q</b> Κλωτσιά</span><span><b>Esc</b> Παύση</span></div>
  <div id="touch-controls" hidden><div class="stick-zone move-zone"><div id="move-stick" class="stick" aria-label="Κίνηση"><div class="stick-inner"></div><div class="stick-knob"></div></div><span class="stick-caption">ΑΛΜΑΤΑ</span></div><button id="kick-button" class="touch-action kick-button" aria-label="Αμυντική κλωτσιά για απώθηση κοντινού αντιπάλου" hidden disabled>${o_}<span>ΚΛΩΤΣΙΑ</span></button><button id="fire-button" class="touch-action fire-button" aria-label="Κράτησε για βολές μυγών ή σύρε για βολή και στόχευση">${rc}<span>ΠΥΡ</span></button><div class="stick-zone aim-zone"><div id="aim-stick" class="stick" aria-label="Θέα και στόχευση"><div class="fire-ring"></div><div class="stick-inner"></div><div class="stick-knob"></div><span class="aim-center" aria-hidden="true">+</span><div id="touch-aim-hint"><span id="auto-fire-status">ΧΕΙΡΟΚΙΝΗΤΗ</span></div></div><span id="touch-aim-copy" class="stick-caption">ΘΕΑ / ΣΤΟΧΕΥΣΗ</span></div><button id="layout-button" class="layout-button" aria-label="Μετακίνηση χειριστηρίων"><b aria-hidden="true">↔</b><span>ΘΕΣΕΙΣ</span></button><div id="layout-hint" hidden>Σύρε τα χειριστήρια στη θέση σου.</div></div>
  <section id="arcade-menu" class="menu"><div id="menu-main" class="menu-buttons"><div id="round-actions" class="round-actions" role="group" aria-label="Γύρος"><button id="new-round-button" class="round-action round-action-new" type="button">${a_}<span>ΝΕΟΣ ΓΥΡΟΣ</span></button><button id="play-button" class="round-action round-action-resume" type="button" disabled>${Td}<span>ΣΥΝΕΧΕΙΑ</span></button></div><button id="settings-button" class="art-button settings-button">${l_}<span>ΡΥΘΜΙΣΕΙΣ</span></button></div><div id="settings-panel" class="settings-panel" hidden><h2>Ρυθμίσεις</h2><div class="settings-grid"><label>Ήχος <input id="volume" type="range" min="0" max="100" value="${Math.round(this.settings.volume*100)}"></label><label>Γραφικά <select id="quality"><option value="low">Ομαλή κίνηση</option><option value="high">Υψηλά</option></select></label></div><div class="fire-settings"><label for="touch-fire-mode">Βολή στο κινητό<select id="touch-fire-mode" aria-describedby="touch-fire-mode-help"><option value="manual">Χειροκίνητη · ΠΥΡ</option><option value="auto">Αυτόματη · στόχευση</option></select></label><p id="touch-fire-mode-help"></p></div><div class="camera-settings-heading"><h3>Κάμερα</h3><button id="camera-reset" type="button">ΕΠΑΝΑΦΟΡΑ</button></div><div class="settings-grid camera-settings-grid"><label for="camera-zoom"><span>Zoom <output id="camera-zoom-value" for="camera-zoom">100%</output></span><input id="camera-zoom" type="range" min="70" max="150" step="5" value="100"></label><label for="camera-fov"><span>Οπτικό πεδίο <output id="camera-fov-value" for="camera-fov">52°</output></span><input id="camera-fov" type="range" min="40" max="80" step="1" value="52" aria-label="Οπτικό πεδίο FOV σε μοίρες"></label><label class="camera-sensitivity-label" for="camera-sensitivity"><span>Ευαισθησία <output id="camera-sensitivity-value" for="camera-sensitivity">100%</output></span><input id="camera-sensitivity" type="range" min="25" max="200" step="5" value="100" aria-label="Ευαισθησία ποντικιού και θέας"></label></div><button id="settings-back" class="art-button compact">ΠΙΣΩ</button></div><div id="result-panel" class="result-panel" hidden><span class="result-kicker">FROG • FLY FRENZY</span><h1 id="result-title"></h1><p id="result-copy"></p><button id="replay-button" class="art-button play-button">${Td}<span>ΠΑΙΞΕ ΞΑΝΑ</span></button><button id="result-settings" class="plain-button">Ρυθμίσεις</button></div><span class="version">FROG ${$l}</span></section>`,document.body.append(this.ui),this.$=t=>this.ui.querySelector("#"+t),this.$("quality").value=this.settings.quality,this.$("view-button").onclick=t=>this.toggleView(t),va(this.$("play-button"),t=>this.startOrResume(t)),va(this.$("pause-button"),()=>this.pause(),void 0,{allowSecondary:!0}),this.$("settings-button").onclick=()=>this.settingsMenu(),this.$("result-settings").onclick=()=>this.settingsMenu(),this.$("settings-back").onclick=()=>{this.$("arcade-menu").classList.remove("settings-open"),this.$("settings-panel").hidden=!0,this.mode==="result"?this.$("result-panel").hidden=!1:this.$("menu-main").hidden=!1},va(this.$("replay-button"),t=>this.startNew(t)),va(this.$("new-round-button"),t=>this.startNew(t)),this.$("volume").oninput=t=>{this.settings.volume=Number(t.target.value)/100,this.sound.volume=this.settings.volume,dr(Kr,JSON.stringify(this.settings))},this.$("quality").onchange=t=>{this.settings.quality=t.target.value,this.applyQuality(),dr(Kr,JSON.stringify(this.settings))},this.touchLayout=XM({root:this.$("touch-controls"),movePad:this.ui.querySelector(".move-zone"),aimPad:this.ui.querySelector(".aim-zone"),fireButton:this.$("fire-button"),toggleButton:this.$("layout-button"),storageKey:"frog-touch-layout-v1",onEditingChange:t=>{this.layoutEditing=t,this.clearInputs(),this.accumulator=0,t?this.sound.pause():this.running&&this.sound.resume()},announce:t=>this.message(t,2)})}showTitle(){this.running=!1,this.mode="title",this.updateRoundActions(),this.ui.classList.add("in-menu")}updateRoundActions(){this.$("play-button").disabled=!(this.mode==="pause"&&this.state.status==="playing"||this.saved?.status==="playing")}settingsMenu(){this.$("arcade-menu").classList.add("settings-open"),this.$("menu-main").hidden=!0,this.$("result-panel").hidden=!0,this.$("settings-panel").hidden=!1}startOrResume(t){if(!this.running){if(this.mode==="pause"&&this.state.status==="playing"){this.go(t);return}this.saved?.status==="playing"&&(this.state=this.saved,this.saved=null,this.resetCamera(),this.buildActors(),this.go(t))}}toggleView(t){this.stopCameraDrag(),this.actions.fire=!1,this.mouse.valid=!1,this.viewMode=this.viewMode==="chase3d"?"overview":"chase3d",this.$("view-button").textContent=this.viewMode==="chase3d"?"ΠΙΣΩ 3D · C":"ΚΑΤΟΨΗ · C",this.$("view-button").setAttribute("aria-label",this.viewMode==="chase3d"?"Αλλαγή σε κεντραρισμένη κάτοψη":"Αλλαγή σε κάμερα πίσω από τον βάτραχο"),this.cameraReady=!1,this.viewMode==="overview"?this.releaseMouseLook():(this.centerAim(),this.running&&(t?.pointerType==="mouse"||(this.mouseControl||t?.type==="keydown")&&!["touch","pen"].includes(t?.pointerType))&&this.requestMouseLook())}startNew(t){this.running||(this.storageAlertUntil=-1/0,this.saved=null,this.state=Qc(731+Math.floor(Math.random()*1e5)),this.resetCamera(),this.clearEffects(),this.buildActors(),this.go(t),this.message("60 μύγες έτοιμες!",1.6))}resetCamera(){const t=this.state.actors[0],e=EM(t);this.cameraYaw=Math.atan2(e.x,e.z),this.cameraPitch=is.pitch,this.cameraReady=!1,this.mouse.valid=!1,this.aim={x:t.aimX,z:t.aimZ},this.stopCameraDrag()}beginCameraDrag(t){if(this.cameraDrag)return;this.mouseControl=!1,this.viewMode==="overview"?this.captureMouseAim(t):this.centerAim(),this.cameraDrag={id:t.pointerId,type:t.pointerType,x:t.clientX,y:t.clientY};const e=this.renderer.domElement;e.setPointerCapture(t.pointerId),e.classList.add("camera-dragging")}stopCameraDrag(){const t=this.cameraDrag;this.cameraDrag=null,this.autoFireTargetId=null;const e=this.renderer?.domElement;t&&e?.hasPointerCapture?.(t.id)&&e.releasePointerCapture(t.id),e?.classList.remove("camera-dragging")}go(t){t?.pointerType==="touch"||t?.pointerType==="pen"?this.mouseControl=!1:t?.pointerType==="mouse"&&(this.mouseControl=!0),this.$("arcade-menu").classList.remove("settings-open"),this.clearInputs(),this.mouseControl&&Number.isFinite(t?.clientX)&&Number.isFinite(t?.clientY)&&(this.freeMousePoint={x:t.clientX,y:t.clientY}),this.accumulator=0,this.last=performance.now(),this.running=!0,this.mode="play",this.$("arcade-menu").hidden=!0,this.$("settings-panel").hidden=!0,this.$("result-panel").hidden=!0,this.$("menu-main").hidden=!1,this.$("arcade-hud").hidden=!1,this.$("desktop-help").hidden=this.touch,this.$("touch-controls").hidden=!this.touch,this.ui.classList.remove("in-menu"),this.sound.resume(),this.updateHUD(),this.touchLayout?.refresh(),this.persist(),this.viewMode==="chase3d"&&(this.centerAim(),this.mouseControl&&this.requestMouseLook())}pause(){this.running&&(this.touchLayout?.setEditing(!1),this.running=!1,this.mode="pause",this.clearInputs(),this.releaseMouseLook(),this.persist(),this.sound.pause(),this.$("arcade-menu").hidden=!1,this.$("menu-main").hidden=!1,this.$("settings-panel").hidden=!0,this.updateRoundActions(),this.ui.classList.add("in-menu"))}finish(){this.touchLayout?.setEditing(!1),this.running=!1,this.mode="finishing",this.resultAt=this.elapsed+.85,this.clearInputs(),this.releaseMouseLook(),this.persist()}showResult(){this.running=!1,this.mode="result",this.clearInputs(),this.persist();const t=this.state.status==="won";this.sound.play(t?"win":"lost"),this.$("arcade-menu").hidden=!1,this.$("menu-main").hidden=!0,this.$("result-panel").hidden=!1,this.$("result-title").textContent=t?"Η ΤΕΛΕΥΤΑΙΑ ΑΠΟΘΗΚΗ ΕΙΝΑΙ ΔΙΚΗ ΣΟΥ!":"Η ΑΠΟΘΗΚΗ ΣΟΥ ΚΑΤΑΣΤΡΑΦΗΚΕ",this.$("result-copy").textContent=t?`${this.state.stats.kos} νοκ άουτ · ${this.state.stats.shots} βολές · ${Math.floor(this.state.time)}″ μάχης`:"Κράτησε την είσοδο, διέκοψε τους εισβολείς με μία εύστοχη βολή και ανεφοδιάσου πριν ξαναβγείς.",this.ui.classList.add("in-menu")}persist(){return this.mode==="title"?!1:dr(da,SM(this.state))}clearInputs(){if(this.lastMovement={x:0,z:0},this.freeMousePoint=null,this.stopMouseFireCapture(),this.renderer?.domElement.classList.remove("mouse-aiming"),this.currentAimPreview=null,this.currentAimScreen=null,this.aimGuide&&(this.aimGuide.visible=!1),this.aimReticle&&(this.aimReticle.visible=!1),this.targetRing&&(this.targetRing.visible=!1),this.keys.clear(),this.actions={fire:!1,kick:!1,sabotage:!1},this.aimStrength=0,this.mouse.valid=!1,this.mouse.inside=!1,this.move={x:0,z:0},this.pointers.clear(),this.pointerTypes.clear(),this.stopCameraDrag(),this.ui){for(const t of this.ui.querySelectorAll(".stick-knob"))t.style.transform="translate(-50%,-50%)";this.$("aim-stick").classList.remove("firing"),this.$("fire-button")?.classList.remove("firing")}}pointerLocked(){return document.pointerLockElement===this.renderer.domElement}requestMouseLook(){this.mouseControl=!0,this.mouseLookSession?.request()}releaseMouseLook(){this.mouseLookSession?.release()}stopMouseFireCapture(){const t=this.mouseFirePointer;this.mouseFirePointer=null;const e=this.renderer?.domElement;t!=null&&e?.hasPointerCapture?.(t)&&e.releasePointerCapture(t)}turnFreeMouse(t){const e={x:t.clientX,y:t.clientY};if(!Number.isFinite(e.x)||!Number.isFinite(e.y))return;const n=this.freeMousePoint;this.freeMousePoint=e,n&&this.turnLook(e.x-n.x,e.y-n.y)}centerAim(){this.mouse.x=this.w/2,this.mouse.y=this.h/2,this.mouse.valid=!0}turnLook(t,e,n=!1){if(!this.running||this.layoutEditing||this.viewMode!=="chase3d")return;const s=vd({yaw:this.cameraYaw,pitch:this.cameraPitch},t,e,{sensitivity:di.sensitivity*this.settings.cameraSensitivity*(n?1.6:1)});this.cameraYaw=s.yaw,this.cameraPitch=s.pitch,this.centerAim()}bindInputs(){addEventListener("keydown",s=>{if(!s.target.matches("input,select")){if(s.code==="Escape"){if(s.preventDefault(),this.layoutEditing){this.touchLayout.setEditing(!1);return}this.running&&this.pause();return}if(!(!this.running||this.layoutEditing)){if(s.code==="KeyC"&&!s.repeat){s.preventDefault(),this.toggleView(s);return}(r_.has(s.code)||["KeyQ","KeyE"].includes(s.code))&&(s.preventDefault(),this.keys.add(s.code))}}}),addEventListener("keyup",s=>this.keys.delete(s.code));const t=this.renderer.domElement;this.mouseLookSession=KM({canvas:t,active:()=>this.running&&!this.layoutEditing&&this.viewMode==="chase3d",onLock:()=>{this.stopMouseFireCapture(),this.freeMousePoint=null,this.centerAim()},onUnexpectedUnlock:()=>{this.actions.fire=!1,this.pause()}}),t.addEventListener("pointermove",s=>{if(!(!this.running||this.layoutEditing)){if(s.pointerType==="mouse"){this.pointerLocked()?this.turnLook(s.movementX,s.movementY):this.viewMode==="overview"?this.captureMouseAim(s):this.turnFreeMouse(s);return}this.cameraDrag?.id===s.pointerId&&(s.preventDefault(),this.viewMode==="overview"?this.captureMouseAim(s):this.turnLook(s.clientX-this.cameraDrag.x,s.clientY-this.cameraDrag.y,!0),this.cameraDrag.x=s.clientX,this.cameraDrag.y=s.clientY)}}),t.addEventListener("pointerdown",s=>{if(!(!this.running||this.layoutEditing)){if(s.preventDefault(),s.pointerType==="touch"||s.pointerType==="pen"){this.beginCameraDrag(s);return}s.button===0&&(this.viewMode==="chase3d"?(this.centerAim(),this.pointerLocked()||(this.freeMousePoint={x:s.clientX,y:s.clientY},this.mouseFirePointer=s.pointerId,t.setPointerCapture(s.pointerId),this.requestMouseLook())):this.captureMouseAim(s),this.actions.fire=!0)}}),addEventListener("pointerup",s=>{this.cameraDrag?.id===s.pointerId&&this.stopCameraDrag(),s.pointerType==="mouse"&&s.button===0&&(this.actions.fire=!1,this.stopMouseFireCapture())}),t.addEventListener("pointercancel",s=>{this.cameraDrag?.id===s.pointerId&&this.stopCameraDrag(),this.stopMouseFireCapture(),this.actions.fire=!1,this.freeMousePoint=null}),t.addEventListener("pointerenter",s=>{s.pointerType==="mouse"&&!this.pointerLocked()&&(this.freeMousePoint={x:s.clientX,y:s.clientY})}),t.addEventListener("pointerleave",s=>{s.pointerType==="mouse"&&(this.freeMousePoint=null,this.viewMode==="overview"&&!s.buttons&&(this.mouse.valid=!1,t.classList.remove("mouse-aiming")))}),t.addEventListener("lostpointercapture",s=>{this.cameraDrag?.id===s.pointerId&&this.stopCameraDrag()}),t.addEventListener("contextmenu",s=>s.preventDefault());const e=(s,r)=>{const o=this.$(s),a=o.querySelector(".stick-knob");let l=null;const c=u=>{const d=o.getBoundingClientRect(),f=(u.clientX-d.left-d.width/2)/(d.width/2),m=(u.clientY-d.top-d.height/2)/(d.height/2),p=fM(f,m),x=Math.hypot(f,m),g=x>1?1/x:1;a.style.transform=`translate(-50%,-50%) translate(${f*g*d.width*.31}px,${m*g*d.height*.31}px)`,r==="move"?this.move={x:p.x,z:p.z}:(this.aimStrength=Math.min(1,x),x>.08&&(this.stickAim={x:f/x,z:m/x})),this.viewMode==="chase3d"?this.centerAim():r==="aim"&&(this.mouse.valid=!1)};o.onpointerdown=u=>{!this.running||this.layoutEditing||o.closest("[hidden]")||l!==null&&this.pointers.has(r)||(u.preventDefault(),l=u.pointerId,this.pointers.set(r,l),this.pointerTypes.set(r,u.pointerType),o.setPointerCapture(u.pointerId),c(u))},o.onpointermove=u=>{!this.layoutEditing&&l===u.pointerId&&this.pointers.get(r)===l&&(u.preventDefault(),c(u))};const h=u=>{u.pointerId===l&&(l=null,this.pointers.delete(r),this.pointerTypes.delete(r),a.style.transform="translate(-50%,-50%)",r==="move"?this.move={x:0,z:0}:(this.aimStrength=0,this.autoFireTargetId=null,o.classList.remove("firing")))};o.onpointerup=h,o.onpointercancel=h,o.onlostpointercapture=h};e("move-stick","move"),e("aim-stick","aim");const n=(s,r)=>{const o=this.$(s);let a=null,l=null;o.onpointerdown=h=>{!this.running||this.layoutEditing||o.disabled||o.closest("[hidden]")||(h.preventDefault(),a=h.pointerId,l={x:h.clientX,y:h.clientY},o.setPointerCapture(h.pointerId),this.viewMode==="chase3d"&&this.centerAim(),this.actions[r]=!0)},o.onpointermove=h=>{r!=="fire"||a!==h.pointerId||!["touch","pen"].includes(h.pointerType)||!this.actions.fire||(this.turnLook(h.clientX-l.x,h.clientY-l.y,!0),l={x:h.clientX,y:h.clientY})};const c=h=>{h.pointerId===a&&(a=null,l=null,this.actions[r]=!1)};o.onpointerup=c,o.onpointercancel=c,o.onlostpointercapture=c};n("kick-button","kick"),n("fire-button","fire"),n("sabotage-button","sabotage"),addEventListener("blur",()=>{this.clearInputs(),this.running&&this.pause()}),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.clearInputs(),this.pause(),this.sound.pause())}),addEventListener("beforeunload",()=>this.persist()),addEventListener("resize",()=>{this.clearInputs(),this.resize()})}applyQuality(){const t=this.settings.quality==="low";this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,t?1:1.5));for(const e of this.models)e.setRenderLOD(t?1:0);this.resize()}resize(){const t=innerWidth,e=innerHeight;this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.cameraReady=!1,this.labels.width=t,this.labels.height=e,this.w=t,this.h=e,this.touchLayout?.refresh()}captureMouseAim(t){this.mouse.x=t.clientX,this.mouse.y=t.clientY,this.mouse.valid=!0,this.mouse.inside=!0,this.updateMouseTarget()}movementInput(){return this.lastMovement=pa(this.move.x+(this.keys.has("KeyD")||this.keys.has("ArrowRight")?1:0)-(this.keys.has("KeyA")||this.keys.has("ArrowLeft")?1:0),this.move.z+(this.keys.has("KeyS")||this.keys.has("ArrowDown")?1:0)-(this.keys.has("KeyW")||this.keys.has("ArrowUp")?1:0),this.camera.position,this.focus),this.lastMovement}updateMouseTarget(){if(this.viewMode==="chase3d"&&this.centerAim(),!this.mouse.valid){this.mouse.targetId=null;return}const t=this.state.actors[0];if(this.mouseNdc.set(this.mouse.x/this.w*2-1,1-this.mouse.y/this.h*2),this.mouseRay.setFromCamera(this.mouseNdc,this.camera),t.catapultId){if(this.mousePlane.constant=-this.ground(t.x,t.z)-.9,this.mouseRay.ray.intersectPlane(this.mousePlane,this.mousePoint))this.mouse.target={x:this.mousePoint.x,y:this.mousePoint.y,z:this.mousePoint.z};else{const u=this.mouseRay.ray.direction,d=Math.hypot(u.x,u.z),f=pa(0,-1,this.camera.position,this.focus);this.mouse.target={x:t.x+(d>1e-6?u.x/d:f.x)*Pe.maxRange,y:this.ground(t.x,t.z),z:t.z+(d>1e-6?u.z/d:f.z)*Pe.maxRange}}this.mouse.direction=null,this.mouse.targetId=null;return}const e=vo(this.state,t),n=this.mouseRay.ray,s=s_,r=e.x-n.origin.x,o=e.y-n.origin.y,a=e.z-n.origin.z,l=Math.max(0,r*n.direction.x+o*n.direction.y+a*n.direction.z),c=_f(this.state,n.origin,n.direction,Math.hypot(r,o,a)+s,{ignoreId:t.id,solidFrom:l}),h=JM({rayOrigin:n.origin,rayDirection:n.direction,muzzle:e,range:s,hits:c?[c]:[]});this.mouse.target=h.target,this.mouse.direction=h.direction,this.mouse.distance=h.distance,this.mouse.targetId=c?.targetId??null}autoFireTargetVisible(t,e){return e_(this,t,e)}aimFromScreen(t,e){const n=this.state.actors[0],s=this.ground(n.x,n.z)+.9,r=this.project(n.x,s,n.z),o=Math.min(this.w,this.h)*.34,a=new en,l=new zl;if(l.setFromCamera(new Wt((r.x+t*o)/this.w*2-1,1-(r.y+e*o)/this.h*2),this.camera),l.ray.intersectPlane(new pi(ic,-s),a)){const c=a.x-n.x,h=a.z-n.z,u=Math.hypot(c,h);if(u>.05&&Number.isFinite(u))return{x:c/u,z:h/u,distance:u}}return pa(t,e,this.camera.position,this.focus)}currentInput(){if(this.layoutEditing)return this.autoFireTargetId=null,{};const t=this.state.actors[0],e=this.pointers.has("aim"),n=e&&this.aimStrength>.08,s=this.viewMode==="chase3d"||this.actions.fire||e||this.mouse.valid;if(e&&this.viewMode==="overview"&&(this.mouse.valid=!1,(n||!t.catapultId)&&(this.aim={...pa(this.stickAim.x,this.stickAim.z,this.camera.position,this.focus),distance:14})),this.updateMouseTarget(),this.mouse.valid&&s&&this.mouse.target)if(!t.catapultId&&this.mouse.direction)this.aim={...this.mouse.direction,distance:this.mouse.distance};else{const o=this.mouse.target.x-t.x,a=this.mouse.target.z-t.z,l=Math.hypot(o,a);l>.1&&(this.aim={x:o/l,z:a/l,distance:l})}const r=this.movementInput();return{mx:r.x,mz:r.z,ax:this.aim.x,ay:this.aim.y,az:this.aim.z,aiming:s,fire:this.actions.fire,kick:this.actions.kick||this.keys.has("KeyQ"),sabotage:!t.catapultId&&(this.actions.sabotage||this.keys.has("KeyE"))}}installAutoFire(){const t=this.currentInput.bind(this);this.currentInput=()=>{const e=t(),n=this.cameraDrag?.type==="touch"||this.cameraDrag?.type==="pen",s=this.pointers.has("aim")&&["touch","pen"].includes(this.pointerTypes.get("aim")),r=this.viewMode==="overview"&&s,o=n||s,a=QM({state:this.state,actor:this.state.actors[0],input:e,active:this.running&&!this.layoutEditing&&this.settings.touchFireMode==="auto",aiming:o&&(r||!!this.mouse.targetId)});return this.autoFireTargetId=a.fire&&this.autoFireTargetVisible(a.targetId,{directional:r})?a.targetId:null,this.autoFireTargetId&&(e.fire=!0),e}}message(t,e=1.5){this.$("callout").textContent=t,this.calloutUntil=this.elapsed+e}makeFlyBullet(){const t=new te,e=new Jt(this.shared.sphere,this.materials.shot);e.scale.set(.12,.1,.19),t.add(e);for(const n of[-1,1]){const s=new Jt(this.shared.wing,this.materials.wing);s.position.set(n*.13,.07,0),s.scale.set(.17,.018,.09),t.add(s)}return this.scene.add(t),t}consumeEvents(){for(const t of this.state.events){this.artilleryView?.consumeEvent(t);const e=this.state.actors.findIndex(r=>r.id===t.id),n=this.state.actors[e],s=this.models[e];if(t.type==="tongue"&&n){const r=this.tongues.get(n.id);r&&this.scene.remove(r.mesh);const o=new Jt(this.shared.cylinder,this.materials.tongue);this.scene.add(o),this.tongues.set(n.id,{mesh:o,start:this.elapsed,x:t.x,z:t.z})}if(t.type==="shot"&&n?.id==="player"&&this.sound.play("shot"),t.type==="hit"&&s){s.mesh.material.emissive?.set("#ffffff");const r=s.group.rotation.y,o=Math.cos(r),a=Math.sin(r);s.setImpact({x:o*t.dx-a*t.dz,z:a*t.dx+o*t.dz,strength:1.3,duration:n.knockUp>0?.42:.27}),this.impactEffects.hit({...t,height:Number.isFinite(t.y)?t.y:this.ground(t.x,t.z)+n.height+.75,heavy:n.knockUp>0}),this.shake=Math.max(this.shake,n.id==="player"?.16:.025),t.owner==="player"&&n.id!=="player"?(this.hitConfirmUntil=this.elapsed+.2,this.lastPlayerHit={id:n.id,x:t.x,y:t.y,z:t.z,time:this.elapsed},this.sound.play("hitConfirm")):n.id==="player"&&this.sound.play("hit")}if(t.type==="dizzy"&&(this.addText("ΖΑΛΗ!",n.x,n.z,"#ffe375",1),this.sound.play("dizzy"),n.id!=="player"&&this.message("ΖΑΛΙΣΤΗΚΕ! ΣΥΝΕΧΙΣΕ ΤΙΣ ΕΥΣΤΟΧΕΣ ΒΟΛΕΣ.",2)),t.type==="ko"&&(this.koTimes.set(n.id,{time:this.elapsed,dx:t.dx,dz:t.dz}),this.addText("ΝΟΚ ΑΟΥΤ!",n.x,n.z,"#ffe791",1.4),this.sound.play("ko"),this.shake=.32,this.makeSplat({...t,wall:!1})),t.type==="respawn"&&(this.koTimes.delete(t.id),t.id==="player"&&(this.clearInputs(),this.resetCamera(),this.message("Επέστρεψες με 60 μύγες!",2))),t.type==="sabotageStart"&&(t.id==="player"?this.elapsed>=this.storageAlertUntil&&(this.sound.play("storageAlert"),this.storageAlertUntil=this.elapsed+3):t.by==="player"&&this.message("Κράτα μέχρι το τέλος · οι βολές εναντίον σου διακόπτουν.",2)),t.type==="sabotageInterrupted"&&t.by==="player"&&this.message(t.reason==="hit"?"Σε χτύπησαν! Η καταστροφή διακόπηκε.":"Η καταστροφή διακόπηκε.",1.5),t.type==="baseDestroyed"){const r=Wn.find(o=>o.id===t.baseId);r&&this.addText("ΑΠΟΘΗΚΗ ΚΑΤΑΣΤΡΑΦΗΚΕ",r.stock.x,r.stock.z,"#ffc689",2),this.sound.play("stoneImpact"),this.shake=.2}t.type==="splat"&&this.makeSplat(t),t.type==="stoneShot"&&this.sound.play("stoneShot"),t.type==="land"&&t.stone&&(this.impactEffects.landing(t),Math.hypot(t.x-this.state.actors[0].x,t.z-this.state.actors[0].z)<10&&this.sound.play("land")),t.type==="stoneImpact"&&(this.sound.play("stoneImpact"),this.impactEffects.stone(t),Math.hypot(t.x-this.state.actors[0].x,t.z-this.state.actors[0].z)<7&&(this.shake=Math.max(this.shake,.16))),t.type==="battle"&&this.message("ΜΑΧΗ!",1.2)}}addText(t,e,n,s,r){this.fx.push({text:t,x:e,z:n,color:s,life:r,start:this.elapsed}),this.fx.length>28&&this.fx.shift()}burst(t,e){for(let n=0;n<9;n++){const s=new Jt(this.shared.sphere,this.materials.shot);s.scale.setScalar(.06+Math.random()*.07),s.position.set(t,this.ground(t,e)+1,e),this.scene.add(s),this.particles.push({mesh:s,start:this.elapsed,v:new en((Math.random()-.5)*6,2+Math.random()*4,(Math.random()-.5)*6)})}for(;this.particles.length>90;)this.particles.shift().mesh.removeFromParent()}makeSplat(t){const e=[];for(let l=0;l<20;l++){const c=l/20*6.283,h=(l+1)/20*6.283,u=.4+l%3*.14,d=.4+(l+1)%3*.14;e.push(0,0,0,Math.cos(c)*u,Math.sin(c)*u,0,Math.cos(h)*d,Math.sin(h)*d,0)}const s=new Se;s.setAttribute("position",new Vt(e,3));const r=this.materials.ink.clone();r.color.set(["#d2ed4d","#f5bf52","#c6ef78"][this.splats.length%3]);const o=new Jt(s,r),a=this.ground(t.x,t.z);if(t.normal&&Number.isFinite(t.y)&&(t.wall||t.kind==="terrain")){const l=new en(t.normal.x,t.normal.y,t.normal.z).normalize();o.position.set(t.x,t.y,t.z).addScaledVector(l,.025-ln.radius),o.quaternion.setFromUnitVectors(new en(0,0,1),l)}else if(t.wall){const l=new en(t.dx,t.dy||0,t.dz).normalize(),c=new en(t.x,Number.isFinite(t.y)?t.y:a+.9,t.z).addScaledVector(l,-1.5);for(const u of this.obstacleMeshes)u.updateMatrixWorld();const h=new zl(c,l,0,5).intersectObjects(this.obstacleMeshes,!1)[0];if(h){const u=h.face.normal.clone().transformDirection(h.object.matrixWorld);o.position.copy(h.point).addScaledVector(u,.025),o.quaternion.setFromUnitVectors(new en(0,0,1),u)}else o.position.set(t.x,a+.05,t.z),o.rotation.x=-Math.PI/2}else o.position.set(t.x,a+.045,t.z),o.rotation.x=-Math.PI/2;if(this.scene.add(o),this.splats.push({mesh:o,start:this.elapsed}),this.splats.length>90){const l=this.splats.shift();l.mesh.removeFromParent(),l.mesh.geometry.dispose(),l.mesh.material.dispose()}}clearEffects(){this.impactEffects?.clear();for(const t of this.particles)t.mesh.removeFromParent();this.particles=[];for(const t of this.splats)t.mesh.removeFromParent(),t.mesh.geometry.dispose(),t.mesh.material.dispose();this.splats=[];for(const t of this.bulletMeshes.values())t.removeFromParent();this.bulletMeshes.clear();for(const t of this.tongues.values())t.mesh.removeFromParent();this.tongues.clear(),this.fx=[],this.koTimes.clear()}updateHUD(){const t=this.state.actors[0],e=Math.round(t.ammo/Rt.capacity*100),n=th(this.state,t),s=Ns(this.state,t),r=this.state.bases.filter(T=>!T.destroyed).length,o=Wn.find(T=>T.owner===t.id)?.stock,a=s&&!s.destroyed&&o&&Math.hypot(t.x-o.x,t.z-o.z)<=Rt.pickupRange&&ks(t,o),l=$a(t)&&t.revealedTime<=0,c=Ya(this.state,t),h=this.state.bases.find(T=>!T.destroyed&&T.attackerId===t.id),u=this.$("sabotage-button");u.hidden=!this.running||this.layoutEditing||this.state.phase!=="battle"||t.ko||t.catapultId||!c,u.disabled=t.dizzyTime>0||t.knockUp>0||t.hit>0||t.sabotageRecovery>0,u.querySelector("span").textContent=h?`${Math.max(0,Rt.sabotageSeconds-h.progress).toFixed(1)}″`:this.touch?"ΚΡΑΤΑ · 10″":"ΚΡΑΤΑ E · 10″",this.$("sabotage-status").hidden=!this.running||!h;const d=h?h.progress/Rt.sabotageSeconds:0;this.$("sabotage-copy").textContent="ΚΑΤΑΣΤΡΟΦΗ ΑΠΟΘΗΚΗΣ",this.$("sabotage-fill").style.transform=`scaleX(${d})`,this.$("sabotage-track").setAttribute("aria-valuenow",String(Math.round(d*100)));const f=this.state.catapults?.find(T=>T.id===t.catapultId),m=mf(this.state,t),p=this.$("catapult-button");p.hidden=!this.running||t.ko||!f&&(!m||this.state.phase!=="battle"),p.disabled=t.dizzyTime>0||t.knockUp>0,p.querySelector("span").textContent=f?"ΕΞΟΔΟΣ":"ΧΡΗΣΗ",p.setAttribute("aria-label",f?"Έξοδος από τον καταπέλτη":"Χρήση κοντινού καταπέλτη"),p.classList.toggle("ready",!!f),this.$("catapult-status").hidden=!f||!this.running||this.layoutEditing,this.$("catapult-status").textContent=f?f.cooldown>0?`ΦΟΡΤΩΝΕΙ ΠΕΤΡΑ · ${f.cooldown.toFixed(1)}″`:this.touch?"ΣΗΜΑΔΕΨΕ · ΠΑΤΑ ΠΕΤΡΑ":"ΠΕΤΡΑ ΕΤΟΙΜΗ · ΑΡΙΣΤΕΡΟ ΚΛΙΚ":"",this.$("aim-stick").classList.toggle("catapult",!!f),this.$("aim-stick").setAttribute("aria-label",f?"Στόχευση καταπέλτη":"Θέα και στόχευση"),this.ui.querySelector(".move-zone").classList.toggle("mounted",!!f),this.lastMounted!==!!f&&(this.lastMounted=!!f,this.actions.fire=!1,this.pointers.delete("aim"),this.pointerTypes.delete("aim"),this.aimStrength=0,this.$("aim-stick").querySelector(".stick-knob").style.transform="translate(-50%,-50%)",this.$("fire-button").innerHTML=(f?Ed:rc)+`<span>${f?"ΠΕΤΡΑ":"ΠΥΡ"}</span>`,this.$("fire-button").setAttribute("aria-label",f?"Πάτησε για βολή πέτρας από τον καταπέλτη":"Κράτησε για βολές μυγών ή σύρε για βολή και στόχευση")),this.ui.querySelector(".aim-zone").hidden=!1,this.$("fire-button").hidden=!1,this.$("fire-button").disabled=!this.layoutEditing&&(t.ko||t.dizzyTime>0||t.knockUp>0),this.$("fire-button").classList.toggle("firing",this.actions.fire),this.$("fire-button").classList.toggle("empty",f?f.cooldown>0:t.ammo===0);const x=this.$("touch-aim-hint");x.hidden=!this.running||this.layoutEditing||!!f,x.classList.toggle("firing",!!this.autoFireTargetId),this.$("aim-stick").classList.toggle("firing",!!this.autoFireTargetId),this.$("touch-aim-copy").textContent=f?"ΚΑΤΕΥΘΥΝΣΗ · ΙΣΧΥΣ":this.viewMode==="overview"?"ΣΤΟΧΕΥΣΗ":"ΘΕΑ / ΣΤΟΧΕΥΣΗ",this.$("auto-fire-status").textContent=this.settings.touchFireMode==="manual"?"ΧΕΙΡΟΚΙΝΗΤΗ":this.autoFireTargetId?"ΑΥΤΟΜΑΤΗ · ΒΟΛΗ":"ΑΥΤΟΜΑΤΗ",this.$("ammo-count").textContent=`${t.ammo} / ${Rt.capacity}`,this.$("ammo-percent").textContent=e+"%",this.$("ammo-fill").style.transform=`scaleX(${e/100})`,this.$("ammo-track").setAttribute("aria-valuenow",String(e)),this.$("ammo-state").textContent=t.ko?"Επιστρέφεις στην αποθήκη":t.ammo===Rt.capacity?"ΓΕΜΑΤΟΣ!":a?"ΑΠΟΘΗΚΗ ∞ · ΓΕΜΙΖΕΙ…":t.tongue>0?"ΜΑΖΕΥΕΙ ΜΥΓΕΣ…":t.ammo===0?"Γύρνα στην αποθήκη ή βρες σμήνος":"Μύγες για τις επόμενες βολές",this.$("ko-count").textContent=`${r} / 3`;for(const T of this.$("base-dots").children){const w=this.state.bases.find(R=>R.owner===T.dataset.owner);T.classList.toggle("destroyed",!!w?.destroyed),T.classList.toggle("attacked",!!w?.attackerId),T.title=(T.dataset.owner==="player"?"Η αποθήκη σου":T.dataset.owner==="rival-1"?"Κόκκινη αποθήκη":"Μωβ αποθήκη")+(w?.destroyed?" · κατεστραμμένη":w?.attackerId?" · υπό επίθεση":" · άθικτη")}this.$("round-status").hidden=!this.running||!this.layoutEditing&&!t.ko&&this.state.phase==="battle",this.$("round-status").classList.toggle("warmup",this.state.phase!=="battle"),this.$("round-time").textContent=this.layoutEditing?"↔":t.ko?`${Math.ceil(t.respawnTime||0)}″`:this.state.phase!=="battle"?`${Math.ceil(this.state.intro)}″`:`${r}`,this.$("round-copy").textContent=this.layoutEditing?this.touch?"ΡΥΘΜΙΣΗ ΘΕΣΕΩΝ":"ΡΥΘΜΙΣΗ ΘΕΣΕΩΝ · Το παιχνίδι περιμένει":t.ko?this.touch?"ΕΠΙΣΤΡΟΦΗ":"ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΒΑΣΗ":this.state.phase!=="battle"?this.touch?"ΠΡΟΕΤΟΙΜΑΣΙΑ":"ΠΡΟΕΤΟΙΜΑΣΙΑ · Προστάτεψε την αποθήκη σου":"";const g=!!s?.attackerId&&!s.destroyed,M=this.running&&!this.layoutEditing&&g;this.ui.classList.toggle("storage-threat",M),this.$("base-status").hidden=!this.running||this.layoutEditing||!g&&!l,this.$("base-status").classList.toggle("threat",g);const y=g?"ΕΠΙΘΕΣΗ ΣΤΗΝ ΑΠΟΘΗΚΗ ΣΟΥ":l?"ΚΡΥΜΜΕΝΟΣ ΣΤΑ ΔΕΝΤΡΑ":"";this.$("base-warning-title").textContent!==y&&(this.$("base-warning-title").textContent=y),this.$("base-warning-detail").textContent=g?`${Math.max(0,Rt.sabotageSeconds-s.progress).toFixed(1)}″ μέχρι καταστροφή · Χτύπησέ τον!`:l?"Πιο αργά άλματα":"";const v=!t.ko&&!!n&&this.state.phase==="battle"&&!t.catapultId&&t.dizzyTime<=0&&t.knockUp<=0&&t.kick<=0&&(t.kickCooldown||0)<=0;this.$("kick-button").hidden=!this.running||t.ko||this.state.phase!=="battle"||!!t.catapultId||!n&&t.kick<=0,this.$("kick-button").disabled=!v,this.$("kick-button").classList.toggle("ready",v),this.$("pc-kick").classList.toggle("ready",v),this.$("dizzy-banner").hidden=t.dizzyTime<=0,this.$("dizzy-time").textContent=t.dizzyTime.toFixed(1)+"″",this.$("aim-stick").classList.toggle("empty",f?f.cooldown>0:t.ammo===0),this.calloutUntil<this.elapsed&&(this.$("callout").textContent="");const E=["round-status","base-status","catapult-button","catapult-status","kick-button","sabotage-button","sabotage-status","fire-button"].map(T=>this.$(T).hidden?0:1).join("");this.touch&&!this.layoutEditing&&this.running&&E!==this.contextLayout&&(this.contextLayout=E,this.touchLayout?.refresh())}renderActors(t){this.state.actors.forEach((l,c)=>{const h=this.models[c];if(h.group.visible=!l.eliminated,l.eliminated)return;const u=this.ground(l.x,l.z);let d=l.x,f=l.z,m=u+l.height+(l.catapultId?.45:0);const p=this.koTimes.get(l.id),x=p?this.elapsed-p.time:99;x<.65&&(d+=p.dx*x*5,f+=p.dz*x*5,m+=Math.sin(x/.65*Math.PI)*2.5),h.group.position.set(d,m,f);const g=l.aiming||l.shot>.02||l.kick>0,M=g?Math.hypot(l.aimX,l.aimZ)>.001?Math.atan2(l.aimX,l.aimZ):h.group.rotation.y:l.face;let y=Math.atan2(Math.sin(M-h.group.rotation.y),Math.cos(M-h.group.rotation.y));h.group.rotation.y+=y*(1-Math.exp(-t*22)),h.update(t,{time:this.elapsed,speed:Math.hypot(l.hopX,l.hopZ),building:!!l.sabotageId,hop:l.knockUp>0?{phase:"air",progress:1-l.knockUp/l.knockUpDuration}:l.hop>0?{phase:"air",progress:1-l.hop/Rt.hopDuration}:l.idle>0?{phase:"land",progress:1-l.idle/Rt.landingDuration}:{phase:"idle",progress:0},dead:l.ko,attack:l.kick>0?{type:"kick",phase:1-l.kick/(Rt.kickDuration||.48)}:l.tongue>0||l.shot>0?{type:"tongue",phase:l.tongue>0?1-l.tongue/.22:1-l.shot/Rt.shotInterval}:null});const v=l.load,E=l.shot>0?Math.sin((1-l.shot/Rt.shotInterval)*Math.PI):0;if(YM(h,{load:v,spit:E}),g&&!l.ko&&!l.catapultId){const T=_a(Math.atan2(l.aimY||0,Math.hypot(l.aimX,l.aimZ)),-.5,1.1);h.bones.head.rotation.x-=T*.7,h.bones.spine.rotation.x-=T*.12}if(l.hop>0){const T=Math.atan2(l.hopX,l.hopZ)-h.group.rotation.y,w=Math.min(1,Math.hypot(l.hopX,l.hopZ)/8.8)*Math.sin((1-l.hop/Rt.hopDuration)*Math.PI);h.bones.spine.rotation.z-=Math.sin(T)*w*.1;for(const R of[-1,1])h.bones[`hip${R}`].rotation.z-=Math.sin(T)*w*.14}if(l.dizzyTime>0?(h.group.rotation.z=Math.sin(this.elapsed*7)*.17,h.bones.head.rotation.z+=Math.sin(this.elapsed*9)*.2):h.group.rotation.z=x<.65?x*6:0,h.group.rotation.x=0,l.knockUp>0){const T=1-l.knockUp/l.knockUpDuration,w=Math.sin(T*Math.PI)*.38,R=Math.atan2(l.impulseX,l.impulseZ)-h.group.rotation.y;h.group.rotation.x=Math.cos(R)*w,h.group.rotation.z-=Math.sin(R)*w}c===0&&this.viewMode==="chase3d"&&!l.ko&&Math.hypot(this.camera.position.x-d,this.camera.position.z-f)<1.35&&this.camera.position.y<m+1.3&&(h.group.visible=!1)});const e=this.state.actors[0];this.playerRing.position.set(e.x,this.ground(e.x,e.z)+.07,e.z),this.playerRing.scale.setScalar(1);const n=PM(this.state,e),s=this.aimGuide.geometry.attributes.position,r=n.origin||vo(this.state,e);s.setXYZ(0,r.x,r.y,r.z),s.setXYZ(1,n.x,n.y,n.z),s.needsUpdate=!0,this.aimGuide.computeLineDistances(),this.aimGuide.geometry.computeBoundingSphere();const o=this.running&&!this.layoutEditing&&!e.catapultId&&!e.ko&&e.dizzyTime<=0&&(e.aiming||e.shot>0);this.renderer.domElement.classList.toggle("mouse-aiming",o&&(this.pointerLocked()||this.viewMode==="overview"&&this.mouse.valid)),this.currentAimPreview=o?n:null,this.aimGuide.visible=o,this.aimGuide.material.color.set(this.autoFireTargetId?"#dfff85":n.targetId?"#ffc09b":n.blocked?"#b9c0b5":"#f4f7d5"),this.aimReticle.visible=o,this.aimReticle.position.set(n.x,n.y,n.z),this.aimReticle.quaternion.copy(this.camera.quaternion),this.aimReticle.scale.setScalar(.5),this.aimReticle.material.color.copy(this.aimGuide.material.color);const a=this.state.actors.find(l=>l.id===n.targetId);this.targetRing.visible=o&&!!a,a&&(this.targetRing.position.set(a.x,this.ground(a.x,a.z)+.1,a.z),this.targetRing.scale.setScalar(1+a.load*.2))}renderFlies(){this.state.flies.forEach((e,n)=>{const s=this.dummy,r=e.wait<=0,o=this.ground(e.x,e.z)+1.05+Math.sin(this.elapsed*5+e.phase)*.12,a=e.x+Math.sin(this.elapsed*3+e.phase)*.12;s.position.set(a,r?o:-100,e.z),s.scale.set(r?.105:0,r?.08:0,r?.14:0),s.rotation.set(0,e.phase,0),s.updateMatrix(),this.flyBodies.setMatrixAt(n,s.matrix);for(let l=0;l<2;l++)s.position.set(a+(l===0?-.1:.1),r?o+.045:-100,e.z),s.scale.set(r?.17:0,r?.015:0,r?.08:0),s.rotation.set(0,e.phase,Math.sin(this.elapsed*55+e.phase)*(l===0?1:-1)*.5),s.updateMatrix(),this.flyWings.setMatrixAt(n*2+l,s.matrix)}),this.flyBodies.instanceMatrix.needsUpdate=!0,this.flyWings.instanceMatrix.needsUpdate=!0,zr.forEach((e,n)=>{const s=this.state.flies.filter(o=>o.swarmId===e.id&&o.wait<=0).length,r=this.swarmRings[n];r.material.opacity=s?.2:.09,r.material.color.set(s?"#c8e0a3":"#6f8c83")});const t=new Set;for(const e of this.state.bullets){t.add(e.id);let n=this.bulletMeshes.get(e.id);n||(n=this.makeFlyBullet(),this.bulletMeshes.set(e.id,n)),n.position.set(e.x,Number.isFinite(e.y)?e.y:this.ground(e.x,e.z)+.9,e.z),n.quaternion.setFromUnitVectors(new en(0,0,1),new en(e.dx,e.dy||0,e.dz).normalize()),n.children[1].rotation.z=Math.sin(this.elapsed*75),n.children[2].rotation.z=-Math.sin(this.elapsed*75)}for(const[e,n]of this.bulletMeshes)t.has(e)||(n.removeFromParent(),this.bulletMeshes.delete(e));for(const[e,n]of this.tongues){n.mesh.visible=e!=="player"||this.models[0].group.visible;const s=(this.elapsed-n.start)/.22;if(s>=1){n.mesh.removeFromParent(),this.tongues.delete(e);continue}const r=this.state.actors.findIndex(u=>u.id===e),o=this.models[r],a=o.mouthWorld(),l=new en(n.x,this.ground(n.x,n.z)+1,n.z),c=Math.sin(s*Math.PI);l.lerpVectors(a,l,c);const h=l.clone().sub(a);n.mesh.position.copy(a).addScaledVector(h,.5),n.mesh.quaternion.setFromUnitVectors(ic,h.clone().normalize()),n.mesh.scale.set(.07,Math.max(.001,h.length()),.07)}}project(t,e,n){const s=new en(t,e,n).project(this.camera);return{x:(s.x+1)*this.w/2,y:(1-s.y)*this.h/2,visible:s.z>-1&&s.z<1}}drawLabels(){const t=this.labelCtx;if(t.clearRect(0,0,this.w,this.h),t.textAlign="center",t.lineJoin="round",t.font="800 18px sans-serif",this.running&&(CM(this,t),RM(this,this.$("minimap"))),this.currentAimScreen=null,this.currentAimPreview){const e=this.currentAimPreview,n=this.mouse.valid?{x:this.mouse.x,y:this.mouse.y,visible:!0}:this.project(e.x,e.y,e.z);if(this.currentAimScreen={x:n.x,y:n.y},n.visible&&n.x>4&&n.x<this.w-4&&n.y>4&&n.y<this.h-4){t.save(),t.lineWidth=4,t.strokeStyle="#173c35",t.beginPath(),t.arc(n.x,n.y,7,0,Math.PI*2),t.stroke(),t.lineWidth=2,t.strokeStyle=this.autoFireTargetId?"#dfff85":e.targetId?"#ffc5a0":"#f4ffdd",t.beginPath(),t.arc(n.x,n.y,7,0,Math.PI*2);for(const[s,r]of[[1,0],[-1,0],[0,1],[0,-1]])t.moveTo(n.x+s*10,n.y+r*10),t.lineTo(n.x+s*16,n.y+r*16);t.stroke(),t.restore()}}if(this.hitConfirmUntil>this.elapsed&&this.lastPlayerHit){const e=this.lastPlayerHit,n=this.state.actors.find(r=>r.id===e.id),s=this.project(e.x,Number.isFinite(e.y)?e.y:this.ground(e.x,e.z)+(n?.height||0)+1.2,e.z);if(s.visible){t.save(),t.strokeStyle="#143d35",t.lineWidth=6,t.beginPath();for(const[r,o]of[[1,1],[-1,1],[1,-1],[-1,-1]])t.moveTo(s.x+r*6,s.y+o*6),t.lineTo(s.x+r*15,s.y+o*15);t.stroke(),t.strokeStyle="#fffce2",t.lineWidth=3,t.stroke(),t.restore()}}if(this.state.actors.forEach((e,n)=>{if(e.eliminated)return;const s=this.project(e.x,this.ground(e.x,e.z)+e.height+2.4,e.z);if(!s.visible)return;if(!(s.x>20&&s.x<this.w-20&&s.y>70&&s.y<this.h-40)&&n>0&&!e.ko&&this.running){const o=_a(s.x,24,this.w-24),a=_a(s.y,110,this.h-(this.touch?210:90));t.font="bold 24px sans-serif",t.fillStyle=n===1?"#ffbb8e":"#dfb5ff",t.fillText("▼",o,a);return}if(e.ko){t.font="900 20px sans-serif",t.strokeStyle="#1e2e28",t.lineWidth=5;const o=`KO · ${Math.ceil(e.respawnTime||0)}″`;t.strokeText(o,s.x,s.y),t.fillStyle="#ffe374",t.fillText(o,s.x,s.y);return}if(e.dizzyTime>0){for(let o=0;o<3;o++){const a=this.elapsed*4+o*2.094;t.font="bold 25px sans-serif",t.fillStyle="#ffdf57",t.strokeStyle="#725c21",t.lineWidth=3;const l=s.x+Math.cos(a)*27,c=s.y+Math.sin(a)*7;t.strokeText("★",l,c),t.fillText("★",l,c)}t.font="bold 15px sans-serif",t.fillStyle="#fff4ad",t.fillText(e.dizzyTime.toFixed(1)+"″",s.x,s.y+24);for(let o=0;o<Rt.finishHits;o++)t.beginPath(),t.arc(s.x+(o-(Rt.finishHits-1)/2)*11,s.y+36,4,0,Math.PI*2),t.fillStyle=o<e.finishHits?"#ffb58e":"#244438",t.fill(),t.strokeStyle="#ffe6ac",t.lineWidth=1.5,t.stroke()}else if(n>0){e.aimWindup>0&&(t.font="900 22px sans-serif",t.fillStyle="#ffddaa",t.fillText("!",s.x,s.y-40));const o=n===1?"ΚΟΚΚΙΝΟΣ":"ΜΩΒ",a=n===1?"#ff886a":"#dba1ff";t.fillStyle="#112b27dd",t.strokeStyle=a,t.lineWidth=3,t.beginPath(),t.roundRect?t.roundRect(s.x-52,s.y-28,104,24,10):t.rect(s.x-52,s.y-28,104,24),t.fill(),t.stroke(),t.font="bold 15px sans-serif",t.fillStyle=a,t.fillText(o,s.x,s.y-11);for(let l=0;l<6;l++)t.beginPath(),t.arc(s.x+(l-2.5)*9,s.y+6,3.8,0,Math.PI*2),t.fillStyle=l<e.dizzy?"#ffe16a":"#214036bb",t.fill()}}),this.running){const e=this.state.actors[0];for(const n of this.state.bases){const s=Wn.find(l=>l.id===n.id),r=Math.hypot(e.x-s.stock.x,e.z-s.stock.z)<10;if(n.destroyed||!r&&!n.attackerId)continue;const o=this.project(s.stock.x,this.ground(s.stock.x,s.stock.z)+3.5,s.stock.z);if(!o.visible||o.x<70||o.x>this.w-70||o.y<95||o.y>this.h-(this.touch?220:85))continue;const a=n.attackerId?`ΚΑΤΑΣΤΡΟΦΗ · ${Math.max(0,Rt.sabotageSeconds-n.progress).toFixed(1)}″`:n.owner==="player"?"Η ΑΠΟΘΗΚΗ ΣΟΥ · ∞":"ΕΧΘΡΙΚΗ ΑΠΟΘΗΚΗ";t.font="800 12px sans-serif",t.strokeStyle="#14342df2",t.lineWidth=5,t.strokeText(a,o.x,o.y),t.fillStyle=n.attackerId?"#ffd197":n.owner==="player"?"#dbff9d":"#ffbdad",t.fillText(a,o.x,o.y)}}this.fx=this.fx.filter(e=>this.elapsed-e.start<e.life);for(const e of this.fx){const n=(this.elapsed-e.start)/e.life,s=this.project(e.x,this.ground(e.x,e.z)+2+n*2,e.z);t.globalAlpha=1-n,t.font=`900 ${e.text==="ΝΟΚ ΑΟΥΤ!"?32:22}px sans-serif`,t.strokeStyle="#244136",t.lineWidth=6,t.strokeText(e.text,s.x,s.y),t.fillStyle=e.color,t.fillText(e.text,s.x,s.y)}t.globalAlpha=1}updateCameraPose(t){const e=this.state.actors[0],n=Ef(e,this.ground(e.x,e.z),this.w/this.h,this.viewMode,{yaw:this.cameraYaw,pitch:this.cameraPitch,zoom:this.settings.cameraZoom}),s=new en(...n.look),r=new en(...n.position);this.cameraReady?this.focus.lerp(s,1-Math.exp(-t*8)):(this.focus.copy(s),this.cameraReady=!0),this.cameraTarget.copy(this.focus).add(r.sub(s));const o=TM({look:this.focus.toArray(),position:this.cameraTarget.toArray()},(l,c)=>this.cameraGround(l,c));this.focus.fromArray(o.look),this.cameraTarget.fromArray(o.position);const a=this.running?this.shake:0;this.camera.position.copy(this.cameraTarget),this.camera.position.x+=(Math.random()-.5)*a,this.camera.lookAt(this.focus),this.camera.updateMatrixWorld()}frame(t){const e=Math.min(.05,Math.max(0,(t-this.last)/1e3));this.last=t;const n=this.state.actors[0],s=this.running&&!this.layoutEditing;if(s&&this.viewMode==="chase3d"&&this.pointers.has("aim")&&this.aimStrength>.08){const r=(this.aimStrength-.08)/.92,o=vd({yaw:this.cameraYaw,pitch:this.cameraPitch},this.stickAim.x*r*e,this.stickAim.z*r*e,{sensitivity:2.2*this.settings.cameraSensitivity});this.cameraYaw=o.yaw,this.cameraPitch=o.pitch}if(this.shake*=Math.exp(-e*15),this.updateCameraPose(e),s){for(this.elapsed+=e,this.accumulator+=e;this.accumulator>=1/60;)if(gd(this.state,this.currentInput(),1/60),this.consumeEvents(),this.accumulator-=1/60,this.state.status!=="playing"){this.finish();break}this.saveClock+=e,this.saveClock>3&&(this.saveClock=0,this.persist())}else(this.mode==="result"||this.mode==="finishing")&&(this.elapsed+=e);if(this.mode==="finishing"&&this.elapsed>=this.resultAt&&this.showResult(),this.cameraReady||this.updateCameraPose(0),this.running||this.mode==="title"||this.mode==="result"||this.mode==="finishing"){const r=this.mode==="title"||this.layoutEditing?0:e;this.renderActors(r),this.renderFlies(),this.updateCatapultAim?.(),this.artilleryView.update(r),this.basesView.update(r),this.impactEffects.update(r),this.world.update(this.running&&!this.layoutEditing?e:0,this.elapsed,1,new en(n.x,this.ground(n.x,n.z),n.z))}(this.running&&!this.layoutEditing||this.mode==="finishing"||this.mode==="result")&&(this.particles=this.particles.filter(r=>this.elapsed-r.start>.55?(r.mesh.removeFromParent(),!1):(r.v.y-=e*16,r.mesh.position.addScaledVector(r.v,e),!0))),this.renderer.render(this.scene,this.camera),this.drawLabels(),this.updateHUD()}inspect(){return{version:$l,viewMode:this.viewMode,cameraControl:"direct-look",touchFireMode:this.settings.touchFireMode,autoFireTargetId:this.autoFireTargetId,pointerLocked:this.pointerLocked(),cameraSensitivity:this.settings.cameraSensitivity,mouse:{x:this.mouse.x,y:this.mouse.y,valid:this.mouse.valid},aim:{...this.aim},aimScreen:this.currentAimScreen,cameraYaw:this.cameraYaw,cameraPitch:this.cameraPitch,cameraDragging:!!this.cameraDrag,phase:this.state.phase,intro:this.state.intro,mode:this.mode,status:this.state.status,ammo:this.state.actors[0].ammo,fillPercent:Math.round(this.state.actors[0].ammo/Rt.capacity*100),actors:this.state.actors.map(t=>({id:t.id,x:t.x,z:t.z,ammo:t.ammo,dizzy:t.dizzy,dizzyTime:t.dizzyTime,ko:t.ko,eliminated:t.eliminated,respawnTime:t.respawnTime,sabotageId:t.sabotageId,aiming:t.aiming,aimX:t.aimX,aimY:t.aimY,aimZ:t.aimZ,face:t.face,hop:t.hop,hopX:t.hopX,hopZ:t.hopZ,height:t.height,knockUp:t.knockUp,finishHits:t.finishHits,kickCooldown:t.kickCooldown,catapultId:t.catapultId})),bases:this.state.bases.map(t=>({...t})),layoutEditing:this.layoutEditing,touch:this.touch,catapults:this.state.catapults?.map(t=>({id:t.id,occupant:t.occupant,cooldown:t.cooldown})),shells:this.state.shells?.length,hitConfirmUntil:this.hitConfirmUntil,bullets:this.state.bullets.length,splats:this.splats.length,legacySavePreserved:!0}}}function d_(i){const t={fire:!1,kick:!1},e=r=>{i.running&&!i.layoutEditing&&(t[r]=!0)},n=i.currentInput.bind(i),s=i.clearInputs.bind(i);i.currentInput=()=>{const r=n();for(const o of Object.keys(t))i.layoutEditing||(r[o]||=t[o]),t[o]=!1;return i.layoutEditing||(r.aiming||=r.fire),r},i.clearInputs=()=>{for(const r of Object.keys(t))t[r]=!1;s()},addEventListener("keydown",r=>{r.repeat||r.target.matches("input,select")||r.code==="KeyQ"&&e("kick")},!0),addEventListener("pointerdown",r=>{r.target.closest?.("#kick-button")&&!i.$("kick-button").disabled?e("kick"):(r.target===i.renderer.domElement&&r.pointerType==="mouse"&&r.button===0||r.target.closest?.("#fire-button")&&!i.$("fire-button").disabled)&&e("fire")},!0),addEventListener("pointercancel",()=>{for(const r of Object.keys(t))t[r]=!1},!0)}function f_(i,t=()=>performance.now()){const e=i.$("view-button");let n=-1/0;e.onpointerdown=s=>{s.pointerType!=="touch"||!i.running||(s.preventDefault(),n=t(),i.toggleView(s))},e.onclick=s=>{i.running&&(s.detail===0||t()-n>600)&&i.toggleView(s)}}function p_(i){i.catapultAim={active:!1,target:null};let t=!1,e=!1;const n=()=>!!i.state.actors[0].catapultId;i.updateCatapultAim=()=>{if(!n()){i.catapultAim={active:!1,target:null};return}const l=i.state.actors[0];if(i.mouse.valid&&i.mouse.target){const u=i.mouse.target.x-l.x,d=i.mouse.target.z-l.z,f=Math.hypot(u,d);f>.01&&(i.aim={x:u/f,z:d/f,distance:f})}const c=i.aim||{x:l.aimX,z:l.aimZ},h=i.touch&&!i.mouse.valid?Math.max(0,Math.min(1,(i.aimStrength-.08)/.92)):Math.max(0,Math.min(1,((c.distance||17)-Pe.minRange)/(Pe.maxRange-Pe.minRange)));i.catapultAim={active:!0,target:Y1(l,c.x,c.z,h)}};const s=i.currentInput.bind(i),r=i.clearInputs.bind(i);i.currentInput=()=>{const l=s();if(i.layoutEditing)return t=!1,e=!1,{};const c=l.fire&&!e;return e=!!l.fire,n()&&(i.updateCatapultAim(),l.fire=!1,l.aiming=!0,l.ax=i.aim.x,l.az=i.aim.z,l.ay=void 0,l.sabotage=!1,c&&i.catapultAim.target?.valid!==!1&&(l.throwStone={...i.catapultAim.target})),t&&(l.interactCatapult=!0,t=!1),l},i.clearInputs=()=>{t=!1,e=!1,i.catapultAim={active:!1,target:null},r()};const o=i.$("catapult-button");o.onpointerdown=l=>{!i.running||i.layoutEditing||o.disabled||!n()&&i.state.phase!=="battle"||(l.preventDefault(),t=!0)},o.onclick=l=>{l.detail===0&&i.running&&!i.layoutEditing&&!o.disabled&&(t=!0)},addEventListener("keydown",l=>{l.code!=="KeyE"||l.repeat||l.target.matches("input,select")||!i.running||i.layoutEditing||!n()&&i.state.phase!=="battle"||!n()&&Ya(i.state,i.state.actors[0])||(l.preventDefault(),t=!0)});const a=i.$("aim-stick");a.addEventListener("pointerdown",()=>{n()&&i.updateCatapultAim()}),a.addEventListener("pointermove",()=>{n()&&i.pointers.has("aim")&&i.updateCatapultAim()})}const m_='input,select,textarea,[contenteditable]:not([contenteditable="false"])',g_=new Set(["+","=","-","_","0"]),x_=new Set(["Equal","Minus","Digit0","NumpadAdd","NumpadSubtract","Numpad0"]);function v_({document:i=globalThis.document,surfaces:t,enabled:e=()=>!0}={}){const n=t??[...i.querySelectorAll("#arcade-world,#arcade-labels,#arcade-ui")],s=[],r=new Set;let o=!1;const a=v=>v?.nodeType===3?v.parentElement:v,l=v=>a(v)?.closest?.(m_),c=v=>{const E=a(v)?.closest?.("#settings-panel");if(!E||E.hidden||E.closest("[hidden]")||E.getClientRects&&E.getClientRects().length===0)return null;const T=i.defaultView?.getComputedStyle?.(E);return T?.display==="none"||T?.visibility==="hidden"||T?.visibility==="collapse"?null:E},h=v=>!!v?.nodeType&&!l(v)&&n.some(E=>E&&(E===v||E.contains?.(v))),u=v=>{const E=v.composedPath?.()||[];return E.length?E:[v.target]},d=v=>{const E=u(v);return!E.some(l)&&E.some(h)},f=v=>{v.cancelable&&v.preventDefault()},m=(v,E,T=!1)=>{const w={capture:!0,passive:T};i.addEventListener(v,E,w),s.push([v,E,w])},p=()=>{r.clear(),o=!1},x=()=>e()?!0:(p(),!1),g=v=>r.size>0||d(v)||Array.from(v.touches||[]).some(E=>h(E.target)),M=v=>v.touches?.length===1&&r.size<=1&&!!c(v.touches[0].target);m("touchstart",v=>{if(x()){for(const E of v.changedTouches||[])h(E.target)&&r.add(E.identifier);v.touches?.length>1&&g(v)&&f(v)}}),m("touchmove",v=>{x()&&g(v)&&!M(v)&&f(v)});const y=v=>{for(const E of v.changedTouches||[])r.delete(E.identifier);v.touches?.length||r.clear()};m("touchend",y,!0),m("touchcancel",y,!0);for(const v of["gesturestart","gesturechange","gestureend"])m(v,E=>{x()&&(v==="gesturestart"&&(o=g(E)),(o||g(E))&&f(E),v==="gestureend"&&(o=!1))});m("wheel",v=>{!x()||!d(v)||!v.ctrlKey&&!v.metaKey&&u(v).some(c)||f(v)});for(const v of["dblclick","selectstart","contextmenu","dragstart"])m(v,E=>{x()&&d(E)&&f(E)});return m("keydown",v=>{if(!x()||!(v.ctrlKey||v.metaKey)||v.altKey||!g_.has(v.key)&&!x_.has(v.code)||u(v).some(l))return;const E=[i,i.body,i.documentElement].includes(v.target);(d(v)||n.length&&E)&&f(v)}),m("visibilitychange",()=>{i.hidden&&p()},!0),()=>{for(const[v,E,T]of s)i.removeEventListener(v,E,T);s.length=0,p()}}function Lh(i){console.error(i);let t=document.getElementById("boot");if(!t){t=document.createElement("div"),t.id="boot";const n=document.createElement("div");n.id="boot-error",t.append(n),document.body.append(t)}t.classList.add("has-error");const e=document.getElementById("boot-error");e.textContent=`Δεν μπόρεσε να ξεκινήσει ο 3D κόσμος. Ενεργοποίησε την επιτάχυνση γραφικών στον browser και κάνε ανανέωση.
`+(i?.message||String(i))}addEventListener("error",i=>Lh(i.error||i.message));addEventListener("unhandledrejection",i=>Lh(i.reason));requestAnimationFrame(()=>{try{const i=window.frogArcade=new u_;d_(i),f_(i),p_(i),i.installAutoFire(),v_({surfaces:[i.renderer.domElement,i.labels,i.ui]})}catch(i){Lh(i)}});
