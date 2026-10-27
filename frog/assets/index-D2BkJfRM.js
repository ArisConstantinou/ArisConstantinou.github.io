(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Qc="180",Xf=0,Gh=1,qf=2,Sd=1,$f=2,Di=3,Hi=0,In=1,Ce=2,ls=0,yr=1,Vh=2,Wh=3,Xh=4,Yf=5,As=100,Zf=101,jf=102,Kf=103,Jf=104,Qf=200,tp=201,ep=202,np=203,ic=204,sc=205,ip=206,sp=207,rp=208,op=209,ap=210,lp=211,cp=212,hp=213,up=214,rc=0,oc=1,ac=2,wr=3,lc=4,cc=5,hc=6,uc=7,wd=0,dp=1,fp=2,cs=0,pp=1,mp=2,gp=3,Ed=4,xp=5,vp=6,yp=7,qh="attached",Mp="detached",Td=300,Er=301,Tr=302,dc=303,fc=304,Ua=306,Ar=1e3,rs=1001,pc=1002,Vn=1003,_p=1004,Co=1005,ri=1006,Ja=1007,os=1008,vi=1009,Ad=1010,Rd=1011,ao=1012,th=1013,zs=1014,oi=1015,vo=1016,eh=1017,nh=1018,lo=1020,Cd=35902,Pd=35899,zd=1021,Id=1022,Gn=1023,co=1026,ho=1027,ih=1028,sh=1029,Dd=1030,rh=1031,oh=1033,Ma=33776,_a=33777,ba=33778,Sa=33779,mc=35840,gc=35841,xc=35842,vc=35843,yc=36196,Mc=37492,_c=37496,bc=37808,Sc=37809,wc=37810,Ec=37811,Tc=37812,Ac=37813,Rc=37814,Cc=37815,Pc=37816,zc=37817,Ic=37818,Dc=37819,Lc=37820,Uc=37821,kc=36492,Nc=36494,Fc=36495,Oc=36283,Bc=36284,Hc=36285,Gc=36286,bp=3200,Sp=3201,ah=0,wp=1,Li="",Un="srgb",Rr="srgb-linear",Ta="linear",Ge="srgb",Xs=7680,$h=519,Ep=512,Tp=513,Ap=514,Ld=515,Rp=516,Cp=517,Pp=518,zp=519,Yh=35044,Ui=35048,Zh="300 es",gi=2e3,Aa=2001;class zr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let jh=1234567;const to=Math.PI/180,uo=180/Math.PI;function Ls(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bn[i&255]+bn[i>>8&255]+bn[i>>16&255]+bn[i>>24&255]+"-"+bn[t&255]+bn[t>>8&255]+"-"+bn[t>>16&15|64]+bn[t>>24&255]+"-"+bn[e&63|128]+bn[e>>8&255]+"-"+bn[e>>16&255]+bn[e>>24&255]+bn[n&255]+bn[n>>8&255]+bn[n>>16&255]+bn[n>>24&255]).toLowerCase()}function be(i,t,e){return Math.max(t,Math.min(e,i))}function lh(i,t){return(i%t+t)%t}function Ip(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Dp(i,t,e){return i!==t?(e-i)/(t-i):0}function eo(i,t,e){return(1-e)*i+e*t}function Lp(i,t,e,n){return eo(i,t,1-Math.exp(-e*n))}function Up(i,t=1){return t-Math.abs(lh(i,t*2)-t)}function kp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Np(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Fp(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Op(i,t){return i+Math.random()*(t-i)}function Bp(i){return i*(.5-Math.random())}function Hp(i){i!==void 0&&(jh=i);let t=jh+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Gp(i){return i*to}function Vp(i){return i*uo}function Wp(i){return(i&i-1)===0&&i!==0}function Xp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function qp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function $p(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*d,a*c);break;case"YZY":i.set(l*d,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*d,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function dr(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function An(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Vc={DEG2RAD:to,RAD2DEG:uo,generateUUID:Ls,clamp:be,euclideanModulo:lh,mapLinear:Ip,inverseLerp:Dp,lerp:eo,damp:Lp,pingpong:Up,smoothstep:kp,smootherstep:Np,randInt:Fp,randFloat:Op,randFloatSpread:Bp,seededRandom:Hp,degToRad:Gp,radToDeg:Vp,isPowerOfTwo:Wp,ceilPowerOfTwo:Xp,floorPowerOfTwo:qp,setQuaternionFromProperEuler:$p,normalize:An,denormalize:dr};class Wt{constructor(t=0,e=0){Wt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=be(this.x,t.x,e.x),this.y=be(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=be(this.x,t,e),this.y=be(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(be(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class hs{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],m=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=m;return}if(u!==m||l!==d||c!==f||h!==g){let x=1-a;const p=l*d+c*f+h*g+u*m,v=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const R=Math.sqrt(y),E=Math.atan2(R,p*v);x=Math.sin(x*E)/R,a=Math.sin(a*E)/R}const M=a*v;if(l=l*x+d*M,c=c*x+f*M,h=h*x+g*M,u=u*x+m*M,x===1-a){const R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-a*f,t[e+2]=c*g+h*f+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(be(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,n=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Kh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Kh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=be(this.x,t.x,e.x),this.y=be(this.y,t.y,e.y),this.z=be(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=be(this.x,t,e),this.y=be(this.y,t,e),this.z=be(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(be(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Qa.copy(this).projectOnVector(t),this.sub(Qa)}reflect(t){return this.sub(Qa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Qa=new L,Kh=new hs;class ve{constructor(t,e,n,s,r,o,a,l,c){ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],m=s[0],x=s[3],p=s[6],v=s[1],y=s[4],M=s[7],R=s[2],E=s[5],w=s[8];return r[0]=o*m+a*v+l*R,r[3]=o*x+a*y+l*E,r[6]=o*p+a*M+l*w,r[1]=c*m+h*v+u*R,r[4]=c*x+h*y+u*E,r[7]=c*p+h*M+u*w,r[2]=d*m+f*v+g*R,r[5]=d*x+f*y+g*E,r[8]=d*p+f*M+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/g;return t[0]=u*m,t[1]=(s*c-h*n)*m,t[2]=(a*n-s*o)*m,t[3]=d*m,t[4]=(h*e-s*l)*m,t[5]=(s*r-a*e)*m,t[6]=f*m,t[7]=(n*l-c*e)*m,t[8]=(o*e-n*r)*m,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(tl.makeScale(t,e)),this}rotate(t){return this.premultiply(tl.makeRotation(-t)),this}translate(t,e){return this.premultiply(tl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const tl=new ve;function Ud(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ra(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Yp(){const i=Ra("canvas");return i.style.display="block",i}const Jh={};function fo(i){i in Jh||(Jh[i]=!0,console.warn(i))}function Zp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Qh=new ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tu=new ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jp(){const i={enabled:!0,workingColorSpace:Rr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ge&&(s.r=Oi(s.r),s.g=Oi(s.g),s.b=Oi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ge&&(s.r=Mr(s.r),s.g=Mr(s.g),s.b=Mr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Li?Ta:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return fo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return fo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Rr]:{primaries:t,whitePoint:n,transfer:Ta,toXYZ:Qh,fromXYZ:tu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Un},outputColorSpaceConfig:{drawingBufferColorSpace:Un}},[Un]:{primaries:t,whitePoint:n,transfer:Ge,toXYZ:Qh,fromXYZ:tu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Un}}}),i}const ke=jp();function Oi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Mr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let qs;class Kp{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{qs===void 0&&(qs=Ra("canvas")),qs.width=t.width,qs.height=t.height;const s=qs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=qs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ra("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Oi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Oi(e[n]/255)*255):e[n]=Oi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Jp=0;class ch{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jp++}),this.uuid=Ls(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(el(s[o].image)):r.push(el(s[o]))}else r=el(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function el(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Kp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Qp=0;const nl=new L;class En extends zr{constructor(t=En.DEFAULT_IMAGE,e=En.DEFAULT_MAPPING,n=rs,s=rs,r=ri,o=os,a=Gn,l=vi,c=En.DEFAULT_ANISOTROPY,h=Li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qp++}),this.uuid=Ls(),this.name="",this.source=new ch(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Wt(0,0),this.repeat=new Wt(1,1),this.center=new Wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(nl).x}get height(){return this.source.getSize(nl).y}get depth(){return this.source.getSize(nl).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Td)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ar:t.x=t.x-Math.floor(t.x);break;case rs:t.x=t.x<0?0:1;break;case pc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ar:t.y=t.y-Math.floor(t.y);break;case rs:t.y=t.y<0?0:1;break;case pc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}En.DEFAULT_IMAGE=null;En.DEFAULT_MAPPING=Td;En.DEFAULT_ANISOTROPY=1;class Le{constructor(t=0,e=0,n=0,s=1){Le.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],m=l[2],x=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-m)<.01&&Math.abs(g-x)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+m)<.1&&Math.abs(g+x)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,M=(f+1)/2,R=(p+1)/2,E=(h+d)/4,w=(u+m)/4,A=(g+x)/4;return y>M&&y>R?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=E/n,r=w/n):M>R?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=E/s,r=A/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=w/r,s=A/r),this.set(n,s,r,e),this}let v=Math.sqrt((x-g)*(x-g)+(u-m)*(u-m)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(x-g)/v,this.y=(u-m)/v,this.z=(d-h)/v,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=be(this.x,t.x,e.x),this.y=be(this.y,t.y,e.y),this.z=be(this.z,t.z,e.z),this.w=be(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=be(this.x,t,e),this.y=be(this.y,t,e),this.z=be(this.z,t,e),this.w=be(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(be(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class tm extends zr{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ri,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Le(0,0,t,e),this.scissorTest=!1,this.viewport=new Le(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new En(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:ri,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new ch(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class us extends tm{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class kd extends En{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class em extends En{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Nn{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Qn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Qn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Qn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Qn):Qn.fromBufferAttribute(r,o),Qn.applyMatrix4(t.matrixWorld),this.expandByPoint(Qn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Po.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Po.copy(n.boundingBox)),Po.applyMatrix4(t.matrixWorld),this.union(Po)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Qn),Qn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Br),zo.subVectors(this.max,Br),$s.subVectors(t.a,Br),Ys.subVectors(t.b,Br),Zs.subVectors(t.c,Br),$i.subVectors(Ys,$s),Yi.subVectors(Zs,Ys),vs.subVectors($s,Zs);let e=[0,-$i.z,$i.y,0,-Yi.z,Yi.y,0,-vs.z,vs.y,$i.z,0,-$i.x,Yi.z,0,-Yi.x,vs.z,0,-vs.x,-$i.y,$i.x,0,-Yi.y,Yi.x,0,-vs.y,vs.x,0];return!il(e,$s,Ys,Zs,zo)||(e=[1,0,0,0,1,0,0,0,1],!il(e,$s,Ys,Zs,zo))?!1:(Io.crossVectors($i,Yi),e=[Io.x,Io.y,Io.z],il(e,$s,Ys,Zs,zo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ti),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ti=[new L,new L,new L,new L,new L,new L,new L,new L],Qn=new L,Po=new Nn,$s=new L,Ys=new L,Zs=new L,$i=new L,Yi=new L,vs=new L,Br=new L,zo=new L,Io=new L,ys=new L;function il(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ys.fromArray(i,r);const a=s.x*Math.abs(ys.x)+s.y*Math.abs(ys.y)+s.z*Math.abs(ys.z),l=t.dot(ys),c=e.dot(ys),h=n.dot(ys);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const nm=new Nn,Hr=new L,sl=new L;class Vi{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):nm.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Hr.subVectors(t,this.center);const e=Hr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Hr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(sl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Hr.copy(t.center).add(sl)),this.expandByPoint(Hr.copy(t.center).sub(sl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Ai=new L,rl=new L,Do=new L,Zi=new L,ol=new L,Lo=new L,al=new L;class Is{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ai)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ai.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ai.copy(this.origin).addScaledVector(this.direction,e),Ai.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){rl.copy(t).add(e).multiplyScalar(.5),Do.copy(e).sub(t).normalize(),Zi.copy(this.origin).sub(rl);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Do),a=Zi.dot(this.direction),l=-Zi.dot(Do),c=Zi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const m=1/h;u*=m,d*=m,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(rl).addScaledVector(Do,d),f}intersectSphere(t,e){Ai.subVectors(t.center,this.origin);const n=Ai.dot(this.direction),s=Ai.dot(Ai)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Ai)!==null}intersectTriangle(t,e,n,s,r){ol.subVectors(e,t),Lo.subVectors(n,t),al.crossVectors(ol,Lo);let o=this.direction.dot(al),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Zi.subVectors(this.origin,t);const l=a*this.direction.dot(Lo.crossVectors(Zi,Lo));if(l<0)return null;const c=a*this.direction.dot(ol.cross(Zi));if(c<0||l+c>o)return null;const h=-a*Zi.dot(al);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ue{constructor(t,e,n,s,r,o,a,l,c,h,u,d,f,g,m,x){ue.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,f,g,m,x)}set(t,e,n,s,r,o,a,l,c,h,u,d,f,g,m,x){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=m,p[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ue().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/js.setFromMatrixColumn(t,0).length(),r=1/js.setFromMatrixColumn(t,1).length(),o=1/js.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,g=a*h,m=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-m*c,e[9]=-a*l,e[2]=m-d*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,g=c*h,m=c*u;e[0]=d+m*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=m+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,g=c*h,m=c*u;e[0]=d-m*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=m-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,f=o*u,g=a*h,m=a*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+m,e[1]=l*u,e[5]=m*c+d,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,g=a*l,m=a*c;e[0]=l*h,e[4]=m-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-m*u}else if(t.order==="XZY"){const d=o*l,f=o*c,g=a*l,m=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+m,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=m*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(im,t,sm)}lookAt(t,e,n){const s=this.elements;return On.subVectors(t,e),On.lengthSq()===0&&(On.z=1),On.normalize(),ji.crossVectors(n,On),ji.lengthSq()===0&&(Math.abs(n.z)===1?On.x+=1e-4:On.z+=1e-4,On.normalize(),ji.crossVectors(n,On)),ji.normalize(),Uo.crossVectors(On,ji),s[0]=ji.x,s[4]=Uo.x,s[8]=On.x,s[1]=ji.y,s[5]=Uo.y,s[9]=On.y,s[2]=ji.z,s[6]=Uo.z,s[10]=On.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],m=n[6],x=n[10],p=n[14],v=n[3],y=n[7],M=n[11],R=n[15],E=s[0],w=s[4],A=s[8],S=s[12],b=s[1],U=s[5],P=s[9],G=s[13],j=s[2],O=s[6],B=s[10],K=s[14],q=s[3],Y=s[7],H=s[11],st=s[15];return r[0]=o*E+a*b+l*j+c*q,r[4]=o*w+a*U+l*O+c*Y,r[8]=o*A+a*P+l*B+c*H,r[12]=o*S+a*G+l*K+c*st,r[1]=h*E+u*b+d*j+f*q,r[5]=h*w+u*U+d*O+f*Y,r[9]=h*A+u*P+d*B+f*H,r[13]=h*S+u*G+d*K+f*st,r[2]=g*E+m*b+x*j+p*q,r[6]=g*w+m*U+x*O+p*Y,r[10]=g*A+m*P+x*B+p*H,r[14]=g*S+m*G+x*K+p*st,r[3]=v*E+y*b+M*j+R*q,r[7]=v*w+y*U+M*O+R*Y,r[11]=v*A+y*P+M*B+R*H,r[15]=v*S+y*G+M*K+R*st,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],m=t[7],x=t[11],p=t[15];return g*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*f-n*l*f)+m*(+e*l*f-e*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+x*(+e*c*u-e*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+p*(-s*a*h-e*l*u+e*a*d+s*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],m=t[13],x=t[14],p=t[15],v=u*x*c-m*d*c+m*l*f-a*x*f-u*l*p+a*d*p,y=g*d*c-h*x*c-g*l*f+o*x*f+h*l*p-o*d*p,M=h*m*c-g*u*c+g*a*f-o*m*f-h*a*p+o*u*p,R=g*u*l-h*m*l-g*a*d+o*m*d+h*a*x-o*u*x,E=e*v+n*y+s*M+r*R;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/E;return t[0]=v*w,t[1]=(m*d*r-u*x*r-m*s*f+n*x*f+u*s*p-n*d*p)*w,t[2]=(a*x*r-m*l*r+m*s*c-n*x*c-a*s*p+n*l*p)*w,t[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*f-n*l*f)*w,t[4]=y*w,t[5]=(h*x*r-g*d*r+g*s*f-e*x*f-h*s*p+e*d*p)*w,t[6]=(g*l*r-o*x*r-g*s*c+e*x*c+o*s*p-e*l*p)*w,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*f+e*l*f)*w,t[8]=M*w,t[9]=(g*u*r-h*m*r-g*n*f+e*m*f+h*n*p-e*u*p)*w,t[10]=(o*m*r-g*a*r+g*n*c-e*m*c-o*n*p+e*a*p)*w,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*f-e*a*f)*w,t[12]=R*w,t[13]=(h*m*s-g*u*s+g*n*d-e*m*d-h*n*x+e*u*x)*w,t[14]=(g*a*s-o*m*s-g*n*l+e*m*l+o*n*x-e*a*x)*w,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*d+e*a*d)*w,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,m=o*h,x=o*u,p=a*u,v=l*c,y=l*h,M=l*u,R=n.x,E=n.y,w=n.z;return s[0]=(1-(m+p))*R,s[1]=(f+M)*R,s[2]=(g-y)*R,s[3]=0,s[4]=(f-M)*E,s[5]=(1-(d+p))*E,s[6]=(x+v)*E,s[7]=0,s[8]=(g+y)*w,s[9]=(x-v)*w,s[10]=(1-(d+m))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=js.set(s[0],s[1],s[2]).length();const o=js.set(s[4],s[5],s[6]).length(),a=js.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ti.copy(this);const c=1/r,h=1/o,u=1/a;return ti.elements[0]*=c,ti.elements[1]*=c,ti.elements[2]*=c,ti.elements[4]*=h,ti.elements[5]*=h,ti.elements[6]*=h,ti.elements[8]*=u,ti.elements[9]*=u,ti.elements[10]*=u,e.setFromRotationMatrix(ti),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=gi,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let g,m;if(l)g=r/(o-r),m=o*r/(o-r);else if(a===gi)g=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===Aa)g=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=gi,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-s),d=-(e+t)/(e-t),f=-(n+s)/(n-s);let g,m;if(l)g=1/(o-r),m=o/(o-r);else if(a===gi)g=-2/(o-r),m=-(o+r)/(o-r);else if(a===Aa)g=-1/(o-r),m=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const js=new L,ti=new ue,im=new L(0,0,0),sm=new L(1,1,1),ji=new L,Uo=new L,On=new L,eu=new ue,nu=new hs;class yi{constructor(t=0,e=0,n=0,s=yi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(be(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-be(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(be(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return eu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(eu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return nu.setFromEuler(this),this.setFromQuaternion(nu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yi.DEFAULT_ORDER="XYZ";class hh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let rm=0;const iu=new L,Ks=new hs,Ri=new ue,ko=new L,Gr=new L,om=new L,am=new hs,su=new L(1,0,0),ru=new L(0,1,0),ou=new L(0,0,1),au={type:"added"},lm={type:"removed"},Js={type:"childadded",child:null},ll={type:"childremoved",child:null};class qe extends zr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rm++}),this.uuid=Ls(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qe.DEFAULT_UP.clone();const t=new L,e=new yi,n=new hs,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ue},normalMatrix:{value:new ve}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=qe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ks.setFromAxisAngle(t,e),this.quaternion.multiply(Ks),this}rotateOnWorldAxis(t,e){return Ks.setFromAxisAngle(t,e),this.quaternion.premultiply(Ks),this}rotateX(t){return this.rotateOnAxis(su,t)}rotateY(t){return this.rotateOnAxis(ru,t)}rotateZ(t){return this.rotateOnAxis(ou,t)}translateOnAxis(t,e){return iu.copy(t).applyQuaternion(this.quaternion),this.position.add(iu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(su,t)}translateY(t){return this.translateOnAxis(ru,t)}translateZ(t){return this.translateOnAxis(ou,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ri.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ko.copy(t):ko.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ri.lookAt(Gr,ko,this.up):Ri.lookAt(ko,Gr,this.up),this.quaternion.setFromRotationMatrix(Ri),s&&(Ri.extractRotation(s.matrixWorld),Ks.setFromRotationMatrix(Ri),this.quaternion.premultiply(Ks.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(au),Js.child=t,this.dispatchEvent(Js),Js.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(lm),ll.child=t,this.dispatchEvent(ll),ll.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ri.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ri.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ri),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(au),Js.child=t,this.dispatchEvent(Js),Js.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,t,om),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,am,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}qe.DEFAULT_UP=new L(0,1,0);qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ei=new L,Ci=new L,cl=new L,Pi=new L,Qs=new L,tr=new L,lu=new L,hl=new L,ul=new L,dl=new L,fl=new Le,pl=new Le,ml=new Le;class qn{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),ei.subVectors(t,e),s.cross(ei);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){ei.subVectors(s,e),Ci.subVectors(n,e),cl.subVectors(t,e);const o=ei.dot(ei),a=ei.dot(Ci),l=ei.dot(cl),c=Ci.dot(Ci),h=Ci.dot(cl),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Pi)===null?!1:Pi.x>=0&&Pi.y>=0&&Pi.x+Pi.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Pi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Pi.x),l.addScaledVector(o,Pi.y),l.addScaledVector(a,Pi.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return fl.setScalar(0),pl.setScalar(0),ml.setScalar(0),fl.fromBufferAttribute(t,e),pl.fromBufferAttribute(t,n),ml.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(fl,r.x),o.addScaledVector(pl,r.y),o.addScaledVector(ml,r.z),o}static isFrontFacing(t,e,n,s){return ei.subVectors(n,e),Ci.subVectors(t,e),ei.cross(Ci).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ei.subVectors(this.c,this.b),Ci.subVectors(this.a,this.b),ei.cross(Ci).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return qn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return qn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return qn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return qn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return qn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Qs.subVectors(s,n),tr.subVectors(r,n),hl.subVectors(t,n);const l=Qs.dot(hl),c=tr.dot(hl);if(l<=0&&c<=0)return e.copy(n);ul.subVectors(t,s);const h=Qs.dot(ul),u=tr.dot(ul);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Qs,o);dl.subVectors(t,r);const f=Qs.dot(dl),g=tr.dot(dl);if(g>=0&&f<=g)return e.copy(r);const m=f*c-l*g;if(m<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(tr,a);const x=h*g-f*u;if(x<=0&&u-h>=0&&f-g>=0)return lu.subVectors(r,s),a=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(lu,a);const p=1/(x+m+d);return o=m*p,a=d*p,e.copy(n).addScaledVector(Qs,o).addScaledVector(tr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Nd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ki={h:0,s:0,l:0},No={h:0,s:0,l:0};function gl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class ee{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Un){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ke.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ke.workingColorSpace){return this.r=t,this.g=e,this.b=n,ke.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ke.workingColorSpace){if(t=lh(t,1),e=be(e,0,1),n=be(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=gl(o,r,t+1/3),this.g=gl(o,r,t),this.b=gl(o,r,t-1/3)}return ke.colorSpaceToWorking(this,s),this}setStyle(t,e=Un){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Un){const n=Nd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Oi(t.r),this.g=Oi(t.g),this.b=Oi(t.b),this}copyLinearToSRGB(t){return this.r=Mr(t.r),this.g=Mr(t.g),this.b=Mr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Un){return ke.workingToColorSpace(Sn.copy(this),t),Math.round(be(Sn.r*255,0,255))*65536+Math.round(be(Sn.g*255,0,255))*256+Math.round(be(Sn.b*255,0,255))}getHexString(t=Un){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ke.workingColorSpace){ke.workingToColorSpace(Sn.copy(this),e);const n=Sn.r,s=Sn.g,r=Sn.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ke.workingColorSpace){return ke.workingToColorSpace(Sn.copy(this),e),t.r=Sn.r,t.g=Sn.g,t.b=Sn.b,t}getStyle(t=Un){ke.workingToColorSpace(Sn.copy(this),t);const e=Sn.r,n=Sn.g,s=Sn.b;return t!==Un?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ki),this.setHSL(Ki.h+t,Ki.s+e,Ki.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ki),t.getHSL(No);const n=eo(Ki.h,No.h,e),s=eo(Ki.s,No.s,e),r=eo(Ki.l,No.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Sn=new ee;ee.NAMES=Nd;let cm=0;class ps extends zr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cm++}),this.uuid=Ls(),this.name="",this.type="Material",this.blending=yr,this.side=Hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ic,this.blendDst=sc,this.blendEquation=As,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=wr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$h,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xs,this.stencilZFail=Xs,this.stencilZPass=Xs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==yr&&(n.blending=this.blending),this.side!==Hi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ic&&(n.blendSrc=this.blendSrc),this.blendDst!==sc&&(n.blendDst=this.blendDst),this.blendEquation!==As&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==wr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$h&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Xs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Xs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Xs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class xn extends ps{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=wd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const on=new L,Fo=new Wt;let hm=0;class un{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hm++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Yh,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Fo.fromBufferAttribute(this,e),Fo.applyMatrix3(t),this.setXY(e,Fo.x,Fo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)on.fromBufferAttribute(this,e),on.applyMatrix3(t),this.setXYZ(e,on.x,on.y,on.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)on.fromBufferAttribute(this,e),on.applyMatrix4(t),this.setXYZ(e,on.x,on.y,on.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)on.fromBufferAttribute(this,e),on.applyNormalMatrix(t),this.setXYZ(e,on.x,on.y,on.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)on.fromBufferAttribute(this,e),on.transformDirection(t),this.setXYZ(e,on.x,on.y,on.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=dr(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=An(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=dr(e,this.array)),e}setX(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=dr(e,this.array)),e}setY(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=dr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=dr(e,this.array)),e}setW(t,e){return this.normalized&&(e=An(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=An(e,this.array),n=An(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=An(e,this.array),n=An(n,this.array),s=An(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=An(e,this.array),n=An(n,this.array),s=An(s,this.array),r=An(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Yh&&(t.usage=this.usage),t}}class uh extends un{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Fd extends un{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Vt extends un{constructor(t,e,n){super(new Float32Array(t),e,n)}}let um=0;const Xn=new ue,xl=new qe,er=new L,Bn=new Nn,Vr=new Nn,pn=new L;class Se extends zr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:um++}),this.uuid=Ls(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ud(t)?Fd:uh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ve().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Xn.makeRotationFromQuaternion(t),this.applyMatrix4(Xn),this}rotateX(t){return Xn.makeRotationX(t),this.applyMatrix4(Xn),this}rotateY(t){return Xn.makeRotationY(t),this.applyMatrix4(Xn),this}rotateZ(t){return Xn.makeRotationZ(t),this.applyMatrix4(Xn),this}translate(t,e,n){return Xn.makeTranslation(t,e,n),this.applyMatrix4(Xn),this}scale(t,e,n){return Xn.makeScale(t,e,n),this.applyMatrix4(Xn),this}lookAt(t){return xl.lookAt(t),xl.updateMatrix(),this.applyMatrix4(xl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(er).negate(),this.translate(er.x,er.y,er.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Vt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Nn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Bn.setFromBufferAttribute(r),this.morphTargetsRelative?(pn.addVectors(this.boundingBox.min,Bn.min),this.boundingBox.expandByPoint(pn),pn.addVectors(this.boundingBox.max,Bn.max),this.boundingBox.expandByPoint(pn)):(this.boundingBox.expandByPoint(Bn.min),this.boundingBox.expandByPoint(Bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const n=this.boundingSphere.center;if(Bn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Vr.setFromBufferAttribute(a),this.morphTargetsRelative?(pn.addVectors(Bn.min,Vr.min),Bn.expandByPoint(pn),pn.addVectors(Bn.max,Vr.max),Bn.expandByPoint(pn)):(Bn.expandByPoint(Vr.min),Bn.expandByPoint(Vr.max))}Bn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)pn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(pn));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)pn.fromBufferAttribute(a,c),l&&(er.fromBufferAttribute(t,c),pn.add(er)),s=Math.max(s,n.distanceToSquared(pn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new un(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let A=0;A<n.count;A++)a[A]=new L,l[A]=new L;const c=new L,h=new L,u=new L,d=new Wt,f=new Wt,g=new Wt,m=new L,x=new L;function p(A,S,b){c.fromBufferAttribute(n,A),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,b),d.fromBufferAttribute(r,A),f.fromBufferAttribute(r,S),g.fromBufferAttribute(r,b),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const U=1/(f.x*g.y-g.x*f.y);isFinite(U)&&(m.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(U),x.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(U),a[A].add(m),a[S].add(m),a[b].add(m),l[A].add(x),l[S].add(x),l[b].add(x))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let A=0,S=v.length;A<S;++A){const b=v[A],U=b.start,P=b.count;for(let G=U,j=U+P;G<j;G+=3)p(t.getX(G+0),t.getX(G+1),t.getX(G+2))}const y=new L,M=new L,R=new L,E=new L;function w(A){R.fromBufferAttribute(s,A),E.copy(R);const S=a[A];y.copy(S),y.sub(R.multiplyScalar(R.dot(S))).normalize(),M.crossVectors(E,S);const U=M.dot(l[A])<0?-1:1;o.setXYZW(A,y.x,y.y,y.z,U)}for(let A=0,S=v.length;A<S;++A){const b=v[A],U=b.start,P=b.count;for(let G=U,j=U+P;G<j;G+=3)w(t.getX(G+0)),w(t.getX(G+1)),w(t.getX(G+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new un(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,u=new L;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),m=t.getX(d+1),x=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,m),o.fromBufferAttribute(e,x),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,m),c.fromBufferAttribute(n,x),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(m,l.x,l.y,l.z),n.setXYZ(x,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)pn.fromBufferAttribute(t,e),pn.normalize(),t.setXYZ(e,pn.x,pn.y,pn.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let m=0,x=l.length;m<x;m++){a.isInterleavedBufferAttribute?f=l[m]*a.data.stride+a.offset:f=l[m]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new un(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Se,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const cu=new ue,Ms=new Is,Oo=new Vi,hu=new L,Bo=new L,Ho=new L,Go=new L,vl=new L,Vo=new L,uu=new L,Wo=new L;class Jt extends qe{constructor(t=new Se,e=new xn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Vo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(vl.fromBufferAttribute(u,t),o?Vo.addScaledVector(vl,h):Vo.addScaledVector(vl.sub(e),h))}e.add(Vo)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Oo.copy(n.boundingSphere),Oo.applyMatrix4(r),Ms.copy(t.ray).recast(t.near),!(Oo.containsPoint(Ms.origin)===!1&&(Ms.intersectSphere(Oo,hu)===null||Ms.origin.distanceToSquared(hu)>(t.far-t.near)**2))&&(cu.copy(r).invert(),Ms.copy(t.ray).applyMatrix4(cu),!(n.boundingBox!==null&&Ms.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ms)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,m=d.length;g<m;g++){const x=d[g],p=o[x.materialIndex],v=Math.max(x.start,f.start),y=Math.min(a.count,Math.min(x.start+x.count,f.start+f.count));for(let M=v,R=y;M<R;M+=3){const E=a.getX(M),w=a.getX(M+1),A=a.getX(M+2);s=Xo(this,p,t,n,c,h,u,E,w,A),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=x.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),m=Math.min(a.count,f.start+f.count);for(let x=g,p=m;x<p;x+=3){const v=a.getX(x),y=a.getX(x+1),M=a.getX(x+2);s=Xo(this,o,t,n,c,h,u,v,y,M),s&&(s.faceIndex=Math.floor(x/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,m=d.length;g<m;g++){const x=d[g],p=o[x.materialIndex],v=Math.max(x.start,f.start),y=Math.min(l.count,Math.min(x.start+x.count,f.start+f.count));for(let M=v,R=y;M<R;M+=3){const E=M,w=M+1,A=M+2;s=Xo(this,p,t,n,c,h,u,E,w,A),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=x.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),m=Math.min(l.count,f.start+f.count);for(let x=g,p=m;x<p;x+=3){const v=x,y=x+1,M=x+2;s=Xo(this,o,t,n,c,h,u,v,y,M),s&&(s.faceIndex=Math.floor(x/3),e.push(s))}}}}function dm(i,t,e,n,s,r,o,a){let l;if(t.side===In?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Hi,a),l===null)return null;Wo.copy(a),Wo.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Wo);return c<e.near||c>e.far?null:{distance:c,point:Wo.clone(),object:i}}function Xo(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Bo),i.getVertexPosition(l,Ho),i.getVertexPosition(c,Go);const h=dm(i,t,e,n,Bo,Ho,Go,uu);if(h){const u=new L;qn.getBarycoord(uu,Bo,Ho,Go,u),s&&(h.uv=qn.getInterpolatedAttribute(s,a,l,c,u,new Wt)),r&&(h.uv1=qn.getInterpolatedAttribute(r,a,l,c,u,new Wt)),o&&(h.normal=qn.getInterpolatedAttribute(o,a,l,c,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new L,materialIndex:0};qn.getNormal(Bo,Ho,Go,d.normal),h.face=d,h.barycoord=u}return h}class Gi extends Se{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Vt(c,3)),this.setAttribute("normal",new Vt(h,3)),this.setAttribute("uv",new Vt(u,2));function g(m,x,p,v,y,M,R,E,w,A,S){const b=M/w,U=R/A,P=M/2,G=R/2,j=E/2,O=w+1,B=A+1;let K=0,q=0;const Y=new L;for(let H=0;H<B;H++){const st=H*U-G;for(let _t=0;_t<O;_t++){const ne=_t*b-P;Y[m]=ne*v,Y[x]=st*y,Y[p]=j,c.push(Y.x,Y.y,Y.z),Y[m]=0,Y[x]=0,Y[p]=E>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push(_t/w),u.push(1-H/A),K+=1}}for(let H=0;H<A;H++)for(let st=0;st<w;st++){const _t=d+st+O*H,ne=d+st+O*(H+1),le=d+(st+1)+O*(H+1),ut=d+(st+1)+O*H;l.push(_t,ne,ut),l.push(ne,le,ut),q+=6}a.addGroup(f,q,S),f+=q,d+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Cr(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Rn(i){const t={};for(let e=0;e<i.length;e++){const n=Cr(i[e]);for(const s in n)t[s]=n[s]}return t}function fm(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Od(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ke.workingColorSpace}const Ca={clone:Cr,merge:Rn};var pm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Zn extends ps{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pm,this.fragmentShader=mm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Cr(t.uniforms),this.uniformsGroups=fm(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Bd extends qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=gi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ji=new L,du=new Wt,fu=new Wt;class kn extends Bd{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=uo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(to*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return uo*2*Math.atan(Math.tan(to*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ji.x,Ji.y).multiplyScalar(-t/Ji.z),Ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ji.x,Ji.y).multiplyScalar(-t/Ji.z)}getViewSize(t,e){return this.getViewBounds(t,du,fu),e.subVectors(fu,du)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(to*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const nr=-90,ir=1;class gm extends qe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new kn(nr,ir,t,e);s.layers=this.layers,this.add(s);const r=new kn(nr,ir,t,e);r.layers=this.layers,this.add(r);const o=new kn(nr,ir,t,e);o.layers=this.layers,this.add(o);const a=new kn(nr,ir,t,e);a.layers=this.layers,this.add(a);const l=new kn(nr,ir,t,e);l.layers=this.layers,this.add(l);const c=new kn(nr,ir,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===gi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Aa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=m,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Hd extends En{constructor(t=[],e=Er,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class xm extends us{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Hd(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Gi(5,5,5),r=new Zn({name:"CubemapFromEquirect",uniforms:Cr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:In,blending:ls});r.uniforms.tEquirect.value=e;const o=new Jt(s,r),a=e.minFilter;return e.minFilter===os&&(e.minFilter=ri),new gm(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class te extends qe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const vm={type:"move"};class yl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new te,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new te,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new te,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const m of t.hand.values()){const x=e.getJointPose(m,n),p=this._getHandJoint(c,m);x!==null&&(p.matrix.fromArray(x.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=x.radius),p.visible=x!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(vm)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new te;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class ka{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ee(t),this.density=e}clone(){return new ka(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ym extends qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yi,this.environmentIntensity=1,this.environmentRotation=new yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const pu=new L,mu=new Le,gu=new Le,Mm=new L,xu=new ue,qo=new L,Ml=new Vi,vu=new ue,_l=new Is;class $o extends Jt{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=qh,this.bindMatrix=new ue,this.bindMatrixInverse=new ue,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new Nn),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,qo),this.boundingBox.expandByPoint(qo)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Vi),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,qo),this.boundingSphere.expandByPoint(qo)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ml.copy(this.boundingSphere),Ml.applyMatrix4(s),t.ray.intersectsSphere(Ml)!==!1&&(vu.copy(s).invert(),_l.copy(t.ray).applyMatrix4(vu),!(this.boundingBox!==null&&_l.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,_l)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Le,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===qh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Mp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,s=this.geometry;mu.fromBufferAttribute(s.attributes.skinIndex,t),gu.fromBufferAttribute(s.attributes.skinWeight,t),pu.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const o=gu.getComponent(r);if(o!==0){const a=mu.getComponent(r);xu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Mm.copy(pu).applyMatrix4(xu),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class Gd extends qe{constructor(){super(),this.isBone=!0,this.type="Bone"}}class dh extends En{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Vn,h=Vn,u,d){super(null,o,a,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const yu=new ue,_m=new ue;class fh{constructor(t=[],e=[]){this.uuid=Ls(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new ue)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new ue;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:_m;yu.multiplyMatrices(a,e[r]),yu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new fh(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new dh(e,t,t,Gn,oi);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){const r=t.bones[n];let o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Gd),this.bones.push(o),this.boneInverses.push(new ue().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const o=e[s];t.bones.push(o.uuid);const a=n[s];t.boneInverses.push(a.toArray())}return t}}class pr extends un{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const sr=new ue,Mu=new ue,Yo=[],_u=new Nn,bm=new ue,Wr=new Jt,Xr=new Vi;class wn extends Jt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new pr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,bm)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Nn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,sr),_u.copy(t.boundingBox).applyMatrix4(sr),this.boundingBox.union(_u)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Vi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,sr),Xr.copy(t.boundingSphere).applyMatrix4(sr),this.boundingSphere.union(Xr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Wr.geometry=this.geometry,Wr.material=this.material,Wr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xr.copy(this.boundingSphere),Xr.applyMatrix4(n),t.ray.intersectsSphere(Xr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,sr),Mu.multiplyMatrices(n,sr),Wr.matrixWorld=Mu,Wr.raycast(t,Yo);for(let o=0,a=Yo.length;o<a;o++){const l=Yo[o];l.instanceId=r,l.object=this,e.push(l)}Yo.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new pr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new dh(new Float32Array(s*this.count),s,this.count,ih,oi));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const bl=new L,Sm=new L,wm=new ve;class pi{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=bl.subVectors(n,e).cross(Sm.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(bl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||wm.getNormalMatrix(t),s=this.coplanarPoint(bl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _s=new Vi,Em=new Wt(.5,.5),Zo=new L;class ph{constructor(t=new pi,e=new pi,n=new pi,s=new pi,r=new pi,o=new pi){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=gi,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],m=r[9],x=r[10],p=r[11],v=r[12],y=r[13],M=r[14],R=r[15];if(s[0].setComponents(c-o,f-h,p-g,R-v).normalize(),s[1].setComponents(c+o,f+h,p+g,R+v).normalize(),s[2].setComponents(c+a,f+u,p+m,R+y).normalize(),s[3].setComponents(c-a,f-u,p-m,R-y).normalize(),n)s[4].setComponents(l,d,x,M).normalize(),s[5].setComponents(c-l,f-d,p-x,R-M).normalize();else if(s[4].setComponents(c-l,f-d,p-x,R-M).normalize(),e===gi)s[5].setComponents(c+l,f+d,p+x,R+M).normalize();else if(e===Aa)s[5].setComponents(l,d,x,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),_s.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),_s.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(_s)}intersectsSprite(t){_s.center.set(0,0,0);const e=Em.distanceTo(t.center);return _s.radius=.7071067811865476+e,_s.applyMatrix4(t.matrixWorld),this.intersectsSphere(_s)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Zo.x=s.normal.x>0?t.max.x:t.min.x,Zo.y=s.normal.y>0?t.max.y:t.min.y,Zo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Zo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class mh extends ps{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Pa=new L,za=new L,bu=new ue,qr=new Is,jo=new Vi,Sl=new L,Su=new L;class po extends qe{constructor(t=new Se,e=new mh){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Pa.fromBufferAttribute(e,s-1),za.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Pa.distanceTo(za);t.setAttribute("lineDistance",new Vt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),jo.copy(n.boundingSphere),jo.applyMatrix4(s),jo.radius+=r,t.ray.intersectsSphere(jo)===!1)return;bu.copy(s).invert(),qr.copy(t.ray).applyMatrix4(bu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let m=f,x=g-1;m<x;m+=c){const p=h.getX(m),v=h.getX(m+1),y=Ko(this,t,qr,l,p,v,m);y&&e.push(y)}if(this.isLineLoop){const m=h.getX(g-1),x=h.getX(f),p=Ko(this,t,qr,l,m,x,g-1);p&&e.push(p)}}else{const f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let m=f,x=g-1;m<x;m+=c){const p=Ko(this,t,qr,l,m,m+1,m);p&&e.push(p)}if(this.isLineLoop){const m=Ko(this,t,qr,l,g-1,f,g-1);m&&e.push(m)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ko(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(Pa.fromBufferAttribute(a,s),za.fromBufferAttribute(a,r),e.distanceSqToSegment(Pa,za,Sl,Su)>n)return;Sl.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Sl);if(!(c<t.near||c>t.far))return{distance:c,point:Su.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const wu=new L,Eu=new L;class Tm extends po{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)wu.fromBufferAttribute(e,s),Eu.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+wu.distanceTo(Eu);t.setAttribute("lineDistance",new Vt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Am extends po{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Rm extends ps{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ee(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Tu=new ue,Wc=new Is,Jo=new Vi,Qo=new L;class Cm extends qe{constructor(t=new Se,e=new Rm){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jo.copy(n.boundingSphere),Jo.applyMatrix4(s),Jo.radius+=r,t.ray.intersectsSphere(Jo)===!1)return;Tu.copy(s).invert(),Wc.copy(t.ray).applyMatrix4(Tu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,m=f;g<m;g++){const x=c.getX(g);Qo.fromBufferAttribute(u,x),Au(Qo,x,l,s,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,m=f;g<m;g++)Qo.fromBufferAttribute(u,g),Au(Qo,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Au(i,t,e,n,s,r,o){const a=Wc.distanceSqToPoint(i);if(a<e){const l=new L;Wc.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Vd extends En{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Wd extends En{constructor(t,e,n=zs,s,r,o,a=Vn,l=Vn,c,h=co,u=1){if(h!==co&&h!==ho)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ch(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Xd extends En{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Na extends Se{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new L,h=new Wt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Vt(o,3)),this.setAttribute("normal",new Vt(a,3)),this.setAttribute("uv",new Vt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Na(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Us extends Se{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const m=[],x=n/2;let p=0;v(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Vt(u,3)),this.setAttribute("normal",new Vt(d,3)),this.setAttribute("uv",new Vt(f,2));function v(){const M=new L,R=new L;let E=0;const w=(e-t)/n;for(let A=0;A<=r;A++){const S=[],b=A/r,U=b*(e-t)+t;for(let P=0;P<=s;P++){const G=P/s,j=G*l+a,O=Math.sin(j),B=Math.cos(j);R.x=U*O,R.y=-b*n+x,R.z=U*B,u.push(R.x,R.y,R.z),M.set(O,w,B).normalize(),d.push(M.x,M.y,M.z),f.push(G,1-b),S.push(g++)}m.push(S)}for(let A=0;A<s;A++)for(let S=0;S<r;S++){const b=m[S][A],U=m[S+1][A],P=m[S+1][A+1],G=m[S][A+1];(t>0||S!==0)&&(h.push(b,U,G),E+=3),(e>0||S!==r-1)&&(h.push(U,P,G),E+=3)}c.addGroup(p,E,0),p+=E}function y(M){const R=g,E=new Wt,w=new L;let A=0;const S=M===!0?t:e,b=M===!0?1:-1;for(let P=1;P<=s;P++)u.push(0,x*b,0),d.push(0,b,0),f.push(.5,.5),g++;const U=g;for(let P=0;P<=s;P++){const j=P/s*l+a,O=Math.cos(j),B=Math.sin(j);w.x=S*B,w.y=x*b,w.z=S*O,u.push(w.x,w.y,w.z),d.push(0,b,0),E.x=O*.5+.5,E.y=B*.5*b+.5,f.push(E.x,E.y),g++}for(let P=0;P<s;P++){const G=R+P,j=U+P;M===!0?h.push(j,j+1,G):h.push(j+1,j,G),A+=3}c.addGroup(p,A,M===!0?1:2),p+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Us(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class gh extends Us{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new gh(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class yo extends Se{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new Vt(r,3)),this.setAttribute("normal",new Vt(r.slice(),3)),this.setAttribute("uv",new Vt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const y=new L,M=new L,R=new L;for(let E=0;E<e.length;E+=3)f(e[E+0],y),f(e[E+1],M),f(e[E+2],R),l(y,M,R,v)}function l(v,y,M,R){const E=R+1,w=[];for(let A=0;A<=E;A++){w[A]=[];const S=v.clone().lerp(M,A/E),b=y.clone().lerp(M,A/E),U=E-A;for(let P=0;P<=U;P++)P===0&&A===E?w[A][P]=S:w[A][P]=S.clone().lerp(b,P/U)}for(let A=0;A<E;A++)for(let S=0;S<2*(E-A)-1;S++){const b=Math.floor(S/2);S%2===0?(d(w[A][b+1]),d(w[A+1][b]),d(w[A][b])):(d(w[A][b+1]),d(w[A+1][b+1]),d(w[A+1][b]))}}function c(v){const y=new L;for(let M=0;M<r.length;M+=3)y.x=r[M+0],y.y=r[M+1],y.z=r[M+2],y.normalize().multiplyScalar(v),r[M+0]=y.x,r[M+1]=y.y,r[M+2]=y.z}function h(){const v=new L;for(let y=0;y<r.length;y+=3){v.x=r[y+0],v.y=r[y+1],v.z=r[y+2];const M=x(v)/2/Math.PI+.5,R=p(v)/Math.PI+.5;o.push(M,1-R)}g(),u()}function u(){for(let v=0;v<o.length;v+=6){const y=o[v+0],M=o[v+2],R=o[v+4],E=Math.max(y,M,R),w=Math.min(y,M,R);E>.9&&w<.1&&(y<.2&&(o[v+0]+=1),M<.2&&(o[v+2]+=1),R<.2&&(o[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function f(v,y){const M=v*3;y.x=t[M+0],y.y=t[M+1],y.z=t[M+2]}function g(){const v=new L,y=new L,M=new L,R=new L,E=new Wt,w=new Wt,A=new Wt;for(let S=0,b=0;S<r.length;S+=9,b+=6){v.set(r[S+0],r[S+1],r[S+2]),y.set(r[S+3],r[S+4],r[S+5]),M.set(r[S+6],r[S+7],r[S+8]),E.set(o[b+0],o[b+1]),w.set(o[b+2],o[b+3]),A.set(o[b+4],o[b+5]),R.copy(v).add(y).add(M).divideScalar(3);const U=x(R);m(E,b+0,v,U),m(w,b+2,y,U),m(A,b+4,M,U)}}function m(v,y,M,R){R<0&&v.x===1&&(o[y]=v.x-1),M.x===0&&M.z===0&&(o[y]=R/2/Math.PI+.5)}function x(v){return Math.atan2(v.z,-v.x)}function p(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yo(t.vertices,t.indices,t.radius,t.details)}}class Fa extends yo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Fa(t.radius,t.detail)}}class Wi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new Wt:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new L,s=[],r=[],o=[],a=new L,l=new ue;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new L)}r[0]=new L,o[0]=new L;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(be(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(be(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class qd extends Wi{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Wt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Pm extends qd{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function xh(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const ta=new L,wl=new xh,El=new xh,Tl=new xh;class mo extends Wi{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(ta.subVectors(s[0],s[1]).add(s[0]),c=ta);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(ta.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=ta),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(h),f);m<1e-4&&(m=1),g<1e-4&&(g=m),x<1e-4&&(x=m),wl.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,m,x),El.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,m,x),Tl.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,m,x)}else this.curveType==="catmullrom"&&(wl.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),El.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Tl.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(wl.calc(l),El.calc(l),Tl.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Ru(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function zm(i,t){const e=1-i;return e*e*t}function Im(i,t){return 2*(1-i)*i*t}function Dm(i,t){return i*i*t}function no(i,t,e,n){return zm(i,t)+Im(i,e)+Dm(i,n)}function Lm(i,t){const e=1-i;return e*e*e*t}function Um(i,t){const e=1-i;return 3*e*e*i*t}function km(i,t){return 3*(1-i)*i*i*t}function Nm(i,t){return i*i*i*t}function io(i,t,e,n,s){return Lm(i,t)+Um(i,e)+km(i,n)+Nm(i,s)}class Fm extends Wi{constructor(t=new Wt,e=new Wt,n=new Wt,s=new Wt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Wt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(io(t,s.x,r.x,o.x,a.x),io(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Om extends Wi{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(io(t,s.x,r.x,o.x,a.x),io(t,s.y,r.y,o.y,a.y),io(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Bm extends Wi{constructor(t=new Wt,e=new Wt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Wt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Wt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Hm extends Wi{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gm extends Wi{constructor(t=new Wt,e=new Wt,n=new Wt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Wt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(no(t,s.x,r.x,o.x),no(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $d extends Wi{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(no(t,s.x,r.x,o.x),no(t,s.y,r.y,o.y),no(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Vm extends Wi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Wt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Ru(a,l.x,c.x,h.x,u.x),Ru(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Wt().fromArray(s))}return this}}var Wm=Object.freeze({__proto__:null,ArcCurve:Pm,CatmullRomCurve3:mo,CubicBezierCurve:Fm,CubicBezierCurve3:Om,EllipseCurve:qd,LineCurve:Bm,LineCurve3:Hm,QuadraticBezierCurve:Gm,QuadraticBezierCurve3:$d,SplineCurve:Vm});class vh extends yo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new vh(t.radius,t.detail)}}class yh extends yo{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new yh(t.radius,t.detail)}}class Ni extends Se{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,f=[],g=[],m=[],x=[];for(let p=0;p<h;p++){const v=p*d-o;for(let y=0;y<c;y++){const M=y*u-r;g.push(M,-v,0),m.push(0,0,1),x.push(y/a),x.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<a;v++){const y=v+c*p,M=v+c*(p+1),R=v+1+c*(p+1),E=v+1+c*p;f.push(y,M,E),f.push(M,R,E)}this.setIndex(f),this.setAttribute("position",new Vt(g,3)),this.setAttribute("normal",new Vt(m,3)),this.setAttribute("uv",new Vt(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ni(t.width,t.height,t.widthSegments,t.heightSegments)}}class as extends Se{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let u=t;const d=(e-t)/s,f=new L,g=new Wt;for(let m=0;m<=s;m++){for(let x=0;x<=n;x++){const p=r+x/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let m=0;m<s;m++){const x=m*(n+1);for(let p=0;p<n;p++){const v=p+x,y=v,M=v+n+1,R=v+n+2,E=v+1;a.push(y,M,E),a.push(M,R,E)}}this.setIndex(a),this.setAttribute("position",new Vt(l,3)),this.setAttribute("normal",new Vt(c,3)),this.setAttribute("uv",new Vt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new as(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class jn extends Se{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new L,d=new L,f=[],g=[],m=[],x=[];for(let p=0;p<=n;p++){const v=[],y=p/n;let M=0;p===0&&o===0?M=.5/e:p===n&&l===Math.PI&&(M=-.5/e);for(let R=0;R<=e;R++){const E=R/e;u.x=-t*Math.cos(s+E*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+E*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),x.push(E+M,1-y),v.push(c++)}h.push(v)}for(let p=0;p<n;p++)for(let v=0;v<e;v++){const y=h[p][v+1],M=h[p][v],R=h[p+1][v],E=h[p+1][v+1];(p!==0||o>0)&&f.push(y,M,E),(p!==n-1||l<Math.PI)&&f.push(M,R,E)}this.setIndex(f),this.setAttribute("position",new Vt(g,3)),this.setAttribute("normal",new Vt(m,3)),this.setAttribute("uv",new Vt(x,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Mh extends Se{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new L,u=new L,d=new L;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const m=g/s*r,x=f/n*Math.PI*2;u.x=(t+e*Math.cos(x))*Math.cos(m),u.y=(t+e*Math.cos(x))*Math.sin(m),u.z=e*Math.sin(x),a.push(u.x,u.y,u.z),h.x=t*Math.cos(m),h.y=t*Math.sin(m),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const m=(s+1)*f+g-1,x=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,v=(s+1)*f+g;o.push(m,x,v),o.push(x,p,v)}this.setIndex(o),this.setAttribute("position",new Vt(a,3)),this.setAttribute("normal",new Vt(l,3)),this.setAttribute("uv",new Vt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mh(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Oa extends Se{constructor(t=new $d(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new L,l=new L,c=new Wt;let h=new L;const u=[],d=[],f=[],g=[];m(),this.setIndex(g),this.setAttribute("position",new Vt(u,3)),this.setAttribute("normal",new Vt(d,3)),this.setAttribute("uv",new Vt(f,2));function m(){for(let y=0;y<e;y++)x(y);x(r===!1?e:0),v(),p()}function x(y){h=t.getPointAt(y/e,h);const M=o.normals[y],R=o.binormals[y];for(let E=0;E<=s;E++){const w=E/s*Math.PI*2,A=Math.sin(w),S=-Math.cos(w);l.x=S*M.x+A*R.x,l.y=S*M.y+A*R.y,l.z=S*M.z+A*R.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let y=1;y<=e;y++)for(let M=1;M<=s;M++){const R=(s+1)*(y-1)+(M-1),E=(s+1)*y+(M-1),w=(s+1)*y+M,A=(s+1)*(y-1)+M;g.push(R,E,A),g.push(E,w,A)}}function v(){for(let y=0;y<=e;y++)for(let M=0;M<=s;M++)c.x=y/e,c.y=M/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Oa(new Wm[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Ve extends ps{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ah,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Yd extends Ve{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Wt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return be(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ee(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ee(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ee(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class gn extends ps{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new ee(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ah,this.normalScale=new Wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class Xm extends ps{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class qm extends ps{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Zd extends mh{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class _h extends qe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class $m extends _h{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(qe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Al=new ue,Cu=new L,Pu=new L;class jd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Wt(512,512),this.mapType=vi,this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ph,this._frameExtents=new Wt(1,1),this._viewportCount=1,this._viewports=[new Le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Cu.setFromMatrixPosition(t.matrixWorld),e.position.copy(Cu),Pu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Pu),e.updateMatrixWorld(),Al.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Al,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Al)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const zu=new ue,$r=new L,Rl=new L;class Ym extends jd{constructor(){super(new kn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Wt(4,2),this._viewportCount=6,this._viewports=[new Le(2,1,1,1),new Le(0,1,1,1),new Le(3,1,1,1),new Le(1,1,1,1),new Le(3,0,1,1),new Le(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),$r.setFromMatrixPosition(t.matrixWorld),n.position.copy($r),Rl.copy(n.position),Rl.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Rl),n.updateMatrixWorld(),s.makeTranslation(-$r.x,-$r.y,-$r.z),zu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zu,n.coordinateSystem,n.reversedDepth)}}class Zm extends _h{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Ym}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Kd extends Bd{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class jm extends jd{constructor(){super(new Kd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Km extends _h{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(qe.DEFAULT_UP),this.updateMatrix(),this.target=new qe,this.shadow=new jm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Jm extends Se{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Qm extends kn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Iu=new ue;class Cl{constructor(t,e,n=0,s=1/0){this.ray=new Is(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new hh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Iu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Iu),this}intersectObject(t,e=!0,n=[]){return Xc(t,this,n,e),n.sort(Du),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Xc(t[s],this,n,e);return n.sort(Du),n}}function Du(i,t){return i.distance-t.distance}function Xc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Xc(r[o],t,e,!0)}}function Lu(i,t,e,n){const s=t0(n);switch(e){case zd:return i*t;case ih:return i*t/s.components*s.byteLength;case sh:return i*t/s.components*s.byteLength;case Dd:return i*t*2/s.components*s.byteLength;case rh:return i*t*2/s.components*s.byteLength;case Id:return i*t*3/s.components*s.byteLength;case Gn:return i*t*4/s.components*s.byteLength;case oh:return i*t*4/s.components*s.byteLength;case Ma:case _a:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ba:case Sa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case gc:case vc:return Math.max(i,16)*Math.max(t,8)/4;case mc:case xc:return Math.max(i,8)*Math.max(t,8)/2;case yc:case Mc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case _c:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case bc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Sc:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case wc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ec:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Tc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ac:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Rc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Cc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Pc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case zc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ic:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Dc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Lc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Uc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case kc:case Nc:case Fc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Oc:case Bc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Hc:case Gc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function t0(i){switch(i){case vi:case Ad:return{byteLength:1,components:1};case ao:case Rd:case vo:return{byteLength:2,components:1};case eh:case nh:return{byteLength:2,components:4};case zs:case th:case oi:return{byteLength:4,components:1};case Cd:case Pd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Jd(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function e0(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],m=u[f];m.start<=g.start+g.count+1?g.count=Math.max(g.count,m.start+m.count-g.start):(++d,u[d]=m)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const m=u[f];i.bufferSubData(c,m.start*h.BYTES_PER_ELEMENT,h,m.start,m.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var n0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,i0=`#ifdef USE_ALPHAHASH
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
#endif`,s0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,r0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,o0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,a0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,l0=`#ifdef USE_AOMAP
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
#endif`,c0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,h0=`#ifdef USE_BATCHING
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
#endif`,u0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,d0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,f0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,p0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,m0=`#ifdef USE_IRIDESCENCE
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
#endif`,g0=`#ifdef USE_BUMPMAP
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
#endif`,x0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,v0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,y0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,M0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,b0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,S0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,w0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,E0=`#define PI 3.141592653589793
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
} // validated`,T0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,A0=`vec3 transformedNormal = objectNormal;
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
#endif`,R0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,C0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,P0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,z0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,I0="gl_FragColor = linearToOutputTexel( gl_FragColor );",D0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,L0=`#ifdef USE_ENVMAP
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
#endif`,U0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,k0=`#ifdef USE_ENVMAP
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
#endif`,N0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,F0=`#ifdef USE_ENVMAP
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
#endif`,O0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,B0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,H0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,G0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,V0=`#ifdef USE_GRADIENTMAP
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
}`,W0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,X0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,q0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$0=`uniform bool receiveShadow;
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
#endif`,Y0=`#ifdef USE_ENVMAP
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
#endif`,Z0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,j0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,K0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,J0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Q0=`PhysicalMaterial material;
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
#endif`,tg=`struct PhysicalMaterial {
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
}`,eg=`
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
#endif`,ng=`#if defined( RE_IndirectDiffuse )
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
#endif`,ig=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,og=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ag=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ug=`#if defined( USE_POINTS_UV )
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
#endif`,dg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xg=`#ifdef USE_MORPHTARGETS
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
#endif`,vg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Mg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,_g=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wg=`#ifdef USE_NORMALMAP
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
#endif`,Eg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ag=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Rg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Pg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,zg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ig=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Dg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Lg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ug=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ng=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Og=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Bg=`float getShadowMask() {
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
}`,Hg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gg=`#ifdef USE_SKINNING
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
#endif`,Vg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wg=`#ifdef USE_SKINNING
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
#endif`,Xg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$g=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zg=`#ifdef USE_TRANSMISSION
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
#endif`,jg=`#ifdef USE_TRANSMISSION
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
#endif`,Kg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ex=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nx=`uniform sampler2D t2D;
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
}`,ix=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ox=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ax=`#include <common>
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
}`,lx=`#if DEPTH_PACKING == 3200
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
}`,cx=`#define DISTANCE
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
}`,hx=`#define DISTANCE
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
}`,ux=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fx=`uniform float scale;
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
}`,px=`uniform vec3 diffuse;
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
}`,mx=`#include <common>
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
}`,gx=`uniform vec3 diffuse;
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
}`,xx=`#define LAMBERT
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
}`,vx=`#define LAMBERT
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
}`,yx=`#define MATCAP
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
}`,Mx=`#define MATCAP
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
}`,_x=`#define NORMAL
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
}`,bx=`#define NORMAL
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
}`,Sx=`#define PHONG
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
}`,wx=`#define PHONG
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
}`,Ex=`#define STANDARD
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
}`,Tx=`#define STANDARD
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
}`,Ax=`#define TOON
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
}`,Rx=`#define TOON
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
}`,Cx=`uniform float size;
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
}`,Px=`uniform vec3 diffuse;
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
}`,zx=`#include <common>
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
}`,Ix=`uniform vec3 color;
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
}`,Dx=`uniform float rotation;
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
}`,Lx=`uniform vec3 diffuse;
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
}`,Me={alphahash_fragment:n0,alphahash_pars_fragment:i0,alphamap_fragment:s0,alphamap_pars_fragment:r0,alphatest_fragment:o0,alphatest_pars_fragment:a0,aomap_fragment:l0,aomap_pars_fragment:c0,batching_pars_vertex:h0,batching_vertex:u0,begin_vertex:d0,beginnormal_vertex:f0,bsdfs:p0,iridescence_fragment:m0,bumpmap_pars_fragment:g0,clipping_planes_fragment:x0,clipping_planes_pars_fragment:v0,clipping_planes_pars_vertex:y0,clipping_planes_vertex:M0,color_fragment:_0,color_pars_fragment:b0,color_pars_vertex:S0,color_vertex:w0,common:E0,cube_uv_reflection_fragment:T0,defaultnormal_vertex:A0,displacementmap_pars_vertex:R0,displacementmap_vertex:C0,emissivemap_fragment:P0,emissivemap_pars_fragment:z0,colorspace_fragment:I0,colorspace_pars_fragment:D0,envmap_fragment:L0,envmap_common_pars_fragment:U0,envmap_pars_fragment:k0,envmap_pars_vertex:N0,envmap_physical_pars_fragment:Y0,envmap_vertex:F0,fog_vertex:O0,fog_pars_vertex:B0,fog_fragment:H0,fog_pars_fragment:G0,gradientmap_pars_fragment:V0,lightmap_pars_fragment:W0,lights_lambert_fragment:X0,lights_lambert_pars_fragment:q0,lights_pars_begin:$0,lights_toon_fragment:Z0,lights_toon_pars_fragment:j0,lights_phong_fragment:K0,lights_phong_pars_fragment:J0,lights_physical_fragment:Q0,lights_physical_pars_fragment:tg,lights_fragment_begin:eg,lights_fragment_maps:ng,lights_fragment_end:ig,logdepthbuf_fragment:sg,logdepthbuf_pars_fragment:rg,logdepthbuf_pars_vertex:og,logdepthbuf_vertex:ag,map_fragment:lg,map_pars_fragment:cg,map_particle_fragment:hg,map_particle_pars_fragment:ug,metalnessmap_fragment:dg,metalnessmap_pars_fragment:fg,morphinstance_vertex:pg,morphcolor_vertex:mg,morphnormal_vertex:gg,morphtarget_pars_vertex:xg,morphtarget_vertex:vg,normal_fragment_begin:yg,normal_fragment_maps:Mg,normal_pars_fragment:_g,normal_pars_vertex:bg,normal_vertex:Sg,normalmap_pars_fragment:wg,clearcoat_normal_fragment_begin:Eg,clearcoat_normal_fragment_maps:Tg,clearcoat_pars_fragment:Ag,iridescence_pars_fragment:Rg,opaque_fragment:Cg,packing:Pg,premultiplied_alpha_fragment:zg,project_vertex:Ig,dithering_fragment:Dg,dithering_pars_fragment:Lg,roughnessmap_fragment:Ug,roughnessmap_pars_fragment:kg,shadowmap_pars_fragment:Ng,shadowmap_pars_vertex:Fg,shadowmap_vertex:Og,shadowmask_pars_fragment:Bg,skinbase_vertex:Hg,skinning_pars_vertex:Gg,skinning_vertex:Vg,skinnormal_vertex:Wg,specularmap_fragment:Xg,specularmap_pars_fragment:qg,tonemapping_fragment:$g,tonemapping_pars_fragment:Yg,transmission_fragment:Zg,transmission_pars_fragment:jg,uv_pars_fragment:Kg,uv_pars_vertex:Jg,uv_vertex:Qg,worldpos_vertex:tx,background_vert:ex,background_frag:nx,backgroundCube_vert:ix,backgroundCube_frag:sx,cube_vert:rx,cube_frag:ox,depth_vert:ax,depth_frag:lx,distanceRGBA_vert:cx,distanceRGBA_frag:hx,equirect_vert:ux,equirect_frag:dx,linedashed_vert:fx,linedashed_frag:px,meshbasic_vert:mx,meshbasic_frag:gx,meshlambert_vert:xx,meshlambert_frag:vx,meshmatcap_vert:yx,meshmatcap_frag:Mx,meshnormal_vert:_x,meshnormal_frag:bx,meshphong_vert:Sx,meshphong_frag:wx,meshphysical_vert:Ex,meshphysical_frag:Tx,meshtoon_vert:Ax,meshtoon_frag:Rx,points_vert:Cx,points_frag:Px,shadow_vert:zx,shadow_frag:Ix,sprite_vert:Dx,sprite_frag:Lx},zt={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ve},alphaMap:{value:null},alphaMapTransform:{value:new ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ve}},envmap:{envMap:{value:null},envMapRotation:{value:new ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ve},normalScale:{value:new Wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ve},alphaTest:{value:0},uvTransform:{value:new ve}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new Wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ve},alphaMap:{value:null},alphaMapTransform:{value:new ve},alphaTest:{value:0}}},mi={basic:{uniforms:Rn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.fog]),vertexShader:Me.meshbasic_vert,fragmentShader:Me.meshbasic_frag},lambert:{uniforms:Rn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,zt.lights,{emissive:{value:new ee(0)}}]),vertexShader:Me.meshlambert_vert,fragmentShader:Me.meshlambert_frag},phong:{uniforms:Rn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,zt.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30}}]),vertexShader:Me.meshphong_vert,fragmentShader:Me.meshphong_frag},standard:{uniforms:Rn([zt.common,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.roughnessmap,zt.metalnessmap,zt.fog,zt.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Me.meshphysical_vert,fragmentShader:Me.meshphysical_frag},toon:{uniforms:Rn([zt.common,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.gradientmap,zt.fog,zt.lights,{emissive:{value:new ee(0)}}]),vertexShader:Me.meshtoon_vert,fragmentShader:Me.meshtoon_frag},matcap:{uniforms:Rn([zt.common,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,{matcap:{value:null}}]),vertexShader:Me.meshmatcap_vert,fragmentShader:Me.meshmatcap_frag},points:{uniforms:Rn([zt.points,zt.fog]),vertexShader:Me.points_vert,fragmentShader:Me.points_frag},dashed:{uniforms:Rn([zt.common,zt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Me.linedashed_vert,fragmentShader:Me.linedashed_frag},depth:{uniforms:Rn([zt.common,zt.displacementmap]),vertexShader:Me.depth_vert,fragmentShader:Me.depth_frag},normal:{uniforms:Rn([zt.common,zt.bumpmap,zt.normalmap,zt.displacementmap,{opacity:{value:1}}]),vertexShader:Me.meshnormal_vert,fragmentShader:Me.meshnormal_frag},sprite:{uniforms:Rn([zt.sprite,zt.fog]),vertexShader:Me.sprite_vert,fragmentShader:Me.sprite_frag},background:{uniforms:{uvTransform:{value:new ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Me.background_vert,fragmentShader:Me.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ve}},vertexShader:Me.backgroundCube_vert,fragmentShader:Me.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Me.cube_vert,fragmentShader:Me.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Me.equirect_vert,fragmentShader:Me.equirect_frag},distanceRGBA:{uniforms:Rn([zt.common,zt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Me.distanceRGBA_vert,fragmentShader:Me.distanceRGBA_frag},shadow:{uniforms:Rn([zt.lights,zt.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:Me.shadow_vert,fragmentShader:Me.shadow_frag}};mi.physical={uniforms:Rn([mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ve},clearcoatNormalScale:{value:new Wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ve},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ve},transmissionSamplerSize:{value:new Wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ve},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ve},anisotropyVector:{value:new Wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ve}}]),vertexShader:Me.meshphysical_vert,fragmentShader:Me.meshphysical_frag};const ea={r:0,b:0,g:0},bs=new yi,Ux=new ue;function kx(i,t,e,n,s,r,o){const a=new ee(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(y){let M=y.isScene===!0?y.background:null;return M&&M.isTexture&&(M=(y.backgroundBlurriness>0?e:t).get(M)),M}function m(y){let M=!1;const R=g(y);R===null?p(a,l):R&&R.isColor&&(p(R,1),M=!0);const E=i.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(y,M){const R=g(M);R&&(R.isCubeTexture||R.mapping===Ua)?(h===void 0&&(h=new Jt(new Gi(1,1,1),new Zn({name:"BackgroundCubeMaterial",uniforms:Cr(mi.backgroundCube.uniforms),vertexShader:mi.backgroundCube.vertexShader,fragmentShader:mi.backgroundCube.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),bs.copy(M.backgroundRotation),bs.x*=-1,bs.y*=-1,bs.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(bs.y*=-1,bs.z*=-1),h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ux.makeRotationFromEuler(bs)),h.material.toneMapped=ke.getTransfer(R.colorSpace)!==Ge,(u!==R||d!==R.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=R,d=R.version,f=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new Jt(new Ni(2,2),new Zn({name:"BackgroundMaterial",uniforms:Cr(mi.background.uniforms),vertexShader:mi.background.vertexShader,fragmentShader:mi.background.fragmentShader,side:Hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=ke.getTransfer(R.colorSpace)!==Ge,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||d!==R.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=R,d=R.version,f=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,M){y.getRGB(ea,Od(i)),n.buffers.color.setClear(ea.r,ea.g,ea.b,M,o)}function v(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,M=1){a.set(y),l=M,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:m,addToRenderList:x,dispose:v}}function Nx(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(b,U,P,G,j){let O=!1;const B=u(G,P,U);r!==B&&(r=B,c(r.object)),O=f(b,G,P,j),O&&g(b,G,P,j),j!==null&&t.update(j,i.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,M(b,U,P,G),j!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(j).buffer))}function l(){return i.createVertexArray()}function c(b){return i.bindVertexArray(b)}function h(b){return i.deleteVertexArray(b)}function u(b,U,P){const G=P.wireframe===!0;let j=n[b.id];j===void 0&&(j={},n[b.id]=j);let O=j[U.id];O===void 0&&(O={},j[U.id]=O);let B=O[G];return B===void 0&&(B=d(l()),O[G]=B),B}function d(b){const U=[],P=[],G=[];for(let j=0;j<e;j++)U[j]=0,P[j]=0,G[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:P,attributeDivisors:G,object:b,attributes:{},index:null}}function f(b,U,P,G){const j=r.attributes,O=U.attributes;let B=0;const K=P.getAttributes();for(const q in K)if(K[q].location>=0){const H=j[q];let st=O[q];if(st===void 0&&(q==="instanceMatrix"&&b.instanceMatrix&&(st=b.instanceMatrix),q==="instanceColor"&&b.instanceColor&&(st=b.instanceColor)),H===void 0||H.attribute!==st||st&&H.data!==st.data)return!0;B++}return r.attributesNum!==B||r.index!==G}function g(b,U,P,G){const j={},O=U.attributes;let B=0;const K=P.getAttributes();for(const q in K)if(K[q].location>=0){let H=O[q];H===void 0&&(q==="instanceMatrix"&&b.instanceMatrix&&(H=b.instanceMatrix),q==="instanceColor"&&b.instanceColor&&(H=b.instanceColor));const st={};st.attribute=H,H&&H.data&&(st.data=H.data),j[q]=st,B++}r.attributes=j,r.attributesNum=B,r.index=G}function m(){const b=r.newAttributes;for(let U=0,P=b.length;U<P;U++)b[U]=0}function x(b){p(b,0)}function p(b,U){const P=r.newAttributes,G=r.enabledAttributes,j=r.attributeDivisors;P[b]=1,G[b]===0&&(i.enableVertexAttribArray(b),G[b]=1),j[b]!==U&&(i.vertexAttribDivisor(b,U),j[b]=U)}function v(){const b=r.newAttributes,U=r.enabledAttributes;for(let P=0,G=U.length;P<G;P++)U[P]!==b[P]&&(i.disableVertexAttribArray(P),U[P]=0)}function y(b,U,P,G,j,O,B){B===!0?i.vertexAttribIPointer(b,U,P,j,O):i.vertexAttribPointer(b,U,P,G,j,O)}function M(b,U,P,G){m();const j=G.attributes,O=P.getAttributes(),B=U.defaultAttributeValues;for(const K in O){const q=O[K];if(q.location>=0){let Y=j[K];if(Y===void 0&&(K==="instanceMatrix"&&b.instanceMatrix&&(Y=b.instanceMatrix),K==="instanceColor"&&b.instanceColor&&(Y=b.instanceColor)),Y!==void 0){const H=Y.normalized,st=Y.itemSize,_t=t.get(Y);if(_t===void 0)continue;const ne=_t.buffer,le=_t.type,ut=_t.bytesPerElement,$=le===i.INT||le===i.UNSIGNED_INT||Y.gpuType===th;if(Y.isInterleavedBufferAttribute){const ot=Y.data,Mt=ot.stride,Xt=Y.offset;if(ot.isInstancedInterleavedBuffer){for(let Ft=0;Ft<q.locationSize;Ft++)p(q.location+Ft,ot.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Ft=0;Ft<q.locationSize;Ft++)x(q.location+Ft);i.bindBuffer(i.ARRAY_BUFFER,ne);for(let Ft=0;Ft<q.locationSize;Ft++)y(q.location+Ft,st/q.locationSize,le,H,Mt*ut,(Xt+st/q.locationSize*Ft)*ut,$)}else{if(Y.isInstancedBufferAttribute){for(let ot=0;ot<q.locationSize;ot++)p(q.location+ot,Y.meshPerAttribute);b.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ot=0;ot<q.locationSize;ot++)x(q.location+ot);i.bindBuffer(i.ARRAY_BUFFER,ne);for(let ot=0;ot<q.locationSize;ot++)y(q.location+ot,st/q.locationSize,le,H,st*ut,st/q.locationSize*ot*ut,$)}}else if(B!==void 0){const H=B[K];if(H!==void 0)switch(H.length){case 2:i.vertexAttrib2fv(q.location,H);break;case 3:i.vertexAttrib3fv(q.location,H);break;case 4:i.vertexAttrib4fv(q.location,H);break;default:i.vertexAttrib1fv(q.location,H)}}}}v()}function R(){A();for(const b in n){const U=n[b];for(const P in U){const G=U[P];for(const j in G)h(G[j].object),delete G[j];delete U[P]}delete n[b]}}function E(b){if(n[b.id]===void 0)return;const U=n[b.id];for(const P in U){const G=U[P];for(const j in G)h(G[j].object),delete G[j];delete U[P]}delete n[b.id]}function w(b){for(const U in n){const P=n[U];if(P[b.id]===void 0)continue;const G=P[b.id];for(const j in G)h(G[j].object),delete G[j];delete P[b.id]}}function A(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:S,dispose:R,releaseStatesOfGeometry:E,releaseStatesOfProgram:w,initAttributes:m,enableAttribute:x,disableUnusedAttributes:v}}function Fx(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let m=0;m<u;m++)g+=h[m]*d[m];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Ox(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==Gn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const A=w===vo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==vi&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==oi&&!A)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),x=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:m,maxCubemapSize:x,maxAttributes:p,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:M,vertexTextures:R,maxSamples:E}}function Bx(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new pi,a=new ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,m=u.clipIntersection,x=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!x)r?h(null):c();else{const v=r?0:n,y=v*4;let M=p.clippingState||null;l.value=M,M=h(g,d,y,f);for(let R=0;R!==y;++R)M[R]=e[R];p.clippingState=M,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const m=u!==null?u.length:0;let x=null;if(m!==0){if(x=l.value,g!==!0||x===null){const p=f+m*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(x===null||x.length<p)&&(x=new Float32Array(p));for(let y=0,M=f;y!==m;++y,M+=4)o.copy(u[y]).applyMatrix4(v,a),o.normal.toArray(x,M),x[M+3]=o.constant}l.value=x,l.needsUpdate=!0}return t.numPlanes=m,t.numIntersection=0,x}}function Hx(i){let t=new WeakMap;function e(o,a){return a===dc?o.mapping=Er:a===fc&&(o.mapping=Tr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===dc||a===fc)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new xm(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const mr=4,Uu=[.125,.215,.35,.446,.526,.582],Rs=20,Pl=new Kd,ku=new ee;let zl=null,Il=0,Dl=0,Ll=!1;const Es=(1+Math.sqrt(5))/2,rr=1/Es,Nu=[new L(-Es,rr,0),new L(Es,rr,0),new L(-rr,0,Es),new L(rr,0,Es),new L(0,Es,-rr),new L(0,Es,rr),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],Gx=new L;class Fu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=Gx}=r;zl=this._renderer.getRenderTarget(),Il=this._renderer.getActiveCubeFace(),Dl=this._renderer.getActiveMipmapLevel(),Ll=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Hu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(zl,Il,Dl),this._renderer.xr.enabled=Ll,t.scissorTest=!1,na(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Er||t.mapping===Tr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),zl=this._renderer.getRenderTarget(),Il=this._renderer.getActiveCubeFace(),Dl=this._renderer.getActiveMipmapLevel(),Ll=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ri,minFilter:ri,generateMipmaps:!1,type:vo,format:Gn,colorSpace:Rr,depthBuffer:!1},s=Ou(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ou(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Vx(r)),this._blurMaterial=Wx(r,t,e)}return s}_compileMaterial(t){const e=new Jt(this._lodPlanes[0],t);this._renderer.compile(e,Pl)}_sceneToCubeUV(t,e,n,s,r){const l=new kn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(ku),u.toneMapping=cs,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const m=new xn({name:"PMREM.Background",side:In,depthWrite:!1,depthTest:!1}),x=new Jt(new Gi,m);let p=!1;const v=t.background;v?v.isColor&&(m.color.copy(v),t.background=null,p=!0):(m.color.copy(ku),p=!0);for(let y=0;y<6;y++){const M=y%3;M===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):M===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));const R=this._cubeSize;na(s,M*R,y>2?R:0,R,R),u.setRenderTarget(s),p&&u.render(x,l),u.render(t,l)}x.geometry.dispose(),x.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=v}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Er||t.mapping===Tr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Hu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Jt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;na(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Pl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Nu[(s-r-1)%Nu.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Jt(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Rs-1),m=r/g,x=isFinite(r)?1+Math.floor(h*m):Rs;x>Rs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Rs}`);const p=[];let v=0;for(let w=0;w<Rs;++w){const A=w/m,S=Math.exp(-A*A/2);p.push(S),w===0?v+=S:w<x&&(v+=2*S)}for(let w=0;w<p.length;w++)p[w]=p[w]/v;d.envMap.value=t.texture,d.samples.value=x,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=g,d.mipInt.value=y-n;const M=this._sizeLods[s],R=3*M*(s>y-mr?s-y+mr:0),E=4*(this._cubeSize-M);na(e,R,E,3*M,2*M),l.setRenderTarget(e),l.render(u,Pl)}}function Vx(i){const t=[],e=[],n=[];let s=i;const r=i-mr+1+Uu.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-mr?l=Uu[o-i+mr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,m=3,x=2,p=1,v=new Float32Array(m*g*f),y=new Float32Array(x*g*f),M=new Float32Array(p*g*f);for(let E=0;E<f;E++){const w=E%3*2/3-1,A=E>2?0:-1,S=[w,A,0,w+2/3,A,0,w+2/3,A+1,0,w,A,0,w+2/3,A+1,0,w,A+1,0];v.set(S,m*g*E),y.set(d,x*g*E);const b=[E,E,E,E,E,E];M.set(b,p*g*E)}const R=new Se;R.setAttribute("position",new un(v,m)),R.setAttribute("uv",new un(y,x)),R.setAttribute("faceIndex",new un(M,p)),t.push(R),s>mr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ou(i,t,e){const n=new us(i,t,e);return n.texture.mapping=Ua,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function na(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Wx(i,t,e){const n=new Float32Array(Rs),s=new L(0,1,0);return new Zn({name:"SphericalGaussianBlur",defines:{n:Rs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:bh(),fragmentShader:`

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
		`,blending:ls,depthTest:!1,depthWrite:!1})}function Bu(){return new Zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bh(),fragmentShader:`

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
		`,blending:ls,depthTest:!1,depthWrite:!1})}function Hu(){return new Zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ls,depthTest:!1,depthWrite:!1})}function bh(){return`

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
	`}function Xx(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===dc||l===fc,h=l===Er||l===Tr;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Fu(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Fu(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function qx(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&fo("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function $x(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)t.update(d[f],i.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,g=u.attributes.position;let m=0;if(f!==null){const v=f.array;m=f.version;for(let y=0,M=v.length;y<M;y+=3){const R=v[y+0],E=v[y+1],w=v[y+2];d.push(R,E,E,w,w,R)}}else if(g!==void 0){const v=g.array;m=g.version;for(let y=0,M=v.length/3-1;y<M;y+=3){const R=y+0,E=y+1,w=y+2;d.push(R,E,E,w,w,R)}}else return;const x=new(Ud(d)?Fd:uh)(d,1);x.version=m;const p=r.get(u);p&&t.remove(p),r.set(u,x)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Yx(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let x=0;for(let p=0;p<g;p++)x+=f[p];e.update(x,n,1)}function u(d,f,g,m){if(g===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],m[p]);else{x.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,m,0,g);let p=0;for(let v=0;v<g;v++)p+=f[v]*m[v];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Zx(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function jx(i,t,e){const n=new WeakMap,s=new Le;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let b=function(){A.dispose(),n.delete(a),a.removeEventListener("dispose",b)};var f=b;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let M=0;g===!0&&(M=1),m===!0&&(M=2),x===!0&&(M=3);let R=a.attributes.position.count*M,E=1;R>t.maxTextureSize&&(E=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const w=new Float32Array(R*E*4*u),A=new kd(w,R,E,u);A.type=oi,A.needsUpdate=!0;const S=M*4;for(let U=0;U<u;U++){const P=p[U],G=v[U],j=y[U],O=R*E*4*U;for(let B=0;B<P.count;B++){const K=B*S;g===!0&&(s.fromBufferAttribute(P,B),w[O+K+0]=s.x,w[O+K+1]=s.y,w[O+K+2]=s.z,w[O+K+3]=0),m===!0&&(s.fromBufferAttribute(G,B),w[O+K+4]=s.x,w[O+K+5]=s.y,w[O+K+6]=s.z,w[O+K+7]=0),x===!0&&(s.fromBufferAttribute(j,B),w[O+K+8]=s.x,w[O+K+9]=s.y,w[O+K+10]=s.z,w[O+K+11]=j.itemSize===4?s.w:1)}}d={count:u,texture:A,size:new Wt(R,E)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let g=0;for(let x=0;x<c.length;x++)g+=c[x];const m=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Kx(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const Qd=new En,Gu=new Wd(1,1),tf=new kd,ef=new em,nf=new Hd,Vu=[],Wu=[],Xu=new Float32Array(16),qu=new Float32Array(9),$u=new Float32Array(4);function Ir(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Vu[s];if(r===void 0&&(r=new Float32Array(s),Vu[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function dn(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function fn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ba(i,t){let e=Wu[t];e===void 0&&(e=new Int32Array(t),Wu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Jx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Qx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(dn(e,t))return;i.uniform2fv(this.addr,t),fn(e,t)}}function tv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(dn(e,t))return;i.uniform3fv(this.addr,t),fn(e,t)}}function ev(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(dn(e,t))return;i.uniform4fv(this.addr,t),fn(e,t)}}function nv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(dn(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),fn(e,t)}else{if(dn(e,n))return;$u.set(n),i.uniformMatrix2fv(this.addr,!1,$u),fn(e,n)}}function iv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(dn(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),fn(e,t)}else{if(dn(e,n))return;qu.set(n),i.uniformMatrix3fv(this.addr,!1,qu),fn(e,n)}}function sv(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(dn(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),fn(e,t)}else{if(dn(e,n))return;Xu.set(n),i.uniformMatrix4fv(this.addr,!1,Xu),fn(e,n)}}function rv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function ov(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(dn(e,t))return;i.uniform2iv(this.addr,t),fn(e,t)}}function av(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(dn(e,t))return;i.uniform3iv(this.addr,t),fn(e,t)}}function lv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(dn(e,t))return;i.uniform4iv(this.addr,t),fn(e,t)}}function cv(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function hv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(dn(e,t))return;i.uniform2uiv(this.addr,t),fn(e,t)}}function uv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(dn(e,t))return;i.uniform3uiv(this.addr,t),fn(e,t)}}function dv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(dn(e,t))return;i.uniform4uiv(this.addr,t),fn(e,t)}}function fv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Gu.compareFunction=Ld,r=Gu):r=Qd,e.setTexture2D(t||r,s)}function pv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||ef,s)}function mv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||nf,s)}function gv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||tf,s)}function xv(i){switch(i){case 5126:return Jx;case 35664:return Qx;case 35665:return tv;case 35666:return ev;case 35674:return nv;case 35675:return iv;case 35676:return sv;case 5124:case 35670:return rv;case 35667:case 35671:return ov;case 35668:case 35672:return av;case 35669:case 35673:return lv;case 5125:return cv;case 36294:return hv;case 36295:return uv;case 36296:return dv;case 35678:case 36198:case 36298:case 36306:case 35682:return fv;case 35679:case 36299:case 36307:return pv;case 35680:case 36300:case 36308:case 36293:return mv;case 36289:case 36303:case 36311:case 36292:return gv}}function vv(i,t){i.uniform1fv(this.addr,t)}function yv(i,t){const e=Ir(t,this.size,2);i.uniform2fv(this.addr,e)}function Mv(i,t){const e=Ir(t,this.size,3);i.uniform3fv(this.addr,e)}function _v(i,t){const e=Ir(t,this.size,4);i.uniform4fv(this.addr,e)}function bv(i,t){const e=Ir(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Sv(i,t){const e=Ir(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function wv(i,t){const e=Ir(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Ev(i,t){i.uniform1iv(this.addr,t)}function Tv(i,t){i.uniform2iv(this.addr,t)}function Av(i,t){i.uniform3iv(this.addr,t)}function Rv(i,t){i.uniform4iv(this.addr,t)}function Cv(i,t){i.uniform1uiv(this.addr,t)}function Pv(i,t){i.uniform2uiv(this.addr,t)}function zv(i,t){i.uniform3uiv(this.addr,t)}function Iv(i,t){i.uniform4uiv(this.addr,t)}function Dv(i,t,e){const n=this.cache,s=t.length,r=Ba(e,s);dn(n,r)||(i.uniform1iv(this.addr,r),fn(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Qd,r[o])}function Lv(i,t,e){const n=this.cache,s=t.length,r=Ba(e,s);dn(n,r)||(i.uniform1iv(this.addr,r),fn(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||ef,r[o])}function Uv(i,t,e){const n=this.cache,s=t.length,r=Ba(e,s);dn(n,r)||(i.uniform1iv(this.addr,r),fn(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||nf,r[o])}function kv(i,t,e){const n=this.cache,s=t.length,r=Ba(e,s);dn(n,r)||(i.uniform1iv(this.addr,r),fn(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||tf,r[o])}function Nv(i){switch(i){case 5126:return vv;case 35664:return yv;case 35665:return Mv;case 35666:return _v;case 35674:return bv;case 35675:return Sv;case 35676:return wv;case 5124:case 35670:return Ev;case 35667:case 35671:return Tv;case 35668:case 35672:return Av;case 35669:case 35673:return Rv;case 5125:return Cv;case 36294:return Pv;case 36295:return zv;case 36296:return Iv;case 35678:case 36198:case 36298:case 36306:case 35682:return Dv;case 35679:case 36299:case 36307:return Lv;case 35680:case 36300:case 36308:case 36293:return Uv;case 36289:case 36303:case 36311:case 36292:return kv}}class Fv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=xv(e.type)}}class Ov{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Nv(e.type)}}class Bv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Ul=/(\w+)(\])?(\[|\.)?/g;function Yu(i,t){i.seq.push(t),i.map[t.id]=t}function Hv(i,t,e){const n=i.name,s=n.length;for(Ul.lastIndex=0;;){const r=Ul.exec(n),o=Ul.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Yu(e,c===void 0?new Fv(a,i,t):new Ov(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Bv(a),Yu(e,u)),e=u}}}class wa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Hv(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Zu(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Gv=37297;let Vv=0;function Wv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const ju=new ve;function Xv(i){ke._getMatrix(ju,ke.workingColorSpace,i);const t=`mat3( ${ju.elements.map(e=>e.toFixed(4))} )`;switch(ke.getTransfer(i)){case Ta:return[t,"LinearTransferOETF"];case Ge:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Ku(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+Wv(i.getShaderSource(t),a)}else return r}function qv(i,t){const e=Xv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function $v(i,t){let e;switch(t){case pp:e="Linear";break;case mp:e="Reinhard";break;case gp:e="Cineon";break;case Ed:e="ACESFilmic";break;case vp:e="AgX";break;case yp:e="Neutral";break;case xp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ia=new L;function Yv(){ke.getLuminanceCoefficients(ia);const i=ia.x.toFixed(4),t=ia.y.toFixed(4),e=ia.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Zv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Jr).join(`
`)}function jv(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Kv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Jr(i){return i!==""}function Ju(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Qu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Jv=/^[ \t]*#include +<([\w\d./]+)>/gm;function qc(i){return i.replace(Jv,ty)}const Qv=new Map;function ty(i,t){let e=Me[t];if(e===void 0){const n=Qv.get(t);if(n!==void 0)e=Me[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return qc(e)}const ey=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function td(i){return i.replace(ey,ny)}function ny(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ed(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function iy(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Sd?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===$f?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Di&&(t="SHADOWMAP_TYPE_VSM"),t}function sy(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Er:case Tr:t="ENVMAP_TYPE_CUBE";break;case Ua:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ry(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Tr:t="ENVMAP_MODE_REFRACTION";break}return t}function oy(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case wd:t="ENVMAP_BLENDING_MULTIPLY";break;case dp:t="ENVMAP_BLENDING_MIX";break;case fp:t="ENVMAP_BLENDING_ADD";break}return t}function ay(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function ly(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=iy(e),c=sy(e),h=ry(e),u=oy(e),d=ay(e),f=Zv(e),g=jv(r),m=s.createProgram();let x,p,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Jr).join(`
`),x.length>0&&(x+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Jr).join(`
`),p.length>0&&(p+=`
`)):(x=[ed(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Jr).join(`
`),p=[ed(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==cs?"#define TONE_MAPPING":"",e.toneMapping!==cs?Me.tonemapping_pars_fragment:"",e.toneMapping!==cs?$v("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Me.colorspace_pars_fragment,qv("linearToOutputTexel",e.outputColorSpace),Yv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Jr).join(`
`)),o=qc(o),o=Ju(o,e),o=Qu(o,e),a=qc(a),a=Ju(a,e),a=Qu(a,e),o=td(o),a=td(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,x=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,p=["#define varying in",e.glslVersion===Zh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Zh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=v+x+o,M=v+p+a,R=Zu(s,s.VERTEX_SHADER,y),E=Zu(s,s.FRAGMENT_SHADER,M);s.attachShader(m,R),s.attachShader(m,E),e.index0AttributeName!==void 0?s.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function w(U){if(i.debug.checkShaderErrors){const P=s.getProgramInfoLog(m)||"",G=s.getShaderInfoLog(R)||"",j=s.getShaderInfoLog(E)||"",O=P.trim(),B=G.trim(),K=j.trim();let q=!0,Y=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,R,E);else{const H=Ku(s,R,"vertex"),st=Ku(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+O+`
`+H+`
`+st)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(B===""||K==="")&&(Y=!1);Y&&(U.diagnostics={runnable:q,programLog:O,vertexShader:{log:B,prefix:x},fragmentShader:{log:K,prefix:p}})}s.deleteShader(R),s.deleteShader(E),A=new wa(s,m),S=Kv(s,m)}let A;this.getUniforms=function(){return A===void 0&&w(this),A};let S;this.getAttributes=function(){return S===void 0&&w(this),S};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(m,Gv)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Vv++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=R,this.fragmentShader=E,this}let cy=0;class hy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new uy(t),e.set(t,n)),n}}class uy{constructor(t){this.id=cy++,this.code=t,this.usedTimes=0}}function dy(i,t,e,n,s,r,o){const a=new hh,l=new hy,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(S){return c.add(S),S===0?"uv":`uv${S}`}function x(S,b,U,P,G){const j=P.fog,O=G.geometry,B=S.isMeshStandardMaterial?P.environment:null,K=(S.isMeshStandardMaterial?e:t).get(S.envMap||B),q=K&&K.mapping===Ua?K.image.height:null,Y=g[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const H=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,st=H!==void 0?H.length:0;let _t=0;O.morphAttributes.position!==void 0&&(_t=1),O.morphAttributes.normal!==void 0&&(_t=2),O.morphAttributes.color!==void 0&&(_t=3);let ne,le,ut,$;if(Y){const ye=mi[Y];ne=ye.vertexShader,le=ye.fragmentShader}else ne=S.vertexShader,le=S.fragmentShader,l.update(S),ut=l.getVertexShaderID(S),$=l.getFragmentShaderID(S);const ot=i.getRenderTarget(),Mt=i.state.buffers.depth.getReversed(),Xt=G.isInstancedMesh===!0,Ft=G.isBatchedMesh===!0,pe=!!S.map,we=!!S.matcap,D=!!K,ie=!!S.aoMap,jt=!!S.lightMap,Yt=!!S.bumpMap,Lt=!!S.normalMap,re=!!S.displacementMap,mt=!!S.emissiveMap,bt=!!S.metalnessMap,he=!!S.roughnessMap,ze=S.anisotropy>0,I=S.clearcoat>0,T=S.dispersion>0,tt=S.iridescence>0,lt=S.sheen>0,ct=S.transmission>0,at=ze&&!!S.anisotropyMap,Ut=I&&!!S.clearcoatMap,ht=I&&!!S.clearcoatNormalMap,Et=I&&!!S.clearcoatRoughnessMap,It=tt&&!!S.iridescenceMap,gt=tt&&!!S.iridescenceThicknessMap,Ct=lt&&!!S.sheenColorMap,Qt=lt&&!!S.sheenRoughnessMap,Ht=!!S.specularMap,wt=!!S.specularColorMap,de=!!S.specularIntensityMap,X=ct&&!!S.transmissionMap,yt=ct&&!!S.thicknessMap,Tt=!!S.gradientMap,Ot=!!S.alphaMap,xt=S.alphaTest>0,dt=!!S.alphaHash,Gt=!!S.extensions;let fe=cs;S.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(fe=i.toneMapping);const Be={shaderID:Y,shaderType:S.type,shaderName:S.name,vertexShader:ne,fragmentShader:le,defines:S.defines,customVertexShaderID:ut,customFragmentShaderID:$,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Ft,batchingColor:Ft&&G._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&G.instanceColor!==null,instancingMorph:Xt&&G.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ot===null?i.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Rr,alphaToCoverage:!!S.alphaToCoverage,map:pe,matcap:we,envMap:D,envMapMode:D&&K.mapping,envMapCubeUVHeight:q,aoMap:ie,lightMap:jt,bumpMap:Yt,normalMap:Lt,displacementMap:d&&re,emissiveMap:mt,normalMapObjectSpace:Lt&&S.normalMapType===wp,normalMapTangentSpace:Lt&&S.normalMapType===ah,metalnessMap:bt,roughnessMap:he,anisotropy:ze,anisotropyMap:at,clearcoat:I,clearcoatMap:Ut,clearcoatNormalMap:ht,clearcoatRoughnessMap:Et,dispersion:T,iridescence:tt,iridescenceMap:It,iridescenceThicknessMap:gt,sheen:lt,sheenColorMap:Ct,sheenRoughnessMap:Qt,specularMap:Ht,specularColorMap:wt,specularIntensityMap:de,transmission:ct,transmissionMap:X,thicknessMap:yt,gradientMap:Tt,opaque:S.transparent===!1&&S.blending===yr&&S.alphaToCoverage===!1,alphaMap:Ot,alphaTest:xt,alphaHash:dt,combine:S.combine,mapUv:pe&&m(S.map.channel),aoMapUv:ie&&m(S.aoMap.channel),lightMapUv:jt&&m(S.lightMap.channel),bumpMapUv:Yt&&m(S.bumpMap.channel),normalMapUv:Lt&&m(S.normalMap.channel),displacementMapUv:re&&m(S.displacementMap.channel),emissiveMapUv:mt&&m(S.emissiveMap.channel),metalnessMapUv:bt&&m(S.metalnessMap.channel),roughnessMapUv:he&&m(S.roughnessMap.channel),anisotropyMapUv:at&&m(S.anisotropyMap.channel),clearcoatMapUv:Ut&&m(S.clearcoatMap.channel),clearcoatNormalMapUv:ht&&m(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&m(S.clearcoatRoughnessMap.channel),iridescenceMapUv:It&&m(S.iridescenceMap.channel),iridescenceThicknessMapUv:gt&&m(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&m(S.sheenColorMap.channel),sheenRoughnessMapUv:Qt&&m(S.sheenRoughnessMap.channel),specularMapUv:Ht&&m(S.specularMap.channel),specularColorMapUv:wt&&m(S.specularColorMap.channel),specularIntensityMapUv:de&&m(S.specularIntensityMap.channel),transmissionMapUv:X&&m(S.transmissionMap.channel),thicknessMapUv:yt&&m(S.thicknessMap.channel),alphaMapUv:Ot&&m(S.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Lt||ze),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!O.attributes.uv&&(pe||Ot),fog:!!j,useFog:S.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Mt,skinning:G.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:st,morphTextureStride:_t,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:fe,decodeVideoTexture:pe&&S.map.isVideoTexture===!0&&ke.getTransfer(S.map.colorSpace)===Ge,decodeVideoTextureEmissive:mt&&S.emissiveMap.isVideoTexture===!0&&ke.getTransfer(S.emissiveMap.colorSpace)===Ge,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Ce,flipSided:S.side===In,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Gt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&S.extensions.multiDraw===!0||Ft)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Be.vertexUv1s=c.has(1),Be.vertexUv2s=c.has(2),Be.vertexUv3s=c.has(3),c.clear(),Be}function p(S){const b=[];if(S.shaderID?b.push(S.shaderID):(b.push(S.customVertexShaderID),b.push(S.customFragmentShaderID)),S.defines!==void 0)for(const U in S.defines)b.push(U),b.push(S.defines[U]);return S.isRawShaderMaterial===!1&&(v(b,S),y(b,S),b.push(i.outputColorSpace)),b.push(S.customProgramCacheKey),b.join()}function v(S,b){S.push(b.precision),S.push(b.outputColorSpace),S.push(b.envMapMode),S.push(b.envMapCubeUVHeight),S.push(b.mapUv),S.push(b.alphaMapUv),S.push(b.lightMapUv),S.push(b.aoMapUv),S.push(b.bumpMapUv),S.push(b.normalMapUv),S.push(b.displacementMapUv),S.push(b.emissiveMapUv),S.push(b.metalnessMapUv),S.push(b.roughnessMapUv),S.push(b.anisotropyMapUv),S.push(b.clearcoatMapUv),S.push(b.clearcoatNormalMapUv),S.push(b.clearcoatRoughnessMapUv),S.push(b.iridescenceMapUv),S.push(b.iridescenceThicknessMapUv),S.push(b.sheenColorMapUv),S.push(b.sheenRoughnessMapUv),S.push(b.specularMapUv),S.push(b.specularColorMapUv),S.push(b.specularIntensityMapUv),S.push(b.transmissionMapUv),S.push(b.thicknessMapUv),S.push(b.combine),S.push(b.fogExp2),S.push(b.sizeAttenuation),S.push(b.morphTargetsCount),S.push(b.morphAttributeCount),S.push(b.numDirLights),S.push(b.numPointLights),S.push(b.numSpotLights),S.push(b.numSpotLightMaps),S.push(b.numHemiLights),S.push(b.numRectAreaLights),S.push(b.numDirLightShadows),S.push(b.numPointLightShadows),S.push(b.numSpotLightShadows),S.push(b.numSpotLightShadowsWithMaps),S.push(b.numLightProbes),S.push(b.shadowMapType),S.push(b.toneMapping),S.push(b.numClippingPlanes),S.push(b.numClipIntersection),S.push(b.depthPacking)}function y(S,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),S.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),S.push(a.mask)}function M(S){const b=g[S.type];let U;if(b){const P=mi[b];U=Ca.clone(P.uniforms)}else U=S.uniforms;return U}function R(S,b){let U;for(let P=0,G=h.length;P<G;P++){const j=h[P];if(j.cacheKey===b){U=j,++U.usedTimes;break}}return U===void 0&&(U=new ly(i,b,S,r),h.push(U)),U}function E(S){if(--S.usedTimes===0){const b=h.indexOf(S);h[b]=h[h.length-1],h.pop(),S.destroy()}}function w(S){l.remove(S)}function A(){l.dispose()}return{getParameters:x,getProgramCacheKey:p,getUniforms:M,acquireProgram:R,releaseProgram:E,releaseShaderCache:w,programs:h,dispose:A}}function fy(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function py(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function nd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function id(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,g,m,x){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:m,group:x},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=m,p.group=x),t++,p}function a(u,d,f,g,m,x){const p=o(u,d,f,g,m,x);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(u,d,f,g,m,x){const p=o(u,d,f,g,m,x);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||py),n.length>1&&n.sort(d||nd),s.length>1&&s.sort(d||nd)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function my(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new id,i.set(n,[o])):s>=r.length?(o=new id,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function gy(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new ee};break;case"SpotLight":e={position:new L,direction:new L,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new ee,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":e={color:new ee,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function xy(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let vy=0;function yy(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function My(i){const t=new gy,e=xy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const s=new L,r=new ue,o=new ue;function a(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,g=0,m=0,x=0,p=0,v=0,y=0,M=0,R=0,E=0,w=0;c.sort(yy);for(let S=0,b=c.length;S<b;S++){const U=c[S],P=U.color,G=U.intensity,j=U.distance,O=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)h+=P.r*G,u+=P.g*G,d+=P.b*G;else if(U.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(U.sh.coefficients[B],G);w++}else if(U.isDirectionalLight){const B=t.get(U);if(B.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const K=U.shadow,q=e.get(U);q.shadowIntensity=K.intensity,q.shadowBias=K.bias,q.shadowNormalBias=K.normalBias,q.shadowRadius=K.radius,q.shadowMapSize=K.mapSize,n.directionalShadow[f]=q,n.directionalShadowMap[f]=O,n.directionalShadowMatrix[f]=U.shadow.matrix,v++}n.directional[f]=B,f++}else if(U.isSpotLight){const B=t.get(U);B.position.setFromMatrixPosition(U.matrixWorld),B.color.copy(P).multiplyScalar(G),B.distance=j,B.coneCos=Math.cos(U.angle),B.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),B.decay=U.decay,n.spot[m]=B;const K=U.shadow;if(U.map&&(n.spotLightMap[R]=U.map,R++,K.updateMatrices(U),U.castShadow&&E++),n.spotLightMatrix[m]=K.matrix,U.castShadow){const q=e.get(U);q.shadowIntensity=K.intensity,q.shadowBias=K.bias,q.shadowNormalBias=K.normalBias,q.shadowRadius=K.radius,q.shadowMapSize=K.mapSize,n.spotShadow[m]=q,n.spotShadowMap[m]=O,M++}m++}else if(U.isRectAreaLight){const B=t.get(U);B.color.copy(P).multiplyScalar(G),B.halfWidth.set(U.width*.5,0,0),B.halfHeight.set(0,U.height*.5,0),n.rectArea[x]=B,x++}else if(U.isPointLight){const B=t.get(U);if(B.color.copy(U.color).multiplyScalar(U.intensity),B.distance=U.distance,B.decay=U.decay,U.castShadow){const K=U.shadow,q=e.get(U);q.shadowIntensity=K.intensity,q.shadowBias=K.bias,q.shadowNormalBias=K.normalBias,q.shadowRadius=K.radius,q.shadowMapSize=K.mapSize,q.shadowCameraNear=K.camera.near,q.shadowCameraFar=K.camera.far,n.pointShadow[g]=q,n.pointShadowMap[g]=O,n.pointShadowMatrix[g]=U.shadow.matrix,y++}n.point[g]=B,g++}else if(U.isHemisphereLight){const B=t.get(U);B.skyColor.copy(U.color).multiplyScalar(G),B.groundColor.copy(U.groundColor).multiplyScalar(G),n.hemi[p]=B,p++}}x>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=zt.LTC_FLOAT_1,n.rectAreaLTC2=zt.LTC_FLOAT_2):(n.rectAreaLTC1=zt.LTC_HALF_1,n.rectAreaLTC2=zt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const A=n.hash;(A.directionalLength!==f||A.pointLength!==g||A.spotLength!==m||A.rectAreaLength!==x||A.hemiLength!==p||A.numDirectionalShadows!==v||A.numPointShadows!==y||A.numSpotShadows!==M||A.numSpotMaps!==R||A.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=m,n.rectArea.length=x,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=M+R-E,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=w,A.directionalLength=f,A.pointLength=g,A.spotLength=m,A.rectAreaLength=x,A.hemiLength=p,A.numDirectionalShadows=v,A.numPointShadows=y,A.numSpotShadows=M,A.numSpotMaps=R,A.numLightProbes=w,n.version=vy++)}function l(c,h){let u=0,d=0,f=0,g=0,m=0;const x=h.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){const y=c[p];if(y.isDirectionalLight){const M=n.directional[u];M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(x),u++}else if(y.isSpotLight){const M=n.spot[f];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(x),M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(x),f++}else if(y.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(x),o.identity(),r.copy(y.matrixWorld),r.premultiply(x),o.extractRotation(r),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const M=n.point[d];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(x),d++}else if(y.isHemisphereLight){const M=n.hemi[m];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(x),m++}}}return{setup:a,setupView:l,state:n}}function sd(i){const t=new My(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function _y(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new sd(i),t.set(s,[a])):r>=o.length?(a=new sd(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const by=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Sy=`uniform sampler2D shadow_pass;
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
}`;function wy(i,t,e){let n=new ph;const s=new Wt,r=new Wt,o=new Le,a=new Xm({depthPacking:Sp}),l=new qm,c={},h=e.maxTextureSize,u={[Hi]:In,[In]:Hi,[Ce]:Ce},d=new Zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Wt},radius:{value:4}},vertexShader:by,fragmentShader:Sy}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Se;g.setAttribute("position",new un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new Jt(g,d),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sd;let p=this.type;this.render=function(E,w,A){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||E.length===0)return;const S=i.getRenderTarget(),b=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),P=i.state;P.setBlending(ls),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const G=p!==Di&&this.type===Di,j=p===Di&&this.type!==Di;for(let O=0,B=E.length;O<B;O++){const K=E[O],q=K.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);const Y=q.getFrameExtents();if(s.multiply(Y),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Y.x),s.x=r.x*Y.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Y.y),s.y=r.y*Y.y,q.mapSize.y=r.y)),q.map===null||G===!0||j===!0){const st=this.type!==Di?{minFilter:Vn,magFilter:Vn}:{};q.map!==null&&q.map.dispose(),q.map=new us(s.x,s.y,st),q.map.texture.name=K.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();const H=q.getViewportCount();for(let st=0;st<H;st++){const _t=q.getViewport(st);o.set(r.x*_t.x,r.y*_t.y,r.x*_t.z,r.y*_t.w),P.viewport(o),q.updateMatrices(K,st),n=q.getFrustum(),M(w,A,q.camera,K,this.type)}q.isPointLightShadow!==!0&&this.type===Di&&v(q,A),q.needsUpdate=!1}p=this.type,x.needsUpdate=!1,i.setRenderTarget(S,b,U)};function v(E,w){const A=t.update(m);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new us(s.x,s.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(w,null,A,d,m,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(w,null,A,f,m,null)}function y(E,w,A,S){let b=null;const U=A.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(U!==void 0)b=U;else if(b=A.isPointLight===!0?l:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const P=b.uuid,G=w.uuid;let j=c[P];j===void 0&&(j={},c[P]=j);let O=j[G];O===void 0&&(O=b.clone(),j[G]=O,w.addEventListener("dispose",R)),b=O}if(b.visible=w.visible,b.wireframe=w.wireframe,S===Di?b.side=w.shadowSide!==null?w.shadowSide:w.side:b.side=w.shadowSide!==null?w.shadowSide:u[w.side],b.alphaMap=w.alphaMap,b.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,b.map=w.map,b.clipShadows=w.clipShadows,b.clippingPlanes=w.clippingPlanes,b.clipIntersection=w.clipIntersection,b.displacementMap=w.displacementMap,b.displacementScale=w.displacementScale,b.displacementBias=w.displacementBias,b.wireframeLinewidth=w.wireframeLinewidth,b.linewidth=w.linewidth,A.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const P=i.properties.get(b);P.light=A}return b}function M(E,w,A,S,b){if(E.visible===!1)return;if(E.layers.test(w.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&b===Di)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,E.matrixWorld);const G=t.update(E),j=E.material;if(Array.isArray(j)){const O=G.groups;for(let B=0,K=O.length;B<K;B++){const q=O[B],Y=j[q.materialIndex];if(Y&&Y.visible){const H=y(E,Y,S,b);E.onBeforeShadow(i,E,w,A,G,H,q),i.renderBufferDirect(A,null,G,H,E,q),E.onAfterShadow(i,E,w,A,G,H,q)}}}else if(j.visible){const O=y(E,j,S,b);E.onBeforeShadow(i,E,w,A,G,O,null),i.renderBufferDirect(A,null,G,O,E,null),E.onAfterShadow(i,E,w,A,G,O,null)}}const P=E.children;for(let G=0,j=P.length;G<j;G++)M(P[G],w,A,S,b)}function R(E){E.target.removeEventListener("dispose",R);for(const A in c){const S=c[A],b=E.target.uuid;b in S&&(S[b].dispose(),delete S[b])}}}const Ey={[rc]:oc,[ac]:hc,[lc]:uc,[wr]:cc,[oc]:rc,[hc]:ac,[uc]:lc,[cc]:wr};function Ty(i,t){function e(){let X=!1;const yt=new Le;let Tt=null;const Ot=new Le(0,0,0,0);return{setMask:function(xt){Tt!==xt&&!X&&(i.colorMask(xt,xt,xt,xt),Tt=xt)},setLocked:function(xt){X=xt},setClear:function(xt,dt,Gt,fe,Be){Be===!0&&(xt*=fe,dt*=fe,Gt*=fe),yt.set(xt,dt,Gt,fe),Ot.equals(yt)===!1&&(i.clearColor(xt,dt,Gt,fe),Ot.copy(yt))},reset:function(){X=!1,Tt=null,Ot.set(-1,0,0,0)}}}function n(){let X=!1,yt=!1,Tt=null,Ot=null,xt=null;return{setReversed:function(dt){if(yt!==dt){const Gt=t.get("EXT_clip_control");dt?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT),yt=dt;const fe=xt;xt=null,this.setClear(fe)}},getReversed:function(){return yt},setTest:function(dt){dt?ot(i.DEPTH_TEST):Mt(i.DEPTH_TEST)},setMask:function(dt){Tt!==dt&&!X&&(i.depthMask(dt),Tt=dt)},setFunc:function(dt){if(yt&&(dt=Ey[dt]),Ot!==dt){switch(dt){case rc:i.depthFunc(i.NEVER);break;case oc:i.depthFunc(i.ALWAYS);break;case ac:i.depthFunc(i.LESS);break;case wr:i.depthFunc(i.LEQUAL);break;case lc:i.depthFunc(i.EQUAL);break;case cc:i.depthFunc(i.GEQUAL);break;case hc:i.depthFunc(i.GREATER);break;case uc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ot=dt}},setLocked:function(dt){X=dt},setClear:function(dt){xt!==dt&&(yt&&(dt=1-dt),i.clearDepth(dt),xt=dt)},reset:function(){X=!1,Tt=null,Ot=null,xt=null,yt=!1}}}function s(){let X=!1,yt=null,Tt=null,Ot=null,xt=null,dt=null,Gt=null,fe=null,Be=null;return{setTest:function(ye){X||(ye?ot(i.STENCIL_TEST):Mt(i.STENCIL_TEST))},setMask:function(ye){yt!==ye&&!X&&(i.stencilMask(ye),yt=ye)},setFunc:function(ye,Kn,vn){(Tt!==ye||Ot!==Kn||xt!==vn)&&(i.stencilFunc(ye,Kn,vn),Tt=ye,Ot=Kn,xt=vn)},setOp:function(ye,Kn,vn){(dt!==ye||Gt!==Kn||fe!==vn)&&(i.stencilOp(ye,Kn,vn),dt=ye,Gt=Kn,fe=vn)},setLocked:function(ye){X=ye},setClear:function(ye){Be!==ye&&(i.clearStencil(ye),Be=ye)},reset:function(){X=!1,yt=null,Tt=null,Ot=null,xt=null,dt=null,Gt=null,fe=null,Be=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,m=!1,x=null,p=null,v=null,y=null,M=null,R=null,E=null,w=new ee(0,0,0),A=0,S=!1,b=null,U=null,P=null,G=null,j=null;const O=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,K=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(q)[1]),B=K>=1):q.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),B=K>=2);let Y=null,H={};const st=i.getParameter(i.SCISSOR_BOX),_t=i.getParameter(i.VIEWPORT),ne=new Le().fromArray(st),le=new Le().fromArray(_t);function ut(X,yt,Tt,Ot){const xt=new Uint8Array(4),dt=i.createTexture();i.bindTexture(X,dt),i.texParameteri(X,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(X,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Gt=0;Gt<Tt;Gt++)X===i.TEXTURE_3D||X===i.TEXTURE_2D_ARRAY?i.texImage3D(yt,0,i.RGBA,1,1,Ot,0,i.RGBA,i.UNSIGNED_BYTE,xt):i.texImage2D(yt+Gt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xt);return dt}const $={};$[i.TEXTURE_2D]=ut(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=ut(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[i.TEXTURE_2D_ARRAY]=ut(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=ut(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ot(i.DEPTH_TEST),o.setFunc(wr),Yt(!1),Lt(Gh),ot(i.CULL_FACE),ie(ls);function ot(X){h[X]!==!0&&(i.enable(X),h[X]=!0)}function Mt(X){h[X]!==!1&&(i.disable(X),h[X]=!1)}function Xt(X,yt){return u[X]!==yt?(i.bindFramebuffer(X,yt),u[X]=yt,X===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=yt),X===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=yt),!0):!1}function Ft(X,yt){let Tt=f,Ot=!1;if(X){Tt=d.get(yt),Tt===void 0&&(Tt=[],d.set(yt,Tt));const xt=X.textures;if(Tt.length!==xt.length||Tt[0]!==i.COLOR_ATTACHMENT0){for(let dt=0,Gt=xt.length;dt<Gt;dt++)Tt[dt]=i.COLOR_ATTACHMENT0+dt;Tt.length=xt.length,Ot=!0}}else Tt[0]!==i.BACK&&(Tt[0]=i.BACK,Ot=!0);Ot&&i.drawBuffers(Tt)}function pe(X){return g!==X?(i.useProgram(X),g=X,!0):!1}const we={[As]:i.FUNC_ADD,[Zf]:i.FUNC_SUBTRACT,[jf]:i.FUNC_REVERSE_SUBTRACT};we[Kf]=i.MIN,we[Jf]=i.MAX;const D={[Qf]:i.ZERO,[tp]:i.ONE,[ep]:i.SRC_COLOR,[ic]:i.SRC_ALPHA,[ap]:i.SRC_ALPHA_SATURATE,[rp]:i.DST_COLOR,[ip]:i.DST_ALPHA,[np]:i.ONE_MINUS_SRC_COLOR,[sc]:i.ONE_MINUS_SRC_ALPHA,[op]:i.ONE_MINUS_DST_COLOR,[sp]:i.ONE_MINUS_DST_ALPHA,[lp]:i.CONSTANT_COLOR,[cp]:i.ONE_MINUS_CONSTANT_COLOR,[hp]:i.CONSTANT_ALPHA,[up]:i.ONE_MINUS_CONSTANT_ALPHA};function ie(X,yt,Tt,Ot,xt,dt,Gt,fe,Be,ye){if(X===ls){m===!0&&(Mt(i.BLEND),m=!1);return}if(m===!1&&(ot(i.BLEND),m=!0),X!==Yf){if(X!==x||ye!==S){if((p!==As||M!==As)&&(i.blendEquation(i.FUNC_ADD),p=As,M=As),ye)switch(X){case yr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vh:i.blendFunc(i.ONE,i.ONE);break;case Wh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}else switch(X){case yr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Wh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Xh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}v=null,y=null,R=null,E=null,w.set(0,0,0),A=0,x=X,S=ye}return}xt=xt||yt,dt=dt||Tt,Gt=Gt||Ot,(yt!==p||xt!==M)&&(i.blendEquationSeparate(we[yt],we[xt]),p=yt,M=xt),(Tt!==v||Ot!==y||dt!==R||Gt!==E)&&(i.blendFuncSeparate(D[Tt],D[Ot],D[dt],D[Gt]),v=Tt,y=Ot,R=dt,E=Gt),(fe.equals(w)===!1||Be!==A)&&(i.blendColor(fe.r,fe.g,fe.b,Be),w.copy(fe),A=Be),x=X,S=!1}function jt(X,yt){X.side===Ce?Mt(i.CULL_FACE):ot(i.CULL_FACE);let Tt=X.side===In;yt&&(Tt=!Tt),Yt(Tt),X.blending===yr&&X.transparent===!1?ie(ls):ie(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),o.setFunc(X.depthFunc),o.setTest(X.depthTest),o.setMask(X.depthWrite),r.setMask(X.colorWrite);const Ot=X.stencilWrite;a.setTest(Ot),Ot&&(a.setMask(X.stencilWriteMask),a.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),a.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),mt(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?ot(i.SAMPLE_ALPHA_TO_COVERAGE):Mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Yt(X){b!==X&&(X?i.frontFace(i.CW):i.frontFace(i.CCW),b=X)}function Lt(X){X!==Xf?(ot(i.CULL_FACE),X!==U&&(X===Gh?i.cullFace(i.BACK):X===qf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Mt(i.CULL_FACE),U=X}function re(X){X!==P&&(B&&i.lineWidth(X),P=X)}function mt(X,yt,Tt){X?(ot(i.POLYGON_OFFSET_FILL),(G!==yt||j!==Tt)&&(i.polygonOffset(yt,Tt),G=yt,j=Tt)):Mt(i.POLYGON_OFFSET_FILL)}function bt(X){X?ot(i.SCISSOR_TEST):Mt(i.SCISSOR_TEST)}function he(X){X===void 0&&(X=i.TEXTURE0+O-1),Y!==X&&(i.activeTexture(X),Y=X)}function ze(X,yt,Tt){Tt===void 0&&(Y===null?Tt=i.TEXTURE0+O-1:Tt=Y);let Ot=H[Tt];Ot===void 0&&(Ot={type:void 0,texture:void 0},H[Tt]=Ot),(Ot.type!==X||Ot.texture!==yt)&&(Y!==Tt&&(i.activeTexture(Tt),Y=Tt),i.bindTexture(X,yt||$[X]),Ot.type=X,Ot.texture=yt)}function I(){const X=H[Y];X!==void 0&&X.type!==void 0&&(i.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function T(){try{i.compressedTexImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function tt(){try{i.compressedTexImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function lt(){try{i.texSubImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function ct(){try{i.texSubImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function at(){try{i.compressedTexSubImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Ut(){try{i.compressedTexSubImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function ht(){try{i.texStorage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Et(){try{i.texStorage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function It(){try{i.texImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function gt(){try{i.texImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Ct(X){ne.equals(X)===!1&&(i.scissor(X.x,X.y,X.z,X.w),ne.copy(X))}function Qt(X){le.equals(X)===!1&&(i.viewport(X.x,X.y,X.z,X.w),le.copy(X))}function Ht(X,yt){let Tt=c.get(yt);Tt===void 0&&(Tt=new WeakMap,c.set(yt,Tt));let Ot=Tt.get(X);Ot===void 0&&(Ot=i.getUniformBlockIndex(yt,X.name),Tt.set(X,Ot))}function wt(X,yt){const Ot=c.get(yt).get(X);l.get(yt)!==Ot&&(i.uniformBlockBinding(yt,Ot,X.__bindingPointIndex),l.set(yt,Ot))}function de(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Y=null,H={},u={},d=new WeakMap,f=[],g=null,m=!1,x=null,p=null,v=null,y=null,M=null,R=null,E=null,w=new ee(0,0,0),A=0,S=!1,b=null,U=null,P=null,G=null,j=null,ne.set(0,0,i.canvas.width,i.canvas.height),le.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ot,disable:Mt,bindFramebuffer:Xt,drawBuffers:Ft,useProgram:pe,setBlending:ie,setMaterial:jt,setFlipSided:Yt,setCullFace:Lt,setLineWidth:re,setPolygonOffset:mt,setScissorTest:bt,activeTexture:he,bindTexture:ze,unbindTexture:I,compressedTexImage2D:T,compressedTexImage3D:tt,texImage2D:It,texImage3D:gt,updateUBOMapping:Ht,uniformBlockBinding:wt,texStorage2D:ht,texStorage3D:Et,texSubImage2D:lt,texSubImage3D:ct,compressedTexSubImage2D:at,compressedTexSubImage3D:Ut,scissor:Ct,viewport:Qt,reset:de}}function Ay(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Wt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,T){return f?new OffscreenCanvas(I,T):Ra("canvas")}function m(I,T,tt){let lt=1;const ct=ze(I);if((ct.width>tt||ct.height>tt)&&(lt=tt/Math.max(ct.width,ct.height)),lt<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const at=Math.floor(lt*ct.width),Ut=Math.floor(lt*ct.height);u===void 0&&(u=g(at,Ut));const ht=T?g(at,Ut):u;return ht.width=at,ht.height=Ut,ht.getContext("2d").drawImage(I,0,0,at,Ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ct.width+"x"+ct.height+") to ("+at+"x"+Ut+")."),ht}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ct.width+"x"+ct.height+")."),I;return I}function x(I){return I.generateMipmaps}function p(I){i.generateMipmap(I)}function v(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(I,T,tt,lt,ct=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let at=T;if(T===i.RED&&(tt===i.FLOAT&&(at=i.R32F),tt===i.HALF_FLOAT&&(at=i.R16F),tt===i.UNSIGNED_BYTE&&(at=i.R8)),T===i.RED_INTEGER&&(tt===i.UNSIGNED_BYTE&&(at=i.R8UI),tt===i.UNSIGNED_SHORT&&(at=i.R16UI),tt===i.UNSIGNED_INT&&(at=i.R32UI),tt===i.BYTE&&(at=i.R8I),tt===i.SHORT&&(at=i.R16I),tt===i.INT&&(at=i.R32I)),T===i.RG&&(tt===i.FLOAT&&(at=i.RG32F),tt===i.HALF_FLOAT&&(at=i.RG16F),tt===i.UNSIGNED_BYTE&&(at=i.RG8)),T===i.RG_INTEGER&&(tt===i.UNSIGNED_BYTE&&(at=i.RG8UI),tt===i.UNSIGNED_SHORT&&(at=i.RG16UI),tt===i.UNSIGNED_INT&&(at=i.RG32UI),tt===i.BYTE&&(at=i.RG8I),tt===i.SHORT&&(at=i.RG16I),tt===i.INT&&(at=i.RG32I)),T===i.RGB_INTEGER&&(tt===i.UNSIGNED_BYTE&&(at=i.RGB8UI),tt===i.UNSIGNED_SHORT&&(at=i.RGB16UI),tt===i.UNSIGNED_INT&&(at=i.RGB32UI),tt===i.BYTE&&(at=i.RGB8I),tt===i.SHORT&&(at=i.RGB16I),tt===i.INT&&(at=i.RGB32I)),T===i.RGBA_INTEGER&&(tt===i.UNSIGNED_BYTE&&(at=i.RGBA8UI),tt===i.UNSIGNED_SHORT&&(at=i.RGBA16UI),tt===i.UNSIGNED_INT&&(at=i.RGBA32UI),tt===i.BYTE&&(at=i.RGBA8I),tt===i.SHORT&&(at=i.RGBA16I),tt===i.INT&&(at=i.RGBA32I)),T===i.RGB&&(tt===i.UNSIGNED_INT_5_9_9_9_REV&&(at=i.RGB9_E5),tt===i.UNSIGNED_INT_10F_11F_11F_REV&&(at=i.R11F_G11F_B10F)),T===i.RGBA){const Ut=ct?Ta:ke.getTransfer(lt);tt===i.FLOAT&&(at=i.RGBA32F),tt===i.HALF_FLOAT&&(at=i.RGBA16F),tt===i.UNSIGNED_BYTE&&(at=Ut===Ge?i.SRGB8_ALPHA8:i.RGBA8),tt===i.UNSIGNED_SHORT_4_4_4_4&&(at=i.RGBA4),tt===i.UNSIGNED_SHORT_5_5_5_1&&(at=i.RGB5_A1)}return(at===i.R16F||at===i.R32F||at===i.RG16F||at===i.RG32F||at===i.RGBA16F||at===i.RGBA32F)&&t.get("EXT_color_buffer_float"),at}function M(I,T){let tt;return I?T===null||T===zs||T===lo?tt=i.DEPTH24_STENCIL8:T===oi?tt=i.DEPTH32F_STENCIL8:T===ao&&(tt=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===zs||T===lo?tt=i.DEPTH_COMPONENT24:T===oi?tt=i.DEPTH_COMPONENT32F:T===ao&&(tt=i.DEPTH_COMPONENT16),tt}function R(I,T){return x(I)===!0||I.isFramebufferTexture&&I.minFilter!==Vn&&I.minFilter!==ri?Math.log2(Math.max(T.width,T.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?T.mipmaps.length:1}function E(I){const T=I.target;T.removeEventListener("dispose",E),A(T),T.isVideoTexture&&h.delete(T)}function w(I){const T=I.target;T.removeEventListener("dispose",w),b(T)}function A(I){const T=n.get(I);if(T.__webglInit===void 0)return;const tt=I.source,lt=d.get(tt);if(lt){const ct=lt[T.__cacheKey];ct.usedTimes--,ct.usedTimes===0&&S(I),Object.keys(lt).length===0&&d.delete(tt)}n.remove(I)}function S(I){const T=n.get(I);i.deleteTexture(T.__webglTexture);const tt=I.source,lt=d.get(tt);delete lt[T.__cacheKey],o.memory.textures--}function b(I){const T=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let lt=0;lt<6;lt++){if(Array.isArray(T.__webglFramebuffer[lt]))for(let ct=0;ct<T.__webglFramebuffer[lt].length;ct++)i.deleteFramebuffer(T.__webglFramebuffer[lt][ct]);else i.deleteFramebuffer(T.__webglFramebuffer[lt]);T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer[lt])}else{if(Array.isArray(T.__webglFramebuffer))for(let lt=0;lt<T.__webglFramebuffer.length;lt++)i.deleteFramebuffer(T.__webglFramebuffer[lt]);else i.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&i.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let lt=0;lt<T.__webglColorRenderbuffer.length;lt++)T.__webglColorRenderbuffer[lt]&&i.deleteRenderbuffer(T.__webglColorRenderbuffer[lt]);T.__webglDepthRenderbuffer&&i.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const tt=I.textures;for(let lt=0,ct=tt.length;lt<ct;lt++){const at=n.get(tt[lt]);at.__webglTexture&&(i.deleteTexture(at.__webglTexture),o.memory.textures--),n.remove(tt[lt])}n.remove(I)}let U=0;function P(){U=0}function G(){const I=U;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),U+=1,I}function j(I){const T=[];return T.push(I.wrapS),T.push(I.wrapT),T.push(I.wrapR||0),T.push(I.magFilter),T.push(I.minFilter),T.push(I.anisotropy),T.push(I.internalFormat),T.push(I.format),T.push(I.type),T.push(I.generateMipmaps),T.push(I.premultiplyAlpha),T.push(I.flipY),T.push(I.unpackAlignment),T.push(I.colorSpace),T.join()}function O(I,T){const tt=n.get(I);if(I.isVideoTexture&&bt(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&tt.__version!==I.version){const lt=I.image;if(lt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(lt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(tt,I,T);return}}else I.isExternalTexture&&(tt.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,tt.__webglTexture,i.TEXTURE0+T)}function B(I,T){const tt=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&tt.__version!==I.version){$(tt,I,T);return}e.bindTexture(i.TEXTURE_2D_ARRAY,tt.__webglTexture,i.TEXTURE0+T)}function K(I,T){const tt=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&tt.__version!==I.version){$(tt,I,T);return}e.bindTexture(i.TEXTURE_3D,tt.__webglTexture,i.TEXTURE0+T)}function q(I,T){const tt=n.get(I);if(I.version>0&&tt.__version!==I.version){ot(tt,I,T);return}e.bindTexture(i.TEXTURE_CUBE_MAP,tt.__webglTexture,i.TEXTURE0+T)}const Y={[Ar]:i.REPEAT,[rs]:i.CLAMP_TO_EDGE,[pc]:i.MIRRORED_REPEAT},H={[Vn]:i.NEAREST,[_p]:i.NEAREST_MIPMAP_NEAREST,[Co]:i.NEAREST_MIPMAP_LINEAR,[ri]:i.LINEAR,[Ja]:i.LINEAR_MIPMAP_NEAREST,[os]:i.LINEAR_MIPMAP_LINEAR},st={[Ep]:i.NEVER,[zp]:i.ALWAYS,[Tp]:i.LESS,[Ld]:i.LEQUAL,[Ap]:i.EQUAL,[Pp]:i.GEQUAL,[Rp]:i.GREATER,[Cp]:i.NOTEQUAL};function _t(I,T){if(T.type===oi&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===ri||T.magFilter===Ja||T.magFilter===Co||T.magFilter===os||T.minFilter===ri||T.minFilter===Ja||T.minFilter===Co||T.minFilter===os)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,Y[T.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,Y[T.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,Y[T.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,H[T.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,H[T.minFilter]),T.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,st[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Vn||T.minFilter!==Co&&T.minFilter!==os||T.type===oi&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const tt=t.get("EXT_texture_filter_anisotropic");i.texParameterf(I,tt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function ne(I,T){let tt=!1;I.__webglInit===void 0&&(I.__webglInit=!0,T.addEventListener("dispose",E));const lt=T.source;let ct=d.get(lt);ct===void 0&&(ct={},d.set(lt,ct));const at=j(T);if(at!==I.__cacheKey){ct[at]===void 0&&(ct[at]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,tt=!0),ct[at].usedTimes++;const Ut=ct[I.__cacheKey];Ut!==void 0&&(ct[I.__cacheKey].usedTimes--,Ut.usedTimes===0&&S(T)),I.__cacheKey=at,I.__webglTexture=ct[at].texture}return tt}function le(I,T,tt){return Math.floor(Math.floor(I/tt)/T)}function ut(I,T,tt,lt){const at=I.updateRanges;if(at.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,T.width,T.height,tt,lt,T.data);else{at.sort((gt,Ct)=>gt.start-Ct.start);let Ut=0;for(let gt=1;gt<at.length;gt++){const Ct=at[Ut],Qt=at[gt],Ht=Ct.start+Ct.count,wt=le(Qt.start,T.width,4),de=le(Ct.start,T.width,4);Qt.start<=Ht+1&&wt===de&&le(Qt.start+Qt.count-1,T.width,4)===wt?Ct.count=Math.max(Ct.count,Qt.start+Qt.count-Ct.start):(++Ut,at[Ut]=Qt)}at.length=Ut+1;const ht=i.getParameter(i.UNPACK_ROW_LENGTH),Et=i.getParameter(i.UNPACK_SKIP_PIXELS),It=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,T.width);for(let gt=0,Ct=at.length;gt<Ct;gt++){const Qt=at[gt],Ht=Math.floor(Qt.start/4),wt=Math.ceil(Qt.count/4),de=Ht%T.width,X=Math.floor(Ht/T.width),yt=wt,Tt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,de),i.pixelStorei(i.UNPACK_SKIP_ROWS,X),e.texSubImage2D(i.TEXTURE_2D,0,de,X,yt,Tt,tt,lt,T.data)}I.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ht),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Et),i.pixelStorei(i.UNPACK_SKIP_ROWS,It)}}function $(I,T,tt){let lt=i.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(lt=i.TEXTURE_2D_ARRAY),T.isData3DTexture&&(lt=i.TEXTURE_3D);const ct=ne(I,T),at=T.source;e.bindTexture(lt,I.__webglTexture,i.TEXTURE0+tt);const Ut=n.get(at);if(at.version!==Ut.__version||ct===!0){e.activeTexture(i.TEXTURE0+tt);const ht=ke.getPrimaries(ke.workingColorSpace),Et=T.colorSpace===Li?null:ke.getPrimaries(T.colorSpace),It=T.colorSpace===Li||ht===Et?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);let gt=m(T.image,!1,s.maxTextureSize);gt=he(T,gt);const Ct=r.convert(T.format,T.colorSpace),Qt=r.convert(T.type);let Ht=y(T.internalFormat,Ct,Qt,T.colorSpace,T.isVideoTexture);_t(lt,T);let wt;const de=T.mipmaps,X=T.isVideoTexture!==!0,yt=Ut.__version===void 0||ct===!0,Tt=at.dataReady,Ot=R(T,gt);if(T.isDepthTexture)Ht=M(T.format===ho,T.type),yt&&(X?e.texStorage2D(i.TEXTURE_2D,1,Ht,gt.width,gt.height):e.texImage2D(i.TEXTURE_2D,0,Ht,gt.width,gt.height,0,Ct,Qt,null));else if(T.isDataTexture)if(de.length>0){X&&yt&&e.texStorage2D(i.TEXTURE_2D,Ot,Ht,de[0].width,de[0].height);for(let xt=0,dt=de.length;xt<dt;xt++)wt=de[xt],X?Tt&&e.texSubImage2D(i.TEXTURE_2D,xt,0,0,wt.width,wt.height,Ct,Qt,wt.data):e.texImage2D(i.TEXTURE_2D,xt,Ht,wt.width,wt.height,0,Ct,Qt,wt.data);T.generateMipmaps=!1}else X?(yt&&e.texStorage2D(i.TEXTURE_2D,Ot,Ht,gt.width,gt.height),Tt&&ut(T,gt,Ct,Qt)):e.texImage2D(i.TEXTURE_2D,0,Ht,gt.width,gt.height,0,Ct,Qt,gt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){X&&yt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ot,Ht,de[0].width,de[0].height,gt.depth);for(let xt=0,dt=de.length;xt<dt;xt++)if(wt=de[xt],T.format!==Gn)if(Ct!==null)if(X){if(Tt)if(T.layerUpdates.size>0){const Gt=Lu(wt.width,wt.height,T.format,T.type);for(const fe of T.layerUpdates){const Be=wt.data.subarray(fe*Gt/wt.data.BYTES_PER_ELEMENT,(fe+1)*Gt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,fe,wt.width,wt.height,1,Ct,Be)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,0,wt.width,wt.height,gt.depth,Ct,wt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,xt,Ht,wt.width,wt.height,gt.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else X?Tt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,0,wt.width,wt.height,gt.depth,Ct,Qt,wt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,xt,Ht,wt.width,wt.height,gt.depth,0,Ct,Qt,wt.data)}else{X&&yt&&e.texStorage2D(i.TEXTURE_2D,Ot,Ht,de[0].width,de[0].height);for(let xt=0,dt=de.length;xt<dt;xt++)wt=de[xt],T.format!==Gn?Ct!==null?X?Tt&&e.compressedTexSubImage2D(i.TEXTURE_2D,xt,0,0,wt.width,wt.height,Ct,wt.data):e.compressedTexImage2D(i.TEXTURE_2D,xt,Ht,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):X?Tt&&e.texSubImage2D(i.TEXTURE_2D,xt,0,0,wt.width,wt.height,Ct,Qt,wt.data):e.texImage2D(i.TEXTURE_2D,xt,Ht,wt.width,wt.height,0,Ct,Qt,wt.data)}else if(T.isDataArrayTexture)if(X){if(yt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ot,Ht,gt.width,gt.height,gt.depth),Tt)if(T.layerUpdates.size>0){const xt=Lu(gt.width,gt.height,T.format,T.type);for(const dt of T.layerUpdates){const Gt=gt.data.subarray(dt*xt/gt.data.BYTES_PER_ELEMENT,(dt+1)*xt/gt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,dt,gt.width,gt.height,1,Ct,Qt,Gt)}T.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,gt.width,gt.height,gt.depth,Ct,Qt,gt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ht,gt.width,gt.height,gt.depth,0,Ct,Qt,gt.data);else if(T.isData3DTexture)X?(yt&&e.texStorage3D(i.TEXTURE_3D,Ot,Ht,gt.width,gt.height,gt.depth),Tt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,gt.width,gt.height,gt.depth,Ct,Qt,gt.data)):e.texImage3D(i.TEXTURE_3D,0,Ht,gt.width,gt.height,gt.depth,0,Ct,Qt,gt.data);else if(T.isFramebufferTexture){if(yt)if(X)e.texStorage2D(i.TEXTURE_2D,Ot,Ht,gt.width,gt.height);else{let xt=gt.width,dt=gt.height;for(let Gt=0;Gt<Ot;Gt++)e.texImage2D(i.TEXTURE_2D,Gt,Ht,xt,dt,0,Ct,Qt,null),xt>>=1,dt>>=1}}else if(de.length>0){if(X&&yt){const xt=ze(de[0]);e.texStorage2D(i.TEXTURE_2D,Ot,Ht,xt.width,xt.height)}for(let xt=0,dt=de.length;xt<dt;xt++)wt=de[xt],X?Tt&&e.texSubImage2D(i.TEXTURE_2D,xt,0,0,Ct,Qt,wt):e.texImage2D(i.TEXTURE_2D,xt,Ht,Ct,Qt,wt);T.generateMipmaps=!1}else if(X){if(yt){const xt=ze(gt);e.texStorage2D(i.TEXTURE_2D,Ot,Ht,xt.width,xt.height)}Tt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Ct,Qt,gt)}else e.texImage2D(i.TEXTURE_2D,0,Ht,Ct,Qt,gt);x(T)&&p(lt),Ut.__version=at.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function ot(I,T,tt){if(T.image.length!==6)return;const lt=ne(I,T),ct=T.source;e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+tt);const at=n.get(ct);if(ct.version!==at.__version||lt===!0){e.activeTexture(i.TEXTURE0+tt);const Ut=ke.getPrimaries(ke.workingColorSpace),ht=T.colorSpace===Li?null:ke.getPrimaries(T.colorSpace),Et=T.colorSpace===Li||Ut===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);const It=T.isCompressedTexture||T.image[0].isCompressedTexture,gt=T.image[0]&&T.image[0].isDataTexture,Ct=[];for(let dt=0;dt<6;dt++)!It&&!gt?Ct[dt]=m(T.image[dt],!0,s.maxCubemapSize):Ct[dt]=gt?T.image[dt].image:T.image[dt],Ct[dt]=he(T,Ct[dt]);const Qt=Ct[0],Ht=r.convert(T.format,T.colorSpace),wt=r.convert(T.type),de=y(T.internalFormat,Ht,wt,T.colorSpace),X=T.isVideoTexture!==!0,yt=at.__version===void 0||lt===!0,Tt=ct.dataReady;let Ot=R(T,Qt);_t(i.TEXTURE_CUBE_MAP,T);let xt;if(It){X&&yt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ot,de,Qt.width,Qt.height);for(let dt=0;dt<6;dt++){xt=Ct[dt].mipmaps;for(let Gt=0;Gt<xt.length;Gt++){const fe=xt[Gt];T.format!==Gn?Ht!==null?X?Tt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Gt,0,0,fe.width,fe.height,Ht,fe.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Gt,de,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?Tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Gt,0,0,fe.width,fe.height,Ht,wt,fe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Gt,de,fe.width,fe.height,0,Ht,wt,fe.data)}}}else{if(xt=T.mipmaps,X&&yt){xt.length>0&&Ot++;const dt=ze(Ct[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ot,de,dt.width,dt.height)}for(let dt=0;dt<6;dt++)if(gt){X?Tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,Ct[dt].width,Ct[dt].height,Ht,wt,Ct[dt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,de,Ct[dt].width,Ct[dt].height,0,Ht,wt,Ct[dt].data);for(let Gt=0;Gt<xt.length;Gt++){const Be=xt[Gt].image[dt].image;X?Tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Gt+1,0,0,Be.width,Be.height,Ht,wt,Be.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Gt+1,de,Be.width,Be.height,0,Ht,wt,Be.data)}}else{X?Tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,Ht,wt,Ct[dt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,de,Ht,wt,Ct[dt]);for(let Gt=0;Gt<xt.length;Gt++){const fe=xt[Gt];X?Tt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Gt+1,0,0,Ht,wt,fe.image[dt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,Gt+1,de,Ht,wt,fe.image[dt])}}}x(T)&&p(i.TEXTURE_CUBE_MAP),at.__version=ct.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function Mt(I,T,tt,lt,ct,at){const Ut=r.convert(tt.format,tt.colorSpace),ht=r.convert(tt.type),Et=y(tt.internalFormat,Ut,ht,tt.colorSpace),It=n.get(T),gt=n.get(tt);if(gt.__renderTarget=T,!It.__hasExternalTextures){const Ct=Math.max(1,T.width>>at),Qt=Math.max(1,T.height>>at);ct===i.TEXTURE_3D||ct===i.TEXTURE_2D_ARRAY?e.texImage3D(ct,at,Et,Ct,Qt,T.depth,0,Ut,ht,null):e.texImage2D(ct,at,Et,Ct,Qt,0,Ut,ht,null)}e.bindFramebuffer(i.FRAMEBUFFER,I),mt(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,lt,ct,gt.__webglTexture,0,re(T)):(ct===i.TEXTURE_2D||ct>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ct<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,lt,ct,gt.__webglTexture,at),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Xt(I,T,tt){if(i.bindRenderbuffer(i.RENDERBUFFER,I),T.depthBuffer){const lt=T.depthTexture,ct=lt&&lt.isDepthTexture?lt.type:null,at=M(T.stencilBuffer,ct),Ut=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=re(T);mt(T)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht,at,T.width,T.height):tt?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,at,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,at,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ut,i.RENDERBUFFER,I)}else{const lt=T.textures;for(let ct=0;ct<lt.length;ct++){const at=lt[ct],Ut=r.convert(at.format,at.colorSpace),ht=r.convert(at.type),Et=y(at.internalFormat,Ut,ht,at.colorSpace),It=re(T);tt&&mt(T)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,It,Et,T.width,T.height):mt(T)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,It,Et,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,Et,T.width,T.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ft(I,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,I),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const lt=n.get(T.depthTexture);lt.__renderTarget=T,(!lt.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),O(T.depthTexture,0);const ct=lt.__webglTexture,at=re(T);if(T.depthTexture.format===co)mt(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ct,0,at):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ct,0);else if(T.depthTexture.format===ho)mt(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ct,0,at):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ct,0);else throw new Error("Unknown depthTexture format")}function pe(I){const T=n.get(I),tt=I.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==I.depthTexture){const lt=I.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),lt){const ct=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,lt.removeEventListener("dispose",ct)};lt.addEventListener("dispose",ct),T.__depthDisposeCallback=ct}T.__boundDepthTexture=lt}if(I.depthTexture&&!T.__autoAllocateDepthBuffer){if(tt)throw new Error("target.depthTexture not supported in Cube render targets");const lt=I.texture.mipmaps;lt&&lt.length>0?Ft(T.__webglFramebuffer[0],I):Ft(T.__webglFramebuffer,I)}else if(tt){T.__webglDepthbuffer=[];for(let lt=0;lt<6;lt++)if(e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[lt]),T.__webglDepthbuffer[lt]===void 0)T.__webglDepthbuffer[lt]=i.createRenderbuffer(),Xt(T.__webglDepthbuffer[lt],I,!1);else{const ct=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=T.__webglDepthbuffer[lt];i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,ct,i.RENDERBUFFER,at)}}else{const lt=I.texture.mipmaps;if(lt&&lt.length>0?e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=i.createRenderbuffer(),Xt(T.__webglDepthbuffer,I,!1);else{const ct=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=T.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,ct,i.RENDERBUFFER,at)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function we(I,T,tt){const lt=n.get(I);T!==void 0&&Mt(lt.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),tt!==void 0&&pe(I)}function D(I){const T=I.texture,tt=n.get(I),lt=n.get(T);I.addEventListener("dispose",w);const ct=I.textures,at=I.isWebGLCubeRenderTarget===!0,Ut=ct.length>1;if(Ut||(lt.__webglTexture===void 0&&(lt.__webglTexture=i.createTexture()),lt.__version=T.version,o.memory.textures++),at){tt.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(T.mipmaps&&T.mipmaps.length>0){tt.__webglFramebuffer[ht]=[];for(let Et=0;Et<T.mipmaps.length;Et++)tt.__webglFramebuffer[ht][Et]=i.createFramebuffer()}else tt.__webglFramebuffer[ht]=i.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){tt.__webglFramebuffer=[];for(let ht=0;ht<T.mipmaps.length;ht++)tt.__webglFramebuffer[ht]=i.createFramebuffer()}else tt.__webglFramebuffer=i.createFramebuffer();if(Ut)for(let ht=0,Et=ct.length;ht<Et;ht++){const It=n.get(ct[ht]);It.__webglTexture===void 0&&(It.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&mt(I)===!1){tt.__webglMultisampledFramebuffer=i.createFramebuffer(),tt.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,tt.__webglMultisampledFramebuffer);for(let ht=0;ht<ct.length;ht++){const Et=ct[ht];tt.__webglColorRenderbuffer[ht]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,tt.__webglColorRenderbuffer[ht]);const It=r.convert(Et.format,Et.colorSpace),gt=r.convert(Et.type),Ct=y(Et.internalFormat,It,gt,Et.colorSpace,I.isXRRenderTarget===!0),Qt=re(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,Qt,Ct,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,tt.__webglColorRenderbuffer[ht])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(tt.__webglDepthRenderbuffer=i.createRenderbuffer(),Xt(tt.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(at){e.bindTexture(i.TEXTURE_CUBE_MAP,lt.__webglTexture),_t(i.TEXTURE_CUBE_MAP,T);for(let ht=0;ht<6;ht++)if(T.mipmaps&&T.mipmaps.length>0)for(let Et=0;Et<T.mipmaps.length;Et++)Mt(tt.__webglFramebuffer[ht][Et],I,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Et);else Mt(tt.__webglFramebuffer[ht],I,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);x(T)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ut){for(let ht=0,Et=ct.length;ht<Et;ht++){const It=ct[ht],gt=n.get(It);let Ct=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Ct=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Ct,gt.__webglTexture),_t(Ct,It),Mt(tt.__webglFramebuffer,I,It,i.COLOR_ATTACHMENT0+ht,Ct,0),x(It)&&p(Ct)}e.unbindTexture()}else{let ht=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ht=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,lt.__webglTexture),_t(ht,T),T.mipmaps&&T.mipmaps.length>0)for(let Et=0;Et<T.mipmaps.length;Et++)Mt(tt.__webglFramebuffer[Et],I,T,i.COLOR_ATTACHMENT0,ht,Et);else Mt(tt.__webglFramebuffer,I,T,i.COLOR_ATTACHMENT0,ht,0);x(T)&&p(ht),e.unbindTexture()}I.depthBuffer&&pe(I)}function ie(I){const T=I.textures;for(let tt=0,lt=T.length;tt<lt;tt++){const ct=T[tt];if(x(ct)){const at=v(I),Ut=n.get(ct).__webglTexture;e.bindTexture(at,Ut),p(at),e.unbindTexture()}}}const jt=[],Yt=[];function Lt(I){if(I.samples>0){if(mt(I)===!1){const T=I.textures,tt=I.width,lt=I.height;let ct=i.COLOR_BUFFER_BIT;const at=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ut=n.get(I),ht=T.length>1;if(ht)for(let It=0;It<T.length;It++)e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer);const Et=I.texture.mipmaps;Et&&Et.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer);for(let It=0;It<T.length;It++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ct|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ct|=i.STENCIL_BUFFER_BIT)),ht){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ut.__webglColorRenderbuffer[It]);const gt=n.get(T[It]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,gt,0)}i.blitFramebuffer(0,0,tt,lt,0,0,tt,lt,ct,i.NEAREST),l===!0&&(jt.length=0,Yt.length=0,jt.push(i.COLOR_ATTACHMENT0+It),I.depthBuffer&&I.resolveDepthBuffer===!1&&(jt.push(at),Yt.push(at),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Yt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,jt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ht)for(let It=0;It<T.length;It++){e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.RENDERBUFFER,Ut.__webglColorRenderbuffer[It]);const gt=n.get(T[It]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.TEXTURE_2D,gt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const T=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[T])}}}function re(I){return Math.min(s.maxSamples,I.samples)}function mt(I){const T=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function bt(I){const T=o.render.frame;h.get(I)!==T&&(h.set(I,T),I.update())}function he(I,T){const tt=I.colorSpace,lt=I.format,ct=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||tt!==Rr&&tt!==Li&&(ke.getTransfer(tt)===Ge?(lt!==Gn||ct!==vi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",tt)),T}function ze(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=P,this.setTexture2D=O,this.setTexture2DArray=B,this.setTexture3D=K,this.setTextureCube=q,this.rebindTextures=we,this.setupRenderTarget=D,this.updateRenderTargetMipmap=ie,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=mt}function Ry(i,t){function e(n,s=Li){let r;const o=ke.getTransfer(s);if(n===vi)return i.UNSIGNED_BYTE;if(n===eh)return i.UNSIGNED_SHORT_4_4_4_4;if(n===nh)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Cd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Pd)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ad)return i.BYTE;if(n===Rd)return i.SHORT;if(n===ao)return i.UNSIGNED_SHORT;if(n===th)return i.INT;if(n===zs)return i.UNSIGNED_INT;if(n===oi)return i.FLOAT;if(n===vo)return i.HALF_FLOAT;if(n===zd)return i.ALPHA;if(n===Id)return i.RGB;if(n===Gn)return i.RGBA;if(n===co)return i.DEPTH_COMPONENT;if(n===ho)return i.DEPTH_STENCIL;if(n===ih)return i.RED;if(n===sh)return i.RED_INTEGER;if(n===Dd)return i.RG;if(n===rh)return i.RG_INTEGER;if(n===oh)return i.RGBA_INTEGER;if(n===Ma||n===_a||n===ba||n===Sa)if(o===Ge)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ma)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===_a)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ma)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===_a)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ba)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Sa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===mc||n===gc||n===xc||n===vc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===mc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===gc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===xc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===vc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===yc||n===Mc||n===_c)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===yc||n===Mc)return o===Ge?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===_c)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===bc||n===Sc||n===wc||n===Ec||n===Tc||n===Ac||n===Rc||n===Cc||n===Pc||n===zc||n===Ic||n===Dc||n===Lc||n===Uc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===bc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Sc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ec)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Tc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ac)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Rc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Cc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Pc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===zc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ic)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Dc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Lc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Uc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===kc||n===Nc||n===Fc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===kc)return o===Ge?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Nc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Fc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Oc||n===Bc||n===Hc||n===Gc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Oc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Bc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Hc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Gc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===lo?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const Cy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Py=`
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

}`;class zy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Xd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Zn({vertexShader:Cy,fragmentShader:Py,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Jt(new Ni(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Iy extends zr{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const m=typeof XRWebGLBinding<"u",x=new zy,p={},v=e.getContextAttributes();let y=null,M=null;const R=[],E=[],w=new Wt;let A=null;const S=new kn;S.viewport=new Le;const b=new kn;b.viewport=new Le;const U=[S,b],P=new Qm;let G=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ot=R[$];return ot===void 0&&(ot=new yl,R[$]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function($){let ot=R[$];return ot===void 0&&(ot=new yl,R[$]=ot),ot.getGripSpace()},this.getHand=function($){let ot=R[$];return ot===void 0&&(ot=new yl,R[$]=ot),ot.getHandSpace()};function O($){const ot=E.indexOf($.inputSource);if(ot===-1)return;const Mt=R[ot];Mt!==void 0&&(Mt.update($.inputSource,$.frame,c||o),Mt.dispatchEvent({type:$.type,data:$.inputSource}))}function B(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",K);for(let $=0;$<R.length;$++){const ot=E[$];ot!==null&&(E[$]=null,R[$].disconnect(ot))}G=null,j=null,x.reset();for(const $ in p)delete p[$];t.setRenderTarget(y),f=null,d=null,u=null,s=null,M=null,ut.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",B),s.addEventListener("inputsourceschange",K),v.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(w),m&&"createProjectionLayer"in XRWebGLBinding.prototype){let Mt=null,Xt=null,Ft=null;v.depth&&(Ft=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Mt=v.stencil?ho:co,Xt=v.stencil?lo:zs);const pe={colorFormat:e.RGBA8,depthFormat:Ft,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(pe),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new us(d.textureWidth,d.textureHeight,{format:Gn,type:vi,depthTexture:new Wd(d.textureWidth,d.textureHeight,Xt,void 0,void 0,void 0,void 0,void 0,void 0,Mt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Mt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,Mt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new us(f.framebufferWidth,f.framebufferHeight,{format:Gn,type:vi,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ut.setContext(s),ut.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function K($){for(let ot=0;ot<$.removed.length;ot++){const Mt=$.removed[ot],Xt=E.indexOf(Mt);Xt>=0&&(E[Xt]=null,R[Xt].disconnect(Mt))}for(let ot=0;ot<$.added.length;ot++){const Mt=$.added[ot];let Xt=E.indexOf(Mt);if(Xt===-1){for(let pe=0;pe<R.length;pe++)if(pe>=E.length){E.push(Mt),Xt=pe;break}else if(E[pe]===null){E[pe]=Mt,Xt=pe;break}if(Xt===-1)break}const Ft=R[Xt];Ft&&Ft.connect(Mt)}}const q=new L,Y=new L;function H($,ot,Mt){q.setFromMatrixPosition(ot.matrixWorld),Y.setFromMatrixPosition(Mt.matrixWorld);const Xt=q.distanceTo(Y),Ft=ot.projectionMatrix.elements,pe=Mt.projectionMatrix.elements,we=Ft[14]/(Ft[10]-1),D=Ft[14]/(Ft[10]+1),ie=(Ft[9]+1)/Ft[5],jt=(Ft[9]-1)/Ft[5],Yt=(Ft[8]-1)/Ft[0],Lt=(pe[8]+1)/pe[0],re=we*Yt,mt=we*Lt,bt=Xt/(-Yt+Lt),he=bt*-Yt;if(ot.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(he),$.translateZ(bt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ft[10]===-1)$.projectionMatrix.copy(ot.projectionMatrix),$.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{const ze=we+bt,I=D+bt,T=re-he,tt=mt+(Xt-he),lt=ie*D/I*ze,ct=jt*D/I*ze;$.projectionMatrix.makePerspective(T,tt,lt,ct,ze,I),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function st($,ot){ot===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ot.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let ot=$.near,Mt=$.far;x.texture!==null&&(x.depthNear>0&&(ot=x.depthNear),x.depthFar>0&&(Mt=x.depthFar)),P.near=b.near=S.near=ot,P.far=b.far=S.far=Mt,(G!==P.near||j!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),G=P.near,j=P.far),P.layers.mask=$.layers.mask|6,S.layers.mask=P.layers.mask&3,b.layers.mask=P.layers.mask&5;const Xt=$.parent,Ft=P.cameras;st(P,Xt);for(let pe=0;pe<Ft.length;pe++)st(Ft[pe],Xt);Ft.length===2?H(P,S,b):P.projectionMatrix.copy(S.projectionMatrix),_t($,P,Xt)};function _t($,ot,Mt){Mt===null?$.matrix.copy(ot.matrixWorld):($.matrix.copy(Mt.matrixWorld),$.matrix.invert(),$.matrix.multiply(ot.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ot.projectionMatrix),$.projectionMatrixInverse.copy(ot.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=uo*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(P)},this.getCameraTexture=function($){return p[$]};let ne=null;function le($,ot){if(h=ot.getViewerPose(c||o),g=ot,h!==null){const Mt=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let Xt=!1;Mt.length!==P.cameras.length&&(P.cameras.length=0,Xt=!0);for(let D=0;D<Mt.length;D++){const ie=Mt[D];let jt=null;if(f!==null)jt=f.getViewport(ie);else{const Lt=u.getViewSubImage(d,ie);jt=Lt.viewport,D===0&&(t.setRenderTargetTextures(M,Lt.colorTexture,Lt.depthStencilTexture),t.setRenderTarget(M))}let Yt=U[D];Yt===void 0&&(Yt=new kn,Yt.layers.enable(D),Yt.viewport=new Le,U[D]=Yt),Yt.matrix.fromArray(ie.transform.matrix),Yt.matrix.decompose(Yt.position,Yt.quaternion,Yt.scale),Yt.projectionMatrix.fromArray(ie.projectionMatrix),Yt.projectionMatrixInverse.copy(Yt.projectionMatrix).invert(),Yt.viewport.set(jt.x,jt.y,jt.width,jt.height),D===0&&(P.matrix.copy(Yt.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Xt===!0&&P.cameras.push(Yt)}const Ft=s.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&m){u=n.getBinding();const D=u.getDepthInformation(Mt[0]);D&&D.isValid&&D.texture&&x.init(D,s.renderState)}if(Ft&&Ft.includes("camera-access")&&m){t.state.unbindTexture(),u=n.getBinding();for(let D=0;D<Mt.length;D++){const ie=Mt[D].camera;if(ie){let jt=p[ie];jt||(jt=new Xd,p[ie]=jt);const Yt=u.getCameraImage(ie);jt.sourceTexture=Yt}}}}for(let Mt=0;Mt<R.length;Mt++){const Xt=E[Mt],Ft=R[Mt];Xt!==null&&Ft!==void 0&&Ft.update(Xt,ot,c||o)}ne&&ne($,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),g=null}const ut=new Jd;ut.setAnimationLoop(le),this.setAnimationLoop=function($){ne=$},this.dispose=function(){}}}const Ss=new yi,Dy=new ue;function Ly(i,t){function e(x,p){x.matrixAutoUpdate===!0&&x.updateMatrix(),p.value.copy(x.matrix)}function n(x,p){p.color.getRGB(x.fogColor.value,Od(i)),p.isFog?(x.fogNear.value=p.near,x.fogFar.value=p.far):p.isFogExp2&&(x.fogDensity.value=p.density)}function s(x,p,v,y,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(x,p):p.isMeshToonMaterial?(r(x,p),u(x,p)):p.isMeshPhongMaterial?(r(x,p),h(x,p)):p.isMeshStandardMaterial?(r(x,p),d(x,p),p.isMeshPhysicalMaterial&&f(x,p,M)):p.isMeshMatcapMaterial?(r(x,p),g(x,p)):p.isMeshDepthMaterial?r(x,p):p.isMeshDistanceMaterial?(r(x,p),m(x,p)):p.isMeshNormalMaterial?r(x,p):p.isLineBasicMaterial?(o(x,p),p.isLineDashedMaterial&&a(x,p)):p.isPointsMaterial?l(x,p,v,y):p.isSpriteMaterial?c(x,p):p.isShadowMaterial?(x.color.value.copy(p.color),x.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(x,p){x.opacity.value=p.opacity,p.color&&x.diffuse.value.copy(p.color),p.emissive&&x.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(x.map.value=p.map,e(p.map,x.mapTransform)),p.alphaMap&&(x.alphaMap.value=p.alphaMap,e(p.alphaMap,x.alphaMapTransform)),p.bumpMap&&(x.bumpMap.value=p.bumpMap,e(p.bumpMap,x.bumpMapTransform),x.bumpScale.value=p.bumpScale,p.side===In&&(x.bumpScale.value*=-1)),p.normalMap&&(x.normalMap.value=p.normalMap,e(p.normalMap,x.normalMapTransform),x.normalScale.value.copy(p.normalScale),p.side===In&&x.normalScale.value.negate()),p.displacementMap&&(x.displacementMap.value=p.displacementMap,e(p.displacementMap,x.displacementMapTransform),x.displacementScale.value=p.displacementScale,x.displacementBias.value=p.displacementBias),p.emissiveMap&&(x.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,x.emissiveMapTransform)),p.specularMap&&(x.specularMap.value=p.specularMap,e(p.specularMap,x.specularMapTransform)),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest);const v=t.get(p),y=v.envMap,M=v.envMapRotation;y&&(x.envMap.value=y,Ss.copy(M),Ss.x*=-1,Ss.y*=-1,Ss.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ss.y*=-1,Ss.z*=-1),x.envMapRotation.value.setFromMatrix4(Dy.makeRotationFromEuler(Ss)),x.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=p.reflectivity,x.ior.value=p.ior,x.refractionRatio.value=p.refractionRatio),p.lightMap&&(x.lightMap.value=p.lightMap,x.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,x.lightMapTransform)),p.aoMap&&(x.aoMap.value=p.aoMap,x.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,x.aoMapTransform))}function o(x,p){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity,p.map&&(x.map.value=p.map,e(p.map,x.mapTransform))}function a(x,p){x.dashSize.value=p.dashSize,x.totalSize.value=p.dashSize+p.gapSize,x.scale.value=p.scale}function l(x,p,v,y){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity,x.size.value=p.size*v,x.scale.value=y*.5,p.map&&(x.map.value=p.map,e(p.map,x.uvTransform)),p.alphaMap&&(x.alphaMap.value=p.alphaMap,e(p.alphaMap,x.alphaMapTransform)),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest)}function c(x,p){x.diffuse.value.copy(p.color),x.opacity.value=p.opacity,x.rotation.value=p.rotation,p.map&&(x.map.value=p.map,e(p.map,x.mapTransform)),p.alphaMap&&(x.alphaMap.value=p.alphaMap,e(p.alphaMap,x.alphaMapTransform)),p.alphaTest>0&&(x.alphaTest.value=p.alphaTest)}function h(x,p){x.specular.value.copy(p.specular),x.shininess.value=Math.max(p.shininess,1e-4)}function u(x,p){p.gradientMap&&(x.gradientMap.value=p.gradientMap)}function d(x,p){x.metalness.value=p.metalness,p.metalnessMap&&(x.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,x.metalnessMapTransform)),x.roughness.value=p.roughness,p.roughnessMap&&(x.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,x.roughnessMapTransform)),p.envMap&&(x.envMapIntensity.value=p.envMapIntensity)}function f(x,p,v){x.ior.value=p.ior,p.sheen>0&&(x.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),x.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(x.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,x.sheenColorMapTransform)),p.sheenRoughnessMap&&(x.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,x.sheenRoughnessMapTransform))),p.clearcoat>0&&(x.clearcoat.value=p.clearcoat,x.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(x.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,x.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(x.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===In&&x.clearcoatNormalScale.value.negate())),p.dispersion>0&&(x.dispersion.value=p.dispersion),p.iridescence>0&&(x.iridescence.value=p.iridescence,x.iridescenceIOR.value=p.iridescenceIOR,x.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(x.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,x.iridescenceMapTransform)),p.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),p.transmission>0&&(x.transmission.value=p.transmission,x.transmissionSamplerMap.value=v.texture,x.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(x.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,x.transmissionMapTransform)),x.thickness.value=p.thickness,p.thicknessMap&&(x.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=p.attenuationDistance,x.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(x.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(x.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=p.specularIntensity,x.specularColor.value.copy(p.specularColor),p.specularColorMap&&(x.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,x.specularColorMapTransform)),p.specularIntensityMap&&(x.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,x.specularIntensityMapTransform))}function g(x,p){p.matcap&&(x.matcap.value=p.matcap)}function m(x,p){const v=t.get(p).light;x.referencePosition.value.setFromMatrixPosition(v.matrixWorld),x.nearDistance.value=v.shadow.camera.near,x.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Uy(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,y){const M=y.program;n.uniformBlockBinding(v,M)}function c(v,y){let M=s[v.id];M===void 0&&(g(v),M=h(v),s[v.id]=M,v.addEventListener("dispose",x));const R=y.program;n.updateUBOMapping(v,R);const E=t.render.frame;r[v.id]!==E&&(d(v),r[v.id]=E)}function h(v){const y=u();v.__bindingPointIndex=y;const M=i.createBuffer(),R=v.__size,E=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,R,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,M),M}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){const y=s[v.id],M=v.uniforms,R=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let E=0,w=M.length;E<w;E++){const A=Array.isArray(M[E])?M[E]:[M[E]];for(let S=0,b=A.length;S<b;S++){const U=A[S];if(f(U,E,S,R)===!0){const P=U.__offset,G=Array.isArray(U.value)?U.value:[U.value];let j=0;for(let O=0;O<G.length;O++){const B=G[O],K=m(B);typeof B=="number"||typeof B=="boolean"?(U.__data[0]=B,i.bufferSubData(i.UNIFORM_BUFFER,P+j,U.__data)):B.isMatrix3?(U.__data[0]=B.elements[0],U.__data[1]=B.elements[1],U.__data[2]=B.elements[2],U.__data[3]=0,U.__data[4]=B.elements[3],U.__data[5]=B.elements[4],U.__data[6]=B.elements[5],U.__data[7]=0,U.__data[8]=B.elements[6],U.__data[9]=B.elements[7],U.__data[10]=B.elements[8],U.__data[11]=0):(B.toArray(U.__data,j),j+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,P,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(v,y,M,R){const E=v.value,w=y+"_"+M;if(R[w]===void 0)return typeof E=="number"||typeof E=="boolean"?R[w]=E:R[w]=E.clone(),!0;{const A=R[w];if(typeof E=="number"||typeof E=="boolean"){if(A!==E)return R[w]=E,!0}else if(A.equals(E)===!1)return A.copy(E),!0}return!1}function g(v){const y=v.uniforms;let M=0;const R=16;for(let w=0,A=y.length;w<A;w++){const S=Array.isArray(y[w])?y[w]:[y[w]];for(let b=0,U=S.length;b<U;b++){const P=S[b],G=Array.isArray(P.value)?P.value:[P.value];for(let j=0,O=G.length;j<O;j++){const B=G[j],K=m(B),q=M%R,Y=q%K.boundary,H=q+Y;M+=Y,H!==0&&R-H<K.storage&&(M+=R-H),P.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=M,M+=K.storage}}}const E=M%R;return E>0&&(M+=R-E),v.__size=M,v.__cache={},this}function m(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function x(v){const y=v.target;y.removeEventListener("dispose",x);const M=o.indexOf(y.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function p(){for(const v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class ky{constructor(t={}){const{canvas:e=Yp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),m=new Int32Array(4);let x=null,p=null;const v=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=cs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let R=!1;this._outputColorSpace=Un;let E=0,w=0,A=null,S=-1,b=null;const U=new Le,P=new Le;let G=null;const j=new ee(0);let O=0,B=e.width,K=e.height,q=1,Y=null,H=null;const st=new Le(0,0,B,K),_t=new Le(0,0,B,K);let ne=!1;const le=new ph;let ut=!1,$=!1;const ot=new ue,Mt=new L,Xt=new Le,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pe=!1;function we(){return A===null?q:1}let D=n;function ie(C,J){return e.getContext(C,J)}try{const C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Qc}`),e.addEventListener("webglcontextlost",Tt,!1),e.addEventListener("webglcontextrestored",Ot,!1),e.addEventListener("webglcontextcreationerror",xt,!1),D===null){const J="webgl2";if(D=ie(J,C),D===null)throw ie(J)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let jt,Yt,Lt,re,mt,bt,he,ze,I,T,tt,lt,ct,at,Ut,ht,Et,It,gt,Ct,Qt,Ht,wt,de;function X(){jt=new qx(D),jt.init(),Ht=new Ry(D,jt),Yt=new Ox(D,jt,t,Ht),Lt=new Ty(D,jt),Yt.reversedDepthBuffer&&d&&Lt.buffers.depth.setReversed(!0),re=new Zx(D),mt=new fy,bt=new Ay(D,jt,Lt,mt,Yt,Ht,re),he=new Hx(M),ze=new Xx(M),I=new e0(D),wt=new Nx(D,I),T=new $x(D,I,re,wt),tt=new Kx(D,T,I,re),gt=new jx(D,Yt,bt),ht=new Bx(mt),lt=new dy(M,he,ze,jt,Yt,wt,ht),ct=new Ly(M,mt),at=new my,Ut=new _y(jt),It=new kx(M,he,ze,Lt,tt,f,l),Et=new wy(M,tt,Yt),de=new Uy(D,re,Yt,Lt),Ct=new Fx(D,jt,re),Qt=new Yx(D,jt,re),re.programs=lt.programs,M.capabilities=Yt,M.extensions=jt,M.properties=mt,M.renderLists=at,M.shadowMap=Et,M.state=Lt,M.info=re}X();const yt=new Iy(M,D);this.xr=yt,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const C=jt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=jt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(C){C!==void 0&&(q=C,this.setSize(B,K,!1))},this.getSize=function(C){return C.set(B,K)},this.setSize=function(C,J,et=!0){if(yt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=C,K=J,e.width=Math.floor(C*q),e.height=Math.floor(J*q),et===!0&&(e.style.width=C+"px",e.style.height=J+"px"),this.setViewport(0,0,C,J)},this.getDrawingBufferSize=function(C){return C.set(B*q,K*q).floor()},this.setDrawingBufferSize=function(C,J,et){B=C,K=J,q=et,e.width=Math.floor(C*et),e.height=Math.floor(J*et),this.setViewport(0,0,C,J)},this.getCurrentViewport=function(C){return C.copy(U)},this.getViewport=function(C){return C.copy(st)},this.setViewport=function(C,J,et,nt){C.isVector4?st.set(C.x,C.y,C.z,C.w):st.set(C,J,et,nt),Lt.viewport(U.copy(st).multiplyScalar(q).round())},this.getScissor=function(C){return C.copy(_t)},this.setScissor=function(C,J,et,nt){C.isVector4?_t.set(C.x,C.y,C.z,C.w):_t.set(C,J,et,nt),Lt.scissor(P.copy(_t).multiplyScalar(q).round())},this.getScissorTest=function(){return ne},this.setScissorTest=function(C){Lt.setScissorTest(ne=C)},this.setOpaqueSort=function(C){Y=C},this.setTransparentSort=function(C){H=C},this.getClearColor=function(C){return C.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor(...arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha(...arguments)},this.clear=function(C=!0,J=!0,et=!0){let nt=0;if(C){let Q=!1;if(A!==null){const vt=A.texture.format;Q=vt===oh||vt===rh||vt===sh}if(Q){const vt=A.texture.type,Pt=vt===vi||vt===zs||vt===ao||vt===lo||vt===eh||vt===nh,Bt=It.getClearColor(),kt=It.getClearAlpha(),oe=Bt.r,$t=Bt.g,qt=Bt.b;Pt?(g[0]=oe,g[1]=$t,g[2]=qt,g[3]=kt,D.clearBufferuiv(D.COLOR,0,g)):(m[0]=oe,m[1]=$t,m[2]=qt,m[3]=kt,D.clearBufferiv(D.COLOR,0,m))}else nt|=D.COLOR_BUFFER_BIT}J&&(nt|=D.DEPTH_BUFFER_BIT),et&&(nt|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Tt,!1),e.removeEventListener("webglcontextrestored",Ot,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),It.dispose(),at.dispose(),Ut.dispose(),mt.dispose(),he.dispose(),ze.dispose(),tt.dispose(),wt.dispose(),de.dispose(),lt.dispose(),yt.dispose(),yt.removeEventListener("sessionstart",vn),yt.removeEventListener("sessionend",Dr),ai.stop()};function Tt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Ot(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const C=re.autoReset,J=Et.enabled,et=Et.autoUpdate,nt=Et.needsUpdate,Q=Et.type;X(),re.autoReset=C,Et.enabled=J,Et.autoUpdate=et,Et.needsUpdate=nt,Et.type=Q}function xt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function dt(C){const J=C.target;J.removeEventListener("dispose",dt),Gt(J)}function Gt(C){fe(C),mt.remove(C)}function fe(C){const J=mt.get(C).programs;J!==void 0&&(J.forEach(function(et){lt.releaseProgram(et)}),C.isShaderMaterial&&lt.releaseShaderCache(C))}this.renderBufferDirect=function(C,J,et,nt,Q,vt){J===null&&(J=Ft);const Pt=Q.isMesh&&Q.matrixWorld.determinant()<0,Bt=Ur(C,J,et,nt,Q);Lt.setMaterial(nt,Pt);let kt=et.index,oe=1;if(nt.wireframe===!0){if(kt=T.getWireframeAttribute(et),kt===void 0)return;oe=2}const $t=et.drawRange,qt=et.attributes.position;let Ee=$t.start*oe,Ne=($t.start+$t.count)*oe;vt!==null&&(Ee=Math.max(Ee,vt.start*oe),Ne=Math.min(Ne,(vt.start+vt.count)*oe)),kt!==null?(Ee=Math.max(Ee,0),Ne=Math.min(Ne,kt.count)):qt!=null&&(Ee=Math.max(Ee,0),Ne=Math.min(Ne,qt.count));const Ze=Ne-Ee;if(Ze<0||Ze===1/0)return;wt.setup(Q,nt,Bt,et,kt);let We,Ie=Ct;if(kt!==null&&(We=I.get(kt),Ie=Qt,Ie.setIndex(We)),Q.isMesh)nt.wireframe===!0?(Lt.setLineWidth(nt.wireframeLinewidth*we()),Ie.setMode(D.LINES)):Ie.setMode(D.TRIANGLES);else if(Q.isLine){let Kt=nt.linewidth;Kt===void 0&&(Kt=1),Lt.setLineWidth(Kt*we()),Q.isLineSegments?Ie.setMode(D.LINES):Q.isLineLoop?Ie.setMode(D.LINE_LOOP):Ie.setMode(D.LINE_STRIP)}else Q.isPoints?Ie.setMode(D.POINTS):Q.isSprite&&Ie.setMode(D.TRIANGLES);if(Q.isBatchedMesh)if(Q._multiDrawInstances!==null)fo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ie.renderMultiDrawInstances(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount,Q._multiDrawInstances);else if(jt.get("WEBGL_multi_draw"))Ie.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{const Kt=Q._multiDrawStarts,De=Q._multiDrawCounts,Te=Q._multiDrawCount,yn=kt?I.get(kt).bytesPerElement:1,wi=mt.get(nt).currentProgram.getUniforms();for(let Mn=0;Mn<Te;Mn++)wi.setValue(D,"_gl_DrawID",Mn),Ie.render(Kt[Mn]/yn,De[Mn])}else if(Q.isInstancedMesh)Ie.renderInstances(Ee,Ze,Q.count);else if(et.isInstancedBufferGeometry){const Kt=et._maxInstanceCount!==void 0?et._maxInstanceCount:1/0,De=Math.min(et.instanceCount,Kt);Ie.renderInstances(Ee,Ze,De)}else Ie.render(Ee,Ze)};function Be(C,J,et){C.transparent===!0&&C.side===Ce&&C.forceSinglePass===!1?(C.side=In,C.needsUpdate=!0,li(C,J,et),C.side=Hi,C.needsUpdate=!0,li(C,J,et),C.side=Ce):li(C,J,et)}this.compile=function(C,J,et=null){et===null&&(et=C),p=Ut.get(et),p.init(J),y.push(p),et.traverseVisible(function(Q){Q.isLight&&Q.layers.test(J.layers)&&(p.pushLight(Q),Q.castShadow&&p.pushShadow(Q))}),C!==et&&C.traverseVisible(function(Q){Q.isLight&&Q.layers.test(J.layers)&&(p.pushLight(Q),Q.castShadow&&p.pushShadow(Q))}),p.setupLights();const nt=new Set;return C.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;const vt=Q.material;if(vt)if(Array.isArray(vt))for(let Pt=0;Pt<vt.length;Pt++){const Bt=vt[Pt];Be(Bt,et,Q),nt.add(Bt)}else Be(vt,et,Q),nt.add(vt)}),p=y.pop(),nt},this.compileAsync=function(C,J,et=null){const nt=this.compile(C,J,et);return new Promise(Q=>{function vt(){if(nt.forEach(function(Pt){mt.get(Pt).currentProgram.isReady()&&nt.delete(Pt)}),nt.size===0){Q(C);return}setTimeout(vt,10)}jt.get("KHR_parallel_shader_compile")!==null?vt():setTimeout(vt,10)})};let ye=null;function Kn(C){ye&&ye(C)}function vn(){ai.stop()}function Dr(){ai.start()}const ai=new Jd;ai.setAnimationLoop(Kn),typeof self<"u"&&ai.setContext(self),this.setAnimationLoop=function(C){ye=C,yt.setAnimationLoop(C),C===null?ai.stop():ai.start()},yt.addEventListener("sessionstart",vn),yt.addEventListener("sessionend",Dr),this.render=function(C,J){if(J!==void 0&&J.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),J.parent===null&&J.matrixWorldAutoUpdate===!0&&J.updateMatrixWorld(),yt.enabled===!0&&yt.isPresenting===!0&&(yt.cameraAutoUpdate===!0&&yt.updateCamera(J),J=yt.getCamera()),C.isScene===!0&&C.onBeforeRender(M,C,J,A),p=Ut.get(C,y.length),p.init(J),y.push(p),ot.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),le.setFromProjectionMatrix(ot,gi,J.reversedDepth),$=this.localClippingEnabled,ut=ht.init(this.clippingPlanes,$),x=at.get(C,v.length),x.init(),v.push(x),yt.enabled===!0&&yt.isPresenting===!0){const vt=M.xr.getDepthSensingMesh();vt!==null&&Os(vt,J,-1/0,M.sortObjects)}Os(C,J,0,M.sortObjects),x.finish(),M.sortObjects===!0&&x.sort(Y,H),pe=yt.enabled===!1||yt.isPresenting===!1||yt.hasDepthSensing()===!1,pe&&It.addToRenderList(x,C),this.info.render.frame++,ut===!0&&ht.beginShadows();const et=p.state.shadowsArray;Et.render(et,C,J),ut===!0&&ht.endShadows(),this.info.autoReset===!0&&this.info.reset();const nt=x.opaque,Q=x.transmissive;if(p.setupLights(),J.isArrayCamera){const vt=J.cameras;if(Q.length>0)for(let Pt=0,Bt=vt.length;Pt<Bt;Pt++){const kt=vt[Pt];Lr(nt,Q,C,kt)}pe&&It.render(C);for(let Pt=0,Bt=vt.length;Pt<Bt;Pt++){const kt=vt[Pt];_o(x,C,kt,kt.viewport)}}else Q.length>0&&Lr(nt,Q,C,J),pe&&It.render(C),_o(x,C,J);A!==null&&w===0&&(bt.updateMultisampleRenderTarget(A),bt.updateRenderTargetMipmap(A)),C.isScene===!0&&C.onAfterRender(M,C,J),wt.resetDefaultState(),S=-1,b=null,y.pop(),y.length>0?(p=y[y.length-1],ut===!0&&ht.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?x=v[v.length-1]:x=null};function Os(C,J,et,nt){if(C.visible===!1)return;if(C.layers.test(J.layers)){if(C.isGroup)et=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(J);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||le.intersectsSprite(C)){nt&&Xt.setFromMatrixPosition(C.matrixWorld).applyMatrix4(ot);const Pt=tt.update(C),Bt=C.material;Bt.visible&&x.push(C,Pt,Bt,et,Xt.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||le.intersectsObject(C))){const Pt=tt.update(C),Bt=C.material;if(nt&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Xt.copy(C.boundingSphere.center)):(Pt.boundingSphere===null&&Pt.computeBoundingSphere(),Xt.copy(Pt.boundingSphere.center)),Xt.applyMatrix4(C.matrixWorld).applyMatrix4(ot)),Array.isArray(Bt)){const kt=Pt.groups;for(let oe=0,$t=kt.length;oe<$t;oe++){const qt=kt[oe],Ee=Bt[qt.materialIndex];Ee&&Ee.visible&&x.push(C,Pt,Ee,et,Xt.z,qt)}}else Bt.visible&&x.push(C,Pt,Bt,et,Xt.z,null)}}const vt=C.children;for(let Pt=0,Bt=vt.length;Pt<Bt;Pt++)Os(vt[Pt],J,et,nt)}function _o(C,J,et,nt){const Q=C.opaque,vt=C.transmissive,Pt=C.transparent;p.setupLightsView(et),ut===!0&&ht.setGlobalState(M.clippingPlanes,et),nt&&Lt.viewport(U.copy(nt)),Q.length>0&&Si(Q,J,et),vt.length>0&&Si(vt,J,et),Pt.length>0&&Si(Pt,J,et),Lt.buffers.depth.setTest(!0),Lt.buffers.depth.setMask(!0),Lt.buffers.color.setMask(!0),Lt.setPolygonOffset(!1)}function Lr(C,J,et,nt){if((et.isScene===!0?et.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[nt.id]===void 0&&(p.state.transmissionRenderTarget[nt.id]=new us(1,1,{generateMipmaps:!0,type:jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float")?vo:vi,minFilter:os,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ke.workingColorSpace}));const vt=p.state.transmissionRenderTarget[nt.id],Pt=nt.viewport||U;vt.setSize(Pt.z*M.transmissionResolutionScale,Pt.w*M.transmissionResolutionScale);const Bt=M.getRenderTarget(),kt=M.getActiveCubeFace(),oe=M.getActiveMipmapLevel();M.setRenderTarget(vt),M.getClearColor(j),O=M.getClearAlpha(),O<1&&M.setClearColor(16777215,.5),M.clear(),pe&&It.render(et);const $t=M.toneMapping;M.toneMapping=cs;const qt=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),p.setupLightsView(nt),ut===!0&&ht.setGlobalState(M.clippingPlanes,nt),Si(C,et,nt),bt.updateMultisampleRenderTarget(vt),bt.updateRenderTargetMipmap(vt),jt.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let Ne=0,Ze=J.length;Ne<Ze;Ne++){const We=J[Ne],Ie=We.object,Kt=We.geometry,De=We.material,Te=We.group;if(De.side===Ce&&Ie.layers.test(nt.layers)){const yn=De.side;De.side=In,De.needsUpdate=!0,bo(Ie,et,nt,Kt,De,Te),De.side=yn,De.needsUpdate=!0,Ee=!0}}Ee===!0&&(bt.updateMultisampleRenderTarget(vt),bt.updateRenderTargetMipmap(vt))}M.setRenderTarget(Bt,kt,oe),M.setClearColor(j,O),qt!==void 0&&(nt.viewport=qt),M.toneMapping=$t}function Si(C,J,et){const nt=J.isScene===!0?J.overrideMaterial:null;for(let Q=0,vt=C.length;Q<vt;Q++){const Pt=C[Q],Bt=Pt.object,kt=Pt.geometry,oe=Pt.group;let $t=Pt.material;$t.allowOverride===!0&&nt!==null&&($t=nt),Bt.layers.test(et.layers)&&bo(Bt,J,et,kt,$t,oe)}}function bo(C,J,et,nt,Q,vt){C.onBeforeRender(M,J,et,nt,Q,vt),C.modelViewMatrix.multiplyMatrices(et.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),Q.onBeforeRender(M,J,et,nt,C,vt),Q.transparent===!0&&Q.side===Ce&&Q.forceSinglePass===!1?(Q.side=In,Q.needsUpdate=!0,M.renderBufferDirect(et,J,nt,Q,C,vt),Q.side=Hi,Q.needsUpdate=!0,M.renderBufferDirect(et,J,nt,Q,C,vt),Q.side=Ce):M.renderBufferDirect(et,J,nt,Q,C,vt),C.onAfterRender(M,J,et,nt,Q,vt)}function li(C,J,et){J.isScene!==!0&&(J=Ft);const nt=mt.get(C),Q=p.state.lights,vt=p.state.shadowsArray,Pt=Q.state.version,Bt=lt.getParameters(C,Q.state,vt,J,et),kt=lt.getProgramCacheKey(Bt);let oe=nt.programs;nt.environment=C.isMeshStandardMaterial?J.environment:null,nt.fog=J.fog,nt.envMap=(C.isMeshStandardMaterial?ze:he).get(C.envMap||nt.environment),nt.envMapRotation=nt.environment!==null&&C.envMap===null?J.environmentRotation:C.envMapRotation,oe===void 0&&(C.addEventListener("dispose",dt),oe=new Map,nt.programs=oe);let $t=oe.get(kt);if($t!==void 0){if(nt.currentProgram===$t&&nt.lightsStateVersion===Pt)return ci(C,Bt),$t}else Bt.uniforms=lt.getUniforms(C),C.onBeforeCompile(Bt,M),$t=lt.acquireProgram(Bt,kt),oe.set(kt,$t),nt.uniforms=Bt.uniforms;const qt=nt.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(qt.clippingPlanes=ht.uniform),ci(C,Bt),nt.needsLights=Xi(C),nt.lightsStateVersion=Pt,nt.needsLights&&(qt.ambientLightColor.value=Q.state.ambient,qt.lightProbe.value=Q.state.probe,qt.directionalLights.value=Q.state.directional,qt.directionalLightShadows.value=Q.state.directionalShadow,qt.spotLights.value=Q.state.spot,qt.spotLightShadows.value=Q.state.spotShadow,qt.rectAreaLights.value=Q.state.rectArea,qt.ltc_1.value=Q.state.rectAreaLTC1,qt.ltc_2.value=Q.state.rectAreaLTC2,qt.pointLights.value=Q.state.point,qt.pointLightShadows.value=Q.state.pointShadow,qt.hemisphereLights.value=Q.state.hemi,qt.directionalShadowMap.value=Q.state.directionalShadowMap,qt.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,qt.spotShadowMap.value=Q.state.spotShadowMap,qt.spotLightMatrix.value=Q.state.spotLightMatrix,qt.spotLightMap.value=Q.state.spotLightMap,qt.pointShadowMap.value=Q.state.pointShadowMap,qt.pointShadowMatrix.value=Q.state.pointShadowMatrix),nt.currentProgram=$t,nt.uniformsList=null,$t}function So(C){if(C.uniformsList===null){const J=C.currentProgram.getUniforms();C.uniformsList=wa.seqWithValue(J.seq,C.uniforms)}return C.uniformsList}function ci(C,J){const et=mt.get(C);et.outputColorSpace=J.outputColorSpace,et.batching=J.batching,et.batchingColor=J.batchingColor,et.instancing=J.instancing,et.instancingColor=J.instancingColor,et.instancingMorph=J.instancingMorph,et.skinning=J.skinning,et.morphTargets=J.morphTargets,et.morphNormals=J.morphNormals,et.morphColors=J.morphColors,et.morphTargetsCount=J.morphTargetsCount,et.numClippingPlanes=J.numClippingPlanes,et.numIntersection=J.numClipIntersection,et.vertexAlphas=J.vertexAlphas,et.vertexTangents=J.vertexTangents,et.toneMapping=J.toneMapping}function Ur(C,J,et,nt,Q){J.isScene!==!0&&(J=Ft),bt.resetTextureUnits();const vt=J.fog,Pt=nt.isMeshStandardMaterial?J.environment:null,Bt=A===null?M.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Rr,kt=(nt.isMeshStandardMaterial?ze:he).get(nt.envMap||Pt),oe=nt.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,$t=!!et.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),qt=!!et.morphAttributes.position,Ee=!!et.morphAttributes.normal,Ne=!!et.morphAttributes.color;let Ze=cs;nt.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Ze=M.toneMapping);const We=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,Ie=We!==void 0?We.length:0,Kt=mt.get(nt),De=p.state.lights;if(ut===!0&&($===!0||C!==b)){const Je=C===b&&nt.id===S;ht.setState(nt,C,Je)}let Te=!1;nt.version===Kt.__version?(Kt.needsLights&&Kt.lightsStateVersion!==De.state.version||Kt.outputColorSpace!==Bt||Q.isBatchedMesh&&Kt.batching===!1||!Q.isBatchedMesh&&Kt.batching===!0||Q.isBatchedMesh&&Kt.batchingColor===!0&&Q.colorTexture===null||Q.isBatchedMesh&&Kt.batchingColor===!1&&Q.colorTexture!==null||Q.isInstancedMesh&&Kt.instancing===!1||!Q.isInstancedMesh&&Kt.instancing===!0||Q.isSkinnedMesh&&Kt.skinning===!1||!Q.isSkinnedMesh&&Kt.skinning===!0||Q.isInstancedMesh&&Kt.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Kt.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Kt.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Kt.instancingMorph===!1&&Q.morphTexture!==null||Kt.envMap!==kt||nt.fog===!0&&Kt.fog!==vt||Kt.numClippingPlanes!==void 0&&(Kt.numClippingPlanes!==ht.numPlanes||Kt.numIntersection!==ht.numIntersection)||Kt.vertexAlphas!==oe||Kt.vertexTangents!==$t||Kt.morphTargets!==qt||Kt.morphNormals!==Ee||Kt.morphColors!==Ne||Kt.toneMapping!==Ze||Kt.morphTargetsCount!==Ie)&&(Te=!0):(Te=!0,Kt.__version=nt.version);let yn=Kt.currentProgram;Te===!0&&(yn=li(nt,J,Q));let wi=!1,Mn=!1,qi=!1;const Xe=yn.getUniforms(),Dn=Kt.uniforms;if(Lt.useProgram(yn.program)&&(wi=!0,Mn=!0,qi=!0),nt.id!==S&&(S=nt.id,Mn=!0),wi||b!==C){Lt.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),Xe.setValue(D,"projectionMatrix",C.projectionMatrix),Xe.setValue(D,"viewMatrix",C.matrixWorldInverse);const Qe=Xe.map.cameraPosition;Qe!==void 0&&Qe.setValue(D,Mt.setFromMatrixPosition(C.matrixWorld)),Yt.logarithmicDepthBuffer&&Xe.setValue(D,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&Xe.setValue(D,"isOrthographic",C.isOrthographicCamera===!0),b!==C&&(b=C,Mn=!0,qi=!0)}if(Q.isSkinnedMesh){Xe.setOptional(D,Q,"bindMatrix"),Xe.setOptional(D,Q,"bindMatrixInverse");const Je=Q.skeleton;Je&&(Je.boneTexture===null&&Je.computeBoneTexture(),Xe.setValue(D,"boneTexture",Je.boneTexture,bt))}Q.isBatchedMesh&&(Xe.setOptional(D,Q,"batchingTexture"),Xe.setValue(D,"batchingTexture",Q._matricesTexture,bt),Xe.setOptional(D,Q,"batchingIdTexture"),Xe.setValue(D,"batchingIdTexture",Q._indirectTexture,bt),Xe.setOptional(D,Q,"batchingColorTexture"),Q._colorsTexture!==null&&Xe.setValue(D,"batchingColorTexture",Q._colorsTexture,bt));const Tn=et.morphAttributes;if((Tn.position!==void 0||Tn.normal!==void 0||Tn.color!==void 0)&&gt.update(Q,et,yn),(Mn||Kt.receiveShadow!==Q.receiveShadow)&&(Kt.receiveShadow=Q.receiveShadow,Xe.setValue(D,"receiveShadow",Q.receiveShadow)),nt.isMeshGouraudMaterial&&nt.envMap!==null&&(Dn.envMap.value=kt,Dn.flipEnvMap.value=kt.isCubeTexture&&kt.isRenderTargetTexture===!1?-1:1),nt.isMeshStandardMaterial&&nt.envMap===null&&J.environment!==null&&(Dn.envMapIntensity.value=J.environmentIntensity),Mn&&(Xe.setValue(D,"toneMappingExposure",M.toneMappingExposure),Kt.needsLights&&$a(Dn,qi),vt&&nt.fog===!0&&ct.refreshFogUniforms(Dn,vt),ct.refreshMaterialUniforms(Dn,nt,q,K,p.state.transmissionRenderTarget[C.id]),wa.upload(D,So(Kt),Dn,bt)),nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(wa.upload(D,So(Kt),Dn,bt),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&Xe.setValue(D,"center",Q.center),Xe.setValue(D,"modelViewMatrix",Q.modelViewMatrix),Xe.setValue(D,"normalMatrix",Q.normalMatrix),Xe.setValue(D,"modelMatrix",Q.matrixWorld),nt.isShaderMaterial||nt.isRawShaderMaterial){const Je=nt.uniformsGroups;for(let Qe=0,Hs=Je.length;Qe<Hs;Qe++){const hi=Je[Qe];de.update(hi,yn),de.bind(hi,yn)}}return yn}function $a(C,J){C.ambientLightColor.needsUpdate=J,C.lightProbe.needsUpdate=J,C.directionalLights.needsUpdate=J,C.directionalLightShadows.needsUpdate=J,C.pointLights.needsUpdate=J,C.pointLightShadows.needsUpdate=J,C.spotLights.needsUpdate=J,C.spotLightShadows.needsUpdate=J,C.rectAreaLights.needsUpdate=J,C.hemisphereLights.needsUpdate=J}function Xi(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(C,J,et){const nt=mt.get(C);nt.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,nt.__autoAllocateDepthBuffer===!1&&(nt.__useRenderToTexture=!1),mt.get(C.texture).__webglTexture=J,mt.get(C.depthTexture).__webglTexture=nt.__autoAllocateDepthBuffer?void 0:et,nt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,J){const et=mt.get(C);et.__webglFramebuffer=J,et.__useDefaultFramebuffer=J===void 0};const wo=D.createFramebuffer();this.setRenderTarget=function(C,J=0,et=0){A=C,E=J,w=et;let nt=!0,Q=null,vt=!1,Pt=!1;if(C){const kt=mt.get(C);if(kt.__useDefaultFramebuffer!==void 0)Lt.bindFramebuffer(D.FRAMEBUFFER,null),nt=!1;else if(kt.__webglFramebuffer===void 0)bt.setupRenderTarget(C);else if(kt.__hasExternalTextures)bt.rebindTextures(C,mt.get(C.texture).__webglTexture,mt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const qt=C.depthTexture;if(kt.__boundDepthTexture!==qt){if(qt!==null&&mt.has(qt)&&(C.width!==qt.image.width||C.height!==qt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");bt.setupDepthRenderbuffer(C)}}const oe=C.texture;(oe.isData3DTexture||oe.isDataArrayTexture||oe.isCompressedArrayTexture)&&(Pt=!0);const $t=mt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray($t[J])?Q=$t[J][et]:Q=$t[J],vt=!0):C.samples>0&&bt.useMultisampledRTT(C)===!1?Q=mt.get(C).__webglMultisampledFramebuffer:Array.isArray($t)?Q=$t[et]:Q=$t,U.copy(C.viewport),P.copy(C.scissor),G=C.scissorTest}else U.copy(st).multiplyScalar(q).floor(),P.copy(_t).multiplyScalar(q).floor(),G=ne;if(et!==0&&(Q=wo),Lt.bindFramebuffer(D.FRAMEBUFFER,Q)&&nt&&Lt.drawBuffers(C,Q),Lt.viewport(U),Lt.scissor(P),Lt.setScissorTest(G),vt){const kt=mt.get(C.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+J,kt.__webglTexture,et)}else if(Pt){const kt=J;for(let oe=0;oe<C.textures.length;oe++){const $t=mt.get(C.textures[oe]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+oe,$t.__webglTexture,et,kt)}}else if(C!==null&&et!==0){const kt=mt.get(C.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,kt.__webglTexture,et)}S=-1},this.readRenderTargetPixels=function(C,J,et,nt,Q,vt,Pt,Bt=0){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=mt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Pt!==void 0&&(kt=kt[Pt]),kt){Lt.bindFramebuffer(D.FRAMEBUFFER,kt);try{const oe=C.textures[Bt],$t=oe.format,qt=oe.type;if(!Yt.textureFormatReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Yt.textureTypeReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}J>=0&&J<=C.width-nt&&et>=0&&et<=C.height-Q&&(C.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Bt),D.readPixels(J,et,nt,Q,Ht.convert($t),Ht.convert(qt),vt))}finally{const oe=A!==null?mt.get(A).__webglFramebuffer:null;Lt.bindFramebuffer(D.FRAMEBUFFER,oe)}}},this.readRenderTargetPixelsAsync=async function(C,J,et,nt,Q,vt,Pt,Bt=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let kt=mt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Pt!==void 0&&(kt=kt[Pt]),kt)if(J>=0&&J<=C.width-nt&&et>=0&&et<=C.height-Q){Lt.bindFramebuffer(D.FRAMEBUFFER,kt);const oe=C.textures[Bt],$t=oe.format,qt=oe.type;if(!Yt.textureFormatReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Yt.textureTypeReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ee=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ee),D.bufferData(D.PIXEL_PACK_BUFFER,vt.byteLength,D.STREAM_READ),C.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Bt),D.readPixels(J,et,nt,Q,Ht.convert($t),Ht.convert(qt),0);const Ne=A!==null?mt.get(A).__webglFramebuffer:null;Lt.bindFramebuffer(D.FRAMEBUFFER,Ne);const Ze=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Zp(D,Ze,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ee),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,vt),D.deleteBuffer(Ee),D.deleteSync(Ze),vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,J=null,et=0){const nt=Math.pow(2,-et),Q=Math.floor(C.image.width*nt),vt=Math.floor(C.image.height*nt),Pt=J!==null?J.x:0,Bt=J!==null?J.y:0;bt.setTexture2D(C,0),D.copyTexSubImage2D(D.TEXTURE_2D,et,0,0,Pt,Bt,Q,vt),Lt.unbindTexture()};const gs=D.createFramebuffer(),Bs=D.createFramebuffer();this.copyTextureToTexture=function(C,J,et=null,nt=null,Q=0,vt=null){vt===null&&(Q!==0?(fo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),vt=Q,Q=0):vt=0);let Pt,Bt,kt,oe,$t,qt,Ee,Ne,Ze;const We=C.isCompressedTexture?C.mipmaps[vt]:C.image;if(et!==null)Pt=et.max.x-et.min.x,Bt=et.max.y-et.min.y,kt=et.isBox3?et.max.z-et.min.z:1,oe=et.min.x,$t=et.min.y,qt=et.isBox3?et.min.z:0;else{const Tn=Math.pow(2,-Q);Pt=Math.floor(We.width*Tn),Bt=Math.floor(We.height*Tn),C.isDataArrayTexture?kt=We.depth:C.isData3DTexture?kt=Math.floor(We.depth*Tn):kt=1,oe=0,$t=0,qt=0}nt!==null?(Ee=nt.x,Ne=nt.y,Ze=nt.z):(Ee=0,Ne=0,Ze=0);const Ie=Ht.convert(J.format),Kt=Ht.convert(J.type);let De;J.isData3DTexture?(bt.setTexture3D(J,0),De=D.TEXTURE_3D):J.isDataArrayTexture||J.isCompressedArrayTexture?(bt.setTexture2DArray(J,0),De=D.TEXTURE_2D_ARRAY):(bt.setTexture2D(J,0),De=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,J.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,J.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,J.unpackAlignment);const Te=D.getParameter(D.UNPACK_ROW_LENGTH),yn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),wi=D.getParameter(D.UNPACK_SKIP_PIXELS),Mn=D.getParameter(D.UNPACK_SKIP_ROWS),qi=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,We.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,We.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,oe),D.pixelStorei(D.UNPACK_SKIP_ROWS,$t),D.pixelStorei(D.UNPACK_SKIP_IMAGES,qt);const Xe=C.isDataArrayTexture||C.isData3DTexture,Dn=J.isDataArrayTexture||J.isData3DTexture;if(C.isDepthTexture){const Tn=mt.get(C),Je=mt.get(J),Qe=mt.get(Tn.__renderTarget),Hs=mt.get(Je.__renderTarget);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,Qe.__webglFramebuffer),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Hs.__webglFramebuffer);for(let hi=0;hi<kt;hi++)Xe&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,mt.get(C).__webglTexture,Q,qt+hi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,mt.get(J).__webglTexture,vt,Ze+hi)),D.blitFramebuffer(oe,$t,Pt,Bt,Ee,Ne,Pt,Bt,D.DEPTH_BUFFER_BIT,D.NEAREST);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(Q!==0||C.isRenderTargetTexture||mt.has(C)){const Tn=mt.get(C),Je=mt.get(J);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,gs),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Bs);for(let Qe=0;Qe<kt;Qe++)Xe?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Tn.__webglTexture,Q,qt+Qe):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Tn.__webglTexture,Q),Dn?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Je.__webglTexture,vt,Ze+Qe):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Je.__webglTexture,vt),Q!==0?D.blitFramebuffer(oe,$t,Pt,Bt,Ee,Ne,Pt,Bt,D.COLOR_BUFFER_BIT,D.NEAREST):Dn?D.copyTexSubImage3D(De,vt,Ee,Ne,Ze+Qe,oe,$t,Pt,Bt):D.copyTexSubImage2D(De,vt,Ee,Ne,oe,$t,Pt,Bt);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Dn?C.isDataTexture||C.isData3DTexture?D.texSubImage3D(De,vt,Ee,Ne,Ze,Pt,Bt,kt,Ie,Kt,We.data):J.isCompressedArrayTexture?D.compressedTexSubImage3D(De,vt,Ee,Ne,Ze,Pt,Bt,kt,Ie,We.data):D.texSubImage3D(De,vt,Ee,Ne,Ze,Pt,Bt,kt,Ie,Kt,We):C.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,vt,Ee,Ne,Pt,Bt,Ie,Kt,We.data):C.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,vt,Ee,Ne,We.width,We.height,Ie,We.data):D.texSubImage2D(D.TEXTURE_2D,vt,Ee,Ne,Pt,Bt,Ie,Kt,We);D.pixelStorei(D.UNPACK_ROW_LENGTH,Te),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,yn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,wi),D.pixelStorei(D.UNPACK_SKIP_ROWS,Mn),D.pixelStorei(D.UNPACK_SKIP_IMAGES,qi),vt===0&&J.generateMipmaps&&D.generateMipmap(De),Lt.unbindTexture()},this.initRenderTarget=function(C){mt.get(C).__webglFramebuffer===void 0&&bt.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?bt.setTextureCube(C,0):C.isData3DTexture?bt.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?bt.setTexture2DArray(C,0):bt.setTexture2D(C,0),Lt.unbindTexture()},this.resetState=function(){E=0,w=0,A=null,Lt.reset(),wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ke._getDrawingBufferColorSpace(t),e.unpackColorSpace=ke._getUnpackColorSpace()}}class Ny extends Jt{constructor(t,e={}){super(t),this.isWater=!0;const n=this,s=e.textureWidth!==void 0?e.textureWidth:512,r=e.textureHeight!==void 0?e.textureHeight:512,o=e.clipBias!==void 0?e.clipBias:0,a=e.alpha!==void 0?e.alpha:1,l=e.time!==void 0?e.time:0,c=e.waterNormals!==void 0?e.waterNormals:null,h=e.sunDirection!==void 0?e.sunDirection:new L(.70707,.70707,0),u=new ee(e.sunColor!==void 0?e.sunColor:16777215),d=new ee(e.waterColor!==void 0?e.waterColor:8355711),f=e.eye!==void 0?e.eye:new L(0,0,0),g=e.distortionScale!==void 0?e.distortionScale:20,m=e.side!==void 0?e.side:Hi,x=e.fog!==void 0?e.fog:!1,p=new pi,v=new L,y=new L,M=new L,R=new ue,E=new L(0,0,-1),w=new Le,A=new L,S=new L,b=new Le,U=new ue,P=new kn,G=new us(s,r),j={name:"MirrorShader",uniforms:Ca.merge([zt.fog,zt.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new ue},sunColor:{value:new ee(8355711)},sunDirection:{value:new L(.70707,.70707,0)},eye:{value:new L},waterColor:{value:new ee(5592405)}}]),vertexShader:`
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
				}`},O=new Zn({name:j.name,uniforms:Ca.clone(j.uniforms),vertexShader:j.vertexShader,fragmentShader:j.fragmentShader,lights:!0,side:m,fog:x});O.uniforms.mirrorSampler.value=G.texture,O.uniforms.textureMatrix.value=U,O.uniforms.alpha.value=a,O.uniforms.time.value=l,O.uniforms.normalSampler.value=c,O.uniforms.sunColor.value=u,O.uniforms.waterColor.value=d,O.uniforms.sunDirection.value=h,O.uniforms.distortionScale.value=g,O.uniforms.eye.value=f,n.material=O,n.onBeforeRender=function(B,K,q){if(y.setFromMatrixPosition(n.matrixWorld),M.setFromMatrixPosition(q.matrixWorld),R.extractRotation(n.matrixWorld),v.set(0,0,1),v.applyMatrix4(R),A.subVectors(y,M),A.dot(v)>0)return;A.reflect(v).negate(),A.add(y),R.extractRotation(q.matrixWorld),E.set(0,0,-1),E.applyMatrix4(R),E.add(M),S.subVectors(y,E),S.reflect(v).negate(),S.add(y),P.position.copy(A),P.up.set(0,1,0),P.up.applyMatrix4(R),P.up.reflect(v),P.lookAt(S),P.far=q.far,P.updateMatrixWorld(),P.projectionMatrix.copy(q.projectionMatrix),U.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),U.multiply(P.projectionMatrix),U.multiply(P.matrixWorldInverse),p.setFromNormalAndCoplanarPoint(v,y),p.applyMatrix4(P.matrixWorldInverse),w.set(p.normal.x,p.normal.y,p.normal.z,p.constant);const Y=P.projectionMatrix;b.x=(Math.sign(w.x)+Y.elements[8])/Y.elements[0],b.y=(Math.sign(w.y)+Y.elements[9])/Y.elements[5],b.z=-1,b.w=(1+Y.elements[10])/Y.elements[14],w.multiplyScalar(2/w.dot(b)),Y.elements[2]=w.x,Y.elements[6]=w.y,Y.elements[10]=w.z+1-o,Y.elements[14]=w.w,f.setFromMatrixPosition(q.matrixWorld);const H=B.getRenderTarget(),st=B.xr.enabled,_t=B.shadowMap.autoUpdate;n.visible=!1,B.xr.enabled=!1,B.shadowMap.autoUpdate=!1,B.setRenderTarget(G),B.state.buffers.depth.setMask(!0),B.autoClear===!1&&B.clear(),B.render(K,P),n.visible=!0,B.xr.enabled=st,B.shadowMap.autoUpdate=_t,B.setRenderTarget(H);const ne=q.viewport;ne!==void 0&&B.state.viewport(ne)}}}function ki(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new Se;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const u=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=i[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=rd(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let m=0;m<o[h].length;++m)f.push(o[h][m][d]);const g=rd(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function rd(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new un(o,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<e;g++){const m=h.getComponent(d,g);a.setComponent(d+u,g,m)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const xe=1.8,Fy=2,Oy=110*xe,By=108*xe,se=3,gr=se/2.15,Cs=12.3*gr,ws=Cs+6,Hy=Cs+8,sa=17,Gy=gr,$n=i=>Object.freeze(Object.fromEntries(Object.entries(i).map(([t,e])=>[t,t==="yaw"?e:e*Gy])));Object.freeze({store:$n({width:4.4,depth:3.6}),nursery:$n({width:5.8,depth:5.9}),watchtower:$n({width:4.8,depth:4}),training:$n({width:5.7,depth:4.8}),palisade:$n({width:7,depth:1})});$n({x:-1.1825,z:-1.0664,yaw:0,width:7.68,depth:8.25});const Vy=$n({x:-6.45,z:.43,yaw:-.5,width:4.8,depth:5.2});Object.freeze({store:$n({x:-6.0962,z:4.9054,yaw:0}),nursery:$n({x:6.5601,z:-3.869,yaw:0}),watchtower:$n({x:6.6295,z:5.3482,yaw:0}),training:$n({x:-6.2831,z:-6.0974,yaw:0}),palisade:$n({x:0,z:9.8,yaw:0})});const Wy=Cs-.15,Xy=6.8,Ia=3.8,qy=.9,od=(i,t)=>Number.isFinite(i)?i:t,$y=i=>i?.natural===!0||i?.mesh?.userData?.natural===!0,Yy=Array.from({length:5},(i,t)=>Object.freeze({stage:t,unfinished:t<4,wallHeight:t===0?0:t===1?Ia*.35:Ia,keep:t>=3,gate:t===4})),Zy=Object.freeze({stage:4,unfinished:!1,wallHeight:0,keep:!1,gate:!1});function ad(i){if($y(i))return Zy;const t=i.mesh?.userData?.visualState,e=i.underConstruction??t?.underConstruction??!1,n=e?Math.max(0,Math.min(1,od(i.constructionProgress,od(t?.constructionProgress,0)))):1,s=e?Math.min(3,Math.floor(n*4)):4;return Yy[s]}const Ts=(i,t=0)=>Number.isFinite(i)?i:t,Da=(i,t,e)=>Math.max(t,Math.min(e,i)),xr=1e-6,jy=i=>i&&i.active!==!1;function Ky(i,t){const e=Math.cos(i.yaw||0),n=Math.sin(i.yaw||0),s=t.x-i.x,r=t.z-i.z;return{x:e*s-n*r,y:t.y,z:n*s+e*r}}function ra(i,t){const e=Math.cos(i.yaw||0),n=Math.sin(i.yaw||0);return{x:i.x+e*t.x+n*t.z,y:Ts(t.y,i.floorY),z:i.z-n*t.x+e*t.z}}const sf=(i,t,e=0)=>i.x>t.minX+e-xr&&i.x<t.maxX-e+xr&&i.z>t.minZ+e-xr&&i.z<t.maxZ-e+xr,zi=(i,t,e,n,s,r,o)=>({id:i,minX:t,maxX:e,minZ:n,maxZ:s,minY:r,maxY:o});function ld(i,t,e=0){return t.outline?t.outline.every((s,r)=>{const o=t.outline[(r+1)%t.outline.length],a=o.x-s.x,l=o.z-s.z;return a*(i.z-s.z)-l*(i.x-s.x)>=Math.max(0,e)*Math.hypot(a,l)-xr})||e<0&&t.outline.some((s,r)=>Jy(i,s,t.outline[(r+1)%t.outline.length])<e*e-xr):sf(i,t,e)}function Jy(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=Da(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1),0,1);return(i.x-t.x-n*r)**2+(i.z-t.z-s*r)**2}function Qy(i,t){return i.outline=t.map(([e,n])=>({x:e,z:n})),i.minX=Math.min(...t.map(e=>e[0])),i.maxX=Math.max(...t.map(e=>e[0])),i.minZ=Math.min(...t.map(e=>e[1])),i.maxZ=Math.max(...t.map(e=>e[1])),i}function t1(i,{terrainHeight:t,minimumFloorY:e=.82}={}){const n=t||(()=>0),s={id:i.id,x:Ts(i.x),z:Ts(i.z),yaw:Ts(i.yaw,Math.atan2(-i.x,-i.z)),team:i.team||"neutral",active:!0};let r=-1/0,o=1/0;for(let g=-3.75;g<=3.76;g+=1.25)for(let m=-3.25;m<=4.26;m+=1.25){const x=ra(s,{x:g,z:m,y:0}),p=Ts(n(x.x,x.z));r=Math.max(r,p),o=Math.min(o,p)}s.floorY=Math.max(e,r+.045),s.floorBottom=Math.min(o-.16,s.floorY-.22),s.roofBottom=s.floorY+2.25,s.roofTop=s.floorY+3.05,s.interior={minX:-3.1,maxX:3.1,minZ:-2.6,maxZ:.45},s.floor={minX:-3.75,maxX:3.75,minZ:-3.25,maxZ:4.1},s.entrance={x:1.55,z:4,minX:.3,maxX:2.8,minZ:3.35,maxZ:4,width:2.5,height:1.95},s.solids=[zi("floor",-3.75,3.75,-3.25,4.1,s.floorBottom,s.floorY),zi("left-wall",-3.75,-3.1,-3.25,4,s.floorY,s.roofBottom),zi("right-wall",3.1,3.75,-3.25,4,s.floorY,s.roofBottom),zi("back-wall",-3.75,3.75,-3.25,-2.6,s.floorY,s.roofBottom),zi("front-left",-3.75,.3,3.35,4,s.floorY,s.roofBottom),zi("front-right",2.8,3.75,3.35,4,s.floorY,s.roofBottom),zi("entrance-lintel",.3,2.8,3.35,4,s.floorY+1.95,s.roofBottom),zi("root-baffle",-.35,3.1,.45,1.05,s.floorY,s.roofBottom),zi("roof",-3.75,3.75,-3.25,4,s.roofBottom,s.roofTop)];const l={floor:[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.2],[-3.15,4.2],[-4.12,3.4]],roof:[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.22],[-3.15,4.45],[-4.12,3.4]],"left-wall":[[-3.1,-3.35],[-3.1,4.3],[-3.95,3.4],[-4.05,-2.2]],"right-wall":[[3.1,-3.35],[3.95,-2.3],[3.85,3.4],[3.1,4.2]],"back-wall":[[-3.25,-2.6],[-3.5,-3.3],[2.9,-3.5],[3.3,-2.6]],"front-left":[[-3.3,3.35],[.3,3.35],[.3,4.13],[-3.15,4.3]],"front-right":[[2.8,3.35],[3.3,3.35],[3.45,4],[2.8,4]],"root-baffle":[[-.35,.45],[3.1,.45],[3.1,1.05],[-.3,.98]]};for(const g of s.solids)Qy(g,l[g.id]||[[g.minX,g.minZ],[g.maxX,g.minZ],[g.maxX,g.maxZ],[g.minX,g.maxZ]]);s.floor={...s.solids[0]},s.shellBounds={minX:Math.min(...s.solids.map(g=>g.minX)),maxX:Math.max(...s.solids.map(g=>g.maxX)),minZ:Math.min(...s.solids.map(g=>g.minZ)),maxZ:Math.max(...s.solids.map(g=>g.maxZ))};let c=4.5;const h=4.2;for(let g=0;g<3;g++){const m=ra(s,{x:s.entrance.x,z:h+c,y:0});c=Da(Math.abs(s.floorY-n(m.x,m.z))/.32,4.5,14)}const u=Math.max(10,Math.ceil(c/.45)),d=6,f={minX:s.entrance.x-1.6,maxX:s.entrance.x+1.6,minZ:h,maxZ:h+c,rows:u,cols:d,heights:[],bottoms:[]};for(let g=0;g<=u;g++)for(let m=0;m<=d;m++){const x=g/u,p=f.minX+(f.maxX-f.minX)*m/d,v=f.minZ+c*x,y=ra(s,{x:p,z:v,y:0}),M=ra(s,{x:p,z:f.maxZ,y:0}),R=Ts(n(y.x,y.z)),E=s.floorY+(Ts(n(M.x,M.z))-s.floorY)*x;f.heights.push(g===0?s.floorY:Math.max(R+(g===u?.005:.02),E)),f.bottoms.push(Math.min(R-.14,E-.18))}return s.ramp=f,s.radius=Math.max(6,Math.hypot(f.maxX,f.maxZ)),s}function e1(i,t){const e=i.ramp;if(!e||!sf(t,e))return null;const n=Da((t.x-e.minX)/(e.maxX-e.minX)*e.cols,0,e.cols),s=Da((t.z-e.minZ)/(e.maxZ-e.minZ)*e.rows,0,e.rows),r=Math.min(e.cols-1,Math.floor(n)),o=Math.min(e.rows-1,Math.floor(s)),a=n-r,l=s-o,c=(g,m)=>e.heights[m*(e.cols+1)+g],h=c(r,o),u=c(r+1,o),d=c(r,o+1),f=c(r+1,o+1);return a+l<=1?h+(u-h)*a+(d-h)*l:f+(d-f)*(1-a)+(u-f)*(1-l)}function n1(i,t,e,{y:n}={}){let s=null;for(const r of i||[]){if(!jy(r)||Math.hypot(t-r.x,e-r.z)>r.radius+1)continue;const o=Ky(r,{x:t,z:e}),a=r.solids.find(u=>u.id==="roof");let l=null,c="floor";ld(o,r.floor)&&(l=r.floorY);const h=e1(r,o);h!==null&&(l===null||h>l)&&(l=h,c="ramp"),Number.isFinite(n)&&n>=r.roofTop-.06&&ld(o,a)&&(l=r.roofTop,c="roof"),l!==null&&(!s||l>s.height)&&(s={height:l,type:c==="roof"?"rock":"land",platform:r,refuge:r,surface:c})}return s}const Sh=(i,t,e)=>Math.max(t,Math.min(e,i)),si=(i,t,e)=>{const n=Sh((e-i)/(t-i),0,1);return n*n*(3-2*n)},Qi=-.035;function i1(i,t){if(!Number.isFinite(i)||!Number.isFinite(t))return .91;const e=Math.max(0,t-.215-i);return .91-.63*si(.1,.6,e)}const s1=Object.freeze({pond:{id:"pond",x:0,z:0,radius:8,label:"Λιμνούλα των νούφαρων",description:"Μύγες, ανθισμένα φύλλα και χαμηλές διαδρομές πάνω από το νερό.",hint:"Παρατήρησε πού μαζεύονται οι μύγες.",findPoint:{x:6.5,z:3}},creek:{id:"creek",x:8,z:-24,radius:7,label:"Το στενό ρυάκι",description:"Το ρεύμα αλλάζει τις διαδρομές και μεταφέρει την τροφή.",hint:"Ακολούθησε την κίνηση του νερού.",findPoint:{x:4,z:-29}},bank:{id:"bank",x:27,z:8,radius:7,label:"Η όχθη με τα βότσαλα",description:"Ψηλά βράχια, κρυψώνες και εκτεθειμένα περάσματα.",hint:"Οι καλαμιές κρύβουν μια δεύτερη προσέγγιση.",findPoint:{x:30,z:6}},roots:{id:"roots",x:24,z:-16,radius:5,label:"Το πέρασμα στις ρίζες",description:"Ένα φυσικό άνοιγμα που αποκαλύπτεται όταν χαμηλώνει το νερό.",hint:"Μικρά έντομα χάνονται κάτω από τις καμπύλες ρίζες.",findPoint:{x:31,z:-16}}});function r1(i){const t=e=>({...e,...i.toWorld(e.x,e.z)});return{landmarks:Object.values(s1).map(e=>({...t(e),findPoint:t(e.findPoint)})),nest:t({id:"creek-nest",x:17,z:16,radius:4,label:"Κοιλότητα κάτω από τις ρίζες"}),refuges:[{id:"willow-crevice",x:-20,z:7,label:"Κρυψώνα της πεσμένης ιτιάς"},{id:"bank-crevice",x:34,z:-9,label:"Κοιλότητα της πετρώδους όχθης"}].map(e=>({...t(e),yaw:Math.atan2(-e.x,-e.z)+i.yaw})),cover:[{id:"nest-reeds",x:14,z:20,radius:3.1},{id:"root-reeds",x:18,z:-7,radius:3},{id:"bank-reeds",x:29,z:11,radius:3.3},{id:"creek-reeds",x:18,z:-22,radius:3}].map(t)}}function rf(i){return 6+Math.sin(i*.035)*9}function o1(i,t,e=0,n=[]){const s=Math.abs(i-rf(t));let r=-1.9+si(6,17,s)*3.5+e*.22;r+=si(20,55,s)*(.4+Math.sin(t*.04+.6)**2*1.2);const o=1-si(11,20,Math.hypot(i*.95,t*.8));r=r*(1-o)+(-2.65+e*.2)*o;for(const l of n){const c=Math.hypot(i-l.x,t-l.z),u=l.radius*(1+.045*Math.sin(Math.atan2(t-l.z,i-l.x)*5+(l.shorePhase||0))),d=1-si(u*.46,u+5,c);d>0&&(r=Math.max(r,r*(1-d)+l.elevation*d))}const a=(1-si(1.9,4.7,Math.abs(t+16)))*si(9,14,i)*(1-si(31,36,i));return r=r*(1-a)+Math.min(r,-.18+e*.025)*a,r+=si(190,235,Math.max(Math.abs(i),Math.abs(t)))*4,r}function a1(i,t,e,n=.45){const s=i.toSource(t,e),r=Math.abs(s.x-rf(s.z)),o=Sh(Number(n)||0,0,1.5)*(1-si(5,17,r))*(.55+.45*si(5,23,Math.abs(s.z)));if(o<=0)return{x:0,z:0,strength:0};const a=.315*Math.cos(s.z*.035),l=Math.hypot(a,1),c=i.toWorld(0,0),h=i.toWorld(a/l,1/l);return{x:(h.x-c.x)*o,z:(h.z-c.z)*o,strength:o}}function l1({group:i,layout:t,terrainHeight:e,surface:n,insertPlatform:s,materials:r,rockGeos:o,tube:a,leafGeometry:l,bladeGeometry:c,geography:h}){const u=new te;u.name="Natural creek discoveries",i.add(u);const d=[],f=new qe,g=new Map,m=new jn(1,11,7),x=new Ve({color:"#e0c58b",roughness:.68}),p=new Ve({color:"#698d9d",roughness:.65}),v=l(.55,.38,.11),y=r.leaf.clone();y.color.set("#adc68a");const M=(O,B,K)=>{const q=t.toWorld(O,B);return[q.x,K,q.z]},R=h.landmarks.find(O=>O.id==="roots"),E=e(R.x,R.z);for(const O of[-.48,.45]){const B=a([[0,-.1,-4.1],[-.3,2.3,-2.6],[.2,3.7,0],[.35,2.5,2.7],[0,-.1,4.2]].map(K=>M(24+K[0]+O,-16+K[2],E+K[1])),.48,r.bark,24,.14);B.name="Passable willow root arch",B.castShadow=!0,B.receiveShadow=!0,u.add(B)}for(const O of[-1,1])for(let B=0;B<4;B++){const K=-16+O*(3.4+B*.45),q=24+(B-1.5)*1.1,Y=t.toWorld(q,K),H=t.toWorld(q-4.5,K+O*1.5),st=a([[Y.x,e(Y.x,Y.z)+.8,Y.z],[(Y.x+H.x)/2,e(H.x,H.z)+.45,(Y.z+H.z)/2],[H.x,e(H.x,H.z)-.05,H.z]],.1+B*.025,r.bark,12,.75);st.castShadow=!0,u.add(st)}const w=[{id:"creek-stone",x:4,z:-29,r:1.8,height:3.5},{id:"root-approach",x:18,z:-7,r:1.65,height:1.65},{id:"root-perch",x:24,z:-11,r:1.7,height:2},{id:"bank-perch",x:30,z:6,r:2,height:2.05},{id:"nest-perch",x:19,z:20,r:1.8,height:1.7},{id:"pond-perch",x:-5,z:8,r:1.7,height:3.5}],A=new Ve({color:"#c4d9ad",roughness:.82});for(const[O,B]of w.entries()){const K=t.toWorld(B.x,B.z),q=e(K.x,K.z),Y=B.height,H=new Jt(o[O%o.length],r.mossRock);H.name="Moss-covered grip outcrop",H.position.set(K.x,q,K.z),H.scale.set(B.r,Y,B.r),H.rotation.y=O*1.93,H.castShadow=!0,H.receiveShadow=!0,u.add(H);const st=s({id:B.id,type:"rock",...K,y:q+Y*.76,radius:B.r*.72,visualRadius:B.r,scaleY:Y}),_t=new Jt(m,A);_t.name="Pale natural grip",_t.position.set(K.x,st.y+.045,K.z),_t.scale.set(.22,.07,.22),u.add(_t),d.push({id:B.id,...K,y:st.y+.13,radius:st.radius})}const S=c(123),b=new wn(S,r.plant,h.cover.length*84);b.name="Dense camouflage reed pockets";let U=0;for(const[O,B]of h.cover.entries())for(let K=0;K<84;K++){const q=K*2.399+O*.7,Y=Math.sqrt((K+.4)/84)*B.radius,H=B.x+Math.cos(q)*Y,st=B.z+Math.sin(q)*Y;f.position.set(H,e(H,st),st),f.rotation.set(0,q,0),f.scale.set(1.2,1.65+K%5*.18,1.2),f.updateMatrix(),b.setMatrixAt(U++,f.matrix)}b.receiveShadow=!0,b.computeBoundingSphere(),u.add(b);function P(O,B,K){const q=new te;q.name=K?"Lost food and natural keepsakes":"Natural discovery";const Y=new Jt(v,y);Y.rotation.y=g.size*2.4%6.28,Y.receiveShadow=!0,q.add(Y);for(let H=0;H<(K?3:1);H++){const st=new Jt(m,B.kind==="keepsake"||B.keepsakesCount?x:p);st.position.set((H-1)*.15,.15+H%2*.035,.015),st.scale.set(.22,.15,.18),st.rotation.set(.2,H*.9,.1),st.castShadow=!0,q.add(st)}return q.userData.creekPoint={...B},u.add(q),g.set(O,q),q}function G(O,B){const K=new Set;for(const[q,Y]of[[!1,O.finds||[]],[!0,O.dropped||[]]])for(const H of Y){if(!Number.isFinite(H.x)||!Number.isFinite(H.z)||H.collected||H.visible===!1)continue;const st=(q?"drop:":"find:")+H.id;K.add(st);const _t=g.get(st)||P(st,H,q);_t.userData.creekPoint={...H},_t.visible=!0,_t.position.set(H.x,Math.max(n(H.x,H.z).height,B)+.07,H.z),_t.updateMatrix()}for(const[q,Y]of g)K.has(q)||(Y.removeFromParent(),g.delete(q))}function j(O,B){for(const K of g.values()){const q=K.userData.creekPoint,Y=n(q.x,q.z),H=Y.type==="water";K.position.y=Math.max(Y.height,O)+.07+(H?Math.sin(B*1.5+q.x)*.025:0),K.rotation.z=H?Math.sin(B*.8+q.z)*.045:0,K.updateMatrix()}}return{group:u,grips:d,sync:G,update:j,resources:[m,x,p,v,y,A,S]}}function c1(i){const t=i.outline||[{x:i.minX,z:i.minZ},{x:i.maxX,z:i.minZ},{x:i.maxX,z:i.maxZ},{x:i.minX,z:i.maxZ}],e=t.length,n=[],s=[];for(const h of[i.minY,i.maxY])for(const u of t)n.push(u.x,h,u.z);for(let h=1;h<e-1;h++)s.push(0,h,h+1,e,e+h+1,e+h);for(let h=0;h<e;h++){const u=(h+1)%e;s.push(h,e+h,u,u,e+h,e+u)}const r=new Se;r.setAttribute("position",new Vt(n,3)),r.setIndex(s);const o=r.toNonIndexed();r.dispose(),o.computeVertexNormals();const a=o.attributes.position,l=o.attributes.normal,c=[];for(let h=0;h<a.count;h++){const u=Math.abs(l.getY(h))>.5;c.push((u?a.getX(h):Math.abs(l.getX(h))>.5?a.getZ(h):a.getX(h))*.35,(u?a.getZ(h):a.getY(h))*.35)}return o.setAttribute("uv",new Vt(c,2)),o}function h1(i,{terrainHeight:t,materials:e,rockGeos:n,tube:s,leafGeometry:r,mergeStaticParts:o,teamColor:a}){const l=t1(i,{terrainHeight:t}),c=new te;c.name="Natural refuge "+(i.id||""),c.position.set(i.x,l.floorY,i.z),c.rotation.y=l.yaw;const h=[],u=e.leaf.clone(),d=e.rock.clone();d.color.set("#71816a"),h.push(u,d);const f=new te;f.name="Opaque rock and root cavity",c.add(f);const g=new te;g.name="Overhanging refuge slab",f.add(g);for(const w of l.solids){const A=c1(w),S=w.id==="root-baffle"?e.bark:w.id==="floor"?d:e.mossRock,b=new Jt(A,S);b.name="Refuge solid · "+w.id,b.userData.refugeSolid=w,b.position.y=-l.floorY,b.castShadow=!0,b.receiveShadow=!0,h.push(A),(w.id==="roof"?g:f).add(b)}const m=l.ramp,x=[],p=[];for(let w=0;w<=m.rows;w++)for(let A=0;A<=m.cols;A++){const S=w*(m.cols+1)+A;x.push(m.minX+(m.maxX-m.minX)*A/m.cols,m.heights[S]-l.floorY,m.minZ+(m.maxZ-m.minZ)*w/m.rows)}for(let w=0;w<m.rows;w++)for(let A=0;A<m.cols;A++){const S=w*(m.cols+1)+A,b=S+1,U=S+m.cols+1,P=U+1;p.push(S,U,b,b,U,P)}const v=[];for(let w=0;w<=m.cols;w++)v.push(w);for(let w=1;w<=m.rows;w++)v.push(w*(m.cols+1)+m.cols);for(let w=m.cols-1;w>=0;w--)v.push(m.rows*(m.cols+1)+w);for(let w=m.rows-1;w>0;w--)v.push(w*(m.cols+1));for(let w=0;w<v.length;w++){const A=v[w],S=v[(w+1)%v.length],b=x.length/3,U=b+1;x.push(x[A*3],m.bottoms[A]-l.floorY,x[A*3+2],x[S*3],m.bottoms[S]-l.floorY,x[S*3+2]),p.push(A,S,b,S,U,b)}const y=new Se;y.setAttribute("position",new Vt(x,3)),y.setAttribute("uv",new Vt(Array.from({length:x.length/3},(w,A)=>[x[A*3]*.35,x[A*3+2]*.35]).flat(),2)),y.setIndex(p),y.computeVertexNormals(),h.push(y);const M=new Jt(y,e.mossRock);M.name="Terrain-joined natural refuge ledge",M.castShadow=!0,M.receiveShadow=!0,f.add(M);for(const w of[-1,1])for(let A=0;A<3;A++){const S=w*(3.6-A*.12),b=-2.4+A*2.3,U=s([[S,l.floorBottom-l.floorY,b+.55],[S+w*.08,.55,b+.35],[S-w*.12,1.8,b],[S-w*.45,2.6,b-.2]],.16+A*.045,e.bark,15,.48);U.castShadow=!0,h.push(U.geometry),f.add(U)}for(let w=0;w<5;w++){const A=-2.3+w*1.3,S=s([[-3.5,3.03,A],[-1.6,3.12,A-.2],[.5,3.1,A+.1],[3.4,3.04,A+.35]],.075+w%2*.045,e.bark,18,.35);S.castShadow=!0,h.push(S.geometry),g.add(S)}const R=[];for(let w=0;w<4;w++){const A=new te;A.name="Natural life "+w,R.push(A),g.add(A);for(let S=0;S<8+w*3;S++){const b=S*2.399+w*.7,U=Math.cos(b)*(2.1+S%3*.48),P=.35+Math.sin(b)*(2.1+S%4*.2),G=new Jt(r(.65+S%3*.15,.85,.12),u);h.push(G.geometry),G.position.set(U,3.07+S%3*.025,P),G.rotation.set((S%3-1)*.08,b,(S%2-.5)*.1),G.castShadow=!0,G.receiveShadow=!0,A.add(G)}o(A,h)}const E=new te;E.name="Dry leaves inside the root hollow",f.add(E);for(let w=0;w<8;w++){const A=new Jt(r(.3,.48,.045),u);h.push(A.geometry),A.position.set(Math.sin(w*2.4)*2,.025,-1.1+Math.cos(w*2.4)*.7),A.rotation.y=w*1.7,A.receiveShadow=!0,E.add(A)}return o(E,h),l.mesh=c,c.userData={id:i.id,natural:!0,radius:l.radius,owned:h,growth:R,leafMaterial:u,terrain:null,keepCollision:{rects:[]},trainingPoint:c.position.clone(),support:{x:i.x,z:i.z,y:l.floorY,type:"land",radius:0},team:i.team,refuge:l,refugeSolids:f,refugeRoof:g},of(c,i,a),c}function of(i,t={},e){const n=i.userData.visualState||{},s={...n,...t},r=Sh(Math.floor(Number(s.nestLevel??s.level??s.tier??1)||0),0,3);return i.userData.visualState={team:s.team??"neutral",tier:s.tier??1,nestLevel:r,safe:s.safe!==!1,hp:s.hp,maxHp:s.maxHp,destroyed:!!s.destroyed},i.userData.team=i.userData.visualState.team,i.userData.level=r,i.userData.destroyed=!!s.destroyed,i.userData.refuge&&(i.userData.refuge.team=i.userData.team),i.userData.leafMaterial.color.set(e(i.userData.team)).lerp(new ee("#72964b"),.7),i.userData.growth.forEach((o,a)=>{o.visible=a<=r}),i.userData.collisionRevision=(i.userData.collisionRevision||0)+1,i}function u1(i,t,{bucketSize:e=6}={}){let n=0,s=-1/0,r=0;for(let c=0;c<t.length;c+=3)n=Math.max(n,Math.hypot(t[c],t[c+2])),s=Math.max(s,t[c+1]),r=Math.max(r,Math.abs(t[c+1]));const o=new Map,a=Number.isFinite(e)&&e>0?e:6,l=Math.sin(.04);for(const c of i){const h=n*c.visualRadius*1.07+r*l+.01,u={lily:c,radiusSquared:h*h,heightOffset:s+n*c.visualRadius*1.07*l+.018+.01};for(let d=Math.floor((c.x-h)/a);d<=Math.floor((c.x+h)/a);d++)for(let f=Math.floor((c.z-h)/a);f<=Math.floor((c.z+h)/a);f++){const g=d+":"+f;o.has(g)||o.set(g,[]),o.get(g).push(u)}}return(c,h)=>{let u=-1/0;const d=o.get(Math.floor(c/a)+":"+Math.floor(h/a))||[];for(const{lily:f,radiusSquared:g,heightOffset:m}of d){const x=c-f.x,p=h-f.z;x*x+p*p<=g&&(u=Math.max(u,f.y+m))}return u}}const Ue=Math.PI*2,ns=Vc.clamp,ni=(i,t,e)=>(e=ns((e-i)/(t-i),0,1),e*e*(3-2*e));function Bi(i){return()=>{i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const oa=(i,t)=>Math.sin(i*.213+Math.sin(t*.137)*1.9)*.48+Math.sin(t*.329-i*.079)*.27+Math.cos(i*.741+t*.533)*.13,hn=i=>new ee(i),pt=new qe;new L(0,1,0);const cd=[{sky:"#8aaab0",fog:"#819e91",earth:"#8b8a62",wet:"#43533b",deep:"#52634e",leaf:"#b5d28f",rock:"#a4a292",moss:"#89976c",bark:"#65513a",reed:"#b4a676",water:"#2c6258",nightWater:"#0c2b32"},{sky:"#91acbd",fog:"#8bada6",earth:"#82958a",wet:"#3c6257",deep:"#456b68",leaf:"#a0c9ad",rock:"#a7b5ae",moss:"#7f9b88",bark:"#605848",reed:"#aebca0",water:"#3b747b",nightWater:"#122c3b"},{sky:"#b4a58a",fog:"#a39b7e",earth:"#b09b6b",wet:"#685b3c",deep:"#626047",leaf:"#d0b46b",rock:"#b6a184",moss:"#9f9a6d",bark:"#78543b",reed:"#c8ad73",water:"#69765a",nightWater:"#25352b"},{sky:"#82989c",fog:"#738d81",earth:"#7a8064",wet:"#364f3b",deep:"#3e5c52",leaf:"#93b57d",rock:"#939b8b",moss:"#6b8664",bark:"#554934",reed:"#9b9d70",water:"#376b57",nightWater:"#112e29"}];function d1(i=0,t=731+Math.max(0,i)*7919){const e=Math.max(0,Math.floor(Number(i)||0)),n=e%8,[s,r]=[[1,0],[0,1],[-1,0],[0,-1]][n%4],o=n>=4?-1:1,a=(h,u)=>e?{x:s*h*o+r*u,z:-r*h*o+s*u}:{x:h,z:u},l=(h,u)=>e?{x:o*(s*h-r*u),z:r*h+s*u}:{x:h,z:u},c=Bi((Number(t)||731)^Math.imul(e,2654435761));return{index:e,seed:t,symmetry:n,yaw:n%4*Math.PI/2,toWorld:a,toSource:l,palette:{...cd[e%cd.length]},noiseOffset:e?{x:(c()-.5)*170,z:(c()-.5)*170}:{x:0,z:0}}}function wh(i,t,e=1){const n=document.createElement("canvas");n.width=n.height=i,t(n.getContext("2d"),i);const s=new Vd(n);return s.colorSpace=Un,s.wrapS=s.wrapT=Ar,s.repeat.set(e,e),s.anisotropy=4,s}function kl(i,t=!1){const e=Bi(i);return wh(256,(n,s)=>{n.fillStyle=t?"#6c7155":"#8b8978",n.fillRect(0,0,s,s);for(let r=0;r<15e3;r++){const o=e()*s,a=e()*s,l=45+e()*110;n.fillStyle=t?`rgba(${l*.8},${l},${l*.61},${.12+e()*.28})`:`rgba(${l*1.06},${l},${l*.85},${.15+e()*.3})`,n.fillRect(o,a,.5+e()*3,.5+e()*3)}n.lineWidth=.7;for(let r=0;r<26;r++){n.strokeStyle=`rgba(31,36,28,${.06+e()*.15})`,n.beginPath();let o=e()*s;n.moveTo(0,o);for(let a=0;a<s;a+=10)o+=(e()-.5)*9,n.lineTo(a,o);n.stroke()}},1)}function f1(i){const t=Bi(i);return wh(512,(e,n)=>{const s=e.createRadialGradient(n*.5,n*.5,4,n*.5,n*.5,n*.54);s.addColorStop(0,"#588a39"),s.addColorStop(.6,"#6ca04a"),s.addColorStop(1,"#345d27"),e.fillStyle=s,e.fillRect(0,0,n,n);for(let r=0;r<9e3;r++)e.fillStyle=t()>.5?"rgba(185,214,109,.08)":"rgba(18,58,20,.06)",e.fillRect(t()*n,t()*n,t()*4+1,t()*4+1);for(let r=.18;r<Ue-.18;r+=.31){const o=n*.5+Math.cos(r)*n*.49,a=n*.5+Math.sin(r)*n*.49;e.strokeStyle="rgba(191,204,117,.42)",e.lineWidth=1.8,e.beginPath(),e.moveTo(n*.5,n*.5),e.quadraticCurveTo(n*.5+Math.cos(r+.08)*n*.28,n*.5+Math.sin(r+.08)*n*.28,o,a),e.stroke();for(let l=.2;l<.9;l+=.15)for(const c of[-1,1])e.strokeStyle="rgba(186,211,124,.19)",e.lineWidth=.8,e.beginPath(),e.moveTo(n*.5+Math.cos(r)*n*l*.5,n*.5+Math.sin(r)*n*l*.5),e.lineTo(n*.5+Math.cos(r+c*.12)*n*(l+.1)*.5,n*.5+Math.sin(r+c*.12)*n*(l+.1)*.5),e.stroke()}for(let r=0;r<13;r++){const o=t()*Ue,a=t()*n*.45;e.fillStyle="rgba(42,56,17,.16)",e.beginPath(),e.ellipse(n*.5+Math.cos(o)*a,n*.5+Math.sin(o)*a,t()*5+2,t()*3+1,o,0,Ue),e.fill()}})}function p1(i){const e=document.createElement("canvas");e.width=e.height=256;const n=e.getContext("2d"),s=n.createImageData(256,256);for(let o=0;o<256;o++)for(let a=0;a<256;a++){const l=(o*256+a)*4,c=a*Ue/256,h=o*Ue/256,u=Math.cos(c*9+h*7)*.27+Math.cos(c*17-h*11)*.14+Math.sin(c*31+h*19)*.07,d=Math.sin(c*7+h*13)*.27+Math.sin(c*19-h*9)*.13+Math.cos(c*29+h*23)*.08;s.data[l]=128+u*110,s.data[l+1]=128+d*110,s.data[l+2]=245,s.data[l+3]=255}n.putImageData(s,0,0);const r=new Vd(e);return r.wrapS=r.wrapT=Ar,r.colorSpace=Li,r}function $c(i,t,e=.1,n=1){const s=Bi(n),r=i.attributes.position,o=new Float32Array(r.count*3),a=hn(t);for(let l=0;l<r.count;l++){const c=1+(s()-.5)*e;o[l*3]=a.r*c,o[l*3+1]=a.g*c,o[l*3+2]=a.b*c}return i.setAttribute("color",new un(o,3)),i}function Ke(i,t,e,n=12,s=0){const r=new mo(i.map(a=>new L(...a))),o=new Oa(r,n,t,5,!1);if(s){const a=o.attributes.position;for(let l=0;l<=n;l++){const c=r.getPointAt(l/n),h=1-s*l/n;for(let u=0;u<=5;u++){const d=l*6+u;a.setXYZ(d,c.x+(a.getX(d)-c.x)*h,c.y+(a.getY(d)-c.y)*h,c.z+(a.getZ(d)-c.z)*h)}}o.computeVertexNormals()}return new Jt(o,e)}function ii(i,t=[],e=new Set){i.updateMatrixWorld(!0);const n=new ue().copy(i.matrixWorld).invert(),s=new Map;i.traverse(r=>{if(!r.isMesh||r.isInstancedMesh||e.has(r)||Array.isArray(r.material))return;const o=r.material.uuid;s.has(o)||s.set(o,{material:r.material,meshes:[]}),s.get(o).meshes.push(r)});for(const{material:r,meshes:o}of s.values()){if(o.length<2)continue;const a=o.map(h=>h.geometry.clone().applyMatrix4(new ue().multiplyMatrices(n,h.matrixWorld))),l=ki(a,!1);for(const h of a)h.dispose();if(!l)continue;const c=new Jt(l,r);c.castShadow=o.some(h=>h.castShadow),c.receiveShadow=!0,t.push(l);for(const h of o){h.removeFromParent();const u=t.indexOf(h.geometry);u>=0&&(t.splice(u,1),h.geometry.dispose())}i.add(c)}}function ts(i=1,t=1,e=.08){const n=[],s=[],r=[];for(let c=0;c<=3;c++)for(let h=0;h<=40;h++){const u=c/3,d=.22+h/40*(Ue-.44),f=1+.027*Math.sin(d*7)+.016*Math.cos(d*13),g=Math.cos(d)*u*f,m=Math.sin(d)*u*f;n.push(g*i,e*(u*u)+.014*Math.sin(d*4)*u*u,m*t),s.push(g*.48+.5,m*.48+.5)}for(let c=0;c<3;c++)for(let h=0;h<40;h++){const u=c*41+h,d=u+40+1;r.push(u,u+1,d,d,u+1,d+1)}const l=new Se;return l.setAttribute("position",new Vt(n,3)),l.setAttribute("uv",new Vt(s,2)),l.setIndex(r),l.computeVertexNormals(),l}function Nl(i){const t=Bi(i),e=28,n=[[-.47,.57],[-.2,.91],[.15,1],[.52,.86],[.71,.61],[.76,.08]],s=[],r=[],o=[],a=Array.from({length:e+1},(h,u)=>.87+.12*Math.sin(u*1.51+i)+t()*.12);a[e]=a[0];for(let h=0;h<n.length;h++)for(let u=0;u<=e;u++){const d=u/e*Ue,f=n[h][1]*a[u],g=(Math.sin(d*5+i)+Math.sin(d*9-i))*.045;s.push(Math.cos(d)*f,n[h][0]+g*(h===5?.15:1),Math.sin(d)*f*.86),r.push(Math.cos(d)*f*.5+.5,Math.sin(d)*f*.5+.5)}for(let h=0;h<n.length-1;h++)for(let u=0;u<e;u++){const d=h*(e+1)+u,f=d+e+1;o.push(d,f,d+1,d+1,f,f+1)}const l=s.length/3;s.push(0,.764,0),r.push(.5,.5);for(let h=0;h<e;h++)o.push(l,(n.length-1)*(e+1)+h+1,(n.length-1)*(e+1)+h);const c=new Se;return c.setAttribute("position",new Vt(s,3)),c.setAttribute("uv",new Vt(r,2)),c.setIndex(o),c.computeVertexNormals(),c}function Yc(i){const t=Bi(i),e=[],n=[],s=[],r=[];for(let a=0;a<5;a++){const l=t()*Ue,c=.55+t()*.7,h=.1+t()*.35,u=.022+t()*.035,d=hn(a%2?"#819c42":"#526f33"),f=e.length/3;for(let g=0;g<=7;g++){const m=g/7,x=Math.cos(l)*h*m*m,p=Math.sin(l)*h*m*m,v=u*Math.sin(Math.PI*(m*.94+.04));for(const y of[-1,1])e.push(x+Math.cos(l+Math.PI/2)*v*y,m*c,p+Math.sin(l+Math.PI/2)*v*y),n.push(y*.5+.5,m),r.push(d.r*(.65+m*.35),d.g*(.65+m*.35),d.b*(.65+m*.35))}for(let g=0;g<7;g++){const m=f+g*2;s.push(m,m+1,m+2,m+1,m+3,m+2)}}const o=new Se;return o.setAttribute("position",new Vt(e,3)),o.setAttribute("uv",new Vt(n,2)),o.setAttribute("color",new Vt(r,3)),o.setIndex(s),o.computeVertexNormals(),o}function m1(){const i=new Oa(new mo([new L,new L(.03,.8,.015),new L(.1,1.8,.04)]),9,.013,5,!1);$c(i,"#64754a",.15,8);const t=new jn(1,7,7);t.scale(.065,.25,.065),t.translate(.1,1.61,.04),$c(t,"#5d3f27",.3,5);const e=Yc(92);e.scale(.8,1.45,.8);const n=ki([i,t,e],!1);return i.dispose(),t.dispose(),e.dispose(),n}function g1(i){const t=new jn(1,13,9),e=t.attributes.position;for(let n=0;n<e.count;n++){const s=e.getX(n),r=e.getY(n),o=e.getZ(n),a=1+.06*Math.sin(s*12+i)*Math.sin(o*13-r*7);e.setXYZ(n,s*a,r*.83*a,o*a)}return t.computeVertexNormals(),t}function x1(){const i=[],t=[],e=[];function n(r,o,a,l){const c=i.length/3;i.push(...r,...o,...a);const h=hn(l);for(let u=0;u<3;u++)t.push(h.r,h.g,h.b);e.push(c,c+1,c+2)}n([0,.025,-.1],[-.045,0,0],[0,.04,.09],"#16201b"),n([0,.025,-.1],[0,.04,.09],[.045,0,0],"#293327"),n([0,0,0],[-.17,.025,-.035],[-.12,.015,.07],"#a0b3b0"),n([0,0,0],[.12,.015,.07],[.17,.025,-.035],"#a0b3b0");const s=new Se;return s.setAttribute("position",new Vt(i,3)),s.setAttribute("color",new Vt(t,3)),s.setIndex(e),s.computeVertexNormals(),s}function Yr(i,t,e,n,{castShadow:s=!1,receiveShadow:r=!1,dynamic:o=!1}={}){const a=new te;a.name=n;const l=new Map,c=[],h=[],u=new Set,d=128;e.forEach((f,g)=>{const m=Math.floor(f.x/d)+":"+Math.floor(f.z/d);l.has(m)||l.set(m,[]),l.get(m).push(g)});for(const[f,g]of l){const m=new wn(i,t,g.length);m.name=n+" · "+f,m.castShadow=s,m.receiveShadow=r,m.userData.spatialChunk=!0,m.userData.chunkSpan=d,o&&m.instanceMatrix.setUsage(Ui),g.forEach((x,p)=>{c[x]={mesh:m,index:p}}),a.add(m),h.push(m)}return{group:a,meshes:h,count:e.length,setMatrixAt(f,g){const m=c[f];m.mesh.setMatrixAt(m.index,g),u.add(m.mesh)},setColorAt(f,g){const m=c[f];m.mesh.setColorAt(m.index,g)},finish(){for(const f of h)f.computeBoundingBox(),f.computeBoundingSphere(),f.boundingSphere.radius+=.75,f.instanceMatrix.needsUpdate=!0,f.instanceColor&&(f.instanceColor.needsUpdate=!0);u.clear()},flush(){for(const f of u)f.instanceMatrix.needsUpdate=!0;u.clear()}}}function v1(i,t,e={}){const n=Math.max(0,Math.floor(Number(e.regionIndex)||0)),s=e.seed??731+n*7919,r=d1(n,s),o=r.palette,a=Bi(s),l=new te;l.name="The living creek",i.add(l);const c=e.natural===!0,h=c?r1(r):null,u=h?.landmarks||[],d=h?.nest||null,f=h?.cover||[],g=[],m=[];let x=Qi,p=Qi,v={flow:.45},y=!1,M=null;const R=[],E=[],w=new Set,A=new Map,S=new Set,b=[],U=new Map,P=6;let G=null;const j={reflectionRenders:0,reflectionSkips:0,flyMatricesUpdated:0,spatialChunks:0,terrainUpdates:0};new ee(o.sky);const O=new ee(o.fog);i.fog?i.fog.color.copy(O):i.fog=new ka(O,.0042);const B=kl(s),K=kl(s+9,!0),q=f1(s),Y=p1();b.push(B,K,q,Y);const H={terrain:new Ve({color:16777215,vertexColors:!0,map:K,roughness:1}),leaf:new Ve({color:o.leaf,map:q,roughness:.44,metalness:.025,side:Ce}),rock:new Ve({color:o.rock,map:B,roughness:.89}),mossRock:new Ve({color:o.moss,map:K,roughness:.94}),plant:new Ve({color:16777215,vertexColors:!0,roughness:.87,side:Ce}),bark:new Ve({color:o.bark,map:B,roughness:.94}),reed:new Ve({color:o.reed,map:B,roughness:.83}),compost:new Ve({color:"#57422e",map:K,roughness:1}),fruit:new Ve({color:"#b38539",map:B,roughness:.75}),darkFruit:new Ve({color:"#685831",map:K,roughness:.95})},st=[Nl(7),Nl(35),Nl(89)],_t=ts(),ne=g1(19),le=[{id:"home",x:8,z:8,radius:7.4,team:"neutral",name:"Willow Haven"},{id:"mudfang",x:-31,z:-30,radius:7,team:"enemy",name:"Mudfang Den"},{id:"redreed",x:31,z:-56,radius:7.6,team:"enemy",name:"Red Reed Stronghold"},{id:"mossjaw",x:-24,z:49,radius:7.1,team:"enemy",name:"Mossjaw Hollow"},{id:"blackpool",x:34,z:79,radius:8,team:"enemy",name:"Blackwater Nest"},{id:"thornback",x:-8,z:-91,radius:8,team:"enemy",name:"Thornback Root"},{id:"oldwillow",x:-38,z:96,radius:7.5,team:"neutral",name:"Αυλή της Γέρικης Ιτιάς"},{id:"quietbend",x:29,z:32,radius:6.8,team:"neutral",name:"Quiet Bend"},{id:"foxglove",x:-39,z:2,radius:6.8,team:"neutral",name:"Foxglove Island"},{id:"reedcrossing",x:3,z:-45,radius:6.8,team:"neutral",name:"Πέρασμα των Καλαμιών"},{id:"longreed",x:-4,z:67,radius:6.8,team:"neutral",name:"Νησίδα των Ανέμων"},{id:"eastshallows",x:58,z:35,radius:6.8,team:"neutral",name:"Ανατολικές Αβαθείς"}],ut={home:.65,mudfang:2.7,redreed:4.1,mossjaw:1.8,blackpool:5.2,thornback:7.1,oldwillow:2.9,quietbend:1.2,foxglove:2.1,reedcrossing:1.7,longreed:2.5,eastshallows:3.4},$=Bi(s^3582759),ot={home:{x:17,z:16,radius:7.4,elevation:.65},mudfang:{x:38,z:-19,radius:9,elevation:1.35},redreed:{x:-37,z:-46,radius:11,elevation:1.2},mossjaw:{x:-34,z:44,radius:11,elevation:1.05},blackpool:{x:40,z:86,radius:12,elevation:1.5},thornback:{x:-16,z:-120,radius:12,elevation:1.65}};for(const _ of le){const z=ot[_.id],N=c&&z?{x:z.x,z:z.z}:{x:_.x*xe,z:_.z*xe};Object.assign(_,r.toWorld(N.x,N.z)),_.radius=c?z?.radius||10:Math.max(36,_.radius*(_.id==="thornback"?5.8:4.9)),_.elevation=c?z?.elevation||1.1:Math.max(.45,ut[_.id]+(n?($()-.5)*.6:0)),_.shorePhase=N.x+(n?$()*Ue:0),n&&(_.yaw=r.yaw)}le.find(_=>_.id==="thornback").stronghold=!0;const Mt=[{id:"haven",name:"Απάνεμη Όχθη",x:0,z:12,radius:30,tint:"#77965d"},{id:"reedways",name:"Περάσματα των Καλαμιών",x:2,z:-50,radius:45,tint:"#a99d64"},{id:"westernroots",name:"Δυτικές Ρίζες",x:-34,z:22,radius:37,tint:"#657f67"},{id:"blackwater",name:"Βαθύ Νερό",x:10,z:75,radius:34,tint:"#496f79"}].map(_=>({..._,...r.toWorld(_.x*xe,_.z*xe),radius:_.radius*xe})),Xt={heron:r.toWorld(34*xe,14*xe),snake:r.toWorld(-38*xe,-22*xe),fish:r.toWorld(12*xe,48*xe)},Ft={heron:r.toWorld(43*xe,-73*xe),snake:r.toWorld(-39*xe,70*xe),fish:r.toWorld(11*xe,94*xe)};c&&(Object.assign(Xt,{heron:r.toWorld(34,15),snake:r.toWorld(-26,-23),fish:r.toWorld(5,-34)}),Object.assign(Ft,{heron:r.toWorld(41,-70),snake:r.toWorld(-34,62),fish:r.toWorld(7,106)}));const pe=c?le.map(_=>({..._,...r.toSource(_.x,_.z)})):[];function we(_,z){const N=r.toSource(_,z),F=N.x/xe,k=N.z/xe;if(c)return o1(N.x,N.z,oa(N.x+r.noiseOffset.x,N.z+r.noiseOffset.z),pe);const V=Math.sin(k*.032)*15+Math.sin(k*.073)*5,Z=Math.abs(F-V);let W=-2.2+oa(N.x+r.noiseOffset.x,N.z+r.noiseOffset.z)*.47+ni(44,71,Z)*6;W+=ni(47,72,Z)*(1.5+3.3*Math.sin(k*.036+.7)**2),W+=ni(105,132,Math.abs(k))*4.8;let it=null,ft=0;for(const Nt of le){const ae=_-Nt.x,Ae=z-Nt.z,Re=Math.hypot(ae,Ae),ge=r.toSource(ae,Ae),sn=Nt.radius*(1+.05*Math.sin(Math.atan2(ge.z,ge.x)*5+Nt.shorePhase));if(Re<sn+7){const tn=Hy,cn=Nt.elevation-ni(tn,sn+7,Re)*(Nt.elevation+2.8);W=Math.max(W,cn);const mn=1-ni(tn,tn+8,Re);mn>ft&&(it=Nt,ft=mn)}}it&&(W=W*(1-ft)+it.elevation*ft);let At=null,Zt=0,Dt=1/0;for(const Nt of A.values()){const ae=Math.hypot(_-Nt.x,z-Nt.z),Ae=1-ni(ws,ws+sa,ae);(Ae>Zt||Ae===Zt&&Ae>0&&ae<Dt)&&(At=Nt,Zt=Ae,Dt=ae)}if(At){const Nt=W*(1-Zt)+At.elevation*Zt;W=Zt===1?At.elevation:Math.max(W,Nt)}return W}const D=new Ni(270*xe,270*xe,216,216);D.rotateX(-Math.PI/2);const ie=D.attributes.position,jt=new Float32Array(ie.count*3),Yt=hn(o.earth),Lt=hn(o.wet),re=hn(o.deep);for(let _=0;_<ie.count;_++){const z=ie.getX(_),N=ie.getZ(_),F=we(z,N);ie.setY(_,F);const k=re.clone().lerp(Lt,ni(-1.7,.05,F)).lerp(Yt,ni(.02,2,F));k.multiplyScalar(.88+oa(z*2,N*2)*.18),k.toArray(jt,_*3)}D.setAttribute("color",new un(jt,3)),D.computeVertexNormals(),K.repeat.set(44*xe,44*xe);const mt=new Jt(D,H.terrain);mt.receiveShadow=!0,mt.name="Creek bed and island banks",l.add(mt);const bt=135*xe,he=270*xe/216,ze=217;function I(_,z){const N=Vc.clamp((_+bt)/he,0,216),F=Vc.clamp((z+bt)/he,0,216),k=Math.min(215,Math.floor(N)),V=Math.min(215,Math.floor(F)),Z=N-k,W=F-V,it=V*ze+k,ft=it+ze,At=ie.getY(it),Zt=ie.getY(it+1),Dt=ie.getY(ft),Nt=ie.getY(ft+1);return Z+W<=1?At+Z*(Zt-At)+W*(Dt-At):Nt+(1-Z)*(Dt-Nt)+(1-W)*(Zt-Nt)}function T(_){const z=ws+sa+he*2;for(let N=0;N<ie.count;N++){const F=ie.getX(N),k=ie.getZ(N);if(Math.abs(F-_.x)>z||Math.abs(k-_.z)>z)continue;const V=we(F,k);ie.setY(N,V);const Z=re.clone().lerp(Lt,ni(-1.7,.05,V)).lerp(Yt,ni(.02,2,V));Z.multiplyScalar(.88+oa(F*2,k*2)*.18),Z.toArray(jt,N*3)}ie.needsUpdate=!0,D.attributes.color.needsUpdate=!0,D.computeVertexNormals(),D.computeBoundingBox(),D.computeBoundingSphere(),j.terrainUpdates++}const tt=kl(s+9,!0);b.push(tt),H.mossRock.map=tt,H.compost.map=tt,H.darkFruit.map=tt;const lt=new Ni(266*xe,266*xe,88,88),ct=new Ny(lt,{textureWidth:512,textureHeight:512,waterNormals:Y,sunDirection:new L(.6,.8,-.3),sunColor:16771517,waterColor:3039835,distortionScale:2.5,alpha:.91,fog:!0});ct.name="Reflecting creek",ct.rotation.x=-Math.PI/2,ct.position.y=Qi,ct.material.transparent=!0,ct.material.depthWrite=!1,ct.renderOrder=-2,ct.material.uniforms.size.value=4.8,l.add(ct);const at=ct.onBeforeRender;let Ut=0;ct.onBeforeRender=function(_,z,N){if(ct.material.uniforms.eye.value.setFromMatrixPosition(N.matrixWorld),Ut++%2){j.reflectionSkips++;return}j.reflectionRenders++,at.call(this,_,z,N)};const ht=lt.attributes.position.array.slice(),Et=[],It=new te,gt=[];It.name="Willow trunks and tangled roots",l.add(It);for(let _ of[-1,1])for(let z=0;z<15;z++){const N=(-122+z*17+(a()-.5)*7)*xe,F=(_*(59+a()*15)+Math.sin(N/xe*.032)*15)*xe,{x:k,z:V}=r.toWorld(F,N),Z=we(k,V);if(Z<.2)continue;const W=new te;W.position.set(k,Z,V);const it=9+a()*14,ft=(a()-.5)*3,At=Ke([[0,-.8,0],[.25,it*.3,0],[ft,it*.72,.6],[ft*.8,it,1]],.68+a()*.65,H.bark,13,.72);At.castShadow=!0,W.add(At),Et.push(At.geometry);for(let Zt=0;Zt<5;Zt++){const Dt=Zt/5*Ue+a(),Nt=3+a()*4,ae=Ke([[0,.7,0],[Math.cos(Dt)*Nt*.45,.1,Math.sin(Dt)*Nt*.45],[Math.cos(Dt)*Nt,-.4,Math.sin(Dt)*Nt]],.15+a()*.2,H.bark,9,.82);ae.castShadow=!0,W.add(ae),Et.push(ae.geometry)}for(let Zt=0;Zt<4;Zt++){const Dt=a()*Ue,Nt=it*(.5+a()*.3),ae=3+a()*6,Ae=Ke([[ft*.4,Nt,0],[Math.cos(Dt)*ae*.45,Nt+2,Math.sin(Dt)*ae*.45],[Math.cos(Dt)*ae,Nt+3,Math.sin(Dt)*ae]],.16+a()*.2,H.bark,10,.83);W.add(Ae),Et.push(Ae.geometry);for(let Re=0;Re<70;Re++){const ge=Math.sqrt(a())*4,sn=a()*Ue;gt.push({x:k+Math.cos(Dt)*ae+Math.cos(sn)*ge,y:Z+Nt+3+(a()-.5)*3-Math.abs(ge)*.25,z:V+Math.sin(Dt)*ae+Math.sin(sn)*ge,angle:a()*Ue,scale:.65+a()*.6})}}It.add(W)}ii(It,Et);const Ct=new Se;Ct.setAttribute("position",new Vt([0,0,0,-.12,-.32,.035,0,-.38,.06,.12,-.32,.035,-.1,-.64,.02,0,-.76,.04,.1,-.64,.02,0,-1.05,0],3)),Ct.setAttribute("uv",new Vt([.5,0,0,.3,.5,.35,1,.3,0,.6,.5,.7,1,.6,.5,1],2)),Ct.setIndex([0,1,2,0,2,3,1,4,2,2,4,5,2,5,6,2,6,3,4,7,5,5,7,6]),Ct.computeVertexNormals(),$c(Ct,"#69834d",.25,s);const Qt=Yr(Ct,H.plant,gt,"Hanging willow foliage");gt.forEach((_,z)=>{pt.position.set(_.x,_.y,_.z),pt.rotation.set((a()-.5)*.8,_.angle,(a()-.5)*.7),pt.scale.setScalar(_.scale),pt.updateMatrix(),Qt.setMatrixAt(z,pt.matrix)}),Qt.finish(),l.add(Qt.group),j.spatialChunks+=Qt.meshes.length;function Ht(_){R.push(_);const z=Math.floor((_.x-_.radius)/P),N=Math.floor((_.x+_.radius)/P),F=Math.floor((_.z-_.radius)/P),k=Math.floor((_.z+_.radius)/P);for(let V=z;V<=N;V++)for(let Z=F;Z<=k;Z++){const W=V+":"+Z;U.has(W)||U.set(W,[]),U.get(W).push(_)}return _}const wt=[],de=[[],[],[]];function X(_,z,N=1.35+a()*.9){const F=Ht({id:"p"+R.length,type:"lily",x:_,z,y:.105,radius:N*.91,visualRadius:N,angle:a()*Ue,phase:a()*Ue});return wt.push(F),F}function yt(_,z,N=1.3+a()*1.3,F=.65+a()*.65){const k=Math.floor(a()*3),V=Ht({id:"p"+R.length,type:"rock",x:_,z,y:F*.76-.05,radius:N*.72,visualRadius:N,scaleY:F,angle:a()*Ue,variant:k});return de[k].push(V),V}const Tt=r.toWorld(3.7,1),Ot=r.toWorld(-3.9,2.2);if(X(0,0,3.1),X(Tt.x,Tt.z,2.3),yt(Ot.x,Ot.z,2.5,.9),c){const _=u.find(z=>z.id==="pond").findPoint;X(_.x,_.z,1.7)}function xt(_,z){const N=Math.hypot(z.x-_.x,z.z-_.z),F=Math.ceil(N/3.65),k=r.toSource(_.x,_.z),V=r.toSource(z.x,z.z);for(let Z=1;Z<F;Z++){const W=Z/F,{x:it,z:ft}=r.toWorld(k.x+(V.x-k.x)*W+Math.sin(W*Math.PI*3)*1.25,k.z+(V.z-k.z)*W);if(we(it,ft)>-.1)continue;const At=r.toSource(it,ft);c&&At.x>14&&At.x<32&&Math.abs(At.z+16)<3.7||(a()<.18?yt(it,ft,1.8+a()*.7,.65+a()*.55):X(it,ft,1.65+a()*.65))}}const dt={id:"origin",x:0,z:0},Gt=new Map(le.map(_=>[_.id,_]));Gt.set("origin",dt);const Be=[["origin","home"],["origin","foxglove"],["home","mudfang"],["home","quietbend"],["mudfang","reedcrossing"],["reedcrossing","redreed"],["reedcrossing","thornback"],["foxglove","mossjaw"],["quietbend","mossjaw"],["quietbend","eastshallows"],["mossjaw","longreed"],["longreed","blackpool"],["longreed","oldwillow"],["eastshallows","blackpool"],["redreed","thornback"]].map(([_,z])=>({from:_,to:z,start:Gt.get(_),end:Gt.get(z)}));for(const _ of Be)xt(_.start,_.end);if(c){const _=z=>u.find(N=>N.id===z);for(const[z,N]of[[dt,_("creek")],[_("creek"),_("roots")],[_("roots"),_("bank")],[_("bank"),d]])xt(z,N)}for(let _=0;_<1180;_++){const z=(a()-.5)*218*xe,N=((a()-.5)*108+Math.sin(z/xe*.032)*10)*xe,{x:F,z:k}=r.toWorld(N,z);if(we(F,k)>-.18)continue;const V=r.toSource(F,k);c&&V.x>14&&V.x<32&&Math.abs(V.z+16)<3.7||(U.get(Math.floor(F/P)+":"+Math.floor(k/P))||[]).some(W=>Math.hypot(W.x-F,W.z-k)<W.radius+1)||(a()<.15?yt(F,k,1.1+a()*2.3,.55+a()*1.2):X(F,k,1.1+a()*1.1))}for(const _ of le)Ht({id:"island-"+_.id,type:"land",x:_.x,z:_.z,y:_.elevation,radius:_.radius*.8});const ye=Yr(_t,H.leaf,wt,"Veined water lily leaves",{castShadow:!0,receiveShadow:!0,dynamic:!0}),Kn=u1(wt,_t.attributes.position.array);wt.forEach((_,z)=>{pt.position.set(_.x,_.y,_.z),pt.rotation.set((a()-.5)*.04,_.angle,(a()-.5)*.035),pt.scale.set(_.visualRadius,1,_.visualRadius*(.89+a()*.18)),pt.updateMatrix(),ye.setMatrixAt(z,pt.matrix),ye.setColorAt(z,hn(["#b6cf8a","#88ac67","#749d59","#c0cc7e","#729958"][Math.floor(a()*5)]))}),ye.finish(),l.add(ye.group),j.spatialChunks+=ye.meshes.length,de.forEach((_,z)=>{const N=Yr(st[z],z===1?H.mossRock:H.rock,_,"Weathered waterline outcrops",{castShadow:!0,receiveShadow:!0});_.forEach((F,k)=>{pt.position.set(F.x,-.05,F.z),pt.rotation.set(0,F.angle,0),pt.scale.set(F.visualRadius,F.scaleY,F.visualRadius),pt.updateMatrix(),N.setMatrixAt(k,pt.matrix),N.setColorAt(k,hn("#ffffff").multiplyScalar(.7+a()*.4))}),N.finish(),l.add(N.group),j.spatialChunks+=N.meshes.length});const vn=new Se,Dr=[],ai=[],Os=[];for(let _=0;_<=9;_++){const z=_/9,N=Math.sin(z*Math.PI)*.16;for(const F of[-1,1])Dr.push(F*N,.13*Math.sin(z*Math.PI)+.23*z*z,z*.65),ai.push(F*.5+.5,z)}for(let _=0;_<9;_++){const z=_*2;Os.push(z,z+1,z+2,z+1,z+3,z+2)}vn.setAttribute("position",new Vt(Dr,3)),vn.setAttribute("uv",new Vt(ai,2)),vn.setIndex(Os),vn.computeVertexNormals();const _o=new Ve({color:"#f4e5d5",roughness:.48,side:Ce}),Lr=wt.filter((_,z)=>z%23===5),Si=new wn(vn,_o,Lr.length*13);let bo=0;for(const _ of Lr)for(let z=0;z<13;z++)pt.position.set(_.x+.24,_.y+.045,_.z),pt.rotation.set(z>7?.1:0,z/8*Ue,z>7?.1:0),pt.scale.setScalar(z>7?.67:1),pt.updateMatrix(),Si.setMatrixAt(bo++,pt.matrix);l.add(Si);const li=[];for(let _=0;_<26e3;_++){const z=(a()-.5)*254*xe,N=(a()-.5)*254*xe,F=we(z,N);F<-.52||F>3.2||le.some(k=>Math.hypot(k.x-z,k.z-N)<k.radius*.68)||Math.hypot(z,N)<8||li.push({x:z,z:N,y:F,scale:.65+a()*2.2,angle:a()*Ue})}const So=Yc(44),ci=Yr(So,H.plant,li,"Curved river reeds",{receiveShadow:!0});li.forEach((_,z)=>{pt.position.set(_.x,_.y,_.z),pt.rotation.set(0,_.angle,0),pt.scale.set(.65+_.scale*.25,_.scale,.65+_.scale*.25),pt.updateMatrix(),ci.setMatrixAt(z,pt.matrix),ci.setColorAt(z,hn("#ffffff").multiplyScalar(.75+a()*.5))}),ci.finish(),l.add(ci.group),j.spatialChunks+=ci.meshes.length;const Ur=li.filter((_,z)=>_.y<.5&&z%5===0),$a=m1(),Xi=Yr($a,H.plant,Ur,"Cattail patches");Ur.forEach((_,z)=>{pt.position.set(_.x+.12,_.y,_.z),pt.rotation.set(0,_.angle,0),pt.scale.setScalar(.7+_.scale*.4),pt.updateMatrix(),Xi.setMatrixAt(z,pt.matrix)}),Xi.finish(),l.add(Xi.group),j.spatialChunks+=Xi.meshes.length;const wo={value:0};H.plant.onBeforeCompile=_=>{_.uniforms.uCreekTime=wo,_.vertexShader=`uniform float uCreekTime;
`+_.vertexShader,_.vertexShader=_.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 transformed.x += sin(uCreekTime * 1.1 + position.y * 2.3 + instanceMatrix[3].x * .13 + instanceMatrix[3].z * .17) * pow(max(position.y, 0.0), 1.6) * .035;`)},H.plant.customProgramCacheKey=()=>"creek-wind-1";function gs(_,z){const N=c?x-.065:-.1;let F=I(_,z),k=F>N?"land":"water",V=null;F<=N&&(F=c?x-.215:-.25);const Z=U.get(Math.floor(_/P)+":"+Math.floor(z/P))||[];for(const W of Z){if(W.type==="land")continue;const it=Math.hypot(_-W.x,z-W.z);if(it<=W.radius){let ft=W.y;if(W.type==="rock"&&(ft-=ni(W.radius*.62,W.radius,it)*.14*W.scaleY),c&&ft<=N)continue;ft>F&&(F=ft,k=W.type==="shelter"?"land":W.type,V=W)}}return n1(m,_,z)||{height:F,type:k,platform:V}}function Bs(_,z){return gs(_,z).height}function C(_,z){return Math.max(Bs(_,z),Kn(_,z))}const J=[{x:4.5/xe,z:-4/xe,rich:!1},{x:-10,z:12,rich:!0},{x:15,z:-20,rich:!1},{x:-25,z:-23,rich:!0},{x:26,z:-47,rich:!0},{x:-17,z:40,rich:!0},{x:27,z:69,rich:!0},{x:-4,z:-81,rich:!0},{x:-34,z:86,rich:!0},{x:23,z:26,rich:!1},{x:-33,z:7,rich:!1},{x:4,z:51,rich:!1},{x:9,z:-59,rich:!1},{x:-12,z:76,rich:!1},{x:39,z:-4,rich:!1},{x:-42,z:-59,rich:!0},{x:7,z:-39,rich:!0},{x:0,z:63,rich:!0},{x:53,z:33,rich:!0},{x:-24,z:17,rich:!1},{x:17,z:-70,rich:!1},{x:18,z:90,rich:!0}].map(_=>({..._,...r.toWorld(_.x*xe,_.z*xe)}));if(c)for(const[_,z]of[{x:4.5,z:-4},{x:18,z:14},{x:9,z:-24},{x:26,z:10},{x:31,z:-16},{x:-20,z:-8}].entries())Object.assign(J[_],r.toWorld(z.x,z.z));const et=[],nt=[],Q=[],vt=new te;l.add(vt);for(let _=0;_<J.length;_++){const z=J[_];we(z.x,z.z)<-.15&&yt(z.x,z.z,z.rich?3.2:2.2,.62);const F=Bs(z.x,z.z),k={id:"flies-"+_,x:z.x,z:z.z,y:F+.25,flies:z.rich?240:100,maxFlies:z.rich?240:100,rich:z.rich};if(c){const Z=[...u].sort((W,it)=>Math.hypot(z.x-W.x,z.z-W.z)-Math.hypot(z.x-it.x,z.z-it.z))[0]?.id||"creek";k.ecology={habitat:Z,activity:1},k.regenMultiplier=1}E.push(k);const V=new Jt(st[_%3],H.compost);V.position.set(z.x,F+.05,z.z),V.scale.set(z.rich?1.7:1.05,.28,z.rich?1.25:.75),V.rotation.y=a()*Ue,l.add(V),nt.push(V);for(let Z=0;Z<(z.rich?12:6);Z++){const W=a()*Ue,it=a()*(z.rich?1.5:.85),ft=.12+a()*.16;et.push({spot:_,groundOffset:ft,x:z.x+Math.cos(W)*it,y:F+ft,z:z.z+Math.sin(W)*it,scale:.12+a()*.18,rot:a()*Ue})}for(let Z=0;Z<3;Z++){const W=a()*Ue,it=.7+a()*.8,ft=Ke([[0,0,0],[it*.5,.02,.06],[it,.04,.14]],.035,H.bark,4);ft.position.set(z.x+(a()-.5)*1.6,F+.1,z.z+(a()-.5)*1.6),ft.rotation.y=W,vt.add(ft),Q.push(ft.geometry)}}ii(vt,Q);for(const _ of J)if(we(_.x,_.z)<-.15){const z=de.flat().find(N=>Math.abs(N.x-_.x)<.01&&Math.abs(N.z-_.z)<.01);if(z){const N=new Jt(st[z.variant],H.mossRock);N.position.set(z.x,-.05,z.z),N.rotation.y=z.angle,N.scale.set(z.visualRadius,z.scaleY,z.visualRadius),N.castShadow=!0,N.receiveShadow=!0,l.add(N)}}const Pt=new wn(ne,H.fruit,et.length);et.forEach((_,z)=>{pt.position.set(_.x,_.y,_.z),pt.rotation.set(.3,_.rot,.2),pt.scale.setScalar(_.scale),pt.updateMatrix(),Pt.setMatrixAt(z,pt.matrix),Pt.setColorAt(z,hn(["#cb9d59","#6d7341","#aa7044","#c5ad62"][z%4]))}),l.add(Pt);const Bt=[];for(let _=0;_<E.length;_++)for(let z=0;z<(E[_].rich?65:30);z++)Bt.push({spot:_,phase:a()*Ue,phase2:a()*Ue,r:.25+a()*(E[_].rich?2.3:1.35),height:.45+a()*1.9,speed:.65+a()*1.7,rank:z});const kt=E.map(()=>[]);for(const _ of Bt)kt[_.spot].push(_);const oe=new Ve({vertexColors:!0,roughness:.45,side:Ce}),$t=new wn(x1(),oe,Bt.length);$t.instanceMatrix.setUsage(Ui),$t.frustumCulled=!1,$t.name="Fly swarms",$t.count=0,l.add($t);const qt=c?l1({group:l,layout:r,terrainHeight:I,surface:gs,insertPlatform:Ht,materials:H,rockGeos:st,tube:Ke,leafGeometry:ts,bladeGeometry:Yc,geography:h}):null;qt&&g.push(...qt.grips);function Ee(_,z){return c&&gs(_,z).type==="water"?a1(r,_,z,v.flow):{x:0,z:0,strength:0}}function Ne(_,z){return c&&f.some(N=>Math.hypot(_-N.x,z-N.z)<N.radius*.85)&&I(_,z)>x-.5}function Ze(_){x=_,ct.position.y=_,ct.updateMatrix(),Si.position.y=_-Qi,Si.updateMatrix();for(const z of wt)z.y=.105+_-Qi}function We(_={}){if(!c)return!1;v={...v,..._.phase||{}},p=Qi+ns(Number(v.waterOffset)||0,-.75,.65),y||(Ze(p),y=!0);for(const N of E){const F=N.ecology?.habitat===v.foodShift?1.4:typeof v.foodShift=="string"?.45:1;N.regenMultiplier=F,N.ecology.activity=F}const z=_.nest;if(z&&Number.isFinite(z.x)&&Number.isFinite(z.z)){const N={id:"living-creek-nest",x:z.x,z:z.z,team:"ally",natural:!0,nestLevel:z.level??0,safe:z.safe,hp:1,maxHp:1};M?Ka(M,N):M=Ao(N)}return qt.sync(_,x),!0}const Ie=64,Kt=new Ni(2,2),De=new Jm;Kt.rotateX(-Math.PI/2),De.index=Kt.index,De.attributes.position=Kt.attributes.position,De.attributes.uv=Kt.attributes.uv;const Te=new Float32Array(Ie*3),yn=new Float32Array(Ie).fill(-100),wi=new Float32Array(Ie),Mn=new Float32Array(Ie*3);De.setAttribute("aCenter",new pr(Te,3)),De.setAttribute("aStart",new pr(yn,1)),De.setAttribute("aSize",new pr(wi,1)),De.setAttribute("aTint",new pr(Mn,3)),De.instanceCount=Ie;const qi=new Zn({transparent:!0,depthWrite:!1,side:Ce,uniforms:{uTime:{value:0}},vertexShader:"attribute vec3 aCenter; attribute float aStart; attribute float aSize; attribute vec3 aTint; uniform float uTime; varying vec2 vUv; varying float vLife; varying vec3 vTint; void main(){vUv=uv; vLife=(uTime-aStart)/2.4; vTint=aTint; vec3 p=position*aSize*(.35+clamp(vLife,0.,1.)*3.8)+aCenter; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}",fragmentShader:"varying vec2 vUv;varying float vLife;varying vec3 vTint;void main(){if(vLife<0.||vLife>1.)discard;float r=length(vUv-.5)*2.;float band=exp(-pow((r-.82)/(.026+vLife*.018),2.))* .58+exp(-pow((r-.64)/.026,2.))*.22;float a=band*pow(1.-vLife,1.6);gl_FragColor=vec4(vTint,a);}"}),Xe=new Jt(De,qi);Xe.frustumCulled=!1,Xe.renderOrder=2,l.add(Xe);let Dn=0,Tn=0;const Je=1100,Qe=new Float32Array(Je*3),Hs=new Float32Array(Je*3),hi=new Float32Array(Je),Eo=new Float32Array(Je),Ih=Array.from({length:Je},()=>({life:0,max:1,vx:0,vy:0,vz:0,water:!0}));let Ef=0;const Ei=new Se;Ei.setAttribute("position",new un(Qe,3).setUsage(Ui)),Ei.setAttribute("aColor",new un(Hs,3).setUsage(Ui)),Ei.setAttribute("aSize",new un(hi,1).setUsage(Ui)),Ei.setAttribute("aAlpha",new un(Eo,1).setUsage(Ui));const Tf=new Zn({transparent:!0,depthWrite:!1,uniforms:{uScale:{value:500}},vertexShader:"attribute vec3 aColor;attribute float aSize;attribute float aAlpha;uniform float uScale;varying vec3 vColor;varying float vAlpha;void main(){vColor=aColor;vAlpha=aAlpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*uScale/max(.1,-mv.z),1.,35.);}",fragmentShader:"varying vec3 vColor;varying float vAlpha;void main(){vec2 p=gl_PointCoord-.5;float d=length(p)*2.;if(d>1.)discard;float shade=.6+.4*max(0.,1.-length(p-vec2(-.12,.12))*2.);gl_FragColor=vec4(vColor*shade,smoothstep(1.,.55,d)*vAlpha);}"}),Ya=new Cm(Ei,Tf);Ya.frustumCulled=!1,Ya.renderOrder=3,l.add(Ya);function Af(_,z,N){const F=Dn++%Ie;Te.set([_.x,c?(_.y??x)+.025:Math.max(-.005,(_.y??0)+.025),_.z],F*3),yn[F]=Tn,wi[F]=.7+z*.7,hn(N??"#c2e1d5").toArray(Mn,F*3);for(const V of["aCenter","aStart","aSize","aTint"])De.attributes[V].needsUpdate=!0}function Dh(_,z,N,F){const k=Math.min(90,Math.round(18+z*21)),V=hn(N??(F?"#b2d7ce":"#d5bc80"));for(let Z=0;Z<k;Z++){const W=Ef++%Je,it=Ih[W],ft=a()*Ue,At=(.6+a()*2.7)*Math.sqrt(z);it.life=it.max=.5+a()*.8,it.vx=Math.cos(ft)*At,it.vz=Math.sin(ft)*At,it.vy=(1.5+a()*4)*Math.sqrt(z),it.water=F,Qe.set([_.x+(a()-.5)*.3,(_.y??0)+.12,_.z+(a()-.5)*.3],W*3),V.clone().multiplyScalar(.85+a()*.3).toArray(Hs,W*3),hi[W]=(.045+a()*.085)*(F?1:.8),Eo[W]=.9}Ei.attributes.aColor.needsUpdate=!0,Ei.attributes.aSize.needsUpdate=!0}function Rf(_,z=1,N){z=ns(z,.1,4),Af({x:_.x,y:c?x+.01:.01,z:_.z},z,N),Dh({x:_.x,y:c?x+.03:.03,z:_.z},z,N,!0)}function Cf(_,z="#e9cb87",N=1){Dh(_,N,z,!1)}function Lh(_,z,N,F=1){const k=[],V=[],Z=[],W=[],it=Bi(F),ft=16,At=20;for(let Dt=0;Dt<=ft;Dt++)for(let Nt=0;Nt<=At;Nt++){const ae=Nt/At*2-1,Ae=Dt/ft,Re=.5+Math.sqrt(Math.max(0,1-ae*ae))*N+.06*Math.sin(Ae*23+ae*5),ge=ae*_*(.97+.025*Math.sin(Ae*19));k.push(ge,Re,(Ae-.5)*z),V.push(Nt/At,Dt/ft),hn("#809549").multiplyScalar(.85+it()*.23).toArray(W,W.length)}for(let Dt=0;Dt<ft;Dt++)for(let Nt=0;Nt<At;Nt++){const ae=Dt*(At+1)+Nt,Ae=ae+At+1;Z.push(ae,Ae,ae+1,Ae,Ae+1,ae+1)}const Zt=new Se;return Zt.setAttribute("position",new Vt(k,3)),Zt.setAttribute("uv",new Vt(V,2)),Zt.setAttribute("color",new Vt(W,3)),Zt.setIndex(Z),Zt.computeVertexNormals(),Zt}function Za(_,z,N){const F=new te,k=new Ve({color:"#a6bf76",map:q,vertexColors:!0,roughness:.78,side:Ce});N.push(k);const V=Lh(1.75,3.8,1.95,s+Math.round(_*7));N.push(V);const Z=new Jt(V,k);Z.castShadow=!0,Z.receiveShadow=!0,F.add(Z);for(let W=0;W<8;W++){const it=-1.85+W*.53,ft=[];for(let Zt=0;Zt<=12;Zt++){const Dt=Zt/12*Math.PI;ft.push([Math.cos(Dt)*1.75,.5+Math.sin(Dt)*1.96+.025,it+.025*Math.sin(Dt*4)])}const At=Ke(ft,.038,H.reed,18);N.push(At.geometry),F.add(At)}for(let W of[-1,1])for(let it=0;it<5;it++){const ft=-1.6+it*.8,At=Ke([[W*1.68,-.08,ft],[W*1.7,.45,ft],[W*1.38,1.5,ft]],.052,H.bark,5);N.push(At.geometry),F.add(At)}for(let W=0;W<7;W++){const it=.16+W*.12,ft=Ke([[-1.65,it,-1.8],[0,it+.025,-1.88],[1.65,it,-1.8]],.036,H.reed,8);N.push(ft.geometry),F.add(ft)}return ii(F,N,new Set([Z])),F.scale.setScalar(_),F.userData.roof=Z,F}const kr={player:"#8ecf75",friendly:"#8ecf75",ally:"#8ecf75",enemy:"#cf7554",neutral:"#ceb785"};function Gs(_){if(typeof _=="string"&&_.startsWith("enemy")){const z=["#e8aa70","#d8786b","#b9ad81","#a9a0d4","#8dc2b8"],N=parseInt(_.replace(/\D/g,""),10)||0;return z[N%z.length]}return kr[_]||kr.neutral}const ja=new Map;function To(_){if(ja.has(_))return ja.get(_);const z=["player","ally","friendly"].includes(_),N=_==="neutral",F=(parseInt(String(_).replace(/\D/g,""),10)||0)%5,k=wh(256,(V,Z)=>{V.fillStyle="#eee9cb",V.fillRect(0,0,Z,Z);for(let it=0;it<256;it+=4)V.fillStyle=it%8?"#ded9bd":"#f3eed3",V.fillRect(it,0,1,Z),V.fillRect(0,it,Z,1);V.save(),V.translate(38,23),V.scale(2.8,2.8),V.fillStyle=z?"#194333":N?"#494633":"#472c29",V.strokeStyle="#fff2c9",V.lineWidth=2,V.beginPath(),V.moveTo(32,3),V.lineTo(59,14),V.lineTo(56,44),V.quadraticCurveTo(53,55,32,68),V.quadraticCurveTo(11,55,8,44),V.lineTo(5,14),V.closePath(),V.fill(),V.stroke(),V.lineWidth=3.2,V.lineCap="round",V.lineJoin="round";const W=it=>{V.beginPath(),it.forEach((ft,At)=>At?V.lineTo(...ft):V.moveTo(...ft)),V.stroke()};if(z)V.beginPath(),V.moveTo(43,20),V.bezierCurveTo(28,17,18,26,21,38),V.bezierCurveTo(24,48,35,47,40,37),V.bezierCurveTo(43,30,40,24,43,20),V.stroke(),W([[20,51],[37,27]]),W([[28,40],[23,32]]),W([[32,35],[39,34]]);else if(N)W([[24,27],[32,19],[40,27]]),W([[32,19],[32,49]]),W([[23,40],[32,49],[41,40]]);else if(F===0)W([[20,19],[27,31],[22,44]]),W([[44,19],[37,31],[42,44]]),W([[28,46],[36,46]]);else if(F===1)W([[22,18],[18,36],[32,49],[46,36],[42,18]]),W([[25,30],[32,36],[39,30]]);else if(F===2)for(const[it,ft]of[[21,20],[32,15],[43,20]])W([[it,ft],[it,49]]),W([[it-4,ft+6],[it+4,ft+6]]);else F===3?(V.beginPath(),V.moveTo(44,17),V.bezierCurveTo(15,9,11,48,32,52),V.bezierCurveTo(39,53,44,50,47,45),V.bezierCurveTo(29,43,26,26,44,17),V.stroke()):W([[18,24],[25,30],[32,17],[39,30],[46,24],[41,46],[23,46],[18,24]]);V.restore()});return k.wrapS=k.wrapT=rs,ja.set(_,k),b.push(k),k}function Pf(_,z,N=0){const F=new te;F.name="Woven reed courtyard and rooted foundations";const k=5.68;for(let V=0;V<43;V++){const Z=-5.58+V*.266,W=Math.sqrt(Math.max(0,k*k-Z*Z))*(.97+.02*Math.sin(V*1.7)),it=Ke([[-W,-.045,Z],[-W*.25,-.035,Z+.022],[W*.4,-.04,Z-.018],[W,-.045,Z+.015]],.077,H.bark,7);it.receiveShadow=!0,z.push(it.geometry),F.add(it)}for(let V=0;V<25;V++){const Z=-5.4+V*.45,W=Math.sqrt(Math.max(0,k*k-Z*Z))*.98,it=Ke([[Z,.018,-W],[Z+.025,.028,0],[Z-.018,.02,W]],.027,H.reed,10);z.push(it.geometry),F.add(it)}for(let V=0;V<16;V++){const Z=V/16*Ue,W=Math.cos(Z)*5.1,it=Math.sin(Z)*5.1,ft=(I(_.position.x+(W*Math.cos(N)+it*Math.sin(N))*se,_.position.z+(it*Math.cos(N)-W*Math.sin(N))*se)-_.position.y)/se,At=Ke([[W,Math.min(-.18,ft-.15),it],[W+.03,-.35,it-.02],[W,-.08,it]],.095,H.bark,5);z.push(At.geometry),F.add(At)}ii(F,z),_.add(F),_.userData.foundation=F}function zf(_,z){const N=new te,F=Ke([[0,0,0],[.04,1.6,0],[-.03,3.1,.02]],.047,H.bark,7);z.push(F.geometry),N.add(F);const k=new Se,V=[0,2.93,0,.9,2.8,.09,1.13,2.12,.02,.6,2.25,-.03,0,2.18,0],Z=[0,1,1,1,1,0,.5,.1,0,0];k.setAttribute("position",new Vt(V,3)),k.setAttribute("uv",new Vt(Z,2)),k.setIndex([0,1,3,1,2,3,0,3,4]),k.computeVertexNormals();const W=new Ve({color:Gs(_),roughness:.8,side:Ce,map:To(_)}),it=new Jt(k,W);return it.castShadow=!0,N.add(it),N.userData.flag=it,N.userData.emblemTeam=_,z.push(k,W),N}function If(_,z,N){const F=Wy,k=Xy,V=Ia,Z=.11,W=new te;W.name="Enclosed creek castle",_.add(W);const it=new te;it.name="Reinforced castle perimeter",_.add(it);const ft=Math.asin((k/2+.25)/F),At=44,Zt=(Ue-ft*2)/At,Dt=[],Nt=[],ae=2*(F+.65)*Math.tan(Zt/2)+.08;for(let rt=0;rt<At;rt++){const St=ft+Zt*(rt+.5),ce=Math.sin(St)*F,je=Math.cos(St)*F;Dt.push({x:ce,z:je,y:Z+V/2,w:ae,h:V,d:qy,ry:St});for(const He of[-.29,.29]){const me=St+Zt*He;Dt.push({x:Math.sin(me)*F,z:Math.cos(me)*F,y:Z+V+.37,w:.76,h:.74,d:1.2,ry:me})}Nt.push({x:Math.sin(St)*(F+.64),z:Math.cos(St)*(F+.64),y:Z+1.65,w:ae*.7,h:3.1,d:.5,ry:St}),Nt.push({x:Math.sin(St)*(F+.4),z:Math.cos(St)*(F+.4),y:Z+3.5,w:ae*1.01,h:.28,d:.9,ry:St})}const Ae=[Math.PI/4,Math.PI*3/4,Math.PI*5/4,Math.PI*7/4],Re=[];for(const rt of Ae){const St=Math.sin(rt)*(F+.15),ce=Math.cos(rt)*(F+.15);Re.push({x:St,z:ce});for(let je=0;je<10;je++){const He=je/10*Ue;Dt.push({x:St+Math.sin(He)*1.42,z:ce+Math.cos(He)*1.42,y:Z+6.15,w:.6,h:.85,d:.66,ry:He})}}for(const rt of[-1,1])Dt.push({x:rt*(k/2+.62),z:F,y:Z+2.8,w:1.24,h:5.6,d:2}),Dt.push({x:rt*(k/2+.62),z:F,y:Z+5.95,w:1.6,h:.7,d:2.35}),Nt.push({x:rt*(k/2+.62),z:F+1.05,y:Z+2.4,w:1.32,h:4.8,d:.25});Dt.push({x:0,z:F,y:Z+4.85,w:k+1.2,h:.78,d:1.75});const ge=(rt,St,ce,je)=>{const He=new Gi(1,1,1),me=new wn(He,je,ce.length);return N.push(He),me.name=St,me.castShadow=!0,me.receiveShadow=!0,ce.forEach((rn,Wf)=>{pt.position.set((rn.x||0)/se,(rn.y||0)/se,(rn.z||0)/se),pt.rotation.set(rn.rx||0,rn.ry||0,rn.rz||0),pt.scale.set(rn.w/se,rn.h/se,rn.d/se),pt.updateMatrix(),me.setMatrixAt(Wf,pt.matrix)}),rt.add(me),me},sn=ge(W,"Continuous moss-stone walls and crenellations",Dt,H.mossRock);sn.userData.fullCount=Dt.length,sn.userData.firstCoursesCount=At*3,ge(it,"Whole-ring stone buttresses and gate reinforcement",Nt,H.rock);const tn=new Us(1,1.12,1,12,1),cn=new wn(tn,H.mossRock,4);N.push(tn),cn.name="Four castle defence towers",cn.castShadow=!0,cn.receiveShadow=!0,Re.forEach((rt,St)=>{pt.position.set(rt.x/se,(Z+2.9)/se,rt.z/se),pt.rotation.set(0,Ae[St],0),pt.scale.set(1.65/se,5.8/se,1.65/se),pt.updateMatrix(),cn.setMatrixAt(St,pt.matrix)}),W.add(cn);const mn=ts(1,1,.28),_n=new wn(mn,H.leaf,4);N.push(mn),_n.name="Folded leaf tower roofs",_n.castShadow=!0,Re.forEach((rt,St)=>{pt.position.set(rt.x/se,(Z+6.68)/se,rt.z/se),pt.rotation.set(0,Ae[St],0),pt.scale.set(2/se,2.4/se,2/se),pt.updateMatrix(),_n.setMatrixAt(St,pt.matrix)}),W.add(_n);const Jn=new te;Jn.name="Working south castle gate",Jn.position.set(0,Z/se,F/se),W.add(Jn);const Vs=[];for(const rt of[-1,1]){const St=new te;St.position.x=rt*k/(2*se),St.name=rt<0?"Left hinged gate":"Right hinged gate",Jn.add(St);const ce=[],je=[],He=k/2;for(let me=0;me<7;me++)ce.push({x:-rt*((me+.5)*He/7),y:V/2,z:0,w:He/7+.025,h:V-.08,d:.36});for(const me of[.65,1.9,3.2])je.push({x:-rt*He/2,y:me,z:.23,w:He-.1,h:.22,d:.2});ge(St,"Bound timber gate leaf",ce,H.bark),ge(St,"Gate cross braces",je,H.reed),Vs.push(St)}const xs=new te;xs.name="Breached gate fallen slabs",Jn.add(xs),ge(xs,"Broken gate timber",[{x:-1.45,y:.18,z:1.5,w:2.8,h:.3,d:3.5,ry:.18},{x:1.6,y:.23,z:.9,w:2.7,h:.35,d:3.2,ry:-.24}],H.bark);const Fr=new Ni(1.7/se,1.9/se),Or=new Ve({map:To(z.team),color:Gs(z.team),side:Ce,roughness:.85});N.push(Fr,Or);const Ws=new Jt(Fr,Or);return Ws.name="Castle gate clan crest",Ws.position.set(0,(Z+5.2)/se,(F+1.02)/se),W.add(Ws),_.userData.fortification=W,_.userData.palisade=it,_.userData.gate=Jn,_.userData.gateLeaves=Vs,_.userData.fallenGate=xs,_.userData.gateCrest=Ws,_.userData.fortWalls=sn,_.userData.fortTowers=cn,_.userData.fortTowerRoofs=_n,_.userData.fortificationGeometry={radius:F,gateWidth:k,wallHeight:V,gateDirection:{x:0,z:1},towerCount:4},W}function Df(_){const z=Za(1,kr.ally,_);z.name="Stone keep beneath woven leaf roof",z.userData.groundWalls=[];const N=new te;N.name="Enclosed central keep";const F=(k,V,Z,W,it,ft,At=H.mossRock)=>{const Zt=new Gi(W,it,ft),Dt=new Jt(Zt,At);_.push(Zt),Dt.position.set(k,V,Z),Dt.castShadow=!0,Dt.receiveShadow=!0,N.add(Dt),V-it/2<.03&&z.userData.groundWalls.push({minX:k-W/2,maxX:k+W/2,minZ:Z-ft/2,maxZ:Z+ft/2,height:V+it/2})};F(-1.6,.68,0,.26,1.36,3.45),F(1.6,.68,0,.26,1.36,3.45),F(0,.68,-1.65,3.05,1.36,.25);for(const k of[-1,1])F(k*1.14,.68,1.64,.9,1.36,.26);F(0,1.22,1.64,1.45,.28,.27);for(const k of[-1.23,1.23])for(const V of[-1.34,1.34]){F(k,1.36,V,.58,2.72,.58);for(const Z of[-.2,.2])for(const W of[-.2,.2])F(k+Z,2.83,V+W,.19,.3,.19,H.rock)}return ii(N,_),z.add(N),z}function Uh(_){const z=ws+sa+3,N=k=>Math.hypot(k.x-_.x,k.z-_.z)<z,F=k=>[...A.values()].some(V=>Math.hypot(k.x-V.x,k.z-V.z)<ws-2);li.forEach((k,V)=>{N(k)&&(pt.position.set(k.x,I(k.x,k.z),k.z),pt.rotation.set(0,k.angle,0),pt.scale.set(.65+k.scale*.25,k.scale,.65+k.scale*.25),F(k)&&pt.scale.setScalar(0),pt.updateMatrix(),ci.setMatrixAt(V,pt.matrix))}),ci.finish(),Ur.forEach((k,V)=>{N(k)&&(pt.position.set(k.x+.12,I(k.x,k.z),k.z),pt.rotation.set(0,k.angle,0),pt.scale.setScalar(F(k)?0:.7+k.scale*.4),pt.updateMatrix(),Xi.setMatrixAt(V,pt.matrix))}),Xi.finish(),E.forEach((k,V)=>{N(k)&&(k.y=gs(k.x,k.z).height+.25,nt[V].position.y=k.y-.2,nt[V].updateMatrix())}),et.forEach((k,V)=>{N(k)&&(pt.position.set(k.x,E[k.spot].y-.25+k.groundOffset,k.z),pt.rotation.set(.3,k.rot,.2),pt.scale.setScalar(k.scale),pt.updateMatrix(),Pt.setMatrixAt(V,pt.matrix))}),Pt.instanceMatrix.needsUpdate=!0,Pt.computeBoundingBox(),Pt.computeBoundingSphere()}function kh(_,z){for(const k of A.values())if(Math.hypot(k.x-_,k.z-z)<.01)return k.elevation;const N=le.find(k=>Math.hypot(k.x-_,k.z-z)<.01);let F=N?Math.fround(N.elevation):Math.max(.35,Bs(_,z));if(!N){const k=ws+he,V=Math.max(0,Math.floor((_-k+bt)/he)),Z=Math.min(216,Math.ceil((_+k+bt)/he)),W=Math.max(0,Math.floor((z-k+bt)/he)),it=Math.min(216,Math.ceil((z+k+bt)/he));for(let ft=W;ft<=it;ft++)for(let At=V;At<=Z;At++){const Zt=ft*ze+At;Math.hypot(ie.getX(Zt)-_,ie.getZ(Zt)-z)<=k&&(F=Math.max(F,ie.getY(Zt)))}}return F}function Lf(_){const z=kh(_.x,_.z),N={id:_.id,x:_.x,z:_.z,elevation:z};return A.set(_.id,N),T(N),Uh(N),N}function Ao(_,z={}){if((c||_.natural===!0)&&!z.preview){const rt=h1(_,{terrainHeight:I,materials:H,rockGeos:st,tube:Ke,leafGeometry:ts,mergeStaticParts:ii,teamColor:Gs});return l.add(rt),w.add(rt),m.push(rt.userData.refuge),rt}const N=!!z.preview,F=N?null:Lf(_),k=new te;k.name="Shelter "+(_.id??""),k.position.set(_.x,F?.elevation??0,_.z),k.scale.setScalar(se),k.userData.id=_.id,k.userData.radius=Cs,k.userData.owned=[],k.userData.terrain=F;const V=k.userData.owned;Pf(k,V,Number.isFinite(_.yaw)?_.yaw:0),N||(k.userData.support=Ht({id:"shelter-"+_.id,type:"shelter",x:_.x,z:_.z,y:k.position.y+.11,radius:Cs-.2}),k.userData.landmark=Ht({id:"castle-land-"+_.id,type:"land",x:_.x,z:_.z,y:k.position.y,radius:ws+sa*.45})),If(k,_,V);const Z=Df(V);Z.position.set(-.55,.04,-.5),k.add(Z),k.userData.core=Z,k.userData.keepCollision={rects:Z.userData.groundWalls.map(rt=>({minX:(rt.minX+Z.position.x)*se,maxX:(rt.maxX+Z.position.x)*se,minZ:(rt.minZ+Z.position.z)*se,maxZ:(rt.maxZ+Z.position.z)*se,height:(rt.height+Z.position.y)*se})),door:{x:Z.position.x*se,z:(Z.position.z+1.64)*se}};const W=zf(_.team,V);W.position.set(1.8,0,1.1),k.add(W),k.userData.banner=W;const it=new te;it.name="Additional sleeping leaves";const ft=Za(.62,kr[_.team],V);ft.position.set(-3,.01,.2),ft.rotation.y=-.5,it.add(ft),k.add(it),k.userData.extra=it;const At=new te;At.name="Hatchery";const Zt=Za(.52,kr[_.team],V);Zt.position.set(3.05,0,-1.8),Zt.rotation.y=.7,At.add(Zt);for(let rt=0;rt<5;rt++){const St=[];for(let je=0;je<=24;je++){const He=je/24*Ue;St.push([3.05+Math.cos(He)*.74,.06+rt*.065,-1.7+Math.sin(He)*.63])}const ce=Ke(St,.035,H.reed,25);V.push(ce.geometry),At.add(ce)}ii(At,V),k.add(At),k.userData.nursery=At;const Dt=new te;Dt.name="Leaf training yard and woven sparring dummies",Dt.position.set(-2.9,.07,-3.2);for(let rt=0;rt<3;rt++){const St=-.82+rt*.8,ce=rt%2?-.2:.2,je=new Jt(ts(.46,.65,.04),H.leaf);je.position.set(St,.025,ce+.6),je.rotation.y=(rt-1)*.35,V.push(je.geometry),Dt.add(je);for(const me of[-.21,.21]){const rn=Ke([[St+me,-.02,ce-.25],[St+me*.3,.48,ce-.3],[St,.96,ce-.25]],.035,H.bark,5);V.push(rn.geometry),Dt.add(rn)}const He=Ke([[St-.4,.64,ce-.2],[St,.72,ce-.28],[St+.4,.64,ce-.2]],.041,H.reed,6);V.push(He.geometry),Dt.add(He);for(let me=0;me<3;me++){const rn=new Jt(ts(.23,.37,.15),H.leaf);rn.position.set(St+(me-1)*.06,.59,ce-.19),rn.rotation.set(Math.PI/2,(me-1)*.25,(me-1)*.3),V.push(rn.geometry),Dt.add(rn)}for(const me of[-.12,.12]){const rn=Ke([[St+me,.89,ce-.22],[St+me*1.45,1.09,ce-.22],[St+me*.5,1.07,ce-.19],[St+me,.89,ce-.22]],.025,H.reed,10);V.push(rn.geometry),Dt.add(rn)}}for(const rt of[-1.2,1.2]){const St=Ke([[rt,-.04,-.65],[rt*.98,.75,-.68],[rt,.98,-.65]],.04,H.bark,5);V.push(St.geometry),Dt.add(St)}for(let rt=0;rt<2;rt++){const St=Ke([[-1.2,.45+rt*.28,-.65],[0,.38+rt*.28,-.7],[1.2,.45+rt*.28,-.65]],.025,H.reed,10);V.push(St.geometry),Dt.add(St)}ii(Dt,V),k.add(Dt),k.userData.training=Dt,k.userData.trainingPoint=new L(_.x-2.9*se,k.position.y+.12,_.z-2.5*se);const Nt=new te;Nt.name="Leaf-wrapped food cache",Nt.position.set(-2.8,.04,2.2);const ae=new wn(ne,H.fruit,15);for(let rt=0;rt<15;rt++)pt.position.set(rt%4*.32-.5,Math.floor(rt/8)*.25+.15,Math.floor(rt/4)%2*.35),pt.scale.setScalar(.22+rt%3*.025),pt.rotation.set(rt*.7,rt*.4,0),pt.updateMatrix(),ae.setMatrixAt(rt,pt.matrix),ae.setColorAt(rt,hn(rt%3?"#b7b06c":"#6d673f"));Nt.add(ae);for(let rt=0;rt<3;rt++){const St=Ke([[-.85,.05,-.3+rt*.45],[0,.02,-.3+rt*.45],[.85,.08,-.3+rt*.45]],.075,H.bark,5);V.push(St.geometry),Nt.add(St)}const Ae=new Jt(ts(1,.8,.23),H.leaf);Ae.position.set(0,.5,.1),Ae.rotation.z=.17,V.push(Ae.geometry),Nt.add(Ae),ii(Nt,V),k.add(Nt),k.userData.storage=Nt,k.userData.foodMesh=ae,k.userData.storageCover=Ae;const Re=new te;Re.name="Lookout perch",Re.position.set(3.1,0,2.5);for(let rt=0;rt<3;rt++){const St=rt/3*Ue,ce=Ke([[Math.cos(St)*.7,-.1,Math.sin(St)*.7],[Math.cos(St)*.44,1.4,Math.sin(St)*.44],[Math.cos(St)*.35,2.65,Math.sin(St)*.35]],.085,H.bark,7);V.push(ce.geometry),Re.add(ce)}for(let rt=0;rt<8;rt++){const St=-.6+rt*.17,ce=Ke([[-.7,2.35,St],[0,2.32,St],[.7,2.36,St]],.06,H.reed,4);V.push(ce.geometry),Re.add(ce)}const ge=new Jt(ts(1.1,.9,.08),H.leaf);ge.position.y=3.15,ge.rotation.x=.17,V.push(ge.geometry),Re.add(ge);for(let rt=0;rt<6;rt++){const St=Ke([[-.25,rt*.34,.63],[.25,rt*.34,.63]],.035,H.reed,2);V.push(St.geometry),Re.add(St)}ii(Re,V),k.add(Re),k.userData.watchtower=Re;const sn=new wn(st[1],H.mossRock,25);for(let rt=0;rt<25;rt++){const St=rt/25*Ue;pt.position.set(Math.cos(St)*2.15,-.12,Math.sin(St)*2.35-.5),pt.rotation.set(0,St,0),pt.scale.set(.25,.25,.25),pt.updateMatrix(),sn.setMatrixAt(rt,pt.matrix)}k.add(sn);const tn=new te;tn.name="Collapsed shelter remains";const cn=new Ve({color:"#839061",map:q,roughness:.94,side:Ce});V.push(cn);for(let rt=0;rt<6;rt++){const St=Lh(.62+rt%3*.16,1.35+rt%2*.55,.14+rt%3*.05,s+rt*19),ce=new Jt(St,cn);ce.position.set(-1.3+rt%3*.85,-.46+rt%2*.04,-1.5+Math.floor(rt/3)*1.7),ce.rotation.set((rt%2-.5)*.24,rt*1.71,(rt%3-1)*.13),ce.castShadow=!0,V.push(St),tn.add(ce)}for(let rt=0;rt<22;rt++){const St=rt*2.399,ce=.65+rt%5*.27,je=Math.cos(St)*(rt<14?1.2:3.4),He=Math.sin(St)*(rt<14?1.6:2.8)-.3,me=Ke([[je,.055,He],[je+Math.cos(St+.7)*ce*.6,.11+rt%3*.07,He+Math.sin(St+.7)*ce*.6],[je+Math.cos(St+.7)*ce,.04+rt%4*.06,He+Math.sin(St+.7)*ce]],rt%2?.045:.065,rt%2?H.reed:H.bark,4);me.castShadow=!0,V.push(me.geometry),tn.add(me)}ii(tn,V),k.add(tn),k.userData.ruin=tn;const mn=new wn(ne,H.fruit,8);mn.name="Supplies exposed in the ruins";for(let rt=0;rt<8;rt++)pt.position.set(-.5+rt%4*.29,.12+Math.floor(rt/4)*.08,1.35+Math.floor(rt/4)*.31),pt.rotation.set(rt*.43,rt*1.31,.2),pt.scale.setScalar(.16+rt%3*.025),pt.updateMatrix(),mn.setMatrixAt(rt,pt.matrix),mn.setColorAt(rt,hn(rt%2?"#a99958":"#d9a253"));k.add(mn),k.userData.looseLoot=mn;const _n=new Ve({color:"#edc371",emissive:"#e5a64c",emissiveIntensity:.7,roughness:.7});V.push(_n);const Jn=new Jt(ne,_n);Jn.position.set(1.7,.55,1.1),Jn.scale.set(.15,.22,.15),k.add(Jn),k.userData.lamp=Jn;const Vs=new Zm("#ffd098",1.8,25,2);Vs.position.set(0,2.3,1.8),k.add(Vs),k.userData.light=Vs,k.updateMatrixWorld(!0),k.userData.buildingGroups={},k.userData.defaultPlacements={};for(const[rt,St]of Object.entries({store:"storage",nursery:"nursery",watchtower:"watchtower",training:"training"})){const ce=k.userData[St],je=new Nn().setFromObject(ce),He=k.worldToLocal(je.getCenter(new L)),me=new te;me.name=ce.name+" placement",me.position.set(He.x,ce.position.y,He.z),k.add(me),ce.position.sub(me.position),me.add(ce),k.userData[St]=me,k.userData.buildingGroups[rt]=me,k.userData.defaultPlacements[rt]={x:He.x*se,z:He.z*se,yaw:0}}k.updateMatrixWorld(!0);const xs=new Nn().setFromObject(Z),Fr=k.worldToLocal(xs.getCenter(new L)),Or=xs.getSize(new L);k.userData.coreFootprint={x:Fr.x*se,z:Fr.z*se,width:Or.x,depth:Or.z},N||(l.add(k),w.add(k)),Ka(k,_);const Ws=new Set([k.userData.core.userData.roof,k.userData.storageCover,k.userData.banner.userData.flag]);return k.traverse(rt=>{rt.isMesh&&!Ws.has(rt)&&(rt.updateMatrix(),rt.matrixAutoUpdate=!1)}),k}function Ka(_,z={}){if(!_)return;if(_.userData.natural)return of(_,z,Gs);const N=_.userData.visualState||{},F={...N,...z},k=Math.max(1,F.tier??1),V=F.buildings||{},Z=ns((F.hp??F.maxHp??100)/(F.maxHp??100),0,1),W=!!F.destroyed||Z<=0,it=F.team??N.team??"neutral",ft={};for(const[Re,ge]of Object.entries(F.buildingPlacements||{}))_.userData.buildingGroups[Re]&&ge&&Number.isFinite(ge.x)&&Number.isFinite(ge.z)&&Number.isFinite(ge.yaw??0)&&(ft[Re]={x:ge.x,z:ge.z,yaw:ge.yaw??0});_.userData.visualState={team:it,tier:k,hp:F.hp,maxHp:F.maxHp,buildings:{...V},buildingPlacements:ft,yaw:Number.isFinite(F.yaw)?F.yaw:0,storage:F.storage,resources:F.resources,lootTaken:!!F.lootTaken,gateHp:F.gateHp,gateOpen:!!F.gateOpen,destroyed:W,underConstruction:!!F.underConstruction,constructionProgress:ns(Number(F.constructionProgress)||0,0,1)},_.rotation.y=_.userData.visualState.yaw;for(const[Re,ge]of Object.entries(_.userData.buildingGroups)){const sn=ft[Re]||_.userData.defaultPlacements[Re];ge.position.x=sn.x/se,ge.position.z=sn.z/se,ge.rotation.y=sn.yaw}const At=_.userData.buildingGroups.training;_.updateMatrixWorld(!0),_.userData.trainingPoint.copy(At.getWorldPosition(new L)),_.userData.trainingPoint.y=_.position.y+.12,_.userData.team=it,_.userData.tier=k,_.userData.health=Z,_.userData.destroyed=W,_.userData.banner.userData.flag.material.color.set(Gs(it)),_.userData.banner.userData.emblemTeam!==it&&(_.userData.banner.userData.flag.material.map=To(it),_.userData.banner.userData.flag.material.needsUpdate=!0,_.userData.banner.userData.emblemTeam=it),_.userData.gateCrest.material.color.set(Gs(it)),_.userData.gateCrest.material.map=To(it);const Zt=!!(V.storage??V.store??!1);_.userData.core.visible=!W,_.userData.extra.visible=!W&&k>=2,_.userData.ruin.visible=W,_.userData.nursery.visible=!W&&!!(V.nursery||V.hatchery||V.spawn||V.breeding),_.userData.training.visible=!W&&!!(V.training||V.trainingGround||V.drill),_.userData.watchtower.visible=!W&&!!(V.watchtower||V.tower||V.guards);const Dt=!W&&!!(V.palisade||V.walls||V.wall||V.defense);_.userData.fortification.visible=!W,_.userData.palisade.visible=Dt;const Nt=Number.isFinite(F.gateHp)&&F.gateHp<=0;_.userData.gate.userData.breached=Nt,_.userData.gate.userData.open=!!F.gateOpen,_.userData.fallenGate.visible=Nt;for(let Re=0;Re<2;Re++){const ge=_.userData.gateLeaves[Re];ge.visible=!Nt,ge.rotation.y=F.gateOpen?(Re===0?-1:1)*Math.PI*.52:0}_.userData.core.rotation.z=W?0:(1-Z)*.09,_.userData.core.userData.roof.scale.y=W?1:.78+.22*Z;let ae=typeof F.storage=="number"?F.storage:F.storage?.food??F.resources??0;Number.isFinite(ae)||(ae=0),ae=Math.max(0,ae);const Ae=ae>0&&!F.lootTaken;_.userData.storage.visible=Zt&&(!W||Ae),_.userData.storage.rotation.z=W?-.08:0,_.userData.foodMesh.count=W&&!Ae?0:Math.min(15,Math.ceil(ae/8)),_.userData.storageCover.position.set(W?-.65:0,W?.1:.5,W?.52:.1),_.userData.storageCover.rotation.set(W?.28:0,0,W?-.32:.17),_.userData.looseLoot.visible=W&&Ae&&!Zt,_.userData.looseLoot.count=Math.min(8,Math.ceil(ae/5)),_.userData.banner.position.y=W?.035:0,_.userData.banner.rotation.set(W?.08:0,W?.35:0,W?1.49:Z<.25?.22:0),_.userData.lamp.visible=!W,W&&(_.userData.light.visible=!1),Nh(_),_.userData.collisionRevision=(_.userData.collisionRevision||0)+1}function Nh(_){const z=_.userData.visualState||{},N=ad({...z,mesh:_}),{stage:F,unfinished:k,wallHeight:V}=N,Z=!!z.destroyed,W=_.userData.fortWalls,it=V/Ia;if(W.visible=!Z&&F>=1,W.count=F===1?W.userData.firstCoursesCount:W.userData.fullCount,W.scale.y=it||1,W.position.y=.11*(1-(it||1))/se,W.updateMatrix(),_.userData.fortification.visible=!Z&&F>=1,_.userData.fortTowers.visible=!Z&&F>=2,_.userData.fortTowerRoofs.visible=!Z&&F>=3,_.userData.core.visible=!Z&&F>=3,_.userData.gate.visible=!Z&&!k,_.userData.gateCrest.visible=!Z&&!k,_.userData.banner.visible=!k,k)for(const ft of["extra","nursery","training","watchtower","storage","palisade","lamp","light","looseLoot"])_.userData[ft].visible=!1;_.userData.constructionStage=F,_.userData.constructionWallHeight=V}function Uf(_,z,N){if(_?.type!=="shelter")return!1;const F=N?.mesh||[...w].find(W=>W.userData.id===(_.siteId||_.campId));if(!F?.userData?.fortWalls)return!1;const k=ns(Number(z)||0,0,1);N&&(N.constructionProgress=k);const V=F.userData.visualState||{};return V.constructionProgress=k,V.underConstruction=N?.underConstruction??V.underConstruction??!0,F.userData.visualState=V,ad({...V,mesh:F}).stage!==F.userData.constructionStage&&(Nh(F),F.userData.collisionRevision=(F.userData.collisionRevision||0)+1),!0}function Fh(_){if(!_)return;if(G?.userData.camp===_&&Nr(),l.remove(_),w.delete(_),_.userData.refuge){_.userData.refuge.active=!1;const N=m.indexOf(_.userData.refuge);N>=0&&m.splice(N,1)}_===M&&(M=null);for(const N of[_.userData.support,_.userData.landmark])if(N){const F=R.indexOf(N);F>=0&&R.splice(F,1);for(const k of U.values()){const V=k.indexOf(N);V>=0&&k.splice(V,1)}}const z=_.userData.terrain;z&&(A.delete(z.id),T(z),Uh(z)),_.traverse(N=>{N.isInstancedMesh&&N.dispose()});for(const N of _.userData.owned||[])N.dispose?.()}function kf(_){if(c||!["shelter","store","nursery","watchtower","training"].includes(_))return null;const z=Ao({id:"construction-preview",x:0,z:0,team:"ally",tier:1,hp:350,maxHp:350,buildings:{},storage:{food:80}},{preview:!0});if(z.name="Construction preview: "+_,z.userData.previewType=_,z.userData.previewMaterials=[],_!=="shelter"){const F=z.userData.buildingGroups[_];for(const k of z.children)k.visible=k===F;F.visible=!0,F.position.x=F.position.z=0,F.rotation.y=0}const N=new Map;return z.traverse(F=>{if(F.isLight){F.visible=!1;return}if(!F.isMesh)return;F.castShadow=!1,F.receiveShadow=!1,F.renderOrder=8;const k=V=>{if(N.has(V))return N.get(V);const Z=V.clone();return Z.transparent=!0,Z.opacity=.46,Z.depthWrite=!1,Z.polygonOffset=!0,Z.polygonOffsetFactor=-1,Z.polygonOffsetUnits=-1,N.set(V,Z),z.userData.previewMaterials.push(Z),z.userData.owned.push(Z),Z};F.material=Array.isArray(F.material)?F.material.map(k):k(F.material)}),S.add(z),l.add(z),Oh(z,{x:0,y:0,z:0,yaw:0,valid:!1}),z.visible=!1,z}function Oh(_,{x:z,y:N,z:F,yaw:k=0,valid:V=!1}={}){if(_?.userData.previewType&&(Number.isFinite(z)&&(_.position.x=z),Number.isFinite(N)&&(_.position.y=N),Number.isFinite(F)&&(_.position.z=F),_.rotation.y=Number.isFinite(k)?k:0,_.visible=!0,_.userData.previewValid!==!!V)){_.userData.previewValid=!!V;for(const Z of _.userData.previewMaterials)Z.color?.set(V?"#69ed89":"#ef665b"),Z.emissive?.set(V?"#266c37":"#782d27"),"emissiveIntensity"in Z&&(Z.emissiveIntensity=.4)}}function Bh(_){!_||!S.has(_)||(S.delete(_),_.removeFromParent(),Fh(_))}function Nr(){if(!G)return;G.removeFromParent();const _=new Set,z=new Set;G.traverse(N=>{N.geometry&&_.add(N.geometry),N.material&&z.add(N.material)});for(const N of _)N.dispose();for(const N of z)N.dispose();G=null}function Nf(_){const z=_?.mesh||_;if(!z?.isObject3D)return Nr(),null;if(G?.userData.camp===z)return G;Nr(),G=new te,G.name="Construction courtyard guide",G.userData.camp=z;const N=(Cs-.2)/se,F=.075,k=(it,ft,At,Zt=!1)=>{const Dt=new Se().setFromPoints(it),Nt=new mh({color:ft,transparent:!0,opacity:At,depthWrite:!1}),ae=Zt?new Am(Dt,Nt):new Tm(Dt,Nt);return ae.renderOrder=6,G.add(ae),ae},V=[];for(let it=0;it<96;it++){const ft=it/96*Ue;V.push(new L(Math.cos(ft)*N,F,Math.sin(ft)*N))}k(V,"#9fe5af",.78,!0);const Z=[];for(let it=-7;it<=7;it++){const ft=it*.7;if(Math.abs(ft)>=N)continue;const At=Math.sqrt(N*N-ft*ft);Z.push(new L(ft,F,-At),new L(ft,F,At),new L(-At,F,ft),new L(At,F,ft))}k(Z,"#b7ddbc",.22);const W=(it,ft)=>{const At=it.x/se,Zt=it.z/se,Dt=it.width/(2*se)+.025,Nt=it.depth/(2*se)+.025,ae=Math.cos(it.yaw||0),Ae=Math.sin(it.yaw||0),Re=F+.012,ge=(tn,cn)=>new L(At+tn*ae+cn*Ae,Re,Zt+cn*ae-tn*Ae);k([ge(-Dt,-Nt),ge(Dt,-Nt),ge(Dt,Nt),ge(-Dt,Nt)],"#ec8a72",.8,!0).name=ft+" outline";const sn=[];for(let tn=-Dt-Nt;tn<=Dt+Nt;tn+=.42){const cn=[];for(const mn of[-Dt,Dt]){const _n=tn-mn;_n>=-Nt&&_n<=Nt&&cn.push(ge(mn,_n))}for(const mn of[-Nt,Nt]){const _n=tn-mn;_n>-Dt&&_n<Dt&&cn.push(ge(_n,mn))}cn.length===2&&sn.push(...cn)}k(sn,"#d9806c",.35).name=ft+" hatch"};return W(z.userData.coreFootprint||{x:-1.1825*gr,z:-1.0664*gr,width:7.68*gr,depth:8.25*gr},"Main hut exclusion"),W(Vy,"Sleeping hut reservation"),z.add(G),G}let Ro=0,Hh=Qi;const Ff=hn(o.water),Of=hn(o.nightWater),Bf=hn("#fff0cb"),Hf=hn("#7aa5cb");function Gf(_,z,N=1,F){if(Tn=z,Ro++,N=ns(N,0,1),wo.value=z,c){const Z=1-Math.exp(-Math.max(0,Math.min(.5,Number(_)||0))*3);Ze(x+(p-x)*Z);const W=ct.material.uniforms.alpha,it=i1(F?.y,x);if(W.value+=(it-W.value)*(1-Math.exp(-Math.max(0,Math.min(.5,Number(_)||0))*8)),Math.abs(Hh-x)>.008){for(let ft=0;ft<wt.length;ft++){const At=wt[ft];pt.position.set(At.x,At.y,At.z),pt.rotation.set(0,At.angle,0),pt.scale.set(At.visualRadius,1,At.visualRadius),pt.updateMatrix(),ye.setMatrixAt(ft,pt.matrix)}ye.flush(),Hh=x}qt.update(x,z)}if(ct.material.uniforms.time.value=z*.45,ct.material.uniforms.waterColor.value.copy(Of).lerp(Ff,N),ct.material.uniforms.sunColor.value.copy(Hf).lerp(Bf,N),ct.material.uniforms.sunDirection.value.set(.35+.25*Math.sin(z*.008),.45+N*.4,-.45).normalize(),Ro%3===0){const Z=lt.attributes.position;for(let W=0;W<Z.count;W++){const it=ht[W*3],ft=ht[W*3+1];Z.setZ(W,Math.sin(it*.33+ft*.21+z*.91)*.025+Math.sin(it*.14-ft*.38-z*.72)*.018)}Z.needsUpdate=!0}qi.uniforms.uTime.value=z;let k=!1;for(let Z=0;Z<Je;Z++){const W=Ih[Z];W.life<=0||(W.life-=_,W.vy-=9.2*_,Qe[Z*3]+=W.vx*_,Qe[Z*3+1]+=W.vy*_,Qe[Z*3+2]+=W.vz*_,Eo[Z]=Math.max(0,W.life/W.max)*.88,(Qe[Z*3+1]<(c?x-.03:-.03)||W.life<=0)&&(W.life=0,Eo[Z]=0),k=!0)}if(k&&(Ei.attributes.position.needsUpdate=!0,Ei.attributes.aAlpha.needsUpdate=!0),Ro%2===0){let Z=0;for(let W=0;W<E.length;W++){const it=E[W];if(F&&(it.x-F.x)**2+(it.z-F.z)**2>90**2)continue;const ft=(it.rich?65:30)*ns(it.flies/it.maxFlies,0,1)*(c?Math.min(1,it.ecology?.activity??1):1);for(const At of kt[W]){if(At.rank>=ft)continue;const Zt=z*At.speed+At.phase;pt.position.set(it.x+Math.sin(Zt)*At.r+Math.sin(Zt*2.9)*.13,it.y+At.height+Math.sin(Zt*1.7+At.phase2)*.26,it.z+Math.cos(Zt*.83+At.phase2)*At.r),pt.scale.setScalar(.55+.3*Math.sin(At.phase2)**2),pt.rotation.set(Math.sin(Zt*3)*.25,-Zt,Math.sin(Zt*12)*.25),pt.updateMatrix(),$t.setMatrixAt(Z++,pt.matrix)}}$t.count=Z,j.flyMatricesUpdated=Z,Z&&($t.instanceMatrix.clearUpdateRanges(),$t.instanceMatrix.addUpdateRange(0,Z*16),$t.instanceMatrix.needsUpdate=!0)}Ro%5===0&&F&&(wt.forEach((Z,W)=>{Math.hypot(F.x-Z.x,F.z-Z.z)>48||(pt.position.set(Z.x,Z.y+Math.sin(z*.9+Z.phase)*.018,Z.z),pt.rotation.set(Math.sin(z*.61+Z.phase)*.015,Z.angle,Math.cos(z*.8+Z.phase)*.015),pt.scale.set(Z.visualRadius,1,Z.visualRadius),pt.updateMatrix(),ye.setMatrixAt(W,pt.matrix))}),ye.flush());const V=[...w].filter(Z=>!Z.userData.natural&&!Z.userData.destroyed&&!Z.userData.visualState?.underConstruction).sort((Z,W)=>F?Z.position.distanceToSquared(F)-W.position.distanceToSquared(F):0).slice(0,3);for(const Z of w)Z.userData.natural||(Z.userData.light.visible=V.includes(Z),Z.userData.light.intensity=.25+(1-N)*3,Z.userData.lamp.material.emissiveIntensity=.3+(1-N)*1.3,Z.userData.banner.userData.flag.rotation.y=Math.sin(z*1.4+Z.position.x)*.06)}function Vf(){Nr();for(const N of[...S])Bh(N);i.remove(l);const _=new Set,z=new Set;l.traverse(N=>{N.isInstancedMesh&&N.dispose(),N.geometry&&_.add(N.geometry),N.material&&(Array.isArray(N.material)?N.material.forEach(F=>z.add(F)):z.add(N.material))});for(const N of qt?.resources||[])N.isBufferGeometry&&_.add(N),N.isMaterial&&z.add(N);for(const N of _)N.dispose();for(const N of z)N.dispose();for(const N of b)N.dispose();ct.material.uniforms.mirrorSampler?.value?.dispose?.(),w.clear();for(const N of m)N.active=!1;m.length=0}for(const _ of h?.refuges||[])Ao({..._,natural:!0,team:"neutral",nestLevel:0});return l.traverse(_=>{_.updateMatrix(),_.matrixAutoUpdate=!1}),l.updateMatrixWorld(!0),{group:l,platforms:R,hotspots:E,campSites:le,mapRegions:Mt,routes:Be,predatorAnchors:Xt,bossAnchors:Ft,renderStats:j,seed:s,regionIndex:n,palette:o,toRegionPoint:r.toWorld,radius:Oy,boundary:By,revision:Fy,sampleHeight:Bs,cameraSurfaceHeight:C,getTerrainHeight:I,getSurface:gs,shelterLandHeight:kh,update:Gf,splash:Rf,impact:Cf,createShelter:Ao,updateShelter:Ka,setConstructionProgress:Uf,removeShelter:Fh,createBuildingPreview:kf,setBuildingPreview:Oh,removeBuildingPreview:Bh,showBuildArea:Nf,hideBuildArea:Nr,dispose:Vf,water:ct,shelterRadius:Cs,shelterScale:se,natural:c,creekLandmarks:u,creekNest:d,creekCover:f,creekGrips:g,creekRefuges:m,creekSpawn:c?{x:0,z:0}:null,creekTerritories:c?le.filter(_=>_.team==="enemy"):[],setCreekState:We,currentAt:Ee,isCreekCover:Ne,get waterLevel(){return c?x:Qi}}}const fi=Math.PI*2,$e=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),Ye=(i,t,e)=>i+(t-i)*e,Yn=(i,t,e)=>{const n=$e((e-i)/(t-i));return n*n*(3-2*n)},Zr=(i,t=0,e=0)=>{const n=Math.sin(i*127.1+t*311.7+e*74.7)*43758.5453;return n-Math.floor(n)},Oe=(i=0,t=0,e=0)=>new L(i,t,e),Fl=new Map,Ol=new Map;let es,Bl;const Zc=Oe(0,1,0);Oe();function Hl(i,t){if(typeof i=="number")return i;const e=$e(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n,r=s*s*(3-2*s);return Ye(i[n],i[n+1],r)}function Ps(i,t){if(i.length===1)return[[i[0],1]];const e=$e(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n;return[[i[n],1-s],[i[n+1],s]]}function _e(i,t=0){return{color:i,mask:t}}class Hn{constructor(t=1){this.detail=t,this.p=[],this.uv=[],this.c=[],this.mask=[],this.si=[],this.sw=[],this.idx=[]}vertex(t,e=[0,0],n=[[0,1]],s={color:[1,1,1],mask:0}){const r=this.p.length/3;this.p.push(t.x,t.y,t.z),this.uv.push(...e),this.c.push(...s.color),this.mask.push(s.mask||0);let o=n.reduce((a,l)=>a+l[1],0)||1;for(let a=0;a<4;a++)this.si.push(n[a]?.[0]||0),this.sw.push((n[a]?.[1]||0)/o);return r}tri(t,e,n){this.idx.push(t,e,n)}quad(t,e,n,s,r=!1){r?(this.tri(t,n,e),this.tri(e,n,s)):(this.tri(t,e,n),this.tri(e,s,n))}tube(t,e,n,s={}){const{bones:r=[0],paint:o=()=>_e([.7,.7,.7],1),distort:a}=s,l=Math.max(2,Math.round((s.segments??28)*this.detail)),c=Math.max(3,Math.round((s.radial??16)*this.detail)),h=new mo(t.map(y=>y.isVector3?y:Oe(...y)),!1,"catmullrom",.5),u=this.p.length/3;for(let y=0;y<=l;y++){const M=y/l,R=h.getPoint(M),E=h.getTangent(M).normalize(),w=new L().crossVectors(Math.abs(E.y)>.94?Oe(0,0,1):Zc,E).normalize(),A=new L().crossVectors(E,w).normalize();for(let S=0;S<=c;S++){const b=S/c,U=b*fi,P=Math.cos(U)*Hl(e,M),G=Math.sin(U)*Hl(n,M),j=R.clone().addScaledVector(w,P).addScaledVector(A,G);a&&a(j,M,U,R);const O=typeof r=="function"?r(M,j):Ps(r,M);this.vertex(j,[b,M],O,o(j,M,U))}}for(let y=0;y<l;y++)for(let M=0;M<c;M++){const R=u+y*(c+1)+M;this.quad(R,R+1,R+c+1,R+c+2)}const d=h.getPoint(0),f=h.getPoint(1),g=typeof r=="function"?r(0,d):Ps(r,0),m=typeof r=="function"?r(1,f):Ps(r,1),x=this.vertex(d,[.5,0],g,o(d,0,0)),p=this.vertex(f,[.5,1],m,o(f,1,0)),v=u+l*(c+1);for(let y=0;y<c;y++)this.tri(x,u+y+1,u+y),this.tri(p,v+y,v+y+1);return this}ellipsoid(t,e,{bone:n=0,rings:s=14,radial:r=24,paint:o=()=>_e([1,1,1]),rotationY:a=0,sculpt:l}={}){s=Math.max(3,Math.round(s*this.detail)),r=Math.max(4,Math.round(r*this.detail));const c=this.p.length/3,h=Oe(...t),u=Math.cos(a),d=Math.sin(a);for(let f=0;f<=s;f++){const g=f/s,m=Math.PI*g;for(let x=0;x<=r;x++){const p=x/r,v=fi*p;let y=Math.sin(m)*Math.cos(v)*e[0],M=Math.cos(m)*e[1],R=Math.sin(m)*Math.sin(v)*e[2];const E=Oe(y,M,R);l&&l(E,p,g);const w=Oe(E.x*u+E.z*d,E.y,-E.x*d+E.z*u).add(h);this.vertex(w,[p,g],[[n,1]],o(E,p,g))}}for(let f=0;f<s;f++)for(let g=0;g<r;g++){const m=c+f*(r+1)+g;this.quad(m,m+1,m+r+1,m+r+2)}return this}leaf(t,e,{bone:n=0,bones:s,segments:r=14,across:o=6,color:a=[.35,.45,.22],ridge:l=.025,mask:c=0,vein:h=!0}={}){r=Math.max(2,Math.round(r*this.detail)),o=Math.max(2,Math.round(o*this.detail));const u=new mo(t.map(f=>f.isVector3?f:Oe(...f)),!1,"catmullrom",.5),d=this.p.length/3;for(let f=0;f<=r;f++){const g=f/r,m=u.getPoint(g),x=u.getTangent(g).normalize(),p=new L().crossVectors(Math.abs(x.y)>.95?Oe(0,0,1):Zc,x).normalize();for(let v=0;v<=o;v++){const y=v/o*2-1,M=m.clone().addScaledVector(p,y*Hl(e,g));M.y+=l*(1-Math.abs(y))*Math.sin(g*Math.PI);const R=(h?.88+.12*Math.cos(g*45+Math.abs(y)*9):1)+.12*(1-Math.abs(y));this.vertex(M,[(y+1)/2,g],s?Ps(s,g):[[n,1]],_e(a.map(E=>E*R),c))}}for(let f=0;f<r;f++)for(let g=0;g<o;g++){const m=d+f*(o+1)+g;this.quad(m,m+1,m+o+1,m+o+2,!0)}return this}geometry(){const t=new Se;return t.setAttribute("position",new Vt(this.p,3)),t.setAttribute("uv",new Vt(this.uv,2)),t.setAttribute("color",new Vt(this.c,3)),t.setAttribute("skinTintMask",new Vt(this.mask,1)),t.setAttribute("skinIndex",new uh(this.si,4)),t.setAttribute("skinWeight",new Vt(this.sw,4)),t.setIndex(this.idx),t.computeVertexNormals(),t.computeBoundingSphere(),t}}function Ha(){const i=[],t={};return{defs:i,ids:t,bone(e,n,s=null){const r=i.length;return t[e]=r,i.push({name:e,p:n,parent:typeof s=="string"?t[s]:s}),r}}}function or(i,t=0,e=0){const n=1-Yn(.26,.47,i.y),s=Math.sin(i.x*31+Math.sin(i.z*13))*Math.sin(i.z*25+i.y*23),r=Yn(.42,.77,s)*.5,o=.75-r+.06*Math.sin(i.x*75+i.z*64),a=(1-Yn(.026,.065,Math.abs(i.x)))*Yn(.52,.67,i.y);return a>.3?_e([.78,.61,.18].map(l=>Ye(o,l,a)),1-a):_e([Ye(o,.76,n),Ye(o,.72,n),Ye(o,.49,n)],1-n*.96)}function ui(i,t=0,e=0){const n=(1-Yn(-.55,.1,Math.sin(e)))*.65,r=.79-.36*Yn(.38,.78,Math.sin(i.x*35+i.z*17)*Math.sin(i.y*39-i.z*23));return _e([Ye(r,.7,n),Ye(r,.66,n),Ye(r,.43,n)],1-n*.92)}function hd(i=1){const t=Ha(),e=new Hn(i),n=new Hn(i),s=new Hn(i),r=new Hn(i),o=new Hn(i),a=new Hn(i),l=t.bone("pelvis",[0,.36,-.35]),c=t.bone("spine",[0,.43,-.07],l),h=t.bone("head",[0,.47,.29],c),u=t.bone("jaw",[0,.39,.37],h),d=t.bone("throat",[0,.29,.36],u),f=t.bone("eyeL",[-.292,.685,.53],h),g=t.bone("eyeR",[.292,.685,.53],h),m=t.bone("mouth",[0,.405,.755],u);e.tube([[0,.35,-.72],[0,.42,-.48],[0,.43,-.08],[0,.47,.3],[0,.46,.58],[0,.43,.75]],[.012,.32,.435,.43,.34,.018],[.012,.245,.27,.235,.145,.025],{segments:42,radial:36,bones:p=>Ps([l,l,c,h,h],p),paint:or,distort(p,v,y){const M=Math.max(0,Math.sin(y));p.y+=M*.008*Math.sin(p.x*70+p.z*50);const R=Math.exp(-Math.pow((Math.abs(p.x)-.22)/.035,2));p.y+=R*M*.023*Math.sin(v*Math.PI)}});for(const p of[-1,1]){const v=p<0?f:g,y=[p*.292,.685,.53];e.ellipsoid([p*.292,.605,.405],[.15,.145,.165],{bone:h,rings:14,radial:24,paint:P=>or(P.clone().add(Oe(p*.292,.605,.405)))}),n.ellipsoid(y,[.106,.103,.113],{bone:v,radial:40,rings:22,rotationY:p*.32,paint(P,G,j){const O=P.z/.113,B=Math.pow(P.x/.084,2)+Math.pow(P.y/.029,2);if(O<.12)return _e([.065,.14,.018]);if(O<.34)return _e([.04,.065,.012]);if(O>.52&&B<1)return _e([.008,.012,.006]);const K=.12*Math.sin(Math.atan2(P.y,P.x)*51+Math.hypot(P.x,P.y)*120);return _e([.74+K,.52+K*.6,.08+K*.12])}});const M=t.bone(`hip${p}`,[p*.33,.32,-.33],l),R=t.bone(`knee${p}`,[p*.64,.24,.025],M),E=t.bone(`ankle${p}`,[p*.46,.09,-.61],R),w=t.bone(`foot${p}`,[p*.64,.045,-.49],E);e.ellipsoid([p*.64,.24,.025],[.143,.128,.148],{bone:R,rings:12,radial:18,paint:(P,G,j)=>ui(P.clone().add(Oe(p*.64,.24,.025)),G,Math.PI*(.5-j)),sculpt(P){P.x*=1+.06*Math.sin(P.z*30)}}),e.ellipsoid([p*.46,.09,-.61],[.069,.052,.071],{bone:E,rings:8,radial:12,paint:(P,G,j)=>ui(P.clone().add(Oe(p*.46,.09,-.61)),G,Math.PI*(.5-j))}),e.tube([[p*.3,.33,-.35],[p*.5,.3,-.21],[p*.64,.24,.025]],[.13,.223,.14],[.13,.173,.12],{segments:20,radial:22,bones:[M,M,R],paint:ui}),e.tube([[p*.64,.24,.025],[p*.57,.15,-.27],[p*.46,.09,-.61]],[.12,.105,.065],[.11,.09,.05],{segments:20,radial:18,bones:[R,R,E],paint:ui}),e.tube([[p*.46,.09,-.61],[p*.57,.06,-.55],[p*.72,.035,-.35]],[.06,.07,.047],[.047,.04,.025],{segments:12,radial:14,bones:[E,w,w],paint:ui});const A=[];for(let P=0;P<4;P++){const G=p*(.7+(P-1.5)*.075),j=-.34+.36*(1-Math.abs(P-1.5)*.16),O=[p*(.67+(P-1.5)*.028),.036,-.37],B=[Ye(O[0],G,.53),.037,-.18];e.tube([O,B,[G,.035,j]],[.032,.024,.007],[.02,.014,.006],{segments:10,radial:8,bones:[w],paint:ui}),A.push([G,.034,j*.66-.12])}for(let P=0;P<3;P++){const G=Oe(p*.68,.035,-.36),j=Oe(...A[P]),O=Oe(...A[P+1]),B=j.clone().lerp(O,.5).lerp(G,.2),K=e.vertex(G,[0,0],[[w,1]],or(G)),q=e.vertex(j,[1,0],[[w,1]],or(j)),Y=e.vertex(B,[.5,1],[[w,1]],or(B)),H=e.vertex(O,[0,1],[[w,1]],or(O));e.tri(K,q,Y),e.tri(K,Y,H),e.tri(Y,q,H)}const S=t.bone(`shoulder${p}`,[p*.3,.43,.31],c),b=t.bone(`elbow${p}`,[p*.48,.235,.4],S),U=t.bone(`wrist${p}`,[p*.46,.058,.62],b);e.ellipsoid([p*.48,.235,.4],[.064,.066,.064],{bone:b,rings:8,radial:12,paint:(P,G,j)=>ui(P.clone().add(Oe(p*.48,.235,.4)),G,Math.PI*(.5-j))}),e.tube([[p*.3,.43,.31],[p*.43,.33,.335],[p*.48,.235,.4]],[.092,.085,.061],[.09,.077,.059],{segments:14,radial:16,bones:[S,S,b],paint:ui}),e.tube([[p*.48,.235,.4],[p*.48,.14,.48],[p*.46,.058,.62]],[.062,.07,.039],[.058,.057,.03],{segments:12,radial:14,bones:[b,b,U],paint:ui});for(let P=0;P<4;P++){const G=p*(.44+(P-1.5)*.075),j=.81+.04*(1.5-Math.abs(P-1.5));e.tube([[p*.46,.055,.61],[Ye(p*.46,G,.6),.031,.74],[G,.025,j]],[.025,.017,.009],[.021,.014,.006],{segments:9,radial:8,bones:[U],paint:ui}),e.ellipsoid([G,.025,j],[.017,.01,.021],{bone:U,rings:6,radial:10,paint:()=>_e([.71,.65,.4],.4)})}for(let P=0;P<3;P++){const G=.32+P*.016;e.tube(Array.from({length:17},(j,O)=>[p*.415+Math.cos(O/16*fi)*.085,G+Math.sin(O/16*fi)*.072,.355+Math.sin(O/16*fi)*.02]),.009,.009,{segments:20,radial:6,bones:[S],paint:()=>_e([.38,.55,.12],.25)})}s.leaf([[p*.12,.695,-.08],[p*.31,.69,-.19],[p*.48,.52,-.38]],[.012,.14,.03],{bone:c,color:[.26,.4,.12],ridge:.025,segments:15}),s.leaf([[p*.04,.715,.05],[p*.2,.73,-.03],[p*.36,.59,-.2]],[.008,.13,.015],{bone:c,color:[.34,.48,.18],ridge:.035,segments:15}),r.leaf([[p*.17,.76,.4],[p*.21,.89,.32],[p*.24,.91,.18]],[.025,.055,.002],{bone:h,color:[.69,.53,.19],ridge:.015,segments:12});for(const[P,G,j,O,B]of[[p*.16,.745,-.005,.18,.21],[p*.29,.67,-.25,.17,.19]])o.ellipsoid([P,G,j],[O,.055,B],{bone:c,rings:8,radial:18,paint:(K,q)=>_e([.84+.08*Math.cos(q*fi*9),.79,.59]),sculpt(K){const q=1+.035*Math.cos(Math.atan2(K.x,K.z)*9);K.x*=q,K.z*=q}});for(let P=0;P<3;P++){const G=.19+P*.028,j=.455-P*.017;a.tube(Array.from({length:13},(O,B)=>[p*.478+Math.cos(B/12*fi)*.081,G+Math.sin(B/12*fi)*.027,j+Math.sin(B/12*fi)*.079]),.016,.014,{segments:14,radial:6,bones:[b],paint:()=>_e([.72,.47,.16])})}}const x=Array.from({length:13},(p,v)=>{const y=(v/12-.5)*.74;return[y,.414-.025*Math.abs(y)/.37,.748-.2*Math.pow(y/.37,2)]});return e.tube(x,.009,.009,{segments:34,radial:8,bones:[h],paint:()=>_e([.045,.065,.016])}),e.tube(x.map(p=>[p[0],p[1]-.019,p[2]+.001]),.009,.014,{segments:34,radial:8,bones:[u],paint:()=>_e([.65,.61,.35])}),e.ellipsoid([0,.284,.385],[.25,.125,.265],{bone:d,rings:18,radial:28,paint:()=>_e([.75,.72,.48]),sculpt(p){p.y+=.01*Math.sin(p.x*80)*Math.cos(p.z*60)}}),{type:"frog",rig:t,skin:e.geometry(),eyes:n.geometry(),armor:s.geometry(),shell:o.geometry(),bracers:a.geometry(),crest:r.geometry(),mouth:m,length:1.7,height:.8,scale:1}}function ar(i,t,e,n,s,r,o=.05){const a=Oe(...t).lerp(Oe(...e),.5);a.y+=o,i.leaf([t,a.toArray(),e],[.012,n,n*.7,.002],{bone:s,segments:13,across:6,ridge:.012,color:r,vein:!0})}function y1(){const i=Ha(),t=new Hn,e=new Hn,n=i.bone("pelvis",[0,2.45,-.16]),s=i.bone("spine",[0,2.79,.02],n),r=i.bone("neck0",[0,2.97,.24],s),o=i.bone("neck1",[0,3.35,.03],r),a=i.bone("neck2",[0,3.82,.18],o),l=i.bone("head",[0,4.19,.6],a),c=i.bone("jaw",[0,4.12,.7],l),h=i.bone("mouth",[0,4.11,1.48],c),u=i.bone("eyeL",[-.125,4.25,.69],l),d=i.bone("eyeR",[.125,4.25,.69],l),f=g=>{const m=Yn(2.7,3.02,g.y)*.35;return _e([.54-m,.59-m,.61-m])};t.tube([[0,2.43,-.95],[0,2.58,-.53],[0,2.78,-.05],[0,2.99,.27]],[.02,.34,.41,.14],[.02,.39,.48,.18],{segments:30,radial:28,bones:[n,n,s,s],paint:f}),t.tube([[0,2.97,.24],[0,3.22,.16],[0,3.46,.015],[0,3.83,.18],[0,4.12,.52],[0,4.21,.65]],[.16,.15,.12,.1,.1,.13],[.17,.17,.14,.12,.13,.14],{segments:40,radial:20,bones:[r,r,o,a,l,l],paint(g,m,x){const p=Math.cos(x)>.7?.65:.9;return _e([p,p*.99,p*.91])}}),t.tube([[0,4.18,.36],[0,4.28,.57],[0,4.25,.76],[0,4.18,.91]],[.018,.15,.14,.045],[.02,.16,.14,.07],{segments:22,radial:20,bones:[l],paint(g){return g.y>4.32?_e([.07,.1,.12]):_e([.83,.86,.82])}}),t.tube([[0,4.19,.81],[0,4.18,1.04],[0,4.15,1.32],[0,4.12,1.6]],[.072,.055,.027,.001],[.06,.044,.022,.001],{segments:20,radial:10,bones:[l],paint(g,m){return _e([Ye(.74,.34,m),Ye(.47,.24,m),.075])}}),t.tube([[0,4.112,.81],[0,4.105,1.06],[0,4.103,1.36],[0,4.115,1.59]],[.063,.046,.022,.001],[.026,.02,.012,.001],{segments:18,radial:8,bones:[c],paint:()=>_e([.68,.38,.07])});for(const g of[-1,1]){const m=g<0?u:d;e.ellipsoid([g*.132,4.255,.69],[.029,.039,.043],{bone:m,rings:10,radial:18,paint:A=>Math.abs(A.x)>.022&&Math.abs(A.y)<.018&&Math.abs(A.z)<.021?_e([.005,.008,.006]):_e([.9,.7,.13])});const x=i.bone(`hip${g}`,[g*.14,2.47,-.12],n),p=i.bone(`knee${g}`,[g*.18,1.5,-.12],x),v=i.bone(`ankle${g}`,[g*.22,.16,.04],p),y=i.bone(`foot${g}`,[g*.22,.075,.15],v),M=(A,S)=>{const b=.8+.2*Math.sin(A.y*110);return _e([.38*b,.36*b,.21*b])};t.tube([[g*.14,2.47,-.12],[g*.18,1.73,-.15],[g*.18,1.5,-.12]],[.077,.04,.049],[.074,.037,.049],{segments:20,radial:12,bones:[x,x,p],paint:M}),t.tube([[g*.18,1.5,-.12],[g*.2,.7,-.02],[g*.22,.16,.04]],[.042,.024,.031],[.042,.023,.03],{segments:22,radial:10,bones:[p,p,v],paint:M});for(let A=0;A<4;A++){const S=A<3?(A-1)*.23:-.08,b=A<3?.54-.06*Math.abs(A-1):-.21;t.tube([[g*.22,.16,.04],[g*.22+S*.5,.065,(b+.04)*.55],[g*.22+S,.035,b]],[.025,.017,.006],[.023,.013,.005],{segments:12,radial:8,bones:[y],paint:M})}const R=i.bone(`wing${g}`,[g*.31,2.91,-.03],s),E=i.bone(`wingElbow${g}`,[g*.94,2.83,-.12],R),w=i.bone(`wingWrist${g}`,[g*1.5,2.68,-.24],E);t.leaf([[g*.31,2.91,-.03],[g*.95,2.84,-.18],[g*1.58,2.69,-.35]],[.08,.29,.1],{bones:[R,E,w],segments:22,across:10,ridge:.05,color:[.36,.43,.47]});for(let A=0;A<15;A++){const S=.42+A*.088,b=A<6?R:A<11?E:w;ar(t,[g*S,2.89-A*.014,-.05-A*.012],[g*(S+.22+A*.009),2.73-A*.023,-.76-A*.018],.105-A*.002,b,[.26+A*.004,.32+A*.004,.36+A*.004]),A<12&&ar(t,[g*S,2.94-A*.014,.035],[g*(S+.1),2.86-A*.017,-.44],.077,b,[.49,.55,.57])}for(let A=0;A<11;A++)ar(t,[g*(.11+.015*A),2.86-.042*A,-.21],[g*(.29+.009*A),2.7-.044*A,-.75-.022*A],.075,s,[.51+A*.013,.56+A*.012,.56+A*.012]);ar(t,[g*.065,4.34,.51],[g*.13,4.28,-.02],.018,l,[.04,.07,.09],.025)}for(let g=0;g<9;g++)ar(t,[(g-4)*.045,2.53,-.65],[(g-4)*.075,2.34,-1.34-.1*(1-Math.abs(g-4)/4)],.07,n,[.21,.28,.31]);for(let g=0;g<9;g++)ar(t,[(g-4)*.025,3.06,.35],[(g-4)*.044,2.48-.06*(g%3),.42],.032,s,[.79,.8,.72],.01);return{type:"heron",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:h,length:3,height:4.55,scale:1}}function M1(){const i=Ha(),t=new Hn,e=new Hn,n=new Hn,s=i.bone("head",[0,.27,1.97]),r=[s];for(let u=1;u<=20;u++)r.push(i.bone(`coil${u}`,[0,.23,1.97-u*.22],r[u-1]));const o=i.bone("jaw",[0,.205,2.1],s),a=i.bone("mouth",[0,.19,2.48],o),l=i.bone("eyeL",[-.183,.346,2.21],s),c=i.bone("eyeR",[.183,.346,2.21],s),h=(u,d,f)=>{const g=1-Yn(.13,.22,u.y),m=.73-.26*Yn(.2,.65,Math.sin(u.z*7+u.x*18));return _e([Ye(m,.65,g),Ye(m,.6,g),Ye(m,.36,g)],1-g)};t.tube([[0,.25,2.05],[0,.23,1.4],[0,.23,.5],[0,.22,-.4],[0,.18,-1.5],[0,.09,-2.46]],[.13,.186,.205,.18,.115,.002],[.11,.16,.17,.15,.09,.003],{segments:100,radial:20,bones:u=>Ps(r,u),paint:h,distort(u,d,f){u.y+=.003*Math.sin(d*390)*Math.sin(f*12)}}),t.tube([[0,.265,1.86],[0,.29,2.07],[0,.285,2.27],[0,.245,2.48]],[.115,.237,.202,.035],[.1,.12,.105,.038],{segments:24,radial:24,bones:[s],paint:h}),t.tube([[0,.192,1.99],[0,.179,2.25],[0,.207,2.47]],[.14,.19,.025],[.027,.035,.006],{segments:18,radial:16,bones:[o],paint:()=>_e([.66,.63,.42])});for(const u of[-1,1])e.ellipsoid([u*.183,.346,2.21],[.045,.043,.05],{bone:u<0?l:c,rings:12,radial:20,rotationY:u*.9,paint(d){return Math.abs(d.x)<.012&&d.z>.015?_e([.009,.008,.005]):_e([.69,.51,.12])}}),t.tube([[u*.2,.228,2.06],[u*.197,.218,2.29],[u*.045,.225,2.475]],.004,.004,{segments:20,radial:6,bones:[s],paint:()=>_e([.05,.06,.025])}),n.tube([[0,.194,2.47],[0,.19,2.73],[u*.06,.18,2.84]],[.014,.01,.001],[.007,.005,.001],{segments:16,radial:6,bones:[o],paint:()=>_e([.28,.025,.035])});return{type:"snake",rig:i,skin:t.geometry(),eyes:e.geometry(),tongue:n.geometry(),mouth:a,length:5,height:.43,scale:1}}function _1(){const i=Ha(),t=new Hn,e=new Hn,n=i.bone("spine",[0,.6,.18]),s=i.bone("head",[0,.61,.78],n),r=i.bone("tail0",[0,.55,-.44],n),o=i.bone("tail1",[0,.49,-.99],r),a=i.bone("tail",[0,.48,-1.43],o),l=i.bone("jaw",[0,.42,1.03],s),c=i.bone("mouth",[0,.43,1.55],l),h=i.bone("eyeL",[-.22,.72,1.06],s),u=i.bone("eyeR",[.22,.72,1.06],s),d=x=>{const p=1-Yn(.35,.62,x.y),v=.74-.25*Yn(.1,.6,Math.sin(x.z*18+x.y*29)*Math.sin(x.y*35));return _e([Ye(v,.81,p),Ye(v,.78,p),Ye(v,.61,p)],1-p)};t.tube([[0,.48,-1.46],[0,.51,-.92],[0,.61,-.28],[0,.64,.34],[0,.62,.84],[0,.55,1.24],[0,.52,1.56]],[.018,.15,.31,.35,.29,.19,.027],[.035,.22,.46,.48,.32,.19,.05],{segments:54,radial:28,bones:x=>Ps([a,o,r,n,s,s,s],x),paint:d}),t.tube([[0,.43,.92],[0,.36,1.25],[0,.445,1.56]],[.14,.16,.025],[.055,.065,.018],{segments:18,radial:18,bones:[l],paint:()=>_e([.72,.69,.49])});const f=[.33,.4,.23],g=t.p.length/3;for(let x=0;x<=18;x++){const p=x/18,v=Math.cos(p*Math.PI)*.62,y=-1.45-(.3+.3*Math.abs(Math.cos(p*Math.PI)));for(let M=0;M<=6;M++){const R=M/6,E=Oe(.025*Math.sin(p*Math.PI),.48+v*R,Ye(-1.43,y,R)),w=x%2?.85:1.15;t.vertex(E,[R,p],[[a,1]],_e(f.map(A=>A*w),.3))}}for(let x=0;x<18;x++)for(let p=0;p<6;p++){const v=g+x*7+p;t.quad(v,v+1,v+7,v+8)}const m=(x,p,v,y,M=1)=>{const R=Oe(...x).lerp(Oe(...p),.5);R.x+=M*v,t.leaf([x,R.toArray(),p],[.01,v*.8,.003],{bone:y,segments:16,across:8,ridge:.014,color:f,mask:.3})};for(const x of[-1,1]){e.ellipsoid([x*.22,.72,1.06],[.052,.07,.08],{bone:x<0?h:u,rings:12,radial:22,rotationY:x*1,paint(v){return v.z>.035&&Math.pow(v.x/.035,2)+Math.pow(v.y/.04,2)<1?_e([.005,.007,.004]):_e([.75,.59,.18])}});const p=i.bone(`fin${x}`,[x*.255,.42,.65],n);m([x*.255,.42,.65],[x*.63,.21,.11],.16,p,x),m([x*.2,.26,-.11],[x*.38,.13,-.57],.12,r,x),t.tube([[x*.24,.86,.71],[x*.31,.64,.67],[x*.24,.39,.69]],.009,.011,{segments:20,radial:6,bones:[s],paint:()=>_e([.19,.24,.12],.3)});for(let v=0;v<8;v++){const y=1.18+v*.04,M=x*(.12-v*.009);t.tube([[M,.445,y],[M*.9,.475,y+.005]],[.008,.001],[.008,.001],{segments:3,radial:5,bones:[l],paint:()=>_e([.78,.76,.56])})}}for(const x of[!0,!1]){const p=t.p.length/3,v=22;for(let y=0;y<=v;y++){const M=y/v,R=Ye(-.9,.18,M),E=x?.8+.22*M:.26-.1*M,w=Math.sin(Math.PI*M)*(x?.45:-.24),A=M<.5?r:n;for(let S=0;S<=6;S++){const b=S/6,U=Oe(.012*Math.sin(M*6),E+w*b,R-.1*b);t.vertex(U,[b,M],[[A,1]],_e(f.map(P=>P*(y%2?.85:1.1)),.2))}}for(let y=0;y<v;y++)for(let M=0;M<6;M++){const R=p+y*7+M;t.quad(R,R+1,R+7,R+8)}}return{type:"fish",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:c,length:3.65,height:1.65,scale:1}}function b1(i){if(Ol.has(i))return Ol.get(i);const t=256,e=new Uint8Array(t*t*4);for(let s=0;s<t;s++)for(let r=0;r<t;r++){const o=r/t,a=s/t;let l=.82+Zr(r,s)*.18;if(i==="frog"){const d=Math.floor(o*28),f=Math.floor(a*28),g=o*28-d-.5,m=a*28-f-.5,x=Math.hypot(g,m),p=Math.exp(-x*x*38)*(.1+Zr(d,f)*.18);l=.79+.16*Zr(r,s)+p-.11*Math.exp(-Math.pow(x-.31,2)*300)}else if(i==="snake"||i==="fish"){const u=i==="snake"?28:35,d=a*u,f=Math.floor(d),g=o*20+f%2*.5,m=g-Math.floor(g)-.5,x=d-f-.5,p=Math.abs(m)*1.4+Math.abs(x);l=.74+.22*(1-Yn(.49,.72,p))+.04*Zr(r,s)}else l=.79+.15*Math.sin(o*170+.4*Math.sin(a*31))**2+.06*Zr(r,s);const c=(s*t+r)*4,h=Math.floor($e(l)*255);e[c]=e[c+1]=e[c+2]=h,e[c+3]=255}const n=new dh(e,t,t,Gn);return n.wrapS=n.wrapT=Ar,n.magFilter=ri,n.minFilter=os,n.generateMipmaps=!0,n.needsUpdate=!0,n.repeat.set(i==="heron"?1:2,i==="frog"?3:2),Ol.set(i,n),n}function S1(i,t){const e=b1(i),n=new Yd({color:16777215,vertexColors:!0,map:e,bumpMap:e,bumpScale:i==="frog"?.013:i==="heron"?.007:.009,roughness:i==="frog"?.32:i==="heron"?.68:.37,metalness:0,clearcoat:i==="heron"?0:.42,clearcoatRoughness:.25,envMapIntensity:.8,side:Ce}),s=new ee(t);return n.userData.tint=s,n.onBeforeCompile=r=>{r.uniforms.skinTint={value:s},r.vertexShader=`attribute float skinTintMask; varying float vSkinTint;
`+r.vertexShader,r.vertexShader=r.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vSkinTint = skinTintMask;`),r.fragmentShader=`uniform vec3 skinTint; varying float vSkinTint;
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
 diffuseColor.rgb *= mix(vec3(1.0),skinTint,vSkinTint);`)},n.customProgramCacheKey=()=>"anatomical-skin-v3",n}function w1(i,t){const e=new xn({color:i,side:In,transparent:!0,opacity:.91,depthWrite:!1,toneMapped:!1});return e.userData.thickness={value:t},e.onBeforeCompile=n=>{n.uniforms.outlineThickness=e.userData.thickness,n.vertexShader=`uniform float outlineThickness;
`+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <begin_vertex>","vec3 transformed = position + normal * outlineThickness;")},e.customProgramCacheKey=()=>"skeletal-silhouette-v3",e}function E1(i){const t=i.map(e=>{const n=new Gd;return n.name=e.name,n});for(let e=0;e<i.length;e++){const n=i[e];t[e].position.fromArray(n.p),n.parent!==null&&n.parent!==void 0&&(t[e].position.sub(Oe(...i[n.parent].p)),t[n.parent].add(t[e]))}return{bones:t,skeleton:new fh(t),root:t[0]}}function T1(){if(!es){const n=[],s=[];for(let o=0;o<=48;o++){const a=o/48*fi,l=Math.sin(a),c=Math.cos(a),h=Math.abs(o%8-4)/4,u=-.018*c,d=u+.1+.205*h,f=1+.08*h;n.push(l*.255,u,c*.175,l*.27*f,d,c*.188*f,l*.231,u,c*.151,l*(.27*f-.024),d,c*(.188*f-.024))}for(let o=0;o<48;o++){const a=o*4,l=a+4;s.push(a,l,a+1,l,l+1,a+1),s.push(a+2,a+3,l+2,l+2,a+3,l+3),s.push(a+1,l+1,a+3,l+1,l+3,a+3),s.push(a,a+2,l,l,a+2,l+2)}es=new Se,es.setAttribute("position",new Vt(n,3)),es.setIndex(s),es.computeVertexNormals(),es.computeBoundingSphere(),es.computeBoundingBox(),Bl=new yh(.047,0),Bl.scale(.78,1.05,.5)}const i=new te;i.name="royal-crown",i.position.set(0,.22,-.11);const t=new Jt(es,new Ve({color:15910746,roughness:.29,metalness:.58,emissive:5911813,emissiveIntensity:.12}));t.name="royal-crown-gold",t.castShadow=!0,t.receiveShadow=!0,i.add(t);const e=new Jt(Bl,new Ve({color:14562379,roughness:.18,metalness:.2,flatShading:!0,emissive:4785420,emissiveIntensity:.12}));return e.name="royal-crown-ruby",e.position.set(0,.042,.195),i.add(e),i}function ud(i,t=0){const e=i==="frog"&&t?`${i}:${t}`:i;if(!Fl.has(e)){const n=i==="frog"?hd([1,.36,.18][t]):({heron:y1,snake:M1,fish:_1}[i]||hd)();for(const s of["skin","eyes","armor","shell","bracers","crest","tongue"])n[s]?.boundingSphere&&(n[s].boundingSphere.radius*=1.9);Fl.set(e,n)}return Fl.get(e)}function Gl(i,t,e,n,s,r,o){const a=Math.hypot(n.y,n.z),l=Math.hypot(s.y,s.z),c=n.y+s.y+r,h=n.z+s.z+o,u=Math.max(Math.abs(a-l)+1e-5,Math.min(a+l-1e-5,Math.hypot(c,h))),d=Math.atan2(h,c),f=-Math.sign(n.y*s.z-n.z*s.y)||1,g=Math.acos($e((a*a+u*u-l*l)/(2*a*u),-1,1)),m=d+f*g,x=m-Math.atan2(n.z,n.y);i.rotation.x=Math.atan2(Math.sin(x),Math.cos(x));const p=Math.cos(m)*a,v=Math.sin(m)*a,y=Math.atan2(h-v,c-p)-i.rotation.x-Math.atan2(s.z,s.y);t.rotation.x=Math.atan2(Math.sin(y),Math.cos(y)),e.rotation.x=-i.rotation.x-t.rotation.x}function A1(i,t){if(!i)return{type:"",phase:0,force:0};let e="kick",n=t;return typeof i=="string"?e=i:typeof i=="number"?n=i:(e=i.type||i.kind||"kick",n=i.phase??i.progress??t),n=$e(n),{type:e,phase:n,force:Math.sin(n*Math.PI)}}function Vl(i,t,e){const n=i.points;if(t<=n[0].s)return e.copy(n[0]),e;for(let s=1;s<n.length;s++)if(t<=n[s].s){const r=n[s-1],o=n[s],a=(t-r.s)/(o.s-r.s||1);return e.set(Ye(r.x,o.x,a),Ye(r.y,o.y,a),Ye(r.z,o.z,a))}return e.copy(n.at(-1)),e}function R1(i="frog",t={}){["frog","heron","snake","fish"].includes(i)||(i="frog");const e=ud(i),n=new te,s=new te;n.name=`creature-${i}`,s.name="anatomical-animation-pivot",n.add(s);const r=i==="frog"?7378989:i==="snake"?6715206:i==="fish"?8624996:16777215,o=S1(i,t.color??r);o.emissive.set(16777215),o.emissiveIntensity=0;const a=new Yd({color:16777215,vertexColors:!0,roughness:.13,clearcoat:1,clearcoatRoughness:.05,metalness:.05}),{bones:l,skeleton:c,root:h}=E1(e.rig.defs),u=new $o(e.skin,o);u.name=`${i}-weighted-surface`,u.add(h),s.add(u),u.castShadow=!0,u.receiveShadow=!0,u.frustumCulled=!0,n.updateMatrixWorld(!0),u.bind(c);const d=new $o(e.eyes,a);d.name="articulated-eyes",d.bind(c,u.bindMatrix),d.castShadow=!1,d.frustumCulled=!0,s.add(d);const f=new $o(e.skin,w1(t.outlineColor??(t.team==="enemy"?16741200:t.team==="player"?11075554:i==="frog"?8513956:16755275),i==="frog"?.018:.027));f.name="animated-color-silhouette",f.bind(c,u.bindMatrix),f.frustumCulled=!0,f.renderOrder=-1,s.add(f);const g=[];for(const ut of["armor","shell","bracers","crest","tongue"])if(e[ut]){const $=new Ve({color:16777215,vertexColors:!0,roughness:ut==="tongue"?.35:.79,side:Ce}),ot=new $o(e[ut],$);ot.name=ut,ot.bind(c,u.bindMatrix),ot.frustumCulled=!0,ot.castShadow=ut!=="tongue",ot.visible=ut==="tongue",s.add(ot),g.push(ot)}const m={};for(const ut of l)m[ut.name]=ut;const x=l.map(ut=>ut.position.clone()),p=new qe;p.name="mouth-attachment",l[e.mouth].add(p);let v=(t.seed||0)*.731,y=0,M="",R=1,E=0,w=0,A=0,S=!0,b=!1,U=null,P=1,G=!1,j=0,O={x:0,z:1,strength:0,life:0,duration:.26,heavy:!1},B={armor:null,weapon:null,crest:!1};const K=t.role||"scout",q=i==="frog"?["guardian","brute","tank"].includes(K)?[1.15,1.12,1.05]:["scout","hunter","agile"].includes(K)?[.96,.98,1.04]:[1.03,1.02,1.02]:[1,1,1];s.scale.set(...q);const Y=()=>{const ut=1+(R-1)*.04+Math.min(24,Math.max(0,P-1))*.004;s.scale.set(q[0]*ut,q[1]*ut,q[2]*ut)},H=()=>{for(const ut of g)ut.name==="armor"&&(ut.visible=i==="frog"&&B.armor==="reed"),ut.name==="shell"&&(ut.visible=i==="frog"&&B.armor==="shell"),ut.name==="bracers"&&(ut.visible=i==="frog"&&B.weapon==="reed"),ut.name==="crest"&&(ut.visible=i==="frog"&&B.crest&&!b)},st=()=>{for(let ut=0;ut<l.length;ut++)l[ut].rotation.set(0,0,0),l[ut].scale.set(1,1,1),l[ut].position.copy(x[ut])};let _t=null;function ne(ut){if(i!=="snake"||!ut?.points?.length||!ut.weight)return;_t||(_t={targets:Array.from({length:21},()=>new ue),local:new ue,inverse:new ue,point:Oe(),before:Oe(),after:Oe(),translation:Oe(),rotation:new hs,scale:Oe(1,1,1),localPosition:Oe(),localRotation:new hs,localScale:Oe()});const $=_t,ot=$e(ut.weight),Mt=ut.scale||1,Xt=ut.origin,Ft=Math.cos(ut.yaw||0),pe=Math.sin(ut.yaw||0);s.position.y*=1-ot,s.rotation.x*=1-ot,s.rotation.z*=1-ot;for(let D=0;D<=20;D++){const ie=D?m["coil"+D]:m.head,jt=1.97-D*.22,Yt=(D?jt:2.17)*Mt;Vl(ut,Yt,$.point),Vl(ut,Yt-.07*Mt,$.before),Vl(ut,Yt+.07*Mt,$.after);const Lt=$.after.x-$.before.x,re=$.after.z-$.before.z,mt=Math.hypot(Lt,re),bt=mt>1e-4?Math.atan2(Lt,re):ut.yaw||0;D||($.point.x-=Math.sin(bt)*.2*Mt,$.point.z-=Math.cos(bt)*.2*Mt);const he=($.point.x-Xt.x)/Mt,ze=($.point.z-Xt.z)/Mt,I=Math.max($.point.y,$.before.y,$.after.y);$.translation.set(Ft*he-pe*ze,(I-Xt.y)/Mt+(D?.26:.3),pe*he+Ft*ze),$.rotation.setFromAxisAngle(Zc,bt-(ut.yaw||0)),$.targets[D].compose($.translation,$.rotation,$.scale),$.local.copy($.targets[D]),D&&$.local.premultiply($.inverse.copy($.targets[D-1]).invert()),$.local.decompose($.localPosition,$.localRotation,$.localScale),ie.position.lerp($.localPosition,ot),ie.quaternion.slerp($.localRotation,ot),ie.scale.lerp($.localScale,ot)}m.jaw.rotation.x*=1-ot*.8;const we=g.find(D=>D.name==="tongue");we&&ot>.8&&(we.visible=!1)}const le={group:n,bones:m,skeleton:c,mesh:u,get crowned(){return b},get equipment(){return{...B}},get level(){return P},get working(){return G},stats:{type:i,vertices:e.skin.attributes.position.count+e.eyes.attributes.position.count,triangles:(e.skin.index.count+e.eyes.index.count)/3,boneCount:l.length,length:e.length,height:e.height,rigged:!0,renderLOD:0},setOutline(ut,$=!0){ut!=null&&f.material.color.set(ut),S=$,f.visible=$&&A===0},setRenderLOD(ut=0){const $=i==="frog"?$e(Math.round(Number(ut)||0),0,2):0;if($===A)return;A=$;const ot=ud(i,$);for(const Mt of[u,d,f,...g])Mt.geometry=ot[Mt===u||Mt===f?"skin":Mt===d?"eyes":Mt.name],Mt.boundingSphere=null,Mt.boundingBox=null,Mt.castShadow=$===0&&Mt!==d&&Mt!==f&&Mt.name!=="tongue";f.visible=S&&$===0,U&&(U.getObjectByName("royal-crown-gold").castShadow=$===0),le.stats.vertices=ot.skin.attributes.position.count+ot.eyes.attributes.position.count,le.stats.triangles=(ot.skin.index.count+ot.eyes.index.count)/3,le.stats.renderLOD=$},setTier(ut){R=$e(Math.round(ut||1),1,5),Y()},setLevel(ut){P=$e(Math.floor(Number(ut)||1),1,999),Y()},setEquipment(ut={}){return B=i==="frog"?{armor:["reed","shell"].includes(ut?.armor)?ut.armor:null,weapon:ut?.weapon==="reed"?"reed":null,crest:ut?.crest===!0}:{armor:null,weapon:null,crest:!1},H(),{...B}},setWorking(ut=!1){G=i==="frog"&&!!ut},setImpact(ut={}){const $=$e(Number(ut.strength)||0,0,1.5),ot=Number(ut.x)||0,Mt=Number(ut.z)||0,Xt=Math.hypot(ot,Mt)||1,Ft=$e(Number(ut.duration)||.26,.08,.5);O={x:ot/Xt,z:Mt/Xt,strength:$,life:$?Ft:0,duration:Ft,heavy:!!ut.heavy},o.emissiveIntensity=$?Math.min(.82,.34+$*.35):0},setCrowned(ut=!1){return b=i==="frog"&&!!ut,b&&!U&&(U=T1(),m.head.add(U)),U&&(U.visible=b,U.getObjectByName("royal-crown-gold").castShadow=A===0),H(),b},mouthWorld(ut=new L){return n.updateWorldMatrix(!0,!0),p.getWorldPosition(ut)},update(ut,$={}){ut=$e(Number(ut)||0,0,.1),v=$.time!==void 0?$.time+(t.seed||0)*.731:v+ut,st();const ot=Math.max(0,Number($.speed)||0),Mt=$e(ot/(i==="frog"?2.8:3));w=Ye(w,Mt,1-Math.exp(-ut*12));const Xt=$.swimming?1:0,Ft=typeof $.jump=="number"?$e($.jump):$.jump?.5:0,pe=typeof $.attack=="string"?$.attack:$.attack?.type||$.attack?.kind||($.attack?"kick":"");pe!==M?(y=0,M=pe):$.attack&&(y+=ut/.55);const we=A1($.attack,y),D=we.force,ie=typeof $.roar=="number"?$e($.roar):$.roar?1:0,jt=typeof $.hit=="number"?$e($.hit):$.hit?1:0;O.life=Math.max(0,O.life-ut),o.emissiveIntensity=O.life>0?Math.max(0,1-(O.duration-O.life)/.07)*Math.min(.82,.34+O.strength*.35):0,$.building!==void 0&&(G=i==="frog"&&!!$.building),j=Ye(j,G&&!$.dead&&!we.type&&ot<1?1:0,1-Math.exp(-ut*12)),E=Ye(E,$.dead?1:0,1-Math.exp(-ut*5)),s.position.set(0,0,0),s.rotation.set(0,0,0);const Yt=(v+(t.seed||0)*.4)%5.7,Lt=Yt>5.5?.08+.92*Math.abs((Yt-5.6)*10):1;if(m.eyeL&&(m.eyeL.scale.y=$e(Lt,.08,1)),m.eyeR&&(m.eyeR.scale.y=$e(Lt,.08,1)),i==="frog"){const re=$.hop||(Ft>0?{phase:"air",progress:1-Ft}:{phase:"idle",progress:0}),mt=$e(re.progress||0),bt=re.phase==="air",he=re.phase==="gather"?mt:0,ze=re.phase==="land"?Math.sin(mt*Math.PI):0,I=bt?Math.sin($e(mt/.14)*Math.PI/2)*(1-$e((mt-.16)/.48)):0,T=bt?$e((mt-.82)/.18):0,tt=bt?1-$e(mt/.14):0,lt=bt?$e((mt-.25)/.45)*(1-T):0,ct=bt?$e((mt-.6)/.35):0,at=v*7.8,Ut=Math.sin(at)*w;s.position.y=Xt?-.14+.023*Math.sin(v*3):-.085*(he+tt)-.075*ze,s.rotation.x=Xt?-.12:(he+tt)*.07-(bt?Math.sin(mt*Math.PI)*.12:0)+ct*.08*(1-T),m.spine.rotation.x=Math.sin(v*2.6)*.009,m.spine.scale.y=1+Math.sin(v*2.6)*.018,m.head.rotation.x=.02*Math.sin(v*1.7)-ie*.18-(bt?.04:0),m.jaw.rotation.x=-ie*.13-(we.type==="tongue"?D*.16:0),m.throat.scale.set(1+ie*.26,1+ie*1.45+Math.sin(v*2.5)*.035,1+ie*.25);for(const ht of[-1,1])if(Xt)m[`hip${ht}`].rotation.x=-.32*Ut,m[`hip${ht}`].rotation.z=ht*.07*Ut,m[`knee${ht}`].rotation.x=.62*Ut,m[`ankle${ht}`].rotation.x=-.25*Ut,m[`foot${ht}`].rotation.x=.2*Ut,m[`shoulder${ht}`].rotation.x=-.23*Ut,m[`elbow${ht}`].rotation.x=.28*Ut,m[`wrist${ht}`].rotation.x=-.12*Ut,m[`shoulder${ht}`].rotation.z=ht*(.22+.25*Ut),m[`elbow${ht}`].rotation.y=ht*.3;else if(!$.dead){const Et=e.rig.ids,It=bt?.085*tt+(-.1*I+.045*lt)*(1-tt):-s.position.y,gt=bt?.035*tt+(-.42*I+.11*lt)*(1-tt):.035*he,Ct=bt?.085*tt+(.085*(1-ct)-.035*ct)*(1-T)*(1-tt):-s.position.y,Qt=bt?(-.075*(1-ct)+.13*ct)*(1-T)*(1-tt):0;Gl(m[`hip${ht}`],m[`knee${ht}`],m[`ankle${ht}`],x[Et[`knee${ht}`]],x[Et[`ankle${ht}`]],It,gt),Gl(m[`shoulder${ht}`],m[`elbow${ht}`],m[`wrist${ht}`],x[Et[`elbow${ht}`]],x[Et[`wrist${ht}`]],Ct,Qt),m[`foot${ht}`].rotation.x=-I*.14}if(we.type==="kick"||we.type==="strike"){s.rotation.y=-D*.55,s.rotation.z=D*.22,s.position.y+=D*.16;const ht=e.rig.ids;Gl(m.hip1,m.knee1,m.ankle1,x[ht.knee1],x[ht.ankle1],.26*D,1.16*D),m.hip1.rotation.y=-D*.3,m.hip1.rotation.z=-D*.08,m["shoulder-1"].rotation.z=D*.55}else if(we.type==="slam"||we.type==="belly"){const ht=Math.sin(we.phase*Math.PI);s.rotation.x=-ht*.28,s.position.y+=ht*.22;for(const Et of[-1,1])m[`hip${Et}`].rotation.x-=ht*.7,m[`shoulder${Et}`].rotation.z=Et*ht*.45}else we.type==="tongue"&&(m.head.rotation.x-=D*.1,m.spine.rotation.x-=D*.07);if(j>.001){const ht=v*8.2,Et=.5+.5*Math.sin(ht),It=.5+.5*Math.sin(ht+Math.PI);m.spine.rotation.x+=.1*j,m.head.rotation.x+=(.12+.06*Et)*j,m.shoulder1.rotation.x-=(.25+Et*.85)*j,m.elbow1.rotation.x+=(.2+Et*.55)*j,m.wrist1.rotation.x-=Et*.3*j,m["shoulder-1"].rotation.x-=(.13+It*.35)*j,m["elbow-1"].rotation.x+=(.15+It*.2)*j,s.position.y+=.025*Math.cos(ht)*j}if(O.life>0){const ht=1-O.life/O.duration,Et=Math.sin(Math.min(1,ht/.22)*Math.PI/2)*Math.pow(1-ht,1.8)*O.strength,It=Et*(O.heavy?1.2:1);s.rotation.x+=O.z*.17*It,s.rotation.z-=O.x*.21*It,s.position.x+=O.x*.045*It,s.position.z+=O.z*.055*It,m.spine.scale.z*=1-.075*Et,m.head.rotation.x-=.15*It,m.head.rotation.z-=O.x*.08*It,m.jaw.rotation.x-=.12*It,m["shoulder-1"].rotation.z-=.1*It,m.shoulder1.rotation.z+=.1*It,m.eyeL.scale.y*=1-.55*Et,m.eyeR.scale.y*=1-.55*Et}else jt>0&&(s.rotation.x+=jt*.065);s.position.y-=E*.22,s.rotation.z+=E*1.35,m.spine.scale.y*=1-E*.15}else if(i==="heron"){const re=v*5.6,mt=w;s.position.y=.035*Math.sin(re*2)*mt,m.spine.rotation.x=-.03*Math.sin(re)*mt,m.neck0.rotation.x=.1*Math.sin(v*1.4)-D*.62,m.neck1.rotation.x=-.08*Math.sin(v*1.4)+D*.58,m.neck2.rotation.x=-.03+D*.7,m.head.rotation.x=-.06*Math.sin(v*1.8)+D*.48,m.jaw.rotation.x=-D*.5;for(const bt of[-1,1]){const he=re+(bt<0?Math.PI:0),ze=Math.sin(he);m[`hip${bt}`].rotation.x=ze*.31*mt,m[`knee${bt}`].rotation.x=Math.max(0,-ze)*.57*mt,m[`foot${bt}`].rotation.x=-.18*ze*mt,m[`wing${bt}`].rotation.y=bt*(1.24-D*1.07-jt*.55),m[`wing${bt}`].rotation.z=bt*(.07+D*(.5+.25*Math.sin(v*18))+jt*.5),m[`wingElbow${bt}`].rotation.y=bt*.12,m[`wingWrist${bt}`].rotation.z=bt*D*.18}s.rotation.z+=(O.life>0?0:jt*.08*Math.sin(v*32))+E*1.45,s.position.y-=E*1.8}else if(i==="snake"){const re=v*(3+w*5),mt=.055+w*.105;for(let he=1;he<=20;he++)m[`coil${he}`].rotation.y=Math.sin(re-he*.48)*mt,m[`coil${he}`].rotation.x=he<6?-D*.18*(1-he/7):.006*Math.sin(v*3-he);m.head.rotation.x=D*.45,m.head.rotation.y=Math.sin(re)*.035,m.jaw.rotation.x=-D*.62,s.position.y=D*.28;const bt=g.find(he=>he.name==="tongue");bt&&(bt.visible=!$.dead&&(Math.sin(v*3.7)>.77||D>.2)),s.rotation.z=E*.65+(O.life>0?0:jt*.1*Math.sin(v*32))}else if(i==="fish"){const re=v*(4+w*10),mt=.09+w*.22;m.spine.rotation.y=Math.sin(re)*mt*.2,m.head.rotation.y=-Math.sin(re)*mt*.13,m.tail0.rotation.y=Math.sin(re-.5)*mt,m.tail1.rotation.y=Math.sin(re-1.1)*mt*1.25,m.tail.rotation.y=Math.sin(re-1.6)*mt*1.2,m.jaw.rotation.x=-D*.62-.035*Math.sin(v*2.5);for(const bt of[-1,1])m[`fin${bt}`].rotation.z=bt*(.13+.16*Math.sin(v*6)),m[`fin${bt}`].rotation.y=bt*.15*Math.sin(v*5);s.rotation.x=-D*.35,s.position.y=.035*Math.sin(v*2),s.rotation.z=E*Math.PI+(O.life>0?0:jt*.14*Math.sin(v*35))}if(i!=="frog"&&O.life>0){const re=1-O.life/O.duration,mt=Math.sin(Math.min(1,re/.22)*Math.PI/2)*Math.pow(1-re,1.8)*O.strength*(O.heavy?1.2:1);s.rotation.x+=O.z*.055*mt,s.rotation.z-=O.x*.08*mt,m.head.rotation.x-=.075*mt,m.head.rotation.z-=O.x*.05*mt}i==="snake"&&ne($.snakePose)},dispose(){o.dispose(),a.dispose(),f.material.dispose();for(const ut of g)ut.material.dispose();U&&U.traverse(ut=>{ut.isMesh&&ut.material.dispose()}),c.dispose(),n.removeFromParent()}};return le.setTier(t.tier||1),le.setLevel(t.level||1),le.setEquipment(t.equipment),le.setCrowned(t.crowned),le.update(0,{}),n.userData.creature=le,le}const Ln=(i,t)=>Object.freeze({x:i,z:t}),_r=["player","rival-1","rival-2"],C1=.78,Mi=.84,Cn=1e-5,Ga=Object.freeze([{id:"catapult-player",enclosureId:"yard-player",owner:_r[0],x:-8.5,z:16},{id:"catapult-rival-1",enclosureId:"yard-rival-1",owner:_r[1],x:-16,z:-8.5},{id:"catapult-rival-2",enclosureId:"yard-rival-2",owner:_r[2],x:16,z:-8.5}].map(Object.freeze)),Wn=Object.freeze([{id:"base-player",owner:_r[0],x:0,z:20.5,spawn:Ln(0,19.65),spawnHeading:Math.PI,stock:Ln(0,21.4),gate:Ln(0,17.9),approach:Ln(0,16.25),side:"north",halfWidth:3.1,halfDepth:2.6},{id:"base-rival-1",owner:_r[1],x:-18,z:1,spawn:Ln(-17.35,1),spawnHeading:Math.PI/2,stock:Ln(-19.1,1),gate:Ln(-14.9,1),approach:Ln(-13.25,1),side:"east",halfWidth:3.1,halfDepth:2.9},{id:"base-rival-2",owner:_r[2],x:18,z:1,spawn:Ln(17.35,1),spawnHeading:-Math.PI/2,stock:Ln(19.1,1),gate:Ln(14.9,1),approach:Ln(13.25,1),side:"west",halfWidth:3.1,halfDepth:2.9}].map(Object.freeze));function af(i,t){return i.map(e=>{let n=-1/0,s=1/0;const r=e.halfWidth+.18,o=e.halfDepth+.18,a=Math.ceil(r*2/.22),l=Math.ceil(o*2/.22);for(let x=0;x<=a;x++)for(let p=0;p<=l;p++){const v=-r+r*2*x/a,y=-o+o*2*p/l,M=t(e.x+v,e.z+y);n=Math.max(n,M),s=Math.min(s,M)}const c=n+.16,h=Math.hypot(e.gate.x-e.x,e.gate.z-e.z),u=(e.gate.x-e.x)/h,d=(e.gate.z-e.z)/h,f=-d,g=u,m={x:e.gate.x+u*.18,z:e.gate.z+d*.18,dx:u,dz:d,rightX:f,rightZ:g,halfWidth:1.55,length:2.5,rows:10,cols:6,heights:[]};for(let x=0;x<=m.rows;x++)for(let p=0;p<=m.cols;p++){const v=x/m.rows*m.length,y=(p/m.cols*2-1)*m.halfWidth,M=m.x+u*v+f*y,R=m.z+d*v+g*y,E=t(m.x+u*m.length+f*y,m.z+d*m.length+g*y)+.015;m.heights.push(Math.max(c+(E-c)*x/m.rows,t(M,R)+.015))}return{id:e.id,baseId:e.id,x:e.x,z:e.z,halfWidth:r,halfDepth:o,height:c,minimum:s,ramp:m}})}function P1(i){return af(Wn,i)}function z1(i){return af(lf,i)}function I1(i,t,e){if(!e)return null;for(const n of e){if(Math.abs(i-n.x)<=n.halfWidth+1e-7&&Math.abs(t-n.z)<=n.halfDepth+1e-7)return n.height;const s=n.ramp,r=i-s.x,o=t-s.z,a=r*s.dx+o*s.dz,l=r*s.rightX+o*s.rightZ;if(a<-1e-7||a>s.length+1e-7||Math.abs(l)>s.halfWidth+1e-7)continue;const c=Math.max(0,Math.min(s.rows,a/s.length*s.rows)),h=Math.max(0,Math.min(s.cols,(l/s.halfWidth+1)*.5*s.cols)),u=Math.min(s.rows-1,Math.floor(c)),d=Math.min(s.cols-1,Math.floor(h)),f=c-u,g=h-d,m=s.heights[u*(s.cols+1)+d],x=s.heights[u*(s.cols+1)+d+1],p=s.heights[(u+1)*(s.cols+1)+d],v=s.heights[(u+1)*(s.cols+1)+d+1];return(m+(x-m)*g)*(1-f)+(p+(v-p)*g)*f}return null}const lf=Object.freeze(Ga.map(i=>Object.freeze({id:i.enclosureId,owner:i.owner,x:i.x,z:i.z,halfWidth:2.8,halfDepth:2.8,side:"south",gate:Ln(i.x,i.z+2.8),approach:Ln(i.x,i.z+4.45)}))),Va=Object.freeze([...Wn.map(i=>Object.freeze({...i,kind:"shelter",height:2.3})),...lf.map(i=>Object.freeze({...i,kind:"catapult",height:1.65}))]),aa=3.2,lr=.34;function D1(i){const t=[],e=(n,s,r,o,a,l="whole")=>t.push(Object.freeze({id:`${i.id}-${n}-${l}`,enclosureId:i.id,owner:i.owner,x:s,z:r,hw:o,hd:a,height:i.height}));for(const n of["north","south"]){const s=i.z+(n==="north"?-i.halfDepth:i.halfDepth);if(i.side===n){const r=(i.halfWidth-aa/2)/2;for(const o of[-1,1])e(n,i.x+o*(aa/2+r),s,r,lr/2,String(o))}else e(n,i.x,s,i.halfWidth+lr/2,lr/2)}for(const n of["west","east"]){const s=i.x+(n==="west"?-i.halfWidth:i.halfWidth);if(i.side===n){const r=(i.halfDepth-aa/2)/2;for(const o of[-1,1])e(n,s,i.z+o*(aa/2+r),lr/2,r,String(o))}else e(n,s,i.z,lr/2,i.halfDepth+lr/2)}return t}const ds=Object.freeze(Va.flatMap(D1)),Eh=Object.freeze([{id:"grove-west",x:-7,z:9,radius:3.1},{id:"grove-east",x:8,z:6.4,radius:3.1},{id:"grove-middle",x:0,z:-4.5,radius:3.4},{id:"grove-northwest",x:-7.2,z:-8.8,radius:2.5},{id:"grove-northeast",x:7.6,z:-9.2,radius:2.5}].map(Object.freeze)),Mo=Object.freeze([{x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6},...Ga.map(i=>({x:i.x,z:i.z,r:.95,machine:!0}))]);function Wa(i,t=0){return{minX:i.x-i.hw-t,maxX:i.x+i.hw+t,minZ:i.z-i.hd-t,maxZ:i.z+i.hd+t}}function Th(i,t,e,n=0){return i>e.minX+n&&i<e.maxX-n&&t>e.minZ+n&&t<e.maxZ-n}function cf(i,t,e,n,s,r=0){const o=Wa(s,r),a=e-i,l=n-t;let c=-1/0,h=1/0,u=0,d=0;for(const[f,g,m,x,p]of[[i,a,o.minX,o.maxX,"x"],[t,l,o.minZ,o.maxZ,"z"]]){if(Math.abs(g)<1e-12){if(f<m-Cn||f>x+Cn)return null;continue}const v=(m-f)/g,y=(x-f)/g,M=Math.min(v,y),R=Math.max(v,y);if(M>c&&(c=M,u=p==="x"?g>0?-1:1:0,d=p==="z"?g>0?-1:1:0),h=Math.min(h,R),c>h+Cn)return null}return h<0||c>1||c<0&&!Th(i,t,o,-Cn)?null:{t:Math.max(0,c),nx:u,nz:d}}function L1(i,t,e,n,s=0){let r=1/0;for(const o of ds){const a=cf(i,t,e,n,o,s);a&&a.t<r&&(r=a.t)}return Number.isFinite(r)?r:null}function ks(i,t,e=.1){return L1(i.x,i.z,t.x,t.z,e)===null}function so(i,t,e,n=C1){let s=i.x,r=i.z,o=Number.isFinite(t)?t:0,a=Number.isFinite(e)?e:0;for(let l=0;l<4;l++){let c=!1;for(const h of ds){const u=Wa(h,n);if(!Th(s,r,u,Cn))continue;const d=[{distance:s-u.minX,x:u.minX-Cn,z:r},{distance:u.maxX-s,x:u.maxX+Cn,z:r},{distance:r-u.minZ,x:s,z:u.minZ-Cn},{distance:u.maxZ-r,x:s,z:u.maxZ+Cn}];d.sort((f,g)=>f.distance-g.distance),s=d[0].x,r=d[0].z,c=!0}if(!c)break}for(let l=0;l<4&&(Math.abs(o)>Cn||Math.abs(a)>Cn);l++){let c=null;for(const f of ds){const g=cf(s,r,s+o,r+a,f,n);g&&(!c||g.t<c.t)&&(c=g)}if(!c){s+=o,r+=a;break}const h=Math.max(0,c.t-Cn);s+=o*h,r+=a*h;const u=1-c.t;o*=u,a*=u;const d=o*c.nx+a*c.nz;if(d<0)o-=c.nx*d,a-=c.nz*d;else break}return{x:s,z:r}}function Xa(i){return Eh.find(t=>Math.hypot(i.x-t.x,i.z-t.z)<=t.radius)||null}function U1(i){return Xa(i)?.55:1}function k1(i){return Va.find(t=>Math.abs(i.x-t.x)<t.halfWidth&&Math.abs(i.z-t.z)<t.halfDepth)||null}function N1(i,t,e,n){const s=t.x-i.x,r=t.z-i.z,o=s*s+r*r,a=o?Math.max(0,Math.min(1,((e.x-i.x)*s+(e.z-i.z)*r)/o)):0;return Math.hypot(i.x+a*s-e.x,i.z+a*r-e.z)<n-Cn}function br(i,t){return ks(i,t,Mi)&&Mo.every(e=>!N1(i,t,e,e.r+Mi))}function F1(i){return Math.hypot(i.x,i.z)<=23.85&&ds.every(t=>!Th(i.x,i.z,Wa(t,Mi),-Cn))&&Mo.every(t=>Math.hypot(i.x-t.x,i.z-t.z)>t.r+Mi+Cn)}let la=null;const cr=new WeakMap;function O1(){if(la)return la;const i=[],t=(n,s)=>{const r={x:n,z:s};F1(r)&&!i.some(o=>Math.hypot(o.x-n,o.z-s)<.1)&&i.push(r)};for(const n of ds){const s=Wa(n,Mi+.06);for(const r of[s.minX,s.maxX])for(const o of[s.minZ,s.maxZ])t(r,o)}for(const n of Mo)for(let s=0;s<12;s++){const r=s*Math.PI/6,o=(n.r+Mi+.08)/Math.cos(Math.PI/12);t(n.x+Math.cos(r)*o,n.z+Math.sin(r)*o)}for(const n of Va)t(n.gate.x,n.gate.z),t(n.approach.x,n.approach.z),t(n.gate.x+(n.x-n.gate.x)*.4,n.gate.z+(n.z-n.gate.z)*.4);const e=i.map(()=>[]);for(let n=0;n<i.length;n++)for(let s=n+1;s<i.length;s++)if(br(i[n],i[s])){const r=Math.hypot(i[n].x-i[s].x,i[n].z-i[s].z);e[n].push([s,r]),e[s].push([n,r])}return la={nodes:i,edges:e},la}function B1(i,t){let e={x:t.x,z:t.z};const n=Mo.find(s=>s.machine&&Math.hypot(e.x-s.x,e.z-s.z)<s.r+Mi);return n&&(e={x:n.x,z:n.z+2.05}),so(e,0,0,Mi+.02)}function H1(i,t){const{nodes:e,edges:n}=O1(),s=e.length,r=new Float64Array(s),o=new Int32Array(s),a=new Uint8Array(s);r.fill(1/0),o.fill(-1);const l=new Map;for(let d=0;d<s;d++)br(i,e[d])&&(r[d]=Math.hypot(i.x-e[d].x,i.z-e[d].z)),br(e[d],t)&&l.set(d,Math.hypot(t.x-e[d].x,t.z-e[d].z));let c=-1,h=1/0;for(let d=0;d<s;d++){let f=-1,g=1/0;for(let m=0;m<s;m++)!a[m]&&r[m]<g&&(g=r[m],f=m);if(f<0||g>=h)break;a[f]=1,l.has(f)&&g+l.get(f)<h&&(c=f,h=g+l.get(f));for(const[m,x]of n[f])g+x<r[m]&&(r[m]=g+x,o[m]=f)}if(c<0)return[];const u=[t];for(let d=c;d>=0;d=o[d])u.unshift(e[d]);return u}function hf(i,t){if(!Number.isFinite(t?.x)||!Number.isFinite(t?.z))return{x:0,z:0};const e=so(i,0,0,Mi+.02),n=Math.hypot(e.x-i.x,e.z-i.z);if(n>.005)return cr.delete(i),{x:(e.x-i.x)/n,z:(e.z-i.z)/n};for(const c of Mo){const h=i.x-c.x,u=i.z-c.z,d=Math.hypot(h,u);if(d<c.r+Mi+.01)return cr.delete(i),d>1e-6?{x:h/d,z:u/d}:{x:0,z:1}}const s=B1(i,t),r=Math.hypot(s.x-i.x,s.z-i.z);if(r<.18)return cr.delete(i),{x:0,z:0};if(br(i,s))return cr.delete(i),{x:(s.x-i.x)/r,z:(s.z-i.z)/r};let o=cr.get(i);for((!o||Math.hypot(o.goal.x-s.x,o.goal.z-s.z)>1.1||Math.hypot(o.lastX-i.x,o.lastZ-i.z)>3)&&(o={goal:s,path:H1(i,s),lastX:i.x,lastZ:i.z},cr.set(i,o)),o.lastX=i.x,o.lastZ=i.z;o.path.length&&Math.hypot(o.path[0].x-i.x,o.path[0].z-i.z)<.18&&(o.path.length===1||br(i,o.path[1]));)o.path.shift();for(let c=o.path.length-1;c>0;c--)if(br(i,o.path[c])){o.path.splice(0,c);break}const a=o.path[0];if(!a)return{x:0,z:0};const l=Math.hypot(a.x-i.x,a.z-i.z);return l?{x:(a.x-i.x)/l,z:(a.z-i.z)/l}:{x:0,z:0}}const Pe=Object.freeze({delivery:"catapult",interactionRange:3,baseRadius:.95,minRange:5,maxRange:28,blastRadius:2.8,innerRadius:1.25,flightTime:1.25,arcHeight:8,cooldown:3,recoilDuration:.45,centerLift:.85,rimLift:.45,centerRecovery:.48,rimRecovery:.42}),Ah=Ga,G1=(i,t,e)=>Math.max(t,Math.min(e,i));function V1(i,t,e,n=.6){const s=Math.hypot(t,e),r=s>1e-6?t/s:0,o=s>1e-6?e/s:-1,a=Pe.minRange+(Pe.maxRange-Pe.minRange)*G1(Number.isFinite(n)?n:.6,0,1),l=i.x*r+i.z*o,c=576-i.x*i.x-i.z*i.z,h=Math.max(0,-l+Math.sqrt(Math.max(0,l*l+c))),u=Math.min(a,h);return{x:i.x+r*u,z:i.z+o*u,range:u,valid:u>=Pe.minRange-1e-6}}function W1(){return Ah.map(i=>({...i,occupant:null,cooldown:0,loaded:!0,aimX:0,aimZ:-1,recoil:0}))}function uf(i,t){return i.catapults.filter(e=>(e.owner===t.id||!e.owner)&&(!e.occupant||e.occupant===t.id)&&Math.hypot(e.x-t.x,e.z-t.z)<=Pe.interactionRange&&ks(t,e,.1)).sort((e,n)=>Math.hypot(e.x-t.x,e.z-t.z)-Math.hypot(n.x-t.x,n.z-t.z))[0]||null}function Ds(i,t){const e=i.catapults.find(s=>s.id===t.catapultId);if(e?.occupant===t.id){e.occupant=null,t.x=e.x,t.z=e.z+2.3;const s=Math.hypot(t.x,t.z);s>24&&(t.x*=24/s,t.z*=24/s)}const n=!!t.catapultId;return t.catapultId=null,t.catapultShots=0,t.interactHeld=!1,n}function X1(i,t){if(t.catapultId)return Ds(i,t);if(t.ko||t.dizzyTime>0||t.knockUp>0||t.kick>0||t.id!=="player"&&i.phase!=="battle")return!1;const e=uf(i,t);return e?(e.occupant=t.id,t.catapultId=e.id,t.catapultShots=0,t.catapultAim=1,t.x=e.x,t.z=e.z,t.hop=0,t.height=0,t.idle=0,t.hopX=t.hopZ=0,t.impulseX=t.impulseZ=0,i.events.push({type:"catapultMount",id:t.id,catapultId:e.id}),!0):!1}function q1(i,t,e){const n=i.catapults.find(f=>f.id===t.catapultId);if(i.phase!=="battle"||t.ko||t.dizzyTime>0||t.hit>0||t.knockUp>0||!n||n.occupant!==t.id||!n.loaded||n.cooldown>0||e?.valid===!1||!Number.isFinite(e?.x)||!Number.isFinite(e?.z))return!1;let s=e.x,r=e.z;const o=Math.hypot(s,r);o>24&&(s*=24/o,r*=24/o);const a=s-n.x,l=r-n.z,c=Math.hypot(a,l);if(c<Pe.minRange-1e-6)return!1;const h=a/c,u=l/c;c>Pe.maxRange&&(s=n.x+h*Pe.maxRange,r=n.z+u*Pe.maxRange);const d={id:i.nextId++,owner:t.id,catapultId:n.id,startX:n.x+h,startZ:n.z+u,startHeight:1.6,tx:s,tz:r,age:0,duration:Pe.flightTime,arcHeight:Pe.arcHeight};return n.aimX=h,n.aimZ=u,n.loaded=!1,n.cooldown=Pe.cooldown,n.recoil=Pe.recoilDuration,t.catapultShots++,i.shells.push(d),i.events.push({type:"stoneShot",id:t.id,shellId:d.id,catapultId:n.id}),!0}function $1(i,t,e){for(const n of i.catapults)if(n.cooldown=Math.max(0,n.cooldown-t),n.recoil=Math.max(0,n.recoil-t),n.loaded=n.cooldown===0,n.occupant){const s=i.actors.find(r=>r.id===n.occupant);(!s||s.ko||s.dizzyTime>0||s.knockUp>0||s.catapultId!==n.id)&&(s&&s.catapultId===n.id?Ds(i,s):n.occupant=null)}for(const n of i.shells)if(n.age+=t,!(n.age<n.duration)&&(i.events.push({type:"stoneImpact",id:n.id,owner:n.owner,x:n.tx,z:n.tz,radius:Pe.blastRadius}),i.phase==="battle"))for(const s of i.actors){const r=s.x-n.tx,o=s.z-n.tz,a=Math.hypot(r,o);if(s.ko||a>Pe.blastRadius||!ks({x:n.tx,z:n.tz},s,0))continue;const l=n.tx-n.startX,c=n.tz-n.startZ,h=Math.hypot(l,c)||1,u=a>1e-6?{dx:r/a,dz:o/a}:{dx:l/h,dz:c/h},d=a<=Pe.innerRadius;e(i,s,{owner:n.owner,...u,damage:d?4:2,force:d?12:8,lift:d?Pe.centerLift:Pe.rimLift,liftDuration:d?Pe.centerRecovery:Pe.rimRecovery})}i.shells=i.shells.filter(n=>n.age<n.duration)}const ln=Object.freeze({radius:.1,muzzleOffset:.8,originHeight:.45,bodyHeight:.95,terrainStep:.12}),Pn=1e-9,ro=new WeakMap,Y1={ground:()=>0,solids:new Map},zn=(i,t=0)=>Number.isFinite(i)?i:t,dd=(i,t,e)=>Math.max(t,Math.min(e,i)),df=i=>ro.get(i)||Y1;function Z1(i,{ground:t}={}){return typeof t!="function"?(ro.delete(i),i):(ro.get(i)?.ground!==t&&ro.set(i,{ground:t,solids:new Map}),i)}function Fn(i,t,e){return zn(df(i).ground(t,e))}function _i(i,t,e,n={x:0,y:0,z:1}){i=zn(i),t=zn(t),e=zn(e);const s=Math.hypot(i,t,e);return s>Pn?{x:i/s,y:t/s,z:e/s}:{...n}}function jc(i,t){return{x:t.x,y:Fn(i,t.x,t.z)+Math.max(0,zn(t.height))+(t.catapultId?.45:0)+ln.originHeight,z:t.z}}function j1(i){return _i(i.aimX,i.aimY,i.aimZ)}function K1(i){return!i.aim3D&&Math.abs(zn(i.aimY))<Pn}const J1=(i,t,e)=>({x:i.x+t.x*e,y:i.y+t.y*e,z:i.z+t.z*e});function Q1(i,t,e){let n=0,s=1,r={x:0,y:0,z:0};for(const o of["x","y","z"]){const a=t[o]-i[o],l=e.min[o],c=e.max[o];if(Math.abs(a)<Pn){if(i[o]<l||i[o]>c)return null;continue}const h=(l-i[o])/a,u=(c-i[o])/a,d=Math.min(h,u),f=Math.max(h,u);if(d>n&&(n=d,r={x:0,y:0,z:0},r[o]=a>0?-1:1),s=Math.min(s,f),n>s+Pn)return null}return s<0||n>1?null:(!r.x&&!r.y&&!r.z&&(r=_i(i.x-t.x,i.y-t.y,i.z-t.z,{x:0,y:1,z:0})),{t:Math.max(0,n),normal:r})}function tM(i,t,e,n,s,r){const o=t.x-i.x,a=t.z-i.z,l=i.x-e.x,c=i.z-e.z,h=o*o+a*a,u=l*l+c*c-n*n;let d=-1/0,f=1/0,g=!1;if(h<Pn){if(u>0)return null}else{const v=l*o+c*a,y=v*v-h*u;if(y<0)return null;const M=Math.sqrt(y);d=(-v-M)/h,f=(-v+M)/h}const m=t.y-i.y;if(Math.abs(m)<Pn){if(i.y<s||i.y>r)return null}else{const v=(s-i.y)/m,y=(r-i.y)/m,M=Math.min(v,y);M>d&&(d=M,g=!0),f=Math.min(f,Math.max(v,y))}const x=Math.max(0,d);if(x>Math.min(1,f)+Pn||f<0)return null;const p=g?{x:0,y:m>0?-1:1,z:0}:_i(i.x+o*x-e.x,0,i.z+a*x-e.z,{x:0,y:1,z:0});return{t:x,normal:p}}function eM(i,t,e,n){const s=(i.x-e.x)/n.x,r=(i.y-e.y)/n.y,o=(i.z-e.z)/n.z,a=(t.x-i.x)/n.x,l=(t.y-i.y)/n.y,c=(t.z-i.z)/n.z,h=a*a+l*l+c*c,u=s*a+r*l+o*c,d=s*s+r*r+o*o-1;let f=0;if(d>0){if(h<Pn)return null;const g=u*u-h*d;if(g<0||(f=(-u-Math.sqrt(g))/h,f<0||f>1))return null}return{t:f,normal:_i((s+a*f)/n.x,(r+l*f)/n.y,(o+c*f)/n.z,{x:0,y:1,z:0})}}function nM(i,t){const e=df(i);let n=e.solids.get(t);if(n)return n;const s=ln.radius;return n={walls:ds.map(r=>{const o=Fn(i,r.x,r.z);return{id:r.id,min:{x:r.x-r.hw-s,y:o-s,z:r.z-r.hd-s},max:{x:r.x+r.hw+s,y:o+r.height+.135+s,z:r.z+r.hd+s}}}),rocks:t.map(r=>({...r,ground:Fn(i,r.x,r.z)}))},e.solids.set(t,n),n}function iM(i,t,e){const n=e.x-t.x,s=e.y-t.y,r=e.z-t.z,o=Math.hypot(n,r),a=u=>t.y+s*u-Fn(i,t.x+n*u,t.z+r*u)-ln.radius;let l=0,c=a(0);if(c<=0)return{t:0,normal:Wl(i,t.x,t.z)};if(o<Pn){if(s>=0)return null;const u=-c/s;return u<=1?{t:u,normal:Wl(i,t.x,t.z)}:null}const h=Math.max(1,Math.ceil(o/ln.terrainStep));for(let u=1;u<=h;u++){const d=u/h,f=a(d);if(f<=0){let g=l,m=d;for(let x=0;x<24;x++){const p=(g+m)/2;a(p)>0?g=p:m=p}return{t:m,normal:Wl(i,t.x+n*m,t.z+r*m)}}l=d,c=f}return null}function Wl(i,t,e){const s=(Fn(i,t+.025,e)-Fn(i,t-.025,e))/.05,r=(Fn(i,t,e+.025)-Fn(i,t,e-.025))/(2*.025);return _i(-s,1,-r)}function sM(i,t,e){if(!Number.isFinite(e))return null;const n=t.x-i.x,s=t.z-i.z,r=n*n+s*s,o=i.x*n+i.z*s,a=i.x*i.x+i.z*i.z-e*e;if(a>Pn)return{t:0,normal:_i(-i.x,0,-i.z)};if(r<Pn)return null;const l=o*o-r*a;if(l<0)return null;const c=(-o+Math.sqrt(l))/r;return c<0||c>1?null:{t:c,normal:_i(-i.x-n*c,0,-i.z-s*c)}}function ff(i,t,e,{obstacles:n=[],ignoreId:s,hitActors:r=!0,terrain:o=!0,solidFrom:a=0,arenaRadius:l=1/0}={}){a=Math.max(0,zn(a));const c=Math.hypot(e.x-t.x,e.y-t.y,e.z-t.z),h=dd(zn(a)/Math.max(c,Pn),0,1),u={x:t.x+(e.x-t.x)*h,y:t.y+(e.y-t.y)*h,z:t.z+(e.z-t.z)*h};let d=null;const f=(m,x,p={},v=0)=>{if(!m)return;const y=v+m.t*(1-v);y<-Pn||y>1+Pn||d&&y>=d.t-Pn||(d={...m,...p,t:y,kind:x,targetId:p.targetId??null,blocked:x!=="actor"})},g=nM(i,n);if(a<=c){for(const m of g.walls)f(Q1(u,e,m),"wall",{wallId:m.id},h);for(const m of g.rocks)f(eM(u,e,{x:m.x,y:m.ground+m.r*.9,z:m.z},{x:m.r+ln.radius,y:m.r*1.7+ln.radius,z:m.r+ln.radius}),"rock",{},h)}if(r)for(const m of i.actors){if(m.id===s||m.ko||m.eliminated)continue;const x=Fn(i,m.x,m.z)+Math.max(0,zn(m.height))+(m.catapultId?.45:0);f(tM(t,e,m,1+dd(zn(m.load),0,1)*.2,x-ln.radius,x+ln.bodyHeight+ln.radius),"actor",{targetId:m.id})}return o&&f(iM(i,t,e),"terrain"),f(sM(t,e,l),"boundary"),d?{...d,x:t.x+(e.x-t.x)*d.t,y:t.y+(e.y-t.y)*d.t,z:t.z+(e.z-t.z)*d.t,distance:c*d.t}:null}function rM(i,t,e,n,s={}){const r=_i(e.x,e.y,e.z),o=Math.max(0,zn(n));return ff(i,t,J1(t,r,o),s)}function go(i,t,e){const n={x:t.x+t.dx*e,y:zn(t.y,Fn(i,t.x,t.z)+ln.originHeight)+zn(t.dy)*e,z:t.z+t.dz*e};return t.followGround&&(n.y=Fn(i,n.x,n.z)+zn(t.heightOffset,ln.originHeight)),n}function Rh(i,t,e,n={}){const s={x:t.x,y:zn(t.y,Fn(i,t.x,t.z)+ln.originHeight),z:t.z},r=t.followGround&&ro.has(i)?Math.max(1,Math.ceil(e/.2)):1;let o=s;for(let a=1;a<=r;a++){const l=go(i,t,e*a/r),c=ff(i,o,l,{...n,terrain:!t.followGround});if(c)return{...c,distance:e*((a-1+c.t)/r)};o=l}return null}function pf(i,t){const e=jc(i,t),n=j1(t),s=K1(t);return s&&(e.y=Fn(i,t.x,t.z)+ln.originHeight),{...e,dx:n.x,dy:n.y,dz:n.z,followGround:s,heightOffset:e.y-Fn(i,t.x,t.z)}}const Xl="4.3.7",ca="frog-arcade-save-v1",ha="frog-arcade-settings-v1",Rt=Object.freeze({radius:25,capacity:60,dizzyHits:6,finishHits:3,dizzySeconds:4.5,tongueRange:3.2,pickupRange:3.2,tongueInterval:.22,kickRange:3.6,kickCooldown:1.1,kickDuration:.48,hopDuration:.3,landingDuration:.035,shotInterval:.14,projectileSpeed:32,projectileLifetime:.65,introSeconds:20,sabotageSeconds:10,sabotageRange:2.4,sabotageRecovery:.55,respawnSeconds:12,revealSeconds:2.5}),ms=Object.freeze([{x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6}]),Pr=Object.freeze([[0,3.5],[-13,8],[13,1],[-12,-11],[10,-14],[2,17]].map(([i,t],e)=>Object.freeze({id:`swarm-${e}`,x:i,z:t,radius:2.1}))),an=(i,t,e)=>Math.max(t,Math.min(e,i)),nn=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),bi=(i,t)=>{const e=Math.hypot(i,t);return e>1e-6?{x:i/e,z:t/e}:{x:0,z:1}},Fe=(i,t=0)=>Number.isFinite(i)?i:t;function Fi(i){let t=i.seed+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function mf(i,t,e,n=Math.PI){return{id:i,x:t,z:e,aimX:Math.sin(n),aimY:0,aimZ:Math.cos(n),aim3D:!1,aiming:!1,face:n,ammo:Rt.capacity,load:1,dizzy:0,finishHits:0,dizzyTime:0,ko:!1,eliminated:!1,respawnTime:0,hit:0,invuln:0,shot:0,tongue:0,kick:0,kickCooldown:0,kickPending:!1,impulseX:0,impulseZ:0,hop:0,hopX:0,hopZ:0,hopSpeed:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0,brain:0,decision:0,catapultId:null,catapultShots:0,catapultAim:0,interactHeld:!1,machineTimer:i==="rival-1"?8:12,machineSeeking:!1,aimWindup:0,aiShotReady:0,aiCharging:!1,aiAimX:Math.sin(n),aiAimZ:Math.cos(n),refilling:!1,raidId:null,sabotageId:null,sabotageRecovery:0,revealedTime:0}}function Ns(i,t){return i.bases?.find(e=>e.owner===t.id)||null}const xi=i=>Wn.find(t=>t.id===i?.id);function oo(i,t,e){const n=Math.max(1,Math.ceil(Math.hypot(t,e)/.35));for(let s=0;s<n;s++){let{x:r,z:o}=so(i,t/n,e/n);for(const c of ms){const h=Math.hypot(r-c.x,o-c.z),u=c.r+.78;if(h<u){const d=bi(r-c.x,o-c.z);r=c.x+d.x*u,o=c.z+d.z*u}}for(const c of Ah){if(i.catapultId===c.id)continue;const h=Math.hypot(r-c.x,o-c.z),u=Pe.baseRadius+.78;if(h<u){const d=bi(r-c.x,o-c.z);r=c.x+d.x*u,o=c.z+d.z*u}}({x:r,z:o}=so(i,r-i.x,o-i.z));const a=Math.hypot(r,o);a>Rt.radius-1&&(r*=(Rt.radius-1)/a,o*=(Rt.radius-1)/a);const l=so({x:r,z:o},0,0);i.x=l.x,i.z=l.z}}function oM(i,t,e,n,s,r){const o=e-i,a=n-t,l=i-s.x,c=t-s.z,h=o*o+a*a,u=l*l+c*c-r*r;if(u<=0)return 0;if(h<1e-12)return null;const d=2*(l*o+c*a),f=d*d-4*h*u;if(f<0)return null;const g=(-d-Math.sqrt(f))/(2*h);return g>=0&&g<=1?g:null}function fs(i,t){return ks(i,t,.1)&&ms.every(e=>oM(i.x,i.z,t.x,t.z,e,e.r+.1)===null)}function aM(i,t){return!t.ko&&!t.eliminated&&nn(i,t)<=23&&fs(i,t)&&(!Xa(t)||t.revealedTime>0||nn(i,t)<2.2)}function gf(i,t){const e=Pr[Math.floor(t.id/12)];t.swarmId=e.id;const n=Fi(i)*Math.PI*2,s=Math.sqrt(Fi(i))*e.radius;t.x=e.x+Math.sin(n)*s,t.z=e.z+Math.cos(n)*s,t.wait=0,t.phase=Fi(i)*Math.PI*2}function Kc(i=731){const t={version:2,swarmVersion:1,seed:i,time:0,status:"playing",phase:"countdown",intro:Rt.introSeconds,actors:Wn.map(e=>mf(e.owner,e.spawn.x,e.spawn.z,e.spawnHeading)),bases:Wn.map(e=>({id:e.id,owner:e.owner,x:e.x,z:e.z,destroyed:!1,progress:0,attackerId:null})),flies:[],catapults:W1(),shells:[],bullets:[],events:[],nextId:1,stats:{caught:0,shots:0,hits:0,kos:0,basesDestroyed:0}};for(let e=0;e<72;e++){const n={id:e,swarmId:"",x:0,z:0,wait:0,phase:0};gf(t,n),t.flies.push(n)}return t}function lM(i,t){const e=Math.hypot(i,t);return{x:e>.08?i/Math.max(1,e):0,z:e>.08?t/Math.max(1,e):0,fire:e>=.72}}function Jc(i,t){return i.actors.filter(e=>e!==t&&!e.ko&&nn(t,e)<=Rt.kickRange&&fs(t,e)).sort((e,n)=>nn(t,e)-nn(t,n))[0]||null}function cM(i,t){if(t.ko||t.eliminated||t.dizzyTime>0||t.catapultId||t.tongue>0||t.ammo>=Rt.capacity)return!1;const e=Ns(i,t),n=xi(e)?.stock;if(e&&!e.destroyed&&n&&nn(t,n)<=Rt.pickupRange&&fs(t,n))return t.tongue=Rt.tongueInterval,t.ammo++,i.events.push({type:"tongue",id:t.id,x:n.x,z:n.z,baseId:e.id}),t.id==="player"&&i.stats.caught++,!0;const s=i.flies.filter(r=>r.wait<=0&&nn(t,r)<=Rt.pickupRange&&fs(t,r)).sort((r,o)=>nn(t,r)-nn(t,o))[0];return s?(t.tongue=Rt.tongueInterval,t.ammo++,s.wait=7+Fi(i)*4,i.events.push({type:"tongue",id:t.id,x:s.x,z:s.z,swarmId:s.swarmId}),t.id==="player"&&i.stats.caught++,!0):!1}function hM(i,t,e,n,s={}){return rM(i,t,e,n,{...s,obstacles:ms})}function xf(i,t,e=Rt.projectileSpeed*Rt.projectileLifetime+ln.muzzleOffset){const n=pf(i,t),s=Math.max(0,Fe(e)),r=Rh(i,n,s,{obstacles:ms,ignoreId:t.id,hitActors:i.phase==="battle",arenaRadius:Rt.radius-.2}),o=r||go(i,n,s),a=r?.distance??s;return{x:o.x,y:o.y,z:o.z,distance:a,targetId:r?.targetId??null,blocked:r?.blocked??!1,kind:r?.kind??null,normal:r?.normal??null,origin:{x:n.x,y:n.y,z:n.z},muzzle:go(i,n,Math.min(ln.muzzleOffset,a)),direction:{x:n.dx,y:n.dy,z:n.dz}}}function vf(i,t,e){if(Object.assign(t,{x:e.x,y:e.y,z:e.z,life:0}),e.kind==="actor"){const n=i.actors.find(s=>s.id===e.targetId);n&&Ch(i,n,t)}i.events.push({type:"splat",x:t.x,y:t.y,z:t.z,wall:e.kind==="wall"||e.kind==="rock",kind:e.kind,normal:e.normal,dx:t.dx,dy:t.dy,dz:t.dz})}function uM(i,t){if(t.ko||t.eliminated||t.dizzyTime>0||t.hit>0||t.catapultId||t.knockUp>0||t.shot>0||t.ammo<=0||t.id!=="player"&&i.phase!=="battle")return!1;t.shot=Rt.shotInterval,t.ammo--,t.revealedTime=Rt.revealSeconds;const e=pf(i,t),n={id:i.nextId++,owner:t.id,...e,life:Rt.projectileLifetime},s=Rh(i,n,ln.muzzleOffset,{obstacles:ms,ignoreId:t.id,hitActors:i.phase==="battle",arenaRadius:Rt.radius-.2});return s?vf(i,n,s):(Object.assign(n,go(i,n,ln.muzzleOffset)),i.bullets.push(n)),i.events.push({type:"shot",id:t.id}),t.id==="player"&&i.stats.shots++,!0}function xo(i,t,e="interrupted"){for(const n of i.bases||[])n.attackerId!==t.id||n.destroyed||(n.progress>0&&i.events.push({type:"sabotageInterrupted",baseId:n.id,id:n.owner,by:t.id,reason:e}),n.progress=0,n.attackerId=null);t.sabotageId=null}function dM(i,t,e){xo(i,t,"knockout"),Ds(i,t),t.ko=!0,t.dizzyTime=0,t.hop=0,t.knockUp=0,t.knockUpStart=0,t.height=.9,t.impulseX=e.dx*17,t.impulseZ=e.dz*17,t.ammo=0,t.aiCharging=!1,t.respawnTime=Ns(i,t)?.destroyed?0:Rt.respawnSeconds,i.events.push({type:"ko",id:t.id,by:e.owner,x:t.x,z:t.z,dx:e.dx,dz:e.dz}),e.owner==="player"&&t.id!=="player"&&i.stats.kos++}function Ch(i,t,e){if(t.ko||t.eliminated||t.invuln>0)return!1;const n=Math.max(0,t.height),s=bi(Fe(e.dx),Fe(e.dz)),r=an(Fe(e.force,5),0,30);let o=an(Math.floor(Fe(e.damage,1)),1,9);if(xo(i,t,"hit"),t.sabotageRecovery=Rt.sabotageRecovery,t.aiCharging=!1,t.aimWindup=0,t.aiShotReady=Math.max(t.aiShotReady,.4),t.hit=.23,t.invuln=.12,t.impulseX=s.x*r,t.impulseZ=s.z*r,t.revealedTime=Rt.revealSeconds,t.dizzyTime<=0){const a=Math.min(o,Rt.dizzyHits-t.dizzy);t.dizzy+=a,o-=a,t.dizzy>=Rt.dizzyHits&&(t.dizzy=Rt.dizzyHits,t.dizzyTime=Rt.dizzySeconds,t.finishHits=0,t.hop=0,t.knockUp<=0&&(t.height=0),Ds(i,t),i.events.push({type:"dizzy",id:t.id}))}return t.dizzyTime>0&&o>0&&(t.finishHits=Math.min(Rt.finishHits,t.finishHits+o)),Fe(e.lift)>0&&(Ds(i,t),t.knockUpDuration=an(Fe(e.liftDuration,.48),.25,.65),t.knockUp=t.knockUpDuration,t.knockUpPeak=an(e.lift,.1,1.2),t.knockUpStart=n,t.height=n,t.hop=0,t.hopX=t.hopZ=0,t.hopSpeed=0,t.kick=0,t.kickPending=!1),i.events.push({type:"hit",id:t.id,owner:e.owner,x:t.x,z:t.z,...Number.isFinite(e.y)?{y:e.y}:{},dx:s.x,dz:s.z}),e.owner==="player"&&t.id!=="player"&&i.stats.hits++,t.finishHits>=Rt.finishHits&&dM(i,t,{...e,dx:s.x,dz:s.z}),!0}function fM(i,t){if(i.phase!=="battle"||t.ko||t.eliminated||t.dizzyTime>0||t.hit>0||t.catapultId||t.knockUp>0||t.kick>0||t.kickCooldown>0)return!1;const e=Jc(i,t);if(!e)return!1;const n=bi(e.x-t.x,e.z-t.z);return t.aimX=n.x,t.aimY=0,t.aimZ=n.z,t.aim3D=!1,t.kick=Rt.kickDuration,t.kickCooldown=Rt.kickCooldown,t.kickPending=!0,t.kickId=e.id,t.revealedTime=Rt.revealSeconds,i.events.push({type:"kick",id:t.id}),!0}function pM(i,t){t.kickPending=!1;const e=i.actors.find(s=>s.id===t.kickId);if(!e||e.ko||nn(t,e)>Rt.kickRange+.25||!fs(t,e))return;const n=bi(e.x-t.x,e.z-t.z);Ch(i,e,{owner:t.id,dx:n.x,dz:n.z,damage:1,force:14}),e.ko||(e.impulseX=n.x*14,e.impulseZ=n.z*14)}function qa(i,t){return t.ko||t.eliminated||t.catapultId?null:(i.bases||[]).filter(e=>!e.destroyed&&e.owner!==t.id&&nn(t,xi(e).stock)<=Rt.sabotageRange&&fs(t,xi(e).stock)).sort((e,n)=>nn(t,xi(e).stock)-nn(t,xi(n).stock))[0]||null}function mM(i,t,e){t.destroyed=!0,t.progress=Rt.sabotageSeconds,t.attackerId=null,e.sabotageId=null;const n=i.actors.find(s=>s.id===t.owner);n&&(xo(i,n,"eliminated"),Ds(i,n),n.eliminated=!0,n.ko=!0,n.respawnTime=0,n.ammo=0,n.dizzyTime=0,n.hop=0,n.height=0,n.knockUp=0),e.id==="player"&&i.stats.basesDestroyed++,i.events.push({type:"baseDestroyed",baseId:t.id,id:t.owner,by:e.id,x:t.x,z:t.z})}function gM(i,t,e){for(const n of i.bases){if(n.destroyed)continue;const s=i.actors.filter(l=>t.get(l.id)===n.id&&!l.ko&&!l.eliminated&&l.dizzyTime<=0&&l.hit<=0&&l.sabotageRecovery<=0&&l.knockUp<=0&&l.kick<=0&&l.shot<=0&&l.hop<=0&&qa(i,l)?.id===n.id),r=s.find(l=>l.id===n.attackerId)||s.sort((l,c)=>l.id.localeCompare(c.id))[0];if(!r){if(n.attackerId){const l=i.actors.find(c=>c.id===n.attackerId);l&&xo(i,l,"released")}continue}if(n.attackerId!==r.id){if(n.attackerId){const l=i.actors.find(c=>c.id===n.attackerId);l&&xo(i,l,"interrupted")}n.progress=0,n.attackerId=r.id,r.sabotageId=n.id,i.events.push({type:"sabotageStart",baseId:n.id,id:n.owner,by:r.id})}const o=xi(n).stock,a=bi(o.x-r.x,o.z-r.z);r.sabotageId=n.id,r.aiming=!1,r.face=Math.atan2(a.x,a.z),r.aimX=a.x,r.aimY=0,r.aimZ=a.z,r.aim3D=!1,r.revealedTime=Rt.revealSeconds,n.progress=Math.min(Rt.sabotageSeconds,n.progress+e),n.progress>=Rt.sabotageSeconds-1e-8&&mM(i,n,r)}}function ua(i,t,e={}){const n=hf(i,t);return{mx:n.x,mz:n.z,aiming:!1,...e}}function fr(i){i.aiCharging=!1,i.aimWindup=0}function ql(i,t,e){const n=nn(t,e),s=bi(e.x-t.x,e.z-t.z);t.brain-=1/60,t.brain<=0&&(t.brain=.7+Fi(i)*.5,t.decision=Fi(i)>.5?1:-1);let r=!1;if(n<16&&t.ammo>0&&fs(t,e))if(!t.aiCharging&&t.aiShotReady<=0){const l=(Fi(i)-.5)*.08,c=Math.cos(l),h=Math.sin(l);t.aiAimX=s.x*c-s.z*h,t.aiAimZ=s.x*h+s.z*c,t.aimWindup=.32,t.aiCharging=!0}else t.aiCharging&&t.aimWindup<=0&&(r=!0,t.aiCharging=!1,t.aiShotReady=.22+Fi(i)*.1);else fr(t);let o=0,a=0;if(n>11){const l=hf(t,e);o=l.x,a=l.z}else{const l=n<6?-1:0;o=s.x*l+s.z*t.decision*.45,a=s.z*l-s.x*t.decision*.45}return{mx:o,mz:a,aiming:!0,ax:t.aiCharging||r?t.aiAimX:s.x,az:t.aiCharging||r?t.aiAimZ:s.z,fire:r,kick:n<3.3}}function xM(i,t){if(i.phase!=="battle"||t.ko||t.eliminated)return{};if(t.hit>0){fr(t);const h=bi(t.impulseX,t.impulseZ);return{mx:h.x,mz:h.z,aiming:!1}}const e=Ns(i,t),n=xi(e),s=i.actors.filter(h=>h!==t&&aM(t,h)).sort((h,u)=>nn(t,h)-nn(t,u)),r=s[0],o=r?nn(t,r):1/0;if(t.catapultId){if(!r||o<7||t.catapultShots>=2)return t.machineTimer=18,t.machineSeeking=!1,{interactCatapult:!0};const h=i.catapults.find(d=>d.id===t.catapultId),u=bi(r.x-t.x,r.z-t.z);return{aiming:!0,ax:u.x,az:u.z,throwStone:h?.loaded&&t.catapultAim<=0?{x:r.x,z:r.z}:void 0}}if(t.ammo<6&&(t.refilling=!0),t.ammo>=48&&(t.refilling=!1),t.refilling&&e&&!e.destroyed)return fr(t),nn(t,n.stock)<=Rt.pickupRange-.35&&fs(t,n.stock)?r&&o<5&&t.ammo>0?ql(i,t,r):{}:ua(t,n.stock);if(e?.attackerId&&e.attackerId!==t.id){const h=s.find(u=>u.id===e.attackerId);return h?ql(i,t,h):(fr(t),ua(t,n.stock))}if(!i.bases.find(h=>h.id===t.raidId&&!h.destroyed&&h.owner!==t.id)){const h=i.bases.filter(d=>!d.destroyed&&d.owner!==t.id),u=t.id==="rival-1"?"rival-2":"player";t.raidId=(h.find(d=>d.owner===u)||h[0])?.id||null}const l=i.bases.find(h=>h.id===t.raidId),c=xi(l)?.stock;if(l&&nn(t,c)<=Rt.sabotageRange-.2&&(t.sabotageId===l.id||!r||o>6.5))return fr(t),t.machineSeeking=!1,{sabotage:!0,aiming:!1};if(r&&o<16){const h=i.catapults.find(u=>u.owner===t.id&&!u.occupant);if(t.machineTimer<=0&&!t.machineSeeking&&(t.machineSeeking=!!h&&o>11&&Fi(i)<.35,t.machineTimer=8),t.machineSeeking&&h)if(o<7)t.machineSeeking=!1,t.machineTimer=12;else return ua(t,{x:h.x,z:h.z+2.2},{interactCatapult:nn(t,h)<=Pe.interactionRange&&ks(t,h)});return ql(i,t,r)}return fr(t),c?ua(t,c):{}}function vM(i,t){const e=Ns(i,t),n=xi(e);if(!e||e.destroyed||!n)return;const s=mf(t.id,n.spawn.x,n.spawn.z,n.spawnHeading);Object.assign(t,s,{invuln:1}),i.events.push({type:"respawn",id:t.id,x:t.x,z:t.z})}function yf(i){const t=i.bases.find(n=>n.owner==="player"),e=i.bases.filter(n=>!n.destroyed);t?.destroyed?i.status="lost":e.length===1&&e[0].owner==="player"&&(i.status="won")}function fd(i,t={},e=1/60){if(i.status!=="playing"||(i.events.length=0,e=an(Fe(e),0,.05),e===0))return;i.time+=e,i.phase==="countdown"&&(i.intro=Math.max(0,i.intro-e),i.intro<1e-8&&(i.intro=0,i.phase="battle",i.events.push({type:"battle"})));for(const s of i.flies)s.wait>0&&(s.wait-=e,s.wait<=0&&gf(i,s));const n=new Map;for(const s of i.actors){for(const u of["shot","tongue","invuln","hit","idle","kickCooldown","aimWindup","aiShotReady","catapultAim","sabotageRecovery","revealedTime"])s[u]=Math.max(0,s[u]-e);if(i.phase==="battle"&&(s.machineTimer=Math.max(0,s.machineTimer-e)),s.ko){Ds(i,s),oo(s,s.impulseX*e,s.impulseZ*e),s.impulseX*=Math.exp(-e*3),s.impulseZ*=Math.exp(-e*3),s.height=Math.max(0,s.height-e*1.6),!s.eliminated&&!Ns(i,s)?.destroyed&&(s.respawnTime=Math.max(0,s.respawnTime-e),s.respawnTime<1e-8&&vM(i,s));continue}s.kick>0&&(s.kick=Math.max(0,s.kick-e),s.kickPending&&s.kick<.3&&pM(i,s)),s.dizzyTime>0&&(s.dizzyTime=Math.max(0,s.dizzyTime-e),s.dizzyTime===0&&(s.dizzy=0,s.finishHits=0,s.invuln=.55,i.events.push({type:"recover",id:s.id})));const r=s.id==="player"?t:xM(i,s);r.interactCatapult&&!s.interactHeld&&X1(i,s),s.interactHeld=!!r.interactCatapult;const o=s.catapultId?0:Fe(r.mx),a=s.catapultId?0:Fe(r.mz),l=Math.hypot(o,a),c=l>.08&&s.knockUp<=0,h=Number.isFinite(r.ax)&&Number.isFinite(r.az)&&Math.hypot(r.ax,Fe(r.ay),r.az)>.05;if(s.aiming=r.aiming===void 0?h:r.aiming===!0,s.aiming&&h){const u=_i(r.ax,Fe(r.ay),r.az);s.aimX=u.x,s.aimY=u.y,s.aimZ=u.z,s.aim3D=Number.isFinite(r.ay)}if(c&&(s.face=Math.atan2(o,a),!s.aiming&&s.kick<=0)){const u=bi(o,a);s.aimX=u.x,s.aimY=0,s.aimZ=u.z,s.aim3D=!1}if(i.phase==="battle"&&r.sabotage&&!c&&!r.fire&&!r.kick&&!r.throwStone){const u=qa(i,s);u&&n.set(s.id,u.id)}if(s.dizzyTime<=0){if(cM(i,s),r.fire&&uM(i,s),r.kick&&fM(i,s),r.throwStone&&q1(i,s,r.throwStone),s.catapultId){const u=i.catapults.find(d=>d.id===s.catapultId);u&&(u.aimX=s.aimX,u.aimZ=s.aimZ,s.x=u.x,s.z=u.z,s.impulseX=s.impulseZ=0)}if(s.knockUp<=0&&s.hop<=0&&s.idle<=0&&c&&(s.hop=Rt.hopDuration,s.hopSpeed=an(l,0,1)),s.knockUp<=0&&s.hop>0){s.hop=Math.max(0,s.hop-e);const u=(s.id==="player"?8.8:6.2)*U1(s),d=c?u/Math.max(1,l):0;s.hopX=o*d,s.hopZ=a*d,oo(s,s.hopX*e,s.hopZ*e),s.height=Math.sin((1-s.hop/Rt.hopDuration)*Math.PI)*(.35+.32*s.hopSpeed),s.hop===0&&(s.height=0,s.hopX=0,s.hopZ=0,s.idle=Rt.landingDuration,i.events.push({type:"land",id:s.id,x:s.x,z:s.z}))}}if(oo(s,s.impulseX*e,s.impulseZ*e),s.impulseX*=Math.exp(-e*10),s.impulseZ*=Math.exp(-e*10),s.knockUp>0){s.knockUp=Math.max(0,s.knockUp-e);const u=1-s.knockUp/s.knockUpDuration;s.height=s.knockUpStart*(1-u)+Math.sin(u*Math.PI)*s.knockUpPeak,s.knockUp===0&&(s.height=0,s.knockUpStart=0,s.idle=Rt.landingDuration,i.events.push({type:"land",id:s.id,x:s.x,z:s.z,stone:!0,strength:s.knockUpPeak}))}s.load+=(s.ammo/Rt.capacity-s.load)*(1-Math.exp(-e*12))}for(const s of i.bullets){const r=Math.min(e,Math.max(0,s.life));if(s.life-=e,r<=0)continue;const o=Rt.projectileSpeed*r,a=Rh(i,s,o,{obstacles:ms,ignoreId:s.owner,hitActors:i.phase==="battle",arenaRadius:Rt.radius-.2});a?vf(i,s,a):Object.assign(s,go(i,s,o))}i.bullets=i.bullets.filter(s=>s.life>0),$1(i,e,Ch),gM(i,n,e),yf(i)}function yM(i){return JSON.stringify({...i,events:[],bullets:[],shells:[]})}function MM(i){try{const t=JSON.parse(i);if(![1,2].includes(t?.version)||!Array.isArray(t.actors)||t.actors.length!==3||!Array.isArray(t.flies)||t.flies.length!==72||!["playing","won","lost"].includes(t.status))return null;const e=t.version===1,n=Kc(Fe(t.seed,731));if(n.time=an(Fe(t.time),0,1e7),n.nextId=an(Math.floor(Fe(t.nextId,1)),1,1e9),n.intro=e?Rt.introSeconds:an(Fe(t.intro,Rt.introSeconds),0,Rt.introSeconds),n.phase=!e&&(t.phase==="battle"||n.intro===0)?"battle":"countdown",!e){if(!Array.isArray(t.bases)||t.bases.length!==Wn.length)return null;for(const s of n.bases){const r=t.bases.find(o=>o?.id===s.id&&o?.owner===s.owner);if(!r)return null;s.destroyed=r.destroyed===!0,s.progress=s.destroyed?Rt.sabotageSeconds:0}}for(let s=0;s<3;s++){const r=t.actors[s],o=n.actors[s];if(r?.id!==o.id||!Number.isFinite(r.x)||!Number.isFinite(r.z))return null;for(const u of Object.keys(o))typeof o[u]=="number"&&(o[u]=an(Fe(r[u],o[u]),-1e4,1e4));const a=Ns(n,o),l=a.destroyed,c=l||r.ko===!0;Object.assign(o,{ko:c,eliminated:l,respawnTime:c&&!l?an(Fe(r.respawnTime,Rt.respawnSeconds)||Rt.respawnSeconds,.01,Rt.respawnSeconds):0,aiming:!1,catapultId:null,interactHeld:!1,machineSeeking:!1,aiCharging:!1,aimWindup:0,refilling:r.refilling===!0||Fe(r.ammo)<6,raidId:null,sabotageId:null,sabotageRecovery:0,revealedTime:0,ammo:l?0:an(Math.floor(Fe(r.ammo)),0,Rt.capacity),load:an(Fe(r.load),0,1),dizzy:an(Fe(r.dizzy),0,Rt.dizzyHits),finishHits:an(Fe(r.finishHits),0,Rt.finishHits),dizzyTime:an(Fe(r.dizzyTime),0,Rt.dizzySeconds),kickPending:!1,kick:0,hop:0,hopX:0,hopZ:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0,impulseX:0,impulseZ:0});for(const u of["shot","tongue","invuln","hit","kickCooldown","aiShotReady"])o[u]=an(o[u],0,2);o.machineTimer=an(o.machineTimer,0,30),o.face=Fe(o.face,Math.PI),o.aim3D=r.aim3D===!0||Math.abs(Fe(r.aimY))>1e-9;const h=_i(o.aimX,o.aim3D?o.aimY:0,o.aimZ,{x:Math.sin(o.face),y:0,z:Math.cos(o.face)});if(o.aimX=h.x,o.aimY=h.y,o.aimZ=h.z,e){const u=xi(a);Object.assign(o,{x:u.spawn.x,z:u.spawn.z,face:u.spawnHeading,aimX:Math.sin(u.spawnHeading),aimY:0,aimZ:Math.cos(u.spawnHeading),aim3D:!1})}oo(o,0,0)}for(let s=0;s<72;s++){const r=t.flies[s],o=Pr[Math.floor(s/12)];r&&(t.swarmVersion===1&&r.swarmId===o.id&&Number.isFinite(r.x)&&Number.isFinite(r.z)&&nn(r,o)<=o.radius+.001&&Object.assign(n.flies[s],{x:r.x,z:r.z,phase:Fe(r.phase)}),n.flies[s].wait=an(Fe(r.wait),0,12))}if(Array.isArray(t.catapults))for(const s of n.catapults){const r=t.catapults.find(a=>a.id===s.id);r&&(s.cooldown=an(Fe(r.cooldown),0,Pe.cooldown),s.loaded=s.cooldown===0);const o=!e&&t.actors.find(a=>a.catapultId===s.id);if(o){const a=n.actors.find(l=>l.id===o.id);a.x=s.x,a.z=s.z+2.3,oo(a,0,0)}}for(const s of Object.keys(n.stats))n.stats[s]=Math.max(0,Math.floor(Fe(t.stats?.[s])));return yf(n),n}catch{return null}}const di=Object.freeze({sensitivity:.0025,minPitch:-.65,maxPitch:1.15,yaw:Math.PI,pitch:.12}),pd=(i,t,e)=>Math.max(t,Math.min(e,i)),$l=i=>Math.atan2(Math.sin(i),Math.cos(i)),hr=(i,t=0)=>Number.isFinite(i)?i:t;function md(i,t=0,e=0,{sensitivity:n=di.sensitivity,invertY:s=!1}={}){const r=$l(hr(i?.yaw,di.yaw)),o=pd(hr(i?.pitch,di.pitch),di.minPitch,di.maxPitch),a=Number.isFinite(n)&&n>0?n:di.sensitivity,l=$l(hr(hr(t)*a)),c=hr(hr(e)*a)*(s===!0?-1:1);return{yaw:$l(r-l),pitch:pd(o+c,di.minPitch,di.maxPitch)}}function _M(i){const t=i.aiming||i.shot>.02||i.kick>0,e=Math.hypot(i.aimX,i.aimZ);if((t||!Number.isFinite(i.face))&&Number.isFinite(e)&&e>1e-6)return{x:i.aimX/e,z:i.aimZ/e};const n=Number.isFinite(i.face)?i.face:Math.PI;return{x:Math.sin(n),z:Math.cos(n)}}const is=Object.freeze({...di,sensitivity:.005}),Sr=Object.freeze({min:.7,max:1.5,default:1});function Mf(i,t,e=1.6,n="chase3d",s=is){const r=Number.isFinite(e)&&e>0?e:1.6,o=Number.isFinite(s?.zoom)?Math.max(Sr.min,Math.min(Sr.max,s.zoom)):Sr.default;if(n==="overview"){const m=Math.max(.86,Math.min(1.6,Math.sqrt(1.2/r)));return{look:[i.x,t+1.2,i.z],position:[i.x,t+1.2+(26*m-1.2)/o,i.z+19*m/o]}}const a=Number.isFinite(s?.yaw)?s.yaw:is.yaw,l=Math.max(is.minPitch,Math.min(is.maxPitch,Number.isFinite(s?.pitch)?s.pitch:is.pitch)),c={x:Math.sin(a),z:Math.cos(a)},u=12.6*Math.max(1,Math.min(1.42,.72/r))/o,d=u*Math.cos(l),f=i.x+c.x*.9,g=i.z+c.z*.9;return{look:[f,t+1.2,g],position:[f-c.x*d,t+1.2+u*Math.sin(l),g-c.z*d]}}function bM(i,t,{clearance:e=.35,step:n=.15}={}){const s=[...i.look],r=[...i.position],o=r.map((v,y)=>v-s[y]),a=Math.hypot(...o);if(typeof t!="function"||a<1e-8)return{...i,look:s,position:r};const l=o.map(v=>v/a),c=Number.isFinite(e)&&e>=0?e:.35,h=Number.isFinite(n)&&n>0?Math.max(.03,n):.15,u=(v,y)=>{const M=t(v,y);return Number.isFinite(M)?M:-1/0},d=v=>s.map((y,M)=>y+l[M]*v),f=Math.min(a,.12),g=Math.max(1,Math.ceil(f/.03));let m=0;for(let v=0;v<=g;v++){const y=d(f*v/g);m=Math.max(m,u(y[0],y[2])+c-y[1])}m>0&&(s[1]+=m+.001,r[1]+=m+.001);const x=Math.max(1,Math.min(512,Math.ceil((a-f)/h)));let p=f;for(let v=1;v<=x;v++){const y=f+(a-f)*v/x,M=d(y);if(M[1]>=u(M[0],M[2])+c){p=y;continue}let R=y;for(let E=0;E<18;E++){const w=(p+R)/2,A=d(w);A[1]>=u(A[0],A[2])+c?p=w:R=w}return{...i,look:s,position:d(p)}}return{...i,look:s,position:r}}function da(i,t,e,n){const s=n.x-e.x,r=n.z-e.z,o=Math.hypot(s,r),a=o>1e-6?s/o:0,l=o>1e-6?r/o:-1,c=Number.isFinite(i)?i:0,h=Number.isFinite(t)?t:0;return{x:-l*c-a*h,z:a*c-l*h}}const Yl=["#d2ff70","#ff765d","#d7a0ff"],SM=new Map(Pr.map((i,t)=>[i.id,t])),gd=new WeakMap;function _f(i){let t=gd.get(i);t||(t=Pr.map(e=>({swarm:e,available:0,next:1/0})),gd.set(i,t));for(const e of t)e.available=0,e.next=1/0;for(const e of i.flies){const n=t[SM.get(e.swarmId)];n&&(e.wait<=0?n.available++:n.next=Math.min(n.next,e.wait))}return t}function bf(i,t,e,n,s){i.fillStyle=s?"#dceee6":"#718781",i.beginPath(),i.ellipse(t-n*.5,e-n*.28,n*.6,n*.32,-.5,0,Math.PI*2),i.ellipse(t+n*.5,e-n*.28,n*.6,n*.32,.5,0,Math.PI*2),i.fill(),i.fillStyle=s?"#384c4c":"#536763",i.strokeStyle=s?"#b6d1c3":"#8ca09a",i.lineWidth=1.4,i.beginPath(),i.ellipse(t,e+n*.12,n*.34,n*.56,0,0,Math.PI*2),i.fill(),i.stroke()}function wM(i,t){if(!t)return;const e=t.getContext("2d");if(!e)return;const n=t.width,s=n/2,r=n*.43,o=r/Rt.radius;e.clearRect(0,0,n,n),e.save(),e.translate(s,s),e.fillStyle="#153e3af2",e.strokeStyle="#9bd1be",e.lineWidth=4,e.beginPath(),e.arc(0,0,r,0,Math.PI*2),e.fill(),e.stroke(),e.clip();const a=i.focus.x-i.camera.position.x,l=i.focus.z-i.camera.position.z,c=Math.hypot(a,l),h=c>1e-6?a/c:0,u=c>1e-6?l/c:-1,d=(f,g)=>({x:(-u*f+h*g)*o,y:-(h*f+u*g)*o});e.strokeStyle="#ffffff17",e.lineWidth=1;for(let f=-20;f<=20;f+=10){const g=d(f,-25),m=d(f,25),x=d(-25,f),p=d(25,f);e.beginPath(),e.moveTo(g.x,g.y),e.lineTo(m.x,m.y),e.moveTo(x.x,x.y),e.lineTo(p.x,p.y),e.stroke()}for(const f of ms){const g=d(f.x,f.z);e.fillStyle="#769084",e.beginPath(),e.arc(g.x,g.y,f.r*o,0,Math.PI*2),e.fill()}for(const f of Eh){const g=d(f.x,f.z);e.fillStyle="#517d4788",e.beginPath(),e.arc(g.x,g.y,f.radius*o,0,Math.PI*2),e.fill()}for(const f of ds){const g=[d(f.x-f.hw,f.z-f.hd),d(f.x+f.hw,f.z-f.hd),d(f.x+f.hw,f.z+f.hd),d(f.x-f.hw,f.z+f.hd)];e.fillStyle="#c4b492",e.beginPath(),e.moveTo(g[0].x,g[0].y);for(const m of g.slice(1))e.lineTo(m.x,m.y);e.closePath(),e.fill()}for(const f of Ga){const g=d(f.x,f.z);e.strokeStyle="#bfd6d0",e.lineWidth=2,e.beginPath(),e.moveTo(g.x-3,g.y+3),e.lineTo(g.x,g.y-4),e.lineTo(g.x+4,g.y+3),e.moveTo(g.x,g.y-1),e.lineTo(g.x+4,g.y-6),e.stroke()}for(const[f,g]of Wn.entries()){const m=i.state.bases?.find(p=>p.id===g.id),x=d(g.stock.x,g.stock.z);if(g.owner==="player"&&m?.attackerId&&!m.destroyed){const p=.5+.5*Math.sin((i.elapsed||0)*4);e.strokeStyle="#ff9a6a",e.lineWidth=3+p,e.beginPath(),e.arc(x.x,x.y,13+p*3,0,Math.PI*2),e.stroke()}e.fillStyle=m?.destroyed?"#4f6258":m?.attackerId?"#ffce77":Yl[f],e.strokeStyle="#092b22",e.lineWidth=2,e.beginPath(),e.moveTo(x.x-7,x.y-2),e.lineTo(x.x,x.y-8),e.lineTo(x.x+7,x.y-2),e.lineTo(x.x+7,x.y+7),e.lineTo(x.x-7,x.y+7),e.closePath(),e.fill(),e.stroke(),m?.destroyed&&(e.strokeStyle="#b7c7ba",e.beginPath(),e.moveTo(x.x-5,x.y-5),e.lineTo(x.x+5,x.y+5),e.moveTo(x.x+5,x.y-5),e.lineTo(x.x-5,x.y+5),e.stroke())}for(const f of _f(i.state)){const g=d(f.swarm.x,f.swarm.z),m=f.available>0;e.strokeStyle=m?"#b8daa7":"#6a827b",e.lineWidth=m?1.8:1.2,e.beginPath(),e.arc(g.x,g.y,9,0,Math.PI*2),e.stroke(),bf(e,g.x,g.y,6,m)}i.state.actors.forEach((f,g)=>{if(f.ko||f.eliminated)return;const m=i.state.actors[0];if(g>0&&Xa(f)&&f.revealedTime<=0&&Math.hypot(f.x-m.x,f.z-m.z)>2.2)return;const x=d(f.x,f.z);if(e.fillStyle=Yl[g],e.strokeStyle="#102923",e.lineWidth=3,e.beginPath(),e.arc(x.x,x.y,g===0?9:8,0,Math.PI*2),e.fill(),e.stroke(),g===0){const p=d(f.aimX*2.7,f.aimZ*2.7);e.strokeStyle=Yl[0],e.lineWidth=4,e.beginPath(),e.moveTo(x.x,x.y),e.lineTo(x.x+p.x,x.y+p.y),e.stroke()}else e.fillStyle="#102923",e.beginPath(),e.arc(x.x-3,x.y-2,1.6,0,Math.PI*2),e.arc(x.x+3,x.y-2,1.6,0,Math.PI*2),e.fill()}),e.restore(),e.fillStyle="#f2ffe1",e.font="bold 18px sans-serif",e.textAlign="center",e.fillText("ΒΑΣΕΙΣ • ΜΥΓΕΣ • ΚΑΛΥΨΗ",s,n-5)}function EM(i,t){const e=i.state.actors[0];if(e.ko||e.ammo>=Rt.capacity)return;const n=Wn.find(v=>v.owner===e.id),s=i.state.bases?.find(v=>v.owner===e.id);if(n&&s&&!s.destroyed&&Math.hypot(e.x-n.stock.x,e.z-n.stock.z)<=Rt.pickupRange&&ks(e,n.stock))return;let r=null,o=null,a=1/0,l=1/0;for(const v of _f(i.state)){const y=Math.hypot(v.swarm.x-e.x,v.swarm.z-e.z);y<a&&(r=v,a=y),v.available>0&&y<l&&(o=v,l=y)}const h=r&&r.available===0&&a<=r.swarm.radius+Rt.pickupRange+.5?r:o;if(!h)return;const u=h.swarm,d=i.project(u.x,i.ground(u.x,u.z)+.35,u.z),f=i.touch&&i.h>i.w?240:110,g=i.touch?Math.min(165,i.h*.3):65;if(!d.visible||d.x<72||d.x>i.w-72||d.y<f||d.y>i.h-g)return;t.save(),t.font="700 12px sans-serif",t.textAlign="left",t.lineJoin="round";const m=h.available>0?`Μύγες · ${h.available}`:`Ξανά σε ${Math.max(1,Math.ceil(h.next))}″`,x=t.measureText(m).width+22,p=d.x-x/2;bf(t,p+7,d.y+8,6,h.available>0),t.strokeStyle="#18352de6",t.lineWidth=3,t.strokeText(m,p+20,d.y+12),t.fillStyle=h.available>0?"#e8f4d5":"#c1d0c9",t.fillText(m,p+20,d.y+12),t.restore()}function TM(i,t,e){return xf(i,t,e)}const AM=new L(0,1,0),RM=Math.PI*2,Zl=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),fa=(i,t,e)=>i+(t-i)*e,pa=["#b8e76c","#ef886a","#be94e0"],CM=.45;class PM{constructor(t){this.game=t,this.scene=t.scene,this.clock=0,this.machines=new Map,this.platforms=new Map,this.shellMeshes=new Map,this.dummy=new qe,this._vector=new L,this._direction=new L,this.geometry={box:new Gi(1,1,1),cylinder:new Us(.5,.5,1,8),rock:new Fa(.4,0),leaf:new jn(1,10,5),cup:new jn(.38,10,6,0,RM,Math.PI/2,Math.PI/2),ring:new as(.94,1,48),disc:new Na(1,32),rope:new Mh(.14,.027,5,10)},this.material={wood:new gn({color:"#a47746"}),lightWood:new gn({color:"#d4ac64"}),darkWood:new gn({color:"#67503c"}),rope:new gn({color:"#d3c593"}),leaf:new gn({color:"#5c9b67"}),stone:new gn({color:"#90999b",emissive:"#172023",emissiveIntensity:.16}),preview:new Zd({color:"#e6f7a1",dashSize:.45,gapSize:.25,transparent:!0,opacity:.85,depthWrite:!1}),landing:new xn({color:"#d6ed8b",transparent:!0,opacity:.72,side:Ce,depthWrite:!1})},this.material.ramp=new gn({color:"#b18b59",side:Ce});for(const[s,r]of Ah.entries()){const o=this.createPlatform(r);o&&this.platforms.set(r.id,o),this.machines.set(r.id,this.createMachine(r,s))}const e=new Float32Array(99),n=new Se;n.setAttribute("position",new un(e,3)),this.previewLine=new po(n,this.material.preview),this.previewLine.name="catapult-trajectory-preview",this.previewLine.frustumCulled=!1,this.previewLine.visible=!1,this.scene.add(this.previewLine),this.landingMarker=new Jt(this.geometry.ring,this.material.landing),this.landingMarker.name="catapult-landing-preview",this.landingMarker.rotation.x=-Math.PI/2,this.landingMarker.scale.setScalar(Pe.blastRadius),this.landingMarker.visible=!1,this.scene.add(this.landingMarker)}ground(t,e){return this.game.ground(t,e)}mesh(t,e,n,s=[0,0,0],r=[1,1,1]){const o=new Jt(e,n);return o.position.fromArray(s),o.scale.fromArray(r),t.add(o),o}createPlatform(t){const e=this.game.houseFloors?.find(d=>d.id===t.enclosureId);if(!e)return null;const n=new te;n.name=`${t.id}-level-platform`,n.position.set(e.x,e.height,e.z),this.scene.add(n);const s=this.mesh(n,this.geometry.box,this.material.darkWood,[0,-.1,0],[e.halfWidth*2,.2,e.halfDepth*2]);s.name="catapult-floor-at-operator-height";const r=[],o=[];for(let d=-e.halfDepth+.2;d<e.halfDepth;d+=.4){const f=this.geometry.box.clone();f.scale(e.halfWidth*2-.06,.025,.355),f.translate(0,-.012,Math.min(d,e.halfDepth-.2)),r.push(f)}for(const d of[-e.halfWidth+.18,e.halfWidth-.18])for(const f of[-e.halfDepth+.18,e.halfDepth-.18]){const g=this.game.world?.getSurface(e.x+d,e.z+f).height??e.minimum,m=Math.max(.2,e.height-g),x=this.geometry.box.clone();x.scale(.3,m,.3),x.translate(d,-m*.5,f),o.push(x)}for(const[d,f]of[[r,this.material.lightWood],[o,this.material.darkWood]]){const g=ki(d);for(const x of d)x.dispose();const m=this.mesh(n,g,f);m.userData.ownedGeometry=!0}const a=e.ramp,l=[],c=[];for(let d=0;d<=a.rows;d++)for(let f=0;f<=a.cols;f++){const g=d/a.rows*a.length,m=(f/a.cols*2-1)*a.halfWidth;l.push(a.x+a.dx*g+a.rightX*m-e.x,a.heights[d*(a.cols+1)+f]-e.height,a.z+a.dz*g+a.rightZ*m-e.z)}for(let d=0;d<a.rows;d++)for(let f=0;f<a.cols;f++){const g=d*(a.cols+1)+f,m=g+1,x=g+a.cols+1,p=x+1;c.push(g,x,m,m,x,p)}const h=new Se;h.setAttribute("position",new Vt(l,3)),h.setIndex(c),h.computeVertexNormals();const u=this.mesh(n,h,this.material.ramp);return u.name=`${t.id}-walkable-entrance-ramp`,u.userData.ownedGeometry=!0,{group:n,deck:s,ramp:u,floor:e}}createMachine(t,e){const n=new te;n.name=t.id,n.position.set(t.x,this.ground(t.x,t.z),t.z),this.scene.add(n);const s=new te;s.name="wooden-catapult-frame",n.add(s);const r={wood:[],lightWood:[],darkWood:[],rope:[]},o=(y,M,R,E,w,A,S)=>{const b=this.geometry.box.clone();b.scale(w,A,S),b.translate(M,R,E),r[y].push(b)},a=(y,M,R,E)=>{const w=new L(...M),A=new L(...R),S=A.clone().sub(w),b=this.geometry.cylinder.clone();b.scale(E,S.length(),E),b.applyQuaternion(new hs().setFromUnitVectors(AM,S.normalize())),b.translate(...w.add(A).multiplyScalar(.5).toArray()),r[y].push(b)};for(const y of[-1,1])o("wood",y*.82,.18,.6,.26,.28,2.65);for(const y of[-.55,.12,.83,1.68])o("lightWood",0,.29,y,1.98,.14,.22);o("darkWood",0,.34,-.03,1.2,.14,.93);for(const y of[-1,1])a("wood",[y*.76,.3,.1],[y*.76,.99,1],.17),a("wood",[y*.76,.3,1.83],[y*.76,.99,1],.17),a("rope",[y*.77,.48,.35],[y*.77,.58,.47],.21),a("rope",[y*.77,.48,1.61],[y*.77,.58,1.49],.21);a("darkWood",[-.94,.85,1],[.94,.85,1],.22),o("lightWood",0,.52,1.66,1.72,.17,.17);for(const[y,M]of Object.entries(r)){if(!M.length)continue;const R=ki(M);for(const w of M)w.dispose();const E=this.mesh(s,R,this.material[y]);E.userData.ownedGeometry=!0}const l=this.mesh(s,this.geometry.leaf,this.material.leaf,[0,.41,-.04],[.59,.065,.48]);l.name="operator-seat";const c=new gn({color:pa[e%pa.length]}),h=this.mesh(s,this.geometry.leaf,c,[-.98,.64,1.65],[.13,.45,.3]);h.rotation.z=-.3,h.name="side-leaf";const u=new te;u.name="throwing-arm",u.position.set(0,.85,1),s.add(u),this.mesh(u,this.geometry.box,this.material.lightWood,[0,.07,0],[.18,1.2,.2]),this.mesh(u,this.geometry.box,this.material.darkWood,[0,-.48,0],[.43,.27,.37]);const d=this.mesh(u,this.geometry.cup,this.material.darkWood,[0,.57,0],[1.1,.72,1.3]);d.name="stone-cup";const f=this.mesh(u,this.geometry.rock,this.material.stone,[0,.75,0],[.78,.7,.8]);f.name="loaded-catapult-stone",u.rotation.x=-.45;const g=new te;g.name="reload-winch",g.position.set(0,.61,.53),s.add(g);const m=this.mesh(g,this.geometry.cylinder,this.material.darkWood,[0,0,0],[.13,1.37,.13]);m.rotation.z=Math.PI/2;for(const y of[-1,1]){const M=this.mesh(g,this.geometry.box,this.material.lightWood,[y*.47,.12,0],[.13,.35,.12]);M.name="operator-handle";const R=this.mesh(s,this.geometry.rope,this.material.rope,[y*.76,.85,1],[1,1,1]);R.rotation.y=Math.PI/2}const x=[];for(let y=0;y<2;y++){const M=this.mesh(s,this.geometry.rock,this.material.stone,[1.17,.29,.72+y*.64],[.65,.6,.68]);M.rotation.set(y*.7,.6+y,0),x.push(M)}const p=new xn({color:pa[e%pa.length],transparent:!0,opacity:.25,side:Ce,depthWrite:!1}),v=this.mesh(n,this.geometry.ring,p,[0,.045,.4],[1.65,1.65,1.65]);return v.rotation.x=-Math.PI/2,v.name="catapult-station-ring",{group:n,turret:s,arm:u,winch:g,loadedRock:f,pile:x,ring:v,factionMaterial:c,ringMaterial:p,definition:t,launchAge:1/0,yaw:Math.PI}}operatorPose(t){const e=this.machines.get(typeof t=="string"?t:t?.id);if(!e)return null;const n=this.game.state.catapults?.find(s=>s.id===e.definition.id);return{x:e.definition.x,y:this.ground(e.definition.x,e.definition.z)+CM,z:e.definition.z,yaw:n?Math.atan2(n.aimX,n.aimZ):e.yaw}}consumeEvent(t){if(t.type==="stoneShot"){const e=this.machines.get(t.catapultId);e&&(e.launchAge=0,e.arm.rotation.x=0,e.loadedRock.visible=!1)}}shellPoint(t,e,n=this._vector){const s=fa(t.startX,t.tx,e),r=fa(t.startZ,t.tz,e),o=this.ground(t.startX,t.startZ)+(t.startHeight??1.6),a=this.ground(t.tx,t.tz)+.12;return n.set(s,fa(o,a,e)+4*t.arcHeight*e*(1-e),r)}createShell(t){const e=this.mesh(this.scene,this.geometry.rock,this.material.stone,void 0,[1.05,.95,1.14]);e.name=`catapult-stone-${t.id}`;const n=new xn({color:t.owner==="player"?"#e4c36e":"#f17e62",transparent:!0,opacity:.45,side:Ce,depthWrite:!1}),s=this.mesh(this.scene,this.geometry.ring,n,[t.tx,this.ground(t.tx,t.tz)+.055,t.tz],[Pe.blastRadius,Pe.blastRadius,Pe.blastRadius]);s.rotation.x=-Math.PI/2,s.name=`catapult-danger-${t.id}`;const r=this.mesh(this.scene,this.geometry.disc,n,[t.tx,this.ground(t.tx,t.tz)+.05,t.tz],[.13,.13,.13]);return r.rotation.x=-Math.PI/2,{stone:e,ring:s,core:r,material:n}}updatePreview(){const t=this.game.state,e=t.actors[0],n=this.game.catapultAim,s=t.catapults?.find(g=>g.id===e.catapultId&&g.occupant===e.id),r=n?.target,o=this.game.running&&n?.active&&s&&r&&Number.isFinite(r.x)&&Number.isFinite(r.z)&&!e.ko&&e.dizzyTime<=0;if(this.previewLine.visible=!!o,this.landingMarker.visible=!!o,!o)return;const a=r.x-s.x,l=r.z-s.z,c=Math.hypot(a,l)||1,h={startX:s.x+a/c,startZ:s.z+l/c,startHeight:1.6,tx:r.x,tz:r.z,arcHeight:Pe.arcHeight},u=this.previewLine.geometry.attributes.position;for(let g=0;g<u.count;g++){const m=this.shellPoint(h,g/(u.count-1));u.setXYZ(g,m.x,m.y,m.z)}u.needsUpdate=!0,this.previewLine.computeLineDistances(),this.landingMarker.position.set(r.x,this.ground(r.x,r.z)+.065,r.z),this.landingMarker.scale.setScalar(Pe.blastRadius);const d=s.loaded&&s.cooldown<=0,f=r.valid===!1;this.material.preview.color.set(f?"#ef826d":d?"#e6f7a1":"#b7bfaf"),this.material.landing.color.set(f?"#ef826d":d?"#d6ed8b":"#b7bfaf")}poseOperator(t,e,n){const s=this.game.state.actors.findIndex(c=>c.id===t.id),r=this.game.models?.[s];if(!r?.bones||t.ko)return;const o=r.bones,a=n.cooldown>0,l=a?Math.sin(this.clock*9)*.13:0;for(const c of[-1,1]){const h=o[`shoulder${c}`],u=o[`elbow${c}`],d=o[`wrist${c}`];h&&(h.rotation.x=-.53-l*c,h.rotation.z=c*.08),u&&(u.rotation.x=.45+l*c),d&&(d.rotation.x=-.18)}o.spine&&(o.spine.rotation.x=.08+Math.abs(l)*.12),o.head&&(o.head.rotation.x=-.04)}update(t=0){const e=this.game.running?Math.max(0,Math.min(.1,t)):0;this.clock+=e;const n=this.game.state;for(const s of n.catapults||[]){const r=this.machines.get(s.id);if(!r)continue;r.group.position.y=this.ground(s.x,s.z);const o=Math.atan2(s.aimX,s.aimZ);r.yaw=o,r.turret.rotation.y=o,Number.isFinite(r.launchAge)&&(r.launchAge+=e);const a=this.game.catapultAim;let c=s.occupant==="player"&&a?.active?-.74:-.45;if(s.cooldown>0){const u=1-Zl(s.cooldown/(Pe.cooldown||3));c=fa(.6,-.45,u*u),r.winch.rotation.x=this.clock*7}else r.winch.rotation.x=0;r.launchAge<.18&&(c=.6*Math.sin(Zl(r.launchAge/.09)*Math.PI/2)),r.arm.rotation.x+=(c-r.arm.rotation.x)*(1-Math.exp(-e*18)),r.loadedRock.visible=!!s.loaded,r.ring.material.opacity=s.occupant?.42:.2;const h=n.actors.find(u=>u.id===s.occupant);h&&this.poseOperator(h,r,s)}for(const s of n.shells||[]){let r=this.shellMeshes.get(s.id);r||(r=this.createShell(s),this.shellMeshes.set(s.id,r));const o=Zl(s.age/s.duration);this.shellPoint(s,o,r.stone.position),r.stone.rotation.set(s.age*4,s.age*3,s.age*1.5),r.material.opacity=.35+.22*o+.08*Math.sin(this.clock*13)}for(const[s,r]of this.shellMeshes)(n.shells||[]).some(o=>o.id===s)||(r.stone.removeFromParent(),r.ring.removeFromParent(),r.core.removeFromParent(),r.material.dispose(),this.shellMeshes.delete(s));this.updatePreview()}dispose(){for(const t of this.platforms.values())t.group.removeFromParent(),t.group.traverse(e=>{e.userData.ownedGeometry&&e.geometry.dispose()});for(const t of this.machines.values())t.group.removeFromParent(),t.group.traverse(e=>{e.userData.ownedGeometry&&e.geometry.dispose()}),t.factionMaterial.dispose(),t.ringMaterial.dispose();for(const t of this.shellMeshes.values())t.stone.removeFromParent(),t.ring.removeFromParent(),t.core.removeFromParent(),t.material.dispose();this.previewLine.removeFromParent(),this.previewLine.geometry.dispose(),this.landingMarker.removeFromParent();for(const t of Object.values(this.geometry))t.dispose();for(const t of Object.values(this.material))t.dispose();this.machines.clear(),this.platforms.clear(),this.shellMeshes.clear()}}const zM=Math.PI*2,IM=new L(0,1,0),jr=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),jl=i=>Number.isFinite(i?.x)&&Number.isFinite(i?.z),xd=["#c4e4de","#83bcb4","#eaf4e4"].map(i=>new ee(i)),ma=Object.freeze({mobileDrops:96,desktopDrops:144,mobileRipples:6,desktopRipples:8}),DM=`
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
`,LM=`
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
`;class UM{constructor(t){this.game=t,this.scene=t.scene,this.time=0,this.seed=7919,this.cursor=0,this.rippleCursor=0,this.capacity=t.touch?ma.mobileDrops:ma.desktopDrops,this.particles=Array.from({length:this.capacity},()=>({life:0,total:1,x:0,y:0,z:0,vx:0,vy:0,vz:0,size:.08,color:0})),this.dummy=new qe,this.direction=new L,this.dropGeometry=new jn(1,7,5),this.dropMaterial=new gn({color:"#ffffff",emissive:"#163a35",emissiveIntensity:.06,depthTest:!0,depthWrite:!0}),this.droplets=new wn(this.dropGeometry,this.dropMaterial,this.capacity),this.droplets.name="arcade-impact-droplets",this.droplets.instanceMatrix.setUsage(Ui),this.droplets.frustumCulled=!1,this.droplets.count=0;for(let n=0;n<this.capacity;n++)this.droplets.setColorAt(n,xd[0]);this.droplets.instanceColor.setUsage(Ui),this.scene.add(this.droplets);const e=t.touch?ma.mobileRipples:ma.desktopRipples;this.ripples=Array.from({length:e},(n,s)=>{const r=new Ni(2,2,8,8);r.rotateX(-Math.PI/2);const o=r.attributes.position.array.slice(),a=new Zn({vertexShader:DM,fragmentShader:LM,uniforms:Ca.merge([zt.fog,{uAge:{value:0},uOpacity:{value:.75},uWater:{value:new ee("#6aaba4")},uFoam:{value:new ee("#e8f2df")}}]),transparent:!0,depthTest:!0,depthWrite:!1,side:Ce,fog:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),l=new Jt(r,a);return l.name=`arcade-impact-ripple-${s}`,l.frustumCulled=!1,l.visible=!1,this.scene.add(l),{mesh:l,reference:o,age:0,duration:1,active:!1}})}ground(t,e){const n=this.game.ground(t,e);return Number.isFinite(n)?n:0}random(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}ripple(t,e,n,s,r=.75){const o=this.ripples[this.rippleCursor++%this.ripples.length],a=o.mesh.geometry.attributes.position;for(let l=0;l<a.count;l++){const c=t+o.reference[l*3]*n,h=e+o.reference[l*3+2]*n;a.setXYZ(l,c,this.ground(c,h)+.035,h)}a.needsUpdate=!0,o.mesh.geometry.computeVertexNormals(),o.mesh.material.uniforms.uAge.value=0,o.mesh.material.uniforms.uOpacity.value=r,o.age=0,o.duration=s,o.active=!0,o.mesh.visible=!0}emit({x:t,y:e,z:n,count:s,power:r,spread:o=.12,dx:a=0,dz:l=0,lifetime:c=.55}){const h=Math.hypot(a,l);h>0&&(a/=h,l/=h);for(let u=0;u<s;u++){const d=this.particles[this.cursor++%this.capacity],f=this.random()*zM,g=(.8+this.random()*1.7)*r;d.x=t+(this.random()-.5)*o,d.y=e+this.random()*.07,d.z=n+(this.random()-.5)*o,d.vx=Math.sin(f)*g+a*r*.65,d.vz=Math.cos(f)*g+l*r*.65,d.vy=(1.8+this.random()*2.2)*r,d.total=c*(.82+this.random()*.3),d.life=d.total,d.size=(.045+this.random()*.045)*Math.sqrt(r),d.color=u%3}this.drawDrops()}hit({x:t,z:e,dx:n=0,dz:s=0,height:r,heavy:o=!1}={}){if(!jl({x:t,z:e}))return;const a=this.ground(t,e),l=Number.isFinite(r)?Math.max(a+.04,r):a+.7;this.ripple(t,e,o?1.3:.72,o?.54:.4,o?.8:.64),this.emit({x:t,y:l,z:e,dx:n,dz:s,count:o?15:8,power:o?1.2:.72,spread:o?.22:.1,lifetime:o?.58:.43})}stone({x:t,z:e,radius:n=2.8}={}){if(!jl({x:t,z:e}))return;const s=jr(Number.isFinite(n)?n:2.8,1,4);this.ripple(t,e,s,.74,.9),this.emit({x:t,y:this.ground(t,e)+.12,z:e,count:this.game.touch?28:34,power:1.8,spread:.55,lifetime:.76})}landing({x:t,z:e,strength:n=1}={}){if(!jl({x:t,z:e}))return;const s=jr(Number.isFinite(n)?n:1,.35,1.8);this.ripple(t,e,.75+s*.42,.48,.68),this.emit({x:t,y:this.ground(t,e)+.08,z:e,count:Math.round(6+s*5),power:.6+s*.28,spread:.25,lifetime:.48})}drawDrops(){let t=0;for(const e of this.particles){if(e.life<=0)continue;const n=jr(e.life/.13),s=e.size*n;this.dummy.position.set(e.x,e.y,e.z),this.direction.set(e.vx,e.vy,e.vz),this.direction.lengthSq()>1e-6?this.dummy.quaternion.setFromUnitVectors(IM,this.direction.normalize()):this.dummy.quaternion.identity(),this.dummy.scale.set(s,s*1.55,s),this.dummy.updateMatrix(),this.droplets.setMatrixAt(t,this.dummy.matrix),this.droplets.setColorAt(t,xd[e.color]),t++}this.droplets.count=t,this.droplets.instanceMatrix.needsUpdate=!0,this.droplets.instanceColor.needsUpdate=!0}update(t=0){const e=jr(Number.isFinite(t)?t:0,0,.1);if(e!==0){this.time+=e;for(const n of this.particles){if(n.life<=0||(n.life=Math.max(0,n.life-e),n.life===0))continue;n.x+=n.vx*e,n.z+=n.vz*e,n.y+=n.vy*e-7*e*e,n.vy-=14*e;const s=Math.exp(-e*1.2);n.vx*=s,n.vz*=s;const r=this.ground(n.x,n.z)+.025;n.y<r&&(n.y=r,n.vy=0,n.vx*=.3,n.vz*=.3,n.life=Math.min(n.life,.06))}this.drawDrops();for(const n of this.ripples)n.active&&(n.age+=e,n.mesh.material.uniforms.uAge.value=jr(n.age/n.duration),n.age>=n.duration&&(n.active=!1,n.mesh.visible=!1))}}clear(){for(const t of this.particles)t.life=0;this.droplets.count=0;for(const t of this.ripples)t.active=!1,t.mesh.visible=!1,t.age=0;this.time=0}dispose(){this.clear(),this.droplets.removeFromParent(),this.dropGeometry.dispose(),this.dropMaterial.dispose();for(const t of this.ripples)t.mesh.removeFromParent(),t.mesh.geometry.dispose(),t.mesh.material.dispose()}}const ur=["#b5dc72","#ee8c72","#bd9ee3"],vd=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),yd=Math.PI*2,kM=["pelvis","spine","head","eyeL","eyeR","wrist-1","wrist1","foot-1","foot1"];class NM{constructor(t){this.game=t,this.scene=t.scene,this.clock=0,this.group=new te,this.group.name="storage-homes-and-fenced-catapult-yards",this.scene.add(this.group),this.bases=new Map,this.groves=[],this.enclosures=new Map,this.ownedGeometries=[],this.ownedMaterials=[],this.dummy=new qe,this.sightRay=new Is,this.sightTarget=new L,this.sightHit=new L,this.roofRay=new Is,this.roofHit=new L,this.roofCamera=new L,this.roofAnchor=new L,this.roofNearest=new L,this.roofTargets=Array.from({length:16},()=>new L),this.roofTargetCount=0,this.geometries={box:new Gi(1,1,1),cylinder:new Us(.5,.5,1,8),cone:new gh(1,1,5),leaf:new vh(1,1),ring:new as(.91,1,40),wing:new jn(1,6,4),sphere:new jn(1,8,6)},this.materials={wood:new gn({color:"#866244"}),lightWood:new gn({color:"#c69b62"}),darkWood:new gn({color:"#554535"}),leaf:new gn({color:"#56874d"}),fly:new gn({color:"#233e38"}),wing:new gn({color:"#d5eee1",transparent:!0,opacity:.85}),ruin:new gn({color:"#6a6855"}),dark:new xn({color:"#173b31"}),alert:new xn({color:"#f4af69"})},this.buildWalls();for(const[e,n]of Wn.entries())this.bases.set(n.id,this.buildBase(n,e));for(const[e,n]of Eh.entries())this.groves.push(this.buildGrove(n,e))}ground(t,e){return this.game.ground(t,e)}mesh(t,e,n,s=0,r=0,o=0,a=1,l=1,c=1){const h=new Jt(e,n);return h.position.set(s,r,o),h.scale.set(a,l,c),t.add(h),h}material(t){const e=new gn(t);return this.ownedMaterials.push(e),e}mergeParts(t,e,n){if(!t.length)return null;const s=ki(t);for(const o of t)o.dispose();this.ownedGeometries.push(s);const r=new Jt(s,e);return r.name=n,this.group.add(r),r}boxPart(t,e,n,s,r,o,a){const l=this.geometries.box.clone();l.scale(r,o,a),l.translate(e,n,s),t.push(l)}buildWalls(){const t=[];for(const e of Va){const n=Wn.findIndex(x=>x.owner===e.owner),s=[],r=[],o=[],a=this.material({color:"#866244",transparent:!0,opacity:1}),l=this.material({color:ur[n],transparent:!0,opacity:1});for(const x of ds){if(x.enclosureId!==e.id)continue;const p=this.ground(x.x,x.z);this.boxPart(t,x.x,p+.25,x.z,x.hw*2+.08,.5,x.hd*2+.08),this.boxPart(s,x.x,p+x.height*.5,x.z,x.hw*2,x.height,x.hd*2),this.boxPart(r,x.x,p+x.height+.055,x.z,x.hw*2+.05,.16,x.hd*2+.05);const v=x.hw>x.hd,y=v?x.hw*2:x.hd*2,M=Math.max(1,Math.floor(y/.65));for(let R=0;R<=M;R++){const E=M?R/M-.5:0;this.boxPart(s,x.x+(v?E*y:0),p+x.height*.55,x.z+(v?0:E*y),.15,x.height+.32,.15)}o.push(new Nn(new L(x.x-x.hw-.1,p,x.z-x.hd-.1),new L(x.x+x.hw+.1,p+x.height+.35,x.z+x.hd+.1)))}const c=this.mergeParts(s,a,`${e.id}-solid-walls`),h=this.mergeParts(r,l,`${e.id}-wall-tops`);this.enclosures.set(e.id,{definition:e,wallMesh:c,capMesh:h,woodMaterial:a,capMaterial:l,boxes:o,faded:!1});const u=this.ground(e.gate.x,e.gate.z),d=new te;d.name=`${e.id}-single-open-entrance`,d.position.set(e.gate.x,u,e.gate.z),this.group.add(d),(e.side==="east"||e.side==="west")&&(d.rotation.y=Math.PI/2),this.mesh(d,this.geometries.box,a,-1.6,1.25,0,.18,2.5,.25),this.mesh(d,this.geometries.box,a,1.6,1.25,0,.18,2.5,.25),this.mesh(d,this.geometries.box,l,0,2.5,0,3.38,.22,.3);const g=this.mesh(d,this.geometries.box,this.material({color:ur[n]}),0,.045,0,2.8,.07,.5);g.name="walkable-gate-threshold";const m=this.mesh(d,this.geometries.leaf,this.material({color:ur[n]}),0,2.9,0,.4,.35,.1);m.rotation.z=.25}this.mergeParts(t,this.materials.ruin,"enclosure-foundations")}updateWallVisibility(t,e,n){const s=this.game.camera;let r=0;t&&s&&(this.sightTarget.set(t.x,this.ground(t.x,t.z)+(t.height||0)+.9,t.z),this.sightRay.origin.copy(s.position),this.sightRay.direction.copy(this.sightTarget).sub(s.position),r=this.sightRay.direction.lengthSq(),this.sightRay.direction.normalize());const o=1-Math.exp(-Math.max(n,.016)*10);for(const a of this.enclosures.values()){let l=e?.id===a.definition.id;if(!l&&r>0){for(const h of a.boxes)if(this.sightRay.intersectBox(h,this.sightHit)&&this.sightHit.distanceToSquared(this.sightRay.origin)<r-.05){l=!0;break}}a.faded=l;const c=l?.2:a.woodMaterial.opacity+(1-a.woodMaterial.opacity)*o;a.woodMaterial.opacity=a.capMaterial.opacity=c,a.woodMaterial.depthWrite=a.capMaterial.depthWrite=c>.95}}prepareRoofSight(t){this.roofTargetCount=0;const e=this.game.camera;if(!t||!e)return;e.getWorldPosition(this.roofCamera);const n=this.game.models?.[0],s=vd(t.load||0);if(n?.group){n.group.updateWorldMatrix(!0,!0),this.roofAnchor.setFromMatrixPosition(n.group.matrixWorld);for(const c of kM){const h=n.bones?.[c];h&&this.roofTargets[this.roofTargetCount++].setFromMatrixPosition(h.matrixWorld)}}else this.roofAnchor.set(t.x,this.ground(t.x,t.z)+(t.height||0)+s*.28+(t.catapultId?.45:0),t.z);const r=.86+s*.45,o=.55+s*.22,a=.85+s*.32,l=this.roofAnchor;this.roofTargets[this.roofTargetCount++].set(l.x,l.y+o,l.z),this.roofTargets[this.roofTargetCount++].set(l.x-r,l.y+o,l.z),this.roofTargets[this.roofTargetCount++].set(l.x+r,l.y+o,l.z),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+o,l.z-r),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+o,l.z+r),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+.08,l.z),this.roofTargets[this.roofTargetCount++].set(l.x,l.y+a,l.z)}roofObstructsPlayer(t){if(!this.roofTargetCount)return!1;const e=this.roofCamera,n=this.roofRay,s=this.game.camera,r=s.near||.1,o=Math.tan((s.fov||52)*Math.PI/360),a=Math.max(.35,r*Math.sqrt(1+o*o*(1+(s.aspect||1)**2))+.08);for(const l of t.roofTriangles)if(l.closestPointToPoint(e,this.roofNearest),this.roofNearest.distanceToSquared(e)<a*a)return!0;n.origin.copy(e);for(let l=0;l<this.roofTargetCount;l++){n.direction.copy(this.roofTargets[l]).sub(e);const c=n.direction.lengthSq();if(!(c<1e-8)&&(n.direction.normalize(),!!n.intersectsBox(t.roofBounds))){for(const h of t.roofTriangles)if(n.intersectTriangle(h.a,h.b,h.c,!1,this.roofHit)&&this.roofHit.distanceToSquared(e)<c)return!0}}return!1}stockObstructsPlayer(t){if(!this.roofTargetCount)return!1;const e=this.roofCamera,n=this.roofRay,s=t.stockBounds,r=this.game.camera,o=r.near||.1,a=Math.tan((r.fov||52)*Math.PI/360),l=Math.max(.35,o*Math.sqrt(1+a*a*(1+(r.aspect||1)**2))+.08);if(s.distanceToPoint(e)<l)return!0;n.origin.copy(e);for(let c=0;c<this.roofTargetCount;c++){n.direction.copy(this.roofTargets[c]).sub(e);const h=n.direction.lengthSq();if(!(h<1e-8)&&(n.direction.normalize(),n.intersectBox(s,this.roofHit)&&this.roofHit.distanceToSquared(e)<h-1e-5))return!0}return!1}buildHouse(t,e,n){const s=this.game.houseFloors?.find(P=>P.baseId===t.id),r=s?.height??this.ground(t.x,t.z),o=t.halfWidth+.18,a=t.halfDepth+.18,l=new te;l.name=`${t.id}-actual-roofed-house`,l.position.set(t.x,r,t.z),this.group.add(l);const c=this.mesh(l,this.geometries.box,this.materials.darkWood,0,-.09,0,o*2,.18,a*2);c.name="house-floor-at-actor-height";const h=[];for(let P=-a+.2;P<a;P+=.4)this.boxPart(h,0,-.012,Math.min(P,a-.2),o*2-.06,.025,.355);const u=ki(h);for(const P of h)P.dispose();this.ownedGeometries.push(u),this.mesh(l,u,this.materials.lightWood);const d=[];for(const P of[-t.halfWidth,t.halfWidth])for(const G of[-t.halfDepth,t.halfDepth]){const j=this.game.world?.getSurface(t.x+P,t.z+G).height??s?.minimum??r-.2,O=Math.max(.18,r-j);this.boxPart(d,P,-O*.5,G,.3,O,.3)}const f=ki(d);for(const P of d)P.dispose();this.ownedGeometries.push(f),this.mesh(l,f,this.materials.darkWood);const g=t.side==="east"||t.side==="west",m=(g?t.halfDepth:t.halfWidth)+.32,x=(g?t.halfWidth:t.halfDepth)+.32,p=2.62,v=4.05,y=new Se;y.setAttribute("position",new Vt([-m,p,-x,0,v,-x,m,p,-x,-m,p,x,0,v,x,m,p,x],3)),y.setIndex([0,3,4,0,4,1,1,4,5,1,5,2,0,1,2,3,5,4]),y.computeVertexNormals(),g&&y.rotateY(Math.PI/2),this.ownedGeometries.push(y);const M=this.mesh(l,y,e);M.name="full-house-leaf-roof",M.updateWorldMatrix(!0,!1);const R=[],E=new Nn,w=y.attributes.position,A=y.index;for(let P=0;P<A.count;P+=3){const G=new qn;G.a.fromBufferAttribute(w,A.getX(P)).applyMatrix4(M.matrixWorld),G.b.fromBufferAttribute(w,A.getX(P+1)).applyMatrix4(M.matrixWorld),G.c.fromBufferAttribute(w,A.getX(P+2)).applyMatrix4(M.matrixWorld),R.push(G),E.expandByPoint(G.a).expandByPoint(G.b).expandByPoint(G.c)}const S=this.mesh(l,this.geometries.cylinder,n,0,v+.18,0,.13,.55,.13);S.rotation.z=.2;const b=this.mesh(l,this.geometries.leaf,n,.2,v+.48,0,.5,.14,.24);b.rotation.z=.3;let U=null;if(s?.ramp){const P=s.ramp,G=[],j=[];for(let K=0;K<=P.rows;K++)for(let q=0;q<=P.cols;q++){const Y=K/P.rows*P.length,H=(q/P.cols*2-1)*P.halfWidth;G.push(P.x+P.dx*Y+P.rightX*H,P.heights[K*(P.cols+1)+q],P.z+P.dz*Y+P.rightZ*H)}for(let K=0;K<P.rows;K++)for(let q=0;q<P.cols;q++){const Y=K*(P.cols+1)+q,H=Y+1,st=Y+P.cols+1,_t=st+1;j.push(Y,st,H,H,st,_t)}const O=new Se;O.setAttribute("position",new Vt(G,3)),O.setIndex(j),O.computeVertexNormals(),this.ownedGeometries.push(O);const B=this.material({color:"#b18b59",side:Ce});U=new Jt(O,B),U.name=`${t.id}-walkable-door-ramp`,this.group.add(U)}return l.userData={baseId:t.id,interior:{x:t.x,z:t.z,halfWidth:t.halfWidth-.17,halfDepth:t.halfDepth-.17},floorY:r,roofEaveY:r+p,roofRidgeY:r+v},{house:l,deck:c,ramp:U,roof:M,roofStem:S,roofLeaf:b,roofTriangles:R,roofBounds:E}}buildBase(t,e){const n=new te;n.name=`${t.id}-shelter`,n.position.set(t.stock.x,this.ground(t.stock.x,t.stock.z),t.stock.z),this.group.add(n);const s=t.side==="north"?0:t.side==="east"?Math.PI/2:-Math.PI/2,r=new te;r.rotation.y=s,n.add(r);const o=this.material({color:ur[e]}),a=this.material({color:e===0?"#61975b":e===1?"#ba7356":"#9270b0",transparent:!0,opacity:1,depthWrite:!0,side:Ce}),l=[this.materials.wood,this.materials.darkWood,o].map(B=>{const K=B.clone();return K.transparent=!0,this.ownedMaterials.push(K),K}),c=this.mesh(r,this.geometries.cylinder,l[0],0,.38,0,1.25,.76,1.25);c.name="infinite-fly-stock-basket";const h=this.mesh(r,this.geometries.cylinder,l[1],0,.77,0,1.15,.09,1.15);h.name="stock-basket-lid";const u=this.mesh(r,this.geometries.cylinder,l[2],0,.42,0,1.31,.14,1.31);u.name="owner-color-on-stock";const d=[c,h,u],{house:f,deck:g,ramp:m,roof:x,roofStem:p,roofLeaf:v,roofTriangles:y,roofBounds:M}=this.buildHouse(t,a,o),R=new te;R.name="visible-fly-reserve",r.add(R);const E=new wn(this.geometries.sphere,this.materials.fly,8),w=new wn(this.geometries.wing,this.materials.wing,16);E.name="reserve-fly-bodies",w.name="reserve-fly-wings",E.frustumCulled=w.frustumCulled=!1,R.add(E,w);const A=new xn({color:ur[e],transparent:!0,opacity:.36,side:Ce,depthWrite:!1});this.ownedMaterials.push(A);const S=this.mesh(n,this.geometries.ring,A,0,.045,0,2.05,2.05,2.05);S.rotation.x=-Math.PI/2,S.name="stock-refill-ring";const b=new te;b.name="storage-destruction-progress",b.position.set(0,2.12,0),n.add(b),this.mesh(b,this.geometries.box,this.materials.dark,0,0,0,2.2,.17,.09);const U=this.mesh(b,this.geometries.box,this.materials.alert,-1.06,0,.055,0,.115,.05);b.visible=!1;const P=new te;P.name="destroyed-storage-remains",P.visible=!1,n.add(P);const G=[];for(let B=0;B<5;B++){const K=this.geometries.box.clone();K.scale(.2,.2,1.1),K.rotateY(B*.8),K.translate(Math.sin(B*2.4)*.8,.12+B%2*.08,Math.cos(B*2.4)*.7),G.push(K)}const j=ki(G);for(const B of G)B.dispose();this.ownedGeometries.push(j),this.mesh(P,j,this.materials.ruin),n.updateWorldMatrix(!0,!0);const O=new Nn;for(const B of d)O.union(new Nn().setFromObject(B));return O.expandByScalar(.03),{definition:t,group:n,cabin:r,house:f,deck:g,ramp:m,roof:x,roofStem:p,roofLeaf:v,roofTriangles:y,roofBounds:M,roofObstructed:!1,roofHold:0,roofMaterial:a,stockMeshes:d,stockMaterials:l,stockBounds:O,stockObstructed:!1,marker:S,markerMaterial:A,bar:b,fill:U,supply:R,flyBodies:E,flyWings:w,ruins:P,index:e}}buildGrove(t,e){const n=new te;n.name=t.id,this.group.add(n);const s=this.material({color:["#487c47","#609147","#397553","#668349","#4d825a"][e],transparent:!0,opacity:.94,depthWrite:!0}),r=[],o=[],a=[],l=new te;l.name="tree-cover-canopy",n.add(l);for(let d=0;d<3;d++){const f=d*yd/3+e*.7,g=t.x+Math.cos(f)*t.radius*.43,m=t.z+Math.sin(f)*t.radius*.43,x=this.ground(g,m),p=3.3+d%2*.5,v=this.geometries.cylinder.clone();v.scale(.24,p,.24),v.translate(g,x+p/2,m),o.push(v);for(let M=0;M<3;M++){const R=this.geometries.leaf.clone();R.scale(1.35+M*.12,.8,1.25),R.translate(g+Math.sin(M*2.1)*.42,x+p+M*.35,m+Math.cos(M*2.1)*.35),r.push(R)}const y=this.geometries.leaf.clone();y.scale(.7,.35,.7),y.translate(g+.5,x+.22,m-.25),a.push(y)}const c=(d,f,g,m)=>{const x=ki(d);for(const v of d)v.dispose();this.ownedGeometries.push(x);const p=new Jt(x,f);return p.name=g,m.add(p),p};c(o,this.materials.wood,"grove-trunks",n),c(r,s,"grove-leaf-crown",l),c(a,this.materials.leaf,"slow-moving-underbrush",n);const h=new xn({color:"#50733f",transparent:!0,opacity:.2,side:Ce,depthWrite:!1});this.ownedMaterials.push(h);const u=this.mesh(n,this.geometries.ring,h,t.x,this.ground(t.x,t.z)+.02,t.z,t.radius,t.radius,t.radius);return u.rotation.x=-Math.PI/2,{definition:t,group:n,canopy:l,material:s}}update(t=0){const e=this.game.running?Math.max(0,Math.min(.1,t)):0;this.clock+=e;const n=this.game.state.actors?.[0],s=n?k1(n):null;this.updateWallVisibility(n,s,t),this.prepareRoofSight(n);const r=this.game.state.bases||[];for(const o of this.bases.values()){const a=r.find(g=>g.id===o.definition.id||g.owner===o.definition.owner),l=!!a?.destroyed,c=vd((a?.progress||0)/10),h=c>0&&!l;o.cabin.visible=!l,o.supply.visible=!l,o.ruins.visible=l,o.stockObstructed=!l&&this.stockObstructsPlayer(o);const u=o.stockMaterials[0].opacity+(1-o.stockMaterials[0].opacity)*(1-Math.exp(-Math.max(t,.016)*10)),d=o.stockObstructed?.18:u>.995?1:u;for(const g of o.stockMaterials)g.opacity=d,g.depthWrite=d===1;o.markerMaterial.color.set(l?"#5c7067":h?"#ff9b58":ur[o.index]),o.markerMaterial.opacity=l?.12:h?.4+.12*Math.sin(this.clock*8):.28,o.bar.visible=h,o.fill.scale.x=2.12*c,o.fill.position.x=-1.06+1.06*c,this.game.camera&&o.bar.quaternion.copy(this.game.camera.quaternion),o.roofObstructed=s?.id===o.definition.id||this.roofObstructsPlayer(o),o.roofHold=o.roofObstructed?.18:Math.max(0,o.roofHold-Math.max(t,.016));const f=o.roofObstructed||o.roofHold>0;o.roof.visible=!l&&!f,o.roofMaterial.opacity=f?0:o.roofMaterial.opacity+(1-o.roofMaterial.opacity)*(1-Math.exp(-Math.max(t,.016)*10)),o.roofMaterial.depthWrite=o.roofMaterial.opacity>.9,o.roofStem.visible=o.roofLeaf.visible=o.roof.visible&&o.roofMaterial.opacity>.6,o.cabin.position.x=h?Math.sin(this.clock*25)*.025:0;for(let g=0;g<8;g++){const m=this.clock*(1.4+g%3*.2)+g*yd/8,x=.3+g%3*.13,p=Math.sin(m)*x,v=1.05+g%3*.17+Math.sin(this.clock*4+g)*.08,y=Math.cos(m)*x,M=this.dummy;M.position.set(p,v,y),M.scale.set(.09,.08,.13),M.rotation.set(0,m,0),M.updateMatrix(),o.flyBodies.setMatrixAt(g,M.matrix);for(let R=0;R<2;R++){const E=R===0?-1:1;M.position.set(p+Math.cos(m)*E*.105,v+.035,y-Math.sin(m)*E*.105),M.scale.set(.15,.016,.07),M.rotation.set(0,m,Math.sin(this.clock*36+g)*.55*E),M.updateMatrix(),o.flyWings.setMatrixAt(g*2+R,M.matrix)}}o.flyBodies.instanceMatrix.needsUpdate=!0,o.flyWings.instanceMatrix.needsUpdate=!0}for(const o of this.groves){const l=n&&Math.hypot(n.x-o.definition.x,n.z-o.definition.z)<o.definition.radius+1.4?.23:.94;o.material.opacity+=(l-o.material.opacity)*(1-Math.exp(-Math.max(t,.016)*8)),o.material.depthWrite=o.material.opacity>.9}}dispose(){this.group.removeFromParent();for(const t of this.ownedGeometries)t.dispose();for(const t of Object.values(this.geometries))t.dispose();for(const t of this.ownedMaterials)t.dispose();for(const t of Object.values(this.materials))t.dispose();this.bases.clear(),this.enclosures.clear(),this.groves.length=0}}const ss=["move","aim","fire"],Qr=8,La=(i,t,e)=>Math.max(t,Math.min(e,i)),vr=(i,t)=>Number.isFinite(i)?i:t,Ph=(i,t)=>({left:i.x-t.width/2,top:i.y-t.height/2,right:i.x+t.width/2,bottom:i.y+t.height/2}),FM=(i,t,e=Qr)=>i.left<t.right+e&&i.right>t.left-e&&i.top<t.bottom+e&&i.bottom>t.top-e;function Sf(i,t,e,n,s=i){const r=e.left+t.width/2,o=Math.max(r,e.right-t.width/2),a=e.top+t.height/2,l=Math.max(a,e.bottom-t.height/2),c=g=>({x:La(vr(g?.x,r),r,o),y:La(vr(g?.y,a),a,l)}),h=c(i),u=[h,c(s)];for(const g of n)u.push(c({x:g.left-t.width/2-Qr,y:h.y}),c({x:g.right+t.width/2+Qr,y:h.y}),c({x:h.x,y:g.top-t.height/2-Qr}),c({x:h.x,y:g.bottom+t.height/2+Qr}));for(let g=a;g<=l+16;g+=16)for(let m=r;m<=o+16;m+=16)u.push(c({x:m,y:g}));let d=null,f=1/0;for(const g of u){if(n.some(x=>FM(Ph(g,t),x)))continue;const m=(g.x-h.x)**2+(g.y-h.y)**2;m<f&&(d=g,f=m)}return d||c(s)}function OM(i,t,e,n=ss){const s=t>=i,r=new Set(n),o={},a=r.has("move")&&e.move,l=r.has("aim")&&e.aim,c=r.has("fire")&&e.fire;return a&&(o.move={x:14+a.width/2,y:t-26-a.height/2}),l&&(o.aim={x:i-14-l.width/2,y:t-26-l.height/2}),c&&(o.fire=l?s?{x:i-14-l.width/2,y:t-26-l.height-20-c.height/2}:{x:i-14-l.width-22-c.width/2,y:t-26-c.height/2}:{x:i-14-c.width/2,y:t-26-c.height/2}),o}function BM({width:i,height:t,controls:e={},activeKeys:n=ss,preferred:s={},blocked:r=[],insets:o={}}){const a=ss.filter(d=>n.includes(d)&&e[d]),l={left:Math.max(10,vr(o.left,0)+8),top:Math.max(10,vr(o.top,0)+8),right:i-Math.max(10,vr(o.right,0)+8),bottom:t-Math.max(18,vr(o.bottom,0)+8)},c=OM(i,t,e,a),h={},u=[...r];for(const d of a){const f=s[d],g=f&&Number.isFinite(f.x)&&Number.isFinite(f.y)?{x:f.x*i,y:f.y*t}:c[d];h[d]=Sf(g,e[d],l,u,c[d]),u.push(Ph(h[d],e[d]))}return{positions:h,bounds:l}}function HM({root:i,movePad:t,aimPad:e,fireButton:n,toggleButton:s,storageKey:r="frog.touch-layout.v1",onEditingChange:o=()=>{},announce:a=()=>{}}){const l=i.ownerDocument,c=l.defaultView,h={move:t,aim:e,fire:n},u=i.querySelector("#layout-hint");let d=!1,f=null,g={},m={},x={},p=[],v={portrait:{},landscape:{}},y=0,M=!1,R={width:c.innerWidth,height:c.innerHeight,mode:c.innerHeight>=c.innerWidth?"portrait":"landscape"};const E=[],w=(Y,H,st,_t)=>{Y.addEventListener(H,st,_t),E.push(()=>Y.removeEventListener(H,st,_t))},A=()=>c.innerHeight>=c.innerWidth?"portrait":"landscape",S=Y=>{if(!Y||Y.hidden||Y.closest("[hidden]"))return!1;const H=c.getComputedStyle(Y),st=Y.getBoundingClientRect();return H.display!=="none"&&H.visibility!=="hidden"&&H.visibility!=="collapse"&&st.width>0&&st.height>0};try{const Y=JSON.parse(c.localStorage.getItem(r)||"null");if(Y?.version===1)for(const H of["portrait","landscape"])for(const st of ss){const _t=Y[H]?.[st];Number.isFinite(_t?.x)&&Number.isFinite(_t?.y)&&(v[H][st]={x:La(_t.x,0,1),y:La(_t.y,0,1)})}}catch{}const b=()=>{const{mode:Y,width:H,height:st}=R;for(const _t of p)g[_t]&&(v[Y][_t]={x:g[_t].x/H,y:g[_t].y/st});try{c.localStorage.setItem(r,JSON.stringify({version:1,...v}))}catch{}},U=()=>{const Y=[];for(const H of l.querySelectorAll("#arcade-hud, #minimap, #view-button, #layout-button, #layout-hint, #round-status, #base-status, #catapult-status, #sabotage-status, #kick-button, #catapult-button, #sabotage-button")){if(!S(H))continue;const st=H.getBoundingClientRect();st.width&&st.height&&Y.push({left:st.left,top:st.top,right:st.right,bottom:st.bottom})}return Y},P=()=>{for(const Y of p){const H=h[Y],st=g[Y];st&&(H.style.left=`${st.x-m[Y].width/2}px`,H.style.top=`${st.y-m[Y].height/2}px`,H.style.right="auto",H.style.bottom="auto")}},G=()=>{if(M)return;const Y=ss.filter(ne=>S(h[ne]));f&&!Y.includes(f.key)&&O(),p=Y;const H=c.getComputedStyle(i),st={};for(const ne of["left","right","top","bottom"])st[ne]=parseFloat(H.getPropertyValue(`--touch-safe-${ne}`))||0;for(const ne of p){const le=h[ne],ut=le.getBoundingClientRect();m[ne]={width:Math.max(44,ut.width),height:Math.max(44,ut.height)}}for(const ne of ss)h[ne]?.classList.toggle("layout-draggable",d&&p.includes(ne));const _t=BM({width:c.innerWidth,height:c.innerHeight,controls:m,activeKeys:p,preferred:v[A()],blocked:U(),insets:st});g=_t.positions,x=_t.bounds,R={width:c.innerWidth,height:c.innerHeight,mode:A()},P()},j=()=>{c.cancelAnimationFrame(y),y=c.requestAnimationFrame(G)},O=()=>{f&&(f=null,b())},B=Y=>{const H=!!Y;if(H!==d){H&&G(),O(),d=H,i.classList.toggle("layout-editing",d),s.setAttribute("aria-pressed",String(d)),s.setAttribute("aria-label",d?"Ολοκλήρωση αλλαγής θέσεων χειριστηρίων":"Αλλαγή θέσεων χειριστηρίων"),s.querySelector("span")?.replaceChildren(d?"ΤΕΛΟΣ":"ΘΕΣΕΙΣ"),u&&(u.hidden=!d);for(const st of ss){const _t=h[st];_t&&(_t.setAttribute("data-layout-label",{move:"ΚΙΝΗΣΗ",aim:"ΣΤΟΧΕΥΣΗ",fire:"ΒΟΛΗ"}[st]),_t.classList.toggle("layout-draggable",d&&p.includes(st)))}d||b(),o(d),a(d?"Σύρε τα χειριστήρια στη θέση που σε βολεύει. Πάτησε ΤΕΛΟΣ για να συνεχίσεις.":"Οι θέσεις των χειριστηρίων αποθηκεύτηκαν.")}},K=()=>{for(const Y of p)delete v[A()][Y];G(),b(),a("Επαναφέρθηκαν οι αρχικές θέσεις χειριστηρίων.")};if(u){u.textContent.trim()||u.append("Σύρε τα ορατά χειριστήρια. ");const Y=l.createElement("button");Y.type="button",Y.className="layout-reset",Y.textContent="ΕΠΑΝΑΦΟΡΑ",Y.setAttribute("aria-label","Επαναφορά αρχικών θέσεων χειριστηρίων"),u.append(Y),w(Y,"click",K)}for(const Y of ss){const H=h[Y];if(H){w(H,"pointerdown",st=>{!d||!p.includes(Y)||!S(H)||(st.preventDefault(),st.stopImmediatePropagation(),!f&&(g[Y]||G(),f={key:Y,id:st.pointerId,dx:st.clientX-g[Y].x,dy:st.clientY-g[Y].y},H.setPointerCapture?.(st.pointerId)))},!0),w(H,"pointermove",st=>{if(!d||!p.includes(Y)||!S(H)||(st.preventDefault(),st.stopImmediatePropagation(),!f||f.id!==st.pointerId||f.key!==Y))return;const _t=U();for(const ne of p)ne!==Y&&g[ne]&&_t.push(Ph(g[ne],m[ne]));g[Y]=Sf({x:st.clientX-f.dx,y:st.clientY-f.dy},m[Y],x,_t,g[Y]),P()},!0);for(const st of["pointerup","pointercancel","lostpointercapture"])w(H,st,_t=>{d&&(_t.preventDefault?.(),_t.stopImmediatePropagation(),f?.id===_t.pointerId&&O())},!0);w(H,"click",st=>{d&&(st.preventDefault(),st.stopImmediatePropagation())},!0)}}let q=-1/0;return w(s,"pointerdown",Y=>{Y.pointerType==="touch"&&(Y.preventDefault(),Y.stopPropagation(),q=Date.now(),B(!d))}),w(s,"click",Y=>{(Y.detail===0||Date.now()-q>600)&&B(!d)}),w(c,"resize",()=>{O(),j()}),w(c,"orientationchange",j),w(c,"keydown",Y=>{d&&Y.code==="Escape"&&(Y.preventDefault(),Y.stopImmediatePropagation(),B(!1))},!0),w(c,"blur",()=>{O(),d&&B(!1)}),s.setAttribute("aria-pressed","false"),j(),{get editing(){return d},setEditing:B,refresh:G,reset:K,destroy(){if(!M){B(!1),M=!0,c.cancelAnimationFrame(y);for(const Y of E)Y()}}}}const Md=i=>Number.isFinite(i)?Math.max(0,Math.min(1,i)):0,GM=Object.freeze([.96,.98,1.04]);function VM(i){if(i.stats?.type!=="frog")return i;i.group.getObjectByName("anatomical-animation-pivot").scale.set(...GM),i.group.scale.setScalar(1);const e=i.mesh.material;return e.bumpScale=0,e.roughness=.9,e.clearcoat=.08,e.clearcoatRoughness=.75,i}function WM(i,{load:t=0,spit:e=0}={}){if(i.stats?.type!=="frog")return i;const n=Md(t),s=Md(e),r=i.bones;i.group.scale.setScalar(1),r.throat.scale.x*=1+n*.08+s*.1,r.throat.scale.y*=1+n*.12+s*.16,r.throat.scale.z*=1+n*.08+s*.08,r.jaw.rotation.x-=s*.42,r.head.rotation.x-=s*.08;for(const o of["eyeL","eyeR"])r[o].scale.multiplyScalar(1.14);return i}const Ea=Object.freeze({cameraZoom:Sr.default,cameraFov:52,cameraSensitivity:1}),Kl=(i,t)=>{const e=typeof i=="number"||typeof i=="string"&&i.trim()?Number(i):NaN;return Number.isFinite(e)?e:t},Jl=(i,t,e)=>Math.max(t,Math.min(e,i));function wf(i={}){const t=Jl(Kl(i?.cameraZoom,Ea.cameraZoom),Sr.min,Sr.max),e=Jl(Kl(i?.cameraFov,Ea.cameraFov),40,80),n=Jl(Kl(i?.cameraSensitivity,Ea.cameraSensitivity),.25,2);return{cameraZoom:Math.round(t*20)/20,cameraFov:Math.round(e),cameraSensitivity:Math.round(n*20)/20}}function XM(i){const t=i.camera,e=i.state?.actors?.[0];if(t.fov=i.settings.cameraFov,t.updateProjectionMatrix(),e){if(typeof i.updateCameraPose=="function")i.cameraReady=!1,i.updateCameraPose(0);else{const n=Mf(e,i.ground(e.x,e.z),t.aspect,i.viewMode,{yaw:i.cameraYaw,pitch:i.cameraPitch,zoom:i.settings.cameraZoom});i.focus.fromArray(n.look),i.cameraTarget.fromArray(n.position),t.position.copy(i.cameraTarget),t.lookAt(i.focus),t.updateMatrixWorld(),i.cameraReady=!0}i.basesView?.update(0)}i.renderer.render(i.scene,t),i.drawLabels?.()}function qM(i,{onChange:t=()=>{}}={}){const e=["camera-zoom","camera-zoom-value","camera-fov","camera-fov-value","camera-reset","camera-sensitivity","camera-sensitivity-value"],[n,s,r,o,a,l,c]=e.map(x=>{const p=i.$(x);if(!p)throw new Error(`Camera settings need #${x}`);return p});n.min="70",n.max="150",n.step="5",r.min="40",r.max="80",r.step="1",l.min="25",l.max="200",l.step="5";const h=()=>{const x=wf(i.settings);return Object.assign(i.settings,x),n.value=String(Math.round(x.cameraZoom*100)),s.textContent=n.value+"%",r.value=String(x.cameraFov),o.textContent=r.value+"°",l.value=String(Math.round(x.cameraSensitivity*100)),c.textContent=l.value+"%",x},u=()=>{const x=h();XM(i),t(x)},d=()=>{i.settings.cameraZoom=Number(n.value)/100,u()},f=()=>{i.settings.cameraFov=Number(r.value),u()},g=()=>{i.settings.cameraSensitivity=Number(l.value)/100,u()},m=()=>{Object.assign(i.settings,Ea),u()};return n.addEventListener("input",d),r.addEventListener("input",f),a.addEventListener("click",m),l.addEventListener("input",g),h(),()=>{n.removeEventListener("input",d),r.removeEventListener("input",f),a.removeEventListener("click",m),l.removeEventListener("input",g)}}function $M({canvas:i,document:t=globalThis.document,active:e=()=>!0,onLock:n=()=>{},onUnexpectedUnlock:s=()=>{},onFallback:r=()=>{},timeoutMs:o=1500,setTimer:a=globalThis.setTimeout,clearTimer:l=globalThis.clearTimeout}={}){let c=0,h=0,u=!1,d=null,f=!1,g=!1;const m=()=>t.pointerLockElement===i,x=()=>{d!==null&&l(d),d=null,h=0,u=!1},p=()=>{if(c++,x(),f=!1,m())try{t.exitPointerLock?.()}catch{}},v=()=>{if(!g)if(m()){if(x(),!e()){p();return}const E=!f;f=!0,E&&n()}else{const E=f;f=!1,E&&(x(),e()&&s())}},y=(E,w)=>{if(!(g||h!==E)){if(x(),m()){v();return}e()&&r(w)}},M=()=>{h&&!u&&y(h,new Error("Pointer Lock was denied."))},R=()=>{if(g||!e()||m()||h)return!1;const E=++c;h=E,u=!1;try{if(typeof i.requestPointerLock!="function")return y(E,new Error("Pointer Lock is unavailable.")),!1;const w=i.requestPointerLock();w&&typeof w.then=="function"&&(u=!0,Promise.resolve(w).then(()=>{!g&&h===E&&m()&&v()},A=>y(E,A))),h===E&&(d=a(()=>y(E,new Error("Pointer Lock request timed out.")),Math.max(0,Number.isFinite(o)?o:1500)))}catch(w){y(E,w)}return h===E||m()};return t.addEventListener("pointerlockchange",v),t.addEventListener("pointerlockerror",M),{get locked(){return m()},get pending(){return!!h},request:R,release:p,dispose(){g||(p(),g=!0,t.removeEventListener("pointerlockchange",v),t.removeEventListener("pointerlockerror",M))}}}function ga(i,t,e=()=>performance.now(),{allowSecondary:n=!1}={}){const s=m=>m.pointerType==="touch"||m.pointerType==="pen";let r=null,o=-1/0;const a=m=>{const x=i.getBoundingClientRect();return m.clientX>=x.left&&m.clientX<=x.right&&m.clientY>=x.top&&m.clientY<=x.bottom},l=m=>{try{i.releasePointerCapture?.(m)}catch{}},c=m=>{if(m.pointerType==="mouse"){if(r){const x=r.id;r=null,l(x)}o=-1/0;return}if(!(i.disabled||!s(m)||m.isPrimary===!1&&!n||m.button!==0||r)){r={id:m.pointerId,canceled:!1};try{i.setPointerCapture?.(m.pointerId)}catch{}}},h=m=>{r?.id===m.pointerId&&!a(m)&&(r.canceled=!0)},u=m=>{r?.id===m.pointerId&&(r=null,o=e(),l(m.pointerId))},g={pointerdown:c,pointermove:h,pointerleave:h,pointerup:m=>{if(r?.id!==m.pointerId)return;const x=r;if(r=null,m.preventDefault(),o=e(),l(m.pointerId),!(i.disabled||x.canceled||!a(m)))try{t(m)}finally{o=e()}},pointercancel:u,lostpointercapture:u,click:m=>{if(i.disabled||s(m)||m.detail!==0&&e()-o<900){m.preventDefault();return}t(m)}};for(const[m,x]of Object.entries(g))i.addEventListener(m,x);return()=>{for(const[m,x]of Object.entries(g))i.removeEventListener(m,x);if(r){const m=r.id;r=null,l(m)}}}const Ii=1e-7,xa=i=>i&&Number.isFinite(i.x)&&Number.isFinite(i.y)&&Number.isFinite(i.z),Ql=(i,t)=>i.x*t.x+i.y*t.y+i.z*t.z,va=(i,t)=>({x:i.x-t.x,y:i.y-t.y,z:i.z-t.z}),tc=(i,t,e)=>({x:i.x+t.x*e,y:i.y+t.y*e,z:i.z+t.z*e});function YM({rayOrigin:i,rayDirection:t,muzzle:e,range:n,hits:s=[]}={}){const r=xa(e)?e:{x:0,y:0,z:0},o=xa(i)?i:r,a=xa(t)?Math.hypot(t.x,t.y,t.z):0,l=a>Ii?{x:t.x/a,y:t.y/a,z:t.z/a}:{x:0,y:0,z:-1},c=Number.isFinite(n)&&n>Ii?n:1;let h=null,u=1/0;for(const p of s||[]){const v=p?.point??p;if(!xa(v))continue;const y=va(v,r),M=va(v,o),R=Ql(M,l),E=Math.hypot(y.x,y.y,y.z);R<=Ii||R>=u||E<=Ii||E>c+Ii||(h=v,u=R)}const d=h?"hit":"range";if(!h){const p=va(o,r),v=Ql(p,l),y=v*v-Ql(p,p)+c*c,M=y>=0?-v+Math.sqrt(y):-1;if(M>Ii)h=tc(o,l,M);else{const R=Math.max(0,-v);h=tc(o,l,R>Ii?R:c)}}const f=va(h,r),g=Math.hypot(f.x,f.y,f.z),m=g>Ii?{x:f.x/g,y:f.y/g,z:f.z/g}:l,x=g>Ii?Math.min(c,g):c;return{target:tc(r,m,x),direction:m,distance:x,source:d}}function ZM({state:i,actor:t,input:e={},active:n=!1,aiming:s=!1}={}){const r={fire:!1,targetId:null,trace:null};if(!n||!s||i?.status!=="playing"||i.phase!=="battle"||!t||!Array.isArray(i.actors)||t.ko||t.eliminated||t.dizzyTime>0||t.hit>0||t.knockUp>0||t.kick>0||t.catapultId||t.sabotageId||!Number.isFinite(t.ammo)||t.ammo<=0||!e||e.aiming===!1||e.sabotage||e.kick||e.throwStone||e.interactCatapult||e.interact)return r;const o=e.ay===void 0?0:e.ay;if(!Number.isFinite(t.x)||!Number.isFinite(t.z)||!Number.isFinite(e.ax)||!Number.isFinite(o)||!Number.isFinite(e.az)||Math.hypot(e.ax,o,e.az)<=.05)return r;const a=xf(i,{...t,aimX:e.ax,aimY:o,aimZ:e.az,aim3D:Number.isFinite(e.ay)}),l=a.kind==="actor"?i.actors.find(c=>c.id===a.targetId):null;return!l||l.id===t.id||l.ko||l.eliminated||l.invuln>0?{...r,trace:a}:{fire:!0,targetId:l.id,trace:a}}const en=L,ec=new en(0,1,0),jM=ln.muzzleOffset+Rt.projectileSpeed*Rt.projectileLifetime,ya=(i,t,e)=>Math.max(t,Math.min(e,i)),KM=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]),nc=i=>{try{return localStorage.getItem(i)}catch{return null}},Kr=(i,t)=>{try{return localStorage.setItem(i,t),!0}catch{return!1}},Fs=i=>`<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">${i}</svg>`,JM=Fs('<ellipse cx="21" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(-30 21 23)"/><ellipse cx="43" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(30 43 23)"/><ellipse cx="32" cy="37" rx="10" ry="15" fill="#344b50" stroke="#12282b" stroke-width="3"/><circle cx="27" cy="25" r="5" fill="#fff6cd"/><circle cx="37" cy="25" r="5" fill="#fff6cd"/><circle cx="28" cy="25" r="2" fill="#14282c"/><circle cx="36" cy="25" r="2" fill="#14282c"/>'),QM=Fs('<path d="m15 8 11 5-4 21 29 6 4 10-36 4-9-11z" fill="#d3ff80" stroke="#314b2d" stroke-width="3"/><path d="m46 13 4 8m9-5-6 9m9 4-9 1" stroke="#ffce71" stroke-width="4"/>'),_d=Fs('<path d="M9 50h46M18 47l10-28 18 28M31 27l20-17" stroke="#d9bf82" stroke-width="6" stroke-linecap="round"/><path d="m45 9 13 4-4 10-12-5z" fill="#8ea29a"/><circle cx="17" cy="53" r="6" fill="#6d4e35"/><circle cx="48" cy="53" r="6" fill="#6d4e35"/>'),bd=Fs('<path d="M18 10v44l36-22z" fill="#f3ffd0" stroke="#264e26" stroke-width="4" stroke-linejoin="round"/>'),t_=Fs('<path d="M14 25a20 20 0 1 1 0 17" stroke="#f3ffd0" stroke-width="6" stroke-linecap="round"/><path d="m10 10 2 18 17-5" stroke="#f3ffd0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M29 24v16l13-8z" fill="#f3ffd0"/>'),e_=Fs('<path d="M12 18h40M12 32h40M12 46h40" stroke="#e9f3e5" stroke-width="5" stroke-linecap="round"/><circle cx="24" cy="18" r="6" fill="#fbc562"/><circle cx="42" cy="32" r="6" fill="#fbc562"/><circle cx="24" cy="46" r="6" fill="#fbc562"/>'),n_=Fs('<path d="M8 29 32 9l24 20M14 27v29h36V27" stroke="#f4dfad" stroke-width="5" stroke-linejoin="round"/><path d="M24 56V35h16v21" fill="#243e36" stroke="#f4dfad" stroke-width="3"/><path d="m12 12 11 10m29-10L41 22" stroke="#ffad7a" stroke-width="4"/>');class i_{constructor(){this.volume=.5,this.ctx=null,this.gain=null}resume(){try{this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext),this.gain=this.ctx.createGain(),this.gain.connect(this.ctx.destination)),this.gain.gain.value=this.volume,this.ctx.resume()}catch{}}pause(){this.ctx&&(this.gain.gain.value=0,this.ctx.suspend().catch(()=>{}))}play(t){if(!this.ctx||this.ctx.state!=="running"||this.volume<=0)return;const e=this.ctx,n=e.currentTime,s=e.createOscillator(),r=e.createGain(),a={shot:[200,70,.065],tongue:[560,150,.11],hit:[110,45,.12],hitConfirm:[860,530,.07],storageAlert:[740,480,.3],stoneShot:[110,65,.2],stoneImpact:[75,35,.3],land:[95,50,.13],dizzy:[700,240,.28],ko:[80,330,.26],win:[400,800,.45],lost:[220,55,.4]}[t];a&&(s.type=t==="hit"?"triangle":"sine",s.frequency.setValueAtTime(a[0],n),s.frequency.exponentialRampToValueAtTime(a[1],n+a[2]),r.gain.setValueAtTime(1e-4,n),r.gain.exponentialRampToValueAtTime(.14,n+.008),r.gain.exponentialRampToValueAtTime(1e-4,n+a[2]),s.connect(r),r.connect(this.gain),s.start(n),s.stop(n+a[2]+.01),s.onended=()=>{s.disconnect(),r.disconnect()})}}class s_{constructor(){this.touch=matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>0,this.mouseControl=!this.touch,this.settings={volume:.5,quality:this.touch?"low":"high"};try{Object.assign(this.settings,JSON.parse(nc(ha)||"{}"))}catch{}Object.assign(this.settings,wf(this.settings)),delete this.settings.cameraAutoRotate,this.storageAlertUntil=-1/0,this.settings.volume=ya(Number(this.settings.volume)||0,0,1),["low","high"].includes(this.settings.quality)||(this.settings.quality="low");const t=nc(ca);try{JSON.parse(t)?.version===1&&!nc(ca+"-before-bases")&&Kr(ca+"-before-bases",t)}catch{}this.state=Kc(),this.saved=MM(t),this.running=!1,this.mode="title",this.keys=new Set,this.actions={fire:!1,kick:!1,sabotage:!1},this.aimStrength=0,this.move={x:0,z:0},this.aim={x:0,z:-1},this.mouse={x:0,y:0,valid:!1,inside:!1},this.pointers=new Map,this.layoutEditing=!1,this.fx=[],this.particles=[],this.splats=[],this.tongues=new Map,this.bulletMeshes=new Map,this.koTimes=new Map,this.elapsed=0,this.shake=0,this.saveClock=0,this.accumulator=0,this.failures=[],this.hitConfirmUntil=0,this.lastPlayerHit=null,this.scene=new ym,this.scene.background=new ee("#9fe4ff"),this.scene.fog=new ka("#baf0ea",.006),this.renderer=new ky({antialias:!this.touch,powerPreference:"high-performance"}),this.renderer.domElement.id="arcade-world",this.renderer.domElement.setAttribute("aria-label","FROG — κωμική μάχη με μύγες"),this.renderer.outputColorSpace=Un,this.renderer.toneMapping=Ed,this.renderer.toneMappingExposure=1.3,document.body.append(this.renderer.domElement),this.camera=new kn(this.settings.cameraFov,innerWidth/innerHeight,.1,250),this.camera.position.set(0,8,15),this.focus=new en(0,2,3),this.cameraTarget=new en(0,8,15),this.viewMode="chase3d",this.cameraReady=!1,this.cameraYaw=is.yaw,this.cameraPitch=is.pitch,this.cameraDrag=null,this.autoFireTargetId=null,this.freeMousePoint=null,this.mouseFirePointer=null,this.lastMovement={x:0,z:0},this.stickAim={x:0,z:-1},this.mouseRay=new Cl,this.mousePoint=new en,this.mouseNdc=new Wt,this.mousePlane=new pi(ec,0),this.scene.add(new $m("#def8ff","#52733a",2.6)),this.sun=new Km("#fff1bf",3.2),this.sun.position.set(-16,36,12),this.scene.add(this.sun),this.world=v1(this.scene,this.renderer,{seed:731,natural:!0});for(const s of[...this.world.creekRefuges])this.world.removeShelter(s.mesh);const e=(s,r)=>this.world.getSurface(s,r).height;this.houseFloors=[...P1(e),...z1(e)];const n=this.world.group.getObjectByName("Fly swarms");n&&(n.visible=!1);for(const s of this.world.hotspots)s.flies=0;this.labels=document.createElement("canvas"),this.labels.id="arcade-labels",document.body.append(this.labels),this.labelCtx=this.labels.getContext("2d"),this.sound=new i_,this.sound.volume=this.settings.volume,this.shared={sphere:new jn(1,10,7),wing:new jn(1,6,4),cylinder:new Us(1,1,1,8),circle:new Na(1,18)},this.materials={insect:new Ve({color:"#263f42",roughness:.8,metalness:0}),wing:new xn({color:"#edfcff",transparent:!0,opacity:.86,side:Ce,depthWrite:!1}),tongue:new Ve({color:"#ff839c",roughness:.4}),shot:new Ve({color:"#384b4d",emissive:"#a6c9bf",emissiveIntensity:.16}),ink:new xn({color:"#90e44c",transparent:!0,opacity:.9,depthWrite:!1,side:Ce}),rock:new Ve({color:"#617b70",roughness:.9}),rim:new xn({color:"#eaff9e",transparent:!0,opacity:.6,depthWrite:!1})},this.createArena(),this.models=[],this.buildActors(),this.createFlies(),this.artilleryView=new PM(this),this.basesView=new NM(this),this.impactEffects=new UM(this),this.createUI(),this.bindInputs(),this.applyQuality(),this.resize(),this.showTitle(),window.__FROG__={version:Xl,mode:"arcade",inspect:()=>this.inspect(),save:()=>this.persist()},new URLSearchParams(location.search).has("test")&&(window.__FROG__.test={step:(s,r=1)=>{for(let o=0;o<r;o++)fd(this.state,s,1/60),this.consumeEvents();this.updateHUD()},state:()=>this.state,setState:s=>{this.state=s,this.buildActors(),this.updateHUD()},input:()=>this.currentInput(),kickTarget:()=>Jc(this.state,this.state.actors[0])?.id}),this.last=performance.now(),qM(this,{onChange:()=>Kr(ha,JSON.stringify(this.settings))}),this.renderer.setAnimationLoop(s=>this.frame(s)),document.getElementById("boot")?.remove()}ground(t,e){return I1(t,e,this.houseFloors)??this.world.getSurface(t,e).height}cameraGround(t,e){return Math.max(this.ground(t,e),this.world.cameraSurfaceHeight(t,e))}createArena(){this.obstacleMeshes=[];for(const n of ms){const s=new Jt(new Fa(n.r,1),this.materials.rock);s.scale.y=1.7,s.position.set(n.x,this.ground(n.x,n.z)+n.r*.9,n.z),this.scene.add(s),this.obstacleMeshes.push(s)}const t=[];for(let n=0;n<=160;n++){const s=n/160*Math.PI*2,r=Math.sin(s)*Rt.radius,o=Math.cos(s)*Rt.radius;t.push(new en(r,this.ground(r,o)+.06,o))}const e=new po(new Se().setFromPoints(t),this.materials.rim);this.scene.add(e),this.playerRing=new Jt(new as(1.05,1.18,32),new xn({color:"#ecff9a",side:Ce,transparent:!0,opacity:.85,depthWrite:!1})),this.playerRing.rotation.x=-Math.PI/2,this.scene.add(this.playerRing),this.aimGuide=new po(new Se().setFromPoints([new en,new en]),new Zd({color:"#fff2b0",dashSize:.45,gapSize:.35,transparent:!0,opacity:.65})),this.scene.add(this.aimGuide),this.aimReticle=new Jt(new as(.35,.42,24),new xn({color:"#fff2b0",side:Ce,transparent:!0,opacity:.88,depthWrite:!1})),this.aimReticle.rotation.x=-Math.PI/2,this.scene.add(this.aimReticle),this.targetRing=new Jt(new as(1.32,1.44,32),new xn({color:"#ffb19c",side:Ce,transparent:!0,opacity:.9,depthWrite:!1})),this.targetRing.rotation.x=-Math.PI/2,this.targetRing.visible=!1,this.scene.add(this.targetRing),this.swarmRings=Pr.map(n=>{const s=new Jt(new as(n.radius-.08,n.radius+.03,40),new xn({color:"#c8e0a3",side:Ce,transparent:!0,opacity:.22,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.set(n.x,this.ground(n.x,n.z)+.08,n.z),this.scene.add(s),s})}buildActors(){Z1(this.state,{ground:(t,e)=>this.ground(t,e)});for(const t of this.models||[])t.dispose();this.models=this.state.actors.map((t,e)=>{const n=R1("frog",{seed:7+e*39,team:e===0?"player":`enemy${e}`,role:e===2?"bruiser":"hunter",tier:1,level:1});if(n.setEquipment({}),n.setOutline(e===0?"#e7fca7":e===1?"#ffae88":"#d3a8ff",!0),this.settings.quality==="low"&&n.setRenderLOD(1),n.mesh?.material){const s=n.mesh.material;s.bumpScale=0,s.roughness=.85,s.userData?.tint?.set(["#86da38","#ff694a","#bb70ed"][e])}return VM(n),this.scene.add(n.group),n})}createFlies(){const t=this.state.flies.length;this.flyBodies=new wn(this.shared.sphere,this.materials.insect,t),this.flyWings=new wn(this.shared.wing,this.materials.wing,t*2);for(const e of[this.flyBodies,this.flyWings])e.instanceMatrix.setUsage(Ui),e.frustumCulled=!1,this.scene.add(e);this.dummy=new qe}createUI(){this.ui=document.createElement("div"),this.ui.id="arcade-ui",this.ui.classList.toggle("is-touch",this.touch),this.ui.innerHTML=`<header id="arcade-hud" hidden><button class="view-button" id="view-button" aria-label="Αλλαγή σε κεντραρισμένη κάτοψη">ΠΙΣΩ 3D · C</button><div class="ammo-card">${JM}<div class="ammo-info"><div class="ammo-numbers"><strong id="ammo-count">0 / ${Rt.capacity}</strong><b id="ammo-percent">0%</b></div><div id="ammo-track" role="progressbar" aria-label="Γέμιση με μύγες" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="ammo-fill"></i></div><span id="ammo-state">Γέμισε στην αποθήκη σου</span></div></div><div class="ko-card base-card"><b id="ko-count">3 / 3</b><span>ΑΠΟΘΗΚΕΣ</span><div id="base-dots" aria-label="Άθικτες αποθήκες"><i data-owner="player"></i><i data-owner="rival-1"></i><i data-owner="rival-2"></i></div></div><button class="small-button" id="pause-button" aria-label="Παύση">Ⅱ</button></header>
  <div id="round-status" hidden><b id="round-time">20″</b><span id="round-copy">ΠΡΟΕΤΟΙΜΑΣΙΑ · Προστάτεψε την αποθήκη σου</span></div><div id="base-status" hidden><b id="base-warning-title" role="alert" aria-atomic="true"></b><span id="base-warning-detail"></span></div>
  <button id="catapult-button" class="touch-action catapult-button" aria-label="Χρήση κοντινού καταπέλτη" hidden>${_d}<span>ΧΡΗΣΗ</span></button><div id="catapult-status" hidden></div>
  <button id="sabotage-button" class="touch-action sabotage-button" aria-label="Κράτησε για καταστροφή εχθρικής αποθήκης" hidden>${n_}<span>ΚΡΑΤΑ · 10″</span></button><div id="sabotage-status" hidden><span id="sabotage-copy"></span><div role="progressbar" aria-label="Καταστροφή αποθήκης" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="sabotage-track"><i id="sabotage-fill"></i></div></div>
  <canvas id="minimap" width="320" height="320" aria-label="Χάρτης: η βάση σου πράσινη, εχθρικές αποθήκες κόκκινη και μωβ, είσοδοι, καταπέλτες και σμήνη"></canvas><div id="dizzy-banner" hidden>🌀 ΖΑΛΙΣΤΗΚΕΣ! <b id="dizzy-time"></b></div><div id="callout" aria-live="polite"></div>
  <div id="desktop-help" hidden><span><b>WASD</b> Κίνηση</span><span><b>Ποντίκι</b> Θέα + στόχευση</span><span><b>Κλικ</b> Μύγες</span><span><b>E κράτημα</b> Αποθήκη</span><span><b>E</b> Καταπέλτης</span><span id="pc-kick"><b>Q</b> Κλωτσιά</span><span><b>Esc</b> Παύση</span></div>
  <div id="touch-controls" hidden><div class="stick-zone move-zone"><div id="move-stick" class="stick" aria-label="Κίνηση"><div class="stick-inner"></div><div class="stick-knob"></div></div><span class="stick-caption">ΑΛΜΑΤΑ</span></div><button id="kick-button" class="touch-action kick-button" aria-label="Αμυντική κλωτσιά για απώθηση κοντινού αντιπάλου" hidden disabled>${QM}<span>ΚΛΩΤΣΙΑ</span></button><button id="fire-button" class="touch-action fire-button" aria-label="Πάτησε για βολή πέτρας από τον καταπέλτη" hidden>${_d}<span>ΠΕΤΡΑ</span></button><div class="stick-zone aim-zone" hidden><div id="aim-stick" class="stick" aria-label="Στόχευση καταπέλτη"><div class="fire-ring"></div><div class="stick-inner"></div><div class="stick-knob"></div><span class="aim-center" aria-hidden="true">+</span></div><span class="stick-caption">ΚΑΤΕΥΘΥΝΣΗ · ΙΣΧΥΣ</span></div><div id="touch-aim-hint"><span class="touch-aim-symbol" aria-hidden="true">⊕</span><b id="touch-aim-copy">ΣΥΡΕ ΓΙΑ ΣΤΟΧΕΥΣΗ</b><span id="auto-fire-status">ΑΥΤΟΜΑΤΗ ΒΟΛΗ</span></div><button id="layout-button" class="layout-button" aria-label="Μετακίνηση χειριστηρίων"><b aria-hidden="true">↔</b><span>ΘΕΣΕΙΣ</span></button><div id="layout-hint" hidden>Σύρε τα χειριστήρια στη θέση σου.</div></div>
  <section id="arcade-menu" class="menu"><div id="menu-main" class="menu-buttons"><div id="round-actions" class="round-actions" role="group" aria-label="Γύρος"><button id="new-round-button" class="round-action round-action-new" type="button">${t_}<span>ΝΕΟΣ ΓΥΡΟΣ</span></button><button id="play-button" class="round-action round-action-resume" type="button" disabled>${bd}<span>ΣΥΝΕΧΕΙΑ</span></button></div><button id="settings-button" class="art-button settings-button">${e_}<span>ΡΥΘΜΙΣΕΙΣ</span></button></div><div id="settings-panel" class="settings-panel" hidden><h2>Ρυθμίσεις</h2><div class="settings-grid"><label>Ήχος <input id="volume" type="range" min="0" max="100" value="${Math.round(this.settings.volume*100)}"></label><label>Γραφικά <select id="quality"><option value="low">Ομαλή κίνηση</option><option value="high">Υψηλά</option></select></label></div><div class="camera-settings-heading"><h3>Κάμερα</h3><button id="camera-reset" type="button">ΕΠΑΝΑΦΟΡΑ</button></div><div class="settings-grid camera-settings-grid"><label for="camera-zoom"><span>Zoom <output id="camera-zoom-value" for="camera-zoom">100%</output></span><input id="camera-zoom" type="range" min="70" max="150" step="5" value="100"></label><label for="camera-fov"><span>Οπτικό πεδίο <output id="camera-fov-value" for="camera-fov">52°</output></span><input id="camera-fov" type="range" min="40" max="80" step="1" value="52" aria-label="Οπτικό πεδίο FOV σε μοίρες"></label><label class="camera-sensitivity-label" for="camera-sensitivity"><span>Ευαισθησία <output id="camera-sensitivity-value" for="camera-sensitivity">100%</output></span><input id="camera-sensitivity" type="range" min="25" max="200" step="5" value="100" aria-label="Ευαισθησία ποντικιού και θέας"></label></div><button id="settings-back" class="art-button compact">ΠΙΣΩ</button></div><div id="result-panel" class="result-panel" hidden><span class="result-kicker">FROG • FLY FRENZY</span><h1 id="result-title"></h1><p id="result-copy"></p><button id="replay-button" class="art-button play-button">${bd}<span>ΠΑΙΞΕ ΞΑΝΑ</span></button><button id="result-settings" class="plain-button">Ρυθμίσεις</button></div><span class="version">FROG ${Xl}</span></section>`,document.body.append(this.ui),this.$=t=>this.ui.querySelector("#"+t),this.$("quality").value=this.settings.quality,this.$("view-button").onclick=t=>this.toggleView(t),ga(this.$("play-button"),t=>this.startOrResume(t)),ga(this.$("pause-button"),()=>this.pause(),void 0,{allowSecondary:!0}),this.$("settings-button").onclick=()=>this.settingsMenu(),this.$("result-settings").onclick=()=>this.settingsMenu(),this.$("settings-back").onclick=()=>{this.$("arcade-menu").classList.remove("settings-open"),this.$("settings-panel").hidden=!0,this.mode==="result"?this.$("result-panel").hidden=!1:this.$("menu-main").hidden=!1},ga(this.$("replay-button"),t=>this.startNew(t)),ga(this.$("new-round-button"),t=>this.startNew(t)),this.$("volume").oninput=t=>{this.settings.volume=Number(t.target.value)/100,this.sound.volume=this.settings.volume,Kr(ha,JSON.stringify(this.settings))},this.$("quality").onchange=t=>{this.settings.quality=t.target.value,this.applyQuality(),Kr(ha,JSON.stringify(this.settings))},this.touchLayout=HM({root:this.$("touch-controls"),movePad:this.ui.querySelector(".move-zone"),aimPad:this.ui.querySelector(".aim-zone"),fireButton:this.$("fire-button"),toggleButton:this.$("layout-button"),storageKey:"frog-touch-layout-v1",onEditingChange:t=>{this.layoutEditing=t,this.clearInputs(),this.accumulator=0,t?this.sound.pause():this.running&&this.sound.resume()},announce:t=>this.message(t,2)})}showTitle(){this.running=!1,this.mode="title",this.updateRoundActions(),this.ui.classList.add("in-menu")}updateRoundActions(){this.$("play-button").disabled=!(this.mode==="pause"&&this.state.status==="playing"||this.saved?.status==="playing")}settingsMenu(){this.$("arcade-menu").classList.add("settings-open"),this.$("menu-main").hidden=!0,this.$("result-panel").hidden=!0,this.$("settings-panel").hidden=!1}startOrResume(t){if(!this.running){if(this.mode==="pause"&&this.state.status==="playing"){this.go(t);return}this.saved?.status==="playing"&&(this.state=this.saved,this.saved=null,this.resetCamera(),this.buildActors(),this.go(t))}}toggleView(t){this.stopCameraDrag(),this.actions.fire=!1,this.mouse.valid=!1,this.viewMode=this.viewMode==="chase3d"?"overview":"chase3d",this.$("view-button").textContent=this.viewMode==="chase3d"?"ΠΙΣΩ 3D · C":"ΚΑΤΟΨΗ · C",this.$("view-button").setAttribute("aria-label",this.viewMode==="chase3d"?"Αλλαγή σε κεντραρισμένη κάτοψη":"Αλλαγή σε κάμερα πίσω από τον βάτραχο"),this.cameraReady=!1,this.viewMode==="overview"?this.releaseMouseLook():(this.centerAim(),this.running&&(t?.pointerType==="mouse"||(this.mouseControl||t?.type==="keydown")&&!["touch","pen"].includes(t?.pointerType))&&this.requestMouseLook())}startNew(t){this.running||(this.storageAlertUntil=-1/0,this.saved=null,this.state=Kc(731+Math.floor(Math.random()*1e5)),this.resetCamera(),this.clearEffects(),this.buildActors(),this.go(t),this.message("60 μύγες έτοιμες!",1.6))}resetCamera(){const t=this.state.actors[0],e=_M(t);this.cameraYaw=Math.atan2(e.x,e.z),this.cameraPitch=is.pitch,this.cameraReady=!1,this.mouse.valid=!1,this.aim={x:t.aimX,z:t.aimZ},this.stopCameraDrag()}beginCameraDrag(t){if(this.cameraDrag)return;this.mouseControl=!1,this.viewMode==="overview"?this.captureMouseAim(t):this.centerAim(),this.cameraDrag={id:t.pointerId,type:t.pointerType,x:t.clientX,y:t.clientY};const e=this.renderer.domElement;e.setPointerCapture(t.pointerId),e.classList.add("camera-dragging")}stopCameraDrag(){const t=this.cameraDrag;this.cameraDrag=null,this.autoFireTargetId=null;const e=this.renderer?.domElement;t&&e?.hasPointerCapture?.(t.id)&&e.releasePointerCapture(t.id),e?.classList.remove("camera-dragging")}go(t){t?.pointerType==="touch"||t?.pointerType==="pen"?this.mouseControl=!1:t?.pointerType==="mouse"&&(this.mouseControl=!0),this.$("arcade-menu").classList.remove("settings-open"),this.clearInputs(),this.mouseControl&&Number.isFinite(t?.clientX)&&Number.isFinite(t?.clientY)&&(this.freeMousePoint={x:t.clientX,y:t.clientY}),this.accumulator=0,this.last=performance.now(),this.running=!0,this.mode="play",this.$("arcade-menu").hidden=!0,this.$("settings-panel").hidden=!0,this.$("result-panel").hidden=!0,this.$("menu-main").hidden=!1,this.$("arcade-hud").hidden=!1,this.$("desktop-help").hidden=this.touch,this.$("touch-controls").hidden=!this.touch,this.ui.classList.remove("in-menu"),this.sound.resume(),this.updateHUD(),this.touchLayout?.refresh(),this.persist(),this.viewMode==="chase3d"&&(this.centerAim(),this.mouseControl&&this.requestMouseLook())}pause(){this.running&&(this.touchLayout?.setEditing(!1),this.running=!1,this.mode="pause",this.clearInputs(),this.releaseMouseLook(),this.persist(),this.sound.pause(),this.$("arcade-menu").hidden=!1,this.$("menu-main").hidden=!1,this.$("settings-panel").hidden=!0,this.updateRoundActions(),this.ui.classList.add("in-menu"))}finish(){this.touchLayout?.setEditing(!1),this.running=!1,this.mode="finishing",this.resultAt=this.elapsed+.85,this.clearInputs(),this.releaseMouseLook(),this.persist()}showResult(){this.running=!1,this.mode="result",this.clearInputs(),this.persist();const t=this.state.status==="won";this.sound.play(t?"win":"lost"),this.$("arcade-menu").hidden=!1,this.$("menu-main").hidden=!0,this.$("result-panel").hidden=!1,this.$("result-title").textContent=t?"Η ΤΕΛΕΥΤΑΙΑ ΑΠΟΘΗΚΗ ΕΙΝΑΙ ΔΙΚΗ ΣΟΥ!":"Η ΑΠΟΘΗΚΗ ΣΟΥ ΚΑΤΑΣΤΡΑΦΗΚΕ",this.$("result-copy").textContent=t?`${this.state.stats.kos} νοκ άουτ · ${this.state.stats.shots} βολές · ${Math.floor(this.state.time)}″ μάχης`:"Κράτησε την είσοδο, διέκοψε τους εισβολείς με μία εύστοχη βολή και ανεφοδιάσου πριν ξαναβγείς.",this.ui.classList.add("in-menu")}persist(){return this.mode==="title"?!1:Kr(ca,yM(this.state))}clearInputs(){if(this.lastMovement={x:0,z:0},this.freeMousePoint=null,this.stopMouseFireCapture(),this.renderer?.domElement.classList.remove("mouse-aiming"),this.currentAimPreview=null,this.currentAimScreen=null,this.aimGuide&&(this.aimGuide.visible=!1),this.aimReticle&&(this.aimReticle.visible=!1),this.targetRing&&(this.targetRing.visible=!1),this.keys.clear(),this.actions={fire:!1,kick:!1,sabotage:!1},this.aimStrength=0,this.mouse.valid=!1,this.mouse.inside=!1,this.move={x:0,z:0},this.pointers.clear(),this.stopCameraDrag(),this.ui){for(const t of this.ui.querySelectorAll(".stick-knob"))t.style.transform="translate(-50%,-50%)";this.$("aim-stick").classList.remove("firing"),this.$("fire-button")?.classList.remove("firing")}}pointerLocked(){return document.pointerLockElement===this.renderer.domElement}requestMouseLook(){this.mouseControl=!0,this.mouseLookSession?.request()}releaseMouseLook(){this.mouseLookSession?.release()}stopMouseFireCapture(){const t=this.mouseFirePointer;this.mouseFirePointer=null;const e=this.renderer?.domElement;t!=null&&e?.hasPointerCapture?.(t)&&e.releasePointerCapture(t)}turnFreeMouse(t){const e={x:t.clientX,y:t.clientY};if(!Number.isFinite(e.x)||!Number.isFinite(e.y))return;const n=this.freeMousePoint;this.freeMousePoint=e,n&&this.turnLook(e.x-n.x,e.y-n.y)}centerAim(){this.mouse.x=this.w/2,this.mouse.y=this.h/2,this.mouse.valid=!0}turnLook(t,e,n=!1){if(!this.running||this.layoutEditing||this.viewMode!=="chase3d")return;const s=md({yaw:this.cameraYaw,pitch:this.cameraPitch},t,e,{sensitivity:di.sensitivity*this.settings.cameraSensitivity*(n?1.6:1)});this.cameraYaw=s.yaw,this.cameraPitch=s.pitch,this.centerAim()}bindInputs(){addEventListener("keydown",s=>{if(!s.target.matches("input,select")){if(s.code==="Escape"){if(s.preventDefault(),this.layoutEditing){this.touchLayout.setEditing(!1);return}this.running&&this.pause();return}if(!(!this.running||this.layoutEditing)){if(s.code==="KeyC"&&!s.repeat){s.preventDefault(),this.toggleView(s);return}(KM.has(s.code)||["KeyQ","KeyE"].includes(s.code))&&(s.preventDefault(),this.keys.add(s.code))}}}),addEventListener("keyup",s=>this.keys.delete(s.code));const t=this.renderer.domElement;this.mouseLookSession=$M({canvas:t,active:()=>this.running&&!this.layoutEditing&&this.viewMode==="chase3d",onLock:()=>{this.stopMouseFireCapture(),this.freeMousePoint=null,this.centerAim()},onUnexpectedUnlock:()=>{this.actions.fire=!1,this.pause()}}),t.addEventListener("pointermove",s=>{if(!(!this.running||this.layoutEditing)){if(s.pointerType==="mouse"){this.pointerLocked()?this.turnLook(s.movementX,s.movementY):this.viewMode==="overview"?this.captureMouseAim(s):this.turnFreeMouse(s);return}this.cameraDrag?.id===s.pointerId&&(s.preventDefault(),this.viewMode==="overview"?this.captureMouseAim(s):this.turnLook(s.clientX-this.cameraDrag.x,s.clientY-this.cameraDrag.y,!0),this.cameraDrag.x=s.clientX,this.cameraDrag.y=s.clientY)}}),t.addEventListener("pointerdown",s=>{if(!(!this.running||this.layoutEditing)){if(s.preventDefault(),s.pointerType==="touch"||s.pointerType==="pen"){this.beginCameraDrag(s);return}s.button===0&&(this.viewMode==="chase3d"?(this.centerAim(),this.pointerLocked()||(this.freeMousePoint={x:s.clientX,y:s.clientY},this.mouseFirePointer=s.pointerId,t.setPointerCapture(s.pointerId),this.requestMouseLook())):this.captureMouseAim(s),this.actions.fire=!0)}}),addEventListener("pointerup",s=>{this.cameraDrag?.id===s.pointerId&&this.stopCameraDrag(),s.pointerType==="mouse"&&s.button===0&&(this.actions.fire=!1,this.stopMouseFireCapture())}),t.addEventListener("pointercancel",s=>{this.cameraDrag?.id===s.pointerId&&this.stopCameraDrag(),this.stopMouseFireCapture(),this.actions.fire=!1,this.freeMousePoint=null}),t.addEventListener("pointerenter",s=>{s.pointerType==="mouse"&&!this.pointerLocked()&&(this.freeMousePoint={x:s.clientX,y:s.clientY})}),t.addEventListener("pointerleave",s=>{s.pointerType==="mouse"&&(this.freeMousePoint=null,this.viewMode==="overview"&&!s.buttons&&(this.mouse.valid=!1,t.classList.remove("mouse-aiming")))}),t.addEventListener("lostpointercapture",s=>{this.cameraDrag?.id===s.pointerId&&this.stopCameraDrag()}),t.addEventListener("contextmenu",s=>s.preventDefault());const e=(s,r)=>{const o=this.$(s),a=o.querySelector(".stick-knob");let l=null;const c=u=>{const d=o.getBoundingClientRect(),f=(u.clientX-d.left-d.width/2)/(d.width/2),g=(u.clientY-d.top-d.height/2)/(d.height/2),m=lM(f,g),x=Math.hypot(f,g),p=x>1?1/x:1;a.style.transform=`translate(-50%,-50%) translate(${f*p*d.width*.31}px,${g*p*d.height*.31}px)`,r==="move"?this.move={x:m.x,z:m.z}:(this.aimStrength=Math.min(1,x),x>.08&&(this.stickAim={x:f/x,z:g/x})),this.viewMode==="chase3d"?this.centerAim():r==="aim"&&(this.mouse.valid=!1)};o.onpointerdown=u=>{!this.running||this.layoutEditing||o.closest("[hidden]")||l!==null&&this.pointers.has(r)||(u.preventDefault(),l=u.pointerId,this.pointers.set(r,l),o.setPointerCapture(u.pointerId),c(u))},o.onpointermove=u=>{!this.layoutEditing&&l===u.pointerId&&this.pointers.get(r)===l&&(u.preventDefault(),c(u))};const h=u=>{u.pointerId===l&&(l=null,this.pointers.delete(r),a.style.transform="translate(-50%,-50%)",r==="move"?this.move={x:0,z:0}:(this.aimStrength=0,o.classList.remove("firing")))};o.onpointerup=h,o.onpointercancel=h,o.onlostpointercapture=h};e("move-stick","move"),e("aim-stick","aim");const n=(s,r)=>{const o=this.$(s);let a=null,l=null;o.onpointerdown=h=>{!this.running||this.layoutEditing||o.disabled||o.closest("[hidden]")||(h.preventDefault(),a=h.pointerId,l={x:h.clientX,y:h.clientY},o.setPointerCapture(h.pointerId),this.viewMode==="chase3d"&&this.centerAim(),this.actions[r]=!0)},o.onpointermove=h=>{r!=="fire"||a!==h.pointerId||h.pointerType!=="touch"||!this.actions.fire||(this.turnLook(h.clientX-l.x,h.clientY-l.y,!0),l={x:h.clientX,y:h.clientY})};const c=h=>{h.pointerId===a&&(a=null,l=null,this.actions[r]=!1)};o.onpointerup=c,o.onpointercancel=c,o.onlostpointercapture=c};n("kick-button","kick"),n("fire-button","fire"),n("sabotage-button","sabotage"),addEventListener("blur",()=>{this.clearInputs(),this.running&&this.pause()}),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.clearInputs(),this.pause(),this.sound.pause())}),addEventListener("beforeunload",()=>this.persist()),addEventListener("resize",()=>{this.clearInputs(),this.resize()})}applyQuality(){const t=this.settings.quality==="low";this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,t?1:1.5));for(const e of this.models)e.setRenderLOD(t?1:0);this.resize()}resize(){const t=innerWidth,e=innerHeight;this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.cameraReady=!1,this.labels.width=t,this.labels.height=e,this.w=t,this.h=e,this.touchLayout?.refresh()}captureMouseAim(t){this.mouse.x=t.clientX,this.mouse.y=t.clientY,this.mouse.valid=!0,this.mouse.inside=!0,this.updateMouseTarget()}movementInput(){return this.lastMovement=da(this.move.x+(this.keys.has("KeyD")||this.keys.has("ArrowRight")?1:0)-(this.keys.has("KeyA")||this.keys.has("ArrowLeft")?1:0),this.move.z+(this.keys.has("KeyS")||this.keys.has("ArrowDown")?1:0)-(this.keys.has("KeyW")||this.keys.has("ArrowUp")?1:0),this.camera.position,this.focus),this.lastMovement}updateMouseTarget(){if(this.viewMode==="chase3d"&&this.centerAim(),!this.mouse.valid)return;const t=this.state.actors[0];if(this.mouseNdc.set(this.mouse.x/this.w*2-1,1-this.mouse.y/this.h*2),this.mouseRay.setFromCamera(this.mouseNdc,this.camera),t.catapultId){if(this.mousePlane.constant=-this.ground(t.x,t.z)-.9,this.mouseRay.ray.intersectPlane(this.mousePlane,this.mousePoint))this.mouse.target={x:this.mousePoint.x,y:this.mousePoint.y,z:this.mousePoint.z};else{const u=this.mouseRay.ray.direction,d=Math.hypot(u.x,u.z),f=da(0,-1,this.camera.position,this.focus);this.mouse.target={x:t.x+(d>1e-6?u.x/d:f.x)*Pe.maxRange,y:this.ground(t.x,t.z),z:t.z+(d>1e-6?u.z/d:f.z)*Pe.maxRange}}this.mouse.direction=null,this.mouse.targetId=null;return}const e=jc(this.state,t),n=this.mouseRay.ray,s=jM,r=e.x-n.origin.x,o=e.y-n.origin.y,a=e.z-n.origin.z,l=Math.max(0,r*n.direction.x+o*n.direction.y+a*n.direction.z),c=hM(this.state,n.origin,n.direction,Math.hypot(r,o,a)+s,{ignoreId:t.id,solidFrom:l}),h=YM({rayOrigin:n.origin,rayDirection:n.direction,muzzle:e,range:s,hits:c?[c]:[]});this.mouse.target=h.target,this.mouse.direction=h.direction,this.mouse.distance=h.distance,this.mouse.targetId=c?.targetId??null}autoFireTargetVisible(t){if(!t||this.mouse.targetId!==t||!this.mouse.target)return!1;const e=this.mouseRay.ray,n=this.mouse.target,s=(n.x-e.origin.x)**2+(n.y-e.origin.y)**2+(n.z-e.origin.z)**2;for(const r of this.basesView.bases.values()){if(r.roof.visible&&r.roofMaterial.opacity>.5&&e.intersectsBox(r.roofBounds)){for(const o of r.roofTriangles)if(e.intersectTriangle(o.a,o.b,o.c,!1,this.mousePoint)&&this.mousePoint.distanceToSquared(e.origin)<s-.01)return!1}if(r.cabin.visible&&r.stockMaterials[0].opacity>.5&&e.intersectBox(r.stockBounds,this.mousePoint)&&this.mousePoint.distanceToSquared(e.origin)<s-.01)return!1}return!0}aimFromScreen(t,e){const n=this.state.actors[0],s=this.ground(n.x,n.z)+.9,r=this.project(n.x,s,n.z),o=Math.min(this.w,this.h)*.34,a=new en,l=new Cl;if(l.setFromCamera(new Wt((r.x+t*o)/this.w*2-1,1-(r.y+e*o)/this.h*2),this.camera),l.ray.intersectPlane(new pi(ec,-s),a)){const c=a.x-n.x,h=a.z-n.z,u=Math.hypot(c,h);if(u>.05&&Number.isFinite(u))return{x:c/u,z:h/u,distance:u}}return da(t,e,this.camera.position,this.focus)}currentInput(){if(this.layoutEditing)return this.autoFireTargetId=null,{};const t=this.state.actors[0],e=this.pointers.has("aim")&&this.aimStrength>.08,n=this.viewMode==="chase3d"||this.actions.fire||e||this.mouse.valid;if(e&&this.viewMode==="overview"&&(this.aim={...da(this.stickAim.x,this.stickAim.z,this.camera.position,this.focus),distance:14}),this.updateMouseTarget(),this.mouse.valid&&n&&this.mouse.target)if(!t.catapultId&&this.mouse.direction)this.aim={...this.mouse.direction,distance:this.mouse.distance};else{const r=this.mouse.target.x-t.x,o=this.mouse.target.z-t.z,a=Math.hypot(r,o);a>.1&&(this.aim={x:r/a,z:o/a,distance:a})}const s=this.movementInput();return{mx:s.x,mz:s.z,ax:this.aim.x,ay:this.aim.y,az:this.aim.z,aiming:n,fire:this.actions.fire,kick:this.actions.kick||this.keys.has("KeyQ"),sabotage:!t.catapultId&&(this.actions.sabotage||this.keys.has("KeyE"))}}installAutoFire(){const t=this.currentInput.bind(this);this.currentInput=()=>{const e=t(),n=this.cameraDrag?.type==="touch"||this.cameraDrag?.type==="pen",s=ZM({state:this.state,actor:this.state.actors[0],input:e,active:this.running&&!this.layoutEditing,aiming:n&&!!this.mouse.targetId});return this.autoFireTargetId=s.fire&&this.autoFireTargetVisible(s.targetId)?s.targetId:null,this.autoFireTargetId&&(e.fire=!0),e}}message(t,e=1.5){this.$("callout").textContent=t,this.calloutUntil=this.elapsed+e}makeFlyBullet(){const t=new te,e=new Jt(this.shared.sphere,this.materials.shot);e.scale.set(.12,.1,.19),t.add(e);for(const n of[-1,1]){const s=new Jt(this.shared.wing,this.materials.wing);s.position.set(n*.13,.07,0),s.scale.set(.17,.018,.09),t.add(s)}return this.scene.add(t),t}consumeEvents(){for(const t of this.state.events){this.artilleryView?.consumeEvent(t);const e=this.state.actors.findIndex(r=>r.id===t.id),n=this.state.actors[e],s=this.models[e];if(t.type==="tongue"&&n){const r=this.tongues.get(n.id);r&&this.scene.remove(r.mesh);const o=new Jt(this.shared.cylinder,this.materials.tongue);this.scene.add(o),this.tongues.set(n.id,{mesh:o,start:this.elapsed,x:t.x,z:t.z})}if(t.type==="shot"&&n?.id==="player"&&this.sound.play("shot"),t.type==="hit"&&s){s.mesh.material.emissive?.set("#ffffff");const r=s.group.rotation.y,o=Math.cos(r),a=Math.sin(r);s.setImpact({x:o*t.dx-a*t.dz,z:a*t.dx+o*t.dz,strength:1.3,duration:n.knockUp>0?.42:.27}),this.impactEffects.hit({...t,height:Number.isFinite(t.y)?t.y:this.ground(t.x,t.z)+n.height+.75,heavy:n.knockUp>0}),this.shake=Math.max(this.shake,n.id==="player"?.16:.025),t.owner==="player"&&n.id!=="player"?(this.hitConfirmUntil=this.elapsed+.2,this.lastPlayerHit={id:n.id,x:t.x,y:t.y,z:t.z,time:this.elapsed},this.sound.play("hitConfirm")):n.id==="player"&&this.sound.play("hit")}if(t.type==="dizzy"&&(this.addText("ΖΑΛΗ!",n.x,n.z,"#ffe375",1),this.sound.play("dizzy"),n.id!=="player"&&this.message("ΖΑΛΙΣΤΗΚΕ! ΣΥΝΕΧΙΣΕ ΤΙΣ ΕΥΣΤΟΧΕΣ ΒΟΛΕΣ.",2)),t.type==="ko"&&(this.koTimes.set(n.id,{time:this.elapsed,dx:t.dx,dz:t.dz}),this.addText("ΝΟΚ ΑΟΥΤ!",n.x,n.z,"#ffe791",1.4),this.sound.play("ko"),this.shake=.32,this.makeSplat({...t,wall:!1})),t.type==="respawn"&&(this.koTimes.delete(t.id),t.id==="player"&&(this.clearInputs(),this.resetCamera(),this.message("Επέστρεψες με 60 μύγες!",2))),t.type==="sabotageStart"&&(t.id==="player"?this.elapsed>=this.storageAlertUntil&&(this.sound.play("storageAlert"),this.storageAlertUntil=this.elapsed+3):t.by==="player"&&this.message("Κράτα μέχρι το τέλος · οι βολές εναντίον σου διακόπτουν.",2)),t.type==="sabotageInterrupted"&&t.by==="player"&&this.message(t.reason==="hit"?"Σε χτύπησαν! Η καταστροφή διακόπηκε.":"Η καταστροφή διακόπηκε.",1.5),t.type==="baseDestroyed"){const r=Wn.find(o=>o.id===t.baseId);r&&this.addText("ΑΠΟΘΗΚΗ ΚΑΤΑΣΤΡΑΦΗΚΕ",r.stock.x,r.stock.z,"#ffc689",2),this.sound.play("stoneImpact"),this.shake=.2}t.type==="splat"&&this.makeSplat(t),t.type==="stoneShot"&&this.sound.play("stoneShot"),t.type==="land"&&t.stone&&(this.impactEffects.landing(t),Math.hypot(t.x-this.state.actors[0].x,t.z-this.state.actors[0].z)<10&&this.sound.play("land")),t.type==="stoneImpact"&&(this.sound.play("stoneImpact"),this.impactEffects.stone(t),Math.hypot(t.x-this.state.actors[0].x,t.z-this.state.actors[0].z)<7&&(this.shake=Math.max(this.shake,.16))),t.type==="battle"&&this.message("ΜΑΧΗ!",1.2)}}addText(t,e,n,s,r){this.fx.push({text:t,x:e,z:n,color:s,life:r,start:this.elapsed}),this.fx.length>28&&this.fx.shift()}burst(t,e){for(let n=0;n<9;n++){const s=new Jt(this.shared.sphere,this.materials.shot);s.scale.setScalar(.06+Math.random()*.07),s.position.set(t,this.ground(t,e)+1,e),this.scene.add(s),this.particles.push({mesh:s,start:this.elapsed,v:new en((Math.random()-.5)*6,2+Math.random()*4,(Math.random()-.5)*6)})}for(;this.particles.length>90;)this.particles.shift().mesh.removeFromParent()}makeSplat(t){const e=[];for(let l=0;l<20;l++){const c=l/20*6.283,h=(l+1)/20*6.283,u=.4+l%3*.14,d=.4+(l+1)%3*.14;e.push(0,0,0,Math.cos(c)*u,Math.sin(c)*u,0,Math.cos(h)*d,Math.sin(h)*d,0)}const s=new Se;s.setAttribute("position",new Vt(e,3));const r=this.materials.ink.clone();r.color.set(["#d2ed4d","#f5bf52","#c6ef78"][this.splats.length%3]);const o=new Jt(s,r),a=this.ground(t.x,t.z);if(t.normal&&Number.isFinite(t.y)&&(t.wall||t.kind==="terrain")){const l=new en(t.normal.x,t.normal.y,t.normal.z).normalize();o.position.set(t.x,t.y,t.z).addScaledVector(l,.025-ln.radius),o.quaternion.setFromUnitVectors(new en(0,0,1),l)}else if(t.wall){const l=new en(t.dx,t.dy||0,t.dz).normalize(),c=new en(t.x,Number.isFinite(t.y)?t.y:a+.9,t.z).addScaledVector(l,-1.5);for(const u of this.obstacleMeshes)u.updateMatrixWorld();const h=new Cl(c,l,0,5).intersectObjects(this.obstacleMeshes,!1)[0];if(h){const u=h.face.normal.clone().transformDirection(h.object.matrixWorld);o.position.copy(h.point).addScaledVector(u,.025),o.quaternion.setFromUnitVectors(new en(0,0,1),u)}else o.position.set(t.x,a+.05,t.z),o.rotation.x=-Math.PI/2}else o.position.set(t.x,a+.045,t.z),o.rotation.x=-Math.PI/2;if(this.scene.add(o),this.splats.push({mesh:o,start:this.elapsed}),this.splats.length>90){const l=this.splats.shift();l.mesh.removeFromParent(),l.mesh.geometry.dispose(),l.mesh.material.dispose()}}clearEffects(){this.impactEffects?.clear();for(const t of this.particles)t.mesh.removeFromParent();this.particles=[];for(const t of this.splats)t.mesh.removeFromParent(),t.mesh.geometry.dispose(),t.mesh.material.dispose();this.splats=[];for(const t of this.bulletMeshes.values())t.removeFromParent();this.bulletMeshes.clear();for(const t of this.tongues.values())t.mesh.removeFromParent();this.tongues.clear(),this.fx=[],this.koTimes.clear()}updateHUD(){const t=this.state.actors[0],e=Math.round(t.ammo/Rt.capacity*100),n=Jc(this.state,t),s=Ns(this.state,t),r=this.state.bases.filter(E=>!E.destroyed).length,o=Wn.find(E=>E.owner===t.id)?.stock,a=s&&!s.destroyed&&o&&Math.hypot(t.x-o.x,t.z-o.z)<=Rt.pickupRange&&ks(t,o),l=Xa(t)&&t.revealedTime<=0,c=qa(this.state,t),h=this.state.bases.find(E=>!E.destroyed&&E.attackerId===t.id),u=this.$("sabotage-button");u.hidden=!this.running||this.layoutEditing||this.state.phase!=="battle"||t.ko||t.catapultId||!c,u.disabled=t.dizzyTime>0||t.knockUp>0||t.hit>0||t.sabotageRecovery>0,u.querySelector("span").textContent=h?`${Math.max(0,Rt.sabotageSeconds-h.progress).toFixed(1)}″`:this.touch?"ΚΡΑΤΑ · 10″":"ΚΡΑΤΑ E · 10″",this.$("sabotage-status").hidden=!this.running||!h;const d=h?h.progress/Rt.sabotageSeconds:0;this.$("sabotage-copy").textContent="ΚΑΤΑΣΤΡΟΦΗ ΑΠΟΘΗΚΗΣ",this.$("sabotage-fill").style.transform=`scaleX(${d})`,this.$("sabotage-track").setAttribute("aria-valuenow",String(Math.round(d*100)));const f=this.state.catapults?.find(E=>E.id===t.catapultId),g=uf(this.state,t),m=this.$("catapult-button");m.hidden=!this.running||t.ko||!f&&(!g||this.state.phase!=="battle"),m.disabled=t.dizzyTime>0||t.knockUp>0,m.querySelector("span").textContent=f?"ΕΞΟΔΟΣ":"ΧΡΗΣΗ",m.setAttribute("aria-label",f?"Έξοδος από τον καταπέλτη":"Χρήση κοντινού καταπέλτη"),m.classList.toggle("ready",!!f),this.$("catapult-status").hidden=!f||!this.running||this.layoutEditing,this.$("catapult-status").textContent=f?f.cooldown>0?`ΦΟΡΤΩΝΕΙ ΠΕΤΡΑ · ${f.cooldown.toFixed(1)}″`:this.touch?"ΣΗΜΑΔΕΨΕ · ΠΑΤΑ ΠΕΤΡΑ":"ΠΕΤΡΑ ΕΤΟΙΜΗ · ΑΡΙΣΤΕΡΟ ΚΛΙΚ":"",this.$("aim-stick").classList.toggle("catapult",!!f),this.ui.querySelector(".aim-zone .stick-caption").textContent=f?"ΚΑΤΕΥΘΥΝΣΗ · ΙΣΧΥΣ":"ΣΤΟΧΕΥΣΗ",this.ui.querySelector(".move-zone").classList.toggle("mounted",!!f),this.lastMounted!==!!f&&(this.lastMounted=!!f,this.actions.fire=!1,this.pointers.delete("aim"),this.aimStrength=0,this.$("aim-stick").querySelector(".stick-knob").style.transform="translate(-50%,-50%)"),this.ui.querySelector(".aim-zone").hidden=!f,this.$("fire-button").hidden=!f,this.$("fire-button").disabled=!this.layoutEditing&&(t.ko||t.dizzyTime>0||t.knockUp>0),this.$("fire-button").classList.toggle("firing",this.actions.fire),this.$("fire-button").classList.toggle("empty",f?f.cooldown>0:t.ammo===0);const x=this.$("touch-aim-hint");x.hidden=!this.running||this.layoutEditing||!!f,x.classList.toggle("aiming",!!this.cameraDrag),x.classList.toggle("firing",!!this.autoFireTargetId),this.$("touch-aim-copy").textContent=this.viewMode==="overview"?"ΣΥΡΕ ΠΑΝΩ ΣΤΟΝ ΣΤΟΧΟ":"ΣΥΡΕ ΓΙΑ ΣΤΟΧΕΥΣΗ",this.$("auto-fire-status").textContent=this.autoFireTargetId?"ΒΑΛΛΕΙ ΑΥΤΟΜΑΤΑ":t.ammo===0?"ΒΡΕΣ ΜΥΓΕΣ ΓΙΑ ΒΟΛΗ":"ΑΥΤΟΜΑΤΗ ΒΟΛΗ",this.$("ammo-count").textContent=`${t.ammo} / ${Rt.capacity}`,this.$("ammo-percent").textContent=e+"%",this.$("ammo-fill").style.transform=`scaleX(${e/100})`,this.$("ammo-track").setAttribute("aria-valuenow",String(e)),this.$("ammo-state").textContent=t.ko?"Επιστρέφεις στην αποθήκη":t.ammo===Rt.capacity?"ΓΕΜΑΤΟΣ!":a?"ΑΠΟΘΗΚΗ ∞ · ΓΕΜΙΖΕΙ…":t.tongue>0?"ΜΑΖΕΥΕΙ ΜΥΓΕΣ…":t.ammo===0?"Γύρνα στην αποθήκη ή βρες σμήνος":"Μύγες για τις επόμενες βολές",this.$("ko-count").textContent=`${r} / 3`;for(const E of this.$("base-dots").children){const w=this.state.bases.find(A=>A.owner===E.dataset.owner);E.classList.toggle("destroyed",!!w?.destroyed),E.classList.toggle("attacked",!!w?.attackerId),E.title=(E.dataset.owner==="player"?"Η αποθήκη σου":E.dataset.owner==="rival-1"?"Κόκκινη αποθήκη":"Μωβ αποθήκη")+(w?.destroyed?" · κατεστραμμένη":w?.attackerId?" · υπό επίθεση":" · άθικτη")}this.$("round-status").hidden=!this.running||!this.layoutEditing&&!t.ko&&this.state.phase==="battle",this.$("round-status").classList.toggle("warmup",this.state.phase!=="battle"),this.$("round-time").textContent=this.layoutEditing?"↔":t.ko?`${Math.ceil(t.respawnTime||0)}″`:this.state.phase!=="battle"?`${Math.ceil(this.state.intro)}″`:`${r}`,this.$("round-copy").textContent=this.layoutEditing?this.touch?"ΡΥΘΜΙΣΗ ΘΕΣΕΩΝ":"ΡΥΘΜΙΣΗ ΘΕΣΕΩΝ · Το παιχνίδι περιμένει":t.ko?this.touch?"ΕΠΙΣΤΡΟΦΗ":"ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΒΑΣΗ":this.state.phase!=="battle"?this.touch?"ΠΡΟΕΤΟΙΜΑΣΙΑ":"ΠΡΟΕΤΟΙΜΑΣΙΑ · Προστάτεψε την αποθήκη σου":"";const p=!!s?.attackerId&&!s.destroyed,v=this.running&&!this.layoutEditing&&p;this.ui.classList.toggle("storage-threat",v),this.$("base-status").hidden=!this.running||this.layoutEditing||!p&&!l,this.$("base-status").classList.toggle("threat",p);const y=p?"ΕΠΙΘΕΣΗ ΣΤΗΝ ΑΠΟΘΗΚΗ ΣΟΥ":l?"ΚΡΥΜΜΕΝΟΣ ΣΤΑ ΔΕΝΤΡΑ":"";this.$("base-warning-title").textContent!==y&&(this.$("base-warning-title").textContent=y),this.$("base-warning-detail").textContent=p?`${Math.max(0,Rt.sabotageSeconds-s.progress).toFixed(1)}″ μέχρι καταστροφή · Χτύπησέ τον!`:l?"Πιο αργά άλματα":"";const M=!t.ko&&!!n&&this.state.phase==="battle"&&!t.catapultId&&t.dizzyTime<=0&&t.knockUp<=0&&t.kick<=0&&(t.kickCooldown||0)<=0;this.$("kick-button").hidden=!this.running||t.ko||this.state.phase!=="battle"||!!t.catapultId||!n&&t.kick<=0,this.$("kick-button").disabled=!M,this.$("kick-button").classList.toggle("ready",M),this.$("pc-kick").classList.toggle("ready",M),this.$("dizzy-banner").hidden=t.dizzyTime<=0,this.$("dizzy-time").textContent=t.dizzyTime.toFixed(1)+"″",this.$("aim-stick").classList.toggle("empty",f?f.cooldown>0:t.ammo===0),this.calloutUntil<this.elapsed&&(this.$("callout").textContent="");const R=["round-status","base-status","catapult-button","catapult-status","kick-button","sabotage-button","sabotage-status","fire-button"].map(E=>this.$(E).hidden?0:1).join("");this.touch&&!this.layoutEditing&&this.running&&R!==this.contextLayout&&(this.contextLayout=R,this.touchLayout?.refresh())}renderActors(t){this.state.actors.forEach((l,c)=>{const h=this.models[c];if(h.group.visible=!l.eliminated,l.eliminated)return;const u=this.ground(l.x,l.z);let d=l.x,f=l.z,g=u+l.height+(l.catapultId?.45:0);const m=this.koTimes.get(l.id),x=m?this.elapsed-m.time:99;x<.65&&(d+=m.dx*x*5,f+=m.dz*x*5,g+=Math.sin(x/.65*Math.PI)*2.5),h.group.position.set(d,g,f);const p=l.aiming||l.shot>.02||l.kick>0,v=p?Math.hypot(l.aimX,l.aimZ)>.001?Math.atan2(l.aimX,l.aimZ):h.group.rotation.y:l.face;let y=Math.atan2(Math.sin(v-h.group.rotation.y),Math.cos(v-h.group.rotation.y));h.group.rotation.y+=y*(1-Math.exp(-t*22)),h.update(t,{time:this.elapsed,speed:Math.hypot(l.hopX,l.hopZ),building:!!l.sabotageId,hop:l.knockUp>0?{phase:"air",progress:1-l.knockUp/l.knockUpDuration}:l.hop>0?{phase:"air",progress:1-l.hop/Rt.hopDuration}:l.idle>0?{phase:"land",progress:1-l.idle/Rt.landingDuration}:{phase:"idle",progress:0},dead:l.ko,attack:l.kick>0?{type:"kick",phase:1-l.kick/(Rt.kickDuration||.48)}:l.tongue>0||l.shot>0?{type:"tongue",phase:l.tongue>0?1-l.tongue/.22:1-l.shot/Rt.shotInterval}:null});const M=l.load,R=l.shot>0?Math.sin((1-l.shot/Rt.shotInterval)*Math.PI):0;if(WM(h,{load:M,spit:R}),p&&!l.ko&&!l.catapultId){const E=ya(Math.atan2(l.aimY||0,Math.hypot(l.aimX,l.aimZ)),-.5,1.1);h.bones.head.rotation.x-=E*.7,h.bones.spine.rotation.x-=E*.12}if(l.hop>0){const E=Math.atan2(l.hopX,l.hopZ)-h.group.rotation.y,w=Math.min(1,Math.hypot(l.hopX,l.hopZ)/8.8)*Math.sin((1-l.hop/Rt.hopDuration)*Math.PI);h.bones.spine.rotation.z-=Math.sin(E)*w*.1;for(const A of[-1,1])h.bones[`hip${A}`].rotation.z-=Math.sin(E)*w*.14}if(l.dizzyTime>0?(h.group.rotation.z=Math.sin(this.elapsed*7)*.17,h.bones.head.rotation.z+=Math.sin(this.elapsed*9)*.2):h.group.rotation.z=x<.65?x*6:0,h.group.rotation.x=0,l.knockUp>0){const E=1-l.knockUp/l.knockUpDuration,w=Math.sin(E*Math.PI)*.38,A=Math.atan2(l.impulseX,l.impulseZ)-h.group.rotation.y;h.group.rotation.x=Math.cos(A)*w,h.group.rotation.z-=Math.sin(A)*w}c===0&&this.viewMode==="chase3d"&&!l.ko&&Math.hypot(this.camera.position.x-d,this.camera.position.z-f)<1.35&&this.camera.position.y<g+1.3&&(h.group.visible=!1)});const e=this.state.actors[0];this.playerRing.position.set(e.x,this.ground(e.x,e.z)+.07,e.z),this.playerRing.scale.setScalar(1);const n=TM(this.state,e),s=this.aimGuide.geometry.attributes.position,r=n.origin||jc(this.state,e);s.setXYZ(0,r.x,r.y,r.z),s.setXYZ(1,n.x,n.y,n.z),s.needsUpdate=!0,this.aimGuide.computeLineDistances(),this.aimGuide.geometry.computeBoundingSphere();const o=this.running&&!this.layoutEditing&&!e.catapultId&&!e.ko&&e.dizzyTime<=0&&(e.aiming||e.shot>0);this.renderer.domElement.classList.toggle("mouse-aiming",o&&(this.pointerLocked()||this.viewMode==="overview"&&this.mouse.valid)),this.currentAimPreview=o?n:null,this.aimGuide.visible=o,this.aimGuide.material.color.set(this.autoFireTargetId?"#dfff85":n.targetId?"#ffc09b":n.blocked?"#b9c0b5":"#f4f7d5"),this.aimReticle.visible=o,this.aimReticle.position.set(n.x,n.y,n.z),this.aimReticle.quaternion.copy(this.camera.quaternion),this.aimReticle.scale.setScalar(.5),this.aimReticle.material.color.copy(this.aimGuide.material.color);const a=this.state.actors.find(l=>l.id===n.targetId);this.targetRing.visible=o&&!!a,a&&(this.targetRing.position.set(a.x,this.ground(a.x,a.z)+.1,a.z),this.targetRing.scale.setScalar(1+a.load*.2))}renderFlies(){this.state.flies.forEach((e,n)=>{const s=this.dummy,r=e.wait<=0,o=this.ground(e.x,e.z)+1.05+Math.sin(this.elapsed*5+e.phase)*.12,a=e.x+Math.sin(this.elapsed*3+e.phase)*.12;s.position.set(a,r?o:-100,e.z),s.scale.set(r?.105:0,r?.08:0,r?.14:0),s.rotation.set(0,e.phase,0),s.updateMatrix(),this.flyBodies.setMatrixAt(n,s.matrix);for(let l=0;l<2;l++)s.position.set(a+(l===0?-.1:.1),r?o+.045:-100,e.z),s.scale.set(r?.17:0,r?.015:0,r?.08:0),s.rotation.set(0,e.phase,Math.sin(this.elapsed*55+e.phase)*(l===0?1:-1)*.5),s.updateMatrix(),this.flyWings.setMatrixAt(n*2+l,s.matrix)}),this.flyBodies.instanceMatrix.needsUpdate=!0,this.flyWings.instanceMatrix.needsUpdate=!0,Pr.forEach((e,n)=>{const s=this.state.flies.filter(o=>o.swarmId===e.id&&o.wait<=0).length,r=this.swarmRings[n];r.material.opacity=s?.2:.09,r.material.color.set(s?"#c8e0a3":"#6f8c83")});const t=new Set;for(const e of this.state.bullets){t.add(e.id);let n=this.bulletMeshes.get(e.id);n||(n=this.makeFlyBullet(),this.bulletMeshes.set(e.id,n)),n.position.set(e.x,Number.isFinite(e.y)?e.y:this.ground(e.x,e.z)+.9,e.z),n.quaternion.setFromUnitVectors(new en(0,0,1),new en(e.dx,e.dy||0,e.dz).normalize()),n.children[1].rotation.z=Math.sin(this.elapsed*75),n.children[2].rotation.z=-Math.sin(this.elapsed*75)}for(const[e,n]of this.bulletMeshes)t.has(e)||(n.removeFromParent(),this.bulletMeshes.delete(e));for(const[e,n]of this.tongues){n.mesh.visible=e!=="player"||this.models[0].group.visible;const s=(this.elapsed-n.start)/.22;if(s>=1){n.mesh.removeFromParent(),this.tongues.delete(e);continue}const r=this.state.actors.findIndex(u=>u.id===e),o=this.models[r],a=o.mouthWorld(),l=new en(n.x,this.ground(n.x,n.z)+1,n.z),c=Math.sin(s*Math.PI);l.lerpVectors(a,l,c);const h=l.clone().sub(a);n.mesh.position.copy(a).addScaledVector(h,.5),n.mesh.quaternion.setFromUnitVectors(ec,h.clone().normalize()),n.mesh.scale.set(.07,Math.max(.001,h.length()),.07)}}project(t,e,n){const s=new en(t,e,n).project(this.camera);return{x:(s.x+1)*this.w/2,y:(1-s.y)*this.h/2,visible:s.z>-1&&s.z<1}}drawLabels(){const t=this.labelCtx;if(t.clearRect(0,0,this.w,this.h),t.textAlign="center",t.lineJoin="round",t.font="800 18px sans-serif",this.running&&(EM(this,t),wM(this,this.$("minimap"))),this.currentAimScreen=null,this.currentAimPreview){const e=this.currentAimPreview,n=this.mouse.valid?{x:this.mouse.x,y:this.mouse.y,visible:!0}:this.project(e.x,e.y,e.z);if(this.currentAimScreen={x:n.x,y:n.y},n.visible&&n.x>4&&n.x<this.w-4&&n.y>4&&n.y<this.h-4){t.save(),t.lineWidth=4,t.strokeStyle="#173c35",t.beginPath(),t.arc(n.x,n.y,7,0,Math.PI*2),t.stroke(),t.lineWidth=2,t.strokeStyle=this.autoFireTargetId?"#dfff85":e.targetId?"#ffc5a0":"#f4ffdd",t.beginPath(),t.arc(n.x,n.y,7,0,Math.PI*2);for(const[s,r]of[[1,0],[-1,0],[0,1],[0,-1]])t.moveTo(n.x+s*10,n.y+r*10),t.lineTo(n.x+s*16,n.y+r*16);t.stroke(),t.restore()}}if(this.hitConfirmUntil>this.elapsed&&this.lastPlayerHit){const e=this.lastPlayerHit,n=this.state.actors.find(r=>r.id===e.id),s=this.project(e.x,Number.isFinite(e.y)?e.y:this.ground(e.x,e.z)+(n?.height||0)+1.2,e.z);if(s.visible){t.save(),t.strokeStyle="#143d35",t.lineWidth=6,t.beginPath();for(const[r,o]of[[1,1],[-1,1],[1,-1],[-1,-1]])t.moveTo(s.x+r*6,s.y+o*6),t.lineTo(s.x+r*15,s.y+o*15);t.stroke(),t.strokeStyle="#fffce2",t.lineWidth=3,t.stroke(),t.restore()}}if(this.state.actors.forEach((e,n)=>{if(e.eliminated)return;const s=this.project(e.x,this.ground(e.x,e.z)+e.height+2.4,e.z);if(!s.visible)return;if(!(s.x>20&&s.x<this.w-20&&s.y>70&&s.y<this.h-40)&&n>0&&!e.ko&&this.running){const o=ya(s.x,24,this.w-24),a=ya(s.y,110,this.h-(this.touch?210:90));t.font="bold 24px sans-serif",t.fillStyle=n===1?"#ffbb8e":"#dfb5ff",t.fillText("▼",o,a);return}if(e.ko){t.font="900 20px sans-serif",t.strokeStyle="#1e2e28",t.lineWidth=5;const o=`KO · ${Math.ceil(e.respawnTime||0)}″`;t.strokeText(o,s.x,s.y),t.fillStyle="#ffe374",t.fillText(o,s.x,s.y);return}if(e.dizzyTime>0){for(let o=0;o<3;o++){const a=this.elapsed*4+o*2.094;t.font="bold 25px sans-serif",t.fillStyle="#ffdf57",t.strokeStyle="#725c21",t.lineWidth=3;const l=s.x+Math.cos(a)*27,c=s.y+Math.sin(a)*7;t.strokeText("★",l,c),t.fillText("★",l,c)}t.font="bold 15px sans-serif",t.fillStyle="#fff4ad",t.fillText(e.dizzyTime.toFixed(1)+"″",s.x,s.y+24);for(let o=0;o<Rt.finishHits;o++)t.beginPath(),t.arc(s.x+(o-(Rt.finishHits-1)/2)*11,s.y+36,4,0,Math.PI*2),t.fillStyle=o<e.finishHits?"#ffb58e":"#244438",t.fill(),t.strokeStyle="#ffe6ac",t.lineWidth=1.5,t.stroke()}else if(n>0){e.aimWindup>0&&(t.font="900 22px sans-serif",t.fillStyle="#ffddaa",t.fillText("!",s.x,s.y-40));const o=n===1?"ΚΟΚΚΙΝΟΣ":"ΜΩΒ",a=n===1?"#ff886a":"#dba1ff";t.fillStyle="#112b27dd",t.strokeStyle=a,t.lineWidth=3,t.beginPath(),t.roundRect?t.roundRect(s.x-52,s.y-28,104,24,10):t.rect(s.x-52,s.y-28,104,24),t.fill(),t.stroke(),t.font="bold 15px sans-serif",t.fillStyle=a,t.fillText(o,s.x,s.y-11);for(let l=0;l<6;l++)t.beginPath(),t.arc(s.x+(l-2.5)*9,s.y+6,3.8,0,Math.PI*2),t.fillStyle=l<e.dizzy?"#ffe16a":"#214036bb",t.fill()}}),this.running){const e=this.state.actors[0];for(const n of this.state.bases){const s=Wn.find(l=>l.id===n.id),r=Math.hypot(e.x-s.stock.x,e.z-s.stock.z)<10;if(n.destroyed||!r&&!n.attackerId)continue;const o=this.project(s.stock.x,this.ground(s.stock.x,s.stock.z)+3.5,s.stock.z);if(!o.visible||o.x<70||o.x>this.w-70||o.y<95||o.y>this.h-(this.touch?220:85))continue;const a=n.attackerId?`ΚΑΤΑΣΤΡΟΦΗ · ${Math.max(0,Rt.sabotageSeconds-n.progress).toFixed(1)}″`:n.owner==="player"?"Η ΑΠΟΘΗΚΗ ΣΟΥ · ∞":"ΕΧΘΡΙΚΗ ΑΠΟΘΗΚΗ";t.font="800 12px sans-serif",t.strokeStyle="#14342df2",t.lineWidth=5,t.strokeText(a,o.x,o.y),t.fillStyle=n.attackerId?"#ffd197":n.owner==="player"?"#dbff9d":"#ffbdad",t.fillText(a,o.x,o.y)}}this.fx=this.fx.filter(e=>this.elapsed-e.start<e.life);for(const e of this.fx){const n=(this.elapsed-e.start)/e.life,s=this.project(e.x,this.ground(e.x,e.z)+2+n*2,e.z);t.globalAlpha=1-n,t.font=`900 ${e.text==="ΝΟΚ ΑΟΥΤ!"?32:22}px sans-serif`,t.strokeStyle="#244136",t.lineWidth=6,t.strokeText(e.text,s.x,s.y),t.fillStyle=e.color,t.fillText(e.text,s.x,s.y)}t.globalAlpha=1}updateCameraPose(t){const e=this.state.actors[0],n=Mf(e,this.ground(e.x,e.z),this.w/this.h,this.viewMode,{yaw:this.cameraYaw,pitch:this.cameraPitch,zoom:this.settings.cameraZoom}),s=new en(...n.look),r=new en(...n.position);this.cameraReady?this.focus.lerp(s,1-Math.exp(-t*8)):(this.focus.copy(s),this.cameraReady=!0),this.cameraTarget.copy(this.focus).add(r.sub(s));const o=bM({look:this.focus.toArray(),position:this.cameraTarget.toArray()},(l,c)=>this.cameraGround(l,c));this.focus.fromArray(o.look),this.cameraTarget.fromArray(o.position);const a=this.running?this.shake:0;this.camera.position.copy(this.cameraTarget),this.camera.position.x+=(Math.random()-.5)*a,this.camera.lookAt(this.focus),this.camera.updateMatrixWorld()}frame(t){const e=Math.min(.05,Math.max(0,(t-this.last)/1e3));this.last=t;const n=this.state.actors[0],s=this.running&&!this.layoutEditing;if(s&&this.viewMode==="chase3d"&&this.pointers.has("aim")&&this.aimStrength>.08){const r=(this.aimStrength-.08)/.92,o=md({yaw:this.cameraYaw,pitch:this.cameraPitch},this.stickAim.x*r*e,this.stickAim.z*r*e,{sensitivity:2.2*this.settings.cameraSensitivity});this.cameraYaw=o.yaw,this.cameraPitch=o.pitch}if(this.shake*=Math.exp(-e*15),this.updateCameraPose(e),s){for(this.elapsed+=e,this.accumulator+=e;this.accumulator>=1/60;)if(fd(this.state,this.currentInput(),1/60),this.consumeEvents(),this.accumulator-=1/60,this.state.status!=="playing"){this.finish();break}this.saveClock+=e,this.saveClock>3&&(this.saveClock=0,this.persist())}else(this.mode==="result"||this.mode==="finishing")&&(this.elapsed+=e);if(this.mode==="finishing"&&this.elapsed>=this.resultAt&&this.showResult(),this.cameraReady||this.updateCameraPose(0),this.running||this.mode==="title"||this.mode==="result"||this.mode==="finishing"){const r=this.mode==="title"||this.layoutEditing?0:e;this.renderActors(r),this.renderFlies(),this.updateCatapultAim?.(),this.artilleryView.update(r),this.basesView.update(r),this.impactEffects.update(r),this.world.update(this.running&&!this.layoutEditing?e:0,this.elapsed,1,new en(n.x,this.ground(n.x,n.z),n.z))}(this.running&&!this.layoutEditing||this.mode==="finishing"||this.mode==="result")&&(this.particles=this.particles.filter(r=>this.elapsed-r.start>.55?(r.mesh.removeFromParent(),!1):(r.v.y-=e*16,r.mesh.position.addScaledVector(r.v,e),!0))),this.renderer.render(this.scene,this.camera),this.drawLabels(),this.updateHUD()}inspect(){return{version:Xl,viewMode:this.viewMode,cameraControl:"direct-look",touchFireMode:"auto",autoFireTargetId:this.autoFireTargetId,pointerLocked:this.pointerLocked(),cameraSensitivity:this.settings.cameraSensitivity,mouse:{x:this.mouse.x,y:this.mouse.y,valid:this.mouse.valid},aim:{...this.aim},aimScreen:this.currentAimScreen,cameraYaw:this.cameraYaw,cameraPitch:this.cameraPitch,cameraDragging:!!this.cameraDrag,phase:this.state.phase,intro:this.state.intro,mode:this.mode,status:this.state.status,ammo:this.state.actors[0].ammo,fillPercent:Math.round(this.state.actors[0].ammo/Rt.capacity*100),actors:this.state.actors.map(t=>({id:t.id,x:t.x,z:t.z,ammo:t.ammo,dizzy:t.dizzy,dizzyTime:t.dizzyTime,ko:t.ko,eliminated:t.eliminated,respawnTime:t.respawnTime,sabotageId:t.sabotageId,aiming:t.aiming,aimX:t.aimX,aimY:t.aimY,aimZ:t.aimZ,face:t.face,hop:t.hop,hopX:t.hopX,hopZ:t.hopZ,height:t.height,knockUp:t.knockUp,finishHits:t.finishHits,kickCooldown:t.kickCooldown,catapultId:t.catapultId})),bases:this.state.bases.map(t=>({...t})),layoutEditing:this.layoutEditing,touch:this.touch,catapults:this.state.catapults?.map(t=>({id:t.id,occupant:t.occupant,cooldown:t.cooldown})),shells:this.state.shells?.length,hitConfirmUntil:this.hitConfirmUntil,bullets:this.state.bullets.length,splats:this.splats.length,legacySavePreserved:!0}}}function r_(i){const t={fire:!1,kick:!1},e=r=>{i.running&&!i.layoutEditing&&(t[r]=!0)},n=i.currentInput.bind(i),s=i.clearInputs.bind(i);i.currentInput=()=>{const r=n();for(const o of Object.keys(t))i.layoutEditing||(r[o]||=t[o]),t[o]=!1;return i.layoutEditing||(r.aiming||=r.fire),r},i.clearInputs=()=>{for(const r of Object.keys(t))t[r]=!1;s()},addEventListener("keydown",r=>{r.repeat||r.target.matches("input,select")||r.code==="KeyQ"&&e("kick")},!0),addEventListener("pointerdown",r=>{r.target.closest?.("#kick-button")&&!i.$("kick-button").disabled?e("kick"):(r.target===i.renderer.domElement&&r.pointerType==="mouse"&&r.button===0||r.target.closest?.("#fire-button")&&!i.$("fire-button").disabled)&&e("fire")},!0),addEventListener("pointercancel",()=>{for(const r of Object.keys(t))t[r]=!1},!0)}function o_(i,t=()=>performance.now()){const e=i.$("view-button");let n=-1/0;e.onpointerdown=s=>{s.pointerType!=="touch"||!i.running||(s.preventDefault(),n=t(),i.toggleView(s))},e.onclick=s=>{i.running&&(s.detail===0||t()-n>600)&&i.toggleView(s)}}function a_(i){i.catapultAim={active:!1,target:null};let t=!1,e=!1;const n=()=>!!i.state.actors[0].catapultId;i.updateCatapultAim=()=>{if(!n()){i.catapultAim={active:!1,target:null};return}const l=i.state.actors[0];if(i.mouse.valid&&i.mouse.target){const u=i.mouse.target.x-l.x,d=i.mouse.target.z-l.z,f=Math.hypot(u,d);f>.01&&(i.aim={x:u/f,z:d/f,distance:f})}const c=i.aim||{x:l.aimX,z:l.aimZ},h=i.touch&&!i.mouse.valid?Math.max(0,Math.min(1,(i.aimStrength-.08)/.92)):Math.max(0,Math.min(1,((c.distance||17)-Pe.minRange)/(Pe.maxRange-Pe.minRange)));i.catapultAim={active:!0,target:V1(l,c.x,c.z,h)}};const s=i.currentInput.bind(i),r=i.clearInputs.bind(i);i.currentInput=()=>{const l=s();if(i.layoutEditing)return t=!1,e=!1,{};const c=l.fire&&!e;return e=!!l.fire,n()&&(i.updateCatapultAim(),l.fire=!1,l.aiming=!0,l.ax=i.aim.x,l.az=i.aim.z,l.ay=void 0,l.sabotage=!1,c&&i.catapultAim.target?.valid!==!1&&(l.throwStone={...i.catapultAim.target})),t&&(l.interactCatapult=!0,t=!1),l},i.clearInputs=()=>{t=!1,e=!1,i.catapultAim={active:!1,target:null},r()};const o=i.$("catapult-button");o.onpointerdown=l=>{!i.running||i.layoutEditing||o.disabled||!n()&&i.state.phase!=="battle"||(l.preventDefault(),t=!0)},o.onclick=l=>{l.detail===0&&i.running&&!i.layoutEditing&&!o.disabled&&(t=!0)},addEventListener("keydown",l=>{l.code!=="KeyE"||l.repeat||l.target.matches("input,select")||!i.running||i.layoutEditing||!n()&&i.state.phase!=="battle"||!n()&&qa(i.state,i.state.actors[0])||(l.preventDefault(),t=!0)});const a=i.$("aim-stick");a.addEventListener("pointerdown",()=>{n()&&i.updateCatapultAim()}),a.addEventListener("pointermove",()=>{n()&&i.pointers.has("aim")&&i.updateCatapultAim()})}const l_='input,select,textarea,[contenteditable]:not([contenteditable="false"])',c_=new Set(["+","=","-","_","0"]),h_=new Set(["Equal","Minus","Digit0","NumpadAdd","NumpadSubtract","Numpad0"]);function u_({document:i=globalThis.document,surfaces:t,enabled:e=()=>!0}={}){const n=t??[...i.querySelectorAll("#arcade-world,#arcade-labels,#arcade-ui")],s=[],r=new Set;let o=!1;const a=p=>(p?.nodeType===3?p.parentElement:p)?.closest?.(l_),l=p=>!!p?.nodeType&&!a(p)&&n.some(v=>v&&(v===p||v.contains?.(p))),c=p=>{const v=p.composedPath?.()||[];return v.length?v:[p.target]},h=p=>{const v=c(p);return!v.some(a)&&v.some(l)},u=p=>{p.cancelable&&p.preventDefault()},d=(p,v,y=!1)=>{const M={capture:!0,passive:y};i.addEventListener(p,v,M),s.push([p,v,M])},f=()=>{r.clear(),o=!1},g=()=>e()?!0:(f(),!1),m=p=>r.size>0||h(p)||Array.from(p.touches||[]).some(v=>l(v.target));d("touchstart",p=>{if(g()){for(const v of p.changedTouches||[])l(v.target)&&r.add(v.identifier);p.touches?.length>1&&m(p)&&u(p)}}),d("touchmove",p=>{g()&&m(p)&&u(p)});const x=p=>{for(const v of p.changedTouches||[])r.delete(v.identifier);p.touches?.length||r.clear()};d("touchend",x,!0),d("touchcancel",x,!0);for(const p of["gesturestart","gesturechange","gestureend"])d(p,v=>{g()&&(p==="gesturestart"&&(o=m(v)),(o||m(v))&&u(v),p==="gestureend"&&(o=!1))});for(const p of["wheel","dblclick","selectstart","contextmenu","dragstart"])d(p,v=>{g()&&h(v)&&u(v)});return d("keydown",p=>{if(!g()||!(p.ctrlKey||p.metaKey)||p.altKey||!c_.has(p.key)&&!h_.has(p.code)||c(p).some(a))return;const v=[i,i.body,i.documentElement].includes(p.target);(h(p)||n.length&&v)&&u(p)}),d("visibilitychange",()=>{i.hidden&&f()},!0),()=>{for(const[p,v,y]of s)i.removeEventListener(p,v,y);s.length=0,f()}}function zh(i){console.error(i);let t=document.getElementById("boot");if(!t){t=document.createElement("div"),t.id="boot";const n=document.createElement("div");n.id="boot-error",t.append(n),document.body.append(t)}t.classList.add("has-error");const e=document.getElementById("boot-error");e.textContent=`Δεν μπόρεσε να ξεκινήσει ο 3D κόσμος. Ενεργοποίησε την επιτάχυνση γραφικών στον browser και κάνε ανανέωση.
`+(i?.message||String(i))}addEventListener("error",i=>zh(i.error||i.message));addEventListener("unhandledrejection",i=>zh(i.reason));requestAnimationFrame(()=>{try{const i=window.frogArcade=new s_;r_(i),o_(i),a_(i),i.installAutoFire(),u_({surfaces:[i.renderer.domElement,i.labels,i.ui]})}catch(i){zh(i)}});
