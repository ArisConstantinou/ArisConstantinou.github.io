(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const zc="180",cf=0,_h=1,hf=2,Zu=1,uf=2,Si=3,Ii=0,Dn=1,Ue=2,Qi=0,ur=1,yh=2,Mh=3,bh=4,df=5,vs=100,ff=101,pf=102,mf=103,gf=104,xf=200,vf=201,_f=202,yf=203,kl=204,Fl=205,Mf=206,bf=207,Sf=208,wf=209,Ef=210,Tf=211,Af=212,Rf=213,Cf=214,Ol=0,Bl=1,Hl=2,pr=3,Gl=4,Vl=5,Wl=6,Xl=7,ju=0,Pf=1,Df=2,ts=0,If=1,zf=2,Lf=3,Ku=4,Uf=5,Nf=6,kf=7,Sh="attached",Ff="detached",Ju=300,mr=301,gr=302,ql=303,$l=304,xa=306,xr=1e3,ji=1001,Yl=1002,On=1003,Of=1004,mo=1005,ei=1006,La=1007,Ki=1008,di=1009,Qu=1010,td=1011,Jr=1012,Lc=1013,Ss=1014,ni=1015,ao=1016,Uc=1017,Nc=1018,Qr=1020,ed=35902,nd=35899,id=1021,sd=1022,Fn=1023,to=1026,eo=1027,kc=1028,Fc=1029,rd=1030,Oc=1031,Bc=1033,na=33776,ia=33777,sa=33778,ra=33779,Zl=35840,jl=35841,Kl=35842,Jl=35843,Ql=36196,tc=37492,ec=37496,nc=37808,ic=37809,sc=37810,rc=37811,oc=37812,ac=37813,lc=37814,cc=37815,hc=37816,uc=37817,dc=37818,fc=37819,pc=37820,mc=37821,gc=36492,xc=36494,vc=36495,_c=36283,yc=36284,Mc=36285,bc=36286,Bf=3200,Hf=3201,Hc=0,Gf=1,wi="",In="srgb",vr="srgb-linear",aa="linear",Ge="srgb",Fs=7680,wh=519,Vf=512,Wf=513,Xf=514,od=515,qf=516,$f=517,Yf=518,Zf=519,Eh=35044,Ei=35048,Th="300 es",ui=2e3,la=2001;class Mr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ah=1234567;const qr=Math.PI/180,no=180/Math.PI;function Ts(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bn[i&255]+bn[i>>8&255]+bn[i>>16&255]+bn[i>>24&255]+"-"+bn[t&255]+bn[t>>8&255]+"-"+bn[t>>16&15|64]+bn[t>>24&255]+"-"+bn[e&63|128]+bn[e>>8&255]+"-"+bn[e>>16&255]+bn[e>>24&255]+bn[n&255]+bn[n>>8&255]+bn[n>>16&255]+bn[n>>24&255]).toLowerCase()}function Se(i,t,e){return Math.max(t,Math.min(e,i))}function Gc(i,t){return(i%t+t)%t}function jf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Kf(i,t,e){return i!==t?(e-i)/(t-i):0}function $r(i,t,e){return(1-e)*i+e*t}function Jf(i,t,e,n){return $r(i,t,1-Math.exp(-e*n))}function Qf(i,t=1){return t-Math.abs(Gc(i,t*2)-t)}function tp(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function ep(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function np(i,t){return i+Math.floor(Math.random()*(t-i+1))}function ip(i,t){return i+Math.random()*(t-i)}function sp(i){return i*(.5-Math.random())}function rp(i){i!==void 0&&(Ah=i);let t=Ah+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function op(i){return i*qr}function ap(i){return i*no}function lp(i){return(i&i-1)===0&&i!==0}function cp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function hp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function up(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),f=o((t-n)/2),d=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*u,l*f,a*c);break;case"YZY":i.set(l*f,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*f,a*h,a*c);break;case"XZX":i.set(a*h,l*m,l*d,a*c);break;case"YXY":i.set(l*d,a*h,l*m,a*c);break;case"ZYZ":i.set(l*m,l*d,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function sr(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Rn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Sc={DEG2RAD:qr,RAD2DEG:no,generateUUID:Ts,clamp:Se,euclideanModulo:Gc,mapLinear:jf,inverseLerp:Kf,lerp:$r,damp:Jf,pingpong:Qf,smoothstep:tp,smootherstep:ep,randInt:np,randFloat:ip,randFloatSpread:sp,seededRandom:rp,degToRad:op,radToDeg:ap,isPowerOfTwo:lp,ceilPowerOfTwo:cp,floorPowerOfTwo:hp,setQuaternionFromProperEuler:up,normalize:Rn,denormalize:sr};class Gt{constructor(t=0,e=0){Gt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Se(this.x,t.x,e.x),this.y=Se(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Se(this.x,t,e),this.y=Se(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class es{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],d=r[o+1],m=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=m,t[e+3]=x;return}if(u!==x||l!==f||c!==d||h!==m){let g=1-a;const p=l*f+c*d+h*m+u*x,y=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const C=Math.sqrt(_),T=Math.atan2(C,p*y);g=Math.sin(g*T)/C,a=Math.sin(a*T)/C}const v=a*y;if(l=l*g+f*v,c=c*g+d*v,h=h*g+m*v,u=u*g+x*v,g===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],m=r[o+3];return t[e]=a*m+h*u+l*d-c*f,t[e+1]=l*m+h*f+c*u-a*d,t[e+2]=c*m+h*d+a*f-l*u,t[e+3]=h*m-a*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),f=l(n/2),d=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u+f*d*m;break;case"YZX":this._x=f*h*u+c*d*m,this._y=c*d*u+f*h*m,this._z=c*h*m-f*d*u,this._w=c*h*u-f*d*m;break;case"XZY":this._x=f*h*u-c*d*m,this._y=c*d*u-f*h*m,this._z=c*h*m+f*d*u,this._w=c*h*u+f*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Se(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class z{constructor(t=0,e=0,n=0){z.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Rh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Rh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Se(this.x,t.x,e.x),this.y=Se(this.y,t.y,e.y),this.z=Se(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Se(this.x,t,e),this.y=Se(this.y,t,e),this.z=Se(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ua.copy(this).projectOnVector(t),this.sub(Ua)}reflect(t){return this.sub(Ua.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Se(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ua=new z,Rh=new es;class xe{constructor(t,e,n,s,r,o,a,l,c){xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],x=s[0],g=s[3],p=s[6],y=s[1],_=s[4],v=s[7],C=s[2],T=s[5],E=s[8];return r[0]=o*x+a*y+l*C,r[3]=o*g+a*_+l*T,r[6]=o*p+a*v+l*E,r[1]=c*x+h*y+u*C,r[4]=c*g+h*_+u*T,r[7]=c*p+h*v+u*E,r[2]=f*x+d*y+m*C,r[5]=f*g+d*_+m*T,r[8]=f*p+d*v+m*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*r,d=c*r-o*l,m=e*u+n*f+s*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return t[0]=u*x,t[1]=(s*c-h*n)*x,t[2]=(a*n-s*o)*x,t[3]=f*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=d*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Na.makeScale(t,e)),this}rotate(t){return this.premultiply(Na.makeRotation(-t)),this}translate(t,e){return this.premultiply(Na.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Na=new xe;function ad(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ca(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function dp(){const i=ca("canvas");return i.style.display="block",i}const Ch={};function io(i){i in Ch||(Ch[i]=!0,console.warn(i))}function fp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Ph=new xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dh=new xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function pp(){const i={enabled:!0,workingColorSpace:vr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ge&&(s.r=Ci(s.r),s.g=Ci(s.g),s.b=Ci(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ge&&(s.r=dr(s.r),s.g=dr(s.g),s.b=dr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===wi?aa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return io("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return io("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[vr]:{primaries:t,whitePoint:n,transfer:aa,toXYZ:Ph,fromXYZ:Dh,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:In},outputColorSpaceConfig:{drawingBufferColorSpace:In}},[In]:{primaries:t,whitePoint:n,transfer:Ge,toXYZ:Ph,fromXYZ:Dh,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:In}}}),i}const Le=pp();function Ci(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function dr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Os;class mp{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Os===void 0&&(Os=ca("canvas")),Os.width=t.width,Os.height=t.height;const s=Os.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Os}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ca("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ci(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ci(e[n]/255)*255):e[n]=Ci(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let gp=0;class Vc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gp++}),this.uuid=Ts(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ka(s[o].image)):r.push(ka(s[o]))}else r=ka(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function ka(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?mp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let xp=0;const Fa=new z;class Tn extends Mr{constructor(t=Tn.DEFAULT_IMAGE,e=Tn.DEFAULT_MAPPING,n=ji,s=ji,r=ei,o=Ki,a=Fn,l=di,c=Tn.DEFAULT_ANISOTROPY,h=wi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=Ts(),this.name="",this.source=new Vc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Gt(0,0),this.repeat=new Gt(1,1),this.center=new Gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Fa).x}get height(){return this.source.getSize(Fa).y}get depth(){return this.source.getSize(Fa).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ju)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case xr:t.x=t.x-Math.floor(t.x);break;case ji:t.x=t.x<0?0:1;break;case Yl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case xr:t.y=t.y-Math.floor(t.y);break;case ji:t.y=t.y<0?0:1;break;case Yl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Tn.DEFAULT_IMAGE=null;Tn.DEFAULT_MAPPING=Ju;Tn.DEFAULT_ANISOTROPY=1;class Ie{constructor(t=0,e=0,n=0,s=1){Ie.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(c+1)/2,v=(d+1)/2,C=(p+1)/2,T=(h+f)/4,E=(u+x)/4,R=(m+g)/4;return _>v&&_>C?_<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(_),s=T/n,r=E/n):v>C?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=T/s,r=R/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=E/r,s=R/r),this.set(n,s,r,e),this}let y=Math.sqrt((g-m)*(g-m)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(u-x)/y,this.z=(f-h)/y,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Se(this.x,t.x,e.x),this.y=Se(this.y,t.y,e.y),this.z=Se(this.z,t.z,e.z),this.w=Se(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Se(this.x,t,e),this.y=Se(this.y,t,e),this.z=Se(this.z,t,e),this.w=Se(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Se(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class vp extends Mr{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ei,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ie(0,0,t,e),this.scissorTest=!1,this.viewport=new Ie(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Tn(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:ei,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Vc(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ns extends vp{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class ld extends Tn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=On,this.minFilter=On,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class _p extends Tn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=On,this.minFilter=On,this.wrapR=ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ii{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Yn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Yn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Yn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Yn):Yn.fromBufferAttribute(r,o),Yn.applyMatrix4(t.matrixWorld),this.expandByPoint(Yn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),go.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),go.copy(n.boundingBox)),go.applyMatrix4(t.matrixWorld),this.union(go)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Yn),Yn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(zr),xo.subVectors(this.max,zr),Bs.subVectors(t.a,zr),Hs.subVectors(t.b,zr),Gs.subVectors(t.c,zr),Oi.subVectors(Hs,Bs),Bi.subVectors(Gs,Hs),cs.subVectors(Bs,Gs);let e=[0,-Oi.z,Oi.y,0,-Bi.z,Bi.y,0,-cs.z,cs.y,Oi.z,0,-Oi.x,Bi.z,0,-Bi.x,cs.z,0,-cs.x,-Oi.y,Oi.x,0,-Bi.y,Bi.x,0,-cs.y,cs.x,0];return!Oa(e,Bs,Hs,Gs,xo)||(e=[1,0,0,0,1,0,0,0,1],!Oa(e,Bs,Hs,Gs,xo))?!1:(vo.crossVectors(Oi,Bi),e=[vo.x,vo.y,vo.z],Oa(e,Bs,Hs,Gs,xo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Yn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Yn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(xi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const xi=[new z,new z,new z,new z,new z,new z,new z,new z],Yn=new z,go=new ii,Bs=new z,Hs=new z,Gs=new z,Oi=new z,Bi=new z,cs=new z,zr=new z,xo=new z,vo=new z,hs=new z;function Oa(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){hs.fromArray(i,r);const a=s.x*Math.abs(hs.x)+s.y*Math.abs(hs.y)+s.z*Math.abs(hs.z),l=t.dot(hs),c=e.dot(hs),h=n.dot(hs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const yp=new ii,Lr=new z,Ba=new z;class Li{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):yp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Lr.subVectors(t,this.center);const e=Lr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Lr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ba.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Lr.copy(t.center).add(Ba)),this.expandByPoint(Lr.copy(t.center).sub(Ba))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const vi=new z,Ha=new z,_o=new z,Hi=new z,Ga=new z,yo=new z,Va=new z;class br{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,vi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=vi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(vi.copy(this.origin).addScaledVector(this.direction,e),vi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ha.copy(t).add(e).multiplyScalar(.5),_o.copy(e).sub(t).normalize(),Hi.copy(this.origin).sub(Ha);const r=t.distanceTo(e)*.5,o=-this.direction.dot(_o),a=Hi.dot(this.direction),l=-Hi.dot(_o),c=Hi.lengthSq(),h=Math.abs(1-o*o);let u,f,d,m;if(h>0)if(u=o*l-a,f=o*a-l,m=r*h,u>=0)if(f>=-m)if(f<=m){const x=1/h;u*=x,f*=x,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-m?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=m?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ha).addScaledVector(_o,f),d}intersectSphere(t,e){vi.subVectors(t.center,this.origin);const n=vi.dot(this.direction),s=vi.dot(vi)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,vi)!==null}intersectTriangle(t,e,n,s,r){Ga.subVectors(e,t),yo.subVectors(n,t),Va.crossVectors(Ga,yo);let o=this.direction.dot(Va),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Hi.subVectors(this.origin,t);const l=a*this.direction.dot(yo.crossVectors(Hi,yo));if(l<0)return null;const c=a*this.direction.dot(Ga.cross(Hi));if(c<0||l+c>o)return null;const h=-a*Hi.dot(Va);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he{constructor(t,e,n,s,r,o,a,l,c,h,u,f,d,m,x,g){he.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,f,d,m,x,g)}set(t,e,n,s,r,o,a,l,c,h,u,f,d,m,x,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new he().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Vs.setFromMatrixColumn(t,0).length(),r=1/Vs.setFromMatrixColumn(t,1).length(),o=1/Vs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,m=a*h,x=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+m*c,e[5]=f-x*c,e[9]=-a*l,e[2]=x-f*c,e[6]=m+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,m=c*h,x=c*u;e[0]=f+x*a,e[4]=m*a-d,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-m,e[6]=x+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,m=c*h,x=c*u;e[0]=f-x*a,e[4]=-o*u,e[8]=m+d*a,e[1]=d+m*a,e[5]=o*h,e[9]=x-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*h,d=o*u,m=a*h,x=a*u;e[0]=l*h,e[4]=m*c-d,e[8]=f*c+x,e[1]=l*u,e[5]=x*c+f,e[9]=d*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,m=a*l,x=a*c;e[0]=l*h,e[4]=x-f*u,e[8]=m*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*u+m,e[10]=f-x*u}else if(t.order==="XZY"){const f=o*l,d=o*c,m=a*l,x=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+x,e[5]=o*h,e[9]=d*u-m,e[2]=m*u-d,e[6]=a*h,e[10]=x*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Mp,t,bp)}lookAt(t,e,n){const s=this.elements;return Un.subVectors(t,e),Un.lengthSq()===0&&(Un.z=1),Un.normalize(),Gi.crossVectors(n,Un),Gi.lengthSq()===0&&(Math.abs(n.z)===1?Un.x+=1e-4:Un.z+=1e-4,Un.normalize(),Gi.crossVectors(n,Un)),Gi.normalize(),Mo.crossVectors(Un,Gi),s[0]=Gi.x,s[4]=Mo.x,s[8]=Un.x,s[1]=Gi.y,s[5]=Mo.y,s[9]=Un.y,s[2]=Gi.z,s[6]=Mo.z,s[10]=Un.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],x=n[6],g=n[10],p=n[14],y=n[3],_=n[7],v=n[11],C=n[15],T=s[0],E=s[4],R=s[8],b=s[12],S=s[1],L=s[5],U=s[9],Y=s[13],J=s[2],H=s[6],q=s[10],B=s[14],O=s[3],tt=s[7],W=s[11],vt=s[15];return r[0]=o*T+a*S+l*J+c*O,r[4]=o*E+a*L+l*H+c*tt,r[8]=o*R+a*U+l*q+c*W,r[12]=o*b+a*Y+l*B+c*vt,r[1]=h*T+u*S+f*J+d*O,r[5]=h*E+u*L+f*H+d*tt,r[9]=h*R+u*U+f*q+d*W,r[13]=h*b+u*Y+f*B+d*vt,r[2]=m*T+x*S+g*J+p*O,r[6]=m*E+x*L+g*H+p*tt,r[10]=m*R+x*U+g*q+p*W,r[14]=m*b+x*Y+g*B+p*vt,r[3]=y*T+_*S+v*J+C*O,r[7]=y*E+_*L+v*H+C*tt,r[11]=y*R+_*U+v*q+C*W,r[15]=y*b+_*Y+v*B+C*vt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],m=t[3],x=t[7],g=t[11],p=t[15];return m*(+r*l*u-s*c*u-r*a*f+n*c*f+s*a*d-n*l*d)+x*(+e*l*d-e*c*f+r*o*f-s*o*d+s*c*h-r*l*h)+g*(+e*c*u-e*a*d-r*o*u+n*o*d+r*a*h-n*c*h)+p*(-s*a*h-e*l*u+e*a*f+s*o*u-n*o*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],m=t[12],x=t[13],g=t[14],p=t[15],y=u*g*c-x*f*c+x*l*d-a*g*d-u*l*p+a*f*p,_=m*f*c-h*g*c-m*l*d+o*g*d+h*l*p-o*f*p,v=h*x*c-m*u*c+m*a*d-o*x*d-h*a*p+o*u*p,C=m*u*l-h*x*l-m*a*f+o*x*f+h*a*g-o*u*g,T=e*y+n*_+s*v+r*C;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/T;return t[0]=y*E,t[1]=(x*f*r-u*g*r-x*s*d+n*g*d+u*s*p-n*f*p)*E,t[2]=(a*g*r-x*l*r+x*s*c-n*g*c-a*s*p+n*l*p)*E,t[3]=(u*l*r-a*f*r-u*s*c+n*f*c+a*s*d-n*l*d)*E,t[4]=_*E,t[5]=(h*g*r-m*f*r+m*s*d-e*g*d-h*s*p+e*f*p)*E,t[6]=(m*l*r-o*g*r-m*s*c+e*g*c+o*s*p-e*l*p)*E,t[7]=(o*f*r-h*l*r+h*s*c-e*f*c-o*s*d+e*l*d)*E,t[8]=v*E,t[9]=(m*u*r-h*x*r-m*n*d+e*x*d+h*n*p-e*u*p)*E,t[10]=(o*x*r-m*a*r+m*n*c-e*x*c-o*n*p+e*a*p)*E,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*d-e*a*d)*E,t[12]=C*E,t[13]=(h*x*s-m*u*s+m*n*f-e*x*f-h*n*g+e*u*g)*E,t[14]=(m*a*s-o*x*s-m*n*l+e*x*l+o*n*g-e*a*g)*E,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*f+e*a*f)*E,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,f=r*c,d=r*h,m=r*u,x=o*h,g=o*u,p=a*u,y=l*c,_=l*h,v=l*u,C=n.x,T=n.y,E=n.z;return s[0]=(1-(x+p))*C,s[1]=(d+v)*C,s[2]=(m-_)*C,s[3]=0,s[4]=(d-v)*T,s[5]=(1-(f+p))*T,s[6]=(g+y)*T,s[7]=0,s[8]=(m+_)*E,s[9]=(g-y)*E,s[10]=(1-(f+x))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Vs.set(s[0],s[1],s[2]).length();const o=Vs.set(s[4],s[5],s[6]).length(),a=Vs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Zn.copy(this);const c=1/r,h=1/o,u=1/a;return Zn.elements[0]*=c,Zn.elements[1]*=c,Zn.elements[2]*=c,Zn.elements[4]*=h,Zn.elements[5]*=h,Zn.elements[6]*=h,Zn.elements[8]*=u,Zn.elements[9]*=u,Zn.elements[10]*=u,e.setFromRotationMatrix(Zn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=ui,l=!1){const c=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let m,x;if(l)m=r/(o-r),x=o*r/(o-r);else if(a===ui)m=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===la)m=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=ui,l=!1){const c=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s);let m,x;if(l)m=1/(o-r),x=o/(o-r);else if(a===ui)m=-2/(o-r),x=-(o+r)/(o-r);else if(a===la)m=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Vs=new z,Zn=new he,Mp=new z(0,0,0),bp=new z(1,1,1),Gi=new z,Mo=new z,Un=new z,Ih=new he,zh=new es;class fi{constructor(t=0,e=0,n=0,s=fi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(Se(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Se(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Se(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Se(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Se(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Se(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ih.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ih,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return zh.setFromEuler(this),this.setFromQuaternion(zh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fi.DEFAULT_ORDER="XYZ";class Wc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Sp=0;const Lh=new z,Ws=new es,_i=new he,bo=new z,Ur=new z,wp=new z,Ep=new es,Uh=new z(1,0,0),Nh=new z(0,1,0),kh=new z(0,0,1),Fh={type:"added"},Tp={type:"removed"},Xs={type:"childadded",child:null},Wa={type:"childremoved",child:null};class We extends Mr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sp++}),this.uuid=Ts(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=We.DEFAULT_UP.clone();const t=new z,e=new fi,n=new es,s=new z(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new xe}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=We.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=We.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ws.setFromAxisAngle(t,e),this.quaternion.multiply(Ws),this}rotateOnWorldAxis(t,e){return Ws.setFromAxisAngle(t,e),this.quaternion.premultiply(Ws),this}rotateX(t){return this.rotateOnAxis(Uh,t)}rotateY(t){return this.rotateOnAxis(Nh,t)}rotateZ(t){return this.rotateOnAxis(kh,t)}translateOnAxis(t,e){return Lh.copy(t).applyQuaternion(this.quaternion),this.position.add(Lh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Uh,t)}translateY(t){return this.translateOnAxis(Nh,t)}translateZ(t){return this.translateOnAxis(kh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?bo.copy(t):bo.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ur.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(Ur,bo,this.up):_i.lookAt(bo,Ur,this.up),this.quaternion.setFromRotationMatrix(_i),s&&(_i.extractRotation(s.matrixWorld),Ws.setFromRotationMatrix(_i),this.quaternion.premultiply(Ws.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Fh),Xs.child=t,this.dispatchEvent(Xs),Xs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Tp),Wa.child=t,this.dispatchEvent(Wa),Wa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_i.multiply(t.parent.matrixWorld)),t.applyMatrix4(_i),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Fh),Xs.child=t,this.dispatchEvent(Xs),Xs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ur,t,wp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ur,Ep,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}We.DEFAULT_UP=new z(0,1,0);We.DEFAULT_MATRIX_AUTO_UPDATE=!0;We.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const jn=new z,yi=new z,Xa=new z,Mi=new z,qs=new z,$s=new z,Oh=new z,qa=new z,$a=new z,Ya=new z,Za=new Ie,ja=new Ie,Ka=new Ie;class ti{constructor(t=new z,e=new z,n=new z){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),jn.subVectors(t,e),s.cross(jn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){jn.subVectors(s,e),yi.subVectors(n,e),Xa.subVectors(t,e);const o=jn.dot(jn),a=jn.dot(yi),l=jn.dot(Xa),c=yi.dot(yi),h=yi.dot(Xa),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(c*l-a*h)*f,m=(o*h-a*l)*f;return r.set(1-d-m,m,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Mi)===null?!1:Mi.x>=0&&Mi.y>=0&&Mi.x+Mi.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Mi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Mi.x),l.addScaledVector(o,Mi.y),l.addScaledVector(a,Mi.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Za.setScalar(0),ja.setScalar(0),Ka.setScalar(0),Za.fromBufferAttribute(t,e),ja.fromBufferAttribute(t,n),Ka.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Za,r.x),o.addScaledVector(ja,r.y),o.addScaledVector(Ka,r.z),o}static isFrontFacing(t,e,n,s){return jn.subVectors(n,e),yi.subVectors(t,e),jn.cross(yi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return jn.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),jn.cross(yi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ti.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ti.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return ti.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return ti.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ti.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;qs.subVectors(s,n),$s.subVectors(r,n),qa.subVectors(t,n);const l=qs.dot(qa),c=$s.dot(qa);if(l<=0&&c<=0)return e.copy(n);$a.subVectors(t,s);const h=qs.dot($a),u=$s.dot($a);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(qs,o);Ya.subVectors(t,r);const d=qs.dot(Ya),m=$s.dot(Ya);if(m>=0&&d<=m)return e.copy(r);const x=d*c-l*m;if(x<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector($s,a);const g=h*m-d*u;if(g<=0&&u-h>=0&&d-m>=0)return Oh.subVectors(r,s),a=(u-h)/(u-h+(d-m)),e.copy(s).addScaledVector(Oh,a);const p=1/(g+x+f);return o=x*p,a=f*p,e.copy(n).addScaledVector(qs,o).addScaledVector($s,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const cd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vi={h:0,s:0,l:0},So={h:0,s:0,l:0};function Ja(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class te{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=In){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Le.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Le.workingColorSpace){return this.r=t,this.g=e,this.b=n,Le.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Le.workingColorSpace){if(t=Gc(t,1),e=Se(e,0,1),n=Se(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Ja(o,r,t+1/3),this.g=Ja(o,r,t),this.b=Ja(o,r,t-1/3)}return Le.colorSpaceToWorking(this,s),this}setStyle(t,e=In){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=In){const n=cd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ci(t.r),this.g=Ci(t.g),this.b=Ci(t.b),this}copyLinearToSRGB(t){return this.r=dr(t.r),this.g=dr(t.g),this.b=dr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=In){return Le.workingToColorSpace(Sn.copy(this),t),Math.round(Se(Sn.r*255,0,255))*65536+Math.round(Se(Sn.g*255,0,255))*256+Math.round(Se(Sn.b*255,0,255))}getHexString(t=In){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Le.workingColorSpace){Le.workingToColorSpace(Sn.copy(this),e);const n=Sn.r,s=Sn.g,r=Sn.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Le.workingColorSpace){return Le.workingToColorSpace(Sn.copy(this),e),t.r=Sn.r,t.g=Sn.g,t.b=Sn.b,t}getStyle(t=In){Le.workingToColorSpace(Sn.copy(this),t);const e=Sn.r,n=Sn.g,s=Sn.b;return t!==In?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Vi),this.setHSL(Vi.h+t,Vi.s+e,Vi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Vi),t.getHSL(So);const n=$r(Vi.h,So.h,e),s=$r(Vi.s,So.s,e),r=$r(Vi.l,So.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Sn=new te;te.NAMES=cd;let Ap=0;class ss extends Mr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ap++}),this.uuid=Ts(),this.name="",this.type="Material",this.blending=ur,this.side=Ii,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kl,this.blendDst=Fl,this.blendEquation=vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=pr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fs,this.stencilZFail=Fs,this.stencilZPass=Fs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ur&&(n.blending=this.blending),this.side!==Ii&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==kl&&(n.blendSrc=this.blendSrc),this.blendDst!==Fl&&(n.blendDst=this.blendDst),this.blendEquation!==vs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==pr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Fs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Fs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class _n extends ss{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.combine=ju,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const sn=new z,wo=new Gt;let Rp=0;class cn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Rp++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Eh,this.updateRanges=[],this.gpuType=ni,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)wo.fromBufferAttribute(this,e),wo.applyMatrix3(t),this.setXY(e,wo.x,wo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)sn.fromBufferAttribute(this,e),sn.applyMatrix3(t),this.setXYZ(e,sn.x,sn.y,sn.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)sn.fromBufferAttribute(this,e),sn.applyMatrix4(t),this.setXYZ(e,sn.x,sn.y,sn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)sn.fromBufferAttribute(this,e),sn.applyNormalMatrix(t),this.setXYZ(e,sn.x,sn.y,sn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)sn.fromBufferAttribute(this,e),sn.transformDirection(t),this.setXYZ(e,sn.x,sn.y,sn.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=sr(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Rn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=sr(e,this.array)),e}setX(t,e){return this.normalized&&(e=Rn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=sr(e,this.array)),e}setY(t,e){return this.normalized&&(e=Rn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=sr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Rn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=sr(e,this.array)),e}setW(t,e){return this.normalized&&(e=Rn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Rn(e,this.array),n=Rn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Rn(e,this.array),n=Rn(n,this.array),s=Rn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Rn(e,this.array),n=Rn(n,this.array),s=Rn(s,this.array),r=Rn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Eh&&(t.usage=this.usage),t}}class Xc extends cn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class hd extends cn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Wt extends cn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Cp=0;const Bn=new he,Qa=new We,Ys=new z,Nn=new ii,Nr=new ii,fn=new z;class Te extends Mr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cp++}),this.uuid=Ts(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ad(t)?hd:Xc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new xe().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Bn.makeRotationFromQuaternion(t),this.applyMatrix4(Bn),this}rotateX(t){return Bn.makeRotationX(t),this.applyMatrix4(Bn),this}rotateY(t){return Bn.makeRotationY(t),this.applyMatrix4(Bn),this}rotateZ(t){return Bn.makeRotationZ(t),this.applyMatrix4(Bn),this}translate(t,e,n){return Bn.makeTranslation(t,e,n),this.applyMatrix4(Bn),this}scale(t,e,n){return Bn.makeScale(t,e,n),this.applyMatrix4(Bn),this}lookAt(t){return Qa.lookAt(t),Qa.updateMatrix(),this.applyMatrix4(Qa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ys).negate(),this.translate(Ys.x,Ys.y,Ys.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Wt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ii);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Nn.setFromBufferAttribute(r),this.morphTargetsRelative?(fn.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(fn),fn.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(fn)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Li);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(t){const n=this.boundingSphere.center;if(Nn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Nr.setFromBufferAttribute(a),this.morphTargetsRelative?(fn.addVectors(Nn.min,Nr.min),Nn.expandByPoint(fn),fn.addVectors(Nn.max,Nr.max),Nn.expandByPoint(fn)):(Nn.expandByPoint(Nr.min),Nn.expandByPoint(Nr.max))}Nn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)fn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(fn));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)fn.fromBufferAttribute(a,c),l&&(Ys.fromBufferAttribute(t,c),fn.add(Ys)),s=Math.max(s,n.distanceToSquared(fn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new cn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new z,l[R]=new z;const c=new z,h=new z,u=new z,f=new Gt,d=new Gt,m=new Gt,x=new z,g=new z;function p(R,b,S){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,S),f.fromBufferAttribute(r,R),d.fromBufferAttribute(r,b),m.fromBufferAttribute(r,S),h.sub(c),u.sub(c),d.sub(f),m.sub(f);const L=1/(d.x*m.y-m.x*d.y);isFinite(L)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(L),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(L),a[R].add(x),a[b].add(x),a[S].add(x),l[R].add(g),l[b].add(g),l[S].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let R=0,b=y.length;R<b;++R){const S=y[R],L=S.start,U=S.count;for(let Y=L,J=L+U;Y<J;Y+=3)p(t.getX(Y+0),t.getX(Y+1),t.getX(Y+2))}const _=new z,v=new z,C=new z,T=new z;function E(R){C.fromBufferAttribute(s,R),T.copy(C);const b=a[R];_.copy(b),_.sub(C.multiplyScalar(C.dot(b))).normalize(),v.crossVectors(T,b);const L=v.dot(l[R])<0?-1:1;o.setXYZW(R,_.x,_.y,_.z,L)}for(let R=0,b=y.length;R<b;++R){const S=y[R],L=S.start,U=S.count;for(let Y=L,J=L+U;Y<J;Y+=3)E(t.getX(Y+0)),E(t.getX(Y+1)),E(t.getX(Y+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new cn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new z,r=new z,o=new z,a=new z,l=new z,c=new z,h=new z,u=new z;if(t)for(let f=0,d=t.count;f<d;f+=3){const m=t.getX(f+0),x=t.getX(f+1),g=t.getX(f+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)fn.fromBufferAttribute(t,e),fn.normalize(),t.setXYZ(e,fn.x,fn.y,fn.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let d=0,m=0;for(let x=0,g=l.length;x<g;x++){a.isInterleavedBufferAttribute?d=l[x]*a.data.stride+a.offset:d=l[x]*h;for(let p=0;p<h;p++)f[m++]=c[d++]}return new cn(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Te,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Bh=new he,us=new br,Eo=new Li,Hh=new z,To=new z,Ao=new z,Ro=new z,tl=new z,Co=new z,Gh=new z,Po=new z;class Jt extends We{constructor(t=new Te,e=new _n){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Co.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(tl.fromBufferAttribute(u,t),o?Co.addScaledVector(tl,h):Co.addScaledVector(tl.sub(e),h))}e.add(Co)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Eo.copy(n.boundingSphere),Eo.applyMatrix4(r),us.copy(t.ray).recast(t.near),!(Eo.containsPoint(us.origin)===!1&&(us.intersectSphere(Eo,Hh)===null||us.origin.distanceToSquared(Hh)>(t.far-t.near)**2))&&(Bh.copy(r).invert(),us.copy(t.ray).applyMatrix4(Bh),!(n.boundingBox!==null&&us.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,us)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=f.length;m<x;m++){const g=f[m],p=o[g.materialIndex],y=Math.max(g.start,d.start),_=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let v=y,C=_;v<C;v+=3){const T=a.getX(v),E=a.getX(v+1),R=a.getX(v+2);s=Do(this,p,t,n,c,h,u,T,E,R),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){const y=a.getX(g),_=a.getX(g+1),v=a.getX(g+2);s=Do(this,o,t,n,c,h,u,y,_,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,x=f.length;m<x;m++){const g=f[m],p=o[g.materialIndex],y=Math.max(g.start,d.start),_=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));for(let v=y,C=_;v<C;v+=3){const T=v,E=v+1,R=v+2;s=Do(this,p,t,n,c,h,u,T,E,R),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){const y=g,_=g+1,v=g+2;s=Do(this,o,t,n,c,h,u,y,_,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Pp(i,t,e,n,s,r,o,a){let l;if(t.side===Dn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Ii,a),l===null)return null;Po.copy(a),Po.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Po);return c<e.near||c>e.far?null:{distance:c,point:Po.clone(),object:i}}function Do(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,To),i.getVertexPosition(l,Ao),i.getVertexPosition(c,Ro);const h=Pp(i,t,e,n,To,Ao,Ro,Gh);if(h){const u=new z;ti.getBarycoord(Gh,To,Ao,Ro,u),s&&(h.uv=ti.getInterpolatedAttribute(s,a,l,c,u,new Gt)),r&&(h.uv1=ti.getInterpolatedAttribute(r,a,l,c,u,new Gt)),o&&(h.normal=ti.getInterpolatedAttribute(o,a,l,c,u,new z),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new z,materialIndex:0};ti.getNormal(To,Ao,Ro,f.normal),h.face=f,h.barycoord=u}return h}class zi extends Te{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,d=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Wt(c,3)),this.setAttribute("normal",new Wt(h,3)),this.setAttribute("uv",new Wt(u,2));function m(x,g,p,y,_,v,C,T,E,R,b){const S=v/E,L=C/R,U=v/2,Y=C/2,J=T/2,H=E+1,q=R+1;let B=0,O=0;const tt=new z;for(let W=0;W<q;W++){const vt=W*L-Y;for(let Xt=0;Xt<H;Xt++){const Me=Xt*S-U;tt[x]=Me*y,tt[g]=vt*_,tt[p]=J,c.push(tt.x,tt.y,tt.z),tt[x]=0,tt[g]=0,tt[p]=T>0?1:-1,h.push(tt.x,tt.y,tt.z),u.push(Xt/E),u.push(1-W/R),B+=1}}for(let W=0;W<R;W++)for(let vt=0;vt<E;vt++){const Xt=f+vt+H*W,Me=f+vt+H*(W+1),ce=f+(vt+1)+H*(W+1),ht=f+(vt+1)+H*W;l.push(Xt,Me,ht),l.push(Me,ce,ht),O+=6}a.addGroup(d,O,b),d+=O,f+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function _r(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Cn(i){const t={};for(let e=0;e<i.length;e++){const n=_r(i[e]);for(const s in n)t[s]=n[s]}return t}function Dp(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ud(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Le.workingColorSpace}const ha={clone:_r,merge:Cn};var Ip=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wn extends ss{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ip,this.fragmentShader=zp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=_r(t.uniforms),this.uniformsGroups=Dp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class dd extends We{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=ui,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Wi=new z,Vh=new Gt,Wh=new Gt;class zn extends dd{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=no*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(qr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return no*2*Math.atan(Math.tan(qr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Wi.x,Wi.y).multiplyScalar(-t/Wi.z),Wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wi.x,Wi.y).multiplyScalar(-t/Wi.z)}getViewSize(t,e){return this.getViewBounds(t,Vh,Wh),e.subVectors(Wh,Vh)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(qr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Zs=-90,js=1;class Lp extends We{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new zn(Zs,js,t,e);s.layers=this.layers,this.add(s);const r=new zn(Zs,js,t,e);r.layers=this.layers,this.add(r);const o=new zn(Zs,js,t,e);o.layers=this.layers,this.add(o);const a=new zn(Zs,js,t,e);a.layers=this.layers,this.add(a);const l=new zn(Zs,js,t,e);l.layers=this.layers,this.add(l);const c=new zn(Zs,js,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===ui)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===la)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class fd extends Tn{constructor(t=[],e=mr,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Up extends ns{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new fd(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new zi(5,5,5),r=new Wn({name:"CubemapFromEquirect",uniforms:_r(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Dn,blending:Qi});r.uniforms.tEquirect.value=e;const o=new Jt(s,r),a=e.minFilter;return e.minFilter===Ki&&(e.minFilter=ei),new Lp(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class re extends We{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Np={type:"move"};class el{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const g=e.getJointPose(x,n),p=this._getHandJoint(c,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;c.inputState.pinching&&f>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Np)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new re;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class va{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new te(t),this.density=e}clone(){return new va(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class kp extends We{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fi,this.environmentIntensity=1,this.environmentRotation=new fi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Xh=new z,qh=new Ie,$h=new Ie,Fp=new z,Yh=new he,Io=new z,nl=new Li,Zh=new he,il=new br;class zo extends Jt{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Sh,this.bindMatrix=new he,this.bindMatrixInverse=new he,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new ii),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Io),this.boundingBox.expandByPoint(Io)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Li),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Io),this.boundingSphere.expandByPoint(Io)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),nl.copy(this.boundingSphere),nl.applyMatrix4(s),t.ray.intersectsSphere(nl)!==!1&&(Zh.copy(s).invert(),il.copy(t.ray).applyMatrix4(Zh),!(this.boundingBox!==null&&il.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,il)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Ie,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Sh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ff?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,s=this.geometry;qh.fromBufferAttribute(s.attributes.skinIndex,t),$h.fromBufferAttribute(s.attributes.skinWeight,t),Xh.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const o=$h.getComponent(r);if(o!==0){const a=qh.getComponent(r);Yh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Fp.copy(Xh).applyMatrix4(Yh),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class pd extends We{constructor(){super(),this.isBone=!0,this.type="Bone"}}class qc extends Tn{constructor(t=null,e=1,n=1,s,r,o,a,l,c=On,h=On,u,f){super(null,o,a,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const jh=new he,Op=new he;class $c{constructor(t=[],e=[]){this.uuid=Ts(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new he)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new he;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:Op;jh.multiplyMatrices(a,e[r]),jh.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new $c(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new qc(e,t,t,Fn,ni);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){const r=t.bones[n];let o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new pd),this.bones.push(o),this.boneInverses.push(new he().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const o=e[s];t.bones.push(o.uuid);const a=n[s];t.boneInverses.push(a.toArray())}return t}}class or extends cn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ks=new he,Kh=new he,Lo=[],Jh=new ii,Bp=new he,kr=new Jt,Fr=new Li;class wn extends Jt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new or(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Bp)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ii),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ks),Jh.copy(t.boundingBox).applyMatrix4(Ks),this.boundingBox.union(Jh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Li),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ks),Fr.copy(t.boundingSphere).applyMatrix4(Ks),this.boundingSphere.union(Fr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(kr.geometry=this.geometry,kr.material=this.material,kr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fr.copy(this.boundingSphere),Fr.applyMatrix4(n),t.ray.intersectsSphere(Fr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ks),Kh.multiplyMatrices(n,Ks),kr.matrixWorld=Kh,kr.raycast(t,Lo);for(let o=0,a=Lo.length;o<a;o++){const l=Lo[o];l.instanceId=r,l.object=this,e.push(l)}Lo.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new or(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new qc(new Float32Array(s*this.count),s,this.count,kc,ni));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const sl=new z,Hp=new z,Gp=new xe;class ci{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=sl.subVectors(n,e).cross(Hp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(sl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Gp.getNormalMatrix(t),s=this.coplanarPoint(sl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ds=new Li,Vp=new Gt(.5,.5),Uo=new z;class Yc{constructor(t=new ci,e=new ci,n=new ci,s=new ci,r=new ci,o=new ci){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ui,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],d=r[7],m=r[8],x=r[9],g=r[10],p=r[11],y=r[12],_=r[13],v=r[14],C=r[15];if(s[0].setComponents(c-o,d-h,p-m,C-y).normalize(),s[1].setComponents(c+o,d+h,p+m,C+y).normalize(),s[2].setComponents(c+a,d+u,p+x,C+_).normalize(),s[3].setComponents(c-a,d-u,p-x,C-_).normalize(),n)s[4].setComponents(l,f,g,v).normalize(),s[5].setComponents(c-l,d-f,p-g,C-v).normalize();else if(s[4].setComponents(c-l,d-f,p-g,C-v).normalize(),e===ui)s[5].setComponents(c+l,d+f,p+g,C+v).normalize();else if(e===la)s[5].setComponents(l,f,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(t){ds.center.set(0,0,0);const e=Vp.distanceTo(t.center);return ds.radius=.7071067811865476+e,ds.applyMatrix4(t.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Uo.x=s.normal.x>0?t.max.x:t.min.x,Uo.y=s.normal.y>0?t.max.y:t.min.y,Uo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Uo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Zc extends ss{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ua=new z,da=new z,Qh=new he,Or=new br,No=new Li,rl=new z,tu=new z;class so extends We{constructor(t=new Te,e=new Zc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)ua.fromBufferAttribute(e,s-1),da.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=ua.distanceTo(da);t.setAttribute("lineDistance",new Wt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),No.copy(n.boundingSphere),No.applyMatrix4(s),No.radius+=r,t.ray.intersectsSphere(No)===!1)return;Qh.copy(s).invert(),Or.copy(t.ray).applyMatrix4(Qh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let x=d,g=m-1;x<g;x+=c){const p=h.getX(x),y=h.getX(x+1),_=ko(this,t,Or,l,p,y,x);_&&e.push(_)}if(this.isLineLoop){const x=h.getX(m-1),g=h.getX(d),p=ko(this,t,Or,l,x,g,m-1);p&&e.push(p)}}else{const d=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let x=d,g=m-1;x<g;x+=c){const p=ko(this,t,Or,l,x,x+1,x);p&&e.push(p)}if(this.isLineLoop){const x=ko(this,t,Or,l,m-1,d,m-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ko(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(ua.fromBufferAttribute(a,s),da.fromBufferAttribute(a,r),e.distanceSqToSegment(ua,da,rl,tu)>n)return;rl.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(rl);if(!(c<t.near||c>t.far))return{distance:c,point:tu.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const eu=new z,nu=new z;class Wp extends so{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)eu.fromBufferAttribute(e,s),nu.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+eu.distanceTo(nu);t.setAttribute("lineDistance",new Wt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Xp extends so{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class qp extends ss{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new te(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const iu=new he,wc=new br,Fo=new Li,Oo=new z;class $p extends We{constructor(t=new Te,e=new qp){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fo.copy(n.boundingSphere),Fo.applyMatrix4(s),Fo.radius+=r,t.ray.intersectsSphere(Fo)===!1)return;iu.copy(s).invert(),wc.copy(t.ray).applyMatrix4(iu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let m=f,x=d;m<x;m++){const g=c.getX(m);Oo.fromBufferAttribute(u,g),su(Oo,g,l,s,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let m=f,x=d;m<x;m++)Oo.fromBufferAttribute(u,m),su(Oo,m,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function su(i,t,e,n,s,r,o){const a=wc.distanceSqToPoint(i);if(a<e){const l=new z;wc.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class md extends Tn{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class gd extends Tn{constructor(t,e,n=Ss,s,r,o,a=On,l=On,c,h=to,u=1){if(h!==to&&h!==eo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Vc(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class xd extends Tn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class _a extends Te{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new z,h=new Gt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){const d=n+u/e*s;c.x=t*Math.cos(d),c.y=t*Math.sin(d),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Wt(o,3)),this.setAttribute("normal",new Wt(a,3)),this.setAttribute("uv",new Wt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _a(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class As extends Te{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let m=0;const x=[],g=n/2;let p=0;y(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Wt(u,3)),this.setAttribute("normal",new Wt(f,3)),this.setAttribute("uv",new Wt(d,2));function y(){const v=new z,C=new z;let T=0;const E=(e-t)/n;for(let R=0;R<=r;R++){const b=[],S=R/r,L=S*(e-t)+t;for(let U=0;U<=s;U++){const Y=U/s,J=Y*l+a,H=Math.sin(J),q=Math.cos(J);C.x=L*H,C.y=-S*n+g,C.z=L*q,u.push(C.x,C.y,C.z),v.set(H,E,q).normalize(),f.push(v.x,v.y,v.z),d.push(Y,1-S),b.push(m++)}x.push(b)}for(let R=0;R<s;R++)for(let b=0;b<r;b++){const S=x[b][R],L=x[b+1][R],U=x[b+1][R+1],Y=x[b][R+1];(t>0||b!==0)&&(h.push(S,L,Y),T+=3),(e>0||b!==r-1)&&(h.push(L,U,Y),T+=3)}c.addGroup(p,T,0),p+=T}function _(v){const C=m,T=new Gt,E=new z;let R=0;const b=v===!0?t:e,S=v===!0?1:-1;for(let U=1;U<=s;U++)u.push(0,g*S,0),f.push(0,S,0),d.push(.5,.5),m++;const L=m;for(let U=0;U<=s;U++){const J=U/s*l+a,H=Math.cos(J),q=Math.sin(J);E.x=b*q,E.y=g*S,E.z=b*H,u.push(E.x,E.y,E.z),f.push(0,S,0),T.x=H*.5+.5,T.y=q*.5*S+.5,d.push(T.x,T.y),m++}for(let U=0;U<s;U++){const Y=C+U,J=L+U;v===!0?h.push(J,J+1,Y):h.push(J+1,J,Y),R+=3}c.addGroup(p,R,v===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new As(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class jc extends As{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new jc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class lo extends Te{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new Wt(r,3)),this.setAttribute("normal",new Wt(r.slice(),3)),this.setAttribute("uv",new Wt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const _=new z,v=new z,C=new z;for(let T=0;T<e.length;T+=3)d(e[T+0],_),d(e[T+1],v),d(e[T+2],C),l(_,v,C,y)}function l(y,_,v,C){const T=C+1,E=[];for(let R=0;R<=T;R++){E[R]=[];const b=y.clone().lerp(v,R/T),S=_.clone().lerp(v,R/T),L=T-R;for(let U=0;U<=L;U++)U===0&&R===T?E[R][U]=b:E[R][U]=b.clone().lerp(S,U/L)}for(let R=0;R<T;R++)for(let b=0;b<2*(T-R)-1;b++){const S=Math.floor(b/2);b%2===0?(f(E[R][S+1]),f(E[R+1][S]),f(E[R][S])):(f(E[R][S+1]),f(E[R+1][S+1]),f(E[R+1][S]))}}function c(y){const _=new z;for(let v=0;v<r.length;v+=3)_.x=r[v+0],_.y=r[v+1],_.z=r[v+2],_.normalize().multiplyScalar(y),r[v+0]=_.x,r[v+1]=_.y,r[v+2]=_.z}function h(){const y=new z;for(let _=0;_<r.length;_+=3){y.x=r[_+0],y.y=r[_+1],y.z=r[_+2];const v=g(y)/2/Math.PI+.5,C=p(y)/Math.PI+.5;o.push(v,1-C)}m(),u()}function u(){for(let y=0;y<o.length;y+=6){const _=o[y+0],v=o[y+2],C=o[y+4],T=Math.max(_,v,C),E=Math.min(_,v,C);T>.9&&E<.1&&(_<.2&&(o[y+0]+=1),v<.2&&(o[y+2]+=1),C<.2&&(o[y+4]+=1))}}function f(y){r.push(y.x,y.y,y.z)}function d(y,_){const v=y*3;_.x=t[v+0],_.y=t[v+1],_.z=t[v+2]}function m(){const y=new z,_=new z,v=new z,C=new z,T=new Gt,E=new Gt,R=new Gt;for(let b=0,S=0;b<r.length;b+=9,S+=6){y.set(r[b+0],r[b+1],r[b+2]),_.set(r[b+3],r[b+4],r[b+5]),v.set(r[b+6],r[b+7],r[b+8]),T.set(o[S+0],o[S+1]),E.set(o[S+2],o[S+3]),R.set(o[S+4],o[S+5]),C.copy(y).add(_).add(v).divideScalar(3);const L=g(C);x(T,S+0,y,L),x(E,S+2,_,L),x(R,S+4,v,L)}}function x(y,_,v,C){C<0&&y.x===1&&(o[_]=y.x-1),v.x===0&&v.z===0&&(o[_]=C/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new lo(t.vertices,t.indices,t.radius,t.details)}}class ya extends lo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ya(t.radius,t.detail)}}class Ui{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new Gt:new z);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new z,s=[],r=[],o=[],a=new z,l=new he;for(let d=0;d<=t;d++){const m=d/t;s[d]=this.getTangentAt(m,new z)}r[0]=new z,o[0]=new z;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Se(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,m))}o[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(Se(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(d=-d);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],d*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class vd extends Ui{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Gt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Yp extends vd{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Kc(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let f=(o-r)/c-(a-r)/(c+h)+(a-o)/h,d=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Bo=new z,ol=new Kc,al=new Kc,ll=new Kc;class ro extends Ui{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new z){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Bo.subVectors(s[0],s[1]).add(s[0]),c=Bo);const u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Bo.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Bo),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),d),x=Math.pow(u.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(h),d);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),ol.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,m,x,g),al.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,m,x,g),ll.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,m,x,g)}else this.curveType==="catmullrom"&&(ol.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),al.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),ll.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(ol.calc(l),al.calc(l),ll.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new z().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ru(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function Zp(i,t){const e=1-i;return e*e*t}function jp(i,t){return 2*(1-i)*i*t}function Kp(i,t){return i*i*t}function Yr(i,t,e,n){return Zp(i,t)+jp(i,e)+Kp(i,n)}function Jp(i,t){const e=1-i;return e*e*e*t}function Qp(i,t){const e=1-i;return 3*e*e*i*t}function tm(i,t){return 3*(1-i)*i*i*t}function em(i,t){return i*i*i*t}function Zr(i,t,e,n,s){return Jp(i,t)+Qp(i,e)+tm(i,n)+em(i,s)}class nm extends Ui{constructor(t=new Gt,e=new Gt,n=new Gt,s=new Gt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Gt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Zr(t,s.x,r.x,o.x,a.x),Zr(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class im extends Ui{constructor(t=new z,e=new z,n=new z,s=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new z){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Zr(t,s.x,r.x,o.x,a.x),Zr(t,s.y,r.y,o.y,a.y),Zr(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class sm extends Ui{constructor(t=new Gt,e=new Gt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Gt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Gt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class rm extends Ui{constructor(t=new z,e=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new z){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new z){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class om extends Ui{constructor(t=new Gt,e=new Gt,n=new Gt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Gt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Yr(t,s.x,r.x,o.x),Yr(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class _d extends Ui{constructor(t=new z,e=new z,n=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new z){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Yr(t,s.x,r.x,o.x),Yr(t,s.y,r.y,o.y),Yr(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class am extends Ui{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Gt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(ru(a,l.x,c.x,h.x,u.x),ru(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Gt().fromArray(s))}return this}}var lm=Object.freeze({__proto__:null,ArcCurve:Yp,CatmullRomCurve3:ro,CubicBezierCurve:nm,CubicBezierCurve3:im,EllipseCurve:vd,LineCurve:sm,LineCurve3:rm,QuadraticBezierCurve:om,QuadraticBezierCurve3:_d,SplineCurve:am});class Jc extends lo{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Jc(t.radius,t.detail)}}class Qc extends lo{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Qc(t.radius,t.detail)}}class Ti extends Te{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,f=e/l,d=[],m=[],x=[],g=[];for(let p=0;p<h;p++){const y=p*f-o;for(let _=0;_<c;_++){const v=_*u-r;m.push(v,-y,0),x.push(0,0,1),g.push(_/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const _=y+c*p,v=y+c*(p+1),C=y+1+c*(p+1),T=y+1+c*p;d.push(_,v,T),d.push(v,C,T)}this.setIndex(d),this.setAttribute("position",new Wt(m,3)),this.setAttribute("normal",new Wt(x,3)),this.setAttribute("uv",new Wt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ti(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ji extends Te{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],h=[];let u=t;const f=(e-t)/s,d=new z,m=new Gt;for(let x=0;x<=s;x++){for(let g=0;g<=n;g++){const p=r+g/n*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),m.x=(d.x/e+1)/2,m.y=(d.y/e+1)/2,h.push(m.x,m.y)}u+=f}for(let x=0;x<s;x++){const g=x*(n+1);for(let p=0;p<n;p++){const y=p+g,_=y,v=y+n+1,C=y+n+2,T=y+1;a.push(_,v,T),a.push(v,C,T)}}this.setIndex(a),this.setAttribute("position",new Wt(l,3)),this.setAttribute("normal",new Wt(c,3)),this.setAttribute("uv",new Wt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ji(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Xn extends Te{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new z,f=new z,d=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){const y=[],_=p/n;let v=0;p===0&&o===0?v=.5/e:p===n&&l===Math.PI&&(v=-.5/e);for(let C=0;C<=e;C++){const T=C/e;u.x=-t*Math.cos(s+T*r)*Math.sin(o+_*a),u.y=t*Math.cos(o+_*a),u.z=t*Math.sin(s+T*r)*Math.sin(o+_*a),m.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),g.push(T+v,1-_),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){const _=h[p][y+1],v=h[p][y],C=h[p+1][y],T=h[p+1][y+1];(p!==0||o>0)&&d.push(_,v,T),(p!==n-1||l<Math.PI)&&d.push(v,C,T)}this.setIndex(d),this.setAttribute("position",new Wt(m,3)),this.setAttribute("normal",new Wt(x,3)),this.setAttribute("uv",new Wt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class th extends Te{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],h=new z,u=new z,f=new z;for(let d=0;d<=n;d++)for(let m=0;m<=s;m++){const x=m/s*r,g=d/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(x),u.y=(t+e*Math.cos(g))*Math.sin(x),u.z=e*Math.sin(g),a.push(u.x,u.y,u.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(m/s),c.push(d/n)}for(let d=1;d<=n;d++)for(let m=1;m<=s;m++){const x=(s+1)*d+m-1,g=(s+1)*(d-1)+m-1,p=(s+1)*(d-1)+m,y=(s+1)*d+m;o.push(x,g,y),o.push(g,p,y)}this.setIndex(o),this.setAttribute("position",new Wt(a,3)),this.setAttribute("normal",new Wt(l,3)),this.setAttribute("uv",new Wt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new th(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Ma extends Te{constructor(t=new _d(new z(-1,-1,0),new z(-1,1,0),new z(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new z,l=new z,c=new Gt;let h=new z;const u=[],f=[],d=[],m=[];x(),this.setIndex(m),this.setAttribute("position",new Wt(u,3)),this.setAttribute("normal",new Wt(f,3)),this.setAttribute("uv",new Wt(d,2));function x(){for(let _=0;_<e;_++)g(_);g(r===!1?e:0),y(),p()}function g(_){h=t.getPointAt(_/e,h);const v=o.normals[_],C=o.binormals[_];for(let T=0;T<=s;T++){const E=T/s*Math.PI*2,R=Math.sin(E),b=-Math.cos(E);l.x=b*v.x+R*C.x,l.y=b*v.y+R*C.y,l.z=b*v.z+R*C.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let _=1;_<=e;_++)for(let v=1;v<=s;v++){const C=(s+1)*(_-1)+(v-1),T=(s+1)*_+(v-1),E=(s+1)*_+v,R=(s+1)*(_-1)+v;m.push(C,T,R),m.push(T,E,R)}}function y(){for(let _=0;_<=e;_++)for(let v=0;v<=s;v++)c.x=_/e,c.y=v/s,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Ma(new lm[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Ve extends ss{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Hc,this.normalScale=new Gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class yd extends Ve{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Gt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Se(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new te(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new te(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new te(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class En extends ss{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new te(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Hc,this.normalScale=new Gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class cm extends ss{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class hm extends ss{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Md extends Zc{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}class eh extends We{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new te(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class um extends eh{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(We.DEFAULT_UP),this.updateMatrix(),this.groundColor=new te(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const cl=new he,ou=new z,au=new z;class bd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Gt(512,512),this.mapType=di,this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Yc,this._frameExtents=new Gt(1,1),this._viewportCount=1,this._viewports=[new Ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;ou.setFromMatrixPosition(t.matrixWorld),e.position.copy(ou),au.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(au),e.updateMatrixWorld(),cl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(cl,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(cl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const lu=new he,Br=new z,hl=new z;class dm extends bd{constructor(){super(new zn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Gt(4,2),this._viewportCount=6,this._viewports=[new Ie(2,1,1,1),new Ie(0,1,1,1),new Ie(3,1,1,1),new Ie(1,1,1,1),new Ie(3,0,1,1),new Ie(1,0,1,1)],this._cubeDirections=[new z(1,0,0),new z(-1,0,0),new z(0,0,1),new z(0,0,-1),new z(0,1,0),new z(0,-1,0)],this._cubeUps=[new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,1,0),new z(0,0,1),new z(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Br.setFromMatrixPosition(t.matrixWorld),n.position.copy(Br),hl.copy(n.position),hl.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(hl),n.updateMatrixWorld(),s.makeTranslation(-Br.x,-Br.y,-Br.z),lu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lu,n.coordinateSystem,n.reversedDepth)}}class fm extends eh{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new dm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Sd extends dd{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class pm extends bd{constructor(){super(new Sd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class mm extends eh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(We.DEFAULT_UP),this.updateMatrix(),this.target=new We,this.shadow=new pm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class gm extends Te{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class xm extends zn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const cu=new he;class ul{constructor(t,e,n=0,s=1/0){this.ray=new br(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Wc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return cu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(cu),this}intersectObject(t,e=!0,n=[]){return Ec(t,this,n,e),n.sort(hu),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Ec(t[s],this,n,e);return n.sort(hu),n}}function hu(i,t){return i.distance-t.distance}function Ec(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Ec(r[o],t,e,!0)}}function uu(i,t,e,n){const s=vm(n);switch(e){case id:return i*t;case kc:return i*t/s.components*s.byteLength;case Fc:return i*t/s.components*s.byteLength;case rd:return i*t*2/s.components*s.byteLength;case Oc:return i*t*2/s.components*s.byteLength;case sd:return i*t*3/s.components*s.byteLength;case Fn:return i*t*4/s.components*s.byteLength;case Bc:return i*t*4/s.components*s.byteLength;case na:case ia:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case sa:case ra:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case jl:case Jl:return Math.max(i,16)*Math.max(t,8)/4;case Zl:case Kl:return Math.max(i,8)*Math.max(t,8)/2;case Ql:case tc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ec:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case nc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ic:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case sc:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case rc:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case oc:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ac:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case lc:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case cc:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case hc:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case uc:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case dc:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case fc:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case pc:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case mc:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case gc:case xc:case vc:return Math.ceil(i/4)*Math.ceil(t/4)*16;case _c:case yc:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Mc:case bc:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vm(i){switch(i){case di:case Qu:return{byteLength:1,components:1};case Jr:case td:case ao:return{byteLength:2,components:1};case Uc:case Nc:return{byteLength:2,components:4};case Ss:case Lc:case ni:return{byteLength:4,components:1};case ed:case nd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function wd(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function _m(i){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){const m=u[f],x=u[d];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++f,u[f]=x)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){const x=u[d];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var ym=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Mm=`#ifdef USE_ALPHAHASH
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
#endif`,bm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Sm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Em=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Tm=`#ifdef USE_AOMAP
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
#endif`,Am=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rm=`#ifdef USE_BATCHING
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
#endif`,Cm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Pm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Dm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Im=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,zm=`#ifdef USE_IRIDESCENCE
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
#endif`,Lm=`#ifdef USE_BUMPMAP
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
#endif`,Um=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Nm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,km=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Om=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Bm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Hm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Gm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Vm=`#define PI 3.141592653589793
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
} // validated`,Wm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Xm=`vec3 transformedNormal = objectNormal;
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
#endif`,qm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$m=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ym=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Km=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jm=`#ifdef USE_ENVMAP
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
#endif`,Qm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,t0=`#ifdef USE_ENVMAP
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
#endif`,e0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,n0=`#ifdef USE_ENVMAP
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
#endif`,i0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,s0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,r0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,o0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,a0=`#ifdef USE_GRADIENTMAP
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
}`,l0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,c0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,h0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,u0=`uniform bool receiveShadow;
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
#endif`,d0=`#ifdef USE_ENVMAP
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
#endif`,f0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,p0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,m0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,g0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,x0=`PhysicalMaterial material;
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
#endif`,v0=`struct PhysicalMaterial {
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
}`,_0=`
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
#endif`,y0=`#if defined( RE_IndirectDiffuse )
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
#endif`,M0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,b0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,S0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,w0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,E0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,T0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,A0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,R0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,C0=`#if defined( USE_POINTS_UV )
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
#endif`,P0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,D0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,I0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,z0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,L0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,U0=`#ifdef USE_MORPHTARGETS
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
#endif`,N0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,k0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,F0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,O0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,B0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,H0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,G0=`#ifdef USE_NORMALMAP
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
#endif`,V0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,W0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,X0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,q0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Y0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Z0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,j0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,K0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,J0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Q0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,eg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ng=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ig=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,sg=`float getShadowMask() {
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
}`,rg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,og=`#ifdef USE_SKINNING
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
#endif`,ag=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lg=`#ifdef USE_SKINNING
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
#endif`,cg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,hg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ug=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,dg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,fg=`#ifdef USE_TRANSMISSION
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
#endif`,pg=`#ifdef USE_TRANSMISSION
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
#endif`,mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _g=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yg=`uniform sampler2D t2D;
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
}`,Mg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Sg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eg=`#include <common>
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
}`,Tg=`#if DEPTH_PACKING == 3200
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
}`,Ag=`#define DISTANCE
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
}`,Rg=`#define DISTANCE
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
}`,Cg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Pg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dg=`uniform float scale;
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
}`,Ig=`uniform vec3 diffuse;
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
}`,zg=`#include <common>
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
}`,Lg=`uniform vec3 diffuse;
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
}`,Ug=`#define LAMBERT
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
}`,Ng=`#define LAMBERT
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
}`,kg=`#define MATCAP
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
}`,Fg=`#define MATCAP
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
}`,Og=`#define NORMAL
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
}`,Bg=`#define NORMAL
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
}`,Hg=`#define PHONG
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
}`,Gg=`#define PHONG
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
}`,Vg=`#define STANDARD
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
}`,Wg=`#define STANDARD
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
}`,Xg=`#define TOON
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
}`,qg=`#define TOON
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
}`,$g=`uniform float size;
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
}`,Yg=`uniform vec3 diffuse;
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
}`,Zg=`#include <common>
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
}`,jg=`uniform vec3 color;
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
}`,Kg=`uniform float rotation;
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
}`,Jg=`uniform vec3 diffuse;
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
}`,_e={alphahash_fragment:ym,alphahash_pars_fragment:Mm,alphamap_fragment:bm,alphamap_pars_fragment:Sm,alphatest_fragment:wm,alphatest_pars_fragment:Em,aomap_fragment:Tm,aomap_pars_fragment:Am,batching_pars_vertex:Rm,batching_vertex:Cm,begin_vertex:Pm,beginnormal_vertex:Dm,bsdfs:Im,iridescence_fragment:zm,bumpmap_pars_fragment:Lm,clipping_planes_fragment:Um,clipping_planes_pars_fragment:Nm,clipping_planes_pars_vertex:km,clipping_planes_vertex:Fm,color_fragment:Om,color_pars_fragment:Bm,color_pars_vertex:Hm,color_vertex:Gm,common:Vm,cube_uv_reflection_fragment:Wm,defaultnormal_vertex:Xm,displacementmap_pars_vertex:qm,displacementmap_vertex:$m,emissivemap_fragment:Ym,emissivemap_pars_fragment:Zm,colorspace_fragment:jm,colorspace_pars_fragment:Km,envmap_fragment:Jm,envmap_common_pars_fragment:Qm,envmap_pars_fragment:t0,envmap_pars_vertex:e0,envmap_physical_pars_fragment:d0,envmap_vertex:n0,fog_vertex:i0,fog_pars_vertex:s0,fog_fragment:r0,fog_pars_fragment:o0,gradientmap_pars_fragment:a0,lightmap_pars_fragment:l0,lights_lambert_fragment:c0,lights_lambert_pars_fragment:h0,lights_pars_begin:u0,lights_toon_fragment:f0,lights_toon_pars_fragment:p0,lights_phong_fragment:m0,lights_phong_pars_fragment:g0,lights_physical_fragment:x0,lights_physical_pars_fragment:v0,lights_fragment_begin:_0,lights_fragment_maps:y0,lights_fragment_end:M0,logdepthbuf_fragment:b0,logdepthbuf_pars_fragment:S0,logdepthbuf_pars_vertex:w0,logdepthbuf_vertex:E0,map_fragment:T0,map_pars_fragment:A0,map_particle_fragment:R0,map_particle_pars_fragment:C0,metalnessmap_fragment:P0,metalnessmap_pars_fragment:D0,morphinstance_vertex:I0,morphcolor_vertex:z0,morphnormal_vertex:L0,morphtarget_pars_vertex:U0,morphtarget_vertex:N0,normal_fragment_begin:k0,normal_fragment_maps:F0,normal_pars_fragment:O0,normal_pars_vertex:B0,normal_vertex:H0,normalmap_pars_fragment:G0,clearcoat_normal_fragment_begin:V0,clearcoat_normal_fragment_maps:W0,clearcoat_pars_fragment:X0,iridescence_pars_fragment:q0,opaque_fragment:$0,packing:Y0,premultiplied_alpha_fragment:Z0,project_vertex:j0,dithering_fragment:K0,dithering_pars_fragment:J0,roughnessmap_fragment:Q0,roughnessmap_pars_fragment:tg,shadowmap_pars_fragment:eg,shadowmap_pars_vertex:ng,shadowmap_vertex:ig,shadowmask_pars_fragment:sg,skinbase_vertex:rg,skinning_pars_vertex:og,skinning_vertex:ag,skinnormal_vertex:lg,specularmap_fragment:cg,specularmap_pars_fragment:hg,tonemapping_fragment:ug,tonemapping_pars_fragment:dg,transmission_fragment:fg,transmission_pars_fragment:pg,uv_pars_fragment:mg,uv_pars_vertex:gg,uv_vertex:xg,worldpos_vertex:vg,background_vert:_g,background_frag:yg,backgroundCube_vert:Mg,backgroundCube_frag:bg,cube_vert:Sg,cube_frag:wg,depth_vert:Eg,depth_frag:Tg,distanceRGBA_vert:Ag,distanceRGBA_frag:Rg,equirect_vert:Cg,equirect_frag:Pg,linedashed_vert:Dg,linedashed_frag:Ig,meshbasic_vert:zg,meshbasic_frag:Lg,meshlambert_vert:Ug,meshlambert_frag:Ng,meshmatcap_vert:kg,meshmatcap_frag:Fg,meshnormal_vert:Og,meshnormal_frag:Bg,meshphong_vert:Hg,meshphong_frag:Gg,meshphysical_vert:Vg,meshphysical_frag:Wg,meshtoon_vert:Xg,meshtoon_frag:qg,points_vert:$g,points_frag:Yg,shadow_vert:Zg,shadow_frag:jg,sprite_vert:Kg,sprite_frag:Jg},Ct={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new xe},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new xe}},envmap:{envMap:{value:null},envMapRotation:{value:new xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new xe},normalScale:{value:new Gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0},uvTransform:{value:new xe}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new Gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new xe},alphaMap:{value:null},alphaMapTransform:{value:new xe},alphaTest:{value:0}}},hi={basic:{uniforms:Cn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.fog]),vertexShader:_e.meshbasic_vert,fragmentShader:_e.meshbasic_frag},lambert:{uniforms:Cn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,Ct.lights,{emissive:{value:new te(0)}}]),vertexShader:_e.meshlambert_vert,fragmentShader:_e.meshlambert_frag},phong:{uniforms:Cn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,Ct.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30}}]),vertexShader:_e.meshphong_vert,fragmentShader:_e.meshphong_frag},standard:{uniforms:Cn([Ct.common,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.roughnessmap,Ct.metalnessmap,Ct.fog,Ct.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:_e.meshphysical_vert,fragmentShader:_e.meshphysical_frag},toon:{uniforms:Cn([Ct.common,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.gradientmap,Ct.fog,Ct.lights,{emissive:{value:new te(0)}}]),vertexShader:_e.meshtoon_vert,fragmentShader:_e.meshtoon_frag},matcap:{uniforms:Cn([Ct.common,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,{matcap:{value:null}}]),vertexShader:_e.meshmatcap_vert,fragmentShader:_e.meshmatcap_frag},points:{uniforms:Cn([Ct.points,Ct.fog]),vertexShader:_e.points_vert,fragmentShader:_e.points_frag},dashed:{uniforms:Cn([Ct.common,Ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:_e.linedashed_vert,fragmentShader:_e.linedashed_frag},depth:{uniforms:Cn([Ct.common,Ct.displacementmap]),vertexShader:_e.depth_vert,fragmentShader:_e.depth_frag},normal:{uniforms:Cn([Ct.common,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,{opacity:{value:1}}]),vertexShader:_e.meshnormal_vert,fragmentShader:_e.meshnormal_frag},sprite:{uniforms:Cn([Ct.sprite,Ct.fog]),vertexShader:_e.sprite_vert,fragmentShader:_e.sprite_frag},background:{uniforms:{uvTransform:{value:new xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:_e.background_vert,fragmentShader:_e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new xe}},vertexShader:_e.backgroundCube_vert,fragmentShader:_e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:_e.cube_vert,fragmentShader:_e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:_e.equirect_vert,fragmentShader:_e.equirect_frag},distanceRGBA:{uniforms:Cn([Ct.common,Ct.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:_e.distanceRGBA_vert,fragmentShader:_e.distanceRGBA_frag},shadow:{uniforms:Cn([Ct.lights,Ct.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:_e.shadow_vert,fragmentShader:_e.shadow_frag}};hi.physical={uniforms:Cn([hi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new xe},clearcoatNormalScale:{value:new Gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new xe},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new xe},transmissionSamplerSize:{value:new Gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new xe},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new xe},anisotropyVector:{value:new Gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new xe}}]),vertexShader:_e.meshphysical_vert,fragmentShader:_e.meshphysical_frag};const Ho={r:0,b:0,g:0},fs=new fi,Qg=new he;function tx(i,t,e,n,s,r,o){const a=new te(0);let l=r===!0?0:1,c,h,u=null,f=0,d=null;function m(_){let v=_.isScene===!0?_.background:null;return v&&v.isTexture&&(v=(_.backgroundBlurriness>0?e:t).get(v)),v}function x(_){let v=!1;const C=m(_);C===null?p(a,l):C&&C.isColor&&(p(C,1),v=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(_,v){const C=m(v);C&&(C.isCubeTexture||C.mapping===xa)?(h===void 0&&(h=new Jt(new zi(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:_r(hi.backgroundCube.uniforms),vertexShader:hi.backgroundCube.vertexShader,fragmentShader:hi.backgroundCube.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),fs.copy(v.backgroundRotation),fs.x*=-1,fs.y*=-1,fs.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(fs.y*=-1,fs.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Qg.makeRotationFromEuler(fs)),h.material.toneMapped=Le.getTransfer(C.colorSpace)!==Ge,(u!==C||f!==C.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=C,f=C.version,d=i.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new Jt(new Ti(2,2),new Wn({name:"BackgroundMaterial",uniforms:_r(hi.background.uniforms),vertexShader:hi.background.vertexShader,fragmentShader:hi.background.fragmentShader,side:Ii,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Le.getTransfer(C.colorSpace)!==Ge,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||f!==C.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=C,f=C.version,d=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function p(_,v){_.getRGB(Ho,ud(i)),n.buffers.color.setClear(Ho.r,Ho.g,Ho.b,v,o)}function y(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,v=1){a.set(_),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,p(a,l)},render:x,addToRenderList:g,dispose:y}}function ex(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(S,L,U,Y,J){let H=!1;const q=u(Y,U,L);r!==q&&(r=q,c(r.object)),H=d(S,Y,U,J),H&&m(S,Y,U,J),J!==null&&t.update(J,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,v(S,L,U,Y),J!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function l(){return i.createVertexArray()}function c(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function u(S,L,U){const Y=U.wireframe===!0;let J=n[S.id];J===void 0&&(J={},n[S.id]=J);let H=J[L.id];H===void 0&&(H={},J[L.id]=H);let q=H[Y];return q===void 0&&(q=f(l()),H[Y]=q),q}function f(S){const L=[],U=[],Y=[];for(let J=0;J<e;J++)L[J]=0,U[J]=0,Y[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:U,attributeDivisors:Y,object:S,attributes:{},index:null}}function d(S,L,U,Y){const J=r.attributes,H=L.attributes;let q=0;const B=U.getAttributes();for(const O in B)if(B[O].location>=0){const W=J[O];let vt=H[O];if(vt===void 0&&(O==="instanceMatrix"&&S.instanceMatrix&&(vt=S.instanceMatrix),O==="instanceColor"&&S.instanceColor&&(vt=S.instanceColor)),W===void 0||W.attribute!==vt||vt&&W.data!==vt.data)return!0;q++}return r.attributesNum!==q||r.index!==Y}function m(S,L,U,Y){const J={},H=L.attributes;let q=0;const B=U.getAttributes();for(const O in B)if(B[O].location>=0){let W=H[O];W===void 0&&(O==="instanceMatrix"&&S.instanceMatrix&&(W=S.instanceMatrix),O==="instanceColor"&&S.instanceColor&&(W=S.instanceColor));const vt={};vt.attribute=W,W&&W.data&&(vt.data=W.data),J[O]=vt,q++}r.attributes=J,r.attributesNum=q,r.index=Y}function x(){const S=r.newAttributes;for(let L=0,U=S.length;L<U;L++)S[L]=0}function g(S){p(S,0)}function p(S,L){const U=r.newAttributes,Y=r.enabledAttributes,J=r.attributeDivisors;U[S]=1,Y[S]===0&&(i.enableVertexAttribArray(S),Y[S]=1),J[S]!==L&&(i.vertexAttribDivisor(S,L),J[S]=L)}function y(){const S=r.newAttributes,L=r.enabledAttributes;for(let U=0,Y=L.length;U<Y;U++)L[U]!==S[U]&&(i.disableVertexAttribArray(U),L[U]=0)}function _(S,L,U,Y,J,H,q){q===!0?i.vertexAttribIPointer(S,L,U,J,H):i.vertexAttribPointer(S,L,U,Y,J,H)}function v(S,L,U,Y){x();const J=Y.attributes,H=U.getAttributes(),q=L.defaultAttributeValues;for(const B in H){const O=H[B];if(O.location>=0){let tt=J[B];if(tt===void 0&&(B==="instanceMatrix"&&S.instanceMatrix&&(tt=S.instanceMatrix),B==="instanceColor"&&S.instanceColor&&(tt=S.instanceColor)),tt!==void 0){const W=tt.normalized,vt=tt.itemSize,Xt=t.get(tt);if(Xt===void 0)continue;const Me=Xt.buffer,ce=Xt.type,ht=Xt.bytesPerElement,$=ce===i.INT||ce===i.UNSIGNED_INT||tt.gpuType===Lc;if(tt.isInterleavedBufferAttribute){const rt=tt.data,yt=rt.stride,Vt=tt.offset;if(rt.isInstancedInterleavedBuffer){for(let kt=0;kt<O.locationSize;kt++)p(O.location+kt,rt.meshPerAttribute);S.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let kt=0;kt<O.locationSize;kt++)g(O.location+kt);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let kt=0;kt<O.locationSize;kt++)_(O.location+kt,vt/O.locationSize,ce,W,yt*ht,(Vt+vt/O.locationSize*kt)*ht,$)}else{if(tt.isInstancedBufferAttribute){for(let rt=0;rt<O.locationSize;rt++)p(O.location+rt,tt.meshPerAttribute);S.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let rt=0;rt<O.locationSize;rt++)g(O.location+rt);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let rt=0;rt<O.locationSize;rt++)_(O.location+rt,vt/O.locationSize,ce,W,vt*ht,vt/O.locationSize*rt*ht,$)}}else if(q!==void 0){const W=q[B];if(W!==void 0)switch(W.length){case 2:i.vertexAttrib2fv(O.location,W);break;case 3:i.vertexAttrib3fv(O.location,W);break;case 4:i.vertexAttrib4fv(O.location,W);break;default:i.vertexAttrib1fv(O.location,W)}}}}y()}function C(){R();for(const S in n){const L=n[S];for(const U in L){const Y=L[U];for(const J in Y)h(Y[J].object),delete Y[J];delete L[U]}delete n[S]}}function T(S){if(n[S.id]===void 0)return;const L=n[S.id];for(const U in L){const Y=L[U];for(const J in Y)h(Y[J].object),delete Y[J];delete L[U]}delete n[S.id]}function E(S){for(const L in n){const U=n[L];if(U[S.id]===void 0)continue;const Y=U[S.id];for(const J in Y)h(Y[J].object),delete Y[J];delete U[S.id]}}function R(){b(),o=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:b,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:x,enableAttribute:g,disableUnusedAttributes:y}}function nx(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let m=0;m<u;m++)d+=h[m];e.update(d,n,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<c.length;m++)o(c[m],h[m],f[m]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let m=0;for(let x=0;x<u;x++)m+=h[x]*f[x];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function ix(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==Fn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const R=E===ao&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==di&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==ni&&!R)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),C=m>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:_,maxFragmentUniforms:v,vertexTextures:C,maxSamples:T}}function sx(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new ci,a=new xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const m=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):c();else{const y=r?0:n,_=y*4;let v=p.clippingState||null;l.value=v,v=h(m,f,_,d);for(let C=0;C!==_;++C)v[C]=e[C];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,m){const x=u!==null?u.length:0;let g=null;if(x!==0){if(g=l.value,m!==!0||g===null){const p=d+x*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let _=0,v=d;_!==x;++_,v+=4)o.copy(u[_]).applyMatrix4(y,a),o.normal.toArray(g,v),g[v+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}function rx(i){let t=new WeakMap;function e(o,a){return a===ql?o.mapping=mr:a===$l&&(o.mapping=gr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ql||a===$l)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Up(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const ar=4,du=[.125,.215,.35,.446,.526,.582],_s=20,dl=new Sd,fu=new te;let fl=null,pl=0,ml=0,gl=!1;const gs=(1+Math.sqrt(5))/2,Js=1/gs,pu=[new z(-gs,Js,0),new z(gs,Js,0),new z(-Js,0,gs),new z(Js,0,gs),new z(0,gs,-Js),new z(0,gs,Js),new z(-1,1,-1),new z(1,1,-1),new z(-1,1,1),new z(1,1,1)],ox=new z;class mu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=ox}=r;fl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=vu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(fl,pl,ml),this._renderer.xr.enabled=gl,t.scissorTest=!1,Go(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===mr||t.mapping===gr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),fl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:ei,minFilter:ei,generateMipmaps:!1,type:ao,format:Fn,colorSpace:vr,depthBuffer:!1},s=gu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gu(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ax(r)),this._blurMaterial=lx(r,t,e)}return s}_compileMaterial(t){const e=new Jt(this._lodPlanes[0],t);this._renderer.compile(e,dl)}_sceneToCubeUV(t,e,n,s,r){const l=new zn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(fu),u.toneMapping=ts,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const x=new _n({name:"PMREM.Background",side:Dn,depthWrite:!1,depthTest:!1}),g=new Jt(new zi,x);let p=!1;const y=t.background;y?y.isColor&&(x.color.copy(y),t.background=null,p=!0):(x.color.copy(fu),p=!0);for(let _=0;_<6;_++){const v=_%3;v===0?(l.up.set(0,c[_],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[_],r.y,r.z)):v===1?(l.up.set(0,0,c[_]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[_],r.z)):(l.up.set(0,c[_],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[_]));const C=this._cubeSize;Go(s,v*C,_>2?C:0,C,C),u.setRenderTarget(s),p&&u.render(g,l),u.render(t,l)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=y}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===mr||t.mapping===gr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=vu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Jt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Go(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,dl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=pu[(s-r-1)%pu.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Jt(this._lodPlanes[s],c),f=c.uniforms,d=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*_s-1),x=r/m,g=isFinite(r)?1+Math.floor(h*x):_s;g>_s&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${_s}`);const p=[];let y=0;for(let E=0;E<_s;++E){const R=E/x,b=Math.exp(-R*R/2);p.push(b),E===0?y+=b:E<g&&(y+=2*b)}for(let E=0;E<p.length;E++)p[E]=p[E]/y;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:_}=this;f.dTheta.value=m,f.mipInt.value=_-n;const v=this._sizeLods[s],C=3*v*(s>_-ar?s-_+ar:0),T=4*(this._cubeSize-v);Go(e,C,T,3*v,2*v),l.setRenderTarget(e),l.render(u,dl)}}function ax(i){const t=[],e=[],n=[];let s=i;const r=i-ar+1+du.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-ar?l=du[o-i+ar-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,m=6,x=3,g=2,p=1,y=new Float32Array(x*m*d),_=new Float32Array(g*m*d),v=new Float32Array(p*m*d);for(let T=0;T<d;T++){const E=T%3*2/3-1,R=T>2?0:-1,b=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];y.set(b,x*m*T),_.set(f,g*m*T);const S=[T,T,T,T,T,T];v.set(S,p*m*T)}const C=new Te;C.setAttribute("position",new cn(y,x)),C.setAttribute("uv",new cn(_,g)),C.setAttribute("faceIndex",new cn(v,p)),t.push(C),s>ar&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function gu(i,t,e){const n=new ns(i,t,e);return n.texture.mapping=xa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Go(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function lx(i,t,e){const n=new Float32Array(_s),s=new z(0,1,0);return new Wn({name:"SphericalGaussianBlur",defines:{n:_s,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:nh(),fragmentShader:`

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
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function xu(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nh(),fragmentShader:`

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
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function vu(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function nh(){return`

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
	`}function cx(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ql||l===$l,h=l===mr||l===gr;if(c||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new mu(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return c&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new mu(i)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function hx(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&io("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function ux(i,t,e,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const m in f.attributes)t.remove(f.attributes[m]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function c(u){const f=[],d=u.index,m=u.attributes.position;let x=0;if(d!==null){const y=d.array;x=d.version;for(let _=0,v=y.length;_<v;_+=3){const C=y[_+0],T=y[_+1],E=y[_+2];f.push(C,T,T,E,E,C)}}else if(m!==void 0){const y=m.array;x=m.version;for(let _=0,v=y.length/3-1;_<v;_+=3){const C=_+0,T=_+1,E=_+2;f.push(C,T,T,E,E,C)}}else return;const g=new(ad(f)?hd:Xc)(f,1);g.version=x;const p=r.get(u);p&&t.remove(p),r.set(u,g)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function dx(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function c(f,d,m){m!==0&&(i.drawElementsInstanced(n,d,r,f*o,m),e.update(d,n,m))}function h(f,d,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,m);let g=0;for(let p=0;p<m;p++)g+=d[p];e.update(g,n,1)}function u(f,d,m,x){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,x,0,m);let p=0;for(let y=0;y<m;y++)p+=d[y]*x[y];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function fx(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function px(i,t,e){const n=new WeakMap,s=new Ie;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let S=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",S)};var d=S;f!==void 0&&f.texture.dispose();const m=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],_=a.morphAttributes.color||[];let v=0;m===!0&&(v=1),x===!0&&(v=2),g===!0&&(v=3);let C=a.attributes.position.count*v,T=1;C>t.maxTextureSize&&(T=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const E=new Float32Array(C*T*4*u),R=new ld(E,C,T,u);R.type=ni,R.needsUpdate=!0;const b=v*4;for(let L=0;L<u;L++){const U=p[L],Y=y[L],J=_[L],H=C*T*4*L;for(let q=0;q<U.count;q++){const B=q*b;m===!0&&(s.fromBufferAttribute(U,q),E[H+B+0]=s.x,E[H+B+1]=s.y,E[H+B+2]=s.z,E[H+B+3]=0),x===!0&&(s.fromBufferAttribute(Y,q),E[H+B+4]=s.x,E[H+B+5]=s.y,E[H+B+6]=s.z,E[H+B+7]=0),g===!0&&(s.fromBufferAttribute(J,q),E[H+B+8]=s.x,E[H+B+9]=s.y,E[H+B+10]=s.z,E[H+B+11]=J.itemSize===4?s.w:1)}}f={count:u,texture:R,size:new Gt(C,T)},n.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const x=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function mx(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const Ed=new Tn,_u=new gd(1,1),Td=new ld,Ad=new _p,Rd=new fd,yu=[],Mu=[],bu=new Float32Array(16),Su=new Float32Array(9),wu=new Float32Array(4);function Sr(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=yu[s];if(r===void 0&&(r=new Float32Array(s),yu[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function hn(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function un(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ba(i,t){let e=Mu[t];e===void 0&&(e=new Int32Array(t),Mu[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function gx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function xx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(hn(e,t))return;i.uniform2fv(this.addr,t),un(e,t)}}function vx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(hn(e,t))return;i.uniform3fv(this.addr,t),un(e,t)}}function _x(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(hn(e,t))return;i.uniform4fv(this.addr,t),un(e,t)}}function yx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(hn(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),un(e,t)}else{if(hn(e,n))return;wu.set(n),i.uniformMatrix2fv(this.addr,!1,wu),un(e,n)}}function Mx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(hn(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),un(e,t)}else{if(hn(e,n))return;Su.set(n),i.uniformMatrix3fv(this.addr,!1,Su),un(e,n)}}function bx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(hn(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),un(e,t)}else{if(hn(e,n))return;bu.set(n),i.uniformMatrix4fv(this.addr,!1,bu),un(e,n)}}function Sx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function wx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(hn(e,t))return;i.uniform2iv(this.addr,t),un(e,t)}}function Ex(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(hn(e,t))return;i.uniform3iv(this.addr,t),un(e,t)}}function Tx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(hn(e,t))return;i.uniform4iv(this.addr,t),un(e,t)}}function Ax(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Rx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(hn(e,t))return;i.uniform2uiv(this.addr,t),un(e,t)}}function Cx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(hn(e,t))return;i.uniform3uiv(this.addr,t),un(e,t)}}function Px(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(hn(e,t))return;i.uniform4uiv(this.addr,t),un(e,t)}}function Dx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(_u.compareFunction=od,r=_u):r=Ed,e.setTexture2D(t||r,s)}function Ix(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Ad,s)}function zx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Rd,s)}function Lx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Td,s)}function Ux(i){switch(i){case 5126:return gx;case 35664:return xx;case 35665:return vx;case 35666:return _x;case 35674:return yx;case 35675:return Mx;case 35676:return bx;case 5124:case 35670:return Sx;case 35667:case 35671:return wx;case 35668:case 35672:return Ex;case 35669:case 35673:return Tx;case 5125:return Ax;case 36294:return Rx;case 36295:return Cx;case 36296:return Px;case 35678:case 36198:case 36298:case 36306:case 35682:return Dx;case 35679:case 36299:case 36307:return Ix;case 35680:case 36300:case 36308:case 36293:return zx;case 36289:case 36303:case 36311:case 36292:return Lx}}function Nx(i,t){i.uniform1fv(this.addr,t)}function kx(i,t){const e=Sr(t,this.size,2);i.uniform2fv(this.addr,e)}function Fx(i,t){const e=Sr(t,this.size,3);i.uniform3fv(this.addr,e)}function Ox(i,t){const e=Sr(t,this.size,4);i.uniform4fv(this.addr,e)}function Bx(i,t){const e=Sr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Hx(i,t){const e=Sr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Gx(i,t){const e=Sr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Vx(i,t){i.uniform1iv(this.addr,t)}function Wx(i,t){i.uniform2iv(this.addr,t)}function Xx(i,t){i.uniform3iv(this.addr,t)}function qx(i,t){i.uniform4iv(this.addr,t)}function $x(i,t){i.uniform1uiv(this.addr,t)}function Yx(i,t){i.uniform2uiv(this.addr,t)}function Zx(i,t){i.uniform3uiv(this.addr,t)}function jx(i,t){i.uniform4uiv(this.addr,t)}function Kx(i,t,e){const n=this.cache,s=t.length,r=ba(e,s);hn(n,r)||(i.uniform1iv(this.addr,r),un(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Ed,r[o])}function Jx(i,t,e){const n=this.cache,s=t.length,r=ba(e,s);hn(n,r)||(i.uniform1iv(this.addr,r),un(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Ad,r[o])}function Qx(i,t,e){const n=this.cache,s=t.length,r=ba(e,s);hn(n,r)||(i.uniform1iv(this.addr,r),un(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Rd,r[o])}function tv(i,t,e){const n=this.cache,s=t.length,r=ba(e,s);hn(n,r)||(i.uniform1iv(this.addr,r),un(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Td,r[o])}function ev(i){switch(i){case 5126:return Nx;case 35664:return kx;case 35665:return Fx;case 35666:return Ox;case 35674:return Bx;case 35675:return Hx;case 35676:return Gx;case 5124:case 35670:return Vx;case 35667:case 35671:return Wx;case 35668:case 35672:return Xx;case 35669:case 35673:return qx;case 5125:return $x;case 36294:return Yx;case 36295:return Zx;case 36296:return jx;case 35678:case 36198:case 36298:case 36306:case 35682:return Kx;case 35679:case 36299:case 36307:return Jx;case 35680:case 36300:case 36308:case 36293:return Qx;case 36289:case 36303:case 36311:case 36292:return tv}}class nv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Ux(e.type)}}class iv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ev(e.type)}}class sv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const xl=/(\w+)(\])?(\[|\.)?/g;function Eu(i,t){i.seq.push(t),i.map[t.id]=t}function rv(i,t,e){const n=i.name,s=n.length;for(xl.lastIndex=0;;){const r=xl.exec(n),o=xl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Eu(e,c===void 0?new nv(a,i,t):new iv(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new sv(a),Eu(e,u)),e=u}}}class oa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);rv(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Tu(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const ov=37297;let av=0;function lv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Au=new xe;function cv(i){Le._getMatrix(Au,Le.workingColorSpace,i);const t=`mat3( ${Au.elements.map(e=>e.toFixed(4))} )`;switch(Le.getTransfer(i)){case aa:return[t,"LinearTransferOETF"];case Ge:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Ru(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+lv(i.getShaderSource(t),a)}else return r}function hv(i,t){const e=cv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function uv(i,t){let e;switch(t){case If:e="Linear";break;case zf:e="Reinhard";break;case Lf:e="Cineon";break;case Ku:e="ACESFilmic";break;case Nf:e="AgX";break;case kf:e="Neutral";break;case Uf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Vo=new z;function dv(){Le.getLuminanceCoefficients(Vo);const i=Vo.x.toFixed(4),t=Vo.y.toFixed(4),e=Vo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wr).join(`
`)}function pv(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function mv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Wr(i){return i!==""}function Cu(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Pu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const gv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Tc(i){return i.replace(gv,vv)}const xv=new Map;function vv(i,t){let e=_e[t];if(e===void 0){const n=xv.get(t);if(n!==void 0)e=_e[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Tc(e)}const _v=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Du(i){return i.replace(_v,yv)}function yv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Iu(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Mv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Zu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===uf?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Si&&(t="SHADOWMAP_TYPE_VSM"),t}function bv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case mr:case gr:t="ENVMAP_TYPE_CUBE";break;case xa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Sv(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case gr:t="ENVMAP_MODE_REFRACTION";break}return t}function wv(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ju:t="ENVMAP_BLENDING_MULTIPLY";break;case Pf:t="ENVMAP_BLENDING_MIX";break;case Df:t="ENVMAP_BLENDING_ADD";break}return t}function Ev(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Tv(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Mv(e),c=bv(e),h=Sv(e),u=wv(e),f=Ev(e),d=fv(e),m=pv(r),x=s.createProgram();let g,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Wr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Wr).join(`
`),p.length>0&&(p+=`
`)):(g=[Iu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wr).join(`
`),p=[Iu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ts?"#define TONE_MAPPING":"",e.toneMapping!==ts?_e.tonemapping_pars_fragment:"",e.toneMapping!==ts?uv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",_e.colorspace_pars_fragment,hv("linearToOutputTexel",e.outputColorSpace),dv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Wr).join(`
`)),o=Tc(o),o=Cu(o,e),o=Pu(o,e),a=Tc(a),a=Cu(a,e),a=Pu(a,e),o=Du(o),a=Du(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Th?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Th?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const _=y+g+o,v=y+p+a,C=Tu(s,s.VERTEX_SHADER,_),T=Tu(s,s.FRAGMENT_SHADER,v);s.attachShader(x,C),s.attachShader(x,T),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function E(L){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(x)||"",Y=s.getShaderInfoLog(C)||"",J=s.getShaderInfoLog(T)||"",H=U.trim(),q=Y.trim(),B=J.trim();let O=!0,tt=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(O=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,C,T);else{const W=Ru(s,C,"vertex"),vt=Ru(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+H+`
`+W+`
`+vt)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(q===""||B==="")&&(tt=!1);tt&&(L.diagnostics={runnable:O,programLog:H,vertexShader:{log:q,prefix:g},fragmentShader:{log:B,prefix:p}})}s.deleteShader(C),s.deleteShader(T),R=new oa(s,x),b=mv(s,x)}let R;this.getUniforms=function(){return R===void 0&&E(this),R};let b;this.getAttributes=function(){return b===void 0&&E(this),b};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(x,ov)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=av++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=C,this.fragmentShader=T,this}let Av=0;class Rv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Cv(t),e.set(t,n)),n}}class Cv{constructor(t){this.id=Av++,this.code=t,this.usedTimes=0}}function Pv(i,t,e,n,s,r,o){const a=new Wc,l=new Rv,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return c.add(b),b===0?"uv":`uv${b}`}function g(b,S,L,U,Y){const J=U.fog,H=Y.geometry,q=b.isMeshStandardMaterial?U.environment:null,B=(b.isMeshStandardMaterial?e:t).get(b.envMap||q),O=B&&B.mapping===xa?B.image.height:null,tt=m[b.type];b.precision!==null&&(d=s.getMaxPrecision(b.precision),d!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const W=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,vt=W!==void 0?W.length:0;let Xt=0;H.morphAttributes.position!==void 0&&(Xt=1),H.morphAttributes.normal!==void 0&&(Xt=2),H.morphAttributes.color!==void 0&&(Xt=3);let Me,ce,ht,$;if(tt){const ve=hi[tt];Me=ve.vertexShader,ce=ve.fragmentShader}else Me=b.vertexShader,ce=b.fragmentShader,l.update(b),ht=l.getVertexShaderID(b),$=l.getFragmentShaderID(b);const rt=i.getRenderTarget(),yt=i.state.buffers.depth.getReversed(),Vt=Y.isInstancedMesh===!0,kt=Y.isBatchedMesh===!0,fe=!!b.map,we=!!b.matcap,D=!!B,ee=!!b.aoMap,Yt=!!b.lightMap,qt=!!b.bumpMap,Lt=!!b.normalMap,ie=!!b.displacementMap,pt=!!b.emissiveMap,Mt=!!b.metalnessMap,le=!!b.roughnessMap,Pe=b.anisotropy>0,P=b.clearcoat>0,w=b.dispersion>0,Q=b.iridescence>0,at=b.sheen>0,lt=b.transmission>0,ot=Pe&&!!b.anisotropyMap,Ut=P&&!!b.clearcoatMap,ct=P&&!!b.clearcoatNormalMap,St=P&&!!b.clearcoatRoughnessMap,Pt=Q&&!!b.iridescenceMap,mt=Q&&!!b.iridescenceThicknessMap,Rt=at&&!!b.sheenColorMap,Zt=at&&!!b.sheenRoughnessMap,Ot=!!b.specularMap,wt=!!b.specularColorMap,ue=!!b.specularIntensityMap,X=lt&&!!b.transmissionMap,_t=lt&&!!b.thicknessMap,Et=!!b.gradientMap,Ft=!!b.alphaMap,gt=b.alphaTest>0,ut=!!b.alphaHash,Bt=!!b.extensions;let de=ts;b.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(de=i.toneMapping);const Oe={shaderID:tt,shaderType:b.type,shaderName:b.name,vertexShader:Me,fragmentShader:ce,defines:b.defines,customVertexShaderID:ht,customFragmentShaderID:$,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:kt,batchingColor:kt&&Y._colorsTexture!==null,instancing:Vt,instancingColor:Vt&&Y.instanceColor!==null,instancingMorph:Vt&&Y.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:rt===null?i.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:vr,alphaToCoverage:!!b.alphaToCoverage,map:fe,matcap:we,envMap:D,envMapMode:D&&B.mapping,envMapCubeUVHeight:O,aoMap:ee,lightMap:Yt,bumpMap:qt,normalMap:Lt,displacementMap:f&&ie,emissiveMap:pt,normalMapObjectSpace:Lt&&b.normalMapType===Gf,normalMapTangentSpace:Lt&&b.normalMapType===Hc,metalnessMap:Mt,roughnessMap:le,anisotropy:Pe,anisotropyMap:ot,clearcoat:P,clearcoatMap:Ut,clearcoatNormalMap:ct,clearcoatRoughnessMap:St,dispersion:w,iridescence:Q,iridescenceMap:Pt,iridescenceThicknessMap:mt,sheen:at,sheenColorMap:Rt,sheenRoughnessMap:Zt,specularMap:Ot,specularColorMap:wt,specularIntensityMap:ue,transmission:lt,transmissionMap:X,thicknessMap:_t,gradientMap:Et,opaque:b.transparent===!1&&b.blending===ur&&b.alphaToCoverage===!1,alphaMap:Ft,alphaTest:gt,alphaHash:ut,combine:b.combine,mapUv:fe&&x(b.map.channel),aoMapUv:ee&&x(b.aoMap.channel),lightMapUv:Yt&&x(b.lightMap.channel),bumpMapUv:qt&&x(b.bumpMap.channel),normalMapUv:Lt&&x(b.normalMap.channel),displacementMapUv:ie&&x(b.displacementMap.channel),emissiveMapUv:pt&&x(b.emissiveMap.channel),metalnessMapUv:Mt&&x(b.metalnessMap.channel),roughnessMapUv:le&&x(b.roughnessMap.channel),anisotropyMapUv:ot&&x(b.anisotropyMap.channel),clearcoatMapUv:Ut&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:ct&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:St&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Pt&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:Rt&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:Zt&&x(b.sheenRoughnessMap.channel),specularMapUv:Ot&&x(b.specularMap.channel),specularColorMapUv:wt&&x(b.specularColorMap.channel),specularIntensityMapUv:ue&&x(b.specularIntensityMap.channel),transmissionMapUv:X&&x(b.transmissionMap.channel),thicknessMapUv:_t&&x(b.thicknessMap.channel),alphaMapUv:Ft&&x(b.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(Lt||Pe),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!H.attributes.uv&&(fe||Ft),fog:!!J,useFog:b.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:yt,skinning:Y.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:vt,morphTextureStride:Xt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:de,decodeVideoTexture:fe&&b.map.isVideoTexture===!0&&Le.getTransfer(b.map.colorSpace)===Ge,decodeVideoTextureEmissive:pt&&b.emissiveMap.isVideoTexture===!0&&Le.getTransfer(b.emissiveMap.colorSpace)===Ge,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ue,flipSided:b.side===Dn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Bt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&b.extensions.multiDraw===!0||kt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Oe.vertexUv1s=c.has(1),Oe.vertexUv2s=c.has(2),Oe.vertexUv3s=c.has(3),c.clear(),Oe}function p(b){const S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)S.push(L),S.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(y(S,b),_(S,b),S.push(i.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function y(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function _(b,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),b.push(a.mask)}function v(b){const S=m[b.type];let L;if(S){const U=hi[S];L=ha.clone(U.uniforms)}else L=b.uniforms;return L}function C(b,S){let L;for(let U=0,Y=h.length;U<Y;U++){const J=h[U];if(J.cacheKey===S){L=J,++L.usedTimes;break}}return L===void 0&&(L=new Tv(i,S,b,r),h.push(L)),L}function T(b){if(--b.usedTimes===0){const S=h.indexOf(b);h[S]=h[h.length-1],h.pop(),b.destroy()}}function E(b){l.remove(b)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:C,releaseProgram:T,releaseShaderCache:E,programs:h,dispose:R}}function Dv(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Iv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function zu(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Lu(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,m,x,g){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:m,renderOrder:u.renderOrder,z:x,group:g},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=x,p.group=g),t++,p}function a(u,f,d,m,x,g){const p=o(u,f,d,m,x,g);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function l(u,f,d,m,x,g){const p=o(u,f,d,m,x,g);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||Iv),n.length>1&&n.sort(f||zu),s.length>1&&s.sort(f||zu)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function zv(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Lu,i.set(n,[o])):s>=r.length?(o=new Lu,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Lv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new z,color:new te};break;case"SpotLight":e={position:new z,direction:new z,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new te,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new te,groundColor:new te};break;case"RectAreaLight":e={color:new te,position:new z,halfWidth:new z,halfHeight:new z};break}return i[t.id]=e,e}}}function Uv(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Nv=0;function kv(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Fv(i){const t=new Lv,e=Uv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new z);const s=new z,r=new he,o=new he;function a(c){let h=0,u=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let d=0,m=0,x=0,g=0,p=0,y=0,_=0,v=0,C=0,T=0,E=0;c.sort(kv);for(let b=0,S=c.length;b<S;b++){const L=c[b],U=L.color,Y=L.intensity,J=L.distance,H=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=U.r*Y,u+=U.g*Y,f+=U.b*Y;else if(L.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(L.sh.coefficients[q],Y);E++}else if(L.isDirectionalLight){const q=t.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const B=L.shadow,O=e.get(L);O.shadowIntensity=B.intensity,O.shadowBias=B.bias,O.shadowNormalBias=B.normalBias,O.shadowRadius=B.radius,O.shadowMapSize=B.mapSize,n.directionalShadow[d]=O,n.directionalShadowMap[d]=H,n.directionalShadowMatrix[d]=L.shadow.matrix,y++}n.directional[d]=q,d++}else if(L.isSpotLight){const q=t.get(L);q.position.setFromMatrixPosition(L.matrixWorld),q.color.copy(U).multiplyScalar(Y),q.distance=J,q.coneCos=Math.cos(L.angle),q.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),q.decay=L.decay,n.spot[x]=q;const B=L.shadow;if(L.map&&(n.spotLightMap[C]=L.map,C++,B.updateMatrices(L),L.castShadow&&T++),n.spotLightMatrix[x]=B.matrix,L.castShadow){const O=e.get(L);O.shadowIntensity=B.intensity,O.shadowBias=B.bias,O.shadowNormalBias=B.normalBias,O.shadowRadius=B.radius,O.shadowMapSize=B.mapSize,n.spotShadow[x]=O,n.spotShadowMap[x]=H,v++}x++}else if(L.isRectAreaLight){const q=t.get(L);q.color.copy(U).multiplyScalar(Y),q.halfWidth.set(L.width*.5,0,0),q.halfHeight.set(0,L.height*.5,0),n.rectArea[g]=q,g++}else if(L.isPointLight){const q=t.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),q.distance=L.distance,q.decay=L.decay,L.castShadow){const B=L.shadow,O=e.get(L);O.shadowIntensity=B.intensity,O.shadowBias=B.bias,O.shadowNormalBias=B.normalBias,O.shadowRadius=B.radius,O.shadowMapSize=B.mapSize,O.shadowCameraNear=B.camera.near,O.shadowCameraFar=B.camera.far,n.pointShadow[m]=O,n.pointShadowMap[m]=H,n.pointShadowMatrix[m]=L.shadow.matrix,_++}n.point[m]=q,m++}else if(L.isHemisphereLight){const q=t.get(L);q.skyColor.copy(L.color).multiplyScalar(Y),q.groundColor.copy(L.groundColor).multiplyScalar(Y),n.hemi[p]=q,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ct.LTC_FLOAT_1,n.rectAreaLTC2=Ct.LTC_FLOAT_2):(n.rectAreaLTC1=Ct.LTC_HALF_1,n.rectAreaLTC2=Ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const R=n.hash;(R.directionalLength!==d||R.pointLength!==m||R.spotLength!==x||R.rectAreaLength!==g||R.hemiLength!==p||R.numDirectionalShadows!==y||R.numPointShadows!==_||R.numSpotShadows!==v||R.numSpotMaps!==C||R.numLightProbes!==E)&&(n.directional.length=d,n.spot.length=x,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=v+C-T,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=E,R.directionalLength=d,R.pointLength=m,R.spotLength=x,R.rectAreaLength=g,R.hemiLength=p,R.numDirectionalShadows=y,R.numPointShadows=_,R.numSpotShadows=v,R.numSpotMaps=C,R.numLightProbes=E,n.version=Nv++)}function l(c,h){let u=0,f=0,d=0,m=0,x=0;const g=h.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const _=c[p];if(_.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),u++}else if(_.isSpotLight){const v=n.spot[d];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),d++}else if(_.isRectAreaLight){const v=n.rectArea[m];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(g),o.identity(),r.copy(_.matrixWorld),r.premultiply(g),o.extractRotation(r),v.halfWidth.set(_.width*.5,0,0),v.halfHeight.set(0,_.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(_.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(g),f++}else if(_.isHemisphereLight){const v=n.hemi[x];v.direction.setFromMatrixPosition(_.matrixWorld),v.direction.transformDirection(g),x++}}}return{setup:a,setupView:l,state:n}}function Uu(i){const t=new Fv(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Ov(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Uu(i),t.set(s,[a])):r>=o.length?(a=new Uu(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const Bv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Hv=`uniform sampler2D shadow_pass;
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
}`;function Gv(i,t,e){let n=new Yc;const s=new Gt,r=new Gt,o=new Ie,a=new cm({depthPacking:Hf}),l=new hm,c={},h=e.maxTextureSize,u={[Ii]:Dn,[Dn]:Ii,[Ue]:Ue},f=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Gt},radius:{value:4}},vertexShader:Bv,fragmentShader:Hv}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const m=new Te;m.setAttribute("position",new cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Jt(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zu;let p=this.type;this.render=function(T,E,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;const b=i.getRenderTarget(),S=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Qi),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const Y=p!==Si&&this.type===Si,J=p===Si&&this.type!==Si;for(let H=0,q=T.length;H<q;H++){const B=T[H],O=B.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",B,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const tt=O.getFrameExtents();if(s.multiply(tt),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/tt.x),s.x=r.x*tt.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/tt.y),s.y=r.y*tt.y,O.mapSize.y=r.y)),O.map===null||Y===!0||J===!0){const vt=this.type!==Si?{minFilter:On,magFilter:On}:{};O.map!==null&&O.map.dispose(),O.map=new ns(s.x,s.y,vt),O.map.texture.name=B.name+".shadowMap",O.camera.updateProjectionMatrix()}i.setRenderTarget(O.map),i.clear();const W=O.getViewportCount();for(let vt=0;vt<W;vt++){const Xt=O.getViewport(vt);o.set(r.x*Xt.x,r.y*Xt.y,r.x*Xt.z,r.y*Xt.w),U.viewport(o),O.updateMatrices(B,vt),n=O.getFrustum(),v(E,R,O.camera,B,this.type)}O.isPointLightShadow!==!0&&this.type===Si&&y(O,R),O.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(b,S,L)};function y(T,E){const R=t.update(x);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ns(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(E,null,R,f,x,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(E,null,R,d,x,null)}function _(T,E,R,b){let S=null;const L=R.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(L!==void 0)S=L;else if(S=R.isPointLight===!0?l:a,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const U=S.uuid,Y=E.uuid;let J=c[U];J===void 0&&(J={},c[U]=J);let H=J[Y];H===void 0&&(H=S.clone(),J[Y]=H,E.addEventListener("dispose",C)),S=H}if(S.visible=E.visible,S.wireframe=E.wireframe,b===Si?S.side=E.shadowSide!==null?E.shadowSide:E.side:S.side=E.shadowSide!==null?E.shadowSide:u[E.side],S.alphaMap=E.alphaMap,S.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,S.map=E.map,S.clipShadows=E.clipShadows,S.clippingPlanes=E.clippingPlanes,S.clipIntersection=E.clipIntersection,S.displacementMap=E.displacementMap,S.displacementScale=E.displacementScale,S.displacementBias=E.displacementBias,S.wireframeLinewidth=E.wireframeLinewidth,S.linewidth=E.linewidth,R.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const U=i.properties.get(S);U.light=R}return S}function v(T,E,R,b,S){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&S===Si)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,T.matrixWorld);const Y=t.update(T),J=T.material;if(Array.isArray(J)){const H=Y.groups;for(let q=0,B=H.length;q<B;q++){const O=H[q],tt=J[O.materialIndex];if(tt&&tt.visible){const W=_(T,tt,b,S);T.onBeforeShadow(i,T,E,R,Y,W,O),i.renderBufferDirect(R,null,Y,W,T,O),T.onAfterShadow(i,T,E,R,Y,W,O)}}}else if(J.visible){const H=_(T,J,b,S);T.onBeforeShadow(i,T,E,R,Y,H,null),i.renderBufferDirect(R,null,Y,H,T,null),T.onAfterShadow(i,T,E,R,Y,H,null)}}const U=T.children;for(let Y=0,J=U.length;Y<J;Y++)v(U[Y],E,R,b,S)}function C(T){T.target.removeEventListener("dispose",C);for(const R in c){const b=c[R],S=T.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}const Vv={[Ol]:Bl,[Hl]:Wl,[Gl]:Xl,[pr]:Vl,[Bl]:Ol,[Wl]:Hl,[Xl]:Gl,[Vl]:pr};function Wv(i,t){function e(){let X=!1;const _t=new Ie;let Et=null;const Ft=new Ie(0,0,0,0);return{setMask:function(gt){Et!==gt&&!X&&(i.colorMask(gt,gt,gt,gt),Et=gt)},setLocked:function(gt){X=gt},setClear:function(gt,ut,Bt,de,Oe){Oe===!0&&(gt*=de,ut*=de,Bt*=de),_t.set(gt,ut,Bt,de),Ft.equals(_t)===!1&&(i.clearColor(gt,ut,Bt,de),Ft.copy(_t))},reset:function(){X=!1,Et=null,Ft.set(-1,0,0,0)}}}function n(){let X=!1,_t=!1,Et=null,Ft=null,gt=null;return{setReversed:function(ut){if(_t!==ut){const Bt=t.get("EXT_clip_control");ut?Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.ZERO_TO_ONE_EXT):Bt.clipControlEXT(Bt.LOWER_LEFT_EXT,Bt.NEGATIVE_ONE_TO_ONE_EXT),_t=ut;const de=gt;gt=null,this.setClear(de)}},getReversed:function(){return _t},setTest:function(ut){ut?rt(i.DEPTH_TEST):yt(i.DEPTH_TEST)},setMask:function(ut){Et!==ut&&!X&&(i.depthMask(ut),Et=ut)},setFunc:function(ut){if(_t&&(ut=Vv[ut]),Ft!==ut){switch(ut){case Ol:i.depthFunc(i.NEVER);break;case Bl:i.depthFunc(i.ALWAYS);break;case Hl:i.depthFunc(i.LESS);break;case pr:i.depthFunc(i.LEQUAL);break;case Gl:i.depthFunc(i.EQUAL);break;case Vl:i.depthFunc(i.GEQUAL);break;case Wl:i.depthFunc(i.GREATER);break;case Xl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ft=ut}},setLocked:function(ut){X=ut},setClear:function(ut){gt!==ut&&(_t&&(ut=1-ut),i.clearDepth(ut),gt=ut)},reset:function(){X=!1,Et=null,Ft=null,gt=null,_t=!1}}}function s(){let X=!1,_t=null,Et=null,Ft=null,gt=null,ut=null,Bt=null,de=null,Oe=null;return{setTest:function(ve){X||(ve?rt(i.STENCIL_TEST):yt(i.STENCIL_TEST))},setMask:function(ve){_t!==ve&&!X&&(i.stencilMask(ve),_t=ve)},setFunc:function(ve,An,Ln){(Et!==ve||Ft!==An||gt!==Ln)&&(i.stencilFunc(ve,An,Ln),Et=ve,Ft=An,gt=Ln)},setOp:function(ve,An,Ln){(ut!==ve||Bt!==An||de!==Ln)&&(i.stencilOp(ve,An,Ln),ut=ve,Bt=An,de=Ln)},setLocked:function(ve){X=ve},setClear:function(ve){Oe!==ve&&(i.clearStencil(ve),Oe=ve)},reset:function(){X=!1,_t=null,Et=null,Ft=null,gt=null,ut=null,Bt=null,de=null,Oe=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],m=null,x=!1,g=null,p=null,y=null,_=null,v=null,C=null,T=null,E=new te(0,0,0),R=0,b=!1,S=null,L=null,U=null,Y=null,J=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,B=0;const O=i.getParameter(i.VERSION);O.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(O)[1]),q=B>=1):O.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),q=B>=2);let tt=null,W={};const vt=i.getParameter(i.SCISSOR_BOX),Xt=i.getParameter(i.VIEWPORT),Me=new Ie().fromArray(vt),ce=new Ie().fromArray(Xt);function ht(X,_t,Et,Ft){const gt=new Uint8Array(4),ut=i.createTexture();i.bindTexture(X,ut),i.texParameteri(X,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(X,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Bt=0;Bt<Et;Bt++)X===i.TEXTURE_3D||X===i.TEXTURE_2D_ARRAY?i.texImage3D(_t,0,i.RGBA,1,1,Ft,0,i.RGBA,i.UNSIGNED_BYTE,gt):i.texImage2D(_t+Bt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,gt);return ut}const $={};$[i.TEXTURE_2D]=ht(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=ht(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[i.TEXTURE_2D_ARRAY]=ht(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=ht(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),rt(i.DEPTH_TEST),o.setFunc(pr),qt(!1),Lt(_h),rt(i.CULL_FACE),ee(Qi);function rt(X){h[X]!==!0&&(i.enable(X),h[X]=!0)}function yt(X){h[X]!==!1&&(i.disable(X),h[X]=!1)}function Vt(X,_t){return u[X]!==_t?(i.bindFramebuffer(X,_t),u[X]=_t,X===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=_t),X===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=_t),!0):!1}function kt(X,_t){let Et=d,Ft=!1;if(X){Et=f.get(_t),Et===void 0&&(Et=[],f.set(_t,Et));const gt=X.textures;if(Et.length!==gt.length||Et[0]!==i.COLOR_ATTACHMENT0){for(let ut=0,Bt=gt.length;ut<Bt;ut++)Et[ut]=i.COLOR_ATTACHMENT0+ut;Et.length=gt.length,Ft=!0}}else Et[0]!==i.BACK&&(Et[0]=i.BACK,Ft=!0);Ft&&i.drawBuffers(Et)}function fe(X){return m!==X?(i.useProgram(X),m=X,!0):!1}const we={[vs]:i.FUNC_ADD,[ff]:i.FUNC_SUBTRACT,[pf]:i.FUNC_REVERSE_SUBTRACT};we[mf]=i.MIN,we[gf]=i.MAX;const D={[xf]:i.ZERO,[vf]:i.ONE,[_f]:i.SRC_COLOR,[kl]:i.SRC_ALPHA,[Ef]:i.SRC_ALPHA_SATURATE,[Sf]:i.DST_COLOR,[Mf]:i.DST_ALPHA,[yf]:i.ONE_MINUS_SRC_COLOR,[Fl]:i.ONE_MINUS_SRC_ALPHA,[wf]:i.ONE_MINUS_DST_COLOR,[bf]:i.ONE_MINUS_DST_ALPHA,[Tf]:i.CONSTANT_COLOR,[Af]:i.ONE_MINUS_CONSTANT_COLOR,[Rf]:i.CONSTANT_ALPHA,[Cf]:i.ONE_MINUS_CONSTANT_ALPHA};function ee(X,_t,Et,Ft,gt,ut,Bt,de,Oe,ve){if(X===Qi){x===!0&&(yt(i.BLEND),x=!1);return}if(x===!1&&(rt(i.BLEND),x=!0),X!==df){if(X!==g||ve!==b){if((p!==vs||v!==vs)&&(i.blendEquation(i.FUNC_ADD),p=vs,v=vs),ve)switch(X){case ur:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yh:i.blendFunc(i.ONE,i.ONE);break;case Mh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case bh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}else switch(X){case ur:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case yh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Mh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case bh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}y=null,_=null,C=null,T=null,E.set(0,0,0),R=0,g=X,b=ve}return}gt=gt||_t,ut=ut||Et,Bt=Bt||Ft,(_t!==p||gt!==v)&&(i.blendEquationSeparate(we[_t],we[gt]),p=_t,v=gt),(Et!==y||Ft!==_||ut!==C||Bt!==T)&&(i.blendFuncSeparate(D[Et],D[Ft],D[ut],D[Bt]),y=Et,_=Ft,C=ut,T=Bt),(de.equals(E)===!1||Oe!==R)&&(i.blendColor(de.r,de.g,de.b,Oe),E.copy(de),R=Oe),g=X,b=!1}function Yt(X,_t){X.side===Ue?yt(i.CULL_FACE):rt(i.CULL_FACE);let Et=X.side===Dn;_t&&(Et=!Et),qt(Et),X.blending===ur&&X.transparent===!1?ee(Qi):ee(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),o.setFunc(X.depthFunc),o.setTest(X.depthTest),o.setMask(X.depthWrite),r.setMask(X.colorWrite);const Ft=X.stencilWrite;a.setTest(Ft),Ft&&(a.setMask(X.stencilWriteMask),a.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),a.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),pt(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?rt(i.SAMPLE_ALPHA_TO_COVERAGE):yt(i.SAMPLE_ALPHA_TO_COVERAGE)}function qt(X){S!==X&&(X?i.frontFace(i.CW):i.frontFace(i.CCW),S=X)}function Lt(X){X!==cf?(rt(i.CULL_FACE),X!==L&&(X===_h?i.cullFace(i.BACK):X===hf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):yt(i.CULL_FACE),L=X}function ie(X){X!==U&&(q&&i.lineWidth(X),U=X)}function pt(X,_t,Et){X?(rt(i.POLYGON_OFFSET_FILL),(Y!==_t||J!==Et)&&(i.polygonOffset(_t,Et),Y=_t,J=Et)):yt(i.POLYGON_OFFSET_FILL)}function Mt(X){X?rt(i.SCISSOR_TEST):yt(i.SCISSOR_TEST)}function le(X){X===void 0&&(X=i.TEXTURE0+H-1),tt!==X&&(i.activeTexture(X),tt=X)}function Pe(X,_t,Et){Et===void 0&&(tt===null?Et=i.TEXTURE0+H-1:Et=tt);let Ft=W[Et];Ft===void 0&&(Ft={type:void 0,texture:void 0},W[Et]=Ft),(Ft.type!==X||Ft.texture!==_t)&&(tt!==Et&&(i.activeTexture(Et),tt=Et),i.bindTexture(X,_t||$[X]),Ft.type=X,Ft.texture=_t)}function P(){const X=W[tt];X!==void 0&&X.type!==void 0&&(i.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function w(){try{i.compressedTexImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Q(){try{i.compressedTexImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function at(){try{i.texSubImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function lt(){try{i.texSubImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function ot(){try{i.compressedTexSubImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Ut(){try{i.compressedTexSubImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function ct(){try{i.texStorage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function St(){try{i.texStorage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Pt(){try{i.texImage2D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function mt(){try{i.texImage3D(...arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Rt(X){Me.equals(X)===!1&&(i.scissor(X.x,X.y,X.z,X.w),Me.copy(X))}function Zt(X){ce.equals(X)===!1&&(i.viewport(X.x,X.y,X.z,X.w),ce.copy(X))}function Ot(X,_t){let Et=c.get(_t);Et===void 0&&(Et=new WeakMap,c.set(_t,Et));let Ft=Et.get(X);Ft===void 0&&(Ft=i.getUniformBlockIndex(_t,X.name),Et.set(X,Ft))}function wt(X,_t){const Ft=c.get(_t).get(X);l.get(_t)!==Ft&&(i.uniformBlockBinding(_t,Ft,X.__bindingPointIndex),l.set(_t,Ft))}function ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},tt=null,W={},u={},f=new WeakMap,d=[],m=null,x=!1,g=null,p=null,y=null,_=null,v=null,C=null,T=null,E=new te(0,0,0),R=0,b=!1,S=null,L=null,U=null,Y=null,J=null,Me.set(0,0,i.canvas.width,i.canvas.height),ce.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:rt,disable:yt,bindFramebuffer:Vt,drawBuffers:kt,useProgram:fe,setBlending:ee,setMaterial:Yt,setFlipSided:qt,setCullFace:Lt,setLineWidth:ie,setPolygonOffset:pt,setScissorTest:Mt,activeTexture:le,bindTexture:Pe,unbindTexture:P,compressedTexImage2D:w,compressedTexImage3D:Q,texImage2D:Pt,texImage3D:mt,updateUBOMapping:Ot,uniformBlockBinding:wt,texStorage2D:ct,texStorage3D:St,texSubImage2D:at,texSubImage3D:lt,compressedTexSubImage2D:ot,compressedTexSubImage3D:Ut,scissor:Rt,viewport:Zt,reset:ue}}function Xv(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Gt,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(P,w){return d?new OffscreenCanvas(P,w):ca("canvas")}function x(P,w,Q){let at=1;const lt=Pe(P);if((lt.width>Q||lt.height>Q)&&(at=Q/Math.max(lt.width,lt.height)),at<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const ot=Math.floor(at*lt.width),Ut=Math.floor(at*lt.height);u===void 0&&(u=m(ot,Ut));const ct=w?m(ot,Ut):u;return ct.width=ot,ct.height=Ut,ct.getContext("2d").drawImage(P,0,0,ot,Ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+lt.width+"x"+lt.height+") to ("+ot+"x"+Ut+")."),ct}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+lt.width+"x"+lt.height+")."),P;return P}function g(P){return P.generateMipmaps}function p(P){i.generateMipmap(P)}function y(P){return P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?i.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(P,w,Q,at,lt=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let ot=w;if(w===i.RED&&(Q===i.FLOAT&&(ot=i.R32F),Q===i.HALF_FLOAT&&(ot=i.R16F),Q===i.UNSIGNED_BYTE&&(ot=i.R8)),w===i.RED_INTEGER&&(Q===i.UNSIGNED_BYTE&&(ot=i.R8UI),Q===i.UNSIGNED_SHORT&&(ot=i.R16UI),Q===i.UNSIGNED_INT&&(ot=i.R32UI),Q===i.BYTE&&(ot=i.R8I),Q===i.SHORT&&(ot=i.R16I),Q===i.INT&&(ot=i.R32I)),w===i.RG&&(Q===i.FLOAT&&(ot=i.RG32F),Q===i.HALF_FLOAT&&(ot=i.RG16F),Q===i.UNSIGNED_BYTE&&(ot=i.RG8)),w===i.RG_INTEGER&&(Q===i.UNSIGNED_BYTE&&(ot=i.RG8UI),Q===i.UNSIGNED_SHORT&&(ot=i.RG16UI),Q===i.UNSIGNED_INT&&(ot=i.RG32UI),Q===i.BYTE&&(ot=i.RG8I),Q===i.SHORT&&(ot=i.RG16I),Q===i.INT&&(ot=i.RG32I)),w===i.RGB_INTEGER&&(Q===i.UNSIGNED_BYTE&&(ot=i.RGB8UI),Q===i.UNSIGNED_SHORT&&(ot=i.RGB16UI),Q===i.UNSIGNED_INT&&(ot=i.RGB32UI),Q===i.BYTE&&(ot=i.RGB8I),Q===i.SHORT&&(ot=i.RGB16I),Q===i.INT&&(ot=i.RGB32I)),w===i.RGBA_INTEGER&&(Q===i.UNSIGNED_BYTE&&(ot=i.RGBA8UI),Q===i.UNSIGNED_SHORT&&(ot=i.RGBA16UI),Q===i.UNSIGNED_INT&&(ot=i.RGBA32UI),Q===i.BYTE&&(ot=i.RGBA8I),Q===i.SHORT&&(ot=i.RGBA16I),Q===i.INT&&(ot=i.RGBA32I)),w===i.RGB&&(Q===i.UNSIGNED_INT_5_9_9_9_REV&&(ot=i.RGB9_E5),Q===i.UNSIGNED_INT_10F_11F_11F_REV&&(ot=i.R11F_G11F_B10F)),w===i.RGBA){const Ut=lt?aa:Le.getTransfer(at);Q===i.FLOAT&&(ot=i.RGBA32F),Q===i.HALF_FLOAT&&(ot=i.RGBA16F),Q===i.UNSIGNED_BYTE&&(ot=Ut===Ge?i.SRGB8_ALPHA8:i.RGBA8),Q===i.UNSIGNED_SHORT_4_4_4_4&&(ot=i.RGBA4),Q===i.UNSIGNED_SHORT_5_5_5_1&&(ot=i.RGB5_A1)}return(ot===i.R16F||ot===i.R32F||ot===i.RG16F||ot===i.RG32F||ot===i.RGBA16F||ot===i.RGBA32F)&&t.get("EXT_color_buffer_float"),ot}function v(P,w){let Q;return P?w===null||w===Ss||w===Qr?Q=i.DEPTH24_STENCIL8:w===ni?Q=i.DEPTH32F_STENCIL8:w===Jr&&(Q=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Ss||w===Qr?Q=i.DEPTH_COMPONENT24:w===ni?Q=i.DEPTH_COMPONENT32F:w===Jr&&(Q=i.DEPTH_COMPONENT16),Q}function C(P,w){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==On&&P.minFilter!==ei?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function T(P){const w=P.target;w.removeEventListener("dispose",T),R(w),w.isVideoTexture&&h.delete(w)}function E(P){const w=P.target;w.removeEventListener("dispose",E),S(w)}function R(P){const w=n.get(P);if(w.__webglInit===void 0)return;const Q=P.source,at=f.get(Q);if(at){const lt=at[w.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&b(P),Object.keys(at).length===0&&f.delete(Q)}n.remove(P)}function b(P){const w=n.get(P);i.deleteTexture(w.__webglTexture);const Q=P.source,at=f.get(Q);delete at[w.__cacheKey],o.memory.textures--}function S(P){const w=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let at=0;at<6;at++){if(Array.isArray(w.__webglFramebuffer[at]))for(let lt=0;lt<w.__webglFramebuffer[at].length;lt++)i.deleteFramebuffer(w.__webglFramebuffer[at][lt]);else i.deleteFramebuffer(w.__webglFramebuffer[at]);w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer[at])}else{if(Array.isArray(w.__webglFramebuffer))for(let at=0;at<w.__webglFramebuffer.length;at++)i.deleteFramebuffer(w.__webglFramebuffer[at]);else i.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&i.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&i.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let at=0;at<w.__webglColorRenderbuffer.length;at++)w.__webglColorRenderbuffer[at]&&i.deleteRenderbuffer(w.__webglColorRenderbuffer[at]);w.__webglDepthRenderbuffer&&i.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const Q=P.textures;for(let at=0,lt=Q.length;at<lt;at++){const ot=n.get(Q[at]);ot.__webglTexture&&(i.deleteTexture(ot.__webglTexture),o.memory.textures--),n.remove(Q[at])}n.remove(P)}let L=0;function U(){L=0}function Y(){const P=L;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),L+=1,P}function J(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function H(P,w){const Q=n.get(P);if(P.isVideoTexture&&Mt(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&Q.__version!==P.version){const at=P.image;if(at===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(at.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(Q,P,w);return}}else P.isExternalTexture&&(Q.__webglTexture=P.sourceTexture?P.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,Q.__webglTexture,i.TEXTURE0+w)}function q(P,w){const Q=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&Q.__version!==P.version){$(Q,P,w);return}e.bindTexture(i.TEXTURE_2D_ARRAY,Q.__webglTexture,i.TEXTURE0+w)}function B(P,w){const Q=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&Q.__version!==P.version){$(Q,P,w);return}e.bindTexture(i.TEXTURE_3D,Q.__webglTexture,i.TEXTURE0+w)}function O(P,w){const Q=n.get(P);if(P.version>0&&Q.__version!==P.version){rt(Q,P,w);return}e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture,i.TEXTURE0+w)}const tt={[xr]:i.REPEAT,[ji]:i.CLAMP_TO_EDGE,[Yl]:i.MIRRORED_REPEAT},W={[On]:i.NEAREST,[Of]:i.NEAREST_MIPMAP_NEAREST,[mo]:i.NEAREST_MIPMAP_LINEAR,[ei]:i.LINEAR,[La]:i.LINEAR_MIPMAP_NEAREST,[Ki]:i.LINEAR_MIPMAP_LINEAR},vt={[Vf]:i.NEVER,[Zf]:i.ALWAYS,[Wf]:i.LESS,[od]:i.LEQUAL,[Xf]:i.EQUAL,[Yf]:i.GEQUAL,[qf]:i.GREATER,[$f]:i.NOTEQUAL};function Xt(P,w){if(w.type===ni&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===ei||w.magFilter===La||w.magFilter===mo||w.magFilter===Ki||w.minFilter===ei||w.minFilter===La||w.minFilter===mo||w.minFilter===Ki)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,tt[w.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,tt[w.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,tt[w.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,W[w.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,W[w.minFilter]),w.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,vt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===On||w.minFilter!==mo&&w.minFilter!==Ki||w.type===ni&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const Q=t.get("EXT_texture_filter_anisotropic");i.texParameterf(P,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Me(P,w){let Q=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",T));const at=w.source;let lt=f.get(at);lt===void 0&&(lt={},f.set(at,lt));const ot=J(w);if(ot!==P.__cacheKey){lt[ot]===void 0&&(lt[ot]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Q=!0),lt[ot].usedTimes++;const Ut=lt[P.__cacheKey];Ut!==void 0&&(lt[P.__cacheKey].usedTimes--,Ut.usedTimes===0&&b(w)),P.__cacheKey=ot,P.__webglTexture=lt[ot].texture}return Q}function ce(P,w,Q){return Math.floor(Math.floor(P/Q)/w)}function ht(P,w,Q,at){const ot=P.updateRanges;if(ot.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,w.width,w.height,Q,at,w.data);else{ot.sort((mt,Rt)=>mt.start-Rt.start);let Ut=0;for(let mt=1;mt<ot.length;mt++){const Rt=ot[Ut],Zt=ot[mt],Ot=Rt.start+Rt.count,wt=ce(Zt.start,w.width,4),ue=ce(Rt.start,w.width,4);Zt.start<=Ot+1&&wt===ue&&ce(Zt.start+Zt.count-1,w.width,4)===wt?Rt.count=Math.max(Rt.count,Zt.start+Zt.count-Rt.start):(++Ut,ot[Ut]=Zt)}ot.length=Ut+1;const ct=i.getParameter(i.UNPACK_ROW_LENGTH),St=i.getParameter(i.UNPACK_SKIP_PIXELS),Pt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,w.width);for(let mt=0,Rt=ot.length;mt<Rt;mt++){const Zt=ot[mt],Ot=Math.floor(Zt.start/4),wt=Math.ceil(Zt.count/4),ue=Ot%w.width,X=Math.floor(Ot/w.width),_t=wt,Et=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,ue),i.pixelStorei(i.UNPACK_SKIP_ROWS,X),e.texSubImage2D(i.TEXTURE_2D,0,ue,X,_t,Et,Q,at,w.data)}P.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ct),i.pixelStorei(i.UNPACK_SKIP_PIXELS,St),i.pixelStorei(i.UNPACK_SKIP_ROWS,Pt)}}function $(P,w,Q){let at=i.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(at=i.TEXTURE_2D_ARRAY),w.isData3DTexture&&(at=i.TEXTURE_3D);const lt=Me(P,w),ot=w.source;e.bindTexture(at,P.__webglTexture,i.TEXTURE0+Q);const Ut=n.get(ot);if(ot.version!==Ut.__version||lt===!0){e.activeTexture(i.TEXTURE0+Q);const ct=Le.getPrimaries(Le.workingColorSpace),St=w.colorSpace===wi?null:Le.getPrimaries(w.colorSpace),Pt=w.colorSpace===wi||ct===St?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let mt=x(w.image,!1,s.maxTextureSize);mt=le(w,mt);const Rt=r.convert(w.format,w.colorSpace),Zt=r.convert(w.type);let Ot=_(w.internalFormat,Rt,Zt,w.colorSpace,w.isVideoTexture);Xt(at,w);let wt;const ue=w.mipmaps,X=w.isVideoTexture!==!0,_t=Ut.__version===void 0||lt===!0,Et=ot.dataReady,Ft=C(w,mt);if(w.isDepthTexture)Ot=v(w.format===eo,w.type),_t&&(X?e.texStorage2D(i.TEXTURE_2D,1,Ot,mt.width,mt.height):e.texImage2D(i.TEXTURE_2D,0,Ot,mt.width,mt.height,0,Rt,Zt,null));else if(w.isDataTexture)if(ue.length>0){X&&_t&&e.texStorage2D(i.TEXTURE_2D,Ft,Ot,ue[0].width,ue[0].height);for(let gt=0,ut=ue.length;gt<ut;gt++)wt=ue[gt],X?Et&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,wt.width,wt.height,Rt,Zt,wt.data):e.texImage2D(i.TEXTURE_2D,gt,Ot,wt.width,wt.height,0,Rt,Zt,wt.data);w.generateMipmaps=!1}else X?(_t&&e.texStorage2D(i.TEXTURE_2D,Ft,Ot,mt.width,mt.height),Et&&ht(w,mt,Rt,Zt)):e.texImage2D(i.TEXTURE_2D,0,Ot,mt.width,mt.height,0,Rt,Zt,mt.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){X&&_t&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ft,Ot,ue[0].width,ue[0].height,mt.depth);for(let gt=0,ut=ue.length;gt<ut;gt++)if(wt=ue[gt],w.format!==Fn)if(Rt!==null)if(X){if(Et)if(w.layerUpdates.size>0){const Bt=uu(wt.width,wt.height,w.format,w.type);for(const de of w.layerUpdates){const Oe=wt.data.subarray(de*Bt/wt.data.BYTES_PER_ELEMENT,(de+1)*Bt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,de,wt.width,wt.height,1,Rt,Oe)}w.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,0,wt.width,wt.height,mt.depth,Rt,wt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,gt,Ot,wt.width,wt.height,mt.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else X?Et&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,gt,0,0,0,wt.width,wt.height,mt.depth,Rt,Zt,wt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,gt,Ot,wt.width,wt.height,mt.depth,0,Rt,Zt,wt.data)}else{X&&_t&&e.texStorage2D(i.TEXTURE_2D,Ft,Ot,ue[0].width,ue[0].height);for(let gt=0,ut=ue.length;gt<ut;gt++)wt=ue[gt],w.format!==Fn?Rt!==null?X?Et&&e.compressedTexSubImage2D(i.TEXTURE_2D,gt,0,0,wt.width,wt.height,Rt,wt.data):e.compressedTexImage2D(i.TEXTURE_2D,gt,Ot,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):X?Et&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,wt.width,wt.height,Rt,Zt,wt.data):e.texImage2D(i.TEXTURE_2D,gt,Ot,wt.width,wt.height,0,Rt,Zt,wt.data)}else if(w.isDataArrayTexture)if(X){if(_t&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Ft,Ot,mt.width,mt.height,mt.depth),Et)if(w.layerUpdates.size>0){const gt=uu(mt.width,mt.height,w.format,w.type);for(const ut of w.layerUpdates){const Bt=mt.data.subarray(ut*gt/mt.data.BYTES_PER_ELEMENT,(ut+1)*gt/mt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ut,mt.width,mt.height,1,Rt,Zt,Bt)}w.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,mt.width,mt.height,mt.depth,Rt,Zt,mt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ot,mt.width,mt.height,mt.depth,0,Rt,Zt,mt.data);else if(w.isData3DTexture)X?(_t&&e.texStorage3D(i.TEXTURE_3D,Ft,Ot,mt.width,mt.height,mt.depth),Et&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,mt.width,mt.height,mt.depth,Rt,Zt,mt.data)):e.texImage3D(i.TEXTURE_3D,0,Ot,mt.width,mt.height,mt.depth,0,Rt,Zt,mt.data);else if(w.isFramebufferTexture){if(_t)if(X)e.texStorage2D(i.TEXTURE_2D,Ft,Ot,mt.width,mt.height);else{let gt=mt.width,ut=mt.height;for(let Bt=0;Bt<Ft;Bt++)e.texImage2D(i.TEXTURE_2D,Bt,Ot,gt,ut,0,Rt,Zt,null),gt>>=1,ut>>=1}}else if(ue.length>0){if(X&&_t){const gt=Pe(ue[0]);e.texStorage2D(i.TEXTURE_2D,Ft,Ot,gt.width,gt.height)}for(let gt=0,ut=ue.length;gt<ut;gt++)wt=ue[gt],X?Et&&e.texSubImage2D(i.TEXTURE_2D,gt,0,0,Rt,Zt,wt):e.texImage2D(i.TEXTURE_2D,gt,Ot,Rt,Zt,wt);w.generateMipmaps=!1}else if(X){if(_t){const gt=Pe(mt);e.texStorage2D(i.TEXTURE_2D,Ft,Ot,gt.width,gt.height)}Et&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Rt,Zt,mt)}else e.texImage2D(i.TEXTURE_2D,0,Ot,Rt,Zt,mt);g(w)&&p(at),Ut.__version=ot.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function rt(P,w,Q){if(w.image.length!==6)return;const at=Me(P,w),lt=w.source;e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+Q);const ot=n.get(lt);if(lt.version!==ot.__version||at===!0){e.activeTexture(i.TEXTURE0+Q);const Ut=Le.getPrimaries(Le.workingColorSpace),ct=w.colorSpace===wi?null:Le.getPrimaries(w.colorSpace),St=w.colorSpace===wi||Ut===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,w.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,w.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);const Pt=w.isCompressedTexture||w.image[0].isCompressedTexture,mt=w.image[0]&&w.image[0].isDataTexture,Rt=[];for(let ut=0;ut<6;ut++)!Pt&&!mt?Rt[ut]=x(w.image[ut],!0,s.maxCubemapSize):Rt[ut]=mt?w.image[ut].image:w.image[ut],Rt[ut]=le(w,Rt[ut]);const Zt=Rt[0],Ot=r.convert(w.format,w.colorSpace),wt=r.convert(w.type),ue=_(w.internalFormat,Ot,wt,w.colorSpace),X=w.isVideoTexture!==!0,_t=ot.__version===void 0||at===!0,Et=lt.dataReady;let Ft=C(w,Zt);Xt(i.TEXTURE_CUBE_MAP,w);let gt;if(Pt){X&&_t&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ft,ue,Zt.width,Zt.height);for(let ut=0;ut<6;ut++){gt=Rt[ut].mipmaps;for(let Bt=0;Bt<gt.length;Bt++){const de=gt[Bt];w.format!==Fn?Ot!==null?X?Et&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt,0,0,de.width,de.height,Ot,de.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt,ue,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt,0,0,de.width,de.height,Ot,wt,de.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt,ue,de.width,de.height,0,Ot,wt,de.data)}}}else{if(gt=w.mipmaps,X&&_t){gt.length>0&&Ft++;const ut=Pe(Rt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ft,ue,ut.width,ut.height)}for(let ut=0;ut<6;ut++)if(mt){X?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,Rt[ut].width,Rt[ut].height,Ot,wt,Rt[ut].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,ue,Rt[ut].width,Rt[ut].height,0,Ot,wt,Rt[ut].data);for(let Bt=0;Bt<gt.length;Bt++){const Oe=gt[Bt].image[ut].image;X?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt+1,0,0,Oe.width,Oe.height,Ot,wt,Oe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt+1,ue,Oe.width,Oe.height,0,Ot,wt,Oe.data)}}else{X?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,0,0,Ot,wt,Rt[ut]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0,ue,Ot,wt,Rt[ut]);for(let Bt=0;Bt<gt.length;Bt++){const de=gt[Bt];X?Et&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt+1,0,0,Ot,wt,de.image[ut]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Bt+1,ue,Ot,wt,de.image[ut])}}}g(w)&&p(i.TEXTURE_CUBE_MAP),ot.__version=lt.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function yt(P,w,Q,at,lt,ot){const Ut=r.convert(Q.format,Q.colorSpace),ct=r.convert(Q.type),St=_(Q.internalFormat,Ut,ct,Q.colorSpace),Pt=n.get(w),mt=n.get(Q);if(mt.__renderTarget=w,!Pt.__hasExternalTextures){const Rt=Math.max(1,w.width>>ot),Zt=Math.max(1,w.height>>ot);lt===i.TEXTURE_3D||lt===i.TEXTURE_2D_ARRAY?e.texImage3D(lt,ot,St,Rt,Zt,w.depth,0,Ut,ct,null):e.texImage2D(lt,ot,St,Rt,Zt,0,Ut,ct,null)}e.bindFramebuffer(i.FRAMEBUFFER,P),pt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,at,lt,mt.__webglTexture,0,ie(w)):(lt===i.TEXTURE_2D||lt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,at,lt,mt.__webglTexture,ot),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Vt(P,w,Q){if(i.bindRenderbuffer(i.RENDERBUFFER,P),w.depthBuffer){const at=w.depthTexture,lt=at&&at.isDepthTexture?at.type:null,ot=v(w.stencilBuffer,lt),Ut=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=ie(w);pt(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,ot,w.width,w.height):Q?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,ot,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,ot,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ut,i.RENDERBUFFER,P)}else{const at=w.textures;for(let lt=0;lt<at.length;lt++){const ot=at[lt],Ut=r.convert(ot.format,ot.colorSpace),ct=r.convert(ot.type),St=_(ot.internalFormat,Ut,ct,ot.colorSpace),Pt=ie(w);Q&&pt(w)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt,St,w.width,w.height):pt(w)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pt,St,w.width,w.height):i.renderbufferStorage(i.RENDERBUFFER,St,w.width,w.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function kt(P,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const at=n.get(w.depthTexture);at.__renderTarget=w,(!at.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),H(w.depthTexture,0);const lt=at.__webglTexture,ot=ie(w);if(w.depthTexture.format===to)pt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,lt,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,lt,0);else if(w.depthTexture.format===eo)pt(w)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,lt,0,ot):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,lt,0);else throw new Error("Unknown depthTexture format")}function fe(P){const w=n.get(P),Q=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){const at=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),at){const lt=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,at.removeEventListener("dispose",lt)};at.addEventListener("dispose",lt),w.__depthDisposeCallback=lt}w.__boundDepthTexture=at}if(P.depthTexture&&!w.__autoAllocateDepthBuffer){if(Q)throw new Error("target.depthTexture not supported in Cube render targets");const at=P.texture.mipmaps;at&&at.length>0?kt(w.__webglFramebuffer[0],P):kt(w.__webglFramebuffer,P)}else if(Q){w.__webglDepthbuffer=[];for(let at=0;at<6;at++)if(e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[at]),w.__webglDepthbuffer[at]===void 0)w.__webglDepthbuffer[at]=i.createRenderbuffer(),Vt(w.__webglDepthbuffer[at],P,!1);else{const lt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=w.__webglDepthbuffer[at];i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,ot)}}else{const at=P.texture.mipmaps;if(at&&at.length>0?e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=i.createRenderbuffer(),Vt(w.__webglDepthbuffer,P,!1);else{const lt=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=w.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,ot)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function we(P,w,Q){const at=n.get(P);w!==void 0&&yt(at.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Q!==void 0&&fe(P)}function D(P){const w=P.texture,Q=n.get(P),at=n.get(w);P.addEventListener("dispose",E);const lt=P.textures,ot=P.isWebGLCubeRenderTarget===!0,Ut=lt.length>1;if(Ut||(at.__webglTexture===void 0&&(at.__webglTexture=i.createTexture()),at.__version=w.version,o.memory.textures++),ot){Q.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(w.mipmaps&&w.mipmaps.length>0){Q.__webglFramebuffer[ct]=[];for(let St=0;St<w.mipmaps.length;St++)Q.__webglFramebuffer[ct][St]=i.createFramebuffer()}else Q.__webglFramebuffer[ct]=i.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){Q.__webglFramebuffer=[];for(let ct=0;ct<w.mipmaps.length;ct++)Q.__webglFramebuffer[ct]=i.createFramebuffer()}else Q.__webglFramebuffer=i.createFramebuffer();if(Ut)for(let ct=0,St=lt.length;ct<St;ct++){const Pt=n.get(lt[ct]);Pt.__webglTexture===void 0&&(Pt.__webglTexture=i.createTexture(),o.memory.textures++)}if(P.samples>0&&pt(P)===!1){Q.__webglMultisampledFramebuffer=i.createFramebuffer(),Q.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let ct=0;ct<lt.length;ct++){const St=lt[ct];Q.__webglColorRenderbuffer[ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Q.__webglColorRenderbuffer[ct]);const Pt=r.convert(St.format,St.colorSpace),mt=r.convert(St.type),Rt=_(St.internalFormat,Pt,mt,St.colorSpace,P.isXRRenderTarget===!0),Zt=ie(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Zt,Rt,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,Q.__webglColorRenderbuffer[ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(Q.__webglDepthRenderbuffer=i.createRenderbuffer(),Vt(Q.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ot){e.bindTexture(i.TEXTURE_CUBE_MAP,at.__webglTexture),Xt(i.TEXTURE_CUBE_MAP,w);for(let ct=0;ct<6;ct++)if(w.mipmaps&&w.mipmaps.length>0)for(let St=0;St<w.mipmaps.length;St++)yt(Q.__webglFramebuffer[ct][St],P,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,St);else yt(Q.__webglFramebuffer[ct],P,w,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);g(w)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ut){for(let ct=0,St=lt.length;ct<St;ct++){const Pt=lt[ct],mt=n.get(Pt);let Rt=i.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Rt=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Rt,mt.__webglTexture),Xt(Rt,Pt),yt(Q.__webglFramebuffer,P,Pt,i.COLOR_ATTACHMENT0+ct,Rt,0),g(Pt)&&p(Rt)}e.unbindTexture()}else{let ct=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ct=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ct,at.__webglTexture),Xt(ct,w),w.mipmaps&&w.mipmaps.length>0)for(let St=0;St<w.mipmaps.length;St++)yt(Q.__webglFramebuffer[St],P,w,i.COLOR_ATTACHMENT0,ct,St);else yt(Q.__webglFramebuffer,P,w,i.COLOR_ATTACHMENT0,ct,0);g(w)&&p(ct),e.unbindTexture()}P.depthBuffer&&fe(P)}function ee(P){const w=P.textures;for(let Q=0,at=w.length;Q<at;Q++){const lt=w[Q];if(g(lt)){const ot=y(P),Ut=n.get(lt).__webglTexture;e.bindTexture(ot,Ut),p(ot),e.unbindTexture()}}}const Yt=[],qt=[];function Lt(P){if(P.samples>0){if(pt(P)===!1){const w=P.textures,Q=P.width,at=P.height;let lt=i.COLOR_BUFFER_BIT;const ot=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ut=n.get(P),ct=w.length>1;if(ct)for(let Pt=0;Pt<w.length;Pt++)e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer);const St=P.texture.mipmaps;St&&St.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer);for(let Pt=0;Pt<w.length;Pt++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(lt|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(lt|=i.STENCIL_BUFFER_BIT)),ct){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ut.__webglColorRenderbuffer[Pt]);const mt=n.get(w[Pt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,mt,0)}i.blitFramebuffer(0,0,Q,at,0,0,Q,at,lt,i.NEAREST),l===!0&&(Yt.length=0,qt.length=0,Yt.push(i.COLOR_ATTACHMENT0+Pt),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Yt.push(ot),qt.push(ot),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,qt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Yt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ct)for(let Pt=0;Pt<w.length;Pt++){e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.RENDERBUFFER,Ut.__webglColorRenderbuffer[Pt]);const mt=n.get(w[Pt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Pt,i.TEXTURE_2D,mt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const w=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[w])}}}function ie(P){return Math.min(s.maxSamples,P.samples)}function pt(P){const w=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Mt(P){const w=o.render.frame;h.get(P)!==w&&(h.set(P,w),P.update())}function le(P,w){const Q=P.colorSpace,at=P.format,lt=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||Q!==vr&&Q!==wi&&(Le.getTransfer(Q)===Ge?(at!==Fn||lt!==di)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Q)),w}function Pe(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=U,this.setTexture2D=H,this.setTexture2DArray=q,this.setTexture3D=B,this.setTextureCube=O,this.rebindTextures=we,this.setupRenderTarget=D,this.updateRenderTargetMipmap=ee,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=fe,this.setupFrameBufferTexture=yt,this.useMultisampledRTT=pt}function qv(i,t){function e(n,s=wi){let r;const o=Le.getTransfer(s);if(n===di)return i.UNSIGNED_BYTE;if(n===Uc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Nc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ed)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===nd)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Qu)return i.BYTE;if(n===td)return i.SHORT;if(n===Jr)return i.UNSIGNED_SHORT;if(n===Lc)return i.INT;if(n===Ss)return i.UNSIGNED_INT;if(n===ni)return i.FLOAT;if(n===ao)return i.HALF_FLOAT;if(n===id)return i.ALPHA;if(n===sd)return i.RGB;if(n===Fn)return i.RGBA;if(n===to)return i.DEPTH_COMPONENT;if(n===eo)return i.DEPTH_STENCIL;if(n===kc)return i.RED;if(n===Fc)return i.RED_INTEGER;if(n===rd)return i.RG;if(n===Oc)return i.RG_INTEGER;if(n===Bc)return i.RGBA_INTEGER;if(n===na||n===ia||n===sa||n===ra)if(o===Ge)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===na)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===na)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ia)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===sa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ra)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Zl||n===jl||n===Kl||n===Jl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Zl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===jl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Kl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Jl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ql||n===tc||n===ec)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ql||n===tc)return o===Ge?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ec)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===nc||n===ic||n===sc||n===rc||n===oc||n===ac||n===lc||n===cc||n===hc||n===uc||n===dc||n===fc||n===pc||n===mc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===nc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ic)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===sc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===rc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===oc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ac)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===lc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===cc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===hc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===uc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===dc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===fc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===pc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===mc)return o===Ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===gc||n===xc||n===vc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===gc)return o===Ge?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===xc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===vc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===_c||n===yc||n===Mc||n===bc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===_c)return r.COMPRESSED_RED_RGTC1_EXT;if(n===yc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Mc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===bc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Qr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const $v=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Yv=`
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

}`;class Zv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new xd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Wn({vertexShader:$v,fragmentShader:Yv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Jt(new Ti(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class jv extends Mr{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,m=null;const x=typeof XRWebGLBinding<"u",g=new Zv,p={},y=e.getContextAttributes();let _=null,v=null;const C=[],T=[],E=new Gt;let R=null;const b=new zn;b.viewport=new Ie;const S=new zn;S.viewport=new Ie;const L=[b,S],U=new xm;let Y=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let rt=C[$];return rt===void 0&&(rt=new el,C[$]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function($){let rt=C[$];return rt===void 0&&(rt=new el,C[$]=rt),rt.getGripSpace()},this.getHand=function($){let rt=C[$];return rt===void 0&&(rt=new el,C[$]=rt),rt.getHandSpace()};function H($){const rt=T.indexOf($.inputSource);if(rt===-1)return;const yt=C[rt];yt!==void 0&&(yt.update($.inputSource,$.frame,c||o),yt.dispatchEvent({type:$.type,data:$.inputSource}))}function q(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",B);for(let $=0;$<C.length;$++){const rt=T[$];rt!==null&&(T[$]=null,C[$].disconnect(rt))}Y=null,J=null,g.reset();for(const $ in p)delete p[$];t.setRenderTarget(_),d=null,f=null,u=null,s=null,v=null,ht.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(_=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",q),s.addEventListener("inputsourceschange",B),y.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(E),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let yt=null,Vt=null,kt=null;y.depth&&(kt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,yt=y.stencil?eo:to,Vt=y.stencil?Qr:Ss);const fe={colorFormat:e.RGBA8,depthFormat:kt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(fe),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),v=new ns(f.textureWidth,f.textureHeight,{format:Fn,type:di,depthTexture:new gd(f.textureWidth,f.textureHeight,Vt,void 0,void 0,void 0,void 0,void 0,void 0,yt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const yt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,yt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new ns(d.framebufferWidth,d.framebufferHeight,{format:Fn,type:di,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),ht.setContext(s),ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function B($){for(let rt=0;rt<$.removed.length;rt++){const yt=$.removed[rt],Vt=T.indexOf(yt);Vt>=0&&(T[Vt]=null,C[Vt].disconnect(yt))}for(let rt=0;rt<$.added.length;rt++){const yt=$.added[rt];let Vt=T.indexOf(yt);if(Vt===-1){for(let fe=0;fe<C.length;fe++)if(fe>=T.length){T.push(yt),Vt=fe;break}else if(T[fe]===null){T[fe]=yt,Vt=fe;break}if(Vt===-1)break}const kt=C[Vt];kt&&kt.connect(yt)}}const O=new z,tt=new z;function W($,rt,yt){O.setFromMatrixPosition(rt.matrixWorld),tt.setFromMatrixPosition(yt.matrixWorld);const Vt=O.distanceTo(tt),kt=rt.projectionMatrix.elements,fe=yt.projectionMatrix.elements,we=kt[14]/(kt[10]-1),D=kt[14]/(kt[10]+1),ee=(kt[9]+1)/kt[5],Yt=(kt[9]-1)/kt[5],qt=(kt[8]-1)/kt[0],Lt=(fe[8]+1)/fe[0],ie=we*qt,pt=we*Lt,Mt=Vt/(-qt+Lt),le=Mt*-qt;if(rt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(le),$.translateZ(Mt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),kt[10]===-1)$.projectionMatrix.copy(rt.projectionMatrix),$.projectionMatrixInverse.copy(rt.projectionMatrixInverse);else{const Pe=we+Mt,P=D+Mt,w=ie-le,Q=pt+(Vt-le),at=ee*D/P*Pe,lt=Yt*D/P*Pe;$.projectionMatrix.makePerspective(w,Q,at,lt,Pe,P),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function vt($,rt){rt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(rt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let rt=$.near,yt=$.far;g.texture!==null&&(g.depthNear>0&&(rt=g.depthNear),g.depthFar>0&&(yt=g.depthFar)),U.near=S.near=b.near=rt,U.far=S.far=b.far=yt,(Y!==U.near||J!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),Y=U.near,J=U.far),U.layers.mask=$.layers.mask|6,b.layers.mask=U.layers.mask&3,S.layers.mask=U.layers.mask&5;const Vt=$.parent,kt=U.cameras;vt(U,Vt);for(let fe=0;fe<kt.length;fe++)vt(kt[fe],Vt);kt.length===2?W(U,b,S):U.projectionMatrix.copy(b.projectionMatrix),Xt($,U,Vt)};function Xt($,rt,yt){yt===null?$.matrix.copy(rt.matrixWorld):($.matrix.copy(yt.matrixWorld),$.matrix.invert(),$.matrix.multiply(rt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(rt.projectionMatrix),$.projectionMatrixInverse.copy(rt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=no*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(U)},this.getCameraTexture=function($){return p[$]};let Me=null;function ce($,rt){if(h=rt.getViewerPose(c||o),m=rt,h!==null){const yt=h.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let Vt=!1;yt.length!==U.cameras.length&&(U.cameras.length=0,Vt=!0);for(let D=0;D<yt.length;D++){const ee=yt[D];let Yt=null;if(d!==null)Yt=d.getViewport(ee);else{const Lt=u.getViewSubImage(f,ee);Yt=Lt.viewport,D===0&&(t.setRenderTargetTextures(v,Lt.colorTexture,Lt.depthStencilTexture),t.setRenderTarget(v))}let qt=L[D];qt===void 0&&(qt=new zn,qt.layers.enable(D),qt.viewport=new Ie,L[D]=qt),qt.matrix.fromArray(ee.transform.matrix),qt.matrix.decompose(qt.position,qt.quaternion,qt.scale),qt.projectionMatrix.fromArray(ee.projectionMatrix),qt.projectionMatrixInverse.copy(qt.projectionMatrix).invert(),qt.viewport.set(Yt.x,Yt.y,Yt.width,Yt.height),D===0&&(U.matrix.copy(qt.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Vt===!0&&U.cameras.push(qt)}const kt=s.enabledFeatures;if(kt&&kt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){u=n.getBinding();const D=u.getDepthInformation(yt[0]);D&&D.isValid&&D.texture&&g.init(D,s.renderState)}if(kt&&kt.includes("camera-access")&&x){t.state.unbindTexture(),u=n.getBinding();for(let D=0;D<yt.length;D++){const ee=yt[D].camera;if(ee){let Yt=p[ee];Yt||(Yt=new xd,p[ee]=Yt);const qt=u.getCameraImage(ee);Yt.sourceTexture=qt}}}}for(let yt=0;yt<C.length;yt++){const Vt=T[yt],kt=C[yt];Vt!==null&&kt!==void 0&&kt.update(Vt,rt,c||o)}Me&&Me($,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),m=null}const ht=new wd;ht.setAnimationLoop(ce),this.setAnimationLoop=function($){Me=$},this.dispose=function(){}}}const ps=new fi,Kv=new he;function Jv(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,ud(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,y,_,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),x(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,y,_):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Dn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Dn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=t.get(p),_=y.envMap,v=y.envMapRotation;_&&(g.envMap.value=_,ps.copy(v),ps.x*=-1,ps.y*=-1,ps.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ps.y*=-1,ps.z*=-1),g.envMapRotation.value.setFromMatrix4(Kv.makeRotationFromEuler(ps)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,y,_){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=_*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Dn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){const y=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Qv(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,_){const v=_.program;n.uniformBlockBinding(y,v)}function c(y,_){let v=s[y.id];v===void 0&&(m(y),v=h(y),s[y.id]=v,y.addEventListener("dispose",g));const C=_.program;n.updateUBOMapping(y,C);const T=t.render.frame;r[y.id]!==T&&(f(y),r[y.id]=T)}function h(y){const _=u();y.__bindingPointIndex=_;const v=i.createBuffer(),C=y.__size,T=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,C,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,v),v}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const _=s[y.id],v=y.uniforms,C=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let T=0,E=v.length;T<E;T++){const R=Array.isArray(v[T])?v[T]:[v[T]];for(let b=0,S=R.length;b<S;b++){const L=R[b];if(d(L,T,b,C)===!0){const U=L.__offset,Y=Array.isArray(L.value)?L.value:[L.value];let J=0;for(let H=0;H<Y.length;H++){const q=Y[H],B=x(q);typeof q=="number"||typeof q=="boolean"?(L.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,U+J,L.__data)):q.isMatrix3?(L.__data[0]=q.elements[0],L.__data[1]=q.elements[1],L.__data[2]=q.elements[2],L.__data[3]=0,L.__data[4]=q.elements[3],L.__data[5]=q.elements[4],L.__data[6]=q.elements[5],L.__data[7]=0,L.__data[8]=q.elements[6],L.__data[9]=q.elements[7],L.__data[10]=q.elements[8],L.__data[11]=0):(q.toArray(L.__data,J),J+=B.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(y,_,v,C){const T=y.value,E=_+"_"+v;if(C[E]===void 0)return typeof T=="number"||typeof T=="boolean"?C[E]=T:C[E]=T.clone(),!0;{const R=C[E];if(typeof T=="number"||typeof T=="boolean"){if(R!==T)return C[E]=T,!0}else if(R.equals(T)===!1)return R.copy(T),!0}return!1}function m(y){const _=y.uniforms;let v=0;const C=16;for(let E=0,R=_.length;E<R;E++){const b=Array.isArray(_[E])?_[E]:[_[E]];for(let S=0,L=b.length;S<L;S++){const U=b[S],Y=Array.isArray(U.value)?U.value:[U.value];for(let J=0,H=Y.length;J<H;J++){const q=Y[J],B=x(q),O=v%C,tt=O%B.boundary,W=O+tt;v+=tt,W!==0&&C-W<B.storage&&(v+=C-W),U.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=v,v+=B.storage}}}const T=v%C;return T>0&&(v+=C-T),y.__size=v,y.__cache={},this}function x(y){const _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function g(y){const _=y.target;_.removeEventListener("dispose",g);const v=o.indexOf(_.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function p(){for(const y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class t_{constructor(t={}){const{canvas:e=dp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const m=new Uint32Array(4),x=new Int32Array(4);let g=null,p=null;const y=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ts,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let C=!1;this._outputColorSpace=In;let T=0,E=0,R=null,b=-1,S=null;const L=new Ie,U=new Ie;let Y=null;const J=new te(0);let H=0,q=e.width,B=e.height,O=1,tt=null,W=null;const vt=new Ie(0,0,q,B),Xt=new Ie(0,0,q,B);let Me=!1;const ce=new Yc;let ht=!1,$=!1;const rt=new he,yt=new z,Vt=new Ie,kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let fe=!1;function we(){return R===null?O:1}let D=n;function ee(A,j){return e.getContext(A,j)}try{const A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${zc}`),e.addEventListener("webglcontextlost",Et,!1),e.addEventListener("webglcontextrestored",Ft,!1),e.addEventListener("webglcontextcreationerror",gt,!1),D===null){const j="webgl2";if(D=ee(j,A),D===null)throw ee(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Yt,qt,Lt,ie,pt,Mt,le,Pe,P,w,Q,at,lt,ot,Ut,ct,St,Pt,mt,Rt,Zt,Ot,wt,ue;function X(){Yt=new hx(D),Yt.init(),Ot=new qv(D,Yt),qt=new ix(D,Yt,t,Ot),Lt=new Wv(D,Yt),qt.reversedDepthBuffer&&f&&Lt.buffers.depth.setReversed(!0),ie=new fx(D),pt=new Dv,Mt=new Xv(D,Yt,Lt,pt,qt,Ot,ie),le=new rx(v),Pe=new cx(v),P=new _m(D),wt=new ex(D,P),w=new ux(D,P,ie,wt),Q=new mx(D,w,P,ie),mt=new px(D,qt,Mt),ct=new sx(pt),at=new Pv(v,le,Pe,Yt,qt,wt,ct),lt=new Jv(v,pt),ot=new zv,Ut=new Ov(Yt),Pt=new tx(v,le,Pe,Lt,Q,d,l),St=new Gv(v,Q,qt),ue=new Qv(D,ie,qt,Lt),Rt=new nx(D,Yt,ie),Zt=new dx(D,Yt,ie),ie.programs=at.programs,v.capabilities=qt,v.extensions=Yt,v.properties=pt,v.renderLists=ot,v.shadowMap=St,v.state=Lt,v.info=ie}X();const _t=new jv(v,D);this.xr=_t,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const A=Yt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Yt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(A){A!==void 0&&(O=A,this.setSize(q,B,!1))},this.getSize=function(A){return A.set(q,B)},this.setSize=function(A,j,et=!0){if(_t.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=A,B=j,e.width=Math.floor(A*O),e.height=Math.floor(j*O),et===!0&&(e.style.width=A+"px",e.style.height=j+"px"),this.setViewport(0,0,A,j)},this.getDrawingBufferSize=function(A){return A.set(q*O,B*O).floor()},this.setDrawingBufferSize=function(A,j,et){q=A,B=j,O=et,e.width=Math.floor(A*et),e.height=Math.floor(j*et),this.setViewport(0,0,A,j)},this.getCurrentViewport=function(A){return A.copy(L)},this.getViewport=function(A){return A.copy(vt)},this.setViewport=function(A,j,et,nt){A.isVector4?vt.set(A.x,A.y,A.z,A.w):vt.set(A,j,et,nt),Lt.viewport(L.copy(vt).multiplyScalar(O).round())},this.getScissor=function(A){return A.copy(Xt)},this.setScissor=function(A,j,et,nt){A.isVector4?Xt.set(A.x,A.y,A.z,A.w):Xt.set(A,j,et,nt),Lt.scissor(U.copy(Xt).multiplyScalar(O).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(A){Lt.setScissorTest(Me=A)},this.setOpaqueSort=function(A){tt=A},this.setTransparentSort=function(A){W=A},this.getClearColor=function(A){return A.copy(Pt.getClearColor())},this.setClearColor=function(){Pt.setClearColor(...arguments)},this.getClearAlpha=function(){return Pt.getClearAlpha()},this.setClearAlpha=function(){Pt.setClearAlpha(...arguments)},this.clear=function(A=!0,j=!0,et=!0){let nt=0;if(A){let K=!1;if(R!==null){const xt=R.texture.format;K=xt===Bc||xt===Oc||xt===Fc}if(K){const xt=R.texture.type,It=xt===di||xt===Ss||xt===Jr||xt===Qr||xt===Uc||xt===Nc,Ht=Pt.getClearColor(),Dt=Pt.getClearAlpha(),jt=Ht.r,oe=Ht.g,Kt=Ht.b;It?(m[0]=jt,m[1]=oe,m[2]=Kt,m[3]=Dt,D.clearBufferuiv(D.COLOR,0,m)):(x[0]=jt,x[1]=oe,x[2]=Kt,x[3]=Dt,D.clearBufferiv(D.COLOR,0,x))}else nt|=D.COLOR_BUFFER_BIT}j&&(nt|=D.DEPTH_BUFFER_BIT),et&&(nt|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(nt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Et,!1),e.removeEventListener("webglcontextrestored",Ft,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),Pt.dispose(),ot.dispose(),Ut.dispose(),pt.dispose(),le.dispose(),Pe.dispose(),Q.dispose(),wt.dispose(),ue.dispose(),at.dispose(),_t.dispose(),_t.removeEventListener("sessionstart",Ln),_t.removeEventListener("sessionend",Er),si.stop()};function Et(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Ft(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const A=ie.autoReset,j=St.enabled,et=St.autoUpdate,nt=St.needsUpdate,K=St.type;X(),ie.autoReset=A,St.enabled=j,St.autoUpdate=et,St.needsUpdate=nt,St.type=K}function gt(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ut(A){const j=A.target;j.removeEventListener("dispose",ut),Bt(j)}function Bt(A){de(A),pt.remove(A)}function de(A){const j=pt.get(A).programs;j!==void 0&&(j.forEach(function(et){at.releaseProgram(et)}),A.isShaderMaterial&&at.releaseShaderCache(A))}this.renderBufferDirect=function(A,j,et,nt,K,xt){j===null&&(j=kt);const It=K.isMesh&&K.matrixWorld.determinant()<0,Ht=Ca(A,j,et,nt,K);Lt.setMaterial(nt,It);let Dt=et.index,jt=1;if(nt.wireframe===!0){if(Dt=w.getWireframeAttribute(et),Dt===void 0)return;jt=2}const oe=et.drawRange,Kt=et.attributes.position;let be=oe.start*jt,Ne=(oe.start+oe.count)*jt;xt!==null&&(be=Math.max(be,xt.start*jt),Ne=Math.min(Ne,(xt.start+xt.count)*jt)),Dt!==null?(be=Math.max(be,0),Ne=Math.min(Ne,Dt.count)):Kt!=null&&(be=Math.max(be,0),Ne=Math.min(Ne,Kt.count));const Be=Ne-be;if(Be<0||Be===1/0)return;wt.setup(K,nt,Ht,et,Dt);let ke,Ee=Rt;if(Dt!==null&&(ke=P.get(Dt),Ee=Zt,Ee.setIndex(ke)),K.isMesh)nt.wireframe===!0?(Lt.setLineWidth(nt.wireframeLinewidth*we()),Ee.setMode(D.LINES)):Ee.setMode(D.TRIANGLES);else if(K.isLine){let Qt=nt.linewidth;Qt===void 0&&(Qt=1),Lt.setLineWidth(Qt*we()),K.isLineSegments?Ee.setMode(D.LINES):K.isLineLoop?Ee.setMode(D.LINE_LOOP):Ee.setMode(D.LINE_STRIP)}else K.isPoints?Ee.setMode(D.POINTS):K.isSprite&&Ee.setMode(D.TRIANGLES);if(K.isBatchedMesh)if(K._multiDrawInstances!==null)io("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ee.renderMultiDrawInstances(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount,K._multiDrawInstances);else if(Yt.get("WEBGL_multi_draw"))Ee.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Qt=K._multiDrawStarts,Xe=K._multiDrawCounts,Ae=K._multiDrawCount,yn=Dt?P.get(Dt).bytesPerElement:1,mi=pt.get(nt).currentProgram.getUniforms();for(let gn=0;gn<Ae;gn++)mi.setValue(D,"_gl_DrawID",gn),Ee.render(Qt[gn]/yn,Xe[gn])}else if(K.isInstancedMesh)Ee.renderInstances(be,Be,K.count);else if(et.isInstancedBufferGeometry){const Qt=et._maxInstanceCount!==void 0?et._maxInstanceCount:1/0,Xe=Math.min(et.instanceCount,Qt);Ee.renderInstances(be,Be,Xe)}else Ee.render(be,Be)};function Oe(A,j,et){A.transparent===!0&&A.side===Ue&&A.forceSinglePass===!1?(A.side=Dn,A.needsUpdate=!0,Is(A,j,et),A.side=Ii,A.needsUpdate=!0,Is(A,j,et),A.side=Ue):Is(A,j,et)}this.compile=function(A,j,et=null){et===null&&(et=A),p=Ut.get(et),p.init(j),_.push(p),et.traverseVisible(function(K){K.isLight&&K.layers.test(j.layers)&&(p.pushLight(K),K.castShadow&&p.pushShadow(K))}),A!==et&&A.traverseVisible(function(K){K.isLight&&K.layers.test(j.layers)&&(p.pushLight(K),K.castShadow&&p.pushShadow(K))}),p.setupLights();const nt=new Set;return A.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const xt=K.material;if(xt)if(Array.isArray(xt))for(let It=0;It<xt.length;It++){const Ht=xt[It];Oe(Ht,et,K),nt.add(Ht)}else Oe(xt,et,K),nt.add(xt)}),p=_.pop(),nt},this.compileAsync=function(A,j,et=null){const nt=this.compile(A,j,et);return new Promise(K=>{function xt(){if(nt.forEach(function(It){pt.get(It).currentProgram.isReady()&&nt.delete(It)}),nt.size===0){K(A);return}setTimeout(xt,10)}Yt.get("KHR_parallel_shader_compile")!==null?xt():setTimeout(xt,10)})};let ve=null;function An(A){ve&&ve(A)}function Ln(){si.stop()}function Er(){si.start()}const si=new wd;si.setAnimationLoop(An),typeof self<"u"&&si.setContext(self),this.setAnimationLoop=function(A){ve=A,_t.setAnimationLoop(A),A===null?si.stop():si.start()},_t.addEventListener("sessionstart",Ln),_t.addEventListener("sessionend",Er),this.render=function(A,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),_t.enabled===!0&&_t.isPresenting===!0&&(_t.cameraAutoUpdate===!0&&_t.updateCamera(j),j=_t.getCamera()),A.isScene===!0&&A.onBeforeRender(v,A,j,R),p=Ut.get(A,_.length),p.init(j),_.push(p),rt.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),ce.setFromProjectionMatrix(rt,ui,j.reversedDepth),$=this.localClippingEnabled,ht=ct.init(this.clippingPlanes,$),g=ot.get(A,y.length),g.init(),y.push(g),_t.enabled===!0&&_t.isPresenting===!0){const xt=v.xr.getDepthSensingMesh();xt!==null&&Tr(xt,j,-1/0,v.sortObjects)}Tr(A,j,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(tt,W),fe=_t.enabled===!1||_t.isPresenting===!1||_t.hasDepthSensing()===!1,fe&&Pt.addToRenderList(g,A),this.info.render.frame++,ht===!0&&ct.beginShadows();const et=p.state.shadowsArray;St.render(et,A,j),ht===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const nt=g.opaque,K=g.transmissive;if(p.setupLights(),j.isArrayCamera){const xt=j.cameras;if(K.length>0)for(let It=0,Ht=xt.length;It<Ht;It++){const Dt=xt[It];rs(nt,K,A,Dt)}fe&&Pt.render(A);for(let It=0,Ht=xt.length;It<Ht;It++){const Dt=xt[It];Ar(g,A,Dt,Dt.viewport)}}else K.length>0&&rs(nt,K,A,j),fe&&Pt.render(A),Ar(g,A,j);R!==null&&E===0&&(Mt.updateMultisampleRenderTarget(R),Mt.updateRenderTargetMipmap(R)),A.isScene===!0&&A.onAfterRender(v,A,j),wt.resetDefaultState(),b=-1,S=null,_.pop(),_.length>0?(p=_[_.length-1],ht===!0&&ct.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function Tr(A,j,et,nt){if(A.visible===!1)return;if(A.layers.test(j.layers)){if(A.isGroup)et=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(j);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||ce.intersectsSprite(A)){nt&&Vt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(rt);const It=Q.update(A),Ht=A.material;Ht.visible&&g.push(A,It,Ht,et,Vt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||ce.intersectsObject(A))){const It=Q.update(A),Ht=A.material;if(nt&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Vt.copy(A.boundingSphere.center)):(It.boundingSphere===null&&It.computeBoundingSphere(),Vt.copy(It.boundingSphere.center)),Vt.applyMatrix4(A.matrixWorld).applyMatrix4(rt)),Array.isArray(Ht)){const Dt=It.groups;for(let jt=0,oe=Dt.length;jt<oe;jt++){const Kt=Dt[jt],be=Ht[Kt.materialIndex];be&&be.visible&&g.push(A,It,be,et,Vt.z,Kt)}}else Ht.visible&&g.push(A,It,Ht,et,Vt.z,null)}}const xt=A.children;for(let It=0,Ht=xt.length;It<Ht;It++)Tr(xt[It],j,et,nt)}function Ar(A,j,et,nt){const K=A.opaque,xt=A.transmissive,It=A.transparent;p.setupLightsView(et),ht===!0&&ct.setGlobalState(v.clippingPlanes,et),nt&&Lt.viewport(L.copy(nt)),K.length>0&&Ds(K,j,et),xt.length>0&&Ds(xt,j,et),It.length>0&&Ds(It,j,et),Lt.buffers.depth.setTest(!0),Lt.buffers.depth.setMask(!0),Lt.buffers.color.setMask(!0),Lt.setPolygonOffset(!1)}function rs(A,j,et,nt){if((et.isScene===!0?et.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[nt.id]===void 0&&(p.state.transmissionRenderTarget[nt.id]=new ns(1,1,{generateMipmaps:!0,type:Yt.has("EXT_color_buffer_half_float")||Yt.has("EXT_color_buffer_float")?ao:di,minFilter:Ki,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Le.workingColorSpace}));const xt=p.state.transmissionRenderTarget[nt.id],It=nt.viewport||L;xt.setSize(It.z*v.transmissionResolutionScale,It.w*v.transmissionResolutionScale);const Ht=v.getRenderTarget(),Dt=v.getActiveCubeFace(),jt=v.getActiveMipmapLevel();v.setRenderTarget(xt),v.getClearColor(J),H=v.getClearAlpha(),H<1&&v.setClearColor(16777215,.5),v.clear(),fe&&Pt.render(et);const oe=v.toneMapping;v.toneMapping=ts;const Kt=nt.viewport;if(nt.viewport!==void 0&&(nt.viewport=void 0),p.setupLightsView(nt),ht===!0&&ct.setGlobalState(v.clippingPlanes,nt),Ds(A,et,nt),Mt.updateMultisampleRenderTarget(xt),Mt.updateRenderTargetMipmap(xt),Yt.has("WEBGL_multisampled_render_to_texture")===!1){let be=!1;for(let Ne=0,Be=j.length;Ne<Be;Ne++){const ke=j[Ne],Ee=ke.object,Qt=ke.geometry,Xe=ke.material,Ae=ke.group;if(Xe.side===Ue&&Ee.layers.test(nt.layers)){const yn=Xe.side;Xe.side=Dn,Xe.needsUpdate=!0,Ni(Ee,et,nt,Qt,Xe,Ae),Xe.side=yn,Xe.needsUpdate=!0,be=!0}}be===!0&&(Mt.updateMultisampleRenderTarget(xt),Mt.updateRenderTargetMipmap(xt))}v.setRenderTarget(Ht,Dt,jt),v.setClearColor(J,H),Kt!==void 0&&(nt.viewport=Kt),v.toneMapping=oe}function Ds(A,j,et){const nt=j.isScene===!0?j.overrideMaterial:null;for(let K=0,xt=A.length;K<xt;K++){const It=A[K],Ht=It.object,Dt=It.geometry,jt=It.group;let oe=It.material;oe.allowOverride===!0&&nt!==null&&(oe=nt),Ht.layers.test(et.layers)&&Ni(Ht,j,et,Dt,oe,jt)}}function Ni(A,j,et,nt,K,xt){A.onBeforeRender(v,j,et,nt,K,xt),A.modelViewMatrix.multiplyMatrices(et.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),K.onBeforeRender(v,j,et,nt,A,xt),K.transparent===!0&&K.side===Ue&&K.forceSinglePass===!1?(K.side=Dn,K.needsUpdate=!0,v.renderBufferDirect(et,j,nt,K,A,xt),K.side=Ii,K.needsUpdate=!0,v.renderBufferDirect(et,j,nt,K,A,xt),K.side=Ue):v.renderBufferDirect(et,j,nt,K,A,xt),A.onAfterRender(v,j,et,nt,K,xt)}function Is(A,j,et){j.isScene!==!0&&(j=kt);const nt=pt.get(A),K=p.state.lights,xt=p.state.shadowsArray,It=K.state.version,Ht=at.getParameters(A,K.state,xt,j,et),Dt=at.getProgramCacheKey(Ht);let jt=nt.programs;nt.environment=A.isMeshStandardMaterial?j.environment:null,nt.fog=j.fog,nt.envMap=(A.isMeshStandardMaterial?Pe:le).get(A.envMap||nt.environment),nt.envMapRotation=nt.environment!==null&&A.envMap===null?j.environmentRotation:A.envMapRotation,jt===void 0&&(A.addEventListener("dispose",ut),jt=new Map,nt.programs=jt);let oe=jt.get(Dt);if(oe!==void 0){if(nt.currentProgram===oe&&nt.lightsStateVersion===It)return zs(A,Ht),oe}else Ht.uniforms=at.getUniforms(A),A.onBeforeCompile(Ht,v),oe=at.acquireProgram(Ht,Dt),jt.set(Dt,oe),nt.uniforms=Ht.uniforms;const Kt=nt.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Kt.clippingPlanes=ct.uniform),zs(A,Ht),nt.needsLights=ho(A),nt.lightsStateVersion=It,nt.needsLights&&(Kt.ambientLightColor.value=K.state.ambient,Kt.lightProbe.value=K.state.probe,Kt.directionalLights.value=K.state.directional,Kt.directionalLightShadows.value=K.state.directionalShadow,Kt.spotLights.value=K.state.spot,Kt.spotLightShadows.value=K.state.spotShadow,Kt.rectAreaLights.value=K.state.rectArea,Kt.ltc_1.value=K.state.rectAreaLTC1,Kt.ltc_2.value=K.state.rectAreaLTC2,Kt.pointLights.value=K.state.point,Kt.pointLightShadows.value=K.state.pointShadow,Kt.hemisphereLights.value=K.state.hemi,Kt.directionalShadowMap.value=K.state.directionalShadowMap,Kt.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Kt.spotShadowMap.value=K.state.spotShadowMap,Kt.spotLightMatrix.value=K.state.spotLightMatrix,Kt.spotLightMap.value=K.state.spotLightMap,Kt.pointShadowMap.value=K.state.pointShadowMap,Kt.pointShadowMatrix.value=K.state.pointShadowMatrix),nt.currentProgram=oe,nt.uniformsList=null,oe}function ri(A){if(A.uniformsList===null){const j=A.currentProgram.getUniforms();A.uniformsList=oa.seqWithValue(j.seq,A.uniforms)}return A.uniformsList}function zs(A,j){const et=pt.get(A);et.outputColorSpace=j.outputColorSpace,et.batching=j.batching,et.batchingColor=j.batchingColor,et.instancing=j.instancing,et.instancingColor=j.instancingColor,et.instancingMorph=j.instancingMorph,et.skinning=j.skinning,et.morphTargets=j.morphTargets,et.morphNormals=j.morphNormals,et.morphColors=j.morphColors,et.morphTargetsCount=j.morphTargetsCount,et.numClippingPlanes=j.numClippingPlanes,et.numIntersection=j.numClipIntersection,et.vertexAlphas=j.vertexAlphas,et.vertexTangents=j.vertexTangents,et.toneMapping=j.toneMapping}function Ca(A,j,et,nt,K){j.isScene!==!0&&(j=kt),Mt.resetTextureUnits();const xt=j.fog,It=nt.isMeshStandardMaterial?j.environment:null,Ht=R===null?v.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:vr,Dt=(nt.isMeshStandardMaterial?Pe:le).get(nt.envMap||It),jt=nt.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,oe=!!et.attributes.tangent&&(!!nt.normalMap||nt.anisotropy>0),Kt=!!et.morphAttributes.position,be=!!et.morphAttributes.normal,Ne=!!et.morphAttributes.color;let Be=ts;nt.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Be=v.toneMapping);const ke=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,Ee=ke!==void 0?ke.length:0,Qt=pt.get(nt),Xe=p.state.lights;if(ht===!0&&($===!0||A!==S)){const dn=A===S&&nt.id===b;ct.setState(nt,A,dn)}let Ae=!1;nt.version===Qt.__version?(Qt.needsLights&&Qt.lightsStateVersion!==Xe.state.version||Qt.outputColorSpace!==Ht||K.isBatchedMesh&&Qt.batching===!1||!K.isBatchedMesh&&Qt.batching===!0||K.isBatchedMesh&&Qt.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Qt.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Qt.instancing===!1||!K.isInstancedMesh&&Qt.instancing===!0||K.isSkinnedMesh&&Qt.skinning===!1||!K.isSkinnedMesh&&Qt.skinning===!0||K.isInstancedMesh&&Qt.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Qt.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Qt.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Qt.instancingMorph===!1&&K.morphTexture!==null||Qt.envMap!==Dt||nt.fog===!0&&Qt.fog!==xt||Qt.numClippingPlanes!==void 0&&(Qt.numClippingPlanes!==ct.numPlanes||Qt.numIntersection!==ct.numIntersection)||Qt.vertexAlphas!==jt||Qt.vertexTangents!==oe||Qt.morphTargets!==Kt||Qt.morphNormals!==be||Qt.morphColors!==Ne||Qt.toneMapping!==Be||Qt.morphTargetsCount!==Ee)&&(Ae=!0):(Ae=!0,Qt.__version=nt.version);let yn=Qt.currentProgram;Ae===!0&&(yn=Is(nt,j,K));let mi=!1,gn=!1,as=!1;const qe=yn.getUniforms(),tn=Qt.uniforms;if(Lt.useProgram(yn.program)&&(mi=!0,gn=!0,as=!0),nt.id!==b&&(b=nt.id,gn=!0),mi||S!==A){Lt.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),qe.setValue(D,"projectionMatrix",A.projectionMatrix),qe.setValue(D,"viewMatrix",A.matrixWorldInverse);const xn=qe.map.cameraPosition;xn!==void 0&&xn.setValue(D,yt.setFromMatrixPosition(A.matrixWorld)),qt.logarithmicDepthBuffer&&qe.setValue(D,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(nt.isMeshPhongMaterial||nt.isMeshToonMaterial||nt.isMeshLambertMaterial||nt.isMeshBasicMaterial||nt.isMeshStandardMaterial||nt.isShaderMaterial)&&qe.setValue(D,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,gn=!0,as=!0)}if(K.isSkinnedMesh){qe.setOptional(D,K,"bindMatrix"),qe.setOptional(D,K,"bindMatrixInverse");const dn=K.skeleton;dn&&(dn.boneTexture===null&&dn.computeBoneTexture(),qe.setValue(D,"boneTexture",dn.boneTexture,Mt))}K.isBatchedMesh&&(qe.setOptional(D,K,"batchingTexture"),qe.setValue(D,"batchingTexture",K._matricesTexture,Mt),qe.setOptional(D,K,"batchingIdTexture"),qe.setValue(D,"batchingIdTexture",K._indirectTexture,Mt),qe.setOptional(D,K,"batchingColorTexture"),K._colorsTexture!==null&&qe.setValue(D,"batchingColorTexture",K._colorsTexture,Mt));const on=et.morphAttributes;if((on.position!==void 0||on.normal!==void 0||on.color!==void 0)&&mt.update(K,et,yn),(gn||Qt.receiveShadow!==K.receiveShadow)&&(Qt.receiveShadow=K.receiveShadow,qe.setValue(D,"receiveShadow",K.receiveShadow)),nt.isMeshGouraudMaterial&&nt.envMap!==null&&(tn.envMap.value=Dt,tn.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),nt.isMeshStandardMaterial&&nt.envMap===null&&j.environment!==null&&(tn.envMapIntensity.value=j.environmentIntensity),gn&&(qe.setValue(D,"toneMappingExposure",v.toneMappingExposure),Qt.needsLights&&ki(tn,as),xt&&nt.fog===!0&&lt.refreshFogUniforms(tn,xt),lt.refreshMaterialUniforms(tn,nt,O,B,p.state.transmissionRenderTarget[A.id]),oa.upload(D,ri(Qt),tn,Mt)),nt.isShaderMaterial&&nt.uniformsNeedUpdate===!0&&(oa.upload(D,ri(Qt),tn,Mt),nt.uniformsNeedUpdate=!1),nt.isSpriteMaterial&&qe.setValue(D,"center",K.center),qe.setValue(D,"modelViewMatrix",K.modelViewMatrix),qe.setValue(D,"normalMatrix",K.normalMatrix),qe.setValue(D,"modelMatrix",K.matrixWorld),nt.isShaderMaterial||nt.isRawShaderMaterial){const dn=nt.uniformsGroups;for(let xn=0,Fi=dn.length;xn<Fi;xn++){const oi=dn[xn];ue.update(oi,yn),ue.bind(oi,yn)}}return yn}function ki(A,j){A.ambientLightColor.needsUpdate=j,A.lightProbe.needsUpdate=j,A.directionalLights.needsUpdate=j,A.directionalLightShadows.needsUpdate=j,A.pointLights.needsUpdate=j,A.pointLightShadows.needsUpdate=j,A.spotLights.needsUpdate=j,A.spotLightShadows.needsUpdate=j,A.rectAreaLights.needsUpdate=j,A.hemisphereLights.needsUpdate=j}function ho(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(A,j,et){const nt=pt.get(A);nt.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,nt.__autoAllocateDepthBuffer===!1&&(nt.__useRenderToTexture=!1),pt.get(A.texture).__webglTexture=j,pt.get(A.depthTexture).__webglTexture=nt.__autoAllocateDepthBuffer?void 0:et,nt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,j){const et=pt.get(A);et.__webglFramebuffer=j,et.__useDefaultFramebuffer=j===void 0};const os=D.createFramebuffer();this.setRenderTarget=function(A,j=0,et=0){R=A,T=j,E=et;let nt=!0,K=null,xt=!1,It=!1;if(A){const Dt=pt.get(A);if(Dt.__useDefaultFramebuffer!==void 0)Lt.bindFramebuffer(D.FRAMEBUFFER,null),nt=!1;else if(Dt.__webglFramebuffer===void 0)Mt.setupRenderTarget(A);else if(Dt.__hasExternalTextures)Mt.rebindTextures(A,pt.get(A.texture).__webglTexture,pt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Kt=A.depthTexture;if(Dt.__boundDepthTexture!==Kt){if(Kt!==null&&pt.has(Kt)&&(A.width!==Kt.image.width||A.height!==Kt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Mt.setupDepthRenderbuffer(A)}}const jt=A.texture;(jt.isData3DTexture||jt.isDataArrayTexture||jt.isCompressedArrayTexture)&&(It=!0);const oe=pt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(oe[j])?K=oe[j][et]:K=oe[j],xt=!0):A.samples>0&&Mt.useMultisampledRTT(A)===!1?K=pt.get(A).__webglMultisampledFramebuffer:Array.isArray(oe)?K=oe[et]:K=oe,L.copy(A.viewport),U.copy(A.scissor),Y=A.scissorTest}else L.copy(vt).multiplyScalar(O).floor(),U.copy(Xt).multiplyScalar(O).floor(),Y=Me;if(et!==0&&(K=os),Lt.bindFramebuffer(D.FRAMEBUFFER,K)&&nt&&Lt.drawBuffers(A,K),Lt.viewport(L),Lt.scissor(U),Lt.setScissorTest(Y),xt){const Dt=pt.get(A.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+j,Dt.__webglTexture,et)}else if(It){const Dt=j;for(let jt=0;jt<A.textures.length;jt++){const oe=pt.get(A.textures[jt]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+jt,oe.__webglTexture,et,Dt)}}else if(A!==null&&et!==0){const Dt=pt.get(A.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Dt.__webglTexture,et)}b=-1},this.readRenderTargetPixels=function(A,j,et,nt,K,xt,It,Ht=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=pt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&It!==void 0&&(Dt=Dt[It]),Dt){Lt.bindFramebuffer(D.FRAMEBUFFER,Dt);try{const jt=A.textures[Ht],oe=jt.format,Kt=jt.type;if(!qt.textureFormatReadable(oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qt.textureTypeReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=A.width-nt&&et>=0&&et<=A.height-K&&(A.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ht),D.readPixels(j,et,nt,K,Ot.convert(oe),Ot.convert(Kt),xt))}finally{const jt=R!==null?pt.get(R).__webglFramebuffer:null;Lt.bindFramebuffer(D.FRAMEBUFFER,jt)}}},this.readRenderTargetPixelsAsync=async function(A,j,et,nt,K,xt,It,Ht=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=pt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&It!==void 0&&(Dt=Dt[It]),Dt)if(j>=0&&j<=A.width-nt&&et>=0&&et<=A.height-K){Lt.bindFramebuffer(D.FRAMEBUFFER,Dt);const jt=A.textures[Ht],oe=jt.format,Kt=jt.type;if(!qt.textureFormatReadable(oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qt.textureTypeReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const be=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,be),D.bufferData(D.PIXEL_PACK_BUFFER,xt.byteLength,D.STREAM_READ),A.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ht),D.readPixels(j,et,nt,K,Ot.convert(oe),Ot.convert(Kt),0);const Ne=R!==null?pt.get(R).__webglFramebuffer:null;Lt.bindFramebuffer(D.FRAMEBUFFER,Ne);const Be=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await fp(D,Be,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,be),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,xt),D.deleteBuffer(be),D.deleteSync(Be),xt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,j=null,et=0){const nt=Math.pow(2,-et),K=Math.floor(A.image.width*nt),xt=Math.floor(A.image.height*nt),It=j!==null?j.x:0,Ht=j!==null?j.y:0;Mt.setTexture2D(A,0),D.copyTexSubImage2D(D.TEXTURE_2D,et,0,0,It,Ht,K,xt),Lt.unbindTexture()};const Rr=D.createFramebuffer(),Ls=D.createFramebuffer();this.copyTextureToTexture=function(A,j,et=null,nt=null,K=0,xt=null){xt===null&&(K!==0?(io("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),xt=K,K=0):xt=0);let It,Ht,Dt,jt,oe,Kt,be,Ne,Be;const ke=A.isCompressedTexture?A.mipmaps[xt]:A.image;if(et!==null)It=et.max.x-et.min.x,Ht=et.max.y-et.min.y,Dt=et.isBox3?et.max.z-et.min.z:1,jt=et.min.x,oe=et.min.y,Kt=et.isBox3?et.min.z:0;else{const on=Math.pow(2,-K);It=Math.floor(ke.width*on),Ht=Math.floor(ke.height*on),A.isDataArrayTexture?Dt=ke.depth:A.isData3DTexture?Dt=Math.floor(ke.depth*on):Dt=1,jt=0,oe=0,Kt=0}nt!==null?(be=nt.x,Ne=nt.y,Be=nt.z):(be=0,Ne=0,Be=0);const Ee=Ot.convert(j.format),Qt=Ot.convert(j.type);let Xe;j.isData3DTexture?(Mt.setTexture3D(j,0),Xe=D.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?(Mt.setTexture2DArray(j,0),Xe=D.TEXTURE_2D_ARRAY):(Mt.setTexture2D(j,0),Xe=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,j.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,j.unpackAlignment);const Ae=D.getParameter(D.UNPACK_ROW_LENGTH),yn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),mi=D.getParameter(D.UNPACK_SKIP_PIXELS),gn=D.getParameter(D.UNPACK_SKIP_ROWS),as=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,ke.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ke.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,jt),D.pixelStorei(D.UNPACK_SKIP_ROWS,oe),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Kt);const qe=A.isDataArrayTexture||A.isData3DTexture,tn=j.isDataArrayTexture||j.isData3DTexture;if(A.isDepthTexture){const on=pt.get(A),dn=pt.get(j),xn=pt.get(on.__renderTarget),Fi=pt.get(dn.__renderTarget);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,xn.__webglFramebuffer),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Fi.__webglFramebuffer);for(let oi=0;oi<Dt;oi++)qe&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,pt.get(A).__webglTexture,K,Kt+oi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,pt.get(j).__webglTexture,xt,Be+oi)),D.blitFramebuffer(jt,oe,It,Ht,be,Ne,It,Ht,D.DEPTH_BUFFER_BIT,D.NEAREST);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(K!==0||A.isRenderTargetTexture||pt.has(A)){const on=pt.get(A),dn=pt.get(j);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,Rr),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Ls);for(let xn=0;xn<Dt;xn++)qe?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,on.__webglTexture,K,Kt+xn):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,on.__webglTexture,K),tn?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,dn.__webglTexture,xt,Be+xn):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,dn.__webglTexture,xt),K!==0?D.blitFramebuffer(jt,oe,It,Ht,be,Ne,It,Ht,D.COLOR_BUFFER_BIT,D.NEAREST):tn?D.copyTexSubImage3D(Xe,xt,be,Ne,Be+xn,jt,oe,It,Ht):D.copyTexSubImage2D(Xe,xt,be,Ne,jt,oe,It,Ht);Lt.bindFramebuffer(D.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else tn?A.isDataTexture||A.isData3DTexture?D.texSubImage3D(Xe,xt,be,Ne,Be,It,Ht,Dt,Ee,Qt,ke.data):j.isCompressedArrayTexture?D.compressedTexSubImage3D(Xe,xt,be,Ne,Be,It,Ht,Dt,Ee,ke.data):D.texSubImage3D(Xe,xt,be,Ne,Be,It,Ht,Dt,Ee,Qt,ke):A.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,xt,be,Ne,It,Ht,Ee,Qt,ke.data):A.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,xt,be,Ne,ke.width,ke.height,Ee,ke.data):D.texSubImage2D(D.TEXTURE_2D,xt,be,Ne,It,Ht,Ee,Qt,ke);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ae),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,yn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,mi),D.pixelStorei(D.UNPACK_SKIP_ROWS,gn),D.pixelStorei(D.UNPACK_SKIP_IMAGES,as),xt===0&&j.generateMipmaps&&D.generateMipmap(Xe),Lt.unbindTexture()},this.initRenderTarget=function(A){pt.get(A).__webglFramebuffer===void 0&&Mt.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?Mt.setTextureCube(A,0):A.isData3DTexture?Mt.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Mt.setTexture2DArray(A,0):Mt.setTexture2D(A,0),Lt.unbindTexture()},this.resetState=function(){T=0,E=0,R=null,Lt.reset(),wt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Le._getDrawingBufferColorSpace(t),e.unpackColorSpace=Le._getUnpackColorSpace()}}class e_ extends Jt{constructor(t,e={}){super(t),this.isWater=!0;const n=this,s=e.textureWidth!==void 0?e.textureWidth:512,r=e.textureHeight!==void 0?e.textureHeight:512,o=e.clipBias!==void 0?e.clipBias:0,a=e.alpha!==void 0?e.alpha:1,l=e.time!==void 0?e.time:0,c=e.waterNormals!==void 0?e.waterNormals:null,h=e.sunDirection!==void 0?e.sunDirection:new z(.70707,.70707,0),u=new te(e.sunColor!==void 0?e.sunColor:16777215),f=new te(e.waterColor!==void 0?e.waterColor:8355711),d=e.eye!==void 0?e.eye:new z(0,0,0),m=e.distortionScale!==void 0?e.distortionScale:20,x=e.side!==void 0?e.side:Ii,g=e.fog!==void 0?e.fog:!1,p=new ci,y=new z,_=new z,v=new z,C=new he,T=new z(0,0,-1),E=new Ie,R=new z,b=new z,S=new Ie,L=new he,U=new zn,Y=new ns(s,r),J={name:"MirrorShader",uniforms:ha.merge([Ct.fog,Ct.lights,{normalSampler:{value:null},mirrorSampler:{value:null},alpha:{value:1},time:{value:0},size:{value:1},distortionScale:{value:20},textureMatrix:{value:new he},sunColor:{value:new te(8355711)},sunDirection:{value:new z(.70707,.70707,0)},eye:{value:new z},waterColor:{value:new te(5592405)}}]),vertexShader:`
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
				}`},H=new Wn({name:J.name,uniforms:ha.clone(J.uniforms),vertexShader:J.vertexShader,fragmentShader:J.fragmentShader,lights:!0,side:x,fog:g});H.uniforms.mirrorSampler.value=Y.texture,H.uniforms.textureMatrix.value=L,H.uniforms.alpha.value=a,H.uniforms.time.value=l,H.uniforms.normalSampler.value=c,H.uniforms.sunColor.value=u,H.uniforms.waterColor.value=f,H.uniforms.sunDirection.value=h,H.uniforms.distortionScale.value=m,H.uniforms.eye.value=d,n.material=H,n.onBeforeRender=function(q,B,O){if(_.setFromMatrixPosition(n.matrixWorld),v.setFromMatrixPosition(O.matrixWorld),C.extractRotation(n.matrixWorld),y.set(0,0,1),y.applyMatrix4(C),R.subVectors(_,v),R.dot(y)>0)return;R.reflect(y).negate(),R.add(_),C.extractRotation(O.matrixWorld),T.set(0,0,-1),T.applyMatrix4(C),T.add(v),b.subVectors(_,T),b.reflect(y).negate(),b.add(_),U.position.copy(R),U.up.set(0,1,0),U.up.applyMatrix4(C),U.up.reflect(y),U.lookAt(b),U.far=O.far,U.updateMatrixWorld(),U.projectionMatrix.copy(O.projectionMatrix),L.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),L.multiply(U.projectionMatrix),L.multiply(U.matrixWorldInverse),p.setFromNormalAndCoplanarPoint(y,_),p.applyMatrix4(U.matrixWorldInverse),E.set(p.normal.x,p.normal.y,p.normal.z,p.constant);const tt=U.projectionMatrix;S.x=(Math.sign(E.x)+tt.elements[8])/tt.elements[0],S.y=(Math.sign(E.y)+tt.elements[9])/tt.elements[5],S.z=-1,S.w=(1+tt.elements[10])/tt.elements[14],E.multiplyScalar(2/E.dot(S)),tt.elements[2]=E.x,tt.elements[6]=E.y,tt.elements[10]=E.z+1-o,tt.elements[14]=E.w,d.setFromMatrixPosition(O.matrixWorld);const W=q.getRenderTarget(),vt=q.xr.enabled,Xt=q.shadowMap.autoUpdate;n.visible=!1,q.xr.enabled=!1,q.shadowMap.autoUpdate=!1,q.setRenderTarget(Y),q.state.buffers.depth.setMask(!0),q.autoClear===!1&&q.clear(),q.render(B,U),n.visible=!0,q.xr.enabled=vt,q.shadowMap.autoUpdate=Xt,q.setRenderTarget(W);const Me=O.viewport;Me!==void 0&&q.state.viewport(Me)}}}function ys(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new Te;let c=0;for(let h=0;h<i.length;++h){const u=i[h];let f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(t){let d;if(e)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,d,h),c+=d}}if(e){let h=0;const u=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let m=0;m<d.count;++m)u.push(d.getX(m)+h);h+=i[f].attributes.position.count}l.setIndex(u)}for(const h in r){const u=Nu(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let x=0;x<o[h].length;++x)d.push(o[h][x][f]);const m=Nu(d);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function Nu(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new cn(o,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let f=0,d=h.count;f<d;f++)for(let m=0;m<e;m++){const x=h.getComponent(f,m);a.setComponent(f+u,m,x)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const ge=1.8,n_=2,i_=110*ge,s_=108*ge,ne=3,lr=ne/2.15,Ms=12.3*lr,ms=Ms+6,r_=Ms+8,Wo=17,o_=lr,Hn=i=>Object.freeze(Object.fromEntries(Object.entries(i).map(([t,e])=>[t,t==="yaw"?e:e*o_])));Object.freeze({store:Hn({width:4.4,depth:3.6}),nursery:Hn({width:5.8,depth:5.9}),watchtower:Hn({width:4.8,depth:4}),training:Hn({width:5.7,depth:4.8}),palisade:Hn({width:7,depth:1})});Hn({x:-1.1825,z:-1.0664,yaw:0,width:7.68,depth:8.25});const a_=Hn({x:-6.45,z:.43,yaw:-.5,width:4.8,depth:5.2});Object.freeze({store:Hn({x:-6.0962,z:4.9054,yaw:0}),nursery:Hn({x:6.5601,z:-3.869,yaw:0}),watchtower:Hn({x:6.6295,z:5.3482,yaw:0}),training:Hn({x:-6.2831,z:-6.0974,yaw:0}),palisade:Hn({x:0,z:9.8,yaw:0})});const l_=Ms-.15,c_=6.8,fa=3.8,h_=.9,ku=(i,t)=>Number.isFinite(i)?i:t,u_=i=>i?.natural===!0||i?.mesh?.userData?.natural===!0,d_=Array.from({length:5},(i,t)=>Object.freeze({stage:t,unfinished:t<4,wallHeight:t===0?0:t===1?fa*.35:fa,keep:t>=3,gate:t===4})),f_=Object.freeze({stage:4,unfinished:!1,wallHeight:0,keep:!1,gate:!1});function Fu(i){if(u_(i))return f_;const t=i.mesh?.userData?.visualState,e=i.underConstruction??t?.underConstruction??!1,n=e?Math.max(0,Math.min(1,ku(i.constructionProgress,ku(t?.constructionProgress,0)))):1,s=e?Math.min(3,Math.floor(n*4)):4;return d_[s]}const xs=(i,t=0)=>Number.isFinite(i)?i:t,pa=(i,t,e)=>Math.max(t,Math.min(e,i)),cr=1e-6,p_=i=>i&&i.active!==!1;function m_(i,t){const e=Math.cos(i.yaw||0),n=Math.sin(i.yaw||0),s=t.x-i.x,r=t.z-i.z;return{x:e*s-n*r,y:t.y,z:n*s+e*r}}function Xo(i,t){const e=Math.cos(i.yaw||0),n=Math.sin(i.yaw||0);return{x:i.x+e*t.x+n*t.z,y:xs(t.y,i.floorY),z:i.z-n*t.x+e*t.z}}const Cd=(i,t,e=0)=>i.x>t.minX+e-cr&&i.x<t.maxX-e+cr&&i.z>t.minZ+e-cr&&i.z<t.maxZ-e+cr,bi=(i,t,e,n,s,r,o)=>({id:i,minX:t,maxX:e,minZ:n,maxZ:s,minY:r,maxY:o});function Ou(i,t,e=0){return t.outline?t.outline.every((s,r)=>{const o=t.outline[(r+1)%t.outline.length],a=o.x-s.x,l=o.z-s.z;return a*(i.z-s.z)-l*(i.x-s.x)>=Math.max(0,e)*Math.hypot(a,l)-cr})||e<0&&t.outline.some((s,r)=>g_(i,s,t.outline[(r+1)%t.outline.length])<e*e-cr):Cd(i,t,e)}function g_(i,t,e){const n=e.x-t.x,s=e.z-t.z,r=pa(((i.x-t.x)*n+(i.z-t.z)*s)/(n*n+s*s||1),0,1);return(i.x-t.x-n*r)**2+(i.z-t.z-s*r)**2}function x_(i,t){return i.outline=t.map(([e,n])=>({x:e,z:n})),i.minX=Math.min(...t.map(e=>e[0])),i.maxX=Math.max(...t.map(e=>e[0])),i.minZ=Math.min(...t.map(e=>e[1])),i.maxZ=Math.max(...t.map(e=>e[1])),i}function v_(i,{terrainHeight:t,minimumFloorY:e=.82}={}){const n=t||(()=>0),s={id:i.id,x:xs(i.x),z:xs(i.z),yaw:xs(i.yaw,Math.atan2(-i.x,-i.z)),team:i.team||"neutral",active:!0};let r=-1/0,o=1/0;for(let m=-3.75;m<=3.76;m+=1.25)for(let x=-3.25;x<=4.26;x+=1.25){const g=Xo(s,{x:m,z:x,y:0}),p=xs(n(g.x,g.z));r=Math.max(r,p),o=Math.min(o,p)}s.floorY=Math.max(e,r+.045),s.floorBottom=Math.min(o-.16,s.floorY-.22),s.roofBottom=s.floorY+2.25,s.roofTop=s.floorY+3.05,s.interior={minX:-3.1,maxX:3.1,minZ:-2.6,maxZ:.45},s.floor={minX:-3.75,maxX:3.75,minZ:-3.25,maxZ:4.1},s.entrance={x:1.55,z:4,minX:.3,maxX:2.8,minZ:3.35,maxZ:4,width:2.5,height:1.95},s.solids=[bi("floor",-3.75,3.75,-3.25,4.1,s.floorBottom,s.floorY),bi("left-wall",-3.75,-3.1,-3.25,4,s.floorY,s.roofBottom),bi("right-wall",3.1,3.75,-3.25,4,s.floorY,s.roofBottom),bi("back-wall",-3.75,3.75,-3.25,-2.6,s.floorY,s.roofBottom),bi("front-left",-3.75,.3,3.35,4,s.floorY,s.roofBottom),bi("front-right",2.8,3.75,3.35,4,s.floorY,s.roofBottom),bi("entrance-lintel",.3,2.8,3.35,4,s.floorY+1.95,s.roofBottom),bi("root-baffle",-.35,3.1,.45,1.05,s.floorY,s.roofBottom),bi("roof",-3.75,3.75,-3.25,4,s.roofBottom,s.roofTop)];const l={floor:[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.2],[-3.15,4.2],[-4.12,3.4]],roof:[[-4.12,-2.2],[-3.45,-3.45],[2.9,-3.65],[4.1,-2.3],[4,3.4],[3.45,4.22],[-3.15,4.45],[-4.12,3.4]],"left-wall":[[-3.1,-3.35],[-3.1,4.3],[-3.95,3.4],[-4.05,-2.2]],"right-wall":[[3.1,-3.35],[3.95,-2.3],[3.85,3.4],[3.1,4.2]],"back-wall":[[-3.25,-2.6],[-3.5,-3.3],[2.9,-3.5],[3.3,-2.6]],"front-left":[[-3.3,3.35],[.3,3.35],[.3,4.13],[-3.15,4.3]],"front-right":[[2.8,3.35],[3.3,3.35],[3.45,4],[2.8,4]],"root-baffle":[[-.35,.45],[3.1,.45],[3.1,1.05],[-.3,.98]]};for(const m of s.solids)x_(m,l[m.id]||[[m.minX,m.minZ],[m.maxX,m.minZ],[m.maxX,m.maxZ],[m.minX,m.maxZ]]);s.floor={...s.solids[0]},s.shellBounds={minX:Math.min(...s.solids.map(m=>m.minX)),maxX:Math.max(...s.solids.map(m=>m.maxX)),minZ:Math.min(...s.solids.map(m=>m.minZ)),maxZ:Math.max(...s.solids.map(m=>m.maxZ))};let c=4.5;const h=4.2;for(let m=0;m<3;m++){const x=Xo(s,{x:s.entrance.x,z:h+c,y:0});c=pa(Math.abs(s.floorY-n(x.x,x.z))/.32,4.5,14)}const u=Math.max(10,Math.ceil(c/.45)),f=6,d={minX:s.entrance.x-1.6,maxX:s.entrance.x+1.6,minZ:h,maxZ:h+c,rows:u,cols:f,heights:[],bottoms:[]};for(let m=0;m<=u;m++)for(let x=0;x<=f;x++){const g=m/u,p=d.minX+(d.maxX-d.minX)*x/f,y=d.minZ+c*g,_=Xo(s,{x:p,z:y,y:0}),v=Xo(s,{x:p,z:d.maxZ,y:0}),C=xs(n(_.x,_.z)),T=s.floorY+(xs(n(v.x,v.z))-s.floorY)*g;d.heights.push(m===0?s.floorY:Math.max(C+(m===u?.005:.02),T)),d.bottoms.push(Math.min(C-.14,T-.18))}return s.ramp=d,s.radius=Math.max(6,Math.hypot(d.maxX,d.maxZ)),s}function __(i,t){const e=i.ramp;if(!e||!Cd(t,e))return null;const n=pa((t.x-e.minX)/(e.maxX-e.minX)*e.cols,0,e.cols),s=pa((t.z-e.minZ)/(e.maxZ-e.minZ)*e.rows,0,e.rows),r=Math.min(e.cols-1,Math.floor(n)),o=Math.min(e.rows-1,Math.floor(s)),a=n-r,l=s-o,c=(m,x)=>e.heights[x*(e.cols+1)+m],h=c(r,o),u=c(r+1,o),f=c(r,o+1),d=c(r+1,o+1);return a+l<=1?h+(u-h)*a+(f-h)*l:d+(f-d)*(1-a)+(u-d)*(1-l)}function y_(i,t,e,{y:n}={}){let s=null;for(const r of i||[]){if(!p_(r)||Math.hypot(t-r.x,e-r.z)>r.radius+1)continue;const o=m_(r,{x:t,z:e}),a=r.solids.find(u=>u.id==="roof");let l=null,c="floor";Ou(o,r.floor)&&(l=r.floorY);const h=__(r,o);h!==null&&(l===null||h>l)&&(l=h,c="ramp"),Number.isFinite(n)&&n>=r.roofTop-.06&&Ou(o,a)&&(l=r.roofTop,c="roof"),l!==null&&(!s||l>s.height)&&(s={height:l,type:c==="roof"?"rock":"land",platform:r,refuge:r,surface:c})}return s}const ih=(i,t,e)=>Math.max(t,Math.min(e,i)),Qn=(i,t,e)=>{const n=ih((e-i)/(t-i),0,1);return n*n*(3-2*n)},Xi=-.035;function M_(i,t){if(!Number.isFinite(i)||!Number.isFinite(t))return .91;const e=Math.max(0,t-.215-i);return .91-.63*Qn(.1,.6,e)}const b_=Object.freeze({pond:{id:"pond",x:0,z:0,radius:8,label:"Λιμνούλα των νούφαρων",description:"Μύγες, ανθισμένα φύλλα και χαμηλές διαδρομές πάνω από το νερό.",hint:"Παρατήρησε πού μαζεύονται οι μύγες.",findPoint:{x:6.5,z:3}},creek:{id:"creek",x:8,z:-24,radius:7,label:"Το στενό ρυάκι",description:"Το ρεύμα αλλάζει τις διαδρομές και μεταφέρει την τροφή.",hint:"Ακολούθησε την κίνηση του νερού.",findPoint:{x:4,z:-29}},bank:{id:"bank",x:27,z:8,radius:7,label:"Η όχθη με τα βότσαλα",description:"Ψηλά βράχια, κρυψώνες και εκτεθειμένα περάσματα.",hint:"Οι καλαμιές κρύβουν μια δεύτερη προσέγγιση.",findPoint:{x:30,z:6}},roots:{id:"roots",x:24,z:-16,radius:5,label:"Το πέρασμα στις ρίζες",description:"Ένα φυσικό άνοιγμα που αποκαλύπτεται όταν χαμηλώνει το νερό.",hint:"Μικρά έντομα χάνονται κάτω από τις καμπύλες ρίζες.",findPoint:{x:31,z:-16}}});function S_(i){const t=e=>({...e,...i.toWorld(e.x,e.z)});return{landmarks:Object.values(b_).map(e=>({...t(e),findPoint:t(e.findPoint)})),nest:t({id:"creek-nest",x:17,z:16,radius:4,label:"Κοιλότητα κάτω από τις ρίζες"}),refuges:[{id:"willow-crevice",x:-20,z:7,label:"Κρυψώνα της πεσμένης ιτιάς"},{id:"bank-crevice",x:34,z:-9,label:"Κοιλότητα της πετρώδους όχθης"}].map(e=>({...t(e),yaw:Math.atan2(-e.x,-e.z)+i.yaw})),cover:[{id:"nest-reeds",x:14,z:20,radius:3.1},{id:"root-reeds",x:18,z:-7,radius:3},{id:"bank-reeds",x:29,z:11,radius:3.3},{id:"creek-reeds",x:18,z:-22,radius:3}].map(t)}}function Pd(i){return 6+Math.sin(i*.035)*9}function w_(i,t,e=0,n=[]){const s=Math.abs(i-Pd(t));let r=-1.9+Qn(6,17,s)*3.5+e*.22;r+=Qn(20,55,s)*(.4+Math.sin(t*.04+.6)**2*1.2);const o=1-Qn(11,20,Math.hypot(i*.95,t*.8));r=r*(1-o)+(-2.65+e*.2)*o;for(const l of n){const c=Math.hypot(i-l.x,t-l.z),u=l.radius*(1+.045*Math.sin(Math.atan2(t-l.z,i-l.x)*5+(l.shorePhase||0))),f=1-Qn(u*.46,u+5,c);f>0&&(r=Math.max(r,r*(1-f)+l.elevation*f))}const a=(1-Qn(1.9,4.7,Math.abs(t+16)))*Qn(9,14,i)*(1-Qn(31,36,i));return r=r*(1-a)+Math.min(r,-.18+e*.025)*a,r+=Qn(190,235,Math.max(Math.abs(i),Math.abs(t)))*4,r}function E_(i,t,e,n=.45){const s=i.toSource(t,e),r=Math.abs(s.x-Pd(s.z)),o=ih(Number(n)||0,0,1.5)*(1-Qn(5,17,r))*(.55+.45*Qn(5,23,Math.abs(s.z)));if(o<=0)return{x:0,z:0,strength:0};const a=.315*Math.cos(s.z*.035),l=Math.hypot(a,1),c=i.toWorld(0,0),h=i.toWorld(a/l,1/l);return{x:(h.x-c.x)*o,z:(h.z-c.z)*o,strength:o}}function T_({group:i,layout:t,terrainHeight:e,surface:n,insertPlatform:s,materials:r,rockGeos:o,tube:a,leafGeometry:l,bladeGeometry:c,geography:h}){const u=new re;u.name="Natural creek discoveries",i.add(u);const f=[],d=new We,m=new Map,x=new Xn(1,11,7),g=new Ve({color:"#e0c58b",roughness:.68}),p=new Ve({color:"#698d9d",roughness:.65}),y=l(.55,.38,.11),_=r.leaf.clone();_.color.set("#adc68a");const v=(H,q,B)=>{const O=t.toWorld(H,q);return[O.x,B,O.z]},C=h.landmarks.find(H=>H.id==="roots"),T=e(C.x,C.z);for(const H of[-.48,.45]){const q=a([[0,-.1,-4.1],[-.3,2.3,-2.6],[.2,3.7,0],[.35,2.5,2.7],[0,-.1,4.2]].map(B=>v(24+B[0]+H,-16+B[2],T+B[1])),.48,r.bark,24,.14);q.name="Passable willow root arch",q.castShadow=!0,q.receiveShadow=!0,u.add(q)}for(const H of[-1,1])for(let q=0;q<4;q++){const B=-16+H*(3.4+q*.45),O=24+(q-1.5)*1.1,tt=t.toWorld(O,B),W=t.toWorld(O-4.5,B+H*1.5),vt=a([[tt.x,e(tt.x,tt.z)+.8,tt.z],[(tt.x+W.x)/2,e(W.x,W.z)+.45,(tt.z+W.z)/2],[W.x,e(W.x,W.z)-.05,W.z]],.1+q*.025,r.bark,12,.75);vt.castShadow=!0,u.add(vt)}const E=[{id:"creek-stone",x:4,z:-29,r:1.8,height:3.5},{id:"root-approach",x:18,z:-7,r:1.65,height:1.65},{id:"root-perch",x:24,z:-11,r:1.7,height:2},{id:"bank-perch",x:30,z:6,r:2,height:2.05},{id:"nest-perch",x:19,z:20,r:1.8,height:1.7},{id:"pond-perch",x:-5,z:8,r:1.7,height:3.5}],R=new Ve({color:"#c4d9ad",roughness:.82});for(const[H,q]of E.entries()){const B=t.toWorld(q.x,q.z),O=e(B.x,B.z),tt=q.height,W=new Jt(o[H%o.length],r.mossRock);W.name="Moss-covered grip outcrop",W.position.set(B.x,O,B.z),W.scale.set(q.r,tt,q.r),W.rotation.y=H*1.93,W.castShadow=!0,W.receiveShadow=!0,u.add(W);const vt=s({id:q.id,type:"rock",...B,y:O+tt*.76,radius:q.r*.72,visualRadius:q.r,scaleY:tt}),Xt=new Jt(x,R);Xt.name="Pale natural grip",Xt.position.set(B.x,vt.y+.045,B.z),Xt.scale.set(.22,.07,.22),u.add(Xt),f.push({id:q.id,...B,y:vt.y+.13,radius:vt.radius})}const b=c(123),S=new wn(b,r.plant,h.cover.length*84);S.name="Dense camouflage reed pockets";let L=0;for(const[H,q]of h.cover.entries())for(let B=0;B<84;B++){const O=B*2.399+H*.7,tt=Math.sqrt((B+.4)/84)*q.radius,W=q.x+Math.cos(O)*tt,vt=q.z+Math.sin(O)*tt;d.position.set(W,e(W,vt),vt),d.rotation.set(0,O,0),d.scale.set(1.2,1.65+B%5*.18,1.2),d.updateMatrix(),S.setMatrixAt(L++,d.matrix)}S.receiveShadow=!0,S.computeBoundingSphere(),u.add(S);function U(H,q,B){const O=new re;O.name=B?"Lost food and natural keepsakes":"Natural discovery";const tt=new Jt(y,_);tt.rotation.y=m.size*2.4%6.28,tt.receiveShadow=!0,O.add(tt);for(let W=0;W<(B?3:1);W++){const vt=new Jt(x,q.kind==="keepsake"||q.keepsakesCount?g:p);vt.position.set((W-1)*.15,.15+W%2*.035,.015),vt.scale.set(.22,.15,.18),vt.rotation.set(.2,W*.9,.1),vt.castShadow=!0,O.add(vt)}return O.userData.creekPoint={...q},u.add(O),m.set(H,O),O}function Y(H,q){const B=new Set;for(const[O,tt]of[[!1,H.finds||[]],[!0,H.dropped||[]]])for(const W of tt){if(!Number.isFinite(W.x)||!Number.isFinite(W.z)||W.collected||W.visible===!1)continue;const vt=(O?"drop:":"find:")+W.id;B.add(vt);const Xt=m.get(vt)||U(vt,W,O);Xt.userData.creekPoint={...W},Xt.visible=!0,Xt.position.set(W.x,Math.max(n(W.x,W.z).height,q)+.07,W.z),Xt.updateMatrix()}for(const[O,tt]of m)B.has(O)||(tt.removeFromParent(),m.delete(O))}function J(H,q){for(const B of m.values()){const O=B.userData.creekPoint,tt=n(O.x,O.z),W=tt.type==="water";B.position.y=Math.max(tt.height,H)+.07+(W?Math.sin(q*1.5+O.x)*.025:0),B.rotation.z=W?Math.sin(q*.8+O.z)*.045:0,B.updateMatrix()}}return{group:u,grips:f,sync:Y,update:J,resources:[x,g,p,y,_,R,b]}}function A_(i){const t=i.outline||[{x:i.minX,z:i.minZ},{x:i.maxX,z:i.minZ},{x:i.maxX,z:i.maxZ},{x:i.minX,z:i.maxZ}],e=t.length,n=[],s=[];for(const h of[i.minY,i.maxY])for(const u of t)n.push(u.x,h,u.z);for(let h=1;h<e-1;h++)s.push(0,h,h+1,e,e+h+1,e+h);for(let h=0;h<e;h++){const u=(h+1)%e;s.push(h,e+h,u,u,e+h,e+u)}const r=new Te;r.setAttribute("position",new Wt(n,3)),r.setIndex(s);const o=r.toNonIndexed();r.dispose(),o.computeVertexNormals();const a=o.attributes.position,l=o.attributes.normal,c=[];for(let h=0;h<a.count;h++){const u=Math.abs(l.getY(h))>.5;c.push((u?a.getX(h):Math.abs(l.getX(h))>.5?a.getZ(h):a.getX(h))*.35,(u?a.getZ(h):a.getY(h))*.35)}return o.setAttribute("uv",new Wt(c,2)),o}function R_(i,{terrainHeight:t,materials:e,rockGeos:n,tube:s,leafGeometry:r,mergeStaticParts:o,teamColor:a}){const l=v_(i,{terrainHeight:t}),c=new re;c.name="Natural refuge "+(i.id||""),c.position.set(i.x,l.floorY,i.z),c.rotation.y=l.yaw;const h=[],u=e.leaf.clone(),f=e.rock.clone();f.color.set("#71816a"),h.push(u,f);const d=new re;d.name="Opaque rock and root cavity",c.add(d);const m=new re;m.name="Overhanging refuge slab",d.add(m);for(const E of l.solids){const R=A_(E),b=E.id==="root-baffle"?e.bark:E.id==="floor"?f:e.mossRock,S=new Jt(R,b);S.name="Refuge solid · "+E.id,S.userData.refugeSolid=E,S.position.y=-l.floorY,S.castShadow=!0,S.receiveShadow=!0,h.push(R),(E.id==="roof"?m:d).add(S)}const x=l.ramp,g=[],p=[];for(let E=0;E<=x.rows;E++)for(let R=0;R<=x.cols;R++){const b=E*(x.cols+1)+R;g.push(x.minX+(x.maxX-x.minX)*R/x.cols,x.heights[b]-l.floorY,x.minZ+(x.maxZ-x.minZ)*E/x.rows)}for(let E=0;E<x.rows;E++)for(let R=0;R<x.cols;R++){const b=E*(x.cols+1)+R,S=b+1,L=b+x.cols+1,U=L+1;p.push(b,L,S,S,L,U)}const y=[];for(let E=0;E<=x.cols;E++)y.push(E);for(let E=1;E<=x.rows;E++)y.push(E*(x.cols+1)+x.cols);for(let E=x.cols-1;E>=0;E--)y.push(x.rows*(x.cols+1)+E);for(let E=x.rows-1;E>0;E--)y.push(E*(x.cols+1));for(let E=0;E<y.length;E++){const R=y[E],b=y[(E+1)%y.length],S=g.length/3,L=S+1;g.push(g[R*3],x.bottoms[R]-l.floorY,g[R*3+2],g[b*3],x.bottoms[b]-l.floorY,g[b*3+2]),p.push(R,b,S,b,L,S)}const _=new Te;_.setAttribute("position",new Wt(g,3)),_.setAttribute("uv",new Wt(Array.from({length:g.length/3},(E,R)=>[g[R*3]*.35,g[R*3+2]*.35]).flat(),2)),_.setIndex(p),_.computeVertexNormals(),h.push(_);const v=new Jt(_,e.mossRock);v.name="Terrain-joined natural refuge ledge",v.castShadow=!0,v.receiveShadow=!0,d.add(v);for(const E of[-1,1])for(let R=0;R<3;R++){const b=E*(3.6-R*.12),S=-2.4+R*2.3,L=s([[b,l.floorBottom-l.floorY,S+.55],[b+E*.08,.55,S+.35],[b-E*.12,1.8,S],[b-E*.45,2.6,S-.2]],.16+R*.045,e.bark,15,.48);L.castShadow=!0,h.push(L.geometry),d.add(L)}for(let E=0;E<5;E++){const R=-2.3+E*1.3,b=s([[-3.5,3.03,R],[-1.6,3.12,R-.2],[.5,3.1,R+.1],[3.4,3.04,R+.35]],.075+E%2*.045,e.bark,18,.35);b.castShadow=!0,h.push(b.geometry),m.add(b)}const C=[];for(let E=0;E<4;E++){const R=new re;R.name="Natural life "+E,C.push(R),m.add(R);for(let b=0;b<8+E*3;b++){const S=b*2.399+E*.7,L=Math.cos(S)*(2.1+b%3*.48),U=.35+Math.sin(S)*(2.1+b%4*.2),Y=new Jt(r(.65+b%3*.15,.85,.12),u);h.push(Y.geometry),Y.position.set(L,3.07+b%3*.025,U),Y.rotation.set((b%3-1)*.08,S,(b%2-.5)*.1),Y.castShadow=!0,Y.receiveShadow=!0,R.add(Y)}o(R,h)}const T=new re;T.name="Dry leaves inside the root hollow",d.add(T);for(let E=0;E<8;E++){const R=new Jt(r(.3,.48,.045),u);h.push(R.geometry),R.position.set(Math.sin(E*2.4)*2,.025,-1.1+Math.cos(E*2.4)*.7),R.rotation.y=E*1.7,R.receiveShadow=!0,T.add(R)}return o(T,h),l.mesh=c,c.userData={id:i.id,natural:!0,radius:l.radius,owned:h,growth:C,leafMaterial:u,terrain:null,keepCollision:{rects:[]},trainingPoint:c.position.clone(),support:{x:i.x,z:i.z,y:l.floorY,type:"land",radius:0},team:i.team,refuge:l,refugeSolids:d,refugeRoof:m},Dd(c,i,a),c}function Dd(i,t={},e){const n=i.userData.visualState||{},s={...n,...t},r=ih(Math.floor(Number(s.nestLevel??s.level??s.tier??1)||0),0,3);return i.userData.visualState={team:s.team??"neutral",tier:s.tier??1,nestLevel:r,safe:s.safe!==!1,hp:s.hp,maxHp:s.maxHp,destroyed:!!s.destroyed},i.userData.team=i.userData.visualState.team,i.userData.level=r,i.userData.destroyed=!!s.destroyed,i.userData.refuge&&(i.userData.refuge.team=i.userData.team),i.userData.leafMaterial.color.set(e(i.userData.team)).lerp(new te("#72964b"),.7),i.userData.growth.forEach((o,a)=>{o.visible=a<=r}),i.userData.collisionRevision=(i.userData.collisionRevision||0)+1,i}const ze=Math.PI*2,Yi=Sc.clamp,Kn=(i,t,e)=>(e=Yi((e-i)/(t-i),0,1),e*e*(3-2*e));function Pi(i){return()=>{i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const qo=(i,t)=>Math.sin(i*.213+Math.sin(t*.137)*1.9)*.48+Math.sin(t*.329-i*.079)*.27+Math.cos(i*.741+t*.533)*.13,ln=i=>new te(i),ft=new We;new z(0,1,0);const Bu=[{sky:"#8aaab0",fog:"#819e91",earth:"#8b8a62",wet:"#43533b",deep:"#52634e",leaf:"#b5d28f",rock:"#a4a292",moss:"#89976c",bark:"#65513a",reed:"#b4a676",water:"#2c6258",nightWater:"#0c2b32"},{sky:"#91acbd",fog:"#8bada6",earth:"#82958a",wet:"#3c6257",deep:"#456b68",leaf:"#a0c9ad",rock:"#a7b5ae",moss:"#7f9b88",bark:"#605848",reed:"#aebca0",water:"#3b747b",nightWater:"#122c3b"},{sky:"#b4a58a",fog:"#a39b7e",earth:"#b09b6b",wet:"#685b3c",deep:"#626047",leaf:"#d0b46b",rock:"#b6a184",moss:"#9f9a6d",bark:"#78543b",reed:"#c8ad73",water:"#69765a",nightWater:"#25352b"},{sky:"#82989c",fog:"#738d81",earth:"#7a8064",wet:"#364f3b",deep:"#3e5c52",leaf:"#93b57d",rock:"#939b8b",moss:"#6b8664",bark:"#554934",reed:"#9b9d70",water:"#376b57",nightWater:"#112e29"}];function C_(i=0,t=731+Math.max(0,i)*7919){const e=Math.max(0,Math.floor(Number(i)||0)),n=e%8,[s,r]=[[1,0],[0,1],[-1,0],[0,-1]][n%4],o=n>=4?-1:1,a=(h,u)=>e?{x:s*h*o+r*u,z:-r*h*o+s*u}:{x:h,z:u},l=(h,u)=>e?{x:o*(s*h-r*u),z:r*h+s*u}:{x:h,z:u},c=Pi((Number(t)||731)^Math.imul(e,2654435761));return{index:e,seed:t,symmetry:n,yaw:n%4*Math.PI/2,toWorld:a,toSource:l,palette:{...Bu[e%Bu.length]},noiseOffset:e?{x:(c()-.5)*170,z:(c()-.5)*170}:{x:0,z:0}}}function sh(i,t,e=1){const n=document.createElement("canvas");n.width=n.height=i,t(n.getContext("2d"),i);const s=new md(n);return s.colorSpace=In,s.wrapS=s.wrapT=xr,s.repeat.set(e,e),s.anisotropy=4,s}function vl(i,t=!1){const e=Pi(i);return sh(256,(n,s)=>{n.fillStyle=t?"#6c7155":"#8b8978",n.fillRect(0,0,s,s);for(let r=0;r<15e3;r++){const o=e()*s,a=e()*s,l=45+e()*110;n.fillStyle=t?`rgba(${l*.8},${l},${l*.61},${.12+e()*.28})`:`rgba(${l*1.06},${l},${l*.85},${.15+e()*.3})`,n.fillRect(o,a,.5+e()*3,.5+e()*3)}n.lineWidth=.7;for(let r=0;r<26;r++){n.strokeStyle=`rgba(31,36,28,${.06+e()*.15})`,n.beginPath();let o=e()*s;n.moveTo(0,o);for(let a=0;a<s;a+=10)o+=(e()-.5)*9,n.lineTo(a,o);n.stroke()}},1)}function P_(i){const t=Pi(i);return sh(512,(e,n)=>{const s=e.createRadialGradient(n*.5,n*.5,4,n*.5,n*.5,n*.54);s.addColorStop(0,"#588a39"),s.addColorStop(.6,"#6ca04a"),s.addColorStop(1,"#345d27"),e.fillStyle=s,e.fillRect(0,0,n,n);for(let r=0;r<9e3;r++)e.fillStyle=t()>.5?"rgba(185,214,109,.08)":"rgba(18,58,20,.06)",e.fillRect(t()*n,t()*n,t()*4+1,t()*4+1);for(let r=.18;r<ze-.18;r+=.31){const o=n*.5+Math.cos(r)*n*.49,a=n*.5+Math.sin(r)*n*.49;e.strokeStyle="rgba(191,204,117,.42)",e.lineWidth=1.8,e.beginPath(),e.moveTo(n*.5,n*.5),e.quadraticCurveTo(n*.5+Math.cos(r+.08)*n*.28,n*.5+Math.sin(r+.08)*n*.28,o,a),e.stroke();for(let l=.2;l<.9;l+=.15)for(const c of[-1,1])e.strokeStyle="rgba(186,211,124,.19)",e.lineWidth=.8,e.beginPath(),e.moveTo(n*.5+Math.cos(r)*n*l*.5,n*.5+Math.sin(r)*n*l*.5),e.lineTo(n*.5+Math.cos(r+c*.12)*n*(l+.1)*.5,n*.5+Math.sin(r+c*.12)*n*(l+.1)*.5),e.stroke()}for(let r=0;r<13;r++){const o=t()*ze,a=t()*n*.45;e.fillStyle="rgba(42,56,17,.16)",e.beginPath(),e.ellipse(n*.5+Math.cos(o)*a,n*.5+Math.sin(o)*a,t()*5+2,t()*3+1,o,0,ze),e.fill()}})}function D_(i){const e=document.createElement("canvas");e.width=e.height=256;const n=e.getContext("2d"),s=n.createImageData(256,256);for(let o=0;o<256;o++)for(let a=0;a<256;a++){const l=(o*256+a)*4,c=a*ze/256,h=o*ze/256,u=Math.cos(c*9+h*7)*.27+Math.cos(c*17-h*11)*.14+Math.sin(c*31+h*19)*.07,f=Math.sin(c*7+h*13)*.27+Math.sin(c*19-h*9)*.13+Math.cos(c*29+h*23)*.08;s.data[l]=128+u*110,s.data[l+1]=128+f*110,s.data[l+2]=245,s.data[l+3]=255}n.putImageData(s,0,0);const r=new md(e);return r.wrapS=r.wrapT=xr,r.colorSpace=wi,r}function Ac(i,t,e=.1,n=1){const s=Pi(n),r=i.attributes.position,o=new Float32Array(r.count*3),a=ln(t);for(let l=0;l<r.count;l++){const c=1+(s()-.5)*e;o[l*3]=a.r*c,o[l*3+1]=a.g*c,o[l*3+2]=a.b*c}return i.setAttribute("color",new cn(o,3)),i}function Ke(i,t,e,n=12,s=0){const r=new ro(i.map(a=>new z(...a))),o=new Ma(r,n,t,5,!1);if(s){const a=o.attributes.position;for(let l=0;l<=n;l++){const c=r.getPointAt(l/n),h=1-s*l/n;for(let u=0;u<=5;u++){const f=l*6+u;a.setXYZ(f,c.x+(a.getX(f)-c.x)*h,c.y+(a.getY(f)-c.y)*h,c.z+(a.getZ(f)-c.z)*h)}}o.computeVertexNormals()}return new Jt(o,e)}function Jn(i,t=[],e=new Set){i.updateMatrixWorld(!0);const n=new he().copy(i.matrixWorld).invert(),s=new Map;i.traverse(r=>{if(!r.isMesh||r.isInstancedMesh||e.has(r)||Array.isArray(r.material))return;const o=r.material.uuid;s.has(o)||s.set(o,{material:r.material,meshes:[]}),s.get(o).meshes.push(r)});for(const{material:r,meshes:o}of s.values()){if(o.length<2)continue;const a=o.map(h=>h.geometry.clone().applyMatrix4(new he().multiplyMatrices(n,h.matrixWorld))),l=ys(a,!1);for(const h of a)h.dispose();if(!l)continue;const c=new Jt(l,r);c.castShadow=o.some(h=>h.castShadow),c.receiveShadow=!0,t.push(l);for(const h of o){h.removeFromParent();const u=t.indexOf(h.geometry);u>=0&&(t.splice(u,1),h.geometry.dispose())}i.add(c)}}function qi(i=1,t=1,e=.08){const n=[],s=[],r=[];for(let c=0;c<=3;c++)for(let h=0;h<=40;h++){const u=c/3,f=.22+h/40*(ze-.44),d=1+.027*Math.sin(f*7)+.016*Math.cos(f*13),m=Math.cos(f)*u*d,x=Math.sin(f)*u*d;n.push(m*i,e*(u*u)+.014*Math.sin(f*4)*u*u,x*t),s.push(m*.48+.5,x*.48+.5)}for(let c=0;c<3;c++)for(let h=0;h<40;h++){const u=c*41+h,f=u+40+1;r.push(u,u+1,f,f,u+1,f+1)}const l=new Te;return l.setAttribute("position",new Wt(n,3)),l.setAttribute("uv",new Wt(s,2)),l.setIndex(r),l.computeVertexNormals(),l}function _l(i){const t=Pi(i),e=28,n=[[-.47,.57],[-.2,.91],[.15,1],[.52,.86],[.71,.61],[.76,.08]],s=[],r=[],o=[],a=Array.from({length:e+1},(h,u)=>.87+.12*Math.sin(u*1.51+i)+t()*.12);a[e]=a[0];for(let h=0;h<n.length;h++)for(let u=0;u<=e;u++){const f=u/e*ze,d=n[h][1]*a[u],m=(Math.sin(f*5+i)+Math.sin(f*9-i))*.045;s.push(Math.cos(f)*d,n[h][0]+m*(h===5?.15:1),Math.sin(f)*d*.86),r.push(Math.cos(f)*d*.5+.5,Math.sin(f)*d*.5+.5)}for(let h=0;h<n.length-1;h++)for(let u=0;u<e;u++){const f=h*(e+1)+u,d=f+e+1;o.push(f,d,f+1,f+1,d,d+1)}const l=s.length/3;s.push(0,.764,0),r.push(.5,.5);for(let h=0;h<e;h++)o.push(l,(n.length-1)*(e+1)+h+1,(n.length-1)*(e+1)+h);const c=new Te;return c.setAttribute("position",new Wt(s,3)),c.setAttribute("uv",new Wt(r,2)),c.setIndex(o),c.computeVertexNormals(),c}function Rc(i){const t=Pi(i),e=[],n=[],s=[],r=[];for(let a=0;a<5;a++){const l=t()*ze,c=.55+t()*.7,h=.1+t()*.35,u=.022+t()*.035,f=ln(a%2?"#819c42":"#526f33"),d=e.length/3;for(let m=0;m<=7;m++){const x=m/7,g=Math.cos(l)*h*x*x,p=Math.sin(l)*h*x*x,y=u*Math.sin(Math.PI*(x*.94+.04));for(const _ of[-1,1])e.push(g+Math.cos(l+Math.PI/2)*y*_,x*c,p+Math.sin(l+Math.PI/2)*y*_),n.push(_*.5+.5,x),r.push(f.r*(.65+x*.35),f.g*(.65+x*.35),f.b*(.65+x*.35))}for(let m=0;m<7;m++){const x=d+m*2;s.push(x,x+1,x+2,x+1,x+3,x+2)}}const o=new Te;return o.setAttribute("position",new Wt(e,3)),o.setAttribute("uv",new Wt(n,2)),o.setAttribute("color",new Wt(r,3)),o.setIndex(s),o.computeVertexNormals(),o}function I_(){const i=new Ma(new ro([new z,new z(.03,.8,.015),new z(.1,1.8,.04)]),9,.013,5,!1);Ac(i,"#64754a",.15,8);const t=new Xn(1,7,7);t.scale(.065,.25,.065),t.translate(.1,1.61,.04),Ac(t,"#5d3f27",.3,5);const e=Rc(92);e.scale(.8,1.45,.8);const n=ys([i,t,e],!1);return i.dispose(),t.dispose(),e.dispose(),n}function z_(i){const t=new Xn(1,13,9),e=t.attributes.position;for(let n=0;n<e.count;n++){const s=e.getX(n),r=e.getY(n),o=e.getZ(n),a=1+.06*Math.sin(s*12+i)*Math.sin(o*13-r*7);e.setXYZ(n,s*a,r*.83*a,o*a)}return t.computeVertexNormals(),t}function L_(){const i=[],t=[],e=[];function n(r,o,a,l){const c=i.length/3;i.push(...r,...o,...a);const h=ln(l);for(let u=0;u<3;u++)t.push(h.r,h.g,h.b);e.push(c,c+1,c+2)}n([0,.025,-.1],[-.045,0,0],[0,.04,.09],"#16201b"),n([0,.025,-.1],[0,.04,.09],[.045,0,0],"#293327"),n([0,0,0],[-.17,.025,-.035],[-.12,.015,.07],"#a0b3b0"),n([0,0,0],[.12,.015,.07],[.17,.025,-.035],"#a0b3b0");const s=new Te;return s.setAttribute("position",new Wt(i,3)),s.setAttribute("color",new Wt(t,3)),s.setIndex(e),s.computeVertexNormals(),s}function Hr(i,t,e,n,{castShadow:s=!1,receiveShadow:r=!1,dynamic:o=!1}={}){const a=new re;a.name=n;const l=new Map,c=[],h=[],u=new Set,f=128;e.forEach((d,m)=>{const x=Math.floor(d.x/f)+":"+Math.floor(d.z/f);l.has(x)||l.set(x,[]),l.get(x).push(m)});for(const[d,m]of l){const x=new wn(i,t,m.length);x.name=n+" · "+d,x.castShadow=s,x.receiveShadow=r,x.userData.spatialChunk=!0,x.userData.chunkSpan=f,o&&x.instanceMatrix.setUsage(Ei),m.forEach((g,p)=>{c[g]={mesh:x,index:p}}),a.add(x),h.push(x)}return{group:a,meshes:h,count:e.length,setMatrixAt(d,m){const x=c[d];x.mesh.setMatrixAt(x.index,m),u.add(x.mesh)},setColorAt(d,m){const x=c[d];x.mesh.setColorAt(x.index,m)},finish(){for(const d of h)d.computeBoundingBox(),d.computeBoundingSphere(),d.boundingSphere.radius+=.75,d.instanceMatrix.needsUpdate=!0,d.instanceColor&&(d.instanceColor.needsUpdate=!0);u.clear()},flush(){for(const d of u)d.instanceMatrix.needsUpdate=!0;u.clear()}}}function U_(i,t,e={}){const n=Math.max(0,Math.floor(Number(e.regionIndex)||0)),s=e.seed??731+n*7919,r=C_(n,s),o=r.palette,a=Pi(s),l=new re;l.name="The living creek",i.add(l);const c=e.natural===!0,h=c?S_(r):null,u=h?.landmarks||[],f=h?.nest||null,d=h?.cover||[],m=[],x=[];let g=Xi,p=Xi,y={flow:.45},_=!1,v=null;const C=[],T=[],E=new Set,R=new Map,b=new Set,S=[],L=new Map,U=6;let Y=null;const J={reflectionRenders:0,reflectionSkips:0,flyMatricesUpdated:0,spatialChunks:0,terrainUpdates:0};new te(o.sky);const H=new te(o.fog);i.fog?i.fog.color.copy(H):i.fog=new va(H,.0042);const q=vl(s),B=vl(s+9,!0),O=P_(s),tt=D_();S.push(q,B,O,tt);const W={terrain:new Ve({color:16777215,vertexColors:!0,map:B,roughness:1}),leaf:new Ve({color:o.leaf,map:O,roughness:.44,metalness:.025,side:Ue}),rock:new Ve({color:o.rock,map:q,roughness:.89}),mossRock:new Ve({color:o.moss,map:B,roughness:.94}),plant:new Ve({color:16777215,vertexColors:!0,roughness:.87,side:Ue}),bark:new Ve({color:o.bark,map:q,roughness:.94}),reed:new Ve({color:o.reed,map:q,roughness:.83}),compost:new Ve({color:"#57422e",map:B,roughness:1}),fruit:new Ve({color:"#b38539",map:q,roughness:.75}),darkFruit:new Ve({color:"#685831",map:B,roughness:.95})},vt=[_l(7),_l(35),_l(89)],Xt=qi(),Me=z_(19),ce=[{id:"home",x:8,z:8,radius:7.4,team:"neutral",name:"Willow Haven"},{id:"mudfang",x:-31,z:-30,radius:7,team:"enemy",name:"Mudfang Den"},{id:"redreed",x:31,z:-56,radius:7.6,team:"enemy",name:"Red Reed Stronghold"},{id:"mossjaw",x:-24,z:49,radius:7.1,team:"enemy",name:"Mossjaw Hollow"},{id:"blackpool",x:34,z:79,radius:8,team:"enemy",name:"Blackwater Nest"},{id:"thornback",x:-8,z:-91,radius:8,team:"enemy",name:"Thornback Root"},{id:"oldwillow",x:-38,z:96,radius:7.5,team:"neutral",name:"Αυλή της Γέρικης Ιτιάς"},{id:"quietbend",x:29,z:32,radius:6.8,team:"neutral",name:"Quiet Bend"},{id:"foxglove",x:-39,z:2,radius:6.8,team:"neutral",name:"Foxglove Island"},{id:"reedcrossing",x:3,z:-45,radius:6.8,team:"neutral",name:"Πέρασμα των Καλαμιών"},{id:"longreed",x:-4,z:67,radius:6.8,team:"neutral",name:"Νησίδα των Ανέμων"},{id:"eastshallows",x:58,z:35,radius:6.8,team:"neutral",name:"Ανατολικές Αβαθείς"}],ht={home:.65,mudfang:2.7,redreed:4.1,mossjaw:1.8,blackpool:5.2,thornback:7.1,oldwillow:2.9,quietbend:1.2,foxglove:2.1,reedcrossing:1.7,longreed:2.5,eastshallows:3.4},$=Pi(s^3582759),rt={home:{x:17,z:16,radius:7.4,elevation:.65},mudfang:{x:38,z:-19,radius:9,elevation:1.35},redreed:{x:-37,z:-46,radius:11,elevation:1.2},mossjaw:{x:-34,z:44,radius:11,elevation:1.05},blackpool:{x:40,z:86,radius:12,elevation:1.5},thornback:{x:-16,z:-120,radius:12,elevation:1.65}};for(const M of ce){const I=rt[M.id],k=c&&I?{x:I.x,z:I.z}:{x:M.x*ge,z:M.z*ge};Object.assign(M,r.toWorld(k.x,k.z)),M.radius=c?I?.radius||10:Math.max(36,M.radius*(M.id==="thornback"?5.8:4.9)),M.elevation=c?I?.elevation||1.1:Math.max(.45,ht[M.id]+(n?($()-.5)*.6:0)),M.shorePhase=k.x+(n?$()*ze:0),n&&(M.yaw=r.yaw)}ce.find(M=>M.id==="thornback").stronghold=!0;const yt=[{id:"haven",name:"Απάνεμη Όχθη",x:0,z:12,radius:30,tint:"#77965d"},{id:"reedways",name:"Περάσματα των Καλαμιών",x:2,z:-50,radius:45,tint:"#a99d64"},{id:"westernroots",name:"Δυτικές Ρίζες",x:-34,z:22,radius:37,tint:"#657f67"},{id:"blackwater",name:"Βαθύ Νερό",x:10,z:75,radius:34,tint:"#496f79"}].map(M=>({...M,...r.toWorld(M.x*ge,M.z*ge),radius:M.radius*ge})),Vt={heron:r.toWorld(34*ge,14*ge),snake:r.toWorld(-38*ge,-22*ge),fish:r.toWorld(12*ge,48*ge)},kt={heron:r.toWorld(43*ge,-73*ge),snake:r.toWorld(-39*ge,70*ge),fish:r.toWorld(11*ge,94*ge)};c&&(Object.assign(Vt,{heron:r.toWorld(34,15),snake:r.toWorld(-26,-23),fish:r.toWorld(5,-34)}),Object.assign(kt,{heron:r.toWorld(41,-70),snake:r.toWorld(-34,62),fish:r.toWorld(7,106)}));const fe=c?ce.map(M=>({...M,...r.toSource(M.x,M.z)})):[];function we(M,I){const k=r.toSource(M,I),F=k.x/ge,N=k.z/ge;if(c)return w_(k.x,k.z,qo(k.x+r.noiseOffset.x,k.z+r.noiseOffset.z),fe);const G=Math.sin(N*.032)*15+Math.sin(N*.073)*5,Z=Math.abs(F-G);let V=-2.2+qo(k.x+r.noiseOffset.x,k.z+r.noiseOffset.z)*.47+Kn(44,71,Z)*6;V+=Kn(47,72,Z)*(1.5+3.3*Math.sin(N*.036+.7)**2),V+=Kn(105,132,Math.abs(N))*4.8;let it=null,dt=0;for(const Nt of ce){const se=M-Nt.x,Re=I-Nt.z,Ce=Math.hypot(se,Re),me=r.toSource(se,Re),en=Nt.radius*(1+.05*Math.sin(Math.atan2(me.z,me.x)*5+Nt.shorePhase));if(Ce<en+7){const Je=r_,an=Nt.elevation-Kn(Je,en+7,Ce)*(Nt.elevation+2.8);V=Math.max(V,an);const vn=1-Kn(Je,Je+8,Ce);vn>dt&&(it=Nt,dt=vn)}}it&&(V=V*(1-dt)+it.elevation*dt);let Tt=null,$t=0,zt=1/0;for(const Nt of R.values()){const se=Math.hypot(M-Nt.x,I-Nt.z),Re=1-Kn(ms,ms+Wo,se);(Re>$t||Re===$t&&Re>0&&se<zt)&&(Tt=Nt,$t=Re,zt=se)}if(Tt){const Nt=V*(1-$t)+Tt.elevation*$t;V=$t===1?Tt.elevation:Math.max(V,Nt)}return V}const D=new Ti(270*ge,270*ge,216,216);D.rotateX(-Math.PI/2);const ee=D.attributes.position,Yt=new Float32Array(ee.count*3),qt=ln(o.earth),Lt=ln(o.wet),ie=ln(o.deep);for(let M=0;M<ee.count;M++){const I=ee.getX(M),k=ee.getZ(M),F=we(I,k);ee.setY(M,F);const N=ie.clone().lerp(Lt,Kn(-1.7,.05,F)).lerp(qt,Kn(.02,2,F));N.multiplyScalar(.88+qo(I*2,k*2)*.18),N.toArray(Yt,M*3)}D.setAttribute("color",new cn(Yt,3)),D.computeVertexNormals(),B.repeat.set(44*ge,44*ge);const pt=new Jt(D,W.terrain);pt.receiveShadow=!0,pt.name="Creek bed and island banks",l.add(pt);const Mt=135*ge,le=270*ge/216,Pe=217;function P(M,I){const k=Sc.clamp((M+Mt)/le,0,216),F=Sc.clamp((I+Mt)/le,0,216),N=Math.min(215,Math.floor(k)),G=Math.min(215,Math.floor(F)),Z=k-N,V=F-G,it=G*Pe+N,dt=it+Pe,Tt=ee.getY(it),$t=ee.getY(it+1),zt=ee.getY(dt),Nt=ee.getY(dt+1);return Z+V<=1?Tt+Z*($t-Tt)+V*(zt-Tt):Nt+(1-Z)*(zt-Nt)+(1-V)*($t-Nt)}function w(M){const I=ms+Wo+le*2;for(let k=0;k<ee.count;k++){const F=ee.getX(k),N=ee.getZ(k);if(Math.abs(F-M.x)>I||Math.abs(N-M.z)>I)continue;const G=we(F,N);ee.setY(k,G);const Z=ie.clone().lerp(Lt,Kn(-1.7,.05,G)).lerp(qt,Kn(.02,2,G));Z.multiplyScalar(.88+qo(F*2,N*2)*.18),Z.toArray(Yt,k*3)}ee.needsUpdate=!0,D.attributes.color.needsUpdate=!0,D.computeVertexNormals(),D.computeBoundingBox(),D.computeBoundingSphere(),J.terrainUpdates++}const Q=vl(s+9,!0);S.push(Q),W.mossRock.map=Q,W.compost.map=Q,W.darkFruit.map=Q;const at=new Ti(266*ge,266*ge,88,88),lt=new e_(at,{textureWidth:512,textureHeight:512,waterNormals:tt,sunDirection:new z(.6,.8,-.3),sunColor:16771517,waterColor:3039835,distortionScale:2.5,alpha:.91,fog:!0});lt.name="Reflecting creek",lt.rotation.x=-Math.PI/2,lt.position.y=Xi,lt.material.transparent=!0,lt.material.depthWrite=!1,lt.renderOrder=-2,lt.material.uniforms.size.value=4.8,l.add(lt);const ot=lt.onBeforeRender;let Ut=0;lt.onBeforeRender=function(M,I,k){if(lt.material.uniforms.eye.value.setFromMatrixPosition(k.matrixWorld),Ut++%2){J.reflectionSkips++;return}J.reflectionRenders++,ot.call(this,M,I,k)};const ct=at.attributes.position.array.slice(),St=[],Pt=new re,mt=[];Pt.name="Willow trunks and tangled roots",l.add(Pt);for(let M of[-1,1])for(let I=0;I<15;I++){const k=(-122+I*17+(a()-.5)*7)*ge,F=(M*(59+a()*15)+Math.sin(k/ge*.032)*15)*ge,{x:N,z:G}=r.toWorld(F,k),Z=we(N,G);if(Z<.2)continue;const V=new re;V.position.set(N,Z,G);const it=9+a()*14,dt=(a()-.5)*3,Tt=Ke([[0,-.8,0],[.25,it*.3,0],[dt,it*.72,.6],[dt*.8,it,1]],.68+a()*.65,W.bark,13,.72);Tt.castShadow=!0,V.add(Tt),St.push(Tt.geometry);for(let $t=0;$t<5;$t++){const zt=$t/5*ze+a(),Nt=3+a()*4,se=Ke([[0,.7,0],[Math.cos(zt)*Nt*.45,.1,Math.sin(zt)*Nt*.45],[Math.cos(zt)*Nt,-.4,Math.sin(zt)*Nt]],.15+a()*.2,W.bark,9,.82);se.castShadow=!0,V.add(se),St.push(se.geometry)}for(let $t=0;$t<4;$t++){const zt=a()*ze,Nt=it*(.5+a()*.3),se=3+a()*6,Re=Ke([[dt*.4,Nt,0],[Math.cos(zt)*se*.45,Nt+2,Math.sin(zt)*se*.45],[Math.cos(zt)*se,Nt+3,Math.sin(zt)*se]],.16+a()*.2,W.bark,10,.83);V.add(Re),St.push(Re.geometry);for(let Ce=0;Ce<70;Ce++){const me=Math.sqrt(a())*4,en=a()*ze;mt.push({x:N+Math.cos(zt)*se+Math.cos(en)*me,y:Z+Nt+3+(a()-.5)*3-Math.abs(me)*.25,z:G+Math.sin(zt)*se+Math.sin(en)*me,angle:a()*ze,scale:.65+a()*.6})}}Pt.add(V)}Jn(Pt,St);const Rt=new Te;Rt.setAttribute("position",new Wt([0,0,0,-.12,-.32,.035,0,-.38,.06,.12,-.32,.035,-.1,-.64,.02,0,-.76,.04,.1,-.64,.02,0,-1.05,0],3)),Rt.setAttribute("uv",new Wt([.5,0,0,.3,.5,.35,1,.3,0,.6,.5,.7,1,.6,.5,1],2)),Rt.setIndex([0,1,2,0,2,3,1,4,2,2,4,5,2,5,6,2,6,3,4,7,5,5,7,6]),Rt.computeVertexNormals(),Ac(Rt,"#69834d",.25,s);const Zt=Hr(Rt,W.plant,mt,"Hanging willow foliage");mt.forEach((M,I)=>{ft.position.set(M.x,M.y,M.z),ft.rotation.set((a()-.5)*.8,M.angle,(a()-.5)*.7),ft.scale.setScalar(M.scale),ft.updateMatrix(),Zt.setMatrixAt(I,ft.matrix)}),Zt.finish(),l.add(Zt.group),J.spatialChunks+=Zt.meshes.length;function Ot(M){C.push(M);const I=Math.floor((M.x-M.radius)/U),k=Math.floor((M.x+M.radius)/U),F=Math.floor((M.z-M.radius)/U),N=Math.floor((M.z+M.radius)/U);for(let G=I;G<=k;G++)for(let Z=F;Z<=N;Z++){const V=G+":"+Z;L.has(V)||L.set(V,[]),L.get(V).push(M)}return M}const wt=[],ue=[[],[],[]];function X(M,I,k=1.35+a()*.9){const F=Ot({id:"p"+C.length,type:"lily",x:M,z:I,y:.105,radius:k*.91,visualRadius:k,angle:a()*ze,phase:a()*ze});return wt.push(F),F}function _t(M,I,k=1.3+a()*1.3,F=.65+a()*.65){const N=Math.floor(a()*3),G=Ot({id:"p"+C.length,type:"rock",x:M,z:I,y:F*.76-.05,radius:k*.72,visualRadius:k,scaleY:F,angle:a()*ze,variant:N});return ue[N].push(G),G}const Et=r.toWorld(3.7,1),Ft=r.toWorld(-3.9,2.2);if(X(0,0,3.1),X(Et.x,Et.z,2.3),_t(Ft.x,Ft.z,2.5,.9),c){const M=u.find(I=>I.id==="pond").findPoint;X(M.x,M.z,1.7)}function gt(M,I){const k=Math.hypot(I.x-M.x,I.z-M.z),F=Math.ceil(k/3.65),N=r.toSource(M.x,M.z),G=r.toSource(I.x,I.z);for(let Z=1;Z<F;Z++){const V=Z/F,{x:it,z:dt}=r.toWorld(N.x+(G.x-N.x)*V+Math.sin(V*Math.PI*3)*1.25,N.z+(G.z-N.z)*V);if(we(it,dt)>-.1)continue;const Tt=r.toSource(it,dt);c&&Tt.x>14&&Tt.x<32&&Math.abs(Tt.z+16)<3.7||(a()<.18?_t(it,dt,1.8+a()*.7,.65+a()*.55):X(it,dt,1.65+a()*.65))}}const ut={id:"origin",x:0,z:0},Bt=new Map(ce.map(M=>[M.id,M]));Bt.set("origin",ut);const Oe=[["origin","home"],["origin","foxglove"],["home","mudfang"],["home","quietbend"],["mudfang","reedcrossing"],["reedcrossing","redreed"],["reedcrossing","thornback"],["foxglove","mossjaw"],["quietbend","mossjaw"],["quietbend","eastshallows"],["mossjaw","longreed"],["longreed","blackpool"],["longreed","oldwillow"],["eastshallows","blackpool"],["redreed","thornback"]].map(([M,I])=>({from:M,to:I,start:Bt.get(M),end:Bt.get(I)}));for(const M of Oe)gt(M.start,M.end);if(c){const M=I=>u.find(k=>k.id===I);for(const[I,k]of[[ut,M("creek")],[M("creek"),M("roots")],[M("roots"),M("bank")],[M("bank"),f]])gt(I,k)}for(let M=0;M<1180;M++){const I=(a()-.5)*218*ge,k=((a()-.5)*108+Math.sin(I/ge*.032)*10)*ge,{x:F,z:N}=r.toWorld(k,I);if(we(F,N)>-.18)continue;const G=r.toSource(F,N);c&&G.x>14&&G.x<32&&Math.abs(G.z+16)<3.7||(L.get(Math.floor(F/U)+":"+Math.floor(N/U))||[]).some(V=>Math.hypot(V.x-F,V.z-N)<V.radius+1)||(a()<.15?_t(F,N,1.1+a()*2.3,.55+a()*1.2):X(F,N,1.1+a()*1.1))}for(const M of ce)Ot({id:"island-"+M.id,type:"land",x:M.x,z:M.z,y:M.elevation,radius:M.radius*.8});const ve=Hr(Xt,W.leaf,wt,"Veined water lily leaves",{castShadow:!0,receiveShadow:!0,dynamic:!0});wt.forEach((M,I)=>{ft.position.set(M.x,M.y,M.z),ft.rotation.set((a()-.5)*.04,M.angle,(a()-.5)*.035),ft.scale.set(M.visualRadius,1,M.visualRadius*(.89+a()*.18)),ft.updateMatrix(),ve.setMatrixAt(I,ft.matrix),ve.setColorAt(I,ln(["#b6cf8a","#88ac67","#749d59","#c0cc7e","#729958"][Math.floor(a()*5)]))}),ve.finish(),l.add(ve.group),J.spatialChunks+=ve.meshes.length,ue.forEach((M,I)=>{const k=Hr(vt[I],I===1?W.mossRock:W.rock,M,"Weathered waterline outcrops",{castShadow:!0,receiveShadow:!0});M.forEach((F,N)=>{ft.position.set(F.x,-.05,F.z),ft.rotation.set(0,F.angle,0),ft.scale.set(F.visualRadius,F.scaleY,F.visualRadius),ft.updateMatrix(),k.setMatrixAt(N,ft.matrix),k.setColorAt(N,ln("#ffffff").multiplyScalar(.7+a()*.4))}),k.finish(),l.add(k.group),J.spatialChunks+=k.meshes.length});const An=new Te,Ln=[],Er=[],si=[];for(let M=0;M<=9;M++){const I=M/9,k=Math.sin(I*Math.PI)*.16;for(const F of[-1,1])Ln.push(F*k,.13*Math.sin(I*Math.PI)+.23*I*I,I*.65),Er.push(F*.5+.5,I)}for(let M=0;M<9;M++){const I=M*2;si.push(I,I+1,I+2,I+1,I+3,I+2)}An.setAttribute("position",new Wt(Ln,3)),An.setAttribute("uv",new Wt(Er,2)),An.setIndex(si),An.computeVertexNormals();const Tr=new Ve({color:"#f4e5d5",roughness:.48,side:Ue}),Ar=wt.filter((M,I)=>I%23===5),rs=new wn(An,Tr,Ar.length*13);let Ds=0;for(const M of Ar)for(let I=0;I<13;I++)ft.position.set(M.x+.24,M.y+.045,M.z),ft.rotation.set(I>7?.1:0,I/8*ze,I>7?.1:0),ft.scale.setScalar(I>7?.67:1),ft.updateMatrix(),rs.setMatrixAt(Ds++,ft.matrix);l.add(rs);const Ni=[];for(let M=0;M<26e3;M++){const I=(a()-.5)*254*ge,k=(a()-.5)*254*ge,F=we(I,k);F<-.52||F>3.2||ce.some(N=>Math.hypot(N.x-I,N.z-k)<N.radius*.68)||Math.hypot(I,k)<8||Ni.push({x:I,z:k,y:F,scale:.65+a()*2.2,angle:a()*ze})}const Is=Rc(44),ri=Hr(Is,W.plant,Ni,"Curved river reeds",{receiveShadow:!0});Ni.forEach((M,I)=>{ft.position.set(M.x,M.y,M.z),ft.rotation.set(0,M.angle,0),ft.scale.set(.65+M.scale*.25,M.scale,.65+M.scale*.25),ft.updateMatrix(),ri.setMatrixAt(I,ft.matrix),ri.setColorAt(I,ln("#ffffff").multiplyScalar(.75+a()*.5))}),ri.finish(),l.add(ri.group),J.spatialChunks+=ri.meshes.length;const zs=Ni.filter((M,I)=>M.y<.5&&I%5===0),Ca=I_(),ki=Hr(Ca,W.plant,zs,"Cattail patches");zs.forEach((M,I)=>{ft.position.set(M.x+.12,M.y,M.z),ft.rotation.set(0,M.angle,0),ft.scale.setScalar(.7+M.scale*.4),ft.updateMatrix(),ki.setMatrixAt(I,ft.matrix)}),ki.finish(),l.add(ki.group),J.spatialChunks+=ki.meshes.length;const ho={value:0};W.plant.onBeforeCompile=M=>{M.uniforms.uCreekTime=ho,M.vertexShader=`uniform float uCreekTime;
`+M.vertexShader,M.vertexShader=M.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 transformed.x += sin(uCreekTime * 1.1 + position.y * 2.3 + instanceMatrix[3].x * .13 + instanceMatrix[3].z * .17) * pow(max(position.y, 0.0), 1.6) * .035;`)},W.plant.customProgramCacheKey=()=>"creek-wind-1";function os(M,I){const k=c?g-.065:-.1;let F=P(M,I),N=F>k?"land":"water",G=null;F<=k&&(F=c?g-.215:-.25);const Z=L.get(Math.floor(M/U)+":"+Math.floor(I/U))||[];for(const V of Z){if(V.type==="land")continue;const it=Math.hypot(M-V.x,I-V.z);if(it<=V.radius){let dt=V.y;if(V.type==="rock"&&(dt-=Kn(V.radius*.62,V.radius,it)*.14*V.scaleY),c&&dt<=k)continue;dt>F&&(F=dt,N=V.type==="shelter"?"land":V.type,G=V)}}return y_(x,M,I)||{height:F,type:N,platform:G}}function Rr(M,I){return os(M,I).height}const Ls=[{x:4.5/ge,z:-4/ge,rich:!1},{x:-10,z:12,rich:!0},{x:15,z:-20,rich:!1},{x:-25,z:-23,rich:!0},{x:26,z:-47,rich:!0},{x:-17,z:40,rich:!0},{x:27,z:69,rich:!0},{x:-4,z:-81,rich:!0},{x:-34,z:86,rich:!0},{x:23,z:26,rich:!1},{x:-33,z:7,rich:!1},{x:4,z:51,rich:!1},{x:9,z:-59,rich:!1},{x:-12,z:76,rich:!1},{x:39,z:-4,rich:!1},{x:-42,z:-59,rich:!0},{x:7,z:-39,rich:!0},{x:0,z:63,rich:!0},{x:53,z:33,rich:!0},{x:-24,z:17,rich:!1},{x:17,z:-70,rich:!1},{x:18,z:90,rich:!0}].map(M=>({...M,...r.toWorld(M.x*ge,M.z*ge)}));if(c)for(const[M,I]of[{x:4.5,z:-4},{x:18,z:14},{x:9,z:-24},{x:26,z:10},{x:31,z:-16},{x:-20,z:-8}].entries())Object.assign(Ls[M],r.toWorld(I.x,I.z));const A=[],j=[],et=[],nt=new re;l.add(nt);for(let M=0;M<Ls.length;M++){const I=Ls[M];we(I.x,I.z)<-.15&&_t(I.x,I.z,I.rich?3.2:2.2,.62);const F=Rr(I.x,I.z),N={id:"flies-"+M,x:I.x,z:I.z,y:F+.25,flies:I.rich?240:100,maxFlies:I.rich?240:100,rich:I.rich};if(c){const Z=[...u].sort((V,it)=>Math.hypot(I.x-V.x,I.z-V.z)-Math.hypot(I.x-it.x,I.z-it.z))[0]?.id||"creek";N.ecology={habitat:Z,activity:1},N.regenMultiplier=1}T.push(N);const G=new Jt(vt[M%3],W.compost);G.position.set(I.x,F+.05,I.z),G.scale.set(I.rich?1.7:1.05,.28,I.rich?1.25:.75),G.rotation.y=a()*ze,l.add(G),j.push(G);for(let Z=0;Z<(I.rich?12:6);Z++){const V=a()*ze,it=a()*(I.rich?1.5:.85),dt=.12+a()*.16;A.push({spot:M,groundOffset:dt,x:I.x+Math.cos(V)*it,y:F+dt,z:I.z+Math.sin(V)*it,scale:.12+a()*.18,rot:a()*ze})}for(let Z=0;Z<3;Z++){const V=a()*ze,it=.7+a()*.8,dt=Ke([[0,0,0],[it*.5,.02,.06],[it,.04,.14]],.035,W.bark,4);dt.position.set(I.x+(a()-.5)*1.6,F+.1,I.z+(a()-.5)*1.6),dt.rotation.y=V,nt.add(dt),et.push(dt.geometry)}}Jn(nt,et);for(const M of Ls)if(we(M.x,M.z)<-.15){const I=ue.flat().find(k=>Math.abs(k.x-M.x)<.01&&Math.abs(k.z-M.z)<.01);if(I){const k=new Jt(vt[I.variant],W.mossRock);k.position.set(I.x,-.05,I.z),k.rotation.y=I.angle,k.scale.set(I.visualRadius,I.scaleY,I.visualRadius),k.castShadow=!0,k.receiveShadow=!0,l.add(k)}}const K=new wn(Me,W.fruit,A.length);A.forEach((M,I)=>{ft.position.set(M.x,M.y,M.z),ft.rotation.set(.3,M.rot,.2),ft.scale.setScalar(M.scale),ft.updateMatrix(),K.setMatrixAt(I,ft.matrix),K.setColorAt(I,ln(["#cb9d59","#6d7341","#aa7044","#c5ad62"][I%4]))}),l.add(K);const xt=[];for(let M=0;M<T.length;M++)for(let I=0;I<(T[M].rich?65:30);I++)xt.push({spot:M,phase:a()*ze,phase2:a()*ze,r:.25+a()*(T[M].rich?2.3:1.35),height:.45+a()*1.9,speed:.65+a()*1.7,rank:I});const It=T.map(()=>[]);for(const M of xt)It[M.spot].push(M);const Ht=new Ve({vertexColors:!0,roughness:.45,side:Ue}),Dt=new wn(L_(),Ht,xt.length);Dt.instanceMatrix.setUsage(Ei),Dt.frustumCulled=!1,Dt.name="Fly swarms",Dt.count=0,l.add(Dt);const jt=c?T_({group:l,layout:r,terrainHeight:P,surface:os,insertPlatform:Ot,materials:W,rockGeos:vt,tube:Ke,leafGeometry:qi,bladeGeometry:Rc,geography:h}):null;jt&&m.push(...jt.grips);function oe(M,I){return c&&os(M,I).type==="water"?E_(r,M,I,y.flow):{x:0,z:0,strength:0}}function Kt(M,I){return c&&d.some(k=>Math.hypot(M-k.x,I-k.z)<k.radius*.85)&&P(M,I)>g-.5}function be(M){g=M,lt.position.y=M,lt.updateMatrix(),rs.position.y=M-Xi,rs.updateMatrix();for(const I of wt)I.y=.105+M-Xi}function Ne(M={}){if(!c)return!1;y={...y,...M.phase||{}},p=Xi+Yi(Number(y.waterOffset)||0,-.75,.65),_||(be(p),_=!0);for(const k of T){const F=k.ecology?.habitat===y.foodShift?1.4:typeof y.foodShift=="string"?.45:1;k.regenMultiplier=F,k.ecology.activity=F}const I=M.nest;if(I&&Number.isFinite(I.x)&&Number.isFinite(I.z)){const k={id:"living-creek-nest",x:I.x,z:I.z,team:"ally",natural:!0,nestLevel:I.level??0,safe:I.safe,hp:1,maxHp:1};v?za(v,k):v=fo(k)}return jt.sync(M,g),!0}const Be=64,ke=new Ti(2,2),Ee=new gm;ke.rotateX(-Math.PI/2),Ee.index=ke.index,Ee.attributes.position=ke.attributes.position,Ee.attributes.uv=ke.attributes.uv;const Qt=new Float32Array(Be*3),Xe=new Float32Array(Be).fill(-100),Ae=new Float32Array(Be),yn=new Float32Array(Be*3);Ee.setAttribute("aCenter",new or(Qt,3)),Ee.setAttribute("aStart",new or(Xe,1)),Ee.setAttribute("aSize",new or(Ae,1)),Ee.setAttribute("aTint",new or(yn,3)),Ee.instanceCount=Be;const mi=new Wn({transparent:!0,depthWrite:!1,side:Ue,uniforms:{uTime:{value:0}},vertexShader:"attribute vec3 aCenter; attribute float aStart; attribute float aSize; attribute vec3 aTint; uniform float uTime; varying vec2 vUv; varying float vLife; varying vec3 vTint; void main(){vUv=uv; vLife=(uTime-aStart)/2.4; vTint=aTint; vec3 p=position*aSize*(.35+clamp(vLife,0.,1.)*3.8)+aCenter; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}",fragmentShader:"varying vec2 vUv;varying float vLife;varying vec3 vTint;void main(){if(vLife<0.||vLife>1.)discard;float r=length(vUv-.5)*2.;float band=exp(-pow((r-.82)/(.026+vLife*.018),2.))* .58+exp(-pow((r-.64)/.026,2.))*.22;float a=band*pow(1.-vLife,1.6);gl_FragColor=vec4(vTint,a);}"}),gn=new Jt(Ee,mi);gn.frustumCulled=!1,gn.renderOrder=2,l.add(gn);let as=0,qe=0;const tn=1100,on=new Float32Array(tn*3),dn=new Float32Array(tn*3),xn=new Float32Array(tn),Fi=new Float32Array(tn),oi=Array.from({length:tn},()=>({life:0,max:1,vx:0,vy:0,vz:0,water:!0}));let Gd=0;const gi=new Te;gi.setAttribute("position",new cn(on,3).setUsage(Ei)),gi.setAttribute("aColor",new cn(dn,3).setUsage(Ei)),gi.setAttribute("aSize",new cn(xn,1).setUsage(Ei)),gi.setAttribute("aAlpha",new cn(Fi,1).setUsage(Ei));const Vd=new Wn({transparent:!0,depthWrite:!1,uniforms:{uScale:{value:500}},vertexShader:"attribute vec3 aColor;attribute float aSize;attribute float aAlpha;uniform float uScale;varying vec3 vColor;varying float vAlpha;void main(){vColor=aColor;vAlpha=aAlpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*uScale/max(.1,-mv.z),1.,35.);}",fragmentShader:"varying vec3 vColor;varying float vAlpha;void main(){vec2 p=gl_PointCoord-.5;float d=length(p)*2.;if(d>1.)discard;float shade=.6+.4*max(0.,1.-length(p-vec2(-.12,.12))*2.);gl_FragColor=vec4(vColor*shade,smoothstep(1.,.55,d)*vAlpha);}"}),Pa=new $p(gi,Vd);Pa.frustumCulled=!1,Pa.renderOrder=3,l.add(Pa);function Wd(M,I,k){const F=as++%Be;Qt.set([M.x,c?(M.y??g)+.025:Math.max(-.005,(M.y??0)+.025),M.z],F*3),Xe[F]=qe,Ae[F]=.7+I*.7,ln(k??"#c2e1d5").toArray(yn,F*3);for(const G of["aCenter","aStart","aSize","aTint"])Ee.attributes[G].needsUpdate=!0}function hh(M,I,k,F){const N=Math.min(90,Math.round(18+I*21)),G=ln(k??(F?"#b2d7ce":"#d5bc80"));for(let Z=0;Z<N;Z++){const V=Gd++%tn,it=oi[V],dt=a()*ze,Tt=(.6+a()*2.7)*Math.sqrt(I);it.life=it.max=.5+a()*.8,it.vx=Math.cos(dt)*Tt,it.vz=Math.sin(dt)*Tt,it.vy=(1.5+a()*4)*Math.sqrt(I),it.water=F,on.set([M.x+(a()-.5)*.3,(M.y??0)+.12,M.z+(a()-.5)*.3],V*3),G.clone().multiplyScalar(.85+a()*.3).toArray(dn,V*3),xn[V]=(.045+a()*.085)*(F?1:.8),Fi[V]=.9}gi.attributes.aColor.needsUpdate=!0,gi.attributes.aSize.needsUpdate=!0}function Xd(M,I=1,k){I=Yi(I,.1,4),Wd({x:M.x,y:c?g+.01:.01,z:M.z},I,k),hh({x:M.x,y:c?g+.03:.03,z:M.z},I,k,!0)}function qd(M,I="#e9cb87",k=1){hh(M,k,I,!1)}function uh(M,I,k,F=1){const N=[],G=[],Z=[],V=[],it=Pi(F),dt=16,Tt=20;for(let zt=0;zt<=dt;zt++)for(let Nt=0;Nt<=Tt;Nt++){const se=Nt/Tt*2-1,Re=zt/dt,Ce=.5+Math.sqrt(Math.max(0,1-se*se))*k+.06*Math.sin(Re*23+se*5),me=se*M*(.97+.025*Math.sin(Re*19));N.push(me,Ce,(Re-.5)*I),G.push(Nt/Tt,zt/dt),ln("#809549").multiplyScalar(.85+it()*.23).toArray(V,V.length)}for(let zt=0;zt<dt;zt++)for(let Nt=0;Nt<Tt;Nt++){const se=zt*(Tt+1)+Nt,Re=se+Tt+1;Z.push(se,Re,se+1,Re,Re+1,se+1)}const $t=new Te;return $t.setAttribute("position",new Wt(N,3)),$t.setAttribute("uv",new Wt(G,2)),$t.setAttribute("color",new Wt(V,3)),$t.setIndex(Z),$t.computeVertexNormals(),$t}function Da(M,I,k){const F=new re,N=new Ve({color:"#a6bf76",map:O,vertexColors:!0,roughness:.78,side:Ue});k.push(N);const G=uh(1.75,3.8,1.95,s+Math.round(M*7));k.push(G);const Z=new Jt(G,N);Z.castShadow=!0,Z.receiveShadow=!0,F.add(Z);for(let V=0;V<8;V++){const it=-1.85+V*.53,dt=[];for(let $t=0;$t<=12;$t++){const zt=$t/12*Math.PI;dt.push([Math.cos(zt)*1.75,.5+Math.sin(zt)*1.96+.025,it+.025*Math.sin(zt*4)])}const Tt=Ke(dt,.038,W.reed,18);k.push(Tt.geometry),F.add(Tt)}for(let V of[-1,1])for(let it=0;it<5;it++){const dt=-1.6+it*.8,Tt=Ke([[V*1.68,-.08,dt],[V*1.7,.45,dt],[V*1.38,1.5,dt]],.052,W.bark,5);k.push(Tt.geometry),F.add(Tt)}for(let V=0;V<7;V++){const it=.16+V*.12,dt=Ke([[-1.65,it,-1.8],[0,it+.025,-1.88],[1.65,it,-1.8]],.036,W.reed,8);k.push(dt.geometry),F.add(dt)}return Jn(F,k,new Set([Z])),F.scale.setScalar(M),F.userData.roof=Z,F}const Cr={player:"#8ecf75",friendly:"#8ecf75",ally:"#8ecf75",enemy:"#cf7554",neutral:"#ceb785"};function Us(M){if(typeof M=="string"&&M.startsWith("enemy")){const I=["#e8aa70","#d8786b","#b9ad81","#a9a0d4","#8dc2b8"],k=parseInt(M.replace(/\D/g,""),10)||0;return I[k%I.length]}return Cr[M]||Cr.neutral}const Ia=new Map;function uo(M){if(Ia.has(M))return Ia.get(M);const I=["player","ally","friendly"].includes(M),k=M==="neutral",F=(parseInt(String(M).replace(/\D/g,""),10)||0)%5,N=sh(256,(G,Z)=>{G.fillStyle="#eee9cb",G.fillRect(0,0,Z,Z);for(let it=0;it<256;it+=4)G.fillStyle=it%8?"#ded9bd":"#f3eed3",G.fillRect(it,0,1,Z),G.fillRect(0,it,Z,1);G.save(),G.translate(38,23),G.scale(2.8,2.8),G.fillStyle=I?"#194333":k?"#494633":"#472c29",G.strokeStyle="#fff2c9",G.lineWidth=2,G.beginPath(),G.moveTo(32,3),G.lineTo(59,14),G.lineTo(56,44),G.quadraticCurveTo(53,55,32,68),G.quadraticCurveTo(11,55,8,44),G.lineTo(5,14),G.closePath(),G.fill(),G.stroke(),G.lineWidth=3.2,G.lineCap="round",G.lineJoin="round";const V=it=>{G.beginPath(),it.forEach((dt,Tt)=>Tt?G.lineTo(...dt):G.moveTo(...dt)),G.stroke()};if(I)G.beginPath(),G.moveTo(43,20),G.bezierCurveTo(28,17,18,26,21,38),G.bezierCurveTo(24,48,35,47,40,37),G.bezierCurveTo(43,30,40,24,43,20),G.stroke(),V([[20,51],[37,27]]),V([[28,40],[23,32]]),V([[32,35],[39,34]]);else if(k)V([[24,27],[32,19],[40,27]]),V([[32,19],[32,49]]),V([[23,40],[32,49],[41,40]]);else if(F===0)V([[20,19],[27,31],[22,44]]),V([[44,19],[37,31],[42,44]]),V([[28,46],[36,46]]);else if(F===1)V([[22,18],[18,36],[32,49],[46,36],[42,18]]),V([[25,30],[32,36],[39,30]]);else if(F===2)for(const[it,dt]of[[21,20],[32,15],[43,20]])V([[it,dt],[it,49]]),V([[it-4,dt+6],[it+4,dt+6]]);else F===3?(G.beginPath(),G.moveTo(44,17),G.bezierCurveTo(15,9,11,48,32,52),G.bezierCurveTo(39,53,44,50,47,45),G.bezierCurveTo(29,43,26,26,44,17),G.stroke()):V([[18,24],[25,30],[32,17],[39,30],[46,24],[41,46],[23,46],[18,24]]);G.restore()});return N.wrapS=N.wrapT=ji,Ia.set(M,N),S.push(N),N}function $d(M,I,k=0){const F=new re;F.name="Woven reed courtyard and rooted foundations";const N=5.68;for(let G=0;G<43;G++){const Z=-5.58+G*.266,V=Math.sqrt(Math.max(0,N*N-Z*Z))*(.97+.02*Math.sin(G*1.7)),it=Ke([[-V,-.045,Z],[-V*.25,-.035,Z+.022],[V*.4,-.04,Z-.018],[V,-.045,Z+.015]],.077,W.bark,7);it.receiveShadow=!0,I.push(it.geometry),F.add(it)}for(let G=0;G<25;G++){const Z=-5.4+G*.45,V=Math.sqrt(Math.max(0,N*N-Z*Z))*.98,it=Ke([[Z,.018,-V],[Z+.025,.028,0],[Z-.018,.02,V]],.027,W.reed,10);I.push(it.geometry),F.add(it)}for(let G=0;G<16;G++){const Z=G/16*ze,V=Math.cos(Z)*5.1,it=Math.sin(Z)*5.1,dt=(P(M.position.x+(V*Math.cos(k)+it*Math.sin(k))*ne,M.position.z+(it*Math.cos(k)-V*Math.sin(k))*ne)-M.position.y)/ne,Tt=Ke([[V,Math.min(-.18,dt-.15),it],[V+.03,-.35,it-.02],[V,-.08,it]],.095,W.bark,5);I.push(Tt.geometry),F.add(Tt)}Jn(F,I),M.add(F),M.userData.foundation=F}function Yd(M,I){const k=new re,F=Ke([[0,0,0],[.04,1.6,0],[-.03,3.1,.02]],.047,W.bark,7);I.push(F.geometry),k.add(F);const N=new Te,G=[0,2.93,0,.9,2.8,.09,1.13,2.12,.02,.6,2.25,-.03,0,2.18,0],Z=[0,1,1,1,1,0,.5,.1,0,0];N.setAttribute("position",new Wt(G,3)),N.setAttribute("uv",new Wt(Z,2)),N.setIndex([0,1,3,1,2,3,0,3,4]),N.computeVertexNormals();const V=new Ve({color:Us(M),roughness:.8,side:Ue,map:uo(M)}),it=new Jt(N,V);return it.castShadow=!0,k.add(it),k.userData.flag=it,k.userData.emblemTeam=M,I.push(N,V),k}function Zd(M,I,k){const F=l_,N=c_,G=fa,Z=.11,V=new re;V.name="Enclosed creek castle",M.add(V);const it=new re;it.name="Reinforced castle perimeter",M.add(it);const dt=Math.asin((N/2+.25)/F),Tt=44,$t=(ze-dt*2)/Tt,zt=[],Nt=[],se=2*(F+.65)*Math.tan($t/2)+.08;for(let st=0;st<Tt;st++){const bt=dt+$t*(st+.5),ae=Math.sin(bt)*F,je=Math.cos(bt)*F;zt.push({x:ae,z:je,y:Z+G/2,w:se,h:G,d:h_,ry:bt});for(const He of[-.29,.29]){const pe=bt+$t*He;zt.push({x:Math.sin(pe)*F,z:Math.cos(pe)*F,y:Z+G+.37,w:.76,h:.74,d:1.2,ry:pe})}Nt.push({x:Math.sin(bt)*(F+.64),z:Math.cos(bt)*(F+.64),y:Z+1.65,w:se*.7,h:3.1,d:.5,ry:bt}),Nt.push({x:Math.sin(bt)*(F+.4),z:Math.cos(bt)*(F+.4),y:Z+3.5,w:se*1.01,h:.28,d:.9,ry:bt})}const Re=[Math.PI/4,Math.PI*3/4,Math.PI*5/4,Math.PI*7/4],Ce=[];for(const st of Re){const bt=Math.sin(st)*(F+.15),ae=Math.cos(st)*(F+.15);Ce.push({x:bt,z:ae});for(let je=0;je<10;je++){const He=je/10*ze;zt.push({x:bt+Math.sin(He)*1.42,z:ae+Math.cos(He)*1.42,y:Z+6.15,w:.6,h:.85,d:.66,ry:He})}}for(const st of[-1,1])zt.push({x:st*(N/2+.62),z:F,y:Z+2.8,w:1.24,h:5.6,d:2}),zt.push({x:st*(N/2+.62),z:F,y:Z+5.95,w:1.6,h:.7,d:2.35}),Nt.push({x:st*(N/2+.62),z:F+1.05,y:Z+2.4,w:1.32,h:4.8,d:.25});zt.push({x:0,z:F,y:Z+4.85,w:N+1.2,h:.78,d:1.75});const me=(st,bt,ae,je)=>{const He=new zi(1,1,1),pe=new wn(He,je,ae.length);return k.push(He),pe.name=bt,pe.castShadow=!0,pe.receiveShadow=!0,ae.forEach((nn,lf)=>{ft.position.set((nn.x||0)/ne,(nn.y||0)/ne,(nn.z||0)/ne),ft.rotation.set(nn.rx||0,nn.ry||0,nn.rz||0),ft.scale.set(nn.w/ne,nn.h/ne,nn.d/ne),ft.updateMatrix(),pe.setMatrixAt(lf,ft.matrix)}),st.add(pe),pe},en=me(V,"Continuous moss-stone walls and crenellations",zt,W.mossRock);en.userData.fullCount=zt.length,en.userData.firstCoursesCount=Tt*3,me(it,"Whole-ring stone buttresses and gate reinforcement",Nt,W.rock);const Je=new As(1,1.12,1,12,1),an=new wn(Je,W.mossRock,4);k.push(Je),an.name="Four castle defence towers",an.castShadow=!0,an.receiveShadow=!0,Ce.forEach((st,bt)=>{ft.position.set(st.x/ne,(Z+2.9)/ne,st.z/ne),ft.rotation.set(0,Re[bt],0),ft.scale.set(1.65/ne,5.8/ne,1.65/ne),ft.updateMatrix(),an.setMatrixAt(bt,ft.matrix)}),V.add(an);const vn=qi(1,1,.28),Mn=new wn(vn,W.leaf,4);k.push(vn),Mn.name="Folded leaf tower roofs",Mn.castShadow=!0,Ce.forEach((st,bt)=>{ft.position.set(st.x/ne,(Z+6.68)/ne,st.z/ne),ft.rotation.set(0,Re[bt],0),ft.scale.set(2/ne,2.4/ne,2/ne),ft.updateMatrix(),Mn.setMatrixAt(bt,ft.matrix)}),V.add(Mn);const $n=new re;$n.name="Working south castle gate",$n.position.set(0,Z/ne,F/ne),V.add($n);const Ns=[];for(const st of[-1,1]){const bt=new re;bt.position.x=st*N/(2*ne),bt.name=st<0?"Left hinged gate":"Right hinged gate",$n.add(bt);const ae=[],je=[],He=N/2;for(let pe=0;pe<7;pe++)ae.push({x:-st*((pe+.5)*He/7),y:G/2,z:0,w:He/7+.025,h:G-.08,d:.36});for(const pe of[.65,1.9,3.2])je.push({x:-st*He/2,y:pe,z:.23,w:He-.1,h:.22,d:.2});me(bt,"Bound timber gate leaf",ae,W.bark),me(bt,"Gate cross braces",je,W.reed),Ns.push(bt)}const ls=new re;ls.name="Breached gate fallen slabs",$n.add(ls),me(ls,"Broken gate timber",[{x:-1.45,y:.18,z:1.5,w:2.8,h:.3,d:3.5,ry:.18},{x:1.6,y:.23,z:.9,w:2.7,h:.35,d:3.2,ry:-.24}],W.bark);const Dr=new Ti(1.7/ne,1.9/ne),Ir=new Ve({map:uo(I.team),color:Us(I.team),side:Ue,roughness:.85});k.push(Dr,Ir);const ks=new Jt(Dr,Ir);return ks.name="Castle gate clan crest",ks.position.set(0,(Z+5.2)/ne,(F+1.02)/ne),V.add(ks),M.userData.fortification=V,M.userData.palisade=it,M.userData.gate=$n,M.userData.gateLeaves=Ns,M.userData.fallenGate=ls,M.userData.gateCrest=ks,M.userData.fortWalls=en,M.userData.fortTowers=an,M.userData.fortTowerRoofs=Mn,M.userData.fortificationGeometry={radius:F,gateWidth:N,wallHeight:G,gateDirection:{x:0,z:1},towerCount:4},V}function jd(M){const I=Da(1,Cr.ally,M);I.name="Stone keep beneath woven leaf roof",I.userData.groundWalls=[];const k=new re;k.name="Enclosed central keep";const F=(N,G,Z,V,it,dt,Tt=W.mossRock)=>{const $t=new zi(V,it,dt),zt=new Jt($t,Tt);M.push($t),zt.position.set(N,G,Z),zt.castShadow=!0,zt.receiveShadow=!0,k.add(zt),G-it/2<.03&&I.userData.groundWalls.push({minX:N-V/2,maxX:N+V/2,minZ:Z-dt/2,maxZ:Z+dt/2,height:G+it/2})};F(-1.6,.68,0,.26,1.36,3.45),F(1.6,.68,0,.26,1.36,3.45),F(0,.68,-1.65,3.05,1.36,.25);for(const N of[-1,1])F(N*1.14,.68,1.64,.9,1.36,.26);F(0,1.22,1.64,1.45,.28,.27);for(const N of[-1.23,1.23])for(const G of[-1.34,1.34]){F(N,1.36,G,.58,2.72,.58);for(const Z of[-.2,.2])for(const V of[-.2,.2])F(N+Z,2.83,G+V,.19,.3,.19,W.rock)}return Jn(k,M),I.add(k),I}function dh(M){const I=ms+Wo+3,k=N=>Math.hypot(N.x-M.x,N.z-M.z)<I,F=N=>[...R.values()].some(G=>Math.hypot(N.x-G.x,N.z-G.z)<ms-2);Ni.forEach((N,G)=>{k(N)&&(ft.position.set(N.x,P(N.x,N.z),N.z),ft.rotation.set(0,N.angle,0),ft.scale.set(.65+N.scale*.25,N.scale,.65+N.scale*.25),F(N)&&ft.scale.setScalar(0),ft.updateMatrix(),ri.setMatrixAt(G,ft.matrix))}),ri.finish(),zs.forEach((N,G)=>{k(N)&&(ft.position.set(N.x+.12,P(N.x,N.z),N.z),ft.rotation.set(0,N.angle,0),ft.scale.setScalar(F(N)?0:.7+N.scale*.4),ft.updateMatrix(),ki.setMatrixAt(G,ft.matrix))}),ki.finish(),T.forEach((N,G)=>{k(N)&&(N.y=os(N.x,N.z).height+.25,j[G].position.y=N.y-.2,j[G].updateMatrix())}),A.forEach((N,G)=>{k(N)&&(ft.position.set(N.x,T[N.spot].y-.25+N.groundOffset,N.z),ft.rotation.set(.3,N.rot,.2),ft.scale.setScalar(N.scale),ft.updateMatrix(),K.setMatrixAt(G,ft.matrix))}),K.instanceMatrix.needsUpdate=!0,K.computeBoundingBox(),K.computeBoundingSphere()}function fh(M,I){for(const N of R.values())if(Math.hypot(N.x-M,N.z-I)<.01)return N.elevation;const k=ce.find(N=>Math.hypot(N.x-M,N.z-I)<.01);let F=k?Math.fround(k.elevation):Math.max(.35,Rr(M,I));if(!k){const N=ms+le,G=Math.max(0,Math.floor((M-N+Mt)/le)),Z=Math.min(216,Math.ceil((M+N+Mt)/le)),V=Math.max(0,Math.floor((I-N+Mt)/le)),it=Math.min(216,Math.ceil((I+N+Mt)/le));for(let dt=V;dt<=it;dt++)for(let Tt=G;Tt<=Z;Tt++){const $t=dt*Pe+Tt;Math.hypot(ee.getX($t)-M,ee.getZ($t)-I)<=N&&(F=Math.max(F,ee.getY($t)))}}return F}function Kd(M){const I=fh(M.x,M.z),k={id:M.id,x:M.x,z:M.z,elevation:I};return R.set(M.id,k),w(k),dh(k),k}function fo(M,I={}){if((c||M.natural===!0)&&!I.preview){const st=R_(M,{terrainHeight:P,materials:W,rockGeos:vt,tube:Ke,leafGeometry:qi,mergeStaticParts:Jn,teamColor:Us});return l.add(st),E.add(st),x.push(st.userData.refuge),st}const k=!!I.preview,F=k?null:Kd(M),N=new re;N.name="Shelter "+(M.id??""),N.position.set(M.x,F?.elevation??0,M.z),N.scale.setScalar(ne),N.userData.id=M.id,N.userData.radius=Ms,N.userData.owned=[],N.userData.terrain=F;const G=N.userData.owned;$d(N,G,Number.isFinite(M.yaw)?M.yaw:0),k||(N.userData.support=Ot({id:"shelter-"+M.id,type:"shelter",x:M.x,z:M.z,y:N.position.y+.11,radius:Ms-.2}),N.userData.landmark=Ot({id:"castle-land-"+M.id,type:"land",x:M.x,z:M.z,y:N.position.y,radius:ms+Wo*.45})),Zd(N,M,G);const Z=jd(G);Z.position.set(-.55,.04,-.5),N.add(Z),N.userData.core=Z,N.userData.keepCollision={rects:Z.userData.groundWalls.map(st=>({minX:(st.minX+Z.position.x)*ne,maxX:(st.maxX+Z.position.x)*ne,minZ:(st.minZ+Z.position.z)*ne,maxZ:(st.maxZ+Z.position.z)*ne,height:(st.height+Z.position.y)*ne})),door:{x:Z.position.x*ne,z:(Z.position.z+1.64)*ne}};const V=Yd(M.team,G);V.position.set(1.8,0,1.1),N.add(V),N.userData.banner=V;const it=new re;it.name="Additional sleeping leaves";const dt=Da(.62,Cr[M.team],G);dt.position.set(-3,.01,.2),dt.rotation.y=-.5,it.add(dt),N.add(it),N.userData.extra=it;const Tt=new re;Tt.name="Hatchery";const $t=Da(.52,Cr[M.team],G);$t.position.set(3.05,0,-1.8),$t.rotation.y=.7,Tt.add($t);for(let st=0;st<5;st++){const bt=[];for(let je=0;je<=24;je++){const He=je/24*ze;bt.push([3.05+Math.cos(He)*.74,.06+st*.065,-1.7+Math.sin(He)*.63])}const ae=Ke(bt,.035,W.reed,25);G.push(ae.geometry),Tt.add(ae)}Jn(Tt,G),N.add(Tt),N.userData.nursery=Tt;const zt=new re;zt.name="Leaf training yard and woven sparring dummies",zt.position.set(-2.9,.07,-3.2);for(let st=0;st<3;st++){const bt=-.82+st*.8,ae=st%2?-.2:.2,je=new Jt(qi(.46,.65,.04),W.leaf);je.position.set(bt,.025,ae+.6),je.rotation.y=(st-1)*.35,G.push(je.geometry),zt.add(je);for(const pe of[-.21,.21]){const nn=Ke([[bt+pe,-.02,ae-.25],[bt+pe*.3,.48,ae-.3],[bt,.96,ae-.25]],.035,W.bark,5);G.push(nn.geometry),zt.add(nn)}const He=Ke([[bt-.4,.64,ae-.2],[bt,.72,ae-.28],[bt+.4,.64,ae-.2]],.041,W.reed,6);G.push(He.geometry),zt.add(He);for(let pe=0;pe<3;pe++){const nn=new Jt(qi(.23,.37,.15),W.leaf);nn.position.set(bt+(pe-1)*.06,.59,ae-.19),nn.rotation.set(Math.PI/2,(pe-1)*.25,(pe-1)*.3),G.push(nn.geometry),zt.add(nn)}for(const pe of[-.12,.12]){const nn=Ke([[bt+pe,.89,ae-.22],[bt+pe*1.45,1.09,ae-.22],[bt+pe*.5,1.07,ae-.19],[bt+pe,.89,ae-.22]],.025,W.reed,10);G.push(nn.geometry),zt.add(nn)}}for(const st of[-1.2,1.2]){const bt=Ke([[st,-.04,-.65],[st*.98,.75,-.68],[st,.98,-.65]],.04,W.bark,5);G.push(bt.geometry),zt.add(bt)}for(let st=0;st<2;st++){const bt=Ke([[-1.2,.45+st*.28,-.65],[0,.38+st*.28,-.7],[1.2,.45+st*.28,-.65]],.025,W.reed,10);G.push(bt.geometry),zt.add(bt)}Jn(zt,G),N.add(zt),N.userData.training=zt,N.userData.trainingPoint=new z(M.x-2.9*ne,N.position.y+.12,M.z-2.5*ne);const Nt=new re;Nt.name="Leaf-wrapped food cache",Nt.position.set(-2.8,.04,2.2);const se=new wn(Me,W.fruit,15);for(let st=0;st<15;st++)ft.position.set(st%4*.32-.5,Math.floor(st/8)*.25+.15,Math.floor(st/4)%2*.35),ft.scale.setScalar(.22+st%3*.025),ft.rotation.set(st*.7,st*.4,0),ft.updateMatrix(),se.setMatrixAt(st,ft.matrix),se.setColorAt(st,ln(st%3?"#b7b06c":"#6d673f"));Nt.add(se);for(let st=0;st<3;st++){const bt=Ke([[-.85,.05,-.3+st*.45],[0,.02,-.3+st*.45],[.85,.08,-.3+st*.45]],.075,W.bark,5);G.push(bt.geometry),Nt.add(bt)}const Re=new Jt(qi(1,.8,.23),W.leaf);Re.position.set(0,.5,.1),Re.rotation.z=.17,G.push(Re.geometry),Nt.add(Re),Jn(Nt,G),N.add(Nt),N.userData.storage=Nt,N.userData.foodMesh=se,N.userData.storageCover=Re;const Ce=new re;Ce.name="Lookout perch",Ce.position.set(3.1,0,2.5);for(let st=0;st<3;st++){const bt=st/3*ze,ae=Ke([[Math.cos(bt)*.7,-.1,Math.sin(bt)*.7],[Math.cos(bt)*.44,1.4,Math.sin(bt)*.44],[Math.cos(bt)*.35,2.65,Math.sin(bt)*.35]],.085,W.bark,7);G.push(ae.geometry),Ce.add(ae)}for(let st=0;st<8;st++){const bt=-.6+st*.17,ae=Ke([[-.7,2.35,bt],[0,2.32,bt],[.7,2.36,bt]],.06,W.reed,4);G.push(ae.geometry),Ce.add(ae)}const me=new Jt(qi(1.1,.9,.08),W.leaf);me.position.y=3.15,me.rotation.x=.17,G.push(me.geometry),Ce.add(me);for(let st=0;st<6;st++){const bt=Ke([[-.25,st*.34,.63],[.25,st*.34,.63]],.035,W.reed,2);G.push(bt.geometry),Ce.add(bt)}Jn(Ce,G),N.add(Ce),N.userData.watchtower=Ce;const en=new wn(vt[1],W.mossRock,25);for(let st=0;st<25;st++){const bt=st/25*ze;ft.position.set(Math.cos(bt)*2.15,-.12,Math.sin(bt)*2.35-.5),ft.rotation.set(0,bt,0),ft.scale.set(.25,.25,.25),ft.updateMatrix(),en.setMatrixAt(st,ft.matrix)}N.add(en);const Je=new re;Je.name="Collapsed shelter remains";const an=new Ve({color:"#839061",map:O,roughness:.94,side:Ue});G.push(an);for(let st=0;st<6;st++){const bt=uh(.62+st%3*.16,1.35+st%2*.55,.14+st%3*.05,s+st*19),ae=new Jt(bt,an);ae.position.set(-1.3+st%3*.85,-.46+st%2*.04,-1.5+Math.floor(st/3)*1.7),ae.rotation.set((st%2-.5)*.24,st*1.71,(st%3-1)*.13),ae.castShadow=!0,G.push(bt),Je.add(ae)}for(let st=0;st<22;st++){const bt=st*2.399,ae=.65+st%5*.27,je=Math.cos(bt)*(st<14?1.2:3.4),He=Math.sin(bt)*(st<14?1.6:2.8)-.3,pe=Ke([[je,.055,He],[je+Math.cos(bt+.7)*ae*.6,.11+st%3*.07,He+Math.sin(bt+.7)*ae*.6],[je+Math.cos(bt+.7)*ae,.04+st%4*.06,He+Math.sin(bt+.7)*ae]],st%2?.045:.065,st%2?W.reed:W.bark,4);pe.castShadow=!0,G.push(pe.geometry),Je.add(pe)}Jn(Je,G),N.add(Je),N.userData.ruin=Je;const vn=new wn(Me,W.fruit,8);vn.name="Supplies exposed in the ruins";for(let st=0;st<8;st++)ft.position.set(-.5+st%4*.29,.12+Math.floor(st/4)*.08,1.35+Math.floor(st/4)*.31),ft.rotation.set(st*.43,st*1.31,.2),ft.scale.setScalar(.16+st%3*.025),ft.updateMatrix(),vn.setMatrixAt(st,ft.matrix),vn.setColorAt(st,ln(st%2?"#a99958":"#d9a253"));N.add(vn),N.userData.looseLoot=vn;const Mn=new Ve({color:"#edc371",emissive:"#e5a64c",emissiveIntensity:.7,roughness:.7});G.push(Mn);const $n=new Jt(Me,Mn);$n.position.set(1.7,.55,1.1),$n.scale.set(.15,.22,.15),N.add($n),N.userData.lamp=$n;const Ns=new fm("#ffd098",1.8,25,2);Ns.position.set(0,2.3,1.8),N.add(Ns),N.userData.light=Ns,N.updateMatrixWorld(!0),N.userData.buildingGroups={},N.userData.defaultPlacements={};for(const[st,bt]of Object.entries({store:"storage",nursery:"nursery",watchtower:"watchtower",training:"training"})){const ae=N.userData[bt],je=new ii().setFromObject(ae),He=N.worldToLocal(je.getCenter(new z)),pe=new re;pe.name=ae.name+" placement",pe.position.set(He.x,ae.position.y,He.z),N.add(pe),ae.position.sub(pe.position),pe.add(ae),N.userData[bt]=pe,N.userData.buildingGroups[st]=pe,N.userData.defaultPlacements[st]={x:He.x*ne,z:He.z*ne,yaw:0}}N.updateMatrixWorld(!0);const ls=new ii().setFromObject(Z),Dr=N.worldToLocal(ls.getCenter(new z)),Ir=ls.getSize(new z);N.userData.coreFootprint={x:Dr.x*ne,z:Dr.z*ne,width:Ir.x,depth:Ir.z},k||(l.add(N),E.add(N)),za(N,M);const ks=new Set([N.userData.core.userData.roof,N.userData.storageCover,N.userData.banner.userData.flag]);return N.traverse(st=>{st.isMesh&&!ks.has(st)&&(st.updateMatrix(),st.matrixAutoUpdate=!1)}),N}function za(M,I={}){if(!M)return;if(M.userData.natural)return Dd(M,I,Us);const k=M.userData.visualState||{},F={...k,...I},N=Math.max(1,F.tier??1),G=F.buildings||{},Z=Yi((F.hp??F.maxHp??100)/(F.maxHp??100),0,1),V=!!F.destroyed||Z<=0,it=F.team??k.team??"neutral",dt={};for(const[Ce,me]of Object.entries(F.buildingPlacements||{}))M.userData.buildingGroups[Ce]&&me&&Number.isFinite(me.x)&&Number.isFinite(me.z)&&Number.isFinite(me.yaw??0)&&(dt[Ce]={x:me.x,z:me.z,yaw:me.yaw??0});M.userData.visualState={team:it,tier:N,hp:F.hp,maxHp:F.maxHp,buildings:{...G},buildingPlacements:dt,yaw:Number.isFinite(F.yaw)?F.yaw:0,storage:F.storage,resources:F.resources,lootTaken:!!F.lootTaken,gateHp:F.gateHp,gateOpen:!!F.gateOpen,destroyed:V,underConstruction:!!F.underConstruction,constructionProgress:Yi(Number(F.constructionProgress)||0,0,1)},M.rotation.y=M.userData.visualState.yaw;for(const[Ce,me]of Object.entries(M.userData.buildingGroups)){const en=dt[Ce]||M.userData.defaultPlacements[Ce];me.position.x=en.x/ne,me.position.z=en.z/ne,me.rotation.y=en.yaw}const Tt=M.userData.buildingGroups.training;M.updateMatrixWorld(!0),M.userData.trainingPoint.copy(Tt.getWorldPosition(new z)),M.userData.trainingPoint.y=M.position.y+.12,M.userData.team=it,M.userData.tier=N,M.userData.health=Z,M.userData.destroyed=V,M.userData.banner.userData.flag.material.color.set(Us(it)),M.userData.banner.userData.emblemTeam!==it&&(M.userData.banner.userData.flag.material.map=uo(it),M.userData.banner.userData.flag.material.needsUpdate=!0,M.userData.banner.userData.emblemTeam=it),M.userData.gateCrest.material.color.set(Us(it)),M.userData.gateCrest.material.map=uo(it);const $t=!!(G.storage??G.store??!1);M.userData.core.visible=!V,M.userData.extra.visible=!V&&N>=2,M.userData.ruin.visible=V,M.userData.nursery.visible=!V&&!!(G.nursery||G.hatchery||G.spawn||G.breeding),M.userData.training.visible=!V&&!!(G.training||G.trainingGround||G.drill),M.userData.watchtower.visible=!V&&!!(G.watchtower||G.tower||G.guards);const zt=!V&&!!(G.palisade||G.walls||G.wall||G.defense);M.userData.fortification.visible=!V,M.userData.palisade.visible=zt;const Nt=Number.isFinite(F.gateHp)&&F.gateHp<=0;M.userData.gate.userData.breached=Nt,M.userData.gate.userData.open=!!F.gateOpen,M.userData.fallenGate.visible=Nt;for(let Ce=0;Ce<2;Ce++){const me=M.userData.gateLeaves[Ce];me.visible=!Nt,me.rotation.y=F.gateOpen?(Ce===0?-1:1)*Math.PI*.52:0}M.userData.core.rotation.z=V?0:(1-Z)*.09,M.userData.core.userData.roof.scale.y=V?1:.78+.22*Z;let se=typeof F.storage=="number"?F.storage:F.storage?.food??F.resources??0;Number.isFinite(se)||(se=0),se=Math.max(0,se);const Re=se>0&&!F.lootTaken;M.userData.storage.visible=$t&&(!V||Re),M.userData.storage.rotation.z=V?-.08:0,M.userData.foodMesh.count=V&&!Re?0:Math.min(15,Math.ceil(se/8)),M.userData.storageCover.position.set(V?-.65:0,V?.1:.5,V?.52:.1),M.userData.storageCover.rotation.set(V?.28:0,0,V?-.32:.17),M.userData.looseLoot.visible=V&&Re&&!$t,M.userData.looseLoot.count=Math.min(8,Math.ceil(se/5)),M.userData.banner.position.y=V?.035:0,M.userData.banner.rotation.set(V?.08:0,V?.35:0,V?1.49:Z<.25?.22:0),M.userData.lamp.visible=!V,V&&(M.userData.light.visible=!1),ph(M),M.userData.collisionRevision=(M.userData.collisionRevision||0)+1}function ph(M){const I=M.userData.visualState||{},k=Fu({...I,mesh:M}),{stage:F,unfinished:N,wallHeight:G}=k,Z=!!I.destroyed,V=M.userData.fortWalls,it=G/fa;if(V.visible=!Z&&F>=1,V.count=F===1?V.userData.firstCoursesCount:V.userData.fullCount,V.scale.y=it||1,V.position.y=.11*(1-(it||1))/ne,V.updateMatrix(),M.userData.fortification.visible=!Z&&F>=1,M.userData.fortTowers.visible=!Z&&F>=2,M.userData.fortTowerRoofs.visible=!Z&&F>=3,M.userData.core.visible=!Z&&F>=3,M.userData.gate.visible=!Z&&!N,M.userData.gateCrest.visible=!Z&&!N,M.userData.banner.visible=!N,N)for(const dt of["extra","nursery","training","watchtower","storage","palisade","lamp","light","looseLoot"])M.userData[dt].visible=!1;M.userData.constructionStage=F,M.userData.constructionWallHeight=G}function Jd(M,I,k){if(M?.type!=="shelter")return!1;const F=k?.mesh||[...E].find(V=>V.userData.id===(M.siteId||M.campId));if(!F?.userData?.fortWalls)return!1;const N=Yi(Number(I)||0,0,1);k&&(k.constructionProgress=N);const G=F.userData.visualState||{};return G.constructionProgress=N,G.underConstruction=k?.underConstruction??G.underConstruction??!0,F.userData.visualState=G,Fu({...G,mesh:F}).stage!==F.userData.constructionStage&&(ph(F),F.userData.collisionRevision=(F.userData.collisionRevision||0)+1),!0}function mh(M){if(!M)return;if(Y?.userData.camp===M&&Pr(),l.remove(M),E.delete(M),M.userData.refuge){M.userData.refuge.active=!1;const k=x.indexOf(M.userData.refuge);k>=0&&x.splice(k,1)}M===v&&(v=null);for(const k of[M.userData.support,M.userData.landmark])if(k){const F=C.indexOf(k);F>=0&&C.splice(F,1);for(const N of L.values()){const G=N.indexOf(k);G>=0&&N.splice(G,1)}}const I=M.userData.terrain;I&&(R.delete(I.id),w(I),dh(I)),M.traverse(k=>{k.isInstancedMesh&&k.dispose()});for(const k of M.userData.owned||[])k.dispose?.()}function Qd(M){if(c||!["shelter","store","nursery","watchtower","training"].includes(M))return null;const I=fo({id:"construction-preview",x:0,z:0,team:"ally",tier:1,hp:350,maxHp:350,buildings:{},storage:{food:80}},{preview:!0});if(I.name="Construction preview: "+M,I.userData.previewType=M,I.userData.previewMaterials=[],M!=="shelter"){const F=I.userData.buildingGroups[M];for(const N of I.children)N.visible=N===F;F.visible=!0,F.position.x=F.position.z=0,F.rotation.y=0}const k=new Map;return I.traverse(F=>{if(F.isLight){F.visible=!1;return}if(!F.isMesh)return;F.castShadow=!1,F.receiveShadow=!1,F.renderOrder=8;const N=G=>{if(k.has(G))return k.get(G);const Z=G.clone();return Z.transparent=!0,Z.opacity=.46,Z.depthWrite=!1,Z.polygonOffset=!0,Z.polygonOffsetFactor=-1,Z.polygonOffsetUnits=-1,k.set(G,Z),I.userData.previewMaterials.push(Z),I.userData.owned.push(Z),Z};F.material=Array.isArray(F.material)?F.material.map(N):N(F.material)}),b.add(I),l.add(I),gh(I,{x:0,y:0,z:0,yaw:0,valid:!1}),I.visible=!1,I}function gh(M,{x:I,y:k,z:F,yaw:N=0,valid:G=!1}={}){if(M?.userData.previewType&&(Number.isFinite(I)&&(M.position.x=I),Number.isFinite(k)&&(M.position.y=k),Number.isFinite(F)&&(M.position.z=F),M.rotation.y=Number.isFinite(N)?N:0,M.visible=!0,M.userData.previewValid!==!!G)){M.userData.previewValid=!!G;for(const Z of M.userData.previewMaterials)Z.color?.set(G?"#69ed89":"#ef665b"),Z.emissive?.set(G?"#266c37":"#782d27"),"emissiveIntensity"in Z&&(Z.emissiveIntensity=.4)}}function xh(M){!M||!b.has(M)||(b.delete(M),M.removeFromParent(),mh(M))}function Pr(){if(!Y)return;Y.removeFromParent();const M=new Set,I=new Set;Y.traverse(k=>{k.geometry&&M.add(k.geometry),k.material&&I.add(k.material)});for(const k of M)k.dispose();for(const k of I)k.dispose();Y=null}function tf(M){const I=M?.mesh||M;if(!I?.isObject3D)return Pr(),null;if(Y?.userData.camp===I)return Y;Pr(),Y=new re,Y.name="Construction courtyard guide",Y.userData.camp=I;const k=(Ms-.2)/ne,F=.075,N=(it,dt,Tt,$t=!1)=>{const zt=new Te().setFromPoints(it),Nt=new Zc({color:dt,transparent:!0,opacity:Tt,depthWrite:!1}),se=$t?new Xp(zt,Nt):new Wp(zt,Nt);return se.renderOrder=6,Y.add(se),se},G=[];for(let it=0;it<96;it++){const dt=it/96*ze;G.push(new z(Math.cos(dt)*k,F,Math.sin(dt)*k))}N(G,"#9fe5af",.78,!0);const Z=[];for(let it=-7;it<=7;it++){const dt=it*.7;if(Math.abs(dt)>=k)continue;const Tt=Math.sqrt(k*k-dt*dt);Z.push(new z(dt,F,-Tt),new z(dt,F,Tt),new z(-Tt,F,dt),new z(Tt,F,dt))}N(Z,"#b7ddbc",.22);const V=(it,dt)=>{const Tt=it.x/ne,$t=it.z/ne,zt=it.width/(2*ne)+.025,Nt=it.depth/(2*ne)+.025,se=Math.cos(it.yaw||0),Re=Math.sin(it.yaw||0),Ce=F+.012,me=(Je,an)=>new z(Tt+Je*se+an*Re,Ce,$t+an*se-Je*Re);N([me(-zt,-Nt),me(zt,-Nt),me(zt,Nt),me(-zt,Nt)],"#ec8a72",.8,!0).name=dt+" outline";const en=[];for(let Je=-zt-Nt;Je<=zt+Nt;Je+=.42){const an=[];for(const vn of[-zt,zt]){const Mn=Je-vn;Mn>=-Nt&&Mn<=Nt&&an.push(me(vn,Mn))}for(const vn of[-Nt,Nt]){const Mn=Je-vn;Mn>-zt&&Mn<zt&&an.push(me(Mn,vn))}an.length===2&&en.push(...an)}N(en,"#d9806c",.35).name=dt+" hatch"};return V(I.userData.coreFootprint||{x:-1.1825*lr,z:-1.0664*lr,width:7.68*lr,depth:8.25*lr},"Main hut exclusion"),V(a_,"Sleeping hut reservation"),I.add(Y),Y}let po=0,vh=Xi;const ef=ln(o.water),nf=ln(o.nightWater),sf=ln("#fff0cb"),rf=ln("#7aa5cb");function of(M,I,k=1,F){if(qe=I,po++,k=Yi(k,0,1),ho.value=I,c){const Z=1-Math.exp(-Math.max(0,Math.min(.5,Number(M)||0))*3);be(g+(p-g)*Z);const V=lt.material.uniforms.alpha,it=M_(F?.y,g);if(V.value+=(it-V.value)*(1-Math.exp(-Math.max(0,Math.min(.5,Number(M)||0))*8)),Math.abs(vh-g)>.008){for(let dt=0;dt<wt.length;dt++){const Tt=wt[dt];ft.position.set(Tt.x,Tt.y,Tt.z),ft.rotation.set(0,Tt.angle,0),ft.scale.set(Tt.visualRadius,1,Tt.visualRadius),ft.updateMatrix(),ve.setMatrixAt(dt,ft.matrix)}ve.flush(),vh=g}jt.update(g,I)}if(lt.material.uniforms.time.value=I*.45,lt.material.uniforms.waterColor.value.copy(nf).lerp(ef,k),lt.material.uniforms.sunColor.value.copy(rf).lerp(sf,k),lt.material.uniforms.sunDirection.value.set(.35+.25*Math.sin(I*.008),.45+k*.4,-.45).normalize(),po%3===0){const Z=at.attributes.position;for(let V=0;V<Z.count;V++){const it=ct[V*3],dt=ct[V*3+1];Z.setZ(V,Math.sin(it*.33+dt*.21+I*.91)*.025+Math.sin(it*.14-dt*.38-I*.72)*.018)}Z.needsUpdate=!0}mi.uniforms.uTime.value=I;let N=!1;for(let Z=0;Z<tn;Z++){const V=oi[Z];V.life<=0||(V.life-=M,V.vy-=9.2*M,on[Z*3]+=V.vx*M,on[Z*3+1]+=V.vy*M,on[Z*3+2]+=V.vz*M,Fi[Z]=Math.max(0,V.life/V.max)*.88,(on[Z*3+1]<(c?g-.03:-.03)||V.life<=0)&&(V.life=0,Fi[Z]=0),N=!0)}if(N&&(gi.attributes.position.needsUpdate=!0,gi.attributes.aAlpha.needsUpdate=!0),po%2===0){let Z=0;for(let V=0;V<T.length;V++){const it=T[V];if(F&&(it.x-F.x)**2+(it.z-F.z)**2>90**2)continue;const dt=(it.rich?65:30)*Yi(it.flies/it.maxFlies,0,1)*(c?Math.min(1,it.ecology?.activity??1):1);for(const Tt of It[V]){if(Tt.rank>=dt)continue;const $t=I*Tt.speed+Tt.phase;ft.position.set(it.x+Math.sin($t)*Tt.r+Math.sin($t*2.9)*.13,it.y+Tt.height+Math.sin($t*1.7+Tt.phase2)*.26,it.z+Math.cos($t*.83+Tt.phase2)*Tt.r),ft.scale.setScalar(.55+.3*Math.sin(Tt.phase2)**2),ft.rotation.set(Math.sin($t*3)*.25,-$t,Math.sin($t*12)*.25),ft.updateMatrix(),Dt.setMatrixAt(Z++,ft.matrix)}}Dt.count=Z,J.flyMatricesUpdated=Z,Z&&(Dt.instanceMatrix.clearUpdateRanges(),Dt.instanceMatrix.addUpdateRange(0,Z*16),Dt.instanceMatrix.needsUpdate=!0)}po%5===0&&F&&(wt.forEach((Z,V)=>{Math.hypot(F.x-Z.x,F.z-Z.z)>48||(ft.position.set(Z.x,Z.y+Math.sin(I*.9+Z.phase)*.018,Z.z),ft.rotation.set(Math.sin(I*.61+Z.phase)*.015,Z.angle,Math.cos(I*.8+Z.phase)*.015),ft.scale.set(Z.visualRadius,1,Z.visualRadius),ft.updateMatrix(),ve.setMatrixAt(V,ft.matrix))}),ve.flush());const G=[...E].filter(Z=>!Z.userData.natural&&!Z.userData.destroyed&&!Z.userData.visualState?.underConstruction).sort((Z,V)=>F?Z.position.distanceToSquared(F)-V.position.distanceToSquared(F):0).slice(0,3);for(const Z of E)Z.userData.natural||(Z.userData.light.visible=G.includes(Z),Z.userData.light.intensity=.25+(1-k)*3,Z.userData.lamp.material.emissiveIntensity=.3+(1-k)*1.3,Z.userData.banner.userData.flag.rotation.y=Math.sin(I*1.4+Z.position.x)*.06)}function af(){Pr();for(const k of[...b])xh(k);i.remove(l);const M=new Set,I=new Set;l.traverse(k=>{k.isInstancedMesh&&k.dispose(),k.geometry&&M.add(k.geometry),k.material&&(Array.isArray(k.material)?k.material.forEach(F=>I.add(F)):I.add(k.material))});for(const k of jt?.resources||[])k.isBufferGeometry&&M.add(k),k.isMaterial&&I.add(k);for(const k of M)k.dispose();for(const k of I)k.dispose();for(const k of S)k.dispose();lt.material.uniforms.mirrorSampler?.value?.dispose?.(),E.clear();for(const k of x)k.active=!1;x.length=0}for(const M of h?.refuges||[])fo({...M,natural:!0,team:"neutral",nestLevel:0});return l.traverse(M=>{M.updateMatrix(),M.matrixAutoUpdate=!1}),l.updateMatrixWorld(!0),{group:l,platforms:C,hotspots:T,campSites:ce,mapRegions:yt,routes:Oe,predatorAnchors:Vt,bossAnchors:kt,renderStats:J,seed:s,regionIndex:n,palette:o,toRegionPoint:r.toWorld,radius:i_,boundary:s_,revision:n_,sampleHeight:Rr,getTerrainHeight:P,getSurface:os,shelterLandHeight:fh,update:of,splash:Xd,impact:qd,createShelter:fo,updateShelter:za,setConstructionProgress:Jd,removeShelter:mh,createBuildingPreview:Qd,setBuildingPreview:gh,removeBuildingPreview:xh,showBuildArea:tf,hideBuildArea:Pr,dispose:af,water:lt,shelterRadius:Ms,shelterScale:ne,natural:c,creekLandmarks:u,creekNest:f,creekCover:d,creekGrips:m,creekRefuges:x,creekSpawn:c?{x:0,z:0}:null,creekTerritories:c?ce.filter(M=>M.team==="enemy"):[],setCreekState:Ne,currentAt:oe,isCreekCover:Kt,get waterLevel(){return c?g:Xi}}}const li=Math.PI*2,$e=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),Ze=(i,t,e)=>i+(t-i)*e,Gn=(i,t,e)=>{const n=$e((e-i)/(t-i));return n*n*(3-2*n)},Gr=(i,t=0,e=0)=>{const n=Math.sin(i*127.1+t*311.7+e*74.7)*43758.5453;return n-Math.floor(n)},Fe=(i=0,t=0,e=0)=>new z(i,t,e),yl=new Map,Ml=new Map;let $i,bl;const Cc=Fe(0,1,0);Fe();function Sl(i,t){if(typeof i=="number")return i;const e=$e(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n,r=s*s*(3-2*s);return Ze(i[n],i[n+1],r)}function bs(i,t){if(i.length===1)return[[i[0],1]];const e=$e(t)*(i.length-1),n=Math.min(i.length-2,Math.floor(e)),s=e-n;return[[i[n],1-s],[i[n+1],s]]}function ye(i,t=0){return{color:i,mask:t}}class kn{constructor(t=1){this.detail=t,this.p=[],this.uv=[],this.c=[],this.mask=[],this.si=[],this.sw=[],this.idx=[]}vertex(t,e=[0,0],n=[[0,1]],s={color:[1,1,1],mask:0}){const r=this.p.length/3;this.p.push(t.x,t.y,t.z),this.uv.push(...e),this.c.push(...s.color),this.mask.push(s.mask||0);let o=n.reduce((a,l)=>a+l[1],0)||1;for(let a=0;a<4;a++)this.si.push(n[a]?.[0]||0),this.sw.push((n[a]?.[1]||0)/o);return r}tri(t,e,n){this.idx.push(t,e,n)}quad(t,e,n,s,r=!1){r?(this.tri(t,n,e),this.tri(e,n,s)):(this.tri(t,e,n),this.tri(e,s,n))}tube(t,e,n,s={}){const{bones:r=[0],paint:o=()=>ye([.7,.7,.7],1),distort:a}=s,l=Math.max(2,Math.round((s.segments??28)*this.detail)),c=Math.max(3,Math.round((s.radial??16)*this.detail)),h=new ro(t.map(_=>_.isVector3?_:Fe(..._)),!1,"catmullrom",.5),u=this.p.length/3;for(let _=0;_<=l;_++){const v=_/l,C=h.getPoint(v),T=h.getTangent(v).normalize(),E=new z().crossVectors(Math.abs(T.y)>.94?Fe(0,0,1):Cc,T).normalize(),R=new z().crossVectors(T,E).normalize();for(let b=0;b<=c;b++){const S=b/c,L=S*li,U=Math.cos(L)*Sl(e,v),Y=Math.sin(L)*Sl(n,v),J=C.clone().addScaledVector(E,U).addScaledVector(R,Y);a&&a(J,v,L,C);const H=typeof r=="function"?r(v,J):bs(r,v);this.vertex(J,[S,v],H,o(J,v,L))}}for(let _=0;_<l;_++)for(let v=0;v<c;v++){const C=u+_*(c+1)+v;this.quad(C,C+1,C+c+1,C+c+2)}const f=h.getPoint(0),d=h.getPoint(1),m=typeof r=="function"?r(0,f):bs(r,0),x=typeof r=="function"?r(1,d):bs(r,1),g=this.vertex(f,[.5,0],m,o(f,0,0)),p=this.vertex(d,[.5,1],x,o(d,1,0)),y=u+l*(c+1);for(let _=0;_<c;_++)this.tri(g,u+_+1,u+_),this.tri(p,y+_,y+_+1);return this}ellipsoid(t,e,{bone:n=0,rings:s=14,radial:r=24,paint:o=()=>ye([1,1,1]),rotationY:a=0,sculpt:l}={}){s=Math.max(3,Math.round(s*this.detail)),r=Math.max(4,Math.round(r*this.detail));const c=this.p.length/3,h=Fe(...t),u=Math.cos(a),f=Math.sin(a);for(let d=0;d<=s;d++){const m=d/s,x=Math.PI*m;for(let g=0;g<=r;g++){const p=g/r,y=li*p;let _=Math.sin(x)*Math.cos(y)*e[0],v=Math.cos(x)*e[1],C=Math.sin(x)*Math.sin(y)*e[2];const T=Fe(_,v,C);l&&l(T,p,m);const E=Fe(T.x*u+T.z*f,T.y,-T.x*f+T.z*u).add(h);this.vertex(E,[p,m],[[n,1]],o(T,p,m))}}for(let d=0;d<s;d++)for(let m=0;m<r;m++){const x=c+d*(r+1)+m;this.quad(x,x+1,x+r+1,x+r+2)}return this}leaf(t,e,{bone:n=0,bones:s,segments:r=14,across:o=6,color:a=[.35,.45,.22],ridge:l=.025,mask:c=0,vein:h=!0}={}){r=Math.max(2,Math.round(r*this.detail)),o=Math.max(2,Math.round(o*this.detail));const u=new ro(t.map(d=>d.isVector3?d:Fe(...d)),!1,"catmullrom",.5),f=this.p.length/3;for(let d=0;d<=r;d++){const m=d/r,x=u.getPoint(m),g=u.getTangent(m).normalize(),p=new z().crossVectors(Math.abs(g.y)>.95?Fe(0,0,1):Cc,g).normalize();for(let y=0;y<=o;y++){const _=y/o*2-1,v=x.clone().addScaledVector(p,_*Sl(e,m));v.y+=l*(1-Math.abs(_))*Math.sin(m*Math.PI);const C=(h?.88+.12*Math.cos(m*45+Math.abs(_)*9):1)+.12*(1-Math.abs(_));this.vertex(v,[(_+1)/2,m],s?bs(s,m):[[n,1]],ye(a.map(T=>T*C),c))}}for(let d=0;d<r;d++)for(let m=0;m<o;m++){const x=f+d*(o+1)+m;this.quad(x,x+1,x+o+1,x+o+2,!0)}return this}geometry(){const t=new Te;return t.setAttribute("position",new Wt(this.p,3)),t.setAttribute("uv",new Wt(this.uv,2)),t.setAttribute("color",new Wt(this.c,3)),t.setAttribute("skinTintMask",new Wt(this.mask,1)),t.setAttribute("skinIndex",new Xc(this.si,4)),t.setAttribute("skinWeight",new Wt(this.sw,4)),t.setIndex(this.idx),t.computeVertexNormals(),t.computeBoundingSphere(),t}}function Sa(){const i=[],t={};return{defs:i,ids:t,bone(e,n,s=null){const r=i.length;return t[e]=r,i.push({name:e,p:n,parent:typeof s=="string"?t[s]:s}),r}}}function Qs(i,t=0,e=0){const n=1-Gn(.26,.47,i.y),s=Math.sin(i.x*31+Math.sin(i.z*13))*Math.sin(i.z*25+i.y*23),r=Gn(.42,.77,s)*.5,o=.75-r+.06*Math.sin(i.x*75+i.z*64),a=(1-Gn(.026,.065,Math.abs(i.x)))*Gn(.52,.67,i.y);return a>.3?ye([.78,.61,.18].map(l=>Ze(o,l,a)),1-a):ye([Ze(o,.76,n),Ze(o,.72,n),Ze(o,.49,n)],1-n*.96)}function ai(i,t=0,e=0){const n=(1-Gn(-.55,.1,Math.sin(e)))*.65,r=.79-.36*Gn(.38,.78,Math.sin(i.x*35+i.z*17)*Math.sin(i.y*39-i.z*23));return ye([Ze(r,.7,n),Ze(r,.66,n),Ze(r,.43,n)],1-n*.92)}function Hu(i=1){const t=Sa(),e=new kn(i),n=new kn(i),s=new kn(i),r=new kn(i),o=new kn(i),a=new kn(i),l=t.bone("pelvis",[0,.36,-.35]),c=t.bone("spine",[0,.43,-.07],l),h=t.bone("head",[0,.47,.29],c),u=t.bone("jaw",[0,.39,.37],h),f=t.bone("throat",[0,.29,.36],u),d=t.bone("eyeL",[-.292,.685,.53],h),m=t.bone("eyeR",[.292,.685,.53],h),x=t.bone("mouth",[0,.405,.755],u);e.tube([[0,.35,-.72],[0,.42,-.48],[0,.43,-.08],[0,.47,.3],[0,.46,.58],[0,.43,.75]],[.012,.32,.435,.43,.34,.018],[.012,.245,.27,.235,.145,.025],{segments:42,radial:36,bones:p=>bs([l,l,c,h,h],p),paint:Qs,distort(p,y,_){const v=Math.max(0,Math.sin(_));p.y+=v*.008*Math.sin(p.x*70+p.z*50);const C=Math.exp(-Math.pow((Math.abs(p.x)-.22)/.035,2));p.y+=C*v*.023*Math.sin(y*Math.PI)}});for(const p of[-1,1]){const y=p<0?d:m,_=[p*.292,.685,.53];e.ellipsoid([p*.292,.605,.405],[.15,.145,.165],{bone:h,rings:14,radial:24,paint:U=>Qs(U.clone().add(Fe(p*.292,.605,.405)))}),n.ellipsoid(_,[.106,.103,.113],{bone:y,radial:40,rings:22,rotationY:p*.32,paint(U,Y,J){const H=U.z/.113,q=Math.pow(U.x/.084,2)+Math.pow(U.y/.029,2);if(H<.12)return ye([.065,.14,.018]);if(H<.34)return ye([.04,.065,.012]);if(H>.52&&q<1)return ye([.008,.012,.006]);const B=.12*Math.sin(Math.atan2(U.y,U.x)*51+Math.hypot(U.x,U.y)*120);return ye([.74+B,.52+B*.6,.08+B*.12])}});const v=t.bone(`hip${p}`,[p*.33,.32,-.33],l),C=t.bone(`knee${p}`,[p*.64,.24,.025],v),T=t.bone(`ankle${p}`,[p*.46,.09,-.61],C),E=t.bone(`foot${p}`,[p*.64,.045,-.49],T);e.ellipsoid([p*.64,.24,.025],[.143,.128,.148],{bone:C,rings:12,radial:18,paint:(U,Y,J)=>ai(U.clone().add(Fe(p*.64,.24,.025)),Y,Math.PI*(.5-J)),sculpt(U){U.x*=1+.06*Math.sin(U.z*30)}}),e.ellipsoid([p*.46,.09,-.61],[.069,.052,.071],{bone:T,rings:8,radial:12,paint:(U,Y,J)=>ai(U.clone().add(Fe(p*.46,.09,-.61)),Y,Math.PI*(.5-J))}),e.tube([[p*.3,.33,-.35],[p*.5,.3,-.21],[p*.64,.24,.025]],[.13,.223,.14],[.13,.173,.12],{segments:20,radial:22,bones:[v,v,C],paint:ai}),e.tube([[p*.64,.24,.025],[p*.57,.15,-.27],[p*.46,.09,-.61]],[.12,.105,.065],[.11,.09,.05],{segments:20,radial:18,bones:[C,C,T],paint:ai}),e.tube([[p*.46,.09,-.61],[p*.57,.06,-.55],[p*.72,.035,-.35]],[.06,.07,.047],[.047,.04,.025],{segments:12,radial:14,bones:[T,E,E],paint:ai});const R=[];for(let U=0;U<4;U++){const Y=p*(.7+(U-1.5)*.075),J=-.34+.36*(1-Math.abs(U-1.5)*.16),H=[p*(.67+(U-1.5)*.028),.036,-.37],q=[Ze(H[0],Y,.53),.037,-.18];e.tube([H,q,[Y,.035,J]],[.032,.024,.007],[.02,.014,.006],{segments:10,radial:8,bones:[E],paint:ai}),R.push([Y,.034,J*.66-.12])}for(let U=0;U<3;U++){const Y=Fe(p*.68,.035,-.36),J=Fe(...R[U]),H=Fe(...R[U+1]),q=J.clone().lerp(H,.5).lerp(Y,.2),B=e.vertex(Y,[0,0],[[E,1]],Qs(Y)),O=e.vertex(J,[1,0],[[E,1]],Qs(J)),tt=e.vertex(q,[.5,1],[[E,1]],Qs(q)),W=e.vertex(H,[0,1],[[E,1]],Qs(H));e.tri(B,O,tt),e.tri(B,tt,W),e.tri(tt,O,W)}const b=t.bone(`shoulder${p}`,[p*.3,.43,.31],c),S=t.bone(`elbow${p}`,[p*.48,.235,.4],b),L=t.bone(`wrist${p}`,[p*.46,.058,.62],S);e.ellipsoid([p*.48,.235,.4],[.064,.066,.064],{bone:S,rings:8,radial:12,paint:(U,Y,J)=>ai(U.clone().add(Fe(p*.48,.235,.4)),Y,Math.PI*(.5-J))}),e.tube([[p*.3,.43,.31],[p*.43,.33,.335],[p*.48,.235,.4]],[.092,.085,.061],[.09,.077,.059],{segments:14,radial:16,bones:[b,b,S],paint:ai}),e.tube([[p*.48,.235,.4],[p*.48,.14,.48],[p*.46,.058,.62]],[.062,.07,.039],[.058,.057,.03],{segments:12,radial:14,bones:[S,S,L],paint:ai});for(let U=0;U<4;U++){const Y=p*(.44+(U-1.5)*.075),J=.81+.04*(1.5-Math.abs(U-1.5));e.tube([[p*.46,.055,.61],[Ze(p*.46,Y,.6),.031,.74],[Y,.025,J]],[.025,.017,.009],[.021,.014,.006],{segments:9,radial:8,bones:[L],paint:ai}),e.ellipsoid([Y,.025,J],[.017,.01,.021],{bone:L,rings:6,radial:10,paint:()=>ye([.71,.65,.4],.4)})}for(let U=0;U<3;U++){const Y=.32+U*.016;e.tube(Array.from({length:17},(J,H)=>[p*.415+Math.cos(H/16*li)*.085,Y+Math.sin(H/16*li)*.072,.355+Math.sin(H/16*li)*.02]),.009,.009,{segments:20,radial:6,bones:[b],paint:()=>ye([.38,.55,.12],.25)})}s.leaf([[p*.12,.695,-.08],[p*.31,.69,-.19],[p*.48,.52,-.38]],[.012,.14,.03],{bone:c,color:[.26,.4,.12],ridge:.025,segments:15}),s.leaf([[p*.04,.715,.05],[p*.2,.73,-.03],[p*.36,.59,-.2]],[.008,.13,.015],{bone:c,color:[.34,.48,.18],ridge:.035,segments:15}),r.leaf([[p*.17,.76,.4],[p*.21,.89,.32],[p*.24,.91,.18]],[.025,.055,.002],{bone:h,color:[.69,.53,.19],ridge:.015,segments:12});for(const[U,Y,J,H,q]of[[p*.16,.745,-.005,.18,.21],[p*.29,.67,-.25,.17,.19]])o.ellipsoid([U,Y,J],[H,.055,q],{bone:c,rings:8,radial:18,paint:(B,O)=>ye([.84+.08*Math.cos(O*li*9),.79,.59]),sculpt(B){const O=1+.035*Math.cos(Math.atan2(B.x,B.z)*9);B.x*=O,B.z*=O}});for(let U=0;U<3;U++){const Y=.19+U*.028,J=.455-U*.017;a.tube(Array.from({length:13},(H,q)=>[p*.478+Math.cos(q/12*li)*.081,Y+Math.sin(q/12*li)*.027,J+Math.sin(q/12*li)*.079]),.016,.014,{segments:14,radial:6,bones:[S],paint:()=>ye([.72,.47,.16])})}}const g=Array.from({length:13},(p,y)=>{const _=(y/12-.5)*.74;return[_,.414-.025*Math.abs(_)/.37,.748-.2*Math.pow(_/.37,2)]});return e.tube(g,.009,.009,{segments:34,radial:8,bones:[h],paint:()=>ye([.045,.065,.016])}),e.tube(g.map(p=>[p[0],p[1]-.019,p[2]+.001]),.009,.014,{segments:34,radial:8,bones:[u],paint:()=>ye([.65,.61,.35])}),e.ellipsoid([0,.284,.385],[.25,.125,.265],{bone:f,rings:18,radial:28,paint:()=>ye([.75,.72,.48]),sculpt(p){p.y+=.01*Math.sin(p.x*80)*Math.cos(p.z*60)}}),{type:"frog",rig:t,skin:e.geometry(),eyes:n.geometry(),armor:s.geometry(),shell:o.geometry(),bracers:a.geometry(),crest:r.geometry(),mouth:x,length:1.7,height:.8,scale:1}}function tr(i,t,e,n,s,r,o=.05){const a=Fe(...t).lerp(Fe(...e),.5);a.y+=o,i.leaf([t,a.toArray(),e],[.012,n,n*.7,.002],{bone:s,segments:13,across:6,ridge:.012,color:r,vein:!0})}function N_(){const i=Sa(),t=new kn,e=new kn,n=i.bone("pelvis",[0,2.45,-.16]),s=i.bone("spine",[0,2.79,.02],n),r=i.bone("neck0",[0,2.97,.24],s),o=i.bone("neck1",[0,3.35,.03],r),a=i.bone("neck2",[0,3.82,.18],o),l=i.bone("head",[0,4.19,.6],a),c=i.bone("jaw",[0,4.12,.7],l),h=i.bone("mouth",[0,4.11,1.48],c),u=i.bone("eyeL",[-.125,4.25,.69],l),f=i.bone("eyeR",[.125,4.25,.69],l),d=m=>{const x=Gn(2.7,3.02,m.y)*.35;return ye([.54-x,.59-x,.61-x])};t.tube([[0,2.43,-.95],[0,2.58,-.53],[0,2.78,-.05],[0,2.99,.27]],[.02,.34,.41,.14],[.02,.39,.48,.18],{segments:30,radial:28,bones:[n,n,s,s],paint:d}),t.tube([[0,2.97,.24],[0,3.22,.16],[0,3.46,.015],[0,3.83,.18],[0,4.12,.52],[0,4.21,.65]],[.16,.15,.12,.1,.1,.13],[.17,.17,.14,.12,.13,.14],{segments:40,radial:20,bones:[r,r,o,a,l,l],paint(m,x,g){const p=Math.cos(g)>.7?.65:.9;return ye([p,p*.99,p*.91])}}),t.tube([[0,4.18,.36],[0,4.28,.57],[0,4.25,.76],[0,4.18,.91]],[.018,.15,.14,.045],[.02,.16,.14,.07],{segments:22,radial:20,bones:[l],paint(m){return m.y>4.32?ye([.07,.1,.12]):ye([.83,.86,.82])}}),t.tube([[0,4.19,.81],[0,4.18,1.04],[0,4.15,1.32],[0,4.12,1.6]],[.072,.055,.027,.001],[.06,.044,.022,.001],{segments:20,radial:10,bones:[l],paint(m,x){return ye([Ze(.74,.34,x),Ze(.47,.24,x),.075])}}),t.tube([[0,4.112,.81],[0,4.105,1.06],[0,4.103,1.36],[0,4.115,1.59]],[.063,.046,.022,.001],[.026,.02,.012,.001],{segments:18,radial:8,bones:[c],paint:()=>ye([.68,.38,.07])});for(const m of[-1,1]){const x=m<0?u:f;e.ellipsoid([m*.132,4.255,.69],[.029,.039,.043],{bone:x,rings:10,radial:18,paint:R=>Math.abs(R.x)>.022&&Math.abs(R.y)<.018&&Math.abs(R.z)<.021?ye([.005,.008,.006]):ye([.9,.7,.13])});const g=i.bone(`hip${m}`,[m*.14,2.47,-.12],n),p=i.bone(`knee${m}`,[m*.18,1.5,-.12],g),y=i.bone(`ankle${m}`,[m*.22,.16,.04],p),_=i.bone(`foot${m}`,[m*.22,.075,.15],y),v=(R,b)=>{const S=.8+.2*Math.sin(R.y*110);return ye([.38*S,.36*S,.21*S])};t.tube([[m*.14,2.47,-.12],[m*.18,1.73,-.15],[m*.18,1.5,-.12]],[.077,.04,.049],[.074,.037,.049],{segments:20,radial:12,bones:[g,g,p],paint:v}),t.tube([[m*.18,1.5,-.12],[m*.2,.7,-.02],[m*.22,.16,.04]],[.042,.024,.031],[.042,.023,.03],{segments:22,radial:10,bones:[p,p,y],paint:v});for(let R=0;R<4;R++){const b=R<3?(R-1)*.23:-.08,S=R<3?.54-.06*Math.abs(R-1):-.21;t.tube([[m*.22,.16,.04],[m*.22+b*.5,.065,(S+.04)*.55],[m*.22+b,.035,S]],[.025,.017,.006],[.023,.013,.005],{segments:12,radial:8,bones:[_],paint:v})}const C=i.bone(`wing${m}`,[m*.31,2.91,-.03],s),T=i.bone(`wingElbow${m}`,[m*.94,2.83,-.12],C),E=i.bone(`wingWrist${m}`,[m*1.5,2.68,-.24],T);t.leaf([[m*.31,2.91,-.03],[m*.95,2.84,-.18],[m*1.58,2.69,-.35]],[.08,.29,.1],{bones:[C,T,E],segments:22,across:10,ridge:.05,color:[.36,.43,.47]});for(let R=0;R<15;R++){const b=.42+R*.088,S=R<6?C:R<11?T:E;tr(t,[m*b,2.89-R*.014,-.05-R*.012],[m*(b+.22+R*.009),2.73-R*.023,-.76-R*.018],.105-R*.002,S,[.26+R*.004,.32+R*.004,.36+R*.004]),R<12&&tr(t,[m*b,2.94-R*.014,.035],[m*(b+.1),2.86-R*.017,-.44],.077,S,[.49,.55,.57])}for(let R=0;R<11;R++)tr(t,[m*(.11+.015*R),2.86-.042*R,-.21],[m*(.29+.009*R),2.7-.044*R,-.75-.022*R],.075,s,[.51+R*.013,.56+R*.012,.56+R*.012]);tr(t,[m*.065,4.34,.51],[m*.13,4.28,-.02],.018,l,[.04,.07,.09],.025)}for(let m=0;m<9;m++)tr(t,[(m-4)*.045,2.53,-.65],[(m-4)*.075,2.34,-1.34-.1*(1-Math.abs(m-4)/4)],.07,n,[.21,.28,.31]);for(let m=0;m<9;m++)tr(t,[(m-4)*.025,3.06,.35],[(m-4)*.044,2.48-.06*(m%3),.42],.032,s,[.79,.8,.72],.01);return{type:"heron",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:h,length:3,height:4.55,scale:1}}function k_(){const i=Sa(),t=new kn,e=new kn,n=new kn,s=i.bone("head",[0,.27,1.97]),r=[s];for(let u=1;u<=20;u++)r.push(i.bone(`coil${u}`,[0,.23,1.97-u*.22],r[u-1]));const o=i.bone("jaw",[0,.205,2.1],s),a=i.bone("mouth",[0,.19,2.48],o),l=i.bone("eyeL",[-.183,.346,2.21],s),c=i.bone("eyeR",[.183,.346,2.21],s),h=(u,f,d)=>{const m=1-Gn(.13,.22,u.y),x=.73-.26*Gn(.2,.65,Math.sin(u.z*7+u.x*18));return ye([Ze(x,.65,m),Ze(x,.6,m),Ze(x,.36,m)],1-m)};t.tube([[0,.25,2.05],[0,.23,1.4],[0,.23,.5],[0,.22,-.4],[0,.18,-1.5],[0,.09,-2.46]],[.13,.186,.205,.18,.115,.002],[.11,.16,.17,.15,.09,.003],{segments:100,radial:20,bones:u=>bs(r,u),paint:h,distort(u,f,d){u.y+=.003*Math.sin(f*390)*Math.sin(d*12)}}),t.tube([[0,.265,1.86],[0,.29,2.07],[0,.285,2.27],[0,.245,2.48]],[.115,.237,.202,.035],[.1,.12,.105,.038],{segments:24,radial:24,bones:[s],paint:h}),t.tube([[0,.192,1.99],[0,.179,2.25],[0,.207,2.47]],[.14,.19,.025],[.027,.035,.006],{segments:18,radial:16,bones:[o],paint:()=>ye([.66,.63,.42])});for(const u of[-1,1])e.ellipsoid([u*.183,.346,2.21],[.045,.043,.05],{bone:u<0?l:c,rings:12,radial:20,rotationY:u*.9,paint(f){return Math.abs(f.x)<.012&&f.z>.015?ye([.009,.008,.005]):ye([.69,.51,.12])}}),t.tube([[u*.2,.228,2.06],[u*.197,.218,2.29],[u*.045,.225,2.475]],.004,.004,{segments:20,radial:6,bones:[s],paint:()=>ye([.05,.06,.025])}),n.tube([[0,.194,2.47],[0,.19,2.73],[u*.06,.18,2.84]],[.014,.01,.001],[.007,.005,.001],{segments:16,radial:6,bones:[o],paint:()=>ye([.28,.025,.035])});return{type:"snake",rig:i,skin:t.geometry(),eyes:e.geometry(),tongue:n.geometry(),mouth:a,length:5,height:.43,scale:1}}function F_(){const i=Sa(),t=new kn,e=new kn,n=i.bone("spine",[0,.6,.18]),s=i.bone("head",[0,.61,.78],n),r=i.bone("tail0",[0,.55,-.44],n),o=i.bone("tail1",[0,.49,-.99],r),a=i.bone("tail",[0,.48,-1.43],o),l=i.bone("jaw",[0,.42,1.03],s),c=i.bone("mouth",[0,.43,1.55],l),h=i.bone("eyeL",[-.22,.72,1.06],s),u=i.bone("eyeR",[.22,.72,1.06],s),f=g=>{const p=1-Gn(.35,.62,g.y),y=.74-.25*Gn(.1,.6,Math.sin(g.z*18+g.y*29)*Math.sin(g.y*35));return ye([Ze(y,.81,p),Ze(y,.78,p),Ze(y,.61,p)],1-p)};t.tube([[0,.48,-1.46],[0,.51,-.92],[0,.61,-.28],[0,.64,.34],[0,.62,.84],[0,.55,1.24],[0,.52,1.56]],[.018,.15,.31,.35,.29,.19,.027],[.035,.22,.46,.48,.32,.19,.05],{segments:54,radial:28,bones:g=>bs([a,o,r,n,s,s,s],g),paint:f}),t.tube([[0,.43,.92],[0,.36,1.25],[0,.445,1.56]],[.14,.16,.025],[.055,.065,.018],{segments:18,radial:18,bones:[l],paint:()=>ye([.72,.69,.49])});const d=[.33,.4,.23],m=t.p.length/3;for(let g=0;g<=18;g++){const p=g/18,y=Math.cos(p*Math.PI)*.62,_=-1.45-(.3+.3*Math.abs(Math.cos(p*Math.PI)));for(let v=0;v<=6;v++){const C=v/6,T=Fe(.025*Math.sin(p*Math.PI),.48+y*C,Ze(-1.43,_,C)),E=g%2?.85:1.15;t.vertex(T,[C,p],[[a,1]],ye(d.map(R=>R*E),.3))}}for(let g=0;g<18;g++)for(let p=0;p<6;p++){const y=m+g*7+p;t.quad(y,y+1,y+7,y+8)}const x=(g,p,y,_,v=1)=>{const C=Fe(...g).lerp(Fe(...p),.5);C.x+=v*y,t.leaf([g,C.toArray(),p],[.01,y*.8,.003],{bone:_,segments:16,across:8,ridge:.014,color:d,mask:.3})};for(const g of[-1,1]){e.ellipsoid([g*.22,.72,1.06],[.052,.07,.08],{bone:g<0?h:u,rings:12,radial:22,rotationY:g*1,paint(y){return y.z>.035&&Math.pow(y.x/.035,2)+Math.pow(y.y/.04,2)<1?ye([.005,.007,.004]):ye([.75,.59,.18])}});const p=i.bone(`fin${g}`,[g*.255,.42,.65],n);x([g*.255,.42,.65],[g*.63,.21,.11],.16,p,g),x([g*.2,.26,-.11],[g*.38,.13,-.57],.12,r,g),t.tube([[g*.24,.86,.71],[g*.31,.64,.67],[g*.24,.39,.69]],.009,.011,{segments:20,radial:6,bones:[s],paint:()=>ye([.19,.24,.12],.3)});for(let y=0;y<8;y++){const _=1.18+y*.04,v=g*(.12-y*.009);t.tube([[v,.445,_],[v*.9,.475,_+.005]],[.008,.001],[.008,.001],{segments:3,radial:5,bones:[l],paint:()=>ye([.78,.76,.56])})}}for(const g of[!0,!1]){const p=t.p.length/3,y=22;for(let _=0;_<=y;_++){const v=_/y,C=Ze(-.9,.18,v),T=g?.8+.22*v:.26-.1*v,E=Math.sin(Math.PI*v)*(g?.45:-.24),R=v<.5?r:n;for(let b=0;b<=6;b++){const S=b/6,L=Fe(.012*Math.sin(v*6),T+E*S,C-.1*S);t.vertex(L,[S,v],[[R,1]],ye(d.map(U=>U*(_%2?.85:1.1)),.2))}}for(let _=0;_<y;_++)for(let v=0;v<6;v++){const C=p+_*7+v;t.quad(C,C+1,C+7,C+8)}}return{type:"fish",rig:i,skin:t.geometry(),eyes:e.geometry(),mouth:c,length:3.65,height:1.65,scale:1}}function O_(i){if(Ml.has(i))return Ml.get(i);const t=256,e=new Uint8Array(t*t*4);for(let s=0;s<t;s++)for(let r=0;r<t;r++){const o=r/t,a=s/t;let l=.82+Gr(r,s)*.18;if(i==="frog"){const f=Math.floor(o*28),d=Math.floor(a*28),m=o*28-f-.5,x=a*28-d-.5,g=Math.hypot(m,x),p=Math.exp(-g*g*38)*(.1+Gr(f,d)*.18);l=.79+.16*Gr(r,s)+p-.11*Math.exp(-Math.pow(g-.31,2)*300)}else if(i==="snake"||i==="fish"){const u=i==="snake"?28:35,f=a*u,d=Math.floor(f),m=o*20+d%2*.5,x=m-Math.floor(m)-.5,g=f-d-.5,p=Math.abs(x)*1.4+Math.abs(g);l=.74+.22*(1-Gn(.49,.72,p))+.04*Gr(r,s)}else l=.79+.15*Math.sin(o*170+.4*Math.sin(a*31))**2+.06*Gr(r,s);const c=(s*t+r)*4,h=Math.floor($e(l)*255);e[c]=e[c+1]=e[c+2]=h,e[c+3]=255}const n=new qc(e,t,t,Fn);return n.wrapS=n.wrapT=xr,n.magFilter=ei,n.minFilter=Ki,n.generateMipmaps=!0,n.needsUpdate=!0,n.repeat.set(i==="heron"?1:2,i==="frog"?3:2),Ml.set(i,n),n}function B_(i,t){const e=O_(i),n=new yd({color:16777215,vertexColors:!0,map:e,bumpMap:e,bumpScale:i==="frog"?.013:i==="heron"?.007:.009,roughness:i==="frog"?.32:i==="heron"?.68:.37,metalness:0,clearcoat:i==="heron"?0:.42,clearcoatRoughness:.25,envMapIntensity:.8,side:Ue}),s=new te(t);return n.userData.tint=s,n.onBeforeCompile=r=>{r.uniforms.skinTint={value:s},r.vertexShader=`attribute float skinTintMask; varying float vSkinTint;
`+r.vertexShader,r.vertexShader=r.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vSkinTint = skinTintMask;`),r.fragmentShader=`uniform vec3 skinTint; varying float vSkinTint;
`+r.fragmentShader,r.fragmentShader=r.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
 diffuseColor.rgb *= mix(vec3(1.0),skinTint,vSkinTint);`)},n.customProgramCacheKey=()=>"anatomical-skin-v3",n}function H_(i,t){const e=new _n({color:i,side:Dn,transparent:!0,opacity:.91,depthWrite:!1,toneMapped:!1});return e.userData.thickness={value:t},e.onBeforeCompile=n=>{n.uniforms.outlineThickness=e.userData.thickness,n.vertexShader=`uniform float outlineThickness;
`+n.vertexShader,n.vertexShader=n.vertexShader.replace("#include <begin_vertex>","vec3 transformed = position + normal * outlineThickness;")},e.customProgramCacheKey=()=>"skeletal-silhouette-v3",e}function G_(i){const t=i.map(e=>{const n=new pd;return n.name=e.name,n});for(let e=0;e<i.length;e++){const n=i[e];t[e].position.fromArray(n.p),n.parent!==null&&n.parent!==void 0&&(t[e].position.sub(Fe(...i[n.parent].p)),t[n.parent].add(t[e]))}return{bones:t,skeleton:new $c(t),root:t[0]}}function V_(){if(!$i){const n=[],s=[];for(let o=0;o<=48;o++){const a=o/48*li,l=Math.sin(a),c=Math.cos(a),h=Math.abs(o%8-4)/4,u=-.018*c,f=u+.1+.205*h,d=1+.08*h;n.push(l*.255,u,c*.175,l*.27*d,f,c*.188*d,l*.231,u,c*.151,l*(.27*d-.024),f,c*(.188*d-.024))}for(let o=0;o<48;o++){const a=o*4,l=a+4;s.push(a,l,a+1,l,l+1,a+1),s.push(a+2,a+3,l+2,l+2,a+3,l+3),s.push(a+1,l+1,a+3,l+1,l+3,a+3),s.push(a,a+2,l,l,a+2,l+2)}$i=new Te,$i.setAttribute("position",new Wt(n,3)),$i.setIndex(s),$i.computeVertexNormals(),$i.computeBoundingSphere(),$i.computeBoundingBox(),bl=new Qc(.047,0),bl.scale(.78,1.05,.5)}const i=new re;i.name="royal-crown",i.position.set(0,.22,-.11);const t=new Jt($i,new Ve({color:15910746,roughness:.29,metalness:.58,emissive:5911813,emissiveIntensity:.12}));t.name="royal-crown-gold",t.castShadow=!0,t.receiveShadow=!0,i.add(t);const e=new Jt(bl,new Ve({color:14562379,roughness:.18,metalness:.2,flatShading:!0,emissive:4785420,emissiveIntensity:.12}));return e.name="royal-crown-ruby",e.position.set(0,.042,.195),i.add(e),i}function Gu(i,t=0){const e=i==="frog"&&t?`${i}:${t}`:i;if(!yl.has(e)){const n=i==="frog"?Hu([1,.36,.18][t]):({heron:N_,snake:k_,fish:F_}[i]||Hu)();for(const s of["skin","eyes","armor","shell","bracers","crest","tongue"])n[s]?.boundingSphere&&(n[s].boundingSphere.radius*=1.9);yl.set(e,n)}return yl.get(e)}function wl(i,t,e,n,s,r,o){const a=Math.hypot(n.y,n.z),l=Math.hypot(s.y,s.z),c=n.y+s.y+r,h=n.z+s.z+o,u=Math.max(Math.abs(a-l)+1e-5,Math.min(a+l-1e-5,Math.hypot(c,h))),f=Math.atan2(h,c),d=-Math.sign(n.y*s.z-n.z*s.y)||1,m=Math.acos($e((a*a+u*u-l*l)/(2*a*u),-1,1)),x=f+d*m,g=x-Math.atan2(n.z,n.y);i.rotation.x=Math.atan2(Math.sin(g),Math.cos(g));const p=Math.cos(x)*a,y=Math.sin(x)*a,_=Math.atan2(h-y,c-p)-i.rotation.x-Math.atan2(s.z,s.y);t.rotation.x=Math.atan2(Math.sin(_),Math.cos(_)),e.rotation.x=-i.rotation.x-t.rotation.x}function W_(i,t){if(!i)return{type:"",phase:0,force:0};let e="kick",n=t;return typeof i=="string"?e=i:typeof i=="number"?n=i:(e=i.type||i.kind||"kick",n=i.phase??i.progress??t),n=$e(n),{type:e,phase:n,force:Math.sin(n*Math.PI)}}function El(i,t,e){const n=i.points;if(t<=n[0].s)return e.copy(n[0]),e;for(let s=1;s<n.length;s++)if(t<=n[s].s){const r=n[s-1],o=n[s],a=(t-r.s)/(o.s-r.s||1);return e.set(Ze(r.x,o.x,a),Ze(r.y,o.y,a),Ze(r.z,o.z,a))}return e.copy(n.at(-1)),e}function X_(i="frog",t={}){["frog","heron","snake","fish"].includes(i)||(i="frog");const e=Gu(i),n=new re,s=new re;n.name=`creature-${i}`,s.name="anatomical-animation-pivot",n.add(s);const r=i==="frog"?7378989:i==="snake"?6715206:i==="fish"?8624996:16777215,o=B_(i,t.color??r);o.emissive.set(16777215),o.emissiveIntensity=0;const a=new yd({color:16777215,vertexColors:!0,roughness:.13,clearcoat:1,clearcoatRoughness:.05,metalness:.05}),{bones:l,skeleton:c,root:h}=G_(e.rig.defs),u=new zo(e.skin,o);u.name=`${i}-weighted-surface`,u.add(h),s.add(u),u.castShadow=!0,u.receiveShadow=!0,u.frustumCulled=!0,n.updateMatrixWorld(!0),u.bind(c);const f=new zo(e.eyes,a);f.name="articulated-eyes",f.bind(c,u.bindMatrix),f.castShadow=!1,f.frustumCulled=!0,s.add(f);const d=new zo(e.skin,H_(t.outlineColor??(t.team==="enemy"?16741200:t.team==="player"?11075554:i==="frog"?8513956:16755275),i==="frog"?.018:.027));d.name="animated-color-silhouette",d.bind(c,u.bindMatrix),d.frustumCulled=!0,d.renderOrder=-1,s.add(d);const m=[];for(const ht of["armor","shell","bracers","crest","tongue"])if(e[ht]){const $=new Ve({color:16777215,vertexColors:!0,roughness:ht==="tongue"?.35:.79,side:Ue}),rt=new zo(e[ht],$);rt.name=ht,rt.bind(c,u.bindMatrix),rt.frustumCulled=!0,rt.castShadow=ht!=="tongue",rt.visible=ht==="tongue",s.add(rt),m.push(rt)}const x={};for(const ht of l)x[ht.name]=ht;const g=l.map(ht=>ht.position.clone()),p=new We;p.name="mouth-attachment",l[e.mouth].add(p);let y=(t.seed||0)*.731,_=0,v="",C=1,T=0,E=0,R=0,b=!0,S=!1,L=null,U=1,Y=!1,J=0,H={x:0,z:1,strength:0,life:0,duration:.26,heavy:!1},q={armor:null,weapon:null,crest:!1};const B=t.role||"scout",O=i==="frog"?["guardian","brute","tank"].includes(B)?[1.15,1.12,1.05]:["scout","hunter","agile"].includes(B)?[.96,.98,1.04]:[1.03,1.02,1.02]:[1,1,1];s.scale.set(...O);const tt=()=>{const ht=1+(C-1)*.04+Math.min(24,Math.max(0,U-1))*.004;s.scale.set(O[0]*ht,O[1]*ht,O[2]*ht)},W=()=>{for(const ht of m)ht.name==="armor"&&(ht.visible=i==="frog"&&q.armor==="reed"),ht.name==="shell"&&(ht.visible=i==="frog"&&q.armor==="shell"),ht.name==="bracers"&&(ht.visible=i==="frog"&&q.weapon==="reed"),ht.name==="crest"&&(ht.visible=i==="frog"&&q.crest&&!S)},vt=()=>{for(let ht=0;ht<l.length;ht++)l[ht].rotation.set(0,0,0),l[ht].scale.set(1,1,1),l[ht].position.copy(g[ht])};let Xt=null;function Me(ht){if(i!=="snake"||!ht?.points?.length||!ht.weight)return;Xt||(Xt={targets:Array.from({length:21},()=>new he),local:new he,inverse:new he,point:Fe(),before:Fe(),after:Fe(),translation:Fe(),rotation:new es,scale:Fe(1,1,1),localPosition:Fe(),localRotation:new es,localScale:Fe()});const $=Xt,rt=$e(ht.weight),yt=ht.scale||1,Vt=ht.origin,kt=Math.cos(ht.yaw||0),fe=Math.sin(ht.yaw||0);s.position.y*=1-rt,s.rotation.x*=1-rt,s.rotation.z*=1-rt;for(let D=0;D<=20;D++){const ee=D?x["coil"+D]:x.head,Yt=1.97-D*.22,qt=(D?Yt:2.17)*yt;El(ht,qt,$.point),El(ht,qt-.07*yt,$.before),El(ht,qt+.07*yt,$.after);const Lt=$.after.x-$.before.x,ie=$.after.z-$.before.z,pt=Math.hypot(Lt,ie),Mt=pt>1e-4?Math.atan2(Lt,ie):ht.yaw||0;D||($.point.x-=Math.sin(Mt)*.2*yt,$.point.z-=Math.cos(Mt)*.2*yt);const le=($.point.x-Vt.x)/yt,Pe=($.point.z-Vt.z)/yt,P=Math.max($.point.y,$.before.y,$.after.y);$.translation.set(kt*le-fe*Pe,(P-Vt.y)/yt+(D?.26:.3),fe*le+kt*Pe),$.rotation.setFromAxisAngle(Cc,Mt-(ht.yaw||0)),$.targets[D].compose($.translation,$.rotation,$.scale),$.local.copy($.targets[D]),D&&$.local.premultiply($.inverse.copy($.targets[D-1]).invert()),$.local.decompose($.localPosition,$.localRotation,$.localScale),ee.position.lerp($.localPosition,rt),ee.quaternion.slerp($.localRotation,rt),ee.scale.lerp($.localScale,rt)}x.jaw.rotation.x*=1-rt*.8;const we=m.find(D=>D.name==="tongue");we&&rt>.8&&(we.visible=!1)}const ce={group:n,bones:x,skeleton:c,mesh:u,get crowned(){return S},get equipment(){return{...q}},get level(){return U},get working(){return Y},stats:{type:i,vertices:e.skin.attributes.position.count+e.eyes.attributes.position.count,triangles:(e.skin.index.count+e.eyes.index.count)/3,boneCount:l.length,length:e.length,height:e.height,rigged:!0,renderLOD:0},setOutline(ht,$=!0){ht!=null&&d.material.color.set(ht),b=$,d.visible=$&&R===0},setRenderLOD(ht=0){const $=i==="frog"?$e(Math.round(Number(ht)||0),0,2):0;if($===R)return;R=$;const rt=Gu(i,$);for(const yt of[u,f,d,...m])yt.geometry=rt[yt===u||yt===d?"skin":yt===f?"eyes":yt.name],yt.boundingSphere=null,yt.boundingBox=null,yt.castShadow=$===0&&yt!==f&&yt!==d&&yt.name!=="tongue";d.visible=b&&$===0,L&&(L.getObjectByName("royal-crown-gold").castShadow=$===0),ce.stats.vertices=rt.skin.attributes.position.count+rt.eyes.attributes.position.count,ce.stats.triangles=(rt.skin.index.count+rt.eyes.index.count)/3,ce.stats.renderLOD=$},setTier(ht){C=$e(Math.round(ht||1),1,5),tt()},setLevel(ht){U=$e(Math.floor(Number(ht)||1),1,999),tt()},setEquipment(ht={}){return q=i==="frog"?{armor:["reed","shell"].includes(ht?.armor)?ht.armor:null,weapon:ht?.weapon==="reed"?"reed":null,crest:ht?.crest===!0}:{armor:null,weapon:null,crest:!1},W(),{...q}},setWorking(ht=!1){Y=i==="frog"&&!!ht},setImpact(ht={}){const $=$e(Number(ht.strength)||0,0,1.5),rt=Number(ht.x)||0,yt=Number(ht.z)||0,Vt=Math.hypot(rt,yt)||1,kt=$e(Number(ht.duration)||.26,.08,.5);H={x:rt/Vt,z:yt/Vt,strength:$,life:$?kt:0,duration:kt,heavy:!!ht.heavy},o.emissiveIntensity=$?Math.min(.82,.34+$*.35):0},setCrowned(ht=!1){return S=i==="frog"&&!!ht,S&&!L&&(L=V_(),x.head.add(L)),L&&(L.visible=S,L.getObjectByName("royal-crown-gold").castShadow=R===0),W(),S},mouthWorld(ht=new z){return n.updateWorldMatrix(!0,!0),p.getWorldPosition(ht)},update(ht,$={}){ht=$e(Number(ht)||0,0,.1),y=$.time!==void 0?$.time+(t.seed||0)*.731:y+ht,vt();const rt=Math.max(0,Number($.speed)||0),yt=$e(rt/(i==="frog"?2.8:3));E=Ze(E,yt,1-Math.exp(-ht*12));const Vt=$.swimming?1:0,kt=typeof $.jump=="number"?$e($.jump):$.jump?.5:0,fe=typeof $.attack=="string"?$.attack:$.attack?.type||$.attack?.kind||($.attack?"kick":"");fe!==v?(_=0,v=fe):$.attack&&(_+=ht/.55);const we=W_($.attack,_),D=we.force,ee=typeof $.roar=="number"?$e($.roar):$.roar?1:0,Yt=typeof $.hit=="number"?$e($.hit):$.hit?1:0;H.life=Math.max(0,H.life-ht),o.emissiveIntensity=H.life>0?Math.max(0,1-(H.duration-H.life)/.07)*Math.min(.82,.34+H.strength*.35):0,$.building!==void 0&&(Y=i==="frog"&&!!$.building),J=Ze(J,Y&&!$.dead&&!we.type&&rt<1?1:0,1-Math.exp(-ht*12)),T=Ze(T,$.dead?1:0,1-Math.exp(-ht*5)),s.position.set(0,0,0),s.rotation.set(0,0,0);const qt=(y+(t.seed||0)*.4)%5.7,Lt=qt>5.5?.08+.92*Math.abs((qt-5.6)*10):1;if(x.eyeL&&(x.eyeL.scale.y=$e(Lt,.08,1)),x.eyeR&&(x.eyeR.scale.y=$e(Lt,.08,1)),i==="frog"){const ie=$.hop||(kt>0?{phase:"air",progress:1-kt}:{phase:"idle",progress:0}),pt=$e(ie.progress||0),Mt=ie.phase==="air",le=ie.phase==="gather"?pt:0,Pe=ie.phase==="land"?Math.sin(pt*Math.PI):0,P=Mt?Math.sin($e(pt/.14)*Math.PI/2)*(1-$e((pt-.16)/.48)):0,w=Mt?$e((pt-.82)/.18):0,Q=Mt?1-$e(pt/.14):0,at=Mt?$e((pt-.25)/.45)*(1-w):0,lt=Mt?$e((pt-.6)/.35):0,ot=y*7.8,Ut=Math.sin(ot)*E;s.position.y=Vt?-.14+.023*Math.sin(y*3):-.085*(le+Q)-.075*Pe,s.rotation.x=Vt?-.12:(le+Q)*.07-(Mt?Math.sin(pt*Math.PI)*.12:0)+lt*.08*(1-w),x.spine.rotation.x=Math.sin(y*2.6)*.009,x.spine.scale.y=1+Math.sin(y*2.6)*.018,x.head.rotation.x=.02*Math.sin(y*1.7)-ee*.18-(Mt?.04:0),x.jaw.rotation.x=-ee*.13-(we.type==="tongue"?D*.16:0),x.throat.scale.set(1+ee*.26,1+ee*1.45+Math.sin(y*2.5)*.035,1+ee*.25);for(const ct of[-1,1])if(Vt)x[`hip${ct}`].rotation.x=-.32*Ut,x[`hip${ct}`].rotation.z=ct*.07*Ut,x[`knee${ct}`].rotation.x=.62*Ut,x[`ankle${ct}`].rotation.x=-.25*Ut,x[`foot${ct}`].rotation.x=.2*Ut,x[`shoulder${ct}`].rotation.x=-.23*Ut,x[`elbow${ct}`].rotation.x=.28*Ut,x[`wrist${ct}`].rotation.x=-.12*Ut,x[`shoulder${ct}`].rotation.z=ct*(.22+.25*Ut),x[`elbow${ct}`].rotation.y=ct*.3;else if(!$.dead){const St=e.rig.ids,Pt=Mt?.085*Q+(-.1*P+.045*at)*(1-Q):-s.position.y,mt=Mt?.035*Q+(-.42*P+.11*at)*(1-Q):.035*le,Rt=Mt?.085*Q+(.085*(1-lt)-.035*lt)*(1-w)*(1-Q):-s.position.y,Zt=Mt?(-.075*(1-lt)+.13*lt)*(1-w)*(1-Q):0;wl(x[`hip${ct}`],x[`knee${ct}`],x[`ankle${ct}`],g[St[`knee${ct}`]],g[St[`ankle${ct}`]],Pt,mt),wl(x[`shoulder${ct}`],x[`elbow${ct}`],x[`wrist${ct}`],g[St[`elbow${ct}`]],g[St[`wrist${ct}`]],Rt,Zt),x[`foot${ct}`].rotation.x=-P*.14}if(we.type==="kick"||we.type==="strike"){s.rotation.y=-D*.55,s.rotation.z=D*.22,s.position.y+=D*.16;const ct=e.rig.ids;wl(x.hip1,x.knee1,x.ankle1,g[ct.knee1],g[ct.ankle1],.26*D,1.16*D),x.hip1.rotation.y=-D*.3,x.hip1.rotation.z=-D*.08,x["shoulder-1"].rotation.z=D*.55}else if(we.type==="slam"||we.type==="belly"){const ct=Math.sin(we.phase*Math.PI);s.rotation.x=-ct*.28,s.position.y+=ct*.22;for(const St of[-1,1])x[`hip${St}`].rotation.x-=ct*.7,x[`shoulder${St}`].rotation.z=St*ct*.45}else we.type==="tongue"&&(x.head.rotation.x-=D*.1,x.spine.rotation.x-=D*.07);if(J>.001){const ct=y*8.2,St=.5+.5*Math.sin(ct),Pt=.5+.5*Math.sin(ct+Math.PI);x.spine.rotation.x+=.1*J,x.head.rotation.x+=(.12+.06*St)*J,x.shoulder1.rotation.x-=(.25+St*.85)*J,x.elbow1.rotation.x+=(.2+St*.55)*J,x.wrist1.rotation.x-=St*.3*J,x["shoulder-1"].rotation.x-=(.13+Pt*.35)*J,x["elbow-1"].rotation.x+=(.15+Pt*.2)*J,s.position.y+=.025*Math.cos(ct)*J}if(H.life>0){const ct=1-H.life/H.duration,St=Math.sin(Math.min(1,ct/.22)*Math.PI/2)*Math.pow(1-ct,1.8)*H.strength,Pt=St*(H.heavy?1.2:1);s.rotation.x+=H.z*.17*Pt,s.rotation.z-=H.x*.21*Pt,s.position.x+=H.x*.045*Pt,s.position.z+=H.z*.055*Pt,x.spine.scale.z*=1-.075*St,x.head.rotation.x-=.15*Pt,x.head.rotation.z-=H.x*.08*Pt,x.jaw.rotation.x-=.12*Pt,x["shoulder-1"].rotation.z-=.1*Pt,x.shoulder1.rotation.z+=.1*Pt,x.eyeL.scale.y*=1-.55*St,x.eyeR.scale.y*=1-.55*St}else Yt>0&&(s.rotation.x+=Yt*.065);s.position.y-=T*.22,s.rotation.z+=T*1.35,x.spine.scale.y*=1-T*.15}else if(i==="heron"){const ie=y*5.6,pt=E;s.position.y=.035*Math.sin(ie*2)*pt,x.spine.rotation.x=-.03*Math.sin(ie)*pt,x.neck0.rotation.x=.1*Math.sin(y*1.4)-D*.62,x.neck1.rotation.x=-.08*Math.sin(y*1.4)+D*.58,x.neck2.rotation.x=-.03+D*.7,x.head.rotation.x=-.06*Math.sin(y*1.8)+D*.48,x.jaw.rotation.x=-D*.5;for(const Mt of[-1,1]){const le=ie+(Mt<0?Math.PI:0),Pe=Math.sin(le);x[`hip${Mt}`].rotation.x=Pe*.31*pt,x[`knee${Mt}`].rotation.x=Math.max(0,-Pe)*.57*pt,x[`foot${Mt}`].rotation.x=-.18*Pe*pt,x[`wing${Mt}`].rotation.y=Mt*(1.24-D*1.07-Yt*.55),x[`wing${Mt}`].rotation.z=Mt*(.07+D*(.5+.25*Math.sin(y*18))+Yt*.5),x[`wingElbow${Mt}`].rotation.y=Mt*.12,x[`wingWrist${Mt}`].rotation.z=Mt*D*.18}s.rotation.z+=(H.life>0?0:Yt*.08*Math.sin(y*32))+T*1.45,s.position.y-=T*1.8}else if(i==="snake"){const ie=y*(3+E*5),pt=.055+E*.105;for(let le=1;le<=20;le++)x[`coil${le}`].rotation.y=Math.sin(ie-le*.48)*pt,x[`coil${le}`].rotation.x=le<6?-D*.18*(1-le/7):.006*Math.sin(y*3-le);x.head.rotation.x=D*.45,x.head.rotation.y=Math.sin(ie)*.035,x.jaw.rotation.x=-D*.62,s.position.y=D*.28;const Mt=m.find(le=>le.name==="tongue");Mt&&(Mt.visible=!$.dead&&(Math.sin(y*3.7)>.77||D>.2)),s.rotation.z=T*.65+(H.life>0?0:Yt*.1*Math.sin(y*32))}else if(i==="fish"){const ie=y*(4+E*10),pt=.09+E*.22;x.spine.rotation.y=Math.sin(ie)*pt*.2,x.head.rotation.y=-Math.sin(ie)*pt*.13,x.tail0.rotation.y=Math.sin(ie-.5)*pt,x.tail1.rotation.y=Math.sin(ie-1.1)*pt*1.25,x.tail.rotation.y=Math.sin(ie-1.6)*pt*1.2,x.jaw.rotation.x=-D*.62-.035*Math.sin(y*2.5);for(const Mt of[-1,1])x[`fin${Mt}`].rotation.z=Mt*(.13+.16*Math.sin(y*6)),x[`fin${Mt}`].rotation.y=Mt*.15*Math.sin(y*5);s.rotation.x=-D*.35,s.position.y=.035*Math.sin(y*2),s.rotation.z=T*Math.PI+(H.life>0?0:Yt*.14*Math.sin(y*35))}if(i!=="frog"&&H.life>0){const ie=1-H.life/H.duration,pt=Math.sin(Math.min(1,ie/.22)*Math.PI/2)*Math.pow(1-ie,1.8)*H.strength*(H.heavy?1.2:1);s.rotation.x+=H.z*.055*pt,s.rotation.z-=H.x*.08*pt,x.head.rotation.x-=.075*pt,x.head.rotation.z-=H.x*.05*pt}i==="snake"&&Me($.snakePose)},dispose(){o.dispose(),a.dispose(),d.material.dispose();for(const ht of m)ht.material.dispose();L&&L.traverse(ht=>{ht.isMesh&&ht.material.dispose()}),c.dispose(),n.removeFromParent()}};return ce.setTier(t.tier||1),ce.setLevel(t.level||1),ce.setEquipment(t.equipment),ce.setCrowned(t.crowned),ce.update(0,{}),n.userData.creature=ce,ce}const mn=(i,t)=>Object.freeze({x:i,z:t}),Di=["player","rival-1","rival-2"],q_=.78,pi=.84,Pn=1e-5,Id=Object.freeze([{id:"catapult-player",owner:Di[0],x:0,z:12},{id:"catapult-rival-1",owner:Di[1],x:-14,z:-16},{id:"catapult-rival-2",owner:Di[2],x:14,z:-16}].map(Object.freeze)),Vn=Object.freeze([{id:"base-player",owner:Di[0],x:0,z:20.5,spawn:mn(-1,20.4),stock:mn(0,21.4),gate:mn(0,17.9),approach:mn(0,16.25),side:"north",halfWidth:3.1,halfDepth:2.6},{id:"base-rival-1",owner:Di[1],x:-18,z:1,spawn:mn(-18.1,0),stock:mn(-19.1,1),gate:mn(-14.9,1),approach:mn(-13.25,1),side:"east",halfWidth:3.1,halfDepth:2.9},{id:"base-rival-2",owner:Di[2],x:18,z:1,spawn:mn(18.1,2),stock:mn(19.1,1),gate:mn(14.9,1),approach:mn(13.25,1),side:"west",halfWidth:3.1,halfDepth:2.9}].map(Object.freeze)),$_=Object.freeze([{id:"yard-player",owner:Di[0],x:0,z:12,halfWidth:3,halfDepth:2.65,side:"south",gate:mn(0,14.65),approach:mn(0,16.25)},{id:"yard-rival-1",owner:Di[1],x:-13.5,z:-15.6,halfWidth:2.45,halfDepth:2.75,side:"south",gate:mn(-13.5,-12.85),approach:mn(-13.5,-11.2)},{id:"yard-rival-2",owner:Di[2],x:13.5,z:-15.6,halfWidth:2.45,halfDepth:2.75,side:"south",gate:mn(13.5,-12.85),approach:mn(13.5,-11.2)}].map(Object.freeze)),wa=Object.freeze([...Vn.map(i=>Object.freeze({...i,kind:"shelter",height:2.3})),...$_.map(i=>Object.freeze({...i,kind:"catapult",height:1.65}))]),$o=3.2,er=.34;function Y_(i){const t=[],e=(n,s,r,o,a,l="whole")=>t.push(Object.freeze({id:`${i.id}-${n}-${l}`,enclosureId:i.id,owner:i.owner,x:s,z:r,hw:o,hd:a,height:i.height}));for(const n of["north","south"]){const s=i.z+(n==="north"?-i.halfDepth:i.halfDepth);if(i.side===n){const r=(i.halfWidth-$o/2)/2;for(const o of[-1,1])e(n,i.x+o*($o/2+r),s,r,er/2,String(o))}else e(n,i.x,s,i.halfWidth+er/2,er/2)}for(const n of["west","east"]){const s=i.x+(n==="west"?-i.halfWidth:i.halfWidth);if(i.side===n){const r=(i.halfDepth-$o/2)/2;for(const o of[-1,1])e(n,s,i.z+o*($o/2+r),er/2,r,String(o))}else e(n,s,i.z,er/2,i.halfDepth+er/2)}return t}const ws=Object.freeze(wa.flatMap(Y_)),rh=Object.freeze([{id:"grove-west",x:-7,z:9,radius:3.1},{id:"grove-east",x:8,z:6.4,radius:3.1},{id:"grove-middle",x:0,z:-4.5,radius:3.4},{id:"grove-northwest",x:-7.2,z:-8.8,radius:2.5},{id:"grove-northeast",x:7.6,z:-9.2,radius:2.5}].map(Object.freeze)),co=Object.freeze([{x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6},{x:0,z:12,r:.95,machine:!0},{x:-14,z:-16,r:.95,machine:!0},{x:14,z:-16,r:.95,machine:!0}]);function Ea(i,t=0){return{minX:i.x-i.hw-t,maxX:i.x+i.hw+t,minZ:i.z-i.hd-t,maxZ:i.z+i.hd+t}}function oh(i,t,e,n=0){return i>e.minX+n&&i<e.maxX-n&&t>e.minZ+n&&t<e.maxZ-n}function zd(i,t,e,n,s,r=0){const o=Ea(s,r),a=e-i,l=n-t;let c=-1/0,h=1/0,u=0,f=0;for(const[d,m,x,g,p]of[[i,a,o.minX,o.maxX,"x"],[t,l,o.minZ,o.maxZ,"z"]]){if(Math.abs(m)<1e-12){if(d<x-Pn||d>g+Pn)return null;continue}const y=(x-d)/m,_=(g-d)/m,v=Math.min(y,_),C=Math.max(y,_);if(v>c&&(c=v,u=p==="x"?m>0?-1:1:0,f=p==="z"?m>0?-1:1:0),h=Math.min(h,C),c>h+Pn)return null}return h<0||c>1||c<0&&!oh(i,t,o,-Pn)?null:{t:Math.max(0,c),nx:u,nz:f}}function Ta(i,t,e,n,s=0){let r=1/0;for(const o of ws){const a=zd(i,t,e,n,o,s);a&&a.t<r&&(r=a.t)}return Number.isFinite(r)?r:null}function Rs(i,t,e=.1){return Ta(i.x,i.z,t.x,t.z,e)===null}function jr(i,t,e,n=q_){let s=i.x,r=i.z,o=Number.isFinite(t)?t:0,a=Number.isFinite(e)?e:0;for(let l=0;l<4;l++){let c=!1;for(const h of ws){const u=Ea(h,n);if(!oh(s,r,u,Pn))continue;const f=[{distance:s-u.minX,x:u.minX-Pn,z:r},{distance:u.maxX-s,x:u.maxX+Pn,z:r},{distance:r-u.minZ,x:s,z:u.minZ-Pn},{distance:u.maxZ-r,x:s,z:u.maxZ+Pn}];f.sort((d,m)=>d.distance-m.distance),s=f[0].x,r=f[0].z,c=!0}if(!c)break}for(let l=0;l<4&&(Math.abs(o)>Pn||Math.abs(a)>Pn);l++){let c=null;for(const d of ws){const m=zd(s,r,s+o,r+a,d,n);m&&(!c||m.t<c.t)&&(c=m)}if(!c){s+=o,r+=a;break}const h=Math.max(0,c.t-Pn);s+=o*h,r+=a*h;const u=1-c.t;o*=u,a*=u;const f=o*c.nx+a*c.nz;if(f<0)o-=c.nx*f,a-=c.nz*f;else break}return{x:s,z:r}}function Aa(i){return rh.find(t=>Math.hypot(i.x-t.x,i.z-t.z)<=t.radius)||null}function Z_(i){return Aa(i)?.55:1}function j_(i){return wa.find(t=>Math.abs(i.x-t.x)<t.halfWidth&&Math.abs(i.z-t.z)<t.halfDepth)||null}function K_(i,t,e,n){const s=t.x-i.x,r=t.z-i.z,o=s*s+r*r,a=o?Math.max(0,Math.min(1,((e.x-i.x)*s+(e.z-i.z)*r)/o)):0;return Math.hypot(i.x+a*s-e.x,i.z+a*r-e.z)<n-Pn}function fr(i,t){return Rs(i,t,pi)&&co.every(e=>!K_(i,t,e,e.r+pi))}function J_(i){return Math.hypot(i.x,i.z)<=23.85&&ws.every(t=>!oh(i.x,i.z,Ea(t,pi),-Pn))&&co.every(t=>Math.hypot(i.x-t.x,i.z-t.z)>t.r+pi+Pn)}let Yo=null;const nr=new WeakMap;function Q_(){if(Yo)return Yo;const i=[],t=(n,s)=>{const r={x:n,z:s};J_(r)&&!i.some(o=>Math.hypot(o.x-n,o.z-s)<.1)&&i.push(r)};for(const n of ws){const s=Ea(n,pi+.06);for(const r of[s.minX,s.maxX])for(const o of[s.minZ,s.maxZ])t(r,o)}for(const n of co)for(let s=0;s<12;s++){const r=s*Math.PI/6,o=(n.r+pi+.08)/Math.cos(Math.PI/12);t(n.x+Math.cos(r)*o,n.z+Math.sin(r)*o)}for(const n of wa)t(n.gate.x,n.gate.z),t(n.approach.x,n.approach.z),t(n.gate.x+(n.x-n.gate.x)*.4,n.gate.z+(n.z-n.gate.z)*.4);const e=i.map(()=>[]);for(let n=0;n<i.length;n++)for(let s=n+1;s<i.length;s++)if(fr(i[n],i[s])){const r=Math.hypot(i[n].x-i[s].x,i[n].z-i[s].z);e[n].push([s,r]),e[s].push([n,r])}return Yo={nodes:i,edges:e},Yo}function t1(i,t){let e={x:t.x,z:t.z};const n=co.find(s=>s.machine&&Math.hypot(e.x-s.x,e.z-s.z)<s.r+pi);return n&&(e={x:n.x,z:n.z+2.05}),jr(e,0,0,pi+.02)}function e1(i,t){const{nodes:e,edges:n}=Q_(),s=e.length,r=new Float64Array(s),o=new Int32Array(s),a=new Uint8Array(s);r.fill(1/0),o.fill(-1);const l=new Map;for(let f=0;f<s;f++)fr(i,e[f])&&(r[f]=Math.hypot(i.x-e[f].x,i.z-e[f].z)),fr(e[f],t)&&l.set(f,Math.hypot(t.x-e[f].x,t.z-e[f].z));let c=-1,h=1/0;for(let f=0;f<s;f++){let d=-1,m=1/0;for(let x=0;x<s;x++)!a[x]&&r[x]<m&&(m=r[x],d=x);if(d<0||m>=h)break;a[d]=1,l.has(d)&&m+l.get(d)<h&&(c=d,h=m+l.get(d));for(const[x,g]of n[d])m+g<r[x]&&(r[x]=m+g,o[x]=d)}if(c<0)return[];const u=[t];for(let f=c;f>=0;f=o[f])u.unshift(e[f]);return u}function Ld(i,t){if(!Number.isFinite(t?.x)||!Number.isFinite(t?.z))return{x:0,z:0};const e=jr(i,0,0,pi+.02),n=Math.hypot(e.x-i.x,e.z-i.z);if(n>.005)return nr.delete(i),{x:(e.x-i.x)/n,z:(e.z-i.z)/n};for(const c of co){const h=i.x-c.x,u=i.z-c.z,f=Math.hypot(h,u);if(f<c.r+pi+.01)return nr.delete(i),f>1e-6?{x:h/f,z:u/f}:{x:0,z:1}}const s=t1(i,t),r=Math.hypot(s.x-i.x,s.z-i.z);if(r<.18)return nr.delete(i),{x:0,z:0};if(fr(i,s))return nr.delete(i),{x:(s.x-i.x)/r,z:(s.z-i.z)/r};let o=nr.get(i);for((!o||Math.hypot(o.goal.x-s.x,o.goal.z-s.z)>1.1||Math.hypot(o.lastX-i.x,o.lastZ-i.z)>3)&&(o={goal:s,path:e1(i,s),lastX:i.x,lastZ:i.z},nr.set(i,o)),o.lastX=i.x,o.lastZ=i.z;o.path.length&&Math.hypot(o.path[0].x-i.x,o.path[0].z-i.z)<.18&&(o.path.length===1||fr(i,o.path[1]));)o.path.shift();for(let c=o.path.length-1;c>0;c--)if(fr(i,o.path[c])){o.path.splice(0,c);break}const a=o.path[0];if(!a)return{x:0,z:0};const l=Math.hypot(a.x-i.x,a.z-i.z);return l?{x:(a.x-i.x)/l,z:(a.z-i.z)/l}:{x:0,z:0}}const De=Object.freeze({delivery:"catapult",interactionRange:3,baseRadius:.95,minRange:5,maxRange:28,blastRadius:2.8,innerRadius:1.25,flightTime:1.25,arcHeight:8,cooldown:3,recoilDuration:.45,centerLift:.85,rimLift:.45,centerRecovery:.48,rimRecovery:.42}),ah=Id,n1=(i,t,e)=>Math.max(t,Math.min(e,i));function i1(i,t,e,n=.6){const s=Math.hypot(t,e),r=s>1e-6?t/s:0,o=s>1e-6?e/s:-1,a=De.minRange+(De.maxRange-De.minRange)*n1(Number.isFinite(n)?n:.6,0,1),l=i.x*r+i.z*o,c=576-i.x*i.x-i.z*i.z,h=Math.max(0,-l+Math.sqrt(Math.max(0,l*l+c))),u=Math.min(a,h);return{x:i.x+r*u,z:i.z+o*u,range:u,valid:u>=De.minRange-1e-6}}function s1(){return ah.map(i=>({...i,occupant:null,cooldown:0,loaded:!0,aimX:0,aimZ:-1,recoil:0}))}function Ud(i,t){return i.catapults.filter(e=>(e.owner===t.id||!e.owner)&&(!e.occupant||e.occupant===t.id)&&Math.hypot(e.x-t.x,e.z-t.z)<=De.interactionRange&&Rs(t,e,.1)).sort((e,n)=>Math.hypot(e.x-t.x,e.z-t.z)-Math.hypot(n.x-t.x,n.z-t.z))[0]||null}function Es(i,t){const e=i.catapults.find(s=>s.id===t.catapultId);if(e?.occupant===t.id){e.occupant=null,t.x=e.x,t.z=e.z+2.3;const s=Math.hypot(t.x,t.z);s>24&&(t.x*=24/s,t.z*=24/s)}const n=!!t.catapultId;return t.catapultId=null,t.catapultShots=0,t.interactHeld=!1,n}function r1(i,t){if(t.catapultId)return Es(i,t);if(t.ko||t.dizzyTime>0||t.knockUp>0||t.kick>0||t.id!=="player"&&i.phase!=="battle")return!1;const e=Ud(i,t);return e?(e.occupant=t.id,t.catapultId=e.id,t.catapultShots=0,t.catapultAim=1,t.x=e.x,t.z=e.z,t.hop=0,t.height=0,t.idle=0,t.hopX=t.hopZ=0,t.impulseX=t.impulseZ=0,i.events.push({type:"catapultMount",id:t.id,catapultId:e.id}),!0):!1}function o1(i,t,e){const n=i.catapults.find(d=>d.id===t.catapultId);if(i.phase!=="battle"||t.ko||t.dizzyTime>0||t.hit>0||t.knockUp>0||!n||n.occupant!==t.id||!n.loaded||n.cooldown>0||e?.valid===!1||!Number.isFinite(e?.x)||!Number.isFinite(e?.z))return!1;let s=e.x,r=e.z;const o=Math.hypot(s,r);o>24&&(s*=24/o,r*=24/o);const a=s-n.x,l=r-n.z,c=Math.hypot(a,l);if(c<De.minRange-1e-6)return!1;const h=a/c,u=l/c;c>De.maxRange&&(s=n.x+h*De.maxRange,r=n.z+u*De.maxRange);const f={id:i.nextId++,owner:t.id,catapultId:n.id,startX:n.x+h,startZ:n.z+u,startHeight:1.6,tx:s,tz:r,age:0,duration:De.flightTime,arcHeight:De.arcHeight};return n.aimX=h,n.aimZ=u,n.loaded=!1,n.cooldown=De.cooldown,n.recoil=De.recoilDuration,t.catapultShots++,i.shells.push(f),i.events.push({type:"stoneShot",id:t.id,shellId:f.id,catapultId:n.id}),!0}function a1(i,t,e){for(const n of i.catapults)if(n.cooldown=Math.max(0,n.cooldown-t),n.recoil=Math.max(0,n.recoil-t),n.loaded=n.cooldown===0,n.occupant){const s=i.actors.find(r=>r.id===n.occupant);(!s||s.ko||s.dizzyTime>0||s.knockUp>0||s.catapultId!==n.id)&&(s&&s.catapultId===n.id?Es(i,s):n.occupant=null)}for(const n of i.shells)if(n.age+=t,!(n.age<n.duration)&&(i.events.push({type:"stoneImpact",id:n.id,owner:n.owner,x:n.tx,z:n.tz,radius:De.blastRadius}),i.phase==="battle"))for(const s of i.actors){const r=s.x-n.tx,o=s.z-n.tz,a=Math.hypot(r,o);if(s.ko||a>De.blastRadius||!Rs({x:n.tx,z:n.tz},s,0))continue;const l=n.tx-n.startX,c=n.tz-n.startZ,h=Math.hypot(l,c)||1,u=a>1e-6?{dx:r/a,dz:o/a}:{dx:l/h,dz:c/h},f=a<=De.innerRadius;e(i,s,{owner:n.owner,...u,damage:f?4:2,force:f?12:8,lift:f?De.centerLift:De.rimLift,liftDuration:f?De.centerRecovery:De.rimRecovery})}i.shells=i.shells.filter(n=>n.age<n.duration)}const Tl="4.3.0",Zo="frog-arcade-save-v1",Al="frog-arcade-settings-v1",At=Object.freeze({radius:25,capacity:60,dizzyHits:6,finishHits:3,dizzySeconds:4.5,tongueRange:3.2,pickupRange:3.2,tongueInterval:.22,kickRange:3.6,kickCooldown:1.1,kickDuration:.48,hopDuration:.3,landingDuration:.035,shotInterval:.14,projectileSpeed:32,projectileLifetime:.65,introSeconds:20,sabotageSeconds:10,sabotageRange:2.4,sabotageRecovery:.55,respawnSeconds:12,revealSeconds:2.5}),Cs=Object.freeze([{x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6}]),yr=Object.freeze([[0,3.5],[-13,8],[13,1],[-12,-11],[10,-14],[2,17]].map(([i,t],e)=>Object.freeze({id:`swarm-${e}`,x:i,z:t,radius:2.1}))),rn=(i,t,e)=>Math.max(t,Math.min(e,i)),Qe=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z),qn=(i,t)=>{const e=Math.hypot(i,t);return e>1e-6?{x:i/e,z:t/e}:{x:0,z:1}},Ye=(i,t=0)=>Number.isFinite(i)?i:t;function Ai(i){let t=i.seed+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Nd(i,t,e){return{id:i,x:t,z:e,aimX:0,aimZ:-1,aiming:!1,face:Math.PI,ammo:0,load:0,dizzy:0,finishHits:0,dizzyTime:0,ko:!1,eliminated:!1,respawnTime:0,hit:0,invuln:0,shot:0,tongue:0,kick:0,kickCooldown:0,kickPending:!1,impulseX:0,impulseZ:0,hop:0,hopX:0,hopZ:0,hopSpeed:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0,brain:0,decision:0,catapultId:null,catapultShots:0,catapultAim:0,interactHeld:!1,machineTimer:i==="rival-1"?8:12,machineSeeking:!1,aimWindup:0,aiShotReady:0,aiCharging:!1,aiAimX:0,aiAimZ:-1,refilling:!0,raidId:null,sabotageId:null,sabotageRecovery:0,revealedTime:0}}function Ps(i,t){return i.bases?.find(e=>e.owner===t.id)||null}const Ri=i=>Vn.find(t=>t.id===i?.id);function Kr(i,t,e){const n=Math.max(1,Math.ceil(Math.hypot(t,e)/.35));for(let s=0;s<n;s++){let{x:r,z:o}=jr(i,t/n,e/n);for(const c of Cs){const h=Math.hypot(r-c.x,o-c.z),u=c.r+.78;if(h<u){const f=qn(r-c.x,o-c.z);r=c.x+f.x*u,o=c.z+f.z*u}}for(const c of ah){if(i.catapultId===c.id)continue;const h=Math.hypot(r-c.x,o-c.z),u=De.baseRadius+.78;if(h<u){const f=qn(r-c.x,o-c.z);r=c.x+f.x*u,o=c.z+f.z*u}}({x:r,z:o}=jr(i,r-i.x,o-i.z));const a=Math.hypot(r,o);a>At.radius-1&&(r*=(At.radius-1)/a,o*=(At.radius-1)/a);const l=jr({x:r,z:o},0,0);i.x=l.x,i.z=l.z}}function ma(i,t,e,n,s,r){const o=e-i,a=n-t,l=i-s.x,c=t-s.z,h=o*o+a*a,u=l*l+c*c-r*r;if(u<=0)return 0;if(h<1e-12)return null;const f=2*(l*o+c*a),d=f*f-4*h*u;if(d<0)return null;const m=(-f-Math.sqrt(d))/(2*h);return m>=0&&m<=1?m:null}function is(i,t){return Rs(i,t,.1)&&Cs.every(e=>ma(i.x,i.z,t.x,t.z,e,e.r+.1)===null)}function l1(i,t){return!t.ko&&!t.eliminated&&Qe(i,t)<=23&&is(i,t)&&(!Aa(t)||t.revealedTime>0||Qe(i,t)<2.2)}function kd(i,t){const e=yr[Math.floor(t.id/12)];t.swarmId=e.id;const n=Ai(i)*Math.PI*2,s=Math.sqrt(Ai(i))*e.radius;t.x=e.x+Math.sin(n)*s,t.z=e.z+Math.cos(n)*s,t.wait=0,t.phase=Ai(i)*Math.PI*2}function Pc(i=731){const t={version:2,swarmVersion:1,seed:i,time:0,status:"playing",phase:"countdown",intro:At.introSeconds,actors:Vn.map(e=>Nd(e.owner,e.spawn.x,e.spawn.z)),bases:Vn.map(e=>({id:e.id,owner:e.owner,x:e.x,z:e.z,destroyed:!1,progress:0,attackerId:null})),flies:[],catapults:s1(),shells:[],bullets:[],events:[],nextId:1,stats:{caught:0,shots:0,hits:0,kos:0,basesDestroyed:0}};for(let e=0;e<72;e++){const n={id:e,swarmId:"",x:0,z:0,wait:0,phase:0};kd(t,n),t.flies.push(n)}return t}function c1(i,t){const e=Math.hypot(i,t);return{x:e>.08?i/Math.max(1,e):0,z:e>.08?t/Math.max(1,e):0,fire:e>=.72}}function Dc(i,t){return i.actors.filter(e=>e!==t&&!e.ko&&Qe(t,e)<=At.kickRange&&is(t,e)).sort((e,n)=>Qe(t,e)-Qe(t,n))[0]||null}function h1(i,t){if(t.ko||t.eliminated||t.dizzyTime>0||t.catapultId||t.tongue>0||t.ammo>=At.capacity)return!1;const e=Ps(i,t),n=Ri(e)?.stock;if(e&&!e.destroyed&&n&&Qe(t,n)<=At.pickupRange&&is(t,n))return t.tongue=At.tongueInterval,t.ammo++,i.events.push({type:"tongue",id:t.id,x:n.x,z:n.z,baseId:e.id}),t.id==="player"&&i.stats.caught++,!0;const s=i.flies.filter(r=>r.wait<=0&&Qe(t,r)<=At.pickupRange&&is(t,r)).sort((r,o)=>Qe(t,r)-Qe(t,o))[0];return s?(t.tongue=At.tongueInterval,t.ammo++,s.wait=7+Ai(i)*4,i.events.push({type:"tongue",id:t.id,x:s.x,z:s.z,swarmId:s.swarmId}),t.id==="player"&&i.stats.caught++,!0):!1}function u1(i,t){if(t.ko||t.eliminated||t.dizzyTime>0||t.hit>0||t.catapultId||t.knockUp>0||t.shot>0||t.ammo<=0||t.id!=="player"&&i.phase!=="battle")return!1;t.shot=At.shotInterval,t.ammo--,t.revealedTime=At.revealSeconds;const e=qn(t.aimX,t.aimZ),n=t.x+e.x*1.2,s=t.z+e.z*1.2;let r=Ta(t.x,t.z,n,s,.1);for(const o of Cs){const a=ma(t.x,t.z,n,s,o,o.r+.1);a!==null&&(r===null||a<r)&&(r=a)}return r!==null?i.events.push({type:"splat",x:t.x+(n-t.x)*r,z:t.z+(s-t.z)*r,wall:!0,dx:e.x,dz:e.z}):i.bullets.push({id:i.nextId++,owner:t.id,x:n,z:s,dx:e.x,dz:e.z,life:At.projectileLifetime}),i.events.push({type:"shot",id:t.id}),t.id==="player"&&i.stats.shots++,!0}function oo(i,t,e="interrupted"){for(const n of i.bases||[])n.attackerId!==t.id||n.destroyed||(n.progress>0&&i.events.push({type:"sabotageInterrupted",baseId:n.id,id:n.owner,by:t.id,reason:e}),n.progress=0,n.attackerId=null);t.sabotageId=null}function d1(i,t,e){oo(i,t,"knockout"),Es(i,t),t.ko=!0,t.dizzyTime=0,t.hop=0,t.knockUp=0,t.knockUpStart=0,t.height=.9,t.impulseX=e.dx*17,t.impulseZ=e.dz*17,t.ammo=0,t.aiCharging=!1,t.respawnTime=Ps(i,t)?.destroyed?0:At.respawnSeconds,i.events.push({type:"ko",id:t.id,by:e.owner,x:t.x,z:t.z,dx:e.dx,dz:e.dz}),e.owner==="player"&&t.id!=="player"&&i.stats.kos++}function Ic(i,t,e){if(t.ko||t.eliminated||t.invuln>0)return!1;const n=Math.max(0,t.height),s=qn(Ye(e.dx),Ye(e.dz)),r=rn(Ye(e.force,5),0,30);let o=rn(Math.floor(Ye(e.damage,1)),1,9);if(oo(i,t,"hit"),t.sabotageRecovery=At.sabotageRecovery,t.aiCharging=!1,t.aimWindup=0,t.aiShotReady=Math.max(t.aiShotReady,.4),t.hit=.23,t.invuln=.12,t.impulseX=s.x*r,t.impulseZ=s.z*r,t.revealedTime=At.revealSeconds,t.dizzyTime<=0){const a=Math.min(o,At.dizzyHits-t.dizzy);t.dizzy+=a,o-=a,t.dizzy>=At.dizzyHits&&(t.dizzy=At.dizzyHits,t.dizzyTime=At.dizzySeconds,t.finishHits=0,t.hop=0,t.knockUp<=0&&(t.height=0),Es(i,t),i.events.push({type:"dizzy",id:t.id}))}return t.dizzyTime>0&&o>0&&(t.finishHits=Math.min(At.finishHits,t.finishHits+o)),Ye(e.lift)>0&&(Es(i,t),t.knockUpDuration=rn(Ye(e.liftDuration,.48),.25,.65),t.knockUp=t.knockUpDuration,t.knockUpPeak=rn(e.lift,.1,1.2),t.knockUpStart=n,t.height=n,t.hop=0,t.hopX=t.hopZ=0,t.hopSpeed=0,t.kick=0,t.kickPending=!1),i.events.push({type:"hit",id:t.id,owner:e.owner,x:t.x,z:t.z,dx:s.x,dz:s.z}),e.owner==="player"&&t.id!=="player"&&i.stats.hits++,t.finishHits>=At.finishHits&&d1(i,t,{...e,dx:s.x,dz:s.z}),!0}function f1(i,t){if(i.phase!=="battle"||t.ko||t.eliminated||t.dizzyTime>0||t.hit>0||t.catapultId||t.knockUp>0||t.kick>0||t.kickCooldown>0)return!1;const e=Dc(i,t);if(!e)return!1;const n=qn(e.x-t.x,e.z-t.z);return t.aimX=n.x,t.aimZ=n.z,t.kick=At.kickDuration,t.kickCooldown=At.kickCooldown,t.kickPending=!0,t.kickId=e.id,t.revealedTime=At.revealSeconds,i.events.push({type:"kick",id:t.id}),!0}function p1(i,t){t.kickPending=!1;const e=i.actors.find(s=>s.id===t.kickId);if(!e||e.ko||Qe(t,e)>At.kickRange+.25||!is(t,e))return;const n=qn(e.x-t.x,e.z-t.z);Ic(i,e,{owner:t.id,dx:n.x,dz:n.z,damage:1,force:14}),e.ko||(e.impulseX=n.x*14,e.impulseZ=n.z*14)}function Ra(i,t){return t.ko||t.eliminated||t.catapultId?null:(i.bases||[]).filter(e=>!e.destroyed&&e.owner!==t.id&&Qe(t,Ri(e).stock)<=At.sabotageRange&&is(t,Ri(e).stock)).sort((e,n)=>Qe(t,Ri(e).stock)-Qe(t,Ri(n).stock))[0]||null}function m1(i,t,e){t.destroyed=!0,t.progress=At.sabotageSeconds,t.attackerId=e.id,e.sabotageId=null;const n=i.actors.find(s=>s.id===t.owner);n&&(oo(i,n,"eliminated"),Es(i,n),n.eliminated=!0,n.ko=!0,n.respawnTime=0,n.ammo=0,n.dizzyTime=0,n.hop=0,n.height=0,n.knockUp=0),e.id==="player"&&i.stats.basesDestroyed++,i.events.push({type:"baseDestroyed",baseId:t.id,id:t.owner,by:e.id,x:t.x,z:t.z})}function g1(i,t,e){for(const n of i.bases){if(n.destroyed)continue;const s=i.actors.filter(l=>t.get(l.id)===n.id&&!l.ko&&!l.eliminated&&l.dizzyTime<=0&&l.hit<=0&&l.sabotageRecovery<=0&&l.knockUp<=0&&l.kick<=0&&l.shot<=0&&l.hop<=0&&Ra(i,l)?.id===n.id),r=s.find(l=>l.id===n.attackerId)||s.sort((l,c)=>l.id.localeCompare(c.id))[0];if(!r){if(n.attackerId){const l=i.actors.find(c=>c.id===n.attackerId);l&&oo(i,l,"released")}continue}if(n.attackerId!==r.id){if(n.attackerId){const l=i.actors.find(c=>c.id===n.attackerId);l&&oo(i,l,"interrupted")}n.progress=0,n.attackerId=r.id,r.sabotageId=n.id,i.events.push({type:"sabotageStart",baseId:n.id,id:n.owner,by:r.id})}const o=Ri(n).stock,a=qn(o.x-r.x,o.z-r.z);r.sabotageId=n.id,r.aiming=!1,r.face=Math.atan2(a.x,a.z),r.aimX=a.x,r.aimZ=a.z,r.revealedTime=At.revealSeconds,n.progress=Math.min(At.sabotageSeconds,n.progress+e),n.progress>=At.sabotageSeconds-1e-8&&m1(i,n,r)}}function jo(i,t,e={}){const n=Ld(i,t);return{mx:n.x,mz:n.z,aiming:!1,...e}}function rr(i){i.aiCharging=!1,i.aimWindup=0}function Rl(i,t,e){const n=Qe(t,e),s=qn(e.x-t.x,e.z-t.z);t.brain-=1/60,t.brain<=0&&(t.brain=.7+Ai(i)*.5,t.decision=Ai(i)>.5?1:-1);let r=!1;if(n<16&&t.ammo>0&&is(t,e))if(!t.aiCharging&&t.aiShotReady<=0){const l=(Ai(i)-.5)*.08,c=Math.cos(l),h=Math.sin(l);t.aiAimX=s.x*c-s.z*h,t.aiAimZ=s.x*h+s.z*c,t.aimWindup=.32,t.aiCharging=!0}else t.aiCharging&&t.aimWindup<=0&&(r=!0,t.aiCharging=!1,t.aiShotReady=.22+Ai(i)*.1);else rr(t);let o=0,a=0;if(n>11){const l=Ld(t,e);o=l.x,a=l.z}else{const l=n<6?-1:0;o=s.x*l+s.z*t.decision*.45,a=s.z*l-s.x*t.decision*.45}return{mx:o,mz:a,aiming:!0,ax:t.aiCharging||r?t.aiAimX:s.x,az:t.aiCharging||r?t.aiAimZ:s.z,fire:r,kick:n<3.3}}function x1(i,t){if(i.phase!=="battle"||t.ko||t.eliminated)return{};if(t.hit>0){rr(t);const h=qn(t.impulseX,t.impulseZ);return{mx:h.x,mz:h.z,aiming:!1}}const e=Ps(i,t),n=Ri(e),s=i.actors.filter(h=>h!==t&&l1(t,h)).sort((h,u)=>Qe(t,h)-Qe(t,u)),r=s[0],o=r?Qe(t,r):1/0;if(t.catapultId){if(!r||o<7||t.catapultShots>=2)return t.machineTimer=18,t.machineSeeking=!1,{interactCatapult:!0};const h=i.catapults.find(f=>f.id===t.catapultId),u=qn(r.x-t.x,r.z-t.z);return{aiming:!0,ax:u.x,az:u.z,throwStone:h?.loaded&&t.catapultAim<=0?{x:r.x,z:r.z}:void 0}}if(t.ammo<6&&(t.refilling=!0),t.ammo>=48&&(t.refilling=!1),t.refilling&&e&&!e.destroyed)return rr(t),Qe(t,n.stock)<=At.pickupRange-.35&&is(t,n.stock)?r&&o<5&&t.ammo>0?Rl(i,t,r):{}:jo(t,n.stock);if(e?.attackerId&&e.attackerId!==t.id){const h=s.find(u=>u.id===e.attackerId);return h?Rl(i,t,h):(rr(t),jo(t,n.stock))}if(!i.bases.find(h=>h.id===t.raidId&&!h.destroyed&&h.owner!==t.id)){const h=i.bases.filter(f=>!f.destroyed&&f.owner!==t.id),u=t.id==="rival-1"?"rival-2":"player";t.raidId=(h.find(f=>f.owner===u)||h[0])?.id||null}const l=i.bases.find(h=>h.id===t.raidId),c=Ri(l)?.stock;if(l&&Qe(t,c)<=At.sabotageRange-.2&&(t.sabotageId===l.id||!r||o>6.5))return rr(t),t.machineSeeking=!1,{sabotage:!0,aiming:!1};if(r&&o<16){const h=i.catapults.find(u=>u.owner===t.id&&!u.occupant);if(t.machineTimer<=0&&!t.machineSeeking&&(t.machineSeeking=!!h&&o>11&&Ai(i)<.35,t.machineTimer=8),t.machineSeeking&&h)if(o<7)t.machineSeeking=!1,t.machineTimer=12;else return jo(t,{x:h.x,z:h.z+2.2},{interactCatapult:Qe(t,h)<=De.interactionRange&&Rs(t,h)});return Rl(i,t,r)}return rr(t),c?jo(t,c):{}}function v1(i,t){const e=Ps(i,t),n=Ri(e);if(!e||e.destroyed||!n)return;const s=Nd(t.id,n.spawn.x,n.spawn.z);Object.assign(t,s,{invuln:1,refilling:!0}),i.events.push({type:"respawn",id:t.id,x:t.x,z:t.z})}function Fd(i){const t=i.bases.find(n=>n.owner==="player"),e=i.bases.filter(n=>!n.destroyed);t?.destroyed?i.status="lost":e.length===1&&e[0].owner==="player"&&(i.status="won")}function Vu(i,t={},e=1/60){if(i.status!=="playing"||(i.events.length=0,e=rn(Ye(e),0,.05),e===0))return;i.time+=e,i.phase==="countdown"&&(i.intro=Math.max(0,i.intro-e),i.intro<1e-8&&(i.intro=0,i.phase="battle",i.events.push({type:"battle"})));for(const s of i.flies)s.wait>0&&(s.wait-=e,s.wait<=0&&kd(i,s));const n=new Map;for(const s of i.actors){for(const u of["shot","tongue","invuln","hit","idle","kickCooldown","aimWindup","aiShotReady","catapultAim","sabotageRecovery","revealedTime"])s[u]=Math.max(0,s[u]-e);if(i.phase==="battle"&&(s.machineTimer=Math.max(0,s.machineTimer-e)),s.ko){Es(i,s),Kr(s,s.impulseX*e,s.impulseZ*e),s.impulseX*=Math.exp(-e*3),s.impulseZ*=Math.exp(-e*3),s.height=Math.max(0,s.height-e*1.6),!s.eliminated&&!Ps(i,s)?.destroyed&&(s.respawnTime=Math.max(0,s.respawnTime-e),s.respawnTime<1e-8&&v1(i,s));continue}s.kick>0&&(s.kick=Math.max(0,s.kick-e),s.kickPending&&s.kick<.3&&p1(i,s)),s.dizzyTime>0&&(s.dizzyTime=Math.max(0,s.dizzyTime-e),s.dizzyTime===0&&(s.dizzy=0,s.finishHits=0,s.invuln=.55,i.events.push({type:"recover",id:s.id})));const r=s.id==="player"?t:x1(i,s);r.interactCatapult&&!s.interactHeld&&r1(i,s),s.interactHeld=!!r.interactCatapult;const o=s.catapultId?0:Ye(r.mx),a=s.catapultId?0:Ye(r.mz),l=Math.hypot(o,a),c=l>.08&&s.knockUp<=0,h=Number.isFinite(r.ax)&&Number.isFinite(r.az)&&Math.hypot(r.ax,r.az)>.05;if(s.aiming=r.aiming===void 0?h:r.aiming===!0,s.aiming&&h){const u=qn(r.ax,r.az);s.aimX=u.x,s.aimZ=u.z}if(c&&(s.face=Math.atan2(o,a),!s.aiming&&s.kick<=0)){const u=qn(o,a);s.aimX=u.x,s.aimZ=u.z}if(i.phase==="battle"&&r.sabotage&&!c&&!r.fire&&!r.kick&&!r.throwStone){const u=Ra(i,s);u&&n.set(s.id,u.id)}if(s.dizzyTime<=0){if(h1(i,s),r.fire&&u1(i,s),r.kick&&f1(i,s),r.throwStone&&o1(i,s,r.throwStone),s.catapultId){const u=i.catapults.find(f=>f.id===s.catapultId);u&&(u.aimX=s.aimX,u.aimZ=s.aimZ,s.x=u.x,s.z=u.z,s.impulseX=s.impulseZ=0)}if(s.knockUp<=0&&s.hop<=0&&s.idle<=0&&c&&(s.hop=At.hopDuration,s.hopSpeed=rn(l,0,1)),s.knockUp<=0&&s.hop>0){s.hop=Math.max(0,s.hop-e);const u=(s.id==="player"?8.8:6.2)*Z_(s),f=c?u/Math.max(1,l):0;s.hopX=o*f,s.hopZ=a*f,Kr(s,s.hopX*e,s.hopZ*e),s.height=Math.sin((1-s.hop/At.hopDuration)*Math.PI)*(.35+.32*s.hopSpeed),s.hop===0&&(s.height=0,s.hopX=0,s.hopZ=0,s.idle=At.landingDuration,i.events.push({type:"land",id:s.id,x:s.x,z:s.z}))}}if(Kr(s,s.impulseX*e,s.impulseZ*e),s.impulseX*=Math.exp(-e*10),s.impulseZ*=Math.exp(-e*10),s.knockUp>0){s.knockUp=Math.max(0,s.knockUp-e);const u=1-s.knockUp/s.knockUpDuration;s.height=s.knockUpStart*(1-u)+Math.sin(u*Math.PI)*s.knockUpPeak,s.knockUp===0&&(s.height=0,s.knockUpStart=0,s.idle=At.landingDuration,i.events.push({type:"land",id:s.id,x:s.x,z:s.z,stone:!0,strength:s.knockUpPeak}))}s.load+=(s.ammo/At.capacity-s.load)*(1-Math.exp(-e*12))}for(const s of i.bullets){const r=Math.min(e,Math.max(0,s.life));if(s.life-=e,r<=0)continue;const o=s.x+s.dx*At.projectileSpeed*r,a=s.z+s.dz*At.projectileSpeed*r,l=Ta(s.x,s.z,o,a,.1);let c=l??2,h=l===null?null:{type:"wall"};for(const u of Cs){const f=ma(s.x,s.z,o,a,u,u.r+.1);f!==null&&f<c&&(c=f,h={type:"wall",o:u})}for(const u of i.actors){if(i.phase!=="battle"||u.id===s.owner||u.ko)continue;const f=ma(s.x,s.z,o,a,u,1+u.load*.2);f!==null&&f<c&&(c=f,h={type:"actor",a:u})}h?(s.x+=(o-s.x)*c,s.z+=(a-s.z)*c,s.life=0,h.type==="actor"&&Ic(i,h.a,s),i.events.push({type:"splat",x:s.x,z:s.z,wall:h.type==="wall",dx:s.dx,dz:s.dz})):(s.x=o,s.z=a,Math.hypot(o,a)>At.radius-.2&&(s.life=0,i.events.push({type:"splat",x:o,z:a,wall:!1,dx:s.dx,dz:s.dz})))}i.bullets=i.bullets.filter(s=>s.life>0),a1(i,e,Ic),g1(i,n,e),Fd(i)}function _1(i){return JSON.stringify({...i,events:[],bullets:[],shells:[]})}function y1(i){try{const t=JSON.parse(i);if(![1,2].includes(t?.version)||!Array.isArray(t.actors)||t.actors.length!==3||!Array.isArray(t.flies)||t.flies.length!==72||!["playing","won","lost"].includes(t.status))return null;const e=t.version===1,n=Pc(Ye(t.seed,731));if(n.time=rn(Ye(t.time),0,1e7),n.nextId=rn(Math.floor(Ye(t.nextId,1)),1,1e9),n.intro=e?At.introSeconds:rn(Ye(t.intro,At.introSeconds),0,At.introSeconds),n.phase=!e&&(t.phase==="battle"||n.intro===0)?"battle":"countdown",!e){if(!Array.isArray(t.bases)||t.bases.length!==Vn.length)return null;for(const s of n.bases){const r=t.bases.find(o=>o?.id===s.id&&o?.owner===s.owner);if(!r)return null;s.destroyed=r.destroyed===!0,s.progress=s.destroyed?At.sabotageSeconds:0}}for(let s=0;s<3;s++){const r=t.actors[s],o=n.actors[s];if(r?.id!==o.id||!Number.isFinite(r.x)||!Number.isFinite(r.z))return null;for(const h of Object.keys(o))typeof o[h]=="number"&&(o[h]=rn(Ye(r[h],o[h]),-1e4,1e4));const a=Ps(n,o),l=a.destroyed,c=l||r.ko===!0;Object.assign(o,{ko:c,eliminated:l,respawnTime:c&&!l?rn(Ye(r.respawnTime,At.respawnSeconds)||At.respawnSeconds,.01,At.respawnSeconds):0,aiming:!1,catapultId:null,interactHeld:!1,machineSeeking:!1,aiCharging:!1,aimWindup:0,refilling:r.refilling===!0||Ye(r.ammo)<6,raidId:null,sabotageId:null,sabotageRecovery:0,revealedTime:0,ammo:l?0:rn(Math.floor(Ye(r.ammo)),0,At.capacity),load:rn(Ye(r.load),0,1),dizzy:rn(Ye(r.dizzy),0,At.dizzyHits),finishHits:rn(Ye(r.finishHits),0,At.finishHits),dizzyTime:rn(Ye(r.dizzyTime),0,At.dizzySeconds),kickPending:!1,kick:0,hop:0,hopX:0,hopZ:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0,impulseX:0,impulseZ:0});for(const h of["shot","tongue","invuln","hit","kickCooldown","aiShotReady"])o[h]=rn(o[h],0,2);o.machineTimer=rn(o.machineTimer,0,30),o.face=Ye(o.face,Math.PI),Kr(o,0,0)}for(let s=0;s<72;s++){const r=t.flies[s],o=yr[Math.floor(s/12)];r&&(t.swarmVersion===1&&r.swarmId===o.id&&Number.isFinite(r.x)&&Number.isFinite(r.z)&&Qe(r,o)<=o.radius+.001&&Object.assign(n.flies[s],{x:r.x,z:r.z,phase:Ye(r.phase)}),n.flies[s].wait=rn(Ye(r.wait),0,12))}if(Array.isArray(t.catapults))for(const s of n.catapults){const r=t.catapults.find(a=>a.id===s.id);r&&(s.cooldown=rn(Ye(r.cooldown),0,De.cooldown),s.loaded=s.cooldown===0);const o=t.actors.find(a=>a.catapultId===s.id);if(o){const a=n.actors.find(l=>l.id===o.id);a.x=s.x,a.z=s.z+2.3,Kr(a,0,0)}}for(const s of Object.keys(n.stats))n.stats[s]=Math.max(0,Math.floor(Ye(t.stats?.[s])));return Fd(n),n}catch{return null}}function M1(i){const t=i.aiming||i.shot>.02||i.kick>0,e=Math.hypot(i.aimX,i.aimZ);if((t||!Number.isFinite(i.face))&&Number.isFinite(e)&&e>1e-6)return{x:i.aimX/e,z:i.aimZ/e};const n=Number.isFinite(i.face)?i.face:Math.PI;return{x:Math.sin(n),z:Math.cos(n)}}function b1(i,t,e=1.6,n="chase3d"){const s=Number.isFinite(e)&&e>0?e:1.6;if(n==="overview"){const a=Math.max(.86,Math.min(1.6,Math.sqrt(1.2/s)));return{look:[i.x,t+1.2,i.z],position:[i.x,t+26*a,i.z+19*a]}}const r=M1(i),o=Math.max(1,Math.min(1.42,.72/s));return{look:[i.x+r.x*1.2,t+1.2,i.z+r.z*1.2],position:[i.x-r.x*10.8*o-r.z*.7*o,t+5.8*o,i.z-r.z*10.8*o+r.x*.7*o]}}function Ko(i,t){const e=t.x-i.x,n=t.z-i.z,s=Math.hypot(e,n),r=Number.isFinite(s)&&s>1e-6?e/s:0,o=Number.isFinite(s)&&s>1e-6?n/s:-1;return{camera:{x:0,z:0},focus:{x:r,z:o}}}function Cl(i,t,e,n){const s=n.x-e.x,r=n.z-e.z,o=Math.hypot(s,r),a=o>1e-6?s/o:0,l=o>1e-6?r/o:-1,c=Number.isFinite(i)?i:0,h=Number.isFinite(t)?t:0;return{x:-l*c-a*h,z:a*c-l*h}}const Pl=["#d2ff70","#ff765d","#d7a0ff"],S1=new Map(yr.map((i,t)=>[i.id,t])),Wu=new WeakMap;function Od(i){let t=Wu.get(i);t||(t=yr.map(e=>({swarm:e,available:0,next:1/0})),Wu.set(i,t));for(const e of t)e.available=0,e.next=1/0;for(const e of i.flies){const n=t[S1.get(e.swarmId)];n&&(e.wait<=0?n.available++:n.next=Math.min(n.next,e.wait))}return t}function Bd(i,t,e,n,s){i.fillStyle=s?"#dceee6":"#718781",i.beginPath(),i.ellipse(t-n*.5,e-n*.28,n*.6,n*.32,-.5,0,Math.PI*2),i.ellipse(t+n*.5,e-n*.28,n*.6,n*.32,.5,0,Math.PI*2),i.fill(),i.fillStyle=s?"#384c4c":"#536763",i.strokeStyle=s?"#b6d1c3":"#8ca09a",i.lineWidth=1.4,i.beginPath(),i.ellipse(t,e+n*.12,n*.34,n*.56,0,0,Math.PI*2),i.fill(),i.stroke()}function w1(i,t){if(!t)return;const e=t.getContext("2d");if(!e)return;const n=t.width,s=n/2,r=n*.43,o=r/At.radius;e.clearRect(0,0,n,n),e.save(),e.translate(s,s),e.fillStyle="#153e3af2",e.strokeStyle="#9bd1be",e.lineWidth=4,e.beginPath(),e.arc(0,0,r,0,Math.PI*2),e.fill(),e.stroke(),e.clip();const a=i.focus.x-i.camera.position.x,l=i.focus.z-i.camera.position.z,c=Math.hypot(a,l),h=c>1e-6?a/c:0,u=c>1e-6?l/c:-1,f=(d,m)=>({x:(-u*d+h*m)*o,y:-(h*d+u*m)*o});e.strokeStyle="#ffffff17",e.lineWidth=1;for(let d=-20;d<=20;d+=10){const m=f(d,-25),x=f(d,25),g=f(-25,d),p=f(25,d);e.beginPath(),e.moveTo(m.x,m.y),e.lineTo(x.x,x.y),e.moveTo(g.x,g.y),e.lineTo(p.x,p.y),e.stroke()}for(const d of Cs){const m=f(d.x,d.z);e.fillStyle="#769084",e.beginPath(),e.arc(m.x,m.y,d.r*o,0,Math.PI*2),e.fill()}for(const d of rh){const m=f(d.x,d.z);e.fillStyle="#517d4788",e.beginPath(),e.arc(m.x,m.y,d.radius*o,0,Math.PI*2),e.fill()}for(const d of ws){const m=[f(d.x-d.hw,d.z-d.hd),f(d.x+d.hw,d.z-d.hd),f(d.x+d.hw,d.z+d.hd),f(d.x-d.hw,d.z+d.hd)];e.fillStyle="#c4b492",e.beginPath(),e.moveTo(m[0].x,m[0].y);for(const x of m.slice(1))e.lineTo(x.x,x.y);e.closePath(),e.fill()}for(const d of Id){const m=f(d.x,d.z);e.strokeStyle="#bfd6d0",e.lineWidth=2,e.beginPath(),e.moveTo(m.x-3,m.y+3),e.lineTo(m.x,m.y-4),e.lineTo(m.x+4,m.y+3),e.moveTo(m.x,m.y-1),e.lineTo(m.x+4,m.y-6),e.stroke()}for(const[d,m]of Vn.entries()){const x=i.state.bases?.find(p=>p.id===m.id),g=f(m.stock.x,m.stock.z);e.fillStyle=x?.destroyed?"#4f6258":x?.attackerId?"#ffce77":Pl[d],e.strokeStyle="#092b22",e.lineWidth=2,e.beginPath(),e.moveTo(g.x-7,g.y-2),e.lineTo(g.x,g.y-8),e.lineTo(g.x+7,g.y-2),e.lineTo(g.x+7,g.y+7),e.lineTo(g.x-7,g.y+7),e.closePath(),e.fill(),e.stroke(),x?.destroyed&&(e.strokeStyle="#b7c7ba",e.beginPath(),e.moveTo(g.x-5,g.y-5),e.lineTo(g.x+5,g.y+5),e.moveTo(g.x+5,g.y-5),e.lineTo(g.x-5,g.y+5),e.stroke())}for(const d of Od(i.state)){const m=f(d.swarm.x,d.swarm.z),x=d.available>0;e.strokeStyle=x?"#b8daa7":"#6a827b",e.lineWidth=x?1.8:1.2,e.beginPath(),e.arc(m.x,m.y,9,0,Math.PI*2),e.stroke(),Bd(e,m.x,m.y,6,x)}i.state.actors.forEach((d,m)=>{if(d.ko||d.eliminated)return;const x=i.state.actors[0];if(m>0&&Aa(d)&&d.revealedTime<=0&&Math.hypot(d.x-x.x,d.z-x.z)>2.2)return;const g=f(d.x,d.z);if(e.fillStyle=Pl[m],e.strokeStyle="#102923",e.lineWidth=3,e.beginPath(),e.arc(g.x,g.y,m===0?9:8,0,Math.PI*2),e.fill(),e.stroke(),m===0){const p=f(d.aimX*2.7,d.aimZ*2.7);e.strokeStyle=Pl[0],e.lineWidth=4,e.beginPath(),e.moveTo(g.x,g.y),e.lineTo(g.x+p.x,g.y+p.y),e.stroke()}else e.fillStyle="#102923",e.beginPath(),e.arc(g.x-3,g.y-2,1.6,0,Math.PI*2),e.arc(g.x+3,g.y-2,1.6,0,Math.PI*2),e.fill()}),e.restore(),e.fillStyle="#f2ffe1",e.font="bold 18px sans-serif",e.textAlign="center",e.fillText("ΒΑΣΕΙΣ • ΜΥΓΕΣ • ΚΑΛΥΨΗ",s,n-5)}function E1(i,t){const e=i.state.actors[0];if(e.ko||e.ammo>=At.capacity)return;const n=Vn.find(y=>y.owner===e.id),s=i.state.bases?.find(y=>y.owner===e.id);if(n&&s&&!s.destroyed&&Math.hypot(e.x-n.stock.x,e.z-n.stock.z)<=At.pickupRange&&Rs(e,n.stock))return;let r=null,o=null,a=1/0,l=1/0;for(const y of Od(i.state)){const _=Math.hypot(y.swarm.x-e.x,y.swarm.z-e.z);_<a&&(r=y,a=_),y.available>0&&_<l&&(o=y,l=_)}const h=r&&r.available===0&&a<=r.swarm.radius+At.pickupRange+.5?r:o;if(!h)return;const u=h.swarm,f=i.project(u.x,i.ground(u.x,u.z)+.35,u.z),d=i.touch&&i.h>i.w?240:110,m=i.touch?Math.min(165,i.h*.3):65;if(!f.visible||f.x<72||f.x>i.w-72||f.y<d||f.y>i.h-m)return;t.save(),t.font="700 12px sans-serif",t.textAlign="left",t.lineJoin="round";const x=h.available>0?`Μύγες · ${h.available}`:`Ξανά σε ${Math.max(1,Math.ceil(h.next))}″`,g=t.measureText(x).width+22,p=f.x-g/2;Bd(t,p+7,f.y+8,6,h.available>0),t.strokeStyle="#18352de6",t.lineWidth=3,t.strokeText(x,p+20,f.y+12),t.fillStyle=h.available>0?"#e8f4d5":"#c1d0c9",t.fillText(x,p+20,f.y+12),t.restore()}function T1(i,t,e=At.projectileSpeed*At.projectileLifetime){const n=Math.hypot(t.aimX,t.aimZ)||1,s=t.aimX/n,r=t.aimZ/n;let o=e,a=null,l=!1;const c=(d,m,x)=>{const g=t.x+s*1.2-d,p=t.z+r*1.2-m,y=g*s+p*r,_=g*g+p*p-x*x,v=y*y-_;if(v<0)return 1/0;const C=-y-Math.sqrt(v);return _<0?1.2:C>=0?C+1.2:1/0},h=t.x*s+t.z*r,u=t.x*t.x+t.z*t.z-(At.radius-.2)**2;o=Math.min(o,Math.max(1.2,-h+Math.sqrt(Math.max(0,h*h-u))));for(const d of Cs){const m=c(d.x,d.z,d.r+.1);m<o&&(o=m,l=!0)}const f=Ta(t.x,t.z,t.x+s*o,t.z+r*o,.1);f!==null&&(o*=f,l=!0);for(const d of i.actors){if(d===t||d.ko||d.eliminated)continue;const m=c(d.x,d.z,1+d.load*.2);m<o&&(o=m,a=d.id,l=!1)}return{x:t.x+s*o,z:t.z+r*o,distance:o,targetId:a,blocked:l}}const A1=new z(0,1,0),R1=Math.PI*2,Dl=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),Jo=(i,t,e)=>i+(t-i)*e,Qo=["#b8e76c","#ef886a","#be94e0"],C1=.45;class P1{constructor(t){this.game=t,this.scene=t.scene,this.clock=0,this.machines=new Map,this.shellMeshes=new Map,this.dummy=new We,this._vector=new z,this._direction=new z,this.geometry={box:new zi(1,1,1),cylinder:new As(.5,.5,1,8),rock:new ya(.4,0),leaf:new Xn(1,10,5),cup:new Xn(.38,10,6,0,R1,Math.PI/2,Math.PI/2),ring:new Ji(.94,1,48),disc:new _a(1,32),rope:new th(.14,.027,5,10)},this.material={wood:new En({color:"#a47746"}),lightWood:new En({color:"#d4ac64"}),darkWood:new En({color:"#67503c"}),rope:new En({color:"#d3c593"}),leaf:new En({color:"#5c9b67"}),stone:new En({color:"#90999b",emissive:"#172023",emissiveIntensity:.16}),preview:new Md({color:"#e6f7a1",dashSize:.45,gapSize:.25,transparent:!0,opacity:.85,depthWrite:!1}),landing:new _n({color:"#d6ed8b",transparent:!0,opacity:.72,side:Ue,depthWrite:!1})};for(const[s,r]of ah.entries())this.machines.set(r.id,this.createMachine(r,s));const e=new Float32Array(99),n=new Te;n.setAttribute("position",new cn(e,3)),this.previewLine=new so(n,this.material.preview),this.previewLine.name="catapult-trajectory-preview",this.previewLine.frustumCulled=!1,this.previewLine.visible=!1,this.scene.add(this.previewLine),this.landingMarker=new Jt(this.geometry.ring,this.material.landing),this.landingMarker.name="catapult-landing-preview",this.landingMarker.rotation.x=-Math.PI/2,this.landingMarker.scale.setScalar(De.blastRadius),this.landingMarker.visible=!1,this.scene.add(this.landingMarker)}ground(t,e){return this.game.ground(t,e)}mesh(t,e,n,s=[0,0,0],r=[1,1,1]){const o=new Jt(e,n);return o.position.fromArray(s),o.scale.fromArray(r),t.add(o),o}createMachine(t,e){const n=new re;n.name=t.id,n.position.set(t.x,this.ground(t.x,t.z),t.z),this.scene.add(n);const s=new re;s.name="wooden-catapult-frame",n.add(s);const r={wood:[],lightWood:[],darkWood:[],rope:[]},o=(_,v,C,T,E,R,b)=>{const S=this.geometry.box.clone();S.scale(E,R,b),S.translate(v,C,T),r[_].push(S)},a=(_,v,C,T)=>{const E=new z(...v),R=new z(...C),b=R.clone().sub(E),S=this.geometry.cylinder.clone();S.scale(T,b.length(),T),S.applyQuaternion(new es().setFromUnitVectors(A1,b.normalize())),S.translate(...E.add(R).multiplyScalar(.5).toArray()),r[_].push(S)};for(const _ of[-1,1])o("wood",_*.82,.18,.6,.26,.28,2.65);for(const _ of[-.55,.12,.83,1.68])o("lightWood",0,.29,_,1.98,.14,.22);o("darkWood",0,.34,-.03,1.2,.14,.93);for(const _ of[-1,1])a("wood",[_*.76,.3,.1],[_*.76,.99,1],.17),a("wood",[_*.76,.3,1.83],[_*.76,.99,1],.17),a("rope",[_*.77,.48,.35],[_*.77,.58,.47],.21),a("rope",[_*.77,.48,1.61],[_*.77,.58,1.49],.21);a("darkWood",[-.94,.85,1],[.94,.85,1],.22),o("lightWood",0,.52,1.66,1.72,.17,.17);for(const[_,v]of Object.entries(r)){if(!v.length)continue;const C=ys(v);for(const E of v)E.dispose();const T=this.mesh(s,C,this.material[_]);T.userData.ownedGeometry=!0}const l=this.mesh(s,this.geometry.leaf,this.material.leaf,[0,.41,-.04],[.59,.065,.48]);l.name="operator-seat";const c=new En({color:Qo[e%Qo.length]}),h=this.mesh(s,this.geometry.leaf,c,[-.98,.64,1.65],[.13,.45,.3]);h.rotation.z=-.3,h.name="side-leaf";const u=new re;u.name="throwing-arm",u.position.set(0,.85,1),s.add(u),this.mesh(u,this.geometry.box,this.material.lightWood,[0,.07,0],[.18,1.2,.2]),this.mesh(u,this.geometry.box,this.material.darkWood,[0,-.48,0],[.43,.27,.37]);const f=this.mesh(u,this.geometry.cup,this.material.darkWood,[0,.57,0],[1.1,.72,1.3]);f.name="stone-cup";const d=this.mesh(u,this.geometry.rock,this.material.stone,[0,.75,0],[.78,.7,.8]);d.name="loaded-catapult-stone",u.rotation.x=-.45;const m=new re;m.name="reload-winch",m.position.set(0,.61,.53),s.add(m);const x=this.mesh(m,this.geometry.cylinder,this.material.darkWood,[0,0,0],[.13,1.37,.13]);x.rotation.z=Math.PI/2;for(const _ of[-1,1]){const v=this.mesh(m,this.geometry.box,this.material.lightWood,[_*.47,.12,0],[.13,.35,.12]);v.name="operator-handle";const C=this.mesh(s,this.geometry.rope,this.material.rope,[_*.76,.85,1],[1,1,1]);C.rotation.y=Math.PI/2}const g=[];for(let _=0;_<2;_++){const v=this.mesh(s,this.geometry.rock,this.material.stone,[1.17,.29,.72+_*.64],[.65,.6,.68]);v.rotation.set(_*.7,.6+_,0),g.push(v)}const p=new _n({color:Qo[e%Qo.length],transparent:!0,opacity:.25,side:Ue,depthWrite:!1}),y=this.mesh(n,this.geometry.ring,p,[0,.045,.4],[1.65,1.65,1.65]);return y.rotation.x=-Math.PI/2,y.name="catapult-station-ring",{group:n,turret:s,arm:u,winch:m,loadedRock:d,pile:g,ring:y,factionMaterial:c,ringMaterial:p,definition:t,launchAge:1/0,yaw:Math.PI}}operatorPose(t){const e=this.machines.get(typeof t=="string"?t:t?.id);if(!e)return null;const n=this.game.state.catapults?.find(s=>s.id===e.definition.id);return{x:e.definition.x,y:this.ground(e.definition.x,e.definition.z)+C1,z:e.definition.z,yaw:n?Math.atan2(n.aimX,n.aimZ):e.yaw}}consumeEvent(t){if(t.type==="stoneShot"){const e=this.machines.get(t.catapultId);e&&(e.launchAge=0,e.arm.rotation.x=0,e.loadedRock.visible=!1)}}shellPoint(t,e,n=this._vector){const s=Jo(t.startX,t.tx,e),r=Jo(t.startZ,t.tz,e),o=this.ground(t.startX,t.startZ)+(t.startHeight??1.6),a=this.ground(t.tx,t.tz)+.12;return n.set(s,Jo(o,a,e)+4*t.arcHeight*e*(1-e),r)}createShell(t){const e=this.mesh(this.scene,this.geometry.rock,this.material.stone,void 0,[1.05,.95,1.14]);e.name=`catapult-stone-${t.id}`;const n=new _n({color:t.owner==="player"?"#e4c36e":"#f17e62",transparent:!0,opacity:.45,side:Ue,depthWrite:!1}),s=this.mesh(this.scene,this.geometry.ring,n,[t.tx,this.ground(t.tx,t.tz)+.055,t.tz],[De.blastRadius,De.blastRadius,De.blastRadius]);s.rotation.x=-Math.PI/2,s.name=`catapult-danger-${t.id}`;const r=this.mesh(this.scene,this.geometry.disc,n,[t.tx,this.ground(t.tx,t.tz)+.05,t.tz],[.13,.13,.13]);return r.rotation.x=-Math.PI/2,{stone:e,ring:s,core:r,material:n}}updatePreview(){const t=this.game.state,e=t.actors[0],n=this.game.catapultAim,s=t.catapults?.find(m=>m.id===e.catapultId&&m.occupant===e.id),r=n?.target,o=this.game.running&&n?.active&&s&&r&&Number.isFinite(r.x)&&Number.isFinite(r.z)&&!e.ko&&e.dizzyTime<=0;if(this.previewLine.visible=!!o,this.landingMarker.visible=!!o,!o)return;const a=r.x-s.x,l=r.z-s.z,c=Math.hypot(a,l)||1,h={startX:s.x+a/c,startZ:s.z+l/c,startHeight:1.6,tx:r.x,tz:r.z,arcHeight:De.arcHeight},u=this.previewLine.geometry.attributes.position;for(let m=0;m<u.count;m++){const x=this.shellPoint(h,m/(u.count-1));u.setXYZ(m,x.x,x.y,x.z)}u.needsUpdate=!0,this.previewLine.computeLineDistances(),this.landingMarker.position.set(r.x,this.ground(r.x,r.z)+.065,r.z),this.landingMarker.scale.setScalar(De.blastRadius);const f=s.loaded&&s.cooldown<=0,d=r.valid===!1;this.material.preview.color.set(d?"#ef826d":f?"#e6f7a1":"#b7bfaf"),this.material.landing.color.set(d?"#ef826d":f?"#d6ed8b":"#b7bfaf")}poseOperator(t,e,n){const s=this.game.state.actors.findIndex(c=>c.id===t.id),r=this.game.models?.[s];if(!r?.bones||t.ko)return;const o=r.bones,a=n.cooldown>0,l=a?Math.sin(this.clock*9)*.13:0;for(const c of[-1,1]){const h=o[`shoulder${c}`],u=o[`elbow${c}`],f=o[`wrist${c}`];h&&(h.rotation.x=-.53-l*c,h.rotation.z=c*.08),u&&(u.rotation.x=.45+l*c),f&&(f.rotation.x=-.18)}o.spine&&(o.spine.rotation.x=.08+Math.abs(l)*.12),o.head&&(o.head.rotation.x=-.04)}update(t=0){const e=this.game.running?Math.max(0,Math.min(.1,t)):0;this.clock+=e;const n=this.game.state;for(const s of n.catapults||[]){const r=this.machines.get(s.id);if(!r)continue;r.group.position.y=this.ground(s.x,s.z);const o=Math.atan2(s.aimX,s.aimZ);r.yaw=o,r.turret.rotation.y=o,Number.isFinite(r.launchAge)&&(r.launchAge+=e);const a=this.game.catapultAim;let c=s.occupant==="player"&&a?.active?-.74:-.45;if(s.cooldown>0){const u=1-Dl(s.cooldown/(De.cooldown||3));c=Jo(.6,-.45,u*u),r.winch.rotation.x=this.clock*7}else r.winch.rotation.x=0;r.launchAge<.18&&(c=.6*Math.sin(Dl(r.launchAge/.09)*Math.PI/2)),r.arm.rotation.x+=(c-r.arm.rotation.x)*(1-Math.exp(-e*18)),r.loadedRock.visible=!!s.loaded,r.ring.material.opacity=s.occupant?.42:.2;const h=n.actors.find(u=>u.id===s.occupant);h&&this.poseOperator(h,r,s)}for(const s of n.shells||[]){let r=this.shellMeshes.get(s.id);r||(r=this.createShell(s),this.shellMeshes.set(s.id,r));const o=Dl(s.age/s.duration);this.shellPoint(s,o,r.stone.position),r.stone.rotation.set(s.age*4,s.age*3,s.age*1.5),r.material.opacity=.35+.22*o+.08*Math.sin(this.clock*13)}for(const[s,r]of this.shellMeshes)(n.shells||[]).some(o=>o.id===s)||(r.stone.removeFromParent(),r.ring.removeFromParent(),r.core.removeFromParent(),r.material.dispose(),this.shellMeshes.delete(s));this.updatePreview()}dispose(){for(const t of this.machines.values())t.group.removeFromParent(),t.group.traverse(e=>{e.userData.ownedGeometry&&e.geometry.dispose()}),t.factionMaterial.dispose(),t.ringMaterial.dispose();for(const t of this.shellMeshes.values())t.stone.removeFromParent(),t.ring.removeFromParent(),t.core.removeFromParent(),t.material.dispose();this.previewLine.removeFromParent(),this.previewLine.geometry.dispose(),this.landingMarker.removeFromParent();for(const t of Object.values(this.geometry))t.dispose();for(const t of Object.values(this.material))t.dispose();this.machines.clear(),this.shellMeshes.clear()}}const D1=Math.PI*2,I1=new z(0,1,0),Vr=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),Il=i=>Number.isFinite(i?.x)&&Number.isFinite(i?.z),Xu=["#c4e4de","#83bcb4","#eaf4e4"].map(i=>new te(i)),ta=Object.freeze({mobileDrops:96,desktopDrops:144,mobileRipples:6,desktopRipples:8}),z1=`
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
`,L1=`
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
`;class U1{constructor(t){this.game=t,this.scene=t.scene,this.time=0,this.seed=7919,this.cursor=0,this.rippleCursor=0,this.capacity=t.touch?ta.mobileDrops:ta.desktopDrops,this.particles=Array.from({length:this.capacity},()=>({life:0,total:1,x:0,y:0,z:0,vx:0,vy:0,vz:0,size:.08,color:0})),this.dummy=new We,this.direction=new z,this.dropGeometry=new Xn(1,7,5),this.dropMaterial=new En({color:"#ffffff",emissive:"#163a35",emissiveIntensity:.06,depthTest:!0,depthWrite:!0}),this.droplets=new wn(this.dropGeometry,this.dropMaterial,this.capacity),this.droplets.name="arcade-impact-droplets",this.droplets.instanceMatrix.setUsage(Ei),this.droplets.frustumCulled=!1,this.droplets.count=0;for(let n=0;n<this.capacity;n++)this.droplets.setColorAt(n,Xu[0]);this.droplets.instanceColor.setUsage(Ei),this.scene.add(this.droplets);const e=t.touch?ta.mobileRipples:ta.desktopRipples;this.ripples=Array.from({length:e},(n,s)=>{const r=new Ti(2,2,8,8);r.rotateX(-Math.PI/2);const o=r.attributes.position.array.slice(),a=new Wn({vertexShader:z1,fragmentShader:L1,uniforms:ha.merge([Ct.fog,{uAge:{value:0},uOpacity:{value:.75},uWater:{value:new te("#6aaba4")},uFoam:{value:new te("#e8f2df")}}]),transparent:!0,depthTest:!0,depthWrite:!1,side:Ue,fog:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),l=new Jt(r,a);return l.name=`arcade-impact-ripple-${s}`,l.frustumCulled=!1,l.visible=!1,this.scene.add(l),{mesh:l,reference:o,age:0,duration:1,active:!1}})}ground(t,e){const n=this.game.ground(t,e);return Number.isFinite(n)?n:0}random(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}ripple(t,e,n,s,r=.75){const o=this.ripples[this.rippleCursor++%this.ripples.length],a=o.mesh.geometry.attributes.position;for(let l=0;l<a.count;l++){const c=t+o.reference[l*3]*n,h=e+o.reference[l*3+2]*n;a.setXYZ(l,c,this.ground(c,h)+.035,h)}a.needsUpdate=!0,o.mesh.geometry.computeVertexNormals(),o.mesh.material.uniforms.uAge.value=0,o.mesh.material.uniforms.uOpacity.value=r,o.age=0,o.duration=s,o.active=!0,o.mesh.visible=!0}emit({x:t,y:e,z:n,count:s,power:r,spread:o=.12,dx:a=0,dz:l=0,lifetime:c=.55}){const h=Math.hypot(a,l);h>0&&(a/=h,l/=h);for(let u=0;u<s;u++){const f=this.particles[this.cursor++%this.capacity],d=this.random()*D1,m=(.8+this.random()*1.7)*r;f.x=t+(this.random()-.5)*o,f.y=e+this.random()*.07,f.z=n+(this.random()-.5)*o,f.vx=Math.sin(d)*m+a*r*.65,f.vz=Math.cos(d)*m+l*r*.65,f.vy=(1.8+this.random()*2.2)*r,f.total=c*(.82+this.random()*.3),f.life=f.total,f.size=(.045+this.random()*.045)*Math.sqrt(r),f.color=u%3}this.drawDrops()}hit({x:t,z:e,dx:n=0,dz:s=0,height:r,heavy:o=!1}={}){if(!Il({x:t,z:e}))return;const a=this.ground(t,e),l=Number.isFinite(r)?Math.max(a+.04,r):a+.7;this.ripple(t,e,o?1.3:.72,o?.54:.4,o?.8:.64),this.emit({x:t,y:l,z:e,dx:n,dz:s,count:o?15:8,power:o?1.2:.72,spread:o?.22:.1,lifetime:o?.58:.43})}stone({x:t,z:e,radius:n=2.8}={}){if(!Il({x:t,z:e}))return;const s=Vr(Number.isFinite(n)?n:2.8,1,4);this.ripple(t,e,s,.74,.9),this.emit({x:t,y:this.ground(t,e)+.12,z:e,count:this.game.touch?28:34,power:1.8,spread:.55,lifetime:.76})}landing({x:t,z:e,strength:n=1}={}){if(!Il({x:t,z:e}))return;const s=Vr(Number.isFinite(n)?n:1,.35,1.8);this.ripple(t,e,.75+s*.42,.48,.68),this.emit({x:t,y:this.ground(t,e)+.08,z:e,count:Math.round(6+s*5),power:.6+s*.28,spread:.25,lifetime:.48})}drawDrops(){let t=0;for(const e of this.particles){if(e.life<=0)continue;const n=Vr(e.life/.13),s=e.size*n;this.dummy.position.set(e.x,e.y,e.z),this.direction.set(e.vx,e.vy,e.vz),this.direction.lengthSq()>1e-6?this.dummy.quaternion.setFromUnitVectors(I1,this.direction.normalize()):this.dummy.quaternion.identity(),this.dummy.scale.set(s,s*1.55,s),this.dummy.updateMatrix(),this.droplets.setMatrixAt(t,this.dummy.matrix),this.droplets.setColorAt(t,Xu[e.color]),t++}this.droplets.count=t,this.droplets.instanceMatrix.needsUpdate=!0,this.droplets.instanceColor.needsUpdate=!0}update(t=0){const e=Vr(Number.isFinite(t)?t:0,0,.1);if(e!==0){this.time+=e;for(const n of this.particles){if(n.life<=0||(n.life=Math.max(0,n.life-e),n.life===0))continue;n.x+=n.vx*e,n.z+=n.vz*e,n.y+=n.vy*e-7*e*e,n.vy-=14*e;const s=Math.exp(-e*1.2);n.vx*=s,n.vz*=s;const r=this.ground(n.x,n.z)+.025;n.y<r&&(n.y=r,n.vy=0,n.vx*=.3,n.vz*=.3,n.life=Math.min(n.life,.06))}this.drawDrops();for(const n of this.ripples)n.active&&(n.age+=e,n.mesh.material.uniforms.uAge.value=Vr(n.age/n.duration),n.age>=n.duration&&(n.active=!1,n.mesh.visible=!1))}}clear(){for(const t of this.particles)t.life=0;this.droplets.count=0;for(const t of this.ripples)t.active=!1,t.mesh.visible=!1,t.age=0;this.time=0}dispose(){this.clear(),this.droplets.removeFromParent(),this.dropGeometry.dispose(),this.dropMaterial.dispose();for(const t of this.ripples)t.mesh.removeFromParent(),t.mesh.geometry.dispose(),t.mesh.material.dispose()}}const ir=["#b5dc72","#ee8c72","#bd9ee3"],N1=(i,t=0,e=1)=>Math.max(t,Math.min(e,i)),qu=Math.PI*2;class k1{constructor(t){this.game=t,this.scene=t.scene,this.clock=0,this.group=new re,this.group.name="storage-homes-and-fenced-catapult-yards",this.scene.add(this.group),this.bases=new Map,this.groves=[],this.enclosures=new Map,this.ownedGeometries=[],this.ownedMaterials=[],this.dummy=new We,this.sightRay=new br,this.sightTarget=new z,this.sightHit=new z,this.geometries={box:new zi(1,1,1),cylinder:new As(.5,.5,1,8),cone:new jc(1,1,5),leaf:new Jc(1,1),ring:new Ji(.91,1,40),wing:new Xn(1,6,4),sphere:new Xn(1,8,6)},this.materials={wood:new En({color:"#866244"}),lightWood:new En({color:"#c69b62"}),darkWood:new En({color:"#554535"}),leaf:new En({color:"#56874d"}),fly:new En({color:"#233e38"}),wing:new En({color:"#d5eee1",transparent:!0,opacity:.85}),ruin:new En({color:"#6a6855"}),dark:new _n({color:"#173b31"}),alert:new _n({color:"#f4af69"})},this.buildWalls();for(const[e,n]of Vn.entries())this.bases.set(n.id,this.buildBase(n,e));for(const[e,n]of rh.entries())this.groves.push(this.buildGrove(n,e))}ground(t,e){return this.game.ground(t,e)}mesh(t,e,n,s=0,r=0,o=0,a=1,l=1,c=1){const h=new Jt(e,n);return h.position.set(s,r,o),h.scale.set(a,l,c),t.add(h),h}material(t){const e=new En(t);return this.ownedMaterials.push(e),e}mergeParts(t,e,n){if(!t.length)return null;const s=ys(t);for(const o of t)o.dispose();this.ownedGeometries.push(s);const r=new Jt(s,e);return r.name=n,this.group.add(r),r}boxPart(t,e,n,s,r,o,a){const l=this.geometries.box.clone();l.scale(r,o,a),l.translate(e,n,s),t.push(l)}buildWalls(){const t=[];for(const e of wa){const n=Vn.findIndex(g=>g.owner===e.owner),s=[],r=[],o=[],a=this.material({color:"#866244",transparent:!0,opacity:1}),l=this.material({color:ir[n],transparent:!0,opacity:1});for(const g of ws){if(g.enclosureId!==e.id)continue;const p=this.ground(g.x,g.z);this.boxPart(t,g.x,p+.25,g.z,g.hw*2+.08,.5,g.hd*2+.08),this.boxPart(s,g.x,p+g.height*.5,g.z,g.hw*2,g.height,g.hd*2),this.boxPart(r,g.x,p+g.height+.055,g.z,g.hw*2+.05,.16,g.hd*2+.05);const y=g.hw>g.hd,_=y?g.hw*2:g.hd*2,v=Math.max(1,Math.floor(_/.65));for(let C=0;C<=v;C++){const T=v?C/v-.5:0;this.boxPart(s,g.x+(y?T*_:0),p+g.height*.55,g.z+(y?0:T*_),.15,g.height+.32,.15)}o.push(new ii(new z(g.x-g.hw-.1,p,g.z-g.hd-.1),new z(g.x+g.hw+.1,p+g.height+.35,g.z+g.hd+.1)))}const c=this.mergeParts(s,a,`${e.id}-solid-walls`),h=this.mergeParts(r,l,`${e.id}-wall-tops`);this.enclosures.set(e.id,{definition:e,wallMesh:c,capMesh:h,woodMaterial:a,capMaterial:l,boxes:o,faded:!1});const u=this.ground(e.gate.x,e.gate.z),f=new re;f.name=`${e.id}-single-open-entrance`,f.position.set(e.gate.x,u,e.gate.z),this.group.add(f),(e.side==="east"||e.side==="west")&&(f.rotation.y=Math.PI/2),this.mesh(f,this.geometries.box,a,-1.6,1.25,0,.18,2.5,.25),this.mesh(f,this.geometries.box,a,1.6,1.25,0,.18,2.5,.25),this.mesh(f,this.geometries.box,l,0,2.5,0,3.38,.22,.3);const m=this.mesh(f,this.geometries.box,this.material({color:ir[n]}),0,.045,0,2.8,.07,.5);m.name="walkable-gate-threshold";const x=this.mesh(f,this.geometries.leaf,this.material({color:ir[n]}),0,2.9,0,.4,.35,.1);x.rotation.z=.25}this.mergeParts(t,this.materials.ruin,"enclosure-foundations")}updateWallVisibility(t,e,n){const s=this.game.camera;let r=0;t&&s&&(this.sightTarget.set(t.x,this.ground(t.x,t.z)+(t.height||0)+.9,t.z),this.sightRay.origin.copy(s.position),this.sightRay.direction.copy(this.sightTarget).sub(s.position),r=this.sightRay.direction.lengthSq(),this.sightRay.direction.normalize());const o=1-Math.exp(-Math.max(n,.016)*10);for(const a of this.enclosures.values()){let l=e?.id===a.definition.id;if(!l&&r>0){for(const h of a.boxes)if(this.sightRay.intersectBox(h,this.sightHit)&&this.sightHit.distanceToSquared(this.sightRay.origin)<r-.05){l=!0;break}}a.faded=l;const c=l?.2:a.woodMaterial.opacity+(1-a.woodMaterial.opacity)*o;a.woodMaterial.opacity=a.capMaterial.opacity=c,a.woodMaterial.depthWrite=a.capMaterial.depthWrite=c>.95}}buildBase(t,e){const n=new re;n.name=`${t.id}-shelter`,n.position.set(t.stock.x,this.ground(t.stock.x,t.stock.z),t.stock.z),this.group.add(n);const s=t.side==="north"?0:t.side==="east"?Math.PI/2:-Math.PI/2,r=new re;r.rotation.y=s,n.add(r);const o=this.material({color:ir[e]}),a=this.material({color:e===0?"#61975b":e===1?"#ba7356":"#9270b0",transparent:!0,opacity:1,depthWrite:!0}),l=this.mesh(r,this.geometries.cylinder,this.materials.wood,0,.38,0,1.25,.76,1.25);l.name="infinite-fly-stock-basket",this.mesh(r,this.geometries.cylinder,this.materials.darkWood,0,.77,0,1.15,.09,1.15);const c=this.mesh(r,this.geometries.cylinder,o,0,.42,0,1.31,.14,1.31);c.name="owner-color-on-stock";const h=[];for(const b of[-1.35,1.35])for(const S of[-.9,.9])this.boxPart(h,b,1.12,S,.13,2.24,.13);const u=ys(h);for(const b of h)b.dispose();this.ownedGeometries.push(u),this.mesh(r,u,this.materials.lightWood);const f=this.mesh(r,this.geometries.cone,a,0,2.65,0,2.18,1.35,1.75);f.rotation.y=Math.PI/4,f.name="shelter-leaf-roof";const d=this.mesh(r,this.geometries.cylinder,o,0,3.38,0,.11,.5,.11);d.rotation.z=.2;const m=this.mesh(r,this.geometries.leaf,o,.18,3.67,0,.42,.12,.2);m.rotation.z=.3;const x=new re;x.name="visible-fly-reserve",r.add(x);const g=new wn(this.geometries.sphere,this.materials.fly,8),p=new wn(this.geometries.wing,this.materials.wing,16);g.name="reserve-fly-bodies",p.name="reserve-fly-wings",g.frustumCulled=p.frustumCulled=!1,x.add(g,p);const y=new _n({color:ir[e],transparent:!0,opacity:.36,side:Ue,depthWrite:!1});this.ownedMaterials.push(y);const _=this.mesh(n,this.geometries.ring,y,0,.045,0,2.05,2.05,2.05);_.rotation.x=-Math.PI/2,_.name="stock-refill-ring";const v=new re;v.name="storage-destruction-progress",v.position.set(0,2.12,0),n.add(v),this.mesh(v,this.geometries.box,this.materials.dark,0,0,0,2.2,.17,.09);const C=this.mesh(v,this.geometries.box,this.materials.alert,-1.06,0,.055,0,.115,.05);v.visible=!1;const T=new re;T.name="destroyed-storage-remains",T.visible=!1,n.add(T);const E=[];for(let b=0;b<5;b++){const S=this.geometries.box.clone();S.scale(.2,.2,1.1),S.rotateY(b*.8),S.translate(Math.sin(b*2.4)*.8,.12+b%2*.08,Math.cos(b*2.4)*.7),E.push(S)}const R=ys(E);for(const b of E)b.dispose();return this.ownedGeometries.push(R),this.mesh(T,R,this.materials.ruin),{definition:t,group:n,cabin:r,roof:f,roofStem:d,roofLeaf:m,roofMaterial:a,marker:_,markerMaterial:y,bar:v,fill:C,supply:x,flyBodies:g,flyWings:p,ruins:T,index:e}}buildGrove(t,e){const n=new re;n.name=t.id,this.group.add(n);const s=this.material({color:["#487c47","#609147","#397553","#668349","#4d825a"][e],transparent:!0,opacity:.94,depthWrite:!0}),r=[],o=[],a=[],l=new re;l.name="tree-cover-canopy",n.add(l);for(let f=0;f<3;f++){const d=f*qu/3+e*.7,m=t.x+Math.cos(d)*t.radius*.43,x=t.z+Math.sin(d)*t.radius*.43,g=this.ground(m,x),p=3.3+f%2*.5,y=this.geometries.cylinder.clone();y.scale(.24,p,.24),y.translate(m,g+p/2,x),o.push(y);for(let v=0;v<3;v++){const C=this.geometries.leaf.clone();C.scale(1.35+v*.12,.8,1.25),C.translate(m+Math.sin(v*2.1)*.42,g+p+v*.35,x+Math.cos(v*2.1)*.35),r.push(C)}const _=this.geometries.leaf.clone();_.scale(.7,.35,.7),_.translate(m+.5,g+.22,x-.25),a.push(_)}const c=(f,d,m,x)=>{const g=ys(f);for(const y of f)y.dispose();this.ownedGeometries.push(g);const p=new Jt(g,d);return p.name=m,x.add(p),p};c(o,this.materials.wood,"grove-trunks",n),c(r,s,"grove-leaf-crown",l),c(a,this.materials.leaf,"slow-moving-underbrush",n);const h=new _n({color:"#50733f",transparent:!0,opacity:.2,side:Ue,depthWrite:!1});this.ownedMaterials.push(h);const u=this.mesh(n,this.geometries.ring,h,t.x,this.ground(t.x,t.z)+.02,t.z,t.radius,t.radius,t.radius);return u.rotation.x=-Math.PI/2,{definition:t,group:n,canopy:l,material:s}}update(t=0){const e=this.game.running?Math.max(0,Math.min(.1,t)):0;this.clock+=e;const n=this.game.state.actors?.[0],s=n?j_(n):null;this.updateWallVisibility(n,s,t);const r=this.game.state.bases||[];for(const o of this.bases.values()){const a=r.find(d=>d.id===o.definition.id||d.owner===o.definition.owner),l=!!a?.destroyed,c=N1((a?.progress||0)/10),h=c>0&&!l;o.cabin.visible=!l,o.supply.visible=!l,o.ruins.visible=l,o.markerMaterial.color.set(l?"#5c7067":h?"#ff9b58":ir[o.index]),o.markerMaterial.opacity=l?.12:h?.4+.12*Math.sin(this.clock*8):.28,o.bar.visible=h,o.fill.scale.x=2.12*c,o.fill.position.x=-1.06+1.06*c,this.game.camera&&o.bar.quaternion.copy(this.game.camera.quaternion);const u=n&&Math.hypot(n.x-o.definition.stock.x,n.z-o.definition.stock.z)<5.2,f=s?.id===o.definition.id||u?.35:1;o.roofMaterial.opacity+=(f-o.roofMaterial.opacity)*(1-Math.exp(-Math.max(t,.016)*10)),o.roofMaterial.depthWrite=o.roofMaterial.opacity>.9,o.roofStem.visible=o.roofLeaf.visible=o.roofMaterial.opacity>.6,o.cabin.position.x=h?Math.sin(this.clock*25)*.025:0;for(let d=0;d<8;d++){const m=this.clock*(1.4+d%3*.2)+d*qu/8,x=.3+d%3*.13,g=Math.sin(m)*x,p=1.05+d%3*.17+Math.sin(this.clock*4+d)*.08,y=Math.cos(m)*x,_=this.dummy;_.position.set(g,p,y),_.scale.set(.09,.08,.13),_.rotation.set(0,m,0),_.updateMatrix(),o.flyBodies.setMatrixAt(d,_.matrix);for(let v=0;v<2;v++){const C=v===0?-1:1;_.position.set(g+Math.cos(m)*C*.105,p+.035,y-Math.sin(m)*C*.105),_.scale.set(.15,.016,.07),_.rotation.set(0,m,Math.sin(this.clock*36+d)*.55*C),_.updateMatrix(),o.flyWings.setMatrixAt(d*2+v,_.matrix)}}o.flyBodies.instanceMatrix.needsUpdate=!0,o.flyWings.instanceMatrix.needsUpdate=!0}for(const o of this.groves){const l=n&&Math.hypot(n.x-o.definition.x,n.z-o.definition.z)<o.definition.radius+1.4?.23:.94;o.material.opacity+=(l-o.material.opacity)*(1-Math.exp(-Math.max(t,.016)*8)),o.material.depthWrite=o.material.opacity>.9}}dispose(){this.group.removeFromParent();for(const t of this.ownedGeometries)t.dispose();for(const t of Object.values(this.geometries))t.dispose();for(const t of this.ownedMaterials)t.dispose();for(const t of Object.values(this.materials))t.dispose();this.bases.clear(),this.enclosures.clear(),this.groves.length=0}}const Zi=["move","aim","fire"],Xr=8,ga=(i,t,e)=>Math.max(t,Math.min(e,i)),hr=(i,t)=>Number.isFinite(i)?i:t,lh=(i,t)=>({left:i.x-t.width/2,top:i.y-t.height/2,right:i.x+t.width/2,bottom:i.y+t.height/2}),F1=(i,t,e=Xr)=>i.left<t.right+e&&i.right>t.left-e&&i.top<t.bottom+e&&i.bottom>t.top-e;function Hd(i,t,e,n,s=i){const r=e.left+t.width/2,o=Math.max(r,e.right-t.width/2),a=e.top+t.height/2,l=Math.max(a,e.bottom-t.height/2),c=m=>({x:ga(hr(m?.x,r),r,o),y:ga(hr(m?.y,a),a,l)}),h=c(i),u=[h,c(s)];for(const m of n)u.push(c({x:m.left-t.width/2-Xr,y:h.y}),c({x:m.right+t.width/2+Xr,y:h.y}),c({x:h.x,y:m.top-t.height/2-Xr}),c({x:h.x,y:m.bottom+t.height/2+Xr}));for(let m=a;m<=l+16;m+=16)for(let x=r;x<=o+16;x+=16)u.push(c({x,y:m}));let f=null,d=1/0;for(const m of u){if(n.some(g=>F1(lh(m,t),g)))continue;const x=(m.x-h.x)**2+(m.y-h.y)**2;x<d&&(f=m,d=x)}return f||c(s)}function O1(i,t,e){const n=t>=i,s=e.move,r=e.aim,o=e.fire;return{move:{x:14+s.width/2,y:t-26-s.height/2},aim:{x:i-14-r.width/2,y:t-26-r.height/2},fire:n?{x:i-14-r.width/2,y:t-26-r.height-20-o.height/2}:{x:i-14-r.width-22-o.width/2,y:t-26-o.height/2}}}function B1({width:i,height:t,controls:e,preferred:n={},blocked:s=[],insets:r={}}){const o={left:Math.max(10,hr(r.left,0)+8),top:Math.max(10,hr(r.top,0)+8),right:i-Math.max(10,hr(r.right,0)+8),bottom:t-Math.max(18,hr(r.bottom,0)+8)},a=O1(i,t,e),l={},c=[...s];for(const h of Zi){const u=n[h],f=u&&Number.isFinite(u.x)&&Number.isFinite(u.y)?{x:u.x*i,y:u.y*t}:a[h];l[h]=Hd(f,e[h],o,c,a[h]),c.push(lh(l[h],e[h]))}return{positions:l,bounds:o}}function H1({root:i,movePad:t,aimPad:e,fireButton:n,toggleButton:s,storageKey:r="frog.touch-layout.v1",onEditingChange:o=()=>{},announce:a=()=>{}}){const l=i.ownerDocument,c=l.defaultView,h={move:t,aim:e,fire:n},u=i.querySelector("#layout-hint");let f=!1,d=null,m={},x={},g={},p={portrait:{},landscape:{}},y=0,_=!1,v={width:c.innerWidth,height:c.innerHeight,mode:c.innerHeight>=c.innerWidth?"portrait":"landscape"};const C=[],T=(B,O,tt,W)=>{B.addEventListener(O,tt,W),C.push(()=>B.removeEventListener(O,tt,W))},E=()=>c.innerHeight>=c.innerWidth?"portrait":"landscape";try{const B=JSON.parse(c.localStorage.getItem(r)||"null");if(B?.version===1)for(const O of["portrait","landscape"])for(const tt of Zi){const W=B[O]?.[tt];Number.isFinite(W?.x)&&Number.isFinite(W?.y)&&(p[O][tt]={x:ga(W.x,0,1),y:ga(W.y,0,1)})}}catch{}const R=()=>{const{mode:B,width:O,height:tt}=v;for(const W of Zi)m[W]&&(p[B][W]={x:m[W].x/O,y:m[W].y/tt});try{c.localStorage.setItem(r,JSON.stringify({version:1,...p}))}catch{}},b=()=>{const B=[];for(const O of l.querySelectorAll("#arcade-hud, #minimap, #view-button, #layout-button, #layout-hint, #round-status, #base-status, #catapult-status, #sabotage-status, #kick-button, #catapult-button, #sabotage-button")){if(O.hidden||O.closest("[hidden]")||c.getComputedStyle(O).visibility==="hidden")continue;const tt=O.getBoundingClientRect();tt.width&&tt.height&&B.push({left:tt.left,top:tt.top,right:tt.right,bottom:tt.bottom})}return B},S=()=>{for(const B of Zi){const O=h[B],tt=m[B];tt&&(O.style.left=`${tt.x-x[B].width/2}px`,O.style.top=`${tt.y-x[B].height/2}px`,O.style.right="auto",O.style.bottom="auto")}},L=()=>{if(_)return;const B=c.getComputedStyle(i),O={};for(const W of["left","right","top","bottom"])O[W]=parseFloat(B.getPropertyValue(`--touch-safe-${W}`))||0;for(const W of Zi){const vt=h[W],Xt=vt.getBoundingClientRect(),Me=c.getComputedStyle(vt);x[W]={width:Math.max(44,Xt.width||parseFloat(Me.width)||72),height:Math.max(44,Xt.height||parseFloat(Me.height)||72)}}const tt=B1({width:c.innerWidth,height:c.innerHeight,controls:x,preferred:p[E()],blocked:b(),insets:O});m=tt.positions,g=tt.bounds,v={width:c.innerWidth,height:c.innerHeight,mode:E()},S()},U=()=>{c.cancelAnimationFrame(y),y=c.requestAnimationFrame(L)},Y=()=>{d&&(d=null,R())},J=B=>{const O=!!B;if(O!==f){Y(),f=O,i.classList.toggle("layout-editing",f),s.setAttribute("aria-pressed",String(f)),s.setAttribute("aria-label",f?"Ολοκλήρωση αλλαγής θέσεων χειριστηρίων":"Αλλαγή θέσεων χειριστηρίων"),s.querySelector("span")?.replaceChildren(f?"ΤΕΛΟΣ":"ΘΕΣΕΙΣ"),u&&(u.hidden=!f);for(const tt of Zi)h[tt].setAttribute("data-layout-label",{move:"ΚΙΝΗΣΗ",aim:"ΣΤΟΧΕΥΣΗ",fire:"ΒΟΛΗ"}[tt]),h[tt].classList.toggle("layout-draggable",f);f||R(),o(f),a(f?"Σύρε τα χειριστήρια στη θέση που σε βολεύει. Πάτησε ΤΕΛΟΣ για να συνεχίσεις.":"Οι θέσεις των χειριστηρίων αποθηκεύτηκαν.")}},H=()=>{p[E()]={},L(),R(),a("Επαναφέρθηκαν οι αρχικές θέσεις χειριστηρίων.")};if(u){u.textContent.trim()||u.append("Σύρε κίνηση, στόχευση και βολή. ");const B=l.createElement("button");B.type="button",B.className="layout-reset",B.textContent="ΕΠΑΝΑΦΟΡΑ",B.setAttribute("aria-label","Επαναφορά αρχικών θέσεων χειριστηρίων"),u.append(B),T(B,"click",H)}for(const B of Zi){const O=h[B];T(O,"pointerdown",tt=>{f&&(tt.preventDefault(),tt.stopImmediatePropagation(),!d&&(m[B]||L(),d={key:B,id:tt.pointerId,dx:tt.clientX-m[B].x,dy:tt.clientY-m[B].y},O.setPointerCapture?.(tt.pointerId)))},!0),T(O,"pointermove",tt=>{if(!f||(tt.preventDefault(),tt.stopImmediatePropagation(),!d||d.id!==tt.pointerId||d.key!==B))return;const W=b();for(const vt of Zi)vt!==B&&m[vt]&&W.push(lh(m[vt],x[vt]));m[B]=Hd({x:tt.clientX-d.dx,y:tt.clientY-d.dy},x[B],g,W,m[B]),S()},!0);for(const tt of["pointerup","pointercancel","lostpointercapture"])T(O,tt,W=>{f&&(W.preventDefault?.(),W.stopImmediatePropagation(),d?.id===W.pointerId&&Y())},!0);T(O,"click",tt=>{f&&(tt.preventDefault(),tt.stopImmediatePropagation())},!0)}let q=-1/0;return T(s,"pointerdown",B=>{B.pointerType==="touch"&&(B.preventDefault(),B.stopPropagation(),q=Date.now(),J(!f))}),T(s,"click",B=>{(B.detail===0||Date.now()-q>600)&&J(!f)}),T(c,"resize",()=>{Y(),U()}),T(c,"orientationchange",U),T(c,"keydown",B=>{f&&B.code==="Escape"&&(B.preventDefault(),B.stopImmediatePropagation(),J(!1))},!0),T(c,"blur",()=>{Y(),f&&J(!1)}),s.setAttribute("aria-pressed","false"),U(),{get editing(){return f},setEditing:J,refresh:L,reset:H,destroy(){if(!_){J(!1),_=!0,c.cancelAnimationFrame(y);for(const B of C)B()}}}}const pn=z,zl=new pn(0,1,0),Ll=(i,t,e)=>Math.max(t,Math.min(e,i)),Ul=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"]),Nl=i=>{try{return localStorage.getItem(i)}catch{return null}},ea=(i,t)=>{try{return localStorage.setItem(i,t),!0}catch{return!1}},wr=i=>`<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">${i}</svg>`,$u=wr('<ellipse cx="21" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(-30 21 23)"/><ellipse cx="43" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(30 43 23)"/><ellipse cx="32" cy="37" rx="10" ry="15" fill="#344b50" stroke="#12282b" stroke-width="3"/><circle cx="27" cy="25" r="5" fill="#fff6cd"/><circle cx="37" cy="25" r="5" fill="#fff6cd"/><circle cx="28" cy="25" r="2" fill="#14282c"/><circle cx="36" cy="25" r="2" fill="#14282c"/>'),G1=wr('<path d="m15 8 11 5-4 21 29 6 4 10-36 4-9-11z" fill="#d3ff80" stroke="#314b2d" stroke-width="3"/><path d="m46 13 4 8m9-5-6 9m9 4-9 1" stroke="#ffce71" stroke-width="4"/>'),V1=wr('<path d="M9 50h46M18 47l10-28 18 28M31 27l20-17" stroke="#d9bf82" stroke-width="6" stroke-linecap="round"/><path d="m45 9 13 4-4 10-12-5z" fill="#8ea29a"/><circle cx="17" cy="53" r="6" fill="#6d4e35"/><circle cx="48" cy="53" r="6" fill="#6d4e35"/>'),Yu=wr('<path d="M18 10v44l36-22z" fill="#f3ffd0" stroke="#264e26" stroke-width="4" stroke-linejoin="round"/>'),W1=wr('<path d="M12 18h40M12 32h40M12 46h40" stroke="#e9f3e5" stroke-width="5" stroke-linecap="round"/><circle cx="24" cy="18" r="6" fill="#fbc562"/><circle cx="42" cy="32" r="6" fill="#fbc562"/><circle cx="24" cy="46" r="6" fill="#fbc562"/>'),X1=wr('<path d="M8 29 32 9l24 20M14 27v29h36V27" stroke="#f4dfad" stroke-width="5" stroke-linejoin="round"/><path d="M24 56V35h16v21" fill="#243e36" stroke="#f4dfad" stroke-width="3"/><path d="m12 12 11 10m29-10L41 22" stroke="#ffad7a" stroke-width="4"/>');class q1{constructor(){this.volume=.5,this.ctx=null,this.gain=null}resume(){try{this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext),this.gain=this.ctx.createGain(),this.gain.connect(this.ctx.destination)),this.gain.gain.value=this.volume,this.ctx.resume()}catch{}}pause(){this.ctx&&(this.gain.gain.value=0,this.ctx.suspend().catch(()=>{}))}play(t){if(!this.ctx||this.ctx.state!=="running"||this.volume<=0)return;const e=this.ctx,n=e.currentTime,s=e.createOscillator(),r=e.createGain(),a={shot:[200,70,.065],tongue:[560,150,.11],hit:[110,45,.12],hitConfirm:[860,530,.07],stoneShot:[110,65,.2],stoneImpact:[75,35,.3],land:[95,50,.13],dizzy:[700,240,.28],ko:[80,330,.26],win:[400,800,.45],lost:[220,55,.4]}[t];a&&(s.type=t==="hit"?"triangle":"sine",s.frequency.setValueAtTime(a[0],n),s.frequency.exponentialRampToValueAtTime(a[1],n+a[2]),r.gain.setValueAtTime(1e-4,n),r.gain.exponentialRampToValueAtTime(.14,n+.008),r.gain.exponentialRampToValueAtTime(1e-4,n+a[2]),s.connect(r),r.connect(this.gain),s.start(n),s.stop(n+a[2]+.01),s.onended=()=>{s.disconnect(),r.disconnect()})}}class $1{constructor(){this.touch=matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>0,this.settings={volume:.5,quality:this.touch?"low":"high"};try{Object.assign(this.settings,JSON.parse(Nl(Al)||"{}"))}catch{}this.settings.volume=Ll(Number(this.settings.volume)||0,0,1),["low","high"].includes(this.settings.quality)||(this.settings.quality="low");const t=Nl(Zo);try{JSON.parse(t)?.version===1&&!Nl(Zo+"-before-bases")&&ea(Zo+"-before-bases",t)}catch{}this.state=Pc(),this.saved=y1(t),this.running=!1,this.mode="title",this.keys=new Set,this.actions={fire:!1,kick:!1,sabotage:!1},this.aimStrength=0,this.lastMouseAim=-1/0,this.move={x:0,z:0},this.aim={x:0,z:-1},this.mouse={x:0,y:0,valid:!1},this.pointers=new Map,this.moveBasis=null,this.aimBasis=null,this.keyboardBasis=null,this.layoutEditing=!1,this.fx=[],this.particles=[],this.splats=[],this.tongues=new Map,this.bulletMeshes=new Map,this.koTimes=new Map,this.elapsed=0,this.shake=0,this.saveClock=0,this.accumulator=0,this.failures=[],this.hitConfirmUntil=0,this.lastPlayerHit=null,this.scene=new kp,this.scene.background=new te("#9fe4ff"),this.scene.fog=new va("#baf0ea",.006),this.renderer=new t_({antialias:!this.touch,powerPreference:"high-performance"}),this.renderer.domElement.id="arcade-world",this.renderer.domElement.setAttribute("aria-label","FROG — κωμική μάχη με μύγες"),this.renderer.outputColorSpace=In,this.renderer.toneMapping=Ku,this.renderer.toneMappingExposure=1.3,document.body.append(this.renderer.domElement),this.camera=new zn(52,innerWidth/innerHeight,.1,250),this.camera.position.set(0,8,15),this.focus=new pn(0,2,3),this.cameraTarget=new pn(0,8,15),this.viewMode="chase3d",this.cameraReady=!1,this.scene.add(new um("#def8ff","#52733a",2.6)),this.sun=new mm("#fff1bf",3.2),this.sun.position.set(-16,36,12),this.scene.add(this.sun),this.world=U_(this.scene,this.renderer,{seed:731,natural:!0});const e=this.world.group.getObjectByName("Fly swarms");e&&(e.visible=!1);for(const n of this.world.hotspots)n.flies=0;this.labels=document.createElement("canvas"),this.labels.id="arcade-labels",document.body.append(this.labels),this.labelCtx=this.labels.getContext("2d"),this.sound=new q1,this.sound.volume=this.settings.volume,this.shared={sphere:new Xn(1,10,7),wing:new Xn(1,6,4),cylinder:new As(1,1,1,8),circle:new _a(1,18)},this.materials={insect:new Ve({color:"#263f42",roughness:.8,metalness:0}),wing:new _n({color:"#edfcff",transparent:!0,opacity:.86,side:Ue,depthWrite:!1}),tongue:new Ve({color:"#ff839c",roughness:.4}),shot:new Ve({color:"#384b4d",emissive:"#a6c9bf",emissiveIntensity:.16}),ink:new _n({color:"#90e44c",transparent:!0,opacity:.9,depthWrite:!1,side:Ue}),rock:new Ve({color:"#617b70",roughness:.9}),rim:new _n({color:"#eaff9e",transparent:!0,opacity:.6,depthWrite:!1})},this.createArena(),this.models=[],this.buildActors(),this.createFlies(),this.artilleryView=new P1(this),this.basesView=new k1(this),this.impactEffects=new U1(this),this.createUI(),this.bindInputs(),this.applyQuality(),this.resize(),this.showTitle(),window.__FROG__={version:Tl,mode:"arcade",inspect:()=>this.inspect(),save:()=>this.persist()},new URLSearchParams(location.search).has("test")&&(window.__FROG__.test={step:(n,s=1)=>{for(let r=0;r<s;r++)Vu(this.state,n,1/60),this.consumeEvents();this.updateHUD()},state:()=>this.state,setState:n=>{this.state=n,this.buildActors(),this.updateHUD()},input:()=>this.currentInput(),kickTarget:()=>Dc(this.state,this.state.actors[0])?.id}),this.last=performance.now(),this.renderer.setAnimationLoop(n=>this.frame(n)),document.getElementById("boot")?.remove()}ground(t,e){return this.world.getSurface(t,e).height}createArena(){this.obstacleMeshes=[];for(const n of Cs){const s=new Jt(new ya(n.r,1),this.materials.rock);s.scale.y=1.7,s.position.set(n.x,this.ground(n.x,n.z)+n.r*.9,n.z),this.scene.add(s),this.obstacleMeshes.push(s)}const t=[];for(let n=0;n<=160;n++){const s=n/160*Math.PI*2,r=Math.sin(s)*At.radius,o=Math.cos(s)*At.radius;t.push(new pn(r,this.ground(r,o)+.06,o))}const e=new so(new Te().setFromPoints(t),this.materials.rim);this.scene.add(e),this.playerRing=new Jt(new Ji(1.05,1.18,32),new _n({color:"#ecff9a",side:Ue,transparent:!0,opacity:.85,depthWrite:!1})),this.playerRing.rotation.x=-Math.PI/2,this.scene.add(this.playerRing),this.aimGuide=new so(new Te().setFromPoints([new pn,new pn]),new Md({color:"#fff2b0",dashSize:.45,gapSize:.35,transparent:!0,opacity:.65})),this.scene.add(this.aimGuide),this.aimReticle=new Jt(new Ji(.35,.42,24),new _n({color:"#fff2b0",side:Ue,transparent:!0,opacity:.88,depthWrite:!1})),this.aimReticle.rotation.x=-Math.PI/2,this.scene.add(this.aimReticle),this.targetRing=new Jt(new Ji(1.32,1.44,32),new _n({color:"#ffb19c",side:Ue,transparent:!0,opacity:.9,depthWrite:!1})),this.targetRing.rotation.x=-Math.PI/2,this.targetRing.visible=!1,this.scene.add(this.targetRing),this.swarmRings=yr.map(n=>{const s=new Jt(new Ji(n.radius-.08,n.radius+.03,40),new _n({color:"#c8e0a3",side:Ue,transparent:!0,opacity:.22,depthWrite:!1}));return s.rotation.x=-Math.PI/2,s.position.set(n.x,this.ground(n.x,n.z)+.08,n.z),this.scene.add(s),s})}buildActors(){for(const t of this.models||[])t.dispose();this.models=this.state.actors.map((t,e)=>{const n=X_("frog",{seed:7+e*39,team:e===0?"player":`enemy${e}`,role:e===2?"bruiser":"hunter",tier:1,level:1});if(n.setEquipment({}),n.setOutline(e===0?"#e7fca7":e===1?"#ffae88":"#d3a8ff",!0),this.settings.quality==="low"&&n.setRenderLOD(1),n.mesh?.material){const s=n.mesh.material;s.bumpScale=0,s.roughness=.85,s.userData?.tint?.set(["#86da38","#ff694a","#bb70ed"][e])}return this.scene.add(n.group),n})}createFlies(){const t=this.state.flies.length;this.flyBodies=new wn(this.shared.sphere,this.materials.insect,t),this.flyWings=new wn(this.shared.wing,this.materials.wing,t*2);for(const e of[this.flyBodies,this.flyWings])e.instanceMatrix.setUsage(Ei),e.frustumCulled=!1,this.scene.add(e);this.dummy=new We}createUI(){this.ui=document.createElement("div"),this.ui.id="arcade-ui",this.ui.classList.toggle("is-touch",this.touch),this.ui.innerHTML=`<header id="arcade-hud" hidden><button class="view-button" id="view-button" aria-label="Αλλαγή σε κεντραρισμένη κάτοψη">ΠΙΣΩ 3D · C</button><div class="ammo-card">${$u}<div class="ammo-info"><div class="ammo-numbers"><strong id="ammo-count">0 / ${At.capacity}</strong><b id="ammo-percent">0%</b></div><div id="ammo-track" role="progressbar" aria-label="Γέμιση με μύγες" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="ammo-fill"></i></div><span id="ammo-state">Γέμισε στην αποθήκη σου</span></div></div><div class="ko-card base-card"><b id="ko-count">3 / 3</b><span>ΑΠΟΘΗΚΕΣ</span><div id="base-dots" aria-label="Άθικτες αποθήκες"><i data-owner="player"></i><i data-owner="rival-1"></i><i data-owner="rival-2"></i></div></div><button class="small-button" id="pause-button" aria-label="Παύση">Ⅱ</button></header>
  <div id="round-status" hidden><b id="round-time">20″</b><span id="round-copy">ΠΡΟΕΤΟΙΜΑΣΙΑ · Γέμισε έως 60 μύγες</span></div><div id="base-status" hidden></div>
  <button id="catapult-button" class="touch-action catapult-button" aria-label="Χρήση κοντινού καταπέλτη" hidden>${V1}<span>ΧΡΗΣΗ</span></button><div id="catapult-status" hidden></div>
  <button id="sabotage-button" class="touch-action sabotage-button" aria-label="Κράτησε για καταστροφή εχθρικής αποθήκης" hidden>${X1}<span>ΚΡΑΤΑ · 10″</span></button><div id="sabotage-status" hidden><span id="sabotage-copy"></span><div role="progressbar" aria-label="Καταστροφή αποθήκης" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="sabotage-track"><i id="sabotage-fill"></i></div></div>
  <canvas id="minimap" width="320" height="320" aria-label="Χάρτης: η βάση σου πράσινη, εχθρικές αποθήκες κόκκινη και μωβ, είσοδοι, καταπέλτες και σμήνη"></canvas><div id="dizzy-banner" hidden>🌀 ΖΑΛΙΣΤΗΚΕΣ! <b id="dizzy-time"></b></div><div id="callout" aria-live="polite"></div>
  <div id="desktop-help" hidden><span><b>WASD</b> Άλματα</span><span><b>Κλικ</b> Μύγες</span><span><b>E κράτημα</b> Εχθρική αποθήκη</span><span><b>E</b> Καταπέλτης</span><span id="pc-kick"><b>Q</b> Κλωτσιά</span></div>
  <div id="touch-controls" hidden><div class="stick-zone move-zone"><div id="move-stick" class="stick" aria-label="Κίνηση"><div class="stick-inner"></div><div class="stick-knob"></div></div><span class="stick-caption">ΑΛΜΑΤΑ</span></div><button id="kick-button" class="touch-action kick-button" aria-label="Αμυντική κλωτσιά για απώθηση κοντινού αντιπάλου" hidden disabled>${G1}<span>ΚΛΩΤΣΙΑ</span></button><button id="fire-button" class="touch-action fire-button" aria-label="Κράτησε για εκτόξευση μυγών">${$u}<span>ΠΥΡ</span></button><div class="stick-zone aim-zone"><div id="aim-stick" class="stick" aria-label="Στόχευση"><div class="fire-ring"></div><div class="stick-inner"></div><div class="stick-knob"></div><span class="aim-center" aria-hidden="true">+</span></div><span class="stick-caption">ΣΤΟΧΕΥΣΗ</span></div><button id="layout-button" class="layout-button" aria-label="Μετακίνηση χειριστηρίων"><b aria-hidden="true">↔</b><span>ΘΕΣΕΙΣ</span></button><div id="layout-hint" hidden>Σύρε τα χειριστήρια στη θέση σου.</div></div>
  <section id="arcade-menu" class="menu"><div id="menu-main" class="menu-buttons"><button id="play-button" class="art-button play-button">${Yu}<span>ΠΑΙΞΕ</span></button><button id="settings-button" class="art-button settings-button">${W1}<span>ΡΥΘΜΙΣΕΙΣ</span></button></div><div id="settings-panel" class="settings-panel" hidden><h2>Ρυθμίσεις</h2><label>Ήχος <input id="volume" type="range" min="0" max="100" value="${Math.round(this.settings.volume*100)}"></label><label>Γραφικά <select id="quality"><option value="low">Ομαλή κίνηση</option><option value="high">Υψηλά</option></select></label><button id="settings-back" class="art-button compact">ΠΙΣΩ</button></div><div id="result-panel" class="result-panel" hidden><span class="result-kicker">FROG • FLY FRENZY</span><h1 id="result-title"></h1><p id="result-copy"></p><button id="replay-button" class="art-button play-button">${Yu}<span>ΠΑΙΞΕ ΞΑΝΑ</span></button><button id="result-settings" class="plain-button">Ρυθμίσεις</button></div><span class="version">FROG ${Tl}</span></section>`,document.body.append(this.ui),this.$=t=>this.ui.querySelector("#"+t),this.$("quality").value=this.settings.quality,this.$("view-button").onclick=()=>this.toggleView(),this.$("play-button").onclick=()=>this.startOrResume(),this.$("pause-button").onclick=()=>this.pause(),this.$("settings-button").onclick=()=>this.settingsMenu(),this.$("result-settings").onclick=()=>this.settingsMenu(),this.$("settings-back").onclick=()=>{this.$("settings-panel").hidden=!0,this.mode==="result"?this.$("result-panel").hidden=!1:this.$("menu-main").hidden=!1},this.$("replay-button").onclick=()=>this.startNew(),this.$("volume").oninput=t=>{this.settings.volume=Number(t.target.value)/100,this.sound.volume=this.settings.volume,ea(Al,JSON.stringify(this.settings))},this.$("quality").onchange=t=>{this.settings.quality=t.target.value,this.applyQuality(),ea(Al,JSON.stringify(this.settings))},this.touchLayout=H1({root:this.$("touch-controls"),movePad:this.ui.querySelector(".move-zone"),aimPad:this.ui.querySelector(".aim-zone"),fireButton:this.$("fire-button"),toggleButton:this.$("layout-button"),storageKey:"frog-touch-layout-v1",onEditingChange:t=>{this.layoutEditing=t,this.clearInputs(),this.accumulator=0,t?this.sound.pause():this.running&&this.sound.resume()},announce:t=>this.message(t,2)})}showTitle(){this.running=!1,this.mode="title",this.$("play-button").querySelector("span").textContent=this.saved?.status==="playing"?"ΣΥΝΕΧΕΙΑ":"ΠΑΙΞΕ",this.ui.classList.add("in-menu")}settingsMenu(){this.$("menu-main").hidden=!0,this.$("result-panel").hidden=!0,this.$("settings-panel").hidden=!1}startOrResume(){if(this.mode==="pause"){this.go();return}this.saved?.status==="playing"?(this.state=this.saved,this.saved=null,this.buildActors(),this.go()):this.startNew()}toggleView(){this.viewMode=this.viewMode==="chase3d"?"overview":"chase3d",this.$("view-button").textContent=this.viewMode==="chase3d"?"ΠΙΣΩ 3D · C":"ΚΑΤΟΨΗ · C",this.$("view-button").setAttribute("aria-label",this.viewMode==="chase3d"?"Αλλαγή σε κεντραρισμένη κάτοψη":"Αλλαγή σε κάμερα πίσω από τον βάτραχο"),this.cameraReady=!1}startNew(){this.aim={x:0,z:-1},this.mouse.valid=!1,this.cameraReady=!1,this.state=Pc(731+Math.floor(Math.random()*1e5)),this.clearEffects(),this.buildActors(),this.go(),this.message("Γέμισε αυτόματα και προστάτεψε την αποθήκη σου.",4)}go(){this.clearInputs(),this.accumulator=0,this.last=performance.now(),this.running=!0,this.mode="play",this.$("arcade-menu").hidden=!0,this.$("settings-panel").hidden=!0,this.$("result-panel").hidden=!0,this.$("menu-main").hidden=!1,this.$("arcade-hud").hidden=!1,this.$("desktop-help").hidden=this.touch,this.$("touch-controls").hidden=!this.touch,this.ui.classList.remove("in-menu"),this.sound.resume(),this.updateHUD(),this.touchLayout?.refresh(),this.persist()}pause(){this.running&&(this.touchLayout?.setEditing(!1),this.running=!1,this.mode="pause",this.clearInputs(),this.persist(),this.sound.pause(),this.$("arcade-menu").hidden=!1,this.$("menu-main").hidden=!1,this.$("settings-panel").hidden=!0,this.$("play-button").querySelector("span").textContent="ΣΥΝΕΧΕΙΑ",this.ui.classList.add("in-menu"))}finish(){this.touchLayout?.setEditing(!1),this.running=!1,this.mode="finishing",this.resultAt=this.elapsed+.85,this.clearInputs(),this.persist()}showResult(){this.running=!1,this.mode="result",this.clearInputs(),this.persist();const t=this.state.status==="won";this.sound.play(t?"win":"lost"),this.$("arcade-menu").hidden=!1,this.$("menu-main").hidden=!0,this.$("result-panel").hidden=!1,this.$("result-title").textContent=t?"Η ΤΕΛΕΥΤΑΙΑ ΑΠΟΘΗΚΗ ΕΙΝΑΙ ΔΙΚΗ ΣΟΥ!":"Η ΑΠΟΘΗΚΗ ΣΟΥ ΚΑΤΑΣΤΡΑΦΗΚΕ",this.$("result-copy").textContent=t?`${this.state.stats.kos} νοκ άουτ · ${this.state.stats.shots} βολές · ${Math.floor(this.state.time)}″ μάχης`:"Κράτησε την είσοδο, διέκοψε τους εισβολείς με μία εύστοχη βολή και ανεφοδιάσου πριν ξαναβγείς.",this.ui.classList.add("in-menu")}persist(){return this.mode==="title"?!1:ea(Zo,_1(this.state))}clearInputs(){if(this.keys.clear(),this.actions={fire:!1,kick:!1,sabotage:!1},this.aimStrength=0,this.mouse.valid=!1,this.lastMouseAim=-1/0,this.move={x:0,z:0},this.moveBasis=null,this.aimBasis=null,this.keyboardBasis=null,this.pointers.clear(),this.ui){for(const t of this.ui.querySelectorAll(".stick-knob"))t.style.transform="translate(-50%,-50%)";this.$("aim-stick").classList.remove("firing"),this.$("fire-button")?.classList.remove("firing")}}bindInputs(){addEventListener("keydown",s=>{if(!s.target.matches("input,select")){if(s.code==="Escape"){if(s.preventDefault(),this.layoutEditing){this.touchLayout.setEditing(!1);return}this.running?this.pause():this.mode==="pause"&&this.go();return}if(!(!this.running||this.layoutEditing)){if(s.code==="KeyC"&&!s.repeat){s.preventDefault(),this.toggleView();return}(Ul.has(s.code)||["KeyQ","KeyE"].includes(s.code))&&(s.preventDefault(),Ul.has(s.code)&&!this.keyboardBasis&&(this.keyboardBasis=Ko(this.camera.position,this.focus)),this.keys.add(s.code))}}}),addEventListener("keyup",s=>{this.keys.delete(s.code),[...this.keys].some(r=>Ul.has(r))||(this.keyboardBasis=null)});const t=this.renderer.domElement;t.addEventListener("pointermove",s=>{s.pointerType==="mouse"&&this.running&&!this.layoutEditing&&this.captureMouseAim(s)}),t.addEventListener("pointerdown",s=>{!this.running||this.layoutEditing||s.pointerType==="touch"||(s.preventDefault(),this.captureMouseAim(s),s.button===0&&(this.actions.fire=!0))}),addEventListener("pointerup",s=>{s.pointerType!=="touch"&&s.button===0&&(this.actions.fire=!1)}),t.addEventListener("contextmenu",s=>s.preventDefault());const e=(s,r)=>{const o=this.$(s),a=o.querySelector(".stick-knob");let l=null;const c=u=>{const f=o.getBoundingClientRect(),d=(u.clientX-f.left-f.width/2)/(f.width/2),m=(u.clientY-f.top-f.height/2)/(f.height/2),x=c1(d,m),g=Math.hypot(d,m),p=g>1?1/g:1;if(a.style.transform=`translate(-50%,-50%) translate(${d*p*f.width*.31}px,${m*p*f.height*.31}px)`,r==="move")this.move={x:x.x,z:x.z};else if(this.aimStrength=Math.min(1,g),g>.08){const y=this.aimBasis||Ko(this.camera.position,this.focus);this.aim={...Cl(d/g,m/g,y.camera,y.focus),distance:14}}this.mouse.valid=!1};o.onpointerdown=u=>{!this.running||this.layoutEditing||l!==null&&this.pointers.has(r)||(u.preventDefault(),l=u.pointerId,this.pointers.set(r,l),this[r==="move"?"moveBasis":"aimBasis"]=Ko(this.camera.position,this.focus),o.setPointerCapture(u.pointerId),c(u))},o.onpointermove=u=>{!this.layoutEditing&&l===u.pointerId&&this.pointers.get(r)===l&&(u.preventDefault(),c(u))};const h=u=>{u.pointerId===l&&(l=null,this.pointers.delete(r),a.style.transform="translate(-50%,-50%)",r==="move"?(this.move={x:0,z:0},this.moveBasis=null):(this.aimStrength=0,this.aimBasis=null,o.classList.remove("firing")))};o.onpointerup=h,o.onpointercancel=h,o.onlostpointercapture=h};e("move-stick","move"),e("aim-stick","aim");const n=(s,r)=>{const o=this.$(s);let a=null;o.onpointerdown=c=>{!this.running||this.layoutEditing||o.disabled||(c.preventDefault(),a=c.pointerId,o.setPointerCapture(c.pointerId),this.actions[r]=!0)};const l=c=>{c.pointerId===a&&(a=null,this.actions[r]=!1)};o.onpointerup=l,o.onpointercancel=l,o.onlostpointercapture=l};n("kick-button","kick"),n("fire-button","fire"),n("sabotage-button","sabotage"),addEventListener("blur",()=>{this.clearInputs(),this.running&&this.pause()}),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.clearInputs(),this.pause(),this.sound.pause())}),addEventListener("beforeunload",()=>this.persist()),addEventListener("resize",()=>{this.clearInputs(),this.resize()})}applyQuality(){const t=this.settings.quality==="low";this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,t?1:1.5));for(const e of this.models)e.setRenderLOD(t?1:0);this.resize()}resize(){const t=innerWidth,e=innerHeight;this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.cameraReady=!1,this.labels.width=t,this.labels.height=e,this.w=t,this.h=e,this.touchLayout?.refresh()}captureMouseAim(t){const e=this.state.actors[0],n=new ul,s=new pn;n.setFromCamera(new Gt(t.clientX/this.w*2-1,1-t.clientY/this.h*2),this.camera);const r=n.ray.intersectPlane(new ci(zl,-this.ground(e.x,e.z)-.9),s)?{x:s.x,z:s.z}:this.mouse.target;this.mouse={x:t.clientX,y:t.clientY,valid:!0,target:r},this.lastMouseAim=performance.now()}aimFromScreen(t,e){const n=this.state.actors[0],s=this.ground(n.x,n.z)+.9,r=this.project(n.x,s,n.z),o=Math.min(this.w,this.h)*.34,a=new pn,l=new ul;if(l.setFromCamera(new Gt((r.x+t*o)/this.w*2-1,1-(r.y+e*o)/this.h*2),this.camera),l.ray.intersectPlane(new ci(zl,-s),a)){const c=a.x-n.x,h=a.z-n.z,u=Math.hypot(c,h);if(u>.05&&Number.isFinite(u))return{x:c/u,z:h/u,distance:u}}return Cl(t,e,this.camera.position,this.focus)}currentInput(){if(this.layoutEditing)return{};const t=this.state.actors[0],e=this.actions.fire||this.pointers.has("aim")&&this.aimStrength>.08||!this.touch&&this.mouse.valid&&performance.now()-this.lastMouseAim<220;if(this.mouse.valid&&e&&this.mouse.target){const r=this.mouse.target.x-t.x,o=this.mouse.target.z-t.z,a=Math.hypot(r,o);a>.1&&(this.aim={x:r/a,z:o/a,distance:a})}const n=this.keyboardBasis||this.moveBasis||Ko(this.camera.position,this.focus),s=Cl(this.move.x+(this.keys.has("KeyD")||this.keys.has("ArrowRight")?1:0)-(this.keys.has("KeyA")||this.keys.has("ArrowLeft")?1:0),this.move.z+(this.keys.has("KeyS")||this.keys.has("ArrowDown")?1:0)-(this.keys.has("KeyW")||this.keys.has("ArrowUp")?1:0),n.camera,n.focus);return{mx:s.x,mz:s.z,ax:this.aim.x,az:this.aim.z,aiming:e,fire:this.actions.fire,kick:this.actions.kick||this.keys.has("KeyQ"),sabotage:!t.catapultId&&(this.actions.sabotage||this.keys.has("KeyE"))}}message(t,e=1.5){this.$("callout").textContent=t,this.calloutUntil=this.elapsed+e}makeFlyBullet(){const t=new re,e=new Jt(this.shared.sphere,this.materials.shot);e.scale.set(.12,.1,.19),t.add(e);for(const n of[-1,1]){const s=new Jt(this.shared.wing,this.materials.wing);s.position.set(n*.13,.07,0),s.scale.set(.17,.018,.09),t.add(s)}return this.scene.add(t),t}consumeEvents(){for(const t of this.state.events){this.artilleryView?.consumeEvent(t);const e=this.state.actors.findIndex(r=>r.id===t.id),n=this.state.actors[e],s=this.models[e];if(t.type==="tongue"&&n){const r=this.tongues.get(n.id);r&&this.scene.remove(r.mesh);const o=new Jt(this.shared.cylinder,this.materials.tongue);this.scene.add(o),this.tongues.set(n.id,{mesh:o,start:this.elapsed,x:t.x,z:t.z}),n.id==="player"&&!t.empty&&this.sound.play("tongue")}if(t.type==="shot"&&n?.id==="player"&&this.sound.play("shot"),t.type==="hit"&&s){s.mesh.material.emissive?.set("#ffffff");const r=s.group.rotation.y,o=Math.cos(r),a=Math.sin(r);s.setImpact({x:o*t.dx-a*t.dz,z:a*t.dx+o*t.dz,strength:1.3,duration:n.knockUp>0?.42:.27}),this.impactEffects.hit({...t,height:this.ground(t.x,t.z)+n.height+.75,heavy:n.knockUp>0}),this.shake=Math.max(this.shake,n.id==="player"?.16:.025),t.owner==="player"&&n.id!=="player"?(this.hitConfirmUntil=this.elapsed+.2,this.lastPlayerHit={id:n.id,x:t.x,z:t.z,time:this.elapsed},this.sound.play("hitConfirm")):n.id==="player"&&this.sound.play("hit")}if(t.type==="dizzy"&&(this.addText("ΖΑΛΗ!",n.x,n.z,"#ffe375",1),this.sound.play("dizzy"),n.id!=="player"&&this.message("ΖΑΛΙΣΤΗΚΕ! ΣΥΝΕΧΙΣΕ ΤΙΣ ΕΥΣΤΟΧΕΣ ΒΟΛΕΣ.",2)),t.type==="ko"&&(this.koTimes.set(n.id,{time:this.elapsed,dx:t.dx,dz:t.dz}),this.addText("ΝΟΚ ΑΟΥΤ!",n.x,n.z,"#ffe791",1.4),this.sound.play("ko"),this.shake=.32,this.makeSplat({...t,wall:!1})),t.type==="respawn"&&(this.koTimes.delete(t.id),t.id==="player"&&(this.clearInputs(),this.cameraReady=!1,this.aim={x:n.aimX,z:n.aimZ},this.message("Επέστρεψες! Γέμισε στην αποθήκη σου.",2.5))),t.type==="sabotageStart"&&(t.id==="player"?this.message("ΕΙΣΒΟΛΕΑΣ ΣΤΗΝ ΑΠΟΘΗΚΗ! Χτύπησέ τον για να τον σταματήσεις.",3):t.by==="player"&&this.message("Κράτα μέχρι το τέλος · οι βολές εναντίον σου διακόπτουν.",2)),t.type==="sabotageInterrupted"&&t.by==="player"&&this.message(t.reason==="hit"?"Σε χτύπησαν! Η καταστροφή διακόπηκε.":"Η καταστροφή διακόπηκε.",1.5),t.type==="baseDestroyed"){const r=Vn.find(o=>o.id===t.baseId);r&&this.addText("ΑΠΟΘΗΚΗ ΚΑΤΑΣΤΡΑΦΗΚΕ",r.stock.x,r.stock.z,"#ffc689",2),this.sound.play("stoneImpact"),this.shake=.2}t.type==="splat"&&this.makeSplat(t),t.type==="stoneShot"&&this.sound.play("stoneShot"),t.type==="land"&&t.stone&&(this.impactEffects.landing(t),Math.hypot(t.x-this.state.actors[0].x,t.z-this.state.actors[0].z)<10&&this.sound.play("land")),t.type==="stoneImpact"&&(this.sound.play("stoneImpact"),this.impactEffects.stone(t),Math.hypot(t.x-this.state.actors[0].x,t.z-this.state.actors[0].z)<7&&(this.shake=Math.max(this.shake,.16))),t.type==="battle"&&this.message("ΜΑΧΗ! Κερδίζει η τελευταία άθικτη αποθήκη.",4)}}addText(t,e,n,s,r){this.fx.push({text:t,x:e,z:n,color:s,life:r,start:this.elapsed}),this.fx.length>28&&this.fx.shift()}burst(t,e){for(let n=0;n<9;n++){const s=new Jt(this.shared.sphere,this.materials.shot);s.scale.setScalar(.06+Math.random()*.07),s.position.set(t,this.ground(t,e)+1,e),this.scene.add(s),this.particles.push({mesh:s,start:this.elapsed,v:new pn((Math.random()-.5)*6,2+Math.random()*4,(Math.random()-.5)*6)})}for(;this.particles.length>90;)this.particles.shift().mesh.removeFromParent()}makeSplat(t){const e=[];for(let l=0;l<20;l++){const c=l/20*6.283,h=(l+1)/20*6.283,u=.4+l%3*.14,f=.4+(l+1)%3*.14;e.push(0,0,0,Math.cos(c)*u,Math.sin(c)*u,0,Math.cos(h)*f,Math.sin(h)*f,0)}const s=new Te;s.setAttribute("position",new Wt(e,3));const r=this.materials.ink.clone();r.color.set(["#d2ed4d","#f5bf52","#c6ef78"][this.splats.length%3]);const o=new Jt(s,r),a=this.ground(t.x,t.z);if(t.wall){const l=new pn(t.x-t.dx*1.5,a+.9,t.z-t.dz*1.5),c=new pn(t.dx,0,t.dz);for(const u of this.obstacleMeshes)u.updateMatrixWorld();const h=new ul(l,c,0,5).intersectObjects(this.obstacleMeshes,!1)[0];if(h){const u=h.face.normal.clone().transformDirection(h.object.matrixWorld);o.position.copy(h.point).addScaledVector(u,.025),o.quaternion.setFromUnitVectors(new pn(0,0,1),u)}else o.position.set(t.x,a+.05,t.z),o.rotation.x=-Math.PI/2}else o.position.set(t.x,a+.045,t.z),o.rotation.x=-Math.PI/2;if(this.scene.add(o),this.splats.push({mesh:o,start:this.elapsed}),this.splats.length>90){const l=this.splats.shift();l.mesh.removeFromParent(),l.mesh.geometry.dispose(),l.mesh.material.dispose()}}clearEffects(){this.impactEffects?.clear();for(const t of this.particles)t.mesh.removeFromParent();this.particles=[];for(const t of this.splats)t.mesh.removeFromParent(),t.mesh.geometry.dispose(),t.mesh.material.dispose();this.splats=[];for(const t of this.bulletMeshes.values())t.removeFromParent();this.bulletMeshes.clear();for(const t of this.tongues.values())t.mesh.removeFromParent();this.tongues.clear(),this.fx=[],this.koTimes.clear()}updateHUD(){const t=this.state.actors[0],e=Math.round(t.ammo/At.capacity*100),n=Dc(this.state,t),s=Ps(this.state,t),r=this.state.bases.filter(y=>!y.destroyed).length,o=Vn.find(y=>y.owner===t.id)?.stock,a=s&&!s.destroyed&&o&&Math.hypot(t.x-o.x,t.z-o.z)<=At.pickupRange&&Rs(t,o),l=Aa(t)&&t.revealedTime<=0,c=Ra(this.state,t),h=this.state.bases.find(y=>!y.destroyed&&y.attackerId===t.id),u=this.$("sabotage-button");u.hidden=!this.running||this.layoutEditing||this.state.phase!=="battle"||t.ko||t.catapultId||!c,u.disabled=t.dizzyTime>0||t.knockUp>0||t.hit>0||t.sabotageRecovery>0,u.querySelector("span").textContent=h?`${Math.max(0,At.sabotageSeconds-h.progress).toFixed(1)}″`:this.touch?"ΚΡΑΤΑ · 10″":"ΚΡΑΤΑ E · 10″",this.$("sabotage-status").hidden=!this.running||!h;const f=h?h.progress/At.sabotageSeconds:0;this.$("sabotage-copy").textContent="ΚΑΤΑΣΤΡΟΦΗ ΑΠΟΘΗΚΗΣ",this.$("sabotage-fill").style.transform=`scaleX(${f})`,this.$("sabotage-track").setAttribute("aria-valuenow",String(Math.round(f*100)));const d=this.state.catapults?.find(y=>y.id===t.catapultId),m=Ud(this.state,t),x=this.$("catapult-button");x.hidden=!this.running||t.ko||!d&&(!m||this.state.phase!=="battle"),x.disabled=t.dizzyTime>0||t.knockUp>0,x.querySelector("span").textContent=d?"ΕΞΟΔΟΣ":"ΧΡΗΣΗ",x.setAttribute("aria-label",d?"Έξοδος από τον καταπέλτη":"Χρήση κοντινού καταπέλτη"),x.classList.toggle("ready",!!d),this.$("catapult-status").hidden=!d||!this.running,this.$("catapult-status").textContent=d?d.cooldown>0?`ΦΟΡΤΩΝΕΙ ΠΕΤΡΑ · ${d.cooldown.toFixed(1)}″`:this.touch?"ΣΗΜΑΔΕΨΕ · ΠΑΤΑ ΠΕΤΡΑ":"ΠΕΤΡΑ ΕΤΟΙΜΗ · ΑΡΙΣΤΕΡΟ ΚΛΙΚ":"",this.$("aim-stick").classList.toggle("catapult",!!d),this.ui.querySelector(".aim-zone .stick-caption").textContent=d?"ΚΑΤΕΥΘΥΝΣΗ · ΙΣΧΥΣ":"ΣΤΟΧΕΥΣΗ",this.ui.querySelector(".move-zone").classList.toggle("mounted",!!d),this.$("fire-button").disabled=!this.layoutEditing&&(t.ko||t.dizzyTime>0||t.knockUp>0),this.$("fire-button").querySelector("span").textContent=d?"ΠΕΤΡΑ":"ΠΥΡ",this.$("fire-button").classList.toggle("firing",this.actions.fire),this.$("fire-button").classList.toggle("empty",d?d.cooldown>0:t.ammo===0),this.$("ammo-count").textContent=`${t.ammo} / ${At.capacity}`,this.$("ammo-percent").textContent=e+"%",this.$("ammo-fill").style.transform=`scaleX(${e/100})`,this.$("ammo-track").setAttribute("aria-valuenow",String(e)),this.$("ammo-state").textContent=t.ko?"Επιστρέφεις στην αποθήκη":t.ammo===At.capacity?"ΓΕΜΑΤΟΣ!":a?"ΑΠΟΘΗΚΗ ∞ · ΓΕΜΙΖΕΙ…":t.tongue>0?"ΜΑΖΕΥΕΙ ΜΥΓΕΣ…":t.ammo===0?"Γύρνα στην αποθήκη ή βρες σμήνος":"Μύγες για τις επόμενες βολές",this.$("ko-count").textContent=`${r} / 3`;for(const y of this.$("base-dots").children){const _=this.state.bases.find(v=>v.owner===y.dataset.owner);y.classList.toggle("destroyed",!!_?.destroyed),y.classList.toggle("attacked",!!_?.attackerId),y.title=(y.dataset.owner==="player"?"Η αποθήκη σου":y.dataset.owner==="rival-1"?"Κόκκινη αποθήκη":"Μωβ αποθήκη")+(_?.destroyed?" · κατεστραμμένη":_?.attackerId?" · υπό επίθεση":" · άθικτη")}this.$("round-status").hidden=!this.running,this.$("round-status").classList.toggle("warmup",this.state.phase!=="battle"),this.$("round-time").textContent=this.layoutEditing?"↔":t.ko?`${Math.ceil(t.respawnTime||0)}″`:this.state.phase!=="battle"?`${Math.ceil(this.state.intro)}″`:`${r}`,this.$("round-copy").textContent=this.layoutEditing?"ΡΥΘΜΙΣΗ ΘΕΣΕΩΝ · Το παιχνίδι περιμένει":t.ko?"ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΒΑΣΗ":this.state.phase!=="battle"?"ΠΡΟΕΤΟΙΜΑΣΙΑ · Γέμισε έως 60 μύγες":"ΑΠΟΘΗΚΕΣ · Κερδίζει η τελευταία άθικτη",this.$("base-status").hidden=!this.running,this.$("base-status").classList.toggle("threat",!!s?.attackerId),this.$("base-status").textContent=s?.attackerId?`ΕΙΣΒΟΛΕΑΣ! ${Math.max(0,At.sabotageSeconds-s.progress).toFixed(1)}″ · Χτύπησέ τον!`:l?"ΚΡΥΜΜΕΝΟΣ ΣΤΑ ΔΕΝΤΡΑ · Πιο αργά άλματα":a?"Η ΑΠΟΘΗΚΗ ΣΟΥ · Απεριόριστες μύγες":"Προστάτεψε την αποθήκη σου";const g=!t.ko&&!!n&&this.state.phase==="battle"&&!t.catapultId&&t.dizzyTime<=0&&t.knockUp<=0&&t.kick<=0&&(t.kickCooldown||0)<=0;this.$("kick-button").hidden=!this.running||t.ko||this.state.phase!=="battle"||!!t.catapultId||!n&&t.kick<=0,this.$("kick-button").disabled=!g,this.$("kick-button").classList.toggle("ready",g),this.$("pc-kick").classList.toggle("ready",g),this.$("dizzy-banner").hidden=t.dizzyTime<=0,this.$("dizzy-time").textContent=t.dizzyTime.toFixed(1)+"″",this.$("aim-stick").classList.toggle("empty",d?d.cooldown>0:t.ammo===0),this.calloutUntil<this.elapsed&&(this.$("callout").textContent="");const p=["catapult-button","catapult-status","kick-button","sabotage-button","sabotage-status"].map(y=>this.$(y).hidden?0:1).join("");this.touch&&!this.layoutEditing&&this.running&&p!==this.contextLayout&&(this.contextLayout=p,this.touchLayout?.refresh())}renderActors(t){this.state.actors.forEach((a,l)=>{const c=this.models[l];if(c.group.visible=!a.eliminated,a.eliminated)return;const h=this.ground(a.x,a.z);let u=a.x,f=a.z,d=h+a.height+(a.catapultId?.45:0);const m=this.koTimes.get(a.id),x=m?this.elapsed-m.time:99;x<.65&&(u+=m.dx*x*5,f+=m.dz*x*5,d+=Math.sin(x/.65*Math.PI)*2.5),c.group.position.set(u,d,f);const g=a.aiming||a.shot>.02||a.kick>0,p=g?Math.atan2(a.aimX,a.aimZ):a.face;let y=Math.atan2(Math.sin(p-c.group.rotation.y),Math.cos(p-c.group.rotation.y));c.group.rotation.y+=y*(1-Math.exp(-t*22)),c.update(t,{time:this.elapsed,speed:Math.hypot(a.hopX,a.hopZ),building:!!a.sabotageId,hop:a.knockUp>0?{phase:"air",progress:1-a.knockUp/a.knockUpDuration}:a.hop>0?{phase:"air",progress:1-a.hop/At.hopDuration}:a.idle>0?{phase:"land",progress:1-a.idle/At.landingDuration}:{phase:"idle",progress:0},dead:a.ko,attack:a.kick>0?{type:"kick",phase:1-a.kick/(At.kickDuration||.48)}:a.tongue>0||a.shot>0?{type:"tongue",phase:a.tongue>0?1-a.tongue/.22:1-a.shot/At.shotInterval}:null});const _=a.shot>0?Math.sin((1-a.shot/At.shotInterval)*Math.PI):0;c.bones.jaw.rotation.x-=_*.42,c.bones.head.rotation.x-=_*.08;for(const C of["eyeL","eyeR"])c.bones[C]?.scale.multiplyScalar(1.14);const v=a.load;if(c.bones.spine.scale.x*=1+v*.75,c.bones.spine.scale.y*=1+v*.5,c.bones.spine.scale.z*=1+v*.45,c.bones.throat.scale.multiply(new pn(1+v*.45+_*.18,1+v*.7+_*.3,1+v*.35)),a.hop>0){const C=Math.atan2(a.hopX,a.hopZ)-c.group.rotation.y,T=Math.min(1,Math.hypot(a.hopX,a.hopZ)/8.8)*Math.sin((1-a.hop/At.hopDuration)*Math.PI);c.bones.spine.rotation.z-=Math.sin(C)*T*.1;for(const E of[-1,1])c.bones[`hip${E}`].rotation.z-=Math.sin(C)*T*.14}if(c.group.scale.setScalar(1+v*.13),a.dizzyTime>0?(c.group.rotation.z=Math.sin(this.elapsed*7)*.17,c.bones.head.rotation.z+=Math.sin(this.elapsed*9)*.2):c.group.rotation.z=x<.65?x*6:0,c.group.rotation.x=0,a.knockUp>0){const C=1-a.knockUp/a.knockUpDuration,T=Math.sin(C*Math.PI)*.38,E=Math.atan2(a.impulseX,a.impulseZ)-c.group.rotation.y;c.group.rotation.x=Math.cos(E)*T,c.group.rotation.z-=Math.sin(E)*T}});const e=this.state.actors[0];this.playerRing.position.set(e.x,this.ground(e.x,e.z)+.07,e.z),this.playerRing.scale.setScalar(1+e.load*.25);const n=T1(this.state,e,Math.min(At.projectileSpeed*At.projectileLifetime,this.aim.distance||14)),s=this.aimGuide.geometry.attributes.position;s.setXYZ(0,e.x+e.aimX*1.3,this.ground(e.x,e.z)+.18,e.z+e.aimZ*1.3),s.setXYZ(1,n.x,this.ground(n.x,n.z)+.18,n.z),s.needsUpdate=!0,this.aimGuide.computeLineDistances();const r=this.running&&!this.layoutEditing&&!e.catapultId&&!e.ko&&e.dizzyTime<=0&&(e.aiming||e.shot>0);this.currentAimPreview=r?n:null,this.aimGuide.visible=r,this.aimGuide.material.color.set(n.targetId?"#ffc09b":n.blocked?"#b9c0b5":"#f4f7d5"),this.aimReticle.visible=r,this.aimReticle.position.set(n.x,this.ground(n.x,n.z)+.12,n.z),this.aimReticle.material.color.copy(this.aimGuide.material.color);const o=this.state.actors.find(a=>a.id===n.targetId);this.targetRing.visible=r&&!!o,o&&(this.targetRing.position.set(o.x,this.ground(o.x,o.z)+.1,o.z),this.targetRing.scale.setScalar(1+o.load*.2))}renderFlies(){this.state.flies.forEach((e,n)=>{const s=this.dummy,r=e.wait<=0,o=this.ground(e.x,e.z)+1.05+Math.sin(this.elapsed*5+e.phase)*.12,a=e.x+Math.sin(this.elapsed*3+e.phase)*.12;s.position.set(a,r?o:-100,e.z),s.scale.set(r?.105:0,r?.08:0,r?.14:0),s.rotation.set(0,e.phase,0),s.updateMatrix(),this.flyBodies.setMatrixAt(n,s.matrix);for(let l=0;l<2;l++)s.position.set(a+(l===0?-.1:.1),r?o+.045:-100,e.z),s.scale.set(r?.17:0,r?.015:0,r?.08:0),s.rotation.set(0,e.phase,Math.sin(this.elapsed*55+e.phase)*(l===0?1:-1)*.5),s.updateMatrix(),this.flyWings.setMatrixAt(n*2+l,s.matrix)}),this.flyBodies.instanceMatrix.needsUpdate=!0,this.flyWings.instanceMatrix.needsUpdate=!0,yr.forEach((e,n)=>{const s=this.state.flies.filter(o=>o.swarmId===e.id&&o.wait<=0).length,r=this.swarmRings[n];r.material.opacity=s?.2:.09,r.material.color.set(s?"#c8e0a3":"#6f8c83")});const t=new Set;for(const e of this.state.bullets){t.add(e.id);let n=this.bulletMeshes.get(e.id);if(!n){n=this.makeFlyBullet(),this.bulletMeshes.set(e.id,n);const r=this.state.actors.findIndex(o=>o.id===e.owner);n.userData.mouth=this.models[r].mouthWorld().clone()}n.position.set(e.x,this.ground(e.x,e.z)+.9,e.z);const s=(At.projectileLifetime||1.6)-e.life;s<.09&&n.position.lerp(n.userData.mouth,1-s/.09),n.rotation.y=Math.atan2(e.dx,e.dz),n.children[1].rotation.z=Math.sin(this.elapsed*75),n.children[2].rotation.z=-Math.sin(this.elapsed*75)}for(const[e,n]of this.bulletMeshes)t.has(e)||(n.removeFromParent(),this.bulletMeshes.delete(e));for(const[e,n]of this.tongues){const s=(this.elapsed-n.start)/.22;if(s>=1){n.mesh.removeFromParent(),this.tongues.delete(e);continue}const r=this.state.actors.findIndex(u=>u.id===e),o=this.models[r],a=o.mouthWorld(),l=new pn(n.x,this.ground(n.x,n.z)+1,n.z),c=Math.sin(s*Math.PI);l.lerpVectors(a,l,c);const h=l.clone().sub(a);n.mesh.position.copy(a).addScaledVector(h,.5),n.mesh.quaternion.setFromUnitVectors(zl,h.clone().normalize()),n.mesh.scale.set(.07,Math.max(.001,h.length()),.07)}}project(t,e,n){const s=new pn(t,e,n).project(this.camera);return{x:(s.x+1)*this.w/2,y:(1-s.y)*this.h/2,visible:s.z>-1&&s.z<1}}drawLabels(){const t=this.labelCtx;if(t.clearRect(0,0,this.w,this.h),t.textAlign="center",t.lineJoin="round",t.font="800 18px sans-serif",this.running&&(E1(this,t),w1(this,this.$("minimap"))),this.currentAimPreview){const e=this.currentAimPreview,n=this.project(e.x,this.ground(e.x,e.z)+.9,e.z);if(n.visible&&n.x>12&&n.x<this.w-12&&n.y>90&&n.y<this.h-30){t.save(),t.lineWidth=4,t.strokeStyle="#173c35",t.beginPath(),t.arc(n.x,n.y,7,0,Math.PI*2),t.stroke(),t.lineWidth=2,t.strokeStyle=e.targetId?"#ffc5a0":"#f4ffdd",t.beginPath(),t.arc(n.x,n.y,7,0,Math.PI*2);for(const[s,r]of[[1,0],[-1,0],[0,1],[0,-1]])t.moveTo(n.x+s*10,n.y+r*10),t.lineTo(n.x+s*16,n.y+r*16);t.stroke(),t.restore()}}if(this.hitConfirmUntil>this.elapsed&&this.lastPlayerHit){const e=this.lastPlayerHit,n=this.state.actors.find(r=>r.id===e.id),s=this.project(e.x,this.ground(e.x,e.z)+(n?.height||0)+1.2,e.z);if(s.visible){t.save(),t.strokeStyle="#143d35",t.lineWidth=6,t.beginPath();for(const[r,o]of[[1,1],[-1,1],[1,-1],[-1,-1]])t.moveTo(s.x+r*6,s.y+o*6),t.lineTo(s.x+r*15,s.y+o*15);t.stroke(),t.strokeStyle="#fffce2",t.lineWidth=3,t.stroke(),t.restore()}}if(this.state.actors.forEach((e,n)=>{if(e.eliminated)return;const s=this.project(e.x,this.ground(e.x,e.z)+e.height+2.4,e.z);if(!s.visible)return;if(!(s.x>20&&s.x<this.w-20&&s.y>70&&s.y<this.h-40)&&n>0&&!e.ko&&this.running){const o=Ll(s.x,24,this.w-24),a=Ll(s.y,110,this.h-(this.touch?210:90));t.font="bold 24px sans-serif",t.fillStyle=n===1?"#ffbb8e":"#dfb5ff",t.fillText("▼",o,a);return}if(e.ko){t.font="900 20px sans-serif",t.strokeStyle="#1e2e28",t.lineWidth=5;const o=`KO · ${Math.ceil(e.respawnTime||0)}″`;t.strokeText(o,s.x,s.y),t.fillStyle="#ffe374",t.fillText(o,s.x,s.y);return}if(e.dizzyTime>0){for(let o=0;o<3;o++){const a=this.elapsed*4+o*2.094;t.font="bold 25px sans-serif",t.fillStyle="#ffdf57",t.strokeStyle="#725c21",t.lineWidth=3;const l=s.x+Math.cos(a)*27,c=s.y+Math.sin(a)*7;t.strokeText("★",l,c),t.fillText("★",l,c)}t.font="bold 15px sans-serif",t.fillStyle="#fff4ad",t.fillText(e.dizzyTime.toFixed(1)+"″",s.x,s.y+24);for(let o=0;o<At.finishHits;o++)t.beginPath(),t.arc(s.x+(o-(At.finishHits-1)/2)*11,s.y+36,4,0,Math.PI*2),t.fillStyle=o<e.finishHits?"#ffb58e":"#244438",t.fill(),t.strokeStyle="#ffe6ac",t.lineWidth=1.5,t.stroke()}else if(n>0){e.aimWindup>0&&(t.font="900 22px sans-serif",t.fillStyle="#ffddaa",t.fillText("!",s.x,s.y-40));const o=n===1?"ΚΟΚΚΙΝΟΣ":"ΜΩΒ",a=n===1?"#ff886a":"#dba1ff";t.fillStyle="#112b27dd",t.strokeStyle=a,t.lineWidth=3,t.beginPath(),t.roundRect?t.roundRect(s.x-52,s.y-28,104,24,10):t.rect(s.x-52,s.y-28,104,24),t.fill(),t.stroke(),t.font="bold 15px sans-serif",t.fillStyle=a,t.fillText(o,s.x,s.y-11);for(let l=0;l<6;l++)t.beginPath(),t.arc(s.x+(l-2.5)*9,s.y+6,3.8,0,Math.PI*2),t.fillStyle=l<e.dizzy?"#ffe16a":"#214036bb",t.fill()}}),this.running){const e=this.state.actors[0];for(const n of this.state.bases){const s=Vn.find(l=>l.id===n.id),r=Math.hypot(e.x-s.stock.x,e.z-s.stock.z)<10;if(n.destroyed||!r&&!n.attackerId)continue;const o=this.project(s.stock.x,this.ground(s.stock.x,s.stock.z)+3.5,s.stock.z);if(!o.visible||o.x<70||o.x>this.w-70||o.y<95||o.y>this.h-(this.touch?220:85))continue;const a=n.attackerId?`ΚΑΤΑΣΤΡΟΦΗ · ${Math.max(0,At.sabotageSeconds-n.progress).toFixed(1)}″`:n.owner==="player"?"Η ΑΠΟΘΗΚΗ ΣΟΥ · ∞":"ΕΧΘΡΙΚΗ ΑΠΟΘΗΚΗ";t.font="800 12px sans-serif",t.strokeStyle="#14342df2",t.lineWidth=5,t.strokeText(a,o.x,o.y),t.fillStyle=n.attackerId?"#ffd197":n.owner==="player"?"#dbff9d":"#ffbdad",t.fillText(a,o.x,o.y)}}this.fx=this.fx.filter(e=>this.elapsed-e.start<e.life);for(const e of this.fx){const n=(this.elapsed-e.start)/e.life,s=this.project(e.x,this.ground(e.x,e.z)+2+n*2,e.z);t.globalAlpha=1-n,t.font=`900 ${e.text==="ΝΟΚ ΑΟΥΤ!"?32:22}px sans-serif`,t.strokeStyle="#244136",t.lineWidth=6,t.strokeText(e.text,s.x,s.y),t.fillStyle=e.color,t.fillText(e.text,s.x,s.y)}t.globalAlpha=1}frame(t){const e=Math.min(.05,Math.max(0,(t-this.last)/1e3));if(this.last=t,this.running&&!this.layoutEditing){for(this.elapsed+=e,this.accumulator+=e;this.accumulator>=1/60;)if(Vu(this.state,this.currentInput(),1/60),this.consumeEvents(),this.accumulator-=1/60,this.state.status!=="playing"){this.finish();break}this.saveClock+=e,this.saveClock>3&&(this.saveClock=0,this.persist())}else(this.mode==="result"||this.mode==="finishing")&&(this.elapsed+=e);this.mode==="finishing"&&this.elapsed>=this.resultAt&&this.showResult();const n=this.state.actors[0],s=b1(n,this.ground(n.x,n.z),this.w/this.h,this.viewMode),r=new pn(...s.look),o=new pn(...s.position);this.cameraReady?(this.focus.lerp(r,1-Math.exp(-e*8)),this.cameraTarget.lerp(o,1-Math.exp(-e*8))):(this.focus.copy(r),this.cameraTarget.copy(o),this.cameraReady=!0),this.shake*=Math.exp(-e*15);const a=this.running?this.shake:0;if(this.camera.position.copy(this.cameraTarget),this.camera.position.x+=(Math.random()-.5)*a,this.camera.lookAt(this.focus),this.camera.updateMatrixWorld(),this.running||this.mode==="title"||this.mode==="result"||this.mode==="finishing"){const l=this.mode==="title"||this.layoutEditing?0:e;this.renderActors(l),this.renderFlies(),this.updateCatapultAim?.(),this.artilleryView.update(l),this.basesView.update(l),this.impactEffects.update(l),this.world.update(this.running&&!this.layoutEditing?e:0,this.elapsed,1,new pn(n.x,this.ground(n.x,n.z),n.z))}(this.running&&!this.layoutEditing||this.mode==="finishing"||this.mode==="result")&&(this.particles=this.particles.filter(l=>this.elapsed-l.start>.55?(l.mesh.removeFromParent(),!1):(l.v.y-=e*16,l.mesh.position.addScaledVector(l.v,e),!0))),this.renderer.render(this.scene,this.camera),this.drawLabels(),this.updateHUD()}inspect(){return{version:Tl,viewMode:this.viewMode,phase:this.state.phase,intro:this.state.intro,mode:this.mode,status:this.state.status,ammo:this.state.actors[0].ammo,fillPercent:Math.round(this.state.actors[0].ammo/At.capacity*100),actors:this.state.actors.map(t=>({id:t.id,x:t.x,z:t.z,ammo:t.ammo,dizzy:t.dizzy,dizzyTime:t.dizzyTime,ko:t.ko,eliminated:t.eliminated,respawnTime:t.respawnTime,sabotageId:t.sabotageId,aiming:t.aiming,face:t.face,hop:t.hop,hopX:t.hopX,hopZ:t.hopZ,height:t.height,knockUp:t.knockUp,finishHits:t.finishHits,kickCooldown:t.kickCooldown,catapultId:t.catapultId})),bases:this.state.bases.map(t=>({...t})),layoutEditing:this.layoutEditing,touch:this.touch,catapults:this.state.catapults?.map(t=>({id:t.id,occupant:t.occupant,cooldown:t.cooldown})),shells:this.state.shells?.length,hitConfirmUntil:this.hitConfirmUntil,bullets:this.state.bullets.length,splats:this.splats.length,legacySavePreserved:!0}}}function Y1(i){const t={fire:!1,kick:!1},e=r=>{i.running&&!i.layoutEditing&&(t[r]=!0)},n=i.currentInput.bind(i),s=i.clearInputs.bind(i);i.currentInput=()=>{const r=n();for(const o of Object.keys(t))i.layoutEditing||(r[o]||=t[o]),t[o]=!1;return i.layoutEditing||(r.aiming||=r.fire),r},i.clearInputs=()=>{for(const r of Object.keys(t))t[r]=!1;s()},addEventListener("keydown",r=>{r.repeat||r.target.matches("input,select")||r.code==="KeyQ"&&e("kick")},!0),addEventListener("pointerdown",r=>{r.target.closest?.("#kick-button")&&!i.$("kick-button").disabled?e("kick"):(r.target===i.renderer.domElement&&r.pointerType!=="touch"&&r.button===0||r.target.closest?.("#fire-button")&&!i.$("fire-button").disabled)&&e("fire")},!0),addEventListener("pointercancel",()=>{for(const r of Object.keys(t))t[r]=!1},!0)}function Z1(i,t=()=>performance.now()){const e=i.$("view-button");let n=-1/0;e.onpointerdown=s=>{s.pointerType!=="touch"||!i.running||(s.preventDefault(),n=t(),i.toggleView())},e.onclick=s=>{i.running&&(s.detail===0||t()-n>600)&&i.toggleView()}}function j1(i){i.catapultAim={active:!1,target:null};let t=!1,e=!1;const n=()=>!!i.state.actors[0].catapultId;i.updateCatapultAim=()=>{if(!n()){i.catapultAim={active:!1,target:null};return}const l=i.state.actors[0];if(!i.touch&&i.mouse.valid&&i.mouse.target){const u=i.mouse.target.x-l.x,f=i.mouse.target.z-l.z,d=Math.hypot(u,f);d>.01&&(i.aim={x:u/d,z:f/d,distance:d})}const c=i.aim||{x:l.aimX,z:l.aimZ},h=i.touch?Math.max(0,Math.min(1,(i.aimStrength-.08)/.92)):Math.max(0,Math.min(1,((c.distance||17)-De.minRange)/(De.maxRange-De.minRange)));i.catapultAim={active:!0,target:i1(l,c.x,c.z,h)}};const s=i.currentInput.bind(i),r=i.clearInputs.bind(i);i.currentInput=()=>{const l=s();if(i.layoutEditing)return t=!1,e=!1,{};const c=l.fire&&!e;return e=!!l.fire,n()&&(i.updateCatapultAim(),l.fire=!1,l.aiming=!0,l.ax=i.aim.x,l.az=i.aim.z,l.sabotage=!1,c&&i.catapultAim.target?.valid!==!1&&(l.throwStone={...i.catapultAim.target})),t&&(l.interactCatapult=!0,t=!1),l},i.clearInputs=()=>{t=!1,e=!1,i.catapultAim={active:!1,target:null},r()};const o=i.$("catapult-button");o.onpointerdown=l=>{!i.running||i.layoutEditing||o.disabled||!n()&&i.state.phase!=="battle"||(l.preventDefault(),t=!0)},o.onclick=l=>{l.detail===0&&i.running&&!i.layoutEditing&&!o.disabled&&(t=!0)},addEventListener("keydown",l=>{l.code!=="KeyE"||l.repeat||l.target.matches("input,select")||!i.running||i.layoutEditing||!n()&&i.state.phase!=="battle"||!n()&&Ra(i.state,i.state.actors[0])||(l.preventDefault(),t=!0)});const a=i.$("aim-stick");a.addEventListener("pointerdown",()=>{n()&&i.updateCatapultAim()}),a.addEventListener("pointermove",()=>{n()&&i.pointers.has("aim")&&i.updateCatapultAim()})}function ch(i){console.error(i);let t=document.getElementById("boot");if(!t){t=document.createElement("div"),t.id="boot";const n=document.createElement("div");n.id="boot-error",t.append(n),document.body.append(t)}t.classList.add("has-error");const e=document.getElementById("boot-error");e.textContent=`Δεν μπόρεσε να ξεκινήσει ο 3D κόσμος. Ενεργοποίησε την επιτάχυνση γραφικών στον browser και κάνε ανανέωση.
`+(i?.message||String(i))}addEventListener("error",i=>ch(i.error||i.message));addEventListener("unhandledrejection",i=>ch(i.reason));requestAnimationFrame(()=>{try{window.frogArcade=new $1,Y1(window.frogArcade),Z1(window.frogArcade),j1(window.frogArcade)}catch(i){ch(i)}});
